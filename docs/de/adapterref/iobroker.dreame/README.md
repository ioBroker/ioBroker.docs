---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dreame/README.md
title: ioBroker.dreame
hash: m3Z73x1GlLvBtpVNeaPYWbjy5ChBc34At6Z39b6bxzQ=
---
![Logo](../../../en/adapterref/iobroker.dreame/admin/dreame.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.dreame.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.dreame.svg)
![Anzahl der Installationen](https://iobroker.live/badges/dreame-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/dreame-stable.svg)
![NPM](https://nodei.co/npm/iobroker.dreame.png?downloads=true)

# IoBroker.dreame
**Tests:** ![Testen und Freigeben](https://github.com/TA2k/ioBroker.dreame/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Dreame-Adapter für ioBroker
Adapter für dreame home Geräte getestet mit L10 L20 und x40

#### Geräte-ID.status
Aktueller Status der Geräte

#### Geräte-ID.remote
Fernsteuerung der Geräte Start: dreame.0.xxxxx.remote.start-sweep Stopp: dreame.0.xxxxx.remote.start-charge

Verknüpfung zum Start:

dreame.0.XXXXXXXX.remote.start-clean

```
[
                {
                    "piid": 1,
                    "value": 25
                },
                {
                    "piid": 10,
                    "value": "32"
                }
]
```

"Wert": "32" -> Verknüpfungs-ID

Liste der Tastenkombinationen:

dreame.0.XXXXX.status.4-48

Namen sind base64 kodiert. Wenn es keinen 4-48-Status gibt, müssen Sie eine Abkürzung nehmen.

### Zimmerreinigung
dreame.0.XXXX.remote.start-clean

```
 [
                {
                    "piid": 1,
                    "value": 18
                },
                {
                    "piid": 10,
                    "value": "{\"selects\":[[X,1,3,2,1]]}"
                }
            ]
```

X = Zimmer-ID

Mehrere Räume:

```
 [
                {
                    "piid": 1,
                    "value": 18
                },
                {
                    "piid": 10,
                    "value": "{\"selects\":[[X,1,3,2,1],[Y,1,3,2,1]]}"
                }
            ]
```

X = Raum 1 Y = Raum 2

Karte wechseln dreame.XXXXXXX.remote.update-map

```
 [
                {
                    "piid": 4,
                    "value": "{\"sm\":{},\"mapid\":X}"
                }
            ]
```

X = mapId dreame.0.XXXX.status.6-99 oder dreame.0.XXXX.map.curid

### Reinigungsmodi steuern
CleanGenius aktivieren: dreame.0.XXXXXX.remote.customCommand

```
[
  {
    "value": "{\"k\":\"SmartHost\",\"v\":1}",
    "siid": 4,
    "piid": 50
  }
]
```

CleanGenius deaktivieren:

```
[
  {
    "value": "{\"k\":\"SmartHost\",\"v\":0}",
    "siid": 4,
    "piid": 50
  }
]
```

CleanGenius Tiefenreinigung: \"v\":2

CleanGenius-Modus: Wert: 3 oder Wert 2

```
[
            {

                "value": 2,
                "siid": 28,
                "piid": 5
            }
        ]

```

Reinigungsmodus ändern:

```
[
{

                "value": 5122,
                "siid": 4,
                "piid": 23
            }
        ]
```

Werte: 5120, 5121, 5122...

Vakuummodus:

```
[
{

                "value": 2,
                "siid": 4,
                "piid": 4
            }
        ]

```

Wischintensität:

```
[
            {

                "value": 28,
                "siid": 28,
                "piid": 1
            }
        ]
```

Route:

```
 [
            {

                "value": "{\"k\":\"CleanRoute\",\"v\":1}",
                "siid": 4,
                "piid": 50
            }
        ]
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.2 (2025-01-24)

- reduce cpu load while cleaning

### 0.2.1 (2025-01-15)

- fix for canvas installation

### 0.2.0 (2024-12-28)

- add simple maps

### 0.1.0 (2024-12-14)

- bugfixes

### 0.1.0 (2024-12-14)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2024-2030 TA2k <tombox2020@gmail.com>

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

````

```

```
````