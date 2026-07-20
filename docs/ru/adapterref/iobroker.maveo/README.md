---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.maveo/README.md
title: ioBroker.maveo
hash: +GQ5WqtQ2YUxOnIFrRAURFLWvp9VbO/KPPHm/Qut4m0=
---
![Логотип](../../../en/adapterref/iobroker.maveo/admin/maveo.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.maveo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.maveo.svg)
![Количество установок](https://iobroker.live/badges/maveo-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/maveo-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.maveo.png?downloads=true)

# IoBroker.maveo
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.maveo/workflows/Test%20and%20Release/badge.svg)

## Адаптер Maveo для ioBroker
Адаптер для гаражных ворот Maveo от Marantec. Два режима работы:

- **Облачный режим (по умолчанию)** — вход в систему через облако Marantec (Amazon Cognito),

Управление через туннель Nymea `wss://remoteproxy.nymea.io`.
Требуется сопряжение устройства **через Bluetooth-соединение** в приложении maveo (приложение записывает идентификатор Cognito в устройство во время соединения).
Если устройство было добавлено только локально, список облачных устройств пуст; в этом случае адаптер сообщит об этом в журнале, и вы сможете переключиться в режим LAN.

- **Режим локальной сети** — прямое JSON-RPC соединение с устройством (`<boxIp>:2222` через

(По умолчанию используется TLS). При первом запуске выполняется аутентификация нажатием кнопки: нажмите желтую кнопку на задней панели устройства Maveo в течение 60 секунд. Полученный токен сохраняется в адаптере. Работает независимо от учетной записи Cognito и является надежным вариантом, если устройство доступно в локальной сети.

Обновления состояния (положение, движение, датчики) поступают в виде push-уведомлений в обоих режимах через `Integrations.StateChanged`; открытие/закрытие осуществляется через `Integrations.ExecuteAction`.

## Конфигурация
| Поле | Значение | Значение по умолчанию |
|---|---|---|
| `App Email` / `App Password` | Учетные данные приложения Maveo (только в облачном режиме) | — |
| `IoT wake topic` | Необязательная тема AWS IoT, используемая для пробуждения устройства | пусто |
| `Maveo box IP` | Включает режим локальной сети, если установлено | пустое значение |
| `Port` | Порт JSON-RPC | 2222 |
| `TLS` | SSL для сокета JSON-RPC | включен |
| `TLS` | SSL для JSON-RPC сокета | включен |

Идентификаторы пула/клиента Cognito и конечные точки IoT жестко закодированы в приложении maveo версии 2.6.1 и зависят от региона. Локальный токен кнопки хранится в зашифрованном виде в `native.localToken`.

## Контроль
Для каждого элемента адаптер создает записываемые состояния в разделе `maveo.<inst>.<thingId>.remote.<action>` (например, `open`, `close`).
Запись любого значения в такое состояние приводит к срабатыванию `Integrations.ExecuteAction`.
Изменения состояния автоматически поступают в виде push-обновлений в разделе `maveo.<inst>.<thingId>.<stateTypeId>`.

## Обсуждение
https://forum.iobroker.net/topic/48101/test-adapter-maveo-v-0-0-x

## Часовой
Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчику об исключениях и ошибках в коде. Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry).

## Changelog

### 0.1.0

* Two operating modes: cloud (Cognito + Nymea tunnel) and LAN (direct
  connection to the box with push-button auth). Region selectable (EU/US).
  Cognito pool/client IDs and cloud endpoints verified against the maveo app
  2.6.1 (Ghidra decompile). Thing/action discovery over Nymea, push-based
  state updates, working remote control, message buffering and exponential
  reconnect back-off.

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