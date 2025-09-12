---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fronius-wattpilot/README.md
title: ioBroker.fronius-wattpilot
hash: nRtUxJxL8jc8iMLKpLwL7mkVOqPO8R1jUqixfK8Nu3o=
---
![Логотип](../../../en/adapterref/iobroker.fronius-wattpilot/admin/fronius-wattpilot.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.fronius-wattpilot.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fronius-wattpilot.svg)
![Количество установок](https://iobroker.live/badges/fronius-wattpilot-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/fronius-wattpilot-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.fronius-wattpilot.png?downloads=true)

# IoBroker.fronius-wattpilot
**Тесты:** ![Тестирование и выпуск](https://github.com/tim2zg/ioBroker.fronius-wattpilot/workflows/Test%20and%20Release/badge.svg)

[Немецкая версия документации](README_DE.md)

## Что это за адаптер?
Этот адаптер интегрирует зарядное устройство Fronius Wattpilot EV с ioBroker, позволяя контролировать и управлять зарядной станцией. Wattpilot — это интеллектуальное решение для зарядки электромобилей, которое можно интегрировать в систему умного дома.

**🌟 Основные характеристики:**

- Мониторинг состояния зарядки в режиме реального времени
- Дистанционное управление параметрами зарядки
- Поддержка облачных и локальных подключений

## Установка и настройка
### Предпосылки
Перед установкой адаптера необходимо настроить Wattpilot:

1. **Полная настройка Wattpilot**: завершите первоначальную настройку с помощью официального приложения Fronius Wattpilot и **запомните свой пароль**
2. **Подключитесь к Wi-Fi**: в приложении перейдите на вкладку «Интернет» и подключите Wattpilot к сети Wi-Fi.
3. **Найдите IP-адрес**: Вам понадобится IP-адрес вашего Wattpilot, который можно узнать одним из следующих способов:
- **Метод маршрутизатора**: проверьте веб-интерфейс маршрутизатора на наличие подключенных устройств.
- **Способ через приложение**: В приложении Wattpilot нажмите на имя сети Wi-Fi после подключения. Вы увидите информацию о сети, включая IP-адрес.

> 💡 **Важно**: Настоятельно рекомендуется назначить вашему Wattpilot статический IP-адрес в настройках маршрутизатора, чтобы избежать проблем с подключением.

### Установка адаптера
1. Установите адаптер со страницы «Адаптеры» ioBroker.
2. Создайте новый экземпляр адаптера Fronius-Wattpilot.
3. В конфигурации экземпляра:
- Введите **IP-адрес** вашего Wattpilot
- Введите ваш **пароль** Wattpilot
- При необходимости настройте другие параметры.
4. Сохраните конфигурацию.

Если все настроено правильно, адаптер подключится и начнет создавать точки данных.

## Как использовать адаптер
### Чтение данных
Адаптер автоматически создаёт точки данных для всех значений Wattpilot. Вы можете использовать их, как и любые другие точки данных в ioBroker, для:

- Визуализация в VIS или других интерфейсах
- Логика в скриптах и Blockly
- Правила автоматизации

**Режимы данных:**

- **Только ключевые точки** (по умолчанию): показывает только самые важные значения.
- **Все значения**: снимите флажок «Только ключевые точки», чтобы увидеть все доступные данные API.

📖 Полная документация API: [Документация API Wattpilot](https://github.com/joscha82/wattpilot/blob/main/API.md) (Спасибо joscha82)

### Управление вашим Wattpilot
#### Прямой государственный контроль (НОВИНКА!)
Теперь вы можете напрямую управлять важными функциями Wattpilot, записывая состояния.

#### Расширенное управление через set_state
Для более расширенного управления используйте точку данных `set_state` в следующем формате:

```
stateName;value
```

**Доступные штаты:**

- **amp**: `6-16` (ток зарядки в амперах)
- **cae**: `true` или `false` (⚠️ отключает функциональность облака — может потребоваться перезапуск)

**Примеры:**

```
amp;10          // Set charging current to 10A
```

## Примеры и варианты использования
### Пример интеграции солнечной энергии
Ознакомьтесь с нашим [Блочный пример](https://github.com/tim2zg/ioBroker.fronius-wattpilot/blob/main/examples/example-Blockly.xml), в котором показано, как:

- Контролируйте производство солнечной энергии
- Автоматическая регулировка тока зарядки Wattpilot в зависимости от избыточной солнечной энергии

**Как использовать пример:**

1. Скопируйте содержимое из файла-примера.
2. В ioBroker Blockly нажмите значок «Импорт блоков» (в правом верхнем углу).
3. Вставьте содержимое и адаптируйте его к своим настройкам.

### Распространенные средства автоматизации
- **Повременная тарификация**: начните заряжать в часы пониженной нагрузки
- **Зарядка за счет излишков солнечной энергии**: зарядка только при наличии излишков солнечной энергии.
- **Обнаружение присутствия**: запуск/остановка зарядки в зависимости от присутствия автомобиля
- **Балансировка нагрузки**: регулировка зарядного тока в зависимости от энергопотребления домохозяйства.

## Технические детали
Адаптер подключается к интерфейсу WebSocket Wattpilot и преобразует входящие данные в точки данных ioBroker. Он поддерживает как локальные Wi-Fi-подключения, так и облачные соединения.

**Типы подключения:**

- **Локальный Wi-Fi** (рекомендуется): прямое подключение к вашему Wattpilot
- **Облако**: подключение через облачные сервисы Fronius

## Поиск неисправностей
**Распространённые проблемы:**

- **Ошибка подключения**: проверьте IP-адрес и пароль.
- **Частые отключения**: назначьте статический IP-адрес вашему Wattpilot.
- **Отсутствуют точки данных**: попробуйте включить режим «Все значения».
- **Проблемы с подключением к облаку**: проверьте настройку `cae`

**⚠️ Отказ от ответственности:** Этот адаптер использует неофициальные API. Используйте его на свой страх и риск и будьте осторожны при изменении настроек, которые могут повлиять на работу вашего устройства.

## Разработчики
- [СебастьянХанц](https://github.com/SebastianHanz)
- [tim2zg](https://github.com/tim2zg)
- [derHaubi](https://github.com/derHaubi)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 4.7.0 (2025-06-19)
- Rewrite of the adapter
- Added ability to set states directly
- Added ability to set common states directly
- Fix all issues

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

Copyright (c) 2025 tim2zg <tim2zg@protonmail.com>

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