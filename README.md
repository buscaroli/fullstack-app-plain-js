# Learning to connect the Frontend to the Backend: FullStack Dev

## Branches

### server1

- basic directory structure with a few basic files
- git has been initialised in the root directory (where the README.md file is)
- the following commands have been run in the server/ directory:

```bash
  npm init -y

  npm i express cors

  npm i -D nodemon
```

- one route has been added to /server/server.js
  - you can access localhost:3000/ (run `npm run dev` if not already launched then go to localhost:3000/ in your browser)

### server2

- added server/data.js file that contains an array where data about the smurfs is kept
- the array:
  - exported from server/data.js
  - imported in server/server.js
- a new route has been added to server/server.js
  - you can access localhost:3000/smurfs

### server3

- worked on server/server.js, there are now three routes:
  - GET / browser/hoppscotch: responds with a welcome message
  - GET /smurfs browser/hoppscotch: responds with a list of smurfs from the DB
  - POST /smurfs hoppscotch: adds 'Clumsy' or if already there responds with 405 (Forbidden) and an error message

#### ERRATA CORRIDGE

- the array in server/data.js and in server/server.js should be defined as a let and not as a const
- inside the POST route we search if the smurf exists: I should have user the Array.some() method
  instead of the Array.every() and the logic will be different, please **correct** with the following:

  ```js
  // We check if the name alrady exists in the database
  // At the moment we have hardcoded the name so we'll be able to add it only once
  const newSmurfExists = dataArray.some((smurf) => smurf === newSmurf)
  ```

### server4

- worked on server/server.js, 👆 fixed errors as per **ERRATA CORRIGE** at #server3 👆
  - added rouse DELETE /smurfs: removes 'Clumsy' or if not found responds with an HTTP Status of 404 (Not Found) and an error message

### client1

- worked on the client/index.html and client/style.css files:
  - added a header with title
  - added a footer with some text
  - added a main element
  - used flex-box in order to keep the header and footer apart
  - given the body a height of 100vh to have the page be the same size as the height of the screen
  - page is fluid but not responsive (elements shrink but do not rearrange themselves when the screen widtg is decreased)

### client2

- worked on index.html and style.css:
  - added two sections inside of main: section-1 contains the form, section-2 will contain the smurf cards
  - added a basic form using flexbox
  - the form is not doing anything yet when the button is pressed
