---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.srm/README.md
title: ioBroker Synology Router Manager Adapter
hash: L/sDzxFuzO5MrbiD0JsqFaT+X858q6VJQtmg9BUW+Sk=
---
![Логотип](../../../en/adapterref/iobroker.srm/admin/srm.png)

![Количество установок](http://iobroker.live/badges/srm.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.srm.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.srm/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/srm/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.srm.svg)

# ioBroker Synology Router Manager Adapter

## Описание

Это адаптер iobroker для подключения к маршрутизаторам [Synology](https://www.synology.com/) . Адаптер использует API Synology для получения данных. Адаптер протестирован с версией SRM 1.3.1 и моделью маршрутизатора RT6600, но должен работать и с другими моделями.

## Использование

### Установка

Создайте новый экземпляр адаптера и введите IP-адрес вашего маршрутизатора. Порт по умолчанию — 8001. Введите имя пользователя и пароль вашего маршрутизатора. Убедитесь, что пользователь не использует двухфакторную аутентификацию.

### Объекты

Адаптер создает следующие объекты:

#### маршрутизатор

- IPV4\_IP: IP4-адрес маршрутизатора
- IPV4\_status: Состояние соединения IPV4
- IPV6\_IP: IP6-адрес маршрутизатора
- IPV6\_status: Состояние соединения IPV4

#### устройства

В JSON-таблице для следующего устройства указаны следующие данные:

- все: Все известные устройства
- mesh: Все mesh-устройства
- онлайн: Все устройства с доступом в интернет
- online\_ethernet: Все устройства, подключенные к сети через Ethernet.
- Онлайн Wi-Fi: Все устройства, подключенные к сети через Wi-Fi.

Каждая JSON-таблица содержит следующие объекты для каждого устройства:

- Тип подключения: (Eternet, Wi-Fi)
- dev\_type: Тип устройства (компьютер, мобильное устройство и т. д.)
- hostname: Имя хоста устройства
- ip6\_addr: IP6-адрес устройства
- ip\_addr: IP4-адрес устройства
- is\_banned: Запрещено ли данное устройство?
- is\_beamforming\_on: Включено ли формирование луча?
- is\_high\_qos\_on: Включена ли высокая скорость QoS?
- is\_low\_qos\_on: Включен ли низкий уровень QoS?
- is\_manual\_device\_type: Указан ли тип устройства вручную?
- is\_manual\_hostname: Задано ли имя хоста вручную?
- is\_online: Устройство подключено к сети?
- is\_qos\_on: Включено ли QoS?
- is\_wireless: Подключено ли устройство через Wi-Fi?
- mac: MAC-адрес устройства
- mesh\_node\_id: Идентификатор узла сетки
- mesh\_node\_name: Имя узла сетки

#### информация

- Подключение: Состояние подключения к маршрутизатору

#### сетка

Список узлов сетки. Каждый узел сетки содержит следующие объекты:

- диапазон: диапазон Uplink
- connected\_devices: Количество подключенных устройств
- current\_tx\_rate: Текущая скорость передачи
- current\_rx\_rate: Текущая скорость приема
- имя: Имя узла сетки
- network\_status: Состояние сети
- node\_id: ID узла сетки
- node\_status: Состояние узла сетки
- parent\_node\_id: ID родительского узла
- signal\_strength: Уровень сигнала

#### Wi-Fi

Список сетей Wi-Fi и их настроек. Настройки Wi-Fi можно изменять только каждые 3 секунды во избежание конфликтов. Каждый узел mesh-сети имеет следующие объекты:

- включить: Включить сеть Wi-Fi (чтение/запись)
- enable\_client\_isolation: Включить изоляцию клиента (чтение/запись)
- hide\_ssid: Скрыть SSID Wi-Fi (чтение/запись)
- mac\_filter: Включить фильтр MAC-адресов (чтение)
- schedule\_enable: Включить расписание для сети (чтение/запись)

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы @stephan1827 ( <https://github.com/stephan18277> ), который разработал первые версии этого адаптера.

Благодаря

- Компания [Nocilas](https://github.com/nioc) предоставляет коннектор для API Synology.
- Бесчисленные адаптеры iobroker, которые я использовал в качестве шаблона, особенно [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt) .

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

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

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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