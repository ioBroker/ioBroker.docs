---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.netatmo-energy.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/netatmo-energy-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/netatmo-energy-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true
---
![Logo](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/admin/netatmo-energy.png)

# ioBroker.netatmo-energy

[![NPM version](http://img.shields.io/npm/v/iobroker.netatmo-energy.svg)](https://www.npmjs.com/package/iobroker.netatmo-energy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg)](https://www.npmjs.com/package/iobroker.netatmo-energy)
![Number of Installations (latest)](http://iobroker.live/badges/netatmo-energy-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/netatmo-energy-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg)](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy)
![Test and Release](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/admin/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[![NPM](https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true)](https://nodei.co/npm/iobroker.netatmo-energy/)

**Dieser Adapter verwendet Sentry Bibliotheken, um einen automatischen Report von Abbrüchen und Programmcode Fehlern an die Entwickler zu senden.** Für weitere Details und für Informationen zur Deaktivierung dieser Funktion beachten sie bitte [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting ist verfügbar ab js-controller 3.0.

## Voraussetzungen & Konfiguration

Netatmo Energy Hardware (Thermostat, Ventile)
Konto bei Netatmo Cloud

- Der Adapter arbeitet mit admin >= 3 und nodejs >= 16
- Erstelle dein eigenes Konto <https://auth.netatmo.com/de-de/access/signup>
- Login in die API durchführen <https://dev.netatmo.com/apidocumentation/energy>
- Erzeuge deine eigene APP durch Anklicken deines Kontos (oben / links), und drücke den Knopf "Create"
  - Fülle das Formular aus und speichere es
  - Übernimm die erhaltene client-ID und client-secret-ID in die Adapter Konfiguration
  - Gehen sie zur API-Dokumentation <https://dev.netatmo.com/apidocumentation/energy>
  - Wählen sie "GET homesdata" - "Try it out" - "EXECUTE / HOMESDATA"
    - du wirst ein response erhalten in der du deine home-ID findest
    - Übernimm sie in die Adapter Konfiguration
    - Starte den Netatmo-Energy Adapter und authentifiziere dich bei Netatmo API
      - Bestätigen sie den Knopf "Authentifizieren Sie sich bei Netatmo"
      - Loggen sie sich in ihr Konto ein, sofern es notwendig ist
      - Bestätigen sie die Berechtigung für Drittanbieter für ihre Netatmo-APP
      - Schließen sie das Browserfenster
  - Wähle die gewünschten Optionen in den "API-Einstellungen" und speichern sie die Adapterkonfiguration
    - Temperaturänderungen sofort übertragen ... sofortiges übertragen der Temperaturänderungen in State "SetTemp" an die API
    - API Zustände nach Änderung sofort lesen ... API Daten mittels homestatus sofort nach Aktualisierung der API abholen
    - Aktualisierung der API-states nach x Sekunden ... Permanentes Aktualisieren der API Daten. (0 = Keine Aktualisierung)  
  - Wenn gewünscht kann auch Benachrichtigungsdienst eingerichtet werden um bestimmte Statusänderungen zugesandt zu bekommen. Dabei ist es möglich sich 
  Informationsmeldungen, Warnungen bzw. Fehlermeldungen zu erhalten. Hierfür ist es notwendig die Option "Benachrichtigungen aktivieren/deaktivieren" in den "Anmeldeinformationen" zu aktivieren und danach die Einstellungen im Menü "Benachrichtigungen" einzurichten.
  - Zusätzlich ist es möglich die Tür-/Fenstersensoren in der Sensorik einzutragen und die gewünschte Aktion zu hinterlegen. Diese Funktionen können auf der Loginseite generell aktiviert bzw. deaktiviert werden.
  
Eine detaillierte Beschreibung ist als wiki verfügbar (<https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki>).

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_login_de.png" alt="settingsLogin" width="70%"/>

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_api_de.png" alt="settingsAPI" width="70%"/>

## netatmo-energy Adapter für ioBroker

Mittels der Netatmo-Energy API werden die aktuellen Einstellungen abgeholt bzw. geändert. Der Adapter verwendet den fetch Request für den Datentransfer zur Netatmo Energy API. Offizielle Dokumentation der API: <https://dev.netatmo.com/apidocumentation/energy>.

Der Adapter erzeugt ein eigenes Device "energyAPP" welches die "APIRequests" und "trigger" beinhaltet.

### API Requests

- homesdata             ... holt die gesamte Struktur der Netatmo Energy Installation (dabei wird der Parameter NAPlug verwendet). Sie können alle weiteren Parameter für manuelle Requests selbst auswählen.
- homestatus            ... ermittelt und überträgt den Status und die technischen Informationen ihrer zugeordneten Ventile. Wenn sie Informationen zu einem spezifischen Geräteart möchten, können sie diese selbst auswählen.
- getroommeasure        ... Hiermit erhalten sie historische Daten ihrer Räume. Das Ergebnis wird in das "response" Feld eingetragen.
- getmeasure            ... Hiermit erhalten sie die historischen Daten ihres Boilers. Das Ergebnis wird in das "response" Feld eingetragen.
- setthermmode_schedule ... Setzt den Betriebsmodus der Netatmo Energy Installation auf "Schedule" (Standard)
- setthermmode_hq       ... Setzt den Betriebsmodus der Netatmo Energy Installation auf "hq" (Frostwächter)
- setthermmode_away     ... Setzt den Betriebsmodus der Netatmo Energy Installation auf "away" (nicht zu Hause)
- switchhomeschedule    ... Setzt den "schedule mode" der Netatmo Energy API. Alle möglichen Modi sind im Channel "switchhomeschedule" aufgelistet.

- createnewhomeschedule ... Setzt den "schedule mode" der Netatmo Energy API. Alle möglichen Modi sind im Channel "switchhomeschedule" aufgelistet.

- synchomeschedule      ... Setzt die Heizpläne deiner Netatmo Energy APP. Um einen spezifischen Heizplan zu ändern, geben sie eine an. Andernfalls wird der aktuell eingestellte abgeändert. Bitte tragen sie die notwendigen Parameter ein und lösen sie den synchomeschedule Request aus.
- createnewhomeschedule ... Erstellt einen neuen Heizplan für deine Netatmo Energy APP. Bitte tragen sie die notwendigen Parameter ein und lösen sie den createnewhomeschedule Request aus.

Wenn ein API Request Parameter benötigt, können sie diese im korrespondierenden Request Channel im Channel "parameters" finden.

### Trigger

- applychanges          ... übermittelt alle noch offenen manuellen Änderungen deiner Ventile an die Netatmo Energy APP
- refresh_structure     ... erzeuge die Requests homesdata und homestatus hintereinander

### Änderungs-Requests

- setroomthermpoint     ... abhängig von den manuellen Änderungen im Channel "setting" werden die Änderungen an die Netatmo Energy APP übertragen. (entweder sofort oder selbst getriggert - "Temperaturänderungen sofort übertragen").
- set_mode_to_home      ... Der Button "set_mode_to_home" im channel "setting" setzt den Ventil-mode "set_mode_to_home" auf "home". Außerdem wird der API Request sofort ausgelöst, um die Änderung zu übertragen.

### Nachrichten

- message_text          ... alle Nachrichten werden in diesem Datenpunkt übertragen

### Status

- running               ... hier kann man erkenne ob derzeit ein API Request läuft

### Requeststruktur

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP_measure.png" alt="settingsLogin" width="80%"/><img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP.png" alt="settingsLogin" width="80%"/>

## Strukturen aufbauen

Beim Start des Adapters wird der aktuelle Status der gesamten Netatmo Energy APP aufgefrischt und der Status aller Ventile und Thermostate übertragen. Abhängig von den Allgemeinen Einstellungen (API Zustände nach Änderung sofort lesen) werden die Status der Ventile und Thermostate nach Änderung der API sofort wieder abgeholt (es wird sofort ein homestatus Request abgesetzt).
Beim Starten des Adapters wird die Initialisierung durchgeführt.

## Benachrichtigungen

Wenn sie in der Adapterkonfiguration einen Benachrichtigungsdienst aktiviert haben werden diverse Meldungen an sie versandt.
Folgende Dienste sind verfügbar.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_types_de.png" alt="notifications" width="30%"/>

Bitte geben sie für den von ihnen gewählten Benachrichtigungsdienst die notwendigen Verbindungsdaten an.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_de.png" alt="notifications" width="70%"/>

## Nachrichten

Hier können sie bestimmte Nachrichten bei bestimmten Statusänderungen auslösen. Die gewünschte Nachricht können sie hinterlegen. Diese werden immer in den Datenpunkt "message_text" übertragen.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/messages_de.png" alt="messages" width="70%"/>

Durch Drücken des Knopfes " TESTMITTEILUNG SENDEN" ist es möglich das Nachrichtenservice zu testen. Vor dem Test ist es notwendig alle Einstellungen für das Nachrichten Service zu speichern.

## Sensorik

In der Tabelle können Sie auf das "Fenster-/Türsensor" Attribut pro Raum reagieren. Der Status der jeweiligen Fenstersensoren kann beim Ändern eine Aktion auslösen, welche hier einzutragen ist. Es ist möglich hier alle Sensoren auszuwählen, welche vom Typ bool sind. Somit können auch externe Sensoren eingebunden werden.

Folgende Aktionen können ausgelöst werden:

- Temperatur eingestellen
- Home Mode setzen
- Heizmodus einstellen
  - Frostwächter
  - Nicht zu Hause
  - Normalbetrieb
- Heizplan aktivieren
  - alle existierenden Heizpläne der Netatmo-Energy App werden angeboten

Somit kann beim Öffnen oder beim Schließen eines Fensters / Tür die Temperatur eines Ventils eingestellt werden. Durch eingeben einer Verzögerungszeit (in Sekunden) wird die hinterlegte Aktion verzögert ausgeführt. Wird innerhalb der Verzögerungszeit der auslösende Sensor wieder geändert, werden die noch austehenden Aktionen nicht durchgeführt.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/sensors_de.png" alt="sensors" width="70%"/>

## Admin-Tab

Auf der Admin-Tab können sie alle Thermostate, Bridges und Ventile ihrer netatmo energy instance anzeigen lassen. Dort ist es auch möglich diese Ansicht zu aktualisieren bzw. eine vollständige API Aktualisierung zu starten. Zusätzlich hat man die Möglichkeit die Änderungen in die Cloud zu übertragen und von einem eventuellen manuellen Modus wieder auf den Standardmodus umzuschalten.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/admintab_de.png" alt="admintab" width="70%"/>

Auf jeder Karte werden Statussymbole angezeigt, welche den aktuellen Zustand des Thermostats, der Ventile und des Steckers darstellt. Auf der zweiten Seite des Thermostats finden sie diverse API Requests, um den Thermostat-Mode bzw. den Heizplan einzustellen.

## Widget

Widget für VIS, um ein komplettes Thermostat anzuzeigen. Sie müssen nur den "SetTemp" - Datenpunkt eintragen. Alle anderen Informationen werden dynamisch aus der "rooms"-Struktur ermittelt.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/valve_widget_de.png" alt="widget" width="250px"/>

## Changelog

[Older changes](CHANGELOG_OLD.md)
<!-- ### **WORK IN PROGRESS** -->
### 2.7.1 (2023-12-10)

* (ioKlausi) Remove GULP support

### 2.7.0 (2023-11-19)

* (ioKlausi) Adjust default value for parameters

### 2.6.5 (2023-11-05)

* (ioKlausi) New options in the adapter configuration for updating datapoints

### 2.6.4 (2023-10-25)

* (ioKlausi) Change value only if changes are detected

### 2.6.3 (2023-10-14)

* (ioKlausi) Adapt GULP

### 2.6.2 (2023-10-13)

* (ioKlausi) Bug fix of 'Sentry errors'

### 2.6.1 (2023-06-01)

* (ioKlausi) Correct some adapter check issues

### 2.6.0 (2023-05-01)

* (ioKlausi) Enable / Disable sensor actions

### 2.5.8 (2023-04-16)

* (ioKlausi) Bug fix of translations

### 2.5.7 (2023-04-16)

* (ioKlausi) Bug fix of sensor actions

### 2.5.6 (2023-04-15)

* (ioKlausi) Bug fix of Sentry errors
* (ioKlausi) Home mode for individual rooms in admin tab established
* (ioKlausi) Bug fix of translations

### 2.5.5 (2023-04-11)

* (ioKlausi) Bug fix of Sentry errors

### 2.5.4 (2023-04-10)

* (ioKlausi) Bug fix of Sentry errors

### 2.5.3 (2023-04-10)

* (ioKlausi) Added data point for messages

### 2.5.2 (2023-04-09)

* (ioKlausi) Made some adjustments in the admin config

### 2.5.1 (2023-04-09)

* (ioKlausi) Test message in config added
* (ioKlausi) Revise ioBroker Netatmo-Energy APP

### 2.5.0 (2023-04-07)

* (ioKlausi) Sensor changed to object ID type boolean

## License

MIT License

Copyright (c) 2021-2023 ioKlausi <nii@gmx.at>

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