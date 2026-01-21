---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gotify/README.md
title: ioBroker.gotify
hash: GiUmaVmMu9raxf+abAznflA+2Hss0fDKdR6IK1oYme0=
---
![Logo](../../../en/adapterref/iobroker.gotify/admin/gotify.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.gotify.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.gotify.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/gotify-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/gotify-stable.svg)
![NPM](https://nodei.co/npm/iobroker.gotify.png?downloads=true)

# IoBroker.gotify
**Tests:** ![Test und Freigabe](https://github.com/ThomasPohl/ioBroker.gotify/workflows/Test%20and%20Release/badge.svg)

##gotify-Adapter für ioBroker
Sende Push-Benachrichtigungen von [ioBroker](https://iobroker.net/) zu [Gotify](https://gotify.net/)

## Installation
### Vorbereitung
- Melden Sie sich mit Ihrem Benutzer bei gotify an.
- Erstellen Sie eine Anwendung für ioBroker
- Notieren Sie sich das Token Ihrer neuen Anwendung

  ![neue Anwendung](../../../en/adapterref/iobroker.gotify/img/newApplication.png)

### In ioBroker
- Gehe zu Adapter
- Klicken Sie auf das GitHub-Katzensymbol
- Wechseln Sie zur Registerkarte „Benutzerdefiniert“.
- Geben Sie https://github.com/ThomasPohl/ioBroker.gotify ein.
- Installieren
- Erstellen Sie eine neue Instanz für den gotify-Adapter.
- Geben Sie die URL Ihrer Installation ein
- Fügen Sie das zuvor erstellte Token hinzu.

## Verwendung
### Blockly
Um Nachrichten mit Blockly zu senden, fügen Sie einfach den gotify-Block zu Ihrem Skript hinzu: ![Blockly](../../../en/adapterref/iobroker.gotify/img/gotify.blockly.png)

Wenn Sie Markdown als Format wählen, können Sie [Preisnachlass](https://guides.github.com/features/mastering-markdown/) verwenden, um Ihre Nachrichten zu formatieren.

### Javascript
Senden Sie eine einfache Nachricht mit dem Standardtoken:

```javascript
sendTo('gotify.0', 'send', {
    title: 'DG lüften',
    message: 'Luftfeuchtigkeit im DG zu hoch!',
});
```

Senden Sie eine Nachricht mit einem benutzerdefinierten Token (überschreibt das konfigurierte Standardtoken):

```javascript
sendTo('gotify.0', 'send', {
    title: 'Custom notification',
    message: 'This message uses a different token',
    priority: 8,
    contentType: 'text/markdown',
    token: 'AaBbCcDdEeFfGg123456',
});
```

## Kommunikation
Das folgende Diagramm veranschaulicht, wie ioBroker Push-Benachrichtigungen an Ihr Smartphone sendet.

![Kommunikationsdiagramm](../../../en/adapterref/iobroker.gotify/img/iobroker.gotify-communication.png)

Sowohl ioBroker als auch die Smartphone-App verbinden sich über REST mit dem gotify-Server. Die mobile App hält eine offene WebSocket-Verbindung zum gotify-Server aufrecht, um neue Benachrichtigungen empfangen zu können.

Wenn der ioBroker-Adapter eine Benachrichtigung senden möchte, sendet er eine POST-Anfrage an den Gotify-Server. Der Gotify-Server kümmert sich dann um die Weiterleitung der Benachrichtigung an den Client.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.5.0 (2025-12-28)

- (Thomas Pohl) Allow to overwrite token when sending messages (javascript only not for blockly)
- (Thomas Pohl) Update dependencies

### 0.4.0

- (Thomas Pohl) Support for notification-manager was added
- (Thomas Pohl) Blockly can now send messages with priority 10

### 0.3.0

- (Thomas Pohl) The token is stored now encrypted
- (Thomas Pohl) node.js 22 is supported

### 0.2.1

- (Thomas Pohl) Optimized startup behavior when adapter is not configured

### 0.2.0

- (Thomas Pohl) Add timeout for http calls
- (Thomas Pohl) Update dependency versions

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Copyright (c) 2024-2025 Thomas Pohl <post@thomaspohl.net>