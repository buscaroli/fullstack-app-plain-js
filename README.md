# 💪 Learning to connect the Frontend to the Backend: FullStack Dev 💪

I have decided to make an app that would cover both the frontend and the backend, testing included.
If accessing the app with a web browser, you can add some colored cards after entering a name in the form and pressing the button.
This app is smurf-inspired, which means if you enter the name of a few famous smurfs (try smurfette and papa smurf, the rest are up to you to find!) the cards will have a different colour.

## 💾 Technology

### 🖥 Frontend

- HTML
- CSS
- Plain JS
- Jest testing library

### 💻 Backend

- Nodejs
- Expressjs
- Jest testing library
- Supertest for testing HTTP responses
- nodemon for a smoother development experience

## 🚗 HOW TO RUN

To run the server:

```bash
cd server && npm start
```

To run the client:

```bash
cd client
```

Then:

- open index.html and run it locally with:
  - VSCode LiveView
  - http.server
  - your favourite choice

## 🌲 BRANCHES

This the order I have used to develop this app. By opening the branches in that order you can see all the different steps I have taken in order to get to the final release.

### 👾 server1

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

  #### 🚨 ERRATA CORRIDGE

  In the client/index.html I had originally imported a file called index.js but I had created a file called app.js

  - amend the import at line 8 to the following (but we won't touch that file until ##client3):

  ```html
  <script defer src="./app.js"></script>
  ```

### 👾 server2

- added server/data.js file that contains an array where data about the smurfs is kept
- the array:
  - exported from server/data.js
  - imported in server/server.js
- a new route has been added to server/server.js
  - you can access localhost:3000/smurfs

### 👾 server3

- worked on server/server.js, there are now three routes:
  - GET / browser/hoppscotch: responds with a welcome message
  - GET /smurfs browser/hoppscotch: responds with a list of smurfs from the DB
  - POST /smurfs hoppscotch: adds 'Clumsy' or if already there responds with 405 (Forbidden) and an error message

##### 🚨 ERRATA CORRIDGE

The array in server/data.js and in server/server.js should be defined as a let and not as a const

- inside the POST route we search if the smurf exists: I should have user the Array.some() method
  instead of the Array.every() and the logic will be different, please **correct** with the following:

  ```js
  // We check if the name alrady exists in the database
  // At the moment we have hardcoded the name so we'll be able to add it only once
  const newSmurfExists = dataArray.some((smurf) => smurf === newSmurf)
  ```

### 👾 server4

- worked on server/server.js, 👆 fixed errors as per **ERRATA CORRIGE** at #server3 👆
  - added rouse DELETE /smurfs: removes 'Clumsy' or if not found responds with an HTTP Status of 404 (Not Found) and an error message

### 🛸 client1

- worked on the client/index.html and client/style.css files:
  - added a header with title
  - added a footer with some text
  - added a main element
  - used flex-box in order to keep the header and footer apart
  - given the body a height of 100vh to have the page be the same size as the height of the screen
  - page is fluid but not responsive (elements shrink but do not rearrange themselves when the screen widtg is decreased)

### 🛸 client2

- worked on index.html and style.css:
  - added two sections inside of main: section-1 contains the form, section-2 will contain the smurf cards
  - added a basic form using flexbox
  - the form is not doing anything yet when the button is pressed

### 🛸 client3

Worked on client/app.js:

- added the references to the elements we are going to targer
- added a function that fetch the smurfs grom the GET /smurfs route of our server
  - the function is called as soon as the page loads using the window.onload property

#### 🚨 ERRATA CORRIDGE - reminder from from ##server1

In the client/index.html I had originally imported a file called index.js but I had created a file called app.js

- amend the import at line 8 to the following if you haven't followed the ERRATA CORRIDGE at ##server1:

```html
<script defer src="./app.js"></script>
```

### 🛸 client4

Worked on client/app.js:

- we can now create cards with the smurfs name we fetched via the function introduced in the previous chapter
- the cards are appended to section-2

#### 🚨 ERRATA CORRIDGE

In client/app.js, please amend the line where we add the class to the smurfCard.

- The correct way of adding a class is without the leading '.' as follows:

```js
smurfCard.classList.add('smurfCard')
```

#### Flow of the data

1. we fetch the array from our server as soon as the page loads using window.onload( fetch( ...))

- fetch gets a response that is converted to a Javascript object using response.json(). [Checkout this link for a brief explanation](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)

2. we console.log the data and then we send the array to a function called appendSmurfs
3. appendSmurfs() takes an array as a parameter and runs createCardAndAppend() on each one of them
4. createCardAndAppend() uses the smurf element of the array (which is a String) to add it to the card
5. createCardAndAppend() appends the card to section2

### 🛸 client5

- Worked on client/style.css:

  - added some basic styling for #section-2 and .smurfCard that you can find at the end of the file
  - at this point even if you try to add 'Clumsy' with a tool like [Hoppscotch](https://hoppscotch.io/) you won't see it as the page is not refreshed
  - if you really want to see that 'Clumsy' has been added you hacve two options:

    1. reload the page!
    2. run this command from the console of your browser's dev tools:

  ```js
  fetch('http://localhost:3000/smurfs')
    .then((res) => res.json())
    .then((x) => console.log(x))

  // it should return: (4) ['Papa Smurf', 'Smurfette', 'Brainy', 'Clumsy']
  ```

  - you can follow the same steps after deleting 'Clumsy' with Hoppscotch or a similar tool

### 🪐 fullstack1

Worked on client/style.css:

- removed the flex-grow property from .smurfCard as I didn't like the effect it had on the last row of smurfCards
- amended the size of the cards

Worked on cient/app.js:

- we can now send the name of the smurf to the server
- after sending the name we reload the page in order to have the full list of smurfs back

Worked on server/server.js:

- POST /smurfs:
  - instead of using the hardcoded 'Clumsy' name for every smurf we can now use the one we submitted in our webpage
  - before sending the name we had to convert it to a JSON string (in client/app.js) with JSON.stringify()
  - in both routes 'POST /smurfs' and 'DELETE /smurfs':
    - we can receive the JSON in server/server.js using the req.body object
    - we extract the name out of that object (req.body.name)
    - we amenhave to fix the comparison function to consider we now have to use req.body.name, whose value we saved in newSmurfName or nameSmurfToBeRemoved

### 🪐 fullstack2

Worked on server/server.js:

- amended array functions by adding toLowerCase() in order to avoid having the same smurf name twice just because it had some capitals (eg 'Papa Smurf' and 'papa smurf')

Worked on client/add.js:

- when creting the smurfCard:
  - added an event listened that will send a delete request when the card is clicked

### 🚨 ERRATA CORRIDGE

Within server/server.js inside route 'DELETE /smurfs':

- I used an non-existing variable name of smurfToBeRemoved a few times, please amend it to nameSmurfToBeRemoved

### 💅 polishing1

Worked on client/app.js

- The card colours now depend on the name of the smurf;
  - Most smurfs will have a blue card with white text but some will have a different colour, try with:
    - papa smurf
    - smurfette
    - vanity
    - grouchy

### main

Amended the justify-content property of .section-2 inside client/style.css, as I prefer the content to always be centered, particularly with small screens.

```css
justify-content: center;
```

### 💅 polishing2

Worked on /client/app.js
Created client/utils.js
Imported client/utils.js within index.html

- segregated the fetchSmurfs function away from the window.onload assignment
- amended the order the functions are shown in the code to mimick the order in which they are called
- moved all the functions from client/index.html into client/utils.js
- removed most comments as can be seen through the different branches

#### **Separating the functionality (client/utils.js) from the controller (client/app.js) should make it easier to test as I can create two separate test suites.**

### 🧪 testing-client-1

Installed Jest and jest-environment-jsdom:

```bash
npm i jest jest-environment-dom

```

Modified package.json to look like this:

```json
{
  "scripts": {
    "test": "jest --watchAll",
    "coverage": "jest --coverage"
  },
  "dependencies": {
    "jest": "^28.1.0",
    "jest-environment-jsdom": "^28.1.0"
  }
}
```

- Created client/tests/view.test.js
- tested the <header> element wit jest and the included <h1> element

### 🧪 testing-client-2

- Recovered from a random bug: had duplicate copies of files
- testing the dom: tested form and label

### 🧪 testing-client-3

- tested input within the form
- tested button within the form

### 🧪 testing-client-4

- tested existence of section-2
- tested the footer and its children

### 🧪 testing-server-1

Setting up the system in order to be able to do server-side testing:

```bash
cd server
npm i -D jest supertest
```

Create the file where you are going to run the tests:

```bash
mkdir tests
touch tests/server.test.js
```

dd the two new commands to the script property within server/package.json:

```json
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest --watchAll",
    "coverage": "jest --coverage"
  },
```

Now you can both test and check the coverage by running the following commands(And remember that when running `npm test` jest is run in --watchAll mode, which means it will re-run the tests every time you save the file, very handy!):

```bash
npm test
npm run coverage
```

I have added two Hooks to server/tests/server.test.js:

- beforeAll() will start the server before the tests are run (once at the beginning)
- afterAll() will stop the server after all the tests have run (once after the last test has run)

I have also added a simple test that checks for a HTTP response of 200 (OK) when the client tries to connect to `http://localhost3000/`

### 🧪 testing-server-2

Worked in server/tests/server.test.js:

- Added tests for POST /smurfs, both 201 (Created) and 403 (Forbidden)

#### 🚨 ERRATA CORRIGE

In server/server.js, within the route POST /smurfs:

- add a status of 201 (Created) before sending back the smurf with the response, also send back an object instead of a string or you won't be able to test it.
  The code should look like this:

```js
  // If the newSmurf is not in the db we can add them
    else {
    dataArray.push(newSmurfName)
    res.status(201).send({ name: newSmurfName })
  }
```

### 🧪 testing-server-3

Worked on server/tests/server.test.js:

- Added tests for the route DELETE /smurfs, both 200 (OK) and 404 (Not Found)

### 🚨 ERRATA CORRIGE

In server/server.js, within the route DELETE /smurfs:

- return an object instead of a string on a successful operation so it can be tested
  Your code should look like this:

```js
if (smurfToBeRemovedExists) {
  let filteredArray = dataArray.filter(
    (smurf) => smurf.toLowerCase() !== nameSmurfToBeRemoved.toLowerCase()
  )
  dataArray = filteredArray
  res.send({ name: nameSmurfToBeRemoved })
}
```
