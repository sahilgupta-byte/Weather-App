// ========================================
// WEATHER APP
// ========================================


// Get HTML elements

const cityInput = document.getElementById("cityInput");

const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");

const temperature = document.getElementById("temperature");

const condition = document.getElementById("condition");

const humidity = document.getElementById("humidity");

const wind = document.getElementById("wind");

const feelsLike = document.getElementById("feelsLike");

const weatherIcon = document.getElementById("weatherIcon");


// ========================================
// OPENWEATHER API KEY
// ========================================

const API_KEY = "6737275b88574748f15975180809e14c";


// ========================================
// SEARCH BUTTON
// ========================================

searchBtn.addEventListener("click", function () {

    const city = cityInput.value.trim();


    // Check empty input

    if (city === "") {

        alert("Please enter a city name");

        return;
    }


    // Call weather function

    getWeather(city);

});


// ========================================
// ENTER KEY SEARCH
// ========================================

cityInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});


// ========================================
// GET WEATHER DATA
// ========================================

async function getWeather(city) {

    try {

        // API URL

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;


        // Send request

        const response = await fetch(url);


        // Convert response into JSON

        const data = await response.json();


        // ========================================
        // ERROR HANDLING
        // ========================================

        if (!response.ok) {

            if (response.status === 404) {

                alert("City not found!");

            }

            else if (response.status === 401) {

                alert("Invalid API key!");

            }

            else {

                alert("Unable to get weather data.");

            }

            return;
        }


        // ========================================
        // CITY
        // ========================================

        cityName.innerText =
            `${data.name}, ${data.sys.country}`;


        // ========================================
        // TEMPERATURE
        // ========================================

        temperature.innerText =
            `${Math.round(data.main.temp)}°C`;


        // ========================================
        // WEATHER CONDITION
        // ========================================

        condition.innerText =
            data.weather[0].description;


        // ========================================
        // HUMIDITY
        // ========================================

        humidity.innerText =
            `${data.main.humidity}%`;


        // ========================================
        // WIND SPEED
        // ========================================

        wind.innerText =
            `${data.wind.speed} m/s`;


        // ========================================
        // FEELS LIKE
        // ========================================

        feelsLike.innerText =
            `${Math.round(data.main.feels_like)}°C`;


        // ========================================
        // WEATHER ICON
        // ========================================

        const weatherType =
            data.weather[0].main;


        if (weatherType === "Clear") {

            weatherIcon.innerText = "☀️";

        }

        else if (weatherType === "Clouds") {

            weatherIcon.innerText = "☁️";

        }

        else if (weatherType === "Rain") {

            weatherIcon.innerText = "🌧️";

        }

        else if (weatherType === "Drizzle") {

            weatherIcon.innerText = "🌦️";

        }

        else if (weatherType === "Thunderstorm") {

            weatherIcon.innerText = "⛈️";

        }

        else if (weatherType === "Snow") {

            weatherIcon.innerText = "❄️";

        }

        else if (weatherType === "Mist" ||
                 weatherType === "Fog" ||
                 weatherType === "Haze") {

            weatherIcon.innerText = "🌫️";

        }

        else {

            weatherIcon.innerText = "🌤️";

        }


        // ========================================
        // CONSOLE
        // ========================================

        console.log(data);

    }


    // ========================================
    // CATCH ERROR
    // ========================================

    catch (error) {

        console.log(error);

        alert(
            "Something went wrong. Please check your internet connection."
        );

    }

}