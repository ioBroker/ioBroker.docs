---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ping/README.md
title: PING-адаптер
hash: f1oBwZlw077cGSMI9Js2FmSXCNkDcpI9SRK6JkzGKnM=
---
![Логотип](../../../en/adapterref/iobroker.ping/admin/ping.png)

![Количество установок](http://iobroker.live/badges/ping-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.ping.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.ping/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/ping/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ping.svg)

# Адаптер PING

## Пингует настроенные IP-адреса.

Отправляет ping-запросы на указанные IP-адреса с заданным интервалом и отслеживает результаты.

Также можно отслеживать TCP-порты, указав номер порта после IP-адреса с двоеточием (например,`192.168.1.1:80` или`google.com:443` Это позволит проверить доступность порта вместо использования ICMP-пинга.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Пинг от JavaScript-адаптера

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

- Если не удаётся проверить связь с вашим Linux-клиентом, проверьте, если...`iputils-ping` корректно установлен на клиентском компьютере.

- `ping` Для выполнения этой команды в Linux требуются права root.

Вы можете предоставить адаптеру права на выполнение`ping` выполнить команду от имени root.

Для этого необходимо добавить следующую строку в файл.`/etc/sudoers` файл с`sudo visudo` команда:`iobroker ALL=(ALL) NOPASSWD: /bin/ping` .

Или вы можете разрешить выполнение команды ping следующим образом:`sudo setcap cap_net_raw+ep /bin/ping` команда.

Вам необходимо установить`setcap` с`sudo apt-get install libcap2-bin` перед тем, если`setcup` не найдено.

## Поддержка hping3 для устройств, находящихся в спящем режиме (например, iPhone).

Некоторые устройства, особенно iPhone в режиме глубокого сна, не отвечают на стандартный ICMP-пинг. Для надежного обнаружения таких устройств адаптер может использовать`hping3` для отправки серии UDP-пакетов на порт 5353 (mDNS), что пробуждает устройство, после чего следует обычный пинг для подтверждения доступности.

Включите параметр **"Использовать hping3"** для отдельных устройств в таблице "Устройства". Адаптер работает следующим образом:

```
hping3 -2 -c 10 -p 5353 -i u1 -q <IP>
```

…затем немедленно выполняется обычный ICMP-пинг. Если hping3 не установлен, адаптер автоматически переключается на обычный пинг.

**Установка (только для Linux):** В основных настройках включите **параметр «Установить hping3, если он недоступен»** . Адаптер будет работать.`sudo apt-get install -y hping3` При запуске системы, если hping3 еще не установлен. В качестве альтернативы, установите его вручную:

```bash
sudo apt-get install hping3
```

## Проверка TCP-порта

Начиная с версии 1.8.0, вы также можете проверить TCP-порты, указав номер порта после IP-адреса с двоеточием (например,`192.168.1.1:80` ).

Вместо использования ICMP-пинга адаптер будет проверять доступность TCP-порта.

## Функция пробуждения по локальной сети (Wake-on-LAN) из JavaScript-адаптера

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

## Письмо в живые состояния

Состояние каждого устройства доступно для записи и реагирует на неподтвержденные операции записи:

- **Писать`false`** — вызывает немедленный пинг этого устройства, вне обычного интервала опроса.
- **Писать`true`** — отправляет магический пакет [Wake-on-LAN](https://en.wikipedia.org/wiki/Wake-on-LAN) для пробуждения устройства.

### Wake-on-LAN

Для работы функции Wake-on-LAN адаптеру необходимо знать MAC-адрес устройства. Решение осуществляется в следующем порядке:

1. **MAC-адрес обнаруживается при просмотре сети** — если устройство было обнаружено во время просмотра сети, его MAC-адрес автоматически кэшируется.
2. **Поиск ARP-адреса в реальном времени** — если указанный выше способ недоступен, адаптер пытается определить MAC-адрес через ARP в момент записи.

Если MAC-адрес определить не удаётся, в журнал заносится предупреждение, и пакет не отправляется.

Пример из JavaScript-адаптера:

```js
// Trigger immediate ping
setState('ping.0.myHost.192_168_1_1', false);

// Send Wake-on-LAN magic packet
setState('ping.0.myHost.192_168_1_1', true);
```

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 3.1.1 (2026-09-01)
- (@GermanBluefox) Ping says now when this host may not send ICMP at all instead of reporting every device as offline
- (@GermanBluefox) Added an optional TCP check that keeps the devices monitored on such a host (LXC container)

### 3.0.1 (2026-08-03)
- (copilot) Breaking: Adapter requires node.js >= 22 now
- (@GermanBluefox) Migrated for Admin 8

### 2.2.4 (2026-05-16)
- (@GermanBluefox) Fixing devices widgets

### 2.2.2 (2026-04-30)
- (@GermanBluefox) Added support for device manager
- (@GermanBluefox) Added devices widgets

### 2.1.0 (2026-03-04)
- (@GermanBluefox) Implemented wake-on-lan functionality
- (@GermanBluefox) Implemented pings with hping3 for sleeping devices (e.g. iPhones)

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.ping/blob/master/CHANGELOG_OLD.md)

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