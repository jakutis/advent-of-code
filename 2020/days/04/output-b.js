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

const numberOfObjectsPassingAllValidators = (objects, properties) => objects.reduce((n, o) => n + (properties.every(p => p(o)) ? 1 : 0), 0)

const numberWithoutSuffix = (n, s) => Number(n.substr(0, n.length - s.length))

console.log(numberOfObjectsPassingAllValidators(passports(input), [
  o => o.byr && o.byr.length === 4 && Number(o.byr) >= 1920 && Number(o.byr) <= 2002,
  o => o.iyr && o.iyr.length === 4 && Number(o.iyr) >= 2010 && Number(o.iyr) <= 2020,
  o => o.eyr && o.eyr.length === 4 && Number(o.eyr) >= 2020 && Number(o.eyr) <= 2030,
  o => o.hgt && (
    (o.hgt.endsWith('cm') && numberWithoutSuffix(o.hgt, 'cm') >= 150 && numberWithoutSuffix(o.hgt, 'cm') <= 193) ||
    (o.hgt.endsWith('in') && numberWithoutSuffix(o.hgt, 'in') >= 59 && numberWithoutSuffix(o.hgt, 'in') <= 76)
  ),
  o => o.hcl && o.hcl.match(/^#[0-9a-f]{6}$/),
  o => o.ecl && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(o.ecl),
  o => o.pid && o.pid.match(/^[0-9]{9}$/)
]))