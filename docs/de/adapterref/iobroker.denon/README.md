---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.denon.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.denon.svg
BADGE-Number of Installations: https://iobroker.live/badges/denon-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/denon-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.denon.png?downloads=true
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.denon/workflows/Test%20and%20Release/badge.svg
chapters: {"pages":{"de/adapterref/iobroker.denon/README.md":{"title":{"de":"ioBroker.denon – Denon/Marantz AV-Receiver"},"content":"de/adapterref/iobroker.denon/README.md"},"de/adapterref/iobroker.denon/states.md":{"title":{"de":"Alle Datenpunkte"},"content":"de/adapterref/iobroker.denon/states.md"},"de/adapterref/iobroker.denon/upgrade-1x.md":{"title":{"de":"Update von 1.x auf 2.0"},"content":"de/adapterref/iobroker.denon/upgrade-1x.md"}}}
---
![Logo](media/denon.png)

# ioBroker.denon – Denon/Marantz AV-Receiver

Mit diesem Adapter steuerst du deinen Denon- oder Marantz-AV-Receiver aus ioBroker: ein- und ausschalten, Lautstärke,
Eingang, Surround-Modus, Zone 2/3, Tuner und viele Klang- und Bildeinstellungen. Änderungen am Receiver (z. B. über die
Fernbedienung) erscheinen sofort in ioBroker.

## Haftungsausschluss

DENON und Marantz sind Marken der D&M Holdings Inc.
Die Entwickler dieses Moduls stehen in keiner Verbindung zur D&M Holdings Inc. oder zu deren Tochtergesellschaften,
Logos oder Marken und werden von diesen nicht unterstützt.

## Schnellstart

1. Am Receiver im Menü „Netzwerk“ → „Netzwerk-Strg.“ auf **„Immer ein“** stellen (Details [unten](#netzwerkeinstellungen-am-av-receiver)).
2. In ioBroker im Reiter „Adapter“ nach **denon** suchen und auf „+“ klicken.
3. In der Instanz die IP-Adresse des Receivers eintragen (oder aus der Liste der gefundenen Geräte wählen) und speichern.
4. Nach wenigen Sekunden ist `info.connection` grün und unter `denon.0` erscheinen die Datenpunkte deines Receivers.

Mehr ist nicht nötig. Welche Datenpunkte angelegt werden, hängt vom Modell ab: Der Adapter legt nur an, was dein Receiver auch kann.

Voraussetzungen: Denon- oder Marantz-AV-Receiver im Netzwerk (LAN oder WLAN), Node.js >= 22.19, js-controller >= 7.2.5, Admin >= 8.3.5.

## Die wichtigsten Datenpunkte

Für VIS, Blockly oder Skripte reichen meistens diese (statt `main` gibt es `zone2` und `zone3` genauso):

| Datenpunkt | Wozu | Beispiel |
|---|---|---|
| `denon.0.system.power` | ganzen Receiver ein / Standby | `true` = an, `false` = alles aus |
| `denon.0.main.power` | nur die Hauptzone ein/aus | `true` |
| `denon.0.main.volume` | Lautstärke (0 ... 98, wie im Display) | `40` |
| `denon.0.main.mute` | stumm | `true` |
| `denon.0.main.input` | Eingang wählen | `TV` oder der Name aus dem Receiver-Menü, z. B. `TV Audio` |
| `denon.0.main.quickSelect` | Quick Select (Marantz: Smart Select) abrufen | `1` |
| `denon.0.main.surroundMode` | Surround-Modus | `STEREO` |
| `denon.0.info.connection` | Verbindung zum Receiver steht | `true` |

Tasten wie `main.volumeUp` oder `remote.up` werden mit `true` ausgelöst. Alle weiteren Datenpunkte: [Alle Datenpunkte](/#/docs/adapterref/iobroker.denon/states.md).

## Konfiguration

Normalerweise muss nur die IP-Adresse eingetragen werden.

| Einstellung | Bedeutung |
|---|---|
| IP-Adresse des Receivers | z. B. `192.168.1.50` (IPv6 und Hostname gehen auch). Solange die Instanz läuft, werden gefundene Receiver vorgeschlagen. Die Suche findet nur Geräte im selben Netz wie ioBroker, sonst die Adresse von Hand eintragen. |
| Aktualisierungsintervall (ms) | Wie oft Werte gelesen werden, die der Receiver nicht selbst meldet (z. B. Sleep-Timer). Standard 7000 = alle 7 Sekunden |
| Pause zwischen Befehlen (ms) | Nur erhöhen, wenn der Receiver Befehle verpasst. Standard 100, mindestens 50 |
| Port | Immer 23. Nur für einen Seriell-Netzwerk-Wandler ändern |
| Marke, Modell und Zonen automatisch erkennen | Empfohlen. Liest beim Start Marke, Modell und Anzahl der Zonen aus dem Receiver. Gesteuert wird trotzdem immer über Port 23 |

## Netzwerkeinstellungen am AV-Receiver

1. Taste SETUP auf der Fernbedienung drücken, das Menü erscheint im Gerätedisplay und auf dem Fernseher
2. „Netzwerk“ → „Einstellungen“ wählen und einstellen
    * DHCP: „Ein“, wenn ein DHCP-Server (z. B. Router) vorhanden ist, sonst IP-Adresse, Subnetzmaske und Gateway manuell setzen
    * Proxy: „Aus“
3. „Netzwerk“ → „Netzwerk-Strg.“ (bei manchen Modellen „IP-Steuerung“) auf **„Immer ein“** stellen.
   Mit „Aus im Standby“ ignoriert der Receiver im Standby alle Netzwerkbefehle und lässt sich von ioBroker nicht einschalten.

Tipp: Im Router dem Receiver eine feste IP-Adresse geben, damit sich die Adresse nicht ändert.

## Häufige Fragen

**`info.connection` wird nicht grün**
* Stimmt die IP-Adresse? Sie steht im Receiver-Menü unter „Netzwerk“ → „Information“ oder in der Geräteliste des Routers.
* Der Receiver erlaubt nur **eine** Steuerverbindung. Läuft eine andere App, die ihn steuert (Home Assistant, ein zweiter ioBroker, ein Skript), bekommt der Adapter keine Verbindung.
* Steht „Netzwerk-Strg.“ auf „Immer ein“?

**Der Receiver lässt sich nicht einschalten**
* „Netzwerk-Strg.“ steht wahrscheinlich auf „Aus im Standby“. Auf „Immer ein“ stellen.

**Ein Datenpunkt fehlt**
* Der Adapter legt nur Datenpunkte an, auf die der Receiver antwortet. Fehlt einer, kann dein Modell diese Funktion nicht (z. B. Bass/Höhen in Zone 2 beim AVR-X2200W).
* Manche Werte meldet der Receiver erst, wenn die Zone eingeschaltet ist.

**Ein Eingang fehlt in der Auswahl oder hat einen anderen Namen**
* Die Liste kommt aus dem Receiver: Eingänge, die im Menü unter „Eingänge“ ausgeblendet sind, fehlen auch hier. Umbenannte Eingänge erscheinen mit dem neuen Namen. Nach einer Änderung im Receiver die Instanz einmal neu starten.

**Display, Cover oder Wiedergabetasten fehlen**
* Modelle mit HEOS (ab etwa 2016) geben diese Infos nicht über die Steuerverbindung heraus.
* Für Wiedergabe-Steuerung, Titelanzeige und Cover bei diesen Modellen zusätzlich den [HEOS-Adapter](https://github.com/withstu/ioBroker.heos) nutzen. Beide Adapter können gleichzeitig laufen.

## Update von 1.x

Mit Version 2.0 haben alle Datenpunkte neue Namen (z. B. `zoneMain.powerZone` → `main.power`), der alte Objektbaum wird beim
ersten Start gelöscht. Skripte, VIS und Aliase müssen angepasst werden, History-Einstellungen an den Datenpunkten gehen verloren.
Bitte vorher ein Backup machen. Die komplette Tabelle alt → neu: [Update von 1.x](/#/docs/adapterref/iobroker.denon/upgrade-1x.md)

## Alle Datenpunkte und Details

* [Alle Datenpunkte](/#/docs/adapterref/iobroker.denon/states.md) – jeder Datenpunkt mit Beschreibung
* [Mehrzonen-Verstärker (DENON POA-3012CI)](/#/docs/adapterref/iobroker.denon/states.md#mehrzonen-verstärker-denon-poa-3012ci)
* [Technische Details](/#/docs/adapterref/iobroker.denon/states.md#technische-details) – Verbindung, Befehlsabstand, Unterschiede Denon/Marantz

## Fehlende Funktionen & Fehler

Fehlende Funktionen oder Fehler bitte als [Issue](https://github.com/iobroker-community-adapters/ioBroker.denon/issues) melden,
mit Debug-Log und Modell des Receivers.

Version 2.0 ist mit einem Denon AVR-X2200W getestet. Tester haben sie erfolgreich mit einem Marantz CINEMA 60 und einem Marantz SR6011 genutzt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.4 (2026-11-24)
* (Schimi1983) new states for the Bluetooth transmitter (headphones): `main.audio.bluetoothTransmitter`, `bluetoothOutput`, `bluetoothLevel`

### 2.0.3 (2026-11-20)
* (Schimi1983) README: hint to the HEOS adapter for playback and now playing on HEOS models
* (Schimi1983) Marantz Cinema: new state `main.audio.autoLipSync`, `tuner.preset` shows `0` when no preset is selected (`TPANOFF`)

### 2.0.2 (2026-11-19)
* (Schimi1983) new settings from the Marantz Cinema protocols: M-DAX, IMAX Enhanced, DAC filter, illumination; Bass Sync
* (Schimi1983) README shortened: list of all states and upgrade table moved to the docs folder

### 2.0.1 (2026-11-19)
* (Schimi1983) value lists are updated with extendObject instead of setObject, old workflow file removed (#451)
* (Schimi1983) Marantz Cinema: option lines (`OPINF…`) are no longer logged as unhandled
* (Schimi1983) audio signal code 12 is shown as "No signal" (Marantz Cinema sends it in standby)

### 2.0.0 (2026-11-17)
* (Schimi1983) **Breaking change:** complete rework of the adapter. All states have new names (e.g. `zoneMain.powerZone` → `main.power`), the old object tree is deleted on the first start. Scripts, VIS and aliases must be adjusted, see "Upgrade from 1.x" in the README
* (Schimi1983) stable connection with automatic reconnect, new configuration page, input names from the receiver, states only for functions the receiver supports
* (Schimi1983) requires Node.js 22.19 or newer, js-controller 7.2.5 or newer and admin 8.3.5 or newer
* (Schimi1983) adapter is now maintained by iobroker-community-adapters

Older changes can be found in CHANGELOG_OLD.md

## License

The MIT License (MIT)

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2026 Moritz Heusinger <moritz.heusinger@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.