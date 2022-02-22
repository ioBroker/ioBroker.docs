---
BADGE-Number of Installations: http://iobroker.live/badges/influxdb-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.influxdb.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.influxdb.svg
---
* * *

## <span id="Konfiguration">Konfiguration</span>

### <span id="Storage-Einstellungen">DB-Einstellungen</span>

Hier werden die Einstellungen, die beim Anlegen der influxDB gemacht wurden eingegeben, damit der ioBroker-Server Zugriff auf diese Datenbank erhält. [![](img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)](img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)

#### Host

Hostname oder IP des Datenbank Servers.

#### Port

hier wird der Port eingegeben über den die Datenbank auf dem Host zu erreichen ist.

#### Protocol

Hier wird angegeben ob der Zugriff auf die Datenbank per einfachem http oder gesichertem https durchgeführt werden soll

#### Login

Der Besitzer der Datenbank (User) unter dessen ID die Daten aufgezeichnet werden sollen

#### Passwort

Dieses ist das Passwort des angegebenen Users in der SQL-Datenbank. Zur Sicherheit muss dieses Passwort im folgenden Feld wiederholt eingegeben werden.

#### Aufrunden auf

Angabe der Nachkommastellen mit denen Zahlen gespeichert werden sollen.

#### Schreibaktionen sammeln

Der hier eingegeben Wert bestimmt wieviele neue Daten vorliegen sollen, bevor wieder in die Datenbank geschrieben werden soll. Je höher der Wert, desto seltener wird in die DB geschrieben, desto höher ist aber der Datenverlust bei Ausfall des Adapters. Eine 0 sorgt für sofortigen Eintrag in die DB. Dementsprechend bedeutet die Eingabe "0": Sofortiges Schreiben in die Datenbank. Dies erhöht die Last auf der Datenbank und im Adapter.

#### Schreibintervall

Wird hier ein Wert eingegeben werden die Daten bereits nach der vorgegebenen Zeit in Sekunden in die Datenbank geschrieben, auch wenn die im letzten Punkt eingestellte Anzahl von Daten noch nicht erreicht ist.

### <span id="Default_Einstellungen_fuer_Zustaende">Default Einstellungen für Zustände</span>

Diese Einstellungen geben die Werte vor, die bei der Konfiguration des Loggings der einzelnen Datenpunkte als Vorgabe genutzt werden sollen. [![](img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

#### Nur Änderungen aufzeichnen

Ist diese Checkbox angehakt müssen aufeinanderfolgende Daten unterschiedliche Werte haben damit sie aufgezeichnet werden. Sendet ein Sensor, z.B. mehrfach die gleiche Temperatur wird dies nicht aufgezeichnet, erst bei einer Änderung wird wieder eine Datensatz angelegt.

#### gleiche Werte aufzeichnen

sollen bei gleichem Wert von Zeit zu Zeit trotzdem diese (unveränderten) Werte gespeichert werden, kann hier eine Zeitspanne in Sekunden festgelegt werden, wie häufig dieses geschehen soll. Dementsprechend bedeutet die Eingabe 0, dass kein doppelter Wert gespeichert werden soll.

#### Minimale Abweichung vom letzten Wert

sollen bei ständig wechselnden Werten trotzdem diese (geänderten) Werte nicht gespeichert werden, kann hier ein Mindestwert festgelegt werden, den sich der Wert ändern muss, damit wieder ein neuer Wert gespeichert wird. Dies ist beispielsweise bei Strommesssteckdosen sinnvoll, bei dem nicht jede leichte Veränderung geloggt werden soll. Dementsprechend bedeutet die Eingabe 0, dass jeder Wert gespeichert werden soll.

#### Speichern als

Wenn nötig kann hier der Datentyp festgelegt werden mit dem die Daten gespeichert werden sollen. Dies sollte nur vor der ersten Aktivierung durchgeführt werden.

[![](img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg)](img/iinfluxdb_oBroker_Adapter_SQL_objects_type.jpg) In einer InfluxDB wird der Datentyp mit dem ersten Datensatz festgelegt und muss danach identisch bleiben.

#### Storage Vorhaltezeit

Legt fest, wie lange die Werte gespeichert werden sollen (unendlich, 2 Jahre, 1 Jahre, …, 1 Tag). [![](img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)

#### Entprellzeit (ms)

Schutz vor zu häufigen Änderungen eines Wertes. Dies ist der Mindestabstand in Millisekunden bis wieder ein Wert geschrieben wird.

* * *

## <span id="Einstellungen_fuer_Datenpunkte">Einstellungen für Datenpunkte</span>

Die Einstellungen für die zu loggenden Datenpunkte werden in dem Reiter „Objekte“ bei dem entsprechenden Datenpunkt durchgeführt. [![ioBroker_adapter_History_devices](img/influxdb_ioBroker_adapter_History_devices.jpg)](img/influxdb_ioBroker_adapter_History_devices.jpg) Dazu wählt man ganz rechts in der Spalte das Zahnradsymbol zu dem gewünschten Datenpunkt aus. Das Konfigurationsmenü öffnet sich: [![](img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

### <span id="Aktiviert">Aktiviert</span>

Logging des Datenpunktes aktivieren Nur Änderungen aufzeichnen: Es werden nur Werte gespeichert, wenn sich der Wert des Datenpunktes ändert. Das spart Speicherplatz.Eine sinnvolle Nutzung ergibt sich, wenn man vorher über die Filterfelder in dem Tabellenheader die Datenpunkte so filtert, dass man z.B. nur die „State“ Datenpunkte herausfiltert, um sie dann zu loggen [![Filtern_loggen](img/influxdb_Filtern_loggen.jpg)](img/Filtern_loggen.jpg)

1.  die Ansicht als Liste ohne Gruppierung anzeigen lassen
2.  den oder die Filterbegriffe eingeben
3.  alle gefilterten Datenpunkte zum loggen auswählen
    1.  Das Konfigurationsmenü für die Einstellungen der log-Parameter öffnet sich
4.  Das loggen für alle gefilterten Datenpunkte auf einmal aktivieren
    1.  Weitere Parameter wie „nur Änderungen“ und Vorhaltezeit für alle gefilterten Datenpunkte einheitlich auswählen
5.  Die Änderungen speichern

* * *

## <span id="Bedienung">**Bedienung**</span>

Wählt man in der Titelzeile unter Historie "mit" oder "influxdb.0" aus, werden nur noch Datenpunkte mit Logging angezeigt. [![](img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg) Ein Klick auf das Zahnradsymbol öffnet die geloggten Daten: [![](img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg) Im Reiter Table werden die Daten tabellarisch angezeigt. [![ioBroker_Adapter_rickshaw03](img/influxdb_ioBroker_Adapter_rickshaw03.jpg)](img/influxdb_ioBroker_Adapter_rickshaw03.jpg) Im Reiter Chart kann bei installiertem Rickshaw-Adapter eine Verlaufsgrafik angezeigt werden.

* * *

## Installation einer influxDB Datenbank

Die Beschreibung einer Installation einer influxDB-Datenbank folgt.

## Changelog
### 2.5.1 (2022-02-16)
* (bluefox) Marked interpolated data with `i=true`

### 2.5.0 (2022-02-14)
* (bluefox) Added new messages: 'update', 'delete', 'deleteRange', 'deleteAll' (only for influxdb v1)
* (bluefox) Corrected aggregation of data

### 2.4.0 (2021-12-19)
* (Excodibur) Added expert settings to deactivate health checks for Influx 2 db (There are no health checks for Influx 1)
* (Excodibur) Hide settings not relevant when "log changes only" is not used
* (Apollon77) Allow all number values for debounce again
* (Apollon77) InfluxDB also do not like Infinite values, so ignore them too

### 2.3.0 (2021-12-14)
* (bluefox) Support only `js.controller` >= 3.3.x
* (bluefox) Used system/custom view for collecting the objects
* (bluefox) Implemented option to ignore zero- or/and below zero- values

### 2.2.0 (2021-08-25)
* (Excodibur) Added option to store metadata (q, ack, from) as tags instead of fields for Influx 2.x - see README!
* (Excodibur) Failure to update/set retention policy will now cause warning instead of error/restart, to support more restrictive DB setups
* (Excodibur/Apollon77) Bug fixes and adjustments

### 2.1.1 (2021-08-13)
* IMPORTANT: The adapter now requires Admin 5.1.15+ and js-controller 3.3+! For other admin or js-controller versions please use the former v1.9.5 of thi adapter.
* (Excodibur) Added InfluxDB 2.0 support
* (Excodibur) Adjust Retention handling on Database level to work for InfluxDB 1.x and 2.x
* (Excodibur) Removed retention options on datapoint level because never worked and also not supported really by InfluxDB anymore

### 1.9.5 (2021-04-19)
* (bluefox) Added the support of Admin5

### 1.9.4 (2021-01-17)
* (Apollon77) Optimize stop handling

### 1.9.3 (2020-11-07)
* (Apollon77) Crash case prevented (Sentry IOBROKER-INFLUXDB-T, IOBROKER-INFLUXDB-Y)

### 1.9.2 (2020-08-06)
* (Apollon77) crash prevented (Sentry IOBROKER-INFLUXDB-G)

### 1.9.1 (2020-07-22)
* (Apollon77) crash prevented (Sentry IOBROKER-INFLUXDB-E)

### 1.9.0 (2020-07-21)
* (Apollon77) Optimize handling in case of write errors and host unavailabilities

### 1.8.8 (2020-07-18)
* (Apollon77) Some errors prevented
* (Apollon77) Set timeouts for influxdb connections to make sure connectioens do not run forever

### 1.8.7 (2020-05-14)
* (bluefox) added command to read supported features

### 1.8.6 (2020-05-11)
* (Apollon77) make sure disabling of data points while starting adapter do not crash adapter (Sentry IOBROKER-INFLUXDB-7)
* (Apollon77) Make sure all start values are processed correctly
* (Apollon77) More checks to make sure to not crash when states are disabled while data are processed (Sentry IOBROKER-INFLUXDB-8)

### 1.8.5 (2020-05-08)
* (bluefox) set default history if not yet set

### 1.8.4 (2020-05-02)
* (Apollon77) make sure disabling of data points do not crash adapter (Sentry IOBROKER-INFLUXDB-4)

### 1.8.3 (2020-04-29)
* (Apollon77) Fix pot crash case when deleting objects while saving values (Sentry)

### 1.8.2 (2020-04-19)
* __Requires js-controller >= 2.0.0__
* (Apollon77) removed usage of adapter.objects
* (Apollon77) check if objects have changed and ignore unchanged
* (Apollon77) Add Sentry for Error Reporting with js-controller 3.0
* (Apollon77) Make sure value undefined is ignored

### 1.4.2 (2017-03-02)
* (Apollon77) Add option to define storage datatype per datapoint inclusing converting the value if needed

### 1.3.4 (2017-02-22)
* (Apollon77) Small fix for older configurations

### 1.3.3 (2017-02-08)
* (Apollon77) Enhance handling of DB outages with mass writes afterwards
* (Apollon77) Small fix for older configurations

### 1.3.2
* (Apollon77) Enhance Min-Delta logic for data points from type mixed

### 1.3.1 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.3.0 (2016-12-02)
* (Apollon77) Add messages enableHistory/disableHistory
* (Apollon77) add support to log changes only if value differs a minimum value for numbers

### 1.2.1 (2016-11)
* (Apollon77) small enhancements and fixes

### 1.2.0 (2016-11-05)
* (Apollon77) support re-logging also for states that are not updated often (timed relog using relog-Interval)
* (Apollon77) try to solve easy type conflicts and convert float <--> boolean if needed
* (Apollon77) enhance getHistory to retrieve also boundary values better by selecting also points outside of the given time boundaries

### 1.1.1 (2016-11-03)
* (Apollon77) small final change on custom dialog

### 1.1.0 (2016-10-29)
* (Apollon77) optimizations and enhancements for high traffic situations
* (Apollon77) Bugfix if InfluxDB is unavailable
* (Apollon77) add functions getConflictingPoints and resetConflictingPoints
* (Apollon77) add option to re-log unchanged values to make it easier for visualization

### 1.0.1 (2016-10-18)
* (Apollon77) changed storing values to asynchronous way
* (Apollon77) add support for „minmax“ aggregate type on getHistory

### 1.0.0 (2016-10-10)
* (Apollon77) bulk write into DB
* (Apollon77) buffer values if no connection to DB
* (bluefox) connection indication

### 0.5.3 (2016-09-30)
* (Apollon77) enhance and correct documentation
* (Apollon77) implement "step" calculation for aggregation if only "count" is set

### 0.5.2 (2016-09-25)
* (Apollon77) change custom queries. Fix delete DB

### 0.5.1 (2016-09-20)
* (Apollon77) Step is given as Milliseconds and not Seconds!

### 0.5.0 (2016-08-30)
* (bluefox) Compatible only with new admin

### 0.4.0 (2016-08-27)
* (bluefox) change name of object from "history" to "custom"

### 0.3.1 (2016-06-07)
* (bluefox) better error handling

### 0.3.1 (2016-06-05)
* (bluefox) no support of influxDB 0.8 (please update)

### 0.3.0 (2016-05-18)
* (bluefox) make name of DB configurable

### 0.2.0 (2016-04-30)
* (bluefox) support of milliseconds instead of seconds

### 0.1.2 (2015-12-19)
* (bluefox) make onchange work

### 0.1.1 (2015-12-19)
* (bluefox) retention policy for 0.9.x

### 0.1.0 (2015-12-19)
* (bluefox) supported InfluxDB version 0.9.x and 0.8.x

### 0.0.2 (2015-12-14)
* (bluefox) change supported InfluxDB version to 0.9.x

### 0.0.1 (2015-12-12)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2015-2022 bluefox, apollon77

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.