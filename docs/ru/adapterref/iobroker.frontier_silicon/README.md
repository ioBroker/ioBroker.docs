---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: NcLY7C7E+81OQd7XM6P1bLyzXy9bA0pAuWeNFAogifY=
---
# IoBroker.frontier_silicon
![Логотип](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![Количество установок (последние)](http://iobroker.live/badges/frontier_silicon-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/frontier_silicon-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)

## Адаптер ioBroker для Frontier SmartRadio
**Тесты:** ![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg)

## Информация
Обеспечивает поддержку медиаплееров, интернет-радио и SmartRadio, оснащенных набором микросхем Frontier Silicon с использованием FSAPI.

ПРИМЕЧАНИЕ. Этот адаптер был передан iobroker-community-adapters для обслуживания. Таким образом, запланированные функции (см. ниже) реализованы не будут. В будущем будут выпущены только важные исправления ошибок и обновления зависимостей. Однако всегда приветствуются PR с исправлениями ошибок или улучшениями функций.

## Функции
### Реализованные функции
- Контроль мощности
- Выбор режима
- Выбор предустановки
- Уведомления для нескольких состояний
- Контроль громкости
- Уведомления

### Запланированные функции
- Автоматическое обнаружение
- Больше штатов
- Переводы
- Больше обработки исключений
- Более чистый код
- Многокомнатные функции

### Не запланированные функции
- Изменение системной информации

### Известные ошибки
- Медиаплеер должен быть включен для предустановленного обнаружения
- Нет уведомлений через некоторое время

## Документация
Этот адаптер позволяет управлять интернет-радио и медиаплеерами на базе чипсетов Frontier Silicon. Многие устройства, которыми можно управлять через [Undok](https://www.frontiersmart.com/undok) должен работать. Протестированные устройства получены от [Revo](https://revo.co.uk/de/products/), [Sangean](https://www.sangean.eu/products/all_product.asp) и [SilverCrest](https://www.silvercrest-multiroom.de/produkte/produktuebersicht/), другие тоже должны работать.

После установки IP-адрес и PIN-код устройства необходимо ввести в диалоговом окне конфигурации. Если магнитола не воспроизводит DAB после включения через Undok или этот адаптер, попробуйте включить "DAB запускается без звука".

При первом запуске адаптер собирает информацию об устройстве. Для этого ему нужно переключить все режимы. Во время проверки настроек устройство будет отключено на несколько секунд, чтобы не мешать звукам.

Пока адаптер считывает объекты настройки устройства и создаются состояния. Состояния могут быть только для чтения (`ro`) или для чтения-записи (`rw`) *хорошо, только для записи для кнопок также возможно*.

- аудио

  Основные настройки звука. Элементы управления эквалайзером еще не реализованы.

  - maxVolume(`число, ро`)

    Максимальный выбираемый объем

  - mute (`boolean, rw`)

    `true`, если звук на устройстве отключен, `false`в противном случае

  - объем (`число, rw`)
  - контроль
    - громкость вниз и громкость вверх

    In-/ или уменьшает громкость на 1

- устройство

  - friendlyName(`текст, rw`)
  - мощность (`boolean, rw`)
  - radioId(`test, ro`)

    Я предполагаю, что это MAC устройства

  - версия (`текст, ро`)

    Версия ПО

  - webfsapi(`текст,ро`)

    Адрес API

- Информация

  - связь (`boolean, ro`)

    Индикатор подключения к адаптеру

- СМИ

  - состояние (`число, rw`)

    действительные значения:

    - 0: Пауза
    - 1: Играть

  - контроль

    - следующий
    - аплодисменты
    - играть
    - предыдущий

  Не относитесь к следующим именам слишком серьезно. Радио использует их по-разному в разных режимах.

  - альбом (`текст,ро`)
  - художник (`текст, ро`)
  - графический (`текст, ро`)

    Используйте этот URL, чтобы получить обложку альбома или логотип радиостанции.

  - имя (`текст, ро`)
  - текст (`текст,ро`)
  - заголовок (`текст, ро`)

- режимы

  - читать пресеты

    Перечитывает все пресеты

  - selectPreset(`число,rw`)

    Используется для получения или выбора пресета. Имейте в виду, что адаптер угадывает, поскольку это значение не может быть прочитано из API.

  - выбрано (`число, rw`)

    Указывает или выбирает выбранный режим. Также можно выбрать через `modes.{number}.switchTo`

  - `{номер}`

    - id(`текст,ро`)

      Название этого режима

    - ключ (`число, ро`)

      Индекс этого режима. Равен `mode.{number}` из дерева объектов и может быть записан в `modes.selected`.

    - выбираемый (`boolean, ro`)

      `true`, если этот режим можно выбрать вручную.

    - потоковый (`boolean, ro`)

      Присутствует только на устройствах с поддержкой нескольких комнат. `true`, если этот режим можно использовать в качестве источника для нескольких многокомнатных устройств.

    - переключить на

      Выбирает этот режим.

    - пресеты

      - доступный (`boolean, ro`)

        Указывает, доступны ли пресеты для этого режима.

      - `{номер}`

        Индекс этого пресета. Равно `mode.*.presets.{number}.key`.

        - ключ

          Индекс этого пресета. Равен `mode.*.presets.{number}` из дерева объектов и может быть записан в `modes.selectPreset`.

        - имя (`текст, ро`)

          Имя этого пресета

        - переключить на

          Выбирает эту предустановку и соответствующий режим.

Имейте в виду, что иногда вы можете выбирать между «нажатием кнопки» или «установкой значения». Используйте то, что вам удобнее.

## Официальные уведомления
Frontier, Frontier Silicon, SmartRadio и соответствующие логотипы являются товарными знаками или зарегистрированными товарными знаками Frontier Smart Technologies Limited [https://www.frontiersmart.com](https://www.frontiersmart.com)

Все остальные товарные знаки являются собственностью их соответствующих владельцев.

Авторы никоим образом не поддерживаются и не связаны с Frontier Smart Technologies Limited или какими-либо связанными дочерними компаниями, логотипами или товарными знаками.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (pdbjjens) Breaking Changes: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: json config UI

### 0.0.11 (2023-03-30) 2023 maintenance release

- (pdbjjens) New: Transfer of adapter to community
- (pdbjjens) New: Updated dependencies
- (pdbjjens) New: Use adapter-dev instead of gulp translate
- (pdbjjens) Fix: Prevent js-controller >=3.2.x warnings regarding non-existent objects and typeErrors

### 0.0.10 (2020-11-29)

- Translations

### 0.0.9

- (halloamt) Selected preset can be read now. The adapter guesses a little but this seems to work.

- (halloamt) Nicer readme
- (halloamt) (Hopefully) more robust session handling.
- (halloamt) Long polling should work more reliably
- (halloamt) Sleep timers are cleared on `onUnload`

### 0.0.7 und 0.0.8

- (halloamt) Formal but neccessary stuff for ioBroker

### 0.0.6

- (halloamt) Nothing really, small stuff for npm

### 0.0.5

- (halloamt) Media state controls

- (halloamt) Bugfixes

### 0.0.4

- (halloamt) Media and volume control buttons

- (halloamt) Bugfixes

### 0.0.3

- (halloamt) Get notifications from the radio

- (halloamt) Change volume / mute

### 0.0.1

- (halloamt) initial release
- (halloamt) Change mode
- (halloamt) Select Preset

## License

MIT License

Copyright (c) 2023 halloamt <iobroker@halloserv.de>

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