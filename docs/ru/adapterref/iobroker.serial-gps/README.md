---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.serial-gps/README.md
title: GPS-адаптер ioBroker (последовательный/USB)
hash: irZI9P1HaevB1JfqsORV18PYiRQa6GtdObs6ErX+dS8=
---
![Количество установок](http://iobroker.live/badges/serial-gps-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.serial-gps.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.serial-gps.svg)

<img src="admin/serial-gps.svg" style="width: 100px;"/>

# IoBroker GPS (последовательный/USB) адаптер
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.serial-gps/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/serial-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер считывает данные GPS с последовательного или USB-устройства GPS и делает их доступными в ioBroker.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Начиная
Вставьте USB- или последовательный GPS-приемник в вашу систему ioBroker. Убедитесь, что устройство распознается операционной системой, и запишите назначенный последовательный порт (например, COM3 в Windows или /dev/ttyUSB0 в Linux).
Перейдите на страницу конфигурации адаптера и выберите последовательный порт и другие параметры, если необходимо (скорость передачи по умолчанию обычно составляет 4800 или 9600 бод). Сохраните изменения и запустите адаптер. Через некоторое время данные GPS должны появиться в точках данных адаптера.

## Протестированные устройства
Как правило, все устройства, передающие данные NMEA через последовательный порт или USB, должны работать. Вот некоторые из протестированных устройств:

- USB-GNSS-приемник GlobalSat BU-353N5
- VK-162 G-Mouse USB GPS
- G72 G-Mouse USB

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 0.0.4 (2025-12-03)
- (@GermanBluefox) Corrected issues for repo checker

### 0.0.3 (2025-12-01)
- (@GermanBluefox) Initial release

## License

The MIT License (MIT)

Copyright (c) 2025 bluefox <dogafox@gmail.com>

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