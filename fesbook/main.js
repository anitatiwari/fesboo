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

// function displayLineup() {

//   let temp = document.querySelector(".artist");
//   let cont = document.querySelector(".elementcontainer");

//   bandJson.forEach((artist) => {
//     let clone = temp.cloneNode(true).content;
//     clone.querySelector("#artist_name").innerHTML = artist.name;

//     clone.querySelector(".open_artist").addEventListener("click", () => openArtist(artist));
//     cont.appendChild(clone);

//     cont.appendChild(clone);
//   });
// }

// //------------------------ SHOW SINGLE ARTIST

// function openArtist(artist) {
  

//   // SHOW ARTIST INFO
  
//   document.querySelector("#info .name").textContent = artist.name;
//   document.querySelector("#info .members").textContent = artist.members;
//   document.querySelector("#info .genre").textContent = artist.genre;
//   document.querySelector("#info img").src = artist.logo;
//   document.querySelector("#info .bio").textContent = artist.bio;
// }

