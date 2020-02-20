---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heatingcontrol/README.md
title: ioBroker.HeatingControl
hash: Exura2yBrEXdqssjKxhv8ukzoEsx89Y0kzExyM1kZ8U=
---
![Logo](../../../en/adapterref/iobroker.heatingcontrol/admin/heatingcontrol.png)

![Anzahl der Installationen](http://iobroker.live/badges/heatingcontrol-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.heatingcontrol.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heatingcontrol.svg)
![Tests](https://travis-ci.org/rg-engineering/ioBroker.heatingcontrol.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.heatingcontrol.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/rg-engineering/ioBroker.heatingcontrol.svg)

# IoBroker.HeatingControl
** Wenn es dir gefällt, erwäge bitte eine Spende: **

[![paypal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url)

Adapter zur Steuerung Ihrer Heizungsanlage.

Eigenschaften:

* Kontrollieren Sie die Solltemperatur aller Thermostate nach Zeitplan
* Konfigurieren Sie mehrere Heizperioden für jeden Tag und jede Nacht
* Unterstützt verschiedene homematic und max! Thermostate
* unterstützt mehrere Profile
* Wenn keine direkte Verbindung zwischen Thermostat und Stellantrieb besteht, kann der Stellantrieb direkt aus dem Adapter geschaltet werden
* Derzeit wird der Antrieb bei Erreichen der Solltemperatur direkt abgeschaltet. Sobald die Solltemperatur unter der Isttemperatur liegt, wird der Antrieb eingeschaltet. (Aufgabe: Verbesserte Steuerung implementieren)
* Es werden unbegrenzt Thermostat, Stellantrieb und Sonde pro Raum unterstützt
* Thermostat, Stellantrieb und Sensor werden automatisch pro Raum erkannt. Hierfür wird die Funktion (zB "Heizen") verwendet.
* Räume können in der Admin-Oberfläche ausgeschlossen werden, wenn ein Raum einen Thermostat enthält, aber nicht gesteuert werden soll
* Sensor wird verwendet, um die Zieltemperatur zu verringern (z. B. wenn ein Fenster geöffnet ist); optional mit SensorDelay
* Schnittstelle zum Feiertag-Adapter oder anderen zur Erkennung von Feiertagen. Der gesetzliche Feiertag kann ein normaler Tag oder ein ähnlicher Sonntag sein. (Administratoreinstellung)
* manuelle Übersteuerung der Temperatur für eine bestimmte Zeit
* vordefinierte Heizperiode
* Ein Visualisierungsbeispiel wird später bereitgestellt

[FAQ](doc/FAQ.md)

## Installation
## Die Einstellungen
### Main
* Funktion = Funktion zur Erkennung von Thermostaten, Antrieben und Sensoren pro Raum. Es ist eine der Systemaufzählungen
* timezone = Wird für Cron verwendet, um Cron-Jobs anzupassen
* Pfad zum Feiertag - Adapter = Wenn Sie den Feiertag-Adapter verwenden möchten, um automatisch einen Feiertag für heute zu erkennen, geben Sie hier den Pfad ein (z. B. feiertage.0).
* Alle Geräte löschen, wenn der Administrator öffnet = sollte deaktiviert sein. Aktivieren Sie diese Option nur, wenn Sie alle Raum-, Aktor- und Sensoreinstellungen löschen müssen. Eine Gerätesuche wird ausgeführt, wenn der Adapteradministrator geöffnet wird
* Sensor verwendet = Wenn Sie Fenstersensoren haben und die Zieltemperatur bei geöffnetem Fenster senken möchten, aktivieren Sie diese Option
* Aktoren verwendet = wenn Sie Aktoren direkt vom Adapter steuern möchten. Nur für den Fall, dass keine direkte Verbindung zwischen Thermostat und Stellantrieb besteht.
* Antriebe verwenden, wenn keine Heizperiode = nur bei Antrieben gültig. Legt fest, wie Aktoren eingestellt werden, wenn keine Heizperiode aktiv ist
* Antriebe verwenden, wenn kein Thermostat vorhanden ist = nur gültig mit Antrieben. Wenn Sie Räume ohne Thermostat, aber mit Heizungsaktor haben, können Sie diese dauerhaft ein- oder ausschalten

### Profil
* Profiltyp = drei verschiedene Profiltypen (Montag - Sonntag oder Montag - Freitag und Suturday / Sonntag oder jeden Tag) werden unterstützt
* Anzahl der Profile = Wenn Sie mehr als ein Profil benötigen, erhöhen Sie diesen Wert. Sie können dann auswählen, welches Profil verwendet werden soll.
* Anzahl der Perioden = Definieren Sie, wie viele tägliche Abschnitte mit unterschiedlicher Temperatur Sie benötigen. Je mehr Sie einstellen, desto mehr Datenpunkte werden erstellt. Verwenden Sie besser einen niedrigen Wert (z. B. 5).
* "Feiertag wie Sonntag = Wenn Sie an Feiertagen wie Sonntag Zieltemperaturen einstellen möchten, aktivieren Sie diese Option. Ansonsten sind die Feiertagseinstellungen dieselben wie an normalen Tagen
* HeatingPeriod = Start- und Enddatum der Heizperiode. Dient zum Einstellen von "HeatingPeriodActive".

### Geräte
* eine Liste aller Räume. Hier können Sie einen Raum deaktivieren.
* Klicken Sie auf die Schaltfläche Bearbeiten auf der rechten Seite, um das Einstellungsfenster für Thermostate, Aktoren und Sensoren für diesen Raum zu öffnen

### Bearbeitungsraum
* Hier können Sie Objekt-IDs für Thermostate, Aktoren und Sensoren überprüfen und einstellen
* Sie können manuell neue Thermostate, Aktoren oder Sensoren hinzufügen. Drücken Sie einfach die + Taste. Dann erhalten Sie eine leere Zeile, die gefüllt werden muss. Der Edit-Button öffnet eine Liste der verfügbaren Geräte im System
* Thermostate:

** Name, Temperaturziel-OID und aktuelle Temperatur-OID sollten eingestellt werden.

* Aktoren

** Name und OID für Status sollten festgelegt werden

* Sensoren

** Name und OID für den aktuellen Status sollten festgelegt werden

## Datenpunkte
| DP-Name | beschreibung |
|---------------------|-----------------------------------------------------------------------------------------------------|
| HeatingPeriodActive | Wenn diese Option deaktiviert ist, werden die Profile nicht verwendet |
| AktuellesProfil | Aktuelles Profil auswählen (1 basierend, bedeutet, dass Profil 1 Datenpunkte unter HeatingControl.0.Profiles.0 verwendet) |
| LastProgramRun | Zeigt das letzte Mal an, wenn der Adapter ausgeführt wird |

### Temperatur senken / erhöhen
| DP-Name | beschreibung | Zieltemperatur für die relative Abnahme Solltemperatur für absolute Abnahme |
|-------------------|------------------------------------------------------------|--------------------------------------------------------------------------------|---------------------------------------------------------------|
| GuestsPresent | die temperatur erhöhen, weil die gäste es wärmer wollen Erhöhen Sie die aktuelle Profiltemperatur um Profiles.0.room.GuestIncrease | Setzen Sie das Ziel auf Profiles.0.room.absolute.GuestIncrease |
| PartyNow | Temperatur senken, weil es heiß wird '| Verringern Sie die aktuelle Profiltemperatur um Profiles.0.room.PartyDecrease | Setzen Sie das Ziel auf Profiles.0.room.absolute.PartyDecrease |
| Gegenwart | wir sind anwesend, wenn wir nicht anwesend sind Verringern Sie die aktuelle Profiltemperatur um Profiles.0.room.AbsentDecrease | Setzen Sie das Ziel auf Profiles.0.room.absolute.AbsentDecrease |
| VacationAbsent | wir sind abwesend, nehmen also auch am wochenende ab | Verringern Sie die aktuelle Profiltemperatur um Profile.0.room.VacationAbsentDecrease | Setzen Sie das Ziel auf Profiles.0.room.absolute.VacationAbsentDecrease |

* in beiden Fällen wird nur eine Absenkung verwendet (in der vorherigen Version des Adapters konnten mehr als eine Entfettung verwendet werden)
* im absoluten Entfettungsszenario werden nur Sollwerte ungleich 0 °C verwendet. Wenn Sie für einen bestimmten Raum keine Absenkung benötigen, halten Sie die Absenkungswerte bei 0 ° C

## Andere
* HolidayPresent

Wenn HolidayPresent auf true gesetzt ist, wird in jedem Fall das Profil für Sonntag verwendet. Wir gehen davon aus, dass Sie wie am Sonntag zu Hause sind.

* PublicHolidyToday

Es gibt eine Option, um PublicHoliday wie Sonntag zu behandeln. Diese Option kann in admin aktiviert werden.

### Fenster geöffnet
wenn "use sensors" aktiv ist und der / die Sensor (en) für einen Raum konfiguriert ist / sind

a) Verringern Sie die aktuelle Profiltemperatur bei geöffnetem Fenster (true) um Profiles.0.room.WindowOpenDecrease, wenn die relative Verringerung konfiguriert ist konfiguriert ist

optional kann eine Verzögerung verwendet werden. Wenn das Fenster nur für eine kurze Zeit geöffnet wird, kann die Sensorverzögerung vermeiden, dass das Fenster in sehr kurzen Zeiten wieder normal wird.

## Ical Unterstützung
Sie können Ihren Kalender verwenden, um Datenpunkte im Adapter zu ändern.
Konfigurieren Sie einfach Ereignisse von ical in admin. Unterstützt werden

* Heizungssteuerung.0.Präsent
* Heizungssteuerung.0.Ferienpräsent
* Heizungsregelung.0.VacationAbsent
* HeizungControl.0.GuestsPresent
* heizungssteuerung.0.PartyNow

## Bedarf
* Node Version 8 oder höher ist erforderlich

## Probleme und Funktionswünsche
* Wenn Sie mit Fehlern konfrontiert sind oder Funktionsanfragen für diesen Adapter haben, erstellen Sie bitte ein Problem im Abschnitt "GitHub-Problem" des Adapters unter [github] (https://github.com/rg-engineering/ioBroker.heatingcontrol/issues) ). Jedes Feedback wird geschätzt und hilft, diesen Adapter zu verbessern.

## Changelog
### 0.3.15 (2020-01-18)
* (René) bug fix: avoid exception when go to override if MinTemperature-check is active

### 0.3.14 (2020-01-12)
* (René) format conversion for temperatures in string to number
* (René) ack for MinTemperature

### 0.3.13 (2019-12-28)
* (René) bugfix create cron jobs for profile type 3 (daily)

### 0.3.12 (2019-12-27)
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: RoomState is not defined] 

### 0.3.11 (2019-12-27)
* (René) option: minimum temperature per room
* (René) bugfix exception in CheckTemperatureChange [ReferenceError: PublicHolidyToday is not defined] 


### 0.3.10 (2019-12-26)
* (René) see issue #54: stop override with OverrideTemperature =0
* (René) new priority for lowering reasons
* (René) handling of actuators without thermostat
* (René) see issue #66: handle lowering in time between 0:00 and first period
* (René) see issue #64: import of configuration fixed

### 0.3.9 (2019-12-14)
* (René) see issue #60: sensor delay
* (René) see issue #57: support of the same sensor for different rooms
* (René) bug fix: "AbsentDecrease not defined" for relative lowering

### 0.3.8 (2019-12-12)
* (René) see issue #59: TemperaturOverride: acceppt hh:mm and hh:mm:ss
* (René) PartyNow support by iCal 
* (René) if useActuators: show how many actuators are active (as a datapoint)

### 0.3.7 (2019-11-29)
Attention: some changes in datapoints!!
* (René) see issue  #53: moved datapoints for relative lowering into "relative"
* (René) new datapoint to show lowering decrease mode (heatingcontrol.0.TemperatureDecreaseMode)
* (René) guest present as interface to ical
* (René) see issue #52: support radar adapter
* (René) all external states checked when adapter starts

### 0.3.6 (2019-11-23)
Attention: some changes in datapoints!!
* (René) moved some datapoints from "profile" to "rooms"
* (René) see issue #50: support absolute and relative decrease of target temperature
* (René) do not check all rooms everytime: when data only for one room changed then check only one room
* (René) only one event is used to lower temperature
* (René) add interface to ical (path to vacation and path to holiday present datapoints)
* (René) support of more then one instance

### 0.3.4 (2019-11-09)
* (René) bug fix in data point name

### 0.3.3 (2019-11-08)
Attention: some changes in datapoints!!
* (René) in admin: new buttons to add search new rooms
* (René) bug fix: in profil type Mo-Fr / Sa- So period order check failed  
* (René) see issue #38: new datapoint for WindowIsOpen
* (René) change datapoint "CurrentTimePeriod" to "CurrentTimePeriodFull", "CurrentTimePeriod" and "CurrentTimePeriodTime"
* (René) bugfix datapoint name "Sa-Su"
* (René) see issue #16: new datapoint "state" per room to show reason for temperatur change 
* (René) change format of LastProgramRun date / time

### 0.3.2 (2019-11-01)
* (René) try to convert temperature to number if NaN
* (René) see issue #33: check for heating period when adapter starts
* (René) fix a problem in subscription function when room can not be found 

### 0.3.1 (2019-10-31)
* (René) see issue #42 and #44: check all sensors per room and set state when adapter starts
* (René) show message in admin when adapter is not online
* (René) pre-define devicelist; add dummy thermostat, if list is empty

### 0.3.0 (2019-10-27)
* (René) see issue #20 + #24: start and end of heating period is configurable in admin 
* (René) see issue #24: use external data point to set internal "present" data point 
* (René) see issue #15: manual temperatur override
* (René) see issue #35: delete of devices
* (René) reset DeleteAll at next admin start 

### 0.2.3 (2019-09-20)
* (René) see issue #19: handling of enums created in iobroker admin fixed
* (René) see issue #13: check order of periods; if order is wrong (next time is smaller than previous) then time si not used for cron and a warning appears in log
* (René) see issue #21: check temperatures after changing of period settings (e.g. time)
* (René) see issue #25: select OID for target and current of thermostat in admin overworked
* (René) change datapoint type from bool to boolean

### 0.2.2 (2019-09-13)
* (René) see issue #14: description of datapoint time changed ('from' instead 'until')
* (René) see issue #12: unnecessary warnings removed
* (René) see issue #17: seconds removed from time list
* (René) datepoint change handling reworked
* (René) see issue #18: take over values from external PublicHoliday-datapoint

### 0.2.1 (2019-09-08)
* (René) bug fixes in actuator handling

### 0.2.0 (2019-09-05)
* (René) path to Feiertag-Adapter can also include a complete datapoint path 

### 0.1.0 (2019-08-25)
* (René) redesign of data structure
	- more then one actuator, sensor and thermostat per room
	- three different profile types
	- manual configuration of devices (if device is not detected automatically)
	- interface to Feiertag-Adapter
	- public holiday as normal day or like sunday (setting in admin)
	- window sensor support. Reduce target temperature when window is open
	- !!ATTENTION!! data structure/objects has been changed. You need to update your visualisation settings

### 0.0.5 (2019-07-08)
* (René) support for max! thermostats

### 0.0.4 (2019-06-23)
* (René) debugging

### 0.0.3 (2019-06-02)
* (René) ready to publish

### 0.0.2 (2019-05-19)
* (René) actuator handling added

### 0.0.1 (2019-04-27)
* (René) initial release

## License

Copyright (C) <2019-2020>  <info@rg-engineering.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.