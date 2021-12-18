    /*
  const risks = {}
  const lowest1 = (from, to, risk, visited) => {
    const key = getKey(map, to)
    if (risks[key]) {
      return risks[key]
    }
    visited = visited.concat(key)
    if (to.x === from.x && to.y === from.y) {
      risks[key] = [0, visited]
    } else {
      let min
      [
        {x: to.x, y: to.y - 1},
        {x: to.x, y: to.y + 1},
        {x: to.x - 1, y: to.y},
        {x: to.x + 1, y: to.y}
      ]
        .filter(to => !(to.x < 0 || to.y < 0 || to.x > (map[0].length - 1) || to.y > (map.length - 1)))
        .filter(to => !visited.includes(getKey(map, to)))
        .map(to => lowest1(from, to, risk, visited))
        .filter(l => l !== undefined)
        .forEach(l => {
          if (min === undefined || l[0] < min[0]) {
            min = l
          }
        })
      if (min === undefined) {
        visited.pop()
        return
      }

      risks[key] = [min[0] + map[to.y][to.x], min[1]]
    }
    return risks[key]
  }
  const lowest = (p, to, risk, path) => {
    const key = p.x + ',' + p.y
    if (risks[key]) {
      return risks[key]
    }
    path = path.concat(key)
    risk += map[p.y][p.x]

    if (p.x === to.x && p.y === to.y) {
      risks[key] = [risk, path]
    } else {
      let min
      [
        {x: p.x, y: p.y - 1},
        {x: p.x, y: p.y + 1},
        {x: p.x - 1, y: p.y},
        {x: p.x + 1, y: p.y}
      ]
        .forEach(next => {
          if (next.x < 0 || next.y < 0 || next.x > (map[0].length - 1) || next.y > (map.length - 1)) {
            return
          }
          if (path.includes(next.x + ',' + next.y)) {
            return
          }
          const r = lowest(next, to, risk, path)
          if (r === undefined) {
            return
          }
          if (r < min) {
            min = r
          }
        })
      if (min === undefined) {
        return
      }
      risks[key] = min
    }
    return risks[key]
  }
  const to = {x: map[0].length - 1, y: map.length - 1}
  const lowestRisk = (p, path) => {
    const key = p.x + ',' + p.y
    if (risks[key]) {
      return risks[key]
    }
    path = path.concat(key)
    if (p.x === 0 && p.y === 0) {
      risks[key] = [0, path]
    } else {
      let min
      [
        {x: p.x, y: p.y - 1},
        {x: p.x, y: p.y + 1},
        {x: p.x - 1, y: p.y},
        {x: p.x + 1, y: p.y}
      ]
        .forEach(previous => {
          if (previous.x < 0 || previous.y < 0 || previous.x > (map[0].length - 1) || previous.y > (map.length - 1)) {
            return
          }
          if (path.includes(previous.x + ',' + previous.y)) {
            return
          }
          const r = lowestRisk(previous, path)
          if (r === undefined) {
            return
          }
          if (min === undefined || r[0] < min[0]) {
            min = r
          }
        })
      if (min === undefined) {
        return
      }
      risks[key] = [min[0] + map[p.y][p.x], path]
    }
    return risks[key]
  }
*/














  /*
    const print = () => {
      let out = ''
      map.forEach((r) => {r.forEach((p) => {
        out += safestPathRisk.get(p).toString().padStart(9, ' ')
      });out+='\n'})
      return out
    }

  const printMap = () => {
    let out = ''
    map.forEach((r) => {r.forEach((p) => {
      out += p.risk.toString().padStart(2, ' ') + (p.x % omap[0].length === omap[0].length - 1 ? '   ' : '')
    });out+='\n'})
    return out
  }
  //log(printMap())


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
*/


