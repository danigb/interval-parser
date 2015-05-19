var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parse = require('../');
var data = require('./intervals.json');

function assertionsFor(intervals) {
  return function() {
    for(var name of intervals) {
      result = parse(name).type;
      expected = teoria.interval(name).type();
      assert(result == expected,
        "type of " + name + " should " + expected + " but was " + result);
    }
  }
}

vows.describe('parse.type').addBatch({
  "type of simples": assertionsFor(data.simples),
  "type of compound": assertionsFor(data.compound),
  "type of smples down": assertionsFor(data.simplesDown),
  "type of compound down": assertionsFor(data.compoundDown),
  "type of over": assertionsFor(data.over),
}).export(module);
