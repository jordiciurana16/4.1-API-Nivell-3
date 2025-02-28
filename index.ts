document.addEventListener("DOMContentLoaded", () => {
  const joke: HTMLElement | null = document.querySelector("h5");
  if (!joke) {
    console.error("The h5 element does not exist");
    return;
  }
  fetch("https://icanhazdadjoke.com/", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => (joke.textContent = data.joke))
    .catch((error) => {
      joke.style.color = "red";
      joke.textContent = error;
    });
});
