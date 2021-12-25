const moveOneSouth = (map, x, y) => {
  const nx = x
  const ny = (y === map.length - 1) ? 0 : (y + 1)
  if (map[ny][nx] === '.') {
    return {
      x: nx,
      y: ny
    }
  }
}
const moveOneEast = (map, x, y) => {
  const nx = (x === map[0].length - 1) ? 0 : (x + 1)
  const ny = y
  if (map[ny][nx] === '.') {
    return {
      x: nx,
      y: ny
    }
  }
}
const moveAll = (map, cucumber, move) => {
  const moves = []
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      if (map[y][x] === cucumber) {
        const to = move(map, x, y, moves)
        if (to) {
          moves.push({
            from: {x,y},
            to
          })
        }
      }
    }
  }
  moves.forEach(({from, to}) => {
    map[from.y][from.x] = '.'
    map[to.y][to.x] = cucumber
  })
  return moves.length
}
exports.part1 = (map) => {
  map = map.map(l => l.split(''))
  for (let step = 0; ; step++) {
    const east = moveAll(map, '>', moveOneEast)
    const south = moveAll(map, 'v', moveOneSouth)
    if (east === 0 && south === 0) {
      return step + 1
    }
  }
}

exports.part2 = (lines) => {
}
