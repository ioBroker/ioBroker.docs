---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.duofernstick/README.md
title: ioBroker-Adapter: DuoFern Stick
hash: /G0cooY6Zy+Er/CkRXr7EMTwAOGWzlUPIva2AS5YxAw=
---
# ioBroker-Adapter: DuoFern Stick

Dieser Adapter verbindet einen lokalen **Rademacher DuoFern USB-Stick** mit ioBroker. Er ist für Installationen konzipiert, bei denen DuoFern-Geräte lokal ohne zusätzlichen Cloud-Dienst integriert werden sollen.

## Merkmale

- Serielle Verbindung zum Rademacher DuoFern USB-Stick
- Konfiguration von serieller Schnittstelle, Baudrate und Dongle-Seriellschnittstelle in ioBroker Admin
- Empfang und Auswertung von DuoFern-Telegrammen
- Automatische Erstellung erkannter Geräte unten `devices.*`
- Geräte- und Funktionskatalog für viele DuoFern-Geräteklassen
- Zustandsverwaltung für Rollläden, Rohrmotoren, Aktuatoren, Dimmer, Sensoren, Fernbedienungen und Thermostate
- Kontrollzustände für Kopplung, Entkopplung, Statusübertragung und Rohtelegramme
- Teilweise Statusaktualisierungen, um zu vermeiden, dass vorhandene Werte mit unvollständigen Telegram-Daten überschrieben werden.
- Schutz vor unbeabsichtigtem Zurücksetzen `runningTime` Zu `0`
- Optionale Rohprotokollierung von Telegrammdaten für Diagnosezwecke

## Unterstützte Geräteklassen

Der Adapter enthält einen Geräte- und Fähigkeitskatalog für verschiedene DuoFern-Geräteklassen, darunter:

| Geräteklasse                 | Beispiele                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| Rollläden / Riemenaufwickler | RolloTron Standard, RolloTron Comfort Master/Slave                                  |
| Röhrenmotoren                | Rohrmotor, Rohrmotoraktuator, Rohrmotorsteuerung                                    |
| Jalousie                     | Troll Comfort, Troll Basis, Connect-Aktor                                           |
| Aktuatoren                   | Universalbetätiger, Steckdosenbetätiger, Licht- und Schaltbetätiger                 |
| Dimmer                       | Dimmaktuator, Dimmer                                                                |
| Sensoren                     | Sonnen-/Windsensor, Umweltsensor, Bewegungsmelder, Rauchmelder, Fenster-/Türkontakt |
| Fernbedienungen / Sender     | Handsender, Wandschalter, HomeTimer, Unterputzsender                                |
| Heizung                      | Raumthermostat, Heizkörperantrieb                                                   |
| Tore / Spezialvorrichtungen  | SX5 / Torsteuerung                                                                  |

Abhängig vom erkannten Gerätetyp werden nur geeignete oder beobachtete Zustände erzeugt. Dadurch wird vermieden, jeden theoretischen Zustand für jedes Gerät anzuzeigen.

## Anforderungen

- ioBroker mit js-controller 6.0.11 oder neuer
- Node.js 22 oder neuer
- ioBroker Admin 7.6.20 oder neuer
- Rademacher DuoFern USB-Stick
- Zugriff auf das serielle Gerät des USB-Sticks

Unter Linux benötigt der ioBroker-Prozess die Berechtigung zum Zugriff auf das serielle Gerät. Gängige Pfade sind:

```text
/dev/ttyUSB0
/dev/serial/by-id/usb-Rademacher_DuoFern_USB-Stick-if00-port0
```

Verwendung des stabilen `/dev/serial/by-id/` Dieser Pfad wird empfohlen, da er normalerweise auch nach einem Neustart oder dem erneuten Anschließen des USB-Sticks gleich bleibt.

## Installation

Installieren Sie den Adapter über ioBroker Admin mithilfe der benutzerdefinierten Adapterinstallation von einer GitHub-URL oder aus einer hochgeladenen Paketdatei.

Nach der Installation:

1. Erstellen Sie eine Adapterinstanz mit dem Namen `duofernstick.0` Die
2. Öffnen Sie die Adapterkonfiguration.
3. Geben Sie den korrekten seriellen Port des DuoFern USB-Sticks ein.
4. Schalten Sie den Adapter ein.
5. Überprüfen Sie den Verbindungsstatus unter `duofernstick.0.info.connection` Die

## Konfiguration

Die wichtigsten Einstellungen finden Sie auf der Admin-Konfigurationsseite der Adapterinstanz.

| Einstellung                                  | Beschreibung                                                                                                                       |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `port`                                       | Serielle Schnittstelle des DuoFern USB-Sticks (aus einer Liste der erkannten Ports auswählbar)                                     |
| `baudRate`                                   | Baudrate, Standardwert: `115200`                                                                                                   |
| `dongleSerial`                               | 6-stelliger DuoFern-Funkcode des Sticks, beginnend mit `6F` (nicht die USB-Seriennummer)                                            |
| `deviceCodes`                                | Bekannte Gerätecodes (kommagetrennt oder FHEM) `define` Zeilen)                                                                     |
| `autoCreate`                                 | Automatische Erstellung erkannter Geräte                                                                                           |
| `initOnStart`                                | Sende die DuoFern-Initialisierungssequenz beim Start                                                                               |
| `statusOnStart`                              | Gerätestatus beim Start des Adapters anfordern                                                                                     |
| `statusAfterCommand`                         | Gerätestatus nach Bewegungs-/Steuerungsbefehlen anfordern                                                                          |
| `periodicStatusPoll` /`periodicStatusPollMs` | Zyklische Statusabfrage aller bekannten Aktoren, standardmäßig alle 5 Minuten                                                      |
| `externalActivityPollAll`                    | Nach Fernsteuerung oder Sensortelegrammen bekannte Aktoren abfragen                                                                |
| `invertPosition`                             | Verwenden Sie die ioBroker-Konvention für Blinds (0 % = geschlossen, 100 % = offen) anstelle der DuoFern-Konvention (0 % = offen). |
| `debugRaw`                                   | Protokollierung der Rohtelegramme zu Diagnosezwecken                                                                               |

DuoFern nutzt das 868-MHz-Band mit einem Tastverhältnis von 1 %. Sehr kurze Abfrageintervalle bei vielen Geräten können die zulässige Sendezeit überschreiten; Statusanfragen werden daher mit niedriger Priorität in eine Warteschlange gestellt, dedupliziert und begrenzt, während Benutzerbefehle immer zuerst gesendet werden.

## Objektstruktur

Der Adapter erzeugt die folgende Hauptobjektstruktur:

```text
duofernstick.0
├── info
│   ├── connection          (true after successful stick init)
│   ├── dongleSerial
│   ├── rawRx / rawTx
│   ├── lastParsed / lastStatusDecode
│   └── lastError
├── status.state
├── queue.pending / queue.active
├── pair.mode
├── commands
│   ├── pair / unpair
│   ├── statusBroadcast
│   ├── reopen
│   ├── raw
│   ├── remotePair
│   ├── addDeviceCode
│   └── cleanupUnusedDeviceStates
└── devices
    └── <deviceCode>
        ├── raw, lastSeen, deviceClass, deviceProfile, stateText
        ├── command
        ├── up, down, stop, position, ...
        └── control.*
```

Die genaue Anzahl der Zustände hängt vom erkannten Gerätetyp ab.

## Zentrale Kontrollstaaten

### Kopplung starten

```text
duofernstick.0.commands.pair = true
```

Startet den Kopplungsmodus des Sticks.

### Entpaarung starten

```text
duofernstick.0.commands.unpair = true
```

Startet den Entkopplungsmodus des Sticks.

### Statusmeldung senden

```text
duofernstick.0.commands.statusBroadcast = true
```

Fordert Statusinformationen von bekannten oder erreichbaren Geräten an.

### Sende unformatiertes Telegramm

```text
duofernstick.0.commands.raw = <HEX_TELEGRAM>
```

Sendet ein unformatiertes Telegramm als Hexadezimalzeichenkette. Dies ist hauptsächlich für Diagnose- und Entwicklungszwecke gedacht.

## Gerätesteuerung

Je nach Gerätetyp können folgende beschreibbare Zustände verfügbar sein:

| Zustand         | Bedeutung                                               |
| --------------- | ------------------------------------------------------- |
| `up`            | Schieben Sie den Rollladen oder die Jalousie nach oben  |
| `down`          | Schieben Sie den Rollladen oder die Jalousie nach unten |
| `stop`          | Aktuelle Bewegung stoppen                               |
| `toggle`        | Umschaltbefehl                                          |
| `position`      | Zielposition in Prozent                                 |
| `getStatus`     | Gerätestatus anfordern                                  |
| `manualMode`    | Manueller Modus                                         |
| `timeAutomatic` | Zeitautomatisierung                                     |
| `sunAutomatic`  | Sun Automation                                          |
| `duskAutomatic` | Dämmerungsautomatisierung                               |
| `dawnAutomatic` | Dawn-Automatisierung                                    |
| `windAutomatic` | Windautomatisierung                                     |
| `rainAutomatic` | Regenautomatisierung                                    |
| `level`         | Dimm- oder Schaltpegel                                  |
| `state`         | Schaltzustand                                           |

Beispielhafte Bundesstaats-IDs:

```text
duofernstick.0.devices.<deviceId>.up
duofernstick.0.devices.<deviceId>.down
duofernstick.0.devices.<deviceId>.stop
duofernstick.0.devices.<deviceId>.position
```

## Statuswerte

Typische Werte für den schreibgeschützten Status sind:

| Zustand         | Beschreibung                                               |
| --------------- | ---------------------------------------------------------- |
| `position`      | Aktuelle Position in Prozent                               |
| `moving`        | Bewegungsrichtung: `up`, `down`, `stop` oder `moving`       |
| `runningTime`   | Laufzeit in Sekunden                                       |
| `lastSeen`      | Zeitstempel des letzten empfangenen Telegramms             |
| `raw`           | Letztes Telegramm von diesem Gerät empfangen               |
| `deviceClass`   | DuoFern-Geräteklasse erkannt                               |
| `deviceProfile` | Befehls-/Statusprofil, das für dieses Gerät verwendet wird |

Eingehende Telegramme werden als partielle Zustandsaktualisierungen behandelt. Enthält ein Telegramm keinen Laufzeitwert, wird ein bereits vorhandener Laufzeitwert nicht automatisch zurückgesetzt. `0` Die

## Fehlerbehebung

### Der Adapter verbindet sich nicht mit dem Stick

Bitte prüfen Sie folgende Punkte:

- Der konfigurierte serielle Port ist vorhanden.
- Der ioBroker-Benutzer hat die Berechtigung, auf das serielle Gerät zuzugreifen.
- Der USB-Stick wird an den richtigen Host, Container oder die richtige virtuelle Maschine weitergeleitet.
- Kein anderer Prozess blockiert die serielle Schnittstelle.
- Die Baudrate ist korrekt konfiguriert.

Nützliche Linux-Befehle:

```text
ls -l /dev/ttyUSB*
ls -l /dev/serial/by-id/
dmesg | grep -i tty
```

### Es werden keine Geräte erstellt

Bitte prüfen Sie folgende Punkte:

- `autoCreate` ist aktiviert.
- Rohtelegramme erscheinen in `info.rawRx` Die
- `debugRaw` ist für Diagnosezwecke aktiviert.
- Es wurde eine Aktion eines DuoFern-Geräts oder einer Fernbedienung ausgelöst.

### Die Werte wirken instabil oder unplausibel.

Bitte prüfen Sie folgende Punkte:

- Ob mehrere Geräte mit derselben oder einer falschen ID erkannt werden.
- Ob die Rohtelegramme vollständig empfangen werden.
- Ob der richtige Gerätetyp erkannt wird.
- Ob das Gerät aktiv Statuswerte sendet oder nur einmal nach dem Start antwortet.

Für die Diagnose sind folgende Informationen hilfreich:

- Adapterversion
- ioBroker-Version
- Node.js-Version
- Betriebssystem-, Docker-, VM- oder Proxmox-Setup
- Serieller Gerätepfad des USB-Sticks
- DuoFern Gerätetyp
- Relevante Rohtelegramme
- ioBroker-Protokollausgabe während des Startvorgangs und Geräteaktionen

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.32 (2026-10-16)

- (FreeProgrammer1) All object names are now available in all 11 ioBroker languages (new `lib/i18n.js`).
- (FreeProgrammer1) Roles now match read/write access: `targetPosition` → `value.blind`, `targetLevel` → `value.dimmer`, running times → `level.timer`, writable weather station settings → `level`.
- (FreeProgrammer1) Existing objects are corrected automatically on the next adapter start.

### 0.1.31 (2026-10-02)

- (FreeProgrammer1) Received serial data is now processed strictly in order (no parallel frame handling).
- (FreeProgrammer1) Removed a hard-coded stick radio code that was applied for one specific USB path.
- (FreeProgrammer1) Fixed lost status refresh timers after the init sequence.
- (FreeProgrammer1) `info.connection` is only `true` after a successful stick init.
- (FreeProgrammer1) Device objects are created once per runtime instead of on every telegram (far fewer object database writes).
- (FreeProgrammer1) Command queue: user commands before status polls, duplicate telegrams are skipped, status polls are limited.
- (FreeProgrammer1) Default polling interval raised to 5 minutes (existing instances keep their setting).
- (FreeProgrammer1) New option `invertPosition` for the ioBroker blind convention (100 % = open).
- (FreeProgrammer1) Serial port can be selected from a list in the admin UI.
- (FreeProgrammer1) Buttons are now `read: false`; instance objects moved to `instanceObjects`.
- (FreeProgrammer1) Removed unused modules, standard package/integration tests, release-script, full MIT license, i18n short format.

### 0.1.30

- (FreeProgrammer1) Fixes responsive jsonConfig sizes, admin translations and CI metadata for the repository checker.

### 0.1.29

- (FreeProgrammer1) Fix GitHub workflow requirements for Node.js 22/24 adapter tests, restore the recommended concurrency configuration and document the current release for the ioBroker checker.

### 0.1.28

- (FreeProgrammer1) Fix jsonConfig layout, node.js workflows and translations.

### 0.1.27

- (FreeProgrammer1) Added jsonConfig i18n files for all required ioBroker languages.
- (FreeProgrammer1) Removed legacy Materialize admin page because jsonConfig is used.
- (FreeProgrammer1) Replaced plain timers with adapter timers for ioBroker checker compliance.

Older changelog entries are kept in CHANGELOG_OLD.md.

## License

MIT License
This project is licensed under the terms of the [LICENSE](https://github.com/FreeProgrammer1/ioBroker.duofernstick/blob/main/LICENSE) file.

Copyright (c) 2026 FreeProgrammer1 freeprogrammer1@mail.de