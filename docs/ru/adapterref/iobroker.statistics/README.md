---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.statistics/README.md
title: ioBroker.statistics
hash: 50F3oa1dUN0ZXS5QMiPgTULKjXr2Y6gjxR/q4zvXj1k=
---
![Логотип](../../../en/adapterref/iobroker.statistics/admin/statistics.png)

![Количество установок](http://iobroker.live/badges/statistics-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.statistics.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.statistics.svg)

# IoBroker.statistics
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.statistics/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/statistics/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Описание
Этот адаптер упростит настройку статистики.

`The adapter only reacts on state changes (state.ack=true), not on commands!`

выберите одну из следующих настроек:

* подсчет импульсов или включение / выключение изменений (только для двоичных значений и положительного фронта)
* рассчитать затраты на основе подсчитанных значений (только для двоичных значений)
* как долго статус был истинным / включенным и как долго ложным / выключенным (только для двоичных значений)
* дельта между зарегистрированными аналоговыми значениями (только для аналоговых значений)
* дневной максимум, минимум и среднее значение (не для расчетов дельты)
* мин / макс за год
* подсчет в течение 5 минут и дневных максимумов, минимумов и средних значений (не для расчетов дельты)
* суммирование сгруппированных значений

Адаптер подписывается на настроенные объекты и создает собственные состояния в дереве статистики.

Создаются 2 отдельных дерева:

* `statistics.0.save` -> окончательные значения таймфрейма
* `statistics.0.temp` -> временные значения до момента передачи для сохранения, затем снова запускается темп.

Структура государства: `statistics.0.{save|temp}.{kind of stat}.{original observed state}.{state of statistical value}`

Немецкий документ HowTo доступен здесь: [howto_de](./doc/howto_de.md)

## Настройки
* укажите соответствующие группы на странице конфигурации экземпляра (admin => instance => statistics config)
* указать конфигурацию в настройках состояния (админ => объекты)

<! - Заполнитель для следующей версии (в начале строки):

### __РАБОТА В ПРОЦЕССЕ__ ->

## Changelog
### 1.0.10 (2021-11-14)
* (Apollon77) prevent some crash cases

### 1.0.9 (2021-07-29)
* (bluefox) Removed the warnings for js-controller 3.x

### 1.0.6 (2021-05-27)
* (Apollon77) prepare for js-controller 3.3
* (Apollon77) make sure all tasks are processed to prevent missing objects
* (bluefox) added the support of Admin5

### 1.0.4
* (foxthefox) changed the state change to BOTH positive and negative edges, hence it causes a lot of log entries

### 1.0.3 (2021-02-08)
* (Apollon77) fix from sentry crash reports

### 1.0.2 (2021-01-06)
* (foxthefox) try catch around the cronjobs

### 1.0.1 (2020-12-22)
* (Black-Thunder) Precision in rounding set to 4

### 1.0.0 (2020-05-01)
* (bluefox) Caught error if structure is invalid
* (bluefox) Added sentry
* adapter.getObjectView -> controller > 2.0

### 0.2.3 (2020-01-02)
* (HIRSCH-DE) bugfix main.js
* (foxthefox) delete messagehandler

### 0.2.2 (2019-06-29)
* (foxthefox) adapter logs a warning when invalid values arrive and cancels further processing

### 0.2.1 (2019-06-15)
* (foxthefox) correction, timecount value was milliseconds instead seconds
* (foxthefox) other calculations with 2 decimal places after comma
* (foxthefox) min/max for day/week/month/quarter/year
* (foxthefox) set of daily min/max starting point from actual value
* (foxthefox) fixing the PR with dayMin 0 at 00:00
* (foxthefox) improvement for timecount when receiving status updates and no real status change

### 0.2.0 (2019-01-08)
* (foxthefox) compact mode

### 0.1.4 (2019-01-07)
* (foxthefox) license added in io-package.json
* (foxthefox) ReadMe updated
* (foxthefox) type = misc-data

### 0.1.3 (2019-01-06)
* first npm release
* (foxthefox) german doc added
* (foxthefox) error corrections
* (foxthefox) travis testing corrections

### 0.1.2 (2018-09-08)
* (bluefox) total refactoring

### 0.0.3
* admin3 implemented
* complete rewrite to have configuration through the settings of the individual states instead in admin page

### 0.0.2
* setup running

### 0.0.1
* initial release

## License

The MIT License (MIT)

Copyright (c) 2018-2021 foxthefox <foxthefox@wysiwis.net>,

Copyright (c) 2018-2021 bluefox <dogafox@gmail.com>