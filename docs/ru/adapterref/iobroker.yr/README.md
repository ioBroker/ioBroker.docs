---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yr/README.md
title: ioBroker.yr
hash: nJ8ThmSwhhe6DrBPNofMOL2H//cmHUGTqSf3IviPa0w=
---
![Логотип](../../../en/adapterref/iobroker.yr/admin/yr.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.yr.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.yr.svg)
![Количество установок (последнее)](http://iobroker.live/badges/yr-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/yr-stable.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.yr.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.yr/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.yr.png?downloads=true)

# IoBroker.yr
** Тесты: ** ![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.met/workflows/Test%20and%20Release/badge.svg)

## Год нет адаптера для ioBroker
получает прогноз погоды на 10 дней из [год нет](yr.no)

[yr.no] (yr.no) является совместной службой [Норвежского метеорологического института] (met.no) и [Норвежской радиовещательной корпорации](nrk.no)

https://api.met.no/weatherapi/locationforecast/2.0/documentation

** Примечание ** - если _ "Отправить недостающие переводы на iobroker.net" _ активировано (по умолчанию) отсутствующие переводы будут отправлены на сервер iobroker.net. Никакие IP-адреса или какая-либо дополнительная информация не будет храниться или анализироваться. Просто отсутствует перевод.

## Иконки
Иконки взяты отсюда [https://api.met.no/weatherapi/weathericon/2.0/documentation](https://api.met.no/weatherapi/weathericon/2.0/documentation) и принадлежат yr.no.

## ДЕЛАТЬ
* Добавить метеограмму (png, вероятно, перестанет работать с новым API)
* Добавить дневной прогноз на основе почасового прогноза
* Добавить таблицу html

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->
## 1.0.4 [2016-07-06]
* (bluefox) исправить ссылку на readme

### 1.0.3 [2016-05-17]
* (bluefox) изменить путь к файлу readme

### 1.0.2 [2016-05-16]
* (bluefox) добавить переводы

### 1.0.1 [2016-04-25]
* (bluefox) добавить переводы

### 1.0.0 [2016-03-15]
* (bluefox) изменить парсинг городов

### 0.1.9 [2015-10-28]
* (bluefox) исправить ошибку с переводами

### 0.1.8 [2015-10-27]
* (bluefox) переводы
* (bluefox) автоматическая загрузка недостающих переводов на iobroker.net

### 0.1.7 [2015-07-10]
* (bluefox) make yr работает с виджетами метро

### 0.1.6 [12.06.2015]
* (bluefox) переводы

### 0.1.5 [2015-03-26]
* (bluefox) переводы

### 0.1.4 [2015-03-24]
* (bluefox) удалить единицу "%" для "направления ветра"

### 0.1.3 [2015-03-22]
* (bluefox) исправить ошибку с завтра и послезавтра

### 0.1.2 [2015-03-08]
* (bluefox) правильные ссылки на сайт yr.no

### 0.1.1
* (bluefox) добавить переводы погодных условий на другие языки

### 0.1.0
* (bluefox) год обновления модели новых объектов

### 0.0.4
* (hobbyquaker) добавить «прогноз». указать идентификаторы

### 0.0.3
* (hobbyquaker) пользовательский интерфейс настроек с автозаполнением местоположения
* (hobbyquaker) yr_forecast переименован в прогноз
* (hobbyquaker) добавлен атрибут children
* (hobbyquaker) уменьшена детализация журнала
* (hobbyquaker) исправления

### 0.0.2
* (hobbyquaker) исправления

### 0.0.1
* (hobbyquaker) первый выпуск

## Делать
* setState прогноз_объект

## Changelog

### 3.0.0 [2021-06-06]
* (withstu) Switch to new JSON API and change data Structure (breaking)
* (withstu) Update project dependencies
* (arteck) Type of state was corrected  

### 2.0.3 [2018-10-10]
* (bluefox) add translations

### 2.0.2 [2018-08-01]
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.0.6 [2017-05-27]
* (Andre) Update iconset

### 1.0.5 [2016-10-10]
* (bluefox) move weather widgets to this adapter

## License
The MIT License (MIT)

Copyright (c) 2014-2021 hobbyquaker <hq@ccu.io>

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