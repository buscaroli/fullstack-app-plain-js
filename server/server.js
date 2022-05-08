const express = require('express')
const cors = require('cors')

// importing the array where the data is stored
// it contains three smurfs that will load everytime the page is reloaded
// PLEASE NOTE IN A PREVIOUS VERSION I DEFINED THIS AS A CONSTANT BUT IT SHOULD BE
// A VARIABLE SO WE CAN ADD AND REMOVE ELEMENTS!!
let dataArray = require('./data')

const app = express()
app.use(express.json())
app.use(cors())

module.exports = app

// GET /  -- Send a welcome msg
app.get('/', (req, res) => {
  res.send('If you want to try the app check out ../client/index.html')
})

// GET /smurfs  -- Send the list of the smurfs
app.get('/smurfs', (req, res) => {
  res.send(dataArray)
})

// POST /smurfs  -- Add a new Smurf to the array
app.post('/smurfs/', (req, res) => {
  // we create a new variable with the data received from req.body
  // req.body is what is sent from client/submitNewSmurf()
  const newSmurf = req.body
  console.log(newSmurf)
  const newSmurfName = newSmurf.name
  console.log('newSmurfName -> ', newSmurfName)

  // We check if the name alrady exists in the database
  const newSmurfExists = dataArray.some((smurf) => smurf === newSmurfName)
  console.log(newSmurfExists)
  // If the newSmurf is already in the Database we are going to console.log the message
  // and we are also sending a response with an HTTP Status of 403 (Forbidden) and a
  // json object with a key of error and a value of errorMessage
  if (newSmurfExists) {
    const errorMessagesArray = ['Whoops!', 'Golly!', 'Gosh!']
    numberOfMessages = errorMessagesArray.length

    const randomIndex = Math.floor(Math.random() * numberOfMessages)
    const errorMessage =
      errorMessagesArray[randomIndex] +
      `${newSmurfName} is already in the SmurfDatabase!`

    console.log(`${errorMessage}`)
    res.status(403).send({
      error: errorMessage,
    })

    // If the newSmurf is not in the db we can add them
  } else {
    dataArray.push(newSmurfName)
    res.send(newSmurfName)
  }

  // DELETE /smurfs
  app.delete('/smurfs', (req, res) => {
    // we want to remove Clumsy from the Database
    // At the moment it is hardcoded, later we'll be able to remove other smurfs too
    const newSmurf = req.body
    console.log(newSmurf)
    const nameSmurfToBeRemoved = newSmurf.name
    console.log('nameSmurfToBeRemoved -> ', nameSmurfToBeRemoved)

    // We check if the smurf we want to remove is actually present in the DB
    const smurfToBeRemovedExists = dataArray.some(
      (smurf) => smurf === nameSmurfToBeRemoved
    )

    // If the smurf we want to remove exists in the DB we can filter it out and
    // and reassign the new array (without the smurf) to itself.
    // We then send a response with the smurf we have deleted.
    if (smurfToBeRemovedExists) {
      let filteredArray = dataArray.filter(
        (smurf) => smurf !== smurfToBeRemoved
      )
      dataArray = filteredArray
      res.send(smurfToBeRemoved)

      // If the smurf we want to remove IS NOT in the array then we log a message
      // to the console, we send a HTTP Status response of 404 (NOT FOUND) and
      // we also send a JSON object with an error message.
    } else {
      const errorMessage = `${nameSmurfToBeRemoved} is not in the SmurfDatabase!`
      console.log(errorMessage)
      res.status(404).send({ error: errorMessage })
    }
  })
})
