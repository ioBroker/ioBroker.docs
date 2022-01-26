---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.youtube/README.md
title: ioBroker.youtube
hash: cR9gnGZYyuEmo9ikWHbKgC9ImOrMKQEQAirK5Ah/LUk=
---
![Логотип](../../../en/adapterref/iobroker.youtube/admin/youtube.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.youtube.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.youtube.svg)
![Стабильный](http://iobroker.live/badges/youtube-stable.svg)
![установлены](http://iobroker.live/badges/youtube-installed.svg)
![Статус зависимости](https://img.shields.io/david/klein0r/iobroker.youtube.svg)
![Известные уязвимости](https://snyk.io/test/github/klein0r/ioBroker.youtube/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.youtube.png?downloads=true)

# IoBroker.youtube
![Тестирование и выпуск](https://github.com/klein0r/ioBroker.youtube/workflows/Test%20and%20Release/badge.svg)

Статистика, такая как просмотры, подписчики и видео

## При финансовой поддержке
[![ioBroker Master Kurs] (https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-youtube)

## Установка
Используйте «список адаптеров» в ioBroker, чтобы установить стабильную версию этого адаптера. Вы также можете использовать интерфейс командной строки для установки этого адаптера:

```
iobroker add youtube
```

## Конфигурация
Чтобы получить API-ключ, вам нужно перейти к [console.developers.google.com](https://console.developers.google.com/apis/dashboard).

1. Создайте новый проект.
2. Создайте новый ключ API.
3. Добавьте в библиотеку "YouTube Data API v3".
4. Используйте этот ключ API на панели параметров.
5. Добавьте несколько каналов на вкладке каналов, используя идентификатор и собственное имя.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 2.0.3

* (klein0r) Fixed missing VIS widget

### 2.0.1

* (klein0r) Fixed missing translations

### 2.0.0

* (klein0r) Admin 5 Support

### 1.1.1

* (klein0r) Updated dependencies

### 1.1.0

* (klein0r) Encrypt sensitive information **(BREAKING CHANGE - RE-ENTER YOUR API KEY)**

### 1.0.3

* (klein0r) Remove forbidden chars from state
* (klein0r) Fixed async object creation

### 1.0.2

* (klein0r) Delete unsed states

### 1.0.1

* (klein0r) Fixed trailing dot in channel error message

### 1.0.0

* (klein0r) First stable release

### 0.0.13

* (klein0r) Changed to new library

### 0.0.12

* (klein0r) Added json summary

### 0.0.11

* (klein0r) setTimeout found in main.js, but no clearTimeout detected

### 0.0.10

* (klein0r) Added missing translations

### 0.0.9

* (klein0r) Updated depencencies

### 0.0.8

* (klein0r) Removed link from overview

### 0.0.7

* (klein0r) Added VIS widget

### 0.0.6

* (klein0r) Collect YouTube information after configuration changes

### 0.0.5

* (klein0r) Bugfix

### 0.0.4

* (klein0r) Added more options

### 0.0.3

* (klein0r) Support for multiple channels

### 0.0.2

* (klein0r) improved error handling

### 0.0.1

* (klein0r) initial release

## License

The MIT License (MIT)

Copyright (c) 2021 Matthias Kleine <info@haus-automatisierung.com>

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