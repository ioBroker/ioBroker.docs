---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meteonomiqs/README.md
title: ioBroker.meteonomiqs
hash: +MspArVqcrGGytPar66V+P6X2ukIe2XTZ9GtFYqUMVc=
---
![Logo](../../../en/adapterref/iobroker.meteonomiqs/admin/meteonomiqs.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.meteonomiqs.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meteonomiqs.svg)
![Anzahl der Installationen](https://iobroker.live/badges/meteonomiqs-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/meteonomiqs-stable.svg)
![Lizenz](https://img.shields.io/github/license/Schimi1983/ioBroker.meteonomiqs)
![Test und Freigabe](https://github.com/Schimi1983/ioBroker.meteonomiqs/actions/workflows/test-and-release.yml/badge.svg)
![NPM](https://nodei.co/npm/iobroker.meteonomiqs.png?downloads=true)
![GitHub-Sponsoren](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white)

# ioBroker.meteonomiqs

**Deutsche Anleitung:** [docs/de/README.md](https://github.com/Schimi1983/ioBroker.meteonomiqs/blob/main/docs/de/README.md)

Die Wettervorhersage von **wetter.com** in Ihrem ioBroker: bis zu 14 Tage, stündlich, mit Wetterwarnungen sowie Sonnenaufgangs- und Sonnenuntergangszeiten. Ein kostenloser Schlüssel von wetter.com (Meteonomiqs) genügt.

---

## Schnellstart

1. Holen Sie sich einen kostenlosen API-Schlüssel von [Meteonomiqs](https://www.meteonomiqs.com/de/wetter-api/) .
2. Überprüfen Sie, ob Ihr Standort in ioBroker unter _Einstellungen → System → Standort_ eingestellt ist.
3. Installieren Sie den Adapter im Adminbereich (Registerkarte „ _Adapter_ “, suchen Sie nach „meteonomiqs“).
4. Öffnen Sie die Instanzeinstellungen, fügen Sie den Schlüssel in das **Feld „API-Schlüssel“** ein und klicken Sie auf _„Speichern und schließen“_ .

Erledigt. Der Adapter ruft die Vorhersage sofort und dann dreimal täglich ab. Die Werte finden Sie unter `meteonomiqs.0` im Reiter _„Objekte“_ . Sie müssen keine weiteren Einstellungen ändern.

---

## Was Sie erhalten

- **Tagesvorhersage** für bis zu 14 Tage: Temperatur, Regen, Wind, Bewölkung, Sonnenstunden und mehr
- **Morgen, Nachmittag, Abend und Nacht** für jeden Tag
- **Stündliche Werte** für die nächsten Tage
- **Die aktuelle Stunde** in einem eigenen Ordner `current` stündlich aktualisiert
- **Wetterwarnungen** mit Text und Stufe 0–4
- **Sonne und Mond** : Sonnenaufgang, Sonnenuntergang, Tageslänge, Mondphase
- **Wettersymbole** von wetter.com, bereit für Ihre Visualisierung

---

## Anhand der Werte

Die wichtigsten Datenpunkte:

| Was du willst                           | Datenpunkt                                                     |
| --------------------------------------- | -------------------------------------------------------------- |
| Aktuelle Temperatur                     | `meteonomiqs.0.current.temp`                                   |
| Aktuelles Wetter als Text und Symbol    | `current.weather_text`, `current.weather_icon`                 |
| Heutige Tiefst- und Höchstwerte         | `day_0.temp_min`, `day_0.temp_max`                             |
| Wird es morgen regnen?                  | `day_1.prec_probability` (In %), `day_1.prec_sum` (in mm)       |
| Windkraft                               | `current.wind_bft` (Beaufort 0–12), `current.wind_gusts` (km/h) |
| Gibt es eine Wetterwarnung?             | `day_0.warn_active` (wahr/falsch), `day_0.warn_text`            |
| Sonnenaufgang und Sonnenuntergang heute | `current.sunrise`, `current.sunset`                            |

`day_0` ist heute `day_1` morgen, `day_2` am übermorgen und so weiter.

Ein paar Ideen für Skripte oder Blockly:

- **Schützen Sie die Markise:** Fahren Sie sie ein, wenn `current.wind_bft` erreicht 6 oder mehr.
- **Gießen auslassen:** Gießen Sie den Garten nicht, wenn `day_0.prec_probability` liegt über 70.
- **Warnen Sie die Familie:** Senden Sie eine Nachricht, wenn `day_0.warn_active` wird wahr, mit `day_0.warn_text` als die Botschaft.

Bei Widgets in VIS, Jarvis oder Material ist die gesamte Prognose in einem einzigen Datenpunkt enthalten: `forecast_json` (Tage) und `hourly_json` (Uhrzeit von heute).

Alle Werte sind **Prognosen** , keine Messwerte.

---

## Einstellungen

Die Standardeinstellungen entsprechen dem kostenlosen Tarif. Sie müssen lediglich den API-Schlüssel eingeben. Alles andere ist optional.

### Registerkarte „Allgemein“

| Einstellung                               | Was es tut                                                                                                                                                            |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API-Schlüssel                             | Ihr Schlüssel von Meteonomiqs. **Erforderlich.**                                                                                                                      |
| Verwenden Sie den ioBroker-Systemstandort | Standardmäßig aktiviert. Deaktivieren Sie es, wenn Sie die Wetterdaten für einen anderen Ort abrufen möchten, und geben Sie anschließend Längen- und Breitengrad ein. |
| Sprache der Wettertexte                   | Sprache von Texten wie „teilweise bewölkt“. Leer bedeutet die Sprache Ihres ioBrokers.                                                                                |
| Vorhersagetage                            | 1 bis 14 (Standard 7). Weitere Tage verursachen keine zusätzlichen Kosten.                                                                                            |

### Registerkarte „Zeitplan“

Wenn der Adapter die Prognose abruft. Standardmäßig: **01:10, 11:40 und 18:40** . Jede Zeile kostet einen Aufruf pro Tag.

Die **Priorität** gibt an, wie wichtig ein Abruf ist. 1 ist die höchste Priorität. Sollten die Abrufe im Monat knapp werden, wird die Zeile mit der höchsten Priorität zuerst abgebrochen. Bei den Standardeinstellungen und dem kostenlosen Tarif tritt dies in einem normalen Monat nicht auf.

### Registerkarte „Monatliches Limit“

Der kostenlose Tarif beinhaltet **100 Anrufe pro Monat** . Der Adapter verteilt diese automatisch über den Monat. Ändern Sie die Nummer nur, wenn Sie einen anderen Tarif haben.

### Registerkarte „Daten“

Wählen Sie aus, welche Werte erstellt werden sollen. Die Aktivierung weiterer Optionen **verursacht keine zusätzlichen Aufrufe** , sondern lediglich mehr Datenpunkte. Standardmäßig ist alles aktiviert.

| Einstellung                                                 | Was es tut                                                                              |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Tagesabschnitte                                             | Morgen, Nachmittag, Abend und Nacht pro Tag                                             |
| Stundenwerte                                                | Ein Wert pro Stunde, standardmäßig für 2 Tage. Auf einem Raspberry Pi reicht 1 Tag aus. |
| Aktuelle Stunde                                             | Der Ordner `current` mit den Werten der laufenden Stunde. Benötigt stündliche Werte.     |
| Prognose als JSON                                           | `forecast_json` Und `hourly_json` für Widgets                                            |
| Wetterwarnungen, Sonne und Mond, Luftdruck/Taupunkt, Schnee | Zusätzliche Datenpunkte, schalten Sie ab, was Sie nicht benötigen                       |

### Experteneinstellungen

Einige wenige, selten benötigte Einstellungen werden nur im **Expertenmodus** der Administrationsoberfläche angezeigt: der Mindestabstand zwischen zwei Abrufen (Standard: 5 Stunden), die Wartezeit auf eine Antwort (20 Sekunden), Wiederholungsversuche nach einem Fehler (1) und reservierte Aufrufe (5). Normalerweise benötigen Sie diese Einstellungen nicht.

---

## Fragen und Probleme

**Die Werte ändern sich nach einem Neustart nicht.** Das ist so beabsichtigt. Nach jedem Start ruft der Adapter die Daten einmalig ab. Wenn der nächste geplante Abruf weniger als 5 Stunden später erfolgen würde, wird er übersprungen, um Aufrufe zu sparen. Dies wird im Protokoll vermerkt, z. B. `Fetch "11:40" skipped …` Die

** `info.status` Es wird „Kein API-Schlüssel“ angezeigt.** Geben Sie den Schlüssel im Tab _„Allgemein“_ ein und speichern Sie die Einstellungen.

** `info.status` Es wird „Ungültiger Schlüssel“ angezeigt.** Der Schlüssel wurde abgelehnt. Überprüfen Sie ihn in Ihrem Meteonomiqs-Konto, geben Sie ihn erneut ein und speichern Sie ihn.

** `info.status` Es wird „Kein Standort“ angezeigt.** Legen Sie Ihren Standort unter _Einstellungen → System → Standort_ fest oder deaktivieren Sie _„ioBroker-Systemstandort verwenden“_ und geben Sie die Koordinaten ein.

**Im Protokoll steht „Sparmodus“ oder „Notfallmodus“.** Da die Anrufe in diesem Monat knapp werden, werden weniger wichtige Abrufe pausiert. Ab dem 1. des nächsten Monats läuft alles wieder normal.

** `info.requests_month` Das weicht von meinem Meteonomiqs-Konto ab.** Der Adapter zählt seine Aufrufe selbst. Ihr Meteonomiqs-Konto ist immer korrekt.

**Der Ordner `current` Die Spalte bleibt leer.** Es werden Stundenwerte benötigt. Aktivieren Sie _die Stundenwerte_ im _Daten-_ Tab.

**Die Administration wird dadurch verlangsamt.** Stündliche Werte erzeugen viele Datenpunkte. Reduzieren Sie diese auf einen Tag oder deaktivieren Sie sie im _Daten-_ Tab.

Weitere Fragen: [ioBroker-Forum](https://forum.iobroker.net/topic/85314) oder [GitHub-Issues](https://github.com/Schimi1983/ioBroker.meteonomiqs/issues) .

---

## Unterstützung

Der Adapter ist und bleibt kostenlos. Wenn er Ihnen nützlich ist und Sie sich bedanken möchten, können Sie die Entwicklung unterstützen:

Fehlerberichte und Ideen in den [Issues](https://github.com/Schimi1983/ioBroker.meteonomiqs/issues) sind genauso hilfreich.

---

<details>
<summary><b>For advanced users</b></summary>

### Alle Datenpunkte

```
meteonomiqs.0
├── info                      connection, status, last_sync, requests_month, requests_left,
│                             force_update (button: fetch now), reset_counter (button)
├── current                   the hour in progress (copied from day_N.hourly.HH every hour)
├── day_0 … day_N             daily values, warn_*, wind_bft, …
│   ├── astro                 sun and moon
│   ├── spaces                morning, afternoon, evening, night
│   └── hourly                00 … 23
├── forecast_json
└── hourly_json
```

- `day_N.spaces.night` ist die Nacht _nach_ diesem Tag.
- Die API kennzeichnet starken Wind im Symbol (`d_w_60.svg`) unabhängig von den offiziellen Warnungen; `wind_significant` zeigt an, wann dies der Fall ist.
- `day_0` Es verfügt über die offiziellen Wettervorhersagefunktionen und wird vom ioBroker-Typendetektor als Wettervorhersage erkannt. Fügen Sie es einem Raum oder einer Funktion im Reiter _„Enums“_ hinzu, um es in Material, IoT oder Geräten zu verwenden.
- `info.force_update` Die Daten werden sofort abgerufen, wobei die Mindestlücke und die Prioritäten ignoriert werden; es gilt lediglich das monatliche Limit.

### So funktioniert das monatliche Limit

Drei Abrufe pro Tag ergeben 93 Anrufe in einem 31-tägigen Monat. Ein Abruf mit Priorität N wird nur ausgeführt, solange die verbleibenden Anrufe die N Anrufe pro Tag bis zum Monatsende abdecken. Bei Engpässen wird zuerst der abendliche Abruf gestoppt, dann der mittägliche; Priorität 1 wird nur noch jeden zweiten Tag ausgeführt, anstatt ganz zu stoppen.

| Ausgangspunkt                | Anrufe verwendet | 01:10 | 11:40 | 18:40 |
| ---------------------------- | ---------------- | ----- | ----- | ----- |
| Normaler Monat               | 93 / 100         | 31    | 31    | 31    |
| 20 Anrufe bereits verbraucht | 98 / 100         | 31    | 31    | 16    |
| 40 Anrufe bereits verbraucht | 99 / 100         | 31    | 28    | 0     |
| 70 Anrufe bereits verbraucht | 100 / 100        | 30    | 0     | 0     |

Der Zähler ist eine vom Adapter gespeicherte Schätzung; die API meldet die verbleibenden Aufrufe nicht. Er beginnt wieder bei 0, wenn die Instanz neu erstellt wird.

### Zeitplan

Jede Installation verschiebt alle Abrufzeiten um dieselben wenigen Minuten (bis zu 15, abgeleitet von der Installations-ID), sodass nicht alle Installationen die API in derselben Minute aufrufen. Die aktuellen Abrufzeiten werden beim Start protokolliert. Der minimale Abstand muss kleiner sein als der kürzeste Abstand zwischen zwei Abrufzeiten; der Adapter prüft dies beim Start.

### Entwicklung

```bash
npm install
npm run build
npm run lint
npm test
```

</details>

---

Wetterdaten © [wetter.com GmbH / Meteonomiqs](https://www.meteonomiqs.com) . Dieser Adapter steht in keiner Verbindung zu wetter.com.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.11 (2026-10-30)

- State roles follow the ioBroker role catalogue more closely. The day values carry the official forecast roles (`value.temperature.max.forecast.0` for today, `.forecast.1` for tomorrow, …), so the ioBroker type detector recognises `day_0` as a weather forecast (Material, iot, devices). In `current` the felt temperature is now recognised as well
- Corrected roles: sunrise/sunset as "HH:MM" are `text` (a `date` role needs a full date; the `_iso` states keep `date.sunrise`/`date.sunset`), felt temperature `value.temperature.windchill`, weekday `dayofweek`, snow line `value.snowline`, fresh snow and snow amount `value.snow`, warning level `value.severity`, location `location`, JSON states `weather.json`. The short wind direction is `text`, so it no longer competes with the long one
- Value ranges (`min`/`max`) for percentages, wind force (0–12), wind direction (0–360°) and warning level (0–4)
- Existing installations take over the new roles automatically on the next start. Values and history are kept

### 0.2.10 (2026-10-29)
- Easier to set up for beginners: the settings page starts with a short "Getting started" box, the help texts are written in plain words, and rarely needed options (minimum gap, waiting time, retries, reserve) only show in expert mode. The tab "API budget" is now called "Monthly limit". Nothing changes for an existing installation
- README and German guide rewritten in plain words, with examples for everyday use; technical details moved to a collapsed section
- Support links (GitHub Sponsors, PayPal) in the README, in `package.json` (`npm fund`) and as an optional section at the bottom of the *General* tab. Nothing changes for an installation

### 0.2.9 (2026-10-15)

- A fetch skipped because of the cooldown ("Minimum hours between updates") is now logged at info level, e.g. `Fetch "11:40" skipped: last fetch 3.0 h ago, minimum gap is 5 h`. The typical case is the first scheduled fetch after an adapter update or a host restart, because both trigger a startup fetch. Until now such a skip only showed as an `info.last_sync` that did not move
- One info line per fetch instead of two: `Forecast updated (11:40): 14 days.` The line announcing the request moved to debug
- README reworked for beginners: quick start, every setting with its default per admin tab, a troubleshooting table. New German guide in `docs/de/README.md`

### 0.2.8 (2026-09-30)

- New state `wind_bft` in the day, day-section and hourly values, and with that in `current`: the wind force on the Beaufort scale (0-12), derived from the average wind speed. Handy for scripts that react to wind strength without converting km/h themselves, e.g. retracting an awning from force 6
- Objects deleted in the object browser while the adapter is running are created again on the next fetch. Until now they only came back after a restart of the instance, and every write in between was logged as "has no existing object"

### 0.2.7 (2026-09-06)

- Raised the required `@iobroker/adapter-core` to `^3.4.3` (`[W0034]`) and the release-script license plugin to `^5.2.2` (`[S0064]`). Both caret ranges already resolved to those versions; only the declared minimums lagged behind, so nothing changes at runtime

## License

The MIT License (MIT)

Copyright (c) 2026 Schimi <github@world-mg.de>

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