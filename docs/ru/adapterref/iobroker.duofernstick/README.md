---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.duofernstick/README.md
title: Адаптер ioBroker: DuoFern Stick
hash: /G0cooY6Zy+Er/CkRXr7EMTwAOGWzlUPIva2AS5YxAw=
---
# Адаптер ioBroker: DuoFern Stick

Этот адаптер подключает локальный **USB-накопитель Rademacher DuoFern** к ioBroker. Он предназначен для установок, где устройства DuoFern должны быть интегрированы локально без использования дополнительного облачного сервиса.

## Функции

- Последовательное соединение с USB-накопителем Rademacher DuoFern
- Настройка последовательного порта, скорости передачи данных и последовательного порта адаптера в административной панели ioBroker.
- Приём и анализ телеграмм DuoFern
- Автоматическое создание обнаруженных устройств ниже. `devices.*`
- Каталог устройств и возможностей для многих классов устройств DuoFern
- Обработка состояний для жалюзи, трубчатых двигателей, приводов, диммеров, датчиков, пультов дистанционного управления и термостатов.
- Управляйте состояниями сопряжения, распараллеливания, трансляции статуса и отправкой необработанных телеграмм.
- Частичное обновление состояния во избежание перезаписи существующих значений неполными данными телеграммы.
- Защита от непреднамеренного сброса `runningTime` к `0`
- Дополнительная запись необработанных телеграмм в журнал для диагностики.

## Поддерживаемые классы устройств

Адаптер содержит каталог устройств и возможностей для нескольких классов устройств DuoFern, включая:

| Класс устройства                               | Примеры                                                                                                 |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Ставни / ременные намотчики                    | RolloTron Standard, RolloTron Comfort Master/Lave                                                       |
| Трубчатые двигатели                            | Трубчатый двигатель, исполнительный механизм трубчатого двигателя, контроллер трубчатого двигателя      |
| жалюзи                                         | Troll Comfort, Troll Basis, привод Connect                                                              |
| Исполнительные механизмы                       | Универсальный привод, привод для розеток, приводы для светильников и выключателей.                      |
| Диммеры                                        | Привод диммирования, диммер                                                                             |
| Датчики                                        | Датчик солнца/ветра, датчик окружающей среды, датчик движения, датчик дыма, датчик открытия окна/двери. |
| Пульты дистанционного управления / передатчики | Ручной передатчик, настенный выключатель, HomeTimer, встраиваемый передатчик                            |
| Обогрев                                        | Комнатный термостат, привод радиатора                                                                   |
| Ворота / специальные устройства                | SX5 / контроллер ворот                                                                                  |

В зависимости от типа обнаруженного устройства создаются только подходящие или наблюдаемые состояния. Это позволяет избежать отображения каждого теоретического состояния для каждого устройства.

## Требования

- ioBroker с js-controller 6.0.11 или более новой версии
- Node.js 22 или более поздняя версия
- ioBroker Admin 7.6.20 или более поздняя версия
- USB-накопитель Rademacher DuoFern
- Доступ к последовательному интерфейсу USB-накопителя.

В Linux процессу ioBroker необходимы разрешения на доступ к последовательному устройству. Обычно используются следующие пути:

```text
/dev/ttyUSB0
/dev/serial/by-id/usb-Rademacher_DuoFern_USB-Stick-if00-port0
```

Используя конюшню `/dev/serial/by-id/` Рекомендуется использовать именно этот путь, поскольку он обычно остается неизменным после перезагрузки или повторного подключения USB-накопителя.

## Установка

Установите адаптер через административную панель ioBroker, используя пользовательскую установку адаптера с URL-адреса GitHub или из загруженного файла пакета.

После установки:

1. Создайте экземпляр адаптера с именем `duofernstick.0`.
2. Откройте конфигурацию адаптера.
3. Введите правильный последовательный порт USB-накопителя DuoFern.
4. Запустите адаптер.
5. Проверьте состояние соединения по адресу `duofernstick.0.info.connection`.

## Конфигурация

Основные настройки доступны на странице конфигурации администратора экземпляра адаптера.

| Параметр                                     | Описание                                                                                                                 |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `port`                                       | Последовательный порт USB-накопителя DuoFern (выбирается из списка обнаруженных портов)                                  |
| `baudRate`                                   | Скорость передачи данных, по умолчанию: `115200`                                                                         |
| `dongleSerial`                               | 6-значный код радиомодуля DuoFern, начинающийся с `6F` (не серийный номер USB)                                            |
| `deviceCodes`                                | Известные коды устройств (разделенные запятыми или FHEM) `define` строки)                                                 |
| `autoCreate`                                 | Автоматическое создание обнаруженных устройств                                                                           |
| `initOnStart`                                | Отправьте последовательность инициализации DuoFern при запуске.                                                          |
| `statusOnStart`                              | Запросить состояние устройства при запуске адаптера.                                                                     |
| `statusAfterCommand`                         | Запрос состояния устройства после выполнения команд движения/управления.                                                 |
| `periodicStatusPoll` /`periodicStatusPollMs` | Циклический опрос состояния всех известных исполнительных механизмов, по умолчанию каждые 5 минут.                       |
| `externalActivityPollAll`                    | Опрашивать известные исполнительные механизмы после получения телеграмм от пульта дистанционного управления или датчика. |
| `invertPosition`                             | Используйте соглашение ioBroker для блайндов (0 % = закрыто, 100 % = открыто) вместо соглашения DuoFern (0 % = открыто). |
| `debugRaw`                                   | Записывайте необработанные телеграммы для диагностики.                                                                   |

DuoFern использует диапазон 868 МГц с коэффициентом заполнения 1%. Очень короткие интервалы опроса при большом количестве устройств могут превышать допустимое время передачи данных; поэтому запросы состояния ставятся в очередь с низким приоритетом, без дубликатов и с ограничением количества запросов, в то время как команды пользователя всегда отправляются первыми.

## Структура объекта

Адаптер создает следующее основное дерево объектов:

```text
duofernstick.0
├── info
│   ├── connection          (true after successful stick init)
│   ├── dongleSerial
│   ├── rawRx / rawTx
│   ├── lastParsed / lastStatusDecode
│   └── lastError
├── status.state
├── queue.pending / queue.active
├── pair.mode
├── commands
│   ├── pair / unpair
│   ├── statusBroadcast
│   ├── reopen
│   ├── raw
│   ├── remotePair
│   ├── addDeviceCode
│   └── cleanupUnusedDeviceStates
└── devices
    └── <deviceCode>
        ├── raw, lastSeen, deviceClass, deviceProfile, stateText
        ├── command
        ├── up, down, stop, position, ...
        └── control.*
```

Точное количество состояний зависит от типа обнаруженного устройства.

## государства централизованного контроля

### Начать сопряжение

```text
duofernstick.0.commands.pair = true
```

Запускает режим сопряжения устройства.

### Начать отмену сопряжения

```text
duofernstick.0.commands.unpair = true
```

Запускает режим отмены сопряжения устройства.

### Отправить широковещательное сообщение о состоянии

```text
duofernstick.0.commands.statusBroadcast = true
```

Запрашивает информацию о состоянии у известных или доступных устройств.

### Отправить телеграмму в необработанном виде

```text
duofernstick.0.commands.raw = <HEX_TELEGRAM>
```

Отправляет необработанную телеграмму в виде шестнадцатеричной строки. Предназначена в основном для диагностики и разработки.

## Управление устройством

В зависимости от типа устройства могут быть доступны следующие состояния записи:

| Состояние       | Значение                            |
| --------------- | ----------------------------------- |
| `up`            | Поднимите ставни или жалюзи         |
| `down`          | Опустите ставни или жалюзи.         |
| `stop`          | Остановить текущее движение         |
| `toggle`        | Команда переключения                |
| `position`      | Целевая позиция в процентах         |
| `getStatus`     | Запрос состояния устройства         |
| `manualMode`    | Ручной режим                        |
| `timeAutomatic` | Автоматизация времени               |
| `sunAutomatic`  | Автоматизация Солнца                |
| `duskAutomatic` | Автоматизация наступления сумерек   |
| `dawnAutomatic` | Автоматизация рассвета              |
| `windAutomatic` | автоматизация ветроэнергетики       |
| `rainAutomatic` | автоматизация дождя                 |
| `level`         | Уровень затемнения или переключения |
| `state`         | Состояние переключения              |

Примеры идентификаторов штатов:

```text
duofernstick.0.devices.<deviceId>.up
duofernstick.0.devices.<deviceId>.down
duofernstick.0.devices.<deviceId>.stop
duofernstick.0.devices.<deviceId>.position
```

## Значения статуса

Типичные значения статуса "только для чтения":

| Состояние       | Описание                                                    |
| --------------- | ----------------------------------------------------------- |
| `position`      | Текущее положение в процентах                               |
| `moving`        | Направление движения: `up`, `down`, `stop` или `moving`      |
| `runningTime`   | Время выполнения в секундах                                 |
| `lastSeen`      | Отметка времени последней полученной телеграммы             |
| `raw`           | Последняя телеграмма, полученная с этого устройства.        |
| `deviceClass`   | Обнаружен класс устройств DuoFern                           |
| `deviceProfile` | Для этого устройства используется профиль команд/состояний. |

Входящие телеграммы обрабатываются как частичные обновления состояния. Если телеграмма не содержит значения, заданного во время выполнения, уже существующее значение не сбрасывается автоматически. `0`.

## Поиск неисправностей

### Адаптер не подключается к флешке.

Проверьте следующие пункты:

- Настроенный последовательный порт существует.
- Пользователь ioBroker имеет разрешение на доступ к последовательному устройству.
- USB-накопитель передается на нужный хост, в контейнер или виртуальную машину.
- Никакие другие процессы не блокируют последовательный порт.
- Скорость передачи данных настроена правильно.

Полезные команды Linux:

```text
ls -l /dev/ttyUSB*
ls -l /dev/serial/by-id/
dmesg | grep -i tty
```

### Устройства не создаются.

Проверьте следующие пункты:

- `autoCreate` включено.
- Необработанные телеграммы появляются в `info.rawRx`.
- `debugRaw` включено для диагностики.
- Было запущено действие устройства DuoFern или пульта дистанционного управления.

### Значения выглядят нестабильными или неправдоподобными

Проверьте следующие пункты:

- Определяется, обнаружено ли несколько устройств с одинаковым или некорректным идентификатором.
- Получаются ли телеграммы в полном объеме.
- Утвержден ли правильный тип устройства.
- Отвечает ли устройство активно на отправку значений состояния или только один раз после включения.

Для диагностики полезна следующая информация:

- Версия адаптера
- версия ioBroker
- Версия Node.js
- Операционная система, Docker, виртуальная машина или настройка Proxmox.
- Путь к USB-накопителю через последовательный порт
- Тип устройства DuoFern
- Соответствующие необработанные телеграммы
- Вывод логов ioBroker во время запуска и действий с устройством.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.32 (2026-10-16)

- (FreeProgrammer1) All object names are now available in all 11 ioBroker languages (new `lib/i18n.js`).
- (FreeProgrammer1) Roles now match read/write access: `targetPosition` → `value.blind`, `targetLevel` → `value.dimmer`, running times → `level.timer`, writable weather station settings → `level`.
- (FreeProgrammer1) Existing objects are corrected automatically on the next adapter start.

### 0.1.31 (2026-10-02)

- (FreeProgrammer1) Received serial data is now processed strictly in order (no parallel frame handling).
- (FreeProgrammer1) Removed a hard-coded stick radio code that was applied for one specific USB path.
- (FreeProgrammer1) Fixed lost status refresh timers after the init sequence.
- (FreeProgrammer1) `info.connection` is only `true` after a successful stick init.
- (FreeProgrammer1) Device objects are created once per runtime instead of on every telegram (far fewer object database writes).
- (FreeProgrammer1) Command queue: user commands before status polls, duplicate telegrams are skipped, status polls are limited.
- (FreeProgrammer1) Default polling interval raised to 5 minutes (existing instances keep their setting).
- (FreeProgrammer1) New option `invertPosition` for the ioBroker blind convention (100 % = open).
- (FreeProgrammer1) Serial port can be selected from a list in the admin UI.
- (FreeProgrammer1) Buttons are now `read: false`; instance objects moved to `instanceObjects`.
- (FreeProgrammer1) Removed unused modules, standard package/integration tests, release-script, full MIT license, i18n short format.

### 0.1.30

- (FreeProgrammer1) Fixes responsive jsonConfig sizes, admin translations and CI metadata for the repository checker.

### 0.1.29

- (FreeProgrammer1) Fix GitHub workflow requirements for Node.js 22/24 adapter tests, restore the recommended concurrency configuration and document the current release for the ioBroker checker.

### 0.1.28

- (FreeProgrammer1) Fix jsonConfig layout, node.js workflows and translations.

### 0.1.27

- (FreeProgrammer1) Added jsonConfig i18n files for all required ioBroker languages.
- (FreeProgrammer1) Removed legacy Materialize admin page because jsonConfig is used.
- (FreeProgrammer1) Replaced plain timers with adapter timers for ioBroker checker compliance.

Older changelog entries are kept in CHANGELOG_OLD.md.

## License

MIT License
This project is licensed under the terms of the [LICENSE](https://github.com/FreeProgrammer1/ioBroker.duofernstick/blob/main/LICENSE) file.

Copyright (c) 2026 FreeProgrammer1 freeprogrammer1@mail.de