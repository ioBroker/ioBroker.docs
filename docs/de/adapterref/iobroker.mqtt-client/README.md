---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-client
hash: XK5Xtt7JLVj8s1aTQamLmu4JQk7bY/jI6kpXPlHfTXY=
---
![Logo](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.mqtt-client)
![Downloads](https://img.shields.io/npm/dm/iobroker.mqtt-client.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.mqtt-client)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.mqtt-client)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.mqtt-client/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.mqtt-client)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.mqtt-client)
![NPM-Version](http://img.shields.io/npm/v/iobroker.mqtt-client.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mqtt-client-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mqtt-client-installed.svg)

# IoBroker.mqtt-client
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/mqtt-client/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.mqtt-client/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.mqtt-client/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.mqtt-client/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.mqtt-client/actions/workflows/codeql.yml)

## Wachposten
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Adaptereinstellungen
![Adapter](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

### Zum Thema und der Nachricht verbinden
Die ```on connect message``` werden jedes Mal, wenn der Client eine Verbindung zum Server herstellt oder erneut verbindet, in den ```on connect topic``` veröffentlicht.

### Zum Thema und zur Nachricht trennen
Die ```on disconnect message``` werden in den ```on disconnect topic``` veröffentlicht, wenn der Adapter ordnungsgemäß beendet wird.

### Letztes Thema und Nachricht
Die ```last will message``` werden jedes Mal, wenn der Client eine Verbindung zum Server herstellt oder erneut verbindet, in den ```last will topic``` veröffentlicht.
Der Server speichert diese Nachricht und sendet sie an seine Abonnenten, wenn der Client unerwartet die Verbindung trennt.

### Abonnements
Durch Kommas getrennte Liste von Themen, die nicht durch bestehende Staaten abgedeckt werden.
Empfangene Nachrichten werden in Zustände innerhalb des Namensraums des Adapters (z. B. mqtt.0) umgewandelt und abonniert.
Sie können Themen entfernen, nachdem alle Status erstellt wurden.

### Veröffentlichungspräfix
Bei der Veröffentlichung wird dies allen Themen vorangestellt.
Der Standardwert ist leer (kein Präfix).

### Subscribe-Präfix
Beim Abonnieren wird dies allen Themen vorangestellt.
Der Standardwert ist leer (kein Präfix).

## Statuseinstellungen
![Zustand](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

### Ermöglicht
Aktiviert oder deaktiviert die mqtt-client-Funktionalität für diesen Status.
Durch die Deaktivierung werden alle MQTT-Client-Einstellungen aus diesem Zustand gelöscht.

### Thema
Das Thema, für das dieser Status veröffentlicht und abonniert wurde.
Standard: State-ID konvertiert in ein MQTT-Thema.

### Veröffentlichen
* Der Status „Aktivieren“ wird veröffentlicht
* Der Status „Ändert sich nur“ wird nur veröffentlicht, wenn sich sein Wert ändert
* „Als Objekt“ wird der gesamte Staat als Objekt veröffentlicht
* „qos“ siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* „retain“ siehe <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

### Abonnieren
* Das Thema „enable“ wird abonniert und der Status wird entsprechend aktualisiert
* Der Status „Nur Änderungen“ wird nur geschrieben, wenn sich der Wert geändert hat
* „Als Objekt“-Nachrichten werden als Objekte interpretiert
* „qos“ siehe <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* „ack“ Bei Statusaktualisierungen wird das Bestätigungsflag entsprechend gesetzt

#### Notiz
* Wenn „ack“ auf „true“ gesetzt ist, werden Objekte mit „ack“ überschrieben, siehe „als Objekt“.
* Um Nachrichtenschleifen zu verhindern, ist „Nur Änderungen“ für das Abonnieren immer aktiviert, wenn sowohl „Veröffentlichen“ als auch „Abonnieren“ aktiviert sind

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### __WORK IN PROGRESS__ -->

## Changelog
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