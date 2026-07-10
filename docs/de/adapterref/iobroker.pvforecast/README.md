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

[pvnode](https://pvnode.com) ist ein deutscher Dienst für hochauflösende PV-Prognosen mit 15-Minuten-Intervallen. Der Adapter unterstützt sowohl **API v1** (Anlagenkonfiguration im Adapter) als auch **API v2** (Anlagenkonfiguration im pvnode-Portal per Site-ID).

> **Warnung**: pvnode API v1 wird am **31.12.2026** abgeschaltet. Ab dem **01.01.2027** gibt der Adapter einen Fehler aus und stoppt das Polling, wenn v1 konfiguriert ist. Eine Migration auf API v2 ist erforderlich — siehe [pvnode API v2](#pvnode-api-v2-empfohlen) unten.

### pvnode Kontostufen

| Funktion | Free | Light | Plus |
|----------|------|-------|------|
| API-Anfragen/Monat | 250 | 3.000 | 3.000 |
| Updates pro Tag | 1 | 24 (stündlich) | 144 (alle 10 min) |
| Prognosetage | 1-2 (heute + morgen) | 1-7 | 1-7 |
| Solarflächen | bis 4 | bis 4 | bis 8 |
| Historische Daten | nein | nein | 30 Tage |

Das **Abfrageintervall** wird vom Adapter automatisch anhand der gewählten Kontostufe gesetzt und muss nicht manuell konfiguriert werden:

| Stufe | Automatisches Intervall |
|-------|------------------------|
| Free | 24 Stunden |
| Light | 60 Minuten |
| Plus | 10 Minuten (Nowcasting) |

### pvnode API v2 (empfohlen)

In API v2 wird die gesamte Anlagenkonfiguration (Ausrichtung, Neigung, Leistung) direkt im pvnode-Portal über eine **Site-ID** verwaltet. Der Adapter benötigt nur die Site-ID — keine Azimuth-/Neigungs-/Leistungsangaben im Adapter.

**Voraussetzung:** Vor der Adapterkonfiguration muss im pvnode-Portal eine Site erstellt werden: https://pvnode.com/sites/new. Dort werden alle Solarflächen (Strings) mit Ausrichtung, Neigung und Spitzenleistung hinterlegt. Nach dem Speichern stellt das Portal die Site-ID bereit.

**Konfiguration:**

1. **API-Key**: Erstellen unter https://pvnode.com/api-keys
2. **pvnode API v2 verwenden**: Checkbox aktivieren
3. **pvnode Site-ID**: Site-ID aus dem pvnode-Portal (z.B. `site_xxxx…`)
4. **Abonnementstufe**: Free / Light / Plus (bestimmt das Abrufintervall automatisch)
5. **Prognosetage**: Anzahl der Prognosetage (Free: max. 2 – heute und morgen; Light/Plus: max. 7)

**Anlagentabelle (v2):** Es wird mindestens ein Eintrag benötigt. Der Name dient der Anzeige; die optionale Spitzenleistung wird für den State „Installierte Leistung" verwendet. Der Adapter fragt String-Daten von der v2-API ab und ordnet jeden String der konfigurierten Anlage nach Position zu (Anlage 1 → String 0, Anlage 2 → String 1 usw.). Damit sind echte Pro-Flächen-Prognosen möglich. Falls keine String-Daten verfügbar sind, wird der Gesamtwert der Site unter der ersten Anlage gespeichert.

### pvnode API v1

In API v1 werden Azimuth, Neigung und Leistung pro Anlage direkt im Adapter konfiguriert. Jede Anlage erhält einen eigenen API-Aufruf.

**Konfiguration:**

1. **API-Key**: Erstellen unter https://pvnode.com/api-keys
2. **pvnode API v2 verwenden**: Checkbox deaktiviert lassen
3. **Abonnementstufe**: Free / Light / Plus
4. **Prognosetage**: Anzahl der Prognosetage (Free: max. 2 – heute und morgen; Light/Plus: max. 7)
5. **Zusätzliche Parameter**: Optionale API-Parameter (nur v1), z.B. `diffuse_radiation_model=perez&snow_slide_coefficient=0.5`

**Rotierendes Abrufverfahren (v1):** Bei mehreren Anlagen wird beim Start einmalig jede Anlage abgefragt. Danach wird pro Zyklus nur eine Anlage abgefragt (reihum). Mit N Anlagen und Intervall T wird jede Anlage alle N×T aktualisiert. Beispiel: 3 Anlagen, Light-Tier (60 min) → jede Anlage alle 3 Stunden, 1 API-Aufruf pro Stunde.

### pvnode Zusätzliche Parameter (nur v1)

| Parameter | Beschreibung | Beispiel |
|-----------|--------------|---------|
| `diffuse_radiation_model` | Strahlungsmodell | `perez` |
| `snow_slide_coefficient` | Schneerutsch-Koeffizient (0.0–0.8) | `0.5` |
| `shading_config` | Verschattungskonfiguration | `7:2:3:1_1:1:0:0_0:0:0:0` |

Format: `key1=value1&key2=value2`

### pvnode Besonderheiten

- **15-Minuten-Auflösung**: pvnode liefert Prognosedaten in 15-Minuten-Intervallen (v1 und v2)
- **Azimuth-Konvertierung**: Der Adapter konvertiert automatisch den Azimuth-Wert (Adapter: 0=Süd) in das pvnode-Format (180=Süd)
- **Abfrageintervall**: Wird automatisch anhand der Kontostufe gesetzt — keine manuelle Konfiguration notwendig
- **Pro-Flächen-Prognosen (v2)**: Wenn der pvnode-Account String-Daten liefert, erhält jede konfigurierte Anlage ihre eigene Prognose. Clearsky-Werte, Temperatur und Wettercode stammen aus den Site-weiten Daten.
- **Summary-Daten**: Das Summary-JSON enthält Clearsky-Werte sowie Temperatur und Wettercode
- Die Felder „Dämpfung morgens" und „Dämpfung abends" werden für pvnode nicht verwendet

## VIS Beispiel

Bevor das Beispiel geladen werden kann, bitte installiert: [Material Design](https://github.com/Scrounger/ioBroker.vis-materialdesign).
Wenn ihr in der ioBroker Vis die Json Diagramme und Tabellen benutzen möchtet, findet ihr hier ein [Beispiel](./vis.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (@patricknitsch) Change Free Tier Forecast from only today to today and tomorrow

### 6.2.0 (2026-07-06)
- (@patricknitsch) pvnode API v2 support: plant configuration via Site ID in the pvnode portal — create a site at https://pvnode.com/sites/new
- (@patricknitsch) pvnode v2: per-string forecasts — each configured plant receives its own forecast matched by index (plant 1 → string 0, etc.)
- (@patricknitsch) pvnode subscription tiers (Free / Light / Plus) replace the old paid-account checkbox; poll interval is set automatically per tier
- (@patricknitsch) pvnode v1: rotating round-robin fetch — one plant per poll cycle instead of one combined request; each plant receives an individual API call
- (@patricknitsch) Poll interval field hidden for pvnode (auto-managed)
- (@patricknitsch) Update Documentation of pvnode
- (@patricknitsch) Include warning for v1 and error after 31.12.26. The adapter cannot use v1 after this date anymore

### 6.1.0 (2026-04-26)
- (@mcm1957) Adapter requires node.js >= 22, js-controller >= 6.0.11 and admin >= 7.7.22 now
- (@mcm1957) Dependencies have been updated

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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