---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.skoda-public-api/docs/compact-mode.md
title: Kompaktmodus
hash: knfo6uhdKbnGj9riQx3L0uN7BgfXnT1py2xP0rh8aRc=
---
# Kompaktmodus

## Architektur- und Stilllegungsvertrag

Die bestehende CommonJS-Factory erzeugt beim Einbetten einen neuen Adapter; die direkte Ausführung erzeugt weiterhin einen herkömmlichen Adapterprozess. Scheduler/Queue-Timer verwenden bereits die Adapterinstanz, und Fahrzeugdaten, Befehlseinträge, Kontingent-Buckets, Verbindungsstatus und Ablaufbenachrichtigungshistorie waren bereits Instanzfelder. Die Produktionsumgebung hat keine `process.exit()` oder konfigurationsabhängige Prozessumgebungsüberschreibungen.

Die übrigen Änderungen beschränken sich auf den Lebenszyklus und die Backend-Nachrichtenverarbeitung:

- Backend-Protokolle, Benachrichtigungen und Verbindungstestergebnisse sind stets auf Englisch, sodass sie für Supportanfragen weiterhin nützlich sind. Vollständige mehrsprachige Objektnamen und deren Migrationslogik bleiben unverändert.
- Jeder HTTP-Client besitzt seine eigenen AbortController und Timeout-Handles. `abort()` Schließt den Zugriff dauerhaft und bricht Anfragen durch Verarbeitung des Antworttextes ab. Timeouts bleiben API-Fehler; die Abschaltung ist ein separates internes Abbruchsignal. Anfrageressourcen werden entfernt in `finally` auch im Fehlerfall. Für die Verbindungstests des Administrators sind separate Clients beim jeweiligen Adapter registriert.
- Scheduler und Warteschlangen werden dauerhaft gestoppt, ihre Timer gelöscht, der Client abgebrochen, verspätete Antworten ignoriert und alle aktiven Promises aufgebraucht. Beim Herunterfahren der Warteschlange werden auch Sofortberichte und in der Warteschlange befindliche Übermittlungen aufgebraucht. Ein Neustart erzeugt über die Factory neue Komponenten.
- Der Adapter setzt sein Lebenszyklus-Stoppflag synchron in `onUnload()` Ein geschützter Adapterport überprüft jeden Aufruf der Methoden StateWriter, Quota-Store und Expiry-Watcher, einschließlich Aufrufe, die nach einem bestimmten Zeitpunkt erreicht werden. `await` Zugelassene Bereitschafts-/Nachrichten-/Statusänderungs- und Antwort-Callbacks werden verfolgt und verarbeitet. Aufräumfehler werden protokolliert, und der Entlade-Callback hat einen einzigen Abschlusspfad.
- Nach dem Setzen dieses Flags werden keine neuen Zustands-/Objektoperationen mehr gestartet. Eine bereits an die ioBroker-Datenbank übermittelte Operation kann weiterhin abgeschlossen werden; Datenbankoperationen können von diesem Adapter nicht abgebrochen werden. Das Kontingent bleibt während der normalen Anfrage- und Antwortverarbeitung erhalten. Beim Entladen werden bestehende Speicherstände gelöscht, ohne weitere Schreibvorgänge zu starten. Daher wird die zuletzt gespeicherte Kontingentspeicherung bestmöglich sichergestellt, wenn das Entladen einen Speichervorgang mit mehreren Zuständen unterbricht oder die Datenbank nicht verfügbar ist; es wird keine Ausnahme von der Schreibsperre gemacht.

In den Adaptermetadaten ist keine feste Kompaktgruppe definiert. Die gemeinsam genutzten Moduldaten bestehen ausschließlich aus Definitionstabellen; Anfragen, Timer und andere Laufzeitdaten gehören zu einzelnen Instanzen. Für den HTTP-Abbruch ist kein erweitertes StopTimeout erforderlich; Datenbankoperationen unterliegen weiterhin dem normalen Limit von ioBroker.

## Automatisierte Überprüfung

```sh
npm run build
npm run test:unit
npm run test:package
npm run test:integration
npm run test:compact
npm run check
npm run lint
npm run check:spec
git diff --check
```

`test:compact` wählt die `Compact group 1` Suite im bestehenden Integrationsrahmen. Es ermöglicht `system.compact` in der temporären Hostkonfiguration und startet den eigentlichen js-controller compact group controller mit Gruppenargument `1` Zwei Instanzobjekte haben `compact`, `runAsCompactMode` und Gruppe 1 explizit festgelegt. Sie verwenden unterschiedliche VINs, API-Schlüssel und Kontingente. Eine reine Test-HTTP-Umleitung leitet die beiden Schlüssel an separate Mock-Server weiter. IPC-Traces beweisen, dass die Anfragen beider Instanzen, auch nach einem Neustart der ersten, von derselben Gruppen-PID stammen. `system.adapter.<instance>.compactMode` Die Bundesstaaten werden ebenfalls überprüft.

Die Testsuite prüft die Objekterstellung, die Ergebnisse des englischen Verbindungstests, Befehle, die tatsächliche 60-Sekunden-Abfrage, das Stoppen, das Ausbleiben nachfolgender Adapterstatusänderungen/Anfragen, fortgesetzte Befehle in der zweiten Instanz und den Neustart der ersten Instanz. Der Neustart berücksichtigt das gespeicherte Kontingent, sodass ein expliziter Verbindungstest die HTTP-Operation der neu gestarteten Instanz nachweist, ohne die übliche Abfrageverzögerung zu umgehen. Die Unit-Tests stoppen zusätzlich ausstehende/laufende Prozesse, Antworttexte und Schreibvorgänge; sie testen Timeout/Abbruch, Aufräumfehler, Wettlaufsituationen zwischen Bereit- und Entladevorgängen sowie neue Komponenten nach dem Herunterfahren. Nicht behandelte Promise-Ablehnungen führen zu einem Fehlschlag der Unit-Tests.

Das Testsystem stellt die eigentlichen ioBroker-Objekte/Zustandsdatenbanken bereit, jedoch keinen Admin-Adapter. Lediglich die Admin-Abhängigkeit der Testinstanzen wird entfernt und deren Version vor dem Start der Gruppe mit dem installierten Paket synchronisiert. Produktionsabhängigkeiten bleiben unverändert. Der Gruppencontroller wird direkt gestartet; das automatische Starten der Gruppe durch einen vollständigen Host-Controller wird von diesem Testsystem nicht ausgeführt.

## Lokaler Verifizierungsbericht (06.09.2026)

Umgebung: macOS, Node.js 26.7.0, js-controller `7.2.3-alpha.18-20260903-2e634e387` (Die installierte Entwicklungsversion des Harness). Release-Metadaten: 0.1.7, erstellt nach dem bestehenden Tag v0.1.6; kein Commit oder Release.

| Überprüfen                                                               | Ergebnis           |
| ------------------------------------------------------------------------ | ------------------ |
| Unit-Tests, einschließlich 12 neuer Lifecycle-/Isolationsfälle           | 376 bestanden      |
| Pakettests                                                               | 59 bestanden       |
| Vollständige Integration (normaler Prozess und kompakte Suite)           | 11 bestanden       |
| Letzter dedizierter Lauf der kompakten Gruppe 1, mit common.compact=true | 1 Person bestanden |
| TypeScript, Linting, Build                                               | Bestanden          |
| Live-Prüfung der OpenAPI-Spezifikation                                   | Unverändert        |
| git diff --check                                                         | Bestanden          |

Beide kompakten Instanzen sendeten Anfragen an dieselbe Gruppen-PID, einschließlich der neu gestarteten Instanz. Der vollständige Adapterstatus-Snapshot der gestoppten Instanz blieb unverändert, während die zweite Instanz einen anderen Befehl ausführte. Objektdefinitionen, API-Schemas/Werte, Rollen/Typen und vollständige Objektnamenübersetzungsdefinitionen blieben unverändert; letztere wurden zudem Byte für Byte mit den Definitionen vor der Änderung verglichen.

Während der gleichzeitigen Beendigung der finalen Gruppe gab der Datenbankclient Folgendes aus: `get state error: Connection is closed.` Beide Instanzen und die Gruppe wurden dennoch mit Code 0 beendet, ohne dass eine unbehandelte Ausnahme oder ein Fehler bei der Adapterbereinigung auftrat. Die Adapterimplementierung des installierten Controllers ruft Folgendes auf: `finishUnload()` sowohl vom Entlade-Callback als auch von dessen 500-ms-Fallback, während `terminate()` Zerstört außerdem die DB-Clients nach 500 ms. Wiederholte Schreibvorgänge im aktiven Zustand können daher zu einem Wettlauf mit dem DB-Schließen führen. Die Warnung wird intern erzeugt. `@iobroker/db-states-redis` 'S `setState()` Der vorherige Wert wurde gelesen. Dieser Race Condition beim Controller-Teardown ist dokumentiert und kann nicht durch Erhöhen des Adapter-Stop-Timeouts behoben oder verschleiert werden. Die Stopp-/Isolationsprüfungen der einzelnen Instanzen wurden erfolgreich abgeschlossen.

## Installationsabnahmeverfahren

Bei einer temporären ioBroker-Installation mit installierter, unterstützter Admin-Abhängigkeit:

1. Aktivieren Sie den Kompaktmodus für den Host über seine ioBroker-Konfiguration/CLI.
2. Weisen Sie der Kompaktgruppe 1 zwei Adapterinstanzen zu und aktivieren Sie die Ausführung im Kompaktmodus. Konfigurieren Sie separate autorisierte VIN/Schlüsselpaare. Konfigurieren Sie keine API-Umleitung für die Produktion.
3. Bestätigen Sie, dass beide Instanzprotokolle Folgendes anzeigen: `COMPACT` beide `compactMode` Die Zustände sind wahr, und beide laufen im selben Kompaktgruppenprozess (nicht in separaten Ausweichprozessen).
4. Prüfen Sie Fahrzeugobjekte, Kontingent- und Ablaufstatus, normale Abfragen, Verbindungstestmeldungen und einen entsprechenden Befehl sowie dessen Verifizierungsabfrage.
5. Die erste Instanz wird gestoppt, solange sie eine Anfrage oder einen ausstehenden Befehl hat. Es wird sichergestellt, dass die Beendigung ordnungsgemäß abgeschlossen wird, keine neuen Adapter-Schreibvorgänge nach dem Stopp erfolgen, keine weiteren Anfragen eingehen, keine irreführenden API-Fehler/unbehandelten Ablehnungen auftreten und der Betrieb der zweiten Instanz fortgesetzt wird.
6. Starten Sie den ersten Prozess erneut. Stellen Sie sicher, dass die Gruppen-PID und die zweite Instanz stabil bleiben, das gespeicherte Kontingent eingehalten wird und der normale Betrieb wieder aufgenommen wird.

Gruppe 0, Live-Fahrzeugausführung, der vollständige Pfad zur Gruppenerzeugung auf dem Host, andere Node-/Controller-Versionen und andere Betriebssysteme erfordern einen eigenen Akzeptanzlauf. Sie werden nicht durch einen erfolgreichen lokalen Gruppe-1-/Mock-Test impliziert.

Die eigentliche Compact-Group-Controller-Suite läuft unter Linux. Der Entwicklungs-JS-Controller wurde installiert von `@iobroker/testing` Der direkt gestartete Compact-Group-Controller kann unter macOS und Windows beendet werden, bevor die Timer für den Instanzstart ohne Verzögerung ausgeführt werden. Auf beiden Plattformen wird weiterhin die vollständige Testsuite ausgeführt, einschließlich der Abdeckung des Compact-Lebenszyklus und der Isolation sowie der üblichen Adapterintegrationstests.