---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md
title: ADR 0018: ioBroker-eigener Timer-Scheduler
hash: 9uyrEqBFOrz6ARIZTtFd2RzSFTkrwElg1HGYitiiDhQ=
---
# ADR 0018: ioBroker-eigener Timer-Scheduler

- Status: akzeptiert
- Datum: 03.09.2026

## Kontext

Aktualisierungen der Erkennung, Kopplungsfristen, Beendigung von Kindprozessen und HomePod-Verbindungsfristen erfordern Timer. Direkte Node.js-Timer werden nicht im Lebenszyklus des ioBroker-Adapters registriert und widersprechen der aktuellen ioBroker-Adapter-Richtlinie. Die Übergabe des kompletten Adapters an die Protokoll- und Domänenschicht würde diese Schichten jedoch plattformabhängig und schwieriger zu testen machen.

## Entscheidung

Definiere ein eng gefasstes, projektbezogenes Eigentum `TimerScheduler` Schnittstelle für Timeout- und Intervallerstellung und -löschung. Die Produktionskompositionswurzel passt sich an. `adapter.setTimeout`, `adapter.clearTimeout`, `adapter.setInterval`, Und `adapter.clearInterval` zu dieser Schnittstelle und injiziert denselben Scheduler in die Laufzeitumgebung, den Erkennungsprozess, den Pairing-Koordinator und das HomePod-Backend.

Protokoll- und Laufzeitmodule dürfen native Node.js-Timerfunktionen nicht direkt aufrufen. Native Timer sind nur in isolierten Tests zulässig, die ohne ioBroker-Adapterinstanz ausgeführt werden.

Jede Komponente ist weiterhin dafür verantwortlich, ihre eigenen Handles nach Abschluss der Arbeit oder bei explizitem Stopp freizugeben. Die ioBroker-Verwaltung stellt ein zusätzliches Sicherheitsnetz im Lebenszyklus dar, ersetzt aber nicht die deterministische Bereinigung.

## Konsequenzen

- Alle Produktionstimer sind für den aktiven ioBroker-Adapter sichtbar und werden von diesem verwaltet.
- Protokoll- und Domänenschichten bleiben unabhängig von ioBroker-Typen und Lebenszyklusobjekten.
- Unit-Tests können deterministische Scheduler einfügen und die Abbruchprüfung überprüfen, ohne auf die Zeitvorgabe warten zu müssen.
- Das neue zeitgesteuerte Verhalten muss den gemeinsam genutzten Scheduler akzeptieren, anstatt native Timerfunktionen zu importieren oder aufzurufen.

## Alternativen in Betracht gezogen

- Verwenden Sie native Node.js-Timer und löschen Sie diese manuell: abgelehnt, da die ioBroker-Lebenszyklusverwaltung nicht berücksichtigt wird, selbst wenn die lokale Bereinigung korrekt ist.
- Übergabe des kompletten Adapters an jede zeitgesteuerte Komponente: abgelehnt, da dadurch Protokoll- und Domänencode an ioBroker gekoppelt und die Vertrauensgrenze erweitert wird.
- Zusätzliche Scheduling-Abhängigkeit verwenden: abgelehnt, da vier kleine Timer-Operationen kein weiteres Laufzeitpaket rechtfertigen.

## Validierung

Die Vertragstests überprüfen die Delegierung an ioBroker, die Registrierung von Laufzeitintervallen und die Stoppzeitabbruch, die Bereinigung nach dem Pairing-Timeout sowie das Fehlschlagen von HomePod-Verbindungen. Die statische Quellcodeanalyse bestätigt, dass native Timer nur noch im Unit-Test-Scheduler und in den browserseitigen Admin-Komponenten vorhanden sind.