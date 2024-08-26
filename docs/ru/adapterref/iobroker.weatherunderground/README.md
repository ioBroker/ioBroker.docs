---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weatherunderground/README.md
title: ioBroker.weatherunderground
hash: fEsSzuic0LR7WFBozwZDWg4kn3f/hDkosdL4USvA92s=
---
![Логотип](../../../en/adapterref/iobroker.weatherunderground/admin/wu.png)

![Количество установок](http://iobroker.live/badges/weatherunderground-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.weatherunderground.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weatherunderground.svg)

# IoBroker.weatherunderground
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.weatherunderground/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/weatherunderground/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

Адаптер ioBroker для загрузки 24-часового прогноза погоды для вашего местоположения из [Погода Подземелье](http://www.wunderground.com/).
Адаптер загружает все 15-минутные (по умолчанию) данные ежедневного и почасового прогноза.

## Примечания
Вы можете использовать этот адаптер, предоставив официальный API-ключ «владельца PWS», или оставить ключ API пустым, чтобы использовать ключи, извлеченные с веб-страницы WU.

## Наборы значков
При использовании «Legacy API» доступно несколько различных наборов значков, см. ниже. Для использования с новым API имена изображений изменились (см. https://docs.google.com/document/d/1dNCf6nF6cjm4oOxQxjtqNuAvG_iEe5f9MQH1xlCeV4s/edit) и теперь основаны на числах... их можно загрузить, например, https://drive.google.com/drive/folders/0B6fWQWXuE09OOWtBOXJNX190TDQ и может использоваться как пользовательский набор (см. ниже).

В настройках адаптера измените «Custom Icon-Base-URL» на один из доступных наборов значков в Weatherunderground: (источник: https://www.wunderground.com/weather/api/d/docs?d=resources/icon-sets )

| Набор иконок | URL-адрес | Пример |
| ------------- | -------------------------------- | --------------------- 	|
| 1 | https://www.wunderground.com/static/i/c/a/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/a/partlycloudy.gif) |
| 3 | https://www.wunderground.com/static/i/c/c/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/c/partlycloudy.gif) |
| 4 | https://www.wunderground.com/static/i/c/d/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/d/partlycloudy.gif) |
| 5 | https://www.wunderground.com/static/i/c/e/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/e/partlycloudy.gif) |
| 6 | https://www.wunderground.com/static/i/c/f/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/f/partlycloudy.gif) |
| 7 | https://www.wunderground.com/static/i/c/g/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/g/partlycloudy.gif) |
| 8 | https://www.wunderground.com/static/i/c/h/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/h/partlycloudy.gif) |
| 9 | https://www.wunderground.com/static/i/c/i/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/i/partlycloudy.gif) |
| 10 | https://www.wunderground.com/static/i/c/j/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/j/partlycloudy.gif) |
| 11 | https://www.wunderground.com/static/i/c/k/ | ![альтернативный текст](https://www.wunderground.com/static/i/c/k/partlycloudy.gif) |
| 11 | https://www.wunderground.com/static/i/c/k/ | ![замещающий текст](https://www.wunderground.com/static/i/c/k/partlycloudy.gif) |

Или вы также можете использовать свои собственные «пользовательские» значки, для этого в каталоге Base-URL должны быть предоставлены следующие gif-файлы:

| Значок дня | Иконка на ночь |
| -----------------------------	| ----------------------------- |
| шансфлурри.gif | nt_chanceflurries.gif |
| шансрейн.gif | nt_chancerain.gif |
| шансслет.gif | nt_chancesleet.gif |
| шансслет.gif | nt_chancesleet.gif |
| шансснег.gif | nt_chancesnow.gif |
| шанс.штормы.gif | nt_chancetstorms.gif |
| шанс.штормы.gif | nt_chancetstorms.gif |
| ясно.gif | nt_clear.gif |
| облачно.gif | nt_cloudy.gif |
| флуррис.gif | nt_flurries.gif |
| туман.gif | nt_fog.gif |
| туманный.gif | nt_hazy.gif |
| в основномcloudy.gif | nt_mostlycloudy.gif |
| в основномсолнечный.gif | nt_mostlysunny.gif |
| частичнооблако.gif | nt_partlycloudy.gif |
| частичносолнечный.gif | nt_partlysunny.gif |
| снег.gif | nt_sleet.gif |
| дождь.гиф | nt_rain.gif |
| снег.gif | nt_sleet.gif |
| частичнооблако.gif | nt_partlycloudy.gif |
| солнечный.gif | nt_sunny.gif |
| tstorms.gif | nt_tstorms.gif |
| облачно.gif | nt_cloudy.gif |

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.6.0 (2023-09-09)
* (mcm1957) Icon urls at admin ui have been adapted to weatherunderground website changes (#158)
* (mcm1957) Forecast periods have been extended

### 3.5.0 (2023-09-08)
* (mcm1957) Adapter now requires node 16 or newer
* (mcm1957) Dependencies have been updated
* (waldmensch1) Cloudcover states have been added (PR #178)
* (mcm1957) Date format has been fixed to avoid incorrect display with newer admin versions (#191)
* (mcm1957) Forecast urls have been adapted to weatherunderground website changes (#158)

### 3.4.3 (2023-08-15)
* (Aplollon77) Translations have been updated (#159)
* (mcm1957) The testenvironment has been updated to use node 16/18/20
* (bluefox) Dependencies have been updated

### 3.4.2 (2022-04-26)
* (Apollon77) Added special logging when no current observation data are available because Station most likely offline to reduce confusion

### 3.4.1 (2022-03-13)
* (bluefox) Use axios for communication
* (bluefox) make sure date states are filled correctly

### 3.4.0 (2022-03-10)
* (Apollon77) If no official API-Key is used: Move schedule if default is used to better spread the requests over time to prevent peaks; Additionally add a random delay in the start minute
* (Apollon77) Further optimizations and additional logging

### 3.3.1 (2021-06-28)
* (Apollon77) Optimize for js-controller 3.3

### 3.3.0 (2021-01-22)
* (Apollon77) Optimize for js-controller 3.2
* (Apollon77) js-controller 2.0 is now required at least

### 3.2.5 (2020-12-27)
* (Apollon77) Prevent crash case (Sentry IOBROKER-WEATHERUNDERGROUND-1, IOBROKER-WEATHERUNDERGROUND-2)

### 3.2.3 (2020-12-26)
* (Apollon77) make sure adapter do not crash when no data could be read
* (Apollon77) Add Sentry error reporting

### 3.2.2 (2020-12-02)
* (Apollon77) icons sometimes did not have a correct extension
* (Apollon77) Correct some cases with different types of locations when reading data

### 3.2.1
* (raintonr) Corrected 'Imperial' terminology.

### 3.2.0 (2019-12-28)
* (StrathCole) fix forecast expiry time
* (StrathCole) add visibility index to objects on hourly forecast

### 3.1.6 (2019-10-16)
* (Bjoern3003) adjust to WU changes, now v3 API for hourly data
* (Apollon77) run once after installation/update

### 3.1.3
* (Apollon77) text correction

### 3.1.2 (2019-07-27)
* (Apollon77) use new parameters to get decimal precision values

### 3.1.1 (2019-07-14)
* (Apollon77) add windDirection as string calculated based on degrees

### 3.1.0 (2019-07-12)
* (Apollon77) remove option for legacy API because disabled by WU

### 3.0.14 (2019-07-11)
* (Apollon77) optimize checking of pws station id

### 3.0.13 (2019-07-10)
* (Apollon77) Fix error in image url handling

### 3.0.11/12 (2019-07-09)
* (Apollon77) Re-Fetch PWS station key on Error 401

### 3.0.10 (2019-05-27)
* (Apollon77) Adopt logic to WU changes

### 3.0.8 (2019-03-23)
* (Apollon77) Add additional guidance when location is not found by WU

### 3.0.7 (2019-03-22)
* (Apollon77) implement to extract used "legacy" API keys out of WU website to allow restore of functionality for now
* (Apollon77) Also extract API keys for newer API version from website to be usable together with real "PWS owner keys" in future
* (Apollon77) optionally get data using the New APIs (as well as the officially available PWS-Owner APIs as also additional ones to restore functionality)
* (Apollon77) Admin 2 support removed and adapted the Admin 3 texts as needed for now

### 2.0.4 (2018-08-19)
* (René) some typos
* (bluefox) Write only numbers and not strings

### 2.0.3 (2018-07-30)
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.1.2 (2017-11-24)
* (Apollon77) Add option to specify image format for custom image urls

### 1.1.1 (2017-11-08)
* (Apollon77) Optimize API usage by getting all data with one call instead of two
* (Apollon77) Add support for multiple API-Keys

### 1.1.0 (2017-10-30)
* (Apollon77) Add option to overwrite Icon Base URL

### 1.0.8 (2017-07-12)
* (DeepCoreSystem) add 2 current observation values, fixes of some datapoint caps.

### 1.0.7 (2017-06-19)
* (Dutchman) add Dutch language suppport

### 1.0.6 (2017-05-16)
* (Rene) bug fixing
	+ all 4 sets are enabled as default
	+ change of checkbox enables saves button

### 1.0.5 (2017-05-14)
* (Rene) hourly forecast extend to 36h

### 1.0.4 (2017-04-09)
* (Rene) parse much more data
   + today's 24 h
   + next 4 days / nights as text
   + next 4 days
   + current values
   each can be enabled or disabled

### 1.0.3 (2016-11-01)
* (bluefox) Catch parse errors

### 1.0.2 (2016-10-29)
* (Apollon77) make sure precip values are always integers

### 1.0.1 (2016-07-21)
* (jens-maus) conversion from feet to meter for observation_location

### 1.0.0 (2016-07-12)
* (Apollon77) add daily rain level forecast

### 0.2.0 (2016-07-01)
* (Apollon77) Add Error handling and station-usage for forcasts

### 0.1.1 (2016-06-07)
* (ploebb) Fix forecast api URL

### 0.1.0 (2016-05-07)
* (bluefox) convert text to floats
* (bluefox) support languages

### 0.0.5
corrected humidity value within current weather info (slice + unit)

### 0.0.4
checking for spaces in location
added current conditions

### 0.0.3
bugfix in summed pop-value.

### 0.0.2
config dialog fixed

### 0.0.1
initial release with all basics to load WU-forecast data

## License

The MIT License (MIT)

Copyright (c) 2015-2023 dschaedl <daniel.schaedler@gmail.com>, iobroker-community-adapters

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
