---
BADGE-Number of Installations: http://iobroker.live/badges/feiertage-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.feiertage.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.feiertage.svg
BADGE-Tests: https://travis-ci.org/Pix---/ioBroker.feiertage.svg?branch=master
BADGE-Open Issues: http://githubbadges.herokuapp.com/Pix---/ioBroker.feiertage/issues.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Pix---/ioBroker.feiertage/badge.svg?targetFile=package.json
BADGE-NPM: https://nodei.co/npm/iobroker.feiertage.png?downloads=true
BADGE-Travis-CI: http://img.shields.io/travis/Pix---/ioBroker.feiertage/master.svg
BADGE-AppVeyor: https://ci.appveyor.com/api/projects/status/github/Pix---/ioBroker.feiertage?branch=master&svg=true
---
![Logo](../../admin/feiertage.png)
# ioBroker.feiertage

## Beschreibung
Dieser Adapter liefert das Datum, die Dauer bis zu diesem Datum in Tagen und den Namen des nächsten deutschen Feiertages und gibt Auskunft, ob heute, morgen oder übermorgen ein Feiertag ist.

Brückentage, die jährlich fest am Freitag nach einem Feiertag stattfinden sind auswählbar.

##  Datenpunkte
![alt text](img/DatapointsScreenshot.jpg "Screenshot Datenpunkte")

## Einstellungen
Feiertage, die bei der Befüllung der Datenpunkte berücksichtigt werden sollen, können ausgewählt werden.

![alt text](img/SettingScreenshot.jpg "Screenshot Einstellungen")

## Aktivierung
Der Adapter startet jeden Tag um Mitternacht. Ein häufigeres Starten ist nicht erforderlich.

## Sonstiges
Es können natürlich weitere Instanzen des Adapters mit abweichenden Feiertagsauswahlen angelegt werden. So kann man z.B. die unterschiedlichen Anforderungen bei Feiertagsarbeitern abdecken. Eine Beispielanwendung ist der [Shuttercontrol Adapter](https://github.com/simatec/ioBroker.shuttercontrol/blob/master/docs/de/shuttercontrol.md#extra-einstellungen)

## Changelog
### 1.0.23 (2021-05-27)
* (pix, crycode-de) Code improved (timer)

### 1.0.22 (2021-05-27)
* (pix) Fridays after holidays on Thursday can be selected (Brückentag)

### 1.0.21 (2021-05-05)
* (pix) minor code fixes, update news cleaned

### 1.0.20 (2021-05-05)
* (pix) connectionType and dataSource added

### 1.0.19 (2020-04-21)
* (pix) NodeJS 10 or higher required

### 1.0.18 (2020-03-25)
* (pix) Italy's Day of Liberation and Day of Republic added
* (pix) Minor fixes

### 1.0.17 (2020-01-22)
* (kampfratte) Day of Freedom added

### 1.0.16 (2020-01-22)
* (pix) Minor fixes

### 1.0.15 (2019-12-31)
* (kampfratte) Fixed wrong year displayed if holiday is in next year

### 1.0.14 (2019-12-19)
* (pix) National day in Switzerland added

### 1.0.13 (2019-09-20)
* (pix) Offsets corrected

### 1.0.12 (2019-08-26)
* (pix) Added Weltkindertag (Thuringa)

### 1.0.11 (2018-10-29)
* (pix) Added Mariä Empfängnis for AUT

### 1.0.10 (2018-10-16)
* (modmax) Added reformation day for HB,HH,NI,SH

### 1.0.9 (2018-09-03)
* (pix) Austrian national day added

### 1.0.8 (2018-08-08)
* (BuZZy1337) firefox scrolling issue fixed

### 1.0.7 (2018-08-03)
* (BuZZy1337) design improvements settings window

### 1.0.6 (2018-04-29)
* (pix) material design completed, Admin 3 ready

### 1.0.5 (2018-04-28)
* (pix) checkbox issue fixed

### 1.0.4 (2018-04-26)
* (pix) versioning issues fixed

### 1.0.3 (2018-04-22)
* (pix) fixed input fields settings window

### 1.0.2 (2018-04-20)
* (pix) Readme/Documentation structure

### 1.0.1 (2018-04-20)
* (pix) Translations to ru, pt, nl, fr, it, es and pl language
* (pix) Admin 3 ready

### 1.0.0 (2017-10-15)
* (pix) End of Beta. Nodejs 4 or higher required

### 0.4.1 (2017-06-08)
* (jens-maus) added "Kid's Day" for 01.06. and added "Vatertag" beside "Christi Himmelfahrt"

### 0.4.0 (2017-01-05)
* (pix) Travis CI and appveyor Windows testing supported

### 0.3.6 (2017-01-04)
* (jens-maus) offset fix in non-leap years

### 0.3.5 (2016-11-13)
* (pix) fixed version issue
* updated screenshots in readme

### 0.3.4 (2016-11-10)
* (jens-maus) fixed calculation of "next holiday" which was shifted by one day. Thus on the day before a holiday it already showed the next one.

### 0.3.3 (2016-11-08)
* (jens-maus) added advent ѕundays, "Buß- und Bettag" and many more german holidays
* (jens-maus) code fix (multilingual reference)

### 0.3.2 (2016-05-07)
* (bluefox) fix first start of adapter

### 0.3.1 (2016-05-07)
* (pix) Start file fixed

### 0.3.0 (2016-05-03)
* (bluefox) add english objects

### 0.2.0 (2016-05-02)
* (bluefox) use common file for holidays

### 0.1.1 (2016-04-30)
* (pix) Next holiday calculation corrected

### 0.1.0 (2016-04-30)
* (pix) Holidays can be opted out now

### 0.0.7 (2016-04-30)
* (bluefox) Settings structure optimized
* (bluefox) Translations

### 0.0.6 (2016-04-29)
* (pix) Corrections on appearance of settings window
* (pix) Readme

### 0.0.5 (2016-04-29)
* (pix) Selectable Holidays in settings

### 0.0.4 (2016-04-27)
* (pix) Corrected number of days till next holiday

### 0.0.3 (2016-04-27)
* (pix) Writing to objects corrected
* (pix) Workaround for formatDate

### 0.0.2 (2016-04-27)
* (pix) Title and description corrected
* (pix) English translation of readme file

### 0.0.1 (2016-04-26)
* (pix) Adapter created

## License

Copyright (c) 2021 pix

The MIT License (MIT)

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

---
*Logo is crafted by CHALLENGER*

*Thanks to paul53 for the inspiration and thanks to jens-maus for his support!*