# interval-parser

Parses music intervals in shorthand notation:

```js
var parser = require('interval-parser')
parser.parse('P4')
// => { num: 4, q: 'P', dir: 1, simple: 4, type: 'P', alt: 0, oct: 0, semitones: 5 }

// accepts reverse shorthand notation
parser.parse('6m')
// => { num: 6, q: 'm', dir: 1, simple: 6, type: 'M', alt: -1, oct: 0, semitones: 8 }
```

#### Interval string format

The interval string can be in two different formats:

- In standard shorthand notation: `quality+[dir]+num`. Examples: 'P8', 'M-3'
- In reverse shorthand notation: `[dur]+num+quality`. Examples: '8P', '-3M'

## License

MIT License
