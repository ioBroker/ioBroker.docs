---
BADGE-Build Status: https://github.com/foxriver76/ioBroker.bring/workflows/Test%20and%20Release/badge.svg
BADGE-Number of Installations: http://iobroker.live/badges/bring-installed.svg
BADGE-Stable version: http://iobroker.live/badges/bring-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.bring.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.bring.svg
BADGE-NPM: https://nodei.co/npm/iobroker.bring.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bring/README.md
title: ioBroker.bring
hash: rdsCje5tjT04Hrg5H/de65q+rPbZADbsGsBewi1sVKg=
---
![Логотип](../../../en/adapterref/iobroker.bring/admin/bring.png)

![Статус сборки](https://github.com/foxriver76/ioBroker.bring/workflows/Test%20and%20Release/badge.svg)
![Количество установок](http://iobroker.live/badges/bring-installed.svg)
![Стабильная версия](http://iobroker.live/badges/bring-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.bring.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bring.svg)
![НПМ](https://nodei.co/npm/iobroker.bring.png?downloads=true)

# ioBroker.bring

\===========================

## Отказ от ответственности

Разработчики данного модуля никоим образом не поддерживают компанию Bring! Labs AG и не связаны с ней, а также с какими-либо ее дочерними компаниями, логотипами или товарными знаками.

## Штаты

Описание созданных состояний приведено ниже.

### Канал: информация

- info.connection

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  | логический |      Р     |

  _Логический индикатор только для чтения. Если ваш брокер авторизован на момент запуска, состояние истинно, в противном случае — ложно._

- info.user

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    нить    |      Р     |

  _Строка только для чтения. Содержит имя вошедшего в систему пользователя._

### Списки покупок

Для каждого списка покупок будет создан канал со следующими состояниями:

- _list.content_ / _list.contentHtml_ /NoHead

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    нить    |      Р     |

  _Только для чтения строка JSON/HTML, отформатированная как список или HTML-таблица. Содержит товары, которые в данный момент находятся в вашем списке покупок. HTML-таблицы NoHead не содержат заголовков. Содержимое переводится с помощью словаря для возможности использования в адаптерах визуализации._

- _list.recentContent_ / _list.recentContentHtml_ /NoHead

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    нить    |      Р     |

  _Только для чтения строка JSON/HTML, отформатированная как список или HTML-таблица. Содержит товары, которые недавно были в вашем списке покупок. HTML-таблицы NoHead не содержат заголовков. Содержимое переводится с помощью словаря для возможности использования в адаптерах визуализации._

- _список_ .removeItem/Translated

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    нить    |     Р/В    |

  _Выберите элемент, который следует удалить из списка покупок и списка недавно использованного контента. Состояние будет подтверждено после подтверждения команды API Bring! Обратите внимание, что переведенные состояния используют словарь перед взаимодействием с API._

- _list_ .moveToRecentContent/Translated

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    нить    |     Р/В    |

  _Выберите элемент, который следует переместить или добавить в список последних изменений. Состояние будет подтверждено после подтверждения команды API Bring! Обратите внимание, что для перевода состояний используется словарь перед взаимодействием с API._

- _список_ .saveItem/Translated

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    нить    |     Р/В    |

  _Выберите товар, который следует добавить в список покупок. Вы также можете указать дополнительную информацию о товаре, задав его состояние с помощью следующей схемы:_

  `Apple, 2.50 $, the green ones`

  _Обратите внимание, что всё, что находится после запятой, описывает спецификацию. Состояние будет подтверждено, когда команда будет подтверждена API Bring! Обратите внимание, что для преобразования состояний используется словарь перед взаимодействием с API._

- _list.users_ / _list.usersHtml_ /NoHead

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    нить    |      Р     |

  _Строка JSON/HTML, отформатированная как список или HTML-таблица, предназначена только для чтения. Содержит пользователей, входящих в список покупок, а также их адреса электронной почты. HTML-таблицы NoHead не содержат заголовков._

- _список_ .счет

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    число   |      Р     |

  _Число только для чтения, которое обозначает количество элементов в списке._

- _список_ .messageTrigger

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |   кнопка   |     Р/В    |

  _При нажатии этой кнопки список покупок будет отправлен на указанные вами устройства, например, Pushover, Telegram и/или по электронной почте._

- _список_ .enumSentence

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    нить    |      Р     |

  _Строка только для чтения, содержащая перечисление пунктов списка покупок в произносимой форме. Ее можно использовать, например, для голосового вывода через голосовых помощников._

- _список_ .перевод

  | Тип данных | Разрешение |
  | :--------: | :--------: |
  |    нить    |      Р     |

  _Читать только JSON-строку, содержащую словарь для перевода швейцарских названий элементов на язык списка._

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.9.1 (2025-01-21)
* (@foxriver76) fixed issue on token expiration

### 1.9.0 (2024-11-27)
* (@foxriver76) updated `bring-shopping` module (get rid of deprecated `request` module)
* (@foxriver76) dropped support for Node.js 16 (it is EOL)

### 1.8.4 (2023-09-25)
* (foxriver76) fixed setting `undefined` state when no name specified

### 1.8.3 (2023-09-25)
* (foxriver76) Improve error messages

### 1.8.2 (2023-09-24)
* (foxriver76) do not crash on invalid `setState` calls (closes #211)

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

Copyright (c) 2019-2025 Moritz Heusinger <moritz.heusinger@gmail.com>

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