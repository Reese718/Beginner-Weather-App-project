let now = new Date();
let dateTime = document.querySelector("#dateTime");
let todayDisplay = document.querySelector("#todayDisplay");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
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

dateTime.innerHTML = `${month} ${date} ${year}, ${hours}:${minutes}`;
todayDisplay.innerHTML = `${day}`;

function showTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp-today");
  tempElement.innerHTML = `${temperature}°F`;
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
}

function search(city) {
  let apiKey = "19bab870f5f47c4355d6b6a4362e572f";
  let units = "imperial";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
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

search("New York");
