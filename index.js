/*
 * parseInterval
 *
 * Parse a interval and returns an object with:
 * - name
 * - quality
 * - direction
 * - number
 * - type
 * - semitones
 * - octaves
 * - simple
 */
var INTERVAL = /^([dmPMA])(-{0,1})(\d{1,2})$/;
function parseInterval(interval) {
  if(isIntervalObj(interval)) {
    return validate(interval);
  } else if (typeof(interval) == 'string') {
    var m = INTERVAL.exec(interval.trim());
    if(m) {
      return validate({name: interval, quality: m[1],
        direction: m[2], number: +m[3]});
    }
  }
  return null;
}

function isIntervalObj(interval) {
  return typeof(interval.name) !== 'undefined'
    && typeof(interval.quality) !== 'undefined'
    && typeof(interval.direction) !== 'undefined'
    && typeof(interval.number) !== 'undefined';
}

function validate(i) {
  i.octaves = i.octaves || octaves(i);
  i.simpleNum = i.simpleNum || simpleNum(i);
  i.simple = i.quality + i.direction + i.simpleNum;
  i.type = i.type || type(i);
  i.semitones = i.semitones || semitones(i);
  return i;
}

function simpleNum(i) {
  if(i.number > 8) {
    var num = (i.number - 1) % 7 + 1;
    if (num == 1) num = 8;
    return num;
  } else {
    return i.number;
  }
}

function octaves(i) {
  if(i.number === 1) return 0;
  else return Math.floor((i.number - 2) / 7);
}

 var SEMITONES = {"d1": -1, "d2": 0, "d3": 2, "d4": 4, "d5": 6,
   "d6": 7, "d7": 9, "d8": 11}
 var EXTRA = {
   "minor": {"d": 0, "m": 1, "M": 2, "A": 3 },
   "perfect": {"d": 0, "P": 1, "A": 2 }
 };

function semitones(i) {
  var semi = SEMITONES["d" + i.simpleNum];
  var extra = EXTRA[i.type][i.quality];
  var oct = i.octaves * 12;
  var dir = i.direction === '-1' ? -1 : 1;
  return dir * (semi + extra + oct);
}


function type(i) {
  var num = i.simpleNum;
  if(num === 1 || num === 4 || num === 5 || num === 8) {
    return "perfect";
  } else {
    return "minor";
  }
}

if (typeof module === "object" && module.exports) module.exports = parseInterval;
else i.parseInterval = parseInterval;
