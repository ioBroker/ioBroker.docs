---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.go-e-charger/README.md
title: ioBroker.go-eCharger
hash: ye01FjJSX+juUaBBqJEERHk6cX7y96JK60ntBUWzK14=
---
![Logo](../../../en/adapterref/iobroker.go-e-charger/admin/go-eCharger.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.go-e-charger?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.go-e-charger?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.go-e-charger?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.go-e-charger?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.go-e-charger?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.go-e-charger?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.go-e-charger/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.go-e-charger?branch=master&svg=true)
![Bekannte Schwachstellen von SNYK](https://snyk.io/test/github/hombach/ioBroker.go-e-charger/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.go-e-charger.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/go-e-charger-stable.svg)
![Installiert](https://iobroker.live/badges/go-e-charger-installed.svg)
![NPM](https://nodei.co/npm/iobroker.go-e-charger.png?downloads=true)

# IoBroker.go-eCharger
[![CodeQL](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml)

## Versionen
## IoBroker-Adapter für go-e Charger EV-Wallboxen
Dieser Adapter integriert eine oder mehrere go-e Charger Wallboxen in Ihre ioBroker-Hausautomation. Er fragt jede Wallbox zyklisch über ihre lokale HTTP-API ab, stellt alle relevanten Daten gemäß den ioBroker-Statusmeldungen bereit und ermöglicht Ihnen die direkte Steuerung des Ladevorgangs von Ihrem Smart Home aus.

Weitere Informationen zur go-e Charger Hardware finden Sie auf der Website des Herstellers: [go-e GmbH](https://go-e.com).

### Merkmale
- unterstützt mehrere go-e Ladegeräte innerhalb einer einzigen Adapterinstanz
- Überwachung des Fahrzeugzustands, der Ladeleistung, des Ladestroms, der Netzphasen und der Energiestatistik
- **ChargeNOW** – Sofortiger Ladevorgang mit einstellbarem Strom
- **ChargeManager** – automatisches Laden von PV-Überschussstrom: Der Ladestrom wird kontinuierlich an die verfügbare Solarenergie angepasst und berücksichtigt dabei den Hausverbrauch sowie den Ladezustand Ihrer Heimbatterie. Das Laden Ihres Elektrofahrzeugs kann verzögert werden, bis die Heimbatterie einen konfigurierbaren Mindestladezustand erreicht hat.

**Hinweis:** Die PV-Überschussladung ist derzeit für die Steuerung eines einzelnen Ladegeräts ausgelegt. Wenn ChargeManager gleichzeitig auf mehreren Ladegeräten aktiviert ist, werden die Ladeströme nicht koordiniert, und die Berechnung des Solarüberschusses liefert falsche Werte. Eine Erweiterung mit koordiniertem Lastmanagement für mehrere Ladegeräte wird in Kürze verfügbar sein.

- Umschaltung zwischen 1-phasigem und 3-phasigem Laden (Hardwaregeneration 3 und neuer)
- Energiestatistik pro RFID-Karte (Kartenname, ID und geladene Energie)
- Nur-Lese-Modus pro Wallbox – Überwachung des Ladegeräts ohne **Senden** von Steuerbefehlen (keine Ladungsfreigabe, kein Ladestrom, keine Phasenumschaltung), z. B. wenn der Ladevorgang extern gesteuert oder der Zugriff über RFID-Tags verwaltet wird.

Getestet mit Firmware V033, V040.0, V041.0, V054.7, V054.11, V055.5, V055.7, V055.8, V56.1, V56.2, V56.8, V56.9, V56.11, V57.0, V57.1, V59.4, V60.0, V60.1, V60.2, V60.5, V60.6 und mit bis zu 3 parallel betriebenen Ladegeräten.

### Anforderungen
- Für Hardware der Generationen 3 und 4 müssen Sie "HTTP API v1" in Ihrer go-e-App aktivieren.
- Für die Phasenumschaltung müssen Sie zusätzlich "HTTP API v2" in Ihrer go-e App aktivieren (Hardwaregeneration 3 und neuer).

## Konfiguration
Fügen Sie für jedes go-e Ladegerät einen Eintrag in die Wallbox-Liste ein und geben Sie dessen IP-Adresse ein. Optional können Sie jedem Ladegerät einen Namen zuweisen.

Aktivieren Sie den **Nur-Lese-Modus** für ein Ladegerät, wenn der Adapter dessen Daten nur lesen und niemals beschreiben soll. Im Nur-Lese-Modus sendet der Adapter keinerlei Steuerbefehle – weder die Ladefreigabe noch den Ladestrom noch die Phasenumschaltung. Die Zustände „ChargeNOW“ und „ChargeManager“ können weiterhin umgeschaltet werden, haben aber keine Auswirkung auf ein Ladegerät im Nur-Lese-Modus. Verwenden Sie diesen Modus, wenn der Ladevorgang der Wallbox von einem anderen System gesteuert oder lokal über RFID-Tags verwaltet wird.

Die Abfragezykluszeit legt fest, wie oft der Adapter Daten von den Ladegeräten abruft und den Ladestrom anpasst (Minimum 3 Sekunden, Standard 10 Sekunden).

### PV-Überschussladung mit ChargeManager
ChargeManager berechnet den Ladestrom anhand numerischer ioBroker-Zustände, die von einem Energiemanagementsystem, Wechselrichter, Zähler oder einer benutzerdefinierten Datenquelle bereitgestellt werden. Er ist herstellerunabhängig, die ausgewählten Zustände müssen jedoch die unten beschriebenen Größen repräsentieren.

Konfigurieren Sie die Objekt-IDs der folgenden Zustände:

- aktuell verfügbare Solarleistung [W]
- aktueller Stromverbrauch des Haushalts [W]
- aktueller Ladezustand Ihrer Heimbatterie [%]

#### Eingabeanforderungen
| Eingabe | Erwartungswert | Einheit | Vorzeichen |
| ---------------------------- | ------------------------------ | ---- | -------------------- |
| Solarenergie | Gesamtstromerzeugung aus Photovoltaik | W | Positive Erzeugung |
| Stromverbrauch im Haushalt | Aktueller Gesamtstrombedarf des Haushalts | W | Positiver Verbrauch |
| Ladezustand der Heimbatterie | Aktueller Ladezustand der Batterie | % | 0 bis 100 |

Alle drei Zustände müssen numerische Werte enthalten. Leistungswerte in kW müssen vor der Auswahl in W umgerechnet werden. Ein Netzimport-/Netzexportzustand kann nicht direkt verwendet werden, da ChargeManager derzeit separate Erzeugungs- und Verbrauchswerte erwartet.

Ist kein Heimspeicher installiert, erstellen Sie einen numerischen Hilfszustand und wählen Sie diesen als Ladezustand des Speichers aus. Setzen Sie diesen Hilfszustand auf **denselben konstanten Wert** wie `Settings.Setpoint_HomeBatSoC` (z. B. `70` für beide). Dadurch bleibt der Speicher-Offset bei Null, sodass ChargeManager ausschließlich mit dem verfügbaren PV-Überschuss lädt.

#### Wallbox-Verbrauch im Haushaltsverbrauchswert
Aktivieren Sie die Option „Ladeverbrauch wird in den Haushaltsstromverbrauch einbezogen“, wenn der ausgewählte Haushaltsstromverbrauch nach Ladebeginn um etwa die Ladeleistung ansteigt. ChargeManager addiert dann die gemessene Leistung der Wallbox wieder hinzu, bevor der verfügbare Überschuss berechnet wird. Dadurch wird verhindert, dass der Controller seine eigene Ladelast als zusätzlichen Haushaltsstromverbrauch behandelt.

Lassen Sie die Option deaktiviert, wenn der ausgewählte Zustand den Verbrauch der Wallbox bereits ausschließt.

#### Berechnung
ChargeManager verwendet die folgende Berechnung einmal pro Abfragezyklus:

```text
available power =
    solar power
  - home power consumption
  + wallbox power, if it is included in home power consumption
  - 100 W reserve
  + battery SoC offset

target current = floor(available power / 230 V / active phases)
```

Der Batterie-Offset ist null, wenn sich die Batterie exakt im konfigurierten minimalen Ladezustand befindet, und steigt auf bis zu 2000 W an, wenn sich die Batterie 100 % nähert. Unterhalb von `Settings.Setpoint_HomeBatSoC` ist das Laden von Elektrofahrzeugen deaktiviert, sodass die Heimbatterie Priorität hat.

Der berechnete Strom ist auf maximal 16 A begrenzt. Der interne Stromzielwert ändert sich um höchstens 1 A pro Poll-Zyklus, um plötzliche Änderungen zu vermeiden.

#### ChargeManager aktivieren
Nach dem Start des Adapters verwenden Sie die unten aufgeführten beschreibbaren Zustände. Ersetzen Sie gegebenenfalls die Instanz `0` und die Wallbox-Nummer `0`.

| Staat | Zweck |
| ------------------------------------------------- | --------------------------------------------------------------- |
| `go-e-charger.0.Settings.Setpoint_HomeBatSoC` | Minimaler Ladezustand der Heimbatterie, bevor Überladung zulässig ist |
| `go-e-charger.0.Wallbox_0.Settings.ChargeNOW` | Überschreibt ChargeManager und erzwingt das Laden |
| `go-e-charger.0.Wallbox_0.Settings.ChargeCurrent` | Stromverbrauch von ChargeNOW |
| `go-e-charger.0.Wallbox_0.Settings.Charge3Phase` | Wählt einphasiges oder dreiphasiges Laden auf unterstützter Hardware aus |
| `go-e-charger.0.Wallbox_0.Settings.Charge3Phase` | Wählt einphasiges oder dreiphasiges Laden auf unterstützter Hardware aus |

Für die Abrechnung von Überschüssen setzen Sie `ChargeNOW` auf `false` und `ChargeManager` auf `true`. Sind beide aktiviert, hat ChargeNOW Vorrang und verwendet den konfigurierten Wert für `ChargeCurrent`, ohne den verfügbaren Überschuss zu berücksichtigen.

#### Einphasen- und Dreiphasenladung
ChargeManager schaltet nicht automatisch zwischen ein- und dreiphasigem Betrieb je nach verfügbarem Überschuss um. Bei Hardware der 3. Generation und neuer wählt `Charge3Phase` den Phasenmodus aus:

- `false`: einphasige Ladung
- `true`: Dreiphasenladung

Da die aktuelle Implementierung den Ladevorgang startet, sobald der interne Zielwert 9 A überschreitet, liegt der effektive Startpunkt bei 10 A. Dies erfordert nach Berücksichtigung der Reserve und der Batterieeinstellungen ca. 2,3 kW im Einphasenbetrieb bzw. 6,9 kW im Dreiphasenbetrieb. Der Einphasenbetrieb bietet daher einen größeren Betriebsbereich für kleinere PV-Anlagen oder bei wechselnden Wetterbedingungen.

#### Betriebsmodi
| ChargeNOW | ChargeManager | Ergebnis |
| --------- | ------------- | ------------------------------------------ |
| `false` | `false` | Das Laden ist deaktiviert |
| `true` | `false` | Zwangsladung bei `ChargeCurrent` |
| `true` | `true` | ChargeNOW hat Vorrang |
| `true` | `true` | ChargeNOW hat Vorrang |

Im Nur-Lese-Modus können diese Zustände zwar noch geändert werden, es wird jedoch kein resultierender Steuerbefehl an das Ladegerät gesendet.

#### Überprüfung und Fehlerbehebung
Bevor Sie sich auf die automatische Abrechnung verlassen, überprüfen Sie die ausgewählten Eingangszustände in der ioBroker-Objektansicht:

1. Die Solarenergie ist nachts nahezu null und folgt tagsüber der Stromerzeugung.
2. Der Stromverbrauch der Haushalte bleibt positiv und reagiert plausibel, wenn Verbraucher eingeschaltet werden.
3. Der Ladezustand der Batterie bleibt zwischen 0 und 100.
4. Alle Leistungswerte werden in W und nicht in kW angegeben.
5. Die Option „Wallbox-Verbrauch“ entspricht der Angabe, ob die Ladeleistung im gewählten Haushaltsverbrauchswert enthalten ist.
6. `Wallbox_0.info.connection` ist `true`.
7. `Wallbox_0.Power.Charge`, `Wallbox_0.Power.GridPhases` und, auf unterstützter Hardware, `Wallbox_0.Power.EnabledPhases` enthalten plausible Werte.

Der Ladevorgang kann mehrere Abfragezyklen benötigen, da der interne Zielwert pro Zyklus nur um 1 A ansteigt. Bei einem standardmäßigen 10-Sekunden-Zyklus und einem anfänglichen Zielwert von 0 A kann es etwa 100 Sekunden dauern, bis der Startwert von 10 A erreicht ist.

ChargeManager ist derzeit für die Steuerung eines einzelnen Ladegeräts vorgesehen. Die gleichzeitige Aktivierung für mehrere Ladegeräte führt dazu, dass jedes Ladegerät unabhängig voneinander denselben Überschuss nutzt und eine fehlerhafte Zuweisung verursachen kann.

## Wächter
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=76GBRV9BX5US8"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.go-e-charger/master/docu/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur in spendabler Stimmung bist – spendier mir doch ein Bier. Prost! 😉

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.3.0 (2026-08-04)

- (hombach) added info.accessControlState (go-e access_state: 0 = open, 1 = RFID/App required, 2 = price/automatic) (#634)
- (hombach) tightened TypeScript types for go-e API response fields (removed any)
- (hombach) updated dependencies

### 1.2.1 (2026-07-31)

- (typhosj) made ChargeManager surplus control more fail-safe: input validation, current clamped to 0-16 A, resilience of state-machine loop (#841)
- (hombach) added support for firmware V60.5 (#800) and V60.6 (#844)
- (typhosj) added ChargeManager PV surplus configuration guide (#842)
- (hombach) corrected no-battery helper-state recommendation for ChargeManager
- (hombach) updated dependencies

### 1.2.0 (2026-07-12)

- (hombach) added statisticsGlobal.chargePower state with the current total charging power of all chargers
- (hombach) removed chai-based unit test dependencies; modernized test harness to Node.js assert (fixes Appveyor, #836)

### 1.1.0 (2026-07-05)

- (hombach) fixed reading of "unlocked by RFID" (uby) on gen 3+ chargers via API V2
- (hombach) read-only mode now suppresses all control commands (charge release, charging current, phase switching)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.0.4 (2026-07-04)

- (hombach) harmonized i18n files
- (hombach) improved README and English texts
- (hombach) reworked translations in all languages
- (hombach) added 5s timeout to all HTTP requests to chargers
- (hombach) fixed adapter stop when no charger is reachable at startup; warn per unreachable charger
- (hombach) fixed German fallback text for RFID card channel names
- (hombach) added upper bound validation for cycle time
- (hombach) added link to manufacturer's website
- (hombach) code optimizations

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2026 C.Hombach

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.