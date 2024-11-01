---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.notification-manager/README.md
title: ioBroker.Benachrichtigungs-Manager
hash: 6DCRrUYRYkWX5WRD5rVWvyOwZ0X6vqzzshhOrNp6tTc=
---
![Logo](../../../en/adapterref/iobroker.notification-manager/admin/notification-manager.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.notification-manager.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.notification-manager.svg)
![Anzahl der Installationen](https://iobroker.live/badges/notification-manager-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/notification-manager-stable.svg)
![NPM](https://nodei.co/npm/iobroker.notification-manager.png?downloads=true)

# IoBroker.Benachrichtigungsmanager
**Tests:** ![Testen und Freigeben](https://github.com/foxriver76/ioBroker.notification-manager/workflows/Test%20and%20Release/badge.svg)

## Benachrichtigungsmanager-Adapter für ioBroker
Verwalten Sie ioBroker-Benachrichtigungen, z. B. indem Sie sie als Nachrichten senden

### Allgemeine Beschreibung
Dieser Adapter ermöglicht die Umleitung des ioBroker-internen `Notifications` auf Messenger-Adapter, die `Notification System` unterstützen. Falls Sie einen Adapter vermissen, eröffnen Sie bitte ein Ticket für den entsprechenden Adapter.

### Konfiguration
Für jedes `category` können Sie konfigurieren, ob das `category` aktiv sein soll. Wenn die Kategorie nicht aktiv ist, wird das `notification-manager` für dieses spezifische `category` nichts ausführen.

Zusätzlich können Sie konfigurieren, ob die `notification-manager` bestimmte `categories` unterdrücken sollen. Wird eine `notification` für eine unterdrückte `category` eingetragen, löscht der Adapter diese `notification` sofort, ohne Ihnen eine Meldung zu senden.

Schließlich können Sie unterstützte Messaging-Adapter konfigurieren. Immer wenn ein neuer `notification` für einen `active` (und `non-suppressed`) `category` generiert wird, sendet der Adapter den `notification` über den ersten konfigurierten Adapter. Wenn das Senden der Nachricht erfolgreich war, löscht der `notification-manager` den `notification`. Wenn das Senden nicht erfolgreich war, wird es mit dem zweiten Adapter erneut versucht.

Wenn eine Kategorie `active` ist, aber noch keine spezifischen Einstellungen konfiguriert hat, verwendet der Adapter die konfigurierten Fallback-Einstellungen. Neue Kategorien sind standardmäßig immer `active`, um sicherzustellen, dass Sie benachrichtigt werden. Das bedeutet, dass immer, wenn ein Adapter eine neue `category` implementiert, die Fallback-Einstellungen für die angegebene `severity` angewendet werden.

Sie können außerdem nur `suppress` als Kategorie definieren. `notification-manager` bestätigt dann lediglich die Benachrichtigung, so dass diese nicht in Ihrem System erscheint.

Seit Version 7 des js-controllers haben Adapter die Möglichkeit, Benachrichtigungen zusätzliche `contextData` hinzuzufügen. Dies wird beispielsweise verwendet, um bestimmte Aktionen für den Benutzer in der Admin-GUI anzuzeigen. Standardmäßig sendet Ihnen `notification-manager` diese Benachrichtigungen und löscht sie __NICHT__, sodass diese für spätere Benutzerinteraktionen erhalten bleiben. Wenn Sie jedoch entscheiden, dass Sie solche Interaktionen für bestimmte `category` nicht benötigen, können Sie sie über das Kontrollkästchen deaktivieren.

### Benutzerzentrierte Benachrichtigungen registrieren
Als Benutzer wissen Sie im besten Fall, wann Sie über bestimmte Situationen in Ihrem System benachrichtigt werden möchten.

Daher bietet Ihnen `notification-manager` eine Schnittstelle, um Ihre eigenen Benachrichtigungen im ioBroker-Benachrichtigungssystem zu registrieren. Es werden drei Kategorien unterstützt, eine für jeden Schweregrad `notify`, `info` und `alert`.

Die Benachrichtigungen können über `sendTo` registriert werden.

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
Bitte setzen Sie in Ihrem `io-package.json` das Flag `common.supportedMessages.notifications` auf `true`.

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
Zusätzlich verfügt die Kategorie über eine i18n-Beschreibung und einen i18n-Namen.
Die gleichen Eigenschaften gelten für den Umfang der Kategorie. Zusätzlich ist der betroffene Host enthalten.

Nach dem Senden der Benachrichtigung erwartet der `notification-manager` eine Antwort mit der Eigenschaft `{ sent: true }`, wenn der Messaging-Adapter die Benachrichtigung zustellen konnte, andernfalls sollte er mit `{ sent: false }` antworten.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2024-10-10)
* (@foxriver76) by default we do not delete notifications with `contextData`
* (@foxriver76) added checkbox to also delete notifications with `contextData` for specific categories

### 1.2.1 (2024-08-29)
* (@foxriver76) fixed issue if host name contains `.`

### 1.2.0 (2024-08-05)
* (@klein0r) Added Blockly blocks

### 1.1.2 (2024-05-02)
* (foxriver76) made logging a bit more silent

### 1.1.1 (2024-03-16)
* (foxriver76) added possibility to suppress messages
* (foxriver76) fixed issue that bottom of settings page is shown behind toolbar
* (foxriver76) fixed issue that all notifications are cleared instead of only the handled one

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

Copyright (c) 2024 foxriver76 <moritz.heusinger@gmail.com>

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