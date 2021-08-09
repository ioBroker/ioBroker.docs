---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nut/README.md
title: ioBroker.nut
hash: Ty2TUQVoPfL4x6EuLPk3oAeQRg9BuuixVh42eCA/DEE=
---
![Logo](../../../en/adapterref/iobroker.nut/admin/nut.png)

![Anzahl der Installationen](http://iobroker.live/badges/nut-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.nut.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nut.svg)

# IoBroker.nut
![Testen und freigeben](https://github.com/Apollon77/iobroker.nut/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus] (https://weblate.iobroker.net/widgets/adapters/-/nut/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Dieser Adapter für ioBroker stellt eine Verbindung zu einem definierten NUT-Server her, um den Status und die Details einer verbundenen USV / USV gemäß ioBroker-Status bereitzustellen, damit sie dort verwendet werden können.

** Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. ** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Beschreibung der Parameter
### Host_ip
IP-Adresse des NUT-Servers. NUT muss im Servermodus ausgeführt werden und für den Computer zugänglich sein, auf dem der iobroker NUT-Adapter ausgeführt wird. Überprüfen Sie daher die Firewall-Einstellungen, wenn Sie Probleme haben, und erlauben Sie den Zugriff. Wenn die USV lokal angeschlossen ist, können Sie auch 127.0.0.1 oder localhost verwenden.

### Host_port
Hafen von NUT. Der Standardport ist <b>3493</b>

### Ups_name
Name der USV, wie in der NUT-Konfiguration des NUT-Servers definiert. </ P> Hinweise:

- Wenn Sie eine Verbindung zu einer USV herstellen möchten, die mit einer Synology-Diskstation verbunden ist, lautet der Name einfach "ups".
- Wenn Sie eine Verbindung zu einer USV herstellen möchten, die mit einem QNAP NAS verbunden ist, lautet der Name einfach "qnapups".

### Updateintervall
Intervall in Sekunden, um die Daten zu aktualisieren. Die Standardeinstellung ist 300s

## UPS-Monitor benachrichtigt
Enthalten ist ein kleines Linux-Shell-Skript unter scripts / nut-notify.sh, das in upsmon konfiguriert werden kann.

Das Skript benötigt Ausführungsrechte (chmod + x nut-notify.sh).

Es sollte zu /etc/nut/upsmon.conf hinzugefügt werden wie:

```
NOTIFYCMD "cd /opt/iobroker/;./nut-notify.sh"
```

Konfigurieren Sie zusätzlich alle relevanten Benachrichtigungsnachrichten wie:

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

Wichtig ist das hinzugefügte "EXEC" -Flag.

Ein einfaches Beispiel für ein nut-notify.sh-Skript ist:

```
#! /bin/sh
# NUT adapter notify script.

logger -t nut-notify "Notify iobroker $UPSNAME -> $NOTIFYTYPE"
/opt/iobroker/iobroker message nut notify "{\"upsname\":\"$UPSNAME\",\"notifytype\":\"$NOTIFYTYPE\"}"

```

## Fehlerbehebung
Wenn Sie Probleme haben und der Adapter die Daten nicht liefert, können Sie sie mit den beiden Skripten im Verzeichnis "test" der Adapterinstallation (normalerweise in node_modules / iobroker.nut / test relativ zu Ihrem iobroker-Installationsverzeichnis) ausprobieren die Kommandozeile. Rufen Sie die Skripte mit "node filename.js" auf, um die erwarteten Parameter anzuzeigen. </ P>

* **test_upslist.js** Stellt eine Verbindung zum NUT-Server her und gibt eine Liste der verfügbaren USV-Namen zurück
* **test_upsvars.js** Stellt eine Verbindung zum NUT-Server für eine definierte USV her und gibt eine Liste der verfügbaren USV-Variablen zurück

## Machen
* Dokumente für die Webseite

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (foxriver76) we fixed the state value type set to `battery.charge`
* (Apollon77) Add connection states

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

Copyright (c) 2016-2020 Apollon77 <ingo@fischer-ka.de>

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