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

  document.querySelector("#tablinks1").addEventListener("click", tab);
  function tab() {
    if (content1.style.display === "block") {
      content1.style.display = "none";

      document.querySelector("#tablinks1").style.backgroundColor = "";
    } else {
      content1.style.display = "block";
      document.querySelector("#tablinks1").style.backgroundColor = "#ffffff";
      document.querySelector("#tablinks2").style.backgroundColor = "";
      document.querySelector("#tablinks3").style.backgroundColor = "";
      content1.style.overflow = "scroll";
    }
    content2.style.display = "none";
    content3.style.display = "none";
  }
  tab();
  document.querySelector("#tablinks2").addEventListener("click", function () {
    if (content2.style.display === "block") {
      content2.style.display = "none";
      document.querySelector("#tablinks2").style.backgroundColor = "";
    } else {
      content2.style.display = "block";
      document.querySelector("#tablinks2").style.backgroundColor = "#ffffff";
      document.querySelector("#tablinks3").style.backgroundColor = "";
      document.querySelector("#tablinks1").style.backgroundColor = "";
    }
    content1.style.display = "none";
    content3.style.display = "none";
  });
  document.querySelector("#tablinks3").addEventListener("click", function () {
    if (content3.style.display === "block") {
      content3.style.display = "none";
      document.querySelector("#tablinks3").style.backgroundColor = "";
    } else {
      content3.style.display = "block";
      document.querySelector("#tablinks3").style.backgroundColor = "#ffffff";
      document.querySelector("#tablinks2").style.backgroundColor = "";
      document.querySelector("#tablinks1").style.backgroundColor = "";
    }
    content1.style.display = "none";
    content2.style.display = "none";
  });
  keys.forEach((key) => {
    let clone = temp.cloneNode(true);
    let data = scheduleJson[key];

    Object.keys(data).forEach((day) => {
      let daydata = data[day];
      daydata.forEach((time) => {
        let list = document.createElement("li");
        list.setAttribute("class", "scheduleList");
        let element3 = document.createElement("div");
        let element1 = document.createElement("div");
        let element2 = document.createElement("div");
//creating the new class stylethis for design
        element1.setAttribute("class", "stylethis");
        element3.innerText = "Act:   " + time["act"];
        element1.innerText = "Start:  - " + time["start"];
        element3.setAttribute("class", "stylethis3");

        element2.setAttribute("class", "stylethis2");
        element2.innerText = "end:  - " + time["end"];
        list.appendChild(element3);
        list.appendChild(element1);
        list.appendChild(element2);

        let listelem = clone.querySelector("#" + day + " ul").appendChild(list);
      });
    });

    clone.removeAttribute("hidden");
    document.querySelector("." + key).appendChild(clone);
  });
}

function displaySpotList(spots) {
  spots.forEach((spot) => {
    spot.forEach((data) => {});
  });
}
//display the available spots 
function displaySpots(spot) {
  let temp3 = document.querySelector("#spots").content;

  let clone = temp3.cloneNode(true);

  clone.querySelector(".area").innerHTML = spot.area;
  clone.querySelector(".spots").innerHTML = spot.spots;

  clone.querySelector(".available").textContent = spot.available;
  clone.querySelector("#checkbox").dataset.area = spot.area;

  document.querySelector("#availableSpots").appendChild(clone);
  
}

pre_book = document.getElementById("pre-book").innerText;

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

let calcTotal = parseInt(total1) + parseInt(total2) + parseInt(pre_book);

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
//update the value of total everytime user intereact with the ounter
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

function requiredData() {}

document.getElementById("form1").addEventListener("submit", (event) => {
  event.preventDefault();

  onClick();
});
function onClick() {
  let elems = document.getElementsByClassName("checkboxRequired");
  countdown();
  let atleastOneChecked = false;
  let selectArea;
  for (let i = 0; i < elems.length; i++) {
    if (elems[i].checked) {
      atleastOneChecked = true;
     selectArea = elems[i].dataset.area;
    }
  }
  if (!atleastOneChecked) {
    alert("Please select any one spot");
    halt()
    return;
   
  }
  //get id in ticket
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({area: selectArea , amount: 1})
  };
  fetch('https://festevent-book.herokuapp.com/reserve-spot', requestOptions)
    .then(response => response.json())
    .then((sp) => {
      // console.log(sp.id);
      localStorage.setItem("selectid", sp.id);
    });

  document.querySelector("#popUp").classList.remove("hide");
  document
    .querySelector(" #popUp .closingbutton")
    .addEventListener("click", closeDialog);
  document.querySelector("#timer").classList.remove("hide");

  function closeDialog() {
    document.querySelector("#popUp").classList.add("hide");
    document
      .querySelector("#popUp .closingbutton")
      .removeEventListener("click", closeDialog);
    document.querySelector("#timer").classList.add("hide");
    halt();
    
  }
}
document.getElementById("form2").addEventListener("submit", (event) => {
  event.preventDefault();
  checkOutForm();
});


//push data to database
document.getElementById("form3").addEventListener("submit", (event) => {
  event.preventDefault();
  let firstname = document.getElementById("grid-first-name").value;
  let lastname = document.getElementById("grid-last-name").value;
  let email = document.getElementById("grid-password").value;
  let phonenumber = document.getElementById("grid-passwor").value;
  let obj = {
    "firstname":firstname, 
    "email":email,
    "phonenumber":phonenumber,
    "lastname":lastname
  };
  console.log(obj);
post(obj);
  
});

const APIKEY="624fe7dc67937c128d7c95fc"	

const endpoint ="https://pract-6590.restdb.io/rest/data"

function post(payload){
    fetch(endpoint,{
        method: "POST",
        headers: {
            "x-apikey": APIKEY,
            "Content-Type":"application/json" 
        },
        body: JSON.stringify(payload),
    })
    .then((res) => res.json())
    .then((data) => {console.log(data)
    document.querySelector("#form3").submit();
    
    }
    );
}

// ////////////////////////////////////


function checkOutForm() {
  document.querySelector("#popUp2").classList.remove("hide");
  document.querySelector("#popUp").classList.add("hide");
  document
    .querySelector(" #popUp2 .closingbutton")
    .addEventListener("click", closeDialog2);
  setName();

  function closeDialog2() {
    document.querySelector("#popUp2").classList.add("hide");
    document
      .querySelector("#popUp2 .closingbutton")
      .removeEventListener("click", closeDialog2);

      
  }
}
document.getElementById("menu").addEventListener("click", menuOnClick);

function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

//store the name and selected days locally
function setName() {
  let inputname = document.getElementById("grid-first-name").value;
  localStorage.setItem("inputname", inputname);
  let inputday = document.getElementById("days").value;
  localStorage.setItem("inputday", inputday);



  
}
// to start countdown when user clicks next step after ticket form
const oneSec = 1000,
  container = document.getElementById("timer");

let dataMinutes = container.getAttribute("data-minutes");
let dataSeconds = container.getAttribute("data-seconds");
let timerEnd = container.getAttribute("data-timer-end");
let timerOnEndMsg = "data-timer-end";

if (dataMinutes == "" || dataMinutes == null || dataMinutes == NaN) {
  dataMinutes = "0";
}
if (dataSeconds == "" || dataSeconds == null || dataSeconds == NaN) {
  dataSeconds = "0";
}
let counter;
const countdown = function () {
  //creating element for timer div 
  let minutesSpan = document.createElement("span");
  let secondsSpan = document.createElement("span");
  let separator1 = document.createElement("span");
  let separator2 = document.createElement("span");
  let separatorValue = ":";
  minutesSpan.style.backgroundColor = "red";
  secondsSpan.style.backgroundColor = "red";

  separator2.style.backgroundColor = "red";
  minutesSpan.style.padding = "10px";
  secondsSpan.style.padding = "10px";

  separator2.style.padding = "10px";

  let max = 59,
    s = parseInt(dataSeconds) > max ? max : parseInt(dataSeconds);
  let m = parseInt(dataMinutes) > max ? max : parseInt(dataMinutes);

  secondsSpan.classList.add("time");
  minutesSpan.classList.add("time");
  separator1.classList.add("separator");
  separator1.textContent = separatorValue;
  separator2.classList.add("separator");
  separator2.textContent = separatorValue;

  let checkValue = (value) => {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  };
  minutesSpan.textContent = checkValue(dataMinutes);
  secondsSpan.textContent = checkValue(dataSeconds);

  let timer = (sv, mv) => {
    s = parseInt(sv);
    m = parseInt(mv);

    if (s > 0) {
      return (s -= 1);
    } else {
      s = max;
      if (m > 0) {
        return (m -= 1);
      }
    }
  };

  let finished = () => {
    max = 0;
    let timerEnd = container.getAttribute(timerOnEndMsg);
    container.setAttribute(timerOnEndMsg, "true");
    if (timerEnd == "" || timerEnd == null) {
      container.textContent = "timer-end";
    } else {
      container.textContent = timerEnd;
    }
  };

  counter = setInterval(() => {
    if (m == 0 && s == 0) {
      clearInterval(counter, finished());
    }

    if (s >= 0) {
      timer(s, m);
      minutesSpan.textContent = checkValue(m);
      secondsSpan.textContent = checkValue(s);
    }
  }, oneSec);
  let child;
  let children = [minutesSpan, separator2, secondsSpan];

  for (child of children) {
    container.appendChild(child);
  }
};
//stop the timer
function halt() {
  clearInterval(counter);
  //empty the div timer once user close dialouge
  document.getElementById("timer").innerHTML = "";
}
