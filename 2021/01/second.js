const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(String(line))

const sum = array => array.reduce((acc, n) => acc + n, 0)

const { count } = lines.map(Number).reduce(({previous, current, count}, depth) => {
  previous = current
  current = current.concat(depth)
  if (current.length === 4) {
    current.shift()
    if (sum(current) > sum(previous)) {
      count++
    }
  }
  return {
    previous,
    current,
    count
  }
}, {previous: Number.POSITIVE_INFINITY, current: [], previous: undefined, count: 0})

log(count)
