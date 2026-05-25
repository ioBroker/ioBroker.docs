---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.helios/README.md
title: ioBroker.helios
hash: aLHvTFftXrhYG9JsAVweaQyMa8O6Me8byCb00XAYof0=
---
![Логотип](../../../en/adapterref/iobroker.helios/admin/helios.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.helios.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.helios.svg)
![Количество установок (последние)](https://iobroker.live/badges/helios-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/helios-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.helios.svg)
![НПМ](https://nodei.co/npm/iobroker.helios.png?downloads=true)

# IoBroker.helios
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.helios/workflows/Test%20and%20Release/badge.svg)

## Адаптер Helios для ioBroker
Helios KWL easyControls

Дистанционное управление возможно путем записи значений в доступные для записи точки данных.

Данные, подлежащие обновлению:

1: Первоначальная настройка (inbetr.htm) 2: 3: Режим вечеринки / Тихий режим (party.htm + ruhe.htm) 4: Текущая скорость вентилятора / Режим (info.htm) 5: Профиль посленагрева (nachheiz.htm) 6: Программа отпуска (urlaub.htm) 7: Данные устройства / Серийный номер и т. д. (tinfo.htm) 8: Состояние системы (режим работы, скорость вентилятора, текущая температура) (anzeig.htm) 9: Недельная программа (woche.htm) 10: Сетевые настройки (IP, DNS и т. д.) (web.htm) 11: Время / Часы работы предварительного нагрева и т. д. (syst.htm) 12: Конфигурация устройства / Смена фильтра / Управление байпасом (gaer.htm) 13: Напряжение вентиляторов (luft.htm) 14: Конфигурация датчиков (fueh.htm) 15: Смена пароля (lost.htm) 16: Обзор ошибок (fehl.htm) 17: 931:

## Обсуждение и вопросы
https://forum.iobroker.net/topic/47762/test-helios-kwl-v0-0-x

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-05-10)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 0.1.0 (2024-04-17)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.0.1
* (iobroker-community-adapters) initial release

## License
MIT License

Copyright (c) 2021-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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