---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hass/README.md
title: ioBroker.hass
hash: miH711nLAOxOLZP7MtUd6GLoOm4iN1J8JHPbulklyQU=
---
![Логотип](../../../en/adapterref/iobroker.hass/admin/hass.png)

![Количество установок](http://iobroker.live/badges/hass-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.hass.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hass.svg)

# IoBroker.hass
![Тестируйте и выпускайте](https://github.com/ioBroker/ioBroker.hass/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/hass/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Этот адаптер позволяет подключить Home Assistant к ioBroker.

## Применение
Создайте долгосрочный токен в HASS и используйте его в качестве PW (скопируйте его также в поле повтора).

Затем он должен считать все атрибуты для всех устройств. Службы могут быть управляемыми (например, «turn_on»). Для управления услугами у вас есть два варианта:

* Установите состояние со значением ack=false, которое не является строкой (например, Boolean true), тогда оно будет запущено также в HASS без дополнительных служебных данных
* Установите состояние со строковым значением ack=false, которое представляет собой строковый объект JSON для вызова службы и использования объекта JSON в качестве данных службы.

Для последней опции на light.turn_off, например. `{"transition":10,"flash":"short"}` эти две детали служебных данных отправляются вместе с вызовом HASS. Доступные поля с их определением данных можно увидеть в определении JSON объекта ioBroker в разделе native.fields, и в приведенном выше примере они будут выглядеть следующим образом:

`...
native: { "fields": { "transition": { "name": "Transition", "description": "Продолжительность перехода в следующее состояние.", "selector": { "number": { "min" : 0, "max": 300, "unit_of_measurement": "секунды" } } }, "flash": { "name": "Flash", "description": "Если свет должен мигать.", "advanced": true, "selector": { "select": { "options": [ "long", "short" ] } } } }, "entity_id": "light.mi_control_hub_light", "attr": "turn_off", "type ": "свет" } ...
`

Для некоторых служб, таких как set_speed, требуется вызов объекта JSON, такого как `{speed: "high"}`, в целом для предоставления требуемых значений. В этом случае определение поля выглядит, например. подобно:

```
...
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
        ...
    }
...
```

## Конфигурация
Есть хорошая статья про подключение.

Пожалуйста, проверьте это https://www.smarthomejetzt.de/mit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen/

**К сожалению, только на немецком, но [гугл переводчик работает неплохо](https://translate.google.com/translate?hl=en&sl=de&tl=en&u=https%3A%2F%2Fwww.smarthomejetzt.de%2Fmit-iobroker-auf-eine-home-assistant-hass-io-installation-und-die-geraete-zugreifen%2F)**

<!-- Заполнитель для следующей версии (в начале строки):

### __РАБОТА ВЫПОЛНЯЕТСЯ__ -->

## Changelog
### 1.1.0 (2022-03-24)
* IMPORTANT: You need to re-enter the password once after installing this version!
* (Apollon77) Implement Service triggers to use any value to trigger or stringified JSON to call with fields
* (Apollon77) Optimize unload handling
* (Apollon7) Add Sentry for crash reporting

### 1.0.1 (2021-09-04)
* IMPORTANT: js-controller 2.0 is needed st least!
* (Apollon77) Fix start issue
* (Apollon77/Garfonso) Fix issue where value could not be set in hass

### 1.0.0 (2020-12-13)
* (bluefox) added the support of compact mode

### 0.1.0
* (bluefox) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2022 bluefox <dogafox@gmail.com>

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