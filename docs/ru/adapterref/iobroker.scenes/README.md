---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.scenes/README.md
title: адаптер сцен ioBroker
hash: k3/P+FkPdljPf5ebiZYtZ6rSz00yPV7EhgYy9Th0yLU=
---
![Логотип](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![Количество установок](https://iobroker.live/badges/scenes-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.scenes.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.scenes/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/scenes/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.scenes.svg)

# адаптер сцен ioBroker

_Адаптер scenes_ может создавать сцены и выполнять их в среде ioBroker.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Этот адаптер позволяет создавать три типа сцен:

- **сцены**
- **группы**
- **виртуальные группы**

## Сцены

**Сцены** будут созданы, если параметр "установить значение false" не используется. Каждую сцену можно настроить индивидуально, поэтому в одном экземпляре адаптера можно иметь **как сцены** , так и **группы** . **Сцена** представляет собой просто список идентификаторов состояний и значений, которые эти состояния должны иметь при активации сцены. Например, мы создали сцену. `scene.allLightInBath`:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

Для активации сцены необходимо установить `scene.allLightInBath` Установите значение true (например, над скриптом или визуализацией). Тогда оба состояния будут установлены на желаемые значения. `true` Значение `scene.allLightInBath` будет `true` тоже. Если мы вручную переключимся на верхний свет, значение `scene.allLightInBath` поедет в `false` И снова к `true` если мы включим свет вручную.

Добавим в эту **сцену** вентилятор:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

В этом случае вентилятор включится при активации **сцены** и выключится через одну минуту. После выключения вентилятора значение будет изменено. `scene.allLightInBath` поедет в `false` Поскольку не все состояния равны желаемым значениям, состояния с задержкой не участвуют в вычислениях.

Вы можете протестировать сцену с помощью кнопки «Воспроизвести». Кроме того, вы можете напрямую связать эту **сцену** с другими сценами с аналогичными идентификаторами. Например, если у вас есть датчик на двери, вы можете выбрать его в качестве триггера:

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

И каждый раз, когда вы открываете дверь в ванной, все лампы и вентилятор будут включаться.

## Группы

**Группы** похожи на виртуальные каналы. С помощью **групп** можно создавать виртуальные устройства из нескольких исполнительных механизмов и управлять ими совместно, как одним устройством. Давайте изменим наш пример с освещением ванной комнаты.

```
  scene.allLightInBath             "set on true"    "set on false" 
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

Если вы свяжете эту **группу** с датчиком двери следующим образом:

```
  trigger on true
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true

  trigger on false
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     false
```

Каждый раз, когда вы открываете дверь, все лампы в ванной комнате включаются. Значение `scene.allLightInBath` станет **истинным** . Если вы закроете дверь, свет выключится, и значение изменится. `scene.allLightInBath` станет **ложным** .

Это бесполезно, но в качестве примера подходит.

Если вы вручную включите один светильник, значение `scene.allLightInBath` перейдет в **неопределенное положение** .

Задержки также могут использоваться в **группе** , но состояния с задержкой не участвуют в расчетах текущего значения **группы** .

## Виртуальные группы

**Виртуальные группы** похожи на виртуальные каналы и группы, но могут содержать любые значения: числа, строки и так далее. Вы можете создать виртуальную группу для управления всеми жалюзи в гостиной. Записав значение 40% в виртуальную группу, вы установите значение 40% для всех жалюзи.

Кроме того, вы можете определить поведение, при котором для группы должно приниматься значение, если не все состояния группы имеют одинаковое значение.

Вы можете указать следующие агрегации (доступны только в расширенном режиме):

- `uncertain` - (по умолчанию) - значение группы будет содержать текст `uncertain`.
- `any` - первое ненулевое значение всех состояний в группе.
- `min` - минимальное значение всех состояний в группе.
- `max` - максимальное значение всех состояний в группе.
- `avg` - среднее значение всех штатов в группе.

## Участники из различных категорий (помещения и мероприятия)

Вместо отдельных состояний вы можете добавить все устройства комнаты и/или функции как один элемент сцены. Список устройств рассчитывается в начале работы адаптера, поэтому новые устройства в этой комнате или функции добавляются автоматически.

С помощью «Фильтра по имени (регулярное выражение)» можно выбрать только некоторые устройства из категории. Фильтр представляет собой регистронезависимое регулярное выражение, которое проверяется по идентификатору и именам (на всех языках) устройств. Например, фильтр `left` Из комнаты «Кухня» берут только лампочки. `CL left 01`... `CL left 05` и фильтр `^CL (left|right) 0[1-3]$` Только первые три лампочки обеих лампочек.

## Сохраните фактические состояния как сцену.

Для сохранения текущего состояния сцены можно отправить сообщение адаптеру:

```js
sendTo(
    'scenes.0', 
    'save', 
    {sceneId: 
        'scene.0.SCENE_ID', // scene ID 
        isForTrue: true     // true if actual values must be saved for `true` state and `false` if for false 
    }, 
    result => result.err && console.error(result.error) // optional
);
```

Адаптер прочитает все фактические значения идентификаторов, определенных в этой сцене, и сохранит их как сконфигурированные.

## Включение или отключение сцены с помощью сообщения.

Чтобы отключить или включить какой-либо сценарий, вы можете отправить сообщение адаптеру:

```js
// enable
sendTo(
    'scenes.0', 
    'enable', 
    'scene.0.SCENE_ID', 
    result => result.err && console.error(result.error) // optional
);
// disable
sendTo(
    'scenes.0', 
    'disable', 
    'scene.0.SCENE_ID', 
    result => result.err && console.error(result.error) // optional
);
// or
sendTo(
    'scenes.0', 
    'disable', // 'enable' to enable
    {sceneId: 'scene.0.SCENE_ID'}, 
    result => result.err && console.error(result.error) // optional
);
```

## Остановить съемку движущегося объекта

Если сцена содержит элементы с задержкой или интервалом воспроизведения, она выполняется в течение некоторого времени. Чтобы остановить её, напишите `stop` в состояние сцены (например, из визуализации или скрипта):

```js
setState('scene.0.SCENE_ID', 'stop');
```

или отправьте сообщение адаптеру:

```js
sendTo(
    'scenes.0', 
    'stop', 
    'scene.0.SCENE_ID', 
    result => result.error ? console.error(result.error) : console.log(result.result) // optional
);
```

Все отложенные команды этой сцены, которые еще не выполнены, будут отменены. Уже записанные значения остаются неизменными, и сцена сохраняет свои значения. Виртуальные группы не останавливаются при записи. `stop` Они, как обычно, передают эту ценность своим членам.

## Сообщения для скриптов и агентов искусственного интеллекта.

Сообщение `help` Возвращает описание адаптера, его сообщений и способов активации сцен, написанное для агентов ИИ (например, pi-agent) и авторов скриптов. Ответ `{help, commands}` также перечисляет все команды, каждая из которых содержит `write: true` Если это что-то изменит:

```js
sendTo('scenes.0', 'help', {}, result => console.log(result.help));
```

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.4.0 (2026-11-19)
* (@GermanBluefox) Added the message "help": a description of all messages and of the scene states for AI agents (e.g. pi-agent), and `common.supportedMessages.help`
* (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`

### 5.3.0 (2026-11-09)
* (@GermanBluefox) Added the web component `iob-scenes-scene` - the devices widget "Scene Button" for Aura and other hosts (`common.webComponents`); the name and the description of the devices widget are translated into all languages now
* (copilot) Adapter requires node.js >= 22.19.0 now

### 5.2.0 (2026-10-24)
* (reloxx13) Recognize uppercase and mixed-case boolean scene commands, so nested scenes receive FALSE correctly (#475)
* (@GermanBluefox) The state of a scene, that controls other scenes with "TRUE"/"FALSE", is now detected correctly and is not "uncertain" anymore (#475)
* (@GermanBluefox) Scenes as members of another scene now get the TRUE/FALSE selector, so the desired values are stored as booleans (#475)
* (@GermanBluefox) A scene, whose members match TRUE and FALSE at the same time, does not jump from FALSE to TRUE anymore (#267)
* (@GermanBluefox) The search in the scene list is now case-insensitive (#364)
* (@GermanBluefox) Updated "@iobroker/testing" to 6.3.1 and removed the direct "mocha" dependency
* (@GermanBluefox) A running scene can be stopped by writing "stop" into the scene state or with the message "stop". All delayed commands of the scene are cancelled (#42)
* (@GermanBluefox) Added the name filter (regular expression) for members from categories, e.g., to take only some lamps of a room (#457)

### 5.1.0 (2026-09-03)
* (@GermanBluefox) Added the option "Only on change" for the triggers, so a state that is written again with the same value does not activate the scene anymore. It is enabled by default and can be switched off for every trigger
* (@GermanBluefox) The trigger value is now selected from a list if the trigger state is boolean or has "common.states"
* (@GermanBluefox) Added the loop protection: if a scene is activated too often in a short time, it will be disabled automatically

### 5.0.2 (2026-08-08)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (@SimonFischer04) Corrected the virtual group aggregation for the "any" mode
* (@SimonFischer04) Added "sum" as a virtual group function

## License
The MIT License (MIT)

Copyright (c) 2015-2026, Bluefox (dogafox@gmail.com)

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