const lines = require('fs').readFileSync('/dev/stdin').toString().split('\n').map(l => l.trim()).filter(Boolean)
const log = line => console.log(String(line))

const parse = line => {
  const [ instruction, n ] = line.split(' ')
  return {
    instruction,
    n: parseFloat(n)
  }
}
const { depth, y } = lines.map(parse).reduce(({depth, y, aim}, {instruction, n}) => {
  if (instruction === 'down') {
    aim += n
  }
  if (instruction === 'up') {
    aim -= n
  }
  if (instruction === 'forward') {
    y += n
    depth += aim * n
  }
  return { depth, y, aim }
}, {depth: 0, y: 0, aim: 0})
log(depth * y)
