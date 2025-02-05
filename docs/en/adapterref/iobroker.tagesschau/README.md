![Logo](admin/tagesschau.png)
# ioBroker.tagesschau

[![NPM version](https://img.shields.io/npm/v/iobroker.tagesschau.svg)](https://www.npmjs.com/package/iobroker.tagesschau)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tagesschau.svg)](https://www.npmjs.com/package/iobroker.tagesschau)
![Number of Installations](https://iobroker.live/badges/tagesschau-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/tagesschau-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.tagesschau.png?downloads=true)](https://nodei.co/npm/iobroker.tagesschau/)

**Tests:** ![Test and Release](https://github.com/ticaki/ioBroker.tagesschau/workflows/Test%20and%20Release/badge.svg)

## tagesschau adapter for ioBroker

[Deutsche Anleitung (aktueller)](README-GER.md)

Retrieves news and video links from Tagesschau.

Content is only available in German.

Install - set the desired settings in the admin - done.

**According to the Tagesschau api, 60 queries per hour are OK. Each topic and video is 1 query. 30 minutes per update always fits. No idea how exactly they take this.**

Please note: 
1. if Enable messages or Enable video messages are not selected, the adapter pauses
2. if activate messages is selected, the adapter only runs if 1 topic and 1 federal state are selected in the configuration.
3. the keywords are extracted from the messages and are only available after the first run. There will be more and more over time! These only apply to the messages.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.0 (2025-01-27)
* (ticaki) States added for browsing.
* (ticaki) Another attempt to constantly sort the videos in the same way.
* (ticaki) Control states reorganised.
* (ticaki) Placeholder images for no news now work

### 0.4.3 (2025-01-25)
* (ticaki) remove some helper code to do translations

### 0.4.2 (2025-01-25)
* (ticaki) make the code fit for latest

### 0.4.1 (2025-01-17)
* (ticaki) videos always in the same order.

### 0.4.0 (2025-01-07)
* (ticaki) Command data point for defining the first news to be displayed
* (ticaki) Reduce object updates
* (ticaki) Total number of news as a data point
* (ticaki) We not in hurry, write object updates slowly.
* (ticaki) Info log messages are a bit more fun. (error and warn messages are not funny at all)

### 0.3.2 (2025-01-05)
* (ticaki) added length to videos
* (ticaki) System load reduced at startup

### 0.3.1 (2025-01-05)
* (ticaki) Back to stable admin

### 0.3.0 (2025-01-05)
* (ticaki) States are only updated when changes are made.
* (ticaki) Last update Data point added with timestamp of the last successful data access
* (ticaki) Emptying of data points improved
* (ticaki) Placeholder images inserted for no news.
* (ticaki) User-defined keywords with `*`
* (ticaki) Requires admin version 7.4.9 or higher

### 0.2.3 (2025-01-05)
* (ticaki) Fixed: Adapter deletes own states

### 0.2.1 (2025-01-05)
* (ticaki) fixed refresh interval & add axios timeouts

### 0.2.0 (2025-01-05)
* (ticaki) remove tracking from videos
* (ticaki) beautiful state name

### 0.1.4 (2025-01-04)
* (ticaki) Fixed: More as 1 region bug

### 0.1.3 (2025-01-04)
* (ticaki) Reduced size of the icon

### 0.1.2 (2025-01-04)
* (ticaki) Added: Breaking news is excluded from filtering and copied to a separate folder. 
* (ticaki) Changed: Taglist is now sorted.

### 0.1.1 (2025-01-04)
* (ticaki) fixed: The empty configuration after the first installation leaves crashed adapters

### 0.1.0 (2025-01-04)
* (ticaki) initial release

## Disclaimer
**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**
**Tagesschau is a trademark of ARD-aktuell.** https://www.tagesschau.de/impressum

## License
MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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