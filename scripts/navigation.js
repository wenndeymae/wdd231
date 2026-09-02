const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");

navButton.addEventListener("click", () => {
    const menuOpen = navButton.classList.toggle("show");

    navBar.classList.toggle("show");

    navButton.setAttribute("aria-expanded", menuOpen);

    navButton.setAttribute(
        "aria-label",
        menuOpen ? "Close navigation menu" : "Open navigation menu"
    );
});