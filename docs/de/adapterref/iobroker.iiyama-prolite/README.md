---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.iiyama-prolite/README.md
title: ioBroker.iiyama-prolite
hash: 7p2aNZZ3K2GVKo9GOfLKshGS72R20I7QZ8XUiCDQzN4=
---
![Logo](../../../en/adapterref/iobroker.iiyama-prolite/admin/iiyama-prolite.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.iiyama-prolite.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.iiyama-prolite.svg)
![Anzahl der Installationen](https://iobroker.live/badges/iiyama-prolite-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/iiyama-prolite-stable.svg)

# IoBroker.iiyama-prolite
**Tests:** ![Test und Freigabe](https://github.com/AlanSRU/ioBroker.iiyama-prolite/workflows/Test%20and%20Release/badge.svg)

## Iiyama-Adapter für ioBroker
Kontrolle [Die professionellen Displays der iiyama ProLite-Serie (https://iiyama.com/gl_en/products/) lassen sich über eine serielle RS232-Schnittstelle oder eine TCP/IP-Verbindung (LAN) mit dem offiziellen iiyama-Kommunikationsprotokoll ansteuern. iiyama ist ein Displayhersteller – siehe iiyama.com](https://iiyama.com/).

## Merkmale
- **Unterstützung zweier Verbindungsarten**: Steuerung der Displays über die serielle RS232-Schnittstelle oder eine TCP/IP-Netzwerkverbindung
- **Umfassende Steuerung**: Ein-/Ausschalten, Eingangsquelle, Lautstärke, Video- und Audioparameter
- **Echtzeitüberwachung**: Automatische Abfrage des Anzeigestatus in konfigurierbaren Intervallen
- **Mehrere Displaymodelle**: Unterstützt Displays der ProLite LH-Serie (siehe Kompatibilitätsliste)
- **Befehlswarteschlange**: Sequenzielle Befehlsausführung verhindert Kommunikationsfehler

## Unterstützte Displaymodelle
- ProLite LH3252HS-B1
- ProLite LH4352UHS-B1
- ProLite LH5052UHS-B1
- ProLite LH5552UHS-B1
- ProLite LH6552UHS-B1
- ProLite LH9852UHS-B2
- ProLite LH4342UHS-B1/B3
- ProLite LH5042UHS-B1/B3
- ProLite LH5542UHS-B1/B3
- ProLite LH6542UHS-B1/B3
- ProLite LH7542UHS-B1/B3
- ProLite LH8642UHS-B1/B3

## Installation
1. Installieren Sie den Adapter aus dem ioBroker-Adapter-Repository.
2. Konfigurieren Sie die Verbindungseinstellungen in der Adapterkonfiguration.

## Konfiguration
### Verbindungseinstellungen
**Verbindungstyp**: Wählen Sie zwischen TCP/IP (LAN) oder seriell (RS232).

#### TCP/IP-Verbindung
- **IP-Adresse**: Die IP-Adresse des Displays
- **TCP-Anschluss**: Normalerweise 5000 (Standard für iiyama-Displays)

#### Serielle Verbindung
- **Serielle Schnittstelle**: Pfad zum seriellen Gerät (z. B. `/dev/ttyUSB0` unter Linux oder `COM1` unter Windows)
- **Baudrate**:
- 9600 für die meisten Modelle
- 115200 nur für die Serie LHxx42UHS-B1

### Anzeigeeinstellungen
- **Monitor-ID**: Die auf dem Display konfigurierte ID (1-255). Standardwert ist 1.
- **Abfrageintervall**: Wie oft der Anzeigestatus aktualisiert werden soll (5–300 Sekunden). Standardwert: 30 Sekunden.
- **Energiesparmodus**: Der auf Ihrem Display konfigurierte Energiesparmodus (1-4). Dieser beeinflusst die Steuerung des Displays im ausgeschalteten Zustand:
- **Modus 1**: WOL aus, Signalaufweckfunktion aus, Hintergrundbeleuchtung aus
Die TCP-Verbindung wird unterbrochen, wenn der Bildschirm ausgeschaltet ist.
- Kann nicht über das Netzwerk aufgeweckt werden (WOL deaktiviert)
- Zum Aufwecken muss eine Infrarot-Fernbedienung oder eine Taste an der Vorderseite verwendet werden.
- **Modus 2**: WOL aus, Signalquelle aktiviert, Hintergrundbeleuchtung aus
Die TCP-Verbindung wird unterbrochen, wenn der Bildschirm ausgeschaltet ist.
- Kann nicht über das Netzwerk aufwecken (WOL deaktiviert)
- Kann automatisch aufwachen, sobald ein HDMI-Quellsignal erkannt wird
- **Modus 3**: WOL ein, Weckfunktion durch Quelleneingang aus
- Kann per Wake-on-LAN aufgeweckt werden (erfordert MAC-Adressenkonfiguration)
Der Adapter sendet ein WOL-Magic-Packet, anschließend den Einschaltbefehl.
- **Modus 4**: WOL ein, Aufwecken durch Quelleingang ein (**empfohlen für Netzwerksteuerung**)
- Kann per Wake-on-LAN aufgeweckt werden (erfordert MAC-Adressenkonfiguration)
Der Adapter sendet ein WOL-Magic-Packet, anschließend den Einschaltbefehl.
- Kann auch automatisch aufwachen, wenn ein HDMI-Quellsignal erkannt wird.
- **MAC-Adresse** (erforderlich für Modus 3 und Modus 4): Die MAC-Adresse der Netzwerkschnittstelle des Displays, die für Wake-on-LAN verwendet wird.
- **WOL-Broadcast-Adresse** (optional): Subnetz-Broadcast-Adresse für das WOL-Paket. Falls leer, wird sie von der Host-IP abgeleitet (z. B. `192.168.1.100` → `192.168.1.255`).

## Verwendung
### Verfügbare Staaten
#### Leistungssteuerung
- `power` - Anzeige ein-/ausschalten (boolescher Wert)

#### Eingangsquellen
- `inputSource` - Eingabequelle auswählen:
- HDMI, HDMI 2, HDMI 3, HDMI 4
- DVI-D
- DisplayPort, DisplayPort 2
- VGA
- USB, USB 2

#### Lautstärke
- `volume.main` - Lautstärke des Hauptlautsprechers (0-100%)
- `volume.audioOut` - Audioausgabelautstärke (0-100%)

#### Videoeinstellungen
- `video.brightness` - Helligkeit (0-100%)
- `video.contrast` - Kontrast (0-100%)
- `video.color` - Farbsättigung (0-100%)
- `video.sharpness` - Schärfe (0-100%)
- `video.tint` - Farbton (0-100%)
- `video.blackLevel` - Schwarzwert (0-100%)
- `video.gamma` - Auswahl der Gammakurve
- `video.colorTemperature` - Voreinstellung für die Farbtemperatur
- `video.pictureFormat` - Bildformat/Seitenverhältnis

#### Audioeinstellungen
- `audio.treble` - Höhenpegel (0-100)
- `audio.bass` - Basspegel (0-100)

#### Informationen (schreibgeschützt)
- `info.connection` - Verbindungsstatus
- `info.standby` - Das Display befindet sich im Standby-Modus/ist nicht erreichbar, während der Adapter weiterläuft.
- `info.operatingHours` - Gesamtbetriebsstunden
- `info.serialCode` - Seriennummer anzeigen

#### Befehle
- `commands.autoAdjust` - Automatische VGA-Anpassung auslösen (`true` schreiben)

### Beispielhafte Verwendung in Blockly/JavaScript
```javascript
// Turn display on
setState('iiyama-prolite.0.power', true);

// Switch to HDMI input
setState('iiyama-prolite.0.inputSource', 13); // 13 = HDMI

// Set volume to 50%
setState('iiyama-prolite.0.volume.main', 50);
setState('iiyama-prolite.0.volume.audioOut', 50);

// Adjust brightness
setState('iiyama-prolite.0.video.brightness', 75);
```

## Technische Details
### Protokollimplementierung
Dieser Adapter implementiert das iiyama RS232-Seriell-Schnittstellenkommunikationsprotokoll, wie in der offiziellen Anwendungsbeschreibung dokumentiert. Das Protokoll verwendet:

- **Paketformat**: Header (0xA6), Monitor-ID, Kategorie, Seite, Funktionscode, Länge, Datensteuerung, Daten, Prüfsumme
- **Prüfsumme**: XOR-Verknüpfung aller Bytes außer der Prüfsumme
- **Antwort-Timeout**: 5000 ms
- **Befehlsverzögerung**: 100 ms zwischen den Befehlen, um einen Pufferüberlauf zu verhindern

### Verbindungsmanagement
- **Automatische Wiederverbindung**: Bis zu 10 Versuche mit 5 Sekunden Verzögerung
- **Befehlswarteschlange**: Stellt sicher, dass Befehle nacheinander gesendet werden
- **Statusabfrage**: Regelmäßige Aktualisierung aller Anzeigeparameter

## Fehlerbehebung
### Bildschirm reagiert nicht
1. **Physische Verbindung prüfen**: Sicherstellen, dass das Kabel ordnungsgemäß angeschlossen ist.
2. **IP-Adresse/Port überprüfen** (TCP) oder **serielle Schnittstelle** (RS232)
3. **Monitor-ID prüfen**: Muss mit der auf dem Display konfigurierten ID übereinstimmen.
4. **Probleme mit der seriellen Verbindung**:
- Baudrate prüfen (9600 oder 115200 für die B1-Serie)
- Überprüfen Sie die Berechtigungen für den seriellen Port unter Linux: `sudo usermod -a -G dialout iobroker`
5. **TCP-Verbindungsprobleme**:
- Zur Steuerung der Netzwerkstromversorgung konfigurieren Sie das Display auf Energiesparmodus 3 oder Modus 4.
- Modus 1 oder 2: Die TCP-Verbindung wird unterbrochen, wenn der Bildschirm ausgeschaltet ist – Aufwecken über das Netzwerk nicht möglich
- Modus 3: Erfordert Wake-on-LAN – MAC-Adresse in den Adaptereinstellungen konfigurieren
- Modus 4: Empfohlen – TCP bleibt aktiv, Energiebefehle funktionieren direkt
- Überprüfen Sie die Firewall-Einstellungen

### Befehle funktionieren nicht
- **Auf Antworten warten**: Das Protokoll erfordert das Warten auf eine Bestätigung zwischen den Befehlen.
- **OSD-Menü prüfen**: Nur die im OSD-Menü des Displays verfügbaren Befehle funktionieren garantiert.
- **Zu häufige Abfrage**: Erhöhen Sie das Abfrageintervall, falls Kommunikationsfehler auftreten.

## Haftungsausschluss
iiyama und ProLite sind Marken ihrer jeweiligen Inhaber. Dieser Adapter ist ein Community-Projekt und steht in keiner Verbindung zu iiyama, wird nicht von iiyama unterstützt oder empfohlen.

## Marken
iiyama und ProLite sind Marken der iiyama Corporation. Dieser Adapter ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zur iiyama Corporation. Er wird weder von ihr unterstützt noch empfohlen.
Das Adaptersymbol verwendet die offizielle iiyama-Wortmarke aus [iiyama Pressematerialien](http://www.iiyama.com/gl_en/press-materials/), die gemeinfrei ist (da sie die Schöpfungshöhe unterschreitet).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.1.6 (2026-08-19)
* (Alan Paris) Fixed `protectedNative` being placed inside `common` in io-package.json, where js-controller ignored it and the schema rejected it (repochecker E1105) - the MAC address is now genuinely protected

### 0.1.5 (2026-08-19)
* (Alan Paris) Replaced the create-adapter placeholder icon with the official iiyama wordmark
* (Alan Paris) Fixed polling stopping permanently when a Wake-on-LAN power command was not answered
* (Alan Paris) Fixed the command queue hanging forever when the connection dropped mid-command
* (Alan Paris) Status replies are now matched to the command that asked for them, so a timed-out poll can no longer write another command's value into a state
* (Alan Paris) Repeated command failures are now logged once instead of on every poll cycle, and clear `info.connection` after three consecutive failures
* (Alan Paris) Controls now snap back to the last confirmed value when a command is refused or cannot be delivered
* (Alan Paris) State metadata is now applied with `extendObject`, so corrected roles reach existing installations on upgrade and not just new ones
* (Alan Paris) Added `macAddress` to `protectedNative` so it is not readable by non-admin users
* (Alan Paris) Fixed the connection status staying `true` after a reconnect to a display that answers nothing
* (Alan Paris) Fixed overlapping reconnect attempts while a display was in standby, which could leave an unclosed socket behind
* (Alan Paris) Power Save Mode 1/2 no longer reports the display as off when it is already on and reachable
* (Alan Paris) The "display appears to be off" notice is now logged once per standby period instead of every 30 seconds
* (Alan Paris) Serial connections now retry after a failed port open, so a dongle plugged in later (or a permissions fix) no longer needs an instance restart
* (Alan Paris) Repeated connection errors are now logged once instead of on every retry

### 0.1.4 (2026-07-16)
* (Alan Paris) Removed the manufacturer protocol PDF from the repository and its git history
* (Alan Paris) Added a 10 s TCP connection timeout so an unreachable display no longer hangs the connect
* (Alan Paris) Redacted MAC addresses in log output (only the last three octets are shown)
* (Alan Paris) Changed the brightness state role to `level.dimmer`
* (Alan Paris) Poll cycles are now skipped while the previous cycle is still processing, preventing command-queue backlog
* (Alan Paris) Documented reserved protocol command/input-source codes that are not yet exposed as states

### 0.1.3 (2026-07-06)
* (Alan Paris) Updated serialport dependency to 13.0.0

### 0.1.2 (2026-07-06)
* (Alan Paris) Create channel objects for info/volume/video/audio/commands so every state has an intermediate parent object (fixes repochecker E3009)

### 0.1.1 (2026-07-05)
* (Alan Paris) Enabled automated npm publishing via GitHub Actions trusted publishing (OIDC)

### 0.1.0 (2026-07-05)
* (Alan Paris) Initial release: TCP/IP and serial (RS232) control of iiyama ProLite displays
* (Alan Paris) Power, input source, volume, video and audio control with status polling
* (Alan Paris) Wake-on-LAN support for Power Save Modes 3 and 4, with subnet-broadcast derivation
* (Alan Paris) Automatic reconnection with slow standby polling to recover when a display is powered on

## License
MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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