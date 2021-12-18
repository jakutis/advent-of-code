const { MinHeap } = require('mnemonist')

// dijkstra with priority queue (min-heap)
const solve = (map, log) => {
  const safestPathRisk = new Map()
  const unvisited = new Set()
  const toVisit = new MinHeap((a, b) => safestPathRisk.get(a) - safestPathRisk.get(b))

  map.forEach(r => r.forEach(p => {
    safestPathRisk.set(p, Number.POSITIVE_INFINITY)
    unvisited.add(p)
  }))
  safestPathRisk.set(map[0][0], 0)
  toVisit.push(map[0][0])

  while (toVisit.size) {
    const p = toVisit.pop()
    unvisited.delete(p)

    ;[map[p.y][p.x - 1], map[p.y][p.x + 1], map[p.y - 1]?.[p.x], map[p.y + 1]?.[p.x]].filter(Boolean).forEach(n => {
      const risk = safestPathRisk.get(p) + n.risk
      if (risk < safestPathRisk.get(n)) {
        safestPathRisk.set(n, risk)
        if (unvisited.has(n)) {
          toVisit.push(n)
        }
      }
    })
  }
  return safestPathRisk.get(map[map[0].length - 1][map.length - 1])
}

const read = lines => lines.map((l, y) => l.split('').map(Number).map((risk, x) => ({x, y, risk})))

exports.part1 = (lines, log) => solve(read(lines), log)

exports.part2 = (lines, log) => {
  const omap = read(lines)
  const map = []
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      omap.forEach(r => r.forEach(p => {
        p = {
          x: i * omap[0].length + p.x,
          y: j * omap.length + p.y,
          risk: ((p.risk - 1) + i + j) % 9 + 1
        }
        if (!map[p.y]) {
          map[p.y] = []
        }
        map[p.y][p.x] = p
      }))
    }
  }
  return solve(map, log)
}
