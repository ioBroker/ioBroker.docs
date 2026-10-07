---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/README.md
title: Architekturentscheidungsdokumente
hash: zcMYAaUu6B8sRwpd4xPb8rPVs6WWtYMRHKPmTjHgrRs=
---
# Architekturentscheidungsdokumente

Nutzen Sie alternative Streitbeilegungsverfahren (ADR) für Entscheidungen, deren Rückgängigmachung kostspielig ist oder die den öffentlichen Auftrag beeinträchtigen. Nummerieren Sie die Datensätze fortlaufend. `NNNN-short-title.md` Die

Zu den erforderlichen Themen, bevor die Implementierung als stabil gilt, gehören:

- Adaptermodulformat und minimale Node/js-Controller-Versionen;
- Einführung und Versionsrichtlinie für das Protokoll-SDK;
- Verschlüsselung/Persistenz von Anmeldeinformationen;
- stabile Geräteidentität und Protokoll-Dienst-Korrelation;
- öffentlicher Objektbaum und Befehlsschema;
- Streaming/FFmpeg/Ressourcenrichtlinie;
- Apple Music-Autorisierung;
- Alexa als integriertes Backend versus separater Adapter.

Die projektweite Versionsverwaltung ist in [ADR 0008](/#/docs/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md) definiert. Die generische AirPlay-Empfängeridentität und ihr erster schreibgeschützter Objektvertrag sind in [ADR 0013](/#/docs/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md) definiert. Die temporäre HomePod-Verbindung, die funktionsabhängige Wiedergabe und Lautstärkeregelung sowie die Protokollierungsgrenze zwischen öffentlicher und Testumgebung sind in [ADR](/#/docs/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md) 0014 definiert. Die explizite Einbindung, Aktivierung, Persistenz und lokale Löschung von HomePod/AirPlay-Empfängern sind in [ADR 0015](/#/docs/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md) definiert. Die entfernte instanzspezifische Konfigurationsoption Deutsch/Englisch für Administratoren und deren Ersetzung durch die systemweite Sprachverwaltung für Administratoren sind in [ADR 0016](/#/docs/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md) dokumentiert. Die Migration aller benutzerdefinierten Konfigurationskomponenten auf Admin 8 und die GUI-API-Generation 2 ist in [ADR 0017](/#/docs/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md) definiert. Die Zuständigkeit für den Produktionstimer und die laufzeitneutrale Planungsgrenze sind in [ADR 0018](/#/docs/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md) definiert.

## Vorlage

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