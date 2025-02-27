"use strict";
const message = "Hello, World!";
const body = document.querySelector("body");
const paragraph = document.createElement("p");
paragraph.textContent = message;
document.body.appendChild(paragraph);
