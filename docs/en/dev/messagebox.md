---
title: Messages between instances
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/messagebox.md
hash: +zgGmtlzaUsfe2Ce6YYvX8y1yYc6uaNNUbgSqWVXHMI=
---
# Messages between instances

States are values: they exist in the object tree, anyone can read them, and they remain. For many things, this is exactly right. For one **Order** It isn't.

"Send this message via Telegram" isn't a value that's stored somewhere. It's a one-time instruction, often with several details and sometimes with a reply. That's what the messaging system is for.
**Message box**.

## Requirement

An instance can only receive messages if its adapter announces this. In the `io-package.json`:

```json
"common": {
  "messagebox": true
}
```

This allows ioBroker to create the object for each instance.
`system.adapter.<name>.<nummer>.messagebox` If the entry is missing, each entry disappears. `sendTo` Without a trace. That's the most common reason why messages seemingly don't arrive.

## Send

```js
this.sendTo('telegram.0', 'send', { text: 'Waschmaschine fertig' });
```

The three pieces of information are always the same: an **who**, which **command**, which
**payload**The payload is arbitrary, usually one object.

If a response is desired, a fourth parameter is appended:

```js
this.sendTo('sql.0', 'getHistory', {
    id: 'javascript.0.Temperatur',
    options: { start: Date.now() - 3600000, aggregate: 'average' }
}, result => {
    this.log.info(`${result.result.length} Werte erhalten`);
});
```

The callback will be asynchronous. Those who don't want to wait indefinitely should specify a deadline:

```js
this.sendTo('sql.0', 'getHistory', payload, callback, { timeout: 5000 });
```

Without a deadline, the request will likely remain pending indefinitely if the other party does not respond.

From a script in the JavaScript adapter, the same call is simply called...
`sendTo(...)`, without `this`It's the same mechanism.

## Received

The message is displayed in the adapter. `onMessage` The object that arrives has four fields:

| Field      | Contents                                                 |
| ---------- | -------------------------------------------------------- |
| `command`  | The command, that is, the second argument of `sendTo`.   |
| `message`  | The payload.                                             |
| `from`     | Whoever sent, for example `system.adapter.javascript.0`. |
| `callback` | Only set if the sender expects a response.               |

```js
onMessage(obj) {
    if (!obj) {
        return;
    }

    switch (obj.command) {
        case 'send':
            this.sendMessage(obj.message);
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, { sent: true }, obj.callback);
            }
            break;

        default:
            this.log.warn(`Unbekannter Befehl: ${obj.command}`);
            if (obj.callback) {
                this.sendTo(obj.from, obj.command, { error: 'unknown command' }, obj.callback);
            }
            break;
    }
}
```

Two things about this are important.

**Always reply when `obj.callback` is set.** Even in case of an error. Otherwise, the sender is stuck within their deadline, and if they haven't set one, then indefinitely.

**`obj.from` and `obj.callback` Return unchanged.** The answer will find its way through these two pieces of information. Anyone who tries to piece them together themselves will send a message into the void.

## What can be done with it

**Orders to other adapters.** The classic case: notification adapters like `telegram`, `pushover` or `email` They only accept their orders in this way.

**Retrieving values from a database.** `getHistory` to `history`, `sql` or
`influxdb`The prerequisite is `common.getHistory: true` at the receiving adapter. See [Data recording](/docs/config/history.md).

**Consult your own configuration interface.** The configuration page in the admin area can `sendTo` Send the data to your own instance, for example to retrieve a list of detected devices or to validate an input. This is the clean way to do it when the validation requires knowledge that only the adapter code possesses.

The instance must be used for this. **run**A stopped instance has no message tray that anyone is managing. The configuration interface should detect this and display a clear message instead of running into a time limit.

## To the host instead of an instance

`sendToHost` This doesn't connect to an instance, but to the JS controller of a host. This allows you to retrieve system information and issue administrative commands, such as listing instances or reading log files. This is the method the administrator uses.

## right

Messages require a separate permission. This is listed in the user management section.
`sendTo` Among other rights, separate from read and write rights to objects. A user without this right cannot submit any requests, even if they otherwise have read rights. See
[Users and rights](/docs/config/userrights.md).