---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fronius-wattpilot/README.md
title: ioBroker.fronius-ваттпилот
hash: unbugf5ftTb/BE8Q4uqsUfz2KGBUs9exwOd/mkoxahs=
---
![Логотип](../../../en/adapterref/iobroker.fronius-wattpilot/admin/fronius-wattpilot.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.fronius-wattpilot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fronius-wattpilot.svg)
![Количество установок](https://iobroker.live/badges/fronius-wattpilot-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/fronius-wattpilot-stable.svg)
![Статус зависимости](https://img.shields.io/david/tim2zg/iobroker.fronius-wattpilot.svg)
![НПМ](https://nodei.co/npm/iobroker.fronius-wattpilot.png?downloads=true)

# IoBroker.fronius-attpilot
**Тесты:** ![Тестирование и выпуск](https://github.com/tim2zg/ioBroker.fronius-wattpilot/workflows/Test%20and%20Release/badge.svg)

Базовая реализация неофициального пилотного проекта Fronius Watt (https://www.fronius.com/de-ch/switzerland/solarenergie/installateure-partner/technische-daten/alle-produkte/l%C3%B6sungen/fronius-wattpilot) API . На основе https://github.com/joscha82/wattpilot.

## Как установить:
**Я не несу ответственности за ваше устройство. С помощью этого API вы можете напрямую получить доступ к устройству, будьте осторожны.**

### **Требования**
- Завершите обычную установку пилотного приложения Fronius Watt. Запомните пароль!
- Перейдите на вкладку Интернет и подключите Pilot к Wi-Fi.
- Узнайте IP-адрес вашего WattPilot.
  - Вариант 1: через веб-интерфейс вашего маршрутизатора.
  - Вариант 2: через приложение Wattpilot: после установки соединения нажмите на имя Wi-Fi.

  Вы увидите страницу с дополнительной информацией о вашем Wi-Fi-соединении. Запишите IP-адрес.

### **Адаптер iobroker.fronis-wattpilot**
- Теперь вы можете регулярно устанавливать экземпляр iobroker.fronius-wattpilot через страницу «Адаптеры».
- После создания экземпляра вам будет предложено ввести IP-адрес и пароль вашего WattPilot. Заполните значения, которые вы заметили ранее, и сохраните конфигурацию. Если вы все сделали правильно, адаптер через некоторое время станет зеленым, и вы сможете увидеть входящие данные во вкладке объектов.

**Настоятельно рекомендуется назначить статический IP-адрес вашему WattPilot.**

## Как мне использовать адаптер...
Вы можете использовать точки данных этого адаптера, как и любые другие точки данных вашего брокера.
Чтобы получить некоторые идеи, см. «Примеры».

Существует [Блочный пример](https://github.com/tim2zg/ioBroker.fronius-wattpilot/blob/main/examples/example-Blockly.xml), как вы можете измерить выходную мощность солнечной сети и автоматически настроить пилот на правильное значение тока (Ампер), чтобы улучшить внутреннее потребление энергии.
Вы можете просто импортировать его, скопировав содержимое примера и вставив его с помощью значка «Импортировать блоки» в правом верхнем углу вашего Blockly-скрипта.

## Что делает адаптер?
Адаптер подключается к WattPilots WebSocket и разделяет входящие данные на точки данных ioBroker, которыми вы можете пользоваться вполне комфортно.

## Получить состояния
По умолчанию адаптер записывает только ключевые точки Wattpilot. Если вам нужны все возможные значения, которые может предоставить API, снимите флажок в настройках экземпляра.
Документация по точкам данных доступна здесь: https://github.com/joscha82/attpilot/blob/main/API.md (спасибо joscha82).

## Установить состояния?
Наиболее важные состояния, которые вы можете установить напрямую, это AccessState, amp, CableLock, cae и mode.

**AccessState**: «Открыть» или «Подождать».

**амп**: 6–16

**cableLock**: «Нормальный», «Авторазблокировка» или «AlwaysLock».

**cae**: «истина» или «ложь» (следите, это отключает облачные функции вашего WattPilot, возможно, потребуется перезагрузить)

Да, просто напишите имя состояния, затем точку с запятой, а затем значение в состоянии set_state.
Например:

    усилитель;6

**Вы можете управлять состояниями «amp» и «lmo» напрямую через состояния set_power и set_mode.**

## Что означает этот беспорядок?
Благодаря joscha82 мы знаем: https://github.com/joscha82/attpilot/blob/main/API.md

## Разработчики
- [Себастьян Ханц](https://github.com/SebastianHanz)
- [tim2zg](https://github.com/tim2zg)
- [derHaubi](https://github.com/derHaubi)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.6.3 (2023-12-24)
- Fixed a bug where the adapter would use a undefined variable
- Fixed bug #44
- Fixed bug #43

### 4.6.2 (2023-08-15)
- Thanks to Norb1204 for fixing a few bugs that I missed. More in Issue #40

### 4.6.1 (2023-08-15)
- Fixed Issue #39 (set_state not working)

### 4.6.0 (2023-07-15)
- Fixed timeout issue in normal parser mode (#36), still exist in dynamic parser mode --> use no timeout (0)
- Fixed a number of issues concerning the static parser mode
- Quality of life improvements --> you can now set the common states directly! (set_power, set_mode) are still available for compatibility reasons and for the dynamic parser mode

### 4.5.1 (2023-03-02)
- Fixed issue #29 (custom states not working)

### 4.5.0 (2023-02-19)
- Fixed random log messages
- Fixed a type conflict at the set_state state
- Commits from now on should be signed

### 4.4.0 (2023-02-16)
- known states will now be updated even if the dynamic parser is enabled

### 4.3.0 (2023-01-14)
- dependency updates
- state updates

### 4.2.1 (2023-01-05)
- Fixed bug in the all values mode / parser

### 4.2.0 (2023-01-01)
- Some QoL improvements

### 4.1.0 (2022-12-30)
- Added the possibility to add states manually via the instance-settings
- Fixed the bug where the adapter didn't set the correct value types
- Added some quality of life improvements

### 4.0.0 (2022-11-30)
- Fixed timing issue 
- Added set_power and set_mode states

### 3.3.1 (2022-11-17)
- Fixed a bug where set_state was not writable

### 3.3.0 (2022-11-17)
- Fixed a bug where the adapter would not set the correct labels for the states
- Performance improvements
- Fixed dependencies

### 3.2.5 (2022-10-14)
- Small changes to the package.json and io-package.json

### 3.2.4 (2022-10-11) 
- Fiexed cool down timer for normal values

### 3.2.3 (2022-10-08)
- Bug fixed where the adapter would not respect the timout timer and would try to constantly reconnect to the WattPilot
- Bug fixed where the adapter would send a wrong disconnect message to the WattPilot

### 3.2.2 (2022-10-06)
- Fixed reconnecting frequency
- Fixed multiple Websocket connections
- Added frequency handler

### 3.2.1 (2022-10-02)
- Fixed reconnecting to the WebSocket
- Restructured the code

### 3.2.0 (2022-09-29)
- Implemented reconnecting
- Shrank code down

### 3.1.0 (2022-09-07)
- Added the option to use the cloud as a datasource
- Updated GitHub workflows

### 3.0.0 (2022-09-04)
- Updated README.md
- Created "examples"-directory for sample applications
- Added some translations
- Renamed checkbox "Parser" to something more intuitive
- Fixxed #4: Datapoint "map" now gets created correctly
- Fixxed #5: Password-characters are no longer visible
- Fixxed type conflict of cableType

### 2.2.4 (2022-09-01)
- SebastianHanz fixed infinite RAM-usage
- added some description

### 2.2.3 (2022-08-30)
- SebastianHanz fixed type-conflicts. Thank you!

### 2.2.2 (2022-08-25)
- Bug fixes

### 2.2.1 (2022-08-22)
- Bug fixes

### 2.2.0 (2022-08-21)
- Fixed Bugs

### 2.1.0 (2022-08-19)
- Min Node Version 16

### 2.0.3 (2022-07-20)
- Updated Readme

### 2.0.2 (2022-07-12)
-   Bug fixed

### 2.0.1 (2022-07-10)
-   Added a how to install. Not to detail because currently not in stable repo.

### 2.0.0 (2022-07-10)
-   Fixed NPM Versions hopefully

### 1.1.0 (2022-07-10)
-   Added UselessPV and TimeStamp Parser, did some testing.

### 1.0.1 (2022-06-02)
- Tests

### 1.0.0 (2022-06-02)

- Did some changes
- Did some more changes

### 0.0.5 (2020-01-01)
- Better Code

### 0.0.4 (2020-01-01)
- Parser option added

### 0.0.3 (2020-01-01)
- Parser added

### 0.0.2 (2020-01-01)
- Bug fixed

### 0.0.1 (2020-01-01)
- Initial release

## License
MIT License

Copyright (c) 2024 tim2zg <tim2zg@protonmail.com>

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