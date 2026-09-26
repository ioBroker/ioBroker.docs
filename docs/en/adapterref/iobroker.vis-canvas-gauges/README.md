---
chapters: {"pages":{"en/adapterref/iobroker.vis-canvas-gauges/README.md":{"title":{"en":"ioBroker.vis-canvas-gauges"},"content":"en/adapterref/iobroker.vis-canvas-gauges/README.md"},"en/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md":{"title":{"en":"Canvas gauges for vis-2"},"content":"en/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md"}}}
---
![Logo](admin/vis-canvas-gauges.png)
# ioBroker.vis-canvas-gauges

![Logo](img/logo.svg)

![Number of Installations](http://iobroker.live/badges/vis-canvas-gauges-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-canvas-gauges-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vis-canvas-gauges.svg)](https://www.npmjs.com/package/iobroker.vis-canvas-gauges)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-canvas-gauges.svg)](https://www.npmjs.com/package/iobroker.vis-canvas-gauges)

[![NPM](https://nodei.co/npm/iobroker.vis-canvas-gauges.png?downloads=true)](https://nodei.co/npm/iobroker.vis-canvas-gauges/)

canvas-gauges - Canvas gauges for [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) and
[ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2)
![Example](img/widgets.png)

Very detailed canvas library from Mikhus is used in this widget set. Thank you Mikhus.

You can find description of used library here: [https://canvas-gauges.com](https://canvas-gauges.com)

And on GitHub [here](https://github.com/Mikhus/canvas-gauges)

## vis and vis-2

The adapter ships every widget twice:

- **vis (vis-1)** uses the EJS/jQuery widget set in `widgets/canvas-gauges.html`.
- **vis-2** uses the React widget set in `widgets/vis-2-widgets-canvas-gauges/`, built from `src-widgets/`.

Both declare the same widget ids (`tplCGlinearGauge`, `tplCGradialGauge`, `tplCGCompas`, `tplCGflatGauge`) and the
same attribute names, and vis-2 prefers a React widget over an EJS one. So a project made with vis keeps working
after switching to vis-2 - the widgets simply render with the React implementation, without jQuery.

The progress bar (`tplCGprogress`) was added for vis-2 and has no counterpart in the vis-1 set.

The React widgets need vis-2 2.12.8 or newer. With an older vis-2 the EJS widgets are used.

## Documentation

Every widget with its settings and screenshots: [English](/#/docs/adapterref/iobroker.vis-canvas-gauges/docs/en/README.md) | [Deutsch](https://github.com/ioBroker/ioBroker.vis-canvas-gauges/blob/master/docs/de/README.md)

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) All four widgets were ported to vis-2 as React widgets, without jQuery
* (bluefox) Added the widget "Progress" - a plain bar for a battery, a tank or a humidity (vis-2 only)
* (bluefox) The widgets follow the dark theme of vis-2: plate, scale, texts, rings and the track of the bar adapt, while the needle and the colour of the bar keep their meaning. Widgets placed before this version keep their look
* (bluefox) Added the settings of the library that the vis-1 widgets never offered: section width and section ends of the highlights, exact ticks, numbers margin, stroke colour of the ticks, width of the value box and the shadow of the bar
* (bluefox) The vis-2 palette shows a sharp preview and a short description for every widget
* (bluefox) Added documentation for every vis-2 widget with screenshots (English and German)
* (bluefox) The labels of the widget settings are translated properly now, in eleven languages
* (bluefox) "Padding" of the bar ticks is applied to the ticks now instead of the round end of the bar
* (bluefox) "Value weight" changes the weight of the value now instead of the font family of the scale
* (bluefox) The scale keeps its last label if the step does not divide the range without a rounding error
* (bluefox) A state that has no value yet when the view opens is subscribed now, so the gauge follows it
* (bluefox) "Major ticks" is a text field in every widget now, so a list of labels can be used everywhere
* (bluefox) The default needle type of the radial gauge is "arrow" instead of the unused word "select"
* (bluefox) Removed the vis dependency and replaced it with a message by installation or update if neither vis nor vis-2 is installed

### 1.0.1 (2022-09-05)
* (oweitman) Added workaround for firefox canvas problem

### 0.1.5 (2016-11-24)
* (bluefox) do not scan DOM at start

### 0.1.4 (2016-11-18)
* (bluefox) fix destroy of widgets

### 0.1.3 (2016-10-06)
* (bluefox) fix highlights if min not zero

### 0.1.2 (2016-09-30)
* (bluefox) translate english

### 0.1.0 (2016-09-26)
* (bluefox) initial checkin

## License
 Copyright (c) 2016-2026 bluefox https://github.com/GermanBluefox
 MIT