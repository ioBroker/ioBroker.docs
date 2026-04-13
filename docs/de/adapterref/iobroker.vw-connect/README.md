---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vw-connect/README.md
title: ioBroker.vw-connect
hash: uSySW6XTQD7Ml8Wf5ZMTTDDlxCoRRftoS2wshs7h1RI=
---
![Logo](../../../en/adapterref/iobroker.vw-connect/admin/vw-connect.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vw-connect.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vw-connect.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/ta2k/iobroker.vw-connect.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/ta2k/ioBroker.vw-connect/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vw-connect.png?downloads=true)
![Travis-CI](http://img.shields.io/travis/ta2k/ioBroker.vw-connect/master.svg)

# IoBroker.vw-connect
## Vw-connect-Adapter für ioBroker
Adapter für VW We Connect, We Connect ID, We Charge, myAudi, Skoda Connect, Seat Connect und We Connect Go

Bitte aktualisieren Sie Ihr System auf Node 10.

<https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten>

## Verwendung
Nutzen Sie den Status unter „Fernsteuerung“, um Ihr Fahrzeug fernzusteuern. Das normale Aktualisierungsintervall ist das Abfrageintervall für Daten aus der VAG Cloud. Die erzwungene Aktualisierung wird für Fahrzeuge ohne Elektroantrieb aktiviert. Dieses Intervall ist von VAG begrenzt, bis das Fahrzeug wieder eingeschaltet wird. Fahrtdaten sind nur für Fahrzeuge ohne Elektroantrieb verfügbar.

Die Klimatisierungstemperatur kann in .climater.settings.targetTemperature.content eingestellt werden.

## Diskussion und Fragen
<https://forum.iobroker.net/topic/26438/test-adapter-vw-connect-für-vw-id-audi-seat-skoda>

## Erläuterung der Statusfelder
### Liste der Einträge
```

```

### 0.7.16 (2026-03-18)
- Myskoda MQTT-Verbindung reparieren

### 0.7.15 (2025-11-26)
- VW-Refresh-Token reparieren

### 0.7.14 (2025-11-25)
- VW-ID-Anmeldung reparieren

### 0.7.13 (2025-11-09)
- Problem mit dem Skoda-Login behoben

### 0.7.12 (2025-05-05)
- Behebung des Problems mit dem Skoda-Refresh-Token
- Behebung des Problems mit der Lüftungsaktivierung
- neue, nicht unterstützte Endpunkte hinzufügen

### 0.7.9 (2025-03-20)
- Reparatur für das ID-Wandladegerät

### 0.7.7 (2025-03-02)
- Behebung des Problems mit der Standheizung und deren Dauer beim Skoda
- Behebung des Problems mit der Skoda-Sperre/Entriegelung

### 0.7.6 (2025-02-28)
- Behebung des Problems, dass der Ladestatus nur beim Start aktualisiert wird
- Behebung des Problems mit dem sich bewegenden Zustand von Skoda

### 0.7.3 (2025-02-26)
- Fehlerbehebung für set setTemperature
- Lösung für das Entriegelungsproblem bei Skoda

### 0.7.0 (2025-02-25)
- Lösung für Skoda und Seat
Die Zustandsstruktur wurde vollständig geändert. Bitte löschen Sie die alten Zustände unter „Objekte“.

### 0.6.1 (2024-10-01)
- Problem mit dem Skoda-Login behoben

### 0.6.0 (11.04.2024)
- zusätzliche Cupra-Zustände hinzufügen

### 0.5.4 (2024-03-17)
- Tür- und Fensterzustände reparieren

### 0.4.1
- VW-Statusaktualisierung beheben

### 0.0.65
- Cupra-Login reparieren

### 0.0.63
- VW/Skoda e-tron-Anmeldeproblem behoben

### 0.0.62
- Audi e-tron-Anmeldeproblem beheben

### 0.0.61
- ID-Anmeldung reparieren

### 0.0.60
Kleinere Verbesserungen. Das minimale Ladeintervall von WeCharge beträgt jetzt 15 Minuten.

### 0.0.55
- Fehlerbehebung bei der Aktualisierung des ID-Status

### 0.0.51
- Audi e-tron-Anmeldung reparieren

### 0.0.48
- Login-Probleme behoben, Audi-Update-Problem behoben, Limit für Wallbox hinzugefügt

### 0.0.43
- Erhöhung der Timeouts für Refresh-Token

### 0.0.42
- Skoda-Anmeldeproblem beheben

### 0.0.40
- Klimatisierungsversion 3 für neuere Fahrzeuge hinzufügen. Powerpass und Seat Elli hinzufügen.

### 0.0.39
- Problem mit der ID-Anmeldung beheben

### 0.0.36
- Skoda Enyaq-Unterstützung hinzufügen

### 0.0.35
- Kompatibilität mit NodeJS v10 hinzufügen

### 0.0.34
- Automatische Annahme neuer Datenschutzeinwilligungen hinzufügen

### 0.0.32
- korrekte Auswahl der letzten Reisen

### 0.0.31
- Mehrfachauswahl von Reisearten ermöglichen

### 0.0.30
- Problem mit mehreren Fahrzeugen behoben, VWv2-Modus hinzugefügt; derzeit gibt es keinen Unterschied zwischen VW und VWv2

### 0.0.29
- Skoda-RefreshToken-Problem behoben, kleinere Verbesserungen

### 0.0.26
- Fehlerbehebungen

### 0.0.25
- Wir berechnen zusätzlich Gebühren

### 0.0.24
- Remote-Statusaktualisierung hinzufügen

### 0.0.23
- Sitz hinzugefügt und neue Klimatisierung v2

### 0.0.22
- Außentemperatur in °C auch für Skoda und Audi berechnen

### 0.0.21
- Remotes für ID hinzufügen

### 0.0.20
- Audi-Login reparieren, ID-Login hinzufügen

### 0.0.19
- Speichern von Statusobjekten im Zustand anhand ihrer ID anstatt anhand fortlaufender Nummern

### 0.0.18
- Behebung des Problems mit dem Akkustatus bei Modellen aus dem Jahr 2020

### 0.0.17
- Unterstützung für 2020er Modelle hinzufügen

### 0.0.16
- Behebung der 3 Probleme mit js.controller

### 0.0.11
- Audi-Fehler bei mehreren Fahrzeugen behoben
- Statusaktualisierungsfehler ausblenden, falls die Funktion nicht verfügbar ist

## License

MIT License

Copyright (c) 2019-2030 ta2k <tombox2020@gmail.com>

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