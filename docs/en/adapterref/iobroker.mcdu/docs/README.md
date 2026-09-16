---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# MCDU Smart Home Controller - Documentation

Complete project documentation for the ioBroker MCDU adapter (v0.1.0 pre-release).

## Documentation Structure

### Root Documentation
- **[PAGE-CONFIGURATION-GUIDE.md](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md)** - Page configuration reference (start here for page setup)
- **[AUTOMATION-QUICKSTART.md](/#/docs/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md)** - Home automation scripting with 32 automation states
- **[MQTT-TEST-COMMANDS.md](/#/docs/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md)** - MQTT testing commands for manual debugging
- **[MULTI-COLOR-FEATURE.md](/#/docs/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md)** - Multi-color display segments (per-character colors)
- **[GETTING-STARTED.md](/#/docs/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md)** - Original scaffolding notes (historical)

### `/architecture/`
Architecture decisions and system design:
- **[ARCHITECTURE.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md)** - Overall system architecture
- **[ARCHITECTURE-DECISION.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md)** - Why ioBroker adapter approach
- **[ARCHITECTURE-REVISION.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md)** - Multi-device architecture redesign
- **[IOBROKER-ADAPTER-ARCHITECTURE.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md)** - Detailed adapter architecture

### `/research/`
Research, requirements, and analysis:
- **[RESEARCH.md](/#/docs/adapterref/iobroker.mcdu/docs/research/RESEARCH.md)** - Initial research findings
- **[REFERENCES.md](/#/docs/adapterref/iobroker.mcdu/docs/research/REFERENCES.md)** - API references and external docs
- **[ADAPTER-CREATOR-COMPARISON.md](/#/docs/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md)** - Tool comparison
- **[requirements.md](/#/docs/adapterref/iobroker.mcdu/docs/research/requirements.md)** - Project requirements

### `/ux-concept/`
UX design and user experience documentation:
- **[UX-CONCEPT.md](/#/docs/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md)** - Authentic MCDU cockpit UX patterns
- Scratchpad system, input modes, LSK behavior
- Visual feedback, validation, state machines

## Quick Links

- **Page Setup:** [PAGE-CONFIGURATION-GUIDE.md](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md)
- **Architecture Overview:** [architecture/ARCHITECTURE-REVISION.md](/#/docs/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md)
- **UX Design:** [ux-concept/UX-CONCEPT.md](/#/docs/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md)

## Technical Documentation

Main repository README: [../README.md](/#/adapters/mcdu)

For adapter code documentation, see:
- `/lib/` - Core library modules (mqtt, rendering, input, state, templates)
- `/mcdu-client/` - Raspberry Pi client ([README](/#/docs/adapterref/iobroker.mcdu/mcdu-client/README.md), [Pi Setup](https://github.com/Flixhummel/ioBroker.mcdu/blob/main/mcdu-client/PI-SETUP.md))
- `/admin/` - Admin UI configuration (jsonConfig)