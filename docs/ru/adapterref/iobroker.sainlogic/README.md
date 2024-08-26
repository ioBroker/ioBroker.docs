---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: u/ldqTcFTj1tVqfjoiD1RjkyUuNKLfkXlqH2T+r3bGs=
---
![Логотип](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![Количество установок (последние)](http://iobroker.live/badges/sainlogic-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/sainlogic-stable.svg)
![Статус зависимости](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![Известные уязвимости](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## Адаптер sainlogic для ioBroker
Чтение данных с метеостанции на базе sainlogic

## Поддерживаемые устройства
В основном любое устройство, работающее с аппаратным обеспечением Sainlogic, прошивка обычно сообщается как «EasyWeather Vx.x.x)».

Известные рабочие устройства:

1. ЭЛВ WS980Wi-Fi
1. Eurochron EFWS2900 (только режим прослушивания)
1. Фроггит WH400SE
1. Froggit DP1500 (только протокол Ecowitt)
1. Sainlogic WS3500 (только режим прослушивания)
1. Датчик влажности WH51
1. Эковитт GW1000
1. Froggit WH3000SE (только режим прослушивания)

## Применение
Адаптер поддерживает два режима отображения данных вашей метеостанции.

В режиме слушателя адаптер поддерживает дополнительный датчик, если он доставлен с вашей метеостанции. В настоящее время поддерживаются температура и влажность. Если у вас есть еще один дополнительный датчик, пожалуйста, поднимите вопрос на github и опубликуйте свою строку данных, так как это поможет мне расширить функциональность.

### Режим слушателя:
С последними версиями прошивки метеостанция поддерживает отправку данных на пользовательский сервер. Адаптер будет выступать в роли такого сервера. Настройка требует двух шагов:

#### Настройка метеостанции
Используйте приложение «WS View» на своем мобильном устройстве для настройки метеостанции. Настройте следующие параметры для индивидуальных настроек сервера:

- Сервер: IP/имя хоста вашего сервера IOBroker.
- Путь: любой, просто запомните его для конфигурации адаптера

*Примечание:* на некоторых станциях добавлен вопросительный знак в конце пути. Некоторые другие работают без него. Лучше всего попробовать оба.

- Порт: любой номер от 1024 до 65000 (по умолчанию 45000), должен быть уникальным и свободным в вашей системе IOBroker.
- Идентификатор станции: не используется

*Примечание:* некоторые станции по-прежнему требуют установки какого-либо значения

- Ключ станции: не используется

*Примечание:* некоторые станции по-прежнему требуют установки какого-либо значения

- Тип протокола: WeatherUnderground
- Интервал загрузки: любой, поддерживаемый вашей метеостанцией.

#### Настройка прослушивателя
В конфигурации экземпляра выберите вкладку «Прослушиватель» и установите следующее:

- Активный: правда
- IP: выберите IP-адрес вашего IOBroker, к которому сможет подключиться метеостанция (по умолчанию 0.0.0.0, чтобы разрешить все IP-адреса), это в основном актуально, если у вас несколько сетей, в противном случае подойдет значение по умолчанию.
- Порт: введите тот же порт, что и в приложении WS View.
- Путь: введите тот же путь, что и в приложении WS View.
- URL-адрес для пересылки: если вы хотите переслать полученные данные другому потребителю, вы можете указать дополнительный адрес. Например. вы можете получать данные в формате WU и по-прежнему хотеть переслать их в WeatherUnderground.

Сохранять.
Слушатель запустится и будет ждать входящих подключений. В зависимости от вашего интервала вы должны увидеть в журнале сообщение «Прослушиватель получил обновление: ...» с данными.

### Режим планировщика:
Если ваша метеостанция поддерживает извлечение данных, вы можете настроить планировщик для этого. Используемый протокол основан на [документация по WS980](https://github.com/RrPt/WS980).

#### Настроить планировщик
В конфигурации экземпляра выберите вкладку «Планировщик» и установите следующее:

- Активный: правда
- IP: выберите IP вашей метеостанции, вы должны убедиться, что IP фиксирован и не меняется
- Порт: введите порт для подключения (по умолчанию 45000).
- Интервал: введите интервал в секундах (я бы рекомендовал не менее 10 секунд, чтобы не перегружать систему или сеть).

Сохранять.

Планировщик запустится и подключится к метеостанции после первого интервала времени. Вы должны увидеть в журнале сообщение вроде «Планировщик запрашивает новые данные». Если вы установите режим журнала для отладки, вы также увидите полученные строки данных.

## Информация о станции
### Фроггит DP1500
Кажется, эта станция не отправляет никаких данных, когда WeatherUnderground выбран в качестве протокола. Он корректно работает с Ecowitt.

### Еврохрон EFWS290
Станция не отвечает на команды планировщика, поэтому поддерживается только режим слушателя.

### Sainlogic WS3500
Станция не отвечает на команды планировщика, поэтому поддерживается только режим слушателя.

## Кредиты
Спасибо: lemuba, StrathCole, Glasfaser, Latzi: за неустанное тестирование моих ошибок :) Лизе за ее [код для перевода градусов ветра в заголовок](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

Latest version

#### 0.8.2 Updated UVRaw to maxvalue 4000

#### 0.8.1 Bugfix for timestamp and listener

#### 0.8.0 Added time stamps for daily min and max values

#### 0.7.3 Dependency updates and Travis testing updates

#### 0.7.2 Dependency updates for security vulnerabilities 

#### 0.7.1 Fix Soilbatt mapping

#### 0.7.0 Support for Soil Moisture devices like attached to DP1500

#### 0.6.6 Adressed github issue #53 - warning on non existing object

#### 0.6.5 Removed unneeded events

#### 0.6.4 For WH2650: Adding model name and weather station communication frequency datapoint

#### 0.6.3 Fixed outdoor humidity

#### 0.6.2 Added additional sensor support


For detailed change log or previous versions check io-package.json

## License
MIT License

Copyright (c) 2022 Fogg <foggch@gmail.com>

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
