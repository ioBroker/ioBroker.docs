---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.parcelapp/README.md
title: ioBroker.parcelapp
hash: HMJiV39ELYn9BaDqr4iqCvqkfdmvJWle3gxBYIeasv0=
---
# IoBroker.parcelapp

![npm-Version](https://img.shields.io/npm/v/iobroker.parcelapp)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.parcelapp)
![Installationen](https://iobroker.live/badges/parcelapp-installed.svg)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

<img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="100" />

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

## Anforderungen
- **Node.js >= 22**
- **ioBroker js-controller >= 7.0.7**
- **ioBroker Admin >= 7.8.23**
- **parcel.app Premium-Abonnement** – erforderlich für den API-Zugriff

---

## Konfiguration
| Option | Beschreibung | Standard |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| **API-Schlüssel** | Ihr parcel.app-API-Schlüssel (erhältlich unter [web.parcelapp.net](https://web.parcelapp.net)) | — |
| **Abfrageintervall** | Wie oft Aktualisierungen abgerufen werden sollen (Minuten) | 10 |
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
        ├── statusCode           — Status code (0-8)
        ├── description          — Package description
        ├── trackingNumber       — Tracking number
        ├── extraInfo            — Extra information (postal code, email)
        ├── deliveryWindow       — Expected delivery time window
        ├── deliveryEstimate     — Human-readable estimate (today, tomorrow)
        ├── lastEvent            — Latest tracking event
        ├── lastLocation         — Last known location
        └── lastUpdated          — Last update timestamp
```

---

## Lieferungen per Skript hinzufügen
Sie können neue Lieferungen über JavaScript-/Blockly-Skripte hinzufügen:

```javascript
sendTo("parcelapp.0", "addDelivery", {
  tracking_number: "1234567890",
  carrier_code: "dhl",
  description: "My package",
});
```

Die Lieferung wird Ihrem parcel.app-Konto hinzugefügt und erscheint nach einer automatischen Abfrage sofort in ioBroker.

**Anmerkungen:**

- **POST-Ratenlimit: 20 Zustellungen pro Tag** — Fehlgeschlagene Versuche (z. B. falscher `carrier_code`) werden ebenfalls auf dieses Limit angerechnet.
Frische Lieferungen werden in der Regel **45–90 Minuten** nach dem Hinzufügen nicht im Tracking angezeigt. Dies ist eine Verzögerung seitens der Paket-App und kein Problem des Adapters.
**Das Löschen von Paketen ist nur über die Parcel.app-App/Weboberfläche möglich.** Die API bietet keinen Lösch-Endpunkt. Selbst wenn `autoRemoveDelivered` aktiviert ist, entfernt der Adapter zugestellte Pakete weiterhin automatisch aus den ioBroker-Status.

---

## Fehlerbehebung
### Verbindungstest fehlgeschlagen
- Überprüfen Sie Ihren API-Schlüssel unter [web.parcelapp.net](https://web.parcelapp.net)
- Stellen Sie sicher, dass Sie über ein aktives Premium-Abonnement verfügen.
- Prüfen Sie, ob Ihre ioBroker-Instanz über Internetzugang verfügt.

### Keine Lieferungen angezeigt
Die API liefert zwischengespeicherte Daten – es kann einige Minuten dauern, bis neue Lieferungen angezeigt werden.
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
### 0.4.4 (2026-05-13)
- Adapter shuts down cleanly even if the "Test Connection" button was still running — the test request is now aborted at unload along with regular polling.

### 0.4.3 (2026-05-13)
- Debug log now traces previously silent paths: HTTPS request lifecycle, carrier-list fetch outcome, per-delivery updates, admin-message handling and lifecycle anchors. Default log unchanged.

### 0.4.2 (2026-05-10)

- Adapter shuts down cleanly even if parcel.app is slow — pending requests are aborted instead of hanging until kill.
- "Forbidden" responses (e.g. when the Premium subscription is no longer active) now log a clear hint pointing to your parcel.app account, instead of looping reauth as if the API key were just wrong.
- Two parcels whose tracking numbers differ only in special characters no longer overwrite each other in the state tree — the second one gets a hash suffix.
- Defensive: bogus poll-interval values can no longer turn into a tight loop hammering the API; rate-limit cooldowns can no longer get stuck near zero.

### 0.4.1 (2026-05-09)

- Adapter log messages are now English only, in line with the ioBroker community standard. Localized state names (11 languages) are unchanged.

### 0.4.0 (2026-05-06)

- State names now follow your ioBroker system language (11 languages).
- Minimum requirements: Node.js 22 and ioBroker Admin 7.8.23.

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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

*Developed with assistance from Claude.ai*