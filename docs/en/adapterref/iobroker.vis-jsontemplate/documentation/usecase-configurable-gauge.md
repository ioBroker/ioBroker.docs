---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-tasklist.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-configurable-gauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-configurable-gauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
---
#### Use case for a configurable segmented gauge

##### **Introduction**

This use case creates a responsive SVG gauge with the `JSON Template` widget.
It is inspired by the following display; the image background is deliberately
not reproduced because the template itself is transparent.

![Configurable segmented gauge](gauge.jpeg)

The template provides:

- configurable absolute minimum and maximum values
- configurable start and stop angles and bar width
- a colored or transparent background arc
- any number of sectors using absolute or percentage boundaries
- a solid color or an arc-following color gradient for each sector
- optional absolute or percentage boundary labels
- an absolute or percentage value in the exact center of the SVG display
- configurable value typography and an optional value box
- a configurable outer safety margin for long boundary labels
- numeric input supplied as either a number or a numeric string

No external library is required. The gauge is display-only.

---

##### **Integration into VIS or VIS-2**

1. Add the `JSON Template` widget to the view.
2. Set the number of additional data points to `1`.
3. Select the numeric source data point under **Datapoints[1]**.
4. Enter `gaugevalue` as the variable name for that data point.
5. Open the template editor and paste the complete contents of
   [`configurable-gauge-template.ejs`](https://github.com/oweitman/ioBroker.vis-jsontemplate/blob/main/documentation/configurable-gauge-template.ejs).
6. Give the widget enough space, for example 500 x 310 pixels.
7. Set the VIS widget background to transparent if a background color is
   configured outside the template.

With the variable name `gaugevalue`, the data point ID is available as
`gaugevalue`, while its current value is available as `gaugevalue_value`.
The template uses `gaugevalue_value` and accepts a number or a numeric string.
The main JSON data point and the EJS variable `data` are not used.

---

##### **Configuration**

All options are located at the beginning of the template.

| Option                              | Description                                           |
| ----------------------------------- | ----------------------------------------------------- |
| `gaugeMin`, `gaugeMax`              | Absolute input range represented by 0 and 100 percent |
| `gaugeStartAngle`, `gaugeStopAngle` | Arc angles; 0 is top, 90 is right, and -90 is left    |
| `gaugeBarWidth`                     | Width of the SVG arc                                  |
| `gaugeBackgroundColor`              | CSS color for the inactive arc, or `transparent`      |
| `gaugeMargin`                       | Free space around the gauge for long boundary labels  |
| `gaugeSectors`                      | Array containing any number of colored ranges         |
| `showSectorLabels`                  | Shows or hides sector boundary labels                 |
| `labelMode`                         | Displays boundaries as `absolute` or `percent` values |
| `gaugeEndLabelGap`                  | Gap between a horizontal arc and its Min/Max labels   |
| `gaugeMinLabelOffsetX/Y`            | Fine adjustment of the absolute minimum label         |
| `gaugeMaxLabelOffsetX/Y`            | Fine adjustment of the absolute maximum label         |
| `showValue`                         | Shows or hides the current value                      |
| `valueMode`                         | Displays the current value as `absolute` or `percent` |
| `valueBoxEnabled`                   | Enables or disables the box behind the value          |
| `gradientSegments`                  | Number of SVG pieces used for each color gradient     |

Each sector has a `type`, `start`, and `stop`. Its type is either `absolute`
or `percent`. Use `color` for a solid sector, or use `colorFrom` and `colorTo`
for a gradient:

```javascript
const gaugeSectors = [
    {
        type: 'absolute',
        start: 0,
        stop: 1280,
        colorFrom: '#70df00',
        colorTo: '#c6ff26',
    },
    {
        type: 'percent',
        start: 25,
        stop: 60,
        color: '#ff9700',
    },
];
```

Only the sector portions up to the current value are drawn. The remaining
part of the gauge uses `gaugeBackgroundColor`. Sector values outside the gauge
range are clipped safely.

When the start and stop angles are exactly `-90` and `90`, the absolute gauge
minimum and maximum are always placed directly below the left and right arc
ends. These two labels always use absolute values and the absolute label
formatting. Increase `gaugeMargin` if long values or suffixes need more room at
the edge of the widget.

Use `gaugeEndLabelGap` to move both labels closer to or farther away from the
bar. The four `gaugeMinLabelOffset...` and `gaugeMaxLabelOffset...` settings
allow independent horizontal and vertical fine adjustment. Negative Y values
move a label upward; positive Y values move it downward.

---

##### **Value formatting**

Use `valueDecimals`, `valuePrefix`, `valueSuffixAbsolute`, and
`valueSuffixPercent` to format the displayed value. Font family, size, weight,
and color are controlled by the corresponding `valueFont...` settings.

The current value is always positioned at the exact horizontal and vertical
center of the complete SVG display. There is no separate value-position mode.
The default value color is white. Change `valueColor` to a dark color such as
`#222222` when the transparent gauge is placed on a light background.

Set `valueBoxEnabled` to `true` to display the value on a configurable box.
Its fill, border, corner radius, and padding are controlled by the
`valueBox...` settings.

Boundary labels have separate font, color, decimal, and suffix settings.

---

##### **Technical notes**

- The complete implementation is maintained in
  [`configurable-gauge-template.ejs`](https://github.com/oweitman/ioBroker.vis-jsontemplate/blob/main/documentation/configurable-gauge-template.ejs).
- The output uses SVG only; no canvas or external library is involved.
- CSS selectors are scoped beneath `#<%- widgetid %>`.
- VIS binding safety is preserved by placing opening and closing curly braces
  on separate lines.
- No `setInterval()` and no client-side data serialization are used.
- Multiple instances can be placed in one view.
- The template is display-only and does not write to the source data point.