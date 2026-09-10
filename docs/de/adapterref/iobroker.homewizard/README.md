---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.homewizard
BADGE-stable: https://iobroker.live/badges/homewizard-stable.svg
BADGE-Installations: https://iobroker.live/badges/homewizard-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.homewizard
BADGE-Test and Release: https://github.com/krobipd/ioBroker.homewizard/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# ioBroker.homewizard — Anleitung

Echtzeit-Energiedaten von HomeWizard-Energy-Geräten über die lokale **API v2**.

## Voraussetzungen

- Ein HomeWizard-Gerät mit API v2: **P1-Meter** (HWE-P1), **kWh-Meter** 1-phasig (HWE-KWH1 / SDM230) oder 3-phasig (HWE-KWH3 / SDM630), **Plug-In Battery** (HWE-BAT).
- Eine Firmware, die die lokale API v2 kann, und die lokale API in der HomeWizard-App eingeschaltet.
- Node.js >= 22, js-controller >= 7.2.2, Admin >= 8.0.11.

Energy Socket, Watermeter und Energy Display sprechen nur die abgekündigte v1-API. Sie liegen außerhalb des Adapters und kommen auch nicht mehr dazu.

## Gerät hinzufügen

Der Adapter hat keine Gerätetabelle in den Einstellungen — Geräte stehen im Objektbaum und werden über den Knopf am Gerät selbst hinzugefügt.

**Mit automatischer Suche (Normalfall)**

1. Im Reiter **Objekte** `homewizard.0.startPairing` auf `true` setzen.
2. Innerhalb von 60 Sekunden den Knopf am HomeWizard-Gerät drücken.
3. Das Gerät erscheint mit einem eigenen Ordner unter der Instanz.

Das Fenster bleibt die vollen 60 Sekunden offen — mehrere Geräte lassen sich also in einem Durchgang hinzufügen.

**Mit fester IP-Adresse** — für Netze, in die die automatische Suche nicht durchkommt (eigenes VLAN, Docker ohne Host-Netzwerk):

1. Die IP-Adresse des Geräts in `homewizard.0.pairingIp` eintragen.
2. Danach `homewizard.0.startPairing` auf `true` setzen und den Knopf am Gerät drücken.

## Was angelegt wird

Jedes Gerät bekommt einen Ordner `<Produkttyp>_<Seriennummer>` mit:

| Ordner                 | Inhalt                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `info`                 | Produktname und -typ, Firmware, WLAN und Signalstärke, Laufzeit, Verbindungszustand                |
| `measurement`          | Leistung, Spannung, Strom, Frequenz, Energiezähler je Tarif, Zeitstempel                           |
| `measurement.quality`  | Spannungseinbrüche und -überhöhungen, Ausfallzähler (nur P1)                                       |
| `measurement.external` | Gas-, Wasser- und Wärmezähler, die über das P1-Meter melden                                        |
| `system`               | Cloud-Verbindung, Helligkeit der Status-LED, alte v1-API, Knöpfe für Neustart und Identifizieren   |
| `battery`              | Lademodus, Berechtigungen, Zielleistung und Zähler — am Zähler, mit dem die Batterie gekoppelt ist |

`remove` entfernt ein Gerät samt aller Datenpunkte.

## Verbindungs-Anzeigen

- `<Gerät>.info.connected` — wahr, solange das Gerät dem Adapter antwortet. Das schließt den Abruf im Rückfall ein, nicht nur die Echtzeit-Verbindung.
- `info.connection` — wahr, solange mindestens ein Gerät antwortet.
- `info.devicesTotal` / `info.devicesOnline` / `info.devicesAllOnline` — wie viele Geräte eingerichtet sind und wie viele davon antworten. `devicesTotal` behält seinen Wert, wenn der Adapter gestoppt wird.

Messwerte kommen normalerweise etwa jede Sekunde als Push. Bricht diese Verbindung ab, fragt der Adapter stattdessen per HTTPS ab (alle 10 Sekunden, bei einem Gerät mit schwachem Empfang alle 30) und baut die Verbindung im Hintergrund wieder auf — die Daten laufen also weiter.

## Plug-In Battery steuern

Die Batterie wird als eigenes Gerät gekoppelt, die Bedienung sitzt aber am **P1- oder kWh-Meter**, mit dem sie zusammenarbeitet — dort stellt HomeWizard sie bereit:

- `battery.mode` — `zero`, `to_full`, `standby` oder `predictive`.
- `battery.charge_to_full` — einmalig auf 100 % laden.
- `battery.permissions` — ein JSON-Array, als Text geschrieben.

`predictive` und `charge_to_full` brauchen eine neuere Batterie-Firmware (API 2.3.0). Ältere Firmware lehnt sie ab, der Wert wird dann nicht übernommen.

## Wenn etwas nicht geht

**Die Kopplung findet das Gerät nicht.** Die automatische Suche kommt oft nicht über VLAN-Grenzen oder Docker-Brücken. Dann den Weg über die feste IP nehmen.

**Die Kopplung scheitert direkt nach dem Knopfdruck.** Der Adapter zieht den eben ausgestellten Zugang wieder zurück und bittet um einen neuen Versuch. Prüfen, ob die lokale API in der HomeWizard-App eingeschaltet ist.

**Ein Gerät steht auf nicht verbunden.** Der Adapter gibt nie auf: Er versucht die Echtzeit-Verbindung in wachsenden Abständen (bis zu 5 Minuten), sucht etwa stündlich per mDNS nach einer geänderten IP-Adresse und schaltet bei Geräten mit erkennbar schwachem Empfang auf einen schnelleren Rhythmus. Ein Zähler im Kellerflur kann stundenlang weg sein; damit er zurückkommt, ist nichts zu tun.

**„token invalid — re-pair device to fix".** Das Gerät nimmt den Zugang des Adapters nicht mehr an, meist nach einem Werksreset. Einfach neu koppeln — die vorhandenen Datenpunkte bleiben erhalten.

**Meldungen über das ablaufende mitgelieferte Zertifikat.** Der Adapter bringt das HomeWizard-Stammzertifikat mit, um Gerätezertifikate zu prüfen. Lange vor dessen Ablauf liefert ein Adapter-Update ein frisches nach.

## Datenschutz und Sicherheit

- Die Zugänge der Geräte liegen verschlüsselt im Geräte-Objekt, nie in der Adapter-Konfiguration.
- Der Adapter prüft das Zertifikat jedes Geräts gegen dessen bekannte Identität — er spricht also nicht mit einem anderen Gerät, das zufällig ein HomeWizard-Zertifikat besitzt.
- Beim Entfernen eines Geräts zieht der Adapter seinen Zugang auch auf dem Gerät selbst zurück.
- `system.api_v1_enabled` schaltet die alte v1-API am Gerät wieder ein. Diese API hat keine Verschlüsselung und keinen Zugangsschutz — jeder im Netz kann das Gerät dann lesen und steuern. Der Adapter warnt beim Einschalten.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.18.2 (2026-09-06)

- Fixed: a device the adapter could not read the stored token for can be removed again — its `remove` data point did nothing at all, and the device stayed in the tree for good.
- Fixed: renaming a device in the HomeWizard app now updates its `info.productName` data point; until now the new name showed up nowhere until the adapter was restarted.
- Fixed: the firmware version keeps up with a device that updates itself, instead of showing the version from the last adapter start.
- Fixed: a button falls back to "not pressed" even when the device cannot be reached, so it stays clickable instead of staying stuck.
- Changed: a device entry that is damaged or unreadable is now reported in the log instead of disappearing without a word.

### 0.18.1 (2026-09-04)

- Fixed: corrected data point names now also reach devices that are currently offline — until now they waited for the device to answer again, which for a meter with a weak signal could mean never.
- Changed: the object tree no longer holds the `info.legacyMigrated` data point, which never carried any information about your devices or their readings.

### 0.18.0 (2026-09-04)

- Fixed: a device that keeps answering while its push connection is down is no longer shown as not connected — the status describes the device now, not one connection type.
- Fixed: WiFi signal strength and uptime keep updating for such a device instead of freezing at the values from before the drop.
- Fixed: corrected names and descriptions now reach installations that already exist — until now they only ever arrived on fresh ones.
- Fixed: sending a message to the adapter works again — a leftover setting from an earlier version blocked every message silently, with nothing about it in the log.
- Fixed: a device with no usable IP address is reported at start-up and searched for, instead of staying quietly dead until the next restart.
- Fixed: the reboot and identify buttons reset themselves even when the command fails, so they no longer stay pressed in Admin.
- Fixed: the battery data points are removed once the meter reports that no battery is connected any more, instead of showing its last values forever.
- New: the data points under `info` explain what they mean in all eleven languages, and a user guide is now part of the documentation portal.
- Changed: for security, an address announced over the network is only accepted when it belongs to a private range, so pairing can no longer be directed at a host outside your own network.

### 0.17.0 (2026-09-02)

- Fixed: the connection status is now reset on every stop, even when the adapter is stopped right after it started — before, such a stop could leave it showing as connected.
- Fixed: a device that repeats the same error after reconnecting is warned about again, instead of staying silent for the rest of the adapter's run.
- Fixed: switching cloud access, the legacy v1 API or charge-to-full from a script now confirms the actual on or off value, not the raw text that was written.
- Fixed: two rare cases where a log line could show undefined or an object instead of the error now show the real text, and a malformed device error keeps a readable code.
- Fixed: an external gas or water meter whose reported type contains unusual characters now gets a clean name in the object tree instead of a broken one.
- Changed: ioBroker Admin 8.0.11 or newer is now required — the same minimum version that the current ioBroker stable repository ships with.

### 0.16.0 (2026-08-27) — stable

- Fixed: stopping the adapter no longer leaves every device showing as connected — the device markers and the connection status are now reset before the adapter goes down.
- Fixed: after a crash, a power cut or a restart, a device that was reachable before no longer stays green until it reconnects — every device starts out as not connected.
- New: three data points show at a glance how many devices are set up, how many are answering right now, and whether all of them are.

## License

MIT License

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