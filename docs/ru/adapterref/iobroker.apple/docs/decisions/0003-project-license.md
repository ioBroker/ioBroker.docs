---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0003-project-license.md
title: ADR 0003: Лицензия проекта и происхождение источника
hash: JVMz9GkCCgpWmrp4sAm+7r8LrUvABvq4kL80pMCyCcE=
---
# ADR 0003: Лицензия проекта и происхождение источника

- Статус: принято
- Дата: 31.08.2026

## Контекст

Адаптер предназначен для распространения в публичных репозиториях GitHub, npm и ioBroker. Предпочтительные пакеты протокола TypeScript имеют лицензию MIT. В соответствующих эталонных проектах используются как MIT, так и GPL-3.0, поэтому проекту необходима явная лицензия и правило, предотвращающее случайное смешение лицензий.

## Решение

Опубликуйте оригинальное программное обеспечение проекта, документацию и нейтральные примеры под лицензией MIT с указанием авторских прав. `C@ptain Ch@os`.

Используйте политику зависимостей, основанную на приоритете происхождения данных:

- Предпочтение отдается обычным зависимостям пакетов, а не зависимостям из внешних источников;
- источник записи, версия/коммит, лицензия и предполагаемое использование;
- Сохраняйте необходимые уведомления об авторских правах и лицензиях для копируемых или распространяемых материалов третьих лиц;
- Запрещается копировать, адаптировать, переводить или использовать исходный код под лицензией GPL-3.0 в этом проекте MIT;
- Используйте проекты, распространяемые по лицензии GPL, только в качестве примеров поведения и самостоятельно реализуйте требуемое поведение;
- Условия предоставления сторонних услуг и товарные знаки следует отделять от лицензии на программное обеспечение.

Поддерживать `THIRD_PARTY_NOTICES.md` в качестве проверенной человеком записи исходного кода. Сгенерируйте или проверьте полный перечень зависимостей и лицензий в рамках процесса выпуска.

## Последствия

Пользователи могут использовать, изменять, распространять, сублицензировать и продавать копии в соответствии с условиями MIT. Уведомление об авторских правах и разрешении должно оставаться на всех существенных копиях программного обеспечения. Программное обеспечение предоставляется без каких-либо гарантий.

Данная разрешительная лицензия поддерживает широкое распространение ioBroker, но не предоставляет прав на сервисы Apple или Amazon, товарные знаки, контент, протоколы, патенты или код третьих лиц сверх применимых к ним условий.

При внесении изменений необходимо обязательно пройти проверку лицензии, прежде чем добавлять скопированный код или зависимость с неразрешимыми или неясными условиями.

## Рассмотренные альтернативы

- GPL-3.0: отклонено, поскольку обязательное копилефт-распространение не является желаемой моделью распространения для этого адаптера.
- Apache-2.0: рассматривался из-за четкой формулировки патента, но был отклонен в пользу более простого варианта, соответствующего требованиям MIT, предпочтительному SDK протокола и общепринятой практике ioBroker.
- Лицензия не предоставлена: отклонено, поскольку не предоставляло бы пользователям прав, необходимых для адаптера с открытым исходным кодом.

## Проверка

- Корень `LICENSE` Содержит стандартный текст MIT.
- `THIRD_PARTY_NOTICES.md` В записи указаны источники, прошедшие проверку, и границы лицензии GPL.
- В документации проекта и метаданных пакета указано, что в качестве обязательной лицензии проекта используется MIT.