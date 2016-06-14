'use strict'

// shorthand tonal notation (with quality after number)
var IVL_TNL = '([-+]?)(\\d+)(d{1,4}|m|M|P|A{1,4})'
// standard shorthand notation (with quality before number)
var IVL_STR = '(AA|A|P|M|m|d|dd)([-+]?)(\\d+)'
var COMPOSE = '(?:(' + IVL_TNL + ')|(' + IVL_STR + '))'
var IVL_REGEX = new RegExp('^' + COMPOSE + '$')
var SIZES = [0, 2, 4, 5, 7, 9, 11]
var TYPES = 'PMMPPMM'

/**
 * Parse a string with an interval in [shorthand notation](https://en.wikipedia.org/wiki/Interval_(music)#Shorthand_notation)
 * and returns an object with interval properties
 *
 * @param {String} str - the string with the interval
 * @return {Object} an object properties or null if not valid interval string
 * The returned object contains:
 * - `num`: the interval number
 * - `q`: the interval quality string (M is major, m is minor, P is perfect...)
 * - `simple`: the simplified number (from 1 to 7)
 * - `dir`: the interval direction (1 ascending, -1 descending)
 * - `type`: the interval type (P is perfectable, M is majorable)
 * - `alt`: the alteration, a numeric representation of the quality
 * - `oct`: the number of octaves the interval spans. 0 for simple intervals.
 * - `semitones`: the size of the interval in semitones
 * @example
 * var parser = require('interval-parser')
 * parser.parse('P4')
 * // => { num: 4, q: 'P', dir: 1, simple: 4, type: 'P', alt: 0, oct: 0, semitones: 5 }
 * // accepts reverse shorthand notation
 * parser.parse('6m')
 * // => { num: 6, q: 'm', dir: 1, simple: 6, type: 'M', alt: -1, oct: 0, semitones: 8 }
 */
function parse (str) {
  if (typeof str !== 'string') return null
  var m = IVL_REGEX.exec(str)
  if (!m) return null
  var i = { num: +(m[3] || m[8]), q: m[4] || m[6] }
  i.dir = (m[2] || m[7]) === '-' ? -1 : 1
  var step = (i.num - 1) % 7
  i.simple = step + 1
  i.type = TYPES[step]
  i.alt = alt(i.type, i.q)
  i.oct = Math.floor((i.num - 1) / 7)
  i.semitones = i.dir * (SIZES[step] + i.alt + 12 * i.oct)
  return i
}

function alt (t, q) {
  return (q === 'M' && t === 'M') ? 0
    : (q === 'P' && t === 'P') ? 0
    : (q === 'm' && t === 'M') ? -1
    : (/^A+$/.test(q)) ? q.length
    : (/^d+$/.test(q)) ? (t === 'P' ? -q.length : -q.length - 1)
    : null
}

var parser = { parse: parse }
var FNS = ['num', 'q', 'dir', 'simple', 'type', 'alt', 'oct', 'semitones']
FNS.forEach(function (name) {
  parser[name] = function (src) {
    var p = parse(src)
    return p ? p[name] : null
  }
})

module.exports = parser
