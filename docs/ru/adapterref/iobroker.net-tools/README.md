---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.net-tools/README.md
title: Сетевые инструменты
hash: biyMNvPKtoKQkW+U+RYyqU3SdvcXnkGWYkH04cZN/SA=
---
![Логотип](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![Количество установок](http://iobroker.live/badges/net-tools-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.net-tools.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![Тесты](https://travis-ci.org/jey-cee/ioBroker.net-tools.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)

# Сетевые инструменты
| [Спонсоры](https://github.com/iobroker-community-adapters/ioBroker.net-tools/blob/master/SPONSORS.md) | |
|---|---|
| [![Пожертвовать](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url) | <a href="https://discord.gg/33w6jUh"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2"></a> |
| [![Пожертвовать](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/ webscr?cmd=_s-xclick&amp;hosted_button_id=95YZN2LR59Q64&amp;source=url) | <a href="https://discord.gg/33w6jUh"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2"></a> |

### Обнаружение устройств в сети
Установите для объекта обнаружения значение true, чтобы обнаруживать устройства в вашей сети, этот процесс занимает некоторое время.
Эта функция предоставляется адаптером обнаружения, что означает, что обнаружение будет установлено, если оно не установлено, и его необходимо запустить.

Примечание. Эта функция ограничена подсетью хоста ioBroker.

### Добавить ручные устройства
Если вы добавляете устройство вручную, то можете оставить MAC пустым, адаптер попытается его получить.
Существует 50% вероятность того, что этот автоматический поиск завершится ошибкой и устройства не будут добавлены. В этом случае вы должны ввести MAC.

### Пингует настроенные IP-адреса
Пингует указанные IP-адреса с заданным интервалом и отслеживает результаты. (жив, об/с, время)

### Wake On LAN
Установите для объекта wol значение true, и на ваше устройство будут отправлены 3 пакета WOL с паузой в 750 мс.

### Сканирование портов
Вы можете ввести список портов или диапазон в конфиге, которые должны сканироваться по умолчанию. Если это поле не заполнено, диапазон 0-65535 будет принят по умолчанию.
Также можно указать список или диапазон для каждого устройства, которое будет использоваться для одного сканирования.

Введите список или диапазон портов в объект portList, если хотите. Это перезаписывает настройку в config.
Установите для сканирования значение true, это будет сканировать все открытые порты в диапазоне 0-65535 или то, что определено в списке портов. Этот процесс занимает некоторое время.
Результат будет записан в порты объекта.

---

## Для разработчиков
#### Получить mac для конкретного устройства
`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Примечание. Эта функция ограничена подсетью хоста ioBroker.

#### Пингуем определенный IP-адрес
`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake On LAN
`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Changelog
### 0.2.0 (2022-05-16)
 * add feature to define ports they should be scanned
 * fix crash if no MAC address can be found by the adapter

### 0.1.7 (2021-07-31)
* fix device settings in adapter configuration

### 0.1.5
* changes on testing

### 0.1.4
* fixes for js-controller 3.3

### 0.1.3
* fixes for js-controller 3.3

### 0.1.2
* added device discovery to configuration page
* start discovery if it is not started and stop it afterwards

### 0.1.1 
* initial release

## License

The MIT License (MIT)

Copyright (c) 2020-2022, Jey Cee <jey-cee@live.com>

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