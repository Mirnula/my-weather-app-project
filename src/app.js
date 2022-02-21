let apiKey = `0163abee892c1733e53a43b6a0e7908a`;
let apiBeggining = `https://api.openweathermap.org/data/2.5/weather?`;
let unit = `metric`;
let apiUrl = `${apiBeggining}q=New York&units=${unit}&appid=${apiKey}`;

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
}

axios.get(apiUrl).then(displayTemperature);
