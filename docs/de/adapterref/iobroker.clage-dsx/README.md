---
chapters: {"pages":{"en/adapterref/iobroker.clage-dsx/README.md":{"title":{"en":"ioBroker.clage-dsx"},"content":"en/adapterref/iobroker.clage-dsx/README.md"},"en/adapterref/iobroker.clage-dsx/README_DE.md":{"title":{"en":"ioBroker.clage-dsx"},"content":"en/adapterref/iobroker.clage-dsx/README_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.clage-dsx/README.md
title: ioBroker.clage-dsx
hash: UjxBHvxaApvQKU3s6Cm1Atpkjlhqlu0y1jzq5HNvtMU=
---
# ioBroker.clage-dsx

![NPM-Version](https://img.shields.io/npm/v/iobroker.clage-dsx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.clage-dsx.svg)
![Test und Freigabe](https://github.com/TheBam1990/ioBroker.clage-dsx/actions/workflows/test-and-release.yml/badge.svg)

![CLAGE DSX Logo](../../../en/adapterref/iobroker.clage-dsx/admin/clage-dsx.png)

[Deutsche Dokumentation](/#/docs/adapterref/iobroker.clage-dsx/README_DE.md)

## Beschreibung

Dieser Adapter verbindet ioBroker mit einem lokalen [CLAGE](https://www.clage.com/) Home Server und den darauf registrierten Durchlauferhitzern. Die Kommunikation erfolgt über die HTTPS-API im lokalen Netzwerk; ein Cloud-Dienst ist nicht erforderlich.

Die Implementierung basiert auf der beigefügten \[CLAGE Home Server API-Spezifikation v1.3.4]\( <https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/CLAGE> HomeServer API v1.3.4.pdf ).

## Anforderungen

- ioBroker mit Node.js 22 oder neuer
- CLAGE-Heimserver, erreichbar vom ioBroker-Host
- Benutzername und Passwort der Home Server API
- HTTPS-Zugriff auf den Heimserver

## Konfiguration

Öffnen Sie die Instanzeinstellungen und geben Sie Folgendes ein:

1. **CLAGE Home Server IP-Adresse** , zum Beispiel`192.168.2.35` (ohne`https://` )
2. **API-Benutzername** , zum Beispiel`admin`
3. **API-Passwort** , zum Beispiel`geheim`

Alle drei Felder sind Pflichtfelder. Der historische native Konfigurationsschlüssel für den Benutzernamen heißt`port` Dies wird aus Gründen der Kompatibilität mit bestehenden Installationen beibehalten.

Die Werte`admin` Und`geheim` Die Beispiele stammen aus der CLAGE-API-Dokumentation. Verwenden Sie die auf Ihrem eigenen Home-Server konfigurierten API-Zugangsdaten; verwenden Sie das Beispielpasswort nur, wenn es dort tatsächlich konfiguriert ist.

Der Heimserver verwendet normalerweise ein selbstsigniertes TLS-Zertifikat. Der Adapter akzeptiert daher das lokale Zertifikat, wenn er sich direkt mit dem konfigurierten Gerät verbindet.

## Aktuelle Funktionalität

Für jedes registrierte CLAGE-Gerät erstellt der Adapter Zustände für:

- Identität, Verbindungsstatus, RSSI, LQI, API-Zugriffsmaske und letzte Funkaktivität
- Sollwert, Temperaturgrenze, Einlass-/Auslasstemperaturen und alle vier Temperaturvoreinstellungen
- Durchfluss, Durchflussbegrenzung, Ventilstellung, Roh- und berechnete Leistung, Heizzustand und Fehler
- Firmware- und Seriennummern, Informationen zum Netzteil und Betriebsstundenzähler
- Gesamtverbrauch plus letzter Entnahmezyklus und Verbrauchshistorie als JSON
- Aktueller Fehler plus Fehlerverlauf als JSON
- Home-Server-Version, Identität, Funkkanal, Adresse und beworbene Dienste
- alle Timer, sowohl global als auch gefiltert pro Gerät

Beschreibbare Zustände:

- `Setpoint` : API-Wert in Zehntelgrad Celsius, z. B.`450` = 45,0 °C
- `Themperatur` Temperatur in °C; die historische Schreibweise wurde aus Kompatibilitätsgründen beibehalten.
- `flowMax` Durchflussgrenze in Zehntellitern pro Minute; spezielle API-Werte umfassen`253` (ECO) und`254` (AUTO)
- `Name` Gerätename
- `setup.flowMax` ,`setup.loadShedding` ,`setup.scaldProtection` Und`setup.sound`
- `timers.createJson` ,`timers.updateJson` Und`timers.deleteId` für kontrolliertes Timermanagement

`info.connection` Zeigt an, ob der Home-Server erreichbar ist und die konfigurierten Anmeldeinformationen akzeptiert.

Der Adapter prüft vor Schreibvorgängen die API-Zugriffsmaske. Sollwertänderungen werden um zwei Sekunden verzögert, aktive Geräte werden häufiger aktualisiert, und die Geräteliste verwendet standardmäßig sequenzielles HTTP-Long-Polling. Intervalle, Long-Polling und der Zeitraum für den Verbrauchsverlauf (standardmäßig 30 Tage) können in der Adapterkonfiguration angepasst werden.

## Timer JSON

Erstellen Sie einen Timer, indem Sie JSON wie das Folgende schreiben:`timers.createJson` :

```json
{"type":0,"weekdays":127,"start":"06:00","stop":"07:00","deviceId":"A001FF0034","setpoint":450}
```

Für Aktualisierungen schreiben Sie dieselbe Struktur einschließlich einer numerischen Kennzeichnung.`id` Zu`timers.updateJson` Um einen Timer zu löschen, schreiben Sie seine numerische ID in die entsprechende Liste.`timers.deleteId` Destruktive Massenoperationen, Geräteabmeldungen und Änderungen der Funkadresse werden absichtlich nicht offengelegt.

## Fehlerbehebung

- Überprüfen Sie, ob die IP-Adresse kein Protokollpräfix oder keinen Pfad enthält.
- Überprüfen Sie die API-Zugangsdaten in der CLAGE Home Server-Konfiguration.
- Stellen Sie sicher, dass der TCP-Port 443 vom ioBroker-Host aus erreichbar ist.
- HTTP-Status`401` bedeutet ungültige Anmeldeinformationen;`403` bedeutet unzureichende API-Berechtigungen.
- Ein Gerät kann registriert, aber vorübergehend nicht verfügbar sein. Die API meldet dies wie folgt:`404` ,`410` oder ein negativer Gerätefehlercode.

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

[Older changelog entries](https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/CHANGELOG_OLD.md)

## License

Copyright (c) 2026 TheBam <elektrobam@gmx.de>

MIT License. See [LICENSE](https://github.com/TheBam1990/ioBroker.clage-dsx/blob/master/LICENSE).