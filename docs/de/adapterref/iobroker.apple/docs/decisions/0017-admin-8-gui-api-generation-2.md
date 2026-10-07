---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md
title: ADR 0017: Admin 8 GUI API Generation 2
hash: 4GrJXMctDmDT0YqdS3tHwrtoGADtbJQ0E1WthBaK0cU=
---
# ADR 0017: Admin 8 GUI API Generation 2

- Status: akzeptiert
- Datum: 03.09.2026

## Kontext

Die dynamischen Steuerelemente für Apple TV, HomePod, AirPlay Receiver und – in der Vergangenheit – die Sprachsteuerung wurden ursprünglich für Admin 7 mit GUI-API-Generation 1 entwickelt. Der lokale Linux-aarch64-Testhost stellt nun Admin 8 und GUI-API-Generation 2 bereit. Admin 8 weigert sich absichtlich, Komponenten der Generation 1 zu starten, da die gemeinsam genutzten Komponentenbibliotheken React, MUI und ioBroker nicht binärkompatibel mit der älteren Version sind.

Das Ergebnis war eine sichtbare Ladewarnung für jede benutzerdefinierte Komponente, während die Standard-JSON-Konfigurationsfelder weiterhin gerendert wurden. `guiApi: 2` würde fälschlicherweise ein inkompatibles Bundle deklarieren und ist daher keine gültige Korrektur.

## Entscheidung

Migrieren Sie den gesamten benutzerdefinierten Admin-Komponentensatz mithilfe der offiziellen GUI-API-Generation 2. `ioBroker.admin-component-template` Version 3.0.5 dient als geprüfte Build-Referenz. Der Build der zweiten Generation verwendet exakt die geprüften Entwicklungsversionen von `@iobroker/gui-components` 10.0.5, `@iobroker/json-config` 9.0.8, React 19.2.8, MUI 9.2.0, Vite 8.1.5 und die zugehörigen Module Federation-Pakete wurden aufgezeichnet in `THIRD_PARTY_NOTICES.md` Die

Jeder individuell angefertigte Artikel in `admin/jsonConfig.json` erklärt `guiApi: 2`. Quellcode-Importe `I18n` und die Konfiguration für die gemeinsame Nutzung der Modulföderation von `@iobroker/gui-components`; asynchrone Lebenszyklusmethoden der zweiten Generation warten auf ihre Basisimplementierung. Die veralteten `bundlerType` Erklärung und die Generation-1 `@iobroker/adapter-react-v5` Abhängigkeiten werden entfernt.

Der Adapter erfordert ioBroker Admin. `>=8.0.0` Admin 7 wird nicht mehr als Installationsziel unterstützt. Diese Inkompatibilität muss bekannt gegeben werden. `BREAKING` in der nächsten kleineren Version vor Version 1.0; die aktuelle Entwicklungsversion wird nur im Rahmen einer ausdrücklich autorisierten Veröffentlichung geändert.

## Konsequenzen

Die benutzerdefinierten Steuerelemente für die Geräteverwaltung basieren auf derselben React 19/MUI 9-Generation wie Admin 8 und können dessen Komponentenladeprozess durchlaufen. ADR 0016 hat die adapterspezifische Sprachauswahl ersetzt und entfernt, sodass die Admin-Benutzeroberfläche nun die systemweite ioBroker-Sprache verwendet. Die Backend-Nachrichten-API, die Kopplungssicherheit, die Gerätepersistenz und die öffentliche Objektstruktur bleiben unverändert.

Ein generiertes Admin-Bundle kann nicht beide GUI-API-Generationen bedienen. Die Wiederherstellung der Unterstützung für Admin 7 erfordert eine separat erstellte und ausgewählte Benutzeroberfläche der ersten Generation, nicht etwa eine gelockerte Versionsspanne oder eine falsche Angabe. `guiApi` Erklärung.

Für den Quellcode-Build wird eine Node-Version benötigt, die von Vite 8 und Module Federation Vite 1.19.1 unterstützt wird. Die aktuell vom Projekt unterstützten Validierungen für Node 22, 24 und 26 verwenden Versionen, die über der Mindestanforderung von Node 22.12 dieser Tools liegen.

## Alternativen in Betracht gezogen

- Erklärung `guiApi: 2` Die Verwendung des bestehenden Bundles wurde abgelehnt, da es noch Abhängigkeiten von React 18/MUI 6 Generation-1 enthält.
- Die Beibehaltung von Admin 7 als einzigem Ziel wurde verworfen, da die repräsentative Installation auf Admin 8 verschoben wurde und dort alle benutzerdefinierten Steuerelemente nicht nutzbar sind.
- Das Entfernen der benutzerdefinierten Tabellen wurde abgelehnt, da die Standard-JSON-Konfiguration deren temporäre PIN- und zeilenspezifische Geräteverwaltungs-Workflows nicht abbilden kann.
- Die Auslieferung zweier Frontend-Generationen wurde verschoben, da JSON Config keinen einfachen statischen Kompatibilitätsselektor besitzt und die duplizierte Build-/Testoberfläche für den aktuellen Pre-1.0-Adapter nicht gerechtfertigt ist.

## Validierung

Vertragsprüfungen bestätigen `guiApi: 2` Die globale Abhängigkeit von Admin 8, das Fehlen des Legacy-Komponentenpakets und die fehlende adapterspezifische Sprachauswahl sind zu berücksichtigen. Typüberprüfung, der Produktions-Build von Admin, Pakettests, die vollständige Adapterprüfung und Node 22/24/26-Tests sind obligatorisch. Eine visuelle Überprüfung auf dem lokalen Linux-aarch64-Testhost muss die Geräteverwaltung und das Fehlen von Warnungen bezüglich Komponentenlader oder Übersetzung vor der nächsten Veröffentlichung bestätigen.