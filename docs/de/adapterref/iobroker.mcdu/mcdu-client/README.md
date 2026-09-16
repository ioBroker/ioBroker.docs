---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/mcdu-client/README.md
title: MCDU MQTT-Client
hash: EWRmxAVCM0Akx092SaBo5Ik4tv+hsYg1j3+Dhs4B46Y=
---
# MCDU MQTT-Client

Hardwarebrücke zwischen WINWING MCDU-32-CAPTAIN und MQTT-Broker. Fungiert als „einfaches Terminal“ – keine Geschäftslogik, nur USB HID <-> MQTT.

## Architektur

```
┌─────────────────┐      MQTT       ┌──────────────────┐      USB HID     ┌──────────────┐
│   ioBroker      │ <─────────────> │  mcdu-client.js  │ <──────────────> │  MCDU-32-    │
│   Adapter       │                 │                  │                  │  CAPTAIN     │
└─────────────────┘                 └──────────────────┘                  └──────────────┘
```

## Hardwareunterstützung

Verwendung`node-hid` für USB-HID-Kommunikation auf allen Plattformen:

- **macOS** : IOHIDManager-Backend (Steuerungsübertragung über IOHIDManager)
- **Linux/Raspberry Pi** : hidraw-Backend (Kernel sendet SET\_REPORT-Steuerübertragungen)

> Die WinWing-Firmware benötigt SET\_REPORT-Steuerungsübertragungen. Das hidraw-Kernel-Backend übernimmt dies automatisch – es ist keine spezielle Konfiguration erforderlich.

## Schnellstart

### macOS (Entwicklung)

```bash
cd mcdu-client
npm install
node mcdu-client.js
```

### Raspberry Pi (Produktionsversion)

Die vollständigen Installationsanweisungen finden Sie in der [Datei GETTING-STARTED.md](/#/docs/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md) .

## Konfiguration

Bearbeiten`config.env` :

```bash
MQTT_BROKER=mqtt://YOUR_BROKER_IP:1883   # MQTT broker address
MQTT_TOPIC_PREFIX=mcdu                    # Topic prefix (default: mcdu)
MQTT_CLIENT_ID=mcdu-client-mac           # Client ID (auto-derived from hostname if blank)
```

## Anzeigeprotokoll (WinWing-Firmware)

### Kritische Einschränkungen

1. **Einmalige Initialisierung** : Die Firmware akzeptiert nur`0xf0` Initialisierungspakete werden **einmal pro USB-Stromzyklus** gesendet. Nach dem Schließen und erneuten Öffnen der Software werden die Initialisierungspakete ignoriert. Schalten Sie das Gerät einmal ein und schließen Sie es danach nicht mehr.

2. **40 ms zwischen Anzeigepaketen** : Die Firmware benötigt 40 ms zwischen aufeinanderfolgenden Paketen.`0xf2` Anzeigepakete. Schnelleres Senden führt zu unzuverlässiger Darstellung oder zum stillen Verlust von Paketen.

3. **Nur ASCII** : Alle an das Display gesendeten Zeichenbytes MÜSSEN <= 0x7F sein. Die Firmware verwirft stillschweigend den gesamten Anzeigeframe, sobald ein Byte > 0x7F auftritt – ohne Fehlermeldung, ohne Bestätigung, das Display friert einfach ein. Dies wird in zwei Ebenen gehandhabt:
   - **Adapter** (`lib/rendering/PageRenderer.sanitizeAscii()` ): Bereinigt den Statusleisten-/Breadcrumb-Text
   - **Kunde** (`lib/mcdu.js sanitizeAscii()` ): bereinigt den gesamten Zeileninhalt in`setLine()` Und`_setLineSegments()`

4. **LEDs nach der Anzeige** : Schreiben Sie den LED-Status immer erst nach der Aktualisierung der Anzeige, nicht vorher.

### Startsequenz

```
1. Open HID device once
2. initDisplay()       — 17 x 0xf0 packets, 10ms between each
3. wait 200ms          — firmware settle
4. clear()             — 16 x 0xf2 WHITE+spaces -> WinWing logo disappears
5. Connect MQTT        — in parallel with settle wait
6. wait ~3s total      — firmware fully settled
7. Receive display/set -> updateDisplay() -> setAllLEDs()
```

## MQTT-Themen

Alle Themen beginnen mit einem`{MQTT_TOPIC_PREFIX}/{deviceId}/` Die

### Client empfängt (Adapter -> Client)

| Thema          | Zweck                                                       |
| -------------- | ----------------------------------------------------------- |
| `display/set`  | Vollständige Anzeigeaktualisierung (14 Zeilen, beibehalten) |
| `display/line` | Aktualisierung in einer einzelnen Zeile                     |
| `leds/set`     | Alle LEDs einstellen                                        |
| `leds/single`  | Einzelne LED einstellen                                     |
| `status/ping`  | Anfrage zur Gesundheitsuntersuchung                         |

### Client veröffentlicht (Client -> Adapter)

| Thema           | Zweck                              |
| --------------- | ---------------------------------- |
| `buttons/event` | Tastendrückereignisse              |
| `status/online` | Online-Ankündigung (LWT)           |
| `status/pong`   | Antwort auf die Gesundheitsprüfung |

## Fehlerbehebung

### Nach einem Neustart der Software bleibt der Bildschirm beim WinWing-Startbildschirm hängen.

Die Firmware ignoriert Initialisierungspakete nach dem ersten USB-Stromzyklus. Zum Zurücksetzen des Firmware-Zustands **ist ein physisches Trennen und Wiederverbinden erforderlich** . Dies ist beabsichtigt – der Client ist als persistenter Dienst konzipiert, der das Gerät nur einmalig öffnet.

### Die Anzeige friert beim Navigieren auf Seiten ein.

Die WinWing-Firmware blendet den gesamten Anzeigebereich aus, sobald ein Zeichenbyte > 0x7F erkannt wird. Die Anzeige bleibt auf der vorherigen Seite eingefroren, ohne dass eine Fehlermeldung angezeigt wird.

Nicht-ASCII-Zeichen können an zwei Stellen vorkommen:

- **Statusleiste / Breadcrumb** : Seitennamen wie „Hauptmenü“ – bereinigt durch`PageRenderer.sanitizeAscii()` im Adapter
- **Zeileninhalt** : Schaltflächenbeschriftungen wie „Zuruck“ – bereinigt von`mcdu.sanitizeAscii()` In`setLine()` vor dem Schreiben

Wenn das Einfrieren des Bildschirms wiederholt auftritt, suchen Sie nach`[DISPLAY] NON-ASCII char at line X col Y` im Client-Log – dies bedeutet, dass ein Zeichen umgangen wurde`setLine()` und wird zu einem Frame-Einbruch führen.

### HID-Gerät nicht gefunden (Linux)

```bash
# Check USB connection
lsusb | grep 4098

# Check hidraw device
ls -la /dev/hidraw*

# Check udev rule
cat /etc/udev/rules.d/99-winwing-mcdu.rules

# Check group membership
id -nG | grep plugdev
```

### MQTT-Verbindung abgelehnt

```bash
mosquitto_pub -h YOUR_BROKER_IP -t test -m "hello"
```

## Dateistruktur

```
mcdu-client/
├── mcdu-client.js        # Main entry point
├── lib/
│   ├── mcdu.js           # USB HID driver (node-hid, all platforms)
│   └── button-map.json   # Button ID -> name mapping
├── config.env            # Local config (gitignored on Pi)
├── config.env.template   # Config template
├── install.sh            # Pi setup script
└── mcdu-client.service   # systemd service file
```

## License

MIT — Felix Hummel