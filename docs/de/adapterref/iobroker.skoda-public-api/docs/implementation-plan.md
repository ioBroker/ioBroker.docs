---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md
title: Technische Arbeitsgrundlage und offene Umsetzung
hash: VnW2Ss694AofYTftOtfKtO2h6svIDGS4vMH/LpGjyKM=
---
# Technische Arbeitsgrundlage und offene Umsetzung

Dieses Dokument beschreibt die aktuelle Implementierung und die noch geplanten Erweiterungen. Dauerhafte Produkt- und Architekturentscheidungen stehen in[`design-decisions.md`](/#/docs/adapterref/iobroker.skoda-public-api/docs/design-decisions.md) ; Der operative Projektstatus steht in[`../HANDOFF.md`](/#/docs/adapterref/iobroker.skoda-public-api/HANDOFF.md) Die

## 1. Systemgrenzen

Der Adapter bindet die offizielle MyŠkoda Public API an ioBroker an. Die API bestimmt folgende Grenzen:

- Statischer, ein an ausgewählte VINs gebundener API-Key
- 20 Anfragen pro Stunde und Fahrgestellnummer
- ein Lese-Endpunkt und keine Fahrzeugliste
- keine Push-Nachrichten oder Webhooks
- Befehlsannahme mit `202 Accepted`, aber kein Operationsstatus
- Keine automatische Schlüsselerneuerung
- OpenAPI-Version `v0` mit möglichen Vertragsänderungen

Diese Grenzen machen Quota-Verwaltung, persistentes Zeitfenster, adaptive Poll-Kadenz und einen vollständigen lokalen Mock zu Bestandteilen des Produktverhaltens.

## 2. Aktuelle Architektur

| Baustein                             | Verantwortung                                                 |
| ------------------------------------ | ------------------------------------------------------------- |
| `src/main.ts`                        | ioBroker-Lebenszyklus, Initialisierung und Verdrahtung        |
| `src/lib/config.ts`                  | Validierung, Defaults und Umrechnung der Instanzkonfiguration |
| `src/lib/i18n.ts`                    | englische Backend-Formatierung und mehrsprachige Objektnamen  |
| `src/lib/api/client.ts`              | HTTP-Aufrufe, Header-Metadaten und typisierte Ergebnisse      |
| `src/lib/api/errors.ts`              | Zuordnung der API-Fehler gemäß Abschnitt 5                    |
| `src/lib/api/sanitize.ts`            | Maskierung sinnvoller Daten vor Log-Ausgaben                  |
| `src/lib/quota/*`                    | ein hartnäckiger Stunden-Bucket pro VIN                       |
| `src/lib/scheduler/PollScheduler.ts` | Poll-Reihenfolge, Frische-Backoff und Verifikations-Polls     |
| `src/lib/commands/CommandQueue.ts`   | TTL, Koaleszenz, Reserve und Wiederholungen                   |
| `src/lib/states/StateWriter.ts`      | Objektanlage, Werte, Quality-Flags und Migrationen            |
| `src/lib/states/objectOverlay.ts`    | Rollen, Einheiten, Enum-Labels und Anzeigeumrechnungen        |
| `src/lib/states/objectNames.ts`      | deutsche und englische Objektnamen                            |
| `src/lib/notifications/keyExpiry.ts` | Ablaufüberwachung und ioBroker-Benachrichtigungen             |
| `test/mock/*`                        | steuerbarer Ersatz für die quotenbegrenzte Live-API           |

Die Startreihenfolge ist verbindlich: Zuerst wird die Konfiguration geprüft, danach werden die persistenten Quota-Buckets geladen. Starten Sie dann CommandQueue und PollScheduler. So erzeugt eine Neustartschleife kein scheinbar frisches Request-Budget.

## 3. Verhalten und Invarianten

### Umfrage und Quote

- Jede VIN besitzt einen eigenen `QuotaManager` Die
- Antwortheader sind die Quelle der Wahrheit für Limit, Restbudget und Reset-Zeit.
- Polling verwendet die Befehlsreserve nicht.
- Ein unveränderter `carCapturedTimestamp` verdoppelt die Poll-Kadenz bis zur konfigurierten Obergrenze.
- Aktivität oder ein gesendeter Befehl setzt die Kadenz zurück.
- Poll-Durchläufe sind serialisiert; Eine erforderliche Verifikations-Umfrage geht während eines laufenden Durchlaufs nicht verloren.
- Quota-Daten liegen unter `<vin>.rateLimit.*` und Neustarts.
- Scheduler-Änderungen werden ohne zusätzliche API-Abfragen über `onScheduleChange` an den StateWriter gemeldet. Die Diagnose-Schreibvorgänge werden je VIN serialisiert und vom Adapter-Lebenszyklus überwacht; Sie blockieren keine Fahrzeugabfragen.
- `<vin>.info.polling.*` Enthält den nächsten Poll-Termin, den über Neustarts erhaltenen letzten erfolgreichen API-Abruf und einen stabilen Statuscode. Lokale Schreib-Retries gelten nicht als neue Umfragen; bei ihnen, laufenden Anfragen und ausgesetztem Polling ist `nextPollAt` gleich `0`. Ein HTTP-Erfolg sagt nichts über die Fahrzeugdatenfrische aus.

### Befehle

- `enabled` bildet den Sollzustand ab; `start` und `stop` erzwingen einen Aufruf.
- Gleiche Sollwerte werden bei bekanntermaßen passendem Ist oder während einer offenen Bestätigung zusammengeführt.
- Die Bestätigungsfrist entspricht der Command-TTL. Ein neuerer Fahrzeugzeitstempel mit passendem Ist beendet sie vorzeitig.
- Befehle ohne verfügbares Budget warten bis zu ihrer TTL in der Warteschlange.
- Nach `202 Accepted` Nach 60 Sekunden wird eine Verifikations-Umfrage angefordert.
- `ack=true` Bestätigt die Übergabe an die API, nicht die Ausführung im Fahrzeug.
- `info.commandConfirmation.<group>.*` Ergänzt pro Steuerungsgruppe den zuletzt angenommenen Befehl um einen sichtbaren Bestätigungsstatus. Es gelten nur geeignete Werte mit neuerem Zeitstempel im betreffenden fehlerfreien Antwortblock als bestätigt.
- Ein separater lokaler Timer meldet `TIMED_OUT`, ohne Queue-Sendungen oder Umfragen anzustoßen. Bestätigungen nutzen ausschließlich die bereits vorhandenen Umfragen. Die Frist beginnt mit der API-Annahme und wird durch Coalescing nicht verlängert.
- Beim Neustart werden zuvor offene Bestätigungen lokal als `INTERRUPTED` markiert; Sie werden nicht wieder gesendet. Diagnose-Schreibvorgänge sind je VIN serialisiert.

### Objektbaum

- Objekte entstehen nur für tatsächlich gelieferte Fahrzeugteile.
- Der Adapter löscht keine Objekte automatisch.
- Fehlende oder fehlerhafte Teile behalten den letzten Wert mit schlechtem Quality-Flag; zurückgegebene Werte erhalten wieder gute Qualität.
- Ladeprofile werden nach Profil-ID abgebildet.
- Benutzerdefinierte Objektnamen und Rollen bleiben bei Metadatenänderungen erhalten. Es werden nur bekannte frühere Standardnamen und nachweislich fehlerhafte Adapter-Rollen migriert.
- Anzeigeumrechnungen betreffen nur State-Werte und Metadaten: Restreichweite wird in km, Lüftungs- und Standheizungsdauer in Minuten dargestellt. API-Antworten, Fixtures und Befehlsdaten bleiben unverändert.

### Datenschutz und Sprache

- API-Key und S-PIN sind `encryptedNative` und `protectedNative` Die
- VIN, Schlüssel, S-PIN, Adresse und Positionsdaten dürfen keine Modulgrenzen in rohen Fehlermeldungen verlassen.
- Admin-UI und Objektbezeichnungen sind mehrsprachig verfügbar.
- Protokolle, Benachrichtigungen und Ergebnisse des Verbindungstests sind immer Englisch, damit sie unabhängig von der Systemsprache in Support-Anfragen verständlich bleiben.

## 4. Entwicklung, Tests und Freigabe

Lokale Mindestprüfung:

```bash
npm run check
npm run lint
npm test
npm run build
```

Für Änderungen an Scheduling, Quota, Befehlen, Persistenz, Objektmigration oder Adapter-Lebenszyklus ist zusätzlich `npm run test:integration` erforderlich. Änderungen am API-Vertrag erfordern `npm run check:spec` anschließend bei Bedarf `npm run codegen` und die Prüfung der generierten Diffs.

Der Mock ist das Entwicklungssystem für API-Verhalten:

```bash
npm run mock
SKODA_API_BASE_URL=http://127.0.0.1:8099 npx iobroker-dev-server run default
```

Pushes, Pull Requests und Tags führen TypeScript, ESLint und die Adaptertests unter Ubuntu, Windows und macOS mit Node 22, 24 und 26 aus. Ein Versions-Tag veröffentlicht nach erfolgreicher Matrix über npm Trusted Publishing und erstellt den GitHub-Release.

Vor einem Release:

1. offene Changelog-Einträge prüfen
2. vollständige lokale Prüfung einschließlich Integrationstest durchführen
3. Vollständigen GitHub-Workflow manuell ausführen
4. `npm pack --dry-run` prüfen; `build/main.js` und die Admin-Übersetzungen müssen enthalten sein
5. Version mit `npm run release` vorläufig
6. Release-Commit und Tag pushen
7. npm-Paket und GitHub-Release kontrollieren

## 5. Fehlerbehandlung

| Antwort                              | Quote     | Wiederholen | Reaktion                                                         |
| ------------------------------------ | --------- | ----------- | ---------------------------------------------------------------- |
| `202 Accepted`                       | ja        | —           | Verifikations-Poll nach 60 s                                     |
| `400 Bad Request`                    | ja        | nein        | Adapterfehler loggen, Befehl verwerfen                           |
| `401 api-key-expired`                | nein      | nein        | `connection=false`, Benachrichtigung, Abfrage einmal pro Stunde |
| `403 api-key-not-authorized`         | nein      | nein        | `connection=false`, Konfigurationshinweis                       |
| `403 operation-not-authorized`       | ja        | nein        | Befehl verwerfen und loggen                                      |
| `404 Not Found`                      | ja        | nein        | VIN prüfen, Abfrage für diese VIN aussetzen                      |
| `422 operation-not-supported`        | ja        | nein        | Fähigkeit dauerhaft merken, Status deaktivieren                  |
| `422 operation-disabled`             | ja        | nein        | Befehl verwerfen Fähigkeit, nicht dauerhaft ändern               |
| `429 rate-limit-exceeded`            | nein      | bis TTL     | `Retry-After` abwarten, Befehl in Queue lassen                   |
| `429 vehicle-not-accepting-requests` | nein      | max. 3      | `Retry-After` und Zurückweichen                                  |
| `500`, `503`, `504`                  | ja        | max. 1      | Jitter; nur oberhalb der Befehlsreserve                          |
| Netzwerkfehler oder Timeout          | unbekannt | max. 1      | konservativ als verbraucht zählen                                |

Sterben `RateLimit-*` -Header lokale Schätzungen korrigieren. Insbesondere wird `403 operation-not-authorized` Konservativ als quotenverbrauchend behandelt, obwohl die allgemeine API-Regel 403-Antworten ausnimmt. Ein Netzwerkfehler kann nach serverseitiger Buchung entstehen und zählt daher ebenfalls konservativ als verbraucht.

## 6. Offene Umsetzung

### ioBroker Neueste Version

- neue Objektstruktur aus einer laufenden Instanz exportieren und an[`ioBroker.repositories#6592`](https://github.com/ioBroker/ioBroker.repositories/pull/6592) Anhängen
- Checker erneut starten und verbleibende Befunde bearbeiten
- `bluefox` als npm-Owner hinzufügen
- manuelle ioBroker-Review bis zur Aufnahme in `latest` begleiten

### Zusätzliche Schreiboperationen

Das Ladelimit ist über `charging.settings.targetStateOfChargeInPercent` umgesetzt: ein gemeinsamer Lese-/Schreib-State mit automatischer Migration bestehender Objekte, Validierung auf 50 bis 100 % in 10-Prozent-Schritten, eigene Coalescing-Gruppe und Verifikations-Poll. Der Staat entsteht, sobald das Fahrzeug die Zieleinstellung liefert; API-Ableitungen werden wie bei Start/Stop behandelt.

Der Lademodus verwendet den bestehenden Staat `charging.settings.preferredChargeMode`. Schreibwerte müssen bekannte Modi sein und in den zuletzt gelesenen `availableChargeModes` kommt vor. Bestehende Objekte werden schreibbar migriert.

Ladeprofile erhalten je numerischer Profil-ID einen zusätzlichen JSON-State `chargingProfiles.profiles.<id>.configurationJson`. Vollständige Profil-Payloads werden validiert; Es gibt kein implizites Zusammenführen von Teilobjekten und keine Neuanlage. Eine zwischenzeitliche Umfrage mit geändertem, entferntem oder fehlendem Profil verwirft wartende Updates. Nicht vorgenommene Änderungen durch andere Kunden bleiben ein Restrisiko.

Modus und jedes Profil haben eigene Coalescing-Gruppen. Quota, TTL, Fehlerbehandlung, API-Quittierung und Verifikations-Polls laufen über dieselbe Queue wie die übrigen Befehle. Mock- und Integrationstests prüfen die neuen Schreibpfade; Ein Praxistest mit passenden Fahrzeugfunktionen steht noch aus.

### Komfortable Profilbearbeitung

Umgesetzt: lokal `edit` -Bereich mit Einzelfeldern für Name, Einstellungen, Timer und Zeitfenster; Wochentage als Schalter. `apply` sendet das vollständige Profil über die Warteschlange, `reset` Verwirft den Entwurf ohne Anfrage. Ausgangssnapshot und laufende Profilbefehle werden vor dem Versand geprüft. `dirty`, `conflict` und `message` Machen Sie den Bearbeitungsstand sichtbar. Umfragen erhalten geänderte Entwürfe; Nach Neustart beginnt die Bearbeitung mit neuen Fahrzeugdaten. Unit- und Integrationstests sichern die Bündelung mehrerer Änderungen und unveränderte API-Aufrufzahlen ab.

Zusätzlich umgesetzt: spezifische Einstellungsrollen, vollständige Feldbeschriftungen und Hilfetexte sowie einzelne Auswahlwerte. Alte Objekte werden ohne Verlust eigener Namen oder History-Einstellungen migriert. Entfernte bzw. noch nicht frisch bestätigte Editorfelder sind schreibgeschützt und als nicht verfügbar gekennzeichnet; `edit.available` zeigt die Profilverfügbarkeit. Wiederkehrende Felder werden reaktiviert. Tests decken Rollen, Sprache, Migration, Neustart und Verfügbarkeitswechsel ab.

Ergänzte Regressionstests prüfen Rolle/Schreibrecht-Konsistenz auch für nicht verfügbare Buttons, eindeutige detaillierte Rollen pro Kanal sowie die Wiederherstellung nach Rückkehr. Editormeldungen und Diagnose-Labels sind in allen Sprachen verfügbar; Tests sichern stabile Statuscodes und die Migration bestehender Label-Zuordnungen ab.

### Laufende Wartung

- Änderungen der OpenAPI-`v0` -Spec prüfen und Codegen anpassen
- Abhängigkeiten und GitHub Actions über Dependabot aktuell halten
- Verhalten weiterer Fahrzeugtypen mit anonymisierten Armaturen absichern
- Kompaktmodus erst nach Bewertung von Lebenszyklus, Timern und Speicherzustand aktivieren