---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.coronavirus-statistics/README.md
title: ioBroker.coronavirus-статистика
hash: bqsRHDuZ444Xh+//B61Oo5nYkZU2MtYV0jDI//VW7OM=
---
![НПМ-версия](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)
![Количество установок (последних)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.coronavirus-statistics/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/ioBroker.coronavirus-statistics.svg)

<img src="./admin/coronavirus-statistics.png" width="50" height="50" alt="">

# IoBroker.coronavirus-статистика
![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

## Адаптер оперативной статистики по коронавирусу для ioBroker
Адаптер для отображения глобальной информации о коронавирусе и текущих отчетов

Никакой настройки не требуется, после установки будет:

- Получайте глобальную информацию по всему миру и записывайте ее в «global_totals».
- Создайте папку для каждой страны со всей необходимой информацией о COVID-19.
- Обновление информации каждые 15 минут

Доступна следующая информация:

| Точка данных | Подробности |
|--|--|
| активный | Количество текущих инфицированных |
| случаи | Общее количество известных случаев |
| случаевPerOneMillion | Общее количество известных случаев на миллион жителей |
| критический | Количество критических ситуаций (Госпитализировано) |
| смерти | Количество текущих зарегистрированных смертей |
| смертейPerOneMillion | Количество текущих зарегистрированных смертей на миллион жителей |
| флаг | Флаг страны, ссылка на местоположение на github |
| выздоровел | Общее количество известных выздоровевших |
| сегодняСлучаи | Новые дела сегодня |
| сегодняСмерти | Сколько всего известных людей умерло сегодня |
| тест | Общее количество тестов на COVID-19, проведенных в мире |
| тестов на миллион уездов | Общее количество тестов на COVID-19, пройденных в мире на один миллион |

Имейте в виду, что этот адаптер использует как можно больше актуальной информации, но может быть задержка в несколько часов в зависимости от отчета страны.

```German Federal States : https://npgeo-corona-npgeo-de.hub.arcgis.com/  s```

Общий источник: https://coronavirus-19-api.herokuapp.com.

## Расширенные настройки
| Вариант | Описание |
|--|--|
| Все страны | Получить данные по всем странам мира (по умолчанию: false) |
| Континенты | Группировать общие суммы по континентам в отдельном состоянии (по умолчанию: false) |
| Удалить неиспользуемые состояния | Удалить данные, если выбор стран отменен (по умолчанию: false) |

## Changelog

<!--
	### __WORK IN PROGRESS__
	* (DutchmanNL) 
-->
### 0.9.0 (2023-11-16) - Remove unsupported APIs
* (DutchmanNL) Remove specific data regarding germany as APIs are not available anymore
* (DutchmanNL) Data source dedicated for https://coronavirus-19-api.herokuapp.com, we are unable to support more APIs due to changes, complexity and available development capacity. But please feel free to provide PR's!

### 0.8.8-0 (2021-11-19)
* (jlssmt) added hospital index for germany and federal states of germany

### 0.8.7 (2021-11-17)
* (DutchmanNL) Bugfix: Added missing definitions
* (jlssmt) Error handling for missing state attribute definitions Optimized

### 0.8.6 (2021-11-15)
* (Simatec) Design Fix for Admin >=5.1.28 Dark/Blue Theme

### 0.8.5 (2021-10-29)
* (jlssmt) Error handling for bundesländer api implemented

## License
MIT License

Copyright (c) 2023 DrozmotiX Holding B.V. <OSS@DrozmotiX.eu>

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
