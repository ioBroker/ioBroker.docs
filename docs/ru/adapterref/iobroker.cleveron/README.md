---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cleveron/README.md
title: ioBroker.cleveron
hash: ZdX4n+yZzwVaMBMK2iEtBI3LMOuDepoVMQfUVe5/uXU=
---
![Логотип](../../../en/adapterref/iobroker.cleveron/admin/cleveron.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.cleveron.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cleveron.svg)
![Количество установок](https://iobroker.live/badges/cleveron-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/cleveron-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.cleveron.svg)
![НПМ](https://nodei.co/npm/iobroker.cleveron.png?downloads=true)

# IoBroker.cleveron
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.cleveron/workflows/Test%20and%20Release/badge.svg)

## Адаптер Smarton для ioBroker
Этот адаптер получает данные из CLEVERON — API (<https://www.cleveron.ch>)

## Использование
- Вам просто нужны ваши данные для входа в Smarton.
- Адаптер получает все данные о здании, помещении и устройстве - данные, предоставляемые API Smarton.

- Добавьте нужный опрос - интервал в минутах.

- Перезапустите адаптер, если вы добавили новые устройства, комнату или дома или изменили какие-либо настройки.

## Changelog

### v0.0.6

-   dependencies updated

### v0.0.5

-   introduced axios

### v0.0.4

-   changed ecrypting to 'encryptedNative'

### 0.0.3

-   added folders, devices, channels & fixed bugs

### 0.0.2

-   'request' replaced by 'got', secret encryption added, reviewed accordingly 'development and coding best practices'

### 0.0.1 First try

-   (forelleblau) initial release

## License

MIT License

Copyright (c) 2022 forelleblau <mailto:marceladam@gmx.ch>

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
