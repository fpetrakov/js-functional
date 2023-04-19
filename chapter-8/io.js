const { compose, inspect, prop, split } = require('../utils')

class IO {
	static of(x) {
		return new IO(() => x)
	}

	constructor(fn) {
		this.$value = fn
	}

	map(fn) {
		return new IO(compose(fn, this.$value))
	}

	inspect() {
		return `IO(${inspect(this.$value)})`
	}
}

const ioWindow = new IO(() => window)

ioWindow.map(win => win.innerWidth)

ioWindow.map(prop('location')).map(prop('href')).map(split('/'))
