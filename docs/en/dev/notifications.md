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
In the admin panel, under the **Hosts** tab, each host is marked with an icon indicating the number of open notifications. Clicking this icon opens the *Host-Specific Notifications* dialog: one tab per category, containing notifications grouped by instance, each with a timestamp. A **Confirm** button clears the notifications for the category.

The system itself already recognizes a whole range of categories, all in the area of *System notifications*: insufficient memory, insufficient disk space, file system errors, instances stuck in a restart loop, failed automatic updates and much more.

The adapter [notification manager](/adapters/notification-manager) forwards these messages, for example via Telegram or email. This turns the dialog box, which you have to view, into a message that you receive.

## Register your own categories
An adapter that wants to generate its own messages describes its categories in `io-package.json` under `notifications`. The structure is two-tiered: a **scope** with several **categories**.

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

| Field | Meaning |
| ---- | --------- |
| `category` | The identifier with which the message will later be sent. |
| `description` | What the category means, in multiple languages. Explanations are provided above the messages. |
| `severity` | `info`, `notify` or `alert`, in ascending order. |
| `regex` | Patterns against which error outputs are checked. If one matches, the message is generated automatically. Empty array if the message only comes from the code. |
| `limit` | Maximum number of messages of this category that can be stored. |
| `limit` | Maximum number of messages of this category that can be stored. |

Regarding the level selection: `alert` is for things that someone needs to take care of so that the system can continue to function. `notify` is for things that one should know. `info` is for everything else. Declaring everything `alert` will only result in the user eventually dismissing the dialog without reading it.

## Submit a message
At runtime, a single call is sufficient:

```js
await this.registerNotification('meinAdapter', 'loginFailed',
    'Die Anmeldung wurde abgelehnt. Bitte Zugangsdaten prüfen.');
```

The three pieces of information are the area, the category, and the text for the user.

The text should explain what to do, not just what went wrong.

If the category `null` is passed, the system checks the message against the `regex` patterns of the area and sorts it itself.

A fourth parameter can provide additional information (`contextData`) that forwarding adapters can evaluate.

## What belongs in a notification and what doesn't
A notification is not a second log entry. It remains until someone acknowledges it, and it appears for everyone who has configured the forwarder. Anything that can occur during each iteration belongs in the log.

Useful messages are those that require user action and which the user would otherwise not notice: expired login data, a device that no longer responds permanently, a configuration that is no longer valid since an update.

Temporary disruptions are not useful. A connection that re-establishes itself after ten seconds belongs in the log and in `info.connection`, not in the notification dialog.

## Demarcation
There are three ways in which an adapter can communicate, and they are often confused:

| Way | For what |
| --- | ----- |
| **Log** | The history. For troubleshooting purposes, not for the user. |
| **States** | The current state, for example `info.connection`. Continuously overwritten. |
| **Notifications** | Individual events that require action and remain visible until confirmed. |

Crash reports are something else entirely: they go to the developer, not the user. See [Crash reports](/docs/ecosystem/sentry.md).