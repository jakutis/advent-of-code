const input = require('fs').readFileSync('./input.txt').toString().split('\n').map(s => s.trim()).filter(s => s).map(s => s.split(': ')).map(([policy, password]) => ({
  password,
  letter: policy.split(' ')[1],
  range: policy.split(' ')[0].split('-').map(Number)
}))

console.log(input.reduce((count, {password, letter, range}) => {
  const times = password.split(letter).length - 1
  return count + (range[0] <= times && times <= range[1] ? 1 : 0)
}, 0))
