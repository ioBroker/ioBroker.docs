![Logo](admin/gigaset-elements.png)

# ioBroker.gigaset-elements

Adapter for Gigaset Elements (https://gigaset.com/smart-home)

![node](https://img.shields.io/node/v-lts/iobroker.gigaset-elements)
[![NPM version](https://img.shields.io/npm/v/iobroker.gigaset-elements.svg)](https://www.npmjs.com/package/iobroker.gigaset-elements)
[![Downloads](https://img.shields.io/npm/dm/iobroker.gigaset-elements.svg)](https://www.npmjs.com/package/iobroker.gigaset-elements)
[![license](https://img.shields.io/npm/l/iobroker.gigaset-elements)](LICENSE)

![Number of Installations](https://iobroker.live/badges/gigaset-elements-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/gigaset-elements-stable.svg)

![Test and Release](https://github.com/matthsc/ioBroker.gigaset-elements/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.gigaset-elements.png?downloads=true)](https://nodei.co/npm/iobroker.gigaset-elements/)

## Requirements

-   NodeJS >= 12.x
-   ioBroker >= 3.x, with admin >= 5.x
-   Gigaset Elements system

## Installation

Until the adapter is part of the latest or stable repository, you can install the latest version by enabling expert mode in ioBroker and install the adapter from npm or github.

After installation, create a new instance and configure the settings:

-   Connection Settings for accessing Gigaset Elements cloud
    -   email
    -   password
    -   authentication interval, should be 6 (hours)
-   Polling intervals for different areas
    -   events (i.e. window/door open/tilt/close) - number of seconds between polling
    -   element/sensor data (i.e. temperature, humidity) - number of minutes between polling

## Limitations

The adapter currently only reads data and does not allow to change anything.

### Supported Elements

So far, the adapter has been tested/is known to work with the following Elements, and test data is available via [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api):

| Element type | Element name          | Tested by |
| ------------ | --------------------- | --------- |
| is01         | Siren                 | matthsc   |
| um01         | Universal/Window/Door | matthsc   |
| wd01         | Water                 | matthsc   |

If you have other elements, or encounter event types that are not yet handled by the adapter, you can enable expert mode in ioBroker, go to the _Debug_ tab in the adapter settings (only visible with expert mode), and use "Debug - Prepare test data" to generate test data that can be submitted as part of a github issue for this adapter to get the additional elements/event types included. Personal data like basestation or element names and ids are stripped from the generated data as far as possible.

## Messages

So far, the adapter only supports messages used for testing/debugging.

### Testing

Callback responses are either <code>{ response: "&lt;message&gt;" }</code> if the action was sucessfull, or <code>{ error: "&lt;error message&gt;" }</code> in case something went wrong.

#### Ping

Send a ping to the adapter, and receive a <code>{ response: "pong" }</code>.

```ts
sendTo("gigaset-elements.0", "test", "ping", callback);
```

#### Process test data

Process test data from [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api). Creates base stations, elements, and processes captured test events.

```ts
sendTo("gigaset-elements.0", "test", "process-test-data", callback);
```

### Debugging

Callback responses are either <code>{ response: object }</code> if the action was sucessfull, or <code>{ error: "&lt;error message&gt;" }</code> in case something went wrong.

#### Prepare test data

Load current data from the Gigaset Elements API and prepare it to be integrated as test data into [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api), i.e. for new events or elements that have no test data yet.

Loads basestations, elements and events from the API, reduces it to minimize the amount of data, and tries to strip personal information like names and ids from the data.

Returns the data as an <code>{ response: { bs: [], elements: [], events: [] } }</code> object.

```ts
sendTo("gigaset-elements.0", "debug", { action: "prepare-test-data" from?: Date }, callback);
```

#### Load base station and element data

Loads and returns the raw basestation and elements data as an <code>{ response: { bs: [], elements: []} }</code> object.

```ts
sendTo("gigaset-elements.0", "test", { action: "load-bases-elements" }, callback);
```

#### Load events

Loads events and returns an <code>{ response: { events: [] } }</code> object.

Event data is usually available for 1 month, older data seems not to be available.

```ts
sendTo("gigaset-elements.0", "test", { action: "load-events", from: Date, to: Date }, callback);
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.2 (2022-02-28)

-   (matthsc) fix test data generation
-   (matthsc) dependency updates

### 0.1.1 (2022-02-12)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2022-01-29)

-   (matthsc) initial release

## License

MIT License

Copyright (c) 2022 matthsc <matthsc@gmx.net>

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
