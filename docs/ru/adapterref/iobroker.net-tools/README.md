---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.net-tools/README.md
title: ioBroker.net-tools
hash: SbBOsflLgBbtVCz7AMnPqhsranAWeLx49H+9DHIWcUA=
---
![Логотип](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.net-tools.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![Количество установок](https://iobroker.live/badges/net-tools-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/net-tools-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)
![Тестирование и выпуск](https://github.com/jey-cee/ioBroker.net-tools/workflows/Test%20and%20Release/badge.svg)

# ioBroker.net-tools

## адаптер net-tools для ioBroker

Этот адаптер циклически опрашивает настроенные IP-адреса, может отправлять пакеты Wake-on-LAN и сканировать открытые порты.

Эта функция обнаружения предоставляется адаптером обнаружения, что означает, что обнаружение будет установлено, если он еще не установлен, и его необходимо запустить. Примечание: Эта функция ограничена подсетью хоста ioBroker.

### Важно: Для использования этого адаптера необходимо приобрести лицензию. Вы можете приобрести её здесь -> <https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/>

### Важная информация: Для адаптеров Nutzung необходимо использовать дополнительные лицензии. Sie können eine hier kaufen -> <https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/>

### Автоматическое обнаружение

Функция автоматического поиска устройств также доступна по расписанию. Примечание: если вы используете ioBroker внутри контейнера Docker, эта функция не будет работать в зависимости от конфигурации вашей сети.

### Пинг настроенных IP-адресов

Отправляет пинги на указанные IP-адреса с заданным интервалом и отслеживает результаты (активность, RPS, время). Интервал пинга можно задать на уровне устройства.

#### Задержка и потеря пакетов

Каждый пинг отправляет несколько пакетов (настройка параметра "Пакетов на пинг" устройства, по умолчанию 4, максимум 20). На основе полученных ответов net-tools вычисляет:

| Состояние                       | Значение                                                         |
| ------------------------------- | ---------------------------------------------------------------- |
| `ping`                          | Время прохождения последнего ответа в обе стороны (мс)           |
| `pingMin` /`pingMax` /`pingAvg` | Минимальное/максимальное/среднее время кругового пути пинга (мс) |
| `packetLoss`                    | Потерянные пакеты пинга в процентах                              |

Времена остаются без ответа. `null` и `packetLoss` равно 100. Каждый пинг занимает примерно одну секунду на пакет.

#### Расширенное обнаружение (смартфоны)

Смартфоны, такие как iPhone, часто не отвечают на пинги в спящем режиме и отображаются как офлайн. Включите «Расширенное обнаружение (смартфоны)» в настройках устройства (диспетчер устройств). Если устройство не отвечает на пинг, net-tools отправляет UDP-пакет на порт 5353 и пытается установить TCP-соединение с портом 62078, что активирует беспроводную сеть устройства, а затем проверяет, отвечает ли устройство на ARP-запрос своим MAC-адресом. Для этого не требуются права root и дополнительные инструменты (например, hping3).

- Работает только для устройств в подсети хоста ioBroker (ARP не проходит через маршрутизаторы).
- В Linux проверяется состояние записи ARP (`ip neigh` Поэтому устаревшие записи не учитываются. В других системах используется таблица ARP, которая может показывать, что устройство присутствовало некоторое время после того, как оно покинуло систему.
- iPhone: установите для домашней сети параметр «Частный Wi-Fi-адрес» в положение «Фиксированный» или «Выкл.». При выборе параметра «Постоянный» MAC-адрес изменяется, и устройство перестает обнаруживаться.

#### Мониторинг сервисов (TCP ping)

В настройках устройства (диспетчере устройств) можно добавить службы в таблице «Службы (TCP-порты)». Каждая запись имеет свои собственные настройки:

| Столбец         | Значение                                                                                                                    |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Порт            | TCP-порт службы, например `80`, `443`, `1883`                                                                                |
| Интервал (с)    | Как часто проверяется порт. Если пусто, то интервал пинга устройства составляет минимум 5 секунд.                           |
| Допуск (отказы) | Количество подряд неудачных проверок, которые игнорируются до того, как служба отобразится как недоступная. `0` = немедленно |

net-tools пытается установить TCP-соединение с портом (таймаут 2 с) независимо от результата пинга. Состояние `net-tools.X.<device>.services.port_<port>` является `true` если соединение было установлено и `false` После того, как более чем одна проверка "Допуск" подряд не пройдена, состояния портов, удаленных из таблицы, удаляются. Изменения вступают в силу немедленно.

### Wake-on-LAN

Установите для объекта wol значение true, и на ваше устройство будет отправлено 3 пакета WOL с паузой в 750 мс.

### сканирование портов

В конфигурации можно указать список портов или диапазон, которые должны сканироваться по умолчанию. Если это поле пустое, по умолчанию будет использоваться диапазон 0-65535. Также можно указать список или диапазон для каждого устройства, который будет использоваться для одного сканирования.

При желании укажите список или диапазон портов в объекте portList. Это переопределит настройку в файле config. Установите параметр scan в значение true, и система просканирует все открытые порты в диапазоне 0-65535 или в соответствии с параметрами, заданными в portList. Этот процесс займет некоторое время. Результат будет записан в объект ports.

---

### iPhone

В iPhone при изменении MAC-адреса предпринимаются попытки защитить пользователей от отслеживания. Подробнее об этом и о том, как отключить эту функцию для частных сетей, читайте здесь: <https://support.apple.com/en-us/102509>

---

## Для разработчиков

#### Получите Mac для конкретного устройства

`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Примечание: Эта функция доступна только в подсети хоста ioBroker.

#### Пинг конкретного IP-адреса

`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake-on-LAN

`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

Команда `'wol'` Работает тоже. Возвращает `true` если пакеты были отправлены.

#### сканирование портов

`sendToAsync('net-tools.x', 'portScan', { ip: 'IP ADDRESS', ports: '22,80,443' })`

`ports` является необязательным; без него используется список портов из настроек адаптера. Возвращает `{ host, ports: [open ports], error? }`.

#### Описание всех сообщений

`sendToAsync('net-tools.x', 'help', {})`

Возвраты `{ help, commands }`: описание всех сообщений и состояний, написанное для агентов ИИ (например, ioBroker.pi-agent) и авторов скриптов. `commands` перечисляет все сообщения с `write: true` Если это что-то изменит.

#### Blockly

Адаптер предоставляет блоки Blockly в категории "SendTo" адаптера JavaScript:

- **Ping (net-tools)** – отправляет ping-запрос на IP-адрес или имя хоста.
- **Сканирование портов (net-tools)** — сканирует порты IP-адреса или имени хоста.
- **Wake-on-LAN (net-tools)** – отправляет пакеты Wake-on-LAN на MAC-адрес.
- **net-tools device** – выбирает устройство, найденное программой net-tools, и возвращает его IP-адрес или MAC-адрес. Может быть подключен к входам IP/MAC блоков, указанных выше. IP-адрес считывается при запуске скрипта, поэтому изменения IP-адреса учитываются.
- **net-tools result** – возвращает информацию о доступности, времени ответа, открытых портах, хосте или ошибке блока ping или сканирования портов. Используйте его только внутри блока "then" этих блоков.

---

## Changelog
### **WORK IN PROGRESS**
- (@GermanBluefox) Added the message "help": a description of all messages for AI agents (e.g. pi-agent), and common.supportedMessages.help

### 1.3.0 (2026-10-11)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (Jey Cee) Migrate from oui to oui-data
- (Jey Cee) Add port scan action to device management
- (Jey Cee) Show IP address and open ports in device details
- (Jey Cee) Create quicklinks for web ports found by port scan
- (Jey Cee) Call ping.exe directly on Windows instead of using process.env (compact mode)
- (Jey Cee) Update @all-smart/all-smart-tools to 1.0.16
- (Jey Cee) Fix adapter crash when port scan runs on an offline device (#63)
- (Jey Cee) Use default port list if port list in configuration is missing or empty
- (Jey Cee) Fix sendTo commands (wake/wol, ping, getMac, addDevice, deleteDevice, updateDevice) being ignored (#71)
- (Jey Cee) Fix "Wake-on-LAN with IP" sending packets to localhost (#71)
- (Jey Cee) Wake-on-LAN: also send to the broadcast address of the device subnet, log sent packets, no endless retries on errors
- (Jey Cee) Add sendTo command portScan
- (Jey Cee) Add Blockly blocks for ping, port scan and Wake-on-LAN
- (Jey Cee) Add Blockly block to select a device found by net-tools
- (Jey Cee) Add extended detection for devices that do not answer pings while sleeping (e.g. iPhone)
- (Jey Cee) Fix changed device settings (Wake-on-LAN with IP) not being applied until restart
- (Jey Cee) Add service monitoring via TCP ping for multiple ports per device, with interval and tolerance per port
- (Jey Cee) Device settings dialog uses the available width (multi-column layout)
- (Jey Cee) Add latency (ping, min, max, avg) and packet loss per device, with configurable packets per ping
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.2.3 (2025-11-09)
* Change link to license

### 1.2.2 (2025-11-09)
* Fix ip and mac check while add manual new device

### 1.2.1 (2025-11-09)
* Refactor port scan

### 1.2.0 (2025-06-11)
* Added network interface information for localhost to device manager

## License
Attribution-NonCommercial 4.0 (CC BY-NC 4.0)

Copyright (c) 2025-2026 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

The complete license text can be found in the [LICENSE](https://github.com/Jey-Cee/ioBroker.net-tools/blob/master/LICENSE) file.

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).