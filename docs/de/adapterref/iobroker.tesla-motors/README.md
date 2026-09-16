---
chapters: {"pages":{"en/adapterref/iobroker.tesla-motors/README.md":{"title":{"en":"ioBroker.tesla-motors"},"content":"en/adapterref/iobroker.tesla-motors/README.md"},"en/adapterref/iobroker.tesla-motors/docs/fleet-telemetry-setup.md":{"title":{"en":"Fleet Telemetry setup guide"},"content":"en/adapterref/iobroker.tesla-motors/docs/fleet-telemetry-setup.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motors
hash: KhM2/6dwYLL5z36LkuPdRPMRnrw27gzAAIxTnnxDYC8=
---
![Logo](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/tesla-motors-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/tesla-motors-stable.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/workflows/Test%20and%20Release/badge.svg)

# ioBroker.tesla-motors

## Tesla-Adapter für ioBroker

Alle Tesla-Fahrzeuge und Powerwalls aus der Tesla-App werden über die offizielle **Tesla Fleet API** angezeigt und aktualisiert.

Fahrzeugbefehle (Verriegeln, Entriegeln, Klima, Laden usw.) werden für alle Modelle unterstützt, einschließlich der Fahrzeuge ab Baujahr 2021, die **eine durchgängige Befehlssignierung** (Vehicle Command Protocol) erfordern.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

### Anforderungen

- Tesla-Konto mit Fahrzeugen oder Energieprodukten
- Node.js >= 22
- Eine registrierte Tesla Fleet API-Anwendung (Client-ID + Client-Geheimnis) von [developer.tesla.com](https://developer.tesla.com)
- Eine Fleet Key-Domäne (zur Installation virtueller Schlüssel im Fahrzeug)

### Einrichtung (Schritt für Schritt)

Die Admin-Benutzeroberfläche des Adapters führt Sie durch 4 Schritte:

#### Schritt 1: Schlüsselpaar generieren

1. Klicken Sie in den Adaptereinstellungen **auf „Schlüsselpaar generieren“** , um ein EC-Schlüsselpaar zu erstellen (prime256v1).
2. Klicken Sie auf **„Öffentlichen Schlüssel kopieren“** und gehen Sie zu [fleetkey.net](https://fleetkey.net) . Fügen Sie den Schlüssel unter „Host Public Key“ ein und erstellen Sie eine Subdomain (z. B. ).`abc123.fleetkey.net` )
3. Nach dem Speichern wird Ihr öffentlicher Schlüssel auf FleetKey.net gespeichert. Tesla lädt den Schlüssel während der Registrierung von dort herunter.

#### Schritt 2: Tesla-Entwickler-App

1. Erstellen Sie eine Fleet-API-Anwendung auf [developer.tesla.com](https://developer.tesla.com/request)
2. Legen Sie **Origin** auf Ihre vollständige FleetKey-Subdomain fest (z. B.`https://abc123.fleetkey.net` )
3. **Weiterleitungs-URL** festlegen auf`https://auth.tesla.com/void/callback`
4. Kopieren Sie **die Client-ID** und **das Client-Geheimnis** aus der erstellten App und geben Sie diese zusammen mit Ihrer FleetKey-Domäne (z. B.) unten ein.`abc123.fleetkey.net` )

#### Schritt 3: Authentifizierung (OAuth2)

1. Klicken Sie auf **„Authentifizierungslink generieren“** – ein neuer Browser-Tab mit der Tesla-Anmeldeseite öffnet sich.
2. Melden Sie sich mit Ihrem Tesla-Konto an und autorisieren Sie die App.
3. Nach dem Einloggen wird die Meldung „Seite nicht gefunden“ angezeigt – das ist normal! Kopieren Sie die vollständige URL aus der Adressleiste Ihres Browsers.
4. Fügen Sie die URL in das Feld „Code-URL“ ein und klicken Sie auf **„Speichern und schließen“.**

**Warnung:** Geben Sie diese URL niemals an Dritte weiter! Sie gewährt Zugriff auf Ihr Tesla-Konto.

#### Nach Änderung der Tesla-Bereiche erneut autorisieren

Wenn Sie später in der Tesla Developer App Berechtigungen hinzufügen oder ändern, erhält das bestehende Aktualisierungstoken diese Berechtigungen nicht automatisch. Setzen Sie zuerst die gespeicherte Fleet-Sitzung zurück und führen Sie dann den OAuth-Ablauf erneut aus.

1. Aktivieren Sie die **Option „Anmelde-/Token-Informationen zurücksetzen“** in den Adaptereinstellungen.
2. Die Einstellungen werden einmal gespeichert und geschlossen. Der Adapter löscht die gespeicherte Fleet-Sitzung und die Code-URL und startet neu.
3. Öffnen Sie die Einstellungen erneut, generieren Sie einen neuen Authentifizierungslink und autorisieren Sie Tesla mit den erforderlichen Berechtigungen.
4. Fügen Sie die neue Callback-URL in das **Feld „Code-URL“** ein und speichern Sie erneut.

Eine neue Callback-URL wird ignoriert, ohne dass die gespeicherte Sitzung zurückgesetzt wird, während die alte Sitzung weiterhin aktualisiert werden kann.

#### Schritt 4: Virtuellen Schlüssel installieren

Der virtuelle Schlüssel wird benötigt, um Befehle an Ihr Fahrzeug zu senden (Verriegeln/Entriegeln, Klimatisierung, Laden usw.). Ohne ihn können Sie lediglich Fahrzeugdaten auslesen. Diesen Schritt können Sie durchführen, nachdem der Adapter in Betrieb genommen wurde.

1. Öffnen Sie die in den Adaptereinstellungen Ihres Telefons angezeigte virtuelle Schlüssel-URL (oder scannen Sie den QR-Code).
2. Die Tesla-App fordert Sie auf, das Hinzufügen eines „Drittanbieterschlüssels“ zu bestätigen.
3. Gehen Sie zu Ihrem Fahrzeug und halten Sie Ihre Schlüsselkarte an die Mittelkonsole, um die Installation zu bestätigen.

### Fernbefehle

Fernbefehle sind verfügbar unter`tesla-motors.0.<VIN>.remote` Die

Unterstützte Befehle umfassen:

- **Sperren/Entsperren** :`door_lock` ,`door_unlock`
- **Klima** :`auto_conditioning_start` ,`auto_conditioning_stop` ,`set_temps` ,`set_preconditioning_max` ,`remote_seat_heater_request` ,`remote_auto_seat_climate_request` ,`remote_steering_wheel_heater_request`
- **Aufladen** :`charge_start` ,`charge_stop` ,`set_charge_limit` ,`set_charging_amps` ,`charge_port_door_open` ,`charge_port_door_close` ,`set_scheduled_charging`
- **Stamm** :`actuate_trunk` (vorne/hinten)
- **Windows** :`window_control` (Lüftung/Schließen)
- **Sicherheit** :`set_sentry_mode` ,`remote_start_drive`
- **Medien** :`media_toggle_playback` ,`media_next_track` ,`media_prev_track`
- **Andere** :`flash_lights` ,`honk_horn` ,`trigger_homelink` ,`schedule_software_update`

Klimaabhängige Sitz- und Lenkradbedienelemente, einschließlich`remote_auto_seat_climate_request` , erfordern eine aktive Vorkonditionierung oder den Climate Keeper. Klimatisieren Sie zuerst mit`auto_conditioning_start` (oder aktivieren Sie Climate Keeper), bevor Sie diese Befehle senden. Wenn Climate Keeper deaktiviert ist, lehnt Tesla den Befehl ab.`cabin comfort remote settings not enabled` Die

### Feldbeschreibung

- df: Fahrerseite
- dr: Fahrer hinten
- pf: Beifahrerseite
- pr: Beifahrer hinten
- ft: vorderer Kofferraum
- rt: Heckklappe

### Technische Details

- **Fleet API** : Regionale Endpunkte (EU/NA/CN) mit automatischer Regionserkennung anhand des JWT-Tokens
- **Befehlssignierung** : ECDSA P-256 + HMAC-SHA256 über protobuf (Vehicle Command Protocol)
- **Zwei Domänen** : DOMAIN\_INFOTAINMENT (Klima, Laden, Medien) und DOMAIN\_VEHICLE\_SECURITY (Verriegeln, Entriegeln, Kofferraum)
- **Sitzungsverwaltung** : ECDH-Handshake pro Domäne, epochen- und zählerbasiert, gespeichert im ioBroker-Status
- **Token-Aktualisierung** : Automatische Aktualisierung vor Ablauf

### Admin-Benutzeroberfläche und Migrationshinweise

Die Adaptereinstellungen verwenden ioBroker's`jsonConfig` Admin-UI. Bestehende Adapterinstanzen behalten ihre gespeicherte Konfiguration, aber die Einstellungsseite wurde neu organisiert, um die Einrichtung der Fleet API, die Fleet Telemetry Bridge und die Feldauswahl einfacher zu gestalten.

Wenn Sie von einer älteren Version 2.x aktualisieren, öffnen Sie bitte einmal die Adaptereinstellungen und überprüfen Sie die Fleet-API-Zugangsdaten, die virtuelle Schlüsseldomäne und die optionalen Fleet-Telemetrie-Einstellungen, bevor Sie eine neue Fleet-Telemetrie-Konfiguration starten.

### Optionaler Flotten-Telemetrie-Modus (MQTT-Bridge)

Beginnend mit der Migration der Fleet API kann der Adapter auch zusammen mit Teslas **Fleet Telemetry-** Dienst verwendet werden, um zu reduzieren`vehicle_data` Die Abfragekosten werden berechnet. Die Flottentelemetrie ist optional. Wenn sie deaktiviert ist, behält der Adapter das bestehende Abfrageverhalten unverändert bei.

Die erste Implementierung verwendet eine **MQTT-Brücke** und hält den Fleet Telemetry-Empfänger bewusst außerhalb des Adapters:

1. Tesla-Fahrzeuge streamen Telemetriedaten an einen selbst gehosteten [Flottentelemetrie-](https://github.com/teslamotors/fleet-telemetry) Server.
2. Der Server veröffentlicht ausgewählte Fahrzeugdaten über MQTT.
3. Der Adapter abonniert die MQTT-Themen und schreibt die Daten zurück in den bestehenden Tesla-Zustandsbaum.

Dadurch bleiben bestehende Skripte und Aliase funktionsfähig, während gleichzeitig der regelmäßige Aufwand reduziert wird.`vehicle_data` Anfragen.

Eine praktische, anfängerfreundliche Anleitung zur Einrichtung mit Docker Compose, Zertifikaten, TCP-Passthrough, Adaptereinstellungen und Fehlerbehebung finden Sie unter [docs/fleet-telemetry-setup.md](/#/docs/adapterref/iobroker.tesla-motors/docs/fleet-telemetry-setup.md) .

#### Anforderungen

- Ein erreichbarer Tesla Fleet Telemetry-Server mit`transmit_decoded_records=true` Die
- Ein MQTT-Broker, der vom ioBroker-Host aus erreichbar ist.
- Ein lokaler [Fahrzeugbefehls-](https://github.com/teslamotors/vehicle-command) Proxy für Flottentelemetrie-Konfigurationsaufrufe.
- Eine Serverzertifikats-/CA-Kette für den öffentlichen Fleet Telemetry-Endpunkt.
- Ein Fahrzeug mit Flottentelemetrie-Unterstützung und einem zugehörigen virtuellen Schlüssel.

Der Flotten-Telemetrie-Server muss vom Fahrzeug über den konfigurierten öffentlichen Host und Port erreichbar sein. In vielen Installationen ist hierfür TCP-Passthrough anstelle eines normalen HTTPS-Reverse-Proxys erforderlich, da Tesla direkt mit dem Flotten-Telemetrie-Server kommuniziert.

Zusätzliche Adaptereinstellungen sind verfügbar für:

- Telemetriemodus aktivieren
- der lokale`vehicle-command` Proxy-URL zur Konfiguration der Telemetrie im Fahrzeug
- Hostname / Port / Zertifikatskette des Telemetrieservers
- MQTT-Broker, Themenbasis und Zugangsdaten
- die Auswahl des Flottentelemetriefelds und pro Feld`interval_seconds` / optional`minimum_delta`
- eine optionale periodische Fleet-API-Synchronisierung für Daten, die nicht von der Telemetrie abgedeckt werden.

#### Adapterkonfiguration

1. Starten und aktivieren Sie den Fleet Telemetry-Server.
2. Konfigurieren Sie den MQTT-Datenspeicher so, dass er dekodierte Datensätze an Ihren MQTT-Broker sendet.
3. Führe die`vehicle-command` Proxy im selben vertrauenswürdigen Netzwerk wie ioBroker.
4. Konfigurieren Sie die Adaptereinstellungen:
   - **Flottentelemetrie-Modus** aktivieren
   - geben Sie ein`vehicle-command` Proxy-URL
   - Geben Sie den öffentlichen Hostnamen, Port und CA/fullchain PEM der Flottentelemetrie ein.
   - Geben Sie den MQTT-Broker, optionale Anmeldeinformationen und die Themenbasis ein.
5. Wählen Sie auf der Registerkarte **„Flottentelemetriefelder“** die gewünschten Felder, Intervalle und optionalen Mindestdeltas aus.
6. Verwenden Sie zuerst die Administratoraktion **„Flottenstatus prüfen“** .
7. Verwenden Sie **„Flottentelemetrie konfigurieren“,** um die Konfiguration an das Fahrzeug zu senden.
8. Verwenden Sie **„Flottenkonfiguration lesen“,** um zu überprüfen, ob das Fahrzeug die Konfiguration als synchronisiert meldet.

Die Administratoraktionen zeigen häufige Fehlerursachen an, wie z. B. fehlende virtuelle Schlüssel, nicht unterstützte Firmware, deaktiviertes Streaming oder das Erreichen von Konfigurationsgrenzen für Fleet Telemetry.

#### MQTT-Themenformat

Der Adapter abonniert das in der Admin-Oberfläche konfigurierte MQTT-Topic „base“. Mit dem Standard-Topic „base“`tesla-telemetry` Die erwarteten Themen sind:

- `tesla-telemetry/<VIN>/v/<FieldName>` für Telemetriewerte
- `tesla-telemetry/<VIN>/connectivity` für Konnektivitätsereignisse
- `tesla-telemetry/<VIN>/errors/<Type>` für Telemetriefehler
- `tesla-telemetry/<VIN>/alerts/<Type>/current` für aktuelle Warnmeldungen

Die Admin-Oberfläche enthält einen separaten Tab **für Flottentelemetriefelder** . Der Tesla-Feldkatalog ist in ausklappbare Kategorien unterteilt, sodass die Admin-Seite jeweils nur kleinere Abschnitte rendern/öffnen muss. Dort können Sie einzelne Tesla-Telemetriefelder aktivieren/deaktivieren und das Aktualisierungsintervall pro Feld in Sekunden festlegen. Optional`minimum_delta` Für numerische Felder, die von Tesla unterstützt werden, können Werte konfiguriert werden. Wenn das Feld leer bleibt und die Admin-Benutzeroberfläche einen Platzhalter anzeigt, verwendet der Adapter diesen Standardwert beim Erstellen der Fahrzeugkonfiguration.`Location` ,`OriginLocation` Und`DestinationLocation` Tesla interpretiert`minimum_delta` in Metern, also der Standardwert`100 m` entspricht in etwa`0.001°` Breiten- und Längengrad werden ermittelt und minimale GPS-Schwankungen vermieden. Weitere nützliche Standardwerte werden für gängige Felder wie Prozentwert, Reichweite, Geschwindigkeit, Temperatur, Stromstärke, Spannung, Leistung und Energie bereitgestellt. Felder, die bereits vom Adapter zugeordnet sind, werden in den bestehenden Tesla-Zustandsbaum zurückgeschrieben. Andere ausgewählte Felder werden als Rohwerte gespeichert.`<VIN>.telemetry.fields.<FieldName>` Skripte können sie also weiterhin verwenden.

Die zugeordneten Felder umfassen derzeit die am häufigsten verwendeten Lade-, Batterie-, Positions- und Verriegelungszustände:

- `Soc` ->`charge_state.battery_level`
- `ChargeState` ->`charge_state.telemetry_charge_state`
- `DetailedChargeState` ->`charge_state.charging_state` Und`charge_state.detailed_charge_state`
- `ChargeLimitSoc` ->`charge_state.charge_limit_soc`
- `ChargeAmps` ->`charge_state.charge_amps` Und`charge_state.charger_actual_current`
- `ChargeCurrentRequest`->`charge_state.charge_current_request`
- `ChargeCurrentRequestMax` ->`charge_state.charge_current_request_max`
- `ChargingCableType` ->`charge_state.conn_charge_cable`
- `ChargePortDoorOpen` ->`charge_state.charge_port_door_open`
- `EstBatteryRange` ->`charge_state.est_battery_range`
- `VehicleSpeed` ->`drive_state.speed`
- `Gear` ->`drive_state.shift_state`
- `Location` ->`drive_state.latitude` Und`drive_state.longitude`
- `Locked` ->`vehicle_state.locked`
- `Odometer` ->`vehicle_state.odometer`
- `VehicleName` ->`vehicle_state.vehicle_name`

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

Die Flottentelemetrie basiert auf Änderungen: Ein Feld wird erst ausgegeben, nachdem es`interval_seconds` Zeit verstrichen **und** der Wert hat sich geändert. Sofern konfiguriert,`minimum_delta` Zusätzlich werden kleinere numerische Wertänderungen unterdrückt, bevor sie gesendet werden. Die Standardeinstellung verwendet daher`Soc` mit`interval_seconds=1` Und`minimum_delta=1` Aktualisierungen des Akkuladestands werden daher schnell gemeldet, jedoch erst, nachdem sich mindestens ein Prozentpunkt geändert hat. Ein Feld wird auf`false` wird bei der Fahrzeugkonfiguration nicht berücksichtigt.

Wenn der Telemetriemodus aktiviert ist, wird Fleet Telemetry als primäre Live-Datenquelle verwendet. Die optionale periodische Fleet-API-Synchronisierung fragt weiterhin die normale Datenquelle ab.`vehicle_data` Endpunkte im konfigurierten **normalen Aktualisierungsintervall,** sodass Zustände, die nicht von den ausgewählten Telemetriefeldern abgedeckt werden, weiterhin aktualisiert werden. Legen Sie das normale Aktualisierungsintervall fest auf`0` Um diese geplante Fleet-API-Synchronisierung vollständig zu deaktivieren. Die durch Kommas getrennte Ausschlussliste gilt auch für periodische API-Synchronisierungsabfragen und kann Folgendes enthalten:`vehicle_data` Endpunkte wie z. B.`charge_state` ,`climate_state` ,`drive_state` ,`vehicle_state` ,`vehicle_config` ,`location_data` und dedizierte Endpunkte wie`charge_history` Die

Diagnostische Zustände sind verfügbar unter`tesla-motors.0.info.*` :

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

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**

### 3.2.2 (2026-07-27)

- (TA2k) fix QR Code generation

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.tesla-motors/blob/master/CHANGELOG_OLD.md)

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