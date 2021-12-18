const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(String(line))

const parse = line => {
  const [ instruction, n ] = line.split(' ')
  return {
    instruction,
    n: parseFloat(n)
  }
}
const { depth, y } = lines.map(parse).reduce(({depth, y}, {instruction, n}) => {
  if (instruction === 'down') {
    depth += n
  }
  if (instruction === 'up') {
    depth -= n
  }
  if (instruction === 'forward') {
    y += n
  }
  return { depth, y}
}, {depth: 0, y: 0})
log(depth * y)
