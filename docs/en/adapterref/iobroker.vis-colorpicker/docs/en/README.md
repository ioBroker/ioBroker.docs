---
chapters: {"pages":{"en/adapterref/iobroker.vis-colorpicker/README.md":{"title":{"en":"ioBroker.vis-colorpicker"},"content":"en/adapterref/iobroker.vis-colorpicker/README.md"},"en/adapterref/iobroker.vis-colorpicker/docs/en/README.md":{"title":{"en":"Color picker widgets for vis-2"},"content":"en/adapterref/iobroker.vis-colorpicker/docs/en/README.md"}}}
---
# Color picker widgets for vis-2

Nine widgets to set and to show a colour: three general colour pickers, one for Homematic lights and five for
Philips HUE lights. This page describes the **vis-2** version. vis (vis-1) has the same widgets with the same
settings, drawn by jQuery libraries instead of React.

![All widgets](../img/overview.png)

**Contents**

- [General](#general)
    - [Requirements and migration](#requirements-and-migration)
    - [Where the colour comes from and where it goes](#where-the-colour-comes-from-and-where-it-goes)
    - [Factor and precision](#factor-and-precision)
    - [The picker in the widget](#the-picker-in-the-widget)
    - [When the colour is written](#when-the-colour-is-written)
    - [Dark theme](#dark-theme)
    - [Philips HUE: one command per change](#philips-hue-one-command-per-change)
    - [Gamut of a lamp](#gamut-of-a-lamp)
- [RGB spectrum - `tplRGBSpectrum`](#rgb-spectrum---tplrgbspectrum)
- [Homematic spectrum - `tplSpectrumHomematic`](#homematic-spectrum---tplspectrumhomematic)
- [Color wheel - `tplRGBFarbtastic`](#color-wheel---tplrgbfarbtastic)
- [RGB color - `tplJscolor`](#rgb-color---tpljscolor)
- [Philips HUE - `tplHUEjscolor`](#philips-hue---tplhuejscolor)
- [HUE XY picker - `tplHUEPickerXY`](#hue-xy-picker---tplhuepickerxy)
- [HUE XY indicator - `tplHUEIndicatorXY`](#hue-xy-indicator---tplhueindicatorxy)
- [HUE CT picker - `tplHUEPickerCT`](#hue-ct-picker---tplhuepickerct)
- [HUE CT indicator - `tplHUEIndicatorCT`](#hue-ct-indicator---tplhueindicatorct)
- [Differences to vis-1](#differences-to-vis-1)

## General

### Requirements and migration

The widgets are in the widget set **Color picker** of the vis-2 editor. The React versions described here need
**vis-2 2.12.8** or newer; with an older vis-2 the vis-1 widgets are used instead.

Projects made with vis-1 keep working without any change. Both versions use the same widget ids
(`tplRGBSpectrum`, `tplJscolor`, `tplHUEjscolor`, ...) and the same attribute names, and vis-2 picks the React
version automatically. All settings carry over.

In the tables below, **Setting** is the label in the vis-2 editor and **Attribute** is the name stored in the
project. Use the attribute name when you edit a project as JSON or copy settings between widgets.

### Where the colour comes from and where it goes

Most widgets can be bound to three groups of states at once. Every group that is filled in is **written** when the
colour changes:

| Group | Attributes | What is stored |
|---|---|---|
| RGB string | `rgb-oid` | `#ff8800`. Read back are `#rgb`, `#rrggbb`, `rgb(255,136,0)`, `hsl(...)`, `hsv(...)` and `white` / `black`. |
| Three channels | `red-oid`, `green-oid`, `blue-oid` | Three numbers 0...255, divided by *Factor* before they are written. All three have to be set. |
| Hue, saturation, brightness | `hue-oid`, `sat-oid`, `bri-oid` | Hue 0...360 plus two values whose range depends on the widget, see below. All three have to be set. |

**For showing the colour the first group that has a value wins**: the RGB string before the three channels, and
those before hue/saturation/brightness. That is the order in which the vis-1 widgets bound their handlers, where
the last one decided what the picker showed.

The two spectrum widgets and the colour wheel work in **HSL**: saturation and lightness are `0...1` and are
multiplied by *Factor* when they are written. *RGB color* and *Philips HUE* work in **HSV**, as jscolor did:
saturation and value are `0...100` and are **divided** by *Factor*. A widget without any state simply shows a
grey chequerboard.

### Factor and precision

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Factor | `factor` (`divisor` in *Philips HUE*) | 1 | The states are multiplied by it when they are read and divided by it when they are written. `255` turns channels that run from 0 to 1 into 0...255, `100` turns a saturation of 0...1 into percent. |
| Precision | `decimal` | 0 | Digits after the comma of the written values. |

### The picker in the widget

![RGB spectrum](../img/spectrum.png)

Widgets that only showed a small colour box in vis-1 have a new setting **Picker in the widget** (`inline`). With
it the widget *is* the picker - no popup, no click needed, which is what you want on a wall panel. Give the widget
enough room for it: about 200 x 150 pixels for a square with a hue bar.

Without it the widget shows the colour box, and a click opens the panel under it. The panel closes with a click
somewhere else or with the Escape key.

### When the colour is written

*RGB spectrum* and *Homematic spectrum* write the colour when **Choose** is pressed, as they did in vis-1 - so a
lamp does not follow every intermediate colour. All other widgets write while the colour is being dragged, at
most every 200 ms, plus once more when you let go.

While you drag, the widget shows your colour even if the states answer more slowly or slightly differently; after
1.5 seconds without a change it follows the states again.

### Dark theme

![Dark theme](../img/dark-theme.png)

The panel, its buttons and the texts take the colours of the vis-2 theme. The colours of the pickers themselves
are of course the same in both themes.

### Philips HUE: one command per change

The five HUE widgets do not write the colour into `xy` or `ct` - they write **one command** into the `command`
state of the lamp, as the `hue` adapter expects it:

```json
{ "transitiontime": 4, "xy": "0.4,0.4", "level": 80 }
{ "transitiontime": 4, "ct": "370" }
```

`transitiontime` is the setting *Transition time* in tenths of a second. `level` is only part of the command when
a *Level ID* is configured - otherwise setting a colour would also change the brightness of the lamp.

When you pick the command state in the editor, the widget fills in the states next to it (`xy`, `level`, `ct`) and
the gamut from the model of the lamp - the same help the vis-1 widgets gave.

### Gamut of a lamp

![Gamut](../img/gamut.png)

A lamp cannot produce every colour. *Gamut/model* takes the gamut letter **A**, **B** or **C**, or the model of
the lamp (`LCT001`, `LST002`, ...); an empty field draws the whole colour plane. The colour field is zoomed to
the gamut, and colours a lamp cannot reach are drawn a little darker.

## RGB spectrum - `tplRGBSpectrum`

![RGB spectrum](../img/spectrum.png)

A colour box that opens a picker with a saturation square and a hue bar - the widget that spectrum drew in vis-1.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| RGB ID | `rgb-oid` | | State with the colour as a string. |
| Picker in the widget | `inline` | off | Shows the picker instead of the colour box. |
| Red / Green / Blue ID | `red-oid`, `green-oid`, `blue-oid` | | The three channels, 0...255. |
| Hue / Saturation / Brightness ID | `hue-oid`, `sat-oid`, `bri-oid` | | Hue 0...360, saturation and lightness 0...1 times *Factor*. |
| Factor / Precision | `factor`, `decimal` | 1 / 0 | See [Factor and precision](#factor-and-precision). |

The colour is written with **Choose**; **Cancel** leaves the states as they are.

## Homematic spectrum - `tplSpectrumHomematic`

![Homematic spectrum](../img/homematic.png)

A Homematic RGBW light takes one number: `0...199` is the position on the colour circle, `200` is white. The
picker is therefore the hue bar plus a button for white.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Color ID | `color-oid` | | State of the light, 0...200. |
| Picker in the widget | `inline` | off | Shows the picker instead of the colour box. |

The colour is written with **Choose**. The end of the bar stays at 199: in vis-1 the last pixel of the bar was
rounded up to 200 and the light turned white.

## Color wheel - `tplRGBFarbtastic`

![Color wheel](../img/farbtastic.png)

The wheel: the ring sets the hue, the square inside the saturation and the lightness. The widget *is* the picker,
and it writes while you drag.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| RGB ID | `rgb-oid` | | State with the colour as a string. |
| Red / Green / Blue ID | `red-oid`, `green-oid`, `blue-oid` | | The three channels, 0...255. |
| Hue / Saturation / Brightness ID | `hue-oid`, `sat-oid`, `bri-oid` | | Hue 0...360, saturation and lightness 0...1 times *Factor*. |
| Factor / Precision | `factor`, `decimal` | 1 / 0 | See [Factor and precision](#factor-and-precision). |

The wheel is always the largest circle that fits into the widget and stays in its middle, so the widget may have
any size - in vis-1 it was three images of 196 x 196 pixels.

## RGB color - `tplJscolor`

![RGB color](../img/rgb_color.png)

A label with a colour box that opens the picker of jscolor: the saturation square with the hue bar and a close
button. It writes while the colour is being dragged.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Title | `title` | `RGB:` | Text in front of the colour box. |
| Close text | `closeText` | `X` | Label of the button that closes the panel. An empty field hides it; the panel still closes with a click somewhere else. |
| RGB ID | `rgb-oid` | | State with the colour as a string. |
| Picker in the widget | `inline` | off | Shows the picker instead of the colour box. |
| Red / Green / Blue ID | `red-oid`, `green-oid`, `blue-oid` | | The three channels, 0...255. |
| Hue / Saturation / Brightness ID | `hue-oid`, `sat-oid`, `bri-oid` | | Hue 0...360, saturation and value 0...100 divided by *Factor*. |
| Factor / Precision | `factor`, `decimal` | 1 / 0 | See [Factor and precision](#factor-and-precision). |

## Philips HUE - `tplHUEjscolor`

![Philips HUE](../img/hue_color.png)

A button in the current colour of the lamp. A click opens the colour field of the lamp with a brightness slider
next to it; both write a command to the lamp while they are being dragged.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Command ID | `command-oid` | | The `command` state of the lamp. Picking it fills in the three fields below. |
| XY ID | `xy-oid` | | The `xy` state of the lamp, e.g. `0.4,0.4`. It is what the marker follows. |
| Level ID | `level-oid` | | The `level` state, 0...100. Only with it does the panel show the brightness slider and the command carry `level`. |
| Gamut/model | `gamut` | | See [Gamut of a lamp](#gamut-of-a-lamp). |
| Transition time | `transitionTime` | 4 | Tenths of a second the lamp takes for the change. |
| Picker in the widget | `inline` | off | Shows the colour field instead of the button. |
| Picker width / height | `pickerWidth`, `pickerHeight` | 100 | Size of the colour field in the panel, in pixels. Without effect when the picker is in the widget. |
| Background color | `pickerBackground` | | Background behind the colour field. |
| Button text | `buttonName` | `HUE` | Text on the button. |
| Close button | `closeButton` | `close` | Label of the button that closes the panel. An empty field hides it. |
| Red / Green / Blue ID, Divisor, Precision, RGB ID | `red-oid`, ..., `divisor`, `decimal`, `rgb-oid` | | The colour of the lamp is written into these states as well, e.g. to keep it for a scene. |
| Hue / Saturation / Brightness ID | `hue-oid`, `sat-oid`, `bri-oid` | | The same as HSV: hue 0...360, saturation and value 0...100 divided by *Divisor*. |

The colour of the button is the colour of the point, always at full brightness - as in vis-1, where the brightness
had a slider of its own.

## HUE XY picker - `tplHUEPickerXY`

![Gamut](../img/gamut.png)

The colour field of the lamp, as large as the widget. A click or a drag writes the command.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Command ID | `command-oid` | | The `command` state of the lamp. |
| XY ID | `xy-oid` | | The `xy` state the marker follows. |
| Gamut/model | `gamut` | | See [Gamut of a lamp](#gamut-of-a-lamp). |
| Transition time | `transitionTime` | 4 | Tenths of a second. |

## HUE XY indicator - `tplHUEIndicatorXY`

![Indicators](../img/indicators.png)

Fills the widget with the colour the lamp is set to. It only reads.

| Setting | Attribute | Description |
|---|---|---|
| XY ID | `xy-oid` | The `xy` state of the lamp. |
| Gamut/model | `gamut` | The colour is converted with the gamut of the lamp. |

## HUE CT picker - `tplHUEPickerCT`

![Color temperature](../img/ct.png)

A bar from warm to cold white. A click sets the colour temperature of the lamp.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Command ID | `command-oid` | | The `command` state of the lamp. |
| CT ID | `ct-oid` | | State with the current temperature, for the marker. |
| Transition time | `transitionTime` | 4 | Tenths of a second. |
| Unit | `ctUnit` | Mired | How the state holds the temperature. A Philips HUE light uses **mired** (153...500); lights of many other adapters use **Kelvin**. |
| Warmest / Coldest | `ctMin`, `ctMax` | 2000 / 6500 | The two ends of the bar in Kelvin. A lamp that only does 2700...4000 K gets its whole range over the full width of the widget this way. |

With *Mired* the command carries the mired value the HUE API wants, limited to 153...500; with *Kelvin* the
temperature is written as it is.

## HUE CT indicator - `tplHUEIndicatorCT`

![Indicators](../img/indicators.png)

Fills the widget with the colour of the white temperature the lamp is set to. It only reads.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| CT ID | `ct-oid` | | State with the temperature. |
| Unit | `ctUnit` | Mired | As above. |
| Warmest / Coldest | `ctMin`, `ctMax` | 2000 / 6500 | The range the value is kept in. |

## Differences to vis-1

The React widgets do the same as the vis-1 ones, with the same attributes. What is different:

- **No jQuery libraries.** spectrum, jscolor, farbtastic and the CIE helper of huepi are not loaded any more; the
  pickers are drawn with CSS and one canvas. The maths of the HUE widgets is the same, it was ported one to one -
  only a point on the edge of the plane (`y = 0`) no longer produces an undefined colour.
- **The CT indicator is a React widget as well.** Its vis-1 template is marked with `data-vis-2-ignore`, an
  attribute today's vis-2 does not evaluate, so it was shown there as an EJS widget.
- **The gamut letters A, B and C work.** The tooltip of vis-1 promised them, but only model ids were recognised.
- **The *Divisor* of the Philips HUE widget is used.** The vis-1 code read `factor` there, which that widget did
  not have - the divisor was always 1.
- **The colour wheel really writes hue/saturation/brightness.** In vis-1 that binding threw an error, and reading
  it treated the three values as red, green and blue.
- **The spectrum no longer rounds saturation and lightness.** The vis-1 code rounded the values of `0...1` to
  whole numbers when it read them, so a saturation of 50 % became 1.
- **The hue is written as a number**, not as text - `tplJscolor` and `tplHUEjscolor` wrote it with `toFixed()`.
- **`level` is only in the command when a *Level ID* is set**, so a colour change does not also set the brightness.
- **A widget without a value stays empty** (a grey chequerboard) instead of showing white or the middle of the
  colour field.
- **Touch works.** The pickers follow pointer events, so a finger drives them like a mouse; vis-1 only listened
  for mouse events.
- **The colour field of the HUE widgets is computed once** at 160 x 160 pixels and scaled by the browser. vis-1
  computed every pixel of the widget again on every change, which made a large picker slow.
- **The panel belongs to the widget.** jscolor put its popup into the page body; the React panel hangs under the
  widget, moves itself back into the window if it would leave it, and closes with Escape.
- **The title of *RGB color* is text.** vis-1 wrote it into the page as HTML; the React widget shows it as text
  and only decodes entities like `&nbsp;`, so an old title still reads the way it did.
- **New settings:** *Picker in the widget* for the four widgets with a colour box, and *Unit*, *Warmest* and
  *Coldest* for the two CT widgets.