import "./app.js";

const details = document.querySelector("#submitted-details");
const params = new URLSearchParams(window.location.search);
const name = params.get("fullName");
const drink = params.get("drink");

if (name && drink) {
  details.textContent = `Thank you, ${name}. Your request for ${drink} has been received as a project demonstration.`;
}
