---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/README.md
title: ioBroker.лавелас
hash: CevnA7T7sHSamYWblZJOuDzy/NIuSAqwybgwIb9sCEI=
---
![Логотип](../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

![Количество установок](http://iobroker.live/badges/lovelace-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.lovelace.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lovelace.svg)

# IoBroker.лавелас
![Тест и выпуск](https://github.com/ioBroker/iobroker.lovelace/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/lovelace/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Адаптер lovelace для ioBroker
С помощью этого адаптера вы можете создать визуализацию для ioBroker с пользовательским интерфейсом Home Assistant Lovelace.

[Deutsche Dokumentation](docs/de/README.md)

## Объекты экземпляров
В экземплярах папок есть некоторые объекты, которые можно использовать для управления пользовательским интерфейсом. Для каждого браузера будет создана новая подпапка со случайным идентификатором. Этот идентификатор хранится в веб-хранилище клиентского браузера. Если вы удалите веб-хранилище, будет создан новый экземпляр. Если вы используете Fully Kiosk Browser, убедитесь, что функция `Delete webstorage on reload` **отключена**.

Эта функциональность использует браузер_мод, который устанавливается и обновляется адаптером. Не добавляйте свою собственную версию браузер_мод как пользовательскую карту.

## Конфигурация
Существует два способа настройки сущностей:

- авто
- руководство

### Авто
В автоматическом режиме будет применен аналогичный процесс, как для `google home` или `material adapter`.

***Будут обнаружены только те объекты и каналы, для которых определены категории `function`и `room`***

Вы можете определить понятные имена, и они будут использоваться в сущностях.

### Руководство
Объекты можно определить вручную в дереве объектов, например `sql` или `history`. Необходимо указать тип сущности и, по желанию, имя объекта. С помощью этого метода можно создать только простые сущности, такие как input_number, input_text или input_boolean. Он не может иметь более одного состояния или атрибута.

## Панели
### Панель сигнализации
ioBroker пока не поддерживает такое устройство, но его можно смоделировать. Если вы создадите такой скрипт:

```js
createState(
    'alarmSimple',
    false,
    false,
    {
        "name": "alarmSimple",
        "role": "alarm",
        "type": "boolean",
        "read": true,
        "write": true,
        "desc": "Arm or disarm with code",
        "def": false,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "alarm_control_panel",
                "name": "simulateAlarm" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        // react on changes
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

или просто используйте для этого `lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)`.

### Ввод числа
Это можно сделать вручную, если в пользовательском диалоговом окне выбран тип сущности input_number.
Для этого типа требуются значения `min` и `max` в `common` и можно добавить необязательные `step`.
Если вы хотите видеть стрелки вверх и вниз, вам следует установить в пользовательском `mode` значение «number»:

```json5
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter" // this is a name how the entity will be called. In this case "alarm_control_panel.simulateAlarm"
            "mode": "number", // default presentation is slider
        }
    }
}
```

### Выберите вход
Это можно сделать вручную, если в пользовательском диалоговом окне выбран тип сущности `input_select`.
Список вариантов для выбора должен быть предоставлен в стандартном объекте `common.states`:

```json
"common": {
    "type": "string",
    "states": {
      "1": "select 1",
      "2": "Select 2",
      "3": "select 3"
    },
    "custom": {
      "lovelace.0": {
        "enabled": true,
        "entity": "input_text",
        "name": "test_input_select"
      }
    }
```

Другими словами, в IoB также должен быть выборочный вход.

### Таймер
Таймер можно смоделировать с помощью следующего скрипта:

```js
createState(
    'timerSimple',
    false,
    false,
    {
        "name": "timerSimple",
        "role": "level.timer",
        "type": "number",
        "read": true,
        "write": true,
        "unit": "sec",
        "desc": "Start/Stop Timer",
        "def": 0,
        "custom": {
            "lovelace.0": {
                "enabled": true,
                "entity": "timer",
                "name": "simulateTimer" // this is a name how the entity will be called. In this case "timer.simulateTimer"
            }
        }
    },
    {
        "alarm_code": 1234 // this is a alarm code, that must be entered
    },
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        // react on changes
        on({id, change: 'any'}, function (obj) {
            // If command
            if (!obj.state.ack) {
                // If start or pause timer
                if (obj.state.val) {
                    // If pause (the same value was written)
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) {
                                        clearInterval(interval);
                                        interval = null;
                                        state.val = 0;
                                    }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        // update value every second
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) {
                                    clearInterval(interval);
                                    interval = null;
                                    state.val = 0;
                                }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    // stop interval
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        // test timer. Disable it later
        setTimeout(() => setState(id, 20));
    }
);
```

### Погода
Протестировано с `yr` и `daswetter`. Один или несколько из следующих объектов должны иметь `Function=Weather` и `Room=Any`, установленные для доступности в конфигурации:

- `daswetter.0.NextDays.Location_1`
- `yr.0.прогноз`

Протестировано с драйвером `AccuWeather` v1.1.0 https://github.com/iobroker-community-adapters/ioBroker.accuweather.
Пользовательская карта Lovelace, созданная в поддержку прогноза accuweather - https://github.com/algar42/IoB.lovelace.accuweather-card

### Список покупок
Список покупок записывает значения в форме:

```json
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```

в состояние `lovelace.X.control.shopping_list`.

Вы также можете добавлять собственные списки дел или покупок, создавая вручную сущности с типом `todo`.

### Карта
Объекты должны выглядеть примерно так:

```js
createState('location', '39.5681295;2.6432632', false, {
    "name": "location",
    "role": "value.gps",
    "type": "string",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

или эти два объекта:

```js
createState('location.longitude', 2.6432632, false, {
    "name": "location longitude",
    "role": "value.gps.longitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
createState('location.latitude', 39.5681295, false, {
    "name": "location latitude",
    "role": "value.gps.latitude",
    "type": "number",
    "read": true,
    "write": false,
    "desc": "Gps Coordinates"
});
```

### Изображение сущности
Вы можете использовать для этого статическую картинку или использовать любое состояние, которое предоставляет URL в качестве состояния. Например:

```json
{
  "_id": "daswetter.0.NextDays.Location_1.Day_1.iconURL",
  "type": "state",
  "common": {
    "name": "Weather icon URL",
    "type": "string",
    "role": "weather.icon.forecast.0",
    "read": true,
    "write": false
  },
  "native": {}
}
```

или просто вручную установите тип сущности на `camera` и введите в него URL.

### Уценка
Вы можете использовать привязки в Markdown, как в [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects).

Например, текст `Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` создаст текст `Admin adapter is alive` на панели разметки.

## Пользовательские карты
### Загрузка пользовательских карт
Чтобы загрузить пользовательскую карту, напишите следующее:

```iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/```

После перезапуска адаптера Lovelace он автоматически включит все файлы из каталога `cards`.

Следующие пользовательские карты могут быть успешно протестированы:

- `bignumber-card`: https://github.com/custom-cards/bignumber-card/blob/master/bignumber-card.js
- `simple-thermostat`: https://github.com/nervetattoo/simple-thermostat/releases (возьмем последний релиз)
- `thermostat`: https://github.com/ciotlosm/custom-lovlace/tree/master/thermostat-card (требуются оба файла .js и .lib.js)

Я нашел эту ссылку https://github.com/jimz011/homeassistant как интересный ресурс для создания индивидуальных карточек.

Часто пользовательские карты хранятся на GitHub в виде исходников и должны быть скомпилированы перед использованием.
Вам следует проверить меню `Releases` на GitHub и попытаться найти там скомпилированные файлы.
Например, этот: [https://github.com/kalkih/mini-graph-card/releases](https://github.com/kalkih/mini-graph-card/releases) (ищите файл `mini-graph-card-bundle.js`)

## Собственные изображения
Пользовательские изображения (например, для фона) можно загрузить через тот же диалог конфигурации, что и пользовательские карты. И использовать его следующим образом:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

или

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

в файле конфигурации lovelace. Подробнее о фоне в lovelace [здесь](https://www.home-assistant.io/lovelace/views/#background).

## Темы
Темы можно определить в диалоговом окне конфигурации ioBroker.
Вставьте что-то вроде:

```yaml
midnight:
  # Main colors
  primary-color: '#5294E2'                                                        # Header
  accent-color: '#E45E65'                                                         # Accent color
  dark-primary-color: 'var(--accent-color)'                                       # Hyperlinks
  light-primary-color: 'var(--accent-color)'                                      # Horizontal line in about

  # Text colors
  primary-text-color: '#FFFFFF'                                                   # Primary text colour, here is referencing dark-primary-color
  text-primary-color: 'var(--primary-text-color)'                                 # Primary text colour
  secondary-text-color: '#5294E2'                                                 # For secondary titles in more info boxes etc.
  disabled-text-color: '#7F848E'                                                  # Disabled text colour
  label-badge-border-color: 'green'                                               # Label badge border, just a reference value

  # Background colors
  primary-background-color: '#383C45'                                             # Settings background
  secondary-background-color: '#383C45'                                           # Main card UI background
  divider-color: 'rgba(0, 0, 0, .12)'                                             # Divider

  # Table rows
  table-row-background-color: '#353840'                                           # Table row
  table-row-alternative-background-color: '#3E424B'                               # Table row alternative

  # Nav Menu
  paper-listbox-color: 'var(--primary-color)'                                     # Navigation menu selection hoover
  paper-listbox-background-color: '#2E333A'                                       # Navigation menu background
  paper-grey-50: 'var(--primary-text-color)'
  paper-grey-200: '#414A59'                                                       # Navigation menu selection

  # Paper card
  paper-card-header-color: 'var(--accent-color)'                                  # Card header text colour
  paper-card-background-color: '#434954'                                          # Card background colour
  paper-dialog-background-color: '#434954'                                        # Card dialog background colour
  paper-item-icon-color: 'var(--primary-text-color)'                              # Icon color
  paper-item-icon-active-color: '#F9C536'                                         # Icon color active
  paper-item-icon_-_color: 'green'
  paper-item-selected_-_background-color: '#434954'                               # Popup item select
  paper-tabs-selection-bar-color: 'green'

  # Labels
  label-badge-red: 'var(--accent-color)'                                          # References the brand colour label badge border
  label-badge-text-color: 'var(--primary-text-color)'                             # Now same as label badge border but that's a matter of taste
  label-badge-background-color: '#2E333A'                                         # Same, but can also be set to transparent here

  # Switches
  paper-toggle-button-checked-button-color: 'var(--accent-color)'
  paper-toggle-button-checked-bar-color: 'var(--accent-color)'
  paper-toggle-button-checked-ink-color: 'var(--accent-color)'
  paper-toggle-button-unchecked-button-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-bar-color: 'var(--disabled-text-color)'
  paper-toggle-button-unchecked-ink-color: 'var(--disabled-text-color)'

  # Sliders
  paper-slider-knob-color: 'var(--accent-color)'
  paper-slider-knob-start-color: 'var(--accent-color)'
  paper-slider-pin-color: 'var(--accent-color)'
  paper-slider-active-color: 'var(--accent-color)'
  paper-slider-container-color: 'linear-gradient(var(--primary-background-color), var(--secondary-background-color)) no-repeat'
  paper-slider-secondary-color: 'var(--secondary-background-color)'
  paper-slider-disabled-active-color: 'var(--disabled-text-color)'
  paper-slider-disabled-secondary-color: 'var(--disabled-text-color)'

  # Google colors
  google-red-500: '#E45E65'
  google-green-500: '#39E949'
```

взято из [здесь](https://community.home-assistant.io/t/midnight-theme/28598/2).

## Иконки
Используйте значки в форме `mdi:NAME`, например `mdi:play-network`. Названия можно взять отсюда: https://materialdesignicons.com/

## Уведомления
Вы можете добавлять уведомления с помощью функциональности `sendTo` или путем записи состояния в `lovelace.X.notifications.add`:

```js
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

или

```js
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Голосовое управление
Все команды из веб-интерфейса будут записаны в состояние lovelace.X.conversation с `ack=false`.
Вы можете написать скрипт, который будет реагировать на запрос и отвечать:

```js
on({id: 'lovelace.0.conversation', ack: false, change: 'any'}, obj => {
   console.log('Question: ' + obj.state.val);
   if (obj.state.val.includes('time')) {
      setState('lovelace.0.conversation', new Date().toString(), true); // true is important. It will say, that this is answer.
   } else {
      setState('lovelace.0.conversation', 'Sorry I don\'t know, what do you want', true); // true is important. It will say, that this is answer.
   }
});
```

## Поиск неисправностей
Если вы испортили код YAML и видите пустую страницу, но верхнее меню все еще открыто, вы можете включить режим редактирования (если он еще не включен) из меню, а затем снова открыть меню, чтобы получить доступ к «RAW Yaml Editor», в котором вы видите полный код YAML и можете его очистить.
Если это не поможет, вы можете открыть объект `lovelace.*.configuration` в raw-editor в ioBroker и посмотреть там.
Вы также можете восстановить этот объект из резервной копии. Он содержит полную конфигурацию вашей визуализации.

## Первоисточники для lovelace
Использованные исходники здесь https://github.com/GermanBluefox/home-assistant-polymer .

## То, что нужно сделать
Безопасность должна быть взята от текущего пользователя, а не от default_user

## Разработка
### Версия
Использованная версия home-assistant-frontend@20250306.0 Версия Browser Mod: 2.3.3

### Как создать новую версию Lovelace
Прежде всего, фактический https://github.com/home-assistant/frontend (ветка dev) должен быть **вручную** объединен с https://github.com/GermanBluefox/home-assistant-polymer.git (ветка ***iob***!).

Все изменения для ioBroker отмечены комментарием `// IoB`.
На данный момент (20250401.0) были изменены следующие файлы:

- `build-scripts/gulp/app.js` - Добавить новую задачу gulp develop-iob
- `build-scripts/gulp/rspack.js` - Добавить новую задачу gulp rspack-dev-app
- `src/data/icons.ts` - всегда использовать резерв для старых версий, где интерфейс решает, какой значок использовать для binary_sensors (если ничего не указано).
- `src/data/weather.ts` - добавлена поддержка отображения значка погоды из URL.
- `src/dialogs/more-info/const.ts` - удалить состояние погоды и историю
- `src/dialogs/more-info/ha-more-info-dialog.ts` - удалить кнопку и вкладку настроек сущности
- `src/dialogs/more-info/ha-more-info-history.ts` - удалить ссылку `показать больше` в истории
- `src/dialogs/more-info/ha-more-info-logbook.ts` - удалить ссылку `показать больше` в журнале
- `src/dialogs/more-info/controls/more-info-weather.ts` - добавлена поддержка отображения значка погоды из URL.
- `src/dialogs/voice-command-dialog/ha-voice-command-dialog.ts` - отключить настройку голосовых помощников
- `src/entrypoints/core.ts` - добавить опцию без аутентификации
- `src/panels/lovelace/cards/hui-weather-forecast-card.ts` - добавлена поддержка отображения значка погоды из URL.
- `src/panels/lovelace/entity-rows/hui-weather-entity-row.ts` - добавлена поддержка отображения значка погоды из URL с аутентификацией.
- `src/panels/lovelace/hui-root.ts` - добавлена кнопка уведомления, отключена ссылка управления панелями мониторинга
- `src/util/documentation-url.ts` - для ссылки на справку iobroker вместо домашнего помощника.
- `.husky/pre-commit` - удалить хуки коммитов git.

После этого извлеките измененную версию в папке `./build`. Затем.

1. перейдите в каталог ./build.
2. `git clone https://github.com/GermanBluefox/home-assistant-polymer.git` это форк https://github.com/home-assistant/frontend.git, но некоторые вещи изменены (см. список файлов ранее).
3. `cd home-assistant-polymer`
4. `git checkout master`
5. `установка пряжи`
6. `gulp build-app` для релиза или `gulp develop-iob` для отладочной версии. Чтобы собрать веб после изменений, вы можете вызвать `webpack-dev-app` для более быстрой сборки, но вам в любом случае нужно вызвать `build-app` после того, как версия будет готова к использованию.
7. запустите скрипт `hass_frontend/static_cards/newFrontend.sh` в репозитории адаптера, чтобы обновить фронтенд (предполагается, что два репозитория находятся рядом друг с другом в одной папке; если нет, пожалуйста, настройте скрипт, желательно с некоторой обработкой параметров, и создайте PR, спасибо :smile: )
8. Запустите задачу `gulp rename`.
9. Обновите версию в `README.md`

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Garfonso) settings from entity registry are now loaded on startup
* (Garfonso) logbook: prevent entries from the future
* (Garfonso) use default icons for binary sensors again (recompiled frontend, clear browser cache if problems occur)

### 5.0.0 (2025-04-10)
* (Garfonso) Updated frontend to 20250401.0
* (Garfonso) Updated browser_mod to 2.3.3
* (Garfonso) Add statistics recorder
* (Garfonso) Add entity registry, use it to solve id clashes. In the future, store entity settings here.
* (Garfonso) Limit the number of stored browser instances
* (Garfonso) Improved caching behavior. Might solve iobroker.pro issue... hopefully?
* (Garfonso) Prevent crash with some edge cases with light entities
* (Garfonso) experimental dashboard support.
* (Garfonso) Allow to show sidebar via object in instances. VERY experimental. A lot of stuff does not yet work. But allows to configure dashboards and also browser mod.

### 4.1.15 (2025-03-10)
* (Garfonso) repaired image loading, again.

### 4.1.14 (2025-03-10)
* (Garfonso) repaired image loading. Fixes #577

### 4.1.13 (2025-03-06)
* (Garfonso) reworked image sending. Now weather icons work for normal users, too. Also, weather images are transferred from our server, so no access to admin is needed anymore.

## License

Copyright 2019-2025, bluefox <dogafox@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.