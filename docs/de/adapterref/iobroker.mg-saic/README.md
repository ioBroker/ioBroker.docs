---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mg-saic/README.md
title: ioBroker MG/SAIC
hash: JbGEdB75jW8iPcscAwyobGX7L1qsM56WuVOJbO6btNo=
---
# ioBroker MG/SAIC

![NPM-Version](https://img.shields.io/npm/v/iobroker.mg-saic.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mg-saic.svg)

<img src="admin/MG.png" alt="MG" width="314">

Der Adapter dient der Verbindung von MG- und SAIC-Fahrzeugen mit ioBroker über den iSmart-Cloud-Dienst. Er steht in keiner Verbindung zu MG, SAIC oder iSmart und wird von diesen Unternehmen auch nicht unterstützt.

Herstellerinformationen finden Sie unter [MG Motor](https://www.mgmotor.eu/) und [SAIC Motor](https://www.saicmotor.com/) .

## Aufstellen

### Bevor Sie beginnen

- Node.js 22.22.2 oder höher wird benötigt.
- Es wird ioBroker js-controller Version 7.2.2 oder höher benötigt.
- ioBroker Admin 8.2.0 oder höher ist erforderlich.
- Verwenden Sie ein iSmart-Konto, das Zugriff auf das Fahrzeug hat. Um Störungen der mobilen App-Sitzung zu vermeiden, wird ein separates, mit dem Fahrzeug gemeinsam genutztes Konto empfohlen.
- Halten Sie das Kontopasswort bereit. Der Adapter speichert es als geschützte Einstellung.
- Wählen Sie die Region für das Konto aus. Verfügbare Regionen sind die Europäische Union, China, Australien, Brasilien, Israel, Türkei, Thailand und die übrige Welt. Indien wird nicht unterstützt.

### Konfigurieren Sie den Adapter

1. Installieren Sie den Adapter und erstellen Sie eine Instanz in ioBroker Admin.
2. Wählen Sie die Region für Ihr Konto und den Anmeldetyp (E-Mail oder Telefonnummer) aus.
3. Geben Sie die E-Mail-Adresse oder Telefonnummer und das Passwort des Kontos ein. Bei telefonischer Anmeldung geben Sie bitte zusätzlich die Landesvorwahl an.
4. Stellen Sie das Statusabfrageintervall auf 60 Sekunden oder mehr ein. Der Standardwert beträgt 1800 Sekunden.
5. Speichern Sie die Einstellungen und starten Sie die Instanz. Die dem Konto zur Verfügung stehenden Fahrzeuge werden unter folgendem Link angezeigt: `vehicles.<VIN>` Vorhandene Fahrzeugobjekt-IDs werden wiederverwendet, wenn die Cloud-API die Groß-/Kleinschreibung der Fahrgestellnummer ändert. Gerätebezeichnungen verwenden den lokalisierten generischen Fahrzeugnamen; die Fahrgestellnummer, Marke, Modell und andere verfügbare Fahrzeugmetadaten werden schreibgeschützt bereitgestellt.

## Merkmale

- Verbindet ioBroker mit dem iSmart-Cloud-Dienst und ruft den Fahrzeugstatus ab.
- Bietet Fernsteuerungsmöglichkeiten für unterstützte Fahrzeugfunktionen.
- Unterstützt Klimatisierungs-, Heizungs- und Ladefunktionen, sofern diese für das Fahrzeug verfügbar sind.
- Nicht erkannte Freitextangaben zum Ladevorgang werden ausgeblendet, während numerische Messwerte und validierte Ladepunktkennungen beibehalten werden.

## Installation

Der Adapter ist auf npm veröffentlicht und im Repository „Neueste Adapter“ von ioBroker verfügbar.

## Unterstützung

[![Spenden](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Changelog
### 0.1.4 (2026-11-11)

- (Voodoo2man) Corrected command-response validation, status values, charging-field handling, vehicle ID reuse, and cloud polling intervals; removed the non-informative vehicle name state.

### 0.1.3 (2026-11-08)

- (Voodoo2man) Retry startup initialization after temporary cloud login and vehicle-list outages with bounded backoff, prevent false setting writes from triggering remote setting actions, and add the missing region labels in the Admin UI.

### 0.1.2 (2026-11-08)

- (Voodoo2man) Prevented unsafe or case-colliding API fields and vehicle IDs from creating duplicate datapoints, kept status IDs stable across field-casing changes, scheduled polling after each completed cycle while honoring queued manual refreshes, and removed an unused cloud-backend translation.
- (Voodoo2man) Replaced untrusted cloud error text with English code-based diagnostics and standardized the product title as MG/SAIC across locales.
- (Voodoo2man) Reused dynamic charging datapoints across field-name casing changes and normalized known status fields.

### 0.1.1 (2026-11-07)

- (Voodoo2man) Lowered the minimum Node.js requirement to 22.22.2.
- (Voodoo2man) Improved charging datapoint labels and units, enforced safe polling interval limits, and added manufacturer references.

### 0.1.0 (2026-11-01)

- (Voodoo2man) Reported real-time charging power in kW using the pack current and voltage.
- (Voodoo2man) Applied confirmed profile-specific charging conversions.
- (Voodoo2man) Calculated available battery energy from battery level and usable capacity.

Older changelog entries are available in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Voodoo2man Voodoo2man@outlook.de

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