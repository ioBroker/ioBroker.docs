![Logo](admin/mqtt-client.svg)

# ioBroker.mqtt-client

[![NPM version](https://img.shields.io/npm/v/iobroker.mqtt-client?style=flat-square)](https://www.npmjs.com/package/iobroker.mqtt-client)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mqtt-client?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.mqtt-client)
![node-lts](https://img.shields.io/node/v-lts/iobroker.mqtt-client?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.mqtt-client?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.mqtt-client?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.mqtt-client/test-and-release.yml?branch=master&logo=github&style=flat-square)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.mqtt-client.svg?color=red&label=beta)
![Stable](http://iobroker.live/badges/mqtt-client-stable.svg)
![Installed](http://iobroker.live/badges/mqtt-client-installed.svg)

Publish and subscribe ioBroker states to MQTT Brokers

## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Adapter Settings
![Adapter](img/settings.png)

### on connect topic and message
The ```on connect message``` is published to the ```on connect topic``` every time the client connects or reconnects to the server.

### on disconnect topic and message
The ```on disconnect message``` is published to the ```on disconnect topic``` when the adapter stops gracefully.

### last will topic and message
The ```last will message``` is published to the ```last will topic``` every time the client connects or reconnects to the server.
The Server will store this message and send it to its subscribers when the client disconnects unexpectedly.

### subscriptions
Comma separated list of topics that are not covered by existing states.
Received messages are converted to states within the adapter's namespace (e.g. mqtt.0) and subscribed.
You can remove topics after all states have been created.

### split JSON into states for topics
Comma separated list of MQTT topic filters (without prefix, `+` and `#` are allowed), e.g. `zigbee2mqtt/+`.
A JSON object received on a matching topic is not stored as text, but split into a channel with one state per value.
`zigbee2mqtt/sensor` = `{"battery":100,"occupancy":false,"color":{"x":0.3}}` creates the channel `mqtt-client.0.zigbee2mqtt.sensor`
with the states `battery` (number), `occupancy` (boolean) and the channel `color` with the state `x` (number).

* Nested objects become channels (up to 5 levels), arrays are stored as JSON text.
* Dots, whitespace and characters that are not allowed in IDs are replaced by `_` in the IDs.
* Values written in ioBroker (`ack=false`) are sent as JSON to `<topic>/set`, e.g. `{"color":{"x":0.5}}` - this is the convention of zigbee2mqtt. The device confirms the new value with its next message.
* Payloads that are no JSON object (arrays, numbers, text) are handled as before.

The topics still have to be subscribed, e.g. with `zigbee2mqtt/#` in the additional subscriptions.
States that older versions created as text for these topics are not changed and can be deleted.

### publish prefix
When publishing this will be prepended to all topics.
Default is empty (no prefix).

### subscribe prefix
When subscribing this will be prepended to all topics.
Default is empty (no prefix).

## State Settings
![State](img/dialog.png)

### enabled
Enables or disables the mqtt-client functionality for this state.
Disabling will delete any mqtt-client settings from this state.

### topic
The topic this state is published to and subscribed from.
default: state-ID converted to a mqtt topic.

When the topic is derived from the state-ID, dots are converted to topic level separators (`/`) and the
following characters are replaced by `_`:
* the mqtt wildcards `+` and `#` - they are not allowed in topic names (used e.g. by shelly IDs like `shelly.0.SHSW-1#B96701#1`)
* slashes contained in the ID itself - they would create additional topic levels
* whitespace - it must not end up in object IDs when the topic is converted back

So `shelly.0.SHSW-1#B96701#1.Relay0.Switch` becomes `shelly/0/SHSW-1_B96701_1/Relay0/Switch`.
If two state-IDs derive to the same topic (e.g. `a#b` and `a+b`), a warning is logged. Configure an explicit topic for one of them in this case.

### publish
* ```enable``` state will be published
* ```changes only``` state will only be published when its value changes
* ```as object``` whole state will be published as object
* ```qos``` see <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```retain``` see <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

### subscribe
* ```enable``` topic will be subscribed and state will be updated accordingly
* ```changes only``` state will only be written when the value changed
* ```as object``` messages will be interpreted as objects
* ```qos``` see <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```ack``` on state updates the ack flag will be set accordingly

#### Note
* when ack is set to true it will overwrite objects ack, see ```as object```
* to prevent message loops, if both publish and subscribe are enabled ```changes only``` is always on for subscribe

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 4.1.0 (2026-09-15)
* (@GermanBluefox) Adapter requires node.js >= 22.19 now
* (@Tarvion) Automatically derived topics no longer contain the mqtt wildcards `+` and `#` (as used by shelly IDs), slashes or whitespace taken from the state-ID. These characters are replaced by `_` now
* (@GermanBluefox) A warning is logged if two states derive to the same topic
* (@GermanBluefox) Adapter icon converted to SVG
* (@GermanBluefox) The adapter was refactored to TypeScript
* (@GermanBluefox) Fixed: stopping the adapter waited for the timeout when no broker was configured or after `stopInstance`
* (@GermanBluefox) Fixed: states created from received topics now have `common.role` instead of a `role` outside of `common`
* (@GermanBluefox) Fixed: with "subscribe as object", the loop protection and "changes only" skipped changed values instead of unchanged ones
* (@GermanBluefox) Fixed: deleting a state that was published with retain now also removes the retained message from the broker
* (@GermanBluefox) Fixed: MQTT version 3 connects with the protocol name `MQIsdp`, so MQTT 3.1 brokers accept the connection. The versions are labeled 3.1, 3.1.1 and 5.0 in the settings (#169)
* (@GermanBluefox) Fixed: special characters like `%` or `:` in the user name, password or client ID broke the connection (#200)
* (@GermanBluefox) New option "split JSON into states for topics": JSON objects, e.g. from zigbee2mqtt, become a channel with one state per value; written values are sent to `<topic>/set` (#322)
* (@GermanBluefox) Fixed: a subscribed state was not updated after a restart when an object of the adapter's namespace had the same topic. Changing the topic of a state now also unsubscribes the old topic, and no copy of a state is created for an old topic anymore (#418)
* (@GermanBluefox) Fixed: every change of an object (e.g. `extendObject` by another adapter) published the current value of the state again, which could overwrite a newer value on the same topic. The value is now published once only when publishing starts or the topic changes (#467)

### 4.0.0 (2026-05-05)
* (copilot) Adapter requires node.js >= 22 now
* (copilot) Adapter requires admin >= 7.7.22 now
* (copilot) Adapter requires js-controller >= 6.0.11 now
* (@klein0r) Updated dependencies

### 3.0.0 (2025-01-24)
* (@klein0r) Breaking change: Underscores are not replaced by spaces in the corresponding topic anymore

### 2.1.0 (2024-11-12)
* (mcm1957) Adapter requires node.js 20 now.
* (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
* (simatec) Adapter changed to meet Responsive Design rules.
* (mcm1957) Dependencies have been updated.

### 2.0.1 (2024-09-23)
* (@klein0r) Added missing information in configuration dialog
* (@klein0r) Fixed type of port configuration to avoid conflicts

## License
The MIT License (MIT)

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2016-2023 Pmant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.