---
chapters: {"pages":{"en/adapterref/iobroker.anomaly-detection/README.md":{"title":{"en":"ioBroker.anomaly-detection"},"content":"en/adapterref/iobroker.anomaly-detection/README.md"},"en/adapterref/iobroker.anomaly-detection/README.de.md":{"title":{"en":"ioBroker.anomaly-detection"},"content":"en/adapterref/iobroker.anomaly-detection/README.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anomaly-detection/README.de.md
title: ioBroker.Anomalieerkennung
hash: qrI9HCmwka06U3/Ujn9zdiLgkCvLJZUJJmvNF3bgEZc=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.anomaly-detection.svg?color=blue)
![Downloads](https://img.shields.io/npm/dm/iobroker.anomaly-detection.svg)

<img src="admin/anomaly-detection.png" alt="Logo" width="400">

# ioBroker.Anomalieerkennung

[Englisch](/#/adapters/anomaly-detection) · **Deutsch**

Der Adapter lernt das normale Verhalten ausgewählter numerischer ioBroker-Zustände meldet und statistisch ungewöhnliche Werte lokal.

> **Es wird keine KI verwendet.** Der Adapter nutzt weder Cloud-Dienste noch externe KI- oder Machine-Learning-APIs. Alle Bewertungen werden lokal mit deterministischen mathematischen und statistischen Verfahren berechnet, unter anderem Median, Median Absolute Deviation (MAD), Zeitbereichs-Baselines und robuste Steigungen. Bei gleichen Eingangsdaten und Einstellungen sind die Ergebnisse nachvollziehbar und reproduzierbar.

## Funktionsweise

Starre Grenzwerte können zeit- oder betriebsabhängiges Verhalten nicht abbilden: 8 kW können morgens normal, an einem warmen Sonntag aber ungewöhnlich sein. Für jeden konfigurierten numerischen Zustand verwaltet der Adapter begrenzte, robuste Baselines. Jede eingehende Zustandsänderung wird ausgewertet; die Quellzustände werden nicht abgefragt (kein Polling).

Der Adapter kombiniert folgende deterministische Detektoren:

- **Wertabweichungen (MAD):** Erkennt Werte außerhalb des erlernten Normalbereichs, ohne dass ein einzelner Extremwert die Baseline stark verzerrt.
- **Änderungsrate:** Bewertet `Delta / vergangene Zeit` und berücksichtigt dadurch unregelmäßige Update-Abstände.
- **Festhängende Werte:** Erkennt wiederholt empfangene identische Werte, die länger als die konfigurierte Dauer anhalten. Ein fehlendes Update allein gilt niemals als festhängend.
- **Tageszeit-Kontext:** Verwendet standardmäßig Stundenbereiche und kann zusätzlich nach Wochentagen getrennt werden. Bei zu wenigen Daten greift die Hierarchie auf den Zeitraum und anschließend auf die globale Baseline zurück.

`score` ist ein deterministischer Schweregrad von 0 bis 100. Er ist weder eine statistische Wahrscheinlichkeit noch eine Diagnose der physischen Ursache.

## Voraussetzungen

- Node.js 24 oder neuer (laut `package.json`).
- ioBroker js-controller 7.2.2 oder neuer (laut `io-package.json`).
- ioBroker Admin 8.2.0 oder neuer für den Custom-Administrations-Tab. Die föderierte Admin-Oberfläche verwendet React 19 und MUI 9; Die Kompatibilität mit jeder Admin-8.x-Hostversion wurde nicht separat bestätigt. Verwende daher eine aktuell unterstützte Admin-Version.

| Punktzahl | Bedeutung       |
| --------- | --------------- |
| 0–49      | Normal          |
| 50–69     | Standard        |
| 70–84     | Anomalie        |
| 85–100    | starke Anomalie |

## Mathematische Grundlagen

Der Adapter verwendet eine begrenzte, robuste Statistik. Er trainiert kein neuronales Netz, ruft keinen KI-Dienst auf und setzt keine konstanten Messintervalle voraus.

### Wertabweichungen: Median und MAD

Für eine erlernte Baseline mit Werten `x₁ … xₙ` ist der erwartete Wert der Median `m = median(x₁ … xₙ)`. Die Streuung wird mit der Median Absolute Deviation berechnet:

`MAD = median(|xᵢ − m|)`

Für einen neuen Wert `x` Ergibt sich der robuste z-Score:

`robuster z-Score = 0,6745 × |x − m| / MAD`

Die Option **Sensitivität** legt fest, bei welchem z-Score dieser Detektor den Wert 100 erreicht. Median und MAD werden von einzelnen Ausreißern deutlich weniger verzerrt als Mittelwert und Standardabweichung. Bei `MAD = 0` ist ein unveränderter Wert normal; Ein anderer Wert gilt als starke Abweichung.

### Änderungsrate

Für zwei aufeinanderfolgende Werte wird das tatsächliche Zeitintervall verwendet:

`Rate = (aktueller Wert − vorheriger Wert) / vergangene Sekunden`

Die Rate-Baseline wird mit derselben Median/MAD-Methode gelernt. So kann eine ungewöhnlich schnelle Änderung erkannt werden, auch wenn der absolute Endwert noch plausibel ist.

### FestHängende Werte

Dieser Detektor ist regelbasiert. Werden identische Werte wiederholt empfangen, merkt sich der Adapter den ersten Zeitpunkt `t₀`. Ein Treffer ist erst möglich, wenn gilt:

`aktueller Zeitpunkt − t₀ ≥ konfigurierte Dauer`

Ein fehlendes Update zählt nicht als wiederholter Wert und kann daher keine Festhängend-Anomalie auslösen.

### Tageszeit- und Wochentags-Kontext

Zeitbereiche werden aus der lokalen Tageszeitung gebildet:

`Zeitbereich = floor(Minuten seit Mitternacht / Bucket-Größe)`

Mit aktivierter Wochentagsoption wird der Wochentag in den Schlüssel aufgenommen. Eine Baseline wird nur verwendet, wenn sie mindestens **eine Mindestanzahl gelernter Messwerte** enthält. Die Fallback-Reihenfolge lautet:

`Wochentag + Zeitbereich → Zeitbereich → globale Baseline`

### Kontextabhängige Baseline

Kontextzustände erzeugen zusätzliche Schlüssel, zum Beispiel `pumpe.ein=true`, `modus=eco` Oder `temperatur=10–15`. Numerische Kontextwerte werden in festen Intervallen eingeteilt:

`Intervallbeginn = floor(Kontextwert / Bucket-Breite) × Bucket-Breite`

Bei einer Breite von 5 gehört der Wert 12,3 zum Intervall 10–15. Ein Kontext muss mindestens die konfigurierte Mindestanzahl an Messwerten enthalten, bevor er als Baseline verwendet wird. Ein gültiger, aber noch nicht ausgereifter Kontext bleibt im Status `learning` und wird nicht mit einer fremden globalen Baseline verglichen. Fehlende oder ungültige Kontextwerte verwenden den normalen Zeit-/Global-Fallback. Kombinationen, Kategorien und Samples sind begrenzt, damit der Speicher nicht unkontrolliert wächst.

### Dauerhafte Pegelverschiebung

Die Auswertung arbeitet mit Residuen:

`Residuum = tatsächlicher Wert − erwarteter Wert`

Der robuste Median eines begrenzten aktuellen Residuenfensters wird mit dem erwarteten Residuum verglichen und anhand der MAD-Baseline normiert. Eine Verschiebung muss bei mehreren Auswertungen in die gleiche Richtung anhalten; Ein einzelner Peak wird dadurch nicht zu einem Change Point.

### Trend

Auch der Trend wird auf Rückstände berechnet, damit normale Tagesmuster zuvor abgezogen werden. Für alle gültigen Wertepaarungen wird die Steigung bestimmt:

`Steigungᵢⱼ = (Residuumⱼ − Residuumᵢ) / (Zeitstempelⱼ − Zeitstempelᵢ)`

Die letzte Steigung ist der Median dieser Steigungen (robuste Theil-Sen-ähnliche Methode). Isolierte Ausreißer haben dadurch deutlich weniger Einfluss als bei einer gewöhnlichen linearen Regression. Ein Trend benötigt mindestens 12 Messwerte über mindestens sechs Stunden.

### Kombinierter Score und Lernen

Jeder Detektor liefert einen begrenzten Score von 0 bis 100. Wert-/Kontext-, Pegelverschiebungs- und Trendsignale gelten als zusammengehörige Evidenz; Nur das stärkste dieser Signale wird gewichtet, damit nichts doppelt gezählt wird. Rate- und Festhängend-Signale können unabhängig beitragen. Mehrere unabhängige starke Signale erzeugen einen kleinen begrenzten Bonus. Der Endwert wird immer auf 0–100 begrenzt.

Messwerte ab **Anomalie-Schwellenwert** werden normalerweise nicht weiter gelernt, damit ein anhaltender Fehler nicht sofort als normal gilt. Bestätigte Pegelverschiebungen sind eine Ausnahme: Ihre Werte werden schrittweise erfasst, damit ein legitimes neues Betriebsniveau zur neuen Baseline werden kann.

## Konfiguration

Füge in der Tabelle **überwachte numerische Zustände** für jede Quelle eine Zeile hinzu. Unterstützt werden nur ioBroker-Zustände mit `common.type: number` Die

Die wichtigsten Standardwerte sind bewusst zurückhaltend:

- Vor der Überwachung werden standardmäßig 30 Messwerte gelernt.
- Die Empfindlichkeit beträgt 3,5 robuste z-Scores.
- Die anhaltende Anomalieanzeige benötigt standardmäßig Score 70 für fünf Minuten.
- Eine Hysterese von 10 Punkten verhindert Flattern an der Schwelle.
- Der Festhängend-Detektor ist standardmäßig deaktiviert und wird bei Aktivierung 120 Minuten verwendet.
- Der Tageszeitkontext arbeitet standardmäßig mit 60-Minuten-Bereichen; Der Wochentagskontext ist optional.

Änderungen werden nach dem Neustart des Adapters wirksam. Doppelte Quell-IDs werden nach der ersten aktivierten Zeile ignoriert. Fehlende konfigurierte Objekte bleiben abonniert, damit sie später automatisch verwendet werden können; Beim Start wird eine Warnung protokolliert.

Wird eine Quelle aus der Konfiguration entfernt und der Adapter neu gestartet, löscht er den entsprechenden generierten Teilbaum unter `anomaly-detection.0.sources` sowie das gespeicherte Modell. Dabei wird die ursprüngliche Quell-ID aus den Metadaten des generierten Geräts verwendet. Eine nur vorübergehend nicht verfügbare, weiterhin konfigurierte Quelle bleibt erhalten.

## Analyseansicht und Verlauf

Die **Aktuelle Registerkarte Anomaliebewertungen** enthält pro überwachte Quelle ein responsives, zunächst eingeklapptes Diagramm **Verlauf & Anomalien** . Der Verlauf wird erst beim Öffnen geladen. Zur Auswahl stehen **1 h** , **6 h** , **24 h** (Standard) und **7 Tage** .

Das Diagramm verwendet die Einheit des ioBroker-Zustands, zum Beispiel `W`, `%` Oder `°C`, und passt seine Breite an die tatsächliche Kartenbreite an. Es zeigt:

- **Wert:** historische Messwerte aus dem konfigurierten History-Adapter.
- **Erwartungsbereich:** Ein transparentes Band ausschließlich aus den zu jedem historischen Zeitpunkt gespeicherten Daten `decisionLow` /`decisionHigh` -Grenzen. Fehlende Grenzen bleiben leer; der aktuelle Bereich wird nicht rückwirkend projiziert.
- **Kontext:** eine dezente Hervorhebung für Zeitabschnitte, deren gespeicherter Kontext zum aktuellen Kontext passt. Wenn vorhanden, werden die ioBroker-`common.name` -Name angezeigt.
- **Anomalie:** ein rotes Dreieck nur bei historischen Bewertungen mit `detected: true` Die

Beim Überfahren oder Berühren eines Punktes werden Wert und Einheit, historischer Erwartungsbereich (oder ein Hinweis, dass er nicht verfügbar ist), Status, übersetzter Grund, Score und Kontext für genau diesen Zeitpunkt angezeigt. Bei Wert-/Kontextabweichungen wird zusätzlich die konkrete Distanz oder unterhalb des historischen Bereichs angegeben. Rate, Festhängend, Trend und Pegelverschiebung behalten ihre jeweilige Detektor-Erklärung.

## Lernen und Beharrlichkeit

Normale Beobachtungen aktualisieren globale und zeitbasierte Basislinien schrittweise. Messwerte ab dem Anomalie-Schwellenwert werden nicht gelernt. Pro Baseline werden höchste 240 Samples und kompakte Modelldaten gespeichert; Eine unbegrenzte Rohdaten-Zeitreihe wird nicht angelegt.

Alle erweiterten Detektoren sind standardmäßig deaktiviert. Kontextabhängige Erkennung kann bis zu drei boolesche, Text-/Enum- oder numerisch gebucktete Zustände getrennt lernen. Eine gültige, aber noch zu kleine Kontext-Baseline bleibt im Lernstatus. Pegelverschiebung benötigt wiederholte Beweise; Trend benötigt mindestens 12 Reste über sechs Stunden.

Der Adapter erkennt statistische Ungewöhnlichkeit, entdeckt aber keine Gerätefehler und beweist keine Ursache. Ein History-Import trainiert nur globale, Zeit-, Wochentags- und Rate-Modelle. Kontextbaselines lernen aus Live-Werten, weil allgemeine History-Adapter ausgewählte Kontextzustände nicht zuverlässig zeitlich rekonstruieren können.

## Optionen im Überblick

| Option                                           | Zweck und Anwendung                                                                                                                     | Beispiel                                                                                |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Aktiviert**                                    | Startet oder stoppt die Überwachung dieser Zeile. Deaktivierte Zeilen bleiben konfiguriert.                                             | Während einer Wartung deaktivieren.                                                     |
| **Quellstatus-ID**                               | Numerischer ioBroker-Zustand, der bewertet wird. Über den Objekt-Picker auswählen.                                                      | `alias.0.pumpe.leistung`                                                                |
| **Name**                                         | Lesbarer Name für das generierte Quellgerät; ändert sich nicht die Quell-ID.                                                            | `Gartenpumpe Leistung`                                                                  |
| **Initiales Training**                           | Nur Live-Werte lernen oder Geschichte importieren.                                                                                      | Für einen Power-Meter mit InfluxDB-History: History importieren.                        |
| **History-Quelle**                               | Kompatible, aktivierte History-Adapterinstanz für den Import.                                                                           | `influxdb.0`                                                                            |
| **Zeitraum des History-Trainings (Tage)**        | Wie weit der Import zurückreicht. Nur repräsentative Normalzeiten auswählen.                                                            | `30` Tage                                                                                |
| **Maximal importierte Proben**                   | Begrenzung des Imports zum Schutz von Speicher und Raspberry Pi.                                                                        | `1000`                                                                                  |
| **Überwachung nach History-Import starten**      | Startet nach ausreichendem Import direkt den Status `monitoring` Die                                                                     | Für eine etablierte Messreihe aktivieren.                                               |
| **Mindestensgelernte Proben**                    | Mindestgröße einer vertrauenswürdigen Baseline.                                                                                         | `30` für häufige Leistungswerte.                                                        |
| **Zeit-Bucket-Größe (Minuten)**                  | Größe der Tageszeitbereiche. Kleinere Bereiche sind genauer, lernen aber langsamer.                                                     | `60` Minuten                                                                            |
| **Empfindlichkeit (robusterer Z-Score)**         | Je empfindlicher, desto toleranter.                                                                                                     | Auf `5` erhöht, wenn normale Schwankungen zu viele Meldungen erzeugen.                   |
| **Anomalie-Schwellenwert**                       | Score, ab dem eine Anomalie gespeichert und nicht mehr gelernt wird.                                                                    | `70`                                                                                    |
| **Mindestdauer einer Anomalie (Minuten)**        | Zeit, die die Schwelle überschritten sein muss, bevor `detected` dauerhaft gesetzt wird.                                                 | `5` Minuten                                                                             |
| **Detektor für Wertabweichungen (MAD)**          | Erkennt ungewöhnliche absolute Werte gegenüber dem gelernten Bereich.                                                                   | Für Temperatur, Druck, Verbrauch und Leistung aktivieren.                               |
| **Detektor für Änderungsrate**                   | Erkennt ungewöhnlich schnelle Änderungen.                                                                                               | Für Durchfluss oder Füllstand aktivieren; bei normalen Lastsprüngen deaktiviert lassen. |
| **Detektor für festhängende Werte**              | Erkennt wiederholt empfangene identische Werte über die konfigurierte Dauer.                                                            | Für regelmäßig wechselnde Sensoren aktivieren, nicht für lange konstante Sollwerte.     |
| **Dauer eines festhängenden Wertes**             | Wird nur bei aktiviertem Festhängend-Detektor angezeigt; legt dessen Mindestdauer fest.                                                 | `120` Minuten                                                                           |
| **Tageszeit-Kontext verwenden**                  | Trennt Baselines nach Tageszeit.                                                                                                        | `60` -Minuten-Eimer für den Haushaltsverbrauch.                                         |
| **Wochentags-Kontext verwenden**                 | Trennt zusätzlich nach Wochentag; funktioniert zusammen mit dem Tageszeit-Kontext.                                                      | Büroverbrauch werktags gegenüber Wochenende.                                            |
| **Kontextbezogene Erkennung aktivieren**         | Lernt abhängig von bis zu drei weiteren Zuständen.                                                                                      | `pumpe.ein`, `modus`, Außentemperatur.                                                 |
| **Kontextzustände**                              | Die Zustände, die den Betriebszustand beschreiben. Boolesche und Enum-Werte benötigen keine Breite; Numerische Werte verwenden Buckets. | `pumpe.ein=true` Temperatur-Breite `5` Die                                               |
| **Dauerhafte Erkennung von Pegelverschiebungen** | Erkennt ein anhaltend verändertes Betriebsniveau.                                                                                       | Die Standby-Leistung ist dauerhaft von 5 W auf 12 W gestiegen.                          |
| **Trenderkennung aktivieren**                    | Erkennt langsame Aufwärts- oder Abwärtsentwicklung über Rückstände.                                                                     | Heizdauer steigt über mehrere Tage.                                                     |

### Konfigurationsgrundsätze

1. Beginnen Sie mit den Standarddetektoren und aktivieren Sie nur Verfahren, die zum physikalischen Verhalten der überwachten Quelle passen.
2. Aktiviere nicht jeden verfügbaren Detektor nur deshalb, weil er vorhanden ist.
3. Fügen Sie Kontextzustände nur hinzu, wenn sie den erwarteten Wert erklären; Kontext mehr weniger bedeutet Trainingsdaten pro Kontext.
4. Starte mit der Standardsensitivität und dem Standardschwellenwert. Erhöhen Sie die Toleranz erst, nachdem legitime Fehlalarme beobachtet wurden.
5. Verwende History-Training nur, wenn der ausgewählte Zeitraum den normalen Betrieb repräsentiert und nicht überwiegend bekannte Fehler- oder Installationsphasen enthält.
6. Eine statistische Anomalie zeigt ein ungewöhnliches Verhalten relativ zu den Lerndaten. Sie beweist weder einen Gerätefehler noch dessen Ursache.

### Einrichtung mit einem KI-Assistenten

Ein KI-Assistent kann anhand dieser README und deines Anwendungsfalls eine erste Konfiguration vorschlagen. Dafür sorgen die physikalische Größe, die Bedeutung der Quelle, deren Update-Häufigkeit, relevante ioBroker-Kontextzustände, ob schnelle Änderungen oder lange konstante Phasen normal sind, ob Tages- oder Wochenmuster bestehen, ob dauerhafte Pegelverschiebungen oder langsame Trends relevant sind und ob historische Daten verfügbar sind.

KI-generierte Einstellungen sind nur ein Ausgangspunkt und müssen mit dem tatsächlichen Geräteverhalten abgeglichen werden. Der Adapter selbst bleibt deterministisch und verwendet keine KI.

Beispiel-Prompt:

> Ich möchte den elektrischen Leistungsverbrauch einer Pumpe überwachen. Der Ein-/Aus-Zustand und die Betriebsart der Pumpe sind als zusätzliche ioBroker-Zustände verfügbar. Start- und Stoppvorgänge verursachen schnelle, aber normale Leistungsänderungen. Eine dauerhafte Abweichung von der üblichen Betriebsleistung wäre relevant. Für die letzten 30 Tage liegt History in InfluxDB vor. Empfiehl mir auf Grundlage dieser README geeignete Einstellungen für Anomaly-Detection und erkläre jede Auswahl.

### Auswahlhilfe für Detektoren

- **MAD/Wertabweichungen:** Für unerwartete Einzelwerte relativ zum erlernten Normalverhalten.
- **Änderungsrate:** Wenn ungewöhnlich schnelle Änderungen relevant sind; deaktivieren, wenn schnelle Änderungen normal sind.
- **Festhängend:** Für Sensoren, die sich regelmäßig verändern müssen; Nicht für Werte, die lange legitim konstant bleiben.
- **Kontextbezogen:** Wenn ein anderer Zustand das erwartete Verhalten erklärt. Boolesche/Enum-Kontexte beschreiben Betriebsart oder Anwesenheit, numerische Kontexte zum Beispiel Außentemperatur, Ladezustand oder Last.
- **Pegelverschiebung:** Für dauerhafte Änderungen des normalen Betriebsniveaus.
- **Trend:** Für langsames Driften oder vorzeitiges Driften; bei stark schwankenden Signalen meist deaktiviert lassen.

### Praxisbeispiel: Pumpenleistung

Für die elektrische Leistung einer Pumpe sind zunächst **Detektor für Wertabweichungen** , **kontextbezogene Erkennung** und **dauerhafte Erkennung von Pegelverschiebungen** sinnvoll. **Detektor für Änderungsrate** , **Detektor für festhängende Werte** und **Trenderkennung** bleiben zunächst deaktiviert, weil normale Start-/Stoppvorgänge schnelle Änderungen verursachen und eine ausgeschaltete Pumpe legitim bei `0 W` stehen kann.

Als Kontext eignen sich der Ein-/Aus-Zustand und die Betriebsart. So entstehen getrennte Normalmodelle für beispielsweise Pumpe AUS, Pumpe EIN im Normalbetrieb und Pumpe EIN im Boost-Modus. Weitere Zustände nur hinzufügen, wenn sie die erwartete Leistung nachweislich erklären; Zu viele Kontextzustände verteilen die Samples auf zu viele Kombinationen.

## Wahlfächer Geschichte-Ausbildung

Für eine Quelle **Vorhandene History** auswählen und anschließend eine **History-Quelle** aus der Auswahlliste wählen. Die Liste enthält nur vollständige, aktivierte History-Provider wie `influxdb.0`, `history.0` Oder `sql.1`, die für genau diesen Zustand aktiviert sind. Wenn keine Quelle angezeigt wird, ist für den Zustand oder sein Alias-Ziel keine kompatible Historie aktiviert; **Nur Live-Werte lernen** bleibt trotzdem verfügbar.

Standardmäßig werden 30 Tage und höchstens 1.000 Samples importiert. Ungültige Werte und Zeitstempel werden verworfen, doppelte Zeitstempel zusammengeführt und übergroße Ergebnismengen gleichmäßig über den gesamten Zeitraum verteilt. Offensichtliche historische Extremwerte werden vor dem Lernen robust ausgeschlossen. Große Zeitlücken erzeugen niemals eine Festhängend-Anomalie.

Ein importiertes Modell wird nach einem Neustart wiederverwendet. Eine Änderung von History-Quelle, Zeitraum oder Sample-Limit startet einen neuen Import. Bei fehlgeschlagenem oder zu kleinem Import bleibt die Quelle nutzbar und lernt live weiter. Über `sources.<sanitized-source-id>.retrain = true` wird ausdrücklich das Anomaliemodell verworfen und neu trainiert; Ein vollständiges Predictive-Modell bleibt dabei erhalten und wird nur bei erforderlichem History-Bootstrap neu aufgebaut. Der Adapter setzt den Wert anschließend mit `ack=true` auf `false` zurück.

## Erzeugte Objekte

Für jede Quelle legt der Adapter unter folgendem Pfad eine sichere, deterministische Objekt-ID an:

`anomaly-detection.0.sources.<sanitized-source-id>.analysis`

| Zustand               | Typ/Rolle                    | Bedeutung                                                                                                                         |
| --------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `actual`              | Nummer /`value`              | zuletzt akzeptierter Quellwert                                                                                                    |
| `expected`            | Nummer /`value`              | Median der verwendeten Baseline                                                                                                   |
| `deviation`           | Nummer / `value`             | `actual - expected`                                                                                                               |
| `score`               | Nummer /`value`              | normierter Anomalie-Score 0–100                                                                                                   |
| `detected`            | boolescher Wert /`indicator` | persistente Anomalieanzeige                                                                                                       |
| `status`              | Zeichenkette /`info.status`  | `insufficientData`, `learning` Oder `monitoring`                                                                                  |
| `reason`              | Zeichenkette /`text`         | deterministische Erklärung der aktuellen Bewertung                                                                                |
| `lastAnomaly`         | Zeichenkette /`date`         | Zeitpunkt der letzten hohen Bewertung                                                                                             |
| `sampleCount`         | Nummer /`value`              | Gespeicherte globale Samples, maximal 240                                                                                         |
| `baselineScope`       | Zeichenkette /`info.status`  | verwendete Baseline: `context`, `time`, `global` Oder `insufficient`                                                               |
| `activeContext`       | Zeichenkette /`text`         | aktueller normalisierter Kontext                                                                                                  |
| `baselineSampleCount` | Nummer /`value`              | Beispiele der tatsächlich verwendeten Baseline                                                                                    |
| `contextSampleCount`  | Nummer /`value`              | Beispiele im passenden Kontextmodell                                                                                              |
| `bootstrapStatus`     | Zeichenkette /`info.status`  | Ergebnis des optionalen History-Imports                                                                                           |
| `retrain`             | boolescher Wert /`button`    | `true` schreiben, um das Anomaliemodell zurückzusetzen und neu zu trainieren; Ein vollständiges Predictive-Modell bleibt erhalten |

Alle vom Adapter geschriebenen Ergebnis-States verwenden `ack=true` Die `retrain` ist der einzige Befehls-State und wird nach der Verarbeitung zurückgesetzt.

## Prädiktive Prognose

Die optionale Predictive-Funktion erzeugt für jede überwachte numerische Quelle eine begrenzte lokale Prognose. Die Prognose verwendet die persistierte Trainingsbasis und keine Cloud-Dienste oder KI-APIs. Unterstützt werden Level/Trend-, saisonale und Tageszeitmodelle; Das konfigurierte Modell wird durch deterministisches Backtesting ausgewählt.

Die Prognosepunkte behalten ihren echten Zeitstempel und das Modellintervall; Der letzte Punkt wird bei Bedarf auf den eingestellten Horizont begrenzt. Trend und saisonale Phase werden vom letzten Trainingswert bis zur aktuellen Prognosezeit fortgeschrieben, auch zwischen zwei Modellintervallen. Der aktuelle Live-Wert wird als separater Ist-Marker dargestellt; er wird weder in die gestrichelte Forecast-Serie eingefügt noch mit ihr verbunden. So bleibt eine Abweichung zwischen Messwert und modellierter Erwartung am Prognoseursprung sichtbar, ohne eine künstliche Rampe zu erzeugen.

Die Prognosekarte zeigt Horizont, ausgewähltes Modell, Modellintervall, Trainingsquelle, Anzahl der Trainingswerte, letzten Trainingszeitpunkt, Saisonalität und Qualitätsklasse. Die Qualität basiert auf dem historischen mittleren absoluten Fehler (MAE). Die Zustände können `disabled`, `learning`, `ready`, `unreliable` Oder `error` sein; eingeschränkte oder unzuverlässige Prognosen bleiben mit einem eindeutigen Status sichtbar.

Die Predictive-Einstellungen werden pro Quelle festgelegt: Aktivierung, Prognosehorizont, Aktualisierungsintervall, minimale und maximale Trainingspunktzahl sowie der Saisonalitätsmodus (aus, automatisch oder manuell). Das Initialtraining kann Live-Werte oder einen kompatiblen History-Provider verwenden. Persistierte Modelle und ihre begrenzten Trainingsbasen bleiben über Neustarts erhalten; Fehlende oder inkompatible Trainingsdaten ersetzen ein History-Modell nicht durch ein reines Live-Training.

Die Predictive-Algorithmusversion ist jetzt 8. Ältere Modelle Algorithmen werden verworfen und aus der konfigurierten History-Quelle oder neuen Live-Trainingswerten neu aufgebaut. Dadurch werden alte Modellkoeffizienten nicht mit den korrigierten Prognoseformeln interpretiert.

Die Prognose-Interpolation endet an Lücken, die sowohl sechs Stunden als auch sechs typische Quellintervalle überschreiten. Das Training verwendet dann den zusammenhängenden Abschnitt. Bei zu wenigen Werten wartet es auf weitere Daten und behält ein vollständig trainiertes Modell bei. Mehrfachmeldungen desselben Zeitstempels zählen nicht als neue Trainingswerte. Nicht endliche Zwischenergebnisse führen zu einem ausdrücklichen Fehlerstatus ohne Prognosepunkte.

## Einschränkungen und Datenschutz

Eine Anomalie bedeutet, dass ein Wert oder Verhalten relativ zu den erlernten Beobachtungen ungewöhnlich ist. Sie beweist weder einen Gerätefehler noch dessen Ursache. Ungeeignete Einstellungen, nicht repräsentative Trainingsräume oder sich änderndes Anlagenverhalten können Fehlalarme oder übersehene Anomalien verursachen.

Verarbeitung und Modellspeicherung erfolgen vollständig lokal in ioBroker. Kein Messwert wird an einen externen KI-, Analyse- oder Cloud-Dienst gesendet.

## Unterstützung

Wenn dir dieser Adapter gefällt, kannst du seine Weiterentwicklung mit einer Spende unterstützen:

[![Mit PayPal ausgeben](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Lizenz

MIT-Lizenz

Copyright © 2026 Voodoo2man <Voodoo2man@outlook.de>

## Changelog

Das Changelog ist in der [englischen README](/#/adapters/anomaly-detection#changelog) verfügbar.