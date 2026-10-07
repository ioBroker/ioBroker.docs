---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md
title: ADR 0018: Планировщик таймеров, принадлежащий ioBroker
hash: 9uyrEqBFOrz6ARIZTtFd2RzSFTkrwElg1HGYitiiDhQ=
---
# ADR 0018: Планировщик таймеров, принадлежащий ioBroker

- Статус: принято
- Дата: 03.09.2026

## Контекст

Для обновления обнаружения, сроков сопряжения, завершения дочерних процессов и сроков подключения HomePod требуются таймеры. Таймеры Node.js, работающие напрямую, не регистрируются в жизненном цикле адаптера ioBroker и противоречат текущим рекомендациям по адаптерам ioBroker. Однако передача всего адаптера на уровни протокола и домена сделала бы эти уровни зависимыми от платформы и усложнила бы тестирование.

## Решение

Определите узкоспециализированный проект, находящийся в собственности. `TimerScheduler` Интерфейс с возможностью создания и отмены тайм-аутов и интервалов. Корневой элемент композиции производства адаптируется. `adapter.setTimeout`, `adapter.clearTimeout`, `adapter.setInterval`, и `adapter.clearInterval` к этому интерфейсу и внедряет тот же планировщик в среду выполнения, процесс обнаружения, координатор сопряжения и бэкэнд HomePod.

Модули протокола и среды выполнения не должны напрямую вызывать собственные функции таймера Node.js. Использование собственных таймеров разрешено только в изолированных тестах, которые выполняются без экземпляра адаптера ioBroker.

Каждый компонент по-прежнему отвечает за отмену своих собственных дескрипторов по завершении работы или во время явной остановки. Право собственности ioBroker является дополнительной мерой безопасности на протяжении всего жизненного цикла, а не заменой детерминированной очистки.

## Последствия

- Все таймеры производства видны активному адаптеру ioBroker и принадлежат ему.
- Протокольный и доменный уровни остаются независимыми от типов ioBroker и объектов жизненного цикла.
- Модульные тесты могут внедрять детерминированные планировщики и проверять отмену без ожидания заданных временных интервалов.
- Новое поведение, основанное на тайминге, должно принимать общий планировщик, а не импортировать или вызывать собственные функции таймера.

## Рассмотренные альтернативы

- Используйте встроенные таймеры Node.js и очищайте их вручную: отклонено, поскольку отсутствует информация о жизненном цикле ioBroker, даже если локальная очистка выполняется корректно.
- Передача всего адаптера в каждый компонент, работающий по таймеру: отклонено, поскольку это связывает код протокола и домена с ioBroker и расширяет границы доверенности.
- Использовать дополнительную зависимость планирования: отклонено, поскольку четыре небольшие операции таймера не оправдывают использование еще одного пакета среды выполнения.

## Проверка

Тесты контракта проверяют делегирование полномочий ioBroker, регистрацию интервалов во время выполнения и отмену времени остановки, очистку таймаута сопряжения и сбой подключения ограниченного HomePod. Статическая проверка исходного кода подтверждает, что собственные таймеры остаются только в планировщике модульных тестов и компонентах администрирования на стороне браузера.