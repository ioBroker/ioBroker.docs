---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.serial-gps/README.md
title: GPS-адаптер ioBroker (последовательный/USB)
hash: K8Qrv0kNC7b0CxW/Cgrp70q/KaU7e56yOozTv+0c4rM=
---
![Количество установок](https://iobroker.live/badges/serial-gps-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.serial-gps.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.serial-gps/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/serial-gps/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.serial-gps.svg)

<img src="admin/serial-gps.svg" style="width: 100px;"/>

# GPS-адаптер ioBroker (последовательный/USB)

Этот адаптер считывает данные GPS с последовательного или USB-устройства GPS и делает их доступными в ioBroker.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Начиная

Вставьте USB- или последовательный GPS-приемник в вашу систему ioBroker. Убедитесь, что устройство распознается операционной системой, и запишите назначенный последовательный порт (например, COM3 в Windows или /dev/ttyUSB0 в Linux). Перейдите на страницу конфигурации адаптера и выберите последовательный порт и другие параметры, если необходимо (скорость передачи по умолчанию обычно составляет 4800 или 9600 бод). Сохраните изменения и запустите адаптер. Через некоторое время данные GPS должны появиться в точках данных адаптера.

## Текущая должность: администратор

Вкладка **«Текущее положение»** в настройках экземпляра отображает текущее положение приемника на карте OpenStreetMap (стрелка указывает направление движения, точка указывает, когда приемник стоит, а также маршрут с момента открытия вкладки), а также информацию о соединении, местоположении, спутниках, координатах, высоте, скорости, курсе и значениях DOP. Карта отображается только во время работы экземпляра и требует доступа к интернету в браузере (картографические тайлы и библиотека Leaflet). Она отображает значения точек данных, поэтому приведенные ниже параметры также применяются к ней.

## Обновление значений

Большинство приемников отправляют новые данные каждую секунду, поэтому точки данных GPS также меняются каждую секунду. Эти параметры в конфигурации адаптера уменьшают количество обновлений (все они отключены при `0`):

- **Минимальный интервал обновления** (в секундах): каждое значение GPS записывается не более одного раза за этот интервал. Значение, изменившееся в течение этого интервала, записывается при следующем обновлении после истечения интервала.
- **Минимальное изменение положения** (в метрах): `latitude`, `longitude`, `position` и `latlon` Обновление происходит только после того, как приемник переместился как минимум на это расстояние от последнего записанного положения. Это подавляет дрожание сигнала у приемника в неподвижном состоянии.
- **Минимальное изменение направления** (в градусах): `course` Обновляется только после того, как значение изменилось как минимум на этот угол по сравнению с последним записанным значением (359° → 1° считается за 2°).
- **Минимальная скорость для данного направления** (км/ч): `course` Обновление происходит только тогда, когда скорость достигает как минимум этого значения, например: `2` Стационарный приемник передает случайные направления; таким образом, сохраняется последнее направление движения.

Интервал применяется в дополнение к расстоянию и направлению, поэтому должны быть выполнены все заданные условия, например: `10` песок `5` м: координаты обновляются не чаще, чем каждые 10 секунд, и только если изменение превышает 5 метров. Другие значения (скорость, спутники, время и т. д.) следуют только этому интервалу. `info.connection` Всегда обновляется мгновенно.

## Протестированные устройства

Как правило, все устройства, передающие данные NMEA через последовательный порт или USB, должны работать. Вот некоторые из протестированных устройств:

- USB-GNSS-приемник GlobalSat BU-353N5
- VK-162 G-Mouse USB GPS
- G72 G-Mouse USB

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.1.0 (2026-11-05)
* (@GermanBluefox) Added options to limit the updates of the GPS values: a minimal update interval, a minimal position change, a minimal direction change and a minimal speed for the direction
* (@GermanBluefox) The settings are split into tabs. The new tab "Current position" shows the position on an OpenStreetMap map and the current GPS values. Admin 7.7.28+ is required

### 1.0.2 (2026-10-13)
* (@GermanBluefox) Admin 7.6.20+ is required. Corrected the roles of some states. Fixed the integration test
* (@GermanBluefox) The adapter reports the serial port it has open (and in test mode the UDP port 50547) to js-controller 8, which keeps a per-host registry of the occupied resources (`system.host.<name>.usedResources`). A second instance configured for the same GPS receiver is visible as a conflict, and the log names the other instance before the port is opened. An older js-controller is unaffected

### 1.0.1 (2026-10-07)
- (iobroker-bot) Adapter requires node.js >= 22 now.
- (@GermanBluefox) By test of the port that already used by same instance, the port will be released for tests.

### 1.0.0 (2026-05-29)
- (@GermanBluefox) Added possibility to select GPS device by name instead of path

### 0.0.4 (2025-12-03)
- (@GermanBluefox) Corrected issues for repo checker

## License

The MIT License (MIT)

Copyright (c) 2025-2026 bluefox <dogafox@gmail.com>

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