---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lgtv-rs/README.md
title: ioBroker LG TV RS232 адаптер
hash: Fd3OcKpG4vM1G1G4W4qa2bvzSGds4hV42NrpI17GAQI=
---
![Логотип](../../../en/adapterref/iobroker.lgtv-rs/admin/lg_admin.png)

![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker LG TV RS232 адаптер
Адаптер ioBroker LG TV RS232 используется для управления телевизором LG через RS232 вместе со шлюзом Etnernet.
Список моделей и команд содержится в файле `admin/commands.json`.

## Аппаратное обеспечение
Драйвер позволяет подключаться к телевизору LG через [адаптер](http://blog.instalator.ru/archives/744) RS232 к Ethernet.

В качестве шлюза RS232 к Ethernet используется любая совместимая с Arduino карта, на которую необходимо загрузить [этот код](https://github.com/stepansnigirev/ArduinoSerialToEthernet).
Вам также понадобится Ethernet Shield W5100 или W5500 и преобразователь RS232 в TTL.

## Служба поддержки
Поддерживаемые модели: LD750 будет ...

## Changelog

### 0.1.1
  (instalator) change test

### 0.1.0
  (instalator) support compact mode
  (instalator) support admin3
  (instalator) refactoring

### 0.0.4
  (instalator) fix error

### 0.0.3
  (instalator) alfa

### 0.0.1
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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