---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.parcel/README.md
title: ioBroker.parcel
hash: B5JuvLe0ZuWJA2tA5w6LYfLaK6giYB51FW7kHwJg0ck=
---
![Логотип](../../../en/adapterref/iobroker.parcel/admin/parcel.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.parcel.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.parcel.svg)
![Количество установок](https://iobroker.live/badges/parcel-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/parcel-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.parcel.svg)
![НПМ](https://nodei.co/npm/iobroker.parcel.png?downloads=true)

# IoBroker.parcel
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.parcel/workflows/Test%20and%20Release/badge.svg)

## Адаптер для отслеживания посылок для ioBroker
Отслеживайте посылки от Amazon, DHL, DPD, Hermes, UPS и GLS с помощью вашего умного дома ioBroker. Также поддерживается отслеживание писем Deutsche Post. Уведомления можно отправлять напрямую через Telegram, Pushover или Signal.

Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде. Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Процесс входа в систему
**DHL:**

— Войдите в приложение DHL
- Получить SMS/код по электронной почте
— Введите код в настройках экземпляра и сохраните.

**Амазон:**

- Введите учетные данные для входа
— При необходимости введите одноразовый пароль (OTP) из приложения двухфакторной аутентификации (2FA) перед первым входом в систему.

**Пользователь DPD, GLS, UPS, 17Track:**

Введите имя пользователя и пароль.

**Уведомления в Telegram о посылках и письмах**

Включите эту опцию в настройках экземпляра и введите, например, `telegram.0`

## Виза
**Отображение посылок в таблице Vis**

Данные по всем участкам: `parcel.0.allProviderJson`

Данные о посылках в процессе доставки: `parcel.0.inDelivery`

**Виджет: таблица JSON**

Инструкции: https://www.smarthome-tricks.de/software-iobroker/iobroker-vis-json-table-widget-teil-1-basics/

**Отображение отслеживания писем DHL в Vis**

Присвойте точку данных `parcel.0.dhl.briefe....image` элементу "String img src" в качестве идентификатора объекта.

## Обсуждение и вопросы
<https://forum.iobroker.net/topic/51795/test-adapter-parcel-paketverfolgung-dhl-v0-0-1>

## Changelog
### 0.3.2 (2026-07-08)
- Fix for DPD
- Fix for GLS

### 0.3.1 (2026-07-07)

- DHL: New login via browser code (dhllogin://)
- Amazon: Login fix and captcha detection with note

### 0.3.0 (2026-04-05)

- DHL: New login via browser code (dhllogin://)
- Amazon: Login fix and captcha detection with note

### 0.2.10 (2025-01-15)

- add alternative way for dhl login
- move dhl connections error to info level

### 0.2.8 (2024-10-18)

- fix amazon login

### 0.0.30

- Fix hermes login

### 0.0.25

- Fix amazon UI parsing

### 0.0.19

- Fix GLS Parcel

### 0.0.18

- Fix UPS/GLS Login

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022-2026 TA2k <tombox2020@gmail.com>

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