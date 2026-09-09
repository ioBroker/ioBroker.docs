---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.benchmark/README.md
title: ioBroker.benchmark
hash: u3od+d2yrTu88w5rNT2uk1IcUsxDiAdfm3Xg0JOcUZg=
---
![Логотип](../../../en/adapterref/iobroker.benchmark/admin/benchmark.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.benchmark.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.benchmark.svg)
![Количество установок](https://iobroker.live/badges/benchmark-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/benchmark-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.benchmark.png?downloads=true)
![Тестирование и выпуск](https://github.com/foxriver76/ioBroker.benchmark/workflows/Test%20and%20Release/badge.svg)

# ioBroker.benchmark

## адаптер для тестирования производительности ioBroker

Проведите тестирование производительности вашей системы.

## Важно: Информация для пользователей

Обратите внимание, что в текущем состоянии основное назначение адаптера — тестирование производительности в различных сценариях для получения информации об изменениях на уровне js-контроллера. Тесты производительности могут занимать очень много времени и создавать высокую нагрузку на вашу систему. Также обратите внимание, что по умолчанию адаптер для тестирования производительности работает в изолированном режиме, что отключает все адаптеры и оставляет активными только контроллер и себя самого. Кроме того, адаптер всегда должен запускаться с номером экземпляра.`0` .

## Как добавить новый тест?

1. Создайте новый файл TypeScript в папке src/lib/activeTests, содержащий класс, наследующий от TestUtils.
2. Определите три (пять) шага вашего теста (выполнение измеряется автоматически).
3. OНеобязательно: Если ваш тест предъявляет какие-либо требования, например, к контроллеру, необходимо указать следующее.`>=3.0.0` Пожалуйста, передайте необходимые параметры родительскому конструктору.
4. Добавьте свой тест в файл src/lib/allTests.ts
5. Добавьте кнопку и перевод для вашего теста в файл admin/jsonConfig.json.

### Требования к тестированию

Некоторые тесты могут иметь определенные требования. Если система не соответствует этим требованиям, тест будет пропущен. В конструкторе следует передать требования родительскому классу, например:

```typescript
public constructor(adapter: AdapterInstance) {
    super(adapter, {freeMemory: 2000});
}
```

В настоящее время поддерживаются следующие требования:

- `controllerVersion` - Если тестируются методы, которые были введены в конкретной версии контроллера, адаптер для тестирования производительности не должен пытаться запускать эти тесты на контроллере, не поддерживающем данную версию.
- `freeMemory` - Укажите необходимый объем памяти для теста; это требуется только в том случае, если вы, например, добавляете много экземпляров.

## Описание теста

### getStates

Исполняет`iterations` времена`getState` .

### getStatesAlias

Исполняет`iterations` времена`getState` Под псевдонимом.

### getStatesAliasRead

Исполняет`iterations` времена`getState` на псевдониме. Псевдоним имеет простую функцию чтения.

### getStatesMulti

Создает 10 000 состояний, затем выполняет`iterations` времена`getStates` на них.

### getStatesMultiAlias

Создает 10 000 состояний псевдонимов, затем выполняет`iterations` времена`getStates` на них.

### праздный

Просто ждёт`iterations` РС.

### сообщения

Создает дополнительный экземпляр теста производительности. Затем экземпляр контроллера отправит...`iterations` Сообщения отправляются на резервный экземпляр. Если все сообщения получены, тест завершен.

### создание объектов

Создает`iterations` объекты через`setObject` .

### удаление объектов

Удаляет`iterations` объекты через`delObject` .

### objectViewEqual

Создаёт 10 000 объектов, причём 50% из них соответствуют представлению объекта. Затем выполняет`iterations` Виды объектов.

### objectViewLarge

Создаёт 10 000 объектов, 98% из которых соответствуют представлению объекта. Затем выполняет`iterations` Виды объектов.

### objectViewSmall

Создаётся 10 000 объектов, из которых только 2% соответствуют представлению объекта. Затем выполняется следующий код:`iterations` Виды объектов.

### setStates

Наборы`iterations` штаты через`setState`

### setStatesNonStrict

Наборы`iterations` штаты через`setState` , но`strictObjectChecks` отключены.

### setStateParallel

Добавляет 30 вторичных экземпляров, каждый из которых будет настроен.`iterations` состояния. На системном уровне экземпляры устанавливают эти состояния параллельно, но на уровне экземпляра предыдущее состояние`setState` Необходимо завершить этот тест до тех пор, пока не будет назначен следующий. Цель этого теста — оценить производительность многоядерных систем.

**Требования** : 2 ГБ свободной памяти

### statesDeletion

Удаляет`iterations` штаты через`delState` .

### statesSubscription

Экземпляр контроллера подписывается на определенное пространство имен. В каждом наборе по 4 вторичных экземпляра.`iterations / 4` штатов. Как только контроллер получил все`iterations` Опубликовано, тест завершен.

### statesSubscriptionAlias

Экземпляр контроллера подписывается на пространство имен-псевдонимов. В каждом наборе по 4 вторичных экземпляра.`iterations / 4` псевдонимы состояний. Как только контроллер получил все`iterations` Опубликовано, тест завершен.

### statesSubscriptionAliasWrite

Экземпляр контроллера подписывается на пространство имен-псевдонимов. В каждом наборе по 4 вторичных экземпляра.`iterations / 4` псевдонимы состояний. Как только контроллер получил все`iterations` После публикации тест завершен. Псевдоним содержит простую функцию записи.

### statesSubscriptionSingle

Десять вторичных компаний подписываются на одну и ту же услугу.`iterations` штатов. Вместо использования одного`subscribe` вызвать каждого исполнителя`iterations` звонки по единой подписке. Как только все`ìterations` Если результаты получены всеми средними школами, тестирование завершено.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.3.0 (2024-06-03)
* (foxriver76) added test `statesSubscriptionSingle`

### 1.2.0 (2024-04-16)
* (foxriver76) added `controllerVersion` to results

### 1.1.4 (2022-12-30)
* (foxriver76) fixed cleanup after `getStatesMulti`

### 1.1.3 (2022-12-30)
* (foxriver76) fixed a bug, where `getStatesMultiAlias` did not remove alias objects

### 1.1.1 (2022-12-30)
* (foxriver76) fixed a bug, where `getStatesMultiAlias` created wrong amount of objects

### 1.1.0 (2022-11-17)
* (foxriver76) added `getStatesMulti` and `getStatesMultiAlias`

### 1.0.0 (2022-06-10)
* (foxriver76) the config is now applied directly from frontend without requiring to save first

### 0.5.1 (2022-02-26)
* (foxriver76) changed type in io-package to `utility`
* (foxriver76) updated deps
* (foxriver76) added `dataSource` to io-package

### 0.5.0 (2022-01-01)
* (foxriver76) we introduced `TestRequirements` which can define required memory, controller and node version

### 0.4.0 (2021-11-24)
* (foxriver76) we introduced some categories in the user interface
* (foxriver76) we switched to checkboxes to allow to execute a subset of all tests

### 0.3.2 (2021-11-23)
* (foxriver76) we now also remove secondary instances on clean up

### 0.3.1 (2021-11-23)
* (foxriver76) we now prettify the summary file

### 0.3.0 (2021-11-22)
* (foxriver76) we added three `getObjectView` tests

### 0.2.0 (2021-11-20)
* (foxriver76) we added a parallel `setState` test for multicore performance evaluation (closes #5)

### 0.1.15 (2021-11-19)
* (foxriver76) internal simplification

### 0.1.14 (2021-11-19)
* (foxriver76) make cooldown dependent on test time (closes #4)
* (foxriver76) on last iteration of last test we do not need to cooldown

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

Copyright (c) 2022 Moritz Heusinger <moritz.heusinger@gmail.com>

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