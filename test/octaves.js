var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parse = require('../');
var data = require('./intervals.json');

function assertOctavesOf(intervals) {
  return function() {
    for(var name of intervals) {
      result = parse(name).octaves;
      expected = teoria.interval(name).octaves();
      assert(result == expected,
        "octaves of " + name + " should " + expected + " but was " + result);
    }
  }
}

vows.describe('parse.octaves').addBatch({
  "octaves of simples": assertOctavesOf(data.simples),
  "octaves of compound": assertOctavesOf(data.compound),
  "octaves of smples down": assertOctavesOf(data.simplesDown),
  "octaves of compound down": assertOctavesOf(data.compoundDown),
  "octaves of over": assertOctavesOf(data.over),
}).export(module);
