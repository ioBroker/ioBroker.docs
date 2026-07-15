---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.witmotion/README.md
title: ioBroker WitMotion
hash: aiQstHCtBTep6w6TDMEZcwOqb+TMIMoQQZn56mt0azM=
---
![Логотип](../../../en/adapterref/iobroker.witmotion/admin/witmotion.png)

![Количество установок](http://iobroker.live/badges/witmotion-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.witmotion.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.witmotion.svg)

# IoBroker WitMotion
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.witmotion/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/witmotion/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

![WT901blecl](../../../en/adapterref/iobroker.witmotion/image/wit-wt901blecl-5-0.jpg)

Считывает данные с 9-осевого инерциального измерительного датчика WT901blecl 5.0 Bluetooth 5.0 (MPU9250) через USB и записывает их в точки данных ioBroker.

В ioBroker считываются и записываются следующие данные:

- Ускорение X/Y/Z
- Гироскоп X/Y/Z
- Магнитометр X/Y/Z

## Поддерживаемые устройства
- [WT901blecl 5.0](https://witmotion-sensor.com/products/bluetooth-5-0-accelerometer-inclinometer-wt901blecl-mpu9250-9-axis-imu-sensor)

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 0.0.4 (2026-03-26)
* (@GermanBluefox) Tests fixed

### 0.0.3 (2026-01-23)
* (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2026, Denis Haev <dogafox@gmail.com>

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