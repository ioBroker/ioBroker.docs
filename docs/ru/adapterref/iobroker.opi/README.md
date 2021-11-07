---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.opi/README.md
title: ioBroker.opi
hash: QqoAS/PadgUSoQ6qePLCst9ZR/TDQhwI4YF34Xz25TY=
---
![Логотип](../../../en/adapterref/iobroker.opi/admin/opi.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.opi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.opi.svg)
![НПМ](https://nodei.co/npm/iobroker.opi.png?downloads=true)

# IoBroker.opi
===================

Реализация OPI-Monitor для интеграции в ioBroker.

### Важная информация
протестированное оборудование: OrangePi plus2 H3

### После выбора доступны следующие объекты:
## *ПРОЦЕССОР*
- cpu_frequency
- load1
- load5
- load15

## *Объем памяти*
- memory_available
- memory_free
- memory_total

## *Сеть (eth0)*
- net_received
- net_send

## *eMMC*
- emmc_root_total
- emmc_root_used

## *Поменять местами*
- swap_total
- swap_used

## *Температура*
- soc_temp

## *Время работы*
- время безотказной работы

## *WLAN*
- wifi_received
- wifi_send

### Конфигурация
На странице конфигурации вы можете выбрать следующие модули:

- ПРОЦЕССОР
- Объем памяти
- Сеть
- eMMC
- Поменять местами
- температура
- Время безотказной работы
- WLAN

## 0.1.2 (2021-11-06)
* (foxriver76) мы больше не используем устаревший адаптер. объекты

## 0.1.1 (27.01.2018)
- обновить index_m.html.
- обновить index.html.
- обновить коды.

## 0.1.0 (24.01.2018)
- Поддержка Admin3.

## 0.0.6 (01.08.2017)
- стабильный выпуск.

## 0.0.2 (01.06.2017)
- Первый выпуск. Бета-версия.

## Changelog

## License
Modified for OrangePi by Johnny Schneider <johann.schneider1@googlemail.com>

Copyright (c) 2015-2016 husky-koglhof <husky.koglhof@icloud.com>

MIT License