var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parse = require('../');
var data = require('./intervals.json');

function assertionsFor(intervals) {
  return function() {
    for(var name of intervals) {
      result = parse(name).number;
      expected = teoria.interval(name).number();
      assert(result == expected,
        "number of " + name + " should " + expected + " but was " + result);
    }
  }
}

vows.describe('parse.number').addBatch({
  "number of simples": assertionsFor(data.simples),
  "number of compound": assertionsFor(data.compound),
  "number of smples down": assertionsFor(data.simplesDown),
  "number of compound down": assertionsFor(data.compoundDown),
  "number of over": assertionsFor(data.over),
}).export(module);
