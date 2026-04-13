---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mihome-cloud/README.md
title: ioBroker.mihome-cloud
hash: MAZ2H0yS5SFp1zG4VizqNi3Wndc4JrvDqZerO2GB6U0=
---
![Logo](../../../en/adapterref/iobroker.mihome-cloud/admin/mihome-cloud.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mihome-cloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mihome-cloud-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)

# IoBroker.mihome-cloud
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## Mihome-cloud Adapter für ioBroker
Adapter für alle Mi Home Cloud-Geräte. Verbindet sich mit der Xiaomi Cloud API und bietet Status-, Steuerungs- und Szenenausführungsfunktionen für alle in Ihrem Mi Home-Konto registrierten Geräte.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 5.0 verwendet.

## Anforderungen
- Node.js >= 20
- js-controller >= 6.0.11
- Admin >= 7.6.20

## Konfiguration
In den Adaptereinstellungen können Sie Folgendes konfigurieren:

| Schauplatz | Beschreibung |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **Region** | Wählen Sie die Xiaomi Cloud-Region, die zu Ihrer Mi Home App passt (Deutschland, China, Russland, Taiwan, Singapur, USA) |
| **Aktualisierungsintervall** | Abfrageintervall in Minuten (mindestens 1 Minute) |

## Anmelden
Der Adapter verwendet eine **URL-basierte Anmeldung** (Benutzername/Passwort sind in den Adaptereinstellungen nicht erforderlich).

1. Konfigurieren Sie die **Region** und das **Intervall** in den Adaptereinstellungen und speichern Sie die Einstellungen.
2. Schalten Sie den Adapter ein.
3. Überprüfen Sie das Adapterprotokoll – dort wird eine **Anmelde-URL** angezeigt:

```
XIAOMI CLOUD LOGIN REQUIRED
Please visit this URL in your browser and log in: https://account.xiaomi.com/...
```

4. Öffnen Sie die URL in Ihrem Browser und melden Sie sich mit Ihrem Xiaomi-Konto an.
5. Der Adapter erkennt die erfolgreiche Anmeldung automatisch und stellt die Verbindung her.

Die Sitzung bleibt erhalten und übersteht auch Neustarts des Adapters. Eine erneute Anmeldung ist nur erforderlich, wenn die Sitzung serverseitig abläuft.

## Objektbaum
Nach erfolgreicher Anmeldung erstellt der Adapter für jedes Gerät die folgende Objektstruktur:

### `mihome-cloud.0.<device-id>.general`
Allgemeine Geräteinformationen (Modell, Name, Firmware-Version usw.).

### `mihome-cloud.0.<device-id>.status`
Statuswerte aus der MIoT-Spezifikation (z. B. Energiestatus, Helligkeit, Temperatur), die nur gelesen werden können. Diese werden im konfigurierten Intervall abgefragt.

### `mihome-cloud.0.<device-id>.remote`
Schreibbare Steuerbefehle aus der MIoT-Spezifikation. Um einen Befehl zu senden, setzen Sie den Status (unbestätigt) auf `true` oder auf den gewünschten Wert.

Wenn ein Befehl Eingabeparameter erwartet, werden diese im Statusnamen aufgeführt und die erwarteten IDs als Standardwert angezeigt.

### `mihome-cloud.0.<device-id>.custom`
Gerätespezifische Eigenschaften aus der internen Datenbank `configDes` (z. B. für Staubsauger: `clean_area`, `clean_time`, `battery`). Diese werden über `get_prop` / `get_status` abgefragt.

### `mihome-cloud.0.<device-id>.remotePlugins`
Zusätzliche Befehle, die aus den Xiaomi-Cloud-Plugins extrahiert werden. Diese werden beim Start automatisch durch die Analyse der Plugin-Bundles für jedes Gerätemodell ermittelt.

### `mihome-cloud.0.scenes`
Intelligente Szenen/Automatisierungen aus Ihrem Mi Home-Konto. Weisen Sie `true` eine Szene zu, um sie auszuführen.

## Beispiel: Roboterstaubsauger-Raumreinigung
1. Zimmer-IDs finden:

`mihome-cloud.0.<id>.remote.get-map-room-list` – benötigt `[cur-map-id]` als Eingabe.

Die aktuelle Karten-ID erhalten Sie über `mihome-cloud.0.<id>.status.cur-map-id`, oder Sie können die Kartenliste wie folgt abfragen:

`mihome-cloud.0.<id>.remote.get-map-list` (keine Eingabe erforderlich) → Ergebnis erscheint unter `mihome-cloud.0.<id>.status.map-list`

2. Karten-ID festlegen und Räume abfragen:

`mihome-cloud.0.<id>.remote.get-map-room-list` mit Eingang `[<map-id>]`

→ Ergebnis: `mihome-cloud.0.<id>.status.room-id-name-list`: `[{"name":"room1","id":10}]`

3. Beginnen Sie mit der Zimmerreinigung:

`mihome-cloud.0.<id>.remote.start-room-sweep` mit Format `["10", "11", "12", "13"]`

   oder

`mihome-cloud.0.<id>.remote.set-room-clean` mit Format `["10",0,1]`

## Fehlerbehebung
- **„DB geschlossen“-Fehler**: Harmlos – tritt auf, wenn der Adapter beendet wird, während noch eine Anfrage aussteht. Diese werden automatisch unterdrückt.
- **„ECONNRESET“-Fehler**: Vorübergehende Netzwerkunterbrechungen zur Xiaomi Cloud. Der Adapter versucht es beim nächsten Abfrageintervall automatisch erneut.
- **"-106 Gerätenetzwerk nicht erreichbar"**: Das Gerät (z. B. ein Staubsauger) ist offline, nicht mit dem WLAN verbunden oder ausgeschaltet. Der Adapter protokolliert dies als Debug-Meldung und versucht weiterhin, eine Verbindung herzustellen.
- **401-Fehler**: Die Sitzung ist serverseitig abgelaufen. Starten Sie den Adapter neu, um eine erneute QR-Code-Anmeldung auszulösen.
- **Keine Geräteeigenschaften**: Einige reine ZigBee/Bluetooth-Sensorgeräte (z. B. `lumi.sensor_switch.v2`) stellen ihren Status nicht über die Cloud-API bereit. Verwenden Sie stattdessen einen lokalen ZigBee-Adapter.

## Diskussion und Fragen
<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog
### 1.0.5 (2026-04-01)
- (fix) improve 401 authentication error handling and session reset
- (fix) validate and limit user configurable update interval
- (fix) update dependencies to address vulnerabilities

### 1.0.4 (2026-03-14)
- Maintenance update: Consolidated changelog and fixed repository metadata for better standards compliance

### 1.0.3 (2026-03-14)
- **Major update with complete rewrite:**
  - New QR-code based login flow
  - Support for many new Xiaomi device models (Air Purifiers 4 series, newer fans/heaters, robot vacuums)
  - Added environment properties (Temperature, Humidity) to many device configurations
  - Improved error handling for network interruptions
  - Migration to external i18n files and Node.js 20+ requirement
  - Updated dependencies and fixed known vulnerabilities
  - Added missing translations (uk, ru, pt, nl, fr, it, es, pl, zh-cn)
  - Migration to ESLint flat config and release-script support

### 0.2.2

- Minor improvements with device handling

### 0.2.1

- Fix login. Check Log after starting Adapter

### 0.2.0

- (lubepi) Fix login

### 0.0.5

- (TA2k) Bugfixes

### 0.0.4

- (TA2k) initial release

## License

MIT License

Copyright (c) 2023-2026 TA2k <tombox2020@gmail.com>

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