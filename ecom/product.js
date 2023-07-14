let tilteEle=document.getElementById("prodTitle");
        let titleEle=document.getElementById("prodTitle")
        let discription=document.getElementById("prodDiscription");
        let price=document.getElementById("price");
        let data=JSON.parse(sessionStorage.getItem("product"));
        let image=document.getElementById("prodImage");
        if(data.title){
          tilteEle.innerText=data.title;
          discription.innerText=data.description;
          price.innerText=data.price
          image.src=data.image
        }