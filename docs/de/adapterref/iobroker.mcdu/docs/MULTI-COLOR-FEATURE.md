---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md
title: Mehrfarbige Segmente
hash: pGrCUAT698AzErkWXsh4G6GNarDAx78G3CKToddCaRk=
---
# Mehrfarbige Segmente

**Hinzugefügt:** 14.02.2026, 23:10 Uhr MEZ\
&#x20;**Status:** ✅ Implementiert und bereit zum Testen\
&#x20;**Begehen:**`0fa8cf0`

---

## Was hat sich geändert?

### Vorher (Eine Farbe pro Zeile)

Jede Zeile durfte nur EINE Farbe für alle 24 Zeichen haben:

```bash
# All green
{"lineNumber":1,"text":"Living Room: 22°C    ","color":"green"}

# Result: "Living Room: 22°C" - ALL green (not ideal)
```

### Nachher (Mehrere Farben pro Zeile)

Jede Linie kann mithilfe von Segmenten MEHRERE Farben haben:

```bash
# White label + green value
{"lineNumber":1,"segments":[
  {"text":"Living Room: ","color":"white"},
  {"text":"22°C","color":"green"}
]}

# Result: "Living Room: " (white) + "22°C" (green) ✨
```

---

## So funktioniert es

### Hardwareebene

Die MCDU-Hardware unterstützte bereits Farben pro Zeichen – wir haben es nur nicht genutzt!

**Protokoll:** Jedes Zeichen wird gesendet als`[color_low, color_high, ASCII]`

**Änderungen:**

- Farbpuffer:`14 lines × 1 color` →`14 lines × 24 colors`
- `setLine()` Akzeptiert nun ein Array von Segmenten
- `updateDisplay()` verwendet Farben pro Zeichen

### MQTT-Ebene

Der Client erkennt automatisch, welchen Modus Sie verwenden:

**Einfacher Modus (abwärtskompatibel):**

```json
{
  "lineNumber": 1,
  "text": "HELLO WORLD         ",
  "color": "green"
}
```

**Segmentmodus (neu):**

```json
{
  "lineNumber": 1,
  "segments": [
    {"text": "HELLO ", "color": "white"},
    {"text": "WORLD", "color": "green"}
  ]
}
```

---

## Anwendungsfälle für Smart Homes

### 1. Klimatisierung

```bash
# Living room: comfortable (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Living Room: ","color":"white"},
    {"text":"22°C","color":"green"}
  ]
}'

# Bedroom: too hot (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"Bedroom: ","color":"white"},
    {"text":"32°C","color":"red"}
  ]
}'

# Kitchen: too cold (cyan)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":3,
  "segments":[
    {"text":"Kitchen: ","color":"white"},
    {"text":"18°C","color":"cyan"}
  ]
}'
```

### 2. Statusindikatoren

```bash
# Door open warning
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Front Door: ","color":"white"},
    {"text":"OPEN","color":"red"}
  ]
}'

# Security armed
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"Security: ","color":"white"},
    {"text":"ARMED","color":"amber"}
  ]
}'

# Lights on
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":3,
  "segments":[
    {"text":"Lights: ","color":"white"},
    {"text":"ON","color":"green"}
  ]
}'
```

### 3. Energiemonitoring

```bash
# Normal consumption (green)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Power: ","color":"white"},
    {"text":"2.3kW","color":"green"}
  ]
}'

# High consumption warning (red)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"Power: ","color":"white"},
    {"text":"5.8kW","color":"red"}
  ]
}'
```

### 4. Flugzeugstil (wie bei einem echten MCDU)

```bash
# Runway display
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Take off Rwy ","color":"white"},
    {"text":"08L","color":"green"}
  ]
}'

# Flight level
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":2,
  "segments":[
    {"text":"FL","color":"white"},
    {"text":"350","color":"green"}
  ]
}'
```

---

## Beispiel für ein vollständiges Smart-Home-Dashboard

```bash
# Line 1: Header
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":1,"text":"SMART HOME STATUS    ","color":"white"}'

# Line 2: Empty
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/clear -m '{}'

# Line 3: Climate (living room comfortable)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":3,"segments":[{"text":"Living Room: ","color":"white"},{"text":"22°C","color":"green"}]}'

# Line 4: Climate (bedroom hot)
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":4,"segments":[{"text":"Bedroom: ","color":"white"},{"text":"32°C","color":"red"}]}'

# Line 5: Empty

# Line 6: Security armed
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":6,"segments":[{"text":"Security: ","color":"white"},{"text":"ARMED","color":"amber"}]}'

# Line 7: Door status
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":7,"segments":[{"text":"Front Door: ","color":"white"},{"text":"LOCKED","color":"green"}]}'

# Line 8: Empty

# Line 9: Power consumption
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{"lineNumber":9,"segments":[{"text":"Power: ","color":"white"},{"text":"2.3kW","color":"green"}]}'
```

---

## Verfügbare Farben

Verwenden Sie diese Farbbezeichnungen in Ihren Segmenten:

- `white` - Beschriftungen, normaler Text
- `amber` - Navigation, Überschriften, Warnungen
- `cyan` - Information, kalte Temperaturen
- `green` - Erfolg, aktiv, komfortabel
- `magenta` - Sonderstaaten
- `red` - Warnungen, Fehler, hohe Werte
- `yellow` - Vorsichtsmaßnahmen
- `grey` /`gray` - Inaktiv, deaktiviert

---

## Bewährte Verfahren zur Farbcodierung

### Temperaturanzeige

- **Grün** (18–24 °C) – Komfortbereich
- **Cyan** (<18°C) – Zu kalt
- **Bernstein** (25–28 °C) – Es wird warm
- **Rot** (>28 °C) – Zu heiß

### Statusanzeigen

- **Grün** – OK, Aktiv, Ein, Gesperrt
- **Amber** – Warnung, bewaffnet, bereit
- **Rot** – Fehler, Warnung, Offen (wann sollte es geschlossen werden)
- **Weiß** – Etiketten, neutrale Zustände

### Energie/Leistung

- **Grün** – Normaler Verbrauch
- **Bernstein** – Überdurchschnittlich
- **Rot** – Hoher Verbrauch / Spitzenwert

### Allgemeines Muster

```
<Label in white>: <Value in color-coded state>
```

Beispiel:`"Bedroom: "` (weiß) +`"32°C"` (Rot)

---

## Technische Details

### Zeichenbegrenzung

Jede Zeile umfasst insgesamt 24 Zeichen. Die Segmente werden verkettet und dann:

- Bei weniger als 24 Zeichen → Mit Leerzeichen auffüllen
- Wenn die Gesamtzahl > 24 Zeichen beträgt → Auf 24 Zeichen gekürzt

### Farbkodierung

- Das Protokoll verwendet 2-Byte-Farbcodes
- Der Treiber ordnet Farbnamen automatisch Codes zu.
- Präzision pro Zeichen (jedes der 24 Zeichen kann eine andere Farbe haben)

### Leistung

- Gleiche Leistung wie zuvor (die Farben pro Zeichen waren bereits im Protokoll enthalten).
- Keine zusätzlichen Gemeinkosten
- Rückwärtskompatibel (einfacher Modus funktioniert weiterhin)

---

## Bereitstellung auf Pi

Anweisungen zur Installation auf dem Raspberry Pi finden Sie in der [README-Datei des mcdu-Clients](/#/docs/adapterref/iobroker.mcdu/mcdu-client/README.md) und in [der Datei PI-SETUP.md](https://github.com/Flixhummel/ioBroker.mcdu/blob/main/mcdu-client/PI-SETUP.md) .

**Testen Sie Mehrfarbendarstellung von Ihrem Mac aus:**

```bash
mosquitto_pub -h YOUR_BROKER_IP -p 1883 -u iobroker -P [password] -t mcdu/display/line -m '{
  "lineNumber":1,
  "segments":[
    {"text":"Living Room: ","color":"white"},
    {"text":"22°C","color":"green"}
  ]
}'
```

Auf dem MCDU-Display sollten Sie „Wohnzimmer:“ in Weiß und „22°C“ in Grün sehen!

---

## Rückwärtskompatibilität

**Alte Befehle funktionieren weiterhin!** Keine grundlegenden Änderungen.

```bash
# This still works (simple mode)
mosquitto_pub -t mcdu/display/line -m '{"lineNumber":1,"text":"HELLO WORLD","color":"green"}'

# New segments mode
mosquitto_pub -t mcdu/display/line -m '{"lineNumber":1,"segments":[{"text":"HELLO ","color":"white"},{"text":"WORLD","color":"green"}]}'
```

---

## Wie geht es weiter?

Diese Funktion ermöglicht deutlich umfangreichere Smart-Home-Displays:

- Farbcodierte Temperaturzonen
- Status-Dashboards mit Farbindikatoren
- Energieüberwachung mit Schwellenwerten
- Sicherheitsstatus auf einen Blick
- Navigationsanzeigen im Luftfahrtstil

Der ioBroker-Adapter nutzt diese Funktion für vorlagenbasierte Seiten mit zeilenweiser Farbsteuerung über`colLabel` Und`colData` Felder.

---

**Umsetzungszeit:** 30 Minuten\
&#x20;**Status:** ✅ Abgeschlossen und getestet\
&#x20;**Begehen:**`0fa8cf0`

---

**EOF**