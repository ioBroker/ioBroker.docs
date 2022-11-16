---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pvoutputorg/README.md
title: ioBroker.pvoutputorg
hash: UNpMZ4dxO4O2ed9w5D8Dt+lCV+KvCWrvcLEo2dqbtiY=
---
![Логотип](../../../en/adapterref/iobroker.pvoutputorg/admin/pvoutputorg.png)

![Количество установок](http://iobroker.live/badges/pvoutputorg-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pvoutputorg.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.pvoutputorg.svg)
![Известные уязвимости](https://snyk.io/test/github/rg-engineering/ioBroker.pvoutputorg/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.pvoutputorg.png?downloads=true)

# IoBroker.pvoutputorg
![Действия на GitHub](https://github.com/rg-engineering/ioBroker.pvoutputorg/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

**Если вам это нравится, рассмотрите пожертвование:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Адаптер подключается к [PvOutput.org](https://pvoutput.org). System-ID и API-ключ используются для установления соединения. Оба должны быть настроены на странице администратора.
Система, состояние и статистические данные для всех настроенных систем в настоящее время считываются и отображаются в точках данных.
Генерируемая энергия может быть постоянно загружена на PvOutput.org.

Подробную информацию см. в разделе [pvoutput.org помощь](https://pvoutput.org/help/overview.html).

Если вы поддержите pvoutput.org пожертвованием, вам будут доступны дополнительные функции. На данный момент они еще не поддерживаются в адаптере.

# Скачать
Адаптер загружает три типа данных

* Системные данные
* Данные о состоянии
* Статистические данные

Для загрузки данных адаптер запускает регулируемое задание cron. Частоту загрузки можно настроить на странице администратора с помощью «интервала чтения данных [мин]».
Обычно значение частоты загрузки составляет 15 минут, но не более 59 минут.

## Системные данные
Адаптер извлекает информацию о состоянии системы и выходные данные в реальном времени.

подробнее о [документация по API](https://pvoutput.org/help/api_specification.html#id25)

## Данные о состоянии
Данные о состоянии (или оперативные данные) включают в себя все возможные системные данные, доступные для вашей системы.

подробнее о [документация по API](https://pvoutput.org/help/api_specification.html#id16)

## Статистические данные
Адаптер извлекает системную статистическую информацию.

подробнее о [документация по API](https://pvoutput.org/help/api_specification.html#id21)

# Загрузить
Загрузка данных — это только опция. Если вы загружаете данные с помощью другого приложения, такого как sbfspot, отключите загрузку здесь в адаптере.

## Загрузить оперативные данные
Для загрузки оперативных данных/данных о состоянии адаптер запускает регулируемое задание cron. Частоту загрузки можно настроить на странице администратора с помощью «интервала для записи данных [мин]».
Обычно значение частоты загрузки составляет от 5 до 15 минут, но не более 59 минут.

Адаптер предоставляет множество точек данных в папке «upload» для каждой системы. Должны использоваться только данные о мощности или энергии. Все остальные опционально.

подробнее о [документация по API](https://pvoutput.org/help/api_specification.html#add-status-service)

### Расчет мощности и энергии
Значения мощности и энергии могут быть получены друг из друга. Когда система отправляет только значения мощности, соответствующие значения энергии рассчитываются автоматически.
Точно так же, когда отправляются только значения энергии, PVOutput вычисляет среднюю мощность.

подробнее о [документация по API](https://pvoutput.org/help/api_specification.html#power-and-energy-calculation)

### Cumulative Energy — флаг CumulativeFlag в конфигурации системы
Следующие значения допустимы для совокупного флага.
1 = Значения «Выработка энергии» и «Потребление энергии» являются значениями энергии за весь срок службы. Энергия потребления и генерации сбрасывается на 0 в начале дня.
2 - Только генерация энергии является пожизненной ценностью энергии.
3 - Только потребление энергии является значением энергии в течение всего срока службы.

По умолчанию: 1

подробнее о [документация по API](https://pvoutput.org/help/api_specification.html#cumulative-energy)

### Net Data - NetDataFlag в конфигурации системы
Параметр, установленный на 1, будет указывать, что передаваемые значения мощности представляют собой чистый экспорт/импорт, а не валовое производство/потребление.
Эта опция используется для устройств, которые не могут сообщать данные о валовом потреблении. Предоставленные данные об импорте/экспорте объединяются с существующими данными о производстве для получения данных о потреблении.

По умолчанию: не отмечено

подробнее о [документация по API](https://pvoutput.org/help/api_specification.html#net-data)

## Загрузить данные на конец дня
В конце дня будет выполнена отдельная команда загрузки. Можно загрузить много разных данных. Эти данные доступны в виде точки данных в папке загрузки каждой системы. Все они опциональны.

подробнее о [документация по API](https://pvoutput.org/help/api_specification.html#add-output-service)

## Известные вопросы
* пожалуйста, создавайте задачи на [github](https://github.com/rg-engineering/ioBroker.pvoutputorg/issues), если вы обнаружите ошибки или хотите добавить новые функции

## Changelog

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

Copyright (c) 2022 rg-engineering <info@rg-engineering.eu>

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