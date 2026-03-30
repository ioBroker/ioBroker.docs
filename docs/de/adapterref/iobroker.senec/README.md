---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.senec.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.senec.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/senec-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/senec-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/nobl/ioBroker.senec/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.senec.png?downloads=true
---
![Logo](/admin/senec.png)
# ioBroker.senec

## SENEC Adapter für ioBroker
Der Adapter wurde initial für Senec Home V2.1 Systeme entwickelt.
Im Senec.Home System können nur ausgewählte Werte durch den Adapter verändert werden. Die Nutzung dieser Funktionalität geschieht auf eigenes Risiko und muss vorher manuell in der Konfiguration aktiviert werden.
Senec stellt derzeit über die Webschnittstelle auch keine zuverlässige Möglichkeit mehr zur Verfügung, das Peak Shaving zu beeinflussen. Hierzu muss mein-senec.de bemüht werden.
Ob andere Systeme (z.B. V3) ebenfalls damit funktionieren, ist davon abhängig, ob diese ebenfalls auf lala.cgi basieren und die gleichen JSON Informationen zur Verfügung stellen.
Auch bei Einbindung in die Senec.Clound ist nicht gewährleistet, dass die Daten weiterhin über die Webschnittstelle abgerufen werden können (hierzu bitte Erfahrungsberichte).

Systeme, die funktionieren dürften, da sie die gleiche Schnittstelle nutzen sind nachfolgend gelistet. Allerdings können die Datenpunkte unterschiedlich sein (fehlen, zusätzlich, geändert).
* Senec Home 4.0 / Blei
* Senec Home 6.0 Pb
* Senec Home 8.0 / Blei
* Senec Home 10.0 Pb
* Senec Home 5.0/7.5/10.0 / Lithium
* Senec Home 15.0 / Lithium
* Senec Home V2 5.0/7.5/10.0
* Senec Home V2 10.0 / Blei
* Senec Home V2.1 1ph / Lithium
* Senec.Home V3 Hybrid
* Senec.Home V3 Hybrid duo
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

### Installation
Eine Instanz des Adapters wird über die ioBroker Admin-Oberfläche installiert. 
Nach Abschluss der Installation einer Adapterinstanz öffnet sich automatisch ein Konfigurationsfenster.

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
   
#### Channel: _calc
Dieser Kanal enthielt berechnete Werte. Nicht mehr versorgt, da STATISTIC nicht mehr verfügbar.

   
#### Channel: BMS

* BL[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt: ? für jeden Battery Pack.*
   
* CHARGED_ENERGY[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Energie je Battery Pack geladen wurde. Einheit: ?*
   
* CHARGE_CURRENT_LIMIT[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die Ladeleistung je Battery Pack in Ampere ist.*
   
* CURRENT[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Ampere jeder Battery Pack aktuell hat.*
   
* CYCLES[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviele Ladezyklen jeder Battery Pack hat.*
   
* DISCHARGED_ENERGY[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wieviel Energie aus einem Battery Pack ausgespeist wurde. Einheit: ?*
   
* DISCHARGE_CURRENT_LIMIT[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welche Entladeleistung jeder Battery Pack aktuell hat.*
   
* FW[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welche Firmwareversion ein Battery Pack aktuell hat.*
   
* HW_EXTENSION[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welche Hardware Erweiterung der jeweilige Battery Pack hat.*
   
* HW_MAINBOARD[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welche Hardwareversion das Mainboard des jeweiligen Battery Pack hat.*
   
* MAX_CELL_VOTAGE[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die maximale Voltzahl des einzelnen Battery Pack ist.*
   
* MIN_CELL_VOTAGE[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die minimale Voltzahl des einzelnen Battery Pack ist.*
   
* SN[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie die Seriennummer des einzelnen Battery Pack lautet.*
   
* SOC[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie der Ladezustand des einzelnen Battery Pack ist.*
   
* SOH[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie der Gesundheitszustand des einzelnen Battery Pack ist.*
   
* STATUS[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie der Status des einzelnen Battery Pack ist.*
   
* TEMP_MAX[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die maximale Temperatur des einzelnen Battery Pack ist.*
   
* TEMP_MIN[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die minimale Temperatur des einzelnen Battery Pack ist.*
   
* VOLTAGE[0-3]

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, wie hoch die Volt des einzelnen Battery Pack sind.*
   
* BMS_READY_FLAG

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, falls das BMS bereit ist.*
   
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
   
* START_UPDATE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, falls ein Update zu starten ist.*
   
* WIZARD_ABORT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, der Einrichtungsprozess unterbrochen wurde.*
   
* WIZARD_CONFIRM

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, der Einrichtungsprozess bestätigt wurde.*
   
* WIZARD_DCCONNECT

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, der Einrichtungsprozess ?.*
   
* WIZARD_START

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, welcher true ist, der Einrichtungsprozess gestartet wurde.*
   
* WIZARD_STATE

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |number|R|

   *Nur lesbare Zahl, die angibt, welchen Status der Einrichtungsprozess hat.*

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
   
* GUI_BOOSTING_INFO

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, dessen Sinn bisher nicht eindeutig klar ist.*
   
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
   
* STAT_MAINT_REQUIRED

    |Data type|Permission|                                                                       
    |:---:|:---:|
    |boolean|R|

   *Nur lesbarer boolscher Wert, der angibt, ob das System gewartet werden muss.*
   
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
   
#### Channel: STATISTIC
Existiert nicht mehr
 
   
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

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.4.5 (2026-03-03)
- fixed typo that made today/hourly today/horly. You can safely delete the horly branch Measurements/Daily/horly
- Updated delay for token refresh (it can be up to 2 min now).

### 2.4.4 (2026-03-03)
- Exponential backoff, if all systems cannot get polled. If at least 1 system can be polled we resume normal action. Now - if all systems fail polling (like 1 if you only have 1) this would be example backoff times for a 5min base interval: 1 Failure -> 0-10 min, 2 Failure -> 0-20 min, 3 Failures -> 0-40 min, 4+ Failures -> 0-40 min. Once polling works again we will resume normal operations.

### 2.4.3 (2026-03-03)
- API uses its own backoff settings when polling. You can only configure delay between polls. Instead we are using strategy used by: AWS SDK, Google Cloud SDK, Stripe API client, Kubernetes controllers or Distributed message brokers to prevent: retry storms, thundering herd, burst collapse after outage recovery, adapter lockups or permanent dead loops. This leads to: IF (SENEC API down for 2 hours, or Token refresh fails 20 times, or 429 rate limiting kicks in, or Internet drops temporarily) ? (Never dies, never overlaps, never floods API, always recovers)
- API polling no longer honors retries-setting. It will just keep backing off exponentially if errors persist -> we keep trying until you stop the adapter.
- Using Token-Refresh strategy. No unnecessary logins anymore.
- 401 won't throw warning anymore
- ReAuth shouldn't stop polling anymore

### 2.4.2 (2026-03-03)
- AuthToken in _api is no longer used. You can safely delete it.
- Decoupled frequencies to lower API load. Every poll: Dashboard and today values; Once per day: Yesterday, Monthly, Yearly values (we reduce load by about 65% compared to polling everything every time)
- AccessToken logic centralized
- True Single Flight Token refresh (avoiding duplicate logins, duplicate login storms)
- Avoiding overlapping Polls
- exponential backoff on auth failure
- retry backoff
- proper lifecycle safety
- Automatic 401 retry

### 2.4.1 (2026-03-01)
- Fixing issues with polling from senec api when token expires
- Old entries in changelog moved to old.

### 2.4.0 (2026-02-28)
- Senec changed login procedure (again). Adapter now also works with 2-stage login where senec asks for username/email first and password second.
- Dependency updates

### 2.3.0 (2026-02-17)
- Measurements for today and yesterday are also available by the hour
- Measurements for month and previous month are also available by day
- Measurements for year are also available by month
- Unit calculation fixed if we don't know the unit yet per state_attr.js
- Added definitions for cascadeDevicesCount and mode
- Dependency update

### 2.2.2 (2026-02-06)
- Migrated to i18n
- Update handling of "new" states that are just an "extra" to an existing state like state and state.1 or state.42
- Dependency Updates

### 2.2.1 (2026-02-06)
- Fixed: History rebuild will only run once now when requested (remember: To force rebuild you need to configure this in settings)

### 2.2.0 (2026-02-05)
- Polling yearly measurements as year from API - not months (and summing them up)
- Added back AllTimeHistory with BATTERY_LEVEL_IN_PERCENT averaged and AUTARKY_IN_PERCENT calculated
- Removed selection to use https or http for lala.cgi. https is enforced now.

### 2.1.3 (2026-02-04)
- reading all previous years (up to inception of SENEC) added again (to make this happen: activate recalculation of full history via settings)
- added today / yesterday again
- optimizations for measurements handling
- less log noise

### 2.1.2 (2026-02-04)
- more silencing log messages
- housekeeping

### 2.1.1 (2026-02-04)
- fixed datatype for WIZARD.SG_READY_CURR_MODE
- less logging (moved some info to debug again)

### 2.1.0 (2026-02-04) - the API returns - finally finally hopefully finally

- Complete rewrite of the Senec API functionality. Thanks to @timfxtones for pointing me in the right direction
- No longer using the web-interface at mein-senec.de - it didn't work properly on the long run ...
- Still missing some datapoints so far. They will be implemented in the future.

### 2.0.0 (maett81, NoBl)
* Updated to use new SENEC API via mein-senec.de - Thanks to @maett81
* Some code and dependency housekeeping

### [Former Updates](CHANGELOG_old.md)

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