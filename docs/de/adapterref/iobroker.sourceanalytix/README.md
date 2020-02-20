---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sourceanalytix/README.md
title: [Beta - Veröffentlicht] SourceAnalytix
hash: QBdIrwKQw8DZnNfvJrzM4brA6hx/vmBatpdePpsBsps=
---
# [Beta - Veröffentlicht] SourceAnalytix

![Tests](https://travis-ci.org/iobroker-community-adapters/ioBroker.sourceanalytix.svg?branch=master)
![Anzahl der Installationen](http://iobroker.live/badges/sourceanalytix-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sourceanalytix.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sourceanalytix.svg)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/iobroker-community-adapters/ioBroker.sourceanalytix.svg)

## Achtung, dieser Adapter benötigt Node 8 oder höher !!!
Mit ioBroker SourceAnalytix können Sie Verbrauchs-, Kosten- und Zählerwerte für Ihre Geräte nachverfolgen.
Sie benötigen Daten als Eingabe (Gesamtmenge von Wh, l / h oder m3) von Ihren Geräten und dieser Adapter wird:

* Verfolgen Sie den Verbrauch täglich, wöchentlich, monatlich, vierteljährlich, jährlich
* Kosten berechnen (aktueller Preis ist konfigurierbar)
* Kann für Stromverbrauch, Flüssigkeiten und GAS verwendet werden
* Eingabewerte können wh / kWh / m3 / l sein

## Wie man
* [ ] Machen

Dieser Adapter hat Wurzeln dank Pix im Jahr 2016 https://forum.iobroker.net/viewtopic.php?f=21&t=2262

Das wurde von @hadering verbessert und auf github https://github.com/hdering/homematic_verbrauchszaehler veröffentlicht

## Bekannte Probleme
* [] Periodenberechnung wählbar, aber noch nicht implementiert
* [] Viertel nicht berechnet
* [] monatlicher Einstandspreis noch nicht kalkuliert
* [x] Aktuelle Zählerwerte speichern, die noch nicht implementiert sind
* [x] Zählerwert wählbar, aber noch nicht implementiert
* [x] Neustart des Adapters erforderlich, um die Berechnung neuer Objekte hinzuzufügen
* [x] Statest für Kostenart Lieferung werden nicht geschrieben
* [x] Aliasname des Geräts nicht korrekt
* [x] Übersetzungen

## Machen
* [] Dokumentation
* [] Standardwert für Kosten auf 0 mit Fehlermeldung, falls nicht angegeben
* [] Neukalibrierung basierend auf Zählerwerten (konfigurierbar nach Datum)
* [] Berechnungen für Viertelwerte
* [] Objektstatus für vorherigen [x] Tag, [x] Woche, [x] Monat, [x] Quartal, [x] Jahr hinzufügen, konfigurierbar in den Adaptereinstellungen
* [] Code-Optimierung
* [x] Speicherung von Zählerwerten für jeden Zustand
* [x] Kompaktmodus
* [x] Unterstützung für die Berechnung von wh-Werten hinzufügen
* [x] Grundlegende Übersetzungen korrigieren
* [x] Bereitschaftsstatuswerte und Speicherung in Status
* [x] Zählerwert in den "Start" -Zustand schreiben, um ihn für Berechnungen zu verwenden
* [x] konfigurierbares Intervall für jeden Zustand
* [x] konfigurierbare Einheit für jeden Status
* [x] konfigurierbarer Selbstkostenpreis für jeden Staat
* [x] konfigurierbarer Einheitspreis für jeden Staat
* [x] Staat, der für Kosten oder Verdienst verwendet wird
* [x] Verbrauchsberechnung
* [x] Kostenkalkulation
* [x] einstellbarer Startpunkt der Messung
* [x] Unterstützung mehrerer Gerätezustände
* [x] Zählerwert in das Objekt schreiben, um es in Berechnungen zu verwenden
* [x] Konfiguration in den Adaptereinstellungen (derzeit werden nur Demo-Objekte von Discovery unterstützt)
* [x] temporäre Zustände für Berechnungen löschen
* [x] Berechnung für m3-Werte
* [x] Alias des Gerätenamens verwenden
* [x] konfigurierbare Datenpunkte (Ja / Nein) für Kosten, Verbrauch und Zählerwerte
* [x] Wählen Sie diese Option aus, um Analysen für das gesamte Jahr oder nur für einen auswählbaren Zeitraum zu speichern
* [x] Sicherstellen, dass alle Werte beim Herunterfahren des Adapters gespeichert werden, um Datenlücken zu vermeiden

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende übermitteln (dies ist ein persönlicher Spendenlink für DutchmanNL, kein Bezug zum ioBroker-Projekt!) [![Spenden] (https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

### 0.3.0   
* (Dutchman) m³ Implemented

### 0.2.5
* (xXBJXx) Fix wrong storage of start meter values

### 0.2.41
* (Dutchman) Fix wrong storage of daily reset of meter values

### 0.2.3
* (Xoroles & Dutchman) fix watt calculation, thank you @Xoroles !

### 0.2.29
* (Dutchman) implemented w to kWh calculations :) with thanks to @AlCalzone and @andiling !

### 0.2.276
* (Dutchman) implemented meter readings
* (Dutchman & @AlCalzone) code improvements & stability
* (Dutchman) fix issue with liquid unit reading (m3)

### 0.2.273
* (Dutchman) fix issue in daily reset of start values
* (Dutchman) Fix badges in readme
* (Dutchman) exclude calculations of w from current routines (will be implemented in next version(s)

### 0.2.272
* (Dutchman) change logic of initialisation
* (Dutchman) fix issue in calculation handling
* (Dutchman) extract unit definition to central function
* (Dutchman) removed "logging to troubleshoot", use "debug" in adapter setting

### 0.2.271
* (Dutchman) implement compact mode
* (Dutchman) fix testing issues
* (Dutchman) fix error "unit" or "tolowercase" is undefind
* (Dutchman) fixed installation issues

### 0.2.27
* (Dutchman) fixed issue related to multihost installations with slave as target

### 0.2.26
* (Dutchman) fixed issue in calculations for gas environments and liquids
* (Dutchman) improve logging related to issue analytics

### 0.2.25
* (Dutchman) add option in state setting to automatically OR manually choose the meassurement unit (for cases device state does not have correct value)

### 0.2.24
* (Dutchman) add support for heating pumps
* (Dutchman) improvements in adapter configuration screen

### 0.2.2
* (Dutchman) fixed reset of start values
* (Dutchman) removed uneeded logging "Write calculations for : "
* (Dutchman) generic improvement of logging, to see status messages activate it in adapter settings ! Otherwise onlyu erros will be shown and add/del devices
* (Dutchman) improved complete logic of state add/delete/update config in backend which will result in better performance/error handling
* (Dutchman) small fixed in configuration screen to show logging options

### 0.2.1
* (Dutchman) fixed "current_day" missing in object tree
* (Dutchman) fixed log messages "removed from SourceAnalytix"
* (Dutchman) fixed unit issue to support upper and lower case in values
* (Dutchman) fixed unit issue replace strange characters
* (Dutchman) remove intervall setting from configuraiton screen (handle by state subscribtion now!)
* (Dutchman) remove start meassurement from state configuraiton screen (not need, please use day start, week start etc !)

### 0.2.0
* (Dutchman) rebuild logic to calculate values (beta testing)
* (Dutchman) implement logic to automatically reset values by start of new day, week, month, year etc (beta testing)
* (Dutchman) changed logic from intervall polling to handle calculations based on state updates (beta testing, not if suitable for all situations)
* (Dutchman) fixed issue incorrect states are added to monitoring
* (Dutchman) fixed issue calculation not stopped when state removed from monitoring
* (Dutchman) always store all current meassurements to values of cathegorie regardless setting year etc
* (Dutchman) code cleanup and optiomalisation
* (Dutchman) added logging option "satus notification"
* (Dutchman) implement new translation mechanisme


### 0.1.9 
* (Dutchman) Adapter moved to community development tree
* (Dutchman) added npm version and test-status to readme
* (Dutchman) finalized new konfiguration screen & translations
* (Dutchman) adding/removing objects from analytix does not need adapter reboot anymore ! :-)
* (Dutchman) rebuild logic how data is handled as basic for new calculation logic (Experimental)
* (Dutchman) added options to year analytics to choose values (days,weeks,years etc)
* (Dutchman) option added for Developer logging
* (Dutchman) Basic price is currently not considered in cost calculations !
* (Dutchman) Values day start, week start etc are currenlty not automatically set (will be in 0.2.0)


### 0.1.8 (unuasable temporary verion )
* (Dutchman) konfiguration pages completly redesigned : Please do not enter values yet !
* (Dutchman) master konfiguration added to globally define costs
* (Dutchman) intervall settings moved to global setting instead of each state seperated
* (Dutchman) instead of cost-price in each state use drop down menu to choose values from global settings
* (Dutchman) fixed naming and translations

### 0.1.6
* (Dutchman) fixed data reset for quarter values (thank you Jens !)
* (Dutchman) fixed usage of alias
* (Dutchman) fixeded issue in calculation of earnings and delivery
* (Dutchman) logging improvement
* (Dutchman) fixed log messages
* (Dutchman) calculation for m3 values
* (Dutchman) calculation for l values

### 0.1.5
* (Dutchman) improved state write logic, only sent write commando when needed

### 0.1.3
* (Dutchman) add support for calculation of Wh values

### 0.1.0
* (Dutchman) first public beta release
* (Dutchman) fixed translations
* (Dutchman) rebuild calculation logic
* (Dutchman) fixed calculation of start offset
* (Dutchman) adjustable if state is used for cosumption or delivery
* (Dutchman) limited possible logging to kWh only for this moment
* (Dutchman) only create states and channels for logging types selected

### 0.0.9
* (Dutchman) fixed wrong calculation of start values
* (Dutchman) fixed wrong calculation of quarter values
* (Dutchman) prepare public beta and travis testing
* (Dutchman) change name to SourceAnalytix
* (Dutchman) implemented SourceAnalytix settings at states (equal to data logging adapters)
* (Dutchman) configurable unit for every state, automatically from object state. currently only kWh supported !

### 0.0.8
* (Dutchman) configurable intervall for every state

### 0.0.7
* (Dutchman) automated reset of start values

### 0.0.6
* (Dutchman) fixed issue with travis build
* (Dutchman) fixed wrong information in package-json

### 0.0.4
* (Dutchman) cost calculation
* (Dutchman) adjustable starting point of meassurement
* (Dutchman) support of multiple device states instead of 1
* (Dutchman) fixed calculation of current consumptions

### 0.0.3
* (Dutchman) code optimalisation

### 0.0.2
* (Dutchman) creation of object structure
* (Dutchman) first values read based on test_object.js input file to read values adn write data of current period.s

### 0.0.1
* (Dutchman) initial release

## License
MIT License

Copyright (c) 2018 Dutchman

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