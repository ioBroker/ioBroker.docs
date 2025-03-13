---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pjlink/README.md
title: ioBroker.pjссылка
hash: nkmGmjt70xaRl8i7F74+GYPsaaiq/NlgGtOsXAg7dRA=
---
![Логотип](../../../en/adapterref/iobroker.pjlink/admin/pjlink.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.pjlink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pjlink.svg)
![Количество установок](https://iobroker.live/badges/pjlink-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/pjlink-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.pjlink.png?downloads=true)

# IoBroker.pjlink
![Тест и выпуск](https://github.com/Bannsaenger/ioBroker.pjlink/workflows/Test%20and%20Release/badge.svg)

## Адаптер pjlink для ioBroker
Управление проектором PJLink

**!! На данный момент поддерживается только протокол класса 1**

## О PJLink
> PJLink — это единый стандарт для эксплуатации и управления проекторами данных.
PJLink обеспечивает централизованное управление проекторами, произведенными разными поставщиками, а проекторами можно управлять с помощью контроллера.
Оборудование, совместимое с PJLink, может управляться и контролироваться в любое время и в любом месте, независимо от производителя.
PJLink — это новый стандарт, разработанный для того, чтобы сделать интерфейсы связи и протоколы связи, которые отличались у разных производителей проекторов, унифицированными и общими.

> Оборудование, совместимое с PJLink, отличается высокой степенью взаимосвязанности между различными моделями и производителями, что позволяет легко создавать среды, сочетающиеся с различными моделями и системами, а также легко заменять уже установленные системы.

* [Взято с домашней страницы PJLink](https://pjlink.jbmia.or.jp/english/)

## Кредиты
Протокол является товарным знаком: **Авторские права © Japan Business Machine and Information System Industries Association. Все права защищены,** [Домашняя страница PJLink](https://pjlink.jbmia.or.jp/english/)

Эта работа основана на модуле nodejs с реализацией pjlink от **sy1vain**: [https://github.com/sy1vain/node-pjlink](https://github.com/sy1vain/node-pjlink)

## Задача
* поддержка проекта node-pjlink для реализации класса 2
* вернуться к библиотеке pjlink на github. Сейчас библиотека находится локально из-за ошибки в тестовом скрипте

## Как работает адаптер
На данный момент поддерживается только класс 1. Это означает, что адаптер может только опрашивать статус.
Активная отправка информации о статусе с устройства на адаптер может быть добавлена, как только будет поддерживаться класс 2.

#### Входы PJLink класса 1
* Входы должны быть установлены как 2-значные числа. Первая цифра описывает тип входа

| Тип | Количество | Возможные входы |
| ------- | ------ | --------------- |
| РГБ | 1 | 1 - 9 |
| ВИДЕО | 2 | 1 - 9 |
| ЦИФРОВОЙ | 3 | 1 - 9 |
| ХРАНЕНИЕ | 4 | 1 - 9 |
| СЕТЬ | 5 | 1 - 9 |

Возможные входы можно найти в базе данных после запуска адаптера в разделе > pjlink.\<instance\>.deviceInfo.availableInputs

Вы можете редактировать объект ввода в конфигурации экземпляра. Там вы можете редактировать имена вводов и позволить объекту базы данных проверять ваши вводы.

### Выключатель питания
С состоянием (установлено на **true**)

> pjlink.\<экземпляр\>.power

проектор можно включать и выключать в зависимости от текущего состояния питания.

> pjlink.\<instance\>.powerStatus

Выключатель питания автоматически вернется в положение **false**.

#### Состояние лампы
В базе данных предопределена только одна лампа. Если запрос лампы возвращает более одной лампы, остальные лампы будут добавлены динамически.

#### Функция пинга
Если проектор недоступен в течение длительного периода, адаптер может переключиться на icmp ping для проверки доступности, например, после 3 неудачных подключений. Если на один ping получен ответ, адаптер пытается снова подключиться, см. [https://github.com/Bannsaenger/ioBroker.pjlink/issues/59](https://github.com/Bannsaenger/ioBroker.pjlink/issues/59)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Bannsaenger) updated dependencies
* (Bannsaenger) added ping feature

### 0.1.1 (2023-01-24)
* (Bannsaenger) temporarily fix the test script error with local libraries

### 0.1.0 (2023-01-23)
* (Bannsaenger) extended configuration to let you choose the frequency and time for information retrieval
* (Bannsaenger) add possibility to customize media.input by the **INST** query and edit the names in instance config
* (Bannsaenger) add non-guaranteed time after power ON (number of skipped short cycles after power ON event)
* (Bannsaenger) moved all status queries to one timer due to authentification issues when queries are executed at the same time
* (Bannsaenger) treat error "unavailabe time" only as warning and log it only once

### 0.0.3 (2022-10-19)
* (Bannsaenger) updated react dependency

### 0.0.2 (2022-10-19)
* (Bannsaenger) changed some info logs to debug. Fixed one power state issue.
* (Bannsaenger) redesign of timer and error handling

### 0.0.1 (2022-10-13)
* (Bannsaenger) initial release

## License
MIT License

Copyright (c) 2022-2025 Bannsaenger <bannsaenger@gmx.de>

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