// Supertest is the testing suite that we use when testing HTTP responses.
// It basic mimicks the client connecting to the different endpoints to
// perform the different CRUD operations.
// ENDPOINT: /, /smurfs
// CRUD Operations:
// - C (Create), R (Read), U (Update) and D (Delete)
const request = require('supertest')
// We need to require the server so we can test its routes.
// The file server/server.js in one level up from the current folder
// so we need to add the '../' before its name
const server = require('../server')

describe('Testing the Routes of the server', () => {
  let api
  const port = 3000
  // Before running the tests, we are going to start a new server
  beforeAll(() => {
    api = server.listen(port, () => {
      console.log(`Testing server up and running on port ${port}...`)
    })
  })
  // After running the test suite we are going to close the server down
  afterAll((done) => {
    console.log('Stopping the Testing server...')
    api.close()
    done()
  })

  // When using supertest rememebr to add done as a parameter to your test functions,
  // (the ones starting with 'it' ot 'test');
  it('responds to get / with status 200', (done) => {
    request(api).get('/').expect(200)
    // and remember to call done() at the end of the test or your test
    // will fail because you didn't let it know that the test had reached its end!
    done()
  })
})
