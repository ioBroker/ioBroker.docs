<!-- markdownlint-disable MD036 -->

# Vis 2 (o)various widgets

![Logo](admin/vis-2-widgets-ovarious.png)

![Number of Installations](http://iobroker.live/badges/vis-2-widgets-ovarious-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-2-widgets-ovarious-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vis-2-widgets-ovarious.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-ovarious)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-ovarious.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-ovarious)

[![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-ovarious.png?downloads=true)](https://nodei.co/npm/iobroker.vis-2-widgets-ovarious/)

This adapter contains various vis-2 widgets.

ok, actually, there is only one vis-2 widget, but some more are on my roadmap.

## JSON Template Widget

Using this widget, any data point with JSON data can be displayed as desired.
The display is done using a template format, which can be thought of as a combined form of HTML code + JavaScript + special tags that control the display of the JSON attributes.

### Attribute JSON datapoint

Selection of the data point with the corresponding JSON data.

#### Attribute Template

The template can be used to determine the appearance of the JSON data. All valid HTML tags (including CSS attributes in style tags) can be used in the template.
There are also special tags within which the JSON data is displayed and JavaScript instructions can be executed.

The template system works with certain tags.
The tags used have the following meaning

| `tag` | description                                                         |
| ----- | ------------------------------------------------------------------- |
| <%=   | The content of the contained expression / variable will be escaped. |
| <%-   | The content of the contained expression / variable is unescaped.    |
| <%    | No output, is used for enclosed javascript instructions             |
| %>    | is generally a closing tag that completes one of the previous ones  |

Everything that is outside of these tags is displayed exactly as it is or if it is HTML interpreted as HTML. (see e.g. the p-tag, div-tag, small-tag
Within the template you have 2 predefined variables available

The JSON data is passed to the template with the prefix data. In addition, the current widgetID is also available as a variable so that it can be specified in individual CSS instructions.

##### Example object

```json
{
  "onearray": ["one", "two"],
  "oneobject": {
    "attribute1": 1,
    "attribute2": 2
  },
  "onenumber": 123,
  "onetext": "onetwothree"
}
```

With the above example, attributes could be output as follows

```html
<%- data.onenumber %> <%- data.onetext %>
```

**Result**

```html
123 onetwothree
```

Arrays can be accessed via an index. The index always starts with 0. However, there are also fake arrays where the index does not start with 0 or even consists of text. Here the rules for objects apply. In the example above, this would be

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

##### Result

```html
one two
```

If you try to output an array directly without an index, the template outputs all elements separated by commas

```html
<%- data.onearray %>
```

**Result**

```html
one,two
```

Arrays can also consist of a collection of objects. The example here contains only a simple array. An example of arrays with objects will be given later.

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %> <% } %>
```

**Result**

```html
one two
```

**Objects** can contain individual attributes, arrays or objects again. This means that JSON data can be nested to any depth.

Attributes of an object can be addressed using dot notation or bracket notation. The dot notation only works if the attribute conforms to certain naming conventions (first character must be a letter, rest numbers or letters or underscore).
The bracket notation also works for attributes that do not conform to the naming convention.

**Dot notation**

```html
<%- data.oneobject.attribute1 %>
```

**Bracket notation**

```html
<%- data.oneobject["attribute1"] %>
```

**Result for both examples**

```html
1
```

Loop over the attributes of an object

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " + data.oneobject[prop] %> <% } %>
```

**Result**

```html
data.oneobject.attribute1 = 1 data.oneobject.attribute2 = 2
```

**Advanced use case**

In the examples above, only the pure output was covered. The template can now also be enriched with HTML tags to achieve a specific layout. Here is an example:

```html
<h3>Output</h3>
<style>
  .mycssclassproperty {
    color: green;
  }
  .mycssclassdata {
    color: red;
  }
</style>
<% for (var prop in data.oneobject) { %>
<div>
  <span class="mycssclassproperty"><%- "data.oneobject." + prop + " = " %></span>
  <span class="mycssclassdata"><%- data.oneobject[prop] %></span>
</div>
<% } %>
```

**Result**

```html
data.oneobject.attribute1 = 1 data.oneobject.attribute2 = 2
```

## Changelog

<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 2.0.0 (2025-10-06)

- mark JSON Template widget as deprecated. please use widgets from new adapter vis-jsontemplate
- the complete adapter is going to be deprecated
- fix an react element name

### 1.0.0 (2025-03-20)

- add package @alcalzone/release-script-plugin-manual-review as requested
- add async/await feature to the JSON template widget

### 0.1.9 (2024-09-09)

- fix wrong translation

### 0.1.8 (2024-07-28)

- improve icon
- remove versions from io-package.json

### 0.1.7 (2024-07-28)

- fix widget addressing

### 0.1.6 (2024-07-28)

- fix widget addressing

### 0.1.5 (2024-07-28)

- fix adapter checker issues

### 0.1.4 (2024-07-28)

- fix things from adapter checker

### 0.1.3 (2024-07-27)

- add icon
- add documentation

### 0.1.2 (2024-07-27)

- prepare release

### 0.1.1 (2024-07-27)

- fix widget addressing

### 0.1.0 (2024-07-27)

- initial Release

## License

The MIT License (MIT)

Copyright (c) 2025 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
