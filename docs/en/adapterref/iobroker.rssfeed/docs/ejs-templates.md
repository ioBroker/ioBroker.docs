---
chapters: {"pages":{"en/adapterref/iobroker.rssfeed/README.md":{"title":{"en":"ioBroker Adapter to request and show RSS Feeds of different standards (Atom, RSS, RDF)"},"content":"en/adapterref/iobroker.rssfeed/README.md"},"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md":{"title":{"en":"VIS 1 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis1-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md":{"title":{"en":"VIS 2 widgets"},"content":"en/adapterref/iobroker.rssfeed/docs/vis2-widgets.md"},"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md":{"title":{"en":"EJS template notation"},"content":"en/adapterref/iobroker.rssfeed/docs/ejs-templates.md"}}}
---
# EJS template notation

[Back to the main README](/#/adapters/rssfeed#ejs-template-notation)

EJS is a template language that combines ordinary HTML with JavaScript expressions and control statements. This
page explains the notation itself. The variables and special behavior of each RSSFeed widget are documented in
the [VIS 1](/#/docs/adapterref/iobroker.rssfeed/docs/vis1-widgets.md) and [VIS 2](/#/docs/adapterref/iobroker.rssfeed/docs/vis2-widgets.md) guides.

## How a template is evaluated

Text outside an EJS tag is copied directly to the result. Code inside an EJS tag is evaluated when the widget is
rendered. The result is then inserted into the widget as HTML.

```ejs
<p>This is ordinary HTML.</p>
<p>The value is <%= value %>.</p>
```

## EJS tags

| Tag                 | Purpose                                                                                                     |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `<%= expression %>` | Evaluates an expression and HTML-escapes its result. Prefer this for text.                                  |
| `<%- expression %>` | Evaluates an expression without escaping HTML. Use only when the value intentionally contains trusted HTML. |
| `<% code %>`        | Executes JavaScript without directly adding output. Use it for conditions, loops, and variables.            |
| `<%# comment %>`    | Adds a template comment that does not appear in the rendered HTML.                                          |
| `<%%`               | Outputs the literal characters `<%` instead of starting an EJS tag.                                         |
| `<%_ code %>`       | Executes JavaScript and removes whitespace before the opening tag.                                          |
| `<% code -%>`       | Executes JavaScript and removes the following line break.                                                   |
| `<% code _%>`       | Executes JavaScript and removes following whitespace.                                                       |

Escaping converts characters such as `<`, `>`, `&`, and quotation marks to text-safe HTML entities. This prevents
a value from unexpectedly becoming markup or script. Feed descriptions sometimes contain intentional HTML; only
use `<%- ... %>` for such content when the source is trusted.

## Values and fallback text

An expression can contain normal JavaScript. Use `||` to provide a simple fallback for missing, empty, or false
values:

```ejs
<h2><%= title || "Untitled" %></h2>
```

Use optional chaining when an intermediate object may be absent:

```ejs
<%= image?.title || "No image title" %>
```

Use the nullish coalescing operator when `0` or `false` are valid values that must not be replaced:

```ejs
<%= count ?? "Unknown" %>
```

## Conditions

An `if` block can include or omit complete HTML sections:

```ejs
<% if (link) { %>
    <a href="<%= link %>" target="_blank" rel="noopener">Open article</a>
<% } else { %>
    <span>No link available</span>
<% } %>
```

An `else if` or `else` branch follows normal JavaScript syntax. A ternary expression is useful for short choices:

```ejs
<span class="<%= active ? "active" : "inactive" %>"><%= label %></span>
```

## Loops

Use `forEach` to repeat markup for every item in an array:

```ejs
<ul>
<% items.forEach(function (item) { %>
    <li><%= item.title || "Untitled" %></li>
<% }); %>
</ul>
```

Check optional arrays before iterating over them:

```ejs
<% if (Array.isArray(items) && items.length) { %>
    <% items.forEach(function (item) { %>
        <p><%= item.title || "" %></p>
    <% }); %>
<% } else { %>
    <p>No entries available.</p>
<% } %>
```

The loop variable (`item` here) exists only inside the loop. The widget guides show which arrays and properties
their templates provide.

## Local variables and formatting

Temporary variables can make a template easier to read:

```ejs
<%
    const heading = title || "Untitled";
    const cssClass = important ? "important" : "normal";
%>
<h2 class="<%= cssClass %>"><%= heading %></h2>
```

Methods such as `join`, `map`, and `toLocaleString` can be used when the value supports them. Test the type first
when data can vary:

```ejs
<%= Array.isArray(categories) ? categories.join(", ") : "" %>
```

## HTML attributes and links

Escape values placed in attributes:

```ejs
<a href="<%= link || "#" %>" title="<%= title || "" %>"><%= title || "Open" %></a>
```

When a link opens a new tab, add `rel="noopener"`. Avoid constructing event-handler JavaScript from feed values.

## CSS inside a template

A template may contain a `<style>` block. Scope selectors to the current widget when the widget provides an ID;
otherwise the CSS could affect every widget in the view.

VIS can interpret a pair of curly braces as a binding. Multi-line CSS is the safest notation:

```css
.article {
    display: flex;
    gap: 0.5rem;
}
```

Avoid compressing a rule into `.article { display: flex; }` inside a VIS template. Apply the same caution to JSON
or JavaScript object literals embedded in a template.

For responsive images, size against the container rather than subtracting a guessed scrollbar width:

```css
img {
    width: 100%;
    max-width: 100%;
    height: auto;
    box-sizing: border-box;
}
```

## Script, event, and timer considerations

Templates may contain scripts, but the widget can render repeatedly when a state or setting changes. Each render
can otherwise register another event handler or timer. Prefer markup and CSS. If scripting is necessary:

- scope DOM queries to the current widget;
- avoid global variable and function names;
- do not start an unmanaged `setInterval`;
- ensure timers and event handlers from an earlier render can be cancelled or replaced;
- make the script safe when more than one instance of the widget exists.

## Troubleshooting a template

- Start with a small piece of HTML and add fields one at a time.
- Use the Meta Helper or Article Helper described in the widget guides to see the actual data.
- Treat every field as optional because RSS formats and publishers differ.
- Use `<%=` for text and reserve `<%-` for intentionally rendered, trusted HTML.
- Check `Array.isArray(...)` before looping over data that might be missing.
- Keep HTML elements properly nested and close every EJS control block.
- Scope CSS selectors and element IDs so multiple widget instances do not interfere with each other.