---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.leapmotor/README.md
title: ioBroker.leapmotor
hash: 8QA3uSUcwt1tMocORl/MHsGWw3rsaX8QAGTM4T485Cw=
---
![Logo](../../../en/adapterref/iobroker.leapmotor/admin/leapmotor.png)

![Version](https://img.shields.io/badge/version-0.6.0-blue.svg)
![Lizenz: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

# IoBroker.leapmotor
Inoffizielle Integration von Elektrofahrzeugen für ioBroker ([Leapmotor](https://www.leapmotor.com/)). Getestet auf T03.

## ⚠️ Wichtig: Verwenden Sie ein Zweitkonto
**Verwenden Sie nicht Ihr Hauptkonto von Leapmotor!**

Der Adapter hält eine permanente Verbindung zur Leapmotor-Cloud aufrecht. Wenn dasselbe Konto gleichzeitig in der Leapmotor-App verwendet wird, kommt es zu einem Konflikt zwischen den beiden Sitzungen, wodurch sich beide gegenseitig abmelden.

**Empfohlene Konfiguration:**

1. Erstellen Sie ein zweites Leapmotor-Konto (z. B. mit einer zweiten E-Mail-Adresse).
2. Navigieren Sie in der Leapmotor-App zu:

**Persönliches Center → Mein Fahrzeug → [Fahrzeugname] → Gemeinsame Mitglieder → Gemeinsames Mitglied hinzufügen**

3. Geben Sie die E-Mail-Adresse des zweiten Kontos ein und erteilen Sie alle Rechte.
4. Verwenden Sie die Anmeldeinformationen des zweiten Kontos in der Adapterkonfiguration.

Auf diese Weise bleibt Ihr Hauptkonto jederzeit in der App angemeldet.

---

## Merkmale
- React-basiertes Admin-Dashboard mit den Registerkarten Dashboard, Verbrauch, Fahrten, Datenpunkte und Diagnose
- Fahrzeugstatusabfrage alle 1–60 Minuten (konfigurierbar)
- Batterieladestand, Reichweite, Temperatur, Reifendruck, GPS, Türen, Fenster
Fernbedienung: Klima (Heizen/Kühlen/Lüften), Verriegeln/Entriegeln, Fensterheber, Sonnenschutz, Kofferraum, Suchen
- Klimaplanung (wiederkehrend, nach Wochentag) und Gebührenlimit / Gebührenplanung
- Komfortfunktionen, sofern vom Fahrzeug unterstützt: Wächtermodus, Sitzheizung/-belüftung, Lenkradheizung, Geschwindigkeitsbegrenzung, Spiegelheizung
- Fahrtenerkennung mit täglicher Kilometererfassung und individueller Fahrtenhistorie
- Schätzung der Ladekosten auf Basis eines konfigurierbaren Strompreises
- Fahrzeugnachrichten und Anzahl ungelesener Nachrichten
- Fahrzeugmodellspezifisches Funktionsumfangssystem (nicht unterstützte Funktionen werden automatisch ausgeblendet)
- Verbrauchsstatistik mit wöchentlicher Historie
- Dynamisches Fahrzeug-Dashboard (zusammengesetztes HTML-Widget für VIS)
- Automatische Token-Aktualisierung
- Bildcache (einmal heruntergeladen, lokal gespeichert)

## Getestete Fahrzeuge
- Leapmotor T03 ✅ (vollständig getestet)
- Leapmotor B10 / C10 / C16 – sollte funktionieren, Verfügbarkeit der Komfortfunktionen noch nicht geprüft

## Installation
Installation über die ioBroker-Admin-Benutzeroberfläche.

## Konfiguration
| Schauplatz | Beschreibung |
|---------|-------------|
| E-Mail | E-Mail-Adresse des Leapmotor-Kontos (wir empfehlen die Verwendung eines separaten zweiten Kontos) |
| Passwort | Leapmotor-Kontopasswort |
| Fahrzeug-PIN | 4-stellige Fahrzeug-PIN – für alle Fernbefehle erforderlich |
| Abfrageintervall | Statusaktualisierungsintervall in Minuten (Standard: 5) |

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
leapmotor.0.config.*                      → Electricity price / battery capacity used for cost estimation
```

Die vollständige Menge der verfügbaren Datenpunkte, einschließlich aller beschreibbaren Befehlszustände, lässt sich am besten direkt im ioBroker-Objektbaum oder über die Registerkarte **Datenpunkte** in der Admin-Benutzeroberfläche des Adapters erkunden – dort werden alle Datenpunkte mit ihrem aktuellen Wert und einer kurzen Beschreibung aufgelistet.

### Admin-Dashboard
Der Adapter verfügt über eine eigene, auf React basierende Admin-Registerkarte (klicken Sie auf das Adapter-Symbol in der Instanzliste) mit fünf Unterregisterkarten: **Dashboard** (Live-Status und Fernsteuerung), **Verbrauch** (wöchentlicher Energieverbrauch und Kostenschätzung), **Fahrten** (tägliche Kilometer und einzelne erkannte Fahrten), **Datenpunkte** (vollständiger Datenpunkt-Browser) und **Diagnose**.

### Animiertes Fahrzeugbild für VIS
`leapmotor.0.<VIN>.pictures.composite_html` enthält nun ein einfaches, einbettbares animiertes Fahrzeugbild (transparenter Hintergrund, keine Schaltflächen oder Armaturenbrett-Chromelemente – diese befinden sich jetzt im Admin-Bereich). Fügen Sie ein **einfaches String-Widget (unmaskiert)** in VIS hinzu oder betten Sie es über `<iframe>` ein und legen Sie die Objekt-ID wie folgt fest:

```
leapmotor.0.<VIN>.pictures.composite_html
```

### Verfügbare Befehle (Auswahl)
Einfache Ein-/Ausschalter unter `cmd.*` (Rolle `button`, auf `true` eingestellt, um auszulösen):

| Befehl | Beschreibung | PIN erforderlich |
|---------|-------------|:------------:|
| cmd.ac_heat | Heizung starten | ✅ |
| cmd.ac_cool | Kühlung starten | ✅ |
| cmd.ac_vent | Belüftung starten | ✅ |
| cmd.ac_off | Klimatisierung stoppen | ✅ |
| cmd.defrost | Windschutzscheibenenteisung | ✅ |
| cmd.windows_open | Fenster öffnen | – |
| cmd.windows_close | Fenster schließen | – |
| cmd.find | Fahrzeug suchen (Hupe/Lichter) | – |
| cmd.battery_preheat | Batterievorheizung aktiviert | ✅ |
| cmd.battery_preheat_off | Batterievorwärmung aus | ✅ |
| cmd.lock | Fahrzeug sperren | ✅ |
| cmd.unlock | Fahrzeug entsperren | ✅ |
| cmd.trunk_open | Kofferraum öffnen | ✅ |
| cmd.trunk_close | Trunk schließen | ✅ |
| cmd.refresh | Sofortige Statusaktualisierung auslösen | – |

Wertbasierte Befehle:

| Befehl | Beschreibung |
|---------|-------------|
| cmd.ac_temp | Zieltemperatur, 16–30 °C |
| cmd.ac_fan_speed | Lüftergeschwindigkeit, 1–7 |
| cmd.ac_position | Luftposition: alle / oben / unten / vorne / hinten |
| cmd.windows_set | Fensterposition, 0–100 % |
| cmd.sunshade_set / sunshade_open / sunshade_close | Sonnenschutzposition (T03), 0–10 |
| cmd.charge_limit_set | Ladebegrenzung, 50–100 % |
| cmd.charge_schedule_enable / start / end / apply | Ladeplan |
| cmd.climate_schedule_enable / mode / time / days / apply / cancel | Wiederkehrender Klimaplan |
| cmd.speed_limit_set | Geschwindigkeitsbegrenzung, falls vom Fahrzeug unterstützt |

Komfortbefehle (werden nur erstellt/angezeigt, wenn das Fahrzeugmodell die Funktion unterstützt):

| Befehl | Beschreibung |
|---------|-------------|
| cmd.sentry_mode_on / off | Wächtermodus |
| cmd.seat_heat_driver / copilot | Sitzheizung |
| cmd.seat_ventilation_driver / copilot | Sitzbelüftung |
| cmd.steering_wheel_heat_on / off | Lenkradheizung |
| cmd.mirror_heat_on / off | Spiegelheizung |
| cmd.hotspot_on / off | WLAN-Hotspot (keine Auswirkung auf T03) |

Welche Komfortbefehle tatsächlich angezeigt werden, hängt vom erkannten Fahrzeugmodell ab – siehe `admin-tab/src/vehicleCapabilities.js` im Repository für die aktuelle Fähigkeitsmatrix pro Modell.

## Changelog

### **WORK IN PROGRESS**
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

Older changes can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Henrik Schönhofen (backfisch88)