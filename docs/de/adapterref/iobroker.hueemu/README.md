---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hueemu/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hueemu@main/admin/hue-emu-logo.svg" width="48" align="top" /> ioBroker.hueemu
hash: PNYFNKNFdn+kQybZ0zLalPuIAizKMhqWXSWjxVNtmT8=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hueemu@main/admin/hue-emu-logo.svg" width="48" align="top" /> ioBroker.hueemu

![npm-Version](https://img.shields.io/npm/v/iobroker.hueemu)
![stabil](https://iobroker.live/badges/hueemu-stable.svg)
![Installationen](https://iobroker.live/badges/hueemu-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.hueemu)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Posten](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Emuliert eine [Philips Hue](https://www.philips-hue.com) Bridge (v2, BSB002), sodass ioBroker-Geräte für Clients, die nur die Hue API unterstützen, als Hue-Lampen erscheinen.

---

## Wann sollte dieser Adapter verwendet werden?
**Verwenden Sie es, wenn Sie ioBroker-Zustände von einem älteren Gerät oder einer App aus steuern möchten, die nur die Hue-API unterstützt.** Beispiele: Logitech Harmony Hub, Bosch Smart Home Controller, ältere Echo-Firmware, Wandeinbau-Touchpanels, nicht mehr unterstützte Dashboard-Apps, alte Steuerungssysteme mit einem Hue-Plugin.

### Moderne Alexa-, Google Home- oder Apple Home-Geräte – verwenden Sie stattdessen den Matter-Adapter
Alle modernen Sprachassistenten unterstützen Matter direkt. Verwenden Sie [ioBroker Matter-Adapter](https://github.com/ioBroker/ioBroker.matter) – das ist das richtige Werkzeug dafür. Dieser Adapter ist nur für Clients gedacht, die keine Matter-Option anbieten.

---

## Merkmale
- **Hue API v1** — Bridge-Modell BSB002 (Hue Bridge v2)
- **UPnP/SSDP-Erkennung** – Automatische Erkennung durch jeden Hue-kompatiblen Client
- **Direkte Zustandszuordnung** – Verweist auf jeden ioBroker-Zustand, ohne Bridge-Skripte
- **Geräteassistent** – scannt ioBroker nach kartierbaren Lampen und fügt diese automatisch hinzu oder fügt jede Lampe manuell hinzu und bearbeitet sie.
- **Lichtarten** — Ein/Aus, Dimmbar, Farbtemperatur, RGB
- **Gerätespezifische Werteskala** – Wählen Sie aus, wie Helligkeit und Sättigung in Ihrem Quellzustand gespeichert werden.
- **Persistentes TLS-Zertifikat** – Clients vertrauen der Bridge nur einmal, Neustarts behalten dieselbe Identität bei.
- **Lokalisierte Statusnamen** – Administratorbezeichnungen folgen der Systemsprache von ioBroker.
- **Automatische Migration** – ältere `createLight`-Konfigurationen werden beim ersten Start in die Administratorkonfiguration umgewandelt.

---

## Wächter / Fehlerberichterstattung
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Die Meldung erfolgt nur, wenn Sie die Fehlerberichterstattung in den ioBroker-Diagnoseeinstellungen aktiviert haben (Systemeinstellungen → Diagnose und Fehlerberichterstattung). Es wird lediglich eine anonyme Installations-ID übermittelt – kein Name, keine E-Mail-Adresse und keine IP-Adresse.

Einzelheiten und Hinweise zur Deaktivierung finden Sie in Abschnitt [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Für die Fehlerberichterstattung ist js-controller 3.0 oder neuer erforderlich.

---

## Anforderungen
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 7.8.23**

---

## Anschlüsse
| Anschluss | Protokoll | Zweck | Konfigurierbar |
| ---- | --------- | ---------------------------- | ----------------------------------- |
| 8080 | TCP/HTTP | Hue Bridge API | Ja – Clients werden über SSDP informiert |
| 1900 | UDP | SSDP/UPnP-Erkennung | Nein – durch den UPnP-Standard behoben |
| — | TCP/HTTPS | Optionales TLS (falls konfiguriert) | Ja |

---

## Konfiguration
### Netzwerkeinstellungen
| Option | Beschreibung | Standard |
| ----------------- | -------------------------------------------------------------------------------------------------------------- | ------- |
| **Host** | Netzwerkschnittstelle, an die gebunden werden soll. Wählen Sie `0.0.0.0`, um auf allen Schnittstellen zu lauschen (bleibt erreichbar, auch wenn sich die IP-Adresse ändert) | 0.0.0.0 |
| **Bekanntgegebene IP-Adresse** | Die erreichbare IP-Adresse, die Clients zur Erkennung mitgeteilt wird. Leer lassen, um die primäre Schnittstelle automatisch zu erkennen. | automatisch |
| **HTTP-Port** | Port für die Hue-API | 8080 |
| **HTTPS-Port** | Nur erforderlich, wenn ein Client auf TLS besteht; ansonsten leer lassen | — |
| **MAC-Adresse** | Bridge-MAC-Adresse (automatisch generiert, falls leer) | — |

### Hinzufügen von Geräten
Öffnen Sie den Tab **Gerätekonfiguration**. Es gibt zwei Möglichkeiten, Lampen hinzuzufügen:

**Manuell** — Klicken Sie auf **Licht hinzufügen**, geben Sie einen Namen ein, wählen Sie einen Lichttyp aus und ordnen Sie die ioBroker-Zustände dem Objektbrowser zu.

**Automatisch** – Klicken Sie auf **Suchscheinwerfer**. Der Adapter scannt Ihre Objekte nach Elementen, die wie Lichter aussehen (Ein/Aus, Dimmer, Farbtemperatur- und Farblampen) und fügt die zuordenbaren hinzu. Alle erkannten, aber nicht zuordenbaren Elemente (z. B. RGB-Kanal-Geräte) werden gemeldet, sodass Sie sie manuell hinzufügen können.

Jede Leuchte wird als Karte angezeigt – verwenden Sie **Bearbeiten**, um ihre Zuordnung zu ändern, oder **Löschen**, um sie zu entfernen.

### Unterstützte Lichtarten
| Typ | Zustände | Hue-Modell |
| --------------------- | ------------------------------------- | --------- |
| **Ein/Aus** | `on` | LWB007 |
| **Farbtemperatur** | `on`, `bri`, `ct` | LTW001 |
| **Farblicht** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |
| **Farblicht** | `on`, `bri`, `ct`, `hue`, `sat`, `xy` | LCT003 |

### Paarung
Bevor sich ein Client verbinden kann, muss die Kopplung aktiviert werden:

1. ioBroker-Objekte → `hueemu.0` → setze **`startPairing`** auf `true`
2. Starten Sie die Gerätesuche/Kopplung in Ihrer Client-App innerhalb von **50 Sekunden**.
3. Nach erfolgreicher Kopplung erscheint ein neuer Eintrag unter `hueemu.0.clients.*`

### Verbindung mit Alexa (ältere Echo-Geräte ohne Matter)
> Falls Sie bereits einen Echo besitzen, verwenden Sie stattdessen [Matter-Adapter](https://github.com/ioBroker/ioBroker.matter).

> **Tipp:** Falls Alexa die Bridge nicht finden kann, versuchen Sie, den HTTP-Port in den Adaptereinstellungen auf **80** zu ändern – einige Alexa-Firmware-Versionen erkennen Bridges nur über Port 80.

1. Kopplung aktivieren (siehe oben)
2. Alexa App → Geräte → `+` → Philips Hue
3. Die Brücke wird automatisch erkannt.

### Verbindung mit Logitech Harmony Hub
1. Kopplung aktivieren (siehe oben)
2. In der Harmony-Einrichtungssoftware: Gerät hinzufügen → Beleuchtung → Philips Hue → Bridge suchen.
3. Bestätigen Sie die Kopplung innerhalb von 50 Sekunden.

---

## Staatsbaum
```
hueemu.0.
├── startPairing         — Enable pairing mode for 50 seconds (button)
├── disableAuth          — Disable authentication (switch)
└── clients/             — Paired client devices
    └── {username}       — Client API key (created during pairing)
```

---

## Fehlerbehebung
### Upgrade von 0.x / Legacy-createLight-Modus
Wenn Sie die alte JSON-Zustandsdefinition `createLight` zur Definition von Leuchten verwendet haben, werden Ihre Geräte beim ersten Start **automatisch migriert**. Der Adapter liest Ihre vorhandenen Geräteobjekte, konvertiert sie in das neue Administratorkonfigurationsformat und startet einmal neu. Es ist kein manuelles Eingreifen erforderlich – Ihre bestehenden Skripte und Automatisierungen funktionieren weiterhin wie gewohnt.

**Optionale Verbesserung:** Das alte System nutzte interne Adapterzustände als Zwischenspeicher, wodurch separate Skripte zur Steuerung der eigentlichen Geräte erforderlich waren. Sie können nun die Adaptereinstellungen öffnen und die Zustandszuordnungen so ändern, dass sie **direkt** auf Ihre Gerätezustände verweisen (z. B. `hm-rpc.0.dimmer.LEVEL` statt `hueemu.0.1.state.bri`).

### Brücke nicht gefunden
- Stellen Sie sicher, dass der UPnP-Port (1900) nicht durch eine Firewall blockiert wird.
- Die **Host-IP** muss die tatsächliche Netzwerk-IP sein, nicht `0.0.0.0`.
- Überprüfen Sie die Firewall-Regeln auf dem ioBroker-Host.

### Client findet keine Geräte / Kopplung schlägt fehl
- Setzen Sie `startPairing` in ioBroker Objects → `hueemu.0` **bevor** Sie die Gerätesuche in Ihrem Client starten – Sie haben 50 Sekunden Zeit.
- Stellen Sie sicher, dass mindestens ein Gerät konfiguriert ist.
- Überprüfen Sie die Adapterprotokolle auf Fehler

### Statusänderungen funktionieren nicht
- Überprüfen Sie die Status-IDs in der Gerätekonfiguration
Wählen Sie im Adminbereich für jedes Gerät die passende Helligkeits-/Sättigungsskala aus: Auto, Prozent (0..100), Normalisiert (0..1) oder Farbton-Rohdaten (1..254). Ein `level.dimmer`, der Werte von 0..100 speichert, benötigt die Einstellung „Prozent“.
- Der `ct`-Wert liegt zwischen 153 und 500 (Mireds).

---

## Credits
**Originalautor:** Christopher Holomek ([@holomekc](https://github.com/holomekc))

**Modernisierung:** Krobi

---

## Unterstützung
- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub-Probleme](https://github.com/krobipd/ioBroker.hueemu/issues)

### Unterstützung der Entwicklungsabteilung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.11.0 (2026-07-09)

- The devices tab can now scan ioBroker for dimmer, colour-temperature and colour lights and add the mappable ones. Manual add still works.

### 1.10.0 (2026-07-09)

- Fixed the adapter looking like it was running but ignoring all light changes when UDP port 1900 was already in use (common on Windows); it now recovers cleanly and stays reachable
- A light's on/off source state holding text such as "off", "no" or "disabled" is now correctly read as off instead of on
- Closed a brief moment during startup where requests could still be challenged for a password even though authentication was turned off in the configuration
- Upgrading from the old light setup no longer leaves stray leftover entries behind in the object tree
- Colour coordinates written as a spaced list such as "0.3, 0.4" are now parsed correctly instead of falling back to white
- The port fields in the settings now warn you if the chosen port is already in use by another adapter instance
- Hue and colour-temperature source states can now be given a scale: hue in degrees (0–360) and colour temperature in Kelvin are converted correctly, alongside the native Hue units

### 1.9.0 (2026-06-21) — stable

- You can now listen on all network interfaces (`0.0.0.0`) and set a separate advertised IP, so discovery keeps working even if the bridge's IP address changes
- Color lights mapped with only hue or only saturation now report the correct colour instead of falling back to a default white
- Fixed already-paired clients being wrongly rejected until a restart after a transient error while loading clients at startup
- A configured source state that no longer exists now produces a one-time warning in the log instead of a silently dead light

### 1.8.1 (2026-06-12) — stable

- Number values read from light states are now parsed strictly: text with extra characters after the number falls back to the default instead of being half-parsed
- Faster bridge config responses for clients that poll every second (such as Echo devices) by reusing the timestamp formatter instead of rebuilding it on every request

### 1.8.0 (2026-06-09)

- Color lights mapped via hue and saturation (without an XY state) now report the correct color mode, so apps that honor it show the actual color instead of a default white.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2024 Christopher Holomek <holomekc.github@gmail.com>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_