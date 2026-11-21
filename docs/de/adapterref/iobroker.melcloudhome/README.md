---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.melcloudhome/README.md
title: ioBroker.melcloudhome
hash: 21TbeszQSADnW1idYUMC8ZjSoPhUTv8cP5+f/aUKdB4=
---
![Logo](../../../en/adapterref/iobroker.melcloudhome/admin/melcloudhome.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.melcloudhome.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.melcloudhome.svg)
![Anzahl der Installationen](https://iobroker.live/badges/melcloudhome-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/melcloudhome-stable.svg)
![NPM](https://nodei.co/npm/iobroker.melcloudhome.png?downloads=true)
![Test und Freigabe](https://github.com/konrad2002/ioBroker.melcloudhome/workflows/Test%20and%20Release/badge.svg)

# ioBroker.melcloudhome

## melcloudhome-Adapter für ioBroker

Dieser Adapter verbindet [ioBroker](https://www.iobroker.net/) mit der [**MELCloud Home**](https://melcloudhome.com/) Cloud-Plattform und ermöglicht das Auslesen und Steuern von Mitsubishi Electric Luft-Luft-Klimaanlagen und Luft-Wasser-Wärmepumpen.

### Haftungsausschluss

Dies ist ein unabhängiger, von der Community entwickelter Adapter. Er wird **nicht von der Mitsubishi Electric Corporation entwickelt, empfohlen oder unterstützt** . „Mitsubishi Electric“ und „MELCloud Home“ sind Marken ihrer jeweiligen Inhaber und werden hier nur zur Beschreibung der Kompatibilität verwendet. Die Nutzung dieses Adapters und des Cloud-Dienstes MELCloud Home unterliegt den Nutzungsbedingungen von Mitsubishi Electric; die Nutzung erfolgt auf eigene Gefahr.

### Credits

Die Integration der MELCloud Home API (Anmeldevorgang, REST-Endpunkte, Echtzeit-WebSocket-Protokoll) basiert auf der Reverse-Engineering-Arbeit der Python-Bibliothek [aiomelcloudhome](https://github.com/erwindouna/aiomelcloudhome) von [erwindouna](https://github.com/erwindouna) . Dieser Adapter ist eine unabhängige TypeScript-Implementierung und steht in keiner Verbindung zu diesem Projekt.

## Merkmale

- Melden Sie sich mit Ihrem MELCloud Home-Konto (Benutzername/Passwort) an, einschließlich des vollständigen OAuth2/PKCE + Cognito-Anmeldevorgangs, der von der offiziellen App verwendet wird.
- Zyklische Abfrage aller Gebäude/Einheiten in einem konfigurierbaren Intervall.
- Optionale Echtzeit-Aktualisierungen über den MELCloud Home WebSocket, die zwischen den Abfragen angewendet werden.
- Erstellt automatisch ioBroker-Objekte für jede Luft-zu-Luft-Verbindung (`ata`) und Luft-Wasser (`atw`) Gerät, das in Ihrem Konto gefunden wurde, einschließlich Funktionen und Informationen zum Frost-/Überhitzungs-/Urlaubsmodus.
- Den Zustand der Steuereinheit direkt von ioBroker abrufen (Stromversorgung, Betriebsmodus, Zieltemperatur, Lüfterdrehzahl, Flügelpositionen, Standby-Modus usw.), indem in die entsprechenden Zustände geschrieben wird.
- Die OAuth-Sitzung wird intern gespeichert, sodass sich der Adapter nicht bei jedem Neustart erneut anmelden muss.

## Konfiguration

Öffnen Sie die Instanzeinstellungen und füllen Sie die folgenden Felder aus:

| Einstellung                                                                  | Beschreibung                                                                                                                                                  |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **MELCloud-Benutzername (E-Mail-Adresse)**                                   | Die E-Mail-Adresse, mit der Sie sich bei der MELCloud Home App anmelden.                                                                                      |
| **MELCloud-Home-Passwort**                                                   | Ihr MELCloud Home-Kontopasswort. Verschlüsselt in der Adapterkonfiguration gespeichert.                                                                       |
| **Abfrageintervall (Sekunden)**                                              | Wie oft der vollständige Status von der MELCloud Home API abgerufen werden soll (mindestens 15 Sekunden).                                                     |
| **Verwenden Sie Echtzeit-WebSocket-Aktualisierungen zwischen den Abfragen.** | Wenn diese Option aktiviert ist, werden Änderungen des Gerätestatus zusätzlich zur regulären Abfrage an ioBroker übertragen, sobald MELCloud Home sie meldet. |

## Objektbaum

Für jedes Gebäude in Ihrem Konto erstellt der Adapter Folgendes:

```
<buildingId>.ata.<unitId>.<state>              Air-to-Air unit states (power, operationMode, setTemperature, ...)
<buildingId>.ata.<unitId>.capabilities.*        Read-only unit capabilities
<buildingId>.ata.<unitId>.frostProtection.*     Read-only frost protection status
<buildingId>.ata.<unitId>.overheatProtection.*  Read-only overheat protection status
<buildingId>.ata.<unitId>.holidayMode.*         Read-only holiday mode status
<buildingId>.atw.<unitId>.<state>              Air-to-Water unit states (power, zone temperatures, ...)
```

Zustände, die im Objektbaum als beschreibbar gekennzeichnet sind, können geändert werden, um die entsprechende Einheit zu steuern; alle anderen Zustände werden automatisch von MELCloud Home aktualisiert.

## Bekannte Einschränkungen

- Frostschutz, Überhitzungsschutz und Urlaubsmodus sind derzeit nur lesbar (Informationsmodus).
- Die Energie-/Telemetriehistorie und die Endpunkte des Außentemperaturtrends werden (noch) nicht angezeigt.
- Die ATW-Durchfluss-Temperatur-Überschreibungszustände (`setHeatFlowTemperatureZone1/2`, `setCoolFlowTemperatureZone1/2`) sind im Grunde nur beschreibbar: Die API meldet sie nie zurück, daher spiegelt ihr Wert nicht den tatsächlichen Gerätezustand wider.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.2 (2026-10-25)

- (konrad2002) handle auth timeout

### 0.3.1 (2026-08-26)

- (konrad2002) fix invalid types for rssi

### 0.3.0 (2026-08-26)

- (konrad2002) use valid ioBroker roles matching declared common.type
- (konrad2002) use folders instead of channels for buildings and unit categories

### 0.2.2 (2026-08-26)

- (konrad2002) fix release notes not correctly translated ._.

### 0.2.1 (2026-08-26)

- (konrad2002) fix release pipeline

### 0.2.0 (2026-08-26)

- (konrad2002) no unreleased changes yet

### 0.1.0 (2026-08-25)

- (konrad2002) first working version: MELCloud Home login, polling, realtime WebSocket updates and control for Air-to-Air and Air-to-Water units

### 0.0.2 (2026-08-25)

- (konrad2002) fix connection issues

### 0.0.1 (2026-08-25)

- (konrad2002) initial release

## License

MIT License

Copyright (c) 2026 konrad2002 <konrad@swimresults.de>

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