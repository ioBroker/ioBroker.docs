---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.benchmark/README.md
title: ioBroker.benchmark
hash: v83y2upxVHdLiGirS5AzXEJuH+yNp8w8fAA0z/3zk/k=
---
![Логотип](../../../en/adapterref/iobroker.benchmark/admin/benchmark.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.benchmark.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.benchmark.svg)
![Количество установок](https://iobroker.live/badges/benchmark-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/benchmark-stable.svg)
![Статус зависимости](https://img.shields.io/david/foxriver76/iobroker.benchmark.svg)
![НПМ](https://nodei.co/npm/iobroker.benchmark.png?downloads=true)

# IoBroker.benchmark
** Тесты: ** ![Тестирование и выпуск](https://github.com/foxriver76/ioBroker.benchmark/workflows/Test%20and%20Release/badge.svg)

## Тестовый адаптер для ioBroker
Проведите сравнительный анализ вашей системы.

## Важно: информация для пользователей
Обратите внимание, что цель адаптера в его текущем состоянии состоит в основном в тестировании различных сценариев для сбора информации об изменениях на уровне js-контроллера.
Тесты производительности могут занять очень много времени и могут вызвать высокие нагрузки на вашу систему. Также обратите внимание, что по умолчанию адаптер теста работает в изолированном режиме, который отключает все адаптеры и сохраняет работоспособность только контроллера и самого себя. Кроме того, адаптер всегда должен запускаться с номером экземпляра `0`.

## Как добавить новый тест?
1. Создайте новый файл TypeScript в src / lib / activeTests с классом, унаследованным от TestUtils.
2. Определите три (пять) шагов вашего теста (выполнение измеряется автоматически).
3. Добавьте свой тест в src / lib / allTests.ts.
4. Добавьте кнопку и перевод для вашего теста в admin / jsonConfig.json.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.13 (2021-10-25)
* (foxriver76) fix iob executable to also work on Windows systems (closes #3)

### 0.1.8 (2021-10-20)
* (foxriver76) make `addInstances` wait that instance is actually alive

### 0.1.7 (2021-09-26)
* (foxriver76) added test for alias subscription with write function

### 0.1.6 (2021-09-26)
* (foxriver76) added tests for subscription with alias, getStates with alias read

### 0.1.5 (2021-09-24)
* (foxriver76) added db types to summary

### 0.1.4 (2021-09-23)
* (foxriver76) fixed `actionsPerSecondStd` state
* (foxriver76) added tests `getStatesAlias` and `messages`
* (foxriver76) fixed execution of `getStates` test

### 0.1.3 (2021-09-23)
* (foxriver76) optimize JSON file writing
* (foxriver76) added tests `objectsDeletion` and `getStates`

### 0.1.2 (2021-09-22)
* (foxriver76) fixed statesDeletion test

### 0.1.1 (2021-09-22)
* (foxriver76) implemented `cleanUpBetweenEpoch` and `prepareBetweenEpoch` to save ressources

### 0.1.0 (2021-09-21)
* (foxriver76) write mem stats in MB
* (foxriver76) write summary file
* (foxriver76) also monitor js-controller
* (foxriver76) add overall summary state
* (foxriver76) add epochs and iterations to summary
* (foxriver76) added logging + restructuring code
* (foxriver76) added cleanup button and allow prefixing ids

### 0.0.3 (2021-09-20)
* (foxriver76) we fixed actionsPerSecondStd state if only one epoch

### 0.0.2 (2021-09-20)
* (foxriver76) we fixed actionsPerSecondStd state

### 0.0.1 (2021-09-20)
* (foxriver76) initial release

## License
MIT License

Copyright (c) 2021 Moritz Heusinger <moritz.heusinger@gmail.com>

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

The adapter icon has been designed using resources from Flaticon.com