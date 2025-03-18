import weatherData from "./weather.json";

const weatherInfo: Weather = weatherData;

("use strict");

type Joke = {
  readonly id: string;
  joke: string;
  rating?: Score;
  date?: Time;
};

type Score = undefined | 1 | 2 | 3;
type Time = undefined | string;

type Weather = {
  [key: string]: {
    description: string;
    unicode: string;
  };
};

const jokeReports: Joke[] = [];

document.addEventListener("DOMContentLoaded", () => {
  const joke: HTMLElement | null = document.querySelector("h5");
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

  let selectedStarIndex: number | undefined;
  let useChuckNorrisAPI = false;

  async function fetchWeather() {
    try {
      const latitude = 41.3888;
      const longitude = 2.159;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (data.current_weather) {
        const weathercode = data.current_weather.weathercode;

        if (weatherString && weatherIcon) {
          weatherString.textContent = weatherInfo[weathercode].description;
          weatherIcon.textContent = weatherInfo[weathercode].unicode;
        } else {
          console.error("Error fetching weather data");
        }
      } else {
        console.error("Error fetching weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  async function fetchJoke() {
    try {
      const response = await fetch(
        useChuckNorrisAPI
          ? "https://api.chucknorris.io/jokes/random"
          : "https://icanhazdadjoke.com/",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      if (joke) {
        joke.textContent = useChuckNorrisAPI ? data.value : data.joke;
      } else {
        console.error("Joke element is null");
      }

      const jokeData: Joke = {
        id: data.id,
        joke: useChuckNorrisAPI ? data.value : data.joke,
        rating: undefined,
      };

      jokeReports.push(jokeData);
      console.log(jokeReports);

      useChuckNorrisAPI = !useChuckNorrisAPI;
    } catch (error) {
      if (error instanceof Error && joke) {
        joke.style.color = "red";
        joke.textContent = error.message;
      } else {
        console.error(
          "Joke element is null or error is not an instance of Error"
        );
      }
    }
  }

  function updateJokeRating(rating: Score) {
    if (jokeReports.length > 0) {
      jokeReports[jokeReports.length - 1].rating = rating;
    }
  }

  function updateJokeDate(date: string) {
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
    const hoveredStarIndex = Array.from(stars).indexOf(
      event.target as HTMLSpanElement
    );

    stars.forEach((star, index) => {
      star.innerHTML = index <= hoveredStarIndex ? "&#9733;" : "&#9734;";
    });
  });

  score.addEventListener("mouseout", () => {
    stars.forEach((star, index) => {
      star.innerHTML =
        index <= (selectedStarIndex ?? -1) ? "&#9733;" : "&#9734;";
    });
  });

  score.addEventListener("click", (event) => {
    const clickedStarIndex = Array.from(stars).indexOf(
      event.target as HTMLSpanElement
    );

    const ratingTime = new Date().toISOString();

    if (clickedStarIndex !== -1) {
      selectedStarIndex = clickedStarIndex;
      updateJokeRating((selectedStarIndex + 1) as Score);
      updateJokeDate(ratingTime);
    }

    stars.forEach((star, index) => {
      star.innerHTML =
        index <= (selectedStarIndex ?? -1) ? "&#9733;" : "&#9734;";
    });
  });
});
