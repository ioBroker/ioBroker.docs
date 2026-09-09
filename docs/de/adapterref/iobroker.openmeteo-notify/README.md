---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.openmeteo-notify/README.md
title: ioBroker.openmeteo-notify
hash: 50oAU9MRxWuid0A8TWgRf8MlW+T0TcINt3f67Yzjrow=
---
![Logo](../../../en/adapterref/iobroker.openmeteo-notify/admin/openmeteo-notify.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.openmeteo-notify.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.openmeteo-notify.svg)
![Anzahl der Installationen](https://iobroker.live/badges/openmeteo-notify-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/openmeteo-notify-stable.svg)
![NPM](https://nodei.co/npm/iobroker.openmeteo-notify.png?downloads=true)

# ioBroker.openmeteo-notify

**Tests:**![Test und Freigabe](https://github.com/ipod86/ioBroker.openmeteo-notify/workflows/Test%20and%20Release/badge.svg)

## ioBroker-Adapter für Open-Meteo-Wettervorhersagen

Dieser Adapter ruft Wettervorhersagedaten von der kostenlosen [OpenMeteo-API](https://open-meteo.com) ab und stellt sie als ioBroker-Datenpunkte bereit. Es ist kein API-Schlüssel erforderlich. Er versendet individuelle Benachrichtigungen für konfigurierbare Wetterereignisse (Stürme, Gewitter, offizielle Warnungen) und bietet mehrere unabhängig konfigurierbare HTML-Widgets pro Standort.

## Highlights

### Wetterbenachrichtigungen über den ioBroker-Benachrichtigungsmanager

Der Adapter versendet individuelle Benachrichtigungen für konfigurierbare Wetterereignisse – Sturmwarnungen, Gewitterwarnungen und offizielle Warnungen nationaler Wetterdienste (DWD für Deutschland, MeteoAlarm für Europa). Alle Benachrichtigungsziele (Telegram, E-Mail, Pushover usw.) werden zentral über den **ioBroker-Benachrichtigungsmanager** konfiguriert – eine Einrichtung pro Adapter ist nicht erforderlich.

### Konfigurierbares HTML-Widget

Der Adapter generiert einen sofort einsatzbereiten HTML-Datenpunkt (`widget` ) das direkt in VIS, vis-2 oder jedes beliebige ioBroker-Dashboard eingebettet werden kann – ohne externe Tools oder manuelle CSS-Anpassungen. Design (hell/dunkel), Hintergrundtransparenz, Kartentransparenz, Schriftgröße und Kartenfarbe lassen sich direkt in den Adaptereinstellungen konfigurieren.

### Animiertes Wetter-Hintergrundbild / Bildschirmschoner

Der Adapter erzeugt für jeden Standort ein in sich geschlossenes, animiertes Wetter-Hintergrundbild – eine Vollbild-Canvas-Animation (Regen, Schnee, Nebel, Blitz, Sonnenblendung, Sterne), die vom aktuellen Wetter in Echtzeit gesteuert wird und nicht manuell. Ideal als an der Wand montierter Tablet-Bildschirmschoner oder als VIS-/Dashboard-Hintergrund.

- **Reale, wetterbedingte Effekte** – Windrichtung und -geschwindigkeit beeinflussen Regen- und Nebelverdriftung, die Niederschlagsmenge skaliert mit der Partikelintensität, die Position von Sonne und Mond (sowie die Mondphase) folgen realen astronomischen Daten (SunCalc) für den konfigurierten Standort
- **Offizielles Warnbanner** – Aktive DWD/MeteoAlarm-Warnungen werden als konfigurierbares Textbanner angezeigt; störende Overlay-Elemente werden automatisch ausgeblendet.
- **Eigenes Hintergrundfoto pro Standort** – standardmäßig mit einem Foto versehen, das jederzeit über Admin → Dateien ersetzt werden kann und nach dem Standort benannt ist.
- **Automatische Aktualisierung ohne REST-API** – lädt eine kleine JSON-Begleitdatei aus demselben Ordner herunter, kein vollständiges Neuladen der Seite erforderlich
- **Optionale Standortauswahl** – Navigieren Sie mit den Pfeiltasten links/rechts zwischen mehreren konfigurierten Standorten.
- **Unabhängiges Live-Aktualisierungsintervall** – Aktualisierung nur der aktuellen Bedingungen und des Hintergrundbildes (0/5/10/15/30 Min.), getrennt vom Hauptvorhersage-Aktualisierungsintervall
- Konfigurierbar über einen speziellen **Administrator-Tab „Hintergrundbild“** (Position, Farben, Schriftgrößen, Uhr, Warnungen) mit einer Live-Vorschau, die gängige Bildschirmauflösungen simuliert.
- Direkt erreichbar als URL pro Webinstanz (`current.wallpaper_url_<instance>` — keine VIS-Bindung erforderlich

### Volltext-Adresssuche

Standorte müssen nicht als Rohkoordinaten eingegeben werden. Die Benutzeroberfläche der Einstellungen bietet eine **Freitext-Adresssuche** – geben Sie einfach eine Stadt, Adresse oder Region ein, und die Koordinaten werden automatisch ermittelt. Für jeden Standort wird eine OpenStreetMap-Vorschau angezeigt. Mehrere Standorte können parallel konfiguriert werden.

### Bis zu 16-Tage-Vorhersage

Je nach gewähltem Wettermodell sind Tagesvorhersagen für bis zu **16 Tage** verfügbar – deutlich mehr als die üblichen 5–7 Tage der meisten Adapter.

### Wetterzusammenfassungen

Der Adapter generiert Wetterzusammenfassungen in natürlicher Sprache (`current.summary` ,`dayX.summary_day` ,`dayX.summary_night` ) in **11 Sprachen** unter Verwendung von DWD-Standardschwellenwerten für Temperatur, Wind und Niederschlag, einschließlich des auf CAPE basierenden Gewitterrisikos.

## Merkmale

- **Kostenlos und ohne API-Schlüssel** – Open-Meteo ist eine kostenlose Open-Source-Wetter-API.
- **Mehrere Standorte** – Konfigurieren Sie beliebig viele Standorte, jeweils mit Adresssuche und Kartenvorschau.
- **Systemstandort-Fallback** – verwendet die ioBroker-Systemkoordinaten, falls kein Standort konfiguriert ist
- **Konfigurierbarer Vorhersagezeitraum** – bis zu 16 Tage täglich, bis zu 16 Tage stündlich
- **Konfigurierbares Aktualisierungsintervall** – 60 Minuten, 120 Minuten oder täglich um 01:00 Uhr
- **Einheiten** – Temperatur (°C / °F), Windgeschwindigkeit (km/h, m/s, mph, kn), Niederschlag (mm / Zoll)
- **5 Wettersymbolsets** mit Live-Vorschau in den Einstellungen:
  - Meteocons von Bas Milius – statisches PNG (Standard)
  - Meteocons von Bas Milius – animiertes SVG
  - amCharts Wettersymbole – animiertes SVG _(Regen/Schnee/Gewitter: keine Tag/Nacht-Variante)_
  - amCharts Wettersymbole – statisches SVG _(Regen/Schnee/Gewitter: keine Tag/Nacht-Variante)_
  - WMO OGC-Wettersymbole – PNG
- **Tag-/Nacht-Symbole** – Die Symbole von Meteocons und amCharts (klar/bewölkt) wechseln je nach Wetterlage zu Nachtvarianten.`is_day`
- **Windrichtung** – Grad, Kompassschrift (N/NO/O/…), Pfeil-Emoji (⬆️↗️…), SVG-Pfeilsymbol
- **Windstärke** – Beaufort-Skala (0–12) mit Meteocons Beaufort-Symbolen
- **`info.lastUpdate`** – Zeitstempel der letzten erfolgreichen Aktualisierung

### Optionale Datengruppen (einzeln umschaltbar, jeweils mit der Option „auch stündlich“)

| Gruppe                            | Standard | Datenpunkte                                                                                                                                      |
| --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Luftqualität**                  | An       | european\_aqi, PM10, PM2.5, NO₂, CO, Staub, Ozon →`current.air_quality` /`hXX.air_quality`                                                       |
| **Astronomie**                    | An       | Sonnenaufgang, Sonnenuntergang, Sonnenhöchststand, maximale Sonnenhöhe, Mondphase, Mondaufgang, Monduntergang →`dayX.astronomy` /`hXX.astronomy` |
| **Landwirtschaft / Solarenergie** | aus      | Sonneneinstrahlung, CAPE, Bodentemperatur, Bestrahlungsstärke →`*.agriculture`                                                                   |
| **Komfortindizes**                | aus      | Hitzeindex, Windchill, Humidex, UV-Index →`*.comfort`                                                                                            |
| **Pollen**                        | aus      | Erle, Birke, Gras, Beifuß, Olive, Ambrosia mit Leveltext →`dayX.pollen` /`hXX.pollen`                                                            |
| **DWD-Warnungen**                 | aus      | Offizielle Warnungen des Deutschen Wetterdienstes (nur Deutschland) →`location.warnings.*`                                                       |

Wenn eine Gruppe deaktiviert wird, werden ihre Datenpunktkanäle beim nächsten Update automatisch gelöscht.

### Offizielle Wetterwarnungen

Der Adapter integriert offizielle Wetterwarnungen nationaler Wetterdienste. Aktivieren Sie diese Funktion mit dem Schalter **„Offizielle Wetterwarnungen“** . Der Dienst wird automatisch anhand der Standortkoordinaten ausgewählt.

| Land             | Service                                            | Abdeckung                                                            |
| ---------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| Deutschland (DE) | [DWD](https://www.dwd.de) – Deutscher Wetterdienst | Alle Warnarten, 4 Schweregrade                                       |
| EU-Länder        | [Wetteralarm](https://www.meteoalarm.org)          | Alle Warnarten, polygonbasierte Übereinstimmung                      |
| Andere           | —                                                  | Nicht verfügbar (verwenden Sie die berechneten Open-Meteo-Warnungen) |

Warnungen werden gespeichert unter`location.warnings.*` unabhängig von der Quelle. A`warnings.source` Datenpunkt zeigt`"DWD"` oder`"MeteoAlarm"` Die

## Installation

Installation über die ioBroker-Admin-Oberfläche (Suche nach "openmeteo-notify").

## Konfiguration

| Einstellung                               | Beschreibung                                                                                         | Standard                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------- |
| Standorte                                 | Namenssuche mit Freitextadresse oder Koordinaten; OSM-Kartenvorschau                                 | ioBroker-Systemstandort |
| Vorhersagetage                            | Tägliche Vorhersagespanne (1–16)                                                                     | 7                       |
| Stundenweise Tage                         | Tage mit stündlichen Daten (0–16)                                                                    | 3                       |
| Temperatureinheit                         | °C oder °F                                                                                           | °C                      |
| Windgeschwindigkeitsmessgerät             | km/h, m/s, mph, kn                                                                                   | km/h                    |
| Niederschlagseinheit                      | mm oder Zoll                                                                                         | mm                      |
| Symbolset                                 | Wettersymbolset mit Live-Vorschau                                                                    | Meteocons statisch      |
| Aktualisierungsintervall                  | 60 Min. / 120 Min. / täglich um 01:00 Uhr                                                            | 60 Minuten              |
| Widget-Design                             | Helles oder dunkles Design für das HTML-Widget                                                       | Licht                   |
| Widget-Hintergrundtransparenz             | Hintergrundtransparenz des HTML-Widgets                                                              | 100%                    |
| Deckkraft der Widget-Karte                | Kartentransparenz des HTML-Widgets                                                                   | 100%                    |
| Schriftgröße des Widgets                  | Schriftgröße im HTML-Widget                                                                          | 14px                    |
| Widget-Kartenfarbe                        | Kartenhintergrundfarbe                                                                               | #ffffff                 |
| Kompaktansicht                            | Verwenden Sie ein kompaktes Layout im HTML-Widget.                                                   | aus                     |
| Luftqualität                              | AQI + Feinstaub aktivieren                                                                           | An                      |
| Luftqualität – ebenfalls stündlich        | Stündlicher AQI/PM unter`hXX.air_quality`                                                            | aus                     |
| Astronomie                                | Sonnen- und Monddaten aktivieren                                                                     | An                      |
| Astronomie – ebenfalls stündlich          | Echo-Astronomiedaten pro Stundenschlitz                                                              | aus                     |
| Landwirtschaft / Solarenergie             | Strahlung aktivieren, CAPE, Bodentemperatur                                                          | aus                     |
| Landwirtschaft – auch stündlich           | Stündliche Agrardaten                                                                                | aus                     |
| Komfortindizes                            | Hitzeindex, Windchill-Wert, Feuchtigkeitsindex und UV-Index aktivieren                               | aus                     |
| Komfort – auch stündlich                  | Stündliche Komfortdaten                                                                              | aus                     |
| Pollen                                    | Pollendaten aktivieren (nur Europa)                                                                  | aus                     |
| Pollen – ebenfalls stündlich              | Stündlicher Pollenflug pro Pollensorte                                                               | aus                     |
| DWD-Wetterwarnungen                       | DWD-Daten aktivieren (nur Deutschland)                                                               | aus                     |
| Offizielle Warnungen als Benachrichtigung | Senden Sie offizielle Warnungen (DE: DWD, EU: MeteoAlarm) über das ioBroker-Benachrichtigungssystem. | aus                     |
| Sturmwarnung                              | Berechnet aus der Open-Meteo-Vorhersage, weltweit                                                    | aus                     |
| Gewitterwarnung                           | Berechnet aus der Open-Meteo-Vorhersage, weltweit                                                    | aus                     |
| Vorlaufzeit (Stunden)                     | Wie viele Stunden im Voraus sollten Sturm-/Gewitterwarnungen versendet werden?                       | 2                       |

## Datenpunkte

Der Adapter erzeugt Datenpunkte unter`openmeteo-notify.<instance>.<location>` Die

### Aktuelles Wetter (`current` )

| Datenpunkt                    | Beschreibung                                                                                                                                                                                                        | Einheit         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `temperature`                 | Aktuelle Temperatur                                                                                                                                                                                                 | °C/°F           |
| `feels_like`                  | Gefühlte Temperatur – kombiniert Wärme, Luftfeuchtigkeit und Wind                                                                                                                                                   | °C/°F           |
| `weathercode`                 | WMO-Wettercode (0 = klarer Himmel, 95/99 = Gewitter) – vollständige Tabelle: [WMO 4677](https://open-meteo.com/en/docs#weathercode)                                                                                 |                 |
| `description`                 | Wetterbeschreibung in verständlicher Sprache (11 Sprachen)                                                                                                                                                          |                 |
| `icon`                        | Wetter-Emoji                                                                                                                                                                                                        |                 |
| `icon_url`                    | URL des Wettersymbols (Symbolset in den Einstellungen auswählbar)                                                                                                                                                   |                 |
| `precipitation`               | Gesamtniederschlag der letzten Stunde                                                                                                                                                                               | mm/Zoll         |
| `rain`                        | Regenmenge der letzten Stunde                                                                                                                                                                                       | mm/Zoll         |
| `snowfall`                    | Schneefall letzte Stunde                                                                                                                                                                                            | cm              |
| `snow_depth`                  | Aktuelle Schneehöhe am Boden                                                                                                                                                                                        | cm              |
| `cloudcover`                  | Wolkendecke                                                                                                                                                                                                         | %               |
| `humidity`                    | Relative Luftfeuchtigkeit                                                                                                                                                                                           | %               |
| `dew_point`                   | Taupunkt – Temperatur, bei der die Luft gesättigt ist; nahe der Lufttemperatur = hohe Luftfeuchtigkeit                                                                                                              | °C/°F           |
| `pressure`                    | Der atmosphärische Druck wurde auf den mittleren Meeresspiegel (MSL) reduziert.                                                                                                                                     | hPa             |
| `visibility`                  | Horizontale Sichtweite                                                                                                                                                                                              | M               |
| `is_day`                      | `true` zwischen Sonnenaufgang und Sonnenuntergang                                                                                                                                                                   | boolescher Wert |
| `windspeed`                   | Windgeschwindigkeit (Einheit wählbar: km/h, m/s, mph, kn)                                                                                                                                                           | km/h …          |
| `windgusts`                   | Maximale Windböengeschwindigkeit                                                                                                                                                                                    | km/h …          |
| `winddirection`               | Windrichtung (meteorologisch: Richtung, aus der der Wind kommt)                                                                                                                                                     | °               |
| `winddirection_text`          | Text zur Himmelsrichtung                                                                                                                                                                                            | N/NO/…          |
| `winddirection_icon`          | Emoji der Himmelsrichtungen                                                                                                                                                                                         | ⬆️↗️…           |
| `winddirection_icon_url`      | Windrichtungspfeil-Symbol URL                                                                                                                                                                                       |                 |
| `windbeaufort`                | Windstärke auf der Beaufort-Skala (0 = Windstille, 8 = Sturm, 12 = Orkan)                                                                                                                                           | 0–12            |
| `windbeaufort_icon_url`       | Beaufort-Symbol-URL                                                                                                                                                                                                 |                 |
| `air_quality.*`               | Luftqualitätsindex, PM10, PM2,5, NO₂, CO, Staub, Ozon _(falls aktiviert)_                                                                                                                                           |                 |
| `pollen.*`                    | Aktueller Pollen pro Typ _(falls aktiviert)_                                                                                                                                                                        | Körner/m³       |
| `agriculture.solar_radiation` | Kurzwellige Sonneneinstrahlung am Boden _(falls aktiviert)_                                                                                                                                                         | W/m²            |
| `agriculture.cape`            | CAPE – Konvektive verfügbare potenzielle Energie: Energie, die für die Gewitterentwicklung zur Verfügung steht; > 500 J/kg = nennenswertes Risiko, > 2000 J/kg = schweres Risiko _(falls aktiviert)_                | J/kg            |
| `agriculture.soil_temp`       | Bodentemperatur in 0 cm Tiefe _(falls aktiviert)_                                                                                                                                                                   | °C/°F           |
| `comfort.heat_index`          | Hitzeindex (Rothfusz) – wie heiß es sich anfühlt, unter Berücksichtigung von Temperatur und Luftfeuchtigkeit; nur sinnvoll bei ≥ 27 °C und ≥ 40 % relativer Luftfeuchtigkeit,`null` andernfalls _(falls aktiviert)_ | °C/°F           |
| `comfort.windchill`           | Windchill (NWS) – wie kalt es sich aufgrund des Windes anfühlt; nur sinnvoll bei ≤ 10 °C und Windgeschwindigkeit > 4,8 km/h,`null` andernfalls _(falls aktiviert)_                                                  | °C/°F           |
| `comfort.humidex`             | Humidex (kanadische Formel) – kombinierter Hitze- und Feuchtigkeits-Beschwerdeindex; Werte über 40 sind unangenehm, Werte über 46 gefährlich _(falls aktiviert)_                                                    | °C/°F           |
| `comfort.humidex_level`       | Humidex-Beschwerdeniveau: 1 = keins (<29) · 2 = leicht (29–34) · 3 = spürbar (35–39) · 4 = stark (40–45) · 5 = gefährlich (≥46) _(falls aktiviert)_                                                                 | 1–5             |
| `comfort.uv_index`            | UV-Index (0–11+) – Intensität der UV-Strahlung am Boden _(falls aktiviert)_                                                                                                                                         |                 |
| `comfort.uv_level`            | UV-Schutzstufe (WHO-Skala):`low` (0–2, kein Schutz) ·`moderate` (3–5, Sonnenschutz) ·`high` (6–7) ·`very_high` (8–10) ·`extreme` (≥11) _(falls aktiviert)_                                                          |                 |

### Tagesvorhersage (`day1` …`day16` )

| Datenpunkt                                         | Beschreibung                                                                                                                                                      |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `date` /`weekday`                                  | Datum / Wochentag                                                                                                                                                 |
| `icon` /`icon_url`                                 | Wettersymbol (Tag-/Nachtvariante)                                                                                                                                 |
| `description`                                      | Wetterbeschreibung                                                                                                                                                |
| `temp_max` /`temp_min`                             | Temperatur max./min.                                                                                                                                              |
| `feels_like_max` /`feels_like_min`                 | Gefühlt Maximum/Minimum                                                                                                                                           |
| `weathercode`                                      | WMO-Wettercode                                                                                                                                                    |
| `precipitation`                                    | Niederschlagssumme                                                                                                                                                |
| `rain` /`snowfall`                                 | Regen / Schneefall                                                                                                                                                |
| `rain_probability`                                 | Niederschlagswahrscheinlichkeit                                                                                                                                   |
| `windspeed` /`windgusts`                           | Windgeschwindigkeit / maximale Windböen                                                                                                                           |
| `winddirection` /`_text` /`_icon` /`_icon_url`     | Windrichtung                                                                                                                                                      |
| `windbeaufort` /`windbeaufort_icon_url`            | Beaufort-Skala                                                                                                                                                    |
| `uv_index`                                         | Täglicher maximaler UV-Index _(unter Berücksichtigung der Bewölkung)_                                                                                             |
| `uv_index_clear_sky`                               | Täglicher maximaler UV-Index bei völlig klarem Himmel – nützlich, um das UV-Potenzial unabhängig von Bewölkung zu ermitteln.                                      |
| `sunshine_hours`                                   | Stunden tatsächlicher Sonnenscheindauer (direkte Strahlung)                                                                                                       |
| `daylight_hours`                                   | Gesamtstunden zwischen Sonnenaufgang und Sonnenuntergang                                                                                                          |
| `cloud_cover_max`                                  | Maximale Bewölkung im Laufe des Tages                                                                                                                             |
| `temp_mean` /`feels_like_mean`                     | Tägliche Durchschnittstemperatur / gefühlte Temperatur                                                                                                            |
| `precipitation_hours`                              | Anzahl der Stunden mit messbarem Niederschlag                                                                                                                     |
| `showers`                                          | Konvektiver (schauerartiger) Niederschlag – kurz, intensiv; unterscheidet sich von kontinuierlichem Niederschlag `rain`                                           |
| `snowfall_height_min`                              | Niedrigste Höhe am Tag, in der Schnee fällt (0 m = Schnee bis Talboden)                                                                                           |
| `freezing_level_height_min`                        | Niedrigste Höhe der 0 °C-Isotherme im Laufe des Tages                                                                                                             |
| `dew_point_mean` /`humidity_mean` /`pressure_mean` | Tagesmittelwerte                                                                                                                                                  |
| `air_quality.european_aqi_max` …`ozone_max`        | Tägliche Höchstwerte für AQI, PM10, PM2,5, NO₂, CO, Staub, Ozon _(falls aktiviert)_                                                                               |
| `astronomy.sunrise` /`astronomy.sunset`            | Sonnenaufgang / Sonnenuntergang _(falls aktiviert)_                                                                                                               |
| `astronomy.solar_noon`                             | Zeitpunkt des höchsten Sonnenstands _(falls aktiviert)_                                                                                                           |
| `astronomy.solar_elevation_max`                    | Sonnenwinkel über dem Horizont zur Mittagszeit – 90° = direkt über dem Horizont, 0° = Horizont _(falls aktiviert)_                                                |
| `astronomy.moon_phase_val`                         | Mondphase als Zahl: 0 = Neumond · 0,25 = erstes Viertel · 0,5 = Vollmond · 0,75 = letztes Viertel _(falls aktiviert)_                                             |
| `astronomy.moon_phase_text` /`_icon_url`           | Mondphase als Text / Symbol _(falls aktiviert)_                                                                                                                   |
| `astronomy.moonrise` /`astronomy.moonset`          | Mondaufgang / Monduntergang _(falls aktiviert)_                                                                                                                   |
| `agriculture.solar_radiation_sum`                  | Gesamte Sonneneinstrahlung, die im Laufe des Tages empfangen wird                                                                                                 |
| `agriculture.evapotranspiration`                   | FAO-56 Referenzverdunstung (ET₀) – Wassermenge, die Pflanzen und Boden abgeben; wird für die Bewässerungsplanung verwendet                                        |
| `agriculture.lifted_index_min`                     | Täglicher minimaler Lifted Index – atmosphärische Stabilität: negativ = instabil/Sturmrisiko, stark negativ (< −6) = Risiko schwerer Gewitter _(falls aktiviert)_ |
| `comfort.heat_index_max`                           | Maximaler Hitzeindex des Tages _(falls aktiviert)_                                                                                                                |
| `comfort.windchill_min`                            | Minimale Windchill-Temperatur des Tages _(falls aktiviert)_                                                                                                       |
| `comfort.humidex_max` /`.humidex_level`            | Maximaler Feuchtigkeitsgehalt / Unbehaglichkeitsgrad (1–5, siehe aktueller Abschnitt) _(falls aktiviert)_                                                         |
| `comfort.uv_index_max` /`.uv_level`                | Maximaler UV-Index / -Pegel (siehe aktuellen Abschnitt) _(falls aktiviert)_                                                                                       |
| `pollen.alder` …`pollen.ragweed`                   | Tägliche maximale Pollenkonzentration + Niveauangabe (Keine/Niedrig/Mittel/Hoch) _(falls aktiviert, nur Tag 1–4)_                                                 |

### Stündliche Werte (`day1.hourly.h00` …`h23` )

Temperatur, gefühlte Temperatur, Niederschlag, Regen, Schneefall, Schneehöhe, Schneefallhöhe, Regenwahrscheinlichkeit, Bewölkung, Luftfeuchtigkeit, Taupunkt, Luftdruck, Sichtweite, Tag, Windgeschwindigkeit, Windrichtung (Text/Emoji/Symbol), Beaufort, UV-Index, Höhe der Gefriergrenze, Wettercode, Symbol/Symbol-URL, Beschreibung.

Optional pro Stunde (falls aktiviert + "auch stündlich"):

| Kanal             | Datenpunkte                                                                                                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hXX.air_quality` | europäischer Luftqualitätsindex, PM10, PM2,5, NO₂, CO, Staub, Ozon                                                                                                         |
| `hXX.astronomy`   | Sonnenaufgang, Sonnenuntergang, Mondphasenwert/Text/Symbol-URL, Mondaufgang, Monduntergang                                                                                 |
| `hXX.agriculture` | Sonneneinstrahlung (W/m²), CAPE (J/kg), Bodentemperatur (°C/°F), Bestrahlungsstärke = globale geneigte Bestrahlungsstärke auf einer ebenen Fläche (W/m²), Lifted-Index (K) |
| `hXX.comfort`     | Hitzeindex, Windchill, Feuchtigkeitsindex, Feuchtigkeitsindex, UV-Index, UV-Level                                                                                          |
| `hXX.pollen`      | Erle … Ambrosia + Ebenentext (Keine/Niedrig/Mittel/Hoch)                                                                                                                   |

### Offizielle Warnungen (`warnings` )

| Datenpunkt                                | Beschreibung                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| `warnings.source`                         | Warndienst:`"DWD"` oder `"MeteoAlarm"`                                       |
| `warnings.active`                         | Mindestens eine aktive Warnung                                               |
| `warnings.count`                          | Anzahl aktiver Warnungen                                                     |
| `warnings.max_level`                      | Höchster Schweregrad: 1 = Geringfügig · 2 = Mittel · 3 = Schwer · 4 = Extrem |
| `warnings.max_level_text`                 | Schweregrad-Text                                                             |
| `warnings.warning_N.active`               | Warnungsschlitz N aktiv                                                      |
| `warnings.warning_N.event`                | Ereignistyp                                                                  |
| `warnings.warning_N.level` /`.level_text` | Schwere                                                                      |
| `warnings.warning_N.headline`             | Warnende Überschrift                                                         |
| `warnings.warning_N.description`          | Warnbeschreibung                                                             |
| `warnings.warning_N.start` /`.end`        | Gültigkeitszeitraum                                                          |

_(Wird nur erstellt, wenn „Offizielle Wetterwarnungen“ aktiviert sind und ein unterstütztes Land erkannt wird.)_

### Zusammenfassung & Widget

| Datenpunkt           | Beschreibung                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `current.summary`    | Wetterzusammenfassung in natürlicher Sprache für die aktuellen Bedingungen (11 Sprachen)                    |
| `dayX.summary_day`   | Tageswetterübersicht für den Vorhersagetag (11 Sprachen)                                                    |
| `dayX.summary_night` | Nachtwetterübersicht für den Vorhersagetag (11 Sprachen)                                                    |
| `weather_short`      | Kurzer Textüberblick über alle Vorhersagetage                                                               |
| `widget`             | Sofort einsatzbereiter HTML-Codeausschnitt für VIS / vis-2 / Dashboards (konfigurierbares Erscheinungsbild) |
| `info.lastUpdate`    | Zeitstempel der letzten erfolgreichen Aktualisierung                                                        |

## Bildnachweise

- **Meteocons** von [Bas Milius](https://github.com/basmilius/weather-icons) – MIT-Lizenz
- **amCharts-Wettersymbole** von [amCharts](https://www.amcharts.com/free-animated-svg-weather-icons/) – [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Meteorologische Symbole der WMO** von [OGC MetOcean DWG](https://github.com/OGCMetOceanDWG/WorldWeatherSymbols) – CC BY 4.0

## Haftungsausschluss

Dieser Adapter verwendet Daten von folgenden Drittanbietern:

- **[Open-Meteo](https://open-meteo.com)** – Wettervorhersagedaten. Name und Logo von Open-Meteo sind Eigentum ihrer jeweiligen Inhaber.
- **[DWD](https://www.dwd.de)** (Deutscher Wetterdienst) – offizielle Wetterwarnungen für Deutschland. Name und Daten des DWD sind Eigentum des Deutschen Wetterdienstes.
- **[MeteoAlarm](https://www.meteoalarm.org)** – offizielle Wetterwarnungen für europäische Länder. Name und Daten von MeteoAlarm sind Eigentum ihrer jeweiligen Inhaber.

Dieser Adapter ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu den oben genannten Diensten und wird von diesen auch nicht unterstützt.

## Changelog
### 0.2.0 (2026-09-08)
* (ipod86) feat: add animated, per-location WMO weather wallpaper (canvas rain/snow/fog/lightning/sun/moon animation), self-updating via a companion JSON file (no REST API needed), with a dedicated admin config tab, an optional location carousel, an independent live-update interval and an official warning banner
* (ipod86) feat: wallpaper sun/moon position and moon phase follow real astronomical data (SunCalc); rain/fog intensity and wind drift follow real weather data
* (ipod86) feat: add day/night split for precipitation/thunderstorm probability, wind, rain and snowfall amount
* (ipod86) fix: treat overlapping DWD warning time-shifts as an update instead of lift+new

### 0.1.16 (2026-08-17)
* (ipod86) fix: variable shadowing in fetchDwdWarnings caused every DWD official warning request to fail with "Cannot access 'raw' before initialization", silently freezing the affected warning states
* (ipod86) fix: guard the official warning update against a single hung request permanently stalling the recurring schedule

### 0.1.15 (2026-07-19)
* (ipod86) fix: sanitize widget.id through normalizeId before use as ioBroker object ID path

### 0.1.14 (2026-07-16)
* (ipod86) fix: persist warning dedup state across adapter restarts to prevent duplicate notifications on restart
* (ipod86) fix: deduplicate DWD warnings from combined warnings+vorabInformation API arrays (same event rounded to minute)

### 0.1.13 (2026-07-15)
* (ipod86) fix: add random jitter to daily and interval update scheduling to spread cloud load
* (ipod86) fix: validate warnIntervalMinutes — reset to 15 if < 1
* (ipod86) fix: remove orphaned i18n keys (iconPreviewAnimated, iconPreviewBasmilius, iconPreviewWmo, openmeteo adapter settings) from all 11 language files
* (ipod86) fix: warnIntervalMinutes default in admin WarningsPanel corrected to 15
* (ipod86) chore: bump @mui/material and @mui/icons-material to 9.x, TypeScript to 7.x, Vite to 8.1, suncalc to 2.0

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