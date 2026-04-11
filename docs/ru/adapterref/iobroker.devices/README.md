---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.devices/README.md
title: ioBroker.devices
hash: g74lUY4Rg6o5il6Prtz1MtTUYQbwszxqKGBRra9rHHo=
---
![Логотип](../../../en/adapterref/iobroker.devices/admin/devices.svg)

![Количество установок](http://iobroker.live/badges/devices-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.devices.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.devices.svg)

# IoBroker.devices
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Адаптер устройства для ioBroker
Управляйте и создавайте устройства для использования в других адаптерах, таких как Material, IoT, Matter...

**Важно: включите вкладки в админке, такие как «Журнал» и «Скрипты».**

![Экран](../../../en/adapterref/iobroker.devices/img/screen.png)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Руководство пользователя адаптера ioBroker.devices
### Обзор
Адаптер `ioBroker.devices` является компонентом платформы умного дома ioBroker, предназначенным для упрощения управления устройствами путем создания и управления виртуальными устройствами.

Эти виртуальные устройства предоставляют стандартизированный интерфейс для физических устройств, упрощая интеграцию, создание сценариев, визуализацию и управление устройствами разных производителей и протоколов.

Адаптер обеспечивает единообразие в именовании и структуре точек данных, уменьшая необходимость в изменении скриптов или визуализаций при изменении оборудования.

Он преобразует любой набор состояний в ioBroker (физических **или** виртуальных) в корректно сформированные **устройства** с богатой информацией:

* `type`, `role`, `smartName`, `color`, `room`, `function`, `icon`, `unit` и многое другое

Полученные данные используются панелями мониторинга (Material UI, VIS-2), голосовыми помощниками (Alexa/Google), адаптером Material, адаптером **iot/cloud** и скриптами, обеспечивая чистое, перспективное дерево объектов.

**Примечание:** Адаптер **не** опрашивает оборудование. Он работает как веб-версия только в виде вкладок → не потребляет ресурсы ЦП/ОЗУ.

### Цель
Адаптер `ioBroker.devices` служит следующим целям:

- Стандартизация: Создает виртуальные устройства с согласованной структурой точек данных, независимо от базового оборудования или протокола, используемого для разных точек данных.
- Упрощенное обслуживание: позволяет пользователям заменять физические устройства без обновления скриптов или визуализаций путем переназначения точек данных в адаптере.
- Улучшенная совместимость: бесшовная интеграция с адаптерами визуализации (например, Material UI, VIS) и адаптерами IoT (например, Alexa, Google Home).
- Удобный интерфейс: упрощает управление устройством для начинающих пользователей, обеспечивая при этом гибкость для опытных пользователей.

#### Стандартизация
Многие адаптеры, такие как MQTT, KNX или аналогичные, предоставляют точки данных с различными именами и структурами. Этот адаптер создает виртуальное устройство с согласованной структурой, что упрощает управление и визуализацию устройств.
Он автоматически добавляет роли, единицы измерения и имена к состояниям.

#### Упрощенное техническое обслуживание
Адаптер `ioBroker.devices` позволяет пользователям создавать виртуальные устройства, которые можно легко переназначать на другие физические устройства.
Это означает, что если вы меняете физическое устройство, вам не нужно обновлять скрипты, визуализации или настройки истории; вам просто нужно переназначить точки данных в адаптере.

#### Расширенная совместимость
Адаптер знает, как должны выглядеть устройства и как ими пользоваться. Он создает виртуальное устройство с той же структурой, что и физическое устройство, что упрощает интеграцию с другими адаптерами.

#### Удобный
Адаптер `ioBroker.devices` разработан с учетом удобства использования, что делает его доступным для начинающих, одновременно предлагая расширенные функции для опытных пользователей. Интуитивно понятный интерфейс позволяет пользователям создавать и управлять виртуальными устройствами без необходимости глубоких технических знаний.

## Конфигурация
После установки настройте адаптер на вкладке «Устройства» в административном интерфейсе ioBroker.

### Создание виртуального устройства
Откройте вкладку «Устройства» в панели администратора.

#### Добавить устройство
— Нажмите кнопку «+», чтобы создать новое виртуальное устройство.
— Введите название для устройства (например, «LivingRoomLight»).
— Выберите тип устройства (например, светильник, выключатель, термостат) из предопределенного списка.
— При желании можно присвоить организации категорию (например, освещение, отопление).

Точки данных на карте:

Для каждой функции (например, включение/выключение, яркость) сопоставьте точку данных виртуального устройства с соответствующим состоянием физического устройства (например, `hm-rpc.0.12345.1.STATE` для выключателя Homematic).

Используйте интерфейс для просмотра и выбора состояний из других адаптеров.

Сохранить: Нажмите «Сохранить», чтобы создать виртуальное устройство. Оно появится в разделе alias.0.<DeviceName> на вкладке «Объекты».

#### Типы устройств
Адаптер `ioBroker.devices` поддерживает три основных подхода к созданию устройств:

1. Устройства, обнаруженные автоматически

Некоторые адаптеры (например, ioBroker.zigbee, ioBroker.hm-rpc) уже предоставляют допустимую структуру для устройств, и они будут обнаружены автоматически, **если им присвоена какая-либо категория (функция или помещение)**.
Без присвоенной категории автоматически обнаруженное устройство не будет обработано.

2. Связанные устройства

Связанные устройства — это виртуальные устройства, созданные вручную для зеркального отображения точек данных конкретного физического устройства с помощью `ioBroker.linkeddevices`.

Рекомендуется использовать ветви `ioBroker.devices` и `alias.0` вместо `linkeddevices`.

3. Псевдонимы

Псевдонимы — это легковесные виртуальные устройства, которые служат в качестве ярлыков или упрощенных ссылок на существующие состояния, не создавая при этом полноценную структуру устройства.

Вы можете создать новое виртуальное устройство в ветке `alias.0`. Выбрав тип устройства, необходимо заполнить все обязательные состояния (отмеченные *). При желании можно добавить необязательные состояния (например, влажность по датчику температуры).
Для каждого обязательного состояния и заполненного необязательного состояния адаптер создает структуру псевдонимов.
Если вы создали, например, устройство измерения температуры с именем `Temperature` и указали оба состояния (температуру и влажность), то в ветке `alias.0` вы найдете следующие состояния и канал:

- `alias.0.Temperature` - канал
- `alias.0.Temperature.temperature` - состояние с единицей измерения '°C'. Оно должно иметь виртуальную связь с некоторым реальным состоянием с температурой. Если удалить псевдоним в адаптере `ioBroker.devices`, это состояние останется без связи.
- `alias.0.Temperature.humidity` - состояние с единицей измерения '%'. Оно будет иметь виртуальную связь с реальным состоянием (например, с `hm-rpc.0.JHAGHGJJJ.1.HUMIDITY`). Если удалить псевдоним в адаптере `ioBroker.devices`, это состояние будет удалено.

Практически каждый тип устройства может иметь дополнительные состояния (индикаторы) для батареи, подключения, ошибки и некоторых других параметров. Они являются необязательными, но некоторые адаптеры (например, `material` или `matter`) могут их интерпретировать.

Для каждого состояния можно указать все параметры, поддерживаемые псевдонимами:

— Различные состояния для чтения и записи
- Преобразование формулы для чтения и записи

#### Управление устройствами
Редактирование устройства: На вкладке «Устройства» щелкните значок карандаша рядом с устройством, чтобы изменить его имя, тип, категорию, цвет, значок или сопоставление точек данных.

Удаление устройства: Нажмите на значок корзины, чтобы удалить виртуальное устройство. Это не повлияет на физическое устройство или его адаптер.

Организация устройств: используйте категории для группировки устройств (например, «Освещение», «Отопление») для упрощения управления в визуализациях.

## Типы устройств
Этот адаптер создан с помощью `type-detector`. Все возможные устройства можно найти в [здесь](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md)

## Видео
[![Видео](https://img.youtube.com/vi/0Aecm5YAk7M/0.jpg)](https://www.youtube.com/watch?v=0Aecm5YAk7M)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.7 (2026-04-09)
* (@GermanBluefox) Added new widgets

### 2.0.6 (2026-03-31)
* (@GermanBluefox) Corrected the layout for visualisation

### 2.0.5 (2026-03-26)
* (@GermanBluefox) Added many new widgets.

### 2.0.3 (2026-03-24)
* (@GermanBluefox) Added widgets' visualisation. Now it is possible to create a GUI within the adapter

### 1.2.14 (2026-02-06)
* (@GermanBluefox) Correcting the scrolling on the touch devices
* (@GermanBluefox) Fixing a problem with `ACTUAL` state
* (@GermanBluefox) Correcting the hover effect under safari

### 1.2.12 (2026-02-04)
* (@GermanBluefox) Show in color if fx is not empty
* (@GermanBluefox) Added for all text fields the clear button

### 1.2.9 (2025-09-08)
* (@GermanBluefox) Created for newly created states of devices the full name and not just last part, like `ACTUAL`

### 1.2.8 (2025-07-21)
* (@GermanBluefox) Corrected error in GUI

### 1.2.7 (2025-06-14)
* (@GermanBluefox) Replaced icon for the state import
* (@GermanBluefox) Corrected the edit dialog

### 1.2.6 (2025-04-29)
* (@GermanBluefox) Type-detector updated
* (@GermanBluefox) Execute the conversion formula on the current value
* (@GermanBluefox) Better categories selector
* (@GermanBluefox) Corrected device importer

### 1.2.4 (2025-04-27)
* (@GermanBluefox) Corrected many GUI issues

### 1.2.1 (2025-04-22)
* (@GermanBluefox) Updated logo
* (@GermanBluefox) Updated type-detector

### 1.2.0 (2025-04-20)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Used vite
* (@GermanBluefox) Used eslint-config of ioBroker
* (@GermanBluefox) Rewritten to TypeScript and corrected all known bugs (Except extension requests)

### 1.1.5 (2023-06-06)
* (Garfonso) fixed: problem with editing imported states
* (Garfonso) fixed: warning
* (Garfonso) fixed: enabling iot again (without setting a custom smartName)
* (Garfonso) fixed: possible crash / typo in 1.1.3.

### 1.1.4 (2023-06-06)
* (bluefox) Updated packages

### 1.1.3 (2023-05-16)
* (bluefox) Better behavior of category selection

### 1.1.2 (2022-11-09)
* (Garfonso) corrected the double states in light devices
* (Garfonso) added CIE color type as equivalent to `rgbSingle` type

### 1.1.1 (2022-11-03)
* (bluefox) Corrected delete dialog
* (bluefox) Added ukrainian translation

### 1.1.0 (2022-09-27)
* (bluefox) Migrated GUI to v5

### 1.0.12 (2022-06-09)
* (bluefox) Allowed to work with devices behind reverse proxy
* (bluefox) Replaced the function icon

### 1.0.11 (2022-06-08)
* (bluefox) Updated some libraries

### 1.0.10 (2022-02-13)
* (bluefox) Corrected edit of folders
* (bluefox) Updated some libraries

### 1.0.9 (2021-07-11)
* (bluefox) Implement the narrow rows

### 1.0.8 (2021-07-04)
* (bluefox) Corrected creation of the devices

### 1.0.7 (2021-06-30)
* (bluefox) Corrected creation the folders

### 1.0.6 (2021-06-27)
* (bluefox) Implemented the filters

### 1.0.5 (2021-06-26)
* (bluefox) Implemented the edit of `states` parameter

### 1.0.4 (2021-06-08)
* (bluefox) Fixed some GUI errors

### 1.0.1 (2021-06-07)
* (bluefox) Added sentry

### 1.0.0 (2021-06-07)
* (bluefox) Added new devices

### 0.3.16 (2021-03-11)
* (bluefox) Fixed the error for IDs with the strange characters

### 0.3.15 (2020-12-13)
* (bluefox) Updated the select ID dialog

### 0.3.13 (2020-08-17)
* (bluefox) Fixed errors by optional states

### 0.3.12 (2020-08-16)
* (bluefox) added the vacuum cleaner

### 0.3.10 (2020-08-12)
* (bluefox) added the air conditioner

### 0.3.6 (2020-04-17)
* (Apollon77) Added Sentry error reporting for Frontend/React

### 0.3.5 (2020-04-17)
* (Apollon77) Fixed typo

### 0.3.4 (2020-03-24)
* (bluefox) Fixed error by device creation

### 0.3.2 (2020-02-09)
* (Apollon77) usage with all kinds of admin ports and reverse proxies optimized

### 0.3.1 (2020-02-09)
* (Apollon77) compatibility with Admin >4.0.0 added

### 0.2.0 (2019-12-20)
* (bluefox) Backend was removed

### 0.1.8 (2019-11-13)
* (bluefox) Allowed the clone of devices

### 0.1.7 (2019-09-15)
* (bluefox) work in progress

### 0.1.2 (2019-09-04)
* (bluefox) work in progress

### 0.1.0 (2019-08-31)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2026 bluefox <dogafox@gmail.com>

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