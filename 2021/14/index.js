const read = lines => {
  const polymer = lines[0].split('')
  const rules = lines
    .slice(1)
    .map(l => l.split(' -> '))
    .reduce((rules, [from, to]) => {
      rules[from] = to
      return rules
    }, {})
  return {polymer, rules}
}

const conclude = counts => {
  let min, max
  Object.entries(counts).forEach(pc => {
    if (min === undefined || min[1] > pc[1]) {
      min = pc
    }
    if (max === undefined || max[1] < pc[1]) {
      max = pc
    }
  })
  return max[1] - min[1]
}

exports.part1 = (lines) => {
  const {polymer, rules} = read(lines)

  const step = (polymer, rules) => {
    for (let i = 0; i < (polymer.length - 1); i++) {
      const e = rules[polymer[i] + polymer[i + 1]]
      if (e !== undefined) {
        polymer.splice(i + 1, 0, e)
        i++
      }
    }
  }
  for (let i = 0; i < 10; i++) {
    step(polymer, rules)
  }
  const counts = polymer.reduce((counts, e) => {
    counts[e] = (counts[e] || 0) + 1
    return counts
  }, {})

  return conclude(counts)
}


exports.part2 = (lines) => {
  const {polymer, rules} = read(lines)

  const merge = (a, b) => {
    return Object.keys(a).reduce((counts, e) => {
      counts[e] = (counts[e] || 0) + a[e]
      return counts
    }, Object.assign({}, b))
  }
  const getCountsForPairSinceStep = (pair, step, cache, untilStep) => {
    const key = pair + '-' + step
    if (cache[key]) {
      return cache[key]
    }

    const e = rules[pair]
    cache[key] = {}
    if (e === undefined) {
      return cache[key]
    }

    if (step === untilStep) {
      cache[key][e] = 1
    } else {
      const a = getCountsForPairSinceStep(pair[0] + e, step + 1, cache, untilStep)
      const c = {}
      c[e] = 1
      const b = getCountsForPairSinceStep(e + pair[1], step + 1, cache, untilStep)
      cache[key] = merge(merge(a, b), c)
    }
    return cache[key]
  }
  const cache = {}
  const counts = polymer.reduce((counts, e, i) => {
    counts[e] = (counts[e] || 0) + 1
    if (i < (polymer.length - 1)) {
      counts = merge(counts, getCountsForPairSinceStep(e + polymer[i + 1], 1, cache, 40))
    }
    return counts
  }, {})

  return conclude(counts)
}
