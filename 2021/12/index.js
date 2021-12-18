const isSmall = (name) => name === name.toLowerCase()

exports.part1 = (lines) => {
  const name2id = {}
  const id2cave = {}
  let N = 0
  const getId = name => {
    let id = name2id[name]
    if (id === undefined) {
      id = Object.keys(name2id).length
      N++
      name2id[name] = id
      id2cave[id] = {
        id,
        name,
        small: isSmall(name)
      }
    }
    return id
  }

  const g = []
  const set = (a, b) => {
    if (!g[a]) {
      g[a] = []
    }
    g[a][b] = true
  }

  lines.forEach(l => {
    const [a, b] = l.split('-')
    const idA = getId(a)
    const idB = getId(b)
    set(idA, idB)
    set(idB, idA)
  })

  let paths = []
  const visit = (id, path) => {
    const cave = id2cave[id]
    path = path.concat(id)
    if (cave.name === 'end') {
      paths.push(path)
      return
    }
    for (let i = 0; i < N; i++) {
      if (g[id][i] && i !== name2id.start) {
        if (i === name2id.end || !id2cave[i].small) {
          visit(i, path)
        } else {
          const count = path.filter(id => id === i).length
          if (count < 1) {
            visit(i, path)
          }
        }
      }
    }
  }
  visit(name2id.start, [])
  return paths.length
}

exports.part2 = (lines) => {
  const name2id = {}
  const id2cave = {}
  let N = 0
  const getId = name => {
    let id = name2id[name]
    if (id === undefined) {
      id = Object.keys(name2id).length
      N++
      name2id[name] = id
      id2cave[id] = {
        id,
        name,
        small: isSmall(name)
      }
    }
    return id
  }

  const g = []
  const set = (a, b) => {
    if (!g[a]) {
      g[a] = []
    }
    g[a][b] = true
  }

  lines.forEach(l => {
    const [a, b] = l.split('-')
    const idA = getId(a)
    const idB = getId(b)
    set(idA, idB)
    set(idB, idA)
  })

  let paths = []
  const visit = (id, smallVisited, path) => {
    const cave = id2cave[id]
    path = path.concat(id)
    if (cave.name === 'end') {
      paths.push(path)
      return
    }
    for (let i = 0; i < N; i++) {
      if (g[id][i] && i !== name2id.start) {
        if (i === name2id.end || !id2cave[i].small) {
          visit(i, smallVisited, path)
        } else {
          const count = path.filter(id => id === i).length
          if (smallVisited === i) {
            if (count < 2) {
              visit(i, smallVisited, path)
            }
          } else {
            if (count < 1) {
              visit(i, smallVisited, path)
            }
          }
        }
      }
    }
  }
  visit(name2id.start, undefined, [])
  for (let i = 0; i < N; i++) {
    const cave = id2cave[i]
    if (cave.small && i !== name2id.start && i !== name2id.end) {
      visit(name2id.start, i, [])
    }
  }
  paths = Object.keys(paths.map(path => path.join(',')).reduce((all, p) => {all[p]=1;return all}, {})).map(p => p.split(','))
  return paths.length
}
