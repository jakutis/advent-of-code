const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const segments = lines
  .map(line => line.split(' -> '))
  .map(([a, b]) => ({
    a: a.split(',').map(Number),
    b: b.split(',').map(Number),
  }))
  .filter(({a, b}) => a[0] === b[0] || a[1] === b[1])

const inc = (map, x, y) => {
  if (!map[x]) {
    map[x] = []
  }
  if (!map[x][y]) {
    map[x][y] = 0
  }
  map[x][y]++
}

const map = segments.reduce((map, {a, b}) => {
  if (a[0] === b[0]) {
    const from = Math.min(a[1], b[1])
    const to = Math.max(a[1], b[1])
    for (let i = from; i <= to; i++) {
      inc(map, a[0], i)
    }
  } else {
    const from = Math.min(a[0], b[0])
    const to = Math.max(a[0], b[0])
    for (let i = from; i <= to; i++) {
      inc(map, i, a[1])
    }
  }
  return map
}, [])

let count = 0
map.forEach(row => row.forEach(cell => {
  if (cell >= 2) {
    count++
  }
}))

log(count)
