---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.skiinfo/README.md
title: ioBroker.skiinfo
hash: y12O3xCAjzKgdZffC4wOapYeE0k5w/Nq8O7yBMZIbEo=
---
# IoBroker.skiinfo
![Logo](../../../en/adapterref/iobroker.skiinfo/admin/skiinfo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.skiinfo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.skiinfo.svg)
![Anzahl der Installationen](https://iobroker.live/badges/skiinfo-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/skiinfo-stable.svg)
![NPM](https://nodei.co/npm/iobroker.skiinfo.png?downloads=true)

**Tests:** ![Testen und Freigeben](https://github.com/oweitman/ioBroker.skiinfo/workflows/Test%20and%20Release/badge.svg)

## Skiinfo-Adapter für ioBroker
Mit diesem Adapter können Sie die aktuellen Schneehöhen für Berg-, Tal- und Neuschnee sowie geöffnete Lifte für verschiedene europäische Standorte abrufen.

## Konfiguration
Der Adapter benötigt keine Konfiguration.

## Vis und Widgets
Folgende Widgets gibt es aktuell

- [`Skiinfo-Browser`](#skiinfo-browser) – um alle verfügbaren Länder, Regionen und Gebiete zu durchsuchen und Lieblingsgebiete festzulegen.
- [`Skiinfo-Favoriten`](#skiinfo-favorite) – um nur die beliebtesten Skigebiete anzuzeigen.

weitere Informationen

- nutzbare [`CSS-Klassen`](#css-classes) für individuelles Styling

### Skiinfo-Browser
Mit dem Widget können Sie alle verfügbaren Länder, Regionen und Gebiete durchsuchen und Favoriten festlegen.

Sie können die Sortierung für jede Spalte (Standard, absteigend oder aufsteigend) über die Tabellenüberschrift umschalten.
Sie können über das Suchsymbol in der Bereichsspalte suchen.
Sie können den Favoritenmodus über das Sternsymbol umschalten.

Wählen Sie als Datenpunkt den Konfigurationsdatenpunkt aus.

### Skiinfo-Favorit
Das Widget dient dazu, nur die bevorzugten Skigebiete anzuzeigen.
Über den Tabellenkopf können Sie die Sortierung für jede Spalte (Standard, absteigend, aufsteigend) umschalten.
Mit dem Sternsymbol können Sie das Gebiet aus der Favoritenliste entfernen.

Als Datenpunkt wählen Sie bitte den Konfigurationsdatenpunkt aus.

### CSS-Klassen
#### `widgetID` und `skiinfo`
Alle CSS-Klassen werden mit den beiden Basisklassen `widgetID` und `skiinfo` bereitgestellt. Dadurch können Sie Formatierungen auf einzelne Widgets oder, bei Verwendung mehrerer Skiinfo-Widgets, auf alle Skiinfo-Widgets anwenden.

#### `countries`,`regions` und `areas`
Mit diesen 3 CSS-Klassen können die einzelnen Informationsbereiche separat angesprochen werden

#### Informationsbereiche Land, Region und Gebiet
Jeder der 3 Informationsbereiche besteht aus einer normalen HTML-Tabelle.

#### Ausgewählte Elemente in Land und Region
Jedes der ausgewählten Elemente befindet sich in einem Span-Element und hat die CSS-Klasse `selected` erhalten.

#### Formatieren der Spalten im Bereich „Bereich“
Der Tabellenkopf wurde mit den CSS-Klassen tharea und thsort versehen. Jedes Spaltenelement wurde mit `txtr` für rechtsbündige und `txtl` für linksbündige Formatierung versehen.

#### Lieblingsstar
Der Favoritenstern kann in einem Span-Element platziert werden und ist über die CSS-Klasse `favorite` ansprechbar. Ist ein Element als Favorit ausgewählt, wird das Span-Element um `selected` ergänzt.

#### Beispiele für CSS-Klassen
##### Andere Farbe für ein ausgewähltes Länder- oder Regionenelement
```css
.skiinfo .selected {
    color: green;
}
```

##### Unterschiedliche Formatierung der `regions`-Elemente
```css
.skiinfo.regions span {
    color: grey;
}
```

## Verfügbare sendTo-Befehle
### GetServerSkiData
Übermitteln Sie dem Client die aktuellen Daten zu den gewünschten Skidaten.

#### Parameter für getServerSkiData
keiner

#### Beispiel für getServerSkiData
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerSkiData', {});
console.log(response);
```

### GetServerCountryData
Lädt die Länderdaten, sofern diese noch nicht geladen wurden, und sendet die Daten an den Client zurück.

#### Parameter für getServerCountryData
- Ländercode

#### Beispiel für getServerCountryData
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerCountryData', { countrycode: 'deutschland' });
console.log(response);
```

### GetServerRegionData
Lädt die Länder- und Regionsdaten, sofern sie noch nicht geladen wurden, und sendet die Daten an den Client zurück.

#### Parameter für getServerRegionData
- Ländercode
- Regionalcode

#### Beispiel für getServerRegionData
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'getServerRegionData', {
    countrycode: 'deutschland',
    countrycode: 'bayern',
});
console.log(response);
```

### ServerFavorite hinzufügen
Fügt ein bevorzugtes Gebiet für das angegebene Land und Gebiet hinzu.
Wenn das bevorzugte Gebiet nicht vorhanden ist, wird es hinzugefügt.
Sendet die aktualisierten Daten zurück an den Client.

#### Parameter für addServerFavorite
- Ländercode
- Regionalcode

#### Beispiel für addServerFavorite
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'addServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

### DelServerFavorite
Entfernt einen Favoritenbereich für das angegebene Land und Gebiet.
Sendet die aktualisierten Daten zurück an den Client.

#### Parameter für delServerFavorite
- Ländercode
- Regionalcode

#### Beispiel für delServerFavorite
```javascript
let instance = 'skiinfo.0';
let response = await sendToAsync(instance, 'delServerFavorite', { countrycode: 'deutschland', countrycode: 'bayern' });
console.log(response);
```

## Aufgaben
- muss noch definiert werden

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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