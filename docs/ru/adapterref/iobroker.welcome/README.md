---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.welcome/README.md
title: ioBroker.добро пожаловать
hash: pP1EIBTpXsebJh73MPhL9tOfaxRpxmM3UjJ0kZ9i9nE=
---
![Логотип](../../../en/adapterref/iobroker.welcome/admin/welcome.png)

![Количество установок](http://iobroker.live/badges/web-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.welcome.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.welcome.svg)

# IoBroker.добро пожаловать
![Тест и выпуск](https://github.com/ioBroker/ioBroker.welcome/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер отображает все веб- и административные экземпляры ioBroker на одной странице на порту 80 (настраивается)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

![Добро пожаловать](../../../en/adapterref/iobroker.welcome/img/screen.png)

Обычно этот адаптер должен работать на порту 80 или 443 и отображать доступные адаптеры с веб-серверами.

При желании вы можете указать экземпляр, на который он будет автоматически перенаправлен при открытии страницы приветствия.
В этом случае при открытии http://IP он будет немедленно перенаправлен на указанный веб-экземпляр.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 1.0.0 (2024-09-29)

-   (@GermanBluefox) Updated packages
-   (@GermanBluefox) Used new eslint-config
-   (@GermanBluefox) Added support for SVG files

### 0.3.0 (2023-11-30)

-   (@GermanBluefox) Allowed adding own logo to the welcome screen

### 0.2.0 (2023-11-28)

-   (@GermanBluefox) Added custom redirect URL

### 0.1.0 (2023-11-07)

-   (@GermanBluefox) Added custom links

### 0.0.5 (2023-10-16)

-   (@GermanBluefox) Corrected the adapter list

### 0.0.4 (2023-10-16)

-   (@GermanBluefox) First release

### 0.0.1 (2023-10-16)

-   (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2023-2024 Denis Haev <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.