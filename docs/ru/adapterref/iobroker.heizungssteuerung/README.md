---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.управление.
hash: SLEQGS3SNTdTr/oW8nwQtR2kQ0/Z0t0u8fgAHgisX6s=
---
![Логотип](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![Количество установок](https://iobroker.live/badges/heizungssteuerung-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/heizungssteuerung-stable.svg)
![Статус зависимости](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![НПМ](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)

# IoBroker.управление.
**Тесты:** ![Тест и выпуск](https://github.com/jbeenenga/ioBroker.heizungssteuerung/workflows/Test%20and%20Release/badge.svg)

## Адаптер Heizungssteuerung для ioBroker
Этот адаптер можно использовать для управления системами отопления. Вы можете выбирать между режимами охлаждения и отопления, а также активировать усиление или паузу для одной комнаты. Кроме того, вы можете перезаписать целевую температуру для одной комнаты.

## Конфигурация
Чтобы использовать адаптер, вам нужно добавить комнаты в перечисление комнат и добавить датчики и двигатели в комнаты.
Кроме того, вам нужно добавить функции температуры, влажности и двигателя в правильные состояния. Перечисления будут созданы после первого запуска адаптера. Если у вас нет датчика влажности, вы можете оставить его пустым.
![Пример конфигурации](../../../en/adapterref/iobroker.heizungssteuerung/img/configExample.png)

### Основные настройки
#### Режим нагрева
Вы можете выбрать охлаждение или обогрев.

#### Сброс температуры до значений по умолчанию при запуске адаптера
Если эта настройка активна, все состояния температуры будут перезаписаны температурой по умолчанию и targetUntil. Таким образом, следующая проверка температуры установит температуры на настроенные температуры, заданные в периодах.

#### Прекратите охлаждение, если влажность выше
Если влажность достигнута, охлаждение будет остановлено. Это работает только если вы добавили датчик влажности в Function и Room.

#### Интервал обновления в секундах
Определите, как часто адаптер будет проверять температуру и настраивать двигатели.

#### Температура по умолчанию
Определите температуру, которую следует установить, если для комнаты не подходит ни один период

#### Время до окончания паузы в минутах
Определите время, в минутах, до которого состояние паузы кристалла будет сброшено в неактивное состояние.

#### Время до окончания действия ускорения в минутах
Определите время, в минутах, до которого состояние усиления кристалла будет сброшено в неактивное состояние.

#### Разница от целевой температуры до начала или остановки нагрева
Определите разницу от целевой температуры, пока адаптер не начнет или не остановит нагрев. Например, если целевая температура составляет 20°, эта настройка равна 0,5, а двигатель выключен, нагрев начнется, если температура ниже 19,5°, и прекратится, если температура выше 20,5°.

### Периоды
Вы можете определить периоды для каждой комнаты и времени. Кроме того, вы можете определить, должен ли этот период использоваться для охлаждения или обогрева. Если режим обогрева не соответствует установленному режиму в основных настройках, период будет проигнорирован.

### Действия
Во время работы адаптера вы можете использовать действия для изменения обработки в особых случаях. Эти действия будут найдены в объектах в папке *Actions* под вашим адаптером. Некоторые действия доступны для всех комнат и для особых комнат.

#### Отсутствие Чтобы отключить управление отоплением, например, во время праздника, вы можете вставить дату отсутствия до в ваших объектах в *Действия отсутствие до*. Здесь вы можете ввести дату в формате *дд.ММ.гггг чч:мм* (например, *01.01.2024 14:00*). Если активировано, периоды будут игнорироваться, а температура будет установлена на [температура по умолчанию](#default-temperature).
Данная конфигурация доступна для всех комнат в целом.

#### Пауза
Чтобы остановить нагрев на некоторое время, можно активировать паузу. Состояние паузы будет сброшено по истечении времени, определенного в [настройки](#time-until-pause-will-be-end-in-minutes), до деактивированного. Если пауза активна, периоды будут игнорироваться, и нагрев не будет выполняться.

Эта конфигурация доступна для всех комнат в целом и для специальных комнат.

#### Способствовать росту
Чтобы остановить нагрев на некоторое время, можно активировать усиление. Состояние усиления будет сброшено по истечении времени, определенного в [настройки](#time-until-boost-will-be-end-in-minutes), на деактивированное. Если усиление активно, периоды будут игнорироваться, и нагрев будет выполняться.

Эта конфигурация доступна для всех комнат в целом и для специальных комнат.

## Изображения
Основное изображение создано Freepick (https://www.flaticon.com/de/kostenloses-icon/heizung_1295221)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2024-09-17)
* (jbeenenga) update dependencies
* (jbeenenga) add absence mode
* (jbeenenga) fix pause and boost for cooling mode

### 1.7.0 (2023-01-05)
* (jbeenenga) fix bug for end boost or pause mode
* (jbeenenga) provide corrent humidity in temperatures

### 1.6.7 (2022-12-16)
* (jbeenenga) fix date format

### 1.6.5 (2022-12-16)
* (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)
* (jbeenenga) add more debug outputs
* (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)
* (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)
* (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)
* (jbeenenga) add possibility to overwrite temperature temporarily
* (jbeenenga) add config for temperature offset
* (jbeenenga) add boost and pause function

## License
MIT License

Copyright (c) 2024 jbeenenga <j.beenenga@gmail.com>

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