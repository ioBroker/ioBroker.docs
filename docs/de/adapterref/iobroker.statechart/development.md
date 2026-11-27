---
chapters: {"pages":{"de/adapterref/iobroker.statechart/README.md":{"title":{"de":"ioBroker.statechart"},"content":"de/adapterref/iobroker.statechart/README.md"},"de/adapterref/iobroker.statechart/reference.md":{"title":{"de":"ioBroker.statechart: Referenz"},"content":"de/adapterref/iobroker.statechart/reference.md"},"de/adapterref/iobroker.statechart/development.md":{"title":{"de":"ioBroker.statechart: Entwicklung"},"content":"de/adapterref/iobroker.statechart/development.md"}}}
---
# ioBroker.statechart: Entwicklung

[Übersicht](/#/adapters/statechart) | [English](https://github.com/IggePop/ioBroker.statechart/blob/main/docs/en/development.md)

```bash
npm install
npm run build                # Adapter (src/ nach build/) und Admin-Tab bauen
npm run dev-server setup     # einmalig: lokale ioBroker-Testinstanz in .dev-server/
npm run dev-server watch     # starten, Admin unter http://127.0.0.1:8081/, baut den Adapter bei Änderungen neu
npm run upload:tab           # in einem zweiten Terminal: den Tab in die Testinstanz hochladen
```

Adapter und Editor sind in TypeScript geschrieben. Der Editor importiert das Chart-Modell, die Prüfung und den
Code-Generator direkt aus `src/lib/`, beide nutzen also denselben Code.

| Skript | Beschreibung |
|---|---|
| `dev-server` | Startet den [`dev-server`](https://github.com/ioBroker/dev-server) mit dem angegebenen Befehl. Vorher wendet es die Patches in `patches/` an: Der Dev-Server sucht den Adapter-Prozess mit `wmic.exe`, das es in Windows 11 25H2 nicht mehr gibt, und eine vom Browser zurückgesetzte WebSocket-Verbindung (`ECONNRESET`) würde ihn abstürzen lassen |
| `build` / `watch` | Adapter (`src` nach `build`) und Tab (`admin/src` nach `admin/build`) bauen, mit Typprüfung |
| `build:ts` / `watch:ts` | Nur den Adapter bauen |
| `build:react` / `watch:react` | Nur den Tab bauen |
| `upload:tab` | Den Tab bauen und die Admin-Dateien in die laufende Instanz des Dev-Servers schreiben (funktioniert, während `dev-server watch` läuft) |
| `test` | Unit-Tests (`src/**/*.test.ts` und `admin/src/**/*.test.ts`) und Package-Tests |
| `check` | Typprüfung von Adapter und Tab |
| `lint` | ESLint |
| `translate` | Die Texte des Adapters übersetzen |
| `release` | Ein neues Release erstellen |

Nach Änderungen an `io-package.json` `npm run dev-server upload` ausführen und `npm run dev-server watch` neu starten.

Während `dev-server watch` läuft, baut er den Adapter bei jeder Änderung in `src` selbst. Dann nicht `npm run build`
oder `npm run build:ts` ausführen: Sie löschen zuerst `build`, und danach kopiert der Dev-Server die Dateien in
`build/lib` eventuell nicht mehr in seine Instanz. Ist das passiert, `dev-server watch` neu starten.

**Der gebaute Adapter (`build`) und Tab (`admin/build`) werden committet**, weil Installationen von GitHub keinen Build
ausführen. Nach Änderungen in `src` oder `admin/src` `npm run build` ausführen und `build` und `admin/build` mit
committen. Der Workflow-Job `check-build` schlägt fehl, wenn sie veraltet sind. Die Source Maps werden nicht committet.

**Dependabot** schlägt monatlich Updates vor. Patch-Updates (und Minor-Updates von Entwicklungsabhängigkeiten) werden
automatisch gemergt, wenn die Checks bestanden sind, die für `main` Pflicht sind. Dependabot kann den committeten Build
nicht neu bauen, deshalb vergleicht `check-build` ihn in Pull Requests von Dependabot nicht. Stattdessen baut der Job
nach jedem Push auf `main` `build` und `admin/build` neu und committet sie, wenn sie sich geändert haben. Die Workflows
brauchen das Secret `AUTO_MERGE_TOKEN`, einen fein granulierten Personal Access Token für dieses Repository mit den
Berechtigungen „Contents“ und „Pull requests“ (Lesen und Schreiben). Major-Updates von MUI, React und `@types/node`
werden ignoriert: `@iobroker/adapter-react-v5` braucht MUI 6 und React 18, und der Adapter unterstützt Node.js 22.

**Releases:** `npm run release minor` (oder `patch`, `major`) läuft mit `--yes` ohne Rückfragen durch. Es verschiebt die
Einträge unter `WORK IN PROGRESS` im Changelog zur neuen Version, aktualisiert `package.json` und `io-package.json`,
baut, committet, taggt und pusht. Der Tag startet den Job `deploy`, der das Paket per Trusted Publishing auf npm
veröffentlicht (ohne npm-Token; auf npmjs.com muss der Trusted Publisher „npm publish“ erlauben) und das
GitHub-Release anlegt. Vorher `dev-server watch` beenden, das Release führt `npm run build` aus.

Die automatische Übersetzung der News zerstört Code-Beispiele und Fachbegriffe. Deshalb die News der nächsten Version
direkt vor dem Release von Hand schreiben, als Eintrag `NEXT` in `common.news` von `io-package.json`, in allen
Sprachen, und das Release mit `--all` starten (`npm run release minor -- --yes --all`): Es benennt `NEXT` in die neue
Version um, übersetzt nichts und übernimmt die nicht committete Änderung in den Release-Commit. `NEXT` selbst nicht
committen, das Schema von `io-package.json` erlaubt dort nur Versionen, sonst schlagen die Package-Tests fehl.

| Pfad | Inhalt |
|---|---|
| `src/main.ts` | Adapter: lädt die Charts, abonniert die Eingänge, startet ein Chart neu, wenn es gespeichert wird |
| `src/lib/chart-model.ts` | Chart-Modell (gemeinsam für Adapter und Editor) und Parser der Übergangsbeschriftungen |
| `src/lib/chart-runtime.ts` | Ausführung eines Charts mit XState |
| `src/lib/chart-validation.ts` | Prüfung von Bedingungen, Aktionen und Funktionsblöcken |
| `src/lib/chart-analysis.ts` | Statische Prüfung des Charts: unerreichbare Zustände, nie genommene Übergänge, ungenutzte Variablen, Verwendungen der Variablen |
| `src/lib/chart-codegen.ts` | Code, den „Code anzeigen“ im Editor zeigt |
| `admin/src/` | Editor (React, React Flow, CodeMirror) |
| `admin/tab_m.html`, `admin/tab.css` | Seite des Admin-Tabs, in die der Editor geladen wird |