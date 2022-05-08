// let's create some references to the elements of the webpage we want to target:
// - #form-input: because we want to be able to get the name of the smurf entered by the user
//                and we want to reset it to an empty string after the form has been submitted
// - #form-id: because we want to trach when the form is submitter using an event listener
// - #section-2: because thet is where we are going to append the new smurf cards
const smurfName = document.querySelector('#form-input')
const form = document.querySelector('#form-id')
const section2 = document.querySelector('#section-2')

// Now we are going to print the three references to be sure we have access to the elements
// If trying to load the page you are presented with what looks like a directory structure instead of your page
// make sure the address is pointing to the right file eg localhost:5500/client/index.html
console.log('smurfName -> ', smurfName)
console.log('form -> ', form)
console.log('section2 -> ', section2)

// As we want to show all of out smurfs as soon as the page loads we are going to
// call this function as soon as the page loads.
// We do that by using the window.onload property.
window.onload = fetchSmurfs

// Let's get the name of the smurf from the form-input element
// Then let's send a POST request to the /smurfs endpoint
// Then let's clear the form-input element
form.addEventListener('submit', (event) => {
  event.preventDefault()

  const nameToSubmit = smurfName.value
  // console.log('nameToSubmit -> ', nameToSubmit)

  submitNewSmurf(nameToSubmit)
})

function submitNewSmurf(nameString) {
  //As we need to post the value in the JSON format we are going to
  // convert out string into a JS object and them we convert it to a
  // JSON string with JSON.stringify()
  const newSmurfObject = { name: nameString }
  // console.log('newSmurfObject -> ', newSmurfObject)

  const newSmurfJson = JSON.stringify(newSmurfObject)
  // console.log(newSmurfJson)

  // We can now make a POST request to /smurfs to have it added but
  // we also have to amend the code in server/server.js, inside the
  // app.post('/smurfs', () => {}) route in order to extract just the
  // out of the JSON string and to replace the hardcoded 'Clumsy' with
  // the name we entered in the form
  // The same is also true for DELETE /smurfs

  fetch('http://localhost:3000/smurfs', {
    method: 'POST',
    body: newSmurfJson,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    console.log('Hi there')
    window.location.reload()
  })
}

// This function will fetch the list of the smurfs from the server WE MADE!
// Be sure you are running the server by moving into server/ and running either
// 'npm start' or 'npm run dev' (as per server/package.json)

function fetchSmurfs() {
  fetch('http://localhost:3000/smurfs')
    .then((response) => response.json())
    .then((data) => {
      console.log(data) // console.log for debugging purposes only

      return data // we need to add return here as we are within { ... }
    })
    .then((smurfsArray) => appendSmurfs(smurfsArray))
}

// this function will call another function that will create a card and append it
// for each of the smurfs in the Array
function appendSmurfs(arr) {
  arr.forEach((smurf) => createCardAndAppend(smurf))
}

// this function will create an element with a class of smurfCard
// will add the name of the smurf to the card
// will apply a style to the card
// will append the card to section2
// I am going to do most of the styling in the client/style.css file
// so we can easily modify them as required.
// However I am adding the colours of the text and background programmatically
// as in the future we might decide to use different colours for different smurfs
function createCardAndAppend(smurf) {
  let smurfCard = document.createElement('div')

  switch (smurf.toLowerCase()) {
    case 'papa smurf':
    case 'papasmurf':
      smurfCard.style.backgroundColor = 'red'
      smurfCard.style.color = 'white'
      break
    case 'smurfette':
      smurfCard.style.backgroundColor = 'yellow'
      smurfCard.style.color = 'black'
      break
    case 'grouchy':
      smurfCard.style.backgroundColor = 'black'
      smurfCard.style.color = 'white'
      break
    case 'vanity':
      smurfCard.style.backgroundColor = 'pink'
      smurfCard.style.color = 'white'
      break
    default:
      smurfCard.style.backgroundColor = 'blue'
      smurfCard.style.color = 'white'
  }

  smurfCard.classList.add('smurfCard')
  smurfCard.textContent = smurf

  // adding an event listener to each card to we can remove it when clicked
  smurfCard.addEventListener('click', deleteCard)

  section2.append(smurfCard)
}

// Callback used within createCardAndAppend
// It is added to an eventListener when the card is created.
// this.textContent will contain the text displayed in the card
// and it is used to delete the smurf from the DB serverside
// within DELETE /smurfs
function deleteCard() {
  const smurfName = this.textContent
  // console.log(smurfName) //for debugging purposes

  const newSmurfObject = { name: smurfName }
  const newSmurfJson = JSON.stringify(newSmurfObject)

  fetch('http://localhost:3000/smurfs', {
    method: 'DELETE',
    body: newSmurfJson,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    console.log('Hi there deleting!')
    window.location.reload()
  })
}
