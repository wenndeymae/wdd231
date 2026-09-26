// Set the current date and time when the form loads
const timestamp = document.querySelector("#timestamp");

if (timestamp) {
    timestamp.value = new Date().toISOString();
}


// Open membership modals
const modalLinks = document.querySelectorAll(".modal-link");

modalLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const modalId = link.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});


// Close membership modals
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        if (modal) {
            modal.close();
        }
    });
});


// Close modal when clicking outside the modal content
const modals = document.querySelectorAll("dialog");

modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
        const rect = modal.getBoundingClientRect();

        const clickedInside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!clickedInside) {
            modal.close();
        }
    });
});