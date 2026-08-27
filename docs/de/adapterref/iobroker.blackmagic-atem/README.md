---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.blackmagic-atem/README.md
title: ioBroker.blackmagic-atem
hash: +KN6rToFPh+F/0T4I7QVCCnqccNiLeLb3bkuizXYdzg=
---
# IoBroker.blackmagic-atem

![NPM-Version](https://img.shields.io/npm/v/iobroker.blackmagic-atem.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.blackmagic-atem.svg)
![Anzahl der Installationen](https://iobroker.live/badges/blackmagic-atem-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/blackmagic-atem-stable.svg)
![Lizenz](https://img.shields.io/npm/l/iobroker.blackmagic-atem.svg)

**Tests:** ![Test und Freigabe](https://github.com/AlanSRU/ioBroker.blackmagic-atem/workflows/Test%20and%20Release/badge.svg)

Steuern Sie Blackmagic ATEM Videomixer über ioBroker – unterstützt alle über 21 ATEM-Modelle von Mini bis Constellation 4K+.

## Beschreibung
Dieser Adapter steuert die [Blackmagic Design ATEM](https://www.blackmagicdesign.com/products/atem) Videomixer werden über das Netzwerk verbunden. Dabei wird das per Reverse Engineering entwickelte ATEM-UDP-Protokoll über die [atem-connection]-Schnittstelle verwendet.](https://github.com/Sofie-Automation/sofie-atem-connection) Bibliothek und unterstützt mehr als 21 Modellvarianten – vom ATEM Mini über Television Studio bis hin zu Constellation 4K+ – mit einer fähigkeitsbasierten Zustandserzeugung, die sich an das angeschlossene Gerät anpasst.

## Merkmale
- **Programm-/Vorschau-Umschaltung** – Programm- und Vorschau-Eingänge ändern
- **Übergänge** – Schneiden, Automatik, manueller T-Bar; Mix-/Tauch-/Wisch-/DVE-/Sting-Styles mit Preisen pro Style
- **Überblenden zu Schwarz** – FTB-Rate umschalten und konfigurieren
- **Upstream-Keyer** (bis zu 4 pro M/E) — auf Luft, Typ, Füll-/Key-Quelle, Maske, Flug
- **Downstream-Keyer** (bis zu 4) — auf Sendung, Bindung, Auto, Rate, Füll-/Key-Quelle
- **Aux-Ausgänge** (bis zu 48) — Quellenausgänge
- **Audiomixer** — Master-Verstärkung/Balance, Monitor, Verstärkung/Balance/Mix pro Eingang (Classic + Fairlight)
- **Farbgeneratoren** — Farbton/Sättigung/Helligkeit
- **Streaming** — Start/Stopp, Status, verwendeter Cache (unterstützte Modelle)
- **Aufnahme** — Start/Stopp, Datenträger wechseln, Dauer, verbleibender Speicherplatz (unterstützte Modelle)
- **Medienplayer** – Quellentyp, Standbild-/Clip-Index, Wiedergabesteuerung
- **Zählung** — Programm-/Vorschau-Zählungsstatus
- **Makros** — ausführen, stoppen, fortsetzen, wiederholen, benannte Slots (bis zu 100)
- **Eingabemetadaten** — Kurz-/Langnamen, Porttyp
- **Automatische Modellerkennung** – Funktionen werden vom angeschlossenen Gerät erkannt

## Anforderungen
- js-controller >= 6.0.11
- ioBroker Admin >= 7.6.20
- Node.js >= 22
- Blackmagic ATEM-Switcher mit Netzwerkanschluss

## Installation
Installation über die ioBroker Admin-Benutzeroberfläche: **Adapter → Suche nach `blackmagic-atem` → installieren**.

## Konfiguration
1. Öffnen Sie die Adapterinstanzkonfiguration in ioBroker Admin.
2. Geben Sie die IP-Adresse Ihres ATEM-Geräts ein.
3. Wählen Sie das Modell aus (oder lassen Sie die automatische Erkennung aktiviert).
4. Passen Sie das Wiederverbindungsintervall bei Bedarf an.
5. Speichern und Adapter starten

## Staatsbaum
```
info.connection
device.{modelName, productId, videoMode, capabilities}
me[0-3].{programInput, previewInput, inTransition, transitionPosition}
me[0-3].transition.{style, mixRate, dipRate, wipeRate, dveRate, wipePattern}
me[0-3].fadeToBlack.{isFullyBlack, inTransition, rate}
me[0-3].usk[0-3].{onAir, type, fillSource, keySource, maskEnabled, flyEnabled}
commands.{cut, auto, ftb}
dsk[0-3].{onAir, tie, inTransition, rate, fillSource, keySource, auto}
aux[0-47].source
audio.master.{gain, balance, afv}
audio.monitor.{enabled, gain, mute, solo, dim}
audio.inputs.input[N].{gain, balance, mixOption}
audio.commands.resetPeaks
colorGenerator[0-1].{hue, saturation, luminance}
streaming.{status, start, stop, duration, cacheUsed}
recording.{status, start, stop, switchDisk, duration, remainingDiskSpace}
mediaPlayer[0-3].{sourceType, stillIndex, clipIndex, playing, loop, atBeginning}
tally.{programInputs, previewInputs}
macros.{run, stop, continue, isRunning, isWaiting, loop, runningIndex, recordedCount}
macros.slots[0-99].{name, isUsed, trigger}
inputs.input[N].{shortName, longName, inputId, portType}
```

Zustände werden bedingt auf Basis der erkannten/ausgewählten Modellfunktionen erstellt. Verwaiste Zustände werden bei einer Modelländerung entfernt.

## Anwendungsbeispiel
```javascript
// Switch program to camera 1
setState('blackmagic-atem.0.me0.programInput', 1);

// Perform a cut
setState('blackmagic-atem.0.commands.cut', true);

// Start streaming (supported models only)
setState('blackmagic-atem.0.streaming.start', true);

// Run macro 5
setState('blackmagic-atem.0.macros.run', 5);
```

## Eingabe-ID-Referenz
| ID | Quelle |
| ------------- | ----------------------- |
| 1–8 | Kameraeingänge |
| 0 | Schwarz |
| 1000 | Farbbalken |
| 2001–2002 | Farbgeneratoren 1, 2 |
| 3010, 3011 | Media Player 1, 2 |
| 3020, 3021 | Media Player 1, 2 Key |
| 7001–7002 | Sauberes Futter 1, 2 |
| 10010, 10011 | Programm, Vorschau |

## Protokollnotizen
Dieser Adapter verwendet das durch Reverse Engineering entwickelte ATEM-UDP-Protokoll (Port 9910), wie von der Open-Source-Community dokumentiert:

- [OpenSwitcher-Dokumentation](https://docs.openswitcher.org/)
- [atem-connection library](https://github.com/Sofie-Automation/sofie-atem-connection)

Das ATEM-Protokoll verfügt über keine Authentifizierung – ATEM-Geräte sollten sich daher in einem vertrauenswürdigen, privaten Netzwerk befinden.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.2.9 (2026-07-12)
- (Alan Paris) Made macros.run write-only (it no longer retains the last-triggered index); use macros.runningIndex to read the active macro
- (Alan Paris) Renamed recording.remainingDiskSpace to "Remaining Recording Time" and documented that its value is seconds of available recording capacity, not bytes
- (Alan Paris) Stopped writing audio.master.afvCrossfade on Fairlight models, where the state does not exist

### 0.2.8 (2026-07-05)
- (Alan Paris) Fixed upstream-keyer mask/fly enable and downstream-key pre-multiplied controls, which were writable but ignored, so they now apply to the switcher
- (Alan Paris) Master audio gain now controls Fairlight mixers correctly (previously it sent a Classic-audio command that Fairlight models ignored)
- (Alan Paris) Hid Classic-only audio controls (master balance/AFV crossfade, monitor enable/solo/dim) on Fairlight models, where they had no effect
- (Alan Paris) Added default values to all dynamically created states

### 0.2.7 (2026-07-04)
- (Alan Paris) Added a link to the Blackmagic Design ATEM product page in the README
- (Alan Paris) Clamp the reconnect interval in code so out-of-range config values cannot break the timer
- (Alan Paris) Removed the unused `pollInterval` config option (the adapter is fully push-based)
- (Alan Paris) Removed the unused `audio.master.programOutGain` state

### 0.2.6 (2026-07-04)
- (Alan Paris) Updated atem-connection to 3.9.0 and dev dependencies (@iobroker/types, rimraf)
- (Alan Paris) Extended tsconfig from @tsconfig/node22 for standardized type checking
- (Alan Paris) Switched Dependabot to cron schedules to distribute update load

### 0.2.5 (2026-07-04)
- (Alan Paris) Resolved all ESLint warnings (unawaited promises, JSDoc parameter descriptions)

### 0.2.4 (2026-07-04)
- (Alan Paris) Fixed state roles so writable transition, keyer and media-player selectors, macro run and input info states pass the ioBroker object checker
- (Alan Paris) Removed the legacy flat `transitionStyle` state on upgrade
- (Alan Paris) Use adapter-managed timers for the reconnect timeout
- (Alan Paris) Updated dependencies for repochecker compliance

### 0.2.3 (2026-05-21)
- (Alan Paris) Bump minimum Node.js to 22 and CI matrix to 22/24 for ioBroker community submission compliance
- (Alan Paris) Set `common.noGit: true` so the gitignored `build/` tree does not trip the repochecker
- (Alan Paris) Trim `common.news` to only versions published to npm

### 0.2.2 (2026-05-20)
- (Alan Paris) Switched CI publish to npm trusted publishing (OIDC)

### 0.2.1 (2026-05-20)
- (Alan Paris) Initial publication to npm registry

### 0.2.0 (2025-02-04)
- (Alan Paris) Added model selection, transition rates, auxiliary outputs, tally, audio per-input, color generators

### 0.1.0 (2025-01-29)
- (Alan Paris) Initial release: program/preview switching, DSK/USK, streaming and recording, media players, macros

## License

MIT License — see [LICENSE](LICENSE) for details.

Copyright (c) 2024-2026 Alan Paris <alan.paris@scottish.rugby>