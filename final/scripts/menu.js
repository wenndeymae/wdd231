import { setupNavigation, setCurrentYear } from "./shared.js";
setupNavigation();
setCurrentYear();

const grid = document.querySelector("#menu-grid");
const status = document.querySelector("#menu-status");
const count = document.querySelector("#menu-count");
const category = document.querySelector("#category-filter");
const sort = document.querySelector("#sort-filter");
const reset = document.querySelector("#clear-preference");
const dialog = document.querySelector("#drink-dialog");
const dialogContent = document.querySelector("#dialog-content");
const close = document.querySelector("#dialog-close");
const STORAGE_KEY = "davaoMilkTeaMenuPreferences";
const labels = {classic:"Classic Milk Tea",fruity:"Fruity Tea",creamy:"Creamy Blends",coffee:"Coffee & Tea"};
let drinks = [];

function savePreferences() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({category:category.value,sort:sort.value}));
}
function restorePreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (["all","classic","fruity","creamy","coffee"].includes(saved.category)) category.value = saved.category;
    if (["featured","price-low","price-high","name"].includes(saved.sort)) sort.value = saved.sort;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}
function visibleDrinks() {
  let items = drinks.filter((drink) => category.value === "all" || drink.category === category.value);
  if (sort.value === "price-low") items = items.sort((a,b) => a.price-b.price);
  if (sort.value === "price-high") items = items.sort((a,b) => b.price-a.price);
  if (sort.value === "name") items = items.sort((a,b) => a.name.localeCompare(b.name));
  if (sort.value === "featured") items = items.sort((a,b) => Number(Boolean(b.featured))-Number(Boolean(a.featured)) || a.id-b.id);
  return items;
}
function renderDrinks() {
  const items = visibleDrinks();
  grid.innerHTML = items.map((drink) => `
    <article class="menu-card">
      <div class="menu-card-top" aria-hidden="true"><span class="drink-illustration">${drink.icon}</span></div>
      <div class="menu-card-content">
        <div class="menu-card-meta"><span class="badge">${labels[drink.category]}</span><span class="price">₱${drink.price}</span></div>
        <h3>${drink.name}</h3><p>${drink.description}</p>
        <dl class="menu-card-details">
          <div><dt>Sizes</dt><dd>${drink.sizes}</dd></div>
          <div><dt>Sweetness</dt><dd>${drink.sweetness}</dd></div>
          <div><dt>Suggested topping</dt><dd>${drink.topping}</dd></div>
          <div><dt>Category</dt><dd>${labels[drink.category]}</dd></div>
        </dl>
        <button class="button button-secondary view-details" type="button" data-drink-id="${drink.id}">View drink details</button>
      </div>
    </article>`).join("");
  count.textContent = `Showing ${items.length} of ${drinks.length} drinks`;
  status.textContent = items.length ? "Choose a drink to see its details." : "No drinks match this category. Try another filter.";
}
function openDetails(id) {
  const drink = drinks.find((item) => item.id === Number(id));
  if (!drink) return;
  dialogContent.innerHTML = `
    <div class="dialog-drink-icon" aria-hidden="true">${drink.icon}</div>
    <p class="eyebrow">${labels[drink.category]}</p><h2 id="dialog-title">${drink.name}</h2>
    <p>${drink.description}</p><p class="price">₱${drink.price}</p>
    <dl class="summary-list"><dt>Sizes</dt><dd>${drink.sizes}</dd><dt>Sweetness options</dt><dd>${drink.sweetness}</dd><dt>Suggested topping</dt><dd>${drink.topping}</dd><dt>Category</dt><dd>${labels[drink.category]}</dd></dl>
    <a class="button button-primary" href="order.html?drink=${encodeURIComponent(drink.name)}">Choose this drink</a>`;
  dialog.showModal();
  close.focus();
}
async function loadDrinks() {
  status.textContent = "Loading our drinks…";
  try {
    const response = await fetch("./data/drinks.json");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length < 15) throw new Error("Menu data must contain at least 15 drinks.");
    drinks = data;
    restorePreferences();
    renderDrinks();
  } catch (error) {
    console.error("Unable to load menu data:", error);
    status.textContent = "The menu could not load. Please run this site through a local web server and refresh.";
    count.textContent = "Menu unavailable";
  }
}
category.addEventListener("change", () => { savePreferences(); renderDrinks(); });
sort.addEventListener("change", () => { savePreferences(); renderDrinks(); });
reset.addEventListener("click", () => { category.value="all"; sort.value="featured"; localStorage.removeItem(STORAGE_KEY); renderDrinks(); });
grid.addEventListener("click", (event) => { const button=event.target.closest("[data-drink-id]"); if (button) openDetails(button.dataset.drinkId); });
close.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
loadDrinks();
