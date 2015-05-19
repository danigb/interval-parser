var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parse = require('../');
var data = require('./intervals.json');

function assertionsFor(intervals) {
  return function() {
    for(var name of intervals) {
      result = parse(name).name;
      assert(name === result,
        "toArray of " + name + " should " + name + " but was " + result);
    }
  }
}

vows.describe('parse.name').addBatch({
  "name of simples": assertionsFor(data.simples),
  "name of compound": assertionsFor(data.compound),
  "name of smples down": assertionsFor(data.simplesDown),
  "name of compound down": assertionsFor(data.compoundDown),
  "name of over": assertionsFor(data.over),
}).export(module);
