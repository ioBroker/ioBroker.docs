![Logo](admin/rssfeed.png)

# ioBroker Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF)

[![NPM version](https://img.shields.io/npm/v/iobroker.rssfeed.svg)](https://www.npmjs.com/package/iobroker.rssfeed)
[![Downloads](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)](https://www.npmjs.com/package/iobroker.rssfeed)
![Number of Installations](https://iobroker.live/badges/rssfeed-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/rssfeed-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)](https://nodei.co/npm/iobroker.rssfeed/)

**Tests:** ![Test and Release](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Overview

Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF).
You can customize the output of the feed with a template system. In the templates you can include HTML, CSS and Javascript.

Important: Only the english translation is valid due to bugs in automatic translations into other languages made by iobroker

## Add an Instance

After Installation the adapter should then be displayed in the adapter section in the iobroker.
Sometimes it happens that the changes are not visible, especially with web changes (widgets / configuration dialog), the following command may have to be executed on the command line:

```bash
iobroker upload rssfeed
```

In the right area in the line of the adapter, an instance can be added using the plus button

## Configuration

The configuration is easy. There are only a few fields

| Setting                | description                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Default Refresh (min)  | is the general specification of how often the feed should be called up again in minutes. The default is 60 minutes |
| Max Artikel (Standard) | The total amount of data to be processed can be limited here.                                                      |

Then for each new feed:

| Setting       | description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| Name          | A name for the datapoint. Inside a folder a name must not appear twice.                        |
| Category      | Name for a subfolder there the datapoint should appear. The category must be unique            |
| Url           | The full address of the feed (with http: // or https: //, see examples below)                  |
| Refresh (min) | A different value can be specified for this feed. Otherwise the general specification is taken |
| Max Articles  | A different value can be specified for this feed. Otherwise the general specification is taken |

If you saved and closed the configuration, the feed-data can be found as a JSON data point in the object tree.
If you delete an entry, the datapoints aren't deleted.

## vis and widgets

The following widgets actually exists

- `RSS Feed widget 2` - to show a single feed
- `RSS Feed Multi widget` - to show several aggregated feeds in one widget.
- `RSS Feed Meta Helper` - a helper widget to inspect the metadata of a feed
- `RSS Feed Article Helper 2` - a helper widget to inspect the article data of a feed
- `RSS Feed Title marquee 3` - a widget to show the Headlines of a feed as a marquee
- `JSON Template` - a widget that have nothing todo with RSS Feeds, but uses the same technology, and you can define a custom template to show any JSON-Data in vis.

Documentation for the vis-widgets are available inside vis or [Widget-Documentation/german](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.rssfeed/blob/master/widgets/rssfeed/doc.html)

## Template based on examples

An example that I have tested with the following RSS feeds:

- <http://www.tagesschau.de/xml/rss2>
- <https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html>

```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

The template system works with certain tags.
The tags used mean the following

| `tag` | description                                                         |
| ----- | ------------------------------------------------------------------- |
| <%=   | The content of the contained expression / variable will be escaped. |
| <%-   | The content of the contained expression / variable is unescaped.    |
| <%    | No output, is used for enclosed javascript instructions             |
| %>    | is generally a closing tag to complete one of the previous ones     |

Everything that is outside of these tags is displayed exactly as it is or if it is HTML interpreted as HTML. (see e.g. the p-tag, div-tag, small-tag
Within the template you have 2 predefined variables available

### `meta`

This contains all meta information about the feed. The following content is available. I think the identifiers are self-explanatory. In the help I will describe them in more detail. or specify the content (some are arrays)

- `meta.title`
- `meta.description`
- `meta.link`
- `meta.xmlurl`
- `meta.date`
- `meta.pubdate`
- `meta.author`
- `meta.language`
- `meta.image`
- `meta.favicon`
- `meta.copyright`
- `meta.generator`
- `meta.categories`

#### `articles`

Is an array with individual elements (javascript array). Each element has the following properties.
So that it fits, for example, I will do the prefix item in front of it. But if you want you can choose that yourself. It only has to be named accordingly in the loop (forEach). Here, too, the identifiers are self-explanatory. Not all attributes are filled in every feed. The most important ones are already included in the template above.

- `item.title`
- `item.description`
- `item.summary`
- `item.link`
- `item.origlink`
- `item.permalink`
- `item.date`
- `item.pubdate`
- `item.author`
- `item.guid`
- `item.comments`
- `item.image`
- `item.categories`
- `item.source`
- `item.enclosures`

## Template example and detailed description

```html
<%= meta.title %> <% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Brief description of what happens in the individual lines  
Z1: The output of the feed title  
Z2: Without output. Javascript command to loop over all articles, with each turn the current element is assigned to the variable item.  
Z3: Output of date and time is. It is enclosed with a p / small tag for formatting. The vis-own date format function is used for formatting. Description can be found in the adapter vis.  
Z4: The output of the article title. A Header 3 - tag is used for formatting.  
Z5: Output of the content of the article. It is enclosed with a p-tag. Here, at least in the two examples, HTML code is included, which usually comes with an image and descriptive text  
Z6: Output a div tag that clears special formatting in the feed-html (in both examples for tagesschau and bild it is needed. Other feed maybe didn't need it.  
Z7: Without output. This line closed the javascript loop . Everything that was defined between Z2 and Z7 is repeated for every single article.

## Todo

- cleanup unused entries in datapoint info.lastRequest by saving in admin dialog.
- button for cleanup not used datapoints in admin dialog
- ~~Multi widget RSS Feeds~~
- ~~Multi widget marquee~~
- ~~Weitere Datenpunkte im Template verfügbar machen.~~
- ~~Widget für Laufschrift mit den Titeln <https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- ignore widgets in vis-2

### 2.9.7 (2024-06-22)

- formating code
- remove common.main from io-package.json

### 2.9.6 (2024-06-06)

- fix branch name in link

### 2.9.4 (2024-06-05)

- test release after rename branch from master to main

### 2.9.3 (2024-06-05)

- switch branchname from master to main
- add node 22 to tests

### 2.9.2 (2024-06-04)

- add some translations
- fix warning from adapter checker

### 2.9.1 (2024-06-03)

- update iobroker files and settings

### 2.8.2 (2024-04-21)

- (bluefox) Fixed loading of words.js in vis

### 2.8.1 (2023-03-15)

- (bluefox) Corrected vis widget
- admin changed to jsonConfig, dev-environment now devcontainer

### 2.7.0 (2022-12-11)

### 2.6.1 (2022-07-30)

- added more information to sentry

### 2.6.0 (2022-07-26)

- added sentry

### 2.4.0 (2022-07-25)

- added name option to marquee widget

### 2.0.0

- Rework of the admin dialog
- Fix some errors and glitches

### 1.0.0

- Released in stable

### 0.9.0

- fixed/extended json template

### 0.8.0

- adapted configuration pages to react.
- Prepared for stable release

### 0.0.30

- added some template examples to the widget documentation

### 0.0.29

- improved error messages
- removed deprecated widget / change widget beta flag
- changed createObject/setState logic due iobroker-controller >3.0

### 0.0.28

- removed customtab

### 0.0.27

- adapter configuration is now editable

### 0.0.26

- corrected changelog size

### 0.0.25

- the error messages for the template are improved

### 0.0.24

- errors in the request of feeds are now real errors in the iobroker log
- loading of rules for ejs in the editor is improved
- marquee3 widget: options to show time and date

### 0.0.23

- republish to npm

### 0.0.22

- improvements in the configuration dialog
- remove unused admintab
- new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
- New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
- the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
- Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)

### 0.0.21

- add link option to marquee widget
- widget help added
- marquee widget: the divider characters (default: +++) are configurable

### 0.0.20

- add ejs syntax to template editor

### 0.0.19

- try to fix marquee widget.

### 0.0.18

- try to fix the wrong NoSave dialog

### 0.0.17

- rework setting objects and states

### 0.0.16

- improve logic adding rssfeed in configuration dialog
- fix wrong icon for marquee widget
- define default template for rssfeed widget
- deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
- widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles

### 0.0.15

- fix bug saving last request in adapter configuration / improve debug messages

### 0.0.14

- update package.json and install new tools for stream encoding/decoding detection
- implement encoding detection and stream encoding
- change the ejs lib with a real browserified lib

### 0.0.13

- new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.

### 0.0.12

- now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.

### 0.0.11

- improve admin layout
- implement a forceRefresh button

### 0.0.10

- fix bug a bug in marquee widget. not all styles should applied to the span tag.

### 0.0.9

- apply widget styles also to the inner span element, because they had not any effect on the marquee.
- renew the package-lock.json
- add categories to save feeds in subfolders
- improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.

### 0.0.8

- improve lasrequest logic of the adapter
- fix problem with datapoint naming

### 0.0.7

- test with encapsulation of ejs.js, because of error in some browsers

### 0.0.6

- add attribute duration for widget marquee to control animation duration

### 0.0.5

- new widget marquee for article titles
- add filter function for articles. the filter searches in title,description and categories, several filter criteria can be seperated by semicolon

### 0.0.4

- some adjustments in readme, io-package

### 0.0.3

- add addveyor build

### 0.0.2

- added widgets meta helper and article helper

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2021-2024 oweitman <oweitman@gmx.de>

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
