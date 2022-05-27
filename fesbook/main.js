

let lineup = [];
let bandJson;

window.addEventListener("DOMContentLoaded", start);

async function start() {


//------------------------ FETCH ALL DATA

//Fetch bands
    const bandsPromise = await fetch("https://festevent-book.herokuapp.com/bands")
        .then(res => res.json())
        .then(d => {
            bandJson = d;
            displayLineup();
        });

        


//Fetch schedule

    const schedulePromise = await fetch(
        "https://festevent-book.herokuapp.com/schedule",
        {
            method: "GET",

        }
    );
    

}


// Fetch Camping spots
const availableSpots = await fetch(
  "https://festevent-book.herokuapp.com/available-spots",
  {
    method: "GET",
  }
);

start();
// //................ Fetch all done


function displayLineup() {

    let temp = document.querySelector("#artist");
    let cont = document.querySelector(".elementcontainer");
    bandJson = bandJson.filter(artist=>{
      return artist.genre.startsWith("Pop");
      
    })
    bandJson = bandJson.filter(artist=> {
      return artist.logo.startsWith("http://");
    })

    bandJson.forEach((artist) => {
        let clone = temp.cloneNode(true);
        clone.querySelector("#genre").innerHTML = artist.name;
        clone.querySelector("#bio").innerHTML = artist.genre;
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