"use strict";

document.getElementById("recipient").addEventListener("click",onClick);
function onClick(){

document.querySelector('#popUp').classList.remove("hide");  
 document.querySelector(" #popUp .closingbutton")
  .addEventListener("click", closeDialog);

function closeDialog() {
  document.querySelector("#popUp").classList.add("hide");
  document
    .querySelector("#popUp .closingbutton")
    .removeEventListener("click", closeDialog);
}}
document.getElementById("checkOut").addEventListener("click",checkOutForm);
function checkOutForm(){

document.querySelector('#popUp2').classList.remove("hide");  
 document.querySelector(" #popUp2 .closingbutton")
  .addEventListener("click", closeDialog2);

function closeDialog2() {
  document.querySelector("#popUp2").classList.add("hide");
  document
    .querySelector("#popUp2 .closingbutton")
    .removeEventListener("click", closeDialog2);
}}
let lineup = [];
let bandJson;

window.addEventListener("DOMContentLoaded", start);

async function start() {
  await loadBandJson();
  await loadScheduleJson();
}

//------------------------ FETCH ALL DATA

//Fetch bands
async function loadBandJson() {
  const bands = await fetch("https://festevent-book.herokuapp.com/bands", {
    method: "GET",
  }
  );
  
}

//Fetch schedule
async function loadScheduleJson() {
  const schedule = await fetch(
    "https://festevent-book.herokuapp.com/schedule",
    {
      method: "GET",
    }
  );
  const scheduleJson = await schedule.json();
  console.log(scheduleJson);
}


// Fetch Camping spots
const availableSpots = await fetch(
  "https://festevent-book.herokuapp.com/available-spots",
  {
    method: "GET",
  }
);
const availableSpotsJson = await availableSpots.json();
console.log(availableSpotsJson);

//................ Fetch all done
