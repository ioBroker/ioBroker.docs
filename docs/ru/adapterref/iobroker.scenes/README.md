---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.scenes/README.md
title: адаптер сцен ioBroker
hash: W+Jc+R/8QT/FJXCVFhTA+mTndHRZvVFGRJT1uWPAwGk=
---
![Логотип](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![Количество установок](http://iobroker.live/badges/scenes-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.scenes.svg)
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

**Сцены** будут созданы, если параметр "установить значение false" не используется. Каждую сцену можно настроить индивидуально, поэтому в одном экземпляре адаптера можно иметь **как сцены** , так и **группы** . **Сцена** представляет собой просто список идентификаторов состояний и значений, которые эти состояния должны иметь при активации сцены. Например, мы создали сцену.`scene.allLightInBath` :

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

Для активации сцены необходимо установить`scene.allLightInBath` Установите значение true (например, над скриптом или визуализацией). Тогда оба состояния будут установлены на желаемые значения.`true` Значение`scene.allLightInBath` будет`true` тоже. Если мы вручную переключимся на верхний свет, значение`scene.allLightInBath` поедет в`false` И снова к`true` если мы включим свет вручную.

Добавим в эту **сцену** вентилятор:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

В этом случае вентилятор включится при активации **сцены** и выключится через одну минуту. После выключения вентилятора значение будет изменено.`scene.allLightInBath` поедет в`false` Поскольку не все состояния равны желаемым значениям, состояния с задержкой не участвуют в вычислениях.

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

Каждый раз, когда вы открываете дверь, все лампы в ванной комнате включаются. Значение`scene.allLightInBath` станет **истинным** . Если вы закроете дверь, свет выключится, и значение изменится.`scene.allLightInBath` станет **ложным** .

Это бесполезно, но в качестве примера подходит.

Если вы вручную включите один светильник, значение будет следующим:`scene.allLightInBath` перейдет в **неопределенное положение** .

Задержки могут использоваться и в **группе** , но состояния с задержкой не участвуют в расчетах текущего значения **группы** .

## Виртуальные группы

**Виртуальные группы** похожи на виртуальные каналы и группы, но могут содержать любые значения: числа, строки и так далее. Вы можете создать виртуальную группу для управления всеми жалюзи в гостиной. Записав значение 40% в виртуальную группу, вы установите значение 40% для всех жалюзи.

Кроме того, вы можете определить поведение, при котором для группы должно приниматься значение, если не все состояния группы имеют одинаковое значение.

Вы можете указать следующие агрегации (доступны только в расширенном режиме):

- `uncertain` - (по умолчанию) - значение группы будет содержать текст`uncertain` .
- `any` - первое ненулевое значение всех состояний в группе.
- `min` - минимальное значение всех состояний в группе.
- `max` - максимальное значение всех состояний в группе.
- `avg` - среднее значение всех штатов в группе.

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

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 5.1.0 (2026-09-03)
* (@GermanBluefox) Added the option "Only on change" for the triggers, so a state that is written again with the same value does not activate the scene anymore. It is enabled by default and can be switched off for every trigger
* (@GermanBluefox) The trigger value is now selected from a list if the trigger state is boolean or has "common.states"
* (@GermanBluefox) Added the loop protection: if a scene is activated too often in a short time, it will be disabled automatically

### 5.0.2 (2026-08-08)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (@SimonFischer04) Corrected the virtual group aggregation for the "any" mode
* (@SimonFischer04) Added "sum" as a virtual group function

### 5.0.1 (2026-08-06)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Added widget for "devices" adapter
* (@GermanBluefox) GUI migrated to React 19 + MUI 9

### 4.0.4 (2025-10-20)
* (@GermanBluefox) Corrected the selection of multiple IDs in the scene editor

### 4.0.3 (2025-07-20)
* (agross) Canceled the cron tasks on the instance stop

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.scenes/blob/master/CHANGELOG_OLD.md)

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