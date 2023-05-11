---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: isG4bGoigMjO7pvxpUNODcktDC6agixV57pjeXbgDAw=
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
|totalHours|Gesamtzahl der Stunden bis zum Enddatum|
|totalDays|Gesamtzahl der Tage bis zum Enddatum|
|totalWeeks|Gesamtzahl der Wochen bis zum Enddatum|
|reached|Boolesches Feld, das definiert, ob das Enddatum erreicht wurde oder nicht|
|repeatEvery|Countdown wird nach Erreichen des Enddatums um diesen Zeitraum wiederholt|

## Funktionen zum Hinzufügen
* Möglichkeit, ein Skript als Parameter hinzuzufügen und es zu starten, wenn der Countdown endet
* Möglichkeit, Plus und Minus in Addminuten und den anderen Additionsfunktionen zu verwenden

## 2.0.0 (07.05.2023)
* (jack-blackson) Überarbeiteter Adapter aufgrund eines falschen Prozesslayouts
* (jack-blackson) Header für HTML und JSON hinzugefügt

## 1.3.1 (01.05.2023)
* (jack-blackson) Bugfix-Datumsberechnung (Danke an Lueghi für den Hinweis)

## 1.3.0 (22.02.2023)
* (jack-blackson) Updates für Abhängigkeiten

## 1.2.5 (16.06.2021)
* (jack-blackson) Bugfix zum Löschen des Countdowns mit sendto

## 1.2.4 (09.06.2021)
* (jack-blackson) Kleine Bugfixes, Übersetzungen

## 1.2.3 (27.05.2021)
* (jack-blackson) Kleine Bugfixes, Übersetzungen

## 1.2.2 (25.05.2021)
* (jack-blackson) Kleine Bugfixes, Weblate für Übersetzungen hinzugefügt

## 1.2.1 (09.05.2021)
* (jack-blackson) Kleine Fehlerbehebungen

## 1.2.0 (09.05.2021)
* (jack-blackson) Aktualisierte Pakete, Sentry hinzugefügt
* (jack-blackson) Korrekturen für JS-Controller 3.3
* (jack-blackson) Korrektur, dass Countdowns sofort erstellt werden

## 1.1.0 (02.04.2020)
* (jack-blackson) Bugfix Read-Me-Link
* (Jack-Blackson) Bugfix RepeatCycle

## 1.0.9 (31.03.2020)
* (jack-blackson) Bugfix-Protokollmeldungen

## 1.0.8 (31.03.2020)
* (jack-blackson) Countdown im definierten Zeitraum wiederholen (z. B. jedes Jahr)

## 1.0.7 (30.03.2020)
* (jack-blackson) Neuer Datumstyp für Einstellungen hinzugefügt: JJJJ-MM-TT
* (jack-blackson) Countdown direkt in den Adaptereinstellungen hinzufügen

## 1.0.6 (20.03.2020)
* (DutchmanNL) Fester Adaptertyp

## 1.0.5 (05.02.2020)
* (jack-blackson) Bugfix für Alarm um Mitternacht -> Danke an @Lueghi

## 1.0.4 (25.08.2019)
* (Jack-Blackson) Veröffentlichungsinformationen neu geordnet

## 1.0.3 (10.08.2019)
* (jack-blackson) Änderungen für den Kompaktmodus
* (jack-blackson) Verschiedene Bugfixes
* (jack-blackson) Es ist jetzt möglich, mehrere Instanzen des Adapters zu haben

## 1.0.2 (22.07.2019)
* (jack-blackson) Release-Version

## 0.7.0 (07.07.2019)
* (jack-blackson) Fehlerbehebungen
* (jack-blackson) addminutes und addhours sind jetzt auch möglich
* (jack-blackson) Datenpunkt im Setup kann jetzt bearbeitet werden
* (Jack-Blackson) Gesamtzahl hinzugefügt. von Wochen

## 0.6.0 (06.07.2019)
* (Jack-Blackson) einstellbares Datumsformat für Ein- und Ausgabe
* (jack-blackson) Countdowns mit sendto löschen
* (Jack-Blackson) Möglichkeit, Countdowns nach „Tagen/Monaten/Wochen ab jetzt“ hinzuzufügen)

## 0.5.0 (04.07.2019)
* (Jack-Blackson) Passen Sie die Daten in der Tabelle an
* (Jack-Blackson) Bugfix-Datumsimport

### 0.4.0 (04.06.2019)
* (jack-blackson) Umstrukturierung – Erstellung von Alarmen mit sendto oder manuell mit datapoint ist jetzt möglich

### 0.3.0 (24.05.2019)
* (Jack-Blackson) Gesamtzahl der Tage und Stunden hinzugefügt

### 0.2.0 (21.05.2019)
* (Jack-Blackson) angepasste Pakete

### 0.1.0 (29.04.2019)
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