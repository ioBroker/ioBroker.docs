---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weatherflow_udp/README.md
title: Weatherflow UDP
hash: QCPPsp5PMI7rB5nvJLnERX/8HOpbjGMKGO2+2y9ruaw=
---
![Логотип](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.weatherflow_udp?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weatherflow_udp?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.weatherflow_udp?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.weatherflow_udp?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/woessmich/iobroker.weatherflow_udp?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![Известные уязвимости](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/woessmich/iobroker.weatherflow_udp/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Бета](https://img.shields.io/npm/v/iobroker.weatherflow_udp.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![Установлено](http://iobroker.live/badges/weatherflow_udp-installed.svg)

# Weatherflow UDP
## Версии
## Адаптер weatherflow_udp для ioBroker
Адаптер UDP-приемника Weatherflow для приема и анализа [UDP-сообщения от умных метеостанций Weatherflow, таких как Weatherflow Tempest, по адресу [Weatherflow.com](https://weatherflow.github.io/Tempest/api/udp/v171/).](https://weatherflow.com/tempest-weather-system/).
Адаптер также должен уметь анализировать более старые станции, такие как «Air» и «Sky» (но это не тестировалось).
Включена поддержка нового оборудования 2026 года (дополнительные недокументированные поля сообщений).
Стандартный порт, на котором работает адаптер, — 50222, но его можно изменить в настройках.

## Настройки
Адаптер предоставляет минимальный набор параметров настройки.
Порт прослушивания можно изменить, хотя это, насколько мне известно, не должно потребоваться, поскольку порт, который передает концентратор метеостанции, изменить нельзя.

Высота станции в метрах над уровнем моря используется для расчета пониженного давления относительно местного давления, предоставляемого станцией. Просто используйте ту же высоту, что и в приложении. В зависимости от используемой формулы могут быть небольшие расхождения с пониженным давлением в приложении. Адаптер использует формулу, применяемую немецкой метеорологической службой DWD (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [здесь](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)).

Если установлен флажок «Отладка», адаптер записывает много информации в лог-файл. Использовать его следует только для отладки.

## Данные и состояния от weatherflow
Адаптер предоставляет все параметры, передаваемые по протоколу UDP. Состояния находятся в дереве под идентификатором хаба и станции. <b>Внимание</b> : при отправке данных в базы данных для долговременного архивирования следует использовать псевдонимы для состояний, чтобы не потерять последовательность данных в случае замены устройства. Есть некоторые отличия от того, что предоставляет приложение Tempest, поскольку приложение получает уже обработанные данные обратно с серверов Weatherflow. При достаточном заряде батареи данные &quot;device_status&quot; и &quot;obs_st&quot; обновляются каждую минуту, &quot;rapid_wind&quot; обновляется каждые 3 секунды. &quot;evt_precip&quot; и &quot;evt_strike&quot; обновляются (и создаются) только тогда, когда происходят события. &quot;hub_status&quot; обновляется каждые 10 секунд. Значения, полученные со станции и рассчитанные адаптером (см. ниже), создаются только при получении или необходимости расчета. Это означает, что для отображения всех данных может потребоваться до 24 часов, за исключением событий начала дождя и ударов молнии, которые могут появиться через дни, недели или месяцы ;-)

## Вычисленные состояния адаптера
В дополнение к данным, предоставляемым системой, адаптер вычисляет некоторые дополнительные данные, которые имеют суффикс "adapter calculated" в качестве имени:

- Средняя скорость ветра, порывы и затишье в шкале Бофорта (Beaufort Scale)
- точка росы рассчитывается на основе температуры и влажности
- Ощущаемая температура рассчитывается на основе температуры, влажности и средней скорости ветра. В зависимости от температуры и ветра, температуры или влажности отображается либо только температура воздуха, либо рассчитывается [индекс ветрового охлаждения](https://en.wikipedia.org/wiki/Wind_chill) или [индекс жары](https://en.wikipedia.org/wiki/Heat_index).
— Количество осадков и продолжительность солнечного сияния, а также продолжительность солнечного сияния (>= 120 Вт/м²) указаны для текущего и прошедшего часа, а также для сегодняшнего и вчерашнего дня. Использование данных за предыдущий час и вчера позволяет легко сохранять данные в базу данных при изменении этих значений.
Интенсивность осадков указана по следующей шкале: нет (0): 0 мм/час; очень слабые (1): > 0, < 0,25 мм/час; слабые (2): ≥ 0,25, < 1,0 мм/час; умеренные (3): ≥ 1,0, < 4,0 мм/час; сильные (4): ≥ 4,0, < 16,0 мм/час; очень сильные (5): ≥ 16,0, < 50 мм/час; экстремальные (6): > 50,0 мм/час
- В параметре precip_evt наличие дождя также отображается как логическое состояние (true, false). Оно устанавливается в true, если получено событие выпадения осадков и если значение осадков > 0. Через 3 минуты оно сбрасывается, если дождь прекращается.
— Уровень солнечного света также отображается в виде логического состояния: true, если >= 120 Вт/м², и false, если меньше.
- Направление ветра, указанное основными буквами (NSWE), рассчитано на основе направления ветра в градусах.

Кроме того, адаптер предоставляет набор полезных минимальных и максимальных значений параметров за сегодняшний и вчерашний день.

— Отобразите sensor_status в текстовом формате, чтобы в случае возникновения такой ситуации было легко определить, какой(ие) датчик(и) вышел(ли) из строя.
- Из битов sensor_status извлекается режим питания (экспериментально).

## Расстояние до молнии
Протокол передает сигнал на расстояние 0, если молния не обнаружена. Значения 0 заменяются на 999, чтобы избежать впечатления, что удары молнии происходят прямо над головой.

## Changelog

### 0.1.6
(womi) maintenance; Adapter requires node.js >= 22 now
### 0.1.5
(womi) maintenance;
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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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

Copyright (c) 2026 womi <woessmich@gmail.com>