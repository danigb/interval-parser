var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parse = require('../');
var data = require('./intervals.json');

function assertionsFor(intervals) {
  return function() {
    for(var name of intervals) {
      result = parse(name).simple;
      expected = teoria.interval(name).simple().toString();
      assert(result == expected,
        "simple of " + name + " should " + expected + " but was " + result);
    }
  }
}

vows.describe('parse.simple').addBatch({
  "simple of simples": assertionsFor(data.simples),
  "simple of compound": assertionsFor(data.compound),
  "simple of over": assertionsFor(data.over),
  "simple of smples down": assertionsFor(data.simplesDown),
  "simple of compound down": assertionsFor(data.compoundDown),
}).export(module);
