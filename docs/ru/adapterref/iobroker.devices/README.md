---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.devices/README.md
title: ioBroker.devices
hash: jdhiIl/mtRCBKLYLztCtaZ29lMUVU6JE5CgHe31GWU0=
---
![Логотип](../../../en/adapterref/iobroker.devices/admin/devices.svg)

![Количество установок](http://iobroker.live/badges/devices-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.devices.svg)
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.devices/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/devices/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.devices.svg)

# ioBroker.devices

## Адаптер устройства для ioBroker

Управляйте и создавайте устройства для использования в других адаптерах, таких как Material, IoT, Matter...

**Важно: включите вкладки в админке, такие как «Журнал» и «Скрипты».**

![Экран](../../../en/adapterref/iobroker.devices/img/screen.png)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Руководство пользователя адаптера ioBroker.devices

### Обзор

Он`ioBroker.devices` Адаптер — это компонент платформы умного дома ioBroker, предназначенный для упрощения управления устройствами путем создания и управления виртуальными устройствами.

Эти виртуальные устройства предоставляют стандартизированный интерфейс для физических устройств, упрощая интеграцию, создание сценариев, визуализацию и управление устройствами разных производителей и протоколов.

Адаптер обеспечивает единообразие в именовании и структуре точек данных, уменьшая необходимость в изменении скриптов или визуализаций при изменении оборудования.

Он преобразует любой набор состояний в ioBroker (физических **или** виртуальных) в корректно сформированные **устройства** с богатой информацией:

- `type` ,`role` ,`smartName` ,`color` ,`room` ,`function` ,`icon` ,`unit` и многое другое

Полученные данные используются панелями мониторинга (Material UI, VIS-2), голосовыми помощниками (Alexa/Google), адаптером Material, адаптером **IoT/Cloud** и скриптами, обеспечивая чистое, перспективное дерево объектов.

**Примечание:** адаптер **не** опрашивает оборудование. Он работает как веб-версия только для вкладок → не потребляет ресурсы ЦП/ОЗУ.

### Цель

Он`ioBroker.devices` Адаптер служит следующим целям:

- Стандартизация: Создает виртуальные устройства с согласованной структурой точек данных, независимо от базового оборудования или протокола, используемого для разных точек данных.
- Упрощенное обслуживание: позволяет пользователям заменять физические устройства без обновления скриптов или визуализаций путем переназначения точек данных в адаптере.
- Расширенная совместимость: бесшовная интеграция с адаптерами визуализации (например, Material UI, VIS) и адаптерами IoT (например, Alexa, Google Home).
- Удобный интерфейс: упрощает управление устройством для начинающих пользователей, обеспечивая при этом гибкость для опытных пользователей.

#### Стандартизация

Многие адаптеры, такие как MQTT, KNX или аналогичные, предоставляют точки данных с различными именами и структурами. Этот адаптер создает виртуальное устройство с согласованной структурой, что упрощает управление и визуализацию устройств. Он автоматически добавляет роли, единицы измерения и имена к состояниям.

#### Упрощенное техническое обслуживание

Он`ioBroker.devices` Адаптер позволяет пользователям создавать виртуальные устройства, которые можно легко переназначать на другие физические устройства. Это означает, что при изменении физического устройства вам не нужно обновлять скрипты, визуализации или настройки истории; вам нужно просто переназначить точки данных в адаптере.

#### Улучшенная совместимость

Адаптер знает, как должны выглядеть устройства и как ими пользоваться. Он создает виртуальное устройство с той же структурой, что и физическое устройство, что упрощает интеграцию с другими адаптерами.

#### Удобный

Он`ioBroker.devices` Адаптер разработан с учетом удобства использования, что делает его доступным для начинающих, одновременно предлагая расширенные функции для опытных пользователей. Интуитивно понятный интерфейс позволяет пользователям создавать и управлять виртуальными устройствами без необходимости обладать обширными техническими знаниями.

## Конфигурация

После установки настройте адаптер на вкладке «Устройства» в административном интерфейсе ioBroker.

### Создание виртуального устройства

Откройте вкладку «Устройства» в панели администратора.

#### Добавить устройство

- Нажмите кнопку "+", чтобы создать новое виртуальное устройство.
- Введите название для устройства (например, "LivingRoomLight").
- Выберите тип устройства (например, светильник, выключатель, термостат) из предопределенного списка.
- При желании можно присвоить организации категорию (например, освещение, отопление).

Точки данных на карте:

Для каждой функции (например, включение/выключение, яркость) сопоставьте точку данных виртуального устройства с соответствующим состоянием физического устройства (например,`hm-rpc.0.12345.1.STATE` (для выключателя Homematic).

Используйте интерфейс для просмотра и выбора состояний из других адаптеров.

Сохранить: Нажмите «Сохранить», чтобы создать виртуальное устройство. Оно появится в папке alias.0.<DeviceName> на вкладке «Объекты».

#### Типы устройств

Он`ioBroker.devices` Адаптер поддерживает три основных подхода к созданию устройства:

1. Автоматически обнаруженные устройства

Некоторые адаптеры (например, ioBroker.zigbee, ioBroker.hm-rpc) уже предоставляют допустимую структуру для устройств, и они будут обнаружены автоматически, **если им присвоена какая-либо категория (функция или помещение)** . Без присвоенной категории автоматически обнаруженное устройство не будет обработано.

2. Связанные устройства

Связанные устройства — это виртуальные устройства, созданные вручную для зеркального отображения данных конкретного физического устройства.`ioBroker.linkeddevices` .

Рекомендуется использовать`ioBroker.devices` и`alias.0` ветка вместо`linkeddevices` .

3. Псевдонимы

Псевдонимы — это легковесные виртуальные устройства, которые служат в качестве ярлыков или упрощенных ссылок на существующие состояния, не создавая при этом полноценную структуру устройства.

Вы можете создать новое виртуальное устройство в`alias.0` Ветка. Выбрав тип устройства, необходимо заполнить все обязательные состояния (отмечены \*). При желании можно добавить необязательные состояния (например, влажность по датчику температуры). Для каждого обязательного состояния и заполненного необязательного состояния адаптер создает структуру псевдонимов. Например, если вы создали устройство измерения температуры с именем`Temperature` При условии соблюдения обоих условий (температуры и влажности) вы найдете следующие состояния и канал.`alias.0` ветвь:

- `alias.0.Temperature` - канал
- `alias.0.Temperature.temperature` - состояние с единицей измерения '°C'. Оно должно иметь виртуальную связь с некоторым реальным состоянием с температурой. Если удалить псевдоним в`ioBroker.devices` адаптер, это состояние сохранится без связи.
- `alias.0.Temperature.humidity` - состояние с единицей измерения '%'. Это будет иметь виртуальную связь с реальным состоянием (например, с`hm-rpc.0.JHAGHGJJJ.1.HUMIDITY` Если удалить псевдоним в`ioBroker.devices` адаптер, это состояние будет удалено.

Практически каждый тип устройства может иметь дополнительные состояния (индикаторы) для отображения заряда батареи, состояния подключения, ошибки и других параметров. Они являются необязательными, но некоторые адаптеры (например,`material` или`matter` ) мог бы это интерпретировать.

Для каждого состояния можно указать все параметры, поддерживаемые псевдонимами:

- Различные состояния для чтения и записи.
- Преобразование формулы для чтения и записи

#### Управление устройствами

Редактирование устройства: На вкладке «Устройства» щелкните значок карандаша рядом с устройством, чтобы изменить его имя, тип, категорию, цвет, значок или сопоставление точек данных.

Удаление устройства: Нажмите на значок корзины, чтобы удалить виртуальное устройство. Это не повлияет на физическое устройство или его адаптер.

Организация устройств: используйте категории для группировки устройств (например, «Освещение», «Отопление») для упрощения управления в визуализациях.

## Типы устройств

Этот адаптер изготовлен с помощью`type-detector` [Здесь](https://github.com/ioBroker/ioBroker.type-detector/blob/master/DEVICES.md) можно найти все возможные устройства.

## Видео

[![Видео](https://img.youtube.com/vi/0Aecm5YAk7M/0.jpg)](https://www.youtube.com/watch?v=0Aecm5YAk7M)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.2.0 (2026-08-28)
* (@GermanBluefox) The devices of this adapter are now reachable in the ioBroker Device Manager: each one appears as a card with its name, icon, battery and reachability. Readings are shown on the card itself, and only states that can actually be operated become controls (switch, slider, select), so a read-only device has no control button at all. A control writes to the command state but reads from its feedback partner where the device has one, so a switch shows what the device reports rather than what it was last told. The instance already advertised Device Manager support, but answered none of its requests
* (@GermanBluefox) Added the "Clean Light" theme: white cards on a light grey page with coloured icons, where a tile stays white when its device is on and only the label and the toggle turn blue
* (@GermanBluefox) Added the "Tech Blue" theme: near-black tiles set apart by a lit blue outline, with monochrome blue icons and toggles
* (@krobipd) Fixed "Create new folder" only showing a white screen since 4.0.0 (#679)
* (@krobipd) Fixed the room column filter emptying the device list: it showed the function filter's value and wrote the picked room into the function filter (#680)
* (@krobipd) Fixed an added state being deleted when it was edited without renaming it (#360)
* (@krobipd) Moving, renaming or copying a device no longer deletes the original when the copy failed halfway through (#151, #513)
* (@GermanBluefox) A failed copy is only cleaned up when its target path was free beforehand, so renaming a device onto an existing name cannot delete that device's objects
* (@krobipd) Manually added states are now deleted together with their device, instead of staying behind as ghost objects after a move, rename or delete (#684)
* (@krobipd) Cancel in the device editor now really cancels: deleting a state and picking a device icon are applied on Save instead of the moment they are clicked
* (@krobipd) The read/write function preview shows boolean results and reports an invalid formula, instead of staying empty in both cases (#683)
* (@krobipd) A string-typed alias no longer inherits `min`/`max`/`step` from its source, which made js-controller warn about an invalid object on every check (#682)
* (@GermanBluefox) An alias or linked state now takes its type from the source wherever the device type allows more than one, so a thermostat or air conditioner that spells its modes out instead of numbering them is no longer written back as a number (#614). Needs the matching `@iobroker/type-detector` release
* (@krobipd) A linkeddevices state now inherits the real range of its source instead of a hard 0...100, so a linked thermostat no longer shows 0...100 instead of e.g. 5...35
* (@krobipd) `TreeView.getDerivedStateFromProps` returns its derived state instead of mutating the state it was handed, which React 19 does not guarantee to keep

### 4.1.1 (2026-08-17)
* (@GermanBluefox) Fixed states being written without `common.read` and `common.write`, which every state object must carry: the "add state" dialog left both out for the deprecated `file` type, and dropped them from any state it edited that did not have them yet (#535, #533, #463)
* (@GermanBluefox) States written by earlier versions have the two attributes added once when the device list is loaded. What is missing is taken from the device type and from the aliased source, so a state the device really can write does not turn read-only

### 4.1.0 (2026-08-16)
* (@Apollon77) Added support for new device types
* (@GermanBluefox) Datapoints added to an alias device by hand now reach the widget GUI, so a tank can show the litres it has left next to its fill level
* (@GermanBluefox) The tank tile shows that second reading where it used to print its fill level a second time
* (@GermanBluefox) Fixed the settings button of a 2x0.5 tank tile sitting in the middle of the tile instead of in its top-right corner

### 4.0.2 (2026-08-10)
* (@SimonFischer04) Added WindowTilt support in the widgets GUI (#609)
* (@GermanBluefox) Added min/max values (last 24 hours or today) for widgets with history (#610)
* (@GermanBluefox) Reworked the "Blue dark" theme into a deep navy look and gave the category icons a coloured round badge
* (@GermanBluefox) Added role icons for UV index, knots, rpm, operating hours and W/kW/Wh
* (@GermanBluefox) The device list now shows the icon configured for a widget, and falls back to the role icon instead of the generic type icon
* (@GermanBluefox) Info devices are no longer hidden by default; the "i" button in the toolbar now shows whether the filter is active
* (@GermanBluefox) Fixed widgets vanishing from the GUI when they were assigned to a category that no longer exists
* (@GermanBluefox) Fixed categories being dropped as empty although widgets had been moved into them
* (@GermanBluefox) Fixed the "record history" switch: it now follows the alias to the recorded source and is highlighted while recording
* (@GermanBluefox) Fixed clipped values in the wind widget
* (@GermanBluefox) Fixed emoji icons sitting off-centre in the category badges and header
* (@GermanBluefox) Fixed an alias assignment being dropped silently when saving a device whose state was not cached yet
* (@GermanBluefox) Implemented user-specific views
* (@Apollon77) Added widgets for button, buttonSensor, camera and vacuumCleaner, which were shown as "Widget type not supported" before
* (@Apollon77) Added mute and the separate volume feedback state (`VOLUME_ACTUAL`) to the media player widget
* (@Apollon77) Added the missing tilt controls to the blind widgets: tilt now works for button blinds too, has a stop button, and uses the min/max of the state instead of assuming percent
* (@Apollon77) Added an active icon for windowTilt
* (@Apollon77) The light widget now shows the real state from `ON_ACTUAL` instead of echoing the commanded value
* (@Apollon77) Fixed image widgets: the configured defaults were ignored until the settings dialog was opened once, and the refresh button was answered from the cache
* (@Apollon77) Fixed newer device types (windowTilt, camera, percentage, fillLevel, …) landing in the "other" group when auto-grouping is switched on
* (@Apollon77) Fixed the type of created alias states: `defaultType` is now honoured, so the ERROR state is no longer created as boolean
* (@Apollon77) Fixed the air conditioner editor showing the swing state twice and writing it twice on save
* (@Apollon77) Fixed the enum assignment of created devices: it ran once per state and not at all for devices with only optional states
* (@Apollon77) Fixed the build and the CI (unresolvable react-input-color dependency, out-of-sync lock files, node versions)

### 4.0.0 (2026-08-03)
* (@GermanBluefox) Added min/max values (last 24 hours or today) for widgets with history
* (@GermanBluefox) Fixed the history options (chart, trend, min/max) not being offered in the widget settings
* (@GermanBluefox) Recreate all missing instance monitoring objects, not only alive/connected
* (@GermanBluefox) Migrated to react 19 and MUI 9

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.devices/blob/master/CHANGELOG_OLD.md)

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