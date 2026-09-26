---
chapters: {"pages":{"en/adapterref/iobroker.vis-canvas-gauges/README.md":{"title":{"en":"ioBroker.vis-canvas-gauges"},"content":"en/adapterref/iobroker.vis-canvas-gauges/README.md"},"en/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md":{"title":{"en":"Canvas gauges for vis-2"},"content":"en/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md"}}}
---
# Canvas gauges for vis-2

The widget set has five gauges that draw a number: a **Linear** gauge, a **Radial** one, a **Compass**, a
**Flat** bar and a **Progress** bar. This page describes the **vis-2** version. vis (vis-1) has the first four
with the same settings; they are drawn by the same library, so they look the same there. The progress bar exists
only in vis-2.

![All widgets](../img/overview.png)

**Contents**

- [General](#general)
    - [Requirements and migration](#requirements-and-migration)
    - [The value](#the-value)
    - [Highlights](#highlights)
    - [Ticks](#ticks)
    - [Animation](#animation)
    - [Colors](#colors)
    - [Dark theme](#dark-theme)
    - [Needle](#needle)
    - [Borders](#borders)
    - [Value box](#value-box)
    - [Fonts](#fonts)
- [Linear](#linear---tplcglineargauge)
- [Radial](#radial---tplcgradialgauge)
- [Compass](#compass---tplcgcompas)
- [Flat](#flat---tplcgflatgauge)
- [Progress](#progress---tplcgprogress)
- [Differences to vis-1](#differences-to-vis-1)

## General

### Requirements and migration

The widgets are in the widget set **Canvas gauges** in the widget list of the vis-2 editor. The React versions
described here need **vis-2 2.12.8** or newer. Older vis-2 versions show the vis-1 widgets instead.

Projects made with vis-1 keep working without changes. Both versions use the same widget ids (`tplCGlinearGauge`,
`tplCGradialGauge`, `tplCGCompas`, `tplCGflatGauge`) and the same attribute names, and vis-2 picks the React
version automatically. All settings carry over. `tplCGprogress` has no vis-1 counterpart and therefore appears
only in the vis-2 editor.

In the tables below, **Setting** is the label in the vis-2 editor and **Attribute** is the name stored in the
project. Use the attribute name when you edit a project in JSON or copy settings between widgets.

**Empty means "the default of the library".** Almost every field is optional. As long as it is empty, the gauge
uses the default of [canvas-gauges](https://canvas-gauges.com), which is also where the meaning of every option is
documented in detail. Only the settings marked with a default in the tables are always written.

The size of a gauge is the size of the widget. The drawing is re-rendered whenever the widget is resized, so a
gauge may be stretched freely - the round ones look best in a square box.

### The value

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | The state whose value the gauge shows. When you pick a state, *Min*, *Max*, *Units* and *Title* are filled from the object if they are still empty. |
| Min | `minValue` | 0 | Beginning of the scale. |
| Max | `maxValue` | 100 | End of the scale. |
| Units | `units` | | Text under the value, e.g. `°C`. |
| Title | `title` | | Text over the middle of the gauge. |
| Factor | `factor` | 1 | The value of the state is multiplied by this before it is drawn. |
| Value offset | `valueOffset` | 0 | ... and this is added afterwards. Together with *Factor* this converts a unit, e.g. `1.8` / `32` from °C to °F. |

The needle rests at *Min* as long as the state has no value.

### Highlights

![Highlights](../img/highlights.png)

Sections of the scale in a colour of their own, for example green up to 50, yellow up to 80 and red above.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Highlights number | `hCount` | 1 | How many sections there are. `0` turns them off. Every section adds one set of the three fields below. |
| From | `highlightsFrom1`, `highlightsFrom2`, ... | | Beginning of the section, in the values of the scale. A section with an empty *From* is skipped. |
| To | `highlightsTo1`, ... | | End of the section. |
| Color | `highlightsColor1`, ... | | Colour of the section. |
| Section width | `highlightsWidth` | 15 (radial), 10 (linear) | Width of the coloured band, in percent of the plate. The picture below shows it. |
| Section ends | `highlightsLineCap` | straight | `round` rounds the outer ends of the band. |

![Section width](../img/highlightswidth.png)

### Ticks

![Ticks](../img/ticks.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Major ticks | `majorTicks` | | The labelled lines. Empty divides the scale into five sections. A number, e.g. `11`, gives that many labels evenly spread from *Min* to *Max*. A list separated by commas, e.g. `off,low,mid,high,max`, is used as the labels themselves - that is how the compass gets its directions. |
| Minor ticks | `minorTicks` | see widget | Number of unlabelled lines between two major ticks. |
| Stroke ticks | `strokeTicks` | see widget | Draws a line along the scale that connects the ticks. |
| Exact ticks | `exactTicks` | off | Places the labels at their own value instead of spreading them evenly. Only makes a difference when *Major ticks* is a list of numbers. |
| Before comma | `majorTicksInt` | 4 | Digits before the comma of the tick labels; shorter numbers get leading zeros. |
| After comma | `majorTicksDec` | 2 | Digits after the comma of the tick labels. |
| Numbers margin | `numbersMargin` | 1 | Distance of the tick labels from the edge of the plate, in percent. |

![Exact ticks](../img/exactticks.png)

*Major ticks* is `0,10,50,100` in both pictures.

### Animation

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Enabled | `animation` | on | The needle travels to the new value instead of jumping. |
| Duration | `animationDuration` | 500 | Length of the travel in ms. |
| Rule | `animationRule` | `linear` | Course of the travel: `linear`, `quad`, `quint`, `cycle`, `bounce`, `elastic` and their `de...` counterparts, which run the other way round. |
| Animate value | `animatedValue` | off | The number in the value box counts up with the needle. |
| Animate on start | `animateOnInit` | off | The needle starts at *Min* and travels to the current value when the view is opened. |
| Animation target | `animationTarget` | `needle` | Radial gauge and compass only: `needle` turns the needle, `plate` turns the plate under a fixed needle - the way a real compass works. |

### Colors

Every part of a gauge has its own colour, and an empty field keeps the colour of the library. A setting that ends
in *end* is the second colour of a gradient.

![Colors](../img/colors.png)

| Setting | Attribute | Description |
|---|---|---|
| Plate / Plate end | `colorPlate`, `colorPlateEnd` | The face of the gauge. |
| Major ticks / Minor ticks | `colorMajorTicks`, `colorMinorTicks` | The lines of the scale. |
| Stroke of the ticks | `colorStrokeTicks` | The line along the scale that *Stroke ticks* draws. |
| Title / Units / Numbers | `colorTitle`, `colorUnits`, `colorNumbers` | The three texts on the plate. |
| Needle / Needle end | `colorNeedle`, `colorNeedleEnd` | The needle, from its base to its tip. |
| Needle shadow up / down | `colorNeedleShadowUp`, `colorNeedleShadowDown` | The shadow the needle casts on the plate. |
| Value text / Value text shadow | `colorValueText`, `colorValueTextShadow` | The number in the value box. |
| Border outer / middle / inner (+ *end*) | `colorBorderOuter`, `colorBorderMiddle`, `colorBorderInner`, ... | The three rings around the plate. |
| Border shadow | `colorBorderShadow` | The shadow under the outer ring. |
| Value box rect / background / shadow (+ *end*) | `colorValueBoxRect`, `colorValueBoxBackground`, `colorValueBoxShadow`, ... | The box around the value. |

### Dark theme

![Dark theme](../img/darktheme.png)

The same two widgets on a dark view, with the switch on and off.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Follow the theme | `followTheme` | on | In the dark theme of vis-2 the plate, the scale, the texts, the rings and the track of the bar become dark. |

What the instrument is *made of* keeps its colour in both themes: the needle stays salmon, the red needle of the
flat gauge stays red and the coloured part of a bar keeps the colour you gave it. Only what it has in common with
the view underneath follows the theme. A lit lamp does not turn grey at night either.

**A colour you changed stays as it is.** The switch only replaces a colour while the field is empty or still holds
the preset the widget was created with - the white plate of the flat gauge, for example. As soon as you pick a
colour yourself, it wins in both themes.

**Widgets placed before this setting existed do not change.** `followTheme` is written into a widget when it is
created, so an old project - and a project migrated from vis-1 - keeps its look until you turn the switch on.

The theme is also the reason the compass barely changes: almost all of its colours are part of its preset and are
already dark.

The radial gauge and the compass add the colours of the circle in the middle: `colorNeedleCircleOuter`,
`colorNeedleCircleOuterEnd`, `colorNeedleCircleInner` and `colorNeedleCircleInnerEnd`.

The linear gauge, the flat gauge and the progress bar add the colours of the bar: `colorBarStroke`, `colorBar`,
`colorBarEnd`, `colorBarProgress`, `colorBarProgressEnd` and `colorBarShadow`.

### Needle

| Setting | Attribute | Description |
|---|---|---|
| Show needle | `needle` | Off draws a gauge without a needle - useful when only the bar or the value box should be visible. |
| Shadow | `needleShadow` | The needle casts a shadow on the plate. |
| Type | `needleType` | `arrow` is the tapered pointer, `line` a straight line of *Width* pixels. |
| Start / End | `needleStart`, `needleEnd` | Where the needle begins and ends, in percent of the radius (of the length for the linear gauge). `0` is the centre. |
| Width | `needleWidth` | Width of the needle at its base. |

### Borders

![Borders](../img/borders.png)

Three rings plus a shadow frame the plate. Setting a width to `0` hides that ring.

| Setting | Attribute | Description |
|---|---|---|
| Enabled | `borders` | Off removes all rings at once. |
| Outer / Middle / Inner width | `borderOuterWidth`, `borderMiddleWidth`, `borderInnerWidth` | Width of the three rings. |
| Shadow width | `borderShadowWidth` | Width of the shadow under the outer ring. |

### Value box

![Value box](../img/valuebox.png)

The box under the middle that shows the value as a number.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Enabled | `valueBox` | off | Shows the box. |
| Box stroke | `valueBoxStroke` | | Width of the frame around the box. |
| Box width | `valueBoxWidth` | 0 | Fixed width of the box in percent. `0` lets it grow with its text. |
| Text | `valueText` | | Fixed text instead of the value. It is only shown as long as *Object ID* has no value, otherwise the value wins. |
| Text shadow | `valueTextShadow` | | The number casts a shadow. |
| Box border radius | `valueBoxBorderRadius` | | Rounding of the corners of the box. |
| Before comma | `valueInt` | 0 | Digits before the comma. A shorter number gets leading zeros, e.g. `007.25` with 3 / 2. |
| After comma | `valueDec` | 0 | Digits after the comma. `0` rounds to a whole number. |

> **The Linear, the Flat and the Progress widget only show the box while they stand upright.** The library draws
> the value box of a linear gauge only when the widget is at least as tall as it is wide. On a bar lying down the
> setting has no effect - put a text widget next to it instead.

### Fonts

Family, size, style and weight of the four texts - *Numbers* (the scale), *Title*, *Units* and *Value*.

| Setting | Attribute | Description |
|---|---|---|
| Numbers / Title / Units / Value | `fontNumbers`, `fontTitle`, `fontUnits`, `fontValue` | The font family. |
| ... size | `fontNumbersSize`, `fontTitleSize`, `fontUnitsSize`, `fontValueSize` | The size. It is scaled with the gauge, so it is a relative number rather than px. |
| ... style | `fontNumbersStyle`, ... | `normal`, `italic` or `oblique`. |
| ... weight | `fontNumbersWeight`, ... | `normal`, `bold`, `bolder`, `lighter` or a number such as `600`. |

## Linear - `tplCGlinearGauge`

![Linear](../img/linear.png)

The upright gauge: a plate with a border, the scale on both sides and a bar that is filled up to the value. The
default size is 150 x 250 with a corner radius of 10 px - the plate follows that radius, so the gauge keeps the
shape of the widget.

Besides the settings above it offers the bar:

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Begin circle | `barBeginCircle` | | Diameter of the round end at the bottom of the bar, in percent of the bar width. `0` is a straight bar; this is the bulb of the thermometer. |
| Width | `barWidth` | | Width of the bar in percent of the plate. |
| Length | `barLength` | | Length of the bar in percent of the plate. |
| Stroke width | `barStrokeWidth` | | Width of the line around the bar. |
| Shadow | `barShadow` | 0 | Width of the shadow the bar casts, in px. Its colour is `colorBarShadow`. |
| Progress | `barProgress` | on | Fills the bar up to the value. Off leaves an empty bar and only the needle moves. |

and where the scale sits:

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Tick's side | `tickSide` | `both` | On which side of the bar the ticks are drawn: `both`, `left` or `right`. |
| Needle's side | `needleSide` | `both` | The same for the needle. |
| Number's side | `numberSide` | `both` | The same for the tick labels. |
| Width | `ticksWidth` | | Length of the major ticks, in percent. |
| Width minor | `ticksWidthMinor` | | Length of the minor ticks. |
| Padding | `ticksPadding` | | Distance between the ticks and the bar. |

Defaults of this widget: *Minor ticks* 5, *Borders* on, *Progress* on.

## Radial - `tplCGradialGauge`

![Radial](../img/radial.png)

The round instrument: a scale over 270 degrees that starts at the lower left, three rings around the plate and an
arrow needle. The default size is 200 x 200.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Ticks angle | `ticksAngle` | 270 | How far the scale runs around the plate, in degrees. `360` is the full circle. |
| Start angle | `startAngle` | 45 | Where the scale begins, in degrees from the bottom. |
| Circle size | `needleCircleSize` | | Size of the circle in the middle that the needle turns around, in percent. |
| Circle inner | `needleCircleInner` | | Draws the inner circle. |
| Circle outer | `needleCircleOuter` | | Draws the outer circle. |

Defaults of this widget: *Minor ticks* 4, *Show needle* on, *Shadow* on, *Type* `arrow`, *Borders* on with all
four widths at 2.

## Compass - `tplCGCompas`

![Compass](../img/compas.png)

A radial gauge over the full circle, preset as a compass rose: the scale runs from 0 to 360, the major ticks are
`N,NE,E,SE,S,SW,W,NW,N`, there are 22 minor ticks between them and the needle is a thin line on a dark plate.

It has exactly the settings of the [Radial](#radial---tplcgradialgauge) gauge, only with other defaults:

| Setting | Attribute | Default |
|---|---|---|
| Min / Max | `minValue` / `maxValue` | 0 / 360 |
| Major ticks | `majorTicks` | `N,NE,E,SE,S,SW,W,NW,N` |
| Minor ticks / Stroke ticks | `minorTicks` / `strokeTicks` | 22 / off |
| Duration | `animationDuration` | 1000 |
| Plate | `colorPlate` | `#222` |
| Major ticks / Minor ticks / Numbers | `colorMajorTicks` / `colorMinorTicks` / `colorNumbers` | `#f5f5f5` / `#ddd` / `#ccc` |
| Needle / Needle end | `colorNeedle` / `colorNeedleEnd` | `rgba(240,128,128,1)` / `rgba(255,160,122,.9)` |
| Border outer (+ end) | `colorBorderOuter`, `colorBorderOuterEnd` | `#ccc` |
| Needle shadow down | `colorNeedleShadowDown` | `#222` |
| Type / Start / End / Width | `needleType` / `needleStart` / `needleEnd` / `needleWidth` | `line` / 75 / 99 / 3 |
| Outer width | `borderOuterWidth` | 10, the other three 0 |
| Ticks angle / Start angle | `ticksAngle` / `startAngle` | 360 / 180 |
| Needle circle outer | `colorNeedleCircleOuter` | `#ccc` |
| Circle size / Circle outer | `needleCircleSize` / `needleCircleOuter` | 15 / off |

For a wind direction that turns like a real compass, set *Animation target* to `plate`: then the needle stays
still and the rose turns under it.

## Flat - `tplCGflatGauge`

![Flat](../img/flat.png)

A linear gauge lying on its side, without any border: a white plate, the scale and the needle above a slim
coloured bar. The default size is 360 x 100.

It has the settings of the [Linear](#linear---tplcglineargauge) gauge with other defaults:

| Setting | Attribute | Default |
|---|---|---|
| Minor ticks / Stroke ticks | `minorTicks` / `strokeTicks` | 10 / on |
| Plate | `colorPlate` | `#fff` |
| Needle / Needle end | `colorNeedle` / `colorNeedleEnd` | `red` / `rgba(255,0,0,0.7)` |
| Type / Width | `needleType` / `needleWidth` | `line` / 3 |
| Borders | `borders` | off, all four widths 0 |
| Begin circle / Width | `barBeginCircle` / `barWidth` | 0 / 5 |
| Bar progress | `colorBarProgress` | `#db9994` |
| Tick's / Needle's / Number's side | `tickSide` / `needleSide` / `numberSide` | `left` |
| Width / Width minor | `ticksWidth` / `ticksWidthMinor` | 50 / 15 |

![Positions](../img/positions.png)

Setting the three sides to `both` puts the scale above and below the bar.

## Progress - `tplCGprogress`

![Progress](../img/progress.png)

The plain bar: a linear gauge stripped down to the track and the part up to the value - no plate, no rings, no
needle and no visible scale. That is the shape for a battery, a tank, a humidity or a disk that is filling up, and
it takes a dozen settings to get there from the Linear widget, which is why it has a preset of its own.

**This widget exists only in vis-2.** It has no template in the vis-1 widget set, so a view that uses it looks
empty in vis (vis-1).

It offers the settings of the [Linear](#linear---tplcglineargauge) gauge with these defaults:

| Setting | Attribute | Default |
|---|---|---|
| Min / Max | `minValue` / `maxValue` | 0 / 100 |
| Highlights number | `hCount` | 0 (off) |
| Major ticks / Minor ticks / Stroke ticks | `majorTicks` / `minorTicks` / `strokeTicks` | 2 / 0 / off |
| Plate | `colorPlate` | `rgba(0,0,0,0)` - transparent, the view shows through |
| Numbers | `colorNumbers` | `rgba(0,0,0,0)` - transparent, so the scale is invisible |
| Show needle | `needle` | off |
| Borders | `borders` | off, all four widths 0 |
| Value box | `valueBox` | off |
| Begin circle / Width / Length / Stroke width | `barBeginCircle` / `barWidth` / `barLength` / `barStrokeWidth` | 0 / 45 / 95 / 0 |
| Bar / Bar progress | `colorBar` / `colorBarProgress` | `#e0e0e0` / `#4b8bd6` |
| Tick's / Needle's / Number's side | `tickSide` / `needleSide` / `numberSide` | `right` |
| Width / Width minor | `ticksWidth` / `ticksWidthMinor` | 0 / 0 |

The bar follows the shape of the widget: wider than tall it lies down, taller than wide it stands up. The default
size is 300 x 60.

**Bringing the scale back** takes two settings: give *Numbers* a colour again and set *Width* of the bar ticks to
something above 0 (the middle picture uses `#888`, *Major ticks* 6, *Minor ticks* 5, *Width* 12 and *Width minor*
6).

**The value box** only appears while the bar stands upright - see the note under
[Value box](#value-box). The third picture shows it.

## Differences to vis-1

The React widgets draw the same gauges with the same library, so a migrated project looks the same. A few things
were repaired on the way:

- **`Padding` of the bar ticks works.** The vis-1 widget wrote *Padding* into *Begin circle*, so the setting
  moved the round end of the bar instead of the distance of the ticks.
- **`Value weight` works.** The vis-1 widget wrote *Value weight* into the font family of the numbers, which
  replaced the font of the scale with the word `bold`.
- **The scale keeps its last label.** With *Major ticks* as a number, the labels are calculated from the number of
  sections. The vis-1 widget added the step up repeatedly and dropped the last label as soon as the sum overshot
  the maximum by a rounding error, e.g. with a range of 0 to 0.3 and 4 labels.
- **A state that is empty when the view is opened still arrives.** The vis-1 widget only subscribed to the state
  when it already had a value, so a gauge on a freshly started adapter stayed at its minimum until the view was
  reloaded.
- **The needle type of the radial gauge is `arrow`.** Its vis-1 default was the word `select`, the name of the
  field type that had slipped into the default. The library drew an arrow for it anyway, so nothing changes on
  the view.
- *Major ticks* is a text field in all widgets now. In vis-1 it was a slider except in the compass, so a list of
  labels could only be entered there.
- *Minor ticks* goes up to 50 instead of 20 - the compass has 22 by default, which its own slider could not reach.

And a few settings of the library were added that the vis-1 attribute set never offered: *Section width* and
*Section ends* of the highlights, *Exact ticks*, *Numbers margin*, *Stroke of the ticks*, *Box width* of the value
box, and *Shadow* / *Bar shadow* of the bar. They are all optional and change nothing until they are filled in.