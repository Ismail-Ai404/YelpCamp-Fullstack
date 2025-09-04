/** @format */

// @format
document.addEventListener("DOMContentLoaded", () => {
     const form = document.querySelector("form");
     const password = document.getElementById("password");
     const confirmPassword = document.getElementById("confirmPassword");

     // Password requirement elements
     const reqLength = document.getElementById("req-length");
     const reqUppercase = document.getElementById("req-uppercase");
     const reqLowercase = document.getElementById("req-lowercase");
     const reqNumber = document.getElementById("req-number");
     const reqSpecial = document.getElementById("req-special");

     // Helper to show error below input
     function showError(input, message) {
          let error = input.nextElementSibling;
          if (!error || !error.classList.contains("invalid-feedback")) {
               error = document.createElement("div");
               error.className = "invalid-feedback d-block";
               input.parentNode.appendChild(error);
          }
          error.textContent = message;
          input.classList.add("is-invalid");
     }

     function removeError(input) {
          const error = input.nextElementSibling;
          if (error && error.classList.contains("invalid-feedback")) {
               error.remove();
          }
          input.classList.remove("is-invalid");
     }

     // Check password requirements dynamically
     password.addEventListener("input", () => {
          const val = password.value;

          // Reset colors
          reqLength.style.color = val.length >= 8 ? "green" : "gray";
          reqUppercase.style.color = /[A-Z]/.test(val) ? "green" : "gray";
          reqLowercase.style.color = /[a-z]/.test(val) ? "green" : "gray";
          reqNumber.style.color = /\d/.test(val) ? "green" : "gray";
          reqSpecial.style.color = /[\W_]/.test(val) ? "green" : "gray";

          removeError(password);

          // Show error if overall invalid
          if (
               val.length > 0 &&
               (val.length < 8 ||
                    !/[A-Z]/.test(val) ||
                    !/[a-z]/.test(val) ||
                    !/\d/.test(val) ||
                    !/[\W_]/.test(val))
          ) {
               // showError(password, "Password does not meet all requirements.");
          }
     });

     // Confirm password real-time validation
     confirmPassword.addEventListener("input", () => {
          removeError(confirmPassword);
          if (password.value !== confirmPassword.value) {
               showError(confirmPassword, "Passwords do not match.");
          }
     });

     // Final check on form submit
     form.addEventListener("submit", (e) => {
          removeError(password);
          removeError(confirmPassword);
          let valid = true;
          const val = password.value;

          if (
               val.length < 8 ||
               !/[A-Z]/.test(val) ||
               !/[a-z]/.test(val) ||
               !/\d/.test(val) ||
               !/[\W_]/.test(val)
          ) {
               // showError(password, "Password does not meet all requirements.");
               valid = false;
          }

          if (password.value !== confirmPassword.value) {
               showError(confirmPassword, "Passwords do not match.");
               valid = false;
          }

          if (!valid) e.preventDefault();
     });
});
