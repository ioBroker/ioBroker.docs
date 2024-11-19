# ioBroker.canbus

![Logo](admin/canbus.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.canbus.svg)](https://www.npmjs.com/package/iobroker.canbus)
[![Downloads](https://img.shields.io/npm/dm/iobroker.canbus.svg)](https://www.npmjs.com/package/iobroker.canbus)
![Number of Installations (latest)](https://iobroker.live/badges/canbus-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/canbus-stable.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/canbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[![NPM](https://nodei.co/npm/iobroker.canbus.png?downloads=true)](https://nodei.co/npm/iobroker.canbus/)

**Tests:** ![Test and Release](https://github.com/crycode-de/ioBroker.canbus/workflows/Test%20and%20Release/badge.svg)

## CAN bus adapter for ioBroker

This adapter connects ioBroker to a Controller Area Network (CAN bus).

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Features

* Receive and send raw messages using standard frames and extended frames
* Each message may be configured for receiving and/or sending data
* Ability to automatically add objects for seen CAN messages which are not already configured
* Configure parsers for each message to read/write data from/to the raw message buffer
  * Numeric types
  * Booleans including bitmask support
  * Strings in different character encodings
  * Custom scripts to read/write from/to the buffer of raw data
* Advanced import/export feature
  * Import message configurations to extends your existing configuration
  * Import predefined "well known" configurations from GitHub within the admin interface
  * Export and import your message configurations as `json` or `csv` files
* Optional support for fixed data lengths (DLC)
* Optional support for the RTR flag
* Optional raw states containing raw CAN message objects
* Optional automatically set a certain value in a given interval for each parser (usefull for polling data)

## Requirements

* Linux operating system (because of the used socketcan library)
* CAN Hardware which is supported by the kernel and creates an interface like `can0`
* Some knowledge about the messages send on you CAN bus

## Parsers

Using parsers you are able to read data from or write data to the CAN message buffer.

There are predefined parsers for the following data types.  
Additionally you may write you own scripts to read/write values with a *custom parser*.

### Numeric types in *big-endian* and *little-endian* reperesentation

* Signed and unsigned 8, 16 and 32 bit integer
* 32 bit float
* 64 bit double

### Boolean

* 1 byte including bitmask support

### String

* 1 to 8 byte length
* Encoding: *ascii*, *base64*, *hex*, *latin1*, *utf8*, *utf16le*

### Custom

For a custom parser you have to provide you own read and write script.  
These scripts should be pure javascript and will run in a limited scope.

In the scripts you are able to use the following features:

* Globals `undefined`, `NaN`, `isNaN`, `Infinity`, `isFinite`, `atob`, `btoa`,
  `encodeURI`, `encodeURIComponent`, `decodeURI`, `decodeURIComponent`, `parseFloat`,
  `parseInt`, `JSON`, `Number`, `String`, `Array`, `BigInt`, `Blob`, `Boolean`,
  `Date`, `Map`, `Math`, `Object`, `RegExp`, `Set`, `Intl`, `Buffer`, `Promise`,
  `setTimeout`, `clearTimeout`
* `async`/`await`
* Adapter log functions `log.warn('something')`, `log.info('something')`, `log.debug('something')`
* `getStateAsync('id')`, `getObjectAsync('id')`, `setStateAsync('id', 'value', ack)` where `id` is the partial ID of the state/object below the current adapter instance
* `getForeignStateAsync('id')`, `getForeignObjectAsync('id')` and `setForeignStateAsync('id', 'value', ack)` where `id` is the full ID of the state/object
* Function `wait(ms)` which returns a Promise which resolves after the given time
* An object `sharedData` which is shared between all custom scripts of an adapter instance

Errors in the scripts will be logged by the adapter.

In both scripts the variables `buffer` and `value` are predefined.  
`buffer` always contains the current CAN message content as a Node.js Buffer.

The `sharedData` object is empty by default and may be used to share some data between multiple calls of a single custom parser or even between multiple custom parsers.

#### Custom read script

In a read script you have to read the `value` from the `buffer` variable.

At the beginning of the custom read script, `buffer` will be a copy of the received/current CAN message data (like in the `.json` state).
`value` will be `undefined` and should be set by the script.

The content of the `value` variable at the end of the custom read script will be used as new value for the state.  
If `value` is `undefined`, it will be ignored. Using this you are able to filter messages in the custom read script by data parts.

##### Example for a custom read script

Check the first three bytes in the received buffer to match fixed values.  
If matched, read an 16 bit signed integer value from the buffer bytes 3 and 4 and divide it by 10.

```js
if (buffer[0] === 0xC2 && buffer[1] === 0x10 && buffer[2] === 0x0F) {
  value = buffer.readInt16BE(3) / 10;
}
```

Cause of `value` is only set when the first three bytes matched, all other data will be ignored and won't set a new value to the state.

#### Custom write script

In a write script you have to modify (or replace) the `buffer` variable.

At the beginning of the custom write script, `buffer` will be a copy of the current CAN message data (like in the `.json` state).
`value` is set to the value of the state which should be written into the `buffer`.

The content of the `buffer` variable at the end of the custom write script will be used as new data for the CAN message.

You may also cancel the write by calling `return false;` in the custom write script.
This allows you to prevent writes if certain conditions are not met.

##### Example for a custom write script

Prepare a new buffer with fixed values.  
Write the state value into the buffer as a signed 16 bit integer, beginning at the fifth byte in the buffer.

```js
buffer = Buffer.from([0x30, 0x00, 0xFA, 0x06, 0x7E, 0x00, 0x00]);
buffer.writeInt16BE(value, 5);
```

The new `buffer` will then be set as the `.json` state.  
If the *autosend* option is enabled for the message, the message will be automatically send.

## Usage in scripts

You can handle/modify the `<messageId>.json` or `<messageId>.<parserId>` states in your scripts.

Additionally you may use the `raw.received` and `raw.send` states, if you have them enabled in the adapter config.  
They hold the stringified JSON data of the message data and can be used to handle each received or send message independent from the configured messages.
By writing JSON data to the `raw.send` state you are able to send CAN messages containing any data you like.

### Raw message object example

```js
{
  "id": 42,
  "ext": false,
  "data": [0, 13, 37, 255],
  "rtr": false
}
```

`ext` and `rtr` are optional and default to `false`.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.1.1 (2024-11-04)

* (crycode-de) Fixed get/set functions in custom parser scripts

### 2.1.0 (2024-11-03)

* (crycode-de) Allow `setStateAsync` and `setForeignStateAsync` in custom parser scripts
* (crycode-de) Allow `setTimeout` and `clearTimeout` in custom parser scripts (using the adapters setTimeout implementation)
* (crycode-de) Added `wait` function to custom parser scripts

### 2.0.0 (2024-11-02)

* (crycode-de) Node.js >= 18, Admin >= 6.17, js-contoller >= 5.0.19 are required
* (crycode-de) Changed how custom parser scripts are interpreted. Most custom parser scripts should work as before but they have a limited scope now.
* (crycode-de) Custom parser scripts now support `getStateAsync`, `getForeignStateAsync`, `getObjectAsync` and `getForeignObjectAsync`. If you have used `getStateAsync`/`getObjectAsync` before you need to change them to `getForeignStateAsync`/`getForeignObjectAsync` or update the IDs if you get data from the same adapter instance.
* (crycode-de) Custom write parser scripts an now return false to cancel the write
* (crycode-de) Updated dependencies

### 1.3.1 (2022-04-19)

* (crycode-de) Fixed `autoSetValue` defaults for parsers
* (crycode-de) Fixed sentry admin integration
* (crycode-de) Updated dependencies

### 1.3.0 (2022-02-07)

* (crycode-de) Added `sharedData` object in custom parsers

## License

Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)

Copyright (c) 2020-2024 Peter Müller <peter@crycode.de> (<https://crycode.de/>)
