const { curry } = require('../chapter-4')
const { compose } = require('../chapter-5')
const { prop } = require('../chapter-5/exercises')
const { match } = require('../chapter-7')

class Container {
	constructor(x) {
		this.$value = x
	}

	static of(x) {
		return new Container(x)
	}
}

Container.prototype.map = function (f) {
	return Container.of(f(this.$value))
}

Container.of(2).map(two => two + 2)

// A Functor is a type that implements map and obeys some laws.
// We can also call it "Mappable"

// By using functor we abstract away a function application

// inspect :: a -> String
const inspect = x => {
	if (x && typeof x.inspect === 'function') {
		return x.inspect()
	}

	function inspectFn(f) {
		return f.name ? f.name : f.toString()
	}

	function inspectTerm(t) {
		switch (typeof t) {
			case 'string':
				return `'${t}'`
			case 'object': {
				const ts = Object.keys(t).map(k => [k, inspect(t[k])])
				return `{${ts.map(kv => kv.join(': ')).join(', ')}}`
			}
			default:
				return String(t)
		}
	}

	function inspectArgs(args) {
		return Array.isArray(args)
			? `[${args.map(inspect).join(', ')}]`
			: inspectTerm(args)
	}

	return typeof x === 'function' ? inspectFn(x) : inspectArgs(x)
}

class Maybe {
	static of(x) {
		return new Maybe(x)
	}

	get isNothing() {
		return this.$value === null || this.$value === undefined
	}

	constructor(x) {
		this.$value = x
	}

	map(fn) {
		return this.isNothing ? this : Maybe.of(fn(this.$value))
	}

	inspect() {
		const res = this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`
		console.log(res)
		return res
	}
}

Maybe.of(null).map(match(/a/gi)).inspect()

// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((f, anyFunctor) => anyFunctor.map(f))

/* 
Use Cases 
*/

// safeHead :: [a] -> Maybe(a)
const safeHead = xs => Maybe.of(xs[0])

// streetName :: Object -> Maybe String
const streetName = compose(map(prop('street')), safeHead, prop('addresses'))

// Nothing
streetName({ addresses: [] }).inspect()
// Just('Shady Ln.')
streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }).inspect()

const maybe = curry((v, f, m) => {
	if (m.isNothing) return v

	return f(m.$value)
})

const getTwenty = compose(
	maybe("You're broke", finishTransaction),
	withdraw(20),
)
