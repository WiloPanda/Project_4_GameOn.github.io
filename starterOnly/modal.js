
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
let locations = document.querySelectorAll('input[name="location"]')
let checkbox1 = document.getElementById("checkbox1")


// Regex validation
let identityRegex = new RegExp("^[A-zÀ-ÿ-]+$") /*validation for first and last name*/
let emailRegex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+") /*validation for email*/
let quantityRegex = new RegExp("^[0-9]+$") /*validation for quantity*/

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
  console.log(identity)
  if (identity === "") {
    throw new Error("Veuillez renseigner ce champ")
  }

  if (identity.length < 2) {
    throw new Error("Veuillez entrer 2 caractères minimum")
  }

  if (!identityRegex.test(identity)) {
    throw new Error("Veuillez entrer un nom valide")
  } 
}

// Function to validate email
function validateEmail(email) {
  console.log(email)
  if (email === "") {
    throw new Error("Veuillez renseigner ce champ")
  }

  if (!emailRegex.test(email)) {
    throw new Error("Veuillez entrer une adresse email valide")
  } 
}

// Function to validate birthdate
function validateBirthdate(birthdate) {
  console.log(birthdate)
  if (birthdate === "") {
    throw new Error("Veuillez entrer votre date de naissance")
  }
  let today = new Date()
  let birthdateDate = new Date(birthdate)
  let age = today.getFullYear() - birthdateDate.getFullYear()
  let m = today.getMonth() - birthdateDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthdateDate.getDate())) {
    age--
  }
  if (age < 18) {
    throw new Error("Vous devez être majeur pour participer")
  } 
}

// Function to validate quantity
function validateQuantity(quantity) {
  console.log(quantity)
  if (quantity === "") {
    throw new Error("Veuillez entrer le nombre de tournois auxquels vous avez participé")
  }

  if (quantity < 0 || quantity > 99) {
    throw new Error("Le nombre de participations doit être compris entre 0 et 99")
  }
  
  if (!quantityRegex.test(quantity)) {
    throw new Error("Veuillez entrer un chiffre ou un nombre valide")
  }
}

// Function to validate location
function validateLocation(location) {
  console.log(locations)
  for (let i = 0; i < location.length; i++) {
    if (location[i].unchecked) {
      throw new Error("Veuillez choisir une ville")
    }
  }
}

// Function to validate checkbox
function validateCheckbox(checkbox) {
  console.log(checkbox.checked)
  if (!checkbox.checked) {
    throw new Error("Vous devez accepter les conditions d'utilisation")
  } 
}

// Function to  print error message
function printErrorMessage(message) {

}


// Launch function to validate form
form.addEventListener("submit", (event) => {
event.preventDefault()
  try {validateIdentity(firstName.value)  
      validateIdentity(lastName.value) 
      validateEmail(email.value) 
      validateBirthdate(birthdate.value)
      validateQuantity(quantity.value)   
      validateLocation(locations) 
      validateCheckbox(checkbox1)
    console.log("success")
} catch {
    console.log("error")
    }
  } 
)