/**
 * @jest-environment jsdom
 */

// In this file we'll be testing the View, what we see when we open the
// website (headers, forms, buttons etc.)
// We need to install jest-environment-jsdom to be able to test with Jest and we need to add
// the first three lines of this file at the very top!

// We need to create a DOM that is a copy of our website so we can test it with Jest.
// To do this we read client/index.html
const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')

// We segregate our tests inside describe functions to keep them tidy and relavant to what we are testing.
// We can do a describe for our whole file: describe('client/index.html', () => {})
// We could test the form inside a describe too: describe('form', () => {} ) etc

describe('client/index.html', () => {
  // before each test is run we want to start with a brand new DOM
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString()
  })

  describe('header element', () => {
    // All the tests relevant to the header will be within this describe

    // We can also add all the references to the DOM elements we are going to test
    // inside a beforeEach() to avoid repetition (remember DRY! Dont Repeat Yourself!)
    // Just make sure you:
    // - define the variable OUTSIDE the beforeEach()
    // - assign the value inside the forEach()
    let header, title
    beforeEach(() => {
      header = document.querySelector('header')
      title = document.querySelector('h1')
    })

    it('tests the header exists', () => {
      expect(header).toBeTruthy()
    })

    it('tests the header has a class of "header"', () => {
      let hasClassOfHeader = header.classList.contains('header')
      expect(hasClassOfHeader).toBeTruthy()
    })

    describe('h1 element inside the header', () => {
      // Testing the h1 element inside the header
      // I am using a describe function within the describe('header') because
      // the h1 is nested within the header so it makes sense to me
      it('tests the h1 exists', () => {
        expect(title).toBeTruthy()
      })

      it('tests the h1 element has a class of "title"', () => {
        let hasClassOfTitle = title.classList.contains('title')
        expect(hasClassOfTitle).toBeTruthy()
      })

      it('tests the h1 element has a text of "FullStack Smurfs"', () => {
        let text = title.textContent
        // Strings are tested with the matcher called "toMatch()"
        expect(text).toMatch('FullStack Smurfs')
      })

      it('tests the h1 element has a parent element of "header"', () => {
        let parentNode = title.parentNode
        let parentNodeHasClassOfHeader = parentNode.classList.contains('header')
        expect(parentNodeHasClassOfHeader).toBeTruthy()
      })
    })
  })
})
