    /*
  const simulateFromEnd = (p, v) => {
    const ps = []
    while (true) {
      log(p)
      ps.push(p)
      if (p.x < 0) {
        break
      }
      p = {
        x: p.x + v.x,
        y: p.y + v.y
      }
      v = {
        x: v.x > 0 ? (v.x - 1) : v.x < 0 ? (v.x + 1) : 0,
        y: v.y - 1
      }
    }
    return ps
  }
  const tr = simulateFromEnd({x:21,y:-10}, {x: 0, y: -11})
  simulateFromEnd(
  return
  const tr = simulateFromStart({x:0,y:0}, {x: 6, y: 9})
  const touchpoint = tr => tr.find(p => inr(p.x, x) && inr(p.y, y))

  const maxY = Math.max.apply(Math, tr.map(({y}) => y))
  const tp = touchpoint(tr)
  log(['in', tp])

  const velocity = {}
  let minSteps = 1
  {
    let x = tp.x
    let v = 1
    while (true) {
      minSteps++
      //log([x, v])
      x -= v
      if (x <= 0) {
        break
      }
      v += 1
    }
    if (x === 0) {
      log('start x velocity ' + v)
    } else {
      log('start x velocity not found')
    }
  }
  log('steps ' + minSteps)
  {
    const find = (v) => {
      log('try ' + v)
      let steps = 1
      let y = tp.y
      while (true) {
        steps++
        log([y, v])
        y -= v
        if (y <= 0 && steps >= minSteps) {
          break
        }
        v += 1
      }
      return v
    }
    for (let v = y[0]; ; v++) {
      const fv = find(v)
      if (fv !== undefined) {
        return fv
      }
    }
  }
  return maxY
    */

