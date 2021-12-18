const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const numbers = lines.map(n => n.split(''))
const find = (numbers, choose) => {
  let bit = 0
  while (true) {
    if (numbers.length === 1) {
      return parseInt(numbers[0].join(''), 2)
    }

    const zero = numbers.filter(n => n[bit] === '0')
    const one = numbers.filter(n => n[bit] === '1')
    numbers = choose(zero.length, one.length) === '0' ? zero : one

    bit++
  }
}
const co2 = find(numbers, (zeros, ones) => zeros === ones ? '0' : (zeros < ones ? '0' : '1'))
const oxygen = find(numbers, (zeros, ones) => zeros === ones ? '1' : (zeros > ones ? '0' : '1'))
log(co2 * oxygen)
