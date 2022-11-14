---
BADGE-Number of Installations: http://iobroker.live/badges/bring-installed.svg
BADGE-Stable version: http://iobroker.live/badges/bring-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.bring.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.bring.svg
BADGE-NPM: https://nodei.co/npm/iobroker.bring.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bring/README.md
title: ioBroker.bring
hash: n6gj+FadnEAVuCqrbe2EjFPQ5wpAhfWqqMdNwo4T0LQ=
---
![Логотип](../../../en/adapterref/iobroker.bring/admin/bring.png)

![Количество установок](http://iobroker.live/badges/bring-installed.svg)
![Стабильная версия](http://iobroker.live/badges/bring-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.bring.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bring.svg)
![НПМ](https://nodei.co/npm/iobroker.bring.png?downloads=true)

# IoBroker.bring
===========================

![Статус сборки](https://github.com/foxriver76/ioBroker.bring/workflows/Test%20and%20Release/badge.svg)

## Отказ от ответственности
Разработчики этого модуля никоим образом не поддерживаются и не связаны с Bring! Labs AG или любые связанные дочерние компании, логотипы или товарные знаки.

## Состояния
Описание созданных состояний см. ниже.

### Канал: информация
* информация.связь

    |Тип данных|Разрешение|
    |:---:|:---:|
    |логический|R|

   * Логический индикатор только для чтения. Если ваш брокер вошел в систему, состояние равно true, в противном случае — false.*

* информация.пользователь

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|Р|

   * Строка только для чтения. Содержит имя вошедшего в систему пользователя.*

### Списки покупок
Для каждого списка покупок будет создан канал со следующими состояниями:

* *список*.content / *список*.contentHtml/NoHead

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|Р|

* Строка json/html только для чтения, отформатированная как список или таблица html. Содержит элементы, которые в настоящее время находятся в вашем списке покупок.
Таблицы NoHead Html не содержат заголовков таблиц. Содержимое переводится через словарь, чтобы его можно было использовать в адаптерах визуализации.*

* *список*.recentContent / *список*.recentContentHtml/NoHead

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|Р|

* Строка json/html только для чтения, отформатированная как список или таблица html. Содержит предметы, которые недавно были в вашем списке покупок.
Таблицы NoHead Html не содержат заголовков таблиц. Содержимое переводится через словарь, чтобы его можно было использовать в адаптерах визуализации.*

* *список*.removeItem/переведено

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|чтение/запись|

* Выберите элемент, который следует удалить из списка покупок и списка последних материалов.
Состояние будет подтверждено, когда команда будет подтверждена командой Bring! API.
Обратите внимание, что переведенные состояния используют словарь перед взаимодействием с API.*

* *список*.moveToRecentContent/Переведено

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|чтение/запись|

* Выберите элемент, который следует переместить или добавить в список недавнего содержимого.
Состояние будет подтверждено, когда команда будет подтверждена командой Bring! API.
Обратите внимание, что переведенные состояния используют словарь перед взаимодействием с API.*

* *список*.saveItem/переведено

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|чтение/запись|

*Выберите товар, который нужно добавить в список покупок. Вы также можете указать дополнительную информацию об элементе, задав состояние по следующей схеме:*

```Apple, 2.50 $, the green ones```

*Обратите внимание, что все, что стоит за запятой, описывает спецификацию.
Состояние будет подтверждено, когда команда будет подтверждена командой Bring! API.
Обратите внимание, что переведенные состояния используют словарь перед взаимодействием с API.*

* *список*.users / *список*.usersHtml/NoHead

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|Р|

* Строка json/html только для чтения, отформатированная как список или таблица html. Содержит пользователей, которые являются частью списка покупок, а также их адреса электронной почты.
Таблицы NoHead Html не содержат заголовков.*

* *список*.количество

    |Тип данных|Разрешение|
    |:---:|:---:|
    |число|R|

   *Число только для чтения, которое представляет количество содержащихся элементов списка.*

* *список*.messageTrigger

    |Тип данных|Разрешение|
    |:---:|:---:|
    |кнопка|R/W|

*Если вы нажмете эту кнопку, список покупок будет отправлен на настроенные экземпляры, например. грамм. Pushover, Telegram и/или электронная почта.*

* *список*.enumSentence

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|Р|

*Строка только для чтения, содержащая перечисление элементов списка покупок в озвученной форме.
Это можно использовать, т. грамм. для голосового вывода через интеллектуальных помощников.*

* *список*.перевод

    |Тип данных|Разрешение|
    |:---:|:---:|
    |строка|Р|

    * Строка json только для чтения, которая содержит словарь для перевода названий швейцарских элементов на язык списка.*

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.8.1 (2022-06-01)
* (foxriver76) implemented a minor fix for acknowledgment of `translated` objects

### 1.8.0 (2022-06-01)
* (foxriver76) introduced new states for `save/remove/movetoRecentContent` which translates the article before passing it to the API (closes #149)

### 1.7.16 (2022-05-31)
* (foxriver76) we now ensure that all states which can be used directly are translated (closes #149)

### 1.7.15 (2022-05-26)
* (foxriver76) widget: fixed `margin-top` calculation of item name

### 1.7.14 (2022-05-22)
* (foxriver76) log the error message instead of object, if we catch errors in the widget

### 1.7.13 (2022-02-05)
* (foxriver76) fixed the onclick handler if someone added just a number

### 1.7.12 (2022-02-05)
* (foxriver76) fixed infinity loop in some browsers, if the fallback image of an article cannot be recevied (closes #109)

### 1.7.11 (2022-01-21)
* (foxriver76) fixed telegram user selection

### 1.7.9 (2021-12-07)
* (foxriver76) we fixed default value of `count` state beeing an empty string

### 1.7.8 (2021-08-04)
* (foxriver76) widget: fix blue border on input text field in Safari when focussing

### 1.7.7 (2020-12-12)
* (foxriver76) fix potential crash on `pollAllLists` function

### 1.7.6 (2020-12-05)
* (foxriver76) we now use a unique name for widget rendering function to avoid conflicts
* (foxriver76) if we cannot render widget immediately we try again after one second (see #57)

### 1.7.4 (2020-12-04)
* (foxriver76) we now render the widget immediately

### 1.7.3 (2020-10-26)
* (foxriver76) bring module now returns real errors instead of strings, handle them correct

### 1.7.2 (2020-04-23)
* (foxriver76) fixed potential issue on rendering widget

### 1.7.1 (2020-02-13)
* (foxriver76) we are now using AES-256-CBC as encryption

### 1.6.8 (2019-12-31)
* (foxriver76) ensure compatibility with older browsers

### 1.6.6 (2019-11-21)
* (foxriver76) improved error handling in widget

### 1.6.5 (2019-09-22)
* (foxriver76) re-auth when bearer token is no longer valid

### 1.6.3 (2019-08-28)
* (foxriver76) fixed bug which only allowed one registered event handler
* (foxriver76) by using obj with wid instead of var because vis handles global variables of widgets global
* (foxriver76) now more bring widgets can be used in one vis project
* (foxriver76) bump version of textFit to 2.3.1 -> 2.4.0 and use minified version

### 1.6.2 (2019-08-04)
* (foxriver76) also use translations for enumSentence and notifiations (e. g. email)

### 1.6.1 (2019-07-13)
* (foxriver76) fixed bug, that prevent html states and other from being set

### 1.6.0 (2019-07-12)
* (foxriver76) get translations according to list language
* (foxriver76) translations will be stored in datapoint
* (foxriver76) use bring-node-api at least 1.2.1
* (foxriver76) widget now uses configured language
* (foxriver76) bugfixes and optimizations in front- and backend

### 1.4.0 (2019-06-07)
* (foxriver76) use textFit to fit text to one line in widget
* (foxriver76) internal reworks on widget

### 1.3.4
* (foxriver76) add possibility to use this widget multiple times on same page

### 1.3.3
* (foxriver76) also change height and div sizes according to users specification
* (foxriver76) when item is on recent list and added by text input it is now instantly removed from recent list

### 1.3.2
* (foxriver76) enable configuration of width for items in widget

### 1.3.1
* (foxriver76) api module outsourced

### 1.3.0
* (foxriver76) added widget
* (foxriver76) add possibility to move items to recentContent

### 1.2.1
* (foxriver76) uri encode login request because it can contain special character

### 1.2.0
* (foxriver76) added state which contains a speakable enumeration of each shopping list

### 1.1.0
* (foxriver76) add possibility to send messages
* (foxriver76) respect in app list renaming / recreate channel on name change

### 1.0.0
* (foxriver76) stable release

### 0.0.10
* (foxriver76) set info.connection state to false, when cannot get data

### 0.0.9
* (foxriver76) also update no head states on normal polling
* (foxriver76) fix bug where polling could grow exponentially
* (foxriver76) fix unhandled error when no internet connection

### 0.0.8
* (foxriver76) add html states w/o header
* (foxriver76) minor fixes

### 0.0.7
* (foxriver76) fixed a potential memory leak by setTimeout functions

### 0.0.6
* (foxriver76) add equivalent html states for json states
* (foxriver76) add counter for every list

### 0.0.4
* (foxriver76) fix when login fails

### 0.0.3
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2019-2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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