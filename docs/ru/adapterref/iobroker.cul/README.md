---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cul/README.md
title: ioBroker.cul
hash: n9cyFwlOacKrFgHp1ZG0tbJEH41ecpP68CZekcZTAks=
---
![Логотип](../../../en/adapterref/iobroker.cul/admin/busware.jpg)

![Количество установок](http://iobroker.live/badges/cul-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.cul.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cul.svg)

# IoBroker.cul
![Тестируйте и выпускайте](https://github.com/ioBroker/ioBroker.cul/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/cul/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер ioBroker для управления FS20, Max!, HMS и другими устройствами через [КУЛ](http://busware.de/tiki-index.php?page=CUL) / [кульф](http://culfw.de). Зависит от https://github.com/hobbyquaker/cul

## Поддерживаемые устройства
- *EM* - EM1000WZ, EMWZ
- *ФС20*, в т.ч. ЕСА1000/2000
- *HMS* - HMS100-TF, HMS100-T, HMS100-WD, RM100-2, HMS100-TFK, HMS100-MG, HMS100-CO, HMS100-FIT
- *МОРИЦ* - МАКС!
- *WS* - KS300TH, S300TH, WS2000/WS7000

## Как
### Отправьте команду на устройство FS20, например. JavaScript
```sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});```

### Отправьте необработанную команду (например, на устройство InterTechno) с помощью JavaScript
```sendTo("cul.0", "sendraw", {"command": 'is0FFFFF0FFFFF'});```

Эти команды используют библиотеку CUL этого адаптера для отправки команд устройству.
Адаптер `Busware CUL USB / culfw` на основе Javascript/Node.js

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 2.0.2 (2022-05-11)
* IMPORTANT: Nodejs 12.x is now needed at least!
* (Apollon77/achimmm) Add support for devices with address 0
* (bluefox) Updated serialport package

### 1.3.5 (2021-04-12)
* (Apollon77) Make sure that cul is connected before accepting state changes (Sentry IOBROKER-CUL-R)

### 1.3.4 (2020-12-02)
* (Apollon77) prevent crash case (Sentry IOBROKER-CUL-D)

### 1.3.3 (2020-09-25)
* (EvilEls) Added raw command support with cul.write()

### 1.3.2 (2020-08-23)
* (Apollon77) check that all needed objects are existing on start (Sentry IOBROKER-CUL-C)
* (Apollon77) fix Moritz device crash case (Sentry IOBROKER-CUL-7)

### 1.3.1 (2020-07-26)
* (Apollon77) make sure connection check do not crash adapter (Sentry IOBROKER-CUL-3)
* (Apollon77) crashes prevented (Sentry IOBROKER-CUL-5, IOBROKER-CUL-8)

### 1.3.0 (2020-07-20)
* (Apollon77) Really update dependencies and Serialport

### 1.2.2 (2020-04-30)
* (Apollon77) Update dependencies/Serialport

### 1.2.1 (2020-03-18)
* (bluefox) Changed license from non SPDX conform 
    "GPL-2.0" to "GPL-2.0-or-later"

### 1.2.0 (2020-02-10)
* (MK-2001) Sending of FS20 cmdRAW possible or via sendTo as described in the readme
* (Bluefox) Refactoring

### 1.1.0 (2020-01-04)
* (foxriver76) removed usage of adapter.objects

### 1.0.0 (2019-05-15)
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 0.4.0 (2018-03-07)
* (Apollon77/Michael Lorenz) Optimizations for nanoCul, Support for ESA devices

### 0.3.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 0.2.2 (2017-01-23)
* (bluefox) use new npm cul module

### 0.2.0 (2017-01-21)
* (bluefox) Add raw data state

### 0.1.1 (2017-01-14)
* (bluefox) Use newer version of cul module

### 0.1.0 (2016-11-01)
* (bluefox) Update cul package

### 0.0.4 (2015-04-16)
* (bluefox) update package.json

### 0.0.3 (2015-03-03)
* (bluefox) try to bring the adapter to state of the art

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2014-2022 hobbyquaker
