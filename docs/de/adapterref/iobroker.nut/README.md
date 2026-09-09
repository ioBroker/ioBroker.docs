---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nut/README.md
title: ioBroker.nut
hash: Rs0JbdWF5loJAmUA8FMqmFye6Ixfe56QaesmGChCUvg=
---
![Logo](../../../en/adapterref/iobroker.nut/admin/nut.png)

![Anzahl der Installationen](http://iobroker.live/badges/nut-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nut.svg)
![Test und Freigabe](https://github.com/Apollon77/iobroker.nut/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/nut/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nut.svg)

# ioBroker.nut

Dieser Adapter für ioBroker stellt eine Verbindung zu einem definierten NUT-Server her, um den Status und die Details einer angeschlossenen USV/USV gemäß ioBroker bereitzustellen, damit diese dort verwendet werden kann.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Beschreibung der Parameter

### Host-IP

Die IP-Adresse des NUT-Servers. NUT muss im Servermodus ausgeführt werden und vom Computer, auf dem der iobroker NUT-Adapter läuft, erreichbar sein. Überprüfen Sie daher die Firewall-Einstellungen und erlauben Sie den Zugriff, falls Probleme auftreten. Wenn die USV lokal angeschlossen ist, können Sie auch 127.0.0.1 oder localhost verwenden.

### Host-Port

Anschluss der NUT. Der Standardanschluss ist<b> 3493</b>

### ups\_name

Name der USV, wie sie in der NUT-Konfiguration des NUT-Servers definiert ist.</p> Hinweise:

- Wenn Sie eine Verbindung zu einer USV herstellen möchten, die an eine Synology DiskStation angeschlossen ist, lautet der Name einfach "ups".
- Wenn Sie eine Verbindung zu einer USV herstellen möchten, die an ein QNAP NAS angeschlossen ist, lautet der Name einfach "qnapups".

### Aktualisierungsintervall

Aktualisierungsintervall der Daten in Sekunden. Standardwert: 300 Sekunden.

## USV-Monitor benachrichtigt

Ein kleines Linux-Shell-Skript unter scripts/nut-notify.sh ist ebenfalls enthalten und kann in upsmon konfiguriert werden.

Das Skript benötigt Ausführungsrechte (chmod +x nut-notify.sh).

Es sollte in /etc/nut/upsmon.conf wie folgt hinzugefügt werden:

```
NOTIFYCMD "cd /opt/iobroker/;./nut-notify.sh"
```

Konfigurieren Sie außerdem alle relevanten Benachrichtigungen wie:

```
NOTIFYFLAG ONLINE       SYSLOG+WALL+EXEC
NOTIFYFLAG ONBATT       SYSLOG+WALL+EXEC
NOTIFYFLAG LOWBATT      SYSLOG+WALL+EXEC
NOTIFYFLAG FSD          SYSLOG+WALL+EXEC
NOTIFYFLAG COMMOK       SYSLOG+WALL+EXEC
NOTIFYFLAG COMMBAD      SYSLOG+WALL+EXEC
NOTIFYFLAG SHUTDOWN     SYSLOG+WALL+EXEC
NOTIFYFLAG REPLBATT     SYSLOG+WALL+EXEC
NOTIFYFLAG NOCOMM       SYSLOG+WALL+EXEC
NOTIFYFLAG NOPARENT     SYSLOG+WALL+EXEC
```

Wichtig ist das hinzugefügte "EXEC"-Flag.

Ein einfaches Beispiel für ein nut-notify.sh-Skript ist:

```
#! /bin/sh
# NUT adapter notify script.

logger -t nut-notify "Notify iobroker $UPSNAME -> $NOTIFYTYPE"
/opt/iobroker/iobroker message nut notify "{\"upsname\":\"$UPSNAME\",\"notifytype\":\"$NOTIFYTYPE\"}"

```

## Fehlerbehebung

Falls Probleme auftreten und der Adapter die Daten nicht liefert, können Sie die beiden Skripte im Verzeichnis „test“ der Adapterinstallation (normalerweise in node\_modules/iobroker.nut/test relativ zu Ihrem iobroker-Installationsverzeichnis) verwenden, um sie über die Kommandozeile zu testen. Rufen Sie die Skripte mit „node dateiname.js“ auf, um die erwarteten Parameter anzuzeigen.</p>

- **test\_upslist.js** : Stellt eine Verbindung zum NUT-Server her und gibt eine Liste der verfügbaren USV-Namen zurück.
- **test\_upsvars.js** : Stellt eine Verbindung zum NUT-Server für eine definierte USV her und gibt eine Liste der verfügbaren USV-Variablen zurück.

## Todo

- Dokumentation für Webseite

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.7.0 (2025-10-02)
* IMPORTANT: js-controller 6.0 is now needed at least
* (Apollon77) Dependencies updated

### 1.6.0 (2022-12-09)
* IMPORTANT: js-controller 3.0 is now needed at least
* (Apollon77) Delay adapter initialization when USV is not reachable on adapter start

### 1.5.1 (2022-02-19)
* (simatec) jsonConfig added
* (simatec) test and release updated

### 1.5.0 (2021-05-08)
* (Apollon77) Add connection states
* (Apollon77) Optimize for js-controller 3.3
* (foxriver76) we fixed the state value type set to `battery.charge`

### 1.4.3 (2021-02-04)
* (Apollon77) Enhance the port check

### 1.4.2 (2021-01-23)
* (Apollon77) Check configured port before using it (Sentry IOBROKER-NUT-3)

### 1.4.1 (2021-01-21)
* (Apollon77) Optimize stop handling (Sentry IOBROKER-NUT-1)

### 1.4.0 (2021-01-14)
* (Apollon77) Prevent warnings in js-controller 3.2
* (Apollon77) Require at least js-controller 2.0

### 1.3.0 (2020-12-27)
* (Apollon77) adjust connection close handling
* (Apollon77) add compact mode

### 1.2.0 (2020-12-26)
* (Apollon77) update dependencies
* (Apollon77) Add Sentry error reporting

### 1.1.3 (2018-04-13)
* Fix Admin

### 1.1.2 (2018-03-28)
* Fix status parsing

### 1.1.1
* Enhance error handling

### 1.1.0
* Add possibility to call commands on the UPS

### 1.0.0
* change mode from schedule to deamon
* implement message support to receive messages from upsmon
* add status.severity to get one status about the USV with values idle, operating, operating_critical, action_needed, unknown

### 0.3.0
* add better usable status states under "status" channel

### 0.2.1
* finalizied initial version

### 0.1.0
* initial release for testing

## License

The MIT License (MIT)

Copyright (c) 2016-2025 Apollon77 <ingo@fischer-ka.de>

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