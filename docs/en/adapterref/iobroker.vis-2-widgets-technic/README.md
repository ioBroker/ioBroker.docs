# ioBroker VIS 2 Technic Widgets

[![NPM version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-technic.svg)](https://www.npmjs.com/package/iobroker.vis-2-widgets-technic)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Technic widgets for ioBroker VIS 2 with a consistent dark teal design language for smart home visualization.

## Widgets

**Window - Wall** – Window and roller blind control with SVG visualization, Auto/Manual mode toggle, position slider, context menu and quick-set buttons (0 / 25 / 50 / 75 / 100%).

**Switch - Boolean** – On/off switch with selectable SVG icons and configurable on/off colors.

**Dimmer - Light** – 270° arc dimmer with draggable knob, dynamic lamp ray animation, power toggle and brightness percentage display.

## Requirements

- ioBroker js-controller >= 6.0.11
- ioBroker VIS 2 >= 2.0.0
- Node.js >= 20

## Installation

Install via the ioBroker Admin interface by searching for "vis-2-widgets-technic" in the adapter list.

After installation do a hard refresh in your browser (Ctrl+Shift+R).

## Design

All widgets use a consistent color palette:

- Teal `#2ecfbf` – Active / ON state
- Secondary `#5f8f8a` – Inactive / OFF state
- Background `#0d1820` – Widget background
- Text `#c8e6e3` – Labels and text

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