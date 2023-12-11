---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: nUITyfaJ1JciSKN/BtOiq+FF1qC4vwhuzmTUYhou3js=
---
![Logo](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![SNYK Bekannte Sicherheitslücken](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/tibberlink-stable.svg)
![Eingerichtet](https://iobroker.live/badges/tibberlink-installed.svg)
![NPM](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# IoBroker.tibberlink
[![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)

## Versionen
## Adapter zur Nutzung von TIBBER-Energiedaten in ioBroker
Dieser Adapter erleichtert die Verbindung von Daten aus der API Ihres Tibber-Kontos zur Verwendung in ioBroker, sei es für ein einzelnes Zuhause oder mehrere Residenzen.

Wenn Sie derzeit kein Tibber-Benutzer sind, würde ich mich sehr freuen, wenn Sie meinen Empfehlungslink verwenden könnten: [Tibber-Empfehlungslink](https://invite.tibber.com/mu8c82n5).

## Standardkonfiguration
- Beginnen Sie mit der Erstellung einer neuen Instanz des Adapters.
– Sie benötigen außerdem ein API-Token von Tibber, das Sie hier erhalten können: [Tibber Developer API](https://developer.tibber.com).
- Geben Sie in den Standardeinstellungen Ihr Tibber-API-Token ein und konfigurieren Sie mindestens eine Zeile für Live-Feed-Einstellungen (wählen Sie „Keine verfügbar“).
- Speichern Sie die Einstellungen und verlassen Sie die Konfiguration, um den Adapter neu zu starten. Mit diesem Schritt können Ihre Häuser zum ersten Mal vom Tibber-Server abgefragt werden.
- Kehren Sie zum Konfigurationsbildschirm zurück und wählen Sie die Häuser aus, von denen Sie Echtzeitdaten mit Ihrem Tibber Pulse abrufen möchten. Sie können auch Häuser auswählen und den Feed deaktivieren (Hinweis: Dies funktioniert nur, wenn die Hardware installiert ist und der Tibber-Server die Verbindung zu Pulse überprüft hat).
- Sie haben die Möglichkeit, den Abruf der Preisdaten für heute und morgen zu deaktivieren, wenn Sie beispielsweise nur Pulse-Live-Feeds nutzen möchten
- Optional können Sie den Abruf historischer Verbrauchsdaten aktivieren. Bitte geben Sie die Anzahl der Datensätze für Stunden, Tage, Wochen, Monate und Jahre an. Mit „0“ können Sie je nach Wunsch eines oder mehrere dieser Intervalle deaktivieren.
- Hinweis: Es ist wichtig, auf die Größe des Datensatzes zu achten, da zu große Anfragen dazu führen können, dass der Tibber-Server nicht antwortet. Wir empfehlen, mit der Datensatzgröße zu experimentieren, um eine optimale Funktionalität sicherzustellen. Das Anpassen der Intervalle und Datensatzzahlen kann dabei helfen, das richtige Gleichgewicht zwischen der Gewinnung aufschlussreicher Daten und der Aufrechterhaltung der Serverreaktionsfähigkeit zu finden. Z.B. 48 ist eine recht gute Menge für Stunden.
- Speichern Sie die Einstellungen.

## Rechnerkonfiguration
– Nachdem die Tibber-Verbindung nun eingerichtet ist und läuft, können Sie den Rechner auch nutzen, um zusätzliche Automatisierungsfunktionen in den TibberLink-Adapter zu integrieren.
- Der Rechner arbeitet mit Kanälen, wobei jeder Kanal mit einem ausgewählten Haus verknüpft ist.
- Diese Kanäle können basierend auf entsprechenden Zuständen aktiviert oder deaktiviert werden.
– Diese Zustände dienen als externe, dynamische Eingaben für TibberLink und ermöglichen Ihnen beispielsweise die Anpassung der Grenzkosten („TriggerPrice“) aus einer externen Quelle oder die Deaktivierung des Rechnerkanals („Active“).
- Die Zustände eines Rechnerkanals werden neben den Heimatzuständen positioniert und entsprechend der Kanalnummer benannt. Hiermit wird der im Admin-Bildschirm gewählte Kanalname angezeigt, um Ihre Konfigurationen besser identifizieren zu können.

    ![Rechnerzustände](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStates.png)

- Das Verhalten jedes Kanals wird durch seinen Typ bestimmt: „Bester Preis“, „Beste Einzelstunden“ oder „Bester Stundenblock“.
- Jeder Kanal füllt einen externen Zustand als Ausgang, der im Reiter „Einstellungen“ ausgewählt werden muss. Dieser Status könnte beispielsweise „0_userdata.0.example_state“ oder ein anderer beschreibbarer externer Status sein.
- Die in den Ausgabezustand zu schreibenden Werte können in „Wert JA“ und „Wert NEIN“ definiert werden, z. B. „wahr“ für boolesche Zustände oder eine zu schreibende Zahl oder ein zu schreibender Text.
- Ausgänge:
    - „Beste Kosten“: Verwendet den Status „TriggerPrice“ als Eingabe und erzeugt jede Stunde eine „JA“-Ausgabe, wenn die aktuellen Tibber-Energiekosten unter dem Triggerpreis liegen.
    - „Beste einzelne Stunden“: Erzeugt während der günstigsten Stunden eine „JA“-Ausgabe, wobei die im Status „AmountHours“ definierte Anzahl angegeben wird.
    - „Bester Stundenblock“: Gibt „JA“ während des kostengünstigsten Stundenblocks aus, mit der im Status „AmountHours“ angegebenen Stundenanzahl.
    - „Best cost LTF“: „Best cost“ innerhalb eines begrenzten Zeitrahmens (LTF).
    - „Beste Einzelstunden LTF“: „Beste Einzelstunden“ innerhalb eines begrenzten Zeitrahmens (LTF).
    - „Beste Stunden Block LTF“: „Beste Stunden Block“ innerhalb eines begrenzten Zeitrahmens (LTF).
    - „Smart Battery Buffer“: Noch nicht implementiert
- LTF-Kanäle: Funktionieren ähnlich wie Standardkanäle, arbeiten jedoch nur innerhalb eines durch die Statusobjekte „StartTime“ und „StopTime“ definierten Zeitrahmens. Nach „StopTime“ deaktiviert sich der Kanal. „StartTime“ und „StopTime“ können sich über mehrere Tage erstrecken. Die Bundesstaaten müssen mit einer Datums-/Uhrzeitzeichenfolge im ISO-8601-Format mit Zeitzonenversatz gefüllt sein, z. B.: „2023-11-17T21:00:00.000+01:00“.

### Hinweise
#### Umgekehrte Verwendung:
Um beispielsweise Spitzenzeiten statt optimaler Stunden zu erhalten, kehren Sie einfach die Verwendung und die Parameter um: ![Rechnerzustände invers](../../../en/adapterref/iobroker.tibberlink/docu/calculatorStatesInverse.png) Durch den Vertausch von true <-> false erhalten Sie in der ersten Zeile ein true zu geringen Kosten und ein true at ein hoher Aufwand in der zweiten Zeile (Kanalnamen sind keine Auslöser und dennoch frei wählbar).

Achtung: Für einzelne Spitzenzeiten, wie im Beispiel, müssen Sie auch die Stundenzahl anpassen. Original: 5 -> Invers (24-5) = 19 -> Sie erhalten während der 5 Spitzenstunden ein echtes Ergebnis.

#### LTF-Kanäle:
Die Berechnung wird für „mehrtägige“ Daten durchgeführt. Da uns nur Informationen für „heute“ und „morgen“ vorliegen (verfügbar ab ca. 13:00 Uhr), ist der Zeitumfang effektiv auf maximal 35 Stunden begrenzt. Es ist jedoch wichtig, dieses Verhalten im Auge zu behalten, da sich das berechnete Ergebnis gegen 13:00 Uhr ändern kann/wird, wenn neue Daten für die morgigen Preise verfügbar werden.

Um diese dynamische Änderung des Zeitrahmens für einen Standardkanal zu beobachten, können Sie sich für einen Limited Time Frame (LTF) entscheiden, der sich über mehrere Jahre erstreckt. Dies ist besonders nützlich für das Szenario „Beste einzelne Stunden LTF“.

## Anmerkungen
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in den [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Reporting wird ab js-controller 3.0 initiiert.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a> Wenn Ihnen dieses Projekt gefallen hat – oder Sie sich einfach großzügig fühlen, denken Sie darüber nach, mir ein Bier zu spendieren. Prost! :Biere:

## Changelog

! Note that missing version entries are typically dependency updates for improved security.

### 1.8.0 (2023-12-xx) WORK IN PROGRESS

-   (HombachC) implement optional disable of price pull (#232)
-   (HombachC) WiP!!! implement (#193)
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

### 1.4.3 (2023-11-08)

-   (HombachC) fix possible type error in first calculator calls notified by Sentry
-   (HombachC) change state object description of production values (#167)
-   (HombachC) optimize pulse feed error message in case of error as object (#176)
-   (HombachC) preparations for calculator object names (#186)
-   (HombachC) bump dependencies

### 1.4.2 (2023-11-03)

-   (HombachC) complete rework of task scheduling for more precise pull timing (#149)
-   (HombachC) critical vulnerability fix for axios
-   (HombachC) fix debug message typos, code optimisations in calculator
-   (HombachC) fix type error in price average calculation notified by Sentry
-   (HombachC) fix error in update prices tomorrow - possible false positive

### 1.4.1 (2023-10-25)

-   (HombachC) implement forced update of all data after adapter restart (#155)
-   (HombachC) Bump actions/setup-node from 3.8.1 to 4.0.0 (#157)
-   (HombachC) remove node.js 16 actions - dependency updates

### 1.4.0 (2023-10-24)

-   (HombachC) implement min/max states (#131)
-   (HombachC) fix error with ignored calculator channel deaktivations (#143)
-   (HombachC) optimize translation handling, code cleanup

### 1.3.1 (2023-10-21)

-   (HombachC) fix initialisiation of channel states (#141)
-   (HombachC) change message "reconnect successful" to level info (#80)
-   (HombachC) documentation tweaks - dependency updates

### 1.3.0 (2023-10-20)

-   (HombachC) implement tibber calculator mode "best hours block" (#16)
-   (HombachC) handle empty calculator destination states - detected by sentry

### 1.2.0 (2023-10-18)

-   (HombachC) implement tibber calculator mode "best single hours" (#16)
-   (HombachC) changed i18n files to inline translations, single files aren't update compatible (#128)
-   (HombachC) fixed error in initial read of calculator states (#129)

### 1.1.2 (2023-10-15)

-   (HombachC) fix timing error in calculator

### 1.1.1 (2023-10-14)

-   (HombachC) fix error in startup of additional channels

### 1.1.0 (2023-10-14)

-   (HombachC) implement tibber calculator mode "best price" (#16)
-   (HombachC) precised pull times of current cost
-   (HombachC) reduced error messages (#80)
-   (HombachC) extend documentation
-   (HombachC) update adapter-core

### 1.0.0 (2023-10-05)

-   (HombachC) Increase to the first major release, as now a stable level is reached
-   (HombachC) Code cleanup

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023 Hombach <TibberLink@homba.ch>