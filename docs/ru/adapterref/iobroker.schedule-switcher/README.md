---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.schedule-switcher.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.schedule-switcher.svg
BADGE-Number of Installations: https://iobroker.live/badges/schedule-switcher-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/schedule-switcher-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.schedule-switcher.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.schedule-switcher/README.md
title: Переключатель ioBroker.schedule
hash: hTMhI+nuAqAchPX1J2nKlcMjbVOggmKJV7EXnURridM=
---
![логотип](../../../de/admin/schedule-switcher.png)

# IoBroker.schedule-switcher
[Вернуться к README](/README.md)

# Введение
Этот адаптер позволяет пользователю включать/выключать устройства по расписанию или 100/0.
Расписания полностью настраиваются с помощью виджета Vis или Vis 2.
Расписание изменяет одно или несколько состояний ioBroker и состоит из одного или нескольких триггеров, которые определяют, когда и как следует изменить состояние.
Можно настроить, в какое время и в какие дни недели должен срабатывать триггер. Также можно создать астро-триггеры или обратный отсчет.

# Краткое содержание
- [Настройки экземпляра](#instance-setting-schedule-switcher)
- [Объекты](#состояния)
- [Пример триггерных событий в формате JSON](#example-triggerevents-json)
- [Пример триггера в формате JSON](#example-trigger-json)
- [Пример sendTo запускает только экспертов](#example-trigger-with-sendto-create-or-edit-experts)
- [Пример виджета в формате JSON](#example-widgets-json)
- [Пример истории в формате JSON](#example-history-json)
- [Создать виджет](#создать виджет)
- [изменить имя](#changename)
- [Добавить условия](#condition-add)
- [заменить текст](#текст-заменить)
- [Настройки CSS](#css-apply-description-see-css)
- [Создать триггер](#trigger)
- [Создать астротриггер](#astro-trigger)
- [Создать одноразовый триггер](#one-time-trigger)
- [Настройка HTML](#html-for-vis-and-vis-2)
- [Функция HTML ТОЛЬКО VIS-2](#function-only-for-vis-2)
- [CSS](#css)

### Настройка экземпляра переключателя расписания
[Краткое содержание](#zusammenfassung)

- `+ знак`: добавить новое расписание.
- `Идентификатор схематических данных`: созданные объекты.
- `Имя`: название виджета.
- `Количество триггеров`: количество триггеров.
- «Активный»: Активный
- `Удалить`: удалить расписание.
- `Задержка между двумя процессами переключения в мс`: предотвращает одновременную установку состояний.
- `Переключение истории в формате JSON (макс. 100/0 для выключения)` Макс. хранение истории.
- `Создать HTML для VIS и VIS-2 (VIS-2 см. описание)` Обзор HTML активации

![экземпляр_settings.png](img/instance_settings.png)</br> ![экземпляр_settings_1.png](../../../de/adapterref/iobroker.schedule-switcher/img/instance_settings_1.png)

###Государства
[Краткое содержание](#zusammenfassung)

- вкл выкл
- `schedule-switcher.0.onoff.6.data` Все триггеры в формате JSON.
- `schedule-switcher.0.onoff.6.enabled` Активен или Неактивен
- `schedule-switcher.0.onoff.6.views` Где виджеты были созданы для объектов
- Статус
- `schedule-switcher.0.counterTrigger` количество триггеров (активных и неактивных)
- `schedule-switcher.0.history` История схем
- `schedule-switcher.0.nextEvents` Следующие события переключения в виде таблицы JSON.
- `schedule-switcher.0.sendto` В VIS-2 изменения передаются адаптеру через этот объект.

![101_remote.png](../../../de/adapterref/iobroker.schedule-switcher/img/view_states.png)

# Пример триггерных событий JSON
[Краткое содержание](#zusammenfassung)

```json
[
    {
        "type": "TimeTrigger", // TimeTrigger, AstroTrigger oder OneTimeTrigger
        "name": "Rollloade Wohn", // Name
        "triggerid": 0, // Trigger ID
        "action": "OnOffStateAction", // OnOffStateAction oder Condition
        "states": ["0_userdata.0.test", "0_userdata.0.test5"], // States
        "active": true, // enabled true oder false
        "hour": 16, // Stunde
        "minute": 22, // Minute
        "day": 9, // Tag
        "dateISO": "2024-11-09T15:22:00.000Z", // Zeit ohne Zeitzone
        "timestamp": 1731165720000, // Timestamp ohne Zeitzone
        "objectId": 1 // ObejektId schedule-switcher.0.onoff.<objectid>.data
    }
]
```

# Пример триггера JSON
[Краткое содержание](#zusammenfassung)

```json
{
    "type": "OnOffSchedule",
    "name": "Rolllade Wohn", // Name vom letzten erstellte Widget
    "onAction": {
        // Action für On
        "type": "OnOffStateAction",
        "valueType": "number",
        "onValue": 0,
        "offValue": 100,
        "booleanValue": true,
        "idsOfStatesToSet": ["0_userdata.0.test4"] // States max. 10
    },
    "offAction": {
        // Action für Off
        "type": "OnOffStateAction",
        "valueType": "number",
        "onValue": 0,
        "offValue": 100,
        "booleanValue": false,
        "idsOfStatesToSet": ["0_userdata.0.test4"] // States max. 10
    },
    "triggers": [
        {
            "type": "AstroTrigger", // Trigger - AstroTrigger - OneTimeTrigger
            "astroTime": "sunrise",
            "shiftInMinutes": 0,
            "weekdays": [1, 2, 3, 4, 5, 6],
            "id": "0",
            "action": {
                "type": "ConditionAction",
                "condition": {
                    "type": "StringStateAndConstantCondition",
                    "constant": "true",
                    "stateId": "0_userdata.0.test",
                    "sign": "=="
                },
                "action": {
                    "type": "OnOffStateAction",
                    "name": "On"
                }
            }
        }
    ]
}
```

# Пример виджетов JSON
[Краткое содержание](#zusammenfassung)

```json
{
    "vis-2.0": {
        // Welche VIS Version
        "main": {
            // Projekt
            "w000005": {
                // Widget ID
                "prefix": "main", // Projekt
                "namespace": "vis-2.0", // Welche VIS Version
                "view": "Rollladen", // Welche View
                "widgetId": "w000005", // Widget ID
                "newId": "schedule-switcher.0.onoff.6.data", // Neues Objekt
                "oldId": "timer-switch.0.onoff.1.data", // Altes Objekt
                "enabled": "schedule-switcher.0.onoff.6.enabled", // Enabled Objekt
                "stateCount": 1, // Counter Zustände
                "state": [
                    // Zustände
                    {
                        "oid-stateId1": "0_userdata.0.test5"
                    }
                ],
                "conditionCount": 1, // Counter Bedingung
                "condition": [
                    // Zustände Bedingungen
                    {
                        "oid-conditionStateId1": "0_userdata.0.test"
                    }
                ]
            },
            "w000006": {
                // Widget ID
                "prefix": "main", // Projekt
                "namespace": "vis-2.0", // Welche VIS Version
                "view": "Test", // Welche View
                "widgetId": "w000006", // Widget ID
                "newId": "schedule-switcher.0.onoff.6.data", // Neues Objekt
                "oldId": "timer-switch.0.onoff.1.data", // Altes Objekt
                "enabled": "schedule-switcher.0.onoff.6.enabled", // Enabled Objekt
                "stateCount": 1, // Counter Zustände
                "state": [
                    // Zustände
                    {
                        "oid-stateId1": "0_userdata.0.test4"
                    }
                ],
                "conditionCount": 1, // Counter Bedingung
                "condition": [] // Zustände Bedingungen
            }
        }
    }
}
```

# Пример создания или редактирования триггеров с помощью sendTo (эксперты)
[Краткое содержание](#zusammenfassung)

```JSON
sendTo("schedule-switcher.0", "add-trigger", { // Neuen Auslöser anlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "triggerType":"TimeTrigger",
    "actionType":"OnOffStateAction"
});

sendTo("schedule-switcher.0", "update-trigger", { // Aktion für den neuen Auslöser festlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "trigger":{
        "type":"TimeTrigger",
        "hour":12,
        "minute":32,
        "weekdays":[1,2,3,4,5],
        "id":"0", // ID abgleichen
        "action":{
            "type":"OnOffStateAction",
            "name":"On"
        }
    }
});

sendTo("schedule-switcher.0", "add-trigger", { // Neuen Astrotrigger anlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "triggerType":"AstroTrigger",
    "actionType":"OnOffStateAction"
});

sendTo("schedule-switcher.0", "update-trigger", { // Aktion für den neuen Auslöser festlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "trigger":{
        "type":"AstroTrigger",
        "astroTime":"sunrise", // sunrise, sunset or solarNoon
        "shiftInMinutes":0,
        "weekdays":[1,2,3,4,5],
        "id":"0", // ID abgleichen
        "action":{
            "type":"OnOffStateAction",
            "name":"On"
        }
    }
});

sendTo("schedule-switcher.0", "disable-schedule", { // Auslöser deaktivieren
    "dataId":"schedule-switcher.0.onoff.6.data"
});

sendTo("schedule-switcher.0", "enable-schedule", { // Auslöser aktivieren
    "dataId":"schedule-switcher.0.onoff.6.data"
});

sendTo("schedule-switcher.0", "add-one-time-trigger", { // Einmalauslöser anlegen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "trigger":"{\"type\":\"OneTimeTrigger\",\"date\":\"2024-10-17T06:14:22.660Z\",\"timedate\":false,\"action\":{\"type\":\"OnOffStateAction\",\"name\":\"On\"}}"
});

sendTo("schedule-switcher.0", "delete-trigger", { // Auslöser mit bekannter ID löschen
    "dataId":"schedule-switcher.0.onoff.6.data",
    "triggerId":"0"
});
```

# Пример истории в формате JSON
[Краткое содержание](#zusammenfassung)

```JSON
[
  {
    "setObjectId": "0_userdata.0.test4",
    "objectId": 0,
    "value": "true",
    "object": "0_userdata.0.test4",
    "trigger": "TimeTrigger",
    "astroTime": "unknown",
    "shift": 0,
    "date": 0,
    "hour": 20,
    "minute": 48,
    "weekdays": [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        0
      ]
    ],
    "time": 1729622880040
  },
  {
    "setObjectId": "0_userdata.0.test4",
    "objectId": 0,
    "value": "true",
    "object": "0_userdata.0.test4",
    "astroTime": "unknown",
    "shift": 0,
    "date": 0,
    "hour": 20,
    "minute": 47,
    "weekdays": [
      [
        1,
        2,
        3,
        4,
        5,
        6,
        0
      ]
    ],
    "time": 1729622820071
  }
]
```

# Пример представления виджета в формате JSON
[Краткое содержание](#zusammenfassung)

```json
{
    "vis-2.0": {
        "main": {
            "w000004": {
                "prefix": "main", // Projekt
                "namespace": "vis-2.0", // VIS
                "view": "default", // View
                "widgetId": "w000004", // Widget ID
                "newId": "schedule-switcher.0.onoff.3.data" // Objekt ID
            }
        }
    },
    "vis.0": {
        "main": {
            "w00001": {
                "prefix": "main",
                "namespace": "vis.0",
                "view": "Rollo",
                "widgetId": "w00001",
                "newId": "schedule-switcher.0.onoff.3.data"
            }
        }
    }
}
```

### Создать виджет
[Краткое содержание](#zusammenfassung)

- Вставить виджет в представление

![create_widget.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget.png)

- Выберите идентификатор для схематических данных.
- Выберите идентификатор активации расписания.
- Выберите идентификатор переключаемого состояния (максимум 10)

![create_widget_stateid.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_stateid.png)

- Определить тип значения и значения, которые следует установить

![create_widget_stateid_1.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_stateid_1.png)

- Теперь создадим принципиальную схему.

![create_widget_select.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select.png)

### Изменить имя
[Краткое содержание](#zusammenfassung)

- Изменить имя - Также принято в объектах

![create_widget_name.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_name.png)

### Добавить условие
[Краткое содержание](#zusammenfassung)

- Установите условие.

![create_widget_select_condition.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_condition.png)

### Заменить текст
[Краткое содержание](#zusammenfassung)

- Изменение текста вкл/выкл и все вкл/выкл

![create_widget_rename_1.png](img/create_widget_rename_1.png) ![create_widget_rename_2.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_rename_2.png)

### Применить CSS [Описание см. css](#css)
[Краткое содержание](#zusammenfassung)

– Используйте «Включить CSS», чтобы настроить стиль.</br>

![create_widget_css.png](img/create_widget_css.png)</br> ![create_widget_css_1.png](img/create_widget_css_1.png)</br> ![create_widget_css_2.png](img/create_widget_css_2.png)</br> ![create_widget_css_3.png](img/create_widget_css_3.png)</br> ![widget_switched.png](img/widget_switched.png)</br> ![widget_manual.png](img/widget_manual.png) </br> ![widget_astro_icon.png](img/widget_astro_icon.pngg)</br> ![widget_condition_1.png](img/widget_condition_1.png)</br> ![widget_condition_2.png](../../../de/adapterref/iobroker.schedule-switcher/img/widget_condition_2.png)

### Триггеры
[Краткое содержание](#zusammenfassung)

- Нажмите на ручку, чтобы ввести время, или нажмите на мусорную корзину, чтобы удалить триггер.

![create_widget_select_time.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_time.png)

- Выберите состояние переключения
- Выберите условие (необязательно)
- Введите время (чч:мм)

```:warning:
 ⚠ Zeigt in Firefox kein Uhrzeit-Feld an!
```

![create_widget_select_time_add_1.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_time_add_1.png)

- Выберите день недели
- Нажмите «Сохранить» вверху справа.

![create_widget_select_time_add_2.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_time_add_2.png)

-   Полный

![create_widget_select_time_done.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_time_done.png)

### Астротриггеры
[Краткое содержание](#zusammenfassung)

- Нажмите на ручку, чтобы выбрать астрономическое время, или нажмите на мусорную корзину, чтобы удалить триггер.

![create_widget_select_astro.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_astro.png)

- Выберите состояние переключения
- Выберите условие (необязательно)
- Выберите астрономическое время (восход солнца, закат или полдень)

![create_widget_select_astro_add_1.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_astro_add_1.png)

- Введите смещение в минутах (необязательно)
- Выберите день недели
- Нажмите «Сохранить» вверху справа.

![create_widget_select_astro_add_2.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_astro_add_2.png)

-   Полный

![create_widget_select_astro_done.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_astro_done.png)

### Одноразовый триггер
[Краткое содержание](#zusammenfassung)

- Выберите состояние переключения
- Выберите условие (необязательно)
- Введите время (чч:мм:сс)
- Нажмите «Сохранить» вверху справа.

![create_widget_select_onetime.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_onetime.png)

-   Полный

![create_widget_select_onetime_done.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_onetime_done.png)

- Выберите состояние переключения
- Выберите условие (необязательно)
- Введите/выберите время (дд.мм.гггг чч:мм:сс)
- Нажмите «Сохранить» вверху справа.

```:warning:
 ⚠ Zeigt in Firefox kein Uhrzeit-Feld an!
```

![create_widget_select_onetime_date.png](img/create_widget_select_onetime_date.png)</br> ![create_widget_select_onetime_date_calendar.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_onetime_date_calendar.png)

-   Полный

![create_widget_select_onetime_date_done.png](../../../de/adapterref/iobroker.schedule-switcher/img/create_widget_select_onetime_date_done.png)

### HTML для VIS и VIS-2
[Краткое содержание](#zusammenfassung)

- `html.background_color_body` Цвет фона тела. В комплекте с ВИС и только виджет с ВИС-2 - стандарт #000000
- `html.background_color_even` четное число триггера цвета фона - по умолчанию #1E1E1E
- `html.background_color_odd` триггер цвета фона с нечетным номером - по умолчанию #18171C
- Объект триггера цвета фона `html.background_color_trigger` — по умолчанию #000000
- Цвет фона `html.background_color_weekdays_hover` при наведении курсора на дни недели – нажмите, чтобы активировать/деактивировать – по умолчанию синий
- `html.column_align_01` Столбец выравнивания текста заголовка 1 – по центру по умолчанию.
- `html.column_align_02` Столбец выравнивания текста заголовка 2 — по центру по умолчанию.
- `html.column_align_03` Столбец выравнивания текста заголовка 3 – по центру по умолчанию.
- `html.column_align_04` Столбец выравнивания текста заголовка 4 – по центру по умолчанию.
- `html.column_align_05` Столбец выравнивания текста заголовка 5 – по центру по умолчанию.
- `html.column_align_06` Столбец выравнивания текста заголовка 6 – по центру по умолчанию.
- `html.column_align_07` Столбец выравнивания текста заголовка 7 – по центру по умолчанию.
- `html.column_align_08` Столбец выравнивания текста заголовка 8 – по центру по умолчанию.
- `html.column_align_09` Столбец выравнивания текста заголовка 9 – по центру по умолчанию.
- `html.column_align_10` Столбец выравнивания текста заголовка 10 – по центру по умолчанию.
- `html.column_text_01` Столбец текста заголовка 1 – стандартное расписание.
- `html.column_text_02` Столбец текста заголовка 2 — Стандартные устройства
- `html.column_text_03` текстовый столбец заголовка 3 - стандартный переключатель
- `html.column_text_04` текстовый столбец заголовка 4 - по умолчанию понедельник
- `html.column_text_05` текстовый столбец заголовка 5 - по умолчанию Tu
- `html.column_text_06` Столбец текста заголовка 6 – по умолчанию We
- `html.column_text_07` Столбец текста заголовка 7 – значение по умолчанию
- `html.column_text_08` текстовый столбец заголовка 8 - по умолчанию Fr
- `html.column_text_09` текстовый столбец заголовка 9 - стандартный суббота
- `html.column_text_10` Столбец текста заголовка 10 – по умолчанию Su
- `html.column_width_01` ширина столбца 1 – по умолчанию автоматически
- `html.column_width_02` ширина столбца 2 – по умолчанию автоматически
- `html.column_width_03` ширина столбца 3 – по умолчанию автоматически
- `html.column_width_04` ширина столбца 4 – по умолчанию автоматически
- `html.column_width_05` ширина столбца 5 – по умолчанию автоматически
- `html.column_width_06` ширина столбца 6 – по умолчанию автоматически
- `html.column_width_07` ширина столбца 7 – по умолчанию автоматически
- `html.column_width_08` ширина столбца 8 – по умолчанию автоматически
- `html.column_width_09` ширина столбца 9 – по умолчанию автоматически
- `html.column_width_70` ширина столбца 10 – по умолчанию автоматически
- `html.font_color_text_disabled` Цвет текста отключенного объекта – по умолчанию красный.
- `html.font_color_text_enabled` Цвет текста активированного объекта — желтый по умолчанию.
- `html.font_color_weekdays_disabled` Цвет текста отключенных дней недели — по умолчанию красный.
- `html.font_color_weekdays_enabled` Цвет текста включенных дней недели — желтый по умолчанию
- поле заголовка `html.header_border` в пикселях – по умолчанию 2
- `html.header_font_family` Семейство шрифтов заголовка – стандартный Helvetica
- Размер шрифта заголовка `html.header_font_size` — по умолчанию 15
- `html.header_linear_color_1` фоновое изображение головы: линейный градиент 1 — по умолчанию #BDBDBD
- `html.header_linear_color_2` фоновое изображение головы: линейный градиент 2 — по умолчанию #BDBDBD
- `html.header_tag_border_color` HTML-тег заголовка`<td> `Цвет границы — по умолчанию #424242.
- ТЕГ заголовка `html.header_width`<table> ` Стандартный размер авто
- `html.column_align_row_01` Выравнивание текста строк в столбце 1 — по умолчанию слева
- `html.column_align_row_02` Выравнивание текста строк в столбце 2 — по умолчанию слева
- `html.column_align_row_03` Выравнивание текста строк в столбце 3 – по умолчанию слева
- `html.column_align_row_04` Выравнивание текста строк в столбце 4 — по умолчанию слева
- `html.column_align_row_05` Выравнивание текста строк в столбце 5 – по умолчанию слева
- `html.column_align_row_06` Выравнивание текста строк в столбце 6 – по умолчанию по левому краю.
- `html.column_align_row_07` Выравнивание текста строк в столбце 7 – по умолчанию по левому краю.
- `html.column_align_row_08` Выравнивание текста строк в столбце 8 – по умолчанию слева
- `html.column_align_row_09` Выравнивание текста строк в столбце 9 — по умолчанию слева
- `html.column_align_row_10` Выравнивание текста строк в столбце 10 – по умолчанию по левому краю.
- Цвет шрифта заголовка `html.headline_color` (расписание, устройство...) - по умолчанию #ffffff
- Размер шрифта заголовка `html.headline_font_size` в пикселях – по умолчанию 16
- Высота строки заголовка `html.headline_height` в пикселях – по умолчанию 35
- `html.headline_underlined` нижнее поле заголовка в пикселях – по умолчанию 3
- `html.headline_underlined_color` цвет нижней границы заголовка - по умолчанию #ffffff
- толщина шрифта заголовка `html.headline_weight` — по умолчанию нормальная
- `html.html_code` HTML-код для VIS, VIS-2, Jarvis, IQontrol и т. д.
- `html.icon_false` Состояние отключения значка - стандарт ⚪
- `html.icon_switch_symbol` Переключатель значков для активации/деактивации таймера – по умолчанию ⏱
- `html.icon_true` Состояние включения значка - стандартное 🟡
- `html.jarvis` Совместимо с Jarvis - по умолчанию false
- `html.p_tag_text_algin` HTML `<p> ` Выравнивание текста (последнее обновление и нижний колонтитул) — по умолчанию по центру
- `html.table_tag_border_color` Цвет границы из TAG `<table> ` - № по умолчанию 424242
- `html.table_tag_cell` Ограничить расстояние от TAG `<table> ` в пикселях — по умолчанию 6
- `html.table_tag_text_align` Выравнивание текста по TAG `<table> ` - Центр по умолчанию
- `html.table_tag_width` Размер тега `<table> ` - Авто по умолчанию
- `html.td_tag_border_bottom` Нижняя граница TAG `<td> ` в пикселях — по умолчанию 1
- `html.td_tag_border_color` Цвет нижней границы TAG `<td> ` - № по умолчанию 424242
- `html.td_tag_border_right` Граница справа от TAG `<td> ` в пикселях — по умолчанию 1
- `html.td_tag_cell` пространство вокруг текста TAG `<td> `в пикселях (отступы) – по умолчанию 6
- Семейство шрифтов верхнего и нижнего колонтитула `html.top_font_family` — стандартный Helvetica
- Размер шрифта верхнего и нижнего колонтитула `html.top_font_size` в пикселях – по умолчанию 20
- `html.top_font_weight` толщина шрифта верхнего и нижнего колонтитула - по умолчанию нормальная"
- `html.top_text` Собственный текст для заголовка. Ваш текст по умолчанию.
- Цвет шрифта верхнего и нижнего колонтитула `html.top_text_color` — по умолчанию #ffffff.
- `html.update` Запустить обновление вручную.

![vis_object_1.png](../../../de/adapterref/iobroker.schedule-switcher/img/vis_object_1.png)

– Создайте виджет HTML и введите объект `{schedule-switcher.0.html.html_code}` в разделе HTML.
- Нажмите на текст «Последнее обновление», чтобы выполнить обновление вручную.
- Нажмите на иконку, чтобы активировать/деактивировать виджет
- Чтобы удалить триггер, сначала необходимо отметить его галочкой, а затем нажать кнопку «Удалить».
- Измените время/Астрономию и нажмите кнопку «Сохранить», чтобы применить изменения.
- Нажмите на день недели, чтобы активировать/деактивировать его.

![vis_view_1.png](img/vis_view_1.png)</br> ![vis_view_2.png](../../../de/adapterref/iobroker.schedule-switcher/img/vis_view_2.png)

### Функция ТОЛЬКО для ВИС-2!!!
[Краткое содержание](#zusammenfassung)

К сожалению, ТОЛЬКО с VIS-2 перечисленные ниже функции необходимо вставлять вручную (см. рисунки).

![vis2_object.png](img/vis2_object.png)</br> ![vis2_script.png](../../../de/adapterref/iobroker.schedule-switcher/img/vis2_script.png)

```java
function deleteTrigger(stateId, command, id, dataid, count) {
    var checked = document.getElementById('delete' + count).checked;
    if (checked) {
        var data = {
			"command": command,
			"message": {
				"triggerId": id,
				"dataId": dataid,
			}
		};
		vis.conn.setState(stateId + '.sendto', { val: JSON.stringify(data), ack: false });
	}
}
function changeweekdays(stateId, command, dataid, id, changeid, type) {
    if (type === "OneTimeTrigger") return;
    var data = {
		"command": command,
		"message": {
			"changeid": changeid,
			"triggerid": id,
			"dataid": dataid
		}
    };
	vis.conn.setState(stateId + '.sendto', { val: JSON.stringify(data), ack: false });
}
function updateTrigger(stateId) {
	vis.conn.setState(stateId + '.html.update', { val: true, ack: false });
}
function setState(stateId, value) {
	vis.conn.setState(stateId, { val: value == 'false' ? false : true, ack: false });
}
function sendToAstro(stateId, command, dataid, id, count) {
    var timeselect = document.getElementById('timeselect' + count).value;
    var shift = document.getElementById('shift' + count).value;
    var data = {
		"command": command,
		"message": {
			"astrotime": timeselect,
			"shift": shift,
			"triggerid": id,
			"dataid": dataid
		}
    };
	vis.conn.setState(stateId + '.sendto', { val: JSON.stringify(data), ack: false });
}
function sendToDateTime(stateId, command, id, dataid, count) {
    var value = document.getElementById('datetime' + count).value;
    var data = {
		"command": command,
		"message": {
			"time": value,
			"triggerid": id,
			"dataid": dataid
		}
    };
	vis.conn.setState(stateId + '.sendto', { val: JSON.stringify(data), ack: false });
}
function sendToTime(stateId, command, id, dataid, count) {
    var value = document.getElementById('nexttime' + count).value;
    var data = {
		"command": command,
		"message": {
			"time": value,
			"triggerid": id,
			"dataid": dataid
		}
    };
	vis.conn.setState(stateId + '.sendto', { val: JSON.stringify(data), ack: false });
}
```

### CSS
[Краткое содержание](#zusammenfassung)

```
app-on-off-schedules-widget {
    /* Primary color (button background, toggle switch color) */
    --ts-widget-primary-color: #337ab7;

    /* Background color of the widget */
    --ts-widget-bg-color: #424242;
    /* Background color of the triggers */
    --ts-widget-trigger-bg-color: #272727;

    /* Foreground color (font color and scrollbar color) */
    --ts-widget-fg-color: white;
    /* Font color of the switched states id */
    --ts-widget-oid-fg-color: #a5a5a5;
    /* Font color in buttons */
    --ts-widget-btn-fg-color: white;
    /* Font color of a disabled weekday */
    --ts-widget-weekdays-disabled-fg-color: #5D5D5D;
    /* Font color of an enabled weekday */
    --ts-widget-weekdays-enabled-fg-color: white;
    /* Font color of the name of the widget (defaults to --ts-widget-fg-color) */
    --ts-widget-name-fg-color: white;
    /* Font color of switched time (defaults to --ts-widget-fg-color) */
    --ts-widget-switched-time-fg-color: white;
    /* Font color of switched value (defaults to --ts-widget-fg-color)*/
    --ts-widget-switched-value-fg-color: white;
    /* Font color of the astro time (defaults to --ts-widget-fg-color) */
    --ts-widget-astro-time-fg-color: black;
    /* Font color of the astro time's shift */
    --ts-widget-astro-shift-fg-color: #5d5d5d;
    /* Font color of condition (defaults to --ts-widget-fg-color) */
    --ts-widget-condition-fg-color: white;
    /* Font color of toogle button off */
    --ts-widget-off-color: #c0c0c0;
    /* Color background toogle button off */
    --ts-widget-off-color-container: #808080;
    /* Color of next astro switching time */
    --ts-widget-astro-next-fg-color: white;

    /* Font family used in the whole widget */
    --ts-widget-font-family: 'Roboto', 'Segoe UI', BlinkMacSystemFont, system-ui, -apple-system;
    /* Font size of the name of the widget */
    --ts-widget-name-font-size: 2em;
    /* Font size of the switched oid */
    --ts-widget-oid-font-size: 30px;
    /* Font size of switch text */
    --ts-widget-state-action-width: 65px;
    /* Font size of next astro switching time */
    --ts-widget-astro-next-font-size: 2em;
    /* Width of date time input */
    --ts-widget-datetime-width: 230px;

    /* Display of edit name button. Use 'none' to hide the button and 'block' to show it
    --ts-widget-edit-name-button-display: block;
    /* Display of condition. Use 'none' to hide the condition and 'block' to show it
    -ts-widget-condition-display: block;
    /* Display of time icon. Use 'none' to hide the button and 'block' to show it
    --ts-widget-time-icon-display: none;

    /* Applies a filter to icons used in buttons (safe, edit, remove, cancel), for
       white use invert(1) and for black invert(0) */
    --ts-widget-img-btn-filter: invert(1);

    /* Add trigger dropdown background color */
    --ts-widget-add-trigger-dropdown-bg-color: #f1f1f1;
    /* Add trigger dropdown font color */
    --ts-widget-add-trigger-dropdown-fg-color: black;
    /* Add trigger dropdown hover background color */
    --ts-widget-add-trigger-dropdown-hover-bg-color: #ddd;

    /* ! Changing these may break the layout, change at your own risk */

    /* Font size of weekdays */
    --ts-widget-weekdays-font-size: 23px;
    /* Font size of switched value (on/off) */
    --ts-widget-switched-value-font-size: 2em;
    /* Font size of switched time */
    --ts-widget-switched-time-font-size: 2em;
    /* Font size of the astro time (e.g. Sunrise, ...) */
    --ts-widget-astro-time-font-size: 1.5em;
    /* Font size of the astro time's shift */
    --ts-widget-astro-shift-font-size: 1em;
    /* Font size of condition */
    --ts-widget-condition-font-size: 1em;
}
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   (Lucky_ESA) HTML overview added

### 0.0.6 (2024-11-16)

-   (Lucky_ESA) Put value of state correctly
-   (Lucky_ESA) Added next triggers as JSON
-   (Lucky_ESA) Added counter trigger
-   (Lucky_ESA) Updating astro time fixed

### 0.0.5 (2024-11-06)

-   (Lucky_ESA) Crash when updating astro time fixed
-   (Lucky_ESA) Fixed some bugs

### 0.0.4 (2024-11-04)

-   (Lucky_ESA) Temporary function removed
-   (Lucky_ESA) Creation of objects adjusted
-   (Lucky_ESA) Validation check of the states
-   (Lucky_ESA) Validation check for 2 widgets with one object

### 0.0.3 (2024-10-30)

-   (Lucky_ESA) Fixed VIS translate
-   (Lucky_ESA) Added astro time in trigger
-   (Lucky_ESA) Fixed OneTimeTrigger
-   (Lucky_ESA) Added date for OneTimeTrigger
-   (Lucky_ESA) Fixed some bugs

### 0.0.2 (2024-10-22)

-   (Lucky_ESA) Fix translate
-   (Lucky_ESA) Fix background color disable Weekdays
-   (Lucky_ESA) Fix sendTo
-   (Lucky_ESA) Added jsonConfig
-   (Lucky_ESA) Added history

### 0.0.1 (2024-10-19)

-   (Lucky_ESA) initial release

## License

MIT License

Copyright (c) 2024 Lucky_ESA <github@luckyskills.de>

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