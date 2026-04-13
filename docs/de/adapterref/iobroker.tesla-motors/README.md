---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: 0ADka5jwLgihOKMHvKhc7X9AqeXOVpljg3x9oxgDcBo=
---
![Logo](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/tesla-motors-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motors
**Tests:** ![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

## Tesla-Adapter für ioBroker
Alle Tesla-Fahrzeuge und Powerwalls aus der Tesla-App werden über die offizielle **Tesla Fleet API** angezeigt und aktualisiert.

Fahrzeugbefehle (Verriegeln, Entriegeln, Klima, Laden usw.) werden für alle Modelle unterstützt, einschließlich Fahrzeuge ab Baujahr 2021, die eine **End-to-End-Befehlssignierung** (Vehicle Command Protocol) erfordern.

### Anforderungen
- Tesla-Konto mit Fahrzeugen oder Energieprodukten
- Node.js >= 20
- Eine registrierte Tesla Fleet API-Anwendung (Client-ID + Client-Geheimnis) von [developer.tesla.com](https://developer.tesla.com)
- Eine Fleet Key-Domäne (zur Installation virtueller Schlüssel im Fahrzeug)

### Einrichtung (Schritt für Schritt)
Die Admin-Benutzeroberfläche des Adapters führt Sie durch 4 Schritte:

#### Schritt 1: Schlüsselpaar generieren
1. Klicken Sie in den Adaptereinstellungen auf **Schlüsselpaar generieren**, um ein EC-Schlüsselpaar zu erstellen (prime256v1).
2. Klicken Sie auf **Öffentlichen Schlüssel kopieren** und gehen Sie zu [fleetkey.net](https://fleetkey.net) - erstellen Sie ein Konto und erhalten Sie Ihre Subdomain (z. B. `abc123.fleetkey.net`).
3. Laden Sie den öffentlichen Schlüssel in Ihr FleetKey.net-Konto hoch. Tesla lädt den Schlüssel während der Registrierung von dort herunter.

#### Schritt 2: Tesla Developer App
1. Erstellen Sie eine Fleet-API-Anwendung unter [developer.tesla.com](https://developer.tesla.com/request)
2. Legen Sie **Origin** auf Ihre vollständige FleetKey-Subdomain fest (z. B. `https://abc123.fleetkey.net`).
3. Legen Sie die **Umleitungs-URL** auf `https://auth.tesla.com/void/callback` fest.
4. Kopieren Sie die **Client-ID** und das **Client-Geheimnis** aus der erstellten App und geben Sie diese zusammen mit Ihrer FleetKey-Domäne (z. B. `abc123.fleetkey.net`) unten ein.

#### Schritt 3: Authentifizierung (OAuth2)
1. Klicken Sie auf **Authentifizierungslink generieren** – ein neuer Browser-Tab mit der Tesla-Anmeldeseite öffnet sich.
2. Melden Sie sich mit Ihrem Tesla-Konto an und autorisieren Sie die App.
3. Nach dem Einloggen wird die Meldung „Seite nicht gefunden“ angezeigt – das ist normal! Kopieren Sie die vollständige URL aus der Adressleiste Ihres Browsers.
4. Fügen Sie die URL in das Feld „Code-URL“ ein und klicken Sie auf **Speichern und schließen**.

**Warnung:** Geben Sie diese URL niemals an Dritte weiter! Sie gewährt Zugriff auf Ihr Tesla-Konto.

#### Schritt 4: Virtuellen Schlüssel installieren
Der virtuelle Schlüssel wird benötigt, um Befehle an Ihr Fahrzeug zu senden (Verriegeln/Entriegeln, Klimatisierung, Laden usw.). Ohne ihn können Sie lediglich Fahrzeugdaten auslesen. Diesen Schritt können Sie durchführen, nachdem der Adapter in Betrieb genommen wurde.

1. Öffnen Sie die in den Adaptereinstellungen Ihres Telefons angezeigte URL des virtuellen Schlüssels (oder scannen Sie den QR-Code).
2. Die Tesla-App fordert Sie auf, das Hinzufügen eines „Schlüssels eines Drittanbieters“ zu bestätigen.
3. Gehen Sie zu Ihrem Fahrzeug und halten Sie Ihre Schlüsselkarte an die Mittelkonsole, um die Installation zu bestätigen.

### Fernbefehle
Fernbefehle sind unter `tesla-motors.0.<VIN>.remote` verfügbar.

Unterstützte Befehle umfassen:

- **Verriegeln/Entriegeln**: `door_lock`, `door_unlock`
- **Klima**: `auto_conditioning_start`, `auto_conditioning_stop`, `set_temps`, `set_preconditioning_max`, `remote_seat_heater_request`, `remote_steering_wheel_heater_request`
- **Ladevorgang**: `charge_start`, `charge_stop`, `set_charge_limit`, `set_charging_amps`, `charge_port_door_open`, `charge_port_door_close`, `set_scheduled_charging`
- **Kofferraum**: `actuate_trunk` (vorne/hinten)
- **Windows**: `window_control` (Lüften/Schließen)
- **Sicherheit**: `set_sentry_mode`, `remote_start_drive`
- **Medien**: `media_toggle_playback`, `media_next_track`, `media_prev_track`
- **Sonstige**: `flash_lights`, `honk_horn`, `trigger_homelink`, `schedule_software_update`

### Feldbeschreibung
- df: Fahrerfront
- dr: Fahrer hinten
- pf: Beifahrerseite
- pr: Beifahrer hinten
- ft: vorderer Kofferraum
- rt: Heckklappe

### Technische Details
- **Flotten-API**: Regionale Endpunkte (EU/NA/CN) mit automatischer Regionserkennung anhand des JWT-Tokens
- **Befehlssignierung**: ECDSA P-256 + HMAC-SHA256 über protobuf (Fahrzeugbefehlsprotokoll)
- **Zwei Domänen**: DOMAIN_INFOTAINMENT (Klima, Laden, Medien) und DOMAIN_VEHICLE_SECURITY (Verriegeln, Entriegeln, Kofferraum)
- **Sitzungsverwaltung**: ECDH-Handshake pro Domäne, epochen- und zählerbasiert, gespeichert im ioBroker-Status
- **Token-Aktualisierung**: Automatische Aktualisierung vor Ablauf

### Fragen und Diskussionen
<https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0>

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 2.0.0 (2026-04-12)

- (TA2k) Migrate to Tesla Fleet API with OAuth2
- (TA2k) Add Vehicle Command Protocol signing (ECDSA P-256) for post-2021 vehicles
- (TA2k) Add admin UI for Fleet API setup (key generation, credentials, virtual key)
- (TA2k) Add regional endpoint detection (EU/NA/CN) from JWT token
- (TA2k) Store session in ioBroker state to avoid restart loops
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.5.0 (2025-12-28)

- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 6.17.14 now.
- (TA2k) powerwall backup history has been fixed
- (TA2k) Dependencies have been updated.

### 1.4.5 (2024-04-19)

- cleaned up token folder to reduce state objects

### 1.4.4 (2024-04-10)

- improve energy history data

### 1.4.3 (2024-04-10)

- fix for too many state in the powerwall energy history

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 iobroker-community

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