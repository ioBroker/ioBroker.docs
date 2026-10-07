---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md
title: ADR 0015: Явное управление приемниками HomePod и AirPlay
hash: IeB1/kUgksCrOcjnDsVRQNqB4KdvVP4E5z7yXrDFTTs=
---
# ADR 0015: Явное управление приемниками HomePod и AirPlay

- Статус: принято
- Дата: 02.09.2026

## Контекст

В ADR 0013 и 0014 были введены стабильные контракты объектов для каждого устройства, предназначенные для устройств AirPlay Receiver и HomePod с высокой степенью идентификации. В их первой реализации автоматически проецировалась каждая цель обнаружения с высокой степенью идентификации. Однако в административной части требуется четкое разграничение между временным обнаружением, локально управляемым инвентарем и активной публичной проекцией для всех классов устройств.

HomePods используют автоматическое временное сопряжение, а не учетные данные, в то время как стандартные AirPlay-приемники в настоящее время предоставляют только данные для чтения. Поэтому ни один из этих классов устройств не может повторно использовать инвентарь учетных данных Apple TV в качестве своей надежной границы управления.

## Решение

Надежно идентифицированный HomePod или универсальный AirPlay-приемник сначала отображается как неуправляемый кандидат на обнаружение. Само по себе обнаружение не создает отдельное дерево общедоступных объектов и не запускает сессию протокола HomePod. Слабо идентифицированные наблюдения остаются видимыми только в обзоре обнаружения классов и учитываются, поскольку для них не существует стабильного локального ключа управления.

Явное действие администратора делает текущего кандидата активным. Затем устройство перемещается из обнаруженной таблицы в управляемую таблицу и не может отображаться в обеих. Адаптер хранит свой класс, нормализованный 12-символьный идентификатор протокола, последнее имя, последнюю модель и флаг включения в файле атомарного экземпляра, доступном только владельцу. `managed-devices.v1.json` Этот файл не содержит адреса, порта, имени хоста, TXT-записи, ключа, токена, учетных данных или PIN-кода.

Для подключенного устройства:

- «Активный» означает, что может существовать дерево общедоступных объектов, специфичное для данного класса;
- Активный HomePod может автоматически устанавливать временную сессию AirPlay;
- Активный универсальный приемник получает только данные из каталога ADR 0013, доступные только для чтения;
- Режим «пассивный» сохраняет локальную запись управления, но отключает все сеансы HomePod и удаляет всё дерево отдельных объектов;
- Повторная активация восстанавливает дерево немедленно после обнаружения устройства или после последующего успешного обнаружения;
- Команда delete удаляет локальную запись, отключает все сеансы HomePod и удаляет дерево объектов. Устройство, оставшееся видимым, немедленно возвращается в качестве неуправляемого кандидата на обнаружение и может быть снова подключено.

Активные управляемые корневые узлы сохраняются при временном отсутствии с недоступными значениями по умолчанию, определенными в ADR 0013 и 0014. Пассивные, удаленные и никогда не используемые корневые узлы удаляются при запуске и после изменений в управлении. Подсчет обнаружений продолжает включать все исключительно классифицированные наблюдения и не зависит от локального управления.

Операции управления администратором и согласование обнаружения используют одну сериализованную очередь выполнения. Деактивация HomePod ожидает выполнения команд из очереди, активной попытки подключения, отключения от бэкэнда и окончательных прогнозов событий, прежде чем удалить дерево. Контракты сопряжения, учетных данных и активации Apple TV остаются без изменений.

## Миграция

Индивидуальные контракты на HomePod и AirPlay Receiver были добавлены после публикации `0.2.0` тег и еще не выпущены. Тем не менее, в тестовых установках могут содержаться автоматически полученные корневые элементы из этих предварительных версий. При первом запуске с таким решением такие корневые элементы удаляются, если устройство не было явно добавлено в новый магазин. Затем пользователь активирует обнаруженное устройство в разделе «Администрирование», чтобы воссоздать его дерево.

Следующий релиз, содержащий эти контракты на устройства, представляет собой предварительную версию с небольшими изменениями функционала (pre.1.0). Нет `0.2.x` В результате выпуска могут произойти эти изменения в управлении и прогнозировании.

## Последствия

Теперь владение деревом объектов согласовано для классов, управляемых обнаружением: присутствие в сети — это наблюдение, локальное управление — устойчивое намерение, и только активное намерение допускает проекцию. Автономные и пассивные устройства сохраняют читаемые резервные метаданные в административной панели, не передавая детали протокола в собственную конфигурацию или публичные состояния.

Дополнительный локальный файл данных представляет собой контракт сохранения данных. Изменения формата требуют проверки, миграции, тестов перезапуска, обновления ADR и принятия совместимого решения по SemVer. Реальные запросы на управление HomePod и обнаружение модели приемника сохраняют существующие требования к проверке оборудования.

## Проверка

Тесты охватывают атомарное сохранение данных только для владельца, отклонение схемы, идентификацию, разделенную по классам, перемещение от кандидата к управляемому, отсутствие дублирующихся списков, проекцию активного/пассивного режима, отключение HomePod, явное удаление, повторное появление кандидата, очистку при запуске, сохранение в автономном режиме и нормализованные ошибки администратора. Для выпуска требуется полная матрица адаптера и поддерживаемых узлов; проверка аппаратного обеспечения HomePod пока не завершена.