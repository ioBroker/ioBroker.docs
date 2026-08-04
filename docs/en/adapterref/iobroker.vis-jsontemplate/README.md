# JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2

![Logo](admin/vis-jsontemplate.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-jsontemplate.svg)](https://www.npmjs.com/package/iobroker.vis-jsontemplate)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-jsontemplate.svg)](https://www.npmjs.com/package/iobroker.vis-jsontemplate)
![Number of Installations](https://iobroker.live/badges/vis-jsontemplate-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/vis-jsontemplate-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.vis-jsontemplate.png?downloads=true)](https://nodei.co/npm/iobroker.vis-jsontemplate/)

**Tests:** ![Test and Release](https://github.com/oweitman/ioBroker.vis-jsontemplate/workflows/Test%20and%20Release/badge.svg)

## Overview

Adapter to visualize JSON data and other data in Vis/Vis2.
You can customize the output of the data with a template system.
In the templates you can include HTML, CSS and Javascript.
The template system used was `ejs`.
You can try out the basic features here in the online playground.
<https://ionicabizau.github.io/ejs-playground>

The jsontemplate widget was previously available in the rssfeed (for vis1) and
vis-2-widgets-ovarious adapters. The widgets will be removed from these
adapters in the near future.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Configuration](#configuration)
- [vis and widgets](#vis-and-widgets)
    - [JSON Template](#json-template)
    - [Advanced use case](#advanced-use-case)
    - [More Use Cases](#more-use-cases)
- [Templatesystem](#templatesystem)
    - [Very Important Note for use in vis / vis-2](#very-important-note-for-use-in-vis--vis-2)
    - [Curly braces in CSS and JSON](#curly-braces-in-css-and-json)
    - [Use of setInterval](#use-of-setinterval)
    - [Developing templates with AI](#developing-templates-with-ai)
- [Tags](#tags)
- [Example object](#example-object)
- [Development and Debugging](#development-and-debugging)
    - [Vis1 Widgets](#vis1-widgets)
    - [Vis2 Widgets](#vis2-widgets)
- [Todo](#todo)
- [Changelog](#changelog)
- [License](#license)

## Installation

Install the adapter as normal from the stable repository.
If you want to test new features or bug fixes you can also install
the adapter from the beta repository. For Features and news,
please see the Test and Support thread for this adapter in the iobroker forum.

After Installation the adapter should then be displayed in the
adapter section in the iobroker. Sometimes it happens that the changes
are not visible, especially with web changes (widgets / configuration dialog),
the following command may have to be executed on the command line:

```bash
iobroker upload jsontemplate
```

In the right area in the line of the adapter, an instance can be
added using the plus button

## Configuration

This adapter does not have a configuration dialog in the admin area.

## vis and widgets

The following widgets actually exists

- [`JSON Template`](#json-template) - you can define a custom template
  to show any JSON-Data in vis.

### JSON Template

Using this widget, any data point with JSON data can be displayed as desired.
The display is done using a template format, which can be thought of as
a combined form of HTML code + JavaScript + CSS + special tags that control
the display of the JSON attributes.
JSONTemplate now supports async calls with await.

| Setting          | description                                                                                                                                                                                                                                                                       |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| json_template    | The template can be used to determine the appearance of the JSON data. All valid HTML tags (including CSS attributes in style tags) can be used in the template. There are also special tags within which the JSON data is displayed and JavaScript instructions can be executed. |
| json_oid         | Selection of the data point with the corresponding JSON data.                                                                                                                                                                                                                     |
| json_dpCount     | Number of data points to be made available in the template.                                                                                                                                                                                                                       |
| json_dp          | Datapoint ID to be made available.                                                                                                                                                                                                                                                |
| json_dp_variable | Optional JavaScript variable name. The variable contains the datapoint ID; the same name with `_value` appended contains its current value.                                                                                                                                       |
| json_scriptCount | Number of JavaScript URLs to be loaded                                                                                                                                                                                                                                            |
| json_script[]    | JavaScript URL to be loaded. See example below.                                                                                                                                                                                                                                   |
| json_cssCount    | Number of CSS URLs to be loaded.                                                                                                                                                                                                                                                  |
| json_css[]       | CSS URL to be loaded.                                                                                                                                                                                                                                                             |

For details on the template system, see chapter Template based on examples

Available data objects in the template:

| object/variable | description                                                              |
| --------------- | ------------------------------------------------------------------------ |
| widgetid        | widgetid of the widget.                                                  |
| widgetID        | widgetid of the widget.                                                  |
| data            | JSON object referenced by the datapoint in json_oid.                     |
| dp              | Array of the datapoint data, referenced by the additional datapoints     |
| widget          | internal widget data. object with all available widget settings          |
| style           | internal style data. object with all available widget style informations |

The additional datapoints can be accessed by
A) the name of the datapoint

```javascript
<%- dp["0_userdata.0.test"] %>
<%- dp["0_userdata.0.abc"] %>
```

B) Indexnumber of the datapoint (the number always start with 0)

```javascript
<%- dp[Object.keys(dp)[0]] %>
<%- dp[Object.keys(dp)[1]] %>
```

C) An optional variable name configured for the datapoint. For a datapoint
`0_userdata.0.selectwrite`, variable name `dpwrite`, and value `abc`:

```javascript
<%- dpwrite %>          <!-- 0_userdata.0.selectwrite -->
<%- dpwrite_value %>    <!-- abc -->
<%- dp[dpwrite] %>      <!-- abc -->
```

Example output of data, widget and style in the template

```ejs
<%- JSON
    .stringify(style, null, 4)
    .replace(/\n/g, '<br>')
    .replace(/ /g, '&nbsp;'); %>
```

If an error occurs, it is displayed in the widget and output to the
browser console (F12).

#### Advanced use case

In the examples above, only the pure output was covered.
The template can now also be enriched with HTML tags to achieve
a specific layout. Here is an example:

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

**Result:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

(In Markdown colors aren't visible)

#### More Use Cases

- [Use Case Async calls](documentation/usecase-asynccall.md)
- [Use Case loading scripts](documentation/usecase-loadingscripts.md)
- [Use Case Tasklist](documentation/usecase-tasklist.md)
- [Use Case public-transport](documentation/usecase-public-transport.md)
- [Use Case simple gauge](documentation/usecase-simplegauge.md)
- [Use Case Github Issues and PRs](documentation/usecase-githubissues.md)
- [Use Case FRITZ!Box call list](documentation/usecase-fritzbox-call-list.md)

## Templatesystem

### Very Important Note for use in vis / vis-2

#### Curly braces in CSS and JSON

The binding mechanism in vis / vis-2 uses the pattern `{ ... }`
to detect binding expressions within HTML.
For this reason, when specifying CSS or JSON, the curly braces must
always be placed on separate lines. Otherwise, the content of
the vis widget will be overwritten with `undefined`.

##### Example

```text
#<%- widgetid %> { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
```

must be written as follows:

```text
#<%- widgetid %> {
    height: 100%; display: flex; flex-direction: column; overflow: hidden;
}
```

#### Use of setInterval

Please do not use `setInterval`. Since the template is re-invoked
every time a data point changes, any existing `setInterval` calls
cannot be properly cleared. Consequently, an increasing number
of overlapping `setInterval` calls accumulate over time; this consumes RAM and
can lead to unpredictable side effects. While reloading the page can resolve
this issue, the code should not be implemented in this manner.
As an alternative, such scenarios should be implemented using `setTimeout`.

#### Developing templates with AI

To simplify the process of creating templates for everyone,
I have prepared detailed documentation including prompts and descriptions:

- [English](documentation/AI-EN.md)
- [German](documentation/KI-DE.md)

## Tags

The template system works with certain tags.
The tags used mean the following

| `tag` | description                                                         |
| ----- | ------------------------------------------------------------------- |
| <%=   | The content of the contained expression / variable will be escaped. |
| <%-   | The content of the contained expression / variable is unescaped.    |
| <%    | No output, is used for enclosed javascript instructions             |
| %>    | is generally a closing tag to complete one of the previous ones     |

Everything that is outside of these tags is displayed exactly as it is or
if it is HTML interpreted as HTML.
Within the template you have 2 predefined variables available

### Example object

For all the following examples the following json is used.

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

Attributes could be output as follows

**Template:**

```ejs
<%- data.onenumber %>
<%- data.onetext %>
```

**Result:**

```text
    123 onetwothree
```

Arrays can be accessed via an index. The index always starts with 0. However,
there are also fake arrays where the index does not start with 0 or
even consists of text. Here the rules for objects apply.
In the example above, this would be

**Template:**

```ejs
<%- data.onearray[0] %>
<%- data.onearray[1] %>
```

**Result:**

```text
    one two
```

If you try to output an array directly without an index,
the template outputs all elements separated by commas

**Template:**

```ejs
<%- data.onearray %>
```

**Result:**

```text
    one,two
```

Arrays can also consist of a collection of objects.
The example here contains only a simple array.
An example of arrays with objects will be given later.

**Template:**

```ejs
<% for (var i = 0; i < data.onearray.length ; i++ ) { %>
<%- data.onearray[i] %>
<% } %>
```

**Result:**

```text
    one two
```

**Objects** can contain individual attributes, arrays or objects again.
This means that JSON data can be nested to any depth.

Attributes of an object can be addressed using dot notation or bracket notation.
The dot notation only works if the attribute conforms to certain
naming conventions (first character must be a letter, rest numbers or letters or
underscore).
The bracket notation also works for attributes that do not conform to the
naming convention.

**Dot notation:**

**Template:**

```ejs
<%- data.oneobject.attribute1 %>
```

**Bracket notation:**

**Template:**

```ejs
<%- data.oneobject["attribute1"] %>
```

**Result for both examples:**

```text
    1
```

Loop over the attributes of an object

**Template:**

```ejs
<% for (var prop in data.oneobject) { %>
<%- "data.oneobject." + prop + " = " + data.oneobject[prop] %>
<% } %>
```

**Result:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Development and Debugging

### Vis1 Widgets

- Install dev-server
- Start dev-server with --noStart option
- On first start install additional adapter web and vis1
- start vscode launch configuration "vis-1 editor"
- if widgets are not available, upload adapter in expert mode on the adapter page
- now you can set breakpoints in vscode in the jsontemplate.js file
- if you change something in the js file the source must be compiled to
  the dist folder with npm run build-vis1widgets command.
- the dev-server uploads the changed files to iobroker, but for vis1 you have
  to execute the iob visdebug command to reload the widgets
- to translate additional entries in en.json use the translate-widgets-vis1 command

### Vis2 Widgets

- Install dev-server
- Open a new vscode window (2. instance)
- clone vis2 repository
- follow the instructions in the readme of the vis2 repository
  in chapter Development and Debugging. you don't have to fork the repository.
  we only need a running instance of the vis2 adapter
- start vis 2 with npm run start
- back in in the vscode instance of this adapter
- Start dev-server with --noStart option
- start vscode launch configuration "vis-2 editor"
- now you can set breakpoints in vscode in the jsontemplate.js file
- if you change something you don't have to do anything else,
  because vite supports hot reload. sometimes it is useful to reload vis2 with F5
- to translate additional entries in en.json use the translate-widgets-vis2 command

## Todo

- tbd

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 4.6.1 (2026-07-31)

- Improved error output.

### 4.6.0 (2026-07-30)

- some changes. see readme/below

#### Changes 2026-07-30

- add optional variable names to extra datapoints

### 4.5.0 (2026-07-29)

- some changes. see readme/below

#### Changes 2026-07-29

- repair widget rendering
- add search and fullscreen to ejs-edit for vis-2 widget
- improve ki documentation for regex expressions
- improve vis-2 ejs edit theme for dark mode

### 4.4.5 (2026-07-22)

- fix packages for vis-2

### 4.4.4 (2026-07-22)

- some changes. see readme/below

#### Changes 2026-07.22

- change documentation that in the template the widgetid is available and not widgetID
- add documentation for the usecase simple gauge
- add documentation for a responsive FRITZ!Box call list
- Due to an inconsistency between the vis1 and vis2 widgets,
  both `widgetid` and `widgetID` are now passed to the template.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2021-2026 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
