---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gotify-ws/README.md
title: ioBroker.gotify-ws
hash: iq5EFeYVkol8NjjSP4jELPyVF45maWu/vZtMN7Qby8s=
---
![Логотип](../../../en/adapterref/iobroker.gotify-ws/admin/gotify-ws.png)

![Количество установок](http://iobroker.live/badges/gotify-ws-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.gotify-ws.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gotify-ws.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.gotify-ws/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.gotify-ws?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.gotify-ws
![Тест и выпуск](https://github.com/simatec/ioBroker.gotify-ws/workflows/Test%20and%20Release/badge.svg)

Этот адаптер использует службу `Sentry.io` для автоматического сообщения мне как разработчику об исключениях и ошибках кода, а также о новых схемах устройств. Подробнее см. ниже!

---

## Поддержка разработки адаптера
**Если вам нравится ioBroker.gotify-ws, пожалуйста, рассмотрите возможность сделать пожертвование:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Адаптер gotify-ws для ioBroker
Gotify-WS — это адаптер, который устанавливает веб-сокет-соединение с сервером Gotify и, следовательно, может получать и обрабатывать все сообщения с сервера.

Для меня фоном было отсутствие связи со всеми распространенными системами.
Например, для IOS нет подходящего приложения.

Однако, поскольку Gotify становится все более популярным и теперь также нашел свое применение во многих системах, таких как Proxmox, в качестве службы уведомлений, мне требовалось решение.

Вот тут-то и вступает в игру Gotify-WS.
Gotify-WS получает сообщения и пересылает их в службу уведомлений, поддерживаемую ioBroker. Это означает, что сообщения можно пересылать, например, в Telegram.

Spotify-WS в настоящее время поддерживает следующие службы уведомлений

* электронная почта
* Матрица
* Менеджер уведомлений
* Пустячок
* Дискорд
* Сигнал
* Телеграмма
* Вотсап

---

## Конфигурация адаптера
Конфигурация адаптера очень проста.

Вы создаете нового клиента на своем сервере Gotify и копируете сгенерированный токен клиента.
Вы вводите это в конфигурацию адаптера Gotify-WS.
Gotify-WS также требуется IP-адрес или домен и порт сервера Gotify.

Это устанавливает соединение, и адаптер может получать все входящие сообщения с сервера Gotify.

Затем вы можете настроить службу уведомлений по вашему выбору для пересылки.

---

## Changelog
<!-- ### **WORK IN PROGRESS** -->

### **WORK IN PROGRESS**
* (simatec) eslint-config fix
* (simatec) Code fix

### 0.1.10 (2024-11-24)
* (simatec) Dependencies updated
* (simatec) Responsive Design fix
* (simatec) Issue Action added
* (simatec) eslint-config added

### 0.1.9 (2024-09-26)
* (simatec) Fix for admin 7.1.5

### 0.1.8 (2024-09-24)
* (simatec) Responsive Design fix
* (simatec) Cleaned code

### 0.1.7 (2024-09-16)
* (simatec) Dependencies updated
* (simatec) Responsive Design fix

### 0.1.6 (2024-09-10)
* (simatec) Fix Adapter Check
* (simatec) Dependencies updated
* (simatec) Responsive Design added

### 0.1.5 (2024-07-22)
* (simatec) small fix

### 0.1.4 (2024-07-19)
* (simatec) Dependencies updated

### 0.1.3 (2024-07-17)
* (simatec) Fix Test & Release
* (simatec) Fix Timeout

### 0.1.2 (2024-06-26)
* (simatec) Fix io-package
* (simatec) Notification-Manager added

### 0.1.1 (2024-06-19)
* (simatec) Fix Branch

### 0.1.0 (2024-06-19)
* (simatec) First Release

### 0.0.1 (2024-03-15)
* (simatec) initial release

---

## License

MIT License

Copyright (c) 2024 simatec

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