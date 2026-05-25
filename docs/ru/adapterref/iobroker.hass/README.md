---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hass/README.md
title: ioBroker.hass
hash: M+nm+izoaISjlBc/GvVPcDabI3Tm57D4yI8ZBmSYd5I=
---
![Логотип](../../../en/adapterref/iobroker.hass/admin/hass.png)

![Количество установок](http://iobroker.live/badges/hass-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hass.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hass.svg)

# IoBroker.hass
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.hass/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/hass/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

Этот адаптер позволяет подключить Home Assistant к ioBroker.

## Использование
Создайте долгосрочный токен в HASS и используйте его в качестве пароля (скопируйте его также в поле повтора).

Затем система должна считать все атрибуты для всех устройств. Службы могут быть управляемыми (например, "turn_on"). Для управления службами у вас есть два варианта:

### Установить прямое значение
Установите для состояния значение ack=false, которое не является строкой (например, логическое значение true), тогда оно будет активировано и в HASS без дополнительных данных сервиса. Это будет работать только в том случае, если у сервиса есть одно поле для отправки — тогда значение будет отправлено как это поле! Если у сервиса более одного поля, вы найдете предупреждение в журнале, содержащее более подробную информацию о полях, которые могут быть отправлены, например,

```
Please make sure to provide a stringified JSON as value to set relevant fields! Please refer to the Readme for details!
Allowed field keys are: temperature, target_temp_high, target_temp_low, hvac_mode
```

### Задайте JSON-данные в строковом формате для предоставления одного или нескольких полей
Установите состояние с помощью строкового значения ack=false, представляющего собой строковый JSON-объект, который будет использоваться для вызова сервиса и в качестве данных сервиса.

Для последнего варианта в light.turn_off, например, с `{"transition":10,"flash":"short"}`, эти две детали сервисных данных отправляются вместе с вызовом HASS. Доступные поля с их точным определением данных можно увидеть в JSON-определении объекта ioBroker в разделе полей `native`, и в приведенном выше примере это будет выглядеть следующим образом:

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

Для некоторых сервисов, таких как set_speed, требуется передавать JSON-объект, например, `{speed: "high"}`, для указания необходимых значений. В этом случае определение поля выглядит, например, так:

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

Пожалуйста, проверьте это: https://www.smarthomejetzt.de/mit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen/

**К сожалению, только на немецком языке, но [Google Переводчик работает довольно хорошо.](https://translate.google.com/translate?hl=en&sl=de&tl=en&u=https%3A%2F%2Fwww.smarthomejetzt.de%2Fmit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen%2F)**

## Фильтр исключения сущностей
При желании можно ограничить список объектов Home Assistant, синхронизируемых с ioBroker.

Каждая непустая строка, не содержащая комментариев, в поле **Исключить шаблоны** представляет собой шаблон (только `*` является подстановочным знаком и соответствует любой последовательности символов, включая `.`).
Сопоставление шаблонов осуществляется с учетом регистра по отношению к полному `entity_id` (например,
`switch.living_room`). Сущность, соответствующая любому шаблону, это:

- Пропускается при создании или обновлении объектов (начальная синхронизация и повторная синхронизация)
- игнорируется при изменении состояния в HASS (в ioBroker не запускаются операции записи состояния).

Строки, начинающиеся с `#`, рассматриваются как комментарии.

Примеры:

```
# Drop every entity whose name starts with `iob_`, regardless of domain:
*.iob_*

# Drop sensors only:
sensor.iob_*
```

Установите флажок **Подробное логирование фильтра**, чтобы при первой синхронизации регистрировать каждое исключенное `entity_id` по отдельности (требуется уровень логирования адаптера `info` или `debug`). При последующих повторных синхронизациях будет выводиться только суммарное количество, чтобы журнал оставался чистым.

Пустой список шаблонов оставляет поведение адаптера идентичным предыдущим версиям.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
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

### 1.3.0 (2022-07-01)
* (Apollon77) Further optimize sending data to HASS and allow setting values like numbers as normal states if the service has one attribute and it can be mapped

## License
The MIT License (MIT)

Copyright (c) 2018-2026 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.