const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const notes = lines.map(l => l.split(' | ')).map(([a, b]) => [a.split(' '), b.split(' ')])

const sum = notes.map(note => {
  return note[1].map(digit => {
    const l = digit.length
    if (l === 7) {
      return 1
    }
    if (l === 2) {
      return 1
    }
    if (l === 3) {
      return 1
    }
    if (l === 4) {
      return 1
    }
    return 0
  }).reduce((acc, n) => acc + n, 0)
}).reduce((acc, n) => acc + n, 0)
log(sum)
