---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.openmeteo-notify/README.md
title: ioBroker.openmeteo-notify
hash: cAhadgK1JDPgDW9wH6wPLzFwUSNqq4a5btCCr9jgYNs=
---
![Logo](../../../en/adapterref/iobroker.openmeteo-notify/admin/openmeteo-notify.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.openmeteo-notify.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.openmeteo-notify.svg)
![Anzahl der Installationen](https://iobroker.live/badges/openmeteo-notify-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/openmeteo-notify-stable.svg)
![NPM](https://nodei.co/npm/iobroker.openmeteo-notify.png?downloads=true)

# IoBroker.openmeteo-notify
**Tests:** ![Test und Freigabe](https://github.com/ipod86/ioBroker.openmeteo-notify/workflows/Test%20and%20Release/badge.svg)

## IoBroker-Adapter für Open-Meteo-Wettervorhersagen
Dieser Adapter ruft Wettervorhersagedaten aus dem kostenlosen [Open-Meteo-API](https://open-meteo.com) ab und stellt sie als ioBroker-Datenpunkte zur Verfügung. Es ist kein API-Schlüssel erforderlich.

## Highlights
### Konfigurierbares HTML-Widget
Der Adapter generiert einen sofort einsatzbereiten HTML-Datenpunkt (`widget`), der direkt in VIS, vis-2 oder jedes beliebige ioBroker-Dashboard eingebettet werden kann – externe Tools oder manuelles CSS sind nicht erforderlich. Design (hell/dunkel), Hintergrundtransparenz, Kartentransparenz, Schriftgröße und Kartenfarbe lassen sich direkt in den Adaptereinstellungen konfigurieren.

### Volltext-Adresssuche
Standorte müssen nicht als Rohkoordinaten eingegeben werden. Die Benutzeroberfläche der Einstellungen bietet eine **Freitext-Adresssuche** – geben Sie einfach eine Stadt, Adresse oder Region ein, und die Koordinaten werden automatisch ermittelt. Für jeden Standort wird eine OpenStreetMap-Vorschau angezeigt. Mehrere Standorte können parallel konfiguriert werden.

### Bis zu 16-Tage-Vorhersage
Je nach gewähltem Wettermodell sind Tagesvorhersagen für bis zu **16 Tage** verfügbar – deutlich mehr als die üblichen 5–7 Tage der meisten Adapter.

### Wetterzusammenfassungstexte
Der Adapter generiert Wetterzusammenfassungen in natürlicher Sprache (`current.summary`, `dayX.summary_day`, `dayX.summary_night`) in **11 Sprachen**, wobei DWD-Standardschwellenwerte für Temperatur, Wind und Niederschlag, einschließlich des auf CAPE basierenden Gewitterrisikos, verwendet werden.

## Merkmale
- **Kostenlos & kein API-Schlüssel erforderlich** – Open-Meteo ist eine kostenlose Open-Source-Wetter-API.
- **Mehrere Standorte** – Konfigurieren Sie beliebig viele Standorte, jeweils mit Adresssuche und Kartenvorschau.
- **Systemstandort-Fallback** – verwendet die ioBroker-Systemkoordinaten, falls kein Standort konfiguriert ist
- **Konfigurierbarer Vorhersagezeitraum** – bis zu 16 Tage täglich, bis zu 16 Tage stündlich
- **Konfigurierbares Aktualisierungsintervall** – 60 Minuten, 120 Minuten oder täglich um 01:00 Uhr
- **Einheiten** – Temperatur (°C / °F), Windgeschwindigkeit (km/h, m/s, mph, kn), Niederschlag (mm / Zoll)
- **5 Wettersymbolsets** mit Live-Vorschau in den Einstellungen:
- Meteocons von Bas Milius – statisches PNG (Standard)
- Meteocons von Bas Milius – animiertes SVG
- amCharts Wettersymbole – animiertes SVG *(Regen/Schnee/Gewitter: keine Tag/Nacht-Variante)*
- amCharts Wettersymbole – statisches SVG *(Regen/Schnee/Gewitter: keine Tag/Nacht-Variante)*
- Meteorologische Symbole der WMO OGC – PNG
- **Tag-/Nacht-Symbole** – Die Symbole von Meteocons und amCharts (klar/bewölkt) wechseln je nach `is_day` zu Nachtvarianten.
- **Windrichtung** – Grad, Kompassschrift (N/NO/O/…), Pfeil-Emoji (⬆️↗️…), SVG-Pfeilsymbol
- **Windstärke** – Beaufort-Skala (0–12) mit Meteocons Beaufort-Symbolen
- **`info.lastUpdate`** – Zeitstempel der letzten erfolgreichen Aktualisierung

### Optionale Datengruppen (einzeln umschaltbar, jeweils mit der Option "auch stündlich")
| Gruppe | Standard | Datenpunkte |
|-------|---------|-------------|
| **Luftqualität** | an | european_aqi, PM10, PM2.5, NO₂, CO, Staub, Ozon → `current.air_quality` / `hXX.air_quality` |
| **Landwirtschaft / Solar** | aus | Sonneneinstrahlung, CAPE, Bodentemperatur, Bestrahlungsstärke → `*.agriculture` |
| **Komfortindizes** | aus | Hitzeindex, Windchill, Humidex, UV-Index → `*.comfort` |
| **Pollen** | aus | Erle, Birke, Gras, Beifuß, Olive, Ambrosia mit Leveltext → `dayX.pollen` / `hXX.pollen` |
| **DWD-Warnungen** | aus | Offizielle Warnungen des Deutschen Wetterdienstes (nur Deutschland) → `location.warnings.*` |
| **DWD-Warnungen** | aus | Offizielle Warnungen des Deutschen Wetterdienstes (nur Deutschland) → `location.warnings.*` |

Wenn eine Gruppe deaktiviert wird, werden ihre Datenpunktkanäle beim nächsten Update automatisch gelöscht.

### Offizielle Wetterwarnungen
Der Adapter integriert offizielle Wetterwarnungen nationaler Wetterdienste. Aktivieren Sie diese Funktion mit dem Schalter **„Offizielle Wetterwarnungen“**. Der Dienst wird automatisch anhand der Standortkoordinaten ausgewählt.

| Land | Service | Abdeckung |
|---------|---------|----------|
| Deutschland (DE) | [DWD](https://www.dwd.de) – Deutscher Wetterdienst | Alle Warnarten, 4 Schweregrade |
| EU-Länder | [MeteoAlarm](https://www.meteoalarm.org) | Alle Warnarten, polygonbasierter Abgleich |
| Sonstige | — | Nicht verfügbar (berechnete Open-Meteo-Warnungen verwenden) |

Warnungen werden unabhängig von ihrer Quelle unter `location.warnings.*` gespeichert. Ein Datenpunkt `warnings.source` zeigt `"DWD"` oder `"MeteoAlarm"` an.

## Installation
Installation über die ioBroker-Admin-Oberfläche (Suche nach "openmeteo-notify").

## Konfiguration
| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Standorte | Namens- und Freitextadressensuche oder Koordinatensuche; OSM-Kartenvorschau | ioBroker-Systemstandort |
| Vorhersagetage | Tägliche Vorhersagespanne (1–16) | 7 |
| Stündliche Tage | Tage mit stündlichen Daten (0–16) | 3 |
| Temperatureinheit | °C oder °F | °C |
| Windgeschwindigkeitseinheit | km/h, m/s, mph, kn | km/h |
| Niederschlagseinheit | mm oder Zoll | mm |
| Icon-Set | Wetter-Icon-Set mit Live-Vorschau | Statische Meteocons |
| Aktualisierungsintervall | 60 Min. / 120 Min. / täglich um 01:00 Uhr | 60 Min. |
| Widget-Design | Helles oder dunkles Design für das HTML-Widget | hell |
| Widget-Hintergrundtransparenz | Hintergrundtransparenz des HTML-Widgets | 100 % |
| Deckkraft der Widget-Karte | Transparenz der HTML-Widget-Karte | 100 % |
| Schriftgröße des Widgets | Schriftgröße im HTML-Widget | 14px |
| Widget-Kartenfarbe | Kartenhintergrundfarbe | #ffffff |
| Kompakte Ansicht | Kompaktes Layout im HTML-Widget verwenden | Aus |
| Luftqualität | AQI + Feinstaub aktivieren | ein |
| Luftqualität – auch stündlich | Stündlicher AQI/PM unter `hXX.air_quality` | aus |
| Astronomie | Sonnen- und Monddaten aktivieren | an |
| Astronomie – ebenfalls stündlich | Echo-Astronomiedaten pro Stundenfenster | aus |
| Landwirtschaft / Solarenergie | Strahlung, CAPE, Bodentemperatur aktivieren | aus |
| Landwirtschaft – auch stündlich | Stündliche Agrardaten | aus |
| Komfortindizes | Hitzeindex, Windchill, Feuchtigkeitsindex, UV-Index aktivieren | aus |
| Komfort – auch stündlich | Stündliche Komfortdaten | aus |
| Pollen | Pollendaten aktivieren (nur Europa) | aus |
| Pollen – auch stündlich | Stündlicher Pollen pro Art | aus |
| DWD-Wetterwarnungen | DWD-Daten aktivieren (nur Deutschland) | aus |
| Offizielle Warnungen als Benachrichtigung | Offizielle Warnungen (DE: DWD, EU: MeteoAlarm) über das ioBroker-Benachrichtigungssystem senden | Aus |
| Sturmwarnung | Berechnet aus der weltweiten OpenMeteo-Vorhersage | Aus |
| Gewitterwarnung | Berechnet aus der weltweiten OpenMeteo-Vorhersage | Aus |
| Vorwarnzeit (Stunden) | Wie viele Stunden im Voraus sollen Sturm-/Gewitterwarnungen versendet werden? | 2 |

## Datenpunkte
Der Adapter erzeugt Datenpunkte unter `openmeteo-notify.<instance>.<location>`.

### Aktuelles Wetter (`current`)
| Datenpunkt | Beschreibung | Einheit |
|-----------|-------------|------|
| `temperature` | Aktuelle Temperatur | °C/°F |
| `weathercode` | WMO-Wettercode (0 = klarer Himmel, 95/99 = Gewitter) – vollständige Tabelle: [WMO 4677](https://open-meteo.com/en/docs#weathercode) | |
| `description` | Wetterbeschreibung in verständlicher Sprache (11 Sprachen) | |
| `icon` | Wetter-Emoji | |
| `icon_url` | URL des Wettersymbols (Symbolset in den Einstellungen auswählbar) | |
| `precipitation` | Gesamtniederschlag der letzten Stunde | mm/Zoll |
| `rain` | Regenmenge der letzten Stunde | mm/Zoll |
| `snowfall` | Schneefall der letzten Stunde | cm |
| `snow_depth` | Aktuelle Schneehöhe am Boden | cm |
| `cloudcover` | Bewölkung | % |
| `humidity` | Relative Luftfeuchtigkeit | % |
| `dew_point` | Taupunkt – Temperatur, bei der die Luft gesättigt ist; nahe der Lufttemperatur = hohe Luftfeuchtigkeit | °C/°F |
| `pressure` | Atmosphärischer Druck auf mittleren Meeresspiegel (MSL) reduziert | hPa |
| `visibility` | Horizontale Sichtweite | m |
| `is_day` | `true` zwischen Sonnenaufgang und Sonnenuntergang | boolescher Wert |
| `windspeed` | Windgeschwindigkeit (Einheit wählbar: km/h, m/s, mph, kn) | km/h … |
| `windgusts` | Maximale Windböengeschwindigkeit | km/h … |
| `winddirection` | Windrichtung (meteorologisch: Richtung, aus der der Wind kommt) | ° |
| `winddirection_text` | Himmelsrichtungstext | N/NO/… |
| `winddirection_icon` | Himmelsrichtungs-Emoji | ⬆️↗️… |
| `winddirection_icon_url` | URL des Windrichtungspfeilsymbols | |
| `windbeaufort` | Windstärke auf der Beaufort-Skala (0 = Windstille, 8 = Sturm, 12 = Orkan) | 0–12 |
| `windbeaufort_icon_url` | Beaufort-Symbol-URL | |
| `air_quality.*` | AQI, PM10, PM2,5, NO₂, CO, Staub, Ozon *(falls aktiviert)* | |
| `pollen.*` | Aktuelle Pollenmenge pro Typ *(falls aktiviert)* | Körner/m³ |
| `agriculture.solar_radiation` | Kurzwellige Solarstrahlung am Boden *(falls aktiviert)* | W/m² |
| `agriculture.cape` | CAPE – Konvektive verfügbare potenzielle Energie: Energie, die für die Gewitterentwicklung zur Verfügung steht; > 500 J/kg = nennenswertes Risiko, > 2000 J/kg = schweres Gewitter *(falls aktiviert)* | J/kg |
| `agriculture.soil_temp` | Bodentemperatur in 0 cm Tiefe *(falls aktiviert)* | °C/°F |
| `comfort.heat_index` | Hitzeindex (Rothfusz) – wie heiß es sich anfühlt, basierend auf der Kombination von Temperatur und Luftfeuchtigkeit; nur sinnvoll bei ≥ 27 °C und ≥ 40 % relativer Luftfeuchtigkeit, `null` ansonsten *(falls aktiviert)* | °C/°F |
| `comfort.windchill` | Windchill (NWS) – gefühlte Kälte aufgrund des Windes; nur sinnvoll bei ≤ 10 °C und Windgeschwindigkeiten > 4,8 km/h, `null` ansonsten *(falls aktiviert)* | °C/°F |
| `comfort.humidex` | Humidex (kanadische Formel) – kombinierter Hitze- und Feuchtigkeits-Beschwerdeindex; Werte über 40 sind unangenehm, über 46 gefährlich *(falls aktiviert)* | °C/°F |
| `comfort.humidex_level` | Humidex-Beschwerdeniveau: 1 = keins (<29) · 2 = leicht (29–34) · 3 = spürbar (35–39) · 4 = stark (40–45) · 5 = gefährlich (≥46) *(falls aktiviert)* | 1–5 |
| `comfort.uv_index` | UV-Index (0–11+) – Intensität der UV-Strahlung am Boden *(falls aktiviert)* | |
| `comfort.uv_level` | UV-Schutzstufe (WHO-Skala): `low` (0–2, kein Schutz) · `moderate` (3–5, Sonnenschutzmittel) · `high` (6–7) · `very_high` (8–10) · `extreme` (≥11) *(falls aktiviert)* | |
| `comfort.uv_level` | UV-Schutzstufe (WHO-Skala): `niedrig` (0–2, kein Schutz) · `mittel` (3–5, Sonnenschutzmittel) · `hoch` (6–7) · `sehr hoch` (8–10) · `extrem` (≥11) *(falls aktiviert)* | |

### Tagesvorhersage (`day1` … `day16`)
| Datenpunkt | Beschreibung |
|-----------|-------------|
| `date` / `weekday` | Datum / Wochentag |
| `description` | Wetterbeschreibung |
| `temp_max` / `temp_min` | Maximale/minimale Temperatur |
| `feels_like_max` / `feels_like_min` | Gefühltes Maximum/Minimum |
| `weathercode` | WMO-Wettercode |
| `precipitation` | Niederschlagssumme |
| `rain` / `snowfall` | Summe Regen / Schneefall |
| `rain_probability` | Niederschlagswahrscheinlichkeit |
| `windspeed` / `windgusts` | Windgeschwindigkeit / maximale Windböen |
| `winddirection` / `_text` / `_icon` / `_icon_url` | Windrichtung |
| `windbeaufort` / `windbeaufort_icon_url` | Beaufort-Skala |
| `uv_index` | Täglicher maximaler UV-Index *(unter Berücksichtigung der Bewölkung)* | |
| `uv_index_clear_sky` | Täglicher maximaler UV-Index bei völlig klarem Himmel – nützlich, um das UV-Potenzial unabhängig von Wolken zu ermitteln | |
| `sunshine_hours` | Stunden tatsächlicher Sonnenscheindauer (direkte Strahlung) | h |
| `daylight_hours` | Gesamtstunden zwischen Sonnenaufgang und Sonnenuntergang | h |
| `cloud_cover_max` | Maximale Bewölkung tagsüber | % |
| `temp_mean` / `feels_like_mean` | Tägliche Durchschnittstemperatur / gefühlte Temperatur | °C/°F |
| `precipitation_hours` | Anzahl der Stunden mit messbarem Niederschlag | h |
| `showers` | Konvektiver (schauerartiger) Niederschlag – kurz, intensiv; unterscheidet sich von kontinuierlichem `rain` | mm/Zoll |
| `snowfall_height_min` | Niedrigste Höhe tagsüber, in der Schnee fällt (0 m = Schnee bis Talboden) | m ü. NN |
| `freezing_level_height_min` | Niedrigste Höhe der 0 °C-Isotherme tagsüber | m ü. NN |
| `dew_point_mean` / `humidity_mean` / `pressure_mean` | Tägliche Mittelwerte | |
| `air_quality.european_aqi_max` … `ozone_max` | Tägliche maximale Werte für AQI, PM10, PM2,5, NO₂, CO, Staub, Ozon *(falls aktiviert)* | |
| `astronomy.sunrise` / `astronomy.sunset` | Sonnenaufgang / Sonnenuntergang *(falls aktiviert)* | |
| `astronomy.solar_noon` | Zeitpunkt des höchsten Sonnenstands *(falls aktiviert)* | |
| `astronomy.solar_elevation_max` | Sonnenwinkel über dem Horizont zur Mittagszeit – 90° = senkrecht über dem Horizont, 0° = Horizont *(falls aktiviert)* | ° |
| `astronomy.moon_phase_val` | Mondphase als Zahl: 0 = Neumond · 0,25 = erstes Viertel · 0,5 = Vollmond · 0,75 = letztes Viertel *(falls aktiviert)* | 0–1 |
| `astronomy.moon_phase_text` / `_icon_url` | Mondphase als Text / Symbol *(falls aktiviert)* | |
| `astronomy.moonrise` / `astronomy.moonset` | Mondaufgang / Monduntergang *(falls aktiviert)* | |
| `agriculture.solar_radiation_sum` | Gesamte tagsüber empfangene Sonneneinstrahlung | MJ/m² |
| `agriculture.evapotranspiration` | FAO-56 Referenzverdunstung (ET₀) – Wassermenge, die Pflanzen und Boden abgeben; wird für die Bewässerungsplanung verwendet | mm |
| `agriculture.lifted_index_min` | Täglicher minimaler Lifted Index – atmosphärische Stabilität: negativ = instabil/Sturmrisiko, stark negativ (< −6) = Risiko schwerer Gewitter *(falls aktiviert)* | K |
| `comfort.heat_index_max` | Maximaler Hitzeindex des Tages *(falls aktiviert)* | °C/°F |
| `comfort.windchill_min` | Minimale Windchill-Temperatur des Tages *(falls aktiviert)* | °C/°F |
| `comfort.humidex_max` / `.humidex_level` | Maximaler Humidex / Unbehaglichkeitsgrad (1–5, siehe aktueller Abschnitt) *(falls aktiviert)* | |
| `comfort.uv_index_max` / `.uv_level` | Maximaler UV-Index / -Pegel (siehe aktuellen Abschnitt) *(falls aktiviert)* | |
| `pollen.alder` … `pollen.ragweed` | Tägliche maximale Pollenkonzentration + Stufenbeschreibung (Keine/Niedrig/Mittel/Hoch) *(falls aktiviert, nur Tag 1–4)* | Körner/m³ |
| `Erlenpollen` … `Ambrosiapollen` | Tägliche maximale Pollenkonzentration + Stufenbeschreibung (Keine/Niedrig/Mittel/Hoch) *(falls aktiviert, nur Tag 1–4)* | Körner/m³ |

### Stündliche Werte (`day1.hourly.h00` … `h23`)
Temperatur, gefühlte Temperatur, Niederschlag, Regen, Schneefall, Schneehöhe, Schneefallhöhe, Regenwahrscheinlichkeit, Bewölkung, Luftfeuchtigkeit, Taupunkt, Luftdruck, Sichtweite, Tag, Windgeschwindigkeit, Windrichtung (Text/Emoji/Symbol), Beaufort, UV-Index, Höhe der Gefriergrenze, Wettercode, Symbol/Symbol-URL, Beschreibung.

Optional pro Stunde (falls aktiviert + "auch stündlich"):

| Kanal | Datenpunkte |
|---------|-------------|
| `hXX.air_quality` | european_aqi, PM10, PM2.5, NO₂, CO, Staub, Ozon |
| `hXX.agriculture` | solar_radiation (W/m²), CAPE (J/kg), soil_temp (°C/°F), irradiance = global tilted irradiance on a plane surface (W/m²), lifted_index (K) |
| `hXX.comfort` | Hitzeindex, Windchill, Feuchtigkeitsindex, Feuchtigkeitsindex, UV-Index, UV-Strahlung |
| `hXX.pollen` | Erle … Ambrosia + Ebenentext (Keine/Niedrig/Mittel/Hoch) |
| `hXX.pollen` | Erle … Ambrosia + Ebenentext (Keine/Niedrig/Mittel/Hoch) |

### Offizielle Warnungen (`warnings`)
| Datenpunkt | Beschreibung |
|-----------|-------------|
| `warnings.source` | Warndienst: `"DWD"` oder `"MeteoAlarm"` |
| `warnings.count` | Anzahl aktiver Warnungen |
| `warnings.max_level` | Höchste Schweregradstufe: 1 = Gering · 2 = Mittel · 3 = Schwer · 4 = Extrem |
| `warnings.max_level_text` | Schweregradbeschreibung |
| `warnings.warning_N.active` | Warnungssteckplatz N aktiv |
| `warnings.warning_N.event` | Ereignistyp |
| `warnings.warning_N.level` / `.level_text` | Schweregrad |
| `warnings.warning_N.headline` | Warnüberschrift |
| `warnings.warning_N.description` | Warnbeschreibung |
| `warnings.warning_N.start` / `.end` | Gültigkeitszeitraum |
| `warnings.warning_N.start` / `.end` | Gültigkeitszeitraum |

*(Wird nur erstellt, wenn "Offizielle Wetterwarnungen" aktiviert ist und ein unterstütztes Land erkannt wurde.)*

### Zusammenfassung & Widget
| Datenpunkt | Beschreibung |
|-----------|-------------|
| `current.summary` | Wetterzusammenfassung in natürlicher Sprache für die aktuellen Bedingungen (11 Sprachen) |
| `dayX.summary_night` | Zusammenfassung des Nachtwetters für den Vorhersagetag (11 Sprachen) |
| `weather_short` | Kurzer Textüberblick über alle Vorhersagetage |
| `widget` | Sofort einsatzbereiter HTML-Codeausschnitt für VIS / vis-2 / Dashboards (konfigurierbares Erscheinungsbild) |
| `info.lastUpdate` | Zeitstempel der letzten erfolgreichen Aktualisierung |
| `info.lastUpdate` | Zeitstempel der letzten erfolgreichen Aktualisierung |

## Bildnachweise
- **Meteokonside** von [Bas Milius](https://github.com/basmilius/weather-icons) – MIT-Lizenz
- **amCharts Wettersymbole** von [amCharts](https://www.amcharts.com/free-animated-svg-weather-icons/) – [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **WMO-Wettersymbole** von [OGC MetOcean DWG](https://github.com/OGCMetOceanDWG/WorldWeatherSymbols) – CC BY 4.0

## Haftungsausschluss
Dieser Adapter verwendet Daten von folgenden Drittanbietern:

- **[Open-Meteo](https://open-meteo.com)** – Wettervorhersagedaten. Name und Logo von Open-Meteo sind Eigentum ihrer jeweiligen Inhaber.
- **[DWD](https://www.dwd.de)** (Deutscher Wetterdienst) – offizielle Wetterwarnungen für Deutschland. Name und Daten des DWD sind Eigentum des Deutschen Wetterdienstes.
- **[MeteoAlarm](https://www.meteoalarm.org)** – offizielle Wetterwarnungen für europäische Länder. Name und Daten von MeteoAlarm sind Eigentum ihrer jeweiligen Inhaber.

Dieser Adapter ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu den oben genannten Diensten und wird von diesen auch nicht unterstützt.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.12 (2026-07-01)
* (ipod86) fix: translate 84 missing admin i18n keys into all 10 languages (W5606)

### 0.1.11 (2026-06-24)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (ipod86) fix: skip hourly slots without icon data in detailed widget (missing icons at 00h/02h/04h)
* (ipod86) feat: grey out hourlyRange options that exceed configured hourly days; add explanatory hint
* (ipod86) fix: reposition moon badge in simple and detailed widget header
* (ipod86) feat: add moon phase overlay to simple widget (showMoon option)
* (ipod86) fix: complete and correct i18n translations in all 11 languages (50+ missing keys)
* (ipod86) ci: remove broken build-admin GitHub Actions workflow

### 0.1.10 (2026-06-23)
* (ipod86) fix: improve air quality/pollen error log message – distinguish timeout from unsupported region

### 0.1.9 (2026-06-22)
* (ipod86) fix: increase HTTP request timeout from 10s to 30s
* (ipod86) fix: remove spurious enableWarnOfficialFetch from native defaults
* (ipod86) chore: bump @iobroker/adapter-core from 3.3.2 to 3.4.1
* (ipod86) chore: bump @iobroker/adapter-react-v5, react, @vitejs/plugin-react, vite in src-admin
* (ipod86) chore: bump ioBroker/testing-action-check from 1 to 2

### 0.1.8 (2026-06-09)
* (ipod86) fix: add 10s timeout to all HTTP requests (fetchWeather, fetchAirQuality, fetchLocationInfo, fetchMeteoAlarmWarnings, fetchDwdWarnings)
* (ipod86) fix: translate all remaining German common.name values in processData, processDwdWarnings, processMeteoAlarmWarnings
* (ipod86) fix: warning time format no longer hardcoded to de-DE locale; uses system locale
* (ipod86) fix: add interval bounds validation (1–35791 min) for updateInterval and warnIntervalMinutes
* (ipod86) fix: add missing native defaults (warnOfficialFetch, enableWarnOfficialFetch, widgets) to io-package.json
* (ipod86) fix: move _locationInfo initialization to constructor

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 ipod86

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