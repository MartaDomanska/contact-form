document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("main-form");
  const submit = document.getElementById("submit-form");
  const success = document.querySelector("div.success");

  const formElements = {
    "first-name": document.querySelector("div.first-name"),
    "last-name": document.querySelector("div.last-name"),
    email: document.querySelector("div.email"),
    "query-type": document.querySelector("div.query-type"),
    message: document.querySelector("div.message"),
    "contact-consent": document.querySelector("div.contact-consent-container"),
  };

  function showError(element, errorClass) {
    if (element) {
      element.classList.add(errorClass);
      const errorMessage = element.querySelector(".error-message");
      if (errorMessage) errorMessage.style.display = "block";
    }
  }

  function clearError(element) {
    if (element) {
      element.classList.remove("error");
      const errorMessage = element.querySelector(".error-message");
      if (errorMessage) errorMessage.style.display = "none";
    }
  }

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  submit.addEventListener("click", (event) => {
    event.preventDefault();

    let validFields = true;

    Object.keys(formElements).forEach((key) => {
      const element = formElements[key];
      const input = element ? element.querySelector("input, textarea") : null;
      const value = input ? input.value.trim() : "";

      if (key === "email") {
        if (!value || !validateEmail(value)) {
          showError(element, "error");
          validFields = false;
        } else {
          clearError(element);
        }
      } else if (
        key === "query-type" &&
        !document.querySelector('input[name="query-type"]:checked')
      ) {
        showError(element, "error");
        validFields = false;
      } else if (key === "contact-consent") {
        const contactConsentCheckbox =
          document.getElementById("contact-consent");
        if (contactConsentCheckbox && !contactConsentCheckbox.checked) {
          showError(element, "error");
          validFields = false;
        } else {
          clearError(element);
        }
      } else if (value === "") {
        showError(element, "error");
        validFields = false;
      } else {
        clearError(element);
      }
    });

    if (validFields) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        success.classList.add("submitted");
      }, 300);

      setTimeout(() => {
        success.classList.remove("submitted");
      }, 5000);
    }
  });
});
