const parse = (lines, log) => {
  const programs = []
  lines.forEach(l => {
    const [op, a, b] = l.split(' ')
    if (op === 'inp') {
      programs.push([])
    } else {
      const prog = programs[programs.length - 1]
      if (b) {
        prog.push({op, a, b})
      } else {
        prog.push({op, a})
      }
    }
  })
  return programs
}
exports.part1 = (lines, log) => {
  const programs = parse(lines, log)
  const differentBs = []
  programs[0].forEach(({op, a, b}, i) => {
    programs.forEach((program)  => {
      const {op: op2, a: a2, b: b2} = program[i]
      if (op2 !== op || a2 !== a) {
        throw 2
      }
      if (b2 !== b) {
        let d = differentBs.find(a => a.i === i)
        if (d) {
        } else {
          differentBs.push({i, op, a})
        }
        //log({i, b, b2, programI})
      }
    })
  })
  differentBs.forEach(bs => {
    bs.bs = []
    programs.forEach((program)  => {
      bs.bs.push(program[bs.i].b)
    })
  })
  differentBs[0].bs.forEach((_,i) => {
    if (i === 0) {
      log(['A', 'B', 'C'].map(x => x.padStart(4, ' ')).join(''));
    }
    log(differentBs.map(a => a.bs[i]).map(x => x.padStart(4, ' ')).join(''));
  })
  return
  const abcs = programs.map(program => {
    return {
      A: Number(program[3].b),
      B: Number(program[4].b),
      C: Number(program[14].b),
    }
  })
  log(abcs)
  log({differentBs, ops: differentBs.map(i => ({i, op: programs[0][i], b: programs.map((p, j) =>({j,b:p[i].b}))}))})
  const ops = {
    add: (a, b) => a + b,
    mul: (a, b) => a * b,
    div: (a, b) => {
      if (b === 0) {
        throw 'b zero'
      }
      return Math.floor(a / b)
    },
    eql: (a, b) => a === b ? 1 : 0,
    mod: (a, b) => {
      if (a < 0 || b <= 0) {
        throw 'bad mod args'
      }
      return a % b
    }
  }
  const run = (program, s) => {
    program.forEach(({op, a, b}) => {
      if (['x', 'y', 'z', 'w'].includes(b)) {
        b = s[b]
      }
      s[a] = ops[op](Number(s[a]), Number(b))
    })
  }
  let demo = `inp 0
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`
  demo = parse(demo.split('\n'))[0].slice(1)
  const s = {
    w: 5,
    x: 0,
    y: 0,
    z: 0,
  }
  const neq = (a, b) => a !== b ? 1 : 0
  const run2 = (program, s) => {
    const A = Number(program[3].b)
    const B = Number(program[4].b)
    const C = Number(program[14].b)
    // TODO check ops throws
    const M = Math.floor(s.z / A)
    const N = neq(M % 26 + B, s.w)
    s.z = M * (1 + 25 * N) + (s.w + C)*N
  }
  const findMax = () => {
    const n = '9'.repeat(14).split('').map(Number)
    let i = 0
    const isValid = () => {
      const s = {
        x: 0,
        y: 0,
        z: 0,
      }
      programs.forEach((program, i) => {
        s.w = n[i]
        run2(program, s)
      })
      i++
      if (i % 100000 === 0) {
        log(n.join('') + ' -> ' + s.z)
      }
      return s.z === 0
    }
    const isValid2 = () => {
      const z3 = (n[2] === n[3] - 6) ? (676 * n[0] + 26 * n[1] + n[2] + n[3] + 2990) : (26 * n[0] + n[1] + 114)
      const z4 = 26 * z3 + n[4] + 6
      const z6 = (n[5] === n[6] - 7) ? (26 * z3 + n[4] + 6) : (26 * z4 + n[6] + 1)
      const z7 = 26 * z6 + n[7] + 7
      const z9 = (n[8] === n[9] - 3) ? (26 * z6 + n[7] + 7) : (26 * z7 + n[8] + n[9] + 19)
      const N1 = n[10] + 9 === ((n[8] === (n[9] - 3)) ? (n[7] + 7) : ((n[8] + n[9] + 19) % 26))
      const z10 = N1 ? Math.floor(z9 / 26) : (z9 + n[10] + 8)
      const N2 = z10 % 26 === n[11] + 5
      const z11 = N2 ? Math.floor(z10 / 26) : (z10 + n[11] + 3)
      const N3 = z11 % 26 === n[12] + 2
      const z12 = N3 ? Math.floor(z11 / 26) : (z11 + n[12] + 1)
      const N4 = z12 % 26 === n[13] + 7
      const z13 = N4 ? Math.floor(z12 / 26) : (z12 + n[13] + 8)
      i++
      if (i % 10000000 === 0) {
        log(n.join('') + ' -> ' + z13)
      }
      return z13 === 0
    }
    const decrease = () => {
      for (let i = 13; i >= 0; i--) {
        n[i]--
        if (n[i] > 0) {
          break;
        }
        n[i] = 9
      }
    }
    while (!isValid2()) {
      decrease()
    }
    return n.join('')
  }
  return findMax()

    /*
  const isValid = (digitI, digit) => {
    const state = {
      w: digit,
      x: 0,
      y: 0,
      z: 0,
    }
    run(programs[digitI], state)
    //log({digit, state})
    return state.z === 0
  }

  const largest = []
  for (let i = 0; i < 14; i++) {
    const max = [9,8,7,6,5,4,3,2,1].find(digit => isValid(i, digit))
    if (max === undefined) {
      log('cannot ' + i)
    }
    largest.push(max)
  }
  return largest.join('')
  */
}

exports.part2 = (lines, log) => {
}
