let now = new Date();
let p = document.querySelector("#date");
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
  "Saturday"
];
let day = days[now.getDay()];
p.innerHTML = `${day} ${hours}:${minutes}`;

function showTemperature(response) {
  
  let showTemp = document.querySelector("#temperature");
  let showName = document.querySelector("#city");
  let showWind = document.querySelector("#wind");
  let showHumidity = document.querySelector("#humidity");
  let showIcon = document.querySelector("#icon");
  celsiusTemperature=response.data.main.temp
  showTemp.innerHTML = Math.round(celsiusTemperature);
  showName.innerHTML = response.data.name;
  showWind.innerHTML = `${Math.round(response.data.wind.speed)}mph`;
  showHumidity.innerHTML = `${response.data.main.humidity}%`;
  showIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  console.log(response.data);
}

function showCity(city) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiKey = "0e1ea4ae7f51d4c9762e97b2469c129a";
  let apiUrl = `${apiEndpoint}q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function citySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityHeading = document.querySelector("#city");
  cityHeading.innerHTML = `${searchInput.value}`;
  showCity(searchInput.value);
}


function displayLocationTemp(response) {
  let displayTemp = document.querySelector("#temperature");
  let displayName = document.querySelector("#city");
  let displayWind = document.querySelector("#wind");
  let displayHumidity = document.querySelector("#humidity");
  displayTemp.innerHTML = Math.round(response.data.main.temp);
  displayName.innerHTML = response.data.name;
  displayWind.innerHTML = `${Math.round(response.data.wind.speed)}mph`;
  displayHumidity.innerHTML = `${response.data.main.humidity}%`;
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiKey = "0e1ea4ae7f51d4c9762e97b2469c129a";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayLocationTemp);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", citySearch);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

navigator.geolocation.getCurrentPosition(showLocation);
