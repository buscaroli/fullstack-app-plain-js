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
