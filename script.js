const apiKey = "7e8cfbe0a547966d98531c6eb6d2c75c";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const suggestions = document.getElementById("suggestions");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const condition = document.getElementById("condition");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");



// Fetch city sugges
cityInput.addEventListener("input", async () => {
  const query = cityInput.value;
  if (query.length < 2) {
    suggestions.innerHTML = "";
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  

  suggestions.innerHTML = "";
  if (data.list) {
    data.list.forEach(city => {
      const li = document.createElement("li");
      li.textContent = `${city.name}, ${city.sys.country}`;
      li.addEventListener("click", () => {
        cityInput.value = city.name;
        suggestions.innerHTML = "";
        fetchWeather(city.name);
      });
      suggestions.appendChild(li);
    });
  }
});

// Fetch weather by city
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === 200) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    condition.textContent = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} km/h`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  } else {
    cityName.textContent = "Not Found";
    condition.textContent = "--";
    temperature.textContent = "-- °C";
    humidity.textContent = "--%";
    wind.textContent = "-- km/h";
    weatherIcon.src = "";
  }
}

searchBtn.addEventListener("click", () => {
  fetchWeather(cityInput.value);
});
