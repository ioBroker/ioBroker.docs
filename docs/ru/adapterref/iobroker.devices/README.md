---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.devices/README.md
title: ioBroker.устройства
hash: UrDkIXPAx9G5N4ogz6LNnhjSZ17KDCkY4mB+cokYESQ=
---
![Логотип](../../../en/adapterref/iobroker.devices/admin/devices.svg)

![Количество установок](http://iobroker.live/badges/devices-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.devices.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.devices.svg)

# IoBroker.устройства
![Тест и выпуск](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Адаптер устройств для ioBroker
Управляйте и создавайте устройства для использования их в других адаптерах, таких как материалы, интернет вещей, материя...

**Важно: включите вкладку в админке, например, журнал и скрипты**

![Экран](../../../en/adapterref/iobroker.devices/img/screen.png)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Руководство пользователя адаптера ioBroker.devices
### Обзор
Адаптер `ioBroker.devices` является компонентом платформы умного дома ioBroker, разработанным для упрощения управления устройствами путем создания и управления виртуальными устройствами.

Эти виртуальные устройства предоставляют стандартизированный интерфейс для физических устройств, упрощая интеграцию, создание сценариев, визуализацию и управление устройствами разных производителей и протоколов.

Адаптер обеспечивает единообразие наименований и структуры точек данных, что снижает необходимость в изменении скриптов или визуализаций при смене оборудования.

Он оборачивает любую коллекцию состояний в ioBroker (физическую **или** виртуальную) в правильно сформированные **устройства** с богатой информацией:

* `type`, `role`, `smartName`, `color`, `room`, `function`, `icon`, `unit` и многое другое

Результат используется панелями управления (Material UI, VIS‑2), голосовыми помощниками (Alexa/Google), адаптером Matter, адаптером **iot/cloud** и скриптами, предоставляя вам чистое, готовое к будущему дерево объектов.

**Примечание:** Адаптер **не** опрашивает оборудование. Он работает как экземпляр только для вкладки «веб» → нулевой след ЦП/ОЗУ.

### Цель
Адаптер `ioBroker.devices` служит следующим целям:

- Стандартизация: создает виртуальные устройства с согласованными структурами точек данных, независимо от базового оборудования или протокола из разных точек данных.
- Упрощенное обслуживание: позволяет пользователям заменять физические устройства без обновления скриптов или визуализаций путем переназначения точек данных в адаптере.
- Расширенная совместимость: легко интегрируется с адаптерами визуализации (например, Material UI, VIS), адаптерами IoT (например, Alexa, Google Home).
- Удобство использования: упрощает управление устройством для новичков и обеспечивает гибкость для опытных пользователей.

#### Стандартизация
Многие адаптеры, такие как mqtt, knx или аналогичные, предоставляют точки данных с разными именами и структурами. Этот адаптер создает виртуальное устройство с согласованной структурой, что упрощает управление и визуализацию устройств. Он автоматически добавляет роли, единицы и имена к состояниям.

#### Упрощенное обслуживание
Адаптер `ioBroker.devices` позволяет пользователям создавать виртуальные устройства, которые можно легко переназначить на другие физические устройства. Это означает, что если вы меняете физическое устройство, вам не нужно обновлять скрипты, визуализации или настройки истории; вам просто нужно переназначить точки данных в адаптере.

#### Улучшенная совместимость
Адаптер знает, как должны выглядеть устройства и как их использовать. Он создает виртуальное устройство с такой же структурой, как и физическое устройство, что упрощает интеграцию с другими адаптерами.

#### Удобный
Адаптер `ioBroker.devices` разработан так, чтобы быть удобным для пользователя, что делает его доступным для новичков, при этом предлагая расширенные функции для опытных пользователей. Интуитивно понятный интерфейс позволяет пользователям создавать и управлять виртуальными устройствами без необходимости в обширных технических знаниях.

## Конфигурация
После установки настройте адаптер через вкладку «Устройства» в интерфейсе администратора ioBroker.

### Создание виртуального устройства
Откройте вкладку «Устройства» в панели администратора.

#### Добавить устройство
- Нажмите кнопку «+», чтобы создать новое виртуальное устройство.
- Введите имя устройства (например, «LivingRoomLight»).
- Выберите тип устройства (например, свет, выключатель, термостат) из предопределенного списка.
- При желании можно назначить категорию (например, «Освещение», «Отопление») для организации.

Точки данных карты:

Для каждой функции (например, включение/выключение, яркость) сопоставьте точку данных виртуального устройства с соответствующим состоянием физического устройства (например, `hm-rpc.0.12345.1.STATE` для переключателя Homematic).

Используйте интерфейс для просмотра и выбора состояний из других адаптеров.

Сохранить: Нажмите «Сохранить», чтобы создать виртуальное устройство. Оно появится под псевдонимом alias.0.<DeviceName> на вкладке «Объекты».

#### Типы устройств
Адаптер `ioBroker.devices` поддерживает три основных подхода к созданию устройств:

1. Автоматически обнаруженные устройства

Некоторые адаптеры (например, ioBroker.zigbee, ioBroker.hm-rpc) уже предоставляют допустимую структуру для устройств, и они будут обнаружены автоматически **если назначена какая-либо категория (функция или комната)**. Без назначенной категории автоматически обнаруженное устройство не будет обработано.

2. Связанные устройства

Связанные устройства — это виртуальные устройства, созданные вручную для отражения точек данных определенного физического устройства с помощью `ioBroker.linkeddevices`.

Предлагается использовать ветки `ioBroker.devices` и `alias.0` вместо `linkeddevices`.

3. Псевдонимы

Псевдонимы — это облегченные виртуальные устройства, которые действуют как ярлыки или упрощенные ссылки на существующие состояния без создания полной структуры устройства.

Вы можете создать новое виртуальное устройство в ветке `alias.0`. Выбрав тип устройства, вы должны заполнить все обязательные состояния (отмеченные *). При желании вы можете добавить необязательные состояния (например, влажность по датчику температуры).
Для каждого обязательного состояния и заполненного необязательного состояния адаптер создает структуру псевдонимов.
Если вы создали, например, температурное устройство с именем `Temperature` и указали оба состояния (температуру и влажность), вы найдете следующие состояния и канал в ветке `alias.0`:

- `alias.0.Temperature` - канал
- `alias.0.Temperature.temperature` - состояние с единицей измерения '°C'. Оно должно иметь виртуальную ссылку на какое-то реальное состояние с температурой. Если удалить псевдоним в адаптере `ioBroker.devices`, это состояние останется без ссылки.
- `alias.0.Temperature.humidity` - состояние с единицей измерения '%'. Это будет иметь виртуальную ссылку на реальное состояние (например, на `hm-rpc.0.JHAGHGJJJ.1.HUMIDITY`). Если удалить псевдоним в адаптере `ioBroker.devices`, это состояние будет удалено.

Почти каждый тип устройства может иметь дополнительные состояния (индикаторы) для батареи, подключения, ошибки и еще некоторых других. Они необязательны, но некоторые адаптеры (например, `material` или `matter`) могут их интерпретировать.

Для каждого состояния можно указать все настройки, которые поддерживаются псевдонимами:

- Различные состояния для чтения и записи
- Формула преобразования для чтения и записи

#### Управление устройствами
Изменить устройство: на вкладке «Устройства» щелкните значок карандаша рядом с устройством, чтобы изменить его имя, тип, категорию, цвет, значок или сопоставления точек данных.

Удалить устройство: Щелкните значок корзины, чтобы удалить виртуальное устройство. Это не повлияет на физическое устройство или его адаптер.

Организация устройств: используйте категории для группировки устройств (например, «Освещение», «Отопление») для более удобного управления визуализациями.

## Тип устройств
Этот адаптер создан с помощью `type-detector`. Все возможные устройства могут быть найдены [здесь](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.2 (2025-04-26)
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

Copyright (c) 2019-2025 bluefox <dogafox@gmail.com>

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