# ioBroker Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF)

![Logo](admin/rssfeed.png)

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

## Installation

Install the adapter as normal from the stable repository. If you want to test new features or bug fixes you can also install the adapter from the beta repository. For Features and news, please see the Test and Support thread for this adapter in the iobroker forum.

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

| Setting       | description                                                                                                                                                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name          | A name for the datapoint. Inside a folder a name must not appear twice.                                                                                    |
| Category      | Name for a subfolder there the datapoint should appear.                                                                                                    |
| Url           | The full address of the feed (with http: // or https: //, see examples below)                                                                              |
| Refresh (min) | Time to refres/load the feed. A different value can be specified for this feed. Otherwise the general specification is taken                               |
| Max Articles  | Number of Articles thare should be saved int the datapoint. A different value can be specified for this feed. Otherwise the general specification is taken |

If you saved and closed the configuration, the feed-data can be found as a JSON data point in the object tree.
If you delete an entry, the datapoints aren't deleted automatically.

## vis and widgets

The following widgets actually exists

- [`RSS Feed widget 2`](#rss-feed-widget-2) - to show a single feed
- [`RSS Feed Multi widget 3`](#rss-feed-multi-widget-3) - to show several aggregated feeds in one widget.
- [`RSS Feed Meta Helper`](#rss-feed-meta-helper) - a helper widget to inspect the metadata of a feed
- [`RSS Feed Article Helper 2`](#rss-feed-article-helper) - a helper widget to inspect the article data of a feed
- [`RSS Feed Title marquee 3`](#rss-feed-title-marquee-3) - a widget to show the Headlines of a feed as a marquee
- [`JSON Template`(#json-template)] - a widget that have nothing todo with RSS Feeds, but uses the same technology, and you can define a custom template to show any JSON-Data in vis.

### RSS Feed widget 2

This widget can be used to display the RSS feeds subscribed to in the adapter's configuration dialog.
With a template system, the output can be customized as desired. A simple standard template is already provided.
Descriptions of the formatting and syntax can be found on the following pages.

| Setting         | description                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid         | Selecting the data point with the corresponding RSS feed.                                                                                                                                                                                                                                                                                                                                                            |
| rss_template    | The template determines the appearance of the RSS feed. All valid HTML tags (including CSS attributes in style tags) can be used in the template. In addition, there are special tags within which the feed data is displayed and JavaScript instructions can be executed. In order to better identify the data and the attribute names used, there are two widgets, rssfeed Meta helper and rssfeed Article helper. |
| rss_maxarticles | The maximum number of individual articles displayed from the RSS feed                                                                                                                                                                                                                                                                                                                                                |
| rss_filter      | For the filter function, one or more filter criteria can be entered in the field, separated by semicolons (;). The following article attributes are searched for the search: title, description, categories. Only articles that contain one of these terms are displayed.                                                                                                                                            |

**Availability of variable:**

- rss.meta: the meta information of the feed
- rss.articles: an array of all articles
- widgetid: the widgetID of the widget
- style: the style object if you configure additional style information

For more details about these variables, see chapter **Available variables**

For details on the template system, see chapter Template based on examples

### RSS Feed Multi widget 3

With this widget, several feeds can be aggregated in one feed.
Due to the multiple feeds, there are a few differences in the data availability in the template compared to the normal RSS feed widget.
The meta variable is not available in the template. However, 3 meta attributes title and description are available in each individual article under the names meta_title and meta_description.
In addition, a general name can be assigned to each feed in the settings, which is available within the template under the name meta_name in each article so that the origin of an article can be identified.
Otherwise, the same rules apply to the template as for the RSS feed widget.

| Setting         | Group               | description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount   | General group       | Here you can set the number of feeds to be configured. A separate group for configuration is created in vis for each feed.                                                                                                                                                                                                                                                                                                                                                                      |
| rss_template    |                     | The template determines the appearance of the RSS feed. All valid HTML tags (including CSS attributes in style tags) can be used in the template. In addition, there are special tags within which the feed data is displayed and JavaScript instructions can be executed. In order to better identify the data and the attribute names used, there are two widgets, rssfeed Meta helper and rssfeed Article helper. For details on the template system, see chapter Template based on examples |
| rss_dpCount     | General group       | Here you can specify the number of additional data points that should be made available within the template.                                                                                                                                                                                                                                                                                                                                                                                    |
| rss_dp[number]  | General group       | Here you can select the respective data point. The data point is available within the template under the variable dp. This means that a data point can be retrieved within the template as follows.For details on these variables, see chapter Available variables                                                                                                                                                                                                                              |
| rss_oid         | Group feeds[number] | Selection of the data point with the corresponding RSS feed.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| rss_name        | Group feeds[number] | Here you can enter a name that will be made available in the template for each article under the attribute name meta_name.                                                                                                                                                                                                                                                                                                                                                                      |
| rss_maxarticles | Group feeds[number] | The maximum number of individual articles displayed from the RSS feed                                                                                                                                                                                                                                                                                                                                                                                                                           |
| rss_filter      | Group feeds[number] | For more details on these variables, see chapter Available variablesFor the filter function, one or more filter criteria can be entered in the field, separated by semicolons (;).The following article attributes are searched for the search: title, description, categories. Only articles that contain one of these terms are displayed.                                                                                                                                                    |

**Availability of variable:**

- rss.articles: an array of all articles.

- A subset of the the meta information of an item is available in the article as **meta_name**, **meta_title** and **meta_description**

- dp[] as array, if you configure additional datapoints
- widgetid: the widgetID of the widget
- style: the style object if you configure additional style information

### RSS Feed Meta Helper

This widget can be used to display the meta attributes of a specific feed. It is simply used as an help widget for creating a template to quickly and easily display the contents of the RSS feed data.
Attributes

| Setting | description                                                  |
| ------- | ------------------------------------------------------------ |
| rss_oid | Selection of the data point with the corresponding RSS feed. |

### RSS Feed Article Helper

This widget can be used to display the article attributes of a specific feed. It is simply used as an help widget for creating a template to quickly and easily display the contents of the RSS feed data.

| Setting     | description                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| rss_oid     | Selection of the data point with the corresponding RSS feed.                                                                              |
| rss_prefix  | To make it easier to use the attribute names via copy/paste, the variable name used in the template for an article can be specified here. |
| rss_article | This attribute can be used to switch between the various existing articles in the RSS feed.                                               |

### RSS Feed Title marquee 3

With this widget, all title attributes will be displayed as a scrolling text. As part of the change from marquee widget 2 to 3, this widget is now a multi widget in which you can aggregate more than one RSS feed.

| Setting          | group               | description                                                                                                                                                                                                                                                               |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount    | General group       | Here you can set the number of feeds to be configured. A separate group is created in vis for each feed to be configured.                                                                                                                                                 |
| rss_speed        | General group       | The scrolling speed of the scrolling text Attribute rss_divider - General group Here you can enter the characters used to separate the headlines. The default value is +++.                                                                                               |
| rss_pauseonhover | General group       | If this option is switched on, the scrolling text stops as soon as you hover the mouse over the text.                                                                                                                                                                     |
| rss_link         | General group       | If this option is switched on, the headlines are displayed as a link. If you click or touch a headline, the link to the article opens in a new window or tab.                                                                                                             |
| rss_withtime     | General group       | If this option is switched on, the time is displayed before the respective headline. Attribute rss_withdate - General group If this option is enabled, the date without the year and the time are displayed before the respective headline.                               |
| rss_withyear     | General group       | If this option is enabled, the date with the year and the time are displayed before the respective headline.                                                                                                                                                              |
| rss_oid          | Feeds[number] group | Select the data point with the corresponding RSS feed.                                                                                                                                                                                                                    |
| rss_maxarticles  | Feeds[number] group | The maximum number of individual articles displayed from the RSS feed                                                                                                                                                                                                     |
| rss_filter       | Feeds[number] group | For the filter function, one or more filter criteria can be entered in the field, separated by semicolons (;). The following article attributes are searched for the search: title, description, categories. Only articles that contain one of these terms are displayed. |

### JSON Template2

Using this widget, any data point with JSON data can be displayed as desired.
The display is done using a template format, which can be thought of as a combined form of HTML code + JavaScript + special tags that control the display of the JSON attributes.

| Setting      | description                                                                                                                                                                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_template | The template can be used to determine the appearance of the JSON data. All valid HTML tags (including CSS attributes in style tags) can be used in the template. There are also special tags within which the JSON data is displayed and JavaScript instructions can be executed. |
| json_oid     | Selection of the data point with the corresponding JSON data.                                                                                                                                                                                                                     |

For details on the template system, see chapter Template based on examples

The JSON data is passed to the template with the prefix data. In addition, the current widgetID is also available as a variable so that it can be specified in individual CSS instructions.

**Advanced use case:**

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
  <span class="mycssclassproperty"
    ><%- "data.oneobject." + prop + " = " %></span
  >
  <span class="mycssclassdata"><%- data.oneobject[prop] %></span>
</div>
<% } %>
```

**Result:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

(In Markdown colors arent visible)

## Templatesystem

## Tags

The template system works with certain tags.
The tags used mean the following

| `tag` | description                                                         |
| ----- | ------------------------------------------------------------------- |
| <%=   | The content of the contained expression / variable will be escaped. |
| <%-   | The content of the contained expression / variable is unescaped.    |
| <%    | No output, is used for enclosed javascript instructions             |
| %>    | is generally a closing tag to complete one of the previous ones     |

Everything that is outside of these tags is displayed exactly as it is or if it is HTML interpreted as HTML.
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

```html
<%- data.onenumber %> <%- data.onetext %>
```

**Result:**

```text
    123 onetwothree
```

Arrays can be accessed via an index. The index always starts with 0. However, there are also fake arrays where the index does not start with 0 or even consists of text. Here the rules for objects apply. In the example above, this would be

**Template:**

```html
<%- data.onearray[0] %> <%- data.onearray[1] %>
```

**Result:**

```text
    one two
```

If you try to output an array directly without an index, the template outputs all elements separated by commas

**Template:**

```html
<%- data.onearray %>
```

**Result:**

```text
    one,two
```

Arrays can also consist of a collection of objects. The example here contains only a simple array. An example of arrays with objects will be given later.

**Template:**

```html
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %>
<% } %>
```

**Result:**

```text
    one two
```

**Objects** can contain individual attributes, arrays or objects again. This means that JSON data can be nested to any depth.

Attributes of an object can be addressed using dot notation or bracket notation. The dot notation only works if the attribute conforms to certain naming conventions (first character must be a letter, rest numbers or letters or underscore).
The bracket notation also works for attributes that do not conform to the naming convention.

**Dot notation:**

**Template:**

```html
<%- data.oneobject.attribute1 %>
```

**Bracket notation:**

**Template:**

```html
<%- data.oneobject["attribute1"] %>
```

**Result for both examples:**

```text
    1
```

Loop over the attributes of an object

**Template:**

```html
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " +
data.oneobject[prop] %> <% } %>
```

**Result:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

## Available variables in templates

### `rss.meta`

This contains all meta information about the feed. The following content is available. I think the identifiers are self-explanatory. In the help I will describe them in more detail. or specify the content (some are arrays)
Only in Rss Feed widget 2, a complete set of the meta information is available

The usage in the template see in **Template based on example**

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

### `rss.articles or articles`

Is an array with individual elements (javascript array). Each element has the following properties.
So that it fits, for example, I will do the prefix item in front of it. But if you want you can choose that yourself. It only has to be named accordingly in the loop (forEach). Here, too, the identifiers are self-explanatory. Not all attributes are filled in every feed. The most important ones are already included in the template above.

The articles are available as rss.articles in RSS feed widget 2 and as articles in RSS feed multi widget 3

The usage in the template see in **Template based on example**

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

## Template based on examples

### Base Template RSS-Feed widget 2

The following template is currently used as standard in the RSS feed widget 2.
It has been tested with the following feeds

- <http://www.tagesschau.de/xml/rss2> or
- <https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html>

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    rss.meta      ->  all meta informations of an feed, details see Meta Helper widget
    rss.articles  ->  all articles as array, details see Article Helper widget
    style         ->  all style settings for the widget

    all variables are read only
    -->
<style>
  #<%- widgetid % > img {
    width: calc(<%- style.width %> - 15px);
    height: auto;
  }
  #<%- widgetid % > img.rssfeed {
    width: auto;
    height: auto;
  }
</style>
<p><%- rss.meta.title %></p>
<% rss.articles.forEach(function(item){ %>
<div class="article">
  <p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
  <h3><%- item.title %></h3>
  <p><%- item.description %></p>
  <div style="clear:both;"></div>
</div>
<% }); %>
```

### Base Template RSS-Feed multi widget 3

The following template is currently used as standard in the RSS feed multi widget 3.
Please note little differences in the usage of the variables
It has been tested with the following feeds

```html
<!--
    available variables:
    widgetid      ->  id of the widget
    articles      ->  all articles as array, details see Article Helper widget
                      only subset of meta information of the feed is available as
                      articles[0].meta_name
                      articles[0].meta_title
                      articles[0].meta_description
    style         ->  all style settings for the widget
    dp[]          ->  array of addition configured datapoints

    all variables are read only
    -->
<style>
  #<%- widgetid %> img {
    width: calc(<%- style.width || "230px" %> - 15px);
    height: auto;
  }
  #<%- widgetid %> img.rssfeed {
    width: auto;
    height: auto;
  }
</style>
<% rss.articles.forEach(function(item){ %>
<p><%- item.meta_name || item.meta_title || '' %></p>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

### Example Template for RSS-Feed multi widget 3 with articles as a slide show and Prev/Next-Buttons

```html
<!--
 available variables:
 widgetid      ->  id of the widget
 rss.articles  ->  all articles as array, details see Article Helper widget
 style         ->  all style settings for the widget

 all variables are read only
-->

<style>
  #<%- widgetid %> img {
    width: calc(<%- style.width || "230px" %> - 15px);
    height: auto;
  }
  #<%- widgetid %> img.rssfeed {
    width: auto;
    height: auto;
  }

  .container {
    overflow: hidden;
    height: 100%;
  }
  .content {
    position: relative;
    border: 1px solid #ccc;
    overflow: scroll;
    height: 90%;
  }

  .slide {
    position: absolute;
    display: none;
  }

  .slide.active {
    display: contents;
  }

  .controls {
    margin-top: 10px;
  }
</style>

<div class="container">
  <div class="content">
    <% rss.articles.forEach(function(item){ %>
    <div class="article slide">
      <p>
        <small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small>
      </p>
      <h3><%- item.title %></h3>
      <p><%- item.description %></p>
      <div style="clear:both;"></div>
    </div>
    <% }); %>
  </div>
  <div class="controls">
    <button onclick="prevSlide()">Zurück</button>
    <button onclick="nextSlide()">Weiter</button>
  </div>
</div>

<script>
  currentSlide = 0;
  slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }

  function prevSlide() {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
    showSlide(currentSlide);
  }

  function nextSlide() {
    currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  }
  showSlide(currentSlide);
</script>
```

### Template example and detailed description

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
### 3.3.0 (2025-01-21)

- upgrade version js-controller
- switch from request to axios

### 3.2.0 (2024-11-27)

- update jsonconfig responsive
- switch to iobroker/eslint
- improver adapter code
- improve widget code

### 3.1.0 (2024-08-11)

- adjust dependency to js-controller in a minor release

### 3.0.2 (2024-08-09)

- add keyword in package.json

### 3.0.1 (2024-08-09)

- add template example for articles as a Diashow
- adjust dependency to js-controller

### 3.0.0 (2024-07-24)

- update multifeed widget 3 and deprecate multifeed widget 2
- breaking change: in rssfeed widget 2: articles and meta have to be changed to rss.articles and rss.meta

### 2.10.0 (2024-07-11)

- fine tuning on templates and available variables
- fine tuning on format and translation
- move widget documentation form doc.html to readme

### 2.9.10 (2024-07-11)

- update images for dark and light theme

### 2.9.9 (2024-07-11)

- update packages
- update formating and improve error logging
- remove detailed sentry status reporting
- fix subscribing states

### 2.9.8 (2024-07-09)

- ignore widgets in vis-2
- add restart vis/vis2

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

Copyright (c) 2021-2025 oweitman <oweitman@gmx.de>

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
