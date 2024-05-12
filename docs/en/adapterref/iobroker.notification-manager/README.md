![Logo](admin/notification-manager.png)
# ioBroker.notification-manager

[![NPM version](https://img.shields.io/npm/v/iobroker.notification-manager.svg)](https://www.npmjs.com/package/iobroker.notification-manager)
[![Downloads](https://img.shields.io/npm/dm/iobroker.notification-manager.svg)](https://www.npmjs.com/package/iobroker.notification-manager)
![Number of Installations](https://iobroker.live/badges/notification-manager-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/notification-manager-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.notification-manager.png?downloads=true)](https://nodei.co/npm/iobroker.notification-manager/)

**Tests:** ![Test and Release](https://github.com/foxriver76/ioBroker.notification-manager/workflows/Test%20and%20Release/badge.svg)

## notification-manager adapter for ioBroker
Manage ioBroker notifications, e.g. by sending them as messages

### General description
This adapter allows to redirect the ioBroker internal `Notifications` to messenger adapters which support 
the `Notification System`. If you are missing an adapter, please open a ticket on the corresponding adapter.

### Configuration
For each `category` you are able to configure if the `category` should be active. If the category is not active,
the `notification-manager` will not handle anything for this specific `category`. 

Additionally, you can configure 
if the `notification-manager` should suppress certain `categories`. If a `notification` for a suppressed 
`category` is registered, the adapter will immediately clear this `notification` without sending you any messages.

Finally, you can configure supported messaging adapters. Whenever a new `notification` for an `active` (and `non-suppressed`) 
`category` is generated, the adapter will send the `notification` via the first configured adapter. If sending the message was
successful, the `notification-manager` will clear the `notification`. IF sending was not successful it will re-try with the second adapter.

Whenever a category is `active` but has not configured any specific settings yet, then the adapter will use the configured 
fallback settings. New categories are always `active` by default to ensure you will be notified. This means whenever a new `category`
is implemented by some adapter, the fallback settings for the given `severity` will be applied.

### Registering user-centric notifications
As a user you at best know, when you want to be notified about specific situations in your system. 
Thus, the `notification-manager` provides you with an interface to register your own notifications inside
the ioBroker notification system. Three categories are supported, one for each severity level `notify`, `info` and `alert`.

The notifications can be registered via `sendTo` 

```ts
(async () => {
    try {
        await sendToAsync('notification-manager.0', 'registerUserNotification', { category: 'notify', message: 'Your delivery has arrived' });
    } catch (e) {
        log(`Could not register notification: ${e}`, 'error');
    }
})();
```

### Requirements for messaging adapters
Please set the `common.supportedMessages.notifications` flag to `true` in your `io-package.json`.

Whenever a new notification should be delivered via the messaging adapter, `notification-manager` will send a message
to the configured instance. 

The messages consist of the command `sendNotification` and a message with the following structure: 

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

Where `category.instances` shows the affected adapter instances for this notification. 
Additionally, the category has an i18n description and an i18n name. 
The same properties exist for the scope of the category. Additionally, the affected host is included.

After sending the notification, the `notification-manager` expects an answer with the property `{ sent: true }` 
if the messaging adapter was able to deliver the notification, else it should respond with `{ sent: false }`.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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