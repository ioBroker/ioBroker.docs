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
- Der Adapter arbeitet mit admin => 3 und nodejs >= 14
- Erstelle dein eigenes Konto https://auth.netatmo.com/de-de/access/signup
- Login in die API durchführen https://dev.netatmo.com/apidocumentation/energy
- Erzeuge deine eigene APP durch Anklicken deines Kontos (oben / links), und drücke den Knopf "Create"
  - Fülle das Formular aus und speichere es
  - Übernimm die erhaltene client-ID und client-secret-ID in die Adapter Konfiguration
  - Gehen sie zur API-Dokumentation https://dev.netatmo.com/apidocumentation/energy
  - Wählen sie "GET homesdata" - "Try it out" - "EXECUTE / HOMESDATA"
    - du wirst ein response erhalten in der du deine home-ID findest
    - Übernimm sie in die Adapter Konfiguration
    - Starte den Netatmo-Energy Adapter und authentifiziere dich bei Netatmo API
      - Selektieren sie die neue Authentifizierungsmethode (OAuth2)
      - Bestätigen sie den Knopf "Authentifizieren Sie sich bei Netatmo"
      - Loggen sie sich in ihr Konto ein, sofern es notwendig ist
      - Bestätigen sie die Berechtigung für Drittanbieter für ihre Netatmo-APP
      - Schließen sie das Browserfenster
  - Wähle die gewünschten Optionen in den "API-Einstellungen" und speichern sie die Adapterkonfiguration
    - Temperaturänderungen sofort übertragen ... sofortiges übertragen der Temperaturänderungen in State "SetTemp" an die API
    - API Zustände nach Änderung sofort lesen ... API Daten mittels homestatus sofort nach Aktualisierung der API abholen
    - Aktualisierung der API-states nach x Sekunden ... Permanentes Aktualisieren der API Daten. (0 = Keine Aktualisierung)  
  - Wenn gewünscht kann auch Benachrichtigungsdienst eingerichtet werden um bestimmte Statusänderungen zugesandt zu bekommen. Dabei ist es möglich sich Informationsmeldungen, Warnungen bzw. Fehlermeldungen zu erhalten. Hierfür ist es notwendig die Option "Benachrichtigungen aktivieren/deaktivieren" in den "Anmeldeinformationen" zu aktivieren und danach die Einstellungen im Menü "Benachrichtigungen" einzurichten.

Eine detaillierte Beschreibung ist als wiki verfügbar (https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki).

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_login_de.png" alt="settingsLogin" width="70%"/>

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_api_de.png" alt="settingsAPI" width="70%"/>

## netatmo-energy Adapter für ioBroker
Mittels der Netatmo-Energy API werden die aktuellen Einstellungen abgeholt bzw. geändert. Der Adapter verwendet den fetch Request für den Datentransfer zur Netatmo Energy API. Offizielle Dokumentation der API: https://dev.netatmo.com/apidocumentation/energy.

Der Adapter erzeugt ein eigenes Device "energyAPP" welches die "APIRequests" und "trigger" beinhaltet.

### API Requests
* homesdata             ... holt die gesamte Struktur der Netatmo Energy Installation (dabei wird der Parameter NAPlug verwendet). Sie können alle weiteren Parameter für manuelle Requests selbst auswählen.
* homestatus            ... ermittelt und überträgt den Status und die technischen Informationen ihrer zugeordneten Ventile. Wenn sie Informationen zu einem spezifischen Geräteart möchten, können sie diese selbst auswählen.
* getroommeasure        ... Hiermit erhalten sie historische Daten ihrer Räume. Das Ergebnis wird in das "response" Feld eingetragen.
* getmeasure            ... Hiermit erhalten sie die historischen Daten ihres Boilers. Das Ergebnis wird in das "response" Feld eingetragen.
* setthermmode_schedule ... Setzt den Betriebsmodus der Netatmo Energy Installation auf "Schedule" (Standard)
* setthermmode_hq       ... Setzt den Betriebsmodus der Netatmo Energy Installation auf "hq" (Frostwächter)
* setthermmode_away     ... Setzt den Betriebsmodus der Netatmo Energy Installation auf "away" (nicht zu Hause)
* switchhomeschedule    ... Setzt den "schedule mode" der Netatmo Energy API. Alle möglichen Modi sind im Channel "switchhomeschedule" aufgelistet.
* synchomeschedule      ... Setzt die Heizpläne deiner Netatmo Energy APP. Um einen spezifischen Heizplan zu ändern, geben sie eine an. Andernfalls wird der aktuell eingestellte abgeändert. Bitte tragen sie die notwendigen Parameter ein und lösen sie den synchomeschedule Request aus.

Wenn ein API Request Parameter benötigt, können sie diese im korrespondierenden Request Channel im Channel "parameters" finden.

### Trigger
* applychanges          ... übermittelt alle noch offenen manuellen Änderungen deiner Ventile an die Netatmo Energy APP
* refresh_structure     ... erzeuge die Requests homesdata und homestatus hintereinander

### Änderungs-Requests
* setroomthermpoint     ... abhängig von den manuellen Änderungen im Channel "setting" werden die Änderungen an die Netatmo Energy APP übertragen. (entweder sofort oder selbst getriggert - "Temperaturänderungen sofort übertragen"). 
* set_mode_to_home      ... Der Button "set_mode_to_home" im channel "setting" setzt den Ventil-mode "set_mode_to_home" auf "home". Außerdem wird der API Request sofort ausgelöst, um die Änderung zu übertragen.

### Status
* running               ... hier kann man erkenne ob derzeit ein API Request läuft

### Requeststruktur
<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP_measure.png" alt="settingsLogin" width="80%"/><img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP.png" alt="settingsLogin" width="80%"/>

## Strukturen aufbauen
Beim Start des Adapters wird der aktuelle Status der gesamten Netatmo Energy APP aufgefrischt und der Status aller Ventile und Thermostate übertragen. Abhängig von den Allgemeinen Einstellungen (API Zustände nach Änderung sofort lesen) werden die Status der Ventile und Thermostate nach Änderung der API sofort wieder abgeholt (es wird sofort ein homestatus Request abgesetzt).
Beim Starten des Adapters wird die Initialisierung durchgeführt.

## Benachrichtigungen
Wenn sie in der Adapterkonfiguration einen Benachrichtigungsdienst aktiviert haben werden diverse Meldungen an sie versandt.
Folgende Dienste sind verfügbar.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_types_de.png" alt="settingsAPI" width="30%"/>

Bitte geben sie für den von ihnen gewählten Benachrichtigungsdienst die notwendigen Verbindungsdaten an.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_de.png" alt="settingsAPI" width="70%"/>

## Nachrichten
Hier können sie bestimmte Nachrichten bei bestimmten Statusänderungen auslösen. Die gewünschte Nachricht können sie hinterlegen.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/messages_de.png" alt="settingsAPI" width="70%"/>

## Admin-Tab
Auf der Admin-Tab können sie alle Thermostate, Bridges und Ventile ihrer netatmo energy instance anzeigen lassen. Dort ist es auch möglich diese Ansicht zu aktualisieren bzw. eine vollständige API Aktualisierung zu starten. Zusätzlich hat man die Möglichkeit die Änderungen in die Cloud zu übertragen und von einem eventuellen manuellen Modus wieder auf den Standardmodus umzuschalten.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/admintab_de.png" alt="admintab" width="70%"/>

Auf jeder Karte werden Statussymbole angezeigt, welche den aktuellen Zustand des Thermostats, der Ventile und des Steckers darstellt. Auf der zweiten Seite des Thermostats finden sie diverse API Requests, um den Thermostat-Mode bzw. den Heizplan einzustellen.

## Widget
Widget für VIS, um ein komplettes Thermostat anzuzeigen. Sie müssen nur den "SetTemp" - Datenpunkt eintragen. Alle anderen Informationen werden dynamisch aus der "rooms"-Struktur ermittelt.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/valve_widget_de.png" alt="settingsAPI" width="250px"/>

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.2 (2023-01-07)
* (ioKlausi) Revision of the documentation

### 2.0.1 (2023-01-06)
* (ioKlausi) Corrections for OAuth2

### 2.0.0 (2023-01-06)
* (ioKlausi) New authentication method established

### 1.3.1 (2022-04-18)
* (ioKlausi) Additional information added to admin tab cards

### 1.3.0 (2022-04-17)
* (ioKlausi) Change thermostat mode functionality added to thermostat card

### 1.2.5 (2022-04-16)
* (ioKlausi) Dropdown menu to change heating plan added to the thermostat card in the admin page

### 1.2.4 (2022-04-09)
* (ioKlausi) i18n files for npm added

### 1.2.3 (2022-04-08)
* (ioKlausi) Added status icons to plug

### 1.2.2 (2022-04-03)
* (ioKlausi) Added a slider to each valve to change the temperature and added some API requests to admin tab to transfer changes to the cloud 

### 1.2.1 (2022-04-01)
* (ioKlausi) Messages for specific events created

### 1.2.0 (2022-03-31)
* (ioKlausi) Close message functionality added on admin tab

### 1.1.7 (2022-03-24)
* (ioKlausi) Bridge information added to each card

### 1.1.6 (2022-03-24)
* (ioKlausi) Rework README.md & WIKI

### 1.1.5 (2022-03-23)
* (ioKlausi) Refresh functionality added to admin tab

### 1.1.4 (2022-03-20)
* (ioKlausi) Plug added to admin tab 

### 1.1.3 (2022-03-19)
* (ioKlausi) Admin tab for valves added 

### 1.1.2 (2022-03-06)
* (ioKlausi) Bugfix Easy Admin 

### 1.1.1 (2022-03-06)
* (ioKlausi) Bugfix setroomthermpoint 

### 1.1.0 (2022-03-06)
* (ioKlausi) setroomthermpoint - Trigger for valve-mode implemented

### 1.0.4 (2022-03-05)
* (ioKlausi) Bugfix - send message

### 1.0.3 (2022-03-05)
* (ioKlausi) Transfered Customizing-UI to json

### 1.0.2 (2022-02-27)
* (ioKlausi) Redesign coding

### 1.0.0 (2022-02-25)
* (ioKlausi) Create major version

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