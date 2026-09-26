---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.leapmotor/README.md
title: ioBroker.leapmotor
hash: wSpVZQB+3/cD5hFo2c3K4ekt/nhTeXBrGJsezPKae0Q=
---
![Logo](../../../en/adapterref/iobroker.leapmotor/admin/leapmotor.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.leapmotor.svg)
![Lizenz: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# ioBroker.leapmotor

Inoffizielle Integration [von Leapmotor-](https://www.leapmotor.com/) Elektrofahrzeugen für ioBroker. Getestet auf T03.

## ⚠️ Wichtig: Verwenden Sie ein zweites Konto

**Verwenden Sie nicht Ihr Hauptkonto von Leapmotor!**

Der Adapter hält eine permanente Verbindung zur Leapmotor-Cloud aufrecht. Wenn dasselbe Konto gleichzeitig in der Leapmotor-App verwendet wird, kommt es zu einem Konflikt zwischen den beiden Sitzungen, wodurch sich beide gegenseitig abmelden.

**Empfohlene Konfiguration:**

1. Erstellen Sie ein zweites Leapmotor-Konto (z. B. mit einer zweiten E-Mail-Adresse).
2. In der Leapmotor-App navigieren Sie zu: **Persönliches Center → Mein Fahrzeug → \[Fahrzeugname] → Gemeinsame Mitglieder → Gemeinsames Mitglied hinzufügen**
3. Geben Sie die E-Mail-Adresse des zweiten Kontos ein und erteilen Sie alle Rechte.
4. Verwenden Sie die Anmeldeinformationen des zweiten Kontos in der Adapterkonfiguration

Auf diese Weise bleibt Ihr Hauptkonto jederzeit in der App angemeldet.

---

## Merkmale

- React-basiertes Admin-Dashboard mit den Registerkarten Dashboard, Verbrauch, Fahrten, Datenpunkte und Diagnose
- Fahrzeugstatusabfrage alle 1–60 Minuten (konfigurierbar)
- Batterieladestand, Reichweite, Temperatur, Reifendruck, GPS, Türen, Fenster
- Fernbedienung: Klima (Heizen/Kühlen/Lüften), Verriegeln/Entriegeln, Fensterheber, Sonnenschutz, Kofferraum, Suchen
- Klimaplanung (wiederkehrend, nach Wochentag) und Gebührenlimit / Gebührenplanung
- Komfortfunktionen, sofern vom Fahrzeug unterstützt: Wächtermodus, Sitzheizung/-belüftung, Lenkradheizung, Geschwindigkeitsbegrenzung, Spiegelheizung
- Fahrtenerkennung mit täglicher Kilometerzählung und individuellem Fahrtverlauf, GPS-Routenaufzeichnung (optional), Fahrtenzusammenführung/Rückgängigmachen, Höhengewinn, minimale/maximale Außentemperatur und eine Schätzung der Regenerierbarkeit pro Fahrt
- CSV- und PDF-Export (Tabelle + Zusammenfassung) des Reiseprotokolls für einen ausgewählten Datumsbereich
- Konfigurierbare Speicherung des Reise-/GPS-Routenverlaufs (Tage, 0 = unbegrenzt, mit einer festen Sicherheitsobergrenze)
- Fahrbereitstellung: Automatische Klimatisierung (Heizen/Kühlen/Lüften) bei eingeschalteter Zündung, basierend auf Außentemperaturschwellenwerten, mit Sperrfunktion und Selbstauslösemechanismus zur Vermeidung von Fehlalarmen.
- Arbeitsvorbereitung: Gleiche Klimavorbereitungsfunktion, ausgelöst durch einen Datenpunkt anstelle eines Zündsignals (für Schichtplan-/Kalenderautomatisierungen)
- Automatisierung von Sonnenschutzrollo/Schiebedach für die Modi „Fahrbereit machen“ und „Arbeiten“, mit separaten Positionen für Heizen/Kühlen/Lüften und einer „bei Dunkelheit öffnen“-Regel (außer beim Heizen zum Kälteschutz).
- Außentemperatur von Open-Meteo (nicht vom fahrzeugeigenen Sensor – fehlt bei einigen Modellen, z. B. B10, und ist in der Garage irreführend), 30-Minuten-Cache mit Rückgriff auf den letzten bekannten Wert bei API-Fehlern
- Geschätzter Batteriezustand (SoH) aus der offiziellen Cloud-Energie pro Reise im Vergleich zum verbrauchten SoC, Median der letzten 30 Reisen
- Die Kosten für das Laden zu Hause/öffentlichen Ladestationen werden anhand der GPS-Entfernung zu einem konfigurierbaren Standort aufgeteilt (Adresssuche über Nominatim + Karte mit verschiebbarem Marker/Radius), wobei separate Strompreise gelten – zu Hause kann ein dynamischer Preis (z. B. Tibber) verwendet werden, öffentlich gilt immer ein fester, manuell festgelegter Preis.
- Schätzung der Ladekosten auf Basis des konfigurierbaren Strompreises
- Fahrzeugnachrichten und Anzahl ungelesener Nachrichten
- Fahrzeugmodellspezifisches Funktionsumfangssystem (nicht unterstützte Funktionen werden automatisch ausgeblendet)
- Verbrauchsstatistik mit wöchentlichem Verlauf
- Dynamisches Fahrzeug-Dashboard (zusammengesetztes HTML-Widget für VIS)
- Automatische Token-Aktualisierung
- Bildcache (einmal heruntergeladen, lokal gespeichert)
- Benachrichtigungen (adapterunabhängig über `sendTo` (inkl. telegrammenu2 Schweregrad/Bereich und E-Mail): Fahrt abgeschlossen, Ladung abgeschlossen, OTA-Update, Warnung wegen offenem Fenster, Vorbereitung zum Fahren/Arbeiten ausgelöst – mit einer Testbenachrichtigungsschaltfläche im Tab „Einstellungen“

## Getestete Fahrzeuge

- Leapmotor T03 ✅ (vollständig getestet, inklusive aller Fernbedienungsbefehle)
- Leapmotor B10 - Status-/Datenberichterstattung umfassend von einem echten Besitzer verifiziert (Batterie, Reichweite, Kilometerstand, Geschwindigkeit, Zündung, alle Türen, alle Fenster, Reifendruck, Schiebedach, GPS, Ladeplan, Ladegrenze, Lüftungsrichtung der Klimaanlage); Fernbedienungsbefehle (Verriegelung, Klima usw.) nicht separat über die eigenen Tasten des Adapters bestätigt, funktionieren aber voraussichtlich (gleiches Befehlssubsystem wie T03)
- Leapmotor C10 / C16 – sollte funktionieren, noch nicht getestet

## Installation

Installation über die ioBroker-Admin-Benutzeroberfläche.

## Konfiguration

| Einstellung       | Beschreibung                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| E-Mail            | E-Mail-Adresse für Ihr Leapmotor-Konto (wir empfehlen die Verwendung eines separaten Zweitkontos) |
| Passwort          | Leapmotor-Kontopasswort                                                                           |
| Fahrzeug-PIN      | 4-stellige Fahrzeug-PIN – für alle Fernbefehle erforderlich                                       |
| Cloud-API-Sprache | Betrifft nur den Text der Leapmotor Cloud-API (z. B. Namen von Tagen im Zeitplan).                |

Alle anderen Funktionen (Abfrageintervalle, GPS-Routenaufzeichnung, Benachrichtigungen, Strompreise, Wohnort, Vorbereitung zum Fahren/Arbeiten, Datenaufbewahrung) wurden aus der nativen Instanzkonfiguration in die **Registerkarte „Einstellungen“** im Leapmotor-Admin-Dashboard selbst verschoben.

## Datenpunkte

```
leapmotor.0.<VIN>.status.*                → Vehicle status (read-only)
leapmotor.0.<VIN>.consumption.*           → Consumption & statistics (read-only)
leapmotor.0.<VIN>.trips.*                 → Daily kilometers and trip history (read-only)
leapmotor.0.<VIN>.charging.*              → Current charging session cost/kWh (read-only)
leapmotor.0.<VIN>.pictures.*              → Vehicle images, including an animated composite image (read-only)
leapmotor.0.<VIN>.cmd.*                   → Commands (writable)
leapmotor.0.<VIN>.info.*                  → Static vehicle info (read-only)
leapmotor.0.messages.*                    → Vehicle messages from the Leapmotor app (read-only)
leapmotor.0.config.*                      → Electricity price / battery capacity, Prepare-to-Drive/Work,
                                             home location & radius, notification targets, and
                                             trip/route history retention settings
leapmotor.0.<VIN>.battery.soh_percent     → Estimated battery health (State of Health, read-only)
```

Die vollständige Menge der verfügbaren Datenpunkte, einschließlich aller beschreibbaren Befehlszustände, lässt sich am besten direkt im ioBroker-Objektbaum oder über die Registerkarte **„Datenpunkte“** in der Admin-Benutzeroberfläche des Adapters erkunden – dort werden alle Datenpunkte mit ihrem aktuellen Wert und einer kurzen Beschreibung aufgelistet.

### Admin-Dashboard

Der Adapter verfügt über eine eigene, auf React basierende Admin-Registerkarte (klicken Sie auf das Adapter-Symbol in der Instanzliste) mit fünf Unterregisterkarten: **Dashboard** (Live-Status und Fernsteuerung), **Verbrauch** (wöchentlicher Energieverbrauch und Kostenschätzung), **Fahrten** (tägliche Kilometer und einzelne erkannte Fahrten), **Datenpunkte** (vollständiger Datenpunkt-Browser) und **Diagnose** .

### Animiertes Fahrzeugbild für VIS

`leapmotor.0.<VIN>.pictures.composite_html` Enthält jetzt ein einfaches, einbettbares animiertes Fahrzeugbild (transparenter Hintergrund, keine Schaltflächen oder Armaturenbrett-Chromleisten – diese befinden sich jetzt im Admin-Bereich). Fügen Sie ein **einfaches Widget mit einem nicht maskierten String** in VIS hinzu oder betten Sie es ein über `<iframe>` und legen Sie die Objekt-ID wie folgt fest:

```
leapmotor.0.<VIN>.pictures.composite_html
```

### Verfügbare Befehle (Auswahl)

Einfache Ein-/Ausschalter unter `cmd.*` (Rolle `button`, eingestellt auf `true` (auslösend):

| Befehl                           | Beschreibung                                                                                                                                                                      | PIN erforderlich | Funktioniert an                                                                                                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cmd.ac\_heat                     | Heizen starten                                                                                                                                                                    |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.ac\_cool                     | Kühlung starten                                                                                                                                                                   |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.ac\_vent                     | Belüftung einschalten                                                                                                                                                             |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.ac\_off                      | Klima stoppen                                                                                                                                                                     |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.defrost                      | Windschutzscheibenenteisung                                                                                                                                                       |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.windows\_open                | Fenster öffnen                                                                                                                                                                    |         –        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.windows\_close               | Fenster schließen                                                                                                                                                                 |         –        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.find                         | Fahrzeug finden (Hupe/Lichter)                                                                                                                                                    |         –        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.battery\_preheat             | Batterievorheizung eingeschaltet                                                                                                                                                  |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.battery\_preheat\_off        | Batterievorwärmung aus                                                                                                                                                            |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.lock                         | Fahrzeug verriegeln                                                                                                                                                               |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.unlock                       | Fahrzeug entriegeln                                                                                                                                                               |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.trunk\_open                  | Kofferraum öffnen                                                                                                                                                                 |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.trunk\_close                 | Kofferraum schließen                                                                                                                                                              |         ✅        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.refresh                      | Sofortige Statusaktualisierung auslösen                                                                                                                                           |         –        | Alle Modelle (bestätigt T03)                                                                                                                                                     |
| cmd.charge\_start / charge\_stop | Laden direkt starten/stoppen (nicht nur über einen Zeitplan)                                                                                                                      |         ✅        | Ungetestet – gleiches Ladesystem wie cmd.charge\_limit\_set (bestätigt), daher bei allen Modellen zu erwarten.                                                                   |
| cmd.unlock\_charger              | Entriegeln Sie den Ladeanschluss aus der Ferne                                                                                                                                    |         ✅        | Ungetestet – gleiches Ladesystem, wird bei allen Modellen erwartet.                                                                                                              |
| cmd.healthy\_charging\_on / off  | Batteriezustandslademodus umschalten                                                                                                                                              |         ✅        | Ungetestet – gleiches Ladesystem, wird bei allen Modellen erwartet.                                                                                                              |
| cmd.fuel\_heating\_on / off      | Kraftstoffheizung ein/aus                                                                                                                                                         |         ✅        | Ungetestet – **nur für REEV/Reichweitenverlängerer-Varianten** (z. B. C10 EREV); nicht anwendbar auf T03 (BEV)                                                                   |
| cmd.destination\_send            | Senden Sie die unten angegebene Adresse/Koordinaten an das integrierte Navigationssystem des Fahrzeugs.                                                                           |         –        | Nicht getestet – wird bei Modellen mit Navigationssystem (C10/B10/B11) erwartet; unklar, ob das integrierte Navigationssystem des T03 überhaupt Cloud-gepushte Ziele akzeptiert. |
| cmd.prepare\_to\_work            | Auslöser für die Vorbereitung des Arbeitsklimas extern (z. B. über ein Schichtplan-/Kalenderskript)                                                                               |         –        | Alle Modelle (verwenden die gleichen Klimabefehle wie Prepare-to-Drive)                                                                                                          |
| cmd.trips\_merge                 | Eine Fahrt mit der unmittelbar vorhergehenden zusammenführen (Startzeit der Fahrt in ms angeben) – für eine tatsächliche Fahrt, die durch eine Fehlalarmierung unterbrochen wurde |         –        | Alle Modelle                                                                                                                                                                     |
| cmd.trips\_merge\_undo           | Letzte Reisezusammenführung rückgängig machen (ein Speicherplatz ging beim Neustart des Adapters verloren)                                                                        |         –        | Alle Modelle                                                                                                                                                                     |

Wertbasierte Befehle:

| Befehl                                                              | Beschreibung                                                                                                          | Funktioniert an                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cmd.ac\_temp                                                        | Zieltemperatur, 16–30 °C                                                                                              | Alle Modelle (bestätigt T03)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| cmd.ac\_fan\_speed                                                  | Lüftergeschwindigkeit, 1–7                                                                                            | Alle Modelle (bestätigt T03)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| cmd.ac\_position                                                    | Luftposition: alle / oben / unten / vorne / hinten                                                                    | Alle Modelle (bestätigt T03). Bei B10 wurde der gemeldete Fahrtrichtungsstatus des Fahrzeugs unabhängig durch Vorher-/Nachher-Tests eines echten Besitzers bestätigt (2026-09) – das Senden dieses spezifischen Befehls wurde bei B10 nicht separat erneut getestet.                                                                                                                                                                                                                             |
| cmd.windows\_set                                                    | Fensterposition, 0–100 %                                                                                              | Alle Modelle (bestätigt T03; Skalierung automatisch pro Modell angepasst, siehe Änderungsprotokoll „IN BEARBEITUNG“)                                                                                                                                                                                                                                                                                                                                                                             |
| cmd.sunshade\_set / sunshade\_open / sunshade\_close                | Position des Sonnenschutzes, 0–10                                                                                     | Funktioniert laut Bestätigung beim T03, jedoch nur, nachdem das Fahrzeug durch **Öffnen einer Tür** aus dem Standby-Modus aktiviert wurde. Verriegeln/Entriegeln, Zündung, Klimaanlage oder ferngesteuertes Öffnen des Kofferraums allein aktivieren das benötigte Subsystem nicht (bestätigt in zwei separaten Tests am 23.09.2026). Es gibt keine Möglichkeit, dies per Fernzugriff zu umgehen. Der B10 verfügt stattdessen über ein elektrisches Schiebedach (funktioniert laut Bestätigung). |
| cmd.charge\_limit\_set                                              | Ladegrenze, 50–100 %                                                                                                  | Alle Modelle (bestätigt T03)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| cmd.charge\_schedule\_enable / start / end / apply                  | Ladeplan                                                                                                              | Alle Modelle (bestätigt T03)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| cmd.climate\_schedule\_enable / mode / time / days / apply / cancel | Wiederkehrender Klimaplan                                                                                             | Alle Modelle (bestätigt T03)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| cmd.speed\_limit\_set                                               | Geschwindigkeitsbegrenzung, sofern vom Fahrzeug unterstützt                                                           | Bestätigt, dass es beim T03 **nicht funktioniert** ; bei anderen Modellen ist es unbekannt.                                                                                                                                                                                                                                                                                                                                                                                                      |
| cmd.Zieladresse / Zielbreite / Ziellänge                            | Zieladresse für die Übertragung über cmd.destination\_send (Adresse oder Längen-/Breitengrad eingeben, dann auslösen) | Gleiches gilt wie für cmd.destination\_send oben – ungetestet, wird bei Modellen mit Navigationssystem erwartet.                                                                                                                                                                                                                                                                                                                                                                                 |

Komfortbefehle (werden nur erstellt/angezeigt, wenn das Fahrzeugmodell die Funktion unterstützt):

| Befehl                                  | Beschreibung   | Funktioniert an                                                                                                                                                                  |
| --------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cmd.sentry\_mode\_on / off              | Wächtermodus   | Bestätigt, dass es beim T03 **nicht funktioniert** ; bei anderen Modellen ist es unbekannt.                                                                                      |
| cmd.seat\_heat\_driver / copilot        | Sitzheizung    | Nicht getestet – plausibel bei B10, B11/C10 (ausstattungsabhängig: Mindestens eine C10-Ausstattungsliste wies keine serienmäßige Sitzheizung auf). Bestätigt: **Nicht** bei T03. |
| cmd.seat\_ventilation\_driver / copilot | Sitzbelüftung  | Dasselbe wie Sitzheizung                                                                                                                                                         |
| cmd.steening\_wheel\_heat\_on / off     | Lenkradheizung | Gleiches gilt für die Sitzheizung. Bestätigt, dass **sie nicht** beim T03 verbaut ist.                                                                                           |
| cmd.mirror\_heat\_on / off              | Spiegelheizung | Ungetestet – plausibel auf B10, B11/C10, B05. Bestätigt, dass diese Funktion auf diesem T03 **weder über die API noch über die App verfügbar ist.**                              |
| cmd.hotspot\_on / off                   | WLAN-Hotspot   | Bestätigt, dass **es nicht** auf T03 oder B10 funktioniert; bei anderen Modellen ist dies unbekannt.                                                                             |

`sunroof` /`sunshade` werden auf die gleiche Weise behandelt – siehe `admin-tab/src/vehicleCapabilities.js` für den bestätigten Unterschied zwischen B10 und T03.

Welche Komfortfunktionen tatsächlich angezeigt werden, hängt vom erkannten Fahrzeugmodell ab – siehe `admin-tab/src/vehicleCapabilities.js` im Repository für die aktuelle Fähigkeitsmatrix pro Modell.

## Changelog

### **WORK IN PROGRESS**
- New: optional comfort extras for Prepare-to-Drive/Work, opt-in and off by default since not every model/trim has them (confirmed absent on T03; unconfirmed on B10/C10/B05/C16):
  - Driver seat heat (level 1-3) when heating (cold)
  - Steering wheel heat when heating (cold)
  - Windshield defrost (`cmd.defrost` - the working "max defrost" command, not the ineffective `cmd.defrost_level`) below its own separate, independently configurable temperature threshold (icing risk, distinct from the general heat/cool/vent split)
- Fix: sunshade cold-protection close now has its own separate, stricter threshold (default 5°C) instead of triggering for the entire "heat" range - confirmed in practice that the general heat threshold alone closed the roof at 14°C, which doesn't need insulating against. Still applies day or night once genuinely cold enough (heat loss through the glass roof is real at night too)
- New: official, cloud-metered charging session history cross-check (Diagnostics tab) - synced once daily against the manufacturer's own device-metered log (community-documented endpoint), classified home/public by GPS the same way as live tracking. Comparison only for now; live-tracked totals still drive the cost figures shown elsewhere

### 0.7.2 (2026-09-24)
- New: notification for new vehicle inbox messages (service reminders, recalls, etc.), separate from the existing software-update notification
- Fix: outdoor temperature (used for trip min/max temp and Prepare-to-Drive/Work) now falls back to Open-Meteo not just when the vehicle doesn't report a value at all, but also when its reported value has stopped updating (confirmed on T03: the cloud keeps serving the same reading once parked long enough) - same 30min staleness threshold as the existing data-age indicator, cached for 10min so this never polls Open-Meteo more than necessary
- Fix: the Cloud API Language field's help text (and its translations, which didn't exist in any language) referenced settings under wording that predated their move to the Settings tab
- Note: 0.7.1 was pushed to GitHub but never tagged/published to npm - its changes are included here in 0.7.2 instead

### 0.7.0 (2026-09-24)
- New: trip merge undo (`cmd.trips_merge_undo`, one slot, lost on adapter restart)
- Fix: merging a trip's GPS route now works correctly - previously the merged route was deleted right after being written, due to an off-by-one in the route-key handling during merge
- New: elevation gain per trip (via Open-Meteo, no API key)
- New: min/max outdoor temperature per trip
- New: regen estimate per trip (voltage x current integration), now correctly excluded from charging sessions
- New: CSV export for a chosen date range
- New: PDF trip-log export (table + summary row, chosen date range)
- New: configurable trip and GPS-route history retention, independently, in days (0 = forever, with a hard count-based safety cap)
- New: Prepare-to-Drive - auto heat/cool/vent on ignition-on based on outdoor-temperature thresholds, with a lock-state check and a guard against self-triggered commands causing false positives
- New: Prepare-to-Work - same climate-prep core, triggered via `cmd.prepare_to_work` instead of an ignition edge, for shift-schedule/calendar automation
- New: sunshade automation for both Prepare-to-Drive/Work, with separate position for heat/cool/vent and an "open when dark" rule (kept closed when heating for cold protection)
- New: outdoor temperature now sourced from Open-Meteo instead of the vehicle's own sensor (missing entirely on some models, e.g. B10, and misleading when parked in a garage) - 30-minute cache, falls back to the last known value on API errors
- New: estimated battery health (SoH), derived from official per-trip cloud energy vs. SoC used (median of the last 30 trips, deliberately not derived from the adapter's own charging-cost estimate to avoid a circular "always ~100%" result)
- New: home/public charging cost split by GPS distance to a configurable home location (address search via Nominatim, map with draggable marker and radius circle); home charging can use a dynamic price datapoint (e.g. Tibber/aWATTar), public charging always uses a separate fixed manual price
- New: notifications (trip done, charge done, OTA update, window-left-open warning, Prepare-to-Drive/Work triggered) via `sendTo`, with telegrammenu2 severity levels/area support and a dedicated email payload; test-notification button in the Settings tab
- Fix: Prepare-to-Drive missed real drive starts after a long idle period, because the vehicle auto-relocks itself while driving - now also gates on movement (speed/gear), not lock state alone
- Fix: Prepare-to-Drive could misfire from a transient ignition-on reading caused by any remote command (its own or an external script's) waking the vehicle - now ignores an ignition edge within 2 minutes of any command sent
- Fix: `bcmKeyPositionOn1` staying on during charging previously kept a trip open and counted charging current as regen - now correctly separated
- Fix: Leaflet's default marker showed as a broken "?" under Vite (bundler doesn't serve `leaflet/dist/images/*.png` automatically) - now explicitly imported and overridden
- Fix: several `{condition && <JSX>}` renders showing a literal "0" instead of nothing, when `condition` was the number `0` rather than `false`
- Improved: Datapoints tab moved to the end of the tab order
- Improved: full i18n coverage across all 11 languages - fixed several previously silent gaps (category group headings, tab names, "Parked")
- Fix: battery color threshold corrected (turns yellow at 20%, was incorrectly 50%)
- Fix: vehicles west of Greenwich (UK, Ireland, Portugal, parts of Spain/France) showed their GPS position mirrored into the wrong hemisphere; latitude/longitude now use the signed signal values instead of the absolute-value-only fields (community-confirmed via leapmotor-ha)
- Fix: window open/close/set-to-percent commands now scale to each model's native range - B05/B10/C10 expect a 0-10 scale, not 0-100 like T03; commands sent to those models previously moved the window far less than requested
- Fix: the "charging" status could get stuck showing active from a stale/phantom cloud flag while the car was actually being driven or just powered on and ready; it's now cross-checked against gear position, speed and ignition before being reported
- Fix: on T03, the binary window-open flags could remain at 0 even with the window actually open; open/closed status on this model now falls back to the live position percentage
- Fix: steering-wheel heating and seat heating/ventilation commands used a payload format the cloud silently ignored; both now send the numeric level/position format confirmed correct against two independent community reverse-engineering projects - not live-tested here, as this T03 doesn't have this hardware
- Known limitation: mirror heating is not controllable via the API on this T03 - confirmed non-functional even via the official Leapmotor app, so likely not exposed to the API/app for this vehicle at all. Payload sent matches the community-verified format; left in for other models/regions where it may work.
- Chore: cross-checked the tire-pressure signal ID mapping (front-left/front-right/rear-left/rear-right) against leapmotor-ha's independently corrected mapping - confirmed correct, no code change
- New: added B11 handling - not a separate model, it's Leapmotor's internal platform code for the C10 itself (confirmed via ADAC vehicle database); some cloud responses surface this code as carType instead of "C10", now mapped to the same endpoint and window scale.
- New (untested, community feedback welcome): start/stop charging, unlock charging connector, healthy-charging-mode toggle, fuel-heater toggle (REEV/range-extender models only), and sending a navigation destination (address or coordinates) to the vehicle. Payloads verified against two independent community reverse-engineering projects, not against real hardware - none of this is testable on this T03 (no REEV fuel heater; the other commands need a vehicle where charging/nav can safely be tried). Please open a GitHub issue with your model and result if you test any of these.
- Fix: trip tracking lives entirely in memory and gets wiped on every adapter restart, but trips.current_trip_active kept whatever value it last had - if a trip was active when the adapter restarted (or crashed), it stayed stuck showing "in progress" forever, since nothing afterward re-evaluated it without a matching in-memory entry. Now cleared at startup if left over from before the restart (the original trip's exact end time/mileage can't be recovered at that point).
- Improved: every remote command now logs a "Command: ..." line before sending and a "successful"/"failed" line after, at debug level - previously several commands (ac_temp/fan/position, speed limit, seat heat/ventilation, destination send, charge limit, refresh, defrost cycle) sent silently on success, making it impossible to tell from the log whether anything actually happened without also checking the raw status. Commands that only stage a value for a later command (ac_temp, climate/charge schedule fields, defrost level) now log that explicitly instead, so they're not mistaken for a command that was actually sent to the vehicle.
- Fix: cmd.charge_limit_set never synced with the vehicle's actual charge limit unless changed through this adapter's own control - if you changed it via the official app instead (e.g. to 100%), the internal control stayed frozen at its creation-time default of 80. cmd.charge_schedule_apply would then silently send that stale 80 back to the vehicle, overwriting your real setting. Now synced from the vehicle's actual reported limit on every poll, and charge_schedule_apply falls back to the vehicle's current schedule value instead of a hardcoded 80 if the control was never touched.
- Improved: trip detection now closes a trip immediately once the vehicle is locked and the ignition is explicitly off, instead of always waiting the full 10-minute grace period. The 10-minute grace period still applies for ambiguous cases (e.g. ignition status not reported, or car left unlocked with ignition off). Also added a second, independent fast-path signal: a completed lock → unlock → lock cycle since the trip started (the car auto-locks while driving, so getting out requires unlocking, then it's locked again afterward) is treated as equally definitive proof the trip is over, even on models where ignition status isn't reliably reported.
- Fix: a token expiry hitting exactly during cmd.refresh (or the delayed status fetch after certain commands) crashed the whole adapter process with an unhandled promise rejection, instead of re-logging in like the regular polling cycle already does. Both paths now catch the error and retry after a fresh login, same as the poller.
- Confirmed via a real B10 owner (extensive status field testing, 2026-07): battery/range/mileage/speed/ignition/doors/windows/tire pressure/sunroof/GPS/charge plan/charge limit status all report correctly; the hotspot status field doesn't exist on B10, same as T03. Also confirmed the vehicle's reported AC vent direction is decoded correctly (2026-09 dumps). Battery preheat was attempted but inconclusive (vehicle declined to activate in warm weather) - still untested.

### 0.6.8 (2026-09-19)
- Fix: the 0.6.7 re-login fix correctly detected an expired session token, but retried login using the same device identity every time - which the cloud started rejecting after the first failure, leaving the adapter stuck until a manual restart. A fresh device identity is now generated on every login attempt.
- Fix: remote pre-conditioning (heating/cooling the car before getting in, which turns the ignition on without the car moving) no longer gets misdetected as the start of a trip
- Fix: a completed trip's recorded end time now uses the vehicle's own reported timestamp instead of when our next poll happened to notice the stop, giving more accurate trip duration and a better match for the cloud's energy-breakdown time window
- Chore: added diagnostic logging of raw login/energy-breakdown responses to aid future troubleshooting

### 0.6.7 (2026-09-18)
- Fix: the automatic re-login on an expired session token was case-sensitive and never triggered for the cloud's "TOKEN_NOT_AVAILABLE" error, causing all polling to silently fail until a manual adapter restart
- Fix: a trip now only ends once the ignition is actually off (not just when speed reaches 0), and only after a 10-minute confirmation grace period - a brief stop at a light or curb no longer splits one drive into several
- Fix: the trip energy-breakdown retry queue now survives adapter restarts instead of leaving trips stuck showing "not yet available" forever; trips whose data never arrives are now clearly marked unavailable after the retry budget is exhausted
- Chore: raw status/energy-breakdown debug logging improvements to aid future diagnosis

### 0.6.6 (2026-09-17)
- Fix: B05 vehicles now use the shared C10 status endpoint (community-confirmed via leapmotor-ha), resolving the HTTP 404 status error (#38)
- Fix: right-side door overlays now render correctly behind the vehicle body/hood for proper depth ordering
- Chore: added ESLint config, tsconfig.json, VSCode JSON schema hints, converted i18n files to short format, bumped several dependencies, added Node.js 26 to the test matrix

### 0.6.5 (2026-09-02)
- New: on adapter start, the raw (pre-parsing) status response is logged once per vehicle at debug level, to help diagnose unsupported or under-tested vehicle models (e.g. B05)
- New: status request errors now also include the requested URL and the server's response body (if any)

### 0.6.4 (2026-09-02)
- Chore: migrated Admin Tab to adapter-react-v5 8.x and MUI v6 (React stays on 18, no breaking change for users)
- Fix: corrected Grid layout usage after the MUI v6 update, which had caused overlapping text on the Diagnostics tab
- Fix: unified card spacing/padding across all Admin Tab pages for a consistent look
- Fix: pinned react-dom to 18.3.1 to avoid a dependency resolution conflict
- Chore: minor CI workflow fix

### 0.6.3 (2026-09-01)
- Fix: preserve the existing charge schedule (enabled state, recurrence, start/end time) when changing the charge limit, instead of resetting it every time
- Fix: corrected door z-order and window-closed overlay logic on both vehicle sides
- Fix: clarified that the "Language" setting only affects Leapmotor cloud API text, not the Admin Tab UI (renamed to "Cloud API Language")
- Chore: bumped axios to 1.19.0
- Adapter is now available in the ioBroker stable repository
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.6.2 (2026-07-08)
- Fix: B10 model now correctly uses the c10 cloud status endpoint (community-confirmed), resolving empty status/trips/charging datapoints
- Fix: enabled full i18n for jsonConfig.json now that admin/i18n translation files cover all keys

### 0.6.1 (2026-07-03)
- Fix: repository checker findings - node: prefix for built-in modules, removed raw setTimeout fallback, included admin-tab i18n source in npm package, trimmed news list to 7 entries

### 0.6.0 (2026-07-03)
- Refactor: moved to standard plain-JS repository layout (main.js at repository root, supporting modules under lib/ instead of build/)
- Fix: removed dead/duplicate code, added VIN sanitization for object IDs, subscribed and acknowledged config.* states
- Fix: enforced upper bound on polling interval in code, switched picture cache from package-directory file to adapter's own file storage
- Fix: translated remaining German backend strings to English, enabled compact mode support, adapter-managed timers used throughout

### 0.5.8 (2026-07-02)
- Fix: repository checker compliance - added missing intermediate object structure (charging/consumption/pictures/trips channels), corrected invalid state roles, added real integration test

### 0.5.7 (2026-06-29)
- Fix: avoid npm transparency log conflict from a previous failed publish attempt (no functional changes vs. 0.5.5)

Older changes can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Henrik Schönhofen (backfisch88) <henrik.schoenhofen@icloud.com>

See [LICENSE](https://github.com/backfisch88/ioBroker.leapmotor/blob/main/LICENSE) for the full license text.