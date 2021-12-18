exports.part1 = (lines, log) => {
  //lines = ['8A004A801A8002F478']
  //lines = ['620080001611562C8802118E34']
  //lines = ['C0015000016115A2E0802F182340']
  //lines = ['A0016C880162017C3686B18A3D4780']
  //lines = ['38006F45291200']
  log(lines[0])
  //const binary = '110100101111111000101000';// number
  //const binary = '00111000000000000110111101000101001010010001001000000000';//operator type 0
  //const binary = '11101110000000001101010000001100100000100011000001100000';//operator type 1
  const binary = lines[0].split('').map(bit => parseInt(bit, 16).toString(2).padStart(4, '0')).join('')
  const toNumber = bits => parseInt(bits, 2)

  let versionSum = 0
  let i = 0
  const packets = []

  const parsePacket = (padding) => {
    log(padding + 'parse remaining ' + binary.slice(i))
    if (i >= binary.length - 1 || binary.slice(i).split('').every(c => c === '0')) {
      return
    }
    const start = i
    const version = toNumber(binary.slice(i, i += 3))
    versionSum += version
    const typeId = toNumber(binary.slice(i, i += 3))
    log(padding + 'version ' + version + ' typeid ' + typeId)

    const packet = {version, typeId}
    if (typeId === 4) {
      const begin = i
      packet.type = 'literal'
      packet.value = ''
      while (true) {
        const group = binary.slice(i, i += 5)
        const bits = group.slice(1, 5)
        packet.value += bits
        if (group[0] === '0') {
          break
        }
      }
      //log(padding + 'numberbits ' + (i - begin))
      if (padding === '') {
        i += (4 - (i - begin)%4)%4
      }
      packet.value = toNumber(packet.value)
      log(padding + 'LITERAL ' + packet.value)
    } else {
      const lengthTypeId = binary.slice(i, i += 1)
      log(padding + 'OPERATOR ' + lengthTypeId)
      if (lengthTypeId === '0') {
        packet.type = 'operator0'
        const totalLengthInBits = toNumber(binary.slice(i, i += 15))
        log(padding + 'OP bits: ' + totalLengthInBits)

        const end = i + totalLengthInBits
        for (;i != end;) {
          parsePacket(padding + '    ')
        }
        //i += totalLengthInBits
      } else {
        packet.type = 'operator1'
        const numberOfSubPackets = toNumber(binary.slice(i, i += 11))
        log(padding + 'OP packets ' + numberOfSubPackets)

        for (let i = 0; i < numberOfSubPackets; i++) {
          parsePacket(padding + '    ')
        }
      }
    }
    log(padding + 'took ' + (i - start) + ' bits: ' + binary.slice(start, i))
    log('')
    packet.length = i - start
    packets.push(packet)
    if (padding === '') {
      parsePacket(padding)
    }
  }

  parsePacket('')

  return versionSum
}
/*
110 100 10111 11110 00101 000
*/

exports.part2 = (lines, log) => {
  //lines = ['8A004A801A8002F478']
  //lines = ['620080001611562C8802118E34']
  //lines = ['C0015000016115A2E0802F182340']
  //lines = ['A0016C880162017C3686B18A3D4780']
  //lines = ['38006F45291200']
  //lines = ['9C0141080250320F1802104A08']
  log(lines[0])
  //const binary = '110100101111111000101000';// number
  //const binary = '00111000000000000110111101000101001010010001001000000000';//operator type 0
  //const binary = '11101110000000001101010000001100100000100011000001100000';//operator type 1
  const binary = lines[0].split('').map(bit => parseInt(bit, 16).toString(2).padStart(4, '0')).join('')
  const toNumber = bits => parseInt(bits, 2)

  let versionSum = 0
  let i = 0

  const parsePacket = (padding, siblings) => {
    log(padding + 'parse remaining ' + binary.slice(i))
    if (i >= binary.length - 1 || binary.slice(i).split('').every(c => c === '0')) {
      return
    }
    const start = i
    const version = toNumber(binary.slice(i, i += 3))
    versionSum += version
    const typeId = toNumber(binary.slice(i, i += 3))
    log(padding + 'version ' + version + ' typeid ' + typeId)

    const packet = {version, typeId}
    if (typeId === 4) {
      const begin = i
      packet.type = 'literal'
      packet.value = ''
      while (true) {
        const group = binary.slice(i, i += 5)
        const bits = group.slice(1, 5)
        packet.value += bits
        if (group[0] === '0') {
          break
        }
      }
      //log(padding + 'numberbits ' + (i - begin))
      if (padding === '') {
        i += (4 - (i - begin)%4)%4
      }
      packet.value = toNumber(packet.value)
      log(padding + 'LITERAL ' + packet.value)
    } else {
      const lengthTypeId = binary.slice(i, i += 1)
      log(padding + 'OPERATOR ' + lengthTypeId)
      if (lengthTypeId === '0') {
        packet.type = 'operator0'
        const totalLengthInBits = toNumber(binary.slice(i, i += 15))
        log(padding + 'OP bits: ' + totalLengthInBits)

        const end = i + totalLengthInBits
        const s = []
        for (;i != end;) {
          parsePacket(padding + '    ', s)
        }
        packet.children = s
        //i += totalLengthInBits
      } else {
        packet.type = 'operator1'
        const numberOfSubPackets = toNumber(binary.slice(i, i += 11))
        log(padding + 'OP packets ' + numberOfSubPackets)

        const s = []
        for (let i = 0; i < numberOfSubPackets; i++) {
          parsePacket(padding + '    ', s)
        }
        packet.children = s
      }
    }
    log(padding + 'took ' + (i - start) + ' bits: ' + binary.slice(start, i))
    log('')
    packet.length = i - start
    siblings.push(packet)
    if (padding === '') {
      parsePacket(padding, siblings)
    }
  }

  const root = []
  parsePacket('', root)
  log('===============================================================')
  log(root)
  log('#################################################################')
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
        throw 'no such op ' + packet.typeId
    }

  }
  const result = evalPacket(root[0])


  return result

}
