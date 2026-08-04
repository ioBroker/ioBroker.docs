---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.victron-gx/README.md
title: ioBroker Victron GX Adapter
hash: ZorZ0inPZcPuRq5wrvs3VsENRaPumg1NqMa4PgrBtTc=
---
# IoBroker Victron GX Adapter

![NPM-Version](https://img.shields.io/npm/v/iobroker.victron-gx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.victron-gx.svg)
![Installationen](https://iobroker.live/badges/victron-gx-installed.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen)

<img src="admin/victron-gx.png" width="100" align="right">

Dieser Adapter verbindet ioBroker **direkt und lokal** mit [Victron Energy](https://www.victronenergy.com/) GX-Geräte ([Cerbo GX, Venus GX, Ekrano GX])](https://www.victronenergy.com/communication-centres)) – ohne Umweg über Home Assistant oder die VRM Cloud.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/sefinads)

🇩🇪 [Deutsche Anleitung](docs/README_de.md)

---

## Was bewirkt dieser Adapter?
Verbindet ioBroker direkt und lokal über das lokale MQTT-Protokoll mit Victron GX-Geräten. Unterstützt das Auslesen aller Gerätedaten und die vollständige Steuerung von Energiespeichersystemen und Wechselrichtern über Modbus TCP.

- Alle Gerätedatenpunkte werden **automatisch** erkannt und als ioBroker-Zustände erstellt.
- Schreibbare Datenpunkte befinden sich direkt unter `devices.*` – `common.write` gibt an, ob der entsprechende Steuerungsschalter (Modbus / MQTT) aktuell aktiviert ist.
- Funktioniert mit Einphasen- und Dreiphasensystemen
- Automatische Modbus-Geräte-ID-Erkennung
- **Geringer RAM-Bedarf**: ~130 MB stabil
- Virtuelle Geräte über Node-RED (`dbus-victron-virtual`) werden vollständig unterstützt

---

## Anforderungen
**Auf dem GX-Gerät:**

- MQTT aktivieren: `Einstellungen → Integrationen → MQTT-Zugriff → Ein`
- Für die Modbus-Steuerung: `Einstellungen → Integrationen → Modbus TCP-Server → Aktiviert`
- Schreibzugriff: `Zugriffsebene → Schreibzugriff erlaubt`

**In ioBroker:**

- Node.js >= 22
- Admin >= 7.7.28

---

## Installation
### Über ioBroker Admin (empfohlen)
Da dieser Adapter noch nicht im offiziellen ioBroker-Repository enthalten ist, installieren Sie ihn über die Registerkarte „npm“ in der Admin-Oberfläche:

1. Öffnen Sie die ioBroker-Administration.
2. Gehen Sie zu **Adapter**
3. Klicken Sie auf das **GitHub/Cat-Symbol** (oben rechts).
4. Wählen Sie die Registerkarte **npm** aus.
5. Geben Sie `iobroker.victron-gx` ein und klicken Sie auf **Installieren**.

### Nach der Installation
1. Konfigurieren Sie die Instanz:
- Geben Sie die **IP-Adresse** des GX-Geräts ein.
- MQTT-Port: `1883` (Standard)
- Optional: **Modbus-Steuerung** (ESS-/Wechselrichterregister werden über Modbus TCP beschreibbar)
- Optional: **MQTT-Steuerung** (Schalter, EV-Ladegerät, Temperatur-Sollwerte werden über MQTT beschreibbar)

**Hinweis:** Node.js >= 22 ist erforderlich. Falls Ihr ioBroker unter Node.js 20 läuft, führen Sie bitte zuerst ein Update durch.

---

## Konfiguration
![Konfiguration](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-einstellungen.png)

| Feld | Beschreibung |
|-------|-------------|
| IP-Adresse des GX-Geräts | Lokale IP-Adresse von Cerbo/Venus/Ekrano GX |
| MQTT-Port | Standard: 1883 |
| MQTT-Benutzername / Passwort | Nur wenn die MQTT-Authentifizierung auf GX konfiguriert ist |
| Modbus-Steuerung | Ermöglicht das Beschreiben von ESS-/Wechselrichter-Datenpunkten (vebus, system) über Modbus TCP |
| Modbus-Port | Standard: 502 |
| MQTT-Steuerung | Ermöglicht das Beschreiben von Schaltern, Ladestationen für Elektrofahrzeuge und Temperatur-Sollwerten über MQTT |

---

## Unterstützte Geräte
Der Adapter erkennt automatisch alle mit dem GX-Gerät verbundenen Geräte:

![GX-Geräte](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-GX-Geräte.png)

| Gerätetyp | Beschreibung |
|-------------|-------------|
| `battery` | Batteriesysteme (z. B. SerialBattery/LLT/JBD) |
| `grid` | Netzzähler (z. B. Shelly 3EM, Carlo Gavazzi) |
| `pvinverter` | PV-Wechselrichter |
| `acload` | Wechselstromlasten (inkl. Shelly 1PM, mit schaltbarem Ausgang) |
| `switch` | Schaltbare Ausgänge (Node-RED virtuelle Schalter, Shelly Pro3/Pro4/1PM, GX internes Relais) |
| `evcharger` | Ladegeräte für Elektrofahrzeuge (Lesen + Steuern) |
| `temperature` | Temperatursensoren |
| `meteo` | Wetterstationen |
| `tank` | Tankfüllstandssensoren |
| `system` | Systemübersicht |
| `system` | Systemübersicht |

---

## Objektstruktur
![Objektstruktur](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-Objektstruktur.png)

```
victron-gx.0
├── devices.*          → All discovered devices - common.write on the individual datapoint tells
│   │                     you whether it's currently writable (see "Writable Data Points" below)
│   ├── battery.*
│   ├── vebus.*                      → Mode, Ac.In1.CurrentLimit, Hub4.* writable (Modbus control)
│   ├── grid.*
│   ├── pvinverter.*
│   ├── acload.<Group>.<Serial>.
│   │   ├── Ac.*                     → measurements (unchanged)
│   │   └── outputs.<N>.             → switchable output, if the device has one (e.g. Shelly 1PM)
│   │       ├── State                    bool, writable (MQTT control)
│   │       ├── Status                   bool, read-only
│   │       ├── Name / CustomName        string
│   │       └── Group                    string
│   ├── switch.<Group>.<Serial>.
│   │   └── outputs.<N>.             → one sub-channel per output (Node-RED: one, Shelly Pro3/4: up to four)
│   │       ├── State / Status / Name / CustomName / Group   (same as above)
│   ├── evcharger.<Serial>.          → SetCurrent, StartStop, Mode writable (MQTT control)
│   ├── temperature.<Serial>.        → Offset, Scale, FilterLength writable (MQTT control)
│   ├── meteo.*
│   ├── tank.*
│   └── system.<Serial>.             → GridSetpoint, EssMode, MinimumSoc, ... writable (Modbus control);
│                                       also carries outputs.0.* for the GX internal relay (MQTT control)
├── overview.*         → System overview (from system/0), read-only
└── info.*             → Connection status
```

`<Group>` ist ein optionaler Zwischenordner, der nur vorhanden ist, wenn für diesen Kanal/dieses Gerät ein Gruppenname konfiguriert ist. Weitere Informationen finden Sie unter [Shelly-Integration & Mehrkanalunterstützung](#shelly-integration--multi-channel-support).

---

## Geräteliste (Admin)
![Geräte-Whitelist](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-Geräte.png)

Der Tab **Geräte** zeigt alle gefundenen Geräte mit Typ, Seriennummer, Name und Anzahl der Datenpunkte an. Die Liste kann als JSON-Datei heruntergeladen werden – nützlich für Supportanfragen.

---

## Themenkatalog (Admin)
![Alle Themen](../../../en/adapterref/iobroker.victron-gx/docs/img/victron-gx-AlleTopics.png)

Der Tab **Alle Themen** zeigt alle MQTT-Themen an, die das GX-Gerät seit dem letzten Start des Adapters gesendet hat. Vom Adapter verarbeitete Themen sind mit einem ✓ markiert. Der Katalog kann als JSON-Datei heruntergeladen werden.

---

## Beschreibbare Datenpunkte
Seit **0.10.0** existiert kein separater `control.*`-Baum mehr. Jeder beschreibbare Datenpunkt befindet sich direkt unter `devices.*`, neben seinen schreibgeschützten Geschwistern. `common.write` am Objekt selbst zeigt Ihnen (und der Admin-Oberfläche/VIS) an, ob es aktuell beschreibbar ist. Zwei unabhängige Konfigurationsschalter steuern dies:

- **Modbus-Steuerung** – ESS/Wechselrichterregister auf `devices.vebus.*` und `devices.system.*`
- **MQTT-Steuerung** – Schalter (`devices.switch.*`/`devices.acload.*`/`devices.system.*` Ausgänge),

die Sollwerte für die Kalibrierung des EV-Ladegeräts und des Temperatursensors

Wenn ein Schalter deaktiviert ist, existiert der Datenpunkt weiterhin (sodass History/Vis-Bindungen und Skripte weiterhin funktionieren), aber `common.write` ist `false` und Schreibvorgänge werden mit einer Protokollwarnung ignoriert – keine stillschweigend verschluckten Schreibvorgänge mehr in einen Datenpunkt, der beschreibbar aussah, es aber nicht war.

### Vorher → nachher (Upgrade von 0.9.x)
| Alt (Steuerung.\*, entfernt in Version 0.10.0) | Neu (Geräte.\*) |
|---|---|
| `control.inverter.Mode` | `devices.vebus.<Serial>.Mode` |
| `control.inverter.AcIn1CurrentLimit` | `devices.vebus.<Serial>.Ac.In1.CurrentLimit` |
| `control.inverter.DisableCharge` | `devices.vebus.<Serial>.Hub4.DisableCharge` |
| `control.inverter.DisableFeedIn` | `devices.vebus.<Serial>.Hub4.DisableFeedIn` |
| `control.system.GridSetpoint` | `devices.system.<Serial>.GridSetpoint` |
| `control.system.EssMode` | `devices.system.<Serial>.EssMode` |
| `control.system.MinimumSoc` | `devices.system.<Serial>.MinimumSoc` |
| `control.system.BatteryLifeState` | `devices.system.<Serial>.BatteryLifeState` |
| `control.system.MaxFeedInPower` | `devices.system.<Serial>.MaxFeedInPower` |
| `control.system.AcFeedInEnabled` | `devices.system.<Serial>.AcFeedInEnabled` |
| `control.system.DcFeedInEnabled` | `devices.system.<Serial>.DcFeedInEnabled` |
| `control.system.DvccMaxChargeCurrent` | `devices.system.<Serial>.DvccMaxChargeCurrent` |
| `control.system.MaxDischargePower` | `devices.system.<Serial>.MaxDischargePower` |
| `control.evcharger.<Instance>.SetCurrent` | `devices.evcharger.<Serial>.SetCurrent` |
| `control.evcharger.<Instance>.StartStop` | `devices.evcharger.<Serial>.StartStop` |
| `control.evcharger.<Instance>.Mode` | `devices.evcharger.<Serial>.Mode` |
| `control.evcharger.<Instance>.Mode` | `devices.evcharger.<Serial>.Mode` |

**Vorgehensweise:** Aktualisieren Sie alle Skripte, Vis-Widgets oder Blockly-Regeln, die direkt auf `control.*` verweisen, und stellen Sie sicher, dass die entsprechende Option (Modbus-Steuerung/MQTT-Steuerung) in den Instanzeinstellungen aktiviert ist, falls Sie auf diese zugreifen. Der Adapter benennt den Konfigurationsschlüssel `controlEnabled` beim ersten Start von Version 0.10.0 automatisch in `modbusControlEnabled` um (Ihre Einstellung bleibt erhalten) – `mqttControlEnabled` bleibt unverändert. Eine einmalige Bereinigung entfernt alle verbleibenden `control.*`-Objekte. In den Versionen 0.10.x und 0.11.x wird bei jedem Start eine Warnung als Erinnerung protokolliert (in Version 0.12.0 entfernt).

**Auch die Schalter sind jetzt gesperrt:** `outputs.<N>.State` war früher bedingungslos beschreibbar; jetzt muss die **MQTT-Steuerung** aktiviert sein, genau wie bei allen anderen Schaltern unter diesem Schalter.

### Beispiele
**ESS-Gittersollwert** (einfachster Ansatz) – `devices.system.<Serial>.GridSetpoint` [W] schreiben:

- `0` → Nulleinspeisung (Der Victron ESS-Algorithmus hält das Netz bei 0 W)
- `-3000` → 3000 W ins Netz einspeisen (Batterieentladung)
- `+500` → 500 W aus dem Netz beziehen (Batterie wird geladen)

Kein Keepalive erforderlich – der Wert wird dauerhaft gespeichert.

**ESS Live-Sollwert** (direkte Steuerung) – Schreiben `devices.vebus.<Serial>.Hub4.L1.AcPowerSetpoint` [W]:

- Erfordert `devices.system.<Serial>.EssMode = 3` (Externe Steuerung)
- Der Adapter sendet den Wert alle 800 ms erneut, solange er ungleich 0 ist (Victron-Watchdog).
- Auf „0“ setzen, um die Steuerung an den Victron ESS-Algorithmus zurückzugeben.

**Behindertenanschluss / Einspeisung:**

- `devices.vebus.<Serial>.Hub4.DisableCharge = 1` → Der Akku wird nicht geladen
- `devices.vebus.<Serial>.Hub4.DisableFeedIn = 1` → Wechselrichter speist nicht ins Netz ein.

**DVCC-Grenzwerte** (erfordert aktiviertes DVCC auf dem GX):

- `devices.system.<Serial>.DvccMaxChargeCurrent` [A]: Systemweite Ladestrombegrenzung (-1 = deaktiviert)
- `devices.system.<Serial>.MaxDischargePower` [W]: Entladeleistungsgrenze

**Virtuelle Schalter** (Node-RED) – `outputs.<N>.State` auf `true`/`false` setzen → MQTT-Schreiben → GX → Node-RED → Relais

**Ladegerät für Elektrofahrzeuge** – Schreibe `devices.evcharger.<Serial>.SetCurrent` [A] / `StartStop` [bool] / `Mode` (0=Manuell, 1=Automatisch, 2=Geplant)

**Temperatursensorkalibrierung** – Schreiben Sie `devices.temperature.<Serial>.Offset` [°C] / `Scale` / `FilterLength`

---

## Virtuelle Geräte (Node-RED)
Der Adapter unterstützt virtuelle Geräte, die über Node-RED mit dem Paket `dbus-victron-virtual` erstellt wurden, vollständig:

- Virtuelle PV-Wechselrichter
- Virtuelle Wechselstromlasten
- Virtuelle Switches (mit Gruppen- und Einzelnamen)
- Virtuelle Temperatursensoren
- Virtuelle Wetterstationen
- Virtuelle Tanksensoren

---

## Shelly-Integration & Mehrkanalunterstützung
Shelly-Geräte, die mit der GX-Integration (Cerbo/Venus/Ekrano) verbunden sind, werden nun zusammen mit virtuellen Node-RED-Switches vollständig unterstützt:

- **Shelly Pro3 / Pro4**: Jedes physische Gerät meldet seine Kanäle als separate MQTT-Geräteinstanzen mit derselben Seriennummer. Der Adapter führt diese automatisch zu einem einzigen Objektbaum zusammen (`devices.switch.<Group>.<Serial>.outputs.<0..3>.*`).
- **Shelly 1PM**: Messwerte (`Ac.*`) und der schaltbare Ausgang (`outputs.0.*`) befinden sich im selben Gerätebaum unter `devices.acload.<Group>.<Serial>`.
- **GX internes Relais**: Das im GX-Gerät selbst eingebaute Relais (`system/0`) kann unter `devices.system.<Serial>.outputs.0.State` geschaltet werden, sobald die **MQTT-Steuerung** aktiviert ist (siehe [Writable Data Points](#writable-data-points)).

Alle schaltbaren Ausgänge – unabhängig vom Gerätetyp – teilen sich die gleiche Unterstruktur, sodass Platzhalterselektoren in Ihrer gesamten Installation funktionieren:

```javascript
// Every switchable output, any device type, any group
'victron-gx.0.devices.*.*.*.outputs.*.State'

// Just the custom names, for a device overview
'victron-gx.0.devices.*.*.*.outputs.*.CustomName'
```

### ⚠️ Breaking Change (v0.9.x)
Die Ausgänge der Schalter befanden sich früher direkt unter dem Gerätekanal; jetzt befinden sie sich unter einem `outputs.<N>`-Unterkanal. Node-REDs `output_1` wird auf `outputs.1` normalisiert.

| Alt (v0.8.x) | Neu (v0.9.x) |
|---|---|
| `devices.switch.<Group>.<Serial>.State` | `devices.switch.<Group>.<Serial>.outputs.1.State` |
| `devices.switch.<Group>.<Serial>.Status` | `devices.switch.<Group>.<Serial>.outputs.1.Status` |

Aktualisieren Sie alle Skripte, Vis-Widgets oder Blockly-Regeln, die direkt auf die alten Pfade verweisen.

Wenn Sie die verbliebenen alten Objekte entfernen möchten, führen Sie diesen Befehl in der ioBroker-CLI aus (die abschließende Schleife umgeht den bekannten Fehler "Ungültige ID: undefiniert", der beim Löschen über die Admin-Benutzeroberfläche auftritt):

```bash
iobroker object list | grep -oP 'victron-gx\.0\.devices\.switch\.[^.]+\.[^.]+\.(State|Status)$' \
  | while read id; do iobroker object del "$id"; done
```

### Automatische Bereinigung verwaister Kanäle (optional)
Wenn Sie einen Kanal in eine andere Gruppe verschieben, einen Shelly-Kanal deaktivieren oder einen Node-RED-Schalter löschen, verschwindet dessen MQTT-Thema – die ioBroker-Objekte bleiben jedoch erhalten. Aktivieren Sie **Verwaiste Kanäle beim Start entfernen** (Registerkarte „Haupteinstellungen“, standardmäßig deaktiviert), damit der Adapter diese automatisch löscht.

- Wird einmal pro Adapterstart ausgeführt, und zwar erst nach etwa 30 Sekunden ohne neu erkannten Kanal (sodass Mehrkanalgeräte wie der Shelly Pro3, deren Instanzen sich zu leicht unterschiedlichen Zeitpunkten melden, nicht mitten im Startvorgang beeinträchtigt werden).
- Betrifft ausschließlich die Kanäle `outputs.<N>`. Gerätebezogene Metadaten, `Ac.*`-Messwerte und `overview.*` werden dadurch nicht entfernt.
- Lassen Sie diese Option deaktiviert, wenn Ihre Geräte häufig offline sind – ein Kanal, der bis zum Zeitpunkt der Überprüfung noch keine Rückmeldung gegeben hat, wird als verwaist betrachtet und gelöscht.

---

## Changelog

### 0.10.0 (2026-08-01)
- **BREAKING:** the `control.*` branch has been removed - writable datapoints now live directly under `devices.*`, with `common.write` gated by two config toggles (Modbus control / MQTT control). See README section "Writable Data Points" for the full old→new mapping and migration steps.
- **BREAKING:** switches (`outputs.<N>.State`) now require MQTT control to stay writable (previously unconditional).
- **BREAKING:** the config key `controlEnabled` was renamed to `modbusControlEnabled` (value preserved automatically on first start).
- EV charger control is no longer experimental - treated the same as any other device type now.
- Temperature sensor calibration (`Offset`/`Scale`/`FilterLength`) is now writable.
- A migration warning with the full old→new mapping is logged on every start in 0.10.x/0.11.x and will be removed in 0.12.0.

### 0.9.4 (2026-07-29)
- Semantic change: control datapoints (control.system.*, control.inverter.*, control.evcharger.*) are now only created when the matching control switch (controlEnabled / mqttControlEnabled) is active, and are then always writable (no more silently ignored writes). Existing objects are automatically removed when the switch is disabled. If you have scripts targeting control.*, check that the matching switch is enabled in the adapter settings. Note: disabling the switch discards the last known value of the affected control state - relevant for History adapter users (gap in the log).

### 0.9.3 (2026-07-28)
- Fixed race condition during initial object creation that caused 'no existing object' warnings after fresh installs affecting all device types.

### 0.9.2 (2026-07-28)
- Fix: control.evcharger states became writable but stateChange events were never delivered (subscribe only reacted to controlEnabled, not mqttControlEnabled)

### 0.9.1 (2026-07-27)
- Added support for EV chargers (read + experimental control) and generic temperature inputs (dbus-adc). Thanks to Samson71 for the catalog. Community testing appreciated.


### 0.9.0 (2026-07-19)

**⚠️ BREAKING CHANGES**
- Switch and AC-load outputs now live under `outputs.<N>.State/Status` instead of directly at the device folder
- Node-RED virtual switches: previously `.State`, now `.outputs.1.State`
- Anyone referencing these paths in Vis or scripts needs to update them
- Migration guide: see README section "Shelly integration & multi-channel support"

**New: Shelly device integration**
- Full multi-channel support for Shelly devices connected via Cerbo/Venus/Ekrano GX (via dbus-shelly bridge, Venus OS 3.60+)
- Tested with Shelly Plus series (Plus 1/1PM/2PM/Plug S), Shelly Plugs, Shelly Pro3 as switch, Shelly 1PM as acload
- Shelly PM devices: supported from model version 3 onward (in line with Victron's own compatibility list); older models are not supported by Victron's bridge and therefore also not reachable via this adapter
- Multi-instance merging: channels of one Shelly device are automatically merged into a single object tree via their common serial
- Shelly devices with measurement (e.g. 1PM as acload): measurement values and switchable output coexist on the same object
- GX internal relay (system/0) is now switchable as well

**New: Extended AC-load datapoints**
- `Ac.Power` (total power)
- `Ac.Energy.Reverse`, `Ac.L*.Energy.Reverse`
- `Ac.L*.PowerFactor`
- Metadata: `Role`, `IsGenericEnergyMeter`, `PhaseSetting`, `ProductId`

**New: Cleanup toggle**
- New option "Remove orphaned channels on startup" (default off)
- Cleans up leftover objects after group changes or channel deactivation
- Conservative: only removes objects whose serial is still active under another group (no data loss for offline devices)
- Available in all 11 UI languages

**Fixes**
- Object store race during parallel channel/state creation (previously caused occasional invalid-type objects invisible to the sweep)
- Group migration zombies are now removed (channel moved between groups at the GX)
- Instance tile IP address and web UI link now show the configured GX IP of the respective instance (previously showed server IP or IP from instance 0)
- Various smaller log and cosmetic fixes

### 0.8.10 (2026-07-04)
- Review fixes for official repository inclusion: English-only log messages, admin tabs and state labels; sanitized serial numbers in object IDs; completed news and localLinks translations; removed unused pollingInterval; docs cleanup; updated @iobroker/types to 7.2.2

### 0.8.9 (2026-07-02)
- chore: bump @iobroker/adapter-core to 3.4.1

### 0.8.8 (2026-06-14)
- Release 0.8.8

### 0.8.6 (2026-06-14)
- Fix: add Ac.Power to RELEVANT_PATHS for pvinverter, acload and grid devices

### 0.8.5 (2026-06-12)
- docs: add Ko-fi button and improved installation instructions

### 0.8.4 (2026-06-11)
- docs: add Ko-fi support badge

### 0.8.3 (2026-06-11)
- docs: improved installation instructions, added npm download badge

### 0.8.2 (2026-06-11)
- Fix: memory leak caused by stale device timer using native clearTimeout instead of this.clearTimeout; fix: topic catalog now only stores new topics instead of re-allocating on every MQTT message

### 0.8.1 (2026-06-10)
- Fix: remove invalid nodeVersion from io-package.json; add localLinks; add i18n for admin config

### 0.8.0 (2026-06-10)
- Topic Map and Topic Catalog as Admin tabs; dynamic device discovery without timer; Switch CustomName from Node-RED; Node.js >= 22, Admin >= 7.7.28 required

### 0.7.7 (2026-06-09)
- Add localLink to instance overview for direct GX access

### 0.7.5 – 0.7.6
- Fix: remove invalid supportedMessages from io-package.json
- Add localLink to instance overview for direct GX access

### 0.7.3 – 0.7.4
- Performance: static fast-path after 60s discovery reduces RAM to ~100MB stable
- Add meteo device support
- Fix temperature device (Humidity/Pressure)
- Fix CustomName for all devices

### 0.7.0 – 0.7.2
- Performance: state object cache reduces RAM from ~660MB to ~155MB
- Full i18n support for all state names
- Fix object structure (folder/channel hierarchy)

### 0.6.0
- Breaking: `ess.*` renamed to `control.system.*`
- `control.inverter.*` added
- All device datapoints are strictly read-only
- AcPowerSetpoint keepalive every 800ms

### 0.1.0
- Complete read support for all device types

---

[Older changelogs](CHANGELOG_OLD.md)

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Sefina-DS