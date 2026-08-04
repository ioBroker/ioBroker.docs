---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: Prk8SGTi5atOvb0Uq5WtXU/qC0uV2fpDn/ZLEzU49Io=
---
![Logo](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Anzahl der Installationen](http://iobroker.live/badges/sql-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sql.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# IoBroker.sql
Dieser Adapter speichert den Statusverlauf in einer SQL-Datenbank.

Unterstützt PostgreSQL, MySQL, Microsoft SQL Server und SQLite.
Sie können Port 0 beibehalten, wenn der Standardport verwendet werden soll.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Einstellungen
## Verbindungseinstellungen
- **DB-Typ**: Typ der SQL-Datenbank: MySQL, PostgreSQL, MS-SQL oder SQLite3
- **Host**: IP-Adresse oder Hostname mit SQL Server
- **Port**: Port des SQL-Servers (bei Unsicherheit leer lassen)
- **Datenbankname**: Name der Datenbank. Standardmäßig iobroker
- **Benutzer**: Benutzername für SQL. Muss in der Datenbank vorhanden sein.
- **Passwort**: Passwort für SQL.
- **Passwortbestätigung**: Bitte wiederholen Sie hier Ihr Passwort.
- **Verschlüsselung**: Einige Datenbanken unterstützen Verschlüsselung.
- **Runden Sie die Zahl auf**: Anzahl der Ziffern nach dem Komma.
- **Parallele Anfragen zulassen**: Gleichzeitige SQL-Anfragen an die Datenbank zulassen.
- **Keine Datenbank erstellen**: Aktivieren Sie diese Option, wenn bereits eine Datenbank erstellt wurde (z. B. vom Administrator) und der ioBroker-Benutzer nicht über ausreichende Rechte zum Erstellen einer Datenbank verfügt.

## Standardeinstellungen
- **Entprellzeit** – Schutz vor instabilen Werten, um sicherzustellen, dass nur stabile Werte protokolliert werden, wenn sich der Wert innerhalb der definierten Millisekunden nicht geändert hat. ACHTUNG: Ändern sich die Werte häufiger als in dieser Einstellung festgelegt, wird kein Wert protokolliert (da jeder Wert instabil ist).
- **Blockzeit** – Legt fest, wie lange nach dem Speichern des letzten Werts kein weiterer Wert gespeichert wird. Nach Ablauf der angegebenen Zeit in Millisekunden wird der nächste Wert protokolliert, der alle anderen Bedingungen erfüllt.
- **Nur Änderungen protokollieren** – Diese Funktion stellt sicher, dass nur geänderte Werte protokolliert werden, sofern sie weitere Prüfungen bestehen (siehe unten). Gleiche Werte werden nicht protokolliert.
- **Gleiche Werte (Sekunden) weiterhin aufzeichnen** - Bei Verwendung von „Nur Änderungen aufzeichnen“ können Sie hier ein Zeitintervall in Sekunden festlegen, nach dem auch unveränderte Werte erneut in der Datenbank protokolliert werden. Die vom Adapter erneut protokollierten Werte können Sie im Feld „von“ erkennen.
**Mindestabweichung vom letzten Wert** – Bei der Option „Nur Änderungen aufzeichnen“ können Sie die erforderliche Mindestabweichung zwischen dem neuen und dem letzten Wert festlegen. Wird diese nicht erreicht, wird der Wert nicht aufgezeichnet.
- **0- oder Nullwerte ignorieren (==0)** - Sie können festlegen, ob 0- oder Nullwerte ignoriert werden sollen.
- **Werte unter Null ignorieren (<0)** - Sie können festlegen, ob Werte unter Null ignoriert werden sollen.
- **Optimierte Protokollierung übersprungener Werte für die Diagrammerstellung deaktivieren** – Standardmäßig versucht der Adapter, die Werte für die optimierte Diagrammerstellung zu erfassen. Dies kann bedeuten, dass zusätzliche Werte (die z. B. nicht alle oben genannten Prüfungen erfüllt haben) automatisch protokolliert werden. Wenn dies nicht gewünscht ist, können Sie diese Funktion deaktivieren.
- **Alias-ID** – Sie können einen Alias für die ID definieren. Dies ist nützlich, wenn Sie ein anderes Gerät verwenden und die Datenprotokollierung fortsetzen möchten. Bitte erwägen Sie zukünftig die Verwendung echter Alias-Status!
**Speicheraufbewahrung** – Wie viele Werte aus der Vergangenheit auf der Festplatte gespeichert werden. Daten werden gelöscht, sobald die festgelegte Zeit erreicht ist und neue Daten für einen Datenpunkt gespeichert werden sollen.
- **Maximale Anzahl im RAM gespeicherter Werte** – Legen Sie fest, wie viele Werte im RAM gespeichert werden, bevor sie auf der Festplatte abgelegt werden. Sie können so die Anzahl der E/A-Operationen steuern.
- **Erweiterte Debug-Protokolle für den Datenpunkt aktivieren** – Wenn Sie detailliertere Protokolle für diesen Datenpunkt anzeigen möchten, können Sie diese Option aktivieren. Sie müssen weiterhin den Protokollierungsgrad „Debug“ aktivieren, damit diese zusätzlichen Werte sichtbar sind! Dies hilft bei der Fehlersuche oder beim Verständnis, warum der Adapter einen Wert protokolliert (oder nicht).

Die meisten dieser Werte können in den Instanzeinstellungen vordefiniert werden und werden dann vorausgefüllt oder für den Datenpunkt verwendet.

## Tipps zur Datenbankinstallation
### MS-SQL:
Verwenden Sie `localhost\instance` für den Host und prüfen Sie, ob TCP/IP-Verbindungen aktiviert sind.

https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
Es handelt sich um eine dateibasierte Datenbank, die nicht mit einer großen Anzahl von Ereignissen umgehen kann. Bei großen Datenmengen sollten Sie eine herkömmliche Datenbank wie PostgreSQL verwenden.

Die SQLite-Datenbank muss nicht separat installiert werden. Sie ist lediglich eine Datei auf der Festplatte, für deren Installation Sie jedoch die entsprechenden Build-Tools auf Ihrem System benötigen. Unter Linux geben Sie einfach Folgendes ein:

```bash
sudo apt-get install build-essential
```

Installieren Sie unter Windows Node.js mit der Option „Die notwendigen Tools automatisch installieren…“ und installieren Sie anschließend den Adapter neu, z. B.:

```bash
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

### MySQL:
Sie können MySQL auf Linux-Systemen wie folgt installieren:

```bash
apt-get install mysql-server mysql-client

mysql -u root -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

Bearbeiten Sie gegebenenfalls die Datei */etc/mysql/my.cnf*, um die Bindung an die IP-Adresse für die Remote-Verbindung festzulegen.

**Warnung**: Der Benutzer iobroker hat die Rechte „admin“. Falls erforderlich, sollten dem Benutzer iobroker eingeschränkte Rechte gewährt werden.

Unter Windows kann es einfach über den Installer installiert werden: https://dev.mysql.com/downloads/installer/.

Beachten Sie die Authentifizierungsmethode. Der neue Verschlüsselungsalgorithmus in MySQL 8.0 wird von `node.js` noch nicht unterstützt, daher müssen Sie die ältere Authentifizierungsmethode wählen.

![Windows](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## Struktur der Datenbanken
Der Standardname der Datenbank lautet `iobroker`, kann aber in der Konfiguration geändert werden.

### Quellen Diese Tabelle ist eine Liste der Adapterinstanzen, die die Einträge geschrieben haben. (state.from)
| DB | Name in der Abfrage |
|------------|----------------------|
| MS-SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | Quellen |
| SQLite | Quellen |

Struktur:

| Feld | Typ | Beschreibung |
|-------|--------------------------------------------|-------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | eindeutige ID |
| Name | varchar(255) / TEXT | Instanz des Adapters, der den Eintrag geschrieben hat |

*Hinweis:* MS-SQL verwendet varchar(255), andere Datenbanken verwenden TEXT.

### Datenpunkte
Diese Tabelle ist eine Liste von Datenpunkten (IDs).

| DB | Name in der Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.datapoints |
| MySQL | iobroker.datapoints |
| PostgreSQL | Datenpunkte |
| SQLite | Datenpunkte |

Struktur:

| Feld | Typ | Beschreibung |
|-------|--------------------------------------------|-------------------------------------------------|
| id | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | eindeutige ID |
| Name | varchar(255) / TEXT | ID der Variablen, z. B. hm-rpc.0.JEQ283747.1.STATE |
| Typ | INTEGER | 0 - Zahl, 1 - Zeichenkette, 2 - Boolescher Wert |

*Hinweis:* MS-SQL verwendet varchar(255), andere Datenbanken verwenden TEXT.

### Zahlen
Werte für Zustände vom Typ "Zahl". **ts** bedeutet "Zeitreihe".

| DB | Name in der Abfrage |
|------------|------------------------|
| MS-SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_number |
| SQLite | ts_number |

Struktur:

| Feld | Typ | Beschreibung |
|--------|--------------------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| id | INTEGER | ID des Bundesstaates aus der Tabelle "Datenpunkte" |
| ts | BIGINT / INTEGER | Zeit in Millisekunden seit der Unix-Epoche. Kann mit "new Date(ts)" in eine Zeitangabe umgewandelt werden. |
| val | REAL | Wert |
| ack | BIT/BOOLEAN | Bestätigt: 0 - nicht bestätigt, 1 - bestätigt |
| _from | INTEGER | ID der Quelle aus der Tabelle "Sources" |
| q | INTEGER | Qualität als Zahl. Die Beschreibung finden Sie unter [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Hinweis:* MS-SQL verwendet BIT, andere SQL-Datenbanken verwenden BOOLEAN. SQLite verwendet für ts INTEGER und für alle anderen BIGINT.

Der Benutzer kann dem Typ `number` die Funktionalität von `counters` zusätzlich definieren. Zu diesem Zweck wird die folgende Tabelle erstellt:

| DB | Name in der Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| PostgreSQL | ts_counter |
| SQLite | ts_counter |

Struktur:

| Feld | Typ | Beschreibung |
|--------|------------------|---------------------------------------------------------------------|
| id | INTEGER | ID des Bundesstaates aus der Tabelle "Datenpunkte" |
| ts | BIGINT / INTEGER | Zeit in Millisekunden seit der Unix-Epoche. Kann mit "new Date(ts)" in eine Zeitangabe umgewandelt werden. |
| val | REAL | Wert |

Diese Tabelle speichert die Werte, wenn der Zähler ausgetauscht wurde und der Wert sich nicht erhöht, sondern nicht auf Null oder einen niedrigeren Wert gesunken ist.

### Zeichenketten
Werte für Zustände vom Typ `string`.

| DB | Name in der Abfrage |
|------------|------------------------|
| MS-SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

Struktur:

| Feld | Typ | Beschreibung |
|--------|-----------------------|---------------------------------------------------------------------------------------------------------------------------|
| id | INTEGER | ID des Bundesstaates aus der Tabelle "Datenpunkte" |
| ts | BIGINT | Zeit in Millisekunden seit der Unix-Epoche. Kann mit "new Date(ts)" in eine Zeitangabe umgewandelt werden. |
| val | TEXT | Wert |
| ack | BIT/BOOLEAN | Bestätigt: 0 - nicht bestätigt, 1 - bestätigt |
| _from | INTEGER | ID der Quelle aus der Tabelle "Sources" |
| q | INTEGER | Qualität als Zahl. Die Beschreibung finden Sie unter [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Hinweis:* MS-SQL verwendet BIT, andere SQL-Datenbanken verwenden BOOLEAN. SQLite verwendet für ts INTEGER und für alle anderen BIGINT.

### Boolesche Werte
Werte für Zustände vom Typ `boolean`.

| DB | Name in der Abfrage |
|------------|-------------------------|
| MS-SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

Struktur:

| Feld | Typ | Beschreibung |
|--------|-------------|---------------------------------------------------------------------------------------------------------------------------|
| id | INTEGER | ID des Bundesstaates aus der Tabelle "Datenpunkte" |
| ts | BIGINT | Zeit in Millisekunden seit der Unix-Epoche. Kann mit "new Date(ts)" in eine Zeitangabe umgewandelt werden. |
| val | BIT/BOOLEAN | Wert |
| ack | BIT/BOOLEAN | Bestätigt: 0 - nicht bestätigt, 1 - bestätigt |
| _from | INTEGER | ID der Quelle aus der Tabelle "Sources" |
| q | INTEGER | Qualität als Zahl. Die Beschreibung finden Sie unter [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Hinweis:* MS-SQL verwendet BIT, andere SQL-Datenbanken verwenden BOOLEAN. SQLite verwendet für ts INTEGER und für alle anderen BIGINT.

## Zugriff auf Werte über den JavaScript-Adapter
Auf die sortierten Werte kann über den JavaScript-Adapter zugegriffen werden.

* Rufe die 50 zuletzt gespeicherten Ereignisse für alle IDs ab

```js
sendTo('sql.0', 'getHistory', {
    id: '*',
    options: {
        end:       Date.now(),
        count:     50,
        aggregate: 'onchange',
        addId: true
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

* Die gespeicherten Werte für "system.adapter.admin.0.memRss" der letzten Stunde abrufen

```js
var end = Date.now();
sendTo('sql.0', 'getHistory', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      end - 3600000,
        end:        end,
        aggregate: 'onchange',
        addId: true
    }
}, function (result) {
    for (var i = 0; i < result.result.length; i++) {
        console.log(result.result[i].id + ' ' + new Date(result.result[i].ts).toISOString());
    }
});
```

Mögliche Optionen:

- **Start** - (optional) Zeit in Millisekunden - *Date.now()*
- **Ende** - (optional) Zeit in Millisekunden - *Date.now()*, standardmäßig `(jetzt + 5000 Sekunden)`
- **Schritt** - (optional) wird in aggregierten Werten (Maximum, Minimum, Durchschnitt, Gesamt, ...) verwendet; Schrittweite in Millisekunden der Intervalle
- **Anzahl** - Anzahl der Werte, wenn die Aggregation auf „onchange“ eingestellt ist, oder Anzahl der Intervalle bei anderen Aggregationsmethoden. Die Anzahl wird ignoriert, wenn eine Schrittweite festgelegt ist; andernfalls ist der Standardwert 500.
- **von** - falls das Feld *von* in die Antwort aufgenommen werden soll
- **ack** - falls das Feld *ack* in die Antwort aufgenommen werden soll
- **q** - falls das Feld *q* in die Antwort aufgenommen werden soll
- **addId** - falls das Feld *id* in die Antwort aufgenommen werden soll
- **Limit** - Es dürfen nicht mehr Einträge zurückgegeben werden als das Limit.
- **runden** - Ergebnis auf die gewünschte Anzahl von Nachkommastellen runden
- **ignoreNull** - Gibt an, ob Nullwerte berücksichtigt werden sollen (false), andernfalls werden sie durch den letzten nicht-nullen Wert ersetzt (true) oder durch 0 (0).
- **removeBorderValues** - Standardmäßig werden zusätzliche Rahmenwerte zurückgegeben, um die Diagrammdarstellung zu optimieren. Setzen Sie diese Option auf „true“, wenn dies nicht gewünscht ist (z. B. für die Skriptdatenverarbeitung).
- **returnNewestEntries** - Die zurückgegebenen Daten sind immer aufsteigend nach Zeitstempel sortiert. Bei Verwendung von "none" für die Aggregation und gleichzeitiger Angabe von "count" oder "limit" werden normalerweise die ältesten Einträge zurückgegeben (sofern keine Startdaten angegeben sind). Setzen Sie diese Option auf "true", um stattdessen die neuesten Einträge zu erhalten.
- **Aggregat** - Aggregationsmethode (Standard: `average`):
- *minmax* - verwendet einen speziellen Algorithmus. Der gesamte Zeitbereich wird in kleine Intervalle unterteilt, und für jedes Intervall werden Maximal-, Minimal-, Start- und Endwerte ermittelt.
- *max* - Teile den gesamten Zeitbereich in kleine Intervalle auf und ermittle für jedes Intervall den Maximalwert, der dann für dieses Intervall verwendet wird (Nullwerte werden ignoriert).
- *min* - Gleiches wie max, jedoch mit dem Minimalwert.
- *Durchschnitt* - Dasselbe wie Maximum, aber es wird der Durchschnittswert verwendet.
- *gesamt* - Gleiches wie max, aber Berechnung des Gesamtwerts.
- *count* - Gleiches wie max, aber Anzahl der Werte berechnen (Nullwerte werden mitgezählt).
- *Perzentil* - Berechnet das n-te Perzentil (n wird in `options.percentile` angegeben oder ist standardmäßig 50, falls nicht angegeben).
- *Quantil* - Berechnet das n-Quantil (n wird in `options.quantile` angegeben oder ist standardmäßig 0,5, falls nicht angegeben).
- *Integral* - Integral berechnen (weitere Parameter siehe unten).
- *keine* - Keine Aggregation. Nur Rohwerte in einem bestimmten Zeitraum.
- **Perzentil** - (optional) Bei Verwendung der Aggregationsmethode definiert "Perzentil" die Perzentilebene (0..100) (Standardwert: 50)
- **Quantil** - (optional) Bei Verwendung der Aggregationsmethode definiert "Quantil" das Quantilniveau (0..1) (Standardwert: 0,5)
- **integralUnit** - (optional) Bei Verwendung der Aggregationsmethode definiert „integral“ die Einheit in Sekunden (Standardwert: 60 Sekunden). Um beispielsweise das Integral in Stunden für Wh oder Ähnliches zu erhalten, setzen Sie den Wert auf 3600.
- **integralInterpolation** - (optional) Bei Verwendung der Aggregationsmethode definiert "integral" die Interpolationsmethode (Standardwert ist "none").
- *linear* - lineare Interpolation
- *keine* - keine/schrittweise Interpolation

Für Aggregationen werden der erste und letzte Wert berechnet, außer für die Aggregation `none`.
Wenn Sie eine Aggregation manuell anfordern, sollten Sie den ersten und letzten Wert ignorieren, da diese aus Werten außerhalb eines Zeitraums berechnet werden.

## Zähler abrufen
Der Benutzer kann den Wert eines Zählers (Typ=Zahl, Zähler=wahr) für einen bestimmten Zeitraum abfragen.

```js
var now = Date.now();
// get consumption value for last 30 days
sendTo('sql.0', 'getCounter', {
    id: 'system.adapter.admin.0.memRss',
    options: {
        start:      now - 3600000 * 24 * 30,
        end:        now,
    }
}, result => {
    console.log(`In last 30 days the consumption was ${result.result} kWh`);
});
```

Wird das Zählgerät ausgetauscht, wird dies ebenfalls berechnet.

## Benutzerdefinierte Abfragen
Der Benutzer kann über den JavaScript-Adapter benutzerdefinierte Abfragen auf Tabellen ausführen:

```js
sendTo('sql.0', 'query', 'SELECT * FROM datapoints', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result));
    }
});
```

Oder rufen Sie die Einträge der letzten Stunde für die ID=system.adapter.admin.0.memRss ab.

```js
sendTo('sql.0', 'query', 'SELECT id FROM datapoints WHERE name="system.adapter.admin.0.memRss"', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
        console.log('Rows: ' + JSON.stringify(result.result));
        var now = new Date();
        now.setHours(-1);
        sendTo('sql.0', 'query', 'SELECT * FROM ts_number WHERE ts >= ' + now.getTime() + ' AND id=' + result.result[0].id, function (result) {
            console.log('Rows: ' + JSON.stringify(result.result));
        });
    }
});
```

*Notiz:*

Je nach Datenbank muss entweder der Datenbankname oder der Datenbankname + das Schema vor dem Tabellennamen eingefügt werden – siehe die Kästchen oben unter „Struktur der Datenbanken“.

Beispiel, wenn Ihre Datenbank den Namen „iobroker“ trägt:

| DB | Name in der Abfrage |
|---------|---------------------------------------------|
| MS-SQL | `SELECT * FROM iobroker.dbo.datapoints ...` |
| MySQL | `SELECT * FROM iobroker.datapoints ...` |

## StoreState
Um andere Daten in die SQL-Datenbank zu schreiben, können Sie die integrierte Systemfunktion **storeState** verwenden. Diese Funktion kann auch zur Konvertierung von Daten aus anderen History-Adaptern wie InfluxDB oder SQL verwendet werden.

Eine erfolgreiche Antwort bedeutet nicht, dass die Daten tatsächlich auf die Festplatte geschrieben wurden. Es bedeutet lediglich, dass sie verarbeitet wurden!

Die angegebenen IDs werden nicht mit der ioBroker-Datenbank abgeglichen und müssen dort nicht eingerichtet oder aktiviert werden. Werden eigene IDs ohne Einstellungen verwendet, wird der Parameter „rules“ nicht unterstützt und führt zu einem Fehler. Für solche IDs wird der Standardwert „Maximale Anzahl im RAM gespeicherter Werte“ verwendet.

Die Nachricht kann eines der folgenden drei Formate haben:

1. ein ID- und ein Statusobjekt
2. Eine ID und ein Array von Zustandsobjekten
3. Array mit mehreren IDs, wobei jede ID ein Statusobjekt enthält.

```javascript
// 1.
sendTo('sql.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: {
        ts: 1589458809352,
        val: 123,
        ack: false,
        from: 'system.adapter.whatever.0'
    }
}, result => console.log('added'));

// 2.
sendTo('sql.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: [
        {
            ts: 1589458809352,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        },
        {
            ts: 1589458809353,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        }
    ]
}, result => console.log('added'));

// 3.
sendTo('sql.0', 'storeState', [
    {
        id: 'mbus.0.counter.xxx',
        state: {
            ts: 1589458809352,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        }
    },
    {
        id: 'mbus.0.counter.yyy',
        state: {
            ts: 1589458809353,
            val: 123,
            ack: false,
            from: 'system.adapter.whatever.0'
        }
    }
], result => console.log('added'));
```

Zusätzlich können Sie das Attribut `rules: true` in einer Nachricht hinzufügen, um alle Regeln zu aktivieren, wie z. B. `counter`, `changesOnly`, `de-bounce` usw.

Im Fehlerfall wird ein Array mit allen einzelnen Fehlermeldungen sowie eine Erfolgsanzahl zurückgegeben, um zu sehen, wie viele Einträge erfolgreich gespeichert wurden.

## Zustand löschen
Wenn Sie einen Eintrag aus der Datenbank löschen möchten, können Sie die integrierte Systemfunktion **delete** verwenden:

```javascript
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352}},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}},
], result => console.log('deleted'));
```

Um ALLE Verlaufsdaten für einen bestimmten Datenpunkt zu löschen, führen Sie Folgendes aus:

```javascript
sendTo('sql.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'},
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
```

Um Verlaufsdaten für einen bestimmten Datenpunkt und einen bestimmten Bereich zu löschen, führen Sie folgenden Befehl aus:

```javascript
sendTo('sql.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'},
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
```

Die Zeitangabe kann in Millisekunden seit der Unix-Epoche oder als Zeichenkette vorliegen, die mithilfe eines JavaScript-Date-Objekts konvertiert werden kann.

Werte einschließlich definierter Grenzwerte werden gelöscht. `ts >= start AND ts <= end`

## Zustand ändern
Wenn Sie den Wert, die Qualität oder das Bestätigungsflag eines Eintrags in der Datenbank ändern möchten, können Sie die integrierte Systemfunktion **update** verwenden:

```javascript
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0}},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}},
], result => console.log('deleted'));
```

`ts` ist obligatorisch. Mindestens ein weiteres Flag muss in einem Zustandsobjekt enthalten sein.

Seien Sie vorsichtig mit `counters`. Der Eintrag `counters` in der Datenbank wird nicht zurückgesetzt und muss von Ihnen selbst bearbeitet werden.

## Verwaltung der Verlaufsprotokollierung über Javascript
Der Adapter unterstützt das Aktivieren und Deaktivieren der Verlaufsprotokollierung über JavaScript sowie das Abrufen der Liste der aktivierten Datenpunkte mit ihren Einstellungen.

### Aktivieren
Die Nachricht erfordert die „ID“ des Datenpunkts. Zusätzlich sind optionale „Optionen“ zur Definition der datenpunktspezifischen Einstellungen verfügbar.

```javascript
sendTo('sql.0', 'enableHistory', {
    id: 'system.adapter.sql.0.memRss',
    options: {
        changesOnly:  true,
        debounce:     0,
        retention:    31536000,
        maxLength:    3,
        changesMinDelta: 0.5,
        aliasId: ''
    }
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        //successful enabled
    }
});
```

### Deaktivieren
Für die Meldung wird die "ID" des Datenpunkts benötigt.

```javascript
sendTo('sql.0', 'disableHistory', {
    id: 'system.adapter.sql.0.memRss',
}, function (result) {
    if (result.error) {
        console.log(result.error);
    }
    if (result.success) {
        // successful enabled
    }
});
```

### Liste abrufen
Die Nachricht enthält keine Parameter.

```javascript
sendTo('sql.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    console.log({
        "system.adapter.sql.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId": ""
        },
        // ...
    });
});
```

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 3.0.1 (2024-06-13)
* (foxriver76) upgraded dependencies

### 3.0.0 (2023-09-13)
* IMPORTANT: Node.js 16.x is now needed at a minimum!
* (bluefox) Allowed setting port 0 as default
* (bluefox) Checked if a string is written into the number table
* (bluefox) Added support for `count` aggregate type on getHistory

### 2.2.0 (2022-09-19)
* IMPORTANT: Node.js 14.x is now needed at a minimum!
* (Apollon77) Fix potential crash cases with upcoming js-controller versions

### 2.1.8 (2022-08-13)
* (riversource/Apollon77) Optimize getHistory query by using "UNION ALL"
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.7 (2022-06-30)
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.6 (2022-06-27)
* (Apollon77) Allowed removing a configuration value for "round" in config again

### 2.1.5 (2022-06-27)
* (Apollon77) When no count is provided for aggregate "none" or "onchange" then the limit (default 2000) is used as count to define the number of data to return.
* (Apollon77) Fix the initialization of types and IDs for some cases.

### 2.1.3 (2022-06-12)
* (Apollon77) Make sure the debug log is active, according to the settings

### 2.1.2 (2022-06-08)
* (Apollon77) Huge performance optimizations for GetHistory calls

### 2.1.1 (2022-05-30)
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.0 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry
* (Apollon77) Fix several places where pooled connections might have not been returned to pool correctly and add logging for it
* (Apollon77) Work around an issue in used Pooling library that potentially gave out too many connections
* (Apollon77) Optimize retention check to better spread the first checks over time
* (Apollon77) Default to not use datapoint buffering as in 1.x when set to 0
* (Apollon77) Make sure disabling "Log changes only" also really does not log the changes anymore
* (Apollon77) Allow storeState and GetHistory also to be called for "unknown ids"
* (Apollon77) Adjust the fallback logic for type detection to use the type of the state value to log as last fallback
* (Apollon77) Fix storing booleans on MSSQL

### 2.0.2 (2022-05-11)
* (Apollon77) BREAKING: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Did bigger adjustments to the recording logic and added a lot of new Features. Please refer to Changelog and Forum post for details.

### 2.0.0 (2022-05-11)
* (Apollon77) Breaking: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Breaking! Did bigger adjustments to the recording logic. Debounce is refined and blockTime is added to differentiate between the two checks
* (Apollon77) Breaking! GetHistory requests now need to deliver the ts in milliseconds! Make sure to use up-to-date scripts and Charting UIs
* (Apollon77) Add RAM buffering and mass inserts for logging
* (Apollon77) New setting added to disable the "logging of additional values for charting optimization" - then only the expected data are logged
* (Apollon77) Add flag returnNewestEntries for GetHistory to determine which records to return when more entries as "count" are existing for aggregate "none"
* (Apollon77) Add support for addId getHistory flag for GetHistory
* (Apollon77) Add new Debug flag to enable/disable debug logging on datapoint level (default is false) to optimize performance
* (Apollon77) Add aggregate method "percentile" to calculate the percentile (0..100) of the values (requires `options.percentile` with the percentile level, defaults to 50 if not provided). Basically the same as Quantile, just different levels are used
* (Apollon77) Add aggregate method "quantile" to calculate the quantile (0..1) of the values (requires `options.quantile` with the quantile level, defaults to 0.5 if not provided). Basically the same as Percentile just different levels are used
* (Apollon77) Add (experimental) method "integral" to calculate the integral of the values. Requires options.integralUnit with the time duration of the integral in seconds, defaults to 60s if not provided. Optionally, a linear interpolation can be done by setting options.integralInterpolation to "linear"
* (Apollon77) When request contains flag removeBorderValues: true, the result then cut the additional pre- and post-border values out of the results
* (Apollon77) Enhance the former "Ignore below 0" feature and now allow specifying to ignore below or above specified values. The old setting is converted to the new one
* (Apollon77) Upgrade MSSQL and MySQL drivers incl. Support for MySQL 8
* (Apollon77) Make sure that min change delta allows numbers entered with comma (german notation) in all cases
* (Apollon77) Add support to specify how to round numbers on query per datapoint
* (Apollon77) Do not log passwords for Postgres connections
* (Apollon77) Optimize SSL support for database connections including option to allow self-signed certificates
* (Apollon77) Allows to specify custom retention duration in days
* (winnyschuster) Fix Insert statement for MSSQL ts_counter
* (winnyschuster) type of ts in user queries corrected

### 1.16.2 (2022-02-16)
* (bluefox) Marked interpolated data with `i=true`

### 1.16.1 (2021-12-19)
* (Excodibur) Hide settings not relevant when "log changes only" is not used
* (Apollon77) Allow all number values for debounce again

### 1.16.0 (2021-12-14)
* (bluefox) Support only `js-controller` >= 3.3.x
* (bluefox) Used system/custom view for collecting the objects
* (bluefox) Implemented option to ignore zero- or/and below zero- values

### 1.15.7 (2021-04-28)
* (bluefox) fixed the support of Admin5

### 1.15.6 (2021-04-19)
* (bluefox) added support of Admin5

### 1.15.5 (2021-01-22)
* (Apollon77) make sure message query is a string (Sentry)

### 1.15.4 (2021-01-17)
* (Apollon77) Optimize stop handling

### 1.15.3 (2020-08-29)
* (bluefox) Added the option "Do not create database". E.g. if DB was created and it does not required to do that, because the user does not have enough rights.

### 1.15.2 (2020-07-26)
* (Apollon77) prevent wrong errors that realId is missing

### 1.15.1 (2020-07-20)
* (Apollon77) implement a workaround for postgres problem

### 1.15.0 (2020-07-19)
*BREAKING* This version only accepts Node.js 10.x+ (because sqlite3 was upgraded)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SQL-16, IOBROKER-SQL-15, IOBROKER-SQL-1K)

### 1.14.2 (2020-06-23)
* (bluefox) Fixed error for data storage

### 1.14.1 (2020-06-17)
* (bluefox) Corrected error for objects with mixed type

### 1.14.0 (2020-05-20)
* (bluefox) added the range deletion and the delete all operations

### 1.13.1 (2020-05-20)
* (bluefox) added changed and delete operations

### 1.12.6 (2020-05-08)
* (bluefox) set default history if not yet set

### 1.12.5 (2020-05-05)
* (Apollon77) Crash prevented for invalid objects (Sentry IOBROKER-SQL-X)

### 1.12.4 (2020-05-04)
* (Apollon77) Potential crash fixed when disabling data points too fast (Sentry IOBROKER-SQL-W) 
* (Apollon77) Always set "encrypt" flag, even if false because else might en in default true (see https://github.com/tediousjs/tedious/issues/931)

### 1.12.3 (2020-04-30)
* (Apollon77) Try to create indexes on MSSQL to speed up things. Infos are shown if not possible to be able for the user to do it themself. Timeout is 15s

### 1.12.2 (2020-04-30)
* (Apollon77) MSSQL works again

### 1.12.1 (2020-04-26)
* (Apollon77) Fix potential crash (Sentry)

### 1.12.0 (2020-04-23)
* (Apollon77) Implement max Connections setting and respect it, now allows to control how many concurrent connections to database are used (default 100) and others wait up to 10s for a free connection before failing)
* (Apollon77) Change dependencies to admin to a global dependency
* (Apollon77) Update connection status also in between
* (Apollon77) fix some potential crash cases (Sentry reported)
* (Omega236) Add id to error message for queries
* (Apollon77) update pg to stay compatible with nodejs 14
* (Apollon77) Start clearly ending timeouts on unload ... still some cases left!

### 1.11.1 (2020-04-19)
* __Requires js-controller >= 2.0.0__
* (Apollon77) removed usage of adapter.objects
* (Apollon77) check if objects have changed and ignore unchanged
* (Apollon77) Add Sentry for Error Reporting with js-controller 3.0
* (Apollon77) Make sure value undefined is ignored

### 1.10.1 (2020-04-12)
* (bluefox) Converted to ES6
* (bluefox) The counter functionality was implemented.

### 1.9.5 (2019-05-15)
* (Apollon77) Add support for nodejs 12

### 1.9.4 (2019-02-24)
* (Apollon77) Fix several smaller issues and topics
* (Apollon77) Optimize Texts (for Admin v3 UI)

### 1.9.0 (2018-06-19)
* (Apollon77) Add option to log datapoints as other ID (alias) to easier migrate devices and such

### 1.8.0 (2018-04-29)
* (Apollon77) Update sqlite3, nodejs 10 compatible
* (BuZZy1337) Admin fix

### 1.7.4 (2018-04-15)
* (Apollon77) Fix getHistory

### 1.7.3 (2018-03-28)
* (Apollon77) Respect 'keep forever' setting for retention from data point configuration

### 1.7.2 (2018-03-24)
* (Apollon77) Disable to write NULLs for SQLite

### 1.7.1 (2018-02-10)
* (Apollon77) Make option to write NULL values on start/stop boundaries configurable

### 1.6.9 (2018-02-07)
* (bondrogeen) Admin3 Fixes
* (Apollon77) optimize relog feature and other things

### 1.6.7 (2018-01-31)
* (Bluefox) Admin3 Fixes
* (Apollon77) Relog and null log fixes

### 1.6.2 (2018-01-30)
* (Apollon77) Admin3 Fixes

### 1.6.0 (2018-01-14)
* (bluefox) Ready for Admin3

### 1.5.8 (2017-10-05)
* (Apollon77) fix relog value feature

### 1.5.7 (2017-08-10)
* (bluefox) add "save last value" option

### 1.5.6 (2017-08-02)
* (Apollon77) fix behaviour of log interval to always log the current value

### 1.5.4 (2017-06-12)
* (Apollon77) fix dependency to other library

### 1.5.3 (2017-04-07)
* (Apollon77) fix in datatype conversions

### 1.5.0 (2017-03-02)
* (Apollon77) Add option to define storage datatype per datapoint inclusing converting the value if needed

### 1.4.6 (2017-02-25)
* (Apollon77) Fix typo with PostgrSQL

### 1.4.5 (2017-02-18)
* (Apollon77) Small fix again for older configurations
* (Apollon77) fix for DBConverter Analyze function

### 1.4.3 (2017-02-11)
* (Apollon77) Small fix for older configurations

### 1.4.2 (2017-01-16)
* (bluefox) Fix handling of float values in Adapter config and Datapoint config.

### 1.4.1
* (Apollon77) Rollback to sql-client 0.7 to get rid of the mmagic dependecy that brings problems on older systems

### 1.4.0 (2016-12-02)
* (Apollon77) Add messages enableHistory/disableHistory
* (Apollon77) add support to log changes only if value differs a minimum value for numbers

### 1.3.4 (2016-11)
* (Apollon77) Allow database names with '-' for MySQL

### 1.3.3 (2016-11)
* (Apollon77) Update dependecies

### 1.3.2 (2016-11-21)
* (bluefox) Fix insert of string with '

### 1.3.0 (2016-10-29)
* (Apollon77) add option to re-log unchanged values to make it easier for visualization

### 1.2.1 (2016-08-30)
* (bluefox) Fix selector for SQL objects

### 1.2.0 (2016-08-30)
* (bluefox) сompatible only with new admin

### 1.0.10 (2016-08-27)
* (bluefox) change name of object from "history" to "custom"

### 1.0.10 (2016-07-31)
* (bluefox) fix multi requests if sqlite

### 1.0.9 (2016-06-14)
* (bluefox) allow settings for parallel requests

### 1.0.7 (2016-05-31)
* (bluefox) draw line to the end if ignore null

### 1.0.6 (2016-05-30)
* (bluefox) allow setup DB name for mysql and mssql

### 1.0.5 (2016-05-29)
* (bluefox) switch max and min with each other

### 1.0.4 (2016-05-29)
* (bluefox) check retention of data if set "never"

### 1.0.3 (2016-05-28)
* (bluefox) try to calculate old timestamps

### 1.0.2 (2016-05-24)
* (bluefox) fix error with io-package

### 1.0.1 (2016-05-24)
* (bluefox) fix error with SQLite

### 1.0.0 (2016-05-20)
* (bluefox) change default aggregation name

### 0.3.3 (2016-05-18)
* (bluefox) fix postgres

### 0.3.2 (2016-05-13)
* (bluefox) queue select if IDs and FROMs queries for sqlite

### 0.3.1 (2016-05-12)
* (bluefox) queue delete queries too for sqlite

### 0.3.0 (2016-05-08)
* (bluefox) support of custom queries
* (bluefox) only one request simultaneously for sqlite
* (bluefox) add tests (primitive and only sql)

### 0.2.0 (2016-04-30)
* (bluefox) support of milliseconds
* (bluefox) fix sqlite

### 0.1.4 (2016-04-25)
* (bluefox) fix deletion of old entries

### 0.1.3 (2016-03-08)
* (bluefox) do not print errors twice

### 0.1.2 (2015-12-22)
* (bluefox) fix MS-SQL port settings

### 0.1.1 (2015-12-19)
* (bluefox) fix error with double entries

### 0.1.0 (2015-12-14)
* (bluefox) support of strings

### 0.0.3 (2015-12-06)
* (smiling_Jack) Add demo Data ( todo: faster insert to db )
* (smiling_Jack) change aggregation (now same as history Adapter)
* (bluefox) bug fixing

### 0.0.2 (2015-12-06)
* (bluefox) allow only 1 client for SQLite

### 0.0.1 (2015-11-19)
* (bluefox) initial commit

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2015-2026 bluefox <dogafox@gmail.com>, Apollon77

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