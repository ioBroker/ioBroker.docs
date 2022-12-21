---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hikvision-alarmserver/README.md
title: ioBroker.hikvision-тревожный сервер
hash: /rQaZG7GcWAIu+IeCnDRfqXasuQH6kTBFQNjRmsseds=
---
![Логотип](../../../en/adapterref/iobroker.hikvision-alarmserver/admin/hikvision-alarmserver.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.hikvision-alarmserver.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hikvision-alarmserver.svg)
![Количество установок](https://iobroker.live/badges/hikvision-alarmserver-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/hikvision-alarmserver-stable.svg)
![Статус зависимости](https://img.shields.io/david/raintonr/iobroker.hikvision-alarmserver.svg)
![НПМ](https://nodei.co/npm/iobroker.hikvision-alarmserver.png?downloads=true)

# IoBroker.hikvision-alarmserver
**Тесты:** ![Тестируйте и выпускайте](https://github.com/raintonr/ioBroker.hikvision-alarmserver/workflows/Test%20and%20Release/badge.svg)

## Адаптер Hikvision Alarm Server для ioBroker
Адаптер для приема сигналов тревоги/событий, отправленных с камер Hikvision.

Протестировано с моделями Hikvision:

- ДС-2CD2043G2-I
- ДС-2CD2143G2-I
- ДС-2DE2A404IW-DE3
- DS-2DE3A404IW-DE/W

Сообщения об успехах/неудачах/ошибках приветствуются, если у вас есть модель, которой нет в этом списке.

## Применение
Экземпляр адаптера создает логическое состояние для каждой сообщаемой комбинации типа камеры/события. Камеры идентифицируются по MAC-адресу (ограничено информацией, предоставляемой камерой).

Похоже, что камеры повторяют события каждую секунду, когда эти события все еще действительны, но не отправляется сообщение для их очистки. По этой причине адаптер автоматически удаляет события, о которых не сообщалось повторно более 5 секунд.

## Конфигурация
### IoБрокер
В конфигурации адаптера выберите свободный порт для прослушивания адаптером (по умолчанию 8089).

### На камеру
Посетите страницу конфигурации вашей камеры (камер) и определите параметры IP/хоста и порта ioBroker:

![Опции сервера тревог](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/alarm-server-options.png)

Убедитесь, что привязка событий, о которых вы хотите сообщить в ioBroker, включает «Уведомить центр наблюдения». Например:

![Параметры обнаружения движения](../../../en/adapterref/iobroker.hikvision-alarmserver/docs/images/motion-detection-options.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 0.0.6 (2022-12-13)
-   (Robin Rainton) Handle multipart message payload ([#5](https://github.com/raintonr/ioBroker.hikvision-alarmserver/issues/5)).
-   (Robin Rainton) Handle payloads without XML declaration ([#7](https://github.com/raintonr/ioBroker.hikvision-alarmserver/issues/7).)

### 0.0.5 (2022-12-10)
-   (Robin Rainton) Drop colons from device IDs.

### 0.0.2
-   (Robin Rainton) initial release.

## License
MIT License

Copyright (c) 2022 Robin Rainton <robin@rainton.com>

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