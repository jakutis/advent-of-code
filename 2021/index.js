const { readdirSync, readFileSync } = require('fs')
const read = filename => readFileSync(filename).toString().trim().split('\n').map(l => l.trim())
// TODO insert .filter(Boolean) into every source code from day 1 to day 19
const log = line => console.log(typeof line === 'string' ? line : JSON.stringify(line, null, 2))

const cwd = process.cwd()
const { part1, part2 } = require(cwd)
const internalTest = (tests) => {
  tests.forEach(({calculate, input, output}) => {
    const actualOutput = calculate(input)
    if (JSON.stringify(actualOutput) !== JSON.stringify(output)) {
      throw new Error('INTERNAL TESTS FAILED')
    }
  })
  log(tests.length + ' INTERNAL TESTS WERE RUN, ALL PASSED')
}

if (process.argv[2]) {
  const lines = read(process.argv[2] + '.txt')
  log('Part 1:')
  log(part1(lines, log, internalTest))
  log('Part 2:')
  log(part2(lines, log, internalTest))
} else {
  const test = (solve, filename) => {
    const expectedOutput = readFileSync(filename + '.out.txt').toString().trim()
    log('test ' + filename)
    const actualOutput = String(solve(read(filename + '.in.txt'), log, internalTest))
    if (expectedOutput !== actualOutput) {
      throw new Error('Expected [' + expectedOutput + '], actually got [' + actualOutput + ']')
    } else {
      log('PASS')
    }
  }
  readdirSync(cwd).filter(f => f.endsWith('.1.in.txt')).map(f => f.slice(0, f.length - '.1.in.txt'.length)).forEach(part1Test => test(part1, part1Test + '.1'))
  readdirSync(cwd).filter(f => f.endsWith('.2.in.txt')).map(f => f.slice(0, f.length - '.2.in.txt'.length)).forEach(f => test(part2, f + '.2'))
}
