const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(String(line))

const { count } = lines.map(Number).reduce(({previous, count}, current) => {
  if (current > previous) {
    count++
  }
  return {
    previous: current,
    count
  }
}, {previous: Number.POSITIVE_INFINITY, count: 0})

log(count)
