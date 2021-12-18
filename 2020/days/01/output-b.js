const input = require('fs').readFileSync('./input.txt').toString().trim().split(/\W+/).map(Number)
const sum = 2020

const getTwoNumbersWithSum = (numbers, sum) => {
  const seenNumbers = new Set()
  let result
  numbers.some(n => {
    if (seenNumbers.has(sum - n)) {
      result = {
        a: n,
        b: sum - n,
        product: n * (sum - n)
      }
      return true
    }
    seenNumbers.add(n)
  })
  return result
}

const getThreeNumbersWithSum = (numbers, sum) => {
  let result
  numbers.some((n, i) => {
    const twoNumbersWithSum = getTwoNumbersWithSum(numbers.slice(0, i).concat(numbers.slice(i + 1)), sum - n)
    if (twoNumbersWithSum !== undefined) {
      result = {
        a: n,
        b: twoNumbersWithSum.a,
        c: twoNumbersWithSum.b,
        product: n * twoNumbersWithSum.product
      }
      return true
    }
  })
  return result
}

console.log(getThreeNumbersWithSum(input, sum).product)
