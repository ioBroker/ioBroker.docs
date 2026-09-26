![Logo](admin/esmobil.png)
# ioBroker.esmobil

[![NPM version](https://img.shields.io/npm/v/iobroker.esmobil.svg)](https://www.npmjs.com/package/iobroker.esmobil)
[![Downloads](https://img.shields.io/npm/dm/iobroker.esmobil.svg)](https://www.npmjs.com/package/iobroker.esmobil)
![Number of Installations](https://iobroker.live/badges/esmobil-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.esmobil.png?downloads=true)](https://nodei.co/npm/iobroker.esmobil/)

## ESmobil adapter for ioBroker

ioBroker adapter for the school timetable (**VpMobil/Indiware**) and homework/
remarks/grades (**Home.InfoPoint**) - **exclusively for the four schools of
the [TEGW school group](https://www.tegw.de/)**:

- **EOSW** - Europäische Oberschule Waldenburg
- **EGW** - Europäisches Gymnasium Waldenburg
- **EOSH** - Europäische Oberschule Hartmannsdorf
- **EGL** - Europäische Grundschule Lichtenstein

This is deliberately **not** a generic VpMobil/Indiware adapter: the server
addresses are hard-coded per school (see below), not freely configurable. The
adapter configuration only lets you pick your own school from a fixed list.
The name and the knowledge behind this adapter come from the Android app
**ESmobil** used by the same school group - this adapter ports its VpMobil/
Home.InfoPoint integration 1:1 to Node.js.

The adapter runs continuously in the background (daemon mode, like most
ioBroker adapters - no cron job): it fetches the configured sources
immediately on start, and again on a configurable interval afterwards
(default: every 30 minutes).

This adapter is an independent community project and has no connection to
the operators of VpMobil/Indiware or Home.InfoPoint.

## What works for which school?

| School | Timetable (VpMobil) | Homework/remarks/grades (Home.InfoPoint) |
| --- | --- | --- |
| EOSW | ✅ | ✅ |
| EGW | ✅ (shares the VpMobil instance with EOSW, own Home.InfoPoint area) | ✅ |
| EOSH | ⚠️ **unconfirmed** - address guessed from the pattern of the other schools, never verified (see `lib/schools.js`) | ✅ |
| EGL | ❌ no VpMobil timetable available | ✅ |

The adapter automatically hides the timetable part of the configuration for
EGL, and additionally logs a warning on start if EOSH is selected, so the
unconfirmed address doesn't go unnoticed.

## Configuration

### School

Choose one of the four schools listed above. Everything else (server
addresses) is derived from that automatically.

### Timetable (VpMobil / Indiware)

Only visible if the selected school has a timetable (not for EGL).

| Field | Description |
| --- | --- |
| Class | Class name exactly as reported by VpMobil, e.g. `08m2` |
| Username | School-wide login, not personal - defaults to `schueler` |
| Password | School-wide VpMobil password |

### Homework / remarks / grades (Home.InfoPoint)

Optional, enabled via the "Also fetch homework, remarks and grades" checkbox
- available for all four schools.

| Field | Description |
| --- | --- |
| Username / Password | Personal login of the student |
| Moodle calendar URL | Optional, independent of the fields above - see below |

Home.InfoPoint username/password and the Moodle calendar URL are independent
of each other - either (or both) can be filled in. Remarks and grades only
come from Home.InfoPoint; the homework list combines both sources.

#### Moodle calendar (optional)

If you also want Moodle deadlines (e.g. assignment due dates) to show up in
`homework.entries`, paste your personal Moodle calendar export URL here. Find
it in Moodle under **Calendar → Export calendar → "Events of this
course"/"All courses" → "Get calendar URL"**. This URL already contains a
private access token, so it is stored the same way as a password
(encrypted, hidden in the UI).

## State tree

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

### Getting notified when something new arrives

The adapter itself does not send push notifications (it doesn't know your
Telegram/Pushover/etc. setup) - but it provides everything a custom
automation (script, Blockly, Node-RED) needs for that:

- `esmobil.0.info.lastNewAt` changes **only** when a poll found at least one
  new entry - the most reliable trigger point for "on state change", since it
  can't be "swallowed" by two consecutive same-sized batches of new entries
  (unlike a simple true/false or counter state, which might not trigger again
  on an identical value).
- `esmobil.0.info.newItemsCount` as well as `homework.newCount`/
  `remarks.newCount`/`grades.newCount` say how many there were.
- `homework.newEntries`/`remarks.newEntries`/`grades.newEntries` contain the
  new entries themselves (text for the notification).

Example of a simple JavaScript adapter script:

```js
on({ id: 'esmobil.0.info.lastNewAt', change: 'ne' }, () => {
    const homework = JSON.parse(getState('esmobil.0.homework.newEntries').val);
    const grades = JSON.parse(getState('esmobil.0.grades.newEntries').val);
    // e.g. sendTo('telegram.0', 'send', { text: '...' });
});
```

On the very first poll after installation/update, nothing counts as "new"
(otherwise all existing entries would be reported as new once) - genuine new
entries are only detected starting with the second poll.

`plan.day1` through `plan.day5` always represent Monday through Friday of a
real calendar week - not "the next 5 available days". On a weekday, that's
the current week (including already-past weekdays, so the week view is
always complete); on a Saturday/Sunday, it's already the upcoming week. Days
without data from the server (e.g. holidays, or a past weekday VpMobil no
longer keeps) still report the correct date with `lessonCount: 0`, an
empty `lessons` array and an empty `zusatzInfo`, instead of being missing.
For EGL, all these states stay empty since there is no VpMobil timetable
there.

For a week view (e.g. in your own dashboard/vis widget), the simplest option
is `plan.week.days` - a single JSON array with all five days in this form:

```json
[
  { "weekdayEn": "Monday", "weekdayDe": "Montag", "date": "2026-09-07", "sourceTimestamp": "04.09.2026, 10:36", "lessons": [ /* see below */ ], "zusatzInfo": [] },
  { "weekdayEn": "Tuesday", "weekdayDe": "Dienstag", "date": "2026-09-08", "sourceTimestamp": "...", "lessons": [], "zusatzInfo": ["EOSW: Kl. 7m2 1.-5. Stunde Alkoholparcours"] }
]
```

Home.InfoPoint's grades page always lists **all** subjects of the class,
including ones without any recorded grade (shown as an empty table there) -
`grades.subjectCount`/`grades.bySubject` would otherwise count those too. For
a clear, browsable view in Admin → Objects, every subject **with at least one
grade** therefore also gets its own channel `grades.subjects.<subject-code>`
(e.g. `grades.subjects.de`, `grades.subjects.bio`) with `label`, `count`,
`average`, `averageNote` and `entries`. Subjects without any grade
deliberately don't get their own channel, to avoid cluttering the object list
with empty entries - they only appear (with an empty array) in
`grades.bySubject`.

`average` shows the average as a number (e.g. 1.7), `averageNote` the same
average as a grade (e.g. "2+"). Grades that can't be clearly interpreted as a
grade (e.g. free text) don't count towards the average, but still count
towards `count`. `grades.overallAverage`/`overallAverageNote` form the same
average across all subjects.

A `lessons` entry has the form:

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