const input = require('fs').readFileSync('./input.txt').toString().split('\n').map(s => s.trim()).filter(s => s).map(s => s.split(': ')).map(([policy, password]) => ({
  password,
  letter: policy.split(' ')[1],
  positions: policy.split(' ')[0].split('-').map(Number)
}))

console.log(input.reduce((count, {password, letter, positions}) => {
  const first = password[positions[0] - 1] === letter
  const second = password[positions[1] - 1] === letter
  return count + (first !== second ? 1 : 0)
}, 0))
