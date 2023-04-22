const {
	eq,
	last,
	map,
	compose,
	inspect,
	prop,
	split,
	head,
} = require('../utils')
const { Maybe } = require('.')

// mock
const window = {
	innerWidth: 1430,
	location: {
		href: 'http://localhost:8000/blog/posts',
	},
}

class IO {
	static of(x) {
		return new IO(() => x)
	}

	constructor(io) {
		this.unsafePerformIO = io
	}

	map(fn) {
		return new IO(compose(fn, this.unsafePerformIO))
	}

	inspect() {
		const res = `IO(${inspect(this.$value)})`
		console.log(res)
		return res
	}
}

const ioWindow = new IO(() => window)

ioWindow.map(win => win.innerWidth).inspect()

ioWindow.map(prop('location')).map(prop('href')).map(split('/')).inspect()

const $ = selector => new IO(() => document.querySelectorAll(selector))
$('#myDiv')
	.map(head)
	.map(div => div.innerHTML)

// impure later
const url = new IO(() => window.location.href)
const toPairs = compose(map(split('=')), split('&'))
const params = compose(toPairs, last, split('?'))
const findParam = key =>
	map(compose(Maybe.of, find(compose(eq(key), head)), params), url)

// impure calling code
findParam('searchTerm').unsafePerformIO()

module.exports = {
	IO,
}
