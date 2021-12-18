const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const sortNumber = (a, b) => a < b ? 1 : -1
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

const findBasin = (map, x, y) => {
  let id = []
  let size = 0
  const addBasin = (x, y) => {
    let _id = y * map[0].length + x
    if (id.includes(_id)) {
      return
    }
    if (!(0 <= x && x <= map[0].length - 1)) {
      return
    }
    if (!(0 <= y && y <= map.length - 1)) {
      return
    }
    if (map[y][x] === 9) {
      return
    }

    size += 1
    id.push(_id)

    addBasin(x, y - 1)
    addBasin(x, y + 1)
    addBasin(x + 1, y)
    addBasin(x - 1, y)
  }
  addBasin(x, y)
  return {id: id.sort(sortNumber).join('-'), size}
}

const sizes = {}
for (let x = 0; x < map[0].length; x++) {
  for (let y = 0; y < map.length; y++) {
    if (lower(map, x, y)) {
      let {id, size} = findBasin(map, x, y)
      sizes[id] = size
    }
  } 
}

const largest = Object.values(sizes).sort(sortNumber).slice(0, 3)
log(largest[0] * largest[1] * largest[2])
