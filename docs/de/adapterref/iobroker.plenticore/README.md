---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: ixpvz+uoTaL0+muYhwth/HPZINpazJbzirKOxO5f7MQ=
---
![Logo](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![Anzahl der Installationen](http://iobroker.live/badges/plenticore-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![NPM](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![Stabil](http://iobroker.live/badges/plenticore-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![Build-Status](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist [hier zu finden](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md) .

# ioBroker.plenticore

Ein ioBroker-Adapter für den KOSTAL Plenticore Plus Wechselrichter (d. h. Plenticore Plus 8.5)

Dieser Adapter nutzt die interne Weboberfläche des Wechselrichters, um auf die Eigenschaften und Einstellungen Ihres Wechselrichters und angeschlossener Geräte (z. B. Batterie oder intelligenter Stromzähler) zuzugreifen. Zur Verwendung des Adapters muss die ioBroker-Instanz mit dem Netzwerk verbunden sein, in dem sich Ihr KOSTAL Plenticore befindet.

Dieser Adapter ist kein offizielles Produkt von KOSTAL und wird weder von KOSTAL unterstützt noch empfohlen. Es handelt sich um ein privates Projekt in einem frühen Entwicklungsstadium. Die Verwendung erfolgt daher auf eigene Gefahr!

## Konfiguration

Geben Sie die IP-Adresse Ihres Wechselrichters (z. B. 192.168.0.23) und Ihr Passwort ein, mit dem Sie sich als Anlagenbesitzer an die Weboberfläche des Wechselrichters anschließen. Das Abfrageintervall wird in Millisekunden angegeben (d. h. 10000 entspricht 10 Sekunden).

## Adapter

Der Adapter verwendet kein Screen-Scraping. Er nutzt dieselbe REST-API wie die Weboberfläche. Möglicherweise gibt es (viele) Funktionen, die vom Adapter (noch) nicht genutzt werden.

### Warum nicht (einfach) Modbus verwenden?

Der Wechselrichter unterstützt Modbus TCP, sodass Sie den Modbus-Adapter zum Abfragen von Werten verwenden könnten. KOSTAL erlaubt jedoch kein Schreiben auf Modbus-Adressen. Daher können Sie beispielsweise den minimalen Ladezustand (SoC) der Batterie nicht mit ioBroker festlegen.

### Verwendung des Adapters

Der Adapter sollte einige Objekte im Objektbaum von plenticore.X befüllen. Einige davon sind schreibgeschützt, z. B. die aktuelle PV-Leistung oder der Stromverbrauch des Hauses. Andere sind veränderbar, z. B. der minimale Ladezustand (SoC) der Batterie oder die Batteriemanagementmodi. Ich habe den Adapter mit dem Plenticore Plus 10 getestet.

## Objekte

Nachfolgend ein Auszug der wichtigsten Objekte, die von diesem Adapter verwendet und befüllt werden. Alle Einstellungen sind mit einem Sternchen (\*) gekennzeichnet. `[**]` Sie sollten editierbar sein, aber nicht alle wurden getestet und es könnten Fehler enthalten sein.

### plenticore.X.devices.local

Der Verzeichnisbaum devices.local enthält Informationen über den Wechselrichter und gegebenenfalls angeschlossene intelligente Stromzähler und/oder Batterien.

`plenticore.X.devices.local.Dc_P` - die aktuelle Gleichstromleistung einschließlich der Eigenleistung des Wechselrichters. Dieser Wert sollte nahe am Wert von liegen. `plenticore.X.devices.local.ac.P` (ca. +30-40W)\
`plenticore.X.devices.local.Pv_P` - die aktuell erzeugte PV-Leistung. Dieser Wert wird vom Adapter durch Summierung der pvx.P-Werte berechnet.\
`plenticore.X.devices.local.Home_P` - der aktuelle Gesamtstromverbrauch des Haushalts\
`plenticore.X.devices.local.HomeBat_P` - die derzeit vom Akku bereitgestellte Haushaltsleistung\
`plenticore.X.devices.local.HomePv_P` - die derzeitige Stromversorgung des Haushalts direkt durch das Kraftwerk\
`plenticore.X.devices.local.HomeGrid_P` - die derzeitige Stromversorgung des Haushalts durch das Stromnetz\
`plenticore.X.devices.local.ToGrid_P` Die aktuell ins Netz eingespeiste Leistung. Dieser Wert wird vom Adapter berechnet und ist möglicherweise nicht 100% genau.\
`plenticore.X.devices.local.LimitEvuAbs` - die berechnete maximale Leistung, die den Umrichter verlassen darf. Wird im Kraftwerk mehr Leistung erzeugt, geht diese verloren.\
`plenticore.X.devices.local.StateKey0` - Falls dies zutrifft, wurde das Batteriemanagement des Wechselrichters freigeschaltet.

#### plenticore.X.devices.local.ac

Dieser Kanal enthält Informationen zur Wechselstromseite des Wechselrichters. Die wichtigsten sind:\
`plenticore.X.devices.local.ac.Frequency` - die Netzfrequenz\
`plenticore.X.devices.local.ac.L1_P` - die aktuelle Leistung der Phase 1 in W\
`plenticore.X.devices.local.ac.L2_P` - die aktuelle Leistung der Phase 2 in W\
`plenticore.X.devices.local.ac.L3_P` - die aktuelle Leistung der Phase 3 in W\
`plenticore.X.devices.local.ac.P` - die aktuell vom Wechselrichter abgegebene Gesamtleistung, einschließlich der Batterieentladung

#### plenticore.X.devices.local.battery

`plenticore.X.devices.local.battery.Cycles`- die Lebensdauer der Batteriezyklen bis jetzt\
`[**] plenticore.X.devices.local.battery.DynamicSoc` - wahr, wenn dynamisches SoC aktiviert ist (nur wenn `SmartBatteryControl` (Das ist auch richtig.)\
`[**] plenticore.X.devices.local.battery.MinHomeConsumption` - der minimale Stromverbrauch im Haushalt, der für die Nutzung der Batterie erforderlich ist\
`[**] plenticore.X.devices.local.battery.MinSoc` - der gewünschte minimale Ladezustand (SoC) der Batterie. Der tatsächliche Ladezustand kann darunter liegen, wenn nicht genügend Sonnenenergie zur Verfügung steht.\
`plenticore.X.devices.local.battery.MinSocDummy` Dieser Wert wird vom Adapter festgelegt, wenn die MinSoC-Verwaltung in der Konfiguration deaktiviert ist. Er zeigt an, auf welchen Wert der MinSoC eingestellt würde.\
`plenticore.X.devices.local.battery.P` - die aktuelle Batteriespannung (negativ beim Laden, positiv beim Entladen)\
`plenticore.X.devices.local.battery.Charge_P` - die aktuelle Batterieladeleistung (0 im Entladezustand)\
`plenticore.X.devices.local.battery.Discharge_P` - die aktuelle Entladeleistung der Batterie (0 beim Laden)\
`[**] plenticore.X.devices.local.battery.SmartBatteryControl` Das trifft zu, wenn das intelligente Batteriemanagement aktiviert ist. Laut Handbuch sollte dieses jedoch nur aktiviert werden, wenn keine weitere Wechselstromquelle wie beispielsweise ein zweiter Wechselrichter angeschlossen ist.\
`[**] plenticore.X.devices.local.battery.ExternControl` Die Konfiguration ist nur über die Weboberfläche als Installateur möglich. Zur Steuerung über ioBroker verwenden Sie die Zustände ExternControl\_DcPowerAbs und ExternControl\_MaxChargePowerAbs, während ExternControl auf 2 (Modbus TCP) eingestellt ist. `[**] plenticore.X.devices.local.battery.ExternControl_DcPowerAbs` - GEFAHR: Verwenden Sie dieses Gerät nur, wenn Sie genau wissen, was Sie tun. Falsche Anwendung kann Ihren Akku beschädigen! WICHTIG: Der Wert muss alle 3 Minuten aktualisiert werden. Andernfalls schaltet der Plenticore auf interne Steuerung um, bis ein neuer Wert empfangen wird. Dieser Zustand ist nur verfügbar, wenn ExternControl auf 2 (Modbus TCP) eingestellt ist. Der Wert wird in Watt angegeben und kann zwischen -10000 und 10000 eingestellt werden. Ein negativer Wert bedeutet, dass sich der Akku entlädt, ein positiver Wert bedeutet, dass er geladen wird. `[**] plenticore.X.devices.local.battery.ExternControl_MaxChargePowerAbs` - GEFAHR: Verwenden Sie diese Funktion nur, wenn Sie genau wissen, was Sie tun. Falsche Anwendung kann Ihren Akku beschädigen! WICHTIG: Der Wert muss alle 3 Minuten aktualisiert werden. Andernfalls schaltet der Plenticore auf interne Steuerung um, bis ein neuer Wert empfangen wird. Dieser Zustand ist nur verfügbar, wenn ExternControl auf 2 (Modbus TCP) eingestellt ist. `plenticore.X.devices.local.battery.SoC` - der aktuelle Ladezustand der Batterie

#### plenticore.X.devices.local.inverter

`plenticore.X.devices.local.inverter.MaxApparentPower` - die maximale Leistung, die der Wechselrichter bereitstellen kann

#### plenticore.X.devices.local.pv1 / pv2 / pv3

`plenticore.X.devices.local.pvX.P` - die aktuelle Leistung, die von Phase X der Anlage bereitgestellt wird

### plenticore.X.scb

Dieser Kanal enthält Informationen und Einstellungen des Geräts selbst.

#### plenticore.X.scb.modbus

`[**] plenticore.X.scb.modbus.ModbusEnable` - wahr, wenn Modbus TCP aktiviert ist\
`[**] plenticore.X.scb.modbus.ModbusUnitId` - Modbus-Geräte-ID des Geräts

#### plenticore.X.scb.network

`[**] plenticore.X.scb.network.Hostname` - der aktuelle Hostname des Wechselrichters\
`[**] plenticore.X.scb.network.IPv4Auto` - Verwenden Sie DHCP, um die IP-Adresseinstellungen für den Wechselrichter bereitzustellen.\
`[**] plenticore.X.scb.network.IPv4Address` - die aktuelle IP-Adresse des Wechselrichters\
`[**] plenticore.X.scb.network.IPv4DNS1` Und `plenticore.X.scb.network.IPv4DNS2` - die aktuell verwendeten DNS-Server\
`[**] plenticore.X.scb.network.IPv4Gateway` - das aktuell verwendete Netzwerk-Gateway\
`[**] plenticore.X.scb.network.IPv4Subnetmask` - die Netzwerk-Subnetzmaske

#### plenticore.X.scb.time

`[**] plenticore.X.scb.time.NTPservers` - die aktuell verwendeten Zeitserver (NTP). Dies können mehrere, durch Leerzeichen getrennte Server sein.\
`[**] plenticore.X.scb.time.NTPuse` - Verwenden Sie NTP, um die aktuelle Gerätezeit einzustellen\
`[**] plenticore.X.scb.time.Timezone` - die Zeitzone des Geräts

### plenticore.X.scb.statistic.EnergyFlow

Die Datenpunkte in diesem Abschnitt enthalten die Statistiken, die in der Plenticore-Weboberfläche sichtbar sind. Folgen Sie einfach den `Day` Es werden Datenpunkte erwähnt, aber jeder von ihnen ist auch verfügbar für `Month`, `Year` Und `Total` Die

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay`- die Autarkie in Prozent für den heutigen Tag\
`plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - die geschätzte CO2-Einsparung in kg für den heutigen Tag\
`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - der gesamte Haushaltsverbrauch in Wh für den heutigen Tag\
`plenticore.0.scb.statistic.EnergyFlow.EnergyHomePvDay` - der gesamte Haushaltsverbrauch, der am heutigen Tag von der Photovoltaikanlage gedeckt wird\
`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - der gesamte Haushaltsverbrauch, der am heutigen Tag von der Batterie gedeckt wird\
`plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - der gesamte Haushaltsstromverbrauch, der am heutigen Tag vom Stromnetz gedeckt wird\
`plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay` - die gesamte Leistung, die am heutigen Tag in das Stromnetz eingespeist wird\
`plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - der Eigenverbrauch (erzeugte Kraftwerksenergie, die NICHT ins Netz eingespeist wird) für den aktuellen Tag\
`plenticore.0.scb.statistic.EnergyFlow.YieldDay` - der Gesamtertrag der Pflanze für den heutigen Tag

## Prognosedaten

Die Funktion zur Stromvorhersage nutzt verschiedene Wetterdatenquellen. Sie funktioniert sofort, die Ergebnisse lassen sich jedoch durch Hinzufügen von Instanzen eines oder mehrerer der folgenden Wetteradapter verbessern: ioBroker.darksky, ioBroker.weatherunderground, ioBroker.daswetter. Damit die Funktion funktioniert, müssen die globale Geoposition (Längen- und Breitengrad) des Systems konfiguriert und die erweiterte Konfiguration des Plenticore-Adapters (ggf. Daten zu Panel und Batterie) festgelegt sein.

### Wie funktioniert die Prognose?

Die Prognosefunktion nutzt die bereitgestellten Daten Ihres Kraftwerks und Ihrer Batterie, um die maximal mögliche Leistung zu jeder Tageszeit zu berechnen. Dazu werden anhand des Standorts des Systems Sonnenstand und -azimut ermittelt und die Werte der solaren Einstrahlung berechnet. Diese Werte werden mit Wettervorhersagedaten aus verschiedenen Quellen kombiniert, um die Vorhersage von Bewölkung, Nebel und Regen für jede Stunde des Tages zu erhalten. Mithilfe dieser Daten berechnet der Adapter die mögliche Leistung, die das Kraftwerk in jeder Stunde Sonnenlicht erzeugen kann.

Die prognostizierten Werte können dann verwendet werden, um den MinSoC der Batterie einzustellen, das dynamische "intelligente Batteriemanagement" des Konverters zu aktivieren oder zu deaktivieren (beides erfolgt intern durch den Adapter) oder andere Geräte im Haushalt zu steuern, z. B. Heizung, Waschmaschine, Trockner, Geschirrspüler usw. (durch externes JavaScript/Blockly des Benutzers).

### plenticore.0.forecast.consumption

`plenticore.0.forecast.consumption.day` - aktueller durchschnittlicher Stromverbrauch tagsüber während der letzten 3 Tage\
`plenticore.0.forecast.consumption.night` - Aktueller durchschnittlicher Stromverbrauch während der Nacht in den letzten 3 Tagen\
`plenticore.0.forecast.consumption.remaining` - geschätzter verbleibender Stromverbrauch für den aktuellen Prognosetag bis Sonnenuntergang

### plenticore.0.forecast.current

`plenticore.0.forecast.current.power.generated` - erzeugte Kraftwerksleistung am heutigen Tag bis zur aktuellen Zeit\
`plenticore.0.forecast.current.power.max` - berechnete maximale Anlagenleistung bei klarem Himmel (0 % Wolkenbedeckung)\
`plenticore.0.forecast.current.power.sky` - berechnete Anlagenleistung unter Berücksichtigung der aktuellen Bewölkung durch Wetteradapter\
`plenticore.0.forecast.current.power.skyvis` - berechnete Anlagenleistung unter Berücksichtigung der aktuellen Wolkenbedeckung und Sichtverhältnisse durch Wetteradapter\
`plenticore.0.forecast.current.power.skyvisrain` - berechnete Anlagenleistung unter Berücksichtigung der aktuellen Bewölkung, Sichtweite und Regenvorhersage der Wetteradapter\
`plenticore.0.forecast.current.visibility.*` - die aktuelle Sichtvorhersage wird vom entsprechenden Wetteradapter bereitgestellt\
`plenticore.0.forecast.current.rain.*` - die aktuelle Regenvorhersage wird vom entsprechenden Wetteradapter bereitgestellt\
`plenticore.0.forecast.current.rainChance.*` - die aktuelle Regenwahrscheinlichkeitsvorhersage wird vom entsprechenden Wetteradapter bereitgestellt\
`plenticore.0.forecast.current.sky.*` - die aktuelle Wolkenvorhersage wird vom entsprechenden Wetteradapter bereitgestellt\
`plenticore.0.forecast.current.sky_high.*` - aktuelle Wolkenvorhersage (obere Luftschichten), bereitgestellt vom entsprechenden Wetteradapter\
`plenticore.0.forecast.current.sky_medium.*` - aktuelle Wolkenvorhersage (mittlere Luftschichten), bereitgestellt vom entsprechenden Wetteradapter\
`plenticore.0.forecast.current.sky_low.*` - aktuelle Wolkenvorhersage (untere Luftschichten), bereitgestellt vom entsprechenden Wetteradapter\
`plenticore.0.forecast.current.sun.azimuth` - aktuelle Sonnenposition (Azimut)\
`plenticore.0.forecast.current.sun.elevation` - aktuelle Sonnenposition (Höhe)

### plenticore.0.forecast.day1 – Gleiches gilt für Tag 2

`plenticore.0.forecast.day1.power.date`- Datum, für das die aktuellen Stromprognoseinformationen gelten\
`plenticore.0.forecast.day1.power.day` - Gesamtleistungsprognose für den Tag\
`plenticore.0.forecast.day1.power.day_adjusted` - Gesamtleistungsprognose für den Tag unter Berücksichtigung der bisher erzeugten Leistung und unter Verwendung von Prognosedaten nur für die verbleibenden Sonnenstunden\
`plenticore.0.forecast.day1.power.day_high` - Gesamtleistungsprognose für den Tag unter Nichtbeachtung der Sichtdaten des Wetteradapters\
`plenticore.0.forecast.day1.power.remaining` - Restleistung der für den Tag prognostizierten Gesamtleistung, basierend auf der Vorhersage für die verbleibenden Sonnenstunden\
`plenticore.0.forecast.day1.power.Xh.power` - geschätzte Gesamtleistung des Kraftwerks in der Sonnenstunde X des prognostizierten Tages, wobei 1h die Stunde des Sonnenaufgangs ist.\
`plenticore.0.forecast.day1.power.Xh.power_high` - geschätzte Gesamtleistung des Kraftwerks in der Sonnenstunde X des Vorhersagetages, jedoch ohne Berücksichtigung der Sichtweite oder der Regendaten\
`plenticore.0.forecast.day1.power.Xh.time` - die Zeit, die die Sonne zur Stunde für `plenticore.0.forecast.power.Xh.power` beginnt\
`plenticore.0.forecast.day1.sun.sunrise` - Sonnenaufgangszeit des Vorhersagedatums\
`plenticore.0.forecast.day1.sun.sunset` - Sonnenuntergangszeit des Vorhersagedatums

## Intelligente Batteriesteuerung

Die intelligente Batteriesteuerung von KOSTAL nutzt keine Wettervorhersage. Daher ist die Regelung nicht immer optimal, um einerseits eine vollständige Ladung der Batterie zu gewährleisten und andererseits Einspeisebegrenzungen bestmöglich zu vermeiden. Dieser Adapter versucht, dies zu optimieren. Hierfür stehen zwei Strategien zur Verfügung, die in den Einstellungen des Adapters ausgewählt werden können. Ist die intelligente Batteriesteuerung von KOSTAL aktiv, entscheidet sie, wann und wie viel Strom ins Netz eingespeist oder in die Batterie geladen wird. Der Adapter kann lediglich feststellen, ob die intelligente Steuerung von KOSTAL aktiv ist, nicht aber, wie sie funktioniert.

### Strategie 1: Doppeltagesprognose vs. Batteriekapazität

Kurzbeschreibung: KOSTAL Smart Management wird aktiviert, wenn (der minimale SoC erreicht ist) UND (die verbleibende Leistung bis Sonnenuntergang - der verbleibende Verbrauch - die freie Batteriekapazität) >= 2 \* Batteriekapazität.

### Strategie 2: Verbleibende Prognose vs. Verbrauch und freie Batteriekapazität

Das KOSTAL Smart Management wird nur aktiviert, wenn (gemäß der Prognose) beide der folgenden Bedingungen erfüllt sind:

- Es gibt mindestens eine Stunde, in der die Einspeisegrenze überschritten wird (ansonsten benötigen Sie das Smart Management nicht, da alles in das Netz eingespeist werden kann).
- Vermutlich steht tagsüber mehr Strom zur Verfügung als für den Verbrauch und das Laden der Batterie benötigt wird (ansonsten wäre der Speicherplatz in der Batterie auch ohne Smart Management den ganzen Tag über frei). Die eigentliche Steuerung ist etwas komplexer, da sie auch verhindert, dass die intelligente Steuerung viele Male ein- und ausgeschaltet wird.

Details:

- Wenn alle stündlichen Vorhersagewerte unter dem Wert für die maximale Einspeisung liegen, wird die KOSTAL-Steuerung nicht aktiviert. Die maximale Einspeisung wird um 15 % niedriger angesetzt, um durch Bewölkung verursachte Schwankungen zu berücksichtigen.
- Zwischen 15:00 Uhr und Sonnenaufgang werden die Einstellungen der KOSTAL-Smart-Steuerung nicht verändert. Die KOSTAL-Steuerung scheint besser zu funktionieren, wenn sie nicht unnötig oft ein- und ausgeschaltet wird. In diesem Zeitraum hat die KOSTAL-Steuerung keine Nachteile.
- Durch eine Hysterese werden die Ein- und Ausschalthäufigkeit reduziert. Das Gerät schaltet sich aus, wenn der aktuelle Ladezustand (SoC) unter dem Wert für die Aktivierung des Batteriemanagements liegt oder die verfügbare Restenergie unter 0 sinkt. Es schaltet sich ein, wenn der aktuelle Ladezustand über dem Wert für die Aktivierung des Batteriemanagements + 1 liegt und die verfügbare Restenergie mehr als 10 % der Batteriekapazität beträgt.

## Spenden

[![PayPal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=SFLJ8HCW9T698\&source=url)

## Changelog

### 2.3.1
- Added further option to control battery management [PastCoder]

### 2.3.0
- (Jey Cee) Added possibility to control battery charging

### 2.2.2
- Added alternative smart battery strategy (Description see above) [PastCoder]

### 2.2.1
- Fixed forecast zickzack [PastCoder]

### 2.2.0
- Fixed state value types for new version of js-controller  
  Warning: Please delete state object scb.export.LastExportOk after update and restart adapter
- Allow providing a custom port for connection to converter
- Allow using https connection to converter
- Fixed some state object types

### 2.1.9
- Fixed met.no rain forecast value

### 2.1.8
- Update of met.no API to locationforecast 2.0
- Removed xml2js library
- Update of base library

### 2.1.7
- Updated base library to support js controller 3.2

### 2.1.6
- Copyright year updated

### 2.1.5
- Package information fixed

### 2.1.4
- Disable smart battery control as long as SoC is lower than MinSoC + 8% to avoid using grid power on consumption peaks
- Disable darksky usage (service discontinued)

### 2.1.3
-   Fixed wrong hour of weather forecast from daswetter adapter

### 2.1.2
-   Added setting for minimum SoC to enable battery management

### 2.1.1
-   Fixed problems in config and translations

### 2.1.0
-   Added further forecast sources to provide better power forecasts
-   Added second day forecast
-   Improved code and fixed some minor issues
-   New dependency for xml2js
-   Updated readme

### 2.0.0

-   Code rework
-   Outsourced many functions to libraries
-   This version has new dependencies and requires a newer adapter-core version!
-   Several fixes

### 1.1.1

-   No changes

### 1.1.0

-   Added support for weatherunderground weather adapter. The adapter can be choosen as alternative forecast source over the DarkSky adapter.

### 1.0.2

-   Fixed a warning message occuring far too often

### 1.0.1

-   Added forecast features to readme

### 1.0.0

-	Added power forecast feature

### 0.1.5

-   Added translations
-   Fixed shadow management handling.

### 0.1.4

-   Added shadow management datapoint.

### 0.1.3

-   Do not query battery values if battery management is not unlocked.

### 0.1.2

-   Resolved adapter check issues, see https://github.com/pixcept/ioBroker.plenticore/issues/1
-   Added statistics data points.

### 0.1.1

-   Removed admin adapter dependency

### 0.1.0

-   First running Version

## License

The MIT License (MIT)

Copyright (c) 2022 Marius Burkard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.