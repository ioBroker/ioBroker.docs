---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: WdILwFFXh50ulU8fUrumN2VctPbMVRgQq67NIVy8DpY=
---
![Логотип](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.accuweather.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![Статус зависимости](https://img.shields.io/david/algar42/iobroker.accuweather.svg)
![Известные уязвимости](https://snyk.io/test/github/algar42/ioBroker.accuweather/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)
![Трэвис-Си](http://img.shields.io/travis/algar42/ioBroker.accuweather/master.svg)

# IoBroker.accuweather
## Адаптер accuweather для ioBroker
Прогноз погоды с использованием AccuWeather API.

Адаптер получает текущие условия (обновляется каждый час), 5-дневный ежедневный прогноз (обновляется один раз в день примерно в 7 утра) и 12-часовой прогноз (обновляется каждые шесть часов в 12, 6, 12 и 18 часов).

## Начиная
### Получить ключ API
Чтобы получить ключ API, зарегистрируйтесь на https://developer.accuweather.com/ и создайте приложение в меню «Мои приложения». После создания приложения вам будет сгенерирован ключ API.
Для бесплатного использования можно делать 50 запросов к API в день.
Было отмечено, что для работы API предпочтительны следующие настройки (выберите страну!): ![настройки](../../../en/adapterref/iobroker.accuweather/admin/image.png)

### Получить ключ местоположения
Чтобы получить ключ местоположения, перейдите на https://www.accuweather.com/ и введите название своего города или попробуйте ввести свои координаты (широту, долготу) в том виде, в котором они есть у вас, например в настройках ioBroker.
Ключом вашего местоположения будет число в конце URL-адреса прогноза.

### Использование в визуализации ловеласа (начиная с версии 1.1.0)
Сводный канал содержит текущий и дневной прогноз с ролью / типами состояний, поддерживаемых детектором типов.
Новую функцию можно использовать для отображения прогноза погоды в пользовательском интерфейсе Lovelace.
Для лучшего обзора создается пользовательская карта ловеласа - см. Https://github.com/algar42/IoB.lovelace.accuweather-card

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->
## V1.1.6 (2021-05-05) Незначительные исправления ошибок в разделе `Object.common`.
### 1.1.5 (25.01.2021)
* (algar42) Разрешить предупреждение журнала для js-controller 3.2

### 1.1.4
* (HGlab01) небольшое исправление относительно диапазона setTimeout

### 1.1.3 (2020-03-04)
* (algar42) Незначительные обновления для компактного режима

### 1.1.0 (09.11.2019)
* (algar42) Добавлен сводный канал для поддержки детектора типов и автоматического создания погодных устройств.

### 1.0.2 (12.09.2019)
* (algar42) Выпуск продукции

## Changelog
### 1.1.7 (2021-06-24)
* (bluefox) Create device for device-detector

## License
MIT License

Copyright (c) 2021 algar42 <igor.aleschenkov@gmail.com>

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