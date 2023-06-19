
// TO DISPLAY CURRENT TIME
function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var session = document.getElementById('AM-PM');

    if(hrs >= 12){
        session.innerHTML = 'PM';
    }else{
        session.innerHTML = 'AM';
    }

    if(hrs >= 12){
        hrs = hrs - 12;
    }

    document.getElementById('hrs').innerHTML = hrs;
    document.getElementById('mins').innerHTML = min;
    document.getElementById('secs').innerHTML = sec;

     
}
setInterval(displayTime, 100);

// HERE WE CREATE SET ALARM
var selectMenu = document.getElementsByClassName('form-select');
console.log(selectMenu);
// FOR HOUR OPTIONS
for (let i = 12; i >= 0; i--) {
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
// FOR Minutes OPTIONS
for (let i = 59; i >= 0; i--) {
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}
// FOR session OPTIONS
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// SET ALARM BUTTON CLICK OPERATION

setAlarmBtn = document.querySelector("button");
let alarmTime, isAlarmSet,
ringtone = new Audio("files/ringtone.mp3");

function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        // content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    console.log(time);

    alarmTime = time;
    isAlarmSet = true;
   
   let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
     ampm = "AM";

    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }   

    console.log(`${h}:${m} ${ampm}`);

if (alarmTime === `${h}:${m} ${ampm}`) {
        ringtone.play();
        ringtone.loop = true;
        setTimeout(() => { ringtone.pause(); }, 20000);
        clearInterval(myInterval);
        alert("Wake Up!");
    }
    
}

setAlarmBtn.addEventListener("click", setAlarm);

var myInterval = setInterval(setAlarm, 1000);

// ALARM LIST


  $("#set-alarm-btn").click(function()
{

    if(selectMenu[0].value == "Hour" || selectMenu[1].value == "Minute" || selectMenu[2].value == "Session")
    {
        alert("Please enter the correct time");
    }
    else
    {
     $("ul").append("<li>"+ selectMenu[0].value + ":" + selectMenu[1].value + " " + selectMenu[2].value+"</li>");
    }
    

});
