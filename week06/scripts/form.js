import "./app.js";

const form = document.querySelector("#order-form");
const message = document.querySelector("#form-message");

form.addEventListener("submit", (event) => {
  const formData = new FormData(form);
  const order = Object.fromEntries(formData.entries());

  localStorage.setItem("lastOrder", JSON.stringify({
    ...order,
    savedAt: new Date().toISOString()
  }));

  message.textContent = "Your order request is ready to be submitted.";
});
