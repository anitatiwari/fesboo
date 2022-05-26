// "use strict";

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
 

//------------------------ FETCH ALL DATA

//Fetch bands
  const bandsPromise = await fetch("https://festevent-book.herokuapp.com/bands", {
    method: "GET",
  }
  );
  // bandJson = await bands.json();
  // displayLineup();
  


//Fetch schedule

  const schedulePromise = await fetch(
    "https://festevent-book.herokuapp.com/schedule",
    {
      method: "GET",
   
    }

  );
  Promise.all([bandsPromise, schedulePromise])
  .then((valueArray) => {
      return Promise.all(valueArray.map((r) => r.json()));
  })
  // Then forward the two arrays to be sorted by fillInfo
  .then(([bands, schedule]) => {
      console.log(bands, schedule);
  })

}

start();
// Fetch Camping spots
// const availableSpots = await fetch(
//   "https://festevent-book.herokuapp.com/available-spots",
//   {
//     method: "GET",
//   }
// );
// const availableSpotsJson = await availableSpots.json();
// console.log(availableSpotsJson);

// //................ Fetch all done

function displayLineup() {

  let temp = document.querySelector(".artist");
  let cont = document.querySelector(".elementcontainer");

  bandJson.forEach((artist) => {
    let clone = temp.cloneNode(true).content;
    clone.querySelector("#artist_name").innerHTML = artist.name;

    clone.querySelector(".open_artist").addEventListener("click", () => openArtist(artist));
    
    cont.appendChild(clone);
  });
}

//------------------------ SHOW SINGLE ARTIST

function openArtist(artist) {
  

  // SHOW ARTIST INFO
  
  document.querySelector("#info .name").textContent = artist.name;
  document.querySelector("#info .members").textContent = artist.members;
  document.querySelector("#info .genre").textContent = artist.genre;
  document.querySelector("#info img").src = artist.logo;
  document.querySelector("#info .bio").textContent = artist.bio;
}

document.querySelector("#lineup_menu").addEventListener("click", openLineup);

function openLineup() {
  // MOVE LINEUP SECTION UP
  document.querySelector("#the_lineup_page").classList.add("active_up");
}

