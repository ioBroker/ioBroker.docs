---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.jetframe/README.md
title: ioBroker.jetframe
hash: /nidYHpoiVmDwthqpQCl4ouR0XiIX9AZ8fIiW+PeLlo=
---
![Logo](../../../en/adapterref/iobroker.jetframe/admin/jetframe.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.jetframe.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.jetframe.svg)
![NPM](https://nodei.co/npm/iobroker.jetframe.png?downloads=true)

# IoBroker.jetframe
## JetFrame
**JetFrame** ist ein ioBroker-Adapter für die Live-Flugverfolgung und -Visualisierung auf Basis von ADS-B-Daten. Er erkennt Flugzeuge, die an Ihrem Fenster vorbeifliegen, und zeigt sie in einer modernen Web-App mit Foto, Fluginformationen und Statistiken an.

## Merkmale
- **Live-Flugverfolgung** via ADS-B (adsb.lol mit automatischem Fallback auf adsb.fi)
- **Fenstererkennung** – zeigt nur Flugzeuge an, die tatsächlich durch Ihr Sichtfeld fliegen
- **Echtzeit-Visualisierung** mit Flugzeugfoto, Airline-Logo, Herstellerlogo und Flugroute
- **Heatmap** – tägliche Statistiken mit Analyse der Beobachtungszeit und optimaler Beobachtungszeit
- **Statistiken** – Rekordtage, Verfolgung schwerer Flugzeuge, Erkennung von Sonderlackierungen
- **Sprachausgabe** – optional, über Browser-TTS oder externe ioBroker-Objekte
- **Startbahnerkennung** – zeigt die wahrscheinliche Start-/Landebahn an
- **Responsive Web-Benutzeroberfläche** – optimiert für iPhone, iPad und Desktop (Hoch- und Querformat)
- **Überflugmodus** – optionale Erkennung von Flugzeugen, die direkt über uns hinwegfliegen
- **Notfallerkennung** – Transpondercodes 7500/7600/7700 werden hervorgehoben

## Anforderungen
- ioBroker js-controller ≥ 6.0.11
- Node.js ≥ 22
- Simple-API-Adapter (für die Weboberfläche)
- ADS-B-Abdeckung in Ihrer Nähe (es werden öffentliche APIs verwendet, kein eigener Empfänger erforderlich)

## Konfiguration
Konfigurieren Sie den Adapter nach der Installation unter **Admin → JetFrame → Instanz → Einstellungen**:

| Schauplatz | Beschreibung |
|---|---|
| **Heimatkoordinaten** | Breitengrad und Längengrad Ihres Standorts |
| **Flughafen** | IATA-Code, Name und Koordinaten des nächstgelegenen Flughafens |
| **Suchradius (nm)** | Radius (Seemeilen) um den Flughafen, der für ADS-B-Abfragen verwendet wird |
| **Fensterausrichtung** | Kompassrichtung Ihrer Fenster (0° = Norden) |
| **Sichtfeld des Fensters** | Sichtfeld Ihres Fensters in Grad (z. B. 90°) |
| **Höhenbegrenzungen** | Minimale/maximale Flughöhe (ft), in der Flugzeuge angezeigt werden |
| **Abfrageintervall** | Wie oft nach neuen Flugzeugen gesucht wird (Suche und Live-Tracking) |
| **Überflüge** | Ermöglicht die Erkennung von Flugzeugen, die direkt über dem Kopf vorbeifliegen |
| **Sprachausgabe** | Browser-TTS, externes ioBroker-Objekt oder deaktiviert |
| **Bilder** | Konfiguration für externe Fluggesellschafts- und Herstellerlogos |

## Web-Oberfläche
JetFrame verwendet einen eigenen, integrierten Webserver – es wird kein Simple-API- oder anderer Adapter benötigt. Die Webanwendung ist direkt erreichbar unter:

```
http://<iobroker-ip>:<webPort>/index.html
```

Der Port (`webPort`, Standard `8189`) ist in den Adaptereinstellungen konfigurierbar.

### Seiten
| Seite | URL | Beschreibung |
|---|---|---|
| **Startseite** | `index.html` | Übersicht, Systemstatus, Navigation |
| **Heatmap** | `heatmap.html` | Tägliche Statistiken und beste Beobachtungszeit |
| **Statistiken** | `stats.html` | Rekorde, Gesamtrangliste, Tagesverlauf |
| **Statistiken** | `stats.html` | Rekorde, Gesamtrangliste, Tagesverlauf |

### URL-Parameter
| Parameter | Beispiel | Beschreibung |
|---|---|---|
| `instance` | `?instance=1` | Adapterinstanz (Standard: `0`) |
| `source` | `?source=overflight` | Anzeigemodus: `current`, `airport`, `overflight` |

### Optional: ioBroker VIS-Integration
Wenn Sie JetFrame-Daten in einem klassischen ioBroker VIS-Widget anstelle (oder zusätzlich zu) den integrierten Seiten anzeigen möchten, kann JetFrame weiterhin ein `vis-config.json` für den Simple-API-Adapter schreiben, sofern Sie `Simple-API Host/IP` und `Simple-API Port` in den Einstellungen konfigurieren. Dies ist optional und für die oben genannten integrierten Webseiten nicht erforderlich.

### Sprache
Die Web-UI-Seiten (`index.html`, `frame.html`, `heatmap.html`, `stats.html`) sind auf Englisch. Die Admin-Konfigurationsseite ist vollständig in alle 11 von ioBroker unterstützten Sprachen übersetzt. Die optionalen Sprachansagen (`speechText`, konfigurierbar über `speechTemplate`) sind standardmäßig auf Deutsch, da es sich um eine benutzerdefinierbare, deutschsprachige Sprachfunktion handelt; die Vorlage kann jedoch frei an jede beliebige Sprache angepasst werden.

## IoBroker-Zustände
Der Adapter erzeugt die folgenden Zustände unter `jetframe.0.*`:

### Status
| Bundesland | Typ | Beschreibung |
|---|---|---|
| `enabled` | Boolescher Wert | Adapter aktivieren/deaktivieren |
| `clearImageCache` | Boolescher Wert | Auslöser: Bildcache leeren |
| `clearImageCache` | Boolescher Wert | Auslöser: Bildcache leeren |

### Aktueller Flug (`current.*`)
| Bundesland | Beschreibung |
|---|---|
| `callsign` | IATA-Rufzeichen (z. B. `LH123`) |
| `routeCodesText` | Route als IATA-Codes (z. B. `FRA → MUC`) |
| `airlineName` | Name der Fluggesellschaft |
| `aircraftTypeText` | Flugzeugtyp (z. B. `Airbus A321`) |
| `aircraftSize` | Größenklasse (`Narrowbody`, `Widebody`, `Jumbo`, …) |
| `registration` | Registrierung (z. B. `D-AIBL`) |
| `altitudeFt` | Höhe in Fuß |
| `speedKt` | Geschwindigkeit in Knoten |
| `verticalRate` | Steig-/Sinkrate (ft/min) |
| `probableRunwayText` | Wahrscheinliche Start- und Landebahn (z. B. `RWY 25L`) |
| `windowPositionText` | Fensterposition (z. B. `left of window · 12°`) |
| `modeVisText` | Modustext (z. B. `🛬 Landing Frankfurt`) |
| `localImageUrl` | URL zum zwischengespeicherten Flugzeugfoto |
| `speechText` | Sprachausgabetext |
| `specialLiveryVisText` | Sonderlackierung (z. B. `100th Anniversary`) |
| `emergencyText` | Notfallinformationen (für Squawk 7500/7600/7700) |
| `emergencyText` | Notfallinformationen (für Squawk 7500/7600/7700) |

### Statistiken (`statistics.today.*`, `statistics.yesterday.*`, `statistics.alltime.*`)
Tägliche Statistiken mit Fluganzahl, Landungen, Abflügen, Überflügen, bester Beobachtungszeit, Zähler für Großraumflugzeuge, Zähler für Sonderlackierungen, Top-Fluggesellschaften und Top-Strecken.

## Bilder & Logos
JetFrame kann Flugzeugfotos, Airline-Logos und Herstellerlogos anzeigen. Standardmäßig werden diese über öffentliche APIs abgerufen (JetPhotos für Fotos, HexDB für Strecken-/Airline-Daten). Externe Logoquellen lassen sich in den Adaptereinstellungen konfigurieren. Optionales lokales Caching reduziert externe Anfragen und beschleunigt die Anzeige.

## Datenschutz- und Rechtshinweise
JetFrame fragt öffentliche ADS-B-APIs ab:

- **[adsb.lol](https://adsb.lol)** – primäre Datenquelle
- **[adsb.fi](https://adsb.fi)** – automatischer Fallback
- **[Jetphotos.com](https://www.jetphotos.com)** – Flugzeugfotos (nur URL-Abfrage, kein Download, es sei denn, Caching ist aktiviert)
- **[HexDB.io](https://hexdb.io)** – Strecken- und Airline-Informationen
- **[Flightradar24](https://www.flightradar24.com)** – ergänzende Routeninformationen

Alle Daten werden ausschließlich lokal innerhalb von ioBroker gespeichert. Es werden keine Benutzerdaten an Dritte weitergegeben.

ADS-B-Daten bestehen aus öffentlich ausgestrahlten Signalen, die von Flugzeugen gesendet werden. Ihre Nutzung ist in den meisten Ländern legal und wird von den Luftfahrtbehörden toleriert. Die Verantwortung für die rechtmäßige Nutzung liegt beim Betreiber.

Alle Marken, Logos, Airline-Namen, Flugzeugbilder und zugehörigen Inhalte bleiben Eigentum ihrer jeweiligen Rechteinhaber. JetFrame steht in keiner Verbindung zu Fluggesellschaften, Flughäfen, Flugzeugherstellern, JetPhotos, ADS-B-Anbietern oder Flugverfolgungsdiensten und wird von diesen weder unterstützt noch offiziell empfohlen.

Dieser Adapter ist ausschließlich für die private, informative und nichtkommerzielle lokale Visualisierung bestimmt. Die Nutzer sind für die Einhaltung der Lizenz- und API-Bedingungen der konfigurierten externen Dienste verantwortlich.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.3 (2026-08-11)

- (backfisch88) Fixed a flicker regression on the Statistics page (Yesterday/Top Airlines/Top Routes panels) caused by two competing DOM-update mechanisms; unified into a single, race-free update path. Reduced daily history to 5 entries and expanded alltime airline/route rankings to top 10 with column-fill layout. Fixed intermittent mouse-wheel scrolling on the Heatmap hour scroller (scroll-snap was fighting small wheel deltas).

### 1.3.2 (2026-08-09)

- (backfisch88) Translated the remaining hardcoded English hour-card badges (NOW/PEAK/HR) on the Heatmap page to follow the `webLanguage` setting.

### 1.3.1 (2026-08-09)

- (backfisch88) Fixed flicker on all web UI pages caused by redundant DOM writes on every poll cycle (most noticeable on the Live Frame page). Added mouse wheel and click-and-drag support for the heatmap hour scroller (previously touch-only). Fixed runway/window-position display logic that only recognized German words, breaking display in English mode.

### 1.3.0 (2026-08-08)

- (backfisch88) Full bilingual support (English/German) for both the web UI and all dynamic flight/statistics text written to states, following a new `webLanguage` setting (auto/en/de). Adapter log messages remain English-only regardless of this setting, as required.
- (backfisch88) Fixed 404s for cached aircraft/airline images after the Simple-API removal; images are now served directly by the built-in web server.
- (backfisch88) Fixed relative HTTP redirects causing "Invalid URL" errors in external API requests.
- (backfisch88) HTTP 400/404 responses from external flight-data APIs (expected for aircraft with no available data) are now logged at debug level instead of warn.
- (backfisch88) Fixed a visual flicker on the Live Frame page caused by redundant DOM updates every 5 seconds.
- (backfisch88) Various smaller layout and translation fixes across the web UI.

### 1.2.0 (2026-08-07)

- (backfisch88) JetFrame now runs its own built-in web server for the user-facing pages (index.html, frame.html, heatmap.html, stats.html) - no external Simple-API adapter is required anymore. New `webPort` setting (default 8189). Simple-API config is now optional and only used for classic ioBroker VIS widget integration.

Older entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 backfisch88 <h@h.de>

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