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
aussehen. Eine Fernbedienung, die das Roku-Protokoll spricht — ein Logitech-Harmony-Hub
oder eine Sofabaton X1/X2 — findet das emulierte Gerät, und jeder Tastendruck darauf wird zu einem
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
- admin 8.0.14 oder neuer
- Eine Fernbedienung bzw. ein Hub im **selben Heimnetz** wie der ioBroker-Rechner

## Einrichtung

### 1. Instanz anlegen

Adapter installieren und eine Instanz anlegen. Eine neue Instanz startet ausgeschaltet:
die Einstellungen unten prüfen, dann einschalten. Sie bringt bereits einen emulierten Roku
mit, Name „Roku", Anschluss 8060.

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
  Eine Harmony oder Sofabaton liest den Port aus der Erkennung.
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

## Was im Objektbaum entsteht

Auf Instanz-Ebene:

| Datenpunkt              | Typ                 | Bedeutung                                                                                                                                                                                                                                                                                                                       |
| ----------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`       | boolean, nur lesbar | Nur wahr, solange alles läuft: **jeder** konfigurierte Roku lauscht, die Erkennung antwortet und die gewählte Adresse existiert. Alles darunter zeigt die Instanz gelb; das Protokoll nennt die Ursache einmal, und der Adapter versucht einen ausgefallenen Roku oder die Erkennung jede Minute erneut, bis sie wieder laufen. |
| `info.devicesTotal`     | number, nur lesbar  | Wie viele emulierte Rokus eingerichtet sind.                                                                                                                                                                                                                                                                                    |
| `info.devicesOnline`    | number, nur lesbar  | Wie viele davon gerade lauschen.                                                                                                                                                                                                                                                                                                |
| `info.devicesAllOnline` | boolean, nur lesbar | `true`, solange jeder eingerichtete Roku lauscht; `false`, solange keiner eingerichtet ist.                                                                                                                                                                                                                                     |

Je emuliertem Roku, unterhalb von `fakeroku.0.<Name>`:

| Datenpunkt     | Typ                 | Bedeutung                                                                                                                                                                                                                        |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.online`  | boolean, nur lesbar | `true`, solange dieser Roku auf seinem Anschluss lauscht. Das Gerät zeigt im Objektbaum ein grünes oder graues Symbol, seine Karte im Gerätemanager online oder offline.                                                         |
| `info.error`   | string, nur lesbar  | Warum dieser Roku nicht läuft, z. B. `port 8061 is already in use (another program or another instance holds it)`; leer, solange er läuft, `Unknown`, solange der Adapter aus ist oder startet. Die Karte zeigt ihn als Warnung. |
| `command`      | string, nur lesbar  | Der letzte Befehl als lesbarer Text: `Home`, `Lit_a`, `launch:12`, `search:news`.                                                                                                                                                |
| `keys.<Taste>` | boolean, nur lesbar | Ein Datenpunkt je Taste. Ein Tastendruck setzt ihn kurz auf `true` und wieder auf `false`; eine gehaltene Taste bleibt `true`, bis sie losgelassen wird.                                                                         |

Tastatureingaben der Fernbedienung (`Lit_a`) und App-Starts erscheinen nur in
`command` — sie bekommen keine eigenen Datenpunkte. Die App-Taste einer Fernbedienung,
die App-Starts sendet (eine Sofabaton), kommt als `launch:<id>` an, mit
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
schreibt der Adapter das ins Protokoll, zeigt gelb, arbeitet für bereits gekoppelte
Fernbedienungen weiter und startet die Erkennung jede Minute erneut.

**Die Fernbedienung findet nichts, und ioBroker läuft in Docker.**
Im Standard-Bridge-Netz von Docker hat der Container nur eine interne Adresse, die keine
Fernbedienung erreicht, und Suchanfragen aus deinem Heimnetz kommen nie an. Starte den
ioBroker-Container mit `network_mode: host` oder gib ihm über ein `macvlan`-Netz eine
Adresse im Heimnetz.

**Im Protokoll steht „Address … does not exist on this host — listening on all addresses".**
Die in den Einstellungen gewählte Adresse gibt es auf dem Rechner nicht mehr — neue
Netzwerkkarte, geänderte DHCP-Adresse, eine Sicherung auf anderer Hardware
zurückgespielt. Die emulierten Rokus laufen solange auf allen Adressen weiter, die Instanz
zeigt gelb. Wähle die aktuelle Adresse (oder „alle Schnittstellen") und speichere; die
Instanz startet neu.

**Die Instanz bleibt gelb.**
Etwas läuft nicht, und das Protokoll sagt einmal, was. Welcher Roku es ist, zeigen seine
Karte im Gerätemanager (offline, mit dem Grund) und sein `info.error`; `info.devicesOnline`
sagt, wie viele laufen. Meist konnte ein konfigurierter
Roku nicht starten, weil sein Anschluss schon von etwas anderem belegt ist (auch von
einem zweiten emulierten Roku mit demselben Anschluss) — gib ihm einen freien. Der
Adapter versucht so einen Roku jede Minute erneut, auch einen, dessen Server im Betrieb
ausgefallen ist, und meldet im Protokoll, wenn er wieder läuft — ein Anschluss, den der
vorherige Prozess nach einem Neustart noch hielt, löst sich damit von allein. Ist gar
kein Roku angelegt, bittet das Protokoll, einen in den Instanzeinstellungen anzulegen.

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
Fernbedienungen, die App-Starts senden (eine Sofabaton), zeigen sie in
`command` als `launch:<id>`.

## Datenschutz

Der Adapter spricht ausschließlich mit Geräten in deinen eigenen Netzen.

Die Fehlermeldung über Sentry ist ab Werk aktiv; was sie sendet und wie man sie abschaltet, steht im [Abschnitt Sentry der Haupt-README](https://github.com/iobroker-community-adapters/ioBroker.fakeroku/blob/master/README.md#sentry--error-reporting).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.10.0 (2026-10-03)

- (krobipd) New: every emulated Roku shows whether it runs and, if not, why — a green or grey symbol in the object tree, online or offline on its card with the reason.
- (krobipd) New: three datapoints count the emulated Rokus — how many are configured, how many run, and whether all of them run.
- (krobipd) Fixed: the connection datapoint's description says what green means — every Roku listening, discovery answering and the chosen address present.

### 1.9.0 (2026-10-03)

- (krobipd) Changed: the emulated Roku answers only what a Harmony or Sofabaton reads — Home Assistant and openHAB can no longer set it up.
- (krobipd) Changed: the instance shows green only while every Roku and discovery run, and yellow otherwise.
- (krobipd) Changed: a Roku whose server stopped while running and a discovery that failed start again within a minute instead of waiting for a restart.
- (krobipd) Changed: with no Roku configured or none running, the instance stays up so the device manager works, and asks you to add a Roku.
- (krobipd) Changed: a chosen address that is missing on the host no longer leaves the Rokus off — they listen on all addresses until you choose another.
- (krobipd) Changed: requests from the ioBroker host itself or from self-assigned addresses outside the host's networks are refused.
- (krobipd) Changed: the datapoint with the kind of the last command is gone — the last command itself still arrives as before; existing installations drop it on the next start.

### 1.8.2 (2026-10-02)

- (krobipd) Changed: a new instance starts switched off — check the settings, then switch it on.
- (krobipd) Fixed: the README and the user documentation name admin 8.0.14, the version the adapter actually requires.
- (krobipd) Fixed: the device manager answers right after a restart instead of failing until the translations are loaded.
- (krobipd) Improved: the type of the last command shows a readable label in the language you set instead of a protocol word.
- (krobipd) Improved: a start writes only datapoints that changed and reads the key states in one request — no needless updates for history adapters.
- (krobipd) Improved: the README links the detailed user documentation in English and German.

### 1.8.1 (2026-09-27)

- (krobipd) Improved: the note the Admin shows before an update from 0.x is short now: the apps folder is removed, app launches arrive as launch:<id> in command.

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