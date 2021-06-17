import './sass/style.scss'

import * as ClockWidget from "js-easy-clock";
const config = { 
  width: 150, 
  height: 150, 
  radius: 70, 
  watchFace: 'FACE_1' 
}
let clock = new ClockWidget.ClockApp(document.getElementById('myClock'), config);









/* import showTime from "./node_modules/digital-clock/index.js"; */


"use strict"

window.addEventListener("DOMContentLoaded", init )



let globalData = {};


function init(){
  fetchData();
}
async function fetchData() {

  const response = await fetch('https://foobardata.herokuapp.com/');
  const jsonData = await response.json();

  globalData = jsonData; 
  displayEmployeeData();
  displayStorageData();
  displayQue();
  displayBar();
  console.log(globalData);
}


function displayEmployeeData(){
  
  const selector = document.querySelectorAll("#bartender div");

  let counter = 0;
  selector.forEach( () => {
      counter++
      document.querySelector(`#bartender .employee_${counter} h2`).innerHTML = globalData.bartenders[(counter-1)].name;
      document.querySelector(`#bartender .employee_${counter} h3`).innerHTML = `Customer: ${globalData.bartenders[(counter-1)].servingCustomer}`;
      document.querySelector(`#bartender .employee_${counter} h4`).innerHTML = globalData.bartenders[(counter-1)].statusDetail;
  })
}


function displayStorageData() {
  const selector = document.querySelectorAll("#beer_storage div");

  let counter = 0;
  selector.forEach( () => {
      counter++
      document.querySelector(`#beer_storage .storage_unit_${counter} h3`).innerHTML = globalData.storage[(counter-1)].name;
      document.querySelector(`#beer_storage .storage_unit_${counter} h4`).innerHTML = "Amount: " + globalData.storage[(counter-1)].amount;
  })


}


function displayQue() {

  const container = document.querySelector("#que_container");
  const template = document.querySelector("#queue_status template");
  container.innerHTML ="";
  
  let counter = 0;

  globalData.queue.forEach( (person) => {
  
      counter++
      const klon = template.cloneNode(true).content;
      
      klon.querySelector(`h3`).innerHTML = counter + ". In queue";
      klon.querySelector(`h4`).innerHTML = person.id;
      klon.querySelector(`h5`).innerHTML = person.order.join();

      container.appendChild(klon); 
  });
 
 
}

function displayBar(){
  const barSelector = document.querySelectorAll("#bar div");


  barSelector.forEach(()=>{
   
     
   document.querySelector(".bar_info_time h3").innerHTML = globalData.bar.closingTime; 
  })
}


//dark and light theme

const checkbox = document.querySelector('input[name=theme]');
const colorText = document.querySelector(".color-text h3")

checkbox.addEventListener('change', function() {
    if(this.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark');
        colorText.textContent = "🌙"
    } else {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
        colorText.textContent = "🔆"
    }
})

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}



