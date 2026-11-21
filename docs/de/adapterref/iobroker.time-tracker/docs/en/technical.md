---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.time-tracker/docs/en/technical.md
title: Technische Hinweise (intern)
hash: ovDvKg5XIhpU+nOIacsQYngbbnzFbkOOdPBUXgdG5qU=
---
# Technische Hinweise (intern)

Dieses Dokument fasst die technischen Details zusammen, die zuvor in der [README-Datei](/#/adapters/time-tracker) standen: die HTTP-Schnittstelle, Sitzungen und Sicherheit, Live-Ereignisse, die Offline-Warteschlange der Anwendung und die Datenbank. Die README-Datei reicht für die Verwendung des Adapters aus; so sieht er im Detail aus.

## HTTP-Oberfläche

- `/api` ist das einzige API-Präfix – die Web-App besitzt alle anderen Pfade (clientseitiges Routing).
- Fehler treten auf als `application/problem+json` (RFC 9457) mit einem stabilen `code` Die App übersetzt die Codes.
- Die Downloads sind echte Dateien (`content-disposition: attachment`), nicht JSON: `/api/reports/pdf` Und `/api/reports/xls` Die
- `/api/stream` ist der WebSocket für Live-Events. Er akzeptiert den Session-Cookie, sodass der Browser kein Token in der URL benötigt; ein Mitarbeiter sieht nur seine eigenen Events.
- Wenn `www/` Wenn der Adapter fehlt, läuft er weiter und stellt nur die API bereit – eine Logzeile gibt an, welcher Fall zutrifft.
- Der Adapter meldet sich in seiner eigenen Schnittstelle an als `common.localLinks` (`%protocol%://%ip%:%port%/` Der Administrator zeigt ein Symbol dafür in der Instanzzeile und in der Übersicht an. **Der Administrator** füllt die Platzhalter aus. `%ip%` aus `bind` (mit `0.0.0.0` die Adresse, die der Browser verwendet hat, um die Admin-Seite zu erreichen), `%port%` vom Instanzport; eine Reverse-Proxy-Regel für `time-tracker.0` ersetzt den Link durch einen eigenen Pfad.

## Sitzungen, CSRF und Ratenbegrenzungen

Die Sitzungen der Web-App werden in einem `httpOnly` Cookie (`SameSite=Lax`, `Secure` (hinter HTTPS) gespeichert, sodass ein eingeschleustes Skript sie nicht lesen kann. Die App selbst speichert nur das CSRF-Token und den Benutzer. `localStorage` Das Sitzungstoken verlässt niemals den Cookie. Zustandsändernde Anfragen benötigen zusätzlich den Header. `x-csrf-token`, welche `GET /api/auth/me` Gibt die Sitzung für die eigene Sitzung zurück (damit ein Browser sie nach einem Neuladen wiederfindet). Integrationsclients verwenden weiterhin den Header. `x-session-token` Aus der Anmeldeantwort geht hervor, dass auf diese Weise kein CSRF-Token benötigt wird, da eine fremde Seite keinen eigenen Header setzen kann.

Die Ratenbegrenzungen und das Prüfprotokoll arbeiten mit der Clientadresse. Mit einem vorgeschalteten Proxy wird diese von dort gelesen. `x-forwarded-for` nur wenn **Trust the reverse proxy** aktiviert ist und der Eintrag **ganz rechts** zählt (`x-forwarded-for: client, proxy`), weil der linke Teil vom Kunden stammt.

## Offline-Warteschlange

Ohne Internetverbindung fügt die Webanwendung die Stempelungen einer lokalen Warteschlange hinzu (`pending`) und sendet sie beim nächsten Kontakt; was nicht eindeutig zugeordnet werden kann, führt zu einem Konflikt in der Ansicht _Sync_ und wird von der Administration entschieden. Solange ein Stempel vorhanden ist `pending` oder `conflict`, es zählt bei keiner Berechnung: die Paarung (`src/lib/domain/punch.ts`) lässt es aus.

## Datenbank

SQLite über `better-sqlite3` Im WAL-Modus befinden sich die Änderungen im Datenverzeichnis des Adapters. Schemaänderungen existieren nur als versionierte Migrationen in `src/lib/db/migrations.ts` (`schema_migrations` Migrationen erfolgen nur durch Anhängen, jede Änderung führt zu einer neuen Nummer. Veröffentlicht werden aggregierte Daten und Kontrollbefehle – die Unternehmenszahlen (`company.*`), die monatlichen und jährlichen Werte pro Mitarbeiter, das neueste Ereignis (`events.*` und die Aktionen: Regeln in `trigger_rules`, deren Zustände der Adapter abonniert (bei einer Wertänderung oder, gemäß einer Regel, bei jedem Schreibvorgang; mit einer Abklingzeit), die automatischen Regeln in `automation_rules` /`automation_runs` (Ein- und Ausstempeln, Benachrichtigung, Pausenerinnerung – innerhalb der gewählten Wochentage, höchstens einmal pro Mitarbeiter und Tag bzw. ISO-Woche) und `sendTo` Nachrichten (`punch`, `present`, `status`, `report`, `backup` Die Schläge selbst bleiben in der Datenbank gespeichert.

## Pausen

Der Anbruch eines Tages kommt von `src/lib/domain/breaks.ts` Die gestempelten Pausen sind die Lücken zwischen den Stempelpaaren, die Pausenskala zieht pro Block (vom ersten bis zum letzten Stempel) eine feste Minutenzahl ab, und der Modus `pause_mode` entscheidet, welche zutrifft (`auto` = gelocht, andernfalls die Waage). Vom bezahlten Teil (`work_profiles.pause_paid_minutes`), wird höchstens die Pause selbst angerechnet. Beide Werte ergeben sich pro Tag in `day_aggregates` und somit auch im monatlichen Kontoauszug.