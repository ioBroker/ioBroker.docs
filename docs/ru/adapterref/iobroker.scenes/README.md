---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.scenes/README.md
title: Адаптер сцен ioBroker
hash: CVpkOFmAOg1uytkc3GPwzIY6a/6Sr4Sa+cSCn+yaLec=
---
![Логотип](../../../en/adapterref/iobroker.scenes/admin/scenes.png)

![Количество установок](http://iobroker.live/badges/scenes-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.scenes.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.scenes.svg)

# Адаптер сцен ioBroker
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.scenes/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/scenes/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

_Адаптер сцен_ может создавать сцены и выполнять их в среде ioBroker.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении отчётов об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчёты Sentry используются, начиная с версии js-controller 3.0.

Этот адаптер может создавать три типа сцен:

- **сцены**
- **группы**
- **виртуальные группы**

## Сцены
**Сцены** будут созданы, если не используется настройка «set on false».
Каждую сцену можно настроить индивидуально, поэтому вы можете создать **сцены** и **группы** в одном экземпляре адаптера.
**Сцена** — это просто список идентификаторов состояний и значений, которые эти состояния должны иметь при активации сцены. Например, мы создали на сцене `scene.allLightInBath`:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  +- hm-rpc.0.TOP_LIGHT.STATE     - true
```

Чтобы активировать сцену, необходимо установить `scene.allLightInBath` в значение true (например, через скрипт или визуальный элемент). Тогда оба состояния будут установлены в желаемые значения: `true`.
Значение `scene.allLightInBath` также будет равно `true`. Если мы вручную переключимся на верхний источник света, значение `scene.allLightInBath` изменится на `false`.
И снова на `true`, если мы включим свет вручную.

Давайте добавим к **сцене** вентилятор:

```
  scene.allLightInBath
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true
  |- hm-rpc.0.TOP_LIGHT.STATE     - true
  |- hm-rpc.0.FAN.STATE          - true
  |- hm-rpc.0.FAN.STATE          - false (delay 60000ms)
```

В этом случае вентилятор включится при активации **сцены** и выключится через одну минуту.
После выключения вентилятора значение `scene.allLightInBath` изменится на `false`, поскольку не все состояния соответствуют желаемым значениям.
Состояния с задержкой не участвуют в расчётах.

Вы можете протестировать сцену, нажав кнопку «Воспроизвести».
Кроме того, вы можете напрямую связать эту **сцену** с другим идентификатором сцены. Например, если у вас есть датчик на двери, вы можете выбрать его в качестве триггера:

```
  trigger
    id:        hm-rpc.0.DOOR_SENSOR.STATE
    condition: ==
    value:     true
```

И каждый раз, когда вы открываете дверь в ванную, будут включаться все светильники и вентилятор.

## Группы
**Группы** подобны виртуальным каналам. С помощью **групп** можно создать виртуальное устройство из нескольких исполнительных механизмов и управлять ими одновременно, как одним устройством.
Давайте модифицируем наш пример с освещением ванны.

```
  scene.allLightInBath             "set on true"    "set on false"
  |- hm-rpc.0.BOTTOM_LIGHT.STATE  - true             false
  +- hm-rpc.0.TOP_LIGHT.STATE     - true             false
```

Если связать эту **группу** с датчиком двери, например:

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

Каждый раз, когда вы открываете дверь, весь свет в ванной комнате включается. Значение `scene.allLightInBath` изменится на **true**.
Если вы закроете дверь, свет выключится, а значение `scene.allLightInBath` изменится на **false**.

Это бесполезно, но как пример годится.

Если вручную включить один свет, значение `scene.allLightInBath` станет **неопределенным**.

Задержки также могут использоваться в **группе**, но состояния с задержкой не участвуют в расчетах текущего значения **группы**.

## Виртуальные группы
**Виртуальные группы** похожи на виртуальные каналы и группы, но могут иметь любые значения: числа, строки и так далее.
Вы можете создать виртуальную группу для управления всеми ставнями в гостиной.
Если указать значение 40% в виртуальной группе, все ставни будут установлены на 40%.

Кроме того, вы можете определить поведение, при котором значение должно быть принято для группы, если не все состояния группы имеют одинаковое значение.

Вы можете предоставить следующие агрегации (доступно только в расширенном режиме):

- `uncertain` - (по умолчанию) - значение группы будет иметь текст `uncertain`.
- `any` - первое ненулевое значение всех состояний в группе.
- `min` - минимальное значение среди всех состояний в группе.
- `max` - максимальное значение среди всех состояний в группе.
- `avg` - среднее значение всех состояний в группе.

## Сохраняйте актуальные состояния как сцену
Чтобы сохранить актуальные состояния в какой-либо сцене, вы можете отправить сообщение адаптеру:

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

Адаптер считывает все фактические значения идентификаторов, определенных в этой сцене, и сохраняет их как настроенные.

## Отключение или включение сцены с помощью сообщения Чтобы отключить или включить какую-либо сцену, можно отправить сообщение адаптеру:
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

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 4.0.3 (2025-07-20)
* (agross) Canceled the cron tasks on the instance stop

### 4.0.2 (2025-06-16)
* (bluefox) Small improvements for layout

### 4.0.1 (2025-01-23)
* (bluefox) Adapter was migrated to TypeScript
* (bluefox) Corrected error with the Select ID dialog

### 3.2.4 (2025-01-22)
* (bluefox) Migrated to vite
* (bluefox) Packages updated

### 3.2.3 (2024-08-26)
* (bluefox) Packages updated

### 3.2.1 (2024-06-21)
* (bluefox) GUI migrated for the new `adapter-react` library

### 3.1.1 (2024-06-21)
* (bluefox) Packages updated
* (bluefox) Prepared for js-controller 6

### 3.0.4 (2024-04-27)
* (bluefox) Corrected error if profile is empty

### 3.0.3 (2024-02-25)
* (bluefox) Saving of the scene states from GUI was implemented

### 3.0.1 (2024-02-16)
* (bluefox) Cleared cron tasks by re-init
* (bluefox) CRON Editor dialog added
* (bluefox) Implemented scene enabling/disabling via messages
* (bluefox) Implemented the writing of the scene states with ack=true
* (bluefox) Added description to the scene states
* (bluefox) Added possibility to use categories/enumerations

### 2.4.2 (2024-02-12)
* (bluefox) Preserved empty folders by renaming and moving of scenes

### 2.4.0 (2022-12-23)
* (Apollon77) prevent a crash case reported by Sentry
* (bluefox) Updated some GUI libraries

### 2.3.9 (2022-02-13)
* (bluefox) Updated some GUI libraries
* (bluefox) Updated releaser

### 2.3.8 (2021-08-31)
* (Apollon77) Handles a case where states are not set but used as value (Sentry IOBROKER-SCENES-13)
* (TyrionWarMage) Added the aggregation mode for the virtual groups.
* (bluefox) Sentry data will not be sent in front-end if the diagnostic or sentry is disabled

### 2.3.6 (2021-01-22)
* (Apollon77) Check state id before getting value (Sentry IOBROKER-SCENES-F)

### 2.3.5 (2021-01-22)
* (Apollon77) Add error logging if invalid ids are configured for scenes (Sentry IOBROKER-SCENES-Y)

### 2.3.4 (2021-01-16)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-SCENES-X, IOBROKER-SCENES-V)

### 2.3.3 (2020-12-06)
* (bluefox) Implemented drag&drop for the reorder of scenes in folders
* (bluefox) Implemented Easy mode
* (bluefox) Possibility to use set point from another state

### 2.3.1 (2020-11-06)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-SCENES-M)

### 2.3.0 (2020-11-02)
* (bluefox) Fixed GUI errors

### 2.1.7 (2020-10-30)
* (Apollon77) Prevent a crash case (Sentry IOBROKER-SCENES-E, IOBROKER-SCENES-G, IOBROKER-SCENES-A)

### 2.1.6 (2020-09-25)
* (bluefox) Updated the select ID dialog.

### 2.1.3 (2020-09-18)
* (Apollon77) Prevent crash cases (Sentry IOBROKER-SCENES-B, IOBROKER-SCENES-8, IOBROKER-SCENES-D)

### 2.1.2 (2020-07-08)
* (bluefox) Interval between states was corrected

### 2.0.17 (2020-06-29)
* (bluefox) GUI error corrected

### 2.0.13 (2020-06-27)
* (bluefox) Mobile view added

### 2.0.12 (2020-06-26)
* (bluefox) GUI error corrected

### 2.0.10 (2020-06-20)
* (bluefox) Added "Do not overwrite state if it has the required value" option

### 2.0.9 (2020-06-17)
* (bluefox) The colors are corrected

### 2.0.8 (2020-06-16)
* (bluefox) The tolerance is implemented

### 2.0.3 (2020-06-14)
* (bluefox) New GUI based on React

### 1.1.1 (2019-05-26)
* (bluefox) Added storing of actual values in a scene via a message

### 1.1.0 (2018-04-24)
* (bluefox) Works now with Admin3

### 1.0.2 (2018-01-21)
* (bluefox) use new select ID dialog
* (DeepCoreSystem) translations
* (paul53) text fixes

### 1.0.0 (2017-11-11)
* (bluefox) fix false scenes

### 0.2.7 (2017-08-14)
* (bluefox) Support of iobroker.pro

### 0.2.6 (2016-06-21)
* (bluefox) add read/write settings to scene object

### 0.2.5 (2016-02-03)
* (bluefox) update node-schedule

### 0.2.4 (2016-01-24)
* (bluefox) fix error disabled states in a scene

### 0.2.3 (2015-12-10)
* (bluefox) fix error with trigger on false

### 0.2.2 (2015-11-22)
* (bluefox) fix error with restart adapter

### 0.2.1 (2015-10-27)
* (bluefox) delete triggers if virtual groups enabled

### 0.2.0 (2015-10-27)
* (bluefox) support of virtual groups

### 0.1.3 (2015-09-19)
* (bluefox) show set value if 0 or false in settings

### 0.1.2 (2015-08-15)
* (bluefox) add translations
* (bluefox) try to fix error by renaming

### 0.1.1 (2015-08-10)
* (bluefox) allow description for states in a scene
* (bluefox) check by rename if the scene with the same name yet exists
* (bluefox) allowed a coping of a scene
* (bluefox) fix error with delay and stopAllDelays settings

### 0.1.0 (2015-08-09)
* (bluefox) fix error with delays and config change
* (bluefox) implement replace

### 0.0.2 (2015-08-05)
* (bluefox) change configuration schema
* (bluefox) add cron
* (bluefox) add a burst interval

### 0.0.1 (2015-07-29)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2015-2025, Bluefox (dogafox@gmail.com)

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