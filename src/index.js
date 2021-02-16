let now = new Date();
let dateTime = document.querySelector("#dateTime");
let todayDisplay = document.querySelector("#todayDisplay");
let time = document.querySelector("#time");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:{minutes}`;
}

let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

dateTime.innerHTML = `${month} ${date}, ${year} `;
todayDisplay.innerHTML = `${day}`;
time.innerHTML = `${hours}:${minutes}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    hour: "numeric",

    hour12: true,
  });
}

function showTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp-today");
  tempElement.innerHTML = `${temperature}`;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind} mph`;
  let description = document.querySelector("#weatherDescription");
  description.innerHTML = response.data.weather[0].main;
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = `Feels Like ${feelsLike}°F`;
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  farenheitTemperature = response.data.main.temp;
}

function displayForecast(response) {
  let fiveDayElement = document.querySelector("#fiveDay");
  let forecast = response.data.list[0];
  fiveDayElement.innerHTML = `
          <div class="col-2  ml-0 m-1">
            <div class="card hourlyCard one">
                <img src= "http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"/>
                <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
                <p class="fiveDay-text">${Math.round(
                  forecast.main.temp_max
                )}°H<br />${Math.round(forecast.main.temp_min)}°L</p>
              </div>
            </div>
  `;
  forecast = response.data.list[1];
  fiveDayElement.innerHTML += `
          <div class="col-2 m-1" >
            <div class="card hourlyCard two">
                <img src= "http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"/>
                <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
                <p class="fiveDay-text">${Math.round(
                  forecast.main.temp_max
                )}°H<br />${Math.round(forecast.main.temp_min)}°L</p>
              </div>
            </div>  
  `;
  forecast = response.data.list[2];
  fiveDayElement.innerHTML += `
          <div class="col-2 m-1">
            <div class="card hourlyCard three">
                <img src= "http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"/>
                <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
                <p class="fiveDay-text">${Math.round(
                  forecast.main.temp_max
                )}°H<br />${Math.round(forecast.main.temp_min)}°L</p>
              </div>
            </div>          
  `;
  forecast = response.data.list[3];
  fiveDayElement.innerHTML += `
          <div class="col-2 m-1">
            <div class="card hourlyCard four">
                <img src= "http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"/>
                <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
                <p class="fiveDay-text">${Math.round(
                  forecast.main.temp_max
                )}°H<br />${Math.round(forecast.main.temp_min)}°L</p>
              </div>
            </div>
  `;
  forecast = response.data.list[4];
  fiveDayElement.innerHTML += `
          <div class="col-2 m-1">
            <div class="card hourlyCard five">
                <img src= "http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"/>
                <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
                <p class="fiveDay-text">${Math.round(
                  forecast.main.temp_max
                )}°H<br />${Math.round(forecast.main.temp_min)}°L</p>
              </div>
            </div>
  `;

  console.log(response.data.list[0]);
}
function search(city) {
  let apiKey = "19bab870f5f47c4355d6b6a4362e572f";
  let units = "imperial";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function cityInputSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

let citySearchButton = document.querySelector("#search-form");
citySearchButton.addEventListener("submit", cityInputSearch);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiKey = "19bab870f5f47c4355d6b6a4362e572f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = ((farenheitTemperature - 32) * 5) / 9;
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempElement = document.querySelector("#temp-today");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

function showFarenheitTemperature(event) {
  event.preventDefault();
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let tempElement = document.querySelector("#temp-today");
  tempElement.innerHTML = Math.round(farenheitTemperature);
}

let farenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature);

search("New York");
