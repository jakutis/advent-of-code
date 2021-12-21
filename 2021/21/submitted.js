function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
}
const rangeFromTo = (from, to) => range(to - from + 1, from)

exports.part1 = (lines, log, test) => {
  const calculate = (positions) => {
    let nextRoll = 0
    const roll = () => {
      const r = nextRoll
      nextRoll = (nextRoll + 1) % 100
      return r + 1
    }
    positions.forEach((p, i) => {
      positions[i] = p - 1
    })

    let player = 0
    const scores = []
    let rolls = 0
    while (true) {
      positions[player] = (positions[player] + roll()) % 10
      positions[player] = (positions[player] + roll()) % 10
      positions[player] = (positions[player] + roll()) % 10
      scores[player] = (scores[player] || 0) + (positions[player] + 1)
      rolls += 3
      if (scores[player] >= 1000) {
        break
      }
      player = (player + 1) % positions.length
    }
    const min = Math.min.apply(Math, scores)
    log({rolls, min, p: min * rolls})
    return 0
  }
  test([{
    input: [4, 8],
    output: 0,
    calculate
  }, {
    input: [8, 10],
    output: 0,
    calculate
  }])
}

exports.part2 = (lines, log, test) => {
  const calculateBottomUp = (positions) => {






















    return 0
  }
  const expected = [444356092776315, 341960390180808]
  const calculateTopDown = (startingPositions) => {
    const cache = {}
    const rolls = []
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
          rolls.push({sum: i + j + k, key: String([i, j, k])})
        }
      }
    }
    const maxPosition = 10
    const getWins = ({lastPlayer, lastRoll, scores, positions}) => {
      const key = lastPlayer + '-' + lastRoll.key + '-' + scores[0] + '-' + scores[1] + '-' + positions[0] + '-' + positions[1]
      if (cache[key] !== undefined) {
        return cache[key]
      }

      scores = scores.slice()
      positions = positions.slice()
      const lastScore = positions[lastPlayer]

      scores[lastPlayer] -= lastScore
      if (scores[lastPlayer] < 0) {
        cache[key] = 0
        return cache[key]
      }
      positions[lastPlayer] = (maxPosition + (positions[lastPlayer] - 1) - lastRoll.sum)%10 + 1
      if (scores[0] === 0 && scores[1] === 0) {
        if (lastPlayer === 0 && positions[0] === startingPositions[0] && positions[1] === startingPositions[1]) {
          cache[key] = 1
          return cache[key]
        }
      }
      lastPlayer = (lastPlayer + 1) % 2

      let wins = 0
      ;rolls.forEach(lastRoll => {
        wins += getWins({lastPlayer, lastRoll, scores, positions})
      })
      cache[key] = wins
      return cache[key]
    }
    rangeFromTo(0, 1).forEach(winningPlayer => {
      let wins = 0
      rangeFromTo(1, 10).forEach(player1EndingPosition => {
        rangeFromTo(1, 10).forEach(player2EndingPosition => {
          rangeFromTo(0, 20).forEach(losingScore => {
            ;rolls.forEach(lastRoll => {
              const lastScore = winningPlayer === 0 ? player1EndingPosition : player2EndingPosition
              rangeFromTo(21, 20 + lastScore).forEach(winningScore => {
                const scores = winningPlayer === 0 ? [winningScore, losingScore] : [losingScore, winningScore]
                wins += getWins({lastPlayer: winningPlayer, lastRoll, scores, positions: [player1EndingPosition, player2EndingPosition]})
              })
            })
          })
        })
      })
      log({winningPlayer, actualWins__: wins, expectedWins: expected[winningPlayer], cache_______: Object.keys(cache).length})
    })
    return 0
  }
  const calculate = calculateTopDown
      /*




    let nextRoll = 0
    const roll = () => {
      const r = nextRoll
      nextRoll = (nextRoll + 1) % 100
      return r + 1
    }
    positions.forEach((p, i) => {
      positions[i] = p - 1
    })

    let player = 0
    const scores = []
    let rolls = 0
    while (true) {
      positions[player] = (positions[player] + roll()) % 10
      positions[player] = (positions[player] + roll()) % 10
      positions[player] = (positions[player] + roll()) % 10
      scores[player] = (scores[player] || 0) + (positions[player] + 1)
      rolls += 3
      if (scores[player] >= 21) {
        break
      }
      player = (player + 1) % positions.length
    }
    const min = Math.min.apply(Math, scores)
    log({rolls, min, p: min * rolls})
    return 0
  */
  test([{
    input: [4, 8],
    output: 0,
    calculate
  }, {
    input: [8, 10],
    output: 0,
    calculate
  }])
}
