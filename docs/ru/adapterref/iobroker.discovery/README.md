---
chapters: {"pages":{"en/adapterref/iobroker.discovery/README.md":{"title":{"en":"ioBroker Discover Adapter"},"content":"en/adapterref/iobroker.discovery/README.md"},"en/adapterref/iobroker.discovery/DEVELOPMENT.md":{"title":{"en":"Extending discovery"},"content":"en/adapterref/iobroker.discovery/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.discovery/README.md
title: ioBroker Discover Adapter
hash: CSNs/AJbLv5ql9g/W6QdQW4TzEo0C7fgs/Ov6YOAgLw=
---
![Логотип](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![Количество установок](https://iobroker.live/badges/discovery-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.discovery.svg)
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
- коммутаторы Blackmagic ATEM
- БлеБокс
- Презентационные коммутаторы Blustream, матрицы HDBaseT/HDMI и процессоры для видеостен (blustream-mfp)
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
- openccu-lite (hm-rpc в режиме openccu-lite, один экземпляр на интерфейс; сопряжение в его настройках)
- Домашний пилот
- HomeWizard Energy
- Инверторы Hoymiles HMS (hoymiles)
- HP-lio
- Huawei SUN2000 (sun2000, sun2000-modbus)
- Hyperion.NG
- дисплеи iiyama ProLite
- ИнфлюксД
- IOmeter
- Janitza GridVis
- Keba KeContact P30
- КЛФ-200
- KNX (фактически отключен)
- Коди
- Ламетрический
- ЛГТВ
- Светификация
- Локсон
- Лупусек
- Контроллер теплового насоса Luxtronik
- Matter
- Кубик MAX!
- MAX! CUL (серийный номер)
- МакЛайтинг
- МегаД
- Mi Home Smarthome
- Miele
- Облачный сервис Miele
- Бытовая техника Miele\@home, в местных магазинах (miele-local)
- Микротик
- Мост MiLight (v6)
- Базовая станция напольного отопления Möhlenhoff Alpha 2 (alpha2)
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
- Интеллектуальная система вентиляции SIKU / Oxxify (протокол RV V2 UDP, только заводской PIN-код)
- Приставки Sky Q / Sky+HD (с пультом Sky)
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
&#x20;Если не все IP-адреса найдены, проверьте, имеет ли пользователь iobroker право на выполнение команд. `/bin/ping` Вы можете выполнить `sudo setcap cap_net_raw+p /bin/ping` добавить недостающие возможности/разрешения.

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

Диалог новый. Установка, которая была выполнена до его появления, сохраняется. `adminUI.config: "none"` в своих объектах, поскольку js-controller не переносит это вложенное поле при обновлении — адаптер исправляет его самостоятельно при запуске и регистрирует это в логе. Если кнопка настроек по-прежнему отсутствует, перезагрузите страницу администратора.

## Запланированное сканирование

По умолчанию адаптер выполняет поиск только тогда, когда диалоговое окно обнаружения в административной панели запрашивает это. В настройках экземпляра его можно настроить на самостоятельный поиск: включите параметр **«Выполнять сканирование по таймеру»** , установите интервал и выберите методы, которые он должен использовать. Если ничего не выбрано, то используются все методы. Пять минут — это минимальный допустимый интервал, и первое запланированное сканирование начинается через две минуты после запуска адаптера, поэтому загружающийся хост остается без изменений.

Сканирование, запущенное из диалогового окна обнаружения, всегда имеет приоритет — если сканирование уже выполняется в момент срабатывания таймера, этот ход пропускается, и следующий начинается через регулярные интервалы.

## Устройства в дереве объектов

В каждом завершенном сканировании ниже приводится информация о результатах. `discovery.0.devices` Один канал на устройство:

| Состояние   | Значение                                                           |
| ----------- | ------------------------------------------------------------------ |
| `address`   | IP-адрес или последовательный порт                                 |
| `name`      | Имя хоста, имя mDNS или любое другое имя, объявленное устройством. |
| `type`      | Как это было найдено: `ip`, `upnp`, `mdns`, `serial`, ...          |
| `source`    | Метод, с помощью которого был получен этот результат.              |
| `suggested` | Адаптеры, распознавшие это устройство.                             |
| `lastSeen`  | Время сканирования, в результате которого это было обнаружено.     |

`discovery.0.lastScan` Содержит время последнего завершенного сканирования. Дерево отображает именно это сканирование, а не историю: устройство, которое больше не появляется, удаляется, поэтому ничего устаревшего не остается. Полный результат, включая предложенные конфигурации экземпляра, остается там, где он был — в `system.discovery` объект.

## Разработка

Ваше устройство не найдено? Инструкции по добавлению обнаружения адаптера описаны в [файле DEVELOPMENT.md](/#/docs/adapterref/iobroker.discovery/DEVELOPMENT.md) .

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.4.1 (2026-11-19)
* (@GermanBluefox) The build checks that every adapter discovery can propose exists in the latest repository, and a weekly workflow opens an issue when one leaves it (#508). The detections for hue-extended, landroid and zwave are removed: none of these adapters exists any more
* (@GermanBluefox) A scan runs the detection for an adapter only when the adapter is in the active repository. With several active repositories their adapters now add up (before, every detection ran), a change of the active repository applies from the next scan on, and "Propose only adapters that are installed here" also holds while the repository has not been downloaded yet

### 5.4.0 (2026-11-19)
* (hobbyquaker) Detect openccu-lite from its open version answer and propose hm-rpc instances in openccu-lite mode instead of the classic ones - it has no ReGa and does not forward `init`, so neither hm-rega nor an init-based hm-rpc instance is proposed for it, even when its classic RPC ports are switched on. One instance is proposed per interface the system names in its version answer (on older systems: the interfaces its classic ports show, else HmIP-RF and BidCos-RF); the instance is then paired in its settings
* (SmarthomeElektroniker) Detect Miele@home appliances from their `_mieleathome._tcp` mDNS announcement and propose one miele-local instance for the household, with the appliance addresses in its device list
* (AlanSRU) Detect Blustream presentation switchers, matrices and video-wall processors from their `STATUS` header on telnet port 23 and propose the blustream-mfp adapter with the matching device model
* (djlex83) Detect the Möhlenhoff Alpha 2 floor heating base station from the `<TYPE>EZRCTRL…</TYPE>` of its `/data/static.xml` and propose the alpha2 adapter

### 5.3.0 (2026-11-09)
* (AlanSRU) Detect Sky Q and Sky+HD boxes from the greeting on their remote-control port 49160 and propose the sky-remote adapter
* (AlanSRU) Detect Blackmagic ATEM switchers from their `_switcher_ctrl._udp` mDNS announcement and propose the blackmagic-atem adapter
* (@GermanBluefox) The WLED detection no longer logs an error for every device with a single mDNS PTR record, finds a WLED that announces only its own service, and proposes one instance for all WLEDs, which is how the adapter works
* (@GermanBluefox) The ping on Windows no longer reads `process.env`, which does not go with compact mode
* (@GermanBluefox) `npm run test:integration` now runs every test file on Linux and macOS too - the shell had been expanding the pattern to `test/adapters` only

### 5.2.0 (2026-10-08)
* (nograx) Detect Zendure SolarFlow, Hyper and AIO devices with the local zenSDK API via mDNS and propose the zendure-solarflow adapter
* (@GermanBluefox) The Zendure proposal sets `connectionMode: local` - in the default cloud mode the instance stops at the missing cloud key and never looks for devices

### 5.1.2 (2026-10-02)
* (ChrMaass) Detect SIKU / Oxxify Smart fans with a read-only UDP broadcast and propose one siku instance for all fans
* (@GermanBluefox) The SIKU probe no longer demands both identifying parameters - the siku adapter does not either, and a fan that answers only one was being hidden from it
* (@GermanBluefox) The SIKU probe asks from a free port when UDP 4000 is taken, instead of dropping the whole detection

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