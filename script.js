const MIN_YEAR = 1900;
const MAX_MONTH = 12;
const MIN_MONTH = 1;
const MAX_DAY = 31;
const MIN_DAY = 1;

const button = document.getElementById("submit-date");
const yearWarning = document.getElementById("year-warning");
const monthWarning = document.getElementById("month-warning");
const dayWarning = document.getElementById("day-warning");

const yearInput = document.getElementById("year");
yearInput.addEventListener("keyup", function (event) {
  console.log("event", event);
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});

button.addEventListener("click", () => {
  const monthInput = parseInt(document.getElementById("month").value);
  const yearInput = parseInt(document.getElementById("year").value);
  const dayInput = parseInt(document.getElementById("day").value);

  validateDate(dayInput, monthInput, yearInput);
});

/**
 * Sets the warning message for the input element
 * @param {*} element
 * @param {*} message
 */
function setWarning(element, message) {
  element.textContent = message;
  element.style.color = message ? "#DD7573" : "white";
}

/**
 * Validates the date input
 * @param {*} day
 * @param {*} month
 * @param {*} year
 */
function validateDate(day, month, year) {
  setFormValid();
  const inputDate = new Date(year, month - 1, day);
  const dayOfMonth = inputDate.getDate();
  let formIsValid = true;

  if (year < 1900 || isNaN(year)) {
    setWarning(yearWarning, "Must be a valid year");
    formIsValid = false;
  }
  if (month < 1 || month > 12 || isNaN(month)) {
    setWarning(monthWarning, "Must be a valid month");
    formIsValid = false;
  }
  if (day < 1 || day > 31 || isNaN(day)) {
    setWarning(dayWarning, "Must be a valid day");
    formIsValid = false;
  }

  if (inputDate > new Date() || year > new Date().getFullYear()) {
    console.log("inputDate", inputDate);
    setWarning(yearWarning, "Must be in the past");
    formIsValid = false;
  } else if (dayOfMonth !== day) {
    setWarning(dayWarning, "Must be a valid day");
    formIsValid = false;
  }

  if (formIsValid) {
    setFormValid();
    calculateAge(inputDate);
  } else {
    setFormInvalid();
  }
}

/**
 * Calculates the age of the user based on the birth date input in days, months and years
 * @param {*} birthDate
 */
function calculateAge(birthDate) {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();
  // If the current month is less than the birth month, we need to subtract a year
  // If the current month is equal to the birth month, but the current day is less than the birth day, we need to subtract a year
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
  }
  // If the current month is less than the birth month, we need to add 12 to the current month
  if (months < 0) {
    months += 12;
  }
  // If the current day is less than the birth day, we need to add 30 to the current day
  if (days < 0) {
    days += 30;
  }
  let year = document.getElementById("years");
  year.textContent = years;
  let month = document.getElementById("months");
  month.textContent = months;
  let day = document.getElementById("days");
  day.textContent = days;
}

/**
 * Sets the form to invalid state
 * Changes the border color of the input fields to red and the color of the labels to red
 */
function setFormInvalid() {
  let inputs = document.querySelectorAll("input");
  let labels = document.querySelectorAll("label");
  setElementStyles(inputs, { borderColor: "#DD7573" });
  setElementStyles(labels, { color: "#DD7573" });
}

/**
 * Sets the form to valid state
 * Changes the border color of the input fields to grey and the color of the labels to grey
 */
function setFormValid() {
  let inputs = document.querySelectorAll("input");
  let labels = document.querySelectorAll("label");
  setElementStyles(inputs, { borderColor: "#ccc" });
  setElementStyles(labels, { color: "#656565" });
  setWarning(yearWarning, "");
  setWarning(monthWarning, "");
  setWarning(dayWarning, "");
}

/**
 * Sets the styles of the elements
 * @param {*} elements
 * @param {*} styles
 */
function setElementStyles(elements, styles) {
  elements.forEach((element) => {
    Object.assign(element.style, styles);
  });
}
