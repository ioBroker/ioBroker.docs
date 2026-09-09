---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.amtronwallbox/README.md
title: ioBroker.amtronwallbox
hash: S1bMrTV9ZOVY8WZYwNFX8knvqtwpjIfAxqkr3gTQV18=
---
![Логотип](../../../en/adapterref/iobroker.amtronwallbox/admin/amtronwallbox.png)

![Количество установок](http://iobroker.live/badges/amtronwallbox-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.amtronwallbox.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.amtronwallbox.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.amtronwallbox/badge.svg)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.amtronwallbox/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.amtronwallbox.png?downloads=true)
![node-lts](https://img.shields.io/node/v-lts/iobroker.amtronwallbox?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.amtronwallbox?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.amtronwallbox?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.amtronwallbox?logo=github&style=flat-square)

# ioBroker.amtronwallbox

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Адаптер служит интерфейсом для различных [настенных зарядных устройств Amtron](https://www.mennekes.de/emobility/produkte/amtron-wallboxen/) . Данные, предоставляемые устройством, считываются и становятся доступными в адаптере в виде точки данных. Обработка данных происходит только локально, подключение к облаку не требуется. Для настенных зарядных устройств, поддерживающих также запись данных, адаптер может записывать данные (например, зарядный ток). Поддерживаются следующие настенные зарядные устройства Amtron:

- Амтрон Экстра
- Amtron ChargeControl
- Амтрон Компакт

Адаптер может управлять несколькими устройствами.

Если у вас настенное устройство, которое еще не поддерживается, пожалуйста, свяжитесь с разработчиком.

## Конфигурация

Необходимо настроить только тип устройства, его IP-адрес и, при необходимости, ключ API.

![Конфигурация](../../../en/adapterref/iobroker.amtronwallbox/admin/docs/Amtron_Config.PNG)

Примечание: Поскольку устройства имеют разные интерфейсы, возможно, не все интерфейсы будут работать напрямую. В этом случае, пожалуйста, свяжитесь с разработчиком.

## известные проблемы

- Пожалуйста, создавайте запросы на [GitHub](https://github.com/rg-engineering/ioBroker.amtronwallbox/issues) , если обнаружите ошибки или пожелаете добавить новые функции.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.0.1 (2026-07-11)
* (copilot) Adapter requires node.js >= 22 now
* (René) update dependencies + changes based on adapter checker

### 1.0.0 (2026-04-25)
* (René) see issue ##423: parser for ChargeControl overworked, compatibility with new datapoints of v5.33 of wallbox firmware
* (René) adapter rewritten in typescript

### 0.3.6 (2026-03-15)
* (René) update dependencies + changes based on adapter checker

### 0.3.5 (2025-10-26)
* (René) bug fix sentry

### 0.3.4 (2025-10-21)
* (René) update dependencies + changes based on adapter checker

[Older changelogs can be found there](https://github.com/rg-engineering/ioBroker.amtronwallbox/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 René G. <info@rg-engineering.eu>

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