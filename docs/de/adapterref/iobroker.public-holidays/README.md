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

Die Feiertagsdaten stammen aus der mitgelieferten Bibliothek `date-holidays`, die 207 Länder samt
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
(Systemeinstellungen → Basiseinstellungen → Land). Erkannt werden beide Listen, aus denen ioBroker ein
Land speichert — die Systemeinstellungen und der Einrichtungsassistent (bis Admin 8.0.14 schreibt der
Assistent Namen anders, z. B. „Vietnam" statt „Viet Nam") —, und die Karte zeigt die Vorschau für
das erkannte Land. Hat dieses Land keine Feiertagsdaten (z. B. Katar) oder steht es für mehrere
Länder („Serbia and Montenegro", „Netherlands Antilles"), sagt das Log das, und der Adapter
veröffentlicht ein leeres Ergebnis, bis ein Land gewählt ist. Sieben Länder der Feiertagsdaten haben
in der ioBroker-Liste gar keinen Namen — Saint-Barthélemy, Karibische Niederlande, Curaçao, die
Kanarischen Inseln, Saint-Martin, Südsudan und Sint Maarten: sie auf der Karte wählen.

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

### Mehrtägige Feiertage

Manche Feiertage dauern mehrere Tage — die Neujahrsferien in Russland, Chuseok in Korea, Tết in
Vietnam, das Opferfest in vielen Ländern. Jeder dieser Tage zählt: `today.isHoliday` ist an jedem
von ihnen wahr. `next` zeigt den nächsten Feiertag nach dem heute laufenden, nicht den zweiten Tag
desselben Feiertags. Ein Feiertag, der am Vorabend beginnt (jüdische und islamische Tage beginnen
mit der Dämmerung), zählt ab seinem ersten vollen Tag.

### Brückentage

Ein Brückentag ist ein einzelner Arbeitstag zwischen zwei freien Tagen, von denen mindestens einer
ein Feiertag ist — wer ihn freinimmt, überbrückt die Lücke zum Wochenende oder zum nächsten
Feiertag. Mit aktivierter Option nimmt der Adapter ihn als eigenen Feiertag auf, benannt als
„Brückentag" in der ioBroker-Systemsprache. Bei einem Wochenende Samstag + Sonntag:

- Feiertag am **Donnerstag** → der **Freitag** wird Brückentag,
- Feiertag am **Dienstag** → der **Montag** wird Brückentag,
- ein Wochentag, der von zwei Feiertagen eingerahmt ist, wird Brückentag — ein Mittwoch zwischen
  Dienstag und Donnerstag, ein Dienstag zwischen Montag und Mittwoch (z. B. der 2. Mai in Polen).

Das Wochenende ist das des Landes: Wo es auf Freitag und Samstag fällt (Israel, Saudi-Arabien,
Ägypten, Bangladesch …), überbrückt ein Mittwochs-Feiertag den Donnerstag, und ein Freitag wird nie
Brückentag. Einen Brückentag lösen nur ganztägige gesetzliche und Bankfeiertage aus — Gedenktage,
Schulferien, optionale Feiertage und Halbtags-Einträge wie Heiligabend ab 14 Uhr nicht. Ein
einzelner Mittwochs-Feiertag erzeugt bei einem Wochenende Samstag + Sonntag keinen: bis zum
Wochenende wären zwei Fehltage nötig. Ein Brückentag überschreibt nie einen echten Feiertag und
erzeugt nie weitere Brückentage; ein Tag, auf dem nur ein Feiertag eines abgeschalteten Typs liegt,
gilt als Arbeitstag.

### Ausgeschlossene Feiertage

Manche Feiertage sind für den eigenen Haushalt ohne Bedeutung — einzelne Einträge lassen sich
ausschließen. Die Auswahlliste bietet genau die Feiertage des gewählten Standorts und der
aktivierten Typen an, also das, was der Adapter sonst melden würde.

Ein ausgeschlossener Feiertag schließt seine Ersatztage mit aus — den Tag, auf den ein Feiertag
verschoben wird, wenn er auf ein Wochenende fällt (etwa Boxing Day auf den Montag); die Liste bietet
deshalb nur den Feiertag an. Ein Ausschluss eines abgeschalteten Feiertagstyps bleibt erhalten und
wird getrennt angezeigt: Er wirkt wieder, sobald der Typ eingeschaltet ist.

Ein Ausschluss wird über eine interne Kennung gespeichert, die aus der Berechnungsregel des
Feiertags stammt. Wird diese Regel durch ein späteres Datenupdate umbenannt oder entfernt — oder ist
ein einmaliges Datum vorbei —, trifft der Ausschluss ins Leere: Der Adapter schreibt dann eine
Warnung mit dem betroffenen Eintrag, und die Karte zeigt ihn als entfernbaren Chip unter der
Auswahlliste.

Ausschlüsse greifen **vor** der Brückentagsberechnung: Wer einen Donnerstags-Feiertag ausschließt,
verliert damit auch den zugehörigen Freitags-Brückentag.

### Erkannte Feiertage

Unten auf der Karte steht eine Vorschau der Feiertage, die der Adapter mit den aktuellen
Einstellungen für dieses Jahr erkennt — inklusive Brückentage und abzüglich der Ausschlüsse. Sie
entsteht mit denselben Funktionen wie im Adapter und nennt die Feiertage in der
ioBroker-Systemsprache wie die Datenpunkte, zeigt also den echten späteren Stand. Ist kein Land
gewählt, zeigt sie das erkannte Systemland.

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
`next` — ebenso die restlichen Tage eines Feiertags, der heute läuft.

Die Namen der Kanäle und Datenpunkte folgen der ioBroker-Systemsprache und werden bei jedem
Durchgang aufgefrischt — auch auf Anlagen, die aktualisiert statt neu installiert wurden. Ein von
Hand vergebener eigener Name wird dabei wieder überschrieben.

## Sprache

Feiertagsnamen erscheinen in der ioBroker-Systemsprache, sofern die Feiertagsdaten diese Sprache
führen, sonst auf Englisch — in den Datenpunkten wie in der Vorschau der Karte. Unterstützt sind
elf Sprachen: Deutsch, Englisch, Spanisch, Französisch, Italienisch, Niederländisch, Polnisch,
Portugiesisch, Russisch, Ukrainisch und Chinesisch. Die Ländernamen auf der Karte folgen der Sprache
der Admin-Seite.

## Fehlersuche

**Es werden überhaupt keine Feiertage gemeldet.**
Ins Log sehen. „No country configured" heißt, dass weder der Adapter noch die
ioBroker-Systemeinstellungen ein Land liefern. „System country '…' has no holiday data" / „… covers
several countries" / „… is not recognized" nennt das Systemland, das der Adapter nicht verwenden
konnte — auf der Karte ein Land wählen. „No holiday type is enabled" heißt, dass alle Typ-Häkchen
aus sind.

**Das eingestellte Bundesland oder die Region wird scheinbar ignoriert.**
Ein unbekanntes Bundesland oder eine unbekannte Region fällt still auf die gröbere Ebene zurück. Der
Adapter erkennt das und warnt: „State 'XX' is unknown for YY — using country-level holidays". Den
Eintrag aus der Auswahlliste wählen, statt ihn einzutippen. Ist der gespeicherte Eintrag durch eine
Datenaktualisierung weggefallen, weist die Karte oberhalb der Auswahlliste darauf hin und lässt die
Konfiguration unangetastet, bis ein neuer Eintrag gewählt wird. Zwölf Gebiete kann die
Feiertagsbibliothek gar nicht laden (bekannter Fehler — zehn Inseln der Cookinseln, Timaru und
Buller in Neuseeland): Der Adapter verwendet die Feiertage des übergeordneten Gebiets und sagt das
im Log und auf der Karte.

**Der Tag wechselt einige Stunden zu früh oder zu spät.**
Die Tage folgen der Uhr des ioBroker-Hosts. Ein Docker-Container ohne Zeitzone läuft auf UTC — für
den Container `TZ` setzen. Mit Debug-Log nennt der Adapter eine Host-Zeitzone, die keine des Landes
ist.

**Am Tag der Sommerzeit-Umstellung bleiben die Werte auf dem Vortag.**
In einigen Zeitzonen überspringt die Uhr bei Beginn der Sommerzeit die Mitternacht (Chile, Kuba,
Ägypten, Libanon, Azoren). Der Mitternachtslauf findet an diesem Tag nicht statt; die Werte des
Vortags bleiben bis zum nächsten Lauf stehen.

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

Die Feiertage werden offline auf dem eigenen System berechnet — dafür stellt der Adapter keine
Netzwerkanfrage.

Die Fehlermeldung über Sentry ist ab Werk aktiv; was sie sendet und wie man sie abschaltet, steht im [Abschnitt Sentry der Haupt-README](https://github.com/krobipd/ioBroker.public-holidays/blob/main/README.md#sentry--error-reporting).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.18.0 (2026-09-25)

- Fixed: Holidays lasting several days now count on every day (Russian New Year, Chuseok, Tết, Eid …); the next holiday skips the rest of the one running today.
- Fixed: Bridge days follow the country's own weekend (Friday and Saturday in Israel, Saudi Arabia, Egypt …) and come only from whole-day public and bank holidays.
- New: A single working day between two holidays is a bridge day too, e.g. 2 May in Poland or 7 December in Spain.
- Fixed: Excluding a holiday now excludes its substitute day as well, e.g. Boxing Day moved to the Monday.
- Fixed: The system country is recognised for the names of the first-run wizard (Korea, Vietnam, Serbia …); a country the adapter cannot use is named in the log.
- Fixed: The settings card shows holiday names in your language like the data points and previews the country detected from the system settings.
- Improved: The settings card lists countries in your admin language and keeps exclusions of holiday types you switched off.
- Changed: The bridge-day name in Russian and Ukrainian is now "День-мост" / "День-міст"; next.daysUntil uses the unit "d".
- Fixed: Error reporting via Sentry is active by default — the README and the documentation said otherwise.
- New: Holiday data for Uzbekistan.

### 0.17.0 (2026-09-15) — stable

- Fixed: Changing the country or the state in the settings now clears the narrower selection too — a leftover state code could silently publish another region's holidays.
- Fixed: Bridge days now carry their name in your language even for countries whose holiday data has no translation for it — they used to fall back to the English "Bridge day".
- Fixed: Without a configured country the adapter now publishes an empty result instead of leaving the last run's values standing.
- New: Errors during a run are reported to Sentry when error reporting is enabled in the ioBroker settings, so they can be fixed without a log file.

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