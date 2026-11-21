---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.millheater/README.md
title: ioBroker.millheater
hash: U5XLjGZGXd3SoIlA5Cb/rArKZcji+eLaoDehnSCP6HE=
---
![Logo](../../../en/adapterref/iobroker.millheater/admin/millheater.png)

![Anzahl der Installationen](https://iobroker.live/badges/millheater-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/millheater-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.millheater.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.millheater.svg)
![Test und Freigabe](https://github.com/webbummler/ioBroker.millheater/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.millheater

## Um

Der `millheater` Der Adapter integriert Mill-Heizgeräte in ioBroker mithilfe der lokalen API des Heizgeräts.

Der Adapter ist für die intelligente Heizungsautomatisierung konzipiert. Er liefert die Werte und Steuerfunktionen, die zum Betrieb von Mill-Geräten von ioBroker benötigt werden, beispielsweise um überschüssigen Photovoltaikstrom (PV) zum Heizen zu nutzen.

Wählen Sie dazu Folgendes aus:** `Control individually` ** als Betriebsmodus des Heizgeräts. In diesem Modus folgt das Heizgerät der von ioBroker festgelegten Zieltemperatur anstelle seines Wochenprogramms oder der Timer. Je nach Heizgerättyp kann ioBroker auch die verfügbare Heizleistung anpassen. Dadurch ist es beispielsweise möglich, überschüssigen PV-Strom zum Heizen zu nutzen, indem die Heizleistung automatisch an den verfügbaren Überschuss angepasst wird.

Der Adapter kommuniziert direkt über das lokale Netzwerk mit dem Heizgerät. Für die Kommunikation zwischen ioBroker und dem Heizgerät ist keine Cloud-Verbindung erforderlich.

Der Adapter unterstützt derzeit Millheat-Heizgeräte der Generation 3.

## Merkmale

- Lokale Kommunikation mit Mill-Geräten; keine Cloud-Verbindung erforderlich
- Mehrere Mill-Geräte in einer Adapterinstanz verwalten
- Unterstützung für Konvektions-, Öl- und Paneelheizungen sowie WLAN-Steckdosen
- Automatische Erkennung des angeschlossenen Gerätetyps
- Geräteidentifizierung und Austauscherkennung anhand der MAC-Adresse
- Separater Status und separate Steuerung für jedes Gerät
- Raumtemperatur, Heizleistung und Gerätestatus
- Einstellen der Zieltemperatur und des Betriebsmodus
- Ablesen und Ändern der Temperaturkalibrierung
- Gerätespezifische Leistungsregelung für Öl- und Plattenheizungen
- Zusätzliche Modussteuerung für WLAN-Steckdosen
- Schnelle und langsame Abfrageintervalle trennen
- Optionale Abfrage bei ausgeschalteter Heizung
- Verbindungsstatus für jedes Gerät
- Geeignet für externe Automatisierung, einschließlich PV-Überschusssteuerung

## Anforderungen

- ioBroker
- Unterstützte Mill-Geräte der 3. Generation mit verfügbarer lokaler API
- Die Mill-Geräte und ioBroker müssen über das lokale Netzwerk erreichbar sein.
- Node.js 22 oder neuer, vorbehaltlich der Anforderungen der installierten ioBroker-Version

## Konfiguration

Konfigurieren Sie die Mill-Geräte in der Geräteliste des Adapters. Geben Sie für jedes Gerät die IP-Adresse oder den Hostnamen ein. Mehrere Geräte können von einer einzelnen Adapterinstanz verwaltet werden.

Verwenden Sie eine feste IP-Adresse, eine DHCP-Reservierung oder einen Hostnamen, der zum Gerät aufgelöst wird. Wenn ein Gerät eine neue IP-Adresse erhält, aktualisieren Sie seine konfigurierte Adresse. Die MAC-Adresse dient zur Identifizierung des physischen Geräts unabhängig von seiner Netzwerkadresse.

### Konfigurationsparameter

| Parameter                  | Beschreibung                                                              | Standard |
| -------------------------- | ------------------------------------------------------------------------- | -------: |
| Geräteadresse              | IP-Adresse oder Hostname jedes Mill-Geräts                                |        — |
| HTTP-Timeout               | Maximale Wartezeit für eine API-Antwort in Sekunden                       |        5 |
| Schnelles Abfrageintervall | Aktualisierungsintervall für häufig wechselnde Werte in Sekunden          |       30 |
| Langsames Abfrageintervall | Aktualisierungsintervall für Werte, die sich seltener ändern, in Sekunden |    86400 |
| `pollWhenOff`              | Die Umfrage wird fortgesetzt, während die Heizung ausgeschaltet ist.      |        — |

Timeout- und Abfrageintervalle müssen ganze Zahlen sein. Der Adapter überprüft die Werte in der Admin-Oberfläche und erneut beim Start.

- HTTP-Timeout: 1 bis 60 Sekunden
- Schnelles Abfrageintervall: Mindestens HTTP-Timeout plus 1 Sekunde; maximal 3.600 Sekunden (1 Stunde)
- Langsames Abfrageintervall: Mindestens das schnelle Abfrageintervall zuzüglich des HTTP-Timeouts; maximal 86.400 Sekunden (24 Stunden)

### Umfrage bei ausgeschalteter Heizung

Der `pollWhenOff` Diese Option legt fest, ob der Adapter weiterhin die Heizungen abfragt, während diese ausgeschaltet sind.

- **Aktiviert:** Die Abfrage wird fortgesetzt, auch wenn die Heizung ausgeschaltet ist. Dies ist sinnvoll, wenn die Heizung auch außerhalb von ioBroker ein- oder ausgeschaltet werden kann.
- **Deaktiviert:** Sobald der Adapter erkennt, dass eine Heizung ausgeschaltet ist, wird die Abfrage dieser Heizung gestoppt. Schalten Sie die Heizung in diesem Modus über den Adapter wieder ein. Ein externes Einschalten wird nicht erkannt, solange die Abfrage gestoppt ist.

Dies ist beabsichtigt. Die Deaktivierung der Abfrage im ausgeschalteten Zustand ist für Installationen vorgesehen, bei denen der Adapter die Heizung steuert. Aktivieren Sie diese Option, wenn eine externe Steuerung erforderlich ist.

## Unterstützte Heizgerätetypen

Der Adapter unterstützt die folgenden Gerätetypen der Mill Generation 3:

- Konvektionsheizungen
- Ölheizungen
- Paneelheizkörper
- WLAN-Steckdosen

Der Adapter erkennt den Gerätetyp anhand der von der Mill-API gemeldeten Informationen und stellt gegebenenfalls die entsprechenden gerätespezifischen Einstellungen bereit.

### Ölheizungen

Ölheizungen liefern den beschreibbaren Zustand `settings.heating_level_percentage`:

|  Wert | Heizniveau |
| ----: | ---------- |
|  `40` | 40 %       |
|  `60` | 60 %       |
| `100` | 100 %      |

Die Einstellung steuert den ausgewählten Prozentsatz der Nennleistung des Heizgeräts und kann durch ioBroker-Automatisierung entsprechend dem verfügbaren PV-Überschuss angepasst werden.

### Paneelheizkörper

Paneelheizungen bieten den beschreibbaren Zustand `settings.limited_heating_power` Es akzeptiert ganzzahlige Werte von `10` Zu `100` und legt die maximal verfügbare Heizleistung als Prozentsatz fest.

### WLAN-Steckdosen

Wi-Fi-Anschlüsse bieten den beschreibbaren Zustand `settings.additional_mode` Es akzeptiert ganzzahlige Werte von `0` Zu `4` Die

## Betriebsarten

Der `control-status.operation_mode` Der Status unterstützt folgende Werte:

| Wert                   | Beschreibung                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `Off`                  | Das Gerät ist ausgeschaltet.                                                                         |
| `Weekly program`       | Die Heizung folgt ihrem wöchentlichen Zeitplan.                                                      |
| `Independent device`   | Unabhängiger Betrieb der Heizung                                                                     |
| `Control individually` | Die Heizung hält die individuelle Zieltemperatur ohne Verwendung von Timern oder dem Wochenprogramm. |

Zur Steuerung durch ioBroker, insbesondere für die Automatisierung von PV-Überschussstrom, verwenden Si&#x65;** `Control individually` ** Dadurch kann ioBroker die Zieltemperatur und die gerätespezifische Heizleistung anpassen, ohne dass das Wochenprogramm oder die Timer des Heizgeräts stören.

Eine PV-Überschussregelung kann beispielsweise die verfügbare Überschussleistung nutzen, um ein geeignetes Heizniveau auszuwählen:

- Geringer PV-Überschuss → niedrigeres Heizniveau
- Höherer PV-Überschuss → höheres Heizniveau
- Kein relevanter PV-Überschuss → Heizniveau kann wieder reduziert werden

## Geräteidentifizierung

Der Adapter verwendet die MAC-Adresse, um jedes physische Mill-Gerät zu identifizieren. Die IP-Adresse oder der Hostname dient der Kommunikation mit dem Gerät; er ist nicht dessen Identität.

- Dieselbe MAC-Adresse identifiziert dasselbe physische Gerät, auch wenn sich dessen konfigurierte IP-Adresse ändert.
- Eine abweichende MAC-Adresse an einer konfigurierten Adresse wird als ein anderes Gerät behandelt.
- Zuvor bekannte Geräte können anhand ihrer MAC-Adresse wiedererkannt werden.
- Falls eine MAC-Adresse fehlt oder ungültig ist, wird eine bereits festgelegte Geräteidentität beibehalten.

Der Adapter scannt das Netzwerk nicht automatisch nach Geräten mit unbekannten Adressen. Wenn sich die IP-Adresse eines Geräts ändert, aktualisieren Sie dessen Adresse in der Geräteliste. Die MAC-Adresse ermöglicht es dem Adapter dann, das Gerät korrekt zu erkennen.

## Datenpunkte

Der Adapter erstellt für jedes konfigurierte Mill-Gerät einen separaten Datenpunktbaum. Für jedes Gerät stehen die folgenden Gruppen zur Verfügung. Gerätespezifische Einstellungen sind nur für den jeweiligen Gerätetyp verfügbar.

```text
millheater.0
├── <device 1>
│   ├── info
│   │   └── connection
│   ├── status
│   │   ├── name
│   │   ├── custom_name
│   │   ├── version
│   │   ├── operation_key
│   │   └── mac_address
│   ├── control-status
│   │   ├── ambient_temperature
│   │   ├── connected_to_cloud
│   │   ├── control_signal
│   │   ├── current_power
│   │   ├── lock_active
│   │   ├── open_window_active_now
│   │   ├── operation_mode
│   │   ├── raw_ambient_temperature
│   │   ├── set_temperature
│   │   └── switched_on
│   └── settings
│       ├── additional_mode
│       ├── heating_level_percentage
│       ├── limited_heating_power
│       └── temperature_calibration_offset
└── <device 2>
    └── ...
```

### `info`

| Zustand      | Beschreibung                                | Lesen | Schreiben |
| ------------ | ------------------------------------------- | :---: | :-------: |
| `connection` | Lokaler API-Verbindungsstatus dieses Geräts |   ✓   |           |

### `status`

| Zustand         | Beschreibung                                                        | Lesen | Schreiben |
| --------------- | ------------------------------------------------------------------- | :---: | :-------: |
| `name`          | Vom API gemeldeter Gerätename oder Gerätemodell                     |   ✓   |           |
| `custom_name`   | Benutzerdefinierter Gerätename                                      |   ✓   |           |
| `version`       | API- oder Firmware-Versionsinformationen                            |   ✓   |           |
| `operation_key` | Betriebs- oder Fehlerinformationen, die von der API gemeldet werden |   ✓   |           |
| `mac_address`   | MAC-Adresse des Geräts                                              |   ✓   |           |

### `control-status`

| Zustand                   | Beschreibung                                                        | Einheit | Lesen | Schreiben |
| ------------------------- | ------------------------------------------------------------------- | ------- | :---: | :-------: |
| `ambient_temperature`     | Aktuelle Umgebungstemperatur einschließlich Kalibrierungsabweichung | °C      |   ✓   |           |
| `connected_to_cloud`      | Zeigt an, ob das Gerät mit der Mill-Cloud verbunden ist.            |         |   ✓   |           |
| `control_signal`          | Aktuelles Steuersignal des PID-Reglers                              | %       |   ✓   |           |
| `current_power`           | Aktuelle Heizleistung                                               | W       |   ✓   |           |
| `lock_active`             | Aktueller Sperrstatus                                               |         |   ✓   |           |
| `open_window_active_now`  | Aktueller Status der Fensteröffnungserkennung                       |         |   ✓   |           |
| `operation_mode`          | Aktueller Betriebsmodus                                             |         |   ✓   |     ✓     |
| `raw_ambient_temperature` | Umgebungstemperatur ohne Kalibrierungsabweichung                    | °C      |   ✓   |           |
| `set_temperature`         | Zieltemperatur                                                      | °C      |   ✓   |     ✓     |
| `switched_on`             | Zeigt an, ob das Gerät eingeschaltet ist.                           |         |   ✓   |           |

### `settings`

| Zustand                          | Beschreibung                               | Einheit | Lesen | Schreiben |
| -------------------------------- | ------------------------------------------ | ------- | :---: | :-------: |
| `additional_mode`                | Zusätzlicher Modus für WLAN-Steckdosen     |         |   ✓   |     ✓     |
| `heating_level_percentage`       | Heizleistung für Ölheizungen               | %       |   ✓   |     ✓     |
| `limited_heating_power`          | Maximale Heizleistung für Paneelheizkörper | %       |   ✓   |     ✓     |
| `temperature_calibration_offset` | Temperaturkalibrierungsabweichung          | °C      |   ✓   |     ✓     |

## Lokale API

Der Adapter kommuniziert direkt mit Mill-Geräten über deren lokale HTTP-API. Für die lokale Kommunikation ist kein Mill-Cloud-Konto erforderlich.

Die von diesem Adapter verwendete lokale API ist von Mill International AS in ihrer Dokumentation festgehalten.

[Dokumentation der REST-API der 3. Generation](https://github.com/Mill-International-AS/Generation_3_REST_API) .

Die Verfügbarkeit einzelner Funktionen hängt vom Gerätetyp ab.

## Umfragen

Der Adapter verwendet zwei unabhängig konfigurierbare Abfrageintervalle:

- **Durch schnelles Abfragen** werden sich häufig ändernde Werte wie Raumtemperatur, Heizleistung, Betriebsmodus und Zieltemperatur aktualisiert.
- **Durch langsames Abfragen** werden Informationen aktualisiert, die sich normalerweise seltener ändern, wie z. B. Geräteinformationen und Temperaturkalibrierung.

Jedes Gerät wird unabhängig behandelt. Die konfigurierten Intervalle bestimmen, wie häufig seine Werte aktualisiert werden. Dauert eine Aktualisierung länger, beginnt der nächste Zyklus später; Abfragezyklen akkumulieren sich nicht.

Der `pollWhenOff` Diese Option steuert, ob die Abfrage für ein Gerät fortgesetzt wird, während es ausgeschaltet ist. Weitere Informationen finden Sie [unter Abfrage bei ausgeschalteter Heizung](#polling-while-a-heater-is-switched-off) .

## Schreibwerte

Beschreibbare Datenpunkte können über ioBroker-Zustände gesteuert werden. Der Adapter prüft die Werte, bevor er sie an das Gerät sendet, und bestätigt erfolgreiche Befehle.

Es gelten folgende Beschränkungen:

- **Leistung der Ölheizung:** `40`, `60` oder `100`
- **Betriebsmodus:** Einer der oben aufgeführten unterstützten Modi.
- **Leistungsbegrenzung der Paneelheizung:** Ganzzahl von `10` Zu `100`
- **Zieltemperatur:** 5 °C bis 35 °C
- **Temperaturkalibrierungsabweichung:** -30 °C bis +30 °C
- **Zusätzlicher Modus für die Wi-Fi-Steckdose:** Ganzzahl von `0` Zu `4`

Gerätespezifische Einstellungen können nur auf Geräten geändert werden, die diese Funktion unterstützen. Ungültige Werte und fehlgeschlagene Befehle werden nicht als erfolgreiche Statusänderungen übernommen.

### Zieltemperatur

Die Zieltemperatur kann auch bei ausgeschalteter Heizung geändert werden.

Nach einer erfolgreichen Temperaturänderung erkennt der Adapter den neuen Wert sofort in ioBroker.

Wenn die Heizung ausgeschaltet ist, wird die geänderte Zieltemperatur möglicherweise nicht von der Heizung zurückgegeben. Die API gibt die konfigurierte Zieltemperatur wieder zurück, sobald die Heizung eingeschaltet wird. Dies bedeutet, dass der angezeigte Wert in `control-status.set_temperature` Der neu konfigurierte Wert wird möglicherweise nicht sofort nach dem Ausschalten der Heizung angezeigt.

## Entwicklung

Der Quellcode ist in TypeScript geschrieben.

## Entwicklungsrichtlinien

Der Adapter folgt den Entwicklungs- und Codierungsrichtlinien von ioBroker. Für Zustandsobjekte verwendet der Adapter die offiziellen ioBroker-Zustandsrollen.

### Statusaktualisierungen

Der Adapter verwendet `setStateChanged()` nach Möglichkeit für Aktualisierungen des jeweiligen Bundesstaates.

Dadurch werden unnötige Datenbankzugriffe und Zustandsänderungsereignisse vermieden, wenn sich ein Wert nicht geändert hat. Dies ist besonders nützlich für regelmäßig abgefragte Gerätedaten.

Der Adapter folgt diesen Prinzipien:

- Gerätewerte werden nur dann geschrieben, wenn sich ihre Werte ändern.
- Erfolgreich verarbeitete Schreibbefehle werden sofort bestätigt. `ack = true` Die
- Verbindungsstatusaktualisierungen werden nur dann geschrieben, wenn sich der Verbindungsstatus ändert.
- Ungültige oder fehlende API-Werte überschreiben niemals bestehende Zustände.

## Changelog

### 0.2.0

- BREAKING: The adapter now supports multiple Mill devices within a single instance. The configuration and device
  data point structure have changed. Existing scripts and visualizations may need to be adapted.
- Introduce per-device handling for status, polling and control.
- Identify physical devices by MAC address, including recognition after an IP address change.
- Handle device replacement and previously known devices.
- Add the `pollWhenOff` option to control polling while a heater is switched off.
- Improve device-specific state handling and write operations.
- Improve configuration validation and polling behaviour.

### 0.1.15

- Use `setStateChanged()` for regular state updates to avoid unnecessary database writes and state change events.
- Keep `setState()` for explicit state reset operations.

## License

MIT License

Copyright (c) 2026 webbummler [moin@webbummler.de](mailto:moin@webbummler.de)

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