let productDiv=document.getElementById("productDiv");
let cartDiv=document.getElementById("cartDiv");
let cartContainer=document.getElementById("cartContainer");
let cartBtn=document.getElementById("cartBtn");
let closeBtn=document.getElementById("closeBtn")
let priceElement=document.getElementById("total")
let tostInfo=document.getElementById("toast");
let tostMessage=document.getElementById("toastMessage");
let result;
let userCart=JSON.parse(localStorage.getItem("userCart")) || [];

// fetch products
function fetchProducts(){
  loadProducts(true);
  fetch('https://fakestoreapi.com/products')
  .then(async(res)=>{
    result=await res.json();
    console.log(result);
    loadProducts(false,result);
  })
  .catch((e)=>{
    console.log(e);
  })
}

// load products on page
function loadProducts(loading,products){
    if(loading){
      let html="";
        // shimmer ui skeleten loader
        for(let i=0;i<8;i++){
           html+=`<div class="bg-white w-[70%] md:w-1/5 py-2 px-2 shadow-lg flex flex-col items-center gap-3 rounded-lg">
           <div class="w-full h-60 bg-gray-300 animate-pulse"></div>
           <div class="bg-gray-300 w-[90%] h-4 animate-pulse"></div>
           <div class="bg-gray-300 w-24 h-4 animate-pulse"></div>
           <div class="bg-gray-300 w-[90%] h-6 animate-pulse"></div>
        </div>`
        }
        productDiv.innerHTML=html;
    }
    else{
        let html=""
        products.forEach((data,index)=>{
            html+=`<div class="bg-white w-[70%] h-96 md:w-1/5 py-2 px-2 shadow-lg flex flex-col items-center gap-3 rounded-lg">
            <a href="product.html"><img onclick="setStorage(${index})" class="w-48 h-60 object-scale-down" src="${data?.image}"/></a>
            <h1 class="font-bold text-center">${data?.title.slice(0,18)}</h1>
            <p>Price: ${Math.floor(data?.price)}$</p>
            <button onclick="addToCart(${index})" class="bg-black text-white py-1 w-[90%] rounded-lg">Add to cart</button>
        </div>`
        })
        productDiv.innerHTML=html;
    }

}

// store sesson data for product page
function setStorage(index){
  sessionStorage.setItem('product', JSON.stringify(result[index]))
}

// add to cart button handler
cartBtn.addEventListener("click",()=>{
    if(cartContainer.classList.contains("hidden"))
   {
    if(userCart.length>0){
      loadCart()
     }
    cartContainer.classList.remove("hidden")
   }
    else
    cartContainer.classList.add("hidden")
})

// cart close button
closeBtn.addEventListener("click",()=>{
    cartContainer.classList.add("hidden")
})

// cart close button
productDiv.addEventListener("click",()=>{
  if(!cartContainer.classList.contains("hidden"))
  cartContainer.classList.add("hidden")
})


// add to cart handler
function addToCart(index){
    let duplicateFlag=false;
    userCart.forEach((item,index2)=>{
        if(item.title===result[index].title){
            if(userCart[index2]?.quantity && userCart[index2]?.quantity<3 )
            userCart[index2].quantity++;
            duplicateFlag=true;
        }
    })
    if(!duplicateFlag){
        let data=result[index]
        data.quantity=1;
        userCart.push(data);
    }
    console.log(result[index])
    storeInLocalStorage();
    tostMessage.innerText="Successfully added in the cart.";
    showToast()
}

// store usercart data in local storage
function storeInLocalStorage(){
  localStorage.setItem("userCart",JSON.stringify(userCart));
}

// load cart data on page
function loadCart(){
    let html=""
    if(userCart.length>=1){
        userCart.forEach((data,index)=>{
            html+=`<div class="flex flex-row items-center justify-between w-full  p-1">
            <img class="w-16 object-scale-down" src="${data?.image}"/>
            <div class="flex flex-col">
                <h1>${data?.title?.slice(0,24)}</h1>
                <p>Price: ${data?.price}$</p>
            </div>
           <input type="number" class="p-1 border border-gray-300 w-12 text-center" value="${data?.quantity}" onchange="updateQuantity(${index}, this.value)"/>
            <button class="text-gray-600 transition hover:text-red-600" onclick="deleteFromCart('${data.title}')">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-4 w-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
          </div>`
        })
    }
    calculatePrice();
    cartDiv.innerHTML=html;
}

// product cart quantity handler
function updateQuantity(index,value){
  if(parseInt(value)===0){
    deleteFromCart(userCart[index].title)
  }
  else
  userCart[index].quantity = parseInt(value);
  storeInLocalStorage();
  calculatePrice();
}

// cart price calculater
function calculatePrice(){
  let total=0;
  userCart.forEach((item)=>{
    total+=Math.floor(item.price*item.quantity);
  })
  priceElement.innerText="$"+total
}

// delete from cart
function deleteFromCart(title){
  userCart=userCart.filter((item)=>item.title!=title)
  tostMessage.innerText="removed successfully";
  storeInLocalStorage()
  showToast();
  loadCart();
}

// toast message handler
function showToast(){
  tostInfo.classList.remove("hidden")
  setTimeout(()=>{
    tostInfo.classList.add("hidden");
  },1500)
}



fetchProducts();


