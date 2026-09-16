---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartthings/README.md
title: ioBroker.smartthings
hash: wJZRoVU4WUt58hQdpwss4fwBwaCUpLYH7t4QlUytQ0Q=
---
![Логотип](../../../en/adapterref/iobroker.smartthings/admin/smartthings.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.smartthings.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smartthings.svg)
![Количество установок](https://iobroker.live/badges/smartthings-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/smartthings-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.smartthings.svg)
![НПМ](https://nodei.co/npm/iobroker.smartthings.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.smartthings/workflows/Test%20and%20Release/badge.svg)

# ioBroker.smartthings

## Адаптер SmartThings для ioBroker

Адаптер для Samsung Smartthings

## Процесс входа в систему:

Откройте ссылку в настройках адаптера и войдите в систему, пока не увидите белый экран. Откройте консоль разработчика (F12 или Option + Command + I), скопируйте синий URL-адрес samsungconnect:// и вставьте его в настройки.

## Контроль

Для параметра smartthings.0.id.capabilities либо установите значение true, либо задайте предопределенное значение.

## Обсуждение и вопросы:

<https://forum.iobroker.net/topic/48091/test-adapter-samsung-smartthings-v-0-0-x>

## Changelog
### 0.3.0 (2026-01-31)
- optimize cpu usage

### 0.2.2 (2025-02-11)

- add new login process

### 0.1.2 (2024-05-19)

- Update Dependencies

- 0.1.0 Added object excluding to reduce cpu usage

- 0.0.4 Reduced cpu load while writing states

- 0.0.3 (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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