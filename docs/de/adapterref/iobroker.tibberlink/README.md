---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: +oDno0wPp+H7Rp+Vk/PZvLP1z9ZGbWAKq0BBQPpV7Cg=
---
![Logo](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Letzter GitHub-Commit](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![Bekannte SNYK-Sicherheitslücken](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/tibberlink-stable.svg)
![Eingerichtet](https://iobroker.live/badges/tibberlink-installed.svg)
![NPM](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
[![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## Versionen
## Adapter zur Nutzung von TIBBER-Energiedaten in ioBroker
Dieser Adapter erleichtert die Verbindung von Daten aus der API Ihres Tibber-Kontos zur Verwendung innerhalb von ioBroker, egal ob für ein einzelnes Haus oder mehrere Wohnungen.
Neue Funktion: Der Adapter unterstützt jetzt das direkte lokale Auslesen des Tibber-Pulssensors über Ihr Heimnetzwerk und ermöglicht so Echtzeitüberwachung und Datenerfassung, ohne sich ausschließlich auf die Cloud-API verlassen zu müssen.

Wenn Sie derzeit kein Tibber-Benutzer sind, würde ich es sehr schätzen, wenn Sie meinen Empfehlungslink verwenden könnten: [Tibber-Empfehlungslink](https://invite.tibber.com/mu8c82n5).

## Standardkonfiguration
- Beginnen Sie mit der Erstellung einer neuen Instanz des Adapters.
- Sie benötigen außerdem ein API-Token von Tibber, das Sie hier erhalten: [Tibber Developer API](https://developer.tibber.com).
- Tragen Sie in den Standardeinstellungen Ihren Tibber-API-Token ein und konfigurieren Sie mindestens eine Zeile für die Live-Feed-Einstellungen (wählen Sie „Keine verfügbar“).
- Speichern Sie die Einstellungen und beenden Sie die Konfiguration, um den Adapter neu zu starten. Dieser Schritt ermöglicht die erste Abfrage Ihres/Ihrer Zuhauses vom Tibber-Server.
- Kehren Sie zum Konfigurationsbildschirm zurück und wählen Sie die Häuser aus, von denen Sie mit Ihrem Tibber Pulse Echtzeitdaten abrufen möchten. Sie können auch Häuser auswählen und den Feed deaktivieren (Hinweis: Dies funktioniert nur, wenn die Hardware installiert ist und der Tibber-Server die Verbindung zu Pulse überprüft hat).
- Hinweis: Wenn Sie in Ihrem Tibber-Konto mehr als ein aktives Zuhause haben, müssen Sie alle hinzufügen, um Fehlermeldungen zu vermeiden, die durch möglicherweise nicht benötigte Zuhause verursacht werden. Fügen Sie alle hinzu und deaktivieren Sie die Optionen.
- Sie haben die Möglichkeit, den Abruf der Preisdaten für heute und morgen zu deaktivieren, wenn Sie beispielsweise nur Pulse-Live-Feeds nutzen möchten
- Optional können Sie den Abruf historischer Verbrauchsdaten aktivieren. Geben Sie hierfür die Anzahl der Datensätze für Stunden, Tage, Wochen, Monate und Jahre an. Mit „0“ können Sie ein oder mehrere dieser Intervalle nach Ihren Wünschen deaktivieren.
- Hinweis: Es ist wichtig, auf die Größe des Datensatzes zu achten, da übermäßig große Anfragen zu einer fehlenden Antwort vom Tibber-Server führen können. Wir empfehlen, mit der Datensatzgröße zu experimentieren, um eine optimale Funktionalität sicherzustellen. Durch Anpassen der Intervalle und Datensatznummern können Sie das richtige Gleichgewicht zwischen dem Erhalt aufschlussreicher Daten und der Aufrechterhaltung der Serverreaktionsfähigkeit finden. Beispielsweise ist 48 eine recht gute Anzahl an Stunden.
- Speichern Sie die Einstellungen.

## Rechnerkonfiguration
– Da die Tibber-Verbindung nun besteht, können Sie den Rechner auch nutzen, um zusätzliche Automatisierungsfunktionen in den TibberLink-Adapter zu integrieren.
- Der Rechner arbeitet mit Kanälen, wobei jeder Kanal mit einem ausgewählten Zuhause verknüpft ist.
- Diese Kanäle können basierend auf entsprechenden Zuständen aktiviert oder deaktiviert werden.
– Diese Zustände sind als externe, dynamische Eingaben für TibberLink konzipiert und ermöglichen Ihnen beispielsweise, die Grenzkosten („TriggerPrice“) von einer externen Quelle aus anzupassen oder den Rechnerkanal („Active“) zu deaktivieren.
- Die Zustände eines Rechnerkanals werden neben den Home-Zuständen platziert und nach der Kanalnummer benannt. Dabei wird der im Admin-Bildschirm gewählte Kanalname hier angezeigt, um Ihre Konfigurationen besser identifizieren zu können.

  ![Rechnerzustände](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStates.png)

- Das Verhalten jedes Kanals wird durch seinen Typ bestimmt: „Beste Kosten (LTF)“, „Beste Einzelstunden (LTF)“, „Bester Stundenblock (LTF)“ oder „Smart Battery Buffer“.
- Jeder Kanal füllt einen oder zwei externe Zustände als Ausgabe aus, die auf der Registerkarte „Einstellungen“ ausgewählt werden müssen. Dieser Zustand könnte beispielsweise „0_userdata.0.example_state“ oder ein beliebiger anderer beschreibbarer externer Zustand sein.
- Wenn kein externer Ausgabezustand ausgewählt ist, wird ein interner Zustand innerhalb des Bereichs des Kanals erstellt.
- Die in den Ausgangszustand zu schreibenden Werte können in „Wert JA“ und „Wert NEIN“ definiert werden, z.B. „true“ für boolesche Zustände oder eine zu schreibende Zahl bzw. ein zu schreibender Text.
- Ausgänge:
- „Beste Kosten“: Verwendet den Status „TriggerPrice“ als Eingabe und erzeugt stündlich eine „JA“-Ausgabe, wenn die aktuellen Tibber-Energiekosten unter dem Triggerpreis liegen.
- „Beste Einzelstunden“: Generiert eine „JA“-Ausgabe während der günstigsten Stunden mit der im Status „AmountHours“ definierten Anzahl.
- „Bester Stundenblock“: Gibt „JA“ während des kostengünstigsten Stundenblocks mit der im Status „AmountHours“ angegebenen Stundenanzahl aus.

Zusätzlich werden die durchschnittlichen Gesamtkosten im ermittelten Block in einen Status „AverageTotalCost“ in der Nähe der Eingangszustände dieses Kanals geschrieben. Außerdem werden Start- und Endstunde des Blocks als Ergebnis der Berechnung in „BlockStartFullHour“ und „BlockEndFullHour“ geschrieben.

- „Best cost LTF“: „Beste Kosten“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Beste Einzelstunden LTF“: „Beste Einzelstunden“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Beststundenblock LTF“: „Beststundenblock“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Smart Battery Buffer“: Verwenden Sie den Parameter „EfficiencyLoss“, um den Effizienzverlust des Batteriesystems anzugeben. Der Parameter „EfficiencyLoss“ kann zwischen 0 und 1 liegen, wobei 0 keinen Effizienzverlust und 1 einen vollständigen Effizienzverlust darstellt. Ein Wert von 0,25 bedeutet beispielsweise einen Effizienzverlust von 25 % für einen Lade-/Entladezyklus.

Geben Sie mit dem Parameter „AmountHours“ die gewünschte Stundenzahl für die Batterieladung ein. Der Rechner wird während der angegebenen „AmountHours“-Preisgünstigsten Stunden die Batterieladung aktivieren („Wert JA“) und die Batteriespeisung deaktivieren („Wert 2 NEIN“). Umgekehrt wird er während der Stunden mit den höchsten Kosten die Batterieladung deaktivieren („Wert NEIN“) und die Batteriespeisung aktivieren („Wert 2 JA“), sofern diese Kosten höher sind als der höchste Gesamtpreis der Preisgünstigen Stunden. In den übrigen Normalstunden, in denen eine Energiepufferung durch die Batterie nicht wirtschaftlich ist, werden beide Ausgänge abgeschaltet.

- LTF-Kanäle: Diese funktionieren ähnlich wie Standardkanäle, sind jedoch nur innerhalb eines Zeitrahmens aktiv, der durch die Statusobjekte „StartTime“ und „StopTime“ definiert ist. Nach „StopTime“ wird der Kanal automatisch deaktiviert. „StartTime“ und „StopTime“ können sich über zwei Kalendertage erstrecken, da Tibber keine Daten über ein 48-Stunden-Fenster hinaus bereitstellt. Beide Zustände erfordern eine Datums-/Uhrzeitzeichenfolge im ISO-8601-Format mit einem Zeitzonenoffset, z. B. „2024-12-24T18:00:00.000+01:00“. Darüber hinaus verfügen die LTF-Kanäle über einen neuen Statusparameter namens „RepeatDays“, der standardmäßig auf 0 gesetzt ist. Wenn „RepeatDays“ auf eine positive Ganzzahl gesetzt ist, wiederholt der Kanal seinen Zyklus, indem er sowohl „StartTime“ als auch „StopTime“ um die angegebene Anzahl von Tagen erhöht, nachdem „StopTime“ erreicht wurde. Setzen Sie „RepeatDays“ beispielsweise für eine tägliche Wiederholung auf 1.

### Hinweise
#### Inverse Verwendung
Um beispielsweise Spitzenzeiten statt Optimalzeiten zu erhalten, vertauschen Sie einfach Verwendung und Parameter: ![Rechner für inverse Zustände](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStatesInverse.png) Durch Vertauschen von true <-> false erhalten Sie in der ersten Zeile ein True bei geringen Kosten und in der zweiten Zeile ein True bei hohen Kosten (Kanalnamen sind keine Auslöser und weiterhin frei wählbar).

Achtung: Für einzelne Spitzenstunden, wie im Beispiel, müssen Sie auch die Stundenanzahl anpassen. Original: 5 -> Invers (24-5) = 19 -> Sie erhalten ein wahres Ergebnis während der 5 Spitzenstunden.

#### LTF-Kanäle
Die Berechnung wird für „mehrtägige“ Daten durchgeführt. Da wir nur Informationen für „heute“ und „morgen“ haben (verfügbar ab ca. 13:00 Uhr), ist der Zeitrahmen effektiv auf maximal 35 Stunden begrenzt. Es ist jedoch wichtig, dieses Verhalten zu beachten, da sich das berechnete Ergebnis gegen 13:00 Uhr ändern kann/wird, wenn neue Daten für die Preise von morgen verfügbar werden.

Um diese dynamische Änderung des Zeitrahmens für einen Standardkanal zu beobachten, können Sie sich für einen begrenzten Zeitrahmen (Limited Time Frame, LTF) entscheiden, der mehrere Jahre umfasst. Dies ist insbesondere für das Szenario „Best Single Hours LTF“ nützlich.

## Direkte lokale Abfrage der Pulsdaten
Damit es funktioniert, müssen Sie die Weboberfläche der Bridge so ändern, dass sie dauerhaft aktiviert bleibt.
marq24 hat hier für seine HomeAssistant-Integration hervorragend beschrieben, wie das geht:

https://github.com/marq24/ha-tibber-pulse-local

Wenn alles richtig funktioniert, werden die Zählerdaten alle 2 Sekunden in die ioBroker-Zustände geschrieben.

## Wachposten
Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden. Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 gestartet.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a> Wenn Ihnen dieses Projekt gefallen hat – oder Sie einfach nur großzügig sind –, denken Sie darüber nach, mir ein Bier auszugeben. Prost! :Bier:

## Changelog

### 4.0.0 (2024-12-08)

- (HombachC) BREAKING: dropped support for ioBroker.admin < 7.0.0 because of ioBroker Responsive Design Initiative (#544)
- (HombachC) redesigned admin tab for calculator
- (HombachC) optimize translations, added more tooltips
- (HombachC) fix repeated calculation of LTF channels (#593)
- (HombachC) added BlockStart / BlockEnd as date string (#516)
- (HombachC) throttle sentry messaging
- (HombachC) add prices yesterday (#600)

### 3.5.4 (2024-12-01)

- (HombachC) add warning when LTF stop time isn't same or next day and provide docu
- (HombachC) fix error in calculator channel 'best single hours' (#594)
- (HombachC) intruduce 'iobroker/eslint-config' (#591)
- (HombachC) performance optimizations
- (HombachC) dependency updates

### 3.5.3 (2024-11-23)

- (HombachC) fix edge case in output state setup and usage
- (HombachC) optimzed state subscription
- (HombachC) update deprecated state calls
- (HombachC) add await to delObjectAsync
- (HombachC) harmonize project tools
- (HombachC) dependency updates

### 3.5.2 (2024-10-30)

- (HombachC) add verification for YES/NO 2 values in calculator (#547)
- (HombachC) optimized responsive design (#544)
- (HombachC) migrate eslint to >9.x
- (HombachC) switch to ES2022 code
- (HombachC) adapted to new API constraints (#546)
- (HombachC) replace deprecated setStateAsync by setState

### 3.5.1 (2024-10-05)

- (HombachC) changed to less feed disconnection warnings in log (#445)
- (HombachC) fix error in output2 of smart battery buffer (#538)
- (HombachC) update deprecated state calls
- (HombachC) dependency updates

### 3.5.0 (2024-10-02)

- (HombachC) update adapter core
- (HombachC) fix error in SML decoder
- (HombachC) add 2 new SML scale factor codes (#535)
- (HombachC) dependency updates

### 3.4.10 (2024-09-16)

- (HombachC) add verification of poll interval (#518)
- (HombachC) bumb date-fns to 4.0.0

### 3.4.9 (2024-09-15)

- (HombachC) add adjustable Bridge poll intervall (#518)
- (HombachC) add node.js 22 to the adapter testing (#519)
- (HombachC) add docu link to config screen (#504)
- (HombachC) repository cleanup
- (HombachC) dependency updates

### 3.4.8 (2024-08-16)

- (HombachC) updated axios because of vulnerability
- (HombachC) added tests for Node.js 22

### 3.4.7 (2024-08-10)

- (HombachC) adapter checker detected optimizations (#493)
- (HombachC) improved error message (#490)

### 3.4.6 (2024-08-07)

- (HombachC) Catch wrong OBIS Codes, probably caused by Pulse communication errors
- (HombachC) code cleanup

### 3.4.5 (2024-07-31)

- (HombachC) decode meter mode 4 for local Tipper Pulse poll (#477)
- (HombachC) decode meter mode 1 for local Tipper Pulse poll (#478)
- (HombachC) fixed wrong Pulse local status names (voltage)
- (HombachC) add docu on local Pulse poll config screen (#479)
- (HombachC) code cleanup
- (HombachC) bump dependencies

### 3.4.4 (2024-07-28)

- (HombachC) local poll of data - change units Wh to kWh and round to 0,1kWh (#469)

### 3.4.3 (2024-07-14)

- (HombachC) added unit to Pulse temperature and round to 0,1°C
- (HombachC) added unit to Pulse battery voltage and round to 100mV
- (HombachC) added unit to Pulse uptime
- (HombachC) added state with Pulse uptime as human readable string
- (HombachC) reinitialize some TibberLocal states upon adapter startup
- (HombachC) code optimisation
- (HombachC) bump dependencies

### 3.4.2 (2024-07-13)

- (HombachC) fix typos in units
- (HombachC) fix type mismatch for state objects (#455)
- (HombachC) code optimisation

### 3.4.1 (2024-07-13)

- (HombachC) fix logging error
- (HombachC) bump dependencies

### 3.4.0 (2024-07-12)

- (HombachC) add mode for local poll of Pulse data (#201)

### 3.3.3 (2024-07-04)

- (HombachC) fix sentry notified possible error
- (HombachC) try to fix startup error (#444)

### 3.3.2 (2024-06-21)

- (HombachC) fix 2 security issues in dependencies
- (HombachC) fix sentry notified possible error

### 3.3.1 (2024-06-13)

- (HombachC) fix small sentry discovered error (#418)
- (HombachC) added note for multihomes to documentation (#422)

### 3.3.0 (2024-06-05)

- (HombachC) implements optional, obsolete api call for total historical cost, incl. grid fees (#405)
- (HombachC) Updates @iobroker/adapter-core from 3.1.6
- (HombachC) Updates @iobroker/types from 5.0.19 to 6.0.0

### 3.2.1 (2024-06-03)

- (HombachC) added unique endpoint string

### 3.2.0 (2024-06-03)

- (HombachC) IMPORTANT: adapter components had been blocked by Tibber - you have to update!
- (HombachC) bump base dependencies
- (HombachC) adapter will use internal output states for calculator if none defined in configuration (#325)
- (HombachC) implement first run mode in calculator to reduce system load
- (HombachC) internal optimisations

### 3.1.2 (2024-05-20)

- (HombachC) deleting unused temp home objects after adapter config (#393)
- (HombachC) bump dependencies

### 3.1.1 (2024-05-16)

- (HombachC) throttle down reconnection speed
- (HombachC) logging optimizations (#396; #217)
- (HombachC) adaptations to newer environment (#394; #395)

### 3.1.0 (2024-05-07)

- (HombachC) enable manual control of configured outputs when automation is deactivated (#334)
- (HombachC) fix not working LTF Channel when using too short LTF (#383)
- (HombachC) code optimisations
- (HombachC) update adapter-core to 3.1.4
- (HombachC) bump dependencies

### 3.0.1 (2024-04-20)

- (HombachC) updated adapter testing
- (HombachC) bump dependencies

### 3.0.0 (2024-04-15)

- (HombachC) BREAKING: dropped support for node.js 16 (#368)
- (HombachC) BREAKING: js-controller >= 5 is required
- (HombachC) changed to tier 2 as data provider
- (HombachC) corrected io-package.json according to new schema (#368)
- (HombachC) update typescript to 5.4.5
- (HombachC) update adapter-core to 3.0.6

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2024 C.Hombach <TibberLink@homba.ch>