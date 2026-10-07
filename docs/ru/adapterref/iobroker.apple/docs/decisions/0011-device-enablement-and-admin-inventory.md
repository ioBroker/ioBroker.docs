---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md
title: ADR 0011: Включение устройств и административная инвентаризация
hash: ahXgL/YD6lxnPBRyxaX2YnjAZHOVZUXlILxk80slY6k=
---
# ADR 0011: Включение устройств и административная инвентаризация

- Статус: принято; управление приемником/HomePod изменено в соответствии с ADR 0013–0015
- Дата: 01.09.2026

## Контекст

Первоначальная конфигурация администратора объединяла общие настройки обнаружения и сопряжение Apple TV на одной странице. Она также рассматривала каждое сохраненное сопряжение Apple TV как активное: при обнаружении устройства адаптер подключался к своему бэкэнду и отображал полное дерево общедоступных объектов. Обнаружение HomePod и универсальных AirPlay Receiver отображало только количество классов.

Теперь адаптеру необходима ориентированная на классы навигация администратора и четкое разграничение между активно управляемым сопряженным Apple TV и устройством, которое сохранено, но временно отключено. Наблюдения при обнаружении, учетные данные для сопряжения, включение устройства и публичная проекция объектов должны оставаться отдельными понятиями.

## Решение

В настройках административной панели используются вкладки. `General`, `Devices`, и `Apple Music` Вкладка «Устройства» содержит разделы для Apple TV, HomePod и универсального AirPlay Receiver. Apple TV сохраняет существующее сопряжение по PIN-коду и локальный процесс удаления. HomePod и AirPlay Receiver отображают количество, отображаемое имя и модель, указанные в последнем успешном обнаружении. После принятия контрактов на устройства ADR 0015 добавляет явное подключение, а также управление активным/пассивным режимом/удалением; само по себе обнаружение по-прежнему не создает отдельный объект среды выполнения.

Сохранение поддержки Apple TV в виде надежных несекретных данных экземпляра в `device-settings.v1.json` В базе данных версии 1 хранятся только явно отключенные нормализованные идентификаторы устройств Apple TV. Следовательно, отсутствие означает включение. Это делает все пары, созданные в более старых версиях, активными после прозрачного обновления без перезаписи зашифрованной базы данных учетных данных.

Для сопряженного устройства Apple TV:

- Активное обнаружение может обеспечить связь с его бэкэндом и проецирование его отдельных элементов. `devices.appletv.<deviceId>` дерево объектов;
- В пассивном режиме учетные данные и запись в административном инвентаре остаются, в то время как бэкэнд отключается, а дерево отдельных объектов удаляется;
- Повторная активация воссоздает дерево и восстанавливает связи, когда становится доступна текущая цель обнаружения;
- Функция local forget удаляет учетные данные, метаданные активации, сессию бэкэнда и дерево отдельных объектов.

Количество обнаруженных устройств и кандидатов на обнаружение не зависит от их активации. Пассивно сопряженное устройство Apple TV остается видимым в административном инвентаре и в текущих результатах обнаружения. При запуске удаляются деревья Apple TV, которые либо не сопряжены, либо находятся в пассивном состоянии. Недавно завершенное сопряжение по умолчанию является активным.

База данных настроек проверяется перед использованием, записывается с помощью атомарной замены в той же директории и имеет права доступа к файловой системе, ограниченные только владельцем. Идентификаторы устройств являются данными установки и никогда не попадают в репозитории, за исключением нейтральных локально администрируемых примеров.

Вкладка «Общие» содержит только интервал обнаружения и информационный заполнитель для учетной записи Apple. Она не сохраняет идентификатор Apple, пароль, токен или другие учетные данные до принятия специального запроса на авторизацию (ADR). Вкладка «Apple Music» является информационным заполнителем и не создает публичных учетных записей. `music` объекты.

## Последствия

Пользователи могут временно отключить Apple TV, не теряя при этом сопряжение. Существующие сопряженные устройства остаются активными после обновления. Пассивные устройства намеренно исчезают из дерева общедоступных объектов, поэтому автоматизация будет иметь тот же эффект, что и временно недоступный целевой путь, а не отключённый элемент управления, доступный для записи.

Схема обнаружения IPC становится аддитивной: она включает в себя отредактированные сводки по классам со стабильным идентификатором сканирования, отображаемым именем и моделью. ADR 0013 позже преобразует надежно идентифицированные универсальные AirPlay-приемники в инвентаризацию только для чтения во время выполнения. ADR 0014 позже преобразует надежно идентифицированные HomePods в автоматически подключаемый предварительный просмотр временного управления без повторного использования включения Apple TV или сохранения учетных данных.

Фактические учетные данные Apple Account или Apple Music по-прежнему не подлежат добавлению. Их добавление в дальнейшем потребует принятия решений в области безопасности, сохранения данных, миграции и авторизации, а не повторного использования полей пользовательского интерфейса-заполнителей.

## Проверка

Тесты проверяют миграцию по умолчанию с активным состоянием, атомарное сохранение данных, отклонение схемы, права доступа только для владельца, пассивную очистку при запуске, отключение и удаление дерева, повторную активацию, очистку после удаления, сводки обнаружения, эксклюзивные для каждого класса, проверку сообщений и структуру конфигурации администратора. Полные проверки пакета, сборки и интеграции необходимы, поскольку поведение сохранения данных и публичной проекции во время выполнения изменяется.