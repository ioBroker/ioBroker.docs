---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: 7U4md29YzlcZtIfvZAdxw/m+IF5T2q4mzInWqLWyIQc=
---
![Логотип](../../../en/adapterref/iobroker.lcn/admin/lcn.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.lcn.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lcn.svg)
![НПМ](https://nodei.co/npm/iobroker.lcn.png?downloads=true)

# IoBroker.lcn
Этот адаптер позволяет подключить локальную сеть управления [ЛКН](https://www.lcn.eu/) к ioBroker.

## Поддерживаемые шлюзы
- ЛКН-ПКЕ

![пке](../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

- ЛКН-ФКУ с ЛКН-ПЧК

![пке](../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

**Не забывайте, что `ioBroker.lcn` заблокирует одну лицензию на подключение LCN.**

Конфигурация и модули будут автоматически обнаружены при сканировании, которое необходимо запустить вручную из диалогового окна конфигурации и которое можно повторить в любое время.

## Типы
Поддерживаются следующие группы чтения и записи:

- Аналоговые значения (выход/вход)
- Реле (выходные)
- Датчики (входные)
- Светодиоды (выход/вход)
- Переменные (входные)

## Переменные
Чтобы применить допустимые функции преобразования к переменным, переменные должны иметь допустимые роли. Поддерживаются следующие роли:

- **value.temperature** - температура в градусах Цельсия
- **значение.яркость** - Люкс (I-вход) в люксах
- **value.speed.wind** - скорость ветра в м/с
- **value.voltage** - напряжение в Вольтах
- **value.current** - ток в Амперах
- **value.sun.azimuth** - азимут солнца
- **value.sun.elevation** - высота солнца

## Отображать
Для каждого устройства можно активировать наличие или отсутствие дисплея.

## Регулятор (Regler)
Для каждого устройства можно активировать наличие у него регуляторов или отсутствие таковых.

## Настройки
- Интервал повторного подключения (сек) - как часто адаптер пытается подключиться. По умолчанию каждые 30 секунд.
- Время ожидания соединения (мс) - как долго адаптер ждет ответа на соединение, включая аутентификацию. По умолчанию 6 секунд.
- Время ожидания ответа при сканировании (мс) - как долго адаптер ждет ответов при сканировании модулей.
- Время ожидания ответа (мс) - время ожидания для команд управления
- Интервал пинга (сек) - как часто адаптер отправляет запросы пинга
- Время ожидания ответа на пинг (мс) - время ожидания для запросов пинга
- Реле ВХОД/ВЫХОД одинаковы - если реле «выход» и «вход» одинаковы или если это разные реле.

```
// =====================  Same relays =============================
//                                    +-------+
// ----------------- OUT -----------> |       |
//                                    | Relay |
// <----------------- IN ------------ |       |
//                                    +-------+
//
//
// ======================  Different relays =======================
//                                    +-------+
//                                    |       |
// ----------------- OUT -----------> | Relay |
//                                    |       |
//                                    +-------+
//
//                                    +--------+
//                                    | Sensor |
// <----------------- IN ------------ |   or   |
//                                    | Relay  |
//                                    +--------+
```

## Как использовать
После первого запуска необходимо просканировать устройства. Это можно сделать в диалоге конфигурации кнопкой сканирования.

![сканировать](../../../en/adapterref/iobroker.lcn/img/scanButton.png)

## Задача
- Диалоговое окно конфигурации для определения типа переменных.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 2.0.3 (2024-09-04)
* (bluefox) Added translations

### 2.0.2 (2024-09-03)
* (bluefox) Corrected checking of licenses with license manager

### 2.0.1 (2024-08-07)
* (bluefox) Disable possibility to install via git

### 2.0.0 (2024-08-06)
* (bluefox) Made adapter compatible with js-controller 6
* (bluefox) A minimum supported node.js version is 18

### 1.1.8 (2023-11-13)
* (bluefox) Added SUM inputs

### 1.1.7 (2023-11-06)
* (bluefox) Corrected setting of undefined values

### 1.1.1 (2022-10-19)
* (bluefox) Corrected license check

### 1.1.0 (2022-10-18)
* (bluefox) Corrected issue with password

### 1.0.4 (2021-05-21)
* (bluefox) Ack will be ignored for the display commands

### 1.0.3 (2021-05-21)
* (bluefox) Changed the calculation of the temperature variables

### 1.0.2 (2020-10-11)
* (bluefox) Implemented the regulators and the display support.

### 0.6.3 (2019-12-18)
* (bluefox) General relays mode implemented

### 0.6.2 (2019-12-07)
* (bluefox) Detected delayed responses
* (bluefox) Dynamical creation of states is implemented

### 0.5.5 (2019-12-05)
* (bluefox) Relay inputs were corrected

### 0.5.4 (2019-12-04)
* (bluefox) Connection indication was corrected

### 0.5.1 (2019-11-29)
* (bluefox) Finger scanner supported
* (bluefox) Added possibility to set the analog mode
* (bluefox) Relay outputs are supported now

### 0.4.4 (2019-11-26)
* (bluefox) Fixed error by parsing of acknowledgement

### 0.4.2 (2019-06-12)
* (bluefox) Support of old measure values was added

### 0.3.2 (2018-11-19)
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018-2024 Bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.