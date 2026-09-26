---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.fakeroku
BADGE-stable: https://iobroker.live/badges/fakeroku-stable.svg
BADGE-Installations: https://iobroker.live/badges/fakeroku-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.fakeroku
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.fakeroku/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg
---
# fakeroku — emulierte Roku-Geräte für deine Fernbedienung

Dieser Adapter lässt ioBroker im Heimnetz wie ein oder mehrere **Roku-Streaming-Geräte**
aussehen. Eine Fernbedienung oder Steuerung, die das Roku-Protokoll spricht — ein
Logitech-Harmony-Hub, eine Sofabaton X1/X2, die Roku-Integration von Home Assistant,
openHAB — findet das emulierte Gerät, und jeder Tastendruck darauf wird zu einem
Datenpunkt in ioBroker, auf den Skripte und Visualisierungen reagieren können.

Er ist das **Eingabe**-Gegenstück zum Logitech-Harmony-Adapter: Statt dass ioBroker
ein Gerät steuert, steuert ein Gerät den ioBroker.

> **Die offizielle Roku-App funktioniert mit diesem Adapter nicht.** Sie spricht mit
> echten Rokus über Rokus herstellereigenen, undokumentierten ECP-2-WebSocket-Kanal,
> den dieser Emulator nicht nachbildet. Nutze einen Harmony-Hub oder eine Sofabaton —
> die sprechen das offene Protokoll, das dieser Adapter bedient.

## Voraussetzungen

- Node.js 22 oder neuer
- js-controller 7.2.2 oder neuer
- admin 8.0.11 oder neuer
- Eine Fernbedienung bzw. ein Hub im **selben Heimnetz** wie der ioBroker-Rechner

## Einrichtung

### 1. Instanz anlegen

Adapter installieren und eine Instanz anlegen. Er läuft sofort: Die Instanz bringt
bereits einen emulierten Roku mit, Name „Roku", Anschluss 8060.

### 2. Netzwerkschnittstelle wählen (meistens: nicht)

Lass **Netzwerkschnittstelle** auf „alle Schnittstellen". Der Adapter bedient dann jedes
Netz, in dem dein ioBroker-Rechner hängt, und antwortet einer Fernbedienung in jedem davon
mit der Adresse des Rechners in genau diesem Netz — eine Fernbedienung in einem eigenen
VLAN bekommt die Adresse, die sie erreicht.

Eine bestimmte Adresse wählst du nur, wenn die emulierten Rokus **nur in einem Netz**
existieren sollen. Dann bleibt alles in diesem Netz: Beantwortet werden nur
Fernbedienungen daraus, in den anderen Netzen wird nichts angeboten. Gibt es die Adresse
beim Start der Instanz auf dem Rechner nicht, wartet der Adapter bis zu zwei Minuten
darauf (ein Netz, das erst nach ioBroker hochkommt), meldet es dann im Protokoll und
startet nichts — er weicht nie auf ein anderes Netz aus.

### 3. Emulierte Rokus anlegen oder ändern

Jede Karte unter **Emulierte Roku-Geräte** ist ein Roku, den deine Fernbedienung
finden kann.

- **Name** — der Name des Geräts in ioBroker und in der Geräteauskunft des emulierten
  Roku. Ob eine Fernbedienung ihn anzeigt, hängt von der Fernbedienung ab: Eine Harmony
  benennt das Gerät selbst. Nimm etwas Wiedererkennbares, zum Beispiel den Raum.
  **Eine Karte später umzubenennen behält ihre Datenpunkte** — der Ordner im Objektbaum,
  seine Raum- und Funktionszuordnung und seine Aufzeichnungs-Einstellungen bleiben, wo sie
  sind; nur der angezeigte Name ändert sich.
- **ECP-Port** — der Netzwerk-Port, auf dem dieser Roku antwortet. `8060`
  ist der Port eines echten Roku. Jeder emulierte Roku braucht **seinen eigenen**;
  der Dialog schlägt einen freien vor und lässt einen bereits belegten nicht bestätigen.
  Eine Harmony oder Sofabaton liest den Port aus der Erkennung; **Home Assistant und
  Homey nutzen immer 8060** — gib 8060 dem Roku, den sie steuern sollen.
- **Typ**
  - **Player** (eine Streaming-Box) bietet die 16 üblichen Navigations- und
    Wiedergabetasten.
  - **TV** bietet zusätzlich Lautstärke-, Ein/Aus-, Kanal- und Eingangstasten
    (`VolumeUp`, `PowerOn`, `PowerOff`, `Power`, `Sleep`, `ChannelUp`, `InputTuner`,
    `InputHDMI1` …). Wähle das nur, wenn du diese zusätzlichen Tasten wirklich als
    Auslöser in ioBroker haben willst.

### 4. Fernbedienung anlernen

**Logitech Harmony:** In der Harmony-App ein Gerät hinzufügen, als Hersteller
**Roku** wählen und auf deinen ioBroker-Rechner zeigen. Der Hub findet den emulierten
Roku von selbst und liest den Anschluss aus der Ankündigung — du musst ihn nicht
eintippen.

**Sofabaton X1/X2:** In der Sofabaton-App ein Roku-Gerät hinzufügen, während die App
im selben Netz ist; sie findet den emulierten Roku über die Erkennung.

**Home Assistant:** Die Roku-Integration hinzufügen — sie findet den emulierten Roku,
oder du gibst den ioBroker-Rechner an. Home Assistant spricht immer Port 8060 an (siehe
oben).

## Was im Objektbaum entsteht

Auf Instanz-Ebene:

| Datenpunkt        | Typ                 | Bedeutung                                                                                                                                                                                                                                                 |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | boolean, nur lesbar | Nur wahr, solange **jeder** konfigurierte Roku tatsächlich lauscht. Kann einer nicht starten — fast immer, weil sein Port schon belegt ist —, nennt das Protokoll Gerät und Port, und der Adapter versucht dieses Gerät jede Minute erneut, bis es läuft. |

Je emuliertem Roku, unterhalb von `fakeroku.0.<Name>`:

| Datenpunkt     | Typ                 | Bedeutung                                                                                                                                                |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command`      | string, nur lesbar  | Der letzte Befehl als lesbarer Text: `Home`, `Lit_a`, `launch:12`, `search:news`.                                                                        |
| `commandType`  | string, nur lesbar  | Um welche Art Befehl es sich handelte: `keypress`, `keydown`, `keyup`, `launch`, `install`, `input` oder `search`.                                       |
| `keys.<Taste>` | boolean, nur lesbar | Ein Datenpunkt je Taste. Ein Tastendruck setzt ihn kurz auf `true` und wieder auf `false`; eine gehaltene Taste bleibt `true`, bis sie losgelassen wird. |

Tastatureingaben der Fernbedienung (`Lit_a`) und App-Starts erscheinen nur in
`command` — sie bekommen keine eigenen Datenpunkte. Die App-Taste einer Fernbedienung,
die App-Starts sendet (eine Sofabaton, Home Assistant), kommt als `launch:<id>` an, mit
ihren Parametern, falls sie welche trägt (`launch:12?contentId=…`). Tastennamen werden in
jeder Schreibweise erkannt: `home` und `HOME` sind die Taste `Home`.

## Verwendung im Skript

Der übliche Weg ist, auf eine Taste zu reagieren, die `true` wird:

```javascript
on({ id: "fakeroku.0.Wohnzimmer.keys.Play", val: true }, () => {
  // deine Aktion
});
```

Oder `command` beobachten, wenn du mehrere Tasten an einer Stelle behandeln willst:

```javascript
on({ id: "fakeroku.0.Wohnzimmer.command" }, obj => {
  log("Fernbedienung sendete: " + obj.state.val);
});
```

Die Tasten-Datenpunkte werden bei jedem Adapterstart auf `false` zurückgesetzt. Eine
Taste, die beim Stoppen von ioBroker gedrückt stehen geblieben ist, kann deine Regel
danach also nicht blockieren. Das Loslassen einer Taste, die du tatsächlich hältst, wird
nie verworfen — auch dann nicht, wenn der Adapter gerade eine Befehlsflut abweist; sonst
wäre die Flutbremse das, was eine Taste hängen lässt.

## Genutzte Anschlüsse

- **TCP 8060** (einer je emuliertem Roku, einstellbar) — das Steuerprotokoll. Hierhin
  sendet deine Fernbedienung ihre Tastendrücke.
- **UDP 1900** (Multicast) — die Geräteerkennung, damit die Fernbedienung die
  emulierten Rokus findet. Dieser Anschluss ist vom Standard vorgegeben und wird von
  allen gemeinsam genutzt.

Beantwortet werden nur Geräte aus einem der eigenen Netze des ioBroker-Rechners — mit
gewählter Netzwerkschnittstelle nur aus deren Netz. Eine Anfrage von anderswo (Internet,
anderes VLAN, VPN) wird abgewiesen, eine Suche von dort ignoriert.

Beim Stoppen der Instanz melden sich die emulierten Rokus im Netz ab. Eine Steuerung,
die ihre Geräteliste aus der Erkennung führt, nimmt sie damit heraus, statt sie bis zu
einer Stunde zu behalten; eine Harmony, die ein gekoppeltes Gerät selbst behält,
betrifft das nicht.

Du kannst mehrere Instanzen auf demselben Rechner betreiben — gib jeder eigene
ECP-Ports. UDP 1900 teilen sie sich: Der Adapter öffnet den Anschluss mit
Adress-Wiederverwendung, jede Instanz empfängt die Suchanfragen also und antwortet für
ihre eigenen Geräte. Nur wenn ein anderes Programm den Anschluss exklusiv hält, startet
eine Instanz ohne Geräteerkennung — das steht dann im Protokoll, und bereits gekoppelte
Fernbedienungen kommen weiterhin durch.

Der Adapter läuft außerdem im Compact-Modus von ioBroker, in dem sich mehrere Adapter
einen Prozess teilen, statt dass jeder einen eigenen startet. Auf kleinen Rechnern
spart das Speicher und Startzeit. Eingeschaltet wird er in den Instanz-Einstellungen;
hier ist dafür nichts umzustellen.

## Fehlersuche

**Die Fernbedienung findet kein Gerät.**
Prüfe, ob Hub und ioBroker-Rechner im selben Netz sind und keine Firewall den
UDP-Anschluss 1900 blockiert. Bei einem Rechner mit mehreren Netzwerkkarten die
richtige unter **Netzwerkschnittstelle** auswählen. Ist die Erkennung nicht verfügbar,
schreibt der Adapter das ins Protokoll und arbeitet für bereits gekoppelte
Fernbedienungen weiter.

**Die Fernbedienung findet nichts, und ioBroker läuft in Docker.**
Im Standard-Bridge-Netz von Docker hat der Container nur eine interne Adresse, die keine
Fernbedienung erreicht, und Suchanfragen aus deinem Heimnetz kommen nie an. Starte den
ioBroker-Container mit `network_mode: host` oder gib ihm über ein `macvlan`-Netz eine
Adresse im Heimnetz. Brücken von Docker, libvirt, VirtualBox und WSL auf dem Rechner
selbst erkennt der Adapter und kündigt sie nicht an.

**Im Protokoll steht „The network interface address … does not exist on this host".**
Die in den Einstellungen gewählte Adresse gibt es auf dem Rechner nicht mehr — neue
Netzwerkkarte, geänderte DHCP-Adresse, eine Sicherung auf anderer Hardware
zurückgespielt. Wähle die aktuelle Schnittstelle (oder „alle Schnittstellen") und
speichere; die Instanz startet neu.

**Home Assistant erreicht einen von mehreren emulierten Rokus nicht.**
Home Assistant nutzt immer Port 8060. Gib 8060 dem emulierten Roku, den es steuern soll.

**Die Instanz bleibt „nicht verbunden".**
Mindestens ein konfigurierter Roku konnte nicht starten. Das Protokoll nennt Gerät
und Anschluss — fast immer ist der Anschluss schon von etwas anderem belegt (auch von
einem zweiten emulierten Roku mit demselben Anschluss). Gib ihm einen freien.
Der Adapter versucht es bei so einem Gerät jede Minute erneut und meldet im Protokoll,
wenn es hochkommt — ein Anschluss, den der vorherige Prozess nach einem Neustart noch
hielt, löst sich damit von allein.

**Ich drücke eine Taste und in ioBroker passiert nichts.**
Stelle die Protokollstufe der Instanz kurz auf `debug`. Jeder _angewendete_ Befehl wird
mit Absenderadresse protokolliert, bei einer Taste mit ihrem Namen (bei `launch`,
`input` und `search` steht stattdessen das Gestartete bzw. Getippte da). Erscheint die
Zeile, ist der Befehl angekommen und das Problem liegt im Skript, das den Datenpunkt
liest.

Erscheint nichts, suche zuerst nach einer Warnung über mehr als 25 Befehle pro Sekunde:
Befehle, die diese Bremse verwirft, werden nicht einzeln protokolliert — eine zu
gesprächige Fernbedienung sieht also genauso aus wie eine, die den Adapter gar nicht
erreicht. Ohne so eine Warnung kommt die Fernbedienung wirklich nicht durch: Netz und
ECP-Port prüfen.

**Wiedergabe und Pause tun dasselbe.**
Das ist das Roku-Protokoll, nicht der Adapter: Die Fernbedienung sendet für
Wiedergabe und Pause **denselben** Befehl, die beiden sind hier also nicht
unterscheidbar.

**Die App-Tasten meiner Harmony bewirken nichts.**
Ein Harmony-Hub hat seine App-Tasten (Netflix, YouTube …) nicht an den emulierten Roku
gesendet — sie hängen an Harmony-Aktivitäten, der Adapter sieht sie also nie.
Fernbedienungen, die App-Starts senden (eine Sofabaton, Home Assistant), zeigen sie in
`command` als `launch:<id>`.

## Datenschutz

Der Adapter spricht ausschließlich mit Geräten in deinen eigenen Netzen. Er kontaktiert keinen
Cloud-Dienst und sendet nirgendwohin Daten. Die optionale Fehlerberichterstattung
über Sentry ist aus, solange du in den ioBroker-Systemeinstellungen die Diagnose
nicht eingeschaltet hast; sie überträgt eine anonyme Installations-Kennung und den
Fehler selbst, keine personenbezogenen Daten.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.8.0 (2026-09-25)

- (krobipd) Fixed: Home Assistant and openHAB can set up the emulated Roku again — it now answers the active-app, media-player and TV-channel queries they send.
- (krobipd) Fixed: keys sent in any upper or lower case (home, POWERON) press the right button, and spaces typed in Home Assistant arrive as spaces.
- (krobipd) Fixed: an upgrade from the old adapter keeps every object tree with its rooms and history, also for names with an umlaut, a bracket or a double space.
- (krobipd) Fixed: renaming a device only changes its displayed name; its datapoints and scripts pointing at them stay where they are.
- (krobipd) Fixed: an instance started before the network is up starts its devices and adds discovery as soon as the host has an address.
- (krobipd) Fixed: the device dialog greys out OK for a taken name or port and says why.
- (krobipd) Changed: only devices in the host's own networks are answered; a chosen network interface keeps everything in its network and is never swapped for another.
- (krobipd) Changed: a chosen network interface that does not exist is waited for up to two minutes at start, then reported, instead of being replaced.
- (krobipd) New: the TV profile adds the PowerOn, Power, Sleep and InputTuner keys and announces itself the way real Roku TVs do.
- (krobipd) New: every new emulated Roku gets its own network identity instead of one every installation with the same name would share.

### 1.7.1 (2026-09-16) — stable

- (krobipd) Changed: the instance restarts once after this update to clear a setting left behind by an older version; nothing else changes for you.

### 1.7.0 (2026-09-16)

- (krobipd) Fixed: button datapoints keep their value and their room and function assignment when the adapter starts.
- (krobipd) Fixed: after an emulated Roku drops out, its port is free again instead of staying blocked until ioBroker restarts.
- (krobipd) Fixed: stopping the instance no longer leaves it reported as connected.
- (krobipd) Fixed: a key you hold right after a short press stays pressed instead of being released early.
- (krobipd) Fixed: the device dialog now also refuses a name that would collide with an existing device in the object tree.
- (krobipd) Improved: after the host gets a new IP address, remotes find the emulated Rokus again without restarting the instance.
- (krobipd) Changed: the network interface setting moved to the standard settings key (bind); the instance restarts once after this update.

### 1.6.1 (2026-09-07) — stable

- (krobipd) Changed: installing straight from GitHub is no longer offered — the adapter is built before publishing, so it is installed from the ioBroker repository instead.

### 1.6.0 (2026-09-07)

- (krobipd) Fixed: saving a device in the admin could change its identity on the network, so a paired Harmony or Sofabaton lost it.
- (krobipd) Fixed: with the device list open twice, editing or deleting a card could hit a different emulated Roku than the one clicked.
- (krobipd) Fixed: releasing a key was dropped while the adapter shed a flood of commands, so the key could stay pressed for half a minute.
- (krobipd) Fixed: an ECP port still held after a restart left that device dead until you restarted the instance; it is retried every minute now.
- (krobipd) Fixed: stopping the instance now takes the emulated Rokus out of the remote's list instead of leaving them there for up to an hour.
- (krobipd) Fixed: an emulated Roku whose server died is no longer offered for discovery.
- (krobipd) Fixed: a configured port no server can bind falls back to 8060 instead of leaving the device unstarted.
- (krobipd) Changed: the device dialog refuses a reserved or colliding name right away instead of reporting it after saving.
- (krobipd) Changed: the adapter can now run in compact mode, sharing one process with other adapters instead of claiming its own.
- (krobipd) Changed: more than one instance may run on the same machine again; only the ports have to differ.

## License

The MIT License (MIT)

Copyright (c) 2017-2023 Pmant <patrickmo@gmx.de>  
Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

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