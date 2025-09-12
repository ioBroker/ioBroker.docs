---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nmea/README.md
title: ioBroker.nmea
hash: xv4gSNvUObtOc0uw1l5uXOk+BDw82/trbY3tJYq5O34=
---
![Логотип](../../../en/adapterref/iobroker.nmea/admin/nmea.png)

# IoBroker.nmea Этот адаптер позволяет подключить ioBroker к яхтенной шине NMEA-2000.
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении сообщений об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сообщения Sentry используются, начиная с версии js-controller 3.0.

Для использования этого адаптера вам потребуется оборудование, способное считывать шину NMEA-2000 и преобразовывать ее в последовательный порт:

- [Actisense NGT-1 (USB)](https://actisense.com/products/ngt-1-nmea-2000-to-pc-interface/)
- [Actisense NGX1-USB (USB)](https://actisense.com/products/nmea-2000-gateway-ngx-1/)
- или [Raspberry PI с PiCAN-M](https://www.skpang.co.uk/collections/hats/products/copy-of-pican-m-with-can-bus-micro-c-and-rs422-connector-no-smps)

PiCAN-M может работать с Raspberry 4 и [5](https://copperhilltech.com/blog/testing-pican-can-bus-hats-with-the-raspberry-pi-5/).

![Виджеты](../../../en/adapterref/iobroker.nmea/img/widgetExamples.png)

[объяснение на YouTube](https://youtu.be/flp_-mypbRU?si=k0lp95OukQ88LBxj)

## Как использовать его на Raspberry PI с PiCAN-M
PiCAN M — это компактная плата расширения, разработанная для Raspberry Pi 3/4.
Она позволяет подключать Raspberry Pi по сетям NMEA2000 и NMEA0183.
Плата может питаться от внешнего источника 12 В.
Кроме того, она позволяет питать Raspberry Pi напрямую через шину NMEA2000 при использовании с платой PiCAN-M.

**PiCAN-M не имеет соответствующей защиты от переполюсовки напряжения питания 12 В. При работе от внешнего источника питания 12 В необходимо установить предохранитель на 1 А в линию питания.**

В связи с высокими требованиями Raspberry Pi к электропитанию мы рекомендуем подключать Raspberry Pi к внешнему источнику питания (не менее 3 А).
Питание по NMEA2000 и через USB может работать параллельно без проблем.

### Установка
Более подробную информацию см. в главе 3 в [Руководство пользователя PiCAN-M](img/pican-m_UGB_10.pdf), но вот краткое изложение:

Отредактируйте файл `/boot/config.txt` (с `sudo nano /boot/config.txt`) и добавьте следующие строки в конец файла:

```
enable_uart=1
dtparam=i2c_arm=on
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25
```

Отключить выходы на консоли UART:

- запустить в CLI `sudo raspi-config`
- перейдите в раздел «3 варианта интерфейса»
- go ot `I5 Serial Port`
- Отключить «оболочку, доступную через последовательный порт» и «аппаратное обеспечение последовательного порта включено»
- Выйдите из `raspi-config` и перезагрузитесь.

Установить can-utils

```shell
sudo apt-get install can-utils
```

## Actisense NGT-1
Actisense NGT-1 виден в Windows и Linux без дополнительных драйверов. Он отображается как последовательный порт COMn (в Windows) или ttyN (в Linux).

## Задача
- Кодировать код
- АИС
- выяснить, почему отправленные данные с адреса 100
- Интеграция [iKonvert NMEA 2000](https://digitalyachtamerica.com/product/ikonvert-usb/)
- Интеграция [Shipmodul MiniPlex-3-N2K](https://www.shipmodul.com/products.html)

## Моделирование данных
Вы можете передавать данные с внешних датчиков в шину NMEA2000.
Фактически, вы можете моделировать только данные окружающей среды, такие как температура, влажность и давление.

С помощью флага `Combined environment` вы можете определить номер PGN, который будет использоваться для температуры, влажности и давления:

- Если снять флажок «Комбинированная среда», то для температуры будет использоваться PGN 130314, для влажности PGN 130313 и для давления PGN 130314.
- Если выбран флаг «Комбинированная среда», то все три значения будут отправлены в PGN 130311 вместе с другими возможными значениями среды.

## Часовой пояс
Существует возможность установки часового пояса по GPS-координатам.
Для этого необходимо включить соответствующую опцию в настройках адаптера и разрешить пользователю `iobroker` выполнение команды: `sudo visudo`

```
iobroker ALL=(ALL) timedatectl set-timezone
```

## Автопилот
На самом деле поддерживается только один автопилот: Raymarine.

Разработка Simrad/navico/B&G еще не завершена.

<!--

### **РАБОТА В ХОДЕ** -->

## Changelog
### 0.3.0 (2025-08-16)
* (bluefox) Widgets were rewritten on TypeScript
* (bluefox) Corrected errors in the widgets and in the calculations
* (bluefox) Small fix for ais data

### 0.2.2 (2024-06-20)
* (bluefox) Backend was rewritten on TypeScript
* (bluefox) Support for AIS added
* (bluefox) Valid processing of temperature, pressure and humidity

### 0.1.8 (2024-03-20)
* (bluefox) Corrected vis-2 widgets

### 0.1.1 (2024-03-19)
* (bluefox) Corrected vis-2 widgets

### 0.0.4 (2024-03-12)
* (bluefox) Fixed CI tests

### 0.0.3 (2024-03-12)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024-2025 bluefox <dogafox@gmail.com>

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