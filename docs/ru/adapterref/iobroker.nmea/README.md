---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nmea/README.md
title: ioBroker.nmea
hash: U06Gr9hESafFHlewxSL4RCzHxbWVW/nJ+R6atcrITFs=
---
![Логотип](../../../en/adapterref/iobroker.nmea/admin/nmea.png)

# IoBroker.nmea Этот адаптер позволяет подключить ioBroker к яхтенному автобусу NMEA-2000.
Чтобы использовать этот адаптер, вам необходимо оборудование, которое может читать шину NMEA-2000 и преобразовывать ее в последовательный порт:

- Actisense NGT-1 (USB)
- или Raspberry PI с Пиканом-М

![Виджеты](../../../en/adapterref/iobroker.nmea/img/widgetExamples.png)

## Как использовать его на Raspberry PI с Pican-M
PiCAN M — это компактная дополнительная плата, разработанная для Raspberry Pi 3/4.
Он позволяет подключать сети NMEA2000 и NMEA0183 к Raspberry Pi.
Плата может питаться от внешнего источника 12 В.
Кроме того, он предлагает возможность питать Raspberry Pi напрямую через шину NMEA2000 при использовании с платой PiCAN-M.

Из-за высоких требований Raspberry Pi к электропитанию мы предлагаем питать Raspberry PI от внешнего источника питания.
Питание через NMEA2000 и через USB может без проблем работать параллельно.

### Монтаж
Отредактируйте файл `/boot/config.txt` (с `sudo nano /boot/config.txt`) и добавьте в конец файла следующие строки:

```
enable_uart=1
dtparam=i2c_arm=on
dtparam=spi=on
dtoverlay=mcp2515-can0,oscillator=16000000,interrupt=25
```

Отключите выходы на консоли UART:

- запустите в CLI `sudo raspi-config`
- перейдите в раздел «3 варианта интерфейса»
- перейдите к `I5 Serial Port`
- Отключите «оболочку, доступную через последовательный порт» и «оборудование последовательного порта включено».
- Выйти из raspi-config и перезагрузиться.

Установите can-utils

```
sudo apt-get install can-utils
```

## Актисенс НГТ-1
Actisense NGT-1 виден в Windows или Linux без каких-либо дополнительных драйверов. Он отображается как последовательный порт «COMn» (Windows) или ttyN (в Linux).

## Делать
- Кодировать код
- АИС
- узнать, почему отправлены данные с адреса 100

<!--

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 0.0.4 (2024-03-12)
* (bluefox) Fixed CI tests

### 0.0.3 (2024-03-12)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024 bluefox <dogafox@gmail.com>

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