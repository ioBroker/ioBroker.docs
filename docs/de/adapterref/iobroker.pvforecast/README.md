---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.pvforecast?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.pvforecast?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.pvforecast?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.pvforecast?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.pvforecast?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.pvforecast/test-and-release.yml?branch=main&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.pvforecast.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/pvforecast-stable.svg
BADGE-Installed: http://iobroker.live/badges/pvforecast-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.pvforecast/README.md":{"title":{"de":"ioBroker.pvforecast"},"content":"de/adapterref/iobroker.pvforecast/README.md"},"de/adapterref/iobroker.pvforecast/vis.md":{"title":{"de":"ioBroker.pvforecast - VIS"},"content":"de/adapterref/iobroker.pvforecast/vis.md"}}}
---
![Logo](../../admin/pvforecast.png)

# ioBroker.pvforecast

Dieser Adapter ersetzt das JavaScript aus dem [ioBroker forum](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter)

Der Adapter holt die Grunddaten von verschiedenen Prognosediensten und stellt sie als ioBroker-States bereit.

## Unterstützte Prognosedienste

- **Forecast.solar** - https://forecast.solar
- **Solcast** - https://solcast.com
- **SolarPredictionAPI** - via RapidAPI
- **pvnode** - https://pvnode.com

## Einstellungen

1. Längengrad (-180 (West) … 180 (Ost))
2. Breitengrad -90 (Süd) … 90 (Nord)
3. Link zu Seite
4. Api Schlüssel
5. Diagramm Y-Achse Stufe
6. Zeitplan Datenabfrage(min) - Zeitplan aller x Minuten die Daten vom Server abgerufen werden sollen.

![pvforecast options](https://user-images.githubusercontent.com/76852173/155196476-8c8210d9-bdb2-456b-a0aa-1dd411efea5e.JPG)

Mit einem Api-Schlüssel kann zusätzlich das Wetter bezogen werden (nur Forecast.solar).

1. datetime - Datum und Uhrzeit
2. sky - Wert zwischen 0 und 1 prozentual für klaren Himmel [1 =  klarer Himmel].
3. Temperatur [°C]
4. Zustand - text
5. icon - text + nummer
6. Wind Geschwindigkeit -  [km/h]
7. Wind winkel - Norden 0°[Uhrzeigersinn]. (Wenn die Windgeschwindigkeit ist Null, wird der Wert nicht definiert)
8. Wind richtung - Short name
9. Höhere Zeitauflösung

## Für die Anlage stehen folgende Einstellungen zu Verfügung

1. Neigung (0°-90°)
2. Azimuth (-180 = north, -90 = east, 0 = south, 90 = west, 180 = north)
3. Anlagenleistung (kWp)
4. Anlagenname
5. Diagramm Legenden Name
9. Diagramm Farbe
10. Diagramm Label Farbe

![pvforecast pvsystem](https://user-images.githubusercontent.com/76852173/155196535-6828775a-8234-4a6a-b2a3-03d7fd88c80d.JPG)

All diese Information werden benötigt um eine saubere Funktion des Adapters gewährleisten zu können.

Falls der Längen und Breitengrad schon im System hinterlegt ist, trägt das System die Daten automatisch in die Felder ein.

## pvnode

[pvnode](https://pvnode.com) ist ein deutscher Dienst, der hochauflösende PV-Prognosen mit 15-Minuten-Intervallen liefert.

![pvforecast pvnode options](img/pvforecast-pvnode-options.png)

### pvnode Konfiguration

1. **API-Key**: Erstellen Sie einen API-Schlüssel unter https://pvnode.com/api-keys
2. **Bezahltes Konto**: Aktivieren Sie diese Option, wenn Sie ein bezahltes pvnode-Konto besitzen
3. **Prognosetage**: Anzahl der Prognosetage (nur bei bezahltem Konto, max. 7). Kostenlose Konten erhalten automatisch 1 Tag.
4. **Abfrageintervall**: Empfohlen: 90 Minuten (pvnode aktualisiert 16x pro Tag)
5. **Zusätzliche Parameter**: Optionale API-Parameter wie z.B. `diffuse_radiation_model=perez&snow_slide_coefficient=0.5`

### pvnode Kontotypen

| Funktion | Kostenlos | Bezahlt |
|----------|-----------|---------|
| API-Anfragen/Monat | 40 | 1.000 |
| Prognosetage | 1 (heute + morgen) | bis zu 7 |
| Historische Daten | nein | ja (-30 Tage) |
| Standorte | 1 | mehrere |

**Wichtig**: Aktivieren Sie die Option "Bezahltes Konto" nur, wenn Sie tatsächlich ein bezahltes pvnode-Konto haben. Andernfalls kann es zu API-Fehlern kommen, da der Adapter nicht automatisch erkennen kann, welchen Kontotyp Sie verwenden.

### pvnode Zusätzliche Parameter

Über das Feld "Zusätzliche Parameter" können folgende optionale API-Parameter übergeben werden:

| Parameter | Beschreibung | Beispiel |
|-----------|--------------|---------|
| `diffuse_radiation_model` | Strahlungsmodell | `perez` |
| `snow_slide_coefficient` | Schneerutsch-Koeffizient (0.0-0.8) | `0.5` |
| `shading_config` | Verschattungskonfiguration | `7:2:3:1_1:1:0:0_0:0:0:0` |

Format: `key1=value1&key2=value2`

### pvnode Besonderheiten

- **15-Minuten-Auflösung**: pvnode liefert Prognosedaten in 15-Minuten-Intervallen
- **Azimuth-Konvertierung**: Der Adapter konvertiert automatisch den Azimuth-Wert (Adapter: 0=Süd) in das pvnode-Format (180=Süd)
- **Anfragen-Bündelung**: Bei mehreren konfigurierten Anlagen werden automatisch bis zu 2 Anlagen pro API-Anfrage gebündelt (pvnode `second_array` Feature). Dies reduziert die Anzahl der API-Aufrufe (z.B. 2 Anlagen = 1 Anfrage statt 2). Die kombinierten Prognosedaten werden bei der ersten Anlage gespeichert; die zweite Anlage wird als gebündelt markiert.
- **Summary-Daten**: Das Summary-JSON enthält Clearsky-Werte (summiert über alle Anlagen) sowie Temperatur und Wettercode (jeweils der Wert der ersten Anlage).
- **Zeitzonen**: Die pvnode API liefert Timestamps in UTC. Der Adapter konvertiert diese automatisch in die lokale Systemzeit.
- Die Felder "Dämpfung morgens" und "Dämpfung abends" werden für pvnode nicht verwendet

## VIS Beispiel

Bevor das Beispiel geladen werden kann, bitte installiert: [Material Design](https://github.com/Scrounger/ioBroker.vis-materialdesign).
Wenn ihr in der ioBroker Vis die Json Diagramme und Tabellen benutzen möchtet, findet ihr hier ein [Beispiel](./vis.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 6.0.0 (2026-04-10)

- (@patricknitsch) Added pvnode als alternative Provider
- (copilot) Adapter requires admin >= 7.7.22 now

### 5.1.0 (2026-02-03)

* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@Scrounger) solcast user agent bug fix
* (@klein0r) Updated dependencies

### 5.0.0 (2025-04-23)

NodeJS >= 20.x and js-controller >= 6 is required

* (@klein0r) Minimum peak power is 0.1 kWp

### 4.1.0 (2024-11-15)

* (@klein0r) Added estimated energy: now until end of day
* (@simatec) Admin-UI has been adapted for small displays

### 4.0.1 (2024-10-22)

* (@klein0r) Fixed: Missing color settings for new Solcast table

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 Patrick-Walther
                        Matthias Kleine <info@haus-automatisierung.com>

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