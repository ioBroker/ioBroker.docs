---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.open-meteo-weather/README.md
title: ioBroker.open-meteo-weather
hash: CUXog9QvSkPBQN9JskDmgf5Ntnaf1R2WI3TJYPKP2lo=
---
![Logo](../../../en/adapterref/iobroker.open-meteo-weather/admin/open-meteo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.open-meteo-weather.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.open-meteo-weather.svg)
![Anzahl der Installationen](https://iobroker.live/badges/open-meteo-weather-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/open-meteo-weather-stable.svg)
![NPM](https://nodei.co/npm/iobroker.open-meteo-weather.svg?data=d)
![node-lts](https://img.shields.io/node/v-lts/iobroker.open-meteo-weather?style=flat-square)

# IoBroker.open-meteo-weather
![Test und Freigabe](https://github.com/H5N1v2/iobroker.open-meteo-weather/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Informationen und Anweisungen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Verwendung der Sentry-Berichterstattung beginnt mit js-controller 3.0.

Ich nutze meinen eigenen Sentry-Server, der auf Glitchtip basiert.

**Der Open-Meteo-Wetterdienstadapter für ioBroker.**

## Erstens: Wenn Sie ein Widget speziell für diesen Adapter suchen, dann erstellen Sie es mit [VIS2-Widget-Skript-om-Wetter](https://github.com/H5N1v2/VIS2-widget-script-om-weather).
Dieser Adapter liefert präzise Wetterdaten, Vorhersagen, Luftqualitäts- und Polleninformationen, bereitgestellt von [Open-Meteo.com](https://open-meteo.com/). Er ist für nichtkommerzielle Zwecke (bis zu 10.000 API-Aufrufe pro Tag) kostenlos und erfordert keine API-Schlüsselregistrierung, wodurch die Einrichtung extrem einfach ist.

---

## Merkmale
* **Aktuelle Wetterdaten:** Echtzeit-Abruf von Temperatur-, Feuchtigkeits-, Luftdruck- und Winddaten.
* **Flexible Prognosen:** Konfigurierbare Anzahl an Prognosetagen und stündliche Auflösung.
* **Luftqualität & Pollen:** Optionale Daten zu Feinstaub (PM2,5, PM10) sowie zu verschiedenen Pollenarten (Erle, Birke, Gras usw.).
* **Automatische Bereinigung:** Der Adapter bereinigt die Objektstruktur automatisch, wenn Prognosezeiträume verkürzt oder in der Konfiguration geändert werden.
* **Mehrsprachige Unterstützung:** Unterstützt 11 Sprachen (darunter Englisch, Deutsch, Polnisch, Russisch, Französisch, Chinesisch usw.).
* **Einheitensystem:** Nahtloses Umschalten zwischen metrischen (°C, km/h) und imperialen (°F, mph) Einheiten.
* **Mehrere Standorte:** Mehrere Standorte hinzufügen.
* **Nacht-Icons:** Sie können zwischen zwei Nacht-Icon-Sets wählen: „Hell“ und „Dunkel“. Dadurch lässt sich das Icon leichter an Ihren Hintergrund anpassen.

### Windrichtungssymbole
In den Adaptereinstellungen können Sie zwischen zwei verschiedenen Visualisierungsstilen für die Windrichtung wählen:

* Windrichtung (wohin der Wind weht): Dies ist die Standardeinstellung. Der Pfeil zeigt in die Richtung, aus der der Wind kommt. (Beispiel: Bei Nordwind zeigt der Pfeil nach Süden).

* Windursprung (woher der Wind kommt): Dieser Stil verwendet Symbole aus dem Unterordner direct_2. Der Pfeil zeigt die Windquelle an. (Beispiel: Ein Nordwind wird durch einen nach Norden zeigenden Pfeil oder ein spezifisches „Ursprungs“-Symbol dargestellt).

|Einstellungen | Symbolpfad | Verhalten |
|:---|:---|:---|
|Windrichtung (wohin der Wind weht) | /icons/wind_direction_icons/*.png | Zeigt zum Ziel |
|Windursprung (woher der Wind kommt) |/icons/wind_direction_icons/direct_2/*.png | Zeigt zum Ursprung |

### Luftqualitätsdaten
Der Adapter liefert aktuelle Luftqualitätsdaten und eine tägliche Vorhersage für die kommenden Tage (konfigurierbar für 1, 3 oder 6 Tage).

Effiziente Datenverarbeitung: Während die Open-Meteo-API lediglich stündliche Rohdaten liefert, aggregiert dieser Adapter diese Werte intelligent. Er berechnet automatisch die Tageshöchstwerte für alle Schadstoffe und Pollenkonzentrationen. So erhalten Sie die relevantesten Daten (Spitzenwerte der Belastung), ohne Ihre Datenbank mit Hunderten von stündlichen Datenpunkten zu überladen.

Merkmale:

* Tägliche Spitzenwerte: Erhalten Sie den höchsten erwarteten Wert für PM2,5, PM10, Ozon und verschiedene Pollenarten.

* Für Menschen lesbar: Die Pollenkonzentrationen werden automatisch beschreibenden Kategorien zugeordnet (z. B. „Keine“, „Niedrig“, „Mittel“, „Hoch“).

* Intelligente Bereinigung: Objekte für Vorhersagetage werden automatisch anhand Ihrer Einstellungen erstellt oder entfernt, um Ihre Objektstruktur übersichtlich zu halten.

---

## Konfiguration
Konfigurieren Sie nach der Installation die folgenden Felder in den Instanzeinstellungen:

1. **Ort:** Geben Sie hier Ihren Standort oder einen gewünschten Namen ein.
2. **Koordinaten (Breitengrad & Längengrad):** Geben Sie Ihre Koordinaten ein. Sie finden diese, indem Sie auf die Schaltfläche „Koordinaten mit OpenStreetMap finden“ klicken, oder lassen Sie die Felder leer, um die Systemkoordinaten zu verwenden.
3. **Zeitzone:** Stellen Sie die Zeitzone im Dropdown-Menü ein. Standardmäßig ist die Option „Auto“ ausgewählt, die sich automatisch an Ihre Koordinaten anpasst.
4. **Aktualisierungsintervall:** Zeitintervall in Minuten (Standard: 30 min).
5. **Vorhersagetage:** Anzahl der Tage für die tägliche Übersicht (0–16 Tage).
6. **Stündliche Vorhersage:** Aktivieren oder deaktivieren Sie diese Option und legen Sie die Anzahl der Stunden fest (z. B. die nächsten 24 Stunden). Beispielsweise ist Stunde 0 die aktuelle Stunde, Stunde 1 die nächste Stunde usw.
7. **Optionale Daten:** Kontrollkästchen für Pollen- und Luftqualitätsdaten.
8. **Einheiten:** Wählen Sie zwischen metrischen und imperialen Einheiten.

---

## Symbole & Visualisierung
Der Adapter stellt dynamische Symbolpfade bereit, die direkt in Visualisierungen wie **vis, iQontrol oder Jarvis** verwendet werden können.

* **Wettersymbole:** Zu finden unter `weather.current.icon_url`. Der Adapter unterscheidet automatisch zwischen Tag und Nacht (z. B. Sonne vs. Mond).
* **Windrichtung:** Statische Pfade unter `wind_direction_icon` zeigen einen Kompasspfeil entsprechend dem Gradwert an.
* **Warnung vor Windböen:** Bei Windgeschwindigkeiten über ca. 39 km/h (Bft 6) wird unter `wind_gust_icon` ein Warnsymbol angezeigt, das in Stufen von 0 bis 4 unterteilt ist.
* **Mondphasen-Symbole:** Unter `moon_phase_icon` finden Sie Mond-Symbole, die die Mondphasen anzeigen.

---

## Datenpunkte (Auszug)
| Ordner | Beschreibung |
|:---|:---|
| `air.current` | Luftqualität und Pollenbelastung als Text und Wert |
| `weather.current` | Aktuelle Messwerte (Temperatur, Taupunkt, Wind usw.) |
| `weather.forecast.dayX` | Tagesvorhersage für Tag X |
| `weather.forecast.hourly.hourX` | Stündliche Details pro voller Stunde |
| `info.lastUpdate` | Zeigt Datum und Uhrzeit der letzten Aktualisierung an |
| `info.lastUpdate` | Zeigt Datum und Uhrzeit der letzten Aktualisierung an |

---

## Aktualisierungshinweis
Nach einem neuen Adapter-Update wird empfohlen, den gesamten Verzeichnisbaum zu löschen und ihn neu erstellen zu lassen.

## Rechtliches & Urheberrecht
### Symbole & Bilder
Die in diesem Adapter enthaltenen Wetter- und Windrichtungssymbole unterliegen dem Urheberrecht des Urhebers.

* **Nutzung:** Diese Icons sind für die Verwendung innerhalb von ioBroker lizenziert. Kommerzielle Weiterverbreitung oder Verwendung außerhalb dieses Adapters bedarf der ausdrücklichen Zustimmung des Autors: h5n1@iknox.de.
* **Wetterdaten:** Alle Wetterdaten werden von [Open-Meteo.com](https://open-meteo.com/) bereitgestellt. Bitte beachten Sie deren Nutzungsbedingungen für kommerzielle Zwecke.

## Changelog
### 2.6.4 (2026-03-30)
* (H5N1v2) Update axios dependency to version 1.14.0

### 2.6.3 (2026-03-26)
* (H5N1v2) add sentry plugin to automatically report errors to developer

### 2.6.2 (2026-03-25)
* (H5N1v2) update @types/node dependency to version 22.19.15

### 2.6.1 (2026-03-04)
* (H5N1v2) chore: update dependencies to latest versions
* (mcm1957) fix: axios seems to be missing in dependencies
* (mcm1957) fix: language used for stateIds and names
* (mcm1957) fix: creation of intermediate objects missing

### 2.6.0 (2026-02-19)
* (H5N1v2) feat: Leave latitude and longitude empty to use system coordinates in settings. 
* (H5N1v2) feat: Added dropdown menu for timezones in settings.

[OLDER CHANGELOG](CHANGELOG_OLD.md)

## License
This project is licensed under the **MIT License** - see the `LICENSE` file for details.

Copyright (c) 2026 H5N1v2 <h5n1@iknox.de>