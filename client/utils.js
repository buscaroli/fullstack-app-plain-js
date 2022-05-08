function submitNewSmurf(nameString) {
  //As we need to post the value in the JSON format we are going to
  // convert out string into a JS object and them we convert it to a
  // JSON string with JSON.stringify()
  const newSmurfObject = { name: nameString }

  const newSmurfJson = JSON.stringify(newSmurfObject)

  fetch('http://localhost:3000/smurfs', {
    method: 'POST',
    body: newSmurfJson,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    window.location.reload()
  })
}

// This function will fetch the list of the smurfs from the server
function fetchSmurfs() {
  fetch('http://localhost:3000/smurfs')
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .then((smurfsArray) => appendSmurfs(smurfsArray))
}

function appendSmurfs(arr) {
  arr.forEach((smurf) => createCardAndAppend(smurf))
}

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
  smurfCard.addEventListener('click', deleteCard)

  section2.append(smurfCard)
}

function deleteCard() {
  const smurfName = this.textContent

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
