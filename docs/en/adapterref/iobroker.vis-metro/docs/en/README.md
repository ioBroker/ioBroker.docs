---
chapters: {"pages":{"en/adapterref/iobroker.vis-metro/README.md":{"title":{"en":"ioBroker.vis-metro"},"content":"en/adapterref/iobroker.vis-metro/README.md"},"en/adapterref/iobroker.vis-metro/docs/en/README.md":{"title":{"en":"Metro widgets"},"content":"en/adapterref/iobroker.vis-metro/docs/en/README.md"}}}
---
# Metro widgets

Tiles in the style of Windows 8 ("Metro UI"): coloured tiles with an icon, a label strip and a badge, tiles that
open a dialog, controls for dimmers, shutters and thermostats, and a slider, a switch and a checkbox.

![All widgets](../img/overview.png)

The adapter ships every widget twice: for **vis** (vis-1) as before, and for **vis-2** as React widgets. Both
have the same widget ids and the same settings, so a vis project keeps working in vis-2 as it is - vis-2 draws
the widgets with the React version, which looks the same and behaves the same. The React widgets need vis-2 2.12.8
or newer; an older vis-2 uses the vis-1 widgets.

The widgets are in the group **Metro** of the widget palette.

- [Common settings](#common-settings)
- [Tiles that show a state](#tiles-that-show-a-state): [Tile Bool](#tile-bool),
  [Tile Bool / Number](#tile-bool--number), [Tile String](#tile-string), [Tile ValueList 8](#tile-valuelist-8)
- [Tiles that switch](#tiles-that-switch): [Tile State](#tile-state),
  [Tile State / Badge Number](#tile-state--badge-number), [Tile Toggle](#tile-toggle),
  [Tile Toggle / Badge Number](#tile-toggle--badge-number), [Tile Navigation](#tile-navigation)
- [Controls](#controls): [Slider horizontal and vertical](#slider-horizontal-and-vertical),
  [Bool Checkbox and Switch](#bool-checkbox-and-switch)
- [Tiles with a dialog](#tiles-with-a-dialog): [Tile Bool Dialog](#tile-bool-dialog),
  [Tile Dialog, view](#tile-dialog-view), [Tile Dialog, HTML](#tile-dialog-html),
  [Tile Dialog, state text](#tile-dialog-state-text), [Tile Dialog, iFrame](#tile-dialog-iframe)
- [Dimmer, shutter and heating](#dimmer-shutter-and-heating): [Tile Dimmer](#tile-dimmer),
  [Tile Dimmer Dialog](#tile-dimmer-dialog), [Tile Shutter](#tile-shutter),
  [Tile Shutter Dialog](#tile-shutter-dialog), [Tile Heating](#tile-heating),
  [Tile Heating Dialog](#tile-heating-dialog)
- [Differences to vis-1](#differences-to-vis-1)

## Common settings

A tile consists of the **background**, the **icon** in the middle, the **brand** - the strip at the bottom with the
label - and the **badge** at the right end of the strip.

| Setting | Meaning |
|---|---|
| Background, Brand background, Badge background | Colours of the Metro palette: `bg-*` are plain colours, `ribbed-*` striped ones. The editor offers them in a list with a sample. |
| Icon class, Icon badge | An icon of the Metro icon font (`icon-*`), chosen from a list. |
| Icon URL, Badge URL | An image instead of (or in addition to) the icon font. Width, height and the offset from the top and from the left are set in percent of the tile. |
| Label | The text of the strip. Labels may contain HTML. |
| Hover effect | A frame while the pointer is over the tile. |
| Transform | The tile tilts towards the place where it is pressed. |
| Select by true / Select on value | A frame around the tile while the state is true (or has the value). |

Many tiles have two variants of every colour, icon and label: **... by false** and **... by true**. The tile shows the
variant that fits the state: false are `false`, `0`, `"0"`, `"false"`, an empty value and no value at all -
everything else is true.

The **dialog** settings of the dialog tiles:

| Setting | Meaning |
|---|---|
| Title | Title of the dialog (HTML allowed). Some tiles take the label instead. |
| Dialog width, Dialog height | Size in pixels. Without a size the dialog takes the size of its content. |
| Flat Design | A flat window without the blue frame. |
| Shadow | A shadow around the window. |
| Draggable | The dialog can be moved by its title bar. |
| Modal | The page behind the dialog is darkened. |
| Icon URL, Icon class | An icon in the title bar. |

Only one dialog is open at a time. While it is open, the page behind it does not react - modal or not - and the
dialog closes with the × in the title bar.

## Tiles that show a state

### Tile Bool

![Tile Bool](../img/tplMetroTileBool.png)

`tplMetroTileBool` - shows a boolean state: background, icon, label, strip and badge have a variant for true and for
false.

| Setting | Meaning |
|---|---|
| Object ID | The state to show. |
| Label if false / Label if true | The label of the strip. |

### Tile Bool / Number

![Tile Bool / Number](../img/tplMetroTileBoolNumber.png)

`tplMetroTileBoolNumber` - like Tile Bool, and the value of a number state is added to the label.

| Setting | Meaning |
|---|---|
| State ID | The boolean state that chooses the variant. |
| Number ID | The number that is written behind the label, followed by **Label append** (e.g. a unit). |

### Tile String

![Tile String](../img/tplMetroTileString.png)

`tplMetroTileString` - shows the value of a state as text; colours and icons follow a second, boolean state.

| Setting | Meaning |
|---|---|
| Content ID | The state whose value is shown on the tile (HTML allowed), with **Content prepend** and **Content append** around it. |
| State ID | The boolean state that chooses the variant. |
| Label ObjectID | The label is taken from this state, with **Label prepend** and **Label append** around it. |

### Tile ValueList 8

![Tile ValueList 8](../img/tplMetroTileList8.png)

`tplMetroTileList8` - shows one of eight looks, chosen by the number 0 to 7 of a state: label, background, icon, badge
icon, badge and strip colour exist once per number (**Label [0]** ... **Label [7]** and so on). `true` counts as 1,
`false` as 0.

## Tiles that switch

### Tile State

![Tile State](../img/tplMetroTileState.png)

`tplMetroTileState` - a click writes a fixed value; the tile shows whether the state has that value.

| Setting | Meaning |
|---|---|
| State ID | The state that is written. |
| Value | The value a click writes. `true`/`false` are written as booleans, numbers as numbers (`5`), everything else as text - `01`, for instance, stays the text "01". Without a value an empty text is written. |
| Select on value | A frame while the state has the value. |

### Tile State / Badge Number

![Tile State / Badge Number](../img/tplMetroTileStateNumber.png)

`tplMetroTileStateNumber` - like Tile State, with the value of the **Number ID** in the badge.

### Tile Toggle

![Tile Toggle](../img/tplMetroTileToggle.png)

`tplMetroTileToggle` - a click toggles the **Object ID**: `false`, an empty value or no value become `true`, `true`
becomes `false`. A number becomes `0` if it is 0.5 or more, else `1`.

With the settings of the group **Control other states** the tile switches other states instead:

| Setting | Meaning |
|---|---|
| Object ID for true / Object ID for false | Written instead of the Object ID; without **Object ID for false** the one for true is used for both. |
| Value for true / Value for false | The values that are written. |
| URL for true / URL for false | Called on the click; without **URL for false** the one for true is called both times. |

Which of the two is used depends on the Object ID: if it is on (`true`, `1`), the "false" side is used, otherwise
the "true" side. Without an Object ID the tile remembers the last click and changes sides with every click.

### Tile Toggle / Badge Number

![Tile Toggle / Badge Number](../img/tplMetroTileToggleNumber.png)

`tplMetroTileToggleNumber` - like Tile Toggle, with the value of the **Number ID** in the badge.

### Tile Navigation

![Tile Navigation](../img/tplMetroTileNav.png)

`tplMetroTileNav` - opens the **View to open**. While that view is shown, the tile takes its active colours
(**Background active**, **Brand background active**, **Badge background active**), and with **Select current view**
also a frame. **Page background** sets the background of the page when the view is opened.

## Controls

### Slider horizontal and vertical

![Slider horizontal](../img/tplMetroSlider.png) ![Slider vertical](../img/tplMetroSliderVertical.png)

`tplMetroSlider`, `tplMetroSliderVertical` - a slider that writes the value while it is dragged.

| Setting | Meaning |
|---|---|
| Object ID | The state. |
| Min, Max | The range; without them 0 to 1. `true` is shown as max, `false` as min. |
| Step | The written values are rounded to this step. |
| Slider complete color, Slider handle color | The colours of the filled part and of the handle. |

### Bool Checkbox and Switch

![Bool Checkbox](../img/tplMetroValueBoolCheckbox.png) ![Switch](../img/tplMetroValueBoolSwitch.png)

`tplMetroValueBoolCheckbox`, `tplMetroValueBoolSwitch` - a checkbox or an on/off switch for a boolean state, with
free HTML before and after it (**HTML before**, **HTML after**). A click writes `true` or `false`.

## Tiles with a dialog

A click on these tiles opens a dialog. The tile itself has one background, one icon (**Icon class** or
**Icon URL**), a label and a badge.

### Tile Bool Dialog

![Tile Bool Dialog](../img/tplMetroTileBoolDialog.png)

`tplMetroTileBoolDialog` - a Tile Bool whose click opens the **View in the dialog**.

### Tile Dialog, view

![Tile Dialog, view](../img/tplMetroTileDialog.png) ![Tile Dialog, view / Badge Number](../img/tplMetroTileDialogNumber.png)

`tplMetroTileDialog`, `tplMetroTileDialogNumber` - a click opens the **View in the dialog**. The second one shows the
value of the **Number ID** in the badge while it is above 0.

### Tile Dialog, HTML

![Tile Dialog, HTML](../img/tplMetroTileDialogStatic.png) ![Tile Dialog, HTML / Badge Number](../img/tplMetroTileStaticDialogNumber.png)

`tplMetroTileDialogStatic`, `tplMetroTileStaticDialogNumber` - a click opens a dialog with the fixed **Dialog content
(HTML)**. The tile shows the value of the **Content ID** next to the icon; the second one also a number in the
badge.

### Tile Dialog, state text

![Tile Dialog, state text](../img/tplMetroTileDialogString.png) ![Tile Dialog, state text / Badge Number](../img/tplMetroTileStringDialogNumber.png)

`tplMetroTileDialogString`, `tplMetroTileStringDialogNumber` - a click opens a dialog with the value of the
**Dialog ID** (HTML allowed), in the **Dialog font size**, with the **Dialog padding** and the **Dialog text align**.
The dialog follows changes of the state while it is open.

### Tile Dialog, iFrame

![Tile Dialog, iFrame](../img/tplMetroTileFrameDialogNumber.png)

`tplMetroTileFrameDialogNumber` - a click opens the **Dialog URL** in a frame; **Scroll in iFrame** allows
scrolling. The badge shows the **Badge text**, the tile the **Content** next to the icon.

## Dimmer, shutter and heating

### Tile Dimmer

![Tile Dimmer](../img/tplMetroTileDimmer.png)

`tplMetroTileDimmer` - a wide tile with a lamp in eleven steps, a switch and a slider for the **Object ID**.

| Setting | Meaning |
|---|---|
| Min, Max | The range of the dimmer. The switch writes max and min. **Set both** - without them the slider does not work, as in vis-1. |
| Step | The slider values are rounded to this step. |
| Slider color, Slider complete color, Slider handle color | The colours of the slider. |

### Tile Dimmer Dialog

![Tile Dimmer Dialog](../img/tplMetroTileDimmerDialog.png) ![Tile Dimmer Dialog, active strip](../img/tplMetroTileDimmerDialogactiv.png)

`tplMetroTileDimmerDialog`, `tplMetroTileDimmerDialogactiv` - a tile with the lamp; a click opens the switch and the
slider in a dialog. Without min and max the range is 0 to 1. **Decimal places** makes the slider write the value
with that many decimals (as text). The second tile colours its strip with **Brand background by true** while the
dimmer is on and with **Brand background by false** while it is off.

![Dimmer dialog](../img/dialog-dimmer.png)

### Tile Shutter

![Tile Shutter](../img/tplMetroTileShutter.png)

`tplMetroTileShutter` - a wide tile with a window in eleven steps, a switch and a slider for the **Object ID**. The
window is open at max and closed at min. While the **Working state ID** is true, the switch keeps its position.

### Tile Shutter Dialog

![Tile Shutter Dialog](../img/tplMetroTileShutterDialog.png)

`tplMetroTileShutterDialog` - a tile with the window; a click opens the switch and the slider in a dialog.

### Tile Heating

![Tile Heating](../img/tplMetroTileHeating.png)

`tplMetroTileHeating` - a wide tile with set and actual temperature, valve position and humidity, and a slider for
the set temperature. Each line appears only when its state is chosen; without a set temperature the slider is
hidden.

| Setting | Meaning |
|---|---|
| Set temperature ID | The set point. When a state with the role `level.temperature` is chosen, the editor fills the other states of the same thermostat that are still empty: actual temperature, valve, humidity and low battery by their roles, control mode and window by the names of the Homematic thermostats (`CONTROL_MODE`, `WINDOW_STATE`, `WINDOW_OPEN_REPORTING`). |
| Actual temperature ID, Valve position ID, Humidity ID | The other lines. |
| Label set temperature ... Label for humidity | Own texts for the lines. |
| Min, Max, Step | Range of the slider (6 to 30 °C) and its step (0.1 without one). |
| Control mode ID, Low battery ID, Window open ID | The icons of the badge: the control mode shows **Icon auto mode** and its siblings for the values 0, 1 and 2; the battery and window icons appear while their state is true. |

### Tile Heating Dialog

![Tile Heating Dialog](../img/tplMetroTileHeatingDialog.png)

`tplMetroTileHeatingDialog` - shows the temperatures in short (**Short label ...**); a click opens a dialog with a
slider for the set temperature and the three values.

![Heating dialog](../img/dialog-heating.png)

## Differences to vis-1

The vis-2 widgets reproduce the vis-1 widgets exactly - every widget, opened dialog and click has been compared with
the original templates, pixel by pixel and write by write. That includes a few oddities of vis-1, which were kept so
that existing projects look the same:

- The badge image of Tile Bool, Tile Bool Dialog and Tile Toggle is always **Badge URL by false**.
- Tile Toggle picks its icon by the plain value: the texts "false" and "0" show the icon of true, while
  everything else on the tile shows false.
- The switch of the dimmer and shutter tiles is on for every value except 0, false and empty - not only above the
  middle of min and max.
- Tile Dimmer does not work without min and max (see above).
- The lamp and the window count `true` as 1, not as max.
- Tile Toggle with **Object ID for true** but without **Value for true** writes an empty text.
- A dialog with a state text shows a state of `null` as "null"; so does the short line of the heating dialog tile.
- The default label "Set temperature" in the heating dialog is not translated.

Some settings had no effect in vis-1 and are no longer offered; values stored in a project are kept and simply
ignored, as before:

| Widget | Setting |
|---|---|
| Tile State / Badge Number | Badge background, Hide by 0 |
| Tile Toggle / Badge Number | Hide by 0, Badge background by false / by true |
| Dialog tiles with a badge number | Hide by 0 |
| Tile Navigation | the view change effects (hide/show effect, duration, options, sync) - vis-2 changes views itself |
| Slider horizontal and vertical | Slider color, Working state ID |
| Tile Dimmer Dialog, active strip | Brand background, the automatic closing of the dialog |

Two things work better than in vis-1: the heating dialog shows the values also when a state is a text (vis-1 showed
an empty dialog), and the sliders measure themselves again when the widget is resized.