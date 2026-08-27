---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.clage-dsx/README.md
title: ioBroker.clage-dsx
hash: 0mWtgdm7G91PsfZGbKfeZzP1j+D+MVMJYpqD77yZkV4=
---
# IoBroker.clage-dsx
![CLAGE DSX Logo](../../../en/adapterref/iobroker.clage-dsx/admin/clage-dsx.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.clage-dsx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.clage-dsx.svg)

[![Test und Freigabe](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml)

[Deutsche Dokumentation](README_DE.md)

## Beschreibung
Dieser Adapter verbindet ioBroker mit einem lokalen Heimserver ([CLAGE](https://www.clage.com/)) und den darin registrierten Durchlauferhitzern. Die Kommunikation erfolgt über die HTTPS-API im lokalen Netzwerk; ein Cloud-Dienst ist nicht erforderlich.

Die Implementierung basiert auf dem enthaltenen [CLAGE Home Server API-Spezifikation v1.3.4](CLAGE%20HomeServer%20API%20v1.3.4.pdf).

## Anforderungen
- ioBroker mit Node.js 22 oder neuer
- CLAGE-Heimserver, erreichbar vom ioBroker-Host
- Benutzername und Passwort für die Home Server API
- HTTPS-Zugriff auf den Heimserver

## Konfiguration
Öffnen Sie die Instanzeinstellungen und geben Sie Folgendes ein:

1. **CLAGE Home Server IP-Adresse**, zum Beispiel `192.168.2.35` (ohne `https://`)
2. **API-Benutzername**, zum Beispiel `admin`
3. **API-Passwort**, zum Beispiel `geheim`

Alle drei Felder sind Pflichtfelder. Der historische, native Konfigurationsschlüssel für den Benutzernamen heißt `port`; dieser wird aus Gründen der Kompatibilität mit bestehenden Installationen beibehalten.

Die Werte `admin` und `geheim` sind Beispiele aus der CLAGE-API-Dokumentation. Verwenden Sie die auf Ihrem eigenen Home-Server konfigurierten API-Zugangsdaten; verwenden Sie das Beispielpasswort nur, wenn es dort tatsächlich konfiguriert ist.

Der Heimserver verwendet normalerweise ein selbstsigniertes TLS-Zertifikat. Der Adapter akzeptiert daher das lokale Zertifikat, wenn er sich direkt mit dem konfigurierten Gerät verbindet.

## Aktuelle Funktionalität
Für jedes registrierte CLAGE-Gerät erstellt der Adapter Zustände für:

- Identität, Verbindungsstatus, RSSI, LQI, API-Zugriffsmaske und letzte Funkaktivität
- Sollwert, Temperaturgrenze, Einlass-/Auslasstemperaturen und alle vier Temperaturvoreinstellungen
- Durchfluss, Durchflussbegrenzung, Ventilstellung, Roh- und berechnete Leistung, Heizzustand und Fehler
- Firmware- und Seriennummern, Informationen zum Netzteil und Betriebsstundenzähler
- Gesamtverbrauch plus letzter Entnahmezyklus und Verbrauchshistorie als JSON
- Aktueller Fehler plus Fehlerverlauf als JSON
- Version des Heimservers, Identität, Funkkanal, Adresse und beworbene Dienste
- alle Timer, sowohl global als auch gefiltert pro Gerät

Beschreibbare Zustände:

- `Sollwert`: API-Wert in Zehntelgrad Celsius, z. B. `450` = 45,0 °C
- „Themperatur“: Temperatur in °C; aus Kompatibilitätsgründen mit der historischen Schreibweise beibehalten.
- `flowMax`: Durchflussbegrenzung in Zehntel Litern pro Minute; spezielle API-Werte umfassen `253` (ECO) und `254` (AUTO)
- `Name`: Gerätename
- `setup.flowMax`, `setup.loadShedding`, `setup.scaldProtection` und `setup.sound`
- `timers.createJson`, `timers.updateJson` und `timers.deleteId` für die kontrollierte Timerverwaltung

`info.connection` gibt an, ob der Home-Server erreichbar ist und die konfigurierten Anmeldeinformationen akzeptiert.

Der Adapter prüft vor Schreibvorgängen die API-Zugriffsmaske. Sollwertänderungen werden um zwei Sekunden verzögert, aktive Geräte werden häufiger aktualisiert, und die Geräteliste verwendet standardmäßig sequenzielles HTTP-Long-Polling. Intervalle, Long-Polling und der Zeitraum für den Verbrauchsverlauf (standardmäßig 30 Tage) können in der Adapterkonfiguration angepasst werden.

## Timer JSON
Erstellen Sie einen Timer, indem Sie JSON wie das Folgende an `timers.createJson` senden:

```json
{"type":0,"weekdays":127,"start":"06:00","stop":"07:00","deviceId":"A001FF0034","setpoint":450}
```

Für Aktualisierungen schreiben Sie dieselbe Struktur einschließlich der numerischen ID `id` in `timers.updateJson`. Um einen Timer zu löschen, schreiben Sie seine numerische ID in `timers.deleteId`. Destruktive Massenoperationen, Geräteabmeldungen und Änderungen der Funkadresse werden absichtlich nicht offengelegt.

## Fehlerbehebung
- Überprüfen Sie, ob die IP-Adresse kein Protokollpräfix oder keinen Pfad enthält.
- Überprüfen Sie die API-Zugangsdaten in der CLAGE Home Server-Konfiguration.
- Stellen Sie sicher, dass der TCP-Port 443 vom ioBroker-Host aus erreichbar ist.
- Der HTTP-Statuscode `401` bedeutet ungültige Anmeldeinformationen; `403` bedeutet unzureichende API-Berechtigungen.
Ein Gerät kann zwar registriert, aber vorübergehend nicht verfügbar sein. Die API meldet dies als `404`, `410` oder einen negativen Gerätefehlercode.

## Changelog

### 0.0.9

- Fixed the Home Server address input so any IPv4 address, host name or host with an explicit port can be entered.
- Updated the minimum Admin dependency to 7.8.23.

### 0.0.8

- Fixed all findings from the ioBroker latest-repository review.
- Updated energy and timestamp state roles and clarified the legacy temperature state.
- Restricted setup writes to registered API fields and added safe polling upper limits.
- Corrected all adapter description translations.

### 0.0.7

- Corrected state roles for timestamps, version information and the numeric bus ID

### 0.0.6

- Added live temperatures, presets, valve position, calculated power and radio diagnostics
- Added setup, consumption and error history data
- Added permission-checked setup writes and timer management
- Added Home Server information, adaptive polling and sequential HTTP long polling
- Added configurable polling intervals

[Older changelog entries](CHANGELOG_OLD.md)

## License

Copyright (c) 2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](LICENSE).