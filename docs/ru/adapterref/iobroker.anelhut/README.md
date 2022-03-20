---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.anelhut/README.md
title: ioBroker.anelhut
hash: /VmtWU7XAgQsJ0sAfuhMVh06Ou9jdZhL6ypEUXTC8IU=
---
![Логотип](../../../en/adapterref/iobroker.anelhut/admin/anelhut.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.anelhut.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.anelhut.svg)
![Количество установок (последние)](http://iobroker.live/badges/anelhut-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/anelhut-stable.svg)
![Статус зависимости](https://img.shields.io/david/dan1-de/iobroker.anelhut.svg)
![Известные уязвимости](https://snyk.io/test/github/dan1-de/ioBroker.anelhut/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.anelhut.png?downloads=true)

# IoBroker.anelhut
**Тесты:** ![Тестируйте и выпускайте](https://github.com/dan1-de/ioBroker.anelhut/workflows/Test%20and%20Release/badge.svg)

## Адаптер anelhut для ioBroker
Адаптер для устройств NET-PwrCrtl ANEL Electronic AG.
Производитель: https://shop.anel.eu/

## Этот адаптер работает со следующими устройствами:
- NET-PwrCtrl HUT
- NET-PwrCtrl IO
-   ДОМА
- ПРО
-   ВЛАСТЬ
- реклама

## Применение
- Установить адаптер

- Настройка устройств

    - Включите UDP-связь на вашем устройстве Anel.
    - Вставьте свойства вашего устройства Anel

        - DeviceName: пользовательское имя вашего устройства. Это имя используется для отображения устройства в списке объектов. Пример: anelhut.0.DeviceName
        - DeviceIP: IP-адрес вашего устройства (пожалуйста, не используйте имя хоста)
        - UDPSendPort: вставьте порт, который отображается в веб-интерфейсе вашего устройства Anel. Это принимающий порт с точки зрения аналогового устройства (по умолчанию: 75).
        - UDPRecievePort: вставьте порт, который отображается в веб-интерфейсе вашего устройства Anel. Это порт отправки с точки зрения устройства Anel (по умолчанию: 77).
        - Пользователь и пароль XOR: отключено по умолчанию. Для большей безопасности вы можете включить шифрование пользователя и пароля XOR. Не каждое устройство Anel поддерживает пользователя и пароль XOR. Перед включением этой функции проверьте, поддерживает ли ее ваше устройство. Проверить это можно в структуре созданного объекта (устройство -> общие -> XOR_USER_Password). Если значение равно true, XOR User & Password поддерживается вашим устройством.

Важное примечание. Если вы хотите управлять несколькими устройствами, используйте разные порты приема для каждого устройства.
Например, вы можете использовать порт 77 для первого устройства, 78 для второго, 79 для третьего и так далее.
Если вы используете только одно устройство, вы можете использовать порт 77 по умолчанию.
Для порта отправки можно использовать порт 75 по умолчанию для всех устройств.
Вы можете изменить порты в веб-интерфейсе устройства.

- Докер
    - Не забывайте о переадресации портов, если вы хотите использовать этот адаптер в среде докеров:
        - 77:77/udp # переадресация портов на первое анальное устройство
        - 78:78/udp # переадресация портов на второе устройство Anel
    - Вы можете найти рабочий пример docker-compose для справки в этом репозитории (examples/docker-compose.yml)

## Примечание
Этот адаптер был протестирован со всеми устройствами Anel. Спасибо разработчику anel :).
Пожалуйста, сообщайте о любых проблемах.

## Известные вопросы
### NET-PwrCtrl PRO
Пожалуйста, используйте последнюю прошивку (4.2). Вы можете скачать его с https://de.anel.eu/index.htm?src=support/hut/hut.htm.

## Changelog

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