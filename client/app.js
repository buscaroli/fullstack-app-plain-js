// declaring the selectors
import('./utils.js')
const smurfName = document.querySelector('#form-input')
const form = document.querySelector('#form-id')
const section2 = document.querySelector('#section-2')

// Calling the fetchSmurfs function to populate the screen when the window loads
window.onload = fetchSmurfs

// Submitting the smurf's name when the form's button is clicked
form.addEventListener('submit', (event) => {
  event.preventDefault()

  const nameToSubmit = smurfName.value
  submitNewSmurf(nameToSubmit)
})
