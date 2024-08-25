---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fenecon/README.md
title: ioBroker.fenecon
hash: F84h52mBqTyStvvgSqvErVUvJ2OFmiLyNwupupBm5fE=
---
![Логотип](../../../en/adapterref/iobroker.fenecon/admin/fenecon.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.fenecon.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fenecon.svg)
![Количество установок](https://iobroker.live/badges/fenecon-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/fenecon-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.fenecon.png?downloads=true)

# IoBroker.fenecon
**Тесты:** ![Тест и выпуск](https://github.com/sg-app/ioBroker.fenecon/workflows/Test%20and%20Release/badge.svg)

## Фенекон
[Fenecon](https://fenecon.de) — немецкий производитель фотоэлектрических инверторов и систем хранения энергии. Используемая система управления энергией (FEMS) основана на [openEMS](https://github.com/OpenEMS/openems) программное обеспечение.
Fenecon является участником openEMS.

## Адаптер
Этот адаптер подключается к системе FEMS и извлекает все доступные данные через интерфейс REST/JSON.
Кроме того, выполняются полезные расчеты.

## Конфигурация
Для установления соединения требуется IP-адрес центрального блока FEMS. Интервал обновления также можно настроить.
![конфигурация фенекона](../../../en/adapterref/iobroker.fenecon/img/configpage.png)

## Штаты
Состояния генерируются автоматически при запуске адаптера. Если дополнительные состояния становятся доступными через обновление программного обеспечения FEMS, в файле журнала появляются предупреждающие сообщения. Затем перезапустите адаптер, и новые состояния будут созданы.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.0 (2024-08-02)

-   (SG-App) set correct role states

### 0.4.2 (2024-08-02)

-   (SG-App) fix channel creation only one time on init

### 0.4.1 (2024-08-02)

-   (SG-App) refactor for latest repo
-   (SG-App) remove getObject calls on init
-   (SG-App) filter object ids if needed
-   (SG-App) check allowed length of address for channel and id creation

### 0.4.0 (2024-07-15)

-   (SG-App) refactor for latest repo

### 0.3.2 (2024-07-14)

-   (SG-App) calculate self consuming
-   (SG-App) dependency updates

### 0.3.1 (2024-07-11)

-   (SG-App) fix adapter checker warning

### 0.3.0 (2024-06-11)

-   (SG-App) set correct read write state
-   (SG-App) calculate autarchy
-   (SG-App) dependency updates

### 0.2.0 (2024-04-20)

-   (SG-App) collect all possible data from rest interface

### 0.1.0 (2024-04-17)

-   (SG-App) minor fix

### 0.0.2-alpha.0 (2024-04-16)

-   (SG-App) initial release

## License

MIT License

Copyright (c) 2024 Georg Schreiner <info@sg-app.de>

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