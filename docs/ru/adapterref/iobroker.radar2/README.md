---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.radar2/README.md
title: наличие сети Radar2 и Bluetooth
hash: ui5trG7dVr4zZ47eDTJ9ZvnJ76AIGsrS7M9A9+yQjuM=
---
![Логотип](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.radar2)
![Загрузки](https://img.shields.io/npm/dm/iobroker.radar2.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.radar2)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.radar2)
![GitHub фиксирует данные с момента последнего выпуска (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.radar2/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.radar2)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.radar2)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.radar2.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/radar2-stable.svg)
![Количество установок](https://iobroker.live/badges/radar2-installed.svg)

# Наличие сети Radar2 и Bluetooth
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/radar2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.radar2/actions/workflows/codeql.yml)

<!--

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.
-->
## Тестирование видимости радара ioBroker2 для сетевых и Bluetooth-устройств, принтеров HP, предупреждений UWZ и валют ECB
Этот адаптер пытается найти указанные устройства в сети или с помощью Bluetooth. Он также показывает текущий внешний IP-адрес сети, может считывать состояние чернил принтеров HP, а также предупреждения о погоде от UWZ для нескольких европейских стран. Он также может читать ежедневные курсы обмена валют от ЕЦБ.

Это работает:

* Использование arp-сканирования и ping для поиска устройств в сети с IPv4 и IPv6!
* Прослушивание сообщений DHCP, которые объявляют о появлении новых устройств в сети.
* Он работает с несколькими интерфейсами, что означает, что если ваша система имеет WLAN и локальную сеть в разных сетях, она может видеть обе локальные сети.
* Поддерживается обычный Bluetooth и Bluetooth LE.
* Состояние чернил принтера HP
* Обмен валюты Европейского центрального банка на евро.
* Предупреждения UWZ о погоде для региона, где установлен ioBroker.
* Использует arp-сканирование и пинг в сети только как внешние программы, все остальное является внутренним для nodejs.
*Адаптер работает и без root-прав, но перед установкой требуются некоторые действия по настройке
* Для каждого элемента теперь можно настроить индивидуальное время до его исчезновения или его также можно отключить.

Если вы поместите `-` в конце имени, устройство не будет учитываться в _notHere или _isHere.

Если IP-адрес начинается с «http», радар2 интерпретирует его как URL/веб-адрес и пытается прочитать страницу с сервера, это можно использовать для проверки доступности веб-серверов (например, http://iobroker.net). ). В случае https может случиться так, что сервер будет недоступен, если у него нет обновленных ключей безопасности!

Чтобы использовать UWZ, вам необходимо настроить свое местоположение в ioBroker.Admin! Если значение max messages >0, каждое предупреждение будет записано в отдельном состоянии, в противном случае они будут объединены.
Вы также можете указать, хотите ли вы использовать длинный текст предупреждения, но вся информация доступна и в коротком виде.

Валюты Европейского центрального банка можно увидеть здесь: `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`.

### Использование Bluetooth
Существует два разных типа устройств BT: BT-LE (V 4.x+) и обычный BT (V<=3.x). Адаптер имеет две разные функции сканирования для каждого типа устройств.

1) для BT-LE: Noble (модуль Nodejs) и команда hcitool lescan 2) для обычного BT: сканирование BT (модуль Nodejs) и команда l2ping

Каждое устройство BT может использовать только один из двух методов одновременно.

Noble и BT Scan — это модули, которые компилируются при установке адаптера с помощью npm и должны работать в Linux, а также в большинстве установок Windows.
Hcitool и l2ping устанавливаются вместе с инструментами Bluetooth в сценарии установки и доступны только для Linux.

В конфигурации адаптера компьютеры Mac BT-LE должны быть обозначены знаком «!». перед mac-адресом, чтобы не сканировать их обычным сканированием BT, например l2ping.
Обычно Noble немного лучше определяет устройства, чем hcitool lescan, но он также генерирует больше ошибок и может не устанавливаться на всех системах.
Аналогично, l2ping лучше находит обычные устройства BT, но недоступен на других платформах, кроме Linux.
Поэтому вы можете настроить использование отдельно в конфигурации адаптера.

Если вы используете несколько устройств BT, вы можете указать номер устройства в конфигурации, по умолчанию используется значение «-1», при котором используется первое доступное устройство. Список всех доступных устройств можно увидеть в Linux с помощью `lescan dev`.
В одном адаптере вы можете использовать только одно устройство. Если вы хотите сканировать несколько устройств, вам необходимо использовать разные адаптеры или экземпляры.

## Монтаж
Перед установкой адаптера в ioBroker вам необходимо установить в Linux `arp-scan` и `libcap2-bin`, а также некоторые драйверы, которые вы можете сделать, выполнив приведенные ниже команды.
В Debian (Raspi-Stretch, Ubuntu,...) это выглядит так:

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
```

и ниже необходимо запускать всякий раз, когда вы или система обновляете nodejs или любое из установленных выше приложений!

```
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

Если первая строка устанавливает все, кроме `readlink` или `hcitools`, путь, скорее всего, отсутствует, попробуйте найти путь с помощью `sudo find / -name readlink` (в моем случае это был `/usr/bin` ), который не был включен в $PATH! Затем отредактируйте `.bashrc` и добавьте строку с `export PATH=$PATH:/usr/bin`!

Если вы обновите узел или некоторые системные инструменты, описанное выше должно быть выполнено снова!

В Windows (и, возможно, OSX) нет arp-сканирования, что означает, что будет использоваться только ping, но никакие IP-mac-адреса не могут сканироваться!

На Osx тоже Bluetooth может вообще не работать!

После установки конфигурации адаптера настройки можно удалить демонстрационные позиции.

### Специальная информация для arp-сканирования:
Определена стандартная командная строка `-lgq --retry=5 --timeout=400`, которая будет сканировать на всех интерфейсах IPv4 все 254 адреса, если она не ответит в течение 400 мс, она повторит попытку 5 раз! Если вам нужно сканировать только конкретный интерфейс, вы можете добавить, например, ` --interface=br0`, но обычно мостовые интерфейсы используются сейчас по праву, но все же в средах докеров это может быть необходимо. Повторение = 5 можно изменить на 6 или 7 для лучшее обнаружение, выше 7 улучшений не обнаружил! То же самое и с таймаутом, выше 500 улучшений я не нашел.

###Совет для тех, кто переходит с радара на радар2-адаптер или с одной машины на другую машину
* Если вы переместите адаптеры радаров, вы можете легко скопировать весь список устройств или настройки,
* - Зайдите в админку к объектам и включите экспертный режим.
* - Найдите дерево объектов, которое называется `system.adapter.radar.0` (где `0` — это экземпляр, если у вас было несколько экземпляров, выберите правильный)
* - В самом правом углу этой строки есть кнопка с карандашом, нажмите на нее
* - В окне выбираем РОДНОЙ
* - после этого вы должны увидеть поля конфигурации, выберите содержимое поля «устройства» и скопируйте его в буфер обмена.
* - сделайте то же самое на целевой машине, выбрав `system.adapter.radar2.0` в Admin/objects и перейдите сюда также в NATIVE.
* - Удалить текст в поле «устройства» и вставить старые из буфера обмена.
* - сохранить изменения

Этот метод перемещения настроек также работает между системами, но может не работать, если другой адаптер имеет другую структуру. Список устройств одинаков для радара и радара2, с той лишь разницей, что в радаре2 вы можете указать несколько IP-адресов/записей, разделенных знаком «,».

## Важно/Вихтиг
* Адаптеру необходим узел >= v10.1! и НПМ >=6,4
* Адаптер может быть недоступен для использования Bluetooth и arp-сканирования на OSX, только ping или ip, которые не могут обнаружить IP-адреса Mac!
* Адаптер также может иметь проблемы с Bluetooth в Windows, также arp-сканирование недоступно в Windows, тогда будет использоваться только ping, который не может обнаружить IP-адреса Mac!.

## Отличия от радара-адаптера
Radar2 устанавливает новые IP-адреса для устройств, которые видны сразу же, как только они становятся видимыми, еще до того, как сканирование начнется снова.
Radar2 использует библиотеки nodejs для поиска устройств Bluetooth, но теперь он может работать и в пользовательском пространстве от iobroker, и ему не требуется root-доступ (см. ниже требования к установке).
Вы можете настроить более одного IP-адреса (теперь IPv4 И IPv6) или адреса хоста (не URL-адреса) в одной строке, что позволяет вам пинговать устройства несколькими способами.
`arp-scan` используется для поиска Mac-адресов, он будет работать (если не указано иное в командной строке) на всех сетевых интерфейсах, имеющих внешний IPv4, поэтому он не будет обнаруживать устройства на основе Mac-адресов на IPv6, но теперь будет обнаруживать устройства в беспроводных и фиксированных сетях одновременно!

Доступность устройств обрабатывается по-другому. Каждое устройство получит состояние `_lasthere`, обновляемое текущей датой и временем, когда бы оно ни было обнаружено. В конце каждого сканирования адаптер проверяет все записи Lasthere, старше ли они текущего времени — настроенных минут отсутствия. Устройства, которых здесь никогда не было, также не будут иметь состояния `_lasthere`!

Веб-URL-адреса теперь могут лучше управлять https-серверами.
Разрешение поставщика MAC-адресов теперь выполняется внутри компании, а не через Интернет. Только при запуске адаптера загружается файл lib/vendor.json. Если этот файл старше 31 дня, новая версия загружается из Интернета - ТОЛЬКО при запуске адаптера!

Часть Bluetooth была обновлена таким образом, что вы можете определить используемое устройство Bluetooth (0,1, ... по умолчанию: -1 = первое). Таким образом, вы можете использовать несколько флешек BT для запуска нескольких адаптеров, таких как BLE и Radar2, на одном устройстве (драйверы Bluetooth LE для одного устройства не могут быть доступны нескольким программам одновременно).

Если будут обнаружены IP-адреса или устройства Bluetooth, которые вы не указали в списке устройств, они будут показаны в списках неизвестных IP-адресов и BT, и для каждого из них будет сгенерировано состояние. Таким образом, вы можете идентифицировать людей, подключающихся к вашей сети, или устройства, которые можно интегрировать.
Если вы не хотите, чтобы они были указаны как неизвестные, поместите их в соответствующие списки известных IP/BT в конфигурации адаптера.

Также новым является то, что интервалы сканирования HP-принтера, ECB-, UWZ- и обычного сканирования могут определяться отдельно.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

## License

The MIT License (MIT)

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