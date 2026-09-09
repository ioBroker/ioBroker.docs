---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tractive-next/README.md
title: ioBroker.tractive-next
hash: sHfsj6IJcgHy7gX29U25C8Xpzv2WCrYWgFmIHKRXOHI=
---
# ioBroker.tractive-next

Inoffizieller Tractive GPS-Adapter für ioBroker.

## Merkmale

- Tractive-Kontoanmeldung mit automatischer Token-Erneuerung
- Ein automatischer Wiederholungsversuch nach HTTP 401 oder 403
- Tracker-Liste / Details / Hardware / Position
- Aktivitäts- und Gesundheitsübersicht (`…health.*`)
- 24-Stunden-Positionsverlauf (`…history.*`)
- Alarmzustände für die Automatisierung (`…alerts.*`)
- Geofence-JSON plus strukturierte Geofence-Zustände (`…geofences.*`)
- Optionale Befehle für Live-Tracking, LED und Summer (`…controls.*`, gesichert durch `enableCommands`)
- Geofence-Payload als JSON, wenn die API dies bereitstellt
- Link zu OpenStreetMap und Registerkarte „Kartenübersicht“ für Administratoren mit Live-Tracking-/LED-/Summer-Tasten
- Admin-Tagesablauf: Pfad, Heatmap-Umschaltung, Bereichsregler (von–bis) und Wiedergabe
- Optionales Vis-2 Materialübersichtsprojekt (`docs/vis-2/`)
- Automatische Erstellung von ioBroker-Objekten und Datentyperkennung
- Verschlüsseltes Passwort, ESLint, Paket-/Unit-Tests, GitHub Actions CI

## Wichtig

Website des Herstellers: <https://tractive.com/>

Tractive stellt keine dokumentierte öffentliche Client-API für diese Tracker bereit. Dieser Adapter verwendet den inoffiziellen Endpunkt, der auch von bestehenden Open-Source-Integrationen genutzt wird. Tractive kann diesen jederzeit ändern.

## Installation

Installieren und aktualisieren Sie den Adapter über die **ioBroker-Administrator** Die Adapterliste wird veröffentlicht, sobald sie auf der offiziellen Website verfügbar ist. **Letzte** Repository.

Nach dem Hinzufügen einer Instanz öffnen Sie die Konfiguration und geben die Tractive-E-Mail-Adresse und das Passwort ein. Speichern Sie das Passwort nach der ersten Einrichtung (und nach Änderungen der Passwortverschlüsselung) einmalig, damit es verschlüsselt gespeichert wird.

## Konfiguration

Um Live-Tracking-/LED-/Summer-Befehle zu senden, aktivieren Sie diese Option. **Tracker-Befehle aktivieren** in den Instanzeinstellungen. Die beschreibbaren Zustände befinden sich unter jedem Tracker bei `…controls.liveTrackingActive`, `…controls.ledActive` Und `…controls.buzzerActive`.

Befehle werden über die Tractive Cloud-API ausgeführt. Innerhalb eines **Energiesparmodus / Heimzone** Die Cloud akzeptiert die Anfrage oft als `pending` Die LED, der Summer und die Live-Tracking-Funktion des Geräts werden dadurch jedoch nicht aktiviert (die offizielle App kann Bluetooth Radar weiterhin lokal nutzen). Außerhalb dieser Zone funktionieren die Befehle; der Adapter hält einen optimistischen Steuerungswert aufrecht, während die API meldet `pending`, sodass die Benutzeroberfläche nicht zurückspringt zu `false` bevor Sie die Funktion wieder deaktivieren können.

## Entwicklung

Anmerkungen der Mitwirkenden und Checkliste für die Veröffentlichung: [`docs/PUBLISHING.md`](docs/PUBLISHING.md).

Auf einem Entwicklungsrechner können Sie einen lokalen Klon synchronisieren mit `UPDATE_ON_PI.sh` (Nur für Wartungspersonal, nicht für die Installation durch Endbenutzer).

## Changelog

### 0.5.5
* (Fraese73) Add alert states per tracker (`alerts.trackerOffline`, `alerts.lowBattery`, `alerts.noRecentPosition`, `alerts.minutesSinceLastSeen`)
* (Fraese73) Add structured geofence states per tracker (`geofences.<id>.id|name|active|enteredAt|leftAt`, plus `count`/`idsJson`)

### 0.5.4
* (Fraese73) Latest review fixes: English admin tab UI, valid state roles (`text` / `value.battery`), poll interval upper bound, full jsonConfig translations
* (Fraese73) Admin day track: from–to range slider to limit visible track points

### 0.5.3
* (Fraese73) Fix day-track / history parser for nested `json_segments` (`[[points]]`)

### 0.5.2
* (Fraese73) E6013/W6018: README install via Admin only; remove root CHANGELOG.md (changelog in README)

### 0.5.1
* (Fraese73) Repository checker fixes: news only for published npm versions

### 0.5.0
* (Fraese73) Admin day track with heatmap toggle and time-slider playback; history.distanceKm

### 0.4.0
* (Fraese73) Optional live-tracking / LED / buzzer commands with enableCommands safety switch
* (Fraese73) Fixed overview.charging for NOT_CHARGING string values
* (Fraese73) Optimistic pending control state, admin control buttons, Vis-2 overview (shipped in 0.5.0)

### 0.3.0
* (Fraese73) Activity/health overview, 24h history, live-tracking status, geofence JSON (read-only)

### 0.2.11
* (Fraese73) Stabilization: null type hints, tolerant API sections, unit tests, redacted logs

### 0.2.10
* (Fraese73) Trusted Publishing release with provenance; news limited to npm versions

Older entries: [`docs/CHANGELOG_OLD.md`](docs/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Fraese73

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