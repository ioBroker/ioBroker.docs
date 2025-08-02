---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarlog/README.md
title: ioBroker.solarlog
hash: QvJCpUjrFP0Cyiu8k4Dc1frlxjH9u5B27o1uXAnifF0=
---
![Логотип](../../../en/adapterref/iobroker.solarlog/admin/solarlog.png)

![Количество установок](http://iobroker.live/badges/solarlog-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.solarlog.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarlog.svg)
![НПМ](https://nodei.co/npm/iobroker.solarlog.png?downloads=true)

# IoBroker.solarlog
Адаптер ioBroker для устройств Solarlog

## Solarlog - Настройки
Открытый JSON-интерфейс (offene Json-Schnittstelle) необходимо активировать в меню конфигурации Solarlog (Конфигурация - Система - Zugangskontrolle - Offene Json-Schnittstelle: aktivieren).

##Адаптер - Настройки
### Базовые настройки
Установите Solarlog - IP-адрес (192.XXX.X.XXX), порт (необязательно) и опрос - интервал потребления/производства в секундах ("живые" данные, мин. 10 с).

Безопасность: вы можете активировать пароль пользователя в своем Solarlog и флажок «Вход пользователя активирован» и добавить свой пароль в конфигурацию адаптера, или вы можете запустить Solarlog и адаптер без пароля пользователя. Если активирован вход пользователя, рекомендуется остановить адаптер на время использования интерфейса Solarlog — пользователя (в противном случае вам необходимо будет повторно войти в систему после каждого запроса адаптера).

### Расширенные настройки
Проверьте, нужно ли собирать данные обо всех инверторах/субсчетчиках/устройствах/интеллектуальной энергии.

Установите опрос - интервал для средних и суммированных значений в минутах (минимум 5 минут).

Проверьте, нужно ли собирать исторические данные, и установите время суток, когда объекты исторических данных будут обновляться.

Прогноз: опционально адаптер получает прогноз — данные с помощью API Forecast.Solar. Фактически, общее количество кВтч на сегодняшний и завтрашний день прогнозируется, обновляясь каждый час. Более подробные или дополнительные данные доступны по запросу (пожалуйста, откройте вопрос).

## Аппаратное обеспечение
Протестировано на: Solarlog 200PM+ / 300PM+ / 500 / 1200 метров / 50.

SolarLog 50: Открытого JSON-интерфейса для устройств SolarLog 50 нет. Таким образом, определенные значения в каналах «информация» и «статус» будут «ДОСТУП ЗАПРЕЩЕН». Если вы предпочитаете другое решение, откройте проблему или опубликуйте свои предпочтения в соответствующей проблеме.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.2.8

-   ready for js-controller 5.0, enhanced error-handling, dependecies updated

### 2.2.6

-   bug in 'forecast' fixed, dependecies updated

### 2.2.5

-   testing fixed

### 2.2.4

-   polling-bug fixed, dependecies updated

## License

The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 forelleblau marceladam@gmx.ch

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
