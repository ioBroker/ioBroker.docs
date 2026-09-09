---
title: Notifications
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/notifications.md
hash: vpjgjn3mXTMgioRUxgu3jlCkBCv8cCENHzGvb3Z3m2E=
---
# Notifications

An adapter detects things the user should know: the certificate is expiring, the login to the service was rejected, the target server's hard drive is full. This information shouldn't be logged where no one can see it, nor should it be stored in a state that no one has subscribed to.

That's what the js-controller's notification system is for. It collects such messages, displays them in the admin panel, and makes them available to adapters that forward them.

## How the user sees them

In the admin tab **Hosts**The host displays a symbol indicating the number of open messages. Clicking this button opens the dialog. _Host-specific notification&#x73;_&#x4F;ne tab per category, containing messages grouped by instance, each with a timestamp. One button. **Confirm** sweeps the category.

The system itself already recognizes a whole range of categories, all within the area
_System notifications_: insufficient memory, insufficient disk space, file system errors, instances stuck in a restart loop, failed automatic updates and much more.

The adapter [notification manager](/adapters/notification-manager) It forwards these messages, for example via Telegram or email. This turns the dialogue you have to view into a message that reaches you.

## Register your own categories

An adapter that wants to generate its own messages describes its categories in the `io-package.json` under `notifications`The structure is two-stage: one
**Area** (_scope_) with several **Categories**.

```json
"notifications": [
  {
    "scope": "meinAdapter",
    "name": {
      "en": "My adapter",
      "de": "Mein Adapter"
    },
    "description": {
      "en": "Notifications of my adapter",
      "de": "Meldungen meines Adapters"
    },
    "categories": [
      {
        "category": "loginFailed",
        "name": {
          "en": "Login rejected",
          "de": "Anmeldung abgelehnt"
        },
        "description": {
          "en": "The service rejected the stored credentials.",
          "de": "Der Dienst hat die hinterlegten Zugangsdaten abgelehnt."
        },
        "severity": "alert",
        "regex": [],
        "limit": 3
      }
    ]
  }
]
```

The fields of a category:

| Field         | Meaning                                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `category`    | The identifier used to send the message later.                                                                                                                           |
| `name`        | The name, multilingual. Appears as a tab label in the dialogue.                                                                                                          |
| `description` | The meaning of the category is explained in multiple languages. This explanation appears above the news items.                                                           |
| `severity`    | `info`, `notify` or `alert`, in ascending order.                                                                                                                         |
| `regex`       | Patterns against which error outputs are checked. If one matches, the message is generated automatically. An empty array if the message originates solely from the code. |
| `limit`       | How many messages of this category can be stored at most.                                                                                                                |

Regarding the choice of level: `alert` It's intended for things that someone needs to take care of so that the system can continue to work. `notify` For things you should know. `info` For everything else. Whoever wants to `alert` This explanation only achieves the result that the user will eventually clear the dialog unread.

## Submit a report

At runtime, a single call is sufficient:

```js
await this.registerNotification('meinAdapter', 'loginFailed',
    'Die Anmeldung wurde abgelehnt. Bitte Zugangsdaten prüfen.');
```

The three pieces of information are the area, the category, and the text for the user. The text should explain what to do, not just what went wrong.

This is categorized `null` Upon submission, the system checks the message against the
`regex`-pattern of the area and sorts them himself.

A fourth parameter can provide additional information (`contextData`), which can evaluate forwarding adapters.

## What belongs in a notification and what doesn't

A notification is not a second log entry. It remains until someone acknowledges it, and it appears for everyone who has configured the forwarder. Anything that can occur during each iteration belongs in the log.

Useful messages are those that require user action and which the user would otherwise not notice: expired login data, a device that no longer responds permanently, a configuration that is no longer valid since an update.

Temporary interruptions are not useful. A connection that re-establishes itself after ten seconds should be logged.
`info.connection`, not in the notification dialog.

## Demarcation

There are three ways in which an adapter can communicate, and they are often confused:

| Away              | For what                                                                       |
| ----------------- | ------------------------------------------------------------------------------ |
| **log**           | The history. For troubleshooting purposes, not for the user.                   |
| **Conditions**    | The current status, approximately `info.connection`. Continuously overwritten. |
| **Notifications** | Individual events that require action and remain pending confirmation.         |

Crash reports are something else entirely: they go to the developer, not the user. See
[Crash reports](/docs/ecosystem/sentry.md).