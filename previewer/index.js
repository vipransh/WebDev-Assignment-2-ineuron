let conatiner=document.getElementById("container");
let title=document.getElementById("title");
let imageUrl=document.getElementById("imageUrl");
let authorName=document.getElementById("authorName");
let category=document.getElementById("category");
let story=document.getElementById("story");
let submitBtn=document.getElementById("submit");

submitBtn.addEventListener("click",()=>{
    if(title.value!="" && imageUrl.value!="" && authorName.value!="" && category.value!="" && story.value!="" ){
        let html="";
        html+=`
        <img class="w-60 h-60" src="${imageUrl.value}"/>
        <div>
            <h1 class="font-bold uppercase">${title.value}</h1>
            <p>${story.value}</p>
            <div class="flex items-center justify-center  mt-2"><div class="bg-[#1B98F5] text-white px-3 py-1 inline-block text-center rounded-lg">${authorName.value}</div></div>
        </div>
    `;
    conatiner.innerHTML=html;
    conatiner.classList.remove("hidden")
    title.value="";
    imageUrl.value="";
    authorName.value="";
    story.value="";
    category.value=""
    }
})