let hourElement=document.getElementById("hour");
let minuteElement=document.getElementById("minute");
let secondElement=document.getElementById("second");
let am_pmElement=document.getElementById("am_pm");

setInterval(getTime, 1000);
function getTime(){
    let time=new Date();
    let hour=time.getHours();
    let minute=time.getMinutes();
    let second=time.getSeconds();
    let am_pm="AM"

    if(hour>=12){
        if(hour>12)
        hour-=12;
        am_pm="PM";
    }else if(hour===0){
        hr=12;
        am_pm="AM";
    }

    hour=hour>10? hour: "0"+hour;
    minute=minute>10? minute: "0"+minute;
    second=second>10? second: "0"+second;
    hourElement.innerText=hour;
    minuteElement.innerText=minute;
    secondElement.innerText=second;
    am_pmElement.innerText=am_pm;
}

getTime();