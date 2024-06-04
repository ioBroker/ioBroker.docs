---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rssfeed/README.md
title: ioBroker-Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
hash: w3/59h3RcCjkaOOU18hRd1xbdEdToo2ZhJXm55J+JcM=
---
![Logo](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed-logo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Anzahl der Installationen](https://iobroker.live/badges/rssfeed-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/rssfeed-stable.svg)
![NPM](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

# IoBroker-Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
**Tests:** ![Testen und Freigeben](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Überblick
Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF).
Die Ausgabe des Feeds können Sie über ein Vorlagensystem individuell anpassen. In die Vorlagen können Sie HTML, CSS und Javascript einbinden.

Wichtig: Aufgrund von Fehlern bei automatischen Übersetzungen in andere Sprachen durch iobroker ist nur die englische Übersetzung gültig.

## Eine Instanz hinzufügen
Nach der Installation sollte der Adapter dann im Adapterbereich im iobroker angezeigt werden.

Manchmal kommt es vor, dass die Änderungen nicht sichtbar sind, insbesondere bei Web-Änderungen (Widgets / Konfigurationsdialog), ggf. muss folgender Befehl auf der Kommandozeile ausgeführt werden:

```bash
iobroker upload rssfeed
```

Im rechten Bereich in der Zeile des Adapters kann über den Plus-Button eine Instanz hinzugefügt werden

## Aufbau
Die Konfiguration ist einfach. Es gibt nur wenige Felder

| Einstellung | Beschreibung |
| ------- | ----------- |
| Standardmäßiger Refresh (min) | ist die allgemeine Angabe in Minuten, wie oft der Feed erneut aufgerufen werden soll. Der Standardwert liegt bei 60 Minuten |
| Max Artikel (Standard) | Die Gesamtmenge der zu verarbeitenden Daten kann hier begrenzt werden.|

Dann für jeden neuen Feed:

| Einstellung | Beschreibung |
| ------- | ----------- |
| Name | Ein Name für den Datenpunkt. Innerhalb eines Ordners darf ein Name nicht zweimal vorkommen. |
| Kategorie | Name für einen Unterordner, in dem der Datenpunkt erscheinen soll. Die Kategorie muss eindeutig sein |
| URL | Die vollständige Adresse des Feeds (mit http:// oder https://, siehe Beispiele unten) |
| Aktualisierung (min) | Für diesen Feed kann ein anderer Wert angegeben werden. Ansonsten wird die allgemeine Angabe übernommen |
| Max Artikel | Für diesen Feed kann ein anderer Wert angegeben werden. Ansonsten wird die allgemeine Angabe übernommen |

Wenn Sie die Konfiguration gespeichert und geschlossen haben, sind die Feed-Daten als JSON-Datenpunkt im Objektbaum zu finden.
Wenn Sie einen Eintrag löschen, werden die Datenpunkte nicht gelöscht.

## Vis und Widgets
Folgende Widgets gibt es aktuell

* `RSS-Feed-Widget 2` - um einen einzelnen Feed anzuzeigen
* „RSS-Feed-Multi-Widget“ – um mehrere aggregierte Feeds in einem Widget anzuzeigen.
* `RSS Feed Meta Helper` - ein Hilfs-Widget zum Überprüfen der Metadaten eines Feeds
* `RSS Feed Article Helper 2` - ein Hilfs-Widget zur Überprüfung der Artikeldaten eines Feeds
* `RSS Feed Title marquee 3` - ein Widget, um die Überschriften eines Feeds als Laufschrift anzuzeigen
* „JSON-Vorlage“ – ein Widget, das nichts mit RSS-Feeds zu tun hat, aber die gleiche Technologie verwendet, und Sie können eine benutzerdefinierte Vorlage definieren, um beliebige JSON-Daten in Visual anzuzeigen.

Dokumentation für die Vis-Widgets finden Sie in Vis oder [Widget-Dokumentation/deutsch](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.rssfeed/blob/master/widgets/rssfeed/doc.html)

## Vorlage basierend auf Beispielen
Ein Beispiel, das ich mit folgenden RSS-Feeds getestet habe:

* <http://www.tagesschau.de/xml/rss2>
* <https://www.bild.de/rssfeeds/rss3-20745882,feed=alles.bild.html>

```html
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Das Vorlagensystem arbeitet mit bestimmten Tags.
Die verwendeten Tags bedeuten Folgendes

| `tag` | Beschreibung |
| ----- | --------------------------------------------------------------------- |
| <%= | Der Inhalt des enthaltenen Ausdrucks/der enthaltenen Variable wird maskiert. |
| <%- | Der Inhalt des enthaltenen Ausdrucks/der enthaltenen Variable wird nicht maskiert. |
| <% | Keine Ausgabe, wird für eingeschlossene Javascript-Anweisungen verwendet |
| %> | ist im Allgemeinen ein schließender Tag, der einen der vorherigen vervollständigt |

Alles was außerhalb dieser Tags steht wird genauso dargestellt wie es ist oder als HTML interpretiert. (siehe z.B. das p-Tag, div-Tag, small-Tag) Innerhalb des Templates stehen dir 2 vordefinierte Variablen zur Verfügung

### `meta`
Hier stehen alle Metainformationen zum Feed. Folgende Inhalte stehen zur Verfügung. Die Bezeichner sind meiner Meinung nach selbsterklärend. In der Hilfe beschreibe ich sie genauer. bzw. spezifiziere den Inhalt (einige sind Arrays)

* `Meta.Titel`
* `Meta.Beschreibung`
* `Meta.Link`
* `meta.xmlurl`
* `meta.datum`
* `meta.pubdate`
* `meta.autor`
* `Metasprache`
* `Meta.Bild`
* `meta.favicon`
* `meta.copyright`
* `meta.generator`
* `meta.kategorien`

#### `articles`
Ist ein Array mit einzelnen Elementen (Javascript-Array). Jedes Element hat folgende Eigenschaften.
Damit es passt, mache ich z.B. noch das Präfix item davor. Aber wer will kann das ja auch selbst wählen. Es muss nur in der Schleife entsprechend benannt werden (forEach). Auch hier sind die Bezeichner selbsterklärend. Nicht in jedem Feed sind alle Attribute ausgefüllt. Die wichtigsten sind im Template oben schon enthalten.

* `Artikeltitel`
* `Artikelbeschreibung`
* `Artikelzusammenfassung`
* `Artikel.Link`
* `Artikel.origlink`
* `Artikel.Permalink`
* `Artikel.Datum`
* `Artikel.Veröffentlichungsdatum`
* `Artikel.Autor`
* `Artikel.guid`
* `Artikel.Kommentare`
* `Artikel.Bild`
* `Artikel.Kategorien`
* `Artikel.Quelle`
* `Artikel.Anlagen`

## Vorlagenbeispiel und ausführliche Beschreibung
```html
<%= meta.title %>
<% articles.forEach(function(item){ %>
<p><small><%- vis.formatDate(item.pubdate, "TT.MM.JJJJ SS:mm") %></small></p>
<h3><%- item.title %></h3>
<p><%- item.description %></p>
<div style="clear:both;" />
<% }); %>
```

Kurzbeschreibung, was in den einzelnen Zeilen passiert Z1: Die Ausgabe des Feedtitels Z2: Ohne Ausgabe. Javascript-Befehl zum Loopen über alle Artikel, bei jedem Turn wird das aktuelle Element der Variable item zugewiesen.
Z3: Ausgabe von Datum und Uhrzeit. Wird mit einem p/small-Tag zur Formatierung umschlossen. Zur Formatierung wird die vis-eigene Datumsformat-Funktion verwendet. Beschreibung findet sich im Adapter vis.
Z4: Die Ausgabe des Artikeltitels. Wird mit einem Header3-Tag umschlossen.
Z5: Ausgabe des Inhalts des Artikels. Wird mit einem p-Tag umschlossen. Hier wird, zumindest in den beiden Beispielen, HTML-Code eingebunden, der meist mit Bild und Beschreibungstext daherkommt Z6: Ausgabe eines div-Tags, der spezielle Formatierungen im Feed-html aufhebt (in beiden Beispielen für tagesschau und bild wird das benötigt. Andere Feeds brauchen das vielleicht nicht.
Z7: Ohne Ausgabe. Mit dieser Zeile wird die Javascript-Schleife geschlossen. Alles, was zwischen Z2 und Z7 definiert wurde, wird für jeden einzelnen Artikel wiederholt.

## Machen
* Bereinigen Sie nicht verwendete Einträge im Datenpunkt info.lastRequest, indem Sie sie im Admin-Dialog speichern.
* Button zum Bereinigen nicht genutzter Datenpunkte im Admin-Dialog
* ~~RSS-Feeds mit mehreren Widgets~~
* ~~Multi-Widget-Laufschrift~~
* ~~Weitere Datenpunkte im Template verfügbar machen.~~
* ~~Widget für Laufschrift mit den Titeln <https://forum.iobroker.net/topic/31242/nachrichten-ticker-newsticker-via-php-in-vis-einbinden/2>~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.9.2 (2024-06-04)

* add some translations
* fix warning from adapter checker

### 2.9.1 (2024-06-03)

* update iobroker files and settings

### 2.8.2 (2024-04-21)

* (bluefox) Fixed loading of words.js in vis

### 2.8.1 (2023-03-15)

* (bluefox) Corrected vis widget
* admin changed to jsonConfig, dev-environment now devcontainer

### 2.7.0 (2022-12-11)

### 2.6.1 (2022-07-30)

* added more information to sentry

### 2.6.0 (2022-07-26)

* added sentry

### 2.4.0 (2022-07-25)

* added name option to marquee widget

### 2.0.0

* Rework of the admin dialog
* Fix some errors and glitches

### 1.0.0

* Released in stable

### 0.9.0

* fixed/extended json template

### 0.8.0

* adapted configuration pages to react.
* Prepared for stable release

### 0.0.30

* added some template examples to the widget documentation

### 0.0.29

* improved error messages
* removed deprecated widget / change widget beta flag
* changed createObject/setState logic due iobroker-controller >3.0

### 0.0.28

* removed customtab

### 0.0.27

* adapter configuration is now editable

### 0.0.26

* corrected changelog size

### 0.0.25

* the error messages for the template are improved

### 0.0.24

* errors in the request of feeds are now real errors in the iobroker log
* loading of rules for ejs in the editor is improved
* marquee3 widget: options to show time and date

### 0.0.23

* republish to npm

### 0.0.22

* improvements in the configuration dialog
* remove unused admintab
* new RSS Feed multi widget. in this widget you can add your one or more datapoints, that are available in the template.
* New marquee widget 3 replaces the existing marquee widget 2.The marquee widget 3 is now a multi widget and can handle more than one feed. The Headlines are now aggregated.
* the existing widget JSON template is improved. in this widget you can add your one or more datapoints, that are available in the template.
* Remove several deprecated widgets (RSS Feed widget 1, Article Helper 1, Marquee 1, JSON template 1)

### 0.0.21

* add link option to marquee widget
* widget help added
* marquee widget: the divider characters (default: +++) are configurable

### 0.0.20

* add ejs syntax to template editor

### 0.0.19

* try to fix marquee widget.

### 0.0.18

* try to fix the wrong NoSave dialog

### 0.0.17

* rework setting objects and states

### 0.0.16

* improve logic adding rssfeed in configuration dialog
* fix wrong icon for marquee widget
* define default template for rssfeed widget
* deprecate existing and replace with new version of widgets to improve naming of the attributes in case of translation
* widget rss marquee: replace duration attribute with speed attribute and improved the calculation algorithm. now same number is same speed regardless of the length of the titles

### 0.0.15

* fix bug saving last request in adapter configuration / improve debug messages

### 0.0.14

* update package.json and install new tools for stream encoding/decoding detection
* implement encoding detection and stream encoding
* change the ejs lib with a real browserified lib

### 0.0.13

* new widget as a guest, because it is not directly related to the rssfeed functionality, but reuse the same code base. maybe later i transfer it to an own adapter. the new widget can take a json datapoint and you can visualize the data with the ejs template system.

### 0.0.12

* now you can download the adapter configuration in the admin dialog. upload is not possible due to security restrictions in modern browsers.

### 0.0.11

* improve admin layout
* implement a forceRefresh button

### 0.0.10

* fix bug a bug in marquee widget. not all styles should applied to the span tag.

### 0.0.9

* apply widget styles also to the inner span element, because they had not any effect on the marquee.
* renew the package-lock.json
* add categories to save feeds in subfolders
* improve mechanism to write only updated feeds to datapoint. the feed has new data if comparision of articles in title and description is different.

### 0.0.8

* improve lasrequest logic of the adapter
* fix problem with datapoint naming

### 0.0.7

* test with encapsulation of ejs.js, because of error in some browsers

### 0.0.6

* add attribute duration for widget marquee to control animation duration

### 0.0.5

* new widget marquee for article titles
* add filter function for articles. the filter searches in title,description and categories, several filter criteria can be seperated by semicolon

### 0.0.4

* some adjustments in readme, io-package

### 0.0.3

* add addveyor build

### 0.0.2

* added widgets meta helper and article helper

### 0.0.1

* initial release

## License

MIT License

Copyright (c) 2021-2024 oweitman <oweitman@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.