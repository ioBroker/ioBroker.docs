---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.siegenia/README.md
title: ioBroker.siegenia
hash: wlVBOqXKLMOElBCSOcaoQUPD//+JZz14OYxLjkIaZI0=
---
# IoBroker.siegenia

![Количество установок](http://iobroker.live/badges/siegenia-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.siegenia.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.siegenia.svg)

<img src="./admin/siegenia_logo.jpg"/>

![Тестирование и выпуск](https://github.com/Apollon77/ioBroker.siegenia/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/siegenia/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении отчётов об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчёты Sentry используются, начиная с версии js-controller 3.0.

Этот адаптер обеспечивает поддержку ioBroker для устройств управления климатом и воздухом Siegenia (https://www.siegenia.com).

Для работы адаптера требуется минимум Nodejs 8.x.

## Набор функций
Все текущие устройства поддерживаются этим адаптером:

* АЭРОПАК
* АЭРОМАТ ВТ
* DRIVE axxent DK/MH
* SENSOAIR
* Атмосфера АЭРОВИТАЛ
* Семья MHS
* САУ
* АЭРОТУБ
* Универсальный модуль
* Модуль преобразователя enOcean
* Обновление VT
* ДИСК CL
* АЭРОПЛЮС

Адаптер автоматически обнаруживает устройства Siegenia в той же сети, что и ioBroker, и отображает их список в интерфейсе администратора. После обнаружения вам нужно будет только скорректировать имя пользователя и пароль. Вы также можете ввести IP-адреса и данные для входа вручную.

Все доступные поля данных обнаруженного устройства отображаются в объектах и предоставляют текущие данные и/или позволяют изменять данные.

Таймеры и другие более сложные данные отображаются на адаптере, но их можно изменить только через приложение Siegenia.

## Changelog

### __WORK IN PROGRESS__
* (@Apollon77) Add support for enOcean Converter Module, VT Upgrade, DRIVE CL, and AEROPLUS

### 1.1.1 (2021-07-06)
* (thost96/Apollon77) Optimize for js-controller 3.3

### 1.1.0 (2021-01-22)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SIEGENIA-1)
* (Apollon77) js-controller 2.0 is now required at least

### 1.0.1 (2020-12-24)
* (Apollon77) update dependencies
* (Apollon77) disconnect device if authentication was not successful

### 1.0.0
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2019-2025 Apollon77 iobroker@fischer-ka.de

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