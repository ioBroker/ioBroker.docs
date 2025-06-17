---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.netatmo-crawler/README.md
title: ioBroker.netatmo-crawler
hash: YJtbbntubeP/5CC/A1idWy9ui6wMTFdEprQHr2Oanrs=
---
![Логотип](../../../en/adapterref/iobroker.netatmo-crawler/img/netatmo-logo.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.netatmo-crawler.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.netatmo-crawler.svg)
![Количество установок (последнее)](http://iobroker.live/badges/netatmo-crawler-installed.svg)
![Стабильная версия](http://iobroker.live/badges/netatmo-crawler-stable.svg)
![Статус зависимости](https://img.shields.io/david/Bart1909/iobroker.netatmo-crawler.svg)
![Известные уязвимости](https://snyk.io/test/github/Bart1909/ioBroker.netatmo-crawler/badge.svg)
![Статус сборки](https://travis-ci.org/Bart1909/ioBroker.netatmo-crawler.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.netatmo-crawler.png?downloads=true)

# IoBroker.netatmo-crawler
адаптер netatmo-crawler для ioBroker

=================

Сканирует информацию с общественных станций Netatmo

Оглавление

=================

* [Инструкция](#инструкция)
* [Общая информация](#общая-информация)
* [Влажность](#влажность)
* [Дождь](#дождь)
* [Давление](#давление)
* [Температура](#температура)
* [Ветер](#ветер)
* [Кредиты](#кредиты)
* [Журнал изменений](#журнал изменений)
* [Лицензия](#лицензия)

Инструкция

===========

Чтобы найти URL-адрес нужной вам метеостанции, выполните следующие действия:

1. Откройте [Netatmo Weathermap](https://weathermap.netatmo.com)
2. Найдите свою станцию и нажмите на значок «Поделиться».

   ![Поделиться изображением](../../../en/adapterref/iobroker.netatmo-crawler/img/share.jpg)

3. Нажмите *скопировать ссылку*

   ![Копировать ссылку](../../../en/adapterref/iobroker.netatmo-crawler/img/copyLink.jpg)

4. Вставьте ссылку в настройки экземпляра адаптера

   ![Вставлять](../../../en/adapterref/iobroker.netatmo-crawler/img/insert.png)

Общая информация

===================

«Netatmo Crawler» анализирует много реальной локальной информации рядом с вами. Что вы делаете со всей этой информацией? Вот некоторые общие факты и примеры:

Влажность -------- Netatmo использует относительную влажность, это отношение текущей абсолютной влажности к максимально возможной абсолютной влажности (которая зависит от текущей температуры воздуха). Показание относительной влажности 100 процентов означает, что воздух полностью насыщен водяным паром и не может больше его удерживать, создавая возможность дождя. Это не означает, что относительная влажность должна быть 100 процентов, чтобы пошел дождь — она должна быть 100 процентов там, где формируются облака, но относительная влажность у земли может быть намного меньше.

Дождь ---- Использует единицу измерения миллиметр. Если вы хотите использовать единицу измерения литр на кубический метр, вы можете использовать ее в любом случае. Вы можете использовать ее для полива в саду (например).

Давление -------- Воздух вокруг вас имеет вес, и он давит на все, чего касается. Это давление называется атмосферным давлением или давлением воздуха.
Что делать с этим значением? Так же просто, как это звучит: прогноз погоды! Высокое давление = хорошая погода, низкое давление = плохая погода.
Нормальное среднее значение составляет 1013 мбар.
Для «реального» прогноза погоды вам понадобится история давления за несколько часов (я использую четыре часа).
Если оно падает, то в будущем будет плохая погода, если поднимается, то будет хорошая погода.
Я нашел [сценарий для прогноза здесь](http://www.beteljuice.co.uk/zambretti/forecast.html) (это называется методом Замбретти для 90% прогноза).
Другие единицы: 1 мбар = 100 Па = 1 гПа

Температура ----------- Здесь вы можете рассчитать уровень температуры охлаждения. Для низких температур используется индекс охлаждения ветром (10 °C или ниже, рассчитывается с учетом ветра), для высоких температур можно использовать индекс тепла (25 °C или выше, рассчитывается с учетом влажности).
пример скрипта:

```
windchill1 = windchill(temp, windkmh); //Vars to-from IOBroker

function windchill(temperature, windspeed) {
	var windchill = 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windspeed, 0.16) + 0.3965 *
			temperature * Math.pow(windspeed, 0.16);
	return windchill;
}

heatindex1 = heatindex(temp, hum); //Vars to-from IOBroker

function heat(temperature, humidity) {
	var heatindex = -8.784695 + 1.61139411 * temperature + 2.338549 * humidity - 0.14611605 *
			temperature * humidity - 0.012308094 * (temperature * temperature) -
			0.016424828 * (humidity * humidity) + 0.002211732* (temperature *
			temperature) * humidity + 0.00072546 * temperature * (humidity * humidity)
			- 0.000003582 * (temperature * temperature) * (humidity * humidity);
	return heatindex;
}
```

Ветер ---- Скорость ветра — это мера перемещения воздуха из высокого давления в низкое, обычно из-за изменений температуры.
Сила порыва — это наивысшее значение ветра, измеренное за короткое время (примерно три секунды).
Вам следует создать сценарий для вашего тента или для метода Замбретти (см. выше).

## Кредиты
Создание этого адаптера было бы невозможно без огромной работы @bart1909 (https://github.com/jbart1909)", который создал версии этого адаптера до V1.x.x.

Большое спасибо [бэкфиш](https://github.com/backfisch88) за первоначальную идею и поддержку!

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2025-06-13)
* (Bart1909) A problem handling urls and authentication has been fixed.
* (mcm1957) Adapter has been migrated into iobroker-community-adapters organisation.
* (Bart1909) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.4.10 now.
* (mcm1957) Dependencies have been updated.

### 0.8.0
* (Bart19) Adds additional 'rain_lastHour' state as 'rain' state is now real time value

### 0.7.1
* (Bart19) removed old news (#17)

### 0.7.0
* (Bart19) saves states as read-only (#23)

### 0.6.3
* (Bart19) updates dependencies

## License

MIT License

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Bart19 <webmaster@bart19.de>

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