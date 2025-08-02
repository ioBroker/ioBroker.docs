---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weatherflow_udp/README.md
title: UDP-протокол погоды
hash: hGAfz3t2ag9lo6Hj4I4jq+P26RipTF5tObr5GWVrJwM=
---
![Логотип](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.weatherflow_udp?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weatherflow_udp?label=npm%20downloads&style=flat-square)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.weatherflow_udp?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.weatherflow_udp?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/woessmich/iobroker.weatherflow_udp?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Активность коммита GitHub](https://img.shields.io/github/commit-activity/m/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Известные уязвимости](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/woessmich/iobroker.weatherflow_udp/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Бета](https://img.shields.io/npm/v/iobroker.weatherflow_udp.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![Установлено](http://iobroker.live/badges/weatherflow_udp-installed.svg)

# UDP-протокол погоды
## Версии
## Адаптер weatherflow_udp для ioBroker
Адаптер приемника Weatherflow UDP для приема и анализа [UDP-сообщения](https://weatherflow.github.io/Tempest/api/udp/v143/) от [Weatherflow](www.weatherflow.com) умные метеостанции, такие как [Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/).
Адаптер должен уметь анализировать и старые станции, такие как "Air" и "Sky" (но это не проверено).
Стандартный порт, который слушает адаптер, — 50222, но его можно изменить в настройках.

## Настройки
Адаптер предоставляет минимальный набор параметров настройки.
Порт прослушивания можно изменить, что не должно быть обязательным, поскольку порт, на который отправляет данные концентратор метеостанции, изменить нельзя, насколько мне известно.

Высота станции в метрах над уровнем моря используется для расчета пониженного давления из местного давления, которое предоставляется станцией. Просто используйте ту же высоту, что введена в приложении. Могут быть небольшие различия по сравнению с пониженным давлением в приложении в зависимости от используемой формулы. Адаптер использует формулу, которую использует немецкая метеорологическая служба DWD (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [здесь](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)).

Если флажок отладки установлен, адаптер создает много выходных данных в файле журнала. Следует использовать только для отладки.

## Данные и состояния по погодным потокам
Адаптер предоставляет все параметры, которые отправляются по протоколу UDP. Состояния находятся в дереве под идентификатором концентратора и станции. <b>Внимание</b> : при отправке данных в базы данных для долгосрочного архивирования следует использовать псевдонимы для состояний, чтобы не потерять ряд, если блоку требуется замена. Существуют некоторые отличия от того, что предоставляет Tempest-App, поскольку приложение получает уже обработанные данные обратно с серверов weatherflow. При достаточном заряде батареи данные &quot;device_status&quot; и &quot;obs_st&quot; обновляются каждую минуту, &quot;rapid_wind&quot; обновляется каждые 3 секунды. &quot;evt_precip&quot; и &quot;evt_strike&quot; обновляются (и создаются) только тогда, когда они происходят. &quot;hub_status&quot; обновляется каждые 10 секунд. Значения от станции и адаптера, рассчитанные (см. ниже), создаются только тогда, когда они получены или подлежат расчету. Это означает, что может потребоваться до 24 часов, чтобы увидеть все, за исключением событий начала дождя и удара молнии, которые могут появиться в течение дней, недель, месяцев ;-)

## Адаптер вычисляет состояния
В дополнение к данным, предоставляемым системой, адаптер вычисляет некоторые дополнительные данные, все из которых имеют суффикс «adaptercalculated» (вычислено адаптером):

- Ветер средний, порывистый и затишье в [шкале Бофорта](https://en.wikipedia.org/wiki/Beaufort_scale)
- точка росы рассчитывается на основе температуры и влажности
- ощущается как температура, рассчитанная из температуры, влажности и среднего ветра. В зависимости от температуры и ветра или температуры или влажности отображается только температура воздуха или рассчитывается [индекс охлаждения ветром](https://en.wikipedia.org/wiki/Wind_chill) или [индекс тепла](https://en.wikipedia.org/wiki/Heat_index).
- Количество и продолжительность осадков, а также [продолжительность солнечного сияния](https://en.wikipedia.org/wiki/Sunshine_duration) (>= 120 Вт/м2) предоставляются для текущего и прошедшего часа, а также для сегодняшнего и вчерашнего дня. Использование предыдущего часа и вчерашнего дня позволяет легко сохранять данные в базе данных об изменении значений.
- Интенсивность осадков указывается по следующей шкале: отсутствуют (0): 0 мм/час; очень слабые (1): > 0, < 0,25 мм/час; слабые (2): ≥ 0,25, < 1,0 мм/час; умеренные (3): ≥ 1,0, < 4,0 мм/час; сильные (4): ≥ 4,0, < 16,0 мм/час; очень сильные (5): ≥ 16,0, < 50 мм/час; экстремальные (6): > 50,0 мм/час
- Дождь также отображается как логическое состояние (true, false) в precip_evt. Он будет установлен в true, если получено событие осадков и если значение осадков >0. Через 3 минуты он сбрасывается, если дождь больше не идет
- Солнечный свет также отображается как логическое состояние true, если >= 120 Вт/м2, и false, если меньше
- Направление ветра по сторонам света (NSWE), рассчитанное по направлению ветра в градусах.

Кроме того, адаптер предоставляет выборку полезных минимальных и максимальных значений параметров за сегодня и вчера.

- sensor_status в виде текста, чтобы легко увидеть, какой датчик(и) вышел из строя, если это произойдет.
- Из битов sensor_status извлекается режим питания (экспериментально)

## Расстояние молнии
Протокол отправляет расстояние молнии 0, когда молния не обнаружена. Значения 0 изменяются на 999, чтобы избежать впечатления, что удары молнии происходят прямо над головой.

## Changelog

### 0.1.4
(womi) updated to reflect latest requirements on dependencies, node.js, js-controller etc.
### 0.1.3 
(Scrounger) calculation of absolute humidity added
### 0.1.2
(womi) Update js-controller >3.0.0; checked compatibility with js-controller 4.0 
### 0.1.1
(womi) Fixed "invalid date" in timestamps 
### 0.1.0
(womi) Compatibility with Admin 5; Stable version

## License
MIT License

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

Copyright (c) 2024 womi <woessmich@gmail.com>