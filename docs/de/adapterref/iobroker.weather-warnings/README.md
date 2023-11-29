---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weather-warnings/README.md
title: ioBroker.weather-warnings
hash: yJIs/0h53Ul0pFadLx7sOtFyx92lZmKyFLbAaT12Vhs=
---
![Logo](../../../en/adapterref/iobroker.weather-warnings/admin/weather-warnings.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.weather-warnings.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.weather-warnings.svg)
![Anzahl der Installationen](https://iobroker.live/badges/weather-warnings-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/weather-warnings-stable.svg)
![NPM](https://nodei.co/npm/iobroker.weather-warnings.png?downloads=true)
![Paypal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# IoBroker.weather-warnings
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/weather-warnings/287x66-grey.png)](https://weblate.iobroker.net/projects/adapters/weather-warnings/)

**Tests:** [![Test und Veröffentlichung](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml/badge.svg?event=push)](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml)

## Wetterwarnungsadapter für ioBroker
[Deutsche Readme (meist aktueller)](https://github.com/ticaki/ioBroker.weather-warnings/blob/main/README_DE.md)

Dieser Adapter greift auf Wetterwarnungen verschiedener Wetterdienste zu und gibt diese als Text- oder Sprachnachrichten aus. Darüber hinaus werden nach Typ gruppierte Zustände erstellt, mit denen auf aktuelle Warnungen reagiert werden kann.

Anbieter:

- DWD
- ZAMG (Österreich)
- UWZ

Push-Service

- Telegramm
- WhatsApp
- Schwächling
- Email
- Alexa
- Sag es

## Installation
Mindest. Nodejs: v18 Nach der Installation wird die Konfigurationsseite automatisch geöffnet und muss **neu geladen** werden. Dadurch werden die Vorlagen in der eingestellten Sprache angezeigt.

## Aufbau
![Basiseinstellung](../../../en/adapterref/iobroker.weather-warnings/img/basic.png)

- **DWD/UWZ/ZAMG aktivieren:** den Datenabruf dieser Dienstleister aktivieren.
- **Telegramm/Pushover aktivieren,...:** die Ausgabe von Nachrichten an diese installierten Adapter aktivieren.
- **E-Mail aktivieren:** Schreibt alle aktuellen Warnungen in eine E-Mail.
- **Historie aktivieren:** schreibt die Historie, die bis zu 500 Einträge enthalten kann, in den Status: .history. Alle Daten oder ausgewählte Daten.
- **JSON-Array aktivieren:** ganz speziell, legt die aktuellen Warnungen in ein Array oder – nach Aktivierung – ein benutzerspezifisches Json in ein Array, das von Skripten verwendet werden kann.

- **Aktualisierungsintervall:** das Intervall des Datenabrufs in Minuten (Minimum: 5)

- **Eingehende Warnungen...:** Nach dem Start des Adapters werden die Warnungen des ersten Datenabrufs als bekannt behandelt und lösen keine Benachrichtigung aus.

- **Experte**: Aktiviert zusätzliche optionale Einstellungen

- **Testen – Aktivieren...:** Testdaten verwenden. Adapter ist offline.

- **Testen – Rohdatenverlauf:** Zum Debuggen, nur auf Anfrage.

![Vorlage](../../../en/adapterref/iobroker.weather-warnings/img/template.png)

Hier können Sie eigene Nachrichten erstellen oder bestehende bearbeiten. Alle verfügbaren „Tokens“ und ihre Bedeutung werden unterhalb der Tabelle angezeigt. Der eindeutige Bezeichner wird von Push-Benachrichtigungsdiensten verwendet, um zu bestimmen, welche Vorlage für welche Art von Benachrichtigung verwendet werden soll.

Speichern und schließen Sie, nachdem Sie Vorlagen hinzugefügt oder gelöscht haben.

Zeichen mit besonderer Bedeutung:

- „${}“ enthält Token, die durch generierte Informationen ersetzt werden. Auch hier ist die Vorlagenkennung verwendbar.
- Vorlagenkennungen, die mit „_“ beginnen, werden von Diensten nicht angeboten.
- `${[0,1,2,3,4]token}` Ein String mit Werten, token muss ein Zahlentoken sein. Der Index ist derselbe wie im Beispiel. 0 ist der erste Wert in der Liste.
- „${(value=token)result1#result2}“ oder „${(value=token)result1}“ ist dasselbe wie ein Javascript-Befehl: „if (value == token) result1 else result2“ mögliche Vergleiche: „ = < > != `
- Für eine Jsons-Vorlage muss die schließende Klammer „}“ auf diese Weise geschrieben werden: „\}“.
- siehe Beispiele im Adapter
- alternativ auch möglich: `${[0,🟢,🟡,🟠,🔴]warnlevelnumber}`

**Vorlagen wiederherstellen:** Setzt die Vorlagen auf die aktuelle Systemsprache zurück. Vorhandene Vorlagen gehen **verloren**. Anschließend speichern und schließen. Sollte nach dem Ändern der Systemsprache verwendet werden.

![DWD](../../../en/adapterref/iobroker.weather-warnings/img/DWD.png)

**DWD:** Auswahl aus einer Liste von 10000 Orten, nach der Eingabe auf einen anderen Tab klicken und dann zurückkehren, Liste ist zu groß und muss aktualisiert werden.

**UWZ:** Eingabe über die Länderkennung DE AT (andere möglich, muss geprüft werden) und die Postleitzahl, zum Beispiel DE12345

**ZAMG:** Nur für Österreich. Eingabe von Koordinaten innerhalb Österreichs.

**Ortsname:** Benutzerspezifischer Ortsname, kann in Warnungen verwendet werden (sinnvoll bei mehreren Warnungszellen)

**Filter:**

- Rohdaten filtern: Filtert alles innerhalb von X Stunden in die Zukunft vor jeder weiteren Bearbeitung heraus.
- Typ: verwirft alles mit diesem Typ.
- Level: Alles, was unter diesem Level liegt, wird verworfen.

![Telegramm](../../../en/adapterref/iobroker.weather-warnings/img/telegram.png) **Adapter:** Wenn diese Option aktiviert wurde und ein Adapterfeld vorhanden ist, muss eine gültige Option ausgewählt werden. Eine Fehlermeldung im Protokoll weist auf fehlende Einstellungen hin.

**Aktivieren ...:** Mit diesem Dienst Warnungen dieses Anbieters versenden.

**Filter:** 1) Warnungen dieses Typs ignorieren. 2) Warnungen gleicher oder niedrigerer Stufe ignorieren

**Nachrichten:** verwenden Sie die folgenden Vorlagen für: Spalte 1: 1) Neue Warnungen oder vorhandene Warnungen 2) Eine Warnung wurde entfernt und es sind **andere** aktive Warnungen vorhanden.
3) Warnungen wurden entfernt und es sind **keine weiteren** aktiven Warnungen vorhanden.

Spalte 2: 1) Manuell ausgelöste Benachrichtigungen 2) Verwendung ohne Warnung 1.3

Vorlagen für 3) dürfen keine `${}`-Tokens enthalten.

**Besondere Merkmale**

**E-Mail:** Die Kopfzeile wird vor der E-Mail eingefügt, gefolgt von 1,2 oder 3 + Zeilenumbruch und dann der Fußzeile. Die E-Mail wird im HTML-Format gesendet, sodass Sie jedes beliebige HTML-Tag hinzufügen können. (Zusätzliche Funktionen sind in Arbeit, noch nicht fertig)

**Alexa:** Zusätzlich müssen noch ein oder mehrere Geräte ausgewählt werden. Die Lautstärke ändert sich nur bei Sprachnachrichten und sollte anschließend auf den Standardwert zurückgesetzt werden. Die Nachrichtengröße pro Warnung ist auf 250 Zeichen begrenzt. Sounds sind möglich, aktivieren Sie Expert, um die Optionen anzuzeigen.

**Titel, Kopfzeile, Fußzeile** hier funktioniert nur ${status}. Andere Token enthalten zufällige Werte oder keinen Wert.

## Allgemeines Verhalten
- Es sollten keine doppelten Nachrichten für ein und dieselbe Sache versendet werden. Der DWD geht hier sehr streng vor.
- Wenn als Vorlage „keine“ ausgewählt ist, werden keine Benachrichtigungen dafür gesendet.
– Zustände in .alerts enthalten Arrays für Start, Ende, Warnungstyp, jetzt aktiv und Überschrift, gruppiert nach Warnungstyp. Pro Gruppe wird eine Warnung gefiltert nach folgenden Kriterien angezeigt:

  1) Die Warnung ist **jetzt** aktiv (diejenige mit der höchsten Stufe).

## Symbole
DWD-Symbol: Copyright durch Deutscher Wetterdienst ZAMG Symbol: Copyright durch

Andere:

Ersteller: [Adri Ansyah](https://www.youtube.com/channel/UChLOv1L-ftAFc2ZizdEAKgw?view_as=subscriber)

Änderungen: Im Original sind sie blau, andere Farben sind Änderungen zum Original.

Lizenz: [CC BY 4.0 RECHTSCODE](https://creativecommons.org/licenses/by/4.0/legalcode)

Iconseite: https://icon-icons.com/de/symbol/Wetter-wind-cloud-Blitz-Regen/189105

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (ticaki) add cleartimeout, add axios timeout

### 0.6.2 (2023-11-20)
* (ticaki) Reduce zamg spam

### 0.6.1 (2023-11-19)
* (ticaki) Optimise: DWD City names, adminconfiguration, translations

### 0.6.0 (2023-11-16)
* (ticaki) Added: global alerts.
* (ticaki) Changed: Token ...adverb - if no adverb, then day of the week.

### 0.5.6 (2023-11-15)
* (ticaki) Added: Select template for manual notification without warnings.
* (ticaki) Added: Configuration dialogue marks invalid template keys for most notification services.

### 0.5.5 (2023-11-14)
* (ticaki) Added: Missing space in emailMessage template.
* (ticaki) Fixed: wrong status for all removed.
* (ticaki) Admin: moving test options to tab general.

### 0.5.4 (2023-11-10)
* (ticaki) Fixed: Fixed randomly occurring errors in the first approx. 15 seconds.
* (ticaki) Added: max number of warnings (default 5)
* (ticaki) Fixed: not crash with the wrong uwz configuration.
* (ticaki) Fixed: small error in quiet times.

### 0.5.3 (2023-11-09)
* (ticaki) Fixed: command states (text / automode)
* (ticaki) Added: .alerts. List of warning types.
* (ticaki) Changed: .alerts. view current event with highest level or next event

### 0.5.2 (2023-11-06)
* (ticaki) Multiple Say-It instances.
* (ticaki) Some icons added.
* (ticaki) -no warning- Warning level for uwz corrected.

### 0.5.1 (2023-11-05)
* (ticaki) Fixed: Foreign languages did not work for UWZ.
* (ticaki) Fixed: clearHistory command didnt work on gloabl level.
* (ticaki) Fixed: uwz colours assigned to the correct level.

### 0.5.0 (2023-11-04)
* (ticaki) breaking changes: New UWZ configuration. reconfigure
* (ticaki) breaking changes: Rename and move manual push command states.
* (ticaki) Quiet times changed, reconfigure. 
* (ticaki) better DWD configuration.
* (ticaki) alot improvements.

### 0.4.8 (2023-10-30)
* (ticaki) Wrong level assignment for zamg fixed
* (ticaki) better set defaults

### 0.4.7 (2023-10-29)
* (ticaki) improved admin ui
* (ticaki) improved formatedKeys for vis

### 0.4.6 (2023-10-28)
* (ticaki) fix startup crash

### 0.4.5 (2023-10-28)
* (ticaki) Quiet times with profile & control states
* (ticaki) Fixed: Jumping of the data tree
* (ticaki) Bugfixing

### 0.4.4 (2023-10-25)
* (ticaki) Added Say-It
* (ticaki) User-definable icons (path)
* (ticaki) Email works, Added title for pushover and email

### 0.4.2 (2023-10-24)
* (ticaki) optimise german 22. & 28. for alexa.
* (ticaki) Quiet times for voice notifications.
* (ticaki) bugfix: now the English translation is loaded. Alexa uses the correct day of the week with DWD heading.

### 0.4.1 (2023-10-22)
* (ticaki) update german translation for alexa

### 0.4.0 (2023-10-22)
* (ticaki) Welcome to latest.
* (ticaki) zamg date convert for alexa

### 0.3.7 (2023-10-21)
* (ticaki) Alexa Sounds for warntypes
* (ticaki) more options for pushover, telegram, alexa, email html
* (ticaki) Usable urls for icons
* (ticaki) fixed error in type filter

### 0.3.6 (2023-10-20)
* (ticaki) added: icons

### 0.3.5 (2023-10-16)
* (ticaki) added: Data points for manually triggering notifications.

### 0.3.4 (2023-10-14)
* (ticaki) add translation to common.name

### 0.3.3 (2023-10-13)
* (ticaki) fixed: repeat message dwd
* (ticaki) small bugfixes

### 0.3.2 (2023-10-10)
* add alexa volumen

### 0.3.1 (2023-10-10)
* (ticaki) added alexa

### 0.3.0 (2023-10-03)
* (ticaki) added multiple warncell
* added option to remove channels
* fixed alot bugs

### 0.2.6-alpha.0 (2023-10-02)
* (ticaki) added email, json, history
* add more template key
* add mulitple dwd warncells
* fixed alot bugs

### 0.2.5-alpha.0 (2023-09-30)
* (ticaki) added telegram, whatsapp, pushover
* added remove all
* added json/array output for all current warnings.

### 0.2.4-alpha.0 (2023-09-29)
* (ticaki) add alerts

### 0.2.3-alpha.0 (2023-09-28)
* (ticaki) more translations
* filter warn type, generic warntypes
* more prebuild tests

### 0.2.2-alpha1.0 (2023-09-26)
* (ticaki) more CustomTokens,
* translations for warntypes, warnlevelcolor,
* total active warningcountshttps://github.com/ticaki/ioBroker.weather-warnings
* remove old warnings

### 0.2.1-alpha.0 (2023-09-25)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2023 ticaki <github@renopoint.de>

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