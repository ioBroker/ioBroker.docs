---
title: Included widgets
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/basic.md
hash: LNhe5OHX7H8kIjzEHgPCxCZj1kpZC9Edl9STxLUSwnY=
---
# Included widgets

vis and vis-2 come with five widget sets included. These are immediately available in the palette after installation and do not require any additional adapters.

| Sentence | Contents                                                          |
| -------- | ----------------------------------------------------------------- |
| `basic`  | Text, number, image, frame, navigation: the basic building blocks |
| `jqui`   | Buttons, input fields, selection lists, sliders, dialogs          |
| `jqplot` | a pointer instrument                                              |
| `swipe`  | Page switching via finger swipe and a carousel                    |
| `tabs`   | Riders within a view                                              |

This allows you to build a complete user interface. Only when you want something more visually appealing or specialized are the [widget sets](/docs/viz/widgetsets.md) from the adapter directory added.

The names of the building blocks are not translated and appear in English in the palette, even in a German interface. Therefore, this page refers to them as they appear there.

## basic

The phrase for anything that indicates a value or holds a page together.

### Numbers, text and time

|                                                                            | Widget                                       | Shows                                                       |
| -------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------- |
| ![Number](../../de/viz/media/widget_images/basic/Prev_ValueFloat.png)                   | `Number`                                     | a numerical value, with unit and selectable decimal place   |
| ![String](../../de/viz/media/widget_images/basic/Prev_ValueString.png)                  | `String`                                     | a string                                                    |
| ![String unescaped](../../de/viz/media/widget_images/basic/Prev_ValueStringRaw.png)     | `String (unescaped)`                         | the same, with the included HTML code also being displayed. |
| ![String img src](../../de/viz/media/widget_images/basic/Prev_ValueStringImg.png)       | `String img src`                             | an image whose address is in the data point                 |
| ![Input value](../../de/viz/media/widget_images/basic/Prev_ValueInput.png)              | `Input val`                                  | an input field that also writes the value                   |
| ![Timestamp](../../de/viz/media/widget_images/basic/Prev_ValueTimestamp.png)            | `Timestamp` ,`Timestamp Value` ,`TimesValue` | a timestamp in various formats                              |
| ![Last change](../../de/viz/media/widget_images/basic/Prev_ValueLastchange.png)         | `Last change Timestamp`                      | when the value last changed                                 |
| ![Value List](../../de/viz/media/widget_images/basic/Prev_ValueList.png)                | `ValueList Text`                             | one of several texts, depending on the value                |
| ![ValueList HTML](../../de/viz/media/widget_images/basic/Prev_ValueListHtml.png)        | `ValueList HTML`                             | the same, but with HTML instead of plain text               |
| ![ValueList HTML Style](../../de/viz/media/widget_images/basic/Prev_ValueListHtml8.png) | `ValueList HTML Style`                       | the same with its own CSS specification for each value      |

### Yes and no

|                                                                        | Widget                  | Shows                                                                              |
| ---------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| ![Bool HTML](../../de/viz/media/widget_images/basic/Prev_ValueBool.png)             | `Bool HTML`             | two different texts for true and false                                             |
| ![Bool HTML Control](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrl.png) | `Bool HTML` (switching) | the same, switches when the area is clicked                                        |
| ![Bool Checkbox](../../de/viz/media/widget_images/basic/Prev_ValueBoolCheckbox.png) | `Bool Checkbox`         | a checkbox that also switches                                                      |
| ![Bool Select](../../de/viz/media/widget_images/basic/Prev_ValueBoolSelect.png)     | `Bool Select`           | a drop-down menu with two entries                                                  |
| ![Bool SVG](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrlSvg.png)       | `Bool SVG`              | a drawing that sets a value when clicked                                           |
| ![AckFlag](../../de/viz/media/widget_images/basic/Prev_AckBool.png)                 | `AckFlag HTML`          | Whether the last value was confirmed; a troubleshooting tool                       |
| ![HTML State](../../de/viz/media/widget_images/basic/Prev_BasicState.png)           | `HTML State`            | a text that is at 0 or`false` It disappears completely; good for service messages. |

### Images, frames and external content

|                                                                 | Widget      | Shows                                       |
| --------------------------------------------------------------- | ----------- | ------------------------------------------- |
| ![HTML](../../de/viz/media/widget_images/basic/Prev_HTML.png)                | `HTML`      | any HTML code                               |
|                                                                 | `Svg shape` | a simple shape: circle, rectangle, line     |
| ![image](../../de/viz/media/widget_images/basic/Prev_Image.png)              | `Image`     | an image, optionally reloaded regularly     |
| ![Image 8](../../de/viz/media/widget_images/basic/Prev_StatefulImage.png)    | `Image 8`   | one of eight images, depending on its value |
| ![iFrame](../../de/viz/media/widget_images/basic/Prev_iFrame.png)            | `iFrame`    | a foreign website in the window             |
| ![iFrame 8](../../de/viz/media/widget_images/basic/Prev_StatefulIFrame8.png) | `iFrame 8`  | eight pages, switchable via a value         |
| ![Border](../../de/viz/media/widget_images/basic/Prev_tplFrame.png)          | `Border`    | a frame, optionally with a title bar        |
| ![note](../../de/viz/media/widget_images/basic/Prev_Note.png)                | `Note`      | a notepad                                   |
| ![Table](../../de/viz/media/widget_images/basic/Prev_TableBody.png)          | `Table`     | a table from a data point                   |

### Navigation and views

|                                                                                | Widget              | Does                                                                       |
| ------------------------------------------------------------------------------ | ------------------- | -------------------------------------------------------------------------- |
| ![link](../../de/viz/media/widget_images/basic/Prev_tplLink.png)                            | `link`              | makes the entire area a reference                                          |
| ![HTML navigation](../../de/viz/media/widget_images/basic/Prev_HTMLnavigation.png)          | `HTML navigation`   | switches to a different view, with a transition effect                     |
| ![View in widget](../../de/viz/media/widget_images/basic/Prev_ContainerView.png)            | `view in widget`    | embeds an entire view; the usual way to implement a shared navigation bar. |
| ![View in widget 8](../../de/viz/media/widget_images/basic/Prev_StatefulContainerView8.png) | `view in widget 8`  | displays one of eight views, depending on the value.                       |
|                                                                                | `Dialog`            | opens a view in a window                                                   |
| ![Filter dropdown](../../de/viz/media/widget_images/basic/Prev_FilterDropdown.png)          | `filter - dropdown` | Shows and hides widgets based on their filter term                         |

### Tools

|                                                                           | Widget              | Does                                                                               |
| ------------------------------------------------------------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| ![Full Screen](../../de/viz/media/widget_images/basic/Prev_FullScreen.png)             | `Full Screen`       | toggles the browser's full-screen mode                                             |
| ![Screen Resolution](../../de/viz/media/widget_images/basic/Prev_ScreenResolution.png) | `Screen Resolution` | Displays the screen size and names the appropriate view; only useful during setup. |
| ![HTML logout](../../de/viz/media/widget_images/basic/Prev_HtmlLogout.png)             | `HTML logout`       | logs the user out                                                                  |
| ![Gesture](../../de/viz/media/widget_images/basic/Prev_ValueGesture.png)               | `Gesture indicator` | displays recognized swipe gestures                                                 |

In **vis-2** , four building blocks are missing that were present in vis 1:`Red Number` ,`Bulb on/off` ,`Bar` and`Speech2Text` Anyone taking over an old project should ideally replace them with building blocks from [Material](/docs/viz/widgets-material.md) or [Collection](/docs/viz/widgets-collection.md) .

## jqui

This is the set of controls. Everything that is clicked, typed, or dragged is found here. The elements look like jQuery UI: simple and somewhat old-fashioned, but reliable.

### buttons

|                                                                      | Widget                              | Does                                                           |
| -------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------- |
| ![Button](../../de/viz/media/widget_images/jqui/Prev_Jqui_NavButton.PNG)          | `Button`                            | switches to a different view                                   |
| ![Button Icon](../../de/viz/media/widget_images/jqui/Prev_Jqui_NavButtonIcon.PNG) | `navigation - Icon`                 | the same as a symbol                                           |
| ![Button Pw](../../de/viz/media/widget_images/jqui/Prev_Jqui_NavButtonPW.PNG)     | `navigation - Pw`                   | the same, but only after entering a password.                  |
| ![Button State](../../de/viz/media/widget_images/jqui/Prev_Jqui_ButtonState.PNG)  | `Button State`                      | writes a fixed value to a data point                           |
| ![Button Link](../../de/viz/media/widget_images/jqui/Prev_Jqui_Link.PNG)          | `Button Link` ,`Button Link _blank` | opens an address, in the same or in a new window               |
| ![Icon link](../../de/viz/media/widget_images/jqui/Prev_Jqui_Iconlink.PNG)        | `Icon link`                         | the same as a symbol                                           |
| ![Icon HTTP GET](../../de/viz/media/widget_images/jqui/Prev_Jqui_UrlGet.PNG)      | `Icon HTTP GET`                     | Calls up an address in the background without leaving the page |

### Input

|                                                                           | Widget                      | Does                                           |
| ------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------- |
| ![Input](../../de/viz/media/widget_images/jqui/Prev_Jqui_Input.PNG)                    | `Input`                     | Text field, writes on every change             |
| ![Input + Set](../../de/viz/media/widget_images/jqui/Prev_Jqui_InputSet.PNG)           | `ctrl - Input + Set-Button` | Text field, only writes when button is pressed |
| ![Input Date](../../de/viz/media/widget_images/jqui/Prev_Jqui_ControlDate.PNG)         | `ctrl - Input Date`         | Date selection                                 |
| ![Input Datetime](../../de/viz/media/widget_images/jqui/Prev_Jqui_ControlDateTime.PNG) | `ctrl - Input Datetime`     | Date and time                                  |

### Select and control

|                                                                            | Widget                   | Does                                     |
| -------------------------------------------------------------------------- | ------------------------ | ---------------------------------------- |
| ![Bool](../../de/viz/media/widget_images/jqui/Prev_Jqui_Bool.PNG)                       | `Html Bool`              | displays and toggles a yes/no value.     |
| ![Icon Toggle](../../de/viz/media/widget_images/jqui/Prev_Jqui_IconToggle.PNG)          | `Icon Toggle`            | the same with two symbols                |
| ![radio](../../de/viz/media/widget_images/jqui/Prev_Jqui_RadioButton.PNG)               | `Radiobuttons on/off`    | two buttons for on and off               |
| ![Radio List](../../de/viz/media/widget_images/jqui/Prev_Jqui_RadioButtonList.PNG)      | `Radiobuttons ValueList` | One button per value from a list         |
| ![Radio 25%](../../de/viz/media/widget_images/jqui/Prev_Jqui_RadioButtonPercent.PNG)    | `Radiobuttons 25%`       | fixed levels 0, 25, 50, 75, 100          |
| ![Select](../../de/viz/media/widget_images/jqui/Prev_Jqui_SelectList.PNG)               | `Select ValueList`       | a drop-down menu for longer lists        |
| ![Slider](../../de/viz/media/widget_images/jqui/Prev_Jqui_SliderHorizontal.PNG)         | `Slider horizontal`      | Slider, horizontal                       |
| ![Vertical slider](../../de/viz/media/widget_images/jqui/Prev_Jqui_SliderVertical.PNG)  | `Slider vertical`        | Slider, vertical                         |
| ![Icon State](../../de/viz/media/widget_images/jqui/Prev_Jqui_ControlSetState.PNG)      | `ctrl - Icon State`      | Symbol that sets a value when clicked    |
| ![Icon Increment](../../de/viz/media/widget_images/jqui/Prev_Jqui_ControlIncrement.PNG) | `ctrl - Icon Increment`  | Symbol that changes a value by an amount |

### Dialogues

|                                                                                     | Widget                                     | Does                                |
| ----------------------------------------------------------------------------------- | ------------------------------------------ | ----------------------------------- |
| ![HTML Dialog](../../de/viz/media/widget_images/jqui/Prev_JquiDialog.png)                        | `HTML - Dialog`                            | opens a window with its own content |
| ![Icon Dialog](../../de/viz/media/widget_images/jqui/Prev_JquiIconDialog.png)                    | `Icon - Dialog`                            | the same, triggered via a symbol    |
| ![Container Dialog](../../de/viz/media/widget_images/jqui/Prev_ContainerDialog.png)              | `container - HTML - view in jqui Dialog`   | opens an entire view as a window    |
| ![Container Icon Dialog](../../de/viz/media/widget_images/jqui/Prev_ContainerIconDialog.png)     | `container - Icon - view in jqui Dialog`   | the same via a symbol               |
| ![Container Button Dialog](../../de/viz/media/widget_images/jqui/Prev_ContainerButtonDialog.png) | `container - Button - view in jqui Dialog` | the same via a button               |
| ![Close button](../../de/viz/media/widget_images/jqui/Prev_Jqui_ButtonClose.PNG)                 | `Button dialog close`                      | closes the open window              |

## jqplot

![MeterGauge](../../de/viz/media/widget_images/jqplot/Prev_MeterGauge.png)

A single widget,`MeterGauge` A pointer instrument with colored sections. For more options, there are separate sets; see [Pointer Instruments](/docs/viz/widgetsets.md) .

## swipe

|                                                          | Widget             | Does                                               |
| -------------------------------------------------------- | ------------------ | -------------------------------------------------- |
| ![Swipe](../../de/viz/media/widget_images/swipe/Prev_Swipe.png)       | `swipe Navigation` | Switches between views when you swipe your finger. |
| ![Carousel](../../de/viz/media/widget_images/swipe/Prev_Carousel.png) | `Carousel`         | shows several views in succession, like a carousel |

Both are primarily intended for telephones and wall tablets.

## tabs

A widget,`SliderTabs` : multiple views behind tabs, which can be switched between at the top.

## What applies to everyone

The settings that each of these widgets has (name, position, visibility, CSS, signals) are described under [Widget Settings](/docs/viz/widgets.md) .