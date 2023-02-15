---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.huum-sauna/README.md
title: ioBroker.huum-сауна
hash: puJj6123AWj9KkfZr/cbQG10+YT6dx1+XnXTtslLAUU=
---
![Логотип](../../../en/adapterref/iobroker.huum-sauna/admin/huum-sauna.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.huum-sauna.svg)
![Количество установок](https://iobroker.live/badges/huum-sauna-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.huum-sauna)
![Количество установок (последние)](https://iobroker.live/badges/huum-sauna-installed.svg)
![Известные уязвимости](https://snyk.io/test/github/Chris-656/ioBroker.huum-sauna/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.huum-sauna.png?downloads=true)

# IoBroker.huum-сауна
Этот адаптер интегрирует устройство управления сауной HUUM в iobroker.
Спецификацию HUUM Devive для управления сауной можно найти [здесь] (https://huum.de/). Описание API вы можете найти ([github.com/horemansp/HUUM](https://github.com/horemansp/HUUM))

## Параметры
- 1 + 2 учетных данных пользователя для веб-страницы HUUM «https://api.huum.eu/action/home/»
- 3 обновления .. Обновите, чтобы загрузить данные HUUM с устройства
- 4 lightpath.. Дополнительный Lightpath (состояние) для переключения внешнего света. Если используется пустой метод переключения HUUM
- 5 AstroLight .. При настройке свет автоматически включается с заходом солнца (для саун на открытом воздухе).

## Пример использования
![графика](https://user-images.githubusercontent.com/56934142/150417838-425261da-a6c7-47b3-bf1b-2af6035ffd59.png)

## [Список изменений](CHANGELOG.md)

## License
MIT License

"Copyright (c) 2022 Chris <besterquester@live.at>"
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