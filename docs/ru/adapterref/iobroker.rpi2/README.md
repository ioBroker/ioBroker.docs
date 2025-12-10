---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rpi2/README.md
title: ioBroker.rpi2
hash: fbU6FaS3bzboHSlRMuHMlIk6qVYzKCwSWuDiRMuGnhg=
---
# IoBroker.rpi2

![версия НПМ](https://img.shields.io/npm/v/iobroker.rpi2?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rpi2?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.rpi2?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.rpi2?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.rpi2?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![Активность коммитов GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.rpi2?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.rpi2/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Бета](https://img.shields.io/npm/v/iobroker.rpi2.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/rpi2-stable.svg)
![Установлено](http://iobroker.live/badges/rpi2-installed.svg)

## Версии
Адаптер RPI-Monitor для ioBroker

Реализация RPI-Monitor для интеграции в ioBroker. Это та же реализация, что и для iobroker.rpi, но с использованием GPIO.

## Важная информация
**Для управления GPIO пользователю ioBroker требуются специальные разрешения.** В большинстве дистрибутивов Linux этого можно добиться, добавив пользователя ioBroker в группу `gpio`.

Для работы GPIO необходимо установить `libgpiod` в версии `2.x`, **до** установки адаптера (см. ниже)!

## Установка
После установки необходимо настроить все необходимые модули через страницу администрирования.

После запуска iobroker.rpi все выбранные модули генерируют дерево объектов в ioBroker внутри rpi.<instance>.<modulename>, например, `rpi.0.cpu`

Убедитесь, что Python и build-essential установлены:

```bash
sudo apt update
sudo apt install -y build-essential python
sudo apt install -y libgpiod-dev
```

(Последний пункт необходим только в том случае, если вы хотите работать с GPIO)

После выбора становятся доступны следующие объекты:

#### **ПРОЦЕССОР**
- частота процессора
- load1
- load5
- загрузка15

#### **Raspberry Pi (требуется vcgencmd)**
- напряжение процессора
- mem_arm
- mem_gpu

#### **Память**
- доступная_память
- memory_free
- memory_total

#### **Сеть (eth0)**
- net_received
- net_send

#### **SDCard**
- sdcard_boot_total
- sdcard_boot_used
- sdcard_root_total
- sdcard_root_used

#### **Менять**
- swap_total
- swap_used

#### **Температура**
- soc_temp

#### **Время работы**
- время безотказной работы

#### **WLAN**
- wifi_received
- wifi_send

## Конфигурация
На странице настроек вы можете выбрать следующие модули:

- ПРОЦЕССОР
- Малина
- Память
- Сеть
- SD-карта
- Менять
- Температура
- Время безотказной работы
- Беспроводная сеть

### Температура NVME
Начиная с версии адаптера 2.3.2, вы можете считывать температуру NVMe. Для этого необходимо установить пакет `nvme-cli` в вашей системе.
Это можно сделать с помощью следующей команды: `sudo apt-get install nvme-cli`. Также вам потребуется добавить команду в файл sudoers ioBroker `/etc/sudoers.d/iobroker`. Откройте его в редакторе, например nano: `sudo nano /etc/sudoers.d/iobroker` и добавьте в конец следующую строку: `nvme smart-log /dev/nvme0`.

## GPIO
Вы также можете считывать данные с выводов GPIO и управлять ими.
Всё, что вам нужно сделать, это настроить параметры выводов GPIO в настройках (дополнительная вкладка).

![GPIO](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

После включения некоторых портов в дереве объектов появляются следующие состояния:

- rpi.0.gpio.PORT.state

Нумерация портов — это BCM (контакты BroadComm на микросхеме). Вы можете получить нумерацию с помощью ```gpio readall```.
Например, PI2:

```
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
|     |     |    3.3v |      |   |  1 || 2  |   |      | 5v      |     |     |
|   2 |   8 |   SDA.1 | ALT0 | 1 |  3 || 4  |   |      | 5V      |     |     |
|   3 |   9 |   SCL.1 | ALT0 | 1 |  5 || 6  |   |      | 0v      |     |     |
|   4 |   7 | GPIO. 7 |   IN | 1 |  7 || 8  | 0 | IN   | TxD     | 15  | 14  |
|     |     |      0v |      |   |  9 || 10 | 1 | IN   | RxD     | 16  | 15  |
|  17 |   0 | GPIO. 0 |   IN | 0 | 11 || 12 | 0 | IN   | GPIO. 1 | 1   | 18  |
|  27 |   2 | GPIO. 2 |   IN | 0 | 13 || 14 |   |      | 0v      |     |     |
|  22 |   3 | GPIO. 3 |   IN | 0 | 15 || 16 | 0 | IN   | GPIO. 4 | 4   | 23  |
|     |     |    3.3v |      |   | 17 || 18 | 0 | IN   | GPIO. 5 | 5   | 24  |
|  10 |  12 |    MOSI |   IN | 0 | 19 || 20 |   |      | 0v      |     |     |
|   9 |  13 |    MISO |   IN | 0 | 21 || 22 | 1 | IN   | GPIO. 6 | 6   | 25  |
|  11 |  14 |    SCLK |   IN | 0 | 23 || 24 | 1 | IN   | CE0     | 10  | 8   |
|     |     |      0v |      |   | 25 || 26 | 1 | IN   | CE1     | 11  | 7   |
|   0 |  30 |   SDA.0 |   IN | 1 | 27 || 28 | 1 | IN   | SCL.0   | 31  | 1   |
|   5 |  21 | GPIO.21 |   IN | 1 | 29 || 30 |   |      | 0v      |     |     |
|   6 |  22 | GPIO.22 |   IN | 1 | 31 || 32 | 0 | IN   | GPIO.26 | 26  | 12  |
|  13 |  23 | GPIO.23 |   IN | 0 | 33 || 34 |   |      | 0v      |     |     |
|  19 |  24 | GPIO.24 |   IN | 0 | 35 || 36 | 0 | IN   | GPIO.27 | 27  | 16  |
|  26 |  25 | GPIO.25 |  OUT | 1 | 37 || 38 | 0 | IN   | GPIO.28 | 28  | 20  |
|     |     |      0v |      |   | 39 || 40 | 0 | IN   | GPIO.29 | 29  | 21  |
+-----+-----+---------+------+---+----++----+---+------+---------+-----+-----+
| BCM | wPi |   Name  | Mode | V | Physical | V | Mode | Name    | wPi | BCM |
+-----+-----+---------+------+---+---Pi 2---+---+------+---------+-----+-----+
```

## Датчики DHTxx/AM23xx
Вы можете считывать показания с датчиков температуры/влажности DHT11, DHT22 и AM2302.

Подключите такой датчик к выводу GPIO, как описано на странице корпуса [node-dht-sensor](https://www.npmjs.com/package/node-dht-sensor). К *нескольким* выводам можно подключить *несколько* датчиков (это *не* шинная система), как обсуждалось ранее.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 3.0.2 (2025-12-01)
* (@klein0r) Check for required libgpiod-dev package version

### 3.0.1 (2025-11-28)
* (@klein0r) Updated logo, workflows and documentation
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required

### 3.0.0 (2025-11-28)
* (@klein0r) NodeJS 20.x (or newer) is required
* (@klein0r) Updated opengpio to v2 (works on Debian trixie)

### 2.4.0 (2025-03-06)
* (Garfonso) read the current state of GPIO outputs during adapter startup.
* (Garfonso) re-read GPIO input, if set by the user (with ack=false).
* (Garfonso) add an option to invert true/false mapping to 1/0.
* (Garfonso) Allow multiple instances of this adapter per host.
* (Garfonso) tried to improve initialization of GPIO inputs.

### 2.3.2 (2025-02-06)
* (asgothian) added support for NVMe temperature (needs additional configuration, see README)
* (Garfonso) fixed inital values for outputs.

## License
MIT License

Copyright (c) 2024-2025 Garfonso <garfonso@mobo.info>

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