"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const joke = document.querySelector("h5");
  const button = document.querySelector("button");

  if (!joke || !button) {
    console.error("There was an error loading the page");
    return;
  }
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
      joke.textContent = data.joke;
    } catch (error) {
      joke.style.color = "red";
      joke.textContent = error.message;
    }
  }

  fetchJoke();

  button.addEventListener("click", () => {
    fetchJoke();
  });
});
