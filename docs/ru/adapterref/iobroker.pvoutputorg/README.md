---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pvoutputorg/README.md
title: ioBroker.pvoutputorg
hash: VqvGAYefwYHYeiJskKMd8QvmTPruFxgPhWVAdG5VqDA=
---
![Логотип](../../../en/adapterref/iobroker.pvoutputorg/admin/pvoutputorg.png)

![Количество установок](http://iobroker.live/badges/pvoutputorg-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pvoutputorg.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.pvoutputorg.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.pvoutputorg/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.pvoutputorg.png?downloads=true)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.pvoutputorg?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.pvoutputorg?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.pvoutputorg?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)

# IoBroker.pvoutputorg
![Действия GitHub](https://github.com/rg-engineering/ioBroker.pvoutputorg/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

**Если вам это нравится, пожалуйста, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Адаптер подключается к [PvOutput.org](https://pvoutput.org). Для установления соединения используется системный идентификатор и API-ключ. Оба должны быть настроены на странице администратора.
Система, состояние и статистические данные для всех сконфигурированных систем в настоящее время считываются и отображаются в точках данных.
Генерируемую энергию можно постоянно загружать на PvOutput.org.

Для получения подробной информации ознакомьтесь с [Помощь pvoutput.org](https://pvoutput.org/help/overview.html).

Если вы поддержите pvoutput.org пожертвованием, вам станут доступны дополнительные функции. На данный момент они еще не поддерживаются адаптером.

# Скачать
Адаптер загружает три типа данных

* Системные данные
* Данные о состоянии
* Статистические данные

Для загрузки данных адаптер запускает настраиваемое задание cron. Частоту загрузки можно настроить на странице администратора с помощью параметра «интервал чтения данных [мин]».
Обычно значение частоты загрузки составляет 15 минут, но не более 59 минут.

## Системные данные
Адаптер получает информацию о состоянии системы и выходные данные в реальном времени.

подробнее о [Документация по API](https://pvoutput.org/help/api_specification.html#id25)

## Данные о состоянии
Данные о состоянии (или текущие данные) включают в себя все возможные системные данные, доступные для вашей системы.

подробнее о [Документация по API](https://pvoutput.org/help/api_specification.html#id16)

## Статистические данные
Адаптер получает статистическую информацию о системе.

подробнее о [Документация по API](https://pvoutput.org/help/api_specification.html#id21)

# Загрузить
Загрузка данных является только опцией. Если вы загружаете данные с помощью другого приложения, например sbfspot, отключите загрузку здесь, в адаптере.

## Загрузить текущие данные
Для загрузки оперативных данных/данных о состоянии адаптер запускает настраиваемое задание cron. Частоту загрузки можно настроить на странице администратора с помощью параметра «интервал записи данных [мин]».
Обычно значение частоты загрузки составляет от 5 до 15 минут, но не более 59 минут.

Адаптер предоставляет множество точек данных в папке «Загрузка» для каждой системы. Должна использоваться только точка данных мощности или энергии. Все остальные опционально.

подробнее о [Документация по API](https://pvoutput.org/help/api_specification.html#add-status-service)

### Расчет мощности и энергии
Значения мощности и энергии могут быть получены друг из друга. Когда система отправляет только значения мощности, соответствующие значения энергии рассчитываются автоматически.
Аналогично, когда отправляются только значения энергии, PVOutput рассчитает среднюю мощность.

подробнее о [Документация по API](https://pvoutput.org/help/api_specification.html#power-and-energy-calculation)

### Cumulative Energy — CumulativeFlag в конфигурации системы
Следующие значения действительны для накопительного флага.
1 = Значения выработки энергии и потребления энергии являются значениями энергии за весь срок службы. Энергия потребления и генерации сбрасывается до 0 в начале дня.
2 – Только выработка энергии является энергетической ценностью на протяжении всей жизни.
3. Только потребление энергии является энергетической ценностью в течение всего срока службы.

По умолчанию: 1

подробнее о [Документация по API](https://pvoutput.org/help/api_specification.html#cumulative-energy)

### Net Data — NetDataFlag в конфигурации системы
Если для параметра установлено значение 1, это будет означать, что передаваемые значения мощности представляют собой чистый экспорт/импорт, а не валовое производство/потребление.
Эта опция используется для устройств, которые не могут сообщать данные о валовом потреблении. Предоставленные данные об импорте/экспорте объединяются с существующими данными о выработке электроэнергии для получения данных о потреблении.

По умолчанию: не отмечено

подробнее о [Документация по API](https://pvoutput.org/help/api_specification.html#net-data)

## Загрузить данные на конец дня
В конце дня будет выполнена отдельная команда загрузки. Можно загрузить много разных данных. Эти данные доступны в виде точки данных в папке загрузки каждой системы. Все они опциональны.

подробнее о [Документация по API](https://pvoutput.org/help/api_specification.html#add-output-service)

## Известные вопросы
* создавайте проблемы на [github](https://github.com/rg-engineering/ioBroker.pvoutputorg/issues), если вы обнаружите ошибки или вам нужны новые функции.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.8.10 (2023-11-19)
* (René) dependencies updates
*

### 1.8.9 (2023-07-30)
* (René) dependencies updates

### 1.8.8 (2023-04-07)
* (René) dependencies updates

### 1.8.7 (2023-01-31)
* (René) dependencies updates

### 1.8.6 (2022-11-29)
* (René) see issue #4 : bug fix negative temperatures

### 1.8.5 (2022-10-01)
* (René) bug fix wrong date

### 1.8.4 (2022-08-21)
* (René) bug fix WeatherConditions
* (René) bug fix EoD upload

### 1.8.0 (2022-08-20)
* (René) WeatherConditions can be used directly from DasWetter adapter

### 1.7.0 (2022-07-17)
* (René) WeatherConditions for upload end of the day (EoD) data added
* (René) write-Interval selectable out of 5, 10 or 15 minutes according PVOutput.org-specification

### 1.6.1 (2022-07-06)
* (René) bug fix date string in write status and end of day data

### 1.6.0 (2022-07-01)
* (René) change back from cron to interval
* (René) end of day data are written 1 hour after sunset
* (René) read and write data only when daylight as an option

### 1.5.0 (2022-04-21)
* (René) datapoint added to show when data uploaded to pvoutput.org

### 1.4.0 (2022-06-01)
* (René) changed to post requests

### 1.3.0 (2022-05-26)
* (René) Upload live data and end-of-day
* (René) better error handling when receiving errors from server
* (René) CumulativeFlag and NetDataFlag added for upload service

### 1.2.0 (2022-05-21)
* (René) IsActive per system added

### 1.1.0 (2022-05-20)
* (René) write data to PvOutput.org added
* (René) change to cron

### 1.0.0 (2022-04-29)
* (René) first official release

### 0.0.1 (2022-04-24)
* (René) initial release

## License
MIT License

Copyright (c) 2022-2023 rg-engineering info@rg-engineering.eu

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