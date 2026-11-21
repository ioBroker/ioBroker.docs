---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nuki-local/README.md
title: ioBroker.nuki-local
hash: HGenMER1vozsrndQXszxbjs8Gd9RYRtmFeoZ9eftQyw=
---
# ioBroker.nuki-local

Локальная интеграция Nuki Smart Lock с ioBroker с использованием встроенного MQTT-брокера.

Информация о производителе и продукте: [Nuki](https://nuki.io/) .

Адаптер предназначен для прямой локальной связи с совместимыми умными замками Nuki по протоколу MQTT. При желании можно включить веб-API Nuki для обогащения локальных данных MQTT именами авторизации и информацией об активности.

## Функции

- Интегрированный MQTT-брокер
- Локальная связь с умными замками Nuki.
- Отдельный MQTT-брокер не требуется.
- Аутентификация MQTT с использованием имени пользователя и пароля.
- Постоянное сохранение данных MQTT с использованием LevelDB
- Автоматическое восстановление сохраненных состояний Nuki после перезапуска адаптера.
- Автоматическое создание устройств
- Статус блокировки
- Состояние датчика двери
- Информация о батарее
- Информация о прошивке
- Тип устройства
- Статус онлайн
- Команды блокировки/разблокировки/отсоединения
- Команды Lock'n'Go
- Обнаружение отпечатков пальцев
- Обнаружение кода клавиатуры
- Настраиваемое сопоставление идентификатора кода с именем пользователя
- Дополнительная интеграция с Nuki Web API.
- Информация о деятельности
- Динамические значки состояния
- Локальная работа остается доступной даже при отключении веб-API Nuki.

## Установка

Установите адаптер через административный интерфейс ioBroker, как только он станет доступен в репозитории ioBroker.

## Конфигурация MQTT

Порт MQTT по умолчанию:

```text
1883
```

Имя пользователя MQTT по умолчанию:

```text
nuki
```

Настройте одно и то же имя пользователя и пароль MQTT в приложении Nuki.

Используйте IP-адрес сервера ioBroker в качестве MQTT-брокера.

Пример:

```text
Broker: 192.168.178.124
Port: 1883
Username: nuki
Password: your configured password
```

## сохранение MQTT

Сохраненные состояния MQTT хранятся с использованием LevelDB.

Пример каталога для сохранения данных:

```text
/opt/iobroker/iobroker-data/nuki-local.0/mqtt-leveldb
```

После перезапуска адаптер автоматически восстанавливает сохраненные состояния Nuki.

## Структура объекта

Каждое устройство Nuki создается следующим образом:

```text
nuki-local.0.<NUKI-ID>
```

Структура:

```text
<NUKI-ID>
├── activity
├── advanced
├── battery
├── commands
├── device
├── keypad
├── status
└── raw
```

## Статус

Доступные состояния включают:

```text
status.lockState
status.lockStateText
status.locked
status.doorState
status.doorStateText
status.doorOpen
status.timestamp
status.iconState
status.icon
```

## Батарея

```text
battery.percent
battery.critical
battery.charging
battery.keypadCritical
battery.doorSensorCritical
```

## Информация об устройстве

```text
device.name
device.firmware
device.deviceType
device.mode
device.online
```

## Удаление старого устройства

Чтобы навсегда удалить старую блокировку и сохраненные на ней данные MQTT:

1. Отключите старый замок от MQTT или выключите его.
2. Если веб-API включен, снимите старую блокировку с Nuki Web.
3. В административной панели ioBroker откройте раздел «Объекты» и найдите старое устройство по его идентификатору Nuki ID.
4. Откройте выбранное устройство `maintenance` канал.
5. Набор `maintenance.confirmRemoval` к `true` с `ack=false`.
6. В течение 30 секунд установите `maintenance.removeDevice` к `true` с `ack=false`.

Подтверждение позволяет выполнить только одно удаление. Оно сбрасывается после использования, через 30 секунд, если явно установлено значение «false» или при перезагрузке адаптера. Без действительного подтверждения удаление отклоняется.

предыдущий `commands.removeDevice` Объект удаляется во время инициализации устройства. Старый путь выполнения команды больше не приводит к удалению.

Это действие немедленно удаляет дерево объектов выбранного устройства и сохраненные темы MQTT. Данные устройства сохраняются. Это действие необратимо.

Обработка удаленного устройства приостанавливается до перезагрузки адаптера. После перезагрузки может быть вновь обнаружена блокировка, которая продолжает публиковать данные MQTT или по-прежнему отображается в Nuki Web.

Не следует удалять весь каталог LevelDB, чтобы удалить отдельное устройство.

## Команды

Ниже приведены доступные команды:

```text
nuki-local.0.<NUKI-ID>.commands
```

### Замок

```text
commands.lock
```

Внутри компании:

```text
lockAction = 2
```

### Разблокировать

```text
commands.unlock
```

Внутри компании:

```text
lockAction = 1
```

Это позволяет разблокировать замок без необходимости намеренно дергать защелку.

### Отстегнуть

```text
commands.unlatch
```

Внутри компании:

```text
lockAction = 3
```

### Lock'n'Go

```text
commands.lockNgo
```

Внутри компании:

```text
lockAction = 4
```

### Lock'n'Go с функцией отпирания

```text
commands.lockNgoUnlatch
```

Внутри компании:

```text
lockAction = 5
```

### Полная блокировка

```text
commands.fullLock
```

Внутри компании:

```text
lockAction = 6
```

## Клавиатура и сканер отпечатков пальцев

Процессы адаптера `lockActionEvent` сообщения.

Пример:

```text
3,0,195249,8193,2
```

Поля:

```text
action
trigger
authId
codeId
source
```

Источник клавиатуры:

```text
0 = Back button
1 = Keypad code
2 = Fingerprint
```

Соответствующие штаты ioBroker:

```text
keypad.lastType
keypad.lastUser
keypad.lastTimestamp
```

## Настраиваемые пользователи клавиатуры

Пользователи могут настроить Nuki. `codeId` присвоить пользовательское имя в конфигурации адаптера.

Пример:

```text
Code ID   Name
8193      User 1
8192      User 2
```

Названия не заданы в адаптере жестко.

Приоритет разрешения:

```text
1. Configured Code-ID mapping
2. Nuki Web API authorization name
3. Technical fallback
```

## Активность

```text
activity.lastAction
activity.lastActionText
activity.lastUser
activity.lastDate
```

## Расширенные данные

```text
advanced.authId
advanced.codeId
advanced.source
advanced.trigger
advanced.smartlockId
advanced.serverState
advanced.authorizations
```

## Необработанные данные MQTT

Ниже хранятся неизвестные темы MQTT:

```text
raw
```

Это поможет в отладке и в дальнейшем в поддержке данной темы.

## Nuki Web API

Интеграция веб-API является необязательной.

MQTT остается основным методом локальной связи.

Веб-API может предоставлять дополнительную информацию, такую как:

- имена авторизации
- журналы активности
- информация об устройстве на стороне облака

Если веб-API недоступен, адаптер продолжает работать локально.

## Динамические значки

Доступные состояния:

```text
status.iconState
status.icon
```

Возможные значения:

```text
locked
unlocked
door_open
door_closed
charging
pairing
unknown
```

Файлы значков хранятся в следующем каталоге:

```text
admin/icons/Nuki_Vis/
```

Файлы:

```text
nuki_locked.png
nuki_unlocked.png
nuki_door_open.png
nuki_door_closed.png
nuki_charging.png
nuki_pairing.png
nuki_unknown.png
```

Пример пути к значку:

```text
/adapter/nuki-local/icons/Nuki_Vis/nuki_locked.png
```

## Безопасность

Используйте надежный пароль для MQTT.

Не предоставляйте прямой доступ к встроенному MQTT-брокеру через общедоступный интернет.

Рассматривайте токен Nuki Web API как секретный ключ.

PIN-коды клавиатуры намеренно не сохраняются адаптером.

## Поиск неисправностей

Показать журналы адаптера:

```bash
iobroker logs nuki-local.0 --watch
```

Загрузите файлы адаптера:

```bash
iobroker upload nuki-local
```

Перезапуск:

```bash
iobroker restart nuki-local.0
```

## Changelog

### 0.1.8 (2026-11-18)

- (helfi9999) Fixed the connection indicator so it turns green only when a Nuki connects via MQTT and resets when the last lock disconnects.
- (helfi9999) Added tests for rejected MQTT credentials and connections with multiple locks.

### 0.1.7 (2026-11-15)

- (helfi9999) Updated aedes-persistence-level to 9.2.0 and @iobroker/testing to 6.3.2.
- (helfi9999) Updated locked follow-redirects and node-forge dependencies to address reported vulnerabilities.
- (helfi9999) Switched Dependabot auto-merge to pull_request and removed the obsolete workflow backup.

### 0.1.6 (2026-10-30)

- (helfi9999) Moved device removal to a separate maintenance channel.
- (helfi9999) Required a one-time confirmation valid for 30 seconds before deletion.
- (helfi9999) Removed the legacy deletion button and disabled its command path.
- (helfi9999) Added tests for missing, expired and revoked confirmations and the disabled legacy command.

### 0.1.5 (2026-10-28)

- (helfi9999) Added a device removal command that deletes the selected device's objects and retained MQTT data.
- (helfi9999) Serialized MQTT and Web API object updates per device to coordinate device removal.
- (helfi9999) Added an isolated device removal test with persistent storage.

### 0.1.4 (2026-10-10)

- (helfi9999) Added readable fingerprint and keypad access logs with device name, user name and action.

- (helfi9999) Moved raw MQTT messages to debug logging.
- (helfi9999) Added readable lock and door state change logs using the device name, suppressing duplicate and initial states.

### 0.1.3 (2026-10-04)

- (helfi9999) Replaced the default adapter icon with a custom Nuki icon.
- (helfi9999) Limited the Web API polling interval to 60–86400 seconds and prevented overlapping updates.
- (helfi9999) Corrected access and activity date roles and removed an unused translation key.
- (helfi9999) Reset the code ID when importing Web API activity data.

- (helfi9999) Changed state texts to English and completed configuration label translations.
- (helfi9999) Corrected command button, authorization JSON and timestamp roles.
- (helfi9999) Added a Web API request timeout and MQTT device ID validation.
- (helfi9999) Updated Aedes, Node.js types, testing tools and transitive dependencies.
- (helfi9999) Added Node.js 26 testing and updated the workflow check action.
- (helfi9999) Updated documentation, keywords and maintainer contact information.
- (helfi9999) Adapter requires admin >= 7.8.23 now.

### 0.1.2

- Improved publishing workflow
- Added npm trusted publishing support
- Updated package metadata and repository checks

### 0.1.0

Initial functional development version.

- Integrated MQTT broker
- MQTT authentication
- LevelDB persistence
- Retained state restore
- Smart Lock status
- Door sensor support
- Battery information
- Explicit lock actions
- Keypad code detection
- Fingerprint detection
- Configurable Code-ID user mapping
- Optional Nuki Web API
- Activity information
- Dynamic status icons

## License

[MIT License](https://github.com/helfi9999/ioBroker.nuki-local/blob/main/LICENSE)

Copyright (c) 2026 helfi9999 <helfi9999@gmail.com>