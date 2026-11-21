---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.logsearch/README.md
title: ioBroker.logsearch
hash: Ogr7iCeJl/yM9axvQz6dMarxw/BMjRMM8f+Kc5esa2Q=
---
![Logo](../../../en/adapterref/iobroker.logsearch/admin/logsearch.png)

![Test und Freigabe](https://github.com/disaster123/ioBroker.logsearch/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.logsearch

Durchsuchen Sie ioBroker-Protokolldateien direkt in der Admin-Oberfläche nach Zeitbereich, Ebene und Text.

## Merkmale

- Erkennt das Protokollverzeichnis und die Benennung der Protokolldateien anhand der js-controller-Konfiguration.
- Durchsucht das aktive ioBroker-Protokoll und das rotierte `<name>.YYYY-MM-DD.log` Dateien.
- Liest transparent gzip-komprimierte historische Protokolle.
- Filtert nach einem Textfragment ohne Berücksichtigung der Groß-/Kleinschreibung und den Ebenen `error`, `warn`, `info`, `debug`, oder `silly` Die
- Begrenzt die Anzahl der Ergebnisse und kennzeichnet abgeschnittene Ergebnisse deutlich.
- Aktualisiert das aktive Suchprotokoll alle fünf Sekunden nach einer Suche.
- Die Synchronisierung erfolgt erneut, sobald der Browser-Tab, die Netzwerkverbindung oder der Admin-Socket wiederhergestellt ist.
- Speichert doppelte physische Protokollzeilen als separate Ergebnisse.
- Schaltet die Ansicht „ **Ab jetzt“** um, sodass nur neue übereinstimmende Einträge angezeigt werden oder wieder die Protokollhistorie angezeigt wird.
- Exportiert die angezeigten Protokollzeilen als UTF-8-Format. `.txt` Datei.
- Ruft die zehn zuletzt eingegebenen Suchbegriffe aus einer permanenten Auswahlliste ab.

Der Textfilter ist eine einfache, nicht zwischen Groß- und Kleinschreibung unterscheidende Teilstringsuche in der gesamten Protokollzeile. Es handelt sich nicht um einen regulären Ausdruck.

## Anforderungen

- Node.js 22 oder neuer
- js-controller 6.0.11 oder neuer
- Admin 7.6.20 oder neuer

## Installation

Der Adapter ist auf [npm](https://www.npmjs.com/package/iobroker.logsearch) veröffentlicht. Die Aufnahme in den offiziellen ioBroker-Adapterkatalog steht noch aus.

Sobald die Option **„Log Search“** im Adapterkatalog von ioBroker Admin enthalten ist, wählen Sie sie aus und fügen Sie eine Instanz hinzu.

## Admin-Registerkarte und Instanzen

Der Adapter ist bewusst auf eine Instanz pro ioBroker-Installation beschränkt. Der zugehörige Admin-Tab bietet einen interaktiven Arbeitsbereich zur Protokollsuche mit Ergebnistabellen, inkrementellen Aktualisierungen, Live-Filterung, Suchverlauf und Exportfunktion. Die separate Konfigurationsansicht dient lediglich der Verwaltung des Protokollspeicherorts und der Standardeinstellungen für die Suche; ein Standard-jsonConfig-Konfigurationsformular ist für diesen interaktiven Arbeitsbereich nicht geeignet.

Bei Installationen mit mehreren Hosts befinden sich die Protokolldateien lokal auf dem Host, auf dem der Adapter ausgeführt wird. Die Registerkarte „Admin“ durchsucht die für diese Instanz zugänglichen Protokolle; Protokolle von anderen Hosts werden nicht aggregiert.

## Konfiguration

| Einstellung                          | Standard | Beschreibung                                                                                        |
| ------------------------------------ | -------: | --------------------------------------------------------------------------------------------------- |
| Protokollverzeichnis                 | _(leer)_ | Verzeichnis, das die ioBroker-Protokolldateien enthält. Für die automatische Erkennung leer lassen. |
| Standardstunden                      |     `72` | Vom Tab „Protokollsuche“ wurde zunächst ein bestimmter Zeitbereich verwendet.                       |
| Standardmäßige maximale Zeilenanzahl |    `500` | Maximale anfängliche Anzahl der zurückgegebenen Zeilen.                                             |

Der Adapter erzwingt ein absolutes Maximum von 5.000 Zeilen pro Anfrage. Das konfigurierte Protokollverzeichnis wird serverseitig verwendet; ein Client kann es in einer Suchanfrage nicht überschreiben.

### Automatische Protokollverzeichniserkennung

Bei einem leeren **Log-Verzeichnis** liest der Adapter Folgendes: `iobroker.json` und wertet die erste aktivierte Funktion aus `log.transport` vom Typ `file`, genau wie js-controller es tut:

- `filename` Standardwert `log/iobroker` Relative Dateinamen werden mithilfe von js-controller aufgelöst. `logger.ts` Regel: Bei npm-Installationen wird das Installationsverzeichnis verwendet, bei Entwicklungsumgebungen das Controller-Verzeichnis. Dieses Ziel wird auch dann verwendet, wenn es leer ist oder noch nicht existiert; Protokolldateien in anderen Verzeichnissen dürfen den konfigurierten Pfad nicht überschreiben.
- Absolut `filename` (`/var/log/iobroker/iob` sowie `D:\logs\iobroker`) wird unverändert verwendet.
- `fileext` bestimmt die Dateiendung der rotierten Dateien; der symbolische Link des aktiven Protokolls ist immer `<name>.current.log` Die
- Zuerst wird das vom Controller aufgelöste Datenverzeichnis überprüft. `iobroker.json` Dadurch wird Folgendes bewahrt `IOBROKER_DATA_DIR` Unterstützung durch adapter-core ohne Zugriff auf die Prozessumgebung im Adapter.

Wenn kein verwendbarer Dateitransport gelesen werden kann, prüfen die Adaptersonden die Kandidaten für `log/`, plus das Geschwisterverzeichnis des Datenverzeichnisses und `/opt/iobroker/log` Das erkannte Verzeichnis wird beim Start protokolliert und auf der Konfigurationsseite angezeigt. Die veraltete Standardeinstellung `/opt/iobroker/log` Die Tatsache, dass frühere Versionen in jede Instanz geschrieben haben, wird ignoriert, wenn diese nicht existiert, sodass auch bestehende Instanzen von der Erkennung profitieren.

## Verwendung

1. Öffnen Sie die Registerkarte **„Protokollsuche“** in ioBroker Admin.
2. Geben Sie optional einen Textabschnitt ein und wählen Sie den Zeitbereich, die Ebene und die Zeilenbegrenzung.
3. Wählen Sie **„Suchen“** . Durch Ändern eines Filters wird nach kurzer Verzögerung automatisch eine neue Suche gestartet.
4. Lassen Sie den Tab geöffnet, um automatisch neue passende Einträge zu erhalten.

Die Ergebnisse werden nach Aktualität sortiert (neueste zuerst) und zeigen Zeitstempel, Ebene, Quelle und Nachricht an. **Mit „Filter löschen“** wird der Textfilter entfernt.

**Ab sofort** wird die Tabelle geleert und nach neuen Einträgen gesucht. Die Schaltfläche bleibt in diesem Modus hervorgehoben. Die aktuellen Filter bleiben erhalten und Protokolldateien werden nicht gelöscht. Der Startpunkt wird anhand der Netzwerkuhr festgelegt und bleibt auch bei erneuter Suche, Filteränderung oder erneuter Verbindung aktiv. Klicken Sie erneut auf die hervorgehobene Schaltfläche **„Ab jetzt“** , um ältere Einträge innerhalb des ausgewählten Zeitraums einzubeziehen. Durch Neuladen der Seite wird die normale Verlaufsansicht wiederhergestellt.

**Der Export als .txt-Datei** lädt exakt die aktuell angezeigten Zeilen herunter, beginnend mit den neuesten, einschließlich doppelter Zeilen. Die UTF-8-Datei enthält den ursprünglichen Protokolltext ohne Terminalfarben. Aktive Filter und die Zeilenbegrenzung werden berücksichtigt; ein gekürztes Ergebnis exportiert nur die angezeigten Zeilen.

Klicken Sie auf das **Suchfeld,** um die letzten zehn Suchanfragen (neueste zuerst) anzuzeigen. Die Eingabe filtert die Dropdown-Liste anhand des Anfangs des Suchtextes (Groß-/Kleinschreibung wird nicht beachtet). Sie verschwindet, wenn keine Treffer angezeigt werden. Ein leeres Feld zeigt den gesamten Verlauf an. Wählen Sie einen Eintrag mit der Maus oder den Pfeiltasten aus und drücken Sie die Eingabetaste, um erneut zu suchen, ohne die anderen Filter oder die Option **„Ab jetzt“** zu ändern. Eine nicht leere Suchanfrage wird gespeichert, wenn Sie die Eingabetaste drücken, auf **„Suchen** “ klicken oder das Eingabefeld verlassen. Automatische Aktualisierungen und zwischenzeitliche Tastatureingaben füllen den Verlauf nicht. Durch die Wiederverwendung einer Suchanfrage wird diese an den Anfang verschoben (Groß-/Kleinschreibung wird nicht beachtet). Beim Öffnen des Tabs wird der letzte Suchstatus wiederhergestellt und für die erste Suche verwendet. Das Löschen des Filters wird ebenfalls gespeichert, während die vorherigen nicht leeren Suchbegriffe in der Dropdown-Liste verfügbar bleiben. Der Adapter speichert den Verlauf und den letzten Suchstatus als JSON. `logsearch.<instance>.searchHistory`, Zum Beispiel `logsearch.0.searchHistory` Es bleibt auch nach Neustarts des Adapters/Browsers erhalten und wird von allen Benutzern dieser Instanz gemeinsam genutzt. Der Suchtext wird wortgetreu beibehalten, einschließlich Leerzeichen; nur leere Einträge oder solche, die ausschließlich aus Leerzeichen bestehen, werden übersprungen.

## Entwicklung

Der Adapter selbst ist in TypeScript geschrieben. `src/` und kompiliert zu `build/` Die Admin-GUI ist ein separates npm-Projekt in `src-admin/`, gebaut mit [Vite](https://vite.dev/) und[`@iobroker/gui-components`](https://github.com/ioBroker/adapter-react-v5) ; `npm run build` schreibt es an `admin/` Die

```bash
npm ci            # adapter dependencies
npm run 1-npm     # GUI dependencies from src-admin/package-lock.json (npm ci)
npm run lint      # eslint for src/ (npm run lint-frontend for src-admin/)
npm run check     # tsc for src/ and test/
npm test          # unit tests and package validation
npm run build     # build/ (tsc) and admin/ (vite)
```

Die vollständige GUI-Version läuft `npm ci` In `src-admin/` selbst wenn `node_modules` Existiert bereits. Es verwendet die festgeschriebene Sperrdatei ohne `--force` und stoppt, wenn die Installation der Abhängigkeiten fehlschlägt. Bei wiederholten GUI-Builds nach einmaliger Installation der Abhängigkeiten wird der einzelne Build-Vorgang abgebrochen. `2-build`, `3-copy`, Und `4-patch` Es sind weiterhin Aufgaben verfügbar.

Für die Arbeit mit der grafischen Benutzeroberfläche starten Sie den Vite-Entwicklungsserver und verbinden Sie ihn mit einer laufenden Admin-Instanz auf Port 8081:

```bash
cd src-admin
npm start
```

Dann öffnen `http://localhost:3000/?instance=0` für den Konfigurationsdialog oder `http://localhost:3000/?instance=0&tab=true` für die Registerkarte „Protokollsuche“.

CI prüft Adapter und GUI unter Node.js 24 auf Code- und Typfehler, erstellt beides aus einem sauberen Checkout und führt anschließend Adaptertests unter Node.js 22, 24 und 26 auf Linux aus. Release-Tags führen die Adaptertests auch unter Windows und macOS aus.

### Vorbereitung einer Veröffentlichung

Verwenden Sie Node.js 24 und `npm ci` für Releases. Aktualisieren Sie die Version in `package.json`, `src-admin/package.json`, `io-package.json` und beide Root-Versionsfelder in jedem `package-lock.json` (Wurzel und `src-admin/`), zusammen mit dem Änderungsprotokoll und den übersetzten Versionshinweisen. Feature-Pull-Requests aktualisieren die generierten Dateien nicht in `build/` Und `admin/` Die

Übertragen Sie den vollständigen Quellcode-Commit und warten Sie, bis der **Test- und Release** -Workflow erfolgreich abgeschlossen ist. CI erstellt den Adapter und die Admin-Oberfläche für jeden Pull Request neu. Nach allen Prüfungen wird der Push an `main` Der CI-Prozess wird erfolgreich abgeschlossen und die generierten Dateien werden gespeichert. `build/` Und `admin/` Dateien an `main` Installationen direkt von GitHub beinhalten daher den kompilierten Adapter und die Admin-Oberfläche. Aktualisierungen von Abhängigkeiten übertragen lediglich die aktualisierte Paketsperre; der nachfolgende Test-Workflow veröffentlicht den entsprechenden Admin-Build.

Warten Sie auf den generierten Build-Commit und erstellen Sie dann eine annotierte Datei. `v<version>` Tag auf dem resultierenden `main` HEAD und pushe nur diesen Tag. Vermeide CI-Skip-Anweisungen in Release-Commit-Nachrichten. Tag-Läufe überprüfen, ob Tag und alle Paketversionsfelder übereinstimmen. Der Publishing-Job erstellt den Adapter und die Admin-Oberfläche unmittelbar vor der Veröffentlichung über npm Trusted Publishing und der Erstellung des GitHub-Releases. Verschiebe niemals einen bereits veröffentlichten Release-Tag.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.0.3 (2026-11-07)

- (@disaster123) Replace the default adapter icon with the logsearch logo.
- (@disaster123) Update Admin UI and development dependencies.
- (@disaster123) Adapt Dependabot auto-merge to GitHub's pull request security policies.
- (@disaster123) Keep the seven latest multilingual release news entries.

### 1.0.2 (2026-10-08)

- (@disaster123) Limit the adapter to a single instance and translate the Admin tab into all supported languages.
- (@disaster123) Document the standalone log search workspace and local-host scope.
- (@disaster123) Update testing and Node 22 TypeScript development configuration for the ioBroker review.

### 1.0.1 (2026-09-20)

- (@disaster123) Remember a cleared search filter when reopening the Log Search tab.

### 1.0.0 (2026-09-20)

- (@disaster123) Restore the latest saved search when opening the Log Search tab.

### 0.0.5 (2026-09-18)

- (@disaster123) Add a dropdown with the last ten searches, persisted in the adapter instance's object tree and filtered by prefix while typing.
- (@disaster123) Use the test dependencies provided by `@iobroker/testing` instead of declaring them twice.
- (@disaster123) Use the controller-resolved data directory for log detection without direct process-environment access.
- (@disaster123) Complete the Admin UI translations in all supported languages.
- (@disaster123) Align Git ignore rules with the compiled adapter and Admin UI intentionally tracked by CI.
- (@disaster123) Run Windows and macOS adapter tests only on release tag pushes; keep Linux tests on every push and pull request.

### 0.0.4 (2026-09-16)

- (@GermanBluefox) Detect the log directory and the log file naming from the js-controller configuration; an empty **Log directory** now means automatic detection.
- (@GermanBluefox) Migrate the adapter and the Admin GUI to TypeScript.
- (@GermanBluefox) Build the Admin GUI with Vite and `@iobroker/gui-components` (React 19, MUI 9).
- (@GermanBluefox) Include the compiled adapter and Admin UI in the CI-generated commit for installations from GitHub.
- (@disaster123) Resolve log paths using the controller logger's configured destination so stale logs in other directories cannot override it.
- (@disaster123) Fix standalone GUI linting and install locked GUI dependencies with proper error handling.

### 0.0.3 (2026-09-16)

- (@disaster123) Add a toggleable From now button to hide old log entries.
- (@disaster123) Export the displayed log rows as a text file.
- (@disaster123) Keep the CI-generated Admin build on `main` for installations from GitHub.
- (@disaster123) Verify committed Admin assets and release versions before publishing; remove background asset commits.

### 0.0.2 (2026-09-15)

- (@disaster123) Update documentation for the npm publication and prepare automated releases.

### 0.0.1

- (@Disaster123) Initial release.

Older entries will be archived in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Disaster123 <stefan-iobroker@prie.be>

See [LICENSE](https://github.com/disaster123/ioBroker.logsearch/blob/main/LICENSE) for the full license text.