const {
	curry,
	replace,
	compose,
	toUpperCase,
	toLowerCase,
} = require('../utils')

const exclaim = x => `${x}!`
const shout = compose(exclaim, toUpperCase)
console.log(shout('hello there'))

// compose is associative
// compose(f, compose(g, h)) === compose(compose(f, g), h)

// pointfree style can be useful because it makes functions more generic and so reusable
const snakeCaseFree = compose(replace(/\s+/gi, '_'), toLowerCase)
// not pointfree
const snakeCaseNotFree = word => word.toLowerCase().replace(/\s+/gi, '_')

// Debugging
const trace = curry((tag, x) => {
	console.log(tag)
	return x
})

// Category Theory

// Category is a collection with the following components:
// - A collection of objects - data types
// - A collection of morphisms - pure functions
// - A notion of composition of the morphisms - compose

const g = x => x.length
const f = x => x === 4
const isFourLetterWord = compose(f, g)

// - A distinguished morphism called identity

const id = x => x
