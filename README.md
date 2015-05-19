# interval-parser

Minimal and fast music interval parser for javascript.

```js
var parser = require('interval-parser');
var interval = parse("P4");
interval.semitones; // => 5
```

If you want to parse notes see [note-parse](http://github.com/danigb/note-parse).
If you want to transpose notes see [note-pitch](http://github.com/danigb/note-pitch)

## Usage

With node: `npm install --save intervalo`.

#### parse(interval)

Parse the given interval and returns an object with information about
the interval. The interval can be a simple string ("M2", "P-8", "d3") or an
object with { quality, direction, number }. 

Currently, no validation is performed ("P2" would be parsed without errors).

The returned object has the following attribues:

- __quality__: the quiality of the interval as String (only one letter)
- __direction__: the direction of the interval: "" (up) or "-" (down)
- __number__: the number of the interval (always positive)
- __octaves__: number of octaves
- __semitones___: the number of semitones. Is positive for up intervals and negative otherwise.
- __type__: type of the interval. Can be "perfect" or "minor".
- __simple__: the simple interval name:

```js
parse('M9').simple;    // => "M2"
parse('A13').simple;   // => "A6"
parse('P5').simple;    // => "P5"
parse('P-15').simple;  // => "P-8"
```

## License

MIT License
