const clock = document.querySelector("h1#clock");


function getTime(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    let day = new Date().getDay();
    let dayName;
    if (day === 0) {
        dayName = "Sunday";
    } else if (day === 1) {
        dayName = "Monday";
    } else if (day === 2) {
        dayName = "Tuesday";
    } else if (day === 3) {
        dayName = "Wednesday";
    } else if (day === 4) {
        dayName = "Thursday";
    } else if (day === 5) {
        dayName = "Friday";
    } else if (day === 6) {
        dayName = "Saturday";
    }
    dates.innerText = `${date.getMonth()+1}/${date.getDate()}, ${dayName}`
    clock.innerText = `${hours}:${minutes}`
}

getTime()
setInterval(getTime, 1000);
