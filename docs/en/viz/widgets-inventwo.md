---
title: inventwo widgets
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/widgets-inventwo.md
hash: jemMLB+WERz0oZodYG6XKuRi1RhWGaPLdjpi4ulOBTw=
---
# inventwo widgets

**inventwo Design** is a fully designed set with its own visual language: dark tiles, bold symbols, clean lines. It is one of the few sets from which an entire user interface can be built without adding anything else, and it has been continuously developed since 2020.

![inventwo](../../de/viz/media/widgets/vis-inventwo.jpg)

## Two adapters

| adapter                                                      | For                       | Status  |
| ------------------------------------------------------------ | ------------------------- | ------- |
| [`vis-2-widgets-inventwo`](/adapters/vis-2-widgets-inventwo) | vis-2, directly installed | 09/2026 |
| [`vis-inventwo`](/adapters/vis-inventwo)                     | vis 1; also runs in vis-2 | 06/2026 |

Both originate from jkvarel and are maintained. For **new projects in vis-2** ...`vis-2-widgets-inventwo` the right choice;`vis-inventwo` is the older, significantly more comprehensive set and still makes sense for existing pages.

## The widgets for vis-2

|                                                                                  | Widget                   | For what                                                                                                                                                             |
| -------------------------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Universal](../../de/viz/media/widgets/vis-2-widgets-inventwo/universal.jpg)                 | **Universal**            | The core component: switches, buttons, navigation, image, and display all in one building block. Its function is configured, not determined by the choice of widget. |
| ![Switch](../../de/viz/media/widgets/vis-2-widgets-inventwo/switch.jpg)                       | **Switching**            | A toggle switch in the inventwo style.                                                                                                                               |
| ![Checkbox](../../de/viz/media/widgets/vis-2-widgets-inventwo/checkbox.jpg)                   | **Checkbox**             | Checkbox for a yes/no value.                                                                                                                                         |
| ![slider](../../de/viz/media/widgets/vis-2-widgets-inventwo/slider.jpg)                       | **slider**               | Numerical value with heading, unit and separate color scheme for rail and handle.                                                                                    |
| ![Radial slider](../../de/viz/media/widgets/vis-2-widgets-inventwo/radial-slider.jpg)         | **Radial slider**        | The same value as a ring, for brightness or temperature.                                                                                                             |
| ![Dropdown](../../de/viz/media/widgets/vis-2-widgets-inventwo/dropdown.jpg)                   | **Dropdown**             | Drop-down menu for a value list.                                                                                                                                     |
| ![Value list](../../de/viz/media/widgets/vis-2-widgets-inventwo/value-list.jpg)               | **Value list**           | Turn text into a list: Choose separators, choose bullet points, skip empty entries.                                                                                  |
| ![Table](../../de/viz/media/widgets/vis-2-widgets-inventwo/table.jpg)                         | **Table**                | Sortable table from a JSON data point.                                                                                                                               |
|                                                                                  | **Running text**         | A continuous text for messages.                                                                                                                                      |
| ![calendar](../../de/viz/media/widgets/vis-2-widgets-inventwo/calendar.jpg)                   | **calendar**             | Monthly overview.                                                                                                                                                    |
| ![Appointment calendar](../../de/viz/media/widgets/vis-2-widgets-inventwo/event-calendar.jpg) | **Appointment calendar** | Appointments as a list, for example from the adapter`ical` .                                                                                                         |

## The sentence for vis 1

`vis-inventwo` It has around 27 building blocks. It has grown in two generations, and this is reflected in the product range: The older ones explicitly state that they **will no longer receive new functions** and that the newer ones should be used. The following are affected:`Switch` ,`Switch Small` ,`Button` ,`Button Small` ,`Navigation` ,`Navigation Small` ,`Background` ,`Background Small` and the old`Image` .

Her successor i&#x73;**`Universal`** He can do everything the nine of them could together, and he is cared for. In addition, there are...`Multi` ,`Grid` ,`Colorpicker` , the color sliders,`Simple Slider` horizontal and vertical,`JSON Table` ,`Value List` ,`Radiobutton List` ,`Checkbox/Radiobutton` and`Marquee` .

!> At`Marquee` The vis-1 sentence contains a warning in the palette that it does not work in all browsers. In vis-2, there is a new **scrolling text option** for this.

## Things to pay attention to

**Colors.** The design relies on its dark background. On a light-colored page, the tiles look out of place. If you're using inventwo, it's best to set the view to dark from the start.

Installing **both sets simultaneously** is possible, but rarely necessary, and each installed set is loaded when a page is opened.