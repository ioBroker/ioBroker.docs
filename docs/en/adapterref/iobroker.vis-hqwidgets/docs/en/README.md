---
chapters: {"pages":{"en/adapterref/iobroker.vis-hqwidgets/README.md":{"title":{"en":"ioBroker.vis-hqWidgets"},"content":"en/adapterref/iobroker.vis-hqwidgets/README.md"},"en/adapterref/iobroker.vis-hqwidgets/docs/en/README.md":{"title":{"en":"hqWidgets for vis-2"},"content":"en/adapterref/iobroker.vis-hqwidgets/docs/en/README.md"}}}
---
# hqWidgets for vis-2

The hqWidgets are ten widgets for switches, dimmers, thermostats, windows, doors and counters. This page describes
the **vis-2** version. vis (vis-1) has the same widgets with the same settings, but they look slightly different
there.

![All widgets](../img/overview.png)

**Contents**

- [General](#general)
    - [Requirements and migration](#requirements-and-migration)
    - [Values entered in the editor](#values-entered-in-the-editor)
    - [Descriptions](#descriptions)
    - [Indicators](#indicators)
    - [Styles and change effects](#styles-and-change-effects)
    - [Dark theme](#dark-theme)
    - [Settings shared by the round widgets](#settings-shared-by-the-round-widgets)
- [On/Off](#onoff---tplhqbutton)
- [Dimmer](#dimmer---tplhqdimmer)
- [Inner temperature](#inner-temperature---tplhqintemp)
- [Outdoor temperature](#outdoor-temperature---tplhqouttemp)
- [Window and Shutter](#window-and-shutter---tplhqshutter)
- [Door](#door---tplhqdoor)
- [Lock](#lock---tplhqlock)
- [Checkbox](#checkbox---tplhqcheckbox)
- [CircleKnob](#circleknob---tplhqcircle)
- [Odometer](#odometer---tplhqodometer)
- [Differences to vis-1](#differences-to-vis-1)

## General

### Requirements and migration

The widgets are in the widget set **hqWidgets** in the widget list of the vis-2 editor. The React versions described
here need **vis-2 2.12.8** or newer. Older vis-2 versions show the vis-1 widgets instead.

Projects made with vis-1 keep working without changes. Both versions use the same widget ids (`tplHqButton`,
`tplHqDimmer`, ...) and the same attribute names, and vis-2 picks the React version automatically. All settings
carry over.

In the tables below, **Setting** is the label in the vis-2 editor and **Attribute** is the name stored in the project.
Use the attribute name when you edit a project in JSON or copy settings between widgets.

### Values entered in the editor

Some settings take a value that is written to a state, for example *On value* and *Off value* of the On/Off widget or
*Close-Value* of the lock. The editor stores them as text, and the widget converts the text like this:

| Entered text          | Written to the state |
|-----------------------|----------------------|
| `true` / `false`      | boolean `true` / `false` |
| `0`, `1`, `42.5`, ... | number               |
| anything else         | the text as it is    |
| (empty)               | the default of the setting |

### Descriptions

The round widgets, the window, the door and the lock can show a label pill to the left of the widget. The round
widgets can also show one to the right. The right pill of the round widgets shows the value, a text of your own, the
valve position and the time of the last change. The third widget in the [On/Off](#onoff---tplhqbutton) picture
shows both pills.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| No description (left) | `descriptionLeftDisabled` | off | Hides the left pill. |
| Description (left) | `descriptionLeft` | | Text of the left pill. `\n` starts a new line. The text never wraps on its own. |
| Left font size | `infoLeftFontSize` | 12 | Font size of the left pill in px. |
| Description (right) | `infoRight` | | Text of the right pill (On/Off only). |
| Right font size | `infoFontRightSize` | 12 | Font size of the right pill in px. |
| Text color | `infoColor` | | Text colour of both pills. Empty follows the theme. |
| Background | `infoBackground` | | Background of both pills. Empty follows the theme. |
| Left padding (left) / Right padding (left) | `infoLeftPaddingLeft` / `infoLeftPaddingRight` | 15 / 50 | Inner spacing of the left pill in px. The right padding goes under the widget. |
| Left padding (right) / Right padding (right) | `infoRightPaddingLeft` / `infoRightPaddingRight` | 0 / 15 (window: 15 / 15) | Inner spacing of the right pill in px. The left padding is added to half of the widget width. |

The round widgets can also show when the state last changed:

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Hide last action after (hrs) | `hoursLastAction` | | Empty: no time is shown. A number turns the line on. With *Time as interval*, the line disappears once the change is older than that many hours. |
| Time as interval | `timeAsInterval` | on | Relative time: *just now*, *for 5 min.*, *for 2 hrs. and 10 min.*, *yesterday*. Updated every minute. |
| Date format | `format_date` | | Used when *Time as interval* is off: `YYYY.MM.DD hh:mm:ss`, `DD.MM.YYYY hh:mm:ss`, `YYYY/MM/DD hh:mm:ss`, `hh:mm:ss` or `hh:mm`. Empty means `DD.MM.YYYY hh:mm:ss`. |

### Indicators

![Indicators](../img/button-indicators.png)

Small markers over the widget report problems. From left to right in the picture:

- **Working** (gear, top left) - the object in *Working object ID* is `true`. Without such an object, the gear appears
  while the widget's own state is not yet confirmed by the device (`ack = false`). When you switch, you can see it
  until the adapter confirms the new value.
- **Battery** (top right) - the object in *Battery object ID* is `true`.
- **Signal** (bottom right) - the value of *Signal object ID* is shown as text, for example the signal strength.
- **No value** (red cross) - the state in *Object ID* has no value yet.

Not every widget offers every indicator. The tables of the widgets list which ones they have.

### Styles and change effects

The round widgets and the lock draw their surface with one of the skins listed below. *Normal* is used while the
widget is off, *Active* while it is on. The temperature widgets have no *Active* skin.

![Skins](../img/button-skins.png)

| Setting | Attribute | Description |
|---|---|---|
| Normal | `styleNormal` | Skin for the off state (see picture). |
| Active | `styleActive` | Skin for the on state. |
| Use jQuery Styles | `usejQueryStyle` | Uses the classes `ui-state-default` / `ui-state-active` of a jQuery UI theme instead of the skins. This only has an effect if the project loads such a theme. |
| Change effect | `changeEffect` | Animation that runs when the value changes from outside, for example when the light is switched at the wall. On the round widgets, clicks in the widget itself do not trigger it. Options: `waves`, `wobble`, `tada`, `swing`, `shake`, `rubberBand`, `pulse`, `flash`, `bounce`. |
| Wave color | `waveColor` | Colour of the rings of the `waves` effect. Default: grey. |
| Test | `testActive` | Editor only: shows the widget in the opposite state, so you can check the *Active* skin without switching the device. |

### Dark theme

In the dark theme of vis-2, everything that lies on the view changes colour: the description pills, the track of
the ring, the signal text and the popups of the window and the lock. The widgets themselves keep their colours in
both themes, because they represent real objects. A lit lamp stays yellow at night.

![Dark theme](../img/dark-theme.png)

### Settings shared by the round widgets

On/Off, Dimmer, Inner temperature and Outdoor temperature are built on the same round button. They share these
groups. Each widget's section below lists only what differs.

**Group "Center"** - content in the middle of the button

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Caption | `caption` | | Text in the middle. If the widget is taller than wide, the text goes below the icon, otherwise next to it. |
| Caption active | `captionOn` | | Text while the widget is on (On/Off only). Empty keeps *Caption*. |
| Icon | `iconName` | depends on the widget | Image in the middle. |
| Active icon | `iconOn` | | Image while the widget is on. Empty keeps *Icon*. The temperature widgets are never on, so it has no effect there. |
| Icon width | `btIconWidth` | 56 / 45 | Size of the image in px. |
| Auto positioning | `offsetAuto` | on | Centres icon and caption. |
| Left offset / Top offset | `leftOffset` / `topOffset` | 15 / 55 | Position in percent of the widget size, if *Auto positioning* is off. |
| Circle width | `circleWidth` | 50 | Size of the ring in percent **on top of** the widget width: 50 makes the ring 1.5 times as wide as the widget. Dimmer and Inner temperature only. |
| Show value | `showValue` | on | Shows the value in the ring while you point at the widget. |
| Always show circle | `alwaysShow` | off | Shows the ring all the time, not only while you point at the widget. |
| Middle text color | `midTextColor` | | Colour of temperature and humidity in the middle (temperature widgets). |

**Group "Chart"** - Inner and Outdoor temperature only. A click opens a web page, usually a chart of the temperature,
in a dialog over the view.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| URL | `url` | | Address of the page, for example a link to a chart of the *flot* or *echarts* adapter. Empty: no dialog. |
| Dialog title | `dialog_title` | | Name of the embedded page. The vis-2 dialog has no title bar. |
| Dialog width / height | `dialog_width` / `dialog_height` | 600 / 400 | Size in px. |
| Modal dialog | `dialog_modal` | off | Darkens the view behind the dialog. |
| Hide timeout (ms) | `dialog_timeout` | | Closes the dialog after that many milliseconds. Empty or 0: stays open. |
| Test open | `dialog_open` | off | Opens the dialog in the editor, to check size and URL. |

A click outside the dialog closes it.

## On/Off - `tplHqButton`

![On/Off](../img/button.png)

A round button for a switch or a lamp. A click toggles between *Off value* and *On value*. The picture shows, from
left to right: off, on, on with both descriptions and the time of the last change, and a rectangular widget with a
caption. The widget takes its shape from the widget style. The default `border-radius: 64px` makes it round; remove
it or make it smaller for a rectangle.

**How it works**

- The widget is *on* while the state equals *On value* and *off* otherwise. The comparison is loose, so the number `1`
  matches `true`.
- **Push-Button**: pressing writes *On value*, releasing writes *Off value*. This also works if the pointer is
  released outside the button. Use it for door openers and bells.
- **Read only**: shows the state but ignores clicks.
- The widget does not react to clicks in the editor.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | The state to switch. |
| Working object ID | `oid-working` | | See [Indicators](#indicators). |
| Battery object ID | `oid-battery` | | See [Indicators](#indicators). |
| Signal object ID | `oid-signal` | | See [Indicators](#indicators). |
| Read only | `readOnly` | off | Display only. |
| Off value | `min` | `false` | Written when switching off. |
| On value | `max` | `true` | Written when switching on. |
| Push-Button | `pushButton` | off | Writes *On value* while pressed and *Off value* when released. |

Groups *Center* (default icon `img/bulb_off.png`), *Descriptions* and *Styles* (defaults
`vis-hq-button-base-normal` / `vis-hq-button-base-on`): see [General](#general).

**Group "Additional control"** - more actions on every switch:

| Setting | Attribute | Description |
|---|---|---|
| URL for ON / URL for OFF | `urlTrue` / `urlFalse` | Called when switching on / off. Without *URL for OFF*, *URL for ON* is called both times. |
| Object ID for ON / Object ID for OFF | `oidTrue` / `oidFalse` | Another state that is written when switching on / off. Without *Object ID for OFF*, *Object ID for ON* gets both values. |
| Value for ON / Value for OFF | `oidTrueValue` / `oidFalseValue` | The values for these states. Empty: *On value* / *Off value*. |

The additional actions also work without *Object ID*. The button then only calls the URLs or writes the other states.

## Dimmer - `tplHqDimmer`

![Dimmer](../img/dimmer.png)

A round button with a ring for a value from *Minimum* to *Maximum*, typically the brightness of a lamp. The ring
appears while you point at the widget, or always with *Always show circle*. The picture shows 0 %, 42 % and 42 % with
the ring visible.

**How it works**

- **Drag** along the ring to set the value. It is written when you let go.
- **Tap** the ring briefly (less than 300 ms, without moving) to switch. Above 5 % of the range it switches to the
  *Minimum*, otherwise to the *Maximum*. With *Set value by click*, a tap switches off whenever the value is above the
  *Minimum*, and otherwise sets that value.
- The right pill shows the value with the unit. The widget uses the *Active* skin as long as the value is above the
  *Minimum*.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | The level state, e.g. `level.dimmer`. |
| Working / Battery / Signal object ID | `oid-working` / `oid-battery` / `oid-signal` | | See [Indicators](#indicators). |
| Read only | `readOnly` | off | Shows the ring but does not change the value. |
| Unit | `unit` | `%` | Appended to the value. |
| Minimum / Maximum | `min` / `max` | 0 / 100 | Range of the state. |
| Digits after comma | `digits` | 0 | Decimals of the displayed and written value. |
| Step | `step` | 1 | Step size of the ring. |
| Comma as decimal separator | `is_comma` | on | `42,5` instead of `42.5`. |
| Set value by click | `set_by_click` | | Value for a tap while the dimmer is off, e.g. 70 for a pleasant brightness instead of full light. |

Groups *Center* (with ring settings, default icon `img/bulb_off.png`), *Descriptions* (without right text) and
*Styles*: see [General](#general).

## Inner temperature - `tplHqInTemp`

![Inner temperature](../img/intemp.png)

A thermostat for a room. The middle shows the measured temperature (bold) and the humidity. The right pill shows the
setpoint and the valve position. The ring sets the setpoint.

The ring's colour goes from blue at the *Minimum* to red at the *Maximum*:

![Colours of the ring](../img/intemp-colors.png)

**How it works**

- **Drag** along the ring to set the setpoint. It is written when you let go.
- **Tap** the ring or the button to open the [chart](#settings-shared-by-the-round-widgets), if a *URL* is set.
- While the ring is shown only on hover, the middle hides the measured values so that they do not cover it. With
  *Always show circle*, both are visible, and the ring shows no number.
- The widget always uses the *Normal* skin. It has no on/off state.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | The setpoint, e.g. `level.temperature`. |
| Actual temperature ID | `oid-actual` | | Measured temperature, shown in the middle. |
| Humidity ID | `oid-humidity` | | Humidity, shown in the middle. |
| Valve ID | `oid-drive` | | Valve position, shown in the right pill. |
| Valve only On/Off | `valveBinary` | off | For valves that only open or close: shows *opened* / *closed* instead of a percentage. |
| Valve is from 0 to 1 | `valve1` | off | For valves that report 0...1 instead of 0...100: the value is multiplied by 100. |
| Battery object ID | `oid-battery` | | See [Indicators](#indicators). |
| Read only | `readOnly` | off | Shows the ring but does not change the setpoint. |
| Unit | `unit` | `°C` | Appended to the temperatures. |
| Minimum / Maximum | `min` / `max` | 6 / 30 | Range of the setpoint. |
| Digits after comma | `digits` | 0 | Decimals. Set 1 to show `21,5`. |
| Step | `step` | 1 | Step size of the ring, e.g. 0.5. |
| Comma as decimal separator | `is_comma` | on | `21,5` instead of `21.5`. |

Groups *Center* (default icon `img/Heating.png`, icon width 45), *Descriptions* (without right text), *Styles* (only
*Normal*, default `hq-button-base-intemp`) and *Chart*: see [General](#general).

The gear of the [working indicator](#indicators) appears while the new setpoint is not yet confirmed by the
thermostat.

## Outdoor temperature - `tplHqOutTemp`

![Outdoor temperature](../img/outtemp.png)

Shows a temperature and a humidity. It has no setpoint and no ring. A click opens the chart if a *URL* is set.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Actual temperature ID | `oid-actual` | | Temperature. |
| Humidity ID | `oid-humidity` | | Humidity. |
| Battery object ID | `oid-battery` | | See [Indicators](#indicators). |
| Unit | `unit` | `°C` | Appended to the temperature. |
| Digits after comma | `digits` | 0 | Decimals. |
| Comma as decimal separator | `is_comma` | on | `22,3` instead of `22.3`. |

Groups *Center* (default icon `img/Heating.png`), *Descriptions*, *Styles* (only *Normal*, default
`hq-button-base-outtemp`) and *Chart*: see [General](#general). The widget has no main state, so the settings for
the time of the last change have no effect here.

## Window and Shutter - `tplHqShutter`

![Window and Shutter](../img/shutter.png)

A window with up to six sashes and a roller shutter. Every sash shows whether it is closed, tilted or open, and the
shutter shows its position. The picture shows one closed sash, two sashes (tilted and open) with the position in the
right pill, and three sashes with a left description.

A click on the window opens a control popup:

![Popup](../img/shutter-popup.png)

- **Arrow up** opens the shutter, **arrow down** closes it.
- **Drag the slider** to set a position. It is written when you let go.
- The popup closes after a button, after *Timeout for hide* without interaction, or with a click somewhere else in the
  view. There is no popup in the editor.

**Position and direction.** Without *Invert*, *Minimum* means fully open and *Maximum* means fully closed (the
shutter is down). Many devices and the ioBroker role `level.blind` count the other way round (100 % = open). For
these, turn on **Invert**.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | Position of the shutter, e.g. `level.blind`. Without it the widget shows only the window. |
| Working object ID | `oid-working` | | Kept for vis-1 projects. The window shows no working indicator (vis-1 did not either). |
| Minimum / Maximum | `min` / `max` | 0 / 100 | Range of the position state. |
| Border width | `border_width` | 3 | Width of the window frame in px. |
| Slides count | `slide_count` | 1 | Number of sashes, 1...6. For each sash there is a group *Slides* (see below). |
| Invert | `invert` | off | Turn on if your device reports 100 % = open. |
| Timeout for hide | `hide_timeout` | 2000 | Time in ms after which the popup closes by itself. 0: stays open. |
| No animation | `noAnimate` | off | The shutter jumps to the new position instead of moving. |
| Frame colour | `frameColor` | | Colour of the frame and the sashes. Empty keeps the default grey. |
| Horizontal popup position | `popupHorizontalPos` | center | Where the popup appears vertically: `top` - above the widget (aligned with its bottom edge), `bottom` - below it (aligned with its top edge), `center`. |
| Vertical popup position | `popupVerticalPos` | center | Where the popup appears horizontally: `left` - on the left (aligned with the right edge), `right` - on the right (aligned with the left edge), `center`. |

The names of the two position settings look swapped. They come from vis-1 and were kept so that existing projects
still work.

![Frame colours](../img/shutter-colors.png)

**Group "Descriptions"**: *No description (left)*, *Description (left)*, font sizes, colours and paddings as described
under [Descriptions](#descriptions). Instead of a right text there is:

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Show value | `show_value` | off | Shows the shutter position in the right pill: 0 % = open, 100 % = closed. |

**Group "Slides"** - once per sash (attribute names end with the number of the sash, e.g. `slide_type1`):

| Setting | Attribute | Description |
|---|---|---|
| Slide type | `slide_type` | How the sash opens. Empty: a fixed pane without a handle. `left` / `right`: hinged on the left / right, handle on the other side. `top` / `bottom`: handle at the top / bottom. |
| Slide sensor | `oid-slide-sensor` | Contact of the sash: `true`, `1`, `open`, `opened` = open; `2`, `tilt`, `tilted` = tilted; anything else = closed. |
| Slide sensor lowbat | `oid-slide-sensor-lowbat` | Low battery of that contact - red battery icon. |
| Slide handle | `oid-slide-handle` | Window handle sensor: `0` = closed, `1` = tilted, `2` = open (like the HomeMatic rotary handle sensor). |
| Slide handle lowbat | `oid-slide-handle-lowbat` | Low battery of the handle sensor - pink battery icon. |

With only a handle sensor, the sash follows the handle. With only a contact, the handle follows the contact. With both,
the contact sets the sash and the handle sets the handle. When the handle is tilted, the sash is drawn tilted too. A
tilted handle is yellow.

All combinations of type and handle value:

![Sash types](../img/shutter-sashes.png)

## Door - `tplHqDoor`

![Door](../img/door.png)

A door that shows its contact: closed, or open with a gap on the side of the lock. Display only - the widget does not
react to clicks. The picture shows closed, open, open with `door_type = right`, custom colours, and a left
description.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | Door contact. `true`, `"true"` and numbers other than 0 mean open. |
| Battery object ID | `oid-battery` | | See [Indicators](#indicators). |
| Signal object ID | `oid-signal` | | See [Indicators](#indicators). |
| Border width | `border_width` | 3 | Width of the door frame in px. |
| Invert | `invert` | off | For contacts that report `true` when closed. |
| Door swing | `door_type` | (left) | Empty or `left`: hinged on the left, the gap opens on the right. `right`: hinged on the right, the gap opens on the left. |
| No animation | `noAnimate` | off | The door jumps instead of swinging. |
| Doorway color | `emptyColor` | `#515151` | Colour of the gap of the open door. |
| Frame colour | `frameColor` | | Colour of the frame. Empty keeps the default grey. |
| Door leaf colour | `sheetColor` | | Colour of the door leaf and its handle. Empty keeps the default. |

Group *Descriptions*: left pill only, see [Descriptions](#descriptions).

## Lock - `tplHqLock`

![Lock](../img/lock.png)

A door lock. The widget shows a locked or an unlocked padlock. A click opens a round popup with up to three buttons:
**lock** (top), **unlock** (bottom left) and, if *Object ID Open* is set, **open door** (bottom right). The popup
closes after a button, after *Popup timeout*, or with a click elsewhere in the view.

The lock counts as **unlocked** only while the state equals *Open Lock-Value*. Every other value counts as locked.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | Lock state, e.g. `switch.lock`. |
| Object ID Open | `oid-open` | | State that opens the door (the latch). Without it the popup has only two buttons. |
| Battery object ID | `oid-battery` | | See [Indicators](#indicators). |
| No animation | `noAnimate` | off | The popup appears without zooming in. |

**Group "Images"**

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Icon-Closed | `closedIcon` | `widgets/hqwidgets/img/lockLocked.png` | Image of the widget while locked. |
| Icon-Opened | `openedIcon` | `widgets/hqwidgets/img/lockUnlocked.png` | Image of the widget while unlocked. |

**Group "Popup"**

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Popup radius | `popupRadius` | 75 | Radius of the popup in px. |
| Buttons radius | `buttonRadius` | 50 | Corner radius of the three buttons. |
| Close-Icon / Close-Value / Close-Style | `closeIcon` / `closeValue` / `closeStyle` | lock image / `false` / | Button **lock**: image, value written to *Object ID*, and skin (see [Styles](#styles-and-change-effects)). |
| Open Lock-Icon / -Value / -Style | `openIcon` / `openValue` / `openStyle` | open lock image / `true` / | Button **unlock**. The value also decides when the widget counts as unlocked. |
| Open Door-Icon / -Value / -Style | `openDoorIcon` / `openDoorValue` / `openDoorStyle` | door image / `true` / | Button **open door**, writes to *Object ID Open*. |
| Popup timeout | `showTimeout` | 5000 | Time in ms after which the popup closes by itself. 0: stays open. |

Group *Descriptions*: left pill only, see [Descriptions](#descriptions). Group *Styles* (default
`hq-button-no-background` for both states): see [Styles and change effects](#styles-and-change-effects). *Normal* is
the locked state, *Active* the unlocked one. The change effect runs on every change of the lock state.

## Checkbox - `tplHqCheckbox`

![Checkbox](../img/checkbox.png)

A sliding switch. A click toggles it and writes *On value* or *Off value*. The switch has a fixed size: 216 x 68 px,
or 108 x 34 px with size `small`. It is centred in the widget.

![Colours](../img/checkbox-colors.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | The state to switch. |
| Off value | `val_false` | `false` | Written when switching off. |
| On value | `val_true` | `true` | Written when switching on. The switch is on while the state equals this value. If the value is `true`, every number above 0 also counts as on. |
| Static value | `staticValue` | | Only without *Object ID*: the switch just shows this value, for example to show a fixed state. |
| Read only | `readOnly` | off | Display only. |
| Size | `checkboxSize` | big | `big` (216 x 68) or `small` (108 x 34). |
| Color by OFF | `checkboxColor` | grey | `orange`, `blue`, `green` or `grey`. |
| Color by ON | `checkboxColorOn` | orange | `orange`, `blue`, `green` or `grey`. |

## CircleKnob - `tplHqCircle`

![CircleKnob](../img/circle.png)

A round control for any number, for example a volume or a position. It fills the widget - the shorter side
decides the size. **Drag** along the ring to set the value. It is written when you let go. The ring can be shortened
and rotated. The picture shows the default, a 270° ring with rounded ends, a cursor instead of a bar, a
counterclockwise ring in other colours, and a half ring.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | The value. Without it the knob only shows the *Minimum*. |
| Working / Battery / Signal object ID | `oid-working` / `oid-battery` / `oid-signal` | | See [Indicators](#indicators). |
| Unit | `unit` | | Appended to the number. |
| Minimum / Maximum | `min` / `max` | 0 / 100 | Range. |
| Digits after comma | `digits` | 0 | Decimals of the number. |
| Step | `step` | 1 | Step size. |
| Comma as decimal separator | `is_comma` | on | `42,5` instead of `42.5`. |
| Read only | `readOnly` | off | Display only. |
| Caption | `caption` | | Text below the number. |
| Hide number | `hideNumber` | off | Hides the number in the middle. |
| Angle offset | `angleOffset` | | Rotation of the scale in degrees, 0 = starts at the top. Empty: a shortened ring gets its gap at the bottom. |
| Angle arc | `angleArc` | 360 | Length of the scale in degrees, e.g. 270 for a ring open at the bottom. |
| Display previous | `displayPrevious` | on | While dragging, shows the current value as a faint bar. |
| Cursor | `cursor` | | Instead of a bar from the start, draws only a short segment at the value. The number sets its length. |
| Thickness | `thickness` | 0.35 | Width of the ring as a fraction of the radius. |
| Color | `color` | `#87CEEB` | Colour of the bar and the number. |
| Background color | `bgcolor` | | Colour of the track. Empty follows the theme. |
| Line cap | `linecap` | off | Rounded ends of the bar. |
| Anticlockwise | `anticlockwise` | off | The scale runs counterclockwise. |

## Odometer - `tplHqOdometer`

![Odometer](../img/odometer.png)

A mechanical counter, for example for electricity, gas or water meters. When the value changes, the digits roll to
the new value. The size of the digits follows the font size of the widget (default 24 px). Display only.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | A number state. |
| Theme | `style` | car | Look of the counter: `car`, `default`, `digital`, `minimal`, `plaza`, `slot-machine`, `train-station` (see picture). |
| Format | `format` | `(ddd),dd` | `d` stands for a digit. The part in brackets is repeated over the integer part, together with its separator. What follows is the decimal separator and one `d` per decimal. Examples for 12345.67: `(.ddd),dd` → `12.345,67`, `(,ddd).dd` → `12,345.67`, `(ddd)` → `12346`. |
| Factor | `factor` | 1 | The value is multiplied by it, e.g. 0.001 to show Wh as kWh. |
| Leading zeros | `leadingZeros` | on | Pads the integer part with zeros to the group width, e.g. `005`. |
| Animation duration (ms) | `duration` | 3000 | How long the digits roll. |

## Differences to vis-1

The vis-2 widgets use no jQuery, jQuery UI, `jquery.knob` or `odometer.js`. Projects carry over unchanged. Some
details work differently:

- **Checkbox:** size `small` no longer changes the size of the widget. The switch is centred in the widget instead.
- **Chart dialog:** the jQuery UI show effect (`dialog_effect`) is gone, and the dialog has no title bar.
- **Temperature ring:** the colour runs from blue to red. In vis-1 it passed through violet in the middle.
- **On/Off:** *Value for ON* / *Value for OFF* of the additional control are now used. vis-1 ignored them.
- **New settings:** *Read only* for dimmer, inner temperature and knob. Signal and doorway colour for the door.
  Indicators for the knob. Animation duration for the odometer. Frame and door leaf colours for window and door.
- **Popups:** the popups of the window and the lock close with a click anywhere else in the view.