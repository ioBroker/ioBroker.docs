---
chapters: {"pages":{"en/adapterref/iobroker.vis-jqui-mfd/README.md":{"title":{"en":"ioBroker.vis-jqui-mfd"},"content":"en/adapterref/iobroker.vis-jqui-mfd/README.md"},"en/adapterref/iobroker.vis-jqui-mfd/docs/en/README.md":{"title":{"en":"jqui-mfd widgets for vis-2"},"content":"en/adapterref/iobroker.vis-jqui-mfd/docs/en/README.md"}}}
---
# jqui-mfd widgets for vis-2

The jqui-mfd widgets are 27 buttons with the icons of the
[OpenAutomation iconset](https://github.com/OpenAutomationProject/knx-uf-iconset) for lights, sockets, shutters,
awnings, valves, windows, doors, the heating and cameras. Many of them open a dialog to control the device. This page
describes the **vis-2** version. vis (vis-1) has the same widgets with the same settings.

![All widgets](../img/overview.png)

**Contents**

- [General](#general)
    - [Requirements and migration](#requirements-and-migration)
    - [vis-2 theme or vis-1 look](#vis-2-theme-or-vis-1-look)
    - [The button and the jQuery UI theme](#the-button-and-the-jquery-ui-theme)
    - [Icons and icon colors](#icons-and-icon-colors)
    - [Values entered in the editor](#values-entered-in-the-editor)
    - [Dialogs](#dialogs)
- [Light/Dimmer, Light switch, Dimmer + dialog](#lightdimmer-light-switch-dimmer--dialog)
- [On/Off + dialog](#onoff--dialog---tplmfdlightonoffdialog)
- [Socket and Socket switch](#socket-and-socket-switch)
- [Shutter, Blind, Valve](#shutter-blind-valve)
- [Custom10](#custom10---tplmfdcustom10-tplmfdcustom10dialog)
- [Heating + dialog](#heating--dialog---tplmfdheating)
- [Window, Roof window, Garage](#window-roof-window-garage)
- [Door](#door---tplmfddoor)
- [Window with rotary handle](#window-with-rotary-handle---tplmfdwindow)
- [Cameras](#cameras)
- [Differences to vis-1](#differences-to-vis-1)

## General

### Requirements and migration

The widgets are in the widget set **jQuery UI MFD** in the widget list of the vis-2 editor. They need **vis-2
2.12.8** or newer.

Projects made with vis-1 keep working without changes. Both versions use the same widget ids (`tplMfdLight`,
`tplMfdShutterDialog`, ...) and the same attribute names, and vis-2 picks the React version automatically. All
settings carry over.

In the tables below, **Setting** is the label in the vis-2 editor and **Attribute** is the name stored in the project.
Use the attribute name when you edit a project in JSON or copy settings between widgets.

### vis-2 theme or vis-1 look

![vis-2 theme, light](../img/mui-light.png)

![vis-2 theme, dark](../img/mui-dark.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| vis-2 theme | `mui` | on (new widgets) | Draws the widget in the colors of the vis-2 theme: the button is a surface of the theme, pressed it takes the primary color, the icon takes the text color. The dialogs use the same colors. Off: the jQuery UI look of vis-1, see [below](#the-button-and-the-jquery-ui-theme). |

Every widget created in vis-2 has this option switched on and follows the theme of vis-2 - light, dark or any other.
Widgets that come from vis-1 - and widgets created with an older version of this adapter - have **no value** for it
and keep the vis-1 look, so an existing project does not change. The editor shows such a missing value as the
default, ticked, and marks the field red: untick and tick the box to switch the widget to the vis-2 theme.

With the vis-2 theme:

- The icons take the text color of the theme - dark in a light theme, white in a dark one. On a pressed button they
  take the text color of the primary color; without *Button rectangle* a widget that is on or open shows its icon in
  the primary color. A configured *Icon color* always wins.
- *Invert icon* is not needed; leave it off.
- The jQuery UI theme of the view has no effect on these widgets.

| Light theme | Dark theme |
|---|---|
| ![Dialog, light](../img/mui-dialog-light.png) | ![Dialog, dark](../img/mui-dialog-dark.png) |

### The button and the jQuery UI theme

Every widget is an icon on a button. In the vis-1 look (*vis-2 theme* off or not set) the button is drawn by the
**jQuery UI theme of the view** (view settings, *Theme*), exactly like in vis-1: the widget carries the classes `ui-widget ui-button ui-corner-all ui-state-default`,
and the theme decides colors, gradient and corners. Change the theme and all buttons change with it.

| redmond | ui-lightness | dark-hive | ui-darkness |
|---|---|---|---|
| ![redmond](../img/theme-redmond.png) | ![ui-lightness](../img/theme-ui-lightness.png) | ![dark-hive](../img/theme-dark-hive.png) | ![ui-darkness](../img/theme-ui-darkness.png) |

The icons are white. On a light theme like *redmond* switch on **Invert icon** or choose an **Icon color**.

![Button options](../img/button-options.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Button rectangle | `asButton` | on | Draws the button - of the jQuery UI theme or of the vis-2 theme. Off: only the icon is shown. |
| Invert icon | `invert_icon` | off | Inverts the icon: white becomes black. |

**Pressed and hover.** The button is shown pressed (`ui-state-active`) while the device is on or open - the lamp
lights, the socket is on, the window is open. Widgets that react to a click also light up under the mouse
(`ui-state-hover`). The tables of the widgets say when a widget is pressed.

A CSS class entered in the common settings of the widget is added to the button, so your own CSS rules keep working.

### Icons and icon colors

The icons are SVG images and stay sharp at every widget size. The default size of a widget is 76 x 76 px. The lamp,
the shutter, the blind and the valve are not images at all: they are drawn for the exact value, so 37% really
shows 37%.

![Icon colors](../img/icon-colors.png)

| Setting | Attribute | Description |
|---|---|---|
| Icon color | `iconColor` | Color of the icon, for example `#e17009` or `orange`. Empty: white. |
| Icon color 0% ... Icon color 100% | `iconColor0` ... `iconColor10` | Colors of the widgets that show a value (light, shutter, valve, blind), each for a range of the value: `iconColor0` below 10%, `iconColor1` from 10%, ..., `iconColor10` at *Max* - the steps of the vis-1 images. An empty one takes *Icon color*. |

A color replaces the white of the icon. Your own icons can be colored as well, if they are SVG images drawn in
white. Other images (PNG, JPG) are shown as they are.

### Values entered in the editor

*Min*, *Max* and the values of states (*Value for OPENED*, *Value for ON*, ...) are entered as text. The widgets
convert them like this:

| Entered text          | Meaning |
|-----------------------|---------|
| `true` / `false`      | boolean `true` / `false` |
| `0`, `1`, `42.5`, ... | number |
| anything else         | the text as it is |
| (empty)               | the default of the setting |

A state value and a configured value are compared loosely: `1`, `"1"` and `true` are the same.

### Dialogs

The widgets with *+ dialog* in their name open a dialog when they are clicked. The dialog lies over the whole
view, can be moved at its title bar and closes with the **x**, with **Escape** or - if configured - by itself. It
uses the colors of the vis-2 theme - with *vis-2 theme* off it has a light or dark look of its own. In the editor
the dialogs do not open, a click selects the widget.

![Dimmer dialog](../img/dimmer-dialog.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Dialog title | `title` | | Text of the title bar. Empty: the object ID (cameras: no title). |
| No header | `noHeader` | off | Hides the title bar. The close button stays. |
| Auto close (ms) | `autoclose` | | Closes the dialog after this time. Every click in the dialog starts the time again. Values below 60 are taken as seconds. Empty or 0: the dialog stays open. |
| Modal | `modal` | off | Darkens the view behind the dialog. A click on the dark area closes the dialog. |
| Dialog width | `dialog_width` | see widget | Width. A number is px, `50%` or `30em` are possible too. |
| Dialog height | `dialog_height` | see widget | Minimum height. The dialog grows with its content. |
| Dialog top / Dialog left | `dialog_top` / `dialog_left` | | Position in the window, for example `20` or `10%`. Empty: centered. |
| Overflow X / Overflow Y | `overflowX` / `overflowY` | | Scroll bars of the content: `visible`, `hidden`, `scroll`, `auto`, ... |

The dialog is never larger than the window. Not every dialog has all settings, the tables of the widgets list the
differences.

**The value dialogs** (dimmer, shutter, blind, valve, Custom10, heating) have a row of buttons for fixed values, a
slider and a line with the value:

| Setting | Attribute | Description |
|---|---|---|
| Show value | `show_value` | Adds the value itself to the line, e.g. `42% (42 %)`. |
| Units | `units` | Unit behind the value. |
| Working object ID | `oid-working` | An object that is `true` while the device moves, e.g. `WORKING` of a HomeMatic shutter actuator. While it is `true`, the slider stays where you released it instead of following the positions the device reports on its way. |

The slider writes the value once, when you release it. The button of the current value is highlighted.

## Light/Dimmer, Light switch, Dimmer + dialog

`tplMfdLight`, `tplMfdLightCtrl`, `tplMfdLightDialog`

The lamp shows the brightness without steps: below 1% of the range it is switched off, above it the rays light up
one after the other, clockwise from the bottom left - every 10% one more, the one in between grows.

![Light steps](../img/light-steps.png)

- **Light/Dimmer** (`tplMfdLight`) only shows the state.
- **Light switch** (`tplMfdLightCtrl`) switches on click: from *Min* to *Max*, from *Max* to *Min*. A value in
  between goes to *Min* from the middle of the range upwards and to *Max* below it. Without *Min* and *Max* it
  switches between `false` and `true` (a number: to `0` from 0.5 upwards, to `1` below). **For a dimmer from 0 to
  100 enter *Min* = 0 and *Max* = 100.**
- **Dimmer + dialog** (`tplMfdLightDialog`) opens a dialog with *off / 25% / 50% / 75% / 100%* of the range and a
  slider from *Min* to *Max* in steps of 1%.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | State of the lamp. `true` counts as *Max*, `false` as *Min*. |
| Min / Max | `min` / `max` | 0 / 100 | Range of the value. The light switch uses them as off/on value, see above. |
| Invert icon, Button rectangle, Icon color | | | See [General](#general). |
| Icon color 0% ... 100% | `iconColor0` ... `iconColor10` | | Color for each 10% of the range, `iconColor0` also for the switched-off lamp. |
| Working object ID | `oid-working` | | Dimmer + dialog only, see [Dialogs](#dialogs). |
| Dialog settings | | 470 x 210 | Dimmer + dialog only, see [Dialogs](#dialogs), with *Show value* and *Units*. |

The button is pressed while the value is above *Min*. The light switch and the dimmer light up under the mouse.

## On/Off + dialog - `tplMfdLightOnOffDialog`

A lamp that opens a dialog with the two buttons *off* and *on*.

![On/Off dialog](../img/onoff-dialog.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | State to switch. |
| Working object ID | `oid-working` | | Not used by this widget. |
| Min / Max | `min` / `max` | 0 / 100 | Values the buttons *off* and *on* write. **For a boolean state enter `false` and `true`.** |
| Icon for OFF / Icon for ON | `iconOff` / `iconOn` | switched-off / lit lamp | Own images for both states. |
| Icon color for OFF / for ON | `iconColorOff` / `iconColorOn` | | Colors of the two icons. |
| Invert icon, Button rectangle | | | See [General](#general). |
| Text for OFF / Text for ON | `textOff` / `textOn` | *off* / *on* | Texts of the two buttons. |
| Dialog settings | | 440 x 200 | See [Dialogs](#dialogs). |

The lamp is on - icon *on*, button pressed - if the state equals *Max* (if *Max* is set), if it differs from *Min*
(if only *Min* is set), otherwise if it is not `false`, `0`, `off` or empty.

## Socket and Socket switch

`tplMfdSocket`, `tplMfdSocketCtrl`

A socket that shows its state; the switch version switches it on click.

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | State of the socket. |
| Min / Max | `min` / `max` | 0 / 1 | Off and on value. The socket is on while the state is not *Min*. `true` counts as *Max*, `false` as *Min*. |
| Invert state | `invert_state` | off | Swaps on and off, for a state that is `true` when the socket is off. |
| Icon for OFF / Icon for ON | `icon_off` / `icon_on` | socket images | Own images for both states. |
| Icon color for OFF / for ON | `iconColor_off` / `iconColor_on` | | Colors of the two icons. |
| Invert icon, Button rectangle | | | See [General](#general). |

The button is pressed while the socket is on.

**Socket switch** (`tplMfdSocketCtrl`) switches on click like the light switch: between *Min* and *Max*, or
between `false` and `true` without them. It lights up under the mouse. The group **Control** replaces that by
other actions:

| Setting | Attribute | Description |
|---|---|---|
| URL for ON / URL for OFF | `urlTrue` / `urlFalse` | These URLs are called when switching on or off. The ioBroker server calls them, not the browser. Empty *URL for OFF*: the URL for ON. |
| Object ID for ON / for OFF | `oidTrue` / `oidFalse` | These objects are written when switching on or off, instead of the object ID. Empty *Object ID for OFF*: the object for ON. |
| Value for ON / Value for OFF | `oidTrueValue` / `oidFalseValue` | The values written to them. Empty: *Max* or `true`, *Min* or `false`. |

With URLs or objects for ON/OFF and **without** an object ID the widget remembers its state itself - after a
reload of the page it starts as off.

## Shutter, Blind, Valve

`tplMfdShutter`, `tplMfdShutterDialog`, `tplMfdBlind`, `tplMfdBlindDialog`, `tplMfdValve`, `tplMfdValveDialog`

Show a position, drawn for the exact value; the dialog versions set it.

![Shutter, blind and valve](../img/levels.png)

- **Shutter**: at *Max* the open window, the lower the value the further the slats come down out of the box.
- **Blind** (awning): from retracted (*Min*) to extended (*Max*); the cloth grows and the front edge moves down.
- **Valve**: the disk turns from upright - closed (*Min*) - to level with the pipe - open (*Max*).

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | Position, e.g. `LEVEL`. |
| Min / Max | `min` / `max` | 0 / 100 | Range. |
| Invert value | `invert_value` | off | For devices that report the opposite direction, e.g. 100 = shutter closed. Also inverts the slider and swaps the values of the dialog buttons. |
| Show active background | `show_active` | off | The button is pressed while the value is not *Max* (the shutter is not fully open), and it lights up under the mouse. |
| Invert icon, Button rectangle, Icon color | | | See [General](#general). |
| Icon colors | `iconColor0` ... `iconColor10` | | Color for each 10% of the range, see [Icons and icon colors](#icons-and-icon-colors). The blind has five: `iconColor0` (below 25%), `iconColor25`, `iconColor5` (from 50%), `iconColor75`, `iconColor10` (at *Max*). |
| Working object ID | `oid-working` | | Dialog versions only, see [Dialogs](#dialogs). |
| Dialog settings | | 450 x 210 (valve 440 x 200) | Dialog versions only, see [Dialogs](#dialogs), with *Show value* and *Units*. |

The dialog has the buttons *closed / 25% / 50% / 75% / open* (*Min* ... *Max*) and a slider.

![Shutter dialog](../img/shutter-dialog.png)

## Custom10 - `tplMfdCustom10`, `tplMfdCustom10Dialog`

Eleven images of your own. Preset with the valve images.

![Custom10](../img/custom10.png)

For every step 0 ... 10 there are three settings in the group **Icons**:

| Setting | Attribute | Description |
|---|---|---|
| Icon value N% | `iconValue0` ... `iconValue10` | If the state has exactly this value (`1` also matches `"1"`), this image is shown. |
| Icon N% | `icon0` ... `icon10` | The image. |
| Icon color N% | `iconColor0` ... `iconColor10` | Color of the image, see [Icons and icon colors](#icons-and-icon-colors). |

The widget first looks for a step whose *Icon value* equals the state. If there is none, it takes the step of the
range like the valve: `icon0` below 10% of the range between *Min* and *Max*, `icon1` from 10%, ..., `icon10` at
*Max*. `true` counts as *Max*, `false` as *Min*.

The other settings - *Object ID*, *Min*, *Max*, *Button rectangle*, *Invert value*, *Show active background* and
for the dialog version the dialog settings (440 x 200) - work like at the [valve](#shutter-blind-valve). Custom10 has
no *Invert icon* and no *Icon color*.

## Heating + dialog - `tplMfdHeating`

A thermostat. The radiator - or the temperature as text - opens a dialog with one button per temperature and a
slider.

![Heating](../img/heating.png)

![Heating dialog](../img/heating-dialog.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | Set temperature. |
| Working object ID | `oid-working` | | See [Dialogs](#dialogs). |
| Min / Max / Step | `min` / `max` / `step` | 18 / 30 / 2 | The buttons of the dialog go from *Min* to *Max* in *Step*; the slider uses the same values. At most 100 buttons are shown. |
| Decimal places | `roundnumber` | 0 | Decimal places of the buttons and the texts. |
| Display | `checkboxDisplay` | image | `image`: the radiator icon. `text`: the temperature, e.g. `21.5 °C`. |
| Invert icon, Button rectangle, Icon color | | | See [General](#general). |
| Dialog settings | | 600 x 200 | See [Dialogs](#dialogs), without position and overflow. |

The heating is never shown pressed.

## Window, Roof window, Garage

`tplMfdWindowBool`, `tplMfdRoofWindowBool`, `tplMfdGarage`

A contact with the states closed and opened.

![Contacts](../img/contacts.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | State of the contact. |
| Invert state | `invert_state` | off | Swaps opened and closed. |
| Invert icon, Button rectangle, Icon color | | | See [General](#general). |
| Value for CLOSED / Value for OPENED | `closed_value` / `opened_value` | | Without *Value for OPENED* every number above 0 and `true` is open. With it only exactly this value is open, everything else closed. |
| Icon for CLOSED / for OPENED | `closed_icon` / `opened_icon` | window, roof window, garage door | Own images. |
| Icon color for CLOSED / for OPENED | `closed_iconColor` / `opened_iconColor` | | Colors per state. Empty: *Icon color*. |

The button is pressed while it is open.

## Door - `tplMfdDoor`

A door with the three states closed, tilted and opened (see the picture above).

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID | `oid` | | State of the door. `true` is opened, `false` and no value are closed. |
| Invert state | `invert_state` | off | Only swaps the pressed look of the button, not the image. |
| Invert icon, Button rectangle, Icon color | | | See [General](#general). |
| Value for CLOSED / TILTED / OPENED | `closed_value` / `tilted_value` / `opened_value` | 0 / 2 / 1 | Every other value counts as opened. |
| Icons and icon colors | `closed_icon`, `closed_iconColor`, `tilted_icon`, ... | | Own images and colors per state. |

The button is pressed while the door is not closed.

## Window with rotary handle - `tplMfdWindow`

A window with one or two sashes, each with a rotary handle sensor.

![Window with rotary handle](../img/window-handle.png)

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Invert icon, Button rectangle, Icon color | | | See [General](#general). |
| Sashes count | `slide_count` | 1 | One or two sashes. |
| Sash type N | `slide_type1`, `slide_type2` | | `left` or `right`: which sash the sensor belongs to. With one sash, `right` mirrors the window. |
| Sash sensor N | `oid-slide-sensor1`, `oid-slide-sensor2` | | State of the handle of that sash. |
| Value for CLOSED / TILTED / OPENED | `closed_value` / `tilted_value` / `opened_value` | 0 / 2 / 1 | Values of the sensors. With one sash `true` is opened and `false` closed. |
| Icons and icon colors | `closed_icon`, `closed_iconColor`, `tilted_icon`, ... | | Own images and colors for the whole window. The window counts as opened if one sash is open, as tilted if one is tilted. |

With two sashes, both sash types have to be set. The widget has no object ID of its own and is never shown
pressed.

## Cameras

`tplMfdCamSnapshot`, `tplValMfdCamSnapshot`, `tplMfdCamMjpg`, `tplValMfdCamMjpg`, `tplMfdCamVideo`,
`tplValMfdCamVideo`, `tplMfdCamVideoObject`

A camera icon that opens the picture or the video of a camera. The versions *from object* (`tplVal...`) take the
URL from a state instead of a setting.

![Cameras](../img/cameras.png)

![Camera dialog](../img/camera-dialog.png)

Common to all cameras:

| Setting | Attribute | Default | Description |
|---|---|---|---|
| Object ID with URL | `oid` | | Versions *from object* only: the state contains the URL of the picture or video. |
| Alternative text | `alt` | | Alternative text of the icon. |
| Text | `text` | | Text under the icon. |
| Button rectangle, Icon color | | | See [General](#general). |
| Icon | `icon` | camera | Own image, e.g. the snapshot URL of the camera, so the button shows the picture. |
| Invert icon | `invert_icon` | off | See [General](#general). |
| Icon update interval (ms) | `icon_interval` | | Loads your own *Icon* again every that many ms. Empty or 0: never. |
| Dialog settings | | 640 x 480 | See [Dialogs](#dialogs). The picture fills the width of the dialog, *Dialog height* is the height of the picture. Scroll bars are hidden unless *Overflow* is set. |

The picture only loads while the dialog is open.

| Widget | Settings of its own | Description |
|---|---|---|
| Cam/Snapshot (`tplMfdCamSnapshot`) | `url`, `interval` (2000) | Loads the snapshot at *URL* again every *Update interval* ms while the dialog is open. |
| Cam/Snapshot from object (`tplValMfdCamSnapshot`) | `interval` (2000) | The same with the URL from the object. |
| Cam/Video (img) (`tplMfdCamMjpg`) | `url` | Shows an MJPEG stream. The stream stops when the dialog closes and starts again when the page comes back from the background. This dialog has no *Auto close*. |
| Cam/Video (img) from object (`tplValMfdCamMjpg`) | | The same with the URL from the object, with *Auto close*. |
| Cam/Video (html5) (`tplMfdCamVideo`) | `src_url`, `poster_url`, `use_object` | Plays the video at *Stream URL* in an HTML5 player, *Poster URL* is shown until it starts. *Use object tag* embeds it with `<object>` instead. |
| Cam/Video (html5) from object (`tplValMfdCamVideo`) | `poster_url`, `use_object` | The same with the URL from the object. |
| Cam/Video (object) (`tplMfdCamVideoObject`) | `src_url`, `qtsrc_url`, `type_application` (video/quicktime), `plugin`, `autoplay` (true) | Embeds the video for a browser plug-in (QuickTime). Current browsers have no such plug-ins - prefer the html5 version. |

## Differences to vis-1

The React widgets behave like the vis-1 widgets. These are the differences:

- **vis-2 theme.** New widgets follow the theme of vis-2 instead of the jQuery UI theme, see
  [vis-2 theme or vis-1 look](#vis-2-theme-or-vis-1-look). Widgets from vis-1 keep their look until *vis-2 theme* is
  switched on.

- **No jQuery UI dialogs any more.** The dialogs have a look of their own that follows the light and dark theme of
  vis-2. They can be moved, close with *Escape*, and a click on the dark area of a modal dialog closes it. They do
  not open in the editor.
- **The slider writes once**, where it is released. vis-1 sent a value for every step while the slider moved.
- **Auto close 0 means off.** vis-1 closed the dialog after one second with 0.
- **Working object ID works.** vis-1 read the wrong attribute and ignored it.
- **Lamp, shutter, blind and valve are drawn for the exact value** instead of showing one of eleven (blind: five)
  images - 37% no longer shows the 30% image. At 10%, 20%, ... the drawing is the vis-1 image. The colors still
  change in the steps of vis-1.
- **Icon colors reach every icon.** vis-1 did not color the icons with `fill` attributes, e.g. the switched-off
  lamp, and lost an own PNG icon completely when a color was set. The icons are always SVG now.
- **Show active background** of shutter, blind, valve and Custom10 compares with *Max* of the widget. vis-1 compared
  with 1, so a shutter from 0 to 100 was pressed nearly all the time.
- **Socket switch:** the pressed look follows *Invert state* like the icon. Without object ID the icon switches
  too, not only the button.
- **Window with rotary handle:** the own icons per state are shown. vis-1 offered them but ignored them.
- **Dialog buttons** of a boolean state are highlighted: `true` matches a button with the value `true` or `1`.
- **Value for ON/OFF** of the socket switch: empty writes *Max*/*Min*. vis-1 wrote an empty text.
- **Heating as text** shows `--` instead of `NaN` while there is no value.
- The versions *from object* of the snapshot and the MJPEG camera no longer offer *URL*. It had no effect in vis-1.