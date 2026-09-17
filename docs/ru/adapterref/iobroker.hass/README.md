---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hass/README.md
title: ioBroker.hass
hash: phJ2sQDbDPneJiIUpmOpnNgVw3yp+QzrPqApF7bioRs=
---
![Логотип](../../../en/adapterref/iobroker.hass/admin/hass.svg)

![Количество установок](http://iobroker.live/badges/hass-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hass.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.hass/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/hass/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hass.svg)

# ioBroker.hass

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Этот адаптер позволяет подключить Home Assistant к ioBroker.

## Использование

Создайте долгосрочный токен в HASS и используйте его в качестве пароля (скопируйте его также в поле повтора).

Затем система должна считать все атрибуты для всех устройств. Службы могут быть управляемыми (например, "turn\_on"). Для управления службами у вас есть два варианта:

### Установите прямое значение

Установите состояние со значением ack=false, которое не является строкой (например, логическое значение true), тогда оно будет активировано и в HASS без дополнительных данных сервиса. Это будет работать только в том случае, если у сервиса есть одно поле для отправки — тогда значение будет отправлено как это поле! Если у сервиса больше одного поля, вы найдете предупреждение в журнале, содержащее более подробную информацию о полях, которые могут быть отправлены, например:

```
Please make sure to provide a stringified JSON as value to set relevant fields! Please refer to the Readme for details!
Allowed field keys are: temperature, target_temp_high, target_temp_low, hvac_mode
```

### Задайте строковый JSON для предоставления одного или нескольких полей.

Установите состояние с помощью строкового значения ack=false, представляющего собой строковый JSON-объект, который будет использоваться для вызова сервиса и в качестве данных сервиса.

Для последнего варианта в функции light.turn\_off, например, `{"transition":10,"flash":"short"}` Эти два параметра сервисных данных передаются вместе с вызовом в HASS. Доступные поля с точным определением данных можно увидеть в JSON-определении объекта ioBroker. `native` Раздел полей будет выглядеть следующим образом в приведенном выше примере:

```json5
{
    // ...
    native: {
        "fields": {
            "transition": {
                "name": "Transition",
                "description": "Duration it takes to get to next state.",
                "selector": {
                    "number": {
                        "min": 0,
                        "max": 300,
                        "unit_of_measurement": "seconds"
                    }
                }
            },
            "flash": {
                "name": "Flash",
                "description": "If the light should flash.",
                "advanced": true,
                "selector": {
                    "select": {
                        "options": [
                            "long",
                            "short"
                        ]
                    }
                }
            }
        },
        "entity_id": "light.mi_control_hub_light",
        "attr": "turn_off",
        "type": "light"
    }
    //...
}
```

Для некоторых сервисов, таких как set\_speed, требуется передавать JSON-объект, например: `{speed: "high"}` В общем случае, это необходимо для предоставления требуемых значений. В данном случае определение поля выглядит, например, так:

```json5
{
    //...
    native: {
        "fields": {
            "speed": {
                "name": "Speed",
                "description": "Speed setting.",
                "required": true,
                "example": "low",
                "selector": {
                    "text": null
                }
            }
        }
        // ...
    }
    // ...
}
```

## Конфигурация

Есть хорошая статья об этой связи.

Пожалуйста, проверьте это: <https://www.smarthomejetzt.de/mit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen/>

**К сожалению, только на немецком языке, но [Google Translate работает довольно хорошо.](https://translate.google.com/translate?hl=en\&sl=de\&tl=en\&u=https%3A%2F%2Fwww.smarthomejetzt.de%2Fmit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen%2F)**

## Фильтр исключения сущности

При желании можно ограничить список объектов Home Assistant, синхронизируемых с ioBroker.

Каждая непустая строка в поле **«Исключить шаблоны»** (кроме комментариев) представляет собой шаблон (только шаблоны). `*` является подстановочным знаком и соответствует любой последовательности символов, включая `.` Сопоставление чувствительно к регистру и привязано к полному идентификатору. Существует два типа шаблонов:

- **Шаблоны сущностей** (все шаблоны, не начинающиеся с `entities.`) сопоставляются с полным `entity_id` (например `switch.living_room`) только.
- **Шаблоны путей к объектам** начинаются с `entities.` и сопоставляются с идентификатором объекта ioBroker без префикса экземпляра (например) `entities.sensor.living_room_temperature.device_class`). Префикс экземпляра может быть включен (например, `hass.0.entities.…`), поэтому идентификаторы, скопированные из обозревателя объектов, тоже будут работать.

Сущность, соответствующая шаблону сущности, или канал которой `entities.<entity_id>` соответствует шаблону пути к объекту, то есть:

- Пропускается при создании или обновлении объектов (начальная синхронизация и повторная синхронизация).
- Игнорируется при изменении состояния в HASS (в ioBroker не запускаются операции записи состояния).

Отдельный объект состояния, атрибута или сервиса, соответствующий шаблону пути объекта, пропускается по отдельности. Это можно использовать для удаления лишних атрибутов, таких как `device_class` или `state_class` без удаления самого датчика. Шаблоны сущностей никогда не совпадают с путями объектов: `*battery*` удаляет элементы батареи, но не саму батарею. `battery_level` атрибут других сущностей.

Строки, начинающиеся с `#` рассматриваются как комментарии.

Примеры:

```
# Drop every entity whose name starts with `iob_`, regardless of domain:
*.iob_*

# Drop sensors only:
sensor.iob_*

# Drop a whole ioBroker object subtree:
entities.device_tracker.*

# Drop noisy attributes from all synced entities while keeping the main state:
entities.*.*.device_class
entities.*.*.state_class
```

Установите **флажок «Подробное логирование»,** чтобы регистрировать все исключенные записи. `entity_id` индивидуально во время первой синхронизации (требуется уровень логирования адаптера) `info` или `debug` Последующие повторные синхронизации выводят только общее количество событий, чтобы журнал оставался чистым.

Пустой список шаблонов оставляет поведение адаптера идентичным предыдущим версиям.

## Крупные установки

js-controller выдает предупреждение, если экземпляр адаптера содержит больше объектов, чем установленный лимит предупреждений (по умолчанию 5000). В Home Assistant это ограничение легко может быть превышено, поэтому адаптер устанавливает лимит по умолчанию в 30000 (js-controller >= 7.1.2). Если предупреждение по-прежнему появляется для существующего экземпляра, увеличьте значение параметра `system.adapter.hass.<instance>.objectsWarnLimit` или уменьшить количество объектов с шаблонами путей (см. выше).

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 2.1.1 (2026-09-14)
- (copilot) Adapter requires node.js >= 22 now
- (@rockbaer2007) Exclude patterns starting with `entities.` filter single objects (e.g. `entities.*.*.device_class`) without dropping the entity
- (@rockbaer2007) Reduced resync noise and raised the default object warning limit to 30000 for large installations
- (@GermanBluefox) State changes received during the initial synchronization are applied afterward instead of being lost

### 2.1.0 (2026-05-16)
* (mokusone) Added optional entity exclude filter with glob patterns, configurable via the admin UI, plus a verbose-logging toggle for inspecting matches
* (@klein0r) Use `/core/` instead of `/api/` when connecting to supervisor directly (e.g., in ha app)
* (@klein0r) Use ENV var SUPERVISOR_TOKEN as fallback for password

### 2.0.4 (2026-05-05)
* (@GermanBluefox) Tried to keep the custom settings of the objects when updating them with new data from HASS

### 2.0.3 (2026-04-02)
* (@GermanBluefox) Adapter was updated and migrated to TypeScript
* (@Titanium177) Added roles for states and added debouncing for reading states from hass

### 1.4.0 (2023-01-03)
* (Apollon77) Added more guidance logging when setting services incorrectly
* (Apollon77) Prevent crashes when attributes contain "." at the end of their names
* (Apollon77) Added logging for state updates for unknown objects