---
chapters: {"pages":{"en/adapterref/iobroker.tahoma/README.md":{"title":{"en":"ioBroker.tahoma"},"content":"en/adapterref/iobroker.tahoma/README.md"},"en/adapterref/iobroker.tahoma/FAQ.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.tahoma/FAQ.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tahoma/README.md
title: ioBroker.tahoma
hash: XC7thve6xfmrHVPlCXG/6rDmufffEn2kPl3V8Ai+T4Y=
---
![Логотип](../../../en/adapterref/iobroker.tahoma/admin/tahoma.png)

![НПМ](https://nodei.co/npm/iobroker.tahoma.png?downloads=true)
![Версия NPM](https://img.shields.io/npm/v/iobroker.tahoma.svg)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Количество установок (последние)](http://iobroker.live/badges/tahoma-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/tahoma-stable.svg)
![статус релиза на GitHub](https://github.com/Excodibur/iobroker.tahoma/workflows/Build%2C%20Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tahoma/svg-badge.svg)

# ioBroker.tahoma

Адаптер ioBroker для Somfy Tahoma. Этот проект не связан с Somfy. Изначально он основан на скрипте, взятом с <https://forum.iobroker.net/post/336001> , и является форком проекта <https://github.com/StrathCole/ioBroker.tahoma> .

Адаптер подключается к API конечного пользователя Tahomalink и управляет устройствами. Настройка выполняется через Tahoma Box (и, скорее всего, через Connexoon).\
&#x20;Адаптер пока не обладает полным набором функций, но должен поддерживать большинство действий по управлению жалюзи, ставнями и т.д.

Пожалуйста, сначала ознакомьтесь с разделом часто задаваемых вопросов [(FAQ)](/#/docs/adapterref/iobroker.tahoma/FAQ.md) , чтобы избежать проблем.

## В настоящее время протестированные устройства

В целом, этот адаптер должен поддерживать все устройства, доступ к которым можно получить через **tahomalink.com** , но разработчику адаптера сложно это гарантировать. В основном потому, что документация по используемому Somfy-API (по крайней мере, в открытом доступе) отсутствует, и разработчик может тестировать только те устройства Somfy, которые принадлежат ему лично или которые он может протестировать при поддержке желающих.

Данный адаптер обычно также поддерживает устройства, которыми можно управлять через tahomalink.com. К ним относятся:

| Устройство           | Поддержка онлайн-API                                                            | Поддержка локального API                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Коробка Тахома       | ✓                                                                               | ✓                                                                                                                                |
| Коннексон            | ✓                                                                               | ✓ ( [доказательство](https://github.com/Excodibur/ioBroker.tahoma/issues/241) )                                                  |
| Переключатель Тахома | ✓                                                                               | ✓                                                                                                                                |
| Комплект подключения | ✓ ( [доказательство](https://github.com/Excodibur/ioBroker.tahoma/issues/171) ) | ✗ ( [доказательство](https://service.somfy.com/downloads/fr_v5/fichecomparative_tahoma_switch_vs_kit_connectivite_a4_1221.pdf) ) |

Было подтверждено, что следующие устройства Somfy совместимы с этим адаптером:

- S\&SO RS100 io
- Oximo io
- Датчик солнца Sunis io
- Датчик температуры
- Датчик дыма io
- Адаптер-штекер

## Конфигурация

Адаптер поддерживает следующие параметры конфигурации.

| Параметр                                                                        | (Значение по умолчанию)             | Описание                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Имя пользователя                                                                | _`<your Tahomalink user>`_          | Необходимо для аутентификации вашей учетной записи Tahoma.                                                                                                                                                                                                                  |
| Пароль                                                                          | _`<Your Tahomalink password>`_      | Необходимо для аутентификации вашей учетной записи Tahoma.                                                                                                                                                                                                                  |
| Интервал опроса                                                                 | `20000`                             | Время (в миллисекундах), по истечении которого адаптер попытается получить новые данные от Tahomalink.                                                                                                                                                                      |
| ПИН-код коробки Тахома                                                          | формат, аналогичный`1234-5678-9012` | **<sup>Только для LocalAPI</sup>** Уникальный PIN-код вашей приставки Tahoma предоставлен компанией Somfy. Подробнее о том, как активировать/использовать его, можно узнать [здесь.](https://github.com/Somfy-Developer/Somfy-TaHoma-Developer-Mode)                        |
| Локальный IP-адрес                                                              |                                     | Необязательно. Используйте только в том случае, если вы хотите подключиться к локальному API вашего устройства Tahoma через указанный IP-адрес, вместо использования DNS-записи по умолчанию.`gateway-<pin>` , что вполне подойдёт для большинства установок.               |
| Используйте MDNS                                                                | `false`                             | **<sup>Только для LocalAPI</sup>** Если установлено значение true, будет предпринята попытка использовать mDNS для разрешения локального имени хоста вашего Tahoma-Box. Возможно, эта функция не поддерживается всеми маршрутизаторами, поэтому она отключена по умолчанию. |
| Попытки входа в систему<sup> 1</sup><sup> 2 </sup>                              | `3`                                 | Количество попыток повторного входа в систему после неудачной попытки входа.                                                                                                                                                                                                |
| Задержка между попытками входа в систему<sup> 1</sup><sup> 2 </sup>             | `30`                                | Время (в секундах), которое нужно подождать между попытками входа в систему.                                                                                                                                                                                                |
| Задержка после неудачной попытки входа в систему<sup> 1</sup><sup> 2 </sup>     | `120`                               | Время (в секундах), которое нужно подождать после того, как все последовательные попытки входа в систему завершатся неудачей.                                                                                                                                               |
| Задержка перед повторной попыткой применения очереди<sup> 1</sup><sup> 2 </sup> | `1500`                              | Время (в миллисекундах), которое необходимо подождать перед второй попыткой отправки изменений из внутренней очереди применения в Tahoma, на случай, если они были потеряны.                                                                                                |

<sup> 1</sup> Эти параметры конфигурации видны и настраиваемы только в Admin 5 (новый графический интерфейс) или более поздних версиях.

<sup> 2</sup> Все значения относятся к авторизации в Tahomalink, которая с точки зрения разработки представляет собой, по большей части, «черный ящик». Как показывает опыт, если установить слишком низкие значения, существует большая вероятность того, что Somfy временно заблокирует вашу учетную запись, поэтому снижайте значения по умолчанию с осторожностью!

## Штаты

### tahoma.X.location

В этом дереве штатов содержится личная информация пользователя, такая как город, адрес и координаты (долгота/широта).

### tahoma.X.devices.\*.deviceURL

В этом состоянии содержится URL-адрес устройства, который используется Tahoma для идентификации устройства.

### tahoma.X.devices.\*.commands

Эти состояния содержат команды кнопок для управления устройствами. Большинство устройств поддерживают такие команды, как...`close` и`open` но и кое-что еще.\
&#x20;Некоторые из команд имеют`:slow` В конце, если это поддерживается устройством. Использование этих функций позволяет использовать режим низкой скорости или так называемый бесшумный режим.

### tahoma.X.devices.\*.states

В этих состояниях отображается текущее состояние устройств. В некоторых состояниях имеется следующее:`:slow` В конце, если это поддерживается устройством. Настройка этих параметров включает низкую скорость или так называемый бесшумный режим.

| Состояние устройства                                        | Редактируемый | Назначение/Описание                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _tahoma.X.devices.\*.states.core:DeploymentState_           | ✓             | Предоставляет информацию о текущем состоянии развертывания и управляет им. 100 означает полное развертывание, 0 — отсутствие развертывания. Не все устройства имеют это значение, некоторые имеют.`ClosureState` вместо.                                                                                                                                                                                                                                  |
| _tahoma.X.devices.\*.states.core:TargetDeploymentState_     | ✓             | Видеть`tahoma.X.devices.*.states.core:DeploymentState` Используйте это, например, для непосредственного изменения положения жалюзи.                                                                                                                                                                                                                                                                                                                       |
| _tahoma.X.devices.\*.states.coreClosureState_               | ✓             | Предоставляет информацию о текущем состоянии замыкания и управляет им. 100 означает полностью закрытое состояние, 0 — открытое. Не все устройства имеют это значение, некоторые имеют.`DeploymentState` вместо.                                                                                                                                                                                                                                           |
| _tahoma.X.devices.\*.states.core:TargetClosureState_        | ✓             | Видеть`tahoma.X.devices.*.states.core:ClosureState`                                                                                                                                                                                                                                                                                                                                                                                                       |
| _tahoma.X.devices.\*.states.core:OrientationState_          | ✓             | Предоставляет информацию об ориентации ламелей (например, для жалюзи) и управляет ею. Не все устройства предлагают эту функцию.                                                                                                                                                                                                                                                                                                                           |
| _tahoma.X.devices.\*.states.core:TargetOrientationState_    | ✓             | Видеть`tahoma.X.devices.*.states.core:OrientationState`                                                                                                                                                                                                                                                                                                                                                                                                   |
| _tahoma.X.devices.\*.states.core:NameState_                 |               | Содержит текущее название устройства.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| _tahoma.X.devices.\*.states.core:OpenClosedState_           |               | Содержит`closed` если устройство полностью закрыто или развернуто на 0% и`open` в противном случае.                                                                                                                                                                                                                                                                                                                                                       |
| _tahoma.X.devices.\*.states.core:PriorityLockTimerState_    |               | Если датчик заблокировал устройство, это указывается здесь, например, датчик ветра блокирует навес.                                                                                                                                                                                                                                                                                                                                                       |
| _tahoma.X.devices.\*.states.core:RSSILevelState_            |               | Текущее качество сигнала устройства.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| _tahoma.X.devices.\*.states.core:StatusState_               |               | `available` если устройство в настоящее время доступно.                                                                                                                                                                                                                                                                                                                                                                                                   |
| _tahoma.X.devices.\*.states.io:PriorityLockLevelState_      |               | Видеть`tahoma.X.devices.*.states.core:PriorityLockTimerState`                                                                                                                                                                                                                                                                                                                                                                                             |
| _tahoma.X.devices.\*.states.io:PriorityLockOriginatorState_ |               | Видеть`tahoma.X.devices.*.states.core:PriorityLockTimerState`                                                                                                                                                                                                                                                                                                                                                                                             |
| _tahoma.X.devices.\*.states.moving_                         |               | Указывает, движется ли устройство в данный момент.`0 = stopped` ,`1 = up/undeploy` ,`2 = down/deploy` ,`3 = unknown direction`<br/> **Примечание:**<br/> Этот метод надёжно работает только при подключении к API Tahoma (а не к локальному API), поскольку локальный API не предоставляет достаточного количества обновлений событий-действий для корректного вычисления этого состояния.`core:MovingState` Однако в обоих случаях это должно сработать. |

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