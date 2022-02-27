let date = new Date();

let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[date.getDay()];

let todayDate = document.querySelector(".date-time");

todayDate.innerHTML = ` ${day}, ${hour}:${minutes} `;

function formatDay(time) {
  let date = new Date(time * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}

function displayWeekWeather(response) {
  let daysOfWeek = response.data.daily;
  let weeklyWeather = document.querySelector(".days-of-week");

  let forecastHTML = `<div class="row">`;

  daysOfWeek.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  <div class="col-2">
       <div class="day-forecast">${formatDay(forecastDay.dt)}</div>
       <img
       src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png"
       class="image-weather"
       width="40"
       />
     <div class="temperature-forecast">
    <span class="max-temp"> ${Math.round(forecastDay.temp.max)}°</span>
    <span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
    </div>
     </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  weeklyWeather.innerHTML = forecastHTML;
}
function getWeeklyForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `0163abee892c1733e53a43b6a0e7908a`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeekWeather);
}

function displayTemperature(response) {
  let temperatureNumber = document.querySelector(".temperature");
  temperatureNumber.innerHTML = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;
  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let icon = document.querySelector(".icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getWeeklyForecast(response.data.coord);
}

function search(city) {
  let apiKey = `0163abee892c1733e53a43b6a0e7908a`;
  let apiBeggining = `https://api.openweathermap.org/data/2.5/weather?`;
  let unit = `metric`;
  let apiUrl = `${apiBeggining}q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
search("Zagreb");

function searchCity(event) {
  event.preventDefault();
  let enterCity = document.querySelector("#city-input");
  search(enterCity.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
