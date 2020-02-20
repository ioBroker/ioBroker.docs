---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lupusec/README.md
title: ioBroker.lupusec
hash: 28EbynNRDbIp+fW+vSFfE6tmF/G1bZAGai4HpgQ13HY=
---
![логотип](../../../en/adapterref/iobroker.lupusec/admin/lupusec.png)

![Travis Build Status](https://travis-ci.org/schmupu/ioBroker.lupusec.svg?branch=master)
![AppVeyor Статус сборки](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.lupusec?branch=master&svg=true)
![Стабильная версия](http://iobroker.live/badges/lupusec-stable.svg)
![Количество установок](http://iobroker.live/badges/lupusec-installed.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.lupusec.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lupusec.svg)
![NPM](https://nodei.co/npm/iobroker.lupusec.png?downloads=true)

# IoBroker.lupusec
** Требуется node.js 8.0 или выше и Admin v3! **

Этот адаптер соединяет систему сигнализации Lupusec XT1 Plus, XT2, XT2 Plus и XT3 с ioBroker.
XT1 (без плюса) не будет поддерживаться. Вы можете прочитать состояние датчиков Lupusec, таких как датчики дверей, окон, воды, дыма, а также состояние системы охранной сигнализации.
Например, вы можете включить выключатели, управлять затвором и ставить / снимать с охраны сигнализацию.

Вы можете найти подробную информацию здесь: [волчанка](https://www.lupus-electronics.de/en)

## Установка
1. Установите адаптер

Самый простой способ - настроить адаптер lupusec.iobroker через адаптер обнаружения в ioBroker. Адаптер обнаружения ищет правильный IP-адрес охранной системы Lupusec. Другой способ это настроить вручную

2. Ручная настройка адаптера

Выберите IP-адрес или имя хоста в системе сигнализации Lupusec. Выберите https (рекомендуется), если это возможно.
Только для чтения статуса выберите пользователя без прав записи. Если вы хотите изменить статус (например, включить / выключить свет или включить / выключить будильник), выберите пользователя с правом записи.
![admin_main](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin.png) Если к вашей охранной системе Lupusec подключены камеры видеонаблюдения, вы можете предоставить их в ioBroker. Адаптер Lupusec находит все кулачки Lupusec самостоятельно. Вы должны ввести адрес (ваш IP-адрес ioBroker или 0.0.0.0) и порт для последующего подключения к кулачкам.
![admin_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_webcam.png) Если у вас есть устройство открывания двери Nuki, подключенное к вашей системе сигнализации Lupusec, вы можете использовать его и в ioBroker. В меню администратора экземпляра ioBroker вы можете ввести датчик двери Lupusec, который установлен на двери Nuki. Если вы сейчас откроете дверь, на которой установлен Nuki, у вас будет дополнительное состояние «дверь открыта», а не «разблокирована». Если у вас нет дверного датчика Lupusec на двери Nuki, вы увидите только состояния «заблокирован» или «заблокирован».
![admin_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_admin_nuki.png)

По умолчанию все устройства Lupusec будут отображаться на вкладке объекта ioBroker.
Полностью поддерживаются и индивидуально адаптируются следующие устройства:

  - Дверной контакт / оконный контакт (Тип 4)
  - Датчик воды (Тип 5)
  - Кнопка паники (тип 7)
  - Детектор движения / детектор движения 360 градусов (Тип 9)
  - Датчик СО (Тип 13)
  - детектор дыма / детектор тепла (тип 14)
  - Датчик температуры V2 (тип 20)
  - Сирена внутри (Тип 21)
  - Индикатор состояния / мини крытая сирена (тип 22)
  - Выключатель питания (тип 24)
  - 1-канальное реле с ретранслятором ZigBee (тип 24)
  - 2-х канальное реле с ретранслятором ZigBee (тип 24)
  - Repater V2 (Тип 26)
  - клавиатура (тип 37)
  - Датчик стекла (Тип 39)
  - Сирена внутри (Тип 45)
  - Сирена снаружи (Тип 48)
  - Метр выключателя питания (тип 48)
  - Электросчетчик (Тип 50)
  - комнатный датчик V1 (тип 54)
  - ЖК-датчик температуры (тип 54)
  - Мини температура (Тип 54)
  - Нуки открывания дверей (тип 57)
  - Тепловой извещатель (Тип 58)
  - диммер (тип 66)
  - выключатель света V2 (тип 66)
  - Оттенок (Тип 74)
  - Рольставни, реле V1 (Тип 76)
  - Радиаторный термостат (Тип 79)
  - Радиаторный термостат V2 (Тип 79)
  - Датчик света (Тип 78)
  - Переключатель сценария V2 (тип 81)
  - Датчик удара (Тип 93)
  - детектор дыма V2 (тип 14)
  - Внутреннее реле с диммером V3 (тип 66)

Поддерживаются два состояния apple_home_a1 и lupusec.0.status.apple_home_a2 для адаптера Apple Homekit. В дополнение к состояниям lupusec вы можете включить и выключить сигнализацию для зон 1 и 2.

Если у вас есть устройство, которого нет в списке выше, свяжитесь со мной по адресу Thorsten Stueben <thorsten@stueben.de>.

## Объекты
### Lupusec Status
ioBroker предлагает вам те же объекты статуса, что и в приложении Lupusec.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_status.png)

### Lupusec Devices
Вы найдете все поддерживаемые датчики и устройства Lupsec в разделе «устройства». Если устройство отсутствует, пожалуйста, свяжитесь со мной.
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices.png) Детальный вид датчика или устройства. В этом примере вы видите датчик CO. При тревоге CO состояние «alarm_status_ex» меняется на «истина», а «alarm_status» меняется на «CO».
![lupusec_obj_status](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_devices_type09.png)

### Lupusec Веб-камеры
Вы найдете все подключенные камеры наблюдения в разделе «Веб-камеры». Вы можете скопировать ссылку, указанную в состоянии «изображение» и «поток», в свой веб-браузер для открытия.
![lupusec_obj_webcam](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_webcam.png)

### Lupusec Nuki
Вы открываете дверной проем Nuki под «устройствами», такими как устройства Lupusec. Нуки обеспечивает 2 состояния. Состояние nuki_state показывает вам фактическое состояние устройства открывания двери Nuki, например, дверь заблокирована или разблокирована. С состоянием nuki_action вы можете открывать, блокировать или открывать вашу дверь.
![lupusec_obj_nuki](../../../en/adapterref/iobroker.lupusec/docs/en/img/lupusec_obj_nuki.png)

## Строганные
В будущем планируется следующее:

* поддержка большего количества датчиков / устройств
* написание документации для каждого датчика / устройства

## Changelog

### 1.2.5 (21.01.2019)
* (Stübi) Change logic to get faster sensor states

### 1.2.4 (09.01.2019)
* (Stübi) Add device: temperature sensor v2

### 1.2.3 (06.09.2019)
* (Stübi) Add device: Repeater V2
* (Stübi) Add device: Siren inside (Battery version without Zigbee repeater)

### 1.2.1 (14.10.2019)
* (Stübi) Bugfixing (Issue #9)
* (Stübi) Bugfixing: if the name of a device is empty, the name was changed all the time between NaN and ''  

### 1.2.0 (13.09.2019)
* (Stübi) Changing error handling of adapter
* (Stübi) Add Nuki door opener

### 1.1.9 (06.09.2019)
* (Stübi) Add device: Smoke detector V2
* (Stübi) Add device: Inwall relay with dimmer V3

### 1.1.8 (10.06.2019)
* (Stübi) Add device: 360 PIR motion sensor
* (Stübi) Add device: electric meter
* (Stübi) Add device: LCD temperature sensor
* (Stübi) Add device: mini temperature sensor

### 1.1.7 (06.05.2019)
* (Stübi) Enhancement: optimizing webcam support

### 1.1.6 (01.05.2019)
* (Stübi) New feature: you can change the buttons for keypad
* (Stübi) New feature: add push notifications to sensors
* (Stübi) New feature: change switch from switch to push button 
* (Stübi) New feature: now you can change status for tamper, bypass and reporting for sensors
* (Stübi) New feature: Webcam support. You can get the link of Lupusec provided webcams.
* (Stübi) New feature: you can edit the on/off timer for shutters 
* (Stübi) New feature: Discription of states are now in English or German available
* (Stübi) Bugfixing: HUE and saturation of HUE devices fixed 
* (Stübi) Bugfixing: Add role to button 4 of scenario switch.  

### 1.1.5 (24.04.2019)
* (Stübi) New feature: Add buttons for Scenario Switch V2
* (Stübi) Bugfixing: Various improvements

### 1.1.4 (13.04.2019)
* (Stübi) Add device outside alarm
* (Stübi) Add device inside alarm
* (Stübi) Add device PIR motions sensor V2
* (Stübi) Add device glass sensor

### 1.1.3 (10.04.2019)
* (Stübi) New Logo
* (Stübi) Add device Panic Button
* (Stübi) Add status indicator 
* (Stübi) Add sensor Heat detector
* (Stübi) Add shock sensor 
* (Stübi) Add Light Switch V2
 
### 1.1.2 (06.04.2019)
* (Stübi) Add light sensor 
* (Stübi) Add CO sensor
* (Stübi) Add water sensor V2
* (Stübi) Add Radiator thermostat V2
* (Stübi) Add 1 channel relay with ZigBee repeater (Type 24)
* (Stübi) Add 2 channel relay with ZigBee repeater (Type 24)
* (Stübi) If you change the sensor name in the Lupusec App, it will be change in ioBroker too 
* (Stübi) Bugfixing Radiator thermostat V1/V2
* (Stübi) Bugfixing Dimmer
* (Stübi) Bugfixing PD Status (Timer) for relay, power switch
* (Stübi) Bugfixing status switch for rollter/shutter device

### 1.1.1 (27.03.2019)
* (Stübi) Lupusec alarm online status added

### 1.1.0 (23.03.2019)
* (Stübi) Totally redesign of the Lupusec adapter. Node 8 or higher is now required

### 1.0.0 (22.12.2018)
* (Stübi) Support js-controller compact mode
* (Stübi) Changed core adapter
* (Stübi) Add Light sensor (type 78)
* (Stübi) Add Apple home alarm status
* (Stübi) Add dimmer / relais (type 66)
* (Stübi) Bugfixing and new status alarm_ex
* (Stübi) Bugfixing and changing of the polling mechanism
* (Stübi) password will be encrypted. Translation of configuration
* (Stübi) add debug messages
* (Stübi) Hue, room sensor, power switch added
* (Stübi) Fixing error update function
* (Stübi) Improvements and new add/del/update Object function
* (Stübi) Changes of roles and icons added to devices
* (Stübi) Wrong device description removed
* (Stübi) RSSI Status an Device shutter (type 76) supported
* (Stübi) Devices thermostat (type 79) and switch (type 48) supported
* (Stübi) Directory widged deleted
* (Stübi) Port can be added

## License
The MIT License (MIT)

Copyright (c) 2019-2020 Thorsten Stueben <thorsten@stueben.de>

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