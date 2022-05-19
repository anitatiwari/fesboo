"use strict";


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