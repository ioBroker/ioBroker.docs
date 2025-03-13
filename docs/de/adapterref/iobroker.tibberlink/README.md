---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: ucsrbboNZlZMjao+AU+r2J/q5iskGTbXVBZHtcnYax4=
---
![Logo](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Letzter GitHub-Commit](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![Bekannte SNYK-Sicherheitslücken](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/tibberlink-stable.svg)
![Installiert](https://iobroker.live/badges/tibberlink-installed.svg)
![NPM](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
[![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## Versionen
## Adapter zur Nutzung von TIBBER-Energiedaten in ioBroker
Dieser Adapter erleichtert die Verbindung von Daten aus der API Ihres Tibber-Kontos zur Verwendung innerhalb von ioBroker, egal ob für ein einzelnes oder mehrere Haushalte.
Neue Funktion: Der Adapter unterstützt jetzt das direkte lokale Auslesen des Tibber-Pulssensors über Ihr Heimnetzwerk und ermöglicht so Echtzeitüberwachung und Datenerfassung, ohne ausschließlich auf die Cloud-API angewiesen zu sein.

Wenn Sie derzeit kein Tibber-Benutzer sind, würde ich es sehr schätzen, wenn Sie meinen Empfehlungslink verwenden könnten: [Tibber-Empfehlungslink](https://invite.tibber.com/mu8c82n5).

## Standardkonfiguration
- Beginnen Sie mit der Erstellung einer neuen Instanz des Adapters.
- Sie benötigen außerdem ein API-Token von Tibber, das Sie hier erhalten: [Tibber Developer API](https://developer.tibber.com).
- Tragen Sie in den Standardeinstellungen Ihren Tibber-API-Token ein und konfigurieren Sie mindestens eine Zeile für Live-Feed-Einstellungen (wählen Sie „Keine verfügbar“).
- Speichern Sie die Einstellungen und beenden Sie die Konfiguration, um den Adapter neu zu starten. Dieser Schritt ermöglicht die erste Abfrage Ihres Zuhauses/Ihrer Zuhause(s) vom Tibber-Server.
Kehren Sie zum Konfigurationsbildschirm zurück und wählen Sie die Häuser aus, von denen Sie mit Ihrem Tibber Pulse Echtzeitdaten abrufen möchten. Sie können auch Häuser auswählen und den Feed deaktivieren (Hinweis: Dies funktioniert nur, wenn die Hardware installiert ist und der Tibber-Server die Verbindung zu Pulse überprüft hat).
- Hinweis: Wenn du in deinem Tibber-Konto mehrere aktive Homes hast, musst du alle hinzufügen, um Fehlermeldungen zu vermeiden, die durch möglicherweise nicht benötigte Homes verursacht werden. Füge alle Homes hinzu und deaktiviere die Optionen.
- Sie haben die Möglichkeit, den Abruf der Preisdaten für heute und morgen zu deaktivieren, wenn Sie beispielsweise nur Pulse-Live-Feeds nutzen möchten
- Optional können Sie den Abruf historischer Verbrauchsdaten aktivieren. Geben Sie die Anzahl der Datensätze für Stunden, Tage, Wochen, Monate und Jahre an. Mit "0" können Sie ein oder mehrere dieser Intervalle nach Ihren Wünschen deaktivieren.
Hinweis: Achten Sie unbedingt auf die Datensatzgröße, da übermäßig große Anfragen zu einer mangelnden Reaktion des Tibber-Servers führen können. Wir empfehlen, mit der Datensatzgröße zu experimentieren, um optimale Funktionalität zu gewährleisten. Durch Anpassen der Intervalle und Datensatznummern können Sie das richtige Gleichgewicht zwischen dem Erhalt aussagekräftiger Daten und der Aufrechterhaltung der Serverreaktion finden. Beispielsweise ist 48 Stunden eine recht gute Anzahl.
- Speichern Sie die Einstellungen.

## Rechnerkonfiguration
– Nachdem die Tibber-Verbindung nun hergestellt ist und läuft, können Sie den Rechner auch nutzen, um zusätzliche Automatisierungsfunktionen in den TibberLink-Adapter zu integrieren.
- Der Rechner arbeitet mit Kanälen, wobei jeder Kanal mit einem ausgewählten Zuhause verknüpft ist.
- Diese Zustände sind als externe, dynamische Eingaben für TibberLink konzipiert und ermöglichen Ihnen beispielsweise, die Grenzkosten („TriggerPrice“) von einer externen Quelle anzupassen oder den Rechnerkanal („Active“) zu aktivieren.
- Diese Kanäle müssen je nach Zustand aktiviert bzw. deaktiviert werden.
- Die Zustände eines Rechnerkanals werden neben den Home-Zuständen angezeigt und entsprechend der Kanalnummer benannt. Dabei wird der im Admin-Bildschirm gewählte Kanalname hier angezeigt, um Ihre Konfigurationen besser identifizieren zu können.

  ![Rechnerzustände](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStates.png)

- Das Verhalten jedes Kanals wird durch seinen Typ bestimmt: „Beste Kosten (LTF)“, „Beste Einzelstunden (LTF)“, „Bester Stundenblock (LTF)“ oder „Intelligenter Batteriepuffer“.
- Jeder Kanal gibt einen oder zwei externe Zustände aus, die im Einstellungs-Tab ausgewählt werden müssen. Dieser Zustand könnte beispielsweise "0_userdata.0.example_state" oder ein anderer beschreibbarer externer Zustand sein.
- Wenn kein externer Ausgabezustand ausgewählt ist, wird ein interner Zustand innerhalb des Kanalbereichs erstellt.
- Die in den Ausgangszustand zu schreibenden Werte können in „Wert JA“ und „Wert NEIN“ definiert werden, z.B. „true“ für boolesche Zustände oder eine zu schreibende Zahl bzw. ein zu schreibender Text.
- Ausgänge:
- „Beste Kosten“: Verwendet den Status „TriggerPrice“ als Eingabe und erzeugt jede Stunde eine „JA“-Ausgabe, wenn die aktuellen Tibber-Energiekosten unter dem Triggerpreis liegen.
- „Beste Einzelstunden“: Generiert eine „JA“-Ausgabe während der günstigsten Stunden mit der im Status „AmountHours“ definierten Anzahl.
- „Best hours block“: Gibt „YES“ während des kostengünstigsten Stundenblocks aus, mit der im Status „AmountHours“ angegebenen Stundenanzahl.

Zusätzlich werden die durchschnittlichen Gesamtkosten im ermittelten Block in den Status „AverageTotalCost“ neben den Eingangszuständen dieses Kanals geschrieben. Als Ergebnis der Berechnung werden außerdem Start- und Endstunde des Blocks in die Status „BlockStartFullHour“ und „BlockEndFullHour“ geschrieben.

- „Bester Prozentsatz“: Gibt „JA“ während der günstigsten Stunde und aller anderen Stunden aus, in denen der Preis innerhalb des im Einstellungsstatus „Prozent“ angegebenen Prozentbereichs liegt.
- „Best cost LTF“: „Beste Kosten“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Beste Einzelstunden LTF“: „Beste Einzelstunden“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Best hours block LTF“: „Best hours block“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Bester Prozentsatz LTF“: „Bester Prozentsatz“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Smart Battery Buffer“: Mit dem Parameter „EfficiencyLoss“ können Sie den Effizienzverlust des Batteriesystems festlegen. Der Parameter „EfficiencyLoss“ kann zwischen 0 und 1 liegen, wobei 0 keinen und 1 einen vollständigen Effizienzverlust bedeutet. Beispielsweise bedeutet ein Wert von 0,25 einen Effizienzverlust von 25 % pro Lade-/Entladezyklus.

Geben Sie mit dem Parameter „AmountHours“ die gewünschte Stundenzahl für die Batterieladung ein. Der Rechner aktiviert die Batterieladung („Wert JA“) und deaktiviert die Batteriespeisung („Wert 2 NEIN“) während der angegebenen „AmountHours“-Preisstunden. Umgekehrt deaktiviert er die Batterieladung („Wert NEIN“) und aktiviert die Batteriespeisung („Wert 2 JA“) während der Stunden mit den höchsten Kosten, sofern diese höher sind als der höchste Gesamtpreis der Preisstunden. In den übrigen Normalstunden, in denen eine Energiepufferung durch die Batterie nicht wirtschaftlich ist, werden beide Ausgänge abgeschaltet.

LTF-Kanäle: Diese funktionieren ähnlich wie Standardkanäle, sind jedoch nur innerhalb eines durch die Statusobjekte „StartTime“ und „StopTime“ definierten Zeitraums aktiv. Nach „StopTime“ deaktiviert sich der Kanal automatisch. „StartTime“ und „StopTime“ können zwei Kalendertage umfassen, da Tibber keine Daten über ein 48-Stunden-Fenster hinaus bereitstellt. Beide Zustände erfordern eine Datums-/Uhrzeit-Zeichenfolge im ISO-8601-Format mit einem Zeitzonen-Offset, z. B. „2024-12-24T18:00:00.000+01:00“. Zusätzlich verfügen die LTF-Kanäle über einen neuen Statusparameter namens „RepeatDays“, der standardmäßig auf 0 gesetzt ist. Wenn „RepeatDays“ auf eine positive Ganzzahl gesetzt ist, wiederholt der Kanal seinen Zyklus, indem sowohl „StartTime“ als auch „StopTime“ um die angegebene Anzahl von Tagen nach Erreichen von „StopTime“ erhöht werden. Setzen Sie „RepeatDays“ beispielsweise auf 1 für eine tägliche Wiederholung.

## Graph-Ausgabekonfiguration
Der Adapter unterstützt die Visualisierung von Preistrends und Rechnerergebnissen. Er bietet drei Komplexitätsstufen mit jeweils unterschiedlichen Optionen.

Diese drei Methoden bieten verschiedene Möglichkeiten zur Visualisierung von Preistrends und Rechnerergebnissen. Je nach Ihren Anforderungen können Sie zwischen einem einfachen JSON-basierten Ansatz und einer vollständig angepassten JavaScript-Lösung wählen.

### 1. **(In Entwicklung) Visualisierung mit dem "E-Charts"-Adapter**
Für diese Methode muss der Adapter „E-Charts“ separat installiert werden.

- Es können JSON-Daten verwendet werden, die im Abschnitt „Rechnerzustände“ als „Output-E-Charts“ generiert werden.
– Die Funktionen werden durch die Einschränkungen des E-Charts-Adapters begrenzt.

### 2. **Verwenden des „FlexCharts“-Adapters (oder „Fully Featured eCharts“) mit JSON**
Für diese Methode muss der Adapter „FlexCharts“ separat installiert werden.

– Der TibberLink-Adapter erstellt einen Status namens „jsonFlexCharts“.

    ![jsonFlexChartsState.png](../../../en/adapterref/iobroker.tibberlink/docu/jsonFlexChartsState.png)

– Der FlexCharts-Adapter rendert diesen Status über die folgende URL:

```
http://[YOUR IP of FLEXCHARTS]:8082/flexcharts/echarts.html?source=state&id=tibberlink.0.Homes.[TIBBER-HOME-ID].PricesTotal.jsonFlexCharts
```

– Weitere Einzelheiten finden Sie in der [Dokumentation zum FlexCharts-Adapter](https://github.com/MyHomeMyData/ioBroker.flexcharts).

#### **Verwendung von JSON-Vorlagen**
- Der Status „jsonFlexCharts“ wird basierend auf einer Vorlage generiert, die über den JSON-Editor in den Adaptereinstellungen konfiguriert wurde.
- **Wichtig:** Der integrierte JSON-Editor in ioBroker.Admin unterstützt kein JSON5, was zu falschen Fehlermeldungen führen kann.
- Eine Beispielvorlage kann heruntergeladen werden von: [TemplateFlexChart01.md](docu/TemplateFlexChart01.md).
- Kopieren Sie die Vorlage und fügen Sie sie in den JSON-Editor ein.
- Die Vorlage enthält die Platzhalter:
- `%%xAxisData%%` und `%%yAxisData%%` (werden zur Laufzeit mit Preisinformationen gefüllt).
- `%%CalcChannelsData%%` (gefüllt mit ausgewählten Rechnerkanaldaten).
Der Rest der Vorlage folgt der Apache ECharts-Konfiguration. Weitere Informationen finden Sie unter [Apache ECharts-Beispiele](https://echarts.apache.org/examples/en/index.html).
- **Empfehlung:** Testen Sie den TibberLink-Adapter ohne echte Vorlage mit der Standardzeichenfolge:

```
%%xAxisData%%\n\n%%yAxisData%%\n\n%%CalcChannelsData%%
```

Dies hilft, seine Funktionalität zu verstehen.

- Template-Anpassungen können auf Apache ECharts Beispielseiten mit Hilfe der „Output-E-Charts“ Statusdaten getestet werden.
- Gute Vorlagen werden innerhalb der TibberLink-Adapter-Community geteilt.

### 3. **Verwenden von "FlexCharts" mit benutzerdefiniertem JavaScript-Code**
Für maximale Flexibilität und Anpassung kann der FlexCharts-Adapter mit benutzerdefiniertem JavaScript verwendet werden.

– Sowohl der „FlexCharts“- als auch der „JavaScript“-Adapter müssen separat installiert werden.
- Dieser Ansatz ermöglicht die Erstellung mehrerer benutzerdefinierter Diagramme.
– Weitere Einzelheiten finden Sie in der [FlexCharts-Adapterdiskussion](https://github.com/MyHomeMyData/ioBroker.flexcharts/discussions/67).

## Hinweise
### Inverse Verwendung
Um beispielsweise Spitzenzeiten statt Optimalzeiten zu erhalten, kehren Sie einfach die Verwendung und Parameter um: ![Rechner für inverse Zustände](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStatesInverse.png) Durch Vertauschen von true <-> false erhalten Sie in der ersten Zeile ein True bei geringen Kosten und in der zweiten Zeile ein True bei hohen Kosten (Kanalnamen sind keine Auslöser und weiterhin frei wählbar).

Achtung: Für einzelne Spitzenstunden, wie im Beispiel, müssen Sie auch die Stundenanzahl anpassen. Original: 5 -> Invers (24-5) = 19 -> Sie erhalten während der 5 Spitzenstunden ein wahres Ergebnis.

### LTF-Kanäle
Die Berechnung erfolgt für mehrtägige Daten. Da nur Informationen für „heute“ und „morgen“ (verfügbar ab ca. 13:00 Uhr) vorliegen, ist der Zeitrahmen effektiv auf maximal 35 Stunden begrenzt. Dieses Verhalten ist jedoch unbedingt zu beachten, da sich das berechnete Ergebnis gegen 13:00 Uhr ändern kann, wenn neue Daten für die morgigen Preise verfügbar werden.

Um diese dynamische Änderung des Zeitrahmens für einen Standardkanal zu beobachten, können Sie einen begrenzten Zeitrahmen (LTF) über mehrere Jahre wählen. Dies ist insbesondere für das Szenario „Beste einzelne Stunden LTF“ nützlich.

## Direkte lokale Abfrage der Pulsdaten
Damit dies funktioniert, müssen Sie die Weboberfläche der Bridge so anpassen, dass sie dauerhaft aktiviert bleibt.
marq24 hat dies für seine HomeAssistant-Integration hier hervorragend beschrieben:

https://github.com/marq24/ha-tibber-pulse-local

Wenn alles richtig funktioniert, werden die Zählerdaten alle 2 Sekunden in die ioBroker-Status geschrieben.

## Wache
Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden. Weitere Informationen und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie im [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 aktiviert.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig bist –, überlege doch, mir ein Bier auszugeben. Prost! :Bier:

## Changelog

### **WORK IN PROGRESS**

- (HombachC) enable JSON5 parsing starting with admin 7.5.3
- (HombachC) fix vulnerability in axios <1.8.2 (#673)

### 4.5.0 (2025-03-05)

- (HombachC) add calculator channel 'smart battery buffer LTF' (#668)
- (HombachC) rearrange calculator channels in configuration
- (HombachC) improve debugging messages, code optimisations
- (HombachC) fix 2 errors in enable/disable FlexCharts

### 4.4.0 (2025-03-01)

- (HombachC) add generation time cutoffs for graph outputs (#643)
- (HombachC) set admin to minimum 7.4.10 as recommended by ioBroker (#651)
- (HombachC) Code optimisations, preparations to switch to ESM module
- (HombachC) bump cron to 4.x.x (#648)
- (HombachC) bump axios from 1.8.x (#664)

### 4.3.1 (2025-02-23)

- (HombachC) Bump "@iobroker/adapter-dev" to 1.4.0 (#653)
- (HombachC) start using "@alcalzone/release-script" (#650)
- (HombachC) add option to enable/disable FlexCharts-JSON for each channel (#642)
- (HombachC) fix logging for multiple homes (#647)
- (HombachC) fix encrypted element "tibberBridgePassword" (#652)

### 4.3.0 (2025-02-09)

- (HombachC) added ioBroker.FlexCharts - JSON
- (HombachC) Update tibber-api to 5.2.1 - handle obsolete data as default, remove option
- (HombachC) Calculate outputJSON prior to time frame for channels of type 'BestSingleHours', 'BestHoursBlock', 'BestPercentage', 'BestCost' and their LTF variants (#592)
- (HombachC) add outputJSON and outputJSON2 for 'SmartBatteryBuffer' channels (#592)
- (HombachC) calculator and projectUtils code optimizations
- (HombachC) correct role of stats states to json

### 4.2.3 (2025-01-14)

- (HombachC) bump cron to 3.5

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2025 C.Hombach <TibberLink@homba.ch>