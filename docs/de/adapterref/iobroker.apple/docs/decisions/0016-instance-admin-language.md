---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md
title: ADR 0016: Instanzlokale Administratorsprache
hash: ws1TkuQYzPVEOi2Ifsr+Ofc5q1ovVixzGAYx3OWCsj8=
---
# ADR 0016: Instanzlokale Administratorsprache

- Status: ersetzt
- Datum: 02.09.2026
- Ersetzt: 2026-09-13 durch die aktuelle Anforderung der ioBroker-Adapter-Checkliste, dass Admin-UIs der systemweiten Admin-Sprache folgen und keinen adapterspezifischen Sprachumschalter implementieren.

## Aufhebende Entscheidung

Entfernen Sie die adapterspezifische Deutsch/Englisch-Auswahl und die persistente `native.interfaceLanguage` Einstellung. Die Administratorkonfiguration folgt der systemweiten ioBroker-Administratorsprache, die während der Administratoreinrichtung ausgewählt wurde.

Der Adapter liefert weiterhin den Standard-Admin-Übersetzungskatalog für alle unterstützten ioBroker-Admin-Sprachen aus. Fehlende oder unvollständige Übersetzungen müssen in den Übersetzungsdateien korrigiert werden und dürfen nicht durch eine instanzlokale Sprachüberschreibung umgangen werden.

Dies ändert lediglich die Benutzeroberfläche für die Administratorkonfiguration und die native Konfigurationsoberfläche. Das Protokollverhalten, öffentliche Geräteobjekt-IDs, Laufzeitbezeichnungen, Anmeldeinformationen oder persistente Geräteverwaltungsdatensätze bleiben unverändert.

## Historischer Kontext

Die folgende Entscheidung wurde in der Entwicklungslinie 0.4.0 umgesetzt und wird nur noch aus historischen Gründen beibehalten.

## Kontext

Die Adapterkonfiguration verwendet aktuell die Sprache der ioBroker-Administration. Der Maintainer benötigt eine explizite Auswahlmöglichkeit zwischen Deutsch und Englisch auf der Registerkarte „Allgemein“, ohne Änderungen vorzunehmen. `system.config` oder die Erweiterung des vom Adapter verwalteten Übersetzungsbereichs auf Sprachen, deren Konfigurationstext unvollständig ist.

## Entscheidung

Hinzufügen `interfaceLanguage` zur nativen Instanzkonfiguration. Akzeptierte persistente Werte sind `de` Und `en`; die leere Upgrade-Standardeinstellung leitet die anfängliche Anzeige von der aktuellen Administratorsprache ab und verwendet Englisch, wenn diese weder Deutsch noch Englisch ist.

Auf der Registerkarte „Allgemein“ wird eine benutzerdefinierte Sprachauswahl mit zwei Schaltflächen angezeigt. Diese lädt die ausgewählte Adapterübersetzungsdatei, ändert den Übersetzungskontext der JSON-Konfiguration und fordert ein sofortiges Neuladen der Konfigurationsseite an. Die Auswahl wird beim Speichern der Instanzkonfiguration beibehalten. Das globale ioBroker-Systemsprachenobjekt wird nicht verändert, und es bestehen keine Auswirkungen auf das Protokollverhalten, öffentliche Gerätezustände, Objekt-IDs oder Laufzeitbezeichnungen.

Es werden nur Deutsch und Englisch angeboten. Die vorhandenen Minimaldateien für andere ioBroker-Sprachen bleiben als Fallback-Pakete verfügbar, können aber über diese adapterspezifische Steuerung nicht ausgewählt werden.

## Konsequenzen

Jede Adapterinstanz kann ihre Konfiguration in der ausgewählten Sprache wieder öffnen. Die ursprüngliche Implementierung nutzte den Admin 7 JSON-Konfigurationskontext. ADR 0017 migriert diesen zusammen mit allen anderen benutzerdefinierten Komponenten zur GUI-API-Generation 2.

`interfaceLanguage` ist ein zusätzliches natives Konfigurationsfeld. Zukünftige Entfernung, Umbenennung oder semantische Änderungen erfordern eine Migrationsprüfung im Rahmen des öffentlichen Konfigurationsvertrags.

Die aktuelle Checkliste hat Vorrang vor dieser Migrationsprüfung: Das Beibehalten der adapterspezifischen Sprachüberschreibung würde die Akzeptanz des Repositorys verhindern.

## Validierung

Die Tests des Admin-Vertrags überprüfen die benutzerdefinierte Komponentenreferenz, die beiden zulässigen Werte und das Fehlen eines globalen Schreibvorgangs in der Systemsprache. Typüberprüfung und ein Produktions-Admin-Bundle-Build sind obligatorisch. Die visuelle Bestätigung muss in beide Richtungen auf der repräsentativen Admin-8-Installation erfolgen.

Die ersetzende Implementierung wird durch Admin-Vertragstests validiert, die das Fehlen von `interfaceLanguage`, durch TypeScript-Prüfung und durch ein neu generiertes Admin-Bundle der zweiten Generation ohne Selektor.