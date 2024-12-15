// API key for OpenWeatherMap
const apiKey = "7c5854ea1f5e3beb98162f19e0da75a6";


async function getWeatherData() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(url);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === "404") {
            document.getElementById("searchMessage").style.display = "none";
            document.getElementById("notFoundMessage").style.display = "block";
            document.getElementById("weatherInfo").style.display = "none";
            return;
        }

        // Show weather data
        document.getElementById("searchMessage").style.display = "none";
        document.getElementById("notFoundMessage").style.display = "none";
        document.getElementById("weatherInfo").style.display = "block";

        document.getElementById("cityName").textContent = weatherData.name;
        document.getElementById("temperature").textContent = `${weatherData.main.temp} °C  ${weatherData.weather[0].description}`;
        document.getElementById("windSpeed").textContent = `Wind Speed: ${weatherData.wind.speed} km/h`;
        document.getElementById("humidity").textContent = `${weatherData.main.humidity}%`;
        document.getElementById("wind").textContent = `${weatherData.wind.speed}%`;


        const weatherIcon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        document.getElementById("weatherIcon").src = weatherIcon;


        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        const forecastItemsContainer = document.getElementById("forecastItems");
        forecastItemsContainer.innerHTML = '';

        for (let i = 0; i < forecastData.list.length; i += 8) {
            const forecast = forecastData.list[i];
            const forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-items");
            forecastItem.innerHTML = `
                <h5 class="forecast-item-date regular-txt">${new Date(forecast.dt * 1000).toLocaleDateString()}</h5>
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="forecast-item-img">
                <h5 class="forecast-item-temp">${forecast.main.temp} °C</h5>
            `;
            forecastItemsContainer.appendChild(forecastItem);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data!");
    }
}