---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.linux-control/README.md
title: ioBroker.linux-control
hash: 4OAFdJPUvwnqs54swKDBI/2TA0hF6FiD0QjY3+lPw6I=
---
![Logo](../../../en/adapterref/iobroker.linux-control/admin/linux-control.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.linux-control.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.linux-control.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/linux-control-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/linux-control-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Scrounger/iobroker.linux-control.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Scrounger/ioBroker.linux-control/badge.svg)
![NPM](https://nodei.co/npm/iobroker.linux-control.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/Scrounger/ioBroker.linux-control/master.svg)

# IoBroker.linux-control
## Linux-Steuerungsadapter für ioBroker
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VWAXSTS634G88&source=url)

Linux-Geräte steuern und Informationen über Ihr System abrufen

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Konfiguration
### Allgemein
![Allgemein](../../../en/adapterref/iobroker.linux-control/docs/en/img/general.png)

|Einstellung|Beschreibung|
|-------|-----------|
|aktiviert|Aktualisierung des Hosts aktivieren oder deaktivieren|
|Datenpunkt-ID|ID, unter der alle Datenpunkte gespeichert werden sollen|
|IP|IP-Adresse Ihres Linux-Geräts|
|Port|SSH-Port Ihres Linux-Geräts|
|Abfrageintervall|Abfrageintervall in Minuten.<br> Um die Abstimmung zu deaktivieren, können Sie &#39;0&#39; verwenden oder das Feld leer lassen. |
|Benutzer|SSH-Benutzer für die Anmeldung|
|Passwort / Passphrase|SSH-Passwort für die Anmeldung oder Passphrase, falls Sie einen RSA-Schlüssel verwenden|
|sudo verwenden| mit sudo |
|Legacy SSH|Aktiviert veraltete SSH-Schlüsselaustausch- und Verschlüsselungsalgorithmen (z. B. `diffie-hellman-group1-sha1`, `3des-cbc`, `ssh-rsa`) für ältere Geräte/Switches|
|rsa key|Pfad und Dateiname Ihres RSA-Schlüssels. Zugriffsrechte müssen vorhanden sein!|
|Zeitüberschreitung|Verbindungszeitüberschreitung|

### Datenpunkte
![Datenpunkte](../../../en/adapterref/iobroker.linux-control/docs/en/img/datapoints.gif)

Der Adapter erstellt vordefinierte Datenpunkte mit Informationen und ermöglicht die Steuerung des Linux-Geräts. Diese können hier ausgewählt werden.
Zusätzlich können für jeden Host einzelne Datenpunkte oder ganze Kanäle per Drag & Drop auf die Blacklist gesetzt werden, sodass sie für diesen Host nicht erstellt werden.

Hinweis: Wenn Sie den gesamten Kanal zur Sperrliste hinzufügen möchten, müssen Sie den Kanalknoten per Drag & Drop auf die Sperrliste ziehen. Nur dann wird der gesamte Kanal ignoriert – siehe Screenshot unten:

![Datenpunkte](../../../en/adapterref/iobroker.linux-control/docs/en/img/all_to_blacklist.gif)

**Aufgrund der Vielzahl unterschiedlicher Linux-Distributionen wurde diese Funktion nur mit Debian 10 und Ubuntu 18/20 LTS getestet!**

### Dienstleistungen
![Dienstleistungen](../../../en/adapterref/iobroker.linux-control/docs/en/img/services.png)

Wenn die Abfrage von Diensten unter Datenpunkten aktiviert ist, können Sie hier pro Host definieren, für welche Dienste nur Informationen abgerufen werden sollen.

**Aufgrund der Vielzahl unterschiedlicher Linux-Distributionen wurde diese Funktion nur mit Debian 10 und Ubuntu 18/20 LTS getestet!**

### Ordner
![Ordner](../../../en/adapterref/iobroker.linux-control/docs/en/img/folders.png)

Hier können Sie Informationen über die Größe von Ordnern, die Anzahl der in diesen Ordnern enthaltenen Dateien und den Zeitstempel der letzten Änderung in diesem Ordner abrufen.

**Aufgrund der Vielzahl unterschiedlicher Linux-Distributionen wurde diese Funktion nur mit Debian 10 und Ubuntu 18/20 LTS getestet!**

|Einstellung|Beschreibung|
|-------|-----------|
|aktiviert|Aktualisierung des Ordners aktivieren oder deaktivieren|
|Host|Der zu verwendende Host|
|Datenpunkt-ID|ID, unter der alle Datenpunkte gespeichert werden sollen|
|Pfad|Pfad des Ordners|
|Dateinamensmuster|Muster für Dateinamen, die erkannt werden sollen.|
|Einheit|Größeneinheit|
|Dezimalstellen|Dezimalstellen|
|Anzahl der Dateien|Datenpunkt für die Anzahl der Dateien erstellen|
|Letzte Änderung|Datenpunkt für den Zeitstempel der letzten Änderung in diesem Ordner erstellen|

### Meine Befehle
![Benutzerdefinierte Befehle](../../../en/adapterref/iobroker.linux-control/docs/en/img/myCommands.png)

Hier können Sie individuelle Befehle definieren und diese anschließend an Ihre eigenen Datenpunkte senden.
Es ist wichtig, dass die abgerufenen Daten im korrekten Datentyp übertragen werden! Der Datentyp muss entsprechend konfiguriert werden.

|Einstellung|Beschreibung|
|-------|-----------|
|aktiviert|Aktualisierung des Befehls aktiviert oder deaktiviert|
|Host|Der zu verwendende Host|
|Datenpunkt-ID|ID, unter der Datenpunkte gespeichert werden sollen|
|Abfrageintervall|Abweichendes Abfrageintervall in Sekunden, nur für den Befehl. Zum Deaktivieren `0` verwenden oder das Feld leer lassen, dann wird das Abfrageintervall des Hosts verwendet. |
|Befehl|Befehl, der verwendet werden sollte<br><br> Wenn Sie einen Benutzer verwenden, der `sudo` benötigt, müssen Sie `sudo -S` zu Ihrem eigenen Befehl hinzufügen!|
|Befehl|Befehl, der verwendet werden sollte<br><br> Wenn Sie einen Benutzer verwenden, der `sudo` benötigt, müssen Sie `sudo -S` zu Ihrem eigenen Befehl hinzufügen!|
|Typ|Typ des Datenpunkts|
|Einheit|Einheit des Datenpunkts|

## Bekannte Probleme
* Falls keine Verbindung zu Ihrem Linux-Client hergestellt werden kann, überprüfen Sie, ob `iputils-ping` korrekt auf dem Client installiert ist.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
* (meistermopper) add optional legacy SSH algorithms support for older devices (closes #90)
* (meistermopper) add Biome linter, `npm run test:local` workflow and align with harvia-fenix quality standard
* (meistermopper) fix invalid common.states type for `command.host` object
* (meistermopper) update dependencies, adminUI configuration and repochecker compliance

### 1.1.6 (2022-09-06)
* (Scrounger) global interval for update informations added
* (Scrounger) fix invalid object host

### 1.1.6 (2026-07-23)
* (meistermopper) Improved timer resource cleanup on unload using adapter-core safe timeouts
* (meistermopper) Enforced state ack handling filter in onStateChange
* (meistermopper) Added legacy SSH key exchange and cipher algorithm support

### 1.1.5 (2022-05-03)
* (Scrounger) Dependencies updated

### 1.1.4 (2021-12-18)
* (Scrounger) always create my command datapoint

### 1.1.3 (2021-10-04)
* (Scrounger) show warn message if permission denied
* (xCruziX) preformance improvment

### 1.1.2 (2021-01-08)
* (Scrounger) show error if user is not in sudoers file
* (Scrounger) bug fix if response has no result optimized
* (Scrounger) myCommands: bug fix sudo is no longer mandatory

Older changelogs can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2020-2026 Scrounger <scrounger@gmx.net>

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