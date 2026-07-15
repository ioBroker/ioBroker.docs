---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: ic2xztq3rX24UELsVZ/w+vk71x5uNctv7vzyjQB9ZQc=
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

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

### Anforderungen
- Tesla-Konto mit Fahrzeugen oder Energieprodukten
- Node.js >= 22
- Eine registrierte Tesla Fleet API-Anwendung (Client-ID + Client-Geheimnis) von [developer.tesla.com](https://developer.tesla.com)
- Eine Fleet Key-Domäne (zur Installation virtueller Schlüssel im Fahrzeug)

### Einrichtung (Schritt für Schritt)
Die Admin-Benutzeroberfläche des Adapters führt Sie durch 4 Schritte:

#### Schritt 1: Schlüsselpaar generieren
1. Klicken Sie in den Adaptereinstellungen auf **Schlüsselpaar generieren**, um ein EC-Schlüsselpaar zu erstellen (prime256v1).
2. Klicken Sie auf **Öffentlichen Schlüssel kopieren** und gehen Sie zu [fleetkey.net](https://fleetkey.net) - fügen Sie ihn unter "Host Public Key" ein und erstellen Sie eine Subdomain (z. B. `abc123.fleetkey.net`).
3. Nach dem Speichern wird Ihr öffentlicher Schlüssel auf FleetKey.net gespeichert. Tesla lädt den Schlüssel während der Registrierung von dort herunter.

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

#### Nach Änderung der Tesla-Bereiche erneut autorisieren
Wenn Sie später in der Tesla Developer App Berechtigungen hinzufügen oder ändern, erhält das bestehende Aktualisierungstoken diese Berechtigungen nicht automatisch. Setzen Sie zuerst die gespeicherte Fleet-Sitzung zurück und führen Sie dann den OAuth-Ablauf erneut aus.

1. Aktivieren Sie **Anmelde-/Token-Informationen zurücksetzen** in den Adaptereinstellungen.
2. Speichern und schließen Sie die Einstellungen einmal. Der Adapter löscht die gespeicherte Flotte.

Sitzung und Code-URL und Neustarts.

3. Öffnen Sie die Einstellungen erneut, generieren Sie einen neuen Authentifizierungslink und autorisieren Sie Tesla mit

die erforderlichen Bereiche.

4. Fügen Sie die neue Callback-URL in das Feld **Code-URL** ein und speichern Sie erneut.

Eine neue Callback-URL wird ignoriert, ohne dass die gespeicherte Sitzung zurückgesetzt wird, während die alte Sitzung weiterhin aktualisiert werden kann.

#### Schritt 4: Virtuellen Schlüssel installieren
Der virtuelle Schlüssel wird benötigt, um Befehle an Ihr Fahrzeug zu senden (Verriegeln/Entriegeln, Klimatisierung, Laden usw.). Ohne ihn können Sie lediglich Fahrzeugdaten auslesen. Diesen Schritt können Sie durchführen, nachdem der Adapter in Betrieb genommen wurde.

1. Öffnen Sie die in den Adaptereinstellungen Ihres Telefons angezeigte URL des virtuellen Schlüssels (oder scannen Sie den QR-Code).
2. Die Tesla-App fordert Sie auf, das Hinzufügen eines „Schlüssels eines Drittanbieters“ zu bestätigen.
3. Gehen Sie zu Ihrem Fahrzeug und halten Sie Ihre Schlüsselkarte an die Mittelkonsole, um die Installation zu bestätigen.

### Fernbefehle
Fernbefehle sind unter `tesla-motors.0.<VIN>.remote` verfügbar.

Unterstützte Befehle umfassen:

- **Verriegeln/Entriegeln**: `door_lock`, `door_unlock`
- **Klima**: `auto_conditioning_start`, `auto_conditioning_stop`, `set_temps`, `set_preconditioning_max`, `remote_seat_heater_request`, `remote_auto_seat_climate_request`, `remote_steering_wheel_heater_request`
- **Ladevorgang**: `charge_start`, `charge_stop`, `set_charge_limit`, `set_charging_amps`, `charge_port_door_open`, `charge_port_door_close`, `set_scheduled_charging`
- **Kofferraum**: `actuate_trunk` (vorne/hinten)
- **Windows**: `window_control` (Lüften/Schließen)
- **Sicherheit**: `set_sentry_mode`, `remote_start_drive`
- **Medien**: `media_toggle_playback`, `media_next_track`, `media_prev_track`
- **Sonstige**: `flash_lights`, `honk_horn`, `trigger_homelink`, `schedule_software_update`

Klimaabhängige Sitz- und Lenkradbefehle, einschließlich `remote_auto_seat_climate_request`, erfordern eine aktive Vorklimatisierung oder Climate Keeper. Starten Sie die Klimaanlage zuerst mit `auto_conditioning_start` (oder aktivieren Sie Climate Keeper), bevor Sie diese Befehle senden. Wenn die Klimaanlage ausgeschaltet ist, lehnt Tesla den Befehl mit `cabin comfort remote settings not enabled` ab.

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

### Hinweise zur Admin-Benutzeroberfläche und Migration
Die Adaptereinstellungen verwenden die Admin-Oberfläche von ioBroker (`jsonConfig`). Bestehende Adapterinstanzen behalten ihre gespeicherte Konfiguration, die Einstellungsseite wurde jedoch neu strukturiert, um die Einrichtung der Fleet API, die Fleet Telemetry Bridge und die Feldauswahl zu vereinfachen.

Wenn Sie von einer älteren Version 2.x aktualisieren, öffnen Sie bitte einmal die Adaptereinstellungen und überprüfen Sie die Fleet-API-Zugangsdaten, die virtuelle Schlüsseldomäne und die optionalen Fleet-Telemetrie-Einstellungen, bevor Sie eine neue Fleet-Telemetrie-Konfiguration starten.

### Optionaler Flotten-Telemetriemodus (MQTT-Bridge)
Ab der Migration der Fleet API kann der Adapter auch zusammen mit Teslas **Fleet Telemetry**-Dienst verwendet werden, um die Kosten für die Abfrage von `vehicle_data` zu reduzieren. Fleet Telemetry ist optional. Wenn es deaktiviert ist, behält der Adapter das bestehende Abfrageverhalten bei.

Die erste Implementierung verwendet eine **MQTT-Brücke** und hält den Fleet Telemetry-Empfänger bewusst außerhalb des Adapters:

1. Tesla-Fahrzeuge streamen Telemetriedaten an einen selbst gehosteten Server.

[Flottentelemetrie](https://github.com/teslamotors/fleet-telemetry) Server.

2. Der Server veröffentlicht ausgewählte Fahrzeugfelder über MQTT.
3. Der Adapter abonniert die MQTT-Themen und schreibt die Daten zurück in den

bestehender Tesla-Zustandsbaum.

Dadurch bleiben bestehende Skripte und Aliase funktionsfähig, während gleichzeitig die Anzahl der regulären `vehicle_data`-Anfragen reduziert wird.

Eine praktische, anfängerfreundliche Anleitung zur Einrichtung mit Docker Compose, Zertifikaten, TCP-Passthrough, Adaptereinstellungen und Fehlerbehebung finden Sie unter [docs/fleet-telemetry-setup.md](docs/fleet-telemetry-setup.md).

#### Anforderungen
- Ein erreichbarer Tesla Fleet Telemetry-Server mit

`transmit_decoded_records=true`.

- Ein MQTT-Broker, der vom ioBroker-Host aus erreichbar ist.
- Ein Einheimischer

[Fahrzeugbefehl](https://github.com/teslamotors/vehicle-command) Proxy für Flottentelemetrie-Konfigurationsaufrufe.

- Eine Serverzertifikats-/CA-Kette für den öffentlichen Fleet Telemetry-Endpunkt.
- Ein Fahrzeug mit Flottentelemetrie-Unterstützung und einem zugehörigen virtuellen Schlüssel.

Der Flotten-Telemetrie-Server muss vom Fahrzeug über den konfigurierten öffentlichen Host und Port erreichbar sein. In vielen Installationen ist hierfür TCP-Passthrough anstelle eines normalen HTTPS-Reverse-Proxys erforderlich, da Tesla direkt mit dem Flotten-Telemetrie-Server kommuniziert.

Zusätzliche Adaptereinstellungen sind verfügbar für:

- Aktivierung des Telemetriemodus
- die lokale `vehicle-command`-Proxy-URL, die zur Konfiguration der Telemetrie im Fahrzeug verwendet wird
- die Telemetrieserver-Hostname-/Port-/Zertifikatskette
- MQTT-Broker, Themenbasis und Zugangsdaten
- die Auswahl des Flottentelemetriefelds und das feldspezifische `interval_seconds` /

optional `minimum_delta`

- eine optionale periodische Fleet-API-Synchronisierung für Daten, die nicht von der Telemetrie abgedeckt werden.

#### Adaptereinrichtung
1. Starten und aktivieren Sie den Fleet Telemetry Server.
2. Konfigurieren Sie den MQTT-Datenspeicher so, dass er dekodierte Datensätze an Ihren MQTT-Broker sendet.
3. Führen Sie den `vehicle-command`-Proxy im selben vertrauenswürdigen Netzwerk wie ioBroker aus.
4. Konfigurieren Sie die Adaptereinstellungen:
- **Flottentelemetrie-Modus aktivieren**
- Geben Sie die `vehicle-command`-Proxy-URL ein
- Geben Sie den öffentlichen Hostnamen, Port und CA/fullchain PEM der Flottentelemetrie ein.
- Geben Sie den MQTT-Broker, optionale Anmeldeinformationen und die Themenbasis ein.
5. Wählen Sie die gewünschten Felder, Intervalle und optionalen Mindestdeltas aus.

Registerkarte **Flottentelemetriefelder**.

6. Verwenden Sie zuerst die Administratoraktion **Flottenstatus prüfen**.
7. Verwenden Sie **Flottentelemetrie konfigurieren**, um die Konfiguration an das Fahrzeug zu senden.
8. Verwenden Sie **Flottenkonfiguration lesen**, um zu überprüfen, ob das Fahrzeug meldet, dass

Konfiguration als synchronisiert.

Die Administratoraktionen zeigen häufige Fehlerursachen an, wie z. B. fehlende virtuelle Schlüssel, nicht unterstützte Firmware, deaktiviertes Streaming oder das Erreichen von Konfigurationsgrenzen für Fleet Telemetry.

#### MQTT-Themenformat
Der Adapter abonniert das in der Admin-Oberfläche konfigurierte MQTT-Topic-Basisthema. Bei der Standard-Topic-Basis `tesla-telemetry` sind die erwarteten Topics:

- `tesla-telemetry/<VIN>/v/<FieldName>` für Telemetriewerte
- `tesla-telemetry/<VIN>/connectivity` für Konnektivitätsereignisse
- `tesla-telemetry/<VIN>/errors/<Type>` für Telemetriefehler
- `tesla-telemetry/<VIN>/alerts/<Type>/current` für aktuelle Warnmeldungen

Die Admin-Oberfläche enthält einen separaten Tab für **Flotten-Telemetriefelder**. Der Tesla-Feldkatalog ist in ausklappbare Kategorien unterteilt, sodass die Admin-Seite jeweils nur kleinere Abschnitte rendern/öffnen muss. Dort können Sie einzelne Tesla-Telemetriefelder aktivieren/deaktivieren und das Aktualisierungsintervall pro Feld in Sekunden festlegen. Optionale Werte für `minimum_delta` können für numerische Felder konfiguriert werden, sofern Tesla diese unterstützt. Wenn das Feld leer bleibt und die Admin-Oberfläche einen Platzhalter anzeigt, verwendet der Adapter diesen Standardwert beim Erstellen der Fahrzeugkonfiguration. Für `Location`, `OriginLocation` und `DestinationLocation` interpretiert Tesla `minimum_delta` in Metern, sodass der Standardwert für `100 m` in etwa den Breiten-/Längengraden von `0.001°` entspricht und geringfügige GPS-Schwankungen bei Aktualisierungen vermieden werden. Weitere nützliche Standardwerte sind für gängige Felder wie Prozentwert, Reichweite, Geschwindigkeit, Temperatur, Stromstärke, Spannung, Leistung und Energie vorhanden. Felder, die bereits vom Adapter zugeordnet sind, werden in den bestehenden Tesla-Zustandsbaum zurückgeschrieben. Andere ausgewählte Felder werden als Rohwerte unter `<VIN>.telemetry.fields.<FieldName>` gespeichert, sodass Skripte sie weiterhin verwenden können.

Die zugeordneten Felder umfassen derzeit die am häufigsten verwendeten Lade-, Batterie-, Positions- und Verriegelungszustände:

- `Soc` -> `charge_state.battery_level`
- `ChargeState` -> `charge_state.telemetry_charge_state`
- `DetailedChargeState` -> `charge_state.charging_state` und

`charge_state.detailed_charge_state`

- `ChargeLimitSoc` -> `charge_state.charge_limit_soc`
- `ChargeAmps` -> `charge_state.charge_amps` und

`charge_state.charger_actual_current`

- `ChargeCurrentRequest` -> `charge_state.charge_current_request`
- `ChargeCurrentRequestMax` -> `charge_state.charge_current_request_max`
- `ChargingCableType` -> `charge_state.conn_charge_cable`
- `ChargePortDoorOpen` -> `charge_state.charge_port_door_open`
- „EstBatteryRange“ -> „charge_state.est_battery_range“.
- `VehicleSpeed` -> `drive_state.speed`
- `Gear` -> `drive_state.shift_state`
- `Location` -> `drive_state.latitude` und `drive_state.longitude`
- `Locked` -> `vehicle_state.locked`
- `Kilometerzähler` -> `Fahrzeugstatus.Kilometerzähler`
- `VehicleName` -> `vehicle_state.vehicle_name`

Intern wird die Auswahl aus Gründen der Abwärtskompatibilität mit älteren Admin-Versionen als JSON gespeichert. Manuelle JSON-Werte können einfache Sekunden oder vollständige Tesla-Feldoptionen sein:

```json
{
  "Soc": { "interval_seconds": 1, "minimum_delta": 1 },
  "ChargeState": 1,
  "DetailedChargeState": 1,
  "ChargeAmps": 1,
  "Location": { "interval_seconds": 10, "minimum_delta": 100 },
  "Locked": 1
}
```

Die Flottentelemetrie ist änderungsbasiert: Ein Feld wird erst ausgegeben, nachdem die entsprechende Zeitspanne (`interval_seconds`) abgelaufen ist **und** sich der Wert geändert hat. Sofern konfiguriert, unterdrückt `minimum_delta` zusätzlich kleinere numerische Wertänderungen, bevor diese gesendet werden. Die Standardeinstellung verwendet daher `Soc` mit `interval_seconds=1` und `minimum_delta=1`, sodass Aktualisierungen des Batteriestands schnell gemeldet werden, jedoch erst, nachdem sich mindestens ein Prozentpunkt geändert hat. Wenn ein Feld auf `false` gesetzt wird, wird es aus der Fahrzeugkonfiguration entfernt.

Wenn der Telemetriemodus aktiviert ist, wird Fleet Telemetry als primäre Live-Datenquelle verwendet. Die optionale periodische Fleet-API-Synchronisierung fragt weiterhin die normalen Endpunkte `vehicle_data` im konfigurierten **normalen Aktualisierungsintervall** ab, sodass Zustände, die nicht von den ausgewählten Telemetriefeldern abgedeckt werden, weiterhin aktualisiert werden. Setzen Sie das normale Aktualisierungsintervall auf `0`, um diese geplante Fleet-API-Synchronisierung vollständig zu deaktivieren. Die durch Kommas getrennte Ausschlussliste gilt auch für periodische API-Synchronisierungsabfragen und kann `vehicle_data`-Endpunkte wie `charge_state`, `climate_state`, `drive_state`, `vehicle_state`, `vehicle_config`, `location_data` und dedizierte Endpunkte wie `charge_history` enthalten.

Diagnostische Zustände sind unter `tesla-motors.0.info.*` verfügbar:

- `telemetryConnected`
- `telemetryConfigured`
- `telemetrySynced`
- `telemetryLastMessage`
- `telemetryLastError`
- `telemetryLastApiSync`
- `telemetryLastVehicleDataSync`
- `telemetryLastChargeHistorySync`

### Fragen und Diskussionen
<https://forum.iobroker.net/topic/47203/test-tesla-motors-v1-0-0>

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 3.2.1 (2026-06-05)

- (ChrMaass) Update the release tooling dependency to satisfy the ioBroker repository checker.

### 3.2.0 (2026-06-01)

- (ChrMaass) Reduce routine Fleet API polling log noise by moving frequent vehicle state and vehicle_data messages to debug while keeping anomalies as warnings.

### 3.1.1 (2026-06-01)

- (ChrMaass) Clarify Tesla OAuth re-authorization after scope changes and log missing-scope errors with a reset hint.

### 3.1.0 (2026-05-31)

- (ChrMaass) Support the normal Fleet command endpoint for vehicles that do not support or do not require the Tesla Vehicle Command Protocol.

### 3.0.1 (2026-05-31)

- (ChrMaass) Fix the Sentry README notice to match the repository checker standard wording.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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