const input = require('fs').readFileSync('./input.txt').toString().split('\n').map(s => s.trim()).filter(s => s)

const tileAt = (tiles, x, y) => {
  return tiles[y][x % tiles[0].length]
}

const numberOfTrees = (tiles, xStep, yStep) => {
  let x = 0
  let y = 0
  let trees = 0
  while (y < tiles.length) {
    if (tileAt(tiles, x, y) === '#') {
      trees += 1
    }
    x += xStep
    y += yStep
  }
  return trees
}

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2]
]

const product = slopes.reduce((p, [x, y]) => p * numberOfTrees(input, x, y), 1)

console.log(product)