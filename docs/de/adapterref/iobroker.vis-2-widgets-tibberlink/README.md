---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-tibberlink/README.md
title: ioBroker.vis-2-widgets-tibberlink
hash: X6Db+uWN+Bz9V0ZoKn1m9nOnxIoH2alS7CFXEzJb6iI=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/admin/vis-2-widgets-tibberlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-tibberlink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-tibberlink.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vis-2-widgets-tibberlink-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vis-2-widgets-tibberlink-stable.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-tibberlink.png?downloads=true)

# IoBroker.vis-2-widgets-tibberlink
**Tests:** ![Test und Freigabe](https://github.com/ssbingo/ioBroker.vis-2-widgets-tibberlink/workflows/Test%20and%20Release/badge.svg)

## Vis-2-widgets-tibberlink-Adapter für ioBroker
VIS-2-Widgets zur Visualisierung dynamischer Stromtarifdaten von Tibber: aktueller Preis, günstigstes Zeitfenster und monatliche Kosten.

Mehr Informationen zu Tibber und seinen dynamischen Tarifen: <https://tibber.com/>

## Voraussetzungen
Dieser Widget-Adapter ruft **keine** Daten von Tibber selbst ab. Er liest Zustände, die vom Datenadapter [`iobroker.tibberlink`](https://github.com/hombach/ioBroker.tibberlink) erstellt werden. Installieren und konfigurieren Sie `tibberlink`, bevor Sie diese Widgets verwenden:

1. Installieren Sie `iobroker.tibberlink` und geben Sie Ihr Tibber-API-Token ein (von <https://developer.tibber.com/settings/accesstoken>).
2. Aktivieren Sie in den Tibberlink-Einstellungen die Option „Abruf historischer Verbrauchsdaten“ und legen Sie die Anzahl der Datensätze pro Tag auf mindestens 31 fest (erforderlich für Widget 3).
3. Die Preis-Widgets (Widget 1 und 2) funktionieren automatisch, sobald tibberlink läuft – es werden keine Calculator-Kanäle benötigt.

Ihre **Home-ID** ist die UUID, die im ioBroker-Objektbaum unter `tibberlink.0.Homes.<UUID>` sichtbar ist, z. B. `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

## Widgets
### Widget 1 — Aktueller Tibber-Preis
![Aktueller Tibberpreis](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/docs/img/vis-2-widget-Strompreis.png)

Zeigt den aktuellen Strompreis in großer Schrift, eine farbcodierte Preisstufe (SEHR_GÜNSTIG … SEHR_TEUER), die Gültigkeitsdauer und optional eine Kostenaufschlüsselung an.

| Option | Standard | Beschreibung |
|---|---|---|
| `oid_total` | `…CurrentPrice.total` | Gesamtpreis in €/kWh |
| `oid_tax` | `…CurrentPrice.tax` | Steuern / Zuschläge in €/kWh |
| `oid_level` | `…CurrentPrice.level` | Preisniveau-Zeichenkette |
| `oid_startsAt` | `…CurrentPrice.startsAt` | ISO-Zeitstempel der aktuellen Stunde |
| `show_breakdown` | `true` | Energie- und Steuerkacheln anzeigen |
| `currency` | `ct/kWh` | Einheitenbezeichnung nach dem Preis |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |

---

### Widget 2 — Günstigstes Zeitfenster
![Günstigstes Zeitfenster](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/docs/img/vis-2-widget-Cheapest-Window.png)

Verwendet einen gleitenden Fensteralgorithmus, um den günstigsten zusammenhängenden N-Stunden-Block in den heutigen (und optional auch morgigen) Kursdaten zu finden. Angezeigt werden Start- und Endzeit, Durchschnittspreis und ein farbcodiertes Sparkline-Balkendiagramm. Die Slot-Dauer (15 Min. / 60 Min.) wird automatisch erkannt.

| Option | Standard | Beschreibung |
|---|---|---|
| `oid_prices_today` | `…PricesToday.json` | JSON-Array der heutigen Preisplätze |
| `amount_hours` | `3` | Fenstergröße in Stunden |
| `future_only` | `true` | Bereits beendete Slots ignorieren |
| `show_tomorrow` | `true` | Preise von morgen einbeziehen |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |

---

### Widget 3 — Live-Stromverbrauch
Zeigt den Stromverbrauch in Echtzeit in großer Schrift zusammen mit Minimal-, Durchschnitts- und Maximalwerten sowie dem kumulierten Tagesverbrauch und den Kosten an. Erfordert ein **Tibber Pulse**-Gerät, das an Ihren Zähler angeschlossen ist.

| Option | Standard | Beschreibung |
|---|---|---|
| `oid_power` | `…LiveMeasurement.power` | Aktuelle Leistung in W |
| `oid_avgpower` | `…LiveMeasurement.averagePower` | Sitzungsdurchschnitt in W |
| `oid_maxpower` | `…LiveMeasurement.maxPower` | Sitzungsmaximum in W |
| `oid_consumption` | `…LiveMeasurement.accumulatedConsumption` | Täglicher Verbrauch in kWh |
| `oid_cost` | `…LiveMeasurement.accumulatedCost` | Tageskosten in € |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |

---

### Widget 4 — Monatliche Stromkosten
![Monatliche Stromkosten](../../../en/adapterref/iobroker.vis-2-widgets-tibberlink/docs/img/vis-2-widget-Monatskosten.png)

Aggregiert die Tibberlink-Verbrauchsdaten für den aktuellen Kalendermonat. Angezeigt werden Gesamtkosten, Gesamtverbrauch, Durchschnittspreis, eine Prognose zum Monatsende sowie ein Fortschrittsbalken, der den aktuellen Stand im Monat anzeigt. Erfordert die Aktivierung des **Abrufs historischer Verbrauchsdaten** in Tibberlink mit mindestens 31 Datensätzen pro Tag.

| Option | Standard | Beschreibung |
|---|---|---|
| `oid_jsonDaily` | `…Consumption.jsonDaily` | JSON-Array mit täglichen Verbrauchsdatensätzen |
| `show_base_fee` | `false` | Eine feste monatliche Grundgebühr zu den Gesamtsummen hinzufügen |
| `base_fee_per_month` | `0` | Grundgebühr in € (wird verwendet, wenn `show_base_fee` aktiviert ist) |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |
| `tib_darkmode` | `true` | Dunkles (Standard) oder helles Design |

## Dokumentation
- 🇬🇧 Englisch — diese Datei
- 🇩🇪 [Deutsch](docs/de/README.md)
- 🇷🇺 [Russisch](docs/ru/README.md)
- 🇳🇱 [Niederländisch](docs/nl/README.md)
- 🇫🇷 [Français](docs/fr/README.md)
- 🇮🇹 [Italiano](docs/it/README.md)
- 🇪🇸 [Español](docs/es/README.md)
- 🇵🇱 [Polski](docs/pl/README.md)
- 🇵🇹 [Português](docs/pt/README.md)
- 🇺🇦 [Українська](docs/uk/README.md)
- 🇨🇳 [简体中文](docs/zh-cn/README.md)

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.4.5 (2026-04-29)
* (ssbingo) Fix common.news to remove unpublished versions; fix Dependabot config for src-widgets

### 0.4.4 (2026-04-29)
* (ssbingo) Fix widget build output directory so vis-2 can load customWidgets.js from the correct path

### 0.4.3 (2026-04-29)
* (ssbingo) Add widget screenshots to documentation

### 0.4.2 (2026-04-29)
* (ssbingo) Fix widget file path so vis-2 can load customWidgets.js correctly

### 0.4.1 (2026-04-29)
* (ssbingo) Fix live view widget positioning; fix monthly cost widget showing previous month instead of current month

### 0.4.0 (2026-04-28)
* (ssbingo) Migrate all widgets to React/Module Federation (proper install/uninstall lifecycle, no more widgets.html patching)

### 0.3.3 (2026-04-26)
* (ssbingo) Update documentation

### 0.3.2 (2026-04-26)
* (ssbingo) Widget 2: replace price chart with TibberCheapestWindow (cheapest N-hour sliding window with sparkline)

### 0.3.1 (2026-04-25)
* (ssbingo) Widget 1: rename oid_price→oid_total, add oid_startsAt, show_breakdown and currency options

### 0.3.0 (2026-04-24)
* (ssbingo) New widget: monthly electricity cost with consumption, avg. price and projection

Older changelog entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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