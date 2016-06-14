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
 * Return a regex for matching intervals in shorthand notation or inverse
 * shorthand notation.
 * @return {Regex}
 */
function regex () { return IVL_REGEX }

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
  i.alt = parseQ(i.type, i.q)
  i.oct = Math.floor((i.num - 1) / 7)
  i.semitones = i.dir * (SIZES[step] + i.alt + 12 * i.oct)
  return i
}

/**
 * Get an alteration number from an interval quality string.
 *
 * @param {Integer|String} num - the interval number or a string representing
 * the interval type ('P' or 'M')
 * @param {String} quality - the quality string
 * @return {Integer} the interval alteration
 * @example
 * parseQ(1, 'm') // => -1
 * parseQ(2, 'm') // => null (2 step interval can't be minor)
 * parseQ(4, 'P') // => 0
 * parseQ(6, 'P') // => null
 * // it works with interval types ('M' or 'P')
 * parseQ('M', 'm') // => -1 (for majorables, 'm' is -1)
 * parseQ('P', 'A') // => 1 (for perfectables, 'A' means 1)
 * parseQ('P', 'M') // => null (perfectable intervals can't be major)
 */
function parseQ (num, q) {
  var t = typeof num === 'number' ? TYPES[(num - 1) % 12] : num
  if (q === 'M' && t === 'M') return 0
  if (q === 'P' && t === 'P') return 0
  if (q === 'm' && t === 'M') return -1
  if (/^A+$/.test(q)) return q.length
  if (/^d+$/.test(q)) return t === 'P' ? -q.length : -q.length - 1
  return null
}

var parser = { regex: regex, parse: parse, parseQ: parseQ }
var FNS = ['num', 'q', 'dir', 'simple', 'type', 'alt', 'oct', 'semitones']
FNS.forEach(function (name) {
  parser[name] = function (src) {
    var p = parse(src)
    return p ? p[name] : null
  }
})

module.exports = parser
