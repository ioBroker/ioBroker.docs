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

**[English description](docs/en/alarm_en.md)**  
**[Deutsche Beschreibung](docs/de/alarm.md)**

This adapter allows you to set up a home alarm system without extensive programming knowledge. It offers the ability to configure 3 security circuits and monitor them during night rest, activation, or deactivation. Additionally, internal adapter states can be directly linked to external states. These links are configured in the Shortcuts tab. A simple presence simulation can be easily configured to enhance protection against burglars. Notifications about various events are also possible and can be sent via various channels such as Telegram or Email. (Provided the corresponding adapter is installed!)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.6 (2026-07-07)
* (@GermanBluefox) Packages were updated
* (@GermanBluefox) Some compiler errors were fixed

### 4.0.5 (2026-06-23)
* (@misanorot) fixed checker issues

### 4.0.4 (2026-05-17)
* (@misanorot) fixed little JSON Ui issues

### 4.0.3 (2026-05-11)
* (@misanorot) fixed checker issues
- (copilot) Adapter requires node.js >= 22 now
* (@GermanBluefox) fixed JSON config issues
* (@GermanBluefox) packages were updated

### 4.0.2 (2026-04-07)
* (@GermanBluefox) fixed #368

[Older changes](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019-2026 misanorot <audi16v@gmx.de>
