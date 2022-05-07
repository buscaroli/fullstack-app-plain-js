const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

module.exports = app

app.get('/', (req, res) => {
  res.send('If you want to try the app check out ../client/index.html')
})
