const { split, match, filter } = require('../utils')

// 1
const words = split(' ')

// 2
const matchQs = match(/q/i)
const filterQs = filter(matchQs)

// 3
const keepHighest = Math.max
