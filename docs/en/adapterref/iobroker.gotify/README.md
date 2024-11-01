![Logo](admin/gotify.png)

# ioBroker.gotify

[![NPM version](https://img.shields.io/npm/v/iobroker.gotify.svg)](https://www.npmjs.com/package/iobroker.gotify)
[![Downloads](https://img.shields.io/npm/dm/iobroker.gotify.svg)](https://www.npmjs.com/package/iobroker.gotify)
![Number of Installations (latest)](https://iobroker.live/badges/gotify-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/gotify-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.gotify.png?downloads=true)](https://nodei.co/npm/iobroker.gotify/)

**Tests:** ![Test and Release](https://github.com/ThomasPohl/ioBroker.gotify/workflows/Test%20and%20Release/badge.svg)

## gotify adapter for ioBroker

Send push notifications from [ioBroker](https://iobroker.net/) to [Gotify](https://gotify.net/)

## Changelog

### 0.3.0

-   (Thomas Pohl) The token is stored now encrypted
-   (Thomas Pohl) node.js 22 is supported

### 0.2.1

-   (Thomas Pohl) Optimized startup behavior when adapter is not configured

### 0.2.0

-   (Thomas Pohl) Add timeout for http calls
-   (Thomas Pohl) Update dependency versions

### 0.1.0

-   (Thomas Pohl) Update to adapter-core 2.5.1

### 0.0.2-RC1.0 (2022-02-09)

-   (Thomas Pohl) Update dependencies

### 0.0.1

-   (Thomas Pohl) initial release

## Installation

### Preparation

-   Login with you user in gotify
-   Create an application for ioBroker
-   Note the token of your new application
    ![new application](img/newApplication.png)

### In ioBroker

-   Goto Adapter
-   Click on github-cat-icon
-   Go to Custom tab
-   Enter https://github.com/ThomasPohl/ioBroker.gotify
-   Install
-   Create a new instance for the gotify-adapter
-   Enter the Url auf you installation
-   Add the previously created token

## Usage

### Blockly

To send messages using blockly. Just add the gotify block to your script:
![Blockly](img/gotify.blockly.png)

If yoou choose Markdown as format you can use [Markdown](https://guides.github.com/features/mastering-markdown/) to format your messages.

### Javascript

```javascript
sendTo("gotify.0", "send", {
    title: "DG lüften",
    message: "Luftfeuchtigkeit im DG zu hoch!",
});
```

## Communication

The following diagramm illustrates how ioBroker sends push notifications to your smartphone.
![Communication diagram](img/iobroker.gotify-communication.png)

Both the ioBroker and the smartphone app connect to the gotify server using REST. The mobile app keeps an open websocket to the gotify server to be able to receive new notification.

When the ioBroker-adapter wants to push a notification it send a POST request to the Gotify server. The gotify server takes care of pushing the notification to the client.

## License

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Copyright (c) 2024 Thomas Pohl <post@thomaspohl.net>
