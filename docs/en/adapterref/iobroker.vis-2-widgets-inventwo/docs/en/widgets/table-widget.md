---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"}}}
---
> 🌐 **English** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/table-widget.md)

# Table Widget

The Table Widget displays data from an ioBroker datapoint as a formatted table. The datapoint must contain a **JSON array** — a list of objects where each object represents one row. This is perfect for showing sensor readings, device lists, history logs, or any structured data that an adapter writes as JSON.

![Table Widget](../img/widget-table.png)

---

## How to Add the Widget

1. Drag **Table** from the **inventwo design** widget list onto your view.
2. Click **Object ID** and select a datapoint that contains a JSON array (see the data format section below).
3. The table renders automatically with one column per JSON key.
4. To customize columns (titles, widths, formatting), increase **Count columns** and configure each column.

---

## Expected Data Format

The datapoint must contain a JSON array of objects. Each object is one row, and each key becomes a column.

```json
[
  { "name": "Living Room", "temp": 21.3, "humidity": 58 },
  { "name": "Kitchen",     "temp": 22.1, "humidity": 62 },
  { "name": "Bedroom",     "temp": 19.8, "humidity": 55 }
]
```

If the datapoint value is not valid JSON, the table shows an error message.

---

## Settings

### Common

| Setting | What it does |
|---------|-------------|
| **Object ID** | The datapoint containing the JSON array. |
| **Count columns** | Number of manually configured columns. Set to **0** for automatic columns (all keys shown in the order they appear in the JSON). Increase this to configure each column individually. |
| **Max rows** | Maximum number of rows to display. Set to **0** to show all rows. |
| **Show head** | Shows or hides the header row with column titles. |
| **Pagination** | When enabled, rows are split into pages with navigation controls at the bottom of the table instead of showing all rows at once. |
| **Rows per page** | *(Pagination only)* Number of rows shown per page. |
| **Sticky header** | When enabled, the header row stays visible while you scroll through many rows. |
| **Sum row** | When enabled, a double bottom border is drawn below the second-to-last row, visually separating the last row as a totals or summary row. |

---

### Sorting

| Setting | What it does |
|---------|-------------|
| **Default sort column** | The column key to sort by when the table first loads. |
| **Default sort order** | **Ascending** or **Descending**. |
| **Multi-column sorting** | Enables sorting by multiple columns at once. Click a column header to add it to the sort order. Click again to reverse direction. Click a third time to remove that column from sorting. The number badge on the header shows the sort priority. |
| **Number of default sort columns** | *(Multi-sort only)* How many default sort columns to configure. |

Users can click column headers at runtime to change the sort order (if **Sortable** is enabled for that column).

---

### Column settings (per column)

When **Count columns** is greater than 0, each column has these settings:

| Setting | What it does |
|---------|-------------|
| **Hide column** | Hides this column from the table without removing its configuration. |
| **Key** | The JSON property name to display in this column, e.g. `temp`. If left empty, the column uses the key at that position in the JSON. |
| **Formula** | Optional arithmetic expression computed from the row's JSON fields. When set, the result replaces the key's raw value. JSON keys are used directly as variables, e.g. `price * qty` or `value * 100`. Supported operators: `+` `-` `*` `/` `%` `**` and parentheses `()`. The result is then processed by the **Format** setting (e.g. rounded as a number). |
| **Title** | Column header label. If empty, the JSON key name is used. |
| **Width** | Fixed column width in pixels (0 = automatic). |
| **Prefix** | Text added before the cell value, e.g. `~`. |
| **Suffix** | Text added after the cell value, e.g. ` °C`. |
| **Placeholder** | Text shown when the cell value is empty or null. |
| **Title align** | Alignment of the column header: Left, Center, Right. |
| **Content align** | Alignment of the cell values: Left, Center, Right. |
| **Format** | How the value is displayed: **Text** (plain), **Number** (with decimal places), **Boolean** (renders a read-only checkbox), **Datetime** (date/time formatting), **Image** (renders a URL as an image), **URL** (renders the value as a clickable link), **IP address** (treats the value as an IPv4 address for correct numeric sorting). |
| **Link target** | *(URL format only)* Where the link opens: **New tab** (`_blank`), **Same tab** (`_self`), **Parent frame** (`_parent`), **Top frame** (`_top`). |
| **Decimals** | *(Number format only)* Number of decimal places. |
| **Decimal separator** | *(Number format only)* Character used to separate decimals, e.g. `.` or `,`. Leave empty to use the browser locale default. |
| **Thousand separator** | *(Number format only)* Character used to separate thousands, e.g. `,` or `.`. Leave empty for no separator. |
| **Color (checked)** | *(Boolean format only)* Color of the checkbox when the value is truthy. |
| **Color (unchecked)** | *(Boolean format only)* Color of the checkbox when the value is falsy. |
| **Datetime format** | *(Datetime format only)* **Datetime** (date and time), **Date** (date only), **Time** (time only), **Custom format** (enter your own pattern). |
| **Custom format** | *(Custom datetime only)* Format pattern — see the token table below. |
| **Sortable** | Adds a sort arrow to this column's header that users can click. |
| **Enable filter** | Adds a filter icon to this column's header. Clicking it opens a checklist to show/hide rows by value. |

#### Custom Datetime Format Tokens

| Token | Meaning | Example |
|-------|---------|---------|
| `YYYY` | 4-digit year | `2025` |
| `YY` | 2-digit year | `25` |
| `MM` | Month (with leading zero) | `07` |
| `M` | Month (no leading zero) | `7` |
| `DD` | Day (with leading zero) | `04` |
| `D` | Day (no leading zero) | `4` |
| `hh` | Hours (with leading zero) | `09` |
| `h` | Hours (no leading zero) | `9` |
| `mm` | Minutes (with leading zero) | `05` |
| `ss` | Seconds (with leading zero) | `00` |
| `sss` | Milliseconds | `123` |
| `WD` | Weekday short name | `Mon` |
| `WDL` | Weekday full name | `Monday` |
| `KW` | Calendar week (with leading zero) | `27` |
| `K` | Calendar week (without leading zero) | `27` |

Example: `DD.MM.YYYY hh:mm` → `04.07.2025 09:05`
Example: `WDL, YYYY (KW/52)` → `Friday, 2025 (27/52)`

---

### Row color conditions

You can automatically change a row's background color based on the value of a specific cell. This is great for highlighting critical or noteworthy rows.

| Setting | What it does |
|---------|-------------|
| **Number of conditions** | How many color rules to add. |
| **Column key or index** | The JSON key name, or a column index (0-based) to evaluate. |
| **Comparison operator** | How to compare: **Equal**, **Not equal**, **Greater**, **Less**, **Greater equal**, **Less equal**. |
| **Value** | The value to compare against. |
| **Row color** | Background color applied to the entire matching row. |
| **Value color (whole row)** | Text color applied to all cells in the matching row. |
| **Value color (column only)** | Text color applied only to the cell in the condition column. |

The first matching condition wins. All other row colors (odd/even alternating) are overridden by a matching condition.

---

### inventwo — Table

| Setting | What it does |
|---------|-------------|
| **Background header** | Background color of the header row. |
| **Background odd row** | Background color of odd-numbered rows (1st, 3rd, ...). |
| **Background even row** | Background color of even-numbered rows (2nd, 4th, ...). |
| **Header height** | Height of the header row in pixels. |
| **Column height** | Height of each data row in pixels. |
| **Pagination height** | *(Pagination only)* Height of the pagination bar in pixels. |
| **Thickness header** | Bottom border thickness of the header row. |
| **Color header** | Bottom border color of the header row. |
| **Thickness** | Bottom border thickness of each data row. |
| **Color** | Bottom border color of data rows. |

---

### inventwo — Border radius

Rounds the corners of the table container. Set individually for top-left, top-right, bottom-right, and bottom-left. Use **From widget** to copy from another Table Widget.

---

### inventwo — Border

Adds an outer border around the table container. Set border style (solid, dashed, dotted, etc.), size per side, and color. Use **From widget** to copy from another Table Widget.

---

### inventwo — Outer shadow

Adds a drop shadow around the table container. Set X offset, Y offset, blur, size, and color. Use **From widget** to copy from another Table Widget.

---

## Tips

- **Start with auto columns:** Leave **Count columns** at 0 first to see the raw data. Then increase it to take control of titles, order, and formatting.
- **Temperature with unit:** Set column **Format** to **Number**, **Decimals** to 1, and **Suffix** to ` °C` — the cell will show `21.3 °C`.
- **Image column:** If a JSON property contains a URL to an image, set the column **Format** to **Image** and the cell will render the image directly.
- **Link column:** If a JSON property contains a URL, set the column **Format** to **URL** to render a clickable link. Use **Link target** to control whether the link opens in a new tab or the same tab.
- **Sum row:** Put your totals as the last row in the JSON array and enable **Sum row** to separate it with a double line.
- **Large datasets:** Enable **Pagination** and set **Rows per page** to keep large tables readable instead of scrolling through hundreds of rows. **Max rows** still applies as an overall cap before paging.
- **Sorting by default:** Enter the JSON key in **Default sort column** (e.g. `temp`) to pre-sort the table when the view loads.

---

## See Also

- [Dropdown Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md) — for selecting from a list of predefined values
- [Value List Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md) — for simple bullet-point lists from text values