const add = x => y => x + y
const inc = add(1)
const addTen = add(10)

inc(2) // 3
addTen(2) // 2

function curry(fn) {
	const arity = fn.length

	return function $curry(...args) {
		if (args.length < arity) {
			return $curry.bind(null, ...args)
		}

		return fn.call(null, ...args)
	}
}

module.exports = {
	curry,
}
