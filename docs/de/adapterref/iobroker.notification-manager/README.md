---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.notification-manager/README.md
title: ioBroker.notification-manager
hash: nuVZ03xa2X4kRvBRhNsVG7snbnNz28FjCAwXj+iqvgM=
---
![Logo](../../../en/adapterref/iobroker.notification-manager/admin/notification-manager.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.notification-manager.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.notification-manager.svg)
![Anzahl der Installationen](https://iobroker.live/badges/notification-manager-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/notification-manager-stable.svg)
![NPM](https://nodei.co/npm/iobroker.notification-manager.png?downloads=true)

# IoBroker.notification-manager
**Tests:** ![Test und Freigabe](https://github.com/foxriver76/ioBroker.notification-manager/workflows/Test%20and%20Release/badge.svg)

## Notification-Manager-Adapter für ioBroker
Verwalten Sie ioBroker-Benachrichtigungen, z. indem Sie sie als Nachrichten senden

### Allgemeine Beschreibung
Dieser Adapter ermöglicht die Umleitung der ioBroker-internen `Notifications` auf Messenger-Adapter, die die `Notification System` unterstützen. Sollte Ihnen ein Adapter fehlen, eröffnen Sie bitte ein Ticket für den entsprechenden Adapter.

### Registrieren benutzerzentrierter Benachrichtigungen
Als Benutzer wissen Sie im besten Fall, wann Sie über bestimmte Situationen in Ihrem System benachrichtigt werden möchten.
Somit bietet Ihnen `notification-manager` eine Schnittstelle zum Registrieren Ihrer eigenen Benachrichtigungen im ioBroker-Benachrichtigungssystem. Es werden drei Kategorien unterstützt, eine für jeden Schweregrad `notify`, `info` und `alert`.

Die Benachrichtigungen können über `sendTo` registriert werden

```ts
(async () => {
    try {
        await sendToAsync('notification-manager.0', 'registerUserNotification', { category: 'notify', message: 'Your delivery has arrived' });
    } catch (e) {
        log(`Could not register notification: ${e}`, 'error');
    }
})();
```

### Anforderungen für Messaging-Adapter
Bitte setzen Sie in Ihren `io-package.json` das Flag `common.supportedMessages.notifications` auf `true`.

Immer wenn eine neue Benachrichtigung über den Messaging-Adapter zugestellt werden soll, sendet `notification-manager` eine Nachricht an die konfigurierte Instanz.

Die Nachrichten bestehen aus dem Befehl `sendNotification` und einer Nachricht mit folgendem Aufbau:

```json
{
  "host": "system.host.moritz-ThinkPad-P16-Gen-1",
  "scope": {
    "name": "System-Benachrichtigungen",
    "description": "Diese Benachrichtigungen werden vom ioBroker-System erfasst und weisen auf Probleme hin, die überprüft und behoben werden sollten."
  },
  "category": {
    "instances": {
      "system.adapter.backitup.0": {
        "messages": [
          {
            "message": "Restart loop detected",
            "ts": 1684074961226
          }
        ]
      },
      "system.adapter.notification-manager.0": {
        "messages": [
          {
            "message": "Restart loop detected",
            "ts": 1684075183094
          }
        ]
      }
    },
    "description": "Eine Adapterinstanz stürzt beim Start häufig ab und wurde aus diesem Grund gestoppt. Die Protokolldatei muss vor dem Neustart der Instanz überprüft werden.",
    "name": "Probleme mit häufig abstürzenden Adapterinstanzen",
    "severity": "alert"
  }
}
```

Dabei zeigt `category.instances` die betroffenen Adapterinstanzen für diese Benachrichtigung an.
Darüber hinaus verfügt die Kategorie über eine i18n-Beschreibung und einen i18n-Namen.
Für den Bereich der Kategorie gelten dieselben Eigenschaften. Zusätzlich ist der betroffene Host enthalten.

Nach dem Absenden der Benachrichtigung erwartet der `notification-manager` eine Antwort mit der Eigenschaft `{ sent: true }`, sofern der Messaging-Adapter die Benachrichtigung zustellen konnte, andernfalls sollte er mit `{ sent: false }` antworten.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2023-12-08)
* (foxriver76) added possibility to send custom messages
* (foxriver76) added UI indicators for each category

### 0.1.2 (2023-10-11)
* (foxriver76) also show notifications provided by adapters in the configuration

### 0.1.1 (2023-07-04)
* (foxriver76) added possibility to send test messages from web interface (closes #1)

### 0.1.0 (2023-06-02)
* (foxriver76) initial release

## License
MIT License

Copyright (c) 2023 foxriver76 <moritz.heusinger@gmail.com>

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

Icon made by "Good Ware" from www.flaticon.com