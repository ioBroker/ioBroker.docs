---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.senec.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.senec.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/senec-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/senec-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.senec/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.senec.png?downloads=true
BADGE-WERO: https://img.shields.io/badge/WERO-8A2BE2
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-00457C?logo=paypal&logoColor=white
BADGE-Buy Me a Coffee: https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FFDD00?logo=buymeacoffee&logoColor=black
BADGE-GitHub Sponsor: https://img.shields.io/badge/Sponsor-GitHub-181717?logo=github&logoColor=white
---
![Logo](/admin/senec.png)
# ioBroker.senec

## SENEC Adapter für ioBroker
Der Adapter wurde initial für Senec Home V2.1 Systeme entwickelt.
Im Senec.Home System können nur ausgewählte Werte durch den Adapter verändert werden. Die Nutzung dieser Funktionalität geschieht auf eigenes Risiko und muss vorher manuell in der Konfiguration aktiviert werden.
Senec stellt derzeit über die Webschnittstelle auch keine zuverlässige Möglichkeit mehr zur Verfügung, das Peak Shaving zu beeinflussen. Hierzu muss mein-senec.de bemüht werden.
Ob andere Systeme (z.B. V3) ebenfalls damit funktionieren, ist davon abhängig, ob diese ebenfalls auf lala.cgi basieren und die gleichen JSON Informationen zur Verfügung stellen.
Auch bei Einbindung in die Senec.Clound ist nicht gewährleistet, dass die Daten weiterhin über die Webschnittstelle abgerufen werden können (hierzu bitte Erfahrungsberichte).

Der Adapter unterstützt lokales Polling via lala.cgi als auch via Web API.

Systeme, die funktionieren dürften, da sie die gleiche Schnittstelle nutzen sind nachfolgend gelistet. Allerdings können die Datenpunkte unterschiedlich sein (fehlen, zusätzlich, geändert).
* Senec Home 4.0,  6.0, 8.0, 10.0 / Blei
* Senec Home 5.0, 7.5, 10.0, 15.0 / Lithium
* Senec Home V2 5.0, 7.5, 10.0
* Senec Home V2.1
* Senec.Home V3
* Senec.Home V4
* Senec Business 30.0 / Blei
* Senec Business V2 30.0 / Blei
* Senec Business 25.0 / Lithium
* Senec Business V2_2ph / Lithium
* Senec Business V2 3ph / Lithium
* ADS Tec
* OEM LG
* Solarinvert Storage 10.0 / Blei

Senec Systeme, die über kein lokales Webinterface verfügen, können möglicherweise über die API Option dennoch überwacht werden. Rückmeldungen jeglicher Art diesbezüglich sind gerne gesehen.

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder -logos sind Warenzeichen™ oder eingetragene® Warenzeichen der jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit oder Befürwortung durch diese oder zugehörige Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit gepflegt und hat kein geschäftliches Ziel.

### SENEC.Home
Es handelt sich um ein System, dessen Herzstück ein Lithium-Ionen-Akku ist, der Strom speichert und wieder abgibt, der von der Solaranlage auf dem Dach erzeugt wird. Das funktioniert genau wie beim Akku im Smartphone, Notebook oder dem Akkuschrauber. Es steckt im Prinzip auch die gleiche bewährte Technologie drin. Wenn du mehr Strom auf dem Dach erzeugst, als du selbst im Haus verbrauchen kannst, fließt der Strom nicht ins Netz, sondern in deinen Speicher. Du kannst ihn dann nutzen, wenn es dunkel wird oder Wolken aufziehen und du weniger oder keinen Strom mehr erzeugst. Dann kannst du auch abends mit deinem eigenen Solarstrom den Fernseher betreiben oder das Essen kochen. 

## Voraussetzungen vor der Installation
Voraussetzungen für den Betrieb eines Senec.Home Speichersystems mit ioBroker, ist die erfolgreiche Einrichtung des Systems durch einen Elektriker. Ebenfalls muss sich das System im gleichen Netzwerk wie der ioBroker befinden.

## Konfiguration

### Fenster "Allgemeine Einstellungen"
![Main Settings](media/mainSettings.png "Allgemeine Einstellungen")

| Feld         | Beschreibung |                                                                       
|:-------------|:-------------|
|SENEC System    |Hier wird die IP-Adresse des gewünschten Senec.Home Systems angegeben werden. Falls im Netzwerk ein funktionierender DNS existiert, kann auch der FQDN angegeben werden.|
|https verwenden?|Sollte das SENEC System bereits auf https umgestellt worden sein, so muss diese Option aktiviert werden.|
|Abfrageintervall hohe Priorität|Hier wird eingegeben, in welchen Zeitintervallen (Millisekunden) die Werde hoher Priorität vom Senec.Home Systems abgerufen werden. (Default: 10 Sekunden)|
|Abfrageintervall niedrige Priorität|Hier wird eingegeben, in welchen Zeitintervallen (Millisekunden) die Werde niedriger Priorität vom Senec.Home Systems abgerufen werden. (Default: 60 Minuten)<br>
Achtung! Wird das SENEC System mit zu hoher Frequenz abgefragt, kann dies dazu führen, dass keine Daten mehr an die SENEC Server übermittelt werden können! (z.B. keine aktuellen Werte in der App oder auf mein-senec.de)|
|Request-Timeout|Hier wird eingegeben, nach wievielen Millisekunden eine Anfrage spätestens vom Senec.Home System beantwortet sein muss, bevor die Anfrage abgebrochen wird. (Default: 5000)|
|Wiederholungsversuche|Hier wird angegeben, wie oft versucht werden soll, das Senec System anzufragen, falls es zu einem Fehler kommt. Dies gilt nicht beim Start des Adapters - sollte das System dabei nicht erreichbar sein, beendet der Adapter seine Arbeit. (Default: 10)|
|Polling-Wiederholungsfaktor|Mit diesem Wert kann der Abstand zwischen den Wiederholungsversuchen beeinflusst werden. Es gilt: der n'te Wiederholungsversuch erfolgt nach Intervall * Multiplikator * n Sekunden nach Versuch n-1. Beispiel: Mit Standardwerten erfolgt der 1. Wiederholungsversuch 20 Sekunden nach dem initialen Versuch und der 2. Wiederholungsversuch erfolgt 40 Sekunden nach dem 1. Ein erfolgreicher Datenabruf setzt den Zähler für Wiederholungen zurück.|

Nach Abschluss der Konfiguration wird der Konfigurationsdialog mit `SPEICHERN UND SCHLIEßEN` verlassen. 
Dadurch erfolgt im Anschluß ein Neustart des Adapters.

### Fenster "Zusätzliche HighPrio Polling Datenpunkte"
![Polling Settings](media/pollingSettings.png "Zusätzliche HighPrio Polling Datenpunkte")

| Feld         | Beschreibung |                                                                       
|:-------------|:-------------|
|Disclaimer    |Um Änderungen am Polling-Verhalten des Adapters vorzunehmen, muss bestätigt werden, dass Sie möglicher Risiken gewahr sind und diese willentlich und wissentlich akzeptieren. Der Entwickler des Adapters trägt keine Verantwortung.|
|Datenpunkte für unterschiedliche Bereiche|Hier können zusätzliche Datenpunkte angegeben werden, die mit hoher Priorität abgerufen werden sollen. Es dürfen nur Zeichen A-Z und Ziffern 0-9 sowie , zur Trennung genutzt werden.|
|Datapoints zum Abruf hinzufügen?|Bestätigen Sie hier nochmals, dass sie die von Ihnen angegebenen Datenpunkte tatsächlich dem Polling mit hoher Priorität hinzufügen möchten.|

Achtung! Wird das SENEC System mit zu hoher Frequenz und/oder zuvielen Datenpunkten abgefragt, kann dies dazu führen, dass keine Daten mehr an die SENEC Server übermittelt werden können (z.B. keine aktuellen Werte in der App oder auf mein-senec.de)! Auch kann das SENEC-System unmotiviert neu starten und/oder auf Anfragen nicht mehr reagieren. In diesem Fall hilft ein Stopp des Adapters und anschließende Korrektur der Einstellungen.

Nach Abschluss der Konfiguration wird der Konfigurationsdialog mit `SPEICHERN UND SCHLIEßEN` verlassen. 
Dadurch erfolgt im Anschluß ein Neustart des Adapters.

## Instanzen
Die Installation des Adapters hat im Bereich `Objekte` eine aktive Instanz des Senec Adapters angelegt.

Auf einem ioBroker Server können mehrere Senec Adapter Instanzen angelegt werden. Umgekehrt kann ein Senec.Home System auch mit mehreren ioBroker Servern betrieben werden. Sollen mehrere Geräte von einem ioBroker Server gesteuert werden, sollte je System eine Instanz angelegt werden.
<br/><br/>
Ob der Adapter aktiviert und mit dem System verbunden ist, wird mit der Farbe des Status-Feldes der Instanz verdeutlicht. Zeigt der Mauszeiger auf das Symbol, werden weitere Detailinformationen dargestellt. 

## Objekte des Adapters
Im Bereich `Objekte` werden in einer Baumstruktur alle vom Adapter im Hub erkannten Geräte und Aktivitäten aufgelistet.

Nachfolgend werden die Objekte in States unterteilt.
Jeder Datenpunkt ist mit seinem zugehörigen Datentyp sowie seinen Berechtigungen aufgeführt. 
Berechtigungen können dezeit nur lesend (R) sein. Jeder Datenpunkt kann mindestens gelesen (R) werden.
Zur Suche nach einem bestimmten Datenpunkt empfiehlt sich die Suche mittels der Tastenkombination "STRG + F".
Abhängig vom individuellen System können States nicht existieren oder aber auch nicht dokumentierte States auftreten.
Falls zu einem State keine Dokumentation vorhanden ist, jemand aber weiß, was der State darstellt, bitte ich um einen entspr. Pull-Request (oder Ticket mit der entspr. Information eröffnen).

### Beispiel States (verfügbare States sind abhängig von System und Softwarestand, die Liste ist grundsätzlich unvollständig)

#### Channel: info

* info.connection

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, wenn die Verbindung zwischen ioBroker und Senec.Home hergestellt ist.*

#### Channel: _api
Werte, die von der Web API abgerufen werden
   
#### Channel: BMS
   
* MODULES_CONFIGURED

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele Module im System konfiguriert sind.*
   
* MODULE_COUNT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele Module im System angeschlossen sind (inkl. nicht konfigurierter).*

#### Channel: ENERGY

* GUI_BAT_DATA_CURRENT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die den aktuellen Batteriestrom in Ampere angibt.*
   
* GUI_BAT_DATA_FUEL_CHARGE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die den Füllstand in % des Systems angibt.*
   
* GUI_BAT_DATA_VOLTAGE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die die derzeitige Batteriespannung in Volt angibt*
   
* GUI_BAT_DATA_POWER

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Watt gerade in die Batterie eingespeist werden oder aus ihr entnommen (negativer Wert) werden.*
   
* GUI_CHARGING_INFO

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, der angibt, ob die Batterie gerade geladen wird.*
   
* GUI_GRID_POW

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Watt gerade aus dem Netz gezogen oder ins Netz eingespeist (negativer Wert) werden.*
   
* GUI_HOUSE_POW

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Watt gerade vom Haus verbraucht werden.*
   
* GUI_INVERTER_POWER

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Watt vom PV System gerade erzeugt werden.*
   
* STAT_HOURS_OF_OPERATION

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die die Betriebsstunden des Systems angibt.*
   
* STAT_STATE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die den Zustand des Systems repräsentiert.*
   
* STAT_STATE_Text

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Nur lesbare Zeichenkette, die den Zustand des Systems in Klartext angibt. Leider liegen uns nur die original Senec-Texte in Deutsch vor.*
   

#### Channel: SYS_UPDATE

* NPU_IMAGE_VERSION

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, mit dem Wert für Revision NPU-IMAGE (*

* NPU_VER

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die mit dem Wert für Revision NPU-REGS*

* UPDATE_AVAILABLE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, der angibt, ob ein Update vorhanden ist (diese werden allerdings von Senec zur Verfügung gestellt und auch automatisiert eingespielt).*
   
   
#### Channel: WIZARD

* APPLICATION_VERSION

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Nur lesbarer Text, mit dem Wert für Revision MCU.*

* CONFIG_LOADED

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, der angibt, ob die Konfiguration geladen wurde (dieser Wert sollte nicht dauerhaft auf falsch stehen).*
   
* INTERFACE_VERSION

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Nur lesbarer Text, mit dem Wert für Revision GUI.*
   
* SETUP_NUMBER_WALLBOXES

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele Wallboxen im System konfiguriert sind.*
   
* SETUP_WALLBOX_SERIAL[0..3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |string|R|

   *Nur lesbarer Text, die die Seriennummern der evtl. vorhandenen Wallboxen 0-3 angibt.*

### Nicht mehr vorhanden, bzw. entfernt
* STATISTIC
* Display
* _calc (mit Wegfall von STATISTIC nicht mehr relevant)
* BAT1OBJ[2-4]

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

### 2.8.2 (2026-07-09)
- removed v2.8.0 from documentation - it never was released

### 2.8.1 (2026-07-09)
- Housekeeping
- Code optimizations
- Log messages now include connector prefix ([API], [Local], [Web], [Connect]) for easier filtering and debugging

### 2.7.0 (2026-07-07)
- SENEC Account tab: Shared credentials (email, password, TOTP) moved to a dedicated tab, always visible regardless of which cloud features are enabled.
- mein-senec.de controls: Emergency power reserve, peak shaving (mode, capacity limit, end time), and SG-Ready settings can now be controlled via mein-senec.de. Controls appear under `control.EmergencyPower`, `control.PeakShaving`, and `control.SGReady`. Enable in adapter settings under Appliance Control.
- Switchable socket control via mein-senec.de: Sockets can now be controlled via mein-senec.de web portal in addition to local lala.cgi. Unified control datapoints (Mode: Off/On/Auto, thresholds, durations, switch-on time) work with both connectors. A force override option is available for systems where socket capability is not detected.
- Connector-based control routing: Appliance Control tab restructured with per-connector consent checkboxes and per-feature connector dropdowns (Off/Local/API/Web). Only one connector per feature to avoid conflicts. Warning messages shown when a selected connector is not enabled.
- Independent control gates: Web, API, and local controls each have independent gates in state change handling. API controls no longer require local lala.cgi connection. Fixed plant number 0 falsy bug.
- API error handling: All mein-senec.de POST handlers check HTTP response status and log error messages from the API.
- Peak shaving fixes: Capacity limit uses correct field (peakShavingCapacityLimitInPercent), capped at 90%. End time split into EndHour/EndMinute fields. UTC timestamp construction for correct time handling with SENEC API.
- Debug & Logging tab: Debug settings moved to a dedicated tab applying to all connectors. Request/response logging now includes mein-senec.de traffic.

### 2.6.0 (2026-07-06)
- TOTP/2FA: If your mein-senec.de account requires two-factor authentication, you can now enter your TOTP secret (the base32 key from your authenticator app setup) in the adapter settings. The adapter will automatically generate login codes — no manual interaction needed.
- Switchable sockets: If your SENEC system has switchable sockets configured, you can now control them via `control.Sockets` datapoints. Enable in adapter settings under active appliance control.
- Section discovery: The adapter now queries the device at startup to discover available data sections. New sections are automatically added to polling, and unavailable sections are removed. Check `info.discoveredSections` and `info.unavailableSections` for details.
- Added support for AMPACE battery module data (cell temperatures, alarm/fault/warning states).
- System details: Battery SOH, inverter state/temperatures, module states, casing temperature, warranty info and more are now polled from the SENEC app API (hourly).
- Abilities: Installed feature packages (MOBILITY, PEAK_SHAVING, SG_READY, etc.) are queried at startup.
- Wallbox control (experimental): If your SENEC system has wallboxes, you can control charging current, smart charge, and intercharge via `control.Wallbox` datapoints. Enable in adapter settings. Please report your experience to the developer.
- Wallbox cloud API (experimental): Wallbox discovery and measurements via SENEC App API. Wallbox data is polled on all tiers (dashboard/details/heavy) including AllTime history rebuild. Cloud-based wallbox control is being worked on. Shoutout to [marq24](https://github.com/marq24/ha-senec-v3) for the groundwork on wallbox API integration in the HA community.
- New API endpoints: System status, data availability, online state, and forecast charging settings.
- API polling resilience: Each API endpoint is now polled independently via `Promise.allSettled` — one failing endpoint no longer blocks others in the same tier. Per-endpoint last-poll timestamps visible under `_api.info.lastPoll.*`.
- SENEC.Connect: Support for the official SENEC.Connect API (paid subscription). Provides battery, meter, and wallbox data via a simple subscription key. Configure in the new SENEC.Connect tab in adapter settings. Note: At this point SENEC.Connect appears to only be available for V4/E4 systems. Older systems (V2/V3) may return empty data.
- API paths updated to June 2026 format for future compatibility.

### 2.5.5 (2026-07-06)
- Add TOTP/2FA support for SENEC API login (configure TOTP secret in adapter settings)
- Replace plain setTimeout/clearTimeout with adapter-managed timers
- Dependency updates

### [Former Updates](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2026 Norbert Bluemle <github@bluemle.org>

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