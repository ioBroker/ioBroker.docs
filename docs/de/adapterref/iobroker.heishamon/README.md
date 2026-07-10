---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heishamon/README.md
title: ioBroker.heishamon
hash: g5Xgi5fLyaYC2rdWwxbDz4ddvnPoKNdQJmvrHYANf5Q=
---
# IoBroker.heishamon
Der ioBroker-Adapter ermöglicht die direkte Kommunikation mit dem **Panasonic Aquarea CN-CNT**-Protokoll über eine serielle Schnittstelle, ohne HeishaMon-Modul oder MQTT-Broker. Der CN-CNT-Anschluss der Wärmepumpe verwendet **5V TTL UART-Logikpegel**. Für den Anschluss an eine 3,3V-UART-Schnittstelle, wie z. B. die GPIO-UART-Schnittstelle des Raspberry Pi, ist ein geeigneter Pegelwandler erforderlich. Bei längeren Kabelstrecken kann optional ein TTL/RS485-Konverter eingesetzt werden, da das Protokoll Halbduplex ist. Die Protokolldekodierung basiert auf Erkenntnissen aus [HeishaMon-Projekt](https://github.com/Egyras/HeishaMon).

**Status:** Vorabversion. Protokollbibliothek, Simulator und Adapterlogik befinden sich in der Entwicklung; Feldtests an einer realen Wärmepumpe sind der nächste Schritt.

## Unterstützte Wärmepumpen
Panasonic Aquarea Luft-Wasser-Wärmepumpen der **H-, J-, K- und L-Serie**.

## Installation
Installieren Sie ioBroker über die Admin-Oberfläche aus dem offiziellen Repository: Öffnen Sie den Tab **Adapter**, suchen Sie nach **heishamon** und klicken Sie auf „Installieren“. Fügen Sie anschließend unter **Instanzen** eine Instanz hinzu.

### Voraussetzungen für die serielle Schnittstelle
Dies sind Schritte auf Hostseite, die die Administratoroberfläche nicht für Sie ausführen kann:

- Der Prozessbenutzer ioBroker (`iobroker` in der Standard-Linux-Installation) muss die Berechtigung haben, serielle Geräte zu öffnen. Unter Debian/Raspberry Pi OS bedeutet dies die Gruppe `dialout`:

```bash
groups iobroker                     # must contain 'dialout'
sudo usermod -aG dialout iobroker   # if not — then restart the whole ioBroker service
```

- Verwenden Sie einen stabilen Gerätepfad, damit der Port Neustarts und erneutes Anschließen übersteht. Bevorzugen Sie `/dev/serial/by-id/...` gegenüber `/dev/ttyUSB0`:

```bash
ls -l /dev/serial/by-id/
```

Bei einem Raspberry Pi GPIO UART ist der Pfad sowieso statisch (z.B. `/dev/ttyAMA2`).

Informationen zur Verdrahtung der Wärmepumpe finden Sie in [Verdrahtung](#wiring) weiter unten.

## Konfiguration
| Einstellung | Standard | Beschreibung |
|---|---|---|
| `device` | `/dev/ttyUSB0` | Pfad zum seriellen Gerät, das der Adapter öffnet. Muss für den ioBroker-Prozess lesbar sein. |
| `pollIntervalSec` | `5` | Wie oft der Adapter die Wärmepumpe abfragt (Sekunden). |
| `extraPollEnabled` | `false` | Fragt den zusätzlichen Energiedatenblock ab (nur K/L-Serie). Standardmäßig deaktiviert – nur bei einer K/L-Pumpe aktivieren; bei H/J-Modellen tritt bei der zusätzlichen Abfrage ein Timeout auf. |
| `readOnlyMode` | `false` | Nur passives Zuhören: Es werden keine Abfragen oder Set-Befehle gesendet, sondern nur Frames von einem anderen Master im Bus dekodiert. |
| `readOnlyMode` | `false` | Nur passives Zuhören: Es werden keine Abfragen oder Set-Befehle gesendet, sondern nur Frames von einem anderen Master im Bus dekodiert. |

## Merkmale
- **Direkte serielle Kommunikation** mit Panasonic Aquarea Wärmepumpen über den CN-CNT-Anschluss. Weder HeishaMon-Hardware noch ein MQTT-Broker sind erforderlich.
- **157 Datenpunkte**, die als ioBroker-Zustände mit den entsprechenden Rollen, Typen und Einheiten bereitgestellt werden.
- **Set-Befehle** für alle beschreibbaren Parameter, die vom CN-CNT-Protokoll unterstützt werden.
- **Nur-Lese-Modus** für sicheren Parallelbetrieb neben einer bestehenden HeishaMon-Installation (Phase-4-Umstellung).
- **Statistiken zur Verbindungsqualität** (eingehende/ausgehende Frames, CRC-Fehler, Timeouts) unter dem Kanal `info.*`.
- **Optionaler zusätzlicher Datenblock** für Wärmepumpen der K/L-Serie (6 zusätzliche Energiedatenpunkte).

## ⚠️ Überlegungen zur Schreibrate
Der interne Speichermechanismus des Panasonic Aquarea-Controllers für Einstellungen ist nicht dokumentiert. Bei normaler Nutzung – manuelle Änderungen, gelegentliche Smart-Home-Automatisierung – ist Verschleiß sehr unwahrscheinlich; die HeishaMon-Community verfügt über jahrelange Betriebserfahrung ohne gemeldete Ausfälle. Allerdings könnten häufige Schreibvorgänge (z. B. ein PID-Regler, der alle paar Sekunden einen Sollwert anpasst) theoretisch eine EEPROM-Zelle mit der Zeit erschöpfen, wenn der Controller kein FRAM, MRAM oder ein RAM mit automatischer Speicherbereinigung bei Stromausfall verwendet.

**Vermeiden Sie es, denselben Datenpunkt häufiger als alle paar Minuten zu schreiben,** es sei denn, Sie wissen genau, dass Ihre Reglerversion dies zulässt. Für die Regelung im geschlossenen Regelkreis ist ein langsamer äußerer Regelkreis, der die internen Regler der Wärmepumpe steuert, vorzuziehen, anstatt den Aktor direkt anzusteuern.

## Was Sie benötigen
Kein HeishaMon-Gerät, kein ESP, kein MQTT-Broker erforderlich. Dieser Adapter kommuniziert direkt mit dem Panasonic CN-CNT-Protokoll. Sie benötigen lediglich eine serielle Verbindung zwischen der Wärmepumpe und dem Rechner, auf dem ioBroker läuft (PC, Heimserver, NAS, Raspberry Pi usw.).

**Kenntnisse erforderlich – bitte zuerst lesen.** Für die Einrichtung muss die Elektronikabdeckung der Wärmepumpe geöffnet und zwei Datenleitungen sowie die Erdung an einen internen Anschluss angeschlossen werden. Sie sollten mit dünnen Kabeln und grundlegenden Elektronikkenntnissen (Logikpegel, Masseschleifen, RS485) vertraut sein. Es handelt sich um Niederspannung (5-V-Signalisierung), **nicht** um Netzspannung – dennoch können ein falscher Anschluss oder eine verpolte Verkabelung die Wärmepumpe beeinträchtigen. Wenn Ihnen diese Beschreibung unsicher erscheint, ist dies kein geeignetes erstes Elektronikprojekt.

⚠️ **Das Öffnen des Geräts erfolgt auf eigene Gefahr und Haftung – keine Gewährleistung.** Durch das Öffnen des Geräts kann die Herstellergarantie erlöschen. Schalten Sie die Wärmepumpe vor dem Anschließen aus.

**Zweimal messen, einmal anschließen.**

### Das Signal und der Baustein
Im Kern handelt es sich lediglich um eine **serielle Verbindung zwischen dem ioBroker-Host und der Wärmepumpe** – nichts Komplizierteres. Die Frage ist nur, wie diese Verbindung physisch realisiert werden kann.

Die Wärmepumpe verfügt über einen einfachen **5-V-TTL-UART-Anschluss**. Am einfachsten lässt sich die Verbindung mit einem **5-V-USB-zu-TTL-UART-Adapter** herstellen: Nur drei Drähte – **GND ↔ GND** und die beiden Datenleitungen **gekreuzt** (Wärmepumpe TX → Adapter RX, Wärmepumpe RX → Adapter TX) – lassen +5 V / +12 V unverbunden. Ein vorverdrahtetes `PHR-4`-Anschlusskabel an **CN-NMODE** macht dies oft lötfrei.

**Galvanische Trennung ist optional – aber seien Sie sich der Risiken bewusst.** Die RX/TX-Pins der Wärmepumpe können **direkt mit dem Mikrocontroller** verbunden sein, ohne oder mit nur geringem Schutz dazwischen. Überspannung oder -strom auf diesen Leitungen – beispielsweise durch eine Masse-/Ausgleichsstromschleife, einen Kurzschluss oder wenn ein +12-V-Pin versehentlich eine Signalleitung berührt – können den Mikrocontroller zerstören und die Wärmepumpen-Hauptplatine unbrauchbar machen. Wenn Sie sich bezüglich Masse-/Ausgleichsströmen zwischen Wärmepumpe und Host unsicher sind, kann ein günstiger **USB-Isolator** auf der USB-Seite diesen Pfad unterbrechen.
Andernfalls schützen Sie die Leitungen auf andere Weise (z. B. mit Serienwiderständen oder PTC-Sicherungen). Viele Installationen funktionieren problemlos ohne Trennung, aber diese Entscheidung treffen Sie bewusst.

Dieser einfache Adapter ist nur dann ausreichend, **wenn der ioBroker-Host tatsächlich neben der Wärmepumpe steht** – zum Beispiel bei einem Bench-Test oder einem kleinen SBC, der direkt am Gerät montiert ist.

### Empfohlene Konfiguration — 2-Draht-RS485 über Distanz
In der Praxis befindet sich der ioBroker-Host in einem anderen Raum oder auf einer anderen Etage, nicht 2 m von der Wärmepumpe entfernt. Die sinnvolle Verbindung in der Praxis ist daher **RS485 über ein geschirmtes verdrilltes Adernpaar**, was auch dem Halbduplex-Charakter des Protokolls entspricht:

```
heat pump (5 V TTL, CN-NMODE)
   └─ TTL↔RS485 converter        ← near the heat pump
        └─ shielded twisted pair, 120 Ω termination at BOTH ends, mind A/B
             └─ RS485↔USB adapter ← at the ioBroker host
                  └─ USB → ioBroker host  →  /dev/serial/by-id/…
```

Sie bauen die gleiche TTL-Frontend-Schaltung wie oben beschrieben auf, aber anstatt die gesamte Strecke über USB zu verlegen, wandeln Sie das Signal direkt an der Wärmepumpe in RS485 um und verbinden es mit dem Host über zwei Drähte. Die kleinen **TTL↔RS485-Konverterplatinen** kosten nur wenige Euro bei den üblichen Online-Händlern und verfügen in der Regel bereits über einen **grundlegenden Leitungsschutz** (TVS-Dioden/Vorwiderstände) – eine willkommene zusätzliche Sicherheitsreserve auf der Wärmepumpenseite. Die galvanische Trennung ist optional und lässt sich, falls verwendet, am einfachsten auf der USB-Seite des Hosts realisieren.

Egal welchen Weg Sie wählen, der Adapter sieht immer nur einen **lokalen seriellen Gerätepfad** — weiter bei [Konfiguration](#configuration).

### Weitere Varianten (fortgeschritten)
<details><summary>Raspberry Pi GPIO UART (ioBroker läuft auf dem Pi selbst)</summary>

Der Pi GPIO UART arbeitet mit **3,3 V**, die Wärmepumpe mit 5 V TTL, daher ist ein **Pegelwandler zwingend erforderlich**. Der GPIO-Anschluss ist auch der natürliche Host-Anschluss der RS485-Verbindung (RS485↔UART-Wandler → Pegelwandler → GPIO). Drei Schritte:

1. **Wählen Sie eine Hardware-UART-Schnittstelle und deren Pins.** Verwenden Sie eine echte PL011-Schnittstelle, nicht die Mini-UART-Schnittstelle.

`ttyS0` (seine Baudrate driftet mit dem Kerntakt). Auf einem Pi 4/5 sind die zusätzlichen PL011-Pins festen GPIO-Paaren (TXD/RXD) zugeordnet, z. B. `uart2`→GPIO0/1, `uart3`→GPIO4/5, `uart4`→GPIO8/9, `uart5`→GPIO12/13. Verbinden Sie die Wärmepumpenverbindung (über den Pegelwandler) mit einem dieser Paare – gekreuzt, plus GND.

2. **Aktivieren Sie die UART-Schnittstelle in der Boot-Konfiguration.** Fügen Sie `dtoverlay=uart3` (oder den entsprechenden Wert) hinzu.

(Sie haben ausgewählt) zu `/boot/firmware/config.txt` (älteres Raspberry Pi OS: `/boot/config.txt`) und neu starten.

3. **Suchen Sie den passenden Geräteknoten.** Nach dem Neustart wird die UART-Schnittstelle wie folgt angezeigt:

`/dev/ttyAMAx`; Bestätigen Sie mit `dmesg | grep ttyAMA` oder `ls -l /dev/serial*`, welcher Knoten zu Ihrem Overlay gehört, und geben Sie dann diesen stabilen Pfad in der Adapterkonfiguration ein.

Die genauen Anschlussbelegungen (CN-CNT und CN-NMODE) finden Sie in [Verdrahtung](#wiring).

</details>

## Verkabelung
⚠️ **Zweimal messen, einmal anschließen.** Alle hier angebotenen Produkte werden **ohne jegliche Gewährleistung** bereitgestellt und **ausschließlich auf eigenes Risiko und eigene Haftung** verwendet.

☠️ **Eine falsche Verbindung kann die Wärmepumpe zerstören.** Die RX/TX-Pins CN-CNT/CN-NMODE können **direkt mit dem Mikrocontroller der Wärmepumpe verbunden sein**, ohne oder mit nur geringem Schutz dazwischen. Beachten Sie die **+5-V- und +12-V-Pins direkt neben den Signalleitungen** in den folgenden Tabellen: Eine Berührung eines Signalpins mit +12 V, eine Verpolung oder ein Masse-/Ausgleichsstromstoß können **den Mikrocontroller zerstören und zu einem Totalausfall des Mainboards führen.** Überprüfen Sie daher alle Pins sorgfältig, bevor Sie das Gerät einschalten.

Die Hauptplatine der Wärmepumpe verfügt über zwei gleichwertige Anschlüsse, die dieser Adapter verwenden kann: **CN-CNT** und **CN-NMODE**. Beide funktionieren – wählen Sie den, der leichter zugänglich ist.

![Panasonic Aquarea Hauptplatine mit den Anschlüssen CN-CNT und CN-NMODE](../../../en/adapterref/iobroker.heishamon/docs/images/mainboard-connectors.jpg)

`CN-CNT` ist der Anschluss, der normalerweise für das **CZ-TAW1-Cloud-Modul** oder die **optionale Leiterplatte** verwendet wird:

- Wenn ein **CZ-TAW1**-Modul angeschlossen ist, betreiben Sie diesen Adapter im **schreibgeschützten Modus**, sodass er nur zuhört und den Bus niemals ansteuert.
Mit der optionalen Leiterplatte (PCB) gibt es zwei Busmaster, wodurch Kollisionen auftreten können – die Funktion sollte aber in der Regel dennoch gegeben sein. Nach einem CRC-Fehler wartet der Adapter eine zufällige Zeit, bevor er erneut auf den Bus zugreift, um die Kollisionssynchronisation aufzuheben (siehe die Hinweise zum reaktionsgesteuerten Bus im Änderungsprotokoll).

Beide Anschlüsse übertragen ein **5V TTL UART**-Signal, daher ist für 3,3V-Hosts wie den Raspberry Pi GPIO ein Pegelwandler erforderlich. Die unten aufgeführten Signalbezeichnungen beziehen sich **auf die Wärmepumpe** – sie müssen am Adapterende gekreuzt werden (Wärmepumpe TX → Adapter RX, Wärmepumpe RX → Adapter TX).

### CN-CNT — JST `B05B-XASK-1` (Gegenstecker `PAP-05V-S`)
| Pin | Signal |
|---|---|
| 1 | +5 V |
| 2 | TX, 5V-Pegel (von der Wärmepumpe) |
| 3 | RX, 5V-Pegel (zur Wärmepumpe) |
| 4 | +12 V |
| 5 | GND |

### CN-NMODE — JST PH-Serie (passender Stecker `PHR-4`, vorverdrahtet bei den üblichen großen Online-Händlern erhältlich)
| Pin | Signal |
|---|---|
| 1 | GND |
| 2 | RX, 5V-Pegel (zur Wärmepumpe) |
| 3 | TX, 5V-Pegel (von der Wärmepumpe) |
| 4 | +5 V |

Beispiel — ein UART-zu-RS485-Konverter, der an den `CN-NMODE`-Anschluss (das Wärmepumpenende der RS485-Fernstreckenvariante) angeschlossen ist:

![UART-zu-RS485-Konverter, der mit dem CN-CNT-Anschluss verbunden ist](../../../en/adapterref/iobroker.heishamon/docs/images/cn-cnt-rs485-converter.jpg)

## Fehlerbehebung
- **`EACCES` auf dem seriellen Gerät** – der Benutzer des ioBroker-Prozesses ist nicht Mitglied der Gruppe `dialout`. Nach `sudo usermod -aG dialout iobroker` starten Sie den gesamten ioBroker-Dienst neu (`sudo systemctl restart iobroker`), nicht nur die Instanz – die Gruppenzugehörigkeit wird erst in einer neuen Sitzung wirksam.
- **Adapter startet, aber es werden keine Datenpunkte angezeigt** – Überprüfen Sie die Verdrahtung am CN-CNT-Anschluss (TX↔RX kreuzen, GND anschließen, 5-V-TTL-Pegel beachten, siehe [Verdrahtung](#verdrahtung)). Bei einem TTL↔RS485-Konverter überprüfen Sie zusätzlich die Polarität A/B und die Abschlusswiderstände. Eine funktionierende Verbindung liefert innerhalb weniger Sekunden ca. 157 Datenpunkte unter `heishamon.0.main.*` und setzt `heishamon.0.info.connection` auf `true`.
- **Set-Befehle haben keine Auswirkung** – `readOnlyMode` ist eine bewusst gewählte Sicherheitseinstellung für den ersten Start. Deaktivieren Sie sie erst, wenn der Lesevorgang fehlerfrei läuft.
- **Anschluss über den CZ-TAW1-Bus** — Halten Sie den Adapter im `readOnlyMode`, da es sonst zu Buskollisionen mit dem Panasonic Cloud-Modul kommt.

## Dokumentation
Die Projektdokumentation befindet sich unter [Dokumente/](docs/):

- [docs/plan/](docs/plan/) — Phasenplan und Roadmap.
- [docs/protocol/](docs/protocol/) — CN-CNT-Protokollanalyse.
- [docs/decisions/](docs/decisions/) — Architekturentscheidungsdatensätze.

## Credits und Upstream-Lizenzierung
Die Protokolldekodierung baut auf den Arbeiten von [HeishaMon-Community](https://github.com/Egyras/HeishaMon) auf. Die CN-CNT-Registerzuordnung und viele Implementierungshinweise haben ihren Ursprung dort.

Zum Zeitpunkt der Erstellung dieses Dokuments enthält das HeishaMon-Repository **keine explizite Lizenzdatei** – weder `LICENSE`, noch einen Header im Quellcode oder einen eindeutigen Hinweis in der README-Datei. Gemäß US-amerikanischem und EU-Urheberrecht gilt standardmäßig „Alle Rechte vorbehalten“, weshalb wir den Originalcode weder kopieren noch direkt portieren dürfen. Um dies zu vermeiden:

- Die HeishaMon C++-Quelltexte dienen **ausschließlich als Referenz** zum Verständnis des Panasonic CN-CNT-Protokolls.
Dieser Adapter ist eine **komplette TypeScript-Neuimplementierung**: Wir haben die Upstream-Quellen gelesen, das Protokoll in [docs/protocol/](docs/protocol/) destilliert und es anhand dieser Dokumentation implementiert – nicht anhand des Originalcodes.
- Die Protokolldokumentationsdateien des HeishaMon-Repositorys (`MQTT-Topics.md`, `OptionalPCB.md`, `ProtocolByteDecrypt.md`) beschreiben ein beobachtbares physikalisches Protokoll – das sind Fakten und unterliegen nicht dem Urheberrecht; sie werden gegebenenfalls als Quellen zitiert.

Das CN-CNT-Protokoll selbst wird von Panasonic nicht veröffentlicht; HeishaMons Entdeckung beruht auf empirischen Beobachtungen. Fakten sind nicht urheberrechtlich geschützt, die konkrete C++-Implementierung dieser Entdeckungen jedoch schon.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.0.14 (2026-06-29)
* (Tobias Hanss) Corrected the maintainer email address in the package metadata (`package.json`, `io-package.json`)
* (Tobias Hanss) `extraPollEnabled` now defaults to **off** (opt-in) — the K/L-series extra data block is only polled when explicitly enabled, so a fresh install never polls datapoints that H/J pumps cannot provide. Existing instances keep their current setting
* (Tobias Hanss) Documentation: reworked the hardware/wiring section — clarified that only a plain serial link is needed (no HeishaMon device), made 2-wire RS485 the recommended real-world path, added a Raspberry Pi GPIO UART step-by-step, and a dead-mainboard warning at the wiring pinouts

### 0.0.13 (2026-06-28)
* (Tobias Hanss) Release now uses npm trusted publishing (provenance via OIDC) on Node 24 — fixes repository-checker E2008/E3019/E3022
* (Tobias Hanss) Removed the redundant `mocha` dev-dependency (it ships with `@iobroker/testing`) — E0063; the CI `adapter-tests` job now declares `needs: check-and-lint` — E3014
* (Tobias Hanss) Lint-config cleanup: dropped `.prettierignore` in favour of `// prettier-ignore` markers on the datapoint tables — W0084/W5048. No functional change

### 0.0.12 (2026-06-28)
* (Tobias Hanss) Resilient startup: a failed serial open no longer terminates the adapter — it stays alive, sets `info.connection=false` and retries
* (Tobias Hanss) Polling reworked to a setTimeout-at-end-of-tick scheme so poll ticks can never overrun or pile up in the wire queue, even under sustained communication failure
* (Tobias Hanss) `validateConfig()` now validates and safely clamps the user-configurable timeouts/gaps (`responseTimeoutMs`, `setCommandGapMs`, `sendMaxRetries`) to the Node.js timer ceiling
* (Tobias Hanss) `info` channel name fully translated (all 11 languages); setup help texts clarified
* (Tobias Hanss) Documentation: folded the install notes into the README and removed the separate INSTALL.md
* (Tobias Hanss) Tooling: adopted the standard ioBroker test-and-release workflow (testing-action-check / -adapter / -deploy) and migrated to `@iobroker/eslint-config`. No change to the heat-pump protocol

### 0.0.11 (2026-06-21)
* (Tobias Hanss) Object state roles for writable datapoints are now `level` instead of `value` (the `value` role requires `write=false`), fixing the repository checker's object-structure errors (E1011)
* (Tobias Hanss) State objects are now updated on upgrade (`extendObject`) so existing installations pick up the corrected roles
* (Tobias Hanss) Added the recommended i18n translations for the `info.connection` state name (W1001)

### 0.0.10 (2026-06-21)
* (Tobias Hanss) Published from CI with npm provenance (signed build attestation). No change to the adapter itself

### 0.0.9 (2026-06-21)
* (Tobias Hanss) CI: the release workflow's npm-publish step is now idempotent — it skips publishing when the version is already on npm, so a manual publish no longer makes the tagged release run fail. No change to the adapter itself

### 0.0.8 (2026-06-20)
* (Tobias Hanss) Maintenance for ioBroker repository acceptance: adapter-managed timers for clean shutdown, Node.js >=22 required, CI runs the adapter tests on Linux, Windows and macOS. No functional change to the heat-pump communication

### 0.0.7 (2026-05-30)
* (Tobias Hanss) Response-driven half-duplex bus: every send now waits for the heat pump's reply (or a timeout) before the next frame goes out, and retries up to 3 times on timeout or CRC error
* (Tobias Hanss) After a CRC error a randomised backoff precedes the next bus access to avoid lock-step collisions with a second master (Option-PCB)
* (Tobias Hanss) New "Diagnostics" setting toggles the set-command response logging (off by default)

### 0.0.6 (2026-05-30)
* (Tobias Hanss) Diagnostic logging to reverse-engineer the heat pump's SET acknowledgement: logs the sent frame and the heat pump's reply (frame type, timing, hexdump) at info level

### 0.0.5 (2026-05-30)
* (Tobias Hanss) Wire-queue gap is now enforced between every pair of sends, including across idle periods (previously the gap only applied while multiple tasks were already stacked in the queue — so polls and isolated sets bypassed it entirely)
* (Tobias Hanss) Queue is hard-capped at 100 pending entries; overflows are logged at warn level and the dropped send is skipped instead of silently piling up

### 0.0.3 (2026-05-26)
* (Tobias Hanss) Serialize all wire writes through a FIFO queue with a configurable inter-frame gap (default 200 ms). Fixes lost set commands when a script writes several datapoints at once
* (Tobias Hanss) Pump_Duty / Max_Pump_Duty unit removed (raw value 65-254, no physical unit)

### 0.0.2 (2026-05-25)
* (Tobias Hanss) Lower Node.js engine requirement to >= 20 (was 22) so the adapter installs on current ioBroker LTS hosts

### 0.0.1 (2026-05-25)
* (Tobias Hanss) Initial adapter release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Tobias Hanss <t.dev@familie-hanss.de>

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
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE DEALINGS IN THE SOFTWARE.