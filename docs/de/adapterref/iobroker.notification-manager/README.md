---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.notification-manager/README.md
title: ioBroker.notification-manager
hash: juWwDWaHWbQ/PNRGlpxY8jjLIMijvbh2jYBWCWfx0Ik=
---
![Logo](../../../en/adapterref/iobroker.notification-manager/admin/notification-manager.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.notification-manager.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.notification-manager.svg)
![Anzahl der Installationen](https://iobroker.live/badges/notification-manager-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/notification-manager-stable.svg)
![NPM](https://nodei.co/npm/iobroker.notification-manager.png?downloads=true)
![Test und Freigabe](https://github.com/foxriver76/ioBroker.notification-manager/workflows/Test%20and%20Release/badge.svg)

# ioBroker.notification-manager

## Benachrichtigungsmanager-Adapter für ioBroker

Verwalten Sie ioBroker-Benachrichtigungen, z. B. durch Versenden als Nachrichten.

### Allgemeine Beschreibung

Dieser Adapter ermöglicht die Umleitung des internen ioBroker-Verkehrs.`Notifications` zu Messenger-Adaptern, die Folgendes unterstützen`Notification System` Falls Ihnen ein Adapter fehlt, öffnen Sie bitte ein Ticket für den entsprechenden Adapter.

### Konfiguration

Für jeden`category` Sie können konfigurieren, ob die`category` Die Kategorie sollte aktiv sein. Wenn die Kategorie nicht aktiv ist,`notification-manager` wird für diesen speziellen Fall nichts bearbeiten`category` Die

Darüber hinaus können Sie konfigurieren, ob die`notification-manager` sollte bestimmte`categories` Wenn ein`notification` für einen unterdrückten`category` Wenn dies registriert ist, wird der Adapter dies sofort löschen.`notification` ohne Ihnen Nachrichten zu senden.

Abschließend können Sie die unterstützten Messaging-Adapter konfigurieren. Immer wenn ein neuer`notification` für ein`active` (Und`non-suppressed` )`category` wird ein Signal generiert, der Adapter sendet es.`notification` über den ersten konfigurierten Adapter. Wenn das Senden der Nachricht erfolgreich war,`notification-manager` wird die`notification` Falls das Senden nicht erfolgreich war, wird es mit dem zweiten Adapter erneut versucht.

Immer wenn eine Kategorie`active` Wenn aber noch keine spezifischen Einstellungen konfiguriert wurden, verwendet der Adapter die konfigurierten Ausweicheinstellungen. Neue Kategorien sind immer`active` Standardmäßig werden Sie benachrichtigt. Das bedeutet, dass Sie immer dann benachrichtigt werden, wenn ein neues Update veröffentlicht wird.`category` wird von einem Adapter implementiert, die Fallback-Einstellungen für das Gegebene`severity` wird angewendet.

Sie können weiter definieren, dass nur`suppress` eine Kategorie. Die`notification-manager` wird dann lediglich den Empfang der Benachrichtigung bestätigen, sodass diese nicht in Ihrem System angezeigt wird.

Seit js-controller Version 7 bieten Adapter die Möglichkeit, zusätzliche Funktionen hinzuzufügen.`contextData` zu Benachrichtigungen. Dies wird beispielsweise verwendet, um bestimmte Aktionen für den Benutzer in der Admin-GUI anzuzeigen. Standardmäßig ist die`notification-manager` Wir senden Ihnen diese Benachrichtigungen und löschen sie **nicht** , sodass sie für spätere Interaktionen erhalten bleiben. Sollten Sie jedoch entscheiden, dass Sie solche Interaktionen für bestimmte Zwecke nicht mehr benötigen, können Sie die Benachrichtigungen jederzeit löschen.`category` Sie können sie über das Kontrollkästchen deaktivieren.

### Registrierung nutzerzentrierter Benachrichtigungen

Als Nutzer wissen Sie am besten selbst, wann Sie über bestimmte Ereignisse in Ihrem System benachrichtigt werden möchten. Daher die`notification-manager` Bietet Ihnen eine Schnittstelle zur Registrierung Ihrer eigenen Benachrichtigungen im ioBroker-Benachrichtigungssystem. Es werden drei Kategorien unterstützt, eine für jede Schweregradstufe.`notify` ,`info` Und`alert` Die

Die Benachrichtigungen können registriert werden über`sendTo`

```ts
(async () => {
    try {
        await sendToAsync('notification-manager.0', 'registerUserNotification', { category: 'notify', message: 'Your delivery has arrived' });
    } catch (e) {
        log(`Could not register notification: ${e}`, 'error');
    }
})();
```

### Anforderungen an Messaging-Adapter

Bitte stellen Sie die`common.supportedMessages.notifications` Flagge an`true` in Ihrem`io-package.json` Die

Immer dann, wenn eine neue Benachrichtigung über den Messaging-Adapter zugestellt werden soll,`notification-manager` wird eine Nachricht an die konfigurierte Instanz senden.

Die Nachrichten bestehen aus dem Befehl`sendNotification` und eine Nachricht mit folgender Struktur:

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

Wo`category.instances` Zeigt die betroffenen Adapterinstanzen für diese Benachrichtigung an. Die Kategorie verfügt außerdem über eine i18n-Beschreibung und einen i18n-Namen. Dieselben Eigenschaften existieren für den Gültigkeitsbereich der Kategorie. Zusätzlich wird der betroffene Host aufgeführt.

Nach dem Versenden der Benachrichtigung`notification-manager` erwartet eine Antwort mit der Eigenschaft`{ sent: true }` Wenn der Messaging-Adapter die Benachrichtigung zustellen konnte, sollte er andernfalls mit folgendem antworten:`{ sent: false }` Die

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