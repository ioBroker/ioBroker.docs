---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-client
hash: 63p6K+gIHjBbgziE1kE/sI5W09CPRbpbT3/TZmzwweo=
---
![Logo](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mqtt-client?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.mqtt-client?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.mqtt-client?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.mqtt-client?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.mqtt-client?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.mqtt-client/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.mqtt-client.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/mqtt-client-stable.svg)
![Installiert](http://iobroker.live/badges/mqtt-client-installed.svg)

# ioBroker.mqtt-client

## Versionen

ioBroker-Zustände an MQTT-Broker veröffentlichen und abonnieren

## Sentry

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Adaptereinstellungen

![Adapter](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

### zum Thema „Verbindung“ und zur Nachricht

Der `on connect message` wird veröffentlicht auf `on connect topic` jedes Mal, wenn der Client eine Verbindung zum Server herstellt oder die Verbindung wiederherstellt.

### Thema und Nachricht zum Thema „Verbindungsabbruch“

Der `on disconnect message` wird veröffentlicht auf `on disconnect topic` wenn der Adapter ordnungsgemäß stoppt.

### Thema und Nachricht des letzten Willens

Der `last will message` wird veröffentlicht auf `last will topic` Jedes Mal, wenn sich der Client mit dem Server verbindet oder die Verbindung wiederherstellt, speichert der Server diese Nachricht und sendet sie an seine Abonnenten, wenn die Verbindung des Clients unerwartet abbricht.

### Abonnements

Eine durch Kommas getrennte Liste von Themen, die noch nicht von bestehenden Zuständen abgedeckt werden. Empfangene Nachrichten werden in Zustände innerhalb des Namensraums des Adapters (z. B. mqtt.0) umgewandelt und abonniert. Themen können entfernt werden, nachdem alle Zustände erstellt wurden.

### JSON in Zustände für Themen aufteilen

Durch Kommas getrennte Liste von MQTT-Themenfiltern (ohne Präfix, `+` Und `#` sind erlaubt), z.B. `zigbee2mqtt/+` Ein zu einem passenden Thema empfangenes JSON-Objekt wird nicht als Text gespeichert, sondern in einen Kanal aufgeteilt, wobei jeder Wert einen eigenen Status hat. `zigbee2mqtt/sensor` =`{"battery":100,"occupancy":false,"color":{"x":0.3}}` erstellt den Kanal `mqtt-client.0.zigbee2mqtt.sensor` mit den Staaten `battery` (Nummer), `occupancy` (boolesch) und der Kanal `color` mit dem Staat `x` (Nummer).

- Verschachtelte Objekte werden zu Kanälen (bis zu 5 Ebenen), Arrays werden als JSON-Text gespeichert.
- Punkte, Leerzeichen und in IDs nicht zulässige Zeichen werden ersetzt durch `_` in den IDs.
- In ioBroker geschriebene Werte (`ack=false` werden als JSON an `<topic>/set` z.B. `{"color":{"x":0.5}}` Dies ist die Konvention von zigbee2mqtt. Das Gerät bestätigt den neuen Wert mit seiner nächsten Nachricht.
- Nutzdaten, die kein JSON-Objekt sind (Arrays, Zahlen, Text), werden wie bisher behandelt.

Die Themen müssen noch abonniert werden, z. B. mit `zigbee2mqtt/#` In den zusätzlichen Abonnements wird angegeben, dass ältere, als Text erstellte Versionen dieser Themen nicht geändert werden und gelöscht werden können.

### Veröffentlichungspräfix

Beim Veröffentlichen wird dies allen Themen vorangestellt. Standardmäßig ist es leer (kein Präfix).

### Präfix abonnieren

Beim Abonnieren wird dies allen Themen vorangestellt. Standardmäßig ist es leer (kein Präfix).

## Statuseinstellungen

![Zustand](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

### ermöglicht

Aktiviert oder deaktiviert die MQTT-Client-Funktionalität für diesen Zustand. Durch Deaktivieren werden alle MQTT-Client-Einstellungen dieses Zustands gelöscht.

### Thema

Das Thema, in dem dieser Status veröffentlicht und von dem er abonniert wird. Standard: Status-ID, konvertiert in ein MQTT-Thema.

Wenn das Thema von der State-ID abgeleitet wird, werden Punkte in Trennzeichen auf Themenebene umgewandelt (`/`) und die folgenden Zeichen werden ersetzt durch `_`:

- die MQTT-Wildcards `+` Und `#` - Sie sind in Themennamen nicht zulässig (verwendet z. B. von Shelly-IDs wie `shelly.0.SHSW-1#B96701#1`)
- Schrägstriche innerhalb der ID selbst würden zusätzliche Themenebenen erzeugen.
- Leerzeichen dürfen nicht in Objekt-IDs gelangen, wenn das Thema zurückkonvertiert wird.

Also `shelly.0.SHSW-1#B96701#1.Relay0.Switch` wird `shelly/0/SHSW-1_B96701_1/Relay0/Switch` Wenn zwei Status-IDs zum selben Thema gehören (z. B. `a#b` Und `a+b`), wird eine Warnung protokolliert. Konfigurieren Sie in diesem Fall ein explizites Thema für eines davon.

### veröffentlichen

- `enable` Der Zustand wird veröffentlicht
- `changes only` Der Status wird nur veröffentlicht, wenn sich sein Wert ändert.
- `as object` Der gesamte Zustand wird als Objekt veröffentlicht
- `qos` Siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
- `retain` Siehe <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

### abonnieren

- `enable` Das Thema wird abonniert und der Status entsprechend aktualisiert.
- `changes only` Der Zustand wird nur geschrieben, wenn sich der Wert ändert.
- `as object` Nachrichten werden als Objekte interpretiert
- `qos` Siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
- `ack` Bei Statusaktualisierungen wird das Bestätigungsflag entsprechend gesetzt.

#### Notiz

- Wenn ack auf true gesetzt ist, überschreibt es die ack-Eigenschaft des Objekts (siehe unten). `as object`
- Um Nachrichtenschleifen zu vermeiden, müssen sowohl Publish als auch Subscribe aktiviert sein. `changes only` ist immer zum Abonnieren verfügbar

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.1.0 (2026-09-15)
* (@GermanBluefox) Adapter requires node.js >= 22.19 now
* (@Tarvion) Automatically derived topics no longer contain the mqtt wildcards `+` and `#` (as used by shelly IDs), slashes or whitespace taken from the state-ID. These characters are replaced by `_` now
* (@GermanBluefox) A warning is logged if two states derive to the same topic
* (@GermanBluefox) Adapter icon converted to SVG
* (@GermanBluefox) The adapter was refactored to TypeScript
* (@GermanBluefox) Fixed: stopping the adapter waited for the timeout when no broker was configured or after `stopInstance`
* (@GermanBluefox) Fixed: states created from received topics now have `common.role` instead of a `role` outside of `common`
* (@GermanBluefox) Fixed: with "subscribe as object", the loop protection and "changes only" skipped changed values instead of unchanged ones
* (@GermanBluefox) Fixed: deleting a state that was published with retain now also removes the retained message from the broker
* (@GermanBluefox) Fixed: MQTT version 3 connects with the protocol name `MQIsdp`, so MQTT 3.1 brokers accept the connection. The versions are labeled 3.1, 3.1.1 and 5.0 in the settings (#169)
* (@GermanBluefox) Fixed: special characters like `%` or `:` in the user name, password or client ID broke the connection (#200)
* (@GermanBluefox) New option "split JSON into states for topics": JSON objects, e.g. from zigbee2mqtt, become a channel with one state per value; written values are sent to `<topic>/set` (#322)
* (@GermanBluefox) Fixed: a subscribed state was not updated after a restart when an object of the adapter's namespace had the same topic. Changing the topic of a state now also unsubscribes the old topic, and no copy of a state is created for an old topic anymore (#418)
* (@GermanBluefox) Fixed: every change of an object (e.g. `extendObject` by another adapter) published the current value of the state again, which could overwrite a newer value on the same topic. The value is now published once only when publishing starts or the topic changes (#467)

### 4.0.0 (2026-05-05)
* (copilot) Adapter requires node.js >= 22 now
* (copilot) Adapter requires admin >= 7.7.22 now
* (copilot) Adapter requires js-controller >= 6.0.11 now
* (@klein0r) Updated dependencies

### 3.0.0 (2025-01-24)
* (@klein0r) Breaking change: Underscores are not replaced by spaces in the corresponding topic anymore

### 2.1.0 (2024-11-12)
* (mcm1957) Adapter requires node.js 20 now.
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
* (simatec) Adapter changed to meet Responsive Design rules.
* (mcm1957) Dependencies have been updated.

### 2.0.1 (2024-09-23)
* (@klein0r) Added missing information in configuration dialog
* (@klein0r) Fixed type of port configuration to avoid conflicts

## License
The MIT License (MIT)

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2016-2023 Pmant

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