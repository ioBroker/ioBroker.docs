---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pvoutputorg/README.md
title: ioBroker.pvoutputorg
hash: rqPQB+VIhCx2SsAfv3yu+bdS3GejSh520tifn4ewMf8=
---
![Логотип](../../../en/adapterref/iobroker.pvoutputorg/admin/pvoutputorg.png)

![Количество установок](http://iobroker.live/badges/pvoutputorg-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pvoutputorg.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.pvoutputorg.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.pvoutputorg/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.pvoutputorg.png?downloads=true)
![node-lts](https://img.shields.io/node/v-lts/iobroker.pvoutputorg?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.pvoutputorg?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/rg-engineering/ioBroker.pvoutputorg?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/rg-engineering/ioBroker.pvoutputorg?logo=github&style=flat-square)

# IoBroker.pvoutputorg
![GitHub Actions](https://github.com/rg-engineering/ioBroker.pvoutputorg/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

**Если вам понравилось, пожалуйста, рассмотрите возможность пожертвования:**

[![[paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=34ESBMJ932QZC)

Адаптер подключается к [PvOutput.org](https://pvoutput.org). Для установления соединения используются идентификатор системы и ключ API. Оба параметра необходимо настроить на странице администратора.
В настоящее время считываются и отображаются в виде точек данных системные, статусные и статистические данные для всех настроенных систем.
Выработанную энергию можно постоянно загружать на PvOutput.org.

Для получения более подробной информации, пожалуйста, ознакомьтесь с разделом [справка pvoutput.org](https://pvoutput.org/help/overview.html)

Если вы поддержите pvoutput.org пожертвованием, вам станут доступны дополнительные функции. В настоящий момент они ещё не поддерживаются в адаптере.

## Скачать
Адаптер загружает три типа данных.

* Системные данные
* Данные о состоянии
* Статистические данные

Для загрузки данных адаптер запускает настраиваемое задание cron. Частоту загрузки можно настроить на странице администратора с помощью параметра "интервал чтения данных [мин]".
Обычно значение частоты загрузки составляет 15 минут, но не более 59 минут.

### Системные данные
Адаптер получает информацию о состоянии системы и данные о текущем состоянии.

подробнее на [Документация API](https://pvoutput.org/help/api_specification.html#id25)

### Данные о состоянии
Данные о состоянии (или данные в реальном времени) включают все возможные системные данные, доступные для вашей системы.

подробнее на [Документация API](https://pvoutput.org/help/api_specification.html#id16)

### Статистические данные
Адаптер получает статистическую информацию о системе.

подробнее на [Документация API](https://pvoutput.org/help/api_specification.html#id21)

## Загрузить
Загрузка данных — это лишь опция. Если вы загружаете данные с помощью других приложений, например sbfspot, отключите загрузку здесь, в адаптере.

### Загрузка данных в реальном времени
Для загрузки данных в режиме реального времени/данных о состоянии адаптер запускает настраиваемое задание cron. Частоту загрузки можно настроить на странице администратора с помощью параметра "интервал записи данных [мин]".
Обычно значение частоты загрузки составляет от 5 до 15 минут, но не более 59 минут.

Адаптер предоставляет множество точек данных в папке "upload" для каждой системы. Необходимо использовать только точку данных "мощность" или "энергопотребление". Все остальные являются необязательными.

подробнее на [Документация API](https://pvoutput.org/help/api_specification.html#add-status-service)

### Расчет мощности и энергии
Значения мощности и энергии могут быть получены из друг друга. Когда система отправляет только значения мощности, соответствующие значения энергии рассчитываются автоматически.
Аналогично, когда отправляются только значения энергии, PVOutput рассчитает среднюю мощность.

подробнее на [Документация API](https://pvoutput.org/help/api_specification.html#power-and-energy-calculation)

### Накопительная энергия - CumulativeFlag в конфигурации системы
Для накопительного флага допустимы следующие значения:
1 = Значения выработки и потребления энергии являются значениями энергии за весь период работы. Потребление и выработка энергии обнуляются в начале дня.
2 = Только выработка энергии является значением энергии за весь период работы.
3 = Только потребление энергии является значением энергии за весь период работы.

По умолчанию: 1

подробнее на [Документация API](https://pvoutput.org/help/api_specification.html#cumulative-energy)

### Net Data — NetDataFlag в конфигурации системы
Параметр, установленный на 1, будет указывать на то, что передаваемые значения мощности представляют собой чистый экспорт/импорт, а не валовую генерацию/потребление.
Эта опция используется для устройств, которые не могут сообщать данные о валовом потреблении. Предоставленные данные об импорте/экспорте объединяются с существующими данными о генерации для определения потребления.

По умолчанию: не отмечено

подробнее на [Документация API](https://pvoutput.org/help/api_specification.html#net-data)

## Загрузка данных на конец дня
В конце дня будет выполнена отдельная команда загрузки. Можно загрузить множество различных данных. Эти данные доступны в виде точек данных в папке загрузки для каждой системы. Все они являются необязательными.

подробнее на [Документация API](https://pvoutput.org/help/api_specification.html#add-output-service)

## Известные проблемы
* Пожалуйста, создавайте запросы на [github](https://github.com/rg-engineering/ioBroker.pvoutputorg/issues), если вы обнаружите ошибки или пожелаете добавить новые функции.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-06-30)
* (René) rewritten in typescript
* (René) support of new version of DasWetter adapter
* (copilot) Adapter requires node.js >= 22 now
* (René) update dependencies

### 1.9.7 (2026-03-15)
* (René) update dependencies + changes based on adapter checker

### 1.9.6 (2025-10-26)
* (René) bug fix sentry

### 1.9.5 (2025-10-21)
* (René) update dependencies + changes based on adapter checker

### 1.9.4 (2025-10-04)
* (René) update dependencies + changes based on adapter checker

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 René G. <info@rg-engineering.eu>

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