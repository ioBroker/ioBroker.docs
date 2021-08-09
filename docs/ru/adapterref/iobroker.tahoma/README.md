---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: cPqOYG7QNS6lvH3iSlYXZHJcT/A0P/6YDaxL2MIfrr0=
---
![Логотип](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![НПМ](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![Версия NPM](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Статус зависимости](https://img.shields.io/david/Excodibur/iobroker.schwoerer-ventcube.svg)
![Количество установок (последнее)](http://iobroker.live/badges/tahoma-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/tahoma-stable.svg)
![Уровень языка: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.tahoma.svg?logo=lgtm&logoWidth=18)

![Статус выпуска Github](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)

# IoBroker.tahoma
Адаптер ioBroker для Somfy Tahoma. Этот проект не имеет отношения к Somfy. Изначально на основе скрипта, взятого с https://forum.iobroker.net/post/336001 и разветвленного с https://github.com/StrathCole/ioBroker.tahoma.

Адаптер подключается к API конечного пользователя Tahomalink и управляет устройствами, настроенными через Tahoma Box (и, скорее всего, Connexoon).
Адаптер еще не является полнофункциональным, но он должен поддерживать большинство действий по управлению жалюзи, ставнями и т. Д.

Выполнение некоторых состояний, созданных адаптером.

## Протестированные в настоящее время устройства
Как правило, этот адаптер должен поддерживать все устройства, к которым можно получить доступ через __tahomalink.com__, но для разработчика адаптера это сложно гарантировать. В основном потому, что документация по используемому Somfy-API (по крайней мере, публично) не существует, и разработчик может тестировать только устройства Somfy, которые ему принадлежат, или может тестировать при поддержке желающих участников.

Следующие устройства Somfy были проверены для работы с этим адаптером:

- S&SO RS100 io
- Oximo io
- Датчик солнца Sunis io
- Датчик температуры io
- Датчик дыма io
- Адаптер Plug io

## Конфигурация
Адаптер поддерживает следующие параметры конфигурации.

| Параметр | (По умолчанию) значение | Описание |
| Имя пользователя | _`<your Tahomalink user>`_ | Требуется для аутентификации вашей учетной записи Tahoma. |
| Пароль | _`<Your Tahomalink password>`_ | Требуется для аутентификации вашей учетной записи Tahoma. |
| Интервал опроса | `20000` | Время (в миллисекундах), по истечении которого адаптер попытается получить новые данные от Tahomalink. |
| Попытки входа в систему <sup>1</sup> <sup>2</sup> | `3` | Количество попыток повторного входа в систему после неудачной попытки входа. |
| Задержка между попытками входа в систему <sup>1</sup> <sup>2</sup> | `30` | Время (в секундах) ожидания между попытками входа в систему. |
| Задержка после неудачного входа в систему <sup>1</sup> <sup>2</sup> | `120` | Время (в секундах) ожидания после неудачных попыток входа в систему. |
| Задержка перед повторной попыткой applyqueue <sup>1</sup> <sup>2</sup> | `1500` | Время (в миллисекундах) ожидания, прежде чем будет сделана вторая попытка отправить изменения из внутренней очереди применения в Tahoma в случае, если они были потеряны. |
| Задержка перед повторной попыткой applyqueue <sup>1</sup> <sup>2</sup> | `1500` | Время (в миллисекундах) ожидания, прежде чем будет сделана вторая попытка отправить изменения из внутренней очереди применения в Tahoma в случае, если они были потеряны. |

<sup>1</sup> Эти значения конфигурации видны и настраиваются только в Admin 5 (новый графический интерфейс) или более поздней версии.

<sup>2</sup> Все значения связаны с входом в Tahomalink, который с точки зрения разработки в основном является черным ящиком. Если вы установите здесь слишком низкие значения, опыт показал, что есть большая вероятность, что Somfy временно заблокирует вашу учетную запись, поэтому осторожно уменьшайте здесь значения по умолчанию!

## Состояния
### Tahoma.X.location
Состояние в этом дереве содержит личную информацию пользователя, такую как город, почтовый адрес и долгота / широта.

### Tahoma.X.devices. *. deviceURL
Это состояние содержит URL-адрес устройства, который используется Tahoma для идентификации устройства.

### Tahoma.X.devices. *. команды
Эти состояния содержат команды кнопок для управления устройствами. Большинство устройств будут поддерживать такие команды, как `close` и `open`, а также некоторые другие.
Некоторые команды имеют в конце `:slow`, если они поддерживаются устройством. Их использование включает низкую скорость или так называемый бесшумный режим.

### Tahoma.X.devices. *. состояния
Эти состояния содержат текущий статус устройств следующим образом. Некоторые состояния имеют в конце `:slow`, если они поддерживаются устройством. Их установка включает низкую скорость или так называемый бесшумный режим.

| Состояние устройства | Редактируемый | Назначение / Описание |
|-------------------------------------------------------------|----------|---------------------|
| _tahoma.X.devices. *. states.core: DeploymentState_ | & # 10003; | Предоставляет информацию и контролирует состояние текущего развертывания. 100 означает, что развернут полностью, 0 - развернут. Не все устройства имеют это значение, у некоторых вместо него есть `ClosureState`. |
| _tahoma.X.devices. *. states.coreClosureState_ | & # 10003; | Предоставляет информацию и контролирует состояние текущего закрытия. 100 означает полностью закрыто, 0 открыто. Не все устройства имеют это значение, у некоторых вместо него есть `DeploymentState`. |
| _tahoma.X.devices. *. states.core: TargetClosureState_ | & # 10003; | См. `tahoma.X.devices.*.states.core:ClosureState` |
| _tahoma.X.devices. *. states.core: TargetClosureState_ | & # 10003; | См. `Tahoma.X.devices. *. States.core: ClosureState` |
| _tahoma.X.devices. *. states.core: TargetOrientationState_ | & # 10003; | См. `tahoma.X.devices.*.states.core:OrientationState` |
| _tahoma.X.devices. *. states.core: TargetOrientationState_ | & # 10003; | См. `Tahoma.X.devices. *. States.core: OrientationState` |
| _tahoma.X.devices. *. states.core: OpenClosedState_ | | Содержит `closed`, если устройство закрыто на 100% или 0% развернуто, и `open` в противном случае. |
| _tahoma.X.devices. *. states.core: OpenClosedState_ | | Содержит «закрыто», если устройство закрыто на 100% или развернуто на 0%, и «открыто» в противном случае. |
| _tahoma.X.devices. *. states.core: PriorityLockTimerState_ | | Если датчик заблокировал устройство, это указано здесь, например. г. датчик ветра, блокирующий тент. |
| _tahoma.X.devices. *. states.core: StatusState_ | | `available`, если устройство в данный момент доступно. |
| _tahoma.X.devices. *. states.io:PriorityLockLevelState_ | | См. `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices. *. states.io:PriorityLockOriginatorState_ | | См. `tahoma.X.devices.*.states.core:PriorityLockTimerState` |
| _tahoma.X.devices. *. states.moving_ | | Указывает, движется ли устройство в данный момент. `0 = stopped`, `1 = up/undeploy`, `2 = down/deploy`, `3 = unknown direction` |
| _tahoma.X.devices. *. states.moving_ | | Указывает, движется ли устройство в данный момент. «0 = остановлено», «1 = вверх / развернуто», «2 = вниз / развернуто», «3 = неизвестное направление» |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.tahoma/blob/master/CHANGELOG.md).

## License

The MIT License (MIT)

Copyright (c) 2020-2021 Marius Burkard

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