---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bestway/README.md
title: ioBroker.bestway
hash: k33197ntu/wRdxaF60jVQgz8qdFFEwnHvIMTUS30jiA=
---
![Логотип](../../../en/adapterref/iobroker.bestway/admin/bestway.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.bestway.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bestway.svg)
![Количество установок](https://iobroker.live/badges/bestway-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/bestway-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.bestway.svg)
![НПМ](https://nodei.co/npm/iobroker.bestway.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.bestway/workflows/Test%20and%20Release/badge.svg)

# ioBroker.bestway

## Адаптер Bestway для ioBroker

Адаптер для Bestway Smart Hub (V1) и Bestway Connect / Smart Spa (V2).

Поддерживаются два поколения устройств, выбор которых осуществляется в настройках адаптера:

- **V1 – Bestway Smart Hub** (более старые модели, бэкэнд Gizwits): войдите в систему, используя адрес электронной почты и пароль приложения, и выберите страну.
- **V2 – Bestway Connect / Smart Spa** (модели UltraFit с 2025 года, бэкэнд AWS IoT): сопряжение через QR-код или идентификатор Android и выбор региона.

## Часовой

Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде. Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Логинаблауф:

### V1 (Bestway Smart Hub)

Приложение Bestway Smart Hub Почта и пароль будут добавлены и сохранены на земле.

### V2 (Bestway Connect / Smart Spa)

Поколение «V2» выбрано и выбрано в регионе. Dann eine der beiden Kopplungsmethoden nutzen:

- **QR-код** (iOS и Android): в приложении Bestway Connect для создания > создания QR-кода, его декодирования (zB über <https://scanqr.org/> ) и текста (начинается с`RW_Share_` ) им Адаптер eintragen. Кодекс — это невероятная минута, когда вы можете совершить покупку.
- **Android-ID** (для Android): добавьте в приложение Bestway Connect дополнительный идентификатор профиля. Если вы хотите получить лучший контакт с помощью QR-кода, вы можете получить его напрямую, используя QR-код.

## Стойерн

- В1:`bestway.0.<id>.remote.*` бзв.`remotev2.*` setzen steuert den jeweiligen Befehl.
- V2:`bestway.0.<id>.remotev3.*` setzen steuert den jeweiligen Befehl (мощность, тепло, фильтр, струя, волна, temp\_set, заблокировано).

## Discussion und Fragen:

<https://forum.iobroker.net/topic/48023/test-adapter-bestway-v0-0-x>

## Changelog

### 0.1.0

Support for Bestway Connect / Smart Spa (V2, AWS IoT backend) with QR code or Android ID pairing and realtime WebSocket updates.

### 0.0.5

Support for v2 pump version

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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