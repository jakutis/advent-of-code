const copy = value => JSON.parse(JSON.stringify(value))
const read = (line) => {
  let pair = {
    parent: null,
    n: [],
    i: 0,
  }
  const n = '0123456789'.split('')
  line.split('').forEach(c => {
    if (c === '[') {
      const np = {
        parent: pair,
        n: [],
        i: 0,
      }
      pair.n[pair.i] = np
      pair = np
    }
    if (n.includes(c)) {
      pair.n[pair.i] = (pair.n[pair.i] || '') + c
    }
    if (c === ',') {
      pair.i = 1
    }
    if (c === ']') {
      if (typeof pair.n[0] === 'string') {
        pair.n[0] = Number(pair.n[0])
      } else {
        pair.n[0] = pair.n[0].n
      }
      if (typeof pair.n[1] === 'string') {
        pair.n[1] = Number(pair.n[1])
      } else {
        pair.n[1] = pair.n[1].n
      }
      pair = pair.parent
    }
  })
  return pair.n[0].n
}
const magnitude = (n) => {
  if (typeof n === 'number') {
    return n
  }
  return magnitude(n[0]) * 3 + magnitude(n[1]) * 2
}
const g = (pair, neededIndexInParent, childToParent) => {
  if (pair === null) {
    return null
  }
  const {parent, i} = childToParent.get(pair)
  if (i === neededIndexInParent) {
    return parent
  } else {
    return g(parent, neededIndexInParent, childToParent)
  }
}
const f = (pair, i) => {
  if (typeof pair[i] === 'number') {
    return pair
  } else {
    return f(pair[i], i)
  }
}
const explode = {
  condition: (pair, i, childToParent) => typeof pair[i] !== 'number' && childToParent.get(pair[i]).depth === 4,
  perform: (pair, i, childToParent) => {
    const [l, r] = pair[i]

    const lpair = g(pair[i], 1, childToParent)
    const rpair = g(pair[i], 0, childToParent)
    if (lpair) {
      if (typeof lpair[0] === 'number') {
        lpair[0] += l
      } else {
        f(lpair[0], 1)[1] += l
      }
    }
    if (rpair) {
      if (typeof rpair[1] === 'number') {
        rpair[1] += r
      } else {
        f(rpair[1], 0)[0] += r
      }
    }

    pair[i] = 0
  }
}
const split = {
  condition: (pair, i) => typeof pair[i] === 'number' && pair[i] >= 10,
  perform: (pair, i) => {
    const l = Math.floor(pair[i] / 2)
    const r = Math.ceil(pair[i] / 2)
    pair[i] = [l, r]
  }
}
const act = (action, pair, i, childToParent) => {
  if (action.condition(pair, i, childToParent)) {
    action.perform(pair, i, childToParent)
    return true
  }
  if (typeof pair[i] === 'number') {
    return false
  }
  return act(action, pair[i], 0, childToParent) || act(action, pair[i], 1, childToParent)
}
const reduce = (pair) => {
  const topPair = copy(pair)
  while (true) {
    const childToParent = new Map()
    const fillChildToParent = (i, child, parent, depth) => {
      if (typeof child === 'number') {
        return
      }
      childToParent.set(child, {i, parent, depth})
      fillChildToParent(0, child[0], child, depth + 1)
      fillChildToParent(1, child[1], child, depth + 1)
    }
    fillChildToParent(null, topPair, null, 0)
    if (!act(explode, topPair, 0, childToParent) && !act(explode, topPair, 1, childToParent) && !act(split, topPair, 0, childToParent) && !act(split, topPair, 1, childToParent)) {
      break
    }
  }
  return topPair
}
const sum = numbers => numbers.reduce((sum, n) => reduce([sum, n]))

exports.part1 = (lines, log, testInternally) => {
  testInternally([
    {
      calculate: sum,
      input: [
        [[[[4,3],4],4],[7,[[8,4],9]]],
        [1,1]
      ],
      output:[[[[0,7],4],[[7,8],[6,0]]],[8,1]]
    },
    {
      calculate: sum,
      input: [
        [1,1],
        [2,2],
        [3,3],
        [4,4]
      ],
      output: [[[[1,1],[2,2]],[3,3]],[4,4]]
    },
    {
      calculate: sum,
      input: [
[1,1],
[2,2],
[3,3],
[4,4],
[5,5]
      ],
      output: [[[[3,0],[5,3]],[4,4]],[5,5]]
    },
    {
      calculate: sum,
      input: [
[1,1],
[2,2],
[3,3],
[4,4],
[5,5],
[6,6]
      ],
      output: [[[[5,0],[7,4]],[5,5]],[6,6]]
    },
    {
      calculate: sum,
      input: [
[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]],
      ],
      output: [[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]
    },
    {
      calculate: sum,
      input: [
[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]],
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]],
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]],
[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]],
[7,[5,[[3,8],[1,4]]]],
[[2,[2,2]],[8,[8,1]]],
[2,9],
[1,[[[9,3],9],[[9,0],[0,7]]]],
[[[5,[7,4]],7],1],
[[[[4,2],2],6],[8,7]]
      ],
      output: [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]
    },
    {
      calculate: sum,
      input: [
[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]],
[[[5,[2,8]],4],[5,[[9,9],0]]],
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]],
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]],
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]],
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]],
[[[[5,4],[7,7]],8],[[8,3],8]],
[[9,3],[[9,9],[6,[4,9]]]],
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]],
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]],
      ],
      output: [[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]]
    },
    {
      calculate: sum,
      input: [
        [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]],
        [[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
      ],
      output: [[[[7,8],[6,6]],[[6,0],[7,7]]],[[[7,8],[8,8]],[[7,9],[0,6]]]]
    },
    {
      calculate: magnitude,
      input: [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]],
      output: 3488
    },
    {
      calculate: magnitude,
      input: [[[[6,6],[7,6]],[[7,7],[7,0]]],[[[7,7],[7,7]],[[7,8],[9,9]]]],
      output: 4140
    },
    {
      calculate: magnitude,
      input: [[[[5,0],[7,4]],[5,5]],[6,6]],
      output: 1137
    },
    {
      calculate: magnitude,
      input: [[[[3,0],[5,3]],[4,4]],[5,5]],
      output: 791
    },
    {
      calculate: magnitude,
      input: [[[[1,1],[2,2]],[3,3]],[4,4]],
      output: 445
    },
    {
      calculate: magnitude,
      input: [[[[0,7],4],[[7,8],[6,0]]],[8,1]],
      output: 1384
    },
    {
      calculate: magnitude,
      input: [[1,2],[[3,4],5]],
      output: 143
    },
    {
      calculate: magnitude,
      input: [[[[7,8],[6,6]],[[6,0],[7,7]]],[[[7,8],[8,8]],[[7,9],[0,6]]]],
      output: 3993
    },
  ])
  return magnitude(sum(lines.map(l => read(l))))
}

exports.part2 = (lines, log) => {
  const numbers = lines.map(l => read(l))
  let max
  numbers.forEach(a => {
    numbers.forEach(b => {
      if (a !== b) {
        const m = magnitude(sum([a, b]))
        if (!max || m > max.m) {
          max = {m,a,b}
        }
      }
    })
  })
  return max.m
}
