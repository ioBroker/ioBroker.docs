---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.benchmark/README.md
title: ioBroker.benchmark
hash: brxDyt/UU9UqJNVafQVjgXMie7jujWu3vCENfPN/0xI=
---
![Логотип](../../../en/adapterref/iobroker.benchmark/admin/benchmark.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.benchmark.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.benchmark.svg)
![Количество установок](https://iobroker.live/badges/benchmark-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/benchmark-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.benchmark.png?downloads=true)

# IoBroker.benchmark
**Тесты:** ![Тестирование и выпуск](https://github.com/foxriver76/ioBroker.benchmark/workflows/Test%20and%20Release/badge.svg)

## Адаптер производительности для ioBroker
Проверьте свою систему.

## Важно: Информация для пользователей
Обратите внимание, что целью адаптера в его текущем состоянии является, главным образом, тестирование различных сценариев для сбора информации об изменениях на уровне js-контроллера.
Бенчмарк-тесты могут занять очень много времени и вызвать высокую нагрузку на вашу систему. Также обратите внимание, что по умолчанию эталонный адаптер работает в изолированном режиме, который отключит все адаптеры и сохранит работоспособность только контроллера и самого себя. Более того, адаптер всегда необходимо запускать с номером экземпляра `0`.

## Как добавить новый тест?
1. Создайте новый файл TypeScript в src/lib/activeTests с классом, который наследуется от TestUtils.
2. Определите три (пять) шагов вашего теста (выполнение измеряется автоматически).
3. Необязательно: если к вашему тесту предъявляются некоторые требования, например: контроллер должен быть `>=3.0.0`, передайте требования

родительский конструктор

4. Добавьте свой тест в src/lib/allTests.ts.
5. Добавьте кнопку и перевод для вашего теста в admin/jsonConfig.json.

### Требования к тестированию
Некоторые тесты могут иметь требования. Если система не соответствует требованиям, тест будет пропущен.
В конструкторе вы должны передать требования родительскому классу, например

```typescript
public constructor(adapter: AdapterInstance) {
    super(adapter, {freeMemory: 2000});
}
```

На данный момент поддерживаются следующие требования:

- `controllerVersion` - если тестируются методы, которые были представлены с определенной версией контроллера, тест

адаптер не должен пытаться запустить эти тесты на неподдерживающем контроллере

- `freeMemory` - определите необходимую память для теста, это необходимо только в том случае, если вы, например. добавить много экземпляров

## Описание теста
### GetStates
Выполняется `iterations` раз `getState`.

### GetStatesAlias
Выполняет `iterations` раз `getState` для псевдонима.

### GetStatesAliasRead
Выполняет `iterations` раз `getState` для псевдонима. Псевдоним имеет простую функцию чтения.

### GetStatesMulti
Создает 10 000 состояний, затем выполняет для них `iterations` раз `getStates`.

### GetStatesMultiAlias
Создает 10 000 состояний псевдонимов, затем выполняет для них `iterations` раз `getStates`.

### Праздный
Просто ждет `iterations` мс.

### Сообщения
Создает дополнительный экземпляр эталонного теста. Затем экземпляр контроллера отправит сообщения `iterations` вторичному экземпляру.
Если все сообщения получены, тест завершен.

###Создание объектов
Создает объекты `iterations` посредством `setObject`.

###Удаление объектов
Удаляет объекты `iterations` с помощью `delObject`.

### ОбъектViewEqual
Создает 10 000 объектов, 50 % из которых актуальны для просмотра объектов. Затем он выполняет представления объектов `iterations`.

### ОбъектViewLarge
Создает 10 000 объектов, 98 % из которых актуальны для просмотра объектов. Затем он выполняет представления объектов `iterations`.

### ObjectViewSmall
Создает 10 000 объектов, при этом только 2 % из них актуальны для просмотра объектов. Затем он выполняет представления объектов `iterations`.

### SetStates
Устанавливает состояния `iterations` через `setState`

### SetStatesNonStrict
Устанавливает состояния `iterations` через `setState`, но `strictObjectChecks` отключены.

### SetStateParallel
Добавляет 30 вторичных экземпляров, каждый экземпляр будет устанавливать состояния `iterations`. На уровне системы экземпляры устанавливают эти состояния параллельно, но на уровне экземпляра предыдущий `setState` должен быть завершен до тех пор, пока не будет установлен следующий.
Этот тест направлен на тестирование многоядерных систем.

__Требования__: 2 ГБ свободной памяти.

###состоянийУдаление
Удаляет состояния `iterations` через `delState`.

### СостоянийПодписка
Экземпляр контроллера подписывается на определенное пространство имен. Каждый из четырех вторичных серверов устанавливает состояния `iterations / 4`. Как только контроллер получит все публикации `iterations`, тест завершается.

###stateSubscriptionAlias
Экземпляр контроллера подписывается на пространство имен псевдонима. Каждый из 4 вторичных серверов устанавливает псевдонимы `iterations / 4`. Как только контроллер получит все публикации `iterations`, тест завершается.

###stateSubscriptionAliasWrite
Экземпляр контроллера подписывается на пространство имен псевдонима. Каждый из четырех вторичных серверов устанавливает псевдонимы `iterations / 4`. Как только контроллер получит все публикации `iterations`, тест завершается.
Псевдоним содержит простую функцию записи.

###stateSubscriptionSingle
Каждый из десяти вторичных серверов подписывается на одни и те же состояния `iterations`. Вместо использования одного вызова `subscribe` каждый выполняет одиночные абонентские вызовы `iterations`. Как только все `ìterations` будут получены каждым вторичным устройством, тест завершается.

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
