---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.time-tracker/docs/en/adapter-check.md
title: Überprüfung der Adapterregeln
hash: sSg9cuaTgSzygLnLbMFubS5OlgHxAXSHxKY5zyFjmDU=
---
# Überprüfung der Adapterregeln

Zwei Phasen: `npm run check:adapter` (lokal, offline) und der offizielle Prüfer (`npx @iobroker/repochecker`) sobald das Repository auf GitHub verfügbar ist.

## 1. Lokaler Vorcheck (offline)

```powershell
npm run check:adapter
```

`tools/check-adapter.ps1` prüft die Regeln des offiziellen Prüfers, die **ohne** GitHub ausgewertet werden können, und benennt die angewendete Regel:

| Regel              | Schecks                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------- |
| W0066/S0067        | `@types/node` umfasst die minimale Node-Version von `package.json` →`engines.node`                                |
| (tsconfig)         | `@tsconfig/nodeNN` entspricht der minimalen Node-Version                                                         |
| (generate-adapter) | `.create-adapter.json` →`nodeVersion` Spiele `engines.node`                                                       |
| W5052/W5053        | jeder `"type": "password"` In `admin/jsonConfig.json` ist in `protectedNative` **Und** `encryptedNative`             |
| E5049/E5050        | NEIN `process.env` /`process.exit` im Quellcode (der Adapter kann im Kompaktmodus einen Prozess gemeinsam nutzen) |
| W8918              | keine ioBroker-Workflow-Aktion ohne Versionskennzeichnung (`@main` /`@master`)                                  |
| W6021              | `## License` ist der **letzte** Abschnitt von `README.md`                                                         |
| E510               | `common.news` Die neueste Version enthält alle 11 Sprachen.                                                      |
| W438               | `.vscode/settings.json` enthält `json.schemas`                                                                    |

Exit-Code 1 (mit `-FailOnIssue` Bei Fehlern, Warnungen und Hinweisen wird der Lauf fortgesetzt.

Nicht Teil dieser Phase, da der Prüfer die **Dateiliste des Repositorys** und die **Projekteinstellungen** von GitHub ausliest: veröffentlichte Versionsnummern, Versionshinweise, `package-lock.json` gegen `engines.node`, die Dependabot-Konfiguration, der Vergleich der Lizenzdatei, die Rechte der Aktionen und die Struktur von `objects` /`instanceObjects` Deshalb bleibt die zweite Stufe bindend.

Der Prüfer untersucht die Zustände der Schaltflächen (`role: "button"` mit `read: false`, `write: true`) strukturell; in diesem Projekt die Unit-Tests in `src/lib/adapter/states.test.ts` Sie gewährleisten dies – außerdem sichern sie die **Objektstruktur** : Jeder Zustand benötigt seine übergeordneten Kanäle. Die „Objektstrukturprüfung“ des ioBroker-Bots vergleicht dies mit der Objektliste eines laufenden Systems und meldet andernfalls einen Fehler. `E3009` („fehlendes Zwischenobjekt“) — in PR #6697 handelte es sich um **126 Nachrichten aus einem einzigen fehlenden Kanal** (`users` Der Root-Kanal wird erstellt in `createUserChannel` Jetzt.

## 2. Offizieller Prüfer (mit einem veröffentlichten Repository)

Der Checker liest Projektdaten immer über die GitHub-API und stoppt, wenn kein Repository vorhanden ist. `[E0000] FATAL: cannot access repository https://api.github.com/repos/…` - Also `--local` Allein funktioniert es nicht. Sobald `https://github.com/sadam6752-tech/ioBroker.time-tracker` existiert:

```powershell
npx @iobroker/repochecker@latest https://github.com/sadam6752-tech/ioBroker.time-tracker --local
```

`--local` Liest die Dateien aus dem Arbeitsverzeichnis (dem lokalen Zustand anstelle des hochgeladenen Zustands); die Repository-Metadaten stammen weiterhin von GitHub. Bei höheren GitHub-Ratenlimits kann ein Token übergeben werden. `--env <file>` enthalten `GITHUB_TOKEN=…` Die

## Bewusste Abweichungen

- `common.compact: true` seit dem 20.11.2026 (vorher) `false` (siehe Entscheidung D2): Die kompakte Gruppe der Instanz entscheidet, ob der Adapter einen Prozess mitnutzt; Gruppe `0` hält es in einem eigenen Prozess.
- NEIN `process.env` /`process.exit` im Quellcode: Die Konfiguration stammt ausschließlich von `adapter.config` Der Lebenszyklus des Adapters beendet den Prozess. In einem gemeinsam genutzten Prozess würde ein Exit auch die anderen Adapter beenden.