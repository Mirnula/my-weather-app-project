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

let apiKey = `0163abee892c1733e53a43b6a0e7908a`;
let apiBeggining = `https://api.openweathermap.org/data/2.5/weather?`;
let unit = `metric`;
let city = "Zagreb";
let apiUrl = `${apiBeggining}q=${city}&units=${unit}&appid=${apiKey}`;

function displayTemperature(response) {
  let temperatureNumber = document.querySelector("#temperature");
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
}

axios.get(apiUrl).then(displayTemperature);
