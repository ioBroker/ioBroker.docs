---
chapters: {"pages":{"en/adapterref/iobroker.idm-modbus/README.md":{"title":{"en":"ioBroker.idm-modbus"},"content":"en/adapterref/iobroker.idm-modbus/README.md"},"en/adapterref/iobroker.idm-modbus/docs/en/manual.md":{"title":{"en":"ioBroker.idm-modbus – Manual"},"content":"en/adapterref/iobroker.idm-modbus/docs/en/manual.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.idm-modbus/README.md
title: ioBroker.idm-modbus
hash: suoc54wLmEDF8Z8BONMfyKCt7wdb5XvybWdM4ozizjE=
---
![Logo](../../../en/adapterref/iobroker.idm-modbus/admin/idm-modbus.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.idm-modbus.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.idm-modbus.svg)
![Anzahl der Installationen](https://iobroker.live/badges/idm-modbus-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/idm-modbus-stable.svg)
![NPM](https://nodei.co/npm/iobroker.idm-modbus.png?downloads=true)
![Test und Freigabe](https://github.com/seaspotter/ioBroker.idm-modbus/workflows/Test%20and%20Release/badge.svg)

# ioBroker.idm-modbus

## idm-modbus-Adapter für ioBroker

Verbindet [IDM](https://www.idm-energie.at) -Wärmepumpen (iDM Energiesysteme) mit Navigator-Steuerung lokal über Modbus TCP mit ioBroker: Lesen, Steuern und Einspeisen von Raum-, PV- und Gebäudeautomationswerten. Keine Cloud-Anbindung, eine Adapterinstanz pro Wärmepumpe.

**Handbuch:** [Englisch](/#/docs/adapterref/iobroker.idm-modbus/docs/en/manual.md) · [Deutsch](https://github.com/seaspotter/ioBroker.idm-modbus/blob/main/docs/de/handbuch.md)

> **Status: Frühe Entwicklung.** Navigator 2.0 (Pro) wurde an einem realen Gerät auf Lese- und Schreibvorgänge getestet. Navigator 10 läuft in einer Testanlage (Lesen, PV- und Raumtemperaturregelung); die Weboberfläche und Navigator 1.7 basieren auf den IDM-Dokumenten und sind ungetestet. Steuerung, PV-, Raumtemperatur- und Gebäudeautomation sowie die Weboberfläche sind standardmäßig deaktiviert.

### Merkmale

- **Liest ca. 650 dokumentierte Register** (Temperaturen, Status, Pumpen, Ventile, Energie, Solar, ISC, Kaskade, Bivalenz, PV-Werte, Heizkreise A–G, Zonenmodule mit jeweils bis zu 8 Räumen) in vier Abfragegruppen, mit einer seriellen Verbindung, einer Pause zwischen den Anfragen und einem Keepalive: Der Navigator bleibt bei hartem Polling stehen und schließt inaktive Verbindungen nach etwa 10 Sekunden.
- **Gerätescan und -erkennung:** _Die Testverbindung_ zeigt die Außentemperatur an und erkennt die Navigator-Generation; _Das Scangerät_ liest jedes Register einmal (nur Leseanforderungen, ca. 3 Minuten, mit Fortschrittsanzeige) und _die Anwendung von Vorschlägen_ füllt die Installation aus (Heizkreise, Zonenmodule, Blöcke).
- **Saubere Objektstruktur:** Zustände werden angezeigt, wenn der Navigator einen realen Wert meldet, keine leeren Zustände für Hardware, die Sie nicht besitzen; Namen in 11 Sprachen; Temperaturen und Zähler mit einer Dezimalstelle; Fehlernummern als Text.
- **Statistiken:** COP und jährlicher Leistungsfaktor, Energieverbrauch pro Betriebsart, Kosten und CO₂ (fix oder aus einem Staat), Betriebsstunden, Starts und Abtauvorgänge, optionale externe Strom- und Wärmezähler; plus Laufzeit-, Wärme- und Stromverbrauchsstatistiken von den Webseiten des Navigators.
- **Steuerung** (standardmäßig deaktiviert, pro Gruppe): Systemmodus, Warmwasser, Heizkreise, Raumsollwerte und -modi (Navigator Pro), Solar-, Zweiwert- und Kaskadenbetrieb sowie eine einmalige Warmwasserbereitung. Jeder Wert wird geprüft, begrenzt, ausgelesen und gezählt; EEPROM-Schutz ist vorhanden.
- **Datenfeedback von ioBroker** (standardmäßig deaktiviert): PV-Werte, Raumtemperaturen und Gebäudeautomationswerte, mit Skalierung, Grenzwerten, Altersprüfungen und Zweitschreiberkennung.
- **Webinterface** (optional, PIN): Die Ein- und Ausgänge des Navigators (Navigator 2.0/Pro über PHP-Seiten, Navigator 10 über WebSocket) sowie, beim Navigator 2.0/Pro, Raumnamen, Heizkreisnamen und Raumdaten. Modbus-Werte haben Vorrang; der Navigator 1.0/1.7 verfügt über kein Webinterface. Der Webinterface-Teil wird nur mit der Navigator-Sprache Deutsch getestet und unterstützt; alle Modbus-Funktionen sind sprachunabhängig.
- **Wärmepumpendiagramm:** Eine schreibgeschützte Webseite (ein Link neben der Instanz, bereitgestellt vom Webadapter) mit einer Live-Ansicht Ihrer Anlage: Wärmepumpe (Luft- oder Erdwärme), Speicher, Frischwasserstation, Heizkreisläufe mit zugehörigen Räumen, Solaranlage, Photovoltaikanlage. Die Abbildung erstellt sich automatisch aus den vom Adapter erfassten Werten und zeigt die IDM-Messpunkte (B33, B48, ...) an.
- **Supportdatei** mit einem Klick, ohne Host, PIN oder Adressen.

### Anforderungen

Zwei Dinge müssen einmalig auf dem Navigator eingerichtet werden, in der Regel auf Ebene des Installateurs/Servicepartners. Fragen Sie daher Ihren Installateur, wenn Sie ihn nicht erreichen können:

1. **Modbus TCP** ist standardmäßig deaktiviert: Hauptmenü _Einstellungen_ → _Gebäudetechnik_ → _Modbus TCP_ _aktivieren_ und dem Navigator eine feste IP-Adresse zuweisen. Ohne diese Einstellung funktioniert nichts.
2. **Netzwerk-PIN** – nur für die optionale Webschnittstelle. Der Adapter funktioniert auch ohne sie.

Der Adapter versucht nicht, Installationsfunktionen freizuschalten oder diese Einstellungen selbst zu ändern.

Das Wärmepumpendiagramm wird vom ioBroker **-Webadapter** bereitgestellt und benötigt daher eine Webadapterinstanz. Alles andere funktioniert auch ohne diese.

### Danksagungen

Ein großes Dankeschön an [Xerolux](https://github.com/Xerolux) für seine umfangreiche Arbeit an IDM Modbus, den Projekten [idm-heatpump-api](https://github.com/Xerolux/idm-heatpump-api) und [idm-heatpump-hass](https://github.com/Xerolux/idm-heatpump-hass) (MIT). Sie dienen diesem Adapter als sekundäre Referenz für Registerdefinitionen, Batchverarbeitung und EEPROM-Schutz und sind die beste zweite Meinung, wenn die IDM-Dokumentation Fragen offen lässt.

### Haftungsausschluss

Dies ist ein unabhängiges Community-Projekt. IDM und Navigator sind Marken ihrer jeweiligen Inhaber; das Projekt steht in keiner Verbindung zu IDM Energiesysteme GmbH und wird von dieser auch nicht unterstützt.

## Wärmepumpendiagramm

Eine Live-Abbildung Ihrer Anlage auf einer Webseite, basierend auf den Messwerten des Adapters (Beispielwerte siehe unten). Die Rohre sind farbig dargestellt und bewegen sich nur dort, wo im aktuellen Betriebsmodus Wasser fließt: Orange steht für den Warmwasservorlauf, blau für den Rücklauf und im Kühlbetrieb für das Kaltwasser; ein dünnes graues Rohr führt kein Wasser. Bewegen Sie den Mauszeiger über eine Beschriftung, um den Namen des IDM-Messpunkts anzuzeigen. Informationen zu den Einstellungen und allen Bauteilen sowie zur Darstellung im Diagramm bei reiner Modbus-Auslesung (ohne Webinterface) finden Sie im [Handbuch](/#/docs/adapterref/iobroker.idm-modbus/docs/en/manual.md#8a-heat-pump-diagram) .

![Heizung](https://raw.githubusercontent.com/seaspotter/ioBroker.idm-modbus/main/docs/images/en/diagram-heating.png)

![Kühlung](https://raw.githubusercontent.com/seaspotter/ioBroker.idm-modbus/main/docs/images/en/diagram-cooling.png)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.2 (2026-11-18)

- (SeaSpotter) unused objects are no longer deleted when they have custom settings (history, logging); they are kept and a warning names them (only relevant with "remove inactive states" switched on)
- (SeaSpotter) source states of the PV, room, building automation and statistics tabs are only used with the confirmed flag (ack = true); a state written with ack = false is ignored and the log names it once. Scripts must write source states with ack = true; the support file shows how many source states were ignored for that reason

### 0.2.1 (2026-11-16)

- (SeaSpotter) Navigator 10: the heat sink temperatures, the flow rate (B2) and the groundwater temperatures show no value instead of -1 or 0 on plants that do not have these sensors (no separating heat exchanger, no groundwater source)

### 0.2.0 (2026-11-16)

- (SeaSpotter) web interface: the settings and the manuals say clearly that this part is only tested and supported with the Navigator language set to German; the adapter logs a warning once when the statistics use names it does not know; code clean-up

### 0.1.21 (2026-11-13)

- (SeaSpotter) Navigator 10: the heat sink flow rate (B2, register 1072) is read as the floating point value the controller delivers instead of one word of it, so it no longer jumps to values like 41699 or 680000 l/min

### 0.1.20 (2026-11-12)

- (SeaSpotter) inputs and outputs of the web interface: a copy created while Modbus had no value (for example `analog_out.m73` while the charging pump stands, reported as -1) now stays current when Modbus delivers the part later, instead of freezing at its first value

### 0.1.19 (2026-11-09)

- (SeaSpotter) photovoltaics: no false "another energy manager seems to write them too" warning any more while the battery level -1 (not available) is written
- (SeaSpotter) Navigator 10: the changeover valve of the heating circuit (M61, register 1110) shows Heating / Cooling instead of 0 / 1

### 0.1.18 (2026-10-28)

- (SeaSpotter) photovoltaics: fixed an endless restart loop at the first start after updating from version 0.1.15 or older (the old PV table was not emptied, so it moved again and again)

### 0.1.17 (2026-10-26)

- (SeaSpotter) diagram: the page no longer stays stale after the connection to the web adapter was interrupted: it shows the current values again after a reconnect (before, only values that changed again were updated), compares all values with the server every minute, tries a failed load again, reopens a connection that stops answering and refreshes when a tab in the background becomes visible
- (SeaSpotter) PV settings: larger block headings, the battery level block lines up with the others

### 0.1.16 (2026-10-25)

- (SeaSpotter) photovoltaics: a fixed block per register instead of a table (a block without a source state sends nothing; the electric heating rod 76 is not offered, the Navigator delivers it itself); existing rows move into the blocks at the first start
- (SeaSpotter) photovoltaics: a source that is missing or too old is written as 0 (battery level -1, not available) so that the Navigator keeps receiving every configured value; warnings at the start for what is not set up
- (SeaSpotter) decimals typed with a point or a comma work in all factor, offset, tolerance, limit and price fields (the number field removed the point while typing); a limit can be cleared by emptying the field

### 0.1.15 (2026-10-20)

- (SeaSpotter) the objects of the web interface (inputs and outputs, rooms) follow the current wording after an update: a renamed part such as the station pump M22 ("Pump hot water station") now also changes on installations that created it earlier (before, only new installations got the name)

### 0.1.14 (2026-10-19)

- (SeaSpotter) diagram: with Modbus only (no web interface) the diagram draws from the best information left and claims no more than it knows: the fresh water station and circuits without a pump state are coloured but not animated, and the dot of such a circuit shows its operating mode; the manuals list what is missing without the web interface

### 0.1.13 (2026-10-16)

- (SeaSpotter) diagram: the heating circuits keep drawing from the heating buffer while the heat pump is off or defrosting, so their pipes show the flow while the circuit pump runs
- (SeaSpotter) diagram: the pipes along the heating circuits flow only as far as the lowest running circuit; the dot on a circuit card is green while the circuit pump runs (not merely while the circuit is in heating mode)
- (SeaSpotter) diagram: the fresh water station box is taller, has its title on top like the other cards and its heat exchanger stands in the middle; the actor M22 is named "Pump hot water station" (Pumpe Warmwasserstation) instead of "Fresh water station"

### 0.1.12 (2026-10-16)

- (SeaSpotter) diagram: a pipe and the label on it are coloured only while water really flows through it; a pipe whose pump is off, or that the operating mode does not use, stays grey

### 0.1.11 (2026-10-16)

- (SeaSpotter) diagram: the flow in a heating circuit follows its pump (M31, M32, ...) instead of its operating mode; the white flow dashes show only while a pipe actually flows

### 0.1.10 (2026-10-16)

- (SeaSpotter) new adapter logo; the fan in the diagram has five blades
- (SeaSpotter) diagram: the pipes of an idle fresh water station, boiler, stove and cascade stay grey; a mixer that reports "Zu" is no longer shown as driven; hot water charging colours the pipes of a combined vessel; the solar labels follow the solar pumps; a cascade that appears later shows without reloading; the size field falls back to the default when empty; the accessibility label of the page follows the language
- (SeaSpotter) manuals: screenshots and a "how to read it" guide for the diagram; integration tests run against the released js-controller

### 0.1.9 (2026-10-16)

- (SeaSpotter) diagram: the plant is drawn by its operating mode: pipes are coloured and move while the heat pump heats, charges hot water or cools, and rest (grey) where they carry nothing; cold water is blue in both flow and return
- (SeaSpotter) diagram: two vessels for a separate heating buffer, a cold storage for cooling, hot water without a heating buffer, a storage layout setting and an adjustable size
- (SeaSpotter) diagram: pump and mixer of every heating circuit, direct circuits, heating rod stages, circulation pump, solar pumps, one dot per compressor
- (SeaSpotter) diagram: oil or gas boiler, tiled stove and cascade of heat pumps with their pipes; names appear when the mouse is over a value label
- (SeaSpotter) the plant description (heat source, hot gas line, storage, cooling, circuits, additions) is worked out from the values the Navigator reports

### 0.1.8 (2026-10-13)

- (SeaSpotter) states are never deleted any more (only switching a register off removes them); the web copy of a part appears whenever Modbus reports no value for it, fixing the missing charging pump M73

### 0.1.7 (2026-10-13)

- (SeaSpotter) diagram: new setting for the source of power and COP (Navigator or external meters, falling back to the Navigator where no external value exists), COP rows setting, thermal power shown, fan label under the icon; external electrical and thermal power as states; translations reviewed in all languages

### 0.1.6 (2026-10-13)

- (SeaSpotter) diagram: the circle of a pump symbol turns green while the pump runs, the hot gas mixer M71 and the fan M13 show as 0-100 % in the heat pump box, the hot gas line moves only while M71 is open and the water moves, the drawing is shown larger

### 0.1.5 (2026-10-13)

- (SeaSpotter) diagram: pumps (M73, M22, M31, source pumps) as a small pump symbol, green while running and grey while off
- (SeaSpotter) diagram: status of the hot gas mixer M71 and of the mixer M41 of heating circuit A; the hot gas line moves while M71 is open

### 0.1.4 (2026-10-13)

- (SeaSpotter) diagram: long labels fit instead of being cut off, wider heat pump box and heating circuit card, the dashes of the circuit pipes run through the junction, a value that appears after the page was opened (the COP) shows without reloading
- (SeaSpotter) diagram: choose the COP in the heat pump box (Navigator, external meters, both or none)

### 0.1.3 (2026-10-12)

- (SeaSpotter) diagram: the return pipe flows from the storage to the heat pump, the water pipes move with the charging pump M73 or the flow sensor B2, heat pump power with one decimal, fresh water station moved right and up

### 0.1.2 (2026-10-11)

- (SeaSpotter) fix: texts the adapter writes into states (scan status, fault texts, operating modes) now follow the system language instead of always being English
- (SeaSpotter) the unit of the price (currency or cent per kWh) and of the CO₂ factor (g or kg per kWh) can be chosen, for the fixed value and for the state
- (SeaSpotter) the scan status text stands next to the progress

### 0.1.1 (2026-10-11)

- (SeaSpotter) maintenance: the web adapter is listed as a requirement of the heat pump diagram, consistent German name of the diagram, safer translation tooling

### 0.1.0 (2026-10-11)

- (SeaSpotter) initial release: reads the IDM Navigator over Modbus TCP (Navigator 2.0 / Pro verified on a device; Navigator 10 and 1.0/1.7 from the IDM documents, untested), with device scan, statistics, optional control, PV and room feeding, optional web interface values and a live heat pump diagram, texts in 11 languages

Older changes are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 SeaSpotter <seatowage@gmail.com>

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