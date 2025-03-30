---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.dnscope/README.md
title: ioBroker.dnscope
hash: q1/5Gmkk07joBqUydHoSeR9eI4zDKKfruoBil8eWV2E=
---
![Логотип](../../../en/adapterref/iobroker.dnscope/admin/dnscope.png)

![Количество установок](http://iobroker.live/badges/dnscope-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.dnscope.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.dnscope.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.dnscope/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.dnscope?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.dnscope
![Тест и выпуск](https://github.com/simatec/ioBroker.dnscope/workflows/Test%20and%20Release/badge.svg)

Этот адаптер использует службу `Sentry.io` для автоматического сообщения мне как разработчику об исключениях, ошибках кода и новых схемах устройств. Подробнее см. ниже!

---

## Поддержка разработки адаптера
**Если вам нравится DNScope, пожалуйста, рассмотрите возможность сделать пожертвование:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

---

## Описание
DNScope позволяет вам обновлять вашу динамическую учетную запись DNS непосредственно в ioBroker.
Возможно обновить вашу учетную запись DNS текущим IP-адресом вашей среды без каких-либо обходных путей или дополнительного оборудования.

Вы можете определить интервал, с которым должна выполняться проверка и обновление. Интервал по умолчанию составляет 10 минут.

В настоящее время поддерживаются следующие провайдеры DynDNS:

* IPv64
* DuckDNS
* Нет IP
* Динв6
* Обычай

При выборе `Custom` можно указать прямой URL-адрес обновления для интеграции любого провайдера, который это поддерживает.

---

## Конфигурация адаптера
Ваши данные доступа к службе DynDNS необходимы для настройки адаптера.
В зависимости от провайдера это может быть токен или имя пользователя/пароль.

Вам также необходимо ввести домен, который необходимо обновить.

Если у вас есть несколько доменов, которые необходимо обновить, вам понадобится один экземпляр на домен.

--- <!-- ### **РАБОТА В ХОДЕ** -->

## Changelog
### 0.2.0 (2025-03-23)
* (simatec) Fix Delay
* (simatec) Fix States
* (simatec) dependencies updated

### 0.1.0 (2025-03-16)
* (simatec) First Beta

---

## License
MIT License

Copyright (c) 2025 simatec

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