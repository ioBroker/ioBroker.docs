---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.time-tracker/docs/en/development.md
title: Entwicklung
hash: 4xH4LrTat/7kGIPzcrhH0bVwMSjPvFq64iGq7gkwqrM=
---
# Entwicklung

Repository, Skripte, Tests und Release. Die Bindungsregeln befinden sich in[`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.time-tracker/CONTRIBUTING.md) Die [README-Datei](/#/adapters/time-tracker) beschreibt den Adapter für die Benutzer.

## Layout

```
src/          adapter sources (TypeScript)
src-www/      progressive web app (Vite + React + MUI) — built into www/
src-shared/   types and checks that adapter and web app share
admin/        jsonConfig of the instance and translations (11 languages)
test/         package and integration tests (@iobroker/testing)
test/e2e/     browser tests (Playwright, own server without ioBroker)
docs/en/      documentation in English
docs/de/      documentation in German (the original text)
```

## Skripte

| Skript                     | Beschreibung                                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`            | Die TypeScript-Quellen kompilieren                                                                                               |
| `npm run watch`            | Kompilieren und auf Änderungen warten                                                                                            |
| `npm run install:pwa`      | Installieren Sie die Abhängigkeiten der Web-App (`src-www`, eigen `node_modules`)                                               |
| `npm run build:pwa`        | Erstellen Sie die Web-App, typgeprüft in `www/`                                                                                  |
| `npm run dev:pwa`          | Vite-Entwicklungsserver mit `/api` Proxy zur laufenden Instanz                                                                    |
| `npm run lint`             | ESLint (`@iobroker/eslint-config`) für Adapter und Web-App                                                                      |
| `npm run check`            | TypeScript-Typüberprüfung (Adapter und Web-App)                                                                                  |
| `npm run test:ts`          | Unit-Tests der Adapterquellen                                                                                                    |
| `npm run test:package`     | überprüfen `package.json` / `io-package.json`                                                                                     |
| `npm run test:integration` | Adapterstart gegen einen echten JS-Controller (Pakete) `build/` Und `www/`)                                                       |
| `npm run e2e`              | Browsertests (Playwright) gegen `test/e2e/server.mjs`                                                                            |
| `npm run coverage`         | Unit-Tests mit einem Abdeckungsbericht                                                                                           |
| `npm run translate`        | Richten Sie die 11 Übersetzungsdateien aus                                                                                       |
| `npm run check:i18n`       | Überprüfen Sie, ob alle 11 Sprachen vollständig sind.                                                                            |
| `npm run check:adapter`    | lokale Vorprüfung der ioBroker-Regeln ([`adapter-check.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/adapter-check.md) ) |
| `npm run version:bump`     | Versionsnummer erhöhen, Änderungsprotokoll pflegen und `common.news`                                                             |
| `npm run version:check`    | Überprüfen Sie die Version, das Änderungsprotokoll und die Längenbeschränkungen der Listen.                                      |
| `npm run push:approve`     | Den aktuellen Commit für den Push genehmigen (zuerst den Eigentümer fragen).                                                     |
| `npm run release`          | Release erstellen (Version, Changelog, Tag)                                                                                      |
| `dev-server watch`         | Starten und debuggen Sie den Adapter lokal                                                                                       |

## Gebäude

Für eine Veröffentlichung werden **beide** Ausgaben benötigt. `build/` (Adapter) und `www/` (Web-App):

```bash
npm run install:pwa
npm run build:pwa
npm run build
```

`node tools/make-pwa-icons.mjs` Die App-Icons werden neu generiert (sie sind Teil des Repositorys, es wird keine Bildbibliothek benötigt).

## Offen

- **Abnahmetest auf realer Hardware:** abgeschlossen – die PDF-Darstellung für `ru`, `uk`, `zh-cn` und polnische Werke (Unicode-Schriftart durch `report_font_path` (vom Eigentümer am 01.10.2026 geprüft). Der **Import der alten Daten** des Vorgängersystems ist nicht Gegenstand dieses Projekts – die Begründung befindet sich in[`decisions.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/decisions.md) Die
- **Veröffentlichung:** Das Paket ist auf npm verfügbar (die CI veröffentlicht es über npm Trusted Publishing mit Provenienz); der Eintrag in `ioBroker.repositories` wurde angefordert ( [PR #6702](https://github.com/ioBroker/ioBroker.repositories/pull/6702) ) und wartet auf die Überprüfung.
- **Kleinere Lücken:** Die maschinell übersetzten Sprachdateien der Web-App warten noch auf die Überprüfung durch Muttersprachler. Der zuvor geäußerte Wunsch nach NFC-Funktionalität im Adminbereich wurde **erfüllt** : Anstelle einer NFC-App auf dem Smartphone (die nur Android Chrome unterstützt) löst nun jeder ioBroker-Status eine Aktion aus (siehe README, „Aktionen“): Der Adapter abonniert die Tabellenzustände, reagiert bei Wertänderungen (gemäß Regel auch bei jedem Schreibvorgang) und stempelt, rundet oder setzt die Präsenz.

## Paketgrenzen (und was der ioBroker-Repochecker darüber aussagt)

Der Adapter hat **zwei** `package.json` Dateien: das Stammverzeichnis für den Adapter selbst (Laufzeitabhängigkeiten wie z. B. `better-sqlite3`, `pdfkit`, `exceljs`, `luxon`, `ws`) Und `src-www/` für die Web-App (React, MUI, i18next, `qrcode`, …). Die Web-App ist **vorkonfiguriert** mit `npm run build:pwa` und dann liegt in `www/` als fertiges Paket; nichts davon wird geladen, während der Adapter läuft.

Der Repochecker liest die Quellen importierter Pakete und überspringt nur eine **feste** Liste von Ordnern (`excludedSourceDirs` In `lib/M5000_Code.js`: `/admin`, `/build`, `/docs`, `/test`, `/tools`, `/www`, `/src-www`, `/src-vis`, `/src-widgets`, …). Der frühere Ordnername `src-pwa/` war nicht darauf vermerkt, meldete der Prüfer `W5042` („Paket … wird in Quelldateien verwendet, ist aber nicht in den Abhängigkeiten der package.json enthalten“) für react, MUI und i18next – Pakete, die zur Web-App gehören (`src-www/package.json` und dass eine Adapterinstallation nichts mit sich bringen sollte. `src-www/` Der Ordner ist in der Liste, aber die Nachrichten sind verschwunden; nur `dependencies` zählen, `@types/*` Und `@iobroker/types` sind die Ausnahme. `W5049` (`process.env` In `test/e2e/server.mjs`) betrifft den **Testserver** der Browsertests, nicht den Adapter. `S1039` schlug den Kompaktmodus vor – seit dem 20.11.2026 wird dieser vom Adapter unterstützt (`common.compact: true`, Entscheidung D2).

**Lizenzinformationen:** `common.licenseInformation` (`{ type: "free", license: "MIT" }`) ist festgelegt — und **nein** `common.license` daneben stehen könnte: der ioBroker-Pakettest (`npm run test:package`) lehnt beide zusammen ab („common.license sollte nicht zusammen mit common.licenseInformation existieren“). Der Lizenzeintrag in `package.json` (`"license": "MIT"`) wird davon nicht beeinflusst und muss übereinstimmen. Die Pipeline 0.1.7 scheiterte genau daran, weshalb `npm run test:package` steht vor jeder Veröffentlichung auf der Checkliste.

## Objektstruktur (E3009, E1011, E6001)

Der ioBroker-Bot überprüft die Objektliste eines laufenden Systems („Objektstrukturprüfung –`time-tracker.0.json` Für **jeden** Zustand werden die übergeordneten Objekte angefordert: `users.<id>.todayWorkedMinutes` benötigt den Kanal `users.<id>` **und** der Kanal `users` Wenn einer davon fehlt, meldet der Scheck `E3009` („fehlendes Zwischenobjekt“) für jedes betroffene Objekt – in PR #6697 waren dies **126 Nachrichten aus einem einzigen fehlenden Kanal** (`users`).

Darum `createUserChannel` (`src/lib/adapter/states.ts`) erstellt den Root-Kanal `users` ebenso idempotent durch `setObjectNotExists`; die anderen Kanäle (`info`, `company`, `events`, `commands` werden in ihren jeweiligen Formaten erstellt. `create…States` Funktionen.

Zwei weitere Ergebnisse derselben Überprüfung:

- ** `E1011` ** —`common.write` muss zur Rolle passen: `value` ist eine **Leserolle** , daher ist das Beschreibbare `commands.punchUserId` trägt `level` Jetzt.
- ** `E6001` ** — jeder Objektname sollte die **elf** Sprachen enthalten, die `common.titleLang` und die Nachrichten haben es bereits getan. Die Texte befinden sich an **einem** Ort (`src/lib/adapter/stateNames.ts`), Und `src/lib/adapter/states.test.ts` scheitert, sobald einem Namen eine Sprache fehlt.

Weil `setObjectNotExists` Bestehende Objekte bleiben unberührt. `ensureObject` In `states.ts` aktualisiert die **dem Adapter gehörenden** Felder mit `extendObject` nachdem sie erstellt wurden (`name`, `type`, `role`, `read`, `write`, `unit` Ohne dies würden laufende Installationen ihre alte Definition beibehalten: Der vom Prüfprogramm gelesene Objekt-Dump würde weiterhin anzeigen `role: "value"` (`E1011`) und die alten `en` /`de` Namen (`E6001`). `common.custom` wird weggelassen; es enthält die Benutzereinstellungen (zum Beispiel für `history`).

## Veranstaltungen (`events.*`)

`events.lastType`, `lastUser`, `lastDirection` Und `lastSource` Spiegeln Sie das **neueste** Ereignis wider. Diese werden aus dem **Ereignisbus** der API befüllt: `onReady` abonniert es (`api.events.subscribe` und schreibt jedes Ereignis in den Objektbaum durch `publishEventState` — Außerdem werden die Zahlen aktualisiert, wenn es sich bei dem Ereignis um die Zahlen handelt (`FIGURES_EVENT_TYPES`).

Daher veröffentlicht **jeder** Weg Daten im Bus: die REST-API, das Kiosk-Terminal, die Befehlszustände (`commands.*`), A `sendTo` Nachricht (`punch`, `present`), die Aktions-/Auslöserregeln, die automatischen Regeln und der Anwesenheitsstatus (`users.<id>.present` Die reinen Schichten liefern das Ergebnis, und die Adapterschicht erstellt daraus das Ereignis (`punchEvent` In `commands.ts`, `presenceEvent` In `presence.ts`) — ein neuer Weg ohne diesen Schritt zeigt sich genau hier: Die Buchung ist in der Datenbank, aber `events.*` bleibt beim vorherigen Ereignis.

## Nach der Umbenennung: zwei weitere Regeln

Die Änderung zu `ioBroker.time-tracker` Dadurch wurden zwei Dinge sichtbar, die vorher nicht möglich waren:

- ** `common.news` gilt pro npm-Paket** (repochecker) `E2004` Jede dort genannte Version muss unter **diesem** Namen auf npm verfügbar sein. Die Versionen 0.1.x existieren nur im erstgenannten Paket. `iobroker.zeiterfassung` Deshalb beginnt die Nachrichtenliste mit 0.2.0 —`CHANGELOG_OLD.md` erklärt die Geschichte.
- ** `bluefox` muss Mitinhaber des npm-Pakets sein** (repochecker). `E2001`):`npm owner add bluefox
  iobroker.time-tracker ` oder laden Sie auf npmjs.com ein – ohne diese wird kein Adapter verwendet.` latest ` Die` npm run version:check` Erinnert daran als **Warnung** (Bluefox muss die Einladung selbst annehmen, damit der Punkt den Push nicht blockiert).

`npm run version:check` Überprüft die neuen Versionen anhand von npm (Fehler) und der Eigentümerliste des Pakets (Warnung); offline werden beide Punkte übersprungen, sodass die Überprüfung weiterläuft.