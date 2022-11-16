---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.plenticore/README.md
title: ioBroker.plenticore
hash: MYjfwSdN3P5i/uZkVuIQGEgFVoIL99N3czASpakjnlU=
---
![Logo](../../../en/adapterref/iobroker.plenticore/admin/plenticore.png)

![Anzahl der Installationen](http://iobroker.live/badges/plenticore-installed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.plenticore.svg)
![NPM](https://nodei.co/npm/iobroker.plenticore.png?downloads=true)
![Stabil](http://iobroker.live/badges/plenticore-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.plenticore.svg)
![Build-Status](https://travis-ci.org/StrathCole/ioBroker.plenticore.svg?branch=master)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

Eine deutsche Beschreibung ist [hier zu finden](https://github.com/StrathCole/ioBroker.plenticore/blob/master/README_de.md).

# IoBroker.plenticore
Ein ioBroker Adapter für KOSTAL Plenticore Plus Wechselrichter (z. B. Plenticore Plus 8.5)

Dieser Adapter greift über die interne Weboberfläche des Wechselrichters auf die Eigenschaften und Einstellungen Ihres Wechselrichters und angeschlossener Geräte (z. B. Batterie oder Smart Energy Meter) zu. Um den Adapter verwenden zu können, muss die ioBroker-Instanz mit dem Netzwerk verbunden sein, in dem sich Ihr KOSTAL Plenticore befindet.

Dieser Adapter ist KEIN offizielles Produkt von KOSTAL und wird von KOSTAL weder unterstützt noch empfohlen. Es ist ein privates Projekt, das sich noch in einem frühen Entwicklungsstadium befindet, also auf eigene Gefahr!

## Konfig
Stellen Sie die IP-Adresse Ihres Wechselrichters (z. B. 192.168.0.23) und Ihr Passwort ein, mit dem Sie sich als Anlagenbesitzer mit der Weboberfläche des Wechselrichters verbinden. Das Polling-Intervall wird in Millisekunden angegeben (d. h. 10000 sind 10 Sekunden).

##Adapter
Der Adapter verwendet kein Screenscraping. Es verwendet dieselbe REST-API wie die Webschnittstelle. Möglicherweise gibt es (viele) Funktionen, die vom Adapter (noch) nicht verwendet werden.

### Warum nicht (einfach) Modbus verwenden?
Der Wechselrichter hat Modbus TCP aktiviert, sodass Sie den Modbus-Adapter verwenden können, um Werte abzufragen. KOSTAL hat jedoch keine Modbus-Adressen schreiben lassen. Sie können also nicht e einstellen. g. Akku-Mindest-SoC mit ioBroker.

### Verwenden des Adapters
Der Adapter sollte einige Objekte unter dem plenticore.X-Objektbaum füllen. Einige davon sind schreibgeschützt, z. g. die aktuelle PV-Leistung oder den Hausstromverbrauch. Andere sind veränderbar, z. g. der minimale SoC des Akkus oder die Akkuverwaltungsmodi. Ich habe den Adapter am Plenticore Plus 10 getestet.

## Objekte
Nachfolgend ein Auszug der wichtigsten Objekte, die von diesem Adapter verwendet und gefüllt werden. Alle mit `[**]` markierten Einstellungen sollten editierbar sein, aber nicht alle wurden getestet und es könnten Fehler vorhanden sein.

### Plenticore.X.Geräte.lokal
Der Devices.local-Baum enthält Informationen über den Wechselrichter und den möglicherweise angeschlossenen intelligenten Energiezähler und / oder die Batterie.

`plenticore.X.devices.local.Dc_P` - die aktuelle DC-Leistung inklusive der selbst genutzten Leistung des Wechselrichters. Dieser Wert sollte in der Nähe des Wertes von `plenticore.X.devices.local.ac.P` liegen (ca. +30-40W) `plenticore.X.devices.local.Pv_P` - der aktuell erzeugten PV-Leistung. Dieser Wert wird vom Adapter durch Summieren der pvx.P-Werte berechnet.
`plenticore.X.devices.local.Home_P` - der aktuell verbrauchte Gesamthausstrom `plenticore.X.devices.local.HomeBat_P` - der aktuell von der Batterie bereitgestellte Hausstrom `plenticore.X.devices.local.HomePv_P` - der aktuell direkt von der Anlage bereitgestellte Hausstrom `plenticore.X.devices.local.HomeGrid_P` - das aktuelle Haus vom Netz bereitgestellte Leistung `plenticore.X.devices.local.ToGrid_P` - die aktuell ins Netz eingespeiste Leistung. Dieser Wert wird vom Adapter berechnet und ist möglicherweise nicht 100 % genau.
`plenticore.X.devices.local.LimitEvuAbs` - die berechnete Stromgrenze der Leistung, die den Konverter verlassen darf. Wenn die Anlage mehr Strom erzeugt, geht dieser verloren.
`plenticore.X.devices.local.StateKey0` - wenn wahr, wurde das Batteriemanagement des Wechselrichters entsperrt

#### Plenticore.X.devices.local.ac
Dieser Kanal enthält Informationen über die AC-Seite des Wechselrichters. Die wichtigsten sind: `plenticore.X.devices.local.ac.Frequency` - die Netzfrequenz `plenticore.X.devices.local.ac.L1_P` - die aktuelle Leistung Phase 1 in W `plenticore.X.devices.local.ac.L2_P` - die aktuelle Leistung Phase 2 in W `plenticore.X.devices.local.ac.L3_P` - die aktuelle Leistung der Phase 3 in W `plenticore.X.devices.local.ac.P` - die aktuelle vom Wechselrichter abgegebene Gesamtleistung inklusive Batterieentladung

#### Plenticore.X.Geräte.lokaler.Akku
`plenticore.X.devices.local.battery.Cycles` - die bisherige Lebensdauer der Batteriezyklen `[**] plenticore.X.devices.local.battery.DynamicSoc` - wahr, wenn dynamisches SoC aktiviert ist (nur wenn `SmartBatteryControl` ebenfalls wahr ist) `[**] plenticore.X.devices.local.battery.MinHomeConsumption` - der minimale Heimstromverbrauch, der wird für den zu verwendenden Akku benötigt `[**] plenticore.X.devices.local.battery.MinSoc` - der gewünschte minimale SoC (State of Charge) des Akkus. Bei fehlender Sonnenenergie könnte der tatsächliche SoC darunter liegen.
`plenticore.X.devices.local.battery.MinSocDummy` - Dieser Wert wird vom Adapter gesetzt, wenn das MinSoC-Management in der Config deaktiviert ist. Es soll zeigen, auf welchen Wert der MinSoC gesetzt würde.
`plenticore.X.devices.local.battery.P` - die aktuelle Akkuleistung (negativ beim Laden, positiv beim Entladen) `plenticore.X.devices.local.battery.Charge_P` - die aktuelle Akkuladeleistung (0 beim Entladen) `plenticore.X.devices.local.battery.Discharge_P` - die aktuelle Akkuentladeleistung (0 beim Laden ) `[**] plenticore.X.devices.local.battery.SmartBatteryControl` - wahr, wenn das intelligente Batteriemanagement aktiviert ist. Gemäß dem offiziellen Handbuch darf dies nur aktiviert werden, wenn keine weitere AC-Quelle wie ein zweiter Wechselrichter beteiligt ist `[**] plenticore.X.devices.local.battery.ExternControl` - 0 zum Aktivieren der internen Steuerung, 1 für externe digitale E/A, 2 für externes Modbus TCP §§SSSSS_11§ § - der aktuelle Ladezustand der Batterie

#### Plenticore.X.Geräte.lokaler.Wechselrichter
`plenticore.X.devices.local.inverter.MaxApparentPower` - die maximale Leistung, die der Wechselrichter liefern kann

#### Plenticore.X.devices.local.pv1 / pv2 / pv3
`plenticore.X.devices.local.pvX.P` - die aktuelle Leistung, die von Phase X der Anlage bereitgestellt wird

### Plenticore.X.scb
Dieser Kanal enthält Informationen und Einstellungen des Geräts selbst

#### Plenticore.X.scb.modbus
`[**] plenticore.X.scb.modbus.ModbusEnable` - wahr, wenn das Modbus-TCP aktiviert ist. `[**] plenticore.X.scb.modbus.ModbusUnitId` - Modbus-Unit-ID des Geräts

#### Plenticore.X.scb.network
`[**] plenticore.X.scb.network.Hostname` - der aktuelle Hostname des Wechselrichters `[**] plenticore.X.scb.network.IPv4Auto` - DHCP verwenden, um die IP-Adresseinstellungen für den Wechselrichter bereitzustellen `[**] plenticore.X.scb.network.IPv4Address` - die aktuelle IP-Adresse des Wechselrichters `[**] plenticore.X.scb.network.IPv4DNS1` und § §SSSSS_4§§ - die aktuell verwendeten DNS-Server `[**] plenticore.X.scb.network.IPv4Gateway` - das aktuell verwendete Netzwerk-Gateway `[**] plenticore.X.scb.network.IPv4Subnetmask` - die Netzwerk-Subnetzmaske

#### Plenticore.X.scb.time
`[**] plenticore.X.scb.time.NTPservers` - die aktuell verwendeten Zeitserver (NTP). Das können mehrere sein, die durch Leerzeichen getrennt sind.
`[**] plenticore.X.scb.time.NTPuse` - Verwenden Sie NTP, um die aktuellen Zeiteinstellungen des Geräts festzulegen. `[**] plenticore.X.scb.time.Timezone` - Die Zeitzone des Geräts

### Plenticore.X.scb.statistic.EnergyFlow
Die Datenpunkte in diesem Abschnitt enthalten die Statistiken, die in der Plenticore Web-Benutzeroberfläche sichtbar sind. Im Folgenden werden nur die `Day` Datenpunkte erwähnt, aber jeder davon ist auch für `Month`, `Year` und `Total` verfügbar.

`plenticore.0.scb.statistic.EnergyFlow.AutarkyDay` - die Autarkie in Prozent für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.CO2SavingDay` - die geschätzte CO2-Einsparung in kg für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeDay` - der gesamte Hausverbrauch in Wh für den aktuellen Tag §§SSSSS_3§ § - der gesamte von der PV-Anlage bereitgestellte Eigenverbrauch für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeBatDay` - der gesamte von der Batterie bereitgestellte Eigenverbrauch für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyHomeGridDay` - der gesamte vom Stromnetz bereitgestellte Eigenverbrauch für den aktueller Tag `plenticore.0.scb.statistic.EnergyFlow.EnergyToGridDay` - die Gesamtleistung, die für den aktuellen Tag ins Stromnetz eingespeist wird `plenticore.0.scb.statistic.EnergyFlow.OwnConsumptionRateDay` - die Eigenverbrauchsrate (erzeugte Anlagenleistung, die NICHT ins Netz eingespeist wird) für den aktuellen Tag `plenticore.0.scb.statistic.EnergyFlow.YieldDay` - der Gesamtertrag der Anlage für den aktuellen Tag

## Prognosedaten
Die Leistungsvorhersagefunktion verwendet verschiedene Wetterdatenquellen. Es funktioniert sofort, aber Sie können die Ergebnisse verbessern, indem Sie Instanzen von einem oder mehreren der folgenden Wetteradapter hinzufügen: ioBroker.darksky, ioBroker.weatherunderground, ioBroker.daswetter. Damit die Funktion funktioniert, müssen Sie die globale Geoposition des Systems (Längen- und Breitengrad) konfiguriert haben und die erweiterte Konfiguration des Plenticore-Adapters (Panel- und Batteriedaten, falls zutreffend) einstellen.

### Wie funktioniert die Prognose
Die Prognosefunktion berechnet anhand der bereitgestellten Daten Ihres Kraftwerks und Ihrer Batterie die maximal mögliche Stromerzeugung zu jeder Tageszeit. Dazu wird der Standort des Systems verwendet, um die Höhe und den Azimut der Sonne abzurufen und die Werte der Sonnenstrahlung zu berechnen. Diese Werte werden mit Wettervorhersagedaten aus verschiedenen Quellen kombiniert, um die Vorhersage für Bewölkung, Nebel und Regen für jede Stunde des Tages zu erhalten. Anhand dieser Daten errechnet der Adapter eine mögliche Leistung, die die Pflanze pro Stunde Sonnenlicht erzeugen könnte.

Die Prognosewerte können dann verwendet werden, um den MinSoC der Batterie einzustellen, das dynamische "intelligente Batteriemanagement" des Wandlers zu aktivieren oder zu deaktivieren (beides erfolgt intern durch den Adapter) oder andere Geräte im Haushalt zu steuern, z. g. Heizung, Waschmaschine, Trockner, Geschirrspüler etc. (erfolgt durch externes JavaScript/Blockly des Benutzers).

### Plenticore.0.Verbrauchsprognose
`plenticore.0.forecast.consumption.day` - aktueller durchschnittlicher Stromverbrauch tagsüber während der letzten 3 Tage `plenticore.0.forecast.consumption.night` - aktueller durchschnittlicher Stromverbrauch während der Nacht während der letzten 3 Tage `plenticore.0.forecast.consumption.remaining` - geschätzter verbleibender Stromverbrauch für den aktuellen prognostizierten Tag bis zum Sonnenuntergang

### Plenticore.0.Prognose.aktuell
`plenticore.0.forecast.current.power.generated` - erzeugte Anlagenleistung am aktuellen Tag bis zur aktuellen Uhrzeit `plenticore.0.forecast.current.power.max` - berechnete maximale Anlagenleistung bei klarem Himmel (0% Bewölkung) `plenticore.0.forecast.current.power.sky` - berechnete Anlagenleistung unter Berücksichtigung aktueller Bewölkung ab Wetteradapter `plenticore.0.forecast.current.power.skyvis` - Berechnete Anlagenleistung unter Berücksichtigung der aktuellen Bewölkung und Sicht von Wetteradaptern `plenticore.0.forecast.current.power.skyvisrain` - Berechnete Anlagenleistung unter Berücksichtigung der aktuellen Bewölkung, Sicht und Regenvorhersage von Wetteradaptern `plenticore.0.forecast.current.visibility.*` - aktuelle Sichtweitenvorhersage des entsprechenden Wetteradapters `plenticore.0.forecast.current.rain.*` - aktuelle Regenvorhersage des entsprechenden Wetteradapters `plenticore.0.forecast.current.rainChance.*` - aktuelle Regenwahrscheinlichkeitsvorhersage des entsprechenden Wetteradapters `plenticore.0.forecast.current.sky.*` - aktuelle Wolkenvorhersage bereitgestellt durch den entsprechenden Wetteradapter `plenticore.0.forecast.current.sky_high.*` - aktuelle Wolkenvorhersage (obere Luftschichten) bereitgestellt durch den entsprechenden Wetteradapter `plenticore.0.forecast.current.sky_medium.*` - aktuelle Wolkenvorhersage (mittlere Luftla Jahre) vom jeweiligen Wetteradapter bereitgestellt `plenticore.0.forecast.current.sky_low.*` - aktuelle Wolkenvorhersage (untere Luftschichten) vom jeweiligen Wetteradapter bereitgestellt `plenticore.0.forecast.current.sun.azimuth` - aktueller Sonnenstand (Azimut) `plenticore.0.forecast.current.sun.elevation` - aktueller Sonnenstand ( Höhe)

### Plenticore.0.forecast.day1 – Gleiches gilt für Tag2
`plenticore.0.forecast.day1.power.date` - Datum der aktuellen Leistungsprognose für `plenticore.0.forecast.day1.power.day` - Gesamtleistungsprognose für den Tag `plenticore.0.forecast.day1.power.day_adjusted` - Gesamtleistungsprognose für den Tag unter Berücksichtigung der bisher erzeugten Leistung und unter Verwendung von Prognosedaten nur für verbleibende Sonnenstunden `plenticore.0.forecast.day1.power.day_high` - Gesamtleistungsvorhersage für den Tag ohne Berücksichtigung der Sichtdaten des Wetteradapters `plenticore.0.forecast.day1.power.remaining` - verbleibende Leistung der Vorhersagegesamtleistung für den Tag, basierend auf der Vorhersage für verbleibende Sonnenstunden `plenticore.0.forecast.day1.power.Xh.power` - geschätzte Gesamtleistung der Anlage zur Sonnenstunde X des prognostizierten Tages, wobei 1h die Stunde des Sonnenaufgangs ist `plenticore.0.forecast.day1.power.Xh.power_high` - geschätzte Gesamtleistung der Anlage zur Sonnenstunde X des prognostizierten Tages, jedoch ohne Berücksichtigung der Sicht oder Regendaten `plenticore.0.forecast.day1.power.Xh.time` - Beginn der Sonnenstunde für `plenticore.0.forecast.power.Xh.power` `plenticore.0.forecast.day1.sun.sunrise` - Sonnenaufgangszeit des Vorhersagedatums `plenticore.0.forecast.day1.sun.sunset` - Sonnenuntergangszeit des Vorhersagedatums

## Intelligente Batteriesteuerung
Die smarte Batteriesteuerung von KOSTAL nutzt keine Wettervorhersage. Daher regelt es nicht immer optimal, um einerseits dafür zu sorgen, dass die Batterie voll geladen ist und andererseits eine Einspeisebegrenzung möglichst zu vermeiden.
Dieser Adapter versucht dies zu optimieren. Dafür werden zwei Strategien angeboten, die in den Einstellungen des Adapters ausgewählt werden können.
Ist die intelligente Batteriesteuerung von KOSTAL aktiv, entscheidet sie, wann und wie viel Strom ins Netz oder in die Batterie fließt. Der Adapter kann nur entscheiden, ob die KOSTAL smart control aktiv ist, nicht aber wie sie funktioniert.

### Strategie 1: Doppelte Tagesprognose vs. Batteriekapazität
Kurzbeschreibung: KOSTAL Smart Management einschalten, wenn (Mindest-SoC erreicht) UND (Restleistung bis Sonnenuntergang – Restverbrauch – freie Batteriekapazität) >= 2 * Batteriekapazität.

### Strategie 2: Restprognose vs. Verbrauch und freie Batteriekapazität
Das KOSTAL Smart Management wird nur aktiviert, wenn (laut Prognose) die beiden folgenden Bedingungen erfüllt sind:

- Es gibt mindestens eine Stunde, in der die Einspeisegrenze überschritten wird (sonst braucht man das Smart Management nicht, weil alles ins Netz eingespeist werden kann).
- Vermutlich steht tagsüber mehr Strom zur Verfügung, als für den Verbrauch tagsüber und zum Laden der Batterie benötigt wird (sonst wäre auch ohne Smart Management ganztägig Platz in der Batterie frei)

Die eigentliche Steuerung ist etwas komplexer, da sie auch verhindert, dass die intelligente Steuerung viele Male ein- und ausgeschaltet wird.

Einzelheiten:

- Sind alle stündlichen Prognosewerte kleiner als „Maximale Einspeisung“, wird die KOSTAL-Regelung nicht aktiviert. Die maximale Einspeisung wird um 15 % niedriger angenommen, um Schwankungen durch Wolken vorzubeugen.
- Zwischen 15 Uhr und Sonnenaufgang wird die Einstellung der KOSTAL smart control nicht verändert. Die KOSTAL-Steuerung scheint besser zu funktionieren, wenn sie nicht unnötig oft ein-/ausgeschaltet wird. In dieser Zeit hat die KOSTAL-Regelung keinen Nachteil.
- Eine Hysterese wird verwendet, um seltener ein-/auszuschalten. Es schaltet sich aus, wenn der aktuelle SoC unter dem „Mindest-SoC zur Aktivierung des Batteriemanagements“ liegt oder wenn die freie Leistung unter 0 liegt. Es wird eingeschaltet, wenn der aktuelle SoC größer als „Mindest-SoC zur Aktivierung des Batteriemanagements“ +1 ist und die freie Energie ist größer als 10 % der Batteriekapazität.

## Spenden
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=SFLJ8HCW9T698&source=url)

## Changelog

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

-   Resolved adapter check issues, see https://github.com/StrathCole/ioBroker.plenticore/issues/1
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