let input=document.getElementById("userInput");
let btn=document.getElementById("btn")
let infoDiv=document.getElementById("infoDiv");


btn.addEventListener("click",()=>{
    if(input.value!="" ){
        fetch(`https://api.github.com/users/${input.value}`)
        .then(async(res)=>{
            input.value=""
            let data=await res.json()
            console.log(data);
            loadData(data);
        })
        .catch((e)=>{
            console.log(e)
        })
    }
})

function loadData(data){
    let html=`
    <img class="w-48 rounded-full" src="${data?.avatar_url}"/>
    <div class="flex flex-row items-center gap-2 w-full">
        <h1 class="bg-[#3944F7] px-3 py-1 rounded-lg ">Name: ${data.name?.slice(0,18)}</h1>
        <h2 class="bg-[#3944F7] px-3 py-1 rounded-lg overflow-x-hidden ">Portfolio: <a href="${data?.blog}">portfolio</a></h2>
    </div>
    <div class="flex items-center gap-2">
        <h1 class="bg-[#3944F7] px-3 py-1 rounded-lg">Location: ${data?.location}</h1>
        <h1 class="bg-[#3944F7] px-3 py-1 rounded-lg">Public Repo: ${data?.public_repos}</h1>
    </div>
    <div class="flex items-center gap-2">
        <h1 class="bg-[#3944F7] px-3 py-1 rounded-lg">Follower: ${data.followers
        }</h1>
        <h1 class="bg-[#3944F7] px-3 py-1 rounded-lg overflow-x-hidden">Bio: ${data?.bio?.slice(0,20)}</h1>
    </div>
   `

   infoDiv.innerHTML=html
}