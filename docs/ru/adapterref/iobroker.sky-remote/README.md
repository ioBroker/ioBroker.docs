---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sky-remote/README.md
title: ioBroker.sky-remote
hash: oDXg6KDrVpxnCmhIgYXWBDBr1bkDe3tLG7TveGy4OZE=
---
# IoBroker.sky-remote
![Логотип](../../../en/adapterref/iobroker.sky-remote/admin/sky-remote.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.sky-remote.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sky-remote.svg)
![Количество установок](https://iobroker.live/badges/sky-remote-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/sky-remote-stable.svg)

**Тесты:** ![Тестирование и выпуск](https://github.com/AlanSRU/ioBroker.sky-remote/workflows/Test%20and%20Release/badge.svg)

## Адаптер Sky Remote для ioBroker
Управляйте приставками Sky Q с помощью сетевых команд.

Этот адаптер позволяет отправлять команды дистанционного управления на приставки Sky Q по вашей сети. Он предоставляет информацию о состоянии всех кнопок пульта и позволяет отправлять последовательности команд.

[Sky Q (https://www.sky.com/tv/boxes) — это телеприставка от [Sky].](https://www.sky.com/).

## Предварительные условия
- Установка ioBroker
- Приставка Sky Q, подключенная к вашей сети
- IP-адрес вашей приставки Sky Q

## Установка
1. Установите адаптер через административную панель ioBroker.
2. Настройте IP-адрес вашей приставки Sky Q в параметрах адаптера.
3. Запустите адаптер.

## Конфигурация
В настройках адаптера необходимо выполнить следующие действия:

- IP-адрес или имя хоста вашей приставки Sky Q
- Порт (обычно 49160 для приставок Sky Q)
- Частота проверки соединения (в миллисекундах) - как часто адаптер проверяет, подключен ли Sky Box к сети.

### Мониторинг соединений
Адаптер периодически проверяет соединение с вашей приставкой Sky Q и обновляет состояние `sky-remote.X.info.connection`. Это состояние показывает, может ли адаптер успешно подключиться к вашей приставке Sky Q:

- `true`: Приставка Sky Q подключена к сети и доступна.
- `false`: Приставка Sky Q недоступна или отключена.

Вы можете использовать это состояние в своих визуализациях или скриптах для отслеживания статуса вашей приставки Sky Q.

### Поведение кнопок
Адаптер содержит кнопки, работающие как кратковременные кнопки. Они предназначены только для записи и не несут читаемого значения, поэтому кнопка срабатывает исключительно при записи в нее `true`:

1. Вы пишете `true` для состояния `buttons.*`.
2. Команда отправляется на блок Sky Q.

Повторная запись `true` всегда перезапускает команду, даже если состояние уже имеет значение `true`. Это позволяет нажимать одну и ту же кнопку несколько раз подряд, что крайне важно для ввода номеров каналов (например, нажатие 1, 0, 2 для канала 102).

## Использование
### Штаты
Адаптер создает следующие состояния:

- `sky-remote.X.buttons.*` - Состояния для каждой кнопки пульта дистанционного управления (например, `sky-remote.0.buttons.power`, `sky-remote.0.buttons.play`)
- `sky-remote.X.sendSequence` - Отправляет последовательность команд, разделенных запятыми.

### Примеры
- Чтобы нажать кнопку питания: установите значение `sky-remote.0.buttons.power` равным `true`.
- Чтобы перейти на канал: установите параметр `sky-remote.0.sendSequence` в значение `"1,0,6"` (для канала 106)
- Чтобы открыть телепрограмму и перемещаться по ней: установите параметр `sky-remote.0.sendSequence` в значение `"tvguide,right,right,select"`.

### Доступные команды
| Команда | Описание |
|---------|-------------|
| питание | Кнопка питания |
| выбрать | Кнопка «Выбрать/ОК» |
| резервное копирование | Кнопка «Назад» |
| канал вверх | Канал вверх |
| канал вниз | Канал вниз |
| интерактивный | Интерактивная кнопка |
| помощь | Кнопка справки |
| Услуги | Кнопка «Услуги» |
| Телегид / Главная | Кнопка «Телегид/Главная» |
| i | Информационная кнопка |
| текст | Кнопка текста |
| вверх | Стрелка вверх |
| вниз | Стрелка вниз |
| левая | Левая стрелка |
| вправо | Стрелка вправо |
| красный | Красная кнопка |
| зеленый | Зеленая кнопка |
| жёлтый | Жёлтая кнопка |
| синий | Синяя кнопка |
| 0-9 | Цифровые кнопки |
| играть | Играть |
| пауза | Пауза |
| стоп | Стоп |
| запись | Запись |
| перемотка вперед | Быстрая перемотка вперед |
| перемотка назад | Перемотка назад |
| касса | Кнопка «Кассовый зал» |
| небо | Кнопка «Небо» |

В `sendSequence` также принимаются следующие псевдонимы (они соответствуют тем же командам, что и кнопки выше, поэтому отдельное состояние кнопки не создается): `dismiss` (= резервное копирование), `sidebar` (= интерактивный режим), `search` (= сервисы).

## Интеграция с Blockly
В ioBroker вы можете использовать визуальный программный интерфейс Blockly для создания последовательностей команд:

1. Создайте новый скрипт Blockly.
2. Используйте блок "set state", чтобы установить состояние `sendSequence`.
3. Добавьте последовательность команд, разделенных запятыми.

## Интеграция с JavaScript
Пример отправки последовательности команд:

```javascript
// Press Guide, then right, then select
setState('sky-remote.0.sendSequence', 'tvguide,right,select');

// Turn on the TV and navigate to channel 101
setState('sky-remote.0.sendSequence', 'power,1,0,1');
```

## Поиск неисправностей
— Убедитесь, что ваш ресивер Sky Q включен и подключен к сети.
— Убедитесь, что IP-адрес вашей приставки Sky Q указан правильно.
— Убедитесь, что порт 49160 открыт и доступен.
— Проверьте журналы адаптера на наличие ошибок подключения.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.6 (2026-08-19)
- (Alan Paris) Button states are now write-only (`read: false`) as required for the `button` role; existing installations are migrated on start
- (Alan Paris) Fixed info.connection latching at a stale value after a failed or successful command; all writers now share one code path
- (Alan Paris) An unknown command name in sendSequence no longer marks a reachable box as offline
- (Alan Paris) Stop writing states and drop the in-flight connection check when the instance is unloaded
- (Alan Paris) Stopped shadowing the adapter base class `host` property, which misrouted js-controller crash notifications
- (Alan Paris) A command now fails with an error instead of hanging silently when the Sky box closes the connection mid-command
- (Alan Paris) Corrected the German, Dutch and Chinese admin translations of "Port", which used the harbour sense of the word

### 1.0.5 (2026-07-05)
- (Alan Paris) Reset own button states via setState instead of setForeignState
- (Alan Paris) Validate and clamp the port and connection-check-frequency config in code (not only in the admin UI)
- (Alan Paris) Add a default value to the sendSequence state and more descriptive button names
- (Alan Paris) Document the sendSequence command aliases and add a Sky product link to the README

### 1.0.4 (2026-07-04)
- (Alan Paris) Removed the abandoned `sky-remote` third-party dependency; the Sky Q / Sky+HD control protocol is now built in and modernized (node:net, Buffer.from, promise-based, no deprecated APIs)

### 1.0.3 (2026-07-04)
- (Alan Paris) Verify automated release publishing via GitHub Actions trusted publishing (no functional changes)

### 1.0.2 (2026-07-04)
- (Alan Paris) Modernized adapter for community submission: jsonConfig admin UI, updated dependencies, CI/release tooling

### 1.0.0 (2025-05-05)
- (Alan Paris) Initial release

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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