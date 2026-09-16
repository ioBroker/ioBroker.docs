---
chapters: {"pages":{"en/adapterref/iobroker.life360ng/README.md":{"title":{"en":"ioBroker adapter for Life360 (next generation)"},"content":"en/adapterref/iobroker.life360ng/README.md"},"en/adapterref/iobroker.life360ng/docs/en/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.life360ng/docs/en/README.md"},"en/adapterref/iobroker.life360ng/docs/en/general.md":{"title":{"en":"Tab: General"},"content":"en/adapterref/iobroker.life360ng/docs/en/general.md"},"en/adapterref/iobroker.life360ng/docs/en/myplaces.md":{"title":{"en":"Tab: My Places"},"content":"en/adapterref/iobroker.life360ng/docs/en/myplaces.md"},"en/adapterref/iobroker.life360ng/docs/en/integration.md":{"title":{"en":"Tab: Integration"},"content":"en/adapterref/iobroker.life360ng/docs/en/integration.md"},"en/adapterref/iobroker.life360ng/docs/en/tracker.md":{"title":{"en":"Tab: Logbook"},"content":"en/adapterref/iobroker.life360ng/docs/en/tracker.md"},"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md":{"title":{"en":"Tab: Map Display"},"content":"en/adapterref/iobroker.life360ng/docs/en/mapdisplay.md"},"en/adapterref/iobroker.life360ng/docs/en/notifications.md":{"title":{"en":"Tab: Notifications"},"content":"en/adapterref/iobroker.life360ng/docs/en/notifications.md"},"en/adapterref/iobroker.life360ng/docs/en/advanced.md":{"title":{"en":"Tab: Advanced"},"content":"en/adapterref/iobroker.life360ng/docs/en/advanced.md"},"en/adapterref/iobroker.life360ng/docs/en/help.md":{"title":{"en":"Tab: Help"},"content":"en/adapterref/iobroker.life360ng/docs/en/help.md"}}}
---
![Logo](../../admin/Life360ng.svg)
### The Next Generation
[zurück zur Startseite](/#/docs/adapterref/iobroker.life360ng/docs/en/README.md)

(from version 1.4.0 – only the Latest version offers the full scope)
# Tab: Logbook

## Logbook and Map Features

The ioBroker life360ng adapter provides comprehensive logbook and map features for each tracked person:

- **Individual maps for each person:** For every person with tracking enabled, a dedicated map is available showing traveled routes (GeoJSON-based) and the current position.
- **Family map:** In addition, a family map displays the routes of all enabled persons together.
- **Integrated datepicker:** The map HTML includes a calendar to select a specific day and display the route for that day.
- **Flexible integration:** Maps can be opened directly in the browser or embedded as an iframe in visualizations (e.g., ioBroker VIS).
- **Map appearance:** Colors, route style, place flags and layout are configured in the [Map Display](/#/docs/adapterref/iobroker.life360ng/docs/en/mapdisplay.md) tab.

All details on configuration and usage can be found below and in the adapter configuration.

## Using the Person Map and Family Map

The ioBroker life360ng adapter provides two map types for visualizing movement data:

### 1. Person Map
Each person with tracking enabled gets their own map. This map displays traveled routes as colored lines (GeoJSON-based) and current positions.

- **Activation:** Enable the desired person in the adapter under "Tracker" (`enabled`).
- **Own Map:** The `ownMap` option controls whether a separate map is created for this person.
- **Access:** The map URL can be found in the object tree at `life360ng.<instance>.tracker.<person>.url`.

### 2. Family Map
The family map shows the routes of all enabled persons together on one map.

- **Activation:** At least one person must have the `familyMap` option enabled in the tracker.
- **Access:** The URL for the circle map is available at `life360ng.<instance>.tracker.circle.url`.

> All map appearance settings (colors, route style, place flags, layout) are found in the **[Map Display](/#/docs/adapterref/iobroker.life360ng/docs/en/mapdisplay.md)** tab.

### 3. Datepicker
The map HTML includes a datepicker. You can use it to select a specific day and display the route for that day. By default, the current route is shown. The datepicker is especially useful for reviewing movements on particular days.

**Note:** The appearance may vary depending on the browser used.

#### Default View Range

Under **General → Default view (days)** you can configure how many days are shown by default when the map is opened.

| Value | Effect |
|---|---|
| 1 (default) | Only today's route is shown |
| 2 | Today and yesterday |
| N | Today and the N−1 previous days |

Every time the map is opened, the start date is set to today minus (N−1) days based on the configured value. Manually adjusting the datepicker changes the view for the current session only.

---

### 4. Hamburger Menu (☰)

Click the ☰ icon in the top right corner to open the settings panel. Settings are saved per map in the browser's session storage and persist until the tab is closed.

| Option | Description |
|---|---|
| **Route** | Shows the traveled route as a colored line on the map. When route is enabled, a date range picker is also shown. |
| **Places** | Shows Life360 places as flag markers on the map. |
| **Places radius** | Shows the configured radius circle around each Life360 place. |
| **My Places** | Shows custom places (My Places) as flag markers on the map. |
| **My Places radius** | Shows the radius circle around each custom place. |
| **Day highlight** | Enables the interactive day highlight feature (see below). |
| **Footer** | Shows or hides the legend below the map. |
| **Map size** | Displays the current map dimensions in the header. |
| **Auto-Refresh** | Automatically reloads the page at the configured polling interval. Enabled by default. Disable to freeze the current view. |
| **Live Follow** | Pans the map to the latest GPS position of the selected person on every page load. Enabling Live Follow automatically enables Auto-Refresh. |
| **↻ Reload** | Reloads the map completely. |

#### Live Follow

When **Live Follow** is enabled, the map automatically pans to the most recent GPS position of the tracked person after every page refresh. This allows you to follow a person in real time without touching the map.

- Enabling Live Follow **automatically enables Auto-Refresh** so the page reloads periodically to pick up new positions.
- Disabling Live Follow does **not** disable Auto-Refresh — they are controlled independently after that.
- In the **circle map**, the person to follow is determined by the currently focused person (the last one clicked in the legend). If no focus has been set, the map follows the person whose route is displayed.
- The followed position is the last recorded GPS point of the selected day range.

#### Day Highlight

When **Day highlight** is enabled, routes on the map can be highlighted interactively:

- **Hover (mouse over a line):** The route for that day is temporarily highlighted — the line becomes thicker and fades all other days. Moving the mouse away restores the normal state. A tooltip shows the date of the route.
- **Click on a line:** The highlight is locked. The route stays active and a popup appears with the date (person map) or name and date (family map). Clicking the same line again or clicking the map background removes the lock.
- **Click on a marker:** Opens the popup for that marker (start or end point of the day) without triggering the day highlight.

> **Note:** Once a route is locked by a click, the hover tooltip on lines is suppressed — the locked view remains undisturbed.

> The generated HTML, CSS, and JS files are stored in the ioBroker file system. You can view or manage them under **Admin → Files → `life360ng.<instance>/tracker/`**.

---

## Explanations of the points and pins on the maps

| Type | Reason |
|---|:---|
|Dark points: | Starting point of the day|
|Light points: | Ending point of the day|
|Pin/Marker: | Current location|

---

## Data Management

Route data (`allTime.geojson`) grows over time. The adapter offers two ways to keep file sizes under control:

### Automatic Cleanup (Retention Period)

Under **General → Retention (days)** you can define how many days of route data should be kept. Older days are automatically removed on every adapter start and once per day. A value of `0` means unlimited retention.

### Manual Cleanup for Individual Persons

The **persons table** has a **"Clear rec."** column. Enable the checkbox for a person and save the configuration. That person's `allTime.geojson` is reduced to the last known position.

> ⚠️ Since the family map is built from the individual person data, clearing a person's recordings automatically updates the family map as well.
> The monthly GeoJSON files (`currentYear.MM`) are never affected.