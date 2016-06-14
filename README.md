# interval-parser [![npm](https://img.shields.io/npm/v/interval-parser.svg?style=flat-square)](https://www.npmjs.com/package/interval-parser)

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard) [![license](https://img.shields.io/npm/l/interval-parser.svg?style=flat-square)](https://www.npmjs.com/package/interval-parser)

Parses music intervals in shorthand notation:

```js
var parser = require('interval-parser')
parser.parse('P4')
// => { num: 4, q: 'P', dir: 1, simple: 4, type: 'P', alt: 0, oct: 0, semitones: 5 }

// accepts reverse shorthand notation
parser.parse('6m')
// => { num: 6, q: 'm', dir: 1, simple: 6, type: 'M', alt: -1, oct: 0, semitones: 8 }
```

If you only need a property, you can use a function with the property name:

```js
parser.semitones('6m') // => 8
parser.simple('9M') // => 2
```

#### Interval string format

It accepts two different interval string formats:

- In standard shorthand notation: `quality+[dir]+num`. Examples: 'P8', 'M-3'
- In reverse shorthand notation: `[dur]+num+quality`. Examples: '8P', '-3M'

## API

### `parse(str)`

Parse a string with an interval in [shorthand notation](https://en.wikipedia.org/wiki/Interval_(music)#Shorthand_notation)
and returns an object with interval properties

#### Parameters

* `str` **`String`** the string with the interval


#### Examples

```js
var parser = require('interval-parser')
parser.parse('P4')
// => { num: 4, q: 'P', dir: 1, simple: 4, type: 'P', alt: 0, oct: 0, semitones: 5 }
// accepts reverse shorthand notation
parser.parse('6m')
// => { num: 6, q: 'm', dir: 1, simple: 6, type: 'M', alt: -1, oct: 0, semitones: 8 }
```

Returns an object with interval properties or null if not valid interval string:

- `num`: the interval number
- `q`: the interval quality string (M is major, m is minor, P is perfect...)
- `simple`: the simplified number (from 1 to 7)
- `dir`: the interval direction (1 ascending, -1 descending)
- `type`: the interval type (P is perfectable, M is majorable)
- `alt`: the alteration, a numeric representation of the quality
- `oct`: the number of octaves the interval spans. 0 for simple intervals.
- `semitones`: the size of the interval in semitones

### Helper functions

For each property of the interval there's a function with the same name that returns only that property:

```js
parser.num('9m') // => 9
parser.q('9m') // => 'm'
parser.simple('9m') // => 2
parser.dir('9m') // => 1
parser.type('9m') // => 'M'
parser.alt('9m') // => -1
parser.oct('9m') // => 1
parser.semitones('9m') // => 13
```

## License

MIT License
