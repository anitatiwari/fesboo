let scheduleJson;
let spotsJson;
window.addEventListener("DOMContentLoaded", init);

async function init() {
  const schedulePromise = await fetch(
    "https://festevent-book.herokuapp.com/schedule",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((s) => {
      scheduleJson = s;
      displaySchedule(scheduleJson)
    });

  const availableSpots = await fetch(
    "https://festevent-book.herokuapp.com/available-spots",
    {
      method: "GET",
    }
  )
    .then((res) => res.json())
    .then((sp) => {
      spotsJson = sp;
      spotsJson.forEach((spot) => {
        displaySpots(spot);
      });
    });
}


function displaySchedulesList(scheduless) {
  scheduless.forEach((schedules)=>{
    schedules.forEach((schedule) => {
      schedule.forEach((data1)=>{

      })
    });
  });

}
function displaySpotList(spots) {

  spots.forEach((spot) => {
    spot.forEach((data) => {
    });
  });
}

function displaySchedule(schedule) {
let MidgardDay;
  let temp2 = document.querySelector("#scheduleTemp").content;
  let clone2 = temp2.cloneNode(true);
  
  console.log(Object.keys(schedule))
  let areas=Object.keys(schedule);
 areas.forEach((area)=>{
  
 })
  

  let midgardDays =Object.keys(schedule.Midgard)
  console.log(midgardDays)
 midgardDays.forEach((MidgardDay)=>{
  console.log(MidgardDay)
 })
 

  clone2.querySelector("#day").textContent=schedule.MidgardDay




  document.querySelector("#schedule_container").appendChild(clone2);
}
function displaySpots(spot) {
  let temp3 = document.querySelector("#spots").content;

  let clone = temp3.cloneNode(true);

  clone.querySelector(".area").innerHTML = spot.area;
  clone.querySelector(".spots").innerHTML = spot.spots;

  clone.querySelector(".available").textContent = spot.available;
// if(spot.available==0){
//  temp3.querySelector(".available").style.color= "#ff0000"
// document.querySelector(".checkbox ").disable=true;
// }
// else{
//  temp3.querySelector(".available").style.color= 
// }
  document.querySelector("#availableSpots").appendChild(clone);
}

let green_camp;
let pre_book = document.getElementById("pre-book").innerText;
// let green_camp= document.getElementById("green-cam").value;

let total1;
let total2;

let poke1 = document.getElementById("poke1");
var cmp = document.getElementById("counter");
poke1.addEventListener("click", normalTicketminus);

function normalTicketminus() {
  let newCount = parseInt(cmp.innerHTML) - 1;
  if (newCount <= 0) {
    newCount = 0;
  }
  cmp.innerHTML = newCount;

  updateTotalGlobal();
}
normalTicketminus();

var poke2 = document.getElementById("poke2");
var cmp = document.getElementById("counter");
var greencamp = document.getElementById("green-camp");
greencamp.addEventListener("change", () => {
  let counterValue = parseInt(cmp.innerText);
  let normTicket = parseFloat(
    document.getElementById("normal-price").innerText
  );
  // total1 = normTicket * cmp.innerText;
  updateTotalGlobal();
});
poke2.addEventListener("click", normalTicketplus);
function normalTicketplus() {
  cmp.innerHTML = parseInt(cmp.innerHTML) + 1;

  let normTicket = document.getElementById("normal-price").innerText;

  updateTotalGlobal();
}
normalTicketplus();

var poke01 = document.getElementById("poke01");
var cmp1 = document.getElementById("counter2");
poke01.addEventListener("click", vipTicketminus);
function vipTicketminus() {
  let newCount = parseInt(cmp1.innerHTML) - 1;
  if (newCount <= 0) {
    newCount = 0;
  }
  cmp1.innerHTML = newCount;
  // let vipticket = document.getElementById("vip-price").innerText;

  // total2 = parseFloat(vipticket) * cmp1.innerText;
  // console.log(total2);
  updateTotalGlobal();
}
vipTicketminus();
var poke02 = document.getElementById("poke02");
var cmp1 = document.getElementById("counter2");
poke02.addEventListener("click", vipTicketplus);
function vipTicketplus() {
  cmp1.innerHTML = parseInt(cmp1.innerHTML) + 1;

  updateTotalGlobal();
}

vipTicketplus();

calcTotal = parseInt(total1) + parseInt(total2) + parseInt(pre_book);
// document.getElementById("total").innerHTML = calcTotal;

function updateTotal(newNumber) {
  if (newNumber == 0) {
    document.getElementById("total").innerText = 0;
    return;
  }
  newNumber += 99;
  let isChecked = document.getElementById("green-camp").checked;
  if (isChecked) {
    newNumber += 249;
  }
  document.getElementById("total").innerText = newNumber;
}

function updateTotalGlobal() {
  let normalPrice = 799;
  let vipPrice = 1299;
  let normalCount = parseInt(document.getElementById("counter").innerText);
  let vipCount = parseInt(document.getElementById("counter2").innerText);

  let normalCountTotal = normalCount * normalPrice;
  let vipCountTotal = vipCount * vipPrice;
  let summedUp = normalCountTotal + vipCountTotal;

  updateTotal(summedUp);
}

document.getElementById("recipient").addEventListener("click", onClick);
function onClick() {
  document.querySelector("#popUp").classList.remove("hide");
  document
    .querySelector(" #popUp .closingbutton")
    .addEventListener("click", closeDialog);

  function closeDialog() {
    document.querySelector("#popUp").classList.add("hide");
    document
      .querySelector("#popUp .closingbutton")
      .removeEventListener("click", closeDialog);
  }
}
document.getElementById("checkOut").addEventListener("click", checkOutForm);
function checkOutForm() {
  document.querySelector("#popUp2").classList.remove("hide");
  document
    .querySelector(" #popUp2 .closingbutton")
    .addEventListener("click", closeDialog2);

  function closeDialog2() {
    document.querySelector("#popUp2").classList.add("hide");
    document
      .querySelector("#popUp2 .closingbutton")
      .removeEventListener("click", closeDialog2);
  }
}
