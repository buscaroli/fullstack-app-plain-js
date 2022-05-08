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

// This function will fetch the list of the smurfs from the server WE MADE!
// Be sure you are running the server by moving into server/ and running either
// 'npm start' or 'npm run dev' (as per server/package.json)
// As we want to show all of out smurfs as soon as the page loads we are going to
// call this function as soon as the page loads.
// We do that by using the window.onload property.

// Let's create a variable that will store our array with the smurfs we are going to fetch

window.onload = function fetchSmurfs() {
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

  smurfCard.classList.add('.smurfCard')
  smurfCard.style.backgroundColor = 'blue'
  smurfCard.style.color = 'white'
  smurfCard.textContent = smurf

  section2.append(smurfCard)
}
