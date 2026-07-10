---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.chargemaster/README.md
title: ioBroker.chargemaster
hash: kR1RIxIkER7PRGMDoJ0JYXNiXx4h27Tsp1CUxcCMvEg=
---
![Logo](../../../en/adapterref/iobroker.chargemaster/admin/chargemaster.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.chargemaster?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.chargemaster?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.chargemaster?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.chargemaster?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.chargemaster?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.chargemaster?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.chargemaster/test-and-release.yml?branch=main&logo=github&style=flat-square)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.chargemaster?branch=master&svg=true)
![Bekannte Schwachstellen von SNYK](https://snyk.io/test/github/hombach/ioBroker.chargemaster/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.chargemaster.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/chargemaster-stable.svg)
![Installiert](https://iobroker.live/badges/chargemaster-installed.svg)
![NPM](https://nodei.co/npm/iobroker.chargemaster.png?downloads=true)

# IoBroker.chargemaster
[![CodeQL](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.chargemaster/actions/workflows/codeql-analysis.yml)

## Versionen
## Wächter
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">der Sentry-Plugin-Dokumentation</a> !

## Adapter zur Steuerung eines oder mehrerer Ladegeräte für Elektrofahrzeuge unter Verwendung von Photovoltaikenergie
**!!! DIESER ADAPTER BEFINDE SICH NOCH IM ENTWICKLUNGSZUSTAND !!!**

ChargeMaster verwaltet eine oder mehrere Ladestationen für Elektrofahrzeuge (Wallboxen) und steuert deren Ladestrom basierend auf dem verfügbaren PV-Überschussstrom Ihres Hauses. Es ist herstellerunabhängig: Es kommuniziert nicht direkt mit der Hardware, sondern liest und schreibt die ioBroker-Zustände Ihrer vorhandenen Wallbox-Adapter (z. B. go-e, aber jeder Adapter, der die benötigten Zustände bereitstellt, funktioniert).

### Merkmale
- Steuert bis zu mehrere Wanddosen gleichzeitig unter Berücksichtigung eines globalen maximalen Gesamtstroms (z. B. der Grenze Ihres Hausanschlusses oder der Zuleitung zur Wanddose)
- **ChargeNOW**-Modus pro Wallbox: Sofortiges Laden mit einem benutzerdefinierten Strom, unabhängig von der PV-Produktion
- **ChargeManager**-Modus pro Wallbox: Automatisches Laden aus PV-Überschuss unter Berücksichtigung des Hausverbrauchs und des Speichers Ihres Heimspeichers
- Konfigurierbare Priorität der Heimbatterie: Das Laden des Elektrofahrzeugs beginnt erst, wenn die Heimbatterie einen konfigurierbaren Ladezustand erreicht hat; darüber hinaus kann ein Teil der Batterieleistung das Laden des Elektrofahrzeugs unterstützen.
- Sanfte Regelung: Der Ladestrom wird pro Steuerzyklus um 1 A erhöht/verringert, mit Hysterese und verzögerter Abschaltung zum Schutz des Fahrzeugladegeräts vor schnellem Schalten.
- Ereignisgesteuert: Reagiert sofort auf Benutzereingaben (z. B. Aktivierung von ChargeNOW) und empfängt Energiedaten über Statusabonnements anstatt durch Abfragen.

### So funktioniert es
Der Adapter führt einen Regelzyklus durch (standardmäßig alle 10 Sekunden). Für jede konfigurierte Wanddose plant er einen Zielstrom basierend auf ihrem Betriebsmodus:

1. **ChargeNOW aktiviert** → Die Wallbox wird mit dem benutzerdefinierten `ChargeCurrent` geplant.
2. **ChargeManager aktiviert** → Wenn der Ladezustand (SoC) der Heimbatterie den Sollwert erreicht hat (`Settings.Setpoint_HomeBatSoC`), wird der optimale Strom aus dem PV-Überschuss berechnet (siehe [Lademanager-Algorithmus](#charge-manager-algorithm)). Andernfalls bleibt die Wallbox ausgeschaltet, bis die Batterie geladen ist.
3. **Keine aktiviert** → Die Wallbox ist ausgeschaltet.

Anschließend verteilt ein globaler Strombegrenzer den verfügbaren Gesamtstrom (Einstellung `maximum total current`): Wallboxen im ChargeNOW-Modus werden zuerst bedient, der verbleibende Strom geht an die Wallboxen des ChargeManagers. Sollte der verbleibende Strom einer Wallbox unter ihren Mindeststrom fallen, wird diese vollständig abgeschaltet. Abschließend werden die resultierenden Ströme und Ladeaktivierungsbefehle in die konfigurierten Wallbox-Zustände geschrieben.

## Anforderungen
- node.js >= 22.18, js-controller >= 6.0.11, admin >= 7.6.20
- Ein ioBroker-Adapter für Ihre Wallbox(en) mit folgenden Funktionen: Ladestrom einstellen, Laden zulassen/deaktivieren, aktive Ladeleistung, aktiver Ladestrom
ioBroker zeigt Ihre PV-Produktion (W), Ihren Stromverbrauch im Haus (W) und – falls vorhanden – den Ladezustand (%) Ihrer Hausbatterie an, z. B. vom Wechselrichteradapter.

## Konfiguration
### Grundeinstellungen
| Schauplatz | Beschreibung |
| -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `cycle time` | Kontrollzyklusintervall in Millisekunden (Standardwert 10000). Werte unter 5000 werden nicht empfohlen. |
| `state of solar power` | Ausländischer Staat mit der aktuellen PV-Produktion in W. |
| `state of home power consumption` | Ausländischer Staat mit dem aktuellen Haushaltsverbrauch in W (ohne Wallbox-Ladeleistung). |
| `state of home battery state of charge`| Fremdzustand mit dem aktuellen SoC der Heimbatterie in %. |
| `Ladezustand der Heimbatterie`| Fremder Status mit dem aktuellen SoC der Heimbatterie in %. |

### Wallbox-Liste
Füge pro Wandkasten eine Zeile hinzu:

| Spalte | Beschreibung |
| ----------------------- | ------------------------------------------------------------------------ |
| `state charge current` | Fremder Zustand, der den Sollwert des Ladestroms (A) **schreiben** soll. |
| `state active power` | Ausländischer Staat, der die aktuelle Ladeleistung (W) **liest**. |
| `state active current` | Fremdstaat, der den aktuellen Ladestrom (A) **liest**. |
| `min current` | Minimaler Ladestrom dieser Wallbox in A (typischerweise 6 A). |
| `max current` | Maximaler Ladestrom dieser Wallbox in A (z. B. 16 A). |
| `max current` | Maximaler Ladestrom dieser Wallbox in Ampere (z. B. 16 A). |

Alle konfigurierten Zustände werden beim Start des Adapters überprüft – falls ein Zustand nicht existiert, protokolliert der Adapter einen Fehler und stoppt.

## Vom Adapter erstellte Zustände
| Bundesland | Beschreibung |
| ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| `Settings.Setpoint_HomeBatSoC` | Minimaler Ladezustand der Hausbatterie in % vor Beginn der PV-Überschussladung (beschreibbar, Standardwert 80). |
| `Settings.WB_<x>.ChargeCurrent` | Ladestrom in A im ChargeNOW-Modus (beschreibbar). |
| `Settings.WB_<x>.ChargeManager` | PV-Überschussladung für Wallbox `<x>` aktivieren (beschreibbar). |
| `Power.Charge` | Gemessene Gesamtladeleistung aller Wallboxen in W. |
| `info.connection` | Wahr, solange alle konfigurierten externen Zustände verifiziert wurden und der Adapter ausgeführt wird. |
| `info.connection` | Wahr, solange alle konfigurierten externen Zustände überprüft wurden und der Adapter ausgeführt wird. |

## Algorithmus für die Ladeverwaltung
Der optimale Ladestrom für eine Wallbox im ChargeManager-Modus wird wie folgt berechnet:

```
batteryShare = up to 2000 W, scaling linearly from 0 at Setpoint_HomeBatSoC to 2000 W at 100% SoC
optimalCurrent = (solarPower - houseConsumption + 100 W reserve + batteryShare) / 230 V
```

Der geplante Strom nähert sich dann diesem Optimum um 1 A pro Zyklus. Der Ladevorgang wird aktiviert, sobald der geplante Strom den Mindeststrom der Wallbox zuzüglich einer Hysterese von 3 A überschreitet, und erst deaktiviert, nachdem der geplante Strom über 15 aufeinanderfolgende Zyklen unter dem Mindeststrom geblieben ist (verzögerte Abschaltung, vermeidet das Ein- und Ausschalten bei kurzen Bewölkungen).

## Hinweise und Einschränkungen
Die Leistungs-Strom-Umwandlung geht von einphasigem Laden mit 230 V aus. Bei dreiphasigen Wallboxen wird der berechnete Überschussstrom derzeit nicht durch die Anzahl der Phasen geteilt – die konfigurierbare Phasenanzahl ist geplant.
- Der Eigenverbrauch darf nicht die Ladeleistung der Wallbox selbst beinhalten, da sonst der Regelkreis oszilliert.
- Der Adapter schreibt in jedem Zyklus in die Zustände Ihrer Wanddose - stellen Sie sicher, dass die konfigurierten Werte für `state charge current` / `state charge allowed` tatsächlich die beschreibbaren Steuerzustände Ihres Wanddosenadapters sind.

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=H5PMQ8JKQL7SL"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/main/docu/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Getestet mit
- 3x go-E Ladegerät & Kostal PikoBA

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.16.0 (2026-07-05)

- (HombachC) switched data acquisition from polling to event driven foreign state subscriptions, react immediately to user input
- (HombachC) fixed warnings of adapter checker
- (HombachC) repository cleanup
- (HombachC) removed unused chai/sinon-chai/chai-as-promised/proxyquire devDependencies and switch tests to node:assert
- (HombachC) fixed race condition at first start
- (HombachC) fixed wrong config default keys in io-package.json and added guard for missing maxAmpTotal
- (HombachC) moved module-global variables into adapter class to fix possible conflicts in compact mode
- (HombachC) stop state machine and reset info.connection on adapter unload
- (HombachC) await wallbox state writes with proper error handling and throttle/switch off boxes exceeding the measured total current limit
- (HombachC) fixed lost min/max/step value of 0 and duplicated unit handling in projectUtils
- (HombachC) charge manager: clamp optimal current at zero and fix division by zero with home battery setpoint of 100%
- (HombachC) validate and clamp Setpoint_HomeBatSoC state changes (NaN guard, 0-100%)
- (HombachC) improved typing: typed state getters in projectUtils instead of any, fixed wallBoxList tuple type
- (HombachC) removed yarn devDependency and switched release build hook to npm
- (HombachC) extracted charge planning and limiting algorithms into testable module and added 18 unit tests
- (HombachC) improved README with feature overview, configuration, states and algorithm documentation

### 0.15.1 (2026-06-04)

- (HombachC) fix warnings of adapter checker
- (HombachC) upgraded typescript to 6.x.x
- (HombachC) updated projectUtils
- (HombachC) updated dependencies

### 0.15.0 (2026-05-09)

- (copilot) BREAKING: adapter requires node.js >= 22 now
- (HombachC) update dependencies

### 0.14.7 (2026-04-16)

- (HombachC) min admin 7.6.20 as recommended (#762)
- (HombachC) switch to ES2023 code
- (HombachC) update dependencies

### 0.14.6 (2026-02-27)

- (HombachC) update dependencies

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2021-2026 Christian Hombach

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