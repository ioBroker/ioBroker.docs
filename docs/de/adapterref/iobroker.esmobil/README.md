---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.esmobil/README.md
title: ioBroker.esmobil
hash: YfLXnDcM14TcdDB9HEUmpYiPd00op3YFQs+V8pVG6Nc=
---
![Logo](../../../en/adapterref/iobroker.esmobil/admin/esmobil.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.esmobil.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.esmobil.svg)
![Anzahl der Installationen](https://iobroker.live/badges/esmobil-installed.svg)
![NPM](https://nodei.co/npm/iobroker.esmobil.png?downloads=true)

# ioBroker.esmobil

## ESmobil-Adapter für ioBroker

ioBroker-Adapter für den Stundenplan ( **VpMobil/Indiware** ) und Hausaufgaben/Bemerkungen/Noten ( **Home.InfoPoint** ) – **exklusiv für die vier Schulen der [TEGW-Schulgruppe](https://www.tegw.de/)** :

- **EOSW** – Europäische Oberschule Waldenburg
- **EGW** – Europäisches Gymnasium Waldenburg
- **EOSH** - Europäische Oberschule Hartmannsdorf
- **EGL** - Europäische Grundschule Lichtenstein

Dies ist bewusst **kein** generischer VpMobil/Indiware-Adapter: Die Serveradressen sind pro Schule fest codiert (siehe unten) und nicht frei konfigurierbar. Die Adapterkonfiguration erlaubt lediglich die Auswahl der eigenen Schule aus einer vorgegebenen Liste. Name und Konzept dieses Adapters stammen von der Android-App **ESmobil** , die von derselben Schulgruppe verwendet wird – dieser Adapter portiert deren VpMobil/Home.InfoPoint-Integration 1:1 auf Node.js.

Der Adapter läuft kontinuierlich im Hintergrund (Daemon-Modus, wie die meisten ioBroker-Adapter - kein Cron-Job): Er ruft die konfigurierten Quellen sofort beim Start ab und anschließend in einem konfigurierbaren Intervall (Standard: alle 30 Minuten).

Dieser Adapter ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu den Betreibern von VpMobil/Indiware oder Home.InfoPoint.

## Was funktioniert für welche Schule?

| Schule | Fahrplan (VpMobil)                                                                                                 | Hausaufgaben/Bemerkungen/Noten (Home.InfoPoint) |
| ------ | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| EOSW   | ✅                                                                                                                  | ✅                                               |
| EGW    | ✅ (teilt die VpMobil-Instanz mit EOSW, eigener Home.InfoPoint-Bereich)                                             | ✅                                               |
| EOSH   | ⚠️ **unbestätigt** – Adresse anhand des Musters anderer Schulen vermutet, nie verifiziert (siehe `lib/schools.js`) | ✅                                               |
| EGL    | ❌ Kein VpMobil-Fahrplan verfügbar                                                                                  | ✅                                               |

Der Adapter blendet automatisch den Zeitplanteil der Konfiguration für EGL aus und protokolliert zusätzlich beim Start eine Warnung, wenn EOSH ausgewählt ist, damit die nicht bestätigte Adresse nicht unbemerkt bleibt.

## Konfiguration

### Schule

Wählen Sie eine der vier oben aufgeführten Schulen aus. Alles Weitere (Serveradressen) wird automatisch daraus abgeleitet.

### Fahrplan (VpMobil / Indiware)

Nur sichtbar, wenn die ausgewählte Schule einen Stundenplan hat (nicht für EGL).

| Feld         | Beschreibung                                                           |
| ------------ | ---------------------------------------------------------------------- |
| Klasse       | Klassenname genau wie von VpMobil angegeben, z.B. `08m2`                |
| Benutzername | Schulweite Anmeldung, nicht persönlich – Standardeinstellung `schueler` |
| Passwort     | Schulweites VpMobil-Passwort                                           |

### Hausaufgaben / Bemerkungen / Noten (Home.InfoPoint)

Optional, aktiviert über das Kontrollkästchen „Auch Hausaufgaben, Bemerkungen und Noten abrufen“.

- Verfügbar für alle vier Schulen.

| Feld                    | Beschreibung                                                      |
| ----------------------- | ----------------------------------------------------------------- |
| Benutzername / Passwort | Persönlicher Login des Studenten                                  |
| Moodle-Kalender-URL     | Optional, unabhängig von den oben genannten Feldern – siehe unten |

Benutzername/Passwort für Home.InfoPoint und die Moodle-Kalender-URL sind voneinander unabhängig – eines (oder beide) können ausgefüllt werden. Bemerkungen und Noten stammen ausschließlich von Home.InfoPoint; die Hausaufgabenliste kombiniert beide Quellen.

#### Moodle-Kalender (optional)

Wenn Sie auch möchten, dass Moodle-Fristen (z. B. Abgabetermine für Aufgaben) angezeigt werden, `homework.entries` Fügen Sie hier Ihre persönliche Moodle-Kalender-Export-URL ein. Sie finden diese in Moodle unter **Kalender → Kalender exportieren → „Veranstaltungen dieses Kurses“/„Alle Kurse“ → „Kalender-URL abrufen“** . Diese URL enthält bereits ein privates Zugriffstoken und wird daher wie ein Passwort gespeichert (verschlüsselt und in der Benutzeroberfläche verborgen).

## Staatsbaum

```
esmobil.0.info.connection          boolean  - at least one source was fetched successfully
esmobil.0.plan.day1.date           string   - date (yyyy-MM-dd) of the Monday of the school week
esmobil.0.plan.day1.sourceTimestamp string  - data timestamp reported by the server
esmobil.0.plan.day1.lessonCount    number   - number of lessons
esmobil.0.plan.day1.lessons        string   - lessons as a JSON array
esmobil.0.plan.day1.zusatzInfo     string   - general notice(s) for the day (e.g. special schedule, event day), multiple lines joined with " | "; empty if none
esmobil.0.plan.day2.* ... plan.day5.*       - the same states for Tuesday through Friday of the same week
esmobil.0.plan.week.days           string   - the complete week plan (day1-day5) as one JSON array, see below
esmobil.0.homework.count           number   - number of homework entries (Home.InfoPoint + Moodle combined)
esmobil.0.homework.entries         string   - homework as a JSON array, each entry tagged with "source": "homeinfopoint" or "moodle"
esmobil.0.homework.newCount        number   - number of NEW homework entries since the last poll
esmobil.0.homework.newEntries      string   - new homework entries since the last poll, as a JSON array
esmobil.0.remarks.count            number   - number of remarks
esmobil.0.remarks.entries          string   - remarks as a JSON array
esmobil.0.remarks.newCount         number   - number of NEW remarks since the last poll
esmobil.0.remarks.newEntries       string   - new remarks since the last poll, as a JSON array
esmobil.0.grades.subjectCount      number   - number of subjects WITH at least one grade
esmobil.0.grades.bySubject         string   - all subjects as a JSON object (including subjects without any grade)
esmobil.0.grades.subjects.<subject>.label       string - subject label, e.g. "DE - Deutsch (Schuster)"
esmobil.0.grades.subjects.<subject>.count       number - number of grades for this subject
esmobil.0.grades.subjects.<subject>.average     number - average of this subject as a number, e.g. 1.7
esmobil.0.grades.subjects.<subject>.averageNote string - average of this subject as a grade, e.g. "2+"
esmobil.0.grades.subjects.<subject>.entries     string - grades of this subject as a JSON array
esmobil.0.grades.overallAverage    number   - average across all subjects as a number (weighted per grade, not per subject)
esmobil.0.grades.overallAverageNote string  - the same average as a grade
esmobil.0.grades.newCount          number   - number of NEW grades since the last poll
esmobil.0.grades.newEntries        string   - new grades since the last poll, as a JSON array (including subject)
esmobil.0.info.newItemsCount       number   - new homework+remarks+grades combined in this poll
esmobil.0.info.lastNewAt           string   - timestamp (ISO) of the last poll that found at least one new entry
```

### Benachrichtigung erhalten, wenn etwas Neues eintrifft

Der Adapter selbst sendet keine Push-Benachrichtigungen (er kennt Ihre Telegram-/Pushover-/etc.-Einstellungen nicht) – er bietet aber alles, was eine benutzerdefinierte Automatisierung (Skript, Blockly, Node-RED) dafür benötigt:

- `esmobil.0.info.lastNewAt` Die Änderung erfolgt **nur** dann, wenn eine Abfrage mindestens einen neuen Eintrag gefunden hat – der zuverlässigste Auslösepunkt für „bei Zustandsänderung“, da er nicht von zwei aufeinanderfolgenden, gleich großen Mengen neuer Einträge „verschluckt“ werden kann (anders als bei einem einfachen Wahr/Falsch- oder Zählerzustand, der bei identischem Wert möglicherweise nicht erneut ausgelöst wird).
- `esmobil.0.info.newItemsCount` sowie `homework.newCount` /`remarks.newCount` /`grades.newCount` Sag, wie viele es waren.
- `homework.newEntries` /`remarks.newEntries` /`grades.newEntries` enthalten die neuen Einträge selbst (Text für die Benachrichtigung).

Beispiel eines einfachen JavaScript-Adapterskripts:

```js
on({ id: 'esmobil.0.info.lastNewAt', change: 'ne' }, () => {
    const homework = JSON.parse(getState('esmobil.0.homework.newEntries').val);
    const grades = JSON.parse(getState('esmobil.0.grades.newEntries').val);
    // e.g. sendTo('telegram.0', 'send', { text: '...' });
});
```

Bei der allerersten Abfrage nach der Installation/Aktualisierung wird nichts als "neu" gezählt (sonst würden ja alle vorhandenen Einträge einmal als neu gemeldet) – echte neue Einträge werden erst ab der zweiten Abfrage erkannt.

`plan.day1` durch `plan.day5` Es werden immer Montag bis Freitag einer realen Kalenderwoche angezeigt – nicht „die nächsten 5 verfügbaren Tage“. An Wochentagen wird die aktuelle Woche angezeigt (einschließlich bereits vergangener Wochentage, sodass die Wochenansicht immer vollständig ist); an Samstagen/Sonntagen wird bereits die kommende Woche angezeigt. Tage ohne Daten vom Server (z. B. Feiertage oder vergangene Wochentage, die VpMobil nicht mehr speichert) zeigen weiterhin das korrekte Datum an. `lessonCount: 0`, ein leerer `lessons` Array und ein leeres `zusatzInfo` Statt zu fehlen, bleiben diese Zustände bei EGL leer, da dort kein VpMobil-Fahrplan existiert.

Für eine Wochenansicht (z. B. in Ihrem eigenen Dashboard/Visualisierungs-Widget) ist die einfachste Option: `plan.week.days` - ein einzelnes JSON-Array mit allen fünf Tagen in dieser Form:

```json
[
  { "weekdayEn": "Monday", "weekdayDe": "Montag", "date": "2026-09-07", "sourceTimestamp": "04.09.2026, 10:36", "lessons": [ /* see below */ ], "zusatzInfo": [] },
  { "weekdayEn": "Tuesday", "weekdayDe": "Dienstag", "date": "2026-09-08", "sourceTimestamp": "...", "lessons": [], "zusatzInfo": ["EOSW: Kl. 7m2 1.-5. Stunde Alkoholparcours"] }
]
```

Auf der Notenseite von Home.InfoPoint werden immer **alle** Fächer des Kurses aufgelistet, auch solche ohne eingetragene Note (dort als leere Tabelle dargestellt) -`grades.subjectCount` /`grades.bySubject` Andernfalls würden diese ebenfalls mitgezählt. Für eine übersichtliche und durchsuchbare Ansicht unter Admin → Objekte erhält daher jedes Fach **mit mindestens einer Note** auch einen eigenen Kanal. `grades.subjects.<subject-code>` (z.B `grades.subjects.de`, `grades.subjects.bio`) mit `label`, `count`, `average`, `averageNote` Und `entries` Fächer ohne Note erhalten absichtlich keinen eigenen Kanal, um die Objektliste nicht mit leeren Einträgen zu überladen – sie erscheinen nur (mit einem leeren Array) in `grades.bySubject` Die

`average` zeigt den Durchschnitt als Zahl an (z. B. 1,7). `averageNote` Derselbe Durchschnitt wie eine Note (z. B. „2+“). Bewertungen, die nicht eindeutig als Note interpretiert werden können (z. B. Freitext), zählen nicht zum Durchschnitt, werden aber dennoch berücksichtigt. `count` Die `grades.overallAverage` /`overallAverageNote` den gleichen Durchschnittswert über alle Fächer hinweg bilden.

A `lessons` Der Eintrag hat folgende Form:

```json
{
  "period": "3",
  "begin": "09:50",
  "end": "10:35",
  "subjects": ["MA"],
  "teacher": "Mül",
  "room": "101",
  "info": "substitution",
  "changed": true
}
```

## Changelog
### 0.5.12 (2026-09-22)
* Fix: `plan.day1`-`plan.day5` channel names now include translations for all 11 recommended languages (previously only `en`/`de`)
* Fix: README's `plan.week.days` example now shows `weekdayEn`/`weekdayDe` instead of the removed single `weekday` field

### 0.5.11 (2026-09-13)
* Fix: all `common.name` objects created in code now include translations for all 11 recommended languages (previously only `en`/`de`), fixing repository object-structure check warnings (E6001)

### 0.5.10 (2026-09-13)
* Fix: all log messages in `main.js` are now in English (were German)
* Fix: all object/channel `common.name` fields created in code now use bilingual `{en, de}` names instead of German-only text
* Fix: `plan.week.days` entries now carry `weekdayEn`/`weekdayDe` instead of a single German-only `weekday` field
* Fix: `pollIntervalMinutes` now has an enforced upper bound (1440 minutes / 24h) to avoid a `setTimeout` overflow with very large configured values
* README: added a link to the [TEGW school group](https://www.tegw.de/)

### 0.5.9 (2026-09-09)
* Repository maintenance: removed the changelog entry for 0.5.7, a version that was tagged in this file's history but never actually published to npm (0.5.6 was followed directly by 0.5.8)

### 0.5.8 (2026-09-09)
* Fix: a Moodle homework/exam due date with a specific time (not all-day) could be off by one day depending on the time of day, because the UTC timestamp from the calendar export was used as-is instead of being converted to the school's local time (Europe/Berlin) first (e.g. a `20260913T220000Z` deadline - 00:00 CEST on the 14th - was wrongly shown as due on the 13th)
* Corrected for both this adapter (`lib/moodle.js`) and the companion Android app

## License

MIT License

Copyright (c) 2026 Maik Ries & Christian Winter <iobroker@ne-xt.de>

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