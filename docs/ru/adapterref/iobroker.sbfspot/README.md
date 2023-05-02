---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sbfspot/README.md
title: ioBroker.sbfspot
hash: Nu1nQOSXWDiKNtL/Z0rrhwfFTJzjxTb5rRgmBUpy9xk=
---
![Логотип](../../../en/adapterref/iobroker.sbfspot/admin/sbfspot.png)

![Количество установок](http://iobroker.live/badges/sbfspot-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sbfspot.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.sbfspot.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.sbfspot/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sbfspot.png?downloads=true)

# IoBroker.sbfspot
![Действия на GitHub](https://github.com/rg-engineering/ioBroker.sbfspot/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

**Если вам это нравится, рассмотрите пожертвование:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Этот адаптер считывает данные с инверторов мощности SMA с помощью sbfspot.
Теперь поддерживаются оба типа баз данных (mySQL и sqlite).
Начиная с версии 0.2.3 доступен собственный виджет vis на основе флота для отображения исторических данных.

## Монтаж
следуйте инструкциям по установке sbfspot по адресу https://github.com/SBFspot/SBFspot/wiki.

[детальная установка на системы на базе манипулятора](docs/en/install_arm.md)

## Подсказки
* используйте последнюю версию sbfspot с https://github.com/SBFspot/SBFspot
* адаптер, sbfspot и базы данных (mySQL или sqlite) должны работать в одной системе, т.е. Raspberry Pi
* руководство по установке sbfspot на Raspberry Pi (или аналогичном) можно найти по адресу https://github.com/SBFspot/SBFspot/wiki/Installation-Linux-SQLite или https://www.rg-engineering.eu/index. php/product/software/plugin-fuer-iobroker-sbfspot
* для Raspberry Pi есть инструмент полуавтоматической настройки, доступный по адресу https://github.com/SBFspot/sbfspot-config.

## Известные вопросы
* иногда установка пакета npm sqlite3 завершается сбоем.

в этом случае переустановите все пакеты npm

> cd /opt/iobroker/node_modules/iobroker.sbfspot > установка sudo npm

иногда npm intall необходимо вызывать более одного раза, чтобы успешно установить все необходимые пакеты.

* пожалуйста, создавайте задачи на [github](https://github.com/rg-engineering/ioBroker.sbfspot/issues), если вы обнаружите ошибки или хотите добавить новые функции

## 4.0.4 (2021-02-14)
* (Рене) обновлены зависимости

## 4.0.3 (15.01.2021)
* (Рене) исправление ошибки на основе тестов CI

## 4.0.2 (09.10.2020)
* (Рене) исправление ошибки на основе тестов CI

## 4.0.0 (2020-07-28)
* (Рене) доработка для использования async/await
* (Рене) использовать mysql2

## 3.0.0 (2020-04-25)
* (Рене) пакет sqlite3 заменен на пакет better-sqlite3
* (Рене) роли DP перегружены
* (Рене) см. проблему № 19: получать данные только при добавлении дневного света в качестве опции
* (Рене) см. проблему № 29: изменен цвет по умолчанию для метки оси виджета
* Виджет (René): журнал, если добавлен слишком маленький виджет

## 2.4.3 (2020-04-02)
* (Рене) исправление в DB_CalcHistory_Today, используемом для виджета

## 2.4.2 (2020-02-01)
* (Рене) виджет исправления ошибок

## 2.4.0 (2019-12-28)
* (Рене) обновление моего собственного флота 3.0

## 2.3.4 (2019-10-31)
* (Рене) обновить флот до версии 3.0

### 2.3.3 (2019-02-03)
* (Рене) из-за проблем с установкой понижение версии пакета sqlite3

### 2.3.1 (2019-02-02)
* (Рене) исправление ошибки: с помощью sqlite данные «сегодня» не отображались

### 2.3.0 (20 января 2019 г.)
* (Rene) поддержка компактного режима
* (Рене) добавить дополнительную информацию об ошибке в журнал

### 2.2.5 (2018-11-26)
* (Рене) пакеты обновлений

### 2.2.5 (2018-11-04)
* (Рене) сбросить доходность, если нет нового значения с сегодняшнего дня

### 2.2.4 (2018-08-19)
* (René) исправление для тиков на X

### 2.2.3
* (Рене) то же, что и 2.2.2

### 2.2.2
* (Рене) добавить метку времени последнего обновления

### 2.2.1
* (René) закрытие соединения с базой данных после получения результата последнего запроса (например, для поддержки более одного инвертора)

### 2.2.0
* (Nis) цвет фона и границы
* (Рене) исправления ошибок в admin3

### 2.1.0
* (Рене) Поддержка MariaDB

### 2.0.1
* (Рене) Поддержка admin3

### 2.0.0
* (Рене) поскольку мы всегда используем один график для каждого виджета, теперь поддерживается только один

Внимание: виджет не совместим с версией 1.x.x; просто проверьте настройки в виджете после установки!

### 1.1.0
* (René) автомасштаб оси Y
* (Рене) цвет для оси Y
* (Рене) настраиваемый формат даты

### 1.0.1
* (Рене) исправление ошибки для sqlite

### 1.0.0
* (Рене) первый стабильный релиз

### 0.2.6
* (Рене) исправление ошибки для приложения Android> 1.0.6

### 0.2.5
* (Рене) использовать дату установки для расчета исторических значений

### 0.2.4
* Логотип (Рене) изменен

### 0.2.3
* (Рене) добавление исторических данных в виде точки данных (JSON)
* (Рене) новый виджет vis для отображения исторических данных

### 0.2.2
* (Рене) переименован в sbfspot

### 0.2.1
* (Рене) index.html обновлен

### 0.2.0
* (Рене) поддержка sqlite и лицензия изменены на MIT

### 0.1.1
* (Рене) Кодировка UTF8

### 0.1.0
* (Рене) первый релиз

### 0.0.1
* (Рене) первоначальный выпуск

## Changelog

### 4.1.4 (2023-04-07)
* (René) dependencies updated

### 4.1.3 (2023-01-31)
* (René) dependencies updated

### 4.1.2 (2022-08-20)
* (René) bug fix in AddObject 

### 4.1.1 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated

### 4.0.8 (2021-07-11)
* (René) bug fix color of labels in widget

### 4.0.7 (2021-10-30)
* (René) see issue #62: avoid endless loop
* (René) update flot to 4.2.2

### 4.0.6 (2021-07-09)
* (René) bug fix data types

### 4.0.5 (2021-03-21)
* (René) dependencies updated

## License
MIT License

Copyright (c) 2017-2023 rg-engineering info@rg-engineering.eu

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