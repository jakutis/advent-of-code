const close2open = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<'
}
const open2close = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}

exports.part1 = (lines) => {
  const close2score = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  }
  return lines
    .map(line => {
      const opens = []
      return line.split('').find(char => {
        if (Object.keys(open2close).includes(char)) {
          opens.push(char)
          return
        }
        if (opens.pop() !== close2open[char]) {
          return char
        }
      })
    })
    .filter(Boolean)
    .reduce((score, close) => score + close2score[close], 0)
}

exports.part2 = (lines) => {
  const close2score = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
  }
  const scores = lines
    .map(line => {
      const opens = []
      const corrupt = line.split('').find(char => {
        if (Object.keys(open2close).includes(char)) {
          opens.push(char)
          return
        }
        if (opens.pop() !== close2open[char]) {
          return true
        }
      })
      return {corrupt, opens}
    })
    .filter(l => !l.corrupt)
    .map(l => l.opens.map(c => open2close[c]).reverse())
    .map(closes => closes.reduce((score, close) => score * 5 + close2score[close], 0))
    .sort((a, b) => a - b)
  return scores[(scores.length - 1) / 2]
}
