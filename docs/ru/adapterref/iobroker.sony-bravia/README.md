---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sony-bravia/README.md
title: ioBroker.sony-bravia
hash: EYBAcI/Mg99FPl4w5uYns3LSuhJU9dlIDtbqZ839I98=
---
![Логотип](../../../en/adapterref/iobroker.sony-bravia/admin/sony-bravia.png)

![Количество установок](http://iobroker.live/badges/sony-bravia-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.sony-bravia.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sony-bravia.svg)

# IoBroker.sony-bravia
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/iobroker.sony-bravia/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sony-bravia/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Адаптер Sony Bravia Android Smart-TV для ioBroker
Это адаптер ioBroker для вашего Sony Bravia Smart-TV с ОС Android. Протестировано с KD-65X8507C.

## Настройка ТВ
* Включите телевизор
* На телевизоре выберите «Настройки» > «Сеть» > «Настройка домашней сети» > «Удаленное устройство/рендерер» > «Вкл.».
* На телевизоре выберите «Настройки» > «Сеть» > «Настройка домашней сети» > «Управление IP» > «Аутентификация» > «Обычный и общий ключ».
* На телевизоре перейдите в «Настройки»> «Сеть»> «Настройка домашней сети»> «Удаленное устройство/рендерер»> «Введите предварительный общий ключ»> 0000 (или как хотите, чтобы был ваш ключ PSK)
* На телевизоре выберите «Настройки» > «Сеть» > «Настройка домашней сети» > «Удаленное устройство/рендерер» > «Простое управление IP» > «Вкл.».

## Changelog
### 1.0.8 (2022-04-25)
* (Apollon77) Fix crash cases reported by sentry

### 1.0.7 (2022-04-24)
* (Apollon77) Fix tier definition

### 1.0.6 (2022-04-23)
* (ThomasBra) Audio volume/mute control
* (ThomasBra) value lists for AV Contents
* (Apollon77) Add Sentry error reporting

### 1.0.5
* (ThomasBra) Fix for content list request for older api versions

### 1.0.4
* (ThomasBra) Added info.modelInformation
* (ThomasBra) Added info.playingContentInfo - title of the used channel or port
* (ThomasBra) Set info.powerStatusActive changeable
* (ThomasBra) Turn over to tv channels - the first 150 listed tv channels
* (ThomasBra) Turn over to AV Content - external input
* (ThomasBra) Starting / Terminate Apps
* (ldittmar) Fixes from adapter checker

### 1.0.3
* (Apollon77) info.powerStatusActive added and other optimizations

### 1.0.2
* (raintonr) Added info.powerStatusActive
* (raintonr) Optimizations

### 1.0.1
* (ldittmar) compact mode compatibility added
* (ldittmar) add chinese support

### 1.0.0
* (ldittmar) Support of admin3

### 0.1.0
* (ldittmar) Test phase terminated. Adapter enabled.

### 0.0.5
* (ldittmar) Open beta test phase - please test it and give me feedback here as a issue or in the forum http://forum.iobroker.net/viewtopic.php?f=23&t=6406

### 0.0.1
* (ldittmar) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2022 ldittmar <iobroker@lmdsoft.de>

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
