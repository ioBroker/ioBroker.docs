---
chapters: {"pages":{"en/adapterref/iobroker.cloud/README.md":{"title":{"en":"ioBroker cloud adapter"},"content":"en/adapterref/iobroker.cloud/README.md"},"en/adapterref/iobroker.cloud/doc/ifttt.md":{"title":{"en":"How to use IFTTT with ioBroker"},"content":"en/adapterref/iobroker.cloud/doc/ifttt.md"},"en/adapterref/iobroker.cloud/doc/tasker.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.cloud/doc/tasker.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cloud/README.md
title: ioBroker Cloud-Adapter
hash: O1e25HdQqdwUOxkcQgeXtotAsysHeauu4N30s+pBTlI=
---
![Logo](../../../en/adapterref/iobroker.cloud/admin/cloud.png)

![Anzahl der Installationen](http://iobroker.live/badges/cloud-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cloud.svg)
![NPM](https://nodei.co/npm/iobroker.cloud.png?downloads=true)

# ioBroker Cloud-Adapter

Dieser Adapter ermöglicht die Verbindung vom Internet über die ioBroker-Cloud zur lokalen Installation von ioBroker.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Informationen und Hinweise zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Einstellungen

### APP-SCHLÜSSEL

Um den Cloud-Adapter zu verwenden, müssen Sie zuerst den APP-Schlüssel auf <https://iobroker.net> abrufen.

Dies ist der Anwendungsschlüssel, den der Benutzer auf der Website <https://iobroker.net> erhält. Bitte kopieren Sie den Schlüssel dorthin und geben Sie ihn hier ein.

![Einleitung](../../../en/adapterref/iobroker.cloud/img/intro.png)

### Beispiel

Alle Anfragen vom Cloud-Adapter werden an die jeweilige Webinstanz weitergeleitet. Der Benutzer muss hier die Webinstanz angeben; diese wird ihm beim Einloggen auf <https://iobroker.net> angezeigt.

### Selbstsignierte Zertifikate zulassen

Wenn Sie die Standard-Cloud von iobroker.net nutzen, können Sie diese Funktion deaktivieren. Diese Option ist nur relevant, wenn Sie Ihre eigene Cloud verwenden.

### Alexa-Einstellungen

_**Alexa wird nicht unterstützt in `cloud` Den Adapter nicht mehr verwenden. Nutzen Sie dafür den ioBroker.iot-Adapter.**_

## IFTTT

[Anweisungen](/#/docs/adapterref/iobroker.cloud/doc/ifttt.md)

## Dienstleistungen

Es besteht die Möglichkeit, Nachrichten an den Cloud-Adapter zu senden. Wenn Sie anrufen `[POST]https://iobroker.net/service/custom_<NAME>/<user-app-key>` und Wert als Nutzlast.

```bash
curl --data "myString" https://iobroker.net/service/custom_test/<user-app-key>
```

Wenn Sie in den Einstellungen das Feld „Whitelist für Dienste“ auf den Namen _„custom\_test_ “ setzen und den Dienst mit „custom\_test“ als Namen aufrufen, wird der Status `cloud.0.services.custom_test` wird eingestellt auf `myString` Die

Sie können ein "\*" in die Whitelist eintragen, dann sind alle Dienste zugelassen.

Ab Version 2.0.5 können Sie GET-Anfragen im folgenden Format verwenden: `[GET]https://iobroker.net/service/custom_<NAME>/<user-app-key>/<data>` um die `\<data\>` hinein `cloud.0.services.custom_\<NAME\>` Die

Hier finden Sie eine Anleitung zur Verwendung mit [Tasker](/#/docs/adapterref/iobroker.cloud/doc/tasker.md) .

Der IFTTT-Dienst ist nur zulässig, wenn ein IFTTT-Schlüssel festgelegt ist.

Reservierte Namen sind `ifttt`, `text2command`, `simpleApi`, `swagger` Diese müssen ohne die `"custom_"` Präfix.

### text2command

Sie können schreiben `text2command` In der Whitelist können Sie POST-Anfragen senden an `https://iobroker.net/service/text2command/<user-app-key>` um Daten zu schreiben in `text2command.X.text` Variable.

"X" kann in den Einstellungen über die Option "Text2Command-Instanz verwenden" definiert werden.

### simpleApi

Folgende Befehle können verwendet werden (nur Pro-Version):

- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/get/stateID` - Zustandswert lesen =>`{"val":103.516,"ack":true,"ts":1604132484682,"q":0,"from":"system.adapter.admin.0","lc":1604132469672,"result":"OK"}`
- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/getPlainValue/stateID` - Zustandswert lesen =>`103.641`
- `[GET]https://iobroker.pro/service/simpleApi/<user-app-key>/set/stateID?value=1` - um den Statuswert festzulegen =>`{"result":"OK"}`

**Vergessen Sie nicht, Folgendes hinzuzufügen `simpleApi` zu den in der Konfiguration zulässigen Diensten.**

### Einschränkungen

Wenn HTTPS (Sicherheit) oder Authentifizierung auf einer bestimmten Webinstanz aktiviert ist, funktioniert es nicht.

Sie können HTTPS und die Authentifizierung für diese Webinstanz deaktivieren, es ist jedoch besser, eine neue Webinstanz zu erstellen, die an … gebunden ist. `localhost` und wählen Sie diese Instanz in den Cloud-Einstellungen aus.

## Remote-Shell (SSH)

Auf **der Pro-Version** kann die Cloud als SSH-Jump-Host fungieren, sodass Sie von überall aus auf eine Shell (oder einen beliebigen TCP-Dienst) auf diesem Rechner zugreifen können. Die Authentifizierung erfolgt mit Ihrer Cloud-E-Mail-Adresse und Ihrem Passwort. Die interne SSH-Verbindung ist zwischen Ihrem Client und dem lokalen Server Ende-zu-Ende-verschlüsselt. `sshd` Die Cloud leitet also nur Bytes weiter.

Aktivieren Sie es unter **„Remote Shell“** in den Adaptereinstellungen:

- **Remote-Shell aktivieren** – standardmäßig deaktiviert.
- **Zulässige Ziele** – eine Regeltabelle; ein Ziel ist zulässig, wenn es in einer Zeile übereinstimmt. Dies ist die maßgebliche Zulassungsliste; die Cloud öffnet nur Ziele, die der Adapter erlaubt. Jede Zeile enthält:

  - **Host** – eine einzelne IP-Adresse oder ein Hostname (`127.0.0.1`, `localhost`), ein Joker (`192.168.*`), ein CIDR (`192.168.1.0/24`), oder ein Bereich (`192.168.1.10-192.168.1.50`).
  - **Ports** — eine Liste und/oder Bereiche (`22`, `22, 8081`, `8000-8100`), oder leer /`*` /`all` für jeden beliebigen Hafen.

  Standard: `127.0.0.1` Und `localhost`, ein beliebiger Port (nur auf diesem Rechner). So kann eine Zeile nur SSH auf dem ioBroker-Server freigeben, während eine andere ein ganzes Subnetz öffnet, z. B. `127.0.0.1 → 22` Plus `192.168.1.0/24 → *` Die

Stellen Sie dann eine Verbindung her (wobei Ihr eigener SSHD-Server von Port 22 verschoben wird, und `pi` (Benutzer dieses Rechners):

```bash
ssh -J <email>@iobroker.pro pi@localhost
```

`-L 8081:localhost:8081` tunnelt die Admin-Benutzeroberfläche, `scp` /`sftp` Dateien kopieren usw. UDP wird nicht übertragen (daher benötigt KNXnet/IP über UDP ein TCP-fähiges Gateway oder ein VPN).

Beim Start prüft der Adapter, ob ein SSH-Server erreichbar ist. `127.0.0.1:22` und veröffentlicht das Ergebnis im Staa&#x74;** `info.sshAvailable` ** Die Einstellungsseite zeigt diesen Status live an: Wenn kein SSH-Server gefunden wird (oder das Konto nicht pro ist), wird ein Hinweis angezeigt und **die Remote-Shell-Einstellungen werden vollständig ausgeblendet** , sodass sie erst dann angezeigt werden, wenn durch deren Aktivierung tatsächlich eine Shell erreicht werden kann.

## Android-Anwendung

Bei der neuen Android-Anwendung wurde der Speicherort der Variablen für Helligkeit und Standort geändert.

Nun waren sie zu finden in `cloud.X.devices.NAME`:

- `cloud.X.devices.NAME.brightness`
- `cloud.X.devices.NAME.currentLocation` Die
- `cloud.X.devices.NAME.batteryLevel`
- `cloud.X.devices.NAME.batteryState` Die

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 6.2.5 (2026-09-24)
* (@GermanBluefox) A POST body that arrives as a buffer is decoded instead of stringified, so the telemetry of the visu apps is no longer lost on its way through the cloud
* (@GermanBluefox) An empty body for a reported value, and a command without `deviceName`/`name`, are logged instead of being dropped silently

### 6.2.4 (2026-09-21)
* (@GermanBluefox) Updated packages

### 6.2.1 (2026-09-17)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Clear subscriptions on cloud disconnection

### 6.1.3 (2026-08-26)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Migrated blockly to TypeScript

### 6.1.2 (2026-06-13)
* (@GermanBluefox) Added support of credentials manager

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