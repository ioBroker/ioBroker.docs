---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cisco-checkpresence/README.md
title: ioBroker.cisco-checkpresence
hash: 6+T+2vQnd6HzYSNvcHp2+s9gjVTOJ+FL6iLzVYR1V34=
---
![Logo](../../../en/adapterref/iobroker.cisco-checkpresence/admin/cisco-checkpresence.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.cisco-checkpresence.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cisco-checkpresence.svg)
![Anzahl der Installationen](https://iobroker.live/badges/cisco-checkpresence-installed.svg)

# IoBroker.cisco-checkpresence
**Tests:** ![Test und Freigabe](https://github.com/NurPech/ioBroker.cisco-checkpresence/workflows/Test%20and%20Release/badge.svg)

## Cisco Catalyst 9800 CheckPresence-Adapter für ioBroker
Die Anwesenheit von Familienmitgliedern wird durch Abfrage des Cisco Catalyst 9800 Wireless Controllers via RESTCONF erkannt. Anstelle unzuverlässiger Ping-Tests liest der Adapter die Tabelle der authentifizierten Clients direkt vom WLC – wenn der Controller meldet, dass ein Gerät verbunden ist, ist es vorhanden.

## Anforderungen
- Cisco Catalyst 9800 Series Wireless Controller (9800-L, 9800-CL, 9800-40, 9800-80)
Die **802.1X-Authentifizierung** ist erforderlich. Der Adapter identifiziert Clients anhand ihres 802.1X-Benutzernamens. Ein externer RADIUS-Server ist nicht notwendig – die lokale EAP-Authentifizierung auf dem WLC ist ausreichend.
- Ein WLC-Benutzerkonto mit RESTCONF-Lesezugriff
- ioBroker mit js-controller ≥ 6.0.11 und Admin ≥ 7.0.23

## Konfiguration
Öffnen Sie die Adaptereinstellungen in ioBroker Admin.

### Registerkarte „Verbindungen“
| Feld | Beschreibung |
|-------|-------------|
| WLC-Host / IP-Adresse | IP-Adresse oder Hostname des Catalyst 9800 WLC |
| Benutzername | RESTCONF-Benutzername (z. B. `iobroker_bot`) |
| Passwort | RESTCONF-Passwort (verschlüsselt gespeichert) |
| Intervall (s) | Abfrageintervall in Sekunden (10–300, Standard: 30) |
| Selbstsigniertes Zertifikat ignorieren | Aktivieren, wenn Ihr WLC ein selbstsigniertes TLS-Zertifikat verwendet (empfohlen) |

### Registerkarte „Benutzer“
802.1X-Benutzernamen in ioBroker den jeweiligen Bundesstaatsnamen zuordnen:

| Feld | Beschreibung |
|-------|-------------|
| 802.1X-Benutzername | Der Benutzername, wie er in der WLC-Clienttabelle angezeigt wird |
| Staatsname | Name, der für den Staat gemäß `presence.<name>` verwendet wird |

## Staaten
Für jeden konfigurierten Benutzer erstellt der Adapter die folgenden Zustände:

| Bundesland | Typ | Beschreibung |
|-------|------|-------------|
| `presence.<name>.present` | boolescher Wert | `true` wenn der Client aktuell verbunden ist |
| `presence.<name>.band` | Zeichenkette | Funkband (`2.4 GHz`, `5 GHz` oder `6 GHz`) |
| `presence.<name>.rssi` | Zahl (dBm) | Empfangene Signalstärke |
| `presence.<name>.snr` | Zahl (dB) | Signal-Rausch-Verhältnis |
| `info.connection` | boolescher Wert | `true` wenn der WLC erreichbar ist |
| `info.connection` | boolescher Wert | `true`, wenn der WLC erreichbar ist |

## Integration mit ioBroker Residents
Die Anwesenheitszustände können über das Feld **Datenpunkte für ausländische Anwesenheit** mit [ioBroker Residents-Adapter](https://github.com/jpawlowski/ioBroker.residents) verknüpft werden:

```
cisco-checkpresence.0.presence.leonie.present
```

## Bekannte Einschränkungen
**Mehrere Geräte pro Benutzer:** Wenn mehrere Geräte mit demselben 802.1X-Benutzernamen authentifiziert werden, wird der erste von der WLC-API zurückgegebene Client verwendet. Dies ist eine Einschränkung des Anwendungsfalls und kein Fehler.
**802.1X erforderlich:** Geräte ohne 802.1X-Authentifizierung (z. B. IoT-Geräte mit PSK) werden nicht erkannt. Lokales EAP auf dem WLC ist ausreichend, wenn kein externer RADIUS-Server verfügbar ist.
- **Nur zentrale Vermittlung:** Getestet mit Access Points im lokalen Modus mit zentraler Vermittlung (CAPWAP). Die flexible/lokale Vermittlung kann sich anders verhalten.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.0.7 (2026-06-11)
- Fixed: Sanitise user-supplied state names to remove characters forbidden in ioBroker object IDs
- Fixed: Clamp pollInterval and absentThreshold to sane upper bounds
- Fixed: Avoid overlapping polls by self-scheduling the poll loop instead of using setInterval
- Fixed: Use translations for the admin tab labels and poll interval field
- Fixed: Corrected admin page title

### 0.0.6 (2026-06-06)
- Fixed: Fixed object structure

### 0.0.5 (2026-06-06)
- Fixed: Fixed object structure

### 0.0.4 (2026-06-06)
- Chore: Update to node 22
- Chore: Update dependencies
- Fixed: Fixed object structure

### 0.0.3 (2026-04-27)
- (M1kad0) fix npm publishing

### 0.0.2 (2026-04-26)
- (M1kad0) added absent threshold to debounce presence detection

### 0.0.1 (2026-04-26)
- Initial release
- Presence detection via RESTCONF (`common-oper-data`)
- AP name, radio band, RSSI and SNR via `traffic-stats`
- Encrypted password storage
- Dark/light mode admin UI with MUI v6

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 M1kad0 <leonie+iobroker@sgessinger.de>

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