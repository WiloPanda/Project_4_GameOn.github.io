/**
 * Toggle navigation menu on mobile
 */
function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

/**
 * DOM Elements
 */
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const closeBtn = document.querySelectorAll(".close, .btnClose")
const form = document.querySelector("form")

/**
 * Get Inputs Elements (retrieve what the user entered in the form)
 */
let firstName = document.getElementById("first")
let lastName = document.getElementById("last")
let email = document.getElementById("email")
let birthdate = document.getElementById("birthdate")
let quantity = document.getElementById("quantity")
let locations = document.querySelectorAll('input[name="location"]')
let checkbox1 = document.getElementById("checkbox1")

/**
 * Error messages
 */
const message = {
  name: 'Veuillez renseigner un nom valide',
  email: 'Veuillez renseigner une adresse mail valide',
  birthdate: 'Vous devez avoir plus de 18 ans pour participer',
  quantity: 'Veuillez renseigner un nombre entre 0 et 99',
  locations: 'Veuillez sélectionner une ville',
  conditions: `Vous devez accepter les conditions d'utilisation`
}

/**
 * Regex validation 
 */
const regexIdentity = new RegExp("^[A-zÀ-ÿ-]{2,}$") /*Regex validation for first and last name*/
const regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+") /*Regex validation for email*/
const regexQuantity = new RegExp("^[0-9]+$") /*Regex validation for quantity*/

/**
 * Launch the modal form
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))
function launchModal() {
  modalbg.style.display = "block"
}

/**
 * Close the modal form
 */
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal))
function closeModal() {
  modalbg.style.display = "none"
}

/**
 * Validates first name, last name, email, and quantity
 * @param {RegExp} regex - The regex pattern to validate input
 * @param {HTMLElement} element - The input element to validate
 * @param {string} message - The error message to display
 * @returns {boolean} True if valid, false otherwise
 */
function validateIdentity(regex, element, message) {
  if (!regex.test(element.value)) {
    showErrorMessage(element, message)
    return false
  }
  hideErrorMessage(element)
  return true
}

/**
 * Validates birthdate (must be over 18 years old)
 * @param {string} birthdate - The birthdate value from input
 * @param {HTMLElement} element - The input element to validate
 * @param {string} message - The error message to display
 * @returns {boolean} True if valid, false otherwise
 */
function validateBirthdate(birthdate, element, message) {
  if (!birthdate) {
    showErrorMessage(element, message)
    return false
  }
  let today = new Date()
  let birthdateDate = new Date(birthdate)
  let age = today.getFullYear() - birthdateDate.getFullYear()
  let m = today.getMonth() - birthdateDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthdateDate.getDate())) {
    age--
  }
  if (age < 18 || age > 100) {
    showErrorMessage(element, message)
    return false
  }
  hideErrorMessage(element)
  return true
}

/**
 * Validates location selection
 * @param {NodeList} locations - List of location radio buttons
 * @param {string} message - The error message to display
 * @returns {boolean} True if a location is selected, false otherwise
 */
function validateLocations(locations, message) {
  for (let i = 0; i < locations.length; i++) {
    if (locations[i].checked) {
      hideErrorMessage(locations[0])
      return true
    }
  }
  showErrorMessage(locations[0], message)
  return false
}

/**
 * Validates checkbox selection (terms and conditions)
 * @param {HTMLElement} checkbox - The checkbox element
 * @param {HTMLElement} element - The element where the error message should be displayed
 * @param {string} message - The error message to display
 * @returns {boolean} True if checkbox is checked, false otherwise
 */
function validateCheckbox(element, message) {
  if (element.checked) {
    hideErrorMessage(element)
    return true
  }
  showErrorMessage(element, message)
  return false
}

/**
 * Displays an error message
 * @param {HTMLElement} element - The input element where the error message should be displayed
 * @param {string} message - The error message to display
 */
function showErrorMessage(element, message) {
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', message);
}

/**
 * Hides an error message
 * @param {HTMLElement} element - The input element where the error message should be hidden
 */
function hideErrorMessage(element) {
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');
}

/**
 * Displays validation message when form is successfully submitted
 */
function showValidationMessage() {
  let validationSection = document.querySelector(".validation");
  let contentForm = document.querySelector("form");
  validationSection.style.display = "flex";
  contentForm.style.display = "none";
}

/**
 * Checking the validity of the form on submit
 */
form.addEventListener("submit", (event) => {
  event.preventDefault()
  try {
    let resultFirstName = validateIdentity(regexIdentity, firstName, message.name)
    let resultLastName = validateIdentity(regexIdentity, lastName, message.name)
    let resultEmail = validateIdentity(regexEmail, email, message.email)
    let resultBirthdate = validateBirthdate(birthdate.value, birthdate, message.birthdate)
    let resultQuantity = validateIdentity(regexQuantity, quantity, message.quantity)
    let resultLocations = validateLocations(locations, message.locations)
    let resultCheckbox = validateCheckbox(checkbox1, message.conditions)
    if (resultFirstName && resultLastName && resultEmail && resultBirthdate && resultQuantity && resultLocations && resultCheckbox) {
      showValidationMessage()

      let objectsend = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        birthdate: birthdate.value,
        quantity: quantity.value,
        locations: locations,
        checkbox1: checkbox1.checked
      }
      console.log(objectsend)
    }
  } catch {
    console.log("error")
  }
}
)