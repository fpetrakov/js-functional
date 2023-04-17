const { curry } = require('./index')

const split = curry((sep, str) => str.split(sep))
const match = curry((re, str) => re.test(str))
const filter = curry((fn, arr) => arr.filter(fn))

// 1
const words = split(' ')

// 2
const matchQs = match(/q/i)
const filterQs = filter(matchQs)

// 3
const keepHighest = Math.max

module.exports = {
	split,
	match,
	filter,
}
