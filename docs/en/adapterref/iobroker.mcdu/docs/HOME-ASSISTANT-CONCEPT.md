---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# Konzept: MCDU Premium-Integration für Home Assistant

**Datum:** 2026-08-18
**Status:** Entwurf zur Diskussion
**Kontext:** Umstieg von ioBroker auf Home Assistant. Der ioBroker-Adapter bleibt bestehen
und kann von der Community weiterentwickelt werden. Für Home Assistant entsteht eine
neue, eigenständige Integration mit dem Anspruch "Premium": komfortable Konfiguration
aller MCDU-Seiten, deutlich besser als die jsonConfig-basierte Admin-UI von ioBroker.

---

## 1. Ausgangslage und Kernerkenntnis

Die heutige Architektur ist bereits sauber in drei Schichten getrennt:

```
ioBroker-Adapter (Gehirn)  <-->  MQTT-Broker  <-->  mcdu-client auf dem Pi (dummes Terminal)  <-->  USB-HID-Hardware
```

**Die entscheidende Erkenntnis:** Der `mcdu-client` auf dem Raspberry Pi weiß nichts von
ioBroker. Er spricht ausschließlich das MQTT-Protokoll:

| Richtung | Topic | Inhalt |
|---|---|---|
| Broker → Client | `mcdu/{deviceId}/display/#` | Display-Zeilen / Vollbild / Clear |
| Broker → Client | `mcdu/{deviceId}/led/#` | LED an/aus, Helligkeit |
| Broker → Client | `mcdu/{deviceId}/config/#` | Client-Konfiguration (z. B. reload) |
| Client → Broker | `mcdu/{deviceId}/button/{label}` | Tastendrücke |
| Client → Broker | `mcdu/{deviceId}/status` | online/offline (retained, LWT) |
| Client → Broker | `mcdu/{deviceId}/heartbeat` | Lebenszeichen |

Damit gilt: **Pi-Client und Hardware-Treiber werden nicht angefasst.** Für Home Assistant
muss ausschließlich die "Gehirn"-Seite neu entstehen: Seiten-Rendering, Navigation,
Scratchpad/Eingabe, Validierung, Funktionstasten, LED-Logik — plus die Konfigurations-UI.

---

## 2. Repository-Strategie (Antwort auf die Branch-Frage)

**Kein Branch. Ein neues Repository.**

Begründung:

1. **Andere Sprache, anderes Ökosystem.** Eine HA-Integration ist Python
   (`custom_components/mcdu/`), der ioBroker-Adapter ist Node.js. Es gibt fast keinen
   gemeinsam nutzbaren Code — nur das Protokoll und den Client.
2. **HACS erfordert eine eigene Repo-Struktur.** HACS (Home Assistant Community Store)
   erwartet ein Repository mit `custom_components/<domain>/` im Root plus
   `hacs.json`. Ein Branch im ioBroker-Repo ist damit nicht veröffentlichbar.
3. **Community-Kontinuität.** Das ioBroker-Repo (`Flixhummel/ioBroker.mcdu`) bleibt
   unverändert auf `main` — Issues, Releases, npm-Publishing laufen weiter. Ein
   dauerhaft divergierender Branch würde nur verwirren und nie gemerged werden.
4. **Unabhängige Release-Zyklen.** ioBroker released über release-script/npm, die
   HA-Integration über GitHub-Releases/HACS.

### Empfohlene Repo-Aufteilung (3 Repos)

| Repo | Inhalt | Zweck |
|---|---|---|
| `Flixhummel/ioBroker.mcdu` | bestehend, unverändert | ioBroker-Adapter, Community-Pflege |
| `Flixhummel/winwing-mcdu-client` (neu) | `mcdu-client/` + MQTT-Protokoll-Spez | **Gemeinsamer** Pi-Client für beide Ökosysteme |
| `Flixhummel/hass-mcdu` (neu) | `custom_components/mcdu/` + Panel-Frontend | Die HA-Integration |

Die Extraktion des Clients in ein eigenes Repo ist der einzige Eingriff ins bestehende
Projekt. Alternative (pragmatischer Start): Client bleibt vorerst im ioBroker-Repo, das
HA-Repo verlinkt nur darauf. Die Extraktion kann später erfolgen — wichtig ist nur, dass
das **MQTT-Protokoll als versionierter Vertrag** dokumentiert wird (siehe Abschnitt 4),
damit beide Integrationen denselben Client bedienen können.

---

## 3. Integrationsform: Vergleich und Empfehlung

Für HA gibt es drei realistische Bauformen:

### Option A — Native Custom Integration (Python) ⭐ Empfehlung

- `custom_components/mcdu/` mit Config Flow, Geräten, Entitäten, Services.
- Nutzt die **eingebaute MQTT-Integration** von HA (`dependencies: ["mqtt"]`) — kein
  eigener Broker-Client, keine eigenen Credentials, Broker-Konfiguration entfällt
  komplett für den Nutzer.
- Läuft auf **allen** HA-Installationsarten (HA OS, Container, Core, Supervised).
- Verteilung über HACS, später ggf. HACS-Default-Repo.
- "Premium"-Merkmale (Config Flow, Geräteregistrierung, Diagnostics, eigenes
  Konfigurations-Panel) sind nur in dieser Bauform voll erreichbar.
- Kosten: Portierung der Business-Logik von JavaScript nach Python (~3.000 Zeilen
  gut getestete Logik, Tests portierbar).

### Option B — HA Add-on (Docker, Node.js-Code wiederverwenden)

- Der bestehende Node.js-Code liefe fast unverändert in einem Add-on-Container mit
  Ingress-Web-UI, Anbindung an HA über WebSocket-API oder MQTT.
- Vorteil: minimaler Portierungsaufwand.
- Nachteile: läuft **nur** auf HA OS/Supervised (schließt Container/Core-Nutzer aus),
  fühlt sich nicht wie eine Integration an (keine Entitäten/Geräte/Services ohne
  Zusatzaufwand), doppelte Zustandshaltung, kein "Premium-Integration"-Status.

### Option C — AppDaemon / Node-RED

- Schneller Hack, keine ernsthafte Option für den formulierten Anspruch.

**Empfehlung: Option A.** Der Anspruch "Premium-Integration, komfortable Konfiguration"
ist nur mit einer nativen Integration einlösbar. Die Portierung ist überschaubar, weil
die Logik klein, modular und durch ~228 Tests spezifiziert ist — die Tests sind de facto
die Portierungs-Spezifikation.

---

## 4. MQTT-Protokoll als stabiler Vertrag (Phase 0)

Bevor die HA-Seite entsteht, wird das Protokoll **aus dem Code extrahiert und als
`PROTOCOL.md` (v1.0) festgeschrieben**: alle Topics, Payload-Schemata (Display-Frames,
Segmente für Mehrfarb-Zeilen, LED-Namen, Button-Labels, Status/Heartbeat-Format),
QoS/Retain-Verhalten, ASCII-Beschränkung, Timing-Anforderungen des Clients.

Nutzen:
- Beide Integrationen (ioBroker + HA) implementieren gegen dieselbe Spezifikation.
- Die Community kann den ioBroker-Adapter weiterentwickeln, ohne den Client zu brechen.
- Protokolländerungen laufen künftig über eine Versionsnummer im Status/Config-Topic.

---

## 5. Zielarchitektur der HA-Integration

```
Home Assistant
├── MQTT-Integration (eingebaut, vorhandener Broker)
│         ▲ ▼
├── custom_components/mcdu/          ← das neue "Gehirn" (Python)
│   ├── Config Flow                  ← Einrichtung + Geräte-Erkennung
│   ├── DeviceCoordinator            ← 1 Instanz je MCDU (mcdu/{deviceId}/status)
│   ├── PageEngine                   ← Port von PageRenderer/Navigation/Pagination
│   ├── InputEngine                  ← Port von Scratchpad/InputMode/Validation/Confirm
│   ├── Entities                     ← Sensoren, Nummern, Schalter, Events
│   ├── Services                     ← mcdu.notify, mcdu.goto_page, mcdu.set_led, ...
│   ├── Storage                      ← Seiten-Konfiguration in .storage/ (versioniert)
│   └── WebSocket-API                ← Backend für das Konfigurations-Panel
│
└── MCDU-Panel (Sidebar, eigenes Frontend)   ← die Premium-Konfigurations-UI
          ▲ ▼ (HA-WebSocket)
     Seiteneditor mit Live-Vorschau
```

Unverändert: `MQTT-Broker <--> mcdu-client (Pi) <--> WinWing MCDU`.

### 5.1 Warum das Entity-Modell von HA ein Geschenk ist

Der ioBroker-Adapter liest `obj.common` (write, type, min/max, unit, states), um
Eingaben zu validieren und Werte zu formatieren. HA bietet dasselbe — reicher und
einheitlicher:

| ioBroker `obj.common` | Home Assistant |
|---|---|
| `type` | Domain + `device_class` |
| `write` | Domain (sensor = read-only, number/switch/light = schreibbar) |
| `min`/`max`/`step` | Attribute von `number`/`climate`/`light` |
| `unit` | `unit_of_measurement` |
| `states` (Enum) | `options` von `select`/`input_select`, HVAC-Modes etc. |
| Name | `friendly_name`, Area, Device |

Zusätzlich kennt HA **Areas, Devices, Labels und Kategorien** — die Grundlage für das
spätere Killer-Feature "Seite automatisch aus Raum generieren" (Abschnitt 7.4).

### 5.2 Entitäten, die die Integration selbst anlegt (je MCDU-Gerät)

- `binary_sensor.mcdu_<id>_online` — Client-Status (aus retained status-Topic)
- `sensor.mcdu_<id>_current_page` — aktuelle Seite (für Automationen)
- `sensor.mcdu_<id>_scratchpad` — Scratchpad-Inhalt
- `number.mcdu_<id>_brightness` / `_screen_brightness` — Backlights
- `switch.mcdu_<id>_led_<name>` — je LED (FAIL, FM, MCDU, ...)
- **Events/Device-Trigger** für jeden Tastendruck (`event.mcdu_<id>_button` bzw.
  Device-Trigger je Taste) — damit werden MCDU-Tasten direkt in HA-Automationen
  nutzbar ("wenn LSK3L auf Seite X gedrückt ..."), ohne dass eine Seite konfiguriert
  sein muss. Das ersetzt die 32 Automations-States des ioBroker-Adapters idiomatisch.

### 5.3 Services (für Automationen/Skripte)

- `mcdu.notify` — Nachricht ins Scratchpad/Notification-Zeile (mit Timeout, Farbe)
- `mcdu.goto_page` — Seite aufrufen
- `mcdu.set_led` — LED steuern (auch als Switch verfügbar)
- `mcdu.show_dialog` — Bestätigungsdialog aus einer Automation heraus
- `mcdu.refresh` — Redraw erzwingen

### 5.4 Konfigurations-Speicher

Seiten-Konfiguration liegt **nicht** im Config Entry (zu groß, zu dynamisch), sondern
in HA-Storage (`.storage/mcdu.pages_<entry_id>`, `helpers.storage.Store`, mit
Schema-Version). Regel wie bisher: **eine aktuelle Formatversion, keine
Alt-Format-Migrationen** — passt das gespeicherte Schema nicht, zeigt die Integration
einen Repair-Issue/Fehler statt still zu migrieren. Export/Import als JSON-Datei ist
Teil der Panel-UI (auch für Backup und Sharing von Konfigurationen).

---

## 6. Die Premium-Konfigurations-UI (das Herzstück)

Das ist der Punkt, an dem die HA-Version den ioBroker-Adapter deklassieren soll. Die
ioBroker-Admin-UI ist durch jsonConfig strukturell limitiert (Tabellen mit 20+ Spalten,
zwei redundante jsonConfig-Kopien, keine Vorschau, kein Kontext). In HA bauen wir
stattdessen ein **eigenes Sidebar-Panel** (registriert via `panel_custom`, Frontend in
Lit oder React, kommuniziert über die HA-WebSocket-API mit dem Backend).

### 6.1 Kernfunktionen des Panels

1. **Live-Display-Vorschau.** Eine originalgetreue 14×24-Darstellung (Pixel-Font,
   8 Farben) rendert die gerade bearbeitete Seite in Echtzeit — die Vorschau nutzt
   **dieselbe PageEngine im Backend** ("render preview" über WebSocket), es gibt also
   keine zweite Rendering-Implementierung, die divergieren kann. Optional: Vorschau
   mit echten Live-Werten der verknüpften Entitäten.
2. **Seitenbaum statt Tabelle.** Linke Spalte: Navigationshierarchie als Baum
   (Parent/Child, Drag & Drop zum Umhängen), Breadcrumb-Logik sichtbar.
3. **Zeileneditor mit Direktauswahl.** Klick auf eine Zeile/Seite (links/rechts) in
   der Vorschau öffnet den Editor genau für dieses Feld — statt Zeilen in einer
   24-Spalten-Tabelle zu suchen.
4. **HA-native Entity-Picker.** Ziel-/Quell-Datenpunkte werden mit dem
   HA-Entity-Selector gewählt (Suche, Filter nach Domain/Area/Device). Nach Auswahl
   werden **Label, Einheit, min/max, Enum-Optionen und Farbe automatisch
   vorbefüllt** aus den Entity-Metadaten — änderbar, aber nie leer.
5. **Layout-Typen als Vorlagen.** menu/data/list wie bisher, aber als visuelle
   Auswahl mit Beispielbild; Paginierung/Scroll-Indikatoren zeigt die Vorschau an.
6. **Funktionstasten & LEDs grafisch.** Ein MCDU-Frontplattenbild, auf dem man
   Funktionstasten anklickt und ihnen Seiten/Aktionen zuweist; dito LEDs →
   Entity-Zuordnung (erledigt UX Phase E gleich mit).
7. **Validierung inline.** Fehler (Pflichtfelder, ungültige Ziele, Nicht-ASCII,
   zu lange Labels) erscheinen direkt am Feld und in der Vorschau — nicht erst nach
   dem Speichern auf der Hardware.
8. **Undo/Redo, Entwurf vs. aktiv.** Änderungen wirken erst auf die Hardware, wenn
   "Aktivieren" gedrückt wird; vorher testet man im Vorschau-Modus (optional:
   "Preview auf Gerät senden"-Knopf für 30 Sekunden Echt-Vorschau).

### 6.2 Assistenten (der eigentliche Komfortsprung)

- **"Seite aus Area generieren":** Raum wählen → Integration schlägt eine fertige
  Seite mit allen Lichtern/Schaltern/Sensoren des Raums vor (Domain-Priorisierung,
  sinnvolle Formate) → Nutzer streicht/ordnet um → fertig.
- **"Seite aus Domain generieren":** z. B. alle `climate`-Entitäten als Klimaseite.
- **Profile/Vorlagen** (deckt UX Phase F ab): mitgelieferte Beispielkonfigurationen
  (Beleuchtung, Klima, Energie/PV) plus Import/Export von Community-Profilen.

### 6.3 Technische Umsetzung des Panels

- Frontend als eigenständiges Build-Artefakt im HA-Repo (`/frontend`, Lit + TypeScript,
  Vite-Build → eine JS-Datei, von der Integration als statischer Pfad registriert).
- Kommunikation ausschließlich über registrierte WebSocket-Commands
  (`mcdu/pages/get`, `mcdu/pages/save`, `mcdu/render_preview`,
  `mcdu/devices/list`, ...), damit Auth, Berechtigungen und Reconnects von HA kommen.
- Das Panel ist optional bedienbar per Maus **und** Tastatur (Scratchpad-Feeling ist
  nett, aber kein Muss).

---

## 7. Entwicklungsphasen

| Phase | Inhalt | Ergebnis |
|---|---|---|
| **0 — Fundament** | `PROTOCOL.md` v1.0 aus Code extrahieren; Repos anlegen (`hass-mcdu`, optional Client-Extraktion); Gerüst `custom_components/mcdu` mit manifest, Config Flow (Geräte-Erkennung über retained `mcdu/+/status`) | HA erkennt die MCDU, zeigt online/offline |
| **1 — Display-MVP** | Port der PageEngine (PageRenderer, Segmente/Farben, sanitizeAscii, Pagination); statische Seiten aus Storage rendern; Buttons als HA-Events; LSK-Navigation | MCDU zeigt Seiten, Navigation funktioniert |
| **2 — Werte & Steuern** | Entity-Werte live auf Seiten (State-Subscription, Formatierung mit unit/precision); LSK-Aktionen: toggle, Service-Call, goto_page; LEDs + Brightness als Entitäten | MCDU steuert echte Geräte |
| **3 — Eingabe-System** | Port Scratchpad/InputMode/ValidationEngine/ConfirmationDialog; Validierung aus Entity-Metadaten; deutsche Meldungen wie gehabt | Werteingabe über Scratchpad komplett |
| **4 — Premium-Panel** | Sidebar-Panel: Vorschau, Seitenbaum, Zeileneditor, Entity-Picker, Funktionstasten-/LED-Zuordnung, Inline-Validierung | Komfortable Konfiguration (der Anspruch) |
| **5 — Assistenten & Profile** | Area-/Domain-Generator, Vorlagen, Import/Export; Importer für bestehende ioBroker-Seitenkonfiguration (Format ist bekannt → 1:1-Konverter, Quell-IDs müssen manuell auf Entity-IDs gemappt werden, der Importer schlägt per Namensähnlichkeit vor) | Migration + Komfort |
| **6 — Release** | HACS-Veröffentlichung (hacs.json, Brands-PR für Logo), Doku, Diagnostics, Repair-Issues, Tests (pytest + `pytest-homeassistant-custom-component`), CI (hassfest, HACS-Action) | Öffentliche Premium-Integration |

Die Phasen 1–3 sind eine **Portierung, keine Neuentwicklung**: die bestehenden
Mocha-Tests werden als pytest-Tests mitportiert und sichern Verhaltensgleichheit ab.
Bekannte Pitfalls aus dem Projektgedächtnis (0xf0-Init nur einmal pro Power-Cycle,
40 ms Frame-Abstand, LEDs nach Display schreiben, ASCII-only, `effectiveDisplayType()`)
betreffen fast alle den **Client** und bleiben dort gelöst; auf HA-Seite relevant sind
nur ASCII-Sanitizing und die Segment-/Farblogik.

---

## 8. Qualitätsanspruch "Premium"

HA hat eine offizielle **Integration Quality Scale** (Bronze → Platinum). Custom
Integrations werden nicht offiziell eingestuft, aber die Regeln sind der Maßstab:

- Config Flow statt YAML, Geräte- & Entity-Registry sauber, eindeutige unique_ids
- Übersetzungen (de/en) über `strings.json`/`translations/`
- Diagnostics-Export, Repair-Issues statt stiller Fehler, Reauth-/Reload-Fähigkeit
- Vollständige Typannotationen, pytest-Abdeckung, hassfest-CI
- Saubere Doku + Beispiel-Blueprints für Button-Automationen

Fernziel (optional): Aufnahme in den HACS-Default-Store; Core-Aufnahme ist wegen des
eigenen Panels unrealistisch und auch nicht nötig.

---

## 9. Risiken und offene Punkte

1. **Portierungsaufwand Panel-Frontend** ist der größte Einzelposten (Phase 4). Das
   Backend ist dank Tests kalkulierbar, das Panel ist Neuland → früh einen
   Klick-Dummy bauen.
2. **HA-Frontend-API-Stabilität:** `panel_custom` + WebSocket-Commands sind stabil
   und von vielen großen Integrationen genutzt; trotzdem Panel bewusst
   HA-versionstolerant bauen (kein Zugriff auf interne Frontend-Module).
3. **Zwei Gehirne, ein Client:** Solange ioBroker- und HA-Integration existieren,
   darf **nur eine** Instanz pro Gerät aktiv publizieren. Der Client bleibt dumm;
   die Protokoll-Doku bekommt einen Hinweis (retained display-Topics von zwei
   Quellen = Flackern).
4. **Community-Übergabe ioBroker:** Repo-Beschreibung um "maintained by community,
   original author focuses on HA integration" ergänzen, CONTRIBUTING.md anlegen,
   ggf. Co-Maintainer mit Schreibrechten suchen. Kein Branch nötig — `main` lebt
   einfach weiter.
5. **Namensgebung:** Domain `mcdu` in HA prüfen (Kollisionen unwahrscheinlich);
   Repo-Name `hass-mcdu` oder `homeassistant-winwing-mcdu`.

---

## 10. Zusammenfassung der Entscheidungen

| Frage | Antwort |
|---|---|
| Branch für HA? | **Nein.** Neues Repo `hass-mcdu`; ioBroker-Repo bleibt unverändert für die Community |
| Was bleibt? | mcdu-client (Pi), MQTT-Protokoll, Hardware-Treiber — unverändert |
| Was wird neu? | Python-Integration (Port der Business-Logik) + eigenes Konfigurations-Panel |
| Bauform | Native Custom Integration mit HA-MQTT, verteilt über HACS |
| Konfig-Komfort | Sidebar-Panel: Live-Vorschau, Seitenbaum, Entity-Picker mit Auto-Befüllung, Area-Generator, Inline-Validierung, Import aus ioBroker-Config |
| Erster Schritt | Phase 0: `PROTOCOL.md` aus dem Code extrahieren + Repo-Gerüst |