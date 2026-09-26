// Get submitted form information from the URL
const params = new URLSearchParams(window.location.search);


// Display required form information
document.querySelector("#display-first-name").textContent =
    params.get("firstName") || "Not provided";

document.querySelector("#display-last-name").textContent =
    params.get("lastName") || "Not provided";

document.querySelector("#display-email").textContent =
    params.get("email") || "Not provided";

document.querySelector("#display-phone").textContent =
    params.get("phone") || "Not provided";

document.querySelector("#display-organization").textContent =
    params.get("organization") || "Not provided";


// Format and display the timestamp
const timestampValue = params.get("timestamp");

if (timestampValue) {
    const date = new Date(timestampValue);

    document.querySelector("#display-timestamp").textContent =
        date.toLocaleString();
} else {
    document.querySelector("#display-timestamp").textContent =
        "Not provided";
}