---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nanoleaf-lightpanels/README.md
title: ioBroker.nanoleaf-lightpanels Adapter
hash: uhWRwgO/aSF1hsldJ9ogs2mHLTkqUPdFVGo61lE4y/s=
---
![Логотип](../../../en/adapterref/iobroker.nanoleaf-lightpanels/admin/nanoleaf-lightpanels.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.nanoleaf-lightpanels.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nanoleaf-lightpanels.svg)
![Тестирование и выпуск](https://github.com/daniel-2k/ioBroker.nanoleaf-lightpanels/actions/workflows/test-and-release.yml/badge.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.nanoleaf-lightpanels.png?downloads=true)

# ioBroker.nanoleaf-lightpanels Adapter

\=================

Это адаптер ioBroker для управления устройствами Nanoleaf, поддерживающими OpenAPI.

## Поддерживаемые модели

- Световые панели
- Холст
- Формы
- Элементы
- Линии

## Подключение к контроллеру Nanoleaf:

1. В настройках адаптера необходимо указать IP-адрес или имя хоста и порт контроллера Nanoleaf. Вы можете использовать функцию поиска, чтобы обнаружить все поддерживаемые устройства Nanoleaf в вашей сети.
2. Для доступа к OpenAPI nanoleaf требуется токен авторизации. Если у вас он уже есть, вы можете ввести его здесь и пропустить следующий шаг.
3. Если у вас нет токена авторизации, вам необходимо запросить его у nanoleaf OpenAPI. Для этого переведите контроллер nanoleaf в режим сопряжения, нажав и удерживая кнопку питания на устройстве в течение 5-7 секунд, пока светодиоды не начнут мигать попеременно. Затем нажмите кнопку «Получить токен авторизации» в течение 30 секунд (режим сопряжения прекращается через 30 секунд). Адаптер должен быть запущен! Если все прошло успешно, токен авторизации должен отобразиться в поле «Токен аутентификации». Если произошла ошибка, появится всплывающее окно с сообщением об ошибке (подробности можно посмотреть в журнале).
4. Сохраните настройки.
5. Веселиться!

### Прямое обновление статуса через события, отправляемые сервером (SSE).

Начиная с версии прошивки Light Panels > 3.1.0 и прошивки Canvas > 1.1.0, для прямого обновления статуса можно использовать события Server Sent Events (SSE). Для устройств Canvas, Shapes и Element поддерживаются сенсорные события.

_Обратите внимание:_ для определения активности устройства Nanoleaf каждые 60 секунд отправляются уведомления SSDP. Убедитесь, что вы можете принимать многоадресные UDP-сообщения на порту 1900 (проверьте брандмауэр и маршрутизацию). В противном случае вы получите сообщения об ошибке в адаптере, указывающие на потерю соединения. Если у вас возникли проблемы с функцией поддержания соединения, настройте правильный интерфейс адаптера в административных настройках для адаптера Nanoleaf. Для поиска устройств убедитесь, что вы можете принимать трафик на UDP-порту 5000. Я заметил, что некоторые устройства Nanoleaf внезапно перестают отправлять уведомления SSDP, поэтому соединение больше не обнаруживается. Это проблема самого устройства Nanoleaf. Пользователи, столкнувшиеся с этой проблемой, могут включить использование механизма опроса поддержания соединения вместо уведомлений SSDP в дополнительных настройках адаптера.

Параметр интервала опроса для обновления состояния влияет только на устройства с более старыми версиями прошивки, где используется опрос для обновления состояния или если функция SSE отключена в дополнительных настройках адаптера.

## Алекса

Вы можете управлять устройствами Nanoleaf с помощью Alexa через ioBroker (облачный адаптер). Поддерживаются включение/выключение, регулировка яркости, цвета и цветовой температуры. Необходимо настроить точки данных.

- состояние (включение/выключение питания)
- оттенок (для цвета)
- насыщенность (для цвета)
- яркость (для цвета)
- colorTemp (для цветовой температуры)

в облачном адаптере под тем же смарт-именем.

## Визуализация ioBroker

Устройствами Nanoleaf можно управлять в ioBroker Visualization с помощью базовых виджетов, таких как «Радиокнопки включения/выключения», или ползунков для управления состоянием питания, яркостью, оттенком, насыщенностью и цветовой температурой.

Для эффектов можно использовать виджет "Select ValueList" в качестве выпадающего списка, а затем сопоставить состояние effectsList со свойствами value и text виджета (тип: "{nanoleaf-lightpanels.0.LightPanels.effectsList}" -> фигурные скобки важны!).

Для управления цветом и его визуализации необходимо установить виджеты в стиле палитры цветов. Вы можете сопоставить идентификатор RGB с состоянием colorRGB или использовать три состояния HSV.

Вы можете использовать демонстрационный проект nanoleaf vis, который находится в подпапке /vis на GitHub.

## Changelog

### 1.6.0 (2025-10-23)
* (daniel_2k) changed: Node.js 20 required
* (daniel_2k) changed: update dependencies and fixed ioBroker Check / Service Bot findings
* (daniel_2k) changed: brightness_duration role to level.interval for correct detection in Matter and iot adapter

### 1.5.0 (2024-04-21)
* (daniel_2k) new: added Skylight device
* (daniel_2k) changed: use keep alive for HTTP connections to avoid SNAT port exhaustion (e.g. Docker environments)

### 1.4.0 (2023-07-16)
* (daniel_2k) changed: use adapter-core for js-controller 5 compatibility

### 1.3.1 (2021-12-05)
* (daniel_2k) changed: write acknowledge to states directly after receiving success state from API
* (daniel_2k) changed: ip address workaround also for device search to detect nanoleaf devices with missing host info through firmware bug
* (daniel_2k) changed: optimized device detection and device keep alive detection

### 1.3.0 (2021-11-28)
* (daniel_2k) new: nanoleaf Lines supported
* (daniel_2k) new: nanoleaf Elements supported
* (daniel_2k) new: added state for writing custom effects and reading effects
* (daniel_2k) changed: due to firmware errors in canvas and shapes, IP address from packet header is used instead of location (because it's empty) for SSDP MSEARCH and NOTIFY
* (daniel_2k) fixed: devices were not deleted completely on device identification change

### 1.2.1 (2021-06-20)
* (daniel_2k) fixed: get a new authorization token is not possible when the current token is already invalid
* (daniel_2k) fixed: device search in admin settings fixed
* (daniel_2k) changed: obtaining an authorization token is also possible when field is already filled

### 1.2.0 (2021-01-03)
* (daniel_2k) new: possibility to use polling for keep alive detection instead of SSDP notify messages (for nanoleaf devices which stop sending SSDP notify packages)
* (daniel_2k) changed: small internal adjustments

### 1.1.1 (2020-12-27)
* (daniel_2k) fixed: error in device detection

### 1.1.0 (2020-12-27)
* (daniel_2k) new: support nanoleaf Shapes

### 1.0.6 (2020-09-14)
* (daniel_2k) changed: force status update for Canvas touch events
* (daniel_2k) new: added debug logging of received data via SSE

### 1.0.5 (2020-09-13)
* (daniel_2k) fixed: touch channel was not created for nanoleaf devices (bug since 1.0.3)

### 1.0.4 (2020-09-06)
* (daniel_2k) new: adapter address can be choosen in adapter settings for interfacing binding issues
* (daniel_2k) changed: use fixed port 5000 for MSEARCH replies for easy setup in firewall

### 1.0.3 (2020-08-30)
* (daniel_2k) fixed: search nanoleaf devices does not work on clean install of adapter
* (daniel_2k) new: added update of effectsList via SSE
* (daniel_2k) new: ability to disable of using SSE (for nanoleaf devices that stops sending ssdp:alive messages)
* (daniel_2k) changed: display nanoleaf device name in admin search result list
* (daniel_2k) changed: using forked "node-upnp-ssdp" for fixing interface binding

### 1.0.2 (2020-07-06)
* (daniel_2k) fixed: detection of ssdp:alive notify message for Canvas (fix disconnect/connect issue)
* (daniel_2k) fixed: sending correct service type for discovery of Canvas devices (fixes no devices found for Canvas devices)
* (daniel_2k) changed: if unknown nanoleaf device is detected Canvas will be used as fallback and warning will be logged
* (daniel_2k) fixed: setting rhythmMode was not working

### 1.0.1 (2020-07-05)
* (daniel_2k) fixed: detection of firmware version for Canvas for enabling SSE (Canvas firmware > 1.1.0 required)

### 1.0.0 (2020-06-18)
* (daniel_2k) new: using server sent events (SSE) for getting updates instead of polling (firmware > 3.1.0 required)
* (daniel_2k) new: support touch events for Canvas
* (daniel_2k) new: searching devices in Admin is now possible
* (daniel_2k) changed: moved duration for brightness state to separate state (please note: duration of in native part of brightness state will no longer work)
* (daniel_2k) changed: some minor internal adjustments
* (daniel_2k) changed: removed Admin2 configuration page

### 0.8.2 (2019-08-02)
* (daniel_2k) fixed: effects with special characters (german umlauts) can now be set (fixes HTTP error code 422)
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for all devices (works also no longer with Light Panels since firmware update)

### 0.8.1 (2019-01-31)
* (daniel_2k) new: rhythm module mode (microphone/AUX input) can be changed
* (daniel_2k) changed: removed fixed effects *Solid* and *Dynamic* for Canvas because not supported
* (daniel_2k) fixed: Rhythm module information depending of connect state

### 0.8.0 (2019-01-27)
* (daniel_2k) changed: adapter has own nanoleaf-api lib (no dependency), because the nanoleaf-aurora-client module does not implement the nanoleaf API correctly (will be changed until this is fixed in the module)
* (daniel_2k) fixed: should now work properly with Canvas
* (daniel_2k) new: duration for brightness changes added (can be set in native part of brightness state)
* (daniel_2k) new: added compact mode
* (daniel_2k) changed: handling of device states
* (daniel_2k) fixed: command queue will not process when states are written which cannot be processed
* (daniel_2k) changed: some small code adjustments

### 0.7.0 (2019-01-20)
* (daniel_2k) new: compatible with nanoleaf Canvas
* (daniel_2k) changed: Rhythm module information is now obtained depended if it is connected or not (only Light Panels)
* (daniel_2k) changed: some small adjustments

### 0.6.1 (2018-10-13)
* (daniel_2k) fixed: command processing stopping when invalid RGB value is written to 'colorRGB'
* (daniel_2k) changed: more error logging of invalid values send to controller
* (daniel_2k) changed: adjusted types and roles

### 0.6.0 (2018-09-02)
* (daniel_2k) changed: processing commands in sequence (FIFO) ensuring that all commands are executed and avoiding hanging of the nanoleaf-controller sometimes

### 0.5.0 (2018-08-10)
* (daniel_2k) changed: automatically reconnect attemps will be done in any case of connection failures (fixes no reconnect when device hung and was restarted)
* (daniel_2k) new: default minimum values for polling intervals in adapter
* (daniel_2k) new: static effects 'Solid' and 'Dynamic' added to effect states
* (daniel_2k) changed: save settings in admin is only possible when all fields filled
* (daniel_2k) changed: optimized debug logging

### 0.4.1 (2018-07-13)
* (daniel_2k) added automatic testing via Travis and Appveyor
* (daniel_2k) preparations for official repository

### 0.4.0 (2018-06-11)
* (daniel_2k) changed: Authorization token will be obtained now in the adapter settings (not on adapter start)
* (daniel_2k) fixed: some texts in the old adapter settings (Admin2)
* (daniel_2k) new: State 'effect' now contains all possible states (auto updated)
* (daniel_2k) changed: updated AuroraAPI version to 1.2.2

### 0.3.0 (2018-05-12)
* (daniel_2k) new: state "ColorRGB" for controlling color with hex RGB values
* (daniel_2k) changed: updating states from API only when value changed
* (daniel_2k) changed: state effectsList will now be written as a semicolon seperated list to use it with "Select ValueList" widget in ioBroker visualization
* (daniel_2k) new: debug logging
* (daniel_2k) changed: set units for states "saturation" and "hue"

### 0.2.0 (2018-05-03)
* (daniel_2k) adjusted types and roles of states according API JSON response data types
* (daniel_2k) compatible with node.js 4.x

### 0.1.0 (2018-04-23)
* (daniel_2k) initial release

## License
The MIT License (MIT)

Copyright (c) 2025 daniel_2k <daniel_2k@outlook.com>