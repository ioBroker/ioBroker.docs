---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.public-holidays/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.public-holidays@main/admin/public-holidays.svg" width="48" align="top" /> ioBroker.public-holidays
hash: T6oMPK3DnlFoIGGOGos24eOad5mNisShE3ZUiM5om6I=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.public-holidays@main/admin/public-holidays.svg" width="48" align="top" /> ioBroker.public-holidays

![npm-Version](https://img.shields.io/npm/v/iobroker.public-holidays)
![stabil](https://iobroker.live/badges/public-holidays-stable.svg)
![Installationen](https://iobroker.live/badges/public-holidays-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.public-holidays)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Posten](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Erkennt Feiertage in 206 Ländern. Funktioniert komplett offline – keine Cloud, keine API-Aufrufe. Aktualisiert sich täglich um Mitternacht.

Feiertagsdaten bereitgestellt von [Datum-Feiertage](https://github.com/commenthol/date-holidays) (ISC + CC-BY-SA-3.0).

---

## Merkmale
- **206 Länder** mit Unterstützung durch Bundesstaaten/Provinzen und Regionen
- **Vollständig offline** – alle Urlaubsdaten sind im Paket enthalten, kein Internet erforderlich
- **5 Feiertagsarten** — öffentlicher Feiertag, Bankfeiertag, Schulfeiertag, optionaler Feiertag, Gedenktag (konfigurierbar)
- **Überbrückungstage-Erkennung** – erkennt Arbeitstage zwischen Feiertagen und Wochenenden
- **Einzelne Feiertage ausschließen** — Feiertage, die ausgeschlossen werden sollen, über das Dropdown-Menü auswählen
- **Lokalisierte Feiertagsnamen** — folgt der Systemsprache mit englischem Fallback
- **Zeitplanmodus** – wird einmal beim Start und täglich um Mitternacht berechnet, zwischen den Ausführungen wird kein Speicher belegt.

## Wächter / Fehlerberichterstattung
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Die Meldung erfolgt nur, wenn Sie die Fehlerberichterstattung in den ioBroker-Diagnoseeinstellungen aktiviert haben (Systemeinstellungen → Diagnose und Fehlerberichterstattung). Es wird lediglich eine anonyme Installations-ID übermittelt – kein Name, keine E-Mail-Adresse und keine IP-Adresse.

Einzelheiten und Hinweise zur Deaktivierung finden Sie in Abschnitt [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Für die Fehlerberichterstattung ist js-controller 3.0 oder neuer erforderlich.

---

## Anforderungen
- ioBroker js-controller >= 7.2.2
- Admin >= 7.8.23
- Node.js >= 22

## Konfiguration
### Registerkarte 1 — Region
| Schauplatz | Beschreibung |
| ---------------- | ----------------------------------------------------------------- |
| Land | Wählen Sie aus 206 Ländern |
| Bundesland/Provinz | Dropdown-Menü — wird nur für Länder mit Bundesländern/Provinzen angezeigt (z. B. DE, CH, US) |
| Region | Dropdown-Menü — wird nur angezeigt, wenn das ausgewählte Bundesland Regionen hat |

Wenn das Feld **Land** leer bleibt, wird es automatisch aus Ihren ioBroker-Systemeinstellungen ermittelt (Systemeinstellungen → Land). Es wird jedoch empfohlen, es explizit auszuwählen.

### Registerkarte 2 — Feiertage
| Schauplatz | Beschreibung |
| ------------------ | ----------------------------------------------- |
| Feiertage | Offizielle Feiertage (Standard: aktiviert) |
| Feiertage | Feiertage |
| Schulferien | Schulferien |
| Optionale Feiertage | Optionale/freiwillige Feiertage |
| Gedenktage | Gedenktage |
| Brückentage erkennen | Fügt Brückentage zwischen Feiertagen und Wochenenden hinzu |
| Ausgeschlossene Feiertage | Feiertage auswählen, die von der Erkennung ausgeschlossen werden sollen |

## Staatsbaum
```
public-holidays.0.
├── today.
│   ├── name         string    "Karfreitag" / "Good Friday"
│   └── boolean      boolean   true / false
├── yesterday.
│   ├── name         string
│   └── boolean      boolean
├── tomorrow.
│   ├── name         string
│   └── boolean      boolean
├── dayAfterTomorrow.
│   ├── name         string
│   └── boolean      boolean
└── next.
    ├── name         string    next holiday name (localized)
    ├── boolean      boolean   true when an upcoming holiday exists
    ├── date         string    "2026-12-25" (ISO date)
    └── daysUntil    number    days until holiday
```

Wenn kein Feiertag vorliegt (z. B. ist heute kein Feiertag), sind die Kanalzustände leere Zeichenketten / false / 0.

## Bridge Day Algorithmus
Ein Brückentag ist ein Werktag (Montag bis Freitag) zwischen einem Feiertag und einem Wochenende:

- Feiertag am **Donnerstag** → Freitag ist ein Brückentag
- Feiertag am **Dienstag** → Montag ist ein Brückentag
- Feiertag am **Mittwoch** → kein Brückentag (zwei Tage fehlen)

Brückentage werden im Zustandsbaum mit dem lokalisierten Namen angezeigt, der der Systemsprache entspricht.

## Fehlerbehebung
**Keine Statusangaben nach dem ersten Start** — Öffnen Sie die Adaptereinstellungen und wählen Sie ein Land aus.

**Falsche Feiertage / Fehlende regionale Feiertage** – Prüfen Sie, ob das richtige Bundesland/die richtige Provinz ausgewählt ist. Stellen Sie den Protokollierungsgrad auf „Debug“, um alle erkannten Feiertage anzuzeigen.

**Feiertag nicht erkannt** – Einige Feiertage werden als `observance` anstatt als `public` klassifiziert. Aktivieren Sie gegebenenfalls den Feiertagstyp in den Feiertagseinstellungen.

## Credits
Das npm-Paket wurde ursprünglich von [Jey Cee](https://github.com/Jey-Cee) registriert. Dieser Adapter ist eine komplette Neuentwicklung ohne gemeinsamen Code.

## Unterstützung
- [GitHub Issues](https://github.com/krobipd/ioBroker.public-holidays/issues) — Fehlerberichte, Funktionsanfragen
- [ioBroker Forum](https://forum.iobroker.net/) — Allgemeine Fragen

### Unterstützung der Entwicklungsabteilung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-07-02)

- The "next holiday" date and days-until states now show up correctly as a date and a day count in VIS widgets and scripts (they carry the proper ioBroker role and a "days" unit).
- The exclude-holidays list in the settings now also offers holidays that only occur in the coming year, not just the current one.

### 0.9.0 (2026-06-28)

- The holiday exclude list now shows only your selected region's holidays, in your admin language and sorted by date — no longer every region of a country mixed alphabetically.
- The false "excluded holidays no longer match" warning at startup is fixed; it now fires only for a holiday that genuinely no longer exists.

### 0.8.0 (2026-06-25)

- A misconfigured region/state is now reported instead of silently using country-level holidays.
- A holiday exclude that no longer matches after a data update is now reported.
- On a day with two holidays, the more important one is now shown.
- Adds an optional bridge day between two midweek holidays.

### 0.7.1 (2026-06-12)

- Internal refactoring. No user-facing changes.

### 0.7.0 (2026-06-07)

- Added optional Sentry error reporting: crashes are sent to the developer so issues get fixed faster. Active only with ioBroker diagnostics enabled; anonymous.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

_Developed with assistance from Claude.ai_