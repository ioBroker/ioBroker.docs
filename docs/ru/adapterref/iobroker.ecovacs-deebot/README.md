---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecovacs-deebot/README.md
title: Адаптер Ecovacs Deebot для ioBroker
hash: kWOGYisqyqdwwWuf3Xbar3G6Oix+zKtuU71w+esCSaM=
---
![Логотип](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![Стабильная версия](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![Последняя версия](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![Количество установок](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![Количество загрузок в месяц](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![Количество загрузок](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)

# Адаптер Ecovacs Deebot для ioBroker
[![рабочий процесс github] (https://github.com/mrbungle64/iobroker.ecovacs-deebot/actions/workflows/node.js.yml/badge.svg)](https://github.com/mrbungle64/iobroker.ecovacs-deebot)

Этот адаптер использует библиотеку [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js).

## Функции
Некоторые примечательные особенности:

* Основные функции очистки (например, автоматическая очистка, выборочная область, пользовательская область)
* и различные другие команды (например, воспроизведение звука, сброс расходных материалов, изменение местоположения)
* Получить основную информацию (например, уровень заряда батареи, журнал очистки, расходные материалы, состояние очистки и зарядки)
* и различная расширенная информация (например, место зарядки, информация о карте, информация о сети)
* Получение информации во время процесса очистки (например, текущее положение и текущая площадь пятна)
* Установите мощность вакуума, уровень воды и другие основные настройки
* Установите расширенные настройки (например, непрерывная очистка, режим «Не беспокоить», громкость, TrueDetect 3D)
* Сохраните последнюю использованную пользовательскую область и перезапустите сохраненные области
* Получить информацию о картах вкл. точечные зоны, виртуальные границы и зоны без швабры
* Удалять, сохранять и воссоздавать отдельные виртуальные границы, а также полный набор виртуальных границ
* Информация о дате и времени последнего присутствия для каждой отдельной области пятна
* Некоторые функции при возвращении на зарядную станцию или при входе/выходе из спотовой зоны
* Функция загрузки текущего изображения карты
* Установить имена отдельных спотовых зон (в ioBroker)

Обратите внимание: некоторые функции доступны только для некоторых моделей, а некоторые все еще являются экспериментальными.

## Модели
### Поддерживаемые модели
* Дибот 900/901
* Дибот ОЗМО 930
* Дибот ОЗМО 920/950
* Дибот OZMO T8 AIVI

Перечисленные модели - это те, которые я использую сам или которые технически идентичны этим.

### Эти модели должны работать корректно или хотя бы частично
Перечисленные модели либо уже работают, либо технически аналогичны этим моделям.
Тем не менее, функциональность может быть частично ограничена.

Я стараюсь достичь широкого диапазона функциональности, но решаю это в каждом конкретном случае в зависимости от сложности и различных других критериев.
Претензий к полной функциональности конечно нет.

#### Ecovacs Deebot
* Дибот Слим 2
* Серия Deebot N79
* Дибот М88
* Дибот 500
* Дибот 600/601/605
* Дибот 710/711
* Дибот ОЗМО 610
* Дибот ОЗМО 900/905
* Дибот ОЗМО тонкий 10/11
* Дибот ОЗМО Т5
* Дибот ОЗМО Т10 Плюс
* Серия Deebot U2
* Серия Deebot N8
* Deebot (ОЗМО) серии T8
* Серия Deebot T9
* Серия Deebot T10
* Серия Deebot X1

#### Йеди (экспериментальный)
* йеди к650
* йеди 2 гибрид
* yeedi вакуумный гибрид
* станция швабры Yeedi

## Монтаж
### Предпосылки
Чтобы использовать этот адаптер, у вас уже должен быть установлен [ioBroker](iobroker.net).

Минимальная требуемая версия Node.js — 14.x. Рекомендуется использовать версию 14.x или 16.x.

### Необязательные предпосылки
Этот адаптер использует библиотеку [узел-холст](https://www.npmjs.com/package/canvas) для некоторых функций, связанных с картой, которые могут потребовать установки некоторых дополнительных пакетов.

Установка холста необязательна и необязательна для моделей без функции карты, но для полной функциональности установите следующие пакеты.

Для систем Linux на основе Debian необходимо выполнить следующие команды:

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Перед выполнением следующей команды может потребоваться перезагрузка.

```bash
npm install canvas --unsafe-perm=true
```

Инструкции для других систем см. на странице https://www.npmjs.com/package/canvas#compiling.

## ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
Часто задаваемые вопросы можно найти [здесь](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

## Применение
Информацию о том, как использовать этот адаптер, можно найти в [здесь](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

### Состояния
Информацию о состояниях можно найти в [здесь](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29) (английский) и [здесь](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Datenpunkte-%28DE%29) (немецкий)

## Известные вопросы
* Генерация изображений карт в настоящее время нестабильна на 32-битных системах.
* Для некоторых моделей (например, Deebot OZMO 930) рекомендуется

на [запланировать перезапуск](https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content) один раз в день, потому что есть сообщения о том, что соединение теряется прибл. 24 часа

* Функция «край» не работает с Deebot U2 (вместо этого запускается автоматическая очистка)
* Функции "перемещения" не работают с Deebot OZMO T8 AIVI (а возможно и с некоторыми другими моделями)
* Некоторые состояния журнала очистки в серии T9 пусты ("last20Logs", "lastCleaningDate" и "lastCleaningMapImageURL").

## Отказ от ответственности
Я никоим образом не связан с ECOVACS.

## Changelog

### 1.4.8 (alpha)
* Breaking change: Bumped minimum required version of Node.js to 14.x
* Bumped ecovacs-deebot.js to 0.9.0-beta.0
* Bumped several other dependencies

### 1.4.7
* Bumped ecovacs-deebot.js to 0.8.3-beta.2 (Hotfix XMPP devices)

### 1.4.6
* Added option for native goToPosition function (e.g. Deebot OZMO T8 AIVI)
* Some improvements and fixes

### 1.4.5
* Added states for time and cleaned area since last dustbox removal
* Added button for manually trigger dustbox removal
* Removed some options from settings
* Some other changes to settings
* Bumped ecovacs-deebot.js to latest beta
* Initial Support for yeedi login (experimental)
* and also for a few models (experimental)
  * yeedi k650
  * yeedi 2 hybrid
  * yeedi vac hybrid
  * yeedi mop station

### 1.4.4
* Bumped ecovacs-deebot.js to 0.8.2
* Bugfix for non 950 type models with mopping system (e.g. OZMO 930)
* Some minor improvements

### 1.4.3
* Bumped ecovacs-deebot.js to latest beta
* Improved last time presence functionality
* Added state for Clean Preference (e.g. T8/T9 series)
* Added state for the last 20 errors
* Added state for cleaning schedule (read-only)
* Some further improvements and some fixes

### 1.4.2
* Bumped ecovacs-deebot.js to 0.8.1 (beta)
* Added states for cleaning cloth reminder and auto-boost suction (e.g. OZMO 920/950, T8/T9 series)
* Added states for mopping type and scrubbing type (models with OZMO Pro mopping system)
* Added option to choose between 'pause' and 'stop' for 'PauseBeforeDockingChargingStation...' functionality
* Some further improvements

### 1.4.1
* Bumped ecovacs-deebot.js to 0.8.0
* Improved last time presence functionality
* Added option to reset the vacuum power (cleanSpeed) to standard on return
* Added option to keep modified spot area names (pre-selection on non 950 type models)
* Added states for current used custom and spot areas (currentUsedSpotAreas and customUsedCustomAreaValues)
* Handle error code 110 ("NoDustBox: Dust Bin Not installed")
* Bumped some dependencies

### 1.4.0
* Bumped ecovacs-deebot.js to 0.8.0 (beta)
* Implemented last time presence function (still experimental)
* Implemented cleanCount (permanent clean count) function (T8/T9/X1 series)
* Implemented trueDetect (enable/disable) function (T8/T9/X1 series)
* Added unit care to consumables (T8/T9/X1 series)
* Added Deebot X1 series
* Some improvements and fixes

### 1.3.4
* Bumped ecovacs-deebot.js to 0.7.2 (beta)
* Implemented some experimental functions for auto empty stations
* Some refactoring

### 1.3.3
* Bumped ecovacs-deebot.js to 0.7.1 (incl. fix for CVE-2022-0155)

### 1.3.2
* Bumped follow-redirects to 1.14.7 (fix for CVE-2022-0155) and some other dependencies
* Added N8 PRO+

### 1.3.1
* Fix the cleaning functions for the Deebot 710 series

### 1.3.0
* Using library version 0.7.0 (beta)
* The minimum required version of Node.js is now 12.x
* Some improvements for newer models (e.g. T9 series)
* Some other improvements and fixes

### 0.0.1 - 1.2.4
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive))

## License

MIT License

Copyright (c) 2022 Sascha Hölzel <mrb1232@posteo.de>

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