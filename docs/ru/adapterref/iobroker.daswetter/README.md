---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.daswetter/README.md
title: ioBroker.DasWetter.
hash: DYcvTEtuN7DdGtev2cQo55gxW1WLYUgMzzGtAMFX8Tc=
---
![Логотип](../../../en/adapterref/iobroker.daswetter/admin/daswettercom.png)

![Количество установок](http://iobroker.live/badges/daswetter-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.daswetter.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.daswetter.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.daswetter/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.daswetter.png?downloads=true)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.daswetter?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.daswetter?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.daswetter?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.daswetter?logo=github&style=flat-square)

# IoBroker.DasWetter.
![Действия GitHub](https://github.com/rg-engineering/ioBroker.daswetter/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Этот адаптер считывает данные прогноза погоды с сайта DasWetter.com.

**ВНИМАНИЕ: В настоящее время новые регистрации на DasWetter, по-видимому, невозможны. Пожалуйста, не открывайте никаких тикетов здесь, в адаптере, так как мы не имеем никакого влияния на поставщика данных. Как только у нас появится новая информация, мы опубликуем ее здесь.**

Вам нужна учетная запись на DasWetter.com. Зарегистрируйтесь по адресу https://www.daswetter.com/api/#/login Учетная запись предоставляется бесплатно при определенных условиях.

В вашем аккаунте вы найдете три URL для четырех различных моделей данных:

* Прогноз на ближайшие 7 дней и общая информация о дне: максимум и минимум, ветер (символ и описание), символ дня и погодные условия
* подробная информация за 5 дней и каждые 3 часа: Общая ежедневная информация следующая: пик, минимум, ветер, порывы, осадки, относительная влажность,

давление воздуха на уровне моря, снеговая линия, восход и заход солнца, даты, связанные с луной, местное время

* Предварительный просмотр с подробными данными каждый час (только первые 2 дня, затем каждые 3 часа)
* Прогноз на 5 дней и каждые 3 часа (в формате JSON)

Все четыре модели реализованы, и хотя бы одну следует использовать.
В настройках необходимо использовать URL-адрес типа http://api.daswetter.com/index.php?api_lang=de&localidad=xxxx. Просто скопируйте полный URL-адрес из своей учетной записи.

## Подсказки
### Иконки, используемые в vis
* Доступ к значкам, таким как `http://ip:8082/adapter/daswetter/icons/tiempo-weather/galeria1/1.png`.
* в galerie6 оригинальные иконки в формате svg. У приложения Vis могут возникнуть проблемы с их визуализацией. Поэтому доступны преобразованные png. Просто используйте опцию "использовать png"
* в galerie5 оригинальные иконки в формате svg и png. Кроме того, доступны цветные и белые версии

### "текущий" в NextHours_Day1:
* DasWetter.com не предоставляет реальные текущие значения погоды.
* но иногда полезно иметь прогноз на текущий час
* поэтому мы добавили «текущий», который является просто копией соответствующих значений прогнозируемого часа
* пожалуйста, обязательно звоните на адаптер по крайней мере один раз в час, чтобы быть уверенным, что «текущая» версия обновлена должным образом
* см. также запрос функции на github [issue24](https://github.com/rg-engineering/ioBroker.daswetter/issues/24)

### Путь 4
* в настоящий момент DasWetter.com отправляет данные, которые отличаются от его собственных спецификаций.

Теперь мы реализовали «автоматическое восстановление», которое изменяет структуру до задокументированной формы.

## Известные проблемы
* пожалуйста, создавайте проблемы на [github](https://github.com/rg-engineering/ioBroker.daswetter/issues), если вы нашли ошибки или хотите новые функции

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.2.2 (2024-12-15)
* (René) translations
*

### 3.2.1 (2024-12-06)
* (René) see issue #411: jsonConfig fixed
* (René) see issue #408: hint regarding user registration limitation added

### 3.2.0 (2024-12-04)
* (René) see issue #406: test with nodejs@22
* (René) update dependencies
* (René) migration to admin 5 UI (jsonConfig)

### 3.1.16 (2024-08-18)
* (René) update dependencies
* (René) bug fixes based on adapter checker recommendation

### 3.1.15 (2024-05-28)
* (René) see issue #354: change of dependencies

### 3.1.13 (2024-01-12)
* (René) update dependencies

### 3.1.12 (2023-12-24)
* (René) see issue #217: additional log added to understand root cause, please copy&past log output into github issue

### 3.1.11 (2023-11-18)
* (René) update dependencies

### 3.1.10 (2023-07-30)
* (René) update dependencies

### 3.1.8 (2023-04-07)
* (René) update dependencies

### 3.1.7 (2023-01-31)
* (René) update dependencies

### 3.1.6 (2022-12-23)
* (René) see issue #153: package Axios downgraded

### 3.1.5 (2022-12-04)
* (René) update dependencies

### 3.1.4 (2022-08-19)
* (René) update dependencies
* (dipts) Added missing / corrected inappropriate icons for galeria 1

### 3.1.3 (2022-05-05)
* (René) see issue #139: bug fix moon icon

### 3.1.2 (2022-03-20)
* (René) see issue #130: bug fix json data

### 3.1.1 (2022-03-19)
* (René) bug fix UV index

### 3.1.0 (2022-03-19)
* (René) replace bent by axios
* (René) dependencies updated
* (René) see issue #128: add UV index

### 3.0.9 (2021-11-09)
* (René) dependencies updated
* (René) see issue #114: "connectionType" and "dataSource" fixed

### 3.0.8 (2021-09-22)
* (DutchmanNL) Warn messages for channels solved
* (DutchmanNL) Optimize log message at adapter termination
* (DutchmanNL) Ensure adapter will always handle data at start

### 3.0.7 (2021-05-03)
* (René) issue #91: remove warnings with js-controller 3.3.

### 3.0.5 (2021-03-21)
* (René) dependencies updated

### 3.0.4 (2020-10-16)
* (René) see issue #76: parse rain values as float instead integer

### 3.0.3 (2020-09-19)
* (René) see issue #66: parse numbers added

### 3.0.1 (2020-05-01)
* (René) breaking change: old data structure is not supported anymore
* (René) "request" replaced by "bent"
* (René) "xml2js" replaced by "xml2json"
* (René) manual from DasWetter updated in folder \docs
* (René) see issue #39: create copy of data in hourly data path for next 1, 2, 3 or 6 hours (as an option)
* (René) copy for current can be disabled now

### 2.8.2 (2020-03-20)
* (René) some more logs to find parser errors

### 2.8.1 (2019-09-08)
* (René) bug fix: some datapoints were created as number instead of string

### 2.8.0 (2019-03-19)
* (René) moon and wind icon set added in admin !!path to wind icons changed!!
* (René) path to customized icon set added 
* (René) exit code changed

### 2.7.3 (2019-02-24)
* (René) bug fix: some values are number instead of string

### 2.7.2 (2019-02-14)
* (bluefox) Serialization of the objects deletion

### 2.6.1 (2019-02-10)
* (René) update dependencies

### 2.6.0 (2019-01-20)
* (René) support of compact mode
* (René) new icons for galeria5 (color or white; svg or png) selectable in admin
* (René) auto-repair for path4

### 2.5.0 (2018-11-30)
* (René) since app has problems with svg we can use png instead. svg's are converted to png. In admin a new option is available to use original svg's or converted png's 
* (René) max. 500 datapoints are deleted per call to reduce work load, so it might take a few calls until all old data points are removed

### 2.4.0 (2018-11-26)
* (René) sunshine duration added
* (René) current in NextHours_Day1 and NextHours2_Day1 added

### 2.3.1 (2018-11-04)
* (René) clean up code

### 2.3.0 (2018-08-23)
* (René) support of 4. path (json)

### 2.2.0 (2018-08-20)
* (René) delete unused data structure

### 2.1.3 (2018-08-17)
* (René) typo fixed
* (René) missing Icon-URL's added

### 2.1.2 (2018-08-14)
* (bluefox) Configuration dialog was fixed

### 2.1.1 (2018-08-04)
* (René) parse timeout added
* (René) missing roles and states added
* (René) using of units from data structure

### 2.1.0 (2018-07-30)
* (bluefox) Added URLs to icons
* (bluefox) Added the roles and the names to states
* (bluefox) Icons moved to admin directory

### 2.0.0
* (René) new datastructure !not compatible to version 1.x!
now parsing all data from xml and store them in datapoints
for compatibility: in configuration old data structure can be enabled 
needs also 2.x of vis-weather-widget

## License

MIT License

Copyright (c) 2017-2024 René G. <info@rg-engineering.eu>

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