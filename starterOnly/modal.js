
function editNav() {
  var x = document.getElementById("myTopnav")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const closeBtn = document.querySelectorAll(".close, .btnClose")
const form = document.querySelector("form")

// Form Elements
let firstName = document.getElementById("first")
let lastName = document.getElementById("last")
let email = document.getElementById("email")
let birthdate = document.getElementById("birthdate")
let quantity = document.getElementById("quantity")
let locations = document.querySelectorAll('input[name="location"]')
let checkbox1 = document.getElementById("checkbox1")

// Error message
const message = {
  name: 'Veuillez renseigner un nom valide',
  email: 'Veuillez renseigner une adresse mail valide.',
  birthdate: 'Vous devez avoir plus de 18 ans pour participer',
  quantity: 'Veuillez renseigner un nombre entre 0 et 99', 
  locations: 'Veuillez sélectionner une ville',
  conditions: `Vous devez accepter les conditions d'utilisation`
}

// Regex validation
const regexIdentity = new RegExp("^[A-zÀ-ÿ-]{2,}$") /*Regex validation for first and last name*/
const regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+") /*Regex validation for email*/
const regexQuantity = new RegExp("^[0-9]+$") /*Regex validation for quantity*/

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// Launch modal form
function launchModal() {
  modalbg.style.display = "block"
}

// Close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal))

// Close modal function
function closeModal() {
  modalbg.style.display = "none"
}

// Function to validate first name, last name, email and quantity
function validateIdentity(regex, element, message) {
  if (!regex.test(element.value)) {
    showErrorMessage(element, message) 
    return false
  } 
  hideErrorMessage(element)
  return true
}

// Function to validate birthdate
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

// Function to validate location
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

// Function to validate checkbox
function validateCheckbox(checkbox, element, message) {
  console.log(checkbox.checked)
  if (checkbox.checked) {
    hideErrorMessage(element) 
    return true
  }
  showErrorMessage(element, message)
  return false
}

// Function to  print error message
function showErrorMessage(element, message){
  element.parentElement.setAttribute('data-error-visible', 'true');
  element.parentElement.setAttribute('data-error', message);
}

//Function to hide error message
function hideErrorMessage(element) {
  element.parentElement.removeAttribute('data-error-visible');
  element.parentElement.removeAttribute('data-error');}

//Event to show validation message
function showValidationMessage() {
  let validationSection = document.querySelector(".validation");
  let contentForm = document.querySelector("form");
  validationSection.style.display = "flex";
  contentForm.style.display = "none";
}

// Launch function to check if form is valid
form.addEventListener("submit", (event) => {
event.preventDefault()
  try {
          let resultFirstName = validateIdentity(regexIdentity, firstName, message.name) 
          let resultLastName = validateIdentity(regexIdentity, lastName, message.name) 
          let resultEmail = validateIdentity(regexEmail, email, message.email) 
          let resultBirthdate = validateBirthdate(birthdate.value, birthdate, message.birthdate) 
          let resultQuantity = validateIdentity(regexQuantity, quantity, message.quantity) 
          let resultLocations = validateLocations(locations, message.locations)
          let resultCheckbox = validateCheckbox(checkbox1, checkbox1, message.conditions)
      if (resultFirstName && resultLastName && resultEmail && resultBirthdate && resultQuantity && resultLocations && resultCheckbox) {
          showValidationMessage()  
        console.log("success")
      }
} catch {
    console.log("error")
    }
  } 
)