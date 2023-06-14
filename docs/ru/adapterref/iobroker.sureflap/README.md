---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: TdDuowa721DZjQPbC8KSYgVBvO1rHTDrLlYryfVNftI=
---
![Стабильная версия](http://iobroker.live/badges/sureflap-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![Количество установок (последние)](http://iobroker.live/badges/sureflap-installed.svg)
![Известные уязвимости](https://snyk.io/test/github/Sickboy78/ioBroker.sureflap/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center"> <img src="admin/sureflap.png" /> </p>

# IoBroker.sureflap
![Тестируйте и выпускайте](https://github.com/Sickboy78/ioBroker.sureflap/workflows/Test%20and%20Release/badge.svg)

## Адаптер для умных устройств для домашних животных от Sure Petcare®
<p align="center"> <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" /> </p> <p align="center"> <img src="/admin/Sure_Petcare_Surefeed_Feeder_Connect.png" /> <img src="/admin/Sure_Petcare_Felaqua_Connect.png" /> </p>

## Конфигурация
Добавьте имя пользователя и пароль из своей учетной записи Sure Petcare® на странице конфигурации адаптера.

Кроме того, здесь можно настроить пороги полного и разряженного аккумулятора при использовании accus. Это влияет на процентное значение заряда батареи.

## Описание
Адаптер предоставляет информацию о настройках и состоянии заслонки для домашних животных, кошачьей заслонки, кормушки или диспенсера для воды.

Он также показывает местонахождение ваших питомцев и их потребление пищи и воды (с кормушкой и/или дозатором воды).

Это позволяет вам контролировать режим блокировки и комендантский час вашего щитка и устанавливать местоположение ваших питомцев.

### Изменяемые значения
Следующие состояния могут быть изменены и вступят в силу на вашем устройстве, соответственно, они будут отражены в вашем приложении Sure Petcare®.

| государство | описание | допустимые значения |
|-------|-------------|----------------|
| house_name.hub_name.control.led_mode | устанавливает яркость светодиодов хаба | **0** - выкл.<br> **1** - высокий<br> **4** - затемненный |
| house_name.hub_name.flap_name.control.curfew | включает или отключает настроенный комендантский час<br> (комендантский час необходимо настроить через приложение) | **правда** или **ложь** |
| house_name.hub_name.flap_name.control.lockmode | устанавливает режим блокировки | **0** - открыто<br> **1** - заблокировать<br> **2** - заблокировать<br> **3** - закрыто (блокировка входа и выхода) |
| имя_домохозяйства.имя_хаба.имя_флапа.назначенные_питомцы.имя_питомца.управление.тип | устанавливает тип питомца для назначенного питомца и щитка | **2** - питомец на улице<br> **3** - домашний питомец |
| house_name.hub_name.feeder_name.control.close_delay | задает задержку закрытия крышки кормушки | **0** - быстро<br> **4** - нормальный<br> **20** - медленно |
| имя_домохозяйства.pets.имя_питомца.внутри | устанавливает, находится ли ваш питомец внутри | **правда** или **ложь** |

### Состав
Адаптер создает следующую иерархическую структуру:

адаптер<br> ├ имя_домохозяйства<br> │ ├ имя_хаба<br> │ │ ├ онлайн<br> │ │ ├ серийный_номер<br> │ │ ├ управление<br> │ │ │ └ led_mode<br> │ │ ├ felaqua_name<br> │ │ │ ├ аккумулятор<br> │ │ │ ├ battery_percentage<br> │ │ │ ├ онлайн<br> │ │ │ ├ серийный_номер<br> │ │ │ ├ назначенные_питомцы<br> │ │ │ │ └ pet_name<br> │ │ │ └ вода<br> │ │ │ └ вес<br> │ │ ├ имя_фидера<br> │ │ │ ├ аккумулятор<br> │ │ │ ├ battery_percentage<br> │ │ │ ├ онлайн<br> │ │ │ ├ серийный_номер<br> │ │ │ ├ назначенные_питомцы<br> │ │ │ │ └ pet_name<br> │ │ │ ├ чаши<br> │ │ │ │ └ 0..1<br> │ │ │ │ ├ food_type<br> │ │ │ │ ├ цель<br> │ │ │ │ └ вес<br> │ │ │ └ управление<br> │ │ │ └ close_delay<br> │ │ └ имя_клапана<br> │ │ ├ батарея<br> │ │ ├ батарея_процент<br> │ │ ├ комендантский час_активный<br> │ │ ├ онлайн<br> │ │ ├ серийный_номер<br> │ │ ├ управление<br> │ │ │ ├ комендантский час<br> │ │ │ └ режим блокировки<br> │ │ ├ комендантский час<br> │ │ │ └ 0..i<br> │ │ │ ├ включен<br> │ │ │ ├ время блокировки<br> │ │ │ └unlock_time<br> │ │ ├ last_curfew<br> │ │ │ └ 0..i<br> │ │ │ ├ включен<br> │ │ │ ├ время блокировки<br> │ │ │ └ время разблокировки<br> │ │ └ назначенные_питомцы<br> │ │ └ pet_name<br> │ │ └ управление<br> │ │ └ тип<br> │ ├ история<br> │ │ └ 0..24<br> │ │ └ ...<br> │ └ домашние животные<br> │ └ pet_name<br> │ ├ внутри<br> │ ├ имя<br> │ ├ так как<br> │ ├ питание<br> │ │ ├ last_time_eaten<br> │ │ ├ потраченное_время<br> │ │ ├ раз_съедено<br> │ │ └ сухая..мокрая<br> │ │ └ вес<br> │ └ вода<br> │ ├ last_time_drunk<br> │ ├ затраченное время<br> │ ├ раз_пьяный<br> │ └ вес<br> └ информация<br> ├ all_devices_online<br> ├ подключение<br> └ последнее_обновление<br>

## Примечания
SureFlap®, Sure Petcare® и Felaqua® являются зарегистрированными товарными знаками [ООО «СюрФлап».](https://www.surepetcare.com/)

Изображения устройств SureFlap® предоставляются бесплатно с [Конечно Petcare®](https://www.surepetcare.com/en-us/press).

## Changelog

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

Copyright (c) 2023 Sickboy78 <asmoday_666@gmx.de>

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