const input = require('fs').readFileSync('./input.txt').toString().split('\n').map(s => s.trim()).filter(s => s)

const tileAt = (tiles, x, y) => {
  return tiles[y][x % tiles[0].length]
}

let x = 0
let y = 0
let trees = 0
for (let i = 1; i < input.length; i++) {
  if (tileAt(input, x, y) === '#') {
    trees += 1
  }
  x += 3
  y += 1
}

console.log(trees)