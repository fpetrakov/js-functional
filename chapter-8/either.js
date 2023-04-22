const { inspect, curry } = require('../utils')

// momenjs mock
const moment = () => {}

class Either {
	static of(x) {
		return new Right(x)
	}

	constructor(x) {
		this.$value = x
	}
}

class Left extends Either {
	map(f) {
		return this
	}

	inspect() {
		return `Left(${inspect(this.$value)})`
	}
}

class Right extends Either {
	map(f) {
		return Either.of(f(this.$value))
	}

	inspect() {
		return `Right(${inspect(this.$value)})`
	}
}

const left = x => new Left(x)

// Example of error handling
// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
	const birthDate = moment(user.birthDate, 'YYYY-MM-DD')

	return birthDate.isValid()
		? Either.of(now.diff(birthDate, 'years'))
		: left('Birth date could not be parsed')
})

// Right(9)
getAge(moment(), { birthDate: '2005-12-12' })

// Left('Birth date could not be parsed')
getAge(moment(), { birthDate: 'July 4, 2001' })

// Either is the analogue logical disjunction (a.k.a ||) and of a Coproduct from category theory

const either = curry((f, g, e) => {
	let result

	switch (e.constructor) {
		case Left:
			result = f(e.$value)
			break

		case Right:
			result = g(e.$value)
			break
	}

	return result
})

module.exports = {
	either,
	Left,
	Right,
	Either,
}