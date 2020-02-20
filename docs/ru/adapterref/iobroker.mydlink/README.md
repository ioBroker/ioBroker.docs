---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mydlink/README.md
title: ioBroker.mydlink
hash: Z/pfhpgN8a8nIfFFaCuewqG0zq4C99nOwLHhTA569qA=
---
![логотип](../../../en/adapterref/iobroker.mydlink/admin/mydlink.png)

![Количество установок](http://iobroker.live/badges/mydlink-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.mydlink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mydlink.svg)
![тесты](https://travis-ci.org/arteck/ioBroker.mydlink.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.mydlink.png?downloads=true)
![Значок Greenkeeper](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.mydlink.svg)

# IoBroker.mydlink
Адаптер MyDlink для ioBroker.
-------------------------------------------------- ----------------------------

Позволяет управлять силовыми розетками или детекторами движения из [D-Link](https://eu.dlink.com/uk/en/for-home/smart-home) из ioBroker.

В настоящее время проверенные устройства:

| Модель | Тип | Изображение |
| :---: | :---: | :---: |
| [DSP-W215](https://eu.dlink.com/uk/en/products/dsp-w215-smart-plug) | Розетка (розетка, температура, ток) | ![Образ](../../../en/adapterref/iobroker.mydlink/admin/DSP_W215.png) |
| [DCH-S150] (https://eu.dlink.com/uk/en/products/dch-s150-motion-sensor) | Детектор движения (последнее обнаруженное движение) | ! [Image] (admin / DCH_S150.png) |

Адаптер должен опрашивать устройства. Таким образом, показания датчика и обнаружение движения будут задерживаться интервалом опроса (может быть установлен в конфигурации).

#### Конфигурация:
* глобальный интервал опроса - Адаптер будет опрашивать все устройства в этом интервале, если они не имеют определенного установленного интервала. Установите 0, чтобы отключить.
* Список устройств, каждое устройство со следующими настройками:

<table><tr><td> имя </td><td> установите здесь имя, должно быть уникальным (для устройств mydlink) </td></tr><tr><td> IP </td><td> введите здесь IP-адрес, имя хоста также должно работать </td></tr><tr><td> ШТЫРЬ </td><td> PIN-код напечатан на наклейке на устройстве, вероятно, внизу </td></tr><tr><td> Интервал опроса </td><td> для каждого интервала опроса устройства оставьте пустым, чтобы использовать глобальный интервал опроса. <br /> Установите 0, чтобы отключить опрос. <br /> <b>Рекомендация:</b> установите быстрый интервал опроса для датчиков и более длинный для штекеров. </td></tr><tr><td> включить </td><td> если не включен, не будет опрашиваться или контролироваться. <br /> Устройства, которые не подключены, могут быть отключены, чтобы избежать сообщений об ошибках в журнале. </td></tr></table>

Адаптер не мешает использованию приложения.

## Changelog

### 0.0.6
* (Garfonso) prevent removement of custom details in objects.

### 0.0.5
* (Garfonso) fixed config files for release in latest repository.

### 0.0.4
* (Garfonso) polling interval can now be configured on per device basis (if not configured for a device global poll intervall will be used.) Recommendation: Use high global poll interval and a smaller one for motion detectors.
* (Garfonso) added no_motion state for motion detectors, contains number of seconds since last motion.

### 0.0.3
* (Garfonso) use setStateChanged instead of polling state before writing.
* (Garfonso) minor clean ups.

### 0.0.2
* (Garfonso) move to ioborker-community-adapters

### 0.0.1
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2020 Garfonso <garfonso@mobo.info>

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