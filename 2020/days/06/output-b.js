const readInputText = () => require('fs').readFileSync('./input.txt').toString().trim()

const parseGroup = string => string.split('\n').map(s => s.split(''))

const groups = readInputText().split('\n\n').map(parseGroup)

const everyoneHas = (group, question) => group.every(member => member.includes(question))

const sum = numbers => numbers.reduce((s, c) => s + c)

const countGroup = group => sum(group[0].map(question => everyoneHas(group, question) ? 1 : 0))

const counts = groups.map(countGroup)

console.log(sum(counts))