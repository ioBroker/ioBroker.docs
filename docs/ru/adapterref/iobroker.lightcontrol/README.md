---
chapters: {"pages":{"en/adapterref/iobroker.lightcontrol/README.md":{"title":{"en":"ioBroker.lightcontrol"},"content":"en/adapterref/iobroker.lightcontrol/README.md"},"en/adapterref/iobroker.lightcontrol/docs/en/lightcontrol.md":{"title":{"en":"LightControl"},"content":"en/adapterref/iobroker.lightcontrol/docs/en/lightcontrol.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lightcontrol/README.md
title: ioBroker.lightcontrol
hash: PtvLO7i25PYBYLh9NfwreHrT5jVeF6es9LMllQRKAlc=
---
![Логотип](../../../en/adapterref/iobroker.lightcontrol/admin/lightcontrol.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.lightcontrol.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.lightcontrol.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.lightcontrol?style=flat-square)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/lightcontrol/svg-badge.svg)
![GitHub](https://img.shields.io/github/license/schmakus/iobroker.lightcontrol?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![Тестирование и выпуск](https://github.com/Schmakus/ioBroker.lightcontrol/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.lightcontrol.png?downloads=true)
![Бета](https://img.shields.io/npm/v/iobroker.lightcontrol.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/lightcontrol-stable.svg)
![Установлено](http://iobroker.live/badges/lightcontrol-installed.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)

# ioBroker.lightcontrol

## Версии

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Если вам нравится моя работа:

## Установка

Для установки этой версии адаптера используйте список адаптеров и стабильный репозиторий в ioBroker. Также вы можете установить адаптер с помощью командной строки:

```
iobroker add lightcontrol
```

## Документация

[🇺🇸 Документация](/#/docs/adapterref/iobroker.lightcontrol/docs/en/lightcontrol.md)

[🇩🇪 Документация](https://github.com/Schmakus/ioBroker.lightcontrol/blob/main/docs/de/lightcontrol.md)

## Список дел

- Выберите более одной LightGroup для одного Object-ID (ошибка при использовании функции jsonCustom Select multible)
- Возможность предварительного уведомления при более низкой яркости и заданном количестве секунд до автоматического отключения.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (iobroker-bot) Adapter requires node.js >= 20 now.

-   (Schmakus) fix responsive issues

### 2.0.0 (2025-03-06)

-   (Schmakus) update dependencies
-   (Schmakus) Admin 7.4.10 required
-   (Schmakus) Node 20 required
-   (Schmakus) fix responive issues

### 1.0.1 (2024-09-02)

-   (Schmakus) update dependencies

### 1.0.0 (2024-09-02)

-   (Schmakus) update dependencies

### 0.8.0 (2024-08-16)

-   (Schmakus) Adapter requires node.js >= 18 and Admin >=6 now
-   (Schmakus) Dependencies have been updated
-   (Schmakus) Fixed repo checker issues

### 0.7.0 (2024-07-02)

-   (Schmakus) Dependencies have been updated

## License

MIT License

Copyright (c) 2025-2026 Schmakus <schmakus@gmail.com>

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