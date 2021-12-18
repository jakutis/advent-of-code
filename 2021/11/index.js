const step = (map) => {
  const xmax = map[0].length - 1
  const ymax = map.length - 1
  map.forEach(row => row.forEach(o => o.e++))
  const flashed = []
  const flash = (x, y) => {
    const o = map[y][x]
    if (o.e <= 9) {
      return
    }
    if (flashed.includes(o)) {
      return
    }
    flashed.push(o)

    increase(x - 1, y + 1)
    increase(x, y + 1)
    increase(x + 1, y + 1)
    increase(x - 1, y)
    increase(x + 1, y)
    increase(x - 1, y - 1)
    increase(x, y - 1)
    increase(x + 1, y - 1)
  }
  const increase = (x, y) => {
    if (y < 0 || y > ymax) {
      return
    }
    if (x < 0 || x > xmax) {
      return
    }
    map[y][x].e++
    flash(x, y)
  }
  for (let x = 0; x <= xmax; x++) {
    for (let y = 0; y <= ymax; y++) {
      flash(x, y)
    }
  }
  flashed.forEach(o => o.e = 0)
  return flashed.length
}

exports.part1 = (lines) => {
  const map = lines.map((l, y) => l.split('').map(Number).map((e, x) => ({e, x, y})))
  let flashes = 0
  for (let i = 0; i < 100; i++) {
    flashes += step(map)
  }
  return flashes
}

exports.part2 = (lines) => {
  const map = lines.map((l, y) => l.split('').map(Number).map((e, x) => ({e, x, y})))
  for (let i = 0; true; i++) {
    const flashes = step(map)
    if (flashes === map.length * map[0].length) {
      return i + 1
    }
  }
}
