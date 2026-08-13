---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-technic/README.md
title: ioBroker VIS 2 Technic Widgets
hash: Abcg2n0+2FDne7QqbLMDghBF19jYZHtcjnwNua8Jy88=
---
# IoBroker VIS 2 Technic Widgets

![NPM-Version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-technic.svg)
![Lizenz: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

Technic-Widgets für ioBroker VIS 2 mit einer einheitlichen dunkelgrünen Designsprache für die Visualisierung von Smart-Home-Anwendungen.

## Widgets
**Fenster - Wand** – Fenster- und Rollosteuerung mit SVG-Visualisierung, Umschaltung zwischen Automatik- und manuellem Modus, Positionsregler, Kontextmenü und Schnellwahltasten (0 / 25 / 50 / 75 / 100%).

**Schalter - Boolesch** – Ein-/Ausschalter mit auswählbaren SVG-Symbolen und konfigurierbaren Ein-/Aus-Farben.

**Dimmer - Licht** – 270°-Bogendimmer mit verschiebbarem Drehknopf, dynamischer Lampenstrahlanimation, Ein-/Ausschalter und Helligkeitsprozentanzeige.

## Anforderungen
- ioBroker js-controller >= 6.0.11
- ioBroker VIS 2 >= 2.0.0
- Node.js >= 20

## Installation
Die Installation erfolgt über die ioBroker-Admin-Oberfläche, indem Sie in der Adapterliste nach „vis-2-widgets-technic“ suchen.

Nach der Installation müssen Sie Ihren Browser neu laden (Strg+Umschalt+R).

## Design
Alle Widgets verwenden eine einheitliche Farbpalette:

- Türkis `#2ecfbf` – Aktiver / EIN-Zustand
- Sekundär `#5f8f8a` – Inaktiver / AUS-Zustand
- Hintergrund `#0d1820` – Widget-Hintergrund
- Text `#c8e6e3` – Beschriftungen und Text

## Changelog

### 0.1.20 (2026-06-28)
- fix: complete translations for all news entries

### 0.1.19 (2026-06-28)
- fix: remove duplicate English news translations flagged by repochecker

### 0.1.18 (2026-06-27)
- Remove postinstall script, fix i18n translations (component mode), remove demo widget and template keys

### 0.1.17 (2026-06-27)
- Release 0.1.17

### 0.1.16 (2026-06-26)
- Translate all widget names and labels to English, fix window blind open/close logic, add quick-set buttons (0/25/50/75/100%)

### 0.1.15 (2026-06-21)
- Release 0.1.15

### 0.1.14 (2026-06-21)
- Release 0.1.14

### 0.1.13 (2026-06-19)
- fix: workflow permissions and provenance flag

### 0.1.12 (2026-06-19)
- fix: enable npm provenance via GitHub Actions, remove debug script

### 0.1.11 (2026-06-19)
- fix: remove process.env/exit for compact mode compliance

### 0.1.10 (2026-06-19)
- fix: correct web restart command chaining in install.js

### 0.1.9 (2026-06-19)
- fix: call iobroker.js directly to bypass broken wrapper recursion

### 0.1.8 (2026-06-19)
- fix: capture real stderr in install.js for debugging

### 0.1.7 (2026-06-19)
- fix: persistent logging in install.js for debugging

### 0.1.6 (2026-06-19)
- fix: persistent logging in install.js for debugging

### 0.1.5 (2026-06-19)
- fix: robust install.js with retry and file verification for fresh installs

### 0.1.4 (2026-06-18)
- Initial npm release

### 0.1.3 (2026-06-18)
- Added BeleuchtungDimmer widget

### 0.1.2 (2026-05-01)
- AnAusSchalter widget with SVG icons and freely configurable colors

### 0.1.1 (2026-04-01)
- FensterNormal widget with SVG transparency and context menu

### 0.1.0 (2026-03-01)
- Initial release

## License

MIT License
Copyright (c) 2026 iobroker-community-adapters

See [LICENSE](LICENSE) for full text.