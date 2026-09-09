---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meteonomiqs/README.md
title: ioBroker.meteonomiqs
hash: 1FtdjtxxtBtEGZXhpJxm73hHRh9NYVgkW21Z8uYbJc8=
---
![Logo](../../../en/adapterref/iobroker.meteonomiqs/admin/meteonomiqs.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.meteonomiqs.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meteonomiqs.svg)
![Anzahl der Installationen](https://iobroker.live/badges/meteonomiqs-installed.svg)
![Lizenz](https://img.shields.io/github/license/Schimi1983/ioBroker.meteonomiqs)
![Test und Freigabe](https://github.com/Schimi1983/ioBroker.meteonomiqs/actions/workflows/test-and-release.yml/badge.svg)
![NPM](https://nodei.co/npm/iobroker.meteonomiqs.png?downloads=true)

# ioBroker.meteonomiqs

Wettervorhersage von **wetter.com** über die [Meteonomiqs Public Weather API v4.0](https://doc.meteonomiqs.com/doc/forecast_v4_0.html) .

Bis zu 14 Tage Vorhersage, Tagesabschnitte, Stundenwerte, die aktuelle Stunde, Wetterwarnungen, Sonnen- und Monddaten – alles mit einem **einzigen** API-Aufruf pro Abfrage. Der Adapter berücksichtigt, dass der kostenlose Tarif nur 100 Aufrufe pro Monat erlaubt.

---

## Merkmale

|                      |                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| **Tagesvorhersage**  | 1–14 Tage: Temperatur, Niederschlag, Wind, Bewölkung, Luftfeuchtigkeit, Sonnenscheindauer, Luftdruck      |
| **Tagesabschnitte**  | Morgen, Nachmittag, Abend und Nacht pro Tag                                                               |
| **Stundenwerte**     | Für einen oder mehrere Tage, berechnet in der Zeitzone des Vorhersageorts                                 |
| **`current`Ordner**  | Die laufende Stunde, **stündlich aktualisiert ohne API-Aufruf**                                           |
| **Wetterwarnungen**  | Schweregrad (Gruppe, Text und numerisch, 0–4) – kein Zeichenkettenvergleich in Skripten erforderlich      |
| **Sonne und Mond**   | Sonnenaufgang, Sonnenuntergang, Dämmerung, Tageslänge, Mondaufgang, Mondphase, Tierkreis                  |
| **Schnee**           | Schneegrenze, Neuschnee, Schneewasseräquivalent                                                           |
| **JSON-Aggregate**   | `forecast_json` Und`hourly_json` für VIS-, Jarvis- und Material-Widgets                                   |
| **Budgetverwaltung** | Prioritätsstufen, die sich sanft verschlechtern, anstatt zu blockieren                                    |
| **Korrekte Symbole** | Verwendet das von der API bereitgestellte Symbol, einschließlich der Varianten für Nacht, Sturm und Wind. |

---

## Installation

Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche.

### API-Schlüssel

Ein Schlüssel ist erforderlich und bei [Meteonomiqs](https://www.meteonomiqs.com/de/wetter-api/) erhältlich. Der kostenlose Tarif umfasst derzeit 100 Anrufe pro Monat, was genau der Standardeinstellung des Zeitplans entspricht. Der Schlüssel wird **verschlüsselt** in der Instanzkonfiguration gespeichert.

---

## Konfiguration

### Allgemein

| Einstellung                               | Bedeutung                                                                                                                                                            |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API-Schlüssel                             | Ihr Meteonomiqs-Schlüssel. Verschlüsselt gespeichert.                                                                                                                |
| Verwenden Sie den ioBroker-Systemstandort | Die Breiten- und Längengradangaben werden unter _Einstellungen → System → Standort_ angezeigt. Deaktivieren Sie diese Option, um die Koordinaten manuell einzugeben. |
| Sprache der Wettertexte                   | Gilt für die von der API gelieferten Beschreibungen. Leer = ioBroker-Systemsprache.                                                                                  |
| Vorhersagetage                            | 1–14. Durch Verringern des Wertes werden die nicht mehr benötigten Tagesordner entfernt.                                                                             |

### Zeitplan

Die Abrufzeiten sind in einer Tabelle dargestellt.`HH:MM` plus eine **Priorität** . Standardmäßig:

| Zeit  | Priorität | Zweck                                                                                      |
| ----- | --------- | ------------------------------------------------------------------------------------------ |
| 01:10 | 1         | Den Tag planen – die vollständige Wettervorhersage liegt vor, bevor irgendjemand aufsteht. |
| 11:40 | 2         | Korrektur vor dem kritischen Nachmittag: Gewitter, Windböen, Hitzespitze                   |
| 18:40 | 3         | Nacht und morgen: Frost, Gewitter, Ausblick für den nächsten Morgen                        |

Jede Installation verschiebt diese Zeiten um einen festen Offset von bis zu 15 Minuten, der sich aus der UUID der ioBroker-Installation ergibt – andernfalls würde jede Installation dieses Adapters die API in derselben Minute aufrufen. Der Offset ist für alle drei Zeiten gleich, sodass die Abstände zwischen ihnen exakt wie konfiguriert bleiben. Die tatsächlich verwendeten Zeiten werden beim Start protokolliert.

**Die Mindestwartezeit zwischen Aktualisierungen** dient dem Schutz vor Neustartschleifen. Sie muss _kürzer_ sein als die kürzeste Zeitspanne zwischen zwei Abrufen – andernfalls wird täglich ein Abruf übersprungen. Der Adapter prüft dies beim Start und protokolliert einen Fehler, falls die Werte nicht stimmen.

### API-Budget

Drei Abrufe pro Tag ergeben 93 Anrufe in einem 31-tägigen Monat – 7 weniger als die 100 des kostenlosen Tarifs. Anstatt am Monatsende an die Grenzen zu stoßen, hat jeder Abruf eine Prioritätsstufe:

> Ein Tier-N-Fetch wird nur so lange ausgeführt, wie das verbleibende Budget noch **N Aufrufe pro Tag** bis zum Monatsende zulässt.

Bei Engpässen fällt die abendliche Apportierfunktion zuerst aus, dann die mittägliche. Die nächtliche Apportierfunktion bleibt am längsten erhalten und greift im Notfall auf einen zweitägigen Rhythmus zurück, anstatt ganz einzustellen. Dies wurde über einen simulierten Monat hinweg überprüft.

| Ausgangspunkt                      | Anrufe verwendet | 01:10 | 11:40 | 18:40 |
| ---------------------------------- | ---------------- | ----- | ----- | ----- |
| Reiner Monat (31 Tage)             | 93 / 100         | 31    | 31    | 31    |
| 20 Anrufe wurden bereits vergeudet | 98 / 100         | 31    | 31    | 16    |
| 40 Anrufe wurden bereits vergeudet | 99 / 100         | 31    | 28    | 0     |
| 70 Anrufe wurden bereits vergeudet | 100 / 100        | 30    | 0     | 0     |

Der Zähler ist eine **lokale Schätzung** – die API meldet kein verbleibendes Kontingent. Nur der HTTP-Statuscode 429 liefert verlässliche Daten.`info.reset_counter` Stellt den Wert bei Bedarf wieder auf Null zurück.

### Daten

Alles wird über dieselbe API-Antwort bereitgestellt, daher kostet die Aktivierung weiterer Gruppen **keine zusätzlichen Aufrufe** – es entstehen lediglich mehr Objekte. Ungefähre Größen bei einer Prognose für die nächsten 7 Tage:

| Konfiguration                             | Objekte |
| ----------------------------------------- | ------- |
| Alles eingeschaltet, stündlich für 2 Tage | \~2430  |
| Stündlich für 1 Tag                       | \~1780  |
| Stündlich frei                            | \~1130  |
| Nur Tageswerte                            | \~380   |

Auf einem Raspberry Pi sind stündliche Werte für einen Tag ein sinnvoller Kompromiss.

---

## Staatsbaum

```
meteonomiqs.0
├── info
│   ├── connection            Connected to the API
│   ├── status                ok / no API key / HTTP 429 / …
│   ├── last_sync             Last successful fetch
│   ├── requests_month        Local estimate of calls used this month
│   ├── requests_left         Remaining calls
│   ├── force_update          Button: fetch now (skips the cooldown)
│   └── reset_counter         Button: reset the monthly counter
├── current                   The hour in progress, refreshed hourly
│   ├── temp, weather_text, weather_icon, is_night, …
│   ├── temp_min_today, temp_max_today, sunrise, sunset
│   ├── valid                 false when no data covers this hour
│   └── source                Which state the values were copied from
├── day_0 … day_N
│   ├── date, day_name, temp_min, temp_max, weather_icon, …
│   ├── warn_active, warn_severity_int
│   ├── astro                 sunrise, sunset, moon phase, day length …
│   ├── spaces                morning, afternoon, evening, night
│   └── hourly                00 … 23
├── forecast_json
└── hourly_json
```

### Zwei Dinge, die man über den Baum wissen sollte

**`day_N.spaces.night`ist die Nacht _nach_ diesem Tag.** Ihr Minimum ergibt sich daher aus den frühen Morgenstunden.`day_N+1` . Lektüre`day_0.spaces.night.temp_min` Gibt den Tiefstwert von heute Abend an, nicht den von gestern Abend.

**`wind_significant`erklärt das Symbol.** Die API kennzeichnet starken Wind im Dateinamen des Symbols (`d_w_60.svg` anstatt`d_60.svg` ) unabhängig davon`warn_active` . An einem Tag kann es zu Windausbrüchen kommen, ohne dass eine offizielle Warnung ausgegeben wird; daher dürfen das Symbol und die Warnmeldung voneinander abweichen.

### `current` — wie es funktioniert

`current` spiegelt das Muster des`daswetter` Und`open-meteo-weather` Adapter, mit zwei bewussten Auswahlmöglichkeiten:

**Wird stündlich aktualisiert, nicht nur beim Abruf.**`current` Ein Ordner, der nur bei API-Abfragen aktualisiert wird, wäre abends sieben Stunden alt. Ein separater stündlicher Timer kopiert die Werte stündlich – was keine Kosten verursacht, da die Stundendaten bereits im Objektbaum vorhanden sind.

**Lesen Sie aus den Zuständen, nicht aus einem Cache.** Das Lesen der zwischengespeicherten Nutzdaten würde dazu führen, dass`current` Nach jedem Neustart des Adapters wird die Leerstelle bis zum nächsten geplanten Abruf geleert.`day_N.hourly.HH.*` Funktioniert immer.

Der Tag ist abgeschlossen durch`date_iso` statt eines festen Index. Zwischen Mitternacht und dem ersten Abruf des Tages existiert „heute“ noch in`day_1` — ein fest codierter`day_0` würden in diesem Zeitfenster jede Nacht die falschen Werte anzeigen.

`current` Es handelt sich um eine **Vorhersage** für die aktuelle Stunde, nicht um einen Messwert. Echtzeitwerte würden die`/nowcast` oder`/stations` Endpunkte, die einen Aufruf pro Abfrage kosten und nicht in einen 100-Aufruf-Plan passen.

---

## Entwicklung

```bash
npm install          # install dependencies
npm run build        # compile TypeScript to build/
npm run watch        # rebuild on change
npm run check        # type check without emitting
npm run lint         # ESLint
npm run test:ts      # unit tests
npm run test:package # validate package.json / io-package.json
npm run test:integration  # boots a real js-controller
npm run translate    # @iobroker/adapter-dev translation helper
```

Lokale Testinstanz mit [Entwicklungsserver](https://github.com/ioBroker/dev-server) :

```bash
npm install --global @iobroker/dev-server
dev-server setup
dev-server watch
```

---

Wetterdaten © [wetter.com GmbH / Meteonomiqs](https://www.meteonomiqs.com) . Dieser Adapter steht in keiner Verbindung zu wetter.com.

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.7 (2026-09-06)

- Raised the required `@iobroker/adapter-core` to `^3.4.3` (`[W0034]`) and the release-script license plugin to `^5.2.2` (`[S0064]`). Both caret ranges already resolved to those versions; only the declared minimums lagged behind, so nothing changes at runtime

### 0.2.6 (2026-08-16)

- The buttons `info.force_update` and `info.reset_counter` are write-only now. A state with role `button` carries no value to read, and `read: true` made the admin offer it as a readable one (repository review)
- The `warn_severity_int` states in the day, day-section and hourly subtrees carry the generic `value` role. `value.severity` is not part of the ioBroker role catalogue (repository review)
- Both corrections reach existing installations on the next adapter start — the object metadata is compared and rewritten on drift

### 0.2.5 (2026-08-16)

- The field tables are covered by tests now: 138 of them, running every getter against a hand-built API response, plus the structural rules — unique ids, both label languages, roles from the ioBroker catalogue, unit and precision only on numbers. Every leaf of the fixture carries a value that appears nowhere else, so a getter reading `min` where it should read `max` cannot pass
- The admin translations moved to the short i18n form, `admin/i18n/<lang>.json` instead of `admin/i18n/<lang>/translations.json` (`[S5601]`)
- Added `.vscode/settings.json` with the ioBroker JSON schemas for `io-package.json` and `jsonConfig.json` (`[S4036]`)
- Nothing changes for an installation: no state, no role, no unit and no configuration option is affected

### 0.2.4 (2026-08-16)

- Raised the minimum admin version to 7.8.23 and `@types/node` to the major that matches `engines.node` — both proposed by the ioBroker bot

### 0.2.3 (2026-08-16)

- Installing from GitHub works again without an install lifecycle script. The compiled `build/` folder is committed to the repository, which is what the repository checker asks for (`[E5019]`), so the `prepare` script added in 0.2.1 could be dropped again (`[E0092]`)
- Trimmed `common.news` in io-package.json to the seven entries the repository builder keeps (`[E1032]`); the older ones moved to CHANGELOG_OLD.md (`[W6020]`)

### 0.2.2 (2026-08-16)

- Removed `mocha` from the devDependencies. It is a dependency of `@iobroker/testing`, so npm hoists it and the test scripts still find the binary — this clears the last error the repository checker reported (`[E0063]`)

### 0.2.1 (2026-08-16)

- The adapter can be installed straight from GitHub again. Since the compiled `build/` folder was removed from the repository (`[E5019]`), a GitHub installation had nothing to start; a `prepare` script now makes npm compile the TypeScript sources during such an installation. Installing from npm is unaffected — the published package already contains the compiled files

[Older changelogs can be found there](https://github.com/Schimi1983/ioBroker.meteonomiqs/blob/main/CHANGELOG_OLD.md)

---

## License

The MIT License (MIT)

Copyright (c) 2026 Schimi <szymon.haiduk@world-mg.de>

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