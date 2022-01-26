---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wolf-smartset/README.md
title: ioBroker.wolf-smartset
hash: bN4EaqQHjH+xkpBdJY/ae+/E/cw7hkfnSrA3rs6ob9A=
---
![Логотип](../../../en/adapterref/iobroker.wolf-smartset/admin/wolf-smartset.png)

![Пожертвование Paypal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)
![Количество установок (последнее)](http://iobroker.live/badges/wolf-smartset-installed.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)
![Известные уязвимости](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/wolf-smartset-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)

# IoBroker.wolf-smartset
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)

## Адаптер wolf-smartset для ioBroker
Подключите Wolf Heating к iobroker. Этот адаптер подключен к облаку wolf-smartset. Это не локальное соединение. Преимущество в том, что вы можете использовать приложение Wolf-smartset, а также данные в iobroker.

## Аппаратное обеспечение
Вам понадобится модуль ISM7I или другой, совместимый с приложением wolf-smartset.

## Авторизоваться
Для входа вам понадобится только ваше имя пользователя и пароль от вашего смарт-приложения. После того, как вы нажмете «получить устройства», вы сможете выбрать свое отопление. Это оно.

## Changelog
### 0.2.2 (26.03.2021)
* (MeisterTR) fix timeouts, fix conection
### 0.2.1
* (MeisterTR) Rebuild api and objects, breaking change
### 0.1.2
* (MeisterTR) Poll and set Values
* (MeisterTR) Fix error at start

### 0.1.0
* (MeisterTR) First running Version, Poll Param Only

## License
MIT License

Copyright (c) 2021 MeisterTR <meistertr.smarthome@gmail.com>

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