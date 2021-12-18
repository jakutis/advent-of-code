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

const frontRow = () => ({
  from: bspToInt(strToBsp('FFFFFFF', 'B'), 0, 127) * 8 + 0,
  to: bspToInt(strToBsp('FFFFFFF', 'B'), 0, 127) * 8 + 7
})

const backRow = () => ({
  from: bspToInt(strToBsp('BBBBBBB', 'B'), 0, 127) * 8 + 0,
  to: bspToInt(strToBsp('BBBBBBB', 'B'), 0, 127) * 8 + 7
})

const takenSeatIds = (seats) => seats.map(seatId)

const mySeatId = (seats) => {
  const t = takenSeatIds(seats)
  const b = backRow()
  const f = frontRow()
  const allSeatIds = Array.from(new Array(127 * 8 + 8)).map((_, s) => s)
  const seatIdToIsTaken = allSeatIds.map(seatId => t.includes(seatId) || (b.from <= seatId && seatId <= b.to) || (f.from <= seatId && seatId <= f.to))

  for (let i = 0; i < seatIdToIsTaken.length; i++) {
    if (seatIdToIsTaken[i - 1] && !seatIdToIsTaken[i] && seatIdToIsTaken[i + 1]) {
      return i
    }
  }
}

console.log(mySeatId(input))