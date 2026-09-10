---
chapters: {"pages":{"en/adapterref/iobroker.rssfeed/README.md":{"title":{"en":"ioBroker Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF)"},"content":"en/adapterref/iobroker.rssfeed/README.md"},"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md":{"title":{"en":"VIS 1 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md":{"title":{"en":"VIS 2 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md":{"title":{"en":"EJS template notation"},"content":"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md"}}}
---
# VIS 1 widgets

[Back to the main README](/#/adapters/rssfeed#vis-1-widgets)

The classic VIS 1 widget set reads the JSON states created by the RSSFeed adapter. This guide describes every
widget and every option offered by its VIS property editor. The option names are included so existing views can be
understood and migrated more easily.

## RSS Feed Widget 2

This single-feed widget reads one RSSFeed state, optionally limits or filters its articles, and renders the result
with an editable EJS template. Use it when one feed should have a completely customized layout.

| Setting           | Default                | Description                                                                                                                                                |
| ----------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rss_oid`         | None                   | Selects the state containing the RSSFeed JSON data.                                                                                                        |
| `rss_template`    | Built-in feed template | Controls the complete HTML output. The editor opens a larger EJS editing dialog.                                                                           |
| `rss_maxarticles` | All available articles | Limits how many of the first articles are passed to the template. Values below `1` are treated as `1`.                                                     |
| `rss_filter`      | Empty                  | Semicolon-separated search terms. An article is kept when at least one term occurs in its title, description, or categories. Matching is case-insensitive. |

### Template data

| Expression     | Description                                                                             |
| -------------- | --------------------------------------------------------------------------------------- |
| `rss.meta`     | Metadata of the selected feed. See the Meta Helper for the fields supplied by the feed. |
| `rss.articles` | Array of articles remaining after the limit and filter have been applied.               |
| `widgetid`     | ID of this VIS widget. Useful for CSS selectors that must affect only this widget.      |
| `style`        | VIS style settings of this widget.                                                      |
| `vis`          | VIS runtime object, for example for `vis.formatDate(...)`.                              |

The article limit is applied before the filter. A filter can therefore produce fewer visible articles than the
configured maximum. Template errors are shown in red inside the widget. The widget automatically updates when the
selected RSSFeed state changes in the running view.

```ejs
<h2><%= meta.title || "" %></h2>
<% articles.forEach(function (item) { %>
    <article>
        <small><%= vis.formatDate(item.pubdate || item.date, "TT.MM.JJJJ SS:mm") %></small>
        <h3><%= item.title || "" %></h3>
        <div><%- item.description || "" %></div>
    </article>
<% }); %>
```

`description` is emitted with `<%-` because feed descriptions frequently contain HTML. Only do this for feeds
you trust. For the EJS language itself, see [EJS template notation](/#/docs/adapterref/iobroker.rssfeed/docs/ejs-templates.md).

## RSS Feed Multi Widget 3

This widget merges several feeds into one list, sorts all collected articles from newest to oldest, and renders
them with one EJS template. Each feed can have its own name, limit, and filter. Additional ioBroker states can also
be made available to the template.

| Setting         | Default                      | Description                                                                            |
| --------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| `rss_feedCount` | `1`                          | Number of feed groups shown in the property editor.                                    |
| `rss_template`  | Built-in multi-feed template | Controls the complete HTML output of the combined list.                                |
| `rss_dpCount`   | `1`                          | Number of additional datapoint fields shown in the property editor.                    |
| `rss_dpN`       | None                         | Selects additional state number `N`. Its current value is made available through `dp`. |

### Settings for each feed RSS Feed Multi Widget 3

`N` is the feed number from `1` through `rss_feedCount`.

| Setting            | Default                | Description                                                                                                                   |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `rss_oidN`         | None                   | State containing the RSSFeed JSON data for feed `N`.                                                                          |
| `rss_nameN`        | Empty                  | Optional display name. It is added to every article from this feed as `meta_name`.                                            |
| `rss_maxarticlesN` | All available articles | Maximum number of articles taken from this feed. Values below `1` are treated as `1`.                                         |
| `rss_filterN`      | Empty                  | Semicolon-separated, case-insensitive terms matched against title, description, and categories. At least one term must match. |

### Template data and multi-feed fields

| Expression                 | Description                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| `rss.articles`             | Combined array, sorted by `date` from newest to oldest.                            |
| `item.meta_name`           | Name entered for the source feed.                                                  |
| `item.meta_title`          | Original title from that feed's metadata.                                          |
| `item.meta_description`    | Original description from that feed's metadata.                                    |
| `dp["state.id"]`           | Current value of an additionally configured state, addressed by its full state ID. |
| `widgetid`, `style`, `vis` | Widget ID, VIS styles, and the VIS runtime object.                                 |

Unlike the single-feed widget, one common `rss.meta` object cannot represent all source feeds. Use the three
`meta_*` fields attached to each article instead. VIS 1 retains the other original article properties, so fields
shown by the Article Helper can also be used. The limit is applied before the filter for each feed.

```ejs
<% rss.articles.forEach(function (item) { %>
    <article>
        <strong><%= item.meta_name || item.meta_title || "" %></strong>
        <h3><%= item.title || "" %></h3>
        <div><%- item.description || "" %></div>
    </article>
<% }); %>
```

## RSS Feed Meta Helper

The Meta Helper is a reference widget. Select a feed and it displays the metadata fields and their current values
in a table. This is the quickest way to learn which fields a particular feed actually supplies before using them
in a single-feed template.

| Setting   | Default | Description                                                    |
| --------- | ------- | -------------------------------------------------------------- |
| `rss_oid` | None    | Selects the state containing the RSSFeed JSON data to inspect. |

The table shows `meta.title`, `description`, `link`, `xmlurl`, `date`, `pubdate`, `author`, `language`,
`image.url`, `image.title`, `favicon`, `copyright`, `generator`, and `categories`. RSS formats and publishers vary,
so a field can be empty even though the helper lists it. The table updates when the selected state changes.

## RSS Feed Article Helper 2

The Article Helper displays all known fields of one article as a table. Select an article number, inspect the
available values, and copy the field name from the left column while creating a template.

| Setting       | Default | Description                                                                                                           |
| ------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `rss_oid`     | None    | Selects the state containing the RSSFeed JSON data to inspect.                                                        |
| `rss_prefix`  | `item`  | Prefix displayed before each field name, for example `item.title`. Set it to the variable name used in your template. |
| `rss_article` | `1`     | One-based article number. `1` selects the first article; values below `1` are treated as `1`.                         |

The helper lists `title`, `description`, `summary`, `link`, `origlink`, `permalink`, `date`, `pubdate`, `author`,
`guid`, `comments`, `image.url`, `image.title`, `categories`, `source`, and `enclosures`. `source` and `enclosures`
are displayed as JSON. When the requested number is past the end of the feed, the helper reports the number of
available articles. The prefix changes only the displayed labels; it does not modify the RSS data.

## RSS Feed Title Marquee 5

The marquee combines article titles from one or more feeds into a continuously moving ticker. All articles are
sorted from newest to oldest. The ticker can add dates and source names and can make headlines open their source.

| Setting            | Default             | Description                                                                                                                            |
| ------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `rss_feedCount`    | `1`                 | Number of feed groups shown in the property editor.                                                                                    |
| `rss_speed`        | `1` in a new widget | Controls movement speed. The text length is divided by this value to calculate the animation duration, so a larger value moves faster. |
| `rss_divider`      | `+++`               | Text inserted before each headline.                                                                                                    |
| `rss_pauseonhover` | Enabled             | Pauses the ticker while the pointer is over it. Touch-device behavior can vary.                                                        |
| `rss_opentype`     | `none`              | `none` shows plain text, `link` opens the article in a browser target, and `popup` opens it in an iframe dialog.                       |
| `rss_withtime`     | Disabled            | Adds the article time.                                                                                                                 |
| `rss_withdate`     | Disabled            | Adds day, month, and time. This takes precedence over `rss_withtime`.                                                                  |
| `rss_withyear`     | Disabled            | Adds day, month, two-digit year, and time. This takes precedence over the other date/time choices.                                     |
| `rss_withname`     | Disabled            | Adds `rss_nameN`, or the feed title when no name was entered, before each headline.                                                    |

### Settings for each feed RSS Feed Title Marquee 5

| Setting            | Default                | Description                                                                                     |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------------------- |
| `rss_oidN`         | None                   | State containing RSSFeed JSON data for feed `N`.                                                |
| `rss_nameN`        | Empty                  | Optional source name used when `rss_withname` is enabled.                                       |
| `rss_maxarticlesN` | All available articles | Maximum articles taken from this feed. Values below `1` are treated as `1`.                     |
| `rss_filterN`      | Empty                  | Semicolon-separated, case-insensitive terms matched against title, description, and categories. |

For the marquee, filtering happens before limiting. Popup mode embeds the external article in an iframe;
publishers can prevent this with browser security headers. The ticker uses the widget's VIS text and background
colors and applies most other configured text styles to its moving text.