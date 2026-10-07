---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/CONTRIBUTING.md
title: Вношу свой вклад в ioBroker.apple
hash: zfbXmLghCFrZqJUHZK2jGxwhV1My1qex6GL1y6zMlb0=
---
# Вношу свой вклад в ioBroker.apple

Приветствуются любые предложения. Пожалуйста, сосредоточьтесь на конкретных изменениях. Опишите видимое для пользователя поведение, влияние на совместимость и выполненную проверку.

## Настройка разработки

Для работы над проектом требуется Node.js версии 22 или 24.

```bash
npm install
npm run check:quick
```

Использовать `npm run check:full` для изменений в поведении протокола, зависимостях, учетных данных или сохранении данных, публичном контракте объекта ioBroker, совместимости во время выполнения, упаковке или нескольких архитектурных уровнях.

## Договор на публичный адаптер

Идентификаторы объектов и состояний ioBroker, типы, роли, флаги чтения/записи, семантика подтверждения, поля конфигурации, сообщения, сохраняемые данные и документированные требования среды выполнения следует рассматривать как общедоступные интерфейсы. Изменения, влияющие на совместимость, требуют записи о решении по архитектуре, примечаний к миграции и классификации выпуска, определенной в [ADR 0008](/#/docs/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md) .

Используйте определение возможностей для функциональности, доступной для записи. Не предоставляйте доступ к элементам управления, которые не поддерживаются подключенным устройством или бэкэндом. Поведение реального устройства должно быть идентифицировано как протестированное только после фактической проверки соответствующего устройства и версии программного обеспечения.

## Безопасность и конфиденциальность

Не включайте учетные данные, PIN-коды сопряжения, ключи Apple, токены, файлы cookie, частные адреса, реальные имена устройств или учетных записей, перехваченные пакеты, журналы или идентификаторы ioBroker, специфичные для данной установки. Используйте нейтральные фикстуры и зарезервированные примеры значений.

Проверяйте лицензию и происхождение каждой новой зависимости или адаптированного исходного кода. Проект распространяется под лицензией MIT, а реализации под лицензией GPL могут использоваться только в качестве поведенческих примеров. См. [THIRD\_PARTY\_NOTICES.md](/#/docs/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md) и [ADR 0003](/#/docs/adapterref/iobroker.apple/docs/decisions/0003-project-license.md) .

## Запросы на слияние

Открывайте целенаправленные запросы на слияние (pull requests) `main` Включите соответствующие тесты и обновляйте файл README, архитектурную документацию, записи о принятых решениях или журнал изменений при изменении поведения проекта в публичном доступе. Для выпуска изменений необходимо успешно пройти проверку GitHub Actions.