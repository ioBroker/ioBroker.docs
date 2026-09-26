---
chapters: {"pages":{"en/adapterref/iobroker.vis-fancyswitch/README.md":{"title":{"en":"ioBroker.vis-fancyswitch"},"content":"en/adapterref/iobroker.vis-fancyswitch/README.md"},"en/adapterref/iobroker.vis-fancyswitch/docs/en/README.md":{"title":{"en":"fancyswitch for vis-2"},"content":"en/adapterref/iobroker.vis-fancyswitch/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-fancyswitch/README.md
title: ioBroker.vis-fancyswitch
hash: mEuaXmSfaDTGwD8geY/QYrqz2qY7oiXQeuH2JqxasUE=
---
![Logo](../../../en/adapterref/iobroker.vis-fancyswitch/admin/fancyswitch.svg)

![Anzahl der Installationen](http://iobroker.live/badges/vis-fancyswitch-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-fancyswitch.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-fancyswitch.svg)
![NPM](https://nodei.co/npm/iobroker.vis-fancyswitch.png?downloads=true)

# ioBroker.vis-fancyswitch

`fancyswitch` - Schalter-, Schieberegler- und Wippschalter-Widgets für [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis) und [ioBroker.vis-2](https://github.com/ioBroker/ioBroker.vis-2) , portiert von <http://papermashup.com/jquery-fancy-switch/> von @ashleyford.

![Beispiel](../../../en/adapterref/iobroker.vis-fancyswitch/img/widgets.svg)

## vis und vis-2

Der Adapter liefert jedes Widget zweimal aus:

- **vis (vis-1)** verwendet das EJS/jQuery-Widget-Set in `widgets/fancyswitch.html` Die
- **vis-2** verwendet das React-Widget-Set in `widgets/vis-2-widgets-fancyswitch/`, gebaut aus `src-widgets/` Die

Beide deklarieren die gleichen Widget-IDs (`tplFancySwitch1`, `tplFancyGivaIButton`, …) und dieselben Attributnamen, und vis-2 bevorzugt ein React-Widget gegenüber einem EJS-Widget. Daher funktioniert ein mit vis erstelltes Projekt auch nach dem Wechsel zu vis-2 weiterhin – die Widgets werden einfach mit der React-Implementierung gerendert, ohne jQuery, jQuery UI oder das iButton-Plugin.

Die React-Widgets benötigen vis-2 Version 2.12.8 oder neuer. Bei älteren vis-2-Versionen werden die EJS-Widgets verwendet.

## Alles ist gezeichnet, nichts ist eine Bitmap.

Das Widget-Set enthielt früher neun PNG-Dateien. Diese werden jetzt alle aus einer einzigen Quelle als SVG generiert (`src-widgets/src/Components/fancyArt.ts`): die Sprites, die das Vis-1-Set lädt, die Vorschauen der Vis-2-Palette, die Bilder dieser Dokumentation und das Adaptersymbol. `npm run assets` schreibt sie nach einer Veränderung erneut.

Die Vis-2-Widgets zeichnen die gleiche Grafik direkt im Bild und skalieren sie mit dem Widget, sodass ein Schalter in jeder Größe scharf bleibt – und die Beschriftungen, die früher in die Bilder eingebrannt waren (`OFF` /`ON`, `AUS` /`EIN`) sind jetzt die Einstellungen.

## Dokumentation

Alle Widgets mit ihren Einstellungen: [Englisch](/#/docs/adapterref/iobroker.vis-fancyswitch/docs/en/README.md) | [Deutsch](https://github.com/ioBroker/ioBroker.vis-fancyswitch/blob/master/docs/de/README.md)

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