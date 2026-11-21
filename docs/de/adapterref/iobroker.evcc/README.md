---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.evcc/README.md
title: ioBroker.evcc
hash: 7udz7n4TzMv7UZDymeE6SlNIHn6Z+23crwx2ZA/yuyA=
---
![Logo](../../../en/adapterref/iobroker.evcc/admin/evcc.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.evcc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.evcc.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/evcc-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/evcc-stable.svg)
![NPM](https://nodei.co/npm/iobroker.evcc.png?downloads=true)
![Test und Freigabe](https://github.com/Newan/ioBroker.evcc/workflows/Test%20and%20Release/badge.svg)

# ioBroker.evcc

## evcc-Adapter für ioBroker

[evcc](https://evcc.io) steuert das Laden Ihres Elektroautos mit Solarenergie. Dieser Adapter verbindet ioBroker mit Ihrem evcc: Er zeigt alle Werte von evcc in ioBroker an (Leistung, Ladestatus, Preise, Fahrzeuge usw.) und ermöglicht Ihnen die Steuerung des Ladevorgangs über Skripte, Blockly oder Ihre Visualisierung – z. B. das Starten oder Stoppen des Ladevorgangs, das Festlegen eines Ladeziels oder eines Ladeplans.

Forum: <https://forum.iobroker.net/topic/49165/neuer-adapter-iobroker-evcc>

## Anforderungen

- eine laufende evcc-Installation, die ioBroker über das Netzwerk erreichen kann (Weboberfläche, Standardport 7070).
- evcc 0.316 oder neuer wird empfohlen, ältere Versionen funktionieren aber weiterhin.

## Erste Schritte

1. Installieren Sie den Adapter und öffnen Sie die Instanzeinstellungen.
2. Geben Sie die IP-Adresse oder den Hostnamen von evcc ein (ohne `http://`) und dem Hafen.
3. Klicken Sie auf **„Verbindung testen“** – der Adapter zeigt die EVCC-Version sowie Ihre Lastpunkte und Fahrzeuge an.
4. Speichern. Nach einigen Sekunden erscheinen die Werte in den Objekten unter `evcc.0` Die

## Konfiguration

| Einstellung            | Bedeutung                                                                                                                                                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Host- oder IP-Adresse  | Adresse von evcc, z.B. `192.168.1.10` oder `evcc.local`                                                                                                                                                                                     |
| Hafen                  | Portierung der EVCC-Weboberfläche, üblicherweise `7070`                                                                                                                                                                                    |
| Umfrageintervall       | Wie oft evcc ausgelesen wird. Kürzere Intervalle liefern aktuellere Werte, erhöhen aber die Systemlast. Standardwert: 60 Sekunden.                                                                                                        |
| Testverbindung         | Überprüft die eingegebene Adresse, ohne sie zu speichern.                                                                                                                                                                                 |
| Statusobjekte auflösen | Aus: Zusammengehörige Werte (z. B. Netzstrom, PV-Anlage, Batterie) werden in einem Datenpunkt gespeichert. Ein: Jeder Wert erhält einen eigenen Datenpunkt – praktisch für Visualisierungen und Diagramme, erzeugt aber mehr Datenpunkte. |
| Prognosen              | Speichert die Prognosen von EVCC (Solarstrom, Preise, CO₂-Emissionen, Temperatur). Wird nur benötigt, wenn Sie diese in ioBroker auswerten möchten; erzeugt ca. 1.800 Datenpunkte.                                                        |

## Datenpunkte

| Weg                            | Inhalt                                                                                                                |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `info.connection`              | `true` solange evcc erreichbar ist                                                                                    |
| `status`                       | Werte des gesamten Standorts, z.B. `pvPower`, `homePower`, `tariffGrid`                                               |
| `control`                      | Einstellungen des gesamten Standorts, z. B. Heimbatterie (`bufferSoc`, `prioritySoc` und Preislimits                  |
| `loadpoint.1`, `loadpoint.2` … | ein Eintrag pro Ladepunkt (benannt wie in evcc), mit `status` (aktuelle Werte) und `control` (Einstellungen und Tasten) |
| `vehicle.<name>`               | Ein Eintrag pro Fahrzeug (benannt wie in EVCC): minimaler und angestrebter Ladezustand, Ladeplan                      |

Alles unten `control` kann geändert werden – der Adapter sendet den neuen Wert an evcc.

## Ladekontrolle

| Datenpunkt                                      | Was es tut                                                                                                                                                       |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `loadpoint.X.control.off` /`.now` /`.smart`     | Tasten: Ladevorgang stoppen, jetzt mit voller Leistung laden, mit Solarenergie laden                                                                             |
| `loadpoint.X.control.pvControl`                 | dasselbe wie ein Wert: `0` aus, `1` schlau, `2` Smart + immer aufladen `3` Jetzt. Zeigt auch den aktuellen Modus an.                                                 |
| `loadpoint.X.control.alwaysCharge`              | `on` Im intelligenten Modus immer mindestens mit minimaler Leistung laden. `once` nur bis das Fahrzeug abgekoppelt ist, `off`                                     |
| `loadpoint.X.control.limitSoc`                  | Auf diesen Betrag aufladen (%)                                                                                                                                   |
| `loadpoint.X.control.minCurrent` /`.maxCurrent` | minimaler / maximaler Ladestrom (A)                                                                                                                              |
| `loadpoint.X.control.batteryBoost`              | `true`: Verwenden Sie auch die Heimbatterie zum Laden, bis hin zu `batteryBoostLimit` (%). Mit `batteryBoostLimit` = 100 Der Boost ist aus                        |
| `loadpoint.X.control.limitEnergy`               | Nur diese Energie (kWh) wird für Gastfahrzeuge oder Fahrzeuge ohne Ladezustand geladen. Wird vom EVCC entfernt, sobald das Fahrzeug vom Stromnetz getrennt wird. |
| `loadpoint.X.control.priority`                  | Bei mehreren Lastpunkten erhält derjenige mit der höheren Priorität zuerst den Solarstrom.                                                                       |
| `loadpoint.X.control.pv` /`.min`                | alte Knöpfe, funktionieren noch (smart ohne / mit immer Ladung)                                                                                                  |

## Heimbatterie

Wenn evcc Ihre Heimbatterie steuert, kann ioBroker dessen Modus entsprechend einstellen. `control.batteryMode`:

| Wert         | Was geschieht                                           |
| ------------ | ------------------------------------------------------- |
| `off`        | evcc steuert die Batterie selbst (Standardeinstellung). |
| `normal`     | Normalbetrieb                                           |
| `hold`       | Die Batterie ist nicht entladen.                        |
| `charge`     | Die Batterie wird über das Stromnetz geladen.           |
| `holdcharge` | Der Akku ist nicht geladen.                             |
| `discharge`  | Die Batterie wird ins Stromnetz entladen.               |

Der Modus bleibt so lange aktiv, bis Sie ihn einstellen. `off` Der Adapter sendet die Anfrage alle 30 Sekunden an evcc, da evcc nach einer Minute ohne neue Anfrage wieder die Steuerung übernimmt. Solange ein Modus eingestellt ist, gelten die eigenen Batterieregeln von evcc (z. B. Preislimit) nicht. Kann evcc eine Batterie nicht steuern, gibt der Adapter eine Warnung aus und setzt den Wert zurück. `off` Die

## Ladeplan

Mit einem Ladeplan wird das Fahrzeug bis zu einem bestimmten Zeitpunkt bis zum Zielwert aufgeladen, vorzugsweise mit Solarenergie oder zu günstigen Preisen. Legen Sie dies pro Ladepunkt fest unter `loadpoint.X.control.plan`:

| Datenpunkt    | Bedeutung                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------- |
| `plan.time`   | wenn das Ziel erreicht werden muss. Leer oder in der Vergangenheit: in 24 Stunden                 |
| `plan.soc`    | Zielladestand in % (wird verwendet, wenn ein Fahrzeug dem Ladepunkt zugewiesen wird)              |
| `plan.energy` | Zu ladende Energie in kWh (wird verwendet, wenn kein Fahrzeug zugewiesen ist, z. B. Gastfahrzeug) |
| `plan.active` | `true` erstellt den Plan, `false` Löscht es. Zeigt an, ob in evcc ein Plan festgelegt ist.         |

Satz `time` Und `soc` /`energy` zuerst, dann `active = true` Gleiches gilt pro Fahrzeug unter `vehicle.<name>.plan` Die

## Anmerkungen

- **evcc-Neustarts (z. B. Updates):** Der Adapter schreibt eine Warnung und setzt `info.connection` Zu `false` und verbindet sich automatisch wieder. Sobald evcc wieder erreichbar ist, erscheint eine Informationsmeldung im Protokoll.
- **Änderungen in evcc** (neue, entfernte oder umbenannte Ladepunkte und Fahrzeuge) werden automatisch übernommen. Objekte von Ladepunkten und Fahrzeugen, die nicht mehr in evcc vorhanden sind, werden nach dem Start des Adapters oder einem Neustart von evcc gelöscht.
- **Werte, die evcc nicht mehr meldet** (z. B. die verbleibende Ladezeit nach dem Ladevorgang), werden auf leer gesetzt (`null`).
- **Skripte aus älteren Versionen:** seit evcc 0.316 `loadpoint.X.status.mode` Shows `smart` anstatt `pv` /`minpv`. Verwenden `loadpoint.X.control.pvControl` um die verschiedenen Modi zu unterscheiden.
- `loadpoint.X.status.planActive` Kommt von EVCC und bedeutet „wird gerade gemäß Plan geladen“, nicht „es ist ein Plan festgelegt“.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.3 (2026-11-17)
* (Schimi1983) new: `control.batteryMode` sets the home battery mode in evcc (normal, hold, charge, holdcharge, discharge) and keeps it active, `off` returns control to evcc
* (Schimi1983) new per loadpoint: `batteryBoost`, `batteryBoostLimit`, `limitEnergy`, `priority`
* (Schimi1983) loadpoints and vehicles removed in evcc are deleted, renamed ones get their new name (checked after start and after an evcc restart)
* (Schimi1983) evcc not reachable (e.g. restart/update): one warning instead of an error on every poll, info message when the connection is restored
* (Schimi1983) values evcc does not report anymore (e.g. `fatal`, remaining charging time) are set to `null` instead of keeping the last value
* (Schimi1983) existing status objects are updated to the current roles at start, also for values evcc currently does not report
* (Schimi1983) README: getting started, data points and charging control explained for users

### 0.3.2 (2026-11-06)
* (Schimi1983) state roles according to the ioBroker state roles: writable states use `level.*` / `switch` / `button.*` / `text` instead of `value`, min/max for percent values, JSON values use role `json` (type string), strings `text`, remaining durations `value.timer`; ids and values are unchanged
* (Schimi1983) complete object tree: folders `loadpoint` / `vehicle`, a device per loadpoint and vehicle (named by its evcc title), channels `control` / `status`
* (Schimi1983) price limits under `control` use the currency configured in evcc, buttons are confirmed with ack = true
* (Schimi1983) admin: reworked config page (connection / data points sections, help texts, validation, units), new "Test connection" button
* (Schimi1983) fix: host was cut when it contained "http" anywhere (e.g. a host name), now only a leading http:// / https:// and a path are removed
* (Schimi1983) defaults for new instances: poll interval 60 s, port as number
* (Schimi1983) repository checker (#141): unit tests use node:assert instead of chai (W0063), package.json "files" instead of .npmignore (W9503), i18n short format (S5601)
* (Schimi1983) remove unused workflow file dependabot-automerge.yml.OLD (pull_request_target, #139)
* (Schimi1983) fix: polls took longer than the interval with many states (e.g. weather forecast) – values are now written in batches
* (Schimi1983) fix: no errors in the log when the adapter is stopped during a poll
* (Schimi1983) fix unit tests: chai-as-promised is no longer loaded in test setup (not a direct dependency anymore)
* (Schimi1983) charging plan per loadpoint: `control.plan.active/time/soc/energy` (soc plan of the assigned vehicle or energy plan of the loadpoint), closes #73 and #18
* (Schimi1983) repository checker (#135): remove test dependencies already provided by @iobroker/testing, CHANGELOG_OLD.md in .npmignore, consistent formatting of admin/jsonConfig.json

### 0.3.1 (2026-10-10)
* (arteck) Dependencies have been updated
* (Schimi1983) fix: `enableThreshold` / `disableThreshold` could not be set
* (Schimi1983) fix: global `control.smartCostLimit` was sent to loadpoint `undefined`
* (Schimi1983) fix: `smartCostLimit` / `batteryGridChargeLimit` = 0 now removes the limit (DELETE), negative limits are allowed
* (Schimi1983) fix: `chargeDuration` / `connectedDuration` are reported by evcc in seconds (were treated as nanoseconds)
* (Schimi1983) fix: vehicle plan (`plan.active`, `plan.planSoc`, `plan.time`) is read from and written to evcc again
* (Schimi1983) remove unused calls to removed evcc endpoints
* (Schimi1983) fix: control actions were called with the adapter as `this` instead of the evcc client
* (Schimi1983) performance: objects are created once per runtime instead of being rewritten on every poll, polls no longer overlap
* (Schimi1983) add units and roles (W, Wh, kWh, A, %, km, s, €/kWh, g/kWh, °C) for known evcc status values, indicator role for booleans

### 0.3.0 (2026-10-02)
* (Schimi1983) support evcc 0.316 mode redesign: new `control.smart` and `control.alwaysCharge`, `pvControl` reflects the evcc mode
* (Schimi1983) fix: request timeout was sent as POST body and never applied
* (arteck) Dependencies have been updated

### 0.2.10 (2026-07-15)
* (arteck) add configurable weather forcast grid

## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and asSociated documentation files (the "Software"), to deal
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