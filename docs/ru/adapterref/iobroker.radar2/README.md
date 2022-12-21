---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.radar2/README.md
title: сеть радара2 и доступность блютуза
hash: I/CU1jFnLVGPsOX8mf0av1Al4HHlfgN7c3vUjZpR9Ro=
---
# Сеть радара2 и доступность блютуза
![Логотип](../../../en/adapterref/iobroker.radar2/admin/radar2.png)

![Количество установок](http://iobroker.live/badges/radar2-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.radar2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.radar2.svg)

![Тестируйте и выпускайте](https://github.com/frankjoke/iobroker.radar2/workflows/Test%20and%20Release/badge.svg)

[Deutsche Anleitung в переводе с Google](https://translate.google.com/translate?sl=en&tl=de&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.radar2%2Fblob%2Fmaster%2FREADME.md)

[Русские инструкции переведены с гуглом](https://translate.google.com/translate?sl=en&tl=ru&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.radar2%2Fblob%2Fmaster%2FREADME.md)

## Тестирование видимости ioBroker Radeon2 для сетевых и bluetooth-устройств, принтеров HP, UWZ-предупреждений и ECB-валют
Этот адаптер пытается найти указанные устройства в сети или с Bluetooth. Он также показывает текущий внешний IP-адрес сети, может считывать состояние чернил принтеров HP, а также предупреждения о погоде от UWZ для нескольких европейских стран. Он также может считывать ежедневные курсы обмена валют от ЕЦБ.

Он работает:

* Использование arp-scan и ping для поиска устройств в сети с IPv4 и IPv6!
* Прослушивание сообщений dhcp, сообщающих о появлении в сети новых устройств.
* Он работает с несколькими интерфейсами, что означает, что если ваша система имеет Wlan и LAN в разных сетях, она может видеть обе LAN.
* Поддерживается обычный Bluetooth и Bluetooth LE
* Состояние чернил HP-принтера
* Обмен валюты европейского центрального банка на евро
* Предупреждения о погоде UWZ для области, где установлен ioBroker
* Использует arp-сканирование и пинг в сети только как внешние программы, все остальное является внутренним для nodejs.
* Адаптер работает и без рут прав, но перед установкой требуются некоторые действия по настройке
* Для каждого элемента теперь можно настроить индивидуальное время до его исчезновения, или его также можно отключить.

Если вы поместите `-` в конце имени, устройство не будет учитываться в _notHere или _isHere.

Если IP-адрес начинается с «http», радар2 будет интерпретировать его как URL-адрес/веб-адрес и попытается прочитать страницу с сервера, это можно использовать для проверки доступности веб-серверов (например, http://iobroker.net). ). В случае https может случиться так, что сервер недоступен, если у него нет обновленных ключей безопасности!

Чтобы использовать UWZ, вам необходимо настроить свое местоположение в ioBroker.Admin! Если значение max messages >0, то каждое предупреждение будет записано в отдельном состоянии, в противном случае они будут объединены.
Вы также можете указать, хотите ли вы использовать длинный текст предупреждения, но вся информация доступна и в коротком.

Валюты Европейского центрального банка можно увидеть здесь: `https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`

### Использование Bluetooth
Существует два разных типа устройств BT: BT-LE (V 4.x+) и обычный BT (V<=3.x). Адаптер имеет две разные функции сканирования для каждого типа устройств.

1) для BT-LE: Noble (модуль Nodejs) и команда «hcitool lescan» 2) для обычного BT: сканирование BT (модуль Nodejs) и команда «l2ping»

Каждое устройство BT может использовать только один из двух методов одновременно.

Noble и BT scan — это модули, которые скомпилированы при установке адаптера с помощью npm и должны работать в Linux, а также в большинстве установок Windows.
Hcitool и l2ping устанавливаются с помощью инструментов bluetooth в сценарии установки и доступны только для Linux.

В конфигурации адаптера BT-LE macs должны обозначаться знаком '!' перед mac-адресом, чтобы избежать их сканирования обычными BT-сканами, такими как l2ping.
Обычно Noble немного лучше, чем hcitool lescan, идентифицирует устройства, но он также генерирует больше ошибок и может не устанавливаться на всех системах.
Точно так же l2ping лучше находит обычные устройства BT, но недоступен на других платформах, кроме Linux.
Поэтому вы можете настроить использование отдельно в конфигурации адаптера.

Если вы используете несколько устройств BT, вы можете указать номер устройства в конфигурации, по умолчанию используется значение «-1», которое использует первое доступное. Список всех доступных устройств можно увидеть в Linux с помощью `lescan dev`.
В одном и том же адаптере вы можете использовать только одно устройство, если вы хотите сканировать несколько устройств, вам нужно использовать разные адаптеры или экземпляры.

## Установка
Перед установкой адаптера в ioBroker вам необходимо установить в Linux `arp-scan` и `libcap2-bin` и некоторые драйверы, которые вы можете сделать, выполнив приведенные ниже команды.
В Debian (Raspi-Stretch, Ubuntu, ...) это выглядит так:

```
sudo apt-get install -y coreutils libcap2-bin arp-scan bluetooth bluez libbluetooth-dev libudev-dev net-tools
```

и ниже необходимо запускать всякий раз, когда вы или система обновляете nodejs или любое из приложений, установленных выше!

```
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp-scan`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which node`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which arp`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hcitool`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which hciconfig`)
sudo setcap cap_net_admin,cap_net_raw,cap_net_bind_service=+eip $(eval readlink -f `which l2ping`)
```

Если первая строка устанавливает все, кроме `readlink` или `hcitools`, не удается найти путь, скорее всего, отсутствует, попробуйте найти путь с `sudo find / -name readlink` (в моем случае это был `/usr/bin` ), который не был включен в $PATH! Затем отредактируйте `.bashrc` и добавьте строку с `export PATH=$PATH:/usr/bin`!

Если вы обновляете узел или некоторые системные инструменты, вышеперечисленное должно быть выполнено снова!

В Windows (и, возможно, OSX) нет arp-сканирования, что означает, что будет использоваться только ping, но нельзя сканировать IP-mac-адреса!

На Osx тоже может вообще не работать блютуз!

После установки конфигурации адаптера настройки вы можете удалить демонстрационные позиции.

### Специальная информация для arp-сканирования:
Существует стандартная командная строка `-lgq --retry=5 --timeout=400`, которая будет сканировать на всех интерфейсах IPv4 все 254 адреса, если она не ответит в течение 400 мс, она повторит попытку 5 раз! Если вам нужно сканировать только определенный интерфейс, вы можете добавить, например, ` --interface=br0`, но обычно мостовые интерфейсы теперь используются по праву, но все же в средах докеров может потребоваться iot. Repeat = 5 можно изменить на 6 или 7 для лучшее обнаружение, выше 7 я не нашел улучшения! То же и с таймаутом, выше 500 улучшений не нашел.

### Совет для тех, кто переходит с радара на радар2-адаптер или с одной машины на другую
* Если вы перемещаете радарные адаптеры, вы можете легко скопировать весь список устройств или настройки,
* - Зайти в админке на объекты и включить экспертный режим
* - Ищите дерево объектов, которое называется `system.adapter.radar.0` (где `0` - это экземпляр, если у вас было несколько экземпляров, выберите правильный)
* - Справа от этой строки есть кнопочка с карандашом, нажмите на нее
* - В окне выберите NATIVE
* - вы должны увидеть поля конфигурации, выберите содержимое поля «устройства» и скопируйте его в буфер обмена
* - сделайте то же самое на целевой машине, выбрав `system.adapter.radar2.0` в Admin/objects и перейдите сюда также к NATIVE.
* - Удалить текст в поле "устройства" и вставить в старые из буфера обмена
* - сохранить изменения

Этот метод перемещения настроек работает также между системами, но может не работать, если другой адаптер имеет другую структуру. Список устройств одинаков для радара и радара2, единственное отличие состоит в том, что в радаре2 вы можете иметь несколько IP-адресов/записей, разделенных знаком «,».

## Важно/Важно
* Адаптеру требуется узел >= v10.1! и нпм >=6,4
* Адаптер может быть недоступен для использования bluetooth и arp-scan на osx, только ping ror ip, который не может обнаружить IP-адреса mac!
* Адаптер также может иметь проблемы с bluetooth в Windows, а также arp-сканирование недоступно в Windows, тогда будет использоваться только ping, который не может определить IP-адреса mac!.

## Отличия от радара-адаптера
Radar2 устанавливает устройства, которые видны сразу же, как только они становятся видимыми, для новых IP-адресов еще до того, как сканирование начнется снова.
Radar2 использует nodejs-библиотеки для поиска bluetooth-устройств, но теперь он может работать и в пользовательском пространстве от iobroker и не требует root-доступа (см. ниже требования к установке).
Вы можете настроить более одного IP-адреса (теперь IPv4 и IPv6) или адреса хоста (не URL-адреса) в одной строке, что позволяет вам пинговать устройства несколькими способами.
`arp-scan` используется для поиска MAC-адресов, он будет работать (если не указано иное в его командной строке) на всех сетевых интерфейсах с внешним IPv4, поэтому он не будет обнаруживать устройства на основе MAC-адресов в IPv6, но он теперь будет обнаруживать устройства в беспроводных и стационарных сетях одновременно!

Доступность устройств обрабатывается по-разному. Каждое устройство получит состояние `_lasthere`, обновленное с текущей датой и временем, когда оно будет замечено. В конце каждого сканирования адаптер проверяет все записи lasthere, если они старше текущего времени — настроенных минут отсутствия. У устройств, которых здесь никогда не было, также не будет состояния `_lasthere`!

Веб-URL-адреса теперь могут лучше управлять https-серверами.
Разрешение поставщиков MAC-адресов теперь выполняется внутри компании, а не через Интернет. Только при запуске адаптера загружается файл lib/vendor.json, если этот файл старше 31 дня, то новая версия загружается из Интернета - ТОЛЬКО при запуске адаптера!

Часть Bluetooth была обновлена таким образом, что вы можете определить используемое устройство Bluetooth (0,1, ... по умолчанию: -1 = первое). Таким образом, вы можете использовать несколько флешек BT для запуска нескольких адаптеров, таких как BLE и Radar2, на одном устройстве (драйверы bluetooth LE для одного устройства не могут быть доступны нескольким программам одновременно).

Если будут найдены IP-адреса или Bluetooth-устройства, которые вы не указали в своем списке устройств, они будут показаны в списках неизвестных IP-адресов и BT, и для каждого из них будет сгенерировано состояние. Таким образом, вы можете идентифицировать людей, входящих в вашу сеть или устройства, которые могут быть интегрированы.
Если вы не хотите, чтобы они были указаны как неизвестные, поместите их в соответствующие списки известных IP/BT в конфигурации адаптера.

Также новым является то, что интервалы для HP-Printer, ECB-, UWZ- и обычного сканирования могут быть определены отдельно.

## Changelog

### __WORK IN PROGRESS__
* Update noble

### V2.0.1

* Removed node-bluetooth because package is not updated to run on recent nodejs versions
* Updated noble to more recent version
* Completely rewritten logic for pinging BT with l2ping, or hcitool lescan
* Updated scan methot to reduce process load and also increase hit rate
* Completely re-written config page with new options
* Added possibility to switch off storing of _unknown's
* Added  `._nHere` for each item showing the number of scans device was found, reset to `0` when not found in a scan. This allows to implement delayed here logic.
* Changes to adapter to run on latest js-controller versions (and on older ones as well)
* Added `away time` in config for each item, with this you can set time until item is flagged for away individually for different items. Possible settings are -1 for default configured away time, 0 for item disabled or 1-30 for minutes until item is flagged as away.

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

Copyright (c) 2018-2022, frankjoke <frankjoke@hotmail.com>

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