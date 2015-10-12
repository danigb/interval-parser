# interval-parser

Minimal and fast music interval parser for javascript. Can convert from string to interval array or from interval array to string:

```js
var interval = require('interval-parser');
interval.parse('4P') // => [3, 0, 0]
interval.str([3, 0, 0]) // => '4P'
```

#### Interval string

The interval string can be in two different formats:

- As interval (num + quality): `'1P' '-3M' '5P'` and `'-13A'` are valid intervals
- As scale degree (num + accidentals): `'2b' '4#' '-9b'` and `'7'` are valid intervals

__¿Why the string representation is different from teoria?__

In the excellent [teoria](https://github.com/saebekassebil/teoria/) library, the intervals are represented with the quality before the number, for example `'M3'` (instead of `'3M'`). It has two problems:

- There's no easy way to distinguish notes from intervals.
- Looking at the string `'A2'` there's no way to know if its an interval or a pitch

#### Interval array

The interval array is an array of 3 integers with the form `[num, alteration, octave]` where:

- __num__: is a positive integer between 0 to 6 to represents simple interval numbers
- __alteration__: an integer with the interval alteration (0 means natural interval)
- __octave__: (Optional) the number of octaves the interval spawns. It can be negative to represent descendent intervals.

The interval array is equivalent to the pitch array in [pitch-parser](https://github.com/danigb/pitch-parser).

Note that since num is always positive, descending intervals are always stored inverted (with the octave negative):

```js
interval.parse('-2M') // => [6, -1, -1]
interval.parse('7m') // => [6, -1, 0]
```

## API

<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="parse"><span class="type-signature"></span>parse<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Get array interval representation from an interval string</p>
<p>The interval string can be in two different formats:
- As interval (num + quality): <code>'1P' '3M' '5P' '13A'</code> are valid intervals
- As scale degree (alterations + num): <code>'b2' '#4' 'b9'</code> are valid intervals</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/interval-parser/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/interval-parser/blob/master/index.js#L14">lineno 14</a>
</li>
</ul></dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>parse('1P') // => [0, 0, 0]
parse('2m') // => [0, -1, 0]
parse('1') // same as parse('1P')
parse('b2') // same as parse('2m')</code></pre>
</dd>
<dt>
<h4 class="name" id="str"><span class="type-signature"></span>str<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Get the interval (string) from an interval array</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/interval-parser/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/interval-parser/blob/master/index.js#L63">lineno 63</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->
