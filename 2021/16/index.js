const toNumber = bits => parseInt(bits, 2)

const parse = (lines) => {
  const binary = lines[0].split('').map(bit => parseInt(bit, 16).toString(2).padStart(4, '0')).join('')
  let versionSum = 0
  let i = 0

  const parsePacket = (level, siblings) => {
    if (i >= binary.length || binary.slice(i).split('').every(c => c === '0')) {
      return
    }

    versionSum += toNumber(binary.slice(i, i += 3))
    const typeId = toNumber(binary.slice(i, i += 3))

    const packet = {typeId}
    siblings.push(packet)

    if (typeId === 4) {
      const begin = i
      packet.value = ''
      while (true) {
        const group = binary.slice(i, i += 5)
        packet.value += group.slice(1, 5)
        if (group[0] === '0') {
          break
        }
      }
      packet.value = toNumber(packet.value)
      if (level === 0) {
        i += (4 - (i - begin) % 4) % 4
      }
    } else {
      const children = []
      if (binary.slice(i, i += 1) === '0') {
        const totalLengthInBits = toNumber(binary.slice(i, i += 15))
        const end = i + totalLengthInBits
        while (i < end) {
          parsePacket(level + 1, children)
        }
      } else {
        const numberOfSubPackets = toNumber(binary.slice(i, i += 11))
        for (let j = 0; j < numberOfSubPackets; j++) {
          parsePacket(level + 1, children)
        }
      }
      packet.children = children
    }

    if (level === 0) {
      parsePacket(level, siblings)
    }
  }
  const packets = []
  parsePacket(0, packets)
  return {packet: packets[0], versionSum}
}

exports.part1 = (lines) => parse(lines).versionSum

exports.part2 = (lines) => {
  const evalPacket = (packet) => {
    switch (packet.typeId) {
      case 0:
        return packet.children.reduce((sum, p) => sum + evalPacket(p), 0)
      case 1:
        return packet.children.reduce((prod, p) => prod * evalPacket(p), 1)
      case 2:
        return Math.min.apply(Math, packet.children.map(p => evalPacket(p)))
      case 3:
        return Math.max.apply(Math, packet.children.map(p => evalPacket(p)))
      case 4:
        return packet.value
      case 5:
        return evalPacket(packet.children[0]) > evalPacket(packet.children[1]) ? 1 : 0
      case 6:
        return evalPacket(packet.children[0]) < evalPacket(packet.children[1]) ? 1 : 0
      case 7:
        return evalPacket(packet.children[0]) === evalPacket(packet.children[1]) ? 1 : 0
      default:
        throw new Error('unrecognized type id ' + packet.typeId)
    }
  }
  const {packet} = parse(lines)
  return evalPacket(packet)
}
