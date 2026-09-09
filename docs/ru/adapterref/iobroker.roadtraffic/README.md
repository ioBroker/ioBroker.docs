---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.roadtraffic/README.md
title: ioBroker.roadtraffic
hash: gNHncX5MxkWq+XjdBqGuxRlWbSR74vqFEsgGK0ha0oE=
---
![Логотип](../../../en/adapterref/iobroker.roadtraffic/admin/roadtraffic.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.roadtraffic)
![Загрузки](https://img.shields.io/npm/dm/iobroker.roadtraffic.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.roadtraffic)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/roadtraffic/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.roadtraffic)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.roadtraffic/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.roadtraffic)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.roadtraffic)
![Версия NPM](http://img.shields.io/npm/v/iobroker.roadtraffic.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/roadtraffic-stable.svg)
![Количество установок](https://iobroker.live/badges/roadtraffic-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/actions/workflows/codeql.yml/badge.svg)

# ioBroker.roadtraffic

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Об этом адаптере

Этот адаптер использует API HERE.com для проверки дорожной ситуации на ваших маршрутах. Вы можете настроить несколько маршрутов, и адаптер будет проверять фактическую ситуацию на дорогах и показывать вам, сколько времени займет ваша поездка. Адаптер имеет встроенный будильник — вы можете указать адаптеру, к какому времени вам нужно быть на работе, — и адаптер начнет воспроизводить радио и делать объявление через Alexa (требуется адаптер Alexa2) — или вы можете использовать свой собственный скрипт для реакции на будильник адаптера.

## Начиная

Итак, начнём:

1. Перейдите по ссылке <https://developer.here.com/sign-up?create=Freemium-Basic&keepState=true&step=account> и создайте бесплатную учетную запись разработчика HERE.com (условно-бесплатная).

![Здесь1](../../../en/adapterref/iobroker.roadtraffic/img/Here1.png)

2. Убедитесь, что выбран вариант «Бесплатная версия», и заполните форму слева (Имя, Фамилия, Электронная почта и т. д.).

![Здесь2](../../../en/adapterref/iobroker.roadtraffic/img/Here2.png)

3. Нажмите «Зарегистрироваться для создания учетной записи HERE...» и не забудьте поставить галочку в соответствующем поле («Согласен с условиями предоставления услуг» и т. д.).

![Здесь3](../../../en/adapterref/iobroker.roadtraffic/img/Here3.png)

4. Ещё раз — примите условия использования и нажмите кнопку «Начать программирование».

![Здесь4](../../../en/adapterref/iobroker.roadtraffic/img/Here4.png)

5. На следующей странице вы уже находитесь на панели управления HERE.com. Найдите раздел REST и нажмите «Сгенерировать приложение».

![Здесь5](../../../en/adapterref/iobroker.roadtraffic/img/Here5.png)

6. Нажмите «Создать ключ API» — вы получите ключ API. Откройте настройки экземпляра адаптера roadtraffic в ioBroker и вставьте ключ API в поле конфигурации.

![Здесь6](../../../en/adapterref/iobroker.roadtraffic/img/Here6.png)

7. Нажмите на значок «Плюс» в настройках экземпляра и создайте свой первый маршрут.

После ввода всей информации в диалоговое окно конфигурации нажмите «Сохранить и закрыть». Адаптер должен перезагрузиться, и вы готовы к работе!

## Будильник

В настройках экземпляра вы можете включить будильник, установив флажок «Включить функцию будильника». Вам необходимо установить адаптер Alexa2 и настроить его на использование push-уведомлений в настройках экземпляра Alexa2. Выберите устройство Alexa, которым вы хотите управлять с помощью адаптера, и введите идентификатор станции TuneIn, которая должна воспроизводиться при срабатывании будильника. Громкость будильника имеет диапазон от 0 до 100. С помощью строки Speak вы можете управлять голосовым сообщением Alexa. По умолчанию: Guten Morgen %name. Bei aktueller Verkehrslage benötigst du %dur zur Arbeit.

Через 15 секунд после того, как Алекса начнет воспроизводить указанную станцию TuneIn, будет объявлена строка. Например, если у вас есть маршрут с именем «Даниэль» и триггеры тревоги, Алекса скажет: Guten Morgen Daniel. Bei aktueller Verkehrslage benötigst du 29 Minuten zur Arbeit.

Оставьте поле Speak пустым, если вы хотите, чтобы адаптер только начал воспроизводить музыку с TuneIn Station и не выдавал никаких объявлений.

На каждом маршруте имеется 7 каналов оповещения (с понедельника по воскресенье). В каждом канале отображаются следующие состояния:

- arrivaltime: Введите желаемое время прибытия в пункт назначения (например: 07:30 — половина восьмого утра).
- Время купания: Введите время, которое вы хотите добавить к продолжительности поездки. (Пример: 45 означает 45 минут. Допустим, вы установили время прибытия на 10:00, время купания на 30 минут, а текущая продолжительность поездки составляет 1 час. Тогда адаптер сработает в 08:30 (Время прибытия - Время купания - Продолжительность поездки).
- включено: установите значение true, если хотите включить будильник на этот день.
- triggered: Адаптер установит это состояние в значение true при срабатывании будильника. (Вы можете использовать его, например, со своими скриптами.) Состояние triggered будет сброшено в значение false в 00:00 соответствующего дня. (Суббота: состояние triggered будет установлено в false в 00:00 субботы).

## Кредиты

Адаптированный код для использования в версии 8 pi предоставлен @icastillo15 <starwarsmalu@gmail.com> .

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.2.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.1 (2023-11-28)
* (mcm1957) Role definitions have been corrected.

### 1.1.0 (2023-11-27)
* (icastillo15) Support for HERE v8 api protocoll has been added.
* (mcm1957) Dependencies have been updated.

### 1.0.2 (2023-10-27)
* (mcm1957) Error logging has been corrected.

### 1.0.1 (2023-10-26)
* (mcm1957) Issues reported by ioBroker adapter checker and lint have been fixed.

### 1.0.0 (2023-10-26)
* (mcm1957) This adapter has been moved into iobroker-community-organization.
* (mcm1957) Adapter requires nodejs 18.x or newer now.
* (mcm1957) Dependencies have been updated.

### 0.2.0 (2019-12-21)
* (BuZZy1337) Alarm-Clock implemented. (See Readme "Alarm-Clock" section for details)

### 0.1.1 (2019-12-13)
* (BuZZy1337) HERE.com changed the Authentication.
* (BuZZy1337) Prepare for Alarm.. (NOT WORKING YET!!! - But needed to push this version because of authentication changes)

### 0.1.0 (2019-12-08)
* (BuZZy1337) Using HERE.com instead of Google API (READ THE UPDATED README!!)

### 0.0.2 (2019-02-27)
* (BuZZy1337) Release to latest repository

### 0.0.1
* (BuZZy1337) initial release

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.roadtraffic/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019 BuZZy1337 <buzzy1337@outlook.de>

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