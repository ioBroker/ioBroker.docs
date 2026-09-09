---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: uiMHt5I5QQ02Yp+FYsgOKI5z4sPD+c0Zw25RXw1rzFo=
---
![Logo](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Anzahl der Installationen](http://iobroker.live/badges/sql-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sql.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# ioBroker.sql

Dieser Adapter speichert den Statusverlauf in einer SQL-Datenbank.

Unterstützt PostgreSQL, MySQL, Microsoft SQL Server und SQLite. Sie können Port 0 beibehalten, wenn der Standardport verwendet werden soll.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Einzelheiten und Informationen zur Deaktivierung der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Einstellungen

## Verbindungseinstellungen

- **DB-Typ**Typ der SQL-Datenbank: MySQL, PostgreSQL, MS-SQL oder SQLite3
- **Gastgeber**: IP-Adresse oder Hostname mit SQL Server
- **Hafen**Port des SQL-Servers (bei Unsicherheit leer lassen)
- **Datenbankname**Datenbankname. Standardmäßig iobroker
- **Benutzer**Benutzername für SQL. Muss in der Datenbank vorhanden sein.
- **Passwort**: Passwort für SQL.
- **Passwort bestätigen**: Passwort hier einfach wiederholen.
- **Verschlüsseln**Einige Datenbanken unterstützen Verschlüsselung.
- **Runde auf**: Anzahl der Ziffern nach dem Komma.
- **Parallele Anfragen zulassen**Gleichzeitige SQL-Anfragen an die Datenbank zulassen.
- **Datenbank nicht erstellen**Aktivieren Sie diese Option, wenn bereits eine Datenbank erstellt wurde (z. B. vom Administrator) und der ioBroker-Benutzer nicht über ausreichende Rechte zum Erstellen einer Datenbank verfügt.

## Standardeinstellungen

- **Entprellzeit** - Schutz vor instabilen Werten, um sicherzustellen, dass nur stabile Werte protokolliert werden, wenn sich der Wert innerhalb der definierten Millisekunden nicht geändert hat. ACHTUNG: Ändern sich die Werte häufiger als in dieser Einstellung festgelegt, wird kein Wert protokolliert (da jeder Wert instabil ist).
- **Blockzeit** Legt fest, für wie lange nach dem Speichern des letzten Werts kein weiterer Wert gespeichert wird. Nach Ablauf der angegebenen Zeit in Millisekunden wird der nächste Wert protokolliert, der alle anderen Bedingungen erfüllt.
- **Nur Datensatzänderungen** Diese Funktion stellt sicher, dass nur geänderte Werte protokolliert werden, wenn sie weitere Prüfungen bestehen (siehe unten). Gleiche Werte werden nicht protokolliert.
- **weiterhin die gleichen Werte (Sekunden) aufzeichnen** Bei der Option „Nur Änderungen protokollieren“ können Sie hier ein Zeitintervall in Sekunden festlegen, nach dem auch unveränderte Werte erneut in die Datenbank geschrieben werden. Die vom Adapter erneut protokollierten Werte können Sie über das Feld „von“ ermitteln.
- **Minimale Abweichung vom letzten Wert** Bei der Option „Nur Änderungen aufzeichnen“ können Sie die erforderliche Mindestdifferenz zwischen dem neuen und dem letzten Wert festlegen. Wird diese Differenz nicht erreicht, wird der Wert nicht aufgezeichnet.
- **Nullwerte (==0) ignorieren** - Sie können festlegen, ob 0- oder Nullwerte ignoriert werden sollen.
- **Werte unterhalb von Null (<0) ignorieren** - Sie können festlegen, ob Werte unterhalb von Null ignoriert werden sollen.
- **Deaktivierung der diagrammoptimierten Protokollierung übersprungener Werte** Standardmäßig versucht der Adapter, die Werte für eine optimierte Diagrammerstellung zu erfassen. Dies kann bedeuten, dass zusätzliche Werte (die beispielsweise nicht alle oben genannten Prüfungen erfüllt haben) automatisch protokolliert werden. Falls dies nicht gewünscht ist, können Sie diese Funktion deaktivieren.
- **Alias-ID** Sie können einen Alias für die ID definieren. Dies ist nützlich, wenn Sie ein anderes Gerät verwendet haben und die Datenprotokollierung fortsetzen möchten. Bitte erwägen Sie zukünftig die Verwendung echter Alias-Status!
- **Lagerung** Wie viele Werte aus der Vergangenheit auf der Festplatte gespeichert werden. Daten werden gelöscht, sobald der festgelegte Zeitpunkt erreicht ist und neue Daten für einen Datenpunkt gespeichert werden sollen.
- **Maximale Anzahl der im RAM gespeicherten Werte** - Legen Sie fest, wie viele Werte im Arbeitsspeicher (RAM) gehalten werden, bevor sie auf der Festplatte gespeichert werden. Sie können den Umfang der Ein-/Ausgabeoperationen steuern.
- **Aktivieren Sie die erweiterten Debug-Protokolle für den Datenpunkt.** Um detailliertere Protokolle für diesen Datenpunkt anzuzeigen, können Sie diese Option aktivieren. Beachten Sie jedoch, dass Sie weiterhin den Protokollierungsgrad „Debug“ aktivieren müssen, damit diese zusätzlichen Werte sichtbar sind! Dies hilft bei der Fehlersuche und beim Verständnis, warum der Adapter einen Wert protokolliert (oder nicht).

Die meisten dieser Werte können in den Instanzeinstellungen vordefiniert werden und werden dann vorausgefüllt oder für den Datenpunkt verwendet.

## Tipps zur Datenbankinstallation

### MS-SQL:

Verwenden `localhost\instance` Prüfen Sie auf dem Host, ob TCP/IP-Verbindungen aktiviert sind.
<https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx>

### SQLite:

Es handelt sich um eine dateibasierte Datenbank, die nicht mit einer großen Anzahl von Ereignissen umgehen kann. Bei großen Datenmengen sollten Sie eine herkömmliche Datenbank wie PostgreSQL oder ähnliche verwenden.

Die SQLite-Datenbank muss nicht separat installiert werden. Sie ist lediglich eine Datei auf der Festplatte, für deren Installation Sie jedoch die entsprechenden Build-Tools auf Ihrem System benötigen. Unter Linux geben Sie einfach Folgendes ein:

```bash
sudo apt-get install build-essential
```

Installieren Sie unter Windows Node.js mit der Option „Automatisch die notwendigen Tools installieren…“ und installieren Sie anschließend den Adapter neu, z. B.:

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

Bei Bedarf bearbeiten _/etc/mysql/my.cnf_ um eine Bindung an eine IP-Adresse für die Remote-Verbindung herzustellen.

**Warnung**Der iobroker-Benutzer ist "admin". Falls erforderlich, können dem iobroker-Benutzer eingeschränkte Rechte gewährt werden.

Unter Windows kann es einfach über ein Installationsprogramm installiert werden: <https://dev.mysql.com/downloads/installer/>.

Beachten Sie die Authentifizierungsmethode. Der neue Verschlüsselungsalgorithmus in MySQL 8.0 wird noch nicht unterstützt. `node.js` und Sie müssen die Legacy-Authentifizierungsmethode auswählen.

![Windows](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## Struktur der Datenbanken

Der Standarddatenbankname lautet: `iobroker`Das kann aber in der Konfiguration geändert werden.

### Quellen

Diese Tabelle ist eine Liste der Adapterinstanzen, die die Einträge geschrieben haben. (state.from)

| DB         | Name in der Abfrage  |
| ---------- | -------------------- |
| MS-SQL     | iobroker.dbo.sources |
| MySQL      | iobroker.sources     |
| PostgreSQL | Quellen              |
| SQLite     | Quellen              |

Struktur:

| Feld    | Typ                                        | Beschreibung                                          |
| ------- | ------------------------------------------ | ----------------------------------------------------- |
| Ausweis | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | eindeutige ID                                         |
| Name    | varchar(255) / TEXT                        | Instanz des Adapters, der den Eintrag geschrieben hat |

_Notiz:_ MS-SQL verwendet varchar(255), andere Datenbanken verwenden TEXT.

### Datenpunkte

Diese Tabelle ist eine Liste von Datenpunkten (IDs).

| DB         | Name in der Abfrage     |
| ---------- | ----------------------- |
| MS-SQL     | iobroker.dbo.datapoints |
| MySQL      | iobroker.datapoints     |
| PostgreSQL | Datenpunkte             |
| SQLite     | Datenpunkte             |

Struktur:

| Feld    | Typ                                        | Beschreibung                                    |
| ------- | ------------------------------------------ | ----------------------------------------------- |
| Ausweis | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | eindeutige ID                                   |
| Name    | varchar(255) / TEXT                        | Variablen-ID, z. B. hm-rpc.0.JEQ283747.1.STATE  |
| Typ     | GANZE ZAHL                                 | 0 – Zahl, 1 – Zeichenkette, 2 – boolescher Wert |

_Notiz:_ MS-SQL verwendet varchar(255), andere Datenbanken verwenden TEXT.

### Zahlen

Werte für Zustände vom Typ "Zahl". **ts** bedeutet „Zeitreihe“.

| DB         | Name in der Abfrage     |
| ---------- | ----------------------- |
| MS-SQL     | iobroker.dbo.ts\_number |
| MySQL      | iobroker.ts\_number     |
| PostgreSQL | ts\_number              |
| SQLite     | ts\_number              |

Struktur:

| Feld    | Typ              | Beschreibung                                                                                                                       |
| ------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Ausweis | GANZE ZAHL       | ID des Bundesstaates aus der Tabelle „Datenpunkte“                                                                                 |
| ts      | BIGINT / INTEGER | Zeit in Millisekunden seit dem 1. Januar 1970. Kann mit „new Date(ts)“ in eine Zeitangabe umgewandelt werden.                      |
| Wert    | REAL             | Wert                                                                                                                               |
| ack     | BIT/BOOLEAN      | Bestätigt: 0 – keine Bestätigung, 1 – Bestätigung                                                                                  |
| \_aus   | GANZE ZAHL       | ID der Quelle aus der Tabelle „Quellen“                                                                                            |
| Q       | GANZE ZAHL       | Qualität als Zahl. Die Beschreibung finden Sie hier. [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

_Notiz:_ MS-SQL verwendet BIT, andere SQL-Datenbanken verwenden BOOLEAN. SQLite verwendet für ts INTEGER und für alle anderen Datentypen BIGINT.

Der Benutzer kann zusätzliche Angaben zum Typ definieren. `number` die Funktionalität von `counters`Zu diesem Zweck wird die folgende Tabelle erstellt:

| DB         | Name in der Abfrage      |
| ---------- | ------------------------ |
| MS-SQL     | iobroker.dbo.ts\_counter |
| MySQL      | iobroker.ts\_counter     |
| PostgreSQL | ts\_counter              |
| SQLite     | ts\_counter              |

Struktur:

| Feld    | Typ              | Beschreibung                                                                                                  |
| ------- | ---------------- | ------------------------------------------------------------------------------------------------------------- |
| Ausweis | GANZE ZAHL       | ID des Bundesstaates aus der Tabelle „Datenpunkte“                                                            |
| ts      | BIGINT / INTEGER | Zeit in Millisekunden seit dem 1. Januar 1970. Kann mit „new Date(ts)“ in eine Zeitangabe umgewandelt werden. |
| Wert    | REAL             | Wert                                                                                                          |

Diese Tabelle speichert die Werte, wenn der Zähler ausgetauscht wurde und der Wert sich nicht erhöht, sondern nicht auf Null oder einen niedrigeren Wert gesunken ist.

### Saiten

Werte für Zustände vom Typ `string`.

| DB         | Name in der Abfrage     |
| ---------- | ----------------------- |
| MS-SQL     | iobroker.dbo.ts\_string |
| MySQL      | iobroker.ts\_string     |
| PostgreSQL | ts\_string              |
| SQLite     | ts\_string              |

Struktur:

| Feld    | Typ         | Beschreibung                                                                                                                       |
| ------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Ausweis | GANZE ZAHL  | ID des Bundesstaates aus der Tabelle „Datenpunkte“                                                                                 |
| ts      | BIGINT      | Zeit in Millisekunden seit dem 1. Januar 1970. Kann mit „new Date(ts)“ in eine Zeitangabe umgewandelt werden.                      |
| Wert    | TEXT        | Wert                                                                                                                               |
| ack     | BIT/BOOLEAN | Bestätigt: 0 – keine Bestätigung, 1 – Bestätigung                                                                                  |
| \_aus   | GANZE ZAHL  | ID der Quelle aus der Tabelle „Quellen“                                                                                            |
| Q       | GANZE ZAHL  | Qualität als Zahl. Die Beschreibung finden Sie hier. [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

_Notiz:_ MS-SQL verwendet BIT, andere SQL-Datenbanken verwenden BOOLEAN. SQLite verwendet für ts INTEGER und für alle anderen Datentypen BIGINT.

### Boolesche Werte

Werte für Zustände vom Typ `boolean`.

| DB         | Name in der Abfrage   |
| ---------- | --------------------- |
| MS-SQL     | iobroker.dbo.ts\_bool |
| MySQL      | iobroker.ts\_bool     |
| PostgreSQL | ts\_bool              |
| SQLite     | ts\_bool              |

Struktur:

| Feld    | Typ         | Beschreibung                                                                                                                       |
| ------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Ausweis | GANZE ZAHL  | ID des Bundesstaates aus der Tabelle „Datenpunkte“                                                                                 |
| ts      | BIGINT      | Zeit in Millisekunden seit dem 1. Januar 1970. Kann mit „new Date(ts)“ in eine Zeitangabe umgewandelt werden.                      |
| Wert    | BIT/BOOLEAN | Wert                                                                                                                               |
| ack     | BIT/BOOLEAN | Bestätigt: 0 – keine Bestätigung, 1 – Bestätigung                                                                                  |
| \_aus   | GANZE ZAHL  | ID der Quelle aus der Tabelle „Quellen“                                                                                            |
| Q       | GANZE ZAHL  | Qualität als Zahl. Die Beschreibung finden Sie hier. [Hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

_Notiz:_ MS-SQL verwendet BIT, andere SQL-Datenbanken verwenden BOOLEAN. SQLite verwendet für ts INTEGER und für alle anderen Datentypen BIGINT.

## Werte über den JavaScript-Adapter abrufen

Auf die sortierten Werte kann über den JavaScript-Adapter zugegriffen werden.

- Rufe die 50 zuletzt gespeicherten Ereignisse für alle IDs ab.

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

- Gespeicherte Werte für "system.adapter.admin.0.memRss" der letzten Stunde abrufen

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

- **Start** - (optional) Zeit in ms - _Date.now()_
- **Ende** - (optional) Zeit in ms - _Date.now()_, ist standardmäßig `(now + 5000 seconds)`
- **Schritt** - (optional) wird in aggregierten Intervallen (Maximum, Minimum, Durchschnitt, Gesamt, ...) in Millisekunden verwendet
- **zählen** - Anzahl der Werte, wenn die Aggregationsmethode „onchange“ ist, oder Anzahl der Intervalle bei anderen Aggregationsmethoden. Die Anzahl wird ignoriert, wenn eine Schrittweite festgelegt ist; andernfalls ist der Standardwert 500.
- **aus** - Wenn _aus_ Das Feld sollte in der Antwort enthalten sein.
- **ack** - Wenn _ack_ Das Feld sollte in der Antwort enthalten sein.
- **Q** - Wenn _Q_ Das Feld sollte in der Antwort enthalten sein.
- **addId** - Wenn _Ausweis_ Das Feld sollte in der Antwort enthalten sein.
- **Limit** - Es dürfen nicht mehr Einträge zurückgegeben werden als das Limit
- **runden** - Ergebnis auf die Anzahl der Nachkommastellen runden
- **ignoreNull** - falls Nullwerte eingeschlossen werden sollen (false), werden sie durch den letzten nicht Nullwert ersetzt (true) oder durch 0 (0).
- **entfernenRandwerte** Standardmäßig werden zusätzliche Rahmenwerte zurückgegeben, um die Diagrammdarstellung zu optimieren. Setzen Sie diese Option auf „true“, wenn dies nicht gewünscht ist (z. B. für die Skriptdatenverarbeitung).
- **returnNewestEntries** Die zurückgegebenen Daten sind immer aufsteigend nach Zeitstempel sortiert. Bei Verwendung von \`aggregate "none"\` und gleichzeitiger Angabe von \`count\` oder \`limit\` werden normalerweise die ältesten Einträge zurückgegeben (sofern keine Startdaten angegeben sind). Setzen Sie diese Option auf \`true\`, um stattdessen die neuesten Einträge zu erhalten.
- **Aggregat** - Aggregationsmethode (Standard: `average`):
  - _minmax_ - Es wurde ein spezieller Algorithmus verwendet. Der gesamte Zeitbereich wird in kleine Intervalle unterteilt, und für jedes Intervall werden Maximal-, Minimal-, Start- und Endwerte ermittelt.
  - _max_ - Teile den gesamten Zeitbereich in kleine Intervalle auf und ermittle für jedes Intervall den Maximalwert, den du dann für dieses Intervall verwendest (Nullwerte werden ignoriert).
  - _min_ - Gleiches gilt wie max, jedoch mit dem Minimalwert.
  - _Durchschnitt_ - Dasselbe wie bei Max, aber es wird der Durchschnittswert verwendet.
  - _gesamt_ - Gleiches gilt wie für max, aber Berechnung des Gesamtwerts.
  - _zählen_ - Gleiches gilt wie für max, jedoch wird die Anzahl der Werte berechnet (Nullwerte werden mitgezählt).
  - _Perzentil_ - Berechne das n-te Perzentil (n ist gegeben in `options.percentile` (oder standardmäßig 50, falls nicht angegeben).
  - _Quantil_ - Berechne das n-Quantil (n ist gegeben in `options.quantile` (oder standardmäßig 0,5, falls nicht angegeben).
  - _Integral_ - Integral berechnen (weitere Parameter siehe unten).
  - _keiner_ - Keine Aggregation. Nur Rohwerte in einem bestimmten Zeitraum.
- **Perzentil** - (optional) Bei Verwendung der Aggregationsmethode definiert „Perzentil“ die Perzentilebene (0..100) (Standardwert: 50)
- **Quantil** - (optional) Bei Verwendung der Aggregationsmethode definiert „Quantil“ das Quantilniveau (0..1) (Standardwert: 0,5)
- **integralUnit** - (optional) Bei Verwendung der Aggregationsmethode definiert „integral“ die Einheit in Sekunden (Standardwert: 60 Sekunden). Um beispielsweise das Integral in Stunden für Wh oder Ähnliches zu erhalten, setzen Sie den Wert auf 3600.
- **integralInterpolation** - (optional) Bei Verwendung der Aggregationsmethode definiert der Parameter "integral" die Interpolationsmethode (Standardwert: "none").
  - _linear_ - lineare Interpolation
  - _keiner_ - keine/schrittweise Interpolation

Bei Aggregationen werden der erste und der letzte Punkt berechnet, außer bei der Aggregation `none`Wenn Sie manuell eine Aggregation anfordern, sollten Sie den ersten und letzten Wert ignorieren, da diese aus Werten außerhalb eines Zeitraums berechnet werden.

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

_Notiz:_

Je nach Datenbank muss entweder der Datenbankname oder der Datenbankname + das Schema vor dem Tabellennamen eingefügt werden – siehe die Kästchen oben unter „Struktur der Datenbanken“.

Beispiel, wenn Ihre Datenbank den Namen „iobroker“ trägt:

| DB     | Name in der Abfrage                         |
| ------ | ------------------------------------------- |
| MS-SQL | `SELECT * FROM iobroker.dbo.datapoints ...` |
| MySQL  | `SELECT * FROM iobroker.datapoints ...`     |

## Datenbrowser

Die Instanzeinstellungen enthalten eine Registerkarte **Datenbrowser**Links werden alle Datenpunkte angezeigt, die in der Datenbank Daten enthalten, rechts die gespeicherten Werte des ausgewählten Datenpunkts. Die Werte können durchgeblättert, bearbeitet, gelöscht und neue Werte eingefügt werden. Für diesen Tab ist eine laufende Instanz erforderlich.

Die Komponente ist eine JSON-Konfiguration `custom` Komponente. Ihre Quellen befinden sich in `src-admin`, das integrierte Paket in
`admin/custom` ist verpflichtet:

```bash
npm run npm:admin      # install the dependencies of the component (only once)
npm run build:admin    # clean, build and copy into admin/custom
cd src-admin && npm start   # development server on http://localhost:4173
```

Die Datenpunktliste stammt aus der Nachricht **getDatapoints**, die auch in Skripten verwendet werden können:

```js
sendTo('sql.0', 'getDatapoints', {}, result => {
    // [{id: 'system.adapter.admin.0.memRss', index: 1, type: 'Number'}, ...]
    console.log(JSON.stringify(result.result));
});
```

Es gibt jeden Datenpunkt zurück `datapoints` Tabelle – einschließlich derer, deren Protokollierung deaktiviert ist – sortiert nach ID. Im Gegensatz zu `getDpOverview`Es ermittelt nicht den ersten Zeitstempel jedes Datenpunkts und antwortet sofort.

## Rohwerte lesen

`getHistory` ist für Diagramme konzipiert: Es aggregiert, interpoliert, rundet und addiert die Werte direkt vor und nach dem angeforderten Bereich. Um die gespeicherten Zeilen genau so anzuzeigen und durchzublättern, wie sie in der Datenbank vorliegen, verwenden Sie
**getRawEntries**:

```js
sendTo(
    'sql.0',
    'getRawEntries',
    {
        id: 'system.adapter.admin.0.memRss',
        start: Date.now() - 3600000, // optional, inclusive
        end: Date.now(),             // optional, inclusive
        limit: 100,                  // optional, default 100, maximum 2000
        offset: 0,                   // optional, default 0
        sort: 'desc',                // optional, 'desc' (newest first, default) or 'asc'
    },
    result => {
        if (result.error) {
            console.error(result.error);
        } else {
            // total = number of all entries matching start/end, so a table can page through them
            console.log(`${result.result.length} of ${result.total} entries`);
            // [{ts: 1589458809352, val: 51.5, ack: 1, q: 0, from: 'system.adapter.admin.0'}, ...]
            console.log(JSON.stringify(result.result));
        }
    },
);
```

Die Antwort enthält außerdem `id`, `index` (die ID in der `datapoints` Tisch), `type`
(`Number`, `String` oder `Boolean`), `table` (`ts_number`, `ts_string` oder `ts_bool`und die verwendeten
`limit`, `offset` Und `sort`.

Die Werte werden so zurückgegeben, wie sie aus der Datenbank stammen, und sind **nicht** umgerechnet: `ack` und boolesche Werte sind `0`/`1` in den meisten Datenbanken, und `val` Ein String-Datenpunkt ist die gespeicherte Zeichenkette. `from` Ist `null` falls keine Quelle gespeichert wurde.

Wie `update`, `delete` Und `storeState`Dies funktioniert auch für Datenpunkte, deren Protokollierung deaktiviert ist, solange noch Einträge in der Datenbank vorhanden sind. Wenn der Datenpunkt unbekannt ist, enthält die Antwort einen `error`.

## storeState

Wenn Sie andere Daten in die SQL-Datenbank schreiben möchten, können Sie die integrierte Systemfunktion verwenden. **storeState**Diese Funktion kann auch verwendet werden, um Daten aus anderen History-Adaptern wie InfluxDB oder SQL zu konvertieren.

Eine erfolgreiche Antwort bedeutet nicht, dass die Daten tatsächlich auf die Festplatte geschrieben wurden. Es bedeutet lediglich, dass sie verarbeitet wurden!

Die angegebenen IDs werden nicht mit der ioBroker-Datenbank abgeglichen und müssen dort nicht eingerichtet oder aktiviert werden. Werden eigene IDs ohne Einstellungen verwendet, wird der Parameter „rules“ nicht unterstützt und führt zu einem Fehler. Für solche IDs wird der Standardwert „Maximale Anzahl im RAM gespeicherter Werte“ verwendet.

Die Nachricht kann eines der folgenden drei Formate haben:

1. ein ID- und ein Statusobjekt
2. eine ID und ein Array von Zustandsobjekten
3. Array mit mehreren IDs, wobei jede ID ein Zustandsobjekt enthält.

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

Zusätzlich können Sie Attribute hinzufügen. `rules: true` in einer Nachricht zur Aktivierung aller Regeln, wie `counter`, `changesOnly`, `de-bounce` und so weiter.

Im Fehlerfall wird ein Array mit allen einzelnen Fehlermeldungen sowie eine Erfolgsanzahl zurückgegeben, um zu sehen, wie viele Einträge erfolgreich gespeichert wurden.

## Löschstatus

Wenn Sie einen Eintrag aus der Datenbank löschen möchten, können Sie die integrierte Systemfunktion verwenden. **löschen**:

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

Alle drei Befehle akzeptieren auch einen einzelnen Datenpunkt als Objekt, z. B. `sendTo('sql.0', 'deleteAll', {id: 'mbus.0.counter.xxx'}, result => ...)`In diesem Fall wird die Antwort nach der Ausführung des Löschvorgangs gesendet und lautet entweder `{success: true}` oder `{error: "..."}`Bei einem Array wird die Antwort sofort gesendet und gibt keine Auskunft über die einzelnen Löschvorgänge.

## Zustand ändern

Wenn Sie den Wert, die Qualität oder das Bestätigungsflag eines Eintrags in der Datenbank ändern möchten, können Sie die integrierte Systemfunktion verwenden. **aktualisieren**:

```javascript
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0}}, 
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}},
], result => console.log('deleted'));
```

`ts` ist obligatorisch. Mindestens ein weiteres Flag muss in einem Zustandsobjekt enthalten sein.

Sei vorsichtig mit `counters`. Der `counters` Die Datenbank wird nicht zurückgesetzt, Sie müssen dies selbst handhaben.

## Verlaufsprotokollierung über Javascript

Der Adapter unterstützt das Aktivieren und Deaktivieren der Verlaufsprotokollierung über JavaScript sowie das Abrufen der Liste der aktivierten Datenpunkte mit ihren Einstellungen.

### aktivieren

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

### deaktivieren

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

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.1.5 (2026-08-28)
* (@GermanBluefox) Updated packages

### 4.1.4 (2026-08-27)
* (@GermanBluefox) Connection errors no longer start with the useless class name `AggregateError`: the log now shows only the real reason, e.g. `connect ECONNREFUSED 127.0.0.1:3306; connect ECONNREFUSED ::1:3306`

### 4.1.3 (2026-08-27)
* (@GermanBluefox) Connection errors are logged with the real reason again: Node reports a failed TCP connect as an `AggregateError` whose own message is empty, so the log only showed the word `AggregateError` instead of e.g. `connect ECONNREFUSED 127.0.0.1:3306`
* (@GermanBluefox) The reconnection loop no longer repeats the same connection error every 30 seconds: the first occurrence is logged as error, repetitions go to debug and once an hour a reminder is logged

### 4.1.2 (2026-08-27)
* (@GermanBluefox) Fixed `enableHistory` being answered with `success: true` but silently doing nothing when it arrived while the adapter was still starting up: the adapter subscribed to object changes only after it had read the logging settings, so a message that landed in that gap activated no logging
* (@joltcoke) Fixed average and total returning null for every interval that contains a null value: parseFloat(null) is NaN and poisoned the sum of the whole interval (thanks to @joltcoke, ioBroker/ioBroker.sql#526). As the result was NaN and not null, ignoreNull could not act on it either
* (@joltcoke) Fixed min returning a wrong value if the interval contains a null, minmax losing the minimum if the interval starts with a null, and percentile/quantile counting a null as 0

### 4.1.0 (2026-08-26)
* (@ipod86) Added a button to the datapoint settings to delete all logged values of this datapoint
* (@GermanBluefox) The messages `delete`, `deleteRange` and `deleteAll` now report errors back to the caller instead of always answering with success
* (@GermanBluefox) The messages `delete`, `deleteRange` and `deleteAll` work now also for datapoints whose logging is disabled
* (@GermanBluefox) The messages `delete`, `deleteRange` and `deleteAll` delete the counter values of a numeric datapoint (table `ts_counter`) too
* (@GermanBluefox) Fixed `NaN` as a result of the aggregation `percentile` with 100 or `quantile` with 1
* (@GermanBluefox) Fixed the last value of the `integralTotal` aggregation: it was interpolated onto the start instead of the end of the requested range
* (@GermanBluefox) Added the message `getRawEntries` to read the stored values of one datapoint page by page (with the total number of entries) for tools that show or edit the raw data
* (@GermanBluefox) The message `update` works now also for datapoints whose logging is disabled and reports errors back to the caller
* (@GermanBluefox) `storeState` uses the data type stored in the database for known datapoints instead of deriving it from the value
* (@GermanBluefox) Added the tab `Data browser` to the instance settings: show, edit, delete and insert the stored values of a datapoint
* (@GermanBluefox) Added the message `getDatapoints` that returns all datapoints of the database immediately

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