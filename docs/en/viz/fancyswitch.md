---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/fancyswitch.md
title: fancy switch
hash: n0p4vOCoNTExbz9aObBMSobY2hhSyFfbooJ5fUG/fVI=
---
# Fancy switch
This set represents a few switches that mostly work in the same way.
They represent Boolean states and can also switch them.

|Widgets | Images | Description |
|------------------------|-------|--------------|
|Switch light off/on | ![switch](../../de/viz/media/fancyswitch-1.png)|Light gray paddle shifter |
|Slider dark on/off | ![switch](../../de/viz/media/fancyswitch-3.png)|Slider with 'on'/'off' label |
|Slider dark on/off | ![switch](../../de/viz/media/fancyswitch-4.png)|Slider with 'off'/'on' label |
|Rocker dark on/off | ![switch](media/fancyswitch-5.png) ![switch](../../de/viz/media/fancyswitch-6.png)|Dark rocker switch with 'off'/'on' label; optionally also in light style |
|Giva Labs iButton | ![switch](../../de/viz/media/fancyswitch_givalabsibutton.png)| White slider with 'on'/'off' label |
|Taitem jqui toggle switch| ![switch](../../de/viz/media/fancyswitch_taitem.png)| White slider with 'on'/'off' label outside slider |
|Taitem jqui toggle switch| ![switch](../../de/viz/media/fancyswitch_taitem.png)| White slider with 'on'/'off' label outside slider |

## Description of properties
|Attribute|Description|Subject|
|----|----|---|
|ObjectId|Id of an object to be displayed that contains HTML|Switch, slider, pusher, seesaw |
|Invert|Invert switch state|Switch, slider, slide, rocker |
|false value|value corresponding to the false/off/off state|switch, slider, ram, seesaw |
|True value|Value corresponding to the false/off/off state|Switch, slider, ram, seesaw |
|Auto off|Represents a button function: after an adjustable time, the switch returns to its original state|Switch, slider, slide, rocker |
|Bright style|Brighter representation of the switch|Rocker dark on/off |
|Lever Size||Giva Labs iButton |
|Container Size||Giva Labs iButton |
|Drag allowed|Switch can be dragged (not just pressed)|Giva Labs iButton |
|Animation|Toggle is animated|Giva Labs iButton |
|Switch duration|Data point is switched only after a delay|Giva Labs iButton |
|Highlight switch|Sliding area of the switch is also displayed in color|Taitem jqui Toggleswitch |
|Widget width|Width of switch, independent of label|Taitem jqui Toggleswitch |
|Prepend html|HTML code to be rendered before the object|Taitem jqui Toggleswitch |
|Append Html|HTML code to be rendered after the object|Taitem jqui Toggleswitch |

**Example:** ![009](../../de/viz/media/fancyswitch_all.gif)