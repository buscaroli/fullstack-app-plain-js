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

  ### ERRATA CORRIDGE

  - in the client/index.html I had originally imported a file called index.js but I had created a file called app.js
  - amend the import at line 8 to the following (but we won't touch that file until ##client3):

  ```html
  <script defer src="./app.js"></script>
  ```

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

### client3

### ERRATA CORRIDGE - reminder from from ##server1

- in the client/index.html I had originally imported a file called index.js but I had created a file called app.js
  - amend the import at line 8 to the following if you haven't followed the ERRATA CORRIDGE at ##server1:
  ```html
  <script defer src="./app.js"></script>
  ```
- worked on client/app.js:
  - added the references to the elements we are going to targer
  - added a function that fetch the smurfs grom the GET /smurfs route of our server
    - the function is called as soon as the page loads using the window.onload property

### client4

- worked on client/app.js:
  - we can now create cards with the smurfs name we fetched via the function introduced in the previous chapter
  - the cards are appended to section-2

#### Flow of the data

1. we fetch the array from our server as soon as the page loads using window.onload( fetch( ...))

- fetch gets a response that is converted to a Javascript object using response.json(). [Checkout this link for a brief explanation](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)

2. we console.log the data and then we send the array to a function called appendSmurfs
3. appendSmurfs() takes an array as a parameter and runs createCardAndAppend() on each one of them
4. createCardAndAppend() uses the smurf element of the array (which is a String) to add it to the card
5. createCardAndAppend() appends the card to section2
