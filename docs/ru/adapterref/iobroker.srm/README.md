---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.srm/README.md
title: Адаптер диспетчера маршрутизатора Synology ioBroker
hash: YFS3n/Q8ayDhk8BKLmS4F+wW3GgcS/oBIPlGbrPADXQ=
---
![Логотип](../../../en/adapterref/iobroker.srm/admin/synology.png)

![Количество установок](http://iobroker.live/badges/srm.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.srm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.srm.svg)

# Адаптер диспетчера маршрутизатора Synology ioBroker
![Тест и выпуск](https://github.com/iobroker-community-adapters/iobroker.srm/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/srm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Описание
Это адаптер iobroker для подключения к маршрутизаторам [Синология](https://www.synology.com/). Адаптер использует API Synology для получения данных. Адаптер протестирован с версией SRM 1.3.1. и моделью маршрутизатора RT6600, но должен работать и с другими моделями.

## Использование
### Установка
Создайте новый экземпляр адаптера и введите IP-адрес вашего маршрутизатора. Порт по умолчанию — 8001. Введите имя пользователя и пароль вашего маршрутизатора. Убедитесь, что пользователь не использует 2FA.

### Объекты
Адаптер создает следующие объекты:

#### Маршрутизатор
* IPV4_IP: IP4-адрес маршрутизатора
* IPV4_status: Статус соединения IPV4
* IPV6_IP: IP6-адрес маршрутизатора
* IPV6_status: Статус соединения IPV4

#### Устройств
Таблица JSON для следующих состояний устройств:

* все: Все известные устройства
* сетка: все сетевые устройства
* онлайн: все онлайн-устройства
* online_ethernet: Все онлайн-устройства, подключенные через Ethernet
* онлайн Wi-Fi: все онлайн-устройства подключены через Wi-Fi

Каждая таблица JSON содержит следующие объекты для каждого устройства:

* подключение: Тип подключения (Eternet, Wi-Fi)
* dev_type: Тип устройства (компьютер, мобильный телефон и т. д.)
* имя хоста: имя хоста устройства
* ip6_addr: IP6-адрес устройства
* ip_addr: IP4-адрес устройства
* is_banned: Запрещено ли устройство?
* is_beamforming_on: Включено ли формирование луча?
* is_high_qos_on: включен ли высокий уровень QOS?
* is_low_qos_on: включен ли низкий уровень QOS
* is_manual_device_type: Тип устройства установлен вручную
* is_manual_hostname: Имя хоста задано вручную?
* is_online: Подключено ли устройство к сети?
* is_qos_on: включено ли QOS
* is_wireless: Подключено ли устройство через Wi-Fi?
* mac: MAC-адрес устройства
* mesh_node_id: идентификатор узла сетки
* mesh_node_name: Имя узла сетки

#### Информация
* соединение: Состояние соединения с маршрутизатором

#### Сетка
Список узлов сетки. Каждый узел сетки имеет следующие объекты:

* диапазон: диапазон восходящей линии связи
* connected_devices: Количество подключенных устройств
* current_tx_rate: Текущая скорость передачи
* current_rx_rate: Текущая скорость приема
* имя: Имя узла сетки
* network_status: Статус сети
* node_id: идентификатор узла сетки
* node_status: Статус узла сетки
* parent_node_id: идентификатор родительского узла
* signal_strength: Сила сигнала

#### Wi-Fi
Список сетей и настроек Wi-Fi. Настройки Wi-Fi можно менять только каждые 3 секунды, чтобы избежать конфликтующих изменений. Каждый узел сетки имеет следующие объекты:

* включить: включить сеть Wi-Fi (чтение/запись)
* enable_client_isolation: включить изоляцию клиента (чтение/запись)
* hide_ssid: Скрыть SSID WIFI (чтение/запись)
* mac_filter: Включить фильтр MAC (чтение)
* schedule_enable: Включить расписание для сети (чтение/запись)

## Кредиты
Этот адаптер был бы невозможен без выдающейся работы @stephan1827 (https://github.com/stephan18277), который разработал оригинальные версии этого адаптера.

Спасибо

* [Nocilas](https://github.com/nioc), предоставляющий коннектор для API Synology.
* Бесчисленные адаптеры iobroker, которые я использовал в качестве шаблона, особенно [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt).

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 1.0.0 (2024-12-12)
- (mcm1957) Adapter has been moved into iobroker-community-adapters organization
- (mcm1957) Adapter requires node.js 20 now.
- (mcm1957) Adapter requires js-controller 5 and admin 6 now.
- (mcm1957) Dependencies have been updated.

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

Copyright (c) 2024 stephan stricker <stephan.stricker@outlook.com>

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