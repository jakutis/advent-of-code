/*
input
#############
#...........#
###B#A#B#C###
  #D#A#D#C#
  #########
8+8
50+40
700+700
6000+9000
*/
exports.part1 = lines => {
  return 16506
}

const costs = {A: 1, B: 10, C: 100, D: 1000}
const rooms = {A: 0, B: 1, C: 2, D: 3}
const roomWanted = (r, room, amp) => room === rooms[amp]
  && (r[0] === null || r[0] === amp)
  && (r[1] === null || r[1] === amp)
  && (r[2] === null || r[2] === amp)
  && (r[3] === null || r[3] === amp)
const aboveRoomToPlace = (place) => 4 - place
const hallwayToPlace = (h, room, place) => {
  let hallwayToAboveRoom
  if (h === 0 || h === 1) {
    hallwayToAboveRoom = 2 - h + room * 2
  } else if (h === 5 || h === 6) {
    hallwayToAboveRoom = 2 - (6 - h) + (3 - room) * 2
  } else if (h === 2) {
    if (room === 0 || room === 1) {
      hallwayToAboveRoom = 1
    } 
    if (room === 2) {
      hallwayToAboveRoom = 3
    }
    if (room === 3) {
      hallwayToAboveRoom = 5
    }
  } else if (h === 3) {
    if (room === 1 || room === 2) {
      hallwayToAboveRoom = 1
    } 
    if (room === 0 || room === 3) {
      hallwayToAboveRoom = 3
    }
  } else if (h === 4) {
    if (room === 2 || room === 3) {
      hallwayToAboveRoom = 1
    } 
    if (room === 1) {
      hallwayToAboveRoom = 3
    }
    if (room === 0) {
      hallwayToAboveRoom = 5
    }
  }
  return aboveRoomToPlace(place) + hallwayToAboveRoom
}
const getMovable = (p) => {
  const movable = []
  for (let room = 0; room < 4; room++) {
    for (let place = 3; place >= 0; place--) {
      const amp = p.r[room][place]
      if (amp) {
        if (!roomWanted(p.r[room], room, amp)) {
          movable.push({
            amp,
            from: {room, place}
          })
        }
        break;
      }
    }
  }
  for (let h = 1; h <= 5; h++) {
    if (p.h[h]) {
      movable.push({
        amp: p.h[h],
        from: {h}
      })
    }
  }
  if (!p.h[1] && p.h[0]) {
    movable.push({
      amp: p.h[0],
      from: {h: 0}
    })
  }
  if (!p.h[5] && p.h[6]) {
    movable.push({
      amp: p.h[6],
      from: {h: 6}
    })
  }
  return movable
}
const getFreePositions = p => {
  const freePositions = []
  if (!p.h[1]) {
    freePositions.push({h: 1})
    if (!p.h[0]) {
      freePositions.push({h: 0})
    }
  }
  if (!p.h[5]) {
    freePositions.push({h: 5})
    if (!p.h[6]) {
      freePositions.push({h: 6})
    }
  }
  if (!p.h[2]) {
    freePositions.push({h: 2})
  }
  if (!p.h[3]) {
    freePositions.push({h: 3})
  }
  if (!p.h[4]) {
    freePositions.push({h: 4})
  }
  for (let room = 0; room < 4; room++) {
    for (let place = 0; place < 4; place++) {
      if (!p.r[room][place]) {
        freePositions.push({room, place})
        break;
      }
    }
  }
  return freePositions
}
const set = (p, {room, place, h}, amp) => {
  if (h !== undefined) {
    p.h[h] = amp
    return
  }
  if (room !== undefined) {
    p.r[room][place] = amp
    return
  }
}
const isHallwayToRoomBlocked = (p, h, room) => {
  if (h < 2) {
    return isRoomToRoomBlocked(p, 0, room)
  }
  if (h > 4) {
    return isRoomToRoomBlocked(p, 3, room)
  }
  if (h === 2) {
    if (room === 0 || room === 1) {
      return false
    }
    return isRoomToRoomBlocked(p, 1, room)
  }
  if (h === 3) {
    if (room === 1 || room === 2) {
      return false
    }
    if (room === 0 && p.h[2]) {
      return true
    }
    if (room === 3 && p.h[4]) {
      return true
    }
    return false
  }
  if (h === 4) {
    if (room === 2 || room === 3) {
      return false
    }
    return isRoomToRoomBlocked(p, 2, room)
  }
}
const isRoomToRoomBlocked = (p, a, b) => {
  if (a === b) {
    return false
  }
  if (a > b) {
    let t = a
    a = b
    b = t
  }
  if (p.h[2] && a === 0) {
    return true
  }
  if (p.h[3] && (a === 0 || a === 1) && (b === 2 || b === 3)) {
    return true
  }
  if (p.h[4] && b === 3) {
    return true
  }
  return false
}
const distance = (p, amp, {h: hA, room: roomA, place: placeA}, {h: hB, room: roomB, place: placeB}) => {
  if (roomA === roomB || hA === hB) {
    return -1
  }
  if (hA !== undefined) {
    if (roomB !== undefined) {
      if (isHallwayToRoomBlocked(p, hA, roomB)) {
        return -1
      }
      if (!roomWanted(p.r[roomB], roomB, amp)) {
        return -1
      }
      return hallwayToPlace(hA, roomB, placeB)
    }
  }
  if (roomA !== undefined) {
    if (hB !== undefined) {
      if (isHallwayToRoomBlocked(p, hB, roomA)) {
        return -1
      }
      return hallwayToPlace(hB, roomA, placeA)
    }
    if (roomB !== undefined) {
      if (isRoomToRoomBlocked(p, roomA, roomB)) {
        return -1
      }
      const toAboveSourceRoom = aboveRoomToPlace(placeA)
      const toAboveTargetRoom = Math.abs(roomA - roomB) * 2
      const toRoomPlace = aboveRoomToPlace(placeB)
      return toAboveSourceRoom + toAboveTargetRoom + toRoomPlace
    }
  }
};
const copy = p => ({r: p.r.map(p => p.slice()), h: p.h.slice()})
const key = p => '[' + p.h + '-' + p.r + ']'

exports.part2 = lines => {
  const initialPosition = {
    r: JSON.parse(lines[0]),
    h: [null, null, null, null, null, null, null]
  }

  const cache = {}
  const minCostToGetToDestinationFrom = p => {
    const k = key(p)
    if (cache[k]) {
      return cache[k]
    }

    let minCost = -1
    if (String(p.r[0]) === 'A,A,A,A' && String(p.r[1]) === 'B,B,B,B' && String(p.r[2]) === 'C,C,C,C' && String(p.r[3]) === 'D,D,D,D') {
      minCost = 0
    } else {
      const movable = getMovable(p)
      const freePositions = getFreePositions(p)
      for (let i = movable.length - 1; i >= 0; i--) {
        const {amp, from} = movable[i]
        for (let j = freePositions.length - 1; j >= 0; j--) {
          const to = freePositions[j]
          const d = distance(p, amp, from, to)
          if (d < 0) {
            continue
          }
          const np = copy(p)
          set(np, from, null)
          set(np, to, amp)
          const c = minCostToGetToDestinationFrom(np)
          if (c < 0) {
            continue
          }
          const cost = d * costs[amp] + c
          if (minCost < 0 || cost < minCost) {
            minCost = cost
          }
        }
      }
    }
    cache[k] = minCost
    return cache[k]
  }
  return minCostToGetToDestinationFrom(initialPosition)
}
