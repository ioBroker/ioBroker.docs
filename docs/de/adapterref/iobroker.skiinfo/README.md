---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.skiinfo/README.md
title: ioBroker.skiinfo
hash: KVMaVpIWsAdC2QQh5H1LWJJq8CoeQtgP6zeJXB3j+2I=
---
# ioBroker.skiinfo

![NPM-Version](https://img.shields.io/npm/v/iobroker.skiinfo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.skiinfo.svg)
![Anzahl der Installationen](https://iobroker.live/badges/skiinfo-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/skiinfo-stable.svg)
![nycrc-Konfiguration auf GitHub](https://img.shields.io/nycrc/oweitman/iobroker.skiinfo?preferredThreshold=functions)
![NPM](https://nodei.co/npm/iobroker.skiinfo.png?downloads=true)
![Test und Freigabe](https://github.com/oweitman/ioBroker.skiinfo/workflows/Test%20and%20Release/badge.svg)

![Logo](../../../en/adapterref/iobroker.skiinfo/admin/skiinfo.png)

## skiinfo-Adapter für ioBroker

Mit diesem Adapter können Sie die aktuellen Schneehöhen für Berg-, Tal- und Neuschneegebiete sowie die geöffneten Lifte für verschiedene europäische Skigebiete abrufen.

## Konfiguration

Der Adapter benötigt keine Konfiguration.

## vis und Widgets

Folgende Widgets existieren tatsächlich

- [`Skiinfo browser`](#skiinfo-browser) - um alle verfügbaren Länder, Regionen und Gebiete zu durchsuchen und Lieblingsgebiete festzulegen.
- [`Skiinfo Favorites`](#skiinfo-favorite) - nur die beliebtesten Skigebiete anzuzeigen.

weitere Informationen

- usabele[`CSS classes`](#css-classes) für individuelles Styling

### Skiinfo-Browser

Das Widget ermöglicht es Ihnen, alle verfügbaren Länder, Regionen und Gebiete zu durchsuchen und Favoriten festzulegen.

Sie können die Sortierung (Standard, absteigend oder aufsteigend) für jede Spalte über die Tabellenüberschrift ändern. Die Suchfunktion finden Sie über das Suchsymbol in der Spalte „Bereich“. Über das Sternsymbol können Sie den Favoritenmodus aktivieren. Alle Einträge lassen sich zu Favoriten reduzieren, um Ihre Favoriten schneller zu finden.

Wählen Sie den Konfigurationsdatenpunkt als Datenpunkt aus.

### Skiinfo-Favorit

Das Widget dient dazu, nur die bevorzugten Skigebiete anzuzeigen. Über die Tabellenüberschrift können Sie den Sortiermodus für jede Spalte umschalten (Standard, absteigend, aufsteigend). Mit dem Sternsymbol können Sie ein Gebiet aus der Favoritenliste entfernen.

Als Datenpunkt wählen Sie bitte den Konfigurationsdatenpunkt aus.

### CSS-Klassen

#### `widgetID` Und`skiinfo`

Alle CSS-Klassen werden mit den beiden Basisklassen bereitgestellt.`widgetID` Und`skiinfo` Dies ermöglicht es Ihnen, Formatierungen auf einzelne Widgets oder, bei Verwendung mehrerer Skiinfo-Widgets, auf alle Skiinfo-Widgets anzuwenden.

#### `countries` ,`regions` Und`areas`

Jeder der verschiedenen Informationsbereiche kann separat mit diesen 3 CSS-Klassen angesprochen werden.

#### Informationsbereiche: Land, Region und Gebiet

Jeder der 3 Informationsbereiche besteht aus einer normalen HTML-Tabelle.

#### Ausgewählte Elemente im Land und in der Region

Jedes der ausgewählten Elemente befindet sich in einem span-Element und hat die CSS-Klasse erhalten.`selected` Die

#### Formatieren der Spalten im Bereich

Die Tabellenüberschrift wurde mit den CSS-Klassen tharea und thsort versehen. Jedes Spaltenelement wurde mit`txtr` für rechtsbündige und`txtl` für linksbündige Formatierung.

#### Lieblingsstar

Der Lieblingsstern kann in einem Span-Element platziert und über die CSS-Klasse angesprochen werden.`favorite` Wenn ein Element als Favorit ausgewählt wurde, wird das Span-Element um Folgendes ergänzt:`selected` Die

#### Beispiele für CSS-Klassen

##### Unterschiedliche Farbe für ein ausgewähltes Land oder eine ausgewählte Region

```css
.skiinfo .selected {
    color: green;
}
```

##### Unterschiedliche Formatierung der`regions` Elemente

```css
.skiinfo.regions span {
    color: grey;
}
```

## Verfügbare sendTo-Befehle

### getServerSkiData

Die aktuellen Daten für die angeforderten Skidaten an den Client übermitteln.

#### Parameter für getServerSkiData

keiner

#### Beispiel für getServerSkiData

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerSkiData', {});
console.log(response);
```

### getServerCountryData

Lädt die Länderdaten, falls diese noch nicht geladen wurden, und sendet die Daten an den Client zurück.

#### Parameter für getServerCountryData

- Ländercode

#### Beispiel für getServerCountryData

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerCountryData', { countrycode: 'deutschland' });
console.log(response);
```

### Serverregionsdaten abrufen

Lädt die Länder- und Regionsdaten, falls diese noch nicht geladen wurden, und sendet die Daten an den Client zurück.

#### Parameter für getServerRegionData

- Ländercode
- Regioncode

#### Beispiel für getServerRegionData

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerRegionData', {
    countrycode: 'deutschland',
    countrycode: 'bayern',
});
console.log(response);
```

### Serverfavorit hinzufügen

Fügt für das angegebene Land und Gebiet einen Favoritenbereich hinzu. Falls der Favoritenbereich noch nicht existiert, wird er hinzugefügt. Sendet die aktualisierten Daten an den Client zurück.

#### Parameter für addServerFavorite

- Ländercode
- Regioncode

#### Beispiel für addServerFavorite

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'addServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

### delServerFavorite

Entfernt einen Favoritenbereich für das angegebene Land und Gebiet. Sendet die aktualisierten Daten an den Client zurück.

#### Parameter für delServerFavorite

- Ländercode
- Regioncode

#### Beispiel für delServerFavorite

```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'delServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

## Todo

- wird noch definiert

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2025-10-08)

- test remove node 18,extend to node 24
- add filter button in browser to reduce all entries to favorites.

### 0.5.0 (2025-04-16)

- add search for regions in browser

### 0.4.1 (2025-04-08)

- fix url
- fix classname of CountryList
- improve icons with round corners
- fix advices from code review
- fix global dependency

### 0.4.0 (2025-03-05)

- fix version info

### 0.3.0 (2025-03-05)

- release

### 0.2.0 (2025-03-05)

- enable npm deploy

### 0.1.0 (2025-03-05)

- initial release
- The color for favorites has now been made selectable
- minor CSS improvements
- Documentation of the sendTo commands has been added.
- The documentation of the CSS classes has been added.

## License

MIT License

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>

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