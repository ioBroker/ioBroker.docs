---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.openweathermap/README.md
title: ioBroker.openweathermap
hash: KqS96qVOvaFO5plNp1uz68xyYBPYgrCYbC5hVGI/1/k=
---
![Логотип](../../../en/adapterref/iobroker.openweathermap/admin/openweathermap.svg)

![Количество установок](http://iobroker.live/badges/openweathermap-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.openweathermap.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.openweathermap/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/openweathermap/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.openweathermap.svg)

# ioBroker.openweathermap

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Получает прогноз погоды на 5 дней с [сайта https://openweathermap.org/](https://github.com/ioBroker/ioBroker.openweathermap/blob/master/openweathermap.org)

Для доступа к данным вам потребуется ключ API. Ключ API вы можете получить бесплатно после регистрации [здесь](https://home.openweathermap.org/api_keys) .

<!--
	### **WORK IN PROGRESS**
-->

## Changelog
### 2.0.1 (2026-09-08)
* (@GermanBluefox) The weather widget is now shown as a live preview in the admin configuration too

### 2.0.0 (2026-08-16)
* (@JDCodes) Added feels_like temperature, visibility and the day name (long and short) as text
* (@JDCodes) Daily rain and snow are now totals and not averages
* (@JDCodes) Fixed NaN for rain and snow
* (@GermanBluefox) Minimal supported Node.js version is now 22
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now

### 1.4.0 (2025-08-03)
* (@tt-tom17) Added wind direction as text

### 1.3.0 (2025-05-21)
* (bluefox) Widget was completely ported to TypeScript
* (bluefox) Backend was completely ported to TypeScript

### 1.2.0 (2024-07-23)
* (bluefox) Widget was partly ported to TypeScript

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.openweathermap/blob/master/CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2018-2026 bluefox <dogafox@gmail.com>

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