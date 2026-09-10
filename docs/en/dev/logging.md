---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/logging.md
title: Log transporter
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: iQqHtHbQFm1U21wjaYXN8nGmKn6UI5Py2nmcavlq+Fs=
---
# Log transporter

Normally, each adapter writes its messages via`this.log` The message is written to the log file, and that's it. However, some adapters need the messages themselves: the administrator displays them in the **logs** , others write them to a database, or forward them. This is where the log transporter comes in.

For your own logging purposes, this is sufficient.`this.log.info(...)` This page describes the special case where one adapter wants to read the messages **of all others** .

## Turn on

In the`io-package.json` in the block`common` :

```json
"logTransporter": true
```

Only then is the method available`requireLog` It is not available at all. It is enabled in the adapter code and the event`log` subscribed:

```js
async onReady() {
    await this.requireLog(true);
}

onLog(logObject) {
    // logObject.severity, .message, .from, .ts, ._id
}
```

The handler is bound in the constructor like the others:

```js
this.on('log', this.onLog.bind(this));
```

## Structure of a message

| Field      | Contents                                                       |
| ---------- | -------------------------------------------------------------- |
| `_id`      | sequential identifier of the message                           |
| `from`     | instance from which it originates, e.g. `system.adapter.web.0` |
| `severity` | Protocol level:`silly` ,`debug` ,`info` ,`warn` , `error`      |
| `ts`       | Timestamp in milliseconds                                      |
| `message`  | the text                                                       |

Example:

```js
{ _id: 4711, from: 'testlog.0', message: 'testlog.0 (12504) adapter disabled',
  severity: 'error', ts: 1585413238439 }
```

## What's happening in the background

Does an adapter carry the feature`logTransporter` , the js-controller sets the state for each instance`system.adapter.<name>.<instanz>.logging` on. Does the adapter place it over`requireLog(true)` on`true` , thereby announcing: I want the reports.

All other instances observe the conditions.`*.logging` As soon as one of them lands`true` If the message is in a FIFO queue, it will also be written to that recipient. The recipient reads it and receives it as an event.`log` delivered.

!>`requireLog(false)` It doesn't work immediately. The other instances only stop delivering after about ten seconds.

## What's the point of that?

- This allows the **administrator** to view the logs live without reading the file.
- Adapters like`sql` or`telegram` This allows them to forward error messages.
- An adapter that only wants to handle its own messages doesn't need that: it simply writes the data itself during the logging process.

If you want to reach the user about a specific event, instead of reading every message, you are better off using [notifications](/docs/dev/notifications.md) .