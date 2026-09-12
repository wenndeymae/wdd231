// Select elements from the page
const memberContainer = document.querySelector("#member-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

// Get member data from the JSON file
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `Unable to load member data: ${response.status}`
            );
        }

        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        memberContainer.innerHTML = `
            <p>
                Sorry, the member directory could not be loaded.
                Please try again later.
            </p>
        `;

        console.error("Error loading member data:", error);
    }
}

// Convert membership level to a readable name
function membershipName(level) {
    if (level === 3) {
        return "Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}

// Display all members
function displayMembers(members) {
    memberContainer.innerHTML = "";

    members.forEach((member, index) => {
        const card = document.createElement("article");

        card.className = "member-card";

        // Load the first image immediately.
        // Load the remaining images lazily.
        const loading = index === 0 ? "eager" : "lazy";

        // Give the first image higher loading priority.
        const priority = index === 0 ? "high" : "auto";

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} business image"
                width="400"
                height="225"
                loading="${loading}"
                fetchpriority="${priority}"
            >

            <div class="member-card-content">

                <h2>${member.name}</h2>

                <p>
                    <strong>${member.category}</strong>
                </p>

                <p>${member.address}</p>

                <p>${member.phone}</p>

                <p class="description">
                    ${member.description}
                </p>

                <p>
                    <a
                        href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Website
                    </a>
                </p>

                <span class="membership">
                    ${membershipName(member.membership)}
                </span>

            </div>
        `;

        memberContainer.appendChild(card);
    });
}

// Change between grid and list views
function setView(view) {
    const isList = view === "list";

    memberContainer.classList.toggle(
        "directory-list",
        isList
    );

    memberContainer.classList.toggle(
        "directory-grid",
        !isList
    );

    gridButton.classList.toggle(
        "active",
        !isList
    );

    listButton.classList.toggle(
        "active",
        isList
    );

    gridButton.setAttribute(
        "aria-pressed",
        String(!isList)
    );

    listButton.setAttribute(
        "aria-pressed",
        String(isList)
    );
}

// Grid view button
gridButton.addEventListener("click", () => {
    setView("grid");
});

// List view button
listButton.addEventListener("click", () => {
    setView("list");
});

// Set grid view as the default
setView("grid");

// Load member data
getMembers();