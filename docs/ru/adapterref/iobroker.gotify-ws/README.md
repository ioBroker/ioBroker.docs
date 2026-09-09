---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gotify-ws/README.md
title: ioBroker.gotify-ws
hash: 1Nujq/M2hQYIjpGp8z92I1UwOsJr25OgTzZsMfyGi3c=
---
![Логотип](../../../en/adapterref/iobroker.gotify-ws/admin/gotify-ws.png)

![Количество установок](http://iobroker.live/badges/gotify-ws-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.gotify-ws.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gotify-ws.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.gotify-ws/badge.svg)
![Тестирование и выпуск](https://github.com/simatec/ioBroker.gotify-ws/workflows/Test%20and%20Release/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.gotify-ws?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# ioBroker.gotify-ws

Этот адаптер использует данную услугу.`Sentry.io` Для автоматического сообщения мне, как разработчику, об исключениях, ошибках в коде и новых схемах устройств. Подробнее см. ниже!

---

## Поддержка разработки адаптеров

**Если вам нравится ioBroker.gotify-ws, пожалуйста, рассмотрите возможность сделать пожертвование:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## адаптер gotify-ws для ioBroker

Gotify-WS — это адаптер, который устанавливает соединение WebSocket с сервером Gotify и, следовательно, может получать и обрабатывать все сообщения от сервера.

Для меня причиной стало отсутствие связи со всеми распространенными системами. Например, нет подходящего приложения для iOS.

Однако, поскольку Gotify становится все более популярным и теперь также используется во многих системах, таких как Proxmox, в качестве сервиса уведомлений, мне понадобилось решение.

Вот тут-то и вступает в игру Gotify-WS. Gotify-WS принимает сообщения и пересылает их в службу уведомлений, поддерживаемую ioBroker. Это означает, что сообщения могут быть пересланы, например, в Telegram.

В настоящее время Spotify-WS поддерживает следующие службы уведомлений.

- электронная почта
- Матрица
- Менеджер уведомлений
- Слабак
- Discord
- Сигнал
- Телеграмма
- WhatsApp

---

## Конфигурация адаптера

Настройка адаптера очень проста.

Вы создаете нового клиента на своем сервере Gotify и копируете сгенерированный токен клиента. Вводите его в конфигурацию адаптера Gotify-WS. Gotify-WS также требует IP-адрес или домен и порт сервера Gotify.

Это устанавливает соединение, и адаптер может получать все входящие сообщения с сервера Gotify.

Затем вы можете настроить любую службу уведомлений для пересылки.

---

## Changelog

<!-- ### **WORK IN PROGRESS** -->
### **WORK IN PROGRESS**
* (simatec) dependencies updated

### 0.3.0 (2026-08-22)
* (copilot) Adapter requires node.js >= 22 now
* (simatec) dependencies updated
* (simatec) small Bugfixes
* (simatec) Translations added
* (simatec) Convert Translations

### 0.2.5 (2026-03-29)
* (simatec) Fix License
* (simatec) dependencies updated

### 0.2.4 (2025-11-23)
* (simatec) dependencies updated
* (simatec) Fix npm publish

### 0.2.3 (2025-08-31)
* (simatec) dependencies updated

### 0.2.2 (2025-07-20)
* (simatec) dependencies updated

[Older changelogs can be found there](https://github.com/simatec/ioBroker.gotify-ws/blob/master/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024 - 2026 simatec

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