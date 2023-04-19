const { prop, compose, reduce, map } = require('../utils')

const car = {
	name: 'Aston Martin One-77',
	horsepower: 750,
	dollar_value: 1850000,
	in_stock: true,
}

// 1
const length = items => items.length
const last = items => items[length(items) - 1]
const inStock = prop('in_stock')
const isLastInStock = compose(inStock, last)

// 2
const add = (a, b) => a + b
const average = xs => reduce(add, 0, xs) / length(xs)
const dollarValue = prop('dollar_value')
const dollarValues = map(dollarValue)

const averageDollarValue = compose(average, dollarValues)
