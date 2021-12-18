const readInputText = () => require('fs').readFileSync('./input.txt').toString()

const parseGroup = string => new Set(string.split('').map(a => a.trim()).filter(a => a))

const groups = readInputText().split('\n\n').map(parseGroup)

const counts = groups.map(s => s.size)

const sum = counts.reduce((s, c) => s + c)

console.log(sum)