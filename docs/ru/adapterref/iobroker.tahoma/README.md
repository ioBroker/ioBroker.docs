---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tahoma/README.md
title: ioBroker.тахома
hash: ol4x0rHy3INAcP+Q6hOW4O02EskWBI7/Af5wKSwTmHE=
---
![Логотип](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![НПМ](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![версия NPM](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Количество установок (последние)](http://iobroker.live/badges/tahoma-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/tahoma-stable.svg)

![Статус выпуска на гитхабе](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

# IoBroker.tahoma
Адаптер ioBroker для Somfy Tahoma. Этот проект не имеет никакого отношения к Somfy. Первоначально на основе сценария, взятого с https://forum.iobroker.net/post/336001 и разветвленного с https://github.com/StrathCole/ioBroker.tahoma.

Адаптер подключается к API конечного пользователя Tahomalink и управляет устройствами. настроить через Tahoma Box (и, скорее всего, через Connexoon).
Адаптер еще не полностью функционален, но он должен поддерживать большинство действий по управлению жалюзи, рольставнями и т. д.

Пожалуйста, также прочитайте [Часто задаваемые вопросы](https://github.com/Excodibur/ioBroker.tahoma/blob/master/FAQ.md) в случае возникновения проблем.

## Текущие протестированные устройства
Как правило, этот адаптер должен поддерживать все устройства, к которым можно получить доступ через __tahomalink.com__, но разработчику адаптера трудно это гарантировать. Главным образом потому, что документация используемого Somfy-API (по крайней мере, публично) не существует, и разработчик может тестировать только те устройства Somfy, которыми он владеет сам, или может протестировать при поддержке желающих участников.

Устройства, которыми можно управлять через tahomalink.com, обычно также поддерживаются этим адаптером. Это включает в себя:

| Устройство | Поддержка онлайн-API | Поддержка локального API |
|-|-|-|
| Коробка Тахома | ✓ | ✓ |
| связь | ✓ | ✓ ([доказательство](https://github.com/Excodibur/ioBroker.tahoma/issues/241)) |
| Тахома Переключатель | ✓ | ✓ |
| Комплект для подключения | ✓ ([доказательство] (https://github.com/Excodibur/ioBroker.tahoma/issues/171)) | ✗ ([доказательство](https://service.somfy.com/downloads/fr_v5/fichecomparative_tahoma_switch_vs_kit_connectivite_a4_1221.pdf)) |

Следующие устройства Somfy были проверены на совместимость с этим адаптером:

- S&SO RS100 ио
- Оксимо ио
- Датчик солнца Sunis io
- Датчик температуры ио
- Датчик дыма ио
- Адаптер Plug io

## Конфигурация
Адаптер поддерживает следующие параметры конфигурации.

| Параметр | (по умолчанию) значение | Описание |
| Имя пользователя | _`<your Tahomalink user>`_ | Требуется для аутентификации вашей учетной записи Tahoma. |
| Пароль | _`<Your Tahomalink password>`_ | Требуется для аутентификации вашей учетной записи Tahoma. |
| Интервал опроса | `20000` | Время (в миллисекундах), по истечении которого адаптер попытается получить новые данные от Tahomalink. |
| PIN-код коробки Tahoma | формат аналогичен `1234-5678-9012` | __ <sup>Только для LocalAPI</sup> __ Уникальный PIN-код вашего ящика Tahoma, предоставленный Somfy. Дополнительная информация о том, как его активировать/использовать [здесь](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode) |
| Используйте MDNS | `false` | __ <sup>Только для LocalAPI</sup> __ Если установлено значение true, будет пытаться использовать mDNS для разрешения локального имени хоста вашего Tahoma-Box. Может поддерживаться не всеми маршрутизаторами, поэтому по умолчанию он отключен. |
| Попытки входа <sup>1</sup> <sup>2</sup> | `3` | Количество попыток повторного входа в систему после неудачного входа. |
| Задержка между попытками входа в систему <sup>1</sup> <sup>2</sup> | `30` | Время (в секундах) ожидания между попытками входа в систему. |
| Задержка после неудачного входа в систему <sup>1</sup> <sup>2</sup> | `120` | Время ожидания (в секундах) после неудачных попыток входа в систему. |
| Задержка перед повторной попыткой применения очереди <sup>1</sup> <sup>2</sup> | `1500` | Время ожидания (в миллисекундах) перед второй попыткой отправки изменений из внутренней очереди применения в Tahoma на случай потери. |
| Задержка перед повторной попыткой применения очереди <sup>1</sup> <sup>2</sup> | `1500` | Время ожидания (в миллисекундах) перед второй попыткой отправки изменений из внутренней очереди применения в Tahoma на случай потери. |

<sup>1</sup> Эти значения конфигурации видны и настраиваются только в Admin 5 (новый графический интерфейс) или более поздней версии.

<sup>2</sup> Все значения связаны с входом в Tahomalink, который с точки зрения разработки в основном является черным ящиком. Если вы укажете здесь слишком низкие значения, опыт показывает, что Somfy может временно заблокировать вашу учетную запись, поэтому с осторожностью снижайте здесь значения по умолчанию!

## Состояния
### Тахома.X.местоположение
Состояние в этом дереве содержит личную информацию пользователя, такую как город, почтовый адрес и долготу/широту.

### Tahoma.X.devices.*.deviceURL
Это состояние содержит URL-адрес устройства, который используется Tahoma для идентификации устройства.

### Tahoma.X.devices.*.commands
Эти состояния содержат команды кнопок для управления устройствами. Большинство устройств поддерживают такие команды, как `close` и `open`, а также некоторые другие.
Некоторые команды имеют в конце `:slow`, если они поддерживаются устройством. Их использование позволяет использовать низкую скорость или так называемый бесшумный режим.

### Tahoma.X.devices.*.states
Эти состояния содержат текущее состояние устройств следующим образом. Некоторые состояния имеют в конце `:slow`, если они поддерживаются устройством. Их установка включает низкую скорость или так называемый бесшумный режим.

| Состояние устройства | Редактируемый | Назначение/Описание |
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices.*.states.core:DeploymentState_ | &#10003; | Предоставляет информацию о текущем развертывании и управляет им. 100 означает полностью развернуто, 0 — не развернуто. Не все устройства имеют это значение, вместо него у некоторых есть `ClosureState`. |
| _tahoma.X.devices.*.states.coreClosureState_ | &#10003; | Предоставляет информацию о текущем закрытии и контролирует его состояние. 100 означает полностью закрытый, 0 открытый. Не все устройства имеют это значение, вместо него у некоторых есть `DeploymentState`. |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | См. `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetClosureState_ | &#10003; | См. `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | См. `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:TargetOrientationState_ | &#10003; | См. `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Содержит `closed`, если устройство закрыто на 100 % или развернуто на 0 %, и `open` в противном случае. |
| _tahoma.X.devices.*.states.core:OpenClosedState_ | | Содержит «закрыто», если устройство закрыто на 100% или развернуто на 0%, и «открыто» в противном случае. |
| _tahoma.X.devices.*.states.core:PriorityLockTimerState_ | | Если датчик заблокировал устройство, это указывается здесь, например. г. датчик ветра, блокирующий тент. |
| _tahoma.X.devices.*.states.core:StatusState_ | | `available`, если устройство в данный момент доступно. |
| _tahoma.X.devices.*.states.io:PriorityLockLevelState_ | | См. `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | См. `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices.*.states.io:PriorityLockOriginatorState_ | | См. `tahoma.X.devices.*.states.core:PriorityLockTimerState` | | _tahoma.X.devices.*.states.moving_ | | Указывает, движется ли устройство в данный момент. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction`<br/> **Примечание:**<br/> Это надежно работает только при подключении к Tahoma (не локальному) API, поскольку локальный API не предоставляет достаточно обновлений действий и событий для правильного вычисления этого состояния. Однако `core:MovingState` должен работать в обоих случаях. |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

## License

The MIT License (MIT)

Copyright (c) 2020-2023 Marius Burkard & Excodibur

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