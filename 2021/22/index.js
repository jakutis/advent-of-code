exports.part1 = (lines, log) => {
  const offset = 50
  const parse = (lines) => {
    return lines.map(line => {
      let [state, range] = line.split(' ')
      range = range
        .split(',')
        .map(r => r.slice(2).split('..').map(Number))
        .filter(x => !(x[0] < -offset && x[1] < -offset) && !(x[0] > offset && x[1] > offset))
      if (range.length < 3) {
        return
      }
      return {
        on: state === 'on',
        range: range.map(r => r.map(n => Math.max(Math.min(n + offset, 100), 0)))
      }
    }).filter(Boolean)
  }
  const reactor = []
  parse(lines).forEach(({range, on}) => {
    for (let x = range[0][0]; x <= range[0][1]; x++) {
      for (let y = range[1][0]; y <= range[1][1]; y++) {
        for (let z = range[2][0]; z <= range[2][1]; z++) {
          if (!reactor[z]) {
            reactor[z] = []
          }
          if (!reactor[z][y]) {
            reactor[z][y] = []
          }
          reactor[z][y][x] = on
        }
      }
    }
  })
  let on = 0;
  for (let x = 0; x <= offset * 2; x++) {
    for (let y = 0; y <= offset * 2; y++) {
      for (let z = 0; z <= offset * 2; z++) {
        if (reactor[z] && reactor[z][y] && reactor[z][y][x]) {
          on++
        }
      }
    }
  }
  return on
}

exports.part2brute = (lines, log) => {
  let minX, minY, minZ, maxX, maxY, maxZ
  const parse = (lines) => {
    return lines.map(line => {
      let [state, range] = line.split(' ')
      range = range
        .split(',')
        .map(r => r.slice(2).split('..').map(Number))
      if (minX === undefined) {
        minX = range[0][0]
        maxX = range[0][1]
        minY = range[1][0]
        maxY = range[1][1]
        minZ = range[2][0]
        maxZ = range[2][1]
      } else {
        minX = Math.min(minX, range[0][0])
        maxX = Math.max(maxX, range[0][1])
        minY = Math.min(minY, range[1][0])
        maxY = Math.max(maxY, range[1][1])
        minZ = Math.min(minZ, range[2][0])
        maxZ = Math.max(maxZ, range[2][1])
      }
      return {
        on: state === 'on',
        range,
      }
    }).filter(Boolean)
  }
  const reactor = []
  const ranges = parse(lines)
  log([minX, minY, minZ, maxX, maxY, maxZ])
  ranges.forEach(({range, on}) => {
    for (let x = range[0][0]; x <= range[0][1]; x++) {
      for (let y = range[1][0]; y <= range[1][1]; y++) {
        for (let z = range[2][0]; z <= range[2][1]; z++) {
          if (!reactor[z - minZ]) {
            reactor[z - minZ] = []
          }
          if (!reactor[z - minZ][y - minY]) {
            reactor[z - minZ][y - minY] = []
          }
          reactor[z - minZ][y - minY][x - minX] = on
        }
      }
    }
  })
  let on = 0;
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        if (reactor[z - minZ] && reactor[z - minZ][y - minY] && reactor[z - minZ][y - minY][x - minX]) {
          on++
        }
      }
    }
  }
  return on

}


exports.part2brute2 = (lines, log) => {
  let minX, minY, minZ, maxX, maxY, maxZ
  const parse = (lines) => {
    return lines.map(line => {
      let [state, range] = line.split(' ')
      range = range
        .split(',')
        .map(r => r.slice(2).split('..').map(Number))
      if (minX === undefined) {
        minX = range[0][0]
        maxX = range[0][1]
        minY = range[1][0]
        maxY = range[1][1]
        minZ = range[2][0]
        maxZ = range[2][1]
      } else {
        minX = Math.min(minX, range[0][0])
        maxX = Math.max(maxX, range[0][1])
        minY = Math.min(minY, range[1][0])
        maxY = Math.max(maxY, range[1][1])
        minZ = Math.min(minZ, range[2][0])
        maxZ = Math.max(maxZ, range[2][1])
      }
      return {
        on: state === 'on',
        range,
      }
    }).filter(Boolean)
  }
  const ranges = parse(lines)
  let on = 0;
  let rn = ranges.length
  let r
  for (let x = minX; x <= maxX; x++) {
    log(x)
    for (let y = minY; y <= maxY; y++) {
      log([x,y])
      for (let z = minZ; z <= maxZ; z++) {
        for (let i = rn - 1; i >= 0; i--) {
          r = ranges[i]
          if (r.range[0][0] <= x && r.range[0][1] >= x) {
            if (r.range[1][0] <= y && r.range[1][1] >= y) {
              if (r.range[2][0] <= z && r.range[2][1] >= z) {
                if (r.on) {
                  on++
                  break
                }
              }
            }
          }
        }
      }
    }
  }
  return on
}

exports.part2 = (lines, log, test) => {
  const parse = (lines) => {
    return lines.map(line => {
      let [state, range] = line.split(' ')
      range = range
        .split(',')
        .map(r => r.slice(2).split('..').map(Number))
      return {
        on: state === 'on',
        range,
      }
    }).filter(Boolean)
  }
  const out = (r1, r2) => (r1[0] < r2[0] && r1[1] < r2[0]) || (r1[0] > r2[1] && r1[1] > r2[1])
  const inside = (r1, r2) => r2[0] <= r1[0] && r1[1] <= r2[1]
  const diffNotCollided = (r1, r2) => r1[0] < r2[0] ? [r1[0], r2[0] - 1] : [r2[1] + 1, r1[1]]
  const diffCollided = (r1, r2) => r1[0] < r2[0] ? [r2[0], r1[1]] : [r1[0], r2[1]]
  const getSplit = ([r1, r2]) => {
    if (out(r1[0], r2[0]) || out(r1[1], r2[1]) || out(r1[2], r2[2])) {
      return []
    }
    if (inside(r1[0], r2[0]) && inside(r1[1], r2[1]) && inside(r1[2], r2[2])) {
      return []
    }
    if (!inside(r1[0], r2[0])) {
      const notCollided = [
        diffNotCollided(r1[0], r2[0]),
        r1[1],
        r1[2],
      ]
      const collided = [
        diffCollided(r1[0], r2[0]),
        r1[1],
        r1[2],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    if (!inside(r1[1], r2[1])) {
      const notCollided = [
        r1[0],
        diffNotCollided(r1[1], r2[1]),
        r1[2],
      ]
      const collided = [
        r1[0],
        diffCollided(r1[1], r2[1]),
        r1[2],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    if (!inside(r1[2], r2[2])) {
      const notCollided = [
        r1[0],
        r1[1],
        diffNotCollided(r1[2], r2[2]),
      ]
      const collided = [
        r1[0],
        r1[1],
        diffCollided(r1[2], r2[2]),
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    throw 'ooops'

    if (inside(r1[0], r2[0]) && !inside(r1[1], r2[1]) && inside(r1[2], r2[2])) {
      return [[
          r1[0],
          r1[1][0] < r2[1][0] ? [r1[1][0], r2[1][0] - 1] : [r2[1][1] + 1, r1[1][1]],
          r1[2],
        ]]
    }
    if (inside(r1[0], r2[0]) && inside(r1[1], r2[1]) && !inside(r1[2], r2[2])) {
      return [[
          r1[0],
          r1[1],
          r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
        ]]
    }
    if (inside(r1[0], r2[0]) && !inside(r1[1], r2[1]) && !inside(r1[2], r2[2])) {
      const notCollided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
      ]
      const collided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r2[2][0], r1[2][1]] : [r1[2][0], r2[2][1]],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    if (!inside(r1[0], r2[0]) && inside(r1[1], r2[1]) && !inside(r1[2], r2[2])) {
      const notCollided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
      ]
      const collided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r2[2][0], r1[2][1]] : [r1[2][0], r2[2][1]],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    if (!inside(r1[0], r2[0]) && !inside(r1[1], r2[1]) && inside(r1[2], r2[2])) {
      const notCollided = [
        r1[0][0] < r2[0][0] ? [r1[0][0], r2[0][0] - 1] : [r2[0][1] + 1, r1[0][1]],
        r1[1],
        r1[2],
      ]
      const collided = [
        r1[0][0] < r2[0][0] ? [r2[0][0], r1[1][0]] : [r1[0][0], r2[0][1]],
        r1[1],
        r1[2],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    if (!inside(r1[0], r2[0]) && !inside(r1[1], r2[1]) && !inside(r1[2], r2[2])) {
      const notCollided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
      ]
      const collided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r2[2][0], r1[2][1]] : [r1[2][0], r2[2][1]],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    throw 'oh no 1'







    if (inside(r1[0], r2[0])) {
      const notCollided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
      ]
      const collided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r2[2][0], r1[2][1]] : [r1[2][0], r2[2][1]],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    else {
      const notCollided = [
        r1[0][0] < r2[0][0] ? [r1[0][0], r2[0][0] - 1] : [r2[0][1] + 1, r1[0][1]],
        r1[1],
        r1[2],
      ]
      const collided = [
        r1[0][0] < r2[0][0] ? [r2[0][0], r1[1][0]] : [r1[0][0], r2[0][1]],
        r1[1],
        r1[2],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    throw 3


    if (inside(r1[0], r2[0]) && !inside(r1[1], r2[1]) && !inside(r1[2], r2[2])) {
      const notCollided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
      ]
      const collided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r2[2][0], r1[2][1]] : [r1[2][0], r2[2][1]],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
      /*
    if (inside(r1[0], r2[0]) && !inside(r1[1], r2[1]) && !inside(r1[2], r2[2])) {
      return [
        [
          r1[0],
          r1[1][0] < r2[1][0] ? [r1[1][0], r2[1][0] - 1] : [r2[1][1] + 1, r1[1][1]],
          r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
        ],
        [
          r1[0],
          r1[1][0] < r2[1][0] ? [r1[1][0], r2[1][0] - 1] : [r2[1][1] + 1, r1[1][1]],
          r1[2][0] < r2[2][0] ? [r2[2][0], r1[2][1]] : [r1[2][0], r2[2][1]],
        ],
        [
          r1[0],
          r1[1][0] < r2[1][0] ? [r2[1][0], r1[1][1]] : [r1[1][0], r2[1][1]],
          r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
        ],
      ]
    }
    */
    if (!inside(r1[0], r2[0]) && inside(r1[1], r2[1]) && !inside(r1[2], r2[2])) {
      const notCollided = [
        r1[0][0] < r2[0][0] ? [r1[0][0], r2[0][0] - 1] : [r2[0][1] + 1, r1[0][1]],
        r1[1],
        r1[2],
      ]
      const collided = [
        r1[0][0] < r2[0][0] ? [r2[0][0], r1[1][0]] : [r1[0][0], r2[0][1]],
        r1[1],
        r1[2],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
      /*
    if (!inside(r1[0], r2[0]) && inside(r1[1], r2[1]) && !inside(r1[2], r2[2])) {
      return [
        [
          r1[0][0] < r2[0][0] ? [r1[0][0], r2[0][0] - 1] : [r2[0][1] + 1, r1[0][1]],
          r1[1],
          r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
        ],
        [
          r1[0][0] < r2[0][0] ? [r1[0][0], r2[0][0] - 1] : [r2[0][1] + 1, r1[0][1]],
          r1[1],
          r1[2][0] < r2[2][0] ? [r2[2][0], r1[2][1]] : [r1[2][0], r2[2][1]],
        ],
        [
          r1[0][0] < r2[0][0] ? [r2[0][0], r1[0][1]] : [r1[0][0], r2[0][1]],
          r1[1],
          r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
        ],
      ]
    }
    */
    if (!inside(r1[0], r2[0]) && !inside(r1[1], r2[1]) && inside(r1[2], r2[2])) {
      const notCollided = [
        r1[0][0] < r2[0][0] ? [r1[0][0], r2[0][0] - 1] : [r2[0][1] + 1, r1[0][1]],
        r1[1],
        r1[2],
      ]
      const collided = [
        r1[0][0] < r2[0][0] ? [r2[0][0], r1[1][0]] : [r1[0][0], r2[0][1]],
        r1[1],
        r1[2],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
      /*
    if (!inside(r1[0], r2[0]) && !inside(r1[1], r2[1]) && inside(r1[2], r2[2])) {
      return [
        [
          r1[0][0] < r2[0][0] ? [r1[0][0], r2[0][0] - 1] : [r2[0][1] + 1, r1[0][1]],
          r1[1][0] < r2[1][0] ? [r1[1][0], r2[1][0] - 1] : [r2[1][1] + 1, r1[1][1]],
          r1[2],
        ],
        [
          r1[0][0] < r2[0][0] ? [r2[0][0], r1[0][1]] : [r1[0][0], r2[0][1]],
          r1[1][0] < r2[1][0] ? [r1[1][0], r2[1][0] - 1] : [r2[1][1] + 1, r1[1][1]],
          r1[2],
        ],
        [
          r1[0][0] < r2[0][0] ? [r1[0][0], r2[0][0] - 1] : [r2[0][1] + 1, r1[0][1]],
          r1[1][0] < r2[1][0] ? [r2[1][0], r1[1][1]] : [r1[1][0], r2[1][1]],
          r1[2],
        ],
      ]
    }
    */
    if (!inside(r1[0], r2[0]) && !inside(r1[1], r2[1]) && !inside(r1[2], r2[2])) {
      const notCollided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r1[2][0], r2[2][0] - 1] : [r2[2][1] + 1, r1[2][1]],
      ]
      const collided = [
        r1[0],
        r1[1],
        r1[2][0] < r2[2][0] ? [r2[2][0], r1[2][1]] : [r1[2][0], r2[2][1]],
      ]
      return [notCollided, ...getSplit([collided, r2])]
    }
    throw 1
  }
  test = () => {}
  test([
    {
      id: 'outside',
      input: [
        [[0,0],[0,0],[0,0]],
        [[1,1],[1,1],[1,1]],
      ],
      output: undefined,
      calculate: getSplit
    },
    {
      id: 'match',
      input: [
        [[0,1],[0,1],[0,1]],
        [[0,1],[0,1],[0,1]],
      ],
      output: [],
      calculate: getSplit
    },
    {
      id: 'all inside',
      input: [
        [[1,2],[1,2],[1,2]],
        [[0,3],[0,3],[0,3]],
      ],
      output: [],
      calculate: getSplit
    },
    {
      id: 'some test 1',
      input: [
        [[1,2],[1,2],[1,2]],
        [[2,5],[0,3],[0,3]],
      ],
      output: [[[1,1],[1,2],[1,2]]],
      calculate: getSplit
    },
    {
      id: 'some test 2',
      input: [
        [[1,2],[1,2],[1,2]],
        [[0,3],[2,5],[0,3]],
      ],
      output: [[[1,2],[1,1],[1,2]]],
      calculate: getSplit
    },
    {
      id: 'some test 3',
      input: [
        [[1,2],[1,2],[1,2]],
        [[0,3],[0,3],[2,5]],
      ],
      output: [[[1,2],[1,2],[1,1]]],
      calculate: getSplit
    },
    {
      id: 'inside except z A',
      input: [
        [[5,7],[9,11],[0,4]],
        [[5,7],[9,11],[0,3]],
      ],
      output: [
        [[5,7],[9,11],[4,4]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except z A wider',
      input: [
        [[5,7],[9,11],[0,4]],
        [[4,8],[9,11],[0,3]],
      ],
      output: [
        [[5,7],[9,11],[4,4]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except z A taller',
      input: [
        [[5,7],[9,11],[0,4]],
        [[5,7],[8,12],[0,3]],
      ],
      output: [
        [[5,7],[9,11],[4,4]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except z B',
      input: [
        [[5,7],[9,11],[0,4]],
        [[5,7],[9,11],[0,2]],
      ],
      output: [
        [[5,7],[9,11],[3,4]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except z B taller',
      input: [
        [[5,7],[9,11],[0,4]],
        [[5,7],[8,12],[0,2]],
      ],
      output: [
        [[5,7],[9,11],[3,4]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except z B wider',
      input: [
        [[5,7],[9,11],[0,4]],
        [[4,8],[9,11],[0,2]],
      ],
      output: [
        [[5,7],[9,11],[3,4]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except y A',
      input: [
        [[5,7],[0,4],[9,11]],
        [[5,7],[0,3],[9,11]],
      ],
      output: [
        [[5,7],[4,4],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except y A wider',
      input: [
        [[5,7],[0,4],[9,11]],
        [[4,8],[0,3],[9,11]],
      ],
      output: [
        [[5,7],[4,4],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except y A taller',
      input: [
        [[5,7],[0,4],[9,11]],
        [[5,7],[0,3],[8,12]],
      ],
      output: [
        [[5,7],[4,4],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except y B',
      input: [
        [[5,7],[0,4],[9,11]],
        [[5,7],[0,2],[9,11]],
      ],
      output: [
        [[5,7],[3,4],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except y B wider',
      input: [
        [[5,7],[0,4],[9,11]],
        [[4,8],[0,2],[9,11]],
      ],
      output: [
        [[5,7],[3,4],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except y B taller',
      input: [
        [[5,7],[0,4],[9,11]],
        [[5,7],[0,2],[8,12]],
      ],
      output: [
        [[5,7],[3,4],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except x A',
      input: [
        [[0,4],[5,7],[9,11]],
        [[0,3],[5,7],[9,11]],
      ],
      output: [
        [[4,4],[5,7],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except x A wider',
      input: [
        [[0,4],[5,7],[9,11]],
        [[0,3],[4,8],[9,11]],
      ],
      output: [
        [[4,4],[5,7],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except x A taller',
      input: [
        [[0,4],[5,7],[9,11]],
        [[0,3],[5,7],[8,12]],
      ],
      output: [
        [[4,4],[5,7],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except x B',
      input: [
        [[0,4],[5,7],[9,11]],
        [[0,2],[5,7],[9,11]],
      ],
      output: [
        [[3,4],[5,7],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except x B wider',
      input: [
        [[0,4],[5,7],[9,11]],
        [[0,2],[4,8],[9,11]],
      ],
      output: [
        [[3,4],[5,7],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except x B taller',
      input: [
        [[0,4],[5,7],[9,11]],
        [[0,2],[5,7],[8,12]],
      ],
      output: [
        [[3,4],[5,7],[9,11]]
      ],
      calculate: getSplit
    },
    {
      id: 'inside except x,y',
      input: [
        [[0,4],[0,4],[0,3]],
        [[0,3],[0,3],[0,3]],
      ],
      output: [[[4,4],[0,4],[0,3]],[[0,3],[4,4],[0,3]]],
      /*
      [
        [[4,4],[4,4],[0,3]],
        [[0,3],[4,4],[0,3]],
        [[4,4],[0,3],[0,3]],
      ],
      */
      calculate: getSplit
    },
    {
      skip: true,// TODO all skipped nneed checing
      id: 'inside except x,z',
      input: [
        [[0,4],[0,3],[0,4]],
        [[0,3],[0,3],[0,3]],
      ],
      output: [[[0,4],[0,3],[4,4]],[[4,4],[0,3],[0,3]]],
      /*
      [
        [[4,4],[0,3],[4,4]],
        [[4,4],[0,3],[0,3]],
        [[0,3],[0,3],[4,4]],
      ],
      */
      calculate: getSplit
    },
    {
      id: 'inside except y,z',
      input: [
        [[0,3],[0,4],[0,4]],
        [[0,3],[0,3],[0,3]],
      ],
      output: [[[0,3],[0,4],[4,4]],[[0,3],[4,4],[0,3]]],
      /*
[
        [[0,3],[4,4],[4,4]],
        [[0,3],[4,4],[0,3]],
        [[0,3],[0,3],[4,4]],
      ],*/
      calculate: getSplit
    },
    {
      skip: true,// TODO all skipped nneed checing
      id: 'all dimensions partial collision 2,2,2',
      input: [
        [[1,2],[1,2],[1,2]],
        [[2,3],[2,3],[2,3]],
      ],
      output: [
        [[1,2],[1,2],[1,1]],
        [[1,1],[1,1],[2,2]],
        [[2,2],[1,1],[2,2]],
        [[1,1],[2,2],[2,2]]
      ],
      calculate: getSplit
    },
    {
      skip: true,// TODO all skipped nneed checing
      id: 'all dimensions partial collision 2,2,1',
      input: [
        [[1,2],[1,2],[1,2]],
        [[2,3],[2,3],[0,1]],
      ],
      output: [
        [[1,2],[1,2],[2,2]],
        [[1,1],[1,1],[1,1]],
        [[2,2],[1,1],[1,1]],
        [[1,1],[2,2],[1,1]],
      ],
      calculate: getSplit
    },
    {
      skip: true,// TODO all skipped nneed checing
      id: 'all dimensions partial collision 1,2,2',
      input: [
        [[1,2],[1,2],[1,2]],
        [[0,1],[2,3],[2,3]],
      ],
      output: [
        [[1,2],[1,2],[1,1]],
        [[2,2],[1,1],[2,2]],
        [[1,1],[1,1],[2,2]],
        [[2,2],[2,2],[2,2]],
      ],
      calculate: getSplit
    },
    {
      skip: true,// TODO all skipped nneed checing
      id: 'all dimensions partial collision 1,2,1',
      input: [
        [[1,2],[1,2],[1,2]],
        [[0,1],[2,3],[0,1]],
      ],
      output: [
        [[1,2],[1,2],[2,2]],
        [[2,2],[1,1],[1,1]],
        [[1,1],[1,1],[1,1]],
        [[2,2],[2,2],[1,1]],
      ],
      calculate: getSplit
    },
    {
      skip: true,// TODO all skipped nneed checing
      id: 'all dimensions partial collision 2,1,2',
      input: [
        [[1,2],[1,2],[1,2]],
        [[2,3],[0,1],[2,3]],
      ],
      output: [
        [[1,2],[1,2],[1,1]],
        [[1,1],[2,2],[2,2]],
        [[2,2],[2,2],[2,2]],
        [[1,1],[1,1],[2,2]],
      ],
      calculate: getSplit
    },
    {
      skip: true,// TODO all skipped nneed checing
      id: 'all dimensions partial collision 2,1,1',
      input: [
        [[1,2],[1,2],[1,2]],
        [[2,3],[0,1],[0,1]],
      ],
      output: [
        [[1,2],[1,2],[2,2]],
        [[1,1],[2,2],[1,1]],
        [[2,2],[2,2],[1,1]],
        [[1,1],[1,1],[1,1]],
      ],
      calculate: getSplit
    },
    {
      skip: true,// TODO all skipped nneed checing
      id: 'all dimensions partial collision 1,1,2',
      input: [
        [[1,2],[1,2],[1,2]],
        [[0,1],[0,1],[2,3]],
      ],
      output: [
        [[1,2],[1,2],[1,1]],
        [[2,2],[2,2],[2,2]],
        [[1,1],[2,2],[2,2]],
        [[2,2],[1,1],[2,2]],
      ],
      calculate: getSplit
    },
    {
      skip: true,// TODO all skipped nneed checing
      id: 'all dimensions partial collision 1,1,1',
      input: [
        [[1,2],[1,2],[1,2]],
        [[0,1],[0,1],[0,1]],
      ],
      output: [
        [[1,2],[1,2],[2,2]],
        [[2,2],[2,2],[1,1]],
        [[1,1],[2,2],[1,1]],
        [[2,2],[1,1],[1,1]],
      ],
      calculate: getSplit
    }
  ])

  const onRanges = []
  parse(lines).forEach(r => {
    while (true) {
      let collided = false
      for (let i = 0; i < onRanges.length; i++) {
        const r1 = onRanges[i]
        const r2 = r.range
        if (out(r1[0], r2[0]) || out(r1[1], r2[1]) || out(r1[2], r2[2])) {
          continue
        }
        const split = getSplit([r1, r2])
        onRanges.splice(i, 1, ...split)
        collided = true
        break
      }
      if (!collided) {
        if (r.on) {
          onRanges.push(r.range)
        }
        break
      }
    }
  })
  let c = 0
  onRanges.forEach(range => {
    c += (range[0][1] - range[0][0] + 1)*(range[1][1] - range[1][0] + 1)*(range[2][1] - range[2][0] + 1)
  })
  return c;
}
