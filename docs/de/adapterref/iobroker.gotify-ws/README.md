---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gotify-ws/README.md
title: ioBroker.gotify-ws
hash: 1Nujq/M2hQYIjpGp8z92I1UwOsJr25OgTzZsMfyGi3c=
---
![Logo](../../../en/adapterref/iobroker.gotify-ws/admin/gotify-ws.png)

![Anzahl der Installationen](http://iobroker.live/badges/gotify-ws-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.gotify-ws.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.gotify-ws.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/simatec/ioBroker.gotify-ws/badge.svg)
![Test und Freigabe](https://github.com/simatec/ioBroker.gotify-ws/workflows/Test%20and%20Release/badge.svg)
![Lizenz](https://img.shields.io/github/license/simatec/ioBroker.gotify-ws?style=flat)
![Spenden](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.gotify-ws

Dieser Adapter nutzt den Dienst`Sentry.io` Ausnahmen, Codefehler und neue Geräteschemata werden mir als Entwickler automatisch gemeldet. Weitere Details finden Sie unten!

---

## Unterstützung der Adapterentwicklung

**Wenn Ihnen ioBroker.gotify-ws gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## gotify-ws-Adapter für ioBroker

Gotify-WS ist ein Adapter, der eine WebSocket-Verbindung zu einem Gotify-Server herstellt und somit alle Nachrichten vom Server empfangen und verarbeiten kann.

Der Hintergrund war für mich das Fehlen einer Verbindung zu allen gängigen Systemen. Zum Beispiel gibt es keine geeignete App für iOS.

Da Gotify jedoch immer beliebter wird und mittlerweile auch in vielen Systemen wie Proxmox als Benachrichtigungsdienst eingesetzt wird, brauchte ich eine Lösung.

Hier kommt Gotify-WS ins Spiel. Gotify-WS empfängt Nachrichten und leitet sie an einen von ioBroker unterstützten Benachrichtigungsdienst weiter. Das bedeutet, dass Nachrichten beispielsweise an Telegram weitergeleitet werden können.

Spotify-WS unterstützt derzeit die folgenden Benachrichtigungsdienste

- E-Mail
- Matrix
- Benachrichtigungsmanager
- Leichtgläubig
- Zwietracht
- Signal
- Telegramm
- WhatsApp

---

## Adapterkonfiguration

Die Konfiguration des Adapters ist sehr einfach.

Sie erstellen einen neuen Client auf Ihrem Gotify-Server und kopieren dessen generiertes Token. Dieses Token geben Sie in der Konfiguration des Gotify-WS-Adapters ein. Gotify-WS benötigt außerdem die IP-Adresse bzw. Domain und den Port des Gotify-Servers.

Dadurch wird eine Verbindung hergestellt und der Adapter kann alle eingehenden Nachrichten vom Gotify-Server empfangen.

Anschließend können Sie einen Benachrichtigungsdienst Ihrer Wahl für die Weiterleitung konfigurieren.

---

## Changelog

<!-- ### **WORK IN PROGRESS** -->
### **WORK IN PROGRESS**
* (simatec) dependencies updated

### 0.3.0 (2026-08-22)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) small Bugfixes
* (simatec) Translations added
* (simatec) Convert Translations

### 0.2.5 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated

### 0.2.4 (2025-11-23)
* (simatec) dependencies updated
* (simatec) Fix npm publish

### 0.2.3 (2025-08-31)
* (simatec) dependencies updated

### 0.2.2 (2025-07-20)
* (simatec) dependencies updated

[Older changelogs can be found there](https://github.com/simatec/ioBroker.gotify-ws/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024 - 2026 simatec

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