const cmp = (a, b) => {
  const x = a[0] - b[0]
  const y = a[1] - b[1]
  const z = a[2] - b[2]
  return !x ? (!y ? z : y) : x
}

const vmap = `N 1,2,3
E -2,1,3
S -1,-2,3
W 2,-1,3
N 1,-2,-3
E -2,-1,-3
S -1,2,-3
W 2,1,-3
N 1,-3,2
E 3,1,2
S -1,3,2
W -3,-1,2
N 1,3,-2
E -3,1,-2
S -1,-3,-2
W 3,-1,-2
N -3,2,1
E -2,-3,1
S 3,-2,1
W 2,3,1
N 3,2,-1
E -3,-2,-1
S 2,-3,-1
W -2,3,-1`.split('\n').map(s => s.slice(2)).map(s => s.split(',').map(Number)).map((map, o) => {
  const [x, y, z] = map
  const maps = []
  const l = ['x', 'y', 'z']
  if (x < 0) {
    maps.push({
      sign: -1,
      from: (-x) - 1,
      to: 0,
    })
  } else {
    maps.push({
      sign: 1,
      from: (x) - 1,
      to: 0
    })
  }
  if (y < 0) {
    maps.push({
      sign: -1,
      from: (-y) - 1,
      to: 1
    })
  } else {
    maps.push({
      sign: 1,
      from: (y) - 1,
      to: 1
    })
  }
  if (z < 0) {
    maps.push({
      sign: -1,
      from: (-z) - 1,
      to: 2
    })
  } else {
    maps.push({
      sign: 1,
      from: (z) - 1,
      to: 2
    })
  }
  const a = []
  maps.forEach(m => {
    a.push(m.sign * (m.from + 1))
  })
  //console.log(String(a) === String(map))

  const forward = (p) => {
      /*
    const np = {o}
    if (x < 0) {
      np.x = -p[(-x) - 1]
    } else {
      np.x = p[(x) - 1]
    }
    if (y < 0) {
      np.y = -p[(-y) - 1]
    } else {
      np.y = p[(y) - 1]
    }
    if (z < 0) {
      np.z = -p[(-z) - 1]
    } else {
      np.z = p[(z) - 1]
    }
    return np
    */
    //  /*
    const np = {o}
    maps.forEach(m => {
      np[l[m.to]] = {
        v: m.sign * p[m.from],
        m
      }
    })
    return np
    //*/
  }
  const forwarda = (p) => {
    const np = []
    maps.forEach(m => {
      np[m.to] = m.sign * p[m.from]
    })
    return np
  }
  const backward = (p) => {
    const np = []
    maps.forEach(m => {
      np[m.from] = m.sign * p[m.to]
    })
    return np
  }
  return {forward, backward, forwarda, maps}
})
const read = (lines) => {
  const scanners = []
  let beacons
  lines.forEach(l => {
    if (l.startsWith('---')) {
      if (beacons !== undefined) {
        scanners.push(beacons)
      }
      beacons = []
    } else {
      const [x, y, z] = l.split(',').map(Number)
      beacons.push([x, y, z])
    }
  })
  scanners.push(beacons)
  return scanners
}
// how much to add to a to get b
const getOffset = (a, b) => {
  return [b[0] - a[0], b[1] - a[1], b[2] - a[2]]
}
const fillOverlapping = (log, beaconsA, beaconsB, a, b, g) => {
  const o = {}
  beaconsA.forEach(beaconA => {
    beaconsB.forEach(beaconB => {
      vmap.map(m => m.forward(beaconA)).forEach(beaconAVariant => {
        const beaconAOrientation = beaconAVariant.o
        const beaconAMap = [beaconAVariant.x.m,beaconAVariant.y.m,beaconAVariant.z.m]
        beaconAVariant = [beaconAVariant.x.v,beaconAVariant.y.v,beaconAVariant.z.v]
        vmap.map(m => m.forward(beaconB)).forEach(beaconBVariant => {
          const beaconBOrientation = beaconBVariant.o
          const beaconBMap = [beaconBVariant.x.m,beaconBVariant.y.m,beaconBVariant.z.m]
          beaconBVariant = [beaconBVariant.x.v,beaconBVariant.y.v,beaconBVariant.z.v]

          const orientation = beaconAOrientation + '-' + beaconBOrientation
          const offset = getOffset(beaconAVariant, beaconBVariant).join(',')
          o[orientation] = o[orientation] || {}
          o[orientation][offset] = o[orientation][offset] || []
          o[orientation][offset].push({beaconA, beaconB, beaconAMap, beaconBMap, beaconAVariant, beaconBVariant})
        })
      })
    })
  })
  Object.keys(o).forEach(orientation => {
    const [ beaconAOrientation, beaconBOrientation ] = orientation.split('-').map(Number)
    Object.keys(o[orientation]).forEach(offset => {
      if (o[orientation][offset].length >= 12) {
        offset = offset.split(',').map(Number)
        if (!g[a]) {
          g[a] = []
        }
        if (!g[a][b]) {
          g[a][b] = []
        }
        if (!g[a][b][beaconAOrientation]) {
          g[a][b][beaconAOrientation] = []
        }

        g[a][b][beaconAOrientation][beaconBOrientation] = {
          commonBeacons: o[orientation][offset],
          offset,
        }
      }
    })
  })
}

exports.part1 = (lines, log, test) => {
  const scanners = read(lines)
  //getOverlapping(log, scanners[1], scanners[2])
  //return
  let g
  //const cache = 'g'
  const cache = 'input'
  if (!require('fs').existsSync('/home/jakutis/' + cache)) {
    g = []
    for (let i = 0; i < scanners.length; i++) {
      log(new Date())
      for (let j = 0; j < scanners.length; j++) {
        if (i === j) {
          continue
        }
        log(i + ',' + j)
        fillOverlapping(log, scanners[i], scanners[j], i, j, g)
      }
    }
    require('fs').writeFileSync('/home/jakutis/' + cache, JSON.stringify(g))
  } else {
    g = JSON.parse(require('fs').readFileSync('/home/jakutis/' + cache))
  }
  const sum = (a, b) => {
    return a.map((_, i) => a[i] + b[i])
  }
  const difference = (a, b) => {
    return a.map((_, i) => a[i] - b[i])
  }
  const findPath = (location, destination, path) => {
    path = path.concat(location)
    if (location === destination) {
      return path
    }
    for (let j = 0; j < scanners.length; j++) {
      if (location === j || !g[location] || !g[location][j]) {
        continue
      }
      if (path.includes(j)) {
        continue
      }
      const p = findPath(j, destination, path)
      if (p) {
        return p
      }
    }
  }
  const uniqueBeacons = new Set()
  const offsets = []
  scanners.forEach((scanner, i) => {
    const path = findPath(0, i, [])
    const tPath = []
    let previousScanner = path.shift()
    let previousOrientation = 0
    log('--------------------------------------------------')
    //log({i,path})
    path.forEach(currentScanner => {
      const currentOrientation = g[previousScanner][currentScanner][previousOrientation].findIndex(Boolean)
      const {
        offset: o,
      } = g[previousScanner][currentScanner][previousOrientation][currentOrientation]
      tPath.push({
        scanner: currentScanner,
        offset: [-o[0], -o[1], -o[2]],
        orientation: currentOrientation
      })
      previousScanner = currentScanner
      previousOrientation = currentOrientation
    })

    let offset = [0, 0, 0]
    tPath.forEach(({offset: o}) => {
      offset = sum(offset, o)
    })
    offsets.push(offset)

    if (i === 0) {
      scanner.forEach(have => {
        uniqueBeacons.add(String(have))
      })
    } else {
      scanner.forEach(beacon => {
        const {orientation: orientationOfS4ToMatchS1} = tPath[tPath.length - 1]
        const beaconRelativeToS1_ = vmap[orientationOfS4ToMatchS1].forwarda(beacon)
        const have = sum(offset, beaconRelativeToS1_)
        uniqueBeacons.add(String(have))
      })
    }
    log({offset, tPath})
    if (i === 40) {
      // 0 1 4
      const {commonBeacons} = g[1][4][6][17]
      const bs = commonBeacons.map(c => c.beaconB)
      log({bs})// beacons from scanner 4

      //const beaconRelativeToS4 = bs[0]
      bs.forEach(beaconRelativeToS4 => {
        //const {offset: offsetOfS1RelativeToS0, orientation: orientationOfS1ToMatchS0, scanner: a} = tPath[0]
        const {offset: offsetOfS4RelativeToS1, orientation: orientationOfS4ToMatchS1, scanner: b} = tPath[1]
        const beaconRelativeToS1_ = vmap[orientationOfS4ToMatchS1].forwarda(beaconRelativeToS4)
        //const beaconRelativeToS0_ = vmap[orientationOfS1ToMatchS0].forwarda(beaconRelativeToS1_)
        const have = sum(offset, beaconRelativeToS1_)
        /* 
        const need = [-447,-329,318]
        *  "beaconRelativeToS0": [ -447, -1937,    318  ],
        */
        log(String(have))
        //log({have, need, offset, beaconRelativeToS4, beaconRelativeToS1_, beaconRelativeToS0_, offsetOfS1RelativeToS0, offsetOfS4RelativeToS1, orientationOfS1ToMatchS0, orientationOfS4ToMatchS1})
      })

      throw 1
      const restored = bs
        .map(p => {
          tPath.slice(0).reverse().forEach(({offset, orientation}) => {
            log({orientation, maps: vmap[orientation].maps})
            p = sum(vmap[orientation].forwarda(p), offset)
          })
          return p
        })
        .sort(cmp).map(String)
      log({restored})
      throw 1
    }
    if (i === 400) {// CLOSE!
      // 0 1 4
      const {commonBeacons} = g[1][4][6][17]
      const bs = commonBeacons.map(c => c.beaconB).slice(0, 1)
      log({bs})// beacons from scanner 4

      const beaconRelativeToS4 = bs[0]
      const {offset: offsetOfS1RelativeToS0, orientation: orientationOfS1ToMatchS0, scanner: a} = tPath[0]
      log(a)
      const {offset: offsetOfS4RelativeToS1, orientation: orientationOfS4ToMatchS1, scanner: b} = tPath[1]
      log(b)
      const beaconRelativeToS1_ = vmap[orientationOfS4ToMatchS1].forwarda(beaconRelativeToS4)
      const beaconRelativeToS0_ = vmap[orientationOfS1ToMatchS0].forwarda(beaconRelativeToS1_)
      const beaconRelativeToS0 = difference(beaconRelativeToS0_, offset)
      log({beaconRelativeToS4, beaconRelativeToS0, offsetOfS1RelativeToS0, offsetOfS4RelativeToS1, orientationOfS1ToMatchS0, orientationOfS4ToMatchS1})

      throw 1
      const restored = bs
        .map(p => {
          tPath.slice(0).reverse().forEach(({offset, orientation}) => {
            log({orientation, maps: vmap[orientation].maps})
            p = sum(vmap[orientation].forwarda(p), offset)
          })
          return p
        })
        .sort(cmp).map(String)
      log({restored})
      throw 1
    }
    if (i === 100) {
      // 0 1
      const {commonBeacons} = g[0][1][0][6]
      const bs = commonBeacons.map(c => c.beaconB).slice(0, 1)
      log({bs})// beacons from scanner 4

      const beaconRelativeToS1 = bs[0]
      const {offset: offsetOfS1RelativeToS0, orientation: orientationOfS1ToMatchS0} = tPath[0]
      const beaconRelativeToS0 = sum(vmap[orientationOfS1ToMatchS0].forwarda(beaconRelativeToS1), offsetOfS1RelativeToS0)
      log({beaconRelativeToS0, beaconRelativeToS1, offsetOfS1RelativeToS0})

      throw 1
      const restored = bs
        .map(p => {
          tPath.slice(0).reverse().forEach(({offset, orientation}) => {
            log({orientation, maps: vmap[orientation].maps})
            p = sum(vmap[orientation].forwarda(p), offset)
          })
          return p
        })
        .sort(cmp).map(String)
      log({restored})
      throw 1
    }
    if (i === 400) {
      // 0 1 4
      const {commonBeacons} = g[1][4][6][17]
      const bs = commonBeacons.map(c => c.beaconB).slice(0, 1)
      log({bs})// beacons from scanner 4

      const beaconRelativeToS4 = bs[0]
      //const {offset: offsetOfS1RelativeToS0, orientation: orientationOfS1ToMatchS0} = tPath[0]
      const {offset: offsetOfS4RelativeToS1, orientation: orientationOfS4ToMatchS1} = tPath[1]
      //const beaconRelativeToS0 = sum(vmap[orientationOfS1ToMatchS0].forwarda(beaconRelativeToS1), offsetOfS1RelativeToS0)
      const beaconRelativeToS1 = sum(vmap[orientationOfS4ToMatchS1].forwarda(beaconRelativeToS4), offsetOfS4RelativeToS1)
      log({beaconRelativeToS1, beaconRelativeToS4, offsetOfS4RelativeToS1})

      throw 1
      const restored = bs
        .map(p => {
          tPath.slice(0).reverse().forEach(({offset, orientation}) => {
            log({orientation, maps: vmap[orientation].maps})
            p = sum(vmap[orientation].forwarda(p), offset)
          })
          return p
        })
        .sort(cmp).map(String)
      log({restored})
      throw 1
    }
    if (i === 100) {
      const {commonBeacons} = g[0][1][0][6]
      const c = commonBeacons.map(c => c.beaconB).sort(cmp).map(String)
      const e = commonBeacons.map(c => c.beaconA).sort(cmp).map(String)

      const restored = commonBeacons.map(c => c.beaconB)
        .map(p => {
          tPath.forEach(({offset, orientation}) => {
            p = difference(vmap[orientation].forwarda(p), offset)
          })
          return p
        })
        .sort(cmp).map(String)
      log({c, e, restored})
      throw 1
    }
    if (i === 100) {
      const {commonBeacons} = g[0][1][0][6]
      const c = commonBeacons.map(c => c.beaconB).sort(cmp).map(String)
      const e = commonBeacons.map(c => c.beaconA).sort(cmp).map(String)

      const restored = commonBeacons.map(c => c.beaconBVariant).map(b => difference(b, offset)).sort(cmp).map(String)
      log({transformations, c, e, restored})
      throw 1
    }
    if (i === 999) {
      const {commonBeacons} = g[1][4][6][17]
      const c = commonBeacons.map(a => a.beaconB).map(p => {
        transformations.slice().reverse().forEach(t => {
          p = vmap[t.to].backward(p)
        })
        return p.join(',')
      })
      log(c)
      throw 1
    }
    return tPath
  })
  const u = Array.from(uniqueBeacons)
  log(u.map(a => a.split(',')).sort(cmp).map(String).join('\n'))
  log(u.length)
  log(offsets)
  const distance = (a, b) => {
    return difference(a, b).map(Math.abs).reduce((d, v) => d + v)
  }
  let max
  for (let i = 0; i < scanners.length; i++) {
    for (let j = 0; j < scanners.length; j++) {
      const d = distance(offsets[i], offsets[j])
      log(d)
      if (!max || max < d) {
        max = d
      }
    }
  }
  log({max})
  //log(distance([1105,-1205,1229], [-92,-2380,-20]))
  //log({offsets})
  return

  for (let i = 0; i < scanners.length; i++) {
    for (let j = 0; j < scanners.length; j++) {
      if (i === j || !g[i] || !g[i][j]) {
        continue
      }
      log(i + ' -> ' + j)
      g[i][j].forEach(({beaconAOrientation, beaconBOrientation}) => {
        log([beaconAOrientation, beaconBOrientation].join(','))
      })
    }
  }
  log('ok')
    /*
        if (overlapping) {

        const {beaconA, beaconB, beaconAMap, beaconBMap, beaconAVariant, beaconBVariant} = a[orientation][offset][0]
        //offset = getOffset(beaconAVariant, beaconBVariant)
        let orientedOffset = [vmap[beaconBOrientation].backward(offset), JSON.stringify(beaconAMap), JSON.stringify(beaconBMap)];
        //vmap[23].backward(offset),
        //(getOffset((beaconA), vmap[orientation].forwarda(beaconB)))//vmap[orientation].backward(offset)
        overlapping = {
          beacons: a[orientation][offset],
          a: a[beaconAOrientation +'-'+ beaconBOrientation],
          offset,
          orientedOffset,
          orientation
        }





          log(i +' -> ' +j)
          if (!g[i]) {
            g[i] = []
          }
          g[i][j] = overlapping
          if (!g[j]) {
            g[j] = []
          }
          g[j][i] = overlapping
          log([overlapping.orientation, ' overlap', overlapping.offset.join(','), '     ', overlapping.orientedOffset.join(',')].join(' '))
          log('')
        }
        */

    /*
  a.sort(cmp)
  b.sort(cmp)
  log(a.map(([x,y,z])=>x+','+y+','+z))
  log(b.map(([x,y,z])=>x+','+y+','+z))
  log(JSON.stringify(a) === JSON.stringify(b))
  */
  return 79
}

exports.part2 = (lines, log) => {
}
