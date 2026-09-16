---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/PROTOCOL.md
title: MCDU MQTT-Protokollspezifikation
hash: 331w3+W+MQ8Zz0k7BGWFagSiq+udXfDK1uv/MhPzFa8=
---
# MCDU MQTT-Protokollspezifikation

**Version:** 1.0 **Status:** Stabil — Dies ist die Vereinbarung zwischen jedem „Gehirn“ (ioBroker-Adapter, Home Assistant-Integration usw.) und dem`mcdu-client` läuft auf dem Raspberry Pi.

Der Client ist ein einfaches Terminal: Er gibt die empfangenen Daten wieder und meldet Tastendrücke. Die gesamte Geschäftslogik (Seitenverwaltung, Navigation, Eingabe, Validierung) befindet sich auf der Prozessorseite. Jede Integration, die diese Spezifikation implementiert, kann die MCDU ohne Änderungen am Client steuern.

```
Brain (adapter/integration)  <-- MQTT broker -->  mcdu-client (Pi)  <-- USB HID -->  WinWing MCDU
```

**WICHTIG – Regel für ein einzelnes Gehirn:** Nur EIN Gehirn darf gleichzeitig aktiv auf einem bestimmten Gerät Inhalte veröffentlichen. Die Anzeigethemen bleiben erhalten; zwei Veröffentlichungen führen zu Flackern und einem undefinierten Anzeigezustand. Beim Wechsel zwischen Integrationen muss die alte Integration zuerst gestoppt werden.

---

## 1. Themenstruktur

Alle Themen:`{prefix}/{deviceId}/{suffix}`

- `prefix` : Standard`mcdu` (Clientkonfiguration)`mqtt.topicPrefix` , Adapterkonfiguration`topicPrefix` )
- `deviceId` : der MQTT-Server des Clients`clientId` (Clientkonfiguration)`mqtt.clientId` z.B.`mcdu-client-pi` )

### Gehirn → Client (Client abonniert, QoS 1)

| Themensuffix    | Zweck                                               |
| --------------- | --------------------------------------------------- |
| `display/set`   | Vollständige Anzeigeaktualisierung (alle 14 Zeilen) |
| `display/line`  | Aktualisierung in einer einzelnen Zeile             |
| `display/clear` | Anzeige löschen                                     |
| `leds/set`      | Mehrere LEDs gleichzeitig einstellen                |
| `leds/single`   | Stellen Sie eine einzelne LED ein.                  |
| `status/ping`   | Anfrage zur Gesundheitsuntersuchung                 |

### Klient → Gehirn

| Themensuffix      | QoS | Zurückbehalten | Zweck                                       |
| ----------------- | --- | -------------- | ------------------------------------------- |
| `status/online`   | 1   | Ja             | Online-/Offline-Status (auch das Thema LWT) |
| `status/announce` | 1   | NEIN           | Geräteankündigung bei Verbindung            |
| `buttons/event`   | 1   | NEIN           | Tastendrück-/Loslassereignisse              |
| `status/pong`     | 0   | NEIN           | Antwort auf die Gesundheitsprüfung          |
| `status/error`    | 1   | NEIN           | Clientseitiger Fehlerbericht                |

### Nur das Gehirn

| Thema                     | Zweck                                                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `{prefix}/adapter/status` | Gehirn online/offline (Speicherung, LWT). Nur zu Informationszwecken; der Kunde nutzt es nicht. |

---

## 2. Nutzlasten

Alle Nutzdaten sind im JSON-Format (UTF-8).`timestamp` Die Felder sind Unix-Millisekunden.

### 2.1`display/set` — vollständige Anzeige (beibehalten)

```json
{
  "lines": [
    { "text": "        MCDU MENU       ", "color": "white" },
    { "text": "<IOBROKER               ", "color": "cyan",
      "segments": [
        { "text": "<IOBROKER   ", "color": "cyan" },
        { "text": "  SETTINGS> ", "color": "amber" }
      ]
    }
  ],
  "timestamp": 1755500000000
}
```

Regeln:

- `lines` MUSS genau 14 Einträge enthalten (Array-Index 0 = oberste Zeile ... 13 = Notizblock).
- `text` Muss genau 24 Zeichen lang sein (mit Leerzeichen auffüllen/abschneiden). Nur ASCII-Zeichen – Nicht-ASCII-Zeichen führen dazu, dass die Hardware Anzeigeframes auslässt.
- `color` : einer von`white` ,`amber` ,`cyan` ,`green` ,`magenta` ,`red` ,`yellow` ,`grey` ,`blue` Unbekannte Farben fallen auf die Standardfarben zurück.`white` . (`blue` wird auf denselben Hardwarecode abgebildet wie`cyan` .)
- `segments` (optional): Mehrfarbige Darstellung einer Zeile. Segmenttexte werden von links nach rechts verkettet; ihre Gesamtlänge sollte 24 betragen.`segments` Wenn eine solche vorhanden ist, hat sie Vorrang vor der Zeilenebene.`color` ;`text` sollte weiterhin die vollständige 24-Zeichen-Zeile als Fallback-/Cache-Wert enthalten.
- Veröffentlicht mit der Einstellung „retain“, sodass ein (wieder)verbindender Client sofort die aktuelle Seite rendert (der Client erfasst den beibehaltenen Frame während der Hardware-Initialisierung).

### 2.2`display/line` — einzeilig (beibehalten)

```json
{ "lineNumber": 3, "text": "LIVING ROOM 21.5 C      ", "color": "green", "timestamp": 1755500000000 }
```

- `lineNumber` ist **1-basiert** (1..14) – im Gegensatz zum 0-basierten Array in`display/set` Die
- `segments` wird auf die gleiche Weise unterstützt wie in`display/set` (Dann`text` /`color` (kann weggelassen werden).

### 2.3`display/clear` (beibehalten)

```json
{ "timestamp": 1755500000000 }
```

Setzt alle 14 Zeilen auf leer (weiß) zurück.

### 2.4`leds/set`

```json
{ "leds": { "FAIL": true, "MCDU": false, "BACKLIGHT": 180 } }
```

- Werte: boolescher Wert (ein/aus) oder Zahl 0–255 (Helligkeit, begrenzt).
- Unbekannte LED-Namen werden ignoriert und eine Warnung ausgegeben.

### 2,5`leds/single`

```json
{ "name": "RDY", "state": true }
{ "name": "SCREEN_BACKLIGHT", "brightness": 128 }
```

- Entweder`state` (boolesch) oder`brightness` (0–255).`brightness` gewinnt, wenn beide anwesend sind.

LED-Bezeichnungen (11):`FAIL` ,`FM` ,`MCDU` ,`MENU` ,`FM1` ,`IND` ,`RDY` ,`STATUS` ,`FM2` ,`BACKLIGHT` ,`SCREEN_BACKLIGHT` Die beiden Hintergrundbeleuchtungen sind beim Start des Clients standardmäßig eingeschaltet.

### 2.6`status/ping` →`status/pong`

Anfrage:`{ "requestId": "abc123" }`

Antwort:

```json
{
  "requestId": "abc123",
  "uptime": 3600,
  "buttonsSent": 42,
  "displaysRendered": 100,
  "mqttMessagesReceived": 150,
  "errors": 0,
  "timestamp": 1755500000000
}
```

### 2.7`status/online` (beibehalten, LWT)

Beim Verbinden:

```json
{
  "status": "online",
  "hostname": "mcdu2",
  "clientId": "mcdu-client-pi",
  "version": "1.0.0",
  "mockMode": false,
  "timestamp": 1755500000000
}
```

LWT / geordnetes Herunterfahren:`{ "status": "offline", "timestamp": ... }`

Da diese Information erhalten bleibt, kann ein Gehirn **Geräte entdecken** , indem es sich anmeldet.`{prefix}/+/status/online` Die

### 2.8`status/announce`

Wird bei jeder Client-Verbindung einmalig veröffentlicht (wird nicht gespeichert):

```json
{
  "deviceId": "mcdu-client-pi",
  "hostname": "mcdu2",
  "ipAddress": "10.10.2.228",
  "version": "1.0.0",
  "timestamp": 1755500000000
}
```

### 2.9`buttons/event`

```json
{ "button": "LSK1L", "action": "press", "timestamp": 1755500000000 }
```

- `action` :`press` oder`release` Die
- Schaltflächennamen (siehe`mcdu-client/lib/button-map.json` (für die maßgebliche Liste):
  - LSKs:`LSK1L` ...`LSK6L` ,`LSK1R` ...`LSK6R`
  - Funktionstasten:`DIR` ,`PROG` ,`PERF` ,`INIT` ,`DATA` ,`FPLN` ,`RAD` ,`FUEL` ,`SEC` ,`ATC` ,`MENU` ,`AIRPORT`
  - Slew:`SLEW_LEFT` ,`SLEW_UP` ,`SLEW_RIGHT` ,`SLEW_DOWN`
  - Alphanumerisch:`A` ...`Z` ,`0` ...`9` ,`DOT` ,`PLUSMINUS` ,`SLASH` ,`SPACE`
  - Besonders:`OVFY` ,`CLR` ,`BRT` ,`DIM` ,`EMPTY_LEFT` ,`EMPTY_RIGHT`

### 2.10`status/error`

```json
{ "error": "Display update error", "code": "USB_WRITE", "stack": "...", "timestamp": 1755500000000 }
```

---

## 3. Verhaltensanforderungen an das Gehirn

1. **Die Aktualisierungsrate der Anzeige wird gedrosselt.** Der Client benötigt ca. 560 ms, um ein vollständiges Bild über USB zu übertragen (14 Zeilen × 40 ms). Der Referenzadapter drosselt die Übertragung auf maximal 10 Bilder pro Sekunde und dedupliziert unveränderte Bilder. Brains SOLLTE dasselbe tun.
2. **Beibehaltene Anzeigethemen sind der Anzeigestatus.** Veröffentlichen`display/set` mit Beibehaltung, sodass die Clients die Verbindung wiederherstellen und den Bildschirm ohne Gehirninteraktion wiederherstellen können.
3. **Nur ASCII.** Bitte den gesamten Text vor der Veröffentlichung in druckbares ASCII-Format umwandeln.
4. **LEDs nach dem Display.** Wenn Sie Display und LEDs "gleichzeitig" ändern, veröffentlichen Sie zuerst das Display-Update (eine Hardware-Beschränkung wird vom Client berücksichtigt, aber die Reihenfolge auf der Leitung vermeidet sichtbare Fehler).
5. **Geräteerkennung.** Abonnieren`{prefix}/+/status/online` (beibehalten) und/oder`{prefix}/+/status/announce` Die

---

## 4. Legacy / reserviert (nicht implementieren)

- `mcdu-client/lib/mqtt-handler.js` ist **veralteter Code** mit einem älteren Themenschema (`display/line{N}` ,`display/color{N}` ,`led/{NAME}` ,`config/#` ,`button/{label}` ,`heartbeat` Es ist nicht verdrahtet in`mcdu-client.js` Nicht dagegen vorgehen.
- `buttons/keypad` Der Referenzadapter abonniert diese Information aus historischen Gründen; der aktuelle Client veröffentlicht sie nie. Reserviert.

---

## 5. Versionsverwaltung

- Dieses Dokument ist Protokoll **v1.0** (entspricht`version: "1.0.0"` (in Client-Status-Payloads).
- Änderungen, die nicht rückwärtskompatibel sind, erhöhen die Hauptversion und MÜSSEN zwischen dem ioBroker-Adapter, der Home Assistant-Integration und dem Client koordiniert werden.