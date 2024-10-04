const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");

const weatherIcons = {
    Clouds: "images/clouds.png",
    Rain: "images/rain.png",
    Clear: "images/clear.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Snow: "images/snow.png"
};

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (response.status === 404) {
            showError();
            return;
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError();
    }
}

function updateWeatherUI(data) {
    // Updating data on the page
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main;
    if (weatherIcons[weatherMain]) {
        weatherIcon.src = weatherIcons[weatherMain];
    }

    // Show weather block and hide error
    weatherElement.style.display = "block";
    errorElement.style.display = "none";
}

function showError() {
    // Show error and hide weather block
    errorElement.style.display = "block";
    weatherElement.style.display = "none";
}

// Search-button event handler
searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
