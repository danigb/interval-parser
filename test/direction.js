var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parseInterval = require('../');
var data = require('./intervals.json');

function assertionsFor(intervals) {
  return function() {
    for(var name of intervals) {
      result = parseInterval(name).direction == "-1" ? "down" : "up";
      expected = teoria.interval(name).direction();
      assert(result == expected,
        "direction of " + name + " should " + expected + " but was " + result);
    }
  }
}

vows.describe('parseInterval.direction').addBatch({
  "direction of simples": assertionsFor(data.simples),
  "direction of compound": assertionsFor(data.compound),
  "direction of smples down": assertionsFor(data.simplesDown),
  "direction of compound down": assertionsFor(data.compoundDown),
  "direction of over": assertionsFor(data.over)
}).export(module);
