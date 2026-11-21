---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.autism-support/README.md
title: ioBroker.autism-support
hash: 7DvbEYbOQSlbMEUSRB1kQwIZZsGkD+Hs0vSy6WqWSI4=
---
# ioBroker.autism-support

Unterstützung für Menschen mit Autismus in ioBroker: **Visueller Countdown** , **Tagesplan mit Zeitleiste** und Piktogramme.

Piktogrammquelle und Begriffe: [ARASAAC](https://arasaac.org) . Die Anzeige ist für Tablets, Wanddisplays oder ähnliches über **VIS-2** vorgesehen.

## Visueller Countdown

Visueller Countdown als geometrischer Rahmen (Standard: Quadrat) mit kreisförmigem Fortschrittswischer von der Mitte aus.

### Staaten (`autism-support.0.timer.*`)

| Zustand                                  | Beschreibung               |
| ---------------------------------------- | -------------------------- |
| `duration`                               | Gesamtdauer in Sekunden    |
| `remaining`                              | Verbleibende Sekunden      |
| `elapsed`                                | Verstrichene Sekunden      |
| `running` /`paused` /`finished`          | Status                     |
| `start` /`pause` /`resume` /`stop`       | Befehle (schreiben `true`) |
| `setDurationHours` /`setDurationMinutes` | Dauer festlegen            |

### VIS-2-Widgets

| Widget                                  | Zweck                                   |
| --------------------------------------- | --------------------------------------- |
| **Visueller Countdown (Live)**          | Großes Display für den Benutzer         |
| **Visueller Countdown (Konfiguration)** | Kontrolle für Eltern/Betreuungspersonen |

## Tagesplan mit Zeitleiste

Flexible Liste von Piktogrammen mit individuellen Zeiträumen. Ein **farbiger Tagesbalken** rechts passt sich der **Anzahl und Dauer der Piktogramme** an (Zeitfenster vom ersten bis zum letzten Eintrag), plus eine **Jetzt-** Markierung.

### Verwaltung: Tagesperioden

Im Admin-Tab „ **Tagesperioden“** können Sie Start- und Endzeitpunkt (HH:MM) sowie die Farbe für jede Periode festlegen. Die Nacht kann bis nach Mitternacht dauern (z. B. 21:00–06:00 Uhr). Im Widget **„Tagesplan (Konfiguration)“** lassen sich Perioden zusätzlich aktivieren oder deaktivieren.

### Wochenplan

Das Widget **„Tages-/Wochenplan (Konfiguration)“** bearbeitet eine ganze Woche (Registerkarten Mo–So), ermöglicht das Kopieren einzelner Tage auf andere Wochentage und das Speichern/Laden benannter Wochenvorlagen. Im Admin-Tab **„Wochenplan“** lassen sich die Hintergrundfarben der Wochentage festlegen und gespeicherte Vorlagen auflisten (umbenennen/löschen; **●** = aktuell geladen/aktiv). Aktivieren Sie die **Option „Tagesplan täglich aus Wochenplan laden“,** um …`schedule.plan` wird automatisch aus dem heutigen Wochentag-Slot belegt.

### Staaten (`autism-support.0.schedule.*`)

| Zustand               | Beschreibung                                                                        |
| --------------------- | ----------------------------------------------------------------------------------- |
| `plan`                | Tagesplan im JSON-Format mit Einträgen (Bezeichnung, Start/Ende, Piktogrammquelle)  |
| `weeklyPlan`          | Aktiver Wochenplan (JSON, Tagespläne von Montag bis Sonntag)                        |
| `weeklyPlansLibrary`  | Gespeicherte Wochenvorlagen +`activeId` des geladenen Plans                         |
| `loadDailyFromWeekly` | Kopieren Sie den heutigen Wochenplatz nach `plan` jeden Tag                          |
| `weekdayColors`       | Wochentagsfarben aus der Admin-Ansicht (JSON, schreibgeschützt)                     |
| `periods`             | Tageszeiträume aus der Administratorkonfiguration (JSON, schreibgeschützt)          |
| `periodOverrides`     | Ein-/Ausschalt-Überschreibungen über das Konfigurations-Widget (JSON, beschreibbar) |
| `clearAfterLast`      | Klarer Plan nach Ende des letzten Piktogramms (boolesche Operation)                 |
| `nowMinutes`          | Aktuelle Minuten seit Mitternacht (Ortszeit)                                        |
| `currentPeriod`       | ID des aktuellen Tageszeitraums                                                     |
| `currentItemIndex`    | Index der aktiven Planeinträge (`-1` = keine)                                       |

### VIS-2-Widgets

| Widget                                | Zweck                                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Tagesprogramm (Live)**              | Heutige Piktogramme + Zeitleiste                                                                                                     |
| **Wochenplan (Live)**                 | Wochenübersicht mit den Farben der Wochentage der Verwaltung                                                                         |
| **Tages-/Wochenplan (Konfiguration)** | Wochentagsregisterkarten, Tage kopieren, Vorlagen speichern/laden, tägliche Synchronisierung, ARASAAC/benutzerdefinierte Piktogramme |

### Piktogrammquellen

1. **ARASAAC (extern)** – nur die Piktogramm-ID wird gespeichert; das Bild wird zur Laufzeit geladen von `static.arasaac.org` Im Adapterpaket sind keine ARASAAC-Dateien enthalten.
2. **Benutzerdefinierte Uploads** – über die Adapterinstanzeinstellungen im Adminbereich (Registerkarte „Piktogramme“). vis-2-Widgets können Dateien nicht zuverlässig hochladen.

Benutzerdefinierte Bilder werden im **vis-2-** Dateispeicher gespeichert unter `vis-2.0/Autism Support/pictograms/` (URL `/vis-2.0/Autism Support/pictograms/...`). Der `pictograms` Der Ordner wird beim Start des Adapters automatisch erstellt. Bilder können über Admin → **Dateien** (oder den Link in den Instanzeinstellungen) hochgeladen werden.

## Entwicklung

Voraussetzungen: Node.js ≥ 22, ioBroker mit `vis-2` Die

```bash
npm install
cd src-widgets-ts && npm install && cd ..
npm run build
npm run dev-server setup
npm run dev-server watch
```

Widget-Entwicklung (parallel):

```bash
cd src-widgets-ts
npm run start
```

## Autor

Matthias Ulrich ( [@MatthiasUlrich1](https://github.com/MatthiasUlrich1) )

## Changelog

See CHANGELOG_OLD.md for older entries.

### 0.2.14

* Fix red instance after 0.2.13 update: migrate pictograms from old German vis-2 folder to 'Autism Support', robust startup without vis-2

### 0.2.13

* Latest-repo review fixes: English vis-2 folder names, widget i18n translations, ARASAAC fetch timeout, modern nogit build setup

### 0.2.12

* Remove leftover Admin sidebar tab that could not be opened

### 0.2.11

* Latest repository review fixes: English package description, translations, remove unused custom config, responsive admin tabs

### 0.2.10
- Repo-check compliance: remove unpublished versions from `common.news`, update README changelog

### 0.2.8
- Fix startup crash/restart loop: no `system.adapter` native write on boot; cancel in-flight ready on unload

### 0.2.7
- Fix restart loop (native config diff) and CI lint formatting

### 0.2.5
- Fix `system.adapter` config path (`extendForeignObject`); trim news for E1032

### 0.2.2
- Fix object structure for latest-repo review: `timer` channel, `value.interval` roles, button `read: false`

### 0.2.1
- Weekly plans: weekday tabs in Config, copy to other days, named templates (save/load)
- Admin: weekday colors + list of saved plans with active/loaded marker
- New Live widget: week overview; optional daily sync from weekly plan

### 0.1.27
- ioBroker compliance: max 7 news entries, jsonConfig schema, admin i18n keys, English title/desc

## License

Copyright (c) 2026 Matthias Ulrich <MatthiasUlrich1@gmail.com>

### This adapter

**MIT** – see [LICENSE](https://github.com/MatthiasUlrich1/ioBroker.autism-support/blob/main/LICENSE).

### ARASAAC pictograms (external content)

This adapter **does not contain or redistribute** ARASAAC image files.

- **Source:** [ARASAAC](https://arasaac.org) / [API](https://api.arasaac.org) / CDN `https://static.arasaac.org`
- **License:** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
- **Author:** Sergio Palao · **Owner:** Government of Aragon

Recommended attribution:

> The pictographic symbols used are the property of the Government of Aragon and have been created by Sergio Palao for ARASAAC (https://arasaac.org), which distributes them under a Creative Commons license (BY-NC-SA).

Live/config widgets show this attribution when the plan contains ARASAAC entries.

Official terms: [ARASAAC Terms of Use](https://aulaabierta.arasaac.org/en/terms-of-use)

### Custom / uploaded pictograms

You are responsible for having the required rights for uploads. Upload and tagging happen in the Admin instance settings. The adapter stores files locally in the instance only; they are not shipped in the npm/GitHub package.