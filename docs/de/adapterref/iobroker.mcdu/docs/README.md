---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/README.md
title: MCDU Smart Home Controller - Dokumentation
hash: OZgdvqEoiQx+AdLFsp72LzwCkCyMcHTQHQL4XN2Nqxg=
---
# MCDU Smart Home Controller – Dokumentation

Vollständige Projektdokumentation für den ioBroker MCDU-Adapter (v0.1.0 Vorabversion).

## Dokumentationsstruktur

### Root-Dokumentation

- **[PAGE-CONFIGURATION-GUIDE.md](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md)** – Referenz zur Seitenkonfiguration (hier beginnen Sie mit der Seiteneinrichtung)
- **[AUTOMATION-QUICKSTART.md](/#/docs/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md)** - Skripterstellung für die Hausautomation mit 32 Automatisierungszuständen
- **[MQTT-TEST-COMMANDS.md](/#/docs/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md)** - MQTT-Testbefehle für die manuelle Fehlersuche
- **[MULTI-COLOR-FEATURE.md](/#/docs/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md)** - Mehrfarbige Anzeigesegmente (Farben pro Zeichen)
- **[GETTING-STARTED.md](/#/docs/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md)** - Originale Gerüstbau-Notizen (historisch)

### `/architecture/`

Architekturentscheidungen und Systemdesign:

- **[ARCHITEKTUR.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md)** – Gesamtarchitektur des Systems
- **[ARCHITECTURE-DECISION.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md)** – Warum der ioBroker-Adapteransatz?
- **[ARCHITEKTUR-REVISION.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md)** – Neugestaltung der Multi-Geräte-Architektur
- **[IOBROKER-ADAPTER-ARCHITECTURE.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md)** - Detaillierte Adapterarchitektur

### `/research/`

Recherche, Anforderungen und Analyse:

- **[RESEARCH.md](/#/docs/adapterref/iobroker.mcdu/docs/research/RESEARCH.md)** – Erste Forschungsergebnisse
- **[REFERENCES.md](/#/docs/adapterref/iobroker.mcdu/docs/research/REFERENCES.md)** – API-Referenzen und externe Dokumentation
- **[ADAPTER-CREATOR-COMPARISON.md](/#/docs/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md)** - Werkzeugvergleich
- **[requirements.md](/#/docs/adapterref/iobroker.mcdu/docs/research/requirements.md)** – Projektanforderungen

### `/ux-concept/`

UX-Design und Dokumentation zur Benutzererfahrung:

- **[UX-CONCEPT.md](/#/docs/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md)** – Authentische MCDU-Cockpit-UX-Muster
- Scratchpad-System, Eingabemodi, LSK-Verhalten
- Visuelles Feedback, Validierung, Zustandsautomaten

## Schnellzugriff

- **Seiteneinrichtung:** [PAGE-CONFIGURATION-GUIDE.md](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md)
- **Architekturübersicht:** [architecture/ARCHITECTURE-REVISION.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md)
- **UX-Design:** [ux-concept/UX-CONCEPT.md](/#/docs/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md)

## Technische Dokumentation

README-Datei des Haupt-Repositorys: [../README.md](/#/adapters/mcdu)

Die Dokumentation zum Adaptercode finden Sie hier:

- `/lib/` - Kernbibliotheksmodule (mqtt, rendering, input, state, templates)
- `/mcdu-client/` - Raspberry Pi Client ( [README](/#/docs/adapterref/iobroker.mcdu/mcdu-client/README.md) , [Pi-Einrichtung](https://github.com/Flixhummel/ioBroker.mcdu/blob/main/mcdu-client/PI-SETUP.md) )
- `/admin/` - Konfiguration der Admin-Benutzeroberfläche (jsonConfig)