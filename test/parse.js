var vows = require('vows'),
    assert = require('assert');

var teoria = require('teoria');
var parse = require('../');
var data = require('./intervals.json');

vows.describe('parse parse').addBatch({
  "parse itself": function() {
    i = parse('M2');
    assert(i === parse(i));
  }
}).export(module);
