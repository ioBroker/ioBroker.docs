---
chapters: {"pages":{"en/adapterref/iobroker.vis-mapwidgets/README.md":{"title":{"en":"ioBroker.mapwidgets"},"content":"en/adapterref/iobroker.vis-mapwidgets/README.md"},"en/adapterref/iobroker.vis-mapwidgets/example/example.md":{"title":{"en":"Examples for mapwidgets"},"content":"en/adapterref/iobroker.vis-mapwidgets/example/example.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-mapwidgets/README.md
title: ioBroker.mapwidgets
hash: VouHFWGUKV6ZV4NnQoC0NkMeECQ0yHrju9vFfukmSkc=
---
# ioBroker.mapwidgets

![NPM-Version](https://img.shields.io/npm/v/iobroker.vis-mapwidgets.svg)
![Downloads](https://img.shields.io/npm/dm/ioBroker.vis-mapwidgets.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vis-mapwidgets-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vis-mapwidgets-stable.svg)
![NPM](https://nodei.co/npm/iobroker.vis-mapwidgets.png?downloads=true)
![Test und Freigabe](https://github.com/oweitman/ioBroker.vis-mapwidgets/workflows/Test%20and%20Release/badge.svg)

![Logo](../../../en/adapterref/iobroker.vis-mapwidgets/admin/mapwidgets-small.svg)

## MapWidgets-Adapter für ioBroker

Mit diesem Adapter können Sie mithilfe des Leaflet-Widgets verschiedene Elemente auf einer Karte anzeigen. Diese Elemente lassen sich über eine JSON-Datenstruktur konfigurieren.

![Vollständiges Testbild](../../../en/adapterref/iobroker.vis-mapwidgets/example/ExampleCompleteTest/ExampleCompleteTest.png) **Beispiel aus dem vollständigen Testbeispiel**

Aktuell werden folgende Elemente unterstützt:

- Markierungen (benutzerdefinierte Symbole können über ihre ID referenziert werden)
- Symbole
- Polylinien (z. B. für Gleise)
- Polygone (geometrische Formen)
- Rechtecke
- Kreise

Für fortgeschrittene Anwendungsfälle kann auf das Kartenobjekt über eine spezielle Variable zugegriffen und es mit JavaScript manipuliert werden.

Anwendungsbeispiele finden Sie in den [Beispielen.](/#/docs/adapterref/iobroker.vis-mapwidgets/example/example.md)

Zusätzliche Funktionen können auf Anfrage je nach Relevanz und Machbarkeit hinzugefügt werden.

## Konfiguration

Der Adapter selbst verfügt über keine Konfigurationsoptionen.

Die Konfiguration des Widgets wird im Folgenden beschrieben.

## vis und Widgets

Folgende Widgets existieren tatsächlich

- [`Map Leaflet`](#map-leaflet) - Zeigt Kartendaten mithilfe der Leaflet-Bibliothek [https://leafletjs.com/ an](https://leafletjs.com/) .

### Kartenblatt

Darstellung verschiedener Elemente auf einer Karte.

#### Widget-Konfiguration

| Name                             | Beschreibung                                                                   |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `mapwidgets_oid`                 | Datenpunkt, der die Elementkonfiguration enthält                               |
| `mapwidgets_lat`                 | Breitengrad des Kartenmittelpunkts                                             |
| `mapwidgets_lon`                 | Längengrad des Kartenmittelpunkts                                              |
| `mapwidgets_zoom`                | Anfangszoomstufe                                                               |
| `mapwidgets_expose`              | Stellen Sie das Kartenobjekt unter `window.iobroker.mapwidgets.<widgetID>.map` |
| `mapwidgets_maptheme`            | Farbschema der Karte: automatisch, hell oder dunkel (Standard: automatisch)    |
| `mapwidgets_daynightenabled`     | Tag-/Nachtmodus aktivieren                                                     |
| `mapwidgets_daynightcolor`       | Rahmenfarbe für die Tag-/Nachtzone                                             |
| `mapwidgets_daynightopacity`     | Deckkraft für die Tag-/Nachtzone                                               |
| `mapwidgets_daynightfillcolor`   | Füllfarbe für die Tag-/Nachtzone                                               |
| `mapwidgets_daynightfillopacity` | Deckkraft für die Tag-/Nachtzone                                               |

Das Farbschema der Karte ändert nur die Darstellung der OpenStreetMap-Kacheln.`auto` folgt dem Browser`prefers-color-scheme` Einstellungen und Aktualisierungen, wenn sich diese Einstellungen ändern.`light` zeigt die Originalfliesen an, während`dark` Wendet einen Dark-Map-Filter an. Markierungen, Pfade, Polygone und andere Leaflet-Overlays werden nicht gefiltert.

#### Kartenkonfiguration

Das Kartenobjekt besteht aus mehreren Hauptkomponenten, die alle unabhängig voneinander konfiguriert werden können:

```json
{
    "marker": [],
    "icons": {},
    "polyline": [],
    "polygon": [],
    "rectangle": [],
    "circle": []
}
```

Weitere Testinhalte finden Sie in [der Datei example\example.md](/#/docs/adapterref/iobroker.vis-mapwidgets/example/example.md) .

Bei allen Konfigurationen gilt der Grundsatz, dass nur die unbedingt notwendige Informationsmenge zur Anzeige eines Elements benötigt wird.

Die Kartendaten werden im Bearbeitungsmodus geprüft. Eventuelle Fehler können über die Schaltfläche mit dem roten Ausrufezeichen eingesehen und überprüft werden. Diese Schaltfläche ist nur sichtbar, wenn Fehler vorliegen.

In vis lässt sich der Dialog wie gewohnt mit einem Klick öffnen. In vis-2 verwenden Sie 2 x SHIFT + Klick.

Taste

![Ausrufezeichen-Schaltfläche](../../../en/adapterref/iobroker.vis-mapwidgets/example/Exclamationmark.png)

Dialog

![Fehlerdialog](../../../en/adapterref/iobroker.vis-mapwidgets/example/ErrorDialog.png)

Die Zuordnung der einzelnen Attribute wird im Folgenden beschrieben:

##### Marker

Dies enthält ein Array von einzelnen Markerinformationsobjekten.

```json
[
    {
        "latlng": [50.182, 8.682],
        "options": {
            "title": "Default"
        },
        "popup": "<b>Default Marker</b>",
        "tooltip": "Hover me"
    },
    {
        "lat": 50.176,
        "lng": 8.69,
        "options": {
            "draggable": true,
            "title": "Draggable"
        },
        "popup": "Drag me!"
    }
]
```

Breitengrad und Längengrad sind Pflicht; alle anderen Parameter sind optional. Es gibt zwei alternative Schreibweisen für Breitengrad und Längengrad; siehe Beispiel oben.

Bei einem benutzerdefinierten Symbol wird die eindeutige ID des Symbols als Zeichenfolge angegeben (siehe …).`icons` Konfiguration).

Für Tooltips und Popups siehe [Tooltips](#tooltip) und [Popups](#popup) .

Detaillierte Beschreibungen der Parameter finden Sie hier:

<https://leafletjs.com/reference.html#marker>

##### Symbol

Dies enthält ein Array von Objekten mit Informationen zu einzelnen Symbolen.

```json
{
    "greenleaf": {
        "iconUrl": "/vis.0/leaf-green.png",
        "iconSize": [25, 41],
        "iconAnchor": [12, 41],
        "popupAnchor": [1, -34],
        "shadowUrl": "/vis.0/leaf-shadow.png",
        "shadowSize": [41, 41],
        "shadowAnchor": [12, 41]
    },
    "orangeleaf": {
        "iconUrl": "/vis.0/leaf-orange.png",
        "iconSize": [32, 48],
        "iconAnchor": [16, 48],
        "popupAnchor": [0, -40],
        "shadowUrl": "/vis.0/leaf-shadow.png",
        "shadowSize": [50, 50],
        "shadowAnchor": [16, 48]
    }
}
```

`iconURL` ist obligatorisch; alle anderen Parameter sind optional.

Der Schlüsselname des Symbols (im Beispiel,`greenleaf` ) ist case-sensitiv, muss innerhalb der Symbolgruppe eindeutig sein und dient als Referenz in Markierungen.

Zulässige Zeichen:`a–z, 0–9, _, -.`

Detaillierte Beschreibungen der Parameter finden Sie hier:

<https://leafletjs.com/reference.html#icon>

##### Polylinie / Polygon / Rechteck / Kreis

Dieses Array enthält Informationen zu einzelnen Polylinien, Polygonen, Rechtecken und Kreisen. Das Schema ist für alle Typen identisch. Unterschiede werden im Folgenden erläutert.

**Polylinie:**

```json
[
    {
        "latlng": [
            [50.2, 8.7],
            [50.2, 8.8],
            [50.3, 8.75]
        ],
        "options": {
            "color": "green",
            "weight": 10
        }
    },
    {
        "latlng": [
            [50.2, 8.8],
            [50.2, 8.9],
            [50.3, 8.85]
        ],
        "options": {
            "color": "blue",
            "weight": 5
        }
    }
]
```

**Polygon:**

```json
[
    {
        "latlng": [
            [50.1, 8.7],
            [50.1, 8.8],
            [50.2, 8.75]
        ],
        "options": {
            "color": "green",
            "weight": 10
        }
    }
]
```

**Rechteck:**

```json
[
    {
        "latlng": [
            [50.3, 8.7],
            [50.4, 8.8]
        ],
        "options": {
            "color": "yellow",
            "weight": 10
        }
    }
]
```

**Kreis:**

```json
[
    {
        "latlng": [50.3, 8.6],
        "options": {
            "radius": 10000,
            "weight": 10,
            "color": "black"
        }
    }
]
```

###### `latlng`

Das Vorhandensein dieses Parameters ist für alle Typen obligatorisch.

Breitengrad und Längengrad sind immer ein Array mit 2 Elementen \[Breitengrad, Längengrad], die im Folgenden als Koordinaten bezeichnet werden (Koordinate oben links und Koordinate unten rechts).

Polylinie, Polygon und Rechteck sind ein Koordinatenarray. Ein Kreis besteht nur aus einer einzigen Koordinate.

Eine Polylinie muss aus mindestens 2 Elementen, ein Polygon aus mindestens 3 Elementen und ein Rechteck aus genau 2 Elementen bestehen.

###### `options`

Mit Ausnahme des Circle-Objekts ist der Parameter „options“ immer optional. Für das Circle-Objekt ist der Parameter „radius“ obligatorisch. Die in der Leaflet-Dokumentation beschriebene Möglichkeit, einen separaten „radius“-Parameter auf den Ebenen „latlng“ und „options“ zu verwenden, ist hier nicht verfügbar.

Für Tooltips und Popups siehe [Tooltips](#tooltip) und [Popups](#popup) .

Detaillierte Beschreibungen der Parameter finden Sie hier:

<https://leafletjs.com/reference.html#polyline>

<https://leafletjs.com/reference.html#polygon>

<https://leafletjs.com/reference.html#polygon>

<https://leafletjs.com/reference.html#circle>

##### Tooltip

Tooltip für Marker, Polygon, Rechteck, Kreis.

```json
[
    {
        "lat": 50.182,
        "lng": 8.682,
        "options": {
            "title": "Default"
        },
        "popup": "<b>Default Marker</b>",
        "tooltip": "Hover me"
    },
    {
        "lat": 50.171,
        "lng": 8.695,
        "options": {
            "icon": "orangeleaf",
            "draggable": true,
            "title": "Orange dot (draggable)"
        },
        "tooltip": {
            "text": "Permanent tooltip",
            "options": {
                "permanent": true,
                "offset": [0, -12]
            }
        }
    }
]
```

Ein Tooltip kann entweder als einfacher String oder als Objekt mit den Attributen „text“ und „options“ definiert werden.

Detaillierte Beschreibungen der Parameter finden Sie hier:

<https://leafletjs.com/reference.html#tooltip>

##### Popup

Popup für Marker, Polygon, Rechteck, Kreis.

```json
[
    {
        "lat": 50.182,
        "lng": 8.682,
        "options": {
            "title": "Default"
        },
        "popup": "<b>Default Marker</b>"
    },
    {
        "lat": 50.171,
        "lng": 8.695,
        "options": {
            "icon": "orangeleaf",
            "draggable": true,
            "title": "Orange dot (draggable)"
        },
        "popup": {
            "text": "Popup with offset",
            "options": {
                "offset": [0, -12]
            }
        }
    }
]
```

Ein Popup kann entweder als einfacher String oder als Objekt mit den Attributen "text" und "options" definiert werden.

Detaillierte Beschreibungen der Parameter finden Sie hier:

<https://leafletjs.com/reference.html#popup>

##### spezielle iobroker-Optionen

Spezielle Optionen, die nur von der Leaflet-Version in ioBroker unterstützt werden, werden mithilfe des zusätzlichen Optionsobjekts „iobOptions“ implementiert. Dieses Objekt ist nicht für alle Objekttypen gültig. Welche Optionen für welchen Objekttyp gültig sind, wird im jeweiligen Abschnitt beschrieben.

###### fitBounds

Dies gilt für die folgenden Objekttypen: Marker, Polygon, Polylinie, Rechteck, Kreis.

Das System erfasst alle Punkte der Objekte, bestimmt einen minimalen/maximalen Begrenzungsrahmen um sie herum, berechnet den passenden Zoomfaktor und zentriert und zoomt die Ansicht so, dass alle ausgewählten Objekte sichtbar sind.

**Beispiel für fitBounds mit 3 Markern:**

```json
{
    "marker": [
        {
            "latlng": [50.2, 8.7],
            "iobOptions": {
                "fitBounds": true
            }
        },
        {
            "latlng": [50.2, 8.6],
            "options": {
                "title": "Default"
            },
            "tooltip": {
                "text": "Default",
                "options": {
                    "permanent": true,
                    "direction": "top"
                }
            },
            "iobOptions": {
                "fitBounds": true
            }
        },
        {
            "latlng": [50.2, 8.8],
            "options": {
                "title": "with Custom Icon",
                "icon": "redleaf"
            },
            "tooltip": {
                "text": "with Custom Icon",
                "options": {
                    "permanent": true,
                    "direction": "bottom"
                }
            },
            "iobOptions": {
                "fitBounds": true
            }
        }
    ],
    "icons": {
        "redleaf": {
            "iconUrl": "/vis.0/leaf-red.png",
            "iconSize": [25, 41],
            "shadowUrl": "/vis.0/leaf-shadow.png",
            "shadowSize": [25, 41],
            "iconAnchor": [14, 39],
            "shadowAnchor": [3, 39],
            "popupAnchor": [50, 50]
        }
    }
}
```

### Zeitleiste des Standorts

Das Widget **„Standort-Timeline“** zeigt den täglichen Standortverlauf von bis zu fünf Personen an. Sein Layout ist von der Karten- und Zeitleisteninteraktion mobiler Kartenanwendungen inspiriert, ohne jedoch ein bestimmtes Anwendungsdesign zu kopieren.

Jeder konfigurierte Tracking-Datenpunkt muss eine kombinierte WGS84-Position enthalten:

```text
50.11552,8.68417
```

Zum Testen kopieren[`example/LocationTimeline/create-example-track.js`](https://github.com/oweitman/ioBroker.vis-mapwidgets/blob/main/example/LocationTimeline/create-example-track.js) in ein JavaScript-Adapterskript. Es erstellt einen konfigurierbaren Beispieltag und speichert die Rohpositionen in`history.0` durch`storeState` Die

Für den ausgewählten lokalen Kalendertag fordert das Widget nicht aggregierte Werte an von`history.0` Tagesgrenzen und Sommerzeitumstellungen richten sich nach der Zeitzone des Browsers. Falls für den heutigen Tag kein Verlauf verfügbar ist, wird der aktuelle Status als einzelne Markierung angezeigt. Vergangene Tage ohne Verlauf bleiben leer.

Das Widget entfernt einzelne, unplausible GPS-Sprünge und gruppiert nahe beieinander liegende Messwerte zu Aufenthalten. Die folgenden Optionen steuern diese Verarbeitung:

- **Zeitleistenlayout** : automatisch, neben der Karte oder unterhalb der Karte
- **Farbschema** (`timeline_theme` ): automatisch, hell oder dunkel für die Steuerelemente der Zeitleiste, die Liste und die Dialogfelder
- **Farbschema der Karte** (`mapwidgets_maptheme` ): automatisch, hell oder dunkel (nur für die OpenStreetMap-Kacheln)
- **Aufenthaltsradius** : Maximale Entfernung von Proben, die zu einem Aufenthalt gehören (Standardwert 75 m)
- **Mindestaufenthaltsdauer** : Mindestdauer eines Aufenthalts (standardmäßig 10 Minuten)
- **Maximale sinnvolle Geschwindigkeit** : Schwellenwert für isolierte GPS-Sprünge (Standard 300 km/h);`0` (deaktiviert den Filter)

Beide Farbschemaoptionen sind standardmäßig auf`auto` und folgen Sie den Anweisungen des Browsers.`prefers-color-scheme` Die Einstellungen können unabhängig voneinander ausgewählt werden, beispielsweise um eine dunkle Zeitleistenoberfläche mit hellen Kartenkacheln zu kombinieren. Das Kartenthema filtert weder Routenlinien noch Markierungen oder andere Leaflet-Overlays.

Bekannte Orte und Ergebnisse der umgekehrten Geokodierung werden in diesen Zuständen gespeichert, die während der Adapterinstallation erstellt werden:

```text
vis-mapwidgets.0.timeline.places
vis-mapwidgets.0.timeline.geocodingCache
```

IndexedDB dient als schneller lokaler Cache. Statusänderungen werden im Hintergrund erfasst und ausgeführt. Ein abgeschlossener Aufenthalt kann als bekannter Ort mit einer bearbeitbaren Bezeichnung und einem Radius gespeichert werden.

Aufgelöste Orte werden als Name und eine kleinere Adresszeile angezeigt. Routenpfeile zeigen die Fahrtrichtung an, und sowohl Haltepunkte als auch Routenabschnitte wählen beim Anklicken den entsprechenden Zeitleisteneintrag aus.

Externes Reverse-Geocoding ist standardmäßig deaktiviert. Ist es aktiviert, wird standardmäßig die öffentliche Nominatim Reverse-API verwendet. Anfragen werden dedupliziert und serialisiert, wobei zwischen den Aufrufen mindestens 1,1 Sekunden vergehen. Konfigurieren Sie eine Kontakt-E-Mail-Adresse und beachten Sie die [Nominatim-Nutzungsrichtlinien](https://operations.osmfoundation.org/policies/nominatim/) . Die Standortkoordinaten werden an den konfigurierten externen Dienst gesendet.

### Dokumentation der Hilfsfunktionen

Folgende Funktionen stehen zur Verfügung unter`window.iobroker.mapwidgets` . Zum Beispiel:

```js
window.iobroker.mapwidgets.waitForGlobal(...)
window.iobroker.mapwidgets.loadScript(...)
window.iobroker.mapwidgets.loadCSS(...)
```

`loadScript` Und`loadCSS` Kann verwendet werden, um JavaScript-Dateien und CSS-Stylesheets dynamisch zu laden, was für die Verwendung der Karten-Widgets erforderlich sein kann.

`waitForGlobal` kann verwendet werden, um auf eine globale Variable zu warten.`window.` Dies ist notwendig, da die Kartenvariable erst verfügbar ist, nachdem das Karten-Widget von vis.js initialisiert wurde.

#### `loadScript(src, { attrs = {}, timeout = 15000 } = {})`

Lädt dynamisch eine externe JavaScript-Datei in das aktuelle Dokument.

##### Parameter loadScript

- **src** (`string` )\
  &#x20;Die URL der zu ladenden JavaScript-Datei.
- **attrs** (`object` (optional)\
  &#x20;Zusätzliche Attribute für die`<script>` Element. Unterstützte Schlüssel:
  - `type` z.B.`"module"` Als ES-Modul laden.
  - `integrity` : Subresource Integrity (SRI)-Hash.
  - `crossOrigin` : Cross-Origin-Einstellung (`"anonymous"` oder`"use-credentials"` ).
- **Zeitüberschreitung** (`number` optional, Standardwert:`15000` )\
  &#x20;Maximale Zeit in Millisekunden, bevor der Ladevorgang fehlschlägt.

##### Gibt loadScript zurück

- **Versprechen**\
  &#x20;Wird erfolgreich aufgelöst, wenn das Skript geladen wurde; bei Fehlern oder Zeitüberschreitungen wird eine Fehlermeldung ausgegeben. Wenn das Skript bereits im Dokument vorhanden ist, wird es mit einem Fehlercode aufgelöst.`"already-loaded"` Die

##### Beispiel-Ladeskript

```js
loadScript('https://cdn.example.com/lib.min.js')
    .then(() => {
        console.log('Script loaded!');
    })
    .catch(console.error);
```

#### `loadCSS(href, { attrs = {}, timeout = 15000 } = {})`

Lädt dynamisch ein externes CSS-Stylesheet in das aktuelle Dokument.

##### Parameter loadCSS

- **href** (`string` )\
  &#x20;Die URL der zu ladenden CSS-Datei.
- **attrs** (`object` (optional)\
  &#x20;Zusätzliche Attribute für die`<link>` Element. Unterstützte Schlüssel:
  - `integrity` : Subresource Integrity (SRI)-Hash.
  - `crossOrigin` : Cross-Origin-Einstellung.
  - `media` : Medienabfrage für bedingtes Laden (z. B.`"print"` ,`"(min-width: 768px)"` ).
- **Zeitüberschreitung** (`number` optional, Standardwert:`15000` )\
  &#x20;Maximale Zeit in Millisekunden, bevor der Ladevorgang fehlschlägt.

##### Gibt loadCSS zurück

- **Versprechen**\
  &#x20;Wird aufgelöst, wenn das Stylesheet erfolgreich geladen wurde, andernfalls wird ein Fehler oder eine Zeitüberschreitung zurückgegeben. Wenn das Stylesheet bereits im Dokument vorhanden ist, wird es mit einem Fehlercode aufgelöst.`"already-loaded"` Die

##### Beispiel loadCSS

```js
loadCSS('https://cdn.example.com/theme.css').catch(console.error);
```

#### `waitForGlobal(path, interval = 100, timeout = 0)`

Wartet auf eine globale Variable (oder eine verschachtelte Eigenschaft von`window` ) verfügbar zu werden.

##### Parameters waitForGlobal

- **Weg** (`string` )\
  &#x20;Durch Punkte getrennter Pfad zur globalen Variable (z. B.`"jQuery"` ,`"MyLib.utils.helper"` ).
- **Intervall** (`number` optional, Standardwert:`100` )\
  &#x20;Intervall in Millisekunden, in dem die Variable überprüft werden soll.
- **Zeitüberschreitung** (`number` optional, Standardwert:`0` )\
  &#x20;Maximale Wartezeit in Millisekunden.`0` bedeutet, unbestimmt zu warten.

##### Gibt waitForGlobal zurück

- **Versprechen**\
  &#x20;Wird mit dem gefundenen Objekt aufgelöst, sobald dieses verfügbar ist.\
  &#x20;Wird abgelehnt, wenn das Zeitlimit erreicht wird, bevor das Objekt gefunden wurde.

##### Beispiel waitForGlobal

```html
<script>
    waitForGlobal('iobroker.mapwidgets.w00001.map', 200, 5000)
        .then(map => {
            // map is now available
        })
        .catch(err => console.error(err.message));
</script>
```

## Todo

- wird noch definiert

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.3 (2026-08-11)

- remove vis dependency

### 0.3.2 (2026-08-10)

- switch support link to short link service

### 0.3.1 (2026-08-09)

- fix review problems

### 0.3.0 (2026-08-05)

- Added an independent automatic, light, or dark map color scheme to the Map
  Leaflet and Location Timeline widgets.

### 0.2.5 (2026-08-04)

- The dark theme has been adjusted to make the dialog easier to read.

Older entries are in [CHANGELOG_OLD.md](https://github.com/oweitman/ioBroker.vis-mapwidgets/blob/main/CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 oweitman <oweitman@gmx.de>

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