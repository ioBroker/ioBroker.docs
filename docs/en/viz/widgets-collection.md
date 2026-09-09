---
title: Collection widgets
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/widgets-collection.md
hash: U8hPiguwv5IWvh1M+LUHoyj/ru3OGLZ/XgPQ6ar1hvQ=
---
# Collection widgets for vis-2

Where [Material](/docs/viz/widgets-material.md) represents finished devices, such as thermostats, blinds, and vacuum cleaners, **Collection** provides the controls themselves: buttons, selection fields, sliders, and tables. This set is the obvious choice whenever a page needs something that isn't covered by a pre-made device widget.

One basic principle runs through all the building blocks: they don't ask for a fixed data type, but rather use whatever the data point provides. The same group of buttons operates a switch with`true` /`false` , an operating mode with the numbers 0 to 3 and a scene with text values.

The adapter is installed[`vis-2-widgets-collection`](/adapters/vis-2-widgets-collection) Then reload the editor. The building blocks will appear in the palette under **Collection** .

## The widgets

|                                                                          | Widget           | For what                                                                                                      |
| ------------------------------------------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| ![Switch](../../de/viz/media/widgets/vis-2-widgets-collection/switch.jpg)             | **Switch**       | A toggle switch for a yes/no value, labeled left or right.                                                    |
| ![Checkbox](../../de/viz/media/widgets/vis-2-widgets-collection/checkbox.jpg)         | **Checkbox**     | The same as a checkbox if it should be less conspicuous.                                                      |
| ![Button group](../../de/viz/media/widgets/vis-2-widgets-collection/button-group.jpg) | **Button group** | Several buttons next to each other, one of which remains pressed, for operating modes, window states, scenes. |
| ![Radio group](../../de/viz/media/widgets/vis-2-widgets-collection/radio-group.jpg)   | **Radio group**  | The same selection as a list with round buttons.                                                              |
| ![Selection](../../de/viz/media/widgets/vis-2-widgets-collection/select.jpg)          | **Selection**    | A drop-down menu for when the list of buttons becomes too long.                                               |
| ![slider](../../de/viz/media/widgets/vis-2-widgets-collection/slider.jpg)             | **slider**       | A numerical value between two boundaries, optionally horizontal or vertical, with step size and scale.        |
| ![input](../../de/viz/media/widgets/vis-2-widgets-collection/input.jpg)               | **input**        | A text field for strings and numbers, for example for target values or names.                                 |
| ![Gauge](../../de/viz/media/widgets/vis-2-widgets-collection/gauge.jpg)               | **Gauge**        | A pointer instrument or scale for a measured value, available in several designs.                             |
| ![Condition](../../de/viz/media/widgets/vis-2-widgets-collection/state.jpg)           | **Condition**    | Displays a value with its symbol, unit, and color, without changing it.                                       |
| ![Light](../../de/viz/media/widgets/vis-2-widgets-collection/light.jpg)               | **Light**        | Color wheel and brightness control for a lamp, significantly simpler than its material counterpart.           |
| ![JSON table](../../de/viz/media/widgets/vis-2-widgets-collection/json-table.jpg)     | **JSON table**   | Turns a data point containing a JSON list into a sortable table with page sheets.                             |
| ![dialog](../../de/viz/media/widgets/vis-2-widgets-collection/dialog.jpg)             | **dialog**       | Opens a different view as a window on top of the page.                                                        |

The thirteenth component, **Theme Configuration** , displays nothing. It sets the appearance of the entire project: colors, font, font sizes, line height, corner radii, and spacing. Anyone who wants to design a consistent look for a page without having to adjust each widget individually should place this widget on a view once and configure everything there.

## Things to pay attention to

**Value list.** For button, radio, and selection groups, the value corresponding to each label is entered manually. It's advisable to check the object tree beforehand to see which values the data point actually accepts.

**Writing direction.** All interactive widgets write without confirmation. For things where a mistake would be costly, such as gates and heating locks, the dialog with PIN verification is the better choice.

**The set is growing. The** collection is constantly being expanded; the list above reflects the status as of version 2.6. After an update, it's worth taking a look at the palette.