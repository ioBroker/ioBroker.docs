---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md
title: Seitenkonfigurationsleitfaden
hash: zISc3A0bK3OM9W+rhq5hkNIFqgAKAleV3JKOV6pL3mE=
---
# Seitenkonfigurationsleitfaden

## Überblick

Der MCDU-Adapter stellt Seiten auf dem WinWing MCDU-Hardwaredisplay dar. Jede Seite umfasst bis zu 13 Inhaltszeilen (Zeile 14 dient als Notizblock). Die Konfiguration erfolgt gerätespezifisch über die Administrator-Benutzeroberfläche.

## Admin-Oberfläche

Navigieren Sie zu: **Instanzen > mcdu.0 > Konfigurieren**

Die Konfiguration ist in 4 Registerkarten unterteilt:

- **Allgemeine Einstellungen** – MQTT-Broker, Leistung
- **Gerät & Seiten** – Gerät auswählen, Standardfarbe, Helligkeit, Schrittweite, Seiten laden/speichern, Zeilen bearbeiten
- **Funktionstasten** — Konfigurieren Sie 11 Funktionstasten (MENÜ, DIR, INIT usw.).
- **Erweitert & Info** – Debug-Protokollierung, Versionsinformationen

## Anzeigelayout

```
Row  1: ┌────────────────────────┐  Status bar (breadcrumb + time)
Row  2: │  sub-label (colLabel)  │  Sub-label for row 3
Row  3: │ LEFT CONTENT  RIGHT    │  LSK1 line (left/right buttons)
Row  4: │  sub-label (colLabel)  │  Sub-label for row 5
Row  5: │ LEFT CONTENT  RIGHT    │  LSK2 line
Row  6: │  sub-label (colLabel)  │  Sub-label for row 7
Row  7: │ LEFT CONTENT  RIGHT    │  LSK3 line
Row  8: │  sub-label (colLabel)  │  Sub-label for row 9
Row  9: │ LEFT CONTENT  RIGHT    │  LSK4 line
Row 10: │  sub-label (colLabel)  │  Sub-label for row 11
Row 11: │ LEFT CONTENT  RIGHT    │  LSK5 line
Row 12: │  sub-label (colLabel)  │  Sub-label for row 13
Row 13: │ LEFT CONTENT  RIGHT    │  LSK6 line / status bar
Row 14: └────────────────────────┘  Scratchpad (user input)
```

- **Ungerade Zeilen** (3, 5, 7, 9, 11, 13): Hauptinhaltszeilen, jeweils mit linken/rechten LSK-Tasten
- **Gerade Zeilen** (2, 4, 6, 8, 10, 12): Unterbeschriftungen (Farbe von`colLabel` Standardmäßig wird das Gerät verwendet`defaultColor` )
- **Zeile 1** : Statusleiste mit Breadcrumb-Navigation und Zeitangabe
- **Zeile 14** : Notizblock für Tastatureingaben
- Jede Zeile ist **24 Zeichen breit** und in einen linken (Zeichen 1-12) und einen rechten Teil (Zeichen 13-24) unterteilt.

## Liniendatenmodell (Links/Rechts)

Jede Linie hat zwei Seiten —`left` Und`right` Jede Seite hat:

| Feld      | Zweck                                                                            |
| --------- | -------------------------------------------------------------------------------- |
| `label`   | Unterbeschriftungstext (in der geraden Zeile oben angezeigt, in`colLabel` Farbe) |
| `display` | Was soll auf dieser Seite angezeigt werden (Beschriftung, Datenpunkt oder leer)? |
| `button`  | Was passiert, wenn LSK gedrückt wird (Navigation, Datenpunkt oder leer)?         |

### Anzeigetypen

**Beschriftung** — statischer Text:

```json
{ "type": "label", "text": "WOHNZIMMER", "colLabel": "cyan", "colData": "white" }
```

- `colLabel` : Farbe für die Unterbeschriftung in der geraden Zeile darüber (Standardwert: Gerät)`defaultColor` )
- `colData` : Farbe für den Datentext in der ungeraden Zeile (Standardwert: Gerät)`defaultColor` )

**Datenpunkt** – Live-Wert von ioBroker:

```json
{ "type": "datapoint", "source": "hm-rpc.0.ABC123.TEMPERATURE", "format": "%.1f", "unit": "C", "colLabel": "cyan", "colData": "green" }
```

- `source` : ioBroker-Status-ID
- `format` : sprintf-Format (automatisch erkannt:`%.1f` für Zahlen,`%s` (für Zeichenketten)
- `unit` : Anzeigeeinheit (automatisch aus den Metadaten des ioBroker-Objekts erkannt)
- `colLabel` : Unterlabelfarbe (Standardwert: Gerät)`defaultColor` )
- `colData` : Datenwertfarbe (Standardwert: Gerät)`defaultColor` )

**Leer** – kein Inhalt:

```json
{ "type": "empty" }
```

### Tastentypen

**Navigation** – zu einer anderen Seite wechseln:

```json
{ "type": "navigation", "action": "goto", "target": "klima-page" }
```

**Datapoint** – ioBroker-Status umschalten/erhöhen/verringern:

```json
{ "type": "datapoint", "action": "toggle", "target": "hm-rpc.0.ABC123.STATE" }
```

**Leer** – keine Tastenfunktion:

```json
{ "type": "empty" }
```

## LSK-Interaktion mit Datenpunkten

Wenn Sie eine LSK-Taste in einer Zeile drücken, die einen Datenpunkt anzeigt (und für die keine explizite Taste konfiguriert ist), verwendet der Adapter **die Metadaten des ioBroker-Objekts,** um das weitere Vorgehen zu bestimmen. Keine manuelle Anleitung erforderlich.`editable` Flagge erforderlich – der Adapter liest`obj.common.write` ,`obj.common.type` ,`obj.common.min` ,`obj.common.max` automatisch.

### Entscheidungsbaum

```
LSK pressed on datapoint line:

  1. Is the datapoint writable? (obj.common.write)
     NO  → Nothing happens (read-only sensor, e.g. temperature reading)
     YES → Continue...

  2. Is it a boolean? (obj.common.type === 'boolean')
     YES → Toggle immediately: true↔false
           No scratchpad needed. Display updates instantly.

  3. Is it a number or string?
     YES → Check scratchpad:
           EMPTY    → Nothing happens (type something first)
           HAS TEXT → Validate and write (see below)
```

### Werte aus dem Scratchpad schreiben

So schreiben Sie einen Wert in einen beschreibbaren Zahlen- oder Zeichenketten-Datenpunkt:

1. **Geben Sie den Wert** über die Tastatur ein (erscheint im Notizblock in Zeile 14, z. B.`22.5*` )
2. **Drücken Sie LSK** neben der Zieldatenpunktlinie
3. Der Adapter validiert und schreibt:

| Situation                                 | Ergebnis                                                       |
| ----------------------------------------- | -------------------------------------------------------------- |
| Gültige Zahl innerhalb des Bereichs       | Wert eingetragen, Notizblock gelöscht, „GESPEICHERT“ angezeigt |
| Nicht-numerischer Text für das Zahlenfeld | `FORMAT ERROR` im Notizblock angezeigt                         |
| Zahl außerhalb des Min-/Max-Bereichs      | `ENTRY OUT OF RANGE` im Notizblock angezeigt                   |
| Zeichenkettenwert                         | So geschrieben, wie es ist, Notizblock gelöscht                |

### Fehlerbehandlung (Airbus-Muster)

Die Fehler entsprechen der tatsächlichen Airbus MCDU-Konvention:

- **Fehler erscheinen im Notizblock** (Zeile 14) in weißer Schrift – nicht in einer separaten Zeile.
- **Keine automatische Zeitüberschreitung** – der Fehler bleibt bestehen, bis Sie CLR drücken.
- **CLR once** → stellt Ihre abgelehnte Eingabe wieder her (sodass Sie sie bearbeiten und es erneut versuchen können).
- **Zweimaliges Drücken von CLR** → löscht den Notizblock vollständig

**Beispielhafter Ablauf:**

```
1. Type "999" into scratchpad        → Scratchpad: "999*"
2. Press LSK on temperature (max 30) → Scratchpad: "ENTRY OUT OF RANGE"
3. Press CLR                          → Scratchpad: "999*"  (restored!)
4. Clear and type "22.5"             → Scratchpad: "22.5*"
5. Press LSK again                    → Value written, "GESPEICHERT"
```

### Beispiel für einen booleschen Schalter

```
Line 5 shows: "LICHT KUECHE    AN"  (source: hm-rpc.0.ABC.STATE, boolean, writable)

1. Press LSK5L → value toggles to false
2. Display updates: "LICHT KUECHE   AUS"
3. Press LSK5L again → value toggles to true
```

Kein Notizblock für boolesche Werte – es handelt sich um einen direkten Umschalter.

## Navigation

### Breadcrumb-Navigation (Statusleiste)

Zeile 1 zeigt den Navigationspfad:`HOME > KLIMA > WOHNZIMMER 14:30`

Satz`parent` auf Seiten, um die Navigationshierarchie aufzubauen.

### CLR-Taste

- **Scratchpad enthält Inhalt** → löscht Scratchpad (oder stellt es nach einem Fehler wieder her)
- **Notizblock leer** → navigiert zur übergeordneten Seite
- **Doppelklicken** (innerhalb von 1 Sekunde) → Notausgang zur Startseite

### SLEW-Tasten (Pfeiltasten links/rechts)

Zirkuläre Navigation über Geschwisterseiten (Seiten mit demselben übergeordneten Element).

### Funktionstasten

11 konfigurierbare Funktionstasten (MENÜ, INIT, DIR, FPLN, PERF, PROG, SEC, ATC, AIRPORT, DATA, RAD NAV). Jede kann wie folgt belegt werden:

- `navigateHome` — zur Startseite
- `navigateTo` — zu einer bestimmten Seite wechseln
- Behinderter – keine Maßnahmen

VORHERIGE SEITE / NÄCHSTE SEITE: Seitennavigation (integriert, nicht konfigurierbar).

## Farben

Verfügbare Displayfarben:`white` ,`green` ,`cyan` ,`blue` ,`amber` ,`red` ,`magenta` ,`yellow` ,`grey`

Notiz:`blue` Und`cyan` Das Rendering ist auf WinWing-Hardware identisch.

### Farbfelder

Jede Anzeigekonfiguration verfügt über zwei unabhängige Farbfelder:

| Feld       | Bedienelemente                      | Standard             |
| ---------- | ----------------------------------- | -------------------- |
| `colLabel` | Unterbeschriftung in geraden Zeilen | Gerät `defaultColor` |
| `colData`  | Daten-/Werttext in ungeraden Zeilen | Gerät`defaultColor`  |

Die alte Single`color` Das Feld wird nicht mehr unterstützt. Konfigurationen, die dieses Feld verwenden, werden nicht mehr unterstützt.`color` muss aktualisiert werden, um verwendet werden zu können`colLabel` /`colData` Die

### Seitenfarben

| Feld            | Bedienelemente                           | Standard            |
| --------------- | ---------------------------------------- | ------------------- |
| `pageNameColor` | Seitenname in der Statusleiste (Zeile 1) | Gerät`defaultColor` |

### Standardfarbe des Geräts

Der`defaultColor` Die Konfiguration erfolgt gerätespezifisch im Geräte-Tab der Admin-Benutzeroberfläche. Sie dient als Fallback für alle Farbfelder, die nicht explizit festgelegt sind. Außerdem wird sie als beschreibbarer Gerätestatus angezeigt unter`devices.{deviceId}.config.defaultColor` Die

## Seitenbeispiel (Aktuelles Format)

```json
{
  "id": "klima-wohnzimmer",
  "name": "Wohnzimmer",
  "parent": "klima-main",
  "layoutType": "data",
  "pageNameColor": "cyan",
  "lines": [
    {
      "row": 3,
      "left": {
        "label": "IST-TEMPERATUR",
        "display": { "type": "datapoint", "source": "hm-rpc.0.T1.TEMPERATURE", "colLabel": "cyan", "colData": "green" },
        "button": { "type": "empty" }
      },
      "right": {
        "label": "SOLLWERT",
        "display": { "type": "datapoint", "source": "hm-rpc.0.T1.SET_TEMPERATURE", "colLabel": "cyan", "colData": "amber" },
        "button": { "type": "empty" }
      }
    },
    {
      "row": 5,
      "left": {
        "label": "LUFTFEUCHTE",
        "display": { "type": "datapoint", "source": "hm-rpc.0.H1.HUMIDITY", "colLabel": "cyan", "colData": "white" },
        "button": { "type": "empty" }
      },
      "right": {
        "label": "",
        "display": { "type": "empty" },
        "button": { "type": "empty" }
      }
    },
    {
      "row": 7,
      "left": {
        "label": "",
        "display": { "type": "label", "text": "LICHT KUECHE" },
        "button": { "type": "empty" }
      },
      "right": {
        "label": "",
        "display": { "type": "datapoint", "source": "hm-rpc.0.L1.STATE" },
        "button": { "type": "empty" }
      }
    }
  ]
}
```

In diesem Beispiel:

- Zeile 3 von links: zeigt die aktuelle Temperatur an (nur lesbarer Sensor → LSK hat keine Funktion)
- Zeile 3 rechts: zeigt den Sollwert an (beschreibbare Zahl → Wert in den Notizblock eingeben, LSK drücken zum Schreiben)
- Zeile 7 rechts: zeigt den Lichtstatus an (beschreibbarer boolescher Wert → LSK drücken zum Umschalten)

Format und Einheit werden automatisch aus den Metadaten des ioBroker-Objekts erkannt. Sie müssen lediglich Folgendes einstellen:`source` Die

## Testdaten

Verwenden Sie die Schaltfläche „Beispieldaten erstellen“ in der Admin-Benutzeroberfläche (Registerkarte „Erweitert“), um Testzustände zu erstellen unter`0_userdata.0.mcdu_test` Dadurch entsteht:

| Zustand               | Typ             | Beschreibbar | Min./Max. |
| --------------------- | --------------- | ------------ | --------- |
| `temperature_living`  | Nummer          | NEIN         | —         |
| `light_kitchen`       | boolescher Wert | Ja           | —         |
| `light_living_dimmer` | Nummer          | Ja           | 0-100     |
| `setpoint_living`     | Nummer          | Ja           | 5-30      |
| `setpoint_bedroom`    | Nummer          | Ja           | 5-30      |
| `text_status`         | Zeichenkette    | Ja           | —         |
| `window_bedroom`      | boolescher Wert | NEIN         | —         |

Verwenden Sie diese, um LSK-Interaktionen zu testen:

- LSK auf`light_kitchen` → schaltet boolesche Werte um
- Typ "22" + LSK an`setpoint_living` → schreibt 22,0
- Geben Sie "999" + LSK ein`setpoint_living` → "EINTRITT AUSSERHALB DES BEREICHS"
- LSK auf`temperature_living` → nichts (schreibgeschützt)

## BRT/DIM Helligkeitssteuerung

Die BRT- und DIM-Tasten am MCDU regeln die Displayhelligkeit:

- **BRT** erhöht sowohl BACKLIGHT als auch SCREEN\_BACKLIGHT um den konfigurierten Schritt.
- **DIM** verringert sowohl BACKLIGHT als auch SCREEN\_BACKLIGHT um den konfigurierten Schritt.
- Die Werte sind auf den Bereich von 0 bis 255 begrenzt.
- Die Schrittweite ist pro Gerät konfigurierbar über`display.brightnessStep` (Standardwert: 20)
- Der Schritt kann in der Admin-Benutzeroberfläche (Registerkarte „Gerät“) oder über den beschreibbaren Status geändert werden.`devices.{deviceId}.display.brightnessStep`

## Tipps

1. **Fangen Sie einfach an** – beginnen Sie mit Beschriftungsseiten und fügen Sie dann Datenpunkte hinzu.
2. **Übergeordnete Navigation verwenden** – festlegen`parent` für automatische Breadcrumb-Navigation und CLR-Back
3. **Nur ungerade Zeilen** – verwenden Sie die Zeilen 3, 5, 7, 9, 11 für den Hauptinhalt (gerade Zeilen sind Unterüberschriften).
4. **Nur ASCII** – das Hardware-Display kann Umlaute und Sonderzeichen nicht darstellen. Verwenden Sie „KUECHE“ statt „Kuche“ und „ZURUECK“ statt „Zuruck“. Der Adapter bereinigt die Zeichen zwar automatisch, aber die Verwendung von ASCII in Ihrer Konfiguration ist sauberer.
5. **NEIN`editable` Flag erforderlich** – der Adapter liest die Schreibbarkeit automatisch aus den Metadaten des ioBroker-Objekts.
6. **Automatische Format-/Einheitenerkennung** – falls nicht angegeben`format` oder`unit` Sie werden aus dem ioBroker-Objekt gelesen.