export function setupNavigation() {
  const button = document.querySelector("#menu-button");
  const navigation = document.querySelector("#site-navigation");
  if (!button || !navigation) return;
  button.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    button.textContent = open ? "×" : "☰";
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      navigation.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation menu");
      button.textContent = "☰";
      button.focus();
    }
  });
}
export function setCurrentYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());
}
