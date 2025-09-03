const apiKey = "7e8cfbe0a547966d98531c6eb6d2c75c";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");
const suggestions = document.getElementById("suggestions");

// Fetch weather
async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} km/h`;

    // Weather icon from OpenWeatherMap
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  } catch (error) {
    alert(error.message);
  }
}

// Fetch city suggestions
async function fetchCitySuggestions(query) {
  if (query.length < 3) {
    suggestions.innerHTML = "";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&cnt=5&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  suggestions.innerHTML = "";
  data.list.forEach((city) => {
    const div = document.createElement("div");
    div.textContent = `${city.name}, ${city.sys.country}`;
    div.onclick = () => {
      cityInput.value = city.name;
      suggestions.innerHTML = "";
      fetchWeather(city.name);
    };
    suggestions.appendChild(div);
  });
}

// Event Listeners
searchBtn.addEventListener("click", () => {
  fetchWeather(cityInput.value);
});

cityInput.addEventListener("input", () => {
  fetchCitySuggestions(cityInput.value);
});
