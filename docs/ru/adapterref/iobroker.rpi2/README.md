---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.rpi2/README.md
title: без заголовка
hash: G9+pPja5y/AjJQaB9C9Q6N56ohBNs3VK6oK3cmSPVsM=
---
![Логотип](../../../en/adapterref/iobroker.rpi2/admin/rpi2.png) Адаптер ioBroker RPI-Monitor

![НПМ-версия](https://img.shields.io/npm/v/iobroker.rpi2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.rpi2.svg)
![Количество установок](https://iobroker.live/badges/rpi2-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/rpi2-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.rpi2.png?downloads=true)

==============

**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.rpi2/workflows/Test%20and%20Release/badge.svg) Реализация RPI-Monitor для интеграции в ioBroker. Это та же реализация, что и для iobroker.rpi, но с GPIO.

## Важная информация
Работает только с узлом >= 18

**ioBroker требуются специальные разрешения для управления GPIO.** В большинстве дистрибутивов Linux этого можно добиться, добавив пользователя ioBroker в группу `gpio` (рекомендуется) или запустив ioBroker под `root` (менее безопасно).

## Монтаж
После установки вам необходимо настроить все необходимые модули через страницу администрирования.

После запуска iobroker.rpi все выбранные модули генерируют дерево объектов в ioBroker внутри rpi.<экземпляр>.<имя модуля>, например. rpi.0.cpu

Убедитесь, что установлены Python и build-essential:

```
sudo apt-get update
sudo apt-get install -y build-essential python
```

После выбора доступны следующие объекты:

#### **ПРОЦЕССОР**
- частота процессора
- нагрузка1
- нагрузка5
- нагрузка15

#### **Raspberry (требуется vcgencmd)**
- напряжение процессора
- mem_arm
- мем_гпу

#### **Объем памяти**
- память_доступна
- память_свободно
- память_всего

#### **Сеть (eth0)**
- net_received
- net_send

#### **SD Card**
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

#### **Беспроводная локальная сеть**
- wifi_received
- wifi_send

## Конфигурация
На странице конфигурации вы можете выбрать следующие модули:

- ПРОЦЕССОР
- Малина
- Объем памяти
- Сеть
- SD Card
- Менять
- Температура
- Время безотказной работы
- WLAN

## Файлы журналов/Настройки конфигурации
## Функции
## Делать
## Протестированное оборудование
 - Одроид С1
 - Малиновый Пи 1

## GPIO
Вы также можете читать и контролировать GPIO.
Все, что вам нужно сделать, это настроить в настройках параметры GPIO (дополнительная вкладка).

![GPIO](../../../en/adapterref/iobroker.rpi2/img/pi3_gpio.png)

После включения некоторых портов в дереве объектов появляются следующие состояния:

- rpi.0.gpio.PORT.state

Нумерация портов — BCM (контакты BroadComm на чипе). Вы можете получить перечисление с помощью ```gpio readall```.
Например PI2:

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
Вы можете считывать данные с датчиков температуры/влажности DHT11, DHT22 и AM2302.

Подключите такой датчик к выводу GPIO, как описано на странице пакета [узел-dht-сенсор](https://www.npmjs.com/package/node-dht-sensor). Несколько датчиков могут быть подключены к *нескольким* контактам (это *не* шинная система), как обсуждалось.

## Changelog

<!--
	PLACEHOLDER for the next version:
	### **WORK IN PROGRESS**
-->
### 2.0.0-alpha.3 (2024-05-24)
* (Garfonso) fix crash

### 2.0.0-alpha.2 (2024-05-24)
* (Garfonso) get rid of old sync-exec.

### 2.0.0-alpha.1 (2024-05-23)
* (Garfonso) Fix stuff.

### 2.0.0-alpha.0 (2024-05-23)
* (Garfonso) Get stuff up to date...

### 1.3.2 (2022-02-17)
* Important: This version requires at leas js-controller 3.3
* (Apollon77) Stop the adapter when GPIO module is configured but not working due to a needed rebuild that js-controller can pick up

### 1.3.1 (2021-07-16)
* (Apollon77) Prevent js-controller 3.3 warnings

### 1.3.0 (2021-07-16)
* (asgothian) Fix to get CPU frequencies also on Raspi 4
* (raintor) Add support for DHTxx/AM23xx Sensors
* (raintor) Configure internal Pull UP/Down Resistor
* (raintor) Add port 'label'/'friendly name' to GPIO config

### 1.2.0 (2020-01-17)
- (janfromberlin) GPIO configuration as output with defined initial value
- (foxriver76) No longer use adapter.objects
- (Apollon77) Adjust gpio errors

### 1.1.1
- (Apollon77) Error messages for not existing values are logged only once

### 1.1.0
 - (Apollon77) Nodejs 10 support

### 1.0.0 (2018-08-20)
 - (bluefox) Admin3 support

### 0.3.2 (2017-11-29)
 - (Homoran) fixed Mem available readings on Stretch

### 0.3.1 (2017-01-11)
 - (olifre) Fixup swap_used calculation.

### 0.2.2 (2016-12-01)
 - (bluefox) Add GPIO direction indication

### 0.2.2 (2016-11-22)
 - (bluefox) Use BCM enumeration

### 0.2.1 (2016-10-29)
 - (bluefox) fix start of adapter

### 0.2.0 (2016-10-23)
 - (bluefox) just version change

### 0.1.1 (2016-10-13)
 - (bluefox) implement GPIOs control

### 0.0.4 (2016-03-25)
 - (bluefox) Try catch by eval
   (bluefox) do not process if exec fails

### 0.0.3 (2015-12-28)
 - (husky-koglhof) Fixed value calc.
   Set Value to 2 digits

### 0.0.2 (2015-12-26)
 - (husky-koglhof) Workaround for node 0.10.x
 - (bluefox) Some Fixes

### 0.0.1 (2015-12-23)
 - Initial commit. Alpha Version.

## License
MIT License

Copyright (c) 2024 Garfonso <garfonso@mobo.info>

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
