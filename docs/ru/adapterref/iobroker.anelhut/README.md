---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.anelhut/README.md
title: ioBroker.anelhut
hash: Tt3XZOsTupdqnAYaTHo7nssjzMRY++Zk6YfQzQ/8Rq4=
---
![Логотип](../../../en/adapterref/iobroker.anelhut/admin/anelhut.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.anelhut.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.anelhut.svg)
![Количество установок (последние)](http://iobroker.live/badges/anelhut-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/anelhut-stable.svg)
![Статус зависимости](https://img.shields.io/david/dan1-de/iobroker.anelhut.svg)
![Известные уязвимости](https://snyk.io/test/github/dan1-de/ioBroker.anelhut/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.anelhut.png?downloads=true)
![Тестирование и выпуск](https://github.com/dan1-de/ioBroker.anelhut/workflows/Test%20and%20Release/badge.svg)

# ioBroker.anelhut

## Адаптер Anelhut для ioBroker

Адаптер для устройств NET-PwrCrtl компании ANEL Electronic AG. Производитель: <https://shop.anel.eu/>

## Этот адаптер совместим со следующими устройствами Anel:

- NET-PwrCtrl HUT
- NET-PwrCtrl IO
- ДОМ
- ПРО
- ВЛАСТЬ
- АДВ

## Использование

- Установите адаптер

- Настройка устройств

  - Включите протокол UDP на вашем устройстве Anel.
  - Введите свойства вашего устройства Anel.

    - DeviceName: Пользовательское имя вашего устройства. Это имя используется для отображения устройства в списке объектов. Пример: anelhut.0.DeviceName
    - DeviceIP: IP-адрес вашего устройства (пожалуйста, не используйте имя хоста)
    - UDPSendPort: Введите порт, отображаемый в веб-интерфейсе вашего устройства Anel. Это порт приема с точки зрения устройства Anel (по умолчанию: 75).
    - UDPRecievePort: Введите порт, отображаемый в веб-интерфейсе вашего устройства Anel. Это порт отправки с точки зрения устройства Anel (по умолчанию: 77).
    - XOR Пользователь и пароль: По умолчанию отключено. Для повышения безопасности вы можете включить шифрование пользователя и пароля с помощью XOR. Не все устройства Anel поддерживают шифрование пользователя и пароля с помощью XOR. Перед включением этой функции проверьте, поддерживает ли ваше устройство эту функцию. Это можно проверить в структуре созданного объекта (устройство -> общие -> XOR\_USER\_Password). Если значение равно true, ваше устройство поддерживает шифрование пользователя и пароля с помощью XOR.

    Важное примечание: если вы хотите управлять несколькими устройствами, используйте для каждого устройства отдельный порт приема. Например, вы можете использовать порт 77 для первого устройства, 78 для второго, 79 для третьего и так далее. Если вы используете только одно устройство, вы можете использовать порт 77 по умолчанию. В качестве порта отправки можно использовать порт 75 по умолчанию для всех устройств. Вы можете изменить порты в веб-интерфейсе устройства.

- Docker
  - Не забудьте настроить переадресацию портов, если вы хотите использовать этот адаптер в среде Docker:
    - 77:77/udp #переадресация портов для первого устройства Anel
    - 78:78/udp #переадресация портов для второго устройства Anel
  - Рабочий пример использования docker-compose можно найти в этом репозитории (examples/docker-compose.yml).

## Примечание

Этот адаптер был протестирован со всеми устройствами Anel. Спасибо разработчику Anel :). Пожалуйста, сообщайте о любых проблемах.

## Известные проблемы

### NET-PwrCtrl PRO

Пожалуйста, используйте последнюю версию прошивки (4.2). Вы можете скачать её по ссылке [: https://de.anel.eu/index.htm?src=support/hut/hut.htm](https://de.anel.eu/index.htm?src=support/hut/hut.htm)

## Changelog

### 1.0.15

-   (dan1-de) Bugfix for new jscontroller 5

### 1.0.14

-   (dan1-de) Added new Logs messages for Relais Switch Command in Debug Mode

### 1.0.13

-   (dan1-de) Improved error message for user/password missing. Added new Testcase for Message decode of NET-PWRCTRL_07.1

### 1.0.12

-   (dan1-de) Cosmetic change in index_m.html

### 1.0.11

-   (dan1-de) Implemented fix for Relais Status "You are assigning a number to the state which expects a boolean" Github issue/26

### 1.0.10

-   (dan1-de) Implemented XOR User/Password encryption; improved logging/log levels;

### 1.0.9

-   (dan1-de) Corrected bug for Pro v3

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

Copyright (c) 2023 dan1-de dan1-de@gmx.de

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