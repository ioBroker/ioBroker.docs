---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lcn/README.md
title: ioBroker.lcn
hash: 7U4md29YzlcZtIfvZAdxw/m+IF5T2q4mzInWqLWyIQc=
---
![Logo](../../../en/adapterref/iobroker.lcn/admin/lcn.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.lcn.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lcn.svg)
![NPM](https://nodei.co/npm/iobroker.lcn.png?downloads=true)

# IoBroker.lcn
Dieser Adapter ermöglicht die Verbindung des Local Control Network [LCN](https://www.lcn.eu/) mit ioBroker.

## Unterstützte Gateways
- LCN-PKE

![pke](../../../en/adapterref/iobroker.lcn/img/lcn-pke.png)

- LCN-PKU mit LCN-PCHK

![pke](../../../en/adapterref/iobroker.lcn/img/lcn-pku.png)

**Vergessen Sie nicht, dass `ioBroker.lcn` eine LCN-Verbindungslizenz blockiert.**

Die Konfiguration und Module werden automatisch durch einen Scan erkannt, der manuell über den Konfigurationsdialog ausgelöst werden muss und jederzeit wiederholt werden kann.

## Arten
Die folgenden Lese- und Schreibgruppen werden unterstützt:

- Analogwerte (Ausgang/Eingang)
- Relais (Ausgang)
- Sensoren (Eingang)
- LEDs (Ausgang / Eingang)
- Variablen (Eingabe)

## Variablen
Um die gültigen Konvertierungsfunktionen auf Variablen anwenden zu können, müssen die Variablen die gültigen Rollen haben. Die folgenden Rollen werden unterstützt:

- **Wert.Temperatur** - Temperatur in Celsius
- **Wert.Helligkeit** - Lux (I-Eingang) in Lux
- **value.speed.wind** - Windgeschwindigkeit in m/s
- **Wert.Spannung** - Spannung in Volt
- **Wert.Strom** - Strom in Ampere
- **value.sun.azimuth** - Sonnenazimut
- **value.sun.elevation** - Sonnenhöhe

## Anzeige
Sie können bei jedem Gerät aktivieren, ob es ein Display hat oder nicht.

## Regler (Regler)
Bei jedem Gerät lässt sich einstellen, ob es Regler hat oder nicht.

## Einstellungen
- Verbindungswiederholungsintervall (Sek.) - wie oft der Adapter versucht, eine Verbindung herzustellen. Standardmäßig alle 30 Sekunden.
- Verbindungstimeout (ms) – wie lange der Adapter auf eine Verbindungsantwort inklusive Authentifizierung wartet. Standardmäßig 6 Sekunden.
- Scan-Antwort-Timeout (ms) – wie lange der Adapter auf Antworten durch den Scan der Module wartet.
- Antwort-Timeout (ms) - Timeout für Steuerbefehle
- Ping-Intervall (Sek.) - wie oft der Adapter Ping-Anfragen sendet
- Ping-Antwort-Timeout (ms) - Timeout für Ping-Anfragen
- IN/OUT-Relais sind gleich – ob die „Out“- und „In“-Relais dasselbe sind oder ob es sich bei diesen Relais um unterschiedliche handelt.

```
// =====================  Same relays =============================
//                                    +-------+
// ----------------- OUT -----------> |       |
//                                    | Relay |
// <----------------- IN ------------ |       |
//                                    +-------+
//
//
// ======================  Different relays =======================
//                                    +-------+
//                                    |       |
// ----------------- OUT -----------> | Relay |
//                                    |       |
//                                    +-------+
//
//                                    +--------+
//                                    | Sensor |
// <----------------- IN ------------ |   or   |
//                                    | Relay  |
//                                    +--------+
```

## Wie benutzt man
Nach dem ersten Start müssen die Geräte gescannt werden. Dies kann im Konfigurationsdialog mit dem Scan-Button erfolgen

![Scan](../../../en/adapterref/iobroker.lcn/img/scanButton.png)

## Zu tun
- Konfigurationsdialog zum Definieren des Variablentyps.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 2.0.3 (2024-09-04)
* (bluefox) Added translations

### 2.0.2 (2024-09-03)
* (bluefox) Corrected checking of licenses with license manager

### 2.0.1 (2024-08-07)
* (bluefox) Disable possibility to install via git

### 2.0.0 (2024-08-06)
* (bluefox) Made adapter compatible with js-controller 6
* (bluefox) A minimum supported node.js version is 18

### 1.1.8 (2023-11-13)
* (bluefox) Added SUM inputs

### 1.1.7 (2023-11-06)
* (bluefox) Corrected setting of undefined values

### 1.1.1 (2022-10-19)
* (bluefox) Corrected license check

### 1.1.0 (2022-10-18)
* (bluefox) Corrected issue with password

### 1.0.4 (2021-05-21)
* (bluefox) Ack will be ignored for the display commands

### 1.0.3 (2021-05-21)
* (bluefox) Changed the calculation of the temperature variables

### 1.0.2 (2020-10-11)
* (bluefox) Implemented the regulators and the display support.

### 0.6.3 (2019-12-18)
* (bluefox) General relays mode implemented

### 0.6.2 (2019-12-07)
* (bluefox) Detected delayed responses
* (bluefox) Dynamical creation of states is implemented

### 0.5.5 (2019-12-05)
* (bluefox) Relay inputs were corrected

### 0.5.4 (2019-12-04)
* (bluefox) Connection indication was corrected

### 0.5.1 (2019-11-29)
* (bluefox) Finger scanner supported
* (bluefox) Added possibility to set the analog mode
* (bluefox) Relay outputs are supported now

### 0.4.4 (2019-11-26)
* (bluefox) Fixed error by parsing of acknowledgement

### 0.4.2 (2019-06-12)
* (bluefox) Support of old measure values was added

### 0.3.2 (2018-11-19)
* (bluefox) add variables support

### 0.2.1
* (bluefox) initial release

## License
CC-BY-NC-4.0

Copyright (c) 2018-2024 Bluefox <dogafox@gmail.com>

Up to 10 devices can be connected for free. If you need more devices, you must buy a commercial license.