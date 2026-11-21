---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.violet/README.md
title: ioBroker.violet
hash: QPj75L0bFNZ9AcyEW1W8nwTXSPr0RKDU6JcH62271Pc=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.violet.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.violet.svg)
![Anzahl der Installationen](https://iobroker.live/badges/violet-installed.svg)
![Test und Freigabe](https://github.com/AlPi-BRV/ioBroker.violet/actions/workflows/test-and-release.yml/badge.svg)
![Lizenz](https://img.shields.io/github/license/AlPi-BRV/ioBroker.violet)

<img src="admin/violet.png" alt="Violett" width="96" align="right">

# IoBroker.violet
Adapter für den **Violet Pool-Controller** von PoolDigital (inkl. Dosiermodul und Relais-Erweiterungen).

🇩🇪 **[Deutsche Anleitung](https://github.com/AlPi-BRV/ioBroker.violet/blob/main/docs/de/README.md)**

[!WARNUNG] **Aktualisierung von Version 0.7.x oder älter auf 0.8.0: Alle Datenpunkt-IDs haben sich geändert** (Deutsch → Englisch, z. B. `wasser.chlor` → `water.chlorine`, `pumpe.schalten` → `pump.switch`). Der Adapter verschiebt Ihre bestehenden Datenpunkte automatisch (Werte und Verlaufseinstellungen bleiben erhalten), aber **VIS-Ansichten, Skripte, Blockly und andere Adapter, die diese Datenpunkte verwenden, müssen angepasst werden** - in den meisten VIS-Projekten betrifft dies nahezu jedes Widget. Bitte lesen Sie [Aktualisieren Sie auf Version 0.8.0.](#upgrade-to-080-english-ids) **vor** der Aktualisierung und erstellen Sie eine Sicherungskopie (z. B. durch Exportieren Ihres VIS-Projekts).

## Merkmale
- Liest alle Werte von Violet zyklisch (`http://<IP>/getReadings?ALL`) und ordnet sie einer festen Struktur zu.

(`wasser`, `temperatur`, `pumpe`, `dosierung`, `relais`, `heizung`, `solar`, `rueckspuelung`, `analog`, …)

- **Fragebogen in der Konfiguration**: Nur die Bereiche, die Sie tatsächlich nutzen, werden als Datenpunkte erstellt.
- Eigene Namen für Temperatursensoren, Relais, analoge Eingänge und DMX-Szenen - mit Live-Werten, die in der Konfiguration angezeigt oder mit einem Klick von Violet übernommen werden können
- **Ein-/Ausschalten/Auto-Modus** (Hauptschalter „Schalter zulassen“, standardmäßig deaktiviert)
- **Pool-Anzeigeeinstellungen** (Registerkarte „Anzeige“): Optimale Bereiche für pH-Wert, Redoxpotenzial und Chlor (Werte außerhalb der Anzeige rot markiert), Zuordnung der Temperaturzeilen und der großen Anzeige
- **Virtuelle Relais**: Bis zu 8 ioBroker-Datenpunkte (wahr/falsch) anderer Geräte, umschaltbar in der Relaisansicht der Poolanzeige
- **Wassertemperatur in der Pumpenleitung**: optionaler, eingefrorener Wert, solange die Pumpe ausgeschaltet ist (`temperatures.sensor1_pool`, im Display mit * gekennzeichnet)
- **Umwälzwassermenge des Tages** in m³, berechnet aus den Laufzeiten der Violet und der Förderleistung der Pumpe
- **Violette Meldungen** (Warnungen, Alarme, Erinnerungen) als Datenpunkt `messages.active` und als Hinweis in der Poolanzeige
- **Pool-Display** im Stil des klassischen ProCon.IP-Displays, direkt angesteuert vom Adapter
- Datenpunktnamen, Konfiguration und Poolanzeige in Deutsch und Englisch; Konfiguration in 11 Sprachen

## Prinzipien
- Der Adapter **liest und schaltet** - er **konfiguriert** das Violet-System niemals (keine Sollwerte, Kalibrierung, Dosierungsraten, Zeitpläne).
- **Dosierung** (Chlor, pH-Wert, Flockungsmittel, Elektrolyse) ist schreibgeschützt.
- **Cover** ist schreibgeschützt (kein dokumentierter Umschaltbefehl).

## Umschalten
Bei der Option „Umschalten zulassen“ erhält jede ausgewählte Funktion einen Datenpunkt `switch`:

| Wert | Wirkung |
|---|---|
| `ON` | Handbuch ein |
| `AUTO` | zurück zum Automatikmodus der Violet |
| `AUTO` | zurück in den Automatikmodus der Violet |

- Schaltbar: Filterpumpe, Heizung, Solar, Licht, ECO-Modus, Nachfüllen, Rückspülen, Spülen, PV-Überschuss (nur EIN/AUS), Relais EXT1/EXT2, DMX-Szenen
- `pump.speed_setpoint` (1 = ECO, 2 = Normal, 3 = Boost) - wird beim Einschalten verwendet und sofort angewendet, während die Pumpe manuell läuft
- "Dauer für manuelles Ein-/Ausschalten" in Minuten, 0 = dauerhaft
Der Datenpunkt „switch“ spiegelt stets den aktuellen Modus des Violett wider.
- Befehl: `GET /setFunctionManually?FUNCTION,ACTION,DURATION,VALUE` - jeder Befehl und Fehler wird protokolliert

### Statuscodes
| Code | Bedeutung |
|---|---|
| 0 | Auto - aus |
| 1 | Auto - ein |
| 2 | Auto - Aus, durch eine Steuerungsregel blockiert (z. B. Heizung bei ausgeschalteter Pumpe) |
| 3 | Auto - eingeschaltet, erzwungen durch eine Notfallregel |
| 4 | Bedienungsanleitung |
| 5 | Aufgrund einer Notfallregelung außer Betrieb |
| 6 | Manuell aus |

Quelle: Schnittstellenbeschreibung von PoolDigital (getReadings, Revision 14.07.2024).

## Umwälzwasservolumen
Im Reiter „Pumpe“ geben Sie die Fördermenge der Pumpe in m³/h ein - pro Drehzahlstufe bei drehzahlgeregelten Pumpen.
Wenn der Absorber oder die Heizung den Durchfluss reduziert, geben Sie dort den niedrigeren Wert ein (leer = gleich wie allein; wenn beide in Betrieb sind, gilt der niedrigere Wert).

- Datenpunkt `pump.circulated_today` (m³), in der Poolanzeige hinter der Laufzeit: `06h 07m (25,9 m³)`
- Grundlage: Die von Violet selbst gezählten Laufzeiten pro Ebene - ein Neustart von ioBroker verfälscht den Wert nicht.
Die Reduzierung durch Absorber/Heizung wird vom Adapter bei jeder Messung erfasst; Rückstellung um Mitternacht
- Datenpunkt `pump.flow_rate` (m³/h): Aktueller Durchfluss des Betriebspegels basierend auf den eingegebenen Werten (Absorber/Heizung berücksichtigt), 0 = Pumpe aus - wird in der Poolanzeige in der Pumpenzeile unterhalb der Laufzeit angezeigt.
- Ein realer Durchflusssensor in m³/h (z. B. Impulseingang 2) hat dort Vorrang, solange er einen Wert über 0 liefert.
Nur eine Berechnung - nichts wird in die Violette geschrieben.

## Wärmeleistung (Absorber / Heizung)
Im Reiter „Pumpe“ (Abschnitt „Wärmeleistung“) kann der Adapter berechnen, wie viel Wärme der Absorber und die Heizung in den Pool einbringen:

- Leistung (kW) = (Rücklauf − Wassertemperatursensor 1) × Fördermenge der laufenden Pumpe × 1,163 - die Fördermenge ergibt sich aus den oben genannten Fördermengen (mit Absorber/Heizung: der niedrigere Wert)
- Sensoren: Absorberrücklauf (beim Violet üblicherweise Sensor 4) und optional ein Heizungsrücklaufsensor
- Position des Heizungsrücklaufsensors: „nur hinter der Heizung“ oder „hinter Absorber und Heizung (in Reihe)“. Bei Reihenschaltung und Betrieb beider Komponenten: Heizung = Gesamt − Absorber
- Datenpunkte `solar.power` / `heater.power` (kW) und `solar.energy_today` / `heater.energy_today` (kWh, wird um Mitternacht zurückgesetzt); in der Poolanzeige in einer Zeile unterhalb der Laufzeit: `4,2 kW · 11,6 kWh`
Negative Werte (Absorberkühlung) werden als 0 angezeigt. Für Langzeitstatistiken verwenden Sie z. B. den Adapter SourceAnalytics.
- Die Angabe „Heizungsart“ (Öl-/Gas-Wärmetauscher, Wärmepumpe, elektrisch) legt den Namen im Pooldisplay fest.

### Wärmepumpen-COP
Bei der Heizart „Wärmepumpe“ kann jeder ioBroker-Datenpunkt mit Angabe des Stromverbrauchs ausgewählt werden (z. B. ein Shelly, Einheit W oder kW).

- `heater.electrical_power` (kW) und `heater.electricity_today` (kWh, Standby inklusive)
- `heater.cop` = Wärmeleistung ÷ Stromverbrauch, nur während des Heizbetriebs (ab 0,1 kW), ansonsten leer
- `heater.cop_today` = Wärmeenergie heute ÷ Stromverbrauch heute (aus 0,05 kWh)
- Im Pool-Display nach der Wärmeenergie: der aktuelle COP während des Betriebs, ansonsten der heutige COP.
Die Wärmeleistung basiert auf der eingegebenen Lieferrate - der COP ist ein guter Schätzwert, keine kalibrierte Messung.

## Übernahme von Violett
Im Reiter „Verbindung“ kann der Adapter Standardeinstellungen vom Violet lesen: Namen von Temperatursensoren, Relais, Analog-/Impulseingängen und DMX-Szenen, die Fördermengen der Pumpe und welche Funktionen installiert sind (Dosierung, Relaiserweiterungen, Heizung, Solar).

Die Option „Leere Felder ausfüllen“ fügt nur die fehlenden Daten hinzu; die Option „Alle ersetzen“ überschreibt auch eigene Namen und Lieferraten.
- Funktionen werden nur eingeschaltet, nie ausgeschaltet; die Standardnamen von Violet ("EXT1-Relais 3", "Szene 9", "---") werden übersprungen
- Die Werte werden nur im Formular angezeigt - sie gelten erst nach dem Speichern.
- Benutzername und Passwort von Violet müssen gespeichert werden
- Beim allerersten Start einer neuen Instanz geschieht dies automatisch (nur leere Felder).
Es werden keine Daten in den Violettspeicher geschrieben; lediglich die aufgelisteten Werte werden ausgewertet, das Ergebnis des Violettspeichers wird nicht gespeichert.

## Elektrolysezelle
Für die Elektrolyse nutzt Violet die gleichen Felder wie für flüssiges Chlor, jedoch mit einer anderen Bedeutung (Informationen von PoolDigital): Die Tagesmenge ist das produzierte Chlor in **g**, der Inhalt des „Kanisters“ entspricht den **verbleibenden Betriebsstunden der Zelle**, der Kanisterwechsel entspricht dem **Zellenwechsel**.

- Datenpunkte unter `dosing.electrolysis`: `produced_today` (g), `cell_remaining_hours` (h), `cell_change` (Datum)
- Optional (Registerkarte „Funktionen“, sichtbar bei Elektrolyse): Geben Sie die Zelllebensdauer in Stunden ein - derselbe Wert wie in Violett. Anschließend werden `cell_wear` (%) und `cell_warning` (ab dem Warnschwellenwert) addiert.
Der Zellenwechsel wird im Violett wie ein Behälterwechsel bestätigt - es wird nichts in das Violett geschrieben.
Bitte melden Sie sich, falls Ihre Werte abweichen - der Pool des Autors wird mit flüssigem Chlor behandelt.

## Violette Nachrichten
Der Adapter liest die Nachrichten des Violet einmal pro Minute über `GET /getNotifications?ALL` (Fallback für ältere Firmware: Änderung von `last_error_id`).

| Datenpunkt | Bedeutung |
|---|---|
| `messages.active` | `true` falls eine neue, noch nicht bestätigte Nachricht vorliegt - ideal für ein Signal-Symbol in Ihrer Visualisierung |
| `messages.text`, `.time`, `.type` | neueste Nachricht |
| `messages.list` | die letzten 20 Nachrichten als JSON |
| `messages.acknowledge` | Schaltfläche: Bestätigung in ioBroker |
| `messages.acknowledge` | Schaltfläche: Bestätigen in ioBroker |

Die Bestätigung betrifft nur ioBroker - Nachrichten, die auf dem Violet-Gerät selbst bestätigt werden müssen, müssen weiterhin dort bestätigt werden.
In der Pool-Anzeige erscheint eine neue Nachricht als blinkender gelber Punkt in der Fußzeile; ein Klick darauf öffnet das Violet-Gerät in einem neuen Fenster und bestätigt die Nachricht in ioBroker.

## Poolanzeige
Wird vom Adapter selbst bereitgestellt (eingebauter Webserver, keine weiteren Adapter erforderlich): `http://<ioBroker-IP>:8099/` (Port und Schriftart in der Konfiguration, Registerkarte "Verbindung").

- Erstellt sich selbst: Es werden nur vorhandene Funktionen, angeschlossene Sensoren und konfigurierte Relais angezeigt.
- Pumpenzeile mit Drehzahlstufen (aktive Stufe grün) und PV-Anzeige (nur wenn PV-Überschuss genutzt und aktiv ist)
- Lichtreihe mit DMX-Szenen (falls verwendet)
- Schaltfläche „Relais“ in der Kopfzeile: Zeigt die Schalter der Relais-Erweiterungen anstelle der Temperaturen an.
- Schaltet nur um, wenn "Umschalten zulassen" aktiviert ist; die Schnittstelle akzeptiert nur die freigegebenen `switch`-Datenpunkte (niemals dosieren)
- Schnittstelle: `GET /api/data` (Werte), `GET /api/set?id=…&value=…` (Umschalten), `GET /api/ack` (Bestätigungsnachrichten)
- **Nur im Heimnetzwerk verwenden** - nicht mit dem Internet verbinden (keine Anmeldung erforderlich)
- Vorschau ohne Adapter: Öffnen Sie `www/index.html` lokal mit `?demo=1` (Optionen: `&lang=en`, `&font=arial`, `&msg=1`, `&ohne=heizung,solar,pv,dmx,relais`)

## Installation
Installieren Sie den Adapter in der ioBroker-Administration unter **Adapter**.

Starten Sie die Instanz nach einem Update neu.

## Upgrade auf Version 0.8.0 (Englische IDs)
Bis Version 0.7.x hatten die Datenpunkte deutsche IDs. Seit Version 0.8.0 sind alle IDs englisch. Der Adapter verschiebt vorhandene Datenpunkte beim ersten Start nach dem Update automatisch (Werte und Verlaufseinstellungen bleiben erhalten, ältere Verlaufsdaten bleiben unter der alten ID). Skripte, VIS-Ansichten und andere Adapter, die diese Datenpunkte verwenden, müssen einmalig angepasst werden.

| bis Version 0.7.x | seit Version 0.8.0 |
|---|---|
| `wasser.*` | `water.*` (`chlor` → `chlorine`, `eingefroren` → `frozen`) |
| `pumpe.*` | `pump.*` (`stufe` → `level`, `drehzahl_soll` → `speed_setpoint`, `umwaelzung_heute` → `circulated_today`) |
| `dosierung.chlor`, `.elektrolyse`, `.flockung` | `dosing.chlorine`, `.electrolysis`, `.flocculant` |
| `heizung.*`, `nachspeisung.*`, `rueckspuelung.*` | `heater.*`, `refill.*`, `backwash.*` |
| `licht.*`, `abdeckung.*`, `dmx.szeneN` | `light.*`, `cover.*`, `dmx.sceneN` |
| `relais.extX_Y` | `relays.extX_Y` |
| `meldungen.*` | `messages.*` (`aktiv` → `active`, `quittieren` → `acknowledge`) |
| `eingaenge.eingangN`, `analog.impulsN` | `inputs.inputN`, `analog.pulseN` |
| `diagnose.*` | `diagnostics.*` |
| `….schalten` | `….switch` |
| `….aktiv`, `….laufzeit_heute`, `….letzter_start`, `….letztes_ende` | `….active`, `….runtime_today`, `….last_on`, `….last_off` |
| `….tagesmenge`, `….kanister_rest`, `….reichweite`, `….sperren` | `….dosed_today`, `….canister_remaining`, `….range`, `….locks` |
| `….tagesmenge`, `….kanister_rest`, `….reichweite`, `….sperren` | `….dosed_today`, `….canister_remaining`, `….range`, `….locks` |

Die vollständige Liste befindet sich in [lib/idmap.js](https://github.com/AlPi-BRV/ioBroker.violet/blob/main/lib/idmap.js).

**Tipps für den Umstieg**

- **Vor** dem Update: Exportieren Sie Ihr VIS-Projekt (VIS-Editor: Projektexport; oder eine BackItUp-Sicherung) und sichern Sie die Skripte - dann geht nichts verloren.
In der exportierten VIS-Datei können Sie die IDs durch die obige Tabelle ersetzen (suchen Sie nach `violet.0.`) und die Datei anschließend erneut importieren. Ersetzen Sie zuerst die längeren IDs (z. B. `dosierung.chlor.tagesmenge` vor `dosierung.chlor`).
Das Protokoll der Instanz listet die Anzahl der verschobenen Datenpunkte auf. Skripte mit alten IDs zeigen lediglich Warnungen wie „Status … nicht gefunden“ an - suchen Sie im Skriptadapter nach `violet.0.`.
- Wenn Sie noch nichts ändern möchten: Bleiben Sie bei Version 0.7.x, bis Sie Zeit für den Wechsel haben.

## Häufig gestellte Fragen
**Warum kann ich die Dosierung nicht ändern?** - Absichtlich: Eine falsche Dosierung kann für Badende gefährlich sein. Die Dosierung wird ausschließlich von Violet gesteuert.

**Warum gibt es so wenige Datenpunkte?** - Es werden nur die im Tab „Funktionen“ ausgewählten Bereiche erstellt. Die vollständigen Rohdaten sind immer in `info.rawJson` verfügbar.

**Die Poolanzeige zeigt "Keine Daten" an.** - Prüfen Sie, ob die Instanz ausgeführt wird und "Poolanzeige bereitstellen" aktiviert ist; testen Sie `http://<ioBroker-IP>:8099/api/data` im Browser.

## Marken
Violett und das Violett-Logo sind Marken der **PoolDigital GmbH & Co. KG**, Kapellenstraße 10a, 86441 Zusmarshausen, Deutschland - [www.pooldigital.de](https://www.pooldigital.de).
Verwendung mit freundlicher Genehmigung von PoolDigital. Dieser Adapter ist ein unabhängiges Community-Projekt und kein offizielles Produkt von PoolDigital.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.8.0 (2026-11-07)
- **Breaking change – English object IDs** (requested by the ioBroker review): all data points now have English IDs, e.g. `wasser.chlor` → `water.chlorine`, `pumpe.schalten` → `pump.switch`, `meldungen.quittieren` → `messages.acknowledge`. Existing data points are moved automatically on the first start: last value and history settings (`common.custom`) are taken over, the old objects are deleted. Older history data stays stored under the old IDs. **Please adapt your scripts and visualizations** – see [Upgrade to 0.8.0](#upgrade-to-080-english-ids)
- States of other adapters (heat pump power, virtual relays) are only taken over when acknowledged (`ack = true`)
- New data point `pump.flow_rate` (m³/h): calculated flow rate of the running pump level from the configured delivery rates (absorber/heating considered)
- Pool display: the line "Flow rate" in the pump row now shows the calculated value; a flow sensor input that only delivers 0 (no sensor connected) is no longer shown
- npm keyword `dosing` instead of `dosierung`

### 0.7.1 (2026-10-22)
- Data point names in all 11 ioBroker languages (requested by the repository check); own names from the configuration stay unchanged
- Data points `schalten`: role changed from `level.mode` (not in the ioBroker role catalogue) to `text` – values `ON` / `OFF` / `AUTO` are unchanged
- Obsolete data point `info.cellState` (from 0.6.10) is removed; names of existing data points are updated on start, also for sensors that currently deliver no value
- Pool display: relay rows that go beyond the temperature and water value rows are shown side by side (3 per row) in a full-width row – no empty cells, the display no longer grows in height (preview: `?demo=1&alle=1`)

### 0.7.0 (2026-10-14)
- Take over from the Violet: names of temperature sensors, relays, analog/pulse inputs and DMX scenes, delivery rates of the pump and installed functions (tab "Connection", buttons "Fill empty fields" / "Replace all"; needs user name and password of the Violet). On the very first start of a new instance this happens automatically. Read only – nothing is written to the Violet, and only the needed values are evaluated
- Own names for DMX scenes (tab "Relays"), used for data points and in the pool display
- Pool display: a flow sensor in m³/h (e.g. pulse input 2) is shown in the pump row below the runtime instead of among the water values
- Heat pump: COP (now and today) and electricity of today from a power data point of your choice (e.g. Shelly); configuration in the tab "Pump" when the type of heating is "Heat pump"
- Pool display: heat output, heat energy and COP in a second line below the runtime (the row no longer shifts)
- Fix: the Violet reports the pump speeds with the normal status codes – a pump switched on manually (code 4) was treated as stopped: no flow for water volume and heat output, water values frozen

### 0.6.11 (2026-10-12)
- Electrolysis: chlorine produced today (g), remaining cell hours and last cell change are now taken directly from the Violet (the canister fields have this meaning for electrolysis – information from PoolDigital); the own operating hours counter, cell output, start value and button "cell replaced" are removed
- Wear in % and warning remain optional (cell lifetime in the configuration)

### 0.6.10 (2026-10-12)
- New: heat output of absorber and heating (kW) and heat energy of today (kWh), calculated from return temperatures and the configured pump flow; return sensor behind heating only or behind absorber and heating in series
- New: electrolysis cell – operating hours counter, remaining hours, wear in %, warning threshold, chlorine produced today (g), button "cell replaced"; canister values are no longer created for electrolysis
- New: type of heating (heat exchanger, heat pump, electric) as name in the pool display
- Fix: status 2 (auto, off by rule) no longer counts as running for the water volume reduction

### 0.6.9 (2026-10-11)
- Maintenance according to the ioBroker repository checker: admin >= 7.6.20, tests with Node.js 22/24/26, translation files in short format (admin/i18n/<lang>.json), dependabot settings

### 0.6.8 (2026-10-11)
- Fix: water values (and pool temperature) stayed frozen for about 2 hours after the pump started – the Violet writes `PUMP_LAST_ON` in local time; the runtime is now calculated against the Violet clock

### 0.6.7 (2026-10-11)
- Code formatted to the ioBroker standard (ESLint/Prettier), no functional changes
- Automatic tests on GitHub (test-and-release workflow), release script prepared

### 0.6.6 (2026-10-11)
- Repository checker: Node.js 22 required, dependencies updated (adapter-core 3.4.3, admin 7.6.17), installation notes adjusted, admin layout on small screens

### 0.6.5 (2026-10-11)
- Repository checker: old news entries removed from io-package.json (max. 7), obsolete `common.main` removed

### 0.6.4 (2026-10-11)
- Pool display: relay view keeps the size of the display (up to 3 relays per cell), lamps aligned
- Configuration: "Virtual relays (other ioBroker devices)"

### 0.6.3 (2026-10-11)
- Pool display: smaller "blocked" text so the switches no longer shift; smaller * in the large display

### 0.6.2 (2026-10-11)
- Water values (pH, redox, chlorine) frozen while the pump is off (option, data point `wasser.eingefroren`), no red marking without flow
- Pool display reloads itself after an adapter update

### 0.6.1 (2026-10-11)
- Status codes corrected according to the official interface description of PoolDigital: 2 = auto, blocked by rule (was shown as manual on), 5 = off by emergency rule

### 0.6.0 (2026-10-11)
- New tab "Display": optimal ranges (values outside in red), temperature rows and large display freely assignable
- Virtual relays (other devices, ON/OFF only) in the relay view of the pool display
- Water temperature (sensor 1) frozen while the pump is off – for sensors in the pump piping
- Electrodes selectable individually (pH, redox, chlorine); chlorine or electrolysis
- Flocculant (dosed today) shown in the pool display
- Author contact updated

Older changes: CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 Alexander Pietz <alex@1-5worlds.de>

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