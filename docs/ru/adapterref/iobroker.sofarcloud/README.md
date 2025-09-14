---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sofarcloud/README.md
title: ioBroker.sofarcloud
hash: ZKTq1/UeWpXsKGCR3KHvUulIzidwavQsrkLZMDbicBw=
---
![Логотип](../../../en/adapterref/iobroker.sofarcloud/admin/sofarcloud.jpg)

![версия НПМ](https://img.shields.io/npm/v/iobroker.sofarcloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sofarcloud.svg)
![Количество установок](https://iobroker.live/badges/sofarcloud-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/sofarcloud-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sofarcloud.png?downloads=true)

# IoBroker.sofarcloud
**Тесты:** ![Тестирование и выпуск](https://github.com/ltspicer/ioBroker.sofarcloud/workflows/Test%20and%20Release/badge.svg)

## Адаптер sofarcloud для ioBroker
Этот адаптер считывает данные с сервера SofarCloud и сохраняет их в точке данных sofarcloud.

Сервер SofarCloud хранит данные с инверторов Sofar.

Сначала установите приложение (https://de.sofarsolar.com/cloud.html) и зарегистрируйте свой инвертор Sofar.

Затем вам необходимо ввести свои данные для входа в адаптер (адрес электронной почты и пароль).

При желании данные можно отправить в другую систему через MQTT.

Полученные данные также можно сохранить в формате JSON (sofar_realtime.json).

## Changelog
### 3.0.1 (2025-08-29)

- Normalize values before write

### 3.0.0 (2025-08-29)

- Check whether configuration has changed
- Cleaner termination
- Passwords encrypted
- Stop after 3 failed logins

### 2.0.0 (2025-08-27)

- Type & Role set more precisely

### 1.0.2 (2025-08-18)

- Delay 0-57s added

### 1.0.1 (2025-08-15)

- Div dependencies

### 1.0.0 (2025-08-15)
- Initial release

## License
MIT License

Copyright (c) 2025 Daniel Luginbühl <dlu0@sunrise.ch>

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