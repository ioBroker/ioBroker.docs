---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sky-remote/README.md
title: ioBroker.sky-remote
hash: 0oMJWHO+YyxkzcHsnAyenfkq0LAJzTq0cR1eXuJbOfo=
---
# ioBroker.sky-remote

![Версия NPM](https://img.shields.io/npm/v/iobroker.sky-remote.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sky-remote.svg)
![Количество установок](https://iobroker.live/badges/sky-remote-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/sky-remote-stable.svg)
![Тестирование и выпуск](https://github.com/AlanSRU/ioBroker.sky-remote/workflows/Test%20and%20Release/badge.svg)

![Логотип](../../../en/adapterref/iobroker.sky-remote/admin/sky-remote.png)

## Адаптер Sky Remote для ioBroker

Управляйте приставками Sky Q с помощью сетевых команд.

Этот адаптер позволяет отправлять команды дистанционного управления на приставки Sky Q по вашей сети. Он предоставляет информацию о состоянии всех кнопок пульта и позволяет отправлять последовательности команд.

[Sky Q](https://www.sky.com/tv/boxes) — это телеприставка от [компании Sky](https://www.sky.com/) .

## Предварительные требования

- установка ioBroker
- Приставка Sky Q, подключенная к вашей сети.
- IP-адрес вашей приставки Sky Q

## Установка

1. Установите адаптер через административную панель ioBroker.
2. Настройте IP-адрес вашей приставки Sky Q в параметрах адаптера.
3. Запустите адаптер

## Конфигурация

В настройках адаптера необходимо выполнить следующие действия:

- IP-адрес или имя хоста вашей приставки Sky Q
- Порт (обычно 49160 для приставок Sky Q)
- Частота проверки соединения (в миллисекундах) — как часто адаптер проверяет, подключен ли Sky-приставка к сети.

### Мониторинг соединений

Адаптер периодически проверяет соединение с вашей приставкой Sky Q и обновляет её.`sky-remote.X.info.connection` Состояние. Это состояние показывает, может ли адаптер успешно подключиться к вашей приставке Sky Q:

- `true` Приставка Sky Q доступна онлайн.
- `false` Приставка Sky Q недоступна или отключена.

Вы можете использовать это состояние в своих визуализациях или скриптах для отслеживания статуса вашей приставки Sky Q.

### Поведение кнопок

Адаптер оснащен кнопками, работающими как кнопочные переключатели мгновенного действия. Они предназначены только для записи и не несут читаемого значения, поэтому кнопка срабатывает исключительно при записи.`true` к нему:

1. Вы пишете`true` к`buttons.*` состояние
2. Команда отправляется на приставку Sky Q.

Письмо`true` Повторное выполнение команды всегда перезапускает её, даже если состояние уже задано.`true` Это позволяет нажимать одну и ту же кнопку несколько раз подряд, что крайне важно для ввода номеров каналов (например, нажатие 1, 0, 2 для канала 102).

## Использование

### Штаты

Адаптер создает следующие состояния:

- `sky-remote.X.buttons.*` - Состояния для каждой кнопки пульта дистанционного управления (например,`sky-remote.0.buttons.power` ,`sky-remote.0.buttons.play` )
- `sky-remote.X.sendSequence` - Отправить последовательность команд, разделенных запятыми.

### Примеры

- Чтобы нажать кнопку питания: Установите`sky-remote.0.buttons.power` к`true`
- Чтобы перейти на канал: Установите`sky-remote.0.sendSequence` к`"1,0,6"` (для канала 106)
- Чтобы открыть телепрограмму и перемещаться по ней: Установить`sky-remote.0.sendSequence` к`"tvguide,right,right,select"`

### Доступные команды

| Командование      | Описание               |
| ----------------- | ---------------------- |
| власть            | Кнопка питания         |
| выбирать          | Кнопка «Выбрать/ОК»    |
| резервная копия   | Кнопка «Назад»         |
| канал             | Поднимите канал        |
| каналдаун         | Канал вниз             |
| интерактивный     | Интерактивная кнопка   |
| помощь            | Кнопка «Справка»       |
| услуги            | Кнопка «Сервисы»       |
| tvguide / home    | Кнопка «Телегид/Домой» |
| я                 | Кнопка информации      |
| текст             | Текстовая кнопка       |
| вверх             | Стрелка вверх          |
| вниз              | Стрелка вниз           |
| левый             | Левая стрелка          |
| верно             | Стрелка вправо         |
| красный           | Красная кнопка         |
| зеленый           | Зеленая кнопка         |
| желтый            | Желтая кнопка          |
| синий             | Синяя кнопка           |
| 0-9               | Цифровые кнопки        |
| играть            | Играть                 |
| пауза             | Пауза                  |
| останавливаться   | Останавливаться        |
| записывать        | Записывать             |
| перемотка вперед  | Перемотка вперед       |
| перемотка назад   | Перемотка назад        |
| Театральная касса | Кнопка кассы           |
| небо              | Кнопка «Небо»          |

В следующих вариантах также принимаются следующие псевдонимы.`sendSequence` (Они соответствуют тем же командам, что и кнопки выше, поэтому отдельное состояние кнопки не создается):`dismiss` (= резервная копия),`sidebar` (= интерактивный),`search` (= услуги).

## Интеграция с Blockly

В ioBroker вы можете использовать визуальный программный интерфейс Blockly для создания последовательностей команд:

1. Создайте новый скрипт Blockly.
2. Используйте блок "Установить состояние", чтобы задать значение.`sendSequence` состояние
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

- Убедитесь, что ваш ресивер Sky Q включен и подключен к сети.
- Убедитесь, что IP-адрес вашей приставки Sky Q указан правильно.
- Убедитесь, что порт 49160 открыт и доступен.
- Проверьте журналы адаптера на наличие ошибок подключения.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

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

[Older changelogs can be found there](https://github.com/AlanSRU/ioBroker.sky-remote/blob/main/CHANGELOG_OLD.md)

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