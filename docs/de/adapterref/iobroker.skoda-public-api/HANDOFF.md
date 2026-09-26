---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.skoda-public-api/HANDOFF.md
title: Handoff - ioBroker.skoda-public-api
hash: sYc0SjDJne3moW2a0RA2tsAzbiVcaVX7ngTyvEW9RIo=
---
# Handoff — ioBroker.skoda-public-api

Diese Datei beschreibt den aktuellen Arbeitsstand und die nächsten notwendigen Schritte. Nutzerinformationen stehen in[`README.md`](/#/adapters/skoda-public-api) , dauerhafte technische Entscheidungen in[`docs/design-decisions.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/design-decisions.md) und die technischen Arbeitsgrundlagen in[`docs/implementation-plan.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md) Die

## Aktueller Stand

- Das öffentliche Repository ist[`tmarthy/ioBroker.skoda-public-api`](https://github.com/tmarthy/ioBroker.skoda-public-api) Die
- Version `0.1.10` wurde über npm und GitHub veröffentlicht. Version `0.1.11` enthält die Korrekturen der ioBroker-Objektprüfung. Versionsangaben, ioBroker-News und README-Changelog sind darauf abgestimmt. Der Tag `v0.1.11` löst die CI-Matrix und bei Erfolg npm Trusted Publishing sowie den GitHub-Release aus.
- Der Antrag auf Aufnahme in ioBroker `latest` ist als[`ioBroker.repositories#6592`](https://github.com/ioBroker/ioBroker.repositories/pull/6592) weiterhin offen (geprüft am 19. September 2026).
- `bluefox` und `tmarthy` sind als npm-Maintainer eingetragen (am selben Tag geprüft). Die frühere Aufgabe, `bluefox` hinzufügen, ist damit erledigt.
- npm Trusted Publishing ist für Tags über `.github/workflows/test-and-release.yml` eingerichtet. `NPM_TRUSTED_PUBLISHING=true` aktivierte den Deploy-Job.

## Offene Themen in empfohlener Reihenfolge

1. **Aktuellen Review- und Checker-Stand von PR #6592 prüfen.** Frühere Hinweise zu Objektrollen, npm-Ownern, `process.env`, Changelog und Compact Mode nicht ungeprüft als offene Fehler übernehmen. Entsprechende Korrekturen bzw. Unterstützung sind inzwischen vorhanden. Bei Bedarf einen aktuellen Objekt-Export bereitstellen und einen erneuten Check anfordern; Der aktuelle Kommentarverlauf wurde hier nicht geprüft.
2. **Lademodus und Ladeprofile am Fahrzeug prüfen.** Die Schreibzugriffe sind mit Mock- und Integrationstests abgedeckt; Die neue Steuerung benötigt noch einen Praxistest mit einem passenden Fahrzeug und dessen verfügbaren Modi/Profilen.

## Funktionsumfang

Der Adapter liegt Fahrzeugdaten über die offizielle MyŠkoda Public API und unterstützt Start/Stop für Laden, Klimatisierung, Standheizung und Lüftung sowie das Ladelimit über `charging.settings.targetStateOfChargeInPercent` (50–100 % in 10-Prozent-Schritten). Derselbe Datenpunkt wird bei Umfragen mit der gemeldeten Einstellung aktualisiert. Die VINs werden in der Instanz konfiguriert, weil die API keine Fahrzeugliste anbietet.

`charging.settings.preferredChargeMode` ist für die vom Fahrzeug gemeldeten Modi schreibbar. `chargingProfiles.profiles.<id>.configurationJson` Enthält ein vollständiges Profil zum Lesen, Ändern und Zurückschreiben. Teilobjekte werden nicht zusammengeführt; Die Felder müssen unverändert bleiben. Profile werden vor dem Senden validiert und jeweils unabhängig von anderen Profilen, Modus, Ladelimit und Start/Stop eingereiht. Ändert oder entfernt ein Poll das Profil während der Wartezeit, wird der Schreibzugriff lokal abgebrochen. Gleichzeitige App-Änderungen nach dem letzten Poll können weiterhin kollidieren, da die API keine bedingten Updates unterstützt.

Sterben `*.enabled` -Schalter akzeptiert ausschließlich Boolean `true` und `false`. Andere Werte werden ohne API-Aufruf, Quittierung oder Änderung wartender Befehle ignoriert. `<vin>.refresh` fordert eine vorgezogene Umfrage an; Quote, Befehlsreserve und Fehlerwartezeiten gelten dabei weiterhin.

Unter `<vin>.info.polling` zeigen `nextPollAt`, `lastSuccessfulPollAt` und `reason` den tatsächlichen Scheduler-Plan, den letzten erfolgreichen API-Abruf und den aktuellen Wartegrund. Die Zeitstempel verwenden Unix-Millisekunden. Der letzte Erfolg bleibt über Neustarts erhalten; `0` bedeutet, dass kein Erfolg gespeichert ist. `nextPollAt` ist bei laufendem Request, lokalen Schreibwiederholungen oder ausgesetztem Polling `0`. Die Diagnose kostet keine API-Anfragen und ist unabhängig von der Frische der Fahrzeugdaten. Bei gestoppter Instanz bleiben die zuletzt geschriebenen Werte stehen; Erst der nächste Start ersetzt den alten Zeitplan. Die vollständige Liste der Gründe steht im README.

Unter `<vin>.info.commandConfirmation.<group>` Wird der zuletzt von der API angenommene Befehl je Steuerungsgruppe sichtbar: `status`, `name`, JSON-`target`, `sentAt`, `expiresAt` und `confirmedAt` Die Zustände sind `WAITING`, `CONFIRMED`, `TIMED_OUT` und nach einem gültig konfigurierten Neustart `INTERRUPTED` für zuvor offene Vorgänge. Bestätigungen werden ausschließlich aus bestehenden Umfrage-Antworten abgeleitet; Ein separater lokaler Timer meldet den Fristablauf. Es gibt weder zusätzliche API-Aufrufe noch zusätzliche Verifikations-Polls oder automatische Wiederholungen. Die Semantik von `info.lastCommand` und `ack=true` Bleibt unverändert (API-Annahme).

Die API erlaubt **20 Anfragen pro Stunde und Fahrgestellnummer** . Für jede VIN führt der Adapter daher einen eigenen, persistenten Quota-Bucket unter `<vin>.rateLimit.*`. Umfragen halten eine konfigurierbare Befehlsreserve frei. Befehle laufen über eine Queue mit Coalescing und TTL; Nach einer angenommenen Operation folgt eine Verifikations-Umfrage.

Der Objektbaum unter `<vin>` folgt der API-Antwort. Zustände entstehen nur für gelieferte Fahrzeugteile und werden nicht automatisch gelöscht. Fehlende Daten behalten ihren letzten Wert mit schlechtem Quality-Flag. Besondere Darstellungen sind:

- `charging.status.battery.remainingCruisingRangeInMeters` Kilometer
- `activeVentilation.durationInSeconds` Minuten
- `auxiliaryHeating.durationInSeconds` Minuten
- `parkingPosition.position`: `lat;lon` für Karten und Geofencing
- Ladeprofil unter `chargingProfiles.profiles.<id>` statt nach Listenindex

Konfiguration und adapterdefinierte Objektnamen sind in allen elf unterstützten ioBroker-Sprachen verfügbar. Logs, Benachrichtigungen und Ergebnisse des Verbindungstests sind immer auf Englisch. Eine Backend-Sprachauswahl gibt es nicht.

## Architektur

```text
src/main.ts
  ├─ config + i18n
  ├─ SkodaApiClient ── sanitize + typisierte API-Fehler
  ├─ VehicleQuotaManager ── ein persistenter QuotaManager pro VIN
  ├─ PollScheduler ── Kadenz, Backoff und Verifikations-Polls
  ├─ CommandQueue ── Coalescing, TTL und Retry-Strategie
  ├─ StateWriter ── Objektbaum, Quality-Flags und Metadatenmigration
  └─ KeyExpiryWatcher ── Ablauf-States, Logs und ioBroker-Notifications
```

| Bereich                 | Dateien                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------ |
| API-Vertrag und Codegen | `spec/skoda-openapi.json`, `tools/spec.mjs`, `tools/generate-*.mjs`                  |
| HTTP und Fehler         | `src/lib/api/client.ts`, `errors.ts`, `sanitize.ts`                                  |
| Quote                   | `src/lib/quota/QuotaManager.ts`, `VehicleQuotaManager.ts`, `AdapterQuotaStore.ts`    |
| Polling und Befehle     | `src/lib/scheduler/PollScheduler.ts`, `src/lib/commands/CommandQueue.ts`             |
| Staaten und Metadaten   | `src/lib/states/StateWriter.ts`, `objectOverlay.ts`, `objectNames.ts`                |
| Übersetzungen           | `admin/i18n/*/translations.json`, `src/lib/i18n.ts`, `src/lib/states/objectNames.ts` |
| Entwicklungs-API        | `test/mock/server.ts`, `test/fixtures/*.json`                                        |
| Tests                   | Tests neben den Modulen, `test/package`, `test/integration.js`                        |

## Entwicklung und Prüfung

Voraussetzungen sind Node.js 22 oder neuer und `npm ci` Die

```bash
npm run check
npm run lint
npm test
npm run build
```

Der Integrationslauf startet eine echte ioBroker-Testinstanz gegen den lokalen Mock und dauert deutlich länger:

```bash
npm run test:integration
```

Der Mock läuft separat mit:

```bash
npm run mock
curl -H "X-API-Key: mock-api-key" \
  http://127.0.0.1:8099/api/v1/vehicles/TMBJB9NY5RF999999
```

Mit `SKODA_API_BASE_URL=http://127.0.0.1:8099` kann auch der Dev-Server den Mock verwenden. Diese Variable darf nicht auf einem Produktivsystem gesetzt werden. In der Admin-UI gibt es bewusst keine frei konfigurierbare API-Basis-URL.

Nach Änderungen an `src/` Oder `admin/` Der Dev-Server benötigt ein neu gebautes Paket und einen Upload der Adapterdateien. `build/` Bleibt unversioniert, muss aber im npm-Paket enthalten sein. Sterben `files` -Liste in `package.json` steuert den Paketinhalt; eine `.npmignore` wird dafür nicht verwendet. Vor dem Packen den Build ausführen.

## CI und Release

Drückt auf `main`, Versions-Tags, Pull Requests und manuelle Läufe führen folgende Prüfungen aus:

- TypeScript und ESLint auf Ubuntu mit Node 24
- Anschließend Adaptertests auf Ubuntu, Windows und macOS mit Node 22, 24 und 26

Bei Branch-Pushes überspringt der Pfadfilter reine Markdown-, `docs/` - und `.vscode/` -Änderungen; Für Pull Requests gilt dieser Filter nicht. Der wöchentliche Spec-Wächter läuft montags und kann manuell gestartet werden. Dependabot prüft npm-Abhängigkeiten am 8. und GitHub Actions am 22. jeden Monats.

Freigabeprüfung:

```bash
npm run check
npm run lint
npm test
npm run test:integration
npm run build
npm pack --dry-run
npm run check:spec
```

`npm run check:spec` greift auf die Live-Spec zu. Bei einer Abweichung zuerst die neue Spec prüfen, die lokale Kopie mit `node tools/check-spec.mjs --update` aktualisieren und dann `npm run codegen` ausführen. Spec, generierte Typen und Objektdefinitionen gemeinsam prüfen und versionieren.

## Betriebsrelevante Hinweise

- API-Key und S-PIN gehören ausschließlich in die Admin-UI. Beide Felder sind auch `encryptedNative` und `protectedNative` delegiert.
- Der Verbindungstest kostet eine Anfrage für die getestete VIN.
- `info.connection` wird bei `401` und `403` auf `false` gesetzt, bei erschöpfter Quote jedoch nicht.
- Ein abgelaufener Schlüssel reduziert das Polling auf einmal pro Stunde. Der Adapter kann keinen neuen Schlüssel erzeugen.
- Die API antwortet auf Befehle mit `202 Accepted` und bietet keinen Operationsstatus. `ack=true` bedeutet daher nur, dass der Befehl an die API übergeben wurde.
- Logs und Fehler müssen durch `sanitize()` laufen; laufen; VIN, API-Key, S-PIN, Adresse und Parkposition dürfen nicht in Support-Logs erscheinen.
- Die OpenAPI-Version ist `v0`. Änderungen am Vertrag und am Rate-Limit bleiben ein laufendes Risiko.
- Nur der Enyaq ist mit echten Fixtures abgedeckt. Angaben für Verbrenner, Hybrid und Standheizung basieren auf Spec und Mock.

## Bewusst außerhalb des Adapters

- Automatische Ermittlung von VINs
- Ver- und Entriegeln, Hupe oder Lichthupe
- Setzen eines maximalen Ladestroms in Ampere (Profil-Presets `REDUCED` /`MAXIMUM` sind möglich)
- Automatische Erneuerung des API-Schlüssels
- PV-Regelung; dafür gibt es `examples/pv-surplus-charging.js`
- Sentry oder andere externe Fehlertelemetrie

## Lokale Profilbearbeitung

- `ProfileEditor` stellt unter `chargingProfiles.profiles.<id>.edit` Einzelfelder, Wochentagsschalter sowie `apply` /`reset` bereit. Eingaben und Umfragen werden serialisiert.
- Feldänderungen bleiben lokal; Apply nutzt die bestehende Queue mit vollständigem Profil und ursprünglichem Snapshot. Keine zusätzlichen Lese- oder Verifikationsanfragen.
- `dirty`, `conflict`, `message` beschreiben den Entwurf; ACK bedeutet lokal gespeichert. Befehlsstatus und Bestätigung bleiben in `info.lastCommand` /`info.commandConfirmation` Die
- Bei Neustart werden Entwürfe erst aus dem nächsten gültigen Poll neu aufgebaut. Geänderte/fehlende Profile und abweichende laufende Profilbefehle blockieren Apply.
- Tests prüfen unter anderem Konflikte, Timer-IDs, Validierung, unbekannte Felder, Neustart und mehrere Feldänderungen mit genau einem PUT im Integrationstest.

### Metadaten und Verfügbarkeit des Profileditors

- Einstellungsrollen: `switch.setting`, `level.setting.battery`, `level.setting.battery.min`, `text.setting`, jeweils eindeutig pro Kanal. Wiederholte Textfelder verwenden `text` Wochentage `switch` Verfügbare Schaltflächen bleiben `button`; nicht verfügbare Boolesche Werte erhalten `indicator` Zahlen `value` und Saiten `text` jeweils `read=true` /`write=false` Die
- `profileEditorLabels.ts` enthält mehrsprachige Feldnamen, Auswahltexte und Hilfen. Wochentage kommen aus `Intl` (UTC, zwischengespeichert). `common.states` verwendet Stringwerte in der Systemsprache; ein Sprachwechsel wird nach Neustart wirksam.
- `initialize(vins)` Liest ausschließlich lokale Staaten/Objekte und sperrt persistierte Editorfelder bis zum nächsten gültigen Poll. `edit.available` zeigt die Verfügbarkeit.
- Entfernte Felder bleiben mit letztem Wert erhalten: `write=false`, `q=1`, übersetzte Beschreibung. Rückkehr setzt Metadaten und Qualität zurück. Änderungen an einem lokalen Entwurf bleiben bei Konflikten erhalten; nicht verfügbare Felder sind gesperrt.
- Migration aktualisiert nur abweichende Metadaten. Benutzerdefinierte Namen und andere Einstellungen wie History bleiben erhalten. Keine zusätzlichen Fahrzeuganfragen.

### Lokalisierte Diagnosen

`diagnosticTranslations.ts` übersetzt Editormeldungen und die Labels der Polling- und Bestätigungsstatus in allen Sprachen. Die Systemsprache wird beim Start einmal gelesen; Backendlogs bleiben englisch, API-Werte und Statuscodes unverändert. Vorhandene `common.states` Werden gezielt migriert, abgeschlossene Bestätigungen bereits beim Start. Sprachwechsel benötigen einen Adapterneustart. Tests prüfen Rollenkonsistenz und eindeutige detaillierte Rollen auch nach Ausfall, Wiederkehr und Neustart; Der Integrationstest läuft mit deutscher Systemsprache und unveränderter Anzahl an Fahrzeugrequests.