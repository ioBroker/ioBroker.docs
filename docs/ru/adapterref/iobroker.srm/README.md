---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.srm/README.md
title: без заголовка
hash: pLlh+ui3ZfivVM1E7leCbSJ2rIsCIuyRLCK5yZuStuk=
---
![](../../../en/adapterref/iobroker.srm/admin/synology.png)

## Оглавление
- [Введение](#Введение)
- [Использование](#Использование)
- [История изменений](#История-изменений)

<a name="Introduction"></a>

## Введение
Это адаптер iobroker для подключения к маршрутизаторам [Синология](https://www.synology.com/). Адаптер использует Synology API для получения данных. Адаптер протестирован с версией SRM 1.3.1. и модель маршрутизатора RT6600, но он должен работать и с другими моделями.

Благодаря

* [Nocilas](https://github.com/nioc), поставщик соединителя для Synology API.
* Бесчисленные адаптеры iobroker, которые я использовал в качестве шаблона, особенно [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt).

<a name="Requirements"></a>

## Использование
### Монтаж
Создайте новый экземпляр адаптера и введите IP-адрес вашего маршрутизатора. По умолчанию порт 8001. Введите имя пользователя и пароль вашего маршрутизатора. Убедитесь, что пользователь не использует 2FA.

### Объекты
Адаптер создает следующие объекты:

## Маршрутизатор
* IPV4_IP: IP4-адрес маршрутизатора.
* IPV4_status: Статус соединения IPV4.
* IPV6_IP: IP6-адрес маршрутизатора.
* IPV6_status: Статус соединения IPV4.

## Устройств
В таблице JSON для следующих устройств указано:

* all: Все известные устройства.
* сетка: все сетчатые устройства.
* онлайн: все онлайн-устройства
* online_ethernet: все онлайн-устройства, подключенные через Ethernet.
* онлайн Wi-Fi: все онлайн-устройства, подключенные через Wi-Fi.

Каждая таблица JSON содержит следующие объекты для каждого устройства:

* соединение: Тип соединения (Eternet, Wi-Fi)
* dev_type: тип устройства (компьютер, мобильный телефон и т. д.).
* имя хоста: имя хоста устройства.
* ip6_addr: IP6-адрес устройства.
* ip_addr: IP4-адрес устройства.
* is_banned: Забанено ли устройство?
* is_beamforming_on: включено ли формирование луча?
* is_high_qos_on: включен ли высокий QOS?
* is_low_qos_on: включен ли низкий QOS
* is_manual_device_type: установлен ли тип устройства вручную.
* is_manual_hostname: задано ли имя хоста вручную.
* is_online: находится ли устройство в сети?
* is_qos_on: включено ли качество обслуживания?
* is_wireless: подключено ли устройство через Wi-Fi?
* mac: MAC-адрес устройства
* mesh_node_id: идентификатор узла сетки.
* mesh_node_name: Имя узла сетки.

## Информация
* соединение: Статус соединения с роутером.

## Сетка
Список узлов сетки. Каждый узел сетки имеет следующие объекты:

* диапазон: диапазон восходящей линии связи
* linked_devices: количество подключенных устройств.
* current_tx_rate: текущая скорость передачи.
* current_rx_rate: текущая скорость приема.
* name: Имя узла сетки.
* network_status: Статус сети.
* node_id: идентификатор узла сетки.
* node_status: Статус узла сетки.
*parent_node_id: идентификатор родительского узла.
* signal_strength: мощность сигнала.

## Wi-Fi
Список сетей Wi-Fi и настройки. Настройки Wi-Fi можно изменять только каждые 3 секунды, чтобы избежать противоречивых изменений. Каждый узел сетки имеет следующие объекты:

* Enable: Включить сеть Wi-Fi (чтение/запись)
* Enable_client_isolation: Включить изоляцию клиента (чтение/запись).
*ide_ssid: скрыть SSID WIFI (чтение/запись)
* mac_filter: Включить MAC-фильтр (читать)
* Schedule_enable: включить расписание для сети (чтение/запись)

### Часовой
Что такое Sentry.io и что передается на серверы этой компании? `Sentry.io` — это сервис для разработчиков, позволяющий получить обзор ошибок в их приложениях. И именно это реализовано в этом адаптере.

При сбое адаптера или возникновении другой ошибки кода это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, тогда также включается ваш установочный идентификатор (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, адресе электронной почты, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуло такая ошибка.

<a name="Revision-History"></a>

## Changelog
### 0.2.0 (2023-12-27)
- Added new section for WIFI settings. Some settings can be changed via the adapter.
- Account for different API versions

### 0.1.6 (2023-12-26)
- Account for different API versions

### 0.1.5 (2023-12-10)
- minor bug fixes

### 0.1.3 (2023-12-06)
- minor bug fixes

### 0.1.2 (2023-12-05)
- minor bug fixes

### 0.1.1 (2023-12-05)

- enabled NPM deployment

### 0.1.0 (2023-12-05)

- first public release

### Version 0.0.1

- initial release

## License
MIT License

Copyright (c) 2023 stephan stricker <stephan.stricker@outlook.com>

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