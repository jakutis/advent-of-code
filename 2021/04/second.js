const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const draw = lines.shift().split(',')
let boards = []
const read = () => {
  if (lines.length === 0) {
    return
  }
  const board = []
  for (let i = 0; i < 5; i++) {
    board.push(lines.shift().split(/\W+/).map(n => ({n, marked: false})))
  }
  return board
}

while (true) {
  const board = read()
  if (!board) {
    break
  }
  boards.push(board)
}

const getWinners = () => {
  return boards.filter(board => {
    if (board.some(row => row.every(cell => cell.marked))) {
      return true
    }
    for(let i = 0; i < 5; i++) {
      let marked = true
      for(let j = 0; j < 5; j++) {
        if (!board[j][i].marked) {
          marked = false
        }
      }
      if (marked) {
        return true
      }
    }
  })
}

let winners = []
draw.forEach((n, nIndex, nArray) => {
  boards.forEach(board => {
    for(let i = 0; i < 5; i++) {
      for(let j = 0; j < 5; j++) {
        if (board[i][j].n === n) {
          board[i][j].marked = true
        }
      }
    }
  })
  const cWinners = getWinners()
  if (cWinners.length > 0) {
    boards = boards.filter(b => !cWinners.includes(b))
    winners.push({n, winners: cWinners})
  }
})

const { n, winners: lastWinners } = winners[winners.length - 1]
let winner = lastWinners[0]
let sum = 0
for(let i = 0; i < 5; i++) {
  for(let j = 0; j < 5; j++) {
    if (!winner[i][j].marked) {
      sum += Number(winner[i][j].n)
    }
  }
}
log(Number(n) * sum)
