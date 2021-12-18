const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(String(line))

const counts = []

lines.map(n => n.split('')).forEach(bits => {
  bits.forEach((bit, index) => {
    counts[index] = counts[index] || {}
    const count = counts[index][bit] || 0
    counts[index][bit] = count + 1
  })
})

let least = ''
let most = ''
counts.forEach(counts => {
  if (counts['0'] === counts['1']) {
    throw new Error()
  }
  if (counts['0'] > counts['1']) {
    most += '0'
    least += '1'
  } else {
    most += '1'
    least += '0'
  }
})

log(parseInt(most, 2) * parseInt(least, 2))
