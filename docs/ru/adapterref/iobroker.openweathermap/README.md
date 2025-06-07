---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.openweathermap/README.md
title: ioBroker.openweathermap
hash: htKU6XX3QeFoEErmtCvmVtU+fh4gr3MpqUV3bKGa1BY=
---
![Логотип](../../../en/adapterref/iobroker.openweathermap/admin/openweathermap.svg)

![Количество установок](http://iobroker.live/badges/openweathermap-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.openweathermap.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.openweathermap.svg)

# IoBroker.openweathermap
![Тест и выпуск](https://github.com/ioBroker/ioBroker.openweathermap/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/openweathermap/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Получает прогноз погоды на 5 дней из [https://openweathermap.org/](openweathermap.org)

Вам нужен ключ API для доступа к данным. Ключ API вы можете получить бесплатно после регистрации [здесь](https://home.openweathermap.org/api_keys).

<!--

### **РАБОТА В ХОДЕ** -->

## Changelog
### 1.3.0 (2025-05-21)
* (bluefox) Widget was completely ported to TypeScript
* (bluefox) Backend was completely ported to TypeScript

### 1.2.0 (2024-07-23)
* (bluefox) Widget was partly ported to TypeScript

### 1.1.2 (2024-07-07)
* (bluefox) Removed withStyles package

### 1.0.4 (2023-12-05)
* (bluefox) Used the JSON config for configuration dialog
* (bluefox) Added title to widget

### 0.4.5 (2023-10-09)
* (feuer-sturm) changed german translation

### 0.4.4 (2023-09-29)
* (bluefox) Updated packages

### 0.4.3 (2023-09-09)
* (bluefox) Corrected vis-2 widget

### 0.4.2 (2023-08-11)
* (bluefox) Optimized the state subscription in vis-2 widget

### 0.3.11 (2023-07-19)
* (bluefox) Small layout changes

### 0.3.10 (2023-06-28)
* (bluefox) Added support for the new vis

### 0.3.9 (2023-06-07)
* (bluefox) updated build process

### 0.3.8 (2023-03-09)
* (bluefox) update packages

### 0.3.6 (2023-02-27)
* (Bluefox) Installation from GitHub is not possible anymore

### 0.3.4 (2023-02-22)
* (Bluefox) Updated packages

### 0.3.3 (2022-10-24)
* (Bluefox) Updated widget for vis 2.0

### 0.3.0 (2022-07-12)
* (Bluefox) Added new widget for vis 2.0

### 0.2.5 (2022-06-12)
* (Apollon77) Make sure all forecast data are processed correctly

### 0.2.4 (2022-04-19)
* (Apollon77) Fixed a crash case when states have invalid metadata

### 0.2.3 (2022-03-15)
* (Apollon77) Increase timeout to read data to 10s

### 0.2.2 (2022-03-11)
* (Apollon77) Fix crash case (Sentry IOBROKER-OPENWEATHERMAP-1)

### 0.2.1 (2022-03-10)
* (Apollon77) Move schedule if default is used and adjust to once an hour to better spread the requests over time to prevent peaks; Additionally add a random delay in the start minute
* (klein0r) updated everything
* (Apollon77) updated unload/stop handling

### 0.1.0
* (bluefox) first release

## License

The MIT License (MIT)

Copyright (c) 2018-2025 bluefox <dogafox@gmail.com>

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