const input = require('fs').readFileSync('./input.txt').toString().split('\n').map(s => s.trim())

const middle = (from, to) => from + (to - from) / 2

const bspToInt = (bsp, from, to) => bsp.reduce(({from, to}, up) => up ? {
  from: Math.ceil(middle(from, to)),
  to
} : {
  from,
  to: Math.floor(middle(from, to))
}, {from, to}).from

const strToBsp = (str, up) => str.split('').map(s => s === up)

const row = (seat) => bspToInt(strToBsp(seat.substr(0, 7), 'B'), 0, 127)

const column = (seat) => bspToInt(strToBsp(seat.substr(7), 'R'), 0, 7)

const seatId = (seat) => row(seat) * 8 + column(seat)

const highestSeatId = seats => Math.max(...seats.map(seatId))

console.log(highestSeatId(input))