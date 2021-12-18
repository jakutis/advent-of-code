const countDots = (paper, max) => paper
  .map(r => r.filter((_, x) => x <= max.x).filter(Boolean).length)
  .slice(0, max.y + 1)
  .filter(Boolean)
  .reduce((sum, n) => sum + n)

const paperToString = (paper, max) => {
  let out = ''
  for (let y = 0; y <= max.y; y++) {
    for (let x = 0; x <= max.x; x++) {
      out += paper[y] && paper[y][x] ? '#' : '.'
    }
    out += '\n'
  }
  return out
}

const fold = (paper, fold, {x: maxX, y: maxY}) => {
  if (fold.x !== undefined) {
    for (let y = 0; y <= maxY; y++) {
      for (let x = 0; x < fold.x; x++) {
        let mx = maxX - x
        if (!paper[y]) {
          paper[y] = []
        }
        paper[y][x] = paper[y][x] || paper[y][mx]
      }
    }
    return {
      y: maxY,
      x: fold.x - 1
    }
  } else {
    for (let y = 0; y < fold.y; y++) {
      for (let x = 0; x <= maxX; x++) {
        let my = maxY - y
        if (!paper[my]) {
          paper[my] = []
        }
        if (!paper[y]) {
          paper[y] = []
        }
        paper[y][x] = paper[y][x] || paper[my][x]
      }
    }
    return {
      x: maxX,
      y: fold.y - 1
    }
  }
}

const solve = (lines, limit) => {
  const paper = []
  const folds = []
  lines.forEach(l => {
    if (l[0] === 'f') {
      const [line, n] = l.split('=')
      if (line.endsWith('x')) {
        folds.push({x:Number(n)})
      } else {
        folds.push({y:Number(n)})
      }
    } else {
      const [x, y] = l.split(',').map(Number)
      if (!paper[y]) {
        paper[y] = []
      }
      paper[y][x] = true
    }
  })

  let max = {
    x: Math.max.apply(Math, paper.map(r => r.length).filter(Boolean)) - 1,
    y: paper.length - 1
  }
  limit = limit || folds.length
  for (let i = 0; i < limit; i++) {
    max = fold(paper, folds[i], max)
  }
  return {paper, max}
}

exports.part1 = (lines) => {
  const {paper, max} = solve(lines, 1)
  return countDots(paper, max) 
}

exports.part2 = (lines) => {
  const {paper, max} = solve(lines)
  return paperToString(paper, max)
}
