var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parse = require('../');

function dir(source) {
  return source === "up" ? 1 : -1;
}

vows.describe('parse.name').addBatch({
  "A1": function() {
    assert.equal(parse('A1').direction, dir(teoria.interval('A1')));
    assert.equal(parse('A1').semitones, 1);
  },
  "A-1": function() {
    assert.equal(parse('A-1').direction, dir(teoria.interval('A-1')));
    assert.equal(parse('A-1').semitones, -1);
  },
  "d1": function() {
    assert.equal(parse('d1').direction, dir(teoria.interval('d1')));
    assert.equal(parse('d1').semitones, teoria.interval('d1').semitones());
  },
  "d-1": function() {
    assert.equal(parse('d-1').direction, dir(teoria.interval('d-1')));
    assert.equal(parse('d-1').semitones, teoria.interval('d-1').semitones());
  },
  "d2": function() {
    assert.equal(parse('d2').direction, dir(teoria.interval('d2')));
    assert.equal(parse('d2').semitones, teoria.interval('d2').semitones());
  },
  "d-2": function() {
    assert.equal(parse('d-2').direction, dir(teoria.interval('d-2')));
    assert.equal(parse('d-2').semitones, teoria.interval('d-2').semitones());
  },
}).export(module);
