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

Parse the given interval and returns an object with information.
The interval can be a simple string ("M2", "P-8", "d3") or an
object with { quality, direction, number }.

Currently, no validation is performed ("P2" would be parsed without errors).

The returned object has the following attribues:

- __name__: the name of the interval
- __quality__: the quality of the interval as String (only one letter)
- __direction__: the direction of the interval: 1 or -1
- __number__: the number of the interval (always positive)
- __octaves__: number of octaves
- __semitones___: number of semitones. Can be positive or negative.
- __type__: type of the interval. Can be "perfect" or "minor".
- __simple__: the number of the simplified interval

```js
parse('M9').simple;    // => 2
parse('A13').simple;   // => 6
parse('P5').simple;    // => 5
parse('P-15').simple;  // => 8
```

## License

MIT License
