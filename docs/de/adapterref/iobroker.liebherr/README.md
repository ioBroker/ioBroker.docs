---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.liebherr/README.md
title: ioBroker.liebherr
hash: hVfrVDRbDJNf0K7OaTeXq8cA5AeeFKy+3F+FKORd35Q=
---
![Logo](../../../en/adapterref/iobroker.liebherr/admin/liebherr.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.liebherr.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.liebherr.svg)
![Anzahl der Installationen](https://iobroker.live/badges/liebherr-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/liebherr-stable.svg)
![NPM](https://nodei.co/npm/iobroker.liebherr.png?downloads=true)
![Test und Freigabe](https://github.com/Gaspode69/ioBroker.liebherr/workflows/Test%20and%20Release/badge.svg)

# ioBroker.liebherr

## Liebherr-Adapter für ioBroker

Dieser Adapter verbindet ioBroker mit der offiziellen cloudbasierten [Liebherr SmartDevice HomeAPI](https://developer.liebherr.com/apis/smartdevice-homeapi) . Er erkennt kompatible Kühlschränke, Gefrierschränke und andere Geräte, die mit einem HomeAPI-API-Schlüssel verknüpft sind, und stellt die für jedes Gerät gemeldeten Funktionen bereit.

Internetzugang und ein HomeAPI-API-Schlüssel sind erforderlich. Es können nur Geräte verwendet werden, die von der SmartDevice HomeAPI zurückgegeben werden. Die separate Liebherr SmartModule LocalAPI wird nicht unterstützt und ist nicht mit der HomeAPI austauschbar.

HomeAPI ist derzeit ein Beta-Dienst, daher können sich die verfügbaren Funktionen und Antwortfelder ändern.

Liebherr und SmartDevice sind Marken von Liebherr. Dieses Projekt steht in keiner Verbindung zu Liebherr und wird von Liebherr auch nicht unterstützt.

## Anforderungen

- Ein kompatibles Liebherr-Gerät, das über die SmartDevice HomeAPI zugänglich ist.
- Ein Liebherr SmartDevice HomeAPI API-Schlüssel
- Internetzugang vom ioBroker-Host
- Node.js 22 oder neuer
- ioBroker js-controller 7.0.4 oder neuer
- ioBroker Admin 7.6.20 oder neuer

## Installation

Installieren Sie den Adapter aus der normalen Adapterliste in ioBroker Admin. Erstellen Sie eine Adapterinstanz, falls ioBroker Admin nicht automatisch eine erstellt, geben Sie den HomeAPI-API-Schlüssel in der Instanzkonfiguration ein und speichern Sie diese.

Veröffentlichen Sie API-Schlüssel nicht in Forenbeiträgen, GitHub-Issues, Screenshots oder Log-Auszügen.

## Aktueller Status

Der Adapter bietet derzeit Folgendes:

- Automatische Erkennung aller mit dem konfigurierten API-Schlüssel verknüpften Geräte
- Fähigkeitsbasierte Erstellung und Abfrage von Steuerelementen mit einem Standardintervall von 300 Sekunden
- Echtzeit-Steuerungsaktualisierungen über einen neu verbindenden SSE-Stream pro erkanntem Gerät
- Aktuelle, Ziel-, Minimal- und Maximaltemperaturen für jede gemeldete Temperaturzone
- Gemeldete Temperatureinheiten und Metadaten zu den Temperaturschritten
- Validierte Schreibvorgänge für Zieltemperaturen, Nachtmodus, Partymodus, SuperCool und SuperFrost, wenn die entsprechende Funktion gemeldet wird
- Sichere Handhabung fehlerhafter, unbekannter und zukünftiger Steuerungstypen ohne Absturz des Adapters

`TemperatureControl` Und `ToggleControl` sind derzeit zugeordnet. Die Bedienelemente für die Umschaltung sind im Geräte-Menü gruppiert. `controls` Kanal; jede gemeldete Zonenzuordnung wird in den nativen Metadaten des Objekts beibehalten. Echtzeit-Steuerungsaktualisierungen verwenden den offiziellen gerätespezifischen Server-Sent Events (SSE)-Endpunkt, während regelmäßige REST-Abfragen als Sicherheitssynchronisierung und zur Geräteerkennung aktiv bleiben.

## Einen HomeAPI-API-Schlüssel abrufen

Der API-Schlüssel wird in der offiziellen Liebherr SmartDevice App generiert.

1. Öffne die SmartDevice-App.
2. **Einstellungen** öffnen.
3. Open **HomeAPI** .
4. Generieren Sie einen neuen API-Schlüssel.
5. Kopieren Sie den Schlüssel und bewahren Sie ihn sicher auf.
6. Geben Sie den Schlüssel in der ioBroker.liebherr-Adapterkonfiguration ein.

Der API-Schlüssel wird nur einmal angezeigt. Durch das Generieren eines neuen API-Schlüssels wird der zuvor generierte Schlüssel ungültig.

Weitere Informationen finden Sie in der offiziellen [Liebherr SmartDevice HomeAPI-Dokumentation](https://developer.liebherr.com/apis/smartdevice-homeapi) .

## Konfiguration

- **API-Schlüssel:** Ihr Liebherr SmartDevice HomeAPI-API-Schlüssel. ioBroker speichert ihn als verschlüsselte, geschützte Systemeinstellung. Der Adapter protokolliert den Schlüssel nicht.
- **Echtzeit-Aktualisierungen:** Aktiviert die HomeAPI-SSE-Streams (standardmäßig aktiviert). Deaktivieren Sie diese Option, um nur das Polling-Verfahren zu verwenden.
- **Abfrageintervall:** Zeit in Sekunden zwischen vollständiger REST-Erkennung und Steuerungssynchronisierung. Der Standardwert beträgt 300 Sekunden; gültige Werte liegen zwischen 30 und 86400 Sekunden.

## Objektstruktur

Geräte und Funktionen werden dynamisch aus der HomeAPI-Antwort erstellt. Geräte-IDs werden in sichere ioBroker-Objekt-ID-Segmente kodiert.

```text
liebherr.0
|-- info.connection
`-- devices
    `-- <encoded device ID>
        |-- info
        |   |-- deviceId
        |   |-- nickname
        |   |-- deviceName
        |   |-- deviceType
        |   |-- imageUrl
        |   `-- available
        |-- controls
        |   `-- <toggle control>
        `-- zone_<zoneId>
            |-- zoneId
            |-- position
            |-- temperature
            |-- targetTemperature
            |-- minTemperature
            |-- maxTemperature
            |-- unit
            |-- setTemperatureStepsEnabled (if reported)
            `-- setTemperatureSteps (if reported)
```

Für fortgeschrittene Benutzer: HomeAPI-Werte werden veröffentlicht mit `ack: true`. Schreibbare Zustände akzeptieren `ack: false` Änderungen erfolgen nur, wenn das Gerät eine unterstützte Schreibfähigkeit meldet. Werte werden vor der Übertragung validiert und erst durch einen nachfolgenden HomeAPI-Readback bestätigt; fehlgeschlagene Anfragen werden nicht fälschlicherweise bestätigt.

## Einschränkungen

- Der Adapter ist auf einen Internetzugang und die Verfügbarkeit der cloudbasierten HomeAPI von Liebherr angewiesen.
- Es werden nur Geräte unterstützt, die über die SmartDevice HomeAPI zugänglich gemacht werden.
- Die Liebherr SmartModule LocalAPI wird nicht unterstützt.
- Die HomeAPI befindet sich derzeit in der Beta-Phase und kann sich ändern.
- Für Echtzeitaktualisierungen muss SSE aktiviert sein; die regelmäßige Abfrage bleibt zur Erkennung und Resynchronisierung aktiv.
- Gemeldete Steuerelemente ohne implementiertes Schreibschema bleiben schreibgeschützt.

## Testen und Feedback

Dieser Adapter befindet sich in einer frühen öffentlichen Testphase. Bitte geben Sie bei der Meldung eines Problems Folgendes an:

- Adapter-, Node.js-, js-controller- und Admin-Versionen
- Gerätemodell und Gerätetyp
- Die vom Gerät gemeldeten Steuerungsnamen und Zonen-IDs
- Relevante Auszüge aus dem Debug-Log, API-Schlüssel und andere sensible Daten wurden entfernt.

Bitte melden Sie reproduzierbare Probleme im [GitHub-Issue-Tracker](https://github.com/Gaspode69/ioBroker.liebherr/issues) .

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.4 (2026-09-10)

* (Gaspode69) Updated the Node.js 22 TypeScript configuration dependency; TypeScript 7 remains deferred until the development toolchain supports its compiler API

### 0.0.3 (2026-08-19)

* (Gaspode69) Added realtime control updates via HomeAPI Server-Sent Events with reconnect handling and periodic REST resync
* (Gaspode69) Masked appliance serial numbers in adapter log messages

### 0.0.2 (2026-08-18)
* (Gaspode69) Prepared the first public testing release for the ioBroker latest repository
* (Gaspode69) Consolidated capability-based device discovery, polling, and validated control writes
* (Gaspode69) Updated Node.js requirements, project metadata, CI workflows, and repository compliance

### 0.0.2-alpha.1 (2026-08-18)
* (Gaspode69) Enabled automated npm publishing through GitHub trusted publishing

### 0.0.2-alpha.0 (2026-08-18)
* (Gaspode69) Added read-only SmartDevice HomeAPI device discovery and capability polling
* (Gaspode69) Added encrypted API-key and polling-interval configuration
* (Gaspode69) Added validated writes for target temperature, NightMode, PartyMode, SuperCool, and SuperFrost

## License
MIT License

Copyright (c) 2026 Gaspode69 <gaspode69@online.de>

**No support is provided via email.**

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