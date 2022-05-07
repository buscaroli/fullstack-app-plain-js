const express = require('express')
const cors = require('cors')

// importing the array where the data is stored
// it contains three smurfs that will load everytime the page is reloaded
const dataArray = require('./data')

const app = express()
app.use(express.json())
app.use(cors())

module.exports = app

app.get('/', (req, res) => {
  res.send('If you want to try the app check out ../client/index.html')
})

app.get('/smurfs', (req, res) => {
  res.send(dataArray)
})

app.post('/smurfs/', (req, res) => {
  // we create a new variable with the name Clumsy
  const newSmurf = 'Clumsy'

  // We check if the name alrady exists in the database
  // At the moment we have hardcoded the name so we'll be able to add it only once
  const newSmurfExists = dataArray.every((smurf) => smurf !== newSmurf)

  // If the newSmurf is already in the Database we are going to console.log rthe message
  // and we are also sending a response with an HTTP Status of 405 (Forbidden) and a
  // json object with a key of error and a value of errorMessage
  if (newSmurfExists) {
    const errorMessagesArray = ['Whoops!', 'Golly!', 'Gosh!']
    numberOfMessages = errorMessagesArray.length

    const randomIndex = Math.floor(Math.random() * numberOfMessages)
    const errorMessage =
      errorMessagesArray[randomIndex] + ' I am already in the SmurfDatabase!'

    console.log(`${errorMessage} I am already in the SmurfDatabase!`)
    res.status(403).send({
      error:
        errorMessagesArray[randomIndex] + ' I am already in the SmurfDatabase!',
    })

    // If the newSmurf is not in the db we can add them
  } else {
    dataArray.push(newSmurf)
    res.send(newSmurf)
  }
})
