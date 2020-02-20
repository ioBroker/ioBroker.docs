---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bring/README.md
title: ioBroker.bring
hash: n1lrpEniOSNdTJPhXYpr74N+pzHkxWVNnX3UPJa37bc=
---
![логотип](../../../en/adapterref/iobroker.bring/admin/bring.png)

![Количество установок](http://iobroker.live/badges/bring-installed.svg)
![Стабильная версия](http://iobroker.live/badges/bring-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.bring.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bring.svg)
![Значок Greenkeeper](https://badges.greenkeeper.io/foxriver76/ioBroker.bring.svg)
![NPM](https://nodei.co/npm/iobroker.bring.png?downloads=true)

# IoBroker.bring
===========================

![Статус сборки](https://github.com/foxriver76/ioBroker.bring/workflows/Test%20and%20Release/badge.svg)

## Состояния
Описание созданных состояний см. Ниже.

### Канал: информация
* info.connection

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Логическое | R |

   *Только для чтения логический индикатор. Если ваш брокер вошел в систему на принести, состояние true, иначе false.*

* info.user

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

   *Только для чтения строки. Содержит имя вошедшего в систему пользователя.*

### Списки покупок
Для каждого списка покупок будет создан канал со следующими состояниями:

* *list* .content / *list* .contentHtml / NoHead

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

*Только для чтения строки json / html, отформатированные в виде списка или HTML-таблицы. Содержит элементы, которые в настоящее время находятся в вашем списке покупок.
Таблицы NoHead Html не содержат заголовков таблиц.*

* *list* .recentContent / *list* .recentContentHtml / NoHead

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

*Только для чтения строки json / html, отформатированные в виде списка или HTML-таблицы. Содержит элементы, которые недавно были в вашем списке покупок.
Таблицы NoHead Html не содержат заголовков таблиц.*

* *список* .removeItem

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

*Выберите элемент, который должен быть удален из списка покупок и списка недавнего контента.
Состояние будет подтверждено, когда команда подтверждена командой Bring! API.*

* *список* .moveToRecentContent

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

*Выберите элемент, который следует переместить или добавить в список недавнего содержимого.
Состояние будет подтверждено, когда команда подтверждена командой Bring! API.*

* *список* .saveItem

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R / W |

*Выберите предмет, который должен быть добавлен в список покупок. Вы также можете указать дополнительную информацию об элементе, установив состояние по следующей схеме:*

```Apple, 2.50 $, the green ones```

*Обратите внимание, что все, что за запятой, описывает спецификацию.
Состояние будет подтверждено, когда команда подтверждена командой Bring! API.*

* *list* .users / *list* .usersHtml / NoHead

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

*Только для чтения строки json / html, отформатированные в виде списка или HTML-таблицы. Содержит пользователей, которые являются частью списка покупок, а также их адрес электронной почты.
Таблицы NoHead Html не содержат заголовков таблиц.*

* *список* .count

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Номер | R |

   *Только для чтения число, которое представляет количество содержащихся элементов списка.*

* *список* .messageTrigger

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Кнопка | R / W |

*Если вы нажмете эту кнопку, список покупок будет отправлен в настроенные экземпляры, e. грамм. Pushover, Telegram или / и E-Mail.*

* *список* .enumSentence

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

*Только для чтения строка, которая содержит перечисление элементов списка покупок в удобной для восприятия форме.
Это может быть использовано e. грамм. для вывода голоса через умных помощников.*

* *список* перевод

    | Тип данных | Разрешение |
    |:---:|:---:|
    | Строка | R |

    *Только для чтения строка json, которая содержит словарь для перевода имен швейцарских предметов на язык списка.*

## Changelog
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

Copyright (c) 2019 Moritz Heusinger <moritz.heusinger@gmail.com>

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