---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovery/README.md
title: ioBroker Discover Adapter
hash: X3SY9ZPlBJsU/Snzgrqnks0O8fKV3QmZKmckHXi2IWE=
---
![Логотип](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Количество установок](http://iobroker.live/badges/discovery-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.discovery.svg)
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# ioBroker Discover Adapter

**Обнаружение устройств всеми известными методами.**

Это специальный адаптер, который пытается найти все возможные устройства, доступные с хоста iobroker. В настоящее время он может обнаруживать устройства через ping и UPnP (планируется поддержка последовательного порта).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Действительно поддержано

### Автоматически обнаружено

- Агент DVR
- Air-Q
- Автодартс
- Awtrix 3 / Awtrix Light
- 3D-принтеры Bambu Lab
- Бекхофф ПЛК
- БлеБокс
- Bosch Smart Home
- Bose Soundtouch
- Бродлинк
- BSBLan
- Шина CAN (интерфейс SocketCAN)
- Chromecast
- 3D-принтеры Creality
- CUL / culfw (Серийный номер)
- климат-контроль Daikin
- деКонц
- Денон / Маранц
- Сборщик данных инвертора Deye
- DoorBird
- DS18B20 1-проводные датчики
- Дюна HD
- e3dc-rscp
- эбус
- ключ
- USB-передатчик Elero (серийный номер 38400)
- Elgato Key Light
- Эмби
- energymanager (E.ON/Solarwatt)
- енет (Юнг)
- Enigma2 / OpenWebif
- Шлюз EnOcean (серийный номер 57600)
- Epson Stylus PX830
- ESPHome
- evcc
- Факероку (гармония)
- Феллер зептрион
- ФХЕМ
- FireTV
- Фрегат
- Фрицдетк
- Фрониус
- Фронтир\_кремний
- Полностью киосковый браузер
- Вилки G-Homa
- Инверторы GoodWe
- Govee (LAN API)
- Гармония
- Хеос
- Домашний помощник
- Homematic CCU (hm-rpc, hm-rega)
- Домашний пилот
- HomeWizard Energy
- Инверторы Hoymiles HMS (hoymiles)
- HP-lio
- Huawei SUN2000 (sun2000, sun2000-modbus)
- Расширенный оттенок
- Гиперион.НГ
- дисплеи iiyama ProLite
- ИнфлюксД
- IOmeter
- Яница ГридВис
- Keba KeContact P30
- КЛФ-200
- KNX (фактически отключен)
- Коди
- Ламетрический
- Лэндроид
- ЛГТВ
- Светификация
- Локсон
- Лупусек
- Контроллер теплового насоса Luxtronik
- Иметь значение
- Кубик MAX!
- MAX! CUL (серийный номер)
- МакЛайтинг
- МегаД
- Mi Home Smarthome
- Miele
- Облачный сервис Miele
- Микротик
- Мост MiLight (v6)
- Мпд
- Музыкальный подкаст
- myDlink
- Датчики Mysensors USB/Serial (9600, 38400, 57600, 115200)
- мойvбус
- Световые панели nanoleaf / Холст
- Инструменты .NET
- NSPanel Lovelace UI
- Nuki расширенный
- Нуки2
- Орех
- Онкио
- ONVIF-камеры
- OpenHAB
- OpenKNX
- Philips HUE
- Пи-хол
- Пинг
- PlayStation 4 / 5
- Плекс
- Проксмокс
- Аккумуляторы Pylontech / Pytes (серийный номер 115200)
- Камеры Reolink
- Resol / VBus
- RFLink (последовательный порт 57600 бод)
- SamsungTV
- Schwörer VentCube
- Шелли
- Зигения
- Сигенерги
- Шлюз SMA SEMP (Sunny Home Manager)
- Сма-ем
- Смаппи
- Головки для считывания показаний интеллектуальных счетчиков (SML)
- Солакон ОН
- Солнечное лого
- Зоннен
- sonnenCharger
- Sonoff / Tasmota
- Сонос
- Sony Bravia
- SQL (MySQL, MSSQL, PostgreSQL)
- SqueezeboxRPC
- Stiebel-Eltron/Tecalor ISG (plus)
- Синология
- TP-Link Tapo
- ТР-064
- Традфри
- UPnP
- ValloxMV
- Виктрон ГХ
- ВиктронСербо
- Вайссманн (через vcontrold)
- Volumio
- Wifilight
- Беспроводная сеть M-Bus (янтарный джойстик)
- WLED
- Ямаха
- Свет
- Z-Wave USB (протестировано в лаборатории Aeon)
- Координаторы Zigbee (последовательные)
- Zigbee2MQTT

### Предлагается в качестве дополнительных адаптеров.

- Облако
- eCharts (доступно при наличии адаптера для просмотра истории)
- История (если не найдены базы данных SQL или InfluxDB)
- Информация (iQontrol)
- Интернет вещей
- Джарвис
- JavaScript
- SQL (SQLite)
- Вис 2
- Веб

## Если адаптер не может найти IP-адреса...

Адаптер отправляет ping-запросы в сеть по IP-адресу текущего хоста (xyz1..255). Кроме того, для определения IP-адресов используются UPnP и mDNS.\
&#x20;Если не все IP-адреса найдены, проверьте, имеет ли пользователь iobroker право на выполнение команд.`/bin/ping` Вы можете выполнить`sudo setcap cap_net_raw+p /bin/ping` добавить недостающие возможности/разрешения.

## Все

- артнет? (Блюфокс)
- B-Control-Em? (Bluefox)
- cul / maxcul (Синяя лиса)
- Foobar200 (Установщик)
- fritzbox (ruhr70)
- км200 (франкшута)
- megaesp (ausHaus)
- Modbus (Bluefox)
- mqtt/mqtt-client (Bluefox)
- owfs (Синяя лиса)
- rpi2 (если ioBroker работает на Raspberry Pi)
- rwe-smarthome (PArns)
- s7 (Синяя лиса)
- умный счетчик (Apollon77)
- unifi (jens-maus)
- волк (улыбающийся Джек)
- xs1 (откровенная шутка)

## Настройки экземпляра

В этом экземпляре есть диалоговое окно настроек с двумя вкладками. В **разделе «Настройки»** находится кнопка _«Начать сканирование сейчас»_ , отображается текущее состояние сканирования (ход выполнения, найденные устройства, предложенные адаптеры) и вся информация ниже; в разделе «Устройства» перечислены **устройства,** обнаруженные в ходе последнего сканирования.

Диалог новый. Установка, которая была выполнена до его появления, сохраняется.`adminUI.config: "none"` в своих объектах, поскольку js-controller не переносит это вложенное поле при обновлении — адаптер исправляет его самостоятельно при запуске и регистрирует это в логе. Если кнопка настроек по-прежнему отсутствует, перезагрузите страницу администратора.

## Запланированное сканирование

По умолчанию адаптер выполняет поиск только тогда, когда диалоговое окно обнаружения в административной панели запрашивает это. В настройках экземпляра его можно настроить на самостоятельный поиск: включите параметр **«Выполнять сканирование по таймеру»** , установите интервал и выберите методы, которые он должен использовать. Если ничего не выбрано, то используются все методы. Пять минут — это минимальный допустимый интервал, и первое запланированное сканирование начинается через две минуты после запуска адаптера, поэтому загружающийся хост остается без изменений.

Сканирование, запущенное из диалогового окна обнаружения, всегда имеет приоритет — если сканирование уже выполняется в момент срабатывания таймера, этот ход пропускается, и следующий начинается через регулярные интервалы.

## Устройства в дереве объектов

В каждом завершенном сканировании ниже приводится информация о результатах.`discovery.0.devices` Один канал на устройство:

| Состояние   | Значение                                                           |
| ----------- | ------------------------------------------------------------------ |
| `address`   | IP-адрес или последовательный порт                                 |
| `name`      | Имя хоста, имя mDNS или любое другое имя, объявленное устройством. |
| `type`      | Как это было найдено:`ip` ,`upnp` ,`mdns` ,`serial` , ...          |
| `source`    | Метод, с помощью которого был получен этот результат.              |
| `suggested` | Адаптеры, распознавшие это устройство.                             |
| `lastSeen`  | Время сканирования, в результате которого это было обнаружено.     |

`discovery.0.lastScan` Содержит время последнего завершенного сканирования. Дерево отображает именно это сканирование, а не историю: устройство, которое больше не появляется, удаляется, поэтому ничего устаревшего не остается. Полный результат, включая предложенные конфигурации экземпляра, остается там, где он был — в`system.discovery` объект.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.1.1 (2026-08-31)
* (bluefox) The ping scan says so when this host may not send ICMP and sweeps the range over TCP instead (#247)
* (bluefox) The scan can now run on a timer, with a selectable set of methods - mdns, ping, udp and upnp by default
* (bluefox) Every finished scan writes the devices it found below `discovery.0.devices`
* (bluefox) The instance has settings again: two tabs with a start button, the live scan state and the device list
* (bluefox) The device tab is a real table now: sortable, filterable, and it fills itself from `system.discovery`
* (bluefox) The device table shows the icon of every proposed adapter that is installed on this host
* (bluefox) A scheduled scan raises a notification when it proposes something that was not proposed before
* (bluefox) The texts of the settings dialog moved into `admin/i18n`, complete in all eleven languages
* (bluefox) `adminUI.config` is repaired at start-up, js-controller does not update that field on an upgrade
* (bluefox) The adapter was refactored to TypeScript: sources moved to `src/`, the build output to `build/`
* (bluefox) Minimum node.js version is 22.19.0 now

### 5.0.1 (2026-07-03)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (Eistee82) Fix Hoymiles HMS discovery: correct a require path and align native config with hoymiles 0.3.4 device-array schema
* (iobroker-bot) Adapter requires node.js >= 20 now.
* (UncleSamSwiss) Remove obsolete squeezebox adapter
* (GermanBluefox) Packages were updated
* (GermanBluefox) Added victron-cerbo

### 5.0.0 (2024-07-21)
* (bluefox) Packages updated
* (bluefox) Minimum node.js version is 18.x
* (bluefox) Updated licenses for knx and jarvis

### 4.5.0 (2024-04-21)
* (pr0crstntr) Added Air-Q

### 4.4.0 (2024-02-23)
* (klein0r) Added WLED
* (klein0r) Added LaMetric
* (Jey-Cee) Removed net-tools from proposals

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.discovery/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2017-2026, Denis Haev ak Bluefox <dogafox@gmail.com>

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