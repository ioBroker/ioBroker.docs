---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rpi2/README.md
title: нет названия
hash: cWeo+oq08XAAh++hWgPAHjLTCo8IlnCkgOpYAAeWOEM=
---
![Логотип](../../../en/adapterref/iobroker.rpi2/admin/rpi2.png) Адаптер ioBroker RPI-монитор

![версия НПМ](https://img.shields.io/npm/v/iobroker.rpi2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rpi2.svg)
![Количество установок](https://iobroker.live/badges/rpi2-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/rpi2-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.rpi2.png?downloads=true)

==============

**Тесты:** ![Тест и выпуск](https://github.com/iobroker-community-adapters/ioBroker.rpi2/workflows/Test%20and%20Release/badge.svg) Реализация RPI-Monitor для интеграции в ioBroker. Это та же реализация, что и для iobroker.rpi, но с GPIO.

## Важная информация
Работает только с узлом >= 18

**ioBroker требуются специальные разрешения для управления GPIO.** В большинстве дистрибутивов Linux этого можно добиться, добавив пользователя ioBroker в группу `gpio` (рекомендуется) или запустив ioBroker под учетной записью `root` (менее безопасно).

Для работы gpio необходимо установить libgpiod **перед** установкой адаптера, например так: `sudo apt-get install -y libgpiod-dev`

## Установка
После установки вам необходимо настроить все необходимые модули через страницу администрирования.

После запуска iobroker.rpi все выбранные модули генерируют дерево объектов в ioBroker в rpi.<instance>.<modulename> например rpi.0.cpu

Убедитесь, что установлены python и build-essential:

```
sudo apt-get update
sudo apt-get install -y build-essential python
sudo apt-get install -y libgpiod-dev
```

(последний необходим только если вы хотите работать с GPIO)

После выбора доступны следующие объекты:

#### **ПРОЦЕССОР**
- частота_процессора
- нагрузка1
- нагрузка5
- нагрузка15

#### **Raspberry (требуется vcgencmd)**
- напряжение_процессора
- mem_arm
- mem_gpu

#### **Память**
- память_доступна
- память_свободна
- память_всего

#### **Сеть (eth0)**
- net_received
- net_send

#### **SD-карта**
- sdcard_boot_total
- sdcard_boot_used
- sdcard_root_total
- sdcard_root_used

#### **Менять**
- swap_total
- swap_used

#### **Температура**
- soc_temp

#### **Время безотказной работы**
- время безотказной работы

#### **Беспроводная ЛВС**
- wifi_получен
- wifi_send

## Конфигурация
На странице конфигурации вы можете выбрать следующие модули:

- ПРОЦЕССОР
- Малина
- Память
- Сеть
- SD-карта
- Менять
- Температура
- Время безотказной работы
- Беспроводная локальная сеть

### Температура NVME
Начиная с версии адаптера 2.3.2 вы можете считывать температуру NVMe. Для этого вам необходимо установить пакет `nvme-cli` в вашей системе.
Это можно сделать с помощью следующей команды: `sudo apt-get install nvme-cli`. Вам также необходимо добавить команду в файл ioBroker sudoers `/etc/sudoers.d/iobroker`. Откройте его с помощью редактора, например nano: `sudo nano /etc/sudoers.d/iobroker` и добавьте следующую строку: `nvme smart-log /dev/nvme0` в конец.

## GPIO
Вы также можете читать и управлять GPIO.
Все, что вам нужно сделать, это настроить параметры GPIO в настройках (дополнительная вкладка).

![GPIO](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

После включения некоторых портов в дереве объектов появляются следующие состояния:

- rpi.0.gpio.PORT.state

Нумерация портов — BCM (контакты BroadComm на чипе). Вы можете получить нумерацию с помощью ```gpio readall```.
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

Подключите такой датчик к выводу GPIO, как описано на странице пакета [узел-dht-датчик](https://www.npmjs.com/package/node-dht-sensor). Несколько датчиков можно подключить к *нескольким* выводам (это *не* шинная система), как обсуждалось.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 2.4.0 (2025-03-06)
* (Garfonso) read the current state of GPIO outputs during adapter startup.
* (Garfonso) re-read GPIO input, if set by the user (with ack=false).
* (Garfonso) add an option to invert true/false mapping to 1/0.
* (Garfonso) Allow multiple instances of this adapter per host.
* (Garfonso) tried to improve initialization of GPIO inputs.

### 2.3.2 (2025-02-06)
* (asgothian) added support for NVMe temperature (needs additional configuration, see README)
* (Garfonso) fixed inital values for outputs.

### 2.3.1 (2025-01-06)
* (Garfonso) fixed: GPIO library failed to load after recent dependency update.

### 2.3.0 (2024-12-23)
* (Garfonso) correct interpretation of start value setting. Output with initial value 0/1 will set GPIO accordingly during startup. Output without an initial state will not set GPIO at all.

### 2.2.2 (2024-11-02)
* (simatec) responsive design for settings page added

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