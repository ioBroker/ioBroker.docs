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
- Eine Firmware mit lokaler API v2 (siehe die [Kompatibilitätsliste](https://api-documentation.homewizard.com/docs/introduction) von HomeWizard). In der HomeWizard-App muss dafür nichts eingeschaltet werden: Der Schalter „Lokale API“ dort gehört zur alten v1-API und sollte aus bleiben.
- Node.js >= 22, js-controller >= 7.2.2, Admin >= 8.0.11.

Energy Socket, Watermeter und Energy Display sprechen nur die abgekündigte v1-API. Sie liegen außerhalb des Adapters und kommen auch nicht mehr dazu.

## Gerät hinzufügen

Der Adapter hat keine Gerätetabelle in den Einstellungen — Geräte stehen im Objektbaum und werden über den Knopf am Gerät selbst hinzugefügt.

**Mit automatischer Suche (Normalfall)**

1. Im Reiter **Objekte** `homewizard.0.startPairing` auf `true` setzen.
2. Innerhalb von 60 Sekunden den Knopf am HomeWizard-Gerät drücken (kWh-Meter: 1–3 Sekunden gedrückt halten).
3. Das Gerät erscheint mit einem eigenen Ordner unter der Instanz.

Das Fenster bleibt die vollen 60 Sekunden offen — mehrere Geräte lassen sich also in einem Durchgang hinzufügen.

**Mit fester IP-Adresse** — für Netze, in die die automatische Suche nicht durchkommt (eigenes VLAN, Docker ohne Host-Netzwerk):

1. Die IP-Adresse des Geräts in `homewizard.0.pairingIp` eintragen.
2. Danach `homewizard.0.startPairing` auf `true` setzen und den Knopf am Gerät drücken.

## Was angelegt wird

Jedes Gerät bekommt einen Ordner `<Produkttyp>_<Seriennummer>`. Er trägt den Produktnamen, den das Gerät meldet (z. B. „P1 Meter“) — den Namen aus der HomeWizard-App liefert die API nicht. Logzeilen nennen das Gerät als `P1 Meter (hwe-p1_5c2fafaabbcc)`, so lassen sich zwei gleiche Geräte unterscheiden. Der Ordner enthält:

| Ordner                 | Inhalt                                                                                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info`                 | Produktname und -typ, Firmware, WLAN und Signalstärke, Laufzeit, Verbindungszustand                                                                            |
| `measurement`          | Leistung, Spannung, Strom, Frequenz, Energiezähler je Tarif, Zeitstempel                                                                                       |
| `measurement.quality`  | Spannungseinbrüche und -überhöhungen, Ausfallzähler (nur P1)                                                                                                   |
| `measurement.external` | Gas-, Wasser- und Wärmezähler, die über das P1-Meter melden; ein Zähler, der einen Tag lang nicht mehr gemeldet wird (etwa nach einem Tausch), wird entfernt   |
| `system`               | Cloud-Verbindung, Helligkeit der Status-LED (nicht am kWh-Meter), alte v1-API und Neustart (nicht an der Plug-In Battery), Identifizieren (nicht am kWh-Meter) |
| `battery`              | Lademodus, Berechtigungen, Zielleistung und Zähler — am Zähler, mit dem die Batterie gekoppelt ist                                                             |

`remove` entfernt ein Gerät samt aller Datenpunkte.

## Verbindungs-Anzeigen

- `<Gerät>.info.connected` — wahr, solange das Gerät dem Adapter antwortet. Das schließt den Abruf im Rückfall ein, nicht nur die Echtzeit-Verbindung.
- `info.connection` — wahr, solange mindestens ein Gerät antwortet.
- `info.devicesTotal` / `info.devicesOnline` / `info.devicesAllOnline` — wie viele Geräte eingerichtet sind und wie viele davon antworten. `devicesTotal` behält seinen Wert, wenn der Adapter gestoppt wird.

Messwerte kommen normalerweise etwa jede Sekunde als Push. Bricht diese Verbindung ab, fragt der Adapter stattdessen per HTTPS ab (alle 10 Sekunden, bei einem Gerät mit schwachem Empfang alle 30) und baut die Verbindung im Hintergrund wieder auf — die Daten laufen also weiter.

## Plug-In Battery steuern

Die Batterie wird als eigenes Gerät gekoppelt, die Bedienung sitzt aber am **P1- oder kWh-Meter**, mit dem sie zusammenarbeitet — dort stellt HomeWizard sie bereit:

- `battery.mode` — `zero` (hält das Haus bei Netto-Null, lädt oder entlädt dafür) oder `predictive`. `to_full` und `standby` sind laut HomeWizard veraltet: stattdessen `charge_to_full` bzw. `permissions` nutzen.
- `battery.power_w` / `battery.target_power_w` — positiv heißt Laden, negativ Entladen.
- `battery.charge_to_full` — einmalig auf 100 % laden.
- `battery.permissions` — ein JSON-Array, als Text geschrieben.

`predictive` und `charge_to_full` brauchen eine neuere Batterie-Firmware (API 2.3.0). Ältere Firmware lehnt sie ab, der Wert wird dann nicht übernommen.

## Wenn etwas nicht geht

**Die Kopplung findet das Gerät nicht.** Die automatische Suche kommt oft nicht über VLAN-Grenzen oder Docker-Brücken. Dann den Weg über die feste IP nehmen.

**Die Kopplung scheitert direkt nach dem Knopfdruck.** Der Adapter zieht den eben ausgestellten Zugang wieder zurück und bittet um einen neuen Versuch. Beim kWh-Meter den Knopf 1–3 Sekunden gedrückt halten; ein kurzer Druck reicht nicht.

**Ein Gerät steht auf nicht verbunden.** Der Adapter gibt nie auf: Er versucht die Echtzeit-Verbindung in wachsenden Abständen (bis zu 5 Minuten), sucht etwa stündlich per mDNS nach einer geänderten IP-Adresse und schaltet bei Geräten mit erkennbar schwachem Empfang auf einen schnelleren Rhythmus. Ein Zähler im Kellerflur kann stundenlang weg sein; damit er zurückkommt, ist nichts zu tun.

**„token invalid — re-pair device to fix".** Das Gerät nimmt den Zugang des Adapters nicht mehr an, meist nach einem Werksreset. Einfach neu koppeln (`startPairing` und Knopf, notfalls mit `pairingIp`) — der Adapter nimmt ein Gerät mit ungültigem Zugang an, die vorhandenen Datenpunkte bleiben erhalten.

**Meldungen über das ablaufende mitgelieferte Zertifikat.** Der Adapter bringt das HomeWizard-Stammzertifikat mit, um Gerätezertifikate zu prüfen. Lange vor dessen Ablauf liefert ein Adapter-Update ein frisches nach.

## Datenschutz und Sicherheit

- Die Zugänge der Geräte liegen verschlüsselt im Geräte-Objekt, nie in der Adapter-Konfiguration.
- Der Adapter prüft das Zertifikat jedes Geräts gegen dessen bekannte Identität — er spricht also nicht mit einem anderen Gerät, das zufällig ein HomeWizard-Zertifikat besitzt.
- Beim Entfernen eines Geräts zieht der Adapter seinen Zugang auch auf dem Gerät selbst zurück.
- Jedes ioBroker-System und jede Instanz meldet sich unter einem eigenen Namen am Gerät an — ein Test- und ein Produktivsystem am selben Zähler stören sich nicht.
- `system.api_v1_enabled` schaltet die alte v1-API am Gerät wieder ein. Diese API hat keine Verschlüsselung und keinen Zugangsschutz — jeder im Netz kann das Gerät dann lesen und steuern. Der Adapter warnt beim Einschalten.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.20.0 (2026-09-24)

- Fixed: on Node.js 26 a device no longer stops updating for good after an oversized or interrupted reply from it — the adapter now gives up on that reply and carries on.
- Changed: the device folder keeps the product name the device reports; the HomeWizard API does not provide the name you give the device in the app, so renaming it there does not reach ioBroker.
- Fixed: writing the text "false" into cloud_enabled, api_v1_enabled or charge_to_full switched it on, and writing false to reboot restarted the device — values are now read strictly.
- Fixed: the battery descriptions now say that positive power means charging and that the zero mode charges or discharges to keep your home at net zero.
- Fixed: the setup notes no longer ask for the Local API switch in the app, which belongs to the old v1 API, and tell you to hold the button of a kWh Meter for 1–3 seconds.
- Fixed: another program using the network search port no longer stops the adapter; it says so and points you to pairing the device by its IP address instead.
- Fixed: a device that answers while the adapter restores its live connection no longer flips between online and offline with every attempt.
- Fixed: a device showing "token invalid" can be paired again by pressing its button, and a second device that needs a new address during a running search is found as well.
- Changed: a kWh Meter no longer shows an identify button or an LED brightness setting — the device has neither, and pressing them only ever failed.
- Fixed: one device whose stored entry is damaged no longer stops the other devices from starting — they come up and update as usual.
- New: every ioBroker system and instance pairs under its own name on the device, so a test and a production system can use the same meter side by side.
- New: a gas, water or heat meter the P1 Meter has not reported for a day is removed together with its data points, instead of keeping its last reading forever.
- Improved: when the pairing window closes, the adapter tells you how many devices were paired, or that none was found and what to try next.
- Fixed: when a different device answers at a paired device's address, the adapter now tells you that the address has probably changed.
- Fixed: the battery folder is removed completely when no battery is connected any more, including entries that had lost their folder.
- Improved: the WiFi signal strength is marked as a signal strength value, so visualisations and other adapters recognise it correctly.

### 0.19.0 (2026-09-15) — stable

- Fixed: a device that changed its IP address is found again — the reply to the adapter's own network search was discarded, leaving the device unreachable until it was paired anew.
- Fixed: removing a device now really withdraws its access on the device itself — the request was cut off before it left, so the adapter's user stayed behind on every device removed so far.
- Fixed: a device that is re-paired while the adapter is still working with the old connection keeps its new access token — that work could overwrite it and leave the device unusable.
- Improved: pairing now says once per device why it is not getting anywhere — a wrong address or a device without the local API used to fail silently until the window closed.
- Fixed: a device that does not manage batteries no longer keeps a battery folder — leftover entries from an earlier version are cleared the first time the device says it has none.
- Fixed: data points the adapter removes during a start no longer reappear empty a moment later, which left nameless leftovers in the tree that nothing ever cleaned up again.
- Improved: a setting the device refuses is corrected in the tree at once — it used to keep showing the requested value for up to a minute before the next check put it right.
- Fixed: the name of a gas, water or heat meter folder now also reaches installations whose meter has been quiet since the update, instead of only the entries below it.
- New: every device now shows a pictogram of its type in the object tree — a meter, a three-phase meter or a battery — drawn to read on the light and the dark theme alike.
- Changed: a device now carries the name it has in the HomeWizard app; renaming it there reaches the object tree, and a rename made in the tree is put back at the next check.

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