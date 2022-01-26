---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.trivum/README.md
title: ioBroker.trivum
hash: OPUUq+XSk/V6xvZboFDmtK4R9e9OgPnZxtJRc9Tor10=
---
![Логотип](../../../en/adapterref/iobroker.trivum/admin/trivum.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.trivum.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.trivum.svg)
![Количество установок (последнее)](http://iobroker.live/badges/trivum-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/trivum-stable.svg)
![Статус зависимости](https://img.shields.io/david/TheBam1990/iobroker.trivum.svg)
![Известные уязвимости](https://snyk.io/test/github/TheBam1990/ioBroker.trivum/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.trivum.png?downloads=true)

# IoBroker.trivum
** Тесты: ** ![Тестирование и выпуск](https://github.com/TheBam1990/ioBroker.trivum/workflows/Test%20and%20Release/badge.svg)

## Тривиальный адаптер для ioBroker
Система Trivum Multiroom

## Руководство пользователя
Введите IP-адрес устройства во вкладке основных настроек.
Затем адаптер автоматически ищет доступные зоны и записывает их вместе со связанными объектами в список объектов.

Следующие переменные создаются как общие (глобальные):

-Выключи все

-Активные зоны (сколько зон сейчас включено)

Затем соответствующие элементы управления по отдельным зонам:

-Mute (отключение звука и повторная активация)

-Defoult-Stream (активация зоны стандартным веб-потоком)

-Defoult tuner (активация зоны штатным тюнером)

-Volume (отображать громкость и менять ее)

-Zone-Off (выключить зону)

-Состояние зоны (показывает, включена или выключена зона)

## Changelog

### 0.0.4 (2021-06-12)
* (TheBam) Paging added and info.connection fixed for admin 5

### 0.0.3 (2021-04-29)
* (TheBam) Cleaning the code

### 0.0.2
* (TheBam) Cleaning the code

### 0.0.1
* (TheBam) First version to control your Trivum Multiroom Systems

## License
MIT License

Copyright (c) 2021 TheBam <elektrobam@gmx.de>

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
SOFTWARE."# ioBroker.trivum"