---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.netatmo-energy.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/netatmo-energy-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/netatmo-energy-stable.svg
BADGE-Dependency Status: https://img.shields.io/david/Homemade-Disaster/iobroker.netatmo-energy.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true
---
![Logo](https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/admin/netatmo-energy.png)
# ioBroker.netatmo-energy

[![NPM version](http://img.shields.io/npm/v/iobroker.netatmo-energy.svg)](https://www.npmjs.com/package/iobroker.netatmo-energy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg)](https://www.npmjs.com/package/iobroker.netatmo-energy)
![Number of Installations (latest)](http://iobroker.live/badges/netatmo-energy-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/netatmo-energy-stable.svg)
[![Dependency Status](https://img.shields.io/david/Homemade-Disaster/iobroker.netatmo-energy.svg)](https://david-dm.org/Homemade-Disaster/iobroker.netatmo-energy)
[![Known Vulnerabilities](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg)](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy)

[![NPM](https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true)](https://nodei.co/npm/iobroker.netatmo-energy/)

**Tests:** ![Test and Release](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry Bibliotheken, um einen automatischen Report von Abbrüchen und Programmcode Fehlern an die Entwickler zu senden.** Für weitere Details und für Informationen zur Deaktivierung dieser Funktion beachten sie bitte [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting ist verfügbar ab js-controller 3.0.

## Voraussetzungen & Konfiguration
Netatmo Energy Hardware (Thermostat, Ventile)
Konto bei Netatmo Cloud
- Der Adapter arbeitet mit admin => 3 und nodejs >= 12
- Erstelle dein eigenes Konto https://auth.netatmo.com/de-de/access/signup
- Login in die API durchführen https://dev.netatmo.com/apidocumentation/energy
- Erzeuge deine eigene APP durch Anklicken deines Kontos (oben / links), und drücke den Knopf "Create"
  - Fülle das Formular aus und speichere es
  - Übernimm die erhaltene client-ID und client-secret-ID in die Adapter Konfiguration
  - Gehen sie zur API-Dokumentation https://dev.netatmo.com/apidocumentation/energy
  - Wählen sie "GET homesdata" - "Try it out" - "EXECUTE / HOMESDATA"
    - du wirst ein response erhalten in der du deine home-ID findest
    - Übernimm sie in die Adapter Konfiguration
  - gib deinen User und Passwort der Netatmo Cloud in die Adapter Konfiguration
  - Wähle die gewünschten Optionen in den "API-Einstellungen" und speichern sie die Adapterkonfiguration
    - Temperaturänderungen sofort übertragen ... sofortiges übertragen der Temperaturänderungen in State "SetTemp" an die API
    - API Zustände nach Änderung sofort lesen ... API Daten mittels homestatus sofort nach Aktualisierung der API abholen
    - Aktualisierung der API-states nach x Sekunden ... Permanentes Aktualisieren der API Daten. (0 = Keine Aktualisierung)  
  - Wenn gewünscht kann auch Benachrichtigungsdienst eingerichtet werden um bestimmte Statusänderungen zugesandt zu bekommen. Dabei ist es möglich sich Informationsmeldungen, Warnungen bzw. Fehlermeldungen zu erhalten. Hierfür ist es notwendig die Option "Benachrichtigungen aktivieren/deaktivieren" in den "Anmeldeinformationen" zu aktivieren und danach die Einstellungen im Menü "Benachrichtigungen" einzurichten.

Eine detaillierte Beschreibung ist als wiki verfügbar (https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki).

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/settings_login_de.png" alt="settingsLogin" width="70%"/>

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/settings_api_de.png" alt="settingsAPI" width="70%"/>

## netatmo-energy Adapter für ioBroker
Mittels der Netatmo-Energy API werden die aktuellen Einstellungen abgeholt bzw. geändert. Der Adapter verwendet den fetch Request für den Datentransfer zur Netatmo Energy API. Offizielle Dokumentation der API: https://dev.netatmo.com/apidocumentation/energy.

Der Adapter erzeugt ein eigenes Device "energyAPP" welches die "APIRequests" und "trigger" beinhaltet.

### API Requests
* homesdata             ... holt die gesamte Struktur der Netatmo Energy Installation (dabei wird der Parameter NAPlug verwendet). Sie können alle weiteren Parameter für manuelle Requests selbst auswählen.
* homestatus            ... ermittelt und überträgt den Status und die technischen Informationen ihrer zugeordneten Ventile. Wenn sie Informationen zu einem spezifischen Geräteart möchten können sie diese selbst auswählen.
* getroommeasure        ... Hiermit erhalten sie historische Daten ihrer Räume. Das Ergebnis wird in das "response" Feld eingetragen.
* getmeasure            ... Hiermit erhalten sie die historischen Daten ihres Boilers. Das Ergebnis wird in das "response" Feld eingetragen.
* setthermmode_schedule ... Setzt den Betriebsmodus der Netatmo Energy Installation auf "Schedule" (Standard)
* setthermmode_hq       ... Setzt den Betriebsmodus der Netatmo Energy Installation auf "hq" (Frostwächter)
* setthermmode_away     ... Setzt den Betriebsmodus der Netatmo Energy Installation auf "away" (nicht zu Hause)
* switchhomeschedule    ... Setzt den "schedule mode" der Netatmo Energy API. Alle möglichen Modi sind im Channel "switchhomeschedule" aufgelistet.
* synchomeschedule      ... Setzt die Heizpläne deiner Netatmo Energy APP. Um einen spezifischen Heizplan zu ändern geben sie eine an. Andernfalls wird der aktuell eingestellte abgeändert. Bitte tragen sie die notwendigen Parameter ein und lösen sie den synchomeschedule Request aus.

Wenn ein API Request Parameter benötigt können sie diese im korrespondierenden Request Channel im Channel "parameters" finden.

### Trigger
* applychanges          ... übermittelt alle noch offenen manuellen Änderungen deiner Ventile an die Netatmo Energy APP
* refresh_structure     ... erzeuge die Requests homesdata und homestatus hintereinander

### Änderungs-Requests
* setroomthermpoint     ... abhängig von den manuellen Änderungen im Channel "setting" werden die Änderungen an die Netatmo Energy APP übertragen. (entweder sofort oder selbst getriggert - "Temperaturänderungen sofort übertragen")

### Status
* running               ... hier kann man erkenne ob derzeit ein API Request läuft

### Requeststruktur
<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/EnergyAPP_measure.png" alt="settingsLogin" width="80%"/><img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/EnergyAPP.png" alt="settingsLogin" width="80%"/>

## Strukturen aufbauen
Beim Start des Adapters wird der aktuelle Status der gesamten Netatmo Energy APP aufgefrischt und der Status aller Ventile und Thermostate übertragen. Abhängig von den Allgemeinen Einstellungen (API Zustände nach Änderung sofort lesen) werden die Status der Ventile und Thermostate nach Änderung der API sofort wieder abgeholt (es wird sofort ein homestatus Request abgesetzt).
Beim Starten des Adapters wird die Initialisierung durchgeführt.

## Benachrichtigungen
Wenn sie in der Adapterkonfiguration einen Benachrichtigungsdienst aktiviert haben werden diverse Meldungen an sie versandt.
Folgende Dienste sind verfügbar.

    <img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/notification_types_de.png" alt="settingsAPI" width="30%"/>

    Bitte geben sie für den von ihnen gewählten Benachrichtigungsdienst die notwendigen Verbindungsdaten an.

    <img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/notification_de.png" alt="settingsAPI" width="70%"/>

## Widget
Widget für VIS um ein komplettes Thermostat anzuzeigen. Sie müssen nur den "SetTemp" - Datenpunkt eintragen. Alle anderen Informationen werden dynamisch aus der "rooms"-Struktur ermittelt.

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/valve_widget_de.png" alt="settingsAPI" width="250px"/>

## Änderungsprotokoll
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

### 0.2.4 (2022-02-13)
* (ioKlausi) Release Script hinzugefügt

### 0.2.3
* (ioKlausi) AbortController hinzugefügt

### 0.2.2
* (ioKlausi) Übersetzungen hinzugefügt & Kompaktmodus getestet

### 0.2.1
* (ioKlausi) Erstellen von Objekten angepasst

### 0.2.0
* (ioKlausi) Kompatibilitätsprüfung für js-controller 4.0

### 0.1.20
* (ioKlausi) Fehlerbehebungen (Sentry Fehler)

### 0.1.19
* (ioKlausi) Adapter fertiggestellt & wiki erstellt

### 0.1.18
* (ioKlausi) Separate Symbole für Widget-Signale erstellt

### 0.1.17
* (ioKlausi) Widget angepasst für geöffnetes Fenster, Bug fixing setroomthermpoint

### 0.1.16
* (ioKlausi) Fehlerbehebungen

### 0.1.15
* (ioKlausi) Eigenes Widget für ein Thermostat hinzugefügt

### 0.1.14
* (ioKlausi) Benachrichtigungsassistent hinzugefügt

### 0.1.13
* (ioKlausi) Prüfung der Token Gültigkeit überarbeitet

### 0.1.12
* (ioKlausi) Coding überarbeiten, sentry einbinden, Token Gültigkeit prüfen

### 0.1.11
* (ioKlausi) Adaptertyp geändert

### 0.1.10
* (ioKlausi) API Requests getmeasure und getroommeasure für manuelle Verwendung hinzugefügt

### 0.1.9
* (ioKlausi) API Request synchomeschedule für manuelle Verwendung hinzugefügt

### 0.1.8
* (ioKlausi) API Request switchhomeschedule und alle möglichen Requests hinzugefügt

### 0.1.7
* (ioKlausi) Rollen der States überarbeiten

### 0.1.6
* (ioKlausi) homestates Request mittels Timer auslösen und Konfigurationsbildschirm überarbeitet

### 0.1.5
* (ioKlausi) Passwort Ver-/Entschlüsselung hinzugefügt

### 0.1.4
* (ioKlausi) Neue NPM Version erstellt

### 0.1.3
* (ioKlausi) Programm überarbeitet

### 0.1.2
* (ioKlausi) "SpecialRequests" auf Gerät "energyAPP" geändert

### 0.1.1
* (ioKlausi) API homestatus sofort nach Änderung auslösen

### 0.1.0
* (ioKlausi) Fehlerbehebung und Veröffentlichung des Adapters

### 0.0.6
* (ioKlausi) Vorgaben für Latest eingebaut

### 0.0.5
* (ioKlausi) ACK Logik verändert

### 0.0.4
* (ioKlausi) Änderung der API Ordner Erstellung

### 0.0.3
* (ioKlausi) Übersetzung und Fehlerbehebung

### 0.0.2
* (ioKlausi) API Requests und Strukturaufbau etabliert

### 0.0.1
* (ioKlausi) Initiales Release
Adaptererstellung

## Lizenz
MIT-Lizenz

Copyright (c) 2022 ioKlausi <nii@gmx.at>

Hiermit wird jeder Person, die eine Kopie erhält, kostenlos die Erlaubnis erteilt
diese Software und der dazugehörigen Dokumentationsdateien (die "Software") zu bearbeiten,
in der Software ohne Einschränkung, einschließlich ohne Einschränkung der Rechte
zu verwenden, zu kopieren, zu ändern, zusammenzuführen, zu veröffentlichen, zu verteilen, Unterlizenzen zu vergeben und / oder zu verkaufen, Kopien der Software und um Personen zuzulassen, für die die Software bestimmt ist
dafür eingerichtet, unter folgenden Bedingungen:

Der oben genannte Copyright-Hinweis und dieser Erlaubnishinweis sind in allen enthalten
Kopien oder wesentliche Teile der Software anzuführen.

DIE SOFTWARE WIRD "WIE BESEHEN" OHNE JEGLICHE AUSDRÜCKLICHE ODER AUSDRÜCKLICHE GARANTIE ZUR VERFÜGUNG GESTELLT
STILLSCHWEIGEND, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GARANTIEN DER MARKTGÄNGIGKEIT,
EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG. In keinem Fall wird das
AUTOREN ODER COPYRIGHT-INHABER HAFTEN FÜR ANSPRÜCHE, SCHÄDEN ODER ANDERE
HAFTUNG, OB BEI VERTRAGS-, TORT- ODER ANDERWEITIGEN MASSNAHMEN AUS,
AUS ODER IM ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN HANDELN IN DER
SOFTWARE.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.4 (2022-02-13)
* (ioKlausi) Release Script added

### 0.2.3
* (ioKlausi) AbortController added

### 0.2.2
* (ioKlausi) Übersetzungen hinzugefügt & Kompaktmodus getestet

### 0.2.1
* (ioKlausi) Creation of states adapted

### 0.2.0
* (ioKlausi) Compatibility check to js-controller 4.0

## License
MIT License

Copyright (c) 2022 ioKlausi <nii@gmx.at>

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