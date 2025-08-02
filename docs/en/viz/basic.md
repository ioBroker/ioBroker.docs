---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/viz/basic.md
title: basic
hash: etbVpAzrbmCGhUSuLWHQsijZqnkLIrMzJzIHy4nh+sM=
---
# Basic
| Widget | Image | Description

| [`HTML`](#html-frame) | ![001](../../de/viz/media/widget_images/basic/Prev_HTML.png)|This widget displays arbitrary HTML code.|
| [`Svg Shape`](#svg-shape) | ![002](../../de/viz/media/widget_images/basic/Prev_Shape.png)|Represents a shape|
| [`iFrame`](#iframe) | ![003](../../de/viz/media/widget_images/basic/Prev_iFrame.png)|This widget embeds an iFrame|
| [`Image`](#image) | ![004](../../de/viz/media/widget_images/basic/Prev_Image.png)|This widget displays an image.|
| [`Link`](#link) | ![005](../../de/viz/media/widget_images/basic/Prev_tplLink.png)|This widget corresponds to the widget "static - HTML" but is also a clickable link across its entire surface. Can be used for navigation between views or for external links.|
| [`Border`](#border) | ![006](../../de/viz/media/widget_images/basic/Prev_tplFrame.png)|Represents a frame, optionally with title and title bar|
| [`iFrame8`](#iframe8) | ![007](../../de/viz/media/widget_images/basic/Prev_StatefulIFrame8.png)|Displays up to 8 images in iFrames|
| [`View in widget`](#view-in-widget) | ![008](../../de/viz/media/widget_images/basic/Prev_ContainerView.png)|This widget can display views within views. Useful, for example, for navigation: You build a view with navigation elements and then integrate them into as many other views as you like.|
| [`view in widget 8`](#view-in-widget-8)] | ![009](../../de/viz/media/widget_images/basic/Prev_StatefulContainerView8.png)|Displays one of 8 views depending on a state.|
| `Image 8` | ![010](../../de/viz/media/widget_images/basic/Prev_StatefulImage.png)|Displays one of 8 images depending on a state.|
| [`HTML navigation`](#html-navigation) | ![011](../../de/viz/media/widget_images/basic/Prev_HTMLnavigation.png)|This widget is used to create navigation between the views. It corresponds to the "static - link" widget, but can only be used for navigation between the views and also offers the option of using animated effects when changing views.|
| [`filter - dropdown`](#filter-dropdown) | ![012](../../de/viz/media/widget_images/basic/Prev_FilterDropdown.png)||
| [`Number`](#number) | ![013](../../de/viz/media/widget_images/basic/Prev_ValueFloat.png)|This widget displays a numerical value|
| [`String`](#string) | ![014](../../de/viz/media/widget_images/basic/Prev_ValueString.png)|This widget represents a data point of type string.|
| [`String (unescaped)`](#string--unescpaped-) | ![015](../../de/viz/media/widget_images/basic/Prev_ValueStringRaw.png)|This widget represents a data point of the string type. Unlike the widget "hm_val - String", no special characters are "escaped" - i.e. the variable can also contain HTML code and this will then be displayed.|
| [`String img src`](#string-img-src) | ![016](../../de/viz/media/widget_images/basic/Prev_ValueStringImg.png)|This widget can be assigned a variable of type string, a URL contained therein is then displayed as an image|
| `Timestamp` | ![017](../../de/viz/media/widget_images/basic/Prev_ValueTimestamp.png)||
| [`Last change Timestamp`](#last-change-timestamp) | ![018](../../de/viz/media/widget_images/basic/Prev_ValueLastchange.png)||
| [`ValueList Text`](#valuelist-text) | ![019](../../de/viz/media/widget_images/basic/Prev_ValueList.png)|This widget represents a variable of type list of values.|
| [`ValueList HTML`](#valuelist-html) | ![020](../../de/viz/media/widget_images/basic/Prev_ValueListHtml.png)|This widget represents a variable of the type value list. Corresponds to the widget "hm_val - ValueList Text, but is not "escaped", i.e. HTML code can be entered in valuelist.|
| [`ValueList HTML Style`](#valuelist-html-8) | ![021](../../de/viz/media/widget_images/basic/Prev_ValueListHtml8.png)|This widget represents a variable of the type value list. Corresponds to the widget "hm_val - ValueList HTML, but offers the possibility of using 8 different CSS specifications for 8 different values (0-7).|
| [`Bool HTML`](#bool-html) | ![022](../../de/viz/media/widget_images/basic/Prev_ValueBool.png)|This widget displays bool values.|
| `AckFlag HTML` | ![023](../../de/viz/media/widget_images/basic/Prev_AckBool.png)||
| [`Bool Checkbox`](#bool-checkbox) | ![024](../../de/viz/media/widget_images/basic/Prev_ValueBoolCheckbox.png)|This widget displays boolean values as a simple checkbox and also allows you to toggle the value.|
| [`Bool Select`](#bool-select) | ![025](../../de/viz/media/widget_images/basic/Prev_ValueBoolSelect.png)|This widget displays boolean values as a dropdown and also allows you to toggle the value.|
| [`Bool HTML Control`](#bool-html-control) | ![026](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrl.png)|This widget displays boolean values and also allows the value to be toggled on click within the widget area.|
| [`Bool SVG`](#bool-svg) | ![027](../../de/viz/media/widget_images/basic/Prev_ValueBoolCtrlSvg.png)|This widget sets a value when clicked within the widget area.|
| [`HTML State`](#html-state) | ![028](../../de/viz/media/widget_images/basic/Prev_BasicState.png)|This widget disappears if the value of the assigned data point is 0 or false. Useful, for example, for displaying service messages.|
| [`Red Number`](#hide-on-0-false) | ![029](../../de/viz/media/widget_images/basic/Prev_RedNumber.png)|Displays a numeric value in the style of the iOS notification icons. Disappears when the value is 0.|
| [`Bulb on/off`](#bulb-on-off) | ![030](../../de/viz/media/widget_images/basic/Prev_BulbOnOffCtrl.png)|This widget displays a value as an off or lit light bulb on a black background. Can be used for bool and float values (dimmer).|
| [`Bulb on/off control`](#bulb-on-off-control)| ![030](../../de/viz/media/widget_images/basic/Prev_BulbOnOffCtrl.png)|This widget displays a value as an off or lit light bulb on a black background. Can be used for bool and float values (dimmer).|
| [`Bar`](#bar-horizontal) | ![031](../../de/viz/media/widget_images/basic/Prev_ValueFloatBar.png)|This widget displays a value from 0-100 as a horizontal bar.|
| `Note` | ![032](../../de/viz/media/widget_images/basic/Prev_Note.png)||
| `json Table` | ![033](../../de/viz/media/widget_images/basic/Prev_TableBody.png)||
| `HTML logout` | ![034](../../de/viz/media/widget_images/basic/Prev_HtmlLogout.png)||
| `Gesture indicator` | ![035](../../de/viz/media/widget_images/basic/Prev_ValueGesture.png)||
| `Speech to text` | ![036](../../de/viz/media/widget_images/basic/Prev_Speech2Text.png)||
| `Full Screen` | ![037](../../de/viz/media/widget_images/basic/Prev_FullScreen.png)||
| `Screen Resolution` | ![038](../../de/viz/media/widget_images/basic/Prev_ScreenResolution.png)||
| `Screen Resolution` | ![038](../../de/viz/media/widget_images/basic/Prev_ScreenResolution.png)||

### Html Frame
This widget displays any HTML code. It is also possible to use Javascript within the widget.

| Attribute|Description|
|-----|----|
| `ObjectId`|Id of an object to be displayed that contains HTML|
| Prepend html|HTML code to be displayed before the object|
| Append HTML|HTML code to be displayed after the object|

**Example:** ![](../../de/viz/media/widget_images/basic/Explanation/html.png)

### SVG Shape
This widget simply represents a geometric shape, with some shapes predefined.

| Attribute|Description|
|-----|----|
| Type|geometric shape|
| Line color|Shape border color|
| Fill color|Fill color|
| Line width ||
| Rotate|Angle of rotation starting from initial position in degrees|
| Width Scale|Scales the width between 0 and 100%|
| Height scale|Scales the height between 0 and 100%|

**Example:** ![](../../de/viz/media/widget_images/basic/Explanation/svg.gif)

### IFrame
Displays an iFrame

| Attribute|Description|
|-----|----|
| Source|Path to the source (website, image); this can be defined locally or via URL|
| No sandbox|:construction:|
| Update time|:construction:|
| Update on waking|:construction:|
| Update when changing view|:construction:|
| Do not add to URL|:construction:|
| Scroll X|:construction:|
| Scroll Y|:construction:|
| No frame|:construction:|

**Example:** ![](../../de/viz/media/widget_images/basic/Explanation/iframe.gif)

### Image
This widget displays an image.

| Attribute|Description|
|-----|----|
| Source|Path to the source in the local file system|
| Stretch|Fit image to frame dimensions|
| Update time|:construction:|
| Update on waking|:construction:|
| Update when changing view|:construction:|
| Do not add to URL|:construction:|
| Allow user interactions|:construction:|

**Example:** ![](../../de/viz/media/widget_images/basic/Explanation/image.gif)

### Link
This widget is similar to the "HTML Frame" widget, but is also a clickable link across its entire surface. Can be used for navigation between views or for external links.

| Attribute|Description|
|-----|----|

| `html`|Self-explanatory ;) ...insert the HTML code for the formatted display of text here.
| `link`|The link URL. To use a link to another view, simply enter the view name preceded by the hash symbol (#) | `target`|The target of the link. Leave blank to stay in the same browser window; if you want to open a new window, enter _blank. Other options: _self (same tab), _parent (), _top ()

**Example:** ![](../../de/viz/media/widget_images/basic/Explanation/link.gif)

### Border
This widget simply displays a frame - no other function, just text and color. This can be used to group widgets.

| Attribute|Description|
|-----|----|

| Title|Self-explanatory | top label font|title font | top label color|title color | title background|title text background color | title top offset|title distance from top edge | title left offset|title distance from left edge | header height|height of a bar from top edge | header color|bar color

**Example:** ![](../../de/viz/media/widget_images/basic/Explanation/border.gif)

### View in widget 8
Displays one of 8 views depending on a state.

| Attribute|Description|
|-----|----|

| `persistent`|Views that have been rendered once are no longer removed from the DOM

### IFrame 8
Displays one of 8 iFrames depending on a state.

### HTML navigation
This widget is used to create navigation between the views. It corresponds to the "static - link" widget, but can only be used for navigation between the views and also offers the option of using animated effects when changing views.

| Attribute|Description|
|-----|----|

| `html`|Self-explanatory ;) ...insert the HTML code here | `nav_view`|The name of the view to which you want to navigate must be entered here | `hide_effect`|The name of a jQueryUI effect that is used when leaving the view can be entered here. Available effects are: Blind, Bounce, Clip, Drop, Explode, Fade, Fold, Highlight, Puff, Pulsate, Scale, Shake, Size, Slide and Transfer.
| `hide_duration`|Duration of the effect in ms | `show_effect`|see above, the same - but this time for the new view to be displayed | `show_duration`|See above, time in ms for the new view to be displayed

### Filter - dropdown
### Number
This widget displays a numeric value (can be used for both integer and float)

| Attribute|Description|
|-----|----|

| `html_prepend`|Text or HTML code that is displayed before the numerical value | `html_append`|Text or HTML code that is displayed after the numerical value | `digits`|Number of decimal places displayed | `factor`|Factor by which the numerical value is multiplied

### String
This widget represents a data point of type string.

| Attribute|Description|
|-----|----|

| `html_prepend`|Text or HTML code that is displayed before the string.
| `html_append`|Text or HTML code that is displayed after the string.

### String (unescaped)
This widget represents a data point of the string type. In contrast to the widget "hm_val - String", no special characters are "escaped" - i.e. the variable can also contain HTML code and this will then be displayed.

| Attribute|Description|
|-----|----|

| html_prepend|Text or HTML code that is displayed before the string.
| html_append|Text or HTML code that is displayed after the string.

### String img src
A variable of type string can be assigned to this widget; a URL contained therein is then displayed as an image.

| Attribute|Description|
|-----|----|

| `html_prepend`|Text or HTML code that is displayed before the image.
| `html_append`|Text or HTML code that is displayed behind the image.

### Last change timestamp
Displays the last timestamp of the connected state.

### ValueList Text
This widget represents a variable of type list of values.

| Attribute|Description|
|-----|----|

| `valuelist`|A semicolon-separated list of texts for the respective values.
| `html_prepend`|Text or HTML code that is displayed before the image.
| `html_append`|Text or HTML code that is displayed after the image.

### ValueList HTML
This widget represents a variable of the value list type. Corresponds to the widget "hm_val - ValueList Text, but it is not "escaped", i.e. HTML code can be entered in valuelist.

| Attribute|Description|
|-----|----|

| `valuelist`|A semicolon-separated list of HTML code for the respective values.
| `html_prepend`|Text or HTML code to be displayed before the image.
| `html_append`|Text or HTML code to be displayed after the image.

### ValueList HTML 8
This widget represents a variable of the type value list. Corresponds to the widget "ValueList HTML, but offers the possibility to use 8 different CSS specifications for 8 different values (0-7).

| Attribute|Description|
|-----|----|

| `html_append`|Text or HTML code that is displayed behind the image|

| `html_append`|Text or HTML code that is displayed behind the image|
| value0 to value7|Text or HTML code for the values 0 to 7 | style0 to style7|CSS information for the values 0 to 7 |

### Bool HTML
This widget displays boolean values.

| Attribute|Description|
|-----|----|

| `html_prepend`|Text or HTML code that is displayed before the image.
| `html_append`|Text or HTML code that is displayed behind the image.
| `html_true`|Text or HTML code that is displayed in the True case.
| `html_false`|Text or HTML code that is displayed in the False case.

### Bool Checkbox
This widget displays boolean values as a simple checkbox and also allows to toggle the value.

| Attribute|Description|
|-----|----|

| `html_prepend`|Text or HTML code that is displayed before the checkbox.
| `html_append`|Text or HTML code that is displayed behind the checkbox.

### Bool Select
This widget displays boolean values as a dropdown and also allows to toggle the value.

| Attribute|Description|
|-----|----|

| `html_prepend`|Text or HTML code that is displayed before the image.
| `html_append`|Text or HTML code that is displayed behind the image.
| `text_true`|Text for the true case | `text_false`|Text for the false case

### Bool HTML Control
This widget displays boolean values and also allows to toggle the value on click within the widget area.

| Attribute|Description|
|-----|----|

| `html_prepend`|Text or HTML code that is displayed before the image.
| `html_append`|Text or HTML code that is displayed behind the image.
| `text_true`|Text for the true case | `text_false`|Text for the false case

### Bool SVG
### HTML State
This widget sets a value when clicked within the widget area.

| Attribute|Description|
|-----|----|

| `html`|Text or HTML code to be displayed | `value`|Value to be set

### Hide on 0/false
This widget disappears when the value of the assigned data point is 0 or false. Useful, for example, for displaying service messages

### Red Number
Displays a numeric value in the style of iOS notification icons. Disappears when the value is 0.

### Bulb on/off
This widget displays a value as an off or lit light bulb on a black background. Can be used for bool and float values (dimmer).

### Bulb on/off
This widget displays a value as an off or lit light bulb on a black background. Clicking on the widget toggles the value.

### Twist grip
This widget represents a rotary handle sensor with the original Homematic icons.

### TFK
This widget represents a door/window contact with the original Homematic icons.

### Bar Horizontal
This widget displays a value from 0-100 as a horizontal bar.

| Attribute|Description|
|-----|----|

| `factor`|Factor by which the value is multiplied. Example: for a dimmer (which goes from 0.00 to 1.00) 100 must be entered.
| `color`|CSS property background-color of the bar | `border`|CSS property border of the bar | `shadow`|CSS property box-shadow of the bar | `reverse`|If true is entered here, the bar is displayed from right to left instead of left to right.

### Bar Vertical
Corresponds to the widget "hm_val - Bar Horizontal, but vertical instead of horizontal.

| Attribute|Description|
|-----|----|

| `factor`|Factor by which the value is multiplied. Example: for a dimmer (which goes from 0.00 to 1.00) 100 must be entered.
| `color`|CSS property background-color of the bar | `border`|CSS property border of the bar | `shadow`|CSS property box-shadow of the bar | `reverse`|If true is entered here, the bar is displayed from bottom to top instead of top to bottom