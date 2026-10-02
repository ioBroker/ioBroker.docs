![Logo](admin/botslab360.png)

# ioBroker.botslab360

[![NPM version](https://img.shields.io/npm/v/iobroker.botslab360.svg)](https://www.npmjs.com/package/iobroker.botslab360)
[![Downloads](https://img.shields.io/npm/dm/iobroker.botslab360.svg)](https://www.npmjs.com/package/iobroker.botslab360)
![Number of Installations](https://iobroker.live/badges/botslab360-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/botslab360-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.botslab360.png?downloads=true)](https://nodei.co/npm/iobroker.botslab360/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.botslab360/workflows/Test%20and%20Release/badge.svg)

## botslab360 adapter for ioBroker

Adapter for Botslab / 360 robot vacuums.

## Setup

1. Create an instance of the adapter.
2. Choose the **Server** that matches the app your account was created in:
   - **International (Botslab)** for accounts from the Botslab app.
   - **China (360Robot)** for accounts from the 360Robot app (`q.smart.360.cn`). Use this if the international login reports that the account does not exist.
3. Enter the **email** and **password** of your account.
4. For the international server, pick the **region** your account belongs to (na1 / eu1 / ap1). The adapter automatically tries the other regions if the account is not found on the selected one. The region is ignored for the China server.

### Captcha

If the login is challenged with a captcha, the adapter stores the image as a data URL in `info.captchaImage` and also logs it inline (download the log to view it). Solve it and write the code to `info.captchaRequest` to continue the login.

## Steuern

Unter remote können Befehle gesendet werden.

## Status

Status Abruf für Verbrauchsgüter und Karte muss manuell getriggert werden. Beim China-Server werden Gerätezustände asynchron über eine Push-Verbindung geliefert und unter `<sn>.status` veröffentlicht.

## Fragen und Diskussion

<https://forum.iobroker.net/topic/60046/test-adapter-360-staubsauger-botslab>

## Changelog

### 0.3.1

- (TA2k) Fix the China (360Robot) session mint (errno 100) and recognize the expired-session error so login and device polling work

### 0.3.0

- (TA2k) Add a China (360Robot / q.smart.360.cn) backend selectable via the new Server option, for accounts that cannot log in on the international servers

### 0.2.1

- (TA2k) Auto-retry other regions when the account is not found; verbose debug logging; log the captcha image inline

### 0.2.0

- (TA2k) Switch to headless email/password login on the /v1 API; cookie login is no longer required

### 0.1.0

- (TA2k) Add login with an existing 360 web session

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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