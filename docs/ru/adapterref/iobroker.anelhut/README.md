---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.anelhut/README.md
title: ioBroker.anelhut
hash: qHBX938Mot0bWfSeEQ4Kd+eulVmZYcY0xj3AYvIKCvg=
---
![Логотип](../../../en/adapterref/iobroker.anelhut/admin/anelhut.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.anelhut.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.anelhut.svg)
![Количество установок (последнее)](http://iobroker.live/badges/anelhut-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/anelhut-stable.svg)
![Статус зависимости](https://img.shields.io/david/dan1-de/iobroker.anelhut.svg)
![Известные уязвимости](https://snyk.io/test/github/dan1-de/ioBroker.anelhut/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.anelhut.png?downloads=true)

# IoBroker.anelhut
** Тесты: ** ![Тестирование и выпуск](https://github.com/dan1-de/ioBroker.anelhut/workflows/Test%20and%20Release/badge.svg)

## Адаптер anelhut для ioBroker
Адаптер для устройств NET-PwrCrtl от ANEL Electronic AG.
Производитель: https://shop.anel.eu/

## Этот адаптер работает со следующими устройствами anel:
- NET-PwrCtrl HUT
- NET-PwrCtrl IO
-   ДОМ
- ПРО
-   ВЛАСТЬ
- ADV

## Использование
- Установить адаптер

- Настроить устройства

    - Включите UDP-соединение на вашем устройстве Anel
    - Вставьте свойства вашего устройства Anel

        - DeviceName: настраиваемое имя вашего устройства. Это имя используется для отображения устройства в списке объектов. Пример: anelhut.0.DeviceName
        - DeviceIP: IP-адрес вашего устройства (пожалуйста, не используйте имя хоста)
        - UDPSendPort: вставьте порт, который отображается в веб-интерфейсе вашего устройства Anel. Это порт приема с точки зрения устройства anel (по умолчанию: 75).
        - UDPRecievePort: вставьте порт, который отображается в веб-интерфейсе вашего устройства Anel. Это порт отправки с точки зрения устройства anel (по умолчанию: 77).

Важное примечание: если вы хотите управлять несколькими устройствами, используйте разные порты приема для каждого устройства.
Например, вы можете использовать порт 77 для первого устройства, 78 для второго, 79 для третьего и так далее.
Если вы используете только одно устройство, вы можете использовать порт 77 по умолчанию.
Для порта отправки порт 75 по умолчанию может использоваться для всех устройств.
Вы можете изменить порты на веб-интерфейсе устройства.

- Докер
    - Не забудьте про переадресацию портов, если вы хотите использовать этот адаптер со средой докеров:
        - 77: 77 / udp # перенаправление порта первое устройство anel
        - 78: 78 / udp # переадресация порта второго устройства anel

## Примечание
Этот адаптер был протестирован со всеми устройствами Anel. Спасибо разработчику анеля :).
Пожалуйста, сообщайте о любых проблемах.

## Changelog

### 1.0.8

-   (dan1-de) Quick Fix: Corrected bug in io control

### 1.0.7

-   (dan1-de) Added possibility to control IO's; Code restructure

### 1.0.6

-   (dan1-de) Fixed issues with sensor; display only 3 relais at anel home device; display type code instead of only letter; fixed temperature

### 1.0.4

-   (dan1-de) New Icon; Improved object structure

### 1.0.3

-   (dan1-de) Improvements: logging, udp broadcast adress, configuration

### 1.0.0

-   (dan1-de) initial release

## License

MIT License

Copyright (c) 2021 dan1-de <dan1-de@gmx.de>

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