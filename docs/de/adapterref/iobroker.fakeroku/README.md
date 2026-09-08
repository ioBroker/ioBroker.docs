---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.fakeroku
BADGE-stable: https://iobroker.live/badges/fakeroku-stable.svg
BADGE-Installations: https://iobroker.live/badges/fakeroku-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.fakeroku
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
oder eine Sofabaton X1/X2 — findet das emulierte Gerät, und jeder Tastendruck darauf
wird zu einem Datenpunkt in ioBroker, auf den Skripte und Visualisierungen reagieren
können.

Er ist das **Eingabe**-Gegenstück zum Logitech-Harmony-Adapter: Statt dass ioBroker
ein Gerät steuert, steuert ein Gerät den ioBroker.

> **Die offizielle Roku-App funktioniert mit diesem Adapter nicht.** Sie spricht mit
> echten Rokus über einen herstellereigenen, verschlüsselten Kanal, der sich nicht
> nachbauen lässt. Nutze einen Harmony-Hub oder eine Sofabaton — die sprechen das
> offene Protokoll, das dieser Adapter bedient.

## Voraussetzungen

- Node.js 22 oder neuer
- js-controller 7.2.2 oder neuer
- admin 8.0.11 oder neuer
- Eine Fernbedienung bzw. ein Hub im **selben Heimnetz** wie der ioBroker-Rechner

## Einrichtung

### 1. Instanz anlegen

Adapter installieren und eine Instanz anlegen. Er läuft sofort: Die Instanz bringt
bereits einen emulierten Roku mit, Name „Roku", Anschluss 8060.

### 2. Netzwerkkarte wählen (meistens: nicht)

Lass **Netzwerkkarte** auf „alle Schnittstellen". Der Adapter ermittelt dann selbst
die erreichbare Adresse deines ioBroker-Rechners und kündigt diese an.

Eine bestimmte Adresse wählst du nur, wenn dein ioBroker-Rechner in **mehreren
Netzen** hängt und die Fernbedienung nur eines davon erreicht.

### 3. Emulierte Rokus anlegen oder ändern

Jede Karte unter **Emulierte Roku-Geräte** ist ein Roku, den deine Fernbedienung
finden kann.

- **Name** — erscheint als Gerätename auf der Fernbedienung und als Ordner im
  Objektbaum. Nimm etwas Wiedererkennbares, zum Beispiel den Raum.
- **ECP-Anschluss** — der Netzwerk-Anschluss, auf dem dieser Roku antwortet. `8060`
  ist der Anschluss eines echten Roku. Jeder emulierte Roku braucht **seinen eigenen**;
  der Dialog schlägt einen freien vor und weist einen bereits belegten ab.
- **Typ**
  - **Player** (eine Streaming-Box) bietet die 16 üblichen Navigations- und
    Wiedergabetasten.
  - **TV** bietet zusätzlich Lautstärke, Ein/Aus, Programm und Eingangswahl. Wähle
    das nur, wenn du diese zusätzlichen Tasten wirklich als Auslöser in ioBroker
    haben willst.

### 4. Fernbedienung anlernen

**Logitech Harmony:** In der Harmony-App ein Gerät hinzufügen, als Hersteller
**Roku** wählen und auf deinen ioBroker-Rechner zeigen. Der Hub findet den emulierten
Roku von selbst und liest den Anschluss aus der Ankündigung — du musst ihn nicht
eintippen.

**Sofabaton X1/X2:** In der Sofabaton-App ein Roku-Gerät hinzufügen, während die App
im selben Netz ist. Der Adapter meldet eine aktuelle Roku-Version — genau das prüfen
diese Fernbedienungen, bevor sie ein Gerät annehmen.

## Was im Objektbaum entsteht

Auf Instanz-Ebene:

| Datenpunkt        | Typ                 | Bedeutung                                                                                                                                                                                                                   |
| ----------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | boolean, nur lesbar | Nur wahr, solange **jeder** konfigurierte Roku tatsächlich lauscht. Kann einer nicht starten — fast immer, weil sein Anschluss schon belegt ist — bleibt die Instanz getrennt, und das Protokoll nennt Gerät und Anschluss. |

Je emuliertem Roku, unterhalb von `fakeroku.0.<Name>`:

| Datenpunkt     | Typ                 | Bedeutung                                                                                                                                                |
| -------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command`      | string, nur lesbar  | Der letzte Befehl als lesbarer Text: `Home`, `Lit_a`, `launch:12`, `search:news`.                                                                        |
| `commandType`  | string, nur lesbar  | Um welche Art Befehl es sich handelte: `keypress`, `keydown`, `keyup`, `launch`, `install`, `input` oder `search`.                                       |
| `keys.<Taste>` | boolean, nur lesbar | Ein Datenpunkt je Taste. Ein Tastendruck setzt ihn kurz auf `true` und wieder auf `false`; eine gehaltene Taste bleibt `true`, bis sie losgelassen wird. |

Tastatureingaben der Fernbedienung (`Lit_a`) und App-Starts erscheinen nur in
`command` — sie bekommen keine eigenen Datenpunkte.

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
danach also nicht blockieren. Das Loslassen einer Taste wird nie verworfen — auch dann
nicht, wenn der Adapter gerade eine Befehlsflut abweist.

## Genutzte Anschlüsse

- **TCP 8060** (einer je emuliertem Roku, einstellbar) — das Steuerprotokoll. Hierhin
  sendet deine Fernbedienung ihre Tastendrücke.
- **UDP 1900** (Multicast) — die Geräteerkennung, damit die Fernbedienung die
  emulierten Rokus findet. Dieser Anschluss ist vom Standard vorgegeben und wird von
  allen gemeinsam genutzt.

Beantwortet werden nur Geräte aus deinem eigenen Heimnetz. Eine Anfrage aus dem
Internet wird abgewiesen, eine Suche von außen ignoriert.

Beim Stoppen der Instanz melden sich die emulierten Rokus im Netz ab. Die Fernbedienung
nimmt sie damit sofort aus ihrer Liste, statt noch eine Stunde lang Tastendrücke ins
Leere zu schicken.

Du kannst mehrere Instanzen auf demselben Rechner betreiben — gib jeder eigene
ECP-Anschlüsse. Die Geräteerkennung teilen sie sich: Wer zuerst startet, bekommt
UDP 1900, die anderen laufen ohne sie weiter, und bereits gekoppelte Fernbedienungen
kommen weiterhin durch.

Der Adapter läuft außerdem im Compact-Modus von ioBroker, in dem sich mehrere Adapter
einen Prozess teilen, statt dass jeder einen eigenen startet. Auf kleinen Rechnern
spart das Speicher und Startzeit. Eingeschaltet wird er in den Instanz-Einstellungen;
hier ist dafür nichts umzustellen.

## Fehlersuche

**Die Fernbedienung findet kein Gerät.**
Prüfe, ob Hub und ioBroker-Rechner im selben Netz sind und keine Firewall den
UDP-Anschluss 1900 blockiert. Bei einem Rechner mit mehreren Netzwerkkarten die
richtige unter **Netzwerkkarte** auswählen. Ist die Erkennung nicht verfügbar,
schreibt der Adapter das ins Protokoll und arbeitet für bereits gekoppelte
Fernbedienungen weiter.

**Die Fernbedienung findet nichts, und im Protokoll steht „advertising on 172.17.x.x".**
Diese Adresse gehört zu einer Docker-Brücke auf dem Rechner, nicht zu deinem
Heimnetz — keine Fernbedienung erreicht sie. Der Adapter bevorzugt von sich aus eine
echte Netzwerkadresse; das taucht also nur auf, wenn der Rechner in dem Moment keine
andere zu bieten hat. Wähle unter **Netzwerkkarte** die richtige aus und starte die
Instanz neu.

**Die Instanz bleibt „nicht verbunden".**
Mindestens ein konfigurierter Roku konnte nicht starten. Das Protokoll nennt Gerät
und Anschluss — fast immer ist der Anschluss schon von etwas anderem belegt (auch von
einem zweiten emulierten Roku mit demselben Anschluss). Gib ihm einen freien.
Der Adapter versucht es bei so einem Gerät jede Minute erneut und meldet im Protokoll,
wenn es hochkommt — ein Anschluss, den der vorherige Prozess nach einem Neustart noch
hielt, löst sich damit von allein.

**Ich drücke eine Taste und in ioBroker passiert nichts.**
Stelle die Protokollstufe der Instanz kurz auf `debug`. Jeder empfangene Befehl wird
mit Tastenname und Absenderadresse protokolliert. Erscheint nichts, erreicht die
Fernbedienung den Adapter nicht; erscheint etwas, ist der Befehl angekommen und das
Problem liegt im Skript, das den Datenpunkt liest.

**Wiedergabe und Pause tun dasselbe.**
Das ist das Roku-Protokoll, nicht der Adapter: Die Fernbedienung sendet für
Wiedergabe und Pause **denselben** Befehl, die beiden sind hier also nicht
unterscheidbar.

**Die App-Tasten meiner Harmony bewirken nichts.**
Die App-Tasten der Harmony (Netflix, YouTube …) hängen an Harmony-Aktivitäten und
werden nie an das Gerät gesendet — der Adapter sieht sie also nie.

## Datenschutz

Der Adapter spricht ausschließlich mit Geräten im Heimnetz. Er kontaktiert keinen
Cloud-Dienst und sendet nirgendwohin Daten. Die optionale Fehlerberichterstattung
über Sentry ist aus, solange du in den ioBroker-Systemeinstellungen die Diagnose
nicht eingeschaltet hast; sie überträgt eine anonyme Installations-Kennung und den
Fehler selbst, keine personenbezogenen Daten.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.6.1 (2026-09-07)

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

### 1.5.0 (2026-09-03)

- (krobipd) Fixed: deleting the last emulated Roku left all of its datapoints behind for good. They are now removed whenever the configuration says a device is gone.
- (krobipd) Fixed: on a host running Docker the adapter could announce itself under a container address no remote can reach. A real network address is preferred now.
- (krobipd) Fixed: an emulated Roku whose server died while running left the instance showing "connected". It now reports the failure and names the device.

### 1.4.0 (2026-09-03)
- (krobipd) Fixed: renaming an emulated Roku could change its identity on the network, so a paired Harmony or Sofabaton lost the device and had to be set up again.
- (krobipd) Fixed: a remote key that was pressed when the adapter stopped stayed on for good. All key datapoints are now released at start-up, so the next press works again.
- (krobipd) Fixed: a device named "info" entered by hand into the configuration replaced the instance's own status channel. The name is refused now and leftovers are removed.
- (krobipd) Changed: every datapoint now carries a translated name and, where useful, a short description — in all eleven languages, in existing installations as well.
- (krobipd) Improved: a remote with a globally routable IPv6 address is accepted when it sits in the same network as the ioBroker host, not just on the reserved IPv6 ranges.
- (krobipd) New: user documentation in English and German, shown in the ioBroker documentation portal.

### 1.3.0 (2026-09-01)
- (krobipd) Fixed: a malformed keyboard keypress from a remote (a bad %-escape in the URL) could crash the adapter.
- (krobipd) Fixed: remotes on an IPv6-only local network were refused; link-local and unique-local IPv6 addresses now count as LAN.
- (krobipd) Fixed: the adapter icon in the admin is now the same one shown on GitHub.
- (krobipd) Changed: requires admin >= 8.0.11.
- (krobipd) Improved: discovery answers only searches from your own network, and the device dialog in the admin keeps working after the device list was edited by hand.
- (krobipd) Improved: the emulated Roku reports Roku OS 15.0 (was 14.1), and the command-type datapoint lists its possible values so the admin shows them as labels.
- (krobipd) New: a misbehaving device on your network can no longer flood ioBroker — more than 25 commands per second per emulated Roku are dropped and reported in the log.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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

---

_Developed with assistance from Claude.ai_