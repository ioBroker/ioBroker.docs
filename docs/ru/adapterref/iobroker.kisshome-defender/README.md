---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kisshome-defender/README.md
title: ioBroker KISSДомашний защитник
hash: 50h0m5iXAkiRNs6IQJaZ2xmqGFmaMeU05ZBQJbeHGLQ=
---
![Логотип](../../../en/adapterref/iobroker.kisshome-defender/admin/kisshome-defender.png)

![Количество установок](http://iobroker.live/badges/kisshome-defender-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.kisshome-defender.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kisshome-defender.svg)

# IoBroker KISSДомашний защитник
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.kisshome-defender/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/kisshome-defender/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении отчётов об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчёты Sentry используются, начиная с версии js-controller 3.0.

Этот специальный адаптер был разработан для проекта KISSHome Defender. Он не предназначен для общего использования.

Чтобы использовать этот адаптер, необходимо сначала зарегистрироваться на сайте [KISSДомашний защитник](https://kisshome-defender.if-is.net) и получить электронное письмо с подтверждением.

Для запуска этого адаптера вам необходимо:

- Более 3 устройств умного дома
- Маршрутизатор Fritz!Box. Без Fritz!Box адаптер работать не будет.
- iobroker должен работать на Debian/Raspbian (или, по крайней мере, на Linux, где доступны следующие команды: `which`, `rsync`)
- Для запуска контейнера IDS пользователем `iobroker` должен быть установлен и включен Docker.

### Включить Docker для пользователя iobroker
На старых системах Linux для установки Docker необходимо выполнить следующие действия: [шаги](https://docs.docker.com/engine/install/debian/)

На новых системах (Debian 12, Ubuntu 22.04 и новее) вы можете установить docker с помощью следующих команд:

```bash
sudo apt update
sudo apt install -y docker-ce
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker iobroker
```

Добавьте команду docker в файл sudoers:

```bash
sudo visudo /etc/sudoers.d/iobroker
```

Добавьте следующую строку:

```text
iobroker ALL=(ALL) NOPASSWD: /usr/bin/docker
```

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 1.1.12 (2025-11-12)
-   (@GermanBluefox) Changed german name of adapter
-   (@GermanBluefox) Sync names of PCAP files

### 1.1.10 (2025-11-09)
-   (@GermanBluefox) Showed progress devices that have only IP address

### 1.1.9 (2025-11-06)
-   (@GermanBluefox) Try to handle 127.0.0.1 as no bind given
-   (@GermanBluefox) Recreate IDS container on error if self-hosted
-   (@GermanBluefox) Limit minimal interval for sending PCAPs to 10 minutes

### 1.1.8 (2025-11-05)
-   (@GermanBluefox) Allowed only selection IPv4 addresses and not loopback for communication with docker

### 1.1.7 (2025-11-05)
-   (@GermanBluefox) Corrected error if device is offline
-   (@GermanBluefox) Show error codes 400-499 as warning and not as error

### 1.1.6 (2025-11-04)
-   (@GermanBluefox) Showed error message if IDS has an error

### 1.1.5 (2025-11-04)
-   (@GermanBluefox) Destroy docker container on adapter stop
-   (@GermanBluefox) Required admin 7.7.19 as dependency

### 1.1.3 (2025-11-01)
-   (@GermanBluefox) Disabled by default self-hosted docker option
-   (@GermanBluefox) Changed default threshold value

### 1.1.1 (2025-10-31)
-   (@GermanBluefox) Changed the calculation of the first occurrence time
-   (@GermanBluefox) Added link to FAQ in email

### 1.1.0 (2025-10-30)
-   (@GermanBluefox) Corrected JSON config

### 1.0.20 (2025-10-29)
-   (@GermanBluefox) Do not send empty error log
-   (@GermanBluefox) Do not send config too often
-   (@GermanBluefox) Changed wording

### 1.0.16 (2025-10-28)
-   (@GermanBluefox) Added error log proxying

### 1.0.15 (2025-10-27)
-   (@GermanBluefox) Reset the file upload state if IDS restarting
-   (@GermanBluefox) Hide some control elements if instance is offline
-   (@GermanBluefox) Added countdown to the manual trigger button
-   (@GermanBluefox) Send configuration to the container at start

### 1.0.11 (2025-10-23)
-   (@GermanBluefox) Disable docker settings if not possible

### 1.0.10 (2025-10-21)
-   (@GermanBluefox) Increased the saving data threshold

### 1.0.9 (2025-10-20)
-   (@GermanBluefox) Show digits after comma in charts

### 1.0.7 (2025-10-15)
-   (@GermanBluefox) Corrected the volume for docker
-   (@GermanBluefox) Added min,max,step for questionnaire (number)

### 1.0.6 (2025-10-08)
-   (@GermanBluefox) Improved selection of IP address

### 1.0.5 (2025-10-08)
-   (@GermanBluefox) Packages were updated
-   (@GermanBluefox) Corrected questionnaire
-   (@GermanBluefox) Send `save_threshold_seconds` to the container

### 1.0.4 (2025-09-24)
-   (@GermanBluefox) Allowed setting of the port and the bind address for Docker

### 1.0.1 (2025-09-22)
-   (@GermanBluefox) Fixing questionnaire under Firefox

### 1.0.0 (2025-09-19)
-   (@GermanBluefox) Removed sensitivity parameter
-   (@GermanBluefox) Corrected colors in the chart

### 0.3.2 (2025-09-11)

-   (@GermanBluefox) Corrected callback URL

### 0.3.1 (2025-09-10)

-   (@GermanBluefox) Implemented mobile view

### 0.3.0 (2025-09-08)

-   (@GermanBluefox) Implemented the daily status report

### 0.2.1 (2025-09-05)

-   (@GermanBluefox) Showed names of the devices in the chart legend

### 0.2.0 (2025-09-04)

-   (@GermanBluefox) Added direct link to the alarm in the widget

### 0.1.9 (2025-09-03)

-   (@GermanBluefox) Look for vis-(2) project with kisshome widget

### 0.1.8 (2025-09-03)

-   (@GermanBluefox) Fixed GUI issues
-   (@GermanBluefox) Send results to cloud sync folder

### 0.1.6 (2025-08-30)

-   (@GermanBluefox) Do not show scores for later time

### 0.1.5 (2025-08-29)

-   (@GermanBluefox) Fixing the detections in GUI

### 0.1.4 (2025-08-28)

-   (@GermanBluefox) Corrected message sending

### 0.1.3 (2025-08-28)

-   (@GermanBluefox) Removed test cases

### 0.1.1 (2025-08-27)

-   (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2025 Denis Haev <dogafox@gmail.com>

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