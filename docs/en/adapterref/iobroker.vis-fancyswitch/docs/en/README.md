---
chapters: {"pages":{"en/adapterref/iobroker.vis-fancyswitch/README.md":{"title":{"en":"ioBroker.vis-fancyswitch"},"content":"en/adapterref/iobroker.vis-fancyswitch/README.md"},"en/adapterref/iobroker.vis-fancyswitch/docs/en/README.md":{"title":{"en":"fancyswitch for vis-2"},"content":"en/adapterref/iobroker.vis-fancyswitch/docs/en/README.md"}}}
---
# fancyswitch for vis-2

The fancyswitch set has seven widgets for switching a state on and off: three sliders, two rockers, the Giva
Labs iButton and a small toggle switch. This page describes the **vis-2** version. vis (vis-1) has the same widgets
with the same settings; there they are drawn from images instead and cannot be resized without becoming blurry.

![All widgets](../img/overview.svg)

**Contents**

- [General](#general)
    - [Requirements and migration](#requirements-and-migration)
    - [Values entered in the editor](#values-entered-in-the-editor)
    - [Settings shared by the five switch styles](#settings-shared-by-the-five-switch-styles)
- [Switch light - tplFancySwitch1](#switch-light---tplfancyswitch1)
- [Slider dark - tplFancySwitch2](#slider-dark---tplfancyswitch2)
- [Slider dark ON/OFF - tplFancyDarkAnAus](#slider-dark-onoff---tplfancydarkanaus)
- [Slider dark OFF/ON - tplFancyDarkAnAusRev](#slider-dark-offon---tplfancydarkanausrev)
- [Rocker switch - tplFancyDarkAnAusWippe](#rocker-switch---tplfancydarkanauswippe)
- [Giva Labs iButton - tplFancyGivaIButton](#giva-labs-ibutton---tplfancygivaibutton)
- [Toggle switch - tplFancyToggleswitch](#toggle-switch---tplfancytoggleswitch)
- [Differences to vis-1](#differences-to-vis-1)

## General

### Requirements and migration

The widgets are in the widget set **fancyswitch** in the widget list of the vis-2 editor. The React versions
described here need **vis-2 2.12.8** or newer. Older vis-2 versions show the vis-1 widgets instead.

Projects made with vis-1 keep working without changes. Both versions use the same widget ids
(`tplFancySwitch1`, `tplFancyGivaIButton`, …) and the same attribute names, and vis-2 picks the React version
automatically. All settings carry over.

In the tables below, **Setting** is the label in the vis-2 editor and **Attribute** is the name stored in the
project. Use the attribute name when you edit a project in JSON or copy settings between widgets.

### Values entered in the editor

_True value_ and _False value_ are written to the state when the widget is clicked, and the current value of the
state is compared against them. The editor stores them as text, and the widget converts the text like this:

| Entered text      | Written to the state |
| ----------------- | -------------------- |
| _(empty)_         | `1` resp. `0`        |
| `true`            | the boolean `true`   |
| `false`           | the boolean `false`  |
| `0`, `1`, `23.5`  | that number          |
| `ON`, `closed`, … | that text            |

A state value counts as **on** when

- it is a number greater than zero, or text that reads as such a number, or
- its text is exactly the _True value_, which is how states like `ON` / `OFF` work, or
- it is the boolean `true` and _True value_ means "on" (`true`, `1` or any positive number).

`null` and `undefined` are treated as the _False value_.

### Settings shared by the five switch styles

`tplFancySwitch1`, `tplFancySwitch2`, `tplFancyDarkAnAus`, `tplFancyDarkAnAusRev` and `tplFancyDarkAnAusWippe`
all offer the same settings.

| Setting            | Attribute                | Description                                                                                                                                     |
| ------------------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Object ID          | `oid`                    | The state that is shown and written. Without it the widget only shows its "off" look and cannot be clicked.                                     |
| False value        | `valFalse`               | Value written when the switch is turned off. Default `0`.                                                                                       |
| True value         | `valTrue`                | Value written when the switch is turned on. Default `1`.                                                                                        |
| Invert state       | `invert`                 | Shows and writes the opposite - useful for a state where `0` means "on".                                                                        |
| Auto OFF in (ms)   | `autoOff`                | After this many milliseconds the opposite value is written again. `0` switches the function off.                                                |
| Read only          | `readOnly`               | The widget shows the state but does not react to clicks.                                                                                        |
| Label (left/right) | `text_false`/`text_true` | The text of each half. `text_true` is always the half that means "on", so it is the left one for _Slider dark ON/OFF_. Leave empty for no text. |

Clicking a half switches to the state whose label that half carries, so clicking `ON` turns the state on and
clicking `OFF` turns it off. The widget keeps the aspect ratio of its drawing, so a widget that is made wider
or higher stays sharp and centred in its box.

## Switch light - tplFancySwitch1

![Switch light](../img/switch1.svg)

The bright rocker: one key hinged in its middle. The half of the current state is pressed down, the other half
stands up towards the viewer and casts a shadow; when the state changes, the key tips over. Both labels stay
visible; nothing lights up.

Settings: see [Settings shared by the five switch styles](#settings-shared-by-the-five-switch-styles).

## Slider dark - tplFancySwitch2

![Slider dark](../img/switch2.svg)

The dark slider on a dark panel. The knob and both labels sit on one strip that slides behind the frame, like
on a real sliding switch: the label of the current state is visible, the other one is hidden under the frame.
When the state changes, the strip slides over. The `ON` label glows cyan. The labels can be any short text, for
example `0` and `I`.

Settings: see [Settings shared by the five switch styles](#settings-shared-by-the-five-switch-styles).

## Slider dark ON/OFF - tplFancyDarkAnAus

![Slider dark ON/OFF](../img/dark_an_aus.svg)

The same slider without the panel, with the "on" label on the **left** half (`EIN` / `AUS` by default).

Settings: see [Settings shared by the five switch styles](#settings-shared-by-the-five-switch-styles).

## Slider dark OFF/ON - tplFancyDarkAnAusRev

![Slider dark OFF/ON](../img/dark_aus_an.svg)

The mirrored version, with the "on" label on the **right** half.

Settings: see [Settings shared by the five switch styles](#settings-shared-by-the-five-switch-styles).

## Rocker switch - tplFancyDarkAnAusWippe

![Rocker switch](../img/rocker.svg)

One key hinged in its middle, like the [light switch](#switch-light---tplfancyswitch1): the half of the current
state is pressed down, the other half stands up. When the state changes, the key tips over through its middle
position. The "on" half lights up cyan while it is pressed. The top row is the dark style, the bottom row the
light one.

Besides the [shared settings](#settings-shared-by-the-five-switch-styles):

| Setting     | Attribute    | Description                                       |
| ----------- | ------------ | ------------------------------------------------- |
| Light style | `lightStyle` | Draws the bright variant instead of the dark one. |

## Giva Labs iButton - tplFancyGivaIButton

![iButton](../img/ibutton.svg)

A sliding switch with a blue "on" surface. The handle can be clicked or dragged.

| Setting              | Attribute            | Description                                                                                                           |
| -------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Object ID            | `oid`                | The state. The widget writes the booleans `true` and `false`.                                                         |
| Read only            | `readOnly`           | The widget shows the state but does not react.                                                                        |
| Test                 | `test`               | Shows the switch in the "on" position while the editor is open, so the look can be checked without a state.           |
| Label for 'ON'/'OFF' | `labelOn`/`labelOff` | The two texts. Default `ON` and `OFF`.                                                                                |
| Resize handle        | `resizeHandle`       | `auto` sizes the handle from the labels as soon as they differ from `ON`/`OFF`, `true` always, `false` never (33 px). |
| Resize container     | `resizeContainer`    | `auto` as above; `false` makes the bar as wide as the widget, which is the easiest way to give it a fixed size.       |
| Enable drag          | `enableDrag`         | The handle can be dragged instead of only clicked.                                                                    |
| Animation            | `enableFx`           | The handle slides instead of jumping.                                                                                 |
| Effect duration (ms) | `duration`           | Duration of that animation. Default `200`.                                                                            |

The bar is 27 px high - the height of the original - and is centred vertically in the widget.

## Toggle switch - tplFancyToggleswitch

![Toggle switch](../img/toggleswitch.svg)

Two labels with a small slider between them. Clicking a label or the track switches.

| Setting              | Attribute                    | Description                                                     |
| -------------------- | ---------------------------- | --------------------------------------------------------------- |
| Object ID            | `oid`                        | The state. The widget writes the booleans `true` and `false`.   |
| Read only            | `readOnly`                   | The widget shows the state but does not react.                  |
| Test                 | `test`                       | Shows the switch in the "on" position while the editor is open. |
| Label for false/true | `text_false`/`text_true`     | The two texts. Default `OFF` and `ON`.                          |
| Highlight switch     | `highlight_switch`           | Fills the track up to the handle while the switch is on.        |
| Width                | `width`                      | Width of the track between the labels, in pixels. Default `40`. |
| HTML before/after    | `html_prepend`/`html_append` | Free HTML left and right of the switch, as in vis-1.            |

Unlike in vis-1 this widget no longer needs the jQuery UI stylesheet: it uses the colours of the vis-2 theme and
therefore also works in the dark theme.

## Differences to vis-1

- The widgets are drawn as SVG instead of being cut out of a PNG, so they can be resized freely.
- The labels of the five switch styles are settings now; in vis-1 they were part of the image.
- The switches move when the state changes: the sliders slide over, their labels moving with the knob, and the
  rockers tip over through their middle position. In vis-1 the picture jumped.
- A boolean state is recognized as "on" when _True value_ is left at its default of `1`. In vis-1 a `true` was
  compared with the text `1` and never matched, so such a widget stayed off.
- In _Slider dark ON/OFF_ both halves switch to the state their label shows. In vis-1 the left half always wrote
  the _False value_, although it carries the `EIN` label.
- The coloured part of the toggle switch grows towards "on". In vis-1 it filled the whole track while the switch
  was off, because the jQuery UI slider was configured with `range: "max"`.
- Every widget offers _Read only_.
- The light rocker lights its key with a darker cyan, which is readable on the bright surface.