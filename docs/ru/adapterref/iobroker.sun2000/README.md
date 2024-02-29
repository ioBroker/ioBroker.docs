---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sun2000/README.md
title: ioBroker.sun2000
hash: a3pmSgJgqCKwxvaD23HPvou7PLFe5lcGEv0u2dfoeSw=
---
![Логотип](../../../en/adapterref/iobroker.sun2000/admin/sun2000.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.sun2000.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sun2000.svg)
![Количество установок](https://iobroker.live/badges/sun2000-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/sun2000-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sun2000.png?downloads=true)

# IoBroker.sun2000
**Тесты:** ![Тестирование и выпуск](https://github.com/bolliy/ioBroker.sun2000/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.**\ Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!\ Отчеты Sentry используются, начиная с js-контроллера. 3.0.

## Адаптер sun2000 для ioBroker
Считайте данные регистра инвертора Huawei SUN2000 и аккумулятора LUNA2000 с помощью Modbus TCP.

Не стесняйтесь следить за обсуждениями на немецком языке [форум iobroker](https://forum.iobroker.net/topic/71768/test-adapter-sun2000-v0-1-x-huawei-wechselrichter).

Определение интерфейса Modbus инвертора (выпуск 5, 16 февраля 2023 г.): https://forum.iobroker.net/assets/uploads/files/1699119419919-solar-inverter-modbus-interface-definitions-v5.pdf

Определение интерфейса Modbus SdongleA (выпуск 2, 20 апреля 2023 г.): https://photomate.zendesk.com/hc/en-gb/articles/7275970817437-SDongleA-MODBUS-Interface-Definitions

## Поддерживаемое оборудование
* Инвертор HUAWEI серии SUN2000 (M0,M1)
* HUAWEI Smart Dongle-WLAN-FE / мин. Версия программного обеспечения: V100R001C00SPC133 (SDongleA-05)
* Аккумулятор HUAWEI Luna2000
* Интеллектуальный датчик мощности HUAWEI DTSU666-H или DDSU666-H

[Информация о продукте Huawei](https://solar.huawei.com/en/professionals/all-products?residential-smart-pv)

## Список функций
* Можно обработать максимум 5 инверторов (главный/подчиненный), каждый с аккумуляторным модулем (макс. 15 кВтч).
* Значения в реальном времени, такие как входная мощность, выходная мощность, мощность зарядки/разрядки и потребление сети, считываются через фиксированный интервал.
* Состояния записываются только для измененных данных преобразователя. Это снижает нагрузку на экземпляр iobroker.
* Состояния «inputPower» или «activePower» в «собранном» пути можно отслеживать с помощью триггерного элемента «было обновлено». Потому что эти состояния всегда записываются в заданном интервале.
* modbus-proxy: Сторонние устройства, такие как настенная коробка, энергоменеджер и т. д., могут получать данные, даже если интерфейс Modbus инвертора уже используется. Кроме того, вы можете зеркально отразить данные sun2000 на другом экземпляре ioBroker.

## Основные настройки
* `address`: IP-адрес инвертора.
* `port`: порт Modbus инвертора (по умолчанию: 502).
* `modbusIds`: идентификаторы инверторов, разделенные знаком "," (по умолчанию: 1, максимум 5 инверторов)
* `updateInterval`: интервал быстрого обновления (по умолчанию: 20 секунд, минимум 5 секунд на инвертор)

## Синхронизация Modbus
* `timeout`: тайм-аут соединения Modbus (по умолчанию: 10000 мс)
* `delay`: задержка между запросами Modbus (по умолчанию: 0 мс)
* `connect Delay`: задержка после подключения Modbus (по умолчанию: 5000 мс)
* `auto-adjust`: автоматическая настройка настроек Modbus.

## Modbus-прокси
* `active`: активировать службу mobus-proxy (по умолчанию: false)
* `ip адрес`: IP-адрес Modbus-прокси (обычно: 0.0.0.0)
* TCP-порт: TCP-порт Modbus-прокси (обычно: 502).
* `SDongle modbus ID`: Идентификатор SDongle modbus (обычно: 100) требуется для виртуального счетчика.

## Настройка инверторов
Чтобы использовать соединение Modbus, все устройства Huawei должны использовать последнюю версию прошивки. Вы можете выполнить последнюю версию прошивки непосредственно на портале FusionSolar в разделе «Обновления».
В настройке FusionSolar вам все равно необходимо активировать Modbus на ключе WLAN и установить авторизацию доступа. Загрузите приложение FusionSolar на свой мобильный телефон и используйте его для прямого подключения через точку доступа WLAN инвертора.
После нажатия на `Me` (Ich) в меню нижнего колонтитула > `Commission Device` («Inbetriebnahme des Geräts») > `log in` (am Wechselrichter anmelden).

Для входа в приложение как `installer` обычно требуется пароль: `00000a` или `0000000a`. Вам также может потребоваться пароль для подключения к собственной WLAN инвертора: `Changeme`.

После входа в систему инвертора перейдите к `Settings` (Einstellungen) > `Communication configuration` (Конфигурация связи) > `Dongle parameter settings` (Параметры ключа) > `Modbus TCP` > Активируйте `connection without restriction` ( Verbindung uneingeschränkt aktivieren). Вы также можете ввести адрес связи Modbus и одновременно его считывать.
Если вы используете два инвертора, то подключитесь ко второму инвертору и там же прочитайте адрес связи.

[Как активировать Modbus TCP - с форума Huawei](https://forum.huawei.com/enterprise/en/modbus-tcp-guide/thread/789585-100027)

## Вдохновение
Разработка этого адаптера была вдохновлена обсуждениями в ветке форума https://forum.iobroker.net/topic/53005/huawei-sun2000-iobroker-via-js-script-funktioniert и javascript iobroker https://github. com/ChrisBCH/SunLuna2000_iobroker.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

**WORK IN PROGRESS**
* detect standby mode of inverters (#34)
* devices in standby often give incorrect values. These are assigned "0" (#40)
* the modbus register and the length are stored in the description of the states
* implemented modbus-proxy (read-only cache)
* read register data from SDongleA 
* register for 

### 0.3.1 (2024-02-12)
* state `sun2000.0.collected.chargeDischargePowercharge` is not always refreshed #47

### 0.3.0 (2024-02-10)
* add battery unit information for example temperature #40
* modbus timeout, connect delay and delay can be configured #34
* device status as plain text `sun2000.0.inverter.x.derived.deviceStatus`
* Introduction of a driver model. A separate driver can be created for each device #41

### 0.2.1 (2024-02-02)
* Requirements from [Add sun2000 to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3219)

### 0.2.0 (2024-01-24)
* [Add sun2000 to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3219)
* improve error handling (#34)
* add simple optimizer info 
* Riemann sum of input power with energy loss for new state `dailySolarYield`
* try to recreate the `yield today` from the fusion portal

### 0.1.3 (2024-01-17)
* display the data from PV strings (#27)
* optimize the timing of interval loop
* improved handling of read timeouts from more then 2 inverters

### 0.1.2 (2024-01-12)
* fix: no Data if interval less 20 sec (#24)
* prepare collected values more precisely
* expand up to 5 inverters #18
* fix: problems with multiple inverters

### 0.1.1 (2024-01-07)
* fix some collected values

### 0.1.0 (2024-01-06)
* watchdog implemented #11
* state values are cached - only changed data should be stored 
* derived and collected values for example `inputPowerEffective` or `inputYield`
* deploy more register

### 0.0.2 (2023-12-19)
Dependency and configuration updates

### 0.0.1 
initial release

## License
MIT License

Copyright (c) 2024 bolliy <stephan@mante.info>

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