const copy = arr => arr.map(arr => arr.slice())
exports.part1 = (lines, log) => {
  const algorithm = []
  let image = []
  const timesToEnhance = 50
  const margin = []
  for (let i = 0; i < timesToEnhance; i++) {
    margin.push('0')
    margin.push('0')
    margin.push('0')
  }
  let state = 'algorithm'
  lines.forEach(line => {
    if (line === '') {
      state = 'input'
    } else {
      const bits = line.split('').map(c => c === '#' ? '1' : '0')
      if (state === 'algorithm') {
        algorithm.push.apply(algorithm, bits)
      } else {
        image.push(margin.concat(bits).concat(margin))
      }
    }
  })
  for (let i = 0; i < timesToEnhance; i++) {
    image.unshift('0'.repeat(image[0].length).split(''))
    image.unshift('0'.repeat(image[0].length).split(''))
    image.unshift('0'.repeat(image[0].length).split(''))
  }
  for (let i = 0; i < timesToEnhance; i++) {
    image.push('0'.repeat(image[0].length).split(''))
    image.push('0'.repeat(image[0].length).split(''))
    image.push('0'.repeat(image[0].length).split(''))
  }
    /*
  const area = {
    x: [timesToEnhance * 3, image[0].length - timesToEnhance * 3],
    y: [timesToEnhance * 3, image.length - timesToEnhance * 3]
  }
  log(area)
  */
  log(algorithm.length)
  log([image[0].length, image.length])
  log(algorithm[0])
  log(algorithm[511])
  const [nx, ny] = [image[0].length, image.length]
  const nAt = (x, y) => {
    const n = [
      image[y - 1][x - 1], image[y - 1][x], image[y - 1][x + 1],
      image[y][x - 1], image[y][x], image[y][x + 1],
      image[y + 1][x - 1], image[y + 1][x], image[y + 1][x + 1],
    ]
    return parseInt(n.join(''), 2)
  }
  const enhance = () => {
    const newImage = []
    const marginPixel = image[0][0] === '0' ? '1' : '0'
    newImage.push(marginPixel.repeat(image[0].length).split(''))
    for (let y = 1; y < (ny - 1); y++) {
      const row = [marginPixel]
      for (let x = 1; x < (nx - 1); x++) {
        row.push(algorithm[nAt(x, y)])
      }
      row.push(marginPixel)
      newImage.push(row)
    }
    newImage.push(marginPixel.repeat(image[0].length).split(''))
    image = newImage
  }
  // since algorithm[0]=1 and algorithm[511]=0, two enhancements will result in the infinite area being 0
  for (let i = 0; i < timesToEnhance; i++) {
    enhance()
  }
  let light = 0
  image.forEach(row => row.forEach(p => {
    if (p === '1') {
      light++
    }
  }))
  return light
}

exports.part2 = (lines, log) => {
}
