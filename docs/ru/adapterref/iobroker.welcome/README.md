---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.welcome/README.md
title: ioBroker.welcome
hash: jkzi1/Siu0dakUu5BPH4ebgxGY3FGjGwTjgDSzN/9lc=
---
![Логотип](../../../en/adapterref/iobroker.welcome/admin/welcome.png)

![Количество установок](http://iobroker.live/badges/web-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.welcome.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.welcome.svg)

# IoBroker.welcome
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.welcome/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Этот адаптер отображает все веб-экземпляры и экземпляры администратора ioBroker на одной странице через порт 80 (настраиваемый).

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

![Добро пожаловать](../../../en/adapterref/iobroker.welcome/img/screen.png)

Обычно этот адаптер должен работать на порте 80 или 443 и отображает доступные адаптеры с веб-серверами.

При желании вы можете указать экземпляр, на который он будет автоматически перенаправлен при открытии страницы приветствия.
В этом случае при открытии http://IP он будет немедленно перенаправлен на указанный экземпляр веб-сайта.

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 0.0.5 (2023-10-16)
* (bluefox) Corrected the adapter list

### 0.0.4 (2023-10-16)
* (bluefox) First release

### 0.0.1 (2023-10-16)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2023 Denis Haev <dogafox@gmail.com>

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
