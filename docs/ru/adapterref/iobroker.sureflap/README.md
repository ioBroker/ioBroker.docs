---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sureflap/README.md
title: ioBroker.sureflap
hash: 9d04pkfbCIH58wtvJOMhYfqmtr2sCbcDD4pbmXvp+Eg=
---
![Стабильная версия](http://iobroker.live/badges/sureflap-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sureflap.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sureflap.svg)
![Количество установок (последние)](http://iobroker.live/badges/sureflap-installed.svg)
![Тестирование и выпуск](https://github.com/Sickboy78/ioBroker.sureflap/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sureflap.png?downloads=true)

<p align="center">
  <img src="admin/sureflap.png" />
</p>

# ioBroker.sureflap

## Адаптер для умных устройств для домашних животных от Sure Petcare®

<p align="center">
  <img src="/admin/SureFlap_Pet_Door_Connect_Hub_Phone.png" />
</p>
<p align="center">
  <img src="/admin/Sure_Petcare_Surefeed_Feeder_Connect.png" />
  <img src="/admin/Sure_Petcare_Felaqua_Connect.png" />
</p>

## Конфигурация

Обязательно: укажите имя пользователя и пароль от вашей учетной записи Sure Petcare® на странице настройки адаптера.

Дополнительно: Включить или отключить историю событий в формате JSON и настроить количество элементов. Дополнительно: Установить пороговые значения полного и разряженного заряда батареи при использовании перезаряжаемых батарей. Это влияет на значения процента заряда батареи.

## Описание

Адаптер предоставляет информацию о настройках и состоянии вашей дверцы для животных, дверцы для кошек, кормушки или поилки.

Также отображается местоположение ваших питомцев, а также количество потребленной ими пищи и воды (с помощью кормушки и/или поилки).

Это позволяет вам управлять режимом блокировки и временем закрытия заслонки, а также устанавливать местоположение ваших питомцев.

Для работы адаптера требуется Node 20 или более поздняя версия.

### Изменяемые значения

Следующие состояния можно изменить, и изменения вступят в силу на вашем устройстве и будут отражены в приложении Sure Petcare®.

| состояние                                                              | описание                                                                                                                                                 | допустимые значения                                                                                        |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| HOUSEHOLD\_NAME.HUB\_NAME.control.led\_mode                            | устанавливает яркость светодиодов ступицы.                                                                                                               | **0** - выключено<br> **1** - высокий<br> **4** - приглушенный                                             |
| HOUSEHOLD\_NAME.HUB\_NAME.DEVICE\_NAME.control.pets.PET\_NAME.assigned | назначает или отменяет назначение питомца устройству.                                                                                                    | **верно** или **неверно**                                                                                  |
| HOUSEHOLD\_NAME.HUB\_NAME.FEEDER\_NAME.control.close\_delay            | устанавливает задержку закрытия крышки подающего устройства.                                                                                             | **0** - быстро<br> **4** - нормальный<br> **20** - медленно                                                |
| HOUSEHOLD\_NAME.HUB\_NAME.FLAP\_NAME.control.curfew\_enabled           | включает или отключает настроенный комендантский час                                                                                                     | **верно** или **неверно**                                                                                  |
| HOUSEHOLD\_NAME.HUB\_NAME.FLAP\_NAME.control.current\_curfew           | устанавливает текущий комендантский час.<br> Поддерживает 1 (дверца для животных) или до 4 (дверца для кошек) временных интервалов ограничения движения. | **\[{"enabled":true\|false, "lock\_time":"xx:xx", "unlock\_time":"xx:xx"}, ...]**                          |
| HOUSEHOLD\_NAME.HUB\_NAME.FLAP\_NAME.control.lockmode                  | устанавливает режим блокировки                                                                                                                           | **0** - открыто<br> **1** - блокировка<br> **2** - блокировка<br> **3** - закрыто (замок внутри и снаружи) |
| HOUSEHOLD\_NAME.HUB\_NAME.FLAP\_NAME.control.pets.PET\_NAME.type       | устанавливает тип питомца для назначенного питомца и заслонки.                                                                                           | **2** - домашнее животное, гуляющее на улице<br> **3** - домашний питомец, живущий в помещении             |
| HOUSEHOLD\_NAME.pets.PET\_NAME.inside                                  | определяет, находится ли ваш питомец внутри помещения.                                                                                                   | **верно** или **неверно**                                                                                  |

### Структура

Адаптер создает следующую иерархическую структуру:

адаптер<br> ├ НАЗВАНИЕ\_СЕМЬИ<br> │ ├ HUB\_NAME<br> │ │ ├ онлайн<br> │ │ ├ serial\_number<br> │ │ ├ сигнал<br> │ │ │ ├ device\_rssi<br> │ │ │ └ hub\_rssi<br> │ │ ├ версия<br> │ │ │ ├ прошивка<br> │ │ │ └ оборудование<br> │ │ ├ управление<br> │ │ │ └ led\_mode<br> │ │ ├ FELAQUA\_NAME<br> │ │ │ ├ батарея<br> │ │ │ ├ процент заряда батареи<br> │ │ │ ├ онлайн<br> │ │ │ ├ serial\_number<br> │ │ │ ├ сигнал<br> │ │ │ │ ├ device\_rssi<br> │ │ │ │ └ hub\_rssi<br> │ │ │ ├ версия<br> │ │ │ │ ├ прошивка<br> │ │ │ │ └ оборудование<br> │ │ │ ├ вода<br> │ │ │ │ ├ fill\_percent<br> │ │ │ │ ├ last\_filled\_at<br> │ │ │ │ └ вес<br> │ │ │ └ управление<br> │ │ │ └ домашние животные<br> │ │ │ └ ИМЯ\_ПИТОМЦА<br> │ │ │ └ назначен<br> │ │ ├ ИМЯ\_КОРМИЛЬЩИКА<br> │ │ │ ├ батарея<br> │ │ │ ├ процент заряда батареи<br> │ │ │ ├ онлайн<br> │ │ │ ├ serial\_number<br> │ │ │ ├ сигнал<br> │ │ │ │ ├ device\_rssi<br> │ │ │ │ └ hub\_rssi<br> │ │ │ ├ версия<br> │ │ │ │ ├ прошивка<br> │ │ │ │ └ оборудование<br> │ │ │ ├ миски<br> │ │ │ │ └ 0..1<br> │ │ │ │ ├ fill\_percent<br> │ │ │ │ ├ food\_type<br> │ │ │ │ ├ last\_filled\_at<br> │ │ │ │ ├ Last\_zeroed\_at<br> │ │ │ │ ├ цель<br> │ │ │ │ └ вес<br> │ │ │ └ управление<br> │ │ │ ├ домашние животные<br> │ │ │ │ └ ИМЯ\_ПИТОМЦА<br> │ │ │ │ └ назначен<br> │ │ │ └ close\_delay<br> │ │ └ FLAP\_NAME<br> │ │ ├ батарея<br> │ │ ├ процент\_заряда\_батареи<br> │ │ ├ curfew\_active<br> │ │ ├ last\_enabled\_curfew<br> │ │ ├ онлайн<br> │ │ ├ serial\_number<br> │ │ ├ управление<br> │ │ │ ├ домашние животные<br> │ │ │ │ └ ИМЯ\_ПИТОМЦА<br> │ │ │ │ ├ назначен<br> │ │ │ │ └ тип<br> │ │ │ ├ curfew\_enabled<br> │ │ │ ├ текущий\_комендантский час<br> │ │ │ └ режим блокировки<br> │ │ ├ сигнал<br> │ │ │ ├ device\_rssi<br> │ │ │ └ hub\_rssi<br> │ │ └ версия<br> │ │ ├ прошивка<br> │ │ └ оборудование<br> │ ├ история<br> │ │ └ json<br> │ │ └ 0..24<br> │ └ домашние животные<br> │ └ ИМЯ\_ПИТОМЦА<br> │ ├ внутри<br> │ ├ имя<br> │ ├ с тех пор<br> │ ├ еда<br> │ │ ├ last\_time\_eaten<br> │ │ ├ time\_spent<br> │ │ ├ times\_eaten<br> │ │ └ сухой..влажный<br> │ │ └ вес<br> │ ├ движение<br> │ │ ├ last\_direction<br> │ │ ├ last\_flap<br> │ │ ├ last\_flap\_id<br> │ │ ├ last\_time<br> │ │ ├ время, проведенное\_на\_уличии<br> │ │ └ times\_outside<br> │ └ вода<br> │ ├ last\_time\_drunk<br> │ ├ time\_spent<br> │ ├ times\_drunk<br> │ └ вес<br> └ информация<br> ├ все\_устройства\_в\_сети<br> ├ соединение<br> ├ last\_update<br> ├ offline\_devices<br> └ версия<br>

## Примечания

SureFlap®, Sure Petcare® и Felaqua® являются зарегистрированными товарными знаками компании [SureFlap Ltd.](https://www.surepetcare.com/)

Изображения устройств SureFlap® предоставляются компанией [Sure Petcare®](https://www.surepetcare.com/en-us/press) для бесплатного использования.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

* (Sickboy78) reduce log messages

### 3.4.3 (2026-08-29)

* (Sickboy78) dependency updates
* (copilot) Adapter requires node.js >= 22 now
* (Sickboy78) code refactoring
* (Sickboy78) added unit tests

### 3.4.2 (2026-01-09)

* (Sickboy78) dependency updates
* (Sickboy78) add AlCalzone's Release Script

### 3.4.1 (2025-10-22)

* (Sickboy78) dependency updates
* (Sickboy78) migration to npm trusted publishing

### 3.4.0 (2025-08-11)

* (Sickboy78) removed deprecated util.promisify

### 3.3.0 (2025-07-13)

* (Sickboy78) added translations for unknown pet setting

[Older changelogs can be found there](https://github.com/Sickboy78/ioBroker.sureflap/blob/master/CHANGELOG_OLD.md)

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

Copyright (c) 2025-2026 Sickboy78 <asmoday_666@gmx.de>