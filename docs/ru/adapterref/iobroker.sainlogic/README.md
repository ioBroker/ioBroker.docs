---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: e4+rrm8uaFo9jxAnnikRymtzrB1vJicFveWkpv7f5Zo=
---
![Логотип](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![Количество установок (последнее)](http://iobroker.live/badges/sainlogic-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/sainlogic-stable.svg)
![Статус зависимости](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![Известные уязвимости](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## Sainlogic адаптер для ioBroker
Считывание данных с метеостанции на базе sainlogic

## Поддерживаемые устройства
По сути, любое устройство, работающее с оборудованием sainlogic, прошивка обычно отображается как «EasyWeather Vx.x.x)».

Известные рабочие устройства:

1. ELV WS980Wi-Fi
1. Eurochron EFWS2900 (только режим прослушивания)
1. Фроггит WH400SE
1. Froggit DP1500 (только протокол Ecowitt)
1. Sainlogic WS3500 (только режим прослушивателя)
1. Датчик влажности WH51
1. Эковитт GW1000
1. Froggit WH3000SE (только режим слушателя)

## Использование
Адаптер поддерживает два режима отображения данных вашей метеостанции.

В режиме прослушивателя адаптер поддерживает дополнительный датчик, если он поставляется с вашей метеостанции. В настоящее время поддерживаются температура и влажность. Если у вас есть другой дополнительный датчик, пожалуйста, поднимите вопрос на github и опубликуйте строку данных, так как это поможет мне расширить функциональность.

### Режим прослушивания:
С последними версиями прошивки метеостанция поддерживает отправку данных на пользовательский сервер. Адаптер будет выступать в качестве такого сервера. Настройка требует двух шагов:

#### Настройка метеостанции
Используйте приложение 'WS View' на вашем мобильном устройстве для настройки метеостанции. Настройте следующие параметры для индивидуальных настроек сервера:

- Сервер: IP/имя хоста вашего сервера IOBroker
- Путь: любой, просто запомните его для конфигурации адаптера

*Примечание:* на некоторых станциях добавление вопросительного знака в конце пути оказалось успешным. Некоторые другие работают без него. Лучше всего попробовать оба варианта.

- Порт: любое число от 1024 до 65000 (по умолчанию 45000), должно быть уникальным и свободным в вашей системе IOBroker.
- Идентификатор станции: не используется

*Примечание:* некоторые станции все еще требуют установки какого-либо значения

- Ключ станции: не используется

*Примечание:* некоторые станции все еще требуют установки какого-либо значения

- Тип протокола: WeatherUnderground
- Интервал загрузки: любой, поддерживаемый вашей метеостанцией

#### Настройте прослушиватель
В конфигурации экземпляра выберите вкладку «Прослушиватель» и установите следующее:

- Активно: правда
- IP: выберите IP вашего IOBroker, к которому метеостанция сможет подключиться (по умолчанию 0.0.0.0, чтобы разрешить все IP-адреса). Это особенно актуально, если у вас несколько сетей, в противном случае подойдет значение по умолчанию.
- Порт: введите тот же порт, что и в приложении WS View.
- Путь: введите тот же путь, что и в приложении WS View.
- Переслать URL: Если вы хотите переслать полученные данные другому потребителю, вы можете указать дополнительный адрес. Например, вы можете получать данные в формате WU и все равно хотеть переслать их в WeatherUnderground.

*Примечание*: URL-адрес переадресации должен заканчиваться вопросительным знаком (?). Пример: https://weatherstation.wunderground.com/weatherstation/updateweatherstation.php?

Сохранить.
Прослушиватель запустится и будет ожидать входящие соединения. В зависимости от вашего интервала вы должны увидеть в журнале сообщение «Прослушиватель получил обновление: ...» с данными.

### Режим планировщика:
Если ваша метеостанция поддерживает извлечение данных, вы можете настроить планировщик для этого. Используемый протокол основан на [Документация WS980](https://github.com/RrPt/WS980).

#### Настройте планировщик
В конфигурации экземпляра выберите вкладку «Планировщик» и установите следующее:

- Активно: правда
- IP: выберите IP вашей метеостанции, убедитесь, что IP фиксирован и не меняется.
- Порт: введите порт для подключения (по умолчанию 45000)
- Интервал: введите интервал в секундах (я бы рекомендовал не менее 10 секунд, чтобы не перегружать систему или сеть)

Сохранять.

Scheduler запустится и подключится к метеостанции после первого интервала времени. Вы должны увидеть сообщение в журнале, например, «Планировщик запрашивает новые данные». Если вы установите режим журнала на отладку, вы также увидите полученные строки данных.

## Информация о конкретной станции
### Фроггит DP1500
Похоже, эта станция не отправляет никаких данных, когда в качестве протокола выбран WeatherUnderground. С Ecowitt работает корректно.

### Еврохрон EFWS290
Станция не отвечает на команды планировщика, поэтому поддерживается только режим прослушивания.

### Sainlogic WS3500
Станция не отвечает на команды планировщика, поэтому поддерживается только режим прослушивания.

## Кредиты
Благодарности: lemuba, StrathCole, Glasfaser, Latzi: за неустанное тестирование моих ошибок :) Лизе за ее [код для перевода градусов ветра в заголовок](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

Latest version

#### 0.11.5 ECOWITT forwarding fixed

#### 0.11.4 Fix yearlyrain max value and mapping for CO2 sensors

#### 0.10.5 Bugfix for state initialization, removed log messages for forwarding

#### 0.10.4 Bugfix for lightning count, new battery states for additional sensors

#### 0.10.3 Bugfixes

#### 0.10.2 Bugfixes

#### 0.10.0 Added new sensors for Lightning, Piezo elements, DP250 and minor fixes

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

Copyright (c) 2024 Fogg <foggch@gmail.com>

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