---
chapters: {"pages":{"en/adapterref/iobroker.bluelink/README.md":{"title":{"en":"ioBroker.bluelink"},"content":"en/adapterref/iobroker.bluelink/README.md"},"en/adapterref/iobroker.bluelink/README_de.md":{"title":{"en":"ioBroker.bluelink (Deutsche Dokumentation)"},"content":"en/adapterref/iobroker.bluelink/README_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bluelink/README.md
title: ioBroker.bluelink
hash: jM7u+pIa1rHulH4yu5jAWuSs8202fD/wnvnPuqGB9E0=
---
![Logo](../../../en/adapterref/iobroker.bluelink/admin/bluelink.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bluelink.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bluelink.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/bluelink-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/bluelink-stable.svg)
![Test und Freigabe](https://github.com/Newan/iobroker.bluelink/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/bluelink/svg-badge.svg)
![NPM](https://nodei.co/npm/iobroker.bluelink.png?downloads=true)

# ioBroker.bluelink

**[Deutsche Dokumentation (README\_de.md)](/#/docs/adapterref/iobroker.bluelink/README_de.md)**

---

## Überblick

**ioBroker.bluelink** verbindet Fahrzeuge **von Hyundai (Bluelink)** und **Kia (Kia Connect / UVO)** mit ioBroker. Es unterstützt Elektrofahrzeuge (EV), Plug-in-Hybride/Hybride (PHEV/HEV) und Fahrzeuge mit Verbrennungsmotor (ICE), einschließlich moderner ccNC-Modelle (z. B. Kia EV3, EV6, EV9, Hyundai IONIQ 5, IONIQ 6, Kona).

### Hauptmerkmale

- **100% automatisierter Headless-Login (EU OneApp / CCI):** Direkter Login mit Ihrer Konto-E-Mail-Adresse und Ihrem Passwort – **keine manuelle Token-Generierung, keine externen Skripte, keine Browserinteraktion, kein QR-Code und kein Captcha erforderlich** .
- **Umfassende Telemetrie:** Ladezustand (HV-Batterie & 12V-Hilfsbatterie), Gesundheitszustand (SoH), Ladestatus, geschätzte Reichweite (DTE), Kilometerzähler, Tür-/Fenster-/Kofferraum-/Motorhaubenstatus, Klimastatus, Reifendruckwarnungen und Fahrhistorie.
- **Vollständige Fernsteuerung:** Verriegeln/Entriegeln der Türen, Starten/Stoppen der Klimaanlage (einschließlich Temperatur, Entfrosten und Heizen), Starten/Stoppen des Ladevorgangs und Einstellen von AC/DC-Ladegrenzen.
- **Standort & Reverse Geocoding:** GPS-Koordinaten (`lat`, `lon`, `speed`), Google Maps-Link und optionale Auflösung der Straßenadresse über OpenStreetMap.
- **12V-Batterieschutz:** Fragt standardmäßig den Cloud-Cache ab, ohne das Fahrzeug aufzuwecken, kombiniert mit einer konfigurierbaren 12V-Batterieschwellenwertüberwachung.

---

## Authentifizierung & Ersteinrichtung (EU Hyundai & Kia)

### 1. Einrichtung in der Adapterkonfiguration

Sie müssen **kein** Token manuell generieren oder eingeben:

1. Wählen Sie Ihre **Marke** (`Kia` oder `Hyundai`), **Motortyp** (`EV`, `PHEV/MHEV`, oder `Diesel/Benzin`), und **App-Sprache** .
2. Geben Sie Ihren **Benutzernamen** (Ihre E-Mail-Adresse), **Ihr Passwort** und Ihre 4-stellige **PIN** (wird für die Fernsteuerung des Fahrzeugs verwendet) ein.
3. Instanzkonfiguration speichern und schließen.

Beim Start führt der Adapter automatisch die Headless **-OneApp-/Connected-Car-Infrastruktur-Authentifizierung (CCI)** durch und verwaltet die verschlüsselten Sitzungstoken intern.

> **Wichtig:** Führen Sie **keine** externen Token-Generator-Skripte aus (wie z. B. `bluelink_refresh_token` Diese Skripte basieren auf dem veralteten OAuth-Verfahren, das von der Firewall von Hyundai/Kia blockiert wird (`HTTP 403 Forbidden`) und können Ihre Heim-IP-Adresse vorübergehend blockieren oder deren Geschwindigkeit begrenzen.

### 2. So funktioniert die automatische Authentifizierung

Da Hyundai und Kia den alten europäischen OAuth-Anmeldeendpunkt dauerhaft deaktiviert haben, verwendet der Adapter seinen eigenen integrierten **OneApp / CCI Token Manager** (`lib/tokenManager.js`):

1. **Sitzungsinitialisierung:** Initialisiert eine native mobile Sitzung auf `idpconnect-eu.kia.com` /`idpconnect-eu.hyundai.com` Verwendung der OneApp-Client-ID ohne Weiterleitungen über externe Webbrowser (wodurch Browser-Captcha-/QR-Code-Abfragen vermieden werden).
2. **RSA-Passwortverschlüsselung:** Ruft den aktuellen öffentlichen RSA-Schlüssel des Servers ab (`/auth/api/v1/accounts/certs`) und verschlüsselt Ihr Passwort lokal mit RSA-PKCS1v1.5.
3. **Headless-Sign-In:** Übermittelt die verschlüsselten Anmeldeinformationen an `/auth/account/signin` und empfängt den OAuth-Autorisierungscode direkt über HTTP 302.
4. **Abrufen eines signierten CCI-Tokens:** Tauscht den Autorisierungscode gegen ein OneApp CCI-Token-Set aus (`/auth/v1/token`), signiert mit dem erforderlichen HMAC-SHA256 `X-Fingerprint` Die
5. **CCS Token Exchange:** Tauscht den CCI-Token über `/auth/v1/token-exchange?serviceType=CCS` für ein CCS-Bearer-Token, das von den Fahrzeugtelematik- und Fernsteuerungs-APIs verwendet wird.
6. **Automatische Erneuerung:** Bei nachfolgenden Neustarts des Adapters oder wenn sich das Token dem Ablaufdatum nähert, aktualisiert der Adapter die Sitzung im Hintergrund. `/auth/v2/token-refresh` und greift nur dann auf die Anmeldung mit einem vollständigen Passwort zurück, wenn das Aktualisierungstoken abgelaufen ist.

### 3. Behebung von Anmeldeproblemen

- **Ausstehende Nutzungsbedingungen / Kontobestätigung:** Wenn die Protokollberichte `Account consent or verification is required` Öffnen Sie die offizielle **Kia App** oder **die Hyundai Bluelink App** auf Ihrem Smartphone, melden Sie sich einmalig an und akzeptieren Sie die aktualisierten Nutzungsbedingungen oder Datenschutzhinweise. Starten Sie anschließend den ioBroker-Adapter neu.
- **Temporäre IP-Sperre (`HTTP 403 Forbidden`) oder langsames Anmelden:** Wiederholte fehlgeschlagene Anmeldeversuche (insbesondere aufgrund veralteter Adapterversionen oder externer Skripte wie `bluelink_refresh_token` Dies kann dazu führen, dass die Firewall des Herstellers (WAF) Ihre öffentliche IP-Adresse vorübergehend drosselt oder blockiert. Beenden Sie alle externen Skripte, warten Sie 30–60 Minuten (oder schließen Sie Ihren Router neu an, um eine neue öffentliche IP-Adresse zu erhalten) und lassen Sie den Adapter sich automatisch anmelden.
- **Manuelles Neuabrufen des Tokens:** Sie können jederzeit während der Laufzeit einen erneuten Tokenabruf auslösen, indem Sie den Status festlegen. `bluelink.0.info.fetchToken` Zu `true` Die

---

## Konfigurationsoptionen

| Einstellung                                                 | Beschreibung                                                                                                                                                                                 |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Marke**                                                   | Fahrzeughersteller (`Kia` oder `Hyundai`).                                                                                                                                                   |
| **Motor**                                                   | Antriebsart: `EV` (batterieelektrisch), `PHEV/MHEV` (Hybrid) oder `Diesel/Benzin` (Verbrennung).                                                                                                |
| **maximale Reichweite in km**                               | Maximale elektrische Reichweite in km (wird nur für PHEV angezeigt und verwendet).                                                                                                           |
| **App Sprache**                                             | Sprache, die für API-Antworten verwendet wird (`DE`, `EN`, `NL`, `IT`, `ES`, `PL`).                                                                                                         |
| **Benutzername**                                            | E-Mail-Adresse Ihres Kia Connect- oder Hyundai Bluelink-Kontos.                                                                                                                              |
| **Passwort**                                                | Kontopasswort (wird von ioBroker verschlüsselt gespeichert).                                                                                                                                 |
| **Stift**                                                   | In der mobilen App konfigurierte 4-stellige Sicherheits-PIN (verschlüsselt gespeichert).                                                                                                     |
| **Tägliche Fahrtenhistorie erhalten**                       | Ruft den täglichen Fahr- und Energieverbrauchsverlauf ab (nur für Elektrofahrzeuge, erfordert ca. 3 API-Anfragen pro Tag).                                                                   |
| **Aktualisierung stoppen, wenn die 12-V-Batterie unter...** | Schützt die 12V-Hilfsbatterie vor Tiefentladung.                                                                                                                                             |
| **Anfrage maximal 400**                                     | Anzahl der täglichen Statusabfrageanfragen, verteilt über 24 Stunden (z. B. `100` (etwa alle 14,4 Minuten). Maximal ist `400` um die vom Hersteller vorgegebenen Durchflussmengen einzuhalten. |
| **Fehlerzähler**                                            | Anzahl aufeinanderfolgender Fehler, die toleriert werden, bevor ein Fehler protokolliert und bis zum nächsten Zyklus pausiert wird.                                                          |
| **Die Adresse aus den Koordinaten auflösen**                | Verwendet OpenStreetMap (Nominatim), um GPS-Koordinaten in eine für Menschen lesbare Straßenadresse umzuwandeln (`vehicleLocation.position_text`).                                          |

---

## Staaten & Fernbedienungen

### Adapter- und Authentifizierungsstatus (`info.*`)

| Zustand                 | Rolle / Typ                        | Beschreibung                                                                                    |
| ----------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------- |
| `info.connection`       | `indicator.connected` (`boolean`) | `true` wenn Sie angemeldet und mit der Cloud-API verbunden sind.                                |
| `info.tokenType`        | `text` (`string`)                 | Aktiver Authentifizierungsmodus (`cci` für den EU OneApp/CCI-Ablauf, `legacy` für ältere Token). |
| `info.tokenExpiry`      | `text` (`string`)                 | ISO-8601-Zeitstempel, der angibt, wann das aktuelle CCS-Zugriffstoken abläuft.                  |
| `info.lastTokenRefresh` | `value.time` (`number`)           | Unix-Zeitstempel (ms) der letzten erfolgreichen Anmeldung oder Token-Aktualisierung.            |
| `info.fetchToken`       | `button` (`boolean`)              | Auf einstellen `true` (`ack: false`) um manuell eine sofortige Token-Erneuerung auszulösen.     |

### Fahrzeugfernbedienungen (`<VIN>.control.*`)

| Zustand                             | Typ / Rolle             | Beschreibung                                                                                                                                                                                  |
| ----------------------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `control.lock`                      | `boolean` (`button`)   | Verriegelt die Fahrzeugtüren.                                                                                                                                                                 |
| `control.unlock`                    | `boolean` (`button`)   | Entriegelt die Fahrzeugtüren.                                                                                                                                                                 |
| `control.charge`                    | `boolean` (`button`)   | Startet den Ladevorgang des Fahrzeugs.                                                                                                                                                        |
| `control.charge_stop`               | `boolean` (`button`)   | Unterbricht den Ladevorgang des Fahrzeugs.                                                                                                                                                    |
| `control.charge_limit_slow`         | `number` (`indicator`) | Ziel-SoC-Grenze (`50` –`100` %) für langsames Laden mit Wechselstrom.                                                                                                                         |
| `control.charge_limit_fast`         | `number` (`indicator`) | Ziel-SoC-Grenze (`50` –`100` %) für DC-Schnellladung.                                                                                                                                         |
| `control.clima.start`               | `boolean` (`button`)   | Startet die Vorkonditionierung (Klimatisierung) mit den angegebenen Parametern. `control.clima.set.*` Die                                                                                      |
| `control.clima.stop`                | `boolean` (`button`)   | Stoppt die Vorklimatisierung.                                                                                                                                                                 |
| `control.clima.set.airTemp`         | `number` (`indicator`) | Zielkabinentemperatur in °C (Standard: `18`).                                                                                                                                                 |
| `control.clima.set.defrost`         | `boolean` (`state`)    | Ermöglicht das Enteisen der Frontscheibe während der Vorklimatisierung.                                                                                                                       |
| `control.clima.set.heating`         | `number` (`state`)     | Ermöglicht die Beheizung von Lenkrad und Heckscheibe (`1` = an, `0` = aus).                                                                                                                    |
| `control.force_refresh_from_server` | `boolean` (`button`)   | Ruft den neuesten zwischengespeicherten Status vom Hyundai/Kia Cloud-Server ab ( **weckt das Auto nicht auf** ).                                                                              |
| `control.force_refresh_from_car`    | `boolean` (`button`)   | Weckt das Fahrzeug über das Mobilfunknetz auf, um den aktuellen Status und das GPS abzufragen ( **benötigt eine 12V-Batterie** ).                                                             |
| `control.force_location`            | `boolean` (`button`)   | Fordert eine Live-GPS-Positionsaktualisierung direkt vom Fahrzeug an.                                                                                                                         |
| `control.force_update`              | `boolean` (`state`)    | Steuert das periodische Abfrageverhalten: `false` (Standard) = nur Server-Cache; `true` = Auto bei jeder Umfrage aufwecken ( **nicht empfohlen** ).                                             |
| `control.batteryControlState12V`    | `number` (`state`)     | Minimaler SoC-Schwellenwert für 12-V-Batterie in % (Standard: `65` Unterhalb dieses Wertes werden aktive Fahrzeugaufweckvorgänge blockiert, es sei denn, das Fahrzeug fährt oder wird geladen. |

### Fahrzeugtelemetrie (`<VIN>.*`)

- ** `<VIN>.vehicleStatus.battery.*`:**
  - `soc`: Ladezustand der Hochvoltbatterie in `%` Die
  - `soh` Zustand der Hochvoltbatterie in `%` Die
  - `charge`: `true` wenn das Fahrzeug gerade geladen wird.
  - `plugin`: Ladeverbindungsstatus (`0` = ausgesteckt, `1` = Gleichstrom schnell, `2` = tragbar/ICCB, `3` = AC-Wanddose/Station).
  - `minutes_to_charged` Verbleibende Ladezeit in Minuten.
  - `soc-12V`: Ladezustand der 12V-Hilfsbatterie in `%` Die
- ** `<VIN>.vehicleStatus.*`:**
  - `dte` /`evModeRange` /`gasModeRange` Geschätzte verbleibende Fahrreichweite in `km` Die
  - `doorLock`, `trunkOpen`, `hoodOpen`, `doorOpen.*`: Verriegelungs- und Öffnungs-/Schließzustände für alle Türen, den Kofferraum und die Motorhaube.
  - `airCtrlOn`, `airTemp`, `steerWheelHeat`, `sideBackWindowHeat` Aktueller Klima- und Heizungszustand.
- ** `<VIN>.vehicleLocation.*`:**
  - `lat`, `lon`, `speed` Aktuelle GPS-Koordinaten und Geschwindigkeit.
  - `position_url`: Direkter Google Maps-Link zum Standort des Fahrzeugs.
  - `position_text`: Aufgelöste Straßenadresse (falls die OpenStreetMap-Auflösung aktiviert ist).
- ** `<VIN>.odometer.value` Gesamtkilometerstand** in `km` Die
- ** `<VIN>.driveHistory.*`:** Tägliche und kumulative Energieverbrauchs-, Rückgewinnungs- und Streckenstatistik (EV).

---

## Community & Links

- [ioBroker-Forum-Diskussion](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo)
- [GitHub Wiki](https://github.com/Newan/ioBroker.bluelink/wiki)

---

## Spende

[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=L55UBQJKJEUJL)

## Changelog
### 3.1.37 (2026-11-06)
* (meistermopper) Fall back to in-memory full CCI login when runtime CCI token refresh fails (`HTTP 401 code 9030 jwt-expired / Token expired`)
* (meistermopper) Remove obsolete manual Refresh Token / Fallback section from Admin UI and documentation since OneApp/CCI authentication is fully automatic
* (meistermopper) Add comprehensive English and German documentation for automated OneApp/CCI authentication, configuration options, and data points
* (meistermopper) Modernize Admin UI and i18n translations across all 11 supported languages
* (meistermopper) Fix shutdown race condition when saving rotated CCI tokens during adapter startup

### 3.1.36 (2026-11-01)
* (meistermopper) Fix EU login: enforce OneApp/CCI flow for European vehicles when username/password are provided
* (meistermopper) Integrate evcc-compatible Node TLS, cookie jar scoping, and IDP redirect hop handling
* (meistermopper) Add random device ID fallback if legacy device registration fails (hyundai_kia_connect_api #1342)
* (meistermopper) Add support for importing evcc token bundles into the refresh token field

### 3.1.35 (2026-10-15)
* (arteck) Fix EU Hyundai/Kia login

### 3.1.34 (2026-09-17)
* (arteck) fix location request

### 3.1.33 (2026-08-22)
* (ipod86) Fix EU Hyundai/Kia login

## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

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