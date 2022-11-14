---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ebus/README.md
title: ioBroker.ebus
hash: 5JwxeHhAXaIpDmkqes8qvbpxd9+IpiVI8CrPE9sGl/E=
---
![Логотип](../../../en/adapterref/iobroker.ebus/admin/ebus.png)

![Количество установок](http://iobroker.live/badges/ebus-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ebus.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.ebus.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.ebus/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.ebus.png?downloads=true)

# IoBroker.ebus
![Действия на GitHub](https://github.com/rg-engineering/ioBroker.ebus/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

**Если вам это нравится, рассмотрите пожертвование:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Этот адаптер читает

- данные из ebusd с использованием html

В этом случае ebusd должен работать и должен иметь возможность отправлять данные, например, на Проводник через http://IP:port/data (http://192.168.0.123:8889/data) Текущая версия ebusd вкл. конфигурационные файлы можно скопировать с https://github.com/john30/ebusd Все поля с данными, lastup и из глобальной секции парсятся. Все остальные на данный момент игнорируются.

Существует возможность опрашивать данные, которые не опрашиваются ebusd напрямую. Команда 'read -f' используется для принудительного чтения через ebus.

Еще одна функция - отправить любую команду в ebusd и получить ответ для работы, например. скрипты.

текущая поддерживаемая версия ebusd: 22.3

**Внимание** с ebusd - путь конфигурации версии 22.1 был изменен на http://cfg.ebusd.eu/. Убедитесь, что вы изменили его при установке ebusd.
подробности см. в [список изменений](https://github.com/john30/ebusd/blob/master/ChangeLog.md)

## Как отправлять команды в ebusd
1. записать одну команду или список команд в точку данных ebus.0.cmd

Если вы хотите использовать более одной команды, используйте , для разделения отдельных команд.
пример: read -f YieldTotal, read LegioProtectionEnabled, read -f -c широковещательная рассылка снаружи временной

2. при выполнении команды вы получите результаты для каждой команды в datapoint ebus.0.cmdResult

Результат также разделен запятыми, пример: 2000, ERR: элемент не найден, 10,5

Внимание: команда в datapoint ebus.0.cmd удаляется после выполнения команды!

## Известные вопросы
* Пожалуйста, создавайте задачи на [github](https://github.com/rg-engineering/ioBroker.ebus/issues), если вы обнаружите ошибки или хотите добавить новые функции

## 2.4.3 (21.10.2021)
* (Рене) см. проблему № 58: исправление ошибки для предупреждения: игнорирование значения истории 1 (недействительное)», когда значения истории не установлены

## 2.4.2 (2021-10-19)
* (Рене) см. выпуск № 55: исправление ошибки

## 2.4.0 (2021-10-17)
* (René) чрезмерная обработка точек данных чтения и точек данных истории, схема добавлена опционально
* Команда (René) теперь может включать более одной команды, просто разделяйте команды с помощью ','
* (Рене) см. проблему № 55: предупреждения заменены сообщениями об отладке

## 2.3.2 (2021-09-02)
* (Рене) см. выпуск №49: поддержка ebusd 21.2
* (Рене) см. проблему № 40: возможность использовать логическое значение вместо строки для значений с включением/выключением
* (Рене) обновлены зависимости

## 2.2.7 (2021-07-03)
* (Рене) обновлены зависимости
* (Рене) см. проблему № 48: исправление ошибки для журналов неправильного типа данных

## 2.2.5 (2021-03-21)
* (Рене) обновлены зависимости

## 2.2.4 (2021-02-17)
* (Рене) см. проблему № 42: Uncaught ReferenceError: oView не определен в виджете.

## 2.2.3 (2020-10-24)
* (Рене) создать историю DP, если она недоступна

## 2.2.0 (2020-09-06)
* (Рене) измените DP только в случае необходимости, чтобы снизить нагрузку на систему
* (Рене) обновление зависимостей

## 2.1.1 (27.06.2020)
* (Рене) проблема № 26: исправление ошибки: «cmd not found» — это только отладочное сообщение, а не ошибка

## 2.1.0 (2020-06-17)
* (Рене) рефакторинг: используется 'async/await'

## 2.0.0 (2020-04-26)
* (Рене) «просьба» заменена на «склонность»

## 1.0.0 (2019-12-15)
* (Рене) обновление моего собственного флота 3.0

## 0.8.2 (2019-11-10)
* (Рене) еще несколько сообщений об ошибках в точке данных "ошибка"

## 0.8.1 (2019-10-31)
* (Рене) обновить флот до версии 3.0

### 0.8.0 (24 февраля 2019 г.)
* (Рене) значение hcmode2 5 = EVU Sperrzeit

### 0.7.0 (28 января 2019 г.)
* (Рене) добавлен регулируемый тайм-аут

### 0.6.0 (06.01.2019)
* (Rene) поддержка компактного режима

### 0.5.5 (2018-11-04)
* (Рене) очистка кода

### 0.5.4
* (Рене) удалена поддержка Arduino

### 0.5.3
* (Рене) добавить информацию об ошибке

### 0.5.2
* (Рене) исправление ошибки: в vis 1.x некоторые значения не сохраняются

### 0.5.1
* (Рене) исправление ошибки: если нечего опрашивать, то пропускать телнет-соединение

### 0.5.0
* (Рене) записать дату по TCP в ebusd

### 0.4.2
* (Рене) исправление ошибки для администратора V3

### 0.4.1
* Логотип (Рене) изменен

### 0.4.0
* (Рене) чтение данных из ebusd

### 0.3.0
* (Рене) поддержка ebusd
* (Рене) поддержка admin3

### 0.2.0
* (Рене) добавить историю в виде JSON для vis
* (Рене) добавлен виджет на основе флота для отображения температуры, состояния и графика мощности

### 0.1.0
* (René) запланированный адаптер вместо демона

### 0.0.3
* (Рене) Кодировка UTF8

### 0.0.2
* (Рене) первоначальный выпуск

## Changelog

### 3.0.7 (2022-08-20)
* (René) support ebusd 22.3

### 3.0.6 (2022-08-19)
* (René) bug fix in tooltip in wizard

### 3.0.4 (2022-08-18)
* (René) tooltip in wizard added
* (René) flot and dependencies updated
* (René) errors from ebusd are shown as warning here in adapter, details schould be checked in logs of ebusd
* (René) bug fix in widget: if less data available x axes grid point were not shown
* (René) except null as valid value from ebusd (e.g. to reset CurrentError)

### 3.0.2 (2022-04-02)
* (René) message for installation added

### 3.0.1 (2022-04-02)
* (René) read interval in admin added

### 3.0.0 (2022-04-02)
* (René) **ATTENTION** change from scheduled to daemon adapter
* (René) bent by axios replaced

### 2.5.1 (2021-12-29)
* (René) adjustable retries to send data if arbitration error appeared

### 2.5.0 (2021-12-28)
* (René) see issue #62: support ebusd 21.3

### 2.4.5 (2021-11-07)
* (René) bug fix color of labels in widget

### 2.4.4 (2021-10-30)
* (René) see issue #59: avoid endless loop
* (René) update flot to 4.2.2
* (René) bug fix missing space in command when using circuit name

## License
Copyright (C) <2017 - 2022>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.