---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: r6I1FG7xQx245iTOHvnerFWAKe63AsJ5gONZzELKjik=
---
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Greenkeeper-Abzeichen](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Anzahl der Installationen](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.countdown
[![Build-Status Travis](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

Countdown-Adapter für ioBroker ---------------------------------------------- ---------------------------------

Das Ziel des Adapters ist es, Ihnen die Möglichkeit zu geben, Countdowns für zukünftige Ereignisse mit Jahren, Monaten, Tagen, Stunden und Minuten auszuführen. Es wird Ihnen jeden dieser Werte separat zur Verfügung stellen, sowie zwei Zeichenfolgen mit einer kurzen und einer langen Version des Datums.

## Countdowns anzeigen
Der Adapter stellt Ihnen automatisch eine json-Tabelle zur Verfügung. Sie müssen es nur mit der widged json-Tabelle verwenden. Bitte kreuzen Sie dort "Kein Header" an. Es kann entweder der Kurztext oder der Langtext angezeigt werden.
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

## So erstellen Sie Countdowns
Es gibt zwei Möglichkeiten, Countdowns einzurichten:

* Sie können einen Countdown in den Adaptereinstellungen im Tab "Countdown erstellen" erstellen.
* Sie können einen manuellen Zustand im Gerät "Setup" erstellen. Der Name des Objekts ist der Alarmname, und der Wert ist das Datum. Das Datum muss im Format „TT.MM.JJJJ HH:mm:ss“ vorliegen.
* Sie können einen Alarm mit sendto erstellen. Dort können Sie entweder die Komponenten (mindestens Jahr Monat Datum) oder einen Datumsstring senden. Für den Datumsstring können Sie das Format im Setup des Adapters anpassen.

![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

* Sie können Tage, Monate und Jahre mit sendto zum heutigen Datum hinzufügen. Senden Sie daher bitte die Komponente "name" und entweder "addminutes", "addhours", "adddays", "addmonths" oder "addyears" als int-Wert.

![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

## So löschen Sie Countdowns
Sie können einen Countdown mit dem sendto löschen. Senden Sie daher einfach den Namen mit sendto an den Adapter, und der Countdown wird automatisch gelöscht.

## Wiederholender Countdown
Wenn Sie möchten, dass sich ein Countdown in einem bestimmten Zeitraum wiederholt (z. B. Sie können nicht jedes Jahr einen Countdown für Ihren Hochzeitstag erstellen), können Sie dies auch mit diesem Adapter tun. Füllen Sie daher entweder das Feld „Wiederholungszeitraum“ in den Einstellungen des Adapters aus, oder fügen Sie den Zeitraum nach dem Datum hinzu, wenn Sie einen Countdown vom Typ „Datum“ erstellen. Ein sendTo würde für einen Countdown, der am 1. April 2020 enden und sich jedes Jahr wiederholen soll, so aussehen:

sendTo("countdown.0", "send", { "name": 'Wedding Day', "date": '01.04.2020 00:01+1Y' });

Parameter sind hier:

* Y: Jahre
* M: Monate
*D: Tage
* H: Stunden
* m: Minuten

## Verfügbare Ausgänge
|Datentyp|Beschreibung|
|:---:|:---:|
|Minuten|Minuten bis zum Ende des Countdowns (nicht total!)|
|Stunden|Stunden bis zum Ende des Countdowns (nicht total!)|
|Tage|Tage bis zum Ende des Countdowns (nicht insgesamt!)|
|Monate|Monate bis zum Ende des Countdowns (nicht insgesamt!)|
|years|Jahre bis zum Ende des Countdowns (nicht total!)|
|Name|Countdown-Name|
|endDate|Enddatum des Countdowns - formatiert wie im Setup definiert|
|inWordsShort|Kombinierter Wert aus Minuten, Stunden,... - z.B. 1J 5M 4D|
|inWordsLong|Kombinierter Wert aus Minuten, Stunden,... - z.B. 1 Jahr 5 Monate 4 Tage|
|totalHours|Gesamtzahl der Stunden bis zum Enddatum|
|totalDays|Gesamtzahl der Tage bis zum Enddatum|
|totalWeeks|Gesamtzahl der Wochen bis zum Enddatum|
|erreicht|Boolesches Feld, das definiert, ob das Enddatum erreicht wurde oder nicht|
|repeatEvery|Countdown wird nach Erreichen des Enddatums um diesen Zeitraum wiederholt|

## Hinzuzufügende Funktionen
* Möglichkeit, ein Skript als Parameter hinzuzufügen und es zu starten, wenn der Countdown endet
* Möglichkeit, Plus und Minus in Addminutes und den anderen Add-Funktionen zu verwenden

## 1.3.0 (2023-02-22)
* (Jack-Blackson) Updates für Abhängigkeiten

## 1.2.5 (2021-06-16)
* (jack-blackson) Bugfix zum Löschen des Countdowns mit sendto

## 1.2.4 (2021-06-09)
* (jack-blackson) Kleine Bugfixes, Übersetzungen

## 1.2.3 (2021-05-27)
* (jack-blackson) Kleine Bugfixes, Übersetzungen

## 1.2.2 (2021-05-25)
* (jack-blackson) Kleine Bugfixes, Weblate für Übersetzungen hinzugefügt

## 1.2.1 (2021-05-09)
* (jack-blackson) Kleine Bugfixes

## 1.2.0 (2021-05-09)
* (jack-blackson) Pakete aktualisiert, Sentry hinzugefügt
* (Jack-Blackson) Fixes für JS-Controller 3.3
* (jack-blackson) Korrektur, dass Countdowns sofort erstellt werden

## 1.1.0 (2020-04-02)
* (Jack-Blackson) Bugfix Read-Me-Link
* (Jack-Blackson) Bugfix Wiederholungszyklus

## 1.0.9 (2020-03-31)
* (jack-blackson) Bugfix-Logmeldungen

## 1.0.8 (2020-03-31)
* (jack-blackson) Countdown in definiertem Zeitraum wiederholen (z. B. jedes Jahr)

## 1.0.7 (2020-03-30)
* (jack-blackson) Neuer Datumstyp für Einstellungen hinzugefügt: YYYY-MM-DD
* (jack-blackson) Countdown direkt in den Adaptereinstellungen hinzufügen

## 1.0.6 (2020-03-20)
* (DutchmanNL) Fester Adaptertyp

## 1.0.5 (2020-02-05)
* (jack-blackson) Bugfix für Wecker um Mitternacht -> danke an @Lueghi

## 1.0.4 (2019-08-25)
* (jack-blackson) Veröffentlichungsinfos neu geordnet

## 1.0.3 (2019-08-10)
* (jack-blackson) Änderungen für den Kompaktmodus
* (jack-blackson) Diverse Bugfixes
* (jack-blackson) Mehrere Instanzen des Adapters sind jetzt möglich

## 1.0.2 (2019-07-22)
* (Jack-Blackson) Release-Version

## 0.7.0 (2019-07-07)
* (Jack-Blackson) Fehlerbehebungen
* (jack-blackson) addminutes und addhours sind jetzt auch möglich
* (Jack-Blackson) Datenpunkt im Setup kann jetzt bearbeitet werden
* (Jack-Blackson) hinzugefügte Gesamtnr. von Wochen

## 0.6.0 (2019-07-06)
* (Jack-Blackson) einstellbares Datumsformat für Ein- und Ausgabe
* (Jack-Blackson) Countdowns mit sendto löschen
* (Jack-Blackson) Möglichkeit, Countdowns nach „Tagen/Monaten/Wochen von jetzt an“ hinzuzufügen

## 0.5.0 (2019-07-04)
* (jack-blackson) passen Sie die Daten in der Tabelle an
* (Jack-Blackson) Bugfix Datumsimport

### 0.4.0 (2019-06-04)
* (Jack-Blackson) Umstrukturierung - Erstellen von Alarmen mit sendto oder manuell mit datapoint ist jetzt möglich

### 0.3.0 (2019-05-24)
* (Jack-Blackson) hat die Gesamtzahl der Tage und Stunden hinzugefügt

### 0.2.0 (2019-05-21)
* (Jack-Blackson) angepasste Pakete

### 0.1.0 (2019-04-29)
* (Jack-Blackson) Erstversion

## Changelog

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