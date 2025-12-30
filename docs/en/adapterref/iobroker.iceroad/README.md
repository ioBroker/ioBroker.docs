![Logo](docs/de/img/iceroad.png)

# ioBroker.iceroad

![Number of Installations](http://iobroker.live/badges/iceroad-installed.svg)
![Current version in stable repository](http://iobroker.live/badges/iceroad-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.iceroad.svg)](https://www.npmjs.com/package/iobroker.iceroad)

![Test and Release](https://github.com/iobroker-community-adapters/iobroker.iceroad/workflows/Test%20and%20Release/badge.svg)
[![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.iceroad/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.iceroad/actions/workflows/codeql.yml)
[![Downloads](https://img.shields.io/npm/dm/iobroker.iceroad.svg)](https://www.npmjs.com/package/iobroker.iceroad)

## Documentation

Vorhersage zur vereisten Frontscheibe</br>
Bitte die API hier beantragen: https://www.eiswarnung.de/rest-api/ </br>

Iced windshield forecast</br>
Please request the API here: https://www.eiswarnung.de/rest-api/ </br>
</br>
🇩🇪 [Dokumentation](docs/de/iceroad.md)</br>
🇬🇧 [Documentation](docs/en/iceroad.md)</br>

## Discussion and Questions

[ioBroker Forum](https://forum.iobroker.net/topic/50041/test-adapter-ice-road)</br>

## Ice-Road adapter for ioBroker

This is a shedule adapter that polls the current ice situation via https://eiswarnung.de e.g. every hour.
Based on climate and weather data for your location, they calculate the night before whether icy windows are expected in your area the next morning. The optimal time for the query is 8-10 hours in advance. If you want to leave the house at 8am, it is best to use a forecast from 10-24pm the night before.</br>
</br>
If the adapter displays the status "Ice" or "Maybe ice", it is possible to be notified. Currently, there are several built-in notification services (Telegram, Pushover, WhatsApp, Email, Jarvis, Lovelace, SynoChat). If the status is changed to "No ice", you also get a notification. In addition, it is possible to be reminded when the status "Ice" and "Maybe ice" is pending for more than X hours. (Can be set in the configuration). Otherwise, various data points are available for further processing.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Adapter requires node.js 18 now
- (mcm1957) Dependencies have been updated

### 1.2.1 (2023-05-26)

-   (ciddi89) Updated dependecies
-   (ciddi89) increased timeout for axios to ten seconds

### 1.2.0 (2023-02-22)

-   (ciddi89) Updated dependencies

### 1.1.3 (2023-01-20)

-   (ciddi89) Bugfix: reminder doesn't work correctly
-   (ciddi89) Added: name and type for channel folders
-   (ciddi89) Other: Small code improvements

### 1.1.2 (2022-12-23)

-   (ciddi89) handling if no data was received added

### 1.1.1 (2022-12-18)

-   (ciddi89) changed order in table of longitude and latitude

### 1.1.0 (2022-12-18)

-   (ciddi89) added handling for wrong location data (comma to fullstop)
-   (ciddi89) added functionality for reminder notification
-   (ciddi89) updated readme

### 1.0.0 (2022-12-17)

-   (ciddi89) fixed issue messages wasn't sent
-   (ciddi89) increased timeout
-   (ciddi89) BREAKING CHANGE -> rebuild adapter complete. Please save your data and delete the instance before update
-   (ciddi89) drop support for admin 5

### 0.1.1 (2022-10-01)

-   (Apollon77) Make sure adapter stops when he is done

### 0.1.0

-   (Patrick Walther) add locations, add pushover/telegram/mail

### 0.0.1

-   (Patrick Walther) initial release

## License

The MIT License (MIT)


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Patrick Walther walther-patrick@gmx.net

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
