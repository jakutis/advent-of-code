const parse = (lines) => {
  let [x, y] = lines[0].split(': ')[1].split(', ')
  x = x.slice(2).split('..').map(Number)
  y = y.slice(2).split('..').map(Number)
  return {x,y}
}

const inr = (v, r) => r[0] <= v && v <= r[1]

exports.part1 = (lines, log) => {
  log(lines)
  const {x,y} = parse(lines)
  const simulateFromStart = (v) => {
    //log('simulateFromStart ' + [v.x, v.y])
    let p = {x: 0, y: 0}
    let h = 0
    while (true) {
      if (p.y < y[0]) {
        //log(p)
        //log('missed (' + x + ') (' + y + ')')
        break
      }
      //log([h, p, v])
      if (p.y > h) {
        h = p.y
      }
      if (inr(p.x, x) && inr(p.y, y)) {
        return h;
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
  }
  //const a = {x:6,y:9}
  let max = 0
  for (let x = 0; x < 70; x++) {
    for (let y = 0; y < 200; y++) {
      const h = simulateFromStart({x,y})
      if (h) {
        if (h > max) {
          //log('update ' + h)
          max = h
        }
      }
    }
  }
  return max
}

exports.part2 = (lines, log) => {
  log(lines)
  const {x,y} = parse(lines)
  const simulateFromStart = (v) => {
    //log('simulateFromStart ' + [v.x, v.y])
    let p = {x: 0, y: 0}
    while (true) {
      if (p.y < y[0]) {
        return false
      }
      //log([h, p, v])
      if (inr(p.x, x) && inr(p.y, y)) {
        return true
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
  }
  let vs = 0
  for (let x = -1000; x < 1000; x++) {
    for (let y = -1000; y < 1000; y++) {
      log(x + ',' + y)
      const canreach = simulateFromStart({x,y})
      if (canreach) {
        log([x,y])
        vs++
      }
    }
  }
  return vs
}
