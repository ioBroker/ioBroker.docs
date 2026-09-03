![Logo](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/admin/vis-2-widgets-inventwo.png)
# inventwo Widgets for ioBroker vis 2.0

![Number of Installations](http://iobroker.live/badges/vis-2-widgets-inventwo-installed.svg)
![Number of Installations](http://iobroker.live/badges/vis-2-widgets-inventwo-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.vis-2-widgets-inventwo.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.vis-2-widgets-inventwo)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-inventwo.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-inventwo)
[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)

---

## About

A collection of highly customizable widgets for **ioBroker vis 2.0** — built for users who want full control over the look and feel of their dashboards. Every widget comes with extensive styling options and integrates seamlessly with ioBroker data points.

📖 **[User Documentation](docs/README.md)** — detailed guides for all widgets, settings and examples.

---

## Widgets

| Widget | Description |
|---|---|
| [Universal](#widget---universal) | All-in-one widget: switch, button, nav, read-only display, color picker, analog clock and more |
| [Slider](#widget---slider) | Horizontal or vertical slider with step display and gradient colors |
| [Radial Slider](#widget---radial-slider) | Circular arc slider with configurable angles, track and thumb styling |
| [Switch](#widget---switch) | Toggle switch with custom labels and track/thumb colors |
| [Checkbox](#widget---checkbox) | Checkbox with custom true/false values and label positioning |
| [Table](#widget---table) | Dynamic JSON data table with sorting, filtering and conditional row colors |
| [Dropdown](#widget---dropdown) | Dropdown select auto-populated from ioBroker object states |
| [Marquee](#widget---marquee) | Scrolling text ticker with configurable speed, direction and gap |
| [Value List](#widget---value-list) | Bullet-point list generated from a text value or data point |
| [Calendar](#widget---calendar) | Month calendar view, usable as a datepicker, read-only display, and/or today-highlighter |

---

## Widget - Universal

The flagship widget of this adapter — a single widget that can act as a switch, button, navigation element, read-only display, and much more.

![Preview Universal Widget](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_universal_widget.png)

### Interaction types
- **Switch** – toggles a data point between two values
- **Button** – sets a value on press; optionally holds the value as long as pressed and resets on release
- **Navigation** – navigates to a vis view on click
- **Read-only** – displays a value without any interaction
- **View in Dialog** – opens a vis view in a modal dialog
- **Increase / Decrease Value** – increments or decrements a numeric data point
- **HTTP Request / Open URL** – sends an HTTP request or opens a URL (same tab or new tab)

### Display modes
- **Single button** – one widget with one or more states
- **Separated buttons** – each state rendered as its own button (replaces the classic radio button list)

### Content types
Freely combine multiple content elements per state:

![Preview Content Types](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_types.png)

- **Text / HTML** – static or dynamic label
- **Icon** – ioBroker icon library
- **Image** – local or remote image with configurable scale, position and fill mode
- **View in widget** – embed another vis view directly inside the widget
- **Color Picker** – full-featured color picker (HEX, HEX8, RGB, HSL, HSV, CIE) with configurable component visibility

![Preview Color Picker](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_colorpicker.png)

- **Analog Clock** – SVG analog clock with configurable face design, tick marks, numbers and hands

![Preview Analog Clock](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_content_type_clock_analog.png)

### Other features
- Multiple states with individual styling per state
- Click feedback animation
- Conditional state comparison (by value or other criteria)
- Configurable dialog options (fullscreen, close on outside click, auto-close timer)

### Design
Every aspect of the widget is customizable:

![Preview CSS Customization](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_css_customization.png)
![Preview Design Examples](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_univseral_design_examples.png)

For detailed design examples see [here](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/universal-widget-design-examples.md).

### Polygon shapes

Widgets are not limited to rectangles. The **Shape** setting lets you choose from built-in polygon forms or define a fully custom outline:

| Shape | Description |
|-------|-------------|
| Rectangle | Default — standard rectangular card |
| Triangle | Equilateral triangle |
| Diamond | 4-sided rotated square |
| Pentagon | 5-sided polygon |
| Hexagon | 6-sided polygon — perfect for honeycomb layouts |
| Heptagon | 7-sided polygon |
| Octagon | 8-sided polygon |
| Star | 5-pointed star |
| **Custom** | Any polygon — enter clip-path points manually |

![Preview Shapes](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_shapes.png)

**Additional shape options:**
- **Rotation** (0–359°) — rotate any built-in polygon to any angle
- **Corner radius** (0–30) — rounds all vertices uniformly using Bézier curves; works for every shape including custom
- **Custom polygon points** — comma-separated `X% Y%` pairs in clockwise order, e.g. `40% 0%, 100% 50%, 40% 100%, 0% 50%` · Create paths visually at [https://bennettfeely.com/clippy/](https://bennettfeely.com/clippy/)

All existing features — inner/outer shadow, border, gradient backgrounds, click feedback — work with every shape.

> **Example:** Hexagonal honeycomb dashboard → [docs/example-views/hexagonal-view.md](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/example-views/hexagonal-view.md)  
> **Example:** Rectangular dashboard → [docs/example-views/rectangle-view.md](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/main/docs/example-views/rectangle-view.md)

---

## Widget - Slider

A horizontal or vertical slider for controlling numeric data points.

![Preview Slider](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_sliders.png)

**Key features:**
- Horizontal and vertical orientation
- Configurable min, max and step values (auto-read from data point object)
- Optional min/max value labels
- Step display (auto or custom step values)
- Steps can be placed inside the slider bar
- **Read-only mode** – displays a value without allowing interaction
- Gradient color support for rail and active rail (any CSS color string including `linear-gradient(...)`)
- Individual styling for track, active track and thumb including shadow effects

---

## Widget - Radial Slider

A circular arc slider for an elegant alternative to the classic linear slider.

![Preview Radial Slider](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-radial-slider.png)

**Key features:**
- Freely configurable start and end angle
- Configurable track width, track color and active track color
- Optional value display in the center with font size and color
- Optional label below the value
- Thumb size and color
- Shadow effects for both track and thumb

---

## Widget - Switch

A toggle switch for boolean or two-state data points.

![Preview Switches](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_switches.png)

**Key features:**
- Custom true/false values (not limited to boolean)
- Individual text labels for each state
- Label position: top, bottom, start or end
- Fully customizable track and thumb colors (including gradients)
- "From Widget" styling – inherit styling from another switch widget

---

## Widget - Checkbox

A checkbox for boolean or two-state data points.

![Preview Checkbox](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_checkbox.png)

**Key features:**
- Custom true/false values
- Individual text labels for each state
- Label position: top, bottom, start or end
- Customizable box and active box colors and size

---

## Widget - Table

A dynamic data table that renders JSON objects from an ioBroker data point.

![Preview Table](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/img/preview_table.png)

**Key features:**
- Configurable columns: key, title, prefix, suffix, placeholder
- Column value formats: Text, Number (with decimals), Datetime, Image
- Sortable columns with single or **multi-column sorting**
- **Column filter** – filter rows by column value
- **Sticky header** – header stays visible while scrolling
- Default sort configuration (column and direction)
- Max row limit
- **Conditional row colors** – highlight rows based on column value conditions
- Customizable header and row styling (background, height, border)

---

## Widget - Dropdown

A dropdown select control that auto-populates its options from the `common.states` property of an ioBroker object.

![Preview Dropdown](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/raw/main/src-widgets/public/img/vis-widget-inventwo-dropdown.png)

**Key features:**
- Options are automatically loaded from the data point's defined states
- Options can display value, text label or both
- Optional title above the dropdown
- **Read-only mode**
- **Conditional background color** – changes dropdown background based on value conditions (with optional application to title)
- Customizable font, text color, background, highlight color, border (width, color, radius) and shadow
- Individual title styling (font size, color, padding)

---

## Widget - Marquee

A horizontally scrolling text ticker — ideal for displaying long text values or notifications.

**Key features:**
- Data point or static text as source
- Scroll direction: left or right
- Configurable scroll speed (px/s)
- Configurable number of text copies (prevents gaps for short texts)
- Configurable gap between copies
- **Pause on hover**
- Background color support
- Inherits font styling from vis widget settings

---

## Widget - Value List

Renders a bullet-point list from a single text value — either from a data point or entered manually.

**Key features:**
- Data point or manual text input as source
- Freely configurable separator — any character or string:
  - Comma: `,`
  - Semicolon: `;`
  - Newline: `\n`
  - Tab: `\t`
  - Any other custom string
- Trimming of leading/trailing whitespace per item
- Filtering of empty items
- Bullet types: `•` Disc, `○` Circle, `▪` Square, `–` Dash, `›` Arrow, `1. 2. 3.` Numbered, None, Custom character
- Individual bullet color, independent from text color
- Text color, background, font size, text alignment
- Configurable spacing between bullet and text
- Configurable line spacing between items
- Inner padding

---

## Widget - Calendar

Month calendar view, a plain date picker based on MUI's Date Calendar (datepicker, read-only date display, and/or today-highlighter — freely combinable via "Read only" and "Highlight today").

**Key features:**
- Reads/writes a date from an object ID, as timestamp (ms) or ISO date string (`YYYY-MM-DD`)
- "Read only" mode to just display a date without allowing changes
- "Highlight today" to mark the current day distinctly
- Disable past and/or future dates
- Optional month/year quick navigation via the header
- First day of week: Monday or Sunday
- Optional calendar week numbers, ISO-8601 or "simple" (week 1 contains Jan 1st) style
- Configurable day cell size
- Independent color styling for header, weekdays, regular days, selected day (incl. shadow), today marker and week numbers
- Follows the browser language for month/weekday names
- "From widget" style reuse across multiple Calendar widgets

---

## Widget - Event Calendar

Google-Calendar-style view for events/appointments, based on FullCalendar. Every color, font size, and border is configurable.

**Key features:**
- Point "Events (datapoint)" at a datapoint holding a JSON list of events - either a simple custom shape or the native JSON produced by the ioBroker "ical" adapter
- All views from FullCalendar's free/MIT bundle: Month, Week, Day, Multi-month (year), and List (day/week/month/year)
- Optional calendar week numbers (ISO-8601 or "simple"/locale-dependent), mainly for Month/Multi-month views
- Header bar (title + prev/next/today navigation) can be shown/hidden, and navigation can be disabled independently while keeping the title
- Correctly handles multi-day/all-day events (iCal exclusive-end convention)
- Only needs the events datapoint - no separate object ID required
- Configurable event color rules: color events by title (case-insensitive substring match), overriding the source color - works around the ioBroker "ical" adapter only providing one color per calendar, not per event
- Fully configurable header (title color/size, button text/background/border/radius incl. hover), weekdays (color/background/size), day (color/size, outside-month color, weekend background), today (background/text/border color+width, live now-indicator line), event tiles (background/text/border/radius/size, "+N more" link color), and grid borders (show/hide, width, color) - each color group with independent "From widget" style reuse
- Calendar resizes live when the widget is resized in the vis editor (no page reload needed)
- Follows the browser language for month/weekday names

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.10.0 (2026-09-01)
- Event Calendar Widget: Added support for showing multiple calendars at once via a new "Additional calendars" group (datapoint + color + label per calendar, e.g. one iCal calendar per family member), merged into a single view with an optional color/label legend below the calendar and a persistent per-event colored left border showing which calendar an event belongs to (kept even when an Event color rule overrides the tile's fill color). The original single "Events (datapoint)" field keeps working unchanged when no additional calendars are configured; once at least one is added, that field is ignored
- Event Calendar Widget: Added "Max. events per day" setting (Month/Multi-month views) to cap how many event tiles are shown per day cell before the rest collapse behind FullCalendar's "+N more" popover link, instead of day cells always growing with the number of events
- Universal Widget: Fixed the dialog title "Size" setting, which was configurable but had no effect on the rendered dialog title font size

### 1.9.0 (2026-07-29)
- Added new Event Calendar Widget: Google-Calendar-style view for events/appointments based on FullCalendar, fed from a datapoint holding a JSON list of events (either a simple custom shape or the native JSON produced by the ioBroker "ical" adapter). Supports all FullCalendar free/MIT views (Month, Week, Day, Multi-month, List day/week/month/year), optional calendar week numbers, optional header bar/navigation, live resizing in the vis editor, and fully configurable header/weekday/day/today/event-tile/border styling (colors, font sizes, border radius/width, hover states, now-indicator), each with independent "From widget" style reuse

### 1.8.1 (2026-07-23)
- Added preview image for calendar and value list widgets

### 1.8.0 (2026-07-16)
- Radial Slider Widget: Added "Read only" option to prevent value changes, matching the Slider widget's behavior
- Table Widget: Added pagination support ("Pagination" / "Rows per page") to split large tables across pages instead of showing all rows at once
- Table Widget: Added weekday (WD/WDL) and calendar week (KW/K) tokens
- Added new Calendar Widget: month calendar based on MUI's Date Calendar, usable as a datepicker (read/write a date), a read-only date display, and/or a today-highlighter, with configurable first day of week, ISO/simple calendar week numbers, and full color/size customization

### 1.7.0 (2026-06-24)
- Dropdown Widget: Added support for manually defined value/label pairs as an alternative to OID-based state enumeration

## Older changes
Can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

---

## License
The MIT License (MIT)

Copyright (c) 2025-2026 jkvarel <jk@inventwo.com>

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