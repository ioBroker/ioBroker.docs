---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.radar2/README.md
title: Доступность сети Radar2 и Bluetooth
hash: xQ0fMnwrMY7ivi+/NmGLWvGOpVt7AcjnXmXXsBW7KmQ=
---
![Логотип](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.radar2)
![Загрузки](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.radar2)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/radar2/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.radar2)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.radar2/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.radar2)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.radar2)
![Версия NPM](http://img.shields.io/npm/v/iobroker.radar2.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/radar2-stable.svg)
![Количество установок](https://iobroker.live/badges/radar2-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/codeql.yml/badge.svg)

# Доступность сети Radar2 и Bluetooth

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Тестирование видимости с помощью радара ioBroker radar2 для сетевых и Bluetooth-устройств, принтеров HP, предупреждений UWZ и валют ЕЦБ.

Этот адаптер пытается найти указанные в сети или по Bluetooth устройства. Он также отображает текущий внешний IP-адрес сети, может считывать состояние чернил принтеров HP, а также предупреждения о погоде от UWZ для нескольких европейских стран. Кроме того, он может считывать ежедневные курсы валют от ЕЦБ.

Это работает по следующей схеме:

- Использование arp-scan и ping для поиска устройств в сети с IPv4 и IPv6!
- Прослушивание DHCP-сообщений, объявляющих о подключении новых устройств к сети.
- Он работает на нескольких интерфейсах, что означает, что если ваша система имеет Wi-Fi и LAN в разных сетях, она сможет видеть обе LAN.
- Поддерживаются стандартный Bluetooth и Bluetooth LE.
- Состояние чернил принтера HP
- Европейский центральный банк обменивает евро на евро
- Предупреждения о погоде UWZ для района, где установлен ioBroker.
- Использует arp-scan и ping в сети только как внешние программы, всё остальное — внутренняя реализация Node.js.
- Адаптер работает и без прав root, но перед установкой потребуется выполнить некоторые действия по настройке.
- Теперь для каждого элемента можно настроить отдельное время до его исчезновения, или же его можно полностью отключить.

Если вы вставите`-` В конце имени устройство не будет учитываться в \_notHere или \_isHere.

Если IP-адрес начинается с 'http', radar2 интерпретирует его как URL/веб-адрес и попытается прочитать страницу с сервера. Это можно использовать для проверки доступности веб-серверов (например, <http://iobroker.net> ). В случае с HTTPS может случиться так, что сервер окажется недоступным, если у него нет обновленных ключей безопасности!

Для использования UWZ необходимо указать ваше местоположение в ioBroker.Admin! Если значение max messages больше 0, каждое предупреждение будет записано в отдельном состоянии, в противном случае они будут объединены. Вы также можете указать, хотите ли вы использовать длинный текст предупреждения, но вся информация доступна и в кратком варианте.

Здесь можно посмотреть валюты Европейского центрального банка:`https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

### использование Bluetooth

Существует два типа устройств Bluetooth: BT-LE (версия 4.x+) и обычный Bluetooth (версия <= 3.x). Адаптер имеет две разные функции сканирования для каждого из типов устройств.

1. Для BT-LE: Noble (модуль Nodejs) и команда 'hcitool lescan'.
2. Для обычного Bluetooth: сканирование Bluetooth (модуль Nodejs) и команда 'l2ping'.

Каждое устройство Bluetooth может одновременно использовать только один из двух методов.

Noble и BT scan — это модули, которые компилируются при установке адаптера с помощью npm и должны работать в Linux, а также в большинстве конфигураций Windows. Hcitool и l2ping устанавливаются вместе с инструментами Bluetooth в скрипте установки и доступны только для Linux.

В конфигурации адаптера MAC-адреса устройств BT-LE следует обозначать восклицательным знаком ('!') перед MAC-адресом, чтобы избежать их сканирования обычными методами BT, такими как l2ping. Обычно Noble немного лучше идентифицирует устройства, чем hcitool lescan, но он также генерирует больше ошибок и может не устанавливаться на всех системах. Аналогично, l2ping лучше находит обычные устройства BT, но недоступен на других платформах, кроме Linux. Поэтому вы можете настроить его использование отдельно в конфигурации адаптера.

Если вы используете несколько устройств Bluetooth, вы можете указать номер устройства в конфигурации; по умолчанию используется '-1', то есть используется первое доступное устройство. Список всех доступных устройств можно посмотреть в Linux с помощью команды:`lescan dev` В одном и том же адаптере можно использовать только одно устройство; если вы хотите сканировать несколько устройств, вам потребуется использовать разные адаптеры или экземпляры.

## Установка

Перед установкой адаптера в ioBroker необходимо установить его на Linux.`arp-scan` и`libcap2-bin` а также некоторые драйверы, которые можно установить, выполнив следующие команды. В Debian (Raspi-Stretch, Ubuntu и т. д.) это выглядит так:

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
```

Приведенные ниже команды необходимо запускать всякий раз, когда вы или система обновляете Node.js или любое из установленных выше приложений!

```
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

Если первая строка устанавливает всё, кроме`readlink` или`hcitools` Путь не найден, скорее всего, он отсутствует. Попробуйте поискать путь с помощью...`sudo find / -name readlink` (в моем случае это было`/usr/bin` ), который не был включен в $PATH! Отредактируйте затем.`.bashrc` и добавить строку с`export PATH=$PATH:/usr/bin` !

Если вы обновили Node.js или какие-либо системные инструменты, описанные выше действия следует выполнить заново!

В Windows (и, возможно, в macOS) отсутствует функция arp-scan, а это значит, что будет использоваться только ping, но сканирование IP- и MAC-адресов будет невозможно!

На macOS Bluetooth также может вообще не работать!

После установки и настройки адаптера вы можете удалить демонстрационные позиции.

### Специальная информация для arp-scan:

Существует стандартная командная строка.`-lgq --retry=5 --timeout=400` Было определено, что будет сканировать все интерфейсы IPv4 по всем 254 адресам. Если ответа не будет в течение 400 мс, будет предпринято 5 повторных попыток! Если вам нужно сканировать только определенный интерфейс, вы можете добавить, например,` --interface=br0` Но обычно сейчас правильно используются мостовые интерфейсы, однако в средах Docker всё ещё может потребоваться IoT. Параметр repeat=5 можно изменить на 6 или 7 для лучшего обнаружения, значения выше 7 я не заметил улучшений! То же самое касается таймаута, значения выше 500 я не обнаружил никаких улучшений.

### Совет для тех, кто переходит с радара на радар2-адаптер или с одного устройства на другое.

- При перемещении радарных адаптеров можно легко скопировать весь список устройств или их настройки.
- - Перейдите в раздел "Администрирование", "Объекты" и включите экспертный режим.
- - Найдите дерево объектов, которое называется`system.adapter.radar.0` (где`0` (Если у вас несколько экземпляров, выберите нужный)
- - Справа от этой строки находится кнопка с карандашом, нажмите на неё.
- - В окне выберите NATIVE
- - После этого вы увидите поля конфигурации. Выберите содержимое поля «Устройства» и скопируйте его в буфер обмена.
- - Сделайте то же самое при выборе целевого компьютера.`system.adapter.radar2.0` В папке Admin/objects перейдите также в раздел NATIVE.
- - Удалите текст из поля «Устройства» и вставьте старые данные из буфера обмена.
- - сохранить изменения

Этот метод переноса настроек работает и между системами, но может не сработать, если другой адаптер имеет другую структуру. Список устройств одинаков для radar и radar2, единственное отличие заключается в том, что в radar2 можно указать несколько IP-адресов/записей, разделенных запятой.

## Important/Wichtig

- Для работы адаптера требуется Node.js версии не ниже 10.1! и npm версии не ниже 6.4!
- Возможно, адаптер не сможет использовать Bluetooth и ARP-сканирование в OS X, только команды ping или ip, которые не могут определять MAC-адреса IP-адресов!
- У адаптера могут быть проблемы с Bluetooth в Windows, кроме того, функция arp-scan недоступна в Windows, поэтому будет использоваться только ping, который не может определить IP-адреса и MAC-адреса!

## Отличия от радарного адаптера

Radar2 устанавливает устройства, которые становятся видимыми сразу после их появления, для новых IP-адресов еще до начала повторного сканирования. Radar2 использует библиотеки nodejs для поиска устройств Bluetooth, но теперь он может работать и в пользовательском пространстве из iobroker и не требует root-доступа (см. ниже требования к установке). Вы можете настроить более одного IP-адреса (теперь IPv4 и IPv6) или адреса хоста (не URL) в одной строке, что позволяет пинговать устройства несколькими способами.`arp-scan` Эта программа используется для поиска MAC-адресов и будет запускаться (если не указано иное в командной строке) на всех сетевых интерфейсах, имеющих внешний IPv4, поэтому она не будет обнаруживать устройства на основе MAC-адресов в сетях IPv6, но теперь будет обнаруживать устройства одновременно в беспроводных и проводных сетях!

Доступность устройств регулируется по-разному. Каждое устройство получит...`_lasthere` Состояние обновляется с указанием текущей даты и времени всякий раз, когда оно обнаруживается. В конце каждого сканирования адаптер проверяет все записи lasthere на предмет того, старше ли они текущего времени - заданного количества минут отсутствия. Устройства, которые никогда здесь не были, также не будут иметь`_lasthere` состояние!

Теперь веб-адреса лучше управляют HTTPS-серверами. Разрешение MAC-адресов поставщиков теперь осуществляется внутри системы, а не через веб. Файл lib/vendor.json загружается только при запуске адаптера; если этому файлу больше 31 дня, то новая версия загружается из веб-интерфейса — ТОЛЬКО при запуске адаптера!

В части, отвечающей за Bluetooth, внесены изменения, позволяющие задавать используемое Bluetooth-устройство (0, 1, ... по умолчанию: -1 = первое). Таким образом, можно использовать несколько Bluetooth-адаптеров для запуска нескольких адаптеров, таких как BLE и radar2, на одном устройстве (драйверы Bluetooth LE для одного устройства не могут быть доступны нескольким программам одновременно).

Если будут обнаружены IP-адреса или устройства Bluetooth, которые вы не указали в списке устройств, они будут отображены в списках неизвестных IP-адресов и устройств Bluetooth, и для каждого из них будет сгенерировано состояние. Таким образом, вы сможете идентифицировать людей, подключающихся к вашей сети, или устройства, которые можно интегрировать. Если вы не хотите, чтобы они отображались как неизвестные, добавьте их в соответствующие списки известных IP-адресов/устройств Bluetooth в конфигурации адаптера.

Также новшеством является возможность раздельного задания интервалов для сканирования HP-Printer, ECB-, UWZ- и обычного сканирования.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 2.4.0 (2025-08-24)
* (Apollon77) Only execute arpscan if there are IPs configured
* (mcm1957) Adapter requires admin >= 7.6.17 now
* (mcm1957) 'debug:' logs are recorded with level 'debug' now [#391].
* (mcm1957) Several issues reported by adapter checker have been fixed.
* (mcm1957) Dependencies have been updated

### 2.3.1 (2025-08-16)
* (Apollon77) Updates dependencies

### 2.3.0 (2025-05-14)
* (speebreaker12) Deprecated 'delObject' call have been replaced to meet current standards.
* (mcm1957) Adapter requires node.js 20, js-controller >= 6.0.11 and admin >= 7.4.10 now
* (mcm1957) Dependencies have been updated

### 2.2.0 (2024-04-13)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.1.0 (2023-10-29)
* (mcm1957) Adapter has been moved to iobroker-community-adapters area
* (mcm1957) Adapter requires nodejs 16 now
* (mcm1957) Dependencies have been updated

### 2.0.8
* (ta2k) fix arp-scan detection for debian 12

### 2.0.7 (2023-01-05)
* (Apollon77) Upgrade noble

### 2.0.5 (2022-12-31)
* (Apollon77) Downgrade noble again

### 2.0.4 (2022-12-22)
* Update noble

### 1.2.5

* Updated to use the adapter for js-controller 3.0 
* Updated HP printer routine to understand some newer inkjet printers

### 1.2.0

* You may use now hcitool as only BT scanner instead of noble on linux (standatd)
* _LastHere will not be change on restart
* Standard scan cycle set to 20 seconds
* Removed the 'remove-end' field and replaced it with a debug flag

### 1.0.7

* check on linux the availability of BT-devices and if no devices are found do not run any BT scans to avoid SIGSEGV

### 1.0.3

* Added possibility to add more than one BT mac address for a device

### 1.0.2

* Corrected version which works with _lastHere and all new devices

### 1.0.0

* First public realease

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.radar2/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023, frankjoke <frankjoke@hotmail.com>

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