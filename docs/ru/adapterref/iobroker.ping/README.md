---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ping/README.md
title: PING-адаптер
hash: LDbyttY0mdNFu/LDvx8N6gl+/QVaYqWwZ2tlkeqZuQc=
---
![Логотип](../../../en/adapterref/iobroker.ping/admin/ping.png)

![Количество установок](https://iobroker.live/badges/ping-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.ping.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.ping/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/ping/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ping.svg)

# PING-адаптер

## Пингует настроенные IP-адреса.

Отправляет ping-запросы на указанные IP-адреса с заданным интервалом и отслеживает результаты.

Также можно отслеживать TCP-порты, указав номер порта после IP-адреса с двоеточием (например, `192.168.1.1:80` или `google.com:443` Это позволит проверить доступность порта вместо использования ICMP-пинга.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Пинг от `javascript` адаптер

С помощью команды ping можно проверить доступность любого IP-адреса через JavaScript-адаптер:

```js
sendTo('ping.0', 'ping', '192.168.1.1', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1", "alive": true, "ms": 250}}
});
```

Вы также можете проверить TCP-порты:

```js
sendTo('ping.0', 'ping', '192.168.1.1:80', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"host": "192.168.1.1:80", "alive": true, "ms": 15}}
});
```

## Известные проблемы

- Если не удаётся проверить связь с вашим Linux-клиентом, проверьте, если... `iputils-ping` корректно установлен на клиентском компьютере.

- `ping` Для выполнения этой команды в Linux требуются права root.

Вы можете предоставить адаптеру права на выполнение `ping` выполнить команду от имени root.

Для этого необходимо добавить следующую строку в файл. `/etc/sudoers` файл с `sudo visudo` команда: `iobroker ALL=(ALL) NOPASSWD: /bin/ping`.

Или вы можете разрешить выполнение команды ping следующим образом: `sudo setcap cap_net_raw+ep /bin/ping` команда.

Вам необходимо установить `setcap` с `sudo apt-get install libcap2-bin` перед тем, если `setcup` не найдено.

## Устройства, пробуждающие спящего человека (например, iPhone)

Некоторые устройства, особенно iPhone в режиме глубокого сна, не отвечают на стандартный ICMP-пинг. Для надежного обнаружения таких устройств адаптер может отправить серию из 10 пустых UDP-пакетов на порт 5353 (mDNS), что пробуждает устройство, выжидает одну секунду, а затем выполняет обычный пинг для подтверждения доступности.

Включите параметр **"Пробуждать перед пингом"** для отдельных устройств в таблице "Устройства".

Пакет данных отправляется самим адаптером (аналогично тому, как это делается в других случаях). `hping3 -2 -c 10 -p 5353 -i u1 -q <IP>`), поэтому никаких дополнительных инструментов устанавливать не нужно, и он работает на всех платформах.

## Размер упаковки

Некоторые устройства отвечают только на эхо-запросы определенного размера. Например, IP-интерфейс KNX 730 компании Weinzierl отвечает на 32 байта данных, отправляемых Windows, но не на 56 байтов, отправляемых Linux.

Введите количество байтов данных в столбце **«Размер пакета»** таблицы «Устройства» (0-65500). Адаптер передает его в качестве параметра. `-s` к `ping` на Linux, macOS и FreeBSD, а также в качестве `-l` к `ping.exe` В Windows. Оставьте это поле пустым, чтобы установить значение по умолчанию.

## Проверка TCP-порта

Начиная с версии 1.8.0, вы также можете проверить TCP-порты, указав номер порта после IP-адреса с двоеточием (например, `192.168.1.1:80`).

Вместо использования ICMP-пинга адаптер будет проверять доступность TCP-порта.

Для IPv6-адреса укажите его в скобках (например, `[fd00::1]:80`). IPv6-адрес без скобок (например, `fd00::1`) всегда проверяется с помощью пинга, как и тот, что в скобках без указания порта (`[fd00::1]` отправлен пинг как `fd00::1` В macOS и FreeBSD пинг IPv6-адресов осуществляется с помощью команды ping. `ping6`.

Порт должен быть в диапазоне от 1 до 65535. Адрес с другим портом (например, `192.168.1.1:0` или `192.168.1.1:99999` Проверка вообще не производится: адаптер при запуске регистрирует предупреждение и сообщает, что устройство находится в автономном режиме.

## Wake-on-LAN из `javascript` адаптер

Вы можете разбудить любое устройство, отправив пакет Wake-on-LAN, используя его MAC-адрес:

```js
// Send to broadcast (255.255.255.255)
sendTo('ping.0', 'wakeOnLan', '01:23:45:67:89:AB', res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"mac": "01:23:45:67:89:AB"}}
});

// Send to a specific IP (e.g. directed broadcast)
sendTo('ping.0', 'wakeOnLan', { mac: '01:23:45:67:89:AB', ip: '192.168.1.255' }, res => {
    console.log('Result: ' + JSON.stringify(res)); // Result: {"result": {"mac": "01:23:45:67:89:AB", "ip": "192.168.1.255"}}
});
```

## Сообщение `help` для скриптов и агентов искусственного интеллекта

`sendTo('ping.0', 'help', {})` ответы `{ help, commands }`: описание сообщений `ping` и `wakeOnLan` а также состояний устройств, разработанных для агентов ИИ (например, ioBroker.pi-agent) и авторов скриптов; `commands` выводит список всех сообщений адаптера с помощью `write: true` если это что-то изменит.

## Письмо в живые состояния

Состояние каждого устройства доступно для записи и реагирует на неподтвержденные операции записи:

- **Писать `false` ** — вызывает немедленный пинг этого устройства, вне обычного интервала опроса.
- **Писать `true` ** — отправляет магический пакет [Wake-on-LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) для пробуждения устройства.

### Wake-on-LAN

Для работы функции Wake-on-LAN адаптеру необходимо знать MAC-адрес устройства. Решение этой задачи происходит в следующем порядке:

1. **MAC-адрес обнаруживается при просмотре сети** — если устройство было обнаружено во время просмотра сети, его MAC-адрес автоматически кэшируется.
2. **Поиск ARP-адреса в реальном времени** — если указанная выше функция недоступна, адаптер пытается определить MAC-адрес через ARP в момент написания.

Если MAC-адрес определить не удаётся, в журнал заносится предупреждение, и пакет не отправляется.

Пример из JavaScript-адаптера:

```js
// Trigger immediate ping
setState('ping.0.myHost.192_168_1_1', false);

// Send Wake-on-LAN magic packet
setState('ping.0.myHost.192_168_1_1', true);
```

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Fixed: Wake-on-LAN sends the right packet also for a MAC address with "-" or without separators (e.g. `01-23-45-67-89-ab`, `0123456789AB`); only ":" worked before
- (@GermanBluefox) Fixed: the message `wakeOnLan` also accepts a MAC address separated by "." (`01.23.45.67.89.ab`, `0123.4567.89ab`) and answers "Invalid MAC address" for any other input instead of failing without an answer

### 3.4.0 (2026-11-19)
- (@GermanBluefox) Added the message "help": a description of all messages for AI agents (e.g. pi-agent), and common.supportedMessages.help

### 3.3.0 (2026-11-15)
- (@GermanBluefox) Added the optional packet size per device (`ping -s` / `ping.exe -l`) for devices that only answer an echo request of a certain size, e.g. the KNX IP interface 730 of Weinzierl (#387)
- (@GermanBluefox) Updated packages

### 3.2.1 (2026-11-13)
- (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`
- (@GermanBluefox) Added: alias IDs are accepted in the web component Ping Device (#456)

### 3.2.0 (2026-11-09)
- (@GermanBluefox) Added the web components `iob-ping-device` and `iob-ping-overview` - the devices widgets "Ping Device" and "Ping Overview" for Aura and other hosts (`common.webComponents`)
- (@GermanBluefox) Devices widgets "Ping Device" and "Ping Overview": fixed the state IDs for host names with dots, devices shown by name and disabled devices
- (@GermanBluefox) Devices widget "Ping Device" shows the status of a newly selected device or instance at once instead of only after reloading; "Ping Overview" no longer mixes in devices of the previously selected instance
- (@GermanBluefox) IPv6 addresses ending in digits (e.g. `fd00::1`) are pinged now instead of being checked as a TCP port. Write the TCP port of an IPv6 address in brackets: `[fd00::1]:80`
- (@GermanBluefox) An IPv6 address in brackets without a port (e.g. `[fd00::1]`) is pinged now
- (@GermanBluefox) A TCP port outside 1-65535 (e.g. `192.168.1.1:99999`) no longer stops the adapter: the device is reported as offline and a warning is logged
- (@GermanBluefox) IPv6 addresses are pinged with `ping6` on macOS and FreeBSD, and on Windows a device that answers over IPv6 is no longer reported as offline
- (@GermanBluefox) Devices widget "Ping Device" shows the response time as soon as it is switched on in the settings; "Ping Overview" no longer fails when the instance cannot be read or has no device list

### 3.1.5 (2026-10-30)
- (@ipod86) Fixed crash "Invalid IP" when a device is configured with a host name (#445)

## License

The MIT License (MIT)

Copyright (c) 2014-2026, @GermanBluefox <dogafox@gmail.com>

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