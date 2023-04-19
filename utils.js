function curry(fn) {
	const arity = fn.length

	return function $curry(...args) {
		if (args.length < arity) {
			return $curry.bind(null, ...args)
		}

		return fn.call(null, ...args)
	}
}

const add = curry((a, b) => a + b)

const flip = curry((fn, a, b) => fn(b, a))

const concat = curry((a, b) => a.concat(b))

const append = flip(concat)

const chain = curry((fn, m) => m.chain(fn))

const forEach = curry((fn, xs) => xs.forEach(fn))

const intercalate = curry((str, xs) => xs.join(str))

const join = m => m.join()

const last = xs => xs[xs.length - 1]

const eq = curry((a, b) => a === b)

const always = curry((a, b) => a)

const compose =
	(...fns) =>
	(...args) =>
		fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0]

const split = curry((sep, str) => str.split(sep))

const filter = curry((fn, arr) => arr.filter(fn))

const prop = curry((p, obj) => obj[p])

const reduce = curry((fn, zero, xs) => xs.reduce(fn, zero))

const map = curry((fn, arr) => arr.map(fn))

const trace = curry((tag, x) => {
	console.log(tag)
	return x
})

const toLowerCase = s => s.toLowerCase()

const toUpperCase = x => x.toUpperCase()

const match = curry((reg, s) => s.match(reg))

const head = x => x.slice(0, 1)

const tail = x => x.slice(1)

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

const replace = curry((re, rpl, str) => str.replace(re, rpl))

module.exports = {
	curry,
	split,
	match,
	filter,
	prop,
	reduce,
	map,
	compose,
	trace,
	replace,
	toLowerCase,
	toUpperCase,
	head,
	tail,
	inspect,
	always,
	add,
	flip,
	append,
	chain,
	concat,
	forEach,
	intercalate,
	join,
	last,
	eq,
}