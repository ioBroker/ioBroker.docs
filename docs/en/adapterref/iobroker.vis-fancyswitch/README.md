---
chapters: {"pages":{"en/adapterref/iobroker.vis-fancyswitch/README.md":{"title":{"en":"ioBroker.vis-fancyswitch"},"content":"en/adapterref/iobroker.vis-fancyswitch/README.md"},"en/adapterref/iobroker.vis-fancyswitch/docs/en/README.md":{"title":{"en":"fancyswitch for vis-2"},"content":"en/adapterref/iobroker.vis-fancyswitch/docs/en/README.md"}}}
---
![Logo](admin/fancyswitch.svg)

# ioBroker.vis-fancyswitch

![Number of Installations](http://iobroker.live/badges/vis-fancyswitch-installed.svg) ![Number of Installations](http://iobroker.live/badges/vis-fancyswitch-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.vis-fancyswitch.svg)](https://www.npmjs.com/package/iobroker.vis-fancyswitch)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vis-fancyswitch.svg)](https://www.npmjs.com/package/iobroker.vis-fancyswitch)

[![NPM](https://nodei.co/npm/iobroker.vis-fancyswitch.png?downloads=true)](https://nodei.co/npm/iobroker.vis-fancyswitch/)

`fancyswitch` - switch, slider and rocker widgets for [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis)
and [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2), ported from
http://papermashup.com/jquery-fancy-switch/ by @ashleyford.

![Example](img/widgets.svg)

## vis and vis-2

The adapter ships every widget twice:

- **vis (vis-1)** uses the EJS/jQuery widget set in `widgets/fancyswitch.html`.
- **vis-2** uses the React widget set in `widgets/vis-2-widgets-fancyswitch/`, built from `src-widgets/`.

Both declare the same widget ids (`tplFancySwitch1`, `tplFancyGivaIButton`, …) and the same attribute names, and
vis-2 prefers a React widget over an EJS one. So a project made with vis keeps working after switching to
vis-2 - the widgets simply render with the React implementation, without jQuery, jQuery UI or the iButton
plug-in.

The React widgets need vis-2 2.12.8 or newer. With an older vis-2 the EJS widgets are used.

## Everything is drawn, nothing is a bitmap

The widget set used to ship nine PNGs. They are all generated as SVG now, from a single source
(`src-widgets/src/Components/fancyArt.ts`): the sprites the vis-1 set loads, the previews of the vis-2 palette,
the pictures of this documentation and the adapter icon. `npm run assets` writes them again after a change.

The vis-2 widgets draw the same artwork inline and scale it with the widget, so a switch stays sharp at any
size - and the labels that used to be burnt into the images (`OFF`/`ON`, `AUS`/`EIN`) are settings now.

## Documentation

Every widget with its settings: [English](/#/docs/adapterref/iobroker.vis-fancyswitch/docs/en/README.md) | [Deutsch](https://github.com/ioBroker/ioBroker.vis-fancyswitch/blob/master/docs/de/README.md)

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**

- (bluefox) All widgets were ported to vis-2 as React widgets, without jQuery, jQuery UI or the iButton plug-in
- (bluefox) All images are SVG now and are generated from one source, so the switches stay sharp at any size
- (bluefox) The labels of the switches (`OFF`/`ON`, `AUS`/`EIN`) can be changed - they used to be part of the image
- (bluefox) The switches move when they switch: the sliders slide over with knob and labels together, like a real
  sliding switch, and the rockers tip over through their middle position
- (bluefox) A boolean state is recognized as "on" again when "True value" is left at its default of `1`
- (bluefox) In "Schieber dunkel Ein/Aus" the halves now switch to the state their label shows; clicking `EIN`
  switched off before
- (bluefox) The toggle switch follows the theme of vis-2 and no longer needs the jQuery UI stylesheet; its
  coloured part grows towards "on" instead of being full while the switch is off
- (bluefox) All widgets offer "Read only"
- (bluefox) The widget palette of vis-2 shows a preview and a short description for every widget
- (bluefox) Added documentation for every widget (English and German)
- (bluefox) Added the settings of the widgets in eleven languages
- (bluefox) The adapter icon is an SVG now
- (bluefox) Replaced Grunt and Travis CI with GitHub Actions, ESLint, Prettier and the ioBroker release script

### 1.1.0 (2016-07-17)

- (Apollon77) Enhance handling of boolean and textual values for on/off

### 1.0.0 (2016-04-07)

- (bluefox) fix button Giva Labs iButton (other widgets did not work)

### 0.0.3 (2015-10-04)

- (bluefox) add version output

### 0.0.2 (2015-10-04)

- (bluefox) fix dependencies

### 0.0.1 (2015-10-04)

- (bluefox) initial checkin

## License

Copyright (c) 2013-2026 hobbyquaker https://github.com/hobbyquaker, bluefox https://github.com/GermanBluefox

Apache 2.0

The Giva Labs iButton plug-in of the vis-1 widget set is Copyright 2011 Giva, Inc.
(http://www.givainc.com/labs/), Apache 2.0.