---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.time-tracker/CONTRIBUTING.md
title: Mitwirken
hash: kZGQ8jZ1C7BsN0Q79AE/Aqx3oxWjXKxOoyNhEYanBzk=
---
# Mitwirken
Das deutsche Original dieses Dokuments befindet sich in [`docs/de/CONTRIBUTING.md`](https://github.com/sadam6752-tech/ioBroker.time-tracker/blob/main/docs/de/CONTRIBUTING.md).

## 1. Grundregel: Reinraum (Bindung)
Dieses Projekt ist eine **eigene Implementierung** und **keine** abgeleitete Version eines anderen Zeiterfassungssystems. Grundlage ist die **interne Spezifikation**: Sie befindet sich außerhalb dieses Repositorys und wird **nicht veröffentlicht**. Lediglich die Adapterbeschreibung (`README.md`), diese Mitwirkungsregeln und der Quellcode werden veröffentlicht (siehe Abschnitt 6).

**Nicht erlaubt**

- Übernahme von Code, Kommentaren, Nachrichtentexten, Klassen- oder Variablennamen aus anderen Projekten - nicht einmal „Kopieren und Umbenennen“.
- Automatisches Portieren oder Übersetzen von Fremdcode (Transpiler, LLM-Konvertierung).
- Die Datei- oder Klassenstruktur anderer Projekte als eigene Modulstruktur neu aufbauen.

**Erlaubt**

- Technische Fakten, die für die weitere Nutzung vorhandener Daten erforderlich sind: Datei- und Datenformate, Feldindizes und Einheiten

(`users.txt`, `userdaten.txt` Index 0-17, `Timetable/<year>.<month>`, `A<year>`, `absenz.txt`).

- Berechnungsregeln, Verhalten und Rundungsregeln (dokumentiert in der internen Spezifikation).
- Kurze technische Kennungen in der Dokumentation zur besseren Rückverfolgbarkeit.

**Eigene Kennungen im Code** (Englisch, konsistent): `_Vorholzeit_pro_Jahr` → `vorholzeit_per_year`, `_zuschlag` → `shift_rules`, `Timetable` → `time_entries`, `_modell` → `overtimeModel`, `absenz.txt` → `absenceTypes`.

## 2. Arbeitsweise
1. **Zuerst spezifizieren:** Das Verhalten sollte zuerst in der **internen Spezifikation** dokumentiert werden (diese befindet sich außerhalb dieses Repositorys und ist nicht

veröffentlicht).

2. **Tests vor der Implementierung:** Erstellen von Referenzdateien und Testdaten aus den **beobachteten Ausgaben** der Referenz

Installation oder aus den vorhandenen Daten - niemals aus fremdem Code ableiten.

3. **Implementieren Sie** die Spezifikation und passen Sie sie an, wo sie abweicht - verwenden Sie keinen fremden Code als Referenz, um eine Änderung vorzunehmen.

Die Umsetzung passte.

4. Änderungen der Spezifikation werden im selben Schritt wie der Code gepflegt und im PR-Text kurz erwähnt (die

Die Spezifikation selbst wird nicht veröffentlicht.

## 3. PR-Checkliste
- [ ] Kein Code, Kommentar oder Bezeichner, der aus einem fremden Projekt übernommen wurde (Vergleich mit der Spezifikation, Ergebnis benannt).

(in der PR).

- [ ] Interne Spezifikation wird aktualisiert, falls Verhalten oder Format betroffen sind (im PR-Text erwähnt).
- [ ] Tests hinzugefügt oder angepasst (Unit-/Integrationstests; Referenzdatei für die Berechnungslogik).
- [ ] i18n: Neue Texte wurden nur zu `en.json` hinzugefügt, `npm run translate` ausgeführt, `npm run check:i18n` grün (alle 11 Sprachen)

      vollständig).

- [ ] Lizenz- und Herkunftsangaben sind weiterhin korrekt (`LICENSE`, Abschnitt „Herkunft“ in `README.md`).
- [ ] Keine fremden Dateien, Archive oder Datenkopien im Commit (`*.zip`, fremde Verzeichnisse).
- [ ] Neue/geänderte Zustände: `common.role`, `common.type`, `common.read`, `common.write` passen zusammen - keine generische Rolle

`state`, `button` → `boolean` mit `read:false`/`write:true`, Rolle `json` → `common.type = "string"`.

- [ ] Neue Texte in `common.news` der aktuellen Version wurden in **allen 11 Sprachen** hinzugefügt (die Adapterprüfung meldet

(fehlende Übersetzungen der neuesten Version als Fehler).

- [ ] Geheimnisse nur über `encryptedNative`/`protectedNative`; kein Klartext in `native` oder in Protokollen.
- [ ] Ergebnis der im PR genannten Adapterprüfung, sobald das Adaptergerüst existiert

(`npx @iobroker/repochecker <repo-url> --local`).

## 4. Codierungskonventionen
- **TypeScript** (streng), ESLint mit `@iobroker/eslint-config`, Prettier; keine deutschen Bezeichner im Code (Ausnahme:

Domänenbegriffe, die absichtlich dokumentiert werden, z. B. `vorholzeit_per_year`).

- **Adaptertests:** `@iobroker/testing` - `tests.packageFiles` (prüft `package.json`/`io-package.json`) und

`tests.integration` gegen einen js-controller; die bereitgestellten Unit-Mocks sind veraltet.

- **Eigene Logik:** Mocha mit ts-node und chai für Berechnungen und Zeitzonenfälle (`test/mocharc.custom.json`),

Playwright für die End-to-End-Tests der PWA, `npm run coverage` (`nyc`) für die Coverage - der Coverage-Lauf überspringt absichtlich die Typüberprüfung (`test/mocharc.coverage.json`), da ein Typüberprüfungs-ts-Knoten unter `nyc` bei den Adaptertypen fehlschlägt; `npm run check` bleibt das Typgate; Testnamen beschreiben Szenario und Erwartung („erstellt Paare durch (ts_utc, id)“, nicht „test1“).

- **Web-App (`src-www/`):** ein eigenes Projekt mit eigener `package.json`/`tsconfig.json` (React 18, MUI 5, Vite).

Ablauf: `npm run install:pwa` → `npm run build:pwa` (Typprüfung + Kompilierung zu `www/`) → `npm run lint:pwa`; während der Entwicklung `npm run dev:pwa` (leitet `/api` an die laufende Instanz weiter). Die App kommuniziert mit dem Adapter ausschließlich über das API-Präfix `/api`, verwaltet die Sitzung in `localStorage` und speichert Zeiterfassungen offline (`idempotencyKey` pro Zeiterfassung).
Berechtigungen werden **immer** vom Server festgelegt; die Benutzeroberfläche blendet lediglich Inhalte aus, die ohnehin verboten wären. Neue Texte gehören in `src-www/src/i18n/en.json`.

- **Generierte Dateien:** Die Verzeichnisse `build/` und `www/` werden generiert und niemals direkt bearbeitet.
- **Zustände:** Objekte mit `setObjectNotExistsAsync`/`extendObject` erstellen; `common.name` (mindestens `en`+`de`),

`common.type`, `common.role`, `common.read`, `common.write` sind obligatorisch und müssen den Rollenregeln entsprechen (siehe PR-Checkliste).

- **Konfiguration:** Geheimnisse gehören in `encryptedNative`/`protectedNative`; der `native`-Block,

`admin/jsonConfig.json` und `src/lib/adapter-config.d.ts` werden synchronisiert.

- **Zeiten:** intern immer UTC-Epoche **und** ganze Minuten; Anzeige über die Zeitzone des Benutzers.
- **Datenbank:** Änderungen erfolgen ausschließlich über versionierte Migrationen (`schema_migrations`).
- **Fehler:** API-Fehler als `application/problem+json` mit stabilen Fehlercodes (gemäß der internen

Spezifikation).

- **Sprachen (i18n):** Es werden nur Texte aus den Sprachdateien angezeigt; neue Texte werden **nur** zur englischen Basisdatei hinzugefügt und

Dann führe `npm run translate` aus. Details: [`docs/en/i18n.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/i18n.md).

- **Commits:** Kurze, sachliche Beschreibung im Imperativ; ein Commit pro logischer Änderung.
- **Integrationstest:** Dieser Test wird gegen das **erstellte** Paket ausgeführt (`npm pack` aus `build/`). Führen Sie immer `npm run build` aus.

vor `npm run test:integration` - andernfalls prüft der Test stillschweigend den vorherigen Zustand (erkennbar an fehlenden neuen Log-Ausgaben im Testlauf).

- **Zeilenumbrüche und Formatierung:** Zeilenumbrüche sind **LF** (`.gitattributes`, `.editorconfig`, Prettier); CRLF macht

`npm run lint` schlägt mit Hunderten von `prettier/prettier`-Fehlern fehl. Daher ist die Formatierung mit `npx prettier --write "src/**/*.ts"` korrekt, jedoch **nicht** mit `eslint --fix`: `--fix` fügt leere JSDoc-Blöcke für undokumentierte Elemente hinzu und erzeugt dadurch Fehler (`jsdoc/no-blank-blocks`).

## 5. Sicherheitsrelevante Änderungen
Dies betrifft insbesondere Authentifizierung, Sitzungs-/Tokenverwaltung, rollenbasierte Zugriffskontrolle (RBAC), Auditierung und Endgeräte. Solche Änderungen erfordern: eine Risikobeschreibung, Tests der Negativfälle (Berechtigungen, CSRF, Idempotenz, `409`) und eine Aktualisierung der Sicherheitscheckliste in der internen Spezifikation.

## 6. Was wird veröffentlicht
| Dokument | Ort | Veröffentlicht |
| ------------------------------------- | -------------------------------------------------- | ----------------------------- |
| Adapterbeschreibung | `README.md` (später auch `adapter/README.md`) | ja |
| Beitragsregeln (Reinraum) | `CONTRIBUTING.md` | ja |
| Provenienz | Abschnitt „Provenienz“ in `README.md` | ja |
| Quellcode | `src/`, `src-www/`, `src-shared/`, `tools/` | ja |
| Sprachdateien (11 Sprachen) | `admin/i18n/`, `src-www/src/i18n/` | ja (Übersetzungen willkommen) |
| Dokumentation (Englisch, Deutsch) | `docs/en/`, `docs/de/` | ja |
| Dokumentation (Englisch, Deutsch) | `docs/en/`, `docs/de/` | ja |
| Interne Spezifikation | außerhalb dieses Repositorys | **nein** |
| Ausländische Projekte, Archive, Datenkopien | außerhalb dieses Repositorys | **nein** |

Die Regeln dafür:

Die interne Spezifikation wird **niemals** in das Repository kopiert; `.gitignore` enthält eine Sicherheitsvorkehrung dafür.

(`PROJECT_PROMPT.md`, `docs/PROJECT_PROMPT.md`).

Verweise auf Abschnittsnummern der Spezifikation gehören nicht in veröffentlichte Dateien wie `README.md`; intern

Die README-Dateien der Module beschreiben die Anforderungen in eigenen Worten.

- Der Herkunftsnachweis wird außerhalb dieses Repositorys geführt und benennt die Grundlage der Implementierung sowie die Aussage „nein

„Übernahme von fremdem Quellcode“.

### Freigabeverfahren
1. Mit dem Befehl `npm run version:bump patch` wird die Version in `package.json`, `io-package.json` und im Changelog der README-Datei festgelegt.

Fügen Sie die Nachrichteneinträge anschließend in **allen 11 Sprachen** hinzu - der Bump kopiert nur die erste Zeile.

2. `npm run version:check` (prüft auch, ob die Listen nicht anwachsen: höchstens sieben `common.news`-Einträge und fünf

Die in der README-Datei aufgeführten Versionen (`npm run check:i18n`, `npm test`, `npm run check:adapter` und `npm run e2e`) müssen den Status „Grün“ haben - erst dann wird der Commit durchgeführt.
Nach skriptgestützten Änderungen muss immer `npm run lint` ausgeführt werden: ESLint behandelt Prettier-Regeln als Fehler, und ein einzelner zu langer Ausdruck führt zum Fehlschlagen des CI-Jobs `check-and-lint`. `lint` und `lint:pwa` werden zusammen mit `--max-warnings 0` ausgeführt, daher ist eine Warnung genauso ein Fehler wie ein Fehler.

3. **Vor dem Commit und Push fragen.** Der Versions-Commit und das Tag werden nur dann veröffentlicht, wenn der Inhaber (Alex) „ok“ sagt:

Unmittelbar vor der Veröffentlichung wird geprüft, ob das Pushen erlaubt ist oder ob Anmerkungen vorliegen. Erst nach diesem „OK“ wird der Commit erstellt, getaggt und gepusht.

4. Committe, **annotiertes** Tag (`git tag -a vX.Y.Z -m 'X.Y.Z'`) und Push mit Genehmigung (`npm run push:approve`). Der Commit

Die Versionsänderungsnachricht wird zur **Versionsnotiz** - der Workflow schreibt ihren Inhalt auf die Release-Seite. Sie ist daher **in Englisch** verfasst (wie die Changelog-Einträge in der README-Datei), damit die Release-Seite für alle verständlich ist.

5. **Warten Sie, bis der Workflow „Test und Freigabe“ für das Tag grün ist - und dann weitere 5 bis 10 Minuten:**

Die Veröffentlichung auf npm erfolgt am Ende des Laufs, und der Registry-Index wird anschließend aktualisiert (gemessen: grüner Lauf 17:37, `npm view … dist-tags` zeigt die Version 17:42 an). Erst dann prüfen.

6. Ein Tag einer veröffentlichten Version wird **niemals gelöscht und erneut hochgeladen**. Dadurch wird die entsprechende GitHub-Version gelöscht.

Es wird ein Fehler ausgelöst (npm lehnt eine zweite Veröffentlichung derselben Version ab), ohne dass Änderungen am veröffentlichten Paket vorgenommen werden. Falls ein Tag fehlt, wird lediglich dieser Tag neu gesetzt und die Veröffentlichung in der GitHub-Oberfläche erstellt.

## 7. Lokaler Entwicklungsserver (ioBroker dev-server)
Die Entwicklungsinstanz befindet sich in `.dev-server/`: die Administration in `http://127.0.0.1:8081`, der Adapter mit der Weboberfläche in `http://127.0.0.1:8092`. Sie wird gestartet mit

```powershell
npm run dev-server watch
```

Der Entwicklungsserver erstellt den Adapter, installiert ihn in der Entwicklungsinstanz (`npm pack` + `npm install`) und startet ihn selbst; bei jeder Änderung der Quellen startet er ihn nach etwa zwei Sekunden neu.

Regeln, wichtig in dieser Reihenfolge:

1. **Die Instanz bleibt im Controller deaktiviert.** Der Entwicklungsserver startet den Adapter selbst, und der Controller muss

Starten Sie es nicht zusätzlich - andernfalls läuft jede Startanforderung des Controllers auf `ADAPTER_ALREADY_RUNNING` (Code 7) und wiederholt sich alle 30 Sekunden. Prüfen und setzen Sie (ab `.dev-server/default`):

```powershell
node node_modules/iobroker.js-controller/iobroker.js list instances
node node_modules/iobroker.js-controller/iobroker.js object set system.adapter.time-tracker.0 common.enabled=false
```

Im Log steht dann `Do not restart adapter system.adapter.time-tracker.0 because disabled or deleted`, und der Adapter läuft weiter, weil er vom Entwicklungsserver gehalten wird.

2. **Starten oder starten Sie den Adapter in `ioBroker.admin` niemals neu, während `dev-server watch` ausgeführt wird - ein Start vom

Die Schnittstelle aktiviert die Instanz erneut und erzeugt exakt die Schleife von Regel 1. Im Protokoll sieht das folgendermaßen aus: `"system.adapter.time-tracker.0" enabled` → `started with pid …` → `terminated with code 7 (ADAPTER_ALREADY_RUNNING)` → `Restart adapter … because enabled`, alle 30 Sekunden. Die Dokumentation des Entwicklungsservers weist explizit darauf hin. Ein Neustart wird erzwungen, indem eine Quelldatei gespeichert wird (der Watcher übernimmt) oder die gesamte Kette neu gestartet wird.

3. Wer den Adapter **über die Administratoroberfläche** starten und stoppen möchte, wählt einen der beiden Modi - und zwar nur einen.

Die Seite beherbergt den Adapter, und ein Start/Stopp in der Schnittstelle ist unproblematisch:

- `npm run dev-server run` - der Entwicklungsserver startet den Adapter nicht, der Controller hält ihn bereit. Hot Reload ist vorhanden.

nur für die Admin-Oberfläche; Codeänderungen benötigen `npm run build` und (bei gestopptem Entwicklungsserver) `npm run dev-server upload`.

- `npm run dev-server watch --noStart` - Der Entwicklungsserver erstellt und synchronisiert weiterhin automatisch, aber nicht

Starten Sie den Adapter. Dieser deaktiviert die Instanz bei jedem Start (`adapter.common.enabled = false`, im Log `Stop <adapter>.0`). Starten Sie den Adapter daher **einmal** danach - entweder über die Admin-Oberfläche oder mit `node .dev-server/default/node_modules/iobroker.js-controller/iobroker.js start time-tracker.0`. Anschließend wird er vom Controller verwaltet; Starten, Stoppen und Neustarten über die Oberfläche sind problemlos möglich. Nach einer Codeänderung starten Sie den Adapter dort neu, damit die synchronisierte Version geladen wird.

4. **Nur ein Entwicklungsserver gleichzeitig** und **kein zusätzliches `npm run build` ** daneben: Der Entwicklungsserver erstellt sich selbst.

Parallele Aufbauten führen zu Rennsituationen und anschließenden Neustarts.

5. Falls die Instanz trotzdem in der Schleife hängen bleibt, beenden Sie alle Prozesse, deren Befehlszeile das Repository oder `.dev-server` angibt.

und `npm run dev-server watch --noStart` neu starten.

6. Die Playwright-Suite (`npm run e2e`) startet einen eigenen Server auf Port `8099` mit einer In-Memory-Datenbank und verlässt den Server.

Der Entwicklungsserver bleibt unberührt; er lädt den Adapter von `build/`, weshalb `npm run build` vorher benötigt wird.

7. Verwenden Sie für den Aufruf die Option `--no-browser-sync`: BrowserSync ist einmal beim Start aufgrund eines Wettlaufs mit dem Administrator fehlgeschlagen.

Der Server startete immer noch (`ECONNREFUSED 127.0.0.1:20426`) und riss dabei den Entwicklungsserver mit in den Absturz. Der einzige Nachteil ist, dass Änderungen an der ioBroker-Admin-Oberfläche nicht mehr automatisch neu geladen werden.

Die Daten der Entwicklungsinstanz befinden sich unter `.dev-server/default/iobroker-data/time-tracker.0/` (Datenbank, `session-secret`, `backups/`) und sind nicht versioniert.

## 8. Versionierung und Veröffentlichung
Die Adapterversion ist an **zwei** Stellen angegeben und muss identisch sein: `package.json` (`version`) und `io-package.json` (`common.version`). Die Überprüfung erfolgt in `npm run test:package` und zusätzlich in `npm run version:check`.

Regeln:

1. **Nichts wird ohne Genehmigung übertragen oder veröffentlicht.** Vor einem `git push` und vor jedem Versionsschritt

(`npm run release …`) wird der Maintainer gefragt und die Antwort abgewartet. Wer den Push blockieren möchte, aktiviert die Genehmigungspflicht in seiner Arbeitskopie (lokale Einstellung, nicht versioniert):

```powershell
git config zt.requirePushApproval true   # works only together with core.hooksPath = .githooks
npm run push:approve                     # shows the open commits and approves exactly this commit
git push                                 # now allowed — the next commit needs an OK again
```

Ohne Genehmigung bricht der Vorschubhaken ab; schalten Sie ihn mit `git config zt.requirePushApproval false` dauerhaft ab.

2. **Vor jedem Push erhöht `npm run version:bump --patch` die Version** (bzw. die `minor`/`major`-Version). Das Tool setzt beides.

Die Versionsfelder werden angepasst, der Abschnitt „WORK IN PROGRESS“ in der README-Datei wird in die neue Version umbenannt, ein neuer Platzhalter erstellt und `common.news` für die neue Version hinzugefügt. Anschließend werden die Neuigkeiten übersetzt (`npm run translate` oder manuell) und `npm run version:check`, `npm run check:i18n` sowie die Tests ausgeführt. Die Argumente gehören hinter `--`, andernfalls werden sie von npm ignoriert (`npm run version:bump -- patch --dry` zeigt die Vorgehensweise ohne explizite Beschreibung).

3. **Jede Änderung wird vor dem Push im Änderungsprotokoll der README-Datei (`## Änderungsprotokoll`, neuester Abschnitt) eingetragen.

`### **WORK IN PROGRESS**`). Dieser Block darf **nicht leer sein** - das Release-Tool lehnt dies ab. Die Version wird dafür **nicht** manuell geändert.

4. **Das Änderungsprotokoll befindet sich in der README-Datei, nicht in einer separaten Datei.** Das Release-Tool liest die Datei `CHANGELOG.md` nur, wenn sie existiert.

Die README-Datei würde dann nicht mehr gepflegt. Sie enthält die letzten **fünf** Versionen (`--numChangelogEntries`, Standard 5); ältere Versionen werden in `CHANGELOG_OLD.md` verschoben, sobald diese Datei existiert. Ein Link in der Fußzeile zu `CHANGELOG_OLD.md` muss in der README-Datei verbleiben (das Tool erfordert dies).

5. **Die Veröffentlichung erfolgt über ein Tag.** Das Tag kennzeichnet die Version, die in der CI erstellt und über npm veröffentlicht wird.

Vertrauenswürdige Veröffentlichung** (ohne diese Genehmigung in npm schlägt der Bereitstellungsvorgang fehl):

```powershell
git tag v0.0.2                   # mark the approved version
npm run push:approve             # approval for the tag push
git push --follow-tags           # push the tag — the CI publishes the package
```

`npm run release <patch|minor|major>` bleibt als Alternative verfügbar: Es erhöht die Version, schreibt das Änderungsprotokoll und `common.news` und die Tags in einem Schritt (siehe `.releaseconfig.json`, das zuerst `npm run build` ausführt).

**Beide Build-Ausgaben gehören zum Paket.** Der Deployment-Job erstellt `build/` **und** `www/` vor der Veröffentlichung (eigenes `build-command`, da `build/` und `www/` nicht im Repository vorhanden sind); `npm run check:package` - automatisch vor `npm pack` und `npm publish` bis `prepack` - führt zu einem Fehler bei der Veröffentlichung, falls eines dieser Pakete fehlt. Die Veröffentlichungen bis Version 0.0.6 enthielten kein `www/` und beantworteten `/` mit `404 not_found`.

6. Überprüfen Sie nach jedem Versionsschritt die Texte in `common.news` in allen 11 Sprachen oder führen Sie `npm run translate` aus - den Adapter.

Der Prüfer fordert sie an (Regel E510). `npm run check:i18n` meldet Lücken.

7. **Der Pre-Push-Hook** prüft die Punkte 1 und 2 automatisch. Aktivieren Sie ihn einmal pro Arbeitskopie:

```powershell
npm run hooks:install
```

Der Push wird abgebrochen, wenn keine Genehmigung für den Commit vorliegt, die Versionsfelder abweichen, das Änderungsprotokoll der README-Datei fehlt oder der neueste Abschnitt weder „IN BEARBEITUNG“ noch die aktuelle Version enthält. Mit `git push --no-verify` kann dieser Vorgang bewusst übersprungen werden.