var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parse = require('../');
var data = require('./intervals.json');

function assertionsFor(intervals) {
  return function() {
    for(var name of intervals) {
      result = parse(name).semitones;
      expected = teoria.interval(name).semitones();
      assert(result == expected,
        "semitones of " + name + " should " + expected + " but was " + result);
    }
  }
}

vows.describe('parse.semitones').addBatch({
  "semitones of simples": assertionsFor(data.simples),
  "semitones of compound": assertionsFor(data.compound),
  "semitones of smples down": assertionsFor(data.simplesDown),
  "semitones of compound down": assertionsFor(data.compoundDown),
  "semitones of over": assertionsFor(data.over),
}).export(module);
