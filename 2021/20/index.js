const enhance = (image, algorithm) => {
  const newImage = []
  const marginPixel = image[0][0] === '0' ? '1' : '0'
  const marginRow = marginPixel.repeat(image[0].length)
  newImage.push(marginRow)
  const [nx, ny] = [image[0].length, image.length]
  for (let y = 1; y < (ny - 1); y++) {
    const row = [marginPixel]
    for (let x = 1; x < (nx - 1); x++) {
      const n = [
        image[y - 1][x - 1], image[y - 1][x], image[y - 1][x + 1],
        image[y][x - 1], image[y][x], image[y][x + 1],
        image[y + 1][x - 1], image[y + 1][x], image[y + 1][x + 1],
      ]
      row.push(algorithm[parseInt(n.join(''), 2)])
    }
    row.push(marginPixel)
    newImage.push(row)
  }
  newImage.push(marginRow)
  return newImage
}

const read = (lines, timesToEnhance) => {
  let algorithm = ''
  let image = []
  let margin = ''
  for (let i = 0; i < timesToEnhance; i++) {
    margin += '000'
  }
  let addBits = bits => algorithm += bits
  lines.forEach(line => {
    if (line === '') {
      addBits = bits => image.push(margin + bits + margin)
    } else {
      addBits(line.split('').map(c => c === '#' ? '1' : '0').join(''))
    }
  })
  const darkRow = '0'.repeat(image[0].length)
  for (let i = 0; i < timesToEnhance; i++) {
    image.unshift(darkRow)
    image.unshift(darkRow)
    image.unshift(darkRow)
    image.push(darkRow)
    image.push(darkRow)
    image.push(darkRow)
  }
  return {algorithm, image}
}

const countLightPixels = image => {
  let light = 0
  const [nx, ny] = [image[0].length, image.length]
  for (let y = 0; y < ny; y++) {
    for (let x = 0; x < nx; x++) {
      if (image[y][x] === '1') {
        light++
      }
    }
  }
  return light
}

const solve = ({lines, log, timesToEnhance}) => {
  let {algorithm, image} = read(lines, timesToEnhance)

  // since algorithm[0]=1 and algorithm[511]=0, two enhancements will result in the infinite area being 0
  // therefore 1 pixels are countable - no need to count the infinite space
  for (let i = 0; i < timesToEnhance; i++) {
    image = enhance(image, algorithm)
  }

  return countLightPixels(image)
}

exports.part1 = (lines, log) => solve({lines,log,timesToEnhance: 2})
exports.part2 = (lines, log) => solve({lines,log,timesToEnhance: 50})
