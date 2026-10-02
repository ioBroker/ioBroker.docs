---
chapters: {"pages":{"en/adapterref/iobroker.siku/README.md":{"title":{"en":"ioBroker.siku"},"content":"en/adapterref/iobroker.siku/README.md"},"en/adapterref/iobroker.siku/DEVELOPMENT.md":{"title":{"en":"Development and dependency security"},"content":"en/adapterref/iobroker.siku/DEVELOPMENT.md"},"en/adapterref/iobroker.siku/RELEASING.md":{"title":{"en":"Releasing and official ioBroker inclusion"},"content":"en/adapterref/iobroker.siku/RELEASING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.siku/DEVELOPMENT.md
title: Entwicklungs- und Abhängigkeitssicherheit
hash: rUxQI5g87d8en6aet81SkdX1X5AlBMHl6sDhJ4O3OD4=
---
# Entwicklungs- und Abhängigkeitssicherheit

## Unterstützte Toolchain

Verwenden Sie die von CI abgedeckten Node.js-Versionen (22, 24 und 26). `npm ci`, Dann:

```sh
npm run build
npm run check
npm test
npm run lint
npm run coverage
npm run audit:dependencies
npm run test:integration
```

Der Integrationstest verwendet die offizielle `@iobroker/testing` Das Testsystem installiert einen isolierten Controller, startet den Adapter ohne konfigurierte Geräte und überprüft dessen Lebenszyklus. Es verwendet oder modifiziert keine bestehende ioBroker-Installation. Diese Tests erfordern npm-Netzwerkzugriff und werden unter Linux, macOS und Windows ausgeführt.

Für interaktive Admin- und Hardwaretests verwenden Sie eine separate ioBroker-Testinstallation, beispielsweise das [offizielle Docker-Image](https://github.com/buanet/ioBroker.docker) . Erstellen und packen Sie den Adapter mit `npm run build && npm pack` Installieren Sie dieses Paket in der Testumgebung und laden Sie die zugehörigen Admin-Dateien mit den üblichen ioBroker-Tools hoch. Verwenden Sie eine Produktionsumgebung nicht als uneingeschränkte Entwicklungsumgebung. Die UDP-Broadcast-Erkennung benötigt Zugriff auf das Gerätenetzwerk; das NAT-Netzwerk von Docker Desktop leitet Broadcast-Pakete aus dem lokalen Netzwerk nicht automatisch weiter.

## Warum die alte Abhängigkeit vom Entwicklungsserver entfernt wurde

`@iobroker/dev-server@0.8.0` installiert sich immer noch `bs-html-injector`, `request`, ein altes `jsdom`, Und `xmldom` Der veraltete HTML-Hot-Reload-Stack bietet kein unterstütztes Update, das alle gemeldeten Sicherheitsprobleme behebt. Dieser Adapter verwendet eine JSON-Konfiguration und benötigt weder HTML-Injection für Builds, Tests noch den laufenden Betrieb des Adapters.

Die Abhängigkeit und `npm run dev-server` Einstiegspunkte werden bewusst entfernt, anstatt sie in eine globale Installation zu verschieben, um ein sauberes Audit zu gewährleisten. Dies bedeutet, dass die interaktive Hot-Reload-Funktion des alten Entwicklungsservers in diesem Repository nicht mehr verfügbar ist. Verwenden Sie Integrationstests für automatisierte Prüfungen und eine separate Testinstallation für interaktive Prüfungen. `.dev-server` Daten werden weder gelöscht noch migriert; beenden Sie alle alten Entwicklungsserverprozesse und verwenden Sie diese veraltete Umgebung nicht weiter. Die Repository-Prüfung untersucht keine alten Profile, globalen Tools, den separat installierten Integrationscontroller oder Docker-Images.

`@iobroker/adapter-dev` wird für die Befehle „build/watch“ und „translation“ beibehalten. Seine Abhängigkeiten können innerhalb ihrer unterstützten Bereiche aktualisiert werden; ein Austausch des gesamten Tools war nicht erforderlich.

## Bereichsbezogene, auf Kompatibilität getestete Überschreibungen

- `@iobroker/testing -> @alcalzone/esbuild-register` Ersetzen Sie den alten Fork durch den API-kompatiblen. `esbuild-register@3.6.0` über einen npm-Alias. Im Gegensatz zur alten Fork, die stark von der anfälligen esbuild-Version 0.11 abhängig war, unterstützt der ursprüngliche Wrapper dies. `esbuild >=0.12 <1` Die Sperrdatei löst das gepatchte ESBuild 0.25.12 auf. Pakettests laden echtes TypeScript über den exakten ioBroker-Modulnamen in einem untergeordneten Prozess. Builds, Controller-Tests und `npm ls --all` Überprüfen Sie die gesamte Toolchain.

New Yorks `istanbul-lib-processinfo` wurde auf die Upstream-Korrektur (3.0.1) aktualisiert, die Folgendes verwendet: `node:crypto` anstelle des alten `uuid` Abhängigkeit. Eine UUID-Überschreibung ist nicht erforderlich. Die Pakettests prüfen die tatsächliche Erstellung der Prozess-ID; der Befehl „coverage“ prüft den vollständigen NYC-Pfad.

Die Überschreibung sollte auf den betroffenen Verbraucher beschränkt bleiben. Überprüfen Sie sie erneut und entfernen Sie sie gegebenenfalls, sobald von den vorgelagerten Abhängigkeiten unterstützte Korrekturen bereitgestellt werden. `npm audit fix --force`, globale Überschreibungen und `--legacy-peer-deps` sind nicht Teil des Aktualisierungsworkflows.

## ESLint- und TypeScript-Upgrades

Die Sperrdatei enthält die neuesten kompatiblen Versionen von ESLint 9 und typescript-eslint 8. TypeScript 6.0.3 wird weiterhin unterstützt: typescript-eslint unterstützt derzeit[`>=4.8.4 <6.1.0`](https://typescript-eslint.io/users/dependency-versions/) Nicht TypeScript 7. ESLint 10 allein ändert daran nichts, und das von der gemeinsamen Konfiguration von ioBroker verwendete React-Plugin benötigt weiterhin ESLint 9 oder älter. Überprüfen Sie den gesamten Stack erneut, bevor Sie ein größeres Upgrade von TypeScript oder ESLint durchführen.

Der Test- und Freigabe-Workflow läuft `audit:dependencies` als Schutzmechanismus, der Entwicklungsabhängigkeiten und geringfügige Sicherheitslücken berücksichtigt. Ein Audit ohne Sicherheitslücken stellt eine Momentaufnahme bekannter npm-Warnungen dar und ist keine allgemeine Sicherheitsgarantie.