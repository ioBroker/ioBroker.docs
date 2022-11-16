---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sql/README.md
title: ioBroker.sql
hash: rF75FeEj3Bi1VVhPAPj1pKQYcElzGEG3Ogc26MwBNuE=
---
![Logo](../../../en/adapterref/iobroker.sql/admin/sql.png)

![Anzahl der Installationen](http://iobroker.live/badges/sql-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sql.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sql.svg)
![Prüfungen](https://travis-ci.org/ioBroker/ioBroker.sql.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.sql.png?downloads=true)

# IoBroker.sql
Dieser Adapter speichert den Zustandsverlauf in der SQL-Datenbank.

Unterstützt PostgreSQL, MySQL, Microsoft SQL Server und SQLite.
Sie können Port 0 beibehalten, wenn der Standardport gewünscht wird.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Einstellungen
## Verbindungseinstellungen
- **DB-Typ**: Typ der SQL-DB: MySQL, PostgreSQL, MS-SQL oder SQLite3
- **Host**: IP-Adresse oder Hostname bei SQL Server
- **Port**: Port von SQL Server (leer lassen, wenn nicht sicher)
- **Datenbankname**: Datenbankname. Standard-iobroker
- **Benutzer**: Benutzername für SQL. Muss in der DB vorhanden sein.
- **Passwort**: Passwort für SQL.
- **Passwort bestätigen**: Wiederholen Sie hier einfach das Passwort.
- **Verschlüsseln**: Einige DBs unterstützen Verschlüsselung.
- **Reelle Zahl runden auf**: Anzahl der Ziffern nach dem Komma.
- **Parallele Anfragen zulassen**: Gleichzeitige SQL-Anfragen an DB zulassen.
- **Datenbank nicht erstellen**: Aktivieren Sie diese Option, wenn die Datenbank bereits erstellt wurde (z. B. vom Administrator) und der ioBroker-Benutzer nicht über ausreichende Rechte zum Erstellen einer Datenbank verfügt.

## Standardeinstellungen
- **Entprellzeit** - Schutz vor instabilen Werten, um sicherzustellen, dass nur stabile Werte protokolliert werden, wenn sich der Wert in der definierten Anzahl von Millisekunden nicht geändert hat. ACHTUNG: Wenn sich Werte häufiger ändern, wird bei dieser Einstellung effektiv kein Wert protokolliert (da jeder Wert instabil ist).
- **Blocktime** - Legt fest, wie lange nach Speicherung des letzten Wertes kein weiterer Wert gespeichert wird. Wenn die angegebene Zeit in Millisekunden abgelaufen ist, wird der nächste Wert protokolliert, der alle anderen Prüfungen erfüllt.
- **Nur Änderungen aufzeichnen** - Diese Funktion sorgt dafür, dass nur geänderte Werte protokolliert werden, wenn sie andere Prüfungen erfüllen (siehe unten). Gleiche Werte werden nicht protokolliert.
- **noch die gleichen Werte aufzeichnen (Sekunden)** - Bei "Nur Änderungen aufzeichnen" kann hier ein Zeitintervall in Sekunden eingestellt werden, nach dem auch unveränderte Werte erneut in die DB eingeloggt werden. Die vom Adapter neu geloggten Werte können Sie am Feld "von" erkennen.
- **Mindestdifferenz zum letzten Wert** - Bei „Nur Änderungen aufzeichnen“ können Sie die gewünschte Mindestdifferenz zwischen dem neuen Wert und dem letzten Wert festlegen. Wird diese nicht erreicht, wird der Wert nicht erfasst.
- **Null- oder 0-Werte ignorieren (==0)** - Sie können festlegen, ob 0- oder Null-Werte ignoriert werden sollen.
- **Werte unter Null ignorieren (<0)** - Sie können festlegen, ob Werte unter Null ignoriert werden sollen.
- **Diagrammoptimierte Protokollierung übersprungener Werte deaktivieren** - Standardmäßig versucht der Adapter, die Werte für optimierte Diagramme aufzuzeichnen. Dies kann bedeuten, dass zusätzliche Werte (die z. B. nicht alle oben genannten Prüfungen erfüllt haben) automatisch protokolliert werden. Wenn dies nicht erwünscht ist, können Sie diese Funktion deaktivieren.
- **Alias-ID** - Sie können einen Alias für die ID definieren. Dies ist nützlich, wenn Sie ein Gerät gewechselt haben und eine kontinuierliche Datenaufzeichnung wünschen. Bitte denken Sie darüber nach, in Zukunft zu echten Alias-Staaten zu wechseln!
- **Speicherdauer** - Wie viele Werte in der Vergangenheit werden auf der Festplatte gespeichert. Daten werden gelöscht, wenn der Zeitpunkt erreicht ist, sobald neue Daten für einen Datenpunkt gespeichert werden sollen.
- **Maximale Anzahl von im RAM gespeicherten Werten** - Definieren Sie, wie viele Werte im RAM gehalten werden, bevor sie auf der Festplatte gespeichert werden. Sie können steuern, wie viele E/A ausgeführt werden.
- **Erweiterte Debug-Protokolle für den Datenpunkt aktivieren** - Wenn Sie detailliertere Protokolle für diesen Datenpunkt sehen möchten, können Sie diese Option aktivieren. Damit diese zusätzlichen Werte sichtbar sind, müssen Sie noch den Loglevel "debug" aktivieren! Dies hilft beim Debuggen von Problemen oder beim Verstehen, warum der Adapter einen Wert protokolliert (oder nicht).

Die meisten dieser Werte können in den Instanzeinstellungen vordefiniert werden und werden dann vorbelegt oder für den Datenpunkt verwendet.

## Tipps zur Datenbankinstallation
### MS-SQL:
Verwenden Sie ```localhost\instance``` für den Host und prüfen Sie, ob TCP/IP-Verbindungen aktiviert sind.
https://msdn.microsoft.com/en-us/library/bb909712(v=vs.90).aspx

### SQLite:
ist "Datei"-DB und kann nicht zu viele Ereignisse verwalten. Wenn Sie eine große Datenmenge haben, verwenden Sie die echte DB, wie PostgreSQL und Co.

SQLite DB muss nicht extra installiert werden. Es ist nur eine Datei auf der Festplatte, aber um sie zu installieren, benötigen Sie Build-Tools auf Ihrem System. Für Linux einfach schreiben:

```
sudo apt-get install build-essential
```

Für Windows:

```
c:\>npm install --global --production windows-build-tools
```

und installieren Sie dann den Adapter neu, z.

```
cd /opt/iobroker
iobroker stop sql
npm install iobroker.sql --production
iobroker start sql
```

###MySQL:
Sie können mysql auf Linux-Systemen wie folgt installieren:

```
apt-get install mysql-server mysql-client

mysql -u root -p

CREATE USER 'iobroker'@'%' IDENTIFIED BY 'iobroker';
GRANT ALL PRIVILEGES ON * . * TO 'iobroker'@'%';
FLUSH PRIVILEGES;
```

Bearbeiten Sie bei Bedarf */etc/mysql/my.cnf*, um die Bindung an die IP-Adresse für die Remoteverbindung festzulegen.

**Warnung**: iobroker-Benutzer ist „admin“. Falls erforderlich, geben Sie dem iobroker-Benutzer eingeschränkte Rechte.

Unter "Windows" kann es einfach per Installer installiert werden: https://dev.mysql.com/downloads/installer/.

Achten Sie auf die Authentifizierungsmethode. Der neue Verschlüsselungsalgorithmus in MySQL 8.0 wird noch nicht von `node.js` unterstützt und Sie müssen die Legacy-Authentifizierungsmethode auswählen.

![Windows](../../../en/adapterref/iobroker.sql/img/WindowsMySQLinstaller.png)

## Aufbau der DBs
Der Standarddatenbankname ist „iobroker“, kann aber in der Konfiguration geändert werden.

### Quellen Diese Tabelle ist eine Liste von Adapterinstanzen, die die Einträge geschrieben haben. (Zustand.von)
| DB | Name in Abfrage |
|------------|----------------------|
| MS SQL | iobroker.dbo.sources |
| MySQL | iobroker.sources |
| PostgreSQL | Quellen |
| SQLite | Quellen |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|-------|--------------------------------------------|-------------------------------------------|
| ID | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | eindeutige ID |
| Name | varchar(255) / TEXT | Instanz des Adapters, die den Eintrag | geschrieben hat |

*Hinweis:* MS-SQL verwendet varchar(255) und andere verwenden TEXT

### Datenpunkte
Diese Tabelle ist eine Liste von Datenpunkten. (IDs)

| DB | Name in Abfrage |
|------------|-------------------------|
| MS SQL | iobroker.dbo.Datenpunkte |
| MySQL | iobroker.Datenpunkte |
| PostgreSQL | Datenpunkte |
| SQLite | Datenpunkte |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|-------|--------------------------------------------|-------------------------------------------------|
| ID | INTEGER NOT NULL PRIMARY KEY IDENTITY(1,1) | eindeutige ID |
| Name | varchar(255) / TEXT | ID der Variablen, z.B. hm-rpc.0.JEQ283747.1.STATE |
| Typ | GANZZAHL | 0 - Zahl, 1 - Zeichenkette, 2 - boolescher Wert |

*Hinweis:* MS-SQL verwendet varchar(255) und andere verwenden TEXT

### Zahlen
Werte für Zustände vom Typ "Nummer". **ts** bedeutet "Zeitreihe".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS SQL | iobroker.dbo.ts_number |
| MySQL | iobroker.ts_number |
| PostgreSQL | ts_nummer |
| SQLite | ts_nummer |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| ID | GANZZAHL | ID des Zustands aus Tabelle "Datenpunkte" |
| ts | BIGINT / INTEGER | Zeit in ms bis Epoche. Kann mit "new Date(ts)" | in Zeit umgerechnet werden |
| Wert | WIRKLICH | Wert |
| ack | BIT/BOOLESCH | Wird quittiert: 0 - not ack, 1 - ack |
| _von | GANZZAHL | ID der Quelle aus Tabelle "Quellen" |
| q | GANZZAHL | Qualität als Zahl. Beschreibung finden Sie in [hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Hinweis:* MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

Der Benutzer kann zusätzlich zum Typ `number` die Funktionalität von "Zählern" definieren. Dazu wird folgende Tabelle erstellt:

| DB | Name in der Abfrage |
|------------|-------------------------|
| MS SQL | iobroker.dbo.ts_counter |
| MySQL | iobroker.ts_counter |
| PostgreSQL | ts_counter |
| SQLite | ts_counter |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| ID | GANZZAHL | ID des Zustands aus Tabelle "Datenpunkte" |
| ts | BIGINT / INTEGER | Zeit in ms bis Epoche. Kann mit "new Date(ts)" | in Zeit umgerechnet werden |
| Wert | WIRKLICH | Wert |

Diese Tabelle speichert die Werte, wenn der Zähler ausgetauscht wurde und der Wert nicht erhöht, sondern auf Null oder niedrigeren Wert ausgefallen ist.

### Saiten
Werte für Zustände vom Typ "String".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS SQL | iobroker.dbo.ts_string |
| MySQL | iobroker.ts_string |
| PostgreSQL | ts_string |
| SQLite | ts_string |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| ID | GANZZAHL | ID des Zustands aus Tabelle "Datenpunkte" |
| ts | GROSSARTIG | Zeit in ms bis Epoche. Kann mit "new Date(ts)" | in Zeit umgerechnet werden |
| Wert | TEXT | Wert |
| ack | BIT/BOOLESCH | Wird quittiert: 0 - not ack, 1 - ack |
| _von | GANZZAHL | ID der Quelle aus Tabelle "Quellen" |
| q | GANZZAHL | Qualität als Zahl. Beschreibung finden Sie in [hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Hinweis:* MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

### Boolesche Werte
Werte für Zustände vom Typ "boolean".

| DB | Name in Abfrage |
|------------|-------------------------|
| MS SQL | iobroker.dbo.ts_bool |
| MySQL | iobroker.ts_bool |
| PostgreSQL | ts_bool |
| SQLite | ts_bool |

Struktur:

| Feld | Geben Sie | ein Beschreibung |
|--------|--------------------------------------------|-------------------------------------------------|
| ID | GANZZAHL | ID des Zustands aus Tabelle "Datenpunkte" |
| ts | GROSSARTIG | Zeit in ms bis Epoche. Kann mit "new Date(ts)" | in Zeit umgerechnet werden |
| Wert | BIT/BOOLESCH | Wert |
| ack | BIT/BOOLESCH | Wird quittiert: 0 - not ack, 1 - ack |
| _von | GANZZAHL | ID der Quelle aus Tabelle "Quellen" |
| q | GANZZAHL | Qualität als Zahl. Beschreibung finden Sie in [hier](https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#states) |

*Hinweis:* MS-SQL verwendet BIT und andere verwenden BOOLEAN. SQLite verwendet für ts INTEGER und alle anderen BIGINT.

## Greifen Sie auf Werte vom Javascript-Adapter zu
Auf die sortierten Werte kann über den Javascript-Adapter zugegriffen werden.

* Holen Sie sich 50 zuletzt gespeicherte Ereignisse für alle IDs

```
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

* Holen Sie sich gespeicherte Werte für "system.adapter.admin.0.memRss" in der letzten Stunde

```
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

Möglichkeiten:

- **start** - (optional) Zeit in ms - *Date.now()*'
- **Ende** - (optional) Zeit in ms - *Date.now()*', standardmäßig ist (jetzt + 5000 Sekunden)
- **step** - (optional) verwendet in aggregierter (Max, Min, Durchschnitt, Gesamt, ...) Schritt in ms von Intervallen
- **count** - Anzahl der Werte, wenn das Aggregat „onchange“ ist, oder Anzahl der Intervalle, wenn eine andere Aggregatmethode verwendet wird. Count wird ignoriert, wenn step gesetzt ist, andernfalls ist der Standardwert 500, wenn nicht gesetzt
- **von** - wenn das Feld *von* in der Antwort enthalten sein soll
- **ack** - wenn das *ack*-Feld in der Antwort enthalten sein soll
- **q** - wenn das *q*-Feld in der Antwort enthalten sein soll
- **addId** - wenn das Feld *id* in der Antwort enthalten sein soll
- **limit** - nicht mehr Einträge als limit zurückgeben
- **round** - Runden Sie das Ergebnis auf die Anzahl der Nachkommastellen
- **ignoreNull** - wenn Nullwerte enthalten sein sollen (false), durch den letzten Nicht-Null-Wert ersetzt (true) oder durch 0 (0) ersetzt werden sollen
- **removeBorderValues** - Standardmäßig werden zusätzliche Randwerte zurückgegeben, um die Diagrammerstellung zu optimieren. Setzen Sie diese Option auf true, wenn dies nicht erwünscht ist (z. B. für die Verarbeitung von Skriptdaten).
- **returnNewestEntries** - Die zurückgegebenen Daten werden immer nach Zeitstempel aufsteigend sortiert. Bei Verwendung von Aggregat "none" und zusätzlicher Angabe von "count" oder "limit" bedeutet dies, dass normalerweise die ältesten Einträge zurückgegeben werden (es sei denn, es werden keine Startdaten bereitgestellt). Setzen Sie diese Option auf true, um stattdessen die neuesten Einträge zu erhalten.
- **Aggregate** - Aggregationsmethode (Standard: 'Durchschnitt'):
    - *minmax* - verwendeter spezieller Algorithmus. Teilen Sie den gesamten Zeitbereich in kleine Intervalle und finden Sie für jedes Intervall Max-, Min-, Start- und Endwerte.
    - *max* - Teilt den gesamten Zeitbereich in kleine Intervalle auf und findet für jedes Intervall den Maximalwert und verwendet ihn für dieses Intervall (Nullen werden ignoriert).
    - *min* - Wie max, aber minimaler Wert.
    - *Durchschnitt* - Dasselbe wie Max, aber nehmen Sie den Durchschnittswert.
    - *gesamt* - Wie max, aber Gesamtwert berechnen.
    - *count* - Wie max, aber Anzahl der Werte berechnen (Nullen werden berechnet).
    - *Perzentil* - Berechnet das n-te Perzentil (n wird in options.percentile angegeben oder ist standardmäßig 50, wenn nicht angegeben).
    - *quantile* - Berechne n-Quantile (n wird in options.quantile angegeben oder ist standardmäßig 0,5, wenn nicht angegeben).
    - *integral* - Integral berechnen (weitere Parameter siehe unten).
    - *none* - Überhaupt keine Aggregation. Nur Rohwerte im angegebenen Zeitraum.
- **Perzentil** - (optional) bei Verwendung der Aggregatmethode "Perzentil" definiert das Perzentilniveau (0..100) (standardmäßig 50)
- **Quantil** - (optional) bei Verwendung der Aggregatmethode "Quantil" definiert das Quantilniveau (0..1) (Standardwert 0,5)
- **integralUnit** - (optional) bei Verwendung der Aggregatmethode "integral" definiert die Einheit in Sekunden (standardmäßig 60s). z.B. Um ein Integral in Stunden für Wh oder ähnliches zu erhalten, setzen Sie es auf 3600.
- **integralInterpolation** - (optional) bei Verwendung der Aggregatmethode "integral" definiert die Interpolationsmethode (standardmäßig "none").
    - *linear* - lineare Interpolation
    - *none* - keine/schrittweise Interpolation

Der erste und der letzte Punkt werden für Aggregationen berechnet, außer Aggregation "keine".
Wenn Sie eine Aggregation manuell anfordern, sollten Sie die ersten und letzten Werte ignorieren, da sie aus Werten außerhalb des Zeitraums berechnet werden.

## Zähler abrufen
Der Benutzer kann den Wert eines Zählers (Typ = Zahl, Zähler = wahr) für einen bestimmten Zeitraum abfragen.

```
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

Wenn das Zählergerät ersetzt wird, wird es ebenfalls berechnet.

## Benutzerdefinierte Abfragen
Der Benutzer kann benutzerdefinierte Abfragen für Tabellen vom Javascript-Adapter ausführen:

```
sendTo('sql.0', 'query', 'SELECT * FROM datapoints', function (result) {
    if (result.error) {
        console.error(result.error);
    } else {
        // show result
         console.log('Rows: ' + JSON.stringify(result.result));
    }
});
```

Oder erhalten Sie Einträge für die letzte Stunde für ID=system.adapter.admin.0.memRss

```
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

Je nach Datenbank muss vor dem Tabellennamen der Datenbankname oder Datenbankname + Schema eingefügt werden - siehe Kästen oben unter 'Aufbau der DBs'.

Beispiel, wenn Ihre Datenbank „iobroker“ heißt:

| DB | Name in Abfrage |
|------------|------------------------------------------|
| MS SQL | SELECT * FROM iobroker.dbo.datapoints ...|
| MySQL | WÄHLEN Sie * FROM iobroker.datapoints ... |

## StoreState
Wenn Sie andere Daten in die InfluxDB/SQL schreiben möchten, können Sie die eingebaute Systemfunktion **storeState** verwenden.
Diese Funktion kann auch verwendet werden, um Daten von anderen History-Adaptern wie History oder SQL zu konvertieren.

Eine erfolgreiche Antwort bedeutet nicht, dass die Daten wirklich auf die Platte geschrieben werden. Es bedeutet nur, dass sie verarbeitet wurden.

Die angegebenen IDs werden nicht gegen die ioBroker-Datenbank geprüft und müssen dort nicht eingerichtet oder aktiviert werden. Wenn eigene IDs ohne Einstellungen verwendet werden, wird der Parameter "rules" nicht unterstützt und führt zu einem Fehler. Für solche IDs wird die Voreinstellung "Maximale Anzahl gespeicherter Werte im RAM" verwendet.

Die Nachricht kann eines der folgenden drei Formate haben:

* ein ID- und ein Zustandsobjekt

```
sendTo('history.0', 'storeState', [
    id: 'mbus.0.counter.xxx',
    state: {ts: 1589458809352, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}
], result => console.log('added'));
```

* eine ID und ein Array von Zustandsobjekten

```
sendTo('history.0', 'storeState', {
    id: 'mbus.0.counter.xxx',
    state: [
      {ts: 1589458809352, val: 123, ack: false, from: 'system.adapter.whatever.0', ...},
      {ts: 1589458809353, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}
    ]
}, result => console.log('added'));
```

* Array mehrerer IDs mit jeweils einem Zustandsobjekt

```
sendTo('history.0', 'storeState', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 123, ack: false, from: 'system.adapter.whatever.0', ...}}
], result => console.log('added'));
```

Zusätzlich können Sie das Attribut `rules: true` in der Nachricht hinzufügen, um alle Regeln zu aktivieren, wie `counter`, `changesOnly`, `de-bounce` und so weiter.

Im Fehlerfall wird ein Array mit allen einzelnen Fehlermeldungen zurückgegeben und auch ein successCount um zu sehen wie viele Einträge erfolgreich gespeichert wurden.

## Zustand löschen
Wenn Sie einen Eintrag aus der Datenbank löschen möchten, können Sie die eingebaute Systemfunktion **löschen** verwenden:

```
sendTo('sql.0', 'delete', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353}
], result => console.log('deleted'));
```

Um ALLE Verlaufsdaten für einen Datenpunkt zu löschen, führen Sie Folgendes aus:

```
sendTo('sql.0', 'deleteAll', [
    {id: 'mbus.0.counter.xxx'}
    {id: 'mbus.0.counter.yyy'}
], result => console.log('deleted'));
```

Um Verlaufsdaten für einen Datenpunkt und einen Bereich zu löschen, führen Sie Folgendes aus:

```
sendTo('sql.0', 'deleteRange', [
    {id: 'mbus.0.counter.xxx', start: '2019-01-01T00:00:00.000Z', end: '2019-12-31T23:59:59.999'},
    {id: 'mbus.0.counter.yyy', start: 1589458809352, end: 1589458809353}
], result => console.log('deleted'));
```

Die Zeit könnte ms seit Epoche oder eine Zeichenfolge sein, die durch das Javascript-Datumsobjekt konvertiert werden könnte.

Werte werden inklusive definierter Grenzen gelöscht. `ts >= start AND ts <= end`

## Zustand ändern
Wenn Sie den Wert, die Qualität oder das Acknowledge-Flag in der Datenbank ändern möchten, können Sie die eingebaute Systemfunktion **update** verwenden:

```
sendTo('sql.0', 'update', [
    {id: 'mbus.0.counter.xxx', state: {ts: 1589458809352, val: 15, ack: true, q: 0},
    {id: 'mbus.0.counter.yyy', state: {ts: 1589458809353, val: 16, ack: true, q: 0}
], result => console.log('deleted'));
```

`ts` ist obligatorisch. Mindestens ein weiteres Flag muss im Zustandsobjekt enthalten sein.

Seien Sie vorsichtig mit `counters`. Die `counters` in DB werden nicht zurückgesetzt, und Sie müssen sich selbst darum kümmern.

## Verwaltung der Verlaufsprotokollierung über Javascript
Der Adapter unterstützt das Aktivieren und Deaktivieren der Verlaufsprotokollierung über JavaScript sowie das Abrufen der Liste der aktivierten Datenpunkte mit ihren Einstellungen.

### Ermöglichen
Die Nachricht muss die "ID" des Datenpunkts haben. Zusätzlich optionale "Optionen" zum Definieren der datenpunktspezifischen Einstellungen:

```
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
Die Nachricht muss die "ID" des Datenpunkts haben.

```
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
Die Nachricht hat keine Parameter.

```
sendTo('sql.0', 'getEnabledDPs', {}, function (result) {
    //result is object like:
    {
        "system.adapter.sql.0.memRss": {
            "changesOnly":true,
            "debounce":0,
            "retention":31536000,
            "maxLength":3,
            "changesMinDelta":0.5,
            "enabled":true,
            "changesRelogInterval":0,
            "aliasId": ""
        }
        ...
    }
});
```

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __LAUFENDE ARBEIT__ -->

## Changelog
### 2.2.0 (2022-09-19)
* IMPORTANT: Node.js 14.x is now needed at minimum!
* (Apollon77) Fix potential crash cases with upcoming js-controller versions

### 2.1.8 (2022-08-13)
* (riversource/Apollon77) Optimize getHistory query by using "UNION ALL"
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.7 (2022-06-30)
* (Apollon77) Fix crash cases reported by Sentry

### 2.1.6 (2022-06-27)
* (Apollon77) Allow to remove a configuration value for "round" in config again

### 2.1.5 (2022-06-27)
* (Apollon77) When no count is provided for aggregate "none" or "onchange" then the limit (default 2000) is used as count to define the number of data to return.
* (Apollon77) Fix the initialization of types and IDs for some cases.

### 2.1.3 (2022-06-12)
* (Apollon77) Make sure debug log is active according to the settings

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
* (Apollon77) Make sure disabling "Log changes only" also really do not log the changes anymore
* (Apollon77) Allow storeState and GetHistory also to be called for "unknown ids"
* (Apollon77) Adjust the fallback logic for type detection to use the type of the state value to log as last fallback
* (Apollon77) Fix storing booleans on MSSQL

### 2.0.2 (2022-05-11)
* (Apollon77) BREAKING: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Did bigger adjustments to the recording logic and added a lot of new Features. Please refer to Changelog and Forum post for details.

### 2.0.0 (2022-05-11)
* (Apollon77) Breaking: Configuration is only working in the new Admin 5 UI!
* (Apollon77) Breaking! Did bigger adjustments to the recording logic. Debounce is refined and blockTime is added to differentiate between the two checks
* (Apollon77) Breaking! GetHistory requests now need to deliver the ts in milliseconds! Make sure to use up to date scripts and Charting UIs
* (Apollon77) Add RAM buffering and mass inserts for logging
* (Apollon77) New setting added to disable the "logging of additional values for charting optimization" - then only the expected data are logged
* (Apollon77) Add flag returnNewestEntries for GetHistory to determine which records to return when more entries as "count" are existing for aggregate "none"
* (Apollon77) Add support for addId getHistory flag for GetHistory
* (Apollon77) Add new Debug flag to enable/disable debug logging on datapoint level (default is false) to optimize performance
* (Apollon77) Add aggregate method "percentile" to calculate the percentile (0..100) of the values (requires options.percentile with the percentile level, defaults to 50 if not provided). Basically same as Quantile just different levels are used
* (Apollon77) Add aggregate method "quantile" to calculate the quantile (0..1) of the values (requires options.quantile with the quantile level, defaults to 0.5 if not provided). Basically same as Percentile just different levels are used
* (Apollon77) Add (experimental) method "integral" to calculate the integral of the values. Requires options.integralUnit with the time duration of the integral in seconds, defaults to 60s if not provided. Optionally a linear interpolation can be done by setting options.integralInterpolation to "linear"
* (Apollon77) When request contains flag removeBorderValues: true, the result then cut the additional pre and post border values out of the results
* (Apollon77) Enhance the former "Ignore below 0" feature and now allow specifying to ignore below or above specified values. The old setting is converted to the new one
* (Apollon77) Upgrade MSSQL and MySQL drivers incl. Support for MySQL 8
* (Apollon77) Make sure that min change delta allows numbers entered with comma (german notation) in all cases
* (Apollon77) Add support to specify how to round numbers on query per datapoint
* (Apollon77) Do not log passwords for Postgres connections
* (Apollon77) Optimize SSL support for database connections including option to allow self signed certificates
* (Apollon77) Allow to specify custom retention duration in days
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

## License

The MIT License (MIT)

Copyright (c) 2015-2022 bluefox <dogafox@gmail.com>, Apollon77

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