---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: A7EFoEodD4sa1G3hTwHnBhNGO9xRkNYfb5k4n4lxhy0=
---
![Logo](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![Anzahl der Installationen](http://iobroker.live/badges/alarm-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)

# IoBroker.alarm
**GitHub Actions**:

![GitHub Actions](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

## Alarmsystem für ioBroker
**[Englische Beschreibung](docs/en/alarm_en.md)** **[Deutsche Beschreibung](docs/de/alarm.md)**

Mit diesem Adapter können Sie eine Alarmanlage für Ihr Zuhause einrichten, ohne umfangreiche Programmierkenntnisse zu benötigen. Sie können drei Sicherheitskreise konfigurieren und diese während der Nacht, bei Aktivierung oder Deaktivierung überwachen. Interne Adapterzustände lassen sich direkt mit externen Zuständen verknüpfen. Diese Verknüpfungen werden im Tab „Verknüpfungen“ konfiguriert. Eine einfache Anwesenheitssimulation kann problemlos eingerichtet werden, um den Schutz vor Einbrechern zu erhöhen. Benachrichtigungen über verschiedene Ereignisse sind ebenfalls möglich und können über verschiedene Kanäle wie Telegram oder E-Mail versendet werden (vorausgesetzt, der entsprechende Adapter ist installiert!).

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