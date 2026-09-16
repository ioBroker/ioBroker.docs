---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/research/RESEARCH.md
title: MCDU Smart Home Controller - Forschungsergebnisse
hash: q8K11DHoXUjpzVF60E/Sw/aOpNs7e9w/Dqv/EyzQhds=
---
# MCDU Smart Home Controller – Forschungsergebnisse

**Forschungsdatum:** 14.02.2026\
&#x20;**Forscher:** Unteragent (mcdu-research)\
&#x20;**Projekt:** WinWing MCDU als ioBroker Smart Home Controller umfunktionieren

---

## Zusammenfassung

Dieses Dokument fasst die Forschungsergebnisse des Reverse-Engineering-Projekts zur WinWing MCDU und die Integrationsmöglichkeiten von ioBroker zusammen. Die WinWing MCDU ist eine voll funktionsfähige Flugsteuerungseinheit mit USB-Kommunikation, integriertem Display, über 60 physischen Tasten und steuerbaren LEDs. Die bisherigen Reverse-Engineering-Arbeiten bilden eine solide Grundlage für die Implementierung des USB-Protokolls. ioBroker bietet verschiedene Integrationswege (REST-API, WebSocket, benutzerdefinierter Adapter), die sich für diesen Anwendungsfall eignen.

**Wichtigste Erkenntnis:** Dieses Projekt ist **technisch realisierbar** und weist eine überschaubare Komplexität auf. Das Hardwareprotokoll ist gut dokumentiert, und ioBroker bietet flexible Integrationsmöglichkeiten.

---

## Teil 1: WinWing MCDU-Hardware & Protokoll

### 1.1 Hardwareübersicht

**Gerät:** WinWing MCDU-32 (Multifunktions-Steuer- und Anzeigeeinheit)\
&#x20;**Produktlink:** <https://ea.winctrl.com/view/goods-details.html?id=945>\
&#x20;**Schnittstelle:** USB HID (Human Interface Device)

**USB-Kennungen:**

- Händler-ID:`0x4098`
- Produkt-IDs (konfigurierbar über SimAppPro):
  - `0xbb36` - MCDU-32-CAPTAIN
  - `0xbb3a` - MCDU-32-OBSERVER
  - `0xbb3e` - MCDU-32-CO-PILOT

### 1.2 Eingabemöglichkeiten

**Gesamtzahl der Tasten:** Mehr als 60 physische Tasten, die HID-Berichten zugeordnet sind

**Schaltflächenkategorien:**

1. **Zeilenauswahltasten (LSK):** Insgesamt 12 Tasten
   - L1, L2, L3, L4, L5, L6 (linke Seite)
   - R1, R2, R3, R4, R5, R6 (rechte Seite)

2. **Funktionstasten:** 10 Tasten
   - DIR, PROG, PERF, INIT
   - DATA, F-PLN, RAD NAV, FUEL PRED, SEC F-PLN, ATC COMM
   - MCDU-MENÜ, FLUGHAFEN
   - BRT (Helligkeit), DIM

3. **Navigation:** 4 Pfeiltasten (oben, unten, links, rechts)

4. **Alphanumerische Tastatur:**
   - Zahlen: 0-9
   - Briefe: AZ
   - Sonderzeichen: Punkt (.), +/-, /, SP (Leerzeichen)

5. **Steuerungstasten:**
   - OVFY (Überflug)
   - CLR (Klar)

**Tastensignalprotokoll:**

Die Schaltflächen werden gelesen über`hid.read()` Es werden 25-Byte-Arrays zurückgegeben.

- **Byte 1:** Immer`0x01` (Berichts-ID)
- **Bytes 2-11:** Bitmap des Tastenstatus (jedes Bit repräsentiert eine Taste)
- **Bytes 18-25:** Daten des Lichtsensors (Umgebungslichterkennung)

**Beispielhafte Tastenbelegung (Byte 2):**

```
0x01: L1
0x02: L2
0x04: L3
0x08: L4
0x10: L5
0x20: L6
0x40: R1
0x80: R2
```

Die vollständige Tastenbelegung ist in den Bytes 2-11 dokumentiert (die vollständige Tabelle finden Sie im GitHub-Repository).

### 1.3 Anzeigefunktionen

**Anzeigetyp:** Eingebauter LCD-Bildschirm\
&#x20;**Auflösung:** Nicht explizit dokumentiert (scheint zeichenbasiert zu sein, ähnlich wie bei realen MCDU-Displays)\
&#x20;**Farbunterstützung:** Mehrere Farben, die über Farbpalettendefinitionen konfiguriert werden können.

**Anzeigesteuerungsprotokoll:**

**1. Initialisierungsblock (Erster Block)**

Die Daten müssen einmal gesendet werden, um Farbpalette und Anzeigemodi festzulegen. Es handelt sich um eine umfangreiche Mehrpaketübertragung, die auf mehrere USB-Schreibvorgänge (ca. 17 aufeinanderfolgende) verteilt ist.`device.write()` Befehle).

**Farbdefinitionen (RGBA-Format):**

- Hintergrundfarbe:`0x20, 0x20, 0x20, 0xff` (dunkelgrau)
- Textfarben, die den Indizes (0x00-0x19) zugeordnet sind:
  - Weiß:`0xff, 0xff, 0xff, 0xff`
  - Gelb:`0xff, 0xff, 0x00, 0xff`
  - Grün:`0x00, 0xff, 0x00, 0xff`
  - Cyan:`0x00, 0xff, 0xff, 0xff`
  - Magenta:`0xff, 0x00, 0xff, 0xff`
  - Bernstein:`0xff, 0x63, 0x00, 0xff`
  - Benutzerdefinierte Farben definierbar

**2. Textdarstellungsblock (Zweiter Block)**

Nach der Initialisierung wird der Text mithilfe von 64-Byte-Paketen gerendert, die mit folgendem beginnen:`0xf2` Die

**Textkodierung:**

- **3 Bytes pro Zeichen:**
  - Byte 1-2: Zeichenattribute (Farbe, Größe) im Little-Endian-Format
  - Byte 3: ASCII-Zeichencode

**Charaktereigenschaften:**

- Basisformat:`0x0042` (normaler weißer Text)
- Hinzufügen`0x016b` auf kleine Schriftart umschalten
- Hinzufügen`0x0021` Farben durchlaufen (wiederholbar)

**Beispiel:** Normales Weiß „A“:`0x42, 0x00, 0x41`

**Sonderzeichen (Mehrbyte-UTF-8):**

- Gradzeichen (°):`c2 b0`
- Pfeil nach oben (↑):`e2 86 91`
- Pfeil nach unten (↓):`e2 86 93`
- Pfeil nach links (←):`e2 86 90`
- Rechtspfeil (→):`e2 86 92`
- Offenes Dreieck (Δ):`ce 94`
- Rechtwinklig geschlossenes Dreieck (▶):`e2 96 b6`
- Links geschlossenes Dreieck (◀):`e2 97 80`
- Offenes Quadrat (☐):`e2 98 90`
- Offene Raute (◊):`e2 ac a1`

**Anzeigelayout:** Der Text beginnt oben links und fließt von links nach rechts und von oben nach unten. Beim Füllen des Bildschirms wird das letzte Textfeld mit Leerzeichen aufgefüllt.`0x00` Bytes, um eine Länge von 64 Bytes zu erreichen.

### 1.4 LED-Anzeigen

**Verfügbare LEDs:** 8 Status-LEDs

**LED-Steuerung:** Befehl:`device.write([0x02, 0x32, 0xbb, 0x00, 0x00, 0x03, 0x49, 0xXX, 0xYY, ...])`

- **Byte 8 (XX):** LED-Auswahl
  - `0x08` : SCHEITERN
  - `0x09` FM (Flugmanagement)
  - `0x0a` : MCDU
  - `0x0b` : SPEISEKARTE
  - `0x0c` FM1
  - `0x0d` : IND (Index)
  - `0x0e` : RDY (Bereit)
  - `0x0f` Status (horizontaler Balken)
  - `0x10` FM2

- **Byte 9 (YY):** LED-Status
  - `0x01` : AN
  - `0x00` : AUS

### 1.5 Helligkeitsregelung

**Tastenbeleuchtung:**

```python
device.write([0x2, 0x32, 0xbb, 0x0, 0x0, 0x3, 0x49, 0x0, 0xcc, 0x0, 0x0, 0x0, 0x0, 0x0])
```

`0xcc` = Helligkeitswert (0-255)

**Display-Hintergrundbeleuchtung:**

```python
device.write([0x02, 0x32, 0xbb, 0x00, 0x00, 0x03, 0x49, 0x01, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00])
```

`0xff`= Helligkeitswert (0-255)

### 1.6 Lichtsensoren

**Sensoren:** 2 Umgebungslichtsensoren (links und rechts)

**Datenposition:** Bytes 18-25 des HID-Lesepuffers

**Wertebereich:** 0 bis \~3.060 (12 \* 255)

**Formel (linker Sensor):**`value = byte19 * 255 + byte18`

**Anwendungsfall:** Automatische Anpassung der Display-/Tastenhelligkeit an das Umgebungslicht

### 1.7 Vorhandene Reverse-Engineering-Arbeiten

**GitHub-Repository:** <https://github.com/alha847/winwing_mcdu>\
&#x20;**Autor:** alha847\
&#x20;**Status:** „Reverse Engineering nahezu abgeschlossen“

**Verfügbare Ressourcen:**

- Python-Beispielskripte verwenden`hid` Bibliothek
- Lua-Skript zur X-Plane-Integration (`lra333_winwing_mcdu_driver.lua` )
- Vollständige USB-Protokolldokumentation (Tasten, Display, LEDs, Helligkeit)
- Testskripte für die Textdarstellung

**Verwendete Entwicklungsumgebung:**

- MacBook M1 Pro
- Python + hidapi Bibliothek
- SimAppPro (WinWing-Konfigurationssoftware) läuft in einer Windows 11 VM

**Wichtigste Erkenntnisse aus dem Repo:**

- Die USB-HID-Kommunikation ist stabil und gut verstanden.
- Das Anzeigeprotokoll ist komplex, aber vollständig dokumentiert.
- Keine proprietäre Verschlüsselung oder Authentifizierung erforderlich
- Funktioniert plattformübergreifend (getestet unter macOS, funktioniert wahrscheinlich auch unter Linux/Windows)

---

## Teil 2: ioBroker-Integrationsoptionen

### 2.1 ioBroker-Übersicht

**Was ist ioBroker?**\
&#x20;ioBroker ist eine Open-Source-IoT-Plattform für die Smart-Home-Automatisierung. Sie nutzt eine modulare Adapterarchitektur zur Integration verschiedener Geräte und Dienste.

**Kernkonzepte:**

1. **Objekte:** Metadaten, die Geräte, Kanäle und Datenpunkte beschreiben
2. **Zustände:** Tatsächliche Werte von Datenpunkten mit Zeitstempeln und Bestätigungsflags
3. **Adapter:** Plugins, die ioBroker mit externen Systemen verbinden
4. **Ereignisse:** Echtzeit-Benachrichtigungen über Zustandsänderungen

**Bestätigungs-Flag (ack):**

- `ack=false` : Befehl (z. B. „Licht anschalten“)
- `ack=true` : Statusbestätigung (z. B. „Licht ist jetzt an“)

### 2.2 Integrationsansatz 1: REST-API (Einfache API)

**Adapter:**`iobroker.simple-api`\
&#x20;**GitHub:** <https://github.com/ioBroker/ioBroker.simple-api>\
&#x20;**Status:** Ausgereift, aber ioBroker empfiehlt die Verwendung`rest-api` stattdessen

**Wichtigste Endpunkte:**

| Endpunkt                 | Verfahren | Beschreibung                                       | Beispiel                                        |
| ------------------------ | --------- | -------------------------------------------------- | ----------------------------------------------- |
| `/get/stateID`           | ERHALTEN  | Lesestatus mit vollständigen Metadaten             | `/get/system.adapter.admin.0.alive`             |
| `/getPlainValue/stateID` | ERHALTEN  | Nur den Statuswert lesen (Text)                    | `/getPlainValue/admin.0.memHeapTotal` → `31.19` |
| `/getBulk/id1,id2,...`   | ERHALTEN  | Mehrere Zustände effizient lesen                   | `/getBulk/temp.living,temp.bedroom`             |
| `/set/stateID?value=X`   | ERHALTEN  | Zustandswert festlegen                             | `/set/lights.living?value=1`                    |
| `/setBulk`               | GET/POST  | Mehrere Zustände festlegen                         | `/setBulk?light1=0&light2=1`                    |
| `/states?pattern=X*`     | ERHALTEN  | Liste alle Staaten auf, die dem Muster entsprechen | `/states?pattern=hm-rpc.0.*`                    |
| `/objects?pattern=X*`    | ERHALTEN  | Liste alle Objekte auf, die dem Muster entsprechen | `/objects?pattern=system.adapter.*`             |

**Authentifizierung:**

- URL-Parameter:`?user=admin&pass=secret`
- HTTP-Basisauthentifizierung
- OAuth2 Bearer-Tokens

**Antwortformate:**

- JSON (Standard)
- Klartext (für`getPlainValue` )
- Hinzufügen`?prettyPrint` für menschenlesbares JSON

**Vorteile:**

- ✅ Einfache HTTP-Anfragen (keine Clientbibliothek erforderlich)
- ✅ Funktioniert mit jeder Programmiersprache (Python, Node.js, Bash)
- ✅ Gut geeignet für Umfragen und gelegentliches Schreiben
- ✅ Gut dokumentiert

**Nachteile:**

- ❌ Keine Echtzeit-Statusaktualisierungen (erfordert Abfrage)
- ❌ Ineffizient für schnelles Drücken von Tasten → Zustandsänderungsschleifen
- ❌ Höhere Latenz als bei WebSocket

**Anwendungsfall für MCDU:**

- Erster Prototyp für schreibgeschützte Dashboards
- Der ioBroker-Status wird alle 1-2 Sekunden abgefragt, um die MCDU-Anzeige zu aktualisieren.

### 2.3 Integrationsansatz 2: WebSocket (socket.io)

**Adapter:**`iobroker.socketio`\
&#x20;**GitHub:** <https://github.com/ioBroker/ioBroker.socketio>\
&#x20;**Wichtig:** Seit Version 4.0 werden **reine WebSockets** verwendet (nicht die socket.io-Bibliothek).

**Clientbibliothek:** [@iobroker/socket-client](https://github.com/ioBroker/socket-client)

**Unterstützte Methoden (dokumentiert in @iobroker/socket-classes):**

**Staatliche Operationen:**

- `getState(id)` - Einzelnen Zustand lesen
- `getStates(pattern)` - Mehrere Staaten lesen
- `setState(id, state)` - Schreibzustand
- `subscribe(pattern)` - Abonnieren Sie die Statusänderungen
- `unsubscribe(pattern)` - Abbestellen

**Objektoperationen:**

- `getObject(id)` - Objektmetadaten lesen
- `getObjects()` - Alle Objekte lesen
- `setObject(id, obj)` - Objekt erstellen/aktualisieren

**Dateivorgänge:**

- `readFile(adapter, filename)`
- `writeFile(adapter, filename, data)`

**Veranstaltungsabonnements:**

- `on('stateChange', callback)` - Achten Sie auf aktuelle Informationen aus dem Bundesstaat.
- `on('objectChange', callback)` - Auf Objektaktualisierungen achten

**Vorteile:**

- ✅ **Echtzeit-Updates** über WebSocket-Abonnements
- ✅ Bidirektionale Kommunikation
- ✅ Geringere Latenz als REST
- ✅ Effizient für häufige Aktualisierungen (Tastendrücke → sofortige Zustandsänderungen)
- ✅ Offizielle Kundenbibliothek verfügbar

**Nachteile:**

- ❌ Komplexer als eine REST-API
- ❌ Erfordert eine dauerhafte Verbindung
- ❌ Logik zur WebSocket-Wiederverbindung erforderlich

**Anwendungsfall für MCDU:**

- **Ideal für den Produktionseinsatz**
- Abonnieren Sie Statusänderungen Ihres Smart Homes → sofortige Aktualisierungen der MCDU-Anzeige
- Tastendrücke → WebSocket-Befehle → Gerätesteuerung
- Beispiel: Abonnieren`washing_machine.status` → MCDU-Anzeige nach Abschluss des Zyklus aktualisieren

### 2.4 Integrationsansatz 3: Benutzerdefinierter ioBroker-Adapter

**Was ist ein Adapter?**\
&#x20;Ein natives ioBroker-Plugin, geschrieben in JavaScript/TypeScript, das als verwalteter Prozess innerhalb von ioBroker ausgeführt wird.

**Adaptervorlage:** [@iobroker/create-adapter](https://github.com/ioBroker/create-adapter)\
&#x20;**Beispiel-Repository:** <https://github.com/ioBroker/ioBroker.example>

**Adapterfunktionen:**

- Direkter Zugriff auf die internen Status-/Objektdatenbanken von ioBroker
- Automatisches Lebenszyklusmanagement (Start/Stopp/Neustart)
- Admin-Benutzeroberfläche zur Konfiguration
- Integrierte Protokollierung und Fehlerbehandlung
- Im ioBroker-Namespace können benutzerdefinierte Objekte/Zustände erstellt werden.

**Adapter-Entwicklungsstack:**

- **Sprache:** JavaScript oder TypeScript
- **Test:** Mokka, Chai, Sinon
- **Codequalität:** ESLint
- **Paketmanager:** npm

**Typischer Adapteraufbau:**

```
iobroker.mcdu-controller/
├── admin/              # Web UI for adapter configuration
│   ├── index_m.html
│   └── custom.css
├── lib/                # Core logic
│   └── mcdu.js         # USB communication layer
├── main.js             # Adapter entry point
├── io-package.json     # Adapter metadata
└── package.json        # npm dependencies
```

**Adapter-Lebenszyklus-Haken:**

- `onReady()` - Wird aufgerufen, wenn der Adapter startet
- `onStateChange(id, state)` - Wird aufgerufen, wenn sich der Abonnementstatus ändert
- `onMessage(obj)` - Erforderliche Nachrichten zwischen Adaptern
- `onUnload(callback)` - Wird aufgerufen, bevor der Adapter stoppt

**Vorteile:**

- ✅ **Native ioBroker-Integration** (wird in der Admin-Benutzeroberfläche angezeigt)
- ✅ Direkter Datenbankzugriff (höchste Leistung)
- ✅ Kann benutzerdefinierte Objekte erstellen (z. B.`mcdu.0.button.L1` ,`mcdu.0.display.line1` )
- ✅ Automatischer Neustart nach einem Absturz
- ✅ Integrierte Statusabonnementmechanismen
- ✅ Am einfachsten für andere Benutzer zu installieren (über die ioBroker-Administration)

**Nachteile:**

- ❌ Erfordert Node.js (Python kann nicht verwendet werden)
- ❌ Komplexere Ersteinrichtung
- ❌ Die Richtlinien des ioBroker-Adapters müssen befolgt werden.
- ❌ USB-Zugriff von Node.js (erforderlich)`node-hid` oder`usb` Bibliothek)

**Anwendungsfall für MCDU:**

- **Am besten geeignet für die öffentliche Freigabe** (freisetzbarer Adapter)
- MCDU wird in ioBroker als Gerät mit eigenen Zuständen angezeigt.
- Benutzer konfigurieren Seiten über die Admin-Oberfläche.
- Beispielstaaten:
  - `mcdu.0.button.L1` - Linke Taste 1 gedrückt
  - `mcdu.0.display.text` - Aktueller Anzeigeinhalt
  - `mcdu.0.led.FAIL` - Zustand der Fehler-LED steuern

### 2.5 Empfohlener Integrationsansatz

**Für die Prototypenerstellung (Phase 1-2):**

- **Externes Python-Skript + REST-API**
  - Schnelle Iteration
  - Nutzen Sie die vorhandenen Python-HID-Beispiele aus dem WinWing-Repository.
  - Einfache HTTP-Anfragen zum Lesen/Schreiben von ioBroker-Zuständen

**Für die Produktion (Phase 3-5):**

- **Externer Node.js-Dienst + WebSocket**
  - Echtzeit-Statusaktualisierungen
  - Professionelle Lösung
  - Einfacher zu warten als ein kundenspezifischer Adapter

**Zur Veröffentlichung (optional):**

- **Benutzerdefinierter ioBroker-Adapter**
  - Node.js-Dienst als ioBroker-Adapter neu verpacken.
  - Bietet ein benutzerfreundliches Installationserlebnis
  - Integriert sich in die ioBroker-Admin-Benutzeroberfläche.

---

## Teil 3: ioBroker-Zustands- und Objektmuster

### 3.1 Smart-Home-Zustände lesen

**Beispiel: Alle Lichter abfragen**

```bash
# REST API
GET http://iobroker-host:8087/states?pattern=hm-rpc.0.*.STATE&prettyPrint

# Returns:
{
  "hm-rpc.0.living_room.light.STATE": { "val": true, "ts": 1234567890 },
  "hm-rpc.0.bedroom.light.STATE": { "val": false, "ts": 1234567891 }
}
```

**Beispiel: Einzelnen Sensor auslesen**

```bash
# REST API
GET http://iobroker-host:8087/getPlainValue/weather.0.current.temperature

# Returns:
22.5
```

**Beispiel: Abonnieren von Zustandsänderungen (WebSocket)**

```javascript
// Node.js with @iobroker/socket-client
const socket = new SocketClient('http://iobroker-host:8082');

await socket.connect();
await socket.subscribe('washing_machine.0.status');

socket.on('stateChange', (id, state) => {
  console.log(`${id} changed to ${state.val}`);
  // Update MCDU display
});
```

### 3.2 Schreiben von Steuerbefehlen

**Beispiel: Licht ein-/ausschalten**

```bash
# REST API
GET http://iobroker-host:8087/set/lights.living.STATE?value=1&ack=false

# Returns:
{"id": "lights.living.STATE", "value": 1}
```

**Beispiel: Solltemperatur**

```bash
# REST API
GET http://iobroker-host:8087/set/heating.bedroom.target?value=21.5&type=number
```

**Beispiel: Massenschreiben**

```bash
# REST API
POST http://iobroker-host:8087/setBulk
Content-Type: text/plain

lights.living=1&lights.bedroom=0&heating.target=22
```

### 3.3 Typische Smart-Home-Status-IDs

**Format:**`adapter.instance.device.channel.state`

**Beispiele:**

- `hm-rpc.0.kitchen.light.STATE` - Homematic Lichtschalter
- `mqtt.0.solar.power` - Solarpanel-Leistungsabgabe
- `sonoff.0.washing_machine.status` - Status der Waschmaschine
- `weather.0.current.temperature` - Aktuelle Temperatur
- `history.0` - Adapter für historische Daten

### 3.4 Zustands-Werttypen

| Typ             | Beispiel                  | Anwendungsfall           |
| --------------- | ------------------------- | ------------------------ |
| boolescher Wert | `true` ,`false`           | Lampen, Schalter         |
| Nummer          | `22.5` ,`1500`            | Temperatur, Leistung (W) |
| Zeichenkette    | `"running"` ,`"idle"`     | Statusmeldungen          |
| Objekt          | `{"temp": 22, "hum": 65}` | Komplexe Daten           |
| null            | `null`                    | Sensoren nicht verfügbar |

---

## Teil 4: Technische Hindernisse und Herausforderungen

### 4.1 Mögliche Herausforderungen

**1. USB-Berechtigungen (Linux/macOS)**

- **Problem:** HID-Geräte benötigen erhöhte Berechtigungen oder udev-Regeln
- **Lösung (Linux):** Erstellen Sie eine udev-Regel für die Hersteller-ID.`0x4098`
  ```
  SUBSYSTEM=="usb", ATTRS{idVendor}=="4098", MODE="0666"
  ```
- **Lösung (macOS):** Möglicherweise muss ein Skript ausgeführt werden mit`sudo` oder unter Verwendung von IOKit-Berechtigungen

**2. Komplexität des Anzeigeprotokolls**

- **Problem:** Die Initialisierungssequenz für mehrere Pakete ist fehleranfällig
- **Lösung:** Erstellung einer robusten Displaytreiberbibliothek mit Fehlerbehandlung
- **Empfehlung:** Gründliche Tests mit Paketmitschnitten aus SimAppPro durchführen.

**3. ioBroker-Zustandszuordnung**

- **Problem:** Unterschiedliche Smart-Home-Adapter verwenden uneinheitliche Namenskonventionen.
- **Lösung:** Erstellen einer flexiblen Konfigurationsdatei, die ioBroker-Status-IDs MCDU-Seiten zuordnet.
- **Beispiel:** Benutzerdefiniert`weather_temp: "weather.0.current.temperature"` in der Konfiguration

**4. Textkodierung für die Anzeige**

- **Problem:** Das MCDU-Display verwendet eine 3-Byte-Zeichenkodierung (nicht die standardmäßige UTF-8-Kodierung).
- **Lösung:** Entwicklung einer Zeichenkodierungsbibliothek zur Konvertierung von ASCII/UTF-8 in das MCDU-Format
- **Hinweis:** Sonderzeichen (Pfeile, Symbole) erfordern eine UTF-8 → Mehrbyte-Zuordnung

**5. Echtzeit-Aktualisierungsleistung**

- **Problem:** Die Abfrage der REST-API jede Sekunde erzeugt Latenz.
- **Lösung:** Verwenden Sie WebSocket-Abonnements für sofortige Aktualisierungen
- **Ausweichlösung:** Adaptives Polling implementieren (schneller für aktive Seiten, langsamer für inaktive Seiten)

**6. Zustandsverwaltung der Seitennavigation**

- **Problem:** MCDU muss die aktuelle Seite, den Schaltflächenkontext und die Eingabepuffer verfolgen.
- **Lösung:** Implementierung eines Zustandsautomaten für die Seitennavigation
- **Beispielstaaten:**`DATA` ,`CLIMATE` ,`ENERGY` ,`APPLIANCES`

**7. USB-Geräteverbindung wiederherstellen**

- **Problem:** Wenn MCDU vom Stromnetz getrennt/wieder angeschlossen wird, stürzt das Skript ab.
- **Lösung:** Implementierung einer USB-Geräteüberwachung und einer Logik zur automatischen Wiederverbindung

**8. Bildwiederholfrequenz**

- **Problem:** Unbekannte optimale Aktualisierungsrate für Display-Aktualisierungen
- **Lösung:** Empirische Tests durchführen (beginnen Sie mit 5 Hz und passen Sie die Frequenz je nach Leistung an).

### 4.2 Minderungsmaßnahmen

| Herausforderung          | Risikostufe | Minderung                                                            |
| ------------------------ | ----------- | -------------------------------------------------------------------- |
| USB-Berechtigungen       | Niedrig     | Die udev-Konfiguration ist in der README-Datei dokumentiert.         |
| Anzeigeprotokoll         | Medium      | Verwenden Sie vorhandene Python-Beispiele als Referenz.              |
| Zustandszuordnung        | Niedrig     | JSON-Konfigurationsdatei                                             |
| Textkodierung            | Medium      | Erstelle eine wiederverwendbare Kodierungsbibliothek                 |
| Echtzeit-Updates         | Niedrig     | Verwenden Sie WebSocket (gut dokumentiert).                          |
| Seitennavigation         | Medium      | Entwerfen Sie von Anfang an einen klaren Zustandsautomaten.          |
| USB-Wiederverbindung     | Niedrig     | Verwenden Sie eine try-catch-Anweisung mit einer Reconnect-Schleife. |
| Bildschirmaktualisierung | Niedrig     | Fang konservativ an, optimiere später.                               |

---

## Teil 5: Wichtigste Erkenntnisse

### 5.1 Machbarkeitsbewertung

✅ **Das Projekt ist MACHBAR**

- Das Hardwareprotokoll ist vollständig dokumentiert.
- Reverse-Engineering-Arbeit liefert funktionierende Codebeispiele.
- ioBroker bietet flexible Integrationsoptionen
- Es wurden keine größeren technischen Hindernisse identifiziert.

### 5.2 Empfohlener Technologie-Stack (siehe ARCHITECTURE.md)

**Prototyp:**

- Python + Hidapi (USB-Kommunikation)
- Requests-Bibliothek (REST-API-Aufrufe an ioBroker)

**Produktion:**

- Node.js + node-hid (USB-Kommunikation)
- @iobroker/socket-client (WebSocket-Integration)
- JSON/YAML-Konfigurationsdateien

### 5.3 Nächste Schritte

1. ✅ Recherche abgeschlossen (dieses Dokument)
2. ⏭️ Erstellung eines technischen Architekturvorschlags (ARCHITECTURE.md)
3. ⏭️ Entwicklungsumgebung einrichten
4. ⏭️ Grundlegende USB-Lese-/Schreibvorgänge mit WinWing MCDU testen
5. ⏭️ Displaytreiberbibliothek erstellen
6. ⏭️ Implementierung der ioBroker-Integrationsschicht
7. ⏭️ Designseitensystem und Konfigurationsformat

---

## Referenzen

**WinWing MCDU-Ressourcen:**

- Reverse-Engineering-Repository: <https://github.com/alha847/winwing_mcdu>
- Produktseite: <https://ea.winctrl.com/view/goods-details.html?id=945>

**ioBroker-Ressourcen:**

- Einfache API: <https://github.com/ioBroker/ioBroker.simple-api>
- Socket.io-Adapter: <https://github.com/ioBroker/ioBroker.socketio>
- Adaptervorlage: <https://github.com/ioBroker/ioBroker.example>
- Socket-Client: <https://github.com/ioBroker/socket-client>

**Python USB-Bibliotheken:**

- Hidapi: <https://pypi.org/project/hidapi/>
- pyusb: <https://github.com/pyusb/pyusb>

**Node.js USB-Bibliotheken:**

- node-hid: <https://github.com/node-hid/node-hid>
- USB (libusb): <https://github.com/node-usb/node-usb>

---

**Dokumentstatus:** Abgeschlossen\
&#x20;**Letzte Aktualisierung:** 14.02.2026\
&#x20;**Nächstes Dokument:** ARCHITEKTUR.md