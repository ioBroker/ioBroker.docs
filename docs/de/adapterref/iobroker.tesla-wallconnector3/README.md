---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.tesla-wallconnector3.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.tesla-wallconnector3.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/tesla-wallconnector3-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/tesla-wallconnector3-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.tesla-wallconnector3/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.tesla-wallconnector3.png?downloads=true
---
![Logo](/admin/tesla-wallconnector3.png)
# ioBroker.tesla-wallconnector3

## Tesla Wall Connector Gen 3 Adapter für ioBroker
Ausgerichtet auf den Tesla Wall Connector Gen 3.
Bietet nur Lesezugriff auf API-Daten (Schreiben wird von der API nicht unterstützt).

### Installation
Eine Instanz des Adapters wird über die ioBroker Admin-Oberfläche installiert. 
Nach Abschluss der Installation einer Adapterinstanz öffnet sich automatisch ein Konfigurationsfenster.

## Konfiguration

### Fenster "Haupteinstellungen"
![Main Settings](media/mainSettings.png "Haupteinstellungen")

| Feld         | Beschreibung |                                                                       
|:-------------|:-------------|
|Tesla Wall Connector Gen 3    |Hier wird die IP-Adresse des gewünschten Tesla Wall Connector Gen 3 angegeben. Falls im Netzwerk ein funktionierender DNS existiert, kann auch der FQDN angegeben werden.|
|Abfrageintervall|Hier wird eingegeben, in welchen Zeitintervallen (Millisekunden) die Werte vom Tesla Wall Connector Gen 3 abgerufen werden. (Default: 10 Sekunden)|
|Request-Timeout|Hier wird eingegeben, nach wievielen Millisekunden eine Anfrage spätestens vom Tesla Wall Connector Gen 3 beantwortet sein muss, bevor die Anfrage abgebrochen wird. (Default: 5000)|
|Wiederholungsversuche|Hier wird angegeben, wie oft versucht werden soll, den Tesla Wall Connector Gen 3 anzufragen, falls es zu einem Fehler kommt. Dies gilt nicht beim Start des Adapters - sollte das System dabei nicht erreichbar sein, beendet der Adapter seine Arbeit. (Default: 10)|
|Polling-Wiederholungsfaktor|Mit diesem Wert kann der Abstand zwischen den Wiederholungsversuchen beeinflusst werden. Es gilt: der n'te Wiederholungsversuch erfolgt nach Intervall * Multiplikator * n Sekunden nach Versuch n-1. Beispiel: Mit Standardwerten erfolgt der 1. Wiederholungsversuch 20 Sekunden nach dem initialen Versuch und der 2. Wiederholungsversuch erfolgt 40 Sekunden nach dem 1. Ein erfolgreicher Datenabruf setzt den Zähler für Wiederholungen zurück.|

Nach Abschluss der Konfiguration wird der Konfigurationsdialog mit `SPEICHERN UND SCHLIEßEN` verlassen. 
Dadurch erfolgt im Anschluß ein Neustart des Adapters.

## Instanzen
Die Installation des Adapters hat im Bereich `Objekte` eine aktive Instanz des Tesla Wall Connector Gen 3 Adapters angelegt.

Auf einem ioBroker Server können mehrere Tesla Wall Connector Gen 3 Adapter Instanzen angelegt werden. Umgekehrt kann ein Tesla Wall Connector Gen 3 auch mit mehreren ioBroker Servern betrieben werden. Sollen mehrere Geräte von einem ioBroker Server gesteuert werden, sollte je System eine Instanz angelegt werden.
<br/><br/>
Ob der Adapter aktiviert und mit dem System verbunden ist, wird mit der Farbe des Status-Feldes der Instanz verdeutlicht. Zeigt der Mauszeiger auf das Symbol, werden weitere Detailinformationen dargestellt. 

## Objekte des Adapters
Im Bereich `Objekte` werden in einer Baumstruktur alle vom Adapter über die API erkannten Datenpunkte aufgelistet.

Nachfolgend werden die Objekte in States unterteilt.
Jeder Datenpunkt ist mit seinem zugehörigen Datentyp sowie seinen Berechtigungen aufgeführt. 
Berechtigungen können dezeit nur lesend (R) sein. Jeder Datenpunkt kann mindestens gelesen (R) werden.
Zur Suche nach einem bestimmten Datenpunkt empfiehlt sich die Suche mittels der Tastenkombination "STRG + F".
Abhängig vom individuellen System können States nicht existieren oder aber auch nicht dokumentierte States auftreten.
Falls zu einem State keine Dokumentation vorhanden ist, jemand aber weiß, was der State darstellt, bitte ich um einen entspr. Pull-Request (oder Ticket mit der entspr. Information eröffnen).

### Bekannte States

#### Channel: info

* info.connection

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-only Boolescher Wert, der wahr ist, wenn der Adapter mit dem Tesla Wall Connector Gen 3 verbunden ist.
   
#### Channel: lifetime
   
* alert_count

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Nur-Lese-Zahl, die die Anzahl der Alarme angibt.
   
* avg_startup_temp

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur-Lese-Zahl, die die durchschnittliche Starttemperatur angibt.
   
* charge_starts

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Nur-Lese-String, der die Anzahl der Ladestarts angibt.*
   
* charging_time_s

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Nur-Lese-Zahl, die die Ladezeit des WC3 in Sekunden angibt*
   
* connector_cycles

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur-Lese-Zahl, die die Anzahl der Steckverbinder-Zyklen angibt (das Ein- und Ausstecken wird höchstwahrscheinlich jeweils als 1 gezählt).*
   
* contactor_cycles

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Nur-Lese-Zahl, die die Anzahl der bisherigen Zustandsänderungen des Relais angibt.*
   
* contactor_cycles_loaded

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Nur-Lese-Zahl, die die Anzahl der Ladezyklen angibt.*
   
* energy_wh

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Nur-Lese-Zahl, die die gelieferte Energiemenge in Wh angibt.*
   
* thermal_foldbacks

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur-Lese-Zahl, die die Anzahl der Rücksetzer wegen Temperatur angibt.*
   
* uptime_s

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Zahl|R|

   *Nur-Lese-Zahl, die die Betriebszeit des WC3 in Sekunden angibt*
   
#### Channel: version

* firmware_version

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |string|R|

   *Firmwareversion auf dem Tesla Wall Connector Gen 3*
   
* part_number

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |string|R|

   *Teilenummer des Tesla Wall Connectors Gen 3*
   
* serial_number

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |string|R|

   *Seriennummer des Tesla Wall Connectors Gen 3*
   
#### Kanal: vitals

* current_alerts

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |string|R|

   *Read-Only-String mit Details zu Alarmen.*
   
* contactor_closed

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-Only Boolescher Wert, der angibt, ob das Relais geschlossen ist.*
   
* grid_hz

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-Only Zahl, die die Frequenz des Netzes angibt.*
   
* config_status

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-Only Zahl, die den Konfigurationsstatus angibt. Bitte helfen Sie mit Details!*
   
* current[A,B,C,N]_a

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die den Strom der Leitung [A,B,C,N] in Ampere darstellt.*
   
* evse_state

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die den evse-Status darstellt. Bisher scheinen wir zu wissen: 0=Booting, 1=Leerlauf, 2=angeschlossen, aber nicht bereit, 3=???, 4=angeschlossen und bereit, 5=???, 6=Fahrzeug eingesteckt und Handshaking, 7=???, 8=Laden abgeschlossen/unterbrochen, 9=Ladebereit, aber auf Auto wartend, 10=Laden mit reduzierter Leistung (weniger als 3 Phasen, je 16 Ampere), 11=Laden mit voller Leistung (3 Phasen, je 16 Ampere), 12=??? *
   
* grid_v

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die die Spannung des Netzes angibt.*
   
* handle_temp_c

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die die Temperatur des Griffs in °C angibt.*
   
* input_thermopile_uv

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die die Temperatur repräsentiert.*
   
* mcu_temp_c

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die die Temperatur der Hauptsteuereinheit in °C angibt.*
   
* pcba_temp_c

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die die Temperatur der Leiterplatte in °C angibt.*
   
* pilot_high_v

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die die Hochspannung der Pilotleitung angibt.*
   
* pilot_low_v

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Nur-Lese-Zahl, die die Niederspannung der Pilotleitung angibt.*
   
* prox_v

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only-Zahl, die die Niederspannung repräsentiert.*
   
* relay_coil_v

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only-Zahl, die die Spannung der Relaisspulen darstellt.*
   
* session_s

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only-Zahl, die die Dauer der aktuellen Ladesitzung in Sekunden angibt.*
   
* session_energy_wh

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die die in der aktuellen Sitzung gelieferte Energie in Wh angibt.*
   
* uptime_s

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only-Zahl, die die Betriebszeit des WC3 in Sekunden angibt.*
   
* vehicle_connected

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Read-Only Boolescher Wert, der angibt, ob ein Fahrzeug angeschlossen ist.*
   
* vehicle_current_a

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |number|R|

   *Read-Only Zahl, die den Fahrzeugstrom in Ampere angibt.*
   
* Spannung[A,B,C]_v

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Read-Only Zahl, die die Spannung der Leitung [A,B,C] darstellt.*
   
#### Kanal: wifi_status

* Internet

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolescher Wert, der angibt, ob der Tesla Wall Connector Gen 3 mit dem Internet verbunden ist.*
   
* wifi_connected

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolescher Wert, der angibt, ob der Tesla Wall Connector Gen 3 mit dem WLAN verbunden ist.*
   
* wifi_infra_ip

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |string|R|

   *Read-only-String, der die IP des Tesla Wall Connectors Gen 3 darstellt.*
   
* wifi_mac

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |string|R|

   *Read-only-String, der die MAC-Adresse des Tesla Wall Connectors Gen 3 darstellt.*
   
* wifi_rssi

    |Datentyp|Erlaubnis|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur-Lese-Zahl, die die rssi des WLANs angibt, mit dem der Tesla Wall Connector Gen 3 verbunden ist.*
   
* wifi_signal_strength

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Nur-Lese-Zahl, die die Signalstärke des WLANs angibt, mit dem der Tesla Wall Connector Gen 3 verbunden ist.*
   
* wifi_snr

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |Nummer|R|

   *Nur-Lese-Zahl, die die Nummer des WLANs angibt, mit dem der Tesla Wall Connector Gen 3 verbunden ist.*
     
* wifi_ssid

    |Datentyp|Berechtigung|                                                                       
    |:---:|:---:|
    |string|R|

   *SSID, mit der der Tesla Wall Connector Gen 3 verbunden ist.*

## Changelog

### 1.0.6 (NoBl)
* Maintenance update (dependencies, ...)

## License
MIT License

Copyright (c) 2024 Norbert Bluemle <github@bluemle.org>

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