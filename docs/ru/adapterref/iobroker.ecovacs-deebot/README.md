---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ecovacs-deebot/README.md
title: Адаптер Ecovacs Deebot для ioBroker
hash: COLurwRj6WJlVjKYGfOrVZLpkwhLfYHFrZOIRdwuSI0=
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
* и различные другие основные функции (например, воспроизведение звука, сброс расходных материалов, изменение местоположения)
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
* Функция бесшумного подхода для текущих моделей

Обратите внимание: некоторые функции доступны только для некоторых моделей, а некоторые все еще являются экспериментальными.

## Модели
### Полностью поддерживаемые модели
Полностью поддерживаемые модели — это те, которые принадлежат мне самому:

* Дибот ОЗМО 920
* Дибот OZMO T8 AIVI
* Дибот Х1 Турбо

### Другие поддерживаемые модели
Эти модели должны работать корректно или хотя бы частично.
Они либо уже работают, либо технически схожи с этими моделями.
Тем не менее, функциональность может быть частично ограничена.

Я стараюсь достичь широкого диапазона функциональности, но решаю это в каждом конкретном случае в зависимости от сложности и различных других критериев.
Претензий к полной функциональности конечно нет.

#### Ecovacs Deebot
* Дибот ОЗМО 950
* Серия Deebot N8
* Серия Deebot U2
* Серия Deebot T8
* Серия Deebot T9
* Серия Deebot T10
* Серия Deebot X1

#### Йеди (начиная с версии 1.4.5)
* йеди к650
* йеди 2 гибрид
* yeedi вакуумный гибрид
* Yeedi вакуум макс
* йеди пылесос 2 про
* станция швабры Yeedi

#### Устаревшие модели (скоро будут сняты с производства)
Эти модели используют XML для передачи данных, а также другие характеристики для команд и событий, чем текущие модели.
Я также больше не использую свои Slim 2, Deebot 901 и OZMO 930.

**Поэтому поддержка этих моделей скоро будет прекращена**.

* Дибот Слим 2
* Серия Deebot N79
* Дибот М88
* Дибот 500
* Дибот 600/601/605
* Дибот 710/711
* Дибот 900/901
* Дибот ОЗМО 610
* Дибот ОЗМО 900/905
* Дибот ОЗМО 930
* Дибот ОЗМО тонкий 10/11

## Монтаж
### Предпосылки
Чтобы использовать этот адаптер, у вас уже должен быть установлен [ioBroker](iobroker.net).

Минимальная требуемая версия Node.js — 14.x. Рекомендуется использовать версию 16.x или 18.x.

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

## Использование
Информацию о том, как использовать этот адаптер, можно найти в [здесь](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

### Состояния
Информацию о состояниях можно найти в [здесь](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29) (английский) и [здесь](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Datenpunkte-%28DE%29) (немецкий)

## Известные вопросы
* Генерация изображений карт в настоящее время нестабильна на 32-битных системах.
* Функция «край» не работает с Deebot U2 (вместо этого запускается автоматическая очистка)
* Функции «перемещения» не работают должным образом на некоторых моделях.
* Генерация изображений карты не работает должным образом с серией Deebot X1.

## Отказ от ответственности
Я никоим образом не связан с Ecovacs Robotics Co., Ltd. или yeedi Technology Limited.

## Changelog

### 1.4.14 (alpha)
* Bumped ecovacs-deebot.js to 0.9.6 (alpha)

### 1.4.13
* Several improvements and optimizations for X1 series (e.g. for the cleaning station and mopping functions)
* Added Air Freshener life span component
* Some further improvements and optimizations

### 1.4.12
* Bumped ecovacs-deebot.js to 0.9.2 (beta)
* Spot area related functions for models with native "goToPosition" function (from the Video Manager):
  * Implemented "goToCalculatedCenterPosition" function
  * Implemented "silentApproach" cleaning
* Some further improvements and optimizations

### 1.4.11 (latest stable)
* Bumped ecovacs-deebot.js to 0.9.2 (alpha)
* Added channel for the auto empty station (incl. dust bag full)
* Added state for changing the scrubbing pattern (OZMO Pro)
* Added option to save the used go to position values
* Added function to also save the current deebot position as a "goToPosition"
* Automatically set the last time dustbox removed when the dust bag has been emptied by the auto empty station
* Some further improvements and some fixes

### 1.4.10
* Bumped ecovacs-deebot.js to 0.9.1
* Added channel with information about the last cleaned spot area
* Implemented "markForNextSpotAreaCleaning" function

### 1.4.9
* Bumped ecovacs-deebot.js to 0.9.1-beta.3
* Several improvements for T9 based models (e.g. N8/T9/T10/X1)
* Implemented option for automatic download of the last cleaning image
* The generated base64 map image will also be stored to the filesystem now
* Some further improvements and some fixes

### 1.4.8
* Breaking change: Bumped minimum required version of Node.js to 14.x
* Bumped ecovacs-deebot.js to 0.9.0-beta.2
* Bumped several other dependencies

### 1.4.7
* Bumped ecovacs-deebot.js to 0.8.3-beta.2 (Hotfix XMPP devices)

### 1.4.6
* Added option for native "goToPosition" function (e.g. Deebot OZMO T8 AIVI)
* Some improvements and fixes

### 1.4.5
* Added states for time and cleaned area since last dustbox removal
* Added button for manually trigger dustbox removal
* Removed some options from settings
* Some other changes to settings
* Bumped ecovacs-deebot.js to the latest beta version
* Initial Support for yeedi accounts
* and also for a few models
  * yeedi k650
  * yeedi 2 hybrid
  * yeedi vac hybrid
  * yeedi mop station

### 1.4.4
* Bumped ecovacs-deebot.js to 0.8.2
* Bugfix for non 950 type models with mopping system (e.g. OZMO 930)
* Some minor improvements

### 1.4.3
* Bumped ecovacs-deebot.js to the latest beta version
* Improved last time presence functionality
* Added state for Clean Preference (e.g. T8/T9 series)
* Added state for the last 20 errors
* Added state for cleaning schedule (read-only)
* Some further improvements and some fixes

### 1.4.2
* Bumped ecovacs-deebot.js to 0.8.1 (beta)
* Added states for cleaning cloth reminder and auto-boost suction (e.g. OZMO 920/950, T8/T9 series)
* Added states for mopping type and scrubbing type (models with OZMO Pro mopping system)
* Added option to choose between "pause" and "stop" for "PauseBeforeDockingChargingStation..." functionality
* Some further improvements

### 1.4.1
* Bumped ecovacs-deebot.js to 0.8.0
* Improved "lastTimePresence" functionality
* Added option to reset the vacuum power (cleanSpeed) to standard on return
* Added option to keep modified spot area names (pre-selection on non 950 type models)
* Added states for current used custom and spot areas (currentUsedSpotAreas and customUsedCustomAreaValues)
* Handle error code 110 ("NoDustBox: Dust Bin Not installed")
* Bumped some dependencies

### 1.4.0
* Bumped ecovacs-deebot.js to 0.8.0 (beta)
* Implemented last time presence function (still experimental)
* Implemented "cleanCount" (permanent clean count) function (T8/T9/X1 series)
* Implemented "trueDetect" (enable/disable) function (T8/T9/X1 series)
* Added "unitCare" to consumables (T8/T9/X1 series)
* Added Deebot X1 series
* Some improvements and fixes

### 0.0.1 - 1.3.4
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive))

## License

MIT License

Copyright (c) 2023 Sascha Hölzel <mrb1232@posteo.de>

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