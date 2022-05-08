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
window.onload = function fetchSmurfs() {
  fetch('http://localhost:3000/smurfs')
    .then((response) => response.json())
    .then((data) => {
      console.log(data) // console.log for debugging purposes only
      // we are going to create the smurfCard in here, very soon!
    })
}
