'use strict'

var notation = require('a-pitch/notation')

/**
 * Converts between interval strings and [array notation](https://github.com/danigb/a-pitch)
 *
 * The interval string can be in two different formats:
 *
 * - As interval (num + quality): `'1P' '3M' '5P' '13A'` are valid intervals
 * - As scale degree (alterations + num): `'b2' '#4' 'b9'` are valid intervals
 *
 * The array notation is an array in the form `[num, alter, oct]`. See [a-pitch](https://github.com/danigb/a-pitch)
 * for more infor about array notation.
 *
 * @param {String|Array} interval - the interval in either string or array notation
 * @return {Array|String} the interval (as string if was array, as array if was string).
 * null if not a valid array
 *
 * @example
 * var interval = require('interval-parser')
 * interval('3M') // => [2, 0, 1]
 * interval([2, 0, 1]) // => '3M'
 *
 * @example // parse strings
 * interval('1P') // => [0, 0, 0]
 * interval('2m') // => [0, -1, 0]
 * interval('1') // same as interval('1P')
 * interval('5b') // same as interval('5d')
 * interval('2b') // same as interval('2m')
 *
 * @example // build strings
 * interval.build([1, 0, 0]) // => '2M'
 * interval.build([1, 0, 1]) // => '9M'
 */
module.exports = notation(parse, build)

var INTERVAL = /^([-+]?)(\d+)(d{1,4}|m|M|P|A{1,4}|b{1,4}|#{1,4}|)$/
var QALT = {
  P: { dddd: -4, ddd: -3, dd: -2, d: -1, P: 0, A: 1, AA: 2, AAA: 3, AAAA: 4 },
  M: { ddd: -4, dd: -3, d: -2, m: -1, M: 0, A: 1, AA: 2, AAA: 3, AAAA: 4 }
}
var ALTER = {
  P: ['dddd', 'ddd', 'dd', 'd', 'P', 'A', 'AA', 'AAA', 'AAAA'],
  M: ['ddd', 'dd', 'd', 'm', 'M', 'A', 'AA', 'AAA', 'AAAA']
}
var TYPES = 'PMMPPMM'

/**
 * Parses an interval string and returns [a-pitch](https://github.com/danigb/a-pitch) array
 *
 * The interval string can be in two different formats:
 *
 * - As interval (num + quality): `'1P' '3M' '5P' '13A'` are valid intervals
 * - As scale degree (alterations + num): `'b2' '#4' 'b9'` are valid intervals
 *
 * @param {String} str - the interval string
 * @return {Array} the a-pitch representation
 *
 * @example
 * var interval = require('interval-parser')
 * interval.parse('1P') // => [0, 0, 0]
 * interval.parse('2m') // => [0, -1, 0]
 * interval.parse('1') // same as interval.parse('1P')
 * interval.parse('5b') // same as interval.parse('5d')
 * interval.parse('2b') // same as interval.parse('2m')
 */
function parse (str) {
  var m = INTERVAL.exec(str)
  if (!m) return null
  var dir = m[1] === '-' ? -1 : 1
  var num = +m[2] - 1

  var simple = num % 7
  var oct = dir * Math.floor(num / 7)
  var type = TYPES[simple]

  var alt
  if (m[3] === '') alt = 0
  else if (m[3][0] === '#') alt = m[3].length
  else if (m[3][0] === 'b') alt = -m[3].length
  else {
    alt = QALT[type][m[3]]
    if (typeof alt === 'undefined') return null
  }

  // if descending, invert it and octave lower
  if (dir === -1) {
    alt = type === 'P' ? -alt : -(alt + 1)
    if (simple !== 0) {
      simple = 7 - simple
      oct--
    }
  }
  return [simple, alt, oct]
}

/*
 * Convert from an [a-pitch](https://github.com/danigb/a-pitch) to an interval string
 *
 * @param {Array} interval - the interval [a-pitch](https://github.com/danigb/a-pitch) array
 * @return {String} the interval string
 *
 * @example
 * var interval = require('interval-parser')
 * interval.build([1, 0, 0]) // => '2M'
 */
function build (i) {
  if (!i || !Array.isArray(i)) return null
  var t = TYPES[Math.abs(i[0]) % 7]
  var n = number(i)
  var alt = i[1]
  if (n < 0) alt = t === 'P' ? -alt : -(alt + 1)
  var q = ALTER[t][4 + alt]
  if (!q) return null
  return n + q
}

function number (i) {
  var simple = (i[0] % 7) + 1
  if (i[2] === null) return simple
  var dir = i[2] < 0 ? -1 : 1
  var oct = Math.abs(i[2])
  if (dir < 0) {
    simple = 9 - simple
    oct--
  }
  return dir * (simple + 7 * oct)
}
