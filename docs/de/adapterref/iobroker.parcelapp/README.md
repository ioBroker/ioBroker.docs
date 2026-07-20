---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.parcelapp/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="48" align="top" /> ioBroker.parcelapp
hash: CzzU2EVq7OkXREMnw8rabS8u8RiGKuEC+cHoym2mXxE=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="48" align="top" /> ioBroker.parcelapp

![npm-Version](https://img.shields.io/npm/v/iobroker.parcelapp)
![stabil](https://iobroker.live/badges/parcelapp-stable.svg)
![Installationen](https://iobroker.live/badges/parcelapp-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.parcelapp)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Posten](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

ioBroker-Adapter für die [parcel.app](https://parcelapp.net)-API. Unterstützt alle von parcel.app erfassten Versanddienstleister.

---

## Merkmale
- **Alle Paketdienste von parcel.app** – DHL, FedEx, UPS, Amazon, Hermes, GLS, DPD und alle anderen von parcel.app unterstützten Anbieter.
- **ioBroker-Informationen pro Paket:** — Spediteur, Status, Sendungsnummer, Lieferzeitfenster, letztes Ereignis, letzter Standort
- **Zusammenfassende Angaben** – Anzahl aktiver Nutzer, Anzahl heute, kombiniertes Lieferfenster
- **Voraussichtliche Lieferzeiten** — heute, morgen, in X Tagen mit kombiniertem Zeitfenster
- **Konfigurierbares Abfrageintervall** (5–60 Minuten)
- **Konfigurierbare Bereinigung** – Zugestellte Pakete automatisch entfernen oder bis zur endgültigen Löschung in parcel.app aufbewahren.
- **Lieferungen hinzufügen** über sendTo-Nachrichten aus Skripten oder anderen Adaptern
- **Admin-Benutzeroberfläche** mit Verbindungstest- und Abfrageeinstellungen

---

## Wächter / Fehlerberichterstattung
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Die Meldung erfolgt nur, wenn Sie die Fehlerberichterstattung in den ioBroker-Diagnoseeinstellungen aktiviert haben (Systemeinstellungen → Diagnose und Fehlerberichterstattung). Es wird lediglich eine anonyme Installations-ID übermittelt – kein Name, keine E-Mail-Adresse und keine IP-Adresse.

Einzelheiten und Hinweise zur Deaktivierung finden Sie in Abschnitt [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Für die Fehlerberichterstattung ist js-controller 3.0 oder neuer erforderlich.

---

## Anforderungen
- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 7.8.23**
- **parcel.app Premium-Abonnement** – erforderlich für den API-Zugriff

---

## Konfiguration
| Option | Beschreibung | Standard |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| **API-Schlüssel** | Ihr parcel.app-API-Schlüssel (erhältlich unter [web.parcelapp.net](https://web.parcelapp.net)) | — |
| **Abfrageintervall** | Wie oft Aktualisierungen abgerufen werden sollen (Minuten). parcel.app stellt die Liste aus einem Server-Cache mit einer Laufzeit von ca. 45–90 Minuten bereit. Kürzere Intervalle reduzieren daher meist die Verzögerung, bis eine Aktualisierung erkannt wird. | 10 |
| **Automatisch zugestellte Pakete entfernen** | Zugestellte Pakete werden automatisch aus bestimmten Bundesstaaten entfernt. Wenn diese Option deaktiviert ist, bleiben sie erhalten, bis sie in parcel.app gelöscht werden. | Ja |

Statusbezeichnungen (`Delivered`, `In Transit`, …) und Lieferprognosen (`today`, `tomorrow`, `in X days`) werden in der ioBroker-Systemsprache dargestellt.

---

## Staatsbaum
```
parcelapp.0.
├── info.connection              — Connection status (bool)
├── summary.
│   ├── activeCount              — Number of active deliveries
│   ├── todayCount               — Number of deliveries expected today
│   └── deliveryWindow           — Combined delivery window for today
└── deliveries.
    └── {packageId}.             — One device per package
        ├── carrier              — Carrier name (e.g. DHL Express)
        ├── status               — Status text (e.g. In Transit)
        ├── statusCode           — Status code (0-8, -1 = unknown)
        ├── description          — Package description
        ├── trackingNumber       — Tracking number
        ├── extraInfo            — Extra information (postal code, email)
        ├── deliveryWindow       — Expected delivery time window
        ├── deliveryEstimate     — Human-readable estimate (today, tomorrow)
        ├── lastEvent            — Latest tracking event
        ├── lastLocation         — Last known location
        └── lastUpdated          — Timestamp of the last tracking-data change
```

**Statuscodes** (`statusCode` — der primäre Datenpunkt für Automatisierungen):

| Code | Bedeutung | Code | Bedeutung |
| ---- | --------------- | ---- | ----------------------- |
| 0 | Zugestellt | 5 | Nicht gefunden |
| 1 | Eingefroren | 6 | Zustellversuch fehlgeschlagen |
| 2 | Im Transit | 7 | Ausnahme |
| 3 | Abholung erwartet | 8 | Informationen erhalten |
| 4 | Unterwegs zur Auslieferung | -1 | Unbekannt (unerwarteter API-Wert – Paket bleibt sichtbar) |

---

## Lieferungen per Skript hinzufügen
Sie können neue Lieferungen über JavaScript-/Blockly-Skripte hinzufügen:

```javascript
sendTo("parcelapp.0", "addDelivery", {
  tracking_number: "1234567890",
  carrier_code: "dhl",
  description: "My package",
  // optional:
  language: "de", // tracking language as an ISO 639-1 code, default "en"
  send_push_confirmation: true, // send a push once the delivery is added, default false
});
```

`tracking_number`, `carrier_code` und `description` sind Pflichtfelder; `language` und `send_push_confirmation` sind optional. Die Lieferung wird Ihrem parcel.app-Konto hinzugefügt und es folgt umgehend eine Umfrage (maximal eine pro Minute) – allerdings verfügen neu hinzugefügte Lieferungen in der Regel noch über keine Sendungsverfolgungsdaten (siehe Hinweis unten).

**Anmerkungen:**

- **POST-Ratenlimit: 20 Zustellungen pro Tag** — Fehlgeschlagene Versuche (z. B. falscher `carrier_code`) werden ebenfalls auf dieses Limit angerechnet.
- **Jedes Feld darf maximal 512 Zeichen lang sein**, und der Adapter akzeptiert maximal **20 addDelivery-Aufrufe pro Minute**. Bei Überschreitung einer dieser Grenzen gibt der Aufruf `success: false` mit einer erläuternden `error_message` zurück, anstatt parcel.app zu erreichen.
Frische Lieferungen werden in der Regel **45–90 Minuten** nach dem Hinzufügen nicht im Tracking angezeigt. Dies ist eine Verzögerung seitens der Paket-App und kein Problem des Adapters.
**Das Löschen von Paketen ist nur über die Parcel.app-App/Weboberfläche möglich.** Die API bietet keinen Lösch-Endpunkt. Selbst wenn `autoRemoveDelivered` aktiviert ist, entfernt der Adapter zugestellte Pakete weiterhin automatisch aus den ioBroker-Status.

---

## Fehlerbehebung
### Verbindungstest fehlgeschlagen
- Überprüfen Sie Ihren API-Schlüssel unter [web.parcelapp.net](https://web.parcelapp.net)
- Stellen Sie sicher, dass Sie über ein aktives Premium-Abonnement verfügen.
- Prüfen Sie, ob Ihre ioBroker-Instanz über Internetzugang verfügt.

### Keine Lieferungen angezeigt
- Die API liefert zwischengespeicherte Daten – neue Lieferungen und aktuelle Sendungsverfolgungsereignisse können **45–90 Minuten** dauern, bis sie angezeigt werden (Cache der Parcel-App).
- Prüfen Sie, ob Sie in der Paket-App aktive Lieferungen haben.

### Ratenbegrenzung
- GET (Abfrage): **20 Anfragen pro Stunde** – das minimale Abfrageintervall beträgt 5 Minuten, um dieses Limit einzuhalten.
- POST (Hinzufügen von Lieferungen): **20 Anfragen pro Tag**, Fehlversuche zählen ebenfalls.

---

## Unterstützung
- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub-Probleme](https://github.com/krobipd/ioBroker.parcelapp/issues)

### Unterstützung der Entwicklungsabteilung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-07-08)

- Fixed: the admin "Test Connection" button now reports real failures — before, it always showed "Ok" even with a wrong API key.
- Fixed: a package's last-updated timestamp no longer jumps to the restart time after an adapter restart — it only changes when tracking data actually changed.
- Fixed: a stalled API response can no longer freeze polling until a manual restart — every request now has a hard 60-second deadline.
- Fixed: a failed adapter start now triggers an automatic restart instead of leaving the adapter idle until restarted by hand.
- Changed: recurring errors such as a wrong API key are logged once instead of every poll cycle, and stopping the adapter no longer leaves a red error line in the log.
- Changed: short ioBroker database hiccups no longer flip the connection indicator — it now reflects only the parcel.app connection.
- Changed: the fallback package name ("Package …") is localized like all other texts, and the adapter is listed under a fitting admin category (misc-data).
- Changed: the automatic poll after adding a delivery now respects the one-minute pacing, so bulk-adds can no longer exhaust the hourly API budget.

### 0.9.0 (2026-06-23) — stable

- Fixed: tracked packages could disappear from the object tree after a temporary update error or an unexpected API response — a package is now kept until parcel.app actually stops returning it.
- Changed: multi-day delivery windows now show the date on each side (e.g. `12-06 14:30 - 12-08 18:30`) instead of looking same-day; out-of-range or reversed dates no longer produce a misleading window.

### 0.8.0 (2026-06-19)

- The delivery window is now also shown for carriers that report it only as a date/time range, not just when the API provides a Unix timestamp.
- When adding a delivery via script, you can now set an optional tracking language and request a push confirmation.

### 0.7.2 (2026-06-12) — stable

- Much quieter state updates: a package's last-updated timestamp now only changes when its tracking data actually changed, and device entries are no longer rewritten on every poll
- Adding a delivery with a malformed request now returns a clear error message instead of failing cryptically

### 0.7.1 (2026-06-09)

- Fixed a timezone edge case in delivery estimates: when the API reports only a calendar date, the estimate could be off by a day in time zones west of UTC — now stable everywhere.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_