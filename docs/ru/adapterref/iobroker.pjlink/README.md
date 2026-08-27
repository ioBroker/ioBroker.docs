---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pjlink/README.md
title: ioBroker.pjlink
hash: WMYyUCmJf3uL/OkE/7ikxum6NtgrLHsELY+PNQgpcMk=
---
![Логотип](../../../en/adapterref/iobroker.pjlink/admin/pjlink.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.pjlink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pjlink.svg)
![Количество установок](https://iobroker.live/badges/pjlink-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/pjlink-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.pjlink.png?downloads=true)

# IoBroker.pjlink
![Тестирование и выпуск](https://github.com/Bannsaenger/ioBroker.pjlink/workflows/Test%20and%20Release/badge.svg)

## Адаптер pjlink для ioBroker
Управление проектором PJLink

**!! На данный момент поддерживается только протокол класса 1**

## О PJLink
PJLink — это единый стандарт для управления проекторами.
PJLink позволяет централизованно управлять проекторами, произведенными разными производителями, и управлять ими можно с помощью контроллера.
Оборудование, совместимое с PJLink, можно контролировать в любое время и в любом месте, независимо от производителя.
PJLink — это новый стандарт, разработанный для того, чтобы сделать интерфейсы связи и протоколы связи, которые ранее различались у разных производителей проекторов, унифицированными и общими.

Оборудование, совместимое с PJLink, отличается высокой степенью взаимосвязи между различными моделями и производителями, что позволяет легко создавать среды, в которых используются разные модели и системы, а также упрощает замену уже существующих систем.

* [Взято с главной страницы PJLink](https://pjlink.jbmia.or.jp/english/)

## Благодарности
Протокол является товарным знаком: **Авторские права © Японская ассоциация производителей деловой техники и информационных систем. Все права защищены.** [Главная страница PJLink](https://pjlink.jbmia.or.jp/english/)

Данная работа основана на модуле nodejs с реализацией pjlink от **sy1vain**: [https://github.com/sy1vain/node-pjlink](https://github.com/sy1vain/node-pjlink)

## ToDo
* Поддержка проекта node-pjlink для реализации класса 2
* Вернитесь к библиотеке pjlink на GitHub. На данный момент библиотека хранится локально из-за ошибки в тестовом скрипте.

## Как работает адаптер
В настоящее время поддерживается только класс 1. Это означает, что адаптер может только опрашивать состояние.
Активная отправка информации о состоянии устройства на адаптер может быть добавлена, как только будет добавлена поддержка класса 2.

#### Входы PJLink класса 1
* Входные данные должны быть представлены в виде двузначных чисел. Первая цифра обозначает тип входных данных.

| Тип | Число | Возможные входные данные |
| ------- | ------ | --------------- |
| RGB | 1 | 1 - 9 |
| ВИДЕО | 2 | 1 - 9 |
| ЦИФРОВОЙ | 3 | 1 - 9 |
| ХРАНЕНИЕ | 4 | 1 - 9 |
| СЕТЬ | 5 | 1 - 9 |

Возможные входные параметры можно найти в базе данных после запуска адаптера в разделе > pjlink.\<instance\>.deviceInfo.availableInputs

Вы можете редактировать объект ввода в конфигурации экземпляра. Там вы можете изменить имена входных данных и позволить объекту базы данных проверять ваши входные данные.

### Выключатель питания
При этом состояние (установлено в **истину**)

> pjlink.\<instance\>.power

Проектор можно включать и выключать в зависимости от текущего состояния питания.

> pjlink.\<instance\>.powerStatus

Выключатель питания автоматически вернется в положение **false**.

#### Состояние лампы
В базе данных предварительно определена только одна лампа. Если запрос на определение лампы возвращает более одной лампы, остальные лампы будут добавлены динамически.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
* (Bannsaenger) updated dependencies and issues from repository checker

### 0.1.2 (2025-10-27)
* (Bannsaenger) updated dependencies and issues from repository checker
* (Bannsaenger) migrate to NPM Trusted Publishing
* (Bannsaenger) added tcp-ping feature

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 Bannsaenger <bannsaenger@gmx.de>

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