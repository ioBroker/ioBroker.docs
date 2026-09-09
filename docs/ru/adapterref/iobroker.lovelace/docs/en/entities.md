---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/docs/en/entities.md
title: Сущности
hash: n0ZuDa2MK1jlpz0UFm+ldG6Jvv69B1gxsca1iAFBkFo=
---
![Логотип](../../../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

# Сущности

Существует два способа преобразовать объекты ioBroker в Home Assistant.`entities` :

1. [Автоматическое обнаружение](#automatic-detection) (предпочтительно)
2. [Ручная настройка](#manual-configuration)

Ниже вы также найдете список [поддерживаемых типов сущностей](#supported-entity-types) и некоторые [специальные сущности](#special-entities) (будильник, таймер, погода, карта и т. д.).

## Автоматическое обнаружение

Это всегда предпочтительный способ, если это возможно. Для обнаружения используется библиотека ioBroker.`type-detector` который также используется другими адаптерами, такими как`iot` или`material` Таким образом, если ваши устройства правильно настроены для работы с одним из этих адаптеров, то преимущества от их использования получат сразу несколько из них.

Также имеется пользовательский интерфейс для`type-detector` : [адаптер устройств](https://github.com/iobroker/iobroker.devices) . Настоятельно рекомендуется установить его и активировать соответствующую вкладку в разделе «Администрирование» — все обнаруженные устройства отображаются там и потенциально могут быть использованы в Lovelace.

![Адаптер устройств](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/devices-overview.JPG)

Для обнаружения важно, чтобы состояния устройства имели правильные роли и типы (число, строка, логическое значение и т. д.). Если это не так для одного из ваших устройств, создайте устройство с помощью функции alias из js-контроллера. Самый простой способ — снова _вкладка «Устройства»_ в админке: там вы можете выбрать существующий объект для каждого состояния устройства, и роли и другие свойства будут правильно установлены в alias, так что обнаружение будет работать.

После установки папки, типа, комнаты и функции, отдельным состояниям присваиваются следующие значения:![Конфигурация состояния](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/devices-create.JPG)

Lovelace обнаруживает каждое устройство, отображаемое на вкладке «Устройства», которому назначены **и** комната **, и** функция. Устройства, у которых отсутствует хотя бы один из этих параметров, игнорируются.

В настройках экземпляра можно увидеть, что для более сложных объектов несколько состояний объединены в одно.`entity` , например:![Светлая сущность](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/light-entity.JPG)

Это свет (`light` Поддержка цвета, цветовой температуры и затемнения — 4 состояния ioBroker в одном объекте.

## Ручная настройка

В представлении объекта (`custom` (Настройки объекта ioBroker) Lovelace можно включить для отдельных объектов. Вы задаете сущность.`domain` (`light` ,`input_boolean` , …) и имя.

Простые сущности с одним состоянием (например)`input_number` ,`input_text` ,`input_boolean` ) работают напрямую. Кроме того, многосостоятельные сущности можно настраивать с помощью средств выбора объектов в пользовательском диалоговом окне — например,`cover` (например, автоматическое окно),`device_tracker` и`person` Для таких типов вы выбираете состояния ioBroker для каждой роли (например, cover).`SET` /`ACTUAL` /`OPEN` /`CLOSE` /`STOP` (или наличие трекера / GPS), и адаптер повторно использует всю логику сущности.

Для сложных устройств (например, светильников с регулировкой яркости и цвета) настоятельно рекомендуется автоматическое определение. Также для (бинарных) датчиков предпочтительно автоматическое определение:`device_class` Затем заполняется атрибут, и отображение лучше соответствует устройству (например, бинарный датчик типа "дверь" отображается как "дверь", а включение/выключение преобразуется в "открыто"/"закрыто).

#### Где включить настройки и что такое состояние сущности?

Для **простых** типов с одним состоянием (`input_number` ,`input_text` ,`input_boolean` ,`input_select` ,`switch` ,`sensor` ,`binary_sensor` ,`camera` ,`timer` ,`alarm_control_panel` ) включить пользовательские настройки **самого состояния** — значением этого объекта _является_ состояние сущности.

Для **многосостоятельных** типов вы выбираете состояния ioBroker для каждой роли в пользовательском диалоговом окне. Объект, для которого вы активируете настройки, является только **якорем** (он присваивает сущности ее идентификатор и понятное имя); его собственное значение **не** считывается — сопоставляется каждое функциональное состояние с выбираемыми параметрами. Таким образом, вы можете установить настройки для любого из состояний устройства (например, для состояния целевой температуры термостата).

`SET` Всегда указывается **целевое** значение (уставка, уровень покрытия), а не состояние объекта. Состояние объекта (основное значение, отображаемое на карточке) для каждого типа:

| Домен                      | Роли сборщика заказов                                                                                                                                                                                                                                                            | Состояние сущности                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `light`                    | `ON` (вкл/выкл),`ON_ACTUAL` ,`DIMMER` (яркость),`TEMPERATURE` (цветовая температура),`RGB` ,`HUE` ,`SATURATION` ,`EFFECT`                                                                                                                                                        | `on` / `off`                                                                          |
| `cover`                    | `SET` (уровень),`ACTUAL` ,`OPEN` /`CLOSE` /`STOP` ,`TILT_SET` /`TILT_ACTUAL`                                                                                                                                                                                                     | `open` /`closed` /`opening` /`closing`                                                |
| `climate`                  | `SET`(целевая температура),`ACTUAL` (текущая температура),`MODE` (Режим системы отопления, вентиляции и кондиционирования),`POWER` (вкл/выкл),`HUMIDITY` ,`SPEED` ,`SWING` ,`BOOST` ,`PARTY` ; Выбор режима _отопления/охлаждения_ появляется, когда нет`MODE` нанесено на карту | Режим работы системы отопления, вентиляции и кондиционирования:`heat` /`cool` / `off` |
| `lock`                     | `SET` (блокировка/разблокировка),`ACTUAL` ,`OPEN` (защелка)                                                                                                                                                                                                                      | `locked` / `unlocked`                                                                 |
| `media_player`             | `STATE` ,`POWER` ,`PLAY` /`PAUSE` /`STOP` /`NEXT` /`PREV` ,`VOLUME` /`VOLUME_ACTUAL` /`MUTE` ,`SEEK` /`REPEAT` /`SHUFFLE` ,`TITLE` /`ARTIST` /`COVER` /`DURATION` /`ELAPSED`                                                                                                     | `playing` /`paused` / `idle`                                                          |
| `vacuum`                   | `STATE` (статус),`POWER` (старт/стоп),`PAUSE` ,`BATTERY` ,`WORK_MODE` (скорость вращения вентилятора)                                                                                                                                                                            | `cleaning` /`docked` /`paused` /`returning` /`idle` / `error`                         |
| `humidifier`               | `POWER` (вкл/выкл),`SET` (целевая влажность),`ACTUAL` (текущая влажность),`MODE`                                                                                                                                                                                                 | `on` / `off`                                                                          |
| `water_heater`             | `SET` (целевая температура),`ACTUAL` (текущая температура),`POWER` (вкл/выкл),`MODE` (операция)                                                                                                                                                                                  | режим работы                                                                          |
| `device_tracker` /`person` | присутствие, GPS (`"lat;lon"` или отдельные координаты широты/долготы), точность GPS, заряд батареи, изображение (URL или название штата), тип источника.                                                                                                                        | `home` /`not_home` / название зоны                                                    |

### Панель сигнализации

ioBroker пока не поддерживает такое устройство, но его можно смоделировать. Если вы создадите подобный скрипт:

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
                "name": "simulateAlarm" // entity name -> "alarm_control_panel.simulateAlarm"
            }
        }
    },
    {
        "alarm_code": 1234 // alarm code that must be entered
    },
    function () {
        on({id: 'javascript.' + instance + '.alarmSimple', change: 'any'}, function (obj) {
            console.log('Control here the real device: ' + obj.state.val);
        });
    }
);
```

или вы просто используете`lovelace.X.control.alarm (entity_id = alarm_control_panel.defaultAlarm)` .

### Ввод числа

Выберите`input_number` тип сущности в пользовательском диалоговом окне. Это требует`min` и`max` в`common` ; необязательный`step` Можно добавить. Для стрелок вверх/вниз вместо ползунка.`mode` к`number` :

```json5
common: {
    custom: {
        "lovelace.0": {
            "enabled": true,
            "entity": "input_number",
            "name": "Shutter", // entity name -> "input_number.Shutter"
            "mode": "number" // default presentation is slider
        }
    }
}
```

### Выберите вход

Выберите`input_select` Тип сущности в пользовательском диалоговом окне. Список параметров берется из стандартного набора.`common.states` объект:

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

### Таймер

Таймер можно имитировать с помощью следующего скрипта:

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
                "name": "simulateTimer" // entity name -> "timer.simulateTimer"
            }
        }
    },
    {},
    function () {
        let interval;
        let id = 'javascript.' + instance + '.timerSimple';
        on({id, change: 'any'}, function (obj) {
            if (!obj.state.ack) {
                if (obj.state.val) {
                    if (obj.state.val === obj.oldState.val) {
                        if (interval) {
                            setState(id, state.val, true);
                            clearInterval(interval);
                            interval = null;
                        } else {
                            interval = setInterval(() => {
                                getState(id, (err, state) => {
                                    state.val--;
                                    if (state.val <= 0) { clearInterval(interval); interval = null; state.val = 0; }
                                    setState(id, state.val, true);
                                });
                            }, 1000);
                        }
                    } else {
                        interval && clearInterval(interval);
                        interval = setInterval(() => {
                            getState(id, (err, state) => {
                                state.val--;
                                if (state.val <= 0) { clearInterval(interval); interval = null; state.val = 0; }
                                setState(id, state.val, true);
                            });
                        }, 1000);
                    }
                } else {
                    interval && clearInterval(interval);
                    interval = null;
                }
            }
        });
        setTimeout(() => setState(id, 20));
    }
);
```

## Поддерживаемые типы сущностей

Следующие типы сущностей создаются адаптером или могут быть настроены вручную. Приведены следующие типы сущностей.`domain` (часть, с которой начинается entity\_id, например)`light` для`light.kitchen` ) и устройства ioBroker, которые приводят к этому объекту при автоматическом обнаружении.

### Свет

Домен:`light`

Устройства ioBroker: Light (`light` ), Диммер (`dimmer` ), цветовая температура (`ct` ), RGB-подсветка (`rgb` ), RGB одинарный (`rgbSingle` ), подсветка HUE (`hue` ).

ioBroker разделяет лампы на несколько классов устройств в зависимости от их возможностей — три из них предназначены для цветного освещения.`rgb` ,`rgbSingle` ,`hue` ), опционально с диммером/цветовой температурой. Используется класс с максимальными возможностями. Ручная настройка в настоящее время поддерживает только включение/выключение и опциональное затемнение; для светильников с расширенными возможностями требуется автоматическое определение.

![Светлая сущность](../de/media/light-entity.JPG)![Светлая сущность в Лавлейсе](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/light-entity-lovelace.JPG)

### Датчики

Домен:`sensor`

Устройства ioBroker: наклон окна (`windowTilt` ), влажность (`humidity` ), температура (`temperature` ).

Хотя датчики обычно состоят из одного состояния ioBroker (поэтому подойдет и ручная настройка), автоматическое обнаружение все же рекомендуется.`device_class` Атрибут заполнен, и Lovelace устанавливает правильный значок и единицу измерения.

### Климат

Домен:`climate`

Устройства ioBroker: термостат (`thermostat` ), кондиционер (`airCondition` ).

![Климатическая карта](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/climate-entity-full.JPG)

В Lovelace температура регулируется с помощью круглого ползунка. Под ним расположены кнопки для выбора режима (только для известных режимов). Режимы обозначаются цифрами.`states` в состоянии ioBroker. Лавлейс знает.`auto` ,`heat` ,`cool` ,`heat_cool` ,`dry` ,`fan_only` и`off` ; они отображаются в виде переведенных кнопок. Другие состояния отображаются в виде выпадающего списка в диалоговом окне «Подробнее», которое также содержит выпадающие списки для предустановок (если`boost` или`party` (существуют в устройстве ioBroker) и вентилятор/качели, если обнаружены (их состояния отображаются в соотношении 1:1).

![Климат, дополнительная информация](../de/media/climate-entity-full-moreinfo.JPG)![Климатические характеристики](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/climate-entity-full-attributes.JPG)

## Особые сущности

### Погода

Протестировано с помощью`yr` и`daswetter` Один или несколько из следующих объектов должны обладать`Function=Weather` и`Room=Any` Эта опция должна быть доступна в конфигурации:

- `daswetter.0.NextDays.Location_1`
- `yr.0.forecast`

Протестировано с помощью`AccuWeather` драйвер v1.1.0 ( <https://github.com/iobroker-community-adapters/ioBroker.accuweather> ). Пользовательская карточка Lovelace для поддержки прогноза погоды AccuWeather: <https://github.com/algar42/IoB.lovelace.accuweather-card>

### Список покупок

Список покупок записывает свои значения в...`lovelace.X.control.shopping_list` укажите в таком виде:

```json
[
   {"summary": "Task 1", "uid": "1234222", "status": "needs_action"},
   {"summary": "Task 2", "uid": "1234223", "status": "completed"}
]
```

Вы также можете добавлять собственные списки дел или покупок, создавая сущности вручную с определенным типом.`todo` .

### Карта / присутствие

На карте показаны объекты, подобные этому:

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

или два отдельных объекта с ролями`value.gps.longitude` и`value.gps.latitude` .

Чтобы отобразить маркер человека/присутствия на карте, сопоставьте объект ioBroker с объектом, созданным вручную.`device_tracker` или`person` сущность (см. [Ручная настройка](#manual-configuration) ).

### Изображение объекта

Используйте статическое изображение или любой другой формат, предоставляющий URL-адрес:

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

или просто вручную задать тип сущности.`camera` и вставьте в него URL-адрес. Для видео/прямых трансляций см. [раздел «Функции» → «Видео»](/#/docs/adapterref/iobroker.lovelace/docs/en/features.md#video--live-streams) .