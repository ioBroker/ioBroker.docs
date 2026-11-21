---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.snapmaker/README.md
title: ioBroker-Adapter für Snapmaker 2.0
hash: jL5I3T6YygBEmn6o51FJPkAgvy66EfIrqNqExdAbGgM=
---
![Logo](../../../en/adapterref/iobroker.snapmaker/admin/snapmaker-logo.png)

![Anzahl der Installationen](https://iobroker.live/badges/snapmaker-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/snapmaker-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.snapmaker.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.snapmaker.svg)
![GEMEINSCHAFT](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![WARTUNGSKRAFT](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![KI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# ioBroker-Adapter für Snapmaker 2.0

---

## Was dieser Adapter bewirkt

Verbindet **Snapmaker 2.0-** Maschinen (primäres Ziel: **A350** , auch mit Laser-/CNC-Werkzeugköpfen) über die lokale HTTP-API auf Port 560 mit ioBroker. `8080` Die

Typische Werte, die während eines Jobs auftreten:

- Aktueller / letzter **Dateiname**
- **Verbleibende** und verstrichene Zeit
- Fortschritt und Maschinenstatus (`IDLE`, `RUNNING`, `PAUSED`, …)

Die Verbindung nutzt den Token-Flow von Snapmaker (`POST /api/v1/connect` → optionale Touchscreen-Bestätigung → Abfrage `GET /api/v1/status`).

Sie können ein vorhandenes Luban-Token einfügen (`%APPDATA%\snapmaker-luban\machine.json` →`server.token`, UUID) in die Adaptereinstellungen einfügen, um eine neue Autorisierung zu überspringen.

Hersteller: [Snapmaker](https://snapmaker.com/) . Andere Snapmaker 2.0-Modelle (A150 / A250) funktionieren möglicherweise nach bestem Wissen und Gewissen; Artisan / U1 verwenden andere Protokolle und fallen nicht in den Geltungsbereich.

## Konfiguration

| Einstellung      | Standard | Beschreibung                                                                                                                                                                                                                                                                                              |
| ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IP-Adresse       | —        | Maschinenadresse (erforderlich), z. B. `192.168.150.150`                                                                                                                                                                                                                                                   |
| Umfrageintervall | `10` S   | Statusabfrageintervall (min. 2 s)                                                                                                                                                                                                                                                                         |
| API-Token        | leer     | Optionale UUID von Luban `server.token` In `machine.json` (`%APPDATA%\snapmaker-luban\machine.json` unter Windows; `~/.config/snapmaker-luban/machine.json` auf Linux; `~/Library/Application Support/snapmaker-luban/machine.json` (auf macOS). Lassen Sie dieses Feld leer, um ein neues Token anzufordern. |

Eine Maschine pro Adapterinstanz.

## Datenpunkte

Unter `snapmaker.<instance>.*`:

| Zustand                                | Beschreibung                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`                      | Verbindungsanzeige                                                                                                              |
| `info.series`                          | Maschinenserie (z. B. Snapmaker 2.0 A350)                                                                                       |
| `info.toolHead`                        | Werkzeugkopf von Connect `headType` (z.B `10W Laser` /`1.6W Laser` /`CNC` /`Print`)                                              |
| `info.x` /`info.y` /`info.z`           | Maschinenposition (mm)                                                                                                          |
| `info.homed`                           | Äxte sind auf dem Heimweg                                                                                                       |
| `status`                               | Maschinenstatus (`IDLE`, `RUNNING`, `PAUSED`, …)                                                                               |
| `printStatus`                          | Auftrags-/Druckstatus-Text                                                                                                      |
| `currentJob.fileName`                  | Aktueller/letzter Auftragsdateiname (vollständig, z. B. `Weihnachtsbude.nc`)                                                    |
| `currentJob.fileBase`                  | Jobdateiname ohne Erweiterung (z. B. `Weihnachtsbude`)                                                                          |
| `currentJob.progress`                  | Fortschritt in %                                                                                                                |
| `currentJob.elapsedTime`               | Verstrichene Zeit (Sekunden)                                                                                                    |
| `currentJob.elapsedText`               | Verstrichene Zeit (`HH:MM:SS`)                                                                                                 |
| `currentJob.remainingTime`             | Verbleibende Zeit (Sekunden)                                                                                                    |
| `currentJob.remainingText`             | Verbleibende Zeit (`HH:MM:SS`)                                                                                                 |
| `currentJob.estimatedTime`             | Geschätzte Gesamtbearbeitungszeit laut Maschine (Sekunden)                                                                      |
| `currentJob.estimatedText`             | Geschätzte Gesamtarbeitszeit (`HH:MM:SS`)                                                                                      |
| `currentJob.finishAt`                  | Geschätzte Fertigstellungszeit (Ortszeit) `YYYY-MM-DD HH:MM`)                                                                   |
| `currentJob.currentLine` /`totalLines` | G-Code-Zeilenfortschritt                                                                                                        |
| `modules.enclosure`                    | Beiliegendes Gehäuse                                                                                                            |
| `modules.rotary`                       | Drehmodul angeschlossen                                                                                                         |
| `modules.emergencyStop`                | Not-Aus-Schalter angebracht                                                                                                     |
| `modules.airPurifier`                  | Luftreiniger angeschlossen                                                                                                      |
| `enclosure.doorOpen`                   | Die Tür des Gehäuses ist offen.                                                                                                 |
| `enclosure.ready`                      | Gehäuseberichte bereit (nur mit einem Gehäuse)                                                                                  |
| `enclosure.doorDetection`              | Türerkennung aktiviert (nur mit Gehäuse)                                                                                        |
| `enclosure.light`                      | Helligkeit der Gehäusebeleuchtung in % (nur mit Gehäuse)                                                                        |
| `enclosure.fan`                        | Lüfterdrehzahl des Gehäuses in % (nur bei Verwendung eines Gehäuses)                                                            |
| `laser.modulePower`                    | Nennleistung des Lasermoduls (W) vom Anschluss `headType` (3→1,6, 4→10, 6→20, 7→40, 9→2; `0` (falls nicht Laser)                  |
| `laser.power`                          | Laserleistung (%) — letzter Wert ungleich Null während des Auftrags `RUNNING` /`PAUSED` (kein 0%-Flimmern zwischen den Vektoren) |
| `laser.powerRaw`                       | Laserleistung (%) — Live-Momentaufnahme der Maschine (kann sein `0` (zwischen den Zeilen)                                        |
| `laser.on`                             | `true` solange die Spannung größer als 0 ist                                                                                    |
| `laser.workSpeed`                      | Arbeitsgeschwindigkeit (`mm/min`)                                                                                              |
| `laser.focalLength`                    | Laserbrennweite, wie vom Gerät angegeben (mm)                                                                                   |
| `laser.errorState`                     | Fehlerzustand des Lasermoduls (`0` = OK)                                                                                        |
| `laser.camera`                         | Laserkamera erkannt                                                                                                             |

Die Jobfelder werden gefüllt, solange ein Job aktiv ist; auf inaktiven Maschinen können sie leer/null sein. Für eine detailliertere Live-Laseransicht verringern Sie das Abfrageintervall (z. B. 2–3 s) und verwenden Sie `laser.powerRaw` /`laser.on` Die

Der Gehäuseendpunkt wird nur abgefragt, wenn ein Gehäuse erkannt wird (`modules.enclosure`), weil Maschinen ohne Gehäuse sinnlose Standardwerte zurückgeben. `modules.*` Zustände werden nur dann belegt, wenn die Firmware eine Modulliste meldet.

## Unterstützung

Wenn Ihnen unsere Arbeit gefällt und Sie uns unterstützen möchten, freuen wir uns über jede Spende. (Dieser Link führt zu unserem PayPal-Konto und steht in keiner Verbindung zu ioBroker.)

[![Spenden](https://github.com/inventwo/ioBroker.snapmaker/blob/main/img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-11-18)
- (skvarel) Added `currentJob.fileBase` (job file name without extension)

### 0.5.3 (2026-11-17)
- (skvarel) Bump `@iobroker/testing` to 6.3.2 (`S0064`)

### 0.5.2 (2026-11-15)
- (skvarel) Clamp poll interval in code (min 2 s, max so timeout stays within setTimeout limits)

### 0.5.1 (2026-11-14)
- (skvarel) Fixed state roles: use `value` instead of `level` for read-only laser/enclosure percent states (`E1011`)

### 0.5.0 (2026-11-13)
- (skvarel) Added `laser.focalLength`, `laser.errorState`, `laser.camera`
- (skvarel) Added `currentJob.estimatedTime` / `estimatedText`
- (skvarel) Added `modules.*` (enclosure, rotary, emergency stop, air purifier) and `enclosure.ready` / `doorDetection` / `light` / `fan`
- (skvarel) Set `info.connection` to `false` on adapter stop
- (skvarel) Fixed `laser.modulePower` / `info.toolHead`: use connect `headType` (10W module was shown as 1.6W)

## License
MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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