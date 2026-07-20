---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.anthbot-genie/README.md
title: ioBroker.anthbot-genie
hash: LN1kkcsY1XXsZrj7mkBHVQwe2PicpZZ0ykmDLyZ8E/c=
---
# IoBroker.anthbot-genie

![Версия на GitHub](https://img.shields.io/github/v/release/reloxx13/ioBroker.anthbot-genie)
![Версия NPM](https://img.shields.io/npm/v/iobroker.anthbot-genie.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.anthbot-genie.svg)
![ioBroker устанавливает](https://iobroker.live/badges/anthbot-genie-installed.svg)
![Лицензия](https://img.shields.io/github/license/reloxx13/ioBroker.anthbot-genie)
![фаза ioBroker](https://img.shields.io/badge/ioBroker%20phase-latest--repo-green)
![форум ioBroker](https://img.shields.io/badge/ioBroker-forum-blue)
![НПМ](https://nodei.co/npm/iobroker.anthbot-genie.png?downloads=true)

<img src="admin/anthbot-genie.png" alt="Логотип" width="80" />

[![Тестирование и выпуск](https://github.com/reloxx13/ioBroker.anthbot-genie/actions/workflows/test-and-release.yml/badge.svg?branch=main)](https://github.com/reloxx13/ioBroker.anthbot-genie/actions/workflows/test-and-release.yml)

Неофициальный адаптер ioBroker для [Роботизированные газонокосилки Anthbot Genie](https://de.anthbot.com/products/genie-mahroboter), ориентированный на подробную телеметрию, диагностику и управление газонокосилками Genie 600/1000/3000/5000 и более новыми моделями M5/M9.

Адаптер подключается к облачной учетной записи Anthbot, обнаруживает подключенные газонокосилки, считывает теневые данные из облака и IoT, а также предоставляет в ioBroker обширное дерево состояний, содержащее информацию о статусе, настройках, командах для газонокосилок, данных о зонах, расходных материалах, местоположении, диагностике и необработанных данных для устранения неполадок.

Он предназначен для пользователей, которым требуется больше, чем просто просмотр информации о состоянии устройства в режиме онлайн/заряда батареи/статуса: состояние RTK и базовой станции, сведения о прошивке и OTA-обновлениях, информация о сети и SIM-карте, данные GPS и координаты местоположения, временные метки жизненного цикла карты, сведения об ошибках газонокосилки, сроки службы расходных материалов, настройки дождя, метаданные зон и записываемые элементы управления скашиванием доступны в виде состояний ioBroker.

Этот адаптер доступен в репозитории ioBroker `latest`. Пожалуйста, оставляйте отзывы и результаты тестирования в репозитории [ветка форума ioBroker](https://forum.iobroker.net/topic/84392).

Пример ioBroker Blockly с условиями для автоматизации газонокосилки доступен в [Пример автоматизации с помощью Blockly](https://forum.iobroker.net/topic/84392/2).

## Функции
- Вход в облако Anthbot с зашифрованным хранением паролей в собственной конфигурации ioBroker.
- Автоматическое обнаружение газонокосилок, привязанных к настроенной учетной записи Anthbot.
- Поиск региона и конечной точки IoT для каждой газонокосилки.
- Автоматическое обновление временных учетных данных IoT после ответов AWS IoT `403`
- Опрос представителей теневой экономики в сфере собственности и услуг
- Подробная информация о состоянии подключения, состоянии сети, состоянии батареи, состоянии газонокосилки, состоянии зарядки, времени кошения, площади кошения, общем времени кошения/площади, состоянии карты, состоянии задачи картирования, ошибках, активном режиме кошения, точечном кошении и количестве зон.
- Диагностические состояния для RTK-установки, базовой станции RTK, предупреждений о перемещении антенны, версий прошивки, хода OTA-обновления, Wi-Fi, сотовой связи, SIM-карты, Bluetooth, флагов камеры/карты, системы предотвращения столкновений, флагов безопасности, системных временных меток и данных об ошибках газонокосилки, хранящихся в облаке.
- Данные о местоположении для защиты от потери: GPS-координаты и локальное положение газонокосилки.
- Режимы работы расходных материалов и кнопки сброса для зарядного порта, камер и лезвий.
- Возможность изменения параметров управления для кошения по всей карте, зонального кошения, высоты среза, громкости голоса, пользовательского направления кошения, обхода препятствий, настроек на случай дождя и кошения вблизи зарядной станции.
- Команды управления для полного скашивания, остановки, возврата на зарядную станцию, паузы при возврате на зарядную станцию, сброса травы, режима обслуживания дисков, скашивания краев, скашивания возле зарядной кучи, точечного скашивания, обновления, ручного зонирования и автоматического зонирования.
- Метаданные зон, созданные вручную и автоматически, в формате JSON, включая активные идентификаторы зон, созданных вручную.
— Теневые свойства, теневые сервисы, преобразования кодов событий Anthbot и полезные нагрузки определений областей для устранения неполадок и автоматизированной отладки.

## Требования
- ioBroker с js-контроллером `>= 6.0.11`
- ioBroker admin `>= 7.6.20`
- Node.js `>= 22`
- Аккаунт Anthbot, содержащий как минимум одну привязанную газонокосилку Genie.
— Доступ в Интернет с хоста ioBroker к облаку Anthbot и конечной точке AWS IoT.

## Установка
Адаптер доступен в репозитории ioBroker `latest` и может быть установлен из представления адаптера ioBroker или из командной строки.

### Администратор ioBroker
Если репозиторий `latest` еще не активен, откройте административную панель ioBroker, перейдите в **Настройки -> Репозитории**, выберите или включите `latest` и обновите список адаптеров.

Затем откройте окно адаптера, найдите `anthbot-genie` и установите адаптер из репозитория `latest`.

### CLI
Установка с помощью:

```bash
iobroker repo set latest
iobroker update
iobroker add anthbot-genie
```

или явно с указанием версии:

```bash
iobroker add anthbot-genie@0.1.13
```

## Поддерживаемые устройства
- Genie 600
- Джинн 1000
- Genie 3000
- Genie 5000
- М5
- М9

Другие модели Anthbot могут по-прежнему работать, если они предоставляют ту же структуру облачных и теневых данных, но они пока не указаны и не задокументированы здесь явно.

## Разработка
- Команда `npm install` устанавливает зависимости среды выполнения и разработки.
- `npm run lint` проверяет стиль кода с помощью ESLint.
- Команда `npm run lint:fix` автоматически применяет исправления, которые можно устранить с помощью ESLint.
- Команда `npm run check` выполняет проверку синтаксиса TypeScript и Node.js для точки входа адаптера, модулей разделенной библиотеки и тестовых файлов.
- `npm run test:js` запускает модульные тесты.
- `npm run test:package` запускает тесты проверки пакета.
- `npm run test:integration` запускает интеграционные тесты.
- Команда `npm run test` запускает `check`, модульные тесты и проверку пакетов.
- `npm run check:repo` запускает средство проверки репозитория ioBroker.
- `npm run translate` запускает рабочий процесс перевода адаптера ioBroker adapter-dev.
- Команда `npm run release` создает новый релиз пакета ioBroker.

## Переводы
- Переводы Admin/JSON Config находятся в файле `admin/i18n/<lang>.json`.
- Перевод имен объектов бэкенда/среды выполнения осуществляется непосредственно в файле `i18n/<lang>.json`.
— После добавления или удаления переводимых строк обновите исходные файлы на английском языке и запустите `npm run translate`, чтобы в будущем синхронизация Weblate и adapter-dev оставалась согласованной.

## Конфигурация
Откройте конфигурацию экземпляра адаптера в административной панели ioBroker и установите следующие параметры:

| Настройки | Описание | По умолчанию |
| --- | --- | --- |
| Имя пользователя аккаунта Anthbot | Имя пользователя или адрес электронной почты аккаунта Anthbot | пусто |
| Пароль от аккаунта Anthbot | Пароль от аккаунта Anthbot, хранящийся в зашифрованном виде через ioBroker | пусто |
| Код города | Код города телефона или учетной записи, например, `49` для Германии | `49` |
| Интервал опроса в секундах | Интервал опроса данных газонокосилки. Адаптер обеспечивает интервал не менее 10 секунд. | `60` |
| Язык описания ошибок | Язык, используемый для описания ошибок в облаке Anthbot | `English` |
| Язык описания ошибок | Язык, используемый для описания ошибок в облаке Anthbot | `Английский` |

После сохранения конфигурации запустите или перезапустите экземпляр адаптера.

## Штаты
Адаптер создает отдельное дерево устройств для каждого серийного номера газонокосилки. Если Anthbot когда-либо вернет серийный номер с символами, небезопасными для идентификаторов объектов ioBroker, адаптер нормализует только эти символы, сохраняя при этом исходный серийный номер в собственных метаданных объекта устройства:

```text
anthbot-genie.<instance>.<serial>.*
```

### Информация
| Штат | Тип | Описание |
| --- | --- | --- |
| `info.connection` | логическое значение | Состояние глобального облачного подключения адаптера |
| `<serial>.info.model` | строка | Модель/категория газонокосилки |
| `<serial>.info.region` | строка | Регион Anthbot/AWS IoT |
| `<serial>.info.endpoint` | строка | Конечная точка IoT, используемая для теневого доступа |
| `<serial>.info.online` | логическое значение | Состояние сети, сообщаемое газонокосилкой |
| `<serial>.info.charging` | логическое значение | Заряжается ли газонокосилка в данный момент |
| `<serial>.info.lastServiceCommand` | строка | Последняя зарегистрированная команда службы |
| `<serial>.info.lastPoll` | строка | ISO-метка времени последнего успешного опроса |
| `<serial>.info.lastPoll` | строка | ISO-метка времени последнего успешного опроса |

### Метрики
| Штат | Тип | Единица измерения | Описание |
| --- | --- | --- | --- |
| `<serial>.metrics.batteryLevel` | номер | `%` | Уровень заряда батареи |
| `<serial>.metrics.status.robotRaw` | строка | | Исходный статус робота |
| `<serial>.metrics.status.modeRaw` | строка | | Исходный статус `mode.value`, сообщаемый моделями M5/M9 |
| `<serial>.metrics.mowing.time` | номер | `s` | Заявленное время кошения |
| `<serial>.metrics.mowing.area` | номер | `m2` | Сообщенная площадь скашивания |
| `<serial>.metrics.mowing.totalTime` | номер | `s` | Общее время кошения, указанное моделями M5/M9 |
| `<serial>.metrics.mowing.totalArea` | номер | `m2` | Общая площадь скашивания, указанная моделями M5/M9 |
| `<serial>.metrics.mowing.borderActive` | логическое значение | | Активна покос травы по периметру |
| `<serial>.metrics.mowing.nearChargerActive` | логическое значение | | Активна функция кошения рядом с зарядным устройством |
| `<serial>.metrics.mowing.fullYardActive` | логическое значение | | Скашивание всего двора активно |
| `<serial>.metrics.pointMowing.active` | логическое значение | | Точечное скашивание активно |
| `<serial>.metrics.pointMowing.x` | номер | | Координата X последней точки кошения |
| `<serial>.metrics.pointMowing.y` | номер | | Координата Y последней точки кошения |
| `<serial>.metrics.zones.manualCount` | номер | | Количество зон, управляемых вручную |
| `<serial>.metrics.zones.autoCount` | номер | | Количество автоматических зон |
| `<serial>.metrics.map.totalArea` | номер | `m2` | Общая площадь, отображенная на карте |
| `<serial>.metrics.map.status` | строка | | Статус исходной карты |
| `<serial>.metrics.map.mappingTaskState` | строка | | Состояние задачи сопоставления, сообщаемое моделями M5/M9 |
| `<serial>.metrics.error.code` | номер | | Код ошибки последней косилки |
| `<serial>.metrics.error.description` | строка | | Удобочитаемое описание ошибки из кэшированного списка кодов событий Anthbot, если оно известно |
| `<serial>.metrics.error.active` | логическое значение | | Активна ли ненулевая ошибка косилки |
| `<serial>.metrics.error.active` | логическое значение | | Активна ли ненулевая ошибка газонокосилки |

Адаптер сохраняет одно и то же дерево состояний для всех поддерживаемых моделей газонокосилок. На моделях, которые не предоставляют поля полезной нагрузки, специфичные для M5/M9, состояния `metrics.status.modeRaw`, `metrics.mowing.totalTime`, `metrics.mowing.totalArea` и `metrics.map.mappingTaskState` по-прежнему создаются, но остаются пустыми или `null`.

### Расположение
| Штат | Тип | Описание |
| --- | --- | --- |
| `<serial>.location.gps.latitude` | номер | Широта GPS, полученная из данных о местоположении с защитой от потери |
| `<serial>.location.pose.x` | номер | Положение косилки по оси X |
| `<serial>.location.pose.y` | номер | Положение косилки по оси Y |
| `<serial>.location.pose.yaw` | номер | Локальное положение косилки, угол поворота |
| `<serial>.location.pose.type` | строка | Сообщенный тип позы |
| `<serial>.location.pose.type` | string | Сообщенный тип позы |

### Диагностика
Канал `diagnostics` предоставляет данные для устранения неполадок, доступные только для чтения, полученные из тени газонокосилки, включая состояние RTK, базовое состояние RTK, флаги камеры/карты/сети, предотвращение столкновений, версии прошивки, ход обновления по воздуху (OTA), сведения о Wi-Fi/SIM-карте, временные метки и следующую встречу. На моделях M5/M9 адаптер также сопоставляет `net_config.*`, `mode.value`, `error.value`, `map.map_area`, `mapping_task.state`, `mowing_time.value` и `mowing_area.value` с существующим деревом состояний ioBroker, где значения совпадают.

### Расходные материалы
| Штат | Тип | Единица измерения | Описание |
| --- | --- | --- | --- |
| `<serial>.consumable.chargingPort.life` | номер | `%` | Срок службы зарядного порта |
| `<serial>.consumable.cameras.life` | номер | `%` | Срок службы камер |
| `<serial>.consumable.cameras.reset` | логическое значение | | Сбросить срок службы камер |
| `<serial>.consumable.blades.life` | номер | `%` | Срок службы лопастей |
| `<serial>.consumable.blades.reset` | логическое значение | | Сбросить срок службы лезвий |
| `<serial>.consumable.blades.reset` | логическое значение | | Сбросить срок службы лезвий |

Газонокосилка принимает команды сброса расходных материалов только тогда, когда соответствующий ресурс расходного материала равен 5% или ниже.

### Элементы управления
Записываемые состояния управления обновляют настройки газонокосилки через теневой сервис Anthbot IoT. Адаптер обрабатывает кодирование полезной нагрузки теневого сервиса, специфичное для каждой модели, внутри себя, поэтому одни и те же состояния управления ioBroker могут использоваться для всех поддерживаемых моделей газонокосилок.

| Штат | Тип | Диапазон | Описание |
| --- | --- | --- | --- |
| `<serial>.controls.fullMapMowing.mowHeight` | номер | `30..70 mm`, шаг 5 мм | Установить высоту среза по всей карте |
| `<serial>.controls.fullMapMowing.customMowingDirection` | номер | `0..180 deg` | Установить пользовательское направление скашивания на всей карте |
| `<serial>.controls.fullMapMowing.customMowingDirectionEnabled` | логическое значение | `true`/`false` | Включить или отключить настройку направления скашивания на всей карте |
| `<serial>.controls.zoneMowing.mowHeight` | номер | `30..70 mm`, шаг 5 мм | Установка высоты скашивания в зоне |
| `<serial>.controls.zoneMowing.mowCount` | номер | `1..3` | Установить количество проходов скашивания в зоне |
| `<serial>.controls.zoneMowing.customMowingDirection` | номер | `0..180 deg` | Установить направление скашивания зоны |
| `<serial>.controls.zoneMowing.customMowingDirectionEnabled` | логическое значение | `true`/`false` | Включить или отключить направление скашивания зоны |
| `<serial>.controls.zoneMowing.obstacleAvoidanceEnabled` | логическое значение | `true`/`false` | Включить или отключить предотвращение столкновений в зоне |
| `<serial>.controls.zoneMowing.obstacleAvoidanceLevel` | номер | `0..2` | Установить уровень обхода препятствий в зоне |
| `<serial>.controls.voiceVolume` | номер | `0..100 %` | Установить громкость голоса |
| `<serial>.controls.rain.perceptionEnabled` | логическое значение | `true`/`false` | Включить или отключить отображение дождя |
| `<serial>.controls.rain.continueTimeHours` | число | `0..8 h` | Установить время продолжения дождя в часах |
| `<serial>.controls.nearChargerMowing.enabled` | логическое значение | `true`/`false` | Включить или отключить кошение рядом с зарядной площадкой |
| `<serial>.controls.nearChargerMowing.mowHeight` | номер | `30..70 mm`, шаг 5 мм | Установить высоту скашивания для кошения рядом с загрузочной площадкой |
| `<serial>.controls.nearChargerMowing.mowCount` | номер | `1..3` | Разместите проходы кошения рядом с накопительной площадкой |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceEnabled` | логическое значение | `true`/`false` | Включить или отключить предотвращение столкновений с препятствиями вблизи зарядной станции |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceLevel` | номер | `0..2` | Установить уровень обхода препятствий вблизи зарядной станции |
| `<serial>.controls.nearChargerMowing.obstacleAvoidanceLevel` | number | `0..2` | Установить уровень предотвращения столкновений с препятствиями возле зарядной станции |

### Команды
Состояния команд доступны для записи. Состояния кнопок сбрасываются до `false` после выполнения. Состояния команд зон сбрасываются до пустой строки после выполнения. Расходные кнопки сброса доступны в разделе `consumable`.

| Штат | Тип | Описание |
| --- | --- | --- |
| `<serial>.commands.device.find` | логическое значение | Найти робота |
| `<serial>.commands.device.cancelRtkAntennaMoved` | логическое значение | Отменить предупреждение о перемещении RTK-антенны |
| `<serial>.commands.docking.startReturn` | логическое значение | Вернуться на зарядную станцию |
| `<serial>.commands.docking.pauseReturn` | логическое значение | Пауза | Возврат к зарядной станции |
| `<serial>.commands.maintenance.startGrassDump` | логическое значение | Начать сброс травы |
| `<serial>.commands.maintenance.startDiskMaintenance` | логическое значение | Запустить режим обслуживания диска |
| `<serial>.commands.mowing.startFullMap` | логическое значение | Начать покос всей карты |
| `<serial>.commands.mowing.startZone` | строка | Начать кошение одной или нескольких зон вручную |
| `<serial>.commands.mowing.startAutoZone` | строка | Начать скашивание одной или нескольких автоматических зон |
| `<serial>.commands.mowing.startPoint` | строка | Начальная точка кошения с `x,y` или `{"x":123,"y":456}` |
| `<serial>.commands.mowing.startEdge` | логическое значение | Начать косить по краю |
| `<serial>.commands.mowing.startNearCharger` | логическое значение | Начать косить рядом с зарядной площадкой |
| `<serial>.commands.mowing.pause` | логическое значение | Приостановить кошение |
| `<serial>.commands.mowing.resume` | логическое значение | Возобновить стрижку |
| `<serial>.commands.mowing.stop` | логическое значение | Остановить все задачи газонокосилки |
| `<serial>.commands.mowing.end` | логическое значение | Завершить кошение |
| `<serial>.commands.mowing.stopPoint` | логическое значение | Точка остановки скашивания |
| `<serial>.commands.mowing.stopPoint` | логическое значение | Точка остановки кошения |

Доступность `commands.maintenance.startDiskMaintenance`, `commands.maintenance.startGrassDump`, `commands.mowing.startEdge`, `commands.mowing.startNearCharger` и `commands.mowing.startPoint` может зависеть от модели газонокосилки, прошивки, текущего режима работы газонокосилки и данных карты/края.

### Зоны
| Штат | Тип | Описание |
| --- | --- | --- |
| `<serial>.zones.manual.list` | Строка JSON | Известные зоны, созданные вручную/пользовательские |
| `<serial>.zones.autoList` | Строка JSON | Известные автоматические/региональные зоны |
| `<serial>.zones.autoList` | Строка JSON | Известные автоматические/региональные зоны |

### Исходные данные
| Штат | Тип | Описание |
| --- | --- | --- |
| `<serial>.raw.shadow.property` | Строка JSON | Теневая полезная нагрузка исходных свойств |
| `<serial>.raw.shadow.event-code` | Строка JSON | Кэшированная полезная нагрузка преобразования кода события Anthbot, используемая для описания ошибок |
| `<serial>.raw.areaDefinition` | Строка JSON | Полезная нагрузка определения исходной области |
| `<serial>.raw.areaDefinition` | Строка JSON | Полезная нагрузка определения необработанной области |

## Зонная стрижка
Адаптер обеспечивает доступ к ручным/настраиваемым зонам косилки в следующих местах:

```text
<instance>.<serial>.zones.manual.list
```

В этом штате содержится JSON-массив с известными зонами. Используйте `id` или точно `name` из этого списка, чтобы начать косить.

Запишите выделенный фрагмент в:

```text
<instance>.<serial>.commands.mowing.startZone
```

Допустимые значения:

- одна зона по ID: `3`
- одна зона по названию: «Передний двор»
- Несколько зон в виде идентификаторов или названий, разделенных запятыми: `3,5,Задний двор`
- Несколько зон в виде массива JSON: `[3,5,"Задний двор"]`

После успешной записи адаптер отправляет `custom_area_mow_start` с соответствующими идентификаторами зон, указанными вручную, и снова очищает `commands.mowing.startZone`.

Автоматические зоны работают аналогичным образом:

```text
<instance>.<serial>.zones.autoList
<instance>.<serial>.commands.mowing.startAutoZone
```

Для автоматических зон адаптер преобразует выбранные идентификаторы или имена зон в координаты зоны и отправляет `region_mow_start`.

## Поиск неисправностей
### Адаптер не подключается
— Проверьте имя пользователя, пароль и код города.
— Убедитесь, что газонокосилка отображается в приложении Anthbot с той же учетной записью.
— Повысьте уровень логирования адаптера до `debug` и перезапустите экземпляр.
- Проверьте `anthbot-genie.<instance>.info.connection`.

### Объекты газонокосилки не создаются
- В учетной записи Anthbot должна быть как минимум одна подключенная газонокосилка.
— Проверьте журнал адаптера на наличие сообщения «Для этой учетной записи не найдено устройств Anthbot».
— Убедитесь, что хост ioBroker имеет доступ к интернету.

### Команды не работают
— Сначала проверьте, работает ли опрос состояния.
— Убедитесь, что целевой штат соответствует правильному серийному номеру газонокосилки.
- Для команд зон сравните записанное значение с идентификаторами и именами в `zones.manual.list` или `zones.autoList`.
— Адаптер автоматически обновляет временные учетные данные IoT один раз после ошибки AWS IoT `403`; если команды по-прежнему не выполняются после этой повторной попытки, проверьте журнал адаптера на наличие ошибок, специфичных для модели устройства или состояния газонокосилки.
— Проверьте `raw.shadow.service` и журнал адаптера на наличие ошибок команд.

## Благодарности
Особая благодарность сообществу разработчиков Anthbot Genie, благодаря которым стало гораздо проще понять облачные потоки Anthbot и сопоставление команд:

- [vincentjanv](https://github.com/vincentjanv/anthbot_genie_ha)
- [AdrianTIonut](https://github.com/AdrianTIonut/anthbot_genie_ha)

Особая благодарность [@Riza-Aslan](https://github.com/Riza-Aslan) за исследования по поддержке M5/M9 и работу по сопоставлению полезной нагрузки, которые легли в основу этого обновления адаптера.

Этот адаптер ioBroker — независимый проект, но он основан на исследованиях и идеях реализации общедоступных API, полученных в ходе работы сообщества.

## Юридическое уведомление
Данный проект является неофициальным и не связан с компанией Anthbot, не поддерживается ею, не спонсируется ею и не одобрен ею.

Названия, товарные знаки и логотипы Anthbot и Genie принадлежат их соответствующим владельцам. Подробности см. в [УВЕДОМЛЕНИЕ.md](NOTICE.md).

Более старые записи в журнале изменений архивированы в [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.1.13 (2026-06-08)

- Add M5/M9 payload parity for status, battery, error, network, RTK, map, and total mowing metrics while keeping the existing ioBroker state tree stable.
- Refresh temporary IoT credentials once on AWS IoT `403` responses and retry the failed shadow read or command publish automatically.
- Refactor the large adapter sources into focused CommonJS modules for Anthbot cloud/shadow clients, payload helpers, adapter object definitions, state derivation, and command handling without changing state IDs or command payload behavior.
- Expand `npm run check` so syntax validation covers the split `lib/anthbot`, `lib/adapter`, and unit test files through the dedicated syntax-check helper.

### 0.1.12 (2026-06-06)

- (reloxx13) **FIXED**: Create the global `info` channel and correct the mower status role so the adapter object structure passes ioBroker review checks.

### 0.1.11 (2026-06-06)

- Refresh existing mower device/channel/state objects with `extendObjectAsync` so updated runtime i18n names are applied to already-created objects, not only new ones.

### 0.1.10 (2026-06-06)

- Align ioBroker object metadata with the repository object-structure checker by creating the global `info` channel, correcting the mower status role, and emitting full recommended i18n keys for object names.
- Keep admin translations in the repository-checker-friendly `admin/i18n/<lang>.json` layout and load backend/runtime object-name translations from root `i18n/<lang>.json` files via adapter-core `I18n`.

### 0.1.9 (2026-06-06)

- Drop the temporary `--legacy-peer-deps` GitHub Actions install override now that the lockfile supports plain `npm ci` again.
- Re-enable ESLint in the GitHub Actions quick-check job and align the local lint config with the checked JavaScript codebase.
- Clean up repository metadata so local `repochecker` no longer reports actionable findings.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 reloxx13

See [LICENSE](LICENSE) for details.