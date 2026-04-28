---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.aurora-nowcast/README.md
title: ioBroker.aurora-nowcast
hash: PscidRWIBAikwBat+ojYqF9Ab91H0IaiMIV+qsgz9jU=
---
# IoBroker.aurora-nowcast
![Logo](../../../en/adapterref/iobroker.aurora-nowcast/admin/aurora-nowcast.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.aurora-nowcast.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.aurora-nowcast.svg)
![Anzahl der Installationen](https://iobroker.live/badges/aurora-nowcast-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/aurora-nowcast-stable.svg)
![NPM](https://nodei.co/npm/iobroker.aurora-nowcast.png?downloads=true)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)

**Tests:** ![Test und Freigabe](https://github.com/chrmenne/ioBroker.aurora-nowcast/actions/workflows/test-and-release.yml/badge.svg)

---

## Aurora Nowcast-Adapter für ioBroker
Liefert **aktuelle (Nowcast-)Daten** zur Aurora-Aktivität (Nord- und Südlichter) für einen bestimmten Ort, basierend auf öffentlich verfügbaren Daten des NOAA Space Weather Prediction Center (SWPC).

Hinweis: Dieser Adapter liefert aktuelle Daten bzw. Kurzfristprognosen auf Basis von Echtzeitmessungen und Modellausgaben.

Langfristprognosen werden **nicht** bereitgestellt.

---

## Merkmale
- Ruft Echtzeitdaten zur Aurora-Aktivität (NOAA OVATION-Modell) für die Nord- und Südhalbkugel ab.
- Berechnet die lokale Wahrscheinlichkeit der Aurora-Sichtbarkeit für einen konfigurierten Standort
- Stellt ioBroker-Status für Automatisierung, Visualisierung und Benachrichtigungen bereit
- Optionale Verwendung des Systemstandorts oder manuelle Eingabe von Längen- und Breitengraden
- Geeignet für Dashboards, Benachrichtigungen und Smart-Home-Szenarien

---

## Konfiguration
Sie haben entweder:

- Verwenden Sie den in ioBroker konfigurierten Systemstandort, oder
- Manuelle Koordinaten angeben (Breitengrad/Längengrad in Dezimalgrad)

Manuelle Koordinaten sind erforderlich, wenn die Systemortung deaktiviert ist.

Beispiele:

| Standort | Breitengrad | Längengrad |
|-----------------|----------|-----------|
| Berlin | 52,5 | 13,4 |
| Buenos Aires | -34,6 | -58,4 |
| Reykjavik | 64,1 | -21,9 |

Die Werte in Nord-Ost-Richtung sind positiv, die Werte in Süd-West-Richtung negativ.

---

## Staaten
Der Adapter erzeugt die folgenden Zustände:

| Bundesland | Typ | Beschreibung |
|---------------------|---------|------------------------------------------------------------------------------------|
| `probability` | Zahl | Geschätzte Wahrscheinlichkeit der Aurora-Sichtbarkeit am konfigurierten Standort (%) |
| `forecast_time` | Nummer | Zeitpunkt, für den die geomagnetische Antwort der Erde berechnet wird (UTC, ms) |
| `forecast_time` | Zahl | Zeitpunkt, für den die geomagnetische Antwort auf der Erde berechnet wird (UTC, ms) |

Diese Zustände können verwendet werden für:

- Benachrichtigungen (z. B. Push-Nachrichten)
- Dashboard-Visualisierungen
- Automatisierungsregeln (z. B. Kamera aktivieren, wenn hohe Aktivität)

---

## Datenquelle
Dieser Adapter verwendet öffentlich verfügbare Daten, die von Folgendem bereitgestellt werden:

- NOAA Weltraumwettervorhersagezentrum (SWPC)

<https://www.swpc.noaa.gov/>

Insbesondere werden das OVATION-Aurora-Nowcast-Modell und zugehörige geomagnetische Echtzeitindizes verwendet, um die Aurora-Aktivität für den konfigurierten Standort abzuschätzen.

---

## Haftungsausschluss
NOAA und SWPC stehen in keiner Verbindung zu diesem Projekt.

Die von diesem Adapter verwendeten Daten werden von der NOAA zur öffentlichen Nutzung bereitgestellt.
Es wird keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Informationen übernommen.

Die Sichtbarkeit von Polarlichtern hängt von zahlreichen externen Faktoren ab (z. B. Wolkenbedeckung, Lichtverschmutzung, IMF-Orientierung), die außerhalb des Anwendungsbereichs dieses Adapters liegen.

---

## ❤️ Unterstützung
Wenn Sie **ioBroker.aurora-nowcast** nützlich finden und die Weiterentwicklung unterstützen möchten, können Sie mir einen Kaffee spendieren ☕🙂

Vielen Dank für Ihre Unterstützung!

---

## Changelog
### 2.2.2 (2026-04-17)

- re-added git-type URL because of npm linter

### 2.2.1 (2026-04-17)

- more checks
- fixed Readme link to a more stable direct link instead of an anchor
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/24>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/27>)

### 2.2.0 (2026-03-30)

- fixed review findings (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/21>)

### 2.1.4 (2026-03-11)

- disabled Sentry in GitHub workflow

### 2.1.3 (2026-03-11)

- fixed iobroker-Bot warnings: <https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/18>
- slightly retouched the icon

### 2.1.2 (2026-03-09)

- fixed overlooked linter error regarding whitespace

### 2.1.1 (2026-03-09)

- fixed a bug concerning the coordinates validation

### 2.1.0 (2026-03-02)

- added internationalization (i18n)
- further smaller adjustments to meet ioBroker standards

### 2.0.2 (2026-02-27)

- fixed icon size to 512x512 (or less) for ioBroker release

### 2.0.1 (2026-02-27)

- necessary adjustments for ioBroker official release

### 2.0.0 (2026-02-27)

- Renamed adapter. Minor housekeeping.

### 1.0.0 (2026-02-26)

- First stable release

---

## License

GNU General Public License v3.0

Copyright (c) 2026 Christian Menne

See LICENSE file for full license text.