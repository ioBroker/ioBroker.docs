---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nuki-local/README.md
title: ioBroker.nuki-local
hash: QRKw55jJMZdxACBm6gUj+ucu1ox0B2WLakLYIAs5VRA=
---
# ioBroker.nuki-local

Lokale Nuki Smart Lock-Integration für ioBroker über einen integrierten MQTT-Broker.

Hersteller- und Produktinformationen: [Nuki](https://nuki.io/) .

Der Adapter ist für die direkte lokale Kommunikation mit kompatiblen Nuki Smart Locks über MQTT ausgelegt. Optional kann die Nuki Web API aktiviert werden, um die lokalen MQTT-Daten mit Autorisierungsnamen und Aktivitätsinformationen anzureichern.

## Merkmale

- Integrierter MQTT-Broker
- Lokale Kommunikation mit Nuki Smart Locks
- Kein separater MQTT-Broker erforderlich
- MQTT-Authentifizierung mit Benutzername und Passwort
- Persistente Speicherung von MQTT-Daten mithilfe von LevelDB
- Automatische Wiederherstellung der gespeicherten Nuki-Zustände nach einem Neustart des Adapters
- Automatische Geräteerstellung
- Sperrstatus
- Türsensorstatus
- Batterieinformationen
- Firmware-Informationen
- Gerätetyp
- Online-Status
- Sperr-/Entsperr-/Entriegelungsbefehle
- Lock'n'Go-Befehle
- Fingerabdruckerkennung
- Tastaturcodeerkennung
- Konfigurierbare Zuordnung von Code-ID zu Benutzernamen
- Optionale Nuki Web API-Integration
- Aktivitätsinformationen
- Dynamische Statussymbole
- Der lokale Betrieb bleibt auch dann verfügbar, wenn die Nuki Web-API deaktiviert ist.

## Installation

Installieren Sie den Adapter über die ioBroker-Admin-Oberfläche, sobald er im ioBroker-Repository verfügbar ist.

## MQTT-Konfiguration

Standard-MQTT-Port:

```text
1883
```

Standard-MQTT-Benutzername:

```text
nuki
```

Konfigurieren Sie denselben MQTT-Benutzernamen und dasselbe Passwort in der Nuki-App.

Verwenden Sie die IP-Adresse des ioBroker-Servers als MQTT-Broker.

Beispiel:

```text
Broker: 192.168.178.124
Port: 1883
Username: nuki
Password: your configured password
```

## MQTT-Persistenz

Die gespeicherten MQTT-Zustände werden mit LevelDB gesichert.

Beispiel für ein Persistenzverzeichnis:

```text
/opt/iobroker/iobroker-data/nuki-local.0/mqtt-leveldb
```

Der Adapter stellt die gespeicherten Nuki-Zustände nach einem Neustart automatisch wieder her.

## Objektstruktur

Jedes Nuki-Gerät wird wie folgt erstellt:

```text
nuki-local.0.<NUKI-ID>
```

Struktur:

```text
<NUKI-ID>
├── activity
├── advanced
├── battery
├── commands
├── device
├── keypad
├── status
└── raw
```

## Status

Verfügbare Bundesstaaten sind:

```text
status.lockState
status.lockStateText
status.locked
status.doorState
status.doorStateText
status.doorOpen
status.timestamp
status.iconState
status.icon
```

## Batterie

```text
battery.percent
battery.critical
battery.charging
battery.keypadCritical
battery.doorSensorCritical
```

## Geräteinformationen

```text
device.name
device.firmware
device.deviceType
device.mode
device.online
```

## Befehle

Die Befehle sind unten verfügbar:

```text
nuki-local.0.<NUKI-ID>.commands
```

### Sperren

```text
commands.lock
```

Innen:

```text
lockAction = 2
```

### Entsperren

```text
commands.unlock
```

Innen:

```text
lockAction = 1
```

Dadurch wird das Schloss entriegelt, ohne dass der Riegel absichtlich gezogen werden muss.

### Entriegeln

```text
commands.unlatch
```

Innen:

```text
lockAction = 3
```

### Lock'n'Go

```text
commands.lockNgo
```

Innen:

```text
lockAction = 4
```

### Lock'nGo mit Entriegelung

```text
commands.lockNgoUnlatch
```

Innen:

```text
lockAction = 5
```

### Vollständige Verriegelung

```text
commands.fullLock
```

Innen:

```text
lockAction = 6
```

## Tastatur und Fingerabdruck

Die Adapterprozesse `lockActionEvent` Nachrichten.

Beispiel:

```text
3,0,195249,8193,2
```

Felder:

```text
action
trigger
authId
codeId
source
```

Tastaturquelle:

```text
0 = Back button
1 = Keypad code
2 = Fingerprint
```

Relevante ioBroker-Statusmeldungen:

```text
keypad.lastType
keypad.lastUser
keypad.lastTimestamp
```

## Benutzer konfigurierbarer Tastatur

Benutzer können ein Nuki-System abbilden `codeId` zu einem benutzerdefinierten Namen in der Adapterkonfiguration.

Beispiel:

```text
Code ID   Name
8193      User 1
8192      User 2
```

Die Namen sind nicht fest im Adapter codiert.

Priorität der Resolution:

```text
1. Configured Code-ID mapping
2. Nuki Web API authorization name
3. Technical fallback
```

## Aktivität

```text
activity.lastAction
activity.lastActionText
activity.lastUser
activity.lastDate
```

## Erweiterte Daten

```text
advanced.authId
advanced.codeId
advanced.source
advanced.trigger
advanced.smartlockId
advanced.serverState
advanced.authorizations
```

## Rohdaten aus MQTT

Unbekannte MQTT-Themen werden unten gespeichert:

```text
raw
```

Dies erleichtert die Fehlersuche und die zukünftige Unterstützung neuer Themen.

## Nuki Web-API

Die Web-API-Integration ist optional.

MQTT bleibt die primäre lokale Kommunikationsmethode.

Die Web-API kann zusätzliche Informationen bereitstellen, wie zum Beispiel:

- Autorisierungsnamen
- Aktivitätsprotokolle
- Cloudseitige Geräteinformationen

Der Adapter arbeitet auch dann lokal weiter, wenn die Web-API nicht verfügbar ist.

## Dynamische Symbole

Verfügbare Bundesstaaten:

```text
status.iconState
status.icon
```

Mögliche Werte:

```text
locked
unlocked
door_open
door_closed
charging
pairing
unknown
```

Die Symboldateien werden hier gespeichert:

```text
admin/icons/Nuki_Vis/
```

Dateien:

```text
nuki_locked.png
nuki_unlocked.png
nuki_door_open.png
nuki_door_closed.png
nuki_charging.png
nuki_pairing.png
nuki_unknown.png
```

Beispielhafter Symbolpfad:

```text
/adapter/nuki-local/icons/Nuki_Vis/nuki_locked.png
```

## Sicherheit

Verwenden Sie ein sicheres MQTT-Passwort.

Der integrierte MQTT-Broker darf nicht direkt mit dem öffentlichen Internet verbunden werden.

Behandeln Sie das Nuki Web API-Token als Geheimnis.

Die PIN-Codes für die Tastatur werden vom Adapter absichtlich nicht gespeichert.

## Fehlerbehebung

Adapterprotokolle anzeigen:

```bash
iobroker logs nuki-local.0 --watch
```

Adapterdateien hochladen:

```bash
iobroker upload nuki-local
```

Neustart:

```bash
iobroker restart nuki-local.0
```

## Changelog
### 0.1.3 (2026-10-04)

- (helfi9999) Replaced the default adapter icon with a custom Nuki icon.
- (helfi9999) Limited the Web API polling interval to 60–86400 seconds and prevented overlapping updates.
- (helfi9999) Corrected access and activity date roles and removed an unused translation key.
- (helfi9999) Reset the code ID when importing Web API activity data.

- (helfi9999) Changed state texts to English and completed configuration label translations.
- (helfi9999) Corrected command button, authorization JSON and timestamp roles.
- (helfi9999) Added a Web API request timeout and MQTT device ID validation.
- (helfi9999) Updated Aedes, Node.js types, testing tools and transitive dependencies.
- (helfi9999) Added Node.js 26 testing and updated the workflow check action.
- (helfi9999) Updated documentation, keywords and maintainer contact information.
- (helfi9999) Adapter requires admin >= 7.8.23 now.

### 0.1.2

- Improved publishing workflow
- Added npm trusted publishing support
- Updated package metadata and repository checks

### 0.1.0

Initial functional development version.

- Integrated MQTT broker
- MQTT authentication
- LevelDB persistence
- Retained state restore
- Smart Lock status
- Door sensor support
- Battery information
- Explicit lock actions
- Keypad code detection
- Fingerprint detection
- Configurable Code-ID user mapping
- Optional Nuki Web API
- Activity information
- Dynamic status icons

## License

[MIT License](https://github.com/helfi9999/ioBroker.nuki-local/blob/main/LICENSE)

Copyright (c) 2026 helfi9999 <helfi9999@gmail.com>