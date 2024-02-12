let button = document.getElementById("submit-date");
let invalidDate = false;
let invalidDay = false;
let invalidMonth = false;
let invalidYear = false;
let futureDate = false;

button.addEventListener("click", () => {
  try {
    console.log("Button clicked");

    let dayInput = parseInt(document.getElementById("day").value);
    let yearInput = parseInt(document.getElementById("year").value);
    let monthInput = parseInt(document.getElementById("month").value);

    validateDate(dayInput, monthInput, yearInput);
    console.log(dayInput, monthInput, yearInput);
  } catch (error) {
    console.error(error);
  }
});

function validateDate(day, month, year) {
  const inputDate = new Date(year, month - 1, day);
  if (isNaN(inputDate.getTime())) {
    invalidDate = true;
  } else {
    if (inputDate > new Date()) {
      futureDate = true;
    } else {
      // life rest calculation
    }
  }
}
