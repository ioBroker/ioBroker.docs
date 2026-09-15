---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-statistics
hash: R13ikpcJf/9GuofvvnlZfRlNUpy0onsNdTBzk/JzB7I=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![Количество установок (последние)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.coronavirus-statistics/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/ioBroker.coronavirus-statistics.svg)

<img src="./admin/coronavirus-statistics.png" width="50" height="50" alt="">

# ioBroker.coronavirus-statistics

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Адаптер для отображения статистики по коронавирусу в режиме реального времени для ioBroker

Адаптер для отображения глобальной информации о коронавирусе и текущих отчетов.

Никакой настройки не требуется, после установки произойдет следующее:

- Получайте глобальную информацию по всему миру и записывайте её в "global\_totals".
- Создайте для каждой страны папку со всей соответствующей информацией о COVID-19.
- Обновляйте информацию каждые 15 минут.

Доступна следующая информация:

| Точка данных                  | Подробности                                                                             |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| активный                      | Количество инфицированных в настоящее время людей                                       |
| случаи                        | Количество всех известных случаев                                                       |
| случаев на один миллион       | Количество подтвержденных случаев на миллион жителей                                    |
| критический                   | Степень критического состояния (госпитализирован)                                       |
| летальные исходы              | Количество зарегистрированных на данный момент смертей                                  |
| смертей на один миллион       | Количество зарегистрированных смертей на миллион граждан                                |
| флаг                          | Флаг страны, ссылка на GitHub.                                                          |
| выздоровел                    | Количество случаев полного выздоровления                                                |
| сегодняСлучаи                 | Новые случаи заболевания по состоянию на сегодня                                        |
| Сегодняшние смерти            | Общее количество известных людей, умерших сегодня.                                      |
| тест                          | Общее количество тестов на COVID-19, проведенных во всем мире.                          |
| тесты на один миллион округов | Общее количество тестов на COVID-19, проведенных во всем мире, на один миллион человек. |

Обратите внимание, что данный адаптер использует максимально актуальную информацию, однако возможна задержка в несколько часов в зависимости от данных, предоставляемых конкретной страной.\
`German Federal States : https://npgeo-corona-npgeo-de.hub.arcgis.com/  s` Общий источник: <https://coronavirus-19-api.herokuapp.com>

## Расширенные настройки

| Вариант                      | Описание                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------- |
| Все страны                   | Получить данные по всем странам мира (по умолчанию: false)                       |
| Континенты                   | Сгруппировать общие суммы по континентам в отдельном штате (по умолчанию: false) |
| Удалить неиспользуемые штаты | Удалять данные при снятии выделения со стран (по умолчанию: false)               |

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings
* (DutchmanNL) Update axios to 1.x

### 0.9.0 (2023-11-16) - Remove unsupported APIs
* (DutchmanNL) Remove specific data regarding germany as APIs are not available anymore
* (DutchmanNL) Data source dedicated for https://coronavirus-19-api.herokuapp.com, we are unable to support more APIs due to changes, complexity and available development capacity. But please feel free to provide PR's!

### 0.8.8-0 (2021-11-19)
* (jlssmt) added hospital index for germany and federal states of germany

### 0.8.7 (2021-11-17)
* (DutchmanNL) Bugfix: Added missing definitions
* (jlssmt) Error handling for missing state attribute definitions Optimized

### 0.8.6 (2021-11-15)
* (Simatec) Design Fix for Admin >=5.1.28 Dark/Blue Theme

### 0.8.5 (2021-10-29)
* (jlssmt) Error handling for bundesländer api implemented

[Older changelogs can be found there](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023 DrozmotiX Holding B.V. <OSS@DrozmotiX.eu>

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