---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bluelink/README.md
title: ioBroker.bluelink
hash: inkFQp6zwYo6kwaA+Xp8O0pg/F6hB6tYSDGyCnXCoWA=
---
![Логотип](../../../en/adapterref/iobroker.bluelink/admin/bluelink.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.bluelink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.bluelink.svg)
![Количество установок (последние)](https://iobroker.live/badges/bluelink-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/bluelink-stable.svg)
![Тестирование и выпуск](https://github.com/Newan/iobroker.bluelink/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/bluelink/svg-badge.svg)
![НПМ](https://nodei.co/npm/iobroker.bluelink.png?downloads=true)

# ioBroker.bluelink

## Адаптер Bluelink для ioBroker

Адаптер для управления автомобилями Hyundai или Kia (до 2023 года выпуска).

[Обсуждение](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo)

[Информация для входа](https://developers.kia.com/web/v1/kia/specification/account/account_authorize)

[Генерация токенов](https://github.com/Newan/ioBroker.bluelink/tree/master/py) или [обходной путь с использованием токенов](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo/2249?_=1761189451343)

[Вики](https://github.com/Newan/ioBroker.bluelink/wiki)

---

## Пожертвование

[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=L55UBQJKJEUJL)

## Changelog
### 3.1.33 (2026-08-22)
* (ipod86) Fix EU Hyundai/Kia login

### 3.1.32 (2026-08-20)
* (ipod86) Fix EU Hyundai/Kia login

### 3.1.31 (2026-08-11)
* (arteck) Dependencies have been updated

### 3.1.30 (2026-08-11)
* (meistermopper) Fix vehicle location data extraction for Kia and Hyundai CCS2 vehicles and prioritize dedicated location API
* (meistermopper) Add control.force_location button and implement live telematics POST location/status polling directly from vehicle hardware
* (meistermopper) Fix TypeScript type definitions and unsafe property access in status parsing

### 3.1.29 (2026-08-05)
* (copilot) Adapter requires node.js >= 22 now
* (ipod86) add Tokenmanager

[Older changelogs can be found there](https://github.com/Newan/ioBroker.bluelink/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

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