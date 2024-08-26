---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: MJqNdJKLA52Jw8Ivs+83/4BbOJL2n/cJjLjidlmlS1I=
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

ПРИМЕЧАНИЯ К ВЫПУСКУ: Версия 0.1.x включает некоторые критические изменения:

- требуется node>=14, js-controller>=4 и admin>=5

Обновите свой ioBroker как минимум до этого уровня программного обеспечения, если вы хотите использовать этот адаптер

- Шифрование PIN-кода и проверка правильности всех параметров в пользовательском интерфейсе конфигурации

Если вы обновите этот адаптер с предыдущей версии вместо новой установки, адаптер не запустится, даже если ваш PIN-код в вашей конфигурации правильный и не был изменен. Чтобы исправить это, просто введите тот же предыдущий PIN-код еще раз в пользовательском интерфейсе конфигурации, сохраните и закройте пользовательский интерфейс конфигурации, чтобы перезапустить адаптер. Это, конечно, необходимо только один раз после первого запуска после обновления.

- Тип "frontier_silicon.X.modes.selectPreset" изменен с "string" на "number"

Если вы обновляете этот адаптер из предыдущей версии вместо новой установки, вы можете найти предупреждения в журнале ioBroker, например: `State value to set for "frontier_silicon.0.modes.selectPreset" has to be type "string" but received type "number"` Чтобы этого не произошло, самое простое решение — остановить адаптер на вкладке экземпляров. ioBroker полностью удалите дерево объектов во вкладке объектов и перезапустите адаптер. Это, конечно, необходимо только один раз после обновления и не требуется, если вы выполняете чистую новую установку.

- Синхронизация состояний питания, громкости и отключения звука с приложением UNDOK.

Синхронизация с приложением UNDOK здесь означает, что параметры питания, громкости и отключения звука, измененные приложением UNDOK, теперь также будут обновляться в состояниях этого адаптера. Из-за ограничений протокола FSAPI синхронизация состояния приложения UNDOK с адаптером по-прежнему ненадежна и не будет мгновенной, а произойдет только тогда, когда, например. пресет или режим меняются с помощью приложения UNDOK.

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

### Известные ошибки и ограничения
- Медиаплеер должен быть включен для обнаружения пресетов
- Из-за ограничений протокола FSAPI параллельная работа с приложением UNDOK ненадежна и поэтому не поддерживается. Используйте на свой страх и риск.

## Документация
Этот адаптер позволяет управлять интернет-радио и медиаплеерами на базе чипсетов Frontier Silicon. Многие устройства, которыми можно управлять через [UNDOK](https://support.undok.net) должен работать. Протестированные устройства получены от [Revo](https://revo.co.uk/de/products/), [Sangean](https://www.sangean.eu/products/all_product.asp), [Hama](https ://de.hama.com/produkte/audio-hifi/digitalradio) и [SilverCrest](https://www.lidl.de), другие тоже должны работать.

После установки IP-адрес и PIN-код устройства необходимо ввести в диалоговом окне конфигурации. Если радио не воспроизводит DAB после включения через приложение UNDOK или этот адаптер, попробуйте еще раз с включенным параметром «DAB начинается без звука».

При первом запуске адаптер собирает информацию об устройстве. Для этого ему нужно переключить все режимы. Во время проверки настроек устройство будет отключено на несколько секунд, чтобы не мешать звукам.

Пока адаптер считывает настройки устройства, создаются объекты и состояния ioBroker. Состояния могут быть только для чтения (`ro`) или для чтения-записи (`rw`) *хорошо, только для записи для кнопок также возможно*.

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

  - соединение (`boolean, ro`)

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
Frontier, Frontier Silicon, SmartRadio, UNDOK и соответствующие логотипы являются товарными знаками или зарегистрированными товарными знаками Frontier Smart Technologies Limited [https://www.frontiersmart.com](https://www.frontiersmart.com)

Все остальные товарные знаки являются собственностью их соответствующих владельцев.

Авторы никоим образом не поддерживаются и не связаны с Frontier Smart Technologies Limited или какими-либо связанными дочерними компаниями, логотипами или товарными знаками.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (pdbjjens) Breaking Change: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) Breaking Change: PIN encryption and validity check of all parameters in config UI
- (pdbjjens) Breaking Change: Type of `frontier_silicon.X.modes.selectPreset` changed from "string" to  "number"
- (pdbjjens) Change: Validity check of all parameters in config UI
- (pdbjjens) Change: Re-establish session if network connection is lost
- (pdbjjens) New: Synchronization of power, volume and mute states with the UNDOK App

### 0.1.0 (2023-07-15)

- (pdbjjens) Breaking Changes: node>=14, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: json config UI
- (pdbjjens) New: Re-establish session if network connection is lost
- (pdbjjens) New: Remove obsolete unit testing
- (pdbjjens) Fix: Prevent crashes if radio device is not reachable

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
