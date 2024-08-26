---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.warp/README.md
title: ioBroker.warp
hash: bjZV7O1KguMrIRaApQK0vOCRtJJDiSdsIvHmdliORNk=
---
# IoBroker.warp

![версия NPM](https://img.shields.io/npm/v/iobroker.warp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.warp.svg)
![Количество установок](https://iobroker.live/badges/warp-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/warp-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.warp.png?downloads=true)

**Тесты:** ![Тестируйте и выпускайте](https://github.com/pottio/ioBroker.warp/workflows/Test%20and%20Release/badge.svg)

## Адаптер зарядного устройства WARP для ioBroker
Этот адаптер отслеживает и управляет настенной коробкой [(Зарядное устройство WARP)] (https://www.warp-charger.com/) от [Tinkerforge](https://www.tinkerforge.com/de/) через ioBroker. Соединение будет установлено через WebSockets.

#### Начиная с версии адаптера 1.0.0, поддерживаются только версии прошивки WARP >= 2.0.0.
Зачем использовать этот переходник - можно и по MQTT подключить настенный бокс к ioBroker?!

Однако через MQTT отправляются не отдельные состояния, а сложные объекты JSON. Адаптер деформации преобразует сложные объекты JSON в отдельные состояния. Это упрощает реакцию на изменения значений одного состояния. Кроме того, каждое состояние снабжено соответствующим описанием, единицей измерения и дополнительной информацией, которую можно найти в [официальная документация по API](https://www.warp-charger.com/api.html). В довершение всего возможны некоторые команды, такие как запуск/остановка зарядки, установка верхних пределов допустимого зарядного тока, сброс показаний счетчика, сканирование ближайших сетей WLAN и настройка отображаемого имени. Изменение всех системных параметров, таких как конфигурация сети, настройки MQTT, администрирование пользователей или диспетчер нагрузки, возможно только через веб-интерфейс из соображений безопасности.

### Поддерживаемые зарядные устройства WARP
- [Зарядное устройство WARP] (https://www.warp-charger.com/index_warp1.html)
  - Умная
  - Про
- [Зарядное устройство WARP2] (https://www.warp-charger.com/index.html)
  - Умная
  - Про

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.2 (2022-07-01)
* (pottio) API changes
* (pottio) Dependency updates

### 1.2.1 (2022-05-18)
* (pottio) Fixed bug

### 1.2.0 (2022-05-17)
* (pottio) Minor improvements

### 1.1.0 (2022-05-05)
* (pottio) Dependency updates
* (pottio) API changes (WARP firmware versions 2.0.2, 2.0.3, 2.0.4) [[#27]](https://github.com/pottio/ioBroker.warp/issues/27)

### 1.0.1 (2022-04-28)
* (pottio) fixed bug [[#15]](https://github.com/pottio/ioBroker.warp/issues/15)

### 1.0.0 (2022-04-14)
* (pottio) [Breaking Changes] Added support for WARP firmware >= 2.0.0 - older firmware versions are no longer supported
* (pottio) Automatic WARP product and model detection on startup
* (pottio) Split of array in single states is now configurable in admin settings
* (pottio) Dependency updates

### 0.0.4 (2022-04-06)
* (pottio) fixed bug

### 0.0.3 (2022-03-22)
* (pottio) fixed bugs
* (pottio) added instance link

### 0.0.2 (2022-03-21)
* (pottio) initial release

## License
MIT License

Copyright (c) 2022 pottio

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
