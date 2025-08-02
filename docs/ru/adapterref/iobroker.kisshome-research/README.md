---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kisshome-research/README.md
title: ioBroker KISSHome исследование
hash: 1XWos8WsmSfOwyeFOimaVrYdFl5uCky6s/FppPchK7Q=
---
![Логотип](../../../en/adapterref/iobroker.kisshome-research/admin/kisshome-research.png)

![Количество установок](http://iobroker.live/badges/kisshome-research-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.kisshome-research.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kisshome-research.svg)

# IoBroker KISSHome исследование
![Тест и выпуск](https://github.com/ioBroker/ioBroker.kisshome-research/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/kisshome-research/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Этот специальный адаптер был разработан для исследовательского проекта KISSHome. Он не предназначен для общего использования.

Чтобы использовать этот адаптер, вам необходимо сначала зарегистрироваться на сайте [KISSДомашние исследования](https://kisshome-research.if-is.net) и получить письмо с подтверждением.

Для запуска этого адаптера вам необходимо:

- Более 3-х устройств умного дома
- Маршрутизатор Fritz!Box. Без `Fritz!Box` адаптер работать не будет.
- iobroker должен работать на Debian/Raspbian (или, по крайней мере, на Linux, где доступны следующие команды: `which`, `rsync`)

## Деинсталляция
Открытый ключ, необходимый для связи, хранится в `0_userdata.0.kisshomeResearchPublicKey`.
После удаления адаптера ключ необходимо удалить вручную.

Это было необходимо для того, чтобы можно было без проблем удалить и установить адаптер снова.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 1.2.4 (2024-11-19)

-   Empty MAC addresses will be ignored

### 1.2.3 (2024-11-15)

-   (@GermanBluefox) Do not start recording if no one MAC address was provided
-   (@GermanBluefox) The keys are stored in `0_userdata.0.kisshomeResearchPublicKey` to make it possible to uninstall and install the adapter again without any problems
-   (@GermanBluefox) Corrected problem with PCAP files without the META-description

### 1.1.2 (2024-11-12)

-   (@GermanBluefox) Corrected the input of IP addresses in the configuration

### 1.1.1 (2024-10-30)

-   (@GermanBluefox) Removed unused code
-   (@GermanBluefox) Creation of META file if not exists
-   (@GermanBluefox) Description for address must be longer than three characters
-   (@GermanBluefox) Added adapter version to the meta file name

### 1.0.13 (2024-10-17)

-   (gsenkowski) Used actual IP and TCP header length for the PCAP file

### 1.0.11 (2024-09-26)

-   (@GermanBluefox) Trying to fix CI
-   (@GermanBluefox) Do not allow the traffic recording of FritzBox
-   (@GermanBluefox) Do not allow recording the traffic if no any MAC provided
-   (@GermanBluefox) Corrected links to web page

### 1.0.7 (2024-09-21)

-   (@GermanBluefox) Corrected the error if MAC address cannot be determined

### 1.0.6 (2024-09-21)

-   (ChrisDietrich) Corrected the link in readme.md
-   (@GermanBluefox) Corrected the Big-Endian PCAP format
-   (@GermanBluefox) the Fixed build pipeline

### 1.0.4 (2024-09-19)

-   (@GermanBluefox) Corrected GUI
-   (@GermanBluefox) Filter out not used interfaces
-   (@GermanBluefox) Added notification to admin if public key not accepted
-   (@GermanBluefox) Try to detect zero bytes interfaces

### 1.0.2 (2024-09-15)

-   (@GermanBluefox) Added error logging

### 1.0.1 (2024-09-14)

-   (@GermanBluefox) Implemented the support for the big endian format of a PCAP file

### 1.0.0 (2024-09-06)

-   (@GermanBluefox) Corrected configuration page

### 0.3.1 (2024-08-31)

-   (@GermanBluefox) Added detection of some IPs

### 0.2.1 (2024-08-28)

-   (@GermanBluefox) used valid URL address

### 0.1.1 (2024-08-20)

-   (@GermanBluefox) Used MD5 for the file consistency check

### 0.1.0 (2024-08-19)

-   (@GermanBluefox) File upload was implemented

### 0.0.3 (2024-08-14)

-   (@GermanBluefox) Added the recording enabled option

### 0.0.2 (2024-07-22)

-   (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2024 Denis Haev <dogafox@gmail.com>

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