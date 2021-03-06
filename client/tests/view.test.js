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

    describe('section-1', () => {
      // testing the components included within section-1
      let section1, form, label, input, btn
      beforeEach(() => {
        section1 = document.querySelector('#section-1')
        form = document.querySelector('#form-id')
        label = document.querySelector('#form-label')
        input = document.querySelector('#form-input')
        btn = document.querySelector('#form-btn')
        section2 = document.querySelector('#section-2')
      })

      it('tests and section-1 exists', () => {
        expect(section1).toBeTruthy()
      })

      it('tests the form exists', () => {
        expect(form).toBeTruthy()
      })

      describe('label', () => {
        it('tests the label exists', () => {
          expect(label).toBeTruthy()
        })

        it('tests the label has a for attribure and that it is equal to "form-input"', () => {
          expect(label.hasAttribute('for')).toBeTruthy()
          expect(label.getAttribute('for')).toEqual('form-input')
        })

        it('tests the label has a value of "Smurf Name"', () => {
          expect(label.textContent).toMatch('Smurf Name')
        })
      })

      describe('input', () => {
        it('tests the input exists', () => {
          expect(input).toBeTruthy()
        })

        it('tests the input has a type attribute and it equals to "text"', () => {
          expect(input.hasAttribute('type')).toBeTruthy()
          expect(input.getAttribute('type')).toMatch('text')
        })

        it('tests the input has a placeholder attribute and it equals to "Clumsy"', () => {
          expect(input.hasAttribute('placeholder')).toBeTruthy()
          expect(input.getAttribute('placeholder')).toMatch('Clumsy')
        })
      })

      describe('button', () => {
        it('tests the button exists', () => {
          expect(btn).toBeTruthy()
        })

        it('tests the button has a type attribute and it equals to "submit"', () => {
          expect(btn.hasAttribute('type')).toBeTruthy()
          expect(btn.getAttribute('type')).toMatch('submit')
        })

        it('tests the button has a value attribute and it equals to "Add"', () => {
          expect(btn.hasAttribute('value')).toBeTruthy()
          expect(btn.getAttribute('value')).toMatch('Add')
        })
      })

      describe('section-2', () => {
        it('tests that section-2 exists', () => {
          expect(section2).toBeTruthy()
        })
      })

      describe('footer', () => {
        let footer, h3, h5
        beforeEach(() => {
          footer = document.querySelector('footer')
          h3 = document.querySelector('h3')
          h5 = document.querySelector('h5')
        })
        it('tests that the footer exists and that it has a class of "footer"', () => {
          expect(footer).toBeTruthy()

          const hasClassOfFooter = footer.classList.contains('footer')
          expect(hasClassOfFooter).toBeTruthy()
        })

        describe('h3 inside of footer', () => {
          it('tests that the h3 exists and that it has a class of "notes"', () => {
            expect(h3).toBeTruthy()

            const hasClassOfNotes = h3.classList.contains('notes')
            expect(hasClassOfNotes).toBeTruthy()
          })

          it('tests that the h3 has a text containing the word README.md', () => {
            expect(h3.textContent).toMatch(/README.md/)
          })
        })

        describe('h5 inside of footer', () => {
          it('tests that h5 exists', () => {
            expect(h5).toBeTruthy()
          })

          it('expects h5 to contain the word utils', () => {
            expect(h5.textContent).toMatch(/utils/)
          })
        })
      })
    })
  })
})
