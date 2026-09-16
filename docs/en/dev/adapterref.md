---
title: Adapter reference
lastChanged: 09.09.2026
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterref.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: /LFgrdnFTn7e8n33qcFGYQJRExpOQdLWjYXPTSDl9Ig=
---
# Adapter reference
Reference work for the programming interface of an adapter: the class from `@iobroker/adapter-core`, its properties, its events and the calls with which it reads and writes objects and states.

This page assumes that a framework already exists. The entry point is under [overview](/docs/dev/adapterdev.md), the file `io-package.json` under [io-package.json](/docs/dev/iopackage.md), and the structure of the objects themselves under [core concept](/docs/dev/objectsschema.md).

## Objects and States
An adapter is a separate process. It never communicates directly with the database, but always via this interface; whether the data is located in `jsonl` files or in Redis is irrelevant to the code.

There are two types of data:

* **Objects** describe what a data point is: name, type, unit, role,

Read and write permissions. They rarely change.

* **States** are the corresponding values, along with timestamps,

Confirmation flag and origin. They change constantly.

Every state has an associated object. The reverse is not true: objects also describe hosts, adapters, instances, categories, users, and the organization into devices and channels.

Each identifier consists of parts separated by `.`. Objects of an instance always begin with `<adaptername>.<instanz>`:

```
hm-rpc.0.IEQ1234567              device
hm-rpc.0.IEQ1234567.0            channel
hm-rpc.0.IEQ1234567.0.STATE      state
```

The identifier of a state begins with the identifier of its channel, and the identifier of the channel begins with that of the device. If the adapter is simple in design, devices and channels can be omitted.

For each instance, the JS controller creates the following: `alive`, `connected`, `uptime`, and the three memory states under `system.adapter.<name>.<instanz>`.

These are omitted in the operating modes `none` and `once`.

## Basic framework
An adapter incorporates the common basis via `@iobroker/adapter-core` and derives its own class from `utils.Adapter`:

```js
'use strict';

const utils = require('@iobroker/adapter-core');

class MeinAdapter extends utils.Adapter {
    constructor(options) {
        super({ ...options, name: 'meinadapter' });

        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    async onReady() {
        await this.setState('info.connection', false, true);
        this.subscribeStates('*');
        // this.config.<feld> enthält die Konfiguration der Instanz
    }

    onStateChange(id, state) {
        if (!state || state.ack) {
            return; // nur Befehle interessieren
        }
        this.log.debug(`Befehl für ${id}: ${state.val}`);
    }

    onUnload(callback) {
        try {
            this.clearInterval(this.pollTimer);
            callback();
        } catch {
            callback();
        }
    }
}

if (require.main !== module) {
    module.exports = options => new MeinAdapter(options);
} else {
    new MeinAdapter();
}
```

All calls are therefore available as methods of the class itself: `this.setState(...)`, `this.getStateAsync(...)`, `this.log.info(...)`.

The name in the `super` call must exactly match the directory name and the field `common.name` in `io-package.json`.

In adapters from before 2019, `require('./lib/utils')` and `utils.adapter('name')` are used instead, with handlers as options. This approach is no longer maintained; the file `lib/utils.js` should no longer be included in a new package.

## Properties of the adapter class
| Property | Content |
|---|---|
| `this.name` | Name of the adapter, e.g. B. `meinadapter` |
| `this.namespace` | `<name>.<instanz>`, the prefix of all custom identifiers |
| `this.config` | the `native` part of the instance configuration, i.e., the values from the configuration dialog |
| `this.common` | the `common` part of the instance configuration |
| `this.host` | Host on which the instance is running |
| `this.adapterDir` | Directory of the installed adapter |
| `this.ioPack` / `this.pack` | Content of `io-package.json` or `package.json` |
| `this.log` | Logger, see below |
| `this.connected` | Connection to the database |
| `this.constants` | Constants of the js-controller, e.g. `STATE_QUALITY` |
| `this.constants` | Constants of the js controller, e.g. E.g. `STATE_QUALITY` |

Two properties are only available on demand in the constructor: `systemConfig: true` fills `this.systemConfig` with the content of `iobroker-data/iobroker.json`, `useFormatDate: true` fills `this.dateFormat`, `this.language`, `this.isFloatComma`, `this.longitude` and `this.latitude` from `system.config`.

`this.config` contains exactly what is in `native` in `io-package.json`, supplemented by the user's input. Everything else is read using `getForeignObjectAsync`.

## Logging
```js
this.log.silly('sehr ausführlich');
this.log.debug('Details für die Fehlersuche');
this.log.info('normale Meldung');
this.log.warn('Warnung');
this.log.error('Fehler');
```

The origin and time are added automatically by the js-controller. `console.log` is only visible if the adapter was started manually in the console.

The level of detail required for logging is specified in [Recommendations](/docs/dev/bestpractices.md).

## Events
| Event | Triggered |
|---|---|
| `ready` | when the configuration is loaded. **Only here** may initialization be performed. |
| `objectChange(id, obj)` | A subscribed object has changed. `obj` becomes `null` when it is deleted. |
| `fileChange(id, fileName, size)` | A subscribed file has changed |
| `message(obj)` | A message has been received, see [News](/docs/dev/messagebox.md) |
| `unload(callback)` | The instance is being terminated. Timer closing, connections disconnecting, then `callback()` |
| `install` | once only during installation (starts with `--install`) |
| `log(message)` | Log messages from all instances, only with `logTransporter` |
| `log(message)` | Log messages from all instances, only with `logTransporter` |

## Subscribe to states
Events only appear for subscribed patterns:

```js
this.subscribeStates('*');                       // alles der eigenen Instanz
this.subscribeStates('memory*');                 // nur passende eigene Zustände
this.subscribeForeignStates('yr.*.forecast.*');  // Zustände anderer Instanzen
```

There are also `subscribeObjects`, `subscribeForeignObjects`, `subscribeForeignFiles` and one `unsubscribe…` each.

A subscription does not provide an initial value, only changes. The initial value can be found in `onReady`.

## Reading states
```js
const state = await this.getStateAsync('myState');
this.log.info(`${state.val}, bestätigt: ${state.ack}, Zeit: ${state.ts}`);

const fremd = await this.getForeignStateAsync('hm-rpc.0.IEQ123.1.STATE');
```

`getStatesAsync('muster*')` returns multiple entries at once, `getForeignStatesAsync` returns the same entry across instance boundaries. Placeholders only appear in the plural forms.

## Write states
The flag `ack` distinguishes between command and feedback, and this distinction underpins the entire system:

* `ack: false` is a **command**. It comes from the user, from VIS, from a

Script, and it means: do that.

* `ack: true` is a **response**. It comes from the device or the service and

Meaning: this is how it is now.

```js
await this.setState('myState', { val: 21.5, ack: true });  // Rückmeldung
await this.setState('myState', 21.5, true);                // dasselbe, kurz
await this.setForeignState('hm-rpc.0.kitchen.light', true); // Befehl an andere
```

Without a callback, `setState` returns a promise; the old form `setStateAsync` is obsolete. `setStateChanged` only writes if the value has actually changed.

The process, using a lamp as an example: VIS writes `{val: true, ack: false}`.

The adapter has subscribed to its own states, recognizes a command in the missing `ack`, and switches the device. The device sends back a response, and the adapter writes `{val: true, ack: true}`. It does not execute this second change again.

The user's own `stateChange` handler also sees its own write operations. Without checking `state.ack`, an infinite loop will occur.

## Establishing a State
| Field | Meaning |
|---|---|
| `val` | the value |
| `ts` | Timestamp in milliseconds since 1970 |
| `lc` | Timestamp of the last *value* change. Remains if the same value is written again. |
| `from` | Instance that wrote, e.g. `system.adapter.web.0` |
| `q` | Quality, see `this.constants.STATE_QUALITY` |
| `expire` | optional, seconds until the value drops to `null` |
| `user` | optional, user on whose behalf the writing was done |
| `user` | optional, user on whose behalf the message was written |

The js-controller itself uses `expire` for `alive`: If an instance does not respond for 30 seconds, it is considered stopped.

## Reading and writing objects
```js
const obj = await this.getObjectAsync('myState');
const fremd = await this.getForeignObjectAsync('system.adapter.web.0');

await this.setObjectNotExistsAsync('temperatur', {
    type: 'state',
    common: {
        name: 'Temperatur',
        type: 'number',
        role: 'value.temperature',
        unit: '°C',
        read: true,
        write: false
    },
    native: {}
});

await this.extendObject('temperatur', { common: { unit: 'K' } });
await this.delObject('temperatur');
```

* `setObject` writes completely and overwrites what was there.
* `setObjectNotExists` only creates an object if nothing already exists. This is the

This is the normal case at startup because user-defined changes are retained.

* `extendObject` reads, combines, and writes back. The path for

Subsequent corrections.

* All forms without `Foreign` add `this.namespace` to the identifier itself.

For entire trees there are `getAdapterObjectsAsync`, `getForeignObjectsAsync`, `getDevicesAsync`, `getChannelsOfAsync` and `getStatesOfAsync`.

!> `createDevice`, `createChannel`, `createState` and the associated `delete…` calls are discontinued. They are replaced by `extendObject` and `delObject` with the full identifier.

The fields an object must have and the roles that exist are listed under [core concept](/docs/dev/objectsschema.md) and [State roles](/docs/dev/stateroles.md).

## Object views
For recurring queries, an adapter can store its own view in `io-package.json` and query it with `getObjectView`:

```js
const doc = await this.getObjectViewAsync('hm-rpc', 'listDevices', {
    startkey: `hm-rpc.${this.instance}.`,
    endkey: `hm-rpc.${this.instance}.\u9999`
});
doc.rows.forEach(row => this.log.info(`${row.id}`));
```

Views are rarely needed. For most adapters, `getForeignObjectsAsync` with a pattern is sufficient.

## Info.connection
An adapter that maintains a connection to a device or service creates and maintains the state `info.connection`. The administrator then displays on the instance's tile whether the connection is active.

```js
await this.setState('info.connection', true, true);
```

The easiest way is to create the state in `instanceObjects` of `io-package.json`, then it will be created automatically with each new instance.

## Timer and Exit
Always create timers via the adapter class. They will then be cleared when the timer terminates and will not appear as open handles.

```js
this.pollTimer = this.setInterval(() => this.poll(), 60_000);
this.retry = this.setTimeout(() => this.connect(), 5_000);
await this.delay(500);
```

This includes `clearInterval` and `clearTimeout` of the same class. The `unload` handler performs cleanup and then calls `callback()`. Without this, the JavaScript controller terminates the instance abruptly after a waiting period.

`this.terminate('Grund')` terminates the instance in an orderly manner, `this.restart()` restarts it.

## More views
**Messages**: `sendTo`, `sendToHost`, `sendToUI`; see [News](/docs/dev/messagebox.md).

**Notifications**: `registerNotification`; see [Notifications](/docs/dev/notifications.md).

**Files**: `readFileAsync`, `writeFileAsync`, `readDirAsync`, `mkdirAsync`, `unlinkAsync`, `renameAsync`, `fileExistsAsync`, `chmodFileAsync`, `chownFileAsync`; see [File storage](/docs/dev/filestorage.md).

**Configuration and Secrets**: `updateConfig`, `getEncryptedConfig`, `encrypt`, `decrypt`, `getCertificatesAsync`, `getSuitableLicenses`; see [Security](/docs/dev/adaptersecurity.md).

**Users and Rights**: `checkPasswordAsync`, `setPasswordAsync`, `checkGroupAsync`, `calculatePermissionsAsync`, `getUserID`.

**History**: `getHistoryAsync` reads values from the configured history adapter (History, SQL, InfluxDB).

**Categories**: `getEnumAsync`, `getEnumsAsync`, `addStateToEnumAsync`, `deleteStateFromEnumAsync`.

**System**: `getPortAsync` searches for a free port, `supportsFeature` queries the capabilities of the running js-controller, `getPluginInstance` and `getPluginConfig` reach plugins like Sentry, `formatDate` and `formatValue` format according to the system settings.

For almost every call with a callback, there is a form with the suffix `Async` that returns a promise. For write calls to objects and states, it's the other way around: the basic form without a callback already returns a promise, and the `Async` form is deprecated.

## Starting flags
The JS controller starts the adapter as a separate process and passes it the instance number and protocol level. `adapter-core` handles this. Three additional flags are useful to set manually:

* `--install`: starts the adapter even without configuration, for the

Installation process.

* `--force`: starts it even if the instance is disabled.
* `--logs`: additionally writes the log messages to the console.

## Further information
* [Overview](/docs/dev/adapterdev.md): the path from empty folder to adapter
* [io-package.json](/docs/dev/iopackage.md): Operating mode, dependencies,

Configuration values, `instanceObjects`

* [Core concept](/docs/dev/objectsschema.md): complete schema of objects
* [JSON-Config](/docs/dev/adapterjsonconfig.md): Configuration dialog
* [dev-server](/docs/dev/devserver.md) and

[Debugging](/docs/dev/adapterdebug.md): try it out and find the error

* [Recommendations](/docs/dev/bestpractices.md): what makes a good adapter
* [Publish](/docs/dev/adapterpublish.md): the path to the repository