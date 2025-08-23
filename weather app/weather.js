const humidity = document.querySelector(".humidity .text-info p:first-child");
const wind = document.querySelector(".wind .text-info p:first-child");
const temperature = document.querySelector(".weather-info h1");
const city = document.querySelector(".weather-info h2");
const weatherImage = document.querySelector(".weather-info img");
const cityInput = document.querySelector("#input-location");
const searchBtn = document.querySelector(".search-btn");
const container = document.querySelector(".weather-wrapper");
const errMessage = document.querySelector(".error");
const result = document.querySelector(".result");

let getWeatherInfo = async(cityInput) => {
    const apiKey = `e1718b01bb63a78a2ba713ce0f6b730b`;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityInput}&appid=${apiKey}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    if(response.status == 404) {
        errMessage.style.visibility = "visible";
        result.style.display = "none";
    } else {
        temperature.textContent = Math.round(data.main.temp) + "°c";
        city.textContent = data.name;
        humidity.textContent = data.main.humidity + "%";
        wind.textContent = data.wind.speed + " km/h";
        if(data.weather[0].main == "Clouds") {
            weatherImage.src = "./images/clouds.png";
            container.style.background = "linear-gradient(135deg, rgb(176,196,222), rgb(119,136,153))";
        } else if(data.weather[0].main == "Clear") {
            weatherImage.src = "./images/clear.png";
            container.style.background = "linear-gradient(135deg, rgb(135,206,250), rgb(25,25,112))";
        } else if(data.weather[0].main == "Rain") {
            weatherImage.src = "./images/rain.png";
            container.style.background = "linear-gradient(135deg, rgb(64,64,122), rgb(0,0,64))";
        } else if(data.weather[0].main == "Drizzle") {
            weatherImage.src = "./images/drizzle.png";
            container.style.background = "linear-gradient(135deg, rgb(176,196,222), rgb(100,149,237))";
        } else if(data.weather[0].main == "Mist") {
            weatherImage.src = "./images/mist.png";
            container.style.background = "linear-gradient(135deg, rgb(200,200,200), rgb(169,169,169))";
        }
        errMessage.style.visibility = "hidden";
        result.style.display = "block";
    }
    
}

searchBtn.addEventListener("click", () => getWeatherInfo(cityInput.value));

cityInput.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        getWeatherInfo(cityInput.value);
    }
})