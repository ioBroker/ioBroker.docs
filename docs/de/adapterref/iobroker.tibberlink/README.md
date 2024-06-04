---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: UJTyxv3/U2FZDXcrTx0stOwqK2a3AhYvg4MzxP/J+h8=
---
![Logo](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Letztes GitHub-Commit](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=main&logo=github&style=flat-square)
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
Dieser Adapter erleichtert die Verbindung von Daten aus der API Ihres Tibber-Kontos zur Verwendung innerhalb von ioBroker, unabhängig davon, ob es sich um ein einzelnes Haus oder mehrere Wohnsitze handelt.

Wenn Sie derzeit kein Tibber-Benutzer sind, würde ich es sehr schätzen, wenn Sie meinen Empfehlungslink verwenden könnten: [Tibber-Empfehlungslink](https://invite.tibber.com/mu8c82n5).

## Standardkonfiguration
- Beginnen Sie mit der Erstellung einer neuen Instanz des Adapters.
- Sie benötigen außerdem ein API-Token von Tibber, das Sie hier erhalten: [Tibber Developer API](https://developer.tibber.com).
- Tragen Sie in den Standardeinstellungen Ihren Tibber-API-Token ein und konfigurieren Sie mindestens eine Zeile für die Live-Feed-Einstellungen (wählen Sie „Keine verfügbar“).
- Speichern Sie die Einstellungen und beenden Sie die Konfiguration, um den Adapter neu zu starten. Dieser Schritt ermöglicht die erste Abfrage Ihres/Ihrer Zuhauses vom Tibber-Server.
- Kehren Sie zum Konfigurationsbildschirm zurück und wählen Sie die Häuser aus, von denen Sie mit Ihrem Tibber Pulse Echtzeitdaten abrufen möchten. Sie können auch Häuser auswählen und den Feed deaktivieren (Hinweis: Dies funktioniert nur, wenn die Hardware installiert ist und der Tibber-Server die Verbindung zu Pulse überprüft hat).
- Sie haben die Möglichkeit, den Abruf der Preisdaten für heute und morgen zu deaktivieren, wenn Sie beispielsweise nur Pulse-Live-Feeds nutzen möchten
- Optional können Sie den Abruf historischer Verbrauchsdaten aktivieren. Geben Sie hierfür die Anzahl der Datensätze für Stunden, Tage, Wochen, Monate und Jahre an. Mit „0“ können Sie ein oder mehrere dieser Intervalle nach Ihren Wünschen deaktivieren.
- Hinweis: Es ist wichtig, auf die Größe des Datensatzes zu achten, da übermäßig große Anfragen zu einer fehlenden Antwort vom Tibber-Server führen können. Wir empfehlen, mit der Datensatzgröße zu experimentieren, um eine optimale Funktionalität sicherzustellen. Durch Anpassen der Intervalle und Datensatznummern können Sie das richtige Gleichgewicht zwischen dem Erhalt aufschlussreicher Daten und der Aufrechterhaltung der Serverreaktionsfähigkeit finden. Beispielsweise ist 48 eine recht gute Anzahl an Stunden.
- Speichern Sie die Einstellungen.

## Rechnerkonfiguration
– Da die Tibber-Verbindung nun besteht, können Sie den Rechner auch nutzen, um zusätzliche Automatisierungsfunktionen in den TibberLink-Adapter zu integrieren.
- Der Rechner arbeitet mit Kanälen, wobei jeder Kanal mit einem ausgewählten Zuhause verknüpft ist.
- Diese Kanäle können basierend auf entsprechenden Zuständen aktiviert oder deaktiviert werden.
- Diese Zustände sind als externe, dynamische Eingaben für TibberLink konzipiert und ermöglichen Ihnen beispielsweise, die Grenzkosten („TriggerPrice“) von einer externen Quelle aus anzupassen oder den Rechnerkanal („Active“) zu deaktivieren.
- Die Zustände eines Rechnerkanals werden neben den Home-Zuständen platziert und nach der Kanalnummer benannt. Dabei wird der im Admin-Bildschirm gewählte Kanalname hier angezeigt, um Ihre Konfigurationen besser identifizieren zu können.

    ![Rechnerzustände](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStates.png)

- Das Verhalten jedes Kanals wird durch seinen Typ bestimmt: „Best Cost (LTF)“, „Best Single Hours (LTF)“, „Best Hours Block (LTF)“ oder „Smart Battery Buffer“.
- Jeder Kanal füllt einen oder zwei externe Zustände als Ausgabe aus, die auf der Registerkarte „Einstellungen“ ausgewählt werden müssen. Dieser Zustand könnte beispielsweise „0_userdata.0.example_state“ oder ein anderer beschreibbarer externer Zustand sein.
- Wenn kein externer Ausgabezustand ausgewählt ist, wird ein interner Zustand innerhalb des Bereichs des Kanals erstellt.
- Die in den Ausgangszustand zu schreibenden Werte können in „Wert JA“ und „Wert NEIN“ definiert werden, z.B. „true“ für boolesche Zustände oder eine zu schreibende Zahl bzw. ein zu schreibender Text.
- Ausgänge:
- „Beste Kosten“: Verwendet den Status „TriggerPrice“ als Eingabe und erzeugt stündlich eine „JA“-Ausgabe, wenn die aktuellen Tibber-Energiekosten unter dem Triggerpreis liegen.
- „Beste Einzelstunden“: Generiert eine „JA“-Ausgabe während der günstigsten Stunden mit der im Status „AmountHours“ definierten Anzahl.
- „Bester Stundenblock“: Gibt „JA“ während des kostengünstigsten Stundenblocks mit der im Status „AmountHours“ angegebenen Stundenanzahl aus.

Zusätzlich werden die durchschnittlichen Gesamtkosten im ermittelten Block in einen Status „AverageTotalCost“ in der Nähe der Eingangszustände dieses Kanals geschrieben. Außerdem werden Start- und Endstunde des Blocks als Ergebnis der Berechnung in „BlockStartFullHour“ und „BlockEndFullHour“ geschrieben.

- „Best cost LTF“: „Beste Kosten“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Beste Einzelstunden LTF“: „Beste Einzelstunden“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Best hours block LTF“: „Best hours block“ innerhalb eines begrenzten Zeitrahmens (LTF).
- „Smart Battery Buffer“: Verwenden Sie den Parameter „EfficiencyLoss“, um den Effizienzverlust des Batteriesystems anzugeben. Der Parameter „EfficiencyLoss“ kann zwischen 0 und 1 liegen, wobei 0 keinen Effizienzverlust und 1 einen vollständigen Effizienzverlust darstellt. Ein Wert von 0,25 bedeutet beispielsweise einen Effizienzverlust von 25 % für einen Lade-/Entladezyklus.

Geben Sie mit dem Parameter „AmountHours“ die gewünschte Stundenzahl für die Batterieladung ein. Der Rechner wird während der angegebenen „AmountHours“-Preisgünstigsten Stunden die Batterieladung aktivieren („Wert JA“) und die Batteriespeisung deaktivieren („Wert 2 NEIN“). Umgekehrt wird er während der Stunden mit den höchsten Kosten die Batterieladung deaktivieren („Wert NEIN“) und die Batteriespeisung aktivieren („Wert 2 JA“), sofern diese Kosten höher sind als der höchste Gesamtpreis der Preisgünstigen Stunden. In den übrigen Normalstunden, in denen eine Energiepufferung durch die Batterie nicht wirtschaftlich ist, werden beide Ausgänge abgeschaltet.

- LTF-Kanäle: Funktionieren ähnlich wie Standardkanäle, arbeiten jedoch nur innerhalb eines Zeitrahmens, der durch die Statusobjekte „StartTime“ und „StopTime“ definiert ist. Nach „StopTime“ deaktiviert sich der Kanal selbst. „StartTime“ und „StopTime“ können sich über mehrere Tage erstrecken. Die Status müssen mit einer Datums-/Uhrzeitzeichenfolge im ISO-8601-Format mit einem Zeitzonenoffset gefüllt werden, z. B.: „2024-01-17T21:00:00.000+01:00“. Darüber hinaus verfügen die Kanäle über einen neuen Statusparameter namens „RepeatDays“, der standardmäßig auf 0 gesetzt ist. Wenn „RepeatDays“ auf einen positiven ganzzahligen Wert gesetzt ist, wiederholt der Kanal seinen Zyklus, indem er sowohl StartTime als auch StopTime um die in „RepeatDays“ angegebene Anzahl von Tagen erhöht, sobald StopTime erreicht ist. Setzen Sie beispielsweise für eine tägliche Wiederholung „RepeatDays“ auf 1.“

### Hinweise
#### Inverse Verwendung
Um beispielsweise Spitzenzeiten statt Optimalzeiten zu erhalten, vertauschen Sie einfach Verwendung und Parameter: ![Rechner für inverse Zustände](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStatesInverse.png) Durch Vertauschen von true <-> false erhalten Sie in der ersten Zeile ein True bei geringen Kosten und in der zweiten Zeile ein True bei hohen Kosten (Kanalnamen sind keine Auslöser und weiterhin frei wählbar).

Achtung: Für einzelne Spitzenstunden, wie im Beispiel, müssen Sie auch die Stundenanzahl anpassen. Original: 5 -> Invers (24-5) = 19 -> Sie erhalten ein wahres Ergebnis während der 5 Spitzenstunden.

#### LTF-Kanäle
Die Berechnung wird für „mehrtägige“ Daten durchgeführt. Da wir nur Informationen für „heute“ und „morgen“ haben (verfügbar ab ca. 13:00 Uhr), ist der Zeitrahmen effektiv auf maximal 35 Stunden begrenzt. Es ist jedoch wichtig, dieses Verhalten zu beachten, da sich das berechnete Ergebnis gegen 13:00 Uhr ändern kann/wird, wenn neue Daten für die Preise von morgen verfügbar werden.

Um diese dynamische Änderung des Zeitrahmens für einen Standardkanal zu beobachten, können Sie sich für einen begrenzten Zeitrahmen (Limited Time Frame, LTF) entscheiden, der mehrere Jahre umfasst. Dies ist insbesondere für das Szenario „Best Single Hours LTF“ nützlich.

## Wachposten
Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden. Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 gestartet.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a> Wenn Ihnen dieses Projekt gefallen hat – oder Sie einfach nur großzügig sind –, denken Sie darüber nach, mir ein Bier auszugeben. Prost! :Bier:

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 3.2.1 (2024-06-03)

-   (HombachC) added unique endpoint string

### 3.2.0 (2024-06-03)

-   (HombachC) IMPORTANT: adapter components had been blocked by Tibber - you have to update!
-   (HombachC) bump base dependencies
-   (HombachC) adapter will use internal output states for calculator if none defined in configuration (#325)
-   (HombachC) implement first run mode in calculator to reduce system load
-   (HombachC) internal optimisations

### 3.1.2 (2024-05-20)

-   (HombachC) deleting unused temp home objects after adapter config (#393)
-   (HombachC) bump dependencies

### 3.1.1 (2024-05-16)

-   (HombachC) throttle down reconnection speed
-   (HombachC) logging optimizations (#396; #217)
-   (HombachC) adaptations to newer environment (#394; #395)

### 3.1.0 (2024-05-07)

-   (HombachC) enable manual control of configured outputs when automation is deactivated (#334)
-   (HombachC) fix not working LTF Channel when using too short LTF (#383)
-   (HombachC) code optimisations
-   (HombachC) update adapter-core to 3.1.4
-   (HombachC) bump dependencies

### 3.0.1 (2024-04-20)

-   (HombachC) updated adapter testing
-   (HombachC) bump dependencies

### 3.0.0 (2024-04-15)

-   (HombachC) BREAKING: dropped support for node.js 16 (#368)
-   (HombachC) BREAKING: js-controller >= 5 is required
-   (HombachC) changed to tier 2 as data provider
-   (HombachC) corrected io-package.json according to new schema (#368)
-   (HombachC) update typescript to 5.4.5
-   (HombachC) update adapter-core to 3.0.6

### 2.3.2 (2024-03-17)

-   (HombachC) code optimizations
-   (HombachC) fix undefined force mode (#349)
-   (HombachC) fix poll of not existing current price state (#348)
-   (HombachC) fix current price poll when configured as not to poll (#350)
-   (HombachC) bump dependencies

### 2.3.1 (2024-03-10)

-   (HombachC) BREAKING: Calculator channels of type 'smart battery buffer' will now switch outputs to 'OFF' only once, directly after setting the channel to Active=false (#332)
-   (HombachC) Fixed error in jsonConfig.json (#329)
-   (HombachC) deleted feed disconnect debug-message, cause warn message already exists
-   (HombachC) bump typescript-eslint to gen 7
-   (HombachC) bump dependencies

### 2.2.2 (2024-02-19)

-   (HombachC) simplify internal state handling
-   (HombachC) shorten home string in Calculator screen (#317)
-   (HombachC) fix feedback loop trap (#321)
-   (HombachC) add some tooltips to config screen (#317)

### 2.2.1 (2024-02-08)

-   (HombachC) fix edge case problems with defect feed data from Tibber server (#312)
-   (HombachC) bump dependencies

### 2.2.0 (2024-02-04)

-   (HombachC) add data points for BestHoursBlock results - period and average cost (#240)
-   (HombachC) fixed wrong error message texts
-   (HombachC) fix some possible edge cases in internal support functions
-   (HombachC) internal code docu optimization
-   (HombachC) bump dependencies

### 2.1.1 (2024-01-27)

-   (HombachC) fix reconnect error for Pulse feed (#300)
-   (HombachC) new error message handler
-   (HombachC) internal code docu optimization

### 2.1.0 (2024-01-21)

-   (HombachC) add repeatablity for LTF channels (#289)
-   (HombachC) tweak Smart Battery Buffer documentation

### 2.0.1 (2024-01-15)

-   (HombachC) modify timing in Tibber Pulse feed connect (#271)
-   (HombachC) bump dependencies

### 2.0.0 (2023-12-23)

-   (HombachC) BREAKING: dropped support for js-controller 3.x (#247)
-   (HombachC) diversificate Tibber server polls to prevent potential DDoS reactions (#252)
-   (HombachC) add data point for averageRemaining of todays prices (#254)
-   (HombachC) add 2 data points for last successfull update of today and tomorrow prices (#261)
-   (HombachC) year 2024 changes
-   (HombachC) fix small error in dynamic feed timing
-   (HombachC) bump dependencies

### 1.8.1 (2023-12-16)

-   (HombachC) add notice about changes in configuration

### 1.8.0 (2023-12-14)

-   (HombachC) implement optional disable of price pull (#232)
-   (HombachC) implement price categorization algorithm for battery buffer applications (#193)
-   (HombachC) Fix 2 errors in pull of prices tomorrow (#235, #232)
-   (HombachC) changed Tibber link in config

### 1.7.2 (2023-12-07)

-   (HombachC) implemented dynamic raise of feed reconnect (#225)
-   (HombachC) small bugfix in pricecalls
-   (HombachC) first changes for "smart battery buffer" (#193)
-   (HombachC) update typescript to 5.3.3

### 1.7.1 (2023-12-04)

-   (HombachC) added hint for consumption data in documentation (#223)
-   (HombachC) mitigate error handling (#217)
-   (HombachC) added description to object Features/RealTimeConsumptionEnabled (#224)
-   (HombachC) bump dependencies

### 1.7.0 (2023-11-30)

-   (HombachC) implement getting historical consumption data from Tibber Server (#163)
-   (HombachC) fix error in adapter unload
-   (HombachC) some code optimisations

### 1.6.1 (2023-11-26)

-   (HombachC) cleanup in documentation and translation handling

### 1.6.0 (2023-11-26)

-   (HombachC) fixed major bug in 1.5.0, not working calculator channels (#212)
-   (HombachC) implement limit calculations to a time frame (#153)
-   (HombachC) fix error of missing price data upon not working tibber server connect at adapter start (#204)
-   (HombachC) fixed possible error with wrong price date in multi home systems
-   (HombachC) fixed possible type error, notified by Sentry
-   (HombachC) added some documentation for inverse use of channels (#202)
-   (HombachC) added Sentry statistics
-   (HombachC) optimize translation handling
-   (HombachC) bump dependencies

### 1.5.0 (2023-11-13)

-   (HombachC) implement calculator channel names (#186)
-   (HombachC) fix error in cron jobs (#190)
-   (HombachC) remove not used calculator channel state objects (#188)
-   (HombachC) code optimizations
-   (HombachC) optimize translation handling

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2024 C.Hombach <TibberLink@homba.ch>