const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const segments = lines
  .map(line => line.split(' -> '))
  .map(([a, b]) => ({
    a: a.split(',').map(Number),
    b: b.split(',').map(Number),
  }))

const inc = (map, x, y) => {
  if (!map[x]) {
    map[x] = []
  }
  if (!map[x][y]) {
    map[x][y] = 0
  }
  map[x][y]++
}

const map = []
segments.forEach(({a, b}) => {
  if (a[0] === b[0]) {
    const from = Math.min(a[1], b[1])
    const to = Math.max(a[1], b[1])
    for (let i = from; i <= to; i++) {
      inc(map, a[0], i)
    }
  } else if (a[1] === b[1]) {
    const from = Math.min(a[0], b[0])
    const to = Math.max(a[0], b[0])
    for (let i = from; i <= to; i++) {
      inc(map, i, a[1])
    }
  } else {
    const xStep = a[0] < b[0] ? 1 : -1
    const yStep = a[1] < b[1] ? 1 : -1
    let x = a[0], y = a[1]
    inc(map, x, y)
    while (x !== b[0]) {
      x += xStep
      y += yStep
      inc(map, x, y)
    }
    if (x !== b[0] || y !== b[1]) {
      throw [x, y, b[0], b[1], xStep, yStep, a[0], a[1]]
    }
  }
})

let count = 0
map.forEach(row => row.forEach(cell => {
  if (cell >= 2) {
    count++
  }
}))

log(count)
