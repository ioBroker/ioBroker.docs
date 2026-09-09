---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.jablotron/README.md
title: ioBroker.jablotron
hash: CMEXxYFY39TNcpk5hAf2rg27S6rLlofTltTIvwOPegs=
---
![Логотип](../../../en/adapterref/iobroker.jablotron/admin/jablotron.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.jablotron.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.jablotron.svg)
![Количество установок](https://iobroker.live/badges/jablotron-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/jablotron-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.jablotron.png?downloads=true)
![Тестирование и выпуск](https://github.com/DEV2DEV-DE/ioBroker.jablotron/workflows/Test%20and%20Release/badge.svg)

# ioBroker.jablotron

## Адаптер Jablotron для ioBroker

Подключается к облаку Jablotron для доступа к вашей системе безопасности.

В настоящий момент адаптер доступен **только для чтения** !

Сейчас можно только читать информацию о состояниях. Переключение будет реализовано позже!

Адаптер подключается только к облаку производителя. В настоящее время подключение к центральному блоку только по локальной сети невозможно, поскольку производитель закрывает локальный API.

### Форум

Обсудите свой опыт тестирования здесь: <https://forum.iobroker.net/topic/70798>

## Известные проблемы

- Насколько известно на данный момент, датчики, переключатели и другие устройства должны быть сконфигурированы как «программируемый затвор», чтобы их можно было считывать.
- В списке устройств, которые можно было бы обозначить как 'thermoDevice', есть несколько вариантов, но список к настоящему моменту пуст, поэтому тестирование еще не проводилось.

Сообщайте о любых ошибках, проблемах или запросах через GitHub-Issue: <https://github.com/DEV2DEV-DE/ioBroker.jablotron/issues>

## Производитель

<https://www.jablotron.com/de/katalog-produktu/alarme/jablotron-100/>

## Важное уведомление

### Версия 0.0.5

Изменен способ хранения конфиденциальных данных в конфигурации экземпляра. Вам необходимо повторно ввести пароль в настройках экземпляра, если вы уже использовали более старую версию < 0.0.5.

## Ссылки

- <https://github.com/ioBroker/AdapterRequests/issues/755>
- <https://github.com/hajekmi/myjablotron>
- <https://github.com/fdegier/homebridge-jablotron-alarm>
- <https://github.com/plaksnor/HASS-JablotronSystem>
- <https://github.com/kukulich/home-assistant-jablotron100>

## Changelog
### 0.1.8 (2026-01-20)
* New release including dependabot fixes

### 0.1.7 (2026-01-06)
* Fixed check & bot errors
* Dependencies updated
* Removed deprecated async functions

### 0.1.6 (2025-03-10)
* Dependencies updated

### 0.1.5 (2024-12-04)
* Update to ESlint 9

### 0.1.4 (2024-11-06)
* Updated dependencies

### 0.1.3 (2024-01-31)
* Catch EAI_AGAIN
* Automatic refresh of session-id
* Changed headers to prevent caching
* Catch other HTTP errors

### 0.1.0 (2023-12-10)
* Fixed issue with restarts due to timeouts

### 0.0.7 (2023-12-08)
* Fixed wrong structure in readme

### 0.0.5 (2023-12-06)
* Fixed typo
* Encrypt sensitive data in instance config
* Add min and max for poll interval
* Removed unused code
* Do not create static states in code

### 0.0.4 (2023-12-03)
* Fixed wrong state type for data type 'object'

### 0.0.3 (2023-12-03)
* Implemented improvements mentioned in review

### 0.0.2 (2023-11-30)
* Provide an appropriate role for any state
* Readme extended
* Output 'thermoDevices' in debug log

## License
MIT License

Copyright (c) 2025-2026 DEV2DEV-DE

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