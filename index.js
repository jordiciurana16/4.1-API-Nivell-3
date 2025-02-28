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
const jokeReports = [];
document.addEventListener("DOMContentLoaded", () => {
    const joke = document.querySelector("h5");
    const button = document.querySelector("button");
    const score = document.querySelector("h6");
    const stars = document.querySelectorAll("span");
    if (!joke || !button || !score) {
        console.error("There was an error loading the page");
        return;
    }
    let selectedStarIndex;
    function fetchJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch("https://icanhazdadjoke.com/", {
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
                    joke.textContent = data.joke;
                }
                else {
                    console.error("Joke element is null");
                }
                const jokeData = {
                    id: data.id,
                    joke: data.joke,
                    rating: undefined,
                };
                jokeReports.push(jokeData);
                console.log(jokeReports);
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
