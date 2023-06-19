
var alarmValues=$('#alarm-values'); 
var list=$('#list');
var ringtone = new Audio("files/ringtone.mp3");
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

//CREATE THE LIST OF ALARMS
var alarm_list=[];
$("#set-alarm-btn").click(function(e){
    // TO SET THE ALARM VALUES
    var Hour=$(selectMenu[0]).val();
    var Min=$(selectMenu[1]).val();
    var AmPm=$(selectMenu[2]).val();
    // THE ALARM TIME TO BE SET
    var alarmTime = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    console.log(alarmTime);

    if(alarmTime.includes("Hour")|| alarmTime.includes("Min") || alarmTime.includes("AM/PM")){
        alert("Please enter the values correctly");
        return;
    }
    // PUSHING ALARM VALUES TO THE ALARM LIST
    alarm_list.push(alarmTime);
    console.log(alarm_list);

    // TO RENDER THE TIME
    renderTime(); 

    // TO REST THE VALUES BACK TO NORMAL STATE

  
})

// RENDER TIME
function renderTime(){
    // RENDERING THE ALARM LIST
    document.getElementById('list').innerHTML='';
    for(let i=0;i<alarm_list.length;i++){
        // 
        addToList(alarm_list[i],i);
    }
}

function addToList(element,i){
    // displaying alarmlist values
    let x=$(`<li>
             <div class="row">
                <div class="col-9"><span>The alarm is set at - &nbsp&nbsp ${element} </span></div>
                <div class="col-3">
                <button type="button" class="d-flex justify-content-end btn bg-dark delete-btn"  value="Delete" id=${i} onClick="Delete(${i})">
                DELETE
                </button>
                </div>
             </div>
             </li> 
    `);
    list.append(x);
}


function currentTime(){
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    ampm = "AM";

    if(h >= 12) {
        h = h - 12;
        ampm = "PM";
    }   
     let currentTime = `${h}:${m} ${ampm}`;
    console.log(currentTime);



    for(let i=0;i<alarm_list.length;i++){
       if(alarm_list[i] === currentTime){

        ringtone.play();
        ringtone.loop = true;
        setTimeout(() => { ringtone.pause(); }, 20000);
        window.alert("Wake Up!");
        Delete(i);
        renderTime();
       }
    } 
}
setInterval(currentTime,1000);

//delete funtion
function Delete(id){
    console.log(id);
    alarm_list.splice(id,1);
    console.log(alarm_list);
    renderTime();
}