import "./app.js";

const grid = document.querySelector("#menu-grid");
const status = document.querySelector("#menu-status");
const filter = document.querySelector("#category-filter");
const clearButton = document.querySelector("#clear-preference");
const dialog = document.querySelector("#drink-dialog");
const dialogContent = document.querySelector("#dialog-content");
const dialogClose = document.querySelector("#dialog-close");

let drinks = [];

async function loadDrinks() {
  try {
    status.textContent = "Loading drinks...";
    const response = await fetch("data/menu.json");

    if (!response.ok) {
      throw new Error(`Menu request failed: ${response.status}`);
    }

    drinks = await response.json();

    if (!Array.isArray(drinks) || drinks.length < 15) {
      throw new Error("The menu data must contain at least 15 items.");
    }

    const savedCategory = localStorage.getItem("menuCategory") || "all";
    filter.value = savedCategory;
    renderDrinks(savedCategory);
  } catch (error) {
    console.error(error);
    status.textContent = "We could not load the menu. Please try again.";
  }
}

function renderDrinks(category = "all") {
  const visibleDrinks = category === "all"
    ? drinks
    : drinks.filter((drink) => drink.category === category);

  grid.innerHTML = visibleDrinks.map((drink) => `
    <article class="menu-card">
      <div class="menu-card-top" aria-hidden="true">
        <span class="drink-illustration">🧋</span>
      </div>
      <div class="menu-card-content">
        <div class="menu-card-meta">
          <span class="badge">${drink.categoryName}</span>
          <span class="price">₱${drink.price}</span>
        </div>
        <h2>${drink.name}</h2>
        <p>${drink.description}</p>
        <p><strong>Size:</strong> ${drink.size}<br>
        <strong>Sweetness:</strong> ${drink.sweetness}<br>
        <strong>Topping:</strong> ${drink.topping}</p>
        <button class="button button-secondary details-button" type="button" data-name="${drink.name}">View details</button>
      </div>
    </article>
  `).join("");

  status.textContent = `${visibleDrinks.length} drink${visibleDrinks.length === 1 ? "" : "s"} shown.`;
  grid.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", () => showDetails(button.dataset.name));
  });
}

function showDetails(name) {
  const drink = drinks.find((item) => item.name === name);
  if (!drink) return;

  dialogContent.innerHTML = `
    <p class="eyebrow">${drink.categoryName}</p>
    <h2>${drink.name}</h2>
    <p>${drink.description}</p>
    <p><strong>Price:</strong> ₱${drink.price}<br>
    <strong>Available size:</strong> ${drink.size}<br>
    <strong>Sweetness:</strong> ${drink.sweetness}<br>
    <strong>Recommended topping:</strong> ${drink.topping}</p>
    <a class="button button-primary" href="order.html">Order this drink</a>
  `;

  dialog.showModal();
}

filter.addEventListener("change", () => {
  localStorage.setItem("menuCategory", filter.value);
  renderDrinks(filter.value);
});

clearButton.addEventListener("click", () => {
  localStorage.removeItem("menuCategory");
  filter.value = "all";
  renderDrinks("all");
});

dialogClose.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

loadDrinks();
