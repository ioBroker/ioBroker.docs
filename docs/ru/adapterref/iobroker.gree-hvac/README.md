---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gree-hvac/README.md
title: iobroker.gree-hvac
hash: MsbsiEqqFGmnBK3nPZW4/lrI1zumEhj+80UUJ3NPpNY=
---
![Логотип](../../../en/adapterref/iobroker.gree-hvac/admin/air-conditioner.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.gree-hvac.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gree-hvac.svg)
![Количество установок](https://iobroker.live/badges/template-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/gree-hvac-stable.svg)

# Iobroker.gree-hvac
**Тесты:** [![Тестирование и выпуск] (https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml)

Адаптер для кондиционеров Gree и C&H

## Поддерживаемые устройства
Должны поддерживаться все устройства, которыми можно управлять через приложение EWPE Smart, в том числе:

- Серия Gree Smart
- Cooper&Hunter: Supreme, Vip Inverter, ICY II, Arctic, Alpha, Alpha NG, Veritas, серия Veritas NG.
- Серия EcoAir X
- ПроКлима

**Обратите внимание, что новые кондиционеры, а возможно и старые, не будут работать без доступа в Интернет. Они просто перестают отвечать на запросы адаптера.**

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Благодарности
- [tomikaa87](https://github.com/tomikaa87) за реверс-инжиниринг протокола Gree.
- [stas-demydiuk](https://github.com/stas-demydiuk) для кода DeviceManager
- Сизенко Александр за шрифты Digital-7

## Changelog
### 1.0.0 (2024-05-31)
 - Small fixes. Ready to production.
### 0.0.14 (2024-04-15)
 - First version of the adapter

## License
MIT License

Copyright (c) 2024 Serhiy Krasovskyy xhunter74@gmail.com

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