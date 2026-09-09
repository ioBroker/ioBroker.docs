---
chapters: {"pages":{"en/adapterref/iobroker.victron-gx/README.md":{"title":{"en":"ioBroker Victron GX Adapter"},"content":"en/adapterref/iobroker.victron-gx/README.md"},"en/adapterref/iobroker.victron-gx/docs/README_de.md":{"title":{"en":"ioBroker Victron GX Adapter"},"content":"en/adapterref/iobroker.victron-gx/docs/README_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.victron-gx/docs/README_de.md
title: ioBroker Victron GX Adapter
hash: lYFB5JdF6xchktrZOm7Fn6Cnyoh5b5rPvtFrivdKqP8=
---
# ioBroker Victron GX Adapter

![NPM-Version](https://img.shields.io/npm/v/iobroker.victron-gx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.victron-gx.svg)
![Installationen](https://iobroker.live/badges/victron-gx-installed.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen)

<img src="../admin/victron-gx.png" width="100" align="right">

Dieser Adapter verbindet ioBroker **direkt und lokal** mit [Victron Energy](https://www.victronenergy.com/) GX-Geräten ( [Cerbo GX, Venus GX, Ekrano GX](https://www.victronenergy.com/communication-centres) ) – ohne Umweg über Home Assistant oder die VRM Cloud.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/sefinads)

---

## Was macht dieser Adapter?

Verbindet ioBroker direkt und lokal mit Victron GX-Geräten über das lokale MQTT-Protokoll. Unterstützt das Lesen aller Gerätedaten und die vollständige ESS/Wechselrichter-Steuerung über Modbus TCP.

- Alle Geräte-Datenpunkte werden **automatisch erkannt** und als ioBroker States angelegt
- Schreibbare Datenpunkte liegen direkt unter`devices.*` –`common.write` zeigt an, ob der passende Steuer-Schalter (Modbus / MQTT) gerade aktiv ist
- Funktioniert mit ein- und dreiphasigen Systemen
- Automatische Modbus-Einheiten-ID-Erkennung
- **Geringer RAM-Verbrauch** : \~130 MB stabil
- Virtuelle Geräte über Node-RED (`dbus-victron-virtual` ) werden vollständig unterstützt

---

## Voraussetzungen

**Am GX-Gerät:**

- MQTT aktivieren:`Einstellungen → Integrationen → MQTT-Zugang → Ein`
- Für Modbus-Steuerung:`Einstellungen → Integrationen → Modbus TCP-Server → Aktiviert`
- Zugriffsberechtigungen:`Zugangslevel → Schreiben erlaubt`

**In ioBroker:**

- Node.js >= 22
- Admin >= 7.7.28

---

## Installation

### Über den ioBroker Admin (empfohlen)

Da dieser Adapter noch nicht im offiziellen ioBroker Repository enthalten ist, wird er über den npm-Tab im Admin installiert:

1. ioBroker Admin öffnen
2. **Adapter** aufrufen
3. Oben rechts auf das **GitHub/Katzen-Symbol** klicken
4. Den **npm** -Tab auswählen
5. `iobroker.victron-gx` eingeben und auf **Installieren** klicken

### Nach der Installation

1. Instanz konfigurieren:
   - **IP-Adresse** des GX-Geräts eintragen
   - MQTT-Port:`1883` (Standard)
   - Optional: **Modbus-Steuerung** (ESS/Wechselrichter-Register werden über Modbus TCP schreibbar)
   - Optional: **MQTT-Steuerung** (Schalter, EV-Charger, Temperatur-Sollwerte werden über MQTT schreibbar)

> **Hinweis:** Node.js >= 22 ist erforderlich. Falls ioBroker noch mit Node.js 20 läuft, bitte zuerst ein Update durchführen.

---

## Konfiguration

| Feld                         | Beschreibung                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------- |
| IP-Adresse des GX-Geräts     | Lokale IP des Cerbo/Venus/Ekrano GX                                             |
| MQTT-Port                    | Standard: 1883                                                                  |
| MQTT-Benutzername / Passwort | Nur wenn MQTT-Auth am GX konfiguriert ist                                       |
| Modbus-Steuerung             | Macht ESS/Wechselrichter-Datenpunkte (vebus, system) über Modbus TCP schreibbar |
| Modbus-Port                  | Standard: 502                                                                   |
| MQTT-Steuerung               | Machtschalter, EV-Charger und Temperatur-Sollwerte über MQTT schreibbar         |

---

## Unterstützte Geräte

Der Adapter erkennt automatisch alle am GX-Gerät angeschlossenen Geräte:

| Gerätetyp     | Beschreibung                                                                         |
| ------------- | ------------------------------------------------------------------------------------ |
| `battery`     | Batteriesysteme (zB SerialBattery/LLT/JBD)                                           |
| `vebus`       | MultiPlus/Quattro-Wechselrichter                                                     |
| `grid`        | Netzanschluss-Zähler (zB Shelly 3EM, Carlo Gavazzi)                                  |
| `pvinverter`  | PV-Wechselrichter                                                                    |
| `acload`      | AC-Verbraucher (inkl. Shelly 1PM, mit Schaltausgang)                                 |
| `switch`      | Schaltausgänge (Node-RED Virtual Switches, Shelly Pro3/Pro4/1PM, GX-internes Relais) |
| `evcharger`   | EV-Ladegerät (Lesen + Steuerung)                                                     |
| `temperature` | Temperatursensoren                                                                   |
| `meteo`       | Wetterstationen                                                                      |
| `tank`        | Tankfüllstandsensoren                                                                |
| `system`      | Systemübersicht                                                                      |

---

## Objektstruktur

```
victron-gx.0
├── devices.*          → Alle erkannten Geräte - common.write am einzelnen Datenpunkt zeigt an, ob
│   │                     er gerade schreibbar ist (siehe "Schreibbare Datenpunkte" unten)
│   ├── battery.*
│   ├── vebus.*                      → Mode, Ac.In1.CurrentLimit, Hub4.* schreibbar (Modbus-Steuerung)
│   ├── grid.*
│   ├── pvinverter.*
│   ├── acload.<Group>.<Serial>.
│   │   ├── Ac.*                     → Messwerte (unverändert)
│   │   └── outputs.<N>.             → Schaltausgang, falls vorhanden (z.B. Shelly 1PM)
│   │       ├── State                    bool, schreibbar (MQTT-Steuerung)
│   │       ├── Status                   bool, nur lesend
│   │       ├── Name / CustomName        string
│   │       └── Group                    string
│   ├── switch.<Group>.<Serial>.
│   │   └── outputs.<N>.             → ein Sub-Kanal pro Ausgang (Node-RED: einer, Shelly Pro3/4: bis zu vier)
│   │       ├── State / Status / Name / CustomName / Group   (wie oben)
│   ├── evcharger.<Serial>.          → SetCurrent, StartStop, Mode schreibbar (MQTT-Steuerung)
│   ├── temperature.<Serial>.        → Offset, Scale, FilterLength schreibbar (MQTT-Steuerung)
│   ├── meteo.*
│   ├── tank.*
│   └── system.<Serial>.             → GridSetpoint, EssMode, MinimumSoc, ... schreibbar
│                                       (Modbus-Steuerung); trägt auch outputs.0.* für das
│                                       GX-interne Relais (MQTT-Steuerung)
├── overview.*         → Systemübersicht (aus system/0), nur lesend
└── info.*             → Verbindungsstatus
```

`<Group>` ist ein optionaler Zwischenordner – nur vorhanden, wenn für den jeweiligen Kanal/das Gerät ein Gruppenname konfiguriert ist. Details siehe [Shelly-Integration & Multi-Kanal-Unterstützung](#shelly-integration--multi-kanal-unterstützung) weiter unten.

---

## Schreibbare Datenpunkte

Seit **0.10.0** gibt es kein separates`control.*` -Baum mehr. Jeder beschreibbare Datenpunkt liegt direkt unter`devices.*` , genau neben seinen nur-lesbaren Geschwistern –`common.write` am Objekt selbst zeigt (auch in Admin-UI/VIS) an, ob er gerade schreibbar ist. Zwei unabhängige Config-Schalter steuern das:

- **Modbus-Steuerung** – ESS/Wechselrichter-Register unter`devices.vebus.*` und`devices.system.*`
- **MQTT-Steuerung** – Schalter (`devices.switch.*` /`devices.acload.*` /`devices.system.*` Ausgänge), der EV-Charger und die Temperatursensor-Kalibrierung

Ist ein Schalter aus, existiert der Datenpunkt weiterhin (History/Vis-Bindings und Skripte funktionieren auch weiter), aber`common.write` ist`false` und Schreibversuche werden mit einer Log-Warnung ignoriert – keine noch verschluckten Schreibzugriffe mehr auf einen Datenpunkt, der schreibbar aussah, es aber nicht war.

### Vorher → Nachher (Update von 0.9.x)

| Alt (control.\*, entfernt in 0.10.0)      | Neu (Geräte.\*)                                  |
| ----------------------------------------- | ------------------------------------------------ |
| `control.inverter.Mode`                   | `devices.vebus.<Serial>.Mode`                    |
| `control.inverter.AcPowerSetpoint`        | `devices.vebus.<Serial>.Hub4.L1.AcPowerSetpoint` |
| `control.inverter.AcIn1CurrentLimit`      | `devices.vebus.<Serial>.Ac.In1.CurrentLimit`     |
| `control.inverter.DisableCharge`          | `devices.vebus.<Serial>.Hub4.DisableCharge`      |
| `control.inverter.DisableFeedIn`          | `devices.vebus.<Serial>.Hub4.DisableFeedIn`      |
| `control.system.GridSetpoint`             | `devices.system.<Serial>.GridSetpoint`           |
| `control.system.EssMode`                  | `devices.system.<Serial>.EssMode`                |
| `control.system.MinimumSoc`               | `devices.system.<Serial>.MinimumSoc`             |
| `control.system.BatteryLifeState`         | `devices.system.<Serial>.BatteryLifeState`       |
| `control.system.MaxFeedInPower`           | `devices.system.<Serial>.MaxFeedInPower`         |
| `control.system.AcFeedInEnabled`          | `devices.system.<Serial>.AcFeedInEnabled`        |
| `control.system.DcFeedInEnabled`          | `devices.system.<Serial>.DcFeedInEnabled`        |
| `control.system.DvccMaxChargeCurrent`     | `devices.system.<Serial>.DvccMaxChargeCurrent`   |
| `control.system.MaxDischargePower`        | `devices.system.<Serial>.MaxDischargePower`      |
| `control.evcharger.<Instance>.SetCurrent` | `devices.evcharger.<Serial>.SetCurrent`          |
| `control.evcharger.<Instance>.StartStop`  | `devices.evcharger.<Serial>.StartStop`           |
| `control.evcharger.<Instance>.Mode`       | `devices.evcharger.<Serial>.Mode`                |

**Was zu tun ist:** Skripte, Vis-Widgets oder Blockly-Regeln, die`control.*` Direkt referenzieren, aktualisieren und sicherstellen, dass der passende Schalter (Modbus-Steuerung / MQTT-Steuerung) in den Instanz-Einstellungen aktiviert ist, fällt du auf einen dieser Datenpunkte schreibst. Der Adapter benötigt den Config-Schlüssel`controlEnabled` Beim ersten 0.10.0-Start automatisch in`modbusControlEnabled` um (dein Wert bleibt erhalten) –`mqttControlEnabled` ändert sich nicht. Ein einmaliger Aufräum-Sweep entfernt evtl. Noch gibt es`control.*` -Objekte, und eine Warnung erscheint bei jedem Start in 0.10.x/0.11.x als Erinnerung (entfällt ab 0.12.0).

**Schalter sind jetzt ebenfalls aktiviert:**`outputs.<N>.State` war bisher bedingungslos schreibbar; Jetzt ist dafür wie bei allen anderen unter diesem Schalter **MQTT-Steuerung** nötig.

### Beispiele

**ESS Grid Sollwert** (einfachste Methode) –`devices.system.<Serial>.GridSetpoint` \[W] schreiben:

- `0` → Zero Feed-In (Victron ESS-Algorithmus hält Netz bei 0W)
- `-3000` → 3000W ins Netz einspeisen (Batterie entlädt)
- `+500` → 500W aus dem Netz beziehen (Batterie lädt)

Kein Keepalive nötig – Wert wird dauerhaft gespeichert.

**ESS Live-Sollwert** (direkte Steuerung) –`devices.vebus.<Serial>.Hub4.L1.AcPowerSetpoint` \[W] schreiben:

- Erledigen`devices.system.<Serial>.EssMode = 3` (Externe Steuerung)
- Der Adapter sendet den Wert alle 800ms erneut, solange er ≠ 0 ist (Victron Watchdog)
- Auf`0` Setzen Sie um die Steuerung an den Victron ESS-Algorithmus zurückzugeben

**Laden / Einspeisung deaktivieren:**

- `devices.vebus.<Serial>.Hub4.DisableCharge = 1` → Batterie lädt nicht
- `devices.vebus.<Serial>.Hub4.DisableFeedIn = 1` → Wechselrichter speist nicht ein

**DVCC-Limits** (erfordert aktiviertes DVCC am GX):

- `devices.system.<Serial>.DvccMaxChargeCurrent` \[A]: Systemweite Ladestrom-Begrenzung (-1 = deaktiviert)
- `devices.system.<Serial>.MaxDischargePower` \[W]: Entladeleistungs-Begrenzung

**Virtuelle Schalter** (Node-RED) –`outputs.<N>.State` auf`true` /`false` setzen → MQTT Schreiben → GX → Node-RED → Relais

**EV-Ladegerät** –`devices.evcharger.<Serial>.SetCurrent` \[A] /`StartStop` \[bool] /`Mode` (0=Manuell, 1=Auto, 2=Zeitplan) schreiben

**Temperatursensor-Kalibrierung** –`devices.temperature.<Serial>.Offset` \[°C] /`Scale` /`FilterLength` schreiben

---

## Virtuelle Geräte (Node-RED)

Der Adapter unterstützt vollständig virtuelle Geräte die via Node-RED mit dem Paket`dbus-victron-virtual` erstellt wurden:

- Virtueller PV-Wechselrichter
- Virtueller AC-Verbraucher
- Virtuelle Schalter (mit Gruppe und individuellem Namen)
- Virtuelle Temperatursensoren
- Virtuelle Wetterstationen
- Virtuelle Tankfüllstandssensoren

---

## Shelly-Integration & Multi-Kanal-Unterstützung

Shelly-Geräte, die am GX (Cerbo/Venus/Ekrano) integriert sind, werden jetzt vollständig unterstützt, zusätzlich zu Node-RED Virtual Switches:

- **Shelly Pro3 / Pro4** : Jedes physische Gerät meldet seine Kanäle als separate MQTT-DeviceInstances mit identischer Seriennummer. Der Adapter führt sie automatisch in einem einzigen Objektbaum zusammen (`devices.switch.<Group>.<Serial>.outputs.<0..3>.*` ).
- **Shelly 13:00 Uhr** : Messwerte (`Ac.*` ) und der Schaltausgang (`outputs.0.*` ) liegen am selben Geräte-Baum unter`devices.acload.<Group>.<Serial>` Die
- **GX-internes Relais** : das im GX-Gerät eingebaute Relais (`system/0` ) ist schaltbar unter`devices.system.<Serial>.outputs.0.State` , sobald **MQTT-Steuerung** aktiviert ist (siehe [Schreibbare Datenpunkte](#schreibbare-datenpunkte) ).

Alle Schaltausgänge – unabhängig vom Gerätetyp – teilen sich dieselbe Unterstruktur, wodurch Wildcard-Selektoren über die gesamte Installation hinweg funktionieren:

```javascript
// Alle Schaltausgänge, egal welcher Gerätetyp, egal welche Gruppe
'victron-gx.0.devices.*.*.*.outputs.*.State'

// Nur die Custom-Namen, für eine Geräteübersicht
'victron-gx.0.devices.*.*.*.outputs.*.CustomName'
```

### ⚠️ Breaking Change (v0.9.x)

Schaltausgänge liegen bisher direkt unter dem Geräte-Kanal; Sie liegen jetzt unter einem`outputs.<N>` -Sub-Kanal. Node-REDs`output_1` wird auf`outputs.1` normiert:

| Alt (v0.8.x)                             | Neu (v0.9.x)                                       |
| ---------------------------------------- | -------------------------------------------------- |
| `devices.switch.<Group>.<Serial>.State`  | `devices.switch.<Group>.<Serial>.outputs.1.State`  |
| `devices.switch.<Group>.<Serial>.Status` | `devices.switch.<Group>.<Serial>.outputs.1.Status` |

Skripte, Vis-Widgets oder Blockly-Regeln, die die alten Pfade direkt referenzieren, müssen angepasst werden.

Wenn die restlichen alten Objekte verloren gehen, führt Folgendes in der ioBroker-CLI aus (die Schleife umgeht den bekannten „Invalid ID: undefiniert“-Fehler beim Löschen über die Admin-UI):

```bash
iobroker object list | grep -oP 'victron-gx\.0\.devices\.switch\.[^.]+\.[^.]+\.(State|Status)$' \
  | while read id; do iobroker object del "$id"; done
```

### Automatisches Aufräumen verwaister Kanäle (optional)

Wenn ein Kanal in eine andere Gruppe verschoben, ein Shelly-Kanal deaktiviert oder ein Node-RED-Switch gelöscht wird, verschwindet zwar sein MQTT-Topic – die ioBroker-Objekte bleiben aber bestehen. Mit **Verwaiste Kanäle beim Start entfernen** (Tab „Haupteinstellungen“, Standard aus) räumt der Adapter diese automatisch auf:

- Läuft einmal pro Adapter-Start, erst nach ca. 30 Sekunden lang kein neu erkannter Kanal mehr dazukam (damit Multi-Kanal-Geräte wie der Shelly Pro3, dessen Instanzen zeitlich leicht versetzt reinkommen, beim Start nicht betroffen sind).
- Betrifft ausschließlich`outputs.<N>` -kanäle. Geräte-Metadaten,`Ac.*` -Messwerte und`overview.*` werden davon nie entfernt.
- Bei häufig offline befindlichen Geräten sollte die Option deaktiviert bleiben – ein Kanal, der sich bis zum Sweep-Zeitpunkt noch nicht zurückgemeldet hat, sieht verwaist aus und würde gelöscht.

---

## Lizenz

MIT-Lizenz

Copyright © 2026 Sefina-DS

## Changelog

Den vollständigen Changelog gibt es in der englischen README:
→ [README.md Changelog](/#/adapters/victron-gx#changelog)

---