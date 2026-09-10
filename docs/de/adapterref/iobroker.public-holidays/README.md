---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.public-holidays
BADGE-stable: https://iobroker.live/badges/public-holidays-stable.svg
BADGE-Installations: https://iobroker.live/badges/public-holidays-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.public-holidays
BADGE-Test and Release: https://github.com/krobipd/ioBroker.public-holidays/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# Feiertage

Public Holidays macht aus dem Kalender Datenpunkte: ob heute ein Feiertag ist, wie er heißt, welcher
als Nächstes kommt und in wie vielen Tagen. Alles wird **offline** auf dem eigenen System berechnet —
ohne Konto, ohne API-Schlüssel, ohne Internetverbindung.

## Wie der Adapter arbeitet

Der Adapter läuft im **Zeitplan-Betrieb**. Er rechnet einmal beim Start und beim Speichern der
Einstellungen, danach täglich um Mitternacht, ausgelöst vom ioBroker-Controller. Jeder Durchgang
schreibt sein Ergebnis, danach endet der Prozess wieder — zwischen zwei Durchgängen belegt der
Adapter keinen Speicher.

Die Feiertagsdaten stammen aus der mitgelieferten Bibliothek `date-holidays`, die 206 Länder samt
Bundesländern, Kantonen, Provinzen und Regionen abdeckt.

## Einrichtung

1. Adapter aus dem ioBroker-Repository (stable oder latest) installieren und eine Instanz anlegen.
   Eine Installation über eine GitHub-Adresse wird nicht unterstützt.
2. Die Instanz-Einstellungen öffnen. Alle Einstellungen liegen auf einer geführten Karte, die von
   oben nach unten durchgearbeitet wird.
3. Speichern. Der Adapter rechnet sofort und schreibt seine Datenpunkte.

### Standort

Land auswählen. Bundesland und Region erscheinen nur bei Ländern, die sie haben — Deutschland hat
zum Beispiel Bundesländer, Italien numerische Provinzcodes.

Bleibt das Land leer, übernimmt der Adapter das Land aus den **ioBroker-Systemeinstellungen**
(Systemeinstellungen → Basiseinstellungen → Land) und schreibt eine Logzeile, welches Land er
verwendet hat. Lässt sich dieses Land nicht zuordnen, meldet der Adapter „No country configured" und
hält an.

### Feiertagstypen

Fünf Typen lassen sich unabhängig voneinander aktivieren:

| Typ                   | Bedeutung                                                                              |
| --------------------- | -------------------------------------------------------------------------------------- |
| Gesetzliche Feiertage | Die staatlich festgelegten Feiertage. Standardmäßig aktiv.                             |
| Bankfeiertage         | Tage, an denen Banken und Ämter schließen, die aber keine gesetzlichen Feiertage sind. |
| Schulferien           | Ferientage der Schulen.                                                                |
| Optionale Feiertage   | Tage, die nur für einen Teil der Bevölkerung frei sind.                                |
| Gedenktage            | Gedenk- und Aktionstage ohne arbeitsfreie Wirkung — z. B. Muttertag.                   |

Fallen zwei Feiertage auf denselben Tag, entscheiden drei Regeln in dieser Reihenfolge, welcher
Name gemeldet wird:

1. der höherrangige Typ gewinnt, in der Reihenfolge der Tabelle,
2. ein Feiertag, der wirklich auf diesen Tag gehört, schlägt einen, der nur vom Wochenende hierher
   verschoben wurde,
3. und bleibt es dann noch gleich, entscheidet eine feste interne Reihenfolge.

Alle drei sind eindeutig, der Name bleibt über Datenaktualisierungen hinweg also derselbe. Bis
Version 0.15.1 gewann bei Gleichstand schlicht der zuerst gelieferte Eintrag, was sich mit einer
Datenaktualisierung still ändern konnte — in 42 Ländern, darunter Norwegen, Polen, Rumänien,
Serbien und Taiwan.

> Sind **alle** Typen abgeschaltet, meldet der Adapter überhaupt keine Feiertage — die Karte und das
> Log sagen das ausdrücklich.

### Brückentage

Ein Brückentag ist ein Arbeitstag, der zwischen einem Feiertag und dem Wochenende eingeklemmt ist.
Mit aktivierter Option nimmt der Adapter ihn als eigenen Feiertag auf, benannt als „Brückentag" in
der eingestellten Sprache:

- Feiertag am **Donnerstag** → der **Freitag** wird Brückentag,
- Feiertag am **Dienstag** → der **Montag** wird Brückentag,
- ein **Mittwoch**, der von einem Feiertag am Dienstag _und_ am Donnerstag eingerahmt ist, wird
  Brückentag.

Ein einzelner Mittwochs-Feiertag erzeugt keinen: bis zum Wochenende wären zwei Fehltage nötig. Ein
Brückentag überschreibt nie einen echten Feiertag und erzeugt nie weitere Brückentage.

### Ausgeschlossene Feiertage

Manche Feiertage sind für den eigenen Haushalt ohne Bedeutung — einzelne Einträge lassen sich
ausschließen. Die Auswahlliste bietet genau die Feiertage des gewählten Standorts und der
aktivierten Typen an, also das, was der Adapter sonst melden würde.

Ein Ausschluss wird über eine interne Kennung gespeichert, die aus der Berechnungsregel des
Feiertags stammt. Wird diese Regel durch ein späteres Datenupdate umbenannt oder entfernt, trifft
der Ausschluss ins Leere — der Adapter schreibt dann eine Warnung mit dem betroffenen Eintrag, und
die Karte zeigt ihn als entfernbaren Chip unter der Auswahlliste.

Ausschlüsse greifen **vor** der Brückentagsberechnung: Wer einen Donnerstags-Feiertag ausschließt,
verliert damit auch den zugehörigen Freitags-Brückentag.

### Erkannte Feiertage

Unten auf der Karte steht eine Vorschau der Feiertage, die der Adapter mit den aktuellen
Einstellungen für dieses Jahr erkennt — inklusive Brückentage und abzüglich der Ausschlüsse. Sie
rechnet genauso wie der Adapter selbst, die Vorschau zeigt also den echten späteren Stand.

## Datenpunkte

| Datenpunkt                                             | Typ              | Bedeutung                                                                     |
| ------------------------------------------------------ | ---------------- | ----------------------------------------------------------------------------- |
| `today.name`                                           | string           | Name des heutigen Feiertags, an normalen Tagen leer                           |
| `today.isHoliday`                                      | boolean          | Ob heute ein Feiertag ist                                                     |
| `yesterday.name` / `yesterday.isHoliday`               | string / boolean | Dasselbe für gestern                                                          |
| `tomorrow.name` / `tomorrow.isHoliday`                 | string / boolean | Dasselbe für morgen                                                           |
| `dayAfterTomorrow.name` / `dayAfterTomorrow.isHoliday` | string / boolean | Dasselbe für übermorgen                                                       |
| `next.name`                                            | string           | Name des nächsten kommenden Feiertags                                         |
| `next.isHoliday`                                       | boolean          | Ob überhaupt ein kommender Feiertag gefunden wurde                            |
| `next.date`                                            | string           | Dessen Datum als `YYYY-MM-DD` — maschinenlesbar, unabhängig vom Anzeigeformat |
| `next.daysUntil`                                       | number           | Tage bis zu diesem Feiertag                                                   |

Alle Datenpunkte sind nur lesbar und tragen im Objektbaum eine kurze Erklärung in der eingestellten
Sprache. `next` schaut strikt nach vorn: Ein Feiertag, der heute ist, steht in `today`, nicht in
`next`.

Die Namen der Kanäle und Datenpunkte folgen der ioBroker-Systemsprache und werden bei jedem
Durchgang aufgefrischt — auch auf Anlagen, die aktualisiert statt neu installiert wurden. Ein von
Hand vergebener eigener Name wird dabei wieder überschrieben.

## Sprache

Feiertagsnamen erscheinen in der ioBroker-Systemsprache, sofern die Feiertagsdaten diese Sprache
führen, sonst auf Englisch. Unterstützt sind elf Sprachen: Deutsch, Englisch, Spanisch,
Französisch, Italienisch, Niederländisch, Polnisch, Portugiesisch, Russisch, Ukrainisch und
Chinesisch.

## Fehlersuche

**Es werden überhaupt keine Feiertage gemeldet.**
Ins Log sehen. „No country configured" heißt, dass weder der Adapter noch die
ioBroker-Systemeinstellungen ein verwertbares Land liefern. „No holiday type is enabled" heißt, dass
alle Typ-Häkchen aus sind.

**Das eingestellte Bundesland oder die Region wird scheinbar ignoriert.**
Ein unbekanntes Bundesland oder eine unbekannte Region fällt still auf die gröbere Ebene zurück. Der
Adapter erkennt das und warnt: „State 'XX' is unknown for YY — using country-level holidays". Den
Eintrag aus der Auswahlliste wählen, statt ihn einzutippen. Ist der gespeicherte Eintrag durch eine
Datenaktualisierung weggefallen, weist die Karte oberhalb der Auswahlliste darauf hin und lässt die
Konfiguration unangetastet, bis ein neuer Eintrag gewählt wird.

**Ein Feiertag fehlt oder taucht unerwartet auf.**
Den passenden Feiertagstyp aktivieren — manche Tage zählen als Gedenktag statt als gesetzlicher
Feiertag, und das kann sich mit einem Datenupdate ändern. Ebenso die Ausschlussliste prüfen.

**Ein Ausschluss wirkt nach einem Update nicht mehr.**
Die Berechnungsregel des Feiertags wurde in den Daten umbenannt. Der Adapter warnt bei jedem
Durchgang vor veralteten Ausschlüssen; den Chip in den Einstellungen entfernen und den Feiertag neu
auswählen.

**Im Log steht um Mitternacht `Connection is closed.`**
Das kommt vom ioBroker-Controller beim Herunterfahren des Adapters, nicht vom Adapter selbst. Es ist
folgenlos — der Durchgang hat seine Datenpunkte zu diesem Zeitpunkt bereits geschrieben.

## Datenschutz

Der Adapter arbeitet vollständig offline, es verlassen keine Daten das System. Die optionale
Fehlerberichterstattung über Sentry lässt sich in den ioBroker-Einstellungen abschalten — siehe die
in der Haupt-README verlinkte Dokumentation des Sentry-Plugins.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.16.0 (2026-09-06)

- Fixed: Two holidays on one day could swap the reported name on their own with a data update. A fixed rule decides now — the name changes in 39 countries, among them Norway, Poland and Taiwan.
- Fixed: A day moved off a weekend no longer pushes aside the holiday that genuinely belongs on that date.
- New: Every data point now explains itself in the object tree, in your language.
- Fixed: Opening the settings marked them as changed when a stored state or province had vanished from the holiday data. The card points that entry out now instead.
- Fixed: A country written as a name instead of its code was rejected in the settings, although the same name worked when it came from the ioBroker system settings.
- Fixed: Refreshed holiday data — Belgian holidays now carry English names, and the entries for Albania and Andorra were corrected.
- Changed: Install the adapter from the ioBroker repository (stable or latest) — installing from GitHub is no longer supported.

### 0.15.1 (2026-09-04)

- Fixed: Installations kept whatever holiday data was already on the system, so corrections and new countries never arrived. An update now brings the current data along.

### 0.15.0 (2026-09-04)

- Fixed: With no holiday type enabled the adapter reported nothing without a word while the card still previewed a full year. Card and log now say it.
- Changed: Channel and data point names are refreshed on every run, so renames reach updated installations too — a manual rename of them is overwritten.

### 0.14.0 (2026-09-01)

- New: the next-holiday log line now shows the date in your system's date format — for example 26.10.2026 instead of 2026-10-26. The date data point itself stays machine-readable for scripts.

### 0.13.2 (2026-08-27) — stable

- Fixed: Stopping or restarting the instance while the holidays were being worked out cut that run short, which could leave half-written values and errors in the log.
- Changed: Heads-up for Austria — St. Martin's, Rupert's and Referendum Day count as observances now and disappear unless that type is enabled. Plus data fixes for Ireland, Russia and others.

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