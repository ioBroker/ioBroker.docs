---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zoe2/README.md
title: iobroker.zoe2
hash: xATBsHPQs9reFoRoo/mvwZcvKKOax41Is81G+jX0Plc=
---
![Логотип](../../../en/adapterref/iobroker.zoe2/admin/zoe.png)

![Статус сборки](https://travis-ci.org/fungus75/ioBroker.zoe2.svg?branch=master)
![Известные уязвимости](https://snyk.io/test/github/fungus75/ioBroker.zoe2/badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zoe2.svg)
![Лицензия](https://img.shields.io/github/license/fungus75/ioBroker.zoe2)

# Iobroker.zoe2
=================

** Тесты: **

** Загрузки **

**Лицензия:**

** Особенности: ** [![Запросы функций] (https://feathub.com/fungus75/ioBroker.zoe2?format=svg)](https://feathub.com/fungus75/ioBroker.zoe2)

Простой адаптер ioBroker-Adapter для получения некоторых базовых значений от Renault ZOE и использования его в ioBroker.

ВАЖНЫЙ!!! ЕСЛИ ВЫ ОБНОВЛЯЕТЕСЬ С ВЕРСИИ ДО 0.2.2, ВЫ ДОЛЖНЫ ПОВТОРИТЬ ПАРОЛЬ, ПОТОМУ ЧТО, НАЧИНАЯ С 0.2.2 ПАРОЛЬ СОХРАНЕН ЗАШИФРОВАННЫМ !!!

ПОЖАЛУЙСТА, ОБРАТИТЕ ВНИМАНИЕ: В ЭТОМ АДАПТЕРЕ ИСПОЛЬЗУЕТСЯ тот же API, что и в МОЕМ ПРИЛОЖЕНИИ RENAULT. НО ВЫ ДОЛЖНЫ НАСТРОИТЬ МОЕ ПРИЛОЖЕНИЕ RENAULT ДЛЯ РАБОТЫ ПЕРЕД ИСПОЛЬЗОВАНИЕМ ДАННОГО АДАПТЕРА. т.е. на Android: https://play.google.com/store/apps/developer?id=RENAULT+SAS - если вы хотите использовать старый api, используйте https://github.com/fungus75/ioBroker.zoe вместо.

ПОЖАЛУЙСТА, ОБРАТИТЕ ВНИМАНИЕ: ЭТО ОЧЕНЬ РАННЕЕ СОСТОЯНИЕ РАЗРАБОТКИ, ИСПОЛЬЗОВАНИЕ СОБСТВЕННОГО РИСКА

ПОЖАЛУЙСТА, ОБРАТИТЕ ВНИМАНИЕ: ПОСЛЕ ЛЮБОГО ОБНОВЛЕНИЯ АДАПТЕРА ПЕРЕЙДИТЕ НА ЭКРАН НАСТРОЙКИ, ИЗМЕНИТЕ ЧТО-ТО, ЧТО СОХРАНЕНИЕ ВКЛЮЧЕНО, ИЗМЕНИТЕ ЕГО НАЗАД И НАЖМИТЕ СОХРАНИТЬ!

Если этот адаптер недоступен в ioBroker-Admin-View, используйте следующую команду для его установки (из командной строки на вашем ioBroker-Server):

```npm install https://github.com/fungus75/ioBroker.zoe2/tarball/master/```

Или вы можете использовать кнопку GitHub (с надписью: установить с собственного URL-адреса) в представлении адаптера и ввести этот URL-адрес на вкладке «Другое». Это также можно использовать для обновления до текущей версии адаптера:

```https://github.com/fungus75/ioBroker.zoe2/tarball/master/```

(если этот URL-адрес не работает, используйте вместо него https://github.com/fungus75/ioBroker.zoe2.git)

Вы можете использовать этот метод для обновления адаптера до самой последней версии.

После этого адаптер должен появиться в ioBroker-Admin-View.

### Конфигурация
- Вы должны установить имя пользователя, пароль и VIN, как вы это делали в моем приложении renault
- Эти локали ("Laenderversionen") в настоящее время работают: de_DE
- Возможно, вам понадобится My-Z.E.Connect или аналогичные услуги от Renault, чтобы использовать это
- После сохранения на создание объектов (zoe.0 и т. Д.) Ушло около 15 минут.

### Функции
- Прочтите эти параметры у Зои:
   - charge_level в процентах
   - зарядка как логическая
   - подключен как логический
   - оставшийся запас хода в километрах
   - оставшееся время зарядки
   - расчетная конечная точка зарядки (charge_finished_at)
   - температура батареи
   - внешняя температура (не очень точная)
   - зарядка
   - емкость батареи
   - батареяAvailableEnergy
   - gpsLatitude и gpsLongitude, работает только на новых ZOE
- Напишите эти параметры:
   - preconNow: запускает precon / hvac (напишите true в этот узел или нажмите кнопку)
   - chargeCancel: прекращает зарядку
   - chargeEnable: включает зарядку

Контрольная зарядка:

С помощью двух кнопок chargeCancel и chargeEnable можно управлять функциями зарядки. Если нажать chargeCancel (или в этот параметр записано true), функция зарядки отключена. ZOE не должен заряжать, если к нему подключен шнур питания. На моем ZOE 1-го поколения это не действует, так что, может быть, это работает на новых ZOE?

Как только будет нажата chargeEnable (или в этот параметр записано true) функция зарядки должна снова заработать.

Как это сделать: chargeEnable создает расписание зарядки, которое начинается в час, который вы указали на экране настройки, каждый день и длится 15 минут. Похоже, это самая короткая сумма, которую нужно установить. Отключение полной зарядки невозможно с текущим API (или теми частями текущего API, которые известны).

Некоторые параметры работают только с новыми ZOE.

### Тестируйте со следующими ZOE:
- Зои Фаза 2 (Спасибо, Джек-РК-24)
- Zoe R210 (1-е поколение, протестировано грибком75)
- Zoe R90 (Спасибо arturwolf)

### Пожалуйста, обрати внимание!!
Связь с ZOE или Renault-Services осуществляется только в интервале времени в 10 минут.
Поэтому, если вы нажмете preconNow или chargeNow, потребуется до следующего интервала, чтобы отправить его в ZOE, и потребуется до следующего интервала, чтобы вернуть статус.

Новый ZOE API от Renault кажется очень кружевным. Это означает, что он показывает новые ценности только тогда, когда есть что-то важное.
Насколько я понял, самое главное - это уровень заряда батареи. Это означает, что я внешняя температура не обновляется, если машина стоит дома. Только если i.E. ZOE заряжается, внешняя температура обновляется. Если зарядка завершена, новых обновлений по-прежнему нет. Во время вождения уровень заряда батареи становится все ниже и ниже, поэтому он должен обновляться очень регулярно.

### Спасибо
https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-ins-smarthome-integrieren, https://michael-heck.net/index.php/elektromobilitaet/renault-zoe-im-smarthome- neue-api-2020, https://muscatoxblog.blogspot.com/2019/07/delving-into-renaults-new-api.html, https://github.com/edent/Renault-Zoe-API, https://github.com/jamesremuscat/pyze и https://github.com/hacf-fr/renault-api за отличную документацию и работу.

## Changelog

### 0.2.3 (2021-07-29)
- Code Adjustments, Error-Handling


### 0.2.2 (2021-07-26)
- Store Password Encrypted (You have to reset it, if updating from older version)

### 0.2.1 (2021-07-23)
- Code optimisation 

### 0.2.0 (2021-02-12)
- Adapter supports compact mode (required if adapter should be listed in official repo)

### 0.1.5 (2021-02-09)
- bugfix gigya parameter changed https://github.com/fungus75/ioBroker.zoe2/issues/17

### 0.1.4 (2021-02-05)
- added: kamereonapikey as setup parameter because it changed by Feb. 1st
- added: stopChargeWorkaroundHour: Because the API has no feature to stop charging, the stop-charging button starts scheduled charging to a very uncommon time. Configure the hour with that parameter
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/15
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/16
- bugfix https://github.com/fungus75/ioBroker.zoe2/issues/14

### 0.1.3 (2020-11-17)
- added: setup-value useHVACApi, see https://github.com/fungus75/ioBroker.zoe2/issues/10

### 0.1.2 (2020-07-28)
- changed: call charge-start API when "pressed" chargeEnable. Hopefully it helps on older ZOEs

### 0.1.1 (2020-07-18)
- added chargeCancel and chargeEnable. See "controll charging"

### 0.1.0 (2020-07-03)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/6, thanks to https://github.com/damack

### 0.0.9 (2020-06-25)
- added: getLocation can be turned on/off in config (useful for older ZOEs which do not allow getLocation)

### 0.0.8 (2020-06-18)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/2
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/3

### 0.0.7 (2020-06-18)
- bugfix: https://github.com/fungus75/ioBroker.zoe2/issues/2
- added: gpsLatitude
- added: gpsLongitude 

### 0.0.6 (2020-04-30)
- added: chargingPower
- added: batteryCapacity
- added: batteryAvailableEnergy
- changed: Using battery-status v2 API (supplies better values for newer ZOEs, thanks Jack-RK-24 for testing)

### 0.0.5 (2020-04-29)
- added: config-paramter ignore API error (when set, the Adapter tries to ignore some API-Errors)

### 0.0.4 (2020-04-21)
- added: preconNow => starts precon (hvac)

### 0.0.3 (2020-04-16)
- added: totalMileage

### 0.0.2 (2020-04-15)
- first working version for github
- reads out some values (as shown in the Features list)

### 0.0.1 (2020-04-06)
- nonworking version, just to create initial repo on github
- code taken 1:1 from iobroker.zoe
- small adjustments, first access to the new renault api

## License
The MIT License (MIT)

Copyright (c) 2021 RenePilz <rene@pilz.cc>

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