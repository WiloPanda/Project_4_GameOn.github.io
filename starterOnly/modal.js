
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
let date = document.getElementById("birthdate")

// Regex validation
let identityRegex = new RegExp("[A-zÀ-ÿ-]") /*validation for first and last name*/
let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+") /*validation for email*/

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// launch modal form
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

// Testing function
form.addEventListener("submit", (event) => {
event.preventDefault()
  if (validateIdentity(first) && validateIdentity(last) && validateEmail(email.value)) {
    console.log("success")
} else {
    console.log("error")
}
})


