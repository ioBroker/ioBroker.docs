---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sofarcloud/README.md
title: ioBroker.sofarcloud
hash: 0lsPEJwMLxyEt/JLISDvmnG5Yv81xQZ9pacM0Y4CJqw=
---
![Логотип](../../../en/adapterref/iobroker.sofarcloud/admin/sofarcloud.jpg)

![Версия NPM](https://img.shields.io/npm/v/iobroker.sofarcloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sofarcloud.svg)
![Количество установок](https://iobroker.live/badges/sofarcloud-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/sofarcloud-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.sofarcloud.png?downloads=true)
![Тестирование и выпуск](https://github.com/ltspicer/ioBroker.sofarcloud/workflows/Test%20and%20Release/badge.svg)

# ioBroker.sofarcloud

## Адаптер SofarCloud для ioBroker

Этот адаптер считывает данные с сервера SofarCloud и сохраняет их в точке данных sofarcloud.

Сервер SofarCloud хранит данные с инверторов Sofar.

Сначала установите приложение ( <https://de.sofarsolar.com/cloud.html> ) и зарегистрируйте свой инвертор Sofar.

Затем вам необходимо ввести свои учетные данные в адаптере (адрес электронной почты и пароль).

При желании данные можно передать в другую систему через протокол MQTT.

Полученные данные также можно сохранить в формате JSON (sofar\_realtime.json).

## Changelog
### 3.4.3 (2026-06-12)

- changed setTimeout to this.setTimeout

### 3.4.2 (2026-05-29)

- Translation issues resolved

### 3.4.1 (2026-05-26)

- process.exit() issue resolved

### 3.4.0 (2026-04-06)

- node > 20

### 3.3.0 (2026-01-28)

- Better Admin menu

[Older changelogs can be found there](https://github.com/ltspicer/ioBroker.sofarcloud/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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