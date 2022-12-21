---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.jeelink/README.md
title: ioBroker.jeelink
hash: b4G41zaqVIxZxuG/kePTos+2oSEKN60Tfxc7ktLC4Zc=
---
![Логотип](../../../en/adapterref/iobroker.jeelink/admin/jeelab_logo.png)

![Количество установок](http://iobroker.live/badges/jeelink-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.jeelink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.jeelink.svg)

# IoBroker.jeelink
**Тесты:** ![Тестируйте и выпускайте](https://github.com/foxthefox/ioBroker.jeelink/workflows/Test%20and%20Release/badge.svg)

Это адаптер для ioBroker для интеграции RFM12B/RFM69 через Jeelink.
Jeelink можно использовать с предварительно загруженным программным обеспечением (rfmdemo) для считывания показаний датчиков openenergy (emon).
Для использования датчиков LaCrosse необходимо заменить прошивку (см. форум iobroker).

## Установка:
### Выпущенная версия
```javascript
npm install iobroker.jeelink
```

на малине может помочь использование:

```javascript
 npm install --unsafe-perm iobroker.jeelink
 ```

 потому что пакет serialport должен быть собран на неподдерживаемом arm-hw

### Актуальная версия разработки с github (при тестировании может не работать!)
```javascript
npm install https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

или же

```javascript
npm install --unsafe-perm https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```

## Настройки:
- USB-порт JeelinkAdapter обычно /dev/ttyACME
- Серийная скорость обычно 57600 бод

## Конфигурация:
сделать в админке

* определение порта USB
* установка скорости передачи данных
- определить адрес датчика, который принимается в эфире
- определить уникальный адрес датчика в адаптере (LaCrosse меняет адрес в эфире после замены батареи, поэтому следите за журналом отладки и корректируйте адрес датчика после замены батареи)
- определить тип датчика (см. примеры ниже)
- определить комнату

## Датчики
|Объект|варианты устройств|пример телеграммы|Описание|
|--------|-------|:-:|--------|
|emonTH|emonTH|ОК 19 ...|датчик с сайта openenergy.org|
|emonWater|emonWater|OK 21 ... |датчик с RFM12B для учета воды|
|LaCrosseDTH |TX|OK 9 ... |датчики LaCrosse, technoline|
|LaCrosseDTT |TX|OK 9 ... |датчики LaCrosse, technoline double temp|
|HMS100TF |TXH29DTH-IT|H00 ... |датчики technoline|
|LaCrosseBMP180||OK WS ... |сенсорный мод, суперджи|
|LaCrosseWS|WS1080,TX22,WS1600|OK WS ... |Метеостанция|
|EC3000|EC3000|OK 22 ... |Счетчик энергии|
|EMT7110|EMT7110|OK EMT7110 ... |Счетчик энергии|
|уровень|уровень|ОК LS ... |датчик уровня|
|DavisVantage|Davis Vantage|ОК ЗНАЧЕНИЕ ДЭВИС ... |Метеостанция|

## ДЕЛАТЬ:
* другие типы датчиков
* поместите код датчика в отдельный файл
* добавление нового датчика в конфигурацию, после чего он отображается на странице администрирования/конфигурации
* HMS100TF Температура ниже 0°C и низкий заряд батареи должны быть реализованы

## Changelog
### 1.2.1
* (foxthefox) corrections for Davis Vantage

### 1.2.0
* (foxthefox) new device Davis Vantage

### 1.1.1
* (foxthefox) state change as log.debug, not as log.info
* (foxthefox) some more info at adapter startup
* (foxthefox) moved sp.write and deleted separate function

### 1.1.0
* (foxthefox) usage of newest serialport (9.x -> 10.5)
* (foxthefox) changes in github workflow

### 1.0.3
* (atl285) correction wrong type of baudRate config, causing adapter crash

### 1.0.2
* (foxthefox) upper range temperature 50->70

### 1.0.1
* (foxthefox) round -> this round
* (foxthefox) baudrate settings in admin as number

### 1.0.0
* (foxthefox) refactoring, use of classbased style,
* (foxthefox) github actions instead of travis

### 0.1.4
* (o0shojo0o) nodejsV14 compatibility

### 0.1.3
* (atl285) added new sensor type LacCrosseDTT (double temp like TX25-IT)

### 0.1.2
* correction for weather (no data is given by value = 255)

### 0.1.1
* delete buffer function to be compatible with nodejs10
* enhanced automatic testing

### 0.1.0
* compact mode

### 0.0.7
* new level sensor (fhem)

### 0.0.6
* last version of serialport
* new sensor TXH29DTH-IT
* new weather station WS1600
* new sensor EC3000, EMT7110 not verified with life data

### 0.0.5
* adminv3 improved with values2table

### 0.0.4
* command to USB-stick for configuration
* added superjee, BMP180 sensor on jeenode
* admin v3 implementation

### 0.0.3
* abs humidity and dewpoint calculation

### 0.0.2
* definition of unique sensor ID for iobroker datapoint
* implementation of LaCrosseDTH
* definition of sensors via admin

### 0.0.1
* working with 3 sensors emon

## License

The MIT License (MIT)

Copyright (c) 2016 - 2022 foxthefox <foxthefox@wysiwis.net>