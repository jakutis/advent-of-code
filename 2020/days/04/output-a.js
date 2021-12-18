const input = require('fs').readFileSync('./input.txt').toString().split('\n').map(s => s.trim())

const passports = lines => lines.reduce(({newPassport, passports}, line) => {
  if (line.length > 0) {
    const pairs = line.split(' ').map(s => s.trim()).filter(s => s).map(s => s.split(':'))
    const passportPart = pairs.reduce((passport, [key, value]) => ({...passport, [key]: value}), {})
    return {
      passports,
      newPassport: newPassport === null ? passportPart : {...newPassport, ...passportPart}
    }
  } else {
    if (newPassport !== null) {
      return {
        newPassport: null,
        passports: passports.concat(newPassport)
      }
    }
  }
  return {newPassport, passports}
}, {newPassport: null, passports: []}).passports

const numberOfObjectsWithDefinedProperties = (objects, properties) => objects.reduce((n, o) => n + (properties.every(p => o[p] !== undefined) ? 1 : 0), 0)

console.log(numberOfObjectsWithDefinedProperties(passports(input), ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']))