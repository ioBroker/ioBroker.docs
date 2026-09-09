---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: msM7GxyAHwu1ZEOPSUpsv1EZMZc+F1oxAaBrQ01+OjQ=
---
![Логотип](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![Количество установок](http://iobroker.live/badges/jeelink-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.jeelink.svg)
![Тестирование и выпуск](https://github.com/foxthefox/ioBroker.jeelink/workflows/Test%20and%20Release/badge.svg)

# ioBroker.jeelink

Это адаптер для ioBroker, позволяющий интегрировать RFM12B/RFM69 через Jeelink. Jeelink можно использовать с предустановленным программным обеспечением (rfmdemo) для считывания данных с датчиков OpenEnergy (emon). Для использования датчиков LaCrosse необходимо заменить прошивку (см. форум ioBroker).

## Настройки:

- USB-порт адаптера Jeelink обычно /dev/ttyACME
- Скорость последовательного соединения обычно составляет 57600 бод.

## Конфигурация:

это нужно сделать в административной панели.

- определение USB-порта
- установка скорости передачи данных

* определить адрес датчика, который принимается по эфиру
* Задайте уникальный адрес датчика внутри адаптера (компания LaCrosse меняет адрес в эфире после замены батареи, поэтому следите за журналом отладки и корректируйте адрес датчика после замены батареи).
* Укажите тип датчика (см. примеры ниже).
* определить комнату

## Датчики

| Объект         | варианты устройств |  пример телеграммы | Описание                                                        |
| -------------- | ------------------ | :----------------: | --------------------------------------------------------------- |
| emonTH         | emonTH             |      ОК 19 ...     | датчик с сайта openenergy.org                                   |
| emonWater      | emonWater          |      ОК 21 ...     | Датчик с RFM12B для учета потребления воды                      |
| LaCrosseDTH    | TX                 |      ОК 9 ...      | датчики от LaCrosse, Technoline                                 |
| LaCrosseDTT    | TX                 |      ОК 9 ...      | датчики от LaCrosse, Technoline с двойным температурным режимом |
| HMS100TF       | TXH29DTH-IT        |       Х00 ...      | датчики технолин                                                |
| LaCrosseBMP180 |                    |      ОК WS ...     | сенсорный модуль, суперджи                                      |
| LaCrosseWS     | WS1080,TX22,WS1600 |      ОК WS ...     | Метеостанция                                                    |
| EC3000         | EC3000             |      ОК 22 ...     | Счетчик энергии                                                 |
| EMT7110        | EMT7110            |   OK EMT7110 ...   | Счетчик энергии                                                 |
| уровень        | уровень            |      ОК ЛС...      | датчик уровня                                                   |
| DavisVantage   | Дэвис Вантадж      | OK VALUE DAVIS ... | Метеостанция                                                    |

## TODO:

- другие типы датчиков
- Разместите код датчика в отдельном файле.
- Добавление нового датчика в конфигурацию, после чего он становится видимым на странице admin/config.
- Для HMS100TF необходимо внедрить функцию защиты от перегрева при температуре ниже 0°C и низком заряде батареи.

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.2.9 (npm)

- (foxthefox) fix jsonConfig

### 1.2.8 (npm)

- (foxthefox) update dependencies, comply with repo checker

### 1.2.7 (npm)

- (foxthefox) update dependencies, comply with repo checker

### 1.2.6 (npm)

- (foxthefox) update dependencies
- (foxthefox) UI with jsonConfig

### 1.2.5 (npm)

- (foxthefox) eslint upgrade and corrections

### 1.2.4 (npm)

- (foxthefox) IOB checker corrections

### 1.2.3 (npm)

- (foxthefox) serialport 12
- (foxthefox) translation with @iobroker/adapter-dev

### 1.2.2

- (foxthefox) more datapoints for Davis Vantage

### 1.2.1

- (foxthefox) corrections for Davis Vantage

### 1.2.0

- (foxthefox) new device Davis Vantage

### 1.1.1

- (foxthefox) state change as log.debug, not as log.info
- (foxthefox) some more info at adapter startup
- (foxthefox) moved sp.write and deleted separate function

### 1.1.0

- (foxthefox) usage of newest serialport (9.x -> 10.5)
- (foxthefox) changes in github workflow

### 1.0.3

- (atl285) correction wrong type of baudRate config, causing adapter crash

### 1.0.2

- (foxthefox) upper range temperature 50->70

### 1.0.1

- (foxthefox) round -> this round
- (foxthefox) baudrate settings in admin as number

### 1.0.0

- (foxthefox) refactoring, use of classbased style,
- (foxthefox) github actions instead of travis

### 0.1.4

- (o0shojo0o) nodejsV14 compatibility

### 0.1.3

- (atl285) added new sensor type LacCrosseDTT (double temp like TX25-IT)

### 0.1.2

- correction for weather (no data is given by value = 255)

### 0.1.1

- delete buffer function to be compatible with nodejs10
- enhanced automatic testing

### 0.1.0

- compact mode

### 0.0.7

- new level sensor (fhem)

### 0.0.6

- last version of serialport
- new sensor TXH29DTH-IT
- new weather station WS1600
- new sensor EC3000, EMT7110 not verified with life data

### 0.0.5

- adminv3 improved with values2table

### 0.0.4

- command to USB-stick for configuration
- added superjee, BMP180 sensor on jeenode
- admin v3 implementation

### 0.0.3

- abs humidity and dewpoint calculation

### 0.0.2

- definition of unique sensor ID for iobroker datapoint
- implementation of LaCrosseDTH
- definition of sensors via admin

### 0.0.1

- working with 3 sensors emon

[Older changelogs can be found there](https://github.com/foxthefox/ioBroker.jeelink/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2016-2026 foxthefox <foxthefox@wysiwis.net>