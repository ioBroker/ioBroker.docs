---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.renault/README.md
title: ioBroker.renault
hash: aXQPKLCE2XR/P6nxBntUGKsKjZWvkRgqrKV+VolMvhI=
---
![Logo](../../../en/adapterref/iobroker.renault/admin/renault.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.renault.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.renault.svg)
![Anzahl der Installationen](https://iobroker.live/badges/renault-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/renault-stable.svg)

# IoBroker.renault
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.renault/workflows/Test%20and%20Release/badge.svg)

## Renault / Dacia Adapter für ioBroker
Dieser Adapter verbindet ioBroker mit der My Renault / My Dacia Cloud und stellt Fahrzeugstatusdaten (Batterie, Ladevorgang, Klimaanlage, Kilometerstand, ...) sowie Fernbefehle (Klimaanlage starten, Ladevorgang starten/stoppen, Aktualisierung erzwingen) für kompatible Renault- und Dacia-Modelle wie den Renault Zoe, Megane E-Tech, Kangoo E-Tech und den Dacia Spring bereit.

## Installation / Anmeldung
1. Installieren Sie den Adapter über die ioBroker-Admin-UI.
2. Öffnen Sie die Adapterkonfiguration und geben Sie die Zugangsdaten Ihres **My Renault**- (oder **My Dacia**-)Kontos ein: App-E-Mail-Adresse und App-Passwort.
3. Stellen Sie das **Land** auf den zweistelligen Ländercode ein, der zu Ihrem Konto passt (z. B. `de`, `fr`, `it`, `es`).
4. Optional können Sie das **Abfrageintervall** in Minuten und den **API-Schlüssel** festlegen (für die automatische Erkennung leer lassen).
5. Speichern Sie die Einstellungen, und die Instanz beginnt mit dem Polling.

## Fernbedienung
Jedes Fahrzeug wird als Gerät anhand seiner Fahrzeugidentifikationsnummer (VIN) angelegt. Fernbefehle werden als Zustände unter `renault.0.<VIN>.remote.*` bereitgestellt:

| Status | Typ | Aktion |
| --------------------------- | ------- | ------ |
| `actions/hvac-start` | boolescher Wert | `true` = Start, `false` = Stopp der Vorkonditionierung |
| `actions/charging-start` | boolescher Wert | `true` = Start, `false` = Ladevorgang stoppen |
| `charge/pause-resume` | boolescher Wert | `true` = Start, `false` = Pause |
| `charge/start` | boolescher Wert | `true` = Start, `false` = Ladevorgang stoppen (Legacy-Endpunkt) |
| `refresh` | boolescher Wert | `true` = Aktualisierung der Fahrzeugdaten erzwingen |
| `refresh` | boolescher Wert | `true` = Aktualisierung der Fahrzeugdaten erzwingen |

Setzen Sie den entsprechenden Status auf `true`, um den Befehl auszulösen.

## Diskussion / Fragen
ioBroker-Forum: <https://forum.iobroker.net/topic/48074/test-adapter-renault-v0-0-x>

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 0.0.23

- (TA2k) align API headers with My Renault Android app, drop EOL Node 18/20, migrate admin UI to jsonConfig

### 0.0.22

- (TA2k) update dependencies, migrate to ESLint 10, fix repochecker findings

### 0.0.7

- (TA2k) initial release

[Older changelogs can be found here](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.