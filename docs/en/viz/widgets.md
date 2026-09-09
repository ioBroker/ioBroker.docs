---
title: General widget settings
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/widgets.md
hash: 36otd1MGcdXoGB/vkMFZjXN4ibegrwYYh85+NxrwmYQ=
---
# General settings of a widget
A **widget** is a building block of a visualization: it displays a value, presents an image or a diagram, or accepts input. Widgets are used to assemble a user interface.

The widgets available depend on the widget set; those included are listed under [Widget sets](/docs/viz/basic.md) and the adjacent pages. This page describes the settings that **every** widget has, regardless of which set it comes from.

The images show the editor of vis. In **vis-2**, the fields have largely the same names, but the interface looks different. For new projects, vis-2 is the right choice, see [vis](/docs/viz/vis.md).

## Generally
![001_Widget_General](../../de/viz/media/vis_widgets_001_Widget_Generell.jpg)

| Attribute|Description|
|-----|----|

| Name|Enter a unique name for this widget here | Comment|Enter a short description here

| CSS Class | A custom CSS class to style the widget using the view's stylesheet. |
| Filter word | A keyword used to show or hide widgets in groups. |

| Show in Views | Here you can select whether this widget should appear only in the current view or in multiple views. |
| Inactive (locked) | Locks the widget in the editor to prevent accidental movement. |

## Visibility
The visibility of a widget can be made dependent on the state of a data point.

![002_Widget_Visibility](../../de/viz/media/vis_widgets-2_002_Widget_Sichtbarkeit.jpg)

| Attribute|Description|
|----|----|

| `Object ID`|Enter the ID of the data point that controls the visibility of the selected widget here. You can search for the data point using the button.

| Condition|The widget will be visible if the condition entered here for the data point mentioned above...

| Value for the condition|...matches the value entered here.

## The widget's own settings
![The section with the widget's own settings](../../de/viz/media/vis_widgets_003_Widget_Allgemein.jpg)

This section looks different for each widget and is described in the individual widget descriptions. The **Object ID** field is always present: this is used to assign the data point that the widget is to display or control.

The following sections apply to all widgets. They use CSS to determine how the widget looks.

## CSS in general
![](../../de/viz/media/vis_widgets_004_CSS_allgemein.jpg)

| Attribute|Description|
|-----|----|

| `left`|Distance from the left edge of the view | `top`|Distance from the top edge of the view | `width`|Width of the widget | `height`|Height of the widget | `z-index`|Specifies the layer in which the widget is located (0 = on the background, positive values = the higher the value, the further forward) | `overflow-y`|

| `overflow-y`|

| `opacity`|Transparency (0=opaque -> image invisible .. 1=transparent -> image visible) |

## CSS Font and Text
![005_CSS_Font_Text](../../de/viz/media/vis_widgets_005_CSS_Font_Text.jpg)

| Attribute|Description|
|-----|----|

| `color`|Font color (via selection dialog or color code) | `text-align`|Text alignment (left, right, center) | `text-shadow`|Text shadow color | `font-family`|Font | `font-style`|Character type (normal, italic, oblique, initial, inherited) | `font-variant`|Character variant (normal, small caps, ...) | `font-weight`|Character weight | `font-size`|Font size | `line-height`|Line spacing | `letter-spacing`|Character spacing | `word-spacing`|Word spacing

## CSS Background
![006_CSS_Background](../../de/viz/media/vis_widgets_006_CSS_Hintergrund.jpg)

| Attribute | Description |
|-----|-----|

| `background` |Several of the following properties can be specified together here | `-color` |Background color | `-image` |Background image | `-repeat` |Determines whether a background is repeated across the entire width and/or height of an element.

| `-attachement` |Determines whether a background image is fixed or scrolls | `-position` |Background image alignment (https://www.w3schools.com/cssref/pr_background-position.asp) | `-size` |Background image size | `-clip` |Controls overlap with the border | `-origin` |Image coordinate system origin

## CSS Frames
![007_CSS_Border](../../de/viz/media/vis_widgets_007_CSS_Border.jpg)

|Attribute|Description|
|----|----|
|`-width`|Border thickness| |
|`-color`|Border color|
|`-radius`|Corner radius of the border; can be at most half the shorter length of the widget|
|`-radius`|Corner radius of the border; can be at most half the shorter length of the widget|

| Attribute|Description|
|-----|----|

| `-width`|Border thickness | `-style`|Border line style | `-color`|Border color | `-radius`|Border corner radius; can be at most half the shorter length of the widget

## CSS Shadows and Spacing
![008_CSS_Shadow_Distance](../../de/viz/media/vis_widgets_008_CSS_Schatten_Abstand.jpg)

|Attribute|Description|
|----|----|
|`padding`|Offset from the edge of the widget box|
|`padding-top`|Offset on the top side|
|`padding-right`|Offset on the right side|
|`padding-bottom`|Offset on the bottom side|
|`box-shadow`|Color of the widget box shadow|
|`margin-top`|Top margin around the widget (auto, %, px, pt, cm)|
|`margin-right`|Right border around the widget|
|`margin-bottom`|Bottom border around the widget|
|`margin-left`|Left border around the widget|
|`margin-left`|Left margin around the widget|

| Attribute|Description|
|-----|----|

| `padding`|Offset from the edge of the widget box | `padding-left`|Offset on the left side | `padding-top`|Offset on the top side | `padding-right`|Offset on the right side | `padding-bottom`|Offset on the bottom side | `box-shadow`|Color of the widget box shadow | `margin-top`|Top border around the widget (auto, %, px, pt, cm) | `margin-right`|Right border around the widget | `margin-bottom`|Bottom border around the widget | `margin-left`|Left border around the widget