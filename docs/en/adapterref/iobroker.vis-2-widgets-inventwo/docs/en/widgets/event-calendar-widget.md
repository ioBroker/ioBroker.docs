---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md":{"title":{"en":"Migrating inventwo vis-1 widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md":{"title":{"en":"Universal Widget — Interaction Types"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/event-calendar-widget.md":{"title":{"en":"Event Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/event-calendar-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/content-types.md":{"title":{"en":"Universal Widget — Content Types"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/content-types.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/styling-and-shapes.md":{"title":{"en":"Universal Widget — Styling and Shapes"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/styling-and-shapes.md"}}}
---
> 🌐 **English** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/event-calendar-widget.md)

# Event Calendar Widget

The Event Calendar Widget shows events/appointments (e.g. from an iCal calendar) in a Google-Calendar-style view, based on [FullCalendar](https://fullcalendar.io/). Every color, font size, and border is configurable, and all views available in FullCalendar's free/MIT bundle are supported: Month, Week, Day, Multi-month (year), and four List views.

Looking for a plain date picker instead? Use the [Calendar Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md).

---

## How to Add the Widget

1. Drag **Event Calendar** from the **inventwo design** widget list onto your view.
2. Click **Events (datapoint)** and select the datapoint that holds the JSON event list (see [Showing events](#showing-events) below).
3. Choose the **View** and adjust the header/navigation/week-number and color settings.

---

## Settings

### Common

| Setting | What it does |
|---------|-------------|
| **Events (datapoint)** | Datapoint holding a JSON list of events (see [Showing events](#showing-events) below). Ignored once at least one calendar is configured in the *Additional calendars* group below. |
| **First day of week** | Whether weeks start on **Monday** or **Sunday**. |
| **View** | **Month**, **Week**, **Day**, **Multi-month (year)** (a grid/stack of several months), or one of four **List** views (**List - day/week/month/year**, an agenda-style list of upcoming events). |
| **Show header bar** | Enabled by default. Disable to hide the toolbar (title + navigation buttons) entirely. |
| **Allow month/week/day navigation** | Only shown when **Show header bar** is enabled. Enabled by default. Disable to keep the title visible but remove the prev/next/today buttons, so the user can't switch to a different month/week/day. |
| **Show calendar week numbers** | Adds a week-number badge to each day cell (mainly visible in Month/Multi-month views). |
| **Calendar week type** | Only visible when week numbers are shown. **ISO-8601**: weeks start on Monday, week 1 is the week containing the first Thursday of the year (the European standard). **Simple**: locale-dependent week numbering. |
| **Max. events per day** | Only visible and effective in the **Month**/**Multi-month (year)** views. Defaults to `0` = no limit, day cells keep growing with the number of events as before. Above 0, only that many event tiles are shown per day; the rest sit behind a "+N more" link that opens a popover with all of that day's events when clicked. |

---

### Additional calendars

By default the widget shows the events of a single datapoint (**Events (datapoint)** above). To show multiple calendars at once - e.g. one iCal calendar per family member - list them here instead. Each calendar gets its own color and label, shown in a legend below the calendar.

Once at least one calendar is configured here, the single **Events (datapoint)** field above is ignored entirely and can be left empty.

| Setting | What it does |
|---------|-------------|
| **Number of calendars** | How many calendars to configure below. |
| **Show legend** | Enabled by default. Only shown once at least one calendar is configured. Toggles the color/label legend below the calendar. |
| **Events (datapoint)** *(per calendar)* | Datapoint holding this calendar's JSON event list (same format as above, see [Showing events](#showing-events)). |
| **Color** *(per calendar)* | Overrides the color of every event from this calendar (its own `color`/`_calColor`, and the fallback **Event background color**). Leave empty to keep the color provided by the event/adapter. |
| **Label** *(per calendar)* | Caption for this calendar in the legend. Leave empty to omit it from the legend (it's still shown on the calendar). |

The [Event color rules](#event-color-rules) below still apply on top of all calendars, and override a calendar's color on a match. To keep it clear which calendar an event came from either way, every event tile also gets a 4px colored left border in that calendar's color, regardless of whether a color rule overrode the tile's fill color. In the List views (which render events as table rows), the built-in dot shown before the event title is colored instead, so it stays centered in its column.

---

### Event color rules

The ioBroker **ical** adapter only exposes one color per calendar (`_calColor`), not per event - unlike Google Calendar itself, which colors individual events. So events from the same calendar all come through with the same color and can't be told apart. Event color rules let you assign colors manually based on the event title instead.

| Setting | What it does |
|---------|-------------|
| **Number of rules** | How many rules to configure below. |
| **Title contains** *(per rule)* | Text to match against the event title. Matching is case-insensitive and matches if the title *contains* this text (not just an exact match) - e.g. `Geburtstag` matches "Geburtstag Mama" and "Geburtstag Papa" alike. |
| **Background color** *(per rule)* | The color used for events whose title matches. |

Rules are checked in order (rule 1, then rule 2, ...) and the first match wins. A matching rule overrides any color the event itself provides (its own `color`/`_calColor`, and the fallback **Event background color** from the *event tiles* group below) - that's the point, since the adapter's own color is not useful for telling events apart.

---

### inventwo — Calendar events: header

The FullCalendar toolbar: title and the prev/next/today navigation buttons.

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy these settings from another Event Calendar Widget. |
| **Header title color** | Color of the month/year/day title. |
| **Title font size** | Font size of the title, in pixels. |
| **Button text color** | Text color of the prev/next/today buttons. |
| **Button background color** | Background color of the buttons. Accepts `transparent`. |
| **Button border color** | Border color of the buttons. |
| **Button border radius** | Corner rounding of the buttons, in pixels. |
| **Button text color (hover)** | Text color while hovering/focusing/active. |
| **Button background color (hover)** | Background color while hovering/focusing/active. |

---

### inventwo — Calendar events: weekdays

The row of weekday column headers (Month/Week/Day/Multi-month views) - and, since it's the same kind of heading, also the day/date title bar shown above each day's events in the List views.

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy these settings from another Event Calendar Widget. |
| **Weekday text color** | Color of the weekday abbreviations/column headers, and of the day/date text in the List views' title bar. |
| **Weekday background color** | Background color of the weekday header row, and of the List views' title bar. Accepts `transparent`. |
| **Weekday font size** | Font size of the weekday labels, and of the List views' title bar text, in pixels. |

---

### inventwo — Calendar events: day

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy these settings from another Event Calendar Widget. |
| **Day number text color** | Color of the day number shown in each tile (Month/Multi-month views). |
| **Day number font size** | Font size of the day number, in pixels. |
| **Day outside month text color** | Text color of the leading/trailing days from the previous/next month shown to fill the month grid. |
| **Weekend background color** | Background color of Saturday/Sunday columns. Accepts `transparent` to leave them unstyled. |
| **Week number text color** | Only shown when **Show calendar week numbers** is enabled. Text color of the week-number badge. |
| **Week number background color** | Only shown when **Show calendar week numbers** is enabled. Background color of the week-number badge. |
| **Week number font size** | Only shown when **Show calendar week numbers** is enabled. Font size of the week-number badge, in pixels. |

---

### inventwo — Calendar events: today

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy these settings from another Event Calendar Widget. |
| **Today background color** | Background color of today's cell/column. |
| **Today text color** | Text color of today's day number/column header. |
| **Today border color** | Color of the highlight border drawn around today's cell/column. |
| **Today border width** | Thickness of that border, in pixels (0–10). |
| **Show current time indicator** | Enabled by default. Only visible in the Week/Day views. Shows a live line at the current time. |
| **Current time indicator color** | Only shown when the indicator is enabled. Color of that line (and its arrow marker). |

---

### inventwo — Calendar events: event tiles

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy these settings from another Event Calendar Widget. |
| **Event background color** | Fallback background color for an event tile, used when the event itself doesn't provide a `color` (see below). |
| **Event text color** | Text color of event tiles. |
| **Event border color** | Border color of event tiles. |
| **Event border radius** | Corner rounding of event tiles, in pixels. |
| **Event font size** | Font size of the event title text, in pixels. |
| **"+N more" link color** | Color of the "+N more" link shown in Month view when a day has more events than fit in the cell. |

---

### inventwo — Calendar events: borders

The grid lines between day cells/columns.

| Setting | What it does |
|---------|-------------|
| **From widget** | Copy these settings from another Event Calendar Widget. |
| **Show grid borders** | Enabled by default. Disable to remove all grid lines. |
| **Border width** | Only shown when borders are enabled. Thickness in pixels (0–5). |
| **Border color** | Only shown when borders are enabled. Color of the grid lines. |

---

## Showing events

The Event Calendar Widget does not parse iCal (`.ics`) data itself. Instead, point **Events (datapoint)** at a datapoint whose value is a JSON array of events. Each event is an object with:

| Field | Alternative field | Required | Description |
|-------|--------------------|----------|--------------|
| `title` | `summary`, `event` | Yes | The text shown on the event tile. |
| `start` | `_date` | Yes | Start of the event. ISO date/time string (e.g. `2026-08-03T10:00:00`) or a timestamp in milliseconds. |
| `end` | `_end` | No | End of the event, same formats as `start`. Defaults to `start` (single-day event). |
| `allDay` | `_allDay` | No | Set to `true` for all-day events. Following the standard iCal/FullCalendar convention, `end`/`_end` is then treated as **exclusive** — the day *after* the last visible day, not the last day itself. |
| `color` | `_calColor` | No | Overrides **Event background color** for this specific event. |

The "alternative field" column exists because the widget also accepts the JSON produced directly by the ioBroker **ical** adapter's JSON datapoint (e.g. `ical.0.data.table`) — no conversion script needed, just point **Events (datapoint)** at it. Example of that native shape:

```json
[
  {
    "event": "Wertstoff",
    "_date": "2026-07-28T22:00:00.000Z",
    "_end": "2026-07-29T22:00:00.000Z",
    "_allDay": true,
    "_calColor": "#FF0000"
  }
]
```

Or, with the simple custom shape:

```json
[
  { "title": "Team meeting", "start": "2026-08-03T10:00:00", "end": "2026-08-03T11:00:00" },
  { "title": "Vacation", "start": "2026-08-05", "end": "2026-08-10", "allDay": true, "color": "#c0743c" }
]
```

Note the exclusive end for the all-day "Vacation" example above: to show the event on August 5th–9th, `end` is set to August 10th (the day after).

---

## Tips

- **Language:** Month/weekday names follow the browser language automatically.
- **Resizing:** The calendar keeps its size in sync live when you resize the widget in the vis editor — no page reload needed.
- **List views:** Great for a compact "upcoming events" widget — pick **List - week** or **List - month** and disable the header bar/navigation for a fixed agenda view.
- **Style reuse:** Use **From widget** in each style group to keep multiple event calendars visually consistent.

---

## See Also

- [Calendar Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md) — plain date picker without events
- [Table Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md) — for displaying date values as part of a larger data table