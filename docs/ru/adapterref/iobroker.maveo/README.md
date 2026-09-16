---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.maveo/README.md
title: ioBroker.maveo
hash: vTNzWEpWpuE7gNqDA3o4btfxKhZvPphlE9WLKanaZvk=
---
![Логотип](../../../en/adapterref/iobroker.maveo/admin/maveo.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.maveo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.maveo.svg)
![Количество установок](https://iobroker.live/badges/maveo-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/maveo-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.maveo.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.maveo/workflows/Test%20and%20Release/badge.svg)

# ioBroker.maveo

## Адаптер Maveo для ioBroker

Адаптер для гаражных ворот Maveo от Marantec. Два режима работы:

- **Облачный режим (по умолчанию)** — вход в систему через облако Marantec (Amazon Cognito), управление через туннель Nymea.`wss://remoteproxy.nymea.io` Для этого требуется сопряжение устройства **через Bluetooth в процессе настройки** в приложении maveo (приложение записывает идентификатор Cognito в устройство во время настройки). Если устройство было добавлено только локально, список облачных устройств будет пуст; в этом случае адаптер сообщит об этом в журнале, и вы сможете переключиться в режим LAN.
- **Режим локальной сети** — прямое JSON-RPC-соединение с устройством (`<boxIp>:2222` (по умолчанию используется TLS). При первом запуске выполняется аутентификация нажатием кнопки: нажмите желтую кнопку на задней панели устройства Maveo в течение 60 секунд. Полученный токен сохраняется в адаптере. Работает независимо от учетной записи Cognito и является надежным вариантом, если устройство доступно в локальной сети.

Обновления состояния (положение, движение, данные датчиков) поступают в виде push-уведомлений в обоих режимах.`Integrations.StateChanged` Открытие/закрытие осуществляется посредством`Integrations.ExecuteAction` .

## Конфигурация

| Поле                        | Значение                                                                | По умолчанию |
| --------------------------- | ----------------------------------------------------------------------- | ------------ |
| `App Email` /`App Password` | Учетные данные приложения Maveo (только в облачном режиме)              | —            |
| `Region`                    | `eu` (Европа) или`us` (США)                                             | `eu`         |
| `IoT wake topic`            | Дополнительная тема AWS IoT, используемая для пробуждения устройства.   | пустой       |
| `Maveo box IP`              | Включает режим локальной сети при установке соответствующего параметра. | пустой       |
| `Port`                      | JSON-RPC порт                                                           | 2222         |
| `TLS`                       | SSL для JSON-RPC сокета                                                 | на           |

Идентификаторы пула/клиента Cognito и конечные точки IoT жестко закодированы в приложении maveo версии 2.6.1 и зависят от региона. Локальный токен кнопки хранится в зашифрованном виде.`native.localToken` .

## Контроль

Для каждого элемента адаптер создает записываемые состояния.`maveo.<inst>.<thingId>.remote.<action>` (например`open` ,`close` ). Запись любого значения в такое состояние вызывает проблемы.`Integrations.ExecuteAction` Изменения состояния происходят автоматически в виде push-уведомлений.`maveo.<inst>.<thingId>.<stateTypeId>` .

## Обсуждение

<https://forum.iobroker.net/topic/48101/test-adapter-maveo-v-0-0-x>

## Часовой

Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчику об исключениях и ошибках в коде. Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. [в документации по плагину Sentry](https://github.com/ioBroker/plugin-sentry) .

## Changelog

### 0.1.2

* Garage door position and movement are now also published as simple boolean
  states in the `status` channel — `isOpen`, `isClosed`, `isOpening`,
  `isClosing` and `isMoving`. These are much easier to use in logic blocks and
  visualizations than the original text value (`open`/`closing`/…) and arrow
  glyph (`↑`/`↓`/`-`), which remain available unchanged.

### 0.1.1

* **Local (LAN) control added — this is the easy, recommended way and needs no
  cloud account:**
  1. Find the IP address of your maveo box (check your router's device list).
  2. In the adapter settings enter it under **Maveo box IP** and save.
  3. On the first start the adapter asks you to press the **yellow button on
    the maveo box**. You have 5 minutes — just walk over and press it once.
  4. Done. The token is stored, future restarts connect on their own.
* Cloud login (maveo app e-mail/password) still works as an alternative.
* Your garage door, light and sensors show up as ready-to-use data points
  under `maveo.0.<device>` — with an `open`/`close`/`light` control section
  and a `status` section.

### 0.1.0

* First working version against the current Marantec/nymea backend: cloud
  login, device discovery and remote control.

### 0.0.5

* (TA2k) update login keys

### 0.0.4

* (TA2k) fix status

### 0.0.1

* (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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