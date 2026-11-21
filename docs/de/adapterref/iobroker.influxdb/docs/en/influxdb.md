---
chapters: {"pages":{"en/adapterref/iobroker.influxdb/README.md":{"title":{"en":"ioBroker.influxdb"},"content":"en/adapterref/iobroker.influxdb/README.md"},"en/adapterref/iobroker.influxdb/docs/en/influxdb.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.influxdb/docs/en/influxdb.md"},"en/adapterref/iobroker.influxdb/RetentionPolicies.md":{"title":{"en":"Understanding retention policies"},"content":"en/adapterref/iobroker.influxdb/RetentionPolicies.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.influxdb/docs/en/influxdb.md
title: kein Titel
hash: QUiQt4x26/4EFwMnLsdM7pah5BlxWx4TW0Nz+t0rMy8=
---
* * *

## <span id="Configuration">Konfiguration</span>
### <span id="Storage-Settings">DB-Einstellungen</span>
Geben Sie hier die Einstellungen ein, die bei der Einrichtung von InfluxDB vorgenommen wurden, damit der ioBroker-Server Zugriff auf diese Datenbank erhält. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)](../../../../../en/adapterref/iobroker.influxdb/docs/de/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)

#### Gastgeber
Hostname oder IP-Adresse des Datenbankservers.

#### Hafen
Der Port, über den die Datenbank auf dem Host erreichbar ist.

#### Protokoll
Legt fest, ob auf die Datenbank über unverschlüsseltes HTTP oder über sicheres HTTPS zugegriffen wird.

#### Anmelden
Der Datenbankbesitzer (Benutzer), unter dessen ID die Daten gespeichert werden. Wird nur mit InfluxDB 1.x verwendet; InfluxDB 2.x und 3.x melden sich mit einem Token an.

#### Passwort
Das Passwort des angegebenen Benutzers in der Datenbank. Aus Sicherheitsgründen muss das Passwort im folgenden Feld ein zweites Mal eingegeben werden. Wird nur mit InfluxDB 1.x verwendet.

#### InfluxDB 3.x
Wählen Sie „3.x“ als Datenbankversion, geben Sie Host, Port (Standard: `8181`), Token und Datenbanknamen ein. InfluxDB 3 kann keine einzelnen Werte oder Zeitbereiche löschen und gibt die Anzahl der Datenreihen nicht aus. In den Experteneinstellungen bewirkt die Option „Warten, bis die Datenbank jeden Wert speichert“, dass einzelne Werte auf das Write-Ahead-Log warten (ca. eine Sekunde pro Wert), anstatt sofort bestätigt zu werden. Details und alle Einschränkungen: [README, InfluxDB 3.x](/#/adapters/influxdb#influxdb-3x).

#### Runden auf
Die Anzahl der Dezimalstellen, mit denen Zahlen gespeichert werden.

#### Schreibaktionen sammeln
Der hier eingegebene Wert legt fest, wie viele neue Werte erfasst werden müssen, bevor sie in die Datenbank geschrieben werden. Je höher der Wert, desto seltener wird in die Datenbank geschrieben, aber desto mehr Daten gehen bei einem Adapterausfall verloren. `0` schreibt jeden Wert sofort in die Datenbank. Dies erhöht die Last auf die Datenbank und den Adapter.

#### Intervall schreiben
Wird hier ein Wert eingegeben, werden die gesammelten Daten nach der angegebenen Zeit in Sekunden in die Datenbank geschrieben, auch wenn die im vorherigen Feld festgelegte Anzahl an Werten noch nicht erreicht wurde.

### <span id="Default_settings_for_states">Standardeinstellungen für Bundesstaaten</span>
Diese Einstellungen definieren die Standardwerte, die bei der Konfiguration der Protokollierung eines einzelnen Datenpunkts verwendet werden. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../../../en/adapterref/iobroker.influxdb/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

#### Nur Änderungen protokollieren
Ist dieses Kontrollkästchen aktiviert, müssen sich aufeinanderfolgende Messwerte unterscheiden, um gespeichert zu werden. Sendet ein Sensor beispielsweise mehrmals dieselbe Temperatur, wird dies nicht gespeichert - erst eine Änderung erzeugt einen neuen Datensatz.

#### Gleiche Werte protokollieren
Sollen dennoch von Zeit zu Zeit unveränderte Werte gespeichert werden, geben Sie hier einen Zeitraum in Sekunden an, der die Häufigkeit dieser Speicherung festlegt. Dementsprechend bedeutet `0`, dass kein Wert wiederholt gespeichert wird.

#### Minimale Abweichung vom letzten Wert
Sollen nicht alle sich ständig ändernden Werte gespeichert werden, definieren Sie hier einen Mindestwert, um den sich der Wert ändern muss, bevor ein neuer Wert gespeichert wird. Dies ist beispielsweise bei Stromzählern nützlich, wo nicht jede noch so kleine Änderung protokolliert werden soll. Dementsprechend bedeutet `0`, dass jeder Wert gespeichert wird.

#### Speichern als
Bei Bedarf kann hier der Datentyp definiert werden, mit dem die Werte gespeichert werden. Dies sollte jedoch nur erfolgen, bevor die Protokollierung zum ersten Mal aktiviert wird.

[![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg)](../../../../../en/adapterref/iobroker.influxdb/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg) InfluxDB legt den Datentyp mit dem ersten Datensatz einer Messung fest, und er muss danach gleich bleiben.

#### Aufbewahrung
Legt fest, wie lange die Werte gespeichert werden (unendlich, 2 Jahre, 1 Jahr, …, 1 Tag). [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)](../../../../../en/adapterref/iobroker.influxdb/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)

#### Entprellzeit (ms)
Schutz vor zu häufigen Wertänderungen. Dies ist die Mindestzeit in Millisekunden, bevor ein Wert erneut geschrieben wird.

* * *

## <span id="Settings_for_datapoints">Einstellungen für Datenpunkte</span>
Die Protokollierung eines Datenpunkts wird im Tab „Objekte“ des jeweiligen Datenpunkts konfiguriert. [![Klicken Sie auf das Zahnradsymbol in der rechten Spalte des gewünschten Datenpunkts. Der Konfigurationsdialog wird geöffnet: [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_adapter_History_devices.jpg)](../../../../../en/adapterref/iobroker.influxdb/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

### <span id="Enabled">Aktiviert</span>
Aktiviert die Protokollierung des Datenpunkts. Bei der Option „Nur Änderungen protokollieren“ werden Werte nur dann gespeichert, wenn sich der Wert des Datenpunkts ändert, was Speicherplatz spart. Es ist sinnvoll, die Datenpunkte zunächst mithilfe der Filterfelder in der Tabellenüberschrift zu filtern, z. B. um nur die „STATE“-Datenpunkte anzuzeigen, und anschließend die Protokollierung für alle gleichzeitig zu aktivieren: [![Filtern_loggen](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_Filtern_loggen.jpg)](../../../../../en/adapterref/iobroker.influxdb/docs/de/img/influxdb_Filtern_loggen.jpg)

1. Die Ansicht als Liste ohne Gruppierung anzeigen
2. Geben Sie den/die Filterbegriff(e) ein.
3. Alle gefilterten Datenpunkte zur Protokollierung auswählen.
1. Der Konfigurationsdialog für die Protokollierungsparameter öffnet sich.
4. Aktivieren Sie die Protokollierung für alle gefilterten Datenpunkte gleichzeitig.
1. Legen Sie weitere Parameter wie „Nur Änderungen protokollieren“ und einheitliche Aufbewahrungsdauer für alle gefilterten Datenpunkte fest.
5. Änderungen speichern

### <span id="Custom_tags">Benutzerdefinierte Tags</span>
Jeder Datenpunkt kann zusätzliche, statische InfluxDB-Tags enthalten. Diese werden in den Einstellungen des Datenpunkts unter „Benutzerdefinierte Tags“ als Liste von Namen/Wert-Paaren eingegeben und mit jedem Wert dieses Datenpunkts geschrieben - für alle InfluxDB-Versionen und unabhängig von der Einstellung „Metadateninformationen als Tags statt als Felder speichern“.

Dies ermöglicht die Auswahl und Gruppierung der Werte verschiedener Datenpunkte anhand ihrer Bedeutung anstatt anhand ihrer IDs, z. B. durch Zuweisung des Tags `room=kitchen` an alle Datenpunkte der Küche und des Tags `type=temperature` an alle Temperatursensoren. In Grafana können die Werte dann anhand dieser Tags gefiltert oder gruppiert werden.

```
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._field == "value" and r.type == "temperature")
  |> group(columns: ["room"])
```

Bitte beachten Sie:

Die Namen `value`, `q`, `ack`, `from` und `time` sowie Namen, die mit `_` beginnen, sind reserviert und dürfen nicht verwendet werden. Zeilen ohne Namen oder Wert werden ignoriert; ignorierte Tags werden als Warnung im Protokoll gemeldet.
InfluxDB identifiziert eine Datenreihe anhand der Messung und all ihrer Tags. Das Ändern der Tags eines Datenpunkts startet daher eine neue Datenreihe; die zuvor geschriebenen Werte behalten ihre alten Tags. In InfluxDB 2.x aggregiert ein `getHistory`-Aufruf über einen Zeitraum, in dem sich die Tags geändert haben, jede Datenreihe einzeln - ein solcher Zeitraum kann zwei Werte pro Intervall enthalten. Es empfiehlt sich, die Tags vor Beginn der Protokollierung festzulegen.
Jeder Datenpunkt wird weiterhin in einer eigenen Messung gespeichert (seine ID oder seine `Alias-ID`). Die Verwendung derselben `Alias-ID` für mehrere aktive Datenpunkte wird nicht unterstützt.

Die Tags können auch über JavaScript mit der Nachricht `enableHistory` gesetzt werden:

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

## <span id="Statistics">Statistiken und Bereinigung</span>
Die Registerkarte **Statistiken** in der Instanzkonfiguration listet jeden Datenpunkt auf, der in der Datenbank enthalten ist - mit der Anzahl der Werte, dem ältesten und dem neuesten Wert, der Anzahl der Serien und einem Status:

| Status | Bedeutung |
|----------------|-------------------------------------------------------------------------------------------------|
| protokolliert | Das Objekt existiert und diese Instanz protokolliert es |
| Abmeldung | Das Objekt existiert weiterhin, aber die Protokollierung ist deaktiviert - sein Verlauf ist weiterhin erreichbar |
| Objekt gelöscht | Das Objekt wurde in ioBroker gelöscht, niemand kann mehr auf seinen Verlauf zugreifen |

Zwei Dinge sind bei den Zahlen wichtig:

**Es gibt keine Größenangabe pro Datenpunkt.** InfluxDB stellt diese weder in Version 1.x (die Befehle `SHOW STATS` und `SHOW SHARDS` zeigen nur die Engine und die Shards an) noch in Version 2.x bereit (die Festplattennutzung wird pro Bucket überwacht). Stattdessen wird die Anzahl der **Serien** angezeigt: Sie bestimmt den vom Index benötigten Speicher, und benutzerdefinierte Tags erhöhen diesen üblicherweise unbeabsichtigt.
**Die Zählung ist ein vollständiger Scan.** InfluxDB verfügt über keine Zeilenanzahl, die nachgeschlagen werden könnte. Daher werden die Werte des untersuchten Zeitraums tatsächlich gelesen. Bei einer Datenbank mit Daten aus mehreren Jahren dauert dies eine Weile. Die Auswahl des Zeitraums oberhalb der Tabelle begrenzt den Scan, falls die Gesamtzahl nicht benötigt wird.

Die Bereinigung entfernt die gespeicherten Werte von Datenpunkten, die nicht mehr protokolliert werden. **Es wird nichts ohne Bestätigung gelöscht:** Im Dialogfeld wird zunächst angezeigt, was bei einer Bestätigung entfernt würde. Standardmäßig werden nur Objekte ausgewählt, die nicht mehr in ioBroker vorhanden sind. Datenpunkte, deren Protokollierung lediglich deaktiviert ist, werden nur dann berücksichtigt, wenn Sie dies explizit auswählen - ihre Historie ist weiterhin abrufbar und oft relevant. Ein aktuell protokollierter Datenpunkt wird niemals ausgewählt. Im Dialogfeld sind alle gefundenen Datenpunkte vorausgewählt; deaktivieren Sie die Kontrollkästchen, um die Datenpunkte zu behalten, die Sie behalten möchten. Nur die ausgewählten Datenpunkte werden gelöscht.

Der Adapter erkennt lediglich, ob eine Messung ein Objekt enthält. Schreibt ein Skript direkt in die Datenbank ohne Objekt, wird diese Messung ebenfalls als „Objekt gelöscht“ angezeigt. Um solche Messungen von tatsächlichen Überbleibseln zu unterscheiden, zeigt der Dialog den ältesten und den neuesten Wert jedes Datenpunkts an. Wird unter „Letzter Wert älter als … Tage“ eine Zahl eingegeben, werden nur Datenpunkte vorausgewählt, deren neuester Wert älter ist (oder die gar keinen Wert haben). Datenpunkte, in die noch geschrieben wird, werden dann nicht angezeigt, können aber manuell ausgewählt werden.

Die gleichen Daten sind auch über JavaScript mit den Meldungen `getDpStatistics` und `cleanupOrphaned` verfügbar, siehe [README](/#/adapters/influxdb#statistics-and-cleanup).

* * *

## <span id="Usage">**Nutzung**</span>
Wenn in der Titelzeile unter Verlauf die Option „mit“ oder `influxdb.0` ausgewählt ist, werden nur Datenpunkte mit Protokollierung angezeigt. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg)](../de/img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg) Ein Klick auf das Zahnradsymbol öffnet die protokollierten Daten: [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg)](../de/img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg) Die Registerkarte „Tabelle“ zeigt die Daten tabellarisch an. [![ioBroker_Adapter_rickshaw03](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_rickshaw03.jpg)](../../../../../en/adapterref/iobroker.influxdb/docs/de/img/influxdb_ioBroker_Adapter_rickshaw03.jpg) Wenn der Rickshaw-Adapter installiert ist, zeigt die Registerkarte „Diagramm“ ein Verlaufsdiagramm an.

* * *

## <span id="Docker">InfluxDB und Grafana in Docker</span>
Der Adapter kann InfluxDB 2.x (nicht 3.x) und optional Grafana selbst als Docker-Container starten. Docker muss hierfür auf dem ioBroker-Host installiert sein, und der Benutzer `iobroker` muss die Berechtigung zur Verwendung von Docker besitzen (führen Sie ggf. `iob fix` aus).

### InfluxDB in Docker
Aktivieren Sie in den Instanzeinstellungen die Option „Selbstgehostete InfluxDB in Docker verwenden“. Host, Port, Organisation, Token usw. werden dann ausgeblendet - der Adapter stellt die Verbindung selbst her.

Der Container wird mit folgenden festen Werten erstellt:

| Einstellung | Wert |
|-----------------|--------------------------------------------|
| URL | `http://<ioBroker-host>:8086` |
| Organisation | `iobroker` |
| Bucket | `iobroker` |
| API-Token | `aW9icm9rZXI4NjY0NTYzODU0NjU2NTY1MjY1Ng==` |
| API-Token | `aW9icm9rZXI4NjY0NTYzODU0NjU2NTY1MjY1Ng==` |

Standardmäßig lauscht der Container nur auf `127.0.0.1`, daher kann die InfluxDB-Weboberfläche nur auf dem ioBroker-Host selbst geöffnet werden. Um sie von einem anderen Computer aus zu öffnen, stellen Sie **Container auf IP starten** im Panel „InfluxDB Docker“ auf `0.0.0.0` (alle Schnittstellen) oder auf die IP-Adresse des Hosts ein. **Führen Sie dies nur in einem vertrauenswürdigen Netzwerk durch.** Benutzername, Passwort und Token sind bei jeder Installation identisch. Das Passwort kann in der InfluxDB-Weboberfläche geändert werden (Benutzermenü → Passwort ändern). Der Adapter meldet sich mit dem Token an und ist davon nicht betroffen. Löschen Sie den Token nicht.

Die Daten befinden sich in den Docker-Volumes `flux_data` und `flux_config` und bleiben auch nach einer Aktualisierung oder Neuerstellung des Containers erhalten.

### Grafana in Docker
[Grafana](https://grafana.com/) zeigt die Daten aus InfluxDB als Dashboards an. Läuft InfluxDB in Docker, kann der Adapter Grafana mitstarten: Aktivieren Sie dazu in den Instanzeinstellungen **Selbstgehostetes Grafana in Docker verwenden** (das Kontrollkästchen wird nur angezeigt, wenn **Selbstgehostete InfluxDB in Docker verwenden** aktiviert ist). Die Verbindung zu InfluxDB wird automatisch hergestellt - in Grafana ist keine Konfiguration erforderlich.

#### Erste Anmeldung
1. Öffnen Sie `http://<ioBroker-Host>:3000` im Browser oder klicken Sie einfach auf die Grafana-Kachel auf der Startseite des Adminbereichs (auch als Link in der Instanzliste angezeigt). Der Adapter fügt diesen Link hinzu, sobald Grafana aktiviert ist, und startet seine Instanz einmalig neu. Der Port kann im Panel „Grafana Docker“ geändert werden. Standardmäßig lauscht Grafana auf allen Schnittstellen (`0.0.0.0`). Stellen Sie **Container auf IP starten** auf `127.0.0.1` ein, wenn Grafana nur vom Host selbst aus erreichbar sein soll.
2. Melden Sie sich an mit
- **Benutzer: `admin` **
- **Passwort: `iobroker` ** - oder der Wert des **Admin-Sicherheitspassworts** im Panel _Grafana Docker_, falls dieser vor dem ersten Start geändert wurde.
3. Grafana fordert ein neues Passwort an. Legen Sie eines fest oder klicken Sie auf _Überspringen_.

**Das Administratorpasswort wird nur beim ersten Start des Containers angewendet**, wenn Grafana die Datenbank erstellt. Eine spätere Änderung des **Administrator-Sicherheitspassworts** in den Adaptereinstellungen hat keine Auswirkung, und ein in Grafana geändertes Passwort wird nicht in den Adaptereinstellungen angezeigt. Falls Sie es vergessen haben, setzen Sie es auf dem ioBroker-Host zurück.

```bash
docker ps --filter name=grafana --format '{{.Names}}'     # shows the container name, e.g. iob_influxdb_0_grafana
docker exec -it iob_influxdb_0_grafana grafana cli admin reset-admin-password <new-password>
```

Wenn **Benutzerregistrierungen aktivieren**, wird auf der Anmeldeseite ein Link zur Registrierung angezeigt, über den jeder, der Grafana öffnen kann, einen Benutzer anlegen kann. Deaktivieren Sie diese Option, wenn Grafana über das Netzwerk erreichbar ist.

#### Die Datenquelle
Die Datenquelle `InfluxDB` ist bereits vorhanden und als Standard festgelegt (_Verbindungen → Datenquellen_). Sie verwendet die Abfragesprache **Flux**, die Organisation `iobroker` und den Bucket `iobroker` und verbindet sich mit dem InfluxDB-Container im Docker-Netzwerk - unabhängig vom für den Host konfigurierten Port. Der Adapter schreibt diese Datenquelle bei jedem Start neu, daher kann sie nicht in Grafana bearbeitet werden. Eigene Datenquellen können daneben hinzugefügt werden.

#### Das erste Dashboard
1. _Dashboards → Neu → Neues Dashboard → Visualisierung hinzufügen_ und die Datenquelle `InfluxDB` auswählen.
2. Wechseln Sie im Abfrageeditor zu „Code“, falls dieser angezeigt wird, und geben Sie eine Flux-Abfrage ein. Jeder Datenpunkt wird in einer Messung gespeichert, deren Name seiner ID (oder seiner „Alias-ID“) entspricht; der Wert befindet sich im Feld „value“.

```
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._measurement == "system.adapter.admin.0.memRss" and r._field == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
```

Ersetzen Sie `system.adapter.admin.0.memRss` durch die ID eines Ihrer protokollierten Datenpunkte. `aggregateWindow` reduziert die Anzahl der Punkte auf die im Diagramm darzustellende Anzahl - verwenden Sie `fn: last` für Werte, die keine Zahlen sind oder nicht gemittelt werden sollen.

3. Klicken Sie oberhalb des Diagramms auf _Aktualisieren_ und anschließend auf _Dashboard speichern_.

Am einfachsten finden Sie die richtigen Messwerte und Feldnamen im _Data Explorer_ der InfluxDB-Weboberfläche (siehe oben): Wählen Sie Bucket, Messwert und Feld aus und klicken Sie auf _Script Editor_ - dadurch wird die passende Flux-Abfrage angezeigt. In Grafana können Abfragen unter _Explore_ auch ohne Dashboard getestet werden.

Weitere Hinweise:

- Plugins können über die Option **Plugins** im Panel _Grafana Docker_ installiert werden (z. B. `grafana-clock-panel`); sie werden beim nächsten Start des Containers installiert.
- Wenn auf Grafana über einen Reverse-Proxy unter einem Unterpfad zugegriffen wird, geben Sie die vollständige öffentliche URL in **Server-Root-URL** ein.
- Dashboards, Benutzer und Einstellungen werden im Docker-Volume `grafana_data` gespeichert und bleiben auch nach einem Container-Update erhalten.

### Grafana ohne Docker
Ohne Docker muss Grafana separat installiert werden, siehe [Installationsanleitung](https://grafana.com/docs/grafana/latest/setup-grafana/installation/). Öffnen Sie anschließend `http://<Host>:3000` und melden Sie sich mit `admin` / `admin` an (Grafanas Standard-Benutzername; Sie werden sofort nach einem neuen Passwort gefragt). Erstellen Sie danach eine Datenquelle wie hier beschrieben.](https://grafana.com/docs/grafana/latest/datasources/influxdb/):

- InfluxDB 1.x: Abfragesprache _InfluxQL_, URL von InfluxDB, Datenbankname und Benutzername/Passwort aus den Adaptereinstellungen.
- InfluxDB 2.x: Abfragesprache _Flux_, URL von InfluxDB, Organisation, Token und Standard-Bucket aus den Adaptereinstellungen.
- InfluxDB 3.x: Abfragesprache _InfluxQL_ (oder _SQL_), URL von InfluxDB, Datenbankname und Token aus den Adaptereinstellungen.

Die Abfrage aus [Das erste Dashboard](#the-first-dashboard) funktioniert für InfluxDB 2.x. Für InfluxDB 1.x und 3.x mit InfluxQL verwenden Sie beispielsweise:

```
SELECT mean("value") FROM "system.adapter.admin.0.memRss" WHERE $timeFilter GROUP BY time($__interval) fill(previous)
```

* * *

## Installation einer InfluxDB-Datenbank
Siehe [Installation von InfluxDB](/#/adapters/influxdb#installation-of-influxdb) in der README - oder verwenden Sie die oben beschriebene selbstgehostete InfluxDB in Docker.