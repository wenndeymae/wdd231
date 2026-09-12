// Select the menu button and navigation
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

// Toggle the navigation menu
menuButton.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("open");

    navigation.classList.toggle("open", isOpen);

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});