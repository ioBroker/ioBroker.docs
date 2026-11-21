---
chapters: {"pages":{"en/adapterref/iobroker.omron-fins/README.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/README.md"},"en/adapterref/iobroker.omron-fins/READMEde.md":{"title":{"en":"ioBroker.omron-fins"},"content":"en/adapterref/iobroker.omron-fins/READMEde.md"},"en/adapterref/iobroker.omron-fins/SECURITY.md":{"title":{"en":"Dependency security status"},"content":"en/adapterref/iobroker.omron-fins/SECURITY.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.omron-fins/SECURITY.md
title: Abhängigkeitssicherheitsstatus
hash: Gz5lVo4hw6TNP3/qq5703hWjf7drdvIgmWfhdjNYmZU=
---
# Abhängigkeitssicherheitsstatus

Geprüft am 03.11.2026 anhand von GitHub Dependabot und npm audit.

## Sanierung

Alle 23 Dependabot-Warnungen, die zu Beginn dieser Wartungsarbeiten geöffnet waren, wurden durch die aktualisierte Sperrdatei behoben. Zu den Paketen gehören axios, follow-redirects, node-forge, moment, adm-zip, js-yaml, brace-expansion und @grpc/grpc-js. Die adm-zip-Überschreibung erfordert nun mindestens Version 0.6.1. Weitere Aktualisierungen betreffen zod, diff und serialize-javascript. Es wurden keine Warnungen verworfen oder Prüfergebnisse ausgeblendet.

`npm audit --omit=dev` Es werden **keine Sicherheitslücken** im Produktionsabhängigkeitsbaum des Adapters gemeldet. Die separate ioBroker-Hostinstallation wird dabei nicht geprüft.

## Verbleibende Hinweise zu Entwicklungswerkzeugen

Der vollständige Entwicklungsbaum enthält noch zwei zugrundeliegende Empfehlungen (24 moderate Befunde einschließlich abhängiger Pakete):

- [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) : Erweiterung der Minimatch-Globparts. Die Empfehlung kennzeichnet Versionen unter 11.0.1 als betroffen. Vorhandene Lint- und Testpakete hängen von mehreren älteren API-Generationen ab. Eine globale Überschreibung würde die aufrufbare Minimatch-3-API durch einen inkompatiblen Export/eine inkompatible API ersetzen und wird daher nicht angewendet.
- [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) : Umgehung der Abbruchfunktion von glob AbortSignal. Bestehende Tools benötigen glob 10; die veröffentlichte Korrektur ist in glob 14 enthalten. Diese Tools und ihre Abhängigkeiten von den Upstream-Komponenten müssen koordiniert aktualisiert werden.

Diese Pakete sind Entwicklungsabhängigkeiten, keine Produktionsabhängigkeiten. Verwenden Sie Entwicklungstools nicht für nicht vertrauenswürdige Repositories oder von Angreifern bereitgestellte Glob-Muster. Lassen Sie Dependabot aktiviert und aktualisieren Sie die Tools, sobald kompatible Korrekturen verfügbar sind. Eine erzwungene Überprüfung oder Ablehnung würde weder Kompatibilität herstellen noch die zugrunde liegenden Pakete reparieren.

## Validierung

- Node.js 22 und 24: TypeScript-Prüfungen und alle 60 Funktions-/Pakettests werden bestanden.
- Node.js 24: ESLint- und isolierter ioBroker-Integrations-/Startup-Test erfolgreich.
- Die Sperrdatei wurde mit den betroffenen Bereichen aller 23 ursprünglichen Warnmeldungen verglichen; es gab keine Übereinstimmung.
- Es wurden keine laufenden ioBroker-Installationen oder SPS-Konfigurationen geändert.

Diese Wartung aktualisiert den GitHub-Quellcode; es wird keine neue npm-Version veröffentlicht.