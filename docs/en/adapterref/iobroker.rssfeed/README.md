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

## Table of Contents

- [Overview](#overview)
- [Configuration](#configuration)
- [vis and widgets](#vis-and-widgets)
    - [RSS Feed widget 2](#rss-feed-widget-2)
    - [RSS Feed Multi widget 3](#rss-feed-multi-widget-3)
    - [RSS Feed Meta Helper](#rss-feed-meta-helper)
    - [RSS Feed Article Helper](#rss-feed-article-helper)
    - [RSS Feed Title marquee 4 (deprecated)](#rss-feed-title-marquee-4-deprecated)
    - [RSS Feed Title marquee 5](#rss-feed-title-marquee-5)
- [Templatesystem](#templatesystem)
    - [Very Important Note for use in vis / vis-2](#very-important-note-for-use-in-vis--vis-2)
    - [Tags](#tags)
    - [Available variables in templates](#available-variables-in-templates)
    - [Template based on examples](#template-based-on-examples)
- [Todo](#todo)
- [Changelog](#changelog)
- [License](#license)

## Configuration

Install the adapter as normal from the stable repository. If you want to test new features or bug fixes you can also install the adapter from the beta repository. For Features and news, please see the Test and Support thread for this adapter in the iobroker forum.

After Installation the adapter should then be displayed in the adapter section in the iobroker.
Sometimes it happens that the changes are not visible, especially with web changes (widgets / configuration dialog), the following command may have to be executed on the command line:

```bash
iobroker upload rssfeed
```

In the right area in the line of the adapter, an instance can be added using the plus button

The configuration is easy. There are only a few fields

| Setting                | description                                                                                                        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Default Refresh (min)  | is the general specification of how often the feed should be called up again in minutes. The default is 60 minutes |
| Max Artikel (Standard) | The total amount of data to be processed can be limited here.                                                      |
| User Agent             | Optional, but recommended. This is the user agent that is used when requesting the feed.                           |

At the moment of release the defualt is. You maybe update this each year if some request problems of rssfeed exists.

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36
```

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
- [`RSS Feed Title marquee 4 (deprecated)`](#rss-feed-title-marquee-4-deprecated) - a widget to show the Headlines of a feed as a marquee
- [`RSS Feed Title marquee 5`](#rss-feed-title-marquee-5) - a widget to show the Headlines of a feed as a marquee

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

### RSS Feed Title marquee 4 (deprecated)

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

### RSS Feed Title marquee 5

With this widget, all title attributes will be displayed as a scrolling text. As part of the change from marquee widget 2 to 3, this widget is now a multi widget in which you can aggregate more than one RSS feed.

| Setting          | group               | description                                                                                                                                                                                                                                                               |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rss_feedCount    | General group       | Here you can set the number of feeds to be configured. A separate group is created in vis for each feed to be configured.                                                                                                                                                 |
| rss_speed        | General group       | The scrolling speed of the scrolling text Attribute rss_divider - General group Here you can enter the characters used to separate the headlines. The default value is +++.                                                                                               |
| rss_pauseonhover | General group       | If this option is switched on, the scrolling text stops as soon as you hover the mouse over the text.                                                                                                                                                                     |
| rss_opentype     | General group       | Selection of how the link is opened: `none`, `link`, `popup`                                                                                                                                                                                                              |
| rss_withtime     | General group       | If this option is switched on, the time is displayed before the respective headline. Attribute rss_withdate - General group If this option is enabled, the date without the year and the time are displayed before the respective headline.                               |
| rss_withyear     | General group       | If this option is enabled, the date with the year and the time are displayed before the respective headline.                                                                                                                                                              |
| rss_oid          | Feeds[number] group | Select the data point with the corresponding RSS feed.                                                                                                                                                                                                                    |
| rss_maxarticles  | Feeds[number] group | The maximum number of individual articles displayed from the RSS feed                                                                                                                                                                                                     |
| rss_filter       | Feeds[number] group | For the filter function, one or more filter criteria can be entered in the field, separated by semicolons (;). The following article attributes are searched for the search: title, description, categories. Only articles that contain one of these terms are displayed. |

#### Advanced use case

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

**Result:**

```text
    data.oneobject.attribute1 = 1
    data.oneobject.attribute2 = 2
```

(In Markdown colors arent visible)

#### Use case for async calls

**Block 1:**

call sendToAsync Function with await. This example calls a test function in the admin adapter.

**Block 2:**

stringify the result and output to html

**Block 3:**

definition of the sendToAsync function

```html
<% req = await sendToAsync("admin.0","selectSendTo",{test:"test"}); %> <%- JSON.stringify(req) %> <% async function
sendToAsync(instance, command, sendData) { console.log(`sendToAsync ${command} ${sendData}`); return new
Promise((resolve, reject) => { try { vis.conn.sendTo(instance, command, sendData, function (receiveData) {
resolve(receiveData); }); } catch (error) { reject(error); } }); } %>
```

**Result:**

```text
[{"label":"Afghanistan","value":"AF"},{"label":"Åland Islands","value":"AX"},{"label":"Albania","value":"AL"}]
```

#### Use case for a database-supported task list

##### **Introduction**

This use case describes how to visualize and interactively modify
a to-do list from a MySQL database in `ioBroker` using
the `>=rssfeed 3.5.0` adapter. The focus is on implementing a simple
status change via a button click. This concept serves as
a **Proof of Concept (PoC)** and can be included in future documentation.

---

##### **Database Structure (MySQL)**

First, a MySQL database named `test` is created. It contains a table `test` with the following fields:

- `id`: Unique ID for each entry
- `todo`: Title of the to-do entry
- `action`: Status of the entry (0 = in progress, 1 = completed)

###### **SQL Code for Table Creation**

<details>
  <summary>Details</summary>
  <pre><code>

```sql

CREATE TABLE `test` (
`id` int(11) NOT NULL,
`todo` varchar(100) NOT NULL,
`action` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `test` (`id`, `todo`, `action`) VALUES
(1, 'Todo 1', 0),
(2, 'Todo 2', 1),
(3, 'Todo 3', 1),
(4, 'Todo 4', 0);

ALTER TABLE `test`
ADD PRIMARY KEY (`id`),
ADD UNIQUE KEY `id` (`id`),
ADD KEY `idx` (`id`);

ALTER TABLE `test`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

```

</code></pre>

</details>

---

##### **Integration into ioBroker**

###### **SQL Adapter**

To interact with the database, the `ioBroker.sql` adapter is required.
It is configured accordingly to connect to the MySQL database `test`.
Note that `ioBroker` automatically creates its own structures in the
database to store history data points.

###### **RSSFeed Adapter & JSONTemplate Widget**

For visualization, we use the `JSONTemplate` widget.

**Important Notes:**

- In `vis 2`, the widget is included in the `vis-2-widget-ovarious` adapter.
- In the future, this widget is planned to be integrated into `ioBroker.jsontemplate` once `bluefox` stabilizes the build chain.

##### **Integration into VIS**

We place the `JSONTemplate` widget and fill in the following fields:

###### **Template Code**

<details>
  <summary>Details</summary>
  <pre><code>

```html
<style>
    .btn {
        width: 100%;
    }
</style>
<table>
    <tr>
        <th>ID</th>
        <th>Todo</th>
        <th>Action</th>
    </tr>
    <% let todos = await getTodo(); for (let i = 0; i < todos.length; i++) { let todo = todos[i]; %>
    <tr>
        <td><%- todo.id %></td>
        <td><%- todo.todo %></td>
        <td><%- getButton(todo.id, todo.action) %></td>
    </tr>
    <% } %>
</table>

<script>
    window.jsontemplate = { clicktodo: clicktodo };

    function getButton(id, action) {
        let text = action === 0 ? 'In Progress' : 'Completed';
        return `<button class="btn" onclick="window.jsontemplate.clicktodo(this)" data-id="${id}" data-action="${action}">${text}</button>`;
    }

    function clicktodo(el) {
        let id = el.dataset.id;
        let action = el.dataset.action;
        let nextAction = action == 0 ? 1 : 0;
        setAction(id, nextAction);
    }

    async function getTodo() {
        let req = await sendToAsync('sql.0', 'query', 'SELECT * FROM test.test');
        return req.result;
    }

    async function setAction(id, action) {
        await sendToAsync('sql.0', 'query', `UPDATE test.test SET action = ${action} WHERE id = ${id}`);
        vis.setValue('local_trigger', Math.random());
    }

    async function sendToAsync(instance, command, sendData) {
        return new Promise((resolve, reject) => {
            try {
                vis.conn.sendTo(instance, command, sendData, receiveData => resolve(receiveData));
            } catch (error) {
                reject(error);
            }
        });
    }
</script>
```

</code></pre>

</details>

###### **Data Point for Refreshing Content**

To ensure updates are reflected after a status change,
we add the following local data point:

```text
local_trigger
```

This data point **does not need to be explicitly created**, as `local_?` data points are processed internally within VIS (see `vis` documentation).

##### **Code Explanation**

###### **Template Structure**

| Line  | Content                                                                |
| ----- | ---------------------------------------------------------------------- |
| 1-5   | CSS styles for button appearance                                       |
| 6-11  | Table header with columns ID, Todo, Action                             |
| 12-16 | Fetching data from the MySQL database using `getTodo()`                |
| 17-21 | Loop to display to-do entries with buttons                             |
| 23-28 | Global reference of the `clicktodo()` function                         |
| 30-37 | `getButton()` function to create a button with the current status      |
| 38-44 | `clicktodo()` function to change the status via button click           |
| 45-48 | `getTodo()` function to fetch data via the SQL adapter                 |
| 49-52 | `setAction()` function to update the database entry                    |
| 53-58 | `sendToAsync()` function to use `async/await` with `vis.conn.sendTo()` |

## Templatesystem

### Very Important Note for use in vis / vis-2

#### Curly braces in CSS and JSON

The binding mechanism in vis / vis-2 uses the pattern `{ ... }` to detect binding expressions within HTML.
For this reason, when specifying CSS or JSON, the curly braces must always be placed on separate lines. Otherwise, the content of the vis widget will be overwritten with `undefined`.

##### Example

```text
#w_id_<%- widgetid %> { height: 100%; display: flex; flex-direction: column; overflow: hidden; }
```

must be written as follows:

```text
#w_id_<%- widgetid %> {
    height: 100%; display: flex; flex-direction: column; overflow: hidden;
}
```

#### Use of setInterval

Please do not use `setInterval`. Since the template is re-invoked every time a data point changes, any existing `setInterval` calls cannot be properly cleared. Consequently, an increasing number of overlapping `setInterval` calls accumulate over time; this consumes RAM and can lead to unpredictable side effects. While reloading the page can resolve this issue, the code should not be implemented in this manner.
As an alternative, such scenarios should be implemented using `setTimeout`.

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
<% for (var i = 0; i < data.onearray.length ; i++ ) { %> <%- data.onearray[i] %> <% } %>
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
<% for (var prop in data.oneobject) { %> <%- "data.oneobject." + prop + " = " + data.oneobject[prop] %> <% } %>
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

```ejs
<!--
    available variables:
    widgetid      ->  id of the widget
    rss.meta      ->  all meta informations of an feed, details see Meta Helper widget
    rss.articles  ->  all articles as array, details see Article Helper widget
    style         ->  all style settings for the widget

    all variables are read only
    -->
<style>
    #<%- widgetid %> img {
        width: calc(<%- style.width %> - 15px);
        height: auto;
    }
    #<%- widgetid %> img.rssfeed {
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

```ejs
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
        width: calc(<%- style.width || '230px' %> - 15px);
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

```ejs
<!--
 available variables:
 widgetid      ->  id of the widget
 rss.articles  ->  all articles as array, details see Article Helper widget
 style         ->  all style settings for the widget

 all variables are read only
-->

<style>
    #<%- widgetid %> img {
        width: calc(<%- style.width || '230px' %> - 15px);
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
    slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
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

[Older changelogs can be found there](CHANGELOG_OLD.md)

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- update ejs and update prepare mechanism

### 4.1.2 (2026-06-10)

- fix package lock

### 4.1.0 (2026-06-10)

- fix repochecker

### 4.0.4-alpha.0 (2026-06-09)

- add user agent to settings and axios request

### 4.0.3 (2026-03-26)

- Update packages
- fix repochecker

### 4.0.2 (2026-03-07)

- fix repochecker

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
