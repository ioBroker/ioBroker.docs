---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.frontier_silicon/README.md
title: ioBroker.frontier_silicon
hash: //8ThqIr9fqgCdlblkLGMCNzRjOBddKpx6bqeSIPc9k=
---
# IoBroker.frontier_silicon
![Логотип](../../../en/adapterref/iobroker.frontier_silicon/admin/radio.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.frontier_silicon.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.frontier_silicon.svg)
![Количество установок (последнее)](http://iobroker.live/badges/frontier_silicon-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/frontier_silicon-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.frontier_silicon.png?downloads=true)

## Адаптер ioBroker для Frontier SmartRadio
**Тесты:** ![Тест и выпуск](https://github.com/iobroker-community-adapters/ioBroker.frontier_silicon/workflows/Test%20and%20Release/badge.svg)

## Информация
Обеспечивает поддержку медиаплееров, интернет-радио и SmartRadio, оснащенных чипсетом Frontier Silicon, с использованием FSAPI.

ПРИМЕЧАНИЕ: Этот адаптер был передан в iobroker-community-adapters для обслуживания. Таким образом, запланированные функции (см. ниже) не будут реализованы. В будущем будут выпущены только важные исправления ошибок и обновления зависимостей. Однако PR с исправлениями ошибок или улучшениями функций всегда приветствуются.

ЗАМЕТКИ О ВЫПУСКЕ: Версия 0.3.x включает в себя некоторые критические изменения:

- требуется node>=18, js-contoller>=5 и admin>=6

Обновите свой ioBroker как минимум до этого уровня программного обеспечения, если вы хотите использовать этот адаптер

- Шифрование PIN-кода и проверка корректности всех параметров в пользовательском интерфейсе конфигурации

Если вы обновите этот адаптер с предыдущей версии вместо новой установки, адаптер не запустится, даже если ваш PIN-код в вашей конфигурации правильный и не был изменен. Чтобы исправить это, просто введите тот же предыдущий PIN-код еще раз в пользовательском интерфейсе конфигурации, сохраните и закройте пользовательский интерфейс конфигурации, чтобы перезапустить адаптер. Конечно, это необходимо только один раз после первого запуска после обновления.

- Тип «frontier_silicon.X.modes.selectPreset» изменен с «string» на «number»

Если вы обновите этот адаптер с предыдущей версии вместо новой установки, вы можете обнаружить предупреждения в журнале ioBroker, например: `State value to set for "frontier_silicon.0.modes.selectPreset" has to be type "string" but received type "number"` Чтобы этого не произошло, самое простое решение — остановить адаптер на вкладке экземпляров ioBroker, полностью удалить дерево объектов на вкладке объектов и затем перезапустить адаптер. Конечно, это необходимо только один раз после обновления и не требуется, если вы делаете чистую новую установку.

- Синхронизация состояний питания, громкости и отключения звука с приложением UNDOK

Синхронизация с приложением UNDOK здесь означает, что настройки питания, громкости и отключения звука, измененные приложением UNDOK, теперь также будут обновлены в состояниях этого адаптера. Из-за ограничений протокола FSAPI синхронизация состояний приложения UNDOK с адаптером по-прежнему ненадежна и не будет мгновенной, а произойдет только тогда, когда, например, предустановка или режим будут изменены с помощью приложения UNDOK.

- Циклический повтор подключения вместо отключения адаптера

Раньше адаптер отключался после 10 попыток подключения к сеансу, когда устройство было недоступно из-за длительных сетевых проблем, таких как перезагрузки маршрутизатора, отключение LAN или WiFi. Теперь адаптер будет повторять попытки после каждого интервала обновления сеанса, пока устройство снова не станет доступно. Если вы хотите избежать записей в журнале относительно этих повторных попыток, вам придется остановить адаптер вручную. Если проблема с сетью устранена, пока период повторных попыток все еще продолжается, просто перезапустите адаптер.

## Функции
### Реализованные функции
- Управление мощностью
- Выбор режима
- Выбор предустановки
- Уведомления для нескольких штатов
- Регулировка громкости
- Уведомления

### Планируемые функции
- Автоматическое обнаружение
- Больше штатов
- Переводы
- Дополнительная обработка исключений
- Более чистый код
- Многокомнатные функции

### Не запланированные функции
- Изменение системной информации

### Известные ошибки и ограничения
- Для обнаружения предустановок необходимо включить медиаплеер.
- Из-за ограничений протокола FSAPI параллельная работа с приложением UNDOK ненадежна и поэтому не поддерживается. Используйте на свой страх и риск.

## Документация
Этот адаптер позволяет управлять интернет-радио и медиаплеерами на базе чипсетов Frontier Silicon. Многие устройства, которыми можно управлять через [UNDOK](https://support.undok.net) должно работать. Протестированные устройства от [Revo](https://revo.co.uk/de/products/), [Sangean](https://www.sangean.eu/products/all_product.asp), [Hama](https://de.hama.com/produkte/audio-hifi/digitalradio) и [SilverCrest](https://www.lidl.de), другие тоже должны работать.

После установки IP и PIN-код устройства должны быть введены в диалоговом окне конфигурации. Если радио не воспроизводит DAB после включения через приложение UNDOK или этот адаптер, попробуйте еще раз с включенным "DAB запускается без звука".

При первом запуске адаптер собирает информацию об устройстве. Для этого ему нужно переключиться во все режимы. Во время проверки настроек устройство будет отключено на несколько секунд, чтобы избежать мешающих звуков.

Пока адаптер считывает настройки устройства, создаются объекты ioBroker и состояния. Состояния могут быть только для чтения (`ro`) или для чтения и записи (`rw`) *хорошо, только для записи для кнопок тоже возможно*.

- аудио

Базовые настройки звука. Управление эквалайзером пока не реализовано.

- maxVolume (`число, ro`)

Максимальный выбираемый уровень громкости

- отключить звук (`boolean, rw`)

`true` если устройство отключено, `false`в противном случае

- объем (`число, rw`)
  - контроль
- уменьшение громкости и увеличение громкости

В-/ или уменьшает громкость на 1

- устройство

- friendlyName (`текст, rw`)
- мощность (`boolean, rw`)
- radioId (`test, ro`)

Я предполагаю, что это MAC-адрес устройства.

- версия (`текст, ro`)

Версия ПО

- webfsapi (`текст, ro`)

Адрес API

- информация

- соединение (`boolean, ro`)

Индикатор подключения адаптера

- СМИ

- состояние (`число, rw`)

Допустимые значения:

- 0: Пауза
- 1: Играть

  - контроль

    - следующий
- плаус
    - играть
    - предыдущий

Не воспринимайте следующие названия слишком серьезно. Радио использует их по-разному в разных режимах.

- альбом (`текст, ro`)
- художник (`текст, ro`)
- графика (`текст, ro`)

Используйте этот URL, чтобы получить обложку альбома или логотип радиостанции.

- имя (`текст, ro`)
- текст (`текст, ro`)
- заголовок (`текст, ro`)

- режимы

- readPresets

Перечитывает все пресеты

- selectPreset (`number, rw`)

Используется для получения или выбора предустановки. Имейте в виду, что адаптер угадывает, так как это значение не может быть прочитано из API.

- выбрано (`number, rw`)

Указывает или выбирает выбранный режим. Также может быть выбран через `modes.{number}.switchTo`

- `{номер}`

- идентификатор (`текст, ro`)

Название этого режима

- ключ (`число, ro`)

Индекс этого режима. Равен `mode.{number}` из дерева объектов и может быть записан в `modes.selected`.

- выбираемый (`boolean, ro`)

`true` если этот режим можно выбрать вручную.

- потоковый (`boolean, ro`)

Присутствует только на устройствах с поддержкой многокомнатных устройств. `true`, если этот режим можно использовать в качестве источника для нескольких многокомнатных устройств.

- переключиться на

Выбирает этот режим.

- пресеты

- доступно (`boolean, ro`)

Указывает, доступны ли предустановки для этого режима

- `{номер}`

Индекс этого пресета. Равен `mode.*.presets.{number}.key`.

        - ключ

Индекс этого пресета. Равен `mode.*.presets.{number}` из дерева объектов и может быть записан в `modes.selectPreset`.

- имя (`текст, ro`)

Имя этого пресета

- переключиться на

Выбирает эту предустановку и соответствующий режим.

Пожалуйста, имейте в виду, что иногда вы можете выбирать между «нажатием кнопки» и «установкой значения». Используйте то, что вам удобнее.

## Юридические уведомления
Frontier, Frontier Silicon, SmartRadio, UNDOK и связанные с ними логотипы являются товарными знаками или зарегистрированными товарными знаками Frontier Smart Technologies Limited [https://www.frontiersmart.com](https://www.frontiersmart.com)

Все остальные товарные знаки являются собственностью их владельцев.

Авторы никоим образом не поддерживаются и не связаны с Frontier Smart Technologies Limited или какими-либо связанными с ней дочерними компаниями, логотипами или товарными знаками.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.0 (2024-08-27) - 2024H2 maintenance release

- (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
- (pdbjjens) Change: Removed .npmignore
- (pdbjjens) Change: Cyclic connection retry instead of disabling the adapter (#191)
- (pdbjjens) New: Updated dependencies
- (pdbjjens) Fix: Replace deprecated method "deleteChannel" by "delObject" (#224)

### 0.2.0 (2024-01-28)

- (pdbjjens) Change: Increase minor version number

### 0.1.2 (2024-01-26) - 2024 maintenance release

- (pdbjjens) Change: node>=16, js-contoller>=4 and admin>=5 required
- (pdbjjens) New: Optionally display PIN code and limit to 4 digits in config GUI
- (pdbjjens) Updated dependencies

### 0.1.1 (2023-07-26)

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

## License

MIT License

Copyright (c) 2024 halloamt <iobroker@halloserv.de>

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