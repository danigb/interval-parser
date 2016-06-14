var test = require('tape')
var parser = require('.')

function map (fn, str) { return str.split(' ').map(fn) }

test('parse', function (t) {
  t.deepEqual(parser.parse('3M'), { num: 3, q: 'M', dir: 1,
    simple: 3, type: 'M', alt: 0, oct: 0, semitones: 4 })
  t.deepEqual(parser.parse('-9m'), { num: 9, q: 'm', dir: -1,
    simple: 2, type: 'M', alt: -1, oct: 1, semitones: -13 })
  t.deepEqual(map(parser.parse, '1P 2M 3M 4P 5P 6M 7M'),
    map(parser.parse, 'P1 M2 M3 P4 P5 M6 M7'))
  t.end()
})

test('alt', function (t) {
  t.equal(parser.alt('2d'), -2)
  var maj = function (a) { return parser.alt('2' + a) }
  t.deepEqual(map(maj, 'dddd ddd dd d m M A AA AAA AAAA'),
    [ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4 ])
  var per = function (a) { return parser.alt('1' + a) }
  t.deepEqual(map(per, 'dddd ddd dd d P A AA AAA AAAA'),
    [ -4, -3, -2, -1, 0, 1, 2, 3, 4 ])
  t.end()
})

test('semitones', function (t) {
  t.deepEqual(map(parser.semitones, 'P1 M2 M3 P4 P5 M6 M7 P8'), [ 0, 2, 4, 5, 7, 9, 11, 12 ])
  t.deepEqual(map(parser.semitones, '-1P -2m -3m -4P -5P -6m -7m -8P'), [ 0, -1, -3, -5, -7, -8, -10, -12 ])
  t.end()
})

test('type', function (t) {
  t.deepEqual(map(parser.type, 'P1 M2 M3 P4 P5 M6 M7 P8'), [ 'P', 'M', 'M', 'P', 'P', 'M', 'M', 'P' ])
  t.deepEqual(map(parser.type, '-1P -2m -3m -4P -5P -6m -7m -8P'), [ 'P', 'M', 'M', 'P', 'P', 'M', 'M', 'P' ])
  t.end()
})
