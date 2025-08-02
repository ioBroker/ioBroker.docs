---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gree-hvac/README.md
title: iobroker.gree-hvac
hash: nbnCeatkP5YX4f21mweyh2a/mosv3Qal1E5BFx02vvI=
---
![Логотип](../../../en/adapterref/iobroker.gree-hvac/admin/air-conditioner.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.gree-hvac.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gree-hvac.svg)
![Количество установок](https://iobroker.live/badges/template-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/gree-hvac-stable.svg)

# Iobroker.gree-hvac
**Тесты:** [![Тестирование и выпуск](https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml)

Адаптер для кондиционеров Gree и C&H

## Поддерживаемые устройства
Должны поддерживаться все устройства, которыми можно управлять с помощью приложения EWPE Smart, включая:

- Серия Gree Smart
- Cooper&Hunter: Supreme, Vip Inverter, ICY II, Arctic, Alpha, Alpha NG, Veritas, серия Veritas NG
- Серия EcoAir X
- ПроКлима

**Обратите внимание, что новые кондиционеры, а возможно и старые, не будут работать без доступа в интернет. Они просто перестанут отвечать на запросы адаптера.**

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Благодарности
- [tomikaa87](https://github.com/tomikaa87) за обратную разработку протокола Gree
- [stas-demydiuk](https://github.com/stas-demydiuk) для кода DeviceManager
- Сизенко Александр для шрифтов Digital-7
- [cont1nuity] для добавления шифрования AES-GCM

## Changelog
### 1.1.2 (2024-10-16)
 - Updated dependencies
 - Adjusted admin layout
### 1.1.0 (2024-08-13)
 - Added the AES-GCM encryption which is needed for some devices with newer firmware versions (e.g. gree model 32776, v1.23)
### 1.0.7 (2024-07-03)
 - Host Google icons locally. Updated dependencies.
### 1.0.6 (2024-06-14)
 - Added button titles and translation.
### 1.0.5 (2024-06-12)
 - Added time field.
### 1.0.4 (2024-06-12)
 - Code optimization. Bug fixes.
### 1.0.3 (2024-06-12)
 - Added refresh devices button on tab page.

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