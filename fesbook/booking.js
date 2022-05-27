

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
  // let normTicket = document.getElementById("normal-price").innerText;

  // total1 = parseFloat(normTicket) * cmp.innerText;

  // updateTotal(total1);
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
  console.log("Ticket Clicked");
  cmp.innerHTML = parseInt(cmp.innerHTML) + 1;

  let normTicket = document.getElementById("normal-price").innerText;

  // total1 = parseFloat(normTicket) * cmp.innerText;
  // console.log(total1);
  // updateTotal(total1);
  updateTotalGlobal();
}
normalTicketplus();

var poke01 = document.getElementById("poke01");
var cmp1 = document.getElementById("counter2");
poke01.addEventListener("click", vipTicketminus);
function vipTicketminus() {
  console.log("minus");
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
console.log(calcTotal);
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
  console.log("normalCount, vipCount");
  console.log(normalCount, vipCount);
  let normalCountTotal = normalCount * normalPrice;
  let vipCountTotal = vipCount * vipPrice;
  let summedUp = normalCountTotal + vipCountTotal;
  console.log("summedUp", summedUp);
  updateTotal(summedUp);
}



