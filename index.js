"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
("use strict");
const jokeReports = [];
const weatherInfo = {
    "0": { description: "Clear sky", unicode: "☀️" },
    "1": { description: "Mainly clear", unicode: "🌤️" },
    "2": { description: "Partly cloudy", unicode: "⛅" },
    "3": { description: "Overcast", unicode: "☁️" },
    "4": { description: "Foggy", unicode: "🌫️" },
    "5": { description: "Hazy", unicode: "🌫️" },
    "6": { description: "Dusty", unicode: "🌪️" },
    "7": { description: "Smoke", unicode: "🌫️" },
    "8": { description: "Volcanic ash", unicode: "🌋" },
    "9": { description: "Squalls", unicode: "💨" },
    "10": { description: "Mist", unicode: "🌫️" },
    "11": { description: "Patches of fog", unicode: "🌫️" },
    "12": { description: "Continuous fog", unicode: "🌫️" },
    "13": { description: "Drizzle", unicode: "🌦️" },
    "14": { description: "Light rain", unicode: "🌧️" },
    "15": { description: "Moderate rain", unicode: "🌧️" },
    "16": { description: "Heavy rain", unicode: "🌧️" },
    "17": { description: "Freezing rain", unicode: "🌧️" },
    "18": { description: "Sleet", unicode: "🌨️" },
    "19": { description: "Snow showers", unicode: "🌨️" },
    "20": { description: "Light snow", unicode: "🌨️" },
    "21": { description: "Moderate snow", unicode: "🌨️" },
    "22": { description: "Heavy snow", unicode: "❄️" },
    "23": { description: "Ice crystals", unicode: "❄️" },
    "24": { description: "Ice pellets", unicode: "❄️" },
    "25": { description: "Hail", unicode: "⛈️" },
    "26": { description: "Light thunderstorm", unicode: "⛈️" },
    "27": { description: "Moderate thunderstorm", unicode: "⛈️" },
    "28": { description: "Heavy thunderstorm", unicode: "⛈️" },
    "29": { description: "Tornado", unicode: "🌪️" },
    "30": { description: "Hurricane", unicode: "🌀" },
    "45": { description: "Fog", unicode: "🌫️" },
    "48": { description: "Depositing rime fog", unicode: "🌫️" },
    "51": { description: "Light drizzle", unicode: "🌦️" },
    "53": { description: "Moderate drizzle", unicode: "🌦️" },
    "55": { description: "Dense drizzle", unicode: "🌧️" },
    "56": { description: "Light freezing drizzle", unicode: "🌧️" },
    "57": { description: "Dense freezing drizzle", unicode: "🌧️" },
    "61": { description: "Slight rain", unicode: "🌧️" },
    "63": { description: "Moderate rain", unicode: "🌧️" },
    "65": { description: "Heavy rain", unicode: "🌧️" },
    "66": { description: "Light freezing rain", unicode: "🌧️" },
    "67": { description: "Heavy freezing rain", unicode: "🌧️" },
    "71": { description: "Slight snow fall", unicode: "🌨️" },
    "73": { description: "Moderate snow fall", unicode: "🌨️" },
    "75": { description: "Heavy snow fall", unicode: "❄️" },
    "77": { description: "Snow grains", unicode: "❄️" },
    "80": { description: "Slight rain showers", unicode: "🌧️" },
    "81": { description: "Moderate rain showers", unicode: "🌧️" },
    "82": { description: "Violent rain showers", unicode: "🌧️" },
    "85": { description: "Slight snow showers", unicode: "🌨️" },
    "86": { description: "Heavy snow showers", unicode: "❄️" },
    "95": { description: "Thunderstorm", unicode: "⛈️" },
    "96": { description: "Thunderstorm with slight hail", unicode: "⛈️" },
    "99": { description: "Thunderstorm with heavy hail", unicode: "⛈️" },
};
document.addEventListener("DOMContentLoaded", () => {
    const joke = document.querySelector("h5");
    const button = document.querySelector("button");
    const score = document.querySelector("h6");
    const stars = document.querySelectorAll("h6 span");
    const weather = document.querySelector("header");
    const weatherIcon = document.querySelector("header span");
    const weatherString = document.querySelector("header h4");
    fetchWeather();
    if (!joke || !button || !score) {
        console.error("There was an error loading the page");
        return;
    }
    let selectedStarIndex;
    let useChuckNorrisAPI = false;
    function fetchWeather() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const latitude = 41.3888;
                const longitude = 2.159;
                const response = yield fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                const data = yield response.json();
                if (data.current_weather) {
                    const weathercode = data.current_weather.weathercode;
                    if (weatherString && weatherIcon) {
                        weatherString.textContent = weatherInfo[weathercode].description;
                        weatherIcon.textContent = weatherInfo[weathercode].unicode;
                    }
                    else {
                        console.error("Error fetching weather data");
                    }
                }
                else {
                    console.error("Error fetching weather data");
                }
            }
            catch (error) {
                console.error("Error fetching weather data:", error);
            }
        });
    }
    fetchWeather();
    function fetchJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(useChuckNorrisAPI
                    ? "https://api.chucknorris.io/jokes/random"
                    : "https://icanhazdadjoke.com/", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = yield response.json();
                if (joke) {
                    joke.textContent = useChuckNorrisAPI ? data.value : data.joke;
                }
                else {
                    console.error("Joke element is null");
                }
                const jokeData = {
                    id: data.id,
                    joke: useChuckNorrisAPI ? data.value : data.joke,
                    rating: undefined,
                };
                jokeReports.push(jokeData);
                console.log(jokeReports);
                useChuckNorrisAPI = !useChuckNorrisAPI;
            }
            catch (error) {
                if (error instanceof Error && joke) {
                    joke.style.color = "red";
                    joke.textContent = error.message;
                }
                else {
                    console.error("Joke element is null or error is not an instance of Error");
                }
            }
        });
    }
    function updateJokeRating(rating) {
        if (jokeReports.length > 0) {
            jokeReports[jokeReports.length - 1].rating = rating;
        }
    }
    function updateJokeDate(date) {
        if (jokeReports.length > 0) {
            jokeReports[jokeReports.length - 1].date = date;
        }
    }
    function resetScore() {
        stars.forEach((star) => {
            star.innerHTML = "&#9734;";
        });
        selectedStarIndex = -1;
    }
    fetchJoke();
    resetScore();
    button.addEventListener("click", () => {
        fetchJoke();
        resetScore();
    });
    score.addEventListener("mouseover", (event) => {
        const hoveredStarIndex = Array.from(stars).indexOf(event.target);
        stars.forEach((star, index) => {
            star.innerHTML = index <= hoveredStarIndex ? "&#9733;" : "&#9734;";
        });
    });
    score.addEventListener("mouseout", () => {
        stars.forEach((star, index) => {
            star.innerHTML =
                index <= (selectedStarIndex !== null && selectedStarIndex !== void 0 ? selectedStarIndex : -1) ? "&#9733;" : "&#9734;";
        });
    });
    score.addEventListener("click", (event) => {
        const clickedStarIndex = Array.from(stars).indexOf(event.target);
        const ratingTime = new Date().toISOString();
        if (clickedStarIndex !== -1) {
            selectedStarIndex = clickedStarIndex;
            updateJokeRating((selectedStarIndex + 1));
            updateJokeDate(ratingTime);
        }
        stars.forEach((star, index) => {
            star.innerHTML =
                index <= (selectedStarIndex !== null && selectedStarIndex !== void 0 ? selectedStarIndex : -1) ? "&#9733;" : "&#9734;";
        });
    });
});
