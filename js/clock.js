const clock = document.querySelector("h1#clock");


function getTime(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    dates.innerText = `${date.getMonth()+1}/${date.getDate()}`
    clock.innerText = `${hours}:${minutes}`
}

getTime()
setInterval(getTime, 1000);