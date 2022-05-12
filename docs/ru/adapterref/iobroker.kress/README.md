---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kress/README.md
title: ioBroker.kress
hash: UgRpc0kynJZc18W8/210Gtr5rdwjSg15gBuNMpiDffo=
---
![Кресс-Роботикс](../../../en/adapterref/iobroker.kress/admin/kress-2.png)

![Количество установок](http://iobroker.live/badges/kress-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.kress.svg)
![НПМ](https://nodei.co/npm/iobroker.kress.png?downloads=true)
![Трэвис-CI](https://api.travis-ci.org/MeisterTR/ioBroker.kress.svg?branch=master)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/MeisterTR/ioBroker.kress?branch=master&svg=true)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kress.svg)

# IoBroker.kress
[Deutsche Beschreibung Hier](README_de.md)

Этот адаптер соединяет ioBroker с вашей облачной поддержкой Kress. Температура, время скашивания, уровень заряда батареи и различные другие данные считываются с газонокосилки. Адаптер может управлять газонокосилкой, и вы можете изменять параметры конфигурации, такие как время кошения.

## Установка
Должен быть установлен как минимум Node 4.X.X, Node 0.10 и 0.12 больше не поддерживаются этим адаптером.

## Настройки
- для подключения к газонокосилке введите адрес электронной почты и пароль от своего рабочего аккаунта в Config.

## Вторая косилка
-Если две косилки должны быть интегрированы, должен быть установлен второй экземпляр, один выбирается в конфигурации косилки 0 и во второй косилке 1 и так далее.

## Уведомление
Bild-Quelle: https://www.kress-robotik.com/de/

## Changelog
### 2.5.5 (17.07.2018)
* (MeisterTR) initinal relase

## License
The MIT License (MIT)

Copyright (c) 2017 MeisterTR <meistertr.smarthome@gmail.com>

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