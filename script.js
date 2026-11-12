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
const orderForm = document.getElementById("order-form");

if (orderForm) {
  // TODO 1: Find the other elements we need, the same way as yearSpan above.
  //   The ids are in the HTML snippet you pasted into prices.html:
  //   "item", "quantity", "order-list", "order-total", "whatsapp-order"
  //   Example:  const itemSelect = document.getElementById("item");
  //   Then:     console.log(itemSelect);   and check the Console (F12) shows it.


  // The order lives in this array (a list). Each line will be an object like:
  //   { name: "Cookies, dozen", price: 120, quantity: 2 }
  const order = [];


  // This function redraws the order list and the total from the `order` array.
  const showOrder = function () {
    // Empty the list first, otherwise we would add the same lines again and again.
    orderList.innerHTML = "";
    let total = 0;

    for (const line of order) {
      // TODO 3: work out lineTotal (price times quantity) and add it to total.


      // TODO 4: show the line on the page:
      //   make an <li>:            const li = document.createElement("li");
      //   set its text, like:      "2 x Cookies, dozen = K240"
      //                            (look up "template literals", the `${}` thing)
      //   add it to the list:      orderList.appendChild(li);

    }

    // TODO 5: put the total into the page (orderTotal.textContent = ...)

  };


  // "submit" happens when the "Add to order" button is clicked
  // (or Enter is pressed inside the form).
  orderForm.addEventListener("submit", function (event) {
    // A form's default job is to send data and RELOAD the page.
    // We do not want that, so we stop it. Comment this line out once to see what happens.
    event.preventDefault();

    // The <option> the customer picked:
    const chosen = itemSelect.options[itemSelect.selectedIndex];

    // TODO 2: build one order line and add it to the array, then redraw:
    //   - the name is in chosen.dataset.name   (from data-name="..." in the HTML)
    //   - the price is in chosen.value         (it is TEXT, "350". Use Number(...) to make it a number)
    //   - the quantity is in quantityInput.value (also text!)
    //   order.push({ name: ..., price: ..., quantity: ... });
    //   showOrder();
    //
    //   Use console.log(order) to see the array grow in the Console.

  });


  // TODO 6 (the payoff): Send the order on WhatsApp.
  //   Inside showOrder, after the total, build a message like:
  //     "Hi, I would like to order:
  //      2 x Cookies, dozen
  //      1 x Small celebration cake
  //      Total: K590"
  //   Then set the link:
  //     whatsappLink.href = "https://wa.me/260970000000?text=" + encodeURIComponent(message);
  //   (use HER number. encodeURIComponent makes spaces and new lines safe inside a link)
  //   And show the button only when the order is not empty:
  //     whatsappLink.hidden = order.length === 0;
}
