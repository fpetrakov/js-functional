// A function is a special relation between values: Each of its input gives back exactly one output value.

// Why use pure functions:

// - Cacheable

const memoize = f => {
	const cache = {}

	return (...args) => {
		const argStr = JSON.stringify(args)
		cache[argStr] = cache[argStr] || f(...args)
		return cache[argStr]
	}
}

// we can cache impure functions too
// although it's caching of generated functions, not results
const pureHttpCall = memoize((url, params) => () => $.getJSON(url, params))

// - Portable

// - Testable

// - Referential Transparency
// You can replace function with its evaluation result, so it's easier to reason about and refactor

// - Parallel Programming
// Pure functions don't have shared resources so they can't have race conditions
