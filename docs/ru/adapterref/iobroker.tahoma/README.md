---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: f3IyGRGAXDoHRJcAWd+pn4bYu3GiViFdyaMf/f0C9vw=
---
![Логотип](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![НПМ](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![версия НПМ](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Количество установок (последнее)](http://iobroker.live/badges/tahoma-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/tahoma-stable.svg)

![Статус релиза Github](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

# IoBroker.tahoma
Адаптер ioBroker для Somfy Tahoma. Этот проект не имеет никакого отношения к Somfy. Изначально основан на скрипте, взятом с https://forum.iobroker.net/post/336001 и форкнутом с https://github.com/StrathCole/ioBroker.tahoma.

Адаптер подключается к API конечного пользователя Tahomalink и управляет устройствами. настраивается через Tahoma Box (и, скорее всего, Connexoon). Адаптер пока не имеет полного набора функций, но он должен поддерживать большинство действий по управлению жалюзи и рольставнями и т. д.

Пожалуйста, сначала прочтите [Часто задаваемые вопросы](https://github.com/Excodibur/ioBroker.tahoma/blob/master/FAQ.md) в случае возникновения проблем.

## Текущие протестированные устройства
В целом, этот адаптер должен поддерживать все устройства, к которым можно получить доступ через __tahomalink.com__, но разработчику адаптера трудно это гарантировать. В основном потому, что документация используемого Somfy-API (по крайней мере, публично) отсутствует, и разработчик может тестировать только те Somfy-устройства, которыми он владеет сам или может тестировать при поддержке заинтересованных участников.

Устройства, которые можно контролировать через tahomalink.com, обычно также поддерживаются этим адаптером. Сюда входят:

| Устройство | Поддержка онлайн-API | Поддержка локального API |
|-|-|-|
| Ящик Tahoma | ✓ | ✓ |
| Connexoon | ✓ | ✓ ([доказательство](https://github.com/Excodibur/ioBroker.tahoma/issues/241)) |
| Tahoma Switch | ✓ | ✓ |
| Комплект для подключения | ✓ ([доказательство](https://github.com/Excodibur/ioBroker.tahoma/issues/171)) | ✗ ([доказательство](https://service.somfy.com/downloads/fr_v5/fichecomparative_tahoma_switch_vs_kit_connectivite_a4_1221.pdf)) |

Следующие устройства Somfy проверены на совместимость с этим адаптером:

- S&SO RS100 io
- Оксимо ио
- Датчик солнца Sunis io
- Датчик температуры io
- Датчик дыма io
- Адаптер Plug io

## Конфигурация
Адаптер поддерживает следующие параметры конфигурации.

| Параметр | Значение (по умолчанию) | Описание |
| Имя пользователя | _`<your Tahomalink user>`_ | Требуется для аутентификации вашей учетной записи Tahoma. |
| Пароль | _`<Your Tahomalink password>`_ | Требуется для аутентификации вашей учетной записи Tahoma. |
| Интервал опроса | `20000` | Время (в миллисекундах), по истечении которого адаптер попытается получить новые данные из Tahomalink. |
| PIN-код Tahoma box | формат, аналогичный `1234-5678-9012` | __ <sup>Только для LocalAPI</sup> __ Уникальный PIN-код вашего Tahoma box, предоставленный Somfy. Дополнительная информация о том, как активировать/использовать его [здесь](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) |
| PIN-код Tahoma-Box | формат, аналогичный `1234-5678-9012` | __ <sup>Только для LocalAPI</sup> __ Уникальный PIN-код вашего Tahoma-Box, предоставленный Somfy. Дополнительная информация о том, как активировать/использовать его, доступна [здесь](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) | | Использовать MDNS | `false` | __ <sup>Только для LocalAPI</sup> __ Если установлено значение true, будет пытаться использовать mDNS для разрешения локального имени хоста вашего Tahoma-Box. Может поддерживаться не всеми маршрутизаторами, поэтому по умолчанию отключено. |
| Попытки входа <sup>1</sup> <sup>2</sup> | `3` | Количество попыток повторного входа после неудачной попытки входа. |
| Задержка между попытками входа в систему <sup>1</sup> <sup>2</sup> | `30` | Время (в секундах) ожидания между попытками входа в систему. |
| Задержка после неудачной попытки входа <sup>1</sup> <sup>2</sup> | `120` | Время (в секундах) ожидания после того, как все последовательные попытки входа оказались неудачными. |
| Задержка перед повторной попыткой applyqueue <sup>1</sup> <sup>2</sup> | `1500` | Время ожидания (в миллисекундах) перед второй попыткой отправки изменений из внутренней очереди apply в Tahoma на случай, если они потеряются. |
| Задержка перед повторной попыткой applyqueue <sup>1</sup> <sup>2</sup> | `1500` | Время (в миллисекундах) ожидания перед второй попыткой отправки изменений из внутренней очереди apply в Tahoma на случай, если они потеряются. |

 <sup>1</sup> Эти значения конфигурации видны и настраиваются только в Admin 5 (новый графический интерфейс) или более поздней версии.

 <sup>2</sup> Все значения связаны с входом в Tahomalink, который с точки зрения разработки в основном является черным ящиком. Если вы установите здесь слишком низкие значения, опыт показал, что есть большая вероятность, что Somfy временно заблокирует вашу учетную запись, поэтому осторожно снижайте значения по умолчанию!

## Штаты
### Tahoma.X.расположение
Состояние в этом дереве содержит личную информацию пользователя, такую как город, почтовый адрес и долгота/широта.

### Tahoma.X.devices.*.URL-адрес-устройства
Это состояние содержит URL-адрес устройства, который используется Tahoma для его идентификации.

### Tahoma.X.устройства.*.команды
Эти состояния содержат команды кнопок для управления устройствами. Большинство устройств поддерживают такие команды, как `close` и `open`, но также и некоторые другие.
Некоторые команды имеют `:slow` в конце, если поддерживаются устройством. Использование их включает режим низкой скорости или так называемый бесшумный режим.

### Tahoma.X.устройства.*.состояния
Эти состояния содержат текущее состояние устройств следующим образом. Некоторые из состояний имеют `:slow` в конце, если поддерживаются устройством. Установка этих состояний включает низкую скорость или так называемый бесшумный режим.

| Состояние устройства | Редактируемое | Назначение/Описание |
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices.*.states.core:DeploymentState_ | &#10003; | Предоставляет информацию о текущем развертывании и управляет им. 100 означает полное развертывание, 0 — неразвертывание. Не все устройства имеют это значение, некоторые имеют `ClosureState` вместо этого. |
| _tahoma.X.devices.*.states.coreClosureState_ | &#10003; | Предоставляет информацию о текущем состоянии закрытия и управляет им. 100 означает полное закрытие, 0 — открытие. Не все устройства имеют это значение, некоторые имеют `DeploymentState` вместо этого. |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Смотрите `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | Смотрите `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Смотрите `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | Смотрите `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Содержит `closed`, если устройство закрыто на 100% или развернуто на 0%, и `open` в противном случае. |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Содержит `closed`, если устройство закрыто на 100% или развернуто на 0%, и `open` в противном случае. |
| _tahoma.X.devices.*.states.core:PriorityLockTimerState_ | | Если датчик заблокировал устройство, это указывается здесь, например, датчик ветра заблокировал тент. |
| _tahoma.X.devices.*.states.core:StatusState_ | | `available` если устройство в данный момент доступно. |
| _tahoma.X.devices.*.states.io:PriorityLockLevelState_ | | Смотрите `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | Смотрите `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | См. `tahoma.X.devices.*.states.core:PriorityLockTimerState` | | _tahoma.X.devices.*.states.moving_ | | Состояния, если устройство в данный момент движется. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`<br/> **Примечание:**<br/> Это работает надежно только при подключении к API Tahoma (не Local), поскольку Local API не предоставляет достаточно обновлений действий-событий для правильного вычисления этого состояния. Однако `core:MovingState` должен работать в обоих случаях. |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

<!--
	Placeholder for the next version (add instead of version-number-headline below):
	## __WORK IN PROGRESS__
-->
### 0.11.0 (2025-04-15)
- Feature: Added option to specify IP address for access to local API (https://github.com/Excodibur/ioBroker.tahoma/issues/424)

### 0.10.4 (2024-04-28)
- Fixed: Warning resolved about invalid element in jsonConfig

### 0.10.3 (2024-01-29)
- Fixed: Some crashed caused by event-updates were fixed with a workaround.

### 0.10.2 (2023-03-25)
- Fixed: Improved core:MovingState. Should reflect moving blinds correctly now.

### 0.10.1 (2023-01-23)
- Fixed: Clear bearer token, if connection to local API fails, so new one can be fetched.

### 0.10.0 (2023-01-03)
- Fixed warnings about _Failed getting execution state_ when using the local API.

## License

The MIT License (MIT)

Copyright (c) 2020-2025 Marius Burkard & Excodibur

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.