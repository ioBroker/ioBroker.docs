# ioBroker.myuplink

[![NPM version](https://img.shields.io/npm/v/iobroker.myuplink.svg)](https://www.npmjs.com/package/iobroker.myuplink)
![Current version in stable repository](https://iobroker.live/badges/myuplink-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.myuplink.svg)](https://www.npmjs.com/package/iobroker.myuplink)
![Number of Installations](https://iobroker.live/badges/myuplink-installed.svg)
[![Build Status](https://github.com/sebilm/ioBroker.myuplink/workflows/Test%20and%20Release/badge.svg)](https://github.com/sebilm/ioBroker.myuplink/actions/workflows/test-and-release.yml)

[![NPM](https://nodei.co/npm/iobroker.myuplink.png?downloads=true)](https://nodei.co/npm/iobroker.myuplink/)

## myuplink.com adapter for ioBroker

This ioBroker adapter receives data from myUplink.com.

## Using this adapter

1. You need compatible heat pump from NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global or Høiax - buy one if you don't have ;-)
2. You need an account at myUplink: https://myuplink.com
3. Go to myUplink Api: https://dev.myuplink.com/ and log in
4. Click "Applications" and then "Create New Application"
5. Fill in: Name and Description can be everything e.g. ioBroker
6. The Callback URL is important for Authorization Code Grant Flow. You can use https://sebilm.github.io/ioBroker.myuplink/myuplink.html
7. Accept the myUplink API Services Agreement and click "Create"
8. Then you get an Identifier and a Secret - we need them
9. Install this adapter in ioBroker
10. At adapter setting page fill in the Identifier and the Secret.
11. Choose your language and all other settings.
12. Click Save and Close

Each device has an object in the object tree called `setData`. You can enter a JSON object of the form

```json
{
    "12345": "42",
    "23456": "1"
}
```

in this object. This makes it possible to send and change several data points to the API at the same time.
It can also be used to change data points that are not sent by the API.

## Changelog

### 0.6.0 (2024-01-28)

-   The setData object has been added

### 0.5.0 (2024-01-14)

-   Parameter IDs and categories have been added for a few heat pumps

### 0.4.1 (2024-01-13)

-   In object IDs, all characters that are not officially supported are now replaced by an underscore
-   The roles of the data objects have been improved
-   The logging of token data (in log level silly) has been removed
-   Dependencies have been updated

### 0.4.0 (2023-12-31)

-   New options for renaming IDs have been added #5
-   Options are deactivated if checkboxes are not checked

### 0.3.0 (2023-12-29)

-   Support for setting parameter values has been added (must be paid for at myuplink.com) #4
-   Authorization Code Grant Flow settings have been moved to new Extended tab
-   Password control will be used for Secret and Auth Code

### 0.2.1 (2023-12-28)

-   All responsive sizes have been added to jsonConfig
-   More error logging have been added

### 0.2.0 (2023-12-28)

-   Settings page have been changed from materialize to jsonConfig
-   Dependencies have been updated

### 0.1.0 (2023-12-25)

-   Initial release

## License

MIT License

Copyright (c) 2024 Sebastian Häßelbarth <seb@sebmail.de>

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
