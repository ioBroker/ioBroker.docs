---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.leapmotor/README.md
title: ioBroker.leapmotor
hash: iRllJn1/R713UfTzjjjmST6n7CCInb6TEt498uQOR08=
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

## App-Zertifikat

Die Leapmotor-Cloud kommuniziert nur mit Clients, die das Zertifikat der offiziellen Leapmotor-App (mTLS) vorweisen. Dieses Zertifikat ist nicht im Lieferumfang des Adapters enthalten. Sie müssen die beiden Dateien selbst besorgen und deren Inhalt in die Adaptereinstellungen einfügen.

1. Herunterladen `app.crt` Und `app.key` aus [markoceri/leapmotor-certs](https://github.com/markoceri/leapmotor-certs) . Dieselben Dateien werden von LeapConnect, dem leapmotor-api Python-Client, evcc und der leapmotor-ha Home Assistant-Integration verwendet.
2. Öffnen Sie jede Datei in einem Texteditor und kopieren Sie alles, einschließlich der `-----BEGIN ...-----` Und `-----END ...-----` Zeilen.
3. Fügen Sie das Zertifikat in das **Feld „App-Zertifikat (PEM)“** und den Schlüssel in das **Feld „Privater App-Schlüssel (PEM)“** ein und speichern Sie anschließend.

Wenn Sie von einer Version vor 0.9.0 aktualisieren, bleibt der Adapter so lange getrennt, bis beide Felder ausgefüllt sind.

## Konfiguration

| Einstellung               | Beschreibung                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| E-Mail                    | E-Mail-Adresse für Ihr Leapmotor-Konto (wir empfehlen die Verwendung eines separaten Zweitkontos) |
| Passwort                  | Leapmotor-Kontopasswort                                                                           |
| Fahrzeug-PIN              | 4-stellige Fahrzeug-PIN – für alle Fernbefehle erforderlich                                       |
| App-Zertifikat (PEM)      | Inhalt von `app.crt` (siehe unten)                                                                 |
| App-Privatschlüssel (PEM) | Inhalt von `app.key` (siehe unten), verschlüsselt gespeichert                                      |
| Cloud-API-Sprache         | Betrifft nur den Text der Leapmotor Cloud-API (z. B. Namen von Tagen im Zeitplan).                |

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
| cmd.charge\_limit\_set                                              | Ladegrenze, 50–100 %                                                                                                  | Alle Modelle außer T03 (hier kein Effekt, bestätigt)                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| cmd.charge\_schedule\_enable / start / end / apply                  | Ladeplan                                                                                                              | Alle Modelle (der Zeitplan bestätigt die Arbeit an T03)                                                                                                                                                                                                                                                                                                                                                                                                                                          |
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

`sunroof` /`sunshade` werden auf die gleiche Weise behandelt – siehe `src-admin/src/vehicleCapabilities.js` für den bestätigten Unterschied zwischen B10 und T03.

Welche Komfortfunktionen tatsächlich angezeigt werden, hängt vom erkannten Fahrzeugmodell ab – siehe `src-admin/src/vehicleCapabilities.js` im Repository für die aktuelle Fähigkeitsmatrix pro Modell.

## Changelog

### **WORK IN PROGRESS**

### 0.9.1 (2026-11-21)
- (backfisch88) Fix: certificate and key fields in the adapter settings were not editable

### 0.9.0 (2026-11-21)
- (backfisch88) Breaking: the app certificate is no longer bundled. Paste `app.crt` and `app.key` into the adapter settings (see "App certificate")

### 0.8.3 (2026-11-12)
- (backfisch88) Fix: switching the car on while charging no longer ends the charging session early ("charging finished" message)

### 0.8.2 (2026-11-12)
- (backfisch88) Changed: connection debug lines only shown on error
- (backfisch88) Changed: admin start shows a spinner instead of "No vehicle found" while loading, remembers the last selected vehicle

### 0.8.1 (2026-11-12)
- (backfisch88) Changed: faster start of the admin page

### 0.8.0 (2026-11-12)
- (backfisch88) New: redesigned admin (light/dark follows ioBroker, hero view, quick actions, cards)
- (backfisch88) New: battery variant dropdown with net and gross capacity (`config.battery_capacity_gross_kwh`), "use measured value" button
- (backfisch88) Changed: default capacities are now usable (net) values; A10 and B05 added
- (backfisch88) New: charge-finished message with duration and custom text (`config.charge_done_text`)
- (backfisch88) New: optional charging progress notification and public-charger time-limit warning
- (backfisch88) New: fan speed up to the car's maximum (B10/B05: 9)
- (backfisch88) Fix: README - T03 charge limit has no effect, charging schedule works

### 0.7.5 (2026-10-25)
- Fix: boolean status datapoints (climate, locked, doors, ignition, Bluetooth, hotspot, window-open) were written from the raw cloud signal without converting to a real boolean

Older changes can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Henrik Schönhofen (backfisch88) <henrik.schoenhofen@icloud.com>

See [LICENSE](https://github.com/backfisch88/ioBroker.leapmotor/blob/main/LICENSE) for the full license text.