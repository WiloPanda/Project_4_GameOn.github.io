
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
const form = document.querySelector("form")

// Inputs Elements
let firstName = document.getElementById("first")
let lastName = document.getElementById("last")
let email = document.getElementById("email")
let birthdate = document.getElementById("birthdate")
let quantity = document.getElementById("quantity")

// Regex validation
let identityRegex = new RegExp("^[A-zÀ-ÿ-]+$") /*validation for first and last name*/
let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+") /*validation for email*/

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// Launch modal form
function launchModal() {
  modalbg.style.display = "block"
}

// Close modal event
let closeBtn = document.querySelector(".close");
closeBtn.addEventListener("click", closeModal);

// Close modal function
function closeModal() {
  modalbg.style.display = "none"
}

// Function to validate first and last name
function validateIdentity(identity) {
  if (identity.length >= 2 && identityRegex.test(identity)) {
    return true
  } 
  return false
}

// Function to validate email
function validateEmail(email) {
  if (emailRegex.test(email)) {
    return true
  } 
  return false
}

// Function to validate quantity
function validateQuantity(quantity) {
  if (quantity >= 0 && quantity <= 99) {
    return true
  } 
  return false
}

// Function to validate birthdate
function validateBirthdate(birthdate) {
  let today = new Date()
  let birthdateDate = new Date(birthdate)
  let age = today.getFullYear() - birthdateDate.getFullYear()
  let m = today.getMonth() - birthdateDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthdateDate.getDate())) {
    age--
  }
  if (age >= 18) {
    return true
  } 
  return false
  }

// Launch function to validate form
form.addEventListener("submit", (event) => {
event.preventDefault()
  if (validateIdentity(firstName.value) && validateIdentity(lastName.value) && validateEmail(email.value)) {
    console.log("success")
} else {
    console.log("error")
}
})


