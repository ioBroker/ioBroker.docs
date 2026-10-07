---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/0003-project-license.md
title: ADR 0003: Projektlizenz und Herkunftsnachweis
hash: JVMz9GkCCgpWmrp4sAm+7r8LrUvABvq4kL80pMCyCcE=
---
# ADR 0003: Projektlizenz und Herkunftsnachweis

- Status: akzeptiert
- Datum: 31.08.2026

## Kontext

Der Adapter ist für die öffentliche Verteilung über GitHub, npm und ioBroker vorgesehen. Die bevorzugten TypeScript-Protokollpakete sind unter der MIT-Lizenz veröffentlicht. Relevante Referenzprojekte verwenden sowohl die MIT- als auch die GPL-3.0-Lizenz, daher benötigt das Projekt eine explizite Lizenz und eine Regel, die versehentliche Lizenzüberschneidungen verhindert.

## Entscheidung

Veröffentlichen Sie die Originalsoftware, die Dokumentation und die neutralen Beispiele des Projekts unter der MIT-Lizenz mit dem Urheberrechtsvermerk „@“. `C@ptain Ch@os` Die

Verwenden Sie eine Herkunftsorientierungsrichtlinie für Abhängigkeiten:

- Normale Paketabhängigkeiten werden gegenüber externen Quellen bevorzugt;
- Quelle, Version/Commit, Lizenz und Verwendungszweck angeben;
- Die erforderlichen Urheberrechts- und Lizenzhinweise für kopiertes oder verbreitetes Material Dritter müssen beibehalten werden;
- Das Kopieren, Anpassen, Übersetzen oder Vertreiben von GPL-3.0-Quellcode in dieses MIT-Projekt ist untersagt.
- Verwenden Sie GPL-Projekte nur als Verhaltensreferenzen und implementieren Sie das erforderliche Verhalten selbstständig;
- Externe Servicebedingungen und Markenrechte müssen von der Softwarelizenz getrennt gehalten werden.

Pflegen `THIRD_PARTY_NOTICES.md` als vom Menschen geprüfter Quelldatensatz. Generieren oder überprüfen Sie das vollständige Abhängigkeitslizenzverzeichnis im Rahmen des Freigabeprozesses.

## Konsequenzen

Nutzer dürfen die Software unter den MIT-Bedingungen verwenden, verändern, weiterverbreiten, unterlizenzieren und verkaufen. Der Urheberrechts- und Lizenzhinweis muss bei wesentlichen Kopien der Software erhalten bleiben. Die Software wird ohne Gewährleistung bereitgestellt.

Die permissive Lizenz unterstützt eine breite Akzeptanz von ioBroker, gewährt jedoch keine Rechte an Diensten, Marken, Inhalten, Protokollen, Patenten oder Code von Drittanbietern von Apple oder Amazon, die über deren eigene geltende Bedingungen hinausgehen.

Beiträge müssen eine Lizenzprüfung beinhalten, bevor kopierter Code oder eine Abhängigkeit mit nicht-zulässigen oder unklaren Bedingungen eingeführt wird.

## Alternativen in Betracht gezogen

- GPL-3.0: abgelehnt, da obligatorisches Copyleft nicht das gewünschte Vertriebsmodell für diesen Adapter ist.
- Apache-2.0: wurde aufgrund seiner expliziten Patentsprache in Betracht gezogen, aber zugunsten der einfacheren MIT-Ausrichtung mit dem bevorzugten Protokoll-SDK und der gängigen ioBroker-Praxis abgelehnt.
- Keine Lizenz: abgelehnt, da sie den Nutzern nicht die für einen Open-Source-Adapter erforderlichen Rechte einräumen würde.

## Validierung

- Wurzel `LICENSE` Enthält den Standard-MIT-Text.
- `THIRD_PARTY_NOTICES.md` Erfasst die aktuell überprüften Quellen und die GPL-Grenze.
- Die Projektdokumentation und die Paketmetadaten weisen MIT als die verbindliche Projektlizenz aus.