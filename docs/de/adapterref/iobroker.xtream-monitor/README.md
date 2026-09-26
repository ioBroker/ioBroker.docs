---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.xtream-monitor/README.md
title: ioBroker.xtream-monitor
hash: p62IrAbDJCtPI5BQEKjdU1x/rSCnW9gJbl3/q9EmaiU=
---
# ioBroker.xtream-monitor

Überwacht die Verfügbarkeit und die Kontometadaten von benutzerkonfigurierten, Xtream-kompatiblen API-Endpunkten.

Der Adapter dient lediglich der Überwachung. Er stellt keine Mediendaten bereit, erkennt diese **nicht** , leitet sie nicht weiter, spielt sie nicht ab und verteilt sie nicht. Benutzer sind für die von ihnen konfigurierten Endpunkte und Dienste selbst verantwortlich.

## Merkmale

- Überwachen Sie mehrere Endpunkte in einer Adapterinstanz
- Online-/Offline- und Kontostatus
- Ansprechzeit
- Anzahl aktiver und maximaler Verbindungen
- Ablaufdatum und verbleibende Tage
- Letzte Überprüfung, Zeitstempel für letzte Online- und Offline-Zeiten
- Fehlerklassifizierung für Timeout, DNS, HTTP, ungültige Antworten und inaktive Konten
- Optionale Protokollierung nur bei tatsächlicher Änderung des Online-/Offline-Status.
- Zusammenfassende Statusinformationen für VIS, Grafana und andere ioBroker-Visualisierungen

## Anforderungen

- Node.js 22 oder neuer
- js-controller 7.0.7 oder neuer
- Admin 7.8.23 oder neuer

## Konfiguration

Fügen Sie in den Adaptereinstellungen einen oder mehrere Endpunkte hinzu. Jede Zeile enthält:

- **Aktiviert** – Endpunkt in die Überwachung einbeziehen
- **Name** – ein benutzerfreundliches Etikett
- **Host-/Server-URL** – Basis-URL des Xtream-kompatiblen Endpunkts
- **Benutzername** - Kontoname
- **Passwort** – Kontopasswort; die Tabellenkonfiguration fordert verschlüsselte Speicherung für diese Spalte an.

Sie können außerdem das Abfrageintervall, das Timeout für Anfragen und optional die Protokollierung von Statusänderungen konfigurieren.

Technische Server-IDs (`server1`, `server2`, ...) werden intern verwaltet und werden nicht in der Admin-Benutzeroberfläche angezeigt.

## Objektstruktur

```text
xtream-monitor.0
├── info
│   ├── connection
│   ├── allOnline
│   ├── enabledCount
│   ├── onlineCount
│   ├── offlineCount
│   └── lastCheck
└── servers
    ├── server1
    │   ├── online
    │   ├── status
    │   ├── responseMs
    │   ├── activeConnections
    │   ├── maxConnections
    │   ├── expiration
    │   ├── expirationText
    │   ├── daysRemaining
    │   ├── lastCheck
    │   ├── lastOnline
    │   ├── offlineSince
    │   └── errorType
    └── ...
```

## Datenschutz und Sicherheit

- Der Adapter kontaktiert nur Endpunkte, die vom Benutzer explizit konfiguriert wurden.
- Anmeldeinformationen werden niemals absichtlich in das ioBroker-Protokoll geschrieben.
- In der Admin-Tabelle sind die Spalten für Passwörter für die verschlüsselte Speicherung konfiguriert.
- Die vollständige Serverkonfiguration ist durch folgende Maßnahmen vor dem Zugriff durch andere Adapter geschützt: `protectedNative` Die
- Es werden keine Medieninhalte zur Überwachung abgerufen; der Adapter fragt Konto-/Statusmetadaten über den kompatiblen API-Endpunkt ab.

## Entwicklung

```bash
npm install
npm run build
npm run check
npm run lint
npm run test:package
npm run test:integration
```

Repository-Prüfungen können mit folgendem Befehl ausgeführt werden:

```bash
npx @iobroker/repochecker https://github.com/chrvidal/ioBroker.xtream-monitor main
```

## Changelog

### 0.2.11 (2026-09-11)

- Prevented request error states from exposing credentials.
- Added regression coverage for credential-safe request errors.
- Added Node.js 26 to the GitHub Actions test matrix.
### 0.2.10 (2026-09-02)

- Added a compatibility fallback for passwords affected by the ioBroker JSON Config table-encryption regression.
- Automatically remove stale server objects after the corresponding server is deleted from the configuration.
- Added regression tests for password compatibility and deleted-server cleanup.

### 0.2.9 (2026-09-01)

- Fixed startup handling during persistent server ID migration.
- Added regression coverage for password preservation and scheduled multi-server polling.
- Corrected protected configuration metadata for multi-server credentials.

### 0.2.8 (2026-08-31)

- Changed polling to schedule the next check only after the current cycle has finished, preventing overlapping API requests.
- Abort active HTTP requests during adapter unload for clean Compact Mode shutdown.
- Preserve `offlineSince` across adapter restarts while an endpoint remains offline.
- Added the explicit `info` channel and corrected per-server ioBroker state roles.
- Changed `expirationText` to a language-neutral ISO timestamp.
- Protected the configured server table from access by other adapters.
- Added integration tests with local mock API endpoints, including clean-shutdown behavior.

### 0.2.7 (2026-08-30)

- Fixed repository metadata reported by the ioBroker repository checker.
- Added valid `common.news` metadata for the current release.
- Relaxed the `@iobroker/testing` devDependency to a compatible semver range.
- Added Dependabot cooldown configuration.
- Added the required license copyright line.

### 0.2.6 (2026-08-30)

- Prepared repository metadata for ioBroker public repository review.
- Added all required metadata translations and Admin translations.
- Added a responsive Admin layout and table-level password encryption configuration.
- Added package and integration test scaffolding plus GitHub Actions CI.
- Replaced unmanaged JavaScript timers with ioBroker adapter-managed timers.
- Added adapter icon, Dependabot configuration and editor JSON schemas.

### 0.2.5 (2026-08-30)

- Removed the technical server ID column from the Admin UI while keeping persistent internal IDs.

### 0.2.4 (2026-08-30)

- Improved persistent internal server-ID assignment and Admin compatibility.

### 0.2.3 (2026-08-30)

- Fixed GitHub installation by including the compiled adapter entry point.

### 0.2.2 (2026-08-30)

- Simplified server-ID handling in the Admin UI.

### 0.2.1 (2026-08-30)

- Added automatic technical server IDs.

### 0.2.0 (2026-08-30)

- Added monitoring of multiple endpoints in one adapter instance.

## License

MIT License. See [LICENSE](https://github.com/chrvidal/ioBroker.xtream-monitor/blob/main/LICENSE).

Copyright (c) 2026 Christian Vidal <christian_vidal@icloud.com>