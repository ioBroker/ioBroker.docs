---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.teltonika/README.md
title: ioBroker Teltonika
hash: 9ZIxJ+G0tIVJGirXC63gxC/02+dzW2Ys848YeRH9/AQ=
---
![Количество установок](http://iobroker.live/badges/teltonika-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.teltonika.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.teltonika/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/teltonika/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.teltonika.svg)

<img src="admin/teltonika.svg" height="100px"/>

# ioBroker Teltonika

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Этот адаптер считывает данные с маршрутизаторов Teltonika через MQTT и с устройств Teltonika через SNMP.

Маршрутизаторы подключаются к адаптеру самостоятельно по протоколу MQTT. Устройства без издателя MQTT — например, управляемые коммутаторы TSW — опрашиваются по протоколу SNMP; их можно ввести на вкладке SNMP или позволить сканированию сети найти их. Маршрутизатор, предлагающий оба протокола, считывается только один раз, по протоколу SNMP.

По протоколу MQTT можно считывать следующую информацию:

- температура («RUT2», «RUT9», «RUTX», «RUT3», «RUT1», «TRB2», «TRB5», «OTD», «RUTM», «RUTC»)
- уровень сигнала
- мобильный оператор
- состояние сети
- Тип подключения (2G/3G/4G/5G)
- IP-адрес WAN
- время безотказной работы
- имя
- цифровой вход 1 ('RUT9')
- цифровой вход 2 («RUT9»)
- аналоговый вход ('RUT9', 'TRB2', 'TRB141')
- Состояние контакта 2 ('TRB2')
- статус контакта 3 ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')
- статус контакта 4 ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')

## Использование

Шаги:

- Сначала запустите экземпляр.
- Зайдите в настройки маршрутизатора и откройте раздел MQTT.![Настройки](../../../en/adapterref/iobroker.teltonika/img/settings.png)
  - Включить издателя MQTT
  - Установите адрес MQTT-брокера равным адресу вашего экземпляра ioBroker.
  - Укажите порт MQTT-брокера. Важно: порт по умолчанию для этого адаптера — 1885, чтобы избежать конфликтов с другими MQTT-адаптерами.
  - Сохраните настройки
  - Для применения настроек некоторым маршрутизаторам требуется перезагрузка.
- Через некоторое время точки данных будут созданы в экземпляре адаптера.

**Примечание** : тестирование проводилось только с`RUTC` и`TSW202` устройства.

### SNMP

Устройства, не поддерживающие MQTT-издатель, считывают данные по протоколу SNMP:

- Включите агент SNMP на устройстве в разделе _«Службы» → «SNMP» → «Настройки SNMP»_ и установите сообщество только для чтения.
- В настройках адаптера откройте вкладку _SNMP_ , введите диапазон адресов и нажмите _«Сканировать»_ , или добавьте устройство вручную.
- Сегодня поддерживаются следующие`RUTC` и`TSW2` семейства. Другие модели используют значения, общие для всех устройств Teltonika (серийный номер, имя, время работы, процессор); чтобы прочитать их полностью, загрузите MIB с устройства в _разделе «Сводка по системе SNMP»_ и перетащите его в`MIBs/` и бежать`npm run generate-oids`

Помимо перечисленных выше значений, SNMP также предоставляет статистику по каждому порту коммутаторов (канал связи, скорость, дуплекс, переданные байты и скорость передачи данных), а также по именованным цифровым входам и выходам маршрутизатора.

Доступны еще три ветви, но они по умолчанию **отключены** , поскольку раскрывают местоположение устройства и идентифицируемых клиентов, а также потому, что они меняются при каждом опросе:

- _GPS-координаты_ — широта, долгота, точность, спутники и время определения местоположения.
- _Wi-Fi-радиостанции и сети_ — состояние радио и канал, а также для каждого SSID — шифрование, режим и количество клиентов.
- _Информация о сессиях точки доступа_ — IP-адрес, пользовательское состояние и авторизация каждой сессии.

Таблица MAC-адресов для каждого клиента вообще не считывается, даже при включенной ветви Wi-Fi: полезная часть информации о количестве клиентов по SSID не требует постоянного обновления списка аппаратных адресов всех пользователей в дереве объектов.

### Коммутационные порты

_Укажите сообщество_ для устройства, и его порты станут переключаемыми.`<device>.ports.<name>.enabled` Если поле оставить пустым, адаптер будет только считывать данные, и состояние будет создано без флага записи.

Переключатель работает`ifAdminStatus` Стандартная IF-MIB недоступна для записи, поскольку MIB Teltonika не содержит никаких записываемых данных. **PoE не управляется** : эти устройства отвечают без объектов в POWER-ETHERNET-MIB.

Порт становится переключаемым только тогда, когда его имя точно совпадает с именем одного интерфейса. На TSW202 это относится ко всем портам, поскольку в обеих таблицах указано следующее:`port1` …`port8` . RUTC сообщает о четырех названных портах.`LAN` против интерфейсов`lan1` …`lan4` , который невозможно с уверенностью сопоставить, поэтому только его`WAN` Порт переключаемый.

### Виджеты для диспетчера устройств

Для адаптера _устройства_ зарегистрированы два компонента:

- **Устройства Teltonika** — каждый маршрутизатор и коммутатор экземпляра в виде отдельной ячейки: доступность, полоса, показывающая состояние соединения каждого порта, а для маршрутизатора — оператор, тип соединения и сигнал. При нажатии открывается полная информация, включая лицевую панель, цифровые входы и выходы, а также WAN-адреса.
- **Порты Teltonika** — это лицевая панель отдельного устройства на отдельной плитке, отображающая параметры соединения, скорость, дуплекс и количество переданных байтов для каждого порта. Порты отображаются так, как они указаны на оборудовании: нечетные числа в верхнем ряду, четные — в нижнем, оптоволоконные кабели — в отдельной группе. Устройство выбирается из выпадающего списка, который заполняет адаптер, и щелчок по плитке открывает диалоговое окно с подробными сведениями для этого конкретного устройства.

Маршрутизатор дополнительно отображает свои **WAN-интерфейсы** , поскольку mwan3 отслеживает их: имя, статус переключения при сбое (`online` ,`standby` ,`notracking` ), включен ли интерфейс и как долго он активен. Обратите внимание, что столбец «Адрес» в веб-интерфейсе здесь не имеет аналога — по протоколу SNMP mwan3 сообщает хосты, которые он пингует для оценки соединения, а не адрес, который содержит интерфейс.

При настройке сообщества записи переключение порта возможно с панели управления. Индикатор PoE намеренно отсутствует — как указано выше, эти устройства вообще не предоставляют PoE-объекты, поэтому значок болта будет обозначать данные, которых не существует.

Виджеты обнаруживают устройства из дерева объектов, а не из конфигурации адаптера, поскольку маршрутизаторы MQTT объявляют о своем появлении, и устройства SNMP отображаются при первом опросе.

### Ловушки

Адаптер может принимать SNMP-ловушки. Включите эту функцию на вкладке _SNMP_ и укажите устройству этот хост в разделе _«Службы» → «SNMP» → «Настройки ловушек»_ . Обратите внимание, что порт 162 является привилегированным в Linux, поэтому может потребоваться более высокий порт.

Каждое уведомление отображается следующим образом`<device>.traps.<name>` сохраняя время своего последнего прибытия, и`<device>.traps.last` указывает на самый последний случай. Большинство уведомлений Teltonika не содержат информации о полезной нагрузке — из семи, определенных RUTC, только`signalChangeNotification` Устройство передаёт любые данные — поэтому записывается сообщение об ошибке, которое затем немедленно запускает опрос этого устройства, откуда и берутся фактические значения. TSW202 вообще не определяет никаких сообщений об ошибках.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

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