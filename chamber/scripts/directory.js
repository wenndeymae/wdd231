// Fetch and display members
async function displayMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();
  const container = document.getElementById('member-container');
  container.innerHTML = '';

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}">Visit Website</a>
      <p>Level: ${getLevelName(member.level)}</p>
    `;
    container.appendChild(card);
  });
}

function getLevelName(level) {
  const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
  return levels[level] || 'Member';
}

// Toggle grid/list view
document.getElementById('toggle-view').addEventListener('click', () => {
  const container = document.getElementById('member-container');
  container.classList.toggle('grid-view');
  container.classList.toggle('list-view');
});

// Footer: copyright year + last modified
document.getElementById('copyright-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

// Initialize
displayMembers();   




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

// Convert membership level number to a readable name
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

    members.forEach((member) => {
        const card = document.createElement("article");

        card.className = "member-card";

        card.innerHTML = `
            <img 
                src="images/${member.image}" 
                alt="${member.name} business image"
                loading="lazy"
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

    memberContainer.classList.toggle("directory-list", isList);
    memberContainer.classList.toggle("directory-grid", !isList);

    gridButton.classList.toggle("active", !isList);
    listButton.classList.toggle("active", isList);

    gridButton.setAttribute("aria-pressed", String(!isList));
    listButton.setAttribute("aria-pressed", String(isList));
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