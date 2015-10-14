var vows = require('vows')
var assert = require('assert')
var interval = require('../')

function intervals (list) {
  return list.split(' ').map(interval).map(interval).join(' ')
}

vows.describe('interval-parser').addBatch({
  'parse': {
    'parse ascending intervals': function () {
      assert.deepEqual(interval.parse('1P'), [0, 0, 0])
      assert.deepEqual(interval.parse('5P'), [4, 0, 0])
      assert.deepEqual(interval.parse('8P'), [0, 0, 1])
      assert.deepEqual(interval.parse('2M'), [1, 0, 0])
      assert.deepEqual(interval.parse('7m'), [6, -1, 0])
      assert.deepEqual(interval.parse('5A'), [4, 1, 0])
      assert.deepEqual(interval.parse('9m'), [1, -1, 1])
      assert.deepEqual(interval.parse('9AAAA'), [1, 4, 1])
      assert.deepEqual(interval.parse('11dddd'), [3, -4, 1])
    },
    'parse descending intervals': function () {
      assert.deepEqual(interval.parse('-1P'), [0, 0, 0])
      assert.deepEqual(interval.parse('-2M'), [6, -1, -1])
      assert.deepEqual(interval.parse('-9M'), [6, -1, -2])
      assert.deepEqual(interval.parse('-1P'), [0, 0, 0])
      assert.deepEqual(interval.parse('-8P'), [0, 0, -1])
      assert.deepEqual(interval.parse('-2A'), [6, -2, -1])
      assert.deepEqual(interval.parse('-8A'), [0, -1, -1])
    },
    'parse degree': function () {
      assert.deepEqual('1 2 3 4 5 6 7'.split(' ').map(interval.parse),
        '1P 2M 3M 4P 5P 6M 7M'.split(' ').map(interval.parse))
      assert.deepEqual('-1 -2 -3 -4 -5 -6 -7'.split(' ').map(interval.parse),
        '-1P -2M -3M -4P -5P -6M -7M'.split(' ').map(interval.parse))
    },
    'malformed': function () {
      assert.equal(interval.parse('1M'), null)
    }
  },
  'interval.stringify': {
    'edge cases': function () {
      assert.equal(interval.stringify([1, -1, 0]), '2m')
      assert.equal(interval.stringify([1, -1, 1]), '9m')
      assert.equal(interval.stringify([6, 0, 0]), '7M')
      assert.equal(interval.stringify([6, 0, -1]), '-2m')
      assert.equal(interval.stringify([0, -1, -1]), '-8A')
      assert.equal(interval.stringify([2, -1, -1]), '-6M')
      assert.equal(interval.stringify([0, 1, -1]), '-8d')
      assert.equal(interval.stringify([0, -1, -4]), '-29A')
    },
    'without octaves': function () {
      assert.equal(interval.stringify([1, -1, null]), '2m')
      assert.equal(interval.stringify([6, 1, null]), '7A')
      assert.equal(interval.stringify([7, 1, null]), '1A')
      assert.equal(interval.stringify([9, -1, null]), '3m')
      assert.equal(interval.stringify([3, -1, null]), '4d')
    },
    'intervals': function () {
      assert.equal(intervals('1P 2M 3M 4P 5P 6M 7M'), '1P 2M 3M 4P 5P 6M 7M')
      assert.equal(intervals('8P 9M 10M 11P 12P 13M 14M'), '8P 9M 10M 11P 12P 13M 14M')
      assert.equal(intervals('-1P -2M -3M -4P -5P -6M -7M'), '1P -2M -3M -4P -5P -6M -7M')
      assert.equal(intervals('-8P -9M -10M -11P -12P -13M -14M'), '-8P -9M -10M -11P -12P -13M -14M')
    },
    'degrees': function () {
      assert.equal(intervals('1 2 3 4 5 6 7'), '1P 2M 3M 4P 5P 6M 7M')
      assert.equal(intervals('1b 2b 3b 4b 5b 6b 7b'), '1d 2m 3m 4d 5d 6m 7m')
      assert.equal(intervals('1# 2# 3# 4# 5# 6# 7#'), '1A 2A 3A 4A 5A 6A 7A')
      assert.equal(intervals('8b 9b 10b 11b 12b 13b 14b'), '8d 9m 10m 11d 12d 13m 14m')
    }
  }
}).export(module)
