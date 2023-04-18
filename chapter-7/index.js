const { curry } = require('../chapter-4')
const { toUpperCase, toLowerCase } = require('../chapter-5')
const head = x => x.slice(0, 1)
const tail = x => x.slice(1)

// capitalize :: String -> String
const capitalize = s => toUpperCase(head(s)) + toLowerCase(tail(s))

// match :: Regex -> (String -> [String])
const match = curry((reg, s) => s.match(reg))

// onHoliday :: String -> [String]
const onHoliday = match(/holiday/gi)

// id :: a -> a
const id = x => x

// map :: (a -> b) -> [a] -> [b]
const map = curry((f, xs) => xs.map(f))

// reduce :: ((b, a) -> b) -> b -> [a] -> b
const reduce = curry((f, x, xs) => x.reduce(f, x))

/*
Parametricity
*/

// Parametricity property states that a function will act on all types in a uniform manner
// head :: [a] -> a

// We can also use types and theorems to optimize our code
// filter :: (a -> Bool) -> [a] -> [a]
// compose(map(f), filter(compose(p, f))) === compose(filter(p), map(f))

// sort :: Ord a => [a] -> [a]
// means 'a' must implement Ord interface

// assertEqual :: (Eq a, Show a) => a -> a -> Assertion

module.exports = {
	head,
	tail,
	match,
	map,
	reduce,
}
