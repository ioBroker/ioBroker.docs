---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-client
hash: zW4LoHreN+gpPCnvEs3vSptN0V+v1rINjKN992x61hE=
---
![Logo](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mqtt-client?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.mqtt-client?label=npm%20downloads&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.mqtt-client?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.mqtt-client?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.mqtt-client?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![Letztes GitHub-Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.mqtt-client/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.mqtt-client.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/mqtt-client-stable.svg)
![Eingerichtet](http://iobroker.live/badges/mqtt-client-installed.svg)

# IoBroker.mqtt-client
## Versionen
Veröffentlichen und Abonnieren von ioBroker-Zuständen bei MQTT-Brokern

## Wachposten
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Adaptereinstellungen
![Adapter](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

### Zum Verbinden von Thema und Nachricht
```on connect message``` wird jedes Mal an ```on connect topic``` veröffentlicht, wenn der Client eine Verbindung zum Server herstellt oder wiederherstellt.

### Zum Thema und zur Nachricht „Trennung“
```on disconnect message``` wird an ```on disconnect topic``` veröffentlicht, wenn der Adapter ordnungsgemäß stoppt.

### Thema und Nachricht des letzten Testaments
Die ```last will message``` wird jedes Mal an die ```last will topic``` gesendet, wenn der Client eine Verbindung zum Server herstellt oder wiederherstellt.
Der Server speichert diese Nachricht und sendet sie an seine Abonnenten, wenn der Client die Verbindung unerwartet trennt.

### Abonnements
Durch Kommas getrennte Liste von Themen, die nicht von vorhandenen Status abgedeckt sind.
Empfangene Nachrichten werden in Status innerhalb des Namespace des Adapters (z. B. mqtt.0) umgewandelt und abonniert.
Sie können Themen entfernen, nachdem alle Status erstellt wurden.

### Veröffentlichungspräfix
Beim Veröffentlichen wird dies allen Themen vorangestellt.
Standardmäßig ist es leer (kein Präfix).

### Präfix abonnieren
Beim Abonnieren wird dies allen Themen vorangestellt.
Standardmäßig ist es leer (kein Präfix).

## Statuseinstellungen
![Zustand](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

### Ermöglicht
Aktiviert oder deaktiviert die MQTT-Client-Funktionalität für diesen Status.
Durch Deaktivieren werden alle MQTT-Client-Einstellungen aus diesem Status gelöscht.

### Thema
Das Thema, zu dem dieser Status veröffentlicht und von dem aus er abonniert wird.
Standard: Status-ID in ein MQTT-Thema konvertiert.

### Veröffentlichen
* Der Status „enable“ wird veröffentlicht
* Der Status „Nur Änderungen“ wird nur veröffentlicht, wenn sich sein Wert ändert.
* ```als Objekt``` Der gesamte Status wird als Objekt veröffentlicht
* „qos“ siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* „retain“ siehe <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

### Abonnieren
* Das Thema ```enable``` wird abonniert und der Status wird entsprechend aktualisiert.
* Der Status „Nur Änderungen“ wird nur geschrieben, wenn sich der Wert geändert hat
* ```als Objekt``` Nachrichten werden als Objekte interpretiert
* „qos“ siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```ack``` bei Statusaktualisierungen wird das Ack-Flag entsprechend gesetzt

#### Notiz
* Wenn „ack“ auf „true“ gesetzt ist, wird das „ack“-Objekt überschrieben, siehe „als Objekt“
* um Nachrichtenschleifen zu vermeiden, ist „Nur Änderungen“ beim Abonnieren immer aktiviert, wenn sowohl „Veröffentlichen“ als auch „Abonnement“ aktiviert sind.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### __IN ARBEIT__ -->

## Changelog
### __WORK IN PROGRESS__
* (@klein0r) Added missing information in configuration dialog

### 2.0.0 (2024-06-21)
* (klein0r) Password is now encrypted - you have to re-renter your password in instance settings!
* (klein0r) Use jsonConfig instead of materialize (for instance settings)

### 1.8.0 (2024-04-07)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.7.0 (2023-10-30)

* (mcm1957) Dependencies have been updated
* (mcm1957) Adapter requires nodejs 16 now

### 1.6.5 (2023-09-28)
* (foxriver76) prevent crash cases on invalid subscribe

### 1.6.4 (2023-07-26)
* (DutchmanNL) Option to allow self-signed certificates in adapter settings added.

### 1.6.3 (2022-06-16)
* (Apollon77) Prevent potential crash cases reported by Sentry

### 1.6.2 (2022-04-02)
* (Apollon77) Prevent potential crash cases reported by Sentry

### 1.6.1 (2022-02-24)
* (Pmant) fix subscriptions
* (Pmant) fix unsubscribing
* (Pmant) use prefix for LWT topic

### 1.6.0 (2022-02-19)
* (Pmant) add option to select protocol version
* (Pmant) add websocket support
* (Pmant) publish values once on enabling publishing
* (Pmant) Upgrade to MQTT version 4 (resolves many connection issues)
* (Pmant) fix LWT documentation
* (Pmant) optionally publish a message when disconnecting gracefully

### 1.5.0 (2022-01-26)
* IMPORTANT: This adapter now required at least js-controller 3.3.x
* (Apollon77) Fix crash cases

### 1.4.1 (2022-01-26)
* (bluefox) js-controller 3.3 optimizations

### 1.4.0 (2021-07-16)
* IMPORTANT: This adapter now required at least js-controller 2.0.0
* (Apollon77) js-controller 3.3 optimizations
* (AlCalzone) Unpublished expired states
* (AlCalzone) Only handle stat values if state exists

### 1.3.2 (2021-04-19)
* (bluefox) Added support of admin5

### 1.3.1 (2020-03-17)
* (bluefox) mqtt package moved back to 2.x

### 1.3.0 (2020-03-11)
* (bluefox) mqtt package was updated
* (bluefox) Fixed the error with "custom" view

### 1.2.1 (2019-10-17)
* (algar42) Fix adapter restarting
* (algar42) Fix mqtt issues

### 1.2.0 (2019-10-14)
* (bluefox) Support of js-controller 2.0 was added

### 1.1.1 (2018-01-30)
* (bluefox) small fixes

### 1.1.0 (2017-12-30)
* (bluefox) Translations
* (bluefox) Update of MQTT module

### 1.0.1 (2017-11-16)

### 1.0.0 (2017-11-16)
* (bluefox) Update io-package.json

### 0.3.2 (2016-11-18)
* (Pmant) fix initial object parsing
* (Pmant) fix objects view

### 0.3.1 (2016-11-16)
* (Pmant) fix crash

### 0.3.0 (2016-09-08)
* (Pmant) add optional publish and subscribe prefixes

### 0.2.5 (2016-09-08)
* (Pmant) reduce logging -> debug

### 0.2.0 (2016-09-08)
* (Pmant) use new custom settings

### 0.1.1 (2016-06-09)
* (Pmant) fix possible loop

### 0.1.0 (2016-06-08)
* (Pmant) initial commit

## License
The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
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