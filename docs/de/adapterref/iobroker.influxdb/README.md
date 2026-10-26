---
BADGE-Number of Installations: http://iobroker.live/badges/influxdb-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.influxdb.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.influxdb/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/influxdb/svg-badge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.influxdb.svg
---
* * *

## <span id="Konfiguration">Konfiguration</span>

### <span id="Storage-Einstellungen">DB-Einstellungen</span>

Hier werden die Einstellungen, die beim Anlegen der influxDB gemacht wurden eingegeben, damit der ioBroker-Server Zugriff auf diese Datenbank erhält. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)](img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)

#### Host

Hostname oder IP des Datenbankservers.

#### Port

hier wird der Port eingegeben über den die Datenbank auf dem Host zu erreichen ist.

#### Protocol

Hier wird angegeben, ob der Zugriff auf die Datenbank per einfachem http oder gesichertem https durchgeführt werden soll

#### Login

Der Besitzer der Datenbank (User) unter dessen ID die Daten aufgezeichnet werden sollen. Nur bei InfluxDB 1.x; InfluxDB 2.x und 3.x melden sich mit einem Token an.

#### Passwort

Dieses ist das Passwort des angegebenen Users in der SQL-Datenbank. Zur Sicherheit muss dieses Passwort im folgenden Feld wiederholt eingegeben werden. Nur bei InfluxDB 1.x.

#### InfluxDB 3.x

„3.x“ als Datenbankversion wählen, Host, Port (Standard `8181`), Token und Datenbanknamen eintragen. InfluxDB 3 kann weder einzelne Werte noch einen Zeitbereich löschen und meldet die Anzahl der Serien nicht. In den Experteneinstellungen lässt „Auf das Speichern jedes Wertes durch die Datenbank warten“ Einzelwerte auf das Write-Ahead-Log warten (je ca. eine Sekunde), statt sofort bestätigt zu werden. Details und alle Einschränkungen: [README, InfluxDB 3.x](https://github.com/ioBroker/ioBroker.influxdb/blob/master/README.md#influxdb-3x).

#### Aufrunden auf

Angabe der Nachkommastellen mit denen Zahlen gespeichert werden sollen.

#### Schreibaktionen sammeln

Der hier eingegeben Wert bestimmt, wie viele neue Daten vorliegen sollen, bevor wieder in die Datenbank geschrieben werden soll. Je höher der Wert, desto seltener wird in die DB geschrieben, desto höher ist aber der Datenverlust bei Ausfall des Adapters. Eine 0 sorgt für sofortigen Eintrag in die DB. Dementsprechend bedeutet die Eingabe "0": sofortiges Schreiben in die Datenbank. Dies erhöht die Last auf der Datenbank und im Adapter.

#### Schreibintervall

Wird hier ein Wert eingegeben, werden die Daten bereits nach der vorgegebenen Zeit in Sekunden in die Datenbank geschrieben, auch wenn die im letzten Punkt eingestellte Anzahl von Daten noch nicht erreicht ist.

### <span id="Default_Einstellungen_fuer_Zustaende">Default Einstellungen für Zustände</span>

Diese Einstellungen geben die Werte vor, die bei der Konfiguration des Loggings der einzelnen Datenpunkte als Vorgabe genutzt werden sollen. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

#### Nur Änderungen aufzeichnen

Ist diese Checkbox angehakt, müssen aufeinanderfolgende Daten unterschiedliche Werte haben, damit sie aufgezeichnet werden. Sendet ein Sensor, z.B. mehrfach die gleiche Temperatur, wird dies nicht aufgezeichnet, erst bei einer Änderung wird wieder ein Datensatz angelegt.

#### gleiche Werte aufzeichnen

Sollen bei gleichem Wert von Zeit zu Zeit trotzdem diese (unveränderten) Werte gespeichert werden, kann hier eine Zeitspanne in Sekunden festgelegt werden, wie häufig dieses geschehen soll. Dementsprechend bedeutet die Eingabe 0, dass kein doppelter Wert gespeichert werden soll.

#### Minimale Abweichung vom letzten Wert

Sollen bei ständig wechselnden Werten trotzdem diese (geänderten) Werte nicht gespeichert werden, kann hier ein Mindestwert festgelegt werden, den sich der Wert ändern muss, damit wieder ein neuer Wert gespeichert wird. Dies ist beispielsweise bei Strommesssteckdosen sinnvoll, bei dem nicht jede leichte Veränderung geloggt werden soll. Dementsprechend bedeutet die Eingabe 0, dass jeder Wert gespeichert werden soll.

#### Speichern als

Wenn nötig kann hier der Datentyp festgelegt werden, mit dem die Daten gespeichert werden sollen. Dies sollte nur vor der ersten Aktivierung durchgeführt werden.

[![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg) In einer InfluxDB wird der Datentyp mit dem ersten Datensatz festgelegt und muss danach identisch bleiben.

#### Storage Vorhaltezeit

Legt fest, wie lange die Werte gespeichert werden sollen (unendlich, 2 Jahre, 1 Jahre, …, 1 Tag). [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)

#### Entprellzeit (ms)

Schutz vor zu häufigen Änderungen eines Wertes. Dies ist der Mindestabstand in Millisekunden bis wieder ein Wert geschrieben wird.

* * *

## <span id="Einstellungen_fuer_Datenpunkte">Einstellungen für Datenpunkte</span>

Die Einstellungen für die zu loggenden Datenpunkte werden in dem Reiter „Objekte“ bei dem entsprechenden Datenpunkt durchgeführt. [![ioBroker_adapter_History_devices](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_adapter_History_devices.jpg)](img/influxdb_ioBroker_adapter_History_devices.jpg) Dazu wählt man ganz rechts in der Spalte das Zahnradsymbol zu dem gewünschten Datenpunkt aus. Das Konfigurationsmenü öffnet sich: [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

### <span id="Aktiviert">Aktiviert</span>

Logging des Datenpunktes aktivieren nur Änderungen aufzeichnen: Es werden nur Werte gespeichert, wenn sich der Wert des Datenpunktes ändert. Das spart Speicherplatz. Eine sinnvolle Nutzung ergibt sich, wenn man vorher über die Filterfelder in dem Tabellenheader die Datenpunkte so filtert, dass man z.B. nur die „State“ Datenpunkte herausfiltert, um sie dann zu loggen [![Filtern_loggen](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_Filtern_loggen.jpg)](img/influxdb_Filtern_loggen.jpg)

1.  die Ansicht als Liste ohne Gruppierung anzeigen lassen
2.  den oder die Filterbegriffe eingeben
3.  alle gefilterten Datenpunkte zum Loggen auswählen
    1.  Das Konfigurationsmenü für die Einstellungen der log-Parameter öffnet sich
4.  Das Loggen für alle gefilterten Datenpunkte auf einmal aktivieren
    1.  Weitere Parameter wie „nur Änderungen“ und Vorhaltezeit für alle gefilterten Datenpunkte einheitlich auswählen
5.  Die Änderungen speichern

### <span id="Benutzerdefinierte_Tags">Benutzerdefinierte Tags</span>

Jeder Datenpunkt kann zusätzliche, feste InfluxDB-Tags mitschreiben. Sie werden in den Einstellungen des Datenpunkts unter „Benutzerdefinierte Tags“ als Liste von Name/Wert-Paaren eingetragen und mit jedem Wert dieses Datenpunkts geschrieben – für alle InfluxDB-Versionen und unabhängig von der Einstellung „Metadaten als Tags statt als Felder speichern“.

Damit lassen sich die Werte verschiedener Datenpunkte nach ihrer Bedeutung statt nach ihrer ID auswählen und gruppieren, z.B. alle Datenpunkte der Küche mit `room=kitchen` und alle Temperaturfühler mit `type=temperature`. In Grafana kann dann danach gefiltert oder gruppiert werden:

```
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._field == "value" and r.type == "temperature")
  |> group(columns: ["room"])
```

Bitte beachten:

-   Die Namen `value`, `q`, `ack`, `from` und `time` sowie Namen, die mit `_` beginnen, sind reserviert und können nicht verwendet werden. Zeilen ohne Namen oder ohne Wert werden ignoriert, ignorierte Tags werden als Warnung ins Log geschrieben.
-   InfluxDB identifiziert eine Serie über die Messung und alle ihre Tags. Ändert man die Tags eines Datenpunkts, beginnt deshalb eine neue Serie; die vorher geschriebenen Werte behalten ihre alten Tags. Bei InfluxDB 2.x aggregiert ein `getHistory` über einen Zeitraum, in dem sich die Tags geändert haben, jede Serie für sich – ein solcher Zeitraum kann also zwei Werte pro Intervall enthalten. Die Tags am besten setzen, bevor das Logging beginnt.
-   Jeder Datenpunkt wird weiterhin in eine eigene Messung geschrieben (seine ID bzw. seine `Alias-ID`). Dieselbe `Alias-ID` für mehrere aktive Datenpunkte zu verwenden, wird nicht unterstützt.

Die Tags können auch per JavaScript über die Nachricht `enableHistory` gesetzt werden:

```javascript
sendTo('influxdb.0', 'enableHistory', {
    id: 'hm-rpc.0.ABC123.1.TEMPERATURE',
    options: {
        customTags: [
            { name: 'room', value: 'kitchen' },
            { name: 'type', value: 'temperature' },
        ],
    },
});
```

* * *

## <span id="Statistik">Statistik und Aufräumen</span>

Der Reiter **Statistik** in der Instanzkonfiguration listet jeden Datenpunkt auf, den die Datenbank enthält – mit der Anzahl der Werte, dem ältesten und dem neuesten Wert, der Anzahl der Serien und einem Status:

| Status          | Bedeutung                                                                                             |
|-----------------|-------------------------------------------------------------------------------------------------------|
| wird geloggt    | Das Objekt existiert und diese Instanz loggt es                                                       |
| Logging aus     | Das Objekt existiert noch, das Logging ist aber ausgeschaltet – die Historie ist weiterhin erreichbar |
| Objekt gelöscht | Das Objekt wurde in ioBroker gelöscht, an seine Historie kommt niemand mehr heran                     |

Zwei Dinge sind zu den Zahlen wichtig:

-   **Es gibt keine Größe pro Datenpunkt.** InfluxDB liefert sie nicht, weder in 1.x (`SHOW STATS` und `SHOW SHARDS` kennen nur Engine und Shards) noch in 2.x (der Plattenverbrauch wird pro Bucket überwacht). Stattdessen wird die Anzahl der **Serien** angezeigt: Sie bestimmt den Speicherbedarf des Index, und benutzerdefinierte Tags sind der übliche Weg, sie unbeabsichtigt zu erhöhen.
-   **Zählen ist ein voller Scan.** InfluxDB hat keine Zeilenanzahl, die es nachschlagen könnte, also werden die Werte des untersuchten Zeitraums tatsächlich gelesen. Bei einer Datenbank mit Daten aus mehreren Jahren dauert das – die Zeitraumauswahl über der Tabelle begrenzt den Scan, wenn die Gesamtzahl nicht gebraucht wird.

Das Aufräumen entfernt die gespeicherten Werte von Datenpunkten, die niemand mehr loggt. **Ohne Bestätigung wird nichts gelöscht**: Der Dialog zeigt zuerst, was ein bestätigter Lauf entfernen würde. Standardmäßig sind nur Objekte ausgewählt, die es in ioBroker nicht mehr gibt. Datenpunkte mit lediglich ausgeschaltetem Logging werden nur einbezogen, wenn man das ausdrücklich ankreuzt – ihre Historie ist noch erreichbar und oft gewollt. Ein Datenpunkt, der gerade geloggt wird, wird nie ausgewählt. Im Dialog sind alle gefundenen Datenpunkte vorausgewählt; über die Checkboxen lassen sich einzelne Datenpunkte abwählen, die behalten werden sollen. Gelöscht werden nur die ausgewählten.

Dieselben Daten sind auch per JavaScript über die Nachrichten `getDpStatistics` und `cleanupOrphaned` erreichbar, siehe [README](https://github.com/ioBroker/ioBroker.influxdb/blob/master/README.md#statistics-and-cleanup).

* * *

## <span id="Bedienung">**Bedienung**</span>

Wählt man in der Titelzeile unter Historie "mit" oder `influxdb.0` aus, werden nur noch Datenpunkte mit Logging angezeigt. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg) Ein Klick auf das Zahnradsymbol öffnet die geloggten Daten: [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg) Im Reiter Table werden die Daten tabellarisch angezeigt. [![ioBroker_Adapter_rickshaw03](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_rickshaw03.jpg)](img/influxdb_ioBroker_Adapter_rickshaw03.jpg) Im Reiter Chart kann bei installiertem Rickshaw-Adapter eine Verlaufsgrafik angezeigt werden.

* * *

## <span id="Docker">InfluxDB und Grafana in Docker</span>

Der Adapter kann InfluxDB 2.x (nicht 3.x) und optional Grafana selbst als Docker-Container starten. Docker muss dafür auf dem ioBroker-Host installiert sein und der Benutzer `iobroker` muss Docker benutzen dürfen (ggf. `iob fix` ausführen).

### InfluxDB in Docker

In den Instanz-Einstellungen **Use self-hosted InfluxDB in Docker** aktivieren. Host, Port, Organisation, Token usw. werden dann ausgeblendet – die Verbindung richtet der Adapter selbst ein.

Der Container wird mit diesen festen Werten angelegt:

| Einstellung         | Wert                                       |
|---------------------|--------------------------------------------|
| URL                 | `http://<ioBroker-Host>:8086`              |
| Benutzer / Passwort | `iobroker` / `iobroker`                    |
| Organisation        | `iobroker`                                 |
| Bucket              | `iobroker`                                 |
| API-Token           | `aW9icm9rZXI4NjY0NTYzODU0NjU2NTY1MjY1Ng==` |

Standardmäßig lauscht der Container nur auf `127.0.0.1`, die Weboberfläche von InfluxDB ist also nur direkt auf dem ioBroker-Host erreichbar. Soll sie von einem anderen Rechner aus geöffnet werden, im Bereich _InfluxDB Docker_ bei **Start container on IP** `0.0.0.0` (alle Schnittstellen) oder die IP des Hosts eintragen. **Das nur in einem vertrauenswürdigen Netz tun** – Benutzer, Passwort und Token oben sind in jeder Installation gleich. Das Passwort kann in der InfluxDB-Oberfläche geändert werden (Benutzermenü → _Change password_), der Adapter meldet sich mit dem Token an und ist davon nicht betroffen. Den Token nicht löschen.

Die Daten liegen in den Docker-Volumes `flux_data` und `flux_config` und bleiben bei einem Update oder Neu-Anlegen des Containers erhalten.

### Grafana in Docker

[Grafana](https://grafana.com/) stellt die Daten aus InfluxDB als Dashboards dar. Läuft InfluxDB in Docker, kann der Adapter Grafana gleich mitstarten: in den Instanz-Einstellungen **Use self-hosted Grafana in Docker** aktivieren (die Checkbox erscheint nur, wenn **Use self-hosted InfluxDB in Docker** aktiv ist). Die Verbindung zu InfluxDB wird automatisch eingerichtet – in Grafana muss dafür nichts konfiguriert werden.

#### Erste Anmeldung

1. Im Browser `http://<ioBroker-Host>:3000` öffnen – oder einfach die Kachel _Grafana_ auf der Intro-Seite des Admins anklicken (auch als Link in der Instanzliste). Der Adapter legt diesen Link an, sobald Grafana aktiviert ist, und startet dafür seine Instanz einmal neu. Der Port lässt sich im Bereich _Grafana Docker_ ändern. Grafana lauscht standardmäßig auf allen Schnittstellen (`0.0.0.0`); soll es nur auf dem Host selbst erreichbar sein, bei **Start container on IP** `127.0.0.1` eintragen.
2. Anmelden mit
   - **Benutzer: `admin`**
   - **Passwort: `iobroker`** – bzw. dem Wert von **Admin security password** im Bereich _Grafana Docker_, falls dieser vor dem ersten Start geändert wurde.
3. Grafana fragt nach einem neuen Passwort. Eines vergeben oder mit _Skip_ überspringen.

**Das Admin-Passwort wird nur beim allerersten Start des Containers übernommen**, wenn Grafana seine Datenbank anlegt. Eine spätere Änderung von **Admin security password** in den Adapter-Einstellungen wirkt nicht mehr, und ein in Grafana geändertes Passwort steht nicht in den Adapter-Einstellungen. Wer es vergessen hat, setzt es auf dem ioBroker-Host zurück:

```bash
docker ps --filter name=grafana --format '{{.Names}}'     # zeigt den Containernamen, z.B. iob_influxdb_0_grafana
docker exec -it iob_influxdb_0_grafana grafana cli admin reset-admin-password <neues-passwort>
```

Mit **Enable user sign-ups** zeigt die Anmeldeseite einen Link _Sign up_, über den jeder, der Grafana öffnen kann, sich einen Benutzer anlegen kann. Ist Grafana aus dem Netz erreichbar, sollte die Option ausgeschaltet werden.

#### Die Datenquelle

Die Datenquelle `InfluxDB` ist bereits vorhanden und als Standard gesetzt (_Connections → Data sources_). Sie verwendet die Abfragesprache **Flux**, Organisation `iobroker` und Bucket `iobroker` und verbindet sich innerhalb des Docker-Netzes mit dem InfluxDB-Container – unabhängig vom Port, der für den Host eingestellt ist. Der Adapter schreibt diese Datenquelle bei jedem Start neu, sie kann in Grafana daher nicht bearbeitet werden. Eigene Datenquellen können daneben angelegt werden.

#### Das erste Dashboard

1. _Dashboards → New → New dashboard → Add visualization_ und die Datenquelle `InfluxDB` auswählen.
2. Den Abfrage-Editor ggf. auf _Code_ umschalten und eine Flux-Abfrage eingeben. Jeder Datenpunkt wird in einem Measurement mit seiner ID (bzw. seiner `Alias-ID`) gespeichert, der Wert steht im Feld `value`:

   ```
   from(bucket: "iobroker")
     |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
     |> filter(fn: (r) => r._measurement == "system.adapter.admin.0.memRss" and r._field == "value")
     |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
   ```

   `system.adapter.admin.0.memRss` durch die ID eines eigenen geloggten Datenpunkts ersetzen. `aggregateWindow` reduziert die Anzahl der Punkte auf das, was in das Diagramm passt – für Werte, die keine Zahlen sind oder nicht gemittelt werden sollen, `fn: last` verwenden.
3. Über dem Diagramm auf _Refresh_ klicken, dann _Save dashboard_.

Am einfachsten findet man die richtigen Measurement- und Feldnamen im _Data Explorer_ der InfluxDB-Oberfläche (siehe oben): Bucket, Measurement und Feld auswählen und auf _Script Editor_ klicken – das liefert die passende Flux-Abfrage. In Grafana kann man Abfragen unter _Explore_ ohne Dashboard ausprobieren.

Weitere Hinweise:

- Plugins lassen sich über die Option **Plugins** im Bereich _Grafana Docker_ installieren (z.B. `grafana-clock-panel`); sie werden beim nächsten Start des Containers installiert.
- Wird Grafana über einen Reverse-Proxy unter einem Unterpfad aufgerufen, die vollständige öffentliche URL bei **Server root URL** eintragen.
- Dashboards, Benutzer und Einstellungen liegen im Docker-Volume `grafana_data` und bleiben bei einem Update des Containers erhalten.

### Grafana ohne Docker

Ohne Docker muss Grafana separat installiert werden, siehe [Installationsanleitung](https://grafana.com/docs/grafana/latest/setup-grafana/installation/). Danach `http://<Host>:3000` öffnen und mit `admin` / `admin` anmelden (Grafana's eigener Standard; ein neues Passwort wird sofort verlangt). Anschließend eine Datenquelle anlegen, wie [hier](https://grafana.com/docs/grafana/latest/datasources/influxdb/) beschrieben:

- InfluxDB 1.x: Abfragesprache _InfluxQL_, URL von InfluxDB, Datenbankname sowie Benutzer/Passwort aus den Adapter-Einstellungen.
- InfluxDB 2.x: Abfragesprache _Flux_, URL von InfluxDB, Organisation, Token und Standard-Bucket aus den Adapter-Einstellungen.
- InfluxDB 3.x: Abfragesprache _InfluxQL_ (oder _SQL_), URL von InfluxDB, Datenbankname und Token aus den Adapter-Einstellungen.

Die Abfrage aus [Das erste Dashboard](#das-erste-dashboard) funktioniert für InfluxDB 2.x. Für InfluxDB 1.x und 3.x mit InfluxQL z.B.:

```
SELECT mean("value") FROM "system.adapter.admin.0.memRss" WHERE $timeFilter GROUP BY time($__interval) fill(previous)
```

* * *

## Installation einer influxDB Datenbank

Die Beschreibung einer Installation einer influxDB-Datenbank folgt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 5.2.0 (2026-10-24)
* (GermanBluefox) The cleanup dialog of the statistics tab has checkboxes, so only the selected datapoints are deleted (#565)

### 5.1.8 (2026-10-23)
* (@GermanBluefox) The timed relog (`changesRelogInterval`) starts right after the adapter start or a change of the datapoint settings, not only with the first update of the state

### 5.1.7 (2026-10-21)
* (@GermanBluefox) Points buffered by version 4.x (`influxdata.json`) are converted when read, instead of failing with "invalid float value for field 'q': undefined" on every flush (#517)
* (@GermanBluefox) The ports of the docker containers (InfluxDB, Grafana) are reported to js-controller 8 as occupied (`registerUsedResource`). The port of the database itself is no longer counted as a port used by the instance
* (@GermanBluefox) HTTP errors from InfluxDB (e.g. 500 "timeout") are no longer treated as a lost connection (#551)
* (@GermanBluefox) Start values (`relogLastValueOnStart`) are written only once after the adapter start, not on every reconnect (#551)
* (jhoos70) Added support for InfluxDB 3.x (Core and Enterprise): data is written with the line protocol and read with InfluxQL over HTTP (inspired by the InfluxDB 3 fork of [dirkhe](https://github.com/dirkhe/ioBroker.influxdb))

### 5.1.6 (2026-10-13)
* (@GermanBluefox) The "Statistics" tab works now with InfluxDB 2.0

### 5.1.5 (2026-10-13)
* (@GermanBluefox) Added missing translations. Compact mode no longer can exit the whole host process. The Grafana admin password is protected now

## License

The MIT License (MIT)

Copyright (c) 2015-2026 bluefox, apollon77

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