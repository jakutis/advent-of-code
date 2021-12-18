const input = require('fs').readFileSync('./input.txt').toString().split(/\W+/).map(Number)
const sum = 2020

const r = new Set()
input.some(n => {
  if (r.has(n)) {
    console.log(n * (sum - n))
    return true
  }
  r.add(sum - n)
})
