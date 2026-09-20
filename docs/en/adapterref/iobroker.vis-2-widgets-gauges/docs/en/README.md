---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-gauges/README.md":{"title":{"en":"Gauge widgets for ioBroker.vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-gauges/README.md"},"en/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md":{"title":{"en":"Gauges for vis-2"},"content":"en/adapterref/iobroker.vis-2-widgets-gauges/docs/en/README.md"}}}
---
# Gauges for vis-2

Ten widgets that show a value as a gauge: a colored half circle with a needle, a circle filled with liquid, a
battery, a round instrument, a modern arc, a bar, a thermometer, a compass, a tank and concentric rings.

![All widgets](../img/overview.png)

**Contents**

- [General](#general)
    - [Requirements](#requirements)
    - [Projects from version 2.0](#projects-from-version-20)
    - [Settings shared by all widgets](#settings-shared-by-all-widgets)
    - [Colors and levels](#colors-and-levels)
    - [Animation](#animation)
    - [Dark theme](#dark-theme)
- [Color gauge](#color-gauge---tplgauge2color)
- [Water gauge](#water-gauge---tplgauge2water)
- [Battery gauge](#battery-gauge---tplgauge2battery)
- [Radial gauge](#radial-gauge---tplgauge2radial)
- [Arc gauge](#arc-gauge---tplgauge2arc)
- [Linear gauge](#linear-gauge---tplgauge2linear)
- [Thermometer](#thermometer---tplgauge2thermometer)
- [Compass](#compass---tplgauge2compass)
- [Tank](#tank---tplgauge2tank)
- [Rings](#rings---tplgauge2rings)

## General

### Requirements

The widgets are in the widget set **Gauges** of the vis-2 editor. They need the adapter vis-2; vis (vis-1) cannot
show them.

In the tables below, **Setting** is the label in the vis-2 editor and **Attribute** is the name stored in the
project. Use the attribute name when you edit a project in JSON or copy settings between widgets. **Default** is what
a widget uses when the field is empty; for a new widget the editor already fills in the defaults of the settings
marked with *(new widget)*.

### Projects from version 2.0

Version 2.0 drew the color, water and battery gauge with the libraries react-gauge-chart, react-liquid-gauge and
react-battery-gauge (all based on d3). These libraries are gone, the widgets are plain SVG now - smaller, faster and
compatible with the React version of the current vis-2. The widget ids and all attribute names stayed the same, so
existing projects keep their settings. A few things look different:

- **Color gauge**: the value is shown below the axis of the needle instead of behind the needle. Minimum and maximum
  can be shown at the ends of the scale. *Needle length* works now. A corner radius, an arc padding or a margin of
  `0` is really 0 now - before, `0` meant the default.
- **Color gauge**: an empty *Unit* shows no unit. Only a widget whose unit was never set shows `%`, as before.
- **Water gauge**: the value was shown with all its digits; now at most two, or as many as set in *Digits after
  comma*. During the rise animation the number counts up with the liquid.
- **Battery gauge**: the text stays horizontal in a vertical battery, the charging flash stands upright.
- A value that is not a number (e.g. `offline`) is shown as text; a state without a value shows `–`.

### Settings shared by all widgets

| Setting                       | Attribute          | Default | Description                                                                                                                                                                                                                      |
|-------------------------------|--------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Without card                  | `noCard`           | off     | Draws the gauge directly on the view. Without it, the gauge sits in a card like the other vis-2 widgets.                                                                                                                         |
| Title                         | `widgetTitle`      |         | Title of the card.                                                                                                                                                                                                               |
| Object ID                     | `oid`              |         | The state to show. Selecting an object takes over its unit and, if the object defines them, its minimum and maximum. Instead of an ID the field also takes a constant: a number is shown as value, a word without a dot as text. |
| Minimum value / Maximum value | `min` / `max`      | 0 / 100 | Range of the scale. Values outside the range stop at its end.                                                                                                                                                                    |
| Unit                          | `unit`             |         | Shown after the value.                                                                                                                                                                                                           |
| Digits after comma            | `digitsAfterComma` |         | Empty: as many as needed, at most two. The decimal separator follows the system settings of ioBroker.                                                                                                                            |

The text color of the style of a widget (`color`) is used for the value if the widget has no text color of its own.

### Colors and levels

Most gauges color their scale or their value by **levels**. All widgets describe the levels the same way:

| Setting          | Attribute                                   | Description                                                                                                                                                     |
|------------------|---------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Number of levels | `levelsCount`                               | Number of levels. For each level there is a group *Level 1*, *Level 2*, ...                                                                                     |
| Color            | `color1` ... `colorN`                       | Color of the level. If not every level has a color, the colors run from the first to the last one that is set; without any color from green over yellow to red. |
| Level threshold  | `levelThreshold1` ... `levelThreshold(N-1)` | Absolute value where this level ends. The last level always ends at the maximum. An empty threshold shares the rest of the scale equally.                       |

The arc, linear gauge, thermometer and tank also have a **Coloring** (`colorMode`):

| Value                               | Description                                          |
|-------------------------------------|------------------------------------------------------|
| One color (`fixed`)                 | The value is always drawn in *Color* (`valueColor`). |
| Color of the level (`levels`)       | The value gets the color of the level it is in.      |
| Gradient of the levels (`gradient`) | The colors of the levels blend into each other.      |

![Levels](../img/levels.png)

The example: CO₂ from 400 to 2000 ppm with four levels (`levelThreshold1` = 800, `levelThreshold2` = 1000,
`levelThreshold3` = 1400) in the arc gauge with each coloring, in segments, and as color bands of the radial gauge.

### Animation

The new widgets move smoothly to a new value:

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Animate | `animate` | on *(new widget)* | Without it the value jumps. |
| Animation duration | `animateDuration` | depends on the widget | Duration in ms. |
| Animation easing | `animationEasing` | depends on the widget | Course of the movement: `linear`, `quadIn`, `cubicOut`, `backOut` (overshoots a little), `elasticOut` (swings), `bounceOut` (bounces), ... - the easings of d3. |

### Dark theme

In the dark theme of vis-2 all colors that are not set follow the theme: text, scales, the empty track of an arc, the
dial of the radial gauge and the compass. Colors that are set stay as they are.

![Dark theme](../img/dark-theme.png)

## Color gauge - `tplGauge2Color`

A half circle of colored segments with a needle.

![Color gauge](../img/color.png)

| Setting                  | Attribute          | Default           | Description                                                                                                                     |
|--------------------------|--------------------|-------------------|---------------------------------------------------------------------------------------------------------------------------------|
| Number of levels         | `levelsCount`      | 3                 | Number of colored segments, see [Colors and levels](#colors-and-levels). Without colors they run from green over yellow to red. |
| Digits after comma       | `digitsAfterComma` | 2 *(new widget)*  |                                                                                                                                 |
| Unit                     | `unit`             | `%` if never set  |                                                                                                                                 |
| Needle color             | `needleColor`      | text color        |                                                                                                                                 |
| Color of the needle base | `needleBaseColor`  | text color        |                                                                                                                                 |
| Needle length            | `needleScale`      | 0.55              | Length as part of the radius.                                                                                                   |
| Margin                   | `marginInPercent`  | 0.05              | Space around the gauge as part of the widget size.                                                                              |
| Corner radius            | `cornerRadius`     | 6                 | Rounding of the segments in px.                                                                                                 |
| Arc padding              | `arcPadding`       | 0.05              | Gap between the segments, in radians.                                                                                           |
| Arc width                | `arcWidth`         | 0.2               | Thickness of the arc as part of the radius.                                                                                     |
| Hide value               | `hideText`         | off               |                                                                                                                                 |
| Text color               | `textColor`        | text color        | Color of the value.                                                                                                             |
| Show minimum and maximum | `showMinMax`       | on *(new widget)* | Minimum and maximum at the ends of the arc.                                                                                     |
| Animate                  | `animate`          | on *(new widget)* | The needle swings to the new value.                                                                                             |
| Animation delay          | `animDelay`        | 500               | Wait in ms before the needle moves.                                                                                             |
| Animation duration       | `animateDuration`  | 3000              | Duration in ms.                                                                                                                 |

## Water gauge - `tplGauge2Water`

A circle that fills with a wavy liquid.

![Water gauge](../img/water.png)

| Setting                     | Attribute                     | Default           | Description                                                                                                     |
|-----------------------------|-------------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------|
| Size                        | `size`                        |                   | Diameter in px. Empty: fits the widget.                                                                         |
| Digits after comma          | `digitsAfterComma`            |                   | Empty: at most two.                                                                                             |
| Text size                   | `textSize`                    | 1                 | Relative size of the value; 1 is half of the radius. The unit is 60% of it.                                     |
| Text offset x / y           | `textOffsetX` / `textOffsetY` | 0 / diameter ÷ 15 | Moves the value in px.                                                                                          |
| Rise animation              | `riseAnimation`               | on *(new widget)* | The liquid rises to the new level; the number counts along.                                                     |
| Rise animation time         | `riseAnimationTime`           | 2000              | In ms.                                                                                                          |
| Rise animation easing       | `riseAnimationEasing`         | `cubicInOut`      | See [Animation](#animation).                                                                                    |
| Wave animation              | `waveAnimation`               | on *(new widget)* | The waves move.                                                                                                 |
| Wave animation time         | `waveAnimationTime`           | 2000              | Time in ms for one whole wave.                                                                                  |
| Wave animation easing       | `waveAnimationEasing`         | `linear`          |                                                                                                                 |
| Wave frequency              | `waveFrequency`               | 2                 | Number of waves across the circle.                                                                              |
| Wave amplitude              | `waveAmplitude`               | 1                 | Height of the waves in percent of the filling height. The waves are highest at 50% and flat when empty or full. |
| Inner radius / Outer radius | `innerRadius` / `outerRadius` | 0.9 / 1           | The ring around the liquid, as part of the radius.                                                              |
| Margin                      | `margin`                      | 0.025             | Gap between the ring and the liquid.                                                                            |
| Text color                  | `textColor`                   | text color        | Value above the liquid.                                                                                         |
| Text color in the liquid    | `textWaveColor`               | white             | The part of the value the liquid covers.                                                                        |
| Circle color                | `circleColor`                 | blue              | Color of the ring.                                                                                              |
| Liquid color                | `waveColor`                   | blue              | Color of the liquid, if no gradient is used.                                                                    |
| Gradient                    | `gradient`                    | off               | Fills the liquid with a vertical gradient.                                                                      |
| Number of levels            | `levelsCount`                 |                   | Number of gradient stops.                                                                                       |

Each gradient stop (group *Level*):

| Setting                      | Attribute             | Description                                                                                          |
|------------------------------|-----------------------|------------------------------------------------------------------------------------------------------|
| Color of the gradient stop   | `stopColor1` ...      |                                                                                                      |
| Opacity of the gradient stop | `stopOpacity1` ...    | 0 is transparent, 1 opaque (default).                                                                |
| Level threshold              | `levelThreshold2` ... | Position of the stop as absolute value. The first stop is always at the bottom, the last at the top. |

## Battery gauge - `tplGauge2Battery`

A battery with its charge. All lengths are in units of the drawing, which is 100 wide. For several of these settings
`0` counts as not set.

![Battery gauge](../img/battery.png)

| Setting            | Attribute      | Default    | Description                                                                      |
|--------------------|----------------|------------|----------------------------------------------------------------------------------|
| Charging object ID | `charging-oid` |            | While this state is `true`, the battery shows a flash and fills again and again. |
| Orientation        | `orientation`  | horizontal | `vertical` turns the battery; the text stays horizontal.                         |
| Padding            | `padding`      | 0          | Space around the battery.                                                        |
| Size               | `size`         |            | Length of the battery in px. Empty: fits the widget.                             |
| Aspect ratio       | `aspectRatio`  | 0.52       | Height as part of the length: D = 0.56, C = 0.52, AA = 0.28, AAA = 0.23.         |
| Animated           | `animated`     | off        | The charge grows from 0 when the widget appears.                                 |

The text shows the charge in percent of the range *Minimum* ... *Maximum*.

**Battery body**, **Battery pole**

| Setting            | Attribute                                            | Default    |
|--------------------|------------------------------------------------------|------------|
| Corner radius      | `batteryBodyCornerRadius` / `batteryCapCornerRadius` | 6 / 2      |
| Fill               | `batteryBodyFill` / `batteryCapFill`                 | none       |
| Stroke color       | `batteryBodyStrokeColor` / `batteryCapStrokeColor`   | text color |
| Stroke width       | `batteryBodyStrokeWidth` / `batteryCapStrokeWidth`   | 4 / 4      |
| Pole to body ratio | `batteryCapCapToBodyRatio`                           | 0.4        |

**Battery meter**

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Fill | `batteryMeterFill` | green | |
| Low battery below | `batteryMeterLowBatteryValue` | 15 % | In the unit of the value. Below it the meter and the text turn to the low colors. |
| Fill if low | `batteryMeterLowBatteryFill` | red | |
| Medium battery below | `batteryMeterMediumBatteryValue` | | Optional third stage between *low* and *full*. |
| Fill if medium | `batteryMeterMediumBatteryFill` | orange | |
| Inner gap | `batteryMeterOuterGap` | 1 | Gap between the body and the meter. |
| Number of cells | `batteryMeterNoOfCells` | 1 | More than 1 draws single cells; only full cells are shown. |
| Gap between cells | `batteryMeterInterCellsGap` | 1 | |

**Text**

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Text color on the empty part | `readingTextLightContrastColor` | text color | |
| Text color on the filled part | `readingTextDarkContrastColor` | white | |
| Text color if low | `readingTextLowBatteryColor` | red | |
| Font family | `readingTextFontFamily` | Helvetica | |
| Font size | `readingTextFontSize` | 14 | 0 hides the text. |
| Show percent sign | `readingTextShowPercentage` | on | |

**Charging flash** (only with a charging object ID)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Scale | `chargingFlashScale` | 1 | Size of the flash. |
| Fill | `chargingFlashFill` | orange | |
| Animated | `chargingFlashAnimated` | on | The flash blinks. |
| Animation duration | `chargingFlashAnimationDuration` | 1000 | In ms. |

## Radial gauge - `tplGauge2Radial`

The classic round instrument with a scale, color bands and a needle - for power, speed, pressure, temperature.

![Radial gauge](../img/radial.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Angle of the scale | `angle` | 270 | How far the scale reaches around: 180 is a half circle, 360 a full one. |
| Rotation | `rotate` | 0 | Turns the scale clockwise; 0 is symmetric to the top. |
| Major divisions | `majorTicks` | 10 | Number of sections between the labeled ticks. |
| Minor divisions | `minorTicks` | 5 | Small steps within one major division. |
| Show labels | `showLabels` | on | Numbers at the major ticks. |
| Scale color | `scaleColor` | text color | Ticks and numbers. |
| Label on the dial | `label` | | Short text in the upper half, e.g. `Power`. |
| Dial color | `dialColor` | white / dark | Without a bezel the dial has no background unless a color is set. |
| Bezel | `bezel` | Metal | `none`, `thin` (a line in *Bezel color*) or `metal`. Without a bezel only the scale is fitted into the widget, so a half circle fills it. |
| Needle | `needleType` | Arrow | `arrow`, `line` or `triangle`. |
| Needle color | `needleColor` | red | |
| Hub color | `hubColor` | dark gray | |
| Show value | `showValue` | on | Value and unit in the lower part of the dial. |
| Text color | `textColor` | text color | |
| Number of levels | `levelsCount` | 3 | Color bands along the scale, see [Colors and levels](#colors-and-levels). 0 draws none. |
| Width of the color band | `bandWidth` | 0.06 | As part of the radius. |
| Animation | `animate`, `animateDuration`, `animationEasing` | on, 1000, `backOut` | The needle overshoots a little, like a real instrument. |

## Arc gauge - `tplGauge2Arc`

A modern arc with the value in its middle. It can be split into segments like LEDs and show a marker for a target
value, e.g. a set point.

![Arc gauge](../img/arc.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Angle of the scale | `angle` | 240 | 180 is a half circle, 360 a full ring. |
| Rotation | `rotate` | 0 | |
| Arc width | `arcWidth` | 0.16 | Thickness as part of the radius. |
| Rounded ends | `roundedCaps` | on | |
| Track color | `trackColor` | light gray | The empty part of the arc. |
| Segments | `segments` | 0 | 0: a continuous arc. More: that many segments; each lit segment gets the color of its own place on the scale. |
| Gap between segments | `segmentGap` | 2 | In degrees. |
| Start at zero | `fromZero` | off | If the scale goes below zero, the arc starts at 0 and grows to both sides - e.g. for the power at the grid connection. |
| Coloring | `colorMode` | Color of the level | See [Colors and levels](#colors-and-levels). |
| Color | `valueColor` | blue | For *One color*. |
| Number of levels | `levelsCount` | 3 | |
| Show value | `showValue` | on | |
| Text color | `textColor` | text color | |
| Size of the value | `valueSize` | 0.36 | Font size as part of the radius; long texts get smaller to fit. |
| Text below the value | `subText` | | e.g. `Bathroom`. |
| Show minimum and maximum | `showMinMax` | on | Below the ends of the arc. |
| Target value object ID | `targetOid` | | Optional: a marker at this value. |
| Marker color | `targetColor` | text color | |
| Animation | `animate`, `animateDuration`, `animationEasing` | on, 800, `cubicOut` | |

## Linear gauge - `tplGauge2Linear`

A horizontal or vertical bar with a scale.

![Linear gauge](../img/linear.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Orientation | `orientation` | horizontal | `vertical`: the minimum is at the bottom. |
| Display | `displayMode` | Bar | `bar`: a filled bar. `pointer`: the levels are shown on the whole scale and a triangle points at the value. |
| Bar thickness | `barSize` | 0.8 | As part of the free space. |
| Rounded | `rounded` | on | Round ends of the bar. |
| Track color | `trackColor` | light gray | The empty part of the bar. |
| Start at zero | `fromZero` | off | See the arc gauge. |
| Show scale | `showScale` | on | Below the bar, or right of it if vertical. |
| Major divisions / Minor divisions | `majorTicks` / `minorTicks` | 5 / 4 | |
| Scale color | `scaleColor` | gray | |
| Coloring | `colorMode` | Gradient of the levels | With the gradient the bar uncovers the colors of the scale. |
| Color | `valueColor` | blue | |
| Number of levels | `levelsCount` | 3 | |
| Show value | `showValue` | on | Above the bar, at the right. |
| Text color | `textColor` | text color | Also the color of the pointer. |
| Target value object ID | `targetOid` | | Optional: a line across the bar at this value. |
| Marker color | `targetColor` | text color | |
| Animation | `animate`, `animateDuration`, `animationEasing` | on, 800, `cubicOut` | |

## Thermometer - `tplGauge2Thermometer`

A glass thermometer with a scale.

![Thermometer](../img/thermometer.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Minimum / Maximum | `min` / `max` | -20 / 40 | |
| Unit | `unit` | °C | |
| Digits after comma | `digitsAfterComma` | 1 | |
| Side of the scale | `scaleSide` | Right | `left`, `right` or `both`. |
| Major divisions / Minor divisions | `majorTicks` / `minorTicks` | 6 / 5 | With -20 ... 40: a label every 10°, a tick every 2°. |
| Scale color | `scaleColor` | gray | |
| Glass color | `tubeColor` | gray | |
| Coloring | `colorMode` | One color | With *Color of the level* or *Gradient* the column changes its color with the temperature (default levels: blue to red). |
| Color | `valueColor` | red | |
| Show value / Text color | `showValue` / `textColor` | on / text color | The value above the thermometer. |
| Animation | `animate`, `animateDuration`, `animationEasing` | on, 1000, `cubicInOut` | |

## Compass - `tplGauge2Compass`

A compass rose for a direction, e.g. the wind direction or the heading of a robot, optionally with a speed in the
middle.

![Compass](../img/compass.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | Direction in degrees: 0 is north, 90 east. |
| Offset to north | `offset` | 0 | Added to the value, e.g. if the sensor does not point exactly north. |
| Show where it goes to | `invert` | off | A wind direction tells where the wind comes **from**. With this option the needle points to where it blows (+180°). |
| Speed object ID | `speedOid` | | Optional: shown in the middle. Selecting it takes over its unit. |
| Unit | `speedUnit` | | |
| Digits after comma | `speedDigits` | 1 | |
| Needle | `needleType` | Arrow | `arrow` points to the direction, `compass` is a two-colored needle, `wind` is a marker on the ring that points to the middle. |
| Turn the dial | `rotateDial` | off | The dial turns and a fixed mark on top shows the direction, like a compass in a car. |
| Needle color | `needleColor` | red | |
| Color of north | `northColor` | red | |
| Dial color | `dialColor` | white / dark | |
| Scale color | `scaleColor` | text color | |
| Show NE, SE, SW, NW | `showIntercardinal` | on | |
| Show degrees | `showDegrees` | on | 30, 60, 120, ... |
| Bezel | `bezel` | Thin line | `none`, `thin` or `metal`. |
| Show value | `showValue` | on | |
| Show | `valueFormat` | Direction and degrees | `both` (`SW 225°`), `direction` (`SW`) or `degrees` (`225°`). With a speed this is the line below it. |
| Text color | `textColor` | text color | |
| Animation | `animate`, `animateDuration`, `animationEasing` | on, 1000, `cubicInOut` | Always the short way: from 350° to 10° through north. |

The names of the directions follow the language of vis-2 (e.g. N, NO, O, SO, S, SW, W, NW in German).

## Tank - `tplGauge2Tank`

The fill level of a tank, a cistern or a pellet store.

![Tank](../img/tank.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Digits after comma | `digitsAfterComma` | 0 | |
| Shape | `shape` | Standing cylinder | `cylinder`, `rect` (rectangle) or `horizontal` (lying tank, e.g. for heating oil). The fill height is proportional to the value. |
| Tank color | `tankColor` | gray | Outline of the tank. |
| Wave animation | `waveAnimation` | on | A slowly moving surface; only rectangle and lying tank. |
| Show scale / Major / Minor divisions | `showScale` / `majorTicks` / `minorTicks` | on / 4 / 5 | Right of the tank. |
| Scale color | `scaleColor` | gray | |
| Coloring | `colorMode` | One color | With levels, e.g. red when the tank is nearly empty (default levels: red to green). |
| Color | `valueColor` | blue | |
| Show value | `showValue` | on | In the middle of the tank. |
| Show percent | `showPercent` | off | The fill level in percent below the value. |
| Text color | `textColor` | text color | |
| Animation | `animate`, `animateDuration`, `animationEasing` | on, 1200, `cubicInOut` | |

## Rings - `tplGauge2Rings`

Up to five values as concentric rings - e.g. PV power, house consumption and battery charge.

![Rings](../img/rings.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Number of rings | `ringsCount` | 3 | 1 to 5. |
| Angle of the scale | `angle` | 270 | |
| Rotation | `rotate` | 135 | With 270° and 135 the rings start at the top and leave the upper left quarter free. |
| Ring width | `ringWidth` | 0.14 | Width of one ring as part of the radius. |
| Gap between rings | `ringGap` | 0.04 | |
| Rounded ends | `roundedCaps` | on | |
| Track opacity | `trackOpacity` | 0.18 | The empty part of a ring is drawn in its color with this opacity. |
| Legend | `legend` | In the free quarter | `gap`: right-aligned in front of the start of every ring - needs rings that start at the top and a sweep of at most 300°, otherwise the legend goes beside the rings. `side`: beside the rings, or below them in a narrow widget. `none`. |
| Text in the middle | `centerText` | | |
| Text color | `textColor` | text color | |

Each ring (group *Ring 1*, *Ring 2*, ...):

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid1` ... | | |
| Label | `label1` ... | | |
| Minimum / Maximum | `min1` / `max1` ... | 0 / 100 | |
| Unit | `unit1` ... | | |
| Digits after comma | `digits1` ... | | |
| Color | `color1` ... | red, green, blue, orange, violet | |