---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ico-cloud/README.md
title: ioBroker.ico-облако
hash: NkYJmpTc3rSnGTP4LVoZo3My0JYFBLhfVXPPJtTD6Z8=
---
![Логотип](../../../en/adapterref/iobroker.ico-cloud/admin.ico-cloud.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ico-cloud.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ico-cloud.svg)
![Количество установок (последнее)](https://iobroker.live/badges.ico-cloud-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges.ico-cloud-stable.svg)
![Статус зависимости](https://img.shields.io/david/iobroker-community-adapters/iobroker.ico-cloud.svg)
![НПМ](https://nodei.co/npm/iobroker.ico-cloud.png?downloads=true)

# IoBroker.ico-cloud
** Тесты: ** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.ico-cloud/workflows/Test%20and%20Release/badge.svg)

## Ico адаптер для ioBroker
Датчик ICO Pool (от ondilo) позволяет отслеживать состояние и температуру воды в вашем бассейне и рекомендовать действия, которые необходимо предпринять.

Адаптер подключается к облачной службе Ondilo и получает все измерения.

### Конфигурация
Вы можете определить интервал опроса в настройках (в минутах).
Также необходимо запустить процесс входа в систему в настройках.

### Атрибуция
Этот адаптер **не** разработан и не принадлежит Ondilo, а сообществу ioBroker.

Иконка и название ICO и Ondilo являются собственностью Ondilo.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.5 (2021-07-30)
* (Garfonso) add necessary admin dependency.
* (Garfonso) Do not use unknown roles.

### 0.0.4 (2021-07-22)
* (Garfonso) change default poll interval to one hour, because it seems no more measurements are done.
* (Garfonso) fixed issue in polling

### 0.0.3 (2021-07-20)
* (Garfonso) Rename to ico-cloud

### 0.0.2 (2021-07-20)
* (Garfonso) initial release

## License
MIT License

Copyright (c) 2021 Garfonso <garfonso@mobo.info>

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