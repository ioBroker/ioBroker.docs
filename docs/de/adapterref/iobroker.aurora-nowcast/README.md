# ioBroker.aurora-nowcast

![Logo](admin/aurora-nowcast.png)

[![NPM-Version](https://img.shields.io/npm/v/iobroker.aurora-nowcast.svg)](https://www.npmjs.com/package/iobroker.aurora-nowcast)
[![Downloads](https://img.shields.io/npm/dm/iobroker.aurora-nowcast.svg)](https://www.npmjs.com/package/iobroker.aurora-nowcast)
![Anzahl der Installationen](https://iobroker.live/badges/aurora-nowcast-installed.svg)
![Aktuelle Version im Stable Repository](https://iobroker.live/badges/aurora-nowcast-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.aurora-nowcast.png?downloads=true)](https://nodei.co/npm/iobroker.aurora-nowcast/)

**Tests:** ![Test und Release](https://github.com/chrmenne/ioBroker.aurora-nowcast/actions/workflows/test-and-release.yml/badge.svg)

---

## Aurora Nowcast-Adapter für ioBroker

Liefert **aktuelle (Nowcast) Daten** zur kurzfristigen Polarlicht-Aktivität an einem vorgegebenen Ort, basierend auf den öffentlich verfügbaren Daten des NOAA Space Weather Prediction Center (SWPC).

> **Hinweis:**  
> Dieser Adapter liefert *aktuelle/kurzfristige Nowcast-Informationen* basierend auf Echtzeitmessungen und Modellen.  
> Er liefert **keine** längerfristigen Vorhersagen.

---

## Funktionen

- Liefert Echtzeitdaten zur Polarlichtaktivität (NOAA-OVATION-Modell) für die Nord- und Südhalbkugel
- Berechnet die lokale Wahrscheinlichkeit, Polarlichter am konfigurierten Standort zu sehen
- Stellt ioBroker-States für Automatisierung, Visualisierung und Benachrichtigungen bereit
- Optional nutzbar mit Systemstandort oder manueller Eingabe von Breiten-/Längengrad
- Geeignet für Dashboards, Benachrichtigungen und Smart-Home-Szenarien

---

## Konfiguration

Du kannst entweder:

- den in ioBroker konfigurierten Systemstandort verwenden, oder
- abweichende Koordinaten (Breiten-/Längengrad in Dezimalgrad) angeben.

Die Angabe der Koordinaten ist erforderlich, wenn der Systemstandort deaktiviert ist.

Beispiele:

| Ort             | Breitengrad | Längengrad |
|-----------------|-------------|------------|
| Berlin          | 52.5        | 13.4       |
| Buenos Aires    | -34.6       | -58.4      |
| Reykjavik       | 64.1        | -21.9      |

Die Gradangaben für Nord und Ost sind positiv, für Süd und West dagegen negativ.

---

## Zustände

Der Adapter erstellt die folgenden Zustände:

| Zustand             | Typ     | Beschreibung                                                                       |
|---------------------|---------|------------------------------------------------------------------------------------|
| `probability`       | number  | Geschätzte Wahrscheinlichkeit für sichtbare Polarlichter am konfigurierten Ort (%) |
| `observation_time`  | number  | Zeitpunkt der verwendeten Sonnenwind-Beobachtung (UTC, ms)                         |
| `forecast_time`     | number  | Zeitpunkt, für den die geomagnetische Reaktion der Erde berechnet wurde (UTC, ms)  |

Diese Zustände können verwendet werden für:

- Benachrichtigungen (z. B. Push-Nachrichten)
- Dashboard-Visualisierungen
- Automatisierungsregeln (z. B. Kamera aktivieren, wenn die Aktivität hoch ist)

---

## Datenquelle

Dieser Adapter nutzt öffentlich verfügbare Daten von:

- NOAA Space Weather Prediction Center (SWPC)  
  <https://www.swpc.noaa.gov/>

Insbesondere werden das OVATION-Aurora-Nowcast-Modell und zugehörige geomagnetische Echtzeitindizes verwendet, um die Polarlichtaktivität für den konfigurierten Standort zu schätzen.

---

## Haftungsausschluss

NOAA und SWPC sind nicht mit diesem Projekt verbunden.

Die von diesem Adapter verwendeten Daten werden von NOAA zur öffentlichen Nutzung bereitgestellt.  
Es wird keine Gewähr für die Richtigkeit, Vollständigkeit oder Aktualität der bereitgestellten Informationen übernommen.

Die Sichtbarkeit von Polarlichtern hängt von mehreren externen Faktoren ab (z. B. Bewölkung, Lichtverschmutzung, IMF-Ausrichtung), die außerhalb des Einflussbereichs dieses Adapters liegen.

---

## Changelog

Siehe [README.md](README.md#changelog) für den vollständigen Changelog (englisch).

---

## ❤️ Support

Falls **ioBroker.aurora-nowcast** für Sie nützlich ist und sie mich unterstützen möchten, dann spendieren Sie mir doch einen Kaffee ☕🙂

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/donate/?hosted_button_id=G6FRTZ5EAADFJ)

Vielen Dank für Ihre Unterstützung!

---

## License

GNU General Public License v3.0

Copyright (c) 2026 Christian Menne

See LICENSE file for full license text.
