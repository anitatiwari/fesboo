

let lineup = [];
let bandJson;
let scheduleJson;

window.addEventListener("DOMContentLoaded", start);

async function start() {


//------------------------ FETCH ALL DATA

//Fetch bands
    const bandsPromise = await fetch("https://festevent-book.herokuapp.com/bands?max=10")
        .then(res => res.json())
        .then(d => {
            bandJson = d;
            displayLineup();
        });

        


//Fetch schedule

   

const schedulePromise = await fetch(
  "https://festevent-book.herokuapp.com/schedule"
)
  .then((res) => res.json())
  .then((d) => {
      scheduleJson = d;
      displaySchedule();
  });

console.log(scheduleJson);



}

function displaySpots(spots){
  console.log(spots)
 spots.forEach((spot)=>{

  const template= document.querySelector("template#spots").content;
  const copy=template.cloneNode (true);


copy.querySelector(".area").textContent=spot.area;


  const parent=document.querySelector("#availableSpots");
  parent.appendChild(copy);
});
}
// Fetch Camping spots


// //................ Fetch all done


function displayLineup() {

    let temp = document.querySelector("#artist").content;
    let cont = document.querySelector(".elementcontainer");
    bandJson = bandJson.filter(artist=>{
      return artist.genre.startsWith("Pop");
      
    })
    bandJson = bandJson.filter(artist=> {
      return artist.logo.startsWith("http://");
    })

    bandJson.forEach((artist) => {
        let clone = temp.cloneNode(true);
        clone.querySelector("#bandName").innerHTML = artist.name;
        clone.querySelector("#genre").innerHTML = artist.genre;
        if (artist.logo.startsWith("http://")) {
            clone.querySelector("#logo").src = artist.logo;
        } else {
            clone.querySelector("#logo").src = "http://placeimg.com/720/480/nature?76645";
        }
        artist.members.forEach(m=>{
            var li = document.createElement("li");
            li.appendChild(document.createTextNode(m))
            clone.querySelector("#member").appendChild(li)
        })
        clone.querySelector("#genre").addEventListener('click', function () {
            openArtist(artist);
        });

        document.querySelector(".elementcontainer").appendChild(clone);
        
    });
}
function displaySchedule() {
  // console.log("hello" , scheduleJson["Jotunheim"]);
  let temp = document.querySelector(".time");
  var keys = Object.keys(scheduleJson);
  let content1 = document.querySelector("#content1");
  let content2 = document.querySelector("#content2");
  let content3 = document.querySelector("#content3");

  document.querySelector("#tablinks1").addEventListener("click", function () {
      if (content1.style.display === "block") {
          content1.style.display = "none";
      } else {
          content1.style.display = "block";
      }
      content2.style.display = "none"
      content3.style.display = "none"
  })
  document.querySelector("#tablinks2").addEventListener("click", function () {
      if (content2.style.display === "block") {
          content2.style.display = "none";
      } else {
          content2.style.display = "block";
      }
      content1.style.display = "none"
      content3.style.display = "none"

  })
  document.querySelector("#tablinks3").addEventListener("click", function () {
      if (content3.style.display === "block") {
          content3.style.display = "none";
      } else {
          content3.style.display = "block";
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
                      "Start: " + time["start"] + " End :" + time["end"] + " Act : " + time["act"]
                  )
              );
              clone.querySelector("#" + day + " ul").appendChild(list)
          });
      });
      clone.removeAttribute("hidden")
      document.querySelector("." + key).appendChild(clone)
  });
}


//------------------------ SHOW SINGLE ARTIST

function openArtist(artist) {


    // SHOW ARTIST INFO

    const modal = document.querySelector("#modal")
    openModal(modal)

    document.querySelector(".title").innerHTML = artist.name
    document.querySelector(".modal-body").innerHTML = artist.bio

}


const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')


overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}




document.getElementById("menu").addEventListener("click", menuOnClick);;



function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}
