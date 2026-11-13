---
chapters: {"pages":{"en/adapterref/iobroker.bluelink/README.md":{"title":{"en":"ioBroker.bluelink"},"content":"en/adapterref/iobroker.bluelink/README.md"},"en/adapterref/iobroker.bluelink/README_de.md":{"title":{"en":"ioBroker.bluelink (Deutsche Dokumentation)"},"content":"en/adapterref/iobroker.bluelink/README_de.md"}}}
---
![Logo](admin/bluelink.png)
# ioBroker.bluelink (Deutsche Dokumentation)

**[English Documentation (README.md)](/#/adapters/bluelink)**

---

## Übersicht

Der Adapter **ioBroker.bluelink** verbindet Fahrzeuge von **Hyundai (Bluelink)** und **Kia (Kia Connect / UVO)** mit ioBroker. Unterstützt werden Elektrofahrzeuge (EV), Plug-in-Hybride / Vollhybride (PHEV/HEV) sowie Verbrenner (ICE) – einschließlich aktueller Modelle der ccNC-Generation (z. B. Kia EV3, EV6, EV9, Hyundai IONIQ 5, IONIQ 6, Kona).

### Hauptfunktionen
- **100 % automatischer Headless-Login (EU OneApp / CCI):** Direkte Anmeldung mit E-Mail-Adresse und Passwort – **keine manuelle Token-Generierung, keine externen Skripte, kein Browser, kein QR-Code und kein Captcha erforderlich**.
- **Umfangreiche Fahrzeug-Telemetrie:** Ladestand der Hochvoltbatterie (SoC) und 12V-Hilfsbatterie, Batteriegesundheit (SoH), Ladestatus, Restreichweite (DTE), Kilometerstand, Tür-/Fenster-/Kofferraum-/Motorhauben-Status, Klimastatus, Reifendruck-Warnungen und Fahrthistorie.
- **Vollständige Fernsteuerung:** Verriegeln/Entriegeln, Klimatisierung starten/stoppen (inkl. Zieltemperatur, Frontscheibenheizung, Lenkrad-/Heckscheibenheizung), Laden starten/stoppen sowie AC-/DC-Ladelimits setzen.
- **Standort & Adressauflösung:** GPS-Koordinaten (`lat`, `lon`, `speed`), direkter Google-Maps-Link und optionale Straßenadress-Auflösung über OpenStreetMap.
- **Intelligenter 12V-Batterieschutz:** Standardmäßige Abfrage über den Cloud-Server-Cache ohne Aufwecken des Fahrzeugs sowie konfigurierbarer Schwellenwert für die 12V-Batterie.

---

## Authentifizierung & Ersteinrichtung (EU Hyundai & Kia)

### 1. Einrichtung in der Adapter-Konfiguration
Für die Einrichtung und den Betrieb ist **keine manuelle Token-Generierung erforderlich**:

1. Wähle in den Instanz-Einstellungen deine **Marke** (`Kia` oder `Hyundai`), den **Motor**-Typ (`EV`, `PHEV/MHEV` oder `Diesel/Benzin`) und die **App-Sprache** (`DE`).
2. Trage deinen **Benutzernamen** (E-Mail-Adresse deines Kia Connect / Bluelink Accounts), dein **Passwort** sowie deine 4-stellige **PIN** (für Steuerbefehle ans Fahrzeug) ein.
3. Speichere und schließe die Einstellungen.

Beim Start führt der Adapter vollautomatisch im Hintergrund die **OneApp / Connected Car Infrastructure (CCI)**-Authentifizierung durch und verwaltet die verschlüsselten Session-Tokens komplett intern.

> **Wichtiger Hinweis:** Verwende **keine** externen Token-Skripte (wie z. B. `bluelink_refresh_token`)! Diese Skripte nutzen den veralteten und von Hyundai/Kia abgeschalteten Legacy-OAuth-Flow, werden von der Firewall der Hersteller mit `HTTP 403 Forbidden` blockiert und können dazu führen, dass deine öffentliche Heim-IP-Adresse temporär gesperrt oder gedrosselt wird.

### 2. Technische Funktionsweise des automatischen Logins
Da Hyundai und Kia den alten europäischen OAuth-Endpunkt dauerhaft abgeschaltet haben, nutzt der Adapter einen eigenen **OneApp / CCI Token-Manager** (`lib/tokenManager.js`):

1. **Session-Initialisierung:** Startet eine native Mobile-Session auf `idpconnect-eu.kia.com` bzw. `idpconnect-eu.hyundai.com` mit der neuen OneApp-Client-ID, ohne externen Redirects zur alten Web-Oberfläche zu folgen (dadurch werden Browser-Captchas und QR-Code-Abfragen komplett vermieden).
2. **RSA-Passwortverschlüsselung:** Lädt den aktuellen öffentlichen RSA-Schlüssel (`/auth/api/v1/accounts/certs`) vom Server und verschlüsselt das Passwort lokal mittels RSA-PKCS1v1.5.
3. **Headless Sign-In:** Sendet die verschlüsselten Zugangsdaten an `/auth/account/signin` und erhält direkt per HTTP 302 den OAuth-Autorisierungscode (`code=`).
4. **Signierter CCI-Token-Abruf:** Tauscht den Autorisierungscode gegen ein OneApp-CCI-Token-Set (`/auth/v1/token`), signiert mit dem erforderlichen HMAC-SHA256 `X-Fingerprint`.
5. **CCS-Token-Tausch:** Tauscht das CCI-Token über `/auth/v1/token-exchange?serviceType=CCS` gegen ein CCS-Bearer-Token, mit dem sämtliche Telemetrie- und Steuerbefehle auf der Fahrzeug-API ausgeführt werden.
6. **Automatische Token-Erneuerung:** Bei späteren Adapter-Neustarts oder vor Ablauf des Tokens erneuert der Adapter die Sitzung ressourcenschonend über `/auth/v2/token-refresh` und führt nur dann einen neuen Passwort-Login durch, wenn auch das Refresh-Token abgelaufen ist.

### 3. Fehlerbehebung beim Login
- **Neue Nutzungsbedingungen (AGB) in der App bestätigen:** Meldet das Log `Account consent or verification is required`, öffne bitte einmalig die offizielle **Kia App** bzw. **Hyundai Bluelink App** auf deinem Smartphone, melde dich an und bestätige eventuelle neue Nutzungsbedingungen oder Datenschutzhinweise. Starte danach die Adapter-Instanz neu.
- **Temporäre IP-Sperre (`HTTP 403 Forbidden`) oder langsamer Login:** Mehrfache fehlgeschlagene Login-Versuche (insbesondere durch veraltete Adapter-Versionen oder externe Skripte wie `bluelink_refresh_token`) führen dazu, dass die Firewall (WAF) von Kia/Hyundai die öffentliche IP-Adresse deines Internetanschlusses temporär drosselt oder sperrt. Beende externe Skripte, warte 30–60 Minuten (oder verbinde deinen Router neu für eine neue öffentliche IP) und überlasse den Login vollständig dem Adapter.
- **Manuellen Token-Abruf auslösen:** Über den Datenpunkt `bluelink.0.info.fetchToken` (`true`) kannst du jederzeit im laufenden Betrieb eine sofortige Token-Erneuerung anstoßen.

---

## Konfigurationsoptionen

| Einstellung | Beschreibung |
|---|---|
| **Brand (Marke)** | Fahrzeughersteller (`Kia` oder `Hyundai`). |
| **Motor** | Antriebsart: `EV` (Elektro), `PHEV/MHEV` (Hybrid) oder `Diesel/Benzin` (Verbrenner). |
| **max km Range** | Maximale elektrische Reichweite in km (wird nur bei PHEV angezeigt und benötigt). |
| **App Lang** | Sprache für API-Antworten (`DE`, `EN`, `NL`, `IT`, `ES`, `PL`). |
| **Username** | E-Mail-Adresse deines Kia Connect oder Hyundai Bluelink Accounts. |
| **Password** | Account-Passwort (wird von ioBroker verschlüsselt gespeichert). |
| **Pin** | 4-stellige Sicherheits-PIN aus der Smartphone-App (verschlüsselt gespeichert). |
| **Receive Daily drive History** | Ruft die tägliche Fahrthistorie und Verbrauchsdaten ab (nur EV, benötigt ca. 3 API-Abfragen pro Tag). |
| **Stop refresh if 12V battery is under...** | Schützt die 12V-Starterbatterie vor Tiefentladung. |
| **Request max 400** | Anzahl der täglichen Status-Abfragen verteilt auf 24 Stunden (z. B. `100` = ca. alle 14,4 Minuten). Maximal `400`, um das Rate-Limit der Hersteller nicht zu überschreiten. |
| **errorCounter** | Anzahl aufeinanderfolgender Fehler, bevor eine Fehlermeldung geloggt und bis zum nächsten Zyklus pausiert wird. |
| **Resolve the address from coordinates** | Löst die GPS-Koordinaten über OpenStreetMap (Nominatim) in eine lesbare Straßenadresse (`vehicleLocation.position_text`) auf. |

---

## Datenpunkte & Fernsteuerung

### Adapter- & Authentifizierungs-Status (`info.*`)
| Datenpunkt | Rolle / Typ | Beschreibung |
|---|---|---|
| `info.connection` | `indicator.connected` (`boolean`) | `true`, sobald der Adapter erfolgreich angemeldet und mit der Cloud verbunden ist. |
| `info.tokenType` | `text` (`string`) | Aktiver Login-Modus (`cci` für EU OneApp/CCI-Flow, `legacy` für Alt-Tokens). |
| `info.tokenExpiry` | `text` (`string`) | ISO-8601-Zeitstempel des Ablaufs des aktuellen CCS-Access-Tokens. |
| `info.lastTokenRefresh` | `value.time` (`number`) | Zeitstempel (ms) des letzten erfolgreichen Logins bzw. Token-Refreshs. |
| `info.fetchToken` | `button` (`boolean`) | Auf `true` setzen (`ack: false`), um manuell ein neues Token anzufordern. |

### Fahrzeug-Fernsteuerung (`<VIN>.control.*`)
| Datenpunkt | Typ / Rolle | Beschreibung |
|---|---|---|
| `control.lock` | `boolean` (`button`) | Fahrzeug verriegeln. |
| `control.unlock` | `boolean` (`button`) | Fahrzeug entriegeln. |
| `control.charge` | `boolean` (`button`) | Ladevorgang starten. |
| `control.charge_stop` | `boolean` (`button`) | Ladevorgang stoppen. |
| `control.charge_limit_slow` | `number` (`indicator`) | Ziel-Ladelimit (`50`–`100` %) für AC-Laden (Wallbox / Schuko). |
| `control.charge_limit_fast` | `number` (`indicator`) | Ziel-Ladelimit (`50`–`100` %) für DC-Schnellladen (HPC). |
| `control.clima.start` | `boolean` (`button`) | Vorklimatisierung mit den unter `control.clima.set.*` gesetzten Werten starten. |
| `control.clima.stop` | `boolean` (`button`) | Vorklimatisierung stoppen. |
| `control.clima.set.airTemp` | `number` (`indicator`) | Ziel-Innenraumtemperatur in °C (Standard: `18`). |
| `control.clima.set.defrost` | `boolean` (`state`) | Frontscheiben-Defrost bei der Vorklimatisierung aktivieren. |
| `control.clima.set.heating` | `number` (`state`) | Lenkrad- und Heckscheibenheizung aktivieren (`1` = ein, `0` = aus). |
| `control.force_refresh_from_server` | `boolean` (`button`) | Ruft den letzten bekannten Status vom Hyundai/Kia-Server ab (**weckt das Auto nicht auf**). |
| `control.force_refresh_from_car` | `boolean` (`button`) | Weckt das Fahrzeug per Mobilfunk auf und fragt Live-Status + GPS direkt vom Auto ab (**belastet die 12V-Batterie**). |
| `control.force_location` | `boolean` (`button`) | Fragt den aktuellen Live-GPS-Standort direkt vom Fahrzeug ab. |
| `control.force_update` | `boolean` (`state`) | Steuert das reguläre Polling: `false` (Standard) = nur Server-Cache abfragen; `true` = bei jedem Intervall das Auto aufwecken (**nicht empfohlen**). |
| `control.batteryControlState12V` | `number` (`state`) | Mindest-Ladestand der 12V-Batterie in % (Standard: `65`). Fällt `soc-12V` unter diesen Wert, werden aktive Fahrzeug-Wake-ups blockiert, sofern das Auto nicht fährt oder lädt. |

### Fahrzeug-Telemetrie (`<VIN>.*`)
- **`<VIN>.vehicleStatus.battery.*`:**
  - `soc`: Ladestand der Hochvoltbatterie in `%`.
  - `soh`: Gesundheitszustand (State of Health) der Hochvoltbatterie in `%`.
  - `charge`: `true`, während das Fahrzeug lädt.
  - `plugin`: Stecker-Status (`0` = nicht gesteckt, `1` = DC-Schnelllader, `2` = Ladeziegel/ICCB, `3` = AC-Wallbox/Ladesäule).
  - `minutes_to_charged`: Verbleibende Ladedauer in Minuten.
  - `soc-12V`: Ladestand der 12V-Hilfsbatterie in `%`.
- **`<VIN>.vehicleStatus.*`:**
  - `dte` / `evModeRange` / `gasModeRange`: Geschätzte Restreichweite in `km`.
  - `doorLock`, `trunkOpen`, `hoodOpen`, `doorOpen.*`: Verriegelungs- und Öffnungsstatus aller Türen, Kofferraum und Motorhaube.
  - `airCtrlOn`, `airTemp`, `steerWheelHeat`, `sideBackWindowHeat`: Aktueller Status der Klimaanlage und Heizungen.
- **`<VIN>.vehicleLocation.*`:**
  - `lat`, `lon`, `speed`: Aktuelle GPS-Position und Geschwindigkeit.
  - `position_url`: Direkter Google-Maps-Link zum Fahrzeugstandort.
  - `position_text`: Aufgelöste Straßenadresse (sofern OpenStreetMap-Auflösung aktiv ist).
- **`<VIN>.odometer.value`:** Aktueller Gesamtkilometerstand in `km`.
- **`<VIN>.driveHistory.*`:** Tägliche und kumulierte Verbrauchs-, Rekuperations- und Streckenstatistiken (EV).

---

## Community & Links
- [ioBroker Forum-Thread](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo)
- [GitHub Wiki](https://github.com/Newan/ioBroker.bluelink/wiki)

---

## Changelog

### **WORK IN PROGRESS**
* (meistermopper) Automatischer In-Memory-Fallback auf vollständigen CCI-Login ergänzt, falls der Token-Refresh im laufenden Betrieb mit `HTTP 401 (code 9030: jwt-expired / Token expired)` fehlschlägt.
* (meistermopper) Veralteten Bereich „Fallback / Refresh Token“ aus der Admin-UI (jsonConfig) und Dokumentation entfernt, da die OneApp/CCI-Authentifizierung vollständig automatisch erfolgt.
* (meistermopper) Ausführliche deutsche und englische Dokumentation zur automatischen OneApp/CCI-Authentifizierung, Konfiguration und Datenpunkten ergänzt.
* (meistermopper) Admin-UI und i18n-Übersetzungen in allen 11 unterstützten Sprachen modernisiert.
* (meistermopper) Race-Condition beim Adapter-Neustart nach dem Speichern eines neuen CCI-Tokens behoben (verhindert SIGKILL-Timeouts).

### 3.1.36 (2026-11-01)
* (meistermopper) EU-Login repariert: OneApp/CCI-Flow für europäische Fahrzeuge bei Benutzername/Passwort-Eingabe erzwungen (Legacy-Login ist serverseitig abgeschaltet).
* (meistermopper) Robuste CookieJar-Pfad-/Domain-Verwaltung, Redirect-Hop-Nachverfolgung und evcc-kompatibles Node-TLS integriert.
* (meistermopper) Fallback auf zufällige Device-ID ergänzt, falls die veraltete Push-Geräteregistrierung fehlschlägt (hyundai_kia_connect_api #1342).
* (meistermopper) Unterstützung für das Einfügen von evcc-Token-Bundles in das Refresh-Token-Feld hinzugefügt.

### 3.1.35 (2026-10-15)
* (arteck) Fix EU Hyundai/Kia login

### 3.1.34 (2026-09-17)
* (arteck) fix location request

### 3.1.33 (2026-08-22)
* (ipod86) Login-Fix für EU Hyundai/Kia (OneApp/CCI-Flow)

### 3.1.32 (2026-08-20)
* (ipod86) Fix EU Hyundai/Kia login