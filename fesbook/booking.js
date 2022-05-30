// import { menuOnClick } from 'main.js'

let pre_book;
let scheduleJson;
let spotsJson;
window.addEventListener("DOMContentLoaded", init);

async function init() {
  const schedulePromise = await fetch(
    "https://festevent-book.herokuapp.com/schedule"
  )
    .then((res) => res.json())
    .then((d) => {
        scheduleJson = d;
        displaySchedule();
    });
  
  console.log(scheduleJson);
  

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

function displaySchedule() {
  // console.log("hello" , scheduleJson["Jotunheim"]);
  let temp = document.querySelector(".time");
  var keys = Object.keys(scheduleJson);
  let content1 = document.querySelector("#content1");
  let content2 = document.querySelector("#content2");
  let content3 = document.querySelector("#content3");
  content1.style.overflow = "scroll";
  content2.style.overflow = "scroll";

  content3.style.overflow = "scroll";

  content1.style.height = "50vw";
  content2.style.height = "50vw";
  content3.style.height = "50vw";

  document.querySelector("#tablinks1").addEventListener("click", tab)
   function tab () {
      if (content1.style.display === "block") {
          content1.style.display = "none";

          document.querySelector("#tablinks1").style.backgroundColor=""
      } else {
          content1.style.display = "block";
          document.querySelector("#tablinks1").style.backgroundColor="#ffffff"
          document.querySelector("#tablinks2").style.backgroundColor=""
          document.querySelector("#tablinks3").style.backgroundColor=""
                    content1.style.overflow = "scroll";

      }
      content2.style.display = "none"
      content3.style.display = "none"
  }
tab()
  document.querySelector("#tablinks2").addEventListener("click", function () {
      if (content2.style.display === "block") {
          content2.style.display = "none";
          document.querySelector("#tablinks2").style.backgroundColor=""
      } else {
          content2.style.display = "block";
          document.querySelector("#tablinks2").style.backgroundColor="#ffffff"
          document.querySelector("#tablinks3").style.backgroundColor=""
          document.querySelector("#tablinks1").style.backgroundColor=""
      }
      content1.style.display = "none"
      content3.style.display = "none"

  })
  document.querySelector("#tablinks3").addEventListener("click", function () {
      if (content3.style.display === "block") {
          content3.style.display = "none";
          document.querySelector("#tablinks3").style.backgroundColor=""
      } else {
          content3.style.display = "block";
          document.querySelector("#tablinks3").style.backgroundColor="#ffffff"
          document.querySelector("#tablinks2").style.backgroundColor=""
          document.querySelector("#tablinks1").style.backgroundColor=""
      }
      content1.style.display = "none"
      content2.style.display = "none"

  })
  keys.forEach((key) => {
      let clone = temp.cloneNode(true)
      let data = scheduleJson[key];

      Object.keys(data).forEach((day) => {
    
          let daydata = data[day];
          daydata.forEach((time) => {
              let list = document.createElement("li");
          list.appendChild(
              document.createTextNode(
                      "Start: " + time["start"] + " "+ " End :" + time["end"] + " Act : " + time["act"]
                  )
              )
          
             let listelem= clone.querySelector("#" + day + " ul").appendChild(list);
            //  listelem.style.border="0.4px solid"
            //  listelem.style.fontSize="1.2em"

          });
       
      });
     
      clone.removeAttribute("hidden")
      document.querySelector("." + key).appendChild(clone)
  });
}


function displaySpotList(spots) {

  spots.forEach((spot) => {
    spot.forEach((data) => {
    });
  });
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
 pre_book = document.getElementById("pre-book").innerText;
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

let calcTotal = parseInt(total1) + parseInt(total2) + parseInt(pre_book);
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
document.getElementById("menu").addEventListener("click", menuOnClick);;



 function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}