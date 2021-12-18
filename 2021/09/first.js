const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const map = lines.map(l => l.split('').map(Number))
const lower = (map, x, y) => {
  const r = map[y][x]
  let l = true
  if (y > 0 && r >= map[y - 1][x]) {
    l = false
  }
  if (x > 0 && r >= map[y][x - 1]) {
    l = false
  }
  if (y < (map.length - 1) && r >= map[y + 1][x]) {
    l = false
  }
  if (x < (map[0].length - 1) && r >= map[y][x + 1]) {
    l = false
  }
  return l
}

let sum = 0
for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
    if (lower(map, x, y)) {
      sum += 1 + map[y][x]
    }
  } 
}

log(sum)
