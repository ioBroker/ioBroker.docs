---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bayernluft/README.md
title: ioBroker.bayernluft
hash: +pFLTezSZnJSQN9tjHBUjPa7gBY5GeVRCrZ6S1iujGo=
---
![Логотип](../../../en/adapterref/iobroker.bayernluft/admin/bayernluft.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.bayernluft.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bayernluft.svg)
![Количество установок](https://iobroker.live/badges/bayernluft-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/bayernluft-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.bayernluft.png?downloads=true)

# IoBroker.bayernluft
**Тесты:** ![Тест и выпуск](https://github.com/iobroker-community-adapters/ioBroker.bayernluft/workflows/Test%20and%20Release/badge.svg)

## Адаптер BayernLuft для ioBroker
Подключает вентиляционное устройство производства [БаварияЛюфт](https://www.bayernluft.de/) к системам ioBroker.

## Отказ от ответственности
**Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками их соответствующих владельцев. Их использование не подразумевает какой-либо связи или одобрения ими или любыми связанными дочерними компаниями! Этот личный проект поддерживается в свободное время и не имеет бизнес-целей.**

## Что нужно сделать?
Чтобы использовать этот адаптер, вам необходимо изменить шаблон экспорта устройства.
**Обязательно выполните следующие действия**

## Как изменить шаблон?
1. Перейдите в веб-интерфейс вашего устройства.
2. Нажмите на значок шестеренки «Настройки», чтобы перейти в «Настройки».
3. Прокрутите вниз, пока не увидите режим эксперта.
4. Загрузите файл «export_iobroker.txt» из этого репозитория github.
8. Готово, настройте устройство в экземпляре адаптера. Стандартный порт устройства — 80.

## Приятно знать
Команды commands.setSpeedIn, commands.setSpeedOut, commands.setSpeedAntiFreeze работают только при выключенном устройстве. Если устройство включено, команды распознаются устройством, но ничего не происходит (можно проверить вручную в соответствующих состояниях states.speed_in, states.speed_out и states.speed_antifreeze)

## Кредиты
Этот адаптер не был бы возможен без отличной работы @Marco15453 (https://github.com/Marco15453), который создал V1.x.x этого адаптера.
Также большое спасибо компании Bayernluft за их отличную поддержку

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.0 (2025-02-24)
* (boriswerner) **Breaking Change:** All states from the 2.alpha versions have been removed and the adapter has been completely redesigned. The Bayernlüfter devices need a new export configuration file. Please upload export_iobroker.txt to each of your devices and delete old states.
* (mcm1957) Adapter requires node.js 20, js-controller 6 and admin 7 now.
* (boriswerner) Commands have been implemnted for individual fan speeds (see  WS32240427 in https://www.bayernluft.de/de/wlan32_changelist.html):
    When device is turned off, the fans can be set individually (commands: setSpeedIn, setSpeedOut, setSpeedAntiFreeze)
* (boriswerner) States in "states"-folder have been set to read-only
* (boriswerner) Roles of states have been changed
* (boriswerner) Update interval label and set default port have been fixed
* (mcm1957) Missing values from device are set to null and qs flag is set to 0x82 now
* (mcm1957) Units have been added where appropiate
* (mcm1957) Translations have been added for all supported languages
* (mcm1957) Dependencies have been updated

### 2.0.1 (2025-01-16)
* (mcm1957) AdminUI and translations have been fixed.

### 2.0.0 (2025-01-14)
* (mcm1957) Adapter requires node.js 20, js-controller 6 and and admin 6 now.
* (boriswerner) Corrected the API calls to match the new API (rev 2.0 version WS32231301, see: https://www.bayernluft.de/de/wlan32_changelist.html)
* (boriswerner) Corrected the ACK-handling in onStateChange
* (mcm1957) Adapter has been move to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

## License
MIT License

Copyright (c) 2024-2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2022 Marco15453 <support@marco15453.xyz>

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