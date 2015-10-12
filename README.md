# interval-parser

[![Build Status](https://travis-ci.org/danigb/interval-parser.svg?branch=master)](https://travis-ci.org/danigb/interval-parser)
[![Code Climate](https://codeclimate.com/github/danigb/interval-parser/badges/gpa.svg)](https://codeclimate.com/github/danigb/interval-parser)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Minimal and fast music interval parser for javascript. Convert from interval string to [a-pitch](https://github.com/danigb/a-pitch) and back.

```js
var interval = require('interval-parser');
interval.parse('4P') // => [3, 0, 0]
interval.str([3, 0, 0]) // => '4P'
```

#### Interval string format

The interval string can be in two different formats:

- As interval (num + quality): `'1P' '-3M' '5P'` and `'-13A'` are valid intervals
- As scale degree (num + accidentals): `'2b' '4#' '-9b'` and `'7'` are valid intervals

__¿Why the string representation is different from teoria?__

In the excellent [teoria](https://github.com/saebekassebil/teoria/) library, the intervals are represented with the quality before the number, for example `'M3'` (instead of `'3M'`). It has two problems:

- There's no easy way to distinguish notes from intervals.
- Looking at the string `'A2'` there's no way to know if its an interval or a pitch

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
<h4 class="name" id="parse"><span class="type-signature"></span>parse<span class="signature">(str)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get array interval representation from an interval string</p>
<p>The interval string can be in two different formats:
- As interval (num + quality): <code>'1P' '3M' '5P' '13A'</code> are valid intervals
- As scale degree (alterations + num): <code>'b2' '#4' 'b9'</code> are valid intervals</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>str</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>the interval string</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/interval-parser/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/interval-parser/blob/master/index.js#L33">lineno 33</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<ul>
<li>
<div class="param-desc">
<p>the array pitch representation</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
</li>
<li>
<div class="param-desc">
<p>an array in the form [step, alt, oct]</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
</li>
</ul>
<h5>Example</h5>
<pre class="prettyprint"><code>parse('1P') // => [0, 0, 0]
parse('2m') // => [0, -1, 0]
parse('1') // same as parse('1P')
parse('5b') // same as parse('5d')
parse('2b') // same as parse('2m')</code></pre>
</dd>
<dt>
<h4 class="name" id="str"><span class="type-signature"></span>str<span class="signature">(interval)</span><span class="type-signature"> &rarr; {String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get the interval (string) from an interval array</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the interval array</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/interval-parser/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/interval-parser/blob/master/index.js#L72">lineno 72</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the interval string</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">String</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>interval.str([1, 0, 0]) // => '2M'</code></pre>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT License
