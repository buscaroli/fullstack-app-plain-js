const server = require('./server')
const port = 3000

server.listen(3000, () =>
  console.log(`Server up and running on port ${port}...`)
)
