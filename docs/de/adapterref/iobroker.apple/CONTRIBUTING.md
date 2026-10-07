---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/CONTRIBUTING.md
title: Mitwirkung an ioBroker.apple
hash: zfbXmLghCFrZqJUHZK2jGxwhV1My1qex6GL1y6zMlb0=
---
# Mitwirkung an ioBroker.apple

Beiträge sind willkommen. Bitte konzentrieren Sie sich bei den Änderungen auf das Wesentliche. Beschreiben Sie das für den Benutzer sichtbare Verhalten, die Auswirkungen auf die Kompatibilität und die durchgeführten Validierungen.

## Entwicklungsumgebung

Für dieses Projekt wird Node.js 22 oder 24 benötigt.

```bash
npm install
npm run check:quick
```

Verwenden `npm run check:full` für Änderungen am Protokollverhalten, an Abhängigkeiten, Anmeldeinformationen oder Persistenz, am öffentlichen ioBroker-Objektvertrag, an der Laufzeitkompatibilität, an der Paketierung oder an mehreren Architekturschichten.

## Vertrag für öffentliche Adapter

Behandeln Sie ioBroker-Objekt- und Status-IDs, Typen, Rollen, Lese-/Schreibflags, Bestätigungssemantik, Konfigurationsfelder, Nachrichten, persistente Daten und dokumentierte Laufzeitanforderungen als öffentliche Schnittstellen. Änderungen, die die Kompatibilität beeinträchtigen, erfordern einen Architekturentscheidungsdatensatz, Migrationshinweise und die in [ADR 0008](/#/docs/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md) definierte Releaseklassifizierung.

Verwenden Sie die Fähigkeitserkennung für beschreibbare Funktionen. Stellen Sie keine Steuerelemente bereit, die vom angeschlossenen Gerät oder Backend nicht unterstützt werden. Das Verhalten eines realen Geräts darf nur dann als getestet gekennzeichnet werden, wenn das entsprechende Gerät und die Softwareversion tatsächlich verifiziert wurden.

## Sicherheit und Datenschutz

Geben Sie keine Anmeldeinformationen, Pairing-PINs, Apple-Schlüssel, Token, Cookies, private Adressen, echte Geräte- oder Kontonamen, Paketmitschnitte, Protokolle oder installationsspezifische ioBroker-IDs an. Verwenden Sie neutrale Fixtures und reservierte Beispielwerte.

Prüfen Sie die Lizenz und Herkunft jeder neuen Abhängigkeit oder angepassten Quelle. Das Projekt ist unter der MIT-Lizenz lizenziert; Implementierungen unter der GPL-Lizenz dürfen nur als Verhaltensreferenz verwendet werden. Siehe [THIRD\_PARTY\_NOTICES.md](/#/docs/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md) und [ADR 0003](/#/docs/adapterref/iobroker.apple/docs/decisions/0003-project-license.md) .

## Pull-Anfragen

Offene fokussierte Pull-Requests gegen `main` Fügen Sie relevante Tests hinzu und aktualisieren Sie die README-Datei, die Architekturdokumentation, die Entscheidungsprotokolle oder das Änderungsprotokoll, wenn sich das öffentliche Verhalten ändert. GitHub Actions müssen erfolgreich abgeschlossen sein, bevor eine Änderung veröffentlicht wird.