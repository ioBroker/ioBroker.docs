---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.parcel/README.md
title: ioBroker.parcel
hash: Nm4SayAjwi1Nrr7/Oq+EaX3AhMCqe3GFN8bzvbgp3/E=
---
![Логотип](../../../en/adapterref/iobroker.parcel/admin/parcel.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.parcel.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.parcel.svg)
![Количество установок](https://iobroker.live/badges/parcel-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/parcel-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.parcel.svg)
![НПМ](https://nodei.co/npm/iobroker.parcel.png?downloads=true)

# IoBroker.посылка
**Тесты:** ![Тестируйте и выпускайте](https://github.com/TA2k/ioBroker.parcel/workflows/Test%20and%20Release/badge.svg)

## Адаптер пакетной/отправочной информации для ioBroker
Отслеживание посылок / Отправка данных с помощью ioBroker SmartHome из пакетов Amazon, DHL, DPD, Hermes, UPS и GLS. Außerdem wirst du über die Briefverfolgung von der Deutschen Post informiert. Прямая передача для Telegram, Pushover или Signal.

## Войти
**ДХЛ:**

- Авторизация в приложении DHL
- SMS/EMail код erhalten
- In die Instanzeinstellungen eingeben und speichern

**Амазонка:**

- Войти
- Wenn nötig vorab ein OTP token aus der 2FA App vor dem ersten Login eingeben.

**DPD, GLS, UPS, 17 пользователей трека:**

Логин и пароль

**Telegram Benachrichtigun für Sendungen und Briefe**

In den Instanz Einstellung aktivieren und z.B. телеграмма.0 eingeben

## Вид
**Sendungen als Vis Table darstellen**

Дата всех отправок: посылка.0.allProviderJson

Datenpunkte в Zustellung: посылка.0.inDelivery

**Виджет: таблица json**

Анлейтунг: https://www.smarthome-tricks.de/software-iobroker/iobroker-vis-json-table-widget-teil-1-basics/

**DHL Briefverfolgung в Vis anzeigen.**

Den Datenpunkt partition.0.dhl.briefe....image ein "String img src" element als Object ID zuordnen

## Обсуждение и обсуждение
<https://forum.iobroker.net/topic/51795/test-adapter-parcel-packetverfolgung-dhl-v0-0-1>

## Changelog

### 0.0.19

- Fix GLS Parcel

### 0.0.18

- Fix UPS/GLS Login

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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