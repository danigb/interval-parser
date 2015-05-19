var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parse = require('../');
var data = require('./intervals.json');

function assertionsFor(intervals) {
  return function() {
    for(var name of intervals) {
      result = parse(name).quality;
      expected = teoria.interval(name).quality();
      assert(result == expected,
        "quality of " + name + " should " + expected + " but was " + result);
    }
  }
}

vows.describe('parse.quality').addBatch({
  "quality of simples": assertionsFor(data.simples),
  "quality of compound": assertionsFor(data.compound),
  "quality of smples down": assertionsFor(data.simplesDown),
  "quality of compound down": assertionsFor(data.compoundDown),
  "quality of over": assertionsFor(data.over),
}).export(module);
