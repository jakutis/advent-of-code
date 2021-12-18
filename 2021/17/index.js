const parse = (lines) => {
  let [xRange, yRange] = lines[0].split(': ')[1].split(', ')
  return {
    xRange: xRange.slice(2).split('..').map(Number),
    yRange: yRange.slice(2).split('..').map(Number)
  }
}

const getHighestAltitude = ({x, y}, {xRange, yRange}, {vx, vy}) => {
  let h = 0
  while (y >= yRange[0]) {
    if (y > h) {
      h = y
    }
    if (xRange[0] <= x && x <= xRange[1] && yRange[0] <= y && y <= yRange[1]) {
      return h;
    }
    x += vx
    y += vy
    vx = vx > 0 ? (vx - 1) : vx < 0 ? (vx + 1) : 0,
    vy -= 1
  }
}

const foreachTrajectory = (start, targetArea, f) => {
  targetArea = parse(targetArea)
  const [minVx, minVy] = [1, targetArea.yRange[0]]
  const [maxVx, maxVy] = [targetArea.xRange[1], -1 * (targetArea.yRange[0])]
  for (let vx = minVx; vx <= maxVx; vx++) {
    for (let vy = minVy; vy <= maxVy; vy++) {
      const h = getHighestAltitude(start, targetArea, {vx, vy})
      if (h !== undefined) {
        f(h)
      }
    }
  }
}

exports.part1 = (targetArea) => {
  let max = 0
  foreachTrajectory({x: 0, y: 0}, targetArea, h => max = h > max ? h : max)
  return max
}

exports.part2 = (targetArea) => {
  let acceptableVelocities = 0
  foreachTrajectory({x: 0, y: 0}, targetArea, () => acceptableVelocities++)
  return acceptableVelocities
}
