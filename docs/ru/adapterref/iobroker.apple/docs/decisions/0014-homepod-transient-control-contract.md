---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md
title: ADR 0014: Договор о временном подключении и управлении HomePod
hash: skO8nT6hDyPcUbotb8frDVM1Bkd/sOTfegoBnbLFxS4=
---
# ADR 0014: Договор о временном подключении и управлении HomePod

- Статус: принято к внедрению; управление изменено в соответствии с ADR 0015; ожидается подтверждение работоспособности реального устройства.
- Дата: 02.09.2026

## Контекст

Адаптер уже классифицирует рекламные объявления AirPlay для HomePod и HomePod mini, но отображает только количество обнаруженных классов и временную сводку от администратора. У разработчика в настоящее время нет оборудования HomePod. Поэтому первая реализация должна быть пригодна для публичного тестирования добровольцами, без утверждений о работоспособности непротестированной модели или версии программного обеспечения.

Приколотый `@basmilius/apple-sdk@0.13.4` разоблачает `HomePod` и `HomePodMini` Устройства, использующие временное сопряжение AirPlay. SDK не требует PIN-кода или постоянных учетных данных HomePod и предоставляет контроллеры состояния, воспроизведения и громкости, управляемые нажатием кнопки. Это зрелая разработка. `pyatv` В справке независимо описано дистанционное управление HomePod посредством временного сопряжения AirPlay без сохранения учетных данных.

## Решение

Предлагайте только одного подходящего кандидата на роль HomePod, если в результате сканирования будут получены все следующие результаты:

- Сервис AirPlay с ожидаемым типом сервиса DNS-SD;
- модель, соответствующая `AudioAccessory<major>,<minor>`;
- один однозначный стандартизированный 12-символьный идентификатор устройства AirPlay.

Создайте отдельный объект ниже. `devices.homepod.<stableDeviceId>` и начать свою временную сессию только после явного активного принятия в соответствии с ADR 0015.

Публичный путь использует шестнадцатеричный формат в нижнем регистре. Отображаемое имя, сетевой адрес, порт, имя хоста, порядок служб и открытый ключ никогда не определяют путь к постоянному объекту. HomePod mini остается в `homepod` класс и отличается только заявленной моделью.

Подключение HomePod использует автоматическое временное сопряжение AirPlay при каждом новом сеансе протокола. Оно не использует ввод PIN-кода и не хранит учетные данные HomePod. Общедоступные состояния сопряжения являются диагностическими данными только для чтения: `pairing.mode` является `transient` и `pairing.status` является `idle`, `pairing`, `paired`, или `error`.

Первоначальный контракт, предоставляющий доступ только для чтения к каждому устройству, выглядит следующим образом:

| Суффикс штата             | Тип        | Роль                          | Значение                                                                                          |
| ------------------------- | ---------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| `info.name`               | нить       | `info.name`                   | Последнее отображаемое имя                                                                        |
| `info.type`               | нить       | `text`                        | Постоянный `homepod`                                                                              |
| `info.model`              | нить       | `info.hardware`               | Последняя представленная модель                                                                   |
| `info.deviceId`           | нить       | `text`                        | Стабильный нормализованный идентификатор протокола                                                |
| `info.lastSeen`           | число      | `value.time`                  | Последнее успешное сканирование, содержащее HomePod.                                              |
| `discovery.available`     | логический | `indicator`                   | Присутствует в результатах последнего успешного сканирования.                                     |
| `services.airplay`        | логический | `indicator`                   | На этом снимке рекламируется сервис AirPlay.                                                      |
| `services.raop`           | логический | `indicator`                   | Рекламируется услуга Correlated RAOP.                                                             |
| `connection.state`        | нить       | `text`                        | Нормализованный жизненный цикл соединения                                                         |
| `connection.online`       | логический | `indicator.connected`         | Полезная временная сессия AirPlay                                                                 |
| `connection.lastError`    | нить       | `text`                        | Код ошибки стабильного проекта                                                                    |
| `pairing.mode`            | нить       | `text`                        | Постоянный `transient`                                                                            |
| `pairing.status`          | нить       | `text`                        | Несекретная фаза временного парного взаимодействия                                                |
| `capabilities.playback`   | логический | `indicator`                   | Протокол управления медиаконтентом объявлен и доступен для использования.                         |
| `capabilities.nowPlaying` | логический | `indicator`                   | Сессия в состоянии "Push-state" доступна для использования                                        |
| `capabilities.volume`     | логический | `indicator`                   | Регулировка громкости и управление в настоящее время доступны.                                    |
| `nowPlaying.title`        | нить       | `media.title`                 | Текущий заголовок или пусто                                                                       |
| `nowPlaying.artist`       | нить       | `media.artist`                | Текущий художник или пусто                                                                        |
| `nowPlaying.album`        | нить       | `media.album`                 | Текущий альбом или пустой                                                                         |
| `nowPlaying.duration`     | число      | `value.interval`              | Продолжительность в секундах                                                                      |
| `nowPlaying.position`     | число      | `value.interval`              | Положение в секундах                                                                              |
| `nowPlaying.isPlaying`    | логический | `media.state`                 | Текущий флаг воспроизведения                                                                      |
| `volume.available`        | логический | `indicator`                   | Доступный объем на данный момент                                                                  |
| `volume.level`            | число      | `value` /`level.volume`       | Регулировка громкости от 0 до 100; запись возможна только после достижения необходимой громкости. |
| `volume.muted`            | логический | `media.mute`                  | Текущее состояние отключения звука                                                                |
| `lastCommand.*`           | скаляр     | существующие роли результатов | Последняя принятая команда и стабильный результат                                                 |

После того, как подключенный ресивер сообщит о наличии функции унифицированного управления мультимедиа или пульта дистанционного управления Hangdog, создайте логическое значение. `button` штаты ниже `playback` для `play`, `pause`, `playPause`, `stop`, `next`, и `previous` После того, как объем станет доступен, сделайте `volume.level` и `volume.muted` Доступно для записи. Входящие команды используют `ack=false`; подтвержденное состояние и запись результатов команд используются `ack=true` Команды сериализуются для каждого HomePod и перед отправкой повторно проверяют текущее соединение и возможности. Числовые значения для записи громкости являются конечными значениями от 0 до 100 и преобразуются в диапазон SDK от 0 до 1. Логические значения для записи отключения звука явно соответствуют включению или выключению звука.

Сохраняйте активные управляемые корневые объекты HomePod, если последующее успешное обнаружение их не содержит. Помечайте обнаружение, подключение, сопряжение, службы и возможности как недоступные и очищайте временное состояние «Сейчас воспроизводится». Неудачное обнаружение не удаляет предыдущее успешное наблюдение. Повторное появление обновляет недолговечную конечную точку и запускает новую временную сессию. Пассивные или удаленные устройства не имеют индивидуального корневого объекта или сессии. Неожиданная потеря соединения ожидает следующего ограниченного цикла обнаружения/переподключения; команда unload отменяет обнаружение, не отменяет дальнейшую работу, удаляет слушателей и отключает каждую сессию.

В журнале отладки записываются очищенные данные о стадиях жизненного цикла, сокращенная ссылка на устройство, сообщаемая модель, наличие службы, фаза сопряжения, логические значения возможностей, имя команды, нормализованное состояние, не связанное с содержимым, и стабильный код ошибки/класс ошибки. В нем не должны записываться имена, адреса, порты, имена хостов, TXT-записи, необработанные объекты обнаружения, URL-адреса, PIN-коды, учетные данные, токены, ключи, обложки, заголовки, исполнители, альбомы или необработанные ошибки вышестоящего сервера.

## Последствия

Пользователи, прошедшие публичное тестирование, могут проверять обнаружение, автоматическое временное сопряжение, подключение, состояние push-уведомлений, команды воспроизведения и громкость без получения или обработки секретного ключа HomePod. Стабильные пути к объектам сохраняются после переименования, DHCP, изменения портов, перезапуска адаптера и временного отсутствия.

Данная реализация намеренно является непроверенной предварительной версией. О её совместимости с оборудованием нельзя говорить до тех пор, пока не будет зафиксирован результат с указанием модели HomePod, версии программного обеспечения, данных об обнаружении, результата подключения, каждой команды, обновлений событий, повторного подключения, перезапуска и очистки после выгрузки. Обложки, прямая потоковая передача звука, семантика стереопар, группировка в нескольких комнатах, будильники, домофон, Siri и настройки Home остаются вне рамок данного соглашения.

## Рассмотренные альтернативы

- Повторное использование PIN-кода Apple TV было отклонено, поскольку HomePod использует временную сессию, а SDK игнорирует для него постоянные учетные данные.
- Создание объектов устройств только на основе имени модели или названия дисплея было отклонено, поскольку ни один из этих вариантов не является надежным идентификатором.
- Предложение раскрыть все методы контроллера SDK было отклонено, поскольку публичный контракт должен оставаться небольшим, ограниченным по функциональности и тестируемым добровольцами.
- Ожидание наличия оборудования, принадлежащего местным владельцам, было отклонено для этого этапа, поскольку был выбран консервативный подход, включающий предварительное тестирование без проверки и публичное тестирование.

## Проверка

Модульные и адаптерные тесты должны охватывать надежную идентификацию, исключение классов, временное соединение без сохранения учетных данных, объекты с ограничением возможностей, проекцию push-уведомлений, сериализацию команд, проверку томов, нормализованные ошибки, скрытую диагностику, повторное обнаружение, отсутствие, настройки перезапуска по умолчанию и выгрузку. Полный контроль качества и матрица поддерживаемых Node.js необходимы перед выпуском кандидата на релиз. Реальная проверка HomePod пока остается в ожидании.