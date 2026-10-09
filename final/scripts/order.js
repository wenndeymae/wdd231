import { setupNavigation, setCurrentYear } from "./shared.js";
setupNavigation();
setCurrentYear();
const form = document.querySelector(".order-form");
const drinkSelect = document.querySelector("#drink-choice");
const requestedDrink = new URLSearchParams(window.location.search).get("drink");
if (requestedDrink) {
  const option = [...drinkSelect.options].find((item) => item.value === requestedDrink || item.textContent === requestedDrink);
  if (option) drinkSelect.value = option.value;
}
form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) { event.preventDefault(); form.reportValidity(); }
});
