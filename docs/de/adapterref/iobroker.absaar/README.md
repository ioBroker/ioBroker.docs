---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.absaar/README.md
title: ioBroker.absaar
hash: ndn7UjpBug4ORIGwbtqtIdotnWs/a37N5uFUuJxzkm8=
---
# IoBroker.absaar
ioBroker-Adapter für Absaar EMS-Wechselrichter. Der Adapter liest Wechselrichter- und Stationsdaten von der Absaar EMS Cloud-API, die von der Absaar EMS-App verwendet wird.

Produkt- und Herstellerinformationen sind auf [offizielle AdvanSol Power-Website](https://www.advansol-power.com/) verfügbar.

Der Adapter enthält keine privaten Anmeldeinformationen, privaten Hostnamen oder benutzerspezifischen Daten. Die Anmeldeinformationen werden in geschützten und verschlüsselten nativen Konfigurationsfeldern von ioBroker gespeichert.

## Merkmale
- Cloud-Polling über `https://mini-ems.com:8081`
- Melden Sie sich mit den Anmeldedaten der Absaar EMS-App an.
- Automatische Token-Verwaltung und erneute Authentifizierung
- Konfigurierbares Abfrageintervall
- Stationsstände für tägliche, monatliche und gesamte Energieerzeugung
- Zusätzliche Stationswerte wie aktuelle Stromstärke und Einnahmen-/Umweltindikatoren
- Zustandsinformationen des Kollektors, wie z. B. Eingangsleistung, Online-Status, Kollektorname und letzte Online-Zeit
- Wechselrichterzustände für Wechselstrom, PV, Temperatur, Batterie und Lastwerte
- Optionale Rohdaten im JSON-Format zur Fehlerbehebung
- JSON-basierte Administratorkonfiguration

## Anforderungen
- ioBroker js-controller `>= 6.0.11`
- ioBroker Admin `>= 7.8.23`
- Node.js `>= 22`
- Ein Absaar EMS-Konto mit mindestens einem in der Absaar EMS-App konfigurierten Wechselrichter oder einer Station.
- Netzwerkzugriff vom ioBroker-Host auf `mini-ems.com:8081`

## Konfiguration
Öffnen Sie die Adapterinstanzkonfiguration in ioBroker Admin.

| Schauplatz | Beschreibung |
| --- | --- |
| Adapter aktiv | Aktiviert oder deaktiviert das Polling. |
| Absaar-Benutzername | Benutzername, der in der Absaar EMS-App verwendet wird. Je nach Konto kann dies eine E-Mail-Adresse oder ein Benutzername sein. |
| Absaar-Passwort | Passwort, das in der Absaar EMS-App verwendet wird. Wird von ioBroker als verschlüsselte und geschützte native Konfiguration gespeichert. |
| Abfrageintervall in Sekunden | Abfrageintervall in Sekunden, von `30` bis `86400`. Standardwert ist `120`. Halten Sie diesen Wert niedrig, um Cloud-Ratenbegrenzungen zu vermeiden. |
| API-Basis-URL | Standard: `https://mini-ems.com:8081`. Normalerweise sollte diese nicht geändert werden. |
| Rohdaten als JSON speichern | Schreibt die vollständig abgerufenen JSON-Daten zur Fehlerbehebung in die Statusdateien. Standardmäßig deaktiviert. |

## Staaten
Der Adapter erzeugt Zustände unterhalb dieser Struktur:

```text
absaar.0.info.*
absaar.0.stations.<stationId>.*
absaar.0.stations.<stationId>.inverters.<inverterId>.*
```

### Informationsangaben
| Bundesland | Typ | Beschreibung |
| --- | --- | --- |
| `info.connection` | boolescher Wert | `true` wenn die letzte Abfrage erfolgreich war. |
| `info.lastError` | Zeichenkette | Letzte Fehlermeldung. Nach erfolgreicher Abfrage leer. |
| `info.lastError` | Zeichenkette | Letzte Fehlermeldung. Nach einer erfolgreichen Abfrage leer. |

### Stationszustände
| Bundesland | Einheit | Beschreibung |
| --- | --- | --- |
| `dailyPowerGeneration` | kWh | Täglich erzeugte Energie, gemeldet von der Absaar API. |
| `totalPowerGeneration` | kWh | Vom Absaar API gemeldete Gesamtenergieerzeugung. |
| `currentPower` | W | Aktuelle Stationsleistung, gemeldet von der Absaar API. |
| `incomeOfTheDay` | | Täglicher Einkommenszähler, der von der API gemeldet wird. |
| `currentMonthsIncome` | | Vom API gemeldeter monatlicher Einkommenszähler. |
| `cumulativeIncome` | | Vom API gemeldeter kumulierter Einkommenszähler. |
| `saveStandardCoal` | | Vom API gemeldeter Umgebungszähler. |
| `emissionReductionCO2` | | Vom API gemeldeter CO2-Reduktionszähler. |
| `protectTrees` | | Vom API gemeldeter Baumschutzzähler. |
| `inverterTotal` | | Anzahl der zugewiesenen Wechselrichter. |
| `inOnCount` | | Anzahl der online befindlichen Wechselrichter. |
| `inOnCount` | | Anzahl der online befindlichen Wechselrichter. |

### Sammlerstaaten
Unterhalb von `stations.<stationId>.inverters.<inverterId>` werden Collector-Zustände erstellt. Diese werden auch dann erstellt, wenn der separate Inverter-Datenendpunkt keine Zeilen zurückgibt.

| Bundesland | Einheit | Beschreibung |
| --- | --- | --- |
| `collectorId` | | Sammler-ID. |
| `inverterId` | | Wechselrichter-ID. |
| `inverterName` | | Name des Wechselrichters. |
| `communicationStatus` | | Vom API gemeldeter Kommunikationsstatus. |
| `onlineStatus` | | Vom API gemeldeter Online-Status. |
| `networkStatus` | | Numerischer Netzwerkstatus. |
| `inPower` | W | Eingangs- oder aktuelle Leistung, die in der Kollektorliste gemeldet wird. |
| `ipAddress` | | Von der API gemeldete Cloud-seitige IP-Adresse. |
| `onlineTime` | | Letzter Online-Zeitstempel. |
| `exhibitionTime` | | Letzter vom API angezeigter Zeitstempel. |
| `collectorType` | | Sammlertyp. |
| `equipmentType` | | Gerätetyp. |
| `modelReplace` | | Modellkennung. |
| `modelReplace` | | Modellkennung. |

### Wechselrichterzustände
| Bundesland | Einheit | Beschreibung |
| --- | --- | --- |
| `acPower` | W | Wechselstrom-Ausgangsleistung. |
| `acFrequency` | Hz | Wechselstromfrequenz. |
| `acElectric` | A | Wechselstrom. |
| `pv1Power` | W | PV-Eingangsleistung 1. |
| `pv2Power` | W | PV-Eingangsleistung 2. |
| `pv1Voltage` | V | PV-Eingangsspannung 1. |
| `pv2Voltage` | V | PV-Eingangsspannung 2. |
| `pv1Electric` | A | PV-Eingangsstrom 1. |
| `pv2Electric` | A | PV-Eingangsstrom 2. |
| `inPower` | W | Von der API gemeldete Eingangsleistung. |
| `temperature` | °C | Wechselrichtertemperatur. |
| `batteryVoltage` | V | Batteriespannung, falls vom Gerät gemeldet. |
| `batteryCurrent` | A | Batteriestrom, falls vom Gerät gemeldet. |
| `batteryPower` | W | Akkuleistung, falls vom Gerät gemeldet. |
| `loadPower` | W | Lastleistung, falls vom Gerät gemeldet. |
| `controllerTemperature` | °C | Controller-Temperatur, falls vom Gerät gemeldet. |
| `controllerTemperature` | °C | Controllertemperatur, falls vom Gerät gemeldet. |

Nicht jedes Absaar-Gerät meldet alle Felder. Fehlende Werte bleiben unverändert, bis die API einen gültigen numerischen Wert liefert.

## Fehlerbehebung
1. Überprüfen Sie `absaar.0.info.connection`.
2. Überprüfen Sie `absaar.0.info.lastError`.
3. Überprüfen Sie, ob die gleichen Anmeldeinformationen in der Absaar EMS-App funktionieren.
4. Halten Sie das Abfrageintervall während der Tests bei mindestens 120 Sekunden.
5. Aktivieren Sie Raw JSON nur vorübergehend, da es je nach API-Antwort große Zustände erzeugen kann.

## Changelog

### 0.1.13 (2026-07-14)

- Added complete adapter description translations and a manufacturer link.
- Enforced a safe polling interval range of 30 seconds to 24 hours.
- Enabled TLS certificate verification for cloud API requests.
- Improved state roles and avoided redundant object creation during polling.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.12

- Added the release script configuration required by the repository checker.

### 0.1.11

- Added ioBroker development tooling used by common adapter maintenance workflows.
- Switched admin translations to the short i18n file format.

### 0.1.10

- Switched the CI workflow to the standard ioBroker testing actions.
- Added package and integration test scripts expected by the ioBroker checker.

### 0.1.9

- Added trusted publishing workflow configuration for signed npm releases.
- Added repository housekeeping updates requested by the ioBroker checker.

Older entries are archived in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 TheBam