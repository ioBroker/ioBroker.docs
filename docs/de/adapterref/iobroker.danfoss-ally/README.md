---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.danfoss-ally/README.md
title: kein Titel
hash: hVcdlLVwHoiSco0XdVcLcghYreoDPRMJlT6VJXj++xQ=
---
![Version](https://img.shields.io/badge/version-0.2.15-blue)
![NPM](https://nodei.co/npm/iobroker.danfoss-ally.svg)

Cloud-Adapter für **Danfoss Ally™** – mit **OAuth2 (Client-Anmeldeinformationen)**. Liest Temperatur-, Feuchtigkeits-, Ventilpositions- und Akkudaten aller Geräte in Ihrem Ally-Konto und ermöglicht gezielte Einzelzugriffe ohne erzwungene Modusänderungen oder verkettete Sequenzen.

---

## Merkmale
- Direkte Verbindung zur **Danfoss Ally Cloud API**
- Automatische **OAuth2-Token-Aktualisierung**
- Erkennt alle registrierten Geräte
- Liest alle verfügbaren Sensor- und Steuerungsdaten (Temperatur, Luftfeuchtigkeit, Batteriestand, Ventilstellung usw.).
- Wandelt die rohen Danfoss-Werte (×0,1) in reale Einheiten (**°C**, **%**) um
- Vollautomatische Abfrage mit konfigurierbarem Intervall
- Unterstützt einzelne, isolierte Schreibbefehle von ioBroker in die Cloud

---

## Highlights
- **Einzelne Schreibvorgänge** — jeder Zustand wird unabhängig gesendet (keine automatische Modusumschaltung)
- **Reibungslose Synchronisierungslogik**
- Anti-Race (5s): Überspringe eine Umfrage direkt nach einem lokalen Schreibvorgang.
- Haltezeitfenster (1 Minute): Schützt kürzlich gespeicherte lokale Werte vor dem Überschreiben
- Verzögerungsunterdrückung (15s): Vorübergehend veraltete Cloud-Daten ignorieren
- Soft Refresh (~1,5 s): Nach jedem Schreibvorgang werden nur die betroffenen Zustände neu abgerufen.
- **Stille Protokollierung** – Info-Level für reibungslosen Betrieb, Debug-Level für Diagnosezwecke
- **Automatische Skalierung** – Temperaturen/Luftfeuchtigkeit werden automatisch in °C / % umgerechnet

> **Hinweis:** Cloud-Updates aus der Danfoss Ally App werden in ioBroker möglicherweise mit einer kurzen Verzögerung (1–2 Minuten) angezeigt.

---

## Unterstützte Geräte
- Danfoss Icon2 RT (Raumthermostate)
- Danfoss Icon2 Controller
- Danfoss Ally™ Gateway

(Weitere Danfoss-Geräte wurden automatisch erkannt)

---

## Konfiguration
Gehen Sie zu **Instanzen → danfoss-ally → Einstellungen**

| Feld | Beschreibung |
| -------------------- | ------------------------------------------------------------------- |
| **API-Schlüssel / Geheimnis** | Ihre Anmeldedaten für die Danfoss-Entwickler-App |
| **Token-URL** | OAuth2-Token-Endpunkt (z. B. `https://api.danfoss.com/oauth2/token`) |
| **Bereich** | Optionaler OAuth2-Bereich (z. B. `read write`) |
| **Abfrageintervall** | Standardwert `300s` |
| **Abfrageintervall** | Standardwert `300s` |

Kürzere Aktualisierungsintervalle führen zwar zu schnelleren Aktualisierungen, erzeugen aber mehr API-Traffic. 30–60 Sekunden stellen einen guten Kompromiss dar.

```bash
API Key:      your-client-id
API Secret:   your-client-secret
Token URL:    https://api.danfoss.com/oauth2/token
API Base URL: https://api.danfoss.com/ally
Polling:      300
```

---

## Staaten
Jedes erkannte Gerät erzeugt einen Gerätebaum: `danfoss-ally.0.<device_id>.*`

## Status- vs. Kontrollzustände
Der Adapter trennt **schreibgeschützte Statuswerte** von **beschreibbaren Steuerungswerten**.

### Statuskanal
`danfoss-ally.0.<deviceId>.status.*`

Diese Zustände spiegeln Werte wider, die von der Danfoss Cloud API empfangen werden.

Eigenschaften:

- gelesen: wahr
- schreiben: falsch

Schreiben Sie **nicht** aus Skripten in diese Staaten.

Beispiele:

- `status.temp_current`
- `status.temp_set`
- `status.mode`
- `status.humidity_value`
- `status.battery_percentage`

### Steuerkanal
`danfoss-ally.0.<deviceId>.control.*`

Diese Zustände sind für die **Benutzerinteraktion** vorgesehen und können über Skripte oder Blockly geschrieben werden.

Eigenschaften:

- gelesen: wahr
- schreiben: wahr

Beispiele:

- `control.temp_set`
- `control.manual_mode_fast`
- `control.mode`
- `control.child_lock`

Der Adapter sendet automatisch Befehle an die Danfoss Cloud und aktualisiert die entsprechenden Statuswerte.

### Lesebeispiele
| Bundesland | Beschreibung | Einheit |
| -------------------------------------- | --------------------------------------------- | ---- |
| `status.temp_current` | Aktuelle Temperatur | °C |
| `status.battery_percentage` | Akkustand | % |
| `status.mode` | Aktueller Modus (`auto`, `manual`, `at_home`, …) | – |
| `status.work_state`, `status.output_status`, `status.fault` | Status oder Fehler | – |
| `status.upper_temp` / `status.lower_temp` | Temperaturgrenzen | °C |
| `status.upper_temp` / `status.lower_temp` | Temperaturgrenzen | °C |

Alle numerischen Werte werden automatisch von ×0,1 → °C/ %s kaliert.

---

## Schreiben (Einzelbefehle)
Der Adapter unterstützt **präzise Einzelschreibvorgänge** in jeden steuerbaren Zustand ohne Verkettung oder automatische Moduswechsel.

Dadurch haben Sie die volle Kontrolle in Blockly, JavaScript oder benutzerdefinierten Logikskripten.

| Schreibbarer Zustand | Erwarteter Wert / Verhalten |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `control.temp_set` | Zieltemperatur (°C, 0,5 Schritte; gesendet ×10) |
| `control.at_home_setting`, `control.leaving_home_setting`, `control.pause_setting`, `control.holiday_setting` | Voreingestellte Temperaturen |
| `control.mode` | `manual`, `at_home`, `leaving_home`, `pause`, `holiday`, `auto` |
| `control.child_lock` | `true` / `false` |
| `control.SetpointChangeSource` | `Externally` oder `schedule` |
| `control.SetpointChangeSource` | `Extern` oder `schedule` |

Der Adapter wechselt beim Schreiben von Sollwerten **nicht** automatisch den Modus – Sie entscheiden in Ihrer Logik.

---

## Beispiel (Blockly / Skript)
```js
// Manual mode
setState("danfoss-ally.0.<id>.control.mode", "manual");
setState("danfoss-ally.0.<id>.control.temp_set", 21.5);

// At home
setState("danfoss-ally.0.<id>.control.mode", "at_home");
setState("danfoss-ally.0.<id>.control.at_home_setting", 21.0);

// Leaving home
setState("danfoss-ally.0.<id>.control.mode", "leaving_home");
setState("danfoss-ally.0.<id>.control.leaving_home_setting", 19.0);

// Pause
setState("danfoss-ally.0.<id>.control.mode", "pause");
setState("danfoss-ally.0.<id>.control.pause_setting", 5.0);

// Holiday
setState("danfoss-ally.0.<id>.control.mode", "holiday");
setState("danfoss-ally.0.<id>.control.holiday_setting", 10.0);

// Child lock
setState("danfoss-ally.0.<id>.control.child_lock", true);

// Explicit source (usually not needed)
setState("danfoss-ally.0.<id>.control.SetpointChangeSource", "Externally"); // or 'schedule'
```

Schreibbefehle müssen auf die Zustände `control.*` abzielen.

Die Zustände `status.*` sind schreibgeschützte Spiegelungen der Danfoss Cloud.

---

## Synchronisationslogik
| Mechanismus | Dauer | Zweck |
| ---------------- | -------- | --------------------------------------- |
| **Anti-Rassismus** | 5 Sekunden | Nach jedem lokalen Beitrag eine Umfrage überspringen |
| **Halten** | 1 Min. | Verhindert das Überschreiben lokaler Schreibvorgänge durch die Cloud |
| **Lag-Unterdrückung** | 15s | Veraltete Cloud-Daten ignorieren |
| **Soft Refresh** | ~1,5s | Nur betroffene Zustände neu laden |

Diese Mechanismen gewährleisten eine reibungslose Synchronisierung zwischen ioBroker und der Danfoss Cloud ohne Flackern oder Wertschleifen.

---

## Protokollierung
Der Adapter liefert detaillierte **Debug-Informationen** für Diagnosezwecke, bleibt aber im Normalbetrieb geräuschlos.

- `ack=true`-Aktualisierungen werden nur im **Debug-Modus** angezeigt.
- `HOLD`, `MATCH`, `SUPPRESS` → Debug-Level, harmlose Diagnosefunktionen
- API-Fehler (`HTTP 400/401`) wurden automatisch wiederholt (protokolliert im Debug-Modus)
- Bereinigter Informationsstand nach jeder Umfrage:

**Beispiel für eine Umfragezusammenfassung**

```
✅ Updated 13 devices. Changed=2, Skipped=253, Held=1
📡 Found devices, updating states...
⏸️ Skipping poll (anti-race 5000ms)
```

## Beispiel für eine Log-Ausgabe
```
🔄 Starting Danfoss Ally adapter...
🔑 Refreshing OAuth2 token...
✅ Token acquired. Expires in ~3599 s
📡 Found 13 devices, updating states...
✅ Updated 13 devices from Danfoss Ally Cloud.
⏱ Polling interval set to 300 s
```

## Token-Verarbeitung
- Verwendet den **OAuth2-Client-Credentials-Flow**
- Automatische Token-Anforderung beim Start, Aktualisierung vor Ablauf
- Bei `401 Unauthorized`: Aktualisieren und einmal wiederholen
- Tokens werden **im Speicher** gehalten, niemals gespeichert
- Optionale Unterstützung für `scope` / `audience`
Alle Token-Ereignisse sind im Debug-Protokoll sichtbar.

---

## API-Endpunkte
Der Adapter kommuniziert mit der Danfoss Ally Cloud API (Basis-URL konfigurierbar).

| Methode | Endpunkt | Zweck |
| ------ | ------------------------ | --------------------------- |
| `POST` | `/oauth2/token` | Zugriffstoken anfordern |
| `GET` | `/devices/{id}/status` | Gerätetelemetrie lesen |
| `GET` | `/devices/{id}` | Fallback bei fehlendem Status |
| `POST` | `/devices/{id}/commands` | Einzelnen Schreibbefehl senden |
| `POST` | `/devices/{id}/commands` | Einzelnen Schreibbefehl senden |

**Überschriften:** `Authorization: Bearer <token>` `Content-Type: application/json` Optional: `X-App-Key`, `X-Tenant-Id`, etc.

**Fehlerbehandlung:**

- **400:** Ungültiger Header/Wert → protokolliert
- **401:** Token-Aktualisierung + erneuter Versuch
- **5xx:** Nächste Umfrage erneut versucht
- Die Temperaturwerte werden automatisch skaliert ×10 angezeigt (z. B. 21,5 → 215)

---

## Umfrage
- Standardwert: **300s** (konfigurierbar)
- Aktualisiert nur geänderte Werte
- Beinhaltet die gesamte oben genannte Anti-Race-/Hold-/Lag-/Soft-Refresh-Logik.
- Eine Infozusammenfassung nach jeder Umfrage zeigt die geänderten, übersprungenen und unveränderten Zustände an.

---

## Schreibt
- Ein Befehl pro Zustand (keine Modusverkettung)
- Modus + Temperatur müssen separat angegeben werden
Die Werte sind auf zulässige Grenzwerte begrenzt und mit ×10 skaliert.
- `child_lock`: versucht `0/1`, wiederholt `true/false` bei Fehler 400
- `SetpointChangeSource`: optional; standardmäßig auf `"Extern"` gesetzt, wenn manuelle Modi aktiv sind

Alle Sende-, Wiederholungs- und Bestätigungsprotokolle werden auf Debug-Ebene angezeigt.

---

## Entwicklung
```bash
npm i
node main.js
```

oder über die ioBroker-Entwicklungstools installieren.

---

## Changelog


### 0.2.15
- Fixed invalid `io-package.json` (JSON syntax error)
- No functional changes

### 0.2.14
- Introduced `control` channel for writable states
- `status` channel is now strictly read-only
- Improved write detection and state handling
- Prevented writes to channels or non-state objects
- Improved adapter stability

### 0.2.13
- Updated CI & deploy workflow
- Fixed npm publishing process
- Improved code formatting (Prettier / ESLint)
- No functional changes for end users


---

## License

MIT License

Copyright (c) 2025-2026 Author Stefan8485@me.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.