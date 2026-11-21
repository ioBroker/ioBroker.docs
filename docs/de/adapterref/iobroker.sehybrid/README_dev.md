---
chapters: {"pages":{"en/adapterref/iobroker.sehybrid/README.md":{"title":{"en":"ioBroker adapter for SolarEdge hybrid inverters"},"content":"en/adapterref/iobroker.sehybrid/README.md"},"en/adapterref/iobroker.sehybrid/README_dev.md":{"title":{"en":"ioBroker.sehybrid — Developer Guide"},"content":"en/adapterref/iobroker.sehybrid/README_dev.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sehybrid/README_dev.md
title: ioBroker.sehybrid - Entwicklerhandbuch
hash: SIA+tJeIFy8BLcbDPSo3Zq9sx0ayF00fjQB5tgaPy20=
---
# ioBroker.sehybrid – Entwicklerhandbuch

Dokumentation zum Erstellen, Testen und Veröffentlichen des **Hybrid-** Adapters erstellen. Die Benutzerdokumentation finden Sie in [der Datei README.md](/#/adapters/sehybrid) .

## Projektlayout

Der Adapter ist in zwei Teile unterteilt:

- **Backend** (der Adapter selbst) — TypeScript in `src/`, zusammengestellt mit `build-adapter ts` hinein `build/` Die
- **Admin-Benutzeroberfläche** (die Konfigurationsseite) – ein deklarativer [jsonConfig-](https://github.com/ioBroker/ioBroker.admin/tree/master/packages/jsonConfig) Dialog in `admin/jsonConfig.json`, mit sprachspezifischen Beschriftungen/Fehlertexten in `admin/i18n/<lang>.json` Es gibt keine React/Vite/TypeScript-Anwendung und keinen Build-Schritt für die Admin-UI – die ioBroker-Administration rendert den Dialog direkt aus dem gespeicherten JSON.

`npm run lint` Und `npm run check` Es wird nur das Backend abgedeckt; die Admin-UI ist einfaches JSON und muss nicht kompiliert werden.

> `build/` Die Ausgabe wird generiert und **nicht** in Git gespeichert. Sie wird erzeugt von `npm run build`. Der Quellcode der Admin-Benutzeroberfläche (`admin/jsonConfig.json`, `admin/i18n/*.json`, `admin/sehybrid.png`) wird direkt eingebunden. Beide sind über die `files` Feld in `package.json` Die

## Voraussetzungen

- Node.js >= 22
- Eine lokale ioBroker-Umgebung wird bereitgestellt über `@iobroker/dev-server` (als Entwicklungsabhängigkeit installiert).

## Erste Schritte

Abhängigkeiten installieren:

```bash
npm install
```

Erstellen Sie das Backend (die Admin-Oberfläche benötigt keinen Build-Schritt):

```bash
npm run build
```

## Läuft in der Entwicklungsphase

Führen Sie ioBroker lokal aus mit `dev-server` (Admin auf <http://localhost:8081> ):

```bash
npm run dev-server        # admin-UI work: admin only, adapter not started
npm run dev-server:watch  # backend work: runs the adapter and restarts it on src/ changes
```

Verwenden `dev-server:watch` beim Ändern des Backend-Codes in `src/` Der neu kompilierte Adapter startet also automatisch neu. Ganz einfach `dev-server` Startet nur den Adminbereich (heller, wenn man auf der Admin-Seite arbeitet).

> Die Admin-Oberfläche benötigt keinen Build-Schritt. Nach der Bearbeitung `admin/jsonConfig.json` oder `admin/i18n/*.json`, die Veränderungen vorantreiben mit `npm run dev-server:upload` und aktualisieren Sie den Browser – es gibt nichts neu zu erstellen.

> Der `dev-server` Das Skript wird ausgeführt mit `--noBrowserSync` Absichtlich. BrowserSync (automatisches Neuladen des Browsers) stört hier die Socket.io-Verbindung des Admin-Bereichs und führt dazu, dass die Benutzeroberfläche sich ständig neu verbindet. Ohne BrowserSync verbindet sich der Admin-WebSocket direkt und zuverlässig; Sie müssen den Browser nach einer Änderung lediglich manuell aktualisieren. Um die Variante mit automatischem Neuladen zu testen, verwenden Sie `npm run dev-server:sync` Die

## npm-Skripte

Laufen mit `npm run <name>` Die

| Skript              | Beschreibung                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `build`             | Erstellen Sie das Backend (TypeScript) in `build/` Die                                                                           |
| `build:ts`          | Baue nur das Backend ein `build/` Die                                                                                            |
| `watch:ts`          | Das Backend wird bei Änderungen neu erstellt.                                                                                   |
| `dev-server`        | Führen Sie den ioBroker-Admin für die Entwicklung der Admin-Oberfläche aus (Adapter nicht gestartet, kein BrowserSync).         |
| `dev-server:sync`   | Dasselbe wie `dev-server`, mit BrowserSync-Auto-Reload.                                                                         |
| `dev-server:watch`  | Führen Sie ioBroker **und** den Adapter im Watch-Modus aus (der Adapter startet neu bei `src/` Änderungen).                      |
| `dev-server:upload` | Laden Sie den Adapter hoch (wird benötigt nach `io-package.json`, `admin/jsonConfig.json`, oder `admin/i18n/*.json` Änderungen). |
| `test:ts`           | Führe die `*.test.ts` Unit-Tests.                                                                                                |
| `test:package`      | Bestätigen `package.json` Und `io-package.json` Die                                                                               |
| `test:integration`  | Testen Sie den Adapterstart mit einer realen ioBroker-Instanz.                                                                  |
| `test`              | Führe Unit-Tests und Paketvalidierung durch.                                                                                    |
| `check`             | Backend-Typprüfung (keine Kompilierung).                                                                                        |
| `lint`              | Linting des Backends mit ESLint.                                                                                                |
| `translate`         | Admin-Texte übersetzen, siehe[`@iobroker/adapter-dev`](https://github.com/ioBroker/adapter-dev#manage-translations) Die         |
| `release`           | Erstellen Sie eine neue Version, siehe[`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage) Die      |

## Kompilierungskonfiguration

Das Backend wird mit [esbuild](https://esbuild.github.io/) kompiliert. `@iobroker/adapter-dev`; Einstellungen anpassen in `tsconfig.json` /`tsconfig.build.json` Die Admin-Benutzeroberfläche benötigt keinen Kompilierungsschritt: Sie ist deklarativ. `admin/jsonConfig.json` plus die `admin/i18n/<lang>.json` Übersetzungsdateien, die der ioBroker-Administrator direkt rendert. Um den Konfigurationsdialog zu ändern, bearbeiten Sie diese JSON-Dateien direkt und übertragen Sie sie mit `npm run dev-server:upload` Die

## Testen

- **Unit-Tests** (`npm run test:ts`) — schnell, gegen die reine Logik in `src/lib` Die
- **Paketvalidierung** (`npm run test:package`) — Überprüfungen `package.json` /`io-package.json` Konsistenz.
- **Integrationstest** (`npm run test:integration`) — startet einen echten JS-Controller und überprüft, ob der Adapter startet. Langsamer (\~30 Sekunden).

Um die CI-Prüfungen vor dem Push lokal zu spiegeln:

```bash
npm ci && npm run lint && npm run check && npm run build && npm run test:ts && npm run test:package && npm run test:integration
```

Beim Hinzufügen von Funktionen oder Beheben von Fehlern sollten Sie passende Unit-Tests hinzufügen. Weitere Informationen finden Sie unter [testgetriebene Entwicklung](https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92) .

### Staatliche Rollen

Verwenden Sie für jeden Status die korrekte [Statusrolle](https://www.iobroker.net/#en/documentation/dev/stateroles.md) . Erfinden Sie keine benutzerdefinierten Rollennamen; falls Sie eine Rolle benötigen, die nicht in der offiziellen Liste enthalten ist, wenden Sie sich an die ioBroker-Entwicklergemeinschaft.

## Git-Workflow

- Arbeiten Sie an der `dev` Branche; Pull Request öffnen in `main` Die
- `main` ist der Release-Branch. Pusht zu `main`, Pull-Anfragen und `v*` Tags lösen CI aus (`.github/workflows/test-and-release.yml`).
- Nur Versionskennzeichnungen (`v<major>.<minor>.<patch>`) führen Sie die `deploy` Job, der auf npm veröffentlicht.

## Veröffentlichung

Erstellen Sie ein Release mit dem [Release-Skript](https://github.com/AlCalzone/release-script#usage) aus einem sauberen Build. `main`:

```bash
npm run release
```

Dadurch wird die Version erhöht und aktualisiert. `io-package.json` und das Änderungsprotokoll, Commits, Tags `v<version>` und drückt. Der Tag-Push löst Folgendes aus: `deploy` Job, der erstellt und auf npm veröffentlicht.

### npm trusted publishing (OIDC)

Releases werden über **Trusted Publishing** (OIDC) auf npm veröffentlicht – nein `NPM_TOKEN` wird gespeichert. `deploy` Job hat `id-token: write` npm tauscht zum Zeitpunkt der Veröffentlichung ein kurzlebiges Token aus und generiert gleichzeitig eine signierte Herkunftserklärung.

Die vertrauenswürdige Veröffentlichung wird einmalig auf der Seite mit den npm-Paketeinstellungen konfiguriert (`https://www.npmjs.com/package/iobroker.sehybrid` → Einstellungen → Vertrauenswürdiger Herausgeber) mit:

- Organisation oder Benutzer: `heresiarch`
- Repository: `ioBroker.sehybrid`
- Workflow-Dateiname: `test-and-release.yml`
- Umgebungsname: _(leer)_
- Für die direkte Veröffentlichung muss **die Option „npm publish zulassen“** aktiviert (und gespeichert) werden.

> npm verlangt, dass das Paket bereits existiert, bevor ein vertrauenswürdiger Herausgeber konfiguriert werden kann. Daher muss die allererste Version einmalig über die Befehlszeile veröffentlicht werden.

Um den Adapter in das ioBroker-Repository zu bekommen, befolgen Sie die [Anforderungen von ioBroker.repositories](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository) .

## Bewährte Verfahren

Siehe die [Best Practices für die ioBroker-Entwicklung](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) .

## Haftungsausschluss

Beachten Sie Urheberrechte und Markenrechte bei der Verwendung von Firmennamen oder Logos. „SolarEdge“ ist eine Marke des jeweiligen Inhabers; dieser Adapter ist ein unabhängiges, inoffizielles Projekt und steht in keiner Verbindung zu SolarEdge und wird von SolarEdge auch nicht unterstützt.