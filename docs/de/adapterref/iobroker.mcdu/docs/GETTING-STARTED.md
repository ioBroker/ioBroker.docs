---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md
title: Erste Schritte mit ioBroker.mcdu
hash: 9CN0h34BwMlzHjLwNnnej+UBZOUBLsPnrf171gZvHbc=
---
# Erste Schritte mit ioBroker.mcdu

Diese Anleitung führt Sie durch die Installation und den Anschluss beider Komponenten des MCDU Smart-Home-Systems.

## Architekturübersicht

```
┌──────────────────┐        MQTT        ┌──────────────────┐       USB HID      ┌──────────────┐
│   ioBroker       │ <────────────────> │   mcdu-client    │ <────────────────> │  MCDU-32-    │
│   Adapter        │                    │   (Raspberry Pi) │                    │  CAPTAIN     │
│   (iobroker.mcdu)│                    │                  │                    │  (Hardware)  │
└──────────────────┘                    └──────────────────┘                    └──────────────┘
         │                                       │
         │  Runs on your ioBroker server         │  Runs on a Raspberry Pi
         │  Handles pages, rendering, logic      │  USB HID ↔ MQTT bridge (no logic)
```

**Es müssen zwei Komponenten installiert werden:**

1. **ioBroker-Adapter** (`iobroker.mcdu` ) -- läuft auf Ihrem ioBroker-Server und ist für das Rendern von Seiten, die Navigation und die Automatisierungszustände zuständig.
2. **MCDU-Client** (`mcdu-client` ) -- läuft auf einem Raspberry Pi, an den das MCDU über USB angeschlossen ist, und überbrückt USB HID mit MQTT

Beide kommunizieren über MQTT. Sie benötigen einen laufenden MQTT-Broker (z. B. Mosquitto), der für beide erreichbar ist.

## Voraussetzungen

- Eine laufende **ioBroker** -Installation
- Ein **MQTT-Broker** (z. B. Mosquitto), der sowohl von ioBroker als auch vom Pi erreichbar ist.
- Ein **Raspberry Pi 4** (oder 3B+) mit Pi OS Lite 64-Bit und dem WinWing MCDU-32-CAPTAIN, angeschlossen über USB
- **Node.js 18+** auf dem Pi

---

## 1. Installieren Sie den ioBroker-Adapter.

### Option A: Über die Admin-Oberfläche (von npm)

1. Öffnen Sie die ioBroker-Admin-Benutzeroberfläche.
2. Wechseln Sie zur Registerkarte **„Adapter“** .
3. Suche nach **mcdu**
4. Klicken Sie auf **Installieren.**
5. Eine Instanz`mcdu.0` wird automatisch erstellt

Dies ist die empfohlene Methode für stabile Releases.

### Option B: Über die Admin-Oberfläche (von GitHub)

Verwenden Sie dies für Vorab- oder Entwicklungsversionen:

1. Öffnen Sie die ioBroker-Admin-Benutzeroberfläche.
2. Wechseln Sie zur Registerkarte **„Adapter“** .
3. Klicken Sie auf das **GitHub/Octocat-Symbol** (oben links).
4. Wechseln Sie zur Registerkarte **„Benutzerdefiniert“** .
5. Fügen Sie die Repository-URL ein:
   ```
   https://github.com/Flixhummel/ioBroker.mcdu
   ```
6. Klicken Sie auf **Installieren.**

### Option C: Über die Befehlszeile

```bash
cd /opt/iobroker
iobroker add mcdu
```

Oder installieren Sie es zuerst über npm und fügen Sie dann Folgendes hinzu:

```bash
npm install iobroker.mcdu
iobroker add mcdu
```

### Konfigurieren Sie den Adapter

1. Öffnen Sie die Admin-Benutzeroberfläche und gehen Sie zu **Instanzen.**
2. Klicken Sie auf das Schraubenschlüssel-Symbol.`mcdu.0`
3. Mindestens konfigurieren:
   - **MQTT-Broker-Adresse** -- IP-Adresse/Hostname Ihres MQTT-Brokers (z. B.`localhost` )
   - **MQTT-Port** -- Standard`1883`
4. Speichern und schließen – der Adapter startet und verbindet sich mit MQTT.

Die Admin-Benutzeroberfläche verfügt über vier Konfigurationsregisterkarten:

- **Allgemeine Einstellungen** – MQTT-Broker-Adresse, Leistungsoptimierung
- **Gerät & Seiten** – gerätespezifische Seitenkonfiguration, Standardfarbe, Helligkeitsstufen
- **Funktionstasten** – 11 Funktionstasten der Seitennavigation zuordnen
- **Erweitert & Info** – Debug-Protokollierung, Versionsinformationen

---

## 2. Installieren Sie den MCDU-Client (Raspberry Pi)

Der mcdu-Client ist die USB-HID-Brücke, die auf dem Pi neben der physischen MCDU-Hardware läuft.

> Eine vollständige Schritt-für-Schritt-Anleitung mit Fehlerbehebung finden Sie hier:[`mcdu-client/GETTING-STARTED.md`](/#/docs/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md) Die

### Installieren Sie Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
node --version   # Should show v20.x
```

### Klonen und installieren

```bash
cd ~
git clone https://github.com/Flixhummel/ioBroker.mcdu.git
cd ioBroker.mcdu/mcdu-client
./install.sh
```

Das Installationsskript wird Folgendes tun:

- Laufen`npm install` (vorgefertigte Binärdateien für Node-Hid, kein Compiler erforderlich)
- Erstellen`config.env` aus Vorlage
- Installieren Sie eine udev-Regel für den hidraw-USB-Zugriff.
- Optional kann ein systemd-Dienst installiert werden.

### Konfigurieren

```bash
nano config.env
```

Mindestens einstellen:

```bash
MQTT_BROKER=mqtt://YOUR_BROKER_IP:1883
MQTT_TOPIC_PREFIX=mcdu
```

### Probelauf

```bash
node mcdu-client.js
```

Sie sollten sehen, wie sich der Client mit MQTT verbindet und die Anzeige rendert. Drücken Sie`Ctrl+C` anhalten.

### Als Dienst starten

```bash
sudo systemctl start mcdu-client
sudo journalctl -u mcdu-client -f
```

### Aktualisierung

```bash
cd ~/ioBroker.mcdu/mcdu-client
git pull
npm install
sudo systemctl restart mcdu-client
```

---

## 3. End-to-End-Verifizierung

Sobald beide Komponenten laufen:

1. **Adapterverbindung in ioBroker prüfen** :
   - Gehen Sie in der Admin-Benutzeroberfläche zu **Objekte** .
   - Navigieren Sie zu`mcdu.0.info.connection` -- sollte sein`true`

2. **Überprüfen Sie die mcdu-Client-Protokolle:**
   ```bash
   journalctl -u mcdu-client -f
   ```

3. **Drücken Sie eine Taste auf dem MCDU:**
   - In den mcdu-Client-Protokollen sollte ein Button-Ereignis angezeigt werden.
   - In ioBroker ist der entsprechende Schaltflächenstatus unter`mcdu.0.devices.{deviceId}.buttons.*` sollte aktualisiert werden

4. **Überprüfen Sie die Anzeige:**
   - Das MCDU-Display sollte die konfigurierte Startseite mit Statusleiste und Inhalt anzeigen.

Falls etwas nicht funktioniert, überprüfen Sie Folgendes:

- Der MQTT-Broker ist sowohl von ioBroker als auch vom Pi aus erreichbar.
- Das Themenpräfix stimmt sowohl in der Adapterkonfiguration als auch in der Konfiguration überein.`config.env`
- Die MCDU wird über USB erkannt:`lsusb | grep 4098` (sollte anzeigen`ID 4098:bb36` )

---

## Weiterführende Literatur

- [Leitfaden zur Seitenkonfiguration](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md) – So richten Sie Seiten und Navigation ein
- [Automatisierungs-Schnellstart](/#/docs/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md) – Skripterstellung mit 32 Automatisierungszuständen
- [Architektur](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md) – Systemdesign
- [UX-Konzept](/#/docs/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md) – Cockpit-UX-Muster
- [mcdu-client README](/#/docs/adapterref/iobroker.mcdu/mcdu-client/README.md) -- MQTT-Themen, Anzeigeprotokoll, Fehlerbehebung
- [ioBroker-Adapter-Entwicklungsdokumente](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md)