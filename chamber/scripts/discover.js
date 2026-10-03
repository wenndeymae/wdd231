import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

function displayDiscoverItems() {
    discoverItems.forEach((item) => {
        const card = document.createElement("article");

        card.className = `discover-card card-${item.id}`;

        card.innerHTML = `
            <h2>${item.name}</h2>

            <figure>
                <img
                    src="${item.image}"
                    alt="${item.name}"
                    width="300"
                    height="200"
                    loading="${item.id === 1 ? "eager" : "lazy"}"
                >
            </figure>

            <address>${item.address}</address>

            <p>${item.description}</p>

            <button
                class="learn-more"
                type="button"
                data-name="${item.name}"
            >
                Learn More
            </button>
        `;

        discoverGrid.appendChild(card);
    });
}

function displayVisitMessage() {
    const currentVisit = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    if (!lastVisit) {
        visitMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentVisit - Number(lastVisit);
        const oneDay = 1000 * 60 * 60 * 24;

        if (timeDifference < oneDay) {
            visitMessage.textContent =
                "Back so soon! Awesome!";
        } else {
            const daysSinceLastVisit = Math.floor(
                timeDifference / oneDay
            );

            const dayText =
                daysSinceLastVisit === 1 ? "day" : "days";

            visitMessage.textContent =
                `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

function setupLearnMoreButtons() {
    const buttons = document.querySelectorAll(".learn-more");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const placeName = button.dataset.name;

            const searchURL = `https://www.google.com/search?q=${encodeURIComponent(
                placeName + " Davao City"
            )}`;

            window.open(
                searchURL,
                "_blank",
                "noopener,noreferrer"
            );
        });
    });
}

displayDiscoverItems();
displayVisitMessage();
setupLearnMoreButtons();