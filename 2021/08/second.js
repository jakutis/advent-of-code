const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const sort = digit => digit.split('').sort().join('')
const notes = lines.map(l => l.split(' | ')).map(([a, b]) => [a.split(' ').map(sort), b.split(' ').map(sort)])

const sum = notes.map(note => {
  let A = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  let B = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  let C = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  let D = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  let E = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  let F = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  let G = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

  note[0].concat(note[1]).forEach(digit => {
    const has = (A, digit) => A.filter(a => digit.indexOf(a) >= 0)
    const doesnotHave = (A, digit) => A.filter(a => digit.indexOf(a) < 0)

    const l = digit.length
    if (l === 2) {
      A = has(A, digit)
      B = has(B, digit)
      C = doesnotHave(C, digit)
      D = doesnotHave(D, digit)
      E = doesnotHave(E, digit)
      F = doesnotHave(F, digit)
      G = doesnotHave(G, digit)
      // 1
    }
    if (l === 3) {
      A = has(A, digit)
      B = has(B, digit)
      C = doesnotHave(C, digit)
      D = has(D, digit)
      E = doesnotHave(E, digit)
      F = doesnotHave(F, digit)
      G = doesnotHave(G, digit)
      // 7
    }
    if (l === 4) {
      A = has(A, digit)
      B = has(B, digit)
      C = doesnotHave(C, digit)
      D = doesnotHave(D, digit)
      E = has(E, digit)
      F = has(F, digit)
      G = doesnotHave(G, digit)
      // 4
    }
    if (l === 5) {
      C = has(C, digit)
      F = has(F, digit)
      D = has(D, digit)
      // 2 3 5
    }
    if (l === 6) {
      B = has(B, digit)
      C = has(C, digit)
      D = has(D, digit)
      E = has(E, digit)
      // 0 6 9
    }
  })

  /*
 dddd
e    a
e    a
 ffff
g    b
g    b
 cccc
  */

  let arrays = [A, B, C, D, E, F, G]
  while (true) {
    if (arrays.filter(a => a.length > 1).length === 0) {
      break
    }
    arrays.filter(a => a.length === 1).map(a => a[0]).forEach(toRemove => {
      arrays.filter(a => a.length > 1).forEach(a => {
        const i = a.indexOf(toRemove)
        if (i >= 0) {
          a.splice(i, 1)
        }
      })
    })
  }

  const digits = [
    '' + D + E + A + G + B + C,
    '' + A + B,
    '' + D + A + F + G + C,
    '' + D + A + F + B + C,
    '' + E + F + A + B,
    '' + D + E + F + B + C,
    '' + D + E + G + C + B + F,
    '' + D + A + B,
    '' + A + B + C + D + E + F + G,
    '' + A + B + C + D + E + F,
  ].map(sort)

  return note[1]
    .map(digit => digits.indexOf(digit))
    .reduce((acc, n) => acc * 10 + n)
}).reduce((acc, n) => acc + n)
log(sum)
