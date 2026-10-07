---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/README.md
title: Протоколы принятия архитектурных решений
hash: zcMYAaUu6B8sRwpd4xPb8rPVs6WWtYMRHKPmTjHgrRs=
---
# Протоколы принятия архитектурных решений

Используйте альтернативные разрешения споров (АРС) для решений, отмена которых обходится дорого или которые влияют на государственный контракт. Нумеруйте записи последовательно. `NNNN-short-title.md`.

К числу обязательных тем, которые необходимо учесть перед тем, как их внедрение будет признано стабильным, относятся:

- Формат модуля адаптера и минимальные версии Node/js-контроллера;
- Политика внедрения и версионирования SDK протокола;
- Шифрование/сохранение учетных данных;
- стабильная идентификация устройства и корреляция протокола и службы;
- дерево общедоступных объектов и схема команд;
- потоковая передача/FFmpeg/политика ресурсов;
- Авторизация Apple Music;
- Alexa как встроенный бэкэнд или как отдельный адаптер.

Версионирование релизов в рамках всего проекта определяется документом [ADR 0008.](/#/docs/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md) Идентификатор универсального AirPlay Receiver и его первый контракт объекта только для чтения определяются документом [ADR 0013.](/#/docs/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md) Временное подключение HomePod, воспроизведение и громкость с ограничением по возможностям, а также граница логирования для публичного тестирования определяются документом [ADR 0014.](/#/docs/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md) Явное принятие, включение, сохранение и локальное удаление HomePod/AirPlay Receiver определяются документом [ADR 0015.](/#/docs/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md) Удалённый выбор немецкого/английского языка в конфигурации администратора для локального экземпляра и его замена на обработку языка администратора в масштабах всей системы описаны в документе [ADR 0016.](/#/docs/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md) Миграция всех пользовательских компонентов конфигурации в Admin 8 и API графического интерфейса пользователя 2 определяется документом [ADR 0017.](/#/docs/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md) Право собственности на таймер в производственной среде и граница планирования, не зависящая от среды выполнения, определяются документом [ADR 0018](/#/docs/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md) .

## Шаблон

```markdown
# ADR NNNN: Title

- Status: proposed | accepted | superseded | rejected
- Date: YYYY-MM-DD

## Context

What problem, evidence, and constraints require a decision?

## Decision

What is the chosen rule?

## Consequences

What becomes easier, harder, required, or excluded?

## Alternatives Considered

What credible options were rejected, and why?

## Validation

Which test, PoC, or measurement supports the decision?
```