---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/fancyswitch.md
title: Fancyswitch
hash: DFXagUdr/ZV0Iv1rR8AXrE035qtjVkn9+FGKRExwK0M=
---
# Fancyswitch
This set represents some switches that mostly function in the same way.
They represent Boolean states and can also switch them.

|Widget | Image | Description |
|------------------------|-------|--------------|
|Switch light off/on | ![switch](../../de/viz/media/fancyswitch-1.png)|Light gray rocker switch |
|Slider dark on/off | ![switch](../../de/viz/media/fancyswitch-3.png)|Slider with 'on'/'off' label |
|Slider dark on/off | ![switch](../../de/viz/media/fancyswitch-4.png)|Slider with 'off'/'on' label |
|Dark rocker switch on/off | ![switch](media/fancyswitch-5.png) ![switch](../../de/viz/media/fancyswitch-6.png)|Dark rocker switch with 'off'/'on' label; optionally also in light style |
|Giva Labs iButton | ![switch](../../de/viz/media/fancyswitch_givalabsibutton.png)| White slider with 'on'/'off' label |
|Taitem jqui Toggleswitch| ![switch](../../de/viz/media/fancyswitch_taitem.png)| White slider with 'on'/'off' label outside the slider |
|Taitem jqui Toggleswitch| ![switch](../../de/viz/media/fancyswitch_taitem.png)| White slider with 'on'/'off' label outside the slider |

## Description of properties
|Attribute|Description|Subject|
|----|----|---|
|ObjectId|Id of an object to be displayed that contains HTML|Switch, Slider, Slider, Seesaw |
|Invert|Invert switching state|Switch, slider, slider, rocker |
|False value|Value that corresponds to the false/off state|Switch, slider, rocker |
|True value|Value that corresponds to the state false/off|Switch, slider, slider, rocker |
|Auto-Off|Represents button function: after an adjustable time the switch returns to its original state|Switch, slider, slide, rocker |
|Light style|Brighter display of the switch|Dark rocker switch off/on |
|Leverage Size||Giva Labs iButton |
|Container size||Giva Labs iButton |
|Dragging allowed|Switch can be dragged (not just pushed)|Giva Labs iButton |
|Animation|Switching is animated|Giva Labs iButton |
|Switch duration|Data point is only switched with a delay|Giva Labs iButton |
|Highlight switch|Sliding area of the switch is also shown in color|Taitem jqui Toggleswitch |
|Widget width|Width of the switch, independent of label|Taitem jqui Toggleswitch |
|Prepend html|HTML code to be displayed before the object|Taitem jqui Toggleswitch |
|Append HTML|HTML code to be displayed after the object|Taitem jqui Toggleswitch |

**Example:** ![009](../../de/viz/media/fancyswitch_all.gif)