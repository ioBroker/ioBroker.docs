---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.alarm/README.md
title: ioBroker.alarm
hash: A7EFoEodD4sa1G3hTwHnBhNGO9xRkNYfb5k4n4lxhy0=
---
![Логотип](../../../en/adapterref/iobroker.alarm/admin/alarm.png)

![Количество установок](http://iobroker.live/badges/alarm-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Известные уязвимости](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.alarm.png?downloads=true)

# IoBroker.alarm
**Github Actions**:

![GitHub Actions](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

[![[paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

## Система сигнализации для ioBroker
**[Описание на английском языке](docs/en/alarm_en.md)** **[Deutsche Beschreibung](docs/de/alarm.md)**

Этот адаптер позволяет настроить домашнюю систему сигнализации без обширных знаний в области программирования. Он предоставляет возможность настроить 3 цепи безопасности и контролировать их в ночное время, при включении или выключении. Кроме того, внутренние состояния адаптера могут быть напрямую связаны с внешними состояниями. Эти связи настраиваются на вкладке «Ярлыки». Для повышения защиты от взломщиков можно легко настроить простую имитацию присутствия. Также возможны уведомления о различных событиях, которые могут отправляться по различным каналам, таким как Telegram или электронная почта (при условии установки соответствующего адаптера!).

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