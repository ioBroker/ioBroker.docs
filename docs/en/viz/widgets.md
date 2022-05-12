---
title: widgets
lastChanged: 11.08.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/widgets.md
hash: beLY0bKf2v2bHfNEpPQQjde4CBBS7s9c5jyaH3r9Z2o=
---
# Widgets
## As a general rule
In this context, widgets ('device, thing') are display elements that display numbers, text, images or diagrams in various ways and offer interaction options.

## IoBroker.vis Widgets
There are different widget sets for visualization in ioBroker with vis.

-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

### The basic settings of widgets
#### As a general rule
![001_Widget_General](../../de/viz/media/vis_widgets_001_Widget_Generell.jpg)

| attribute|description|
|-----|----|

| Name|A unique name for this widget can be entered here | Comment|You can enter a short description here | CSS class|:construction: | filter word|:construction: | Show in Views|Here you can select whether this widget should only appear in the current view or in several.
| Inactive (locked)|:construction:

#### **Visibility**
The visibility of a widget can be made dependent on the state of a data point.
![002_Widget_Visibility](../../de/viz/media/vis_widgets-2_002_Widget_Sichtbarkeit.jpg)

| attribute|description|
|----|----|

| `Object ID`|The ID of the data point that is to control the visibility of the selected widget is entered here. The data point can be searched for using the button.
| Condition|The widget is visible if the condition entered here for the above data point...
| Value for the condition|...equals the value entered here.

#### **General**
![](../../de/viz/media/vis_widgets_003_Widget_Allgemein.jpg) The 'General' section is specific to each widget and is described in more detail for each widget.
In this section, the desired data point is assigned to the widget in the Object ID field.

*** The **CSS settings** of the widget can be found in the following menu items and can be adjusted to your own requirements:

#### **CSS general**
![](../../de/viz/media/vis_widgets_004_CSS_allgemein.jpg)

| attribute|description|
|-----|----|

| `left`|Distance from the left edge of the view | `top`|Distance from the top of the view | `width`|Width of the widget | `height`|Widget height | `z-index`|Indication of the level in which the widget is located (0= on the background, positive values= the higher the value, the closer to the front) | `overflow-y`|

| `overflow-y`|
| `opacity`|Transparency (0=opaque ->image invisible .. 1=transparent ->image visible) |

#### CSS Font & Text
![005_CSS_Font_Text](../../de/viz/media/vis_widgets_005_CSS_Font_Text.jpg)

| attribute|description|
|-----|----|

| `color`|Font color (via selection dialog or color code) | `text-align`|justification of the text (left, right, centered) | `text-shadow`|Text shadow color | `font-family`|Font | `font-style`|Character set type (normal, italic, oblique, initial, inherit) | `font-variant`|Character set variant (normal, small caps, ...) | `font-weight`|Font Strength | `font-size`|Font size | `line-height`|Line spacing | `letter-spacing`|Character spacing | `word-spacing`|Word spacing

#### **CSS Background**
![006_CSS_Background](../../de/viz/media/vis_widgets_006_CSS_Hintergrund.jpg)

| attribute | Description |
|-----|-----|

| `background` |Several of the following properties can be specified here | `-color` |Background color | `-image` |Background image | `-repeat` |Determines whether a background is repeated over the entire width and/or height of an element.
| `-attachement` |Determines whether a background image is fixed or is moved when scrolling | `-position` |Background image orientation (https://www.w3schools.com/cssref/pr_background-position.asp) | `-size` |Background image size | `-clip` |Controls the intersection with the border | `-origin` |Coordinate system origin for image coordinates

#### **CSS Border**
![007_CSS_Border](../../de/viz/media/vis_widgets_007_CSS_Border.jpg)

|Attribute|Description|
|----|----|
|`-width`|Border thickness| |
|`-color`|Border color|
|`-radius`|corner radius of border; can be at most half of the shorter distance of the widget|
|`-radius`|corner radius of border; can be at most half of the shorter distance of the widget|

| attribute|description|
|-----|----|

| `-width`|Border thickness | `-style`|Line style of border | `-color`|Border color | `-radius`|corner radius of border; can be at most half of the shorter distance of the widget

#### CSS shadow and spacing
![008_CSS_shadow_distance](../../de/viz/media/vis_widgets_008_CSS_Schatten_Abstand.jpg)

|Attribute|Description|
|----|----|
|`padding`|Offset from widget box edge|
|`padding-top`|Offset on the top side|
|`padding-right`|Offset on the right side|
|`padding-bottom`|Offset on the bottom side|
|`box-shadow`|Color of the shadow of the widget box|
|`margin-top`|Top margin around widget (auto, %, px, pt, cm)|
|`margin-right`|Right border around the widget|
|`margin-bottom`|Bottom border around the widget|
|`margin-left`|Left border around the widget|
|`margin-left`|Left margin around widget|

| attribute|description|
|-----|----|

| `padding`|Offset from edge of widget box | `padding-left`|Offset on the left | `padding-top`|Offset on top side | `padding-right`|Offset on the right side | `padding-bottom`|Offset on the bottom side | `box-shadow`|Widget box shadow color | `margin-top`|Top margin around widget (auto, %, px, pt, cm) | `margin-right`|Right border around the widget | `margin-bottom`|Bottom border around the widget | `margin-left`|Left border around the widget