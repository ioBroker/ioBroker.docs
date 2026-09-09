---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tibberlink/README.md
title: ioBroker.tibberlink
hash: Svl//FPnY7JwqrwC81EYj++vcRBHa+Px7XEUaWi4AcE=
---
![Logo](../../../en/adapterref/iobroker.tibberlink/admin/tibberlink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=master&logo=github&style=flat-square)
![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)
![Bekannte Schwachstellen von SNYK](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/tibberlink-stable.svg)
![Installiert](https://iobroker.live/badges/tibberlink-installed.svg)
![NPM](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)

# ioBroker.tibberlink

## Versionen

## Posten

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Informationen und Hinweise zum Deaktivieren der Fehlerberichterstattung finden Sie unter \[Link einfügen].<a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry"> Sentry-Plugin-Dokumentation</a> !

## Adapter zur Nutzung von Tibber-Energiedaten in ioBroker

Dieser Adapter verbindet die API-Daten Ihres Tibber-Kontos mit ioBroker, egal ob es sich um ein einzelnes Haus oder mehrere Wohneinheiten handelt. Er unterstützt außerdem das direkte lokale Auslesen des Tibber Pulse-Sensors über Ihr Heimnetzwerk und ermöglicht so Echtzeitüberwachung und Datenerfassung, ohne ausschließlich auf die Cloud-API angewiesen zu sein.

Falls Sie derzeit kein Tibber-Nutzer sind, würde ich mich sehr freuen, wenn Sie meinen Empfehlungslink verwenden könnten: [Tibber-Empfehlungslink](https://invite.tibber.com/mu8c82n5) .

## Dokumentation

- [Standardkonfiguration](#standard-configuration) – Ersteinrichtung, API-Token, Startseiten, historische Daten
- [Rechnerkonfiguration](/#/docs/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md) – preisbasierte Automatisierungskanäle & intelligenter Batteriepuffer
- [Konfiguration der Diagrammausgabe](/#/docs/adapterref/iobroker.tibberlink/docu/GraphOutput.md) – Visualisierung von Kursen mit E-Charts / FlexCharts
- [Fahrzeug- und Ladegerätekonfiguration](/#/docs/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md) – Tibber Data API-Einrichtung für Autos und Wallboxen
- [Direkte lokale Abfrage von Pulse-Daten](https://github.com/Hombach/ioBroker.tibberlink/blob/master/docu/LocalPulse.md) – lokales Auslesen der Pulse-Daten, unterstützte Zählermodi

## Standardkonfiguration

- Erstellen Sie zunächst eine neue Instanz des Adapters.
- Sie benötigen außerdem ein API-Token von Tibber, das Sie hier erhalten: [Tibber Developer API](https://developer.tibber.com) .
- Geben Sie Ihren Tibber-API-Token in den Standardeinstellungen ein und konfigurieren Sie mindestens eine Zeile für Live-Feed-Einstellungen (wählen Sie „Keine verfügbar“).
- Speichern Sie die Einstellungen und beenden Sie die Konfiguration, um den Adapter neu zu starten; dieser Schritt ermöglicht es, dass Ihre Home-Server zum ersten Mal vom Tibber-Server abgefragt werden.
- Kehren Sie zum Konfigurationsbildschirm zurück und wählen Sie die Haushalte aus, von denen Sie mit Ihrem Tibber Pulse Echtzeitdaten abrufen möchten. Sie können auch Haushalte auswählen und den Datenfeed deaktivieren (Hinweis: Dies funktioniert nur, wenn die Hardware installiert ist und der Tibber-Server die Verbindung zu Pulse bestätigt hat).
- Hinweis: Falls Sie in Ihrem Tibber-Konto mehrere Häuser haben, müssen Sie alle hinzufügen, um Fehlermeldungen durch möglicherweise unnötige Häuser zu vermeiden. Fügen Sie alle Häuser hinzu und deaktivieren Sie die nicht benötigten.
- Sie haben die Möglichkeit, den Abruf von Preisdaten für heute und morgen zu deaktivieren, beispielsweise wenn Sie nur den Pulse-Live-Feed nutzen möchten.
- Optional können Sie den Abruf historischer Verbrauchsdaten aktivieren. Bitte geben Sie die Anzahl der Datensätze für Stunden, Tage, Wochen, Monate und Jahre an. Sie können „0“ verwenden, um ein oder mehrere dieser Intervalle je nach Ihren Präferenzen zu deaktivieren.
- Hinweis: Die Größe des Datensatzes ist entscheidend, da zu große Anfragen dazu führen können, dass der Tibber-Server nicht antwortet. Wir empfehlen, mit der Datensatzgröße zu experimentieren, um eine optimale Funktionalität zu gewährleisten. Durch Anpassen der Intervalle und der Datensatzanzahl lässt sich ein optimales Gleichgewicht zwischen aussagekräftigen Daten und Serverleistung erzielen. Beispielsweise ist 48 ein empfohlener Wert für Stunden.
- Einstellungen speichern.

## Verbrauchsdatendokumentation

Wenn die tägliche historische Verbrauchsanzeige aktiviert ist, liefert der Adapter einen aggregierten Status für den aktuellen Monat:

- `Homes.<HOME-ID>.Consumption.currentMonthConsumption`

Dieser Wert entspricht dem Gesamtverbrauch für den aktuellen Kalendermonat.`kWh` Die Berechnung erfolgt anhand der von Tibber zurückgegebenen täglichen Verbrauchsdaten. Sind zu wenige Tage konfiguriert, spiegelt der Wert nur diese Anzahl an Tagen wider – nicht einen vollständigen Monat.

## Rechnerkonfiguration

Der Calculator bietet zusätzlich zur Tibber-Anbindung eine preisbasierte Automatisierung: Kanäle pro Haushalt, die externe Zustände basierend auf den günstigsten/teuersten Stunden, Preisschwellenwerten, besten Stundenblöcken, Prozentbereichen, begrenzten Zeitrahmen (LTF) und einem intelligenten Batteriepuffermodus umschalten.

📖 **Vollständige Anleitung: [docu/CalculatorConfiguration.md](/#/docs/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md)**

## Konfiguration der Grafikausgabe

Der Adapter hilft dabei, Preistrends und Rechnerergebnisse zu visualisieren – von einem einfachen JSON-basierten Ansatz über die Adapter „E-Charts“ / „FlexCharts“ bis hin zu einer vollständig individualisierten JavaScript-Lösung.

📖 **Vollständige Anleitung: [docu/GraphOutput.md](/#/docs/adapterref/iobroker.tibberlink/docu/GraphOutput.md)**

## Direkte lokale Umfrage zu Pulse-Daten

Der Adapter kann Tibber Pulse lokal über Ihr Heimnetzwerk (via Tibber Bridge) auslesen, anstatt sich ausschließlich auf den Cloud-Feed zu verlassen, und schreibt die Zählerdaten alle zwei Sekunden in ioBroker-Zustände. Sowohl binäre SML- als auch einfache OBIS-Textzähler werden unterstützt.

📖 **Vollständige Anleitung (Brückeneinrichtung, unterstützte Messmodi): [docu/LocalPulse.md](https://github.com/Hombach/ioBroker.tibberlink/blob/master/docu/LocalPulse.md)**

## Fahrzeug- und Ladegerätekonfiguration

Zusätzlich zum Haupt-API-Token kann der Adapter IoT-Gerätedaten (Fahrzeuge, Ladegeräte) von der separaten **Tibber Data API** lesen (`data-api.tibber.com` ), wofür eine eigene OAuth2-Clientregistrierung und einmalige Autorisierung erforderlich ist. Fahrzeugdaten werden geschrieben nach`Vehicles.<VIN>.*` , Ladedaten an`Chargers.<id>.*` Die

📖 **Vollständige Einrichtungsanleitung (Kundenregistrierung, Autorisierung, verfügbare Bundesstaaten): [docu/VehiclesAndChargers.md](/#/docs/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md)**

## Spenden

<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>\
&#x20;Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 7.2.3 (2026-08-29)

- (HombachC) fixed local Pulse boolean states (e.g. usb_power, autolevel_enable) being created as type number, causing recurring log errors (#935)
- (HombachC) SmartBatteryBuffer: EfficiencyLoss is now validated to the range 0…1; out-of-range values (e.g. 25 instead of 0.25) are clamped with a warning instead of corrupting the calculation, and the state now carries min/max/step (#934)
- (HombachC) updated dependencies

### 7.2.2 (2026-08-22)

- (HombachC) fixed local Pulse meter mode 5 (plain OBIS text, e.g. eBZ meters) not being parsed, leaving states frozen (#931)
- (HombachC) documented the supported Pulse meter modes (README + Info/PulseMeterModes.md)
- (HombachC) restructured the README: moved the Calculator, Graph Output, Local Pulse and Vehicles & Chargers guides into separate files under docu/
- (HombachC) updated dependencies

### 7.2.1 (2026-08-10)

- (HombachC) fixed charger devices with an empty externalId (e.g. Wallbox Pulsar Plus) producing an invalid state id; a single bad device no longer aborts the whole Data API poll (#925)
- (HombachC) projectUtils: use extendObject instead of setObject in forceMode so user customizations survive restarts (#927)
- (HombachC) projectUtils: fixed min/max/step value of 0 being dropped from number state definitions
- (HombachC) updated tibber-api to 5.6.0
- (HombachC) updated dependencies

### 7.2.0 (2026-07-30)

- (HombachC) added polling of charger/wallbox devices from the Tibber Data API, written to `Chargers.<id>.*` (#925)
- (HombachC) added a `LastSeen` state (device-reported last-seen timestamp) for vehicles and chargers

### 7.1.5 (2026-07-12)

- (HombachC) added a regression test confirming best single hours LTF no longer switches on the wrong day (#631)
- (HombachC) worked around a Tibber server bug that returns `to` equal to `from` in weekly historical consumption data (#890)
- (HombachC) removed redundant test devDependencies (chai, chai-as-promised, sinon-chai, proxyquire) and switched unit tests to Node's built-in assert

### Old Changes see [CHANGELOG OLD](https://github.com/Hombach/ioBroker.tibberlink/blob/master/CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2026 C.Hombach <TibberLink@homba.ch>