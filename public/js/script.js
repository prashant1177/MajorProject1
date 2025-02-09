// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function calculateTotalPrice(price) {
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const from = new Date(fromDate);
  const to = new Date(toDate);
  const totalDays = (to - from) / (1000 * 3600 * 24);
  let totalPrice = price;
  if (totalDays > 0) {
    totalPrice = Number(totalPrice * totalDays);
  }
  document.getElementById("totalPrice").innerText = totalPrice;
}

// Dates 
