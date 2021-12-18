const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const fish = lines[0].split(',').map(Number)
const calcAfter128 = (first) => {
  let fish = [first]
  for (let day = 0; day < 128; day++) {
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
const after128 = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(calcAfter128)
const calcAfter256Count = (first) => {
  let n = 0
  after128[first].forEach(fish => {
    n += after128[fish].length
  })
  return n
}
let n = 0
fish.forEach(f => {
  n += calcAfter256Count(f)
})
log(n)
