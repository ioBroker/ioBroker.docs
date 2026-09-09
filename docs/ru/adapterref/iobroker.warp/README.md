---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.warp/README.md
title: ioBroker.warp
hash: pPRgv8LU5hfr/h1wYxMwQr/CVU6rE2/A4m/OcPxiZLM=
---
# ioBroker.warp

![Версия NPM](https://img.shields.io/npm/v/iobroker.warp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.warp.svg)
![Количество установок](https://iobroker.live/badges/warp-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/warp-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.warp.png?downloads=true)
![Тестирование и выпуск](https://github.com/pottio/ioBroker.warp/workflows/Test%20and%20Release/badge.svg)

## Зарядное устройство WARP для ioBroker

Этот адаптер осуществляет мониторинг и управление настенным [зарядным устройством (WARP)](https://www.warp-charger.com/) от [Tinkerforge](https://www.tinkerforge.com/de/) через ioBroker. Соединение устанавливается через WebSockets.

#### Начиная с версии адаптера 1.0.0, поддерживаются только версии прошивки WARP >= 2.0.0.

Зачем использовать этот адаптер? Ведь настенную зарядную станцию можно подключить к ioBroker через MQTT!

Однако через MQTT не передаются отдельные состояния, а используются сложные JSON-объекты. Адаптер Warp преобразует сложные JSON-объекты в отдельные состояния. Это упрощает реагирование на изменения значений отдельных состояний. Кроме того, каждому состоянию предоставляется соответствующее описание, единица измерения и дополнительная информация, которую можно найти в [официальной документации API](https://www.warp-charger.com/api.html) . Вдобавок ко всему, возможны такие команды, как запуск/остановка зарядки, установка верхних пределов допустимого зарядного тока, сброс показаний счетчика, сканирование ближайших сетей WLAN и настройка отображаемого имени. Изменение всех системных параметров, таких как конфигурация сети, настройки MQTT, администрирование пользователей или управление нагрузкой, возможно только через веб-интерфейс по соображениям безопасности.

### Поддерживаемые зарядные устройства WARP

- [Зарядное устройство WARP](https://www.warp-charger.com/index_warp1.html)
  - Умный
  - Про
- [Зарядное устройство WARP2](https://www.warp-charger.com/index.html)
  - Умный
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