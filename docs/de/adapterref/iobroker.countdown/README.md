---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: YriSKJ2tSBYLXy04DTVTy1F66xYqwnTd/C+pkBNEdy4=
---
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Greenkeeper-Abzeichen](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Anzahl der Installationen](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.countdown
[![Build-Status Travis](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Countdown-Adapter für ioBroker ------------------------------- --------------------------------

Das Ziel des Adapters besteht darin, Ihnen die Möglichkeit zu bieten, Countdowns für zukünftige Ereignisse mit Jahren, Monaten, Tagen, Stunden und Minuten durchzuführen. Sie erhalten jeden dieser Werte separat sowie zwei Zeichenfolgen mit einer kurzen und einer langen Version des Datums.

## Countdowns anzeigen
Der Adapter stellt Ihnen automatisch eine JSON-Tabelle und eine HTML-Tabelle zur Verfügung. Für den JSON wählen Sie bitte das Widget „basic-table“ aus. Wählen Sie für den HTML-Code „basic - string (unescaped)“ aus.

Es ist möglich, entweder den Kurztext oder den Langtext anzuzeigen.
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

## So erstellen Sie Countdowns
Es gibt zwei Möglichkeiten, Countdowns einzurichten:

* Sie können in den Adaptereinstellungen im Reiter „Countdown erstellen“ einen Countdown erstellen.
* Sie können im Geräte-Setup einen manuellen Zustand erstellen. Der Name des Objekts ist der Alarmname und der Wert ist das Datum. Das Datum muss im Format „TT.MM.JJJJ HH:mm:ss“ vorliegen.
* Sie können mit sendto einen Alarm erstellen. Dort können Sie entweder die Komponenten (mindestens Jahr, Monat, Datum) oder eine Datumszeichenfolge senden. Für die Datumszeichenfolge können Sie das Format im Setup des Adapters anpassen.

![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

* Sie können mit sendto Tage, Monate und Jahre zum heutigen Datum hinzufügen. Senden Sie daher bitte die Komponente „name“ und entweder „addminutes“, „addhours“, „adddays“, „addmonths“ oder „addyears“ als int-Wert.

![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

## So löschen Sie Countdowns
Sie können einen Countdown mit dem sendto löschen. Senden Sie daher mit sendto nur den Namen an den Adapter und der Countdown wird automatisch gelöscht.

## Wiederholter Countdown
Wenn Sie möchten, dass sich ein Countdown in einem definierten Zeitraum wiederholt (z. B. Sie können nicht jedes Jahr einen Countdown für Ihren Hochzeitstag starten), können Sie dies auch mit diesem Adapter tun. Füllen Sie dazu entweder das Feld „Wiederholungszeitraum“ in den Einstellungen des Adapters aus, oder fügen Sie den Zeitraum nach dem Datum hinzu, wenn Sie einen Countdown mit dem Typ „Datum“ erstellen. Ein sendTo würde für einen Countdown, der am 1. April 2020 enden und sich jedes Jahr wiederholen sollte, so aussehen:

sendTo("countdown.0", "send", { "name": 'Hochzeitstag', "date": '01.04.2020 00:01+1Y' });

## Zusammenzählen
Neu hinzugekommen ist die Funktion zum „Hochzählen“, also zum Zählen der Tage ab einem Datum in der Vergangenheit. Dies kann entweder im Adapter-Setup oder durch Hinzufügen eines „#“ zu einer Datumszeichenfolge erfolgen, z. B.

sendTo("countdown.0", "send", { "name": 'Birthdate', "date": '01.04.2020 00:01# });

Parameter sind hier:

* Y: Jahre
* M: Monate
* D: Tage
* H: Stunden
* m: Minuten

## Verfügbare Ausgänge
|Datentyp|Beschreibung|
|:---:|:---:|
|Minuten|Minuten bis zum Ende des Countdowns (nicht die Gesamtzahl!)|
|Stunden|Stunden bis zum Ende des Countdowns (nicht vollständig!)|
|Tage|Tage bis zum Ende des Countdowns (nicht die Gesamtzahl!)|
|Monate|Monate bis zum Ende des Countdowns (nicht insgesamt!)|
|Jahre|Jahre bis zum Ende des Countdowns (nicht vollständig!)|
|name|Countdown-Name|
|endDate|Enddatum des Countdowns – formatiert wie im Setup definiert|
|inWordsShort|Kombinierter Wert aus Minuten, Stunden,... – z.B. 1J 5M 4T|
|inWordsLong|Kombinierter Wert aus Minuten, Stunden,... – z.B. 1 Jahr 5 Monate 4 Tage|
|totalHours|Gesamtzahl. Stunden bis zum Enddatum|
|totalDays|Gesamtzahl. Anzahl Tage bis zum Enddatum|
|totalWeeks|Gesamtanzahl Anzahl Wochen bis zum Enddatum|
|totalMonths|Gesamtanzahl Monate bis zum Enddatum|
|totalYears|Gesamtanzahl Anzahl Jahre bis zum Enddatum|

|reached|Boolesches Feld, das definiert, ob das Enddatum erreicht wurde oder nicht|
|repeatEvery|Countdown wird nach Erreichen des Enddatums um diesen Zeitraum wiederholt|

## Funktionen zum Hinzufügen
* Möglichkeit, ein Skript als Parameter hinzuzufügen und es zu starten, wenn der Countdown endet
* Möglichkeit, Plus und Minus in Addminuten und den anderen Additionsfunktionen zu verwenden

## Changelog

### 2.1.0 (2023-07-XX) 
* (jack-blackson) Ability to use the countdown "backwards" - e.g. for calculating age of a baby
* (jack-blackson) Adjustments for "in words" -> fixed year/years and adjusted which detail level is shown at which point of time

### 2.0.2 (2023-07-16) 
* (jack-blackson) Bugfix month calculation

### 2.0.1 (2023-05-24) 
* (jack-blackson) Added objects for total number of months and years

### 2.0.0 (2023-05-07) 
* (jack-blackson) Reworked adapter due to wrong process layout
* (jack-blackson) Added headers for HTML and JSON

### 1.3.1 (2023-05-01) 
* (jack-blackson) Bugfix date calculation (thanks to Lueghi for the hint)

### 1.3.0 (2023-02-22) 
* (jack-blackson) Updates for dependencies

### 1.2.5 (2021-06-16) 
* (jack-blackson) Bugfix to delete countdown with sendto

### 1.2.4 (2021-06-09) 
* (jack-blackson) Small bugfixes, translations

### 1.2.3 (2021-05-27) 
* (jack-blackson) Small bugfixes, translations

### 1.2.2 (2021-05-25) 
* (jack-blackson) Small bugfixes, added weblate for translations

### 1.2.1 (2021-05-09) 
* (jack-blackson) Small Bugfixes

### 1.2.0 (2021-05-09) 
* (jack-blackson) Updated packages, added Sentry
* (jack-blackson) Fixes for JS-controller 3.3
* (jack-blackson) Fix that countdowns are created immediatly


### 1.1.0 (2020-04-02) 
* (jack-blackson) bugfix Read-Me link
* (jack-blackson) bugfix repeatCycle

### 1.0.9 (2020-03-31)
* (jack-blackson) Bugfix log messages

### 1.0.8 (2020-03-31)
* (jack-blackson) Repeat countdown in defined period (e.g. every year)

### 1.0.7 (2020-03-30)
* (jack-blackson) Added new date-type for settings: YYYY-MM-DD
* (jack-blackson) Add countdown directly in adapter settings

### 1.0.6 (2020-03-20)
* (DutchmanNL) Fixed adapter type

### 1.0.5 (2020-02-05)
* (jack-blackson) Bugfix for alarm at midnight -> thanks to @Lueghi

### 1.0.4 (2019-08-25)
* (jack-blackson) Reordered release infos

### 1.0.3 (2019-08-10)
* (jack-blackson) Changes for Compact Mode
* (jack-blackson) Various bugfixes
* (jack-blackson) Having multiple instances of the adapater are now possible

### 1.0.2 (2019-07-22)
* (jack-blackson) Release version

### 0.7.0 (2019-07-07)
* (jack-blackson) Bugfixes
* (jack-blackson) addminutes and addhours are now also possible
* (jack-blackson) datapoint in setup is now editable
* (jack-blackson) added total no. of weeks

### 0.6.0 (2019-07-06)
* (jack-blackson) adjustable date format for input and output
* (jack-blackson) delete countdowns with sendto
* (jack-blackson) ability to add countdowns by "days/months/weeks from now)

### 0.5.0 (2019-07-04)
* (jack-blackson) adjust the data in the table
* (jack-blackson) bugfix date import 

### 0.4.0 (2019-06-04)
* (jack-blackson) restructuring - creation of alarms with sendto or manually with datapoint is now possible

### 0.3.0 (2019-05-24)
* (jack-blackson) added total No. of days and hours

### 0.2.0 (2019-05-21)
* (jack-blackson) adjusted packages

### 0.1.0 (2019-04-29)
* (jack-blackson) initial version

## License
The MIT License (MIT)

Copyright (c) 2019-2023 jack-blackson <blacksonj7@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.