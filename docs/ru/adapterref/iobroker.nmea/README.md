---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nmea/README.md
title: ioBroker.nmea
hash: vCBjYK3WCOWWlFgakL8tYFBe3C7h7qjsD8NUn2FuIoI=
---
![Логотип](../../../en/adapterref/iobroker.nmea/admin/nmea.png)

# IoBroker.nmea Этот адаптер позволяет подключить ioBroker к яхтенной шине NMEA-2000.
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

Для использования этого адаптера вам потребуется оборудование, способное считывать данные с шины NMEA-2000 и преобразовывать их в последовательный порт:

- [Actisense NGT-1 (USB)](https://actisense.com/products/ngt-1-nmea-2000-to-pc-interface/)
- [Actisense NGX1-USB (USB)](https://actisense.com/products/nmea-2000-gateway-ngx-1/)
- или [Raspberry PI с PiCAN-M](https://www.skpang.co.uk/collections/hats/products/copy-of-pican-m-with-can-bus-micro-c-and-rs422-connector-no-smps)
- [Устройства для яхт YDWG-02/03](https://www.yachtd.com/products/wifi_gateway.html)
- [Yacht Devices YDEN-02/03](https://www.yachtd.com/products/ethernet_gateway.html)

PiCAN-M может работать с Raspberry 4 и [5](https://copperhilltech.com/blog/testing-pican-can-bus-hats-with-the-raspberry-pi-5/).

![Виджеты](../../../en/adapterref/iobroker.nmea/img/widgetExamples.png)

[Объяснение на YouTube](https://youtu.be/flp_-mypbRU?si=k0lp95OukQ88LBxj)

## Как использовать его на Raspberry PI с PiCAN-M
PiCAN M — это компактная дополнительная плата, разработанная для Raspberry Pi 3/4.
Она позволяет подключать к Raspberry Pi сети NMEA2000 и NMEA0183.
Питание платы может осуществляться от внешнего источника 12 В.
Кроме того, при использовании с платой PiCAN-M она предоставляет возможность питания Raspberry Pi напрямую через шину NMEA2000.

**PiCAN-M не имеет надлежащей защиты от обратной полярности при напряжении питания 12 В. При работе от внешнего источника питания 12 В необходимо установить предохранитель на 1 А в линию питания.**

В связи с высокими требованиями Raspberry Pi к питанию, мы рекомендуем питать Raspberry Pi от внешнего источника питания (не менее 3 А).
Питание через NMEA2000 и через USB может работать параллельно без проблем.

### Установка
Более подробная информация содержится в главе 3 раздела [Руководство пользователя PiCAN-M](img/pican-m_UGB_10.pdf), но вот краткое изложение:

Отредактируйте файл `/boot/config.txt` (заменив его на `sudo nano /boot/config.txt`) и добавьте в конец файла следующие строки:

```
enable_uart=1
dtparam=i2c_arm=on
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25
```

Отключить вывод на консоль UART:

- Запуск в командной строке: `sudo raspi-config`
- перейдите в раздел «3 параметра интерфейса»
- перейдите в раздел «Последовательный порт I5»
— Отключить параметры «доступ к оболочке через последовательный порт» и «аппаратное обеспечение последовательного порта включено».
— Выйдите из `raspi-config` и перезагрузите устройство.

Установите can-utils

```shell
sudo apt-get install can-utils
```

## Actisense NGT-1
Устройство Actisense NGT-1 отображается в Windows или Linux без каких-либо дополнительных драйверов. Оно отображается как последовательный порт 'COMn' (Windows) или ttyN (Linux).

## YDEN, YDWG
Включите сервер N2 с протоколом TCP и двунаправленным режимом.

![YDWG](../../../en/adapterref/iobroker.nmea/img/yacht-devices.png)

Протокол UDP тоже мог бы подойти, но шлюз непрерывно отправляет данные в сеть, поэтому шина может быть перегружена.

## Todo
- Кодировать код
- АИС
- выяснить, почему были отправлены данные с адреса 100
- Интеграция [iKonvert NMEA 2000](https://digitalyachtamerica.com/product/ikonvert-usb/)
- Интеграция [Shipmodul MiniPlex-3-N2K](https://www.shipmodul.com/products.html)

## Моделирование данных
Вы можете передавать данные с внешних датчиков на шину NMEA2000.
На самом деле, вы можете только имитировать данные об окружающей среде, такие как температура, влажность, давление.

С помощью флага `Combined environment` можно задать номер PGN, который будет использоваться для температуры, влажности и давления:

- Если снять флажок «Комбинированная среда», то для температуры будет использоваться PGN 130314, для влажности — PGN 130313, а для давления — PGN 130314.
- Если вы выберете флаг «Объединенная среда», то все три значения будут отправлены в PGN 130311 вместе с другими возможными значениями среды.

## Часовой пояс
Существует возможность установить часовой пояс по GPS-координатам.
Для этого необходимо включить соответствующую опцию в настройках адаптера и разрешить пользователю `iobroker` выполнение команды: `sudo visudo`

```
iobroker ALL=(ALL) timedatectl set-timezone
```

## Автопилот
На самом деле поддерживается только один автопилот: Raymarine.

Разработка Simrad/Navico/B&G еще не завершена.

<!--

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 0.4.0 (2025-11-30)
* (bluefox) Added support of YDEN-02/03 and YDWG-02/03 gateways

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