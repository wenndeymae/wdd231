import { setupNavigation, setCurrentYear } from "./shared.js";
setupNavigation();
setCurrentYear();
const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#order-summary");
const status = document.querySelector("#summary-status");
const fields = [["Full name","name"],["Email address","email"],["Phone number","phone"],["Drink","drink"],["Size","size"],["Sweetness","sweetness"],["Topping","topping"],["Additional notes","notes"]];
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
if (!params.has("name") || !params.has("email") || !params.has("drink")) {
  document.querySelector("#confirmation-title").textContent = "No order details found";
  document.querySelector("#confirmation-intro").textContent = "Submit the order form first to see your request summary.";
  status.textContent = "No form data was provided in the page URL.";
} else {
  summary.innerHTML = fields.filter(([,key]) => params.get(key)?.trim()).map(([label,key]) => `<dt>${label}</dt><dd>${escapeHTML(params.get(key))}</dd>`).join("");
  status.textContent = "Demonstration summary only. No real order or payment has been processed.";
}
