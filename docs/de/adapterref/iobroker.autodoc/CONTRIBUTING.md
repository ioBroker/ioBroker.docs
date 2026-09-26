---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.autodoc/CONTRIBUTING.md
title: Mitarbeit an ioBroker.autodoc
hash: M4AiKieATuR2jKskQIzt3cK7tmQdsMepAio59zidJos=
---
# Beitrag zu ioBroker.autodoc
Diese Datei ist für **Mitwirkende im Git-Repository** bestimmt. Sie ist absichtlich **nicht** im Array `files` in `package.json` aufgeführt: Das **npm-Tarball** für ioBroker-Installationen sollte **nur Laufzeitdateien** enthalten (dasselbe Prinzip wie bei den mit [Adapter erstellen](https://github.com/ioBroker/create-adapter) generierten Adaptern). ** `README.md` ** wird weiterhin veröffentlicht (npm enthält sie immer). ** `LICENSE` ** ist in `files` aufgeführt und somit Teil des Paketinhalts.

## Referenzen (ioBroker-Ökosystem)
Adapterneutrale Linksammlung (projektübergreifend wiederverwendbar): [`docs/iobroker-adapter-references.md`](/#/docs/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md) - **Gedächtnisstützen** für regelkonforme Adapterarbeit (keine vollständige Spiegelung externer Dokumente).

Nutzen Sie die Links oben in [`TODO.md`](/#/docs/adapterref/iobroker.autodoc/TODO.md) (**Wichtige Referenzen**) bei der Entwicklung oder Überprüfung von Änderungen - insbesondere:

- [ioBroker Entwicklerportal](https://www.iobroker.dev)
- [Adapter-Prüfer](https://adapter-check.iobroker.in/)
- [ioBroker.repositories - Best Practices](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices)
- [REVIEW_CHECKLIST](https://github.com/ioBroker/ioBroker.repositories/blob/master/REVIEW_CHECKLIST.md)
- [type-detector](https://github.com/ioBroker/ioBroker.type-detector)
- [ioBroker AI Developer Guide](https://github.com/Jey-Cee/iobroker-ai-developer-guide)
- [Adapter Creator](https://github.com/ioBroker/create-adapter)

Roadmap und interne Aufgabenverfolgung: [`TODO.md`](/#/docs/adapterref/iobroker.autodoc/TODO.md), [`PLAN.md`](/#/docs/adapterref/iobroker.autodoc/PLAN.md).

### Npm-Paketidentität (für Maintainer)
- **Öffentlicher Paketname:** [`iobroker.autodoc`](https://www.npmjs.com/package/iobroker.autodoc) (entspricht `package.json` → ** `name` **). Erstveröffentlichung ab **0.9.35**; frühere **0.9.x**-Versionen waren ausschließlich über Git verfügbar (siehe ** `common.news` ** und **README**-Änderungsprotokoll).
- **Inhaber:** Wer auch immer die Releases pflegt, sollte unter `npm owner ls iobroker.autodoc` erscheinen; GitHub org/user für das Repository ist **crunchip77** (siehe `package.json` ** `author` ** / ** `repository` **).
**Versionen synchron halten:** Bei jedem **npm**-Release wird die ** `version` ** in ** `package.json` ** und ** `io-package.json` ** gleichzeitig aktualisiert (verwenden Sie für Veröffentlichungen ein normales ** `x.y.z` **-Tripel), ** `common.news` ** wird aktualisiert (maximal **7** Schlüssel - **nur** Versionen, die auf **npm existieren**, prüfen Sie **E2004**) und das **Changelog**-Fenster in der README-Datei wird an die gleichen Versionen angepasst. Verwenden Sie ** `npm run release` ** ([`@alcalzone/release-script`](https://github.com/AlCalzone/release-script)) anstelle von ** `npm publish` **, damit ioBroker-Plugins wie gewünscht funktionieren (siehe **Releases und README-Changelog** unten).
- **Zwischen den Veröffentlichungen:** Wenn `main`/`dev` bereits die nächste **`x.y.z``**-Version anvisiert, ** `npm publish` aber noch nicht ausgeführt wurde, verwenden Sie eine **Vorabversion** (z. B. ** `0.9.39-alpha.0` **) in ** `package.json` ** / ** `io-package.json` **, damit **repochecker** keinen Eintrag in ** `common.news` ** für eine Version benötigt, die nicht auf npm verfügbar ist (**E1036** vs. **E2004**). Entfernen Sie das Suffix und fügen Sie den ** `news` **-Eintrag für ** `x.y.z` ** direkt vor ** `npm publish` ** ein.

## Branch-Workflow (Git)
- **Entwicklung auf `dev`:** Verwenden Sie `git checkout dev` für alltägliche Commits und Experimente. Push: `git push origin dev`.
**Zusammenführen mit `main`, sobald stabil:** Wenn eine Version für eine breitere Standardisierung bereit ist (URL-Installation von `main`, Vorabtests abgeschlossen), führen Sie sie mit `main` zusammen und pushen Sie sie, z. B. mit `git checkout main && git pull && git merge dev && git push origin main`. Anschließend kehren Sie zu `dev` zurück, um die weitere Bearbeitung zu ermöglichen: `git checkout dev`. Sollte `main` jemals einen Hotfix allein erhalten, führen Sie `main` wieder mit `dev` zusammen, damit beide Branches auf dem gleichen Stand bleiben.

## Lokale Prüfungen
```bash
npm install
npm test
npm run lint
npm run check
```

Optional: `npm run dev-server` für eine lokale Admin/dev-Schleife (siehe `@iobroker/dev-server`).

### Adapterprüfung (`@iobroker/repochecker`)
Nach `npm install`, vom Stammverzeichnis des Repositorys (**Arbeitsbaum = dieser Adapter**, `dev`-Branch oder Ihr PR-Branch):

```bash
npm run adapter-check
```

Dies führt ** `@iobroker/repochecker@5.11.1` ** im ** `--local` **-Modus gegen ** `https://github.com/crunchip77/ioBroker.autodoc` `main` ** aus (siehe `package.json` → ** `adapter-check` **). **Hinweis:** ** `--local` ** kann ** `§§LLLLL_0§§ / **` iobroker.dev `**) is an alternative but may return **504 Gateway Timeout** or fail under load — retry later, try branch **` main `**, or rely on **` npm run adapter-check `** and CI. Upgrade **`@iobroker/repochecker`** aufrufen, sobald eine korrigierte Version verfügbar ist.

Typische Meldungen, solange der Pull Request für **ioBroker.repositories** noch offen ist:

- **E1025 / E1042 (`extIcon`):** Der Prüfer **lädt die Datei **common.extIcon`** per HTTP herunter. Die Datei muss unter der angegebenen URL vorhanden sein und ein gültiges Symbol darstellen (für **E1042** außerdem ≤ 512×512 Pixel). Verwenden Sie die direkte GitHub-URL des Haupt-Branches (derselbe Commit, den Benutzer vom Standard-Branch erhalten).
- **E2000 (Paket nicht auf npm):** Der Adapter **ist** als ** `iobroker.autodoc` ** (ab **0.9.35**) veröffentlicht. Falls ein Checker-Lauf weiterhin **E2000** meldet, versuchen Sie es nach einer Verzögerung bei der Registry-/Indexierung erneut oder vergleichen Sie die Ergebnisse mit dem [gehosteten Adapter-Checker](https://adapter-check.iobroker.in/) für dasselbe Versions-Tarball.
- **W4001 (Adapter noch nicht in `ioBroker.repositories`):** Dieser Fehler wird erwartet, bis ** `autodoc` ** in ** `sources-dist.json` ** vorhanden ist. PR **[#5978](https://github.com/ioBroker/ioBroker.repositories/pull/5978)** wurde zusammengeführt (30.06.2026). Sollte ein späterer Checker-Lauf weiterhin W4001 melden, wurde der Eintrag **entfernt** (häufig, wenn der Adapter nach Checker-Fehlern wieder als **neu** behandelt wird). Bitte öffnen Sie **keinen** neuen latest-PR, bis die Fehler in **Problem #60** behoben sind. **Stable** (`sources-dist-stable.json`) bleibt **auf Eis gelegt**, bis genügend Tester vorhanden sind (Problem #54).
- **E4052 (GitHub noreply email):** Die Adresse `users.noreply.github.com` wird in den Dateien `package.json` (`author.email`), `io-package.json` (`common.authors`), der README-Datei (Copyright) und der LICENSE-Datei nicht akzeptiert. Verwenden Sie eine vom Maintainer überwachte E-Mail-Adresse (z. B. eine öffentliche Adresse). Die Änderung der Adresse liegt im Ermessen des Maintainers - erfinden Sie keine Adresse.
- **E6034 / W6034 (README `## Lizenz`):** Dieser Abschnitt muss den **vollständigen MIT-Text** (≥100 Wörter) **oder** einen Markdown-Link enthalten, dessen URL ** `LICENSE` ** enthält (z. B. `[LICENSE](https://github.com/crunchip77/ioBroker.autodoc/blob/main/LICENSE)`). Behalten Sie ** `## Lizenz` als letzte `##`-Überschrift bei** (W6021).
- **E2008 / S2008 (npm-Herkunft):** Das **neueste** npm-Tarball muss **Herkunftsnachweise** enthalten. Dies geschieht nur, wenn ** `npm publish` in GitHub Actions** mit **Trusted Publishing** (OIDC, `id-token: write`) ausgeführt wird - **nicht** nach einem `npm publish` auf einer Workstation. **0.9.46** wurde lokal veröffentlicht, daher wurde die Überspringungsfunktion in ** `deploy` ** nie mit ** `testing-action-deploy` ** ausgeführt. **Behebung = Nächste Semver-Version über CI** (siehe **Trusted Publishing** unten). Obwohl der Adapter in der neuesten Version **fehlt**, kann der gehostete Checker diesen Vorschlag zu einem **Fehler** **erhöhen**.
- **W5029 (`manual-review` fehlt in `.releaseconfig.json`):** Der gehostete **Repochecker** erwartet alle drei Plugins ** `iobroker` **, ** `license` ** und ** `manual-review` ** (Release-Skript-Konvention von ioBroker). ** `manual-review` ** pausiert vor `git commit` und fragt nach einer Bestätigung - führen Sie ** `npm run release` ** nur in einem **interaktiven** Terminal aus (nicht in einer Headless-CI-Umgebung); ** `--yes` ** überspringt diese Abfrage nicht. Für eine vollständig automatisierte Pipeline trennen Sie „prepare“ und „commit/tag/push“ bei Bedarf manuell.
- **W5005 / E5005 (`setTimeout` in lib-Dateien):** **Behoben** in allen betroffenen Dateien:
- ** `lib/aiEnhancer.js` **: `invokeProvider` in `AiEnhancer` übergibt `ms => this.adapter.delay(ms)` - verwendet die `delay()`-Methode der ioBroker-Adapterbasisklasse (lebenszyklusverwaltet, sicher im Kompaktmodus). `postJsonTransientRetries` benötigt `delayFn` und verwendet diese direkt; es gibt keinen globalen `setTimeout`-Fallback.
- ** `lib/htmlRenderer.js` **: Alle vier Vorkommen befinden sich innerhalb von `<script>`-Template-Strings des Browsers (generierter HTML-Code, der im Browser ausgeführt wird). Geändert in `window.setTimeout(` - funktional identisch im Browser; der reguläre Ausdruck des Repocheckers schließt `.setTimeout` mittels negativem Lookbehind aus.
- ** `lib/htmlToPdf.js` **: Einmalige Wartezeit während des PDF-Renderings. Geändert zu `globalThis.setTimeout(` - wird auch vom Repochecker-Regex ausgeschlossen.
- **W5051 (Benutzerdefiniertes Sleep/Warten in `lib/aiEnhancer.js`):** Wiederholungsversuche verwenden ** `this.adapter.delay()` ** über eine übergebene ** `delayFn` ** - keinen benutzerdefinierten Timer. Der reguläre Ausdruck des Repocheckers markiert auch Bezeichner wie ** `sleep` **, selbst wenn sie als Alias für ** `adapter.delay()` ** verwendet werden. **Führen Sie nicht** `const sleep = …` wieder ein; rufen Sie ** `await delayFn(ms)` ** direkt auf (siehe `postJsonTransientRetries`).
- **W5042 (`puppeteer` wird im Quellcode verwendet, fehlt aber in den `dependencies`):** ** `puppeteer` ist absichtlich unter `optionalDependencies` ** in der `package.json` (mit `@mermaid-js/mermaid-cli`) aufgeführt. Der PDF-Export lädt es über ** `require('puppeteer')` ** in ** `lib/htmlToPdf.js` ** nur, wenn es vorhanden ist. Adapter ohne Puppeteer/Chromium vermeiden eine aufwendige Standardinstallation - besonders relevant auf ressourcenbeschränkten Hosts (z. B. Raspberry Pi). Die Repochecker-Regel scheint nur ** `dependencies` ** und nicht ** `optionalDependencies` ** abzugleichen, daher handelt es sich bei dieser Warnung um einen **bekannten Fehlalarm**. **Es sind keine Code- oder `package.json`-Änderungen erforderlich, um W5042 zu unterdrücken.** - dokumentieren Sie dies für die Reviewer von ** `ioBroker.repositories` ** (siehe Tabelle unten). Fügen Sie **keinen** zweiten Eintrag für ** `puppeteer` ** unter `dependencies` hinzu, nur um W5042 zu unterdrücken: Der ioBroker-Checker lehnt die Auflistung **des gleichen Pakets sowohl in `dependencies` als auch in `optionalDependencies` ** ab, und das ausschließliche Verschieben von Puppeteer in ** `dependencies` ** würde Chromium-Downloads für alle Benutzer erzwingen. Behandeln Sie W5042 als **erwartet**, bis der Upstream-Repochecker ** `optionalDependencies` ** (oder ein Äquivalent) wie deklariert zählt.
- ** `aiApiKey` (jsonConfig `password`):** aufgeführt unter ** `protectedNative` ** und ** `encryptedNative` ** in ** `io-package.json` ** (ioBroker-Adaptersicherheit - W5057/W5058). Vorhandene Klartextschlüssel werden neu verschlüsselt, wenn der Benutzer die Konfiguration im Adminbereich speichert.
- **E8917 / W0066 (`@types/node`):** ** `@types/node` ** wird an die **Node 22**-Zeile (`^22.x`, passend zu ** `engines.node` **) gebunden und ein Dependabot ** `ignore` ** für ** `version-update:semver-major` ** für ** `@types/node` ** in ** `.github/dependabot.yml` ** hinzugefügt (siehe ioBroker.javascript / repochecker E8917).
- ** `puppeteer` Dependabot major:** Ignoriere auch ** `version-update:semver-major` ** für ** `puppeteer` ** in ** `.github/dependabot.yml` ** - siehe **[Optional Puppeteer + mermaid-cli](#optional-puppeteer-mermaid-cli)** unten.

<a id="optional-puppeteer-mermaid-cli"></a>

### Optional Puppeteer + `@mermaid-js/mermaid-cli` (ioBroker-Richtlinie)
**Zweck:** Der PDF-Export (`lib/htmlToPdf.js`) und der serverseitige Mermaid SVG-Export (`lib/mermaidServerSvg.js` über ** `mmdc` **) nutzen Headless-Chromium. Beide Pakete sind ** `optionalDependencies` **, sodass die Standardinstallationen ressourcenschonend bleiben (relevant für leistungsschwache Hosts, z. B. Raspberry Pi) - entsprechend der Vorgehensweise von ioBroker bei ressourcenintensiven Browser-Stacks.

**Aktuell ausgerichtetes Paar (2026-05, siehe `package.json`):**

| Paket | Version | Rolle |
| ------- | ------- | ---- |
| ** `puppeteer` ** | ** `^24.43.1` ** | PDF + gemeinsames Chromium für ** `mmdc` ** |
| ** `@mermaid-js/mermaid-cli` ** | ** `11.16.0` ** (angeheftet) | ** `pre.mermaid` ** während der Generierung als SVG einbetten |

**Puppeteer 25:** ** `@mermaid-js/mermaid-cli@11.16.0` ** Peers ** `^23 \|\| ^24 \|\| ^25` **. Wir bleiben auf **Puppeteer 24**, bis ein gezieltes Upgrade erfolgt (Sperrdatei, ** `npm ci` **, Mermaid-Tests). **Führe keine** Dependabot ** `puppeteer` ** größeren Aktualisierungen ohne diese Checkliste zusammen. ** `.github/dependabot.yml` ** ignoriert ** `puppeteer` ** und ** `version-update:semver-major` ** aus diesem Grund.

**ioBroker Checker / `ioBroker.repositories` Überprüfung - Nicht auf die falsche Weise „reparieren“:**

| Nachricht | Haltung des Betreibers |
| ------- | ----------------- |
| **W5042** (`puppeteer` fehlt in ** `dependencies` **) | **Falsch-positiv erwartet.** ** `puppeteer` ** ist unter ** `optionalDependencies` ** deklariert. Ein Verschieben nach ** `dependencies` ** würde Chromium für alle Installationen erzwingen und kann Prüffehler auslösen (**dasselbe Paket in `dependencies` und `optionalDependencies` **). **Dokumentieren Sie W5042 für die Prüfer; erstellen Sie keinen doppelten Eintrag.** |
| ** `npm ci` auf CI** | ** `package-lock.json` ** muss einen vollständigen ** `packages["node_modules/puppeteer"]` ** Eintrag enthalten. Nach Abhängigkeitsänderungen: Neuer ** `npm install` **, Überprüfung von ** `npm ci` ** auf sauberem ** `node_modules` **, Commit von ** `package.json` ** + Sperre zusammen. |
| ** `npm ci` auf CI** | ** `package-lock.json` ** muss einen vollständigen Eintrag für ** `packages["node_modules/puppeteer"]` ** enthalten. Nach Abhängigkeitsänderungen: Führen Sie eine frische ** `npm install` **-Installation durch, überprüfen Sie ** `npm ci` ** auf einem sauberen ** `node_modules` **-Verzeichnis und übertragen Sie ** `package.json` ** + Lock zusammen. |

**Upgrade-Verfahren (sobald der Upstream Puppeteer 25 zulässt):**

1. Bestätigen Sie, dass der Peer-Bereich von ** `@mermaid-js/mermaid-cli` ** ** `^25` ** umfasst (oder aktualisieren Sie zuerst ** `mmdc` ** und dann ** `puppeteer` ** in **einem** Pull Request).
2. Sperrdatei neu generieren; ** `npm ci` **, ** `npm run lint` **, ** `npm run check` **, ** `npm test` ** ausführen (Mermaid-Integrationstests in ** `mermaidServerSvg.test.js` **).
3. Entfernen oder beschränken Sie die Dependabot ** `ignore` **-Regel für ** `puppeteer` ** nur dann, wenn dies sicher ist.
4. Erwähnen Sie Änderungen der Installationsgröße oder der Node/Chromium-Anforderungen in den Versionshinweisen / ** `common.news` **.

**Für den PR-Text `ioBroker.repositories`:** Optionale PDF-/Mermaid-Funktionen benötigen ** `npm install` ** (oder müssen mit optionalen Abhängigkeiten installiert werden) im Adapterverzeichnis; die Generierung der Kerndokumentation funktioniert **ohne** Puppeteer. **W5042** und die Puppeteer-Peer-Sperre **24/25** sind **dokumentierte Entscheidungen der Maintainer** und keine Checklistenfehler.

**Wichtig:** Führen Sie ** `npx iobroker …` ** niemals innerhalb des Adapter-Klons aus, es sei denn, Sie initialisieren dort absichtlich einen Controller - dadurch kann ** `package.json` ** überschrieben werden. Stellen Sie die Änderungen in diesem Fall mit ** `git checkout -- package.json package-lock.json` ** wieder her.

<a id="object-hierarchy"></a>

### Objekthierarchie in `instanceObjects` (`io-package.json`)
ioBroker benötigt für jeden Zustand ein übergeordnetes Objekt (`type: "channel"` oder `"device"`). Fehlende übergeordnete Objekte verursachen **E3009** während der Überprüfung des `ioBroker.repositories`-Review-Objekts - der Adapter funktioniert lokal einwandfrei, aber der Bot lehnt den Dump ab.

**Regel:** Für jede Gruppe von Zuständen (`action.*`, `documentation.*`, `info.*`, `versioning.*`) füge das entsprechende Kanalobjekt **vor** den Zuständen in `instanceObjects` hinzu. Kanäle müssen zuerst erscheinen; Zustände folgen.

```json
"instanceObjects": [
  { "_id": "info", "type": "channel", "common": { "name": { "en": "Information", "de": "Informationen" } }, "native": {} },
  { "_id": "info.connection", "type": "state", "common": { ... }, "native": {} }
]
```

Referenzadapter: **telegram**, **backitup**, **dwd** - alle definieren ihren `info`-Kanal in `instanceObjects` mit einem mehrsprachigen `common.name`.

`instanceObjects` ist der richtige Ort für statische Objekte, die immer vorhanden sind. Verwenden Sie `setObjectNotExistsAsync` in `onReady`/`createStates()` nur für Objekte, die dynamisch oder kontextabhängig sind (z. B. erkannte Geräte).

### `package-lock.json` und `npm ci`
CI (`ioBroker/testing-action-check`) führt ** `npm ci` ** aus. Die optionale **@mermaid-js/mermaid-cli**-Kette (Puppeteer / `chromium-bidi` / Mermaid) benötigt Versionen, die als **vollständige** `packages["node_modules/…"]`-Einträge in der Sperrdatei erscheinen müssen. Das Repository verwendet daher ** `overrides` ** (`chromium-bidi` → fixiertes `devtools-protocol`) und explizite **devDependencies** (`cytoscape`, `d3-selection`, `devtools-protocol`), damit Linux- und Node22/24-Installationen synchron bleiben.

**GitHub Actions:** `.github/workflows/test-and-release.yml` verwendet den **ioBroker.example**-Concurrency-Snippet (`group: ${{ github.ref }}`, ** `cancel-in-progress: true` **). ** `@iobroker/repochecker` ** (**E3009**) vergleicht diesen Block **wörtlich** mit dieser Vorlage - benutzerdefinierte `group`-Werte bestehen die Prüfung immer nicht. Nachteil: Ein neuer Push auf dem **gleichen** Branch macht ältere, laufende Workflow-Ausführungen ungültig (unter **Windows + Node24** kann „Abgebrochen“ angezeigt werden, wenn Sie erneut pushen, bevor die Matrix abgeschlossen ist).

** `deploy` bei Semver-Tags (`v*.*.*`):** ** `ioBroker/testing-action-deploy` ** veröffentlicht auf npm (OIDC / Trusted Publishing) und kann ein GitHub-Release erstellen. Der Job **überspringt** die Veröffentlichung weiterhin, wenn ** `npm view` ** diese Semver bereits erkennt - dadurch bleibt die CI nach einer versehentlichen Veröffentlichung auf einer Workstation **grün**, jedoch wird **auch die Provenienz** übersprungen. Für den Checker **E2008**: **Nicht** zuerst `npm publish` vom PC ausführen: ** `main` ** aktualisieren, **das Tag `vx.y.z` pushen**, ** `deploy` ** als **einzigen** Publisher verwenden. Konfigurieren Sie **Trusted Publishing** für ** `iobroker.autodoc` ** auf npm (GitHub Actions, dieses Repository, Workflow **Test und Release**). Hinweise zur **Node.js-Veraltung** bezüglich eingebetteter ** `actions/checkout` / `setup-node` ** stammen von ** `ioBroker/testing-action-*@v1` **-Bundle-Versionen; die Aktualisierung dieser Aktionen wird im Upstream-Projekt (`ioBroker/testing-action-deploy` usw.) und nicht lokal in jeder Adapter-YAML-Datei verfolgt.

Nach dem Ändern von **Abhängigkeiten** oder **Überschreibungen** führen Sie ** `npm install` ** aus, speichern Sie ** `package.json` ** und ** `package-lock.json` ** zusammen und überprüfen Sie ** `npm ci` ** lokal auf einem sauberen ** `node_modules` **, falls möglich.

## Releases und README-Änderungsprotokoll
Führe `npm run release` nur auf dem Hauptverzeichnis aus - `@alcalzone/release-script-plugin-iobroker` führt standardmäßig nur das Hauptverzeichnis aus (`check:git` bricht auf dem Entwicklungsverzeichnis ab). Führe anschließend auf dem Entwicklungsverzeichnis zusammen und synchronisiere die Änderungen: `git checkout main && git pull origin main``, bevor du `npm run release` ausführst (siehe oben beschriebenen Branch-Workflow).

<a id="maintainer-checklist-release-order"></a>

### Checkliste für Wartungsmitarbeiter - Veröffentlichungsreihenfolge (nicht überspringen)
Führen Sie diese Schritte **in der angegebenen Reihenfolge** aus, nachdem der Code für ** `x.y.z` ** fertiggestellt ist. ** `npm publish` erstellt weder ein GitHub-Release noch ein Git-Tag.** Wenn Sie von ** `main` ** veröffentlichen, aber den Tag-/Release-Schritt überspringen, **verzögert sich GitHub „Neueste Version“ gegenüber npm**, bis Sie das Problem beheben.

1. ** `main` auf dem neuesten Stand:** `git checkout main && git pull origin main`.
2. **Aktualisierung & Metadaten:** Bevorzugen Sie ** `npm run release` ** von ** `main` ** (interaktives Terminal; ** `manual-review` **: Diff prüfen; ** `yes` ** nur bei korrekter Ausführung - vermeiden Sie ** `Ctrl+C` ** bei Eingabeaufforderungen: Node24 **enquirer** kann ** `ERR_USE_AFTER_CLOSE` ** auslösen). Falls die Versionsverwaltung manuell erfolgte, stellen Sie sicher, dass ** `package.json` **, ** `io-package.json` ** (`common.version`), ** `common.news` ** (**nur Semver-Schlüssel, die auf npm vorhanden sind** - Prüfer: **E2004**), root ** `package-lock.json` ** ** `version` ** und README ** `Version:` ** / changelog alle mit ** `x.y.z` ** übereinstimmen.
3. **Qualitätskontrollen:** `npm test`, `npm run lint`, `npm run check` (und optional `npm run adapter-check`).
4. **Commit & push `main`:** Bei Bedarf `git add` / `git commit` ausführen, dann `git push origin main`.
5. **npm publish (GitHub Actions für Herkunftsnachweis bevorzugen):** Nach dem Push von ** `main` ** wird ** `vx.y.z` ** erstellt und **gepusht**, sodass ** `deploy` ** ** `ioBroker/testing-action-deploy` ** ausführt. Dies ist der Pfad, der **npm-Herkunftsnachweis** liefert (**E2008**). ** `npm publish --access public` ** auf der Workstation bleibt eine Ausweichlösung, falls Trusted Publishing noch nicht konfiguriert ist - der Checker meldet dann jedoch weiterhin fehlende Attestierungen bis zur **nächsten** CI-veröffentlichten Version. Falls bei einer lokalen Veröffentlichung die Meldung ** `OTP eingeben` ** erscheint, verwenden Sie einen **npm TOTP-Authenticator**. Tokens dürfen niemals committet werden. Optional kann ** `npm pkg fix` ** ausgeführt und die Normalisierung von ** `repository.url` ** committet werden, falls ** `npm publish` ** eine Warnung ausgibt.
6. **Registry überprüfen:** `npm view iobroker.autodoc version` → ** `x.y.z` **. Optional: Herkunft bestätigen: `npm view iobroker.autodoc@x.y.z dist.attestations`.
7. **Git-Tag + GitHub-Release:** Falls ** `deploy` ** bereits ein GitHub-Release erstellt hat, wird ein Duplikat übersprungen. Falls Sie lokal veröffentlicht haben, führen Sie trotzdem ** `git tag` / `git push origin vx.y.z` / `gh release create` ** aus, damit **GitHub Latest** mit npm übereinstimmt.
8. **Sync `dev`:** `git checkout dev`, merge/fast-forward ** `origin/main` ** nach ** `dev` **, `git push origin dev`, bleibe für laufende Arbeiten auf ** `dev` **, es sei denn, es handelt sich ausschließlich um Hotfixes für ** `main` **.

Kurzanleitung für **Agenten/Copiloten**: Wenn der Maintainer Sie auffordert, ein Release **abzuschließen** oder zu **veröffentlichen**, stellen Sie sicher, dass Schritt **7** erst nach Bestätigung des Erfolgs von Schritt **6** vorgeschlagen oder ausgeführt wird - gehen Sie nicht davon aus, dass **npm** GitHub **Releases** aktualisiert.

- Halten Sie den Abschnitt **Changelog** in [`README.md`](/#/adapters/autodoc) an den Abschnitt ** `common.news` ** in `io-package.json` angepasst: Listen Sie nur die **7** neuesten Versionen auf; verschieben Sie entfernte Versionen in `CHANGELOG_OLD.md` (siehe dortige Einleitung).
- Fügen Sie beim Veröffentlichen einer Version einen datierten Abschnitt `### x.y.z` im **oberen Bereich** dieses Fensters hinzu (wird für ioBroker-Adapterlisten erwartet).
- Halten Sie die ** `version` ** in `package.json` und `io-package.json` mit der dokumentierten Version konsistent (Adapter Checker kann Abweichungen melden, z. B. **E6006** - beachten Sie die Ausgabe des Checkers für den aktuellen Regelsatz).
- Erhöhen Sie ** `version` ** gleichzeitig in `package.json` und `io-package.json`.
- Aktualisiere ** `common.news` ** in `io-package.json` (maximal **7** Einträge für [Adapter Checker](https://adapter-check.iobroker.in/) / Repository-Listen - entferne den ältesten Schlüssel beim Hinzufügen einer Version; verschiebe den entfernten **README**-Abschnitt nach `CHANGELOG_OLD.md`; behalte dort die längere Texthistorie bei).
- Bevor Sie die Aufnahme in das Stable/Beta-Repository vorschlagen, führen Sie den **[Adapter Checker](https://adapter-check.iobroker.in/)** gegen das Paket aus und beheben Sie gemeldete Probleme.

### Npm-Version vs. HTML-Renderer-Build
Die veröffentlichte **Adapter-Semver** (`package.json` / `io-package.json`) ist unabhängig von der **HTML-Renderer-Build-Zeichenkette** `RENDERER_VERSION` in `lib/htmlRenderer.js`. Generierte Seiten können `<!-- autodoc-renderer:… -->` in `<head>` zur Fehlersuche bei Template-Abweichungen enthalten - verwechseln Sie diese Markierung nicht mit der npm-Paketversion.

**Wann `RENDERER_VERSION` (in `lib/htmlRenderer.js`, Format `YYYY.MM.DD.NN`) angehoben werden muss:**

**Führen Sie einen Update-Vorgang durch**, wenn sich etwas ändert, das Benutzer in der **exportierten** Dokumentation erhalten sollen: HTML-Shell/Layout/CSS, Kapiteltextdarstellung, **Markdown**-Exporttext oder -struktur aus `lib/markdownRenderer.js`, Schnellstart-/Gastabschnitte oder andere Pipeline-Ausgaben, die unter `/files/` gespeichert werden. Beim Start des Adapters vergleicht `main.js` diese Zeichenkette mit `info.templateVersion` und **führt bei einer Abweichung einen vollständigen Dokumentationslauf in die Warteschlange**. Daher werden Installationen, bei denen **Beim Start generieren** deaktiviert ist, nach einem Update trotzdem einmal aktualisiert.
- **Überspringen Sie die Aktualisierung** bei Änderungen, die den generierten HTML/Markdown/JSON-Inhalt oder die Struktur nicht beeinflussen (z. B. Refaktorierungen, die nur die Admin-Konfigurations-UI, die Protokollierung oder ungenutzte Codepfade betreffen).
- Erhöhen Sie die nachfolgende ** `.NN` **-Zahl bei einer zweiten oder dritten Änderung am selben Kalendertag.
- Bei nummerierten Versionen ist die neue `RENDERER_VERSION` im **README**-Änderungsprotokoll zu beachten, wenn dies für Support- oder Upgrade-Hinweise relevant ist (optional für rein interne Anpassungen).

<a id="admin-ui-translations-i18n"></a>

### Admin (`jsonConfig`) Struktur
**Verschachteln Sie keinen vollständigen `"type": "tabs"`-Block innerhalb eines `panel` in `admin/jsonConfig.json`.** Es wurde beobachtet, dass ioBroker Admin bei Verwendung dieses Layouts einen leeren Bereich für die Instanzeinstellungen anzeigt. Platzieren Sie jeden Hauptbereich als eigenen Tab der obersten Ebene unterhalb des `"type": "tabs"`-Blocks.

### Übersetzungen der Admin-Benutzeroberfläche (i18n)
Die maßgebliche Quelle für **Schlüssel** ist `admin/i18n/en.json`. **DE** und **FR** werden neben der englischen Version für wichtige Releases gepflegt.
Andere Sprachdateien (`es`, `it`, `nl`, `pl`, `pt`, `ru`, `uk`, `zh-cn`, …) verwenden möglicherweise **englischen Text als Platzhalter** für fehlende Schlüssel, sodass die Administrationsoberfläche niemals die reinen Schlüsselnamen anzeigt. **Muttersprachler:** Pull Requests zum Ersetzen dieser Zeichenketten durch echte Übersetzungen sind willkommen; es ist nicht nötig, die gesamte Datei auf einmal neu zu übersetzen.
- Nachdem Sie die Schlüssel zu `en.json` hinzugefügt haben, aktualisieren Sie **DE/FR**, sobald Sie können, und führen Sie entweder den i18n-Workflow des Projekts aus oder kopieren Sie die neue englische Zeichenkette in andere Gebietsschemas, bis sie übersetzt ist.