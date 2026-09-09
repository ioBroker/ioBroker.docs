---
chapters: {"pages":{"en/adapterref/iobroker.siku/README.md":{"title":{"en":"ioBroker.siku"},"content":"en/adapterref/iobroker.siku/README.md"},"en/adapterref/iobroker.siku/RELEASING.md":{"title":{"en":"Releasing and official ioBroker inclusion"},"content":"en/adapterref/iobroker.siku/RELEASING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.siku/RELEASING.md
title: Veröffentlichung und offizielle Aufnahme in ioBroker
hash: BAo8cr2kt+nXAuXRa6i4gU+TWbiRcHPBJIhVeKwT+RM=
---
# Veröffentlichung und offizielle Aufnahme in ioBroker

Dieses Dokument fasst die praktischen Schritte zusammen, die für den Umzug erforderlich sind.`ioBroker.siku` von einem Beta-Repository zu einem offiziell gelisteten ioBroker-Adapter.

## Was ioBroker für die Aufnahme in benötigt`latest`

Basierend auf dem aktuellen`ioBroker.repositories` Um die Anforderungen zu erfüllen, sollte der Adapter mindestens Folgendes aufweisen:

- Repository-Name`ioBroker.<adaptername>`
- GitHub-Themen konfiguriert
- Englische README-Datei mit Beschreibung, Änderungsprotokoll und einem Link zur Hersteller- oder Gerätebeschreibung
- vordefinierte Lizenz
- GitHub Actions-basierte Adaptertests
- gültig`type` ,`connectionType` und staatliche Rollen in`io-package.json`
- verschlüsselte/geschützte Passwortverwaltung, bei der Anmeldeinformationen gespeichert werden
- Das Paket wurde auf npm veröffentlicht.
- `iobroker` Organisation als npm-Besitzer hinzugefügt (`bluefox` ist der dokumentierte Kontakt)
- Admin 3 / JSON-Konfigurationsdialog

Primäre Quellen:

- [ioBroker.repositories README](https://github.com/ioBroker/ioBroker.repositories)
- [ioBroker-Adapterentwickler](https://github.com/ioBroker/create-adapter)
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers)

## Aktueller Projektstatus

- [x] Der Name des Repositorys stimmt überein`ioBroker.<adaptername>`
- [x] Eine JSON-Konfigurationsseite für Administratoren ist vorhanden.
- [x] Ein CI-Testworkflow ist vorhanden.
- [x] Die README-Datei ist in englischer Sprache und enthält Links zu Hersteller-/Gerätequellen.
- [x] Gerätepasswörter werden verschlüsselt und geschützt gespeichert.
- [x] Der Release-Workflow ist für die vertrauenswürdige Veröffentlichung mit npm vorbereitet.
- [x] GitHub-Versionshinweise können für jedes veröffentlichte Tag automatisch generiert werden.
- [x] Die öffentliche Beta-Basisversion wurde auf`0.1.0`
- [x] npm-Paket`iobroker.siku` wurde veröffentlicht
- [x] npm-Besitzer`bluefox` Die ioBroker-Organisation wurde hinzugefügt
- [ ] Der Adapter wurde hinzugefügt zu`latest`
- [ ] Der Adapter wurde lange genug im Feld getestet, um`stable`

## Einmalige npm-Einrichtung für CD

1. Für diese Person müssen Veröffentlichungsrechte vorliegen.`iobroker.siku` auf npm.
2. Konfigurieren Sie **Trusted Publishing** für dieses Paket auf npmjs.com:
   - Anbieter: GitHub Actions
   - Eigentümer:`ChrMaass`
   - Repository:`ioBroker.siku`
   - Arbeitsablauf:`test-and-release.yml`
3. Fügen Sie den dokumentierten Notfallbesitzer hinzu:
   - `npm owner add bluefox iobroker.siku`
4. Aktivieren Sie die Repository-Variable`ENABLE_NPM_RELEASE=true` auf GitHub.

Anschließend können getaggte Releases über GitHub Actions veröffentlicht werden, ohne dass ein langlebiges npm-Token gespeichert werden muss.

## Automatische Patch-Versionierung

Wenn jeder erfolgreiche Vorstoß zu`main` Die nächste Patch-Version sollte automatisch empfangen werden; aktivieren Sie die Repository-Variable.`ENABLE_AUTO_PATCH_RELEASE=true` Die

Der Arbeitsablauf`.github/workflows/auto-patch-release.yml` Dann:

1. wartet auf einen erfolgreichen`Test and Release` laufen lassen`main`
2. klassifiziert die getestete Änderung mithilfe von`.github/scripts/auto-release-policy.cjs`
3. führt die bestehende`release-script` als Patch-Veröffentlichung
4. überträgt den generierten Release-Commit und das Git-Tag zurück an`main`
5. versendet manuell die vertrauenswürdigen`test-and-release.yml` Workflow für das neue Tag, da ein Tag-Push erstellt wurde von`GITHUB_TOKEN` startet nicht selbstständig einen weiteren Push-Workflow.

Empfohlene Versionsstrategie für dieses Repository:

- **kleinere Versionen** verwenden (`0.2.0` ,`0.3.0` , …) für sichtbare Merkmalsgruppen oder Veröffentlichungsmeilensteine
- **Patch-Versionen** verwenden (`0.1.1` ,`0.1.2` , …) für Fehlerbehebungen und Nachbereitungen von Überprüfungen
- Verwende das erste npm /`latest` Einreichung als **`0.1.x`öffentliche Beta** , nicht als`0.0.x`

Der automatische Klassifikator erstellt ein Patch-Release für Änderungen an Laufzeitquellcode, Administrationsressourcen, Laufzeitadapter-Metadaten oder Produktionsabhängigkeiten. Release-Commits, manuelle Versionsänderungen und Änderungen, die sich auf Dokumentation, Tests, Workflows, Sperrdateien oder Entwicklungsabhängigkeiten beschränken, werden bewusst übersprungen.

## CI-Strategie

- Regelmäßige Pull-Requests: Linting + Typüberprüfung + Codeabdeckung + ein Ubuntu-Smoke-Test für schnelles Feedback
- Dependabot Pull Requests: Vollständige Liste der unterstützten Betriebssysteme/Node.js-Versionen vor dem automatischen Zusammenführen
- `main` : Release-relevante Linux/macOS/Windows-Matrix
- Windows: Separater Workflow für geplante/manuelle Regressionstests, da der Controller-Bootstrap auf Windows-Runnern deutlich langsamer ist.
- Tags / Release-Verteilungen: Standardmäßige ioBroker-Bereitstellungsaktion mit vertrauenswürdiger npm-Veröffentlichung und automatischen GitHub-Versionshinweisen

Dadurch bleiben die täglichen Iterationen schnell, ohne dass die plattformübergreifende Abdeckung vollständig verloren geht.

## Release-Ablauf für dieses Repository

1. Stellen Sie sicher, dass der Pull Request für die Veröffentlichung den Status „Grün“ hat und geprüft wurde.
2. Führen Sie gegebenenfalls einen Probelauf durch:
   - `npm run release -- patch --dry --branchPattern '*'`
3. Auf einem Release-Branch wird der eigentliche Release-Commit und das lokale Tag erstellt, ohne dass diese automatisch gepusht werden:
   - `npm run release -- patch --noPush --branchPattern '*'`
4. Den Release-Commit in den Pull-Request-Branch pushen, aber das Tag lokal behalten, bis der PR zusammengeführt ist.
5. Führe den geprüften PR zusammen und warte auf die Antwort.`main` Testmatrix. Die manuelle Versionsänderung führt dazu, dass der automatische Patch-Klassifikator diese Zusammenführung überspringt.
6. Das bereits vorbereitete Tag wird nach dem getesteten Release-Commit übertragen.`main` Die
7. GitHub Actions führt den Workflow für getaggte Releases aus.
8. Wenn die vertrauenswürdige Veröffentlichung konfiguriert ist und`ENABLE_NPM_RELEASE=true` Der Tag „build“ veröffentlicht auf npm.
9. Derselbe Release-Job erstellt auch ein GitHub-Release mit automatisch generierten Notizen, kategorisiert über`.github/release.yml` Die

## Nach der ersten npm-Veröffentlichung

Fügen Sie den Adapter zum ioBroker hinzu.`latest` Repository, das einen dieser Pfade verwendet:

- über`iobroker.dev` → verwalten → **ZU DEN NEUESTEN HINZUFÜGEN**
- oder durch PR gegen`ioBroker/ioBroker.repositories`

Wichtiger Hinweis zum Prüfprozess für`ioBroker/ioBroker.repositories` PRs:

- Post`RE-CHECK!` **als eigenständiger Kommentar ohne zusätzlichen Text**
- Fügen Sie bei Bedarf erläuternden Kontext in einem separaten Kommentar hinzu.
- Der Bot entfernt den Auslöserkommentar automatisch, nachdem der Prüflauf abgeschlossen ist.

Sobald der Adapter echtes Nutzerfeedback erhalten und ausreichend validiert wurde, kann er später vorgeschlagen werden für`stable` Die