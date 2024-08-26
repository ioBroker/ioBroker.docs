---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: rSqt+4ME/KdGYXT7BTGsggsZ6MB8OeKxyqAwxVq0y3I=
---
![Стабильная версия](http://iobroker.live/badges/sureflap-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![Количество установок (последнее)](http://iobroker.live/badges/sureflap-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

# IoBroker.sureflap
![Тест и выпуск](https://github.com/Sickboy78/ioBroker.sureflap/workflows/Test%20and%20Release/badge.svg)

## Адаптер для умных устройств для домашних животных от Sure Petcare®
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p> <p align="center"> <img src="/admin/Sure_Petcare_Surefeed_Feeder_Connect.png" /> <img src="/admin/Sure_Petcare_Felaqua_Connect.png" /> </p>

## Конфигурация
Добавьте имя пользователя и пароль от вашей учетной записи Sure Petcare® на странице конфигурации адаптера.

Также пороги полного и пустого заряда батареи могут быть адаптированы здесь при использовании аккумулятора. Это влияет на процентные значения батареи.

## Описание
Адаптер предоставляет информацию о настройках и состоянии дверцы для домашних животных, дверцы для кошек, кормушки или поилки.

Он также показывает местонахождение ваших питомцев и потребление ими еды и воды (при наличии кормушки и/или поилки).

Он позволяет вам контролировать режим блокировки и комендантский час вашей двери, а также устанавливать местоположение ваших питомцев.

Для адаптера требуется Node 18 или более новая версия.

### Изменяемые значения
Следующие состояния можно изменить, и они вступят в силу на вашем устройстве и соответственно будут отражены в вашем приложении Sure Petcare®.

| состояние | описание | допустимые значения |
|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| имя_дома.имя_хаба.управление.режим_светодиодов | устанавливает яркость светодиодов хаба | **0** - выключено<br> **1** - высокий<br> **4** - затемненный |
| имя_домохозяйства.имя_концентратора.имя_флапа.control.curfew_enabled | включает или отключает настроенный комендантский час | **true** или **false** |
| имя_домохозяйства.имя_концентратора.имя_флапа.контроль.текущий_курфю | устанавливает текущий_курфю,<br> поддерживает 1 (дверца для домашних животных) или до 4 (дверца для кошек) времен комендантского часа | **[{&quot;enabled&quot;:true\|false, &quot;lock_time&quot;:&quot;xx:xx&quot;, &quot;unlock_time&quot;:&quot;xx:xx&quot;}, ...]** |
| имя_домохозяйства.имя_концентратора.имя_флапа.контроль.lockmode | устанавливает режим блокировки | **0** - открыто<br> **1** - зафиксировать<br> **2** - блокировка<br> **3** - закрыто (запирается и выключается) |
| имя_дома.имя_концентратора.имя_флапа.назначенные_питомцы.имя_питомца.контроль.тип | устанавливает тип питомца для назначенного питомца и флапа | **2** - питомец на улице<br> **3** - домашнее животное |
| имя_домохозяйства.имя_концентратора.имя_кормушки.контроль.закрытие_задержки | устанавливает задержку закрытия крышки кормушки | **0** - быстро<br> **4** - нормальный<br> **20** - медленно |
| имя_дома.домашние_питомцы.имя_питомца.внутри | устанавливает, находится ли ваш питомец внутри | **истина** или **ложь** |

### Структура
Адаптер создает следующую иерархическую структуру:

адаптер<br> ├ имя_домохозяйства<br> │ ├ имя_хаба<br> │ │ ├ онлайн<br> │ │ ├ серийный_номер<br> │ │ ├ сигнал<br> │ │ │ ├ устройство_rssi<br> │ │ │ └ hub_rssi<br> │ │ ├ версия<br> │ │ │ ├ прошивка<br> │ │ │ └ аппаратное обеспечение<br> │ │ ├ контроль<br> │ │ │ └ светодиодный_режим<br> │ │ ├ felaqua_name<br> │ │ │ ├ аккумулятор<br> │ │ │ ├ процент_заряда_батареи<br> │ │ │ ├ онлайн<br> │ │ │ ├ серийный_номер<br> │ │ │ ├ сигнал<br> │ │ │ │ ├ устройство_rssi<br> │ │ │ │ └ hub_rssi<br> │ │ │ ├ версия<br> │ │ │ │ ├ прошивка<br> │ │ │ │ └ аппаратное обеспечение<br> │ │ │ ├ назначенные_питомцы<br> │ │ │ │ └ имя_питомца<br> │ │ │ └ вода<br> │ │ │ ├ процент_заполнения<br> │ │ │ ├ последний_заполненный_в<br> │ │ │ └ вес<br> │ │ ├ имя_кормушки<br> │ │ │ ├ аккумулятор<br> │ │ │ ├ процент_заряда_батареи<br> │ │ │ ├ онлайн<br> │ │ │ ├ серийный_номер<br> │ │ │ ├ сигнал<br> │ │ │ │ ├ устройство_rssi<br> │ │ │ │ └ hub_rssi<br> │ │ │ ├ версия<br> │ │ │ │ ├ прошивка<br> │ │ │ │ └ аппаратное обеспечение<br> │ │ │ ├ назначенные_питомцы<br> │ │ │ │ └ имя_питомца<br> │ │ │ ├ миски<br> │ │ │ │ └ 0..1<br> │ │ │ │ ├ процент_заполнения<br> │ │ │ │ ├ тип_еды<br> │ │ │ │ ├ последний_заполненный_в<br> │ │ │ │ ├ Последний_ноль_в<br> │ │ │ │ ├ цель<br> │ │ │ │ └ вес<br> │ │ │ └ контроль<br> │ │ │ └ закрыть_задержку<br> │ │ └ имя_лоскута<br> │ │ ├ аккумулятор<br> │ │ ├ процент_заряда_батареи<br> │ │ ├ комендантский час_активный<br> │ │ ├ последний_включенный_комендантский час<br> │ │ ├ онлайн<br> │ │ ├ серийный_номер<br> │ │ ├ контроль<br> │ │ │ ├ комендантский час_включен<br> │ │ │ ├ текущий_комендантский час<br> │ │ │ └ режим блокировки<br> │ │ ├ сигнал<br> │ │ │ ├ устройство_rssi<br> │ │ │ └ hub_rssi<br> │ │ ├ версия<br> │ │ │ ├ прошивка<br> │ │ │ └ аппаратное обеспечение<br> │ │ └ назначенные_питомцы<br> │ │ └ имя_питомца<br> │ │ └ контроль<br> │ │ └ тип<br> │ ├ история<br> │ │ └ json<br> │ │ └ 0..24<br> │ └ домашние животные<br> │ └ имя_питомца<br> │ ├ внутри<br> │ ├ имя<br> │ ├ с тех пор<br> │ ├ еда<br> │ │ ├ последний_раз_съеденный<br> │ │ ├ время_затрачено<br> │ │ ├ раз_съедено<br> │ │ └ сухой..мокрый<br> │ │ └ вес<br> │ ├ движение<br> │ │ ├ последнее_направление<br> │ │ ├ последний_флап<br> │ │ ├ последний_флап_id<br> │ │ ├ последний_раз<br> │ │ ├ время_проведенное_на_внешнем_ пространстве<br> │ │ └ время_на улице<br> │ └ вода<br> │ ├ последний_раз_пьяный<br> │ ├ время_затрачено<br> │ ├ раз_пьяный<br> │ └ вес<br> └ информация<br> ├ все_устройства_онлайн<br> ├ соединение<br> ├ последнее_обновление<br> └ версия<br>

## Примечания
SureFlap®, Sure Petcare® и Felaqua® являются зарегистрированными товарными знаками [SureFlap Ltd.](https://www.surepetcare.com/)

Фотографии устройств SureFlap® предоставляются бесплатно для использования с сайта [Конечно Petcare®](https://www.surepetcare.com/en-us/press).

## Changelog

### 2.2.1 (2024-08-11)

* (Sickboy78) added new data to feeder
* (Sickboy78) added new data to water dispenser
* (Sickboy78) dependency updates

### 2.2.0 (2024-07-25)

* (Sickboy78) added new json curfew
* (Sickboy78) added new json history
* (Sickboy78) fix lock mode is undefined
* (Sickboy78) code cleanup and refactoring
* (Sickboy78) dependency updates

### 2.1.2 (2024-06-02)

* (Sickboy78) dependency updates

### 2.1.1 (2024-02-25)

* (Sickboy78) bugfix for outside times not beeing shown

### 2.1.0 (2024-02-20)

* (Scrounger) option to enable history data
* (Sickboy78) added number of history entries to configuration

### 2.0.2 (2024-02-17)

* (Sickboy78) added flap id to last movement
* (Sickboy78) fixed a bug where hub was recognized as obsolete device because of same name as a device
* (Sickboy78) fixed a bug where setting lockmode or curfew was not working because of flap having same name as the hub

### 2.0.1 (2024-01-24)

* (Sickboy78) added last movement for pets
* (Sickboy78) added time spent outside today for pets
* (Sickboy78) dependency updates

### 1.2.3 (2023-12-29)

* (Sickboy78) added api host to config and set default to new api
* (Sickboy78) improved removing of obsolete objects

### 1.2.2 (2023-10-17)

* (Sickboy78) added signal strength and hardware and firmware version of devices

### 1.2.1 (2023-10-03)

* (Sickboy78) fixed get_history_since call failing because of API changes
* (Sickboy78) added workaround for removed parent object because of API changes
* (Sickboy78) removed wrongly created objects because of API changes

### 1.2.0 (2023-08-19)

* (Sickboy78) repetitive errors are now logged as debug to avoid spamming the error log
* (Sickboy78) increased timeout for surepet API from 60 to 120 seconds
* (Sickboy78) added removal of deleted or renamed pets
* (Sickboy78) security updates

### 1.1.9 (2023-07-21)

* (Sickboy78) fixed undefined serial number
* (Sickboy78) dependency updates

### 1.1.8 (2023-06-01)

* (Sickboy78) adjustments for Surepet API changes

### 1.1.7 (2023-03-13)

* (Sickboy78) fixed false login error in case pet had no photo

### 1.1.6 (2023-01-07)

* (Sickboy78) added battery voltage configuration
* (Sickboy78) added translation for adapter settings
* (Sickboy78) security updates

### 1.1.5 (2022-09-10)

* (Sickboy78) added display of serial numbers

### 1.1.4 (2022-09-07)

* (Sickboy78) added Felaqua support
* (Sickboy78) improved battery and battery percentage indicator (reduced outliers)

### 1.1.3 (2022-03-28)

* (Sickboy78) code improvements
* (Sickboy78) improved error handling if no pet has been assigned yet

### 1.1.2 (2022-03-06)

* (Sickboy78) improved error and timeout handling
* (Sickboy78) optimized subscribed states

### 1.1.1 (2022-02-20)

* (Sickboy78) removed pet type control from pet flap (is a cat flap exclusive feature)
* (Sickboy78) fixed wrong default value for info.last_update
* (Sickboy78) testing updates for js-controller 4
* (Sickboy78) security updates

### 1.1.0 (2022-01-17)

* (Sickboy78) bugfix and security updates

### 1.0.9 (2022-01-05)

* (Sickboy78) removed old encrypt/decrypt from index_m
* (Sickboy78) added adapter unloaded guard in case unload happens during data requests

### 1.0.8 (2021-11-22)

* (Sickboy78) added food type, target weight and remaining food in feeder
* (Sickboy78) added todays pet food consumption, times eaten and time spent

### 1.0.7 (2021-11-02)

* (Sickboy78) added history
* (Sickboy78) added last update time

### 1.0.6 (2021-09-12)

* (Sickboy78) added feeder support (closing delay of lid)
* (Sickboy78) added led control for hub
* (Sickboy78) added assigned pets for flap and feeder devices
* (Sickboy78) added pet type control (indoor or outdoor) for assigned pets for flap devices
* (Apollon77) update CI testing

### 1.0.5 (2021-04-25)

* (Sickboy78) fixed bug in case pets didn't have a position (e.g. no flaps, only feeder in use)

### 1.0.4 (2021-03-07)

* (Sickboy78) added state curfew_active for pet flap devices
* (Sickboy78) fixed normalization of device names
* (Sickboy78) fixed changeable values not resetting when change fails

### 1.0.3 (2021-02-28)

* (Sickboy78) code improvements from review
* (Sickboy78) fixed timezone bug

### 1.0.2 (2021-02-25)

* (Sickboy78) fixed bug setting lockmode and inside values

### 1.0.1 (2021-02-19)

* (Sickboy78) initial release

## License

MIT License

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

Copyright (c) 2024 Sickboy78 <asmoday_666@gmx.de>