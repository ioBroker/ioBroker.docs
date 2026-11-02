---
chapters: {"pages":{"en/adapterref/iobroker.alarm/README.md":{"title":{"en":"ioBroker.alarm"},"content":"en/adapterref/iobroker.alarm/README.md"},"en/adapterref/iobroker.alarm/docs/en/alarm_en.md":{"title":{"en":"ioBroker.alarm"},"content":"en/adapterref/iobroker.alarm/docs/en/alarm_en.md"}}}
---
![Logo](admin/alarm.png)
# ioBroker.alarm

![Number of Installations](http://iobroker.live/badges/alarm-installed.svg) ![Number of Installations](http://iobroker.live/badges/alarm-stable.svg)[![NPM version](http://img.shields.io/npm/v/iobroker.alarm.svg)](https://www.npmjs.com/package/iobroker.alarm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.alarm.svg)](https://www.npmjs.com/package/iobroker.alarm)
[![Known Vulnerabilities](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)](https://snyk.io/test/github/misanorot/ioBroker.alarm)

[![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)](https://nodei.co/npm/iobroker.alarm/)

**Github Actions**:

![GitHub Actions](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

## Alarmsystem for ioBroker

**[English description](/#/docs/adapterref/iobroker.alarm/docs/en/alarm_en.md)**  
**[Deutsche Beschreibung](https://github.com/misanorot/ioBroker.alarm/blob/master/docs/de/alarm.md)**

This adapter allows you to set up a home alarm system without extensive programming knowledge. It offers the ability to configure 3 security circuits and monitor them during night rest, activation, or deactivation. Additionally, internal adapter states can be directly linked to external states. These links are configured in the Shortcuts tab. A simple presence simulation can be easily configured to enhance protection against burglars. Notifications about various events are also possible and can be sent via various channels such as Telegram or Email. (Provided the corresponding adapter is installed!)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.1.1 (2026-10-28)
* (@GermanBluefox) Alarm panel: today's log is shown as a list instead of one line with visible `<br>`
* (@GermanBluefox) Devices tile: the size dialog no longer shows 2×2 while the tile is stored as 1×1; the panel adapts its buttons to 1×1 and 2×½ tiles

### 5.1.0 (2026-10-27)
* (@GermanBluefox) Added an alarm panel widget for vis-2 and for the devices adapter
* (@GermanBluefox) States from the configuration whose object does not exist (e.g. of a deleted Echo) are no longer written, but reported once as a warning

### 5.0.2 (2026-09-28)
* (@misanorot) fixed little issues at other alarms

### 5.0.1 (2026-08-07)
* (@misanorot) update

### 5.0.0 (2026-08-06)
* (@GermanBluefox) Migrated to admin 8
* (@misanorot) fixed checker #427

## License
[MIT License](https://github.com/misanorot/ioBroker.alarm/blob/master/LICENSE)

Copyright (c) 2019-2026 misanorot <audi16v@gmx.de>