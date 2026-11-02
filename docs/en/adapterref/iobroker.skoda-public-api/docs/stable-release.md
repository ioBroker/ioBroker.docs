---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md":{"title":{"en":"Erste Stable-Aufnahme abgeschlossen"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md":{"title":{"en":"Stable application for 0.1.11 — merged"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md"}}}
---
# Erste Stable-Aufnahme abgeschlossen

Stand: 11. Oktober 2026. Stable-Version: **`iobroker.skoda-public-api@0.1.11`**.

[Repository-PR #6832](https://github.com/ioBroker/ioBroker.repositories/pull/6832)
wurde am 11. Oktober 2026 um 14:56:48 UTC übernommen. Der Eintrag in
[`sources-dist-stable.json`](https://github.com/ioBroker/ioBroker.repositories/blob/master/sources-dist-stable.json)
ist auf `0.1.11` festgelegt.

Der ausgelieferte [Stable-Katalog](https://download.iobroker.net/sources-dist.json)
hatte bei der Prüfung am selben Tag noch den Stand `2026-10-11T08:35:49.417Z`
vor dem Merge und enthielt den Adapter noch nicht. Nach dem nächsten Katalog-Refresh
ist die Sichtbarkeit im Admin zu kontrollieren. Für die Aufnahme ist kein weiteres
npm-Release erforderlich.

Die erste Stable-Aufnahme verwendet die bereits veröffentlichte und öffentlich
getestete Version. Die Aktualisierung der Testbibliothek verändert das
veröffentlichte npm-Paket nicht. Nach `v0.1.11` übernommene Änderungen an Spec und
Metadaten gehören in einen späteren Release.

## Nachweise

| Voraussetzung | Nachweis |
|---|---|
| In `latest` vorhanden | Eintrag in `ioBroker/ioBroker.repositories/sources-dist.json` |
| Auf npm veröffentlicht | Version `0.1.11`, veröffentlicht am 20. September 2026; Maintainer `bluefox` und `tmarthy` |
| Öffentlicher Testaufruf | [Forumthread](https://forum.iobroker.net/topic/85433/test-adapter-skoda-public-api-v0.1.x) |
| Rückmeldungen | Octavia 2.0 TDI: Fahrzeugstatus, Position, AdBlue/Kraftstoff und Start/Stop der Standheizung erfolgreich; Superb Hybrid 2025, Superb iV 2022 und Elroq Modelljahr 2027: positive Rückmeldungen |
| Release-CI | [Grüner Tag-Lauf für `v0.1.11`](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/35531311953), einschließlich neun Testkombinationen und Veröffentlichung |
| GitHub-CI nach Stable-Vorbereitung | [Grüner Lauf auf `main` nach PR #7](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/38143355427), neun Kombinationen aus Betriebssystem und Node-Version |
| API-Spec | [Grüner Spec-Lauf auf `main`](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/36470899807); Issue #4 geschlossen |
| Repository-Checker | Checker im [Stable-PR #6832](https://github.com/ioBroker/ioBroker.repositories/pull/6832): keine Fehler und keine Warnungen; W0037 durch `^6.3.0` behoben; [Issue #6](https://github.com/tmarthy/ioBroker.skoda-public-api/issues/6) am 11. Oktober geschlossen |
| Stable-Aufnahme | Repository-PR #6832 übernommen, Version `0.1.11` in `sources-dist-stable.json` eingetragen |
| Paketinhalt | Veröffentlichtes npm-Tarball geprüft: `build/main.js`, Paketmetadaten, Admin-Konfiguration, alle elf Admin-Übersetzungen und Lizenz enthalten |

Die Forumberichte bestätigen die genannten Funktionen. Beim Superb Hybrid 2025 war
der Klimatisierungstest noch angekündigt. Echte anonymisierte Fixtures liegen bisher
nur für den Enyaq vor. Automatische VIN-Ermittlung ist mit der Public API nicht möglich;
der Discovery-Hinweis aus den Stable-Anforderungen trifft daher nicht zu.

## Lokale Prüfung der Vorbereitung

Der bei der Vorbereitung geprüfte Git-Stand enthält zusätzlich die Spec-Aktualisierung
aus PR #5 und ist nicht identisch mit dem unveränderten veröffentlichten npm-Paket `0.1.11`.
Geprüft auf macOS mit Node `26.9.0` und `@iobroker/testing` `6.3.0`:

| Prüfung | Ergebnis |
|---|---|
| TypeScript, ESLint und Build | Bestanden |
| Unit-Tests | 501 bestanden |
| Pakettests | 64 bestanden |
| Integration einschließlich Compact Mode | 14 bestanden, mit js-controller `8.0.0-alpha.5-20261004-d0887094b` |
| Lokaler Repository-Checker `5.22.10` mit GitHub-Anmeldung | Keine Fehler und keine Warnungen |
| Live-Spec-Vergleich | Unverändert |
| Lokaler Paket-Dry-Run | 79 Dateien; benötigte Paketdateien enthalten |
| Stable-Eintrag | Offizielle Prüfungen für Attribute, alphabetische Sortierung und vorhandenen Latest-Eintrag bestanden |

Der lokale Checker ist laut Werkzeugdokumentation experimentell. Vor der Aufnahme
meldete er noch den Vorschlag S4047 zur fehlenden Stable-Version. Die Vorbereitung
wurde mit [PR #7](https://github.com/tmarthy/ioBroker.skoda-public-api/pull/7) übernommen.
Die anschließende GitHub-CI und der Checker im Stable-PR bestätigten den Stand ohne
Fehler oder Warnungen; Checker-Issue #6 ist geschlossen.

## Konkreter Stable-Antrag

Der Patch [`stable-repository.patch`](https://github.com/tmarthy/ioBroker.skoda-public-api/blob/main/docs/stable-repository.patch) wurde mit dem offiziellen
`addToStable`-Skript erzeugt. Er fügt ausschließlich den alphabetisch einsortierten
Eintrag für `skoda-public-api` mit Version `0.1.11` in `sources-dist-stable.json` hinzu.
Ausgangsstand des Repositorys: `6c21876d88cdbc1528c024b29b89a69f5e5cbd1e`.
Der englische Antragstext ist in [`stable-pr.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/stable-pr.md) dokumentiert;
Patch und Antrag dienen als Nachweis der abgeschlossenen Aufnahme.

## Abschluss und Nachbereitung

- [x] Testabhängigkeit und Dokumentation mit Adapter-PR #7 übernommen; CI grün.
- [x] Stable-Antrag für die veröffentlichte Version `0.1.11` als Repository-PR #6832 eingereicht.
- [x] Repository-Checker ohne Fehler und Warnungen; Stable-PR übernommen.
- [x] README und Projektstatus auf die erfolgte Aufnahme aktualisiert.
- [ ] Nach dem Katalog-Refresh die tatsächlich ausgelieferte Stable-Version kontrollieren.

Eine Information im Forum und eine Ergänzung der ioBroker-News sind optional.
Nach `v0.1.11` übernommene Produktänderungen werden mit einem eigenen Release veröffentlicht.