import './style.css'

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
