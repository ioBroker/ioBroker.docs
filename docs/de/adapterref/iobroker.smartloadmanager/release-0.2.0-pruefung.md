---
chapters: {"pages":{"de/adapterref/iobroker.smartloadmanager/README.md":{"title":{"de":"ioBroker.smartloadmanager"},"content":"de/adapterref/iobroker.smartloadmanager/README.md"},"de/adapterref/iobroker.smartloadmanager/release-0.2.0-pruefung.md":{"title":{"de":"Arbeits- und Prüfplan für 0.2.0"},"content":"de/adapterref/iobroker.smartloadmanager/release-0.2.0-pruefung.md"}}}
---
# Arbeits- und Prüfplan für 0.2.0

Alle vorgefundenen lokalen Änderungen werden gemäß Auftrag übernommen und geprüft.
Die vorhandene Adapterarchitektur bleibt erhalten. Fehler werden mit reproduzierbaren
Regressionstests korrigiert; eine reale Geräteprüfung ist mangels Testanlage nicht möglich.

1. GitHub-Issues #90, #93, #86 und zugehörige Wartungs-PRs prüfen; aktuelle
   npm-Versionen von Controller, Admin und Testwerkzeugen feststellen.
2. Steuerungsfehler in `main.js` mit simulierten ioBroker-Zuständen reproduzieren:
   Schaltbefehle, Prozentregelung, Batterie, Betriebsmodi, Heizschutz und Timer.
3. Fehler korrigieren und Regressionstests ausführen; Prognoseeingaben und
   Mindestlaufzeiten prüfen.
4. Abhängigkeiten, Node-Testmatrix, Übersetzungen und Paketinhalt prüfen.
5. README-Changelog und deutsche/englische Nutzerdokumentation mit Beispielen ergänzen.
6. Versionen in Paketdateien synchron auf 0.2.0 setzen. Unit-, Paket-, Typ-,
   Lint- und Integrationstests gegen aktuellen js-controller ausführen.
7. Änderungen prüfen, committen und nach erfolgreichen Prüfungen pushen.

Issue #84 betrifft das separate ioBroker-Stable-Repository. Ein Adapter-Push
allein aktualisiert dessen Version nicht. Es wird nicht fälschlich als lokal
behobener Programmfehler behandelt.

## Ausgangslage

- Node.js lokal: 22.19.0.
- Ausgangstests: 6 Unit-Tests (davon ein Platzhalter), 40 Paketprüfungen bestanden.
- Typprüfung und ESLint bestanden.
- npm latest bei Prüfung: js-controller 7.2.5, Admin 8.3.3,
  adapter-core 3.4.3, testing 6.3.1.
- Keine reale ioBroker-Testinstanz und keine angeschlossenen Geräte vorhanden.

## Behobene Fehler und Prüfung

- Echte Regressionstests ersetzen den bisherigen Platzhalter. Geprüft werden
  boolesche/numerische Befehle, Betriebsmodi, Prozentregelung, Vorzeichen,
  Batterie-SOC, Ladeleistungsrückführung, Heizschutz und Timerabbrüche.
- Verzögerte Einschaltungen prüfen den aktuellen Überschuss und das Zeitfenster
  nochmals. Deaktivierung beendet laufende Schalt- und Anzeigetimer.
- Gleichzeitige Zählerereignisse verschieben Regelungstimer nicht dauerhaft;
  Batterie-Verzögerungen werden nicht durch einen sofortigen Regelpfad umgangen.
- Prognosen verwerfen vergangene Werte und respektieren 0 Minuten Vorlaufzeit.
- Eine periodische Prüfung berücksichtigt Zeitfenster auch ohne neue Zählerwerte.
- Alle elf Übersetzungskataloge enthalten dieselben Schlüssel. Benachrichtigungen
  und Release-Metadaten sind in allen unterstützten Sprachen vorhanden.
- Offizielle aktuelle JSON-Schemas: 61 Paketprüfungen erfolgreich.
- 29 Funktionstests erfolgreich unter Node 22.19.0, 24.22.1 und 26.12.1.
- Konfigurierter Integrationstest gegen js-controller 7.2.5 erfolgreich:
  Verbraucherobjekte erstellt, Schaltbefehl als `ack: false` empfangen.
- Dieser Integrationstest besteht auch unter Node.js 26.12.1 (2 Tests).
- Abschließende Typprüfung, ESLint und Kontrolle des npm-Paketinhalts erfolgreich;
  Laufzeitmodul, Übersetzungen und Dokumentation enthalten, Testdateien ausgeschlossen.
- Saubere Installation mit `npm ci` erfolgreich.
- Repository-Checker 5.23.2 im lokalen Modus: keine Fehler. Verbleibende Hinweise
  betreffen noch nicht veröffentlichtes 0.2.0, fehlendes Release-Tag, alte nicht
  mehr abrufbare CI-Logs sowie noch offene GitHub-Vorgänge.

## Bewusste Entscheidungen und externe Abhängigkeiten

- TypeScript bleibt auf 6.0.3: Version 7 kollidiert mit den Peer-Anforderungen
  des offiziellen ioBroker-ESLint-Setups. PR #79 wird daher nicht blind übernommen.
- `alwaysOffAtTime` behält seine dokumentierte Bedeutung: normale Abschaltung
  erst zum Zeitfensterende. Die Heizschutzprüfung bleibt davon unabhängig.
- `npm audit` meldet nach kompatiblen Updates sechs transitive Meldungen:
  drei moderate über `@iobroker/testing` → `@alcalzone/esbuild-register` → `esbuild`
  und drei hohe über `@iobroker/adapter-core` → `@iobroker/js-controller-common-db`
  → `node-forge`. Die Zählung umfasst die jeweils betroffenen Elternpakete.
  Es gibt im verwendeten aktuellen Abhängigkeitsbaum kein kompatibles Update.
  Der Adapter startet keinen esbuild-Entwicklungsserver und verarbeitet selbst
  keine RSA-Signaturen. Es wird keine Sicherheitsfreiheit behauptet und kein
  erzwungenes Downgrade der vom Repository-Checker geforderten Werkzeuge vorgenommen.
- Issue #84 benötigt eine gesonderte Änderung im ioBroker-Stable-Repository
  nach einer erfolgreichen Veröffentlichung und wird durch einen Git-Push allein
  nicht erledigt.
- Automatisierte Prüfungen ersetzen keine Inbetriebnahme mit realen Geräten.