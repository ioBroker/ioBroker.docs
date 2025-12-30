---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: ui5LKeSUWb8382OPMMp/VDeTS/H8fFlzezR8V3MHz0s=
---
![Логотип](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![Количество установок (последние)](http://iobroker.live/badges/sainlogic-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/sainlogic-stable.svg)
![Статус зависимости](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![Известные уязвимости](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## Адаптер Sainlogic для ioBroker
Считывание данных с метеостанции на базе Sainlogic.

## Поддерживаемые устройства
В принципе, любое устройство, работающее с оборудованием Sainlogic, обычно имеет в своей прошивке обозначение 'EasyWeather Vx.x.x'.

Известные рабочие устройства:

1. ELV WS980Wifi
1. Eurochron EFWS2900 (только в режиме прослушивания)
1. Froggit WH400SE
1. Froggit DP1500 (только протокол Ecowitt)
1. Sainlogic WS3500 (только в режиме прослушивания)
1. Датчик влажности WH51
1. Ecowitt GW1000
1. Froggit WH3000SE (только в режиме прослушивания)

## Использование
Адаптер поддерживает два режима отображения данных вашей метеостанции.

В режиме прослушивания адаптер поддерживает дополнительные датчики, если они поставляются с вашей метеостанции. В настоящее время поддерживаются датчики температуры и влажности. Если у вас есть другой дополнительный датчик, пожалуйста, создайте заявку на GitHub и опубликуйте строку данных, это поможет мне расширить функциональность.

### Режим прослушивания:
В последних версиях прошивки метеостанция поддерживает отправку данных на пользовательский сервер. Адаптер будет выступать в качестве такого сервера. Настройка состоит из двух шагов:

#### Настройка метеостанции
Для настройки метеостанции используйте приложение «WS View» на своем мобильном устройстве. Для настройки параметров сервера выполните следующие действия:

- Сервер: IP-адрес/имя хоста вашего сервера IOBroker
- Путь: любой, просто запомните его для настройки адаптера.

Примечание: на некоторых станциях добавление вопросительного знака в конце пути оказалось эффективным. На других станциях это работает и без него. Лучше всего попробовать оба варианта.

- Порт: любое число от 1024 до 65000 (по умолчанию 45000), должен быть уникальным и свободным в вашей системе IOBroker.
- Идентификатор станции: не используется

Примечание: на некоторых станциях по-прежнему требуется установка каких-либо значений.

— Указатель станции: не используется

Примечание: на некоторых станциях по-прежнему требуется установка каких-либо значений.

- Тип протокола: WeatherUnderground
- Интервал загрузки: любой, поддерживаемый вашей метеостанцией.

#### Настройка слушателя
В настройках экземпляра выберите вкладку «Слушатель» и установите следующие параметры:

- Активно: true
- IP: выберите IP-адрес вашего IOBroker, к которому метеостанция сможет подключаться (по умолчанию 0.0.0.0, что разрешает все IP-адреса). Это особенно важно, если у вас несколько сетей, в противном случае подойдут значения по умолчанию.
- Порт: Введите тот же порт, что и в приложении WS View.
- Путь: Введите тот же путь, что и в приложении WS View.
- URL для пересылки: Если вы хотите переслать полученные данные другому потребителю, вы можете указать дополнительный адрес. Например, вы можете получать данные в формате WU и все равно хотеть переслать их в WeatherUnderground.

Примечание: URL-адрес переадресации должен заканчиваться вопросительным знаком (?). Пример: https://weatherstation.wunderground.com/weatherstation/updateweatherstation.php?

Сохраните.
Запустится слушатель, который будет ожидать входящих соединений. В зависимости от выбранного вами интервала в журнале должно появиться сообщение «Слушатель получил обновление: ...» с данными.

### Режим планировщика:
Если ваша метеостанция поддерживает запрос данных, вы можете настроить планировщик соответствующим образом. Используемый протокол основан на [документация WS980](https://github.com/RrPt/WS980).

#### Настройка планировщика
В настройках экземпляра выберите вкладку «Планировщик» и установите следующие параметры:

- Активно: true
- IP-адрес: выберите IP-адрес вашей метеостанции. Убедитесь, что IP-адрес фиксирован и не меняется.
- Порт: Введите порт для подключения (по умолчанию 45000)
- Интервал: Введите интервал в секундах (рекомендуется минимум 10 секунд, чтобы не перегружать систему или сеть).

Сохранять.

Планировщик запустится и подключится к метеостанции через первый интервал времени. В журнале должно появиться сообщение типа «Планировщик запрашивает новые данные». Если вы установите режим ведения журнала в режим отладки, вы также увидите полученные строки данных.

## Информация, специфичная для станции
### Froggit DP1500
Похоже, эта станция не передает никаких данных, когда в качестве протокола выбран WeatherUnderground. С Ecowitt она работает корректно.

### Eurochron EFWS290
Станция не отвечает на команды планировщика, поэтому поддерживается только режим прослушивания.

### Sainlogic WS3500
Станция не отвечает на команды планировщика, поэтому поддерживается только режим прослушивания.

## Благодарности
Благодарность: lemuba, StrathCole, Glasfaser, Latzi: за неустанное тестирование моих багов :) Лизе за её [код для перевода градусов ветра в заголовке](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.1 (2025-12-29)

Changed max values for distance sensore (#262)

### 1.1.0 (2025-12-24)

Added deploy job for release script
Changed to Admin UI to jsonConfig

### 1.0.17 (2025-12-23)

Updates for releasescript changelog logic

### 1.0.16

Typo in io-package.json

## License

MIT License

Copyright (c) 2025 Fogg <foggch@gmail.com>

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