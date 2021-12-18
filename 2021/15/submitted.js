const getKey = (map, to) => to.x + '-' + to.y + '=' + map[to.x][to.y]
exports.part1 = (lines, log) => {
  return
  const map = lines.map((l, y) => l.split('').map(Number).map((risk, x) => ({x, y, risk})))
  const dijkstra = () => {
    const queue = []
    const safestPathRisk = new Map()
    const neighboors = new Map()
    map.forEach((r) => r.forEach((p) => {
      safestPathRisk.set(p, Number.POSITIVE_INFINITY)
      neighboors.set(p, [
        {x: p.x, y: p.y - 1},
        {x: p.x, y: p.y + 1},
        {x: p.x - 1, y: p.y},
        {x: p.x + 1, y: p.y}
      ]
        .filter(n => n.x >= 0 && n.y >= 0 && n.x <= (map[0].length - 1) && n.y <= (map.length - 1))
        .map(n => map[n.y][n.x])
      )

      queue.push(p)
    }))

    let p = queue.shift()
    safestPathRisk.set(p, 0)
    while (p) {
      neighboors.get(p).forEach(n => {
        const risk = safestPathRisk.get(p) + n.risk
        if (risk < safestPathRisk.get(n)) {
          safestPathRisk.set(n, risk)
        }
      })
      let min
      queue.forEach((p, i) => {
        const risk = safestPathRisk.get(p)
        if (min === undefined || risk < min.risk) {
          min = {p, risk, i}
        }
      })
      if (min === undefined) {
        break
      }
      queue.splice(min.i, 1)
      p = min.p
    }
    p = {x: (map[0].length - 1), y: (map.length - 1)}
    const risk = safestPathRisk.get(map[p.x][p.y])

    const print = () => {
      let out = ''
      map.forEach((r) => {r.forEach((p) => {
        out += safestPathRisk.get(p).toString().padStart(9, ' ')
      });out+='\n'})
      return out
    }

    log(print())

    return risk
  }
  return dijkstra()
}

exports.part2 = (lines, log) => {
  const omap = lines.map((l, y) => l.split('').map(Number).map((risk, x) => ({x, y, risk})))
  const map = []
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      omap.forEach(r => r.forEach(p => {
        const x = i * omap[0].length + p.x
        const y = j * omap.length + p.y
        const risk = ((p.risk - 1) + i + j) % 9 + 1
        if (!map[y]) {
          map[y] = []
        }
        map[y][x] = {
          x,
          y,
          risk
        }
      }))
    }
  }

  const dijkstra = () => {
    const queue = []
    const _x = {}
    const safestPathRisk = {
      set: (p, v) => {
        _x[p.x + ',' + p.y] = v
      },
      get: (p) => {
        return _x[p.x + ',' + p.y]
      }
    }
    const neighboors = new Map()
    map.forEach((r) => r.forEach((p) => {
      safestPathRisk.set(p, Number.POSITIVE_INFINITY)
      neighboors.set(p, [
        {x: p.x, y: p.y - 1},
        {x: p.x, y: p.y + 1},
        {x: p.x - 1, y: p.y},
        {x: p.x + 1, y: p.y}
      ]
        .filter(n => n.x >= 0 && n.y >= 0 && n.x <= (map[0].length - 1) && n.y <= (map.length - 1))
        .map(n => map[n.y][n.x])
      )

      queue.push(p)
    }))
    const printMap = () => {
      let out = ''
      map.forEach((r) => {r.forEach((p) => {
        out += p.risk.toString().padStart(2, ' ') + (p.x % omap[0].length === omap[0].length - 1 ? '   ' : '')
      });out+='\n'})
      return out
    }
    //log(printMap())


    let p = queue.shift()
    safestPathRisk.set(p, 0)
    let count = queue.length
    while (p) {
      count--
      log(count)
      neighboors.get(p).forEach(n => {
        const risk = safestPathRisk.get(p) + n.risk
        if (risk < safestPathRisk.get(n)) {
          safestPathRisk.set(n, risk)
        }
      })
      let minR, minP, minI
      for (let i = queue.length - 1; i >= 0; i--) {
        const p = queue[i]
        if (!p) {
          continue
        }
        const risk = safestPathRisk.get(p)
        if (minR === undefined || risk < minR) {
          minR = risk
          minP = p
          minI = i
        }
      }
      if (minI === undefined) {
        break
      }
      queue[minI] = undefined
      p = minP
    }
    p = {x: (map[0].length - 1), y: (map.length - 1)}
    const risk = safestPathRisk.get(map[p.x][p.y])

    const print = () => {
      let out = ''
      map.forEach((r) => {r.forEach((p) => {
        out += safestPathRisk.get(p).toString().padStart(9, ' ')
      });out+='\n'})
      return out
    }

    return risk
  }
  return dijkstra()

}
