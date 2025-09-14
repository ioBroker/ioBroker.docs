---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.matter/README.md
title: Адаптер ioBroker Matter
hash: /lBrnZY2SJyXKDLGYvnNr2wVfvqeIKu6j+u0Y3vXC0s=
---
![Логотип](../../../en/adapterref/iobroker.matter/admin/matter.svg)

![Количество установок](http://iobroker.live/badges/matter-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.matter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.matter.svg)

# IoBroker Matter Adapter
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.matter/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/matter/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении отчётов об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчёты Sentry используются, начиная с версии js-controller 3.0.

## Введение
> [!Важно] > Адаптер НЕЛЬЗЯ установить через GitHub: адаптер необходимо установить через репозиторий ioBroker (стабильную или последнюю версию).
> > Подробное описание настройки и использования адаптера ioBroker Matter приведено в 🇩🇪 [немецкая Вики](https://github.com/ioBroker/ioBroker.matter/wiki) и 🇬🇧 [английская Вики](https://github.com/ioBroker/ioBroker.matter/wiki/Home-%E2%80%90-EN).
> > Перед использованием адаптера ознакомьтесь с [Важные примечания](https://github.com/ioBroker/ioBroker.matter/wiki/Einleitung-und-wichtige-Hinweise#wichtige-hinweise-bitte-dringend-beachten).

## Описание
С помощью адаптера ioBroker Matter можно сопоставить следующие варианты использования:

* Устройства на основе материи могут быть напрямую подключены к ioBroker и, таким образом, считывать данные с них/контролировать их.
* Предоставление нескольких устройств ioBroker в качестве моста Matter: мосты Matter могут содержать несколько устройств и являются самым простым способом интеграции устройств ioBroker в экосистему, совместимую с Matter.
* ioBroker предоставляет отдельные виртуальные устройства Matter на основе устройств ioBroker/состояний ioBroker, которые можно обучить экосистеме, совместимой с Matter (в настоящее время возможны только мосты для Amazon Alexa)

## Задача
* Тексты частично на английском языке.
* Синхронизация мин/макс из Matter с объектами ioBroker
* Очистка объектов при удалении устройств/состояний
* типы устройств ioBroker
* (6) пылесос
* (5+) объем, объемГруппа
* (5+/8) Кондиционер
* (7) пожарная сигнализация
* (5) медиаплеер
* предупреждение - как?
* ворота - они же жалюзи, потому что у материи нет других типов устройств?
* windowTilt - как обсуждалось, комбинированное устройство с двумя контактными датчиками... один для открытия и закрытия, а другой для наклона
* levelSlider - в идеале как неяркая диммируемая розетка?
* Типы устройств Matter
* (8) Вентилятор -> Кондиционер?
* (7) Датчик качества воздуха -> ???
* (7) Очиститель воздуха -> ???
* (5) Насос -> ???
* (6) Датчик давления -> ??? DEF
* (6) Робот-пылесос -> vacuumCleaner
* (4) Датчик расхода -> ??? DEF
* (5+) Кондиционер воздуха в помещении -> Кондиционер
* (5+) Посудомоечная машина-> ???
* (4+) Базовый видеоплеер -> mediaPlayer
* (4+) Стиральная машина -> ???
* (4) Холодильник -> ???
* (4) Шкаф с контролируемой температурой -> ???
* (2+) Детектор замерзания воды -> предупреждение?
* (2+) Датчик дождя -> предупреждение?
* (2) Водяной клапан -> ???
* (2) Сушильная машина для белья -> ???
* (2) Духовка -> ???
* (2) Варочная панель -> ???
* (2) Варочная поверхность -> ???
* (2) Вытяжка -> ???
* (2) Микроволновая печь -> ???
* (2) Оборудование для электроснабжения транспортных средств -> ???
* (2) Водонагреватель -> ???
* (1+) Солнечная энергия -> ???
* (1+) Аккумуляторная батарея -> ???
* (1+) Тепловой насос -> ???

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 0.5.2 (2025-08-03)
* (@Apollon77) Updated matter.js to 0.15.2 with many performance- and other improvements
* (@GermanBluefox) Corrected the checking of the licenses if they were stacked
* (Apollon77) Use attributes from cache instead of requesting them from the device
* (Apollon77) Ignoring invalid min/max for color temperature from objects
* (Apollon77) Prevents update loops for Thermostat on/off state changes
* (Apollon77) Fixes invalid color state updates when multiple attributes are adjusted together
* (Apollon77) Rounds RSSI values to prevent digits

### 0.5.1 (2025-06-06)
* (@Apollon77) Updated matter.js to 0.14 with many performance- and other improvements

### 0.5.0 (2025-05-03)
* IMPORTANT: Increase Node.js requirement to at least 20.x because else BLE currently does not work
* (@Apollon77) Added info log message when the device decided for a different subscription interval

### 0.4.16 (2025-05-01)
* (@GermanBluefox) Added expert mode to GUI
* (@GermanBluefox) GUI optimizations
* (@Apollon77) Upgrade Matter support to 1.4
* (@Apollon77) Upgrade type detector and usage for better automatic detection results
* (@Apollon77) Included Battery state in attribute polling and changed default interval to 24h if the device is battery powered
* (@Apollon77) Shows subscription maximum interval of the node in the connection-infos
* (@Apollon77) Allows to overwrite the default subscription maximum interval send to the device in Node settings
* (@Apollon77) Considers also the BatteryAlarm state of Smoke-CO sensors when determine LOWBAT state
* (@Apollon77) Updates the connection state of Controller devices as soon as alive triggers or data updates come in
* (@Apollon77) For Lock devices the SET state is synced with ACTUAL

### 0.4.15 (2025-02-25)
* (@GermanBluefox) Added Button display and control in the UI
* (@Apollon77) Updates matter.js to optimize and add persisted subscriptions
* (@Apollon77) Fixed states-list initializations for controller states
* (@Apollon77) Fixed initialization issue when the initial device connection for controller was not finished
* (@Apollon77) Adjusted connection display when reconnecting to a node to red in UI

### 0.4.14 (2025-02-08)
* (@Apollon77) Improved stability and connection reliability (matter.js updated)
* (@Apollon77) Sort enum entries to improve detection quality when adding new devices

### 0.4.13 (2025-02-01)
* (@Apollon77) Added support for Door state feature for Devices and Controllers
* (@Apollon77) Fixed Thermostat creation with Boost state

### 0.4.12 (2025-02-01)
* (@GermanBluefox) Added the "copy to clipboard" button in the debug dialog
* (@Apollon77) Updated matter.js with performance and Memory usage optimizations (and Tasmota pairing workaround)
* (@Apollon77) Reworked Type detection in Backend and for Channel/Device detection type in UI, now multiple device types are offered with the most complex one pre-selected
* (@Apollon77) Handle Matter ColorTemperature Lights as a Color capable light to also allow CT-Lights with Hue support
* (@Apollon77) Added BOOST endpoint as switch when exposing Thermostats with Boost state
* (@Apollon77) Optimized some dimmer/level management for light devices without a dimmer state

### 0.4.11 (2025-01-28)
* (@Apollon77) Fixed caching issues in device type detection in backend
* (@Apollon77) Added Debug info icon for Devices and Bridges

### 0.4.10 (2025-01-27)
* (@Apollon77) Fixed Thermostat limit initialization and Mode error
* (@Apollon77) Fixed Matter Event handling when mapped to an ioBroker state (e.g.GenericSwitch)
* (@Apollon77) Fixed Device type detection by really preferring the preferred type

### 0.4.9 (2025-01-26)
* (@Apollon77) Enhanced error and invalid devices display for UI
* (@Apollon77) Fixed Button Press Controller support
* (@Apollon77) Added support to also select folders when adding devices
* (@Apollon77) Fixed Illuminance State type min/max

### 0.4.8 (2025-01-26)
* (@Apollon77) Acknowledges Power states also on SET states
* (@Apollon77) Fixed Color Temperature handling for devices
* (@Apollon77) Fixed Thermostat setpoint logic

### 0.4.7 (2025-01-25)
* (@Apollon77) Added debouncing when controllers change temperature value to make sure not to overload the device
* (@Apollon77) Added support for a step and use 0.5 for Setpoint temperatures
* (@Apollon77) Added support for fur Hue lights without saturation state

### 0.4.6 (2025-01-25)
* (@GermanBluefox) Optimized UI
* (@GermanBluefox) Added user feedback when device or bridged device is identified
* (@Apollon77) Fixes Thermostat logic for devices
* (@Apollon77) Ensures information is pushed to the UI when devices are in an error state

### 0.4.5 (2025-01-25)
* (@Apollon77) Fixed Thermostat initialization logic and added more logging
* (@Apollon77) Fixed WindowCovering level to match ioBroker definition
* (@Apollon77) Updated matter.js for further optimizations

### 0.4.4 (2025-01-24)
* (@Apollon77) Added OPEN state for all Door Locks to open door again
* (@Apollon77) Fixed Thermostat initialization when no AUTO mode is supported
* (@Apollon77) Enhanced Enum state display in UI

### 0.4.3 (2025-01-24)
* (@GermanBluefox) Optimized UI
* (@Apollon77) Allows turning light on/off via the dimming level as Zigbee adapter does
* (@Apollon77) Detects Switch changes via event which should be more reliable
* (@Apollon77) Optimizes some Node information

### 0.4.2 (2025-01-23)
* (@Apollon77) Added SmokeCO2Alarm -> FireAlarm to Controller device types
* (@Apollon77) Detects BLE only QR codes and responds with an error message
* (@Apollon77) For Dimming and Color changes direct the device to execute the changes also when a device is off

### 0.4.1 (2025-01-22)
* (@GermanBluefox) Optimized UI
* (@Apollon77) Improved handling for Power Source cluster on root endpoint
* (@Apollon77) Changed Identify handling - Light will be turned on/off, others just logged

### 0.4.0 (2025-01-20)
* (@Apollon77) "SET" states are no longer updated when Actual states are present and get updated!
* (@Apollon77) Initializes states also with "ack=false" states because better than no initial values
* (@Apollon77) Added Device support for Window Coverings (Blinds, Blindbuttons), Color Lights (Cie, Hie, Rgb, Rgbw, RgbSingle, RgbwSingle) and Thermostats
* (@Apollon77) Made sure to track state values also when disabled and update state to Matter when enabled again
* (@Apollon77) Made sure to also subscribe to write-only states for controller cases
* (@Apollon77) Only exposes the remaining battery percentage attribute when value is present
* (@Apollon77) Corrected error display and pushing to UI in case of initialization errors of bridged devices
* (@Apollon77) Added RSSI value also for Thread devices
* (@Apollon77) Optimized and fixed multiple things

### 0.3.7 (2025-01-15)
* (@GermanBluefox) Showed the device name in paring dialog
* (@GermanBluefox/Apollon77) Adjusts connection type icons
* (@Apollon77) Optimized the discovery dialog handling
* (@Apollon77) Fixed Thermostat for Controller to update temperatures
* (@Apollon77) Gives Energy sensors a dedicated icon
* (@Apollon77) Optimized and fixed multiple things

### 0.3.6 (2025-01-13)
* (@GermanBluefox) Fixed GUI errors
* (@GermanBluefox/@Apollon77) Added possibility to enable/disable the controlled nodes
* (@Apollon77) Added Information on battery and rssi for DM tile
* (@Apollon77) Added controller support for Color Lights, Speaker, Thermostats and Window coverings
* (@Apollon77) Optimized and fixed multiple things

### 0.3.5 (2025-01-09)
* (@GermanBluefox) Fixed GUI errors
* (@GermanBluefox) Added `Controller fabric label` to configuration
* (@GermanBluefox) Added solution for QR-Code scanning on non HTTPS pages
* (@Apollon77) Fixed the Generic Switch Device type for controller
* (@Apollon77) Fixed Controller BLE initialization and activation
* (@Apollon77) Added serialNumber to all devices and bridges for better device re-detection by controllers

### 0.3.4 (2024-12-31)
* (@Apollon77) Updates matter.js to address several issues
* (@GermanBluefox) Optimized UI

### 0.3.3 (2024-12-28)
* (@Apollon77) Allows triggering commands via matter also when the state already matches the value
* (@Apollon77) Sets and updates the fabric label for paired devices (default is "ioBroker matter.X")
* (@Apollon77) Detects state deletion for ioBroker devices and updates a device in UI to show device state
* (@Apollon77) Several optimizations on commissioning
* (@Apollon77) Do not show commissioning QR codes in ioBroker log
* (@Apollon77) Use Fabric label to try to detect if ioBroker is the controller
* (@Apollon77) Fixes displaying error details for devices and bridges
* (@Apollon77) Fixes the device and type detection logic

### 0.3.2 (2024-12-21)
* (@Apollon77) Fixes several discovery issues

### 0.3.1 (2024-12-20)
* (@Apollon77) Fixes bridge/device icon display in UI
* (@Apollon77) Prevents displaying warning dialogs when nothing is wrong
* (@Apollon77) Adjusts some logs

### 0.3.0 (2024-12-20)
* BREAKING: Please re-enter your ioBroker Pro Cloud Password!
* (@Apollon77) Made sure the adapter is stopped before being updated
* (@Apollon77) Optimizes device discovery and allows to stop it again

### 0.2.10 (2024-12-19)
* (@GermanBluefox) Made the Adapter UI also available as standalone tab
* (@GermanBluefox) Added error details when adding the same state twice to a bridge or device
* (@Apollon77) Fixes discovery start in UI

### 0.2.9 (2024-12-18)
* (@Apollon77) When Get and set states are separated then also update set state with new values
* (@Apollon77) Node details dialog in controller now exposes some more Battery information
* (@Apollon77) Also exposes the battery states when features are set wrong on the device
* (@Apollon77) Fixes LightSensor state mapping
* (@Apollon77) Prevents errors when only some energy states exist
* (@Apollon77) Uses the IP provided by Android when commissioning devices if possible
* (@Apollon77) Restructure discovery to run in the background and not block the UI
* (@Apollon77) Exposes States for Enums for Matter nodes
* (@Apollon77) Prevent storage to delete wrong data when a node gets removed

### 0.2.8 (2024-12-17)
* (@GermanBluefox) Fixes progress dialog for DM - used when deleting a node
* (@GermanBluefox) Synchronizes the "do not ask again on delete" time with admin and set to 5 minutes
* (@GermanBluefox) Optimizes bridge's display for different color schemes
* (@GermanBluefox) Allows collapsing the information blocks at the top of the pages
* (@GermanBluefox) Adds an ioBroker Logo when display commissioned controllers
* (@GermanBluefox/@apollon77) Adds additional details and error state also for devices and bridged devices
* (@GermanBluefox/@apollon77) Always display QR code to allow additional pairing for device and bridges from adapter UI
* (@GermanBluefox) Optimizes several messages nd approval dialogs
* (@GermanBluefox) Adds a welcome dialog for new users
* (@GermanBluefox) Adds user guidance for big unpaired bridges
* (@Apollon77) Adds Illuminance and Button/ButtonSensor (Switch) device type
* (@Apollon77) Changes/Optimizes naming structure for paired devices and sub-endpoints
* (@Apollon77) Adds information when Matter device types are not yet supported to look into objects for details
* (@Apollon77) Resets connection status when a controller node is disconnected, also on adapter stop
* (@Apollon77) Cleans up internal data structures when a node gets deleted for controller
* (@Apollon77) Uses the configured device type when finding multiple types in the backend
* (@Apollon77) Adjusts UI device type detection to differentiate between supported and other types
* (@Apollon77) Made sure that controller configuration changes are executed sequentially
* (@Apollon77) Added Transition Time handling for Dimmer and Ct device types in both directions
* (@Apollon77) Added Low-Battery and Battery-percent for all device types in both directions
* (@Apollon77) Added Ethernet Network Commissioning Cluster to prevent issues with Tuya

### 0.2.7 (2024-12-08)
* (@Apollon77) Cleans up objects when a controller node is deleted
* (@Apollon77) Prevents controller configuration changes to be executed in parallel

### 0.2.6 (2024-12-06)
* (@Apollon77) Fixes ColorTemperature light initialization because of matter.js update

### 0.2.5 (2024-12-06)
* (@Apollon77) Sets the "no-compose" flag correctly to normally use composed if needed and adds it to a missing dialog
* (@Apollon77) Allows using null values if needed
* (@Apollon77) Fixes UNREACH handling for devices
* (@Apollon77) Fixes object change handling for controller
* (@Apollon77) Allows Bridges to expose its name as a device name
* (@Apollon77) Allows renaming controller nodes and devices

### 0.2.4 (2024-12-04)
* (@Apollon77) Shows a progress indicator when deleting controller nodes
* (@Apollon77) Cuts names and labels to 32 or 64 characters as needed by Matter
* (@Apollon77) Improves error handling on devices and bridges
* (@Apollon77) Clear storage when removing a bridged device
* (@Apollon77) Processes changed objects with a 5s delay to prevent too many changes at once
* (@Apollon77) Fixes version determination
* (@Apollon77) Initializes Device objects more lazily

### 0.2.3 (2024-11-30)
* (@Apollon77) Made sure to delete all objects and stop device when a device is deleted in UI
* (@Apollon77) When a device/bridge object is deleted and adapter runs we try to detect this and stop the device/bridge
* (@Apollon77) Optimizes close handling of adapter
* (@Apollon77) Uses an adapter version as Software and Hardware versions in the exposed Matter devices
* (@Apollon77) Fixes "auto" flags in backend when it makes no sense in objects
* (@Apollon77) Fixes "auto" flag in UI
* (@Apollon77) Prevents cyclic state updates when a state is updated by the adapter to matter
* (@Apollon77) Log warnings when the optional device states are not mapped
* (@Apollon77) Hides Product-ID and VendorId fields in UI when adding devices into a bridge

### 0.2.2 (2024-11-28)
* (@Apollon77) Uses plain matter.js logs for better readability
* (@Apollon77) Prevents ghost connection entries in the UI
* (@Apollon77) Adds some missing implementations for Controller of Door, Window, FloodAlarm and Motion

### 0.2.1 (2024-11-27)
* (@Apollon77) Adds Color Temperature conversion if unit is "mireds"
* (@Apollon77) Fixes Color Temperature cluster initialization
* (@Apollon77) Fixes Min/Max calculation when unit conversion is used

### 0.2.0 (2024-11-26)
* IMPORTANT: Breaking change!! Please decommission ALL devices and do a full factory reset of the adapter Matter storage before installing this version. Pair the devices new afterward. 
* (@Apollon77) Finalizes Devices, Bridges and Controller functionality with a first set of 11 device types
* (@Apollon77) Upgrades to a new Matter.js version and API (breaks storage structure)
* (@GermanBluefox) Moved a build process of GUI to vite
* (@GermanBluefox) Added possibility to group devices in the GUI

### 0.1.13 (2023-12-01)
* (@GermanBluefox) Working on the controller

### 0.1.10 (2023-11-13)
* (@GermanBluefox) Implemented the factory reset and re-announcing

### 0.1.2 (2023-10-25)
* (@GermanBluefox) Devices were implemented

### 0.0.5 (2023-10-24)
* (@GermanBluefox) Fixed names under linux

### 0.0.4 (2023-10-24)
* (@GermanBluefox) used library `@iobroker/type-detector`

### 0.0.2 (2023-10-23)
* (@GermanBluefox) Initial commit

## License
Apache-2.0

Copyright (c) 2023-2025 Denis Haev <dogafox@gmail.com>