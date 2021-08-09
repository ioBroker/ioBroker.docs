---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: VDlcSKuA7whtiJQgKK9PL2zdKYwGkNcFtmHhOcwoe9c=
---
![Логотип](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![Количество установок](http://iobroker.live/badges/sonoff-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# IoBroker Sonoff
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Применение
Этот адаптер связывается с устройствами Sonoff с прошивкой Tasmota или устройствами ESP через MQTT.

Ожидаются следующие темы:

- `теле / ИМЯ устройства / СОСТОЯНИЕ`
- `теле / ИМЯ устройства / ДАТЧИК`
- `tele / DeviceNAME / INFOx`
- `tele / DeviceNAME / ENERGY`
- `cmnd / DeviceNAME / POWERx`
- `stat / DeviceNAME / POWERx`
- `/ ИМЯ устройства / BM280 / Температура`
- `/ ИМЯ устройства / BM280 / Влажность`
- `/ ИМЯ устройства / BM280 / Temperatur`
- `/ DeviceNAME / BM280 / Feuchtigkeit`
- `/ ИМЯ устройства / BM280 / Vcc`
- `/ ИМЯ устройства / BM280 / VCC`
- `/ ИМЯ устройства / BM280 / Laufzeit`
- `/ ИМЯ устройства / BM280 / RSSI`
- `/ ИМЯ устройства / BM280 / ПИТАНИЕ`
- `/ ИМЯ устройства / BM280 / POWER1`
- `/ ИМЯ устройства / BM280 / POWER2`
- `/ ИМЯ устройства / BM280 / POWER3`
- `/ ИМЯ устройства / BM280 / POWER4`
- `/ DeviceNAME / BM280 / Switch1`
- `/ ИМЯ устройства / BM280 / Switch2`
- `/ DeviceNAME / BM280 / Total`
- `/ ИМЯ устройства / BM280 / Сегодня`
- `/ ИМЯ устройства / BM280 / heute`
- `/ DeviceNAME / BM280 / Yesterday`
- `/ ИМЯ устройства / BM280 / западный`
- `/ DeviceNAME / BM280 / Faktor`
- `/ DeviceNAME / BM280 / Factor`
- `/ DeviceNAME / BM280 / Power`
- `/ ИМЯ устройства / BM280 / Leistung`
- `/ DeviceNAME / BM280 / Voltage`
- `/ ИМЯ устройства / BM280 / Spannung`
- `/ DeviceNAME / BM280 / Current`
- `/ ИМЯ устройства / BM280 / Strom`
- `/ DeviceNAME / BM280 / Punkt`
- `/ DeviceNAME / BM280 / Counter1`
- `/ DeviceNAME / BM280 / Counter2`
- `/ ИМЯ устройства / BM280 / Counter3`
- `/ ИМЯ устройства / BM280 / Counter4`
- `/ ИМЯ устройства / BM280 / Давление`
- `/ DeviceNAME / BM280 / SeaPressure`
- `/ ИМЯ устройства / BM280 / Druck`
- `/ ИМЯ устройства / BM280 / Прибл. Высота`
- `/ DeviceNAME / BM280 / Module`
- `/ ИМЯ устройства / BM280 / Версия`
- `/ ИМЯ устройства / BM280 / Имя хоста`
- `/ ИМЯ устройства / BM280 / IP-адрес`
- `/ ИМЯ устройства / BM280 / IP-адрес`
- `/ ИМЯ устройства / BM280 / RestartReason`
- `/ ИМЯ устройства / BM280 / Углекислый газ`
- `/ ИМЯ устройства / DHT11 / Освещенность`
- `/ ИМЯ устройства / SonoffSC / Light`
- `/ ИМЯ устройства / SonoffSC / Noise`
- `/ ИМЯ устройства / SonoffSC / AirQuality`
- `/ ИМЯ устройства / SDS0X1 / PM2.5`
- `/ ИМЯ устройства / SDS0X1 / PM10`
- `/ ИМЯ устройства / SDS0X1 / UvLevel`
- `/ ИМЯ устройства / SDS0X1 / Latitude`
- `/ ИМЯ устройства / SDS0X1 / Долгота`
- `/ ИМЯ устройства / SR04 / Расстояние`

** Примечание **: список можно легко расширить. Отправьте разработчику `Pull Requests` или *данные отладки* для неизвестных состояний (через проблему).

## Автоматическое создание объектов
В веб-конфигурации вы можете определить, какие телеграммы MQTT создают новые объекты не в точках данных по умолчанию:

* `TELE_SENSOR` - создает объекты из телеграмм` tele / xxx / SENSOR`
* `TELE_STATE` - создает объекты из телеграмм` tele / xxx / STATE`
* `STAT_RESULT` - создает объекты из телеграмм` stat / xxx / RESULT`

Обычно для большинства пользователей достаточно TELE_SENSOR.

* `Create object tree` создает объекты как древовидную структуру

** Предупреждение! ** Эта опция испортит ваше дерево объектов sonoff! Приходится переделывать все настройки хранилища ...
Сохраните структуру объекта в виде файла JSON, чтобы вы могли воссоздать старую структуру.
Лучше всего остановить адаптер, удалить все объекты в sonoff и снова запустить адаптер.

## Флаги для светодиодных контроллеров
Состояния режима будут созданы только в том случае, если устройство находится в одном из состояний:

- Red, Green, Blue, WW, CW, Color, RGB_POWER, WW_POWER, CW_POWER, Hue, Насыщенность.

Состояния:

* `modeLedExor` - exor для белых светодиодов и цветных светодиодов => если белые светодиоды включены, цветные светодиоды выключены и наоборот (по умолчанию true)
* `modeReadColors` - разрешить чтение цвета из MQTT (по умолчанию false)

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 2.4.3 (2021-07-18)
* (bluefox) Better type detection for non-described states

### 2.4.2 (2021-07-17)
* (bluefox) Optimize for js-controller 3.3

### 2.4.1 (2021-07-17)
* (Apollon77/bluefox) Optimize for js-controller 3.3
* (Apollon77) Add Sentry for error reporting with js-controller 3.x+

### 2.4.0 (2021-02-04)
* (anwa) add several data points
* (anwa) Fix translation for 'ignorePings'
* (anwa) Fix wrong unit for humidity
* (anwa) Config option to create a complete object tree instead of a flat structure
* (anwa) Change Action type to string
* (Apollon77) js-controller 2.0 is required at least

### 2.3.3 (2019-11-27)
* (bluefox) Error with empty packet was caught

### 2.3.2 (2019-10-23)
* (bluefox) Fixed the password input in the configuration
* (bluefox) Allowed to set the IP interface for server
* (bluefox) Fixed tests for js-controller 2.0
* (bluefox) Fixed the monitoring of the client connection
* (bluefox) Changed "indicator.connected" to "indicator.reachable" for clients
* (bluefox) Supported `{POWERn: "true"}`
* (bluefox) Correct processing of `{temp: nan}`

### 2.2.3 (2019-01-10)
* (simatec) Support for compact mode

### 2.2.2 (2018-06-22)
* (bluefox) Configuration was fixed

### 2.2.1 (2018-06-20)
* (bluefox) '-' in names was allowed again

### 2.2.0 (2018-05-22)
* (gemu2015) auto generate objects, support for arrays (channel), led-controllers improved

### 2.1.3 (2018-05-08)
* (bluefox) Added HC-SR04 Ultrasonic Sensor

### 2.1.2 (2018-04-23)
* (bluefox) Added support of UvLight, Longitude and Latitude

### 2.1.1 (2018-04-13)
* (bluefox) Support of the particle concentration sensor

### 2.1.0 (2018-03-30)
* (gemu2015) Support of the devices control (many thanks :)
* (gemu2015) Support of many new values
* (modmax) Update alive status of the clients
* (modmax) Added POWER5-8 and Switch3-4

### 2.0.2 (2018-03-19)
* (modmax) Fixing reconnection of clients
* (bluefox) Add SeaPressure

### 2.0.1 (2018-03-17)
* (bluefox) Replace stream handler
* (bluefox) Add timeout for clients
* (bluefox) Add Light/Noise/AirQuality
* (bluefox) Do not send pingresp for invalid clients

### 1.0.3 (2018-03-03)
* (bluefox) Add Analog0/1/2/3 sensor

### 1.0.2 (2018-02-17)
* (Apollon77) Add Illuminance sensor

### 1.0.1 (2018-02-05)
* (bluefox) Ready for admin3
* (bluefox) Added CO2 sensor

### 1.0.0 (2017-11-27)
* (AlZiBa) typo @ alive
* (AlZiBa) add Today's power consumption for Sonoff POW
* (AlZiBa) unit of power consumption is kWh

### 0.3.3 (2017-11-03)
* (bluefox) Add counters

### 0.3.2 (2017-10-22)
* (Tan-DE) Small change for Switch1. Switch2 and additional IPaddress added.

### 0.3.1 (2017-10-12)
* (bluefox) Fix tests and LWT

### 0.3.0 (2017-10-06)
* (bluefox) Add INFO and ESP

### 0.2.0 (2017-10-05)
* (bluefox) Add ENERGY and DS18x20

### 0.1.0 (2017-10-01)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2021, bluefox <dogafox@gmail.com>

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