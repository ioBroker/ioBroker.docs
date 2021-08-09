---
BADGE-Number of Installations: http://iobroker.live/badges/ical-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.ical.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ical.svg
---
![Logo](ical.png)
# ioBroker iCal adapter
Mit diesem Adapter können .ics-Dateien von einer bestimmten URL gelesen und analysiert werden (Google Kalender oder iCal).
Alternativ ist es möglich, eine lokale ".ics" -Datei zu verwenden (verwenden Sie den absoluten Pfad zur Datei anstelle der URL)
## Verwendung
Basierend auf iCal Adapter für (CCU.IO) [https://github.com/hobbyquaker/ccu.io/tree/master/adapter/ical] von vader722

### Adapter iCal
Der iCal-Adapter für ioBroker liest Kalenderdateien im ".ics" -Format von der angegebenen URL und schreibt Ereignisse, die sich im vordefinierten Zeitintervall befinden, in die ioBroker-Variable. Alternativ ist es möglich, eine lokale .ics-Datei zu verwenden (verwenden Sie den absoluten Pfad zur Datei anstelle der URL).
Sie können in VIS mit dem Widget `basic html - String (unescaped)` angezeigt werden.

Es werden 2 Variablen angelegt:
- `iCalReadTrigger`
- `iCalEvents`

Die Variable `iCalReadTrigger` dient zum Triggern des Einlesevorgangs. 
In den Settings können mehrere URLs hinterlegt werden, von welchen der Kalender eingelesen wird. 
Die Kalender werden dann nacheinander eingelesen und das Ergebnis zusammengefasst. 
Alternativ kann dem Lesebefehl auch eine URL mitgegeben werden, um z.B. zeitweilig einen anderen Kalender einzulesen.

Zum Einlesen von den `defaultURLs` muss der String `read` in die Variable `iCalReadTrigger` geschrieben werden.

Zum Einlesen von einer beliebigen URL muss der String `read https://...` in die Variable `iCalReadTrigger` geschrieben werden.

Das Ergebnis liefert der iCal Adapter in die Variable `iCalEvents`.

Durch schreiben von `check` in `iCalReadTrigger` wird der Check-Vorgang auf Events auf die gelesenen Daten ohne erneutes einlesen der Daten ausgelöst.

Alternativ kann der Adapter auch automatisch in einem definierbaren Intervall die Kalender abfragen (nur mit der `defaultURL`). 
Dazu in den Settings mit der Variablen runEveryMinutes das Abfrageintervall (in Minuten) einstellen.

Bedeutung der Optionen im Konfigfile:

- `preview`: 7 heisst, dass Termine 7 Tage im voraus angezeigt werden
- `runEveryMinutes`: 30 bedeutet dass der Adapter automatisch alle 30min den Kalender neu einliesst. Bei 0 wird nicht automatisch eingelesen
- `colorize`: true Termine am heutigen Tag werden rot gefärbt, Termine am morgigen Tag orange, diese Option überstimmt die Option everyCalOneColor
- `debug`: false bei true werden erweiterte Ausgaben ins CCU.IO Log geschrieben
- `defColor`: `white` legt die Standardfarbe der Kalendereinträge fest
- `fulltime`: ` ` legt fest durch welchen String bei ganztägigen Terminen die Uhrzeit 00:00 ersetzt wird. Bei Leerzeichen (zwischen den Hochkommas) wird dir Uhrzeit bei ganztägigen Terminen weggelassen
- `replaceDates`: true Bei true wird bei heutigen Terminen das heutige Datum durch den String todayString ersetzt (z.B. "Heute"). Bei morgigen Terminen durch den String tomorrowString
- `everyCalOneColor`: false Bei true wird bei mehreren Kalendern jeder Kalender in einer festzulegenden Farbe eingefärbt. Ist die Option colorize gesetzt, funktioniert dies nicht!
- `Calendar1`: 
    - "calURL": "http://11111.ics", URL des Kalenders 
    - "calColor": "white" Farbe des Kalenders, wenn die Option "everyCalOneColor" gesetzt ist.
     
  Es können beliebig viele Kalender eingetragen werden. Im Standard Konfigfile sind 2 Kalender eingetragen.
- `Events`: 
  - `name`: "Urlaub":  
  - `enabled`: true # legt fest, ob das Event bearbeitet wird 
  - `display`: false # legt fest, ob das Event auch in dem iCalEvents angezeigt wird, oder nur ausgewertet wird
  
  Durch setzen eines Events (in diesem Beispiel „Urlaub“), werden die Kalender nach dem String „Urlaub“ durchsucht. 
  Sollte ein Termin mit dem Stichwort „Urlaub“ in einem Kalender stehen, so wird automatisch eine State mit dem 
  Namen Urlaub auf True gesetzt. Ist der Termin vorbei, wird der State wieder auf false gesetzt. 
  Es wird für jeden Tag des preview Zeitraums ein Status angelegt. Achtung! 
  Es wird nach einem Substring gesucht, d.h. ein Eintrag im Kalender „Urlaub“ wird genauso erkannt wie ein 
  Eintrag „Urlaub Eltern“. Dies ist beim festlegen der Ereignisse zu berücksichtigen.
  
Durch Anpassen der CSS im VIS können die Styles von heutigen (Standard rot) und morgigen Terminen (Standard Orange) festegelegt werden: 
- `iCalWarn` - Zeilenanfang Kalendereintrag heute
- `iCalPreWarn` - Zeilenanfang Kalendereintrag morgen 
- `iCalNormal` - Zeilenende von heute 
- `iCalNormal2` - Zeilenende von morgen

### Kalender
#### Apple iCloud Kalender
Apple iCloud Kalender können angezeigt werden, wenn sie vorher freigegeben werden. Am besten einen eigenen Kalender für die Homematic anlegen, da der Kalender fuer alle freigegeben wird.
Dazu mit der rechten Maustaste auf dem Kalender in der Kalender App klicken und Freigabeeinstellungen auswählen. Jetzt einen Haken bei "Öffentlicher Kalender" setzen und die angezeigte URL kopieren. WICHTIG: die Url beginnt mit webcal://p0X-cale.....
`webcal` muss durch `http` ersetzt werden. Diese URL dann entweder in den Settings bei defaultURL eintragen, oder sie bei `read URL` angeben, also z.B. `readURL http://p-03-calendarws.icloud.com/xxxxxxxxx`

#### Google Kalender
Zum Einbinden eines Google Kalenders muss die Kalendereinstellung des Google Kalenders aufgerufen werden (mit der Maus auf "runter Pfeil" neben dem Kalender klicken). Die URL des Kalenders bekommt man durch klicken auf das `ICAL` Symbol neben dem Feld "Privatadresse". Diese URL dann entweder in den Settings bei defaultURL eintragen, oder sie bei `read URL` angeben, also z.B. `readURL https://www.google.com/calendar/ical/xxxxxxxx/basic.ics`.

#### OwnCloud Kalender
Zum Einbinden von gesharten Kalendern einer OwnCloud muss man dort in der Kalenderansicht in OwnCloud diesen Kalender als gesharten Kalender freigeben und dort den Link zum Kalender anzeigen lassen und diese URL (https://owncloud.xxxxxx.de/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export) entsprechend in den ioBroker.ical Adapter mit Nutzername und Passwort angeben.

#### Baikal CalDAV+CardDAV Server
Der Baikal-Server bringt das "ics-export"-Plugin mit welches den Export eines Kalenders in eine gesammelte ICal-Datei erlaubt. Dieses Plugin wird direkt über die URL ausgewählt und erlaubt eine problemlose Zusammenarbeit mit dem vorliegenden ioBroker-Adapter. Wichtig ist der Exportfilter, welcher einfach an die Kalender-URL angehangen zu werden braucht (`https://SERVER/baikal/cal.php/calendars/path/to/calendar?export&accept=ical`). Bei Anmeldeproblemen bitte in den Admin-Einstellungen der Web-UI des Baikal-Servers unter `Settings` den `WebDAV authentication type` von `DIGEST` auf `BASIC` stellen.

### CSS
In dem generierten HTML sind zwei Arten von CSS-Klassen enthalten, um Gestaltungsfreiheit zu ermöglichen.

#### Zeitbasierte CSS-Klassen
* _iCalNormal _ / _ iCalNormal2_: Das Ereignis wurde vor dem heutigen Tag gestartet (und wird noch ausgeführt) oder später, wie in 3 Tagen. Standardfarbe ohne CSS und ohne Kalenderfarbe ist die konfigurierte Adapterfarbe
* _iCalWarn _ / _ iCalWarn2_: Das Event startet heute, Standardfarbe ohne CSS und ohne Kalenderfarbe ist `rot`
* _iCalPreWarn _ / _ iCalPreWarn2_: Das Event startet morgen, Standardfarbe ohne CSS und ohne Kalenderfarbe ist `orange`
* _iCalPrePreWarn _ / _ iCalPrePreWarn2_: Das Event startet übermorgen, Standardfarbe ohne CSS und ohne Kalenderfarbe ist `gelb`
Die erste CSS-Klasse (z. B. iCalNormal) wird für Datum und Uhrzeit des HTML-Codes verwendet, und die zweite CSS-Klasse (z. B. iCalNormal2) wird für den Ereignisnamen verwendet.

CSS-Beispiel für diese CSS-Klassen, um die Ausgabe etwas anders zu formatieren (z. B. Datum / Uhrzeit links + fett und Ereignisname rechts ...):
```
.icalWarn{
    color:red;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPreWarn{
    color:yellow;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalPrePreWarn{
    color:white;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalPrePreWarn2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
.icalNormal{
    color:green;
    float:left;
    font-size:12px;
    font-weight:bold;
}
.icalNormal2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Kalenderbasierte CSS-Klassen
Jeder Bereich hat auch eine CSS-Klasse, die auf dem Namen des Kalenders basiert, in dem sich das Ereignis befindet. Der in der Adapterkonfiguration definierte "Kalendername" wird dafür verwendet (Leerzeichen werden durch Unterstriche ersetzt).

* _iCal- <Kalendername> _: Diese Klasse wird für Datum und Uhrzeit des HTML-Codes verwendet
* _iCal-> calendername2> _: Diese Klasse wird für den Ereignisnamen verwendet

Um diese CSS-Klassen festzulegen, müssen Sie auch die zeitbasierte CSS-Klasse verwenden, z. _.icalNormal2.iCal- <Kalendername> 2_:
```
.icalNormal2.iCal-Google2{
    color:white;
    float:right;
    font-size:12px;
    font-weight:normal;
}
```

#### Beispiel für generiertes HTML

```
<span style="font-weight: bold; color:white"><span class="icalNormal iCal-calendar-today">&#8594; 3.1.2018 2:00</span></span><span style="font-weight: normal; color:white"><span class='icalNormal2 iCal-calendar-today2'> TestEvent</span></span><br/>
<span style="font-weight: bold; color: red"><span class="icalWarn iCal-calendar-today">1.1.2018  ganzer Tag</span></span><span style="font-weight:normal;color:red"><span class='icalWarn2 iCal-calendar-today2'> Today Event</span></span><br/>
```

## Filter
In Instanzoptionen ist es möglich, einen Filter pro Kalender zu verwalten. Es muss eine durch Semikolons getrennte Liste sein. 
Wenn Sie die Option "Als regulären Ausdruck filtern" aktivieren, 
wird der Filter als regulärer Ausdruck interpretiert. 
Während der Kalenderaktualisierung werden alle Ereignisse ausgeschlossen, 
die nach Beschreibung, Ort oder Zusammenfassung übereinstimmen.

Das Suchmuster ist:
```
SUMMARY:MySummary
DESCRIPTION:MyDescription
LOCATION:Mein Standort
```

Blacklist: Wenn Sie alle Ereignisse eines bestimmten Ortes ausschließen möchten, verwenden Sie `LOCATION: MyLocation` oder `MyLocation` oder 2 Orte `LOCATION:MyLocation;LOCATION:SomewhereElse`.
Whitelist: Wenn Sie nur Ereignisse einer bestimmten Position einschließen möchten, verwenden Sie reguläre Ausdrücke wie `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!MyLocation).*)$/` oder für 2 Standorte `/^(SUMMARY:.*)\s*(DESCRIPTION:.*)\s*(LOCATION:(?!((MyHomeLocation)|(MyWorkLocation))).*)$/`

## Changelog
<!--
### 1.11.3 (2021-08-04)
-->

### 1.11.2 (2021-08-01)
* (Apollon77) Change one logline to debug

### 1.11.1 (2021-07-30)
* (Apollon77) Adjust date length for full day events to the full day

### 1.11.0 (2021-07-30)
* (Apollon77) Locally cache remote calendars to be used in case of request errors

### 1.10.4 (2021-07-30)
* (Apollon77) Make sure daysPast is correctly initialized if not provided
* (Apollon77) When no calendar could be read then no events are updated/cleanup
* (Apollon77) Respect HTTP statuscode from server response too to detect errors

### 1.10.3 (2021-07-30)
* (Apollon77/Feuersturm) Fix other timezone issues
* (Apollon77) Fix setting external States when events are active
* (Apollon77) Also list recurring entries from the past
* (Apollon77) Fix the event states for the days in future

### 1.10.2 (2021-07-25)
* (Apollon77/Feuersturm) Fix wrong times and dates introduced in 1.7.5.
* (Feuersturm) Allow Setting daysPast to be decreased to zero with button again

### 1.10.1 (2021-07-22)
* (Apollon77) Make sure all Event objects are created before values are written

### 1.10.0 (2021-07-16)
* IMPORTANT: data.table is now a stringified array!! Consider when using this value!
* (Apollon77) Optimize for js-controller 3.3
* (BasGo) added analysis for events marked as private in Google Calendar
* (jens-maus) updated dependencies

### 1.9.3 (2021-04-01)
* (Apollon77) Better handling of some ical cases 

### 1.9.2 (2021-03-07)
* (Apollon77) Prevent crash case when summary is not provided (Sentry IOBROKER-ICAL-K)

### 1.9.1 (2021-01-30)
* (Apollon77) try to make sure all code is executed before adapter is ended

### 1.9.0 (2021-01-12)
* (christofkac) Added option to ignore case when events are searched in calendars
* (Apollon77) Prevent crash case (Sentry IOBROKER-ICAL-F)

### 1.8.5 (2021-01-01)
* (Apollon77) update ical library to prevent problems with RRULE parsing

### 1.8.4 (2020-12-27)
* (Apollon77) Prevent crash case (Sentry IOBROKER-ICAL-D)

### 1.8.3 (2020-12-24)
* (Apollon77) Prevent crash case (Sentry IOBROKER-ICAL-C)
* (Apollon77) Upgrade node-ical

### 1.8.2 (2020-11-29)
* (klein0r) Several fixes and optimizations

### 1.8.1 (2020-11-20)
* (klein0r) Fixed past event calculation in html view

### 1.8.0 (2020-11-14)
* (klein0r) Moved html options to separate tab
* (klein0r) Added option to hide "arrow" on for running events
* (klein0r) Added feature to include past events (in days)

### 1.7.5 (2020-11-08)
* (Apollon77) Only handle events with a start date (Sentry IOBROKER-ICAL-1, IOBROKER-ICAL-2, IOBROKER-ICAL-4)
* (JensMaus) Update dependencies, fix some more issues

### 1.7.4 (2020-08-26)
* (Apollon77) Fix multiple parsing

### 1.7.3 (2020-08-26)
* (foxriver76) we pin a specific dependency version, because "rrule" package broken
* (foxriver76) added eslint

### 1.7.2 (2019-12-02)
* (bluefox) Documentation was changed

### 1.7.1 (2019-01-08)
* (twonky4) Fixed issue with UTC of until in recurring appointments
* (twonky4) Fixed possible empty color

### 1.7.0 (2018-11-27)
* (twonky4) Add filter option
* (twonky4) Add support of events for configured date period; changed state names from `events.*` to `events.0.today.*`
* (twonky4) Add Count of events for tomorrow - state `data.countTomorrow`
* (twonky4) Events without time part and same start and end are interpreted as full day events
* (twonky4) Remove special chars from event states

### 1.6.6 (2018-10-22)
* (twonky4) Fixed html for disabled colorize
* (twonky4) Fixed timezone handling for events during change from daylight saving time back to standard time
* (twonky4) Fixed events without end date moved to different day

### 1.6.5 (2018-10-13)
* (twonky4) Simplify timezone solution
* (twonky4) Fix calendars without timezones

### 1.6.4 (2018-10-12)
* (twonky4) Support windows timezones
* (twonky4) Don't fail on invalid timezones

### 1.6.3 (2018-10-10)
* (twonky4) Fixes timezone issue in fullday recurring appointments

### 1.6.2 (2018-10-08)
* (twonky4) Fixes timezone issue in recurring appointments

### 1.6.1 (2018-06-04)
* (Apollon77) Several fixes and optimizations

### 1.6.0 (2018-04-13)
* (Apollon77) Several fixes and optimizations
* (Apollon77) Upgrade node-ical library to allow big files to work
* (Apollon77) Better handling of full day events
* (Apollon77) Allow "Replace 0:00" to have 30 characters

### 1.5.3 (2018-03-24)
* (Apollon77) Also make location available in data table

### 1.5.2 (2018-03-23)
* (Apollon77/BuZZy1337) Fix several display issues

### 1.5.0 (2018-03-07)
* (bluefox) ready for Admin3

### 1.4.2 (2018-02-21)
* (Apollon77) Also display events that started before today

### 1.4.1 (2018-02-05)
* (Apollon77) also allow events without end parameter and assume an 0minute event then and set end = start

### 1.4.0 (2018-01-01)
* (Apollon77) allow multiple Events to be contained in one calendar entry. Make sure the names are unique enough because the search only checks for existance of the event name in the text.
* (Apollon77) correctly detect events that started before 0:00
* (Apollon77) also show events with no duration (sometimes used as reminders)
* (Apollon77) correctly show end times for events that are longer then 1 day (including "+x" to show day duration)
* (Apollon77) many enhancements and optimizations in formatting the infos (especially when event has already started but not ended)
* (Apollon77) add option to hide year numbers
* (Apollon77) add own CSS classes to each entry with the names iCal-<calendername> and iCal-<calendername>2 to be able to really design it as needed
* (Apollon77) Known issue: For recurring events it works to delete single events, but it do not work to move them

### 1.3.3 (2017-10-30)
* (DutchmanNL) Translate to Netherlands

### 1.3.2 (2017-02-24)
* (jens-maus) added singular form for 'days'

### 1.3.1 (2017-02-20)
* (jens-maus) implemented support for date excludes for recurring events

### 1.3.0 (2017-02-17)
* (jens-maus) switched ical module to use 'node-ical' which should improve ics format compatibility

### 1.2.2 (2017-02-17)
* (jens-maus) added changes to show "Noch X Tage" for fullday events (e.g. school holidays)

### 1.2.1 (2017-02-11)
* (jens-maus) applied workaround of ics files with TZID before DATE in DTSTART/DTEND

### 1.2.0 (2016-07-23)
* (bluefox) allow read from files
* (bluefox) add tests
* (bluefox) fix all day indication

### 1.1.3 (2016-07-19)
* (bluefox) fix error if entry is invalid
* (bluefox) use newer ical packet version

### 1.1.2 (2015-06-30)
* (jens-maus) implemented some more text replacement terms
* (jens-maus) we only colorize the date+time for imminent appointments
* (jens-maus) added cloneextend dependency definition and fix for dayafter mods
* (jens-maus) ported the "dayafter" change of the ccu.io ical adapter to the iobroker

### 1.1.1 (2015-08-16)
* (bluefox) enable auth only if user set.

### 1.1.0 (2015-08-13)
* (elmars) Added ability to provide username/password to authenticate against protected ics files. Tested with owncloud.

### 1.0.2 (2015-07-21)
* (bluefox) fix error if ICS file has empty lines

### 1.0.1 (2015-07-21)
* (bluefox) change readme title

### 1.0.0 (2015-07-21)
* (bluefox) fix error with set event to false

### 0.1.1 (2015-06-14)
* (bluefox) add additional fields for ioBroker.occ

### 0.1.0 (2015-03-24)
* (bluefox) make it compatible with new concept

### 0.0.2 (2015-02-22)
* (bluefox) fix error with configuration
* (bluefox) fix error with event object creation

### 0.0.1 (2015-02-17)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2021, bluefox <dogafox@gmail.com>

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