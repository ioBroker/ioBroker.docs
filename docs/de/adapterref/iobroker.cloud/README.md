---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cloud/README.md
title: ioBroker Cloud-Adapter
hash: lopIvmMQnEk+Far2YfHhmEKXYirmEnceoNyn+Z8EQow=
---
![Logo](../../../en/adapterref/iobroker.cloud/admin/cloud.png)

![Anzahl der Installationen](http://iobroker.live/badges/cloud-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cloud.svg)
![NPM](https://nodei.co/npm/iobroker.cloud.png?downloads=true)

# ioBroker Cloud-Adapter

Dieser Adapter ermöglicht die Verbindung vom Internet über die ioBroker-Cloud zur lokalen Installation von ioBroker.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.**
Weitere Einzelheiten und Informationen zur Deaktivierung der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Einstellungen

### APP-SCHLÜSSEL

Um den Cloud-Adapter zu verwenden, benötigen Sie zunächst den App-Schlüssel. <https://iobroker.net>.

Dies ist der Anwendungsschlüssel, den der Benutzer erhalten kann. <https://iobroker.net> Bitte holen Sie sich den Schlüssel dort und geben Sie ihn hier ein.

![Einleitung](../../../en/adapterref/iobroker.cloud/img/intro.png)

### Beispiel

Alle Anfragen vom Cloud-Adapter werden an die jeweilige Webinstanz weitergeleitet. Der Benutzer muss hier die Webinstanz angeben; diese wird ihm beim Anmelden angezeigt. <https://iobroker.net> Website.

### Selbstsignierte Zertifikate zulassen

Wenn Sie die Standard-Cloud von iobroker.net nutzen, können Sie diese Funktion deaktivieren. Diese Option ist nur relevant, wenn Sie Ihre eigene Cloud verwenden.

### Alexa-Einstellungen

_**Alexa wird nicht unterstützt in `cloud` Den Adapter nicht mehr verwenden. Nutzen Sie dafür den ioBroker.iot-Adapter.**_

## IFTTT

[Anweisungen](doc/ifttt.md)

## Dienstleistungen

Es besteht die Möglichkeit, Nachrichten an den Cloud-Adapter zu senden. Wenn Sie anrufen `[POST]https://iobroker.net/service/custom_<NAME>/<user-app-key>` und Wert als Nutzlast.

```bash
curl --data "myString" https://iobroker.net/service/custom_test/<user-app-key>
```

Wenn Sie in den Einstellungen das Feld „Whitelist für Dienste“ aktivieren, wird der Name _benutzerdefinierter Tes&#x74;_&#x75;nd rufen Sie mit "custom\_test" als Dienstnamen den Status auf `cloud.0.services.custom_test` wird eingestellt auf `myString`.

Sie können ein "\*" in die Whitelist eintragen, dann sind alle Dienste zugelassen.

Ab Version 2.0.5 können Sie GET-Anfragen im folgenden Format verwenden: `[GET]https://iobroker.net/service/custom_<NAME>/<user-app-key>/<data>` um die `\<data\>` hinein `cloud.0.services.custom_\<NAME\>`.

Hier finden Sie eine Anleitung zur Verwendung mit [Tasker](doc/tasker.md).

Der IFTTT-Dienst ist nur zulässig, wenn ein IFTTT-Schlüssel festgelegt ist.

Reservierte Namen sind `ifttt`, `text2command`, `simpleApi`, `swagger`Diese müssen ohne die `"custom_"` Präfix.

### text2command

Sie können schreiben `text2command` In der Whitelist können Sie POST-Anfragen senden an `https://iobroker.net/service/text2command/<user-app-key>` Daten schreiben in `text2command.X.text` Variable.

"X" kann in den Einstellungen über die Option "Text2Command-Instanz verwenden" definiert werden.

### simpleApi

Folgende Befehle können verwendet werden (nur Pro-Version):

- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/get/stateID` - um den Statuswert zu lesen => `{"val":103.516,"ack":true,"ts":1604132484682,"q":0,"from":"system.adapter.admin.0","lc":1604132469672,"result":"OK"}`
- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/getPlainValue/stateID` - um den Statuswert zu lesen => `103.641`
- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/set/stateID?value=1` - um den Statuswert festzulegen => `{"result":"OK"}`

**Vergessen Sie nicht, Folgendes hinzuzufügen `simpleApi` zu den in der Konfiguration zulässigen Diensten.**

### Einschränkungen

Wenn HTTPS (Sicherheit) oder Authentifizierung auf einer bestimmten Webinstanz aktiviert ist, funktioniert es nicht.

Sie können HTTPS und die Authentifizierung für diese Webinstanz deaktivieren, es ist jedoch besser, eine neue Webinstanz zu erstellen, die an … gebunden ist. `localhost` und wählen Sie diese Instanz in den Cloud-Einstellungen aus.

## Android-Anwendung

Bei der neuen Android-Anwendung wurde der Speicherort der Variablen für Helligkeit und Standort geändert.

Nun waren sie zu finden in `cloud.X.devices.NAME`:

- `cloud.X.devices.NAME.brightness`
- `cloud.X.devices.NAME.currentLocation`.
- `cloud.X.devices.NAME.batteryLevel`
- `cloud.X.devices.NAME.batteryState`.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 6.1.3 (2026-08-26)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Migrated blockly to TypeScript

### 6.1.2 (2026-06-13)
* (@GermanBluefox) Added support of credentials manager

### 6.0.5 (2026-06-01)
* (bluefox) Corrected the command object to be writable

### 6.0.4 (2026-05-17)
* (bluefox) Respect the types of states if writing from visu app

### 6.0.1 (2026-03-04)
* (bluefox) Added communication with new android application
* (bluefox) Dropped support node 18
* (bluefox) Implemented QR Code for ioBroker.visu app

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2016-2026 bluefox <dogafox@gmail.com>

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