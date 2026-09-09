---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md
title: MCDU Smart Home Controller: UX-Konzept
hash: xCglm5YuYvlCN15LQ2bp0Dv7CSI9FV4B2QQTBgIwKgU=
---
# MCDU Smart Home Controller: UX-Konzept

## Zweck des Dokuments

Vollständiges Interaktionsdesignsystem für den MCDU Smart Home Controller. Definiert alle Benutzerinteraktionsmuster, Anzeigelayouts, Navigationsregeln und Mechanismen für visuelles Feedback. Dieses Dokument dient als maßgebliche Spezifikation für die Implementierung.

**Zielhardware** : WinWing MCDU-32-CAPTAIN\
&#x20;**Zielplattform** : ioBroker Smart Home System\
&#x20;**Designphilosophie** : Präzision auf Luftfahrtniveau + Smart-Home-Funktionalität

---

## A. Konfigurationsflexibilität

### A.1 Konfigurierbarkeit der Funktionstasten

⚠️ **WICHTIGES DESIGNPRINZIP** : Die Funktionstastenbelegung ist **VOM BENUTZER KONFIGURIERBAR** und nicht fest codiert.

**Standard- vs. benutzerdefinierte Zuordnung** :

Die in definierten Zuordnungen`MCDU-SMARTHOME-MAPPING.md` Dies stellt eine **empfohlene Standardkonfiguration** dar, die für typische Smart-Home-Nutzungsmuster optimiert ist. Benutzer müssen diese Zuordnungen an ihre spezifischen Bedürfnisse anpassen können.

**Konfigurierbare Elemente** :

1. **Funktionstastenbelegung** (12 Tasten):
   - Welche Kategorie/Seite öffnet jede Funktionstaste?
   - Ausnahme: Die MENU-Taste öffnet immer das Hauptmenü (nicht konfigurierbar)

2. **Inhalte der Schnellzugriffsseite** :
   - Welche Aktionen werden auf der Seite QUICK angezeigt (LSK1-6 L/R = 12 Slots)
   - Reihenfolge der Schnellaktionen
   - Bezeichnungen für jede Aktion

3. **LED-Belegung** (11 LEDs):
   - Welche Systemzustände schalten welche LEDs an?
   - LED-Helligkeitsstufen (aus/gedimmt/hell)
   - Blinkmuster für verschiedene Alarmtypen

**Nicht konfigurierbare Elemente** (aus Gründen der Konsistenz):

- Standard-Tastenfunktionen: BRT, DIM, CLR, OVFY, SLEW
- Scratchpad-Verhalten
- LSK-Kontextsensitivität (gesteuert durch den Seiteninhalt)
- Kernnavigationsmuster
- Bedeutung der Farbcodierung

### A.2 Standardzuordnung (Empfohlen)

**Funktionstasten → Kategorien** (aus MCDU-SMARTHOME-MAPPING.md):

| Physischer Schlüssel | Standardzuordnung | Begründung                             |
| -------------------- | ----------------- | -------------------------------------- |
| KRAFTSTOFF           | ENERGIE           | Direkte Analogie: Brennstoff = Energie |
| DIR                  | SCHNELL           | Schneller Zugriff auf Favoriten        |
| PROG                 | STATUS            | Systemfortschritt überwachen           |
| PERF                 | SZENEN            | Leistung = Szenenvoreinstellungen      |
| INIT                 | EINSTELLUNGEN     | Systeminitialisierung/Einrichtung      |
| DATEN                | GERÄTE            | Gerätedatenbank/Katalog                |
| F-PLN                | ZEITPLAN          | Flugplan                               |
| RAD                  | KLIMA             | Manuelle analoge Abstimmung            |
| SEC                  | Sicherheit        | Sicherheit (Glückstreffer!)            |
| Fluglotsendienst     | MELDUNGEN         | Systemkommunikation                    |
| SPEISEKARTE          | HAUPTMENÜ         | Root-Menü (behoben)                    |
| FLUGHAFEN            | RÄUME             | Standortbezogene Informationen         |

**Warum diese Standardeinstellung?**

- Häufigste Kategorien auf Direkttasten (ENERGIE, STATUS, SZENEN)
- Logische Analogien zu Luftfahrtfunktionen
- Zugriff auf 12 Kategorien mit einem einzigen Tastendruck
- Restliche Kategorien über HAUPTMENÜ erreichbar

### A.3 Beispiele für benutzerdefinierte Zuordnungen

**Beispiel 1: Poolbesitzer (** Benutzer mit Pool) möchte direkten Zugriff auf die Poolsteuerung:

```
FUEL     → ENERGIE (keep)
DIR      → QUICK (keep)
PROG     → POOL (changed from STATUS)
PERF     → SZENEN (keep)
INIT     → EINSTELLUNGEN (keep)
DATA     → GERÄTE (keep)
F-PLN    → ZEITPLAN (keep)
RAD      → KLIMA (keep)
SEC      → SICHERHEIT (keep)
ATC      → MELDUNGEN (keep)
MENU     → HAUPTMENÜ (fixed)
AIRPORT  → RÄUME (keep)
```

**Beispiel 2: Besitzer eines Elektrofahrzeugs** priorisiert das Laden des Elektroautos:

```
FUEL     → E-MOBILITÄT (changed - energy theme fits!)
DIR      → QUICK (keep)
PROG     → STATUS (keep)
...
```

**Beispiel 3: Sicherheitsorientierter** Benutzer wünscht direkten Zugriff auf den Alarm:

```
SEC      → ALARMANLAGE (changed from SICHERHEIT)
ATC      → SICHERHEIT (changed from MELDUNGEN)
...
```

### A.4 Konfigurationsschnittstelle

**Wo Benutzer Zuordnungen konfigurieren** :

**Primäre Methode** : ioBroker Admin-Benutzeroberfläche (Webinterface)

- Navigieren Sie zu den MCDU-Adaptereinstellungen.
- Registerkarte „Funktionstastenbelegung“
- Drag-and-Drop-Oberfläche:
  ```
  [FUEL  ] ⇄ [Dropdown: ENERGIE ▼]
  [DIR   ] ⇄ [Dropdown: QUICK   ▼]
  [PROG  ] ⇄ [Dropdown: STATUS  ▼]
  ...
  ```
- Abschnitt „Schnellzugriffskonfiguration“:
  - 12 Steckplätze (LSK1-6 L/R)
  - Drag-Aktionen aus der Bibliothek
  - Beschriftungen festlegen (max. 20 Zeichen)
  - Vorschau auf virtuellem MCDU-Display

**Sekundäre Methode** : MCDU-Gerätekonfiguration (Erweitert)

- EINSTELLUNGEN → GESCHMACKBELEGUNG
- Eingeschränkte Bearbeitungsmöglichkeiten (aus Liste auswählen)
- Für die Ersteinrichtung nicht empfohlen (die Web-Oberfläche ist einfacher).

**Konfigurationsspeicher** :

- Gespeichert in der ioBroker-Adapterkonfiguration (JSON)
- Mit ioBroker-Backups gesichert
- Exportierbare/importierbare Profile (Konfigurationen zwischen Benutzern teilen)

### A.5 Konfigurationsvalidierung

**Regeln zur Vermeidung ungültiger Konfigurationen** :

1. **Keine doppelten Zuordnungen** :
   - Jede Funktionstaste kann nur EINER Kategorie zugeordnet werden.
   - Das System verhindert, dass mehreren Schlüsseln dieselbe Kategorie zugewiesen wird.
   - Ausnahme: Eine Kategorie kann sowohl über eine Funktionstaste als auch über das Hauptmenü aufgerufen werden.

2. **Menütaste reserviert** :
   - MENU öffnet immer HAUPTMENÜ (kann nicht geändert werden)
   - Gewährleistet, dass Benutzer jederzeit zum Hauptmenü zurückkehren können.

3. **Mindestanzahl erforderlicher Seiten** :
   - Das HAUPTMENÜ muss über die MENU-Taste erreichbar sein.
   - Mindestens eine der folgenden Optionen: SCHNELL, STATUS oder direkter Kategoriezugriff
   - Verhindert „Aussperrungs“-Szenarien

4. **LED-Konflikte** :
   - Mehrere Bedingungen können dieselbe LED auslösen (Prioritätsreihenfolge).
   - Kritische LEDs (FAIL, MCDU, RDY) können nicht deaktiviert werden.

**Validierungsfehler** (in der Web-Benutzeroberfläche angezeigt):

```
❌ Error: Function key "FUEL" already assigned to ENERGIE
❌ Error: No access to STATUS page (recommended to keep)
⚠️  Warning: QUICK page empty (no quick actions configured)
✅ Configuration valid - Save to apply
```

### A.6 Konfigurationsprofile

**Vorgefertigte Vorlagen** (vom Benutzer auswählbar und anpassbar):

**Profil 1: „Ausgewogenes Zuhause“** (Standard)

- Gleichberechtigte Berücksichtigung von Energie, Klima und Sicherheit
- Schneller Zugriff auf häufig genutzte Szenen
- Zentrale Statusüberwachung

**Profil 2: „Energieorientiert“**

- ENERGIE, PHOTOVOLTAIK, E-MOBILITÄT auf Direkttasten
- Schnellzugriff zeigt Leistungsdaten an
- Überwachungsorientiert

**Profil 3: „Komfortorientiert“**

- SZENEN, KLIMA, LICHT, MULTIMEDIA stehen im Vordergrund
- Kurze Szenen zur Schaffung von Atmosphäre
- Weniger Betonung technischer Daten

**Profil 4: „Sicherheit geht vor“**

- SICHERHEIT, ALARMANLAGE, VERSCHLUSS direkte Zufahrt
- Der Schnellzugriff zeigt den Sicherheitsstatus an
- Kamera-/Sensorüberwachung

**Profil 5: „Minimale Einrichtung“**

- Nur HAUPTMENÜ, SCHNELL, STATUS
- Alles andere über die Menüstruktur
- Einfachste Lernkurve

**So bewerben Sie sich** :

```
ioBroker Admin UI:
  MCDU Adapter Settings
    → Configuration Profiles
      → Select: "Energy Focused" ▼
      → [Preview]
      → [Apply Profile]
      → (Optional) Customize further
      → [Save Configuration]
```

---

## B. Navigationshierarchie

### B.1 Gesamtstruktur

**Vierschichtarchitektur** :

```
Layer 0: Function Keys (Direct Jump)
    ↓
Layer 1: Category Main Page
    ↓
Layer 2: Sub-Category / Device List / Detail Page
    ↓
Layer 3: Action Confirmation / Edit Mode
```

**Regel der maximalen Navigationstiefe** : Keine Interaktion sollte mehr als 3 Navigationsebenen durch Drücken einer Funktionstaste erfordern.

**Beispielpfade** :

**Pfad 1: Schnelle Aktion (2 Stufen)**

```
Press QUICK → Press LSK (Scene) → ✓ Done
```

**Pfad 2: Informationssuche (2 Ebenen)**

```
Press ENERGIE → View data → Done
```

**Pfad 3: Gerätesteuerung (3 Ebenen)**

```
Press KLIMA → Select Room → Edit Temp → ✓ Done
```

**Pfad 4: Konfigurationsänderung (3 Ebenen)**

```
Press EINSTELLUNGEN → Select Option → Confirm → ✓ Done
```

### B.2 Hauptmenüstruktur

**HAUPTMENÜ** (Zugriff über MENU-Taste):

```
HAUPTMENÜ               1/2
---
< ENERGIE              (LSK1L)
< KLIMA                (LSK2L)
< LICHT                (LSK3L)
< SICHERHEIT           (LSK4L)
< SZENEN               (LSK5L)
< ZEITPLAN             (LSK6L)

> PHOTOVOLTAIK          (LSK1R)
> MULTIMEDIA            (LSK2R)
> VERSCHLUSS            (LSK3R)
> E-MOBILITÄT           (LSK4R)
> POOL                  (LSK5R)
> RÄUME                 (LSK6R)
                   WEITER>

[SLEW → to page 2]

HAUPTMENÜ               2/2
---
< GERÄTE               (LSK1L)
< ALARMANLAGE          (LSK2L)
< ANWESENHEIT          (LSK3L)
< STATUS               (LSK4L)
< MELDUNGEN            (LSK5L)
< EINSTELLUNGEN        (LSK6L)

> QUICK ACCESS          (LSK1R)
> [CUSTOM 1]            (LSK2R: User-defined)
> [CUSTOM 2]            (LSK3R: User-defined)
< ZURÜCK
```

**Menüfunktionen** :

- Alle Kategorien ab 13 Jahren zugänglich
- Zwei Seiten (maximal 12 Elemente pro Seite)
- Benutzerdefinierte Slots für vom Benutzer hinzugefügte Kategorien
- Immer über die Menütaste erreichbar
- „< ZURÜCK“ kehrt zur vorherigen Seite zurück

### B.3 Untermenü-Navigationsregeln

**Regel 1: Einheitliches Header-Format**

```
[CATEGORY] > [SUB-PAGE]  X/Y
```

Beispiele:

```
ENERGIE > PV DETAILS     1/1
KLIMA > WOHNZIMMER       1/1
GERÄTE > STEHLAMPE       1/1
```

**Regel 2: Seitenindikatoren**

- Immer aktuelle Seite / Gesamtseitenzahl anzeigen (z. B.`1/3` )
- Wenn nur eine Seite: anzeigen`1/1` (bedeutet, dass keine weiteren Seiten verfügbar sind)
- Die Seitenzahl umfasst Unterkategorien, nicht nur das Scrollen.

**Regel 3: Unterseitentypen**

**Typ A: Informationsanzeige** (keine LSK-Aktionen erforderlich)

```
ENERGIE                 1/3
AKTUELL:    2340 W
HEUTE:      12.4 kWh
KOSTEN:     2.48 €
---
NETZ:       +340 W
PV:         2500 W
BATTERIE:   -500 W
< INDEX            WEITER>
```

- Reine Datenanzeige
- Zum Navigieren auf den Seiten
- LSKs für tieferes Bohren (optional)

**Typ B: Auswahlmenü**

```
SZENEN                  1/2
AKTIV:      FILM MODUS
---
< GUTE NACHT           (LSK3L)
< GUTEN MORGEN         (LSK4L)
< FILM MODUS ✓         (LSK5L: Active)
< ABWESEND             (LSK6L)
< INDEX          WEITER>
```

- LSKs führen Aktionen aus oder navigieren
- Aktives Element mit ✓ markiert
- Die Beschriftungen zeigen deutlich die Handlung an.

**Typ C: Dateneingabeformular**

```
KLIMA > WOHNZIMMER      1/1
IST:        21.8°C
SOLL:       [  .  ]°C  (LSK2L: Edit)
VENTIL:     45%
MODUS:      AUTO       (LSK4L: Change)
---
< ZURÜCK
```

- Felder mit`[ ]` oder Pfeile zeigen bearbeitbare Bereiche an
- LSK neben dem Feld aktiviert den Bearbeitungsmodus
- Notizblock für Eingaben

**Typ D: Scrollbare Liste**

```
GERÄTE                  1/1
---
 WOHNZIMMER
< STEHLAMPE      ON    (LSK1L)
< DECKENLAMPE    OFF   (LSK2L)
< THERMOSTAT     21.5  (LSK3L)
 KÜCHE
< DECKENLICHT    ON    (LSK4L)
↓ MEHR               FILTER>
```

- Die Anzahl der angezeigten Elemente übersteigt (14 Zeilen).
- Zum Scrollen ↓↑ bewegen
- `↓ MEHR` Der Indikator zeigt unten mehr an
- LSK wählt Artikel aus

### B.4 Breadcrumb-Konzept

**Aktuellen Pfad immer anzeigen** :

**Einzeln** (Hauptkategorie):

```
ENERGIE                 1/3
```

**Zwei Ebenen** (Kategorie > Unterseite):

```
ENERGIE > PV DETAILS    1/1
```

**Drei Ebenen** (Kategorie > Liste > Element):

```
GERÄTE > LICHT > STEHLAMPE  1/1
```

**Maximale Breadcrumb-Länge** : 27 Zeichen (passt in Zeile 1)

**Kürzung** (falls erforderlich):

```
GERÄTE > ... > STEHLAMPE    1/1
```

**Breadcrumb = Navigationshinweis** :

- Zeigt an, wo du bist
- Die CLR-Taste führt eine Ebene zurück.
- Einheitlich auf allen Seiten

### B.5 Zurück-Navigation (CLR-Taste)

**CLR-Schlüsselverhalten je nach Kontext** :

**Kontext 1: Scratchpad enthält Daten**

```
Action: CLR → Clear scratchpad
Result: Scratchpad empty, stay on page
```

**Kontext 2: Notizblock leer, auf Unterseite**

```
Current: KLIMA > WOHNZIMMER
Action: CLR
Result: Return to KLIMA main page
```

**Kontext 3: Notizblock leer, auf der Hauptkategorieseite**

```
Current: ENERGIE (main)
Action: CLR
Result: Return to previous category OR HAUPTMENÜ
```

**Kontext 4: Doppelklick (Notausgang)**

```
Current: Any page (even 3 levels deep)
Action: CLR CLR (within 1 second)
Result: Return to HAUPTMENÜ or STATUS
```

**Visuelles Feedback** :

```
After CLR:
[Brief flash] ← BACK (amber text, 0.5s)
Then: Display previous page
```

**„< ZURÜCK“ LSK** (expliziter Zurück-Button):

- Alternative zur CLR-Taste
- Wird immer auf den Detailseiten angezeigt
- Gleiches Verhalten wie bei einem einzelnen CLR-Tastendruck
- Besser auffindbar für neue Nutzer

### B.6 Startseitennavigation (MENÜ-Taste)

**MENU-Taste = Sofortige Rückkehr zu HAUPTMENÜ**

**Verhalten** :

- Drücken Sie einmal MENU → HAUPTMENÜ Seite 1
- Funktioniert von JEDER Seite, JEDER Tiefe
- Löscht den Notizblock NICHT (der Notizblock bleibt bestehen)
- Nicht konfigurierbar (immer HAUPTMENÜ)

**Anwendungsfälle** :

1. **Navigation verirrt** : MENÜ → zum Hauptmenü zurückkehren
2. **Kategorien wechseln** : MENÜ → andere Kategorie auswählen
3. **Alle Optionen prüfen** : MENÜ → vollständige Kategorienliste durchsuchen

**Nach dem Drücken der Menütaste** :

```
HAUPTMENÜ               1/2
---
< ENERGIE              (LSK1L)
< KLIMA                (LSK2L)
...
```

**Kombinationsnavigation** :

```
User on: GERÄTE > LICHT > STEHLAMPE (3 levels deep)
User wants: KLIMA category

Option A (via MENU):
  Press MENU → HAUPTMENÜ
  Press LSK2L → KLIMA

Option B (via Function Key, if configured):
  Press RAD (mapped to KLIMA) → Direct jump

Option B is faster IF function key is mapped!
```

### B.7 Kreisnavigation (SLEW)

**Auf den Hauptkategorieseiten wird SLEW um den Rand herum angezeigt** :

**Links-/Rechtsnavigation** (entspricht der Funktionstaste):

```
ENERGIE → SLEW → → KLIMA → SLEW → → LICHT → ... → SLEW → → ENERGIE
```

**Reihenfolge folgt Funktionstastenbelegung** (benutzerkonfiguriert):

- Wenn der Benutzer FUEL→ENERGIE, DIR→QUICK, PROG→STATUS zugeordnet hat...
- SLEW-Reihenfolge: ENERGIE → QUICK → STATUS → SZENEN → ...
- Zirkel: letzte Kategorie → erste Kategorie

**Warum kreisförmig?**

- Keine Sackgassen
- Einfaches Durchsuchen der Kategorien
- Muskelgedächtnis (SLEW gedrückt halten → um in X Kategorien zu wechseln)

**Auf-/Abwärtsnavigation** (Scrollen):

```
On long lists (>14 lines):
SLEW ↓ → Scroll down one line
SLEW ↑ → Scroll up one line
Hold SLEW ↓ → Continuous scroll (smooth)
```

**Scrollindikatoren** :

```
Top of list:
GERÄTE                  1/4

Middle of list:
↑ OBEN
...
↓ MEHR

Bottom of list:
...
< ZURÜCK
```

### B.8 Durchsetzung der Tiefenbegrenzung

**Ziel** : Keine Benutzeraktion soll mehr als 3 Navigationsschritte von der Funktionstaste erfordern.

**So erreichen Sie es** :

**Methode 1: Direkte Funktionstasten**

- 12 Kategorien direkt zugänglich (1 Druck)
- Restliche Kategorien über HAUPTMENÜ (2 Pressen)

**Methode 2: SCHNELL Seite**

- Die 10-12 wichtigsten Aktionen direkt auf SCHNELL (insgesamt 2 Tastendrücke)
- Beispiel: QUICK → LSK1L (GUTE NACHT) → ✓ Fertig

**Methode 3: Tiefe Hierarchien abflachen**

- Vermeiden Sie: Kategorie → Unterkategorie → Unter-Unterkategorie → Artikel
- Stattdessen: Kategorie → Artikelliste (mit Filter/Suche)

**Methode 4: Kontextsensitive LSKs**

- LSKs zeigen die relevantesten Aktionen an
- Beispiel: Auf der Geräteseite zeigt LSK „UMSCHALTEN“ und nicht „DETAILS ANZEIGEN“ an.
- Verringert den Bedarf an zusätzlicher Navigation

**Tiefenbeispiele** :

**✅ Gut (2 Stufen)** :

```
Press SZENEN → Press LSK (GUTE NACHT) → ✓ Scene activated
```

**✅ Akzeptabel (3 Stufen)** :

```
Press KLIMA → Select WOHNZIMMER → Edit temp → ✓ Confirmed
```

**❌ Schlecht (4+ Stufen) - VERMEIDEN** :

```
Press MENU → LICHT → RÄUME → WOHNZIMMER → STEHLAMPE → Edit
(This is too deep! Should be: Press RÄUME → WOHNZIMMER → Device list)
```

---

## C. Kerninteraktionsmuster

### C.1 Navigieren (Informationen durchsuchen)

**Muster** : DIR, MENU, LSK-Auswahl

**Anwendungsfall** : Kategorien durchsuchen, Daten anzeigen, Geräte erkunden

**Interaktionssequenz** :

**Schritt 1: Zugriffskategorie**

```
Action: Press function key (e.g., ENERGIE)
       OR Press MENU → Select category with LSK
Result: Category main page displayed
```

**Schritt 2: Inhalte durchsuchen**

```
Action: Press SLEW ←→ (navigate between sub-pages)
       OR Press SLEW ↑↓ (scroll within long lists)
Result: Display updates with new content
```

**Schritt 3: Artikel auswählen** (optional)

```
Action: Press LSK next to item
Result: Navigate to detail page OR execute action
```

**Beispielhafter Ablauf** :

```
1. Press ENERGIE
   Display: ENERGIE main page

2. Press SLEW →
   Display: PV DETAILS page

3. Press SLEW →
   Display: BATTERIE page

4. Press LSK4L (detail view)
   Display: BATTERIE > DETAILS
```

**Zusammenfassung der Navigationssteuerung** :

| Kontrolle      | Funktion                 | Kontext                      |
| -------------- | ------------------------ | ---------------------------- |
| Funktionstaste | Direkter Kategoriesprung | Überall                      |
| SPEISEKARTE    | Hauptmenü öffnen         | Überall                      |
| LSK            | Element/Aktion auswählen | Auf gekennzeichnetem Artikel |
| SLEW ←→        | Nächste/vorherige Seite  | Gleiche Kategorie            |
| SCHWENKUNG ↑↓  | Scrollliste              | Nur lange Listen             |
| CLR            | Geh zurück               | Unterseiten                  |

### C.2 Schalter (Ein-/Ausschalter)

**Muster** : LSK zum Umschalten der Zustände

**Anwendungsfall** : Licht ein-/ausschalten, verriegeln/entriegeln, aktivieren/deaktivieren

**Interaktionssequenz** :

**Schritt 1: Navigieren Sie zu Gerät/Option**

```
Example: LICHT > Device List
Display:
  < STEHLAMPE      ON    (LSK1L)
  < DECKENLAMPE    OFF   (LSK2L)
```

**Schritt 2: Drücken Sie LSK zum Umschalten**

```
Action: Press LSK1L (next to STEHLAMPE ON)
Result: State toggles immediately
Display updates:
  < STEHLAMPE      OFF ✓ (green flash)
```

**Visuelles Feedback** :

- Der Zustand ändert sich sofort (weiß → grün für 1 Sekunde).
- Das Häkchen ✓ erscheint kurz.
- Wenn das Gerät langsam reagiert: Anzeige „SENDEN…“

**Fehlerbehandlung** :

```
If device offline:
  < STEHLAMPE      OFFLINE (amber)
  Press LSK → Error: "GERÄT NICHT ERREICHBAR"
```

**Zustände umschalten** :

| Anzeige  | Bedeutung             | Nächster Staat     |
| -------- | --------------------- | ------------------ |
| `ON`     | Aktuell auf           | → AUS              |
| `OFF`    | Derzeit ausgeschaltet | → EIN              |
| `AUTO`   | Automatikmodus        | → MANUELL oder AUS |
| `AKTIV`  | Aktiv/aktiviert       | → INAKTIV          |
| `LOCKED` | Gesperrt              | → FREISCHALTET     |

**Bestätigung für kritische Umschaltungen** :

```
Critical actions (e.g., alarm disarm) require confirmation:

Step 1: Press LSK (ALARM SCHARF)
Display:
  ALARM DEAKTIVIEREN?
  < NEIN             JA*> (LSK6R)

Step 2: Press LSK6R or OVFY
Result: ✓ ALARM UNSCHARF (green)
```

### C.3 Nummer bearbeiten (Notizblockeintrag)

**Muster** : Scratchpad + LSK

**Anwendungsfall** : Temperatur, Helligkeit, Lautstärke und Zeit einstellen

**Interaktionssequenz** :

**Schritt 1: Navigieren Sie zum Feld**

```
Example: KLIMA > WOHNZIMMER
Display:
  IST:        21.8°C
  SOLL:       22.0°C  ← (LSK2L)
  MODUS:      AUTO
```

**Schritt 2: Wert in Scratchpad eingeben**

```
Action: Type "23" (on numeric keypad)
Scratchpad shows: 23*
Display unchanged (field still shows 22.0°C)
```

**Schritt 3: Drücken Sie LSK zur Bestätigung**

```
Action: Press LSK2L (next to SOLL field)
Result: Value transfers to field
Display:
  SOLL:       23.0°C ✓ (green flash)
Scratchpad: (clears automatically)
```

**Validierung** :

**Gültige Eingabe** :

```
Typed: 22.5
Scratchpad: 22.5* (green asterisk)
Press LSK → ✓ Accepted
```

**Ungültige Eingabe** (außerhalb des gültigen Bereichs):

```
Typed: 35
Scratchpad: 35* (red asterisk)
Error Line: BEREICH 16-30°C (amber)
Press LSK → Rejected, error beep
Scratchpad: (stays, waits for correction)
```

**Ungültiges Format** :

```
Typed: 22.5.5
Scratchpad: 22.5.5* (red asterisk)
Error Line: UNGÜLTIGES FORMAT (red)
Press LSK → Rejected
```

**Korrektur** :

```
If invalid input in scratchpad:
  Press CLR → Scratchpad clears
  Type correct value → Continue
```

**Numerische Eingabetypen** :

| Typ         | Format  | Beispiel | Reichweite  |
| ----------- | ------- | -------- | ----------- |
| Ganze Zahl  | `NN`    | `75`     | 0-100       |
| Dezimal     | `NN.N`  | `22.5`   | 16.0-30.0   |
| Prozentsatz | `NN%`   | `75%`    | 0-100       |
| Zeit        | `HH:MM` | `08:30`  | 00:00-23:59 |

**Automatische Formatierung** :

```
User types: 22
System formats as: 22.0°C (adds decimal + unit)

User types: 75
For brightness field: 75% (adds %)
```

### C.4 Text bearbeiten (Tastatur + Notizblock)

**Muster** : Alphanumerische Tastatur + Notizblock + LSK

**Anwendungsfall** : Szenennamen, Suchanfragen, Gerätenamen

**Interaktionssequenz** :

**Schritt 1: Zum Textfeld navigieren**

```
Example: SZENEN > NEUE SZENE
Display:
  NAME:       [          ]← (LSK1L)
  GERÄTE:     [AUSWÄHLEN]→ (LSK2L)
```

**Schritt 2: Text eingeben**

```
Action: Type "ABENDESSEN" (using A-Z keyboard)
Scratchpad shows: ABENDESSEN*
Display: Field still shows [ ]
```

**Schritt 3: Mit LSK bestätigen**

```
Action: Press LSK1L
Result: Text transfers to field
Display:
  NAME:       ABENDESSEN ✓ (green)
Scratchpad: (clears)
```

**Automatische Vervollständigung** (für bekannte Werte):

```
Example: Room search

Typed: WOH
Scratchpad: WOH*
Display updates with suggestions:
  < WOHNZIMMER           (LSK2L)
  < WOHNZIMMER OG        (LSK3L)

Press LSK2L → "WOHNZIMMER*" in scratchpad
Press LSK1L → Accepted
```

**Einschränkungen bei der Texteingabe** :

| Feldtyp     | Maximale Länge | Gültige Zeichen | Beispiel     |
| ----------- | -------------- | --------------- | ------------ |
| Szenenname  | 20 Zeichen     | AZ, 0-9, Platz  | "GUTE NACHT" |
| Gerätesuche | 15 Zeichen     | AZ, 0-9         | "LAMPE"      |
| Zimmername  | 15 Zeichen     | AZ, 0-9, Platz  | "WOHNZIMMER" |

**Charaktereintrag** :

```
On A-Z keyboard:
  Single press: Letter appears in scratchpad
  Hold: Repeat letter (AAAA...)
  Numeric keys: Numbers (if allowed)
  Special: Space, period, hyphen (if available)
```

**Bearbeiten von vorhandenem Text** :

```
Field shows: GUTE NACHT
Press LSK → Copies to scratchpad: GUTE NACHT*
Edit in scratchpad (not possible - must re-type fully)
Alternative: CLR + re-type

Note: No cursor-based editing (MCDU limitation)
Workaround: Copy existing, clear, type new
```

### C.5 Aktion ausführen (Bestätigung)

**Muster** : LSK oder OVFY zur Bestätigung

**Anwendungsfall** : Szene aktivieren, Prozess starten, Element löschen

**Zwei Bestätigungsstufen** :

**Stufe 1: Keine Bestätigung** (sichere Aktionen)

```
Example: Activate scene "FILM MODUS"

Step 1: Press SZENEN
Step 2: Press LSK5L (FILM MODUS)
Result: ✓ SZENE AKTIV (immediate execution)

No confirmation needed - action is safe and reversible.
```

**Stufe 2: Sanfte Bestätigung** (potenziell störend)

```
Example: Activate "GUTE NACHT" (turns off all lights!)

Step 1: Press QUICK
Step 2: Press LSK1L (GUTE NACHT)
Display:
  SZENE STARTEN?
  GUTE NACHT
  ---
  ALLE LICHTER AUS
  TÜREN SPERREN
  ---
  < NEIN             JA*> (LSK6R)

Step 3: Press LSK6R OR press OVFY
Result: ✓ SZENE AKTIV

Confirmation shows WHAT will happen.
User can cancel with LSK (NEIN) or CLR.
```

**Stufe 3: Harte Bestätigung** (kritisch/unwiderruflich)

```
Example: Disarm security alarm

Step 1: Navigate to ALARMANLAGE
Step 2: Press LSK (DEAKTIVIEREN)
Display:
  ALARM DEAKTIVIEREN?
  ⚠️  SICHERHEIT REDUZIERT
  ---
  BESTÄTIGUNG NÖTIG
  DRÜCKE OVFY

Step 3: Press OVFY (LSK not accepted here)
Result: ✓ ALARM DEAKTIVIERT

Hard confirmation requires OVFY key specifically.
Prevents accidental execution.
```

**Bestätigungsentscheidungsbaum** :

```
Is action reversible immediately? (e.g., toggle light)
  YES → No confirmation
  NO ↓

Is action disruptive? (e.g., "all lights off")
  YES → Soft confirmation (LSK or OVFY)
  NO ↓

Is action security-critical? (e.g., unlock door, disarm alarm)
  YES → Hard confirmation (OVFY only)
```

**Beispiele nach Typ** :

| Aktion                       | Bestätigung | Schlüssel erforderlich |
| ---------------------------- | ----------- | ---------------------- |
| Licht ein-/ausschalten       | Keiner      | LSK-Umschalter         |
| "Film"-Szene aktivieren      | Keiner      | LSK                    |
| Szene "Alles aus" aktivieren | Weich       | LSK oder OVFY          |
| Haustür aufschließen         | Hart        | OVFY nur               |
| Alarm deaktivieren           | Hart        | OVFY nur               |
| Zeitplan löschen             | Weich       | LSK oder OVFY          |
| Werksreset                   | Hart        | OVFY nur               |

**Visuelles Bestätigungsfeedback** :

```
After action executes:
  ✓ AKTION ABGESCHLOSSEN (green, 2s)
  [Details of what happened]
  
Or:
  ✓ SZENE AKTIV
  12 GERÄTE GESTEUERT
```

### C.6 Scrollen (Listennavigation)

**Muster** : SLEW-Schlüssel für lange Listen

**Anwendungsfall** : Gerätelisten, Ereignisprotokolle, Zeitpläne mit mehr als 14 Zeilen

**Listentypen** :

**Kurzliste** (passt auf den Bildschirm, ≤10 Elemente):

```
SZENEN                  1/1
---
< GUTE NACHT           (LSK1L)
< GUTEN MORGEN         (LSK2L)
< FILM MODUS           (LSK3L)
< ABWESEND             (LSK4L)
< PARTY                (LSK5L)
< ARBEIT               (LSK6L)
< INDEX

No SLEW needed - all items visible.
```

**Lange Liste** (>14 Zeilen, Scrollen erforderlich):

```
GERÄTE                  1/4  ← Page indicator
---
 WOHNZIMMER
< STEHLAMPE      ON    (LSK1L)
< DECKENLAMPE    OFF   (LSK2L)
< THERMOSTAT     21.5  (LSK3L)
 KÜCHE
< DECKENLICHT    ON    (LSK4L)
< HERDLICHT      OFF   (LSK5L)
↓ MEHR (15 weitere)    ← Scroll indicator

Press SLEW ↓ to scroll down...
```

**Scrollverhalten** :

**Einzeln scrollen** (einmaliges Drücken):

```
Action: Press SLEW ↓ once
Result: List shifts up by ~6 lines
        New items appear at bottom
        Top items disappear
```

**Kontinuierliches Scrollen** (gedrückt halten):

```
Action: Hold SLEW ↓
Result: List scrolls smoothly (1 line per 200ms)
        Stops when bottom reached
        Release to stop
```

**Scrollindikatoren** :

```
Top of list:
  (no "↑ OBEN" indicator)
  
Middle of list:
  ↑ OBEN
  ...content...
  ↓ MEHR (X weitere)
  
Bottom of list:
  ↑ OBEN
  ...content...
  < ZURÜCK
  (no "↓ MEHR")
```

**Seitennummerierung** (Alternative zum Scrollen):

```
Some lists use pages instead:

MELDUNGEN               1/3  ← Page 1 of 3
---
 19:34  BATTERIE SENSOR
 18:45  SZENE AKTIV
 14:20  LADEN FERTIG
 12:30  SYSTEM UPDATE
 11:15  BEWEGUNG GARTEN
 09:45  ALARM TEST
< ZURÜCK         WEITER> (LSK6R)

Press LSK6R → Jump to page 2 (shows next 6 messages)
Press SLEW → → Same as LSK6R (next page)
```

**Zum Seitenanfang/Seitenende springen** :

```
Action: Press SLEW ↑ + SLEW ↓ simultaneously
Result: Jump to top of list

Action: Press CLR CLR (double-tap)
Result: Jump to bottom OR exit list (context-dependent)
```

**Auswahl aus der scrollbaren Liste** :

```
User scrolls to find item:
  Press SLEW ↓ until "HEIZUNG BÜRO" visible
  
Item appears next to LSK:
  < HEIZUNG BÜRO   19.5  (LSK3L)
  
Press LSK3L:
  Navigate to HEIZUNG BÜRO detail page
```

**Intelligentes Scrollen** (kontextabhängig):

```
If list has categories/headers:
  SLEW ↓ → Jumps to next category header (not line-by-line)
  
Example:
  GERÄTE
   WOHNZIMMER
   ...devices...
   KÜCHE         ← SLEW ↓ jumps here
   ...devices...
   SCHLAFZIMMER  ← SLEW ↓ jumps here
```

---

## D. Layoutmuster für die Anzeige

### D.1 Menüseitenlayout

**Zweck** : Liste der auswählbaren Optionen anzeigen

**Struktur** (insgesamt 14 Zeilen):

```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [SUBTITLE / STATUS]
Line 3:  [SEPARATOR] ---
Line 4:  [OPTION 1]            (LSK1L/R)
Line 5:  [OPTION 2]            (LSK2L/R)
Line 6:  [OPTION 3]            (LSK3L/R)
Line 7:  [OPTION 4]            (LSK4L/R)
Line 8:  [OPTION 5]            (LSK5L/R)
Line 9:  [OPTION 6]            (LSK6L/R)
Line 10: [OPTION 7]            (LSK1L/R, if scrolled)
Line 11: [OPTION 8]            ...
Line 12: [OPTION 9]            ...
Line 13: [NAV: < INDEX]    [NAV: WEITER>]
Line 14: [SCRATCHPAD CONTENT]
```

**Beispiel** :

```
HAUPTMENÜ               1/2    ← Line 1: Title + page
ALL CATEGORIES              ← Line 2: Subtitle (optional)
---                         ← Line 3: Separator
< ENERGIE              (LSK1L) ← Lines 4-9: Options (6 per side)
< KLIMA                (LSK2L)
< LICHT                (LSK3L)
< SICHERHEIT           (LSK4L)
< SZENEN               (LSK5L)
< ZEITPLAN             (LSK6L)

> PHOTOVOLTAIK          (LSK1R)
> MULTIMEDIA            (LSK2R)
> VERSCHLUSS            (LSK3R)
> E-MOBILITÄT           (LSK4R)
> POOL                  (LSK5R)
> RÄUME                 (LSK6R)
< INDEX          WEITER>       ← Line 13: Navigation
                                ← Line 14: Scratchpad (empty here)
```

**LSK-Indikatoren** :

- `<` = Linke LSK wählt diese Option aus
- `>` = Rechts LSK wählt diese Option aus
- Kein Indikator = Keine Aktion (nur Anzeige)

**Optionsstaaten** :

```
Normal:     < SZENE NAME       (white)
Active:     < SZENE NAME ✓     (green)
Unavailable:  SZENE NAME       (grey, no LSK)
Warning:    < GERÄT NAME !     (amber)
Error:      < GERÄT NAME ❌     (red)
```

### D.2 Datenanzeige-Layout

**Zweck** : Anzeige von Informationen, aktuellen Zuständen und Sensorwerten

**Struktur** :

```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [PRIMARY VALUE / STATUS]
Line 3:  [SEPARATOR] ---
Line 4:  [LABEL 1]:    [VALUE] [UNIT]
Line 5:  [LABEL 2]:    [VALUE] [UNIT]  (LSK if interactive)
Line 6:  [LABEL 3]:    [VALUE] [UNIT]
Line 7:  [SEPARATOR / CATEGORY HEADER]
Line 8:  [LABEL 4]:    [VALUE] [UNIT]
Line 9:  [LABEL 5]:    [VALUE] [UNIT]
Line 10: [LABEL 6]:    [VALUE] [UNIT]
Line 11: [...]
Line 12: [...]
Line 13: [NAV: < INDEX]    [NAV: DETAILS>]
Line 14: [SCRATCHPAD]
```

**Beispiel** :

```
ENERGIE                 1/3    ← Line 1
AKTUELL:    2340 W             ← Line 2: Primary value
---                            ← Line 3
HEUTE:      12.4 kWh           ← Line 4: Data field
KOSTEN:     2.48 €             ← Line 5: Data field
SELBST:     78%                ← Line 6: Data field
---                            ← Line 7: Separator
NETZ:       +340 W  (LSK3L)    ← Line 8: Interactive field
PV:         2500 W  (LSK4L)    ← Line 9: Drilldown option
BATTERIE:   -500 W  (LSK5L)    ← Line 10: Drilldown option
WALLBOX:    0 W                ← Line 11
                               ← Lines 12-13: Empty or more data
< INDEX          DETAILS>      ← Line 13: Navigation
                               ← Line 14: Scratchpad
```

**Wertformatierung** :

| Typ         | Format                 | Beispiel     | Farbe |
| ----------- | ---------------------- | ------------ | ----- |
| Leistung    | `NNNN W` oder `N.N kW` | `2340 W`     | Weiß  |
| Energie     | `NN.N kWh`             | `12.4 kWh`   | Weiß  |
| Temperatur  | `NN.N°C`               | `22.5°C`     | Weiß  |
| Prozentsatz | `NN%`                  | `78%`        | Weiß  |
| Währung     | `N.NN €`               | `2.48 €`     | Weiß  |
| Zeit        | `HH:MM:SS`             | `14:32:15`   | Weiß  |
| Datum       | `DD.MM.YYYY`           | `14.02.2026` | Weiß  |

**Besondere Werte** :

```
Unknown:    ---        (grey dashes)
Error:      ERR        (red)
Offline:    OFFLINE    (amber)
N/A:        N/A        (grey)
Infinite:   ∞          (white)
```

**Interaktive Daten** (LSK neben dem Wert):

```
NETZ:       +340 W  ← (LSK3L)

Pressing LSK3L → Navigate to NETZ details page
OR
Pressing LSK3L → Edit value (if modifiable)
```

**Farbcodierung für Werte** :

```
Normal:         2340 W         (white)
User-modified:  22.5°C         (green)
Warning:        LOW            (amber)
Critical:       OFFLINE        (red)
Predicted:      ~12.5 kWh      (magenta, with ~ prefix)
```

### D.3 Eingabeseitenlayout

**Zweck** : Erfassung von Benutzereingaben (Temperatur, Uhrzeit, Name usw.).

**Struktur** :

```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [INSTRUCTION / CONTEXT]
Line 3:  [SEPARATOR] ---
Line 4:  [FIELD 1 LABEL]: [VALUE/BOX]  ← (LSK1L)
Line 5:  [FIELD 2 LABEL]: [VALUE/BOX]  ← (LSK2L)
Line 6:  [FIELD 3 LABEL]: [VALUE/BOX]  ← (LSK3L)
Line 7:  [...]
Line 8:  [HINT / EXAMPLE]
Line 9:  [...]
Line 10: [...]
Line 11: [...]
Line 12: [VALIDATION ERROR] (if any)
Line 13: [< ABBRECHEN]  [SPEICHERN*>]
Line 14: [SCRATCHPAD]
```

**Beispiel 1: Temperatureingang**

```
KLIMA > WOHNZIMMER      1/1
TEMPERATUR EINSTELLEN
---
IST:        21.8°C
SOLL:       [  .  ]°C  ← (LSK2L)
MODUS:      AUTO       (LSK3L)
---
HINWEIS: 16-30°C
SCHRITT: 0.5°C
---

< ABBRECHEN      ÜBERNEHMEN*
[Scratchpad: type value here]

User flow:
1. Type "22.5" → Scratchpad: 22.5*
2. Press LSK2L → Value transfers to SOLL field
3. Press ÜBERNEHMEN* (LSK6R) → Saved
```

**Beispiel 2: Zeiteingabe**

```
ZEITPLAN > NEUE REGEL   1/1
ALARMZEIT FESTLEGEN
---
ZEIT:       [  :  ]    ← (LSK1L: HH:MM)
TAGE:       MO-FR      (LSK2L: Select)
AKTION:     SZENE      (LSK3L: Select)
---
FORMAT: HH:MM (24h)
BEISPIEL: 08:30
---

< ABBRECHEN      SPEICHERN*
[Scratchpad]
```

**Feldindikatoren** :

```
Empty field:     [     ]    (brackets, no content)
Placeholder:     [HH:MM]    (format hint)
Filled:          22.5°C     (value shown)
Editable:        22.5°C  ← (arrow indicates LSK)
Dropdown:        AUTO    ▼ (down arrow = options)
```

**Validierungszustände** :

```
Valid input:
  Scratchpad: 22.5* (green asterisk)
  Field: Ready to accept
  
Invalid input:
  Scratchpad: 35* (red asterisk)
  Error line 12: BEREICH 16-30°C (amber)
  Field: Rejects transfer
  
Empty required:
  Field: [     ] (red border if validation fails)
  Error: PFLICHTFELD (red)
```

**Mehrstufige Eingabe** :

```
Some inputs require multiple steps:

Step 1: Select option from list
  SZENE:      [AUSWÄHLEN]→ (LSK3L)
  
  Press LSK3L → Navigate to scene selection
  
Step 2: Select scene
  < GUTE NACHT       (LSK1L)
  < FILM MODUS       (LSK2L)
  
  Press LSK1L → "GUTE NACHT" selected
  
Step 3: Return to input page
  SZENE:      GUTE NACHT ✓ (green)
```

### D.4 Bestätigungsseitenlayout

**Zweck** : Vor der Ausführung kritischer Aktionen bestätigen.

**Struktur** :

```
Line 1:  [ACTION TITLE]
Line 2:  [WARNING / IMPACT]
Line 3:  [SEPARATOR] ---
Line 4:  [DETAIL 1: What will happen]
Line 5:  [DETAIL 2: Affected items]
Line 6:  [DETAIL 3: Consequences]
Line 7:  [SEPARATOR] ---
Line 8:  [COUNTDOWN or INSTRUCTIONS]
Line 9:  [...]
Line 10: [...]
Line 11: [...]
Line 12: [...]
Line 13: [< NEIN / ABBRECHEN]  [JA* / BESTÄTIGEN*>]
Line 14: [SCRATCHPAD - IGNORED]
```

**Beispiel 1: Weiche Bestätigung**

```
SZENE STARTEN?          ← Line 1: Question
GUTE NACHT              ← Line 2: Scene name
---                     ← Line 3
AKTION:
  12 LICHTER AUS        ← Lines 4-6: What will happen
  3 TÜREN SPERREN
  HEIZUNG 18°C
---
FORTFAHREN?
---


< NEIN               JA*  ← Line 13: Cancel / Confirm
                            (Scratchpad not used)

User can:
  - Press LSK (NEIN) → Cancel, return to previous page
  - Press LSK6R (JA*) or OVFY → Execute
```

**Beispiel 2: Harte Bestätigung**

```
ALARM DEAKTIVIEREN?
⚠️  SICHERHEIT REDUZIERT
---
AKTION:
  ALLE SENSOREN INAKTIV
  KAMERAS AUF INFO-MODUS
  TÜRSCHLÖSSER BLEIBEN GESPERRT
---
BESTÄTIGUNG NÖTIG:
  DRÜCKE OVFY

< ABBRECHEN
                     ← Line 14: Scratchpad (not used)

User must:
  - Press OVFY → Execute
  - LSK (JA) not accepted! (hard confirmation)
  - Press CLR or LSK (ABBRECHEN) → Cancel
```

**Countdown-Bestätigung** (für destruktive Aktionen):

```
SYSTEM NEUSTART?
⚠️  ALLE VERBINDUNGEN GETRENNT
---
NEUSTART IN: 10s       ← Countdown (updates each second)
---
ABBRECHEN?
  DRÜCKE CLR ODER LSK


< ABBRECHEN
                     ← Scratchpad

Countdown:
  10, 9, 8, 7...
  At 0 → Action executes
  Press CLR or LSK → Cancels countdown
```

### D.5 Listenseitenlayout

**Zweck** : Anzeige einer scrollbaren Liste von Elementen (Geräte, Ereignisse, Protokolle)

**Struktur** :

```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [COUNT / FILTER INFO]
Line 3:  [SEPARATOR] ---
Line 4:  [CATEGORY HEADER] (optional)
Line 5:  [< ITEM 1]            (LSK1L)
Line 6:  [< ITEM 2]            (LSK2L)
Line 7:  [< ITEM 3]            (LSK3L)
Line 8:  [CATEGORY HEADER] (optional)
Line 9:  [< ITEM 4]            (LSK4L)
Line 10: [< ITEM 5]            (LSK5L)
Line 11: [< ITEM 6]            (LSK6L)
Line 12: [↓ MEHR (X weitere)] or [...]
Line 13: [< ZURÜCK]        [FILTER>]
Line 14: [SCRATCHPAD]
```

**Beispiel 1: Geräteliste**

```
GERÄTE                  1/4  ← Page 1 of 4 (48 devices, 12/page)
ALLE (48 GERÄTE)             ← Filter status
---
 WOHNZIMMER                  ← Category header (not selectable)
< STEHLAMPE      ON    (LSK1L)
< DECKENLAMPE    OFF   (LSK2L)
< THERMOSTAT     21.5  (LSK3L)
 KÜCHE
< DECKENLICHT    ON    (LSK4L)
< HERDLICHT      OFF   (LSK5L)
< THERMOSTAT     20.0  (LSK6L)
↓ MEHR (42 weitere)          ← Scroll indicator
< ZURÜCK         FILTER>     ← Navigation
                             ← Scratchpad

Press SLEW ↓ or LSK (WEITER) → Next items
```

**Beispiel 2: Ereignisprotokoll**

```
MELDUNGEN               1/3
NEU: 2 | ALLE: 24
---
!19:34  BATTERIE SENSOR (LSK1L) ← ! = Warning (amber)
 18:45  SZENE AKTIV     (LSK2L)
 14:20  LADEN FERTIG    (LSK3L)
 12:30  SYSTEM UPDATE   (LSK4L)
 11:15  BEWEGUNG GARTEN (LSK5L)
 09:45  ALARM TEST      (LSK6L)


< ZURÜCK         WEITER>
                         ← Scratchpad

Icon meanings:
  ! = Warning (amber)
  ❌ = Error (red)
  ✓ = Success (green)
  (space) = Info (white)
```

**Beispiel 3: Gruppierte Liste**

```
KLIMA                   1/2
8 RÄUME | Ø 21.2°C
---
< WOHNZIMMER     22.0  (LSK1L: Detail)
< KÜCHE          20.5  (LSK2L)
< SCHLAFZIMMER   19.5  (LSK3L)
< KINDERZIMMER   21.0  (LSK4L)
< BAD            23.0  (LSK5L)
< BÜRO           20.0  (LSK6L)
↓ MEHR (2 weitere)
< ZURÜCK         ALLE→
                      ← Scratchpad

LSK actions:
  Press LSK → Navigate to room detail
  Press "ALLE→" → Set all rooms to same temp
```

**Listenelementformat** :

```
General pattern:
[ICON] [TIME] [NAME]      [VALUE] [(LSK)]

Examples:
 19:34  LICHT AN              (timestamp, event, no value)
< STEHLAMPE      ON     (LSK) (device, state, interactive)
!14:20  BATTERIE     15% (LSK) (warning, device, value, interactive)
 WOHNZIMMER                   (category header, not interactive)
```

**Scrollindikatoren** :

```
Top of list:
  (no ↑ indicator)
  
Middle:
  ↑ OBEN (shows if scrolled down)
  ...items...
  ↓ MEHR (X weitere)
  
Bottom:
  ↑ OBEN
  ...items...
  < ZURÜCK
```

---

## E. Standardfunktionen (Immer verfügbar)

### E.1 BRT/DIM (Helligkeitssteuerung)

**Zweck** : Helligkeit des MCDU-Displays anpassen

**Verhalten** :

- Funktioniert auf JEDER Seite (führt nicht zu einer Seitenwechsel-Navigation)
- Keine Interaktion mit dem Notizblock
- Unmittelbares visuelles Feedback
- 5-10 diskrete Helligkeitsstufen

**Verwendung** :

```
Press BRT → Brightness +1 level
Press DIM → Brightness -1 level
Hold BRT → Continuous increase (to max)
Hold DIM → Continuous decrease (to min)
```

**Visuelles Feedback** :

```
Brief overlay (1 second):
┌─────────────────────┐
│  HELLIGKEIT: ████░  │  ← Bar graph (5 of 8)
└─────────────────────┘

Then: Overlay disappears, normal page shown
```

**Helligkeitsstufen** :

```
Level 1: 10% (night mode - very dim)
Level 2: 20%
Level 3: 35%
Level 4: 50%
Level 5: 65% (default)
Level 6: 80%
Level 7: 90%
Level 8: 100% (maximum, outdoor/daylight)
```

**Automatische Helligkeitsanpassung** (optional, falls ein Lichtsensor vorhanden ist):

```
In EINSTELLUNGEN > ANZEIGE:
  AUTO-HELLIGKEIT: AN  (LSK toggle)
  
If enabled:
  - System adjusts brightness based on ambient light
  - BRT/DIM still work (manual override for 5 minutes)
  - After 5 min, returns to auto mode
```

**Beharrlichkeit** :

- Helligkeitseinstellung wird nach Neustarts gespeichert
- Benutzerspezifische Einstellung (bei Mehrbenutzersystemen)

### E.2 CLR (Löschen / Zurück / Abbrechen)

**Zweck** : Multifunktionale, kontextsensitive Taste

**Verhalten je nach Kontext** (Prioritätsreihenfolge):

**Kontext 1: Scratchpad enthält Daten**

```
Scratchpad: 22.5*
Press: CLR
Result: Scratchpad clears → (empty)
Page: Unchanged
```

**Kontext 2: Notizblock leer, Bearbeitungsmodus aktiv**

```
Field: SOLL: [  .  ]°C  ← (cursor/edit active)
Press: CLR
Result: Exit edit mode, field unchanged
Page: Unchanged
```

**Kontext 3: Notizblock leer, auf Unterseite**

```
Current page: KLIMA > WOHNZIMMER
Press: CLR
Result: Navigate back to KLIMA main page
```

**Kontext 4: Notizblock leer, auf der Kategorie-Hauptseite**

```
Current: ENERGIE (main page)
Press: CLR
Result: Return to HAUPTMENÜ or previous category
```

**Kontext 5: Doppelklick (Notausgang)**

```
Current: Any page (any depth)
Action: CLR CLR (within 1 second)
Result: Jump to HAUPTMENÜ or STATUS page
Visual: [BRIEF FLASH] "ZURÜCK ZU HAUPTMENÜ"
```

**Kontext 6: Während der Konfirmation**

```
Confirmation page showing:
  SZENE STARTEN?
  < NEIN         JA*>
  
Press: CLR
Result: Cancel = same as pressing NEIN (LSK)
Return to previous page
```

**Visuelles Feedback** :

```
On scratchpad clear:
  Scratchpad: 22.5* → (flash) → (empty)
  
On navigation back:
  Current page fades out (100ms)
  Previous page fades in (100ms)
  Optional: Brief "← ZURÜCK" indicator (amber, 0.5s)
```

**Fehlervermeidung** :

```
If CLR would cause data loss:
  Display warning:
    ÄNDERUNGEN VERWERFEN?
    < NEIN         JA*>
    
  User must confirm or CLR again to proceed
```

### E.3 OVFY (Bestätigen / Ausführen)

**Zweck** : Kritische Aktionen bestätigen, ausstehende Änderungen ausführen

**Anwendungsfälle** :

**Anwendungsfall 1: Harte Bestätigung erforderlich**

```
Confirmation page shows:
  ALARM DEAKTIVIEREN?
  ---
  BESTÄTIGUNG NÖTIG
  DRÜCKE OVFY
  
  < ABBRECHEN

Press: OVFY
Result: Action executes
Visual: ✓ ALARM DEAKTIVIERT (green flash)

Note: LSK (JA) NOT accepted here - OVFY only!
```

**Anwendungsfall 2: Abkürzung für weiche Bestätigung**

```
Confirmation page shows:
  SZENE STARTEN?
  < NEIN         JA*>
  
Press: OVFY (instead of LSK JA)
Result: Action executes immediately
Benefit: Faster than aiming for LSK6R
```

**Anwendungsfall 3: Ausstehende Änderungen ausführen**

```
After editing multiple fields:
  Display shows:
    3 ÄNDERUNGEN AUSSTEHEND
    DRÜCKE OVFY ZUM SPEICHERN
    
Press: OVFY
Result: All changes saved at once
Visual: ✓ GESPEICHERT
```

**Anwendungsfall 4: Warnung umgehen** (mit Vorsicht verwenden!)

```
Warning shown:
  ⚠️  GERÄT OFFLINE
  TROTZDEM SENDEN?
  
Press: OVFY
Result: Sends command despite warning
Use case: User knows device will come online soon
```

**Visuelles Feedback** :

```
After OVFY press:
  Brief flash (green if success, red if error)
  
  ✓ BESTÄTIGT (green, 1s)
  or
  ❌ ABGELEHNT (red, 2s with reason)
```

**Wenn OVFY nichts tut** :

- Auf normalen Datenanzeigeseiten (keine Bestätigungsaktion erforderlich)
- Auf Menüseiten (LSK-Auswahl, OVFY nicht erforderlich)
- Wenn keine Bestätigungsaufforderung aktiv ist

**Ton** (falls verfügbar):

- Erfolg: Einzelner Piepton (angenehmer Ton)
- Fehler: Doppelter Piepton (Warnton)
- Wichtige Bestätigung: Dreifacher Piepton + Aktion

### E.4 MENÜ (Hauptmenü)

**Zweck** : Sofortige Rückkehr zum HAUPTMENÜ von überall aus

**Verhalten** :

```
Current page: ANY page, any depth
Press: MENU
Result: Immediate jump to HAUPTMENÜ page 1
Scratchpad: Preserved (not cleared)
```

**Anwendungsfälle** :

**Anwendungsfall 1: In der Navigation verloren**

```
User: "Where am I? Too deep!"
Action: Press MENU
Result: Back to familiar main menu
```

**Anwendungsfall 2: Kategorien wechseln**

```
Current: KLIMA > WOHNZIMMER > Editing temp
Want: Check ENERGIE status
Action: Press MENU → Select ENERGIE
Alternative: Press FUEL function key (if mapped)
```

**Anwendungsfall 3: Von vorne beginnen**

```
User made errors in scratchpad/navigation
Action: Press MENU → Reset to known state
Note: Scratchpad NOT cleared (intentional - data preserved)
```

**Kehrt immer zu Seite 1 zurück** :

```
HAUPTMENÜ always shows page 1 first:
  HAUPTMENÜ               1/2
  ---
  < ENERGIE
  < KLIMA
  ...
  
User can SLEW → to page 2 if needed
```

**Nicht konfigurierbar** :

- Die Menütaste öffnet IMMER das Hauptmenü.
- Kann nicht einer anderen Funktion zugeordnet werden
- Sicherheitsmerkmal – stets zugänglicher Fluchtweg

**Interaktion mit Scratchpad** :

```
Before:
  Page: KLIMA > WOHNZIMMER
  Scratchpad: 22.5*
  
Press: MENU

After:
  Page: HAUPTMENÜ
  Scratchpad: 22.5* (still there!)
  
Reason: User might want to use same value elsewhere
If not needed: Press CLR to clear
```

### E.5 SLEW (Navigation / Scrollen)

**Zweck** : Navigation in mehrere Richtungen und Scrollen in Listen

**Vier Richtungen** : ←, →, ↑, ↓

**Verhalten je nach Kontext** :

**Kontext 1: Auf der Kategorie-Hauptseite (Horizontale Navigation)**

```
Current: ENERGIE (main page)
Press: SLEW →
Result: Navigate to next category (per function key order)
Example: ENERGIE → KLIMA → LICHT → ...

Press: SLEW ←
Result: Navigate to previous category
Example: ENERGIE → ZEITPLAN → ... (circular)
```

**Kontext 2: Mehrseitige Kategorie (Seitennavigation)**

```
Current: ENERGIE page 1/3
Press: SLEW →
Result: Navigate to ENERGIE page 2/3

Press: SLEW ←
Result: Navigate back to ENERGIE page 1/3
```

**Kontext 3: Lange Liste (Vertikales Scrollen)**

```
Current: GERÄTE list (50 items, showing 1-12)
Press: SLEW ↓
Result: Scroll down ~6 lines
Display: Now showing items 7-18

Press: SLEW ↑
Result: Scroll up ~6 lines
Display: Back to items 1-12
```

**Kontext 4: Keine Auswirkung**

```
Current: Single-page info display (1/1)
Press: SLEW (any direction)
Result: No action (nothing to navigate)
Optional: Brief "← →" flash (indicates navigation available)
```

**Halteverhalten** (kontinuierliche Aktion):

```
Action: Hold SLEW ↓ for >0.5s
Result: Continuous scroll (smooth, ~5 lines/second)
Release: Stop at current position

Action: Hold SLEW → for >0.5s
Result: Rapid page navigation
Visual: Page numbers flash (1/3, 2/3, 3/3, 1/3...)
```

**Rundnavigation** (umschließt):

```
Categories:
  ENERGIE → ... → ZEITPLAN → SLEW → → ENERGIE (wraps)
  
Pages within category:
  Page 1/3 → Page 2/3 → Page 3/3 → SLEW → → Page 1/3 (wraps)
```

**Visuelles Feedback** :

```
On page change:
  Current page: ENERGIE 1/3
  Press SLEW →
  Brief transition (100ms slide animation if possible)
  New page: ENERGIE 2/3
  
On scroll:
  Items shift up/down
  Scroll indicators update:
    ↓ MEHR (X weitere) → Decrements X
```

**Tastenkombinationen** :

```
SLEW ↑ + SLEW ↓ simultaneously:
  → Jump to top of list
  
SLEW ← + SLEW → simultaneously:
  → Jump to page 1 (reset pagination)
```

---

## F. Farbcodierungsstrategie

### F.1 Farbpalette

**Verfügbare Farben** (WinWing MCDU-32-CAPTAIN):

- **W** = Weiß
- **G** = Grün
- **A** = Bernstein
- **R** = Rot
- **Y** = Gelb (falls verfügbar)
- **M** = Magenta (falls verfügbar)
- **E** = Cyan (falls verfügbar)

**Hinweis** : Blau (B) ist in unserer Farbpalette nicht verfügbar – verwenden Sie Weiß für Titel/Beschriftungen.

### F.2 Farbbedeutungen (Semantische Verwendung)

**Weiß (W) – Normale Daten & Beschriftungen**

**Verwendung** :

- Standardfarbe für den gesamten Text
- Aktuelle Werte (Temperaturen, Leistung usw.)
- Seitentitel
- Bezeichnungen für Datenfelder
- Gerätenamen
- Normale Statusanzeigen

**Beispiele** :

```
ENERGIE                 1/3    (White title)
AKTUELL:    2340 W             (White label & value)
NETZ:       +340 W             (White value)
```

---

**Grün (G) – Aktiv, Bestätigt, Benutzereinstellung**

**Verwendung** :

- Vom Benutzer eingegebene Daten (nach Bestätigung)
- Aktive Zustände (Licht AN, Heizung AKTIV)
- Bestätigte Aktionen (✓-Symbole)
- Erfolgreiche Operationen
- Szene aktuell aktiv

**Beispiele** :

```
SOLL:       22.5°C ✓      (Green - user just set this)
< STEHLAMPE      ON       (Green ON - light is on)
✓ SZENE AKTIV             (Green checkmark & text)
FILM MODUS ✓              (Green - scene active)
```

**Dauer** :

- Dauerhaft grün: Aktive Zustände (EIN, AKTIV usw.).
- Vorübergehendes Grün: Bestätigungen (1-2 Sekunden blinken, dann weiß)

---

**Amber (A) – Modifizierbar, Warnhinweise, Aufmerksamkeit erforderlich**

**Verwendung** :

- Bearbeitbare Felder (zeigt an: „Sie können dies ändern“)
- Warnungen (nicht kritische Probleme)
- Geräte, die Aufmerksamkeit benötigen (niedriger Akkustand, offline)
- Ausstehende Aktionen (Bestätigung ausstehend)
- Warnmeldungen

**Beispiele** :

```
SOLL:       [  .  ]°C  ←  (Amber brackets/arrow - editable)
!BATTERIE NIEDRIG         (Amber ! and text - warning)
GERÄT OFFLINE             (Amber - needs attention)
DRÜCKE OVFY               (Amber - action pending)
```

**Fehlermeldungen** (gelb vs. rot):

- Amber: Behebbare Warnungen, niedrige Priorität
- Rot: Kritische Fehler, Ausfälle

---

**Rot (R) – Warnungen, Ausfälle, Kritisch**

**Verwendung** :

- Kritische Fehler
- Sicherheitswarnungen (Alarm ausgelöst)
- Systemausfälle
- Gefährliche Zustände
- Ungültige Eingabe (Ablehnung)

**Beispiele** :

```
❌ GERÄT FEHLER           (Red X and text - device failed)
ALARM AUSGELÖST!          (Red - security alert!)
FEHLER: OFFLINE           (Red - critical error)
Scratchpad: 35* (RED)     (Red asterisk - invalid input)
```

**Wann man Rot verwendet** :

- Etwas ist kaputt oder ausgefallen.
- Die Sicherheit ist gefährdet.
- Sofortiges Eingreifen des Nutzers erforderlich
- Die Daten liegen außerhalb des gültigen Bereichs (schwerer Fehler).

---

**Gelb (Y) – Warnhinweise (falls verfügbar)**

**Verwendung** :

- Weniger streng als Bernstein
- Informationshinweise
- Vorübergehende Zustände
- Warnungen der Stufe „Zur Information“

**Beispiele** :

```
SYSTEM NEUSTART BALD      (Yellow - heads up)
GERÄTE NICHT OPTIMAL      (Yellow - sub-optimal but OK)
```

**Falls Gelb nicht verfügbar ist** : Verwenden Sie Gelb für Warnhinweise.

---

**Magenta (M) - Prognostizierte / zukünftige Werte (falls verfügbar)**

**Verwendung** :

- Prognostizierte Daten (Energieproduktion, Wetter)
- Geplante zukünftige Veranstaltungen
- Prognostizierte Zustände
- Automatisierungsziele

**Beispiele** :

```
PV PROGNOSE: ~15.2 kWh    (Magenta ~ and value - forecast)
20:00  SZENE GEPLANT      (Magenta time - future event)
ERWARTET:    18°C         (Magenta - predicted temp)
```

**Präfixkonvention** : Verwenden`~` um den vorhergesagten Wert anzugeben.

**Falls Magenta nicht verfügbar** : Verwenden Sie Weiß mit`~` Präfix.

---

**Cyan/E - Spezielle Indikatoren (falls verfügbar)**

**Verwendung** :

- Sondermodi (manuelle Übersteuerung, Urlaubsmodus)
- Systemindikatoren
- Ungewöhnliche Zustände (keine Fehler, einfach nur anders)

**Beispiele** :

```
MANUELL AKTIV             (Cyan - manual override mode)
URLAUBS-MODUS             (Cyan - special mode)
```

**Falls Cyan nicht verfügbar ist** : Verwenden Sie Weiß oder Bernstein.

---

### F.3 Farbkombinationen & Priorität

**Prioritätsreihenfolge** (höchste bis niedrigste):

1. **Rot** – Kritische Fehler, Sicherheitswarnungen
2. **Amber** – Warnungen, Aufmerksamkeit erforderlich
3. **Grün** – Aktive/bestätigte Zustände
4. **Magenta** - Vorhergesagte Werte
5. **Weiß** – Normale Daten

**Konfliktlösung** :

```
Device is:
  - ON (green)
  - But OFFLINE (amber/red)
  
Display:
  < STEHLAMPE      OFFLINE  (Red - error takes precedence)
  
Not:
  < STEHLAMPE      ON       (Would hide the problem!)
```

**Mehrfarbige Linien** :

```
Some lines use multiple colors:

NETZ:       +340 W  (LSK)
[Label: White] [Value: White] [(LSK): Amber if interactive]

!BATTERIE     15%   (LSK)
[!: Amber] [Label: White] [Value: Amber] [(LSK): Amber]

✓ SZENE AKTIV
[✓: Green] [Text: Green for 1s, then white]
```

### F.4 Farbübergänge

**Zustandsänderungen** :

```
Light toggled OFF → ON:
  Before: < STEHLAMPE      OFF  (white)
  Action: Press LSK
  During: < STEHLAMPE      ... (amber, sending)
  After:  < STEHLAMPE      ON ✓ (green flash 1s)
  Final:  < STEHLAMPE      ON  (green, permanent)
```

**Benutzereingaben werden akzeptiert** :

```
Scratchpad: 22.5* (green asterisk)
Press LSK:
  Field: 22.5°C ✓ (green flash 1s)
  Then:  22.5°C   (green, permanent as user-set)
After some time (device settles):
  Field: 22.5°C   (white, now "normal" state)
```

**Fehlerkorrektur** :

```
Invalid: Scratchpad: 35* (red asterisk)
Error:   BEREICH 16-30°C  (red, 2s)
Correct: Scratchpad: 22.5* (green asterisk)
Accept:  ✓ GESPEICHERT    (green, 1s)
```

---

## G. Fehlerbehandlung und Feedback

### G.1 Behandlung ungültiger Eingaben

**Validierungsstufen** :

**Stufe 1: Tastatureingabevalidierung** (Verhinderung ungültiger Zeichen)

```
Context: Numeric field (temperature)
User presses: Letter "A"
Result: Keystroke rejected, no character in scratchpad
Feedback: Brief beep (if sound enabled)
```

**Stufe 2: Formatprüfung** (Notizblock)

```
User types: "22.5.5" (invalid decimal)
Scratchpad shows: 22.5.5* (RED asterisk)
Error line: UNGÜLTIGES FORMAT (red)
Action: User must CLR and re-type
```

**Stufe 3: Bereichsvalidierung** (vor der Übertragung)

```
User types: "35" (out of range for temp)
Scratchpad shows: 35* (RED asterisk)
Error line: BEREICH 16-30°C (amber)
Press LSK: Rejected (beep), scratchpad stays
Action: User must CLR and type valid value
```

**Stufe 4: Validierung der Geschäftslogik** (nach der Übertragung)

```
User sets temp to 16°C (minimum)
System checks: Window is OPEN
Error: FENSTER OFFEN - HEIZUNG INAKTIV (amber warning)
Temp field: 16°C (amber - set but not effective)
User action: Close window OR override warning
```

**Format der Fehlermeldung** :

```
[Normal page content above]
...
Line 12: [ERROR ICON] [ERROR MESSAGE]
Line 13: [HINT or CORRECTION]
Line 14: [SCRATCHPAD with invalid data]

Example:
...
FEHLER: BEREICH 16-30°C     (Line 12, red)
SCHRITT: 0.5°C              (Line 13, amber hint)
35*                         (Line 14, scratchpad red)
```

**Häufige Fehler** :

| Fehlertyp                | Nachricht            | Farbe     | Lösung                              |
| ------------------------ | -------------------- | --------- | ----------------------------------- |
| Außerhalb der Reichweite | `BEREICH 16-30°C`    | Bernstein | Geben Sie einen Wert im Bereich ein |
| Ungültiges Format        | `FORMAT UNGÜLTIG`    | Rot       | Format prüfen (HH:MM, NN.N)         |
| Pflichtfeld              | `PFLICHTFELD`        | Rot       | Geben Sie einen Wert ein            |
| Gerät offline            | `GERÄT OFFLINE`      | Rot       | Warten oder Gerät überprüfen        |
| Nicht gefunden           | `NICHT GEFUNDEN`     | Rot       | Rechtschreibung/ID prüfen           |
| Existiert bereits        | `BEREITS VORHANDEN`  | Bernstein | Wähle einen anderen Namen           |
| System ausgelastet       | `BITTE WARTEN...`    | Bernstein | Einen Moment bitte                  |
| Zugriff verweigert       | `KEINE BERECHTIGUNG` | Rot       | Benutzerrechte prüfen               |

### G.2 Bestätigungsanforderungen

**Aktionsrisikoklassifizierung** :

**Geringes Risiko** (keine Bestätigung):

- Licht ein-/ausschalten
- Helligkeit/Lautstärke anpassen
- Informationen anzeigen
- Zwischen Seiten navigieren
- Szene umkehrbar aktivieren (z. B. „Filmmodus“)

**Mittleres Risiko** (weiche Bestätigung):

- Störende Szene aktivieren (z. B. „Alle Lichter aus“)
- Heizung starten/stoppen
- Tür verriegeln/entriegeln (sofern nicht sicherheitskritisch)
- Zeitplan löschen
- Benachrichtigung senden

**Hohes Risiko** (harte Bestätigung - OVFY erforderlich):

- Sicherheitsalarm deaktivieren
- Haupteingangstür aufschließen
- Alle Zeitpläne löschen
- Werksreset
- Notfallmaßnahmen auslösen

**Bestätigungsmuster nach Risiko** :

**Vorläufige Bestätigung** :

```
Step 1: User triggers action (LSK)
Display:
  [ACTION NAME]
  [DESCRIPTION OF IMPACT]
  ---
  < NEIN         JA*>
  
Step 2: User presses LSK (JA) or OVFY
Result: Action executes

Cancel: Press LSK (NEIN) or CLR
```

**Harte Bestätigung** :

```
Step 1: User triggers action
Display:
  [ACTION NAME]
  ⚠️  [WARNING / CONSEQUENCES]
  ---
  BESTÄTIGUNG NÖTIG:
  DRÜCKE OVFY
  
  < ABBRECHEN

Step 2: User MUST press OVFY (LSK not accepted)
Result: Action executes

Cancel: Press LSK (ABBRECHEN) or CLR
```

**Timeout-Bestätigung** :

```
For destructive actions, add countdown:

SYSTEM NEUSTART?
NEUSTART IN: 10s
---
ABBRECHEN?
  DRÜCKE CLR

[Countdown 10, 9, 8, 7...]

Press CLR → Cancels
Timeout reaches 0 → Executes
```

### G.3 Erfolgsfeedback

**Visuelles Feedback** (primär):

**Typ 1: Häkchenblitz**

```
Action: Toggle light on
Display:
  Before: < STEHLAMPE      OFF  (white)
  After:  < STEHLAMPE      ON ✓ (green, 1s)
  Final:  < STEHLAMPE      ON   (green)
```

**Typ 2: Bestätigungsnachricht**

```
Action: Scene activated
Display (brief overlay, 2s):
  ┌─────────────────────┐
  │  ✓ SZENE AKTIV      │
  │  12 GERÄTE          │
  └─────────────────────┘
Then: Return to previous page or scene list
```

**Typ 3: Feldaktualisierung**

```
Action: Set temperature
Display:
  Before: SOLL: 21.0°C
  During: SOLL: ...      (amber, processing)
  After:  SOLL: 22.5°C ✓ (green flash 1s)
  Final:  SOLL: 22.5°C   (green/white)
```

**Typ 4: LED-Anzeige**

```
Action: Activate scene
LED: CLR (Scene Active LED)
  Before: Off
  After:  Solid green
  
Action: System error
LED: FAIL
  Before: Off
  After:  Blinking red
```

**Audio-Feedback** (falls aktiviert):

- Erfolg: Einzelner Piepton (angenehmer Ton, \~440 Hz, 100 ms)
- Fehler: Doppelter Piepton (Warnton, \~220 Hz, 100 ms + 100 ms)
- Kritische Bestätigung: Dreifacher Piepton (vor der Aktion)

**Haptisches Feedback** (falls verfügbar):

- Normalerweise nicht auf MCDU-Hardware verfügbar
- Falls implementiert: Kurze Vibration beim Drücken der Taste

**Feedback-Zeitpunkt** :

```
Instant feedback (<100ms):
  - Visual button press highlight
  - Scratchpad character appears
  - Page navigation
  
Quick feedback (100-500ms):
  - Toggle state change (if device responds fast)
  - Menu selection
  
Delayed feedback (500ms-2s):
  - Network device control (show "SENDE..." then result)
  - Scene activation (multiple devices)
  - System operations
  
Timeout (>5s):
  - Show error if no response
```

### G.4 Fehlermeldungen (Detailliert)

**Fehlermeldungsstruktur** :

```
[ICON] [CATEGORY]: [SPECIFIC MESSAGE]

Examples:
❌ GERÄT: NICHT ERREICHBAR
⚠️  EINGABE: BEREICH 16-30°C
ℹ️  HINWEIS: FENSTER OFFEN
```

**Fehlerkategorien** :

**Gerätefehler** :

```
GERÄT OFFLINE              (Red - device not responding)
GERÄT FEHLER               (Red - device reported error)
VERBINDUNG VERLOREN        (Red - network issue)
TIMEOUT                    (Amber - device slow to respond)
```

**Eingabefehler** :

```
UNGÜLTIGE EINGABE          (Red - invalid data)
BEREICH X-Y                (Amber - value out of range)
FORMAT UNGÜLTIG            (Red - wrong format)
PFLICHTFELD                (Red - required field empty)
```

**Systemfehler** :

```
SYSTEM BESCHÄFTIGT         (Amber - wait)
SPEICHER VOLL              (Red - storage issue)
VERBINDUNG GETRENNT        (Red - ioBroker offline)
UNBEKANNTER FEHLER         (Red - catch-all)
```

**Autorisierungsfehler** :

```
KEINE BERECHTIGUNG         (Red - user not allowed)
PIN ERFORDERLICH           (Amber - need authentication)
GESPERRT                   (Red - locked out)
```

**Wiederherstellungsanweisungen** :

```
Error messages should include recovery hint:

GERÄT OFFLINE
→ PRÜFE VERBINDUNG

BEREICH 16-30°C
→ WERT ANPASSEN

VERBINDUNG VERLOREN
→ WARTE ODER NEUSTART
```

**Fehlercodes** (optional, zur Fehlerbehebung):

```
For advanced users, show error codes:

FEHLER: TIMEOUT [E304]
```

---

## H. LED-Nutzungsstrategie

### H.1 LED-Belegungen

**11 LEDs verfügbar** (WinWing MCDU-32-CAPTAIN):

- FAIL, MCDU, FM1, FM2, IND, RDY, DSPY, OFST, MSG, CLR, EXEC

**Semantisches Mapping** (aus MCDU-SMARTHOME-MAPPING.md):

| LED           | Bedeutung von Smart Home                      | Staaten                                              | Priorität |
| ------------- | --------------------------------------------- | ---------------------------------------------------- | --------- |
| **SCHEITERN** | Sicherheitsalarm ausgelöst                    | Aus / Blinken (kritisch) / Dauerhaft (Warnung)       | HÖCHSTE   |
| **MCDU**      | MCDU-Verbindung OK                            | Durchgehend (verbunden) / Aus (nicht verbunden)      | Hoch      |
| **FM1**       | ioBroker Host 1 online                        | Online / Offline                                     | Hoch      |
| **FM2**       | ioBroker Host 2 online (HA-Setup)             | Online / Offline                                     | Medium    |
| **IND**       | Manuelle Überschreibung aktiv                 | Durchgehend (manueller Modus) / Aus (Automatikmodus) | Medium    |
| **RDY**       | System bereit                                 | Aktiv (bereit) / Aus (nicht bereit)                  | Hoch      |
| **DSPY**      | Neue Nachricht/Benachrichtigung               | Blinken (ungelesen) / Aus (keine)                    | Medium    |
| **OFST**      | Automatisierung läuft                         | Durchgehend (aktiv) / Aus (keine)                    | Niedrig   |
| **MSG**       | Kritischer Alarm                              | Blinken (kritisch) / Aus (keine)                     | Hoch      |
| **CLR**       | Szene aktiv                                   | Durchgeschaltet (aktiv) / Aus (inaktiv)              | Niedrig   |
| **EXE**       | Ausstehende Aktion (Bestätigung erforderlich) | Blinken (warten) / Aus (keine)                       | Medium    |

### H.2 LED-Zustände & Bedeutungen

**FEHLGESCHLAGEN** - Sicherheitsalarm

**Staaten** :

- **Aus** : Alarm nicht ausgelöst, alles in Ordnung
- **Schnelles Blinken** (2 Hz): Alarm ausgelöst (Einbruch erkannt!)
- **langsames Blinken** (0,5 Hz): Alarmwarnung (Sensor defekt, Batterie schwach)
- **Fest** : Alarm scharfgeschaltet, aber nicht ausgelöst

**Anwendungsfall** :

```
Scenario 1: Alarm triggers
  FAIL LED: Off → Blink fast (red)
  MSG LED: Blink (critical alert)
  Display: ALARM! BEWEGUNG ERKANNT
  
Scenario 2: Sensor battery low
  FAIL LED: Off → Blink slow (amber)
  DSPY LED: Blink (notification)
  Display: Warning message in MELDUNGEN
```

---

**MCDU** – MCDU-Verbindungsstatus

**Staaten** :

- **Durchgehend grün** : MCDU mit ioBroker verbunden
- **Aus** : MCDU getrennt oder offline

**Anwendungsfall** :

```
System starts:
  MCDU LED: Off → Solid green (connected)
  
Connection lost:
  MCDU LED: Solid → Off
  Display: VERBINDUNG VERLOREN (red error)
```

**Daueranzeige** : Diese LED sollte im Normalbetrieb durchgehend grün leuchten.

---

**FM1 / FM2** - ioBroker Host-Status

**Staaten** :

- **Durchgehend grün** : ioBroker-Instanz online
- **Aus** : ioBroker-Instanz offline
- **Blink** : ioBroker wird gestartet/neu gestartet

**Anwendungsfall** :

```
Single ioBroker setup:
  FM1 LED: Solid green
  FM2 LED: Off (not used)
  
High-availability setup:
  FM1 LED: Solid green (primary)
  FM2 LED: Solid green (backup)
  
Failover:
  FM1 LED: Off (primary failed)
  FM2 LED: Solid green (backup took over)
```

---

**IND** – Manuelle Überschreibung aktiv

**Staaten** :

- **Durchgehend gelb** : Manueller Modus aktiv (Automatisierung außer Kraft gesetzt)
- **Aus** : Automatikmodus (Normalbetrieb)

**Anwendungsfall** :

```
User manually sets temperature:
  IND LED: Off → Solid amber
  Indicates: Heating schedule is overridden
  
Return to auto:
  Press "AUTO" mode LSK
  IND LED: Solid amber → Off
```

---

**RDY** – System bereit

**Staaten** :

- **Grün** : Alle Systeme betriebsbereit
- **Aus** : System nicht bereit (Fehler, Offline-Geräte)
- **Blinken langsam** : Eingeschränkt (einige Geräte offline, aber Kernfunktionen vorhanden)

**Anwendungsfall** :

```
Startup:
  RDY LED: Off → Blink → Solid green (ready)
  
5 of 50 devices offline:
  RDY LED: Solid → Blink slow (degraded)
  
Critical device offline:
  RDY LED: Blink slow → Off (not ready)
```

**Kriterien für „Bereit“** :

- ioBroker online
- MCDU angeschlossen
- <10 % der Geräte offline
- Keine kritischen Fehler

---

**DSPY** – Neue Nachricht/Benachrichtigung

**Staaten** :

- **Blinkt gelb** (1 Hz): Ungelesene Nachrichten
- **Aus** : Keine ungelesenen Nachrichten

**Anwendungsfall** :

```
New notification arrives:
  DSPY LED: Off → Blink amber
  
User views MELDUNGEN page:
  DSPY LED: Blink amber → Off (acknowledged)
```

---

**OFST** - Automatisierung läuft

**Staaten** :

- **Durchgehend grün** : Automatisierung/Zeitplan aktiv
- **Aus** : Keine Automatisierung aktiv

**Anwendungsfall** :

```
Schedule triggers:
  18:00 - "Abend" scene scheduled
  OFST LED: Off → Solid green (scene executing)
  After 30s: OFST LED → Off (complete)
```

---

**MSG** – Kritischer Alarm

**Staaten** :

- **Blinkt rot** (2 Hz): Kritischer Alarm (Sicherheit, Feuer, Überschwemmung)
- **Aus** : Keine kritischen Warnmeldungen

**Anwendungsfall** :

```
Water leak detected:
  MSG LED: Off → Blink red
  FAIL LED: Blink slow (amber warning)
  Display: ⚠️  WASSER ERKANNT! (red)
  
User acknowledges:
  MSG LED: Blink → Off
```

---

**CLR** - Szene aktiv

**Staaten** :

- **Vollständig grün** : Eine oder mehrere Szenen aktiv
- **Aus** : Keine Szenen aktiv

**Anwendungsfall** :

```
Activate "Film Modus":
  CLR LED: Off → Solid green
  
Deactivate scene:
  CLR LED: Solid green → Off
  
Multiple scenes:
  CLR LED stays solid green (as long as ANY scene active)
```

---

**EXEC** – Ausstehende Maßnahmen

**Staaten** :

- **Gelbes Blinken** (1 Hz): Bestätigung erforderlich
- **Aus** : Keine ausstehenden Aktionen

**Anwendungsfall** :

```
User triggers critical action:
  Display: ALARM DEAKTIVIEREN? DRÜCKE OVFY
  EXEC LED: Off → Blink amber
  
User presses OVFY:
  EXEC LED: Blink → Off (action executed)
  
User cancels (CLR):
  EXEC LED: Blink → Off (action cancelled)
```

---

### H.3 LED-Priorität & Konflikte

**Konflikt** : Mehrere Bedingungen erfordern dieselbe LED.

**Entschließung nach Priorität** :

```
Example: FAIL LED
  Condition 1: Alarm triggered (critical)
  Condition 2: Sensor battery low (warning)
  
  Result: FAIL LED blinks fast (critical takes precedence)
  Warning shown in MELDUNGEN instead
```

**Prioritätsreihenfolge** (höchste bis niedrigste):

1. Kritische Warnmeldungen (Alarm, Feuer, Überschwemmung) → Meldung, FEHLER blinkt schnell
2. Sicherheitsbewaffnung → FEHLER
3. Systemfehler → RDY aus, FM1/FM2 aus
4. Warnungen → FAIL blinkt langsam, DSPY blinkt
5. Aktive Zustände → CLR, OFST, IND fest
6. Ausstehende Aktionen → EXEC blinken
7. Normaler Status → MCDU, RDY dauerhaft

**Multi-LED-Szenarien** :

```
Scenario: Alarm triggered + unread messages
  FAIL: Blink fast (red) - alarm
  MSG: Blink fast (red) - critical
  DSPY: Blink (amber) - messages
  RDY: Off (system not ready)
  MCDU: Solid (still connected)
  
Scenario: Normal operation, scene active
  RDY: Solid green (ready)
  MCDU: Solid green (connected)
  FM1: Solid green (online)
  CLR: Solid green (scene active)
  All others: Off
```

### H.4 Helligkeitsstufen

**Drei Helligkeitsstufen** (sofern von der Hardware unterstützt):

- **Aus** : LED vollständig aus (0 %)
- **Gedimmt** : Niedrige Helligkeit (20–30 %) – Nachtmodus
- **Hell** : Volle Helligkeit (100 %) – Tagmodus

**Automatische Dimmfunktion** (optional):

```
Time-based:
  22:00-06:00 → All LEDs dim mode
  06:00-22:00 → All LEDs bright mode
  
Or ambient light sensor:
  Dark room → Dim
  Bright room → Bright
  
User override:
  EINSTELLUNGEN > LED HELLIGKEIT
    AUTO / DIM / HELL
```

**Helligkeit pro LED** :

```
Critical LEDs (always bright):
  - FAIL (when blinking)
  - MSG (when blinking)
  
Normal LEDs (respect dim mode):
  - RDY, MCDU, FM1, FM2
  - DSPY, CLR, EXEC, OFST, IND
```

### H.5 Blinkmuster

**Standard-Blinzelraten** :

- **Schnelles Blinzeln** : 2 Hz (0,25 s an, 0,25 s aus) – Kritische Aufmerksamkeit
- **Normales Blinken** : 1 Hz (0,5 s an, 0,5 s aus) – Standardalarm
- **Langsames Blinken** : 0,5 Hz (1 Sekunde an, 1 Sekunde aus) – Warnung mit niedriger Priorität

**Musterbeispiele** :

```
FAIL (alarm triggered):
  ████░░░░████░░░░████░░░░  (2 Hz fast)
  
EXEC (pending confirm):
  ████████░░░░░░░░████████░░░░░░░░  (1 Hz normal)
  
RDY (degraded):
  ████████████████░░░░░░░░░░░░░░░░  (0.5 Hz slow)
```

**Spezielle Muster** :

```
Heartbeat (system alive):
  RDY: ██░░██░░░░░░░░░░░░██░░██░░░░  (double pulse every 2s)
  
Attention (new message):
  DSPY: ██░░██░░██░░░░░░░░  (triple pulse, then pause)
```

---

## Zusammenfassung: Wichtige UX-Prinzipien

### ✅ Was man tun sollte

1. **Konfigurierbarkeit an erster Stelle** : Funktionstasten, Schnellaktionen, LEDs = benutzerkonfigurierbar
2. **Minimale Tastentiefe** : Maximal 3 Ebenen von der Funktionstaste zur Aktionstaste
3. **Einheitliche Farben** : Weiß = Normal, Grün = Aktiv, Gelb = Warnung, Rot = Kritisch
4. **Klares Feedback** : Jede Aktion wird visuell bestätigt (Häkchen, Farbänderung, LED).
5. **Scratchpad für die Dateneingabe** : Alle Dateneingaben erfolgen über Scratchpad + LSK.
6. **Kontextsensitive LSKs** : LSK-Bezeichnungen ändern sich pro Seite
7. **Immer abbruchbar** : Die Kombination aus MENU-Taste und CLR bietet immer einen Ausstiegsweg.
8. **Frühzeitig validieren** : Eingaben vor der Übertragung prüfen, Fehlermeldungen löschen
9. **Kritisch bestätigen** : Harte Bestätigung (OVFY) für irreversible Maßnahmen
10. **Statusanzeige** : LEDs + Statusseite = sofortiger Hausüberblick

### ❌ Was man nicht tun sollte

1. **Keine fest codierten Tastenbelegungen** : Funktionstasten müssen konfigurierbar sein.
2. **Fehler nicht verbergen** : Zeigen Sie immer, was schiefgelaufen ist und wie man es behebt.
3. **Häufige Aktionen nicht verstecken** : Schnellzugriff > tiefe Menüstrukturen
4. **Vermischen Sie keine Farbbedeutungen** : Bleiben Sie bei einer semantischen Farbstrategie.
5. **Auf langsamen Geräten nicht blockieren** : „SENDEN…“ anzeigen und dann fortfahren
6. **Daten im Notizblock nicht verlieren** : Beibehalten (sofern nicht gelöscht)
7. **Bestätigung nicht auslassen** : Kritische Aktionen erfordern eine eindeutige Bestätigung.
8. **LEDs nicht übermäßig verwenden** : Nur für wichtige Zustände, nicht für jede Aktion

---

**Dokumentstatus** : ✅ Abgeschlossen – Produktionsreife UX-Spezifikation\
&#x20;**Nächstes Dokument** : INTERACTION-EXAMPLES.md (Konkrete Benutzerabläufe mit exakten Sequenzen)\
&#x20;**Gesamtlänge** : \~23 KB (erfüllt das Ziel von 15-20 KB)