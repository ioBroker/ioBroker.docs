---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.teltonika/README.md
title: ioBroker Teltonika
hash: ZsiA6OEQPKNBizl82nxkN5RI3Hd4I6HPpCzVunVT5LQ=
---
![Количество установок](http://iobroker.live/badges/teltonika-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.teltonika.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.teltonika.svg)

<img src="admin/teltonika.svg" height="100px"/>

# IoBroker Teltonika
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.teltonika/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/teltonika/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

Этот адаптер считывает данные с маршрутизаторов Teltonika через MQTT и с устройств Teltonika через SNMP.

Маршрутизаторы подключаются к адаптеру самостоятельно по протоколу MQTT. Устройства без издателя MQTT — например, управляемые коммутаторы TSW — опрашиваются по протоколу SNMP; их можно ввести на вкладке SNMP или позволить сканированию сети найти их. Маршрутизатор, предлагающий оба протокола, считывается только один раз, по протоколу SNMP.

По протоколу MQTT можно считывать следующую информацию:

- температура ('RUT2', 'RUT9', 'RUTX', 'RUT3', 'RUT1', 'TRB2', 'TRB5', 'OTD', 'RUTM', 'RUTC')
- уровень сигнала
- мобильный оператор
- состояние сети
- тип подключения (2G/3G/4G/5G)
- IP-адрес WAN
- время безотказной работы
- имя
- цифровой вход 1 ('RUT9')
- цифровой вход 2 ('RUT9')
- аналоговый вход ('RUT9', 'TRB2', 'TRB141')
- состояние контакта 2 ('TRB2')
- статус контакта 3 ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')
- статус контакта 4 ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')

## Использование
Шаги:

— Сначала запустите экземпляр.
— Зайдите в настройки маршрутизатора и откройте раздел MQTT.

  ![Настройки](../../../en/adapterref/iobroker.teltonika/img/settings.png)

- Включить отправителя MQTT
— Установите адрес MQTT-брокера равным адресу вашего экземпляра ioBroker.
- Установите порт MQTT-брокера. Важно: порт по умолчанию для этого адаптера — 1885, чтобы избежать конфликтов с другими MQTT-адаптерами.
- Сохраните настройки
— Для применения настроек некоторым маршрутизаторам требуется перезагрузка.
— Через некоторое время точки данных будут созданы в экземпляре адаптера.

**Внимание**: тестирование проводилось только с устройствами `RUTC` и `TSW202`.

### SNMP
Устройства, не поддерживающие MQTT-издатель, считывают данные по протоколу SNMP:

— Включите агент SNMP на устройстве в разделе *Службы → SNMP → Настройки SNMP* и установите сообщество только для чтения.
— В настройках адаптера откройте вкладку *SNMP*, введите диапазон адресов и нажмите *Сканировать*, или добавьте устройство вручную.
— В настоящее время поддерживаются семейства `RUTC` и `TSW2`. Другие модели возвращаются к значениям, которые всегда были у Teltonika.

Общие параметры устройства (серийный номер, имя, время работы, процессор); чтобы прочитать их полностью, загрузите MIB с устройства в раздел *Сводка по системе SNMP*, перетащите его в `MIBs/` и запустите `npm run generate-oids`

Помимо перечисленных выше значений, SNMP также предоставляет статистику по каждому порту коммутаторов (канал связи, скорость, дуплекс, переданные байты и скорость передачи данных), а также по именованным цифровым входам и выходам маршрутизатора.

Доступны еще три ветви, но по умолчанию они отключены, поскольку раскрывают местоположение устройства и идентифицируемых клиентов, а также потому, что они меняются при каждом опросе:

- *GPS-позиционирование* — широта, долгота, точность, спутники и время определения местоположения.
- *Wi-Fi радиомодули и сети* — состояние радио и канал, а также для каждого SSID — шифрование, режим и количество клиентов.
- *Сеансы точки доступа* — IP-адрес, пользователь и состояние авторизации каждого сеанса.

Таблица MAC-адресов для каждого клиента вообще не считывается, даже при включенной ветви Wi-Fi: полезная часть информации о количестве клиентов по SSID не требует постоянного обновления списка аппаратных адресов всех пользователей в дереве объектов.

### Переключение портов
Укажите *сообщество записи* для устройства, и его порты станут переключаемыми через `<device>.ports.<name>.enabled`.
Если поле оставить пустым, адаптер будет только считывать данные, и состояние будет создано без флага записи.

Коммутатор использует `ifAdminStatus` стандартного IF-MIB, поскольку MIB Teltonika не предоставляет никаких записываемых данных. **Управление PoE невозможно**: эти устройства отвечают без объектов в POWER-ETHERNET-MIB.

Порт становится переключаемым только тогда, когда его имя точно совпадает с именем одного интерфейса. На TSW202 это относится ко всем портам, поскольку в обеих таблицах указано `port1`…`port8`. RUTC сообщает о четырех портах с именем `LAN` для интерфейсов `lan1`…`lan4`, которые невозможно с уверенностью связать, поэтому переключаемым является только его порт `WAN`.

### Виджеты для диспетчера устройств
Для адаптера *устройств* зарегистрированы два компонента:

- **Устройства Teltonika** — каждый маршрутизатор и коммутатор экземпляра представлен в виде плитки: доступность, полоса, показывающая

Состояние соединения каждого порта, а для маршрутизатора — оператор, тип соединения и сигнал. При нажатии открывается полная информация, включая переднюю панель, цифровые входы и выходы, а также WAN-адреса.

- **Порты Teltonika** — передняя панель отдельного устройства на отдельной панели с указанием типа соединения, скорости, дуплекса и т. д.

Передаётся байтов на порт. Порты отображаются так, как они указаны на оборудовании: нечётные номера в верхнем ряду, чётные — в нижнем, волоконно-оптические модули объединены в отдельную группу. Устройство выбирается из выпадающего списка, который заполняет адаптер, и щелчок по плитке открывает диалоговое окно с подробными сведениями для этого конкретного устройства.

Маршрутизатор дополнительно отображает свои **WAN-интерфейсы**, которые отслеживает mwan3: имя, статус переключения на резервный канал (`online`, `standby`, `notracking`), включен ли интерфейс и как долго он активен. Обратите внимание, что столбец адреса в веб-интерфейсе здесь не имеет аналога — по протоколу SNMP mwan3 сообщает хосты, которые он пингует для оценки соединения, а не адрес, который находится на интерфейсе.

При настройке сообщества записи переключение порта возможно с панели управления. Индикатор PoE намеренно отсутствует — как указано выше, эти устройства вообще не предоставляют PoE-объекты, поэтому значок болта будет обозначать данные, которых не существует.

Виджеты обнаруживают устройства из дерева объектов, а не из конфигурации адаптера, поскольку маршрутизаторы MQTT объявляют о своем появлении, и устройства SNMP отображаются при первом опросе.

Ловушки
Адаптер может принимать SNMP-ловушки. Включите эту функцию на вкладке *SNMP* и укажите устройству этот хост в разделе *Службы → SNMP → Настройки ловушек*. Обратите внимание, что порт 162 является привилегированным в Linux, поэтому может потребоваться более высокий порт.

Каждое уведомление отображается как `<device>.traps.<name>`, содержащее время последнего поступления, а `<device>.traps.last` указывает на самое последнее уведомление. Большинство уведомлений Teltonika не содержат полезной нагрузки — из семи, определенных RUTC, только `signalChangeNotification` содержит что-либо — поэтому записывается ловушка, которая затем запускает немедленный опрос этого устройства, откуда и берутся фактические значения. TSW202 вообще не определяет никаких ловушек.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 1.0.0 (2026-08-10)
* (bluefox) Added SNMP support for devices without an MQTT publisher, such as the TSW switches
* (bluefox) Added a network scan that finds Teltonika devices and fills the device table
* (bluefox) Split the configuration into an MQTT and an SNMP tab
* (bluefox) Added optional SNMP branches for GPS, Wi-Fi and hotspot sessions, switched off by default
* (bluefox) Removed the router type setting, which was never evaluated
* (bluefox) Split the modem address: `wan` keeps the IPv4 address, `wanIPv6` is added where the device has one
* (bluefox) Added an SNMP trap receiver that records notifications and polls the device that sent one
* (bluefox) Community strings and SNMPv3 keys are now stored encrypted
* (bluefox) Ports can be switched through `ports.<name>.enabled` when a write community is configured
* (bluefox) Added two device manager widgets: an overview of all devices and a front panel view of the ports
* (bluefox) `info.connection` now also lists the devices polled over SNMP, so an instance without MQTT clients
  no longer appears disconnected
* (bluefox) Added the WAN interfaces of a router under `interfaces.<name>`: status, enabled and uptime
* (bluefox) A port state created before a write community was configured now becomes writable instead of
  staying read-only forever

### 0.1.0 (2025-12-07)
* (bluefox) Changed roles of the states

### 0.0.2 (2025-12-03)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2025-2026, bluefox <dogafox@gmail.com>

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