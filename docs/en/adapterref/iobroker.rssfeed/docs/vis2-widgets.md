---
chapters: {"pages":{"en/adapterref/iobroker.rssfeed/README.md":{"title":{"en":"ioBroker Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF)"},"content":"en/adapterref/iobroker.rssfeed/README.md"},"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md":{"title":{"en":"VIS 1 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md":{"title":{"en":"VIS 2 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md":{"title":{"en":"EJS template notation"},"content":"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md"}}}
---
# VIS 2 widgets

[Back to the main README](/#/adapters/rssfeed#vis-2-widgets)

The VIS 2 widget set provides five components that read the JSON states created by the RSSFeed adapter. This guide
describes every option visible in the VIS 2 property editor and the data available when a component supports an
EJS template.

## RSSWidget

This single-feed component reads one RSSFeed state, optionally limits or filters its articles, and renders the feed
with an editable EJS template.

| Setting    | Default                | Range or choices | Description                                                                                                                                         |
| ---------- | ---------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oid`      | None                   | RSSFeed state    | Selects the state containing the RSSFeed JSON data.                                                                                                 |
| `template` | Built-in feed template | EJS template     | Controls the complete HTML output. The edit button opens a larger template editor.                                                                  |
| `max`      | `5`                    | `1` to `9999`    | Maximum number of the first articles passed to the template.                                                                                        |
| `filter`   | Empty                  | Text             | Semicolon-separated terms. An article is kept when at least one term occurs in its title, description, or categories. Matching is case-insensitive. |

### Template data

| Expression     | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `rss.meta`     | Metadata of the selected feed. Use RSSMetaHelper to inspect it.        |
| `rss.articles` | Articles remaining after the limit and filter have been applied.       |
| `widgetid`     | ID of this VIS 2 widget, useful for scoped CSS.                        |
| `style`        | VIS style settings of this widget.                                     |
| `vis`          | VIS runtime object, including functions such as `vis.formatDate(...)`. |

The limit is applied before the filter, so the result can contain fewer articles than `max`. Template errors are
displayed in red. If no state is selected, bundled sample data is shown instead of an empty component.

```ejs
<h2><%= rss.meta.title || "" %></h2>
<% rss.articles.forEach(function (item) { %>
    <article>
        <h3><%= item.title || "" %></h3>
        <div><%- item.description || "" %></div>
    </article>
<% }); %>
```

For EJS syntax and safe output rules, see [EJS template notation](/#/docs/adapterref/iobroker.rssfeed/docs/ejs-templates.md).

## RSSMultiWidget

This component combines several feeds, sorts their articles from newest to oldest, and renders one common EJS
template. Each feed can use a separate name, article limit, and filter.

| Setting     | Default                      | Range        | Description                                                                          |
| ----------- | ---------------------------- | ------------ | ------------------------------------------------------------------------------------ |
| `feedcount` | `1`                          | `1` or more  | Number of feed groups shown in the property editor.                                  |
| `template`  | Built-in multi-feed template | EJS template | Controls the complete HTML output of the combined list.                              |
| `dpcount`   | `1`                          | `1` or more  | Number of additional datapoint fields shown in the editor. See the limitation below. |

### Settings for each feed RSSMultiWidget

| Setting            | Default | Range         | Description                                                                                                                   |
| ------------------ | ------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `feed-oid`         | None    | RSSFeed state | Selects the RSSFeed state for this group.                                                                                     |
| `feed-name`        | Empty   | Text          | Optional source name added to every collected article as `meta_name`.                                                         |
| `feed-maxarticles` | `10`    | `1` or more   | Maximum articles taken from this feed.                                                                                        |
| `feed-filter`      | Empty   | Text          | Semicolon-separated, case-insensitive terms matched against title, description, and categories. At least one term must match. |

### Additional datapoint group

| Setting         | Default | Description                                                                                                                                                                                 |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `datapoint_oid` | None    | Text field intended for an additional ioBroker state ID. In the current VIS 2 implementation these values are not passed to the EJS template, so they should not yet be used in a template. |

### Template data and collected article fields

The template receives `rss.articles`, `widgetid`, `style`, and `vis`. It does not receive one meaningful
`rss.meta`, because the articles originate from different feeds. Every collected article contains only:

- `title`, `description`, `categories`, `date`, and `link` from the original article;
- `meta_name` from the widget setting;
- `meta_title` and `meta_description` from the source feed.

Other original fields such as `author`, `guid`, `image`, `pubdate`, or `enclosures` are currently not copied by
this component. Filtering is applied before the per-feed limit. If no feed group exists yet, bundled sample
articles are used.

```ejs
<% rss.articles.forEach(function (item) { %>
    <article>
        <strong><%= item.meta_name || item.meta_title || "" %></strong>
        <h3><%= item.title || "" %></h3>
        <div><%- item.description || "" %></div>
    </article>
<% }); %>
```

## RSSMetaHelper

This reference component displays the metadata of one feed as a table. It helps users discover which values their
chosen publisher actually provides before writing a template.

| Setting | Default | Description                                                    |
| ------- | ------- | -------------------------------------------------------------- |
| `oid`   | None    | Selects the state containing the RSSFeed JSON data to inspect. |

The table shows `meta.title`, `description`, `link`, `xmlurl`, `date`, `pubdate`, `author`, `language`,
`image.url`, `image.title`, `favicon`, `copyright`, `generator`, and `categories`. A listed property can still be
empty because RSS formats and publishers supply different metadata. When no state is selected, bundled sample
data is displayed.

## RSSArticleHelper

This reference component shows the known properties of one selected article. It is useful for finding field names
and checking the real values delivered by a feed.

| Setting   | Default | Range         | Description                                                                                                |
| --------- | ------- | ------------- | ---------------------------------------------------------------------------------------------------------- |
| `oid`     | None    | RSSFeed state | Selects the state containing the RSSFeed JSON data to inspect.                                             |
| `prefix`  | `item`  | Text          | Prefix displayed before each property, for example `item.title`. It only changes the labels in the helper. |
| `article` | `1`     | `1` to `9999` | One-based article number; `1` selects the first article.                                                   |

The helper lists `title`, `description`, `summary`, `link`, `origlink`, `permalink`, `date`, `pubdate`, `author`,
`guid`, `comments`, `image.url`, `image.title`, `categories`, `source`, and `enclosures`. `source` and `enclosures`
are displayed as JSON. It reports the end of the list when the selected number is too large. With no selected
state, it displays bundled sample data.

The helper describes the full source article. RSSMultiWidget currently copies only the smaller set listed in its
own section.

## RSSArticleMarquee5

The marquee combines titles from several feeds into a continuously moving ticker. Articles are sorted from newest
to oldest. Optional timestamps and source names can be added, and headlines can open their source article.

| Setting        | Default  | Range or choices        | Description                                                                     |
| -------------- | -------- | ----------------------- | ------------------------------------------------------------------------------- |
| `count`        | `1`      | `1` or more             | Number of feed groups shown in the property editor.                             |
| `speed`        | `200`    | `1` or more             | Movement speed in pixels per second; larger values move faster.                 |
| `divider`      | `+++`    | Text                    | Separator inserted before every headline.                                       |
| `pauseonhover` | Enabled  | On/off                  | Pauses the ticker while the pointer is over it.                                 |
| `opentype`     | `none`   | `none`, `link`, `popup` | Plain text, a link opening in a new tab/window, or an iframe dialog inside VIS. |
| `withtime`     | Disabled | On/off                  | Adds the article time.                                                          |
| `withdate`     | Disabled | On/off                  | Adds day and month.                                                             |
| `withyear`     | Disabled | On/off                  | Adds a two-digit year after day and month.                                      |
| `withname`     | Disabled | On/off                  | Adds the configured feed name, or the feed title if the name is empty.          |

### Settings for each feed RSSArticleMarquee5

| Setting            | Default | Range         | Description                                                                                     |
| ------------------ | ------- | ------------- | ----------------------------------------------------------------------------------------------- |
| `feed-oid`         | None    | RSSFeed state | Selects the RSSFeed state for this group.                                                       |
| `feed-name`        | Empty   | Text          | Optional source name used when `withname` is enabled.                                           |
| `feed-maxarticles` | `1`     | `1` or more   | Maximum articles taken from this feed.                                                          |
| `feed-filter`      | Empty   | Text          | Semicolon-separated, case-insensitive terms matched against title, description, and categories. |

The per-feed limit is applied before the filter. Popup mode loads the publisher's page into an iframe; publishers
can prevent this through browser security headers. If no feed group exists yet, bundled sample data is used.