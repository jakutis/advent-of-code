const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const positions = lines[0].split(',').map(Number)

const asum = (n) => n * (n + 1) / 2
const cache = {}
const cost = x => {
  if (cache[x] !== undefined) {
    return cache[x]
  }
  const cost = positions.reduce((acc, p) => {
    return acc + asum(Math.abs(p - x))
  }, 0)
  cache[x] = cost
  return cost
}

let a = 0
let b = Math.max.apply(Math, positions)
let minCost = Number.POSITIVE_INFINITY
for (let x = a; x <= b; x++) {
  const c = cost(x)
  if (c < minCost) {
    minCost = c
  }
}
log(minCost)
