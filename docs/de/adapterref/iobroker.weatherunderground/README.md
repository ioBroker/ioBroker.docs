---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.weatherunderground/README.md
title: ioBroker.weatherunderground
hash: ohFwfLftqLWdBaZcoyeWiFGb/DqV2snCxGgu+Vbb4C4=
---
![Logo](../../../en/adapterref/iobroker.weatherunderground/admin/wu.png)

![Anzahl der Installationen](https://iobroker.live/badges/weatherunderground-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.weatherunderground.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.weatherunderground/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/weatherunderground/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.weatherunderground.svg)

# ioBroker.weatherunderground

> \[!IMPORTANT] Dieser Adapter kann nicht von GitHub installiert werden.

## Sentry

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Funktionalität

Aktuelle Stationsmessungen, bis zu 36 stündliche Vorhersagen und sechs tägliche Vorhersagen von [Weather Underground](https://www.wunderground.com/) , mit optionalen regionalen Wetter- und Luftqualitätsdaten von Weather Company.

Die Daten werden standardmäßig einmal pro Stunde abgerufen. Ändern Sie den Instanzzeitplan, um die Häufigkeit anzupassen.

## Anforderungen

Die aktuelle Entwicklungsversion erfordert Node.js **22+** , js-controller **6.0.11+** und Admin **8.2.0+** .

## Konfiguration

PWS steht für **„Personal Weather Station“** und bezeichnet eine private Wetterstation. Stationsmessungen beschreiben das beobachtete Wetter; Vorhersagen beschreiben das erwartete Wetter.

### Datenschalter

| Schlüssel              | Standard | Daten- und Staatskennungen                                                                                                                                                                                                                                                                                               |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `current`              | `true`   | Stationstemperatur, Luftfeuchtigkeit, Wind, Luftdruck, Niederschlag, UV-Strahlung, Sonneneinstrahlung und Qualitätskontrolle unter `forecast.current.*` Die                                                                                                                                                               |
| `regionalCurrent`      | `false`  | **Zusätzliche Wetter- und Luftqualitätsdaten** von Weather Company: Wetterbeschreibung, Symbol, Sichtweite und Luftqualität für die Umgebung. Erforderlich `current: true` Gültige Stationskoordinaten und der Website-Schlüssel. Verwendet `forecast.current.*` und summiert sich auf bis zu drei Anfragen pro Durchlauf. |
| `forecast_hourly`      | `true`   | Bis zu 36 stündliche Einträge unter `forecastHourly.0h` –`forecastHourly.35h`, plus zusammenfassende Zustände.                                                                                                                                                                                                           |
| `forecast_periods`     | `true`   | Sechs Kalenderdaten unter `forecast.0d` –`forecast.5d`, beginnend mit heute.                                                                                                                                                                                                                                             |
| `forecast_periods_txt` | `true`   | Bis zu 12 aufeinanderfolgende Tag-/Nacht-Zeiträume für Text und Symbole unter `forecastPeriod.0p` –`forecastPeriod.11p` Teilt die tägliche Reaktion mit `forecast_periods` Die                                                                                                                                             |

### Standort und Anzeige

| Schlüssel              | Bedeutung                                                                                                                                                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `country`              | Zweistelliger Ländercode für die Standortsuche; Standard `DE` Die                                                                                                                                                                            |
| `language`             | Wettertextsprache: `DL` Deutsch, `EN` Englisch, `RU` Russisch oder `NL` Niederländisch. Unabhängig von der Sprache der Administratoroberfläche.                                                                                                 |
| `location`             | Standortname, Flughafencode oder Koordinaten. Ein leerer Anfangsstandort wird, sofern verfügbar, anhand der Koordinaten des ioBroker-Systems ausgefüllt.                                                                                    |
| `station`              | Optionale bevorzugte Sender-ID. Ist das Feld leer, wählt der Anbieter einen Sender für den Standort aus. Das Feld wird angezeigt, wenn…`current` ist aktiviert.                                                                             |
| `nonMetric`            | `false` für metrische Werte; `true` Für imperiale Einheiten wie °F und Meilen. Beim Initialisieren eines leeren Speicherorts übernimmt der Dialog die Systemtemperatureinheit. Luftqualitätskonzentrationen werden immer in µg/m³ angegeben. |
| `iconSet`              | Versteckte Kompatibilitätseinstellung. A–K verwenden dieselben v4-SVG-Symbole, wenn keine benutzerdefinierte URL konfiguriert ist.                                                                                                          |
| `custom_icon_base_url` | Optionale Basis-URL für numerische Symboldateien. Eine nicht leere URL aktiviert benutzerdefinierte Symbole; lassen Sie das Feld für Standardsymbole leer.                                                                                  |
| `custom_icon_format`   | Benutzerdefinierte Dateiendung: GIF, PNG, SVG oder JPG; standardmäßig wird GIF verwendet, falls nicht angegeben.                                                                                                                            |

Versteckte Einstellungen behalten ihre gespeicherten Werte. Die Dialoge gruppieren Land/Sprache und Ort/Sender.

### API-Schlüssel

`apiKey` ist ein optionaler PWS-Besitzerschlüssel, der verschlüsselt gespeichert und vor dem Zugriff durch externe Adapter geschützt ist. Vorhandene Schlüssel werden automatisch migriert; siehe [API-Schlüssel-Upgrades](#api-key-upgrades) .

Der Adapter liest auch den Schlüssel, der von der Webseite Weather Underground verwendet wird:

- Stationsbeobachtungen verwenden den Besitzerschlüssel, wenn eine Station und `current` sind konfiguriert; andernfalls verwenden sie den Website-Schlüssel.
- Die täglichen Vorhersagen verwenden, sofern verfügbar, die Stationskoordinaten mit dem Eigentümerschlüssel oder andernfalls den Website-Schlüssel. Sind keine Stationskoordinaten vorhanden, wird die extrahierte Website-URL/der extrahierte Website-Schlüssel verwendet.
- Für stündliche Prognosen und regionale Produkte wird der Website-Schlüssel verwendet, auch wenn ein Eigentümerschlüssel konfiguriert ist.

Die Verfügbarkeit von Schlüsseln und Produkten wird vom Anbieter gesteuert.

Ohne konfigurierte Stations-ID verwendet der Adapter die Stations- und Orts-ID der Website für den konfigurierten Standort, um die Produkt-URLs zu erstellen. Sind die benötigten Produkt-URLs nicht verfügbar, werden Datenanfragen übersprungen und pro geplantem Lauf ein Fehler protokolliert. Überprüfen Sie den konfigurierten Standort oder wählen Sie eine PWS-Stations-ID aus.

## Datenquellen und Anfragen

Die direkten Produktendpunkte verwenden `https://api.weather.com`:

| Endpunkt                       | Angefordert, wenn                                                                                       | Bietet                                                                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `/v2/pws/observations/current` | Jeder Akquisitionslauf, einschließlich wann `current` ist aus                                            | Stationsbeobachtungen und Koordinaten, die für Vorhersagen benötigt werden. `current` kontrolliert die Veröffentlichung der Messwerte. |
| `/v3/wx/forecast/daily/5day`   | `forecast_periods` oder `forecast_periods_txt` ist an                                                    | Sechs Kalenderdaten und ihre Tag-/Nacht-Perioden.                                                                                     |
| `/v3/wx/forecast/hourly/2day`  | `forecast_hourly` ist an                                                                                | Stündliche Daten; der Adapter veröffentlicht die ersten 36 Einträge.                                                                  |
| `/v3/wx/observations/current`  | `current` Und `regionalCurrent` sind eingeschaltet, mit gültigen Koordinaten und einem Website-Schlüssel | Regionale Wetterbeschreibung, Symbol und Sichtverhältnisse.                                                                           |
| `/v3/location/point`           | Gleiche regionale Voraussetzungen                                                                       | A `placeId` für die Stationskoordinaten, die für die Luftqualitätsanfrage verwendet werden.                                            |
| `/v3/wx/globalAirQuality`      | Die Standortauflösung lieferte ein gültiges Ergebnis. `placeId`                                          | EPA-Luftqualitätsindex, Empfehlungen und Details zu sechs Schadstoffen.                                                               |

Ist der direkte Pfad zu Station/Koordinaten nicht verfügbar, verwendet der Adapter Anbieter-URLs, die von der Weather Underground-Seite extrahiert werden. Regionale Produkte nutzen die Koordinaten aus der Stationsantwort und können eine andere Quelle und einen anderen Beobachtungszeitpunkt als die Stationsmessungen darstellen.

### Reduzierung der Anfragen

- Halten `regionalCurrent` Ich wollte allen drei regionalen Anfragen ausweichen.
- Drehen `forecast_hourly` Ich habe mich abgemeldet, um der stündlichen Anfrage zu entgehen.
- Schalten Sie **beide ein** `forecast_periods` Und `forecast_periods_txt` Ich gehe jetzt, um der täglichen, gemeinsamen Anfrage zu entgehen.
- Abbiegen `current` Die Option „off“ stoppt die Aktualisierung des Stationsstatus und verhindert regionale Anfragen, die Stationsanfrage zur Ermittlung der Vorhersagekoordinaten wird jedoch weiterhin ausgeführt.

Ein erfolgreicher Direktlauf mit aktivierten Prognosen benötigt drei Produktanfragen: Stations-, Tages- und Stundendaten. Regionale Daten erfordern drei weitere Anfragen; ein Standortfehler verhindert die nachfolgende Luftqualitätsanfrage. Website-/Schlüsselermittlung, Wiederholungsversuche und Wiederherstellung können zusätzliche HTTP-Anfragen auslösen.

## Staatsbezug

| Staaten                                                                    | Bedeutung                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forecast.current.*`                                                       | Aktuelle Beobachtungen trotz der historischen `forecast` Präfix. Temperatur, Luftfeuchtigkeit, Wind und Niederschlag stammen von der Station. `qualityControl` ist sein Rohcode zur Qualitätskontrolle.                                               |
| `forecast.current.weather`, `.iconURL`, `.visibility`                      | Optionale regionale Wetterbeschreibung, URL mit numerischem Code-Symbol und Sichtbarkeit.                                                                                                                                                           |
| `forecast.current.airQualityIndex`                                         | Optionaler numerischer EPA-Index ohne physikalische Einheit. Kategorie, Hauptschadstoff, Quelle und allgemeine/schutzbedürftige Personengruppenhinweise sind separate Angaben.                                                                      |
| `forecast.current.airQuality.CO`, `.NO2`, `.O3`, `.PM10`, `.PM2_5`, `.SO2` | Jeder Schadstoff hat `amount` in µg/m³, seine EPA `index` Und `category` Hierbei handelt es sich um regionale Produkte, nicht um Stationsmessungen.                                                                                                    |
| `forecastHourly.0h` –`forecastHourly.35h`                                  | Stundenwerte einschließlich `windGust`, `dewPoint`, `windChill`, `stateShort` Und `precipitationType` (Zum Beispiel `rain` oder `snow`). `0h` bedeutet **nächste stündliche Vorhersage** , der erste API-Eintrag; prüfen `.time` für seinen Zeitstempel. |
| `forecast.0d` –`forecast.5d`                                               | Tageswerte einschließlich vollständiger Erzählung `.state` Kurzbeschreibung `.stateShort`, `sunrise`, `sunset`, `moonrise`, `moonset` Und `moonPhase` Die Sonnen-/Mondzeiten erhalten den UTC-Offset des Anbieters.                                    |

Täglicher Kurztext, Erzählung und Symbol beziehen sich auf denselben Tages- oder verbleibenden Nachtzeitraum. Beschreibungen folgen. `language` Regionale Beschreibungen ersetzen keine Stationsmessungen, und Vorhersagen ersetzen keine aktuellen Beobachtungen. Bestehende IDs und benutzerdefinierte Objektnamen bleiben erhalten.

### Fehlende Daten und deaktivierte Optionen

- Fehlend oder `null` Station UV- und Sonnenstrahlung erzeugen `0` Die
- Fehlende oder ungültige regionale Werte erzeugen `null` Regionale Felder sind ebenfalls frei für `null` wenn Stationsbeobachtungen verarbeitet werden `regionalCurrent` Aus. Optionale regionale Ausfälle führen nicht zum Verlust von Stationsmessungen oder -vorhersagen.
- Ohne eine auswertbare Stationsbeobachtung können die bestehenden Stromwerte unverändert bleiben.
- Deaktivierte Schalter behalten ihre Objekte und zuvor gespeicherten Werte; sie löschen keine historischen Daten. Die regionale Datenlöschung erfolgt nach der oben genannten Regel.

## Symbole

Die aktuelle API gibt numerische Codes zurück. Gespeicherte integrierte A–K-Einstellungen verwenden alle dieselben v4-SVG-Symbole, z. B. [32.svg](https://www.wunderground.com/static/i/c/v4/32.svg) . Der redundante Selektor ist ausgeblendet. Geben Sie eine benutzerdefinierte Basis-URL ein, um Ihre eigenen Symbole zu verwenden, oder entfernen Sie das Feld, um Standardsymbole zu verwenden.

Die Felder für benutzerdefinierte URL und Format sind immer bearbeitbar, unabhängig von den gespeicherten Einstellungen. `iconSet` Vorhandene, nicht leere benutzerdefinierte URLs haben Vorrang vor den A–K-Einstellungen. Zum Beispiel: Basis-URL `https://example.com/weather-icons/` und PNG-Format-Auflösungscode `32` Zu `https://example.com/weather-icons/32.png` Der Host muss für jeden vom Provider zurückgegebenen Code Dateien bereitstellen; Vorschau-Codes `0`, `12`, `26` Und `32` sind nur Beispiele.

Legacy benannte Symbole wie zum Beispiel `clear.gif` Und `nt_clear.gif` Die numerischen Codes stimmen nicht überein. Der Adapter übersetzt diese Codes nicht in die entsprechenden Dateinamen; alte A–K-Verzeichnisse eignen sich nicht als benutzerdefinierte Basen für die aktuelle API.

## API-Schlüssel-Upgrades

Ältere Versionen speicherten den Schlüssel im Klartext. `apikey` Der Adapter verwendet nun verschlüsselte/geschützte Daten. `apiKey` Beim ersten Start oder beim Speichern der Einstellungen wird der alte Wert übertragen und `apikey` ist gelöscht; Wetteranfragen warten auf den Abschluss einer Startmigration. Vorhandene nichtleere `apiKey` Die Werte bleiben erhalten. Falls beide Felder unterschiedliche, nicht leere Schlüssel enthalten, wird keines der Felder automatisch verworfen; Migrationsfehler stoppen die Anfragen und protokollieren eine Meldung ohne Schlüsselwerte.

Bis zum ersten Start/Speichern behält das Legacy-Feld sein altes Verhalten beim Speichern und Zugreifen auf Klartext bei. Deaktivierte Instanzen werden nur beim Start oder Speichern migriert. Öffnen Sie die Einstellungen nach einem Adapter-Upgrade neu, anstatt einen alten Dialog zu speichern.

Erstellen Sie vor dem Upgrade eine ioBroker-Sicherung. Um auf eine Version zurückzukehren, die nur Lesezugriffe ermöglicht, …`apikey` Stellen Sie auch die zugehörige Konfigurationssicherung wieder her. Manuell verschlüsselte Schlüssel aus modifizierten/unveröffentlichten Versionen benötigen ihre ursprünglichen Verschlüsselungsmetadaten und können nach dem Überschreiben dieser Metadaten nicht mehr zuverlässig identifiziert werden.

## Entwicklungsversion

Für die Quellcode-Erstellung wird Node.js **22.12 oder höher** innerhalb des unterstützten Laufzeitbereichs benötigt; Vite hat höhere Mindestanforderungen als die Adapter-Laufzeitumgebung. CI-Prüfungen/Erstellung erfolgen mit Node.js 24, Tests mit 22/24/26.

```sh
npm ci
npm run build
npm test
npm pack
```

Admin-Quellen befinden sich in `admin/src/` Generiert `admin/custom/` Dateien werden von Git ignoriert und dürfen nicht committet werden. Vor dem Testen, Packen oder Hochladen kompilieren; normal `npm pack` wird nicht automatisch erstellt. Das veröffentlichte npm-Paket enthält die UI-Assets, und `prepublishOnly` Erstellt sie für die Veröffentlichung neu. Bei einer Quellcode-/Git-Installation installieren Sie das erstellte Tarball über ioBroker; ein nicht erstelltes Checkout generiert keine Konfigurations-UI.

## Changelog

### **WORK IN PROGRESS**
- (reloxx13) Remove the disabled legacy API, dashboard key extraction and obsolete parser
- (copilot) Adapter requires node.js >= 22.19.0 now
- (reloxx13) Fix location-based website URL discovery and avoid cascading errors when required URLs are unavailable (#509)
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.1 (2026-10-26)
- (reloxx13) Use the controller-managed startup delay instead of a custom wait function

### 4.0.0 (2026-10-26)
- (reloxx13) Use adapter-managed timers and termination while preserving cancellation during shutdown
- (mcm1957) Adapter requires Node.js >= 22, Admin >= 8.2.0 and js-controller >= 6.0.11 now
- (reloxx13) Read the website API key from the current Weather Underground page configuration (#509)
- (reloxx13) Request daily forecasts using station coordinates and the website key when no owner key is configured (#509)
- (reloxx13) Add opt-in regional weather descriptions, icons, visibility and detailed EPA air quality without replacing station measurements (#220, #388)
- (reloxx13) Add hourly gust, dew point, wind chill, weather text and precipitation type; daily sun/moon events and PWS quality status
- (reloxx13) Add short daily descriptions while preserving full narratives and consistent day/night selection (#388)
- (reloxx13) Match maximum-wind direction to the highest wind speed and preserve its numeric type
- (reloxx13) Show zero UV index and solar radiation when station fields are missing or null
- (reloxx13) Fix numeric icon URLs and previews; select custom icons by URL and correct existing icon URL object types without replacing user metadata (#216)
- (reloxx13) Rename the first hourly forecast to "Next hourly forecast" while preserving its 0h ID and custom names
- (reloxx13) Correct weather state roles without changing IDs, types, units or user metadata (#328)
- (reloxx13) End failed initialization reliably and cancel startup delays and provider requests during shutdown (#224)
- (reloxx13) Automatically migrate API keys to encrypted and protected storage
- (reloxx13) Replace the legacy settings dialog with JSON Config; clarify translated labels, help texts and field grouping
- (reloxx13) Document configuration switches, data sources, endpoints, request savings, API keys and source builds; correct the default refresh interval to once per hour (#501)
- (reloxx13) Fix hourly forecast requests, station coordinates and metric/non-metric provider paths (#497)
- (reloxx13) Skip the unused PWS dashboard request (#498)
- (reloxx13) Populate hourly weather codes, including zero (#499)
- (reloxx13) Use calendar-day minimum and maximum forecast temperatures (#500)
- (reloxx13) Limit the npm package to runtime and configuration assets and enable shared ESLint checks in CI

### 3.7.0 (2024-04-13)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.6.0 (2023-09-09)
* (mcm1957) Icon urls at admin ui have been adapted to weatherunderground website changes (#158)
* (mcm1957) Forecast periods have been extended

### 3.5.0 (2023-09-08)
* (mcm1957) Adapter now requires node 16 or newer
* (mcm1957) Dependencies have been updated
* (waldmensch1) Cloudcover states have been added (PR #178)
* (mcm1957) Date format has been fixed to avoid incorrect display with newer admin versions (#191)
* (mcm1957) Forecast urls have been adapted to weatherunderground website changes (#158)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 dschaedl <daniel.schaedler@gmail.com>, iobroker-community-adapters

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