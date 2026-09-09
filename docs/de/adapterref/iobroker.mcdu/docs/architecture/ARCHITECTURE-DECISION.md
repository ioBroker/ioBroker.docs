---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md
title: Architekturentscheidung: RasPi MCDU-Einheit ↔ ioBroker
hash: NQv2hsuuphsOVGbVZbAX75WFofu0OMVuNWFe1f12/W0=
---
# Architekturentscheidung: RasPi MCDU-Einheit ↔ ioBroker

**Datum:** 14.02.2026\
&#x20;**Status:** 🤔 Entscheidung vor Phase 3 erforderlich

## Die Frage

Felix möchte einen **Raspberry Pi als dedizierte MCDU-Einheit** (kluge Entscheidung!). Aber:

- Wo verläuft die Trennlinie zwischen RasPi und ioBroker?
- Wo ist die Geschäftslogik angesiedelt?
- Wie kommunizieren sie?
- Was ist robust, kompakt und schnell?

---

## Wie andere Systeme es machen

### 1. Lovelace/Tablet-Dashboards (Browserbasiert)

```
┌─────────────┐         HTTP/WebSocket        ┌─────────────┐
│   Tablet    │ ◄─────────────────────────── │  ioBroker   │
│             │                                │             │
│ - Browser   │  Request: "What to show?"     │ - Web Server│
│ - Rendering │  Response: Full HTML/JSON     │ - Logic     │
│ - Touch     │  Send: "Button X pressed"     │ - States    │
│   Events    │                                │ - Templates │
└─────────────┘                                └─────────────┘
```

**Eigenschaften:**

- Tablet = 100% dumm (rendert nur)
- Die gesamte Logik in ioBroker
- Konfiguration in ioBroker
- Aktualisierungen: Nur serverseitig

**Vorteile:**

- Einfacher Client (nur Browser)
- Zentralisierte Konfiguration
- Einfache Bedienung mit mehreren Geräten

**Nachteile:**

- Netzwerklatenz für jede Interaktion
- Erfordert Web-Stack

---

### 2. ZigBee/Z-Wave-Geräte

```
┌─────────────┐         Zigbee Protocol       ┌─────────────┐
│   Device    │ ◄─────────────────────────── │  Coordinator│
│             │                                │  (USB Stick)│
│ - Firmware  │  Send: "Button pressed"       │             │
│ - Minimal   │  Receive: "LED on/off"        │      ↕      │
│   Logic     │                                │             │
│             │                                │  ioBroker   │
│ - Battery   │                                │  Adapter    │
└─────────────┘                                └─────────────┘
```

**Eigenschaften:**

- Das Gerät verfügt über eine minimale Firmware (Taste → Signal).
- Die gesamte Geschäftslogik befindet sich im ioBroker-Adapter.
- Zigbee-Koordinator übersetzt Protokoll

**Vorteile:**

- Geräte mit extrem hoher Robustheit (minimale Logik)
- Batterieeffizient
- Konfiguration in ioBroker

**Nachteile:**

- Benötigt spezielle Hardware (Zigbee-Koordinator)
- Beschränkt auf ZigBee-Fähigkeiten

---

### 3. Sonoff/Tasmota (MQTT-basierte Smart-Geräte)

```
┌─────────────┐            MQTT               ┌─────────────┐
│  Tasmota    │ ◄─────────────────────────── │MQTT Broker  │
│  Device     │                                │ (Mosquitto) │
│             │  Publish: stat/device/POWER   │             │
│ - Firmware  │  Subscribe: cmnd/device/POWER │      ↕      │
│ - Templates │                                │             │
│ - Rules     │                                │  ioBroker   │
│ - Local     │                                │  (Standard  │
│   Logic     │                                │   MQTT      │
│             │                                │   Adapter)  │
└─────────────┘                                └─────────────┘
```

**Eigenschaften:**

- Das Gerät verfügt über eine eigene Logik (Regeln, Vorlagen).
- ioBroker abonniert lediglich MQTT-Themen.
- Konfiguration auf dem Gerät (Weboberfläche) ODER über MQTT

**Vorteile:**

- Schnelle lokale Reaktion
- Funktioniert offline (von ioBroker)
- Standard-MQTT-Adapter

**Nachteile:**

- Konfiguration auf jedem Gerät
- Aktualisierungen pro Gerät erforderlich
- Zwei Orte für Logik

---

### 4. Squeezebox/Logitech Medienserver

```
┌─────────────┐        Squeezebox Protocol    ┌─────────────┐
│  Player     │ ◄─────────────────────────── │    LMS      │
│  (RasPi)    │                                │   Server    │
│             │  Request: "Next track info"   │             │
│ - Renderer  │  Response: Full track data    │ - Library   │
│ - Display   │  Send: "Button: Next"         │ - Playlists │
│   Driver    │                                │ - Logic     │
│ - Audio     │                                │ - Plugins   │
│   Output    │                                │             │
│             │  Cached: Current playlist     │             │
└─────────────┘                                └─────────────┘
```

**Eigenschaften:**

- Player = Rendering-Client mit lokalem Cache
- Der Server enthält die gesamte Musiklogik.
- Schnelle Interaktion durch Caching

**Vorteile:**

- Mehrere Spieler (Schlafzimmer, Wohnzimmer)
- Zentralisierte Bibliothek & Konfiguration
- Reaktionsschnell (lokaler Cache)

**Nachteile:**

- Komplexes Protokoll
- Der Spieler benötigt etwas Geschick (Caching).

---

## Empfohlene Architektur für MCDU

### Option C: **Hybridansatz** (Das Beste aus beiden Welten)

```
┌───────────────────────────────────┐
│     RasPi MCDU Unit               │
│                                   │
│  ┌─────────────────────────────┐ │         MQTT
│  │   mcdu-client.js            │ │    ┌──────────────┐
│  │                             │ │◄───┤ MQTT Broker  │
│  │ - mcdu.js driver            │ │    └──────────────┘
│  │ - MQTT client               │ │           ▲
│  │ - Template cache (local)    │ │           │
│  │ - Display renderer          │ │           │
│  │                             │ │           │
│  │ Subscribe:                  │ │           │
│  │   mcdu/DEVICE_ID/display/#  │ │           │
│  │   mcdu/DEVICE_ID/led/#      │ │           │
│  │   mcdu/DEVICE_ID/template/# │ │           │
│  │                             │ │           │
│  │ Publish:                    │ │           │
│  │   mcdu/DEVICE_ID/button/LSK1L│ │          │
│  │   mcdu/DEVICE_ID/status     │ │           │
│  └─────────────────────────────┘ │           │
│                ↕                  │           │
│  ┌─────────────────────────────┐ │           │
│  │   USB                       │ │           │
│  │   MCDU Hardware             │ │           │
│  └─────────────────────────────┘ │           │
└───────────────────────────────────┘           │
                                                │
                                                │
┌───────────────────────────────────────────────┼───────┐
│     ioBroker Instance                         │       │
│                                               ▼       │
│  ┌─────────────────────────────────────────────────┐ │
│  │   ioBroker.mcdu Adapter                         │ │
│  │                                                  │ │
│  │ - Template Management                           │ │
│  │ - State Mapping (States ↔ Display)             │ │
│  │ - Button Handler (Button Events → Actions)     │ │
│  │ - Multi-MCDU Support                           │ │
│  │                                                  │ │
│  │ Subscribe:                                      │ │
│  │   mcdu/+/button/#    (all devices, all buttons)│ │
│  │   mcdu/+/status                                 │ │
│  │                                                  │ │
│  │ Publish:                                        │ │
│  │   mcdu/DEVICE_ID/display/line1 = "TEXT"        │ │
│  │   mcdu/DEVICE_ID/led/FAIL = 255                │ │
│  │   mcdu/DEVICE_ID/template/current = {...}      │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │   ioBroker States                               │ │
│  │                                                  │ │
│  │   0_userdata.0.solar.power = 5.2 kW            │ │
│  │   0_userdata.0.weather.temp = 22°C             │ │
│  │   hm-rpc.0.washing_machine.STATE = true        │ │
│  └─────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────┘
```

---

## Kommunikationsprotokoll (MQTT-Themen)

### RasPi → ioBroker (Button Events)

```
Topic: mcdu/DEVICE_ID/button/LSK1L
Payload: { "pressed": true, "timestamp": 1707912345 }

Topic: mcdu/DEVICE_ID/button/DIR
Payload: { "pressed": true }
```

### ioBroker → RasPi (Anzeigeaktualisierungen)

```
Topic: mcdu/DEVICE_ID/display/line1
Payload: "SOLAR POWER"

Topic: mcdu/DEVICE_ID/display/line2
Payload: "5.2 kW"

Topic: mcdu/DEVICE_ID/led/FAIL
Payload: 0

Topic: mcdu/DEVICE_ID/led/RDY
Payload: 255
```

### ioBroker → RasPi (Template-Synchronisierung)

```
Topic: mcdu/DEVICE_ID/template/current
Payload: {
  "name": "solar_overview",
  "lines": [
    { "text": "SOLAR POWER", "color": "W" },
    { "text": "${state:0_userdata.0.solar.power} kW", "color": "G" }
  ],
  "buttons": {
    "LSK1L": { "action": "toggle", "target": "hm-rpc.0.lights.kitchen" }
  }
}
```

---

## Wo wohnt was?

### RasPi MCDU-Einheit (mcdu-client.js)

**Verantwortlichkeiten:**

- ✅ Hardwaretreiber (mcdu.js)
- ✅ MQTT-Client
- ✅ Vorlagencache (für Offline-Funktionalität)
- ✅ Display-Rendering (MQTT-Status → MCDU-Anzeige)
- ✅ Tastenauslesung (MCDU-Taste → MQTT-Veröffentlichung)
- ✅ LED-Steuerung (MQTT-Befehl → MCDU-LED)

**Verarbeitet NICHT:**

- ❌ Geschäftslogik (welche Schaltfläche bewirkt was)
- ❌ Staatliche Abonnements (welche Staaten sollen angezeigt werden?)
- ❌ Erstellung/Bearbeitung von Vorlagen

**Umfang:** ca. 500 Codezeilen\
&#x20;**Abhängigkeiten:** node-hid, mqtt\
&#x20;**Konfiguration:** Nur MQTT-Broker-IP + Geräte-ID

---

### ioBroker-Adapter (ioBroker.mcdu)

**Verantwortlichkeiten:**

- ✅ Vorlagenverwaltung (Erstellen/Bearbeiten/Speichern)
- ✅ Zustandszuordnung (ioBroker-Zustände → MCDU-Anzeige)
- ✅ Schaltflächenverarbeitung (Schaltflächenereignisse → ioBroker-Aktionen)
- ✅ Unterstützung für mehrere MCDUs
- ✅ Admin-Benutzeroberfläche (JSON-Konfiguration)

**Verarbeitet NICHT:**

- ❌ USB/HID-Kommunikation (das ist beim RasPi der Fall)
- ❌ Display-Rendering (das übernimmt der Raspberry Pi)

**Umfang:** ca. 1500 Codezeilen\
&#x20;**Abhängigkeiten:** Standard-ioBroker-Adapterabhängigkeiten

---

## Beispielablauf: „Solarenergie anzeigen“

### 1. Konfiguration (in der ioBroker-Admin-Benutzeroberfläche)

```javascript
// User configures template in ioBroker
{
  "template": "solar_overview",
  "line1": { "text": "SOLAR POWER", "color": "W" },
  "line2": { "text": "${state:0_userdata.0.solar.power} kW", "color": "G" },
  "line3": { "text": "Battery: ${state:0_userdata.0.battery.soc}%", "color": "A" }
}
```

### 2. Template-Synchronisierung (ioBroker → RasPi)

```
ioBroker publishes to: mcdu/raspi-kitchen/template/solar_overview
RasPi receives and caches template
```

### 3. Zustandsänderungen (ioBroker → RasPi)

```
Solar power changes: 5.2 kW → 5.5 kW

ioBroker adapter:
1. Detects state change
2. Renders template with new value
3. Publishes: mcdu/raspi-kitchen/display/line2 = "5.5 kW"

RasPi:
1. Receives MQTT message
2. Calls: mcdu.setLine(1, "5.5 kW", "G")
3. Calls: mcdu.updateDisplay()
```

### 4. Tastendruck (RasPi → ioBroker)

```
User presses LSK1L

RasPi:
1. mcdu.js detects button press (bit 0)
2. Looks up button-map.json: bit 0 = "LSK1L"
3. Publishes: mcdu/raspi-kitchen/button/LSK1L = { "pressed": true }

ioBroker adapter:
1. Receives MQTT message
2. Checks template: LSK1L → toggle light
3. Executes: setState("hm-rpc.0.lights.kitchen", !currentState)
4. Updates display if needed
```

---

## Warum diese Architektur?

### ✅ Robust

- Die RasPi-Software ist einfach (Treiber + MQTT).
- Keine komplexe Geschäftslogik auf dem RasPi
- Übersteht Neustarts von ioBroker (zwischengespeicherte Vorlagen)

### ✅ Schnell

- Aktualisierungszeit der Anzeige: <50 ms (lokales Rendering)
- Tastenreaktion: <100 ms (MQTT-Veröffentlichung erfolgt sofort)
- Der Template-Cache vermeidet ständigen Netzwerkverkehr

### ✅ Kompakt

- RasPi-Code: ca. 500 Zeilen
- Einzelne Binärdatei/Dienst
- Keine Datenbank erforderlich

### ✅ Skalierbar

- Mehrere MCDUs: Einfach noch mehr Raspberry Pis
- Jeder RasPi = unabhängiger Client
- Zentrale Konfiguration in ioBroker

### ✅ Debuggbar

- RasPi-Protokolle: „Anzeigeaktualisierung für Zeile 2 empfangen“
- ioBroker-Protokolle: „Taste LSK1L gedrückt, Leuchte blinkt“
- Der MQTT-Broker zeigt den gesamten Datenverkehr an.
- Kann mit testen`mosquitto_pub` /`mosquitto_sub`

---

## Entwicklungsphasen (ÜBERARBEITET)

### Phase 3a: RasPi-Client (1-2 Tage)

Bauen`mcdu-client.js` :

1. mcdu.js-Treiber laden
2. Verbindung zum MQTT-Broker herstellen
3. Abonnieren Sie die Themenbereiche Display/LED.
4. Ereignisse der Schaltfläche „Veröffentlichen“
5. Einfacher Vorlagencache

**Test ohne ioBroker:**

```bash
# Publish display update
mosquitto_pub -t "mcdu/test/display/line1" -m "HELLO"

# Subscribe to buttons
mosquitto_sub -t "mcdu/test/button/#"
```

### Phase 3b: ioBroker-Adapter (2-3 Tage)

ioBroker.mcdu erstellen:

1. MQTT-Client
2. Vorlagenverwaltung
3. Staatsabonnements
4. Schaltflächenbehandler
5. JSON-Konfigurations-UI

**Test mit laufendem Raspberry Pi:**

- Vorlage in ioBroker konfigurieren
- Sieh es dir auf MCDU an
- Knopf drücken, Aktion beobachten

---

## Entscheidung erforderlich

**Felix, ist diese Architektur sinnvoll?**

**Vorteile:**

- Klare Trennung: RasPi = Hardware, ioBroker = Logik
- MQTT = Industriestandard (zuverlässig, debuggbar)
- Kann selbstständig einen RasPi-Client entwickeln/testen
- Kann mit testen`mosquitto_pub` bevor der ioBroker-Adapter existiert

**Fragen:**

1. Läuft bei Ihnen bereits ein MQTT-Broker? (Mosquitto?)
2. Soll jeder Raspberry Pi eine eigene, eindeutige ID haben?
3. Soll der RasPi-Client ioBroker automatisch erkennen oder eine statische Konfiguration verwenden?

---

**Nächster Schritt:** Sobald Sie diese Architektur genehmigt haben, bauen wir zuerst Phase 3a (RasPi-Client)!