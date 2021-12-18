  ;[
    {
      input: [[[[[9,8],1],2],3],4],
      out: [[[[0,9],2],3],4]
    },
    {
      input: [7,[6,[5,[4,[3,2]]]]],
      out: [7,[6,[5,[7,0]]]]
    },
    {
      input: [[6,[5,[4,[3,2]]]],1],
      out: [[6,[5,[7,0]]],3],
    },
    {
      input: [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]],
      out: [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]
    },
    {
      input: [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]],
      out: [[3,[2,[8,0]]],[9,[5,[7,0]]]]
    },
  ].forEach(({input, out}) => {
    log('========================================')
    reduce(input)
    log({input, out})
    log('========================================')
  })
  return














      /*
    const act = (i) => {
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
      iterate(n => {
        log(n)
      })
      return false

      let top = topPair
      while (top) {
        //log('----------')
        const parent = childToParent.get(top)
        const d = parent.depth
        log(d)
        //log({top, d})
        if (d === 5) {
          //log('AA')
          let child

          const l = top[0]
          child = parent
          while (child) {
            if (child.i === 1 && typeof child.parent[0] === 'number') {
              child.parent[0] += l
              break
            }
            child = childToParent.get(child)
          }

          const r = top[1]
          child = parent
          while (child) {
            if (child.i === 0 && typeof child.parent[1] === 'number') {
              child.parent[1] += r
              break
            }
            child = childToParent.get(child)
          }

          parent.parent[i] = 0
          return true
        } else {
          if (typeof top[i] === 'number') {
        }
      }
      }
      */

