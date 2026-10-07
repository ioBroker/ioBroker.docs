---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md
title: Hinweise zu Drittanbietern und Quellenangaben
hash: njP18lrvL6+DhvnaVfsp0u86mBbAIcALqOSLvzCLTAc=
---
# Hinweise zu Drittanbietern und Quellenangaben

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Drittanbieterpakete und Quellmaterialien unterliegen weiterhin ihren jeweiligen Lizenzen und Bedingungen.

Diese Datei dokumentiert geprüfte Upstream-Projekte. Sie ist kein generiertes Verzeichnis der installierten npm-Abhängigkeiten. Das veröffentlichte Paket muss zusätzlich alle von den tatsächlich mitgelieferten Abhängigkeiten benötigten Hinweise enthalten.

## Laufzeitabhängigkeiten

### Apple-Protokolle

- Projekt: `basmilius/apple-protocols`
- Quelle: <https://github.com/basmilius/apple-protocols>
- npm-Pakete: `@basmilius/apple-sdk`, `@basmilius/apple-common`
- Geprüfte npm-Version: `0.13.4`
- Lizenz: MIT
- Aktuelle Verwendung: exakte Version 0.13.4 Laufzeitabhängigkeiten hinter den Projekt-Discovery-, Pairing- und Apple-Backend-Schnittstellen

Die Pakete sind nicht in diesem Repository enthalten. Urheberrecht und Lizenzen verbleiben bei den jeweiligen Autoren. Das geprüfte Quellcode-Repository und die npm-Manifeste deklarieren die MIT-Lizenz. Das geprüfte npm-SDK-Artefakt lässt eine Angabe aus. `LICENSE` Die Datei wird aus dem Archiv extrahiert, daher protokolliert dieser Hinweis die Quelle und die angegebene Lizenz und ist im Adapterartefakt enthalten. Die Laufzeitübernahme wird durch ADR 0007 akzeptiert; Aktualisierungen von Abhängigkeiten erfordern eine erneute Überprüfung von Quelle, Artefakt und Lizenz.

## Admin-Komponenten-Erstellung

### ioBroker Admin-Komponentenbibliotheken und Vorlage

- Projekte: `ioBroker/gui-components`, `ioBroker/ioBroker.admin`, Und `ioBroker/ioBroker.admin-component-template`
- Geprüfte Pakete: `@iobroker/gui-components@10.2.1` Und `@iobroker/json-config@9.1.2`
- Vorlage geprüft: `ioBroker.admin-component-template` Version `3.0.5`, begehen `116026cef4623ac900cf3c3a992b7dd2049744c5`
- Lizenz: MIT
- Aktuelle Verwendung: Admin 8 GUI API Generation 2, Build-Gerüst und gemeinsam genutzte UI-Bibliotheken für Apple TV-Kopplung, Geräteverwaltungstabellen und die lokale Sprachauswahl.

Die Komponentenimplementierung ist projektbezogen. Ihre Build-Konfiguration basiert auf der offiziellen, unter der MIT-Lizenz stehenden ioBroker-Vorlage. Der entsprechende Copyright-Vermerk der Vorlage lautet: Copyright (c) 2022–2026 bluefox <dogafox@gmail.com> . Die vollständigen MIT-Lizenzbedingungen und Gewährleistungsbestimmungen entsprechen denen im Stammverzeichnis. `LICENSE` Datei.

Das generierte Admin-Bundle verwendet außerdem React 19.2.8, MUI 9.4.0, Vite 8.1.5 und Module Federation Vite 1.21.2. Diese Tools und Bibliotheken sind unter der MIT-Lizenz lizenziert und unterliegen dem Urheberrecht ihrer jeweiligen Autoren. Quellcode-Repositories: <https://github.com/facebook/react> , <https://github.com/mui/material-ui> , <https://github.com/vitejs/vite> und <https://github.com/module-federation/vite> .

## Referenzimplementierungen

### ioBroker Apple TV-Entwurf

- Projekt: `h2okopfmt/ioBroker.apple-tv`
- Quelle: <https://github.com/h2okopfmt/ioBroker.apple-tv>
- Geprüfter Commit: `eb7e8a527a313fdbb63f801335f0b22ae214e6c1`
- Lizenz: MIT
- Verwendung: Nur zur Bewertung des Standes der Technik und von Projektüberschneidungen

Keine Quelle aus diesem Projekt wird einbezogen, kopiert, angepasst, übersetzt oder an Dritte weitergegeben. Die Überprüfung dient als Grundlage für die Entscheidung über das unabhängige Projekt in ADR 0001 und die Bewertung der öffentlichen Landschaft in \[Referenz einfügen]. `docs/UPSTREAM_RESEARCH.md` Die

### pyatv

- Projekt: `postlund/pyatv`
- Quelle: <https://github.com/postlund/pyatv>
- Rezension der Veröffentlichung: `0.18.0`
- Lizenz: MIT
- Verwendung: Protokollverhalten und Funktionsreferenz; nicht Teil der Standardlaufzeitumgebung

Derzeit ist in diesem Repository kein pyatv-Quellcode enthalten.

### Homey Apple

- Projekt: `basmilius/homey-apple`
- Quelle: <https://github.com/basmilius/homey-apple>
- Bewertetes Tag: `v1.8.0`
- Lizenz: GPL-3.0
- Verwendung: Nur als Referenz für Verhalten und Lebenszyklus

Der unter der GPL-3.0-Lizenz stehende Quellcode dieses Projekts darf nicht kopiert, angepasst, übersetzt oder in dieses unter der MIT-Lizenz stehende Repository eingebunden werden. Ähnliches Verhalten muss unabhängig von den dokumentierten Anforderungen, den öffentlichen APIs und unseren eigenen Tests implementiert werden.

### Homebridge Alexa Player

- Projekt: `BewhiskeredBard/homebridge-alexa-player`
- Quelle: <https://github.com/BewhiskeredBard/homebridge-alexa-player>
- Überprüfte Version: `0.5.3`
- Lizenz: MIT
- Verwendung: Nur für historische Forschungszwecke

Derzeit ist kein Quellcode aus diesem Projekt in diesem Repository enthalten.

## Externe APIs und Marken

Die Apple Music API und MusicKit sind externe Apple-Dienste, die den geltenden Entwicklerbedingungen von Apple unterliegen. Ihre Dokumentation und die proprietären SDK-Inhalte werden durch die MIT-Lizenz dieses Projekts nicht neu lizenziert.

Apple, Apple TV, HomePod, AirPlay, Apple Music, MusicKit und zugehörige Marken sind Warenzeichen von Apple Inc. Dieses unabhängige Projekt steht in keiner Verbindung zu Apple Inc., wird nicht von Apple Inc. unterstützt oder gesponsert.

Amazon, Alexa, Echo und zugehörige Marken gehören ihren jeweiligen Eigentümern. Jede zukünftige Integration wäre eine eigenständige Interoperabilitätsfunktion.

## Beitragsregel

Beitragende müssen in ihrem Pull Request die Quelle und Lizenz kopierten oder angepassten Materials angeben. Wesentlicher Code von Drittanbietern darf nur nach einer Lizenzprüfung und unter Angabe aller erforderlichen Hinweise hinzugefügt werden. Code mit einer inkompatiblen Lizenz darf nicht eingeführt werden.