// ==========================================================
// Sweet Crumbs JavaScript
// HTML = what is on the page. CSS = how it looks. JavaScript = what it DOES.
// This file runs on every page (it is linked at the bottom of each one).
// ==========================================================


// ============ 1. Footer year (DONE, read it) ============
// Find the <span id="year"> in the footer and put this year in it.
// Now the footer is never out of date, even in 2030.
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
// Why the "if"? Because if a page had no <span id="year">, yearSpan would be null,
// and null.textContent crashes the whole script. Always check before you use it.


// ============ 2. Order builder (TODO) ============
// Only the prices page has the order form, so this whole block only runs there.
// ==========================================================
// 2. ORDER BUILDER
// ==========================================================

const orderForm = document.getElementById("order-form");
const itemSelect = document.getElementById("item");
const cakeSizeContainer = document.getElementById("cake-size-container");
const cakeSizeSelect = document.getElementById("cake-size");
const quantityInput = document.getElementById("quantity");
const orderList = document.getElementById("order-list");
const orderTotal = document.getElementById("order-total");
const whatsappLink = document.getElementById("whatsapp-order");

// Only run this section on the prices page.
if (orderForm) {

  // Product prices from the menu.
  const products = {
    "vanilla": {
      name: "Vanilla cake",
      cake: true,
      prices: { 6: 500, 8: 850, 10: 1130, 12: 1350 }
    },

    "lemon": {
      name: "Lemon Poppy Seed cake",
      cake: true,
      prices: { 6: 520, 8: 870, 10: 1150, 12: 1370 }
    },

    "coconut": {
      name: "Coconut cake",
      cake: true,
      prices: { 6: 520, 8: 870, 10: 1150, 12: 1370 }
    },

    "chocolate": {
      name: "Chocolate cake",
      cake: true,
      prices: { 6: 600, 8: 950, 10: 1230, 12: 1450 }
    },

    "red-velvet": {
      name: "Red Velvet cake",
      cake: true,
      prices: { 6: 600, 8: 950, 10: 1230, 12: 1450 }
    },

    "cupcakes-6": {
      name: "Cupcakes — box of 6",
      price: 180
    },

    "cupcakes-12": {
      name: "Cupcakes — box of 12",
      price: 360
    },

    "pies": {
      name: "Pies — 10 pieces",
      price: 300
    },

    "scones": {
      name: "Scones — 10 pieces",
      price: 125
    },

    "samosas": {
      name: "Samosas — 10 pieces",
      price: 100
    },

    "sausage-rolls": {
      name: "Sausage Rolls — 10 pieces",
      price: 200
    },

    "fritters": {
      name: "Fritters — 10 pieces",
      price: 60
    }
  };


  // Store all added items here.
  const order = [];


  // Show cake sizes only when a cake is selected.
  itemSelect.addEventListener("change", function () {

    const selectedProduct = products[itemSelect.value];

    cakeSizeContainer.hidden = !selectedProduct || !selectedProduct.cake;

});

  // Display the order and calculate the total.
  function showOrder() {

    orderList.innerHTML = "";

    let total = 0;

    order.forEach(function (line, index) {

      const lineTotal = line.price * line.quantity;

      total += lineTotal;

      const li = document.createElement("li");

      const description = line.size
        ? `${line.quantity} x ${line.name} (${line.size} inches) = K${lineTotal}`
        : `${line.quantity} x ${line.name} = K${lineTotal}`;

      const text = document.createElement("span");
      text.textContent = description;

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-button");
      removeButton.addEventListener("click", function () {
        order.splice(index, 1);
        showOrder();
      });

      li.appendChild(text);
      li.appendChild(removeButton);

      orderList.appendChild(li);

    });


    // Update the total.
    orderTotal.textContent = total.toLocaleString("en-US");


    // Prepare the WhatsApp message.
    let message = "Hi, I would like to order:\n";

    order.forEach(function (line) {

      const description = line.size
        ? `${line.quantity} x ${line.name} (${line.size} inches)`
        : `${line.quantity} x ${line.name}`;

      message += `${description} = K${line.price * line.quantity}\n`;

    });

    message += `Total: K${total}`;

    whatsappLink.href =
      "https://wa.me/260964182847?text=" +
      encodeURIComponent(message);

    whatsappLink.hidden = order.length === 0;

  }


  // Add a selected product to the order.
  orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const selectedProduct = products[itemSelect.value];

    const quantity = Number(quantityInput.value);

    if (!selectedProduct || quantity < 1 || quantity > 20 ||
        !Number.isInteger(quantity)) {
      return;
    }

    let price;
    let size = null;

    if (selectedProduct.cake) {

      size = Number(cakeSizeSelect.value);
      price = selectedProduct.prices[size];

    } else {

      price = selectedProduct.price;

    }

    order.push({
      name: selectedProduct.name,
      price: price,
      quantity: quantity,
      size: size
    });

    showOrder();

    console.log(order);

  });


  // Start with an empty order.
  showOrder();

}

// DARK / LIGHT MODE

// ==========================================================
// DARK / LIGHT MODE
// ==========================================================

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  }

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';

    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    localStorage.setItem("theme", isDark ? "dark" : "light");

  });

}