---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.growatt/README.md
title: kein Titel
hash: ER+35iKj0YhtF58blC/BVn1Nibl+utaPPgDrBI9aMiA=
---
![Logo](../../../en/adapterref/iobroker.growatt/admin/glogo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.growatt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.growatt.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/growatt-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/growatt-stable.svg)
![NPM](https://nodei.co/npm/iobroker.growatt.png?downloads=true)

## IoBroker.growatt
## Wichtig: Bitte lesen
Die Cloud-Server von Growatt sind sehr instabil. Bei der Datenanforderung kommt es zu Fehlermeldungen und Timeouts.
Wenn Sie noch über die Anschaffung eines Wechselrichters nachdenken, ist es besser, auf ein gutes Produkt zurückzugreifen. Am besten eignen sich Geräte, die die Daten per Modbus-IP direkt im Haus übertragen.
Es gibt auch den [Grott-Projekt](https://github.com/johanmeijer/grott), der die Daten aus der Kommunikation abfängt. Hierbei kommt es jedoch auch vor, dass ältere Datensätze übertragen werden oder die Übertragung ausgesetzt wird, da diese nur mithört und die Daten zwischenspeichert.

---

### Growatt-Adapter für ioBroker
ioBroker Growatt-Adapter zur Kommunikation mit Growatt Shine Server.
Ich bin nicht angeschlossen.
Normalerweise werden die Daten alle 5 Minuten vom Datenlogger an die Cloud gesendet.
Sie können es ändern, siehe unten.

Nicht alle Anlagentypen werden umgesetzt.

Derzeit können nur Daten gelesen werden, das Schreiben von Parametern oder das Ändern von Parametern ist nicht möglich.

---

## Adapter-Administratorseite
### Haupteinstellungen
#### Benutzer und Passwort
Bitte geben Sie den Namen und das Passwort ein, die Sie auch in der Shine-App oder im Webportal verwenden.

#### Anmeldung mit gemeinsamem Schlüssel
Auf der Growatt-Website unter Energie, Anlagenmanagement, Betriebstools können Sie sich einen Schlüssel per E-Mail zusenden.

#### Anlagendaten lesen
Dieser Datensatz enthält die hinterlegten Stammdaten

#### Letzte Verlaufsdaten lesen
Liest den letzten Datensatz aus der Historie des Datenloggers.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

#### Statusdaten lesen
Diese Daten sind nicht für alle Anlagen verfügbar (nicht INV/MAX/TLX). Dieser Datensatz enthält Live-Daten.
Diese Funktion unterstützt Minutenintervalle für den Datenlogger.

#### Gesamtdaten lesen
Dieser Datensatz enthält Aggregationsdaten.

#### Gerätedaten lesen
Dieser Datensatz enthält einige Daten vom Gerät. Einige Daten sind auch in den anderen Kategorien verfügbar.

#### Wetter lesen
Dieser Datensatz enthält die Wettervorhersage.

#### Wechselrichtereinstellungen schreiben
Wenn diese aktiviert ist, können einige Einstellungen für einige Wechselrichter bearbeitet werden.

Für die Einstellungen werden Objekte unterhalb des Wechselrichter-Seriennummernelements erstellt. Für jede Einstellung wird ein Kanal erstellt.

Unterhalb der Objekte befinden sich „read“, „write“, „msg“ und die Knotenwerte. Unter den Werten befinden sich Parameter.

Konnten die Werte der Parameter gelesen werden, werden sie mit ACK=true geschrieben. „read“ wird bei erfolgreichem Lesen mit ack auf true gesetzt. Wenn das Lesen fehlschlägt, wird „Read“ auf false ack=true gesetzt. Das Schreiben von „true“ auf „Read“ ohne ACK löst einen Lesevorgang aus. Wird eine neue Verbindung zur Cloud hergestellt, werden die Einstellungen ebenfalls ausgelesen.

Um die Einstellungen zu schreiben, müssen zunächst die Parameter eingestellt werden. Dann wird „write“ mit ack=false auf true gesetzt.
Wenn die Daten erfolgreich geschrieben wurden, wird „write“ auf „true“ ack=true gesetzt, wenn der Wechselrichter einen Fehler gemeldet hat, wird „write“ auf „false“ ack=true gesetzt. Zusätzlich wird die Rückmeldung des Wechselrichters in den Status „msg“ geschrieben.

War das Schreiben erfolgreich, wird automatisch das Lesen ausgelöst.

Der Wechselrichter kann jeweils nur eine Einstellung ändern und der Übertragungsweg verläuft vom ioBroker über die Cloud zum WLAN-Adapter und dann zum Wechselrichter. Die Einstellungen werden nacheinander über eine Warteschlange abgearbeitet. Eine zu kurze Sitzungszeit kann zu Problemen führen.

Das Verfassen der Einstellungen erfolgte nach bestem Wissen und Gewissen. Es wird jedoch keine Garantie übernommen

#### Timeout in Sekunden
Das Standard-Timeout für HTTP-Anfragen. Der Standardwert beträgt 60 Sekunden, wie bei Webbrowsern

#### Prozess-Timeout in Sekunden
Dieses Timeout überwacht die Datenerfassung vom Growatt-Server. Verarbeitet der Server innerhalb dieser Zeit nicht alle Daten, wird ein Fehler gemeldet, die Sitzung beendet und ein neuer Zyklustimer gestartet. Der Standardwert beträgt 600 Sekunden.
Bei einem Wert von 0 wird diese Prüffunktion nicht ausgeführt.

#### Websitzung beibehalten
Der Adapter meldet sich nur einmal an und nicht bei jeder Datenanfrage vom Growatt-Server. Standardmäßig ist es aktiviert.

#### Sitzungszeit in Minuten
Hier können Sie einstellen, wann sich der Adapter vom Server abmeldet und wieder anmeldet. Eine 0 bedeutet, dass Sie sich nie abmelden. Der Standardwert ist 0=unendlich.

#### Zykluszeit in Sekunden
Das Intervall, in dem die Daten vom Server angefordert werden. Die für die Datenabfrage benötigte Zeit wird dann von der nächsten abgezogen. Dauert die Abfrage länger als die Wartezeit, schläft der Adapter nur 100 ms. Der Standardwert beträgt 30 Sekunden.

#### Fehlerzykluszeit in Sekunden
Tritt bei der Abfrage der Werte beim Growatt-Server ein Fehler auf, wird diese Zeit anstelle der Zykluszeit verwendet. Der Standardwert beträgt 120 Sekunden

#### Growatt-Server
Hier kann eine andere URL eingegeben werden, um beispielsweise die US-Domain zu verwenden. Es muss jedoch mit „https://“ beginnen. Der Standardwert ist leer, daher wird https://server.growatt.com verwendet.

### Objekte verwalten
Hier können Sie festlegen, was mit jedem Wert (Objekt) passieren soll, der vom Wechselrichter erfasst wird.
Es gibt viele Werte, die nicht zu Ihrem Wechselrichter gehören. Diese können hier entfernt werden.
Da es kein Ereignis gibt, mit dem die Objektliste beim Speichern neu geladen werden kann. Beim Drücken von „Speichern“ muss die Schaltfläche „Aktualisieren“ verwendet werden.

#### Normal
Das Objekt bleibt erhalten, der Wert wird aktualisiert.

#### Löschen
Das Objekt wird gelöscht und der vom Wechselrichter geladene Wert verworfen.
Nach dem Update werden nur noch die ID und die Aktion angezeigt, da das Objekt nicht mehr existiert. Bei normaler Auswahl wird das Objekt nach dem Speichern erneut erstellt.

#### Kein Update
Das Objekt bleibt erhalten, die Werte vom Wechselrichter werden verworfen.

### Logger verwalten
Die Instanz muss ausgeführt und beim Server angemeldet sein. Anschließend können die Einstellungen des Datenloggers über den Aktualisieren-Button in diesem Reiter aufgerufen werden.
Die Daten werden nicht automatisch abgefragt, die Anfrage kann nur über den Button erfolgen.
Die für den Datenlogger angezeigten Felder können nicht geändert werden. Es handelt sich lediglich um abgerufene Daten.
Für jeden Logger werden Schaltflächen angezeigt. Einstellungen können mit der Schaltfläche bearbeitet werden.
_Bei Verwendung von GROTT muss das Ändern von Einstellungen in der INI aktiviert sein._ Bitte verwenden Sie die Einstellungen nicht, wenn ein Wert erscheint, den Sie nicht erwartet haben.
Achtung, dies basiert auf Reingeneering. Für Schäden am Gerät übernehme ich keine Haftung.

#### Tastenintervall
Das aktuelle Intervall in Minuten wird aus dem Datenlogger ausgelesen und es erscheint eine Eingabemaske, in der der Wert angepasst werden kann.
Wenn Sie eine erfolgreiche Antwort erhalten, sollte der Datenlogger neu gestartet werden, um die Einstellungen zu aktivieren.

#### Schaltfläche Server-IP
Hier kann der Server für die Datenübertragung auf dem Logger eingestellt werden. Bei Verwendung von Grott oder US kann hier die lokale oder US-IP angegeben werden.
Wenn Sie eine erfolgreiche Antwort erhalten, sollte der Datenlogger neu gestartet werden, um die Einstellungen zu aktivieren.

#### Schaltfläche Server-Port
Hier kann der Port auf dem Server für die Datenübertragung auf den Logger eingestellt werden.
Wenn Sie eine erfolgreiche Antwort erhalten, sollte der Datenlogger neu gestartet werden, um die Einstellungen zu aktivieren.

#### Schaltfläche Firmware überprüfen
Es wird abgefragt, ob die Firmware des Datenloggers aktuell ist.
Das Update muss auf der Growatt-Seite durchgeführt werden.

#### Schaltfläche Datenlogger neu starten
Jeder Stiefel ist gut.
Die Einstellungen werden übernommen.

---

## Interne Methode des Datenintervalls beschleunigen
Schauen Sie sich „Logger verwalten“ und „Schaltflächenintervall“ an

## Externe App-Methode zur Beschleunigung des Datenintervalls
- Öffnen Sie die ShinePhone-App
- Klicken Sie unten auf den Anhang
- Oben rechts +, dann Datenlogger auflisten
- Klicken Sie auf vorhandenen Datenlogger
- Datenlogger konfigurieren
- Drahtloser Hotspot-Modus
- Versetzen Sie den Stick in den AP-Modus
- Mit WLAN-Hotspot verbinden, PW 123456789? <- nochmal prüfen
- Weitermachen
- Fortschrittlich
- Zeiteinstellung
- Intervall bis 1
- Geben Sie das Passwort „growattJJJJMMTT“ ein (z. B. „growatt20220209“).
- Freischalten
- Klicken Sie auf und übernehmen Sie die Änderungen
- Hotspot-Modus verlassen

## Externe alte Methode des Datenintervalls beschleunigen
Im Hotspot-Modus ist es nur auf der alten Firmware möglich, das Intervall zu ändern.
Growatt hat die Website aus der Firmware entfernt.
Daher wurde auch die Beschreibung entfernt.

**Es gibt keine Änderung an den Diagrammen auf der Growatt-Seite. Dort ist lediglich eine Änderung der Daten des Datenloggers zu erkennen.**

-\*-

## Changelog

### 3.0.2 (08.06.2023)

- (PLCHome) Write inverter settings, it can be activated via the config

  - mix
    - Time
    - Grid first
    - Battery first
    - Inverter On/Off
    - LoadFirst
    - Failsafe
    - PV active power rate
    - Backflow setting
      - Backflow setting power
    - EPSOn
  - tlx/tlxh
    - Time
    - PV active power rate

### 2.1.1 (17.04.2023)

- (PLCHome) Calendar structure was not always changed to timestamp
- (PLCHome) Improvement in the internal handling of objects without considering their case.

### 2.1.0 (14.04.2023)

- (PLCHome) Status data now also from TLX/TLXH
- (PLCHome) TLX Hybrid is now working
- (PLCHome) If there are different inverters, these are now shown

### 2.0.0 (06.10.2022)

- (PLCHome) Data logger settings can be called up and changed.
- (PLCHome) The server url can be changed.

### 1.2.1 (21.09.2022)

- (PLCHome) Added an offset to numeric values. My inverter reset te total quantity by itself. Now the total quantity can be corrected.

### 1.1.19 (30.08.2022)

- (PLCHome) HTML Header

### 1.1.17 (10.08.2022)

- (PLCHome) JSON Loopkiller

### 1.1.16 (10.08.2022)

- (PLCHome) https rejectUnauthorized false

### 1.1.15 (28.04.2022)

- (PLCHome) Apple devices cannot open the adapter's config page with Safari, all values ​​are empty

### 1.1.14 (26.04.2022)

- (PLCHome) Restart loop when exception

### 1.1.13 (08.04.2022)

- (PLCHome) total data and history data missing for type inv

### 1.1.12 (06.04.2022)

- (PLCHome) api maintance

### 1.1.11 (02.04.2022)

- (PLCHome) fixed readme
- (PLCHome) fixed version

### 1.1.10 (02.04.2022)

- (PLCHome) suppressed the warning for the Firsttime: /error.do?errorMess=errorNoLogin

### 1.1.9 (27.03.2022)

- (PLCHome) Make the source a little prettier
- (PLCHome) Make the readme prettier
- (PLCHome) Added Test and Release
- (PLCHome) Improvement: used i in inner and outer loop
- (PLCHome) Improvement triggered by "Sentry" issues: undefined object
- (PLCHome) Improvement: no disconnect to "Sentry"

### 1.1.8 (16.03.2022)

- (PLCHome) Improvement triggered by "Sentry" issues

### 1.1.7 (13.02.2022)

- (PLCHome) "Sentry" was added

### 1.1.6 (12.02.2022)

- (PLCHome) Read me

### 1.1.2 (12.02.2022)

- (PLCHome) Timeouts made maintainable and adjusted. Request timout is now 60 second like chrome
- (PLCHome) Server request improved and additionally secured against dying
- (PLCHome) Calculate sleep to next request to keep cycle. Minimum sleep is 100ms
- (PLCHome) Error output: if the key has expired, requests are forwarded with an error code, which is now in the log
- (PLCHome) Improved error handling
- (PLCHome) Improved debugging
- (PLCHome) Update the includes

### 1.1.1 (27.05.2021)

- (PLCHome) The web request timeout was increased due to login issues

### 1.1.0 (24.05.2021)

- (PLCHome) Improvement of the connection via Axios Session

### 1.0.1 (05.03.2021)

- (PLCHome) Duplicate keys are transmitted, I try to filter them out.

### 1.0.0 (24.02.2021)

- (PLCHome) Read me
- (PLCHome) fix: Create a date from the time or calendar structure for last history data for all devices sometimes not working

### 0.0.20 (09.02.2021)

- (PLCHome) Create a date from the time or calendar structure for last history data for all devices

### 0.0.19 (05.02.2021)

- (PLCHome) The data from the chart is removed. These were only available in a 5-minute grid. The performance can now be queried via the history.
- (PLCHome) Objects of unselected data areas are now deleted.
- (PLCHome) You can choose objects to be ignored or deleted.
- (PLCHome) A link to the Growatt page was added, so the adapter now also appears in the overview.
- (PLCHome) Recently, Growatt has changed the spelling of values, which letters are uppercase and lowercase. For this reason, the objects are now handled internally Case Insensively. If a warning is written in the log after the update when starting, you have to delete one of the two objects. If a warning is written in the log after the update when starting, you have to delete one of the two objects. And then restart the adapter so that it definitely uses the remaining object to store the value.

### 0.0.18 (23.01.2021)

- (PLCHome) wrong version info.

### 0.0.17 (21.01.2021)

- (PLCHome) fixes a date issue on inverter history data.

### 0.0.16 (20.01.2021)

- (PLCHome) npm package version update
- (PLCHome) add last history for all plants. Special thanks to magix for the key, so i can test the inverter history function.

### 0.0.15 (04.12.2020)

- (PLCHome) npm package version update

### 0.0.14 (01.12.2020)

- (PLCHome) improvement for objects not returned from Growatt website

### 0.0.12 (27.11.2020)

- (PLCHome) wrong initialization for shared key: string instead of boolean

### 0.0.11 (27.11.2020)

- (PLCHome) Read me

### 0.0.10 (26.11.2020)

- (PLCHome) Shared key login
- (PLCHome) Last value of the graph if there are no live data.
- (PLCHome) Change of the polling interval

### 0.0.9 (05.10.2020)

- (PLCHome) fix no feature 'ADAPTER_AUTO_DECRYPT_NATIVE'

### 0.0.8 (05.10.2020)

- (PLCHome) fix io-package

### 0.0.7 (05.10.2020)

- (PLCHome) with "@iobroker/adapter-core": "^2.4.0", the js-controller dep needs to be >=2.0.0!
- (PLCHome) io-package native defined 5 values, admin sets 7
- (PLCHome) store password encrypted

### 0.0.6 (31.08.2020)

- (PLCHome) translation with ioBroker tool.

### 0.0.5

- (PLCHome) initial release.

### 0.0.1

- (PLCHome) initial release.

-\*-

## License

The MIT License (MIT)

Copyright (c) 2020 - 2022 PLCHome

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