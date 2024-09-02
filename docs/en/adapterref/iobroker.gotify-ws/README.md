![Logo](admin/gotify-ws.png)

# ioBroker.gotify-ws

![Number of Installations](http://iobroker.live/badges/gotify-ws-installed.svg)
![Number of Installations](http://iobroker.live/badges/gotify-ws-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.gotify-ws.svg)](https://www.npmjs.com/package/iobroker.gotify-ws)
[![Downloads](https://img.shields.io/npm/dm/iobroker.gotify-ws.svg)](https://www.npmjs.com/package/iobroker.gotify-ws)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.gotify-ws/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.gotify-ws)
![Test and Release](https://github.com/simatec/ioBroker.gotify-ws/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/simatec/ioBroker.gotify-ws?style=flat)](https://github.com/simatec/ioBroker.gotify-ws/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)

This adapter uses the service `Sentry.io` to automatically report exceptions and code errors and new device schemas to me as the developer. More details see below!

---

## Support adapter development

**If you like ioBroker.gotify-ws, please consider making a donation:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## gotify-ws adapter for ioBroker

Gotify-WS is an adapter that establishes a websocket connection to a Gotify server and can therefore receive and process all messages from the server.

The background for me was a missing connection to all common systems.
For example, there is no proper app for IOS.

However, as Gotify is becoming more and more popular and has now also found its way into many systems such as Proxmox as a notification service, I needed a solution.

This is where Gotify-WS comes into play.
Gotify-WS receives messages and forwards them to a notification service supported by ioBroker. This means that messages can be forwarded to Telegram, for example.

Spotify-WS currently supports the following notification services

* e-mail
* Matrix
* Notification-Manager
* Pushover
* Discord
* Signal
* Telegram
* Whatsapp

---

## Adapter configuration

The configuration of the adapter is very simple.

You create a new client on your Gotify server and copy the generated token of the client.
You enter this in the Gotify-WS adapter configuration.
Gotify-WS also needs the IP address or domain and the port of the Gotify server.

This establishes a connection and the adapter can receive all incoming messages from the Gotify server.

You can then configure a notification service of your choice for forwarding.

---
<!-- ### **WORK IN PROGRESS** -->
## Changelog
### **WORK IN PROGRESS**
* (simatec) Fix Adapter Check
* (simatec) Dependencies updated
* (simatec) Responsive Design added

### 0.1.5 (2024-07-22)
* (simatec) small fix

### 0.1.4 (2024-07-19)
* (simatec) Dependencies updated

### 0.1.3 (2024-07-17)
* (simatec) Fix Test & Release
* (simatec) Fix Timeout

### 0.1.2 (2024-06-26)
* (simatec) Fix io-package
* (simatec) Notification-Manager added

### 0.1.1 (2024-06-19)
* (simatec) Fix Branch

### 0.1.0 (2024-06-19)
* (simatec) First Release

### 0.0.1 (2024-03-15)
* (simatec) initial release

---

## License

MIT License

Copyright (c) 2024 simatec

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
