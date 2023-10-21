const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = "PASTE YOUR API KEY HERE";
const searchBox = document.querySelector(".search-box");
const wind = document.querySelector(".wind >p");
const humidity = document.querySelector(".humidity >p");
const conditionImage = document.querySelector(".weather >img");
const conditionLogos = {
    Clouds:"media/clouds.png",
    Clear:"media/clear.png",
    Drizzle:"media/drizzle.png",
    Mist:"media/mist.png",
    Rain:"media/rain.png",
    Snow:"media/snow.png",
}

async function checkWeather(cityName){
    const response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}&units=metric&lang=en`);
    let data = await response.json();
    if(data.cod==="404"){
        alert("City not found");
        return;  
    }
    
    var condition = data.weather[0].main;
    conditionImage.src = conditionLogos[condition];

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
    wind.innerHTML = data.wind.speed + " km/h";
    humidity.innerHTML = data.main.humidity + " %"; 
}


function searchCity(){
    if (searchBox.value===""){
        alert("Enter Valid City");
    }
    else{
        checkWeather(searchBox.value);
        searchBox.value="";
    }
}

function handleKeyPress(event) {

    if (event.key === 'Enter') {
      
      searchCity()
    }
  }
  
  
  document.addEventListener('keydown', handleKeyPress);

