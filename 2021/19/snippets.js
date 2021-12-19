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
/*
offsets

up
N 1,2,3
E -2,1,3
S -1,-2,3
W 2,-1,3

down
N 1,-2,-3
E -2,-1,-3
S -1,2,-3
W 2,1,-3

left
N 1,-3,2
E 3,1,2
S -1,3,2
W -3,-1,2

right
N 1,3,-2
E -3,1,-2
S -1,-3,-2
W 3,-1,-2

front
N -3,2,1
E -2,-3,1
S 3,-2,1
W 2,3,1

back
N 3,2,-1
E -3,-2,-1
S 2,-3,-1
W -2,3,-1
-----------
*/
const cmp = (a, b) => {
  const x = a[0] - b[0]
  const y = a[1] - b[1]
  const z = a[2] - b[2]
  return !x ? (!y ? z : y) : x
}

  const [x,y,z] = p
  const variants = []
  ;[[x, y, z], [z, x, y], [y, z, x]].forEach(([x, y, zt]) => {
    ;[1, -1].forEach((zs) => {
      const z = zt * zs
      const xy = zs > 0 ? [[x,y],[-x,-y],[-y,x],[y,-x]] : [[-x,y],[-y,-x],[x,-y],[y,x]]
      ;xy.forEach(([x,y]) => {
        variants.push({x,y,z, o: variants.length})
      })
    })
  })
  return variants

  test([{
    output: JSON.stringify(`N 1,2,3
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
W -2,3,-1`.split('\n').map(s => s.slice(2)).map(s => s.split(',').map(Number)).sort(cmp)),
    input: JSON.stringify(variants([1,2,3]).map(({x,y,z})=>([x,y,z])).sort(cmp)),
    calculate: v => v
  }])

