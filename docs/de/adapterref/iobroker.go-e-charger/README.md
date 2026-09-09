---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.go-e-charger/README.md
title: ioBroker.go-eCharger
hash: Z7XvzOc+SKEr63hXNvp9H/p6Rvs/YvFte538eDfbiBA=
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
![CodeQL](https://github.com/hombach/ioBroker.go-e-charger/actions/workflows/codeql-analysis.yml/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.go-e-charger?branch=master&svg=true)
![Bekannte Schwachstellen von SNYK](https://snyk.io/test/github/hombach/ioBroker.go-e-charger/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.go-e-charger.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/go-e-charger-stable.svg)
![Installiert](https://iobroker.live/badges/go-e-charger-installed.svg)
![NPM](https://nodei.co/npm/iobroker.go-e-charger.png?downloads=true)

# ioBroker.go-eCharger

## Versionen

## ioBroker-Adapter für go-e Charger EV-Wallboxen

Dieser Adapter integriert eine oder mehrere go-e Charger Wallboxen in Ihre ioBroker-Hausautomation. Er fragt jede Wallbox zyklisch über ihre lokale HTTP-API ab, stellt alle relevanten Daten gemäß den ioBroker-Statusmeldungen bereit und ermöglicht Ihnen die direkte Steuerung des Ladevorgangs von Ihrem Smart Home aus.

Weitere Informationen zur go-e Charger Hardware finden Sie auf der Website des Herstellers: [go-e GmbH](https://go-e.com) .

### Merkmale

- unterstützt mehrere go-e Ladegeräte innerhalb einer einzigen Adapterinstanz

- Überwachung des Fahrzeugzustands, der Ladeleistung, des Ladestroms, der Netzphasen und der Energiestatistik

- **ChargeNOW** – Sofortiger Ladevorgang mit einstellbarem Strom

- **ChargeManager** – automatisches Laden von PV-Überschussstrom: Der Ladestrom wird kontinuierlich an die verfügbare Solarenergie angepasst und berücksichtigt dabei den Hausverbrauch sowie den Ladezustand Ihrer Heimbatterie. Das Laden Ihres Elektrofahrzeugs kann verzögert werden, bis die Heimbatterie einen konfigurierbaren Mindestladezustand erreicht hat.

  > **Hinweis:** Die PV-Überschussladung ist derzeit für die Steuerung eines **einzelnen** Ladegeräts ausgelegt. Wenn ChargeManager gleichzeitig auf mehreren Ladegeräten aktiviert ist, werden die Ladeströme nicht koordiniert, und die Berechnung des Solarüberschusses liefert falsche Werte. Eine Erweiterung mit koordiniertem Lastmanagement für mehrere Ladegeräte wird in Kürze verfügbar sein.

- Umschaltung zwischen einphasigem und dreiphasigem Laden (Hardwaregeneration 3 und neuer)

- Energiestatistik pro RFID-Karte (Kartenname, ID und geladene Energie)

- Nur-Lese-Modus pro Wallbox – Überwachung des Ladegeräts ohne Senden **von** Steuerbefehlen (keine Ladungsabgabe, kein Ladestrom, keine Phasenumschaltung), z. B. wenn der Ladevorgang extern gesteuert oder der Zugriff über RFID-Tags verwaltet wird.

Getestet mit Firmware V033, V040.0, V041.0, V054.7, V054.11, V055.5, V055.7, V055.8, V56.1, V56.2, V56.8, V56.9, V56.11, V57.0, V57.1, V59.4, V60.0, V60.1, V60.2, V60.5, V60.6 und mit bis zu 3 parallel betriebenen Ladegeräten.

### Anforderungen

- Bei Hardware der Generationen 3 und 4 müssen Sie "HTTP API v1" in Ihrer go-e-App aktivieren.
- Für die Phasenumschaltung müssen Sie zusätzlich "HTTP API v2" in Ihrer go-e-App aktivieren (Hardwaregeneration 3 und neuer).

## Konfiguration

Fügen Sie für jedes go-e Ladegerät einen Eintrag in die Wallbox-Liste ein und geben Sie dessen IP-Adresse ein. Optional können Sie jedem Ladegerät einen Namen zuweisen.

Aktivieren Sie **den Nur-Lese-Modus** für ein Ladegerät, wenn der Adapter dessen Daten nur lesen, aber niemals beschreiben soll. Im Nur-Lese-Modus sendet der Adapter keinerlei Steuerbefehle – weder die Ladefreigabe noch den Ladestrom noch die Phasenumschaltung. Die Zustände „ChargeNOW“ und „ChargeManager“ können weiterhin umgeschaltet werden, haben aber keine Auswirkung auf ein Ladegerät im Nur-Lese-Modus. Verwenden Sie diesen Modus, wenn der Ladevorgang der Wallbox von einem anderen System gesteuert oder lokal über RFID-Tags verwaltet wird.

Die Abfragezykluszeit legt fest, wie oft der Adapter Daten von den Ladegeräten abruft und den Ladestrom anpasst (Minimum 3 Sekunden, Standard 10 Sekunden).

#### Strombegrenzungen pro Wanddose

Jeder Wallbox kann optional ein eigener **minimaler** und **maximaler Ladestrom** \[A] zugewiesen werden. Diese Werte gelten **sowohl** für ChargeManager (PV-Überschuss) als auch für ChargeNOW, beispielsweise um ein einzelnes Ladegerät zu drosseln oder die Last zwischen mehreren Boxen an einer gemeinsamen Stromversorgung auszugleichen.

- Ein Wert von`0` bedeutet „nicht eingestellt“: Der Minimalwert fällt auf den technischen Minimalwert von 6 A zurück, und der Maximalwert fällt aus den Standardeinstellungen auf den installationsweiten maximalen Ladestrom zurück.
- Ein Maximalwert pro Box kann die Anzahl der Ladegeräte nur unter das Installationslimit senken, niemals darüber hinaus anheben.
- Wenn der konfigurierte Minimalwert höher als der Maximalwert ist, wird der Minimalwert auf den Maximalwert begrenzt und eine Warnung protokolliert.

Der Adapter liest außerdem die von jedem Ladegerät gemeldeten Stromgrenzen – den absoluten Maximalstrom, die Kabelstrombegrenzung und (über API v2) den minimalen Ladestrom – und integriert diese in die effektiven Grenzwerte, sodass ein Ladegerät nie über die Grenzen seiner Hardware oder des angeschlossenen Kabels hinaus belastet wird. Die erfassten Grenzwerte werden veröffentlicht als`Wallbox_X.info.hardwareMaxChargeCurrent` Und`Wallbox_X.info.hardwareMinChargeCurrent` um Ihnen bei der Auswahl sinnvoller Preise pro Box zu helfen.

### PV-Überschussladung mit ChargeManager

ChargeManager berechnet den Ladestrom anhand numerischer ioBroker-Zustände, die von einem Energiemanagementsystem, Wechselrichter, Zähler oder einer benutzerdefinierten Datenquelle bereitgestellt werden. Er ist herstellerunabhängig, die ausgewählten Zustände müssen jedoch die unten beschriebenen Größen repräsentieren.

Konfigurieren Sie die Objekt-IDs der folgenden Zustände:

- aktuell verfügbare Solarleistung \[W]
- Aktueller Stromverbrauch des Haushalts \[W]
- Aktueller Ladezustand Ihrer Heimbatterie \[%] (nur in den batteriegesteuerten Modi erforderlich, siehe _Heimbatteriemodus_ unten)

#### Eingabeanforderungen

| Eingang                      | Erwartungswert                | Einheit | Zeichen             |
| ---------------------------- | ----------------------------- | ------- | ------------------- |
| Solarenergie                 | Gesamtstrom-PV-Erzeugung      | W       | Positive Generation |
| Stromverbrauch im Haushalt   | Gesamtnachfrage der Haushalte | W       | Positiver Konsum    |
| Ladezustand der Heimbatterie | Aktueller Batterieladestand   | %       | 0 bis 100           |

Alle konfigurierten Zustände müssen numerische Werte enthalten. Leistungswerte in kW müssen vor der Auswahl in W umgerechnet werden. Ein Netzimport-/Netzexportzustand kann nicht direkt verwendet werden, da ChargeManager derzeit separate Erzeugungs- und Verbrauchswerte erwartet.

Ist kein Heimspeicher installiert, stellen Sie den **Heimspeichermodus** auf _„Deaktiviert“_ (siehe unten). Es muss kein Ladezustand des Speichers konfiguriert werden, und ChargeManager lädt ausschließlich mit dem verfügbaren PV-Überschuss. Die frühere Problemumgehung mit dem Hilfszustand (ein konstanter Zustand, der auf … gesetzt ist) wird dadurch nicht mehr unterstützt.`Settings.Setpoint_HomeBatSoC` ) wird nicht mehr benötigt.

#### Wallbox-Verbrauch im Haushaltsverbrauchswert

**Der Stromverbrauch des Ladegeräts wird in den Haushaltsstromverbrauch einbezogen,** wenn der ausgewählte Haushaltsstromverbrauch nach dem Ladebeginn um etwa die Ladeleistung ansteigt. ChargeManager addiert dann die gemessene Leistung der Wallbox wieder hinzu, bevor der verfügbare Überschuss berechnet wird. Dadurch wird verhindert, dass der Controller seine eigene Ladelast als zusätzlichen Haushaltsstromverbrauch behandelt.

Lassen Sie die Option deaktiviert, wenn der ausgewählte Zustand den Verbrauch der Wallbox bereits ausschließt.

#### Berechnung

ChargeManager verwendet die folgende Berechnung einmal pro Abfragezyklus:

```text
available power =
    solar power
  - home power consumption
  + wallbox power, if it is included in home power consumption
  - grid reserve
  + battery bonus (Battery priority mode only)

target current = floor(available power / 230 V / active phases)
```

Sechs Einstellungen auf der Konfigurationsseite von ChargeManager beeinflussen diese Berechnung:

- **Heimbatteriemodus** (Standardeinstellung: _Batteriepriorität_ ) – wie die Heimbatterie berücksichtigt wird:
  - _Deaktiviert_ – es wird keine Heimbatterie verwendet. Es muss kein SoC-Status konfiguriert werden, und dem Fahrzeug wird keine Batterieleistung zugewiesen.
  - _Mindest-SOC_ – Das Laden von Elektrofahrzeugen ist blockiert, wenn dieser Wert nicht erreicht ist.`Settings.Setpoint_HomeBatSoC` Die Batterie trägt jedoch niemals zur Stromversorgung des Autos bei.
  - _Batteriepriorität_ – wie oben, zuzüglich des unten beschriebenen Batteriebonus.
- **SoC-Hysterese** \[%] (Standard 0) – wie weit der SoC unter den Mindestwert fallen darf, bevor ein _laufender_ Controller stoppt. Dadurch wird verhindert, dass ein Akku, der sich nahe seinem Mindestwert befindet, die Ladefreigabe in jedem Zyklus umschaltet; zum Starten ist weiterhin der volle Mindest-SoC erforderlich.
- **Maximales Batterie-SoC-Alter** \[s] (Standard 0 = aus) – Die Überschusssteuerung stoppt, wenn der SoC-Zustand innerhalb dieser Zeit nicht aktualisiert wurde, sodass ein toter Hilfszustand das Auto nicht stillschweigend weiter aufladen kann.
- **Netzreserveleistung** \[W] (Standard 100) – Leistung, die im Stromnetz freigehalten wird, anstatt dem Fahrzeug zugewiesen zu werden. Erhöhen Sie diesen Wert, um mehr Sicherheitsreserve zu gewährleisten; stellen Sie ihn auf ein.`0` den gesamten Überschuss dem Auto übergeben.
- **Maximaler Batteriebonus** \[W] (Standardwert 2000) – wie viel zusätzliche Leistung über den reinen Solarstromüberschuss hinaus entnommen werden kann, solange sich der Hausspeicher über seinem Mindestladezustand befindet. Der Bonus beträgt`0` Wenn der Akku genau den minimalen Ladezustand (SoC) erreicht hat und dieser linear bis zum Maximum ansteigt, je näher der Akku 100 % kommt, ermöglicht ein vollerer Akku ein schnelleres Laden des Autos. Stellen Sie es so ein:`0` Das Fahrzeug wird ausschließlich mit dem gemessenen Solarstromüberschuss geladen, ohne dass die Heimbatterie jemals in das Auto entladen wird.
- **Minimaler Ladestrom des ChargeManagers** \[A] (Standardwert 6) – der Überschussladestrom, unterhalb dessen das Ladegerät nach kurzer Verzögerung abgeschaltet wird. Dies gilt nur für das Laden von PV-Überschussstrom.

Der **maximale Ladestrom** \[A] (Standard 16, bis zu 32) wird auf der **Seite mit den Standardeinstellungen** konfiguriert, nicht hier: Es handelt sich um eine installationsweite Begrenzung der gemeinsamen Stromversorgung (Hauptsicherung/Schutzschalter) und nicht um einen im ChargeManager einstellbaren Wert. Er begrenzt den Strom, den der Adapter jemals an **eine** Wallbox abgibt, **sowohl** im ChargeManager (PV-Überschuss) **als auch** in ChargeNOW.

> **⚠️ Stellen Sie den maximalen Ladestrom nicht höher ein, als es Ihr go-e Charger und Ihre Elektroinstallation zulassen.** go-e Charger-Modelle sind für unterschiedliche Maximalströme ausgelegt (z. B. 16 A oder 32 A), und die tatsächliche Grenze hängt auch von Ihrem Kabel, Stecker und der Verkabelung ab. Ein Wert über der zulässigen Belastbarkeit der Hardware/Installation kann Schutzvorrichtungen auslösen oder Geräte beschädigen. Im Zweifelsfall verwenden Sie den Standardwert von 16 A.

In den batterieschonenden Modi ist das Laden von Elektrofahrzeugen unten deaktiviert.`Settings.Setpoint_HomeBatSoC` Die Heimbatterie hat somit Priorität. Der Ladevorgang beginnt, sobald der interne Zielwert 10 A erreicht (oder der Mindeststrom, falls dieser höher eingestellt ist). Der berechnete Strom ist auf den konfigurierten Maximalwert begrenzt, und der interne Zielwert ändert sich pro Abfragezyklus um maximal 1 A, um plötzliche Änderungen zu vermeiden.

#### ChargeManager aktivieren

Nach dem Start des Adapters verwenden Sie die unten aufgeführten beschreibbaren Zustände. Instanz ersetzen`0` und Wandkastennummer`0` wo dies erforderlich ist.

| Zustand                                           | Zweck                                                                             |
| ------------------------------------------------- | --------------------------------------------------------------------------------- |
| `go-e-charger.0.Settings.Setpoint_HomeBatSoC`     | Mindestladezustand der Heimbatterie, bevor zusätzliches Laden zulässig ist        |
| `go-e-charger.0.Wallbox_0.Settings.ChargeManager` | Aktiviert oder deaktiviert die PV-Überschusssteuerung                             |
| `go-e-charger.0.Wallbox_0.Settings.ChargeNOW`     | Überschreibt ChargeManager und erzwingt das Laden                                 |
| `go-e-charger.0.Wallbox_0.Settings.ChargeCurrent` | Stromverbrauch von ChargeNOW                                                      |
| `go-e-charger.0.Wallbox_0.Settings.Charge3Phase`  | Wählt bei unterstützter Hardware zwischen einphasigem und dreiphasigem Laden aus. |

Für Überschussladung einstellen`ChargeNOW` Zu`false` Und`ChargeManager` Zu`true` Wenn beide aktiviert sind, hat ChargeNOW Vorrang und verwendet die konfigurierte`ChargeCurrent` ohne Berücksichtigung des verfügbaren Überschusses.

#### Einphasen- und Dreiphasenladung

ChargeManager schaltet nicht automatisch zwischen ein- und dreiphasigem Betrieb je nach verfügbarem Überschuss um. Bei Hardware der 3. Generation und neuer,`Charge3Phase` wählt den Phasenmodus aus:

- `false` : einphasige Ladung
- `true` : dreiphasige Ladung

Da die aktuelle Implementierung den Ladevorgang startet, sobald der interne Zielwert 9 A überschreitet, liegt der effektive Startpunkt bei 10 A. Dies erfordert nach Berücksichtigung der Reserve und der Batterieeinstellungen ca. 2,3 kW im Einphasenbetrieb bzw. 6,9 kW im Dreiphasenbetrieb. Der Einphasenbetrieb bietet daher einen größeren Betriebsbereich für kleinere PV-Anlagen oder bei wechselnden Wetterbedingungen.

#### Betriebsarten

| ChargeNOW | ChargeManager | Ergebnis                                                       |
| --------- | ------------- | -------------------------------------------------------------- |
| `false`   | `false`       | Das Laden ist deaktiviert                                      |
| `false`   | `true`        | Die Ladung erfolgt entsprechend dem berechneten PV-Überschuss. |
| `true`    | `false`       | Zwangsladung bei `ChargeCurrent`                               |
| `true`    | `true`        | ChargeNOW hat Vorrang.                                         |

Im Nur-Lese-Modus können diese Zustände zwar noch geändert werden, es wird jedoch kein resultierender Steuerbefehl an das Ladegerät gesendet.

#### Überprüfung und Fehlerbehebung

Bevor Sie sich auf die automatische Abrechnung verlassen, überprüfen Sie die ausgewählten Eingangszustände in der ioBroker-Objektansicht:

1. Nachts ist die Solarstromerzeugung nahezu null und orientiert sich tagsüber an der aktuellen Stromerzeugung.
2. Der Stromverbrauch der Haushalte bleibt positiv und reagiert plausibel, wenn Verbraucher eingeschaltet werden.
3. Der Ladezustand der Batterie bleibt zwischen 0 und 100.
4. Alle Leistungswerte werden in Watt (W) anstatt in Kilowatt (kW) angegeben.
5. Die Option „Wallbox-Verbrauch“ hängt davon ab, ob die Ladeleistung im gewählten Haushaltsverbrauchswert enthalten ist.
6. `Wallbox_0.info.connection` Ist`true` Die
7. `Wallbox_0.Power.Charge` ,`Wallbox_0.Power.GridPhases` und, auf unterstützter Hardware,`Wallbox_0.Power.EnabledPhases` enthalten plausible Werte.

Der Ladevorgang kann mehrere Abfragezyklen benötigen, da der interne Zielwert pro Zyklus nur um 1 A ansteigt. Bei einem standardmäßigen Zyklus von 10 Sekunden und einem anfänglichen Zielwert von 0 A kann es etwa 100 Sekunden dauern, bis der standardmäßige Startwert von 10 A erreicht ist.

ChargeManager ist derzeit für die Steuerung eines einzelnen Ladegeräts vorgesehen. Die gleichzeitige Aktivierung für mehrere Ladegeräte führt dazu, dass jedes Ladegerät unabhängig voneinander denselben Überschuss nutzt und eine fehlerhafte Zuweisung verursachen kann.

## Posten

Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Informationen und Hinweise zum Deaktivieren der Fehlerberichterstattung finden Sie in der [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry) !

## Spenden

<a href="https://www.paypal.com/donate/?hosted_button_id=76GBRV9BX5US8"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.go-e-charger/master/docu/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur in spendabler Stimmung bist – spendier mir doch ein Bier. Prost! 😉

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.6.1 (2026-09-04)

- (typhosj) fixed: a wallbox whose effective maximum charging current is below 10 A - e.g. an 8 A coded cable or a per-wallbox maximum of 8 A - was rejected as invalid ChargeManager input and never charged from PV surplus. Such a wallbox now starts charging at its own maximum

### 1.6.0 (2026-08-29)

- (hombach) added optional per-wallbox minimum and maximum charging current, applied to both ChargeManager and ChargeNOW and always kept within the installation-wide maximum
- (hombach) the per-wallbox current limits now also respect the charger's reported hardware caps (absolute max, cable limit, minimum charging current), published as `info.hardwareMaxChargeCurrent` / `info.hardwareMinChargeCurrent`
- (typhosj) ChargeManager: added home-battery modes (disabled, minimum SoC, battery priority); installations without a home battery no longer need a constant helper state
- (typhosj) ChargeManager: added a battery SoC hysteresis and an optional maximum SoC age so surplus control stops on stale battery data
- (hombach) admin: moved the maximum charging current to the standard settings tab and clarified that it is an installation-wide limit of the shared power supply, valid for all wallboxes and both charging modes

### 1.5.0 (2026-08-25)

- (hombach) ChargeManager: grid reserve power and maximum battery bonus are now configurable (defaults 100 W / 2000 W) (#852)
- (hombach) ChargeManager: minimum and maximum surplus charging current are now configurable, with the maximum raised to up to 32 A (#852)
- (hombach) the configurable maximum charging current now caps ChargeNOW as well
- (hombach) admin: moved the ChargeManager settings into their own configuration tab, separate from the standard settings
- (hombach) updated dependencies

### 1.4.1 (2026-08-23)

- (typhosj) refactored the ChargeManager control decision into a deterministic, unit-tested function (#846); behavior unchanged
- (hombach) fixed vulnerabilities
- (hombach) updated dependencies

### 1.4.0 (2026-08-10)

- (hombach) added info.unlockedByRFIDName with the name of the current session's RFID card, in parallel to unlockedByRFIDNo (#634)
- (hombach) projectUtils: use extendObject instead of setObject in forceMode so user customizations survive restarts
- (hombach) projectUtils: fixed min/max/step value of 0 being dropped from number state definitions
- (hombach) updated dependencies

[Older changelogs can be found there](https://github.com/Hombach/ioBroker.go-e-charger/blob/master/CHANGELOG_OLD.md)

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