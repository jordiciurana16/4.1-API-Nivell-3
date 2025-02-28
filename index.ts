"use strict";

type Joke = {
  readonly id: string;
  text: string;
  rating?: Score;
};

type Score = undefined | 1 | 2 | 3;

const jokeReports: Joke[] = [];

document.addEventListener("DOMContentLoaded", () => {
  const joke: HTMLElement | null = document.querySelector("h5");
  const button = document.querySelector("button");
  const score = document.querySelector("h6");

  const stars = document.querySelectorAll("span");

  if (!joke || !button || !score) {
    console.error("There was an error loading the page");
    return;
  }

  let selectedStarIndex: number | undefined;

  async function fetchJoke() {
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      if (joke) {
        joke.textContent = data.joke;
      } else {
        console.error("Joke element is null");
      }

      const jokeData: Joke = {
        id: data.id,
        text: data.joke,
        rating: undefined,
      };

      jokeReports.push(jokeData);
      console.log(jokeReports);
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
      star.innerHTML = index <= selectedStarIndex ? "&#9733;" : "&#9734;";
    });
  });

  score.addEventListener("click", (event) => {
    const clickedStarIndex = Array.from(stars).indexOf(
      event.target as HTMLSpanElement
    );

    if (clickedStarIndex !== -1) {
      selectedStarIndex = clickedStarIndex;
      updateJokeRating((selectedStarIndex + 1) as Score);
    }

    stars.forEach((star, index) => {
      star.innerHTML = index <= selectedStarIndex ? "&#9733;" : "&#9734;";
    });
  });
});
