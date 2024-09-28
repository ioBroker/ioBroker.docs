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
- `colorize`: true Termine am heutigen Tag sowie aktuell laufende Termine werden rot gefärbt, Termine am morgigen Tag orange, diese Option überstimmt die Option everyCalOneColor
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
  - `Set ID`: Hier kann ein zusätzlicher State eingetragen werden, welcher aktualisiert wird, wenn das Event aktiv ist 
  - `On / Off`: Hier kann ein alternativer Wert in den bei 'Set ID' hinterlegten State geschrieben werden
  - `display`: false # legt fest, ob das Event auch in dem iCalEvents angezeigt wird, oder nur ausgewertet wird
  - `Set Ack`: false # Ack "aus" steuert den State um z.B. etwas zu schalten. #true Ack "an" aktualisiert den Wert
  
  Durch setzen eines Events (in diesem Beispiel „Urlaub“), werden die Kalender nach dem String „Urlaub“ durchsucht. 
  Sollte ein Termin mit dem Stichwort „Urlaub“ in einem Kalender stehen, so wird automatisch eine State mit dem 
  Namen Urlaub auf True gesetzt. Ist der Termin vorbei, wird der State wieder auf false gesetzt. 
  Es wird für jeden Tag des preview Zeitraums ein Status angelegt. Achtung! 
  Es wird nach einem Substring gesucht, d.h. ein Eintrag im Kalender „Urlaub“ wird genauso erkannt wie ein 
  Eintrag „Urlaub Eltern“. Dies ist beim festlegen der Ereignisse zu berücksichtigen.

- Erklärung zu den States unter ical.0.events.0 
  - Das Event im Pfad ical.0.events.0.later wird auf true gesetzt, wenn es heute noch stattfindet aber noch nicht begonnen ist
  - Das Event im Pfad ical.0.events.0.now wird auf true gesetzt, wenn es aktuell aktiv ist
  - Das Event im Pfad ical.0.events.0.today wird auf true gesetzt, wenn das Event am heutigen Tag aktiv ist
  - Hinweis: Termine der Vortage werden nicht angezeigt
  
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
Zum Einbinden von geteilten Kalendern einer OwnCloud muss man dort in der Kalenderansicht in OwnCloud diesen Kalender als geteilten Kalender freigeben und dort den Link zum Kalender anzeigen lassen und diese URL (https://&lt;DOMAIN&gt;/remote.php/dav/calendars/USER/xxxxxxx_shared_by_xxxxxx?export) entsprechend in den ioBroker.ical Adapter mit Nutzername und Passwort angeben.

#### NextCloud Kalender
Zum Einbinden eines NextCloud Kalenders muss in der Kalenderansicht in NextCloud der Herunterladen-Link des einzelnen gewünschte Kalender eines Anwenders kopiert werden.
Dazu als Anwender in Nextcloud einloggen und zum 'Kalender' wechseln. In der linken Spalte den gewünschten Kalender bei dem Kreis mit den drei Punkten anklicken.
Im Menu mit der Maus über 'Herunterladen' schweben und mittels Rechtsklick den Link kopieren.
Bsp.: https://&lt;DOMAIN&gt;/remote.php/dav/calendars/MEINCALENDER/personal/?export  (wichtig ist, dass hier "?export" im Link enthalten ist).

Diese URL in den ioBroker.ical Adapter mit Nutzername und Passwort angeben. Dieses muss für alle gewünschten Kalender aller User einzeln erfolgen.

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
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (klein0r) Breaking change: Removed trigger state (subscribe is deprecated in js-controller 6.x)
* (simatec) Responsive design added

### 1.15.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.14.3 (2024-02-28)
* (jens-maus) update node-ical to latest 0.18.0

### 1.14.2 (2024-01-29)
* (jens-maus) update node-ical to latest 0.17.2

### 1.14.1 (2024-01-29)
* (klein0r) Create dummy file in files tab
* (klein0r) Fixed recurring events

### 1.14.0 (2024-01-07)
* (klein0r) Allow to set custom http user agent
* (klein0r) Added option to use files tab for calendar files

## License

The MIT License (MIT)

Copyright (c) 2014-2024, bluefox <dogafox@gmail.com>

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