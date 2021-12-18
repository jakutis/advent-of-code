const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const fish = lines[0].split(',').map(Number)
const calcAfter40 = (first) => {
  let fish = [first]
  for (let day = 0; day < 40; day++) {
    for (let i = 0; i < fish.length; i++) {
      if (fish[i] === 0) {
        i++
        fish.unshift(8)
        fish[i] = 6
      } else {
        fish[i]--
      }
    }
  }
  return fish
}
const after40 = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(calcAfter40)
const calcAfter80Count = (first) => {
  let n = 0
  after40[first].forEach(fish => {
    n += after40[fish].length
  })
  return n
}
let n = 0
fish.forEach(f => {
  n += calcAfter80Count(f)
})
log(n)
